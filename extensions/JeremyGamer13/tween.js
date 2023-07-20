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

    // simply not precise enough
    // wait block ends before tween finishes
    // so we use steps instead
    // const delay = (ms) => {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             resolve();
    //         }, ms);
    //     });
    // };

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
                        opcode: 'tweenBlock',
                        text: 'tween [VAR] from [START] to [END] over [SEC] seconds using [MODE] ease [DIRECTION]',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            VAR: { type: ArgumentType.STRING, menu: 'vars' },
                            START: { type: ArgumentType.NUMBER, defaultValue: 0 },
                            END: { type: ArgumentType.NUMBER, defaultValue: 100 },
                            SEC: { type: ArgumentType.NUMBER, defaultValue: 1 },
                            MODE: { type: ArgumentType.STRING, menu: 'modes' },
                            DIRECTION: { type: ArgumentType.STRING, menu: 'direction' },
                        }
                    },
                    // old version of PR had this
                    // just want to be safe
                    {
                        opcode: 'tweenBlockAsync',
                        text: 'tween [VAR] from [START] to [END] over [SEC] seconds using [MODE] ease [DIRECTION]',
                        blockType: BlockType.COMMAND,
                        hideFromPalette: true,
                        arguments: {
                            VAR: { type: ArgumentType.STRING, menu: 'vars' },
                            START: { type: ArgumentType.NUMBER, defaultValue: 0 },
                            END: { type: ArgumentType.NUMBER, defaultValue: 100 },
                            SEC: { type: ArgumentType.NUMBER, defaultValue: 1 },
                            MODE: { type: ArgumentType.STRING, menu: 'modes' },
                            DIRECTION: { type: ArgumentType.STRING, menu: 'direction' },
                        }
                    }
                ],
                menus: {
                    vars: 'getVariables',
                    modes: {
                        acceptReporters: true,
                        items: EasingMethods.map(item => ({ text: item, value: item }))
                    },
                    direction: {
                        acceptReporters: true,
                        items: [
                            "in",
                            "out",
                            "in out"
                        ].map(item => ({ text: item, value: item }))
                    }
                }
            };
        }

        // menus
        getVariables() {
            const emptyMenu = [{ text: '', value: '' }];
            // get targets to look through
            // we can use editingTarget since menus are only opened in the editor
            const stage = Scratch.vm.runtime.getTargetForStage();
            const target = Scratch.vm.editingTarget;

            const stageVariables = Object.values(stage.variables);
            const targetVariables = Object.values(target.variables);
            const allVariables = [].concat(stageVariables, targetVariables);

            // add to list
            const menu = [];
            for (const variable of allVariables) {
                menu.push({ text: variable.name, value: variable.id });
            }

            // return empty menu if we found no variables
            if (menu.length <= 0) {
                return emptyMenu;
            }

            return menu;
        }

        // internal tools
        _stepListeners = [];
        _attachOneTimeStepListener(cb) {
            this._stepListeners.push(cb);
        }
        _onStep() {
            for (const callback of this._stepListeners) {
                callback();
            }
        }

        // extra class functions
        nextStep() {
            return new Promise((resolve) => {
                this._attachOneTimeStepListener(() => {
                    resolve();
                });
            });
        }

        // utilities
        multiplierToNormalNumber(mul, start, end) {
            const multiplier = end - start;
            const result = (mul * multiplier) + start;
            return result;
        }
        setRealMenuOptionValue(option, newValue, util) {
            const variableId = Cast.toString(option);

            const currentTarget = util.target;
            const stageTarget = Scratch.vm.runtime.getTargetForStage();

            let variable = stageTarget.lookupVariableById(variableId);
            if (!variable) {
                variable = currentTarget.lookupVariableById(variableId);
            }
            if (!variable) return;

            variable.value = newValue;
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
        tweenBlockAsync(...args) {
            // "redirect" to new block
            this.tweenBlock(...args);
        }
        tweenBlock(args, util) {
            const easeMethod = Cast.toString(args.MODE);
            const easeDirection = Cast.toString(args.DIRECTION);

            const option = Cast.toString(args.VAR);

            const start = Cast.toNumber(args.START);
            const end = Cast.toNumber(args.END);

            const seconds = Cast.toNumber(args.SEC);

            // easing method does not exist, return starting number
            if (!EasingMethods.includes(easeMethod)) return start;
            // easing method is not implemented, return starting number
            if (!this[easeMethod]) return start;

            // go to start
            const startingTween = this[easeMethod](0, easeDirection);
            const startingValue = this.multiplierToNormalNumber(startingTween, start, end);
            this.setRealMenuOptionValue(option, startingValue, util);

            // start tweening
            const fpsDifference = Scratch.vm.runtime.frameLoop.framerate / 30;
            let stepCount = Math.floor((30 * seconds) * fpsDifference);
            let lastFps = Scratch.vm.runtime.frameLoop.framerate;
            let startingIdx = 0;

            // loop
            const recursiveLoop = async () => {
                for (let i = startingIdx; i < stepCount; i++) {
                    // make sure fps isnt different
                    // if it is, redo the loop
                    const currentFps = Scratch.vm.runtime.frameLoop.framerate;
                    if (currentFps !== lastFps) {
                        // fps has updated
                        const fpsDifference = Scratch.vm.runtime.frameLoop.framerate / 30;
                        const newStepCount = Math.floor((30 * seconds) * fpsDifference);
                        const newIndex = (i / stepCount) * newStepCount;
                        stepCount = newStepCount;
                        startingIdx = Math.round(newIndex);
                        lastFps = currentFps;
                        return recursiveLoop();
                    }
                    // update
                    const progress = (i / (stepCount - 1));
                    const tween = this[easeMethod](progress, easeDirection);
                    const value = this.multiplierToNormalNumber(tween, start, end);
                    this.setRealMenuOptionValue(option, value, util);
                    await this.nextStep();
                }

                // go to end
                const endingTween = this[easeMethod](1, easeDirection);
                const endingValue = this.multiplierToNormalNumber(endingTween, start, end);
                this.setRealMenuOptionValue(option, endingValue, util);
            };
            recursiveLoop();
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

    const instance = new Tween();
    const oldStep = Scratch.vm.runtime._step;
    Scratch.vm.runtime._step = function (...args) {
        oldStep.call(this, ...args);
        instance._onStep();
    };
    Scratch.extensions.register(instance);
})(Scratch);
