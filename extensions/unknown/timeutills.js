// Name: time utills
// ID: unknowntimeutils
// Description: utilities for time 
// By: unknown07724
// License: MIT


class timeutills {
  getInfo() {
    return {
      id: 'unknowntimeutills',
      name: 'timeutills',
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
