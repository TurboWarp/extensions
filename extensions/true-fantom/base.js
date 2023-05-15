(Scratch => {
  'use strict';

  const cast = Scratch.Cast;

  class ScratchBase {

    getInfo() {
      return {

        id: 'truefantombase',
        name: 'Base',

        color1: '#e200ca',

        blocks: [
          {
            opcode: 'base_block',
            blockType: Scratch.BlockType.REPORTER,
            text: '[A] from base [B] to base [C]',
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
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
            acceptReporters: false,
            items: ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36']
          }
        }
      };
    }

    base_block({A, B, C}) {
      return parseInt(cast.toNumber(A), cast.toNumber(B)).toString(cast.toNumber(C));
    }
  }

  Scratch.extensions.register(new ScratchBase());
})(Scratch);
