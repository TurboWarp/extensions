(function(Scratch) {
  'use strict';
  const vm = Scratch.vm;
  class Broadcast2 {
    getInfo() {
      return {
        id: 'broadcast2example',
        name: 'Broadcast Example 2',
        blocks: [
          {
            opcode: 'whenReceived',
            blockType: Scratch.BlockType.HAT,
            text: 'when I receive [EVENT_OPTION]',
            isEdgeActivated: false,
            // highlight-start
            arguments: {
              EVENT_OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'EVENT_FIELD'
              }
            }
            // highlight-end
          },
          {
            opcode: 'broadcast',
            blockType: Scratch.BlockType.COMMAND,
            text: 'broadcast [EVENT]',
            // highlight-start
            arguments: {
              EVENT: {
                type: Scratch.ArgumentType.STRING,
                menu: 'EVENT_FIELD'
              }
            }
            // highlight-end
          },
          {
            opcode: 'broadcastAll',
            blockType: Scratch.BlockType.COMMAND,
            text: 'broadcast all',
          }
        ],
        menus: {
          EVENT_FIELD: {
            // highlight-next-line
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
    // highlight-start
    broadcast({EVENT}) {
      vm.runtime.startHats('broadcast2example_whenReceived', {
        EVENT_OPTION: EVENT
      });
    }
    broadcastAll() {
      vm.runtime.startHats('broadcast2example_whenReceived');
    }
    // highlight-end
  }
  Scratch.extensions.register(new Broadcast2());
}(Scratch));
