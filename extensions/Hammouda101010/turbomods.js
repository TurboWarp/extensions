(function(Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('Extension Name must run unsandboxed');
      }

      const vm = Scratch.vm;
      const runtime = vm.runtime;
      const Cast = Scratch.Cast;

      const BlockType = Scratch.BlockType;
      const ArgumentType = Scratch.ArgumentType;

    class MyExtension {
      getInfo () {
        return {
            id: "turbomods",
            name: "TurboModz",
            blocks: [
                {
                    opcode: "newMod",
                    blockType: BlockType.COMMAND,
                    text: "create mode named [NAME]",
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "foobar mod"
                        }
                    }
                }
            ]
        };
      }
    }
    Scratch.extensions.register(new MyExtension());
  })(Scratch);