// Name: Integers
// ID: integers
// Description: Blocks for dealing, with and using large, or small integers.
// By: _FN10_ (Xplate) <https://scratch.mit.edu/users/Xplate/>
// License: MPL-2.0

(function(Scratch) {
    'use strict';
    class Integers {
        getInfo() {
            return {
                id: "integers",
                name: "Integers",
                color1: "#03b300",
                color2: "#114d00",
                blocks: [
                    {
                    opcode: 'int',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Max Safe [MENU] Integer',
                    arguments: {
                        MENU: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'POS_NEG'
                        }
                    }
                },
                {
                    opcode: 'inf',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[MENU] Infinity',
                    arguments: {
                        MENU: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'POS_NEG'
                        }
                    }
                },
                {
                    opcode: 'nan',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Not A Number (NaN)',
                    disableMonitor: true
                },
                {
                    opcode: 'scitostring',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Scientific [INPUT] to Real Number',
                    arguments: {
                        INPUT: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 6.900042e7
                        }
                    }
                }
                ],
                menus: {
                    POS_NEG: {
                        acceptReporters: true,
                        items: [{
                                "text": "Positive",
                                "value": "pos"
                            },
                            {
                                "text": "Negitive",
                                "value": "neg"
                            }
                        ]
                    }
                }
            };
        }
        int(args) {
            //console.log(args.MENU)
            if (args.MENU === "pos") {
                return Number.MAX_VALUE;
            } else {
                return Number.MIN_VALUE;
            }
        }
        scitostring(args) {
            return (args.INPUT).toLocaleString('fullwide', {useGrouping:false});
        }
        inf(args) {
            //console.log(args.MENU)
            if (args.MENU === "pos") {
                return Number.POSITIVE_INFINITY;
            } else {
                return Number.NEGATIVE_INFINITY;
            }
        }
        nan() {
            return Number.NaN;
        }
    }

    Scratch.extensions.register(new Integers());
})(Scratch);
