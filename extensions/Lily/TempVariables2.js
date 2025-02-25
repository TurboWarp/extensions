// Name: Temporary Variables
// ID: lmsTempVars2
// Description: Create disposable runtime or thread variables.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>

(function (Scratch) {
  "use strict";

  const menuIconURI = "";

  // Object.create(null) prevents "variable [toString]" from returning a function
  let runtimeVariables = Object.create(null);

  // Credit to skyhigh173 for the idea of this
  const label = (name, hidden) => ({
    blockType: Scratch.BlockType.LABEL,
    text: name,
    hideFromPalette: hidden,
  });

  function resetRuntimeVariables() {
    runtimeVariables = Object.create(null);
  }

  class TempVars {
    constructor() {
      Scratch.vm.runtime.on("PROJECT_START", () => {
        resetRuntimeVariables();
      });

      Scratch.vm.runtime.on("PROJECT_STOP_ALL", () => {
        resetRuntimeVariables();
      });
    }

    getInfo() {
      return {
        id: "lmsTempVars2",
        name: "Temporary Variables",
        color1: "#FF791A",
        color2: "#E15D00",
        menuIconURI: menuIconURI, // I intend on making one later
        blocks: [
          label("Thread Variables", false),

          {
            opcode: "setThreadVariable",
            blockType: Scratch.BlockType.COMMAND,
            text: "set thread var [VAR] to [STRING]",
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
            text: "change thread var [VAR] by [NUM]",
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
            text: "thread var [VAR]",
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
            text: "thread var [VAR] exists?",
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
            text: "for each [VAR] in [NUM]",
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
            text: "list active thread variables",
            disableMonitor: true,
          },

          "---",

          label("Runtime Variables", false),

          {
            opcode: "setRuntimeVariable",
            blockType: Scratch.BlockType.COMMAND,
            text: "set runtime var [VAR] to [STRING]",
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
            text: "change runtime var [VAR] by [NUM]",
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
            text: "runtime var [VAR]",
            disableMonitor: true,
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
            text: "runtime var [VAR] exists?",
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
            text: "delete runtime var [VAR]",
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "variable",
              },
            },
          },
          {
            opcode: "deleteAllRuntimeVariables",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete all runtime variables",
          },
          {
            opcode: "listRuntimeVariables",
            blockType: Scratch.BlockType.REPORTER,
            text: "list active runtime variables",
          },
        ],
      };
    }

    /* THREAD VARIABLES */

    setThreadVariable(args, util) {
      const thread = util.thread;
      if (!thread.variables) thread.variables = Object.create(null);
      const vars = thread.variables;
      vars[args.VAR] = args.STRING;
    }

    changeThreadVariable(args, util) {
      const thread = util.thread;
      if (!thread.variables) thread.variables = Object.create(null);
      const vars = thread.variables;
      const prev = Scratch.Cast.toNumber(vars[args.VAR]);
      const next = Scratch.Cast.toNumber(args.NUM);
      vars[args.VAR] = prev + next;
    }

    getThreadVariable(args, util) {
      const thread = util.thread;
      if (!thread.variables) thread.variables = Object.create(null);
      const vars = thread.variables;
      const varValue = vars[args.VAR];
      if (typeof varValue === "undefined") return "";
      return varValue;
    }

    threadVariableExists(args, util) {
      const thread = util.thread;
      if (!thread.variables) thread.variables = Object.create(null);
      const vars = thread.variables;
      const varValue = vars[args.VAR];
      return !(typeof varValue === "undefined");
    }

    forEachThreadVariable(args, util) {
      const thread = util.thread;
      if (!thread.variables) thread.variables = Object.create(null);
      const vars = thread.variables;
      if (typeof util.stackFrame.index === "undefined") {
        util.stackFrame.index = 0;
      }
      if (util.stackFrame.index < Number(args.NUM)) {
        util.stackFrame.index++;
        vars[args.VAR] = util.stackFrame.index;
        return true;
      }
    }

    listThreadVariables(args, util) {
      const thread = util.thread;
      if (!thread.variables) thread.variables = Object.create(null);
      const vars = thread.variables;
      return Object.keys(vars).join(",");
    }

    /* RUNTIME VARIABLES */

    setRuntimeVariable(args) {
      runtimeVariables[args.VAR] = args.STRING;
    }

    changeRuntimeVariable(args) {
      const prev = Scratch.Cast.toNumber(runtimeVariables[args.VAR]);
      const next = Scratch.Cast.toNumber(args.NUM);
      runtimeVariables[args.VAR] = prev + next;
    }

    getRuntimeVariable(args) {
      if (!(args.VAR in runtimeVariables)) return "";
      return runtimeVariables[args.VAR];
    }

    runtimeVariableExists(args) {
      return args.VAR in runtimeVariables;
    }

    listRuntimeVariables(args, util) {
      return Object.keys(runtimeVariables).join(",");
    }

    deleteRuntimeVariable(args) {
      Reflect.deleteProperty(runtimeVariables, args.VAR);
    }

    deleteAllRuntimeVariables() {
      runtimeVariables = Object.create(null);
    }
  }
  Scratch.extensions.register(new TempVars());
})(Scratch);
