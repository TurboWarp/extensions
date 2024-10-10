(function(Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error("Turbomodz must run unsandboxed");
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
        if (!mods.some(mod => args.NAME === mod.name)){
            mods.push({name: args.NAME, id: newID(7)})
            console.log(mods)
        }
        else {
            console.warn("This Mod Already Exists")
        }
            console.log(mods)
      }
      findMod(args){
        let search = mods.find((mod) => mod.name === args.NAME);
        if (!search) {
            console.error(`Could Not Find "${args.NAME}"`)
            return `Could Not Find "${args.NAME}"`;
        }
        else {
            return `name: ${search.name}, id: ${search.id}`
        }
      }
    }
    Scratch.extensions.register(new MyExtension());
  })(Scratch);