// Name: Camera V1
// ID: DTcameracontrols
// Description: Move the visible part of the stage.
// By: DT
// License: MIT

((Scratch) => {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Camera extension must be run unsandboxed");
  }

  const icon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMjUuMzU0OCIgaGVpZ2h0PSIyMjUuMzU0OCIgdmlld0JveD0iMCwwLDIyNS4zNTQ4LDIyNS4zNTQ4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTg3LjMyMjkzLC0zNy4zMjI1OSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTg3LjMyMjk0LDE1MGMwLC02Mi4yMzAwMSA1MC40NDczOSwtMTEyLjY3NzQgMTEyLjY3NzQsLTExMi42Nzc0YzYyLjIzMDAxLDAgMTEyLjY3NzQsNTAuNDQ3MzkgMTEyLjY3NzQsMTEyLjY3NzRjMCw2Mi4yMzAwMSAtNTAuNDQ3MzksMTEyLjY3NzQgLTExMi42Nzc0LDExMi42Nzc0Yy02Mi4yMzAwMSwwIC0xMTIuNjc3NCwtNTAuNDQ3MzkgLTExMi42Nzc0LC0xMTIuNjc3NHoiIGZpbGw9IiNmZjRkYTciIHN0cm9rZS13aWR0aD0iMCIvPjxnPjxwYXRoIGQ9Ik0zMTcuMTAyOSw4MC44MTA4N2MyMS44OTI0LDAgMzkuNjYyMDcsMTcuNzM3MjMgMzkuNjYyMDcsMzkuNjM0NGMwLDEyLjMwNTE3IC01LjYxMTQ4LDIzLjI5NjIyIC0xNC40MDA4OCwzMC41NjgyNGg4Ljc3MDMydjY4LjE3NTYzaC0xMTQuMTMzMjV2LTU1Ljc5ODg5Yy0xNC4zMzQwOCwtMy41MjgxNyAtMjQuOTYxNTMsLTE2LjQ1NzQ3IC0yNC45NjE1MywtMzEuODgwNDRjMCwtMTguMTM5IDE0LjY5NjczLC0zMi44MzQ3OCAzMi44MzQ3OCwtMzIuODM0NzhjMTIuMDM3OTUsMCAyMi41NTY2MSw2LjQ3ODAxIDI4LjI3MjExLDE2LjEzMzk1bDQuODYxMzcsLTAuOTI0NzVjMy4xMjkyNiwtMTguNzY2OTYgMTkuNDM5NzYsLTMzLjA3MzM2IDM5LjA5OTAyLC0zMy4wNzMzNnpNMjc2LjIxODUxLDE0MS4yOTE3MWMtMS4xMDAzNSwzLjUzMzg5IC0yLjc2OTQ3LDYuODEyMDMgLTQuOTIwNTQsOS43MjE3OWgyMC41NDc3NGMtMy42ODc1NCwtMy4wNDgxNCAtNi44MDI0OCwtNi43NjUyNyAtOS4xODU0NSwtMTAuOTQ0Mjl6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMzM2LjU3NTI5LDExOS41MjgxNWMwLDExLjA2ODM1IC04Ljk3MjY0LDIwLjA0MDk5IC0yMC4wNDA5OSwyMC4wNDA5OWMtMTEuMDY4MzUsMCAtMjAuMDQwOTksLTguOTcyNjQgLTIwLjA0MDk5LC0yMC4wNDA5OWMwLC0xMS4wNjgzNSA4Ljk3MjY0LC0yMC4wNDA5OSAyMC4wNDA5OSwtMjAuMDQwOTljMTEuMDY4MzUsMCAyMC4wNDA5OSw4Ljk3MjY0IDIwLjA0MDk5LDIwLjA0MDk5eiIgZmlsbD0iI2ZmNGRhNyIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48cGF0aCBkPSJNMjYxLjE4MywxMzAuMDI1ODFjMCw4Ljk2MDA0IC03LjI2MzYyLDE2LjIyMzY2IC0xNi4yMjM2NiwxNi4yMjM2NmMtOC45NjAwNCwwIC0xNi4yMjM2NiwtNy4yNjM2MiAtMTYuMjIzNjYsLTE2LjIyMzY2YzAsLTguOTYwMDQgNy4yNjM2MiwtMTYuMjIzNjYgMTYuMjIzNjYsLTE2LjIyMzY2YzguOTYwMDQsMCAxNi4yMjM2Niw3LjI2MzYyIDE2LjIyMzY2LDE2LjIyMzY2eiIgZmlsbD0iI2ZmNGRhNyIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48cGF0aCBkPSJNMzg3Ljk2MDM5LDE0NS44NTcyNHY2MC41MTA0M2wtMjEuNjAzMjYsLTEzLjQ3MjE3aC0xNi44OTgzNHYtMzMuNTY2MDdoMTYuODk4MzRsMjEuNTk5MTcsLTEzLjQ3MTEyeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjExMi42NzcwNjU6MTEyLjY3NzQwNS0tPg==";
  const CW =
    "data:image/png;base64,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";
  const CCW =
    "data:image/png;base64,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";

  const vm = Scratch.vm;

  let cameraX = 0;
  let cameraY = 0;
  let cameraZoom = 100;
  let cameraDirection = 90;
  let cameraBG = "#ffffff";

  vm.runtime.runtimeOptions.fencing = false;
  vm.renderer.offscreenTouching = true;
  vm.setInterpolation(false);

  function updateCamera(
    x = cameraX,
    y = cameraY,
    scale = cameraZoom / 100,
    rot = -cameraDirection + 90
  ) {
    rot = (rot / 180) * Math.PI;
    const s = Math.sin(rot) * scale;
    const c = Math.cos(rot) * scale;
    const w = vm.runtime.stageWidth / 2;
    const h = vm.runtime.stageHeight / 2;
    vm.renderer._projection = [
      c / w,
      -s / h,
      0,
      0,
      s / w,
      c / h,
      0,
      0,
      0,
      0,
      -1,
      0,
      (c * -x + s * -y) / w,
      (c * -y - s * -x) / h,
      0,
      1,
    ];
    vm.renderer.dirty = true;
  }

  function updateCameraBG(color = cameraBG) {
    const rgb = Scratch.Cast.toRgbColorList(color);
    Scratch.vm.renderer.setBackgroundColor(
      rgb[0] / 255,
      rgb[1] / 255,
      rgb[2] / 255
    );
  }

  // tell resize to update camera as well
  vm.runtime.on("STAGE_SIZE_CHANGED", (_) => updateCamera());

  vm.runtime.on("RUNTIME_DISPOSED", () => {
    cameraX = 0;
    cameraY = 0;
    cameraZoom = 100;
    cameraDirection = 90;
    cameraBG = "#ffffff";
    updateCamera();
    updateCameraBG();
  });

  function _translateX(x, fromTopLeft = false, multiplier = 1, doZoom = true) {
    const w = fromTopLeft ? vm.runtime.stageWidth / 2 : 0;
    return (x - w) / (doZoom ? cameraZoom / 100 : 1) + w + cameraX * multiplier;
  }

  function _translateY(y, fromTopLeft = false, multiplier = 1, doZoom = true) {
    const h = fromTopLeft ? vm.runtime.stageHeight / 2 : 0;
    return (y - h) / (doZoom ? cameraZoom / 100 : 1) + h + cameraY * multiplier;
  }

  function rotate(cx, cy, x, y, radians) {
    const cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = cos * (x - cx) + sin * (y - cy) + cx,
      ny = cos * (y - cy) - sin * (x - cx) + cy;
    return [nx, ny];
  }

  // rotation hell
  function translateX(
    x,
    fromTopLeft = false,
    xMult = 1,
    doZoom = true,
    y = 0,
    yMult = xMult
  ) {
    if ((cameraDirection - 90) % 360 === 0 || !doZoom) {
      return _translateX(x, fromTopLeft, xMult, doZoom);
    } else {
      const w = fromTopLeft ? vm.runtime.stageWidth / 2 : 0;
      const h = fromTopLeft ? vm.runtime.stageHeight / 2 : 0;
      const rotated = rotate(
        cameraX + w,
        cameraY + h,
        _translateX(x, fromTopLeft, xMult, doZoom),
        _translateY(y, fromTopLeft, yMult, doZoom),
        ((-cameraDirection + 90) / 180) * Math.PI
      );
      return rotated[0];
    }
  }
  function translateY(
    y,
    fromTopLeft = false,
    yMult = 1,
    doZoom = true,
    x = 0,
    xMult = yMult
  ) {
    if ((cameraDirection - 90) % 360 === 0 || !doZoom) {
      return _translateY(y, fromTopLeft, yMult, doZoom);
    } else {
      const w = fromTopLeft ? vm.runtime.stageWidth / 2 : 0;
      const h = fromTopLeft ? vm.runtime.stageHeight / 2 : 0;
      const rotated = rotate(
        cameraX + w,
        cameraY + h,
        _translateX(x, fromTopLeft, xMult, doZoom),
        _translateY(y, fromTopLeft, yMult, doZoom),
        ((-cameraDirection + 90) / 180) * Math.PI
      );
      return rotated[1];
    }
  }

  // fix mouse positions
  const oldSX = vm.runtime.ioDevices.mouse.getScratchX;
  const oldSY = vm.runtime.ioDevices.mouse.getScratchY;
  vm.runtime.ioDevices.mouse.getScratchX = function (...a) {
    return translateX(
      oldSX.apply(this, a),
      false,
      1,
      true,
      oldSY.apply(this, a),
      1
    );
  };
  vm.runtime.ioDevices.mouse.getScratchY = function (...a) {
    return translateY(
      oldSY.apply(this, a),
      false,
      1,
      true,
      oldSX.apply(this, a),
      1
    );
  };
  const oldCX = vm.runtime.ioDevices.mouse.getClientX;
  const oldCY = vm.runtime.ioDevices.mouse.getClientY;
  vm.runtime.ioDevices.mouse.getClientX = function (...a) {
    return translateX(
      oldCX.apply(this, a),
      true,
      1,
      true,
      oldCY.apply(this, a),
      -1
    );
  };
  vm.runtime.ioDevices.mouse.getClientY = function (...a) {
    return translateY(
      oldCY.apply(this, a),
      true,
      -1,
      true,
      oldCX.apply(this, a),
      1
    );
  };

  const oldPick = vm.renderer.pick;
  vm.renderer.pick = function (x, y) {
    return oldPick.call(
      this,
      translateX(x, true, 1, true, y, -1),
      translateY(y, true, -1, true, x, 1)
    );
  };

  const oldExtract = vm.renderer.extractDrawableScreenSpace;
  vm.renderer.extractDrawableScreenSpace = function (...args) {
    const extracted = oldExtract.apply(this, args);
    extracted.x = translateX(extracted.x, false, -1, false, extracted.y, 1);
    extracted.y = translateY(extracted.y, false, 1, false, extracted.x, -1);
    return extracted;
  };

  // @ts-expect-error
  if (vm.runtime.ext_scratch3_looks) {
    // @ts-expect-error
    const oldPosBubble = vm.runtime.ext_scratch3_looks._positionBubble;
    // @ts-expect-error
    vm.runtime.ext_scratch3_looks._positionBubble = function (target) {
      // it's harder to limit speech bubbles to the camera region...
      // it's easier to just remove speech bubble bounds entirely
      const oldGetNativeSize = this.runtime.renderer.getNativeSize;
      this.runtime.renderer.getNativeSize = () => [Infinity, Infinity];
      try {
        return oldPosBubble.call(this, target);
      } finally {
        this.runtime.renderer.getNativeSize = oldGetNativeSize;
      }
    };
  }

  class Camera {
    getInfo() {
      return {
        id: "DTcameracontrols",
        name: Scratch.translate("Camera V1"),

        color1: "#ff4da7",
        color2: "#de4391",
        color3: "#c83c82",

        menuIconURI: icon,

        blocks: [
          {
            opcode: "moveSteps",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("move camera [val] steps"),
            arguments: {
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
              },
            },
          },
          {
            opcode: "rotateCW",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("turn camera [image] [val] degrees"),
            arguments: {
              image: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: CW,
              },
              val: {
                type: Scratch.ArgumentType.ANGLE,
                defaultValue: 15,
              },
            },
          },
          {
            opcode: "rotateCCW",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("turn camera [image] [val] degrees"),
            arguments: {
              image: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: CCW,
              },
              val: {
                type: Scratch.ArgumentType.ANGLE,
                defaultValue: 15,
              },
            },
          },
          "---",
          {
            opcode: "goTo",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("move camera to [sprite]"),
            arguments: {
              sprite: {
                type: Scratch.ArgumentType.STRING,
                menu: "sprites",
              },
            },
          },
          {
            opcode: "setBoth",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set camera to x: [x] y: [y]"),
            arguments: {
              x: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          "---",
          {
            opcode: "setDirection",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set camera direction to [val]"),
            arguments: {
              val: {
                type: Scratch.ArgumentType.ANGLE,
                defaultValue: 90,
              },
            },
          },
          {
            opcode: "pointTowards",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("point camera towards [sprite]"),
            arguments: {
              sprite: {
                type: Scratch.ArgumentType.STRING,
                menu: "sprites",
              },
            },
          },
          "---",
          {
            opcode: "changeX",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("change camera x by [val]"),
            arguments: {
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
              },
            },
          },
          {
            opcode: "setX",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set camera x to [val]"),
            arguments: {
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "changeY",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("change camera y by [val]"),
            arguments: {
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
              },
            },
          },
          {
            opcode: "setY",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set camera y to [val]"),
            arguments: {
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          "---",
          {
            opcode: "getX",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("camera x"),
          },
          {
            opcode: "getY",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("camera y"),
          },
          {
            opcode: "getDirection",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("camera direction"),
          },
          /*
          // debugging blocks
          {
            opcode: "getCX",
            blockType: Scratch.BlockType.REPORTER,
            text: "client x",
          },
          {
            opcode: "getCY",
            blockType: Scratch.BlockType.REPORTER,
            text: "client y",
          },
          */
          "---",
          {
            opcode: "blocktx",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("stage to world x: [x]"),
            arguments: {
              x: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          {
            opcode: "blockty",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("stage to world y: [y]"),
            arguments: {
              y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          "---",
          {
            opcode: "changeZoom",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("change camera zoom by [val]"),
            arguments: {
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
              },
            },
          },
          {
            opcode: "setZoom",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set camera zoom to [val] %"),
            arguments: {
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          {
            opcode: "getZoom",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("camera zoom"),
          },
          "---",
          {
            opcode: "setCol",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set background color to [val]"),
            arguments: {
              val: {
                type: Scratch.ArgumentType.COLOR,
              },
            },
          },
          {
            opcode: "getCol",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("background color"),
          },
        ],
        menus: {
          sprites: {
            items: "getSprites",
            acceptReporters: true,
          },
        },
      };
    }

    getCX() {
      return vm.runtime.ioDevices.mouse.getClientX();
    }
    getCY() {
      return vm.runtime.ioDevices.mouse.getClientY();
    }

    getSprites() {
      const sprites = [];
      Scratch.vm.runtime.targets.forEach((e) => {
        if (e.isOriginal && !e.isStage) sprites.push(e.sprite.name);
      });
      if (sprites.length === 0) {
        sprites.push(Scratch.translate("no sprites exist"));
      }
      return sprites;
    }

    setBoth(args, util) {
      cameraX = +args.x;
      cameraY = +args.y;
      updateCamera();
      vm.runtime.requestRedraw();
    }
    changeZoom(args, util) {
      cameraZoom += +args.val;
      updateCamera();
      vm.runtime.requestRedraw();
    }
    setZoom(args, util) {
      cameraZoom = +args.val;
      updateCamera();
      vm.runtime.requestRedraw();
    }
    changeX(args, util) {
      cameraX += +args.val;
      updateCamera();
      vm.runtime.requestRedraw();
    }
    setX(args, util) {
      cameraX = +args.val;
      updateCamera();
      vm.runtime.requestRedraw();
    }
    changeY(args, util) {
      cameraY += +args.val;
      updateCamera();
      vm.runtime.requestRedraw();
    }
    setY(args, util) {
      cameraY = +args.val;
      updateCamera();
      vm.runtime.requestRedraw();
    }
    setDirection(args, util) {
      cameraDirection = +args.val;
      updateCamera();
      vm.runtime.requestRedraw();
    }
    rotateCW(args, util) {
      cameraDirection = cameraDirection + +args.val;
      updateCamera();
      vm.runtime.requestRedraw();
    }
    rotateCCW(args, util) {
      cameraDirection = cameraDirection - +args.val;
      updateCamera();
      vm.runtime.requestRedraw();
    }
    getX() {
      return cameraX;
    }
    getY() {
      return cameraY;
    }
    getZoom() {
      return cameraZoom;
    }
    getDirection() {
      return cameraDirection;
    }
    blocktx(args) {
      return _translateX(Scratch.Cast.toNumber(args.x));
    }
    blockty(args) {
      return _translateY(Scratch.Cast.toNumber(args.y));
    }
    setCol(args, util) {
      cameraBG = args.val;
      updateCameraBG();
    }
    getCol() {
      return cameraBG;
    }
    moveSteps(args) {
      const dir = ((-cameraDirection + 90) * Math.PI) / 180;
      cameraX += args.val * Math.cos(dir);
      cameraY += args.val * Math.sin(dir);
      updateCamera();
      vm.runtime.requestRedraw();
    }
    goTo(args, util) {
      const target = Scratch.Cast.toString(args.sprite);
      const sprite = vm.runtime.getSpriteTargetByName(target);
      if (!sprite) return;
      cameraX = Math.round(sprite.x);
      cameraY = Math.round(sprite.y);
      updateCamera();
      vm.runtime.requestRedraw();
    }
    pointTowards(args, util) {
      const target = Scratch.Cast.toString(args.sprite);
      const sprite = vm.runtime.getSpriteTargetByName(target);
      if (!sprite) return;
      const targetX = sprite.x;
      const targetY = sprite.y;
      const dx = targetX - cameraX;
      const dy = targetY - cameraY;
      cameraDirection = 90 - this.radToDeg(Math.atan2(dy, dx));
      updateCamera();
      vm.runtime.requestRedraw();
    }
    radToDeg(rad) {
      return (rad * 180) / Math.PI;
    }
  }

  Scratch.extensions.register(new Camera());
})(Scratch);
