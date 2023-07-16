(function (Scratch) {
    'use strict';

    const EasingMethods = [
        "linear",
        "sine",
        "quad",
        "cubic",
        "quart",
        "quint",
        "expo",
        "circ",
        "back",
        "elastic",
        "bounce"
    ];

    const BlockType = Scratch.BlockType;
    const ArgumentType = Scratch.ArgumentType;
    const Cast = Scratch.Cast;
    const vm = Scratch.vm;

    class Tween {
        getInfo() {
            return {
                id: 'jeremygamerTweening',
                name: 'Tweening',
                blocks: [
                    {
                        opcode: 'tweenValue',
                        text: '[MODE] ease [DIRECTION] [START] to [END] by [AMOUNT]%',
                        disableMonitor: true,
                        blockType: BlockType.REPORTER,
                        arguments: {
                            MODE: { type: ArgumentType.STRING, menu: 'modes' },
                            DIRECTION: { type: ArgumentType.STRING, menu: 'direction' },
                            START: { type: ArgumentType.NUMBER, defaultValue: 0 },
                            END: { type: ArgumentType.NUMBER, defaultValue: 100 },
                            AMOUNT: { type: ArgumentType.NUMBER, defaultValue: 50 },
                        }
                    },
                    {
                        opcode: 'tweenPlayAnimationPosition',
                        text: '[MODE] ease [DIRECTION] to x: [ENDX] y: [ENDY] at speed [SPEED]',
                        disableMonitor: true,
                        blockType: BlockType.COMMAND,
                        arguments: {
                            MODE: { type: ArgumentType.STRING, menu: 'modes' },
                            DIRECTION: { type: ArgumentType.STRING, menu: 'direction' },
                            STARTX: { type: ArgumentType.NUMBER, defaultValue: 0 },
                            STARTY: { type: ArgumentType.NUMBER, defaultValue: 0 },
                            ENDX: { type: ArgumentType.NUMBER, defaultValue: 100 },
                            ENDY: { type: ArgumentType.NUMBER, defaultValue: 100 },
                            SPEED: { type: ArgumentType.NUMBER, defaultValue: 1 },
                        }
                    },
                    {
                        opcode: 'tweenPlayAnimationPositionFromTo',
                        text: '[MODE] ease [DIRECTION] from x: [STARTX] y: [STARTY] to x: [ENDX] y: [ENDY] at speed [SPEED]',
                        disableMonitor: true,
                        blockType: BlockType.COMMAND,
                        arguments: {
                            MODE: { type: ArgumentType.STRING, menu: 'modes' },
                            DIRECTION: { type: ArgumentType.STRING, menu: 'direction' },
                            STARTX: { type: ArgumentType.NUMBER, defaultValue: 0 },
                            STARTY: { type: ArgumentType.NUMBER, defaultValue: 0 },
                            ENDX: { type: ArgumentType.NUMBER, defaultValue: 100 },
                            ENDY: { type: ArgumentType.NUMBER, defaultValue: 100 },
                            SPEED: { type: ArgumentType.NUMBER, defaultValue: 1 },
                        }
                    },
                    {
                        opcode: 'tweenPlayAnimationSize',
                        text: '[MODE] ease [DIRECTION] from size: [STARTSIZE] to size: [ENDSIZE]  at speed [SPEED]',
                        disableMonitor: true,
                        blockType: BlockType.COMMAND,
                        arguments: {
                            MODE: { type: ArgumentType.STRING, menu: 'modes' },
                            DIRECTION: { type: ArgumentType.STRING, menu: 'direction' },
                            STARTSIZE: { type: ArgumentType.NUMBER, defaultValue: 0 },
                            ENDSIZE: { type: ArgumentType.NUMBER, defaultValue: 100 },
                            SPEED: { type: ArgumentType.NUMBER, defaultValue: 1 },
                        }
                    }
                ],
                menus: {
                    modes: {
                        acceptReporters: true,
                        items: EasingMethods
                    },
                    direction: {
                        acceptReporters: true,
                        items: [
                            "in",
                            "out",
                            "in out"
                        ]
                    }
                }
            };
        }

        // utilities
        multiplierToNormalNumber(mul, start, end) {
            const multiplier = end - start;
            const result = (mul * multiplier) + start;
            return result;
        }
        clamp(num, min, max) {
            return Math.min(Math.max(num, min), max);
        }

        // blocks
        tweenValue(args) {
            const easeMethod = Cast.toString(args.MODE);
            const easeDirection = Cast.toString(args.DIRECTION);

            const start = Cast.toNumber(args.START);
            const end = Cast.toNumber(args.END);

            // easing method does not exist, return starting number
            if (!EasingMethods.includes(easeMethod)) return start;
            // easing method is not implemented, return starting number
            if (!this[easeMethod]) return start;

            const progress = Cast.toNumber(args.AMOUNT) / 100;

            const tweened = this[easeMethod](progress, easeDirection);
            return this.multiplierToNormalNumber(tweened, start, end);
        }
        tweenPlayAnimationPosition(args, util) {
            const easeMethod = Cast.toString(args.MODE);
            const easeDirection = Cast.toString(args.DIRECTION);

            const startx = Cast.toNumber(util.target.x);
            const starty = Cast.toNumber(util.target.y);
            const endx = Cast.toNumber(args.ENDX);
            const endy = Cast.toNumber(args.ENDY);
            const speed = Cast.toNumber(args.SPEED);

            if (typeof util.stackFrame.loopCounter === 'undefined') {
                util.stackFrame.loopCounter = 100;
            }
            const progress = Cast.toNumber(Math.round(this.clamp(util.stackFrame.loopCounter, 0, 100))) / 100;
            const tweened = this[easeMethod](progress, easeDirection);
            const x = Cast.toNumber(this.multiplierToNormalNumber(tweened, endx, startx));
            const y = Cast.toNumber(this.multiplierToNormalNumber(tweened, endx, startx));
            util.target.setXY(x, y);
            vm.runtime.requestRedraw();
            if (util.stackFrame.loopCounter >= 0) {
                util.stackFrame.loopCounter -= speed;
                util.yield();
            }
        }
        tweenPlayAnimationPositionFromTo(args, util) {
            const easeMethod = Cast.toString(args.MODE);
            const easeDirection = Cast.toString(args.DIRECTION);

            const startx = Cast.toNumber(args.STARTX);
            const starty = Cast.toNumber(args.STARTY);
            const endx = Cast.toNumber(args.ENDX);
            const endy = Cast.toNumber(args.ENDY);
            const speed = Cast.toNumber(args.SPEED);

            if (typeof util.stackFrame.loopCounter === 'undefined') {
                util.stackFrame.loopCounter = 100;
            }
            const progress = Cast.toNumber(Math.round(this.clamp(util.stackFrame.loopCounter, 0, 100))) / 100;
            const tweened = this[easeMethod](progress, easeDirection);
            const x = Cast.toNumber(this.multiplierToNormalNumber(tweened, endx, startx));
            const y = Cast.toNumber(this.multiplierToNormalNumber(tweened, endx, startx));
            util.target.setXY(x, y);
            vm.runtime.requestRedraw();
            if (util.stackFrame.loopCounter >= 0) {
                util.stackFrame.loopCounter -= speed;
                util.yield();
            }
        }
        tweenPlayAnimationSize(args, util) {
            const easeMethod = Cast.toString(args.MODE);
            const easeDirection = Cast.toString(args.DIRECTION);

            const startSize = Cast.toNumber(args.STARTSIZE);
            const endSize = Cast.toNumber(args.ENDSIZE);
            const speed = Cast.toNumber(args.SPEED);

            if (typeof util.stackFrame.loopCounter === 'undefined') {
                util.stackFrame.loopCounter = 100;
            }
            const progress = Cast.toNumber(Math.round(this.clamp(util.stackFrame.loopCounter, 0, 100))) / 100;
            const tweened = this[easeMethod](progress, easeDirection);
            const size = Cast.toNumber(this.multiplierToNormalNumber(tweened, endSize, startSize));
            util.target.setSize(size);
            vm.runtime.requestRedraw();
            if (util.stackFrame.loopCounter >= 0) {
                util.stackFrame.loopCounter -= speed;
                util.yield();
            }
        }

        // easing functions (placed below blocks for organization)
        linear(x) {
            // lol
            return x;
        }

        sine(x, dir) {
            switch (dir) {
                case "in": {
                    return 1 - Math.cos((x * Math.PI) / 2);
                }
                case "out": {
                    return Math.sin((x * Math.PI) / 2);
                }
                case "in out": {
                    return -(Math.cos(Math.PI * x) - 1) / 2;
                }
                default:
                    return 0;
            }
        }

        quad(x, dir) {
            switch (dir) {
                case "in": {
                    return x * x;
                }
                case "out": {
                    return 1 - (1 - x) * (1 - x);
                }
                case "in out": {
                    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
                }
                default:
                    return 0;
            }
        }

        cubic(x, dir) {
            switch (dir) {
                case "in": {
                    return x * x * x;
                }
                case "out": {
                    return 1 - Math.pow(1 - x, 3);
                }
                case "in out": {
                    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
                }
                default:
                    return 0;
            }
        }

        quart(x, dir) {
            switch (dir) {
                case "in": {
                    return x * x * x * x;
                }
                case "out": {
                    return 1 - Math.pow(1 - x, 4);
                }
                case "in out": {
                    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
                }
                default:
                    return 0;
            }
        }

        quint(x, dir) {
            switch (dir) {
                case "in": {
                    return x * x * x * x * x;
                }
                case "out": {
                    return 1 - Math.pow(1 - x, 5);
                }
                case "in out": {
                    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
                }
                default:
                    return 0;
            }
        }

        expo(x, dir) {
            switch (dir) {
                case "in": {
                    return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
                }
                case "out": {
                    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
                }
                case "in out": {
                    return x === 0
                        ? 0
                        : x === 1
                            ? 1
                            : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
                                : (2 - Math.pow(2, -20 * x + 10)) / 2;
                }
                default:
                    return 0;
            }
        }

        circ(x, dir) {
            switch (dir) {
                case "in": {
                    return 1 - Math.sqrt(1 - Math.pow(x, 2));
                }
                case "out": {
                    return Math.sqrt(1 - Math.pow(x - 1, 2));
                }
                case "in out": {
                    return x < 0.5
                        ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
                        : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
                }
                default:
                    return 0;
            }
        }

        back(x, dir) {
            switch (dir) {
                case "in": {
                    const c1 = 1.70158;
                    const c3 = c1 + 1;

                    return c3 * x * x * x - c1 * x * x;
                }
                case "out": {
                    const c1 = 1.70158;
                    const c3 = c1 + 1;

                    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
                }
                case "in out": {
                    const c1 = 1.70158;
                    const c2 = c1 * 1.525;

                    return x < 0.5
                        ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
                        : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
                }
                default:
                    return 0;
            }
        }

        elastic(x, dir) {
            switch (dir) {
                case "in": {
                    const c4 = (2 * Math.PI) / 3;

                    return x === 0
                        ? 0
                        : x === 1
                            ? 1
                            : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
                }
                case "out": {
                    const c4 = (2 * Math.PI) / 3;

                    return x === 0
                        ? 0
                        : x === 1
                            ? 1
                            : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
                }
                case "in out": {
                    const c5 = (2 * Math.PI) / 4.5;

                    return x === 0
                        ? 0
                        : x === 1
                            ? 1
                            : x < 0.5
                                ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
                                : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
                }
                default:
                    return 0;
            }
        }

        bounce(x, dir) {
            switch (dir) {
                case "in": {
                    return 1 - this.bounce(1 - x, "out");
                }
                case "out": {
                    const n1 = 7.5625;
                    const d1 = 2.75;

                    if (x < 1 / d1) {
                        return n1 * x * x;
                    } else if (x < 2 / d1) {
                        return n1 * (x -= 1.5 / d1) * x + 0.75;
                    } else if (x < 2.5 / d1) {
                        return n1 * (x -= 2.25 / d1) * x + 0.9375;
                    } else {
                        return n1 * (x -= 2.625 / d1) * x + 0.984375;
                    }
                }
                case "in out": {
                    return x < 0.5
                        ? (1 - this.bounce(1 - 2 * x, "out")) / 2
                        : (1 + this.bounce(2 * x - 1, "out")) / 2;
                }
                default:
                    return 0;
            }
        }
    }

    Scratch.extensions.register(new Tween());
}) (Scratch);
