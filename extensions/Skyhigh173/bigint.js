// Name: BigInt
// ID: skyhigh173BigInt
// Description: Math blocks that work on infinitely large integers (no decimals).
// By: Skyhigh173

(function (Scratch) {
  "use strict";

  /**
   * @param {unknown} x
   * @returns {bigint}
   */
  const bi = (x) => {
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
        name: "BigInt",
        color1: "#59C093",
        blocks: [
          {
            opcode: "from",
            blockType: Scratch.BlockType.REPORTER,
            text: "To BigInt [text]",
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
            text: "To Number [text]",
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          makeLabel("Arithmetic"),
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
            text: "[a] mod [b]",
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
          makeLabel("Logic"),
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
          makeLabel("Bitwise"),
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
      return (bi(a) + bi(b)).toString();
    }
    sub({ a, b }) {
      return (bi(a) - bi(b)).toString();
    }
    mul({ a, b }) {
      return (bi(a) * bi(b)).toString();
    }
    div({ a, b }) {
      if (Number(b) == 0) return "NaN";
      return (bi(a) / bi(b)).toString();
    }
    pow({ a, b }) {
      return (bi(a) ** bi(b)).toString();
    }
    mod({ a, b }) {
      if (Number(b) == 0) return "NaN";
      return (bi(a) % bi(b)).toString();
    }

    and({ a, b }) {
      return (bi(a) & bi(b)).toString();
    }
    or({ a, b }) {
      return (bi(a) | bi(b)).toString();
    }
    xor({ a, b }) {
      return (bi(a) ^ bi(b)).toString();
    }
    ls({ a, b }) {
      return (bi(a) << bi(b)).toString();
    }
    rs({ a, b }) {
      return (bi(a) >> bi(b)).toString();
    }
    not({ a }) {
      return (~bi(a)).toString();
    }

    select({ a, sel, b }) {
      switch (sel) {
        case "+":
          return (bi(a) + bi(b)).toString();
        case "-":
          return (bi(a) - bi(b)).toString();
        case "*":
          return (bi(a) * bi(b)).toString();
        case "/": {
          if (Number(b) == 0) return "NaN";
          return (bi(a) / bi(b)).toString();
        }
        case "%": {
          if (Number(b) == 0) return "NaN";
          return (bi(a) % bi(b)).toString();
        }
        case "^":
        case "**":
          return (bi(a) ** bi(b)).toString();
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
