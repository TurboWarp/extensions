(function (Scratch) {
  "use strict";

  class AdditionalRoots {

    constructor(runtime) {
      this.runtime = runtime;
    }
    
    getInfo() {
      return {
        id: "happencustomroots",
        name: "Additional Roots!",
        blocks: [
          {
            opcode: "squareRoot",
            blockType: Scratch.BlockType.REPORTER,
            text: "square root of [num]",
            arguments: {
              num: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 9,
              },
            },
          },
          {
            opcode: "cubeRoot",
            blockType: Scratch.BlockType.REPORTER,
            text: "cube root of [num]",
            arguments: {
              num: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 8,
              },
            },
          },
          {
            opcode: "fourthRoot",
            blockType: Scratch.BlockType.REPORTER,
            text: "fourth root of [num]",
            arguments: {
              num: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 16,
              },
            },
          },
          {
            opcode: "fifthRoot",
            blockType: Scratch.BlockType.REPORTER,
            text: "fifth root of [num]",
            arguments: {
              num: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 32,
              },
            },
          },
          {
            opcode: "nthRoot",
            blockType: Scratch.BlockType.REPORTER,
            text: "[n] root of [nth]",
            arguments: {
              n: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 4,
              },
              nth: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
              },
            },
          },
        ]
      };
    }

    squareRoot(args) {
      return Math.sqrt(args.num);
    }
  
    cubeRoot(args) {
      return Math.cbrt(args.num);
    }
  
    fourthRoot(args) {
      return Math.pow(args.num, 1 / 4);
    }
  
    fifthRoot(args) {
      return Math.pow(args.num, 1 / 5);
    }
  
    nthRoot(args) {
      return Math.pow(args.n, 1 / args.nth);
    }
  }

  Scratch.extensions.register(new AdditionalRoots());
})(Scratch);
