(function (Scratch) {
    'use strict';

    const BlockType = Scratch.BlockType;
    const ArgumentType = Scratch.ArgumentType;
    const Cast = Scratch.Cast;

    /**
     * @param {number} time 0-1
     * @param {number} a value at 0
     * @param {number} b value at 1
     * @returns {number}
     */
    const interpolate = (time, a, b) => {
        time = Math.min(Math.max(time, 0), 1);
        const multiplier = b - a;
        const result = (time * multiplier) + a;
        return result;
    };

    const linear = x => x;

    const sine = (x, dir) => {
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
    };

    const quad = (x, dir) => {
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
    };

    const cubic = (x, dir) => {
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
    };

    const quart = (x, dir) => {
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
    };

    const quint = (x, dir) => {
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
    };

    const expo = (x, dir) => {
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
    };

    const circ = (x, dir) => {
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
    };

    const back = (x, dir) => {
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
    };

    const elastic = (x, dir) => {
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
    };

    const bounce = (x, dir) => {
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
    };

    const EasingMethods = {
        linear,
        sine,
        quad,
        cubic,
        quart,
        quint,
        expo,
        circ,
        back,
        elastic,
        bounce
    };

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
                            MODE: {
                                type: ArgumentType.STRING,
                                menu: 'modes'
                            },
                            DIRECTION: {
                                type: ArgumentType.STRING,
                                menu:
                                'direction'
                            },
                            START: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            END: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            AMOUNT: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 50
                            }
                        }
                    },
                    {
                        opcode: 'tweenVariable',
                        text: 'tween variable [VAR] from [START] to [END] over [SEC] seconds using [MODE] ease [DIRECTION]',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            VAR: {
                                type: ArgumentType.STRING,
                                menu: 'vars'
                            },
                            START: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            END: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            SEC: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            MODE: {
                                type: ArgumentType.STRING,
                                menu: 'modes'
                            },
                            DIRECTION: {
                                type: ArgumentType.STRING,
                                menu: 'direction'
                            }
                        }
                    },
                    {
                        opcode: 'tweenProperty',
                        text: 'tween [PROPERTY] from [START] to [END] over [SEC] seconds using [MODE] ease [DIRECTION]',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PROPERTY: {
                                type: ArgumentType.STRING,
                                menu: 'properties'
                            },
                            START: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            END: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            SEC: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            MODE: {
                                type: ArgumentType.STRING,
                                menu: 'modes'
                            },
                            DIRECTION: {
                                type: ArgumentType.STRING,
                                menu: 'direction'
                            }
                        }
                    }
                ],
                menus: {
                    modes: {
                        acceptReporters: true,
                        items: Object.keys(EasingMethods)
                    },
                    direction: {
                        acceptReporters: true,
                        items: [
                            "in",
                            "out",
                            "in out"
                        ]
                    },
                    vars: {
                        acceptReporters: false, // for Scratch parity
                        items: 'getVariables'
                    },
                    properties: {
                        acceptReporters: true,
                        items: [
                            'x position',
                            'y position',
                            'direction',
                            'size'
                        ]
                    }
                }
            };
        }

        getVariables() {
            // @ts-expect-error - Blockly not typed yet
            const variables = typeof Blockly === 'undefined' ? [] : Blockly.getMainWorkspace()
                .getVariableMap()
                .getVariablesOfType('')
                .map(model => ({
                    text: model.name,
                    value: model.getId()
                }));
            if (variables.length > 0) {
                return variables;
            } else {
                return [{ text: '', value: '' }];
            }
        }

        tweenValue(args) {
            const easeMethod = Cast.toString(args.MODE);
            const easeDirection = Cast.toString(args.DIRECTION);
            const start = Cast.toNumber(args.START);
            const end = Cast.toNumber(args.END);
            const progress = Cast.toNumber(args.AMOUNT) / 100;

            if (!Object.prototype.hasOwnProperty.call(EasingMethods, easeMethod)) {
                // Unknown method
                return start;
            }
            const easingFunction = EasingMethods[easeMethod];

            const tweened = easingFunction(progress, easeDirection);
            return interpolate(tweened, start, end);
        }

        _tweenValue(args, util, callback) {
            if (util.stackTimerNeedsInit()) {
                const durationMS = Cast.toNumber(args.SEC) * 1000;
                const easeMethod = Cast.toString(args.MODE);
                const easeDirection = Cast.toString(args.DIRECTION);
                const start = Cast.toNumber(args.START);
                const end = Cast.toNumber(args.END);

                util.stackFrame.durationMS = durationMS;
                util.stackFrame.easeMethod = easeMethod;
                util.stackFrame.easeDirection = easeDirection;
                util.stackFrame.start = start;
                util.stackFrame.end = end;

                util.startStackTimer(durationMS);
                util.yield();

                callback(start);
            } else if (util.stackTimerFinished()) {
                callback(util.stackFrame.end);
            } else {
                util.yield();

                // TODO: what's the ideal behavior for unknown? like we still should update the value to get to `end`
                // eventually, right?
                let easingFunction;
                if (Object.prototype.hasOwnProperty.call(EasingMethods, util.stackFrame.easeMethod)) {
                    easingFunction = EasingMethods[util.stackFrame.easeMethod];
                } else {
                    easingFunction = EasingMethods.linear;
                }

                const timer = util.stackFrame.timer;
                const progress = timer.timeElapsed() / util.stackFrame.durationMS;
                const tweened = easingFunction(progress, util.stackFrame.easeDirection);
                const value = interpolate(tweened, util.stackFrame.start, util.stackFrame.end);
                callback(value);
            }
        }

        tweenVariable(args, util) {
            this._tweenValue(args, util, value => {
                const variable = util.target.lookupVariableById(args.VAR);
                if (variable && variable.type === '') {
                    variable.value = value;
                }
            });
        }

        tweenProperty(args, util) {
            this._tweenValue(args, util, value => {
                if (args.PROPERTY === 'x position') {
                    util.target.setXY(value, util.target.y);
                } else if (args.PROPERTY === 'y position') {
                    util.target.setXY(util.target.x, value);
                } else if (args.PROPERTY === 'direction') {
                    util.target.setDirection(value);
                } else if (args.PROPERTY === 'size') {
                    util.target.setSize(value);
                }
            });
        }
    }

    Scratch.extensions.register(new Tween());
})(Scratch);
