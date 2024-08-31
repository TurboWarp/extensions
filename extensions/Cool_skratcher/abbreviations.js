// Name: Number Abbiviation!
// ID: cool_abbreviate
// Description: Adds blocks to convert any big number to way less text like: 1200000 -> 1.2M.
// By: cool_skratcher <https://scratch.mit.edu/users/cool_skratcher/>
// License: MIT

(function (Scratch) {
  "use strict";

  class Abbreviation {
    getInfo() {
      return {
        id: "cool_abbreviate",
        name: "Abbreviation!",
        color1: "#9dd13d",
        color2: "#8fbe37",
        blocks: [
          {
            opcode: "abbriviate",
            blockType: Scratch.BlockType.REPORTER,
            text: "abbreviate: [NUM]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
              },
            },
          },
          {
            opcode: "unabbriviate",
            blockType: Scratch.BlockType.REPORTER,
            text: "un-abbreviate: [NUM]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "addabbriviated",
            blockType: Scratch.BlockType.REPORTER,
            text: "add abbreviated [NUM1] + [NUM2]",
            arguments: {
              NUM1: {
                type: Scratch.ArgumentType.STRING,
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "subabbriviated",
            blockType: Scratch.BlockType.REPORTER,
            text: "subtract abbreviated [NUM1] - [NUM2]",
            arguments: {
              NUM1: {
                type: Scratch.ArgumentType.STRING,
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "multiabbriviated",
            blockType: Scratch.BlockType.REPORTER,
            text: "multiply abbreviated [NUM1] * [NUM2]",
            arguments: {
              NUM1: {
                type: Scratch.ArgumentType.STRING,
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "divabbriviated",
            blockType: Scratch.BlockType.REPORTER,
            text: "divide abbreviated [NUM1] / [NUM2]",
            arguments: {
              NUM1: {
                type: Scratch.ArgumentType.STRING,
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "equalabbriviated",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is equal abbreviated [NUM1] = [NUM2]",
            arguments: {
              NUM1: {
                type: Scratch.ArgumentType.STRING,
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "moreabbriviated",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is greater abbreviated [NUM1] > [NUM2]",
            arguments: {
              NUM1: {
                type: Scratch.ArgumentType.STRING,
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "lessabbriviated",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is less abbreviated [NUM1] < [NUM2]",
            arguments: {
              NUM1: {
                type: Scratch.ArgumentType.STRING,
              },
              NUM2: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
        ],
      };
    }
    abbriviate(args) {
      return abbreviateNumber(args.NUM);
    }
    unabbriviate(args) {
      return unAbbreviateNumber(args.NUM);
    }
    addabbriviated(args) {
      return addAbbreviated(args.NUM1, args.NUM2);
    }
    subabbriviated(args) {
      return subtractAbbreviated(args.NUM1, args.NUM2);
    }
    multiabbriviated(args) {
      return multiplyAbbreviated(args.NUM1, args.NUM2);
    }
    divabbriviated(args) {
      return divideAbbreviated(args.NUM1, args.NUM2);
    }
    equalabbriviated(args) {
      if (compareAbbreviated(args.NUM1, args.NUM2) === 0) {
        return true;
      } else {
        return false;
      }
    }
    moreabbriviated(args) {
      if (compareAbbreviated(args.NUM1, args.NUM2) === 1) {
        return true;
      } else {
        return false;
      }
    }
    lessabbriviated(args) {
      if (compareAbbreviated(args.NUM1, args.NUM2) === -1) {
        return true;
      } else {
        return false;
      }
    }
  }

  function abbreviateNumber(number) {
    const suffixes = [
      "",
      "K",
      "M",
      "B",
      "T",
      "Q",
      "Qi",
      "Sx",
      "Sp",
      "Oc",
      "Nn",
      "Dc",
      "Ud",
      "Dd",
      "Td",
      "Qd",
      "Qid",
      "Sxd",
      "Spd",
      "Ocd",
      "Nnd",
      "Vg",
      "Uvg",
      "Dvg",
      "Tvg",
      "Qvg",
      "Qivg",
      "Sxvg",
      "Spvg",
      "Ocvg",
      "Nnvg",
      "Ce",
    ];

    if (Math.abs(number) < 1000) return number.toString();

    const suffixIndex = Math.floor(Math.log10(Math.abs(number)) / 3);
    if (suffixIndex >= suffixes.length) {
      return number.toExponential(1);
    }

    const abbreviatedNumber = (number / Math.pow(1000, suffixIndex)).toFixed(1);
    return `${abbreviatedNumber}${suffixes[suffixIndex]}`;
  }

  function unAbbreviateNumber(abbreviated) {
    const suffixes = {
      K: 1e3,
      M: 1e6,
      B: 1e9,
      T: 1e12,
      Q: 1e15,
      QI: 1e18,
      SX: 1e21,
      SP: 1e24,
      OC: 1e27,
      NN: 1e30,
      DC: 1e33,
      UD: 1e36,
      DD: 1e39,
      TD: 1e42,
      QD: 1e45,
      QID: 1e48,
      SXD: 1e51,
      SPD: 1e54,
      OCD: 1e57,
      NND: 1e60,
      VG: 1e63,
      UVG: 1e66,
      DVG: 1e69,
      TVG: 1e72,
      QVG: 1e75,
      QIVG: 1e78,
      SXVG: 1e81,
      SPVG: 1e84,
      OCVG: 1e87,
      NNVG: 1e90,
      CE: 1e303,
    };

    const regex = /^(-?\d+(\.\d+)?)([a-zA-Z]*)$/;
    const match = abbreviated.match(regex);

    if (!match) return NaN;

    const numberPart = parseFloat(match[1]);
    const suffix = match[3].toUpperCase();

    if (!suffix) return numberPart;

    const multiplier = suffixes[suffix];
    if (!multiplier) return NaN;

    return numberPart * multiplier;
  }

  function addAbbreviated(a, b) {
    const num1 = unAbbreviateNumber(a);
    const num2 = unAbbreviateNumber(b);
    if (isNaN(num1) || isNaN(num2)) return NaN;

    const sum = num1 + num2;
    return abbreviateNumber(sum);
  }

  function subtractAbbreviated(a, b) {
    const num1 = unAbbreviateNumber(a);
    const num2 = unAbbreviateNumber(b);
    if (isNaN(num1) || isNaN(num2)) return NaN;

    const difference = num1 - num2;
    return abbreviateNumber(difference);
  }

  function multiplyAbbreviated(a, b) {
    const num1 = unAbbreviateNumber(a);
    const num2 = unAbbreviateNumber(b);
    if (isNaN(num1) || isNaN(num2)) return NaN;

    const product = num1 * num2;
    return abbreviateNumber(product);
  }

  function divideAbbreviated(a, b) {
    const num1 = unAbbreviateNumber(a);
    const num2 = unAbbreviateNumber(b);
    if (isNaN(num1) || isNaN(num2) || num2 === 0) return NaN;

    const quotient = num1 / num2;
    return abbreviateNumber(quotient);
  }

  function compareAbbreviated(a, b) {
    const num1 = unAbbreviateNumber(a);
    const num2 = unAbbreviateNumber(b);
    if (isNaN(num1) || isNaN(num2)) return NaN;

    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
    return 0;
  }

  Scratch.extensions.register(new Abbreviation());
})(Scratch);
