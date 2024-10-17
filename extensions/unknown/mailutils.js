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
              email: {
                type: Scratch.ArgumentType.STRING
              },
            }
          },
          {
            opcode: 'mailprovider',
            blockType: Scratch.BlockType.REPORTER,
            text: 'mail provider of [email]',
            arguments: {
              email: {
                type: Scratch.ArgumentType.STRING
              },
            }
          }
        ]
      };
    }
  
    mailto(args) {
      window.location.href = ("mailto:" + args.email);
    }
  }
  function mailProvider(args) { 
    if (args.email.includes("@protonmail.com") || args.email.includes("@proton.me")) {
        return "proton.me";
    } else if (args.email.includes("@gmail.com")) {
        return "gmail";
    } else {
        return "unknown";
    }
}

  Scratch.extensions.register(new Mailutils());
