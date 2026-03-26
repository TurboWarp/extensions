// Name: Operators Plus
// ID: jojanoOperatorsPlus
// Description: Allows for some very useful operator functions to be used inside TurboWarp.
// By: JojanoStudios <https://scratch.mit.edu/users/JojanoStudios/>
// License: MPL-2.0

(function () {
  "use strict";

  class OperatorsPlus {
    getInfo() {
      return {
        id: "operatorsplus",
        name: Scratch.translate("Operators+"),
        color1: "#40bf4a",
        color2: "#38a840",
        color3: "#2d8f35",
        blocks: [
          { blockType: "label", text: Scratch.translate("String") },

          {
            opcode: "amountofmcdonaldscheeseburgershidinginmybasement",
            blockType: "reporter",
            text: Scratch.translate("amount of [NEEDLE] in [HAYSTACK]"),
            arguments: {
              NEEDLE: { type: "string", defaultValue: "a" },
              HAYSTACK: { type: "string", defaultValue: "banana" },
            },
          },
          {
            opcode: "replacethebunsinmysandwichwithcatfur",
            blockType: "reporter",
            text: Scratch.translate(
              "replace all [NEEDLE] in [HAYSTACK] with [REPLACEMENT]"
            ),
            arguments: {
              NEEDLE: { type: "string", defaultValue: "a" },
              HAYSTACK: { type: "string", defaultValue: "banana" },
              REPLACEMENT: { type: "string", defaultValue: "o" },
            },
          },
          {
            opcode: "splitwithitem",
            blockType: "reporter",
            text: Scratch.translate("[TEXT] split by [SEP] item [N]"),
            arguments: {
              TEXT: { type: "string", defaultValue: "a,b,c" },
              SEP: { type: "string", defaultValue: "," },
              N: { type: "number", defaultValue: 1 },
            },
          },
          {
            opcode: "lengthofsplit",
            blockType: "reporter",
            text: Scratch.translate("length of [TEXT] split by [SEP]"),
            arguments: {
              TEXT: { type: "string", defaultValue: "a,b,c" },
              SEP: { type: "string", defaultValue: "," },
            },
          },
          {
            opcode: "reverse",
            blockType: "reporter",
            text: Scratch.translate("[TEXT] reversed"),
            arguments: {
              TEXT: { type: "string", defaultValue: "hello" },
            },
          },
          {
            opcode: "trim",
            blockType: "reporter",
            text: Scratch.translate("[TEXT] trimmed"),
            arguments: {
              TEXT: { type: "string", defaultValue: "  hello  " },
            },
          },
          {
            opcode: "uppercase",
            blockType: "reporter",
            text: Scratch.translate("[TEXT] uppercase"),
            arguments: {
              TEXT: { type: "string", defaultValue: "hello" },
            },
          },
          {
            opcode: "lowercase",
            blockType: "reporter",
            text: Scratch.translate("[TEXT] lowercase"),
            arguments: {
              TEXT: { type: "string", defaultValue: "HELLO" },
            },
          },
          {
            opcode: "startswith",
            blockType: "Boolean",
            text: Scratch.translate("[TEXT] starts with [PREFIX]"),
            arguments: {
              TEXT: { type: "string", defaultValue: "hello world" },
              PREFIX: { type: "string", defaultValue: "hello" },
            },
          },
          {
            opcode: "endswith",
            blockType: "Boolean",
            text: Scratch.translate("[TEXT] ends with [SUFFIX]"),
            arguments: {
              TEXT: { type: "string", defaultValue: "hello world" },
              SUFFIX: { type: "string", defaultValue: "world" },
            },
          },
          {
            opcode: "indexof",
            blockType: "reporter",
            text: Scratch.translate("index of [NEEDLE] in [HAYSTACK]"),
            arguments: {
              NEEDLE: { type: "string", defaultValue: "l" },
              HAYSTACK: { type: "string", defaultValue: "hello" },
            },
          },
          {
            opcode: "repeat",
            blockType: "reporter",
            text: Scratch.translate("[TEXT] repeated [N] times"),
            arguments: {
              TEXT: { type: "string", defaultValue: "ab" },
              N: { type: "number", defaultValue: 3 },
            },
          },
          {
            opcode: "textstarttoend",
            blockType: "reporter",
            text: Scratch.translate("[TEXT] from letter [START] to [END]"),
            arguments: {
              TEXT: { type: "string", defaultValue: "hello world" },
              START: { type: "number", defaultValue: 1 },
              END: { type: "number", defaultValue: 5 },
            },
          },

          { blockType: "label", text: Scratch.translate("Math") },

          {
            opcode: "clampmycheeks",
            blockType: "reporter",
            text: Scratch.translate("[N] clamp between [MIN] and [MAX]"),
            arguments: {
              N: { type: "number", defaultValue: 5 },
              MIN: { type: "number", defaultValue: 0 },
              MAX: { type: "number", defaultValue: 10 },
            },
          },
          {
            opcode: "power",
            blockType: "reporter",
            text: Scratch.translate("[BASE] to the power of [EXP]"),
            arguments: {
              BASE: { type: "number", defaultValue: 2 },
              EXP: { type: "number", defaultValue: 8 },
            },
          },
          {
            opcode: "numberrootthing",
            blockType: "reporter",
            text: Scratch.translate("[N] root of [X]"),
            arguments: {
              N: { type: "number", defaultValue: 3 },
              X: { type: "number", defaultValue: 27 },
            },
          },
          {
            opcode: "logbase",
            blockType: "reporter",
            text: Scratch.translate("[X] log base [BASE]"),
            arguments: {
              X: { type: "number", defaultValue: 100 },
              BASE: { type: "number", defaultValue: 10 },
            },
          },
          {
            opcode: "sign",
            blockType: "reporter",
            text: Scratch.translate("sign of [N]"),
            arguments: {
              N: { type: "number", defaultValue: -5 },
            },
          },
          {
            opcode: "lerpfrom",
            blockType: "reporter",
            text: Scratch.translate("lerp from [A] to [B] by [T]"),
            arguments: {
              A: { type: "number", defaultValue: 0 },
              B: { type: "number", defaultValue: 100 },
              T: { type: "number", defaultValue: 0.5 },
            },
          },
          {
            opcode: "wrapbetween",
            blockType: "reporter",
            text: Scratch.translate("[N] wrap between [MIN] and [MAX]"),
            arguments: {
              N: { type: "number", defaultValue: 11 },
              MIN: { type: "number", defaultValue: 0 },
              MAX: { type: "number", defaultValue: 10 },
            },
          },
          {
            opcode: "decimals",
            blockType: "reporter",
            text: Scratch.translate("[N] with [D] decimals"),
            arguments: {
              N: { type: "number", defaultValue: 3.14159 },
              D: { type: "number", defaultValue: 2 },
            },
          },

          { blockType: "label", text: Scratch.translate("Boolean") },

          {
            opcode: "between",
            blockType: "Boolean",
            text: Scratch.translate("[N] is between [MIN] and [MAX]"),
            arguments: {
              N: { type: "number", defaultValue: 5 },
              MIN: { type: "number", defaultValue: 1 },
              MAX: { type: "number", defaultValue: 10 },
            },
          },
          {
            opcode: "integer",
            blockType: "Boolean",
            text: Scratch.translate("[N] is integer"),
            arguments: {
              N: { type: "number", defaultValue: 4 },
            },
          },
          {
            opcode: "numeric",
            blockType: "Boolean",
            text: Scratch.translate("[TEXT] is numeric"),
            arguments: {
              TEXT: { type: "string", defaultValue: "123" },
            },
          },
          {
            opcode: "evensteven",
            blockType: "Boolean",
            text: Scratch.translate("[N] is even"),
            arguments: {
              N: { type: "number", defaultValue: 4 },
            },
          },
          {
            opcode: "oddtodd",
            blockType: "Boolean",
            text: Scratch.translate("[N] is odd"),
            arguments: {
              N: { type: "number", defaultValue: 3 },
            },
          },
        ],
      };
    }

    amountofmcdonaldscheeseburgershidinginmybasement({ NEEDLE, HAYSTACK }) {
      const needle = String(NEEDLE);
      const haystack = String(HAYSTACK);
      if (needle.length === 0) return 0;
      let count = 0;
      let pos = 0;
      while ((pos = haystack.indexOf(needle, pos)) !== -1) {
        count++;
        pos += needle.length;
      }
      return count;
    }

    replacethebunsinmysandwichwithcatfur({ NEEDLE, HAYSTACK, REPLACEMENT }) {
      const needle = String(NEEDLE);
      const haystack = String(HAYSTACK);
      const replacement = String(REPLACEMENT);
      if (needle.length === 0) return haystack;
      return haystack.split(needle).join(replacement);
    }

    splitwithitem({ TEXT, SEP, N }) {
      const parts = String(TEXT).split(String(SEP));
      const idx = Math.round(Number(N)) - 1;
      if (idx < 0 || idx >= parts.length) return "";
      return parts[idx];
    }

    lengthofsplit({ TEXT, SEP }) {
      return String(TEXT).split(String(SEP)).length;
    }

    reverse({ TEXT }) {
      return String(TEXT).split("").reverse().join("");
    }

    trim({ TEXT }) {
      return String(TEXT).trim();
    }

    uppercase({ TEXT }) {
      return String(TEXT).toUpperCase();
    }

    lowercase({ TEXT }) {
      return String(TEXT).toLowerCase();
    }

    startswith({ TEXT, PREFIX }) {
      return String(TEXT).startsWith(String(PREFIX));
    }

    endswith({ TEXT, SUFFIX }) {
      return String(TEXT).endsWith(String(SUFFIX));
    }

    indexof({ NEEDLE, HAYSTACK }) {
      const idx = String(HAYSTACK).indexOf(String(NEEDLE));
      return idx === -1 ? 0 : idx + 1;
    }

    repeat({ TEXT, N }) {
      const n = Math.max(0, Math.round(Number(N)));
      return String(TEXT).repeat(n);
    }

    textstarttoend({ TEXT, START, END }) {
      const str = String(TEXT);
      const s = Math.round(Number(START)) - 1;
      const e = Math.round(Number(END));
      return str.slice(Math.max(0, s), Math.max(0, e));
    }

    clampmycheeks({ N, MIN, MAX }) {
      const n = Number(N),
        min = Number(MIN),
        max = Number(MAX);
      return Math.min(Math.max(n, min), max);
    }

    power({ BASE, EXP }) {
      return Math.pow(Number(BASE), Number(EXP));
    }

    numberrootthing({ N, X }) {
      const n = Number(N),
        x = Number(X);
      if (n === 0) return 0;
      return Math.pow(x, 1 / n);
    }

    logbase({ X, BASE }) {
      const x = Number(X),
        base = Number(BASE);
      if (x <= 0 || base <= 0 || base === 1) return 0;
      return Math.log(x) / Math.log(base);
    }

    sign({ N }) {
      return Math.sign(Number(N));
    }

    lerpfrom({ A, B, T }) {
      const a = Number(A),
        b = Number(B),
        t = Number(T);
      return a + (b - a) * t;
    }

    wrapbetween({ N, MIN, MAX }) {
      const n = Number(N),
        min = Number(MIN),
        max = Number(MAX);
      const range = max - min;
      if (range === 0) return min;
      return ((((n - min) % range) + range) % range) + min;
    }

    decimals({ N, D }) {
      const decimals = Math.max(0, Math.round(Number(D)));
      return parseFloat(Number(N).toFixed(decimals));
    }

    between({ N, MIN, MAX }) {
      const n = Number(N);
      return n >= Number(MIN) && n <= Number(MAX);
    }

    integer({ N }) {
      return Number.isInteger(Number(N));
    }

    numeric({ TEXT }) {
      const t = String(TEXT).trim();
      return t.length > 0 && !isNaN(Number(t));
    }

    evensteven({ N }) {
      return Number(N) % 2 === 0;
    }

    oddtodd({ N }) {
      return Math.abs(Number(N) % 2) === 1;
    }
  }

  Scratch.extensions.register(new OperatorsPlus());
})();
