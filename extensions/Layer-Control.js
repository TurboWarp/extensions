// Name: Layer Control
// ID: SPlayering
// Description: Relayer Pen, Video Camera, Backdrops, Sprites and more.
// By: SharkPool

// Version V.1.1.21

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Layer Control must run unsandboxed!");

  const Cast = Scratch.Cast;
  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const render = vm.renderer;

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDQuNDg1IiBoZWlnaHQ9IjEwNC40ODUiIHZpZXdCb3g9IjAgMCAxMDQuNDg1IDEwNC40ODUiPjxwYXRoIGQ9Ik0yLjUgNTIuMjQyQzIuNSAyNC43NyAyNC43NyAyLjUgNTIuMjQyIDIuNXM0OS43NDIgMjIuMjcgNDkuNzQyIDQ5Ljc0Mi0yMi4yNyA0OS43NDItNDkuNzQyIDQ5Ljc0MlMyLjUgNzkuNzE0IDIuNSA1Mi4yNDJ6IiBmaWxsPSIjYmI3MWU2IiBzdHJva2U9IiM4OTUzYTgiIHN0cm9rZS13aWR0aD0iNSIvPjxwYXRoIGQ9Ik0yNy44NzUgNTYuODcxYTYuMyA2LjMgMCAwIDEtNi4zLTYuM1YyNy44NzVhNi4zIDYuMyAwIDAgMSA2LjMtNi4zaDIyLjY5N2E2LjMgNi4zIDAgMCAxIDYuMjk5IDYuM3YyMi42OTdhNi4zIDYuMyAwIDAgMS02LjMgNi4yOTl6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTQwLjg5MyA2OS44OWE2LjMgNi4zIDAgMCAxLTYuMjk5LTYuM1Y0MC44OTNhNi4zIDYuMyAwIDAgMSA2LjMtNi4yOTloMjIuNjk3YTYuMyA2LjMgMCAwIDEgNi4yOTkgNi4zdjIyLjY5N2E2LjMgNi4zIDAgMCAxLTYuMyA2LjI5OXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2JiNzFlNiIgc3Ryb2tlLXdpZHRoPSI3LjUiLz48cGF0aCBkPSJNNDAuODkzIDY5Ljg5YTYuMyA2LjMgMCAwIDEtNi4yOTktNi4zVjQwLjg5M2E2LjMgNi4zIDAgMCAxIDYuMy02LjI5OWgyMi42OTdhNi4zIDYuMyAwIDAgMSA2LjI5OSA2LjN2MjIuNjk3YTYuMyA2LjMgMCAwIDEtNi4zIDYuMjk5eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik01My45MTIgODIuOTA5YTYuMyA2LjMgMCAwIDEtNi4yOTktNi4zVjUzLjkxMmE2LjMgNi4zIDAgMCAxIDYuMy02LjI5OWgyMi42OTZhNi4zIDYuMyAwIDAgMSA2LjMgNi4zdjIyLjY5NmE2LjMgNi4zIDAgMCAxLTYuMyA2LjN6IiBmaWxsPSJub25lIiBzdHJva2U9IiNiYjcxZTYiIHN0cm9rZS13aWR0aD0iNy41Ii8+PHBhdGggZD0iTTUzLjkxMiA4Mi45MDlhNi4zIDYuMyAwIDAgMS02LjI5OS02LjNWNTMuOTEyYTYuMyA2LjMgMCAwIDEgNi4zLTYuMjk5aDIyLjY5NmE2LjMgNi4zIDAgMCAxIDYuMyA2LjN2MjIuNjk2YTYuMyA2LjMgMCAwIDEtNi4zIDYuM3oiIGZpbGw9IiNmZmYiLz48L3N2Zz4=";

  let extensionInstance; /* Defined on extension register */

  runtime.on("RUNTIME_STOPPED", () => {
    extensionInstance.reset();
  });

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
          "---",
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

      // Custom Drawable Layer (ex: CST 3D or Simple3D extensions use this)
      for (var i = 0; i < render._allDrawables.length; i++) {
        const drawable = render._allDrawables[i];
        if (drawable !== undefined && drawable.customDrawableName !== undefined) spriteNames.push({
          text: drawable.customDrawableName, value: `${i}=SP-custLayer`
        });
      }

      // Sprites
      const targets = runtime.targets;
      for (let i = 1; i < targets.length; i++) {
        const target = targets[i];
        if (target.isOriginal) spriteNames.push({
          text: target.getName(),
          value: target.getName()
        });
      }

      return spriteNames.length > 0 ? spriteNames : [""];
    }

    getAllID() {
      return JSON.stringify(render._drawList);
    }

    getID(args, util) {
      const layerTarg = Cast.toString(args.TARGET);
      const videoL = runtime.ioDevices.video._drawable;

      if (layerTarg === "_myself_") return util.target.drawableID;
      if (layerTarg === "_stage_") return runtime.getTargetForStage().drawableID;
      if (layerTarg === "_pen_") return runtime.ext_pen?._penDrawableId || "";
      if (layerTarg === "_video_") return videoL !== -1 ? videoL : "";

      if (layerTarg.includes("=SP-custLayer")) {
        const layerID = parseInt(layerTarg);
        if (render._allDrawables[layerID]?.customDrawableName !== undefined) return layerID;
      }

      const target = runtime.getSpriteTargetByName(layerTarg);
      if (target) return target.drawableID;

      // All hope is lost, maybe the user entered a custom drawable name from an external reporter.
      for (const i of render._drawList) {
        const drawable = render._allDrawables[i];
        const customName = drawable.customDrawableName;
        if (customName !== undefined && customName === layerTarg) {
          return i;
        }
      }

      return "";
    }

    getOwner(args, util) {
      const ID = Cast.toNumber(args.ID);
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
        if (drawable.customDrawableName !== undefined && i === ID) {
          return drawable.customDrawableName;
        }
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

  extensionInstance = new SPlayering();
  Scratch.extensions.register(extensionInstance);
})(Scratch);
