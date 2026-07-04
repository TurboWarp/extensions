/* eslint-disable -- passing the linting step requires content not covered when this is introduced */

(function(Scratch) {
  'use strict';
  class EverySecond {
    getInfo() {
      return {
        id: 'everysecondexample',
        name: 'Every Second',
        blocks: [
          {
            opcode: 'everySecond',
            blockType: Scratch.BlockType.HAT,
            text: 'every second',
            isEdgeActivated: false
          }
        ]
      };
    }
  }
  // highlight-start
  setInterval(() => {
    const startedThreads = Scratch.vm.runtime.startHats('everysecondexample_everySecond');
  }, 1000);
  // highlight-end
  Scratch.extensions.register(new EverySecond());
}(Scratch));
