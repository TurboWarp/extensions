(function(Scratch) {
    'use strict';
    class Dark {
      getInfo () {
        return {
          id: 'dark',
          name: 'Dark?',
          color1: '#192d50',
          blocks: [
            {
              opcode: 'dark',
              blockType: Scratch.BlockType.BOOLEAN,
              text: 'is Darkmode?',
              arguments: {}
            }
          ]
        };
      }
      dark () {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    }
    Scratch.extensions.register(new Dark());
  })(Scratch);
