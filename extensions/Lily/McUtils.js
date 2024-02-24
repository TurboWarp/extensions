// Name: McUtils
// ID: lmsmcutils
// Description: Helpful utilities for any fast food employee.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>
// Context: Joke extension based on McDonalds, a fast food chain.
// License: MIT AND LGPL-3.0

/*!
 * Credit to NexusKitten (NamelessCat) for the idea
 */

(function (Scratch) {
  "use strict";

  class lmsmcutils {
    getInfo() {
      return {
        id: "lmsmcutils",
        name: "McUtils",
        color1: "#ec2020",
        color3: "#ffe427",
        blocks: [
          {
            opcode: "managerReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: "if [INPUTA] is manager then [INPUTB] else [INPUTC]",
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
              },
              INPUTC: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "icecreammachine",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is ice cream machine [INPUT]",
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                menu: "iceCreamMenu",
              },
            },
          },
          {
            opcode: "talkToManager",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "talk to manager [INPUT]",
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "placeOrder",
            blockType: Scratch.BlockType.REPORTER,
            text: "place order [INPUT]",
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "grimaceBlock",
            blockType: Scratch.BlockType.REPORTER,
            text: "🎂",
            extensions: ["colours_looks"],
            hideFromPalette: new Date().getMonth() !== 5,
          },
        ],
        menus: {
          iceCreamMenu: {
            acceptReporters: true,
            items: [
              {
                text: "working",
                value: "working",
              },
              {
                text: "broken",
                value: "broken",
              },
            ],
          },
        },
      };
    }

    managerReporter(args, util) {
      if (args.INPUTA) {
        return args.INPUTB;
      } else {
        return args.INPUTC;
      }
    }

    icecreammachine(args, util) {
      if (args.INPUT === "working") {
        return false;
      } else {
        return true;
      }
    }

    talkToManager(args, util) {
      return args.INPUT;
    }

    placeOrder(args, util) {
      const text = Scratch.Cast.toString(args.INPUT);
      if (text.includes("ice cream")) {
        return false;
      } else {
        return args.INPUT;
      }
    }

    grimaceBlock(args, util) {
      return "All good things are purple, including Scratch <3";
    }
  }
  Scratch.extensions.register(new lmsmcutils());
})(Scratch);
