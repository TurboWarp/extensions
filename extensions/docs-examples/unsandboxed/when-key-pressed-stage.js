/* eslint-disable -- passing the linting step requires content not covered when this is introduced */

(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This example must run unsandboxed');
  }

  class WhenKeyPressedInStage {
    getInfo() {
      return {
        id: 'eventexample3unsandboxed',
        name: 'Event Block Example 3',
        blocks: [
          {
            blockType: Scratch.BlockType.EVENT,
            opcode: 'whenPressed',
            text: 'when [KEY] key pressed',
            isEdgeActivated: false,
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
    Scratch.vm.runtime.startHats('eventexample3unsandboxed_whenPressed', {
      KEY: e.key
      // highlight-next-line
    }, Scratch.vm.runtime.getTargetForStage());
  });

  Scratch.extensions.register(new WhenKeyPressedInStage());
})(Scratch);
