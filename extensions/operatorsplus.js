// Name: Operators+
// ID: operatorsplus
// Description: Extra blocks for operators section.
// By: SoupManIsSus_5
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  class OperatorsPlus {
    getInfo() {
      return {
        id: "operatorsplus",
        name: "Operators+",
        color1: "#00BFFF",
        color2: "#0099CC",
        color3: "#007A99",
        blocks: [
          {
            opcode: "pi",
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true,
            text: "pi",
          },
          {
            opcode: "power",
            blockType: Scratch.BlockType.REPORTER,
            text: "[NUMBER] ^ [POWER]",
            arguments: {
              NUMBER: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
              },
              POWER: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
              },
            },
          },
          {
            opcode: "SinAndCos",
            blockType: Scratch.BlockType.REPORTER,
            text: "[OPERATION] of [NUMBER]",
            arguments: {
              NUMBER: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              OPERATION: {
                type: Scratch.ArgumentType.STRING,
                menu: "signsOfCosAndSinAndsoOn",
              },
            },
          },
          {
            opcode: "strictEquality",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[text] strictly equals [strictText]",
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              strictText: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "APPLE",
              },
            },
          },
          {
            opcode: "replaceAll",
            blockType: Scratch.BlockType.REPORTER,
            text: "replace all [text] in [original] with [replacementText]",
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "a",
              },
              original: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "banana",
              },
              replacementText: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "o",
              },
            },
          },
        ],
        menus: {
          signsOfCosAndSinAndsoOn: {
            acceptReporters: true,
            items: ["sin", "cos", "tan", "asin", "acos", "atan"],
          },
        },
      };
    }

    pi() {
      return Math.PI;
    }

    power(args) {
      const number = Scratch.Cast.toNumber(args.NUMBER);
      const power = Scratch.Cast.toNumber(args.POWER);
      return Math.pow(number, power);
    }

    SinAndCos(args) {
      const number = Scratch.Cast.toNumber(args.NUMBER);
      const operation = args.OPERATION;

      switch (operation) {
        case "sin":
          return Math.sin((number * Math.PI) / 180);
        case "cos":
          return Math.cos((number * Math.PI) / 180);
        case "tan":
          return Math.tan((number * Math.PI) / 180);
        case "asin":
          return (Math.asin(number) * 180) / Math.PI;
        case "acos":
          return (Math.acos(number) * 180) / Math.PI;
        case "atan":
          return (Math.atan(number) * 180) / Math.PI;
        default:
          return 0;
      }
    }

    strictEquality(args) {
      const text = Scratch.Cast.toString(args.text);
      const strictText = Scratch.Cast.toString(args.strictText);
      return text === strictText;
    }

    replaceAll(args) {
      const text = Scratch.Cast.toString(args.text);
      const original = Scratch.Cast.toString(args.original);
      const replacementText = Scratch.Cast.toString(args.replacementText);

      // Escape special regex characters to prevent syntax bugs
      const escapedText = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return original.replace(new RegExp(escapedText, "g"), replacementText);
    }
  }

  Scratch.extensions.register(new OperatorsPlus());
})(Scratch);
