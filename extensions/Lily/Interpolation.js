// Name: Interpolation
// ID: lmsInterpolation
// Description: Control interpolation on different targets.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>

(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  class Interpolation {
    constructor() {
      this.interpolationTargets = [];
      this.internalUpdate = false;

      if (runtime.interpolationEnabled) {
        this.internalUpdate = true;
        runtime.setInterpolation(true);

        this.interpolationTargets = [];
        for (const target of runtime.targets) {
          this.interpolationTargets.push(target);
        }
      } else {
        this.internalUpdate = true;
        runtime.setInterpolation(false);

        this.interpolationTargets = [];
      }

      runtime.on("BEFORE_EXECUTE", () => {
        for (const target of runtime.targets) {
          if (!this.interpolationTargets.includes(target)) {
            target.interpolationData = Object.create(null);
          }
        }
      });

      runtime.on("INTERPOLATION_CHANGED", (enabled) => {
        if (this.internalUpdate) return (this.internalUpdate = false);

        this.interpolationEnabled = enabled;
        if (enabled) {
          for (const target of runtime.targets) {
            if (!this.interpolationTargets.includes(target)) {
              this.interpolationTargets.push(target);
            }
          }
        } else {
          this.interpolationTargets = [];
        }
      });

      runtime.on("targetWasCreated", (target, originalTarget) => {
        if (this.interpolationTargets.includes(originalTarget)) {
          this.interpolationTargets.push(target);
        }
      });

      runtime.on("targetWasRemoved", (target) => {
        const index = this.interpolationTargets.indexOf(target);
        if (index > -1) {
          this.interpolationTargets.splice(index, 1);
          if (this.interpolationTargets.length === 0) {
            this.internalUpdate = true;
            runtime.setInterpolation(false);
          }
        }
      });
    }
    getInfo() {
      return {
        id: "lmsInterpolation",
        name: "Interpolation",
        blocks: [
          {
            opcode: "toggleInterpolation",
            blockType: Scratch.BlockType.COMMAND,
            text: "[TOGGLE] interpolation on [TARGET]",
            arguments: {
              TOGGLE: {
                menu: "toggle",
              },
              TARGET: {
                menu: "targets",
              },
            },
          },
          {
            opcode: "toggleInterpolationOnAllSprites",
            blockType: Scratch.BlockType.COMMAND,
            text: "[TOGGLE] interpolation on all sprites",
            arguments: {
              TOGGLE: {
                menu: "toggle",
              },
            },
          },
          {
            opcode: "interpolationEnabled",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "interpolation [TOGGLED] on [TARGET]?",
            arguments: {
              TOGGLED: {
                menu: "toggled",
              },
              TARGET: {
                menu: "targets",
              },
            },
          },
        ],
        menus: {
          toggle: {
            acceptReporters: true,
            items: ["enable", "disable"],
          },
          toggled: {
            acceptReporters: true,
            items: ["enabled", "disabled"],
          },
          targets: {
            acceptReporters: true,
            items: this._getTargets(),
          },
        },
      };
    }

    toggleInterpolation(args, util) {
      const target = this._getTargetFromMenu(args.TARGET, util);
      if (!target) return;

      if (args.TOGGLE === "enable") {
        if (!this.interpolationTargets.includes(target)) {
          if (!runtime.interpolationEnabled) {
            this.internalUpdate = true;
            runtime.setInterpolation(true);
          }
          this.interpolationTargets.push(target);
        } else return;
      } else {
        const index = this.interpolationTargets.indexOf(target);
        if (index > -1) {
          this.interpolationTargets.splice(index, 1);
          if (this.interpolationTargets.length === 0) {
            this.internalUpdate = true;
            runtime.setInterpolation(false);
          }
        } else return;
      }
    }

    toggleInterpolationOnAllSprites(args, util) {
      if (args.TOGGLE === "enable") {
        this.internalUpdate = true;
        runtime.setInterpolation(true);

        this.interpolationTargets = [];
        for (const target of runtime.targets) {
          this.interpolationTargets.push(target);
        }
      } else {
        this.internalUpdate = true;
        runtime.setInterpolation(false);

        this.interpolationTargets = [];
      }
    }

    isInterpolationEnabled(args, util) {
      const target = this._getTargetFromMenu(args.TARGET, util);
      if (!target) return false;

      const enabled = this.interpolationTargets.includes(target);
      return args.TOGGLED === "enabled" ? enabled : !enabled;
    }

    _getTargetFromMenu(targetName, util) {
      let target = runtime.getSpriteTargetByName(targetName);
      if (targetName === "_myself_") target = util.target;
      return target;
    }

    _getTargets() {
      const spriteNames = [];
      spriteNames.push({ text: "myself", value: "_myself_" });

      const targets = runtime.targets;
      for (let index = 1; index < targets.length; index++) {
        const targetName = targets[index].getName();
        spriteNames.push({
          text: targetName,
          value: targetName,
        });
      }
      if (spriteNames.length > 0) {
        return spriteNames;
      } else {
        return [""];
      }
    }
  }

  Scratch.extensions.register(new Interpolation());
})(Scratch);
