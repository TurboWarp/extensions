/* eslint-disable -- passing the linting step requires content not covered when this is introduced */

(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This example must run unsandboxed');
  }

  class WhenKeyPressed {
    getInfo() {
      return {
        id: 'eventexample2unsandboxed',
        name: 'Event Block Example 2',
        blocks: [
          {
            blockType: Scratch.BlockType.EVENT,
            opcode: 'whenPressed',
            text: 'when [KEY] key pressed',
            isEdgeActivated: false, // required boilerplate
            // highlight-start
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                menu: 'key'
              }
            }
            // highlight-end
          }
        ],
        menus: {
          key: {
            acceptReporters: false,
            items: [
              {
                // startHats filters by *value*, not by text
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
    // highlight-start
    Scratch.vm.runtime.startHats('eventexample2unsandboxed_whenPressed', {
      KEY: e.key
    });
    // highlight-end
  });

  Scratch.extensions.register(new WhenKeyPressed());
})(Scratch);
