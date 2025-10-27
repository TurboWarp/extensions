(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const Cast = Scratch.Cast;

  class CollisionTags {
    constructor() {
      for (const target of runtime.targets) {
        target._collisionTags = [];
      }
    }
    getInfo() {
      return {
        id: "lmsCollisions",
        name: "Collision Tags",
        color1: "#5cb1d6",
        color2: "#47a8d1",
        color3: "#2e8eb8",
        blocks: [
          {
            opcode: "addTag",
            blockType: Scratch.BlockType.COMMAND,
            text: "add tag [TAG] to [TARGET]",
            arguments: {
              TAG: {
                type: Scratch.ArgumentType.STRING,
              },
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "targets",
              },
            },
          },
          {
            opcode: "removeTag",
            blockType: Scratch.BlockType.COMMAND,
            text: "remove tag [TAG] from [TARGET]",
            arguments: {
              TAG: {
                type: Scratch.ArgumentType.STRING,
              },
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "targets",
              },
            },
          },
          {
            opcode: "removeAllTags",
            blockType: Scratch.BlockType.COMMAND,
            text: "remove all tags from [TARGET]",
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "targets",
              },
            },
          },
          {
            opcode: "getTagsOfSprite",
            blockType: Scratch.BlockType.REPORTER,
            text: "collision tags of [TARGET]",
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "targets",
              },
            },
          },
          "---",
          {
            opcode: "touchingTargetWithTag",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "touching [TYPE] of [TARGET] with tag [TAG]?",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "types",
              },
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "targets",
              },
              TAG: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "touchingWithTag",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "touching [TYPE] with tag [TAG]?",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "types",
              },
              TAG: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
        ],
        menus: {
          // Targets have acceptReporters: false
          types: {
            acceptReporters: false,
            items: ["parent", "clone", "anything"],
          },
          // Targets have acceptReporters: true
          targets: {
            acceptReporters: true,
            items: "_getTargets",
          },
        },
      };
    }

    addTag(args, util) {
      const targetName = Cast.toString(args.TARGET);
      const tag = Cast.toString(args.TAG);
      const target = this._getTargetFromMenu(targetName, util);
      if (!target) return;

      if (!target._collisionTags) target._collisionTags = [];
      if (target._collisionTags.includes(tag) || tag === "") return;

      target._collisionTags.push(tag);
    }

    removeTag(args, util) {
      const targetName = Cast.toString(args.TARGET);
      const tag = Cast.toString(args.TAG);
      const target = this._getTargetFromMenu(targetName, util);
      if (!target) return;

      if (!target._collisionTags || !target._collisionTags.includes(tag))
        return;

      const index = target._collisionTags.indexOf(tag);
      target._collisionTags.splice(index, 1);
    }

    removeAllTags(args, util) {
      const targetName = Cast.toString(args.TARGET);
      const target = this._getTargetFromMenu(targetName, util);
      if (!target) return;

      target._collisionTags = [];
    }

    getTagsOfSprite(args, util) {
      const targetName = Cast.toString(args.TARGET);
      const target = this._getTargetFromMenu(targetName, util);

      if (!target || !target._collisionTags) return "[]";
      return JSON.stringify(target._collisionTags);
    }

    touchingTargetWithTag(args, util) {
      const targetName = Cast.toString(args.TARGET);
      const type = Cast.toString(args.TYPE);
      const tag = Cast.toString(args.TAG);
      const target = this._getTargetFromMenu(targetName, util);
      if (!target) return;

      let drawableCandidates;
      if (type === "parent") drawableCandidates = [target];
      if (type === "anything")
        drawableCandidates = target.sprite.clones.filter(
          (target) =>
            target._collisionTags && target._collisionTags.includes(tag)
        );
      if (type === "clone")
        drawableCandidates = target.sprite.clones.filter(
          (target) =>
            target._collisionTags &&
            target._collisionTags.includes(tag) &&
            !target.isOriginal
        );
      drawableCandidates = drawableCandidates.map(
        (target) => target.drawableID
      );

      return vm.renderer.isTouchingDrawables(
        util.target.drawableID,
        drawableCandidates
      );
    }

    touchingWithTag(args, util) {
      const type = Cast.toString(args.TYPE);
      const tag = Cast.toString(args.TAG);

      let drawableCandidates;
      if (type === "parent")
        drawableCandidates = runtime.targets.filter(
          (target) =>
            target._collisionTags &&
            target._collisionTags.includes(tag) &&
            target.isOriginal
        );
      if (type === "anything")
        drawableCandidates = runtime.targets.filter(
          (target) =>
            target._collisionTags && target._collisionTags.includes(tag)
        );
      if (type === "clone")
        drawableCandidates = runtime.targets.filter(
          (target) =>
            target._collisionTags &&
            target._collisionTags.includes(tag) &&
            !target.isOriginal
        );
      drawableCandidates = drawableCandidates.map(
        (target) => target.drawableID
      );

      return vm.renderer.isTouchingDrawables(
        util.target.drawableID,
        drawableCandidates
      );
    }

    _getTargets() {
      const spriteNames = [{ text: "myself", value: "_myself_" }];
      const targets = Scratch.vm.runtime.targets;
      for (const target of targets) {
        if (target.isOriginal && !target.isStage) {
          const targetName = target.getName();
          spriteNames.push({
            text: targetName,
            value: targetName,
          });
        }
      }
      return spriteNames;
    }

    _getTargetFromMenu(targetName, util) {
      let target = Scratch.vm.runtime.getSpriteTargetByName(targetName);
      if (targetName === "_myself_") target = util.target;
      if (targetName === "_stage_") target = runtime.getTargetForStage();
      return target;
    }
  }
  Scratch.extensions.register(new CollisionTags());
})(Scratch);
