// Name: Cast
// ID: lmsCast
// Description: Convert values between types.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>

(function (Scratch) {
  "use strict";

  const Cast = Scratch.Cast;

  class CastUtil {
    getInfo() {
      return {
        id: "lmsCast",
        name: "Cast",
        blocks: [
          {
            opcode: "toType",
            blockType: Scratch.BlockType.REPORTER,
            text: "cast [INPUT] to [TYPE]",
            allowDropAnywhere: true,
            disableMonitor: true,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "type",
              },
            },
          },
          {
            opcode: "typeOf",
            blockType: Scratch.BlockType.REPORTER,
            text: "type of [INPUT]",
            disableMonitor: true,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
            },
          },
        ],
        menus: {
          type: {
            acceptReporters: true,
            items: ["number", "string", "boolean", "default"],
          },
        },
      };
    }

    toType(args) {
      const input = args.INPUT;
      switch (args.TYPE) {
        case "number":
          return Cast.toNumber(input);
        case "string":
          return Cast.toString(input);
        case "boolean":
          return Cast.toBoolean(input);
        default:
          return input;
      }
    }

    typeOf(args) {
      const input = args.INPUT;
      switch (typeof input) {
        case "number":
          return "number";
        case "string":
          return "string";
        case "boolean":
          return "boolean";
        default:
          return "";
      }
    }
  }

  Scratch.extensions.register(new CastUtil());
})(Scratch);
