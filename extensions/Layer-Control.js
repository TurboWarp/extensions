// Name: Layer Control
// ID: SPlayering
// Description: Relayer Pen, Video Camera, Backdrops, Sprites and More
// By: SharkPool

// Version V.1.0.4

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Layer Control must run unsandboxed!");

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMDQuNDg0NTQiIGhlaWdodD0iMTA0LjQ4NDU0IiB2aWV3Qm94PSIwLDAsMTA0LjQ4NDU0LDEwNC40ODQ1NCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4Ny43NTc3NiwtMTI3Ljc1Nzc2KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTkwLjI1Nzc3LDE4MC4wMDAwNGMwLC0yNy40NzE4OSAyMi4yNzAzNywtNDkuNzQyMjcgNDkuNzQyMjcsLTQ5Ljc0MjI3YzI3LjQ3MTg5LDAgNDkuNzQyMjcsMjIuMjcwMzcgNDkuNzQyMjcsNDkuNzQyMjdjMCwyNy40NzE4OSAtMjIuMjcwMzcsNDkuNzQyMjcgLTQ5Ljc0MjI3LDQ5Ljc0MjI3Yy0yNy40NzE4OSwwIC00OS43NDIyNywtMjIuMjcwMzcgLTQ5Ljc0MjI3LC00OS43NDIyN3oiIGZpbGw9IiNiYjcxZTYiIHN0cm9rZT0iIzg5NTNhOCIgc3Ryb2tlLXdpZHRoPSI1Ii8+PHBhdGggZD0iTTIxNS42MzI1NywxODQuNjI4OTNjLTMuNDc4OTgsMCAtNi4yOTkyNCwtMi44MjAyNyAtNi4yOTkyNCwtNi4yOTkyNHYtMjIuNjk3MTFjMCwtMy40Nzg5OCAyLjgyMDI3LC02LjI5OTI0IDYuMjk5MjQsLTYuMjk5MjRoMjIuNjk3MTFjMy40Nzg5OCwwIDYuMjk5MjQsMi44MjAyNyA2LjI5OTI0LDYuMjk5MjR2MjIuNjk3MTFjMCwzLjQ3ODk4IC0yLjgyMDI3LDYuMjk5MjQgLTYuMjk5MjQsNi4yOTkyNHoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTIyOC42NTE0NCwxOTcuNjQ3OGMtMy40Nzg5OCwwIC02LjI5OTI0LC0yLjgyMDI3IC02LjI5OTI0LC02LjI5OTI0di0yMi42OTcxMWMwLC0zLjQ3ODk4IDIuODIwMjcsLTYuMjk5MjQgNi4yOTkyNCwtNi4yOTkyNGgyMi42OTcxMWMzLjQ3ODk4LDAgNi4yOTkyNCwyLjgyMDI3IDYuMjk5MjQsNi4yOTkyNHYyMi42OTcxMWMwLDMuNDc4OTggLTIuODIwMjcsNi4yOTkyNCAtNi4yOTkyNCw2LjI5OTI0eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYmI3MWU2IiBzdHJva2Utd2lkdGg9IjcuNSIvPjxwYXRoIGQ9Ik0yMjguNjUxNDQsMTk3LjY0NzhjLTMuNDc4OTgsMCAtNi4yOTkyNCwtMi44MjAyNyAtNi4yOTkyNCwtNi4yOTkyNHYtMjIuNjk3MTFjMCwtMy40Nzg5OCAyLjgyMDI3LC02LjI5OTI0IDYuMjk5MjQsLTYuMjk5MjRoMjIuNjk3MTFjMy40Nzg5OCwwIDYuMjk5MjQsMi44MjAyNyA2LjI5OTI0LDYuMjk5MjR2MjIuNjk3MTFjMCwzLjQ3ODk4IC0yLjgyMDI3LDYuMjk5MjQgLTYuMjk5MjQsNi4yOTkyNHoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI0MS42NzAzMSwyMTAuNjY2NjdjLTMuNDc4OTgsMCAtNi4yOTkyNCwtMi44MjAyNyAtNi4yOTkyNCwtNi4yOTkyNHYtMjIuNjk3MTFjMCwtMy40Nzg5OCAyLjgyMDI3LC02LjI5OTI0IDYuMjk5MjQsLTYuMjk5MjRoMjIuNjk3MTFjMy40Nzg5OCwwIDYuMjk5MjQsMi44MjAyNyA2LjI5OTI0LDYuMjk5MjR2MjIuNjk3MTFjMCwzLjQ3ODk4IC0yLjgyMDI3LDYuMjk5MjQgLTYuMjk5MjQsNi4yOTkyNHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2JiNzFlNiIgc3Ryb2tlLXdpZHRoPSI3LjUiLz48cGF0aCBkPSJNMjQxLjY3MDMxLDIxMC42NjY2N2MtMy40Nzg5OCwwIC02LjI5OTI0LC0yLjgyMDI3IC02LjI5OTI0LC02LjI5OTI0di0yMi42OTcxMWMwLC0zLjQ3ODk4IDIuODIwMjcsLTYuMjk5MjQgNi4yOTkyNCwtNi4yOTkyNGgyMi42OTcxMWMzLjQ3ODk4LDAgNi4yOTkyNCwyLjgyMDI3IDYuMjk5MjQsNi4yOTkyNHYyMi42OTcxMWMwLDMuNDc4OTggLTIuODIwMjcsNi4yOTkyNCAtNi4yOTkyNCw2LjI5OTI0eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48L2c+PC9nPjwvc3ZnPg==";

  // Crash Preventer -- By GarboMuffin (More Events)
  // Saving Projects with Incorrect Layering Corrupts Projects, this fixes it :D
  const originalSaveProjectSb3 = vm.saveProjectSb3;
  vm.saveProjectSb3 = async function (...args) {
    await beforeSave();
    return await originalSaveProjectSb3.apply(this, args);
  };
  const beforeSave = () =>
    new Promise((resolve) => {
      const instanceClass = new SPlayering();
      instanceClass["reset"]();
      resolve();
    });
  const originalSaveProjectSb3Stream = vm.saveProjectSb3Stream;
  vm.saveProjectSb3Stream = function (...args) {
    let realStream = null;
    const queuedCalls = [];
    const whenStreamReady = (methodName, args) => {
      if (realStream) return realStream[methodName].apply(realStream, args);
      else {
        return new Promise((resolve) => {
          queuedCalls.push({ resolve, methodName, args });
        });
      }
    };
    const streamWrapper = {
      on: (...args) => void whenStreamReady("on", args),
      pause: (...args) => void whenStreamReady("pause", args),
      resume: (...args) => void whenStreamReady("resume", args),
      accumulate: (...args) => whenStreamReady("accumulate", args),
    };
    beforeSave().then(() => {
      realStream = originalSaveProjectSb3Stream.apply(this, args);
      for (const queued of queuedCalls) {
        queued.resolve(realStream[queued.methodName].apply(realStream, queued.args));
      }
      queuedCalls.length = 0;
    });
    return streamWrapper;
  };

  class SPlayering {
    getInfo() {
      return {
        id: "SPlayering",
        name: "Layer Control",
        color1: "#bb71e6",
        menuIconURI,
        blocks: [
          {
            opcode: "getAllID",
            blockType: Scratch.BlockType.REPORTER,
            text: "get all layer IDs"
          },
          {
            opcode: "getID",
            blockType: Scratch.BlockType.REPORTER,
            text: "get ID layer of [TARGET]",
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "TARGETS",
              }
            }
          },
          {
            opcode: "getOwner",
            blockType: Scratch.BlockType.REPORTER,
            text: "get owner of layer ID [ID]",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: "moveID",
            blockType: Scratch.BlockType.COMMAND,
            text: "relayer ID [TARGET] to layer [ORDER]",
            arguments: {
              ORDER: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              TARGET: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: "swapID",
            blockType: Scratch.BlockType.COMMAND,
            text: "swap layers of ID [TARGET] with ID [ORDER]",
            arguments: {
              ORDER: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              TARGET: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: "reset",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset special layers"
          }
        ],
        menus: {
          TARGETS: {
            acceptReporters: true,
            items: this._getTargets(true)
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

    getAllID() { return JSON.stringify(vm.renderer._drawList) }

    getID(args, util) {
      if (args.TARGET === "_myself_") return util.target.drawableID;
      if (args.TARGET === "_stage_") return runtime.getTargetForStage().drawableID;
      if (args.TARGET === "_pen_") return this.findSpecial(vm.renderer._allDrawables, "a_lineColorIndex");
      const videoL = runtime.ioDevices.video._drawable;
      if (args.TARGET === "_video_") return videoL !== -1 ? videoL : "";
      const target = runtime.getSpriteTargetByName(args.TARGET);
      return target ? target.drawableID : "";
    }
    // renderer._penSkinID doesnt work, we need to use this:
    findSpecial(array, key) {
      for (let i = 0; i < array.length; i++) {
        if (array[i] && array[i].skin[key] !== undefined) return i;
      }
      return "";
    }

    getOwner(args, util) {
      // Cant Properly Return Non-Existent Pen/Video Layer, Empty Number Inputs are 0?
      const ID = Scratch.Cast.toNumber(args.ID);
      const penID = vm.renderer._penSkinId || "";
      const videoL = runtime.ioDevices.video._drawable;
      const vidID = videoL !== -1 ? videoL : "";
      if (ID === penID) return "Pen Layer";
      if (ID === vidID) return "Video Layer";
      if (ID < 0) return "";
      const spriteNames = {};
      const targets = Scratch.vm.runtime.targets;
      for (let index = 0; index < targets.length; index++) {
        const target = targets[index];
        spriteNames[target.drawableID] = {
          text: `${target.getName()}${target.isOriginal ? "" : " (Clone)"}`
        };
      }
      return spriteNames[ID] ? spriteNames[ID].text : "";
    }

    reset() {
      const drawables = vm.renderer._drawList;
      const stage = runtime.getTargetForStage().drawableID;
      const pen = vm.renderer._penSkinId || -1;
      const video = runtime.ioDevices.video._drawable || -1;
      const newDraw = [stage, ...drawables.filter(item => ![stage, pen, video].includes(item))];
      if (video !== -1) newDraw.splice(1, 0, video);
      if (pen !== -1) newDraw.splice(video !== -1 ? 2 : 1, 0, pen);
      vm.renderer._drawList = newDraw;
      vm.runtime.targets[0].updateAllDrawableProperties();
      runtime.requestRedraw();
    }

    moveID(args) {
      const allLay = vm.renderer._drawList;
      const index = allLay.indexOf(args.TARGET);
      const targetL = Math.max(0, Math.min(allLay.length - 1, Math.round(args.ORDER)));
      if (index !== -1) {
        const removedLayer = allLay.splice(index, 1)[0];
        vm.renderer._drawList.splice(targetL, 0, removedLayer);
        vm.runtime.targets[0].updateAllDrawableProperties();
        runtime.requestRedraw();
      }
    }

    swapID(args) {
      const allLay = vm.renderer._drawList;
      const target1 = allLay.indexOf(args.TARGET);
      const target2 = allLay.indexOf(args.ORDER);
      if (target1 === -1 || target2 === -1) return;
      if (target1 !== target2 && target1 >= 0 && target1 < allLay.length && target2 >= 0 && target2 < allLay.length) {
        [allLay[target1], allLay[target2]] = [allLay[target2], allLay[target1]];
        vm.runtime.targets[0].updateAllDrawableProperties();
        runtime.requestRedraw();
      }
    }
  }

  Scratch.extensions.register(new SPlayering());
})(Scratch);
