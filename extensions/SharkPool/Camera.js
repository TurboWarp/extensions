// Name: Camera V2
// ID: SPcamera
// Description: Move the visible part of the stage.
// By: SharkPool
// License: MIT

// Version V.1.0.2

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed)
    throw new Error("Camera V2 must run unsandboxed!");

  const menuIconURI =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MSIgaGVpZ2h0PSI0MSIgdmlld0JveD0iMCAwIDQxIDQxIj48ZyBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTAgMjAuNUMwIDkuMTc4IDkuMTc4IDAgMjAuNSAwUzQxIDkuMTc4IDQxIDIwLjUgMzEuODIyIDQxIDIwLjUgNDEgMCAzMS44MjIgMCAyMC41IiBmaWxsPSIjMjg1MWM5Ii8+PHBhdGggZD0iTTIuMzc4IDIwLjVjMC0xMC4wMDkgOC4xMTMtMTguMTIyIDE4LjEyMi0xOC4xMjJTMzguNjIyIDEwLjQ5MSAzOC42MjIgMjAuNSAzMC41MDkgMzguNjIyIDIwLjUgMzguNjIyIDIuMzc4IDMwLjUwOSAyLjM3OCAyMC41IiBmaWxsPSIjNTE3YWY1Ii8+PHBhdGggZD0iTTMxLjg3MSAxNS4wMDdjLjA3My4xNDkuMTI5LjI4LjEyOS4yNDN2MTAuM2MwIC4yODMtLjIzMy41LS41LjVhLjMuMyAwIDAgMS0uMTQ2LS4wNTRsLS4wOTctLjA3NUwyNSAyMi4xNjd2Mi4yODNjMCAxLjk0Ny0xLjU5OCAzLjYtMy41IDMuNmgtOC45Yy0yLjAxNS0uMDg4LTMuNi0xLjY3My0zLjYtMy42di03LjljMC0yLjAyNCAxLjU3Ni0zLjYgMy42LTMuNmg4LjljMS45MzcgMCAzLjUgMS41OSAzLjUgMy42djIuMzJsNi4xNzItNGMuMjctLjE2Mi41NTQtLjEwNS43LjEzN3oiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+";
  const rightArrow =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIyLjY4IDEyLjJhMS42IDEuNiAwIDAgMS0xLjI3LjYzaC03LjY5YTEuNTkgMS41OSAwIDAgMS0xLjE2LTIuNThsMS4xMi0xLjQxYTQuODIgNC44MiAwIDAgMC0zLjE0LS43NyA0LjMgNC4zIDAgMCAwLTIgLjhBNC4yNSA0LjI1IDAgMCAwIDcuMiAxMC42YTUuMDYgNS4wNiAwIDAgMCAuNTQgNC42MkE1LjU4IDUuNTggMCAwIDAgMTIgMTcuNzRhMi4yNiAyLjI2IDAgMCAxLS4xNiA0LjUyQTEwLjI1IDEwLjI1IDAgMCAxIDMuNzQgMThhMTAuMTQgMTAuMTQgMCAwIDEtMS40OS05LjIyIDkuNyA5LjcgMCAwIDEgMi44My00LjE0QTkuOSA5LjkgMCAwIDEgOS42NiAyLjVhMTAuNjYgMTAuNjYgMCAwIDEgNy43MiAxLjY4bDEuMDgtMS4zNWExLjU3IDEuNTcgMCAwIDEgMS4yNC0uNiAxLjYgMS42IDAgMCAxIDEuNTQgMS4yMWwxLjcgNy4zN2ExLjU3IDEuNTcgMCAwIDEtLjI2IDEuMzkiIHN0eWxlPSJmaWxsOiMwMDA7b3BhY2l0eTouMiIvPjxwYXRoIGQ9Ik0yMS4zOCAxMS44M2gtNy42MWEuNTkuNTkgMCAwIDEtLjQzLTFsMS43NS0yLjE5YTUuOSA1LjkgMCAwIDAtNC43LTEuNTggNS4wNyA1LjA3IDAgMCAwLTQuMTEgMy4xN0E2IDYgMCAwIDAgNyAxNS43N2E2LjUxIDYuNTEgMCAwIDAgNSAyLjkyIDEuMzEgMS4zMSAwIDAgMS0uMDggMi42MiA5LjMgOS4zIDAgMCAxLTcuMzUtMy44MiA5LjE2IDkuMTYgMCAwIDEtMS40LTguMzdBOC41IDguNSAwIDAgMSA1LjcxIDUuNGE4Ljc2IDguNzYgMCAwIDEgNC4xMS0xLjkyIDkuNyA5LjcgMCAwIDEgNy43NSAyLjA3bDEuNjctMi4xYS41OS41OSAwIDAgMSAxIC4yMUwyMiAxMS4wOGEuNTkuNTkgMCAwIDEtLjYyLjc1IiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+";
  const leftArrow =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIwLjM0IDE4LjIxYTEwLjI0IDEwLjI0IDAgMCAxLTguMSA0LjIyIDIuMjYgMi4yNiAwIDAgMS0uMTYtNC41MiA1LjU4IDUuNTggMCAwIDAgNC4yNS0yLjUzIDUuMDYgNS4wNiAwIDAgMCAuNTQtNC42MkE0LjI1IDQuMjUgMCAwIDAgMTUuNTUgOWE0LjMgNC4zIDAgMCAwLTItLjggNC44MiA0LjgyIDAgMCAwLTMuMTUuOGwxLjEyIDEuNDFBMS41OSAxLjU5IDAgMCAxIDEwLjM2IDEzSDIuNjdhMS41NiAxLjU2IDAgMCAxLTEuMjYtLjYzQTEuNTQgMS41NCAwIDAgMSAxLjEzIDExbDEuNzItNy40M0ExLjU5IDEuNTkgMCAwIDEgNC4zOCAyLjRhMS41NyAxLjU3IDAgMCAxIDEuMjQuNkw2LjcgNC4zNWExMC42NiAxMC42NiAwIDAgMSA3LjcyLTEuNjhBOS45IDkuOSAwIDAgMSAxOSA0LjgxIDkuNiA5LjYgMCAwIDEgMjEuODMgOWExMC4wOCAxMC4wOCAwIDAgMS0xLjQ5IDkuMjEiIHN0eWxlPSJmaWxsOiMwMDA7b3BhY2l0eTouMiIvPjxwYXRoIGQ9Ik0xOS41NiAxNy42NWE5LjI5IDkuMjkgMCAwIDEtNy4zNSAzLjgzIDEuMzEgMS4zMSAwIDAgMS0uMDgtMi42MiA2LjUzIDYuNTMgMCAwIDAgNS0yLjkyIDYuMDUgNi4wNSAwIDAgMCAuNjctNS41MSA1LjMgNS4zIDAgMCAwLTEuNjQtMi4xNiA1LjIgNS4yIDAgMCAwLTIuNDgtMUE1Ljg2IDUuODYgMCAwIDAgOSA4Ljg0TDEwLjc0IDExYS41OS41OSAwIDAgMS0uNDMgMUgyLjdhLjYuNiAwIDAgMS0uNi0uNzVsMS43MS03LjQyYS41OS41OSAwIDAgMSAxLS4yMWwxLjY3IDIuMWE5LjcgOS43IDAgMCAxIDcuNzUtMi4wNyA4Ljg0IDguODQgMCAwIDEgNC4xMiAxLjkyIDguNyA4LjcgMCAwIDEgMi41NCAzLjcyIDkuMTQgOS4xNCAwIDAgMS0xLjMzIDguMzYiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=";

  const Cast = Scratch.Cast;
  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const render = vm.renderer;
  const cameraSymbol = Symbol("SPcameraData");

  let allCameras = Object.create(null);
  allCameras["default"] = {
    xy: [0, 0],
    zoom: 1,
    dir: 0,
    binds: undefined,
    precisionMode: false,
  };

  // TODO add support for interpolation at some point
  // we need a api to allow pushing interpolation data
  runtime.setInterpolation(false);
  runtime.runtimeOptions.fencing = false;
  render.offscreenTouching = true;

  // custom gui
  function openModal(titleName, func) {
    // in a Button Context, ScratchBlocks always exists
    ScratchBlocks.prompt(
      titleName,
      "",
      (value) => func(value),
      Scratch.translate("Camera Manager"),
      "broadcast_msg"
    );
  }

  // camera utils
  const DEG_TO_RADIAN = Math.PI / 180;
  const EPSILON = 1e-10;

  const applyEpsilon = (value) => (Math.abs(value) < EPSILON ? 0 : value);

  const intsChanged = (a, b) => {
    if (a === b || Math.abs(a - b) < EPSILON) {
      return false;
    } else {
      return true;
    }
  };

  function isDirty(oldValue, newValue) {
    if (Array.isArray(oldValue)) {
      return !oldValue.every(
        (value, index) => !intsChanged(value, newValue[index] ?? 0)
      );
    } else {
      return intsChanged(oldValue, newValue);
    }
  }

  function setupState(drawable) {
    drawable[cameraSymbol] = {
      name: "default",
      needsRefresh: false,
      ogXY: [0, 0],
      ogSZ: 1,
      ogDir: 0,
      unalteredPosition: [drawable._position[0], drawable._position[1]],
      unalteredScale: {
        // must be an object to prevent mutability
        x: drawable._scale[0],
        y: drawable._scale[1],
      },
    };
  }

  function translatePosition(xy, invert, camData) {
    if (invert) {
      const invRads = camData.ogDir * DEG_TO_RADIAN;
      const invSin = Math.sin(invRads);
      const invCos = Math.cos(invRads);

      const scaledX = xy[0] / applyEpsilon(camData.ogSZ);
      const scaledY = xy[1] / applyEpsilon(camData.ogSZ);

      const invOffX = scaledX * invCos + scaledY * invSin;
      const invOffY = -scaledX * invSin + scaledY * invCos;
      return [
        applyEpsilon(invOffX - camData.ogXY[0]),
        applyEpsilon(invOffY - camData.ogXY[1]),
      ];
    } else {
      const rads = camData.dir * DEG_TO_RADIAN;
      const sin = Math.sin(rads);
      const cos = Math.cos(rads);

      const offX = xy[0] + camData.xy[0];
      const offY = xy[1] + camData.xy[1];
      return [
        applyEpsilon(camData.zoom * (offX * cos - offY * sin)),
        applyEpsilon(camData.zoom * (offX * sin + offY * cos)),
      ];
    }
  }

  function bindDrawable(drawable, camera) {
    if (!drawable[cameraSymbol]) setupState(drawable);
    const camSystem = drawable[cameraSymbol];
    if (camSystem.name === camera) return;

    drawable[cameraSymbol] = {
      name: camera,
      needsRefresh: false,
      ogXY: [0, 0],
      ogSZ: 1,
      ogDir: 0,
      unalteredPosition: camSystem.unalteredPosition,
      unalteredScale: camSystem.unalteredScale,
    };

    // invert camera transformations
    drawable.updateScale([
      camSystem.unalteredScale.x,
      camSystem.unalteredScale.y,
    ]);
    drawable.updatePosition(camSystem.unalteredPosition);
    drawable.updateDirection(drawable._direction + camSystem.ogDir);
  }

  function updateCamera(camera) {
    for (let i = 0; i < render._drawList.length; i++) {
      const drawableId = render._drawList[i];
      const drawable = render._allDrawables[drawableId];
      if (!drawable.getVisible() || !drawable.skin) continue;
      if (!drawable[cameraSymbol]) setupState(drawable);

      const camSystem = drawable[cameraSymbol];
      if (camSystem.name === camera) {
        camSystem.needsRefresh = true;
        drawable.updateScale([
          camSystem.unalteredScale.x,
          camSystem.unalteredScale.y,
        ]);
        drawable.updatePosition(camSystem.unalteredPosition);
        drawable.updateDirection(drawable._direction);

        camSystem.needsRefresh = false;
      }
    }

    runtime.requestRedraw();
  }

  // camera system patches
  const ogPostSpriteInfo = vm.postSpriteInfo;
  vm.postSpriteInfo = function (data) {
    if (this._dragTarget && data.x !== undefined) {
      const drawable = render._allDrawables[this._dragTarget.drawableID];
      if (!drawable[cameraSymbol]) setupState(drawable);
      const camSystem = drawable[cameraSymbol];
      camSystem.needsRefresh = false;
      camSystem.ogXY = [0, 0];
    }
    ogPostSpriteInfo.call(this, data);
  };

  const ogPositionBubble = runtime.ext_scratch3_looks._positionBubble;
  runtime.ext_scratch3_looks._positionBubble = function (target) {
    // Expand the Bubble Limits to a Infinite Stage size if the camera
    // goes beyond the set stage size
    const drawable = render._allDrawables[target.drawableID];
    if (!drawable[cameraSymbol]) setupState(drawable);
    const camSystem = allCameras[drawable[cameraSymbol].name];

    const ogNativeSize = render._nativeSize;
    if (
      Math.abs(camSystem.xy[0]) > runtime.stageWidth ||
      Math.abs(camSystem.xy[1]) > runtime.stageHeight
    ) {
      render._nativeSize = [Infinity, Infinity];
    }
    ogPositionBubble.call(this, target);
    render._nativeSize = ogNativeSize;
  };

  const ogGetBubbleBounds = render.getBoundsForBubble;
  render.getBoundsForBubble = function (drawableID) {
    const drawable = render._allDrawables[drawableID];
    if (!drawable[cameraSymbol]) setupState(drawable);
    const camSystem = drawable[cameraSymbol];

    const bounds = ogGetBubbleBounds.call(this, drawableID);
    const realTopLeft = translatePosition(
      [bounds.left, bounds.top],
      true,
      camSystem
    );
    const realBottomRight = translatePosition(
      [bounds.right, bounds.bottom],
      true,
      camSystem
    );

    bounds.top = realTopLeft[1];
    bounds.left = realTopLeft[0];
    bounds.bottom = realBottomRight[1];
    bounds.right = realBottomRight[0];
    return bounds;
  };

  const ogUpdatePosition = render.exports.Drawable.prototype.updatePosition;
  render.exports.Drawable.prototype.updatePosition = function (position) {
    if (!this[cameraSymbol]) setupState(this);
    const camSystem = this[cameraSymbol];
    const thisCam = allCameras[camSystem.name];
    let shouldEmit = false;
    if (camSystem.needsRefresh) {
      // invert camera transformations
      position[0] = camSystem.unalteredPosition[0];
      position[1] = camSystem.unalteredPosition[1];
    } else {
      camSystem.unalteredPosition[0] = position[0];
      camSystem.unalteredPosition[1] = position[1];
    }

    if (
      camSystem.ogXY[0] !== thisCam.xy[0] ||
      camSystem.ogXY[1] !== thisCam.xy[1]
    ) {
      camSystem.ogXY[0] = thisCam.xy[0];
      camSystem.ogXY[1] = thisCam.xy[1];
      shouldEmit = true;
    }

    position = translatePosition(position, false, thisCam);
    if (camSystem.needsRefresh) {
      if (
        this._position[0] !== position[0] ||
        this._position[1] !== position[1]
      ) {
        this._position[0] = position[0];
        this._position[1] = position[1];
      }
      if (shouldEmit) {
        render.dirty = true;
        this.setTransformDirty();
      }
    } else {
      ogUpdatePosition.call(this, position);
    }
  };

  const ogUpdateDirection = render.exports.Drawable.prototype.updateDirection;
  render.exports.Drawable.prototype.updateDirection = function (direction) {
    if (!this[cameraSymbol]) setupState(this);
    const camSystem = this[cameraSymbol];
    const thisCam = allCameras[camSystem.name];
    if (camSystem.needsRefresh) {
      // invert camera transformations
      direction += camSystem.ogDir;
    }

    camSystem.ogDir = thisCam.dir;
    direction -= thisCam.dir;
    ogUpdateDirection.call(this, direction);
  };

  const ogUpdateScale = render.exports.Drawable.prototype.updateScale;
  render.exports.Drawable.prototype.updateScale = function (scale) {
    if (!this[cameraSymbol]) setupState(this);
    const camSystem = this[cameraSymbol];
    const thisCam = allCameras[camSystem.name];
    let shouldEmit = false;
    if (camSystem.needsRefresh) {
      // invert camera transformations
      scale[0] = camSystem.unalteredScale.x;
      scale[1] = camSystem.unalteredScale.y;

      shouldEmit = camSystem.ogSZ !== thisCam.zoom;
    } else {
      camSystem.unalteredScale.x = scale[0];
      camSystem.unalteredScale.y = scale[1];
    }

    // avoid dividing 0 by 0
    camSystem.ogSZ = thisCam.zoom;
    const safeZoom = thisCam.zoom || EPSILON;
    scale[0] *= safeZoom;
    scale[1] *= safeZoom;
    if (scale[0] === 0) scale[0] = EPSILON * Math.sign(safeZoom);
    if (scale[1] === 0) scale[1] = EPSILON * Math.sign(safeZoom);

    ogUpdateScale.call(this, scale);
    if (shouldEmit) {
      this._renderer.dirty = true;
      this._rotationCenterDirty = true;
      this._skinScaleDirty = true;
      this.setTransformDirty();
    }
  };

  const ogUpdateVisible = render.exports.Drawable.prototype.updateVisible;
  render.exports.Drawable.prototype.updateVisible = function (isVisible) {
    if (!this[cameraSymbol]) setupState(this);
    if (isVisible && this._visible !== isVisible) {
      const camSystem = this[cameraSymbol];

      // save some renderer calls, packing this all into one
      // while running only when isVisible is true combines this
      // into a single renderer call
      this.updateProperties({
        position: camSystem.unalteredPosition,
        direction: this._direction + camSystem.ogDir,
        scale: [camSystem.unalteredScale.x, camSystem.unalteredScale.y],
      });
    }
    ogUpdateVisible.call(this, isVisible);
  };

  // For certain projects that heavily rely on collisions, different camera zooms
  // and transforms will cause buggy behaviour. Fix this with 'precisionMode'
  const ogTouchingDrawables = render.isTouchingDrawables;
  render.isTouchingDrawables = function (targetId, candidateIds) {
    const target = this._allDrawables[targetId];
    if (!target) {
      return ogTouchingDrawables.call(this, targetId, candidateIds);
    }

    const camSystem = target[cameraSymbol];
    if (!camSystem || !allCameras[camSystem.name]?.precisionMode) {
      return ogTouchingDrawables.call(this, targetId, candidateIds);
    }

    const modified = [];

    // Normalize all requested drawables to a default state
    const normalize = (drawable) => {
      const cam = drawable[cameraSymbol];
      if (!cam) return;

      modified.push({
        drawable,
        x: drawable._position[0],
        y: drawable._position[1],
        dir: drawable._direction,
        sx: drawable._scale[0],
        sy: drawable._scale[1],
      });

      drawable._position[0] = cam.unalteredPosition[0];
      drawable._position[1] = cam.unalteredPosition[1];
      drawable._direction += cam.ogDir;
      drawable._scale[0] = cam.unalteredScale.x;
      drawable._scale[1] = cam.unalteredScale.y;

      drawable._skinScaleDirty = true;
      drawable._rotationCenterDirty = true;
      drawable._calculateTransform();
    };

    normalize(target);
    for (let i = 0; i < candidateIds.length; i++) {
      const d = this._allDrawables[candidateIds[i]];
      if (d && d[cameraSymbol]) normalize(d);
    }

    try {
      return ogTouchingDrawables.call(this, targetId, candidateIds);
    } finally {
      // Restore requested drawables back to their camera states
      for (let i = 0; i < modified.length; i++) {
        const m = modified[i];
        const d = m.drawable;

        d._position[0] = m.x;
        d._position[1] = m.y;
        d._direction = m.dir;
        d._scale[0] = m.sx;
        d._scale[1] = m.sy;

        d._skinScaleDirty = true;
        d._rotationCenterDirty = true;
        d._calculateTransform();
      }
    }
  };

  // Clones should inherit the parents camera
  const ogInitDrawable = vm.exports.RenderedTarget.prototype.initDrawable;
  vm.exports.RenderedTarget.prototype.initDrawable = function (layerGroup) {
    ogInitDrawable.call(this, layerGroup);
    if (this.isOriginal) return;

    const parentSprite = this.sprite.clones[0]; // clone[0] is always the original
    const parentDrawable = render._allDrawables[parentSprite.drawableID];
    const name = parentDrawable[cameraSymbol]?.name ?? "default";

    const drawable = render._allDrawables[this.drawableID];
    bindDrawable(drawable, name);
  };

  // Turbowarp Extension Storage
  runtime.on("PROJECT_LOADED", () => {
    const stored = runtime.extensionStorage["SPcamera"];
    if (stored) {
      stored.cams.forEach((cam) => {
        allCameras[cam] = {
          xy: [0, 0],
          zoom: 1,
          dir: 0,
          binds: cam === "default" ? undefined : [],
          precisionMode: false,
        };
      });
    }
  });

  class SPcamera {
    getInfo() {
      return {
        id: "SPcamera",
        name: Scratch.translate("Camera V2"),
        color1: "#517af5",
        color2: "#3460e3",
        color3: "#2851c9",
        menuIconURI,
        blocks: [
          {
            func: "addCamera",
            blockType: Scratch.BlockType.BUTTON,
            text: Scratch.translate("Add Camera"),
          },
          {
            func: "removeCamera",
            blockType: Scratch.BlockType.BUTTON,
            text: Scratch.translate("Remove Camera"),
          },
          "---",
          {
            opcode: "bindTarget",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("bind [TARGET] to camera [CAMERA]"),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "OBJECTS" },
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
            },
          },
          {
            opcode: "unbindTarget",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("unbind [TARGET] from camera [CAMERA]"),
            hideFromPalette: true, // deprecated, needed for compatibility
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "OBJECTS" },
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
            },
          },
          {
            opcode: "targetCamera",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("camera of [TARGET]"),
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "EXACT_OBJECTS",
              },
            },
          },
          "---",
          {
            opcode: "setSpaceColor",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set background color to [COLOR]"),
            arguments: {
              COLOR: { type: Scratch.ArgumentType.COLOR },
            },
          },
          {
            opcode: "spaceColor",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("background color"),
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Camera Controls"),
          },
          {
            opcode: "setXY",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [CAMERA] camera to x: [X] y: [Y]"),
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
              X: { type: Scratch.ArgumentType.NUMBER },
              Y: { type: Scratch.ArgumentType.NUMBER },
            },
          },
          {
            opcode: "goToObject",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("move [CAMERA] camera to [TARGET]"),
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          "---",
          {
            opcode: "moveSteps",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("move [CAMERA] camera [NUM] steps"),
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
            },
          },
          {
            opcode: "setX",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [CAMERA] camera x to [NUM]"),
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
              NUM: { type: Scratch.ArgumentType.NUMBER },
            },
          },
          {
            opcode: "changeX",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("change [CAMERA] camera x by [NUM]"),
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
            },
          },
          {
            opcode: "setY",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [CAMERA] camera y to [NUM]"),
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
              NUM: { type: Scratch.ArgumentType.NUMBER },
            },
          },
          {
            opcode: "changeY",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("change [CAMERA] camera y by [NUM]"),
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
            },
          },
          "---",
          {
            opcode: "getX",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[CAMERA] camera x"),
            disableMonitor: true,
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
            },
          },
          {
            opcode: "getY",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[CAMERA] camera y"),
            disableMonitor: true,
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
            },
          },
          "---",
          {
            opcode: "setDirectionNew",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [CAMERA] camera direction to [NUM]"),
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
              NUM: { type: Scratch.ArgumentType.ANGLE, defaultValue: 90 },
            },
          },
          {
            opcode: "setDirection",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [CAMERA] camera direction to [NUM]"),
            hideFromPalette: true, // deprecated, needed for compatibility
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
              NUM: { type: Scratch.ArgumentType.ANGLE, defaultValue: 90 },
            },
          },
          {
            opcode: "pointCamera",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("point [CAMERA] camera towards [TARGET]"),
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          "---",
          {
            opcode: "turnCamRight",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("turn [CAMERA] camera [IMG] [NUM] degrees"),
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
              IMG: { type: Scratch.ArgumentType.IMAGE, dataURI: rightArrow },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
            },
          },
          {
            opcode: "turnCamLeft",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("turn [CAMERA] camera [IMG] [NUM] degrees"),
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
              IMG: { type: Scratch.ArgumentType.IMAGE, dataURI: leftArrow },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
            },
          },
          {
            opcode: "getDirectionNew",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[CAMERA] camera direction"),
            disableMonitor: true,
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
            },
          },
          {
            opcode: "getDirection",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[CAMERA] camera direction"),
            hideFromPalette: true, // deprecated, needed for compatibility
            disableMonitor: true,
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
            },
          },
          "---",
          {
            opcode: "setZoom",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [CAMERA] camera zoom to [NUM]%"),
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          {
            opcode: "changeZoom",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("change [CAMERA] camera zoom by [NUM]"),
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
            },
          },
          {
            opcode: "getZoom",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[CAMERA] camera zoom"),
            disableMonitor: true,
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Utility"),
          },
          {
            opcode: "fixedMouseX",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("mouse x in camera [CAMERA]"),
            disableMonitor: true,
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
            },
          },
          {
            opcode: "fixedMouseY",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("mouse y in camera [CAMERA]"),
            disableMonitor: true,
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
            },
          },
          "---",
          {
            opcode: "renderedX",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("rendered x position of [TARGET]"),
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "EXACT_OBJECTS",
              },
            },
          },
          {
            opcode: "renderedY",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("rendered y position of [TARGET]"),
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "EXACT_OBJECTS",
              },
            },
          },
          "---",
          {
            opcode: "togglePrecision",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "[TOGGLE] touch precision in camera [CAMERA]"
            ),
            arguments: {
              TOGGLE: {
                type: Scratch.ArgumentType.STRING,
                menu: "TOGGLER",
              },
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
            },
          },
          {
            opcode: "isPreciseMode",
            blockType: Scratch.BlockType.BOOLEAN,
            disableMonitor: true,
            text: Scratch.translate(
              "touch precision in camera [CAMERA] enabled?"
            ),
            arguments: {
              CAMERA: { type: Scratch.ArgumentType.STRING, menu: "CAMERAS" },
            },
          },
        ],
        menus: {
          CAMERAS: { acceptReporters: false, items: "getCameras" },
          TARGETS: { acceptReporters: true, items: "getTargets" },
          OBJECTS: { acceptReporters: true, items: "getObjects" },
          EXACT_OBJECTS: {
            acceptReporters: true,
            items: this.getObjects(false),
          },
          BINDS: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("bind"), value: "bind" },
              { text: Scratch.translate("unbind"), value: "unbind" },
            ],
          },
          TOGGLER: {
            acceptReporters: false,
            items: [
              { text: Scratch.translate("enable"), value: "enable" },
              { text: Scratch.translate("disable"), value: "disable" },
            ],
          },
        },
      };
    }

    // Helper Funcs
    getObjects(includeAll) {
      const objectNames = [
        { text: Scratch.translate("myself"), value: "_myself_" },
      ];
      if (includeAll)
        objectNames.push({
          text: Scratch.translate("all objects"),
          value: "_all_",
        });
      objectNames.push({ text: Scratch.translate("Stage"), value: "_stage_" });

      if (runtime.ext_videoSensing)
        objectNames.push({
          text: Scratch.translate("video layer"),
          value: "_video_",
        });
      if (runtime.ext_pen)
        objectNames.push({
          text: Scratch.translate("pen layer"),
          value: "_pen_",
        });

      // Custom Drawable Layer (CST's 3D or Simple3D Exts for Example)
      for (var i = 0; i < render._drawList.length; i++) {
        const drawableId = render._drawList[i];
        const drawable = render._allDrawables[drawableId];
        if (drawable.customDrawableName !== undefined) {
          objectNames.push({
            text: drawable.customDrawableName,
            value: `${drawableId}=SP-custLayer`,
          });
        }
      }

      // Sprites
      const targets = runtime.targets;
      for (let i = 1; i < targets.length; i++) {
        const target = targets[i];
        if (target.isOriginal)
          objectNames.push({ text: target.getName(), value: target.getName() });
      }
      return objectNames.length > 0 ? objectNames : [""];
    }

    getTargets() {
      const targetNames = [
        { text: Scratch.translate("myself"), value: "_myself_" },
        { text: Scratch.translate("Stage"), value: "_stage_" },
      ];
      const targets = runtime.targets;
      for (let i = 1; i < targets.length; i++) {
        const target = targets[i];
        if (target.isOriginal)
          targetNames.push({ text: target.getName(), value: target.getName() });
      }
      return targetNames.length > 0 ? targetNames : [""];
    }

    getCameras() {
      const cameraNames = Object.keys(allCameras);
      return cameraNames.map((i) => {
        if (i === "default") {
          return { text: Scratch.translate("default"), value: "default" };
        }
        return { text: i, value: i };
      });
    }

    refreshBlocks() {
      runtime.requestBlocksUpdate();
      runtime.extensionStorage["SPcamera"] = {
        cams: Object.keys(allCameras),
      };
    }

    addCamera() {
      openModal(Scratch.translate("New Camera name:"), (name) => {
        if (name) {
          allCameras[name] = {
            xy: [0, 0],
            zoom: 1,
            dir: 0,
            binds: [],
            precisionMode: false,
          };
          this.refreshBlocks();
        }
      });
    }

    removeCamera() {
      openModal(Scratch.translate("Remove Camera named:"), (name) => {
        if (name) {
          if (name === "default") return; // never delete the placeholder
          delete allCameras[name];
          this.refreshBlocks();
        }
      });
    }

    getTarget(name, util) {
      name = Cast.toString(name);
      if (name === "_all_") return "_all_";
      else if (name === "_stage_") return runtime.getTargetForStage();
      else if (name === "_myself_") return util.target;
      const penLayer = runtime.ext_pen?._penDrawableId;
      const videoLayer = runtime.ioDevices.video._drawable;

      if (name === "_pen_") {
        return penLayer > -1 ? { drawableID: penLayer } : undefined;
      } else if (name === "_video_") {
        return videoLayer > -1 ? { drawableID: videoLayer } : undefined;
      } else if (name.includes("=SP-custLayer")) {
        const drawableID = parseInt(name);
        if (
          render._allDrawables[drawableID]?.customDrawableName !== undefined
        ) {
          return {
            drawableID,
          };
        }
      }
      return runtime.getSpriteTargetByName(name);
    }

    translateAngledMovement(xy, steps, direction) {
      const radians = direction * DEG_TO_RADIAN;
      return [
        applyEpsilon(xy[0] + steps * Math.cos(radians)),
        applyEpsilon(xy[1] + steps * Math.sin(radians)),
      ];
    }

    // Block Funcs
    bindTarget(args, util) {
      if (!allCameras[args.CAMERA]) return;
      const target = this.getTarget(args.TARGET, util);
      if (!target) return;
      if (target === "_all_") {
        render._allDrawables.forEach((drawable) => {
          bindDrawable(drawable, args.CAMERA);
        });
      } else {
        const drawable = render._allDrawables[target.drawableID];
        bindDrawable(drawable, args.CAMERA);
      }
    }

    unbindTarget(args, util) {
      /* Deprecated, leave as is */
      /*
        We cant unbind a target from the default camera,
        so this just becomes a duplicate bind block
      */
      this.bindTarget(
        {
          ...args,
          CAMERA: "default",
        },
        util
      );
    }

    targetCamera(args, util) {
      const target = this.getTarget(args.TARGET, util);
      if (!target) return "";
      return (
        render._allDrawables[target.drawableID][cameraSymbol]?.name || "default"
      );
    }

    setSpaceColor(args) {
      let color = args.COLOR;
      let alpha = 1;

      // since cast doesnt handle alpha, we do it ourselves.
      if (typeof color === "string" && color.startsWith("#")) {
        if (color.length > 7) {
          alpha = parseInt(color.substring(7), 16) / 255;
          color = color.substring(0, 7);
        }
      }

      const rgb = Cast.toRgbColorList(color).map((c) => c / 255);
      rgb.push(alpha);

      render.setBackgroundColor(...rgb);
    }

    spaceColor() {
      const rgba = render._backgroundColor4f;

      const r = Math.round(rgba[0] * 255);
      const g = Math.round(rgba[1] * 255);
      const b = Math.round(rgba[2] * 255);

      const decimal = (r << 16) + (g << 8) + b;
      let hex = decimal.toString(16).padStart(6, "0");

      // If alpha is used, add it to the hex
      if (rgba[3] < 1) {
        const alpha = Math.round(rgba[3] * 255);
        hex += alpha.toString(16).padStart(2, "0");
      }

      return `#${hex}`;
    }

    setXY(args) {
      const camera = allCameras[args.CAMERA];
      if (!camera) return;

      const position = [Cast.toNumber(args.X) * -1, Cast.toNumber(args.Y) * -1];
      if (isDirty(camera.xy, position)) {
        camera.xy = position;
        updateCamera(args.CAMERA);
      }
    }

    moveSteps(args) {
      const camera = allCameras[args.CAMERA];
      if (!camera) return;

      const vector = this.translateAngledMovement(
        camera.xy,
        Cast.toNumber(args.NUM) * -1,
        camera.dir
      );
      if (isDirty(camera.xy, vector)) {
        camera.xy = vector;
        updateCamera(args.CAMERA);
      }
    }

    setX(args) {
      const camera = allCameras[args.CAMERA];
      if (!camera) return;

      const x = Cast.toNumber(args.NUM) * -1;
      if (isDirty(camera.xy[0], x)) {
        camera.xy[0] = x;
        updateCamera(args.CAMERA);
      }
    }

    changeX(args) {
      const camera = allCameras[args.CAMERA];
      if (!camera) return;

      const vector = this.translateAngledMovement(
        camera.xy,
        Cast.toNumber(args.NUM) * -1,
        0
      );
      if (isDirty(camera.xy, vector)) {
        camera.xy = vector;
        updateCamera(args.CAMERA);
      }
    }

    setY(args) {
      const camera = allCameras[args.CAMERA];
      if (!camera) return;

      const y = Cast.toNumber(args.NUM) * -1;
      if (isDirty(camera.xy[1], y)) {
        camera.xy[1] = y;
        updateCamera(args.CAMERA);
      }
    }

    changeY(args) {
      const camera = allCameras[args.CAMERA];
      if (!camera) return;

      const vector = this.translateAngledMovement(
        camera.xy,
        Cast.toNumber(args.NUM) * -1,
        90
      );
      if (isDirty(camera.xy, vector)) {
        camera.xy = vector;
        updateCamera(args.CAMERA);
      }
    }

    goToObject(args, util) {
      const target = this.getTarget(args.TARGET, util);
      if (target) {
        this.setXY({
          CAMERA: args.CAMERA,
          X: target.x,
          Y: target.y,
        });
      }
    }

    getX(args) {
      if (!allCameras[args.CAMERA]) return 0;
      return allCameras[args.CAMERA].xy[0] * -1;
    }

    getY(args) {
      if (!allCameras[args.CAMERA]) return 0;
      return allCameras[args.CAMERA].xy[1] * -1;
    }

    setDirectionNew(args) {
      const camera = allCameras[args.CAMERA];
      if (!camera) return;

      const dir = 90 - Cast.toNumber(args.NUM);
      if (isDirty(camera.dir, dir)) {
        camera.dir = dir;
        updateCamera(args.CAMERA);
      }
    }
    setDirection(args) {
      /* Deprecated, leave as is */
      if (!allCameras[args.CAMERA]) return;
      allCameras[args.CAMERA].dir = Cast.toNumber(args.NUM) - 90;
      updateCamera(args.CAMERA);
    }

    turnCamRight(args) {
      const camera = allCameras[args.CAMERA];
      if (!camera) return;

      const amt = Cast.toNumber(args.NUM);
      if (amt) {
        camera.dir -= Cast.toNumber(args.NUM);
        updateCamera(args.CAMERA);
      }
    }

    turnCamLeft(args) {
      const camera = allCameras[args.CAMERA];
      if (!camera) return;

      const amt = Cast.toNumber(args.NUM);
      if (amt) {
        camera.dir += Cast.toNumber(args.NUM);
        updateCamera(args.CAMERA);
      }
    }

    pointCamera(args, util) {
      const target = this.getTarget(args.TARGET, util);
      if (target) {
        this.setDirectionNew({
          CAMERA: args.CAMERA,
          NUM: target.direction,
        });
      }
    }

    getDirectionNew(args) {
      if (!allCameras[args.CAMERA]) return 0;
      return 90 - allCameras[args.CAMERA].dir;
    }
    getDirection(args) {
      /* Deprecated leave as is */
      if (!allCameras[args.CAMERA]) return 0;
      return allCameras[args.CAMERA].dir + 90;
    }

    setZoom(args) {
      const camera = allCameras[args.CAMERA];
      if (!camera) return;

      const zoom = Cast.toNumber(args.NUM) / 100;
      if (isDirty(camera.zoom, zoom)) {
        camera.zoom = zoom;
        updateCamera(args.CAMERA);
      }
    }

    changeZoom(args) {
      const camera = allCameras[args.CAMERA];
      if (!camera) return;

      const zoom = Cast.toNumber(args.NUM) / 100;
      if (zoom) {
        camera.zoom += zoom;
        updateCamera(args.CAMERA);
      }
    }

    getZoom(args) {
      if (!allCameras[args.CAMERA]) return 0;
      return allCameras[args.CAMERA].zoom * 100;
    }

    fixedMouseX(args, util) {
      if (!allCameras[args.CAMERA]) return 0;
      const camData = allCameras[args.CAMERA];
      return translatePosition(
        [
          util.ioQuery("mouse", "getScratchX"),
          util.ioQuery("mouse", "getScratchY"),
        ],
        false,
        camData
      )[0];
    }

    fixedMouseY(args, util) {
      if (!allCameras[args.CAMERA]) return 0;
      const camData = allCameras[args.CAMERA];
      return translatePosition(
        [
          util.ioQuery("mouse", "getScratchX"),
          util.ioQuery("mouse", "getScratchY"),
        ],
        false,
        camData
      )[1];
    }

    renderedX(args, util) {
      const target = this.getTarget(args.TARGET, util);
      if (!target) return "";
      const drawable = render._allDrawables[target.drawableID];
      return drawable._position[0];
    }

    renderedY(args, util) {
      const target = this.getTarget(args.TARGET, util);
      if (!target) return "";
      const drawable = render._allDrawables[target.drawableID];
      return drawable._position[1];
    }

    togglePrecision(args) {
      const camera = allCameras[args.CAMERA];
      if (camera) {
        camera.precisionMode = args.TOGGLE === "enable";
      }
    }

    isPreciseMode(args) {
      const camera = allCameras[args.CAMERA];
      return camera && camera.precisionMode;
    }
  }

  Scratch.extensions.register(new SPcamera());
})(Scratch);
