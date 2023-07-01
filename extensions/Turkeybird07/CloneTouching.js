(function(Scratch) {
    'use strict';

    function getVariableByName(name, type) {
        for (const target of Scratch.vm.runtime.targets) {
            if (!target.isOriginal) continue;
            for (const variable of Object.values(target.variables)) {
                if (variable.name === name && variable.type === type) {
                    return {target, variable};
                }
            }
        }
        return null;
    }

    class clonetouching {


        getInfo() {
            return {
                id: 'turkeybird07clonetouching',
                name: 'Clone Touching',
                color1: '#FFAB19',
                color2: '#EC9C13',
                color3: '#CF8B17',
                blocks: [
                    {
                        opcode: 'touchclonewithvar',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'touching clone with [ONE] from [SPRITES] set to [TWO] ?',
                        filter: [Scratch.TargetType.SPRITE],
                        arguments: {
                            ONE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'variable'
                            },
                            SPRITES: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "spritemenu"
                            },
                            TWO: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '1'
                            }
                        }
                    }
                ],
                menus: {
                    spritemenu: {
                        acceptReporters: true,
                        items: "getSprites"
                    }
                }
            };
        }

        getSprites() {
            const sprites = [];
            for (const target of Scratch.vm.runtime.targets) {
              if (target.isOriginal && !target.isStage) {
                sprites.push(target.getName());
              }
            }
            if (sprites.length === 0) {
              return [
                {
                  text: "No sprites exist",
                  value: " ",
                },
              ];
            }
            return sprites;
        }

        touchclonewithvar(args, util) {
            const parentTarget = Scratch.vm.runtime.getSpriteTargetByName(args.SPRITES);
            if (!parentTarget) {
                return false;
            }
            const variablefromname = getVariableByName(args.ONE, "");
            if (variablefromname == null) {
                return false;
            }
            const drawableCandidates = parentTarget.sprite.clones
              .filter(clone => {
                const variable = clone.lookupVariableById(variablefromname.variable.id);
                return variable && Scratch.Cast.compare(variable.value, args.TWO) === 0;
              })
              .map(clone => clone.drawableID);
            if (drawableCandidates.length === 0) {
              return false;
            }
            return Scratch.vm.renderer.isTouchingDrawables(util.target.drawableID, drawableCandidates);
        }

    }

    Scratch.extensions.register(new clonetouching());
}(Scratch));
