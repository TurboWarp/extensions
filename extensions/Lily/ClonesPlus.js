// Name: Clones Plus
// ID: lmsclonesplus
// Description: Expansion of Scratch's clone features.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>

(function (Scratch) {
  "use strict";

  const menuIconURI =
    "data:image/png;base64,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";

  /**
   * @param {VM.Target|null} target
   * @param {string|unknown} thing
   * @returns {string|number|boolean}
   */
  const getThingOfTarget = (target, thing) => {
    if (!target) {
      return "";
    }
    if (thing === "x position") {
      return target.x;
    }
    if (thing === "y position") {
      return target.y;
    }
    if (thing === "direction") {
      return target.direction;
    }
    if (thing === "costume num") {
      return target.currentCostume + 1;
    }
    if (thing === "costume name") {
      return target.getCostumes()[target.currentCostume].name;
    }
    if (thing === "size") {
      return target.size;
    }
    if (thing === "volume") {
      return target.volume;
    }
    // this should never happen
    return "";
  };

  class ClonesPlus {
    getInfo() {
      return {
        id: "lmsclonesplus",
        name: "Clones+",
        color1: "#FFAB19",
        color2: "#EC9C13",
        color3: "#CF8B17",
        menuIconURI: menuIconURI,
        blocks: [
          {
            opcode: "whenCloneStartsWithVar",
            blockType: Scratch.BlockType.HAT,
            text: "when I start as a clone with [INPUTA] set to [INPUTB]",
            filter: [Scratch.TargetType.SPRITE],
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                menu: "variablesMenu",
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
            },
          },
          {
            opcode: "createCloneWithVar",
            blockType: Scratch.BlockType.COMMAND,
            text: "create clone with [INPUTA] set to [INPUTB]",
            filter: [Scratch.TargetType.SPRITE],
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                menu: "variablesMenu",
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
            },
          },

          "---",

          {
            opcode: "touchingCloneWithVar",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "touching clone with [INPUTA] set to [INPUTB]?",
            filter: [Scratch.TargetType.SPRITE],
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                menu: "variablesMenu",
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
            },
          },
          {
            opcode: "touchingMainSprite",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "touching main sprite?",
            filter: [Scratch.TargetType.SPRITE],
            disableMonitor: true,
          },

          "---",

          {
            opcode: "setVariableOfClone",
            blockType: Scratch.BlockType.COMMAND,
            text: "set variable [INPUTA] to [INPUTB] for clones with [INPUTC] set to [INPUTD]",
            filter: [Scratch.TargetType.SPRITE],
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                menu: "variablesMenu",
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0",
              },
              INPUTC: {
                type: Scratch.ArgumentType.STRING,
                menu: "variablesMenu",
              },
              INPUTD: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
            },
          },
          {
            opcode: "getVariableOfClone",
            blockType: Scratch.BlockType.REPORTER,
            text: "variable [INPUTA] of clone with [INPUTB] set to [INPUTC]",
            filter: [Scratch.TargetType.SPRITE],
            disableMonitor: true,
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                menu: "variablesMenu",
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                menu: "variablesMenu",
              },
              INPUTC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
            },
          },
          {
            opcode: "setVariableOfMainSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: "set variable [INPUTA] to [INPUTB] for main sprite",
            filter: [Scratch.TargetType.SPRITE],
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                menu: "variablesMenu",
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
            },
          },
          {
            opcode: "getVariableOfMainSprite",
            blockType: Scratch.BlockType.REPORTER,
            text: "variable [INPUT] of main sprite",
            filter: [Scratch.TargetType.SPRITE],
            disableMonitor: true,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                menu: "variablesMenu",
              },
            },
          },

          "---",

          {
            opcode: "cloneExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "clone with [INPUTA] set to [INPUTB] exists?",
            filter: [Scratch.TargetType.SPRITE],
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                menu: "variablesMenu",
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
            },
          },
          {
            opcode: "getThingOfClone",
            blockType: Scratch.BlockType.REPORTER,
            text: "[INPUTA] of clone with [INPUTB] set to [INPUTC]",
            filter: [Scratch.TargetType.SPRITE],
            disableMonitor: true,
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "x position",
                menu: "thingOfMenu",
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                menu: "variablesMenu",
              },
              INPUTC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
            },
          },
          {
            opcode: "getThingOfMainSprite",
            blockType: Scratch.BlockType.REPORTER,
            text: "[INPUT] of main sprite",
            filter: [Scratch.TargetType.SPRITE],
            disableMonitor: true,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "x position",
                menu: "thingOfMenu",
              },
            },
          },

          "---",

          {
            opcode: "stopScriptsInSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: "stop scripts in [INPUT]",
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                menu: "spriteMenu",
              },
            },
          },
          {
            opcode: "stopScriptsInClone",
            blockType: Scratch.BlockType.COMMAND,
            text: "stop scripts in clones with [INPUTA] set to [INPUTB]",
            filter: [Scratch.TargetType.SPRITE],
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                menu: "variablesMenu",
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
            },
          },
          {
            opcode: "stopScriptsInMainSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: "stop scripts in main sprite",
            filter: [Scratch.TargetType.SPRITE],
          },

          "---",

          {
            opcode: "deleteClonesInSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete clones in [INPUT]",
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                menu: "spriteMenu",
              },
            },
          },
          {
            opcode: "deleteCloneWithVar",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete clones with [INPUTA] set to [INPUTB]",
            filter: [Scratch.TargetType.SPRITE],
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                menu: "variablesMenu",
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
            },
          },

          "---",

          {
            opcode: "isClone",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is clone?",
            filter: [Scratch.TargetType.SPRITE],
            disableMonitor: true,
          },

          "---",

          {
            opcode: "cloneCount",
            blockType: Scratch.BlockType.REPORTER,
            text: "clone count",
          },
          {
            opcode: "spriteCloneCount",
            blockType: Scratch.BlockType.REPORTER,
            text: "clone count of [INPUT]",
            disableMonitor: true,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                menu: "spriteMenu",
              },
            },
          },
        ],
        menus: {
          spriteMenu: {
            acceptReporters: true,
            items: "getSprites",
          },
          // menus use acceptReporters: false for Scratch parity
          variablesMenu: {
            acceptReporters: false,
            items: "getVariables",
          },
          thingOfMenu: {
            acceptReporters: false,
            items: [
              {
                text: "x position",
                value: "x position",
              },
              {
                text: "y position",
                value: "y position",
              },
              {
                text: "direction",
                value: "direction",
              },
              {
                text: "costume #",
                value: "costume num",
              },
              {
                text: "costume name",
                value: "costume name",
              },
              {
                text: "size",
                value: "size",
              },
              {
                text: "volume",
                value: "volume",
              },
            ],
          },
        },
      };
    }

    whenCloneStartsWithVar(args, util) {
      // TODO: this is really not ideal. this should be an event-based hat ideally, but we don't have a good
      // way to do that right now...
      if (util.target.isOriginal) {
        return false;
      }
      const variable = util.target.lookupVariableById(args.INPUTA);
      const expectedValue = args.INPUTB;
      if (variable) {
        return Scratch.Cast.compare(variable.value, expectedValue) === 0;
      }
      return false;
    }

    createCloneWithVar(args, util) {
      // @ts-expect-error - not typed yet
      Scratch.vm.runtime.ext_scratch3_control._createClone(
        util.target.sprite.name,
        util.target
      );
      const clones = util.target.sprite.clones;
      const cloneNum = clones.length - 1;
      const cloneVariable = clones[cloneNum].lookupVariableById(args.INPUTA);
      if (cloneVariable) {
        cloneVariable.value = args.INPUTB;
      }
    }

    touchingCloneWithVar(args, util) {
      const drawableCandidates = util.target.sprite.clones
        .filter((clone) => {
          const variable = clone.lookupVariableById(args.INPUTA);
          return (
            variable && Scratch.Cast.compare(variable.value, args.INPUTB) === 0
          );
        })
        .map((clone) => clone.drawableID);
      if (drawableCandidates.length === 0) {
        return false;
      }
      return Scratch.vm.renderer.isTouchingDrawables(
        util.target.drawableID,
        drawableCandidates
      );
    }

    touchingMainSprite(args, util) {
      if (util.target.isOriginal) {
        return false;
      }
      const main = util.target.sprite.clones[0];
      const drawableCandidates = [main.drawableID];
      return Scratch.vm.renderer.isTouchingDrawables(
        util.target.drawableID,
        drawableCandidates
      );
    }

    setVariableOfClone(args, util) {
      const newVariableValue = args.INPUTB;
      const expectedVarValue = args.INPUTD;
      const clones = util.target.sprite.clones;
      for (let index = 1; index < clones.length; index++) {
        const checkVar = clones[index].lookupVariableById(args.INPUTC);
        if (
          checkVar &&
          Scratch.Cast.compare(checkVar.value, expectedVarValue) === 0
        ) {
          const editVar = clones[index].lookupVariableById(args.INPUTA);
          if (editVar) {
            editVar.value = newVariableValue;
          }
        }
      }
    }

    getVariableOfClone(args, util) {
      const clone = this.getCloneFromVariable(
        args.INPUTB,
        args.INPUTC,
        util.target.sprite.clones
      );
      if (!clone) {
        return "";
      }
      // guaranteed to exist by getCloneFromVariable
      const cloneVar = clone.lookupVariableById(args.INPUTA);
      return cloneVar.value;
    }

    setVariableOfMainSprite(args, util) {
      const main = util.target.sprite.clones[0];
      const variableObj = main.lookupVariableById(args.INPUTA);
      if (variableObj) {
        variableObj.value = args.INPUTB;
      }
    }

    getVariableOfMainSprite(args, util) {
      const main = util.target.sprite.clones[0];
      const variableObj = main.lookupVariableById(args.INPUT);
      if (variableObj) {
        return variableObj.value;
      }
      return "";
    }

    cloneExists(args, util) {
      const clone = this.getCloneFromVariable(
        args.INPUTA,
        args.INPUTB,
        util.target.sprite.clones
      );
      return !!clone;
    }

    getThingOfClone(args, util) {
      const clone = this.getCloneFromVariable(
        args.INPUTB,
        args.INPUTC,
        util.target.sprite.clones
      );
      return getThingOfTarget(clone, args.INPUTA);
    }

    getThingOfMainSprite(args, util) {
      const main = util.target.sprite.clones[0];
      return getThingOfTarget(main, args.INPUT);
    }

    stopScriptsInSprite(args) {
      const targetObj = Scratch.vm.runtime.getSpriteTargetByName(args.INPUT);
      if (targetObj) {
        Scratch.vm.runtime.stopForTarget(targetObj);
      }
    }

    stopScriptsInMainSprite(args, util) {
      Scratch.vm.runtime.stopForTarget(util.target.sprite.clones[0]);
    }

    stopScriptsInClone(args, util) {
      const clones = util.target.sprite.clones;
      let expectedValue = args.INPUTB;
      for (let index = 1; index < clones.length; index++) {
        const cloneVariable = clones[index].lookupVariableById(args.INPUTA);
        if (
          cloneVariable &&
          Scratch.Cast.compare(cloneVariable.value, expectedValue) === 0
        ) {
          Scratch.vm.runtime.stopForTarget(clones[index]);
        }
      }
    }

    deleteClonesInSprite(args, util) {
      const target = Scratch.vm.runtime.getSpriteTargetByName(args.INPUT);
      if (!target) {
        return;
      }
      const clones = target.sprite.clones;
      for (let index = clones.length - 1; index > 0; index--) {
        Scratch.vm.runtime.disposeTarget(clones[index]);
      }
    }

    deleteCloneWithVar(args, util) {
      const clones = util.target.sprite.clones;
      const expectedValue = args.INPUTB;
      for (let index = clones.length - 1; index > 0; index--) {
        const cloneVar = clones[index].lookupVariableById(args.INPUTA);
        if (
          cloneVar &&
          Scratch.Cast.compare(cloneVar.value, expectedValue) === 0
        ) {
          Scratch.vm.runtime.disposeTarget(clones[index]);
        }
      }
    }

    isClone(args, util) {
      return !util.target.isOriginal;
    }

    cloneCount(args, util) {
      return Scratch.vm.runtime._cloneCounter;
    }

    spriteCloneCount(args, util) {
      const target = Scratch.vm.runtime.getSpriteTargetByName(args.INPUT);
      if (target) {
        return target.sprite.clones.length - 1;
      }
      return 0;
    }

    /**
     * @param {string} variableId
     * @param {unknown} expectedValue
     * @param {VM.Target[]} clones
     * @returns {VM.Target|null}
     */
    getCloneFromVariable(variableId, expectedValue, clones) {
      for (let index = 1; index < clones.length; index++) {
        const cloneVar = clones[index].lookupVariableById(variableId);
        if (
          cloneVar &&
          Scratch.Cast.compare(cloneVar.value, expectedValue) === 0
        ) {
          return clones[index];
        }
      }
      return null;
    }

    getSprites() {
      let spriteNames = [];
      const targets = Scratch.vm.runtime.targets;
      const myself = Scratch.vm.runtime.getEditingTarget().sprite.name;
      for (let index = 1; index < targets.length; index++) {
        const curTarget = targets[index].sprite;
        let display = curTarget.name;
        if (myself === curTarget.name) {
          display = "myself";
        }
        if (targets[index].isOriginal) {
          const jsonOBJ = {
            text: display,
            value: curTarget.name,
          };
          spriteNames.push(jsonOBJ);
        }
      }
      if (spriteNames.length > 0) {
        return spriteNames;
      } else {
        return [{ text: "", value: 0 }]; //this should never happen but it's a failsafe
      }
    }

    getSpriteObj(name) {
      //This is unused but I'm leaving it in for potential future blocks
      const spriteObj = Scratch.vm.runtime.getSpriteTargetByName(name);
      return JSON.stringify(spriteObj);
    }

    getVariables() {
      // @ts-expect-error - Blockly not typed yet
      // eslint-disable-next-line no-undef
      const variables =
        typeof Blockly === "undefined"
          ? []
          : Blockly.getMainWorkspace()
              .getVariableMap()
              .getVariablesOfType("")
              .filter((model) => model.isLocal)
              .map((model) => ({
                text: model.name,
                value: model.getId(),
              }));
      if (variables.length > 0) {
        return variables;
      } else {
        return [{ text: "", value: "" }];
      }
    }
  }
  Scratch.extensions.register(new ClonesPlus());
})(Scratch);
