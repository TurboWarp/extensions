/* eslint-disable -- passing the linting step requires content not covered when this is introduced */

(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This example must run unsandboxed');
  }

  class WhenSpaceKeyPressed {
    getInfo() {
      return {
        id: 'eventexampleunsandboxed',
        name: 'Event Block Example',
        blocks: [
          // highlight-start
          {
            blockType: Scratch.BlockType.EVENT,
            opcode: 'whenSpacePressed',
            text: 'when space key pressed',
            isEdgeActivated: false // required boilerplate
          }
          // highlight-end
        ]
      };
    }
    // Notice: whenSpacePressed does not have a function defined!
  }

  // highlight-start
  document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
      Scratch.vm.runtime.startHats('eventexampleunsandboxed_whenSpacePressed');
    }
  });
  // highlight-end

  Scratch.extensions.register(new WhenSpaceKeyPressed());
})(Scratch);
