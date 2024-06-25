class timeutills {
  getInfo() {
    return {
      id: 'unknowntimeutills',
      name: 'timeutills',
      blocks: [
               {
          opcode: 'wait',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'wait [ONE] in milliseconds',
          arguments: {
            MS: {
              type: Scratch.ArgumentType.NUMBER
            }
          }
        }
      ]
    };
  }



  wait(args) {
    return new Promise(resolve => setTimeout(resolve, args.MS));
}

  hello() {
    return 'World!';
  }
}

Scratch.extensions.register(new HelloWorld());
