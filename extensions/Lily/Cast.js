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
  }

  Scratch.extensions.register(new CastUtil());
})(Scratch);
