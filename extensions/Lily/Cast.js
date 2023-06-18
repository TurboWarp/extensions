(function (Scratch) {
  'use strict';

  const Cast = Scratch.Cast;

  class CastUtil {
    getInfo() {
      return {
        id: 'lmsCast',
        name: 'Cast',
        blocks: [
          {
            opcode: 'toType',
            blockType: Scratch.BlockType.REPORTER,
            text: 'cast [INPUT] to [TYPE]',
            isDynamic: true,
            output: null,
            disableMonitor: true,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'apple'
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'type'
              }
            }
          },
          {
            opcode: 'typeOf',
            blockType: Scratch.BlockType.REPORTER,
            text: 'type of [INPUT]',
            isDynamic: true,
            output: null,
            disableMonitor: true,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'apple'
              }
            }
          }
        ],
        menus: {
          type: {
            acceptReporters: true,
            items: ['number', 'string', 'boolean']
          }
        }
      };
    }

    toType(args) {
      const input = args.INPUT;
      switch (args.TYPE) {
        case ('number'): return Cast.toNumber(input);
        case ('string'): return Cast.toString(input);
        case ('boolean'): return Cast.toBoolean(input);
        default: return input;
      }
    }

    typeOf(args) {
      const input = args.INPUT;
      if (typeof input === 'number') return 'number';
      if (typeof input === 'string') return 'string';
      if (typeof input === 'boolean') return 'boolean';
      return '';
    }
  }

  Scratch.extensions.register(new CastUtil());
})(Scratch);
