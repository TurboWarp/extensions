// Name: Camera V2
// ID: SPcamera
// Description: Move the visible part of the stage.
// By: SharkPool
// License: MIT

// Version V.1.0.06

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed)
    throw new Error("Camera must run unsandboxed!");

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

  let allCameras = {
    default: {
      xy: [0, 0],
      zoom: 1,
      dir: 0,
      binds: undefined,
    },
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
  function setupState(drawable) {
    drawable[cameraSymbol] = {
      name: "default",
      needsRefresh: false,
      ogXY: [0, 0],
      ogSZ: 1,
      ogDir: 0,
    };
  }

  function translatePosition(xy, invert, camData) {
    if (invert) {
      const invRads = (camData.ogDir / 180) * Math.PI;
      const invSin = Math.sin(invRads),
        invCos = Math.cos(invRads);
      const scaledX = xy[0] / camData.ogSZ;
      const scaledY = xy[1] / camData.ogSZ;
      const invOffX = scaledX * invCos + scaledY * invSin;
      const invOffY = -scaledX * invSin + scaledY * invCos;
      return [invOffX - camData.ogXY[0], invOffY - camData.ogXY[1]];
    } else {
      const rads = (camData.dir / 180) * Math.PI;
      const sin = Math.sin(rads),
        cos = Math.cos(rads);
      const offX = xy[0] + camData.xy[0];
      const offY = xy[1] + camData.xy[1];
      return [
        camData.zoom * (offX * cos - offY * sin),
        camData.zoom * (offX * sin + offY * cos),
      ];
    }
  }

  function bindDrawable(drawable, camera) {
    if (!drawable[cameraSymbol]) setupState(drawable);
    const camSystem = drawable[cameraSymbol];
    if (camSystem.name === camera) return;

    // invert camera transformations
    const fixedPos = translatePosition(drawable._position, true, camSystem);
    const fixedDir = drawable._direction + camSystem.ogDir;
    const fixedScale = [
      drawable._scale[0] / camSystem.ogSZ,
      drawable._scale[1] / camSystem.ogSZ,
    ];

    drawable[cameraSymbol] = {
      name: camera,
      ogXY: [0, 0],
      ogSZ: 1,
      ogDir: 0,
    };

    const id = drawable._id;
    render.updateDrawablePosition(id, fixedPos);
    render.updateDrawableDirection(id, fixedDir);
    render.updateDrawableScale(id, fixedScale);
  }

  function updateCamera(camera) {
    for (let i = 0; i < render._allDrawables.length; i++) {
      const drawable = render._allDrawables[i];
      if (!drawable || !drawable.getVisible() || !drawable.skin) continue;
      if (!drawable[cameraSymbol]) setupState(drawable);

      const camSystem = drawable[cameraSymbol];
      if (camSystem.name === camera) {
        camSystem.needsRefresh = true;
        drawable.updatePosition(drawable._position);
        drawable.updateDirection(drawable._direction);
        drawable.updateScale(drawable._scale);
        camSystem.needsRefresh = false;
      }
    }
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
    if (Math.abs(camSystem.xy[0]) > runtime.stageWidth || Math.abs(camSystem.xy[1]) > runtime.stageHeight) {
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
    if (camSystem.needsRefresh) {
      // invert camera transformations
      position = translatePosition(position, true, camSystem);
    }

    camSystem.ogXY = [...thisCam.xy];
    position = translatePosition(position, false, thisCam);
    ogUpdatePosition.call(this, position);
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
    if (camSystem.needsRefresh) {
      // invert camera transformations
      const safeOgSZ = camSystem.ogSZ !== 0 ? camSystem.ogSZ : 1e-10;
      scale[0] /= safeOgSZ;
      scale[1] /= safeOgSZ;
    }

    // avoid dividing 0 by 0
    camSystem.ogSZ = thisCam.zoom || 1e-10;
    const safeZoom = thisCam.zoom || 1e-10;
    scale[0] *= safeZoom;
    scale[1] *= safeZoom;
    if (scale[0] === 0) scale[0] = 1e-10 * Math.sign(safeZoom);
    if (scale[1] === 0) scale[1] = 1e-10 * Math.sign(safeZoom);

    ogUpdateScale.call(this, scale);
    this.skin?.emitWasAltered();
  };

  // Turbowarp Extension Storage
  runtime.on("PROJECT_LOADED", () => {
    const stored = runtime.extensionStorage["SPcamera"];
    if (stored)
      stored.cams.forEach((cam) => {
        allCameras[cam] = {
          xy: [0, 0],
          zoom: 1,
          dir: 0,
          binds: cam === "default" ? undefined : [],
        };
      });
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
      for (var i = 0; i < render._allDrawables.length; i++) {
        const drawable = render._allDrawables[i];
        if (drawable !== undefined && drawable.customDrawableName !== undefined)
          objectNames.push({
            text: drawable.customDrawableName,
            value: `${i}=SP-custLayer`,
          });
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
        if (i === "default") return { text: Scratch.translate("default"), value: "default" };
        else return { text: i, value: i };
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

      if (name === "_pen_")
        return penLayer ? { drawableID: penLayer } : undefined;
      else if (name === "_video_")
        return videoLayer !== -1 ? { drawableID: videoLayer } : undefined;
      else if (name.includes("=SP-custLayer")) {
        const drawableID = parseInt(name);
        if (render._allDrawables[drawableID]?.customDrawableName !== undefined)
          return {
            drawableID,
          };
      }
      return runtime.getSpriteTargetByName(name);
    }

    translateAngledMovement(xy, steps, direction) {
      const radians = direction * (Math.PI / 180);
      return [
        xy[0] + steps * Math.cos(radians),
        xy[1] + steps * Math.sin(radians),
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
      if (!allCameras[args.CAMERA]) return;
      const target = this.getTarget(args.TARGET, util);
      if (!target) return;
      if (target === "_all_") {
        render._allDrawables.forEach((drawable) => {
          bindDrawable(drawable, "default");
        });
      } else {
        const drawable = render._allDrawables[target.drawableID];
        bindDrawable(drawable, "default");
      }
    }

    targetCamera(args, util) {
      const target = this.getTarget(args.TARGET, util);
      if (!target) return "";
      return (
        render._allDrawables[target.drawableID][cameraSymbol]?.name || "default"
      );
    }

    setSpaceColor(args) {
      const rgb = Cast.toRgbColorList(args.COLOR);
      render.setBackgroundColor(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255);
    }

    spaceColor() {
      const rgb = render._backgroundColor3b;
      let decimal = (rgb[0] << 16) + (rgb[1] << 8) + rgb[2];
      if (decimal < 0) decimal += 0xffffff + 1;
      const hex = Number(decimal).toString(16);
      return `#${"000000".substr(0, 6 - hex.length)}${hex}`;
    }

    setXY(args) {
      if (!allCameras[args.CAMERA]) return;
      allCameras[args.CAMERA].xy = [
        Cast.toNumber(args.X) * -1,
        Cast.toNumber(args.Y) * -1,
      ];
      updateCamera(args.CAMERA);
    }

    moveSteps(args) {
      if (!allCameras[args.CAMERA]) return;
      const cam = allCameras[args.CAMERA];
      const steps = Cast.toNumber(args.NUM) * -1;
      cam.xy = this.translateAngledMovement(cam.xy, steps, cam.dir);
      updateCamera(args.CAMERA);
    }

    setX(args) {
      if (!allCameras[args.CAMERA]) return;
      allCameras[args.CAMERA].xy[0] = Cast.toNumber(args.NUM) * -1;
      updateCamera(args.CAMERA);
    }

    changeX(args) {
      if (!allCameras[args.CAMERA]) return;
      const cam = allCameras[args.CAMERA];
      const steps = Cast.toNumber(args.NUM) * -1;
      cam.xy = this.translateAngledMovement(cam.xy, steps, 0);
      updateCamera(args.CAMERA);
    }

    setY(args) {
      if (!allCameras[args.CAMERA]) return;
      allCameras[args.CAMERA].xy[1] = Cast.toNumber(args.NUM) * -1;
      updateCamera(args.CAMERA);
    }

    changeY(args) {
      if (!allCameras[args.CAMERA]) return;
      const cam = allCameras[args.CAMERA];
      const steps = Cast.toNumber(args.NUM) * -1;
      cam.xy = this.translateAngledMovement(cam.xy, steps, 90);
      updateCamera(args.CAMERA);
    }

    goToObject(args, util) {
      if (!allCameras[args.CAMERA]) return;
      const target = this.getTarget(args.TARGET, util);
      if (target) {
        allCameras[args.CAMERA].xy = [target.x * -1, target.y * -1];
        updateCamera(args.CAMERA);
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
      if (!allCameras[args.CAMERA]) return;
      allCameras[args.CAMERA].dir = (180 - Cast.toNumber(args.NUM)) - 90;
      updateCamera(args.CAMERA);
    }
    setDirection(args) {
      if (!allCameras[args.CAMERA]) return;
      allCameras[args.CAMERA].dir = Cast.toNumber(args.NUM) - 90;
      updateCamera(args.CAMERA);
    }

    turnCamRight(args) {
      if (!allCameras[args.CAMERA]) return;
      allCameras[args.CAMERA].dir -= Cast.toNumber(args.NUM);
      updateCamera(args.CAMERA);
    }

    turnCamLeft(args) {
      if (!allCameras[args.CAMERA]) return;
      allCameras[args.CAMERA].dir += Cast.toNumber(args.NUM);
      updateCamera(args.CAMERA);
    }

    pointCamera(args, util) {
      if (!allCameras[args.CAMERA]) return;
      const target = this.getTarget(args.TARGET, util);
      if (target) {
        allCameras[args.CAMERA].dir = target.direction - 90;
        updateCamera(args.CAMERA);
      }
    }

    getDirectionNew(args) {
      if (!allCameras[args.CAMERA]) return 0;
      return (180 - allCameras[args.CAMERA].dir) - 90;
    }
    getDirection(args) {
      if (!allCameras[args.CAMERA]) return 0;
      return allCameras[args.CAMERA].dir + 90;
    }

    setZoom(args) {
      if (!allCameras[args.CAMERA]) return;
      allCameras[args.CAMERA].zoom = Cast.toNumber(args.NUM) / 100;
      updateCamera(args.CAMERA);
    }

    changeZoom(args) {
      if (!allCameras[args.CAMERA]) return;
      allCameras[args.CAMERA].zoom += Cast.toNumber(args.NUM) / 100;
      updateCamera(args.CAMERA);
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
  }

  Scratch.extensions.register(new SPcamera());
})(Scratch);
