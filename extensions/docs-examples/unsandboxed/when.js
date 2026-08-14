/* eslint-disable -- passing the linting step requires content not covered when this is introduced */

(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This example must run unsandboxed');
  }

  class When {
    getInfo() {
      return {
        id: 'whenunsandboxed',
        name: 'When',
        blocks: [
          {
            // highlight-start
            blockType: Scratch.BlockType.HAT,
            opcode: 'when',
            text: 'when [CONDITION]',
            isEdgeActivated: false, // required boilerplate
            arguments: {
              CONDITION: {
                type: Scratch.BlockType.BOOLEAN
              }
            }
            // highlight-end
          }
        ]
      };
    }
    // highlight-start
    when(args) {
      return Scratch.Cast.toBoolean(args.CONDITION);
    }
    // highlight-end
  }

  // highlight-start
  Scratch.vm.runtime.on('BEFORE_EXECUTE', () => {
    // startHats is the same as before!
    Scratch.vm.runtime.startHats('whenunsandboxed_when');
  });
  // highlight-end

  Scratch.extensions.register(new When());
})(Scratch);
