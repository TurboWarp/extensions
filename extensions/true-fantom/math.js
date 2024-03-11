// Name: Math
// ID: truefantommath
// Description: A lot of operators blocks, from exponentiation to trigonometric functions.
// By: TrueFantom <https://scratch.mit.edu/users/TrueFantom/>
// License: MIT

((Scratch) => {
  "use strict";

  const icon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMjUuMzU0OCIgaGVpZ2h0PSIyMjUuMzU0OCIgdmlld0JveD0iMCwwLDIyNS4zNTQ4LDIyNS4zNTQ4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA3LjMyMjgsLTY3LjMyMjYpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yMDcuMzIyODEsMTgwYzAsLTYyLjIzMDAxIDUwLjQ0NzM5LC0xMTIuNjc3NCAxMTIuNjc3NCwtMTEyLjY3NzRjNjIuMjMwMDEsMCAxMTIuNjc3NCw1MC40NDczOSAxMTIuNjc3NCwxMTIuNjc3NGMwLDYyLjIzMDAxIC01MC40NDczOSwxMTIuNjc3NCAtMTEyLjY3NzQsMTEyLjY3NzRjLTYyLjIzMDAxLDAgLTExMi42Nzc0LC01MC40NDczOSAtMTEyLjY3NzQsLTExMi42Nzc0eiIgZmlsbD0iIzU5YzA1OSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMzk0LjEzMDk3LDEzMi41MDkyN2wtMzUuMjQ3NTIsLTAuMDQ5MjNjLTAuOTQyMDgsNDEuNDQ4ODkgLTIxLjE1OTAxLDk0LjU5NzU0IDcuNDYwMzgsOTQuMjEzMzljMTAuNTAwMTgsLTAuNDQ4MTggMTEuMDYzNDgsLTE2LjA2MTEgMTAuODI1NjgsLTI2LjMwNTE4bDE5LjIyODE0LDEzLjM2NjY3YzAsMTIuNDIwOTQgLTEwLjE0MTgxLDM0Ljg1MjU0IC0zNS4xMTE3NCwzNC4wMjAyYy0xNS4xNzQwMywtMC4xMjgwNSAtMjkuNDQ4NjIsLTExLjI0NDA4IC0yOS44MzI3OCwtMzAuMTk1NjJjMC41MTIyLC0yOC40OTEzMyA2LjMwODAyLC01Ni4zMDg4OSA3Ljk3MjY3LC04NS4zNzY0NWwtMjYuMDA4NDUsLTAuNTY0MjhjLTcuNTU1LDgyLjQ2NDggLTEwLjI2NjU3LDExNS40OTYxIC0zNC41MzIyMiwxMTYuMzI4NDNjLTcuNjgzMDYsLTAuMzIwMTIgLTE0Ljc4OTg4LC01LjgyNjMyIC0xNS41NTgxOSwtMTQuNzg5ODhjLTIuMTEyODQsLTE1LjgxNDI5IDMwLjY5MjYxLC0yNS4xNTk4MSAzMS44NDUwNiwtMTAyLjI0NjQ3Yy0zMS42OTI2MSwtMy41MjE0IC0zMS44MDU0NSwxNS42ODQwMyAtMzcuMTgzNTgsMjEuNzY2NDVsLTE0LjM4NjA2LC0xLjU4NDE1YzE4Ljc2NTU4LC00NC45NDMyNiA5LjQ1ODI5LC0zOS4xMTU4NCAxNTAuNzY1MTIsLTM4LjQzMTM1eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjNTljMDU5IiBzdHJva2Utd2lkdGg9IjIuNSIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjExMi42NzcxOTQ5OTk5OTk5ODoxMTIuNjc3NDA1LS0+";

  const cast = Scratch.Cast;

  const isNotActuallyZero = (val) => {
    if (typeof val !== "string") return false;
    for (let i = 0; i < val.length; i++) {
      const code = val.charCodeAt(i);
      // '0'.charCodeAt(0) === 48
      // '\t'.charCodeAt(0) === 9
      // We include tab for compatibility with scratch-www's broken trim() polyfill.
      // https://github.com/TurboWarp/scratch-vm/issues/115
      // https://scratch.mit.edu/projects/788261699/
      if (code === 48 || code === 9) {
        return false;
      }
    }
    return true;
  };

  const exactlyCompare = (v1, v2) => {
    let n1 = Number(v1);
    let n2 = Number(v2);
    if (n1 === 0 && isNotActuallyZero(v1)) {
      n1 = NaN;
    } else if (n2 === 0 && isNotActuallyZero(v2)) {
      n2 = NaN;
    }
    if (isNaN(n1) || isNaN(n2)) {
      // At least one argument can't be converted to a number.
      // Scratch compares strings as case insensitive, but it shouldn't be here
      const s1 = String(v1);
      const s2 = String(v2);
      if (s1 < s2) {
        return -1;
      } else if (s1 > s2) {
        return 1;
      }
      return 0;
    }
    // Handle the special case of Infinity
    if (
      (n1 === Infinity && n2 === Infinity) ||
      (n1 === -Infinity && n2 === -Infinity)
    ) {
      return 0;
    }
    // Compare as numbers.
    return n1 - n2;
  };

  const toNaNNumber = (value) => {
    // If value is already a number we don't need to coerce it with
    // Number().
    if (typeof value === "number") {
      // Scratch treats NaN as 0, when needed as a number, but it shouldn't be here
      // E.g., 0 + NaN -> 0.
      return value;
    }
    const n = Number(value);
    // Scratch treats NaN as 0, when needed as a number, but it shouldn't be here
    // E.g., 0 + NaN -> 0.
    return n;
  };

  const isTrueInt = (val) => {
    // Values that are already numbers.
    if (typeof val === "number") {
      if (isNaN(val)) {
        // NaN is considered an integer.
        return true;
      }
      // True if it's "round" (e.g., 2.0 and 2).
      return val === Math.floor(val);
    } else if (typeof val === "boolean") {
      // `True` and `false` always represent integer after Scratch cast.
      return true;
    } else if (typeof val === "string") {
      // If it contains a decimal point, don't consider it an int, but it shouldn't be here
      const n = Number(val);
      if (isNaN(n)) {
        // NaN is considered an integer.
        return true;
      }
      // True if it's "round" (e.g., 2.0 and 2).
      return n === Math.floor(n);
    }
    return false;
  };

  class ScratchMath {
    getInfo() {
      return {
        id: "truefantommath",
        name: "Math",

        color1: "#59c059",

        menuIconURI: icon,

        blocks: [
          {
            opcode: "exponent_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "[A] ^ [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              B: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
            extensions: ["colours_operators"],
          },
          {
            opcode: "root_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "[A] √ [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              B: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
            extensions: ["colours_operators"],
          },
          {
            opcode: "negative_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "- [A]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
            extensions: ["colours_operators"],
          },
          "---",
          {
            opcode: "more_or_equal_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[A] ≥ [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 50,
              },
            },
            extensions: ["colours_operators"],
          },
          {
            opcode: "less_or_equal_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[A] ≤ [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 50,
              },
            },
            extensions: ["colours_operators"],
          },
          {
            opcode: "not_equal_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[A] ≠ [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 50,
              },
            },
            extensions: ["colours_operators"],
          },
          {
            opcode: "exactly_equal_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[A] ≡ [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 50,
              },
            },
            extensions: ["colours_operators"],
          },
          {
            opcode: "not_exactly_equal_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[A] ≢ [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 50,
              },
            },
            extensions: ["colours_operators"],
          },
          {
            opcode: "almost_equal_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[A] ≈ [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 50,
              },
            },
            extensions: ["colours_operators"],
          },
          {
            opcode: "not_almost_equal_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[A] ≉ [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 50,
              },
            },
            extensions: ["colours_operators"],
          },
          "---",
          {
            opcode: "nand_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[A] nand [B]",
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
            opcode: "nor_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[A] nor [B]",
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
            opcode: "xor_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[A] xor [B]",
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
            opcode: "xnor_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[A] xnor [B]",
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
          "---",
          {
            opcode: "exactly_cont_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[A] exactly contains [B] ?",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "a",
              },
            },
            extensions: ["colours_operators"],
          },
          "---",
          {
            opcode: "clamp_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "clamp [A] between [B] and [C]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              B: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              C: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
            },
            extensions: ["colours_operators"],
          },
          {
            opcode: "scale_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "map [A] from range [m1] - [M1] to range [m2] - [M2]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              m1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              M1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
              m2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              M2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
              },
            },
            extensions: ["colours_operators"],
          },
          "---",
          {
            opcode: "trunc2_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "trunc of [A] with [B] digits after dot",
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              B: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
              },
            },
            extensions: ["colours_operators"],
          },
          {
            opcode: "trunc_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "trunc of [A]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
            extensions: ["colours_operators"],
          },
          "---",
          {
            opcode: "is_multiple_of_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[A] is multiple of [B] ?",
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              B: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
            extensions: ["colours_operators"],
          },
          "---",
          {
            opcode: "log_with_base_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "log of [A] with base [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              B: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
              },
            },
            extensions: ["colours_operators"],
          },
          "---",
          {
            opcode: "pi_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "𝜋",
            extensions: ["colours_operators"],
          },
          {
            opcode: "e_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "𝘦",
            extensions: ["colours_operators"],
          },
          {
            opcode: "infinity_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "∞",
            extensions: ["colours_operators"],
          },
          "---",
          {
            opcode: "is_safe_number_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is safe number [A] ?",
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
            extensions: ["colours_operators"],
          },
          "---",
          {
            opcode: "is_number_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is number [A] ?",
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
            extensions: ["colours_operators"],
          },
          {
            opcode: "is_int_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is int [A] ?",
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
            extensions: ["colours_operators"],
          },
          {
            opcode: "is_float_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is float [A] ?",
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
            extensions: ["colours_operators"],
          },
        ],
      };
    }

    exponent_block({ A, B }) {
      return Math.pow(cast.toNumber(A), cast.toNumber(B));
    }
    root_block({ A, B }) {
      return Math.pow(cast.toNumber(B), 1 / cast.toNumber(A));
    }
    negative_block({ A }) {
      return 0 - cast.toNumber(A);
    }
    more_or_equal_block({ A, B }) {
      return cast.compare(A, B) >= 0;
    }
    less_or_equal_block({ A, B }) {
      return cast.compare(A, B) <= 0;
    }
    not_equal_block({ A, B }) {
      return cast.compare(A, B) !== 0;
    }
    exactly_equal_block({ A, B }) {
      return exactlyCompare(A, B) === 0;
    }
    not_exactly_equal_block({ A, B }) {
      return exactlyCompare(A, B) !== 0;
    }
    almost_equal_block({ A, B }) {
      const c = cast.compare(A, B);
      return c <= 0.5 && c >= -0.5;
    }
    not_almost_equal_block({ A, B }) {
      const c = cast.compare(A, B);
      return !(c <= 0.5 && c >= -0.5);
    }
    nand_block({ A, B }) {
      return !(cast.toBoolean(A) && cast.toBoolean(B));
    }
    nor_block({ A, B }) {
      return !(cast.toBoolean(A) || cast.toBoolean(B));
    }
    xor_block({ A, B }) {
      return cast.toBoolean(A) !== cast.toBoolean(B);
    }
    xnor_block({ A, B }) {
      return cast.toBoolean(A) === cast.toBoolean(B);
    }
    exactly_cont_block({ A, B }) {
      return cast.toString(A).includes(cast.toString(B));
    }
    clamp_block({ A, B, C }) {
      if (cast.compare(A, B) < 0) {
        return B;
      } else if (cast.compare(A, C) > 0) {
        return C;
      } else {
        return A;
      }
    }
    scale_block({ A, m1, M1, m2, M2 }) {
      return (
        ((cast.toNumber(A) - cast.toNumber(m1)) *
          (cast.toNumber(M2) - cast.toNumber(m2))) /
          (cast.toNumber(M1) - cast.toNumber(m1)) +
        cast.toNumber(m2)
      );
    }
    trunc2_block({ A, B }) {
      let n = Math.floor(cast.toNumber(B));
      if (n >= 1) {
        n = 10 ** n;
        if (n !== Infinity) {
          return Math.trunc(cast.toNumber(A) * n) / n;
        }
        return cast.toNumber(A);
      }
      return Math.trunc(cast.toNumber(A));
    }
    trunc_block({ A }) {
      return Math.trunc(cast.toNumber(A));
    }
    is_multiple_of_block({ A, B }) {
      return cast.toNumber(A) % cast.toNumber(B) === 0;
    }
    log_with_base_block({ A, B }) {
      return Math.log(cast.toNumber(A)) / Math.log(cast.toNumber(B));
    }
    pi_block() {
      return Math.PI;
    }
    e_block() {
      return Math.E;
    }
    infinity_block() {
      return Infinity;
    }
    is_safe_number_block({ A }) {
      return Number.isSafeInteger(cast.toNumber(A));
    }
    is_number_block({ A }) {
      return !Number.isNaN(toNaNNumber(A));
    }
    is_int_block({ A }) {
      return isTrueInt(A) && !Number.isNaN(toNaNNumber(A));
    }
    is_float_block({ A }) {
      return !isTrueInt(A) && !Number.isNaN(toNaNNumber(A));
    }
  }

  Scratch.extensions.register(new ScratchMath());
})(Scratch);
