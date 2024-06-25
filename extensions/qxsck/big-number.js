// Name: Big Number
// ID: qxsckbignumber
// Description: High precision operations. (Support decimals)
// By: qxsck
// License: MIT

(function (Scratch) {
  "use strict";
  class bigNumber {
    constructor() {
      this.maxPrecision = 100;

      this.tenTimes = function (val) {
        return 10n ** BigInt(val);
      };
      this.times = function (val, num) {
        return val.repeat(num);
      };
      this.toNum = function (val) {
        return isNaN(Number(val)) ? 0 : Number(val);
      };
      this.removeLeft = function (str, pattern) {
        const regex = new RegExp("^" + pattern + "+");
        return str.replace(regex, "");
      };
      this.removeRight = function (str, pattern) {
        const regex = new RegExp(pattern + "+$");
        return str.replace(regex, "");
      };
      this.formatNum = function (result, len) {
        result = String(result);
        let flag = 0;
        if (result.startsWith("-")) {
          result = result.replace("-", "");
          flag = 1;
        }
        result = this.times("0", len * 2) + result;
        let int = result.slice(0, result.length - len),
          dec = result.slice(result.length - len);
        int = this.removeLeft(int, "0");
        dec = this.removeRight(dec, "0");
        if (int === "") int = "0";
        dec = dec === "" ? "" : "." + dec;
        let result_ = int + dec;
        result_ = (flag ? "-" : "") + result_;
        return result_;
      };

      this.toBigNumber = function (num) {
        let str = String(num),
          P = str.indexOf(".");
        P = P === -1 ? str.length - 1 : P;
        let noDecNumber = str.replace(".", "");
        let try_ = Number(noDecNumber);
        let [str_, len_] = isNaN(try_)
          ? ["0", 0]
          : noDecNumber.indexOf(".") === -1
            ? [noDecNumber, str.length - P - 1]
            : ["0", 0];
        return {
          num: BigInt(str_),
          len: len_,
        };
      };
      this.toSamePer = function (num, num2) {
        let a = this.toBigNumber(num),
          b = this.toBigNumber(num2);
        let len = Math.max(a.len, b.len);
        if (len === a.len) b.num = b.num * this.tenTimes(len - b.len);
        else a.num = a.num * this.tenTimes(len - a.len);
        a.len = b.len = len;
        return {
          num: a,
          num2: b,
        };
      };

      this.addFunc = function (num, num2) {
        let { num: a, num2: b } = this.toSamePer(num, num2);
        let result = a.num + b.num;
        let num_ = this.formatNum(result, a.len);
        return this.roundFunc(num_, this.maxPrecision);
      };
      this.subFunc = function (num, num2) {
        let { num: a, num2: b } = this.toSamePer(num, num2);
        let result = a.num - b.num;
        let num_ = this.formatNum(result, a.len);
        return this.roundFunc(num_, this.maxPrecision);
      };
      this.mulFunc = function (num, num2) {
        let { num: a, num2: b } = this.toSamePer(num, num2);
        let result = a.num * b.num;
        let num_ = this.formatNum(result, a.len * 2);
        return this.roundFunc(num_, this.maxPrecision);
      };
      this.divFunc = function (num, num2) {
        let { num: a, num2: b } = this.toSamePer(num, num2);
        if (b.num === 0n) return Infinity;
        let result = (a.num * this.tenTimes(this.maxPrecision + 1)) / b.num;
        return this.formatNum(result, this.maxPrecision + 1);
      };
      this.powFunc = function (num, num2) {
        let a = this.toBigNumber(num),
          b = Math.trunc(this.toNum(num2)),
          flag = 0;
        if (a.num === 0n) return "0";
        else if (b.num === 0n) return "1";
        if (b < 0) (flag = 1), (b = -b);
        let result = a.num ** BigInt(b);
        let num_;
        if (!flag) num_ = this.formatNum(result, a.len * b);
        else num_ = this.divFunc("1", this.formatNum(result, a.len * b));
        return this.roundFunc(num_, this.maxPrecision);
      };
      this.modFunc = function (num, num2) {
        let { num: a, num2: b } = this.toSamePer(num, num2);
        if (b.num === 0n) return "0";
        let result = a.num % b.num;
        let num_ = this.formatNum(result, a.len);
        return this.roundFunc(num_, this.maxPrecision);
      };

      this.roundFunc = function (num, num2) {
        let a = this.toBigNumber(num),
          round = Math.trunc(this.toNum(num2)),
          flag = a.num >= 0n;
        if (round >= a.len) {
          return this.formatNum(a.num, a.len);
        }
        for (let i = 0; i < a.len - round - 1; i++) a.num = a.num / 10n;
        let lastNum = a.num % 10n,
          flag2;
        a.num = a.num / 10n;
        if (flag) {
          flag2 = lastNum % 10n >= 5n;
          a.num = a.num + BigInt(flag2);
        } else {
          flag2 = lastNum % 10n <= -5n;
          a.num = a.num - BigInt(flag2);
        }
        for (let i = 0; i < a.len - round; i++) a.num = a.num * 10n;
        return this.formatNum(a.num, a.len);
      };
      this.randomFunc = function (num, num2) {
        let { num: a, num2: b } = this.toSamePer(num, num2);
        let aa = this.formatNum(a.num, a.len),
          bb = this.formatNum(b.num, b.len),
          temp1 = aa,
          temp2 = bb;
        aa = this.binaryOper({
          OPER: "min",
          NUM: temp1,
          NUM2: temp2,
        });
        bb = this.binaryOper({
          OPER: "max",
          NUM: temp1,
          NUM2: temp2,
        });
        let random_ = String(Math.random());
        random_ = this.roundFunc(random_, 10);
        let nums = this.toSamePer(aa, random_),
          nums2 = this.toSamePer(bb, random_);
        (a = nums.num), (b = nums2.num), (random_ = nums.num2);
        (a = this.formatNum(a.num, a.len)),
          (b = this.formatNum(b.num, b.len)),
          (random_ = this.formatNum(random_.num, random_.len));
        let different = this.mulFunc(this.subFunc(b, a), random_);
        return this.addFunc(different, a);
      };
    }

    getInfo() {
      return {
        id: "qxsckbignumber",
        name: Scratch.translate("Big Number"),
        color1: "#ff8c3b",
        blocks: [
          {
            blockType: "label",
            text: Scratch.translate("🗂️Setting"),
          },
          {
            opcode: "setPrecision",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set max precision is [NUM]"),
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "100",
              },
            },
          },
          {
            blockType: "label",
            text: Scratch.translate("📏Arithmetic"),
          },
          {
            opcode: "add",
            blockType: Scratch.BlockType.REPORTER,
            text: "[NUM] + [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.2",
              },
            },
          },
          {
            opcode: "sub",
            blockType: Scratch.BlockType.REPORTER,
            text: "[NUM] - [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.2",
              },
            },
          },
          {
            opcode: "mul",
            blockType: Scratch.BlockType.REPORTER,
            text: "[NUM] * [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.2",
              },
            },
          },
          {
            opcode: "div",
            blockType: Scratch.BlockType.REPORTER,
            text: "[NUM] / [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.3",
              },
            },
          },
          {
            opcode: "pow",
            blockType: Scratch.BlockType.REPORTER,
            text: "[NUM] ** [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "2",
              },
            },
          },
          {
            opcode: "mod",
            blockType: Scratch.BlockType.REPORTER,
            text: "[NUM] % [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.3",
              },
            },
          },
          {
            blockType: "label",
            text: Scratch.translate("🔎Logic"),
          },
          {
            opcode: "lt",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[NUM] < [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.2",
              },
            },
          },
          {
            opcode: "le",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[NUM] ≤ [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.2",
              },
            },
          },
          {
            opcode: "gt",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[NUM] > [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.2",
              },
            },
          },
          {
            opcode: "ge",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[NUM] ≥ [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.2",
              },
            },
          },
          {
            opcode: "eq",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[NUM] = [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.2",
              },
            },
          },
          {
            opcode: "neq",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[NUM] ≠ [NUM2]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.2",
              },
            },
          },
          {
            blockType: "label",
            text: Scratch.translate("🧪Math"),
          },
          {
            opcode: "unaryOper",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[OPER] of [NUM]"),
            arguments: {
              OPER: {
                type: Scratch.ArgumentType.STRING,
                menu: "unaryOper.List",
              },
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "-0.1",
              },
            },
          },
          {
            opcode: "binaryOper",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[OPER] of [NUM] and [NUM2]"),
            arguments: {
              OPER: {
                type: Scratch.ArgumentType.STRING,
                menu: "binaryOper.List",
              },
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "-0.1",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.1",
              },
            },
          },
          {
            opcode: "round",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("round [NUM] to [NUM2] decimal places"),
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "123.45",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
            },
          },
          {
            opcode: "random",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("pick random [NUM] to [NUM2]"),
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.999",
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1.001",
              },
            },
          },
        ],
        menus: {
          "unaryOper.List": {
            items: ["abs", "ceil", "floor", "trunc"],
          },
          "binaryOper.List": {
            items: ["max", "min"],
          },
        },
      };
    }

    replaceString(str, str2, index) {
      return str.slice(0, index) + str2 + str.slice(index + 1);
    }

    setPrecision(args) {
      let num = Number(args.NUM);
      num = Math.trunc(num);
      if (num < 0) num = 0;
      this.maxPrecision = num;
    }

    add(args) {
      return this.addFunc(args.NUM, args.NUM2);
    }
    sub(args) {
      return this.subFunc(args.NUM, args.NUM2);
    }
    mul(args) {
      return this.mulFunc(args.NUM, args.NUM2);
    }
    div(args) {
      return this.divFunc(args.NUM, args.NUM2);
    }
    pow(args) {
      return this.powFunc(args.NUM, args.NUM2);
    }
    mod(args) {
      return this.modFunc(args.NUM, args.NUM2);
    }

    lt(args) {
      let { num: a, num2: b } = this.toSamePer(args.NUM, args.NUM2);
      return a.num < b.num;
    }
    le(args) {
      let { num: a, num2: b } = this.toSamePer(args.NUM, args.NUM2);
      return a.num <= b.num;
    }
    gt(args) {
      let { num: a, num2: b } = this.toSamePer(args.NUM, args.NUM2);
      return a.num > b.num;
    }
    ge(args) {
      let { num: a, num2: b } = this.toSamePer(args.NUM, args.NUM2);
      return a.num >= b.num;
    }
    eq(args) {
      let { num: a, num2: b } = this.toSamePer(args.NUM, args.NUM2);
      return a.num === b.num;
    }
    neq(args) {
      let { num: a, num2: b } = this.toSamePer(args.NUM, args.NUM2);
      return a.num !== b.num;
    }

    unaryOper(args) {
      let oper = args.OPER,
        str = String(args.NUM);
      switch (oper) {
        case "abs":
          return str.replace("-", "");
        case "ceil":
          if (str.indexOf("-") !== -1) {
            if (str.indexOf(".") !== -1)
              str = this.replaceString(str, "0", str.indexOf(".") + 1);
            return this.roundFunc(str, 0);
          } else {
            if (str.indexOf(".") !== -1)
              str = this.replaceString(str, "9", str.indexOf(".") + 1);
            return this.roundFunc(str, 0);
          }
        case "floor":
          if (str.indexOf("-") !== -1) {
            if (str.indexOf(".") !== -1)
              str = this.replaceString(str, "9", str.indexOf(".") + 1);
            return this.roundFunc(str, 0);
          } else {
            if (str.indexOf(".") !== -1)
              str = this.replaceString(str, "0", str.indexOf(".") + 1);
            return this.roundFunc(str, 0);
          }
        case "trunc":
          if (str.indexOf(".") !== -1)
            str = this.replaceString(str, "0", str.indexOf(".") + 1);
          return this.roundFunc(str, 0);
      }
    }
    binaryOper(args) {
      let oper = args.OPER,
        str = String(args.NUM),
        str2 = String(args.NUM2),
        a,
        b;
      switch (oper) {
        case "max":
          ({ num: a, num2: b } = this.toSamePer(str, str2));
          return a.num < b.num ? str2 : str;
        case "min":
          ({ num: a, num2: b } = this.toSamePer(str, str2));
          return a.num > b.num ? str2 : str;
      }
    }
    round(args) {
      return this.roundFunc(args.NUM, args.NUM2);
    }
    random(args) {
      return this.randomFunc(args.NUM, args.NUM2);
    }
  }
  Scratch.extensions.register(new bigNumber());
})(Scratch);
