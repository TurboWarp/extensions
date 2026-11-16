/* eslint-disable -- passing the linting step requires content not covered when this is introduced */

(function(Scratch) {
  'use strict';
  class Broadcast4 {
    getInfo() {
      return {
        id: 'broadcast4example',
        name: 'Broadcast Example 4',
        blocks: [
          {
            opcode: 'whenReceived',
            blockType: Scratch.BlockType.HAT,
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
            blockType: Scratch.BlockType.COMMAND,
            text: 'broadcast [EVENT] in [TARGET]',
            arguments: {
              EVENT: {
                type: Scratch.ArgumentType.STRING,
                menu: 'EVENT_FIELD'
              },
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: 'TARGET_MENU'
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
          },
          TARGET_MENU: {
            acceptReporters: true,
            items: [
              'all sprites',
              'this sprite',
              'the stage'
            ]
          }
        }
      };
    }
    // highlight-start
    broadcast({EVENT, TARGET}, util) {
      const argumentFilter = {
        EVENT_OPTION: EVENT
      };

      let targetFilter = null;
      if (TARGET === 'this sprite') targetFilter = util.target;
      if (TARGET === 'the stage') targetFilter = util.runtime.getTargetForStage();

      util.startHats('broadcast4example_whenReceived', argumentFilter, targetFilter);
    }
    // highlight-end
  }
  Scratch.extensions.register(new Broadcast4());
}(Scratch));
