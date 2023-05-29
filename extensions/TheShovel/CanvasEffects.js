(function(Scratch) {
    'use strict';
    if (!Scratch.extensions.unsandboxed) {
        throw new Error('This extension must run unsandboxed');
    }

    const canvas = Scratch.renderer.canvas;

    const updateStyle = () => {
        const filter = `blur(${blur}px) contrast(${contrast / 100}) saturate(${saturation}%) hue-rotate(${color}deg) brightness(${brightness}%) invert(${invert}%)`;
        if (canvas.style.filter !== filter) {
            canvas.style.filter = filter;
        }
        const imageRendering = resizeMode === 'pixelated' ? 'pixelated' : '';
        if (canvas.style.imageRendering !== imageRendering) {
            canvas.style.imageRendering = imageRendering;
        }
    };
    // scratch-gui will sometimes reset the cursor when resizing the window or going in/out of fullscreen
    new MutationObserver(updateStyle).observe(canvas, {
      attributeFilter: ['style'],
      attributes: true
    });

    let blur = 0;
    let contrast = 100;
    let saturation = 100;
    let color = 0;
    let brightness = 100;
    let invert = 0;
    let resizeMode = 'default';

    class CanvasEffects {
        getInfo() {
            return {
                id: 'theshovelcanvaseffects',
                name: 'Canvas Effects',
                blocks: [
                    {
                        opcode: 'seteffect',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set canvas [EFFECT] to [NUMBER]',
                        arguments: {
                            EFFECT: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'EFFECTMENU'
                            },
                            NUMBER: {
                                type: Scratch.ArgumentType.NUMBER
                            }
                        },
                    },
                    {
                        opcode: 'geteffect',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get canvas [EFFECT]',
                        arguments: {
                            EFFECT: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'EFFECTGETMENU'
                            }
                        }
                    },
                    {
                        opcode: 'cleareffects',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'clear canvas effects'
                    },
                    {
                        opcode: 'renderscale',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set canvas render size to x:[X] y:[Y]',
                        arguments: {
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 100
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 100
                            }
                        }
                    },
                    {
                        opcode: 'setrendermode',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set canvas resize rendering mode [EFFECT]',
                        arguments: {
                            EFFECT: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'RENDERMODE'
                            }
                        },
                    },
                ],
                menus: {
                    EFFECTMENU: {
                        acceptReporters: true,
                        items: ['blur', 'contrast', 'saturation', 'color shift', 'brightness', 'invert']
                    },
                    RENDERMODE: {
                        acceptReporters: true,
                        items: ['pixelated', 'default']
                    },
                    EFFECTGETMENU: {
                        acceptReporters: true,
                        items: ['blur', 'contrast', 'saturation', 'color shift', 'brightness', 'invert', 'resize rendering mode']
                    }
                }
            };
        }
        geteffect({EFFECT}) {
            if (EFFECT === 'blur') {
                return blur;
            } else if (EFFECT === 'contrast') {
                return contrast;
            } else if (EFFECT === 'saturation') {
                return saturation;
            } else if (EFFECT === 'color shift') {
                return color;
            } else if (EFFECT === 'brightness') {
                return brightness;
            } else if (EFFECT === 'invert') {
                return invert;
            } else if (EFFECT === 'resize rendering mode') {
                return resizeMode;
            }
            return '';
        }
        seteffect({EFFECT, NUMBER}) {
            if (EFFECT === 'blur') {
                blur = NUMBER;
            } else if (EFFECT === 'contrast') {
                contrast = NUMBER;
            } else if (EFFECT === 'saturation') {
                saturation = NUMBER;
            } else if (EFFECT === 'color shift') {
                color = NUMBER;
            } else if (EFFECT === 'brightness') {
                brightness = NUMBER;
            } else if (EFFECT === 'invert') {
                invert = NUMBER;
            }
            updateStyle();
        }
        cleareffects() {
            blur = 0;
            contrast = 100;
            saturation = 100;
            color = 0;
            brightness = 100;
            invert = 0;
            resizeMode = 'default';
            updateStyle();
        }
        setrendermode({EFFECT}) {
            resizeMode = EFFECT;
            updateStyle();
        }
        renderscale({X, Y}) {
            Scratch.vm.renderer.resize(X, Y);
        }
    }
    Scratch.extensions.register(new CanvasEffects());
})(Scratch);
