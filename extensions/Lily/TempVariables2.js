// Name: Temporary Variables
// ID: lmsTempVars2
// Description: Create disposable runtime or thread variables.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>
// License: MIT AND LGPL-3.0

(function (Scratch) {
  "use strict";

  // Credit to skyhigh173 for the idea of this.
  const label = (name, hidden) => ({
    blockType: Scratch.BlockType.LABEL,
    text: name,
    hideFromPalette: hidden,
  });

  class TempVars {
    constructor() {
      // this.resetRntimeVariables would be preferable but,
      // its easier on TS when defined in the constructor,
      // and not abstracted out.
      //
      // Object.create(null) prevents "variable [toString]" from returning a function.
      this.runtimeVariables = Object.create(null);
      
      Scratch.vm.runtime.on("PROJECT_START", () => {
        this.resetRuntimeVariables();
      });

      Scratch.vm.runtime.on("PROJECT_STOP_ALL", () => {
        this.resetRuntimeVariables();
      });
    }

    getInfo() {
      return {
        id: "lmsTempVars2",
        name: Scratch.translate("Temporary Variables"),
        color1: "#FF791A",
        color2: "#E15D00",
        blocks: [
          label(Scratch.translate("Thread Variables"), false),

          {
            opcode: "setThreadVariable",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set thread var [VAR] to [STRING]"),
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "variable",
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "changeThreadVariable",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("change thread var [VAR] by [NUM]"),
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "variable",
              },
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
              },
            },
          },

          "---",

          {
            opcode: "getThreadVariable",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("thread var [VAR]"),
            disableMonitor: true,
            allowDropAnywhere: true,
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "variable",
              },
            },
          },
          {
            opcode: "threadVariableExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("thread var [VAR] exists?"),
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "variable",
              },
            },
          },

          "---",

          {
            opcode: "forEachThreadVariable",
            blockType: Scratch.BlockType.LOOP,
            text: Scratch.translate("for [VAR] in [NUM]"),
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "thread variable",
              },
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "10",
              },
            },
          },
          {
            opcode: "listThreadVariables",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("active thread variables"),
            disableMonitor: true,
          },

          "---",

          label(Scratch.translate("Runtime Variables"), false),

          {
            opcode: "setRuntimeVariable",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set runtime var [VAR] to [STRING]"),
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "variable",
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "changeRuntimeVariable",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("change runtime var [VAR] by [NUM]"),
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "variable",
              },
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
            },
          },

          "---",

          {
            opcode: "getRuntimeVariable",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("runtime var [VAR]"),
            disableMonitor: true,
            allowDropAnywhere: true,
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "variable",
              },
            },
          },
          {
            opcode: "runtimeVariableExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("runtime var [VAR] exists?"),
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "variable",
              },
            },
          },

          "---",

          {
            opcode: "deleteRuntimeVariable",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete runtime var [VAR]"),
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "variable",
              },
            },
          },
          {
            opcode: "deleteAllRuntimeVariables",
            func: "resetRuntimeVariables",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete all runtime variables"),
          },
          {
            opcode: "listRuntimeVariables",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("active runtime variables"),
          },
        ],
      };
    }

    /* THREAD VARIABLES */

    setThreadVariable(args, util) {
      const thread = util.thread;
      thread.variables ??= Object.create(null);
      thread.variables[args.VAR] = args.STRING;
    }

    changeThreadVariable(args, util) {
      const thread = util.thread;
      thread.variables ??= Object.create(null);
      const vars = thread.variables;
      const prev = Scratch.Cast.toNumber(vars[args.VAR]);
      const next = Scratch.Cast.toNumber(args.NUM);
      vars[args.VAR] = prev + next;
    }

    getThreadVariable(args, util) {
      const thread = util.thread;
      thread.variables ??= Object.create(null);
      return thread.variables[args.VAR] ?? "";
    }

    threadVariableExists(args, util) {
      const thread = util.thread;
      thread.variables ??= Object.create(null);
      return Object.hasOwn(thread.variables, args.VAR);
    }

    forEachThreadVariable(args, util) {
      const thread = util.thread;
      thread.variables ??= Object.create(null);
      const vars = thread.variables;
      util.stackFrame.index ??= 0;
      if (util.stackFrame.index < Number(args.NUM)) {
        util.stackFrame.index++;
        vars[args.VAR] = util.stackFrame.index;
        return true;
      }
    }

    listThreadVariables(args, util) {
      const thread = util.thread;
      thread.variables ??= Object.create(null);
      return Object.keys(thread.variables).join(",");
    }

    /* RUNTIME VARIABLES */

    setRuntimeVariable(args) {
      this.runtimeVariables[args.VAR] = args.STRING;
    }

    changeRuntimeVariable(args) {
      const prev = Scratch.Cast.toNumber(this.runtimeVariables[args.VAR]);
      const next = Scratch.Cast.toNumber(args.NUM);
      this.runtimeVariables[args.VAR] = prev + next;
    }

    getRuntimeVariable(args) {
      return this.runtimeVariables[args.VAR] ?? "";
    }

    runtimeVariableExists(args) {
      return Object.hasOwn(this.runtimeVariables, args.VAR);
    }

    listRuntimeVariables(args, util) {
      return Object.keys(this.runtimeVariables).join(",");
    }

    deleteRuntimeVariable(args) {
      Reflect.deleteProperty(this.runtimeVariables, args.VAR);
    }

    resetRuntimeVariables() {
      this.runtimeVariables = Object.create(null);
    }
  }
  // The expose format follows scratch's convention of `ext_${extensionId}`.
  // Expose the extension on runtime for others to use.
  Scratch.vm.runtime.ext_lmsTempVars2 = new TempVars();
  Scratch.extensions.register(Scratch.vm.runtime.ext_lmsTempVars2);
})(Scratch);
