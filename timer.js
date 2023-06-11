(function (Scratch) {
    'use strict';
    const vm = Scratch.vm;

    let timer = {};

    class Moretimer {

        getInfo() {
            return {
                color1: "#7f7f7f",
                id: "timer",
                name: "more timer",
                blocks: [
                    {
                        opcode: "clear_all",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "clear all timer"
                    },
                    {
                        opcode: "clear",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "start or reset timer[T]",
                        arguments: {
                            T: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "mytimer",
                            }
                        }
                    },
                    {
                        opcode: "get",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "timer[T]",
                        arguments: {
                            T: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "mytimer",
                            }
                        }
                    }
                ]
            };
        }
        clear_all(args, util) {
            timer = {};
        }
        clear(args, util) {
            timer[args.T.toString()] = Date.now();
        }
        get(args, util) {
            return (Date.now() - timer[args.T.toString()]) / 1000;
        }
    }
    Scratch.extensions.register(new Moretimer());
})(Scratch);
