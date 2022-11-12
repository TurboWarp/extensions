(function(Scratch) {
  'use strict';

  class Bitwise {
    getInfo() {
      return {
        id: 'Bitwise',
        name: 'Bitwise',
        color1: '#2dc4c4',
        color2: '#2dc4b3',
        color3: '#29a395',
        blocks: [
          {
            opcode: 'bitwiseLeftShift',
            blockType: Scratch.BlockType.REPORTER,
            text: '[LEFT] << [RIGHT]',
            arguments: {
              LEFT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '2'
              },
              RIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1'
              }
            }
          },
          {
            opcode: 'bitwiseRightShift',
            blockType: Scratch.BlockType.REPORTER,
            text: '[LEFT] >> [RIGHT]',
            arguments: {
              LEFT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '2'
              },
              RIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1'
              }
            }
          },
          {
            opcode: 'bitwiseAnd',
            blockType: Scratch.BlockType.REPORTER,
            text: '[LEFT] & [RIGHT]',
            arguments: {
              LEFT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '3'
              },
              RIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1'
              }
            }
          },
          {
            opcode: 'bitwiseOr',
            blockType: Scratch.BlockType.REPORTER,
            text: '[LEFT] | [RIGHT]',
            arguments: {
              LEFT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1'
              },
              RIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '0'
              }
            }
          },
          {
            opcode: 'bitwiseXor',
            blockType: Scratch.BlockType.REPORTER,
            text: '[LEFT] ^ [RIGHT]',
            arguments: {
              LEFT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1'
              },
              RIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1'
              }
            }
          }
        ]
      };
    }

    bitwiseLeftShift({ LEFT, RIGHT }) {
      return LEFT << RIGHT;
    }

    bitwiseRightShift({ LEFT, RIGHT }) {
      return LEFT >> RIGHT;
    }

    bitwiseAnd({ LEFT, RIGHT }) {
      return LEFT & RIGHT;
    }

    bitwiseOr({ LEFT, RIGHT }) {
      return LEFT | RIGHT;
    }

    bitwiseXor({ LEFT, RIGHT }) {
      return LEFT ^ RIGHT;
    }
  }

  Scratch.extensions.register(new Bitwise());
})(Scratch);
