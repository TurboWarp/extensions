(function(Scratch) {
  'use strict';
  class JSExtension {
  getInfo() {
  return {
      id: 'js', // change this if you make an actual extension!
      name: 'JS',
      blocks: [
        {
          opcode: 'runJS',
          blockType: Scratch.BlockType.COMMAND,
          text: '[ONE]',
          arguments: {
            ONE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'alert("hello!");'
            }
          }
        }
      ]
    };
  }
  runJS(args){
	eval(args.ONE);
  };
}

  Scratch.extensions.register(new JSExtension());
})(Scratch);
