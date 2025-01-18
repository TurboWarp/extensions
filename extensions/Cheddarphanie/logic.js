// Name: Logic
// ID: lemonLogic
// Description: A pack of handy logic operators.
// By: Cheddarphanie <https://scratch.mit.edu/users/Cheddarphanie/>
// License: Apache-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Logic must run unsandboxed.");
  }

  const Cast = Scratch.Cast;

  class LogicExt {
    getInfo() {
      return {
        id: "lemonLogic",
        name: Scratch.translate("Logic"),
        color1: "#59C059",
        color2: "#50ad50",
        color3: "#479a47",
        blocks: [
          /* eslint-disable extension/should-translate */
          {
            opcode: "Logic_NAND",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[A] NAND [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              B: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
            extensions: ["colours_operators"],
          },
          {
            opcode: "Logic_NOR",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[A] NOR [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              B: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
            extensions: ["colours_operators"],
          },
          {
            opcode: "Logic_XOR",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[A] XOR [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              B: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
            extensions: ["colours_operators"],
          },
          {
            opcode: "Logic_XNOR",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[A] XNOR [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              B: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
            extensions: ["colours_operators"],
          },
          {
            opcode: "Logic_IMPLY",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[A] IMPLY [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              B: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
            extensions: ["colours_operators"],
          },
          {
            opcode: "Logic_NIMPLY",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[A] NIMPLY [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              B: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
            extensions: ["colours_operators"],
          },
        ],
      };
    }

    Logic_NAND({ A, B }) {
      [A, B] = [A, B].map((arg) => Cast.toBoolean(arg));
      return !(A && B);
    }
    Logic_NOR({ A, B }) {
      [A, B] = [A, B].map((arg) => Cast.toBoolean(arg));
      return !(A || B);
    }
    Logic_XOR({ A, B }) {
      [A, B] = [A, B].map((arg) => Cast.toBoolean(arg));
      return A !== B;
    }
    Logic_XNOR({ A, B }) {
      [A, B] = [A, B].map((arg) => Cast.toBoolean(arg));
      return A === B;
    }
    Logic_IMPLY({ A, B }) {
      [A, B] = [A, B].map((arg) => Cast.toBoolean(arg));
      return !A || B;
    }
    Logic_NIMPLY({ A, B }) {
      [A, B] = [A, B].map((arg) => Cast.toBoolean(arg));
      return A && !B;
    }
  }

  Scratch.extensions.register(new LogicExt());
})(Scratch);
