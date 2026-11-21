// Name: More Randomness
// ID: morerandomness
// Description: Adds blocks related to randomness, driven by an editable seed.
// By: LukeAnimationss <https://scratch.mit.edu/users/LukeAnimationss/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("More Randomness must run unsandboxed");
  }

  const diceIcon =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KICA8ZWxsaXBzZSBzdHlsZT0ic3Ryb2tlOiByZ2IoMCwgMCwgMCk7IGZpbGw6IHJnYigwLCAxOTksIDczKTsgc3Ryb2tlLXdpZHRoOiAwcHg7IiBjeD0iMjU2IiBjeT0iMjU2IiByeD0iMjU0LjExOSIgcnk9IjI1NC4xMTkiLz4KICA8cGF0aCBkPSJNIDMyMS45MDkgMjU2IEMgMzIxLjkwOSAyOTIuNDAxIDI5Mi40MDEgMzIxLjkwOSAyNTYgMzIxLjkwOSBDIDIxOS41OTkgMzIxLjkwOSAxOTAuMDkxIDI5Mi40MDEgMTkwLjA5MSAyNTYgQyAxOTAuMDkxIDIxOS41OTkgMjE5LjU5OSAxOTAuMDkxIDI1NiAxOTAuMDkxIEMgMjkyLjQwMSAxOTAuMDkxIDMyMS45MDkgMjE5LjU5OSAzMjEuOTA5IDI1NiBaIE0gMTA0LjU0OSAxNDkuMzE3IEwgMTA0LjU0OSAzNjIuNjgyIEMgMTA0LjU0OSAzODcuNDA3IDEyNC41OTIgNDA3LjQ1IDE0OS4zMTcgNDA3LjQ1IEwgMzYyLjY4MiA0MDcuNDUgQyAzODcuNDA3IDQwNy40NSA0MDcuNDUgMzg3LjQwNyA0MDcuNDUgMzYyLjY4MiBMIDQwNy40NSAxNDkuMzE3IEMgNDA3LjQ1IDEyNC41OTIgMzg3LjQwNyAxMDQuNTQ5IDM2Mi42ODIgMTA0LjU0OSBMIDE0OS4zMTcgMTA0LjU0OSBDIDEyNC41OTIgMTA0LjU0OSAxMDQuNTQ5IDEyNC41OTIgMTA0LjU0OSAxNDkuMzE3IFoiIHN0eWxlPSJzdHJva2Utd2lkdGg6IDBweDsgcGFpbnQtb3JkZXI6IGZpbGw7IHN0cm9rZTogcmdiKDAsIDAsIDApOyBmaWxsLW9wYWNpdHk6IDAuMzE7Ii8+Cjwvc3ZnPg==";
  const diceIconInv =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KICA8cGF0aCBkPSJNIDMyMS45MDkgMjU2IEMgMzIxLjkwOSAyOTIuNDAxIDI5Mi40MDEgMzIxLjkwOSAyNTYgMzIxLjkwOSBDIDIxOS41OTkgMzIxLjkwOSAxOTAuMDkxIDI5Mi40MDEgMTkwLjA5MSAyNTYgQyAxOTAuMDkxIDIxOS41OTkgMjE5LjU5OSAxOTAuMDkxIDI1NiAxOTAuMDkxIEMgMjkyLjQwMSAxOTAuMDkxIDMyMS45MDkgMjE5LjU5OSAzMjEuOTA5IDI1NiBaIE0gMTA0LjU0OSAxNDkuMzE3IEwgMTA0LjU0OSAzNjIuNjgyIEMgMTA0LjU0OSAzODcuNDA3IDEyNC41OTIgNDA3LjQ1IDE0OS4zMTcgNDA3LjQ1IEwgMzYyLjY4MiA0MDcuNDUgQyAzODcuNDA3IDQwNy40NSA0MDcuNDUgMzg3LjQwNyA0MDcuNDUgMzYyLjY4MiBMIDQwNy40NSAxNDkuMzE3IEMgNDA3LjQ1IDEyNC41OTIgMzg3LjQwNyAxMDQuNTQ5IDM2Mi42ODIgMTA0LjU0OSBMIDE0OS4zMTcgMTA0LjU0OSBDIDEyNC41OTIgMTA0LjU0OSAxMDQuNTQ5IDEyNC41OTIgMTA0LjU0OSAxNDkuMzE3IFoiIHN0eWxlPSJzdHJva2Utd2lkdGg6IDBweDsgcGFpbnQtb3JkZXI6IGZpbGw7IHN0cm9rZTogcmdiKDAsIDAsIDApOyBmaWxsLW9wYWNpdHk6IDAuMzE7Ii8+Cjwvc3ZnPg==";

  const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
  const DIGITS = "0123456789";
  const SYMBOLS = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  const PRINTABLE =
    " " +
    SYMBOLS.slice(0, 15) +
    DIGITS +
    SYMBOLS.slice(15, 22) +
    UPPERCASE +
    SYMBOLS.slice(22, 28) +
    LOWERCASE +
    SYMBOLS.slice(28);

  class MoreRandomness {
    constructor() {
      this.seed = (Math.random() * 4294967296) | 0;
      this.rng = this.random32(this.seed);
    }

    getInfo() {
      return {
        id: "morerandomness",
        name: Scratch.translate("More Randomness"),
        color1: "#00c749",
        color2: "#0ead48",
        color3: "#0f9942",
        menuIconURI: diceIcon,
        blockIconURI: diceIconInv,
        blocks: [
          {
            opcode: "setSeed",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set seed to [NUM]"),
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 42,
              },
            },
          },
          {
            opcode: "generateSeed",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set random seed"),
          },
          {
            opcode: "getSeed",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("seed"),
            disableMonitor: false,
          },
          "---",
          {
            opcode: "randomNum",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("pick random [NUM1] to [NUM2]"),
            arguments: {
              NUM1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              NUM2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
              },
            },
          },
          {
            opcode: "jitter",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("jitter [NUM] by [AMOUNT]"),
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
              AMOUNT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
              },
            },
          },
          {
            opcode: "rollDice",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("roll [NUM] dice with [SIDES] sides"),
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
              },
              SIDES: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 6,
              },
            },
          },
          {
            opcode: "randomInput",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("random [INP]"),
            arguments: {
              INP: {
                type: Scratch.ArgumentType.STRING,
                menu: "randomInp",
              },
            },
          },
          {
            opcode: "generateString",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("generate [NUM] random [INP]"),
            arguments: {
              INP: {
                type: Scratch.ArgumentType.STRING,
                menu: "randomInp",
              },
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5,
              },
            },
          },
          {
            opcode: "transformIntoRandom",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("transform [STR] into random characters"),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "hello123",
              },
            },
          },
          "---",
          {
            opcode: "oneInChance",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("one in [NUM] chances"),
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
              },
            },
          },
          {
            opcode: "percentChance",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("[NUM]% chance"),
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
            },
          },
          "---",
          {
            opcode: "shuffleList",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("shuffle list [LIST]"),
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "list",
              },
            },
          },
        ],
        menus: {
          randomInp: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("letter"), value: "letter" },
              {
                text: Scratch.translate("lowercase letter"),
                value: "lowercase letter",
              },
              {
                text: Scratch.translate("uppercase letter"),
                value: "uppercase letter",
              },
              { text: Scratch.translate("digit"), value: "digit" },
              { text: Scratch.translate("boolean"), value: "boolean" },
              { text: Scratch.translate("symbol"), value: "symbol" },
              { text: Scratch.translate("sign"), value: "sign" },
              {
                text: Scratch.translate("printable character"),
                value: "printable character",
              },
            ],
          },
        },
      };
    }
    random32(seed) {
      return function () {
        let t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    randomRange(min, max) {
      const isDecimal =
        min.toString().includes(".") || max.toString().includes(".");

      min = Scratch.Cast.toNumber(min) || 0;
      max = Scratch.Cast.toNumber(max) || 0;

      if (min > max) {
        [min, max] = [max, min];
      }

      const rand = this.rng();

      if (isDecimal) {
        return rand * (max - min) + min;
      }

      return Math.floor(rand * (max - min + 1)) + min;
    }
    shuffle(list) {
      for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(this.rng() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
      }
      return list;
    }
    getTextType(char) {
      if (/^\p{N}$/u.test(char)) {
        return "digit";
      } else if (/^\p{Lu}$/u.test(char)) {
        return "uppercase letter";
      } else if (/^\p{Ll}$/u.test(char)) {
        return "lowercase letter";
      } else if (/^\p{L}$/u.test(char)) {
        return "letter";
      } else if (/^[\p{P}\p{S}]$/u.test(char)) {
        return "symbol";
      } else if (char === " ") {
        return "space";
      } else {
        return "printable character";
      }
    }

    setSeed(args) {
      this.seed = Scratch.Cast.toNumber(args.NUM) || 0;
      this.rng = this.random32(this.seed);
    }
    generateSeed() {
      this.seed = (Math.random() * 4294967296) | 0;
      this.rng = this.random32(this.seed);
    }
    getSeed() {
      return this.seed;
    }
    randomNum(args) {
      return this.randomRange(args.NUM1, args.NUM2);
    }
    oneInChance(args) {
      const num = Scratch.Cast.toNumber(Math.floor(args.NUM));
      if (!Number.isFinite(num) || num < 1) {
        return false;
      }
      return this.randomRange(1, num) === 1;
    }
    percentChance(args) {
      const num = Scratch.Cast.toNumber(args.NUM);
      if (!Number.isFinite(num) || num <= 0) {
        return false;
      }
      if (this.randomRange("0.0", "100.0") < num) {
        return true;
      }
      return false;
    }
    rollDice(args) {
      const num = isFinite(Scratch.Cast.toNumber(args.NUM))
        ? Scratch.Cast.toNumber(args.NUM)
        : 0;
      const sides = isFinite(Scratch.Cast.toNumber(args.SIDES))
        ? Scratch.Cast.toNumber(args.SIDES)
        : 0;
      let min = 0;
      if (sides > 0) {
        min = 1;
      }
      let op = 0;
      for (let i = 0; i < num; i++) {
        op += this.randomRange(min, Math.floor(sides));
      }
      return op;
    }
    randomInput(args) {
      const letters = UPPERCASE + LOWERCASE;
      switch (args.INP) {
        case "letter":
          return letters.charAt(this.randomRange(0, letters.length - 1));
        case "lowercase letter":
          return LOWERCASE.charAt(this.randomRange(0, LOWERCASE.length - 1));
        case "uppercase letter":
          return UPPERCASE.charAt(this.randomRange(0, UPPERCASE.length - 1));
        case "digit":
          return DIGITS.charAt(this.randomRange(0, DIGITS.length - 1));
        case "boolean":
          return this.randomRange(0, 1) === 1 ? true : false;
        case "symbol":
          return SYMBOLS.charAt(this.randomRange(0, SYMBOLS.length - 1));
        case "sign":
          return this.randomRange(0, 1) === 1 ? 1 : -1;
        case "printable character":
          return PRINTABLE.charAt(this.randomRange(0, PRINTABLE.length - 1));
        case "space":
          return " ";
        default:
          return "";
      }
    }
    generateString(args) {
      if (
        Scratch.Cast.toNumber(args.NUM) < 1 ||
        !Number.isFinite(Scratch.Cast.toNumber(args.NUM))
      ) {
        return "";
      }

      let str = "";
      for (let i = 0; i < Scratch.Cast.toString(args.NUM); i++) {
        str += this.randomInput(args);
      }
      return str;
    }
    jitter(args) {
      return (
        Scratch.Cast.toNumber(args.NUM) +
        this.randomRange(-args.AMOUNT, args.AMOUNT)
      );
    }
    transformIntoRandom(args) {
      const str = Scratch.Cast.toString(args.STR);
      let newstr = "";

      for (let i = 0; i < str.length; i++) {
        const type = this.getTextType(str.charAt(i));
        newstr += this.randomInput({ INP: type });
      }

      return newstr;
    }

    shuffleList(args, util) {
      const listName = Scratch.Cast.toString(args.LIST);
      const list = util.target.lookupVariableByNameAndType(listName, "list");
      if (!list) return "";
      const original = [...list.value];
      const values = [...original];

      const allSame = original.every((val) => val === original[0]);
      if (allSame) return;

      while (values.every((value, i) => value === original[i])) {
        this.shuffle(values);
      }
      list.value = values;
    }
  }

  Scratch.extensions.register(new MoreRandomness());
})(Scratch);
