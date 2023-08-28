// Name: Additional Roots
// ID: additionalroots
// Description: A collection of new additional roots for your enjoyment.
// By: -happen3-
// Original: -happen3-

(function (Scratch) {

    function AdditionalRoots(runtime) {

        'use strict';

        this.runtime = runtime;

    }

    AdditionalRoots.prototype.getInfo = function () {
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
                            defaultValue: 9
                        }
                    }
                },
                {
                    opcode: 'cubeRoot',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'cube root of [num]',
                    arguments: {
                        num: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 8
                        }
                    }
                },
                {
                    opcode: 'fourthRoot',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'fourth root of [num]',
                    arguments: {
                        num: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 16
                        }
                    }
                },
                {
                    opcode: 'fifthRoot',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'fifth root of [num]',
                    arguments: {
                        num: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 32
                        }
                    }
                },
                {
                    opcode: 'nthRoot',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[n] to the power of 1/[nth]',
                    arguments: {
                        n: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 4
                        },
                        nth: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 2
                        }
                    }
                }
            ],
            menus: {},
            displayName: 'Additional Roots!'
        };
    };

    AdditionalRoots.prototype.squareRoot = function (args) {
        return Math.sqrt(args.num);
    };

    AdditionalRoots.prototype.cubeRoot = function (args) {
        return Math.cbrt(args.num);
    };

    AdditionalRoots.prototype.fourthRoot = function (args) {
        return Math.pow(args.num, 1 / 4);
    };

    AdditionalRoots.prototype.fifthRoot = function (args) {
        return Math.pow(args.num, 1 / 5);
    };

    AdditionalRoots.prototype.nthRoot = function (args) {
        return Math.pow(args.n, 1 / args.nth);
    };

    const extensionInstance = new AdditionalRoots(window.vm.extensionManager.runtime);
    const serviceName = window.vm.extensionManager._registerInternalExtension(extensionInstance);
    window.vm.extensionManager._loadedExtensions.set(extensionInstance.getInfo().id, serviceName);

})(Scratch);
