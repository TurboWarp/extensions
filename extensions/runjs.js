//Run JS
(function(Scratch) {
  'use strict';
  class JSExtension {
  getInfo() {
  return {
      id: 'js',
      name: 'JS',
      blocks: [
        {
          opcode: 'runJS',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Execute [ONE] With the Paramater [TWO]',
          arguments: {
            ONE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'alert'
            },
            TWO: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'hello!'
            }
          }
        }
      ]
    };
  }
  runJS(args){
	if(args.ONE != "eval"){ //make shure no eval
		// function name and parameters to pass
		var fnstring = args.ONE;
		var fnparams = [args.TWO];

		// find object
		var fn = window[fnstring];

		// is object a function?
		if (typeof fn === "function") fn.apply(null, fnparams);
	}
  };
}

  Scratch.extensions.register(new JSExtension());
})(Scratch);
