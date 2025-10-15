// Name: Transformations
// ID: gvyoutubetransformations
// Description: Allows sprites to move with transformations (Rotation, reflection, translation).
// By: GvYoutube <https://scratch.mit.edu/users/GvYoutube/>
// License: MIT
// Tags: math graphics new

(function (Scratch) {
    'use strict';

    class Transformations {
        getInfo() {
            return {
                id: 'gvyoutubetransformations',
                name: Scratch.translate('Transform'),
                color1: '#8B0000',
                blocks: [
                    {
                        opcode: 'translateSprite',
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate('translate [DIRECTION] by [STEPS] units'),
                        arguments: {
                            DIRECTION: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'translationMenu'
                            },
                            STEPS: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 50
                            }
                        }
                    },
                    {
                        opcode: 'rotateSprite',
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate('rotate [DIRECTION] by [DEGREES] degrees'),
                        arguments: {
                            DIRECTION: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'rotationMenu'
                            },
                            DEGREES: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 90
                            }
                        }
                    },
                    {
                        opcode: 'reflectSprite',
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate('reflect across [AXIS]'),
                        arguments: {
                            AXIS: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'axisMenu'
                            }
                        }
                    }
                ],
                menus: {
                    translationMenu: {
                        acceptReporters: true,
                        items: ['right', 'left', 'up', 'down']
                    },
                    rotationMenu: {
                        acceptReporters: true,
                        items: ['clockwise', 'counter-clockwise']
                    },
                    axisMenu: {
                        acceptReporters: true,
                        items: ['x-axis', 'y-axis']
                    }
                }
            };
        }

        translateSprite(args, util) {
            const direction = args.DIRECTION;
            const steps = args.STEPS;
            const target = util.target;

            switch (direction) {
                case 'right':
                    target.setXY(target.x + steps, target.y);
                    break;
                case 'left':
                    target.setXY(target.x - steps, target.y);
                    break;
                case 'up':
                    target.setXY(target.x, target.y + steps);
                    break;
                case 'down':
                    target.setXY(target.x, target.y - steps);
                    break;
            }
        }

        rotateSprite(args, util) {
            const direction = args.DIRECTION;
            const degrees = args.DEGREES;
            const target = util.target;

            if (direction === 'clockwise') {
                target.setDirection(target.direction + degrees);
            } else if (direction === 'counter-clockwise') {
                target.setDirection(target.direction - degrees);
            }
        }

        reflectSprite(args, util) {
            const axis = args.AXIS;
            const target = util.target;

            if (axis === 'x-axis') {
                target.setXY(target.x, target.y * -1);
            } else if (axis === 'y-axis') {
                target.setXY(target.x * -1, target.y);
            }
        }
    }

    Scratch.extensions.register(new Transformations());
})(Scratch);
