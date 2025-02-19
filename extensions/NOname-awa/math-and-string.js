(function (Scratch) {
  "use strict";
  class MathAndString {
    getInfo() {
      return {
        color1: "#5ac900",
        color2: "#48a100",
        color3: "#48a100",
        id: "nonameawamathandstring",
        name: Scratch.translate("Math And String"),
        blocks: [
          /* eslint-disable extension/should-translate */
          {
            opcode: "exponent",
            blockType: Scratch.BlockType.REPORTER,
            text: "[A] ^ [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "2",
              },
              B: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "10",
              },
            },
          },
          {
            opcode: "negative",
            blockType: Scratch.BlockType.REPORTER,
            text: "- [A]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "2",
              },
            },
          },
          {
            opcode: "n_th_Root",
            blockType: Scratch.BlockType.REPORTER,
            text: "[A] √ [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "3",
              },
              B: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "8",
              },
            },
          },
          /* eslint-enable extension/should-translate */
          "---",
          {
            opcode: "astrict",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("constrain [A] low [B] high [C]"),
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "50",
              },
              B: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
              },
              C: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
            },
          },
          {
            opcode: "round",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("round [A] to [B] decimal places"),
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "3.14",
              },
              B: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
              },
              C: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
            },
          },
          "---",
          /* eslint-disable extension/should-translate */
          {
            opcode: "boolean",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[a]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "booleanToInt",
            blockType: Scratch.BlockType.REPORTER,
            text: "[a]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          "---",
          {
            opcode: "equal",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[a] ⩵ [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "A",
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "a",
              },
            },
          },
          {
            opcode: "equalNegative",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[a] =- [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "5",
              },
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "-5",
              },
            },
          },
          {
            opcode: "equalPlusMinus",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[a] =± [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "5",
              },
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "-5",
              },
            },
          },
          {
            opcode: "notEqual",
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
            opcode: "almostEqual2n",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[a] ≈ [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "5.5",
              },
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "6",
              },
            },
          },
          {
            opcode: "almostEqual3n",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[a] ≈ [b] ± [c]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "5",
              },
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "6",
              },
              c: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
              },
            },
          },
          {
            opcode: "xor",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[a] ^ [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              b: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          "---",
          {
            opcode: "equalOrGreater",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[a] ≥ [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "50",
              },
            },
          },
          {
            opcode: "equalOrLess",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[a] ≤ [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "50",
              },
            },
          },
          {
            opcode: "between",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[a] < [b] < [c]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              c: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "betweenEqual",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[a] ≤ [b] ≤ [c]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              c: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          "---",
          {
            opcode: "vertical",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[a] ⊥ [b]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.ANGLE,
                defaultValue: "0",
              },
              b: {
                type: Scratch.ArgumentType.ANGLE,
                defaultValue: "90",
              },
            },
          },
          "---",
          {
            opcode: "text",
            blockType: Scratch.BlockType.REPORTER,
            text: "[a]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          "---",
          {
            opcode: "repeat",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("repeat [text] [n] times"),
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Text "),
              },
              n: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "3",
              },
            },
          },
          /* eslint-enable extension/should-translate */
          {
            opcode: "trim",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("trim spaces from both sides of [text]"),
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: `   ${Scratch.translate("Text")}   `,
              },
            },
          },
          {
            opcode: "intercept",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "in text [text] get substring from [h] to [e]"
            ),
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("this is text test"),
              },
              h: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "6",
              },
              e: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "7",
              },
            },
          },
          {
            opcode: "replace",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("replace [o] of [text] with [n]"),
            arguments: {
              o: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("world"),
              },
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Hello world!"),
              },
              n: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Scratch"),
              },
            },
          },
          {
            opcode: "Split",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "divide [text] according to [symbol] to take the [n] th item"
            ),
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "a_b_c",
              },
              symbol: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "_",
              },
              n: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "2",
              },
            },
          },
          "---",
          {
            opcode: "toUpperCase",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("upper case [text]"),
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Text"),
              },
            },
          },
          {
            opcode: "toLowerCase",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("lower case [text]"),
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Text"),
              },
            },
          },
          {
            opcode: "textToTitleCase",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("title case [text]"),
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("the text test"),
              },
            },
          },
          "---",
          {
            opcode: "indexOf",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[a]'s first appearance in [text]"),
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("The text test"),
              },
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("te"),
              },
            },
          },
          {
            opcode: "lastIndexOf",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[a]'s last occurrence in [text]"),
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("The text test"),
              },
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("te"),
              },
            },
          },
          {
            opcode: "countKeyword",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[a]'s number of occurrences in [text]"),
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("The text test"),
              },
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("te"),
              },
            },
          },
          "---",
          {
            opcode: "startsWith",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("does [a] begin with a text?"),
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Abc123"),
              },
            },
          },
          {
            opcode: "matchTextWithPattern",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("match [text] as [pattern] - [flags]"),
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("abc"),
              },
              pattern: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[ -~]",
              },
              flags: {
                type: Scratch.ArgumentType.STRING,
                menu: "flags",
              },
            },
          },
          "---",
          {
            opcode: "ascii",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[a]'s ASCII"),
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("a"),
              },
            },
          },
          {
            opcode: "ascii_",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("ASCII [a] as text"),
            arguments: {
              a: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "97",
              },
            },
          },
          "---",
          {
            opcode: "line_segment",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("line segment ([x1],[y1]) to ([x2],[y2])"),
            arguments: {
              x1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "-100",
              },
              y1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              x2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              y2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          "---",
          {
            opcode: "triangle",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "triangle ([x1],[y1]) ([x2],[y2]) ([x3],[y3]) 's [CS]"
            ),
            arguments: {
              x1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              y1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "10",
              },
              x2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "10",
              },
              y2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "10",
              },
              x3: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "10",
              },
              y3: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              CS: {
                type: Scratch.ArgumentType.STRING,
                menu: "cs",
              },
            },
          },
          {
            opcode: "triangle_s",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("triangle [s1] [s2] [s3] 's square"),
            arguments: {
              s1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "3",
              },
              s2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "4",
              },
              s3: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "5",
              },
            },
          },
          {
            opcode: "rectangle",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "rectangle ([x1],[y1]) ([x2],[y2]) ([x3],[y3]) ([x4],[y4]) 's [CS]"
            ),
            arguments: {
              x1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              y1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "10",
              },
              x2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "10",
              },
              y2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "10",
              },
              x3: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "10",
              },
              y3: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              x4: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              y4: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              CS: {
                type: Scratch.ArgumentType.STRING,
                menu: "cs",
              },
            },
          },
          {
            opcode: "graph",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("graph [graph] 's [CS]"),
            arguments: {
              graph: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[[0,0], [0,2], [2,4], [4,2], [4,0]]",
              },
              CS: {
                type: Scratch.ArgumentType.STRING,
                menu: "cs",
              },
            },
          },
          "---",
          {
            opcode: "circle",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("circle: [rd][a] 's [CS]"),
            arguments: {
              rd: {
                type: Scratch.ArgumentType.STRING,
                menu: "rd",
              },
              a: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "10",
              },
              CS: {
                type: Scratch.ArgumentType.STRING,
                menu: "cs",
              },
            },
          },
          "---",
          {
            opcode: "words",
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true,
            text: Scratch.translate(
              "sort unique words in [text] as [language]"
            ),
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate(
                  "movie dog restaurant book school"
                ),
              },
              language: {
                type: Scratch.ArgumentType.STRING,
                menu: "language",
              },
            },
          },
          "---",
          {
            opcode: "true",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("true"),
            disableMonitor: true,
          },
          {
            opcode: "false",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("false"),
            disableMonitor: true,
          },
          /* eslint-disable extension/should-translate */
          {
            opcode: "new_line",
            disableMonitor: true,
            blockType: Scratch.BlockType.REPORTER,
            text: "\\n",
          },
          {
            opcode: "pi",
            disableMonitor: true,
            blockType: Scratch.BlockType.REPORTER,
            text: "π",
          },
          {
            opcode: "phi",
            disableMonitor: true,
            blockType: Scratch.BlockType.REPORTER,
            text: "φ",
          },
          {
            opcode: "e",
            disableMonitor: true,
            blockType: Scratch.BlockType.REPORTER,
            text: "e",
          },
          {
            opcode: "infinity",
            disableMonitor: true,
            blockType: Scratch.BlockType.REPORTER,
            text: "∞",
          },
          /* eslint-enable extension/should-translate */
        ],
        menus: {
          rd: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("radius (r)"),
                value: "r",
              },
              {
                text: Scratch.translate("diameter (d)"),
                value: "d",
              },
            ],
          },
          cs: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("square (s)"),
                value: "s",
              },
              {
                text: Scratch.translate("circumference (c)"),
                value: "c",
              },
            ],
          },
          language: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("English (en)"),
                value: "en",
              },
              {
                text: Scratch.translate("Chinese (zh)"),
                value: "zh",
              },
            ],
          },
          flags: {
            acceptReporters: false,
            items: [
              {
                text: Scratch.translate("global (g)"),
                value: "g",
              },
              {
                text: Scratch.translate("ignoring case (i)"),
                value: "i",
              },
            ],
          },
        },
      };
    }
    exponent({ A, B }) {
      return A ** B;
    }
    negative({ A }) {
      return 0 - A;
    }
    n_th_Root({ A, B }) {
      return Math.pow(B, 1 / A);
    }
    astrict({ A, B, C }) {
      return Math.min(Math.max(A, B), C);
    }
    round(args) {
      return args.A.toFixed(args.B);
    }

    true() {
      return true;
    }
    false() {
      return false;
    }
    boolean(args) {
      return Scratch.Cast.toBoolean(args.a);
    }
    booleanToInt(args) {
      if (Scratch.Cast.toBoolean(args.a)) {
        return 1;
      }
      return 0;
    }
    equal(args) {
      return args.a == args.b;
    }
    equalNegative(args) {
      if (isNaN(args.a) || isNaN(args.b)) {
        return false;
      } else {
        return args.a == 0 - args.b;
      }
    }
    equalPlusMinus(args) {
      if (isNaN(args.a) || isNaN(args.b)) {
        return false;
      } else {
        return args.a == 0 - args.b || args.a == args.b;
      }
    }
    almostEqual2n(args) {
      return Math.round(args.a) == Math.round(args.b);
    }
    almostEqual3n(args) {
      return Math.abs(args.a - args.b) <= args.c;
    }
    between(args) {
      return args.a < args.b && args.b < args.c;
    }
    betweenEqual(args) {
      return args.a <= args.b && args.b <= args.c;
    }
    notEqual(args) {
      return args.a != args.b;
    }
    xor(args) {
      return Scratch.Cast.toBoolean(args.a) !== Scratch.Cast.toBoolean(args.b);
    }
    equalOrGreater(args) {
      return args.a >= args.b;
    }
    equalOrLess(args) {
      return args.a <= args.b;
    }
    vertical(args) {
      if (isNaN(args.a) || isNaN(args.b)) {
        return false;
      } else {
        return (args.a - (args.b - 90)) % 180 == 0;
      }
    }
    segment_one(args) {
      return (
        Math.round(
          Math.sqrt(
            Math.pow(args.x1 - args.x2, 2) + Math.pow(args.y1 - args.y2, 2)
          )
        ) == args.n
      );
    }
    segment_two(args) {
      return (
        Math.round(
          Math.sqrt(
            Math.pow(args.x11 - args.x12, 2) + Math.pow(args.y11 - args.y12, 2)
          )
        ) ==
        Math.round(
          Math.sqrt(
            Math.pow(args.x21 - args.x22, 2) + Math.pow(args.y21 - args.y22, 2)
          )
        )
      );
    }

    ascii(args) {
      return args.a.charCodeAt();
    }
    ascii_(args) {
      return String.fromCharCode(args.a);
    }
    text(args) {
      return args.a;
    }
    repeat(args) {
      if (args.n > 0) {
        let repeat_i;
        let repeat_j = "";
        let repeat_i_inc = 1;
        if (1 > args.n) {
          repeat_i_inc = -repeat_i_inc;
        }
        for (
          repeat_i = 1;
          repeat_i_inc >= 0 ? repeat_i <= args.n : repeat_i >= args.n;
          repeat_i += repeat_i_inc
        ) {
          repeat_j = String(repeat_j) + String(args.text);
        }
        return repeat_j;
      }
      return "";
    }
    intercept(args) {
      return args.text.slice(args.h - 1, args.e);
    }
    toUpperCase(args) {
      return args.text.toUpperCase();
    }
    toLowerCase(args) {
      return args.text.toLowerCase();
    }
    textToTitleCase(args) {
      return textToTitleCase(args.text);
    }
    trim(args) {
      return args.text.trim();
    }
    new_line() {
      return "\n";
    }
    Split(args) {
      const symbol = args.symbol === "." ? "\\." : args.symbol;
      if (
        args.text &&
        typeof args.text.split === "function" &&
        args.text.split(symbol)[args.n - 1] != undefined
      ) {
        return args.text.split(symbol)[args.n - 1];
      }
      return "";
    }
    indexOf(args) {
      return args.text.indexOf(args.a) + 1;
    }
    lastIndexOf(args) {
      return args.text.lastIndexOf(args.a) + 1;
    }
    replace(args) {
      return replaceText(args.text, args.o, args.n);
    }
    startsWith(args) {
      if (typeof args.a === "string" && args.a.startsWith(args.a)) {
        return true;
      } else {
        return false;
      }
    }
    countKeyword(args) {
      return countKeyword(args.text, args.a);
    }

    line_segment(args) {
      return Math.sqrt(
        Math.pow(args.x1 - args.x2, 2) + Math.pow(args.y1 - args.y2, 2)
      );
    }
    triangle(args) {
      if (args.CS == "s") {
        let points = [
          [args.x1, args.y1],
          [args.x2, args.y2],
          [args.x3, args.y3],
        ];
        let area = 0;
        let n = points.length;
        for (let i = 0; i < n; i++) {
          let x1 = points[i][0];
          let y1 = points[i][1];
          let x2 = points[(i + 1) % n][0];
          let y2 = points[(i + 1) % n][1];
          area += x1 * y2;
          area -= x2 * y1;
        }
        area = Math.abs(area) / 2;
        return area;
      }
      if (args.CS == "c") {
        let i = 0;
        i += Math.sqrt(
          Math.pow(args.x1 - args.x2, 2) + Math.pow(args.y1 - args.y2, 2)
        );
        i += Math.sqrt(
          Math.pow(args.x2 - args.x3, 2) + Math.pow(args.y2 - args.y3, 2)
        );
        i += Math.sqrt(
          Math.pow(args.x3 - args.x1, 2) + Math.pow(args.y3 - args.y1, 2)
        );
        return i;
      }
      return 0;
    }
    triangle_s(args) {
      const s = (args.s1 + args.s2 + args.s3) / 2;
      const area = Math.sqrt(s * (s - args.s1) * (s - args.s2) * (s - args.s3));
      return area;
    }
    rectangle(args) {
      if (args.CS == "s") {
        let points = [
          [args.x1, args.y1],
          [args.x2, args.y2],
          [args.x3, args.y3],
          [args.x4, args.y4],
        ];
        let area = 0;
        let n = points.length;
        for (let i = 0; i < n; i++) {
          let x1 = points[i][0];
          let y1 = points[i][1];
          let x2 = points[(i + 1) % n][0];
          let y2 = points[(i + 1) % n][1];
          area += x1 * y2;
          area -= x2 * y1;
        }
        area = Math.abs(area) / 2;
        return area;
      }
      if (args.CS == "c") {
        let i = 0;
        i += Math.sqrt(
          Math.pow(args.x1 - args.x2, 2) + Math.pow(args.y1 - args.y2, 2)
        );
        i += Math.sqrt(
          Math.pow(args.x2 - args.x3, 2) + Math.pow(args.y2 - args.y3, 2)
        );
        i += Math.sqrt(
          Math.pow(args.x3 - args.x4, 2) + Math.pow(args.y3 - args.y4, 2)
        );
        i += Math.sqrt(
          Math.pow(args.x4 - args.x1, 2) + Math.pow(args.y4 - args.y1, 2)
        );
        return i;
      }
      return 0;
    }
    graph(args) {
      let points = JSON.parse(args.graph);
      let n = points.length;
      if (args.CS == "s") {
        let area = 0;
        for (let i = 0; i < n; i++) {
          let x1 = points[i][0];
          let y1 = points[i][1];
          let x2 = points[(i + 1) % n][0];
          let y2 = points[(i + 1) % n][1];
          area += x1 * y2;
          area -= x2 * y1;
        }
        area = Math.abs(area) / 2;
        return area;
      }
      if (args.CS == "c") {
        let x1, x2, y1, y2;
        let j = 0;
        j = 0;
        var i_end = n - 1;
        var i_inc = 1;
        if (0 > i_end) {
          i_inc = -i_inc;
        }
        for (let i = 0; i_inc >= 0 ? i <= i_end : i >= i_end; i += i_inc) {
          x1 = points[i + 1 - 1][0];
          x2 = i == n - 1 ? points[0][0] : points[i + 2 - 1][0];
          y1 = points[i + 1 - 1][1];
          y2 = i == n - 1 ? points[0][1] : points[i + 2 - 1][1];
          j =
            (typeof j == "number" ? j : 0) +
            Math.sqrt(
              Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2)
            );
        }
        return j;
      }
      return 0;
    }
    circle(args) {
      if (args.CS == "c") {
        return 2 * Math.PI * (args.rd == "r" ? args.a : args.a / 2);
      }
      if (args.CS == "s") {
        return Math.PI * (args.rd == "r" ? args.a : args.a / 2) ** 2;
      }
    }
    pi() {
      return Math.PI;
    }

    words(args) {
      const text = Scratch.Cast.toString(args.text);
      const words = parse(text, args.language);
      return words.join(" ");
    }

    phi() {
      return (1 + Math.sqrt(5)) / 2;
    }
    e() {
      return Math.E;
    }
    infinity() {
      return "Infinity";
    }

    matchTextWithPattern({ text, pattern, flags }) {
      const regex = new RegExp(pattern, flags);
      return regex.test(text);
    }
  }

  const textToTitleCase = (str) => {
    return str.replace(/\S+/g, function (txt) {
      return txt[0].toUpperCase() + txt.substring(1).toLowerCase();
    });
  };

  const replaceText = (text, oldStr, newStr) => {
    return text.replace(new RegExp(oldStr, "g"), newStr);
  };

  const countKeyword = (sentence, keyword) => {
    const count = (sentence.match(new RegExp(keyword, "gi")) || []).length;
    return count;
  };

  const parseEnglish = (text) => {
    const words = text.toLowerCase().match(/\b\w+\b/g);
    const uniques = Array.from(new Set(words));
    uniques.sort();
    return uniques;
  };

  const parseChinese = (text) => {
    const words = text.match(/[^\u4e00-\u9fa5]+|[\u4e00-\u9fa5]+/g);
    const uniques = Array.from(new Set(words));
    uniques.sort(function (a, b) {
      return a.localeCompare(b, "zh-Hans-CN", { sensitivity: "accent" });
    });
    return uniques;
  };

  const parse = (text, language) => {
    if (language === "zh") {
      return parseChinese(text);
    }
    return parseEnglish(text);
  };

  Scratch.extensions.register(new MathAndString());
})(Scratch);
