(function(Scratch) {
  'use strict';
  class Test {
    getInfo() {
      return {
        id: 'testlabel',
        name: 'Label',
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'test 123 :) <>&%"'
          }
        ]
      };
    }
  }
  Scratch.extensions.register(new Test());
})(Scratch);
