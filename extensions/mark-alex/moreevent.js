(function (Scratch) {
    'use strict';

    class Extension {
        events = {};
        lastvalue = null;
        getInfo() {
            return {
                id: 'alexMoreEvent',
                name: 'More Event',
                color1: '#ffaa00',
                color2: '#ad8f42',
                color3: '#73633c',
                blocks: [
                    {
                        opcode: 'broadcasttextevent',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Broadcast [Text] Event',
                        arguments: {
                            Text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "My Event"
                            }
                        }
                    },
                    {
                        opcode: 'ontextevent',
                        blockType: Scratch.BlockType.HAT,
                        text: 'On [Text] Event',
                        arguments: {
                            Text: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "My Event"
                            }
                        }
                    },
                    {
                        opcode: 'whentrue',
                        blockType: Scratch.BlockType.HAT,
                        text: 'When [Boolean]',
                        arguments: {
                            Boolean: {
                                type: Scratch.ArgumentType.BOOLEAN
                            }
                        }
                    },
                    {
                        opcode: 'whenfalse',
                        blockType: Scratch.BlockType.HAT,
                        text: 'When Not [Boolean]',
                        arguments: {
                            Boolean: {
                                type: Scratch.ArgumentType.BOOLEAN
                            }
                        }
                    },
                    {
                        opcode: 'whennumbermorethan',
                        blockType: Scratch.BlockType.HAT,
                        text: 'When [Value] > than [More]',
                        arguments: {
                            More: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 10
                            }
                        }
                    },
                    {
                        opcode: 'whennumberlessthan',
                        blockType: Scratch.BlockType.HAT,
                        text: 'When [Value] < than [More]',
                        arguments: {
                            More: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -10
                            }
                        }
                    },
                    {
                        opcode: 'whennumberequalthan',
                        blockType: Scratch.BlockType.HAT,
                        text: 'When [Value] Equal To [More]',
                        arguments: {
                            More: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 50
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'whenvaluechange',
                        blockType: Scratch.BlockType.HAT,
                        text: 'When [Value] Changed'
                    },
                    {
                        opcode: 'whenclick',
                        blockType: Scratch.BlockType.HAT,
                        text: 'When Click'
                    },
                    {
                        opcode: 'whenkeyboard',
                        blockType: Scratch.BlockType.HAT,
                        text: 'When [Key] Is Pressed',
                        arguments: {
                            Key: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'a'
                            }
                        }
                    },
                ]
            };
        }
        ontextevent(args) {
            if (!this.events[Scratch.Cast.toString(args.Text)]) return false;
            const on = this.events[Scratch.Cast.toString(args.Text)] === true;
            this.events[Scratch.Cast.toString(args.Text)] = false;
            return on;
        }
        broadcasttextevent(args) {
            this.events[Scratch.Cast.toString(args.Text)] = true;
        }
        whentrue(args) {
            return Scratch.Cast.toBoolean(args.Boolean);
        }
        whenfalse(args) {
            return !(Scratch.Cast.toBoolean(args.Boolean));
        }
        whennumbermorethan(args) {
            return Scratch.Cast.toNumber(args.Value) > Scratch.Cast.toNumber(args.More);
        }
        whennumberlessthan(args) {
            return Scratch.Cast.toNumber(args.Value) < Scratch.Cast.toNumber(args.More);
        }
        whennumberequalthan(args) {
            return Scratch.Cast.toNumber(args.Value) == Scratch.Cast.toNumber(args.More);
        }
        whenvaluechange(args) {
            if (args.Value !== this.lastvalue) {
                this.lastvalue = args.Value;
                return true;
            }
            return false;
        }
        whenclick(_, util) {
            return util.ioQuery('mouse', 'getIsDown');
        }
        whenkeyboard(args, util) {
            return util.ioQuery('keyboard', 'getKeyIsDown', [Scratch.Cast.toString(args.Key).toLowerCase()]);
        }
    }

    Scratch.extensions.register(new Extension());
})(Scratch);
