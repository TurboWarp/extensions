(function(Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('Extension Name must run unsandboxed');
      }

      const vm = Scratch.vm;
      const runtime = vm.runtime;
      const Cast = Scratch.Cast;
      
      let mods = []

      const BlockType = Scratch.BlockType;
      const ArgumentType = Scratch.ArgumentType;

      const newID = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
        }
        return result;
      }


    class MyExtension {
      getInfo () {
        return {
            id: "turbomods",
            name: "TurboModz",
            blocks: [
                {
                  opcode: "newMod",
                  blockType: BlockType.COMMAND,
                  text: "create new mod called [NAME]",
                  arguments: {
                      NAME: {
                          type: ArgumentType.STRING,
                          defaultValue: "foobar mod"
                      }
                  }
                },
                {
                    opcode: "findMod",
                    blockType: BlockType.REPORTER,
                    text: "find mod called [NAME]",
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
      newMod(args) {
        mods.push({modname: args.NAME, modid: newID(5)})
        console.log(mods)
      }
      findMod(args){
        let search = mods.find((mod) => mod.name === args.NAME);
        return search;
      }
    }
    Scratch.extensions.register(new MyExtension());
  })(Scratch);