// Name: Scrolling bull
// ID: scrollingTextBubble',
// Description: Create scrolling text bubbles and apply styles with Html tags.
// By: Eaielectronic
// By: SERPENT1867 <https://scratch.mit.edu/users/serpent1867/>
// License: MPL-2.0
(function(Scratch) {
    'use strict';

    class ScrollingTextBubble {
        constructor() {
            this.bubbles = {};
            this.defaultBubbleStyle = {
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderColor: 'black',
                borderWidth: '2px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                padding: '15px' // Valeur par défaut du padding
            };
        }

        getInfo() {
            return {
                id: 'scrollingTextBubble',
                name: 'Scrolling Text Bubble',
                blocks: [
                    {
                        opcode: 'showTextBubble',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'show text bubble with text [TEXT] next to sprite with speed [SPEED], font [FONT], width [WIDTH], offsetX [OFFSETX], offsetY [OFFSETY]',
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Hello, World!'
                            },
                            SPEED: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 50
                            },
                            FONT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Arial'
                            },
                            WIDTH: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 200
                            },
                            OFFSETX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            OFFSETY: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -60
                            }
                        },
                        filter: [Scratch.TargetType.SPRITE]
                    },
                    {
                        opcode: 'hideTextBubble',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'hide text bubble',
                        filter: [Scratch.TargetType.SPRITE]
                    },
                    {
                        opcode: 'hideAllTextBubbles',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'hide all text bubbles'
                    },
                    {
                        opcode: 'setBubbleColor',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set bubble color to [COLOR]',
                        arguments: {
                            COLOR: {
                                type: Scratch.ArgumentType.COLOR,
                                defaultValue: '#ffffff'
                            }
                        }
                    },
                    {
                        opcode: 'setBubbleStyle',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set bubble style to [STYLE]',
                        arguments: {
                            STYLE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'bubbleStyleMenu',
                                defaultValue: 'default'
                            }
                        }
                    },
                    {
                        opcode: 'setBubblePadding',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set bubble padding to [PADDING]',
                        arguments: {
                            PADDING: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 15 // Valeur par défaut pour le padding
                            }
                        }
                    }
                ],
                menus: {
                    bubbleStyleMenu: {
                        acceptReporters: true,
                        items: ['default', 'rounded', 'sharp', 'shadow', 'no-border']
                    }
                }
            };
        }

        showTextBubble(args, util) {
            const sprite = util.target;
            const text = args.TEXT;
            const speed = args.SPEED;
            const font = args.FONT;
            const width = args.WIDTH;
            const offsetX = args.OFFSETX;
            const offsetY = args.OFFSETY;

            if (this.bubbles[sprite.id]) {
                clearInterval(this.bubbles[sprite.id].intervalId);
                this.bubbles[sprite.id].bubbleDiv.remove();
            }

            const bubbleDiv = document.createElement('div');
            bubbleDiv.style.position = 'absolute';
            this.applyBubbleStyle(bubbleDiv);
            bubbleDiv.style.maxWidth = `${width}px`;
            bubbleDiv.style.overflow = 'hidden';
            bubbleDiv.style.whiteSpace = 'pre-wrap';
            bubbleDiv.style.fontFamily = font;
            bubbleDiv.style.color = 'black';
            bubbleDiv.style.fontSize = '16px';
            bubbleDiv.style.lineHeight = '1.5';

            const canvas = Scratch.renderer.canvas;
            const rect = canvas.getBoundingClientRect();

            const textContainer = document.createElement('span');
            bubbleDiv.appendChild(textContainer);
            document.body.appendChild(bubbleDiv);

            const updateBubblePosition = () => {
                const { x, y } = sprite;

                const proportionX = rect.width / 480;
                const proportionY = rect.height / 360;

                const adjustedOffsetX = offsetX * proportionX;
                const adjustedOffsetY = offsetY * proportionY;

                bubbleDiv.style.left = `${rect.left + (x + 240) / 480 * rect.width + adjustedOffsetX}px`;
                bubbleDiv.style.top = `${rect.top + (180 - y) / 360 * rect.height + adjustedOffsetY}px`;
            };

            updateBubblePosition();
            window.addEventListener('mousemove', updateBubblePosition);

            const formattedText = this.formatText(text);
            const textParts = this.splitText(formattedText);

            let index = 0;
            let currentHTML = '';

            const intervalId = setInterval(() => {
                if (index < textParts.length) {
                    currentHTML += textParts[index];
                    textContainer.innerHTML = currentHTML;
                    index++;
                } else {
                    clearInterval(intervalId);
                }
            }, speed);

            this.bubbles[sprite.id] = { intervalId, bubbleDiv };
        }

        hideTextBubble(args, util) {
            const sprite = util.target;

            if (this.bubbles[sprite.id]) {
                clearInterval(this.bubbles[sprite.id].intervalId);
                this.bubbles[sprite.id].bubbleDiv.remove();
                delete this.bubbles[sprite.id];
            }
        }

        hideAllTextBubbles() {
            for (const spriteId in this.bubbles) {
                if (this.bubbles.hasOwnProperty(spriteId)) {
                    clearInterval(this.bubbles[spriteId].intervalId);
                    this.bubbles[spriteId].bubbleDiv.remove();
                    delete this.bubbles[spriteId];
                }
            }
        }

        setBubbleColor(args) {
            const color = args.COLOR;
            this.defaultBubbleStyle.backgroundColor = color;
        }

        setBubblePadding(args) {
            const padding = args.PADDING;
            this.defaultBubbleStyle.padding = `${padding}px`;
        }

        setBubbleStyle(args) {
            const style = args.STYLE;

            switch (style) {
                case 'rounded':
                    this.defaultBubbleStyle.borderRadius = '20px';
                    break;
                case 'sharp':
                    this.defaultBubbleStyle.borderRadius = '0px';
                    break;
                case 'shadow':
                    this.defaultBubbleStyle.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.5)';
                    break;
                case 'no-border':
                    this.defaultBubbleStyle.borderWidth = '0px';
                    break;
                default:
                    this.defaultBubbleStyle = {
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderColor: 'black',
                        borderWidth: '2px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        padding: '15px'
                    };
                    break;
            }
        }

        applyBubbleStyle(bubbleDiv) {
            bubbleDiv.style.backgroundColor = this.defaultBubbleStyle.backgroundColor;
            bubbleDiv.style.border = `${this.defaultBubbleStyle.borderWidth} solid ${this.defaultBubbleStyle.borderColor}`;
            bubbleDiv.style.borderRadius = this.defaultBubbleStyle.borderRadius;
            bubbleDiv.style.boxShadow = this.defaultBubbleStyle.boxShadow;
            bubbleDiv.style.padding = this.defaultBubbleStyle.padding;
        }

        formatText(text) {
            // Retourne le texte brut, seules les balises HTML sont interprétées
            return text;
        }

        splitText(text) {
            const parts = [];
            const tagRegex = /<\/?[^>]+>/g;
            let lastIndex = 0;

            text.replace(tagRegex, (match, index) => {
                if (index > lastIndex) {
                    parts.push(...text.slice(lastIndex, index).split(''));
                }
                parts.push(match);
                lastIndex = index + match.length;
            });

            if (lastIndex < text.length) {
                parts.push(...text.slice(lastIndex).split(''));
            }

            return parts;
        }
    }

    Scratch.extensions.register(new ScrollingTextBubble());
})(Scratch);
