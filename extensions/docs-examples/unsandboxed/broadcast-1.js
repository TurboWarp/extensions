(function(Scratch) {
  'use strict';
  const vm = Scratch.vm;
  class Broadcast1 {
    getInfo() {
      return {
        id: 'broadcast1example',
        name: 'Broadcast Example 1',
        blocks: [
          {
            opcode: 'whenReceived',
            // highlight-start
            blockType: Scratch.BlockType.HAT,
            text: 'when I receive the event',
            isEdgeActivated: false
            // highlight-end
          },
          {
            opcode: 'broadcast',
            blockType: Scratch.BlockType.COMMAND,
            text: 'broadcast the event'
          }
        ]
      };
    }
    // highlight-start
    broadcast() {
      vm.runtime.startHats('broadcast1example_whenReceived');
    }
    // highlight-end
  }
  Scratch.extensions.register(new Broadcast1());
}(Scratch));
