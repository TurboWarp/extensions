// Name: L+ Ratio
// ID: r3d5t0n3guylplusratio
// Description: Some mathematical constants because why not
// By: R3d5t0n3_GUY <https://github.com/R3d5t0n3GUY>

(function (Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This extension must run unsandboxed');
  }
  
  class LPlusRatio {
    getInfo() {
      return {
        id: 'LPlusRatio',
        name: Scratch.translate('L+ Ratio'),
        color1:  '#59C059',
        blocks: [
          {
            opcode: 'mathConstant',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "const [mathConst]"
            ),
            disableMonitor: true,
            arguments: {
              mathConst: {
                type: Scratch.ArgumentType.SRING,
                menu: "mathConstMenu"
              }
            }
          }
        ],
        menus: {
          mathConstMenu: {
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
      return ((m) => { 
        switch (m) {
          case "Infinity": return Infinity;
          case "-Infinity": return -Infinity;
          case "NaN": return NaN;
          case "Pi": return Math.acos(-1);
          case "Euler's number": return Math.exp(1);
          case "golden ratio": return Math.sqrt(1.25) + 0.5;
          case "golden angle": return 180 * (3 - Math.sqrt(5));
          case "Lévy's constant": return (Math.acos(-1) ** 2) / (12 * Math.log(2));
          case "Erdõ-Tenenbaum-Ford constant": return 1 - ((1 + Math.log(Math.log(2))) / Math.log(2));
          case "Connective Constant for hexagonal lattice": return Math.sqrt(2 + Math.sqrt(2));
          case "plastic ratio": return Math.cbrt(0.5 + (Math.sqrt(69) / 18)) + Math.cbrt(0.5 - (Math.sqrt(69) / 18));
          case  "silver ratio": return Math.sqrt(2) + 1;
          case "tau": return 2 * Math.acos(-1);
          case "supergolden ratio": return (1 + Math.cbrt((29 + (3 * Math.sqrt(93))) / 2) + Math.cbrt((29 - (3 * Math.sqrt(93))) / 2)) / 3;
          default: return;
        }
      })(mathConst)
    }
  }

  Scratch.extensions.register(new LPlusRatio());
})(Scratch);