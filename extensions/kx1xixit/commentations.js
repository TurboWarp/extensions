// Name: Commentations
// ID: kxCommentations
// Description: Simple comment system for Scratch.
// By: kx1xixit
// License: MIT

// Version: 1.1.0-indev

(function (Scratch) {
  "use strict";

  // ===== 01-core.js =====
  class Commentations {
    getInfo() {
      return {
        id: "kxCommentations",
        name: Scratch.translate("Commentations"),
        color1: "#607D8B",
        color2: "#455A64",
        color3: "#455A64",
        blocks: [
          {
            opcode: "annotate",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[TYPE] [TEXT]"),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "annotationType",
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "your text here",
              },
            },
          },
          "---",
          {
            opcode: "blockAnnotate",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: Scratch.translate("[TYPE] [TEXT]"),
            branchCount: 1,
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "blockAnnotationType",
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "details",
              },
            },
          },
          "---",
          {
            opcode: "explainValue",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[VALUE] comment: [TEXT]"),
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "10",
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "pixels per step",
              },
            },
          },
          {
            opcode: "explainBoolean",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("[VALUE] comment: [TEXT]"),
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: false,
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "is touching wall",
              },
            },
          },
        ],
        menus: {
          annotationType: {
            acceptReporters: false,
            items: [
              { text: "comment:", value: "comment:" },
              { text: "note:", value: "note:" },
              { text: "to-do:", value: "to-do:" },
              { text: "warning:", value: "warning:" },
              { text: "fixme:", value: "fixme:" },
              { text: "new section:", value: "new section:" },
            ],
          },
          blockAnnotationType: {
            acceptReporters: false,
            items: [
              { text: "disable code:", value: "disable code:" },
              { text: "deprecated, use:", value: "deprecated, use:" },
            ],
          },
        },
      };
    }

    annotate(_args) {
      // Does nothing, purely for annotation
      return;
    }

    blockAnnotate(_args) {
      // Returns false so the code inside the C-block never runs
      return false;
    }

    explainValue(args) {
      // Returns the value input, ignores the text input.
      // This allows you to comment on specific numbers/strings.
      return args.VALUE;
    }

    explainBoolean(args) {
      // Returns the boolean value input, ignores the text input.
      // This allows you to comment on specific boolean conditions.
      return args.VALUE;
    }
  }

  Scratch.extensions.register(new Commentations());
})(Scratch);
