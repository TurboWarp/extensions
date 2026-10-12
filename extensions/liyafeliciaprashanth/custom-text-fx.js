// Name: Custom Text FX
// ID: customtextfx
// Description: Provides custom text effects for TurboWarp projects.
// By: liyafeliciaprashanth
// License: MPL-2.0

(function (Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('Custom Text FX must run without the sandbox.');
    }

    const vm = Scratch.vm;
    let canvas = null;
    let ctx = null;
    let parent = null;

    const state = {
        text: 'Hello World!',
        x: 0,
        y: 0,
        size: 32,
        outlineWidth: 3,
        outlineColor: '#000000',
        color: '#ffffff',
        visible: true,
        animation: 'none',
        startTime: performance.now()
    };

    function setupCanvas() {
        if (canvas) return;

        const stage = vm.renderer.canvas;
        parent = stage.parentElement;

        canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '10';
        canvas.style.display = 'block';

        if (getComputedStyle(parent).position === 'static') {
            parent.style.position = 'relative';
        }

        parent.appendChild(canvas);
        ctx = canvas.getContext('2d');

        function resize() {
            const stageRect = stage.getBoundingClientRect();
            const parentRect = parent.getBoundingClientRect();

            canvas.style.left =
                (stageRect.left - parentRect.left) + 'px';
            canvas.style.top =
                (stageRect.top - parentRect.top) + 'px';

            canvas.style.width = stageRect.width + 'px';
            canvas.style.height = stageRect.height + 'px';

            canvas.width = Math.max(1, Math.round(stageRect.width));
            canvas.height = Math.max(1, Math.round(stageRect.height));
        }

        new ResizeObserver(resize).observe(stage);
        new ResizeObserver(resize).observe(parent);
        resize();

        function draw() {
            if (!canvas.isConnected) return;

            const w = canvas.width;
            const h = canvas.height;

            ctx.clearRect(0, 0, w, h);

            if (state.visible && state.text !== '') {
                const elapsed =
                    (performance.now() - state.startTime) / 1000;

                let offsetY = 0;
                let scale = 1;

                if (state.animation === 'bounce') {
                    offsetY = Math.sin(elapsed * 5) * 12;
                } else if (state.animation === 'pulse') {
                    scale = 1 + Math.sin(elapsed * 4) * 0.12;
                }

                const px = ((state.x + 240) / 480) * w;
                const py = ((180 - state.y) / 360) * h
                    + offsetY * h / 360;

                const fontSize = Math.max(1, state.size * h / 360);

                ctx.save();
                ctx.translate(px, py);
                ctx.scale(scale, scale);
                ctx.font = `bold ${fontSize}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.lineJoin = 'round';

                ctx.lineWidth = Math.max(
                    0, state.outlineWidth * h / 360
                );
                ctx.strokeStyle = state.outlineColor;
                ctx.fillStyle = state.color;

                if (ctx.lineWidth > 0) {
                    ctx.strokeText(state.text, 0, 0);
                }

                ctx.fillText(state.text, 0, 0);
                ctx.restore();
            }

            requestAnimationFrame(draw);
        }

        requestAnimationFrame(draw);
    }

    class CustomTextFX {
        getInfo() {
            return {
                id: 'customtextfx',
                name: 'Custom Text FX',
                color1: '#8B5CF6',
                color2: '#7544D4',
                color3: '#6036B5',
                blocks: [
                    {
                        opcode: 'showText',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'show text [TEXT]',
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Score: 0'
                            }
                        }
                    },
                    {
                        opcode: 'setPosition',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set text position x [X] y [Y]',
                        arguments: {
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: 'setSize',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set text size to [SIZE]',
                        arguments: {
                            SIZE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 32
                            }
                        }
                    },
                    {
                        opcode: 'setColor',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set text color to [COLOR]',
                        arguments: {
                            COLOR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '#ffffff'
                            }
                        }
                    },
                    {
                        opcode: 'setOutline',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set outline width [WIDTH] color [COLOR]',
                        arguments: {
                            WIDTH: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3
                            },
                            COLOR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '#000000'
                            }
                        }
                    },
                    {
                        opcode: 'setAnimation',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set text animation [ANIMATION]',
                        arguments: {
                            ANIMATION: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'animations'
                            }
                        }
                    },
                    {
                        opcode: 'hideText',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'hide text'
                    },
                    {
                        opcode: 'clearText',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'clear text'
                    }
                ],
                menus: {
                    animations: {
                        acceptReporters: false,
                        items: ['none', 'bounce', 'pulse']
                    }
                }
            };
        }

        showText(args) {
            setupCanvas();
            state.text = String(args.TEXT);
            state.visible = true;
        }

        setPosition(args) {
            setupCanvas();
            state.x = Math.max(-240, Math.min(240, Number(args.X) || 0));
            state.y = Math.max(-180, Math.min(180, Number(args.Y) || 0));
        }

        setSize(args) {
            setupCanvas();
            state.size = Math.max(1, Math.min(200, Number(args.SIZE) || 1));
        }

        setColor(args) {
            setupCanvas();
            const c = String(args.COLOR);
            if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(c)) {
                state.color = c;
            }
        }

        setOutline(args) {
            setupCanvas();
            state.outlineWidth = Math.max(
                0, Math.min(30, Number(args.WIDTH) || 0)
            );
            const c = String(args.COLOR);
            if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(c)) {
                state.outlineColor = c;
            }
        }

        setAnimation(args) {
            setupCanvas();
            const mode = String(args.ANIMATION);
            state.animation =
                ['none', 'bounce', 'pulse'].includes(mode)
                    ? mode : 'none';
            state.startTime = performance.now();
        }

        hideText() {
            state.visible = false;
        }

        clearText() {
            state.text = '';
            state.visible = false;
        }
    }

    Scratch.extensions.register(new CustomTextFX());
})(Scratch);
