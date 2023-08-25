// From https://github.com/TurboWarp/scratch-vm/pull/141
(function (Scratch) {
    "use strict";

    class LoopsAndThings {
        getInfo() {
            return {
                id: "loopsAndThings",
                name: "Loops and things test",
                blocks: [
                    {
                        opcode: "conditional",
                        blockType: Scratch.BlockType.CONDITIONAL,
                        text: "run branch [BRANCH] of",
                        arguments: {
                            BRANCH: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        },
                        branchCount: 3
                    },
                    {
                        opcode: "loop",
                        blockType: Scratch.BlockType.LOOP,
                        text: "my repeat [TIMES]",
                        arguments: {
                            TIMES: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 10
                            }
                        },
                    },
                    '---',
                    {
                        opcode: "testPromise",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "return [VALUE] in a Promise",
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    }
                ]
            };
        }

        conditional({BRANCH}, util) {
            return Scratch.Cast.toNumber(BRANCH);
        }

        loop({TIMES}, util) {
            const times = Math.round(Scratch.Cast.toNumber(TIMES));
            if (typeof util.stackFrame.loopCounter === "undefined") {
                util.stackFrame.loopCounter = times;
            }
            util.stackFrame.loopCounter--;
            if (util.stackFrame.loopCounter >= 0) {
                return true;
            }
        }

        testPromise({VALUE}) {
            return Promise.resolve(VALUE);
        }
    }

    Scratch.extensions.register(new LoopsAndThings());
})(Scratch);