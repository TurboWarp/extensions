/* eslint-disable -- passing the linting step requires content not covered when this is introduced */

(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This Hello World example must run unsandboxed');
  }

  class HelloWorld {
    getInfo() {
      return {
        id: 'helloworldunsandboxed',
        name: 'Unsandboxed Hello World',
        blocks: [
          {
            opcode: 'hello',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Hello!'
          }
        ]
      };
    }
    hello() {
      return 'World!';
    }
  }
  Scratch.extensions.register(new HelloWorld());
})(Scratch);
