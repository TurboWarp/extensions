// Name: Additional Roots
// ID: additionalroots
// Description: A collection of new additional roots for your enjoyment.
// By: -happen3-
// Original: -happen3-

(function (Scratch) {class AdditionalRoots {

  'use strict';
  
  constructor(runtime) {
    this.runtime = runtime;
  }

  getInfo() {
    return {
      id: 'additionalroots',
      name: 'Additional Roots!',
      blocks: [
        {
          opcode: 'squareRoot',
          blockType: Scratch.BlockType.REPORTER,
          text: 'square root of [num]',
          arguments: {
            num: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 9,
            },
          },
        },
        {
          opcode: 'cubeRoot',
          blockType: Scratch.BlockType.REPORTER,
          text: 'cube root of [num]',
          arguments: {
            num: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 8,
            },
          },
        },
        {
          opcode: 'fourthRoot',
          blockType: Scratch.BlockType.REPORTER,
          text: 'fourth root of [num]',
          arguments: {
            num: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 16,
            },
          },
        },
        {
          opcode: 'fifthRoot',
          blockType: Scratch.BlockType.REPORTER,
          text: 'fifth root of [num]',
          arguments: {
            num: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 32,
            },
          },
        },
        {
          opcode: 'nthRoot',
          blockType: Scratch.BlockType.REPORTER,
          text: '[n] to the power of 1/[nth]',
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
      ],
      menus: {},
      displayName: 'Additional Roots!',
    };
  }

  squareRoot({ num }) {
    return Math.sqrt(num);
  }

  cubeRoot({ num }) {
    return Math.cbrt(num);
  }

  fourthRoot({ num }) {
    return Math.pow(num, 1 / 4);
  }

  fifthRoot({ num }) {
    return Math.pow(num, 1 / 5);
  }

  nthRoot({ n, nth }) {
    return Math.pow(n, 1 / nth);
  }
}

(function() {
  const extensionInstance = new AdditionalRoots(window.vm.extensionManager.runtime);
  const serviceName = window.vm.extensionManager._registerInternalExtension(extensionInstance);
  window.vm.extensionManager._loadedExtensions.set(extensionInstance.getInfo().id, serviceName);
})();
})(Scratch);

