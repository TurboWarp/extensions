(function (Scratch) {
  "use strict";

  const menuIconURI = "";

  // Object.create(null) prevents "variable [toString]" from returning a function
  let variables = Object.create(null);

  class TempVars {
    getInfo() {
      return {
        id: "lmstempvars",
        name: Scratch.translate("Temporary Variables"),
        color1: "#FF791A",
        color2: "#E15D00",
        menuIconURI: menuIconURI,
        blocks: [
          {
            opcode: "setVariableTo",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set variable [INPUTA] to [INPUTB]"),
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "changeVariableBy",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("change variable [INPUTA] by [INPUTB]"),
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
            },
          },
          {
            opcode: "getVariable",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("variable [INPUT]"),
            disableMonitor: true,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
            },
          },

          "---",

          {
            opcode: "deleteVariable",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete variable [INPUT]"),
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
            },
          },
          {
            opcode: "deleteAllVariables",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete all variables"),
          },
          {
            opcode: "listVariables",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("list active variables"),
            disableMonitor: true,
          },
        ],
      };
    }

    getVariable(args) {
      if (args.INPUT in variables) {
        return variables[args.INPUT];
      } else {
        return "";
      }
    }

    setVariableTo(args) {
      variables[args.INPUTA] = args.INPUTB;
    }

    changeVariableBy(args) {
      if (args.INPUTA in variables) {
        const prev = Scratch.Cast.toNumber(variables[args.INPUTA]);
        const next = Scratch.Cast.toNumber(args.INPUTB);
        variables[args.INPUTA] = prev + next;
      } else {
        variables[args.INPUTA] = args.INPUTB;
      }
    }

    listVariables(args, util) {
      return Object.keys(variables).join(",");
    }

    deleteVariable(args) {
      Reflect.deleteProperty(variables, args.INPUT);
    }

    deleteAllVariables() {
      variables = Object.create(null);
    }
  }
  Scratch.extensions.register(new TempVars());
})(Scratch);
