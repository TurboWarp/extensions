// Name: Augmented Reality
// ID: AR
// Description: Shows image from camera and performs motion tracking, allowing 3D projects to correctly overlay virtual objects on real world.
// By: Vadik1 <https://scratch.mit.edu/users/Vadik1/>

(function (Scratch) {
  "use strict";

  /* globals XRWebGLLayer, XRRigidTransform, XRWebGLLayer */

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("AR extension must be run unsandboxed");
  }

  const ArgumentType = Scratch.ArgumentType;
  const BlockType = Scratch.BlockType;

  const vm = Scratch.vm;
  const renderer = vm.renderer;
  const runtime = vm.runtime;
  const frameLoop = runtime.frameLoop;
  const mouse = runtime.ioDevices.mouse;
  const video = runtime.ioDevices.video;

  let arResolution = 1;
  let isPackaged = false;

  let arFail = "uninitialized";
  let xrSession = null;
  let xrState = false;
  let xrRefSpace;
  let xrViewSpace;
  let xrProjectionMatrix;
  let xrTransform;
  let xrCombinedMatrix;
  let xrHitTestSource;
  let hitPosition;
  let hitPositionAvailable = false;
  let oldWidth = 0;
  let oldHeight = 0;
  let xrNeedsResize = false;
  let poseAvailable = false;
  let enterARDone = [];

  let stageWrapper;
  let stageWrapperParent;
  let scLayers;
  let scControlsBar;
  const div = document.createElement("div");
  document.body.append(div);
  const canvas = Scratch.vm.renderer.canvas;
  const gl = Scratch.vm.renderer.gl;
  const enableVideoOriginal = video.enableVideo;

  // Checking whether AR is supported.
  // If not, extension should still load, to let people
  // develop AR projects on non-AR-capable devices and then
  // test them on AR-capable mobile devices
  if (!window.isSecureContext) {
    console.error(
      (arFail =
        "Window is not secure context. WebXR only works in secure context")
    );
  } else if (!navigator.xr) {
    console.error(
      (arFail = "navigator.xr is not defined in the browser you are using")
    );
  } else {
    gl.makeXRCompatible().catch((error) => {
      console.error((arFail = "gl.makeXRCompatible rejected with: " + error));
    });
    navigator.xr.isSessionSupported("immersive-ar").then((supported) => {
      if (!supported) {
        console.error(
          (arFail =
            "WebXR exists in the browser you are using, but 'immersive-ar' session type is not supported")
        );
      } else {
        arFail = null;
      }
    });
  }

  const onSuccess = function (session) {
    xrSession = session;
    xrRefSpace = null;
    xrViewSpace = null;
    xrHitTestSource = null;
    hitPosition = null;
    hitPositionAvailable = false;
    poseAvailable = false;

    session.updateRenderState({
      baseLayer: new XRWebGLLayer(session, gl, {
        framebufferScaleFactor: arResolution,
      }),
    });
    session.addEventListener("end", () => {
      xrSession = null;
      updateState();
    });
    session.requestReferenceSpace("local").then((refSpace) => {
      xrRefSpace = refSpace;
    });
    session
      .requestReferenceSpace("viewer")
      .then((viewSpace) => {
        xrViewSpace = viewSpace;
        return session.requestHitTestSource({ space: viewSpace });
      })
      .then((hts) => {
        xrHitTestSource = hts;
      });
    updateState();

    // [enter AR] blocks should continue after success
    enterARDone.forEach((fn) => fn());
    enterARDone = [];
  };
  const onError = function (error) {
    // This shouldn't set arFail, because arFail is for cases when it permanently failed.
    // This might fail once, but work on the next attempt.
    console.error(
      "Even though 'immersive-ar' is supported in your browser, requesting it failed"
    );
    console.error(error);

    // [enter AR] blocks should continue after failure
    enterARDone.forEach((fn) => fn());
    enterARDone = [];
  };
  const onErrorTryTap = function (error) {
    canvas.removeEventListener("pointerup", enterAR);
    canvas.addEventListener("pointerup", enterAR, { once: true });
  };

  const updateState = function () {
    const state = !!xrSession;
    if (state === xrState) return;

    xrState = state;
    renderer.draw = state ? drawXR : drawOrig;
    renderer.xr = xrSession;
    frameLoop.inXR = state;
    if (frameLoop.running) {
      frameLoop.stop();
      frameLoop.start();
    }
    canvas.removeEventListener("pointerup", enterAR);
    if (state) {
      video.disableVideo(); // Hiding it, since it freezes anyways
      video.enableVideo = () => null;

      // css "transform" doesn't work directly on domOverlay element,
      // but works on it's children. stageWrapper needs to have "transform: scale"
      // on it, so that is why it is placed into another div
      div.append(stageWrapper);

      xrNeedsResize = true;
      oldWidth = runtime.stageWidth;
      oldHeight = runtime.stageHeight;
    } else {
      video.enableVideo = enableVideoOriginal; // After exiting AR, video sensing can be used again

      if (!isPackaged) {
        const borderThing = stageWrapper.children[0].children[0].style;
        borderThing["border"] = "";
        borderThing["border-radius"] = "";
      } else {
        scControlsBar.style["display"] = null;
        scLayers.style["transform"] = null;
        stageWrapper.style["align-items"] = null;
        stageWrapper.style["justify-content"] = null;
        runtime.setStageSize(oldWidth, oldHeight);
      }
      stageWrapper.style = "";
      stageWrapperParent.append(stageWrapper);

      canvas.style.opacity = "";
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
  };

  // Code copied from tw-frame-loop.js because existing code can't be accesed
  const _requestAnimationFrame =
    typeof requestAnimationFrame === "function"
      ? requestAnimationFrame
      : (f) => setTimeout(f, 1000 / 60);
  const _cancelAnimationFrame =
    typeof requestAnimationFrame === "function"
      ? cancelAnimationFrame
      : clearTimeout;

  const animationFrameWrapper = (callback) => {
    let id;
    const handle = () => {
      id = _requestAnimationFrame(handle);
      callback();
    };
    const cancel = () => _cancelAnimationFrame(id);
    id = _requestAnimationFrame(handle);
    return {
      cancel,
    };
  };

  // Patching frameLoop to use xrSession.requestAnimationFrame when in AR mode
  const xrAnimationFrameWrapper = (callback, fps = 30) => {
    const xrSessionBackup = xrSession;
    let shouldTriggerAgain = false;
    let id;
    let idIsXR;
    let interval;
    const handle = (t, frame) => {
      // If fps = 0, then run at screen's refresh rate
      // and always use xr animation frame.
      // In other cases keep using normal animation frame
      // and waiting until shouldTriggerAgain gets set
      // to true, and only then use xr animation frame
      // once and resume waiting. shouldTriggerAgain is
      // set to true by the interval located below.
      if (fps === 0 || shouldTriggerAgain) {
        shouldTriggerAgain = false;
        id = xrSession.requestAnimationFrame(handle);
        idIsXR = true;
      } else {
        id = window.requestAnimationFrame(handle);
        idIsXR = false;
      }
      // Normal animation frames are just for waiting and
      // shouldn't trigger callback()
      if (!frame) return;

      if (xrNeedsResize) {
        xrNeedsResize = false;

        // This needs to run before setStageSize
        if (isPackaged) {
          scControlsBar.style["display"] = "none";
          scLayers.style["transform"] = "translate(0px, 0px)";
          stageWrapper.style["align-items"] = "normal";
          stageWrapper.style["justify-content"] = "flex-start";
        }

        const bl = xrSession.renderState.baseLayer;
        const newWidth = Math.round(
          (bl.framebufferWidth / bl.framebufferHeight) * oldHeight
        );
        if (runtime.stageWidth !== newWidth) {
          runtime.setStageSize(newWidth, oldHeight);
        }

        const scale = div.clientHeight / canvas.clientHeight;
        stageWrapper.style =
          "transform-origin: top left; transform: scale(" +
          scale +
          "," +
          scale +
          ")";
        canvas.style.opacity = "0";

        if (!isPackaged) {
          const borderThing = stageWrapper.children[0].children[0].style;
          borderThing["border"] = "none";
          borderThing["border-radius"] = "0";
          borderThing["transform"] = ""; // Removes translateX
        }
      }
      poseAvailable = false;
      if (xrRefSpace) {
        const pose = frame.getViewerPose(xrRefSpace);
        if (pose) {
          poseAvailable = true;
          xrProjectionMatrix = pose.views[0].projectionMatrix;
          xrTransform = pose.views[0].transform;
          const inverseTransformMatrix = xrTransform.inverse.matrix;
          const a00 = xrProjectionMatrix[0];
          const a01 = xrProjectionMatrix[1];
          const a02 = xrProjectionMatrix[2];
          const a03 = xrProjectionMatrix[3];
          const a10 = xrProjectionMatrix[4];
          const a11 = xrProjectionMatrix[5];
          const a12 = xrProjectionMatrix[6];
          const a13 = xrProjectionMatrix[7];
          const a20 = xrProjectionMatrix[8];
          const a21 = xrProjectionMatrix[9];
          const a22 = xrProjectionMatrix[10];
          const a23 = xrProjectionMatrix[11];
          const a30 = xrProjectionMatrix[12];
          const a31 = xrProjectionMatrix[13];
          const a32 = xrProjectionMatrix[14];
          const a33 = xrProjectionMatrix[15];
          const b00 = inverseTransformMatrix[0];
          const b01 = inverseTransformMatrix[1];
          const b02 = inverseTransformMatrix[2];
          const b03 = inverseTransformMatrix[3];
          const b10 = inverseTransformMatrix[4];
          const b11 = inverseTransformMatrix[5];
          const b12 = inverseTransformMatrix[6];
          const b13 = inverseTransformMatrix[7];
          const b20 = inverseTransformMatrix[8];
          const b21 = inverseTransformMatrix[9];
          const b22 = inverseTransformMatrix[10];
          const b23 = inverseTransformMatrix[11];
          const b30 = inverseTransformMatrix[12];
          const b31 = inverseTransformMatrix[13];
          const b32 = inverseTransformMatrix[14];
          const b33 = inverseTransformMatrix[15];
          xrCombinedMatrix = [
            b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
            b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
            b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
            b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
            b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
            b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
            b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
            b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
            b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
            b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
            b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
            b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
            b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
            b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
            b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
            b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
          ];
        }
      }
      hitPositionAvailable = false;
      if (xrHitTestSource) {
        const hitTestResults = frame.getHitTestResults(xrHitTestSource);
        if (hitTestResults.length > 0) {
          hitPositionAvailable = true;
          hitPosition =
            hitTestResults[0].getPose(xrRefSpace).transform.position;
        }
      }
      callback();
    };
    const cancel = () => {
      if (idIsXR) {
        xrSessionBackup.cancelAnimationFrame(id);
      } else {
        cancelAnimationFrame(id);
      }
      if (interval) {
        clearInterval(interval);
      }
    };
    id = xrSession.requestAnimationFrame(handle);
    if (fps > 0) {
      interval = setInterval(() => {
        shouldTriggerAgain = true;
      }, 1000 / fps);
    }
    return {
      cancel,
    };
  };
  const start = function () {
    this.running = true;
    if (this.inXR) {
      if (this.framerate === 0) {
        this._stepAnimation = this.xrAnimationFrameWrapper(
          this.stepCallback,
          0
        );
        this.runtime.currentStepTime = 1000 / 60;
      } else {
        // Interpolation should never be enabled when framerate === 0 as that's just redundant
        if (this.interpolation) {
          this._interpolationAnimation = animationFrameWrapper(
            this.interpolationCallback
          );
        }
        this._stepAnimation = this.xrAnimationFrameWrapper(
          this.stepCallback,
          this.framerate
        );
        this.runtime.currentStepTime = 1000 / this.framerate;
      }
    } else {
      if (this.framerate === 0) {
        this._stepAnimation = animationFrameWrapper(this.stepCallback);
        this.runtime.currentStepTime = 1000 / 60;
      } else {
        // Interpolation should never be enabled when framerate === 0 as that's just redundant
        if (this.interpolation) {
          this._interpolationAnimation = animationFrameWrapper(
            this.interpolationCallback
          );
        }
        this._stepInterval = setInterval(
          this.stepCallback,
          1000 / this.framerate
        );
        this.runtime.currentStepTime = 1000 / this.framerate;
      }
    }
  };
  frameLoop.xrAnimationFrameWrapper = xrAnimationFrameWrapper.bind(frameLoop);
  frameLoop.start = start.bind(frameLoop);
  frameLoop.inXR = false;

  // Patching renderer.draw() to draw to xr framebuffer instead of canvas
  const drawOrig = renderer.draw.bind(renderer);
  const drawXR = function () {
    const bl = this.xr.renderState.baseLayer; // ADDED
    if (!bl) return; // Should fix very rare crash during exiting  // ADDED

    this._doExitDrawRegion();

    const gl = this._gl;

    gl.bindFramebuffer(gl.FRAMEBUFFER, bl.framebuffer); // CHANGED
    gl.viewport(0, 0, bl.framebufferWidth, bl.framebufferHeight); // CHANGED
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    this._drawThese(
      this._drawList,
      "default" /*ShaderManager.DRAW_MODE.default*/,
      this._projection,
      {
        framebufferWidth: bl.framebufferWidth, // CHANGED
        framebufferHeight: bl.framebufferHeight, // CHANGED
      }
    );
    if (this._snapshotCallbacks.length > 0) {
      const snapshot = gl.canvas.toDataURL();
      this._snapshotCallbacks.forEach((cb) => cb(snapshot));
      this._snapshotCallbacks = [];
    }
  }.bind(renderer);
  renderer.draw = drawOrig;

  // Patching _pickTarget incorrect position bug:
  //   When the canvas is scaled using transform:scale,
  //   canvas.getBoundingClientRect is affected by it, but
  //   canvas.clientWidth and canvas.clientHeight are not.
  //
  //   postData receives data.x and data.y, which are mouse position in
  //   screen units. To be able to rescale it to usable scratch units
  //   it also receives data.canvasWidth and data.canvasHeight
  //   which are based on getBoundingClientRect. Based of that it
  //   calculates this._scratchX and this._scratchY.
  //   Even when canvas is scaled, those are calculated correctly and
  //   as a result, blocks (mouse x) and (mouse y) report correct values.
  //
  //   Later, postData calls _pickTarget, while only passing data.x and data.y
  //   without data.canvasWidth and data.canvasHeight. That method calls
  //   runtime renderer.pick, which calls clientSpaceToScratchBounds, which
  //   uses canvas.clientWidth and canvas.clientHeight to rescale mouse
  //   position from screen units to scratch units. This ignores
  //   transform:scale and as a result, sprites can't be clicked or dragged.
  //
  // WARNING: Makes _pickTarget only work correctly when called from postData.
  // If something else calls it directly, it may cause problems.
  const postDataOriginal = mouse.postData.bind(mouse);
  mouse.postData = function (data) {
    this._canvasWidth = data.canvasWidth;
    this._canvasHeight = data.canvasHeight;
    postDataOriginal(data);
  }.bind(mouse);

  const _pickTargetOriginal = mouse._pickTarget.bind(mouse);
  mouse._pickTarget = function (x, y) {
    return _pickTargetOriginal(
      (x / this._canvasWidth) * canvas.clientWidth,
      (y / this._canvasHeight) * canvas.clientHeight
    );
  }.bind(mouse);

  // This is used by <touching [mouse-pointer v]?>.
  // It was also broken in a similar way.
  mouse.getClientX = function () {
    return (this._clientX / this._canvasWidth) * canvas.clientWidth;
  }.bind(mouse);

  mouse.getClientY = function () {
    return (this._clientY / this._canvasHeight) * canvas.clientHeight;
  }.bind(mouse);
  // END OF WARNING

  const enterAR = function (event) {
    if (!xrSession) {
      // Entering and exiting editor recreates this element
      stageWrapper = document.querySelector(
        "[class*='stage-wrapper_stage-canvas-wrapper']"
      );
      if (!stageWrapper) {
        stageWrapper = document.querySelector("[class='sc-root']");
        scControlsBar = document.querySelector("[class='sc-controls-bar']");
        scLayers = document.querySelector("[class='sc-layers']");
        if (!stageWrapper) {
          console.error(
            (arFail = "Failed to get the div element of the stage")
          );
          return;
        }
        isPackaged = true;
      }
      stageWrapperParent = stageWrapper.parentElement;

      const noop = () => {};
      navigator.xr
        .requestSession("immersive-ar", {
          requiredFeatures: ["hit-test", "dom-overlay"],
          domOverlay: { root: div },
        })
        .then(onSuccess, event ? onError : onErrorTryTap);
      // If (event) is defined, it was from click, so something went wrong.
      // If (event) is null, it was called directly, and might've been rejected due to lack of user interaction.
    }
  };

  class ARExtension {
    getInfo() {
      return {
        id: "AR",
        color1: "#d10000",
        color2: "#bd0000",
        color3: "#af0100",
        docsURI: "https://extensions.turbowarp.org/ar",
        blocks: [
          {
            opcode: "enterAR",
            blockType: BlockType.COMMAND,
            text: "enter AR mode",
            arguments: {},
          },
          {
            opcode: "exitAR",
            blockType: BlockType.COMMAND,
            text: "exit AR mode",
            arguments: {},
          },
          {
            opcode: "isInAR",
            blockType: BlockType.BOOLEAN,
            text: "is in AR?",
            arguments: {},
          },
          {
            opcode: "isFeatureAvailible", // unfixable typo
            blockType: BlockType.BOOLEAN,
            text: "is [FEATURE] available?",
            arguments: {
              FEATURE: {
                type: ArgumentType.STRING,
                menu: "xrFeature",
                defaultValue: "ar",
              },
            },
          },
          "---",
          {
            opcode: "getStageWidth",
            blockType: BlockType.REPORTER,
            text: "stage width",
            arguments: {},
          },
          {
            opcode: "getStageHeight",
            blockType: BlockType.REPORTER,
            text: "stage height",
            arguments: {},
          },
          "---",
          {
            opcode: "getMatrixItem",
            blockType: BlockType.REPORTER,
            text: "item [ITEM] of [MATRIX] matrix",
            arguments: {
              MATRIX: {
                type: ArgumentType.STRING,
                menu: "xrMatrix",
                defaultValue: "combined",
              },
              ITEM: {
                type: ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "getPosition",
            blockType: BlockType.REPORTER,
            text: "position [POSITION_COMPONENT]",
            arguments: {
              POSITION_COMPONENT: {
                type: ArgumentType.STRING,
                menu: "positionComponent",
                defaultValue: "x",
              },
            },
          },
          {
            opcode: "getOrientation",
            blockType: BlockType.REPORTER,
            text: "orientation [ORIENTATION_COMPONENT]",
            arguments: {
              ORIENTATION_COMPONENT: {
                type: ArgumentType.STRING,
                menu: "orientationComponent",
                defaultValue: "w",
              },
            },
          },
          "---",
          {
            opcode: "getHitPosition",
            blockType: BlockType.REPORTER,
            text: "hit position [POSITION_COMPONENT]",
            arguments: {
              POSITION_COMPONENT: {
                type: ArgumentType.STRING,
                menu: "positionComponent",
                defaultValue: "x",
              },
            },
          },
          "---",
          {
            opcode: "moveSpaceBy",
            blockType: BlockType.COMMAND,
            text: "move everything by x:[X] y:[Y] z:[Z]",
            arguments: {
              X: {
                type: ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Z: {
                type: ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "turnSpaceBy",
            blockType: BlockType.COMMAND,
            text: "turn everything by r:[R] i:[I] j:[J] k:[K]",
            arguments: {
              R: {
                type: ArgumentType.NUMBER,
                defaultValue: 1,
              },
              I: {
                type: ArgumentType.NUMBER,
                defaultValue: 0,
              },
              J: {
                type: ArgumentType.NUMBER,
                defaultValue: 0,
              },
              K: {
                type: ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          "---",
          {
            opcode: "setResolution",
            blockType: BlockType.COMMAND,
            text: "set resolution [RESOLUTION]",
            arguments: {
              RESOLUTION: {
                type: ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
        ],
        menus: {
          positionComponent: {
            acceptReporters: false,
            items: [
              {
                text: "x",
                value: "x",
              },
              {
                text: "y",
                value: "y",
              },
              {
                text: "z",
                value: "z",
              },
            ],
          },
          orientationComponent: {
            acceptReporters: false,
            items: [
              {
                text: "r",
                value: "w",
              },
              {
                text: "i",
                value: "x",
              },
              {
                text: "j",
                value: "y",
              },
              {
                text: "k",
                value: "z",
              },
            ],
          },
          xrMatrix: {
            acceptReporters: false,
            items: ["combined", "projection", "view", "inverse view"],
          },
          xrFeature: {
            acceptReporters: false,
            items: ["ar", "pose", "hit position"],
          },
        },
      };
    }
    enterAR() {
      if (arFail) {
        if (arFail !== "shown") {
          // AR is used on mobile, where accessing browser console to see what's wrong can be an issue
          alert(
            "AR is not available because: " +
              arFail +
              ". This message will only be shown once."
          );
          arFail = "shown";
        }
      } else {
        if (!xrSession) {
          if (enterARDone.length === 0) enterAR(null);
          return new Promise((resolve) => enterARDone.push(resolve));
        }
      }
    }
    exitAR() {
      if (xrSession) {
        xrSession.end();
      }
    }
    isInAR() {
      return !!xrSession;
    }
    getStageWidth() {
      return runtime.stageWidth;
    }
    getStageHeight() {
      return runtime.stageHeight;
    }
    getMatrixItem(args) {
      let item = args.ITEM | 0;
      if (item < 1 && item > 16) return "";
      let matrix = null;
      switch (args.MATRIX) {
        case "combined":
          matrix = xrCombinedMatrix;
          break;
        case "projection":
          matrix = xrProjectionMatrix;
          break;
        case "view":
          matrix = xrTransform?.matrix;
          break;
        case "inverse view":
          matrix = xrTransform?.inverse?.matrix;
          break;
      }
      if (!matrix) return 0;
      return matrix[item - 1] || 0;
    }
    moveSpaceBy(args) {
      if (!xrRefSpace) return;
      const x = +args.X || 0;
      const y = +args.Y || 0;
      const z = +args.Z || 0;
      if (!isFinite(x + y + z)) return;
      const offsetTransform = new XRRigidTransform(
        { x: x, y: y, z: z },
        { x: 0, y: 0, z: 0, w: 1 }
      );
      xrRefSpace = xrRefSpace.getOffsetReferenceSpace(offsetTransform);
    }
    turnSpaceBy(args) {
      if (!xrRefSpace) return;
      const r = +args.R || 0;
      const i = +args.I || 0;
      const j = +args.J || 0;
      const k = +args.K || 0;
      const len = Math.sqrt(r * r + i * i + j * j + k * k);
      if (!isFinite(len) || len === 0) return;
      const offsetTransform = new XRRigidTransform(
        { x: 0, y: 0, z: 0 },
        { x: i / len, y: j / len, z: k / len, w: r / len }
      );
      xrRefSpace = xrRefSpace.getOffsetReferenceSpace(offsetTransform);
    }
    getPosition(args) {
      if (!xrTransform) return 0;
      return xrTransform.position[args.POSITION_COMPONENT] || 0;
    }
    getOrientation(args) {
      if (!xrTransform) return 0;
      return xrTransform.orientation[args.ORIENTATION_COMPONENT] || 0;
    }
    getHitPosition(args) {
      if (!hitPosition) return 0;
      return hitPosition[args.POSITION_COMPONENT] || 0;
    }
    isFeatureAvailible(args) {
      switch (args.FEATURE) {
        case "ar":
          return !arFail;
        case "pose":
          return poseAvailable;
        case "hit position":
          return hitPositionAvailable;
        default:
          return false;
      }
    }
    setResolution(args) {
      arResolution = Math.max(0.1, Math.min(1, +args.RESOLUTION || 0));
      if (xrSession) {
        xrSession.updateRenderState({
          baseLayer: new XRWebGLLayer(xrSession, gl, {
            framebufferScaleFactor: arResolution,
          }),
        });
      }
    }
  }

  Scratch.extensions.register(new ARExtension());
})(Scratch);
