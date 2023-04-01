(function (Scratch) {
    'use strict';
    let args = ["", "", "",""];
    class RegularExpression {
        getInfo() {
            return {
                color1: '#0081d3',
                color2: '#0067a9',
                color3: '#0067a9',
                id: 'RegularExpression',
                name: 'Regular Expression',
                blocks: [
                    {
                        opcode: 'set',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set [one] [two] [three]',
                        arguments: {
                            one: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            two: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            three: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'matchText',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'matchText [flags]',
                        arguments: {
                            flags: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'flags'
                            }
                        }
                    },
                    {
                        opcode: 'searchText',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'searchText',
                    },
                    {
                        opcode: 'replaceText',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'replaceText',
                    }, '---',
                    {
                        opcode: 'matchTextWithPattern',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'match [pattern] in [text] - [flags]',
                        arguments: {
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            pattern: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            flags: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'flags'
                            }
                        }
                    },
                    {
                        opcode: 'searchTextWithPattern',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'search [pattern] in [text] ',
                        arguments: {
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            pattern: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'replaceTextWithPattern',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'replace [pattern] in [text] with [replacement]',
                        arguments: {
                            text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            pattern: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            replacement: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    }, '---',
                    {
                        opcode: 'constant',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[constant]',
                        arguments: {
                            constant: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'constant'
                            }
                        }
                    }, '---',
                    {
                        opcode: 'text',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'text',
                    },
                    {
                        opcode: 'pattern',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'pattern',
                    },
                    {
                        opcode: 'attach',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'attach',
                    }
                ],
                menus: {
                    flags: {
                        acceptReporters: false,
                        items: [
                            {
                                text: 'global（g）',
                                value: 'g'
                            },
                            {
                                text: 'ignore case（i）',
                                value: 'i'
                            }
                        ]
                    },
                    constant: {
                        acceptReporters: true,
                        items: [
                            {
                                text: 'english',
                                value: '[a-zA-Z]'
                            },
                            {
                                text: 'english uppercase',
                                value: '[A-Z]'
                            },
                            {
                                text: 'english lowercase',
                                value: '[a-z]'
                            },
                            {
                                text: 'number',
                                value: '[0-9]'
                            },
                            {
                                text: 'numeric integer',
                                value: '^-?[1-9]\d*$' // eslint-disable-line
                            },
                            {
                                text: 'positive integer',
                                value: '^[1-9]\d*$' // eslint-disable-line
                            },
                            {
                                text: 'negative integer',
                                value: '^-[1-9]\d*$' // eslint-disable-line
                            },
                            {
                                text: 'non-negative integers',
                                value: '^[1-9]\d*|0$' // eslint-disable-line
                            },
                            {
                                text: 'non-positive integer',
                                value: '^-[1-9]\d*|0$' // eslint-disable-line
                            },
                            {
                                text: 'chinese',
                                value: '[\u4e00-\u9fa5]'
                            },
                            {
                                text: 'double-byte',
                                value: '[^\x00-\xff]'
                            }
                        ]
                    }
                }
            };
        }
        set({ one, two, three }) {
            args[1] = one;
            args[2] = two;
            args[3] = three;
        }
        matchText({ flags }) {
            const regex = new RegExp(args[2], flags);
            return regex.test(args[1]);
        }
        searchText() {
            return args[1].toString().search(args[2].toString());
        }
        replaceText() {
            return args[1].toString().replace(args[2].toString(), args[3].toString());
        }

        matchTextWithPattern({ text, pattern, flags }) {
            const regex = new RegExp(pattern, flags);
            return regex.test(text);
        }
        searchTextWithPattern({ text, pattern }) {
            return text.toString().search(pattern.toString());
        }
        replaceTextWithPattern({ text, pattern, replacement }) {
            return text.toString().replace(pattern.toString(), replacement.toString());
        }

        constant({ constant }) {
            return constant;
        }

        text() {
            return args[1];
        }
        pattern() {
            return args[2];
        }
        attach() {
            return args[3];
        }
    }
    Scratch.extensions.register(new RegularExpression());
})(Scratch);
