class Mailutils {
    getInfo() {
      return {
        id: 'Unknownmail',
        name: 'Mailutils',
        blocks: [
          {
            opcode: 'mailto',
            blockType: Scratch.BlockType.COMMAND,
            text: 'mail to [email]',
            arguments: {
              str: {
                type: Scratch.ArgumentType.STRING
              },
            }
          }
        ]
      };
    }
  
    mailto(args) {
      window.location.href = ("mailto:" + args.str);
    }
  }
  Scratch.extensions.register(new Mailutils());
