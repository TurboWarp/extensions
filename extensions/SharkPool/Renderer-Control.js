// Name: Renderer Control
// ID: SPrenderControl
// Description: Control Visuals of Sprites, Backdrops, Pen, Video, and More!
// By: SharkPool

// Version V.1.0.0

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Render Control must run unsandboxed!");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4NS4zMDMyNiIgaGVpZ2h0PSI4NS4zMDMyNiIgdmlld0JveD0iMCwwLDg1LjMwMzI2LDg1LjMwMzI2Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTk3LjM0ODM3LC0xMzcuMzQ4MzcpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xOTkuMzQ4MzcsMTgwYzAsLTIyLjQ1MTI3IDE4LjIwMDM1LC00MC42NTE2MyA0MC42NTE2MywtNDAuNjUxNjNjMjIuNDUxMjcsMCA0MC42NTE2MywxOC4yMDAzNSA0MC42NTE2Myw0MC42NTE2M2MwLDIyLjQ1MTI3IC0xOC4yMDAzNSw0MC42NTE2MyAtNDAuNjUxNjMsNDAuNjUxNjNjLTIyLjQ1MTI3LDAgLTQwLjY1MTYzLC0xOC4yMDAzNSAtNDAuNjUxNjMsLTQwLjY1MTYzeiIgZmlsbD0iIzUzODZiNSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiMyZjRjNjciIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48cGF0aCBkPSJNMjQyLjIyNjU5LDIwNC4yMjA1OWwtMy45NjQyMSwxLjY2MDNsMS42NjMxLC0zLjk1MjA4YzEuMTM2MSwtMi42OTc1MyAyLjcxMTUyLC01LjA1ODMzIDQuNjkxNzYsLTcuMDMxMTFsMTguNDIxOTIsLTE4LjM1MzgzYzAuNzg5MTEsLTAuNzg1MzggMi40NzE4LC0wLjM4MjQzIDMuNzYwODcsMC45MDE5N2MxLjI4NzIsMS4yODI1NCAxLjY5Mzg4LDIuOTU5NjMgMC45MDQ3NywzLjc0NTAxbC0xOC40MjE5MiwxOC4zNTQ3NmMtMS45ODAyNCwxLjk3MzcxIC00LjM1MDM3LDMuNTQ0NDcgLTcuMDU2MjksNC42NzQ5NyIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTI0OS43ODY1NywxODQuNDcwNDNjMCwwIDIuNDQwMDksMi4wNzA3MiA0LjA1NzQ5LC0xLjQ0MjA0YzMuNDk5NywtNy42MDE5NiA3LjY1MDQ2LC01LjM4Mzg2IDcuNjUwNDYsLTUuMzgzODYiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yNTEuMjcxNTIsMTgzLjkxMjY0YzAsMC40NjYzOCAtMC4zNzY4MywwLjg0NDE0IC0wLjg0MzIxLDAuODQ0MTRjLTAuNDY2MzgsMCAtMC44NDQxNCwtMC4zNzc3NyAtMC44NDQxNCwtMC44NDMyMWMwLC0wLjQ2NjM4IDAuMzc5NjMsLTAuODQyMjggMC44NDUwOCwtMC44NDIyOGMwLjQ2NjM4LDAgMC44NDMyMSwwLjM3NjgzIDAuODQzMjEsMC44NDMyMXoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yNTMuNjM0MjUsMTcwLjE0NjcyYy0yLjI4MDc2LDAgLTQuMTI5NjgsLTEuODQ4OTIgLTQuMTI5NjgsLTQuMTI5Njh2LTQuNTcyMjljMCwtMi4yODA3NiAxLjg0ODkyLC00LjEyOTY4IDQuMTI5NjgsLTQuMTI5NjhoNC41NzIyOWMyLjI4MDc2LDAgNC4xMjk2OCwxLjg0ODkyIDQuMTI5NjgsNC4xMjk2OHY0LjU3MjI5YzAsMi4yODA3NiAtMS44NDg5Miw0LjEyOTY4IC00LjEyOTY4LDQuMTI5Njh6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjxwYXRoIGQ9Ik0yMzcuMTM2NDEsMTcwLjE0NjcyYy0yLjI4MDc2LDAgLTQuMTI5NjgsLTEuODQ4OTIgLTQuMTI5NjgsLTQuMTI5Njh2LTQuNTcyMjljMCwtMi4yODA3NiAxLjg0ODkyLC00LjEyOTY4IDQuMTI5NjgsLTQuMTI5NjhoNC41NzIyOWMyLjI4MDc2LDAgNC4xMjk2OCwxLjg0ODkyIDQuMTI5NjgsNC4xMjk2OHY0LjU3MjI5YzAsMi4yODA3NiAtMS44NDg5Miw0LjEyOTY4IC00LjEyOTY4LDQuMTI5Njh6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjxwYXRoIGQ9Ik0yMjAuNjM4NTcsMTcwLjE0NjcyYy0yLjI4MDc2LDAgLTQuMTI5NjgsLTEuODQ4OTIgLTQuMTI5NjgsLTQuMTI5Njh2LTQuNTcyMjljMCwtMi4yODA3NiAxLjg0ODkyLC00LjEyOTY4IDQuMTI5NjgsLTQuMTI5NjhoNC41NzIyOWMyLjI4MDc2LDAgNC4xMjk2OCwxLjg0ODkyIDQuMTI5NjgsNC4xMjk2OHY0LjU3MjI5YzAsMi4yODA3NiAtMS44NDg5Miw0LjEyOTY4IC00LjEyOTY4LDQuMTI5Njh6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjxwYXRoIGQ9Ik0yMjAuNjM4NTcsMTg2LjY0NDU1Yy0yLjI4MDc2LDAgLTQuMTI5NjgsLTEuODQ4OTIgLTQuMTI5NjgsLTQuMTI5Njh2LTQuNTcyMjljMCwtMi4yODA3NiAxLjg0ODkyLC00LjEyOTY4IDQuMTI5NjgsLTQuMTI5NjhoNC41NzIyOWMyLjI4MDc2LDAgNC4xMjk2OCwxLjg0ODkyIDQuMTI5NjgsNC4xMjk2OHY0LjU3MjI5YzAsMi4yODA3NiAtMS44NDg5Miw0LjEyOTY4IC00LjEyOTY4LDQuMTI5Njh6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjxwYXRoIGQ9Ik0yMjAuNjM4NTcsMjAzLjE0MjM5Yy0yLjI4MDc2LDAgLTQuMTI5NjgsLTEuODQ4OTIgLTQuMTI5NjgsLTQuMTI5Njh2LTQuNTcyMjljMCwtMi4yODA3NiAxLjg0ODkyLC00LjEyOTY4IDQuMTI5NjgsLTQuMTI5NjhoNC41NzIyOWMyLjI4MDc2LDAgNC4xMjk2OCwxLjg0ODkyIDQuMTI5NjgsNC4xMjk2OHY0LjU3MjI5YzAsMi4yODA3NiAtMS44NDg5Miw0LjEyOTY4IC00LjEyOTY4LDQuMTI5Njh6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjxwYXRoIGQ9Ik0yMzcuMTM2NDEsMTg2LjY0NDU1Yy0yLjI4MDc2LDAgLTQuMTI5NjgsLTEuODQ4OTIgLTQuMTI5NjgsLTQuMTI5Njh2LTQuNTcyMjljMCwtMi4yODA3NiAxLjg0ODkyLC00LjEyOTY4IDQuMTI5NjgsLTQuMTI5NjhoNC41NzIyOWMyLjI4MDc2LDAgNC4xMjk2OCwxLjg0ODkyIDQuMTI5NjgsNC4xMjk2OHY0LjU3MjI5YzAsMi4yODA3NiAtMS44NDg5Miw0LjEyOTY4IC00LjEyOTY4LDQuMTI5Njh6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjwvZz48L2c+PC9zdmc+";

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const render = vm.renderer;

  const ScratchEffects = [
    { text: "color", value: "color" }, { text: "fisheye", value: "fisheye", },
    { text: "whirl", value: "whirl" }, { text: "pixelate", value: "pixelate" },
    { text: "mosaic", value: "mosaic" }, { text: "brightness", value: "brightness" },
    { text: "ghost", value: "ghost" }
  ];

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
            text: "get ID of [TARGET]",
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          "---",
          {
            opcode: "effectID",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [EFFECT] of ID [ID] to [NUM]",
            arguments: {
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTS" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: "resetID",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset effects of ID [ID]",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          "---",
          {
            opcode: "scaleID",
            blockType: Scratch.BlockType.COMMAND,
            text: "set scale of ID [ID] to x [x] y [y]",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            }
          },
          {
            opcode: "scaleOfID",
            blockType: Scratch.BlockType.REPORTER,
            text: "scale [XY] of ID [ID]",
            arguments: {
              XY: { type: Scratch.ArgumentType.STRING, menu: "XY" },
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          "---",
          {
            opcode: "positionID",
            blockType: Scratch.BlockType.COMMAND,
            text: "set position of ID [ID] to x [x] y [y]",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "posOfID",
            blockType: Scratch.BlockType.REPORTER,
            text: "[XY] position of ID [ID]",
            arguments: {
              XY: { type: Scratch.ArgumentType.STRING, menu: "XY" },
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          "---",
          {
            opcode: "directID",
            blockType: Scratch.BlockType.COMMAND,
            text: "set direction of ID [ID] to [ANGLE]",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ANGLE: { type: Scratch.ArgumentType.ANGLE, defaultValue: 90 }
            }
          },
          {
            opcode: "dirOfID",
            blockType: Scratch.BlockType.REPORTER,
            text: "direction of ID [ID]",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "rotateID",
            blockType: Scratch.BlockType.COMMAND,
            text: "set rotation center of ID [ID] to x [x] y [y]",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "rotateOfID",
            blockType: Scratch.BlockType.REPORTER,
            text: "rotation center [XY] of ID [ID]",
            arguments: {
              XY: { type: Scratch.ArgumentType.STRING, menu: "XY" },
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            }
          },
        ],
        menus: {
          XY: ["x", "y"],
          TARGETS: {
            acceptReporters: true,
            items: this._getTargets(true)
          },
          EFFECTS: {
            acceptReporters: true,
            items: ScratchEffects
          }
        }
      };
    }

    _getTargets(enable) {
      const spriteNames = [];
      if (enable) spriteNames.push({ text: "myself", value: "_myself_" });
      spriteNames.push({ text: "Stage", value: "_stage_" });
      spriteNames.push({ text: "Video Layer", value: "_video_" });
      spriteNames.push({ text: "Pen Layer", value: "_pen_" });
      const targets = Scratch.vm.runtime.targets;
      for (let index = 1; index < targets.length; index++) {
        const target = targets[index];
        if (target.isOriginal) {
          const targetName = target.getName();
          spriteNames.push({ text: targetName, value: targetName });
        }
      }
      return spriteNames.length > 0 ? spriteNames : [""];
    }

    getID(args, util) {
      if (args.TARGET === "_myself_") return util.target.drawableID;
      if (args.TARGET === "_stage_") return runtime.getTargetForStage().drawableID;
      if (args.TARGET === "_pen_") return vm.renderer._penSkinId || "";
      const videoL = runtime.ioDevices.video._drawable;
      if (args.TARGET === "_video_") return videoL !== -1 ? videoL : "";
      const target = runtime.getSpriteTargetByName(args.TARGET);
      return target ? target.drawableID : "";
    }

    effectID(args) {
      const num = Scratch.Cast.toNumber(args.NUM);
      const allLay = vm.renderer._drawList;
      if (!ScratchEffects.some(effect => effect.value === args.EFFECT)) return;
      if (allLay.indexOf(args.ID) !== -1) render._allDrawables[args.ID].updateEffect(args.EFFECT, num);
    }

    scaleID(args) {
      const x = Scratch.Cast.toNumber(args.x);
      const y = Scratch.Cast.toNumber(args.y);
      const allLay = vm.renderer._drawList;
      if (allLay.indexOf(args.ID) !== -1) render._allDrawables[args.ID].updateScale([x, y]);
    }

    scaleOfID(args) {
      const allLay = vm.renderer._drawList;
      if (allLay.indexOf(args.ID) !== -1) {
        return render._allDrawables[args.ID]._scale[args.XY === "x" ? 0 : 1];
      }
      return 0;
    }

    directID(args) {
      const dir = Scratch.Cast.toNumber(args.ANGLE);
      const allLay = vm.renderer._drawList;
      if (allLay.indexOf(args.ID) !== -1) render._allDrawables[args.ID].updateDirection(dir);
    }

    dirOfID(args) {
      const allLay = vm.renderer._drawList;
      if (allLay.indexOf(args.ID) !== -1) {
        return render._allDrawables[args.ID]._direction;
      }
      return 0;
    }

    rotateID(args) {
      const x = Scratch.Cast.toNumber(args.x);
      const y = Scratch.Cast.toNumber(args.y);
      const allLay = vm.renderer._drawList;
      if (allLay.indexOf(args.ID) !== -1) {
        render._allDrawables[args.ID].skin._rotationCenter = new Float32Array([x, y, 0]);
        render._allDrawables[args.ID]._rotationCenterDirty = true;
      }
    }

    rotateOfID(args) {
      const allLay = vm.renderer._drawList;
      if (allLay.indexOf(args.ID) !== -1) {
        return render._allDrawables[args.ID]._skinScale[args.XY === "x" ? 0 : 1] / 2;
      }
      return 0;
    }

    positionID(args) {
      args.x = Scratch.Cast.toNumber(args.x);
      args.y = Scratch.Cast.toNumber(args.y);
      const allLay = vm.renderer._drawList;
      if (allLay.indexOf(args.ID) !== -1) render._allDrawables[args.ID].updatePosition([args.x, args.y]);
    }

    posOfID(args) {
      const allLay = vm.renderer._drawList;
      if (allLay.indexOf(args.ID) !== -1) {
        return render._allDrawables[args.ID]._position[args.XY === "x" ? 0 : 1];
      }
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
