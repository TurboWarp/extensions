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
          {
            opcode: "isType",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[INPUT] is [TYPE]?",
            disableMonitor: true,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "typeObject",
              },
            },
          }
        ],
        menus: {
          type: {
            acceptReporters: true,
            items: ["number", "string", "boolean", "default"],
          },
          typeObject: {
            acceptReporters: true,
            items: ["number", "string", "boolean", "object"],
          },
        },
      };
    }

    toType(args) {
      const input = args.INPUT;
      switch (Cast.toString(args.TYPE)) {
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
      return typeof args.INPUT;
    }

    isType(args) {
      return Cast.toString(args.TYPE) === typeof args.INPUT;
    }
  }

  Scratch.extensions.register(new CastUtil());
})(Scratch);
