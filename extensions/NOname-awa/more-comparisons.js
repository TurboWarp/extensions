// Name: More Comparisons
// ID: nonameawacomparisons
// Description: More comparison blocks.
// By: NOname-awa

(function (Scratch) {
  "use strict";
  const quadrilateral =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI3Ny4wMjc4MSIgaGVpZ2h0PSI1NC44MDY1NCIgdmlld0JveD0iMCwwLDc3LjAyNzgxLDU0LjgwNjU0Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAxLjUwNDMsLTE1Mi4yMTk3MykiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjI4LjE3ODc4LDE1NS40NzM3NGw0Ni40MDEwMywxOS44ODYxNmwtMjIuNTM3NjQsMjkuMTY2MzZoLTQ2LjYyMTk5eiIvPjwvZz48L2c+PC9zdmc+";
  class MoreComparisons {
    getInfo() {
      return {
        id: "nonameawacomparisons",
        name: "More Comparisons",
        color1: "#00a889",
        color2: "#1e8c76",
        color3: "#1e8c76",
        blocks: [
          {
            opcode: "true",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "true",
            arguments: {},
            disableMonitor: true,
          },
          {
            opcode: "false",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "false",
            arguments: {},
            disableMonitor: true,
          },
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
                defaultValue: "\n",
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "\n",
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
                defaultValue: "\n",
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
                defaultValue: "\n",
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
                defaultValue: "\n",
              },
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "\n",
              },
              c: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "\n",
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
                defaultValue: "\n",
              },
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "\n",
              },
              c: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "\n",
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
          {
            opcode: "segment_one",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "⎵ ([x1],[y1]) ([x2],[y2]) = [n]",
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

              n: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
            },
          },
          {
            opcode: "segment_two",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "⎵ ([x11],[y11]) ([x12],[y12]) = ⎵ ([x21],[y21]) ([x22],[y22])",
            arguments: {
              x11: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "-100",
              },
              y11: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              x12: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              y12: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "-100",
              },

              x21: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
              y21: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              x22: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              y22: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
            },
          },
          {
            opcode: "segment",
            blockType: Scratch.BlockType.REPORTER,
            text: "⎵ ([x1],[y1]) ([x2],[y2])",
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
            opcode: "Squadrilateral_one",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[IMAGE] ([x1],[y1]) ([x2],[y2]) ([x3],[y3]) ([x4],[y4]) = [n]",
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

              n: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },

              IMAGE: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: quadrilateral,
                flipRTL: true,
              },
            },
          },
          {
            opcode: "Squadrilateral",
            blockType: Scratch.BlockType.REPORTER,
            text: "[IMAGE] ([x1],[y1]) ([x2],[y2]) ([x3],[y3]) ([x4],[y4])",
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

              IMAGE: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: quadrilateral,
                flipRTL: true,
              },
            },
          },
        ],
      };
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
    segment(args) {
      return Math.sqrt(
        Math.pow(args.x1 - args.x2, 2) + Math.pow(args.y1 - args.y2, 2)
      );
    }
    Squadrilateral_one(args) {
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
      return Math.round(area) == args.n;
    }
    Squadrilateral(args) {
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
  }
  Scratch.extensions.register(new MoreComparisons());
})(Scratch);
