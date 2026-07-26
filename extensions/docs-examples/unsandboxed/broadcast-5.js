/* eslint-disable -- passing the linting step requires content not covered when this is introduced */

(function(Scratch) {
  'use strict';
  class Broadcast5 {
    getInfo() {
      return {
        id: 'broadcast5example',
        name: 'Broadcast Example 5',
        blocks: [
          {
            opcode: 'whenReceived',
            blockType: Scratch.BlockType.EVENT,
            text: 'when I receive [EVENT_OPTION]',
            isEdgeActivated: false,
            arguments: {
              EVENT_OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'EVENT_FIELD'
              }
            }
          },
          {
            opcode: 'broadcast',
            blockType: Scratch.BlockType.REPORTER,
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
    broadcast({EVENT, TARGET}, util) {
      // highlight-start
      const threads = util.startHats('broadcast5example_whenReceived', {
        EVENT_OPTION: EVENT
      });
      return `Started ${threads.length} new threads!`;
      // highlight-end
    }
  }
  Scratch.extensions.register(new Broadcast5());
}(Scratch));
