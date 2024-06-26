// Name: Time utills
// ID: unknowntimeutills
// Description: utilities for time.
// By: Unknown <https://scratch.mit.edu/users/unknown07724/>
// Original: Unknown
// License: MPL-2.0


class timeutills {
  getInfo() {
    return {
      id: 'unknowntimeutills',
      name: 'time utills',
      blocks: [
               {
          opcode: 'wait',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'wait [MS] in milliseconds',
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


Scratch.extensions.register(new HelloWorld());
