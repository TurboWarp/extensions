// Name: Renderer Control
// ID: SPrenderControl
// Description: Control Visuals of Sprites, Backdrops, Pen, Video, and More!
// By: SharkPool

// Version V.1.2.0

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Render Control must run unsandboxed!");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4NS4zMDMiIGhlaWdodD0iODUuMzAzIiB2aWV3Qm94PSIwIDAgODUuMzAzIDg1LjMwMyI+PGcgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMiA0Mi42NTJDMiAyMC4yMDEgMjAuMiAyIDQyLjY1MiAyYzIyLjQ1MSAwIDQwLjY1MiAxOC4yIDQwLjY1MiA0MC42NTIgMCAyMi40NTEtMTguMiA0MC42NTItNDAuNjUyIDQwLjY1MkMyMC4yMDEgODMuMzA0IDIgNjUuMTA0IDIgNDIuNjUyeiIgZmlsbD0iIzUzODZiNSIgc3Ryb2tlPSIjMmY0YzY3IiBzdHJva2Utd2lkdGg9IjQiLz48cGF0aCBkPSJtNDQuODc5IDY2Ljg3Mi0zLjk2NSAxLjY2IDEuNjYzLTMuOTUxYzEuMTM3LTIuNjk4IDIuNzEyLTUuMDU5IDQuNjkyLTcuMDMxbDE4LjQyMi0xOC4zNTRjLjc5LS43ODYgMi40NzItLjM4MyAzLjc2MS45MDIgMS4yODcgMS4yODIgMS42OTQgMi45Ni45MDUgMy43NDVMNTEuOTM1IDYyLjE5OGMtMS45OCAxLjk3My00LjM1IDMuNTQ0LTcuMDU2IDQuNjc1IiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTUyLjQzOSA0Ny4xMjJzMi40NCAyLjA3MSA0LjA1Ny0xLjQ0MmMzLjUtNy42MDIgNy42NS01LjM4MyA3LjY1LTUuMzgzIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik01My45MjQgNDYuNTY1YS44NDMuODQzIDAgMSAxLS44NDMtLjg0MmMuNDY3IDAgLjg0My4zNzcuODQzLjg0NHoiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNNTYuMjg2IDMyLjc5OWE0LjEzIDQuMTMgMCAwIDEtNC4xMy00LjEzdi00LjU3MmE0LjEzIDQuMTMgMCAwIDEgNC4xMy00LjEzaDQuNTczYTQuMTMgNC4xMyAwIDAgMSA0LjEzIDQuMTN2NC41NzJhNC4xMyA0LjEzIDAgMCAxLTQuMTMgNC4xM3ptLTE2LjQ5OCAwYTQuMTMgNC4xMyAwIDAgMS00LjEzLTQuMTN2LTQuNTcyYTQuMTMgNC4xMyAwIDAgMSA0LjEzLTQuMTNoNC41NzNhNC4xMyA0LjEzIDAgMCAxIDQuMTMgNC4xM3Y0LjU3MmE0LjEzIDQuMTMgMCAwIDEtNC4xMyA0LjEzem0tMTYuNDk3IDBhNC4xMyA0LjEzIDAgMCAxLTQuMTMtNC4xM3YtNC41NzJhNC4xMyA0LjEzIDAgMCAxIDQuMTMtNC4xM2g0LjU3MmE0LjEzIDQuMTMgMCAwIDEgNC4xMyA0LjEzdjQuNTcyYTQuMTMgNC4xMyAwIDAgMS00LjEzIDQuMTN6bTAgMTYuNDk4YTQuMTMgNC4xMyAwIDAgMS00LjEzLTQuMTN2LTQuNTcyYTQuMTMgNC4xMyAwIDAgMSA0LjEzLTQuMTNoNC41NzJhNC4xMyA0LjEzIDAgMCAxIDQuMTMgNC4xM3Y0LjU3MmE0LjEzIDQuMTMgMCAwIDEtNC4xMyA0LjEzem0wIDE2LjQ5N2E0LjEzIDQuMTMgMCAwIDEtNC4xMy00LjEzdi00LjU3MmE0LjEzIDQuMTMgMCAwIDEgNC4xMy00LjEzaDQuNTcyYTQuMTMgNC4xMyAwIDAgMSA0LjEzIDQuMTN2NC41NzNhNC4xMyA0LjEzIDAgMCAxLTQuMTMgNC4xM3ptMTYuNDk3LTE2LjQ5N2E0LjEzIDQuMTMgMCAwIDEtNC4xMy00LjEzdi00LjU3MmE0LjEzIDQuMTMgMCAwIDEgNC4xMy00LjEzaDQuNTczYTQuMTMgNC4xMyAwIDAgMSA0LjEzIDQuMTN2NC41NzJhNC4xMyA0LjEzIDAgMCAxLTQuMTMgNC4xM3oiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+";

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const render = vm.renderer;

  class SPrenderControl {
    getInfo() {
      return {
        id: "SPrenderControl",
        name: "Renderer Control",
        color1: "#5386b5",
        color2: "#3d6184",
        color3: "#2f4c67",
        menuIconURI,
        blocks: [
          {
            opcode: "getID",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get ID layer of [TARGET]"),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "getOwner",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get owner of layer ID [ID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          "---",
          {
            opcode: "exportID",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("export ID [ID] as data.uri"),
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: "setQuality",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set quality of ID [ID] to [NUM]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          "---",
          {
            opcode: "effectID",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [EFFECT] of ID [ID] to [NUM]"),
            arguments: {
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTS" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: "resetID",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("reset effects of ID [ID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          "---",
          {
            opcode: "scaleID",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set scale of ID [ID] to x [x] y [y]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            }
          },
          {
            opcode: "scaleOfID",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("scale [XY] of ID [ID]"),
            arguments: {
              XY: { type: Scratch.ArgumentType.STRING, menu: "XY" },
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          "---",
          {
            opcode: "positionID",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set position of ID [ID] to x [x] y [y]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "posOfID",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[XY] position of ID [ID]"),
            arguments: {
              XY: { type: Scratch.ArgumentType.STRING, menu: "XY" },
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          "---",
          {
            opcode: "directID",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set direction of ID [ID] to [ANGLE]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ANGLE: { type: Scratch.ArgumentType.ANGLE, defaultValue: 90 }
            }
          },
          {
            opcode: "dirOfID",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("direction of ID [ID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "rotateID",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set rotation center of ID [ID] to x [x] y [y]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "rotateOfID",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("rotation center [XY] of ID [ID]"),
            arguments: {
              XY: { type: Scratch.ArgumentType.STRING, menu: "XY" },
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            }
          },
        ],
        menus: {
          XY: ["x", "y"],
          TARGETS: { acceptReporters: true, items: "_getTargets" },
          EFFECTS: { acceptReporters: true, items: "_getEffects" }
        }
      };
    }

    // Helper Funcs
    _getTargets() {
      const spriteNames = [
        { text: Scratch.translate("myself"), value: "_myself_" },
        { text: Scratch.translate("Stage"), value: "_stage_" },
        { text: Scratch.translate("Video Layer"), value: "_video_" },
        { text: Scratch.translate("Pen Layer"), value: "_pen_" }
      ];
      // Custom Drawable Layer (CST's 3D or Simple3D Exts for Example)
      for (var i = 0; i < render._allDrawables.length; i++) {
        const drawable = render._allDrawables[i];
        if (drawable !== undefined && drawable.customDrawableName !== undefined) spriteNames.push({
          text: drawable.customDrawableName, value: `${i}=SP-custLayer`
        });
      }
      // Sprites
      const targets = runtime.targets;
      for (let index = 1; index < targets.length; index++) {
        const target = targets[index];
        if (target.isOriginal) spriteNames.push({ text: target.getName(), value: target.getName() });
      }
      return spriteNames.length > 0 ? spriteNames : [""];
    }

    _getEffects() {
      const effects = Object.keys(vm.editingTarget.effects);
      return effects.length > 0 ? effects : [""];
    }

    // Block Funcs
    getID(args, util) {
      if (args.TARGET === "_myself_") return util.target.drawableID;
      if (args.TARGET === "_stage_") return runtime.getTargetForStage().drawableID;
      if (args.TARGET === "_pen_") return runtime.ext_pen?._penDrawableId || "";
      const videoL = runtime.ioDevices.video._drawable;
      if (args.TARGET === "_video_") return videoL !== -1 ? videoL : "";
      if (args.TARGET.includes("=SP-custLayer")) {
        const layerID = parseInt(args.TARGET);
        if (render._allDrawables[layerID]?.customDrawableName !== undefined) return layerID;
      }
      const target = runtime.getSpriteTargetByName(args.TARGET);
      return target ? target.drawableID : "";
    }

    getOwner(args, util) {
      const ID = Scratch.Cast.toNumber(args.ID); // Empty Number Inputs are always 0?
      if (ID < 0) return "";
      const penID = runtime.ext_pen?._penDrawableId || "";
      const videoL = runtime.ioDevices.video._drawable;
      const vidID = videoL !== -1 ? videoL : "";
      if (ID === penID) return "Pen Layer";
      if (ID === vidID) return "Video Layer";
      // Sprite Check
      for (const target of runtime.targets) {
        if (target.drawableID === ID) return `${target.getName()}${target.isOriginal ? "" : " (Clone)"}`;
      }
      // Custom Layer Check
      for (var i = 0; i < render._allDrawables.length; i++) {
        const drawable = render._allDrawables[i];
        if (
          drawable.customDrawableName !== undefined && i === ID
        ) return drawable.customDrawableName;
      }
      return "";
    }

    exportID(args) {
      if (render._drawList.indexOf(args.ID) === -1) return "";
      const imageData = render.extractDrawableScreenSpace(args.ID).imageData;
      var canvas = document.createElement("canvas");
      canvas.width = imageData.width;
      canvas.height = imageData.height;
      canvas.getContext("2d").putImageData(imageData, 0, 0);
      return canvas.toDataURL("image/png");
    }

    setQuality(args) {
      const ID = Scratch.Cast.toNumber(args.ID);
      if (render._drawList.indexOf(ID) === -1) return;
      const value = Scratch.Cast.toNumber(args.NUM);
      const drawable = render._allDrawables[ID];
      const penID = runtime.ext_pen?._penDrawableId || "";
      drawable.setHighQuality(true);
      if (penID === ID) drawable.skin.setRenderQuality(Math.max(0.05, Math.min(34, value / 3))); // 3 is the max before webgl errors
      else drawable.skin._maxTextureScale = Math.max(1, Math.min(100, Math.round(value)));
      drawable.skin.emitWasAltered();
    }

    effectID(args) {
      const num = Scratch.Cast.toNumber(args.NUM);
      const allLay = render._drawList;
      if (!this._getEffects().some(effect => effect === args.EFFECT)) return;
      if (allLay.indexOf(args.ID) !== -1) render._allDrawables[args.ID].updateEffect(args.EFFECT, num);
    }

    scaleID(args) {
      const allLay = render._drawList;
      if (allLay.indexOf(args.ID) !== -1) render._allDrawables[args.ID].updateScale([
        Scratch.Cast.toNumber(args.x), Scratch.Cast.toNumber(args.y)
      ]);
    }

    scaleOfID(args) {
      const allLay = vm.renderer._drawList;
      if (allLay.indexOf(args.ID) !== -1) return render._allDrawables[args.ID]._scale[args.XY === "x" ? 0 : 1];
      return 0;
    }

    directID(args) {
      const dir = Scratch.Cast.toNumber(args.ANGLE);
      const allLay = render._drawList;
      if (allLay.indexOf(args.ID) !== -1) render._allDrawables[args.ID].updateDirection(dir);
    }

    dirOfID(args) {
      const allLay = render._drawList;
      if (allLay.indexOf(args.ID) !== -1) return render._allDrawables[args.ID]._direction;
      return 0;
    }

    rotateID(args) {
      const x = Scratch.Cast.toNumber(args.x);
      const y = Scratch.Cast.toNumber(args.y);
      const allLay = render._drawList;
      if (allLay.indexOf(args.ID) !== -1) {
        render._allDrawables[args.ID].skin._rotationCenter = new Float32Array([x, y, 0]);
        render._allDrawables[args.ID]._rotationCenterDirty = true;
      }
    }

    rotateOfID(args) {
      const allLay = render._drawList;
      if (allLay.indexOf(args.ID) !== -1) return render._allDrawables[args.ID]._skinScale[args.XY === "x" ? 0 : 1] / 2;
      return 0;
    }

    positionID(args) {
      args.x = Scratch.Cast.toNumber(args.x);
      args.y = Scratch.Cast.toNumber(args.y);
      const allLay = render._drawList;
      if (allLay.indexOf(args.ID) !== -1) render._allDrawables[args.ID].updatePosition([args.x, args.y]);
    }

    posOfID(args) {
      const allLay = render._drawList;
      if (allLay.indexOf(args.ID) !== -1) return render._allDrawables[args.ID]._position[args.XY === "x" ? 0 : 1];
      return 0;
    }

    resetID(args) {
      for (var i = 0; i < ScratchEffects.length; i++) {
        this.effectID({ ID : args.ID, EFFECT : ScratchEffects[i].value, NUM : 0 });
      }
    }
  }

  Scratch.extensions.register(new SPrenderControl());
})(Scratch);
