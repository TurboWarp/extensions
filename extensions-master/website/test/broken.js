(function(Scratch) {
  'use strict';

  class Broken {
    getInfo () {
      return {
        id: 'broken',
        name: 'Broken Extension',
        blocks: [
          {
            opcode: 'error',
            blockType: Scratch.BlockType.REPORTER,
            text: 'error'
          },
          {
            opcode: 'returnUndefined',
            blockType: Scratch.BlockType.REPORTER,
            text: 'return undefined'
          }
        ]
      };
    }
  
    error () {
      throw new Error("This is an error :(");
    }
    
    returnUndefined () {
      
    }
  }
  
  Scratch.extensions.register(new Broken());
})(Scratch);
