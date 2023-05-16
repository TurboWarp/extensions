(Scratch => {
  'use strict';

  const cast = Scratch.Cast;

  const bases = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36'];
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  class ScratchBase {

    getInfo() {

      return {

        id: 'truefantombase',
        name: 'Base',

        color1: '#e200ca',

        blocks: [
          {
            opcode: 'is_base_block',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is base [B] [A] ?',
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '10'
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                menu: 'base_menu',
                defaultValue: '10'
              }
            }
          },
          {
            opcode: 'base_block',
            blockType: Scratch.BlockType.REPORTER,
            text: '[A] from base [B] to base [C]',
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '10'
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                menu: 'base_menu',
                defaultValue: '10'
              },
              C: {
                type: Scratch.ArgumentType.STRING,
                menu: 'base_menu'
              }
            }
          }
        ],
        menus: {
          base_menu: {
            acceptReporters: true,
            items: bases
          }
        }
      };
    }

    is_base_block({A, B}) {
      if (bases.includes(cast.toString(B))) {
        return new RegExp('^[' + chars.substring(0, cast.toNumber(B)) + ']+$').test(cast.toString(A));
      }
      return false;
    }
    base_block({A, B, C}) {
      if (bases.includes(cast.toString(B)) && bases.includes(cast.toString(C))) {
        if (new RegExp('^[' + chars.substring(0, cast.toNumber(B)) + ']+$').test(cast.toString(A))) {
          return parseInt(cast.toString(A), cast.toNumber(B)).toString(cast.toNumber(C)).toUpperCase() || '0';
        }
      }
      return '0';
    }
  }

  Scratch.extensions.register(new ScratchBase());
})(Scratch);
