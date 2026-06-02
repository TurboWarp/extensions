// Name: L+ Ratio
// ID: r3d5t0n3guylplusratio
// Description: Some mathematical constants because why not
// By: R3d5t0n3_GUY

(function (Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This extension must run unsandboxed');
  }
  
  class LPlusRatio {
    getInfo() {
      return {
        id: 'LPlusRatio',
        name: 'L+ Ratio',
        color1: '#1FBF5F',
        blocks: [
          {
            opcode: 'mathConstant',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "const [mathConst]"
            ),
            arguments: {
              mode: {
                type: Scratch.ArgumentType.STRING,
                menu: "lPlusRatioMenu"
              }
            }
          }
        ],
        menus: {
          lPlusRatioMenu: {
            items: [
              {
                text: "∞",
                value: "Infinity"
              },
              {
                text: "-∞",
                value: "-Infinity"
              },
              {
                text: "NaN",
                value: "NaN"
              },
              {
                text: "π",
                value: "Pi"
              },
              {
                text: "ℯ",
                value: "Euler's number"
              },
              {
                text: "φ",
                value: "golden ratio"
              },
              {
                text: "ℊ",
                value: "golden angle"
              },
              {
                text: "β",
                value: "Lévy's constant"
              },
              {
                text: "δ",
                value: "Erdõ-Tenenbaum-Ford constant"
              },
              {
                text: "μ",
                value: "Connective Constant for hexagonal lattice"
              },
              {
                text: "ρ",
                value: "plastic ratio"
              },
              {
                text: "σ",
                value: "silver ratio"
              },
              {
                text: "τ",
                value: "tau"
              },
              {
                text: "ψ",
                value: "supergolden ratio"
              },
            ]
          }
        }
      };
    }
    mathConstant({mathConst}) {
      switch (mathConst) {
        case "Infinity": return Infinity;
        case "-Infinity": return -Infinity;
        case "NaN": return NaN;
        case "Pi": return Math.PI;
        case "Euler's number": return Math.E;
        case "golden ratio": return Math.sqrt(1.25) + 0.5;
        case "golden angle": return 180 * (3 - Math.sqrt(5));
        case "Lévy's constant": return (Math.PI ** 2) / (12 * Math.LN2);
        case "Erdõ-Tenenbaum-Ford constant": return 1 - ((1 + Math.log(Math.log2)) / Math.log2);
        case "Connective Constant for hexagonal lattice": return Math.sqrt(2 + Math.SQRT2);
        case "plastic ratio": return Math.cbrt(0.5 + (Math.sqrt(69) / 2)) + Math.cbrt(0.5 - (Math.sqrt(69) / 2));
        case  "silver ratio": Math.SQRT2 + 1;
        case "tau": return 2 * Math.PI;
        case "supergolden ratio": return (1 + Math.cbrt((29 + (3 * Math.sqrt(93))) / 2) + Math.cbrt((29 - (3 * Math.sqrt(93))) / 2)) / 3;
        default: return;
      }
    }
  }

  Scratch.extensions.register(new LPlusRatio());
})(Scratch);