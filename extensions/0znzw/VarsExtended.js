// Name: Variables Extended
// ID: 0znzwVarsExtended
// Description: Better variable control.
// By: 0znzw <https://scratch.mit.edu/users/0znzw/>

// *************
// Additional meta
// License: MIT
// Version: 1.1
// *************
(function(Scratch) {
    'use strict';
    const vm = Scratch.vm, runtime = vm.runtime;
    const hasOwn = function (object, key) {
        return Object.prototype.hasOwnProperty.call(object, key);
    };
    function getVariables(target) {
        const variables = {};
        Object.values(target.variables).filter(variable => variable.type === '').forEach(variable => variables[variable.name] = variable.value);
        return variables;
    }
    function getVariable(target, name) {
        return Object.values(target.variables).find(variable => variable.name === name);
    }
    function ggVar(target, name) {
        // @ts-expect-error
        return (getVariable(target, name) ?? getVariable(runtime._stageTarget, name));
    }

    // I assume you dont want this?
    /* eslint-disable */
    vm.on('EXTENSION_ADDED', tryUseScratchBlocks);
    vm.on('BLOCKSINFO_UPDATE', tryUseScratchBlocks);
    tryUseScratchBlocks();

    function tryUseScratchBlocks() {
        // @ts-ignore
        if (!ScratchBlocks.Colours.buttonActiveBackground) {
            throw new Error('The VM is outdated!');
        }

        if (!window.ScratchBlocks) return;

        // @ts-ignore
        const workspace = ScratchBlocks.getMainWorkspace();
        vm.removeListener('EXTENSION_ADDED', tryUseScratchBlocks);
        vm.removeListener('BLOCKSINFO_UPDATE', tryUseScratchBlocks);

        console.log('successfully found scratchblocks');

        // @ts-ignore
        ScratchBlocks.BlockSvg.prototype.getPlacedInput = function () {
            if (!this.parentBlock_) return;
            return this.parentBlock_.getInputWithBlock(this);
        };
        // @ts-ignore
        ScratchBlocks.BlockSvg.prototype.renderAsInputType = function (failSafe) {
            var input = this.getPlacedInput();
            if (input) this.setOutputShape(input.type);
            else this.setOutputShape(failSafe);
            this.render();
        };
        // @ts-ignore
        ScratchBlocks.BlockSvg.prototype.renderAsInputCheck = function (failSafe) {
            var input = this.getPlacedInput(),
            checks = input?.connection?.check_ ?? [],
            shape = failSafe;
            // @ts-ignore
            if (checks.includes('Boolean')) shape = ScratchBlocks.OUTPUT_SHAPE_HEXAGONAL;
            if (input) this.setOutputShape(shape);
            else this.setOutputShape(failSafe);
            this.render();
        };
        // @ts-ignore
        ScratchBlocks.Workspace.prototype.getBlocksByType = function (type) {
            return this.getAllBlocks().filter((block) => block.type == type);
        };

        function fixDisplay() {
            workspace.getBlocksByType('0znzwVarsPlus_getVar').forEach((block) => {
                // @ts-ignore
                block.renderAsInputCheck(ScratchBlocks.OUTPUT_SHAPE_ROUND);
            });
        }

        // @ts-ignore
        runtime.addListener('BLOCK_DRAG_UPDATE', fixDisplay);
        vm.on('workspaceUpdate', fixDisplay)
    }
    /* eslint-enable */
    class VP {
        getInfo() {
            const info = {
                id: '0znzwVarsPlus',
                name: 'Variables Extended',
                blocks: [
                    {
                        disableMonitor: true,
                        opcode: 'globalJSON',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get global variables as JSON'
                    },
                    {
                        disableMonitor: true,
                        opcode: 'spriteJSON',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get sprite-only variables as JSON'
                    },
                    {
                        disableMonitor: true,
                        opcode: 'targetJSON',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get all variables in [SPRITE_NAME] as JSON',
                        arguments: {
                            SPRITE_NAME: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'targets'
                            }
                        }
                    },
                    {
                        disableMonitor: true,
                        hideFromPalette: true,
                        opcode: 'varsJSON',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get variables [NAMES] as JSON',
                        arguments: {
                            NAMES: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '["my variable"]'
                            }
                        }
                    },
                    {
                        disableMonitor: true,
                        allowDropAnywhere: true,
                        opcode: 'getVar',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get variable [NAME] in [SPRITE_NAME]',
                        arguments: {
                            SPRITE_NAME: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'targets'
                            },
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'my variable'
                            },
                        },
                    },
                    {
                        opcode: 'swapVar',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'swap variable [NAME_1] in [SPRITE_NAME_1] with variable [NAME_2] in [SPRITE_NAME_2]',
                        arguments: {
                            SPRITE_NAME_1: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'targets'
                            },
                            SPRITE_NAME_2: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'targets'
                            },
                            NAME_1: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'my variable'
                            },
                            NAME_2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'my variable'
                            },
                        },
                    },
                    {
                        opcode: 'setVar',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set variable [NAME] in [SPRITE_NAME] to [VALUE]',
                        arguments: {
                            SPRITE_NAME: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'targets'
                            },
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'my variable'
                            },
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '0'
                            }
                        },
                    },
                    {
                        opcode: 'changeVar',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'change variable [NAME] in [SPRITE_NAME] by [AMOUNT]',
                        arguments: {
                            SPRITE_NAME: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'targets'
                            },
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'my variable'
                            },
                            AMOUNT: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        },
                    },
                    {
                        opcode: 'varVisibility',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '[VISIBILITY] variable [NAME] monitor',
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'my variable'
                            },
                            VISIBILITY: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'visible'
                            },
                        },
                    },
                    {
                        disableMonitor: true,
                        opcode: 'varIsVisible',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is variable [NAME] monitor checked?',
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'my variable'
                            }
                        },
                    }
                ],
                menus: {
                    targets: {
                        items: '_getTargets',
                        acceptReporters: true
                    },
                    visible: {
                        items: ['show', 'hide', 'toggle'],
                        acceptReporters: true
                    },
                    variables: {
                        items: '_varNames',
                        acceptReporters: true
                    }
                }
            };
            info.blocks = info.blocks.map(/** @argument {Object} block */block => (block?.extensions || typeof block !== 'object' ? block : {
                ...block,
                extensions: ['colours_data']
            }));
            /* eslint-disable */
            // @ts-expect-error
            info.colors = (ScratchBlocks?.Colours?.data ?? {
                primary: '#FF8C1A',
                secondary: '#FF8000',
                tertiary: '#DB6E00',
                quaternary: '#DB6E00'
            });
            info.color1 = info.colors.primary;
            info.color2 = info.colors.secondary;
            info.color3 = info.colors.tertiary;
            info.color4 = info.colors.quaternary;
            /* eslint-enable */
            return info;
        }
        globalJSON(_, __, ___, skipStr) {
            skipStr = Boolean(skipStr ?? false);
            const vars = getVariables(runtime.getTargetForStage());
            if (skipStr) return vars;
            return JSON.stringify(vars);
        }
        spriteJSON(_, util, __, skipStr) {
            skipStr = Boolean(skipStr ?? false);
            if (util.target.isStage) return this.globalJSON();
            const vars = getVariables(util.target);
            if (skipStr) return vars;
            return JSON.stringify(vars);
        }
        targetJSON({ SPRITE_NAME }, util, _, skipStr) {
            skipStr = Boolean(skipStr ?? false);
            const sprite = this._getTargetFromMenu(Scratch.Cast.toString(SPRITE_NAME), util);
            if (!sprite) return (skipStr ? {} : '{}');
            return JSON.stringify(getVariables(sprite));
        }
        varsJSON({ NAMES }, util, _, skipStr) {
            skipStr = Boolean(skipStr ?? false);
            NAMES = this._tryParse(NAMES);
            if (!NAMES) return (skipStr ? {} : '{}');
            if (!Array.isArray(NAMES)) return (skipStr ? {} : '{}');
            const spriteVars = this.spriteJSON(undefined, util, undefined, true);
            const vars = {};
            NAMES.forEach(name => vars[name] = spriteVars[name]);
            if (skipStr) return vars;
            return JSON.stringify(vars);
        }
        getVar({ SPRITE_NAME, NAME }, util) {
            const sprite = this._getTargetFromMenu(Scratch.Cast.toString(SPRITE_NAME), util);
            if (!sprite) return '';
            const variable = getVariable(sprite, Scratch.Cast.toString(NAME));
            if (!variable) return '';
            return variable.value ?? '';
        }
        setVar({ SPRITE_NAME, NAME, VALUE }, util) {
            const sprite = this._getTargetFromMenu(Scratch.Cast.toString(SPRITE_NAME), util);
            if (!sprite) return;
            const variable = getVariable(sprite, Scratch.Cast.toString(NAME));
            if (!variable) return;
            variable.value = VALUE;
        }
        swapVar({ SPRITE_NAME_1, NAME_1, SPRITE_NAME_2, NAME_2 }, util) {
            const var1 = this.getVar({ SPRITE_NAME: SPRITE_NAME_1, NAME: NAME_1 }, util);
            const var2 = this.getVar({ SPRITE_NAME: SPRITE_NAME_2, NAME: NAME_2 }, util);
            if (!var1 || !var2) return;
            this.setVar({ SPRITE_NAME: SPRITE_NAME_2, NAME: NAME_2, VALUE: var1 }, util);
            this.setVar({ SPRITE_NAME: SPRITE_NAME_1, NAME: NAME_1, VALUE: var2 }, util);
        }
        changeVar({ SPRITE_NAME, NAME, AMOUNT }, util) {
            NAME = Scratch.Cast.toString(NAME);
            const sprite = this._getTargetFromMenu(Scratch.Cast.toString(SPRITE_NAME), util);
            if (!sprite) return;
            const variable = getVariable(sprite, NAME);
            if (!variable) return;
            const VALUE = (Scratch.Cast.toNumber(variable.value) + Scratch.Cast.toNumber(AMOUNT));
            this.setVar({ SPRITE_NAME, NAME, VALUE }, util);
        }
        varIsVisible({ NAME }, util) {
            const varId = ggVar(util.target, Scratch.Cast.toString(NAME))?.id;
            if (!varId) return false;
            // @ts-expect-error
            return (runtime.monitorBlocks.getBlock(varId).isMonitored ?? false);
        }
        varVisibility({ NAME, VISIBILITY }, util) {
            VISIBILITY = Scratch.Cast.toString(VISIBILITY).toLowerCase();
            const varId = ggVar(util.target, Scratch.Cast.toString(NAME))?.id;
            if (!varId) return;
            switch (VISIBILITY) {
                case 'show':
                    VISIBILITY = true;
                    break;
                case 'hide':
                    VISIBILITY = false;
                    break;
                case 'toggle':
                    VISIBILITY = !this.varIsVisible({ NAME }, util);
                    break;
                default:
                    VISIBILITY = true;
                    break;
            }
            // runtime.ext_scratch3_data.changeMonitorVisibility
            // @ts-expect-error
            runtime.monitorBlocks.changeBlock({
                id: varId, // Monitor blocks for variables are the variable ID.
                element: 'checkbox', // Mimic checkbox event from flyout.
                value: VISIBILITY
            }, runtime);
        }
        // utils
        _tryParse(json) {
            try {
                return JSON.parse(Scratch.Cast.toString(json));
            } catch {
                return false;
            }
        }
        _varNames() {
            return [...(Object.keys(getVariables(runtime.getTargetForStage()))), ...(Object.keys(getVariables(vm.editingTarget)))];
        }
        // https://extensions.turbowarp.org/Lily/Assets.js
        _getTargetFromMenu(targetName, util) {
            let target = Scratch.vm.runtime.getSpriteTargetByName(targetName);
            if (targetName === '_myself_') target = util.target.sprite.clones[0];
            if (targetName === '_stage_') target = runtime.getTargetForStage();
            return target;
        }
        _getTargets() {
            const spriteNames = [];
            if (Scratch.vm.editingTarget) {
                spriteNames.push({
                    text: 'myself',
                    value: '_myself_',
                });
            }
            spriteNames.push({
                text: 'Stage',
                value: '_stage_',
            });
            const targets = Scratch.vm.runtime.targets;
            for (let index = 1; index < targets.length; index++) {
                const target = targets[index];
                    if (target.isOriginal) {
                    spriteNames.push(target.getName());
                }
            }
            if (spriteNames.length > 0) {
                return spriteNames;
            } else {
                return [''];
            }
        }
    }
    Scratch.extensions.register(new VP());
})(Scratch);
