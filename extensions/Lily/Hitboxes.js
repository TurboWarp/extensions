(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const renderer = vm.renderer;

  class Hitboxes {
    constructor() {
      runtime.on("BEFORE_EXECUTE", () => {
        runtime.targets.forEach((target) => {
          if (typeof target.hitboxSkin === "undefined") return;
          const drawableID = target.drawableID;
          const drawable = renderer._allDrawables[drawableID];
          target.originalSkin = drawable.skin;
          drawable.skin = target.hitboxSkin;
        });
      });
      runtime.on("AFTER_EXECUTE", () => {
        runtime.targets.forEach((target) => {
          if (typeof target.originalSkin === "undefined") return;
          const drawableID = target.drawableID;
          const drawable = renderer._allDrawables[drawableID];
          drawable.skin = target.originalSkin;
        });
      });
    }

    getInfo() {
      return {
        id: "lmsHitbox",
        name: "Hitboxes",
        blocks: [
          {
            opcode: "setHitbox",
            blockType: Scratch.BlockType.COMMAND,
            text: "set hitbox to [COSTUME]",
            arguments: {
              COSTUME: {
                type: Scratch.ArgumentType.COSTUME,
              },
            },
          },
          {
            opcode: "removeHitbox",
            blockType: Scratch.BlockType.COMMAND,
            text: "remove hitbox",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "layer1",
              },
            },
          },
          {
            opcode: "currentHitbox",
            blockType: Scratch.BlockType.REPORTER,
            text: "current hitbox",
            allowDropAnywhere: true,
            disableMonitor: true,
          },
        ],
      };
    }

    setHitbox(args, util) {
      const target = util.target;
      const costumeName = Scratch.Cast.toString(args.COSTUME);
      const costume = target.getCostumeIndexByName(costumeName);
      if (!costume) return;

      const skinId = target.getCostumes()[costume].skinId;
      target.hitboxSkin = renderer._allSkins[skinId];

      const drawableID = target.drawableID;
      const drawable = renderer._allDrawables[drawableID];
      drawable.skin = target.originalSkin;
    }

    removeHitbox(args, util) {
      const target = util.target;
      delete target.hitboxSkin;
      target.updateAllDrawableProperties();
    }

    currentHitbox(args, util) {
      const target = util.target;
      return target.hitboxSkin ?? "";
    }
  }

  Scratch.extensions.register(new Hitboxes());
})(Scratch);
