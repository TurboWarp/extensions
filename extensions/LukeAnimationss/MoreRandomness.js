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
            opcode: "oneInChance",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("1 in [NUM] chances"),
            arguments: {
              NUM: {
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
      const num = Scratch.Cast.toNumber(args.NUM);

      if (!Number.isFinite(num) || num < 1) {
        return false;
      }

      return this.randomRange(1, num) === 1;
    }
    rollDice(args) {
      const num = Scratch.Cast.toNumber(args.NUM) || 0;
      const sides = Scratch.Cast.toNumber(args.SIDES) || 0;
      let min = 0;
      if (sides > 0) {
        min = 1;
      }
      let op = 0;
      for (let i = 0; i < num; i++) {
        op += this.randomRange(min, sides);
      }
      return op;
    }
    randomInput(args) {
      const chars =
        " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
      const symbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
      const let1 = chars.slice(33, 59);
      const let2 = chars.slice(65, 91);
      const nums = chars.slice(16, 26);
      const totlet = let1 + let2;
      switch (args.INP) {
        case "letter":
          return totlet.charAt(this.randomRange(0, totlet.length - 1));
        case "lowercase letter":
          return let2.charAt(this.randomRange(0, let2.length - 1));
        case "uppercase letter":
          return let1.charAt(this.randomRange(0, let1.length - 1));
        case "digit":
          return nums.charAt(this.randomRange(0, nums.length - 1));
        case "boolean":
          return this.randomRange(0, 1) === 1 ? true : false;
        case "symbol":
          return symbols.charAt(this.randomRange(0, symbols.length - 1));
        case "printable character":
          return chars.charAt(this.randomRange(0, chars.length - 1));
        default:
          return "";
      }
    }
    generateString(args) {
      let str = "";
      for (let i = 0; i < args.NUM; i++) {
        str += this.randomInput(args);
      }
      return str;
    }
    jitter(args) {
      return Scratch.Cast.toNumber(args.NUM) + this.randomRange(-args.AMOUNT, args.AMOUNT);
    }
  }

  Scratch.extensions.register(new MoreRandomness());
})(Scratch);
