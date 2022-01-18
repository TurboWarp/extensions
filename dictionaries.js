var dicts = {};
class Dictionaries {
  getInfo () {
    return {
      id: "dictionaries",
      name: "Dictionaries",
      blocks: [
        {
          opcode: "create",
          blockType: Scratch.BlockType.COMMAND,
          text: "Create Dictionary [NAME]",
          arguments: {
            NAME: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "My Dictionary"
            }
          }
        },
        {
          opcode: "setItem",
          blockType: Scratch.BlockType.COMMAND,
          text: "Set Item [ITEM] In Dictionary [DictName] with value [VALUE]",
          arguments: {
            ITEM: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "My Item"
            },
            DictName: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "My Dictionary"
            },
            VALUE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "My Value"
            }
          }
        },
        {
          opcode: "getItem",
          blockType: Scratch.BlockType.REPORTER,
          text: "Get Item [ITEM] From Dictionary [DictName]",
          arguments: {
            ITEM: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "My Item"
            },
            DictName: {
              type:Scratch.ArgumentType.STRING,
              defaultValue: "My Dictionary"
            }
          }
        }
      ]
    };
  }

  create (args) {
    dicts[args.NAME] = {};
  }
  setItem (args) {
    if(args.DictName in dicts){
      dicts[args.DictName][args.ITEM] = args.VALUE;
    }
  }
  getItem (args) {
    if(args.DictName in dicts){
      return dicts[args.DictName][args.ITEM];
    }else return "NONE";
  }
}

Scratch.extensions.register(new Dictionaries());
