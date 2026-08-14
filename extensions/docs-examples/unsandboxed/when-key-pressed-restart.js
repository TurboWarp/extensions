/* eslint-disable -- passing the linting step requires content not covered when this is introduced */

(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This example must run unsandboxed');
  }

  class WhenKeyPressed {
    getInfo() {
      return {
        id: 'restartexampleunsandboxed',
        name: 'Restart Threads Example',
        blocks: [
          {
            blockType: Scratch.BlockType.EVENT,
            opcode: 'whenPressed',
            text: 'when [KEY] key pressed',
            isEdgeActivated: false,
            // highlight-next-line
            shouldRestartExistingThreads: true,
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                menu: 'key'
              }
            }
          }
        ],
        menus: {
          key: {
            acceptReporters: false,
            items: [
              {
                text: 'space',
                value: ' '
              },
              'a',
              'b',
              'c',
              // ...
            ]
          }
        }
      };
    }
  }

  document.addEventListener('keydown', (e) => {
    Scratch.vm.runtime.startHats('restartexampleunsandboxed_whenPressed', {
      KEY: e.key
    });
  });

  Scratch.extensions.register(new WhenKeyPressed());
})(Scratch);
