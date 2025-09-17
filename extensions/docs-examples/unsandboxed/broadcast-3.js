/* eslint-disable -- passing the linting step requires content not covered when this is introduced */

(function(Scratch) {
  'use strict';
  class Broadcast3 {
    getInfo() {
      return {
        id: 'broadcast3example',
        name: 'Broadcast Example 3',
        blocks: [
          {
            opcode: 'whenReceived',
            blockType: Scratch.BlockType.HAT,
            text: 'when I receive [EVENT_OPTION]',
            isEdgeActivated: false,
            // highlight-next-line
            shouldRestartExistingThreads: true,
            arguments: {
              EVENT_OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'EVENT_FIELD'
              }
            }
          },
          {
            opcode: 'broadcast',
            blockType: Scratch.BlockType.COMMAND,
            text: 'broadcast [EVENT]',
            arguments: {
              EVENT: {
                type: Scratch.ArgumentType.STRING,
                menu: 'EVENT_FIELD'
              }
            }
          }
        ],
        menus: {
          EVENT_FIELD: {
            acceptReporters: false,
            items: [
              'Event 1',
              'Event 2',
              'Event 3'
            ]
          }
        }
      };
    }
    broadcast({EVENT}, util) {
      util.startHats('broadcast3example_whenReceived', {
        EVENT_OPTION: EVENT
      });
    }
  }
  Scratch.extensions.register(new Broadcast3());
}(Scratch));
