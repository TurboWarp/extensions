// Name: More Control
// ID: lmsSpAsMoreControl
// Description: More conditional and loop statements.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>
// By: Ashime <https://scratch.mit.edu/users/0znzw/>
// By: SharkPool <https://scratch.mit.edu/users/0znzw/>

(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const hasOwn = (prop, object) => Object.hasOwn(object, prop);
  const Cast = Scratch.Cast;
  let Utilities = {
    cloneBlock(id, target) {
      const cloneBlock = Utilities.cloneBlock;
      function isInvalid(data) {
        return data == null || data == undefined;
      }
      let needed = [];
      let block = target.blocks.getBlock(id);
      if (isInvalid(block)) {
        return [];
      }
      Object.values(block.inputs).forEach((key) => {
        if (hasOwn("shadow", key) && key.block === key.shadow) {
          needed = [...needed, ...cloneBlock(key.block, target)];
          return;
        } else {
          if (hasOwn("shadow", key))
            needed = [...needed, ...cloneBlock(key.shadow, target)];
          if (hasOwn("shadow", block))
            needed = [...needed, ...cloneBlock(key.block, target)];
        }
      });
      Object.values(block.fields).forEach((key) => {
        if (hasOwn("id", key))
          needed = [...needed, ...cloneBlock(key.id, target)];
      });
      needed.push(block);
      return needed;
    },
  };

  class MoreControl {
    getInfo() {
      return {
        id: "lmsSpAsMoreControl",
        name: "More Control",
        color1: "#FFAB19",
        color2: "#EC9C13",
        color3: "#CF8B17",
        blocks: [
          {
            opcode: "switch",
            text: "switch [SWITCH]",
            blockType: Scratch.BlockType.CONDITIONAL,
            arguments: {
              SWITCH: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "case",
            text: "case [CASE]",
            blockType: Scratch.BlockType.CONDITIONAL,
            arguments: {
              CASE: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "default",
            text: "default",
            blockType: Scratch.BlockType.CONDITIONAL,
            isTerminal: true,
          },
          {
            opcode: "runCase",
            text: "run case [CASE]",
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              CASE: {
                type: Scratch.ArgumentType.STRING,
              },
            },
            isTerminal: true,
          },
          "---",
          {
            opcode: "elseIf",
            text: ["if [CONDITION1] then", "else if [CONDITION2] then"],
            blockType: Scratch.BlockType.CONDITIONAL,
            branchCount: 2,
            arguments: {
              CONDITION1: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              CONDITION2: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          {
            opcode: "elseIfElse",
            text: ["if [CONDITION1] then", "else if [CONDITION2] then", "else"],
            blockType: Scratch.BlockType.CONDITIONAL,
            branchCount: 3,
            arguments: {
              CONDITION1: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              CONDITION2: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          "---",
          {
            opcode: "waitDuration",
            blockType: Scratch.BlockType.LOOP,
            text: "wait [DURATION] [TYPE]",
            branchCount: -1,
            arguments: {
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "frames",
                menu: "types",
              },
            },
          },
          {
            opcode: "waitDurationOrUntil",
            blockType: Scratch.BlockType.LOOP,
            text: "wait [DURATION] [TYPE] or until [CONDITION]",
            branchCount: -1,
            arguments: {
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "types",
              },
              CONDITION: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          "---",
          {
            opcode: "repeatDuration",
            blockType: Scratch.BlockType.LOOP,
            text: "repeat for [DURATION] seconds",
            arguments: {
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "repeatDurationOrUntil",
            blockType: Scratch.BlockType.LOOP,
            text: "repeat [DURATION] or until [CONDITION]",
            arguments: {
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "types",
              },
              CONDITION: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          "---",
          {
            opcode: "stopTarget",
            blockType: Scratch.BlockType.COMMAND,
            text: "stop [TARGET]",
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "targetsMyself",
              },
            },
          },
          {
            opcode: "stopExceptTarget",
            blockType: Scratch.BlockType.COMMAND,
            text: "stop all except [TARGET]",
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "targetsMyself",
              },
            },
          },
          "---",
          {
            opcode: "spayedCondition",
            blockType: Scratch.BlockType.LOOP,
            text: ["if [CON1] start loop", "repeat until [CON2]" + " "],
            arguments: {
              CON1: { type: Scratch.ArgumentType.BOOLEAN },
              CON2: { type: Scratch.ArgumentType.BOOLEAN },
            },
          },
          {
            opcode: "runInSprite",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: ["run code as [SPRITE]", "and dont wait [DONT_WAIT]?"],
            arguments: {
              SPRITE: {
                type: Scratch.ArgumentType.STRING,
                menu: "targets",
              },
              DONT_WAIT: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
        ],
        menus: {
          types: {
            acceptReporters: true,
            items: ["frames", "seconds"],
          },
          targets: {
            acceptReporters: true,
            items: this._getTargets("stage"),
          },
          targetsMyself: {
            acceptReporters: true,
            items: this._getTargets("stage", "myself"),
          },
        },
      };
    }

    switch(args, util) {
      if (this.isInPalette(util.thread)) return;
      const switchValue = Scratch.Cast.toString(args.SWITCH);
      const block = util.thread.peekStack();
      const self = this.getBlockByID(util.target, block);
      self.switchValue = switchValue;
      self.runCase = false;
      self.ifCase = null;
      this.setBlockByID(util.target, block, self);
      return 1;
    }

    case(args, util) {
      if (this.isInPalette(util.thread)) return;
      const caseValue = Scratch.Cast.toString(args.CASE);
      const outerBlock = this.getOuterCtillOpcode(
        util.target,
        util.thread.peekStack(),
        "lmsSpAsMoreControl_switch"
      );
      if (outerBlock == null) return;
      if (
        outerBlock.switchValue == caseValue ||
        outerBlock.ifCase == caseValue
      ) {
        outerBlock.runCase = true;
        outerBlock.ifCase = null;
        this.setBlockByID(util.target, outerBlock.id, outerBlock);
        return 1;
      }
      return;
    }

    default(args, util) {
      if (this.isInPalette(util.thread)) return;
      let outerBlock = this.getOuterCtillOpcode(
        util.target,
        util.thread.peekStack(),
        "lmsSpAsMoreControl_switch"
      );
      if (outerBlock == null || outerBlock.runCase || outerBlock.next != null)
        return 0;
      return 1;
    }

    runCase(args, util) {
      if (this.isInPalette(util.thread)) return;
      const block = util.thread.peekStack();
      const caseValue = Scratch.Cast.toString(args.CASE);
      let outerBlock = this.getOuterCtillOpcode(
        util.target,
        block,
        "lmsSpAsMoreControl_switch"
      );
      if (outerBlock == null) return 0;
      outerBlock.ifCase = caseValue;
      this.setBlockByID(util.target, outerBlock.id, outerBlock);
    }

    elseIf(args, util) {
      const condition1 = Scratch.Cast.toBoolean(args.CONDITION1);
      const condition2 = Scratch.Cast.toBoolean(args.CONDITION2);
      if (condition1) {
        return 1;
      } else if (condition2) {
        return 2;
      }
    }

    elseIfElse(args, util) {
      const condition1 = Scratch.Cast.toBoolean(args.CONDITION1);
      const condition2 = Scratch.Cast.toBoolean(args.CONDITION2);
      if (condition1) {
        return 1;
      } else if (condition2) {
        return 2;
      } else {
        return 3;
      }
    }

    waitDuration(args, util) {
      const type = Scratch.Cast.toString(args.TYPE);
      if (type == "frames") {
        const duration = Math.round(Cast.toNumber(args.DURATION));
        if (typeof util.stackFrame.loopCounter === "undefined") {
          util.stackFrame.loopCounter = duration;
        }
        util.stackFrame.loopCounter--;
        if (util.stackFrame.loopCounter >= 0) {
          return true;
        }
      } else if (type == "seconds") {
        if (util.stackTimerNeedsInit()) {
          const duration = Math.max(0, 1000 * Cast.toNumber(args.DURATION));

          util.startStackTimer(duration);
          runtime.requestRedraw();
          return true;
        } else if (!util.stackTimerFinished()) {
          return true;
        }
      }
    }

    waitDurationOrUntil(args, util) {
      const type = Scratch.Cast.toString(args.TYPE);
      if (type == "frames") {
        const duration = Math.round(Cast.toNumber(args.DURATION));
        if (typeof util.stackFrame.loopCounter === "undefined") {
          util.stackFrame.loopCounter = duration;
        }
        util.stackFrame.loopCounter--;
        if (util.stackFrame.loopCounter >= 0 && !args.CONDITION) {
          return true;
        }
      } else if (type == "seconds") {
        if (util.stackTimerNeedsInit()) {
          const duration = Math.max(0, 1000 * Cast.toNumber(args.DURATION));

          util.startStackTimer(duration);
          runtime.requestRedraw();
          return true;
        } else if (!util.stackTimerFinished() && !args.CONDITION) {
          return true;
        }
      }
    }

    repeatDuration(args, util) {
      if (util.stackTimerNeedsInit()) {
        const duration = Math.max(0, 1000 * Cast.toNumber(args.DURATION));

        util.startStackTimer(duration);
        runtime.requestRedraw();
        return true;
      } else if (!util.stackTimerFinished() && !args.CONDITION) {
        return true;
      }
    }

    repeatDurationOrUntil(args, util) {
      const duration = Math.round(Cast.toNumber(args.DURATION));
      if (typeof util.stackFrame.loopCounter === "undefined") {
        util.stackFrame.loopCounter = duration;
      }
      util.stackFrame.loopCounter--;
      if (util.stackFrame.loopCounter >= 0 && !args.CONDITION) {
        return true;
      }
    }

    stopTarget(args, util) {
      const targetName = Scratch.Cast.toString(args.TARGET);
      runtime.stopForTarget(this._getTargetFromMenu(targetName));
    }

    stopExceptTarget(args, util) {
      const targets = runtime.targets;
      const targetName = Scratch.Cast.toString(args.TARGET);
      const exception = this._getTargetFromMenu(targetName);

      for (const target of targets) {
        if (target !== exception) runtime.stopForTarget(target);
      }
    }

    spayedCondition(args, util) {
      if (typeof util.stackFrame.index === "undefined")
        util.stackFrame.index = 0;
      if (!Cast.toBoolean(args.CON1) && util.stackFrame.index === 0) {
        return false;
      } else {
        if (!Cast.toBoolean(args.CON2)) {
          util.stackFrame.index = 1;
          return true;
        } else {
          util.stackFrame.index = 0;
          return false;
        }
      }
    }

    async runInSprite(args, util) {
      const cloneBlock = Utilities.cloneBlock;
      let SPRITE = Cast.toString(args.SPRITE);
      const DONT_WAIT = Cast.toBoolean(args.DONT_WAIT);
      let endTarget = undefined;
      if (SPRITE.toLowerCase() === "_stage_") endTarget = runtime._stageTarget;
      //if (SPRITE.toLowerCase() === '_myself_') endTarget = util.target;
      if (!endTarget) endTarget = runtime.getSpriteTargetByName(SPRITE);
      if (!endTarget) return 0;
      const thread = util.thread;
      const target = util.target;
      const blocks = target.blocks;
      const startBlock = blocks.getBranch(thread.peekStack(), 1);
      let cloneOver = [];
      let block = blocks.getBlock(startBlock);
      cloneOver.push(cloneBlock(block.id, target));
      while (block.next) {
        if (block.next) block = blocks.getBlock(block.next);
        cloneOver.push(cloneBlock(block.id, target));
      }
      cloneOver[0].parent = null;
      for (let i = 0; i < cloneOver.length; i++) {
        const blocks2 = cloneOver[i];
        for (let j = 0; j < blocks2.length; j++) {
          block = blocks2[j];
          endTarget.blocks._blocks[block.id] = block;
        }
      }
      endTarget.blocks._addScript(startBlock);
      runtime.requestBlocksUpdate();
      vm.refreshWorkspace();
      var newThread = runtime._pushThread(startBlock, endTarget, {
        stackClick: true,
      });
      if (DONT_WAIT) return 0;
      await this.until((_) => !runtime.isActiveThread(newThread) == true);
      return 0;
    }

    /* Utility Functions */
    _getTargets(stage, myself) {
      const spriteNames = [];
      if (stage) spriteNames.push({ text: "Stage", value: "_stage_" });
      if (myself) spriteNames.push({ text: "myself", value: "_myself_" });

      const targets = Scratch.vm.runtime.targets;
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
        return [{ text: "", value: 0 }]; //this should never happen but it's a failsafe
      }
    }

    until(conditionFunction) {
      const poll = (resolve) => {
        if (conditionFunction()) resolve();
        else runtime.once("AFTER_EXECUTE", (_) => poll(resolve));
      };
      return new Promise(poll);
    }

    getBlockByID(target, id) {
      return target.blocks._blocks[id];
    }

    getOuterBlockID(target, startBlockID) {
      let block = this.getBlockByID(target, startBlockID);

      while (
        block.parent != null &&
        this.getBlockByID(target, block.parent).next
      ) {
        block = this.getBlockByID(target, block.parent);
      }

      if (block.parent) block = this.getBlockByID(target, block.parent);
      return block;
    }

    getOuterCblock(target, startId) {
      let block = this.getBlockByID(target, startId);
      if (!block || typeof block !== "object") return null;
      let isC = false;
      while (!isC && hasOwn("parent", block) && block.parent !== null) {
        block = this.getBlockByID(target, block.parent);
        isC =
        hasOwn("inputs", block) &&
        hasOwn("SUBSTACK", block.inputs);
      }
      return isC ? block : null;
    }

    setBlockByID(target, id, JSON) {
      target.blocks._blocks[id] = JSON;
    }

    getOuterCtillOpcode(target, startId, opcode) {
      let currentC = this.getOuterCblock(target, startId);
      while (currentC != null && currentC.opcode !== opcode) {
        currentC = this.getOuterCblock(target, currentC.id);
      }
      return currentC;
    }

    isInPalette(thread) {
      return !Object.keys(thread.target.blocks._blocks).includes(
        thread.peekStack()
      );
    }

    CommitFunne(thread) {
      const call = "You have commited a funne act.\nDont do it again.";
      if (this.isInPalette(thread)) {
        Scratch.vm.runtime.visualReport(thread.peekStack(), call);
        return call;
      }
      return false;
    }

    _getTargetFromMenu(targetName, util) {
      let target = Scratch.vm.runtime.getSpriteTargetByName(targetName);
      if (targetName === "_myself_") target = util.target;
      if (targetName === "_stage_") target = runtime.getTargetForStage();
      return target;
    }
  }

  Scratch.extensions.register(new MoreControl());
})(Scratch);
