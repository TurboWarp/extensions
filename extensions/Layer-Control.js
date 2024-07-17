// Name: Layer Control
// ID: SPlayering
// Description: Relayer Pen, Video Camera, Backdrops, Sprites and More
// By: SharkPool

// Version V.1.1.1

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Layer Control must run unsandboxed!");

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const render = vm.renderer;
  let allowRunBlocks = true;

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMDQuNDg0NTQiIGhlaWdodD0iMTA0LjQ4NDU0IiB2aWV3Qm94PSIwLDAsMTA0LjQ4NDU0LDEwNC40ODQ1NCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4Ny43NTc3NiwtMTI3Ljc1Nzc2KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTkwLjI1Nzc3LDE4MC4wMDAwNGMwLC0yNy40NzE4OSAyMi4yNzAzNywtNDkuNzQyMjcgNDkuNzQyMjcsLTQ5Ljc0MjI3YzI3LjQ3MTg5LDAgNDkuNzQyMjcsMjIuMjcwMzcgNDkuNzQyMjcsNDkuNzQyMjdjMCwyNy40NzE4OSAtMjIuMjcwMzcsNDkuNzQyMjcgLTQ5Ljc0MjI3LDQ5Ljc0MjI3Yy0yNy40NzE4OSwwIC00OS43NDIyNywtMjIuMjcwMzcgLTQ5Ljc0MjI3LC00OS43NDIyN3oiIGZpbGw9IiNiYjcxZTYiIHN0cm9rZT0iIzg5NTNhOCIgc3Ryb2tlLXdpZHRoPSI1Ii8+PHBhdGggZD0iTTIxNS42MzI1NywxODQuNjI4OTNjLTMuNDc4OTgsMCAtNi4yOTkyNCwtMi44MjAyNyAtNi4yOTkyNCwtNi4yOTkyNHYtMjIuNjk3MTFjMCwtMy40Nzg5OCAyLjgyMDI3LC02LjI5OTI0IDYuMjk5MjQsLTYuMjk5MjRoMjIuNjk3MTFjMy40Nzg5OCwwIDYuMjk5MjQsMi44MjAyNyA2LjI5OTI0LDYuMjk5MjR2MjIuNjk3MTFjMCwzLjQ3ODk4IC0yLjgyMDI3LDYuMjk5MjQgLTYuMjk5MjQsNi4yOTkyNHoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTIyOC42NTE0NCwxOTcuNjQ3OGMtMy40Nzg5OCwwIC02LjI5OTI0LC0yLjgyMDI3IC02LjI5OTI0LC02LjI5OTI0di0yMi42OTcxMWMwLC0zLjQ3ODk4IDIuODIwMjcsLTYuMjk5MjQgNi4yOTkyNCwtNi4yOTkyNGgyMi42OTcxMWMzLjQ3ODk4LDAgNi4yOTkyNCwyLjgyMDI3IDYuMjk5MjQsNi4yOTkyNHYyMi42OTcxMWMwLDMuNDc4OTggLTIuODIwMjcsNi4yOTkyNCAtNi4yOTkyNCw2LjI5OTI0eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYmI3MWU2IiBzdHJva2Utd2lkdGg9IjcuNSIvPjxwYXRoIGQ9Ik0yMjguNjUxNDQsMTk3LjY0NzhjLTMuNDc4OTgsMCAtNi4yOTkyNCwtMi44MjAyNyAtNi4yOTkyNCwtNi4yOTkyNHYtMjIuNjk3MTFjMCwtMy40Nzg5OCAyLjgyMDI3LC02LjI5OTI0IDYuMjk5MjQsLTYuMjk5MjRoMjIuNjk3MTFjMy40Nzg5OCwwIDYuMjk5MjQsMi44MjAyNyA2LjI5OTI0LDYuMjk5MjR2MjIuNjk3MTFjMCwzLjQ3ODk4IC0yLjgyMDI3LDYuMjk5MjQgLTYuMjk5MjQsNi4yOTkyNHoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI0MS42NzAzMSwyMTAuNjY2NjdjLTMuNDc4OTgsMCAtNi4yOTkyNCwtMi44MjAyNyAtNi4yOTkyNCwtNi4yOTkyNHYtMjIuNjk3MTFjMCwtMy40Nzg5OCAyLjgyMDI3LC02LjI5OTI0IDYuMjk5MjQsLTYuMjk5MjRoMjIuNjk3MTFjMy40Nzg5OCwwIDYuMjk5MjQsMi44MjAyNyA2LjI5OTI0LDYuMjk5MjR2MjIuNjk3MTFjMCwzLjQ3ODk4IC0yLjgyMDI3LDYuMjk5MjQgLTYuMjk5MjQsNi4yOTkyNHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2JiNzFlNiIgc3Ryb2tlLXdpZHRoPSI3LjUiLz48cGF0aCBkPSJNMjQxLjY3MDMxLDIxMC42NjY2N2MtMy40Nzg5OCwwIC02LjI5OTI0LC0yLjgyMDI3IC02LjI5OTI0LC02LjI5OTI0di0yMi42OTcxMWMwLC0zLjQ3ODk4IDIuODIwMjcsLTYuMjk5MjQgNi4yOTkyNCwtNi4yOTkyNGgyMi42OTcxMWMzLjQ3ODk4LDAgNi4yOTkyNCwyLjgyMDI3IDYuMjk5MjQsNi4yOTkyNHYyMi42OTcxMWMwLDMuNDc4OTggLTIuODIwMjcsNi4yOTkyNCAtNi4yOTkyNCw2LjI5OTI0eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48L2c+PC9nPjwvc3ZnPg==";

  /* Layer Repair (Ripped from "More Events")
    The Renderer will Error when the Stage/Pen/Video is Relayered and when 
    loading a Project into the editor with that same project already open.

    This Function Fixes it by Reseting Special Layers and Temporarily skipping
    the "SPlayering" Blocks
  */
  const beforeSave = () =>
    new Promise((resolve) => {
      allowRunBlocks = false;
      const instanceClass = new SPlayering();
      instanceClass["reset"]();
      resolve();
    });
  const ogSaveProjectSb3 = vm.saveProjectSb3;
  vm.saveProjectSb3 = async function (...args) {
    await beforeSave();
    const result = await ogSaveProjectSb3.apply(this, args);
    allowRunBlocks = true;
    return result;
  };
  const ogSaveProjectSb3Stream = vm.saveProjectSb3Stream;
  vm.saveProjectSb3Stream = function (...args) {
    let realStream = null;
    const queuedCalls = [];
    const whenStreamReady = (methodName, args) => {
      if (realStream) return realStream[methodName].apply(realStream, args);
      else return new Promise((resolve) => { queuedCalls.push({ resolve, methodName, args }) });
    };
    const streamWrapper = {
      on: (...args) => void whenStreamReady("on", args),
      pause: (...args) => void whenStreamReady("pause", args),
      resume: (...args) => void whenStreamReady("resume", args),
      accumulate: (...args) => whenStreamReady("accumulate", args)
    };
    beforeSave().then(() => {
      realStream = ogSaveProjectSb3Stream.apply(this, args);
      realStream.on("end", () => { allowRunBlocks = true });
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
        name: Scratch.translate("Layer Control"),
        color1: "#bb71e6",
        menuIconURI,
        blocks: [
          {
            opcode: "getAllID",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get all layer IDs")
          },
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
          {
            opcode: "moveID",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("relayer ID [TARGET] to layer [ORDER]"),
            arguments: {
              ORDER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              TARGET: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: "swapID",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("swap layers of ID [TARGET] with ID [ORDER]"),
            arguments: {
              ORDER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              TARGET: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: "reset",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("reset special layers")
          }
        ],
        menus: {
          TARGETS: { acceptReporters: true, items: "_getTargets" }
        }
      };
    }

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

    getAllID() { return JSON.stringify(render._drawList) }

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

    reset() {
      const allLay = render._drawList;
      const stage = runtime.getTargetForStage().drawableID;
      const pen = runtime.ext_pen?._penDrawableId || -1;
      const video = runtime.ioDevices.video._drawable || -1;
      const newDraw = [stage, ...allLay.filter(item => ![stage, pen, video].includes(item))];
      if (video !== -1) newDraw.splice(1, 0, video);
      if (pen !== -1) newDraw.splice(video !== -1 ? 2 : 1, 0, pen);
      render._drawList = newDraw;
      runtime.targets[0].updateAllDrawableProperties();
      runtime.requestRedraw();
    }

    moveID(args) {
      if (!allowRunBlocks) return;
      const allLay = render._drawList;
      const index = allLay.indexOf(args.TARGET);
      const targetL = Math.max(0, Math.min(allLay.length - 1, Math.round(args.ORDER)));
      if (index !== -1) {
        const removedLayer = allLay.splice(index, 1)[0];
        render._drawList.splice(targetL, 0, removedLayer);
        runtime.targets[0].updateAllDrawableProperties();
        runtime.requestRedraw();
      }
    }

    swapID(args) {
      if (!allowRunBlocks) return;
      const allLay = render._drawList;
      const target1 = allLay.indexOf(args.TARGET);
      const target2 = allLay.indexOf(args.ORDER);
      if (target1 === -1 || target2 === -1) return;
      if (target1 !== target2 && target1 >= 0 && target1 < allLay.length && target2 >= 0 && target2 < allLay.length) {
        [allLay[target1], allLay[target2]] = [allLay[target2], allLay[target1]];
        runtime.targets[0].updateAllDrawableProperties();
        runtime.requestRedraw();
      }
    }
  }

  Scratch.extensions.register(new SPlayering());
})(Scratch);
