(function(Scratch) {
  'use strict';
  class StrictEqualityExtension {
    getInfo() {
      return {
        id: 'Comparisons',
        name: 'More Comparisons',
        color1: '#00a889',
        color2: '#1e8c76',
        color3: '#1e8c76',
        blocks: [
          {
            opcode: 'true',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'true',
            arguments: {}
          },
          {
            opcode: 'false',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'false',
            arguments: {},
          },
          {
            opcode: 'boolean',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
            }
          },
          {
            opcode: 'booleanToInt',
            blockType: Scratch.BlockType.REPORTER,
            text: '[a]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            }
          },
          '---',
          {
            opcode: 'equal',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] == [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'A'
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'a'
              },
            }
          },
          {
            opcode: 'equalNegative',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] =- [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '5'
              },
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '-5'
              },
            }
          },
          {
            opcode: 'equalPlusMinus',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] =± [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '5'
              },
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '-5'
              },
            }
          },
          {
            opcode: 'notEqual',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] ≠ [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '\n'
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '\n'
              },
            }
          },
          {
            opcode: 'almostEqual',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] ≈ [b] ± [c]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '5'
              },
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '6'
              },
              c: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1'
              },
            }
          },
          {
            opcode: 'xor',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] ^ [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              b: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            }
          },
          '---',
          {
            opcode: 'equalOrGreater',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] ≥ [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '\n'
              },
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '50'
              },
            }
          },
          {
            opcode: 'equalOrLess',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] ≤ [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '\n'
              },
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '50'
              },
            }
          },
          {
            opcode: 'between',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] < [b] < [c]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '\n'
              },
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '\n'
              },
              c: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '\n'
              },
            }
          },
          {
            opcode: 'betweenEqual',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] ≤ [b] ≤ [c]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '\n'
              },
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '\n'
              },
              c: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '\n'
              },
            }
          },
          '---',
          {
            opcode: 'vertical',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] ⊥ [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.ANGLE,
                defaultValue: '0'
              },
              b: {
                type: Scratch.ArgumentType.ANGLE,
                defaultValue: '90'
              },
            }
          },
        ]
      };
    }
    true(){
      return true;
    }
    false(){
      return false;
    }
    boolean(args){
      return Scratch.Cast.toBoolean(args.a);
    }
    booleanToInt(args){
      if (Scratch.Cast.toBoolean(args.a)) {
        return 1;
      }
      return 0;
    }
    equal(args) {
      return (args.a == args.b);
    }
    equalNegative(args) {
      if (isNaN(args.a) || isNaN(args.b)){
        return false;
      } else {
        return (args.a == (0 - args.b));
      }
    }
    equalPlusMinus(args) {
      if (isNaN(args.a) || isNaN(args.b)){
        return false;
      } else {
        return (args.a == (0 - args.b)) || (args.a == args.b);
      }
    }
    almostEqual(args) {
      return (Math.abs(args.a - args.b) <= args.c);
    }
    between(args) {
      return (args.a < args.b) && (args.b < args.c);
    }
    betweenEqual(args) {
      return (args.a <= args.b) && (args.b <= args.c);
    }
    notEqual(args){
      return (args.a != args.b);
    }
    xor(args){
      return Scratch.Cast.toBoolean(args.a) !== Scratch.Cast.toBoolean(args.b);
    }
    equalOrGreater(args) {
      return (args.a >= args.b);
    }
    equalOrLess(args) {
      return (args.a <= args.b);
    }
    vertical(args) {
      if (isNaN(args.a) || isNaN(args.b)){
        return false;
      } else {
        return ((args.a - (args.b - 90)) % 180) == 0;
      }
    }
  }
  Scratch.extensions.register(new StrictEqualityExtension());
})(Scratch);
