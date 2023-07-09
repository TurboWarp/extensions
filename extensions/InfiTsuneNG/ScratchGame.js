(function(Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('This Hello World example must run unsandboxed');
    }

    class HelloWorld {
        getInfo() 
        {
            return {
                id: 'scratchgame',
                name: 'Scratch Game',
                color1: '#836996',
                blocks: [
                    {
                        opcode: 'startObjHat',
                        blockType: Scratch.BlockType.HAT,
                        text: 'Object Started',
                        filter: [Scratch.TargetType.SPRITE],
                        isEdgeActivated: false
                    },

                    {
                        opcode: 'startObj',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Start [object]',
                        filter: [Scratch.TargetType.SPRITE],
                        arguments: 
                        {
                            object: 
                            {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'sprites'
                            }
                        }
                    }
                ],
                menus: {
                    sprites: {
                        acceptReporters: true,
                        items: 'getAllSprites'
                    }
                }
            };
        }

        /**
         * is like a 'new Class()'.
         * coming soon params
         */
        startObj({object}, util) 
        {
            const targets = Scratch.vm.runtime.targets;

            for (var i = 1; i < targets.length; ++i)
            {
                var target = targets[i];

                var sprite = target.sprite;
                var id = sprite.name;

                if (target.isOriginal)
                    if (id == object)
                        util.startHats('scratchgame_startObjHat', null, target);
            }
        }

        /**
         * get porject sprites
         * @returns the sprite :V
         */
        getAllSprites() {
            var sprites = [];

            const targets = Scratch.vm.runtime.targets;

            const my = Scratch.vm.runtime.getEditingTarget().sprite.name;

            for (var i = 1; i < targets.length; ++i)
            {
                var target = targets[i];
                var sprite = target.sprite;

                var value = sprite.name;
                var text = value;

                if (my === text) text = 'myself';

                if (target.isOriginal)
                {
                    sprites.push(
                        {
                            text: text,
                            value: value
                        }
                    );
                }
            }

            if (sprites.length === 0)
            {
                return [
                    {
                        text: '',
                        value: ''
                    }
                ]
            }

            return sprites;
        }
    }
    Scratch.extensions.register(new HelloWorld());  
// @ts-ignore
})(Scratch);  