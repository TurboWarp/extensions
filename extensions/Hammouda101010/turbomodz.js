// Name: TurboModz
// ID: hamturbomodz
// Description: Implement Mods into Your Projects. Inspired by Asset Manager and Other Extensions>
// By: Hammouda101010 <https://scratch.mit.edu/users/Hammouda101010/>
// License: MIT AND LGPL-3.0



(function(Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error("Turbomodz must run unsandboxed");
      }


      // Scratch Vm & APIs
      const vm = Scratch.vm;
      const runtime = vm.runtime;
      const Cast = Scratch.Cast;
      
      let mods = [] //Creates a List of Mods

      //Block & Argument Type Constants
      const BlockType = Scratch.BlockType;
      const ArgumentType = Scratch.ArgumentType;

      // Function That Creates New IDs
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


    class TurboModz {
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
                    opcode: "getMod",
                    blockType: BlockType.REPORTER,
                    text: "get mod called [NAME] as [TYPE]",
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "foobar mod"
                        },
                        TYPE: {
                          type: ArgumentType.STRING,
                          menu: "GET_TYPE_MENU"
                        }
                    }
                }
            ],
            menus:{
              GET_TYPE_MENU: {
                acceptReporters: false,
                items: [
                  "JSON",
                  "Text",
                  "Array"
                ]
              }
            } 
        };
      }
      
      //Creates a New Mod if it doesn't exist, otherwise send a warning.

      findMod(name) {
        let search = mods.find((mod) => mod.name === name);
        if (!search) {
            console.error(`Could Not Find "${name}"`)
            return `Could Not Find "${name}"`;
        }
        else {
            return search
        }
      }

      newMod(args) {
        if (!mods.some(mod => args.NAME === mod.name)){
            mods.push({name: args.NAME, id: newID(7)})
            console.log(mods)
        }
        else {
            console.warn("This Mod Already Exists")
        }
            
      }
      //gets a mod's json
      getMod(args){
        switch (args.TYPE) {
          case "JSON":
            return this.findMod(args.NAME)
          case "Text":
            return JSON.stringify(this.findMod(args.NAME))
          case "Array":
            return Object.values(this.findMod(args.NAME))
        }
      }
    }
    Scratch.extensions.register(new TurboModz());
  })(Scratch);