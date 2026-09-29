// Name: Operators+
// ID: operatorsplus
// Description: Extra blocks for operators section.
// By: SoupManIsSus_5
// License: MPL-2.0
Scratch.Translate(
class OperatorsPlus {
  getInfo() {
    return {
      id: 'operatorsplus',
      name: 'Operators+',
      color1: '#00BFFF',
      color2: '#0099CC',
      color3: '#007A99',
      blocks: [
        // --- Original Blocks ---
        { 
          opcode: 'pi',
          blockType: Scratch.BlockType.REPORTER,
          disableMonitor: true, text: 'pi'
        },
        { 
          opcode: 'power',
          blockType: Scratch.BlockType.REPORTER,
          text: '[NUMBER] ^ [POWER]',
          arguments: {
            NUMBER: { 
              type: Scratch.ArgumentType.NUMBER, defaultValue: 10
            },
            POWER: {
              type: Scratch.ArgumentType.NUMBER, defaultValue: 2 } 
          } 
        },
        {
          opcode: 'SinAndCos',
          blockType: Scratch.BlockType.REPORTER,
          text: '[OPERATION] of [NUMBER]',
          arguments: {
            NUMBER: {
              type: Scratch.ArgumentType.NUMBER, defaultValue: 0
            },
            OPERATION: {
              type: Scratch.ArgumentType.STRING, menu: 'signsOfCosAndSinAndsoOn' 
            } 
          } 
        },
        { 
          opcode: 'strictEquality',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[text] strictly equals [strictText]',
          arguments: {
            text: { 
              type: Scratch.ArgumentType.STRING, defaultValue: 'apple'
            },
            strictText: {
              type: Scratch.ArgumentType.STRING, defaultValue: 'APPLE' 
            } 
          } 
        },
        { 
          opcode: 'replaceAll',
          blockType: Scratch.BlockType.REPORTER,
          text: 'replace all [text] in [original] with [replacementText]',
          arguments: {
            text: {
              type: Scratch.ArgumentType.STRING, defaultValue: 'apple' 
            },
            original: {
              type: Scratch.ArgumentType.STRING, defaultValue: 'apple banana apple' 
            },
            replacementText: {
              type: Scratch.ArgumentType.STRING, defaultValue: 'orange'
            } 
          } 
        },
        { 
          opcode: 'replace',
          blockType: Scratch.BlockType.REPORTER,
          text: 'replace [text] in [original] with [replacementText]',
          arguments: {
            text: {
              type: Scratch.ArgumentType.STRING, defaultValue: 'apple' 
            },
            original: {
              type: Scratch.ArgumentType.STRING, defaultValue: 'apple banana'
            },
            replacementText: {
              type: Scratch.ArgumentType.STRING, defaultValue: 'banana' }
          } 
        },
        { 
          opcode: 'convertCase',
          blockType: Scratch.BlockType.REPORTER,
          text: 'convert [TEXT] to [CASE]',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING, defaultValue: 'Hello World' 
            },
            CASE: {
              type: Scratch.ArgumentType.STRING, menu: 'caseMenu' 
            }
          } 
        },
        { 
          opcode: 'thRoot',
          blockType: Scratch.BlockType.REPORTER,
          text: '[ROOT] root of [VALUE]',
          arguments: {
            ROOT: {
              type: Scratch.ArgumentType.NUMBER, defaultValue: 2
            },
            VALUE: { 
              type: Scratch.ArgumentType.NUMBER, defaultValue: 9
            }
          } 
        },
        { 
          opcode: 'nearestDot',
          blockType: Scratch.BlockType.REPORTER,
          text: 'round [number] to the nearest [decimal]',
          arguments: {
            number: {
              type: Scratch.ArgumentType.NUMBER 
            },
            decimal: {
              type: Scratch.ArgumentType.STRING, menu: 'decimalPlaces' }
          } 
        },
        { 
          opcode: 'pointTowardsXY',
          blockType: Scratch.BlockType.COMMAND,
          text: 'point towards x: [X] y: [Y]',
          arguments: {
            X: {
              type: Scratch.ArgumentType.NUMBER, defaultValue: 0
            },
            Y: {
              type: Scratch.ArgumentType.NUMBER, defaultValue: 0
            } 
          } 
        },
        { 
          opcode: 'Isbetween',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'is [num] inbetween [min] and [max]?',
          arguments: {
            num: {
              type: Scratch.ArgumentType.NUMBER, defaultValue: 3 
            },
            min: {
              type: Scratch.ArgumentType.NUMBER, defaultValue: 1
            }, 
            max: {
              type: Scratch.ArgumentType.NUMBER, defaultValue: 5
            } 
          } 
        },
        { 
          opcode: 'equalities',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'is [num] [sign] [otherNum]',
          arguments: {
            num: {
              type: Scratch.ArgumentType.NUMBER, defaultValue: 0 
            },
            otherNum: {
              type: Scratch.ArgumentType.NUMBER, defaultValue: 0 
            },
            sign: {
              type: Scratch.ArgumentType.STRING, menu: 'inequalitys' 
            } 
          } 
        },
        { 
          opcode: 'occurencesIn',
          blockType: Scratch.BlockType.REPORTER,
          text: 'occurrences of [text] in [mainText]',
          arguments: {
            text: {
              type: Scratch.ArgumentType.STRING, defaultValue: 'apple' 
            },
            mainText: {
              type: Scratch.ArgumentType.STRING, defaultValue: 'apple banana apple'
            }
          } 
        },
        { 
          opcode: 'logBase',
          blockType: Scratch.BlockType.REPORTER,
          text: 'log base [BASE] of [VALUE]',
          arguments: {
            BASE: {
              type: Scratch.ArgumentType.NUMBER, defaultValue: 2
            },
            VALUE: {
              type: Scratch.ArgumentType.NUMBER, defaultValue: 8
            }
          } 
        },
        {
          opcode: 'waitTicks',
          blockType: Scratch.BlockType.COMMAND,
          text: 'wait [TICKS] in-game ticks',
          arguments: {
            TICKS: {
              type: Scratch.ArgumentType.NUMBER, defaultValue: 30
            }
          }
        }
      ],
      menus: {
        signsOfCosAndSinAndsoOn: { acceptReporters: false, items: ['cos', 'sin', 'tan', 'sqrt'] },
        caseMenu: { acceptReporters: false, items: ['uppercase', 'lowercase'] },
        decimalPlaces: { acceptReporters: true, items: ['1', '0', '-1', '-2', '-3'] },
        inequalitys: { acceptReporters: false, items: ['equal to', 'greater than', 'less than', 'greater than or equal to', 'less than or equal to'] }
      }
    };
  }
    pi() { return Math.PI; }
  
    power(args) {
      return Math.pow(args.NUMBER, args.POWER); 
    }
  
    SinAndCos(args) {
      const val = args.NUMBER;
      const operation = args.OPERATION;
      if (operation === 'sqrt') return Math.sqrt(val);
      const rad = val * (Math.PI / 180);
      switch (operation) {
        case 'cos': return Math.cos(rad);
        case 'sin': return Math.sin(rad);
        case 'tan': return Math.tan(rad);
        default: return 0;
      }
    }
  
    strictEquality(args) {
      return String(args.text) === String(args.strictText); }
  
    replaceAll(args) {
      return String(args.original).split(String(args.text)).join(String(args.replacementText)); 
    }
  
    replace(args) {
      return String(args.original).replace(String(args.text), String(args.replacementText)); 
    }
  
    convertCase(args) {
      const text = String(args.TEXT);
      return args.CASE === 'uppercase' ? text.toUpperCase() : text.toLowerCase();
    }
  
    thRoot(args) {
      const root = args.ROOT;
      const value = args.VALUE;
      if (root === 0) return 0;
      if (value < 0 && root % 2 !== 0) return -Math.pow(-value, 1 / root);
      return Math.pow(value, 1 / root);
    }
  
    nearestDot(args) {
      const num = args.number;
      const dec = Math.pow(10,parseFloat(args.decimal));
      if (dec === 0 || isNaN(d)) return Math.round(n);
      return Math.round(num / dec) * dec;
    }
  
    pointTowardsXY(args, util) {
      const dx = args.X - util.target.x;
      const dy = args.Y - util.target.y;
      if (dx === 0 && dy === 0) return;
      const radians = Math.atan2(dx, dy);
      util.target.setDirection(radians * (180 / Math.PI));
    }
  
    Isbetween(args) {
      const num = Number(args.num);
      const min = Number(args.min);
      const max = Number(args.max);
      return (num >= min && num <= max) || (num <= min && num >= max);
    }
  
    equalities(args) {
      const num = Number(args.num);
      const otherNum = Number(args.otherNum);
      switch (args.sign) {
        case 'equal to': return num === otherNum;
        case 'greater than': return num > otherNum;
        case 'less than': return num < otherNum;
        case 'greater than or equal to': return num >= otherNum;
        case 'less than or equal to': return num <= otherNum;
        default: return false;
      }
    }
  
    occurencesIn(args) {
      const mainText = String(args.mainText);
      const subText = String(args.text);
      if (!subText) return 0;
      return mainText.split(subText).length - 1;
    }
    logBase(args) {
      const base = Number(args.BASE);
      const value = Number(args.VALUE);
      if (base <= 0 || base === 1 || value <= 0){
        return NaN;
      }
      return Math.log(value) / Math.log(base);
    }
    var timerMs = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    async function runTimer(miliseconds) {
      await timerMs(miliseconds);
    };
    waitTicks(args){
      const ticks = Number(args.TICKS);
      runTimer(ticks*(1000/33));
    }
  }
}
)
Scratch.extensions.register(new OperatorsPlus());
