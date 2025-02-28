// Name: BigInt
// ID: skyhigh173BigInt
// Description: Math blocks that work on infinitely large integers (no decimals).
// By: Skyhigh173 <https://scratch.mit.edu/users/Skyhigh173/>
// License: MIT
// Context: BigInt is short for "Big Integer" which can be infinitely big. "number" refers to normal numbers that have limits.

(function (Scratch) {
  "use strict";

  /**
   * @param {unknown} x
   * @returns {bigint}
   */
  const bi = (x) => {
    if (typeof x === "bigint") {
      return x;
    }
    if (typeof x === "string") {
      // Try to parse things like '8n'
      if (x.charAt(x.length - 1) === "n") {
        try {
          return BigInt(x.slice(0, -1));
        } catch (e) {
          // ignore
        }
      }
      // Must remove decimal using string operations. Math.trunc will convert to float
      // which ruins the point of using bigints.
      const decimalIndex = x.indexOf(".");
      const withoutDecimal =
        decimalIndex === -1 ? x : x.substring(0, decimalIndex);
      try {
        return BigInt(withoutDecimal);
      } catch (e) {
        return 0n;
      }
    }
    try {
      // Here we can use Math.trunc because it's a boolean or number.
      // @ts-expect-error
      return BigInt(Math.trunc(x));
    } catch (e) {
      return 0n;
    }
  };

  const makeLabel = (text) => ({
    blockType: "label",
    text: text,
  });

  class BigIntExtension {
    getInfo() {
      return {
        id: "skyhigh173BigInt",
        name: Scratch.translate("BigInt"),
        color1: "#59C093",
        blocks: [
          /* eslint-disable extension/should-translate */
          {
            opcode: "from",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("convert number [text] to BigInt"),
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "to",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("convert BigInt [text] to number"),
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          makeLabel(Scratch.translate("Arithmetic")),
          {
            opcode: "add",
            blockType: Scratch.BlockType.REPORTER,
            text: "[a] + [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "sub",
            blockType: Scratch.BlockType.REPORTER,
            text: "[a] - [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "mul",
            blockType: Scratch.BlockType.REPORTER,
            text: "[a] * [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "div",
            blockType: Scratch.BlockType.REPORTER,
            text: "[a] / [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "pow",
            blockType: Scratch.BlockType.REPORTER,
            text: "[a] ** [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "mod",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              default: "[a] mod [b]",
              description: "mod refers to modulo",
            }),
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "select",
            blockType: Scratch.BlockType.REPORTER,
            text: "[a] [sel] [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              sel: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "+",
                menu: "op",
              },
            },
          },
          makeLabel(Scratch.translate("Logic")),
          {
            opcode: "lt",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[a] < [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "le",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[a] ≤ [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "eq",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[a] = [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "neq",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[a] ≠ [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "ge",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[a] ≥ [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "gt",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[a] > [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          makeLabel(Scratch.translate("Bitwise")),
          {
            opcode: "and",
            blockType: Scratch.BlockType.REPORTER,
            text: "[a] & [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "or",
            blockType: Scratch.BlockType.REPORTER,
            text: "[a] | [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "xor",
            blockType: Scratch.BlockType.REPORTER,
            text: "[a] ^ [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "ls",
            blockType: Scratch.BlockType.REPORTER,
            text: "[a] << [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "rs",
            blockType: Scratch.BlockType.REPORTER,
            text: "[a] >> [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "not",
            blockType: Scratch.BlockType.REPORTER,
            text: "~ [a]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          /* eslint-enable extension/should-translate */
        ],
        menus: {
          op: {
            items: ["+", "-", "*", "/", "%", "^"],
            acceptReporters: true,
          },
        },
      };
    }
    from({ text }) {
      return bi(text);
    }
    to({ text }) {
      return Number(bi(text));
    }
    add({ a, b }) {
      return Scratch.Cast.toString(bi(a) + bi(b));
    }
    sub({ a, b }) {
      return Scratch.Cast.toString(bi(a) - bi(b));
    }
    mul({ a, b }) {
      return Scratch.Cast.toString(bi(a) * bi(b));
    }
    div({ a, b }) {
      if (Number(b) == 0) return "NaN";
      return Scratch.Cast.toString(bi(a) / bi(b));
    }
    pow({ a, b }) {
      return Scratch.Cast.toString(bi(a) ** bi(b));
    }
    mod({ a, b }) {
      if (Number(b) == 0) return "NaN";
      return Scratch.Cast.toString(bi(a) % bi(b));
    }

    and({ a, b }) {
      return Scratch.Cast.toString(bi(a) & bi(b));
    }
    or({ a, b }) {
      return Scratch.Cast.toString(bi(a) | bi(b));
    }
    xor({ a, b }) {
      return Scratch.Cast.toString(bi(a) ^ bi(b));
    }
    ls({ a, b }) {
      return Scratch.Cast.toString(bi(a) << bi(b));
    }
    rs({ a, b }) {
      return Scratch.Cast.toString(bi(a) >> bi(b));
    }
    not({ a }) {
      return Scratch.Cast.toString(~bi(a));
    }

    select({ a, sel, b }) {
      switch (sel) {
        case "+":
          return Scratch.Cast.toString(bi(a) + bi(b));
        case "-":
          return Scratch.Cast.toString(bi(a) - bi(b));
        case "*":
          return Scratch.Cast.toString(bi(a) * bi(b));
        case "/": {
          if (Number(b) == 0) return "NaN";
          return Scratch.Cast.toString(bi(a) / bi(b));
        }
        case "%": {
          if (Number(b) == 0) return "NaN";
          return Scratch.Cast.toString(bi(a) % bi(b));
        }
        case "^":
        case "**":
          return Scratch.Cast.toString(bi(a) ** bi(b));
        default:
          return "0";
      }
    }

    lt({ a, b }) {
      return bi(a) < bi(b);
    }
    gt({ a, b }) {
      return bi(a) > bi(b);
    }
    eq({ a, b }) {
      return bi(a) === bi(b);
    }
    neq({ a, b }) {
      return bi(a) != bi(b);
    }
    le({ a, b }) {
      return bi(a) <= bi(b);
    }
    ge({ a, b }) {
      return bi(a) >= bi(b);
    }
  }

  Scratch.extensions.register(new BigIntExtension());
})(Scratch);
