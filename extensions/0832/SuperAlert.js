    (function (Scratch) {
        'use strict';
        var b = false;
        var c;
        Scratch.translate.setup({
            zh: {
                name: '弹窗',
                show_alert: '显示弹窗',
                hide_alert: '隐藏弹窗',
                set_title: '设置弹窗标题为 [L]',
                set_content: '设置弹窗内容为 [M]',
                set_position: '设置弹窗位置为 X: [X] Y: [Y]',
                set_text: '设置 [T] 文本为 [C]',
                align_title: '将标题文本对齐到 [A]',
                align_content: '将内容文本对齐到 [A]',
                set_font: '设置 [T] 字体为 [F]',
                set_text_color: '设置 [T] 文本颜色为 [C]',
                set_text_size: '将 [T] 文本大小设置为 [S]px'
            },
        });

        function d() {
            c = document.createElement("div");
            c.style.position = "fixed";
            c.style.backgroundColor = "white";
            c.style.border = "1px solid black";
            c.style.top = "50%";
            c.style.left = "50%";
            c.style.transform = "translate(-50%, -50%)";
            c.style.display = "none";
            c.style.borderRadius = "10px";
            c.style.color = "white";
            c.style.backgroundColor = "black";
            c.style.border = "1px solid white";
            c.style.padding = "20px";
            c.style.textAlign = "center";
            c.style.transition = "opacity 0.3s, transform 0.3s";
            c.style.opacity = "0";
            document.body.appendChild(c);
            setTimeout(function () {
                b = true;
                c.style.opacity = "1";
                c.style.transform = "translate(-50%, -50%) scale(1)";
                c.style.display = "block";
            }, 100);
        }

        function e() {
            c.style.opacity = "0";
            c.style.transform = "translate(-50%, -50%) scale(0)";
            setTimeout(function () {
                document.body.removeChild(c);
                b = false;
            }, 300);
        }

        class f {
            constructor() {
                this.g = "";
                this.h = "";
                this.xPos = -50; // Default X position
                this.yPos = -50; // Default Y position
                this.titleFont = "Arial";
                this.contentFont = "Arial";
                this.titleColor = "white";
                this.contentColor = "white";
                this.titleSize = 24;
                this.contentSize = 16;
                this.outlineSize = 1;
            }
            d() {
                if (!b) {
                    d();
                    c.style.display = "block";
                    this.i();
                }
            }

            e() {
                if (b) {
                    e();
                }
            }

            j(k) {
                this.g = k.L;
                this.i();
            }

            l(k) {
                this.h = k.M;
                this.i();
            }

            p(k) {
                this.xPos = k.X;
                this.yPos = k.Y;
                this.i();
            }

            setFont(k) {
                if (k.T === 'Title') {
                    this.titleFont = k.F;
                } else if (k.T === 'Content') {
                    this.contentFont = k.F;
                }
                this.i();
            }

            setTextColor(k) {
                if (k.T === 'Title') {
                    this.titleColor = k.C;
                } else if (k.T === 'Content') {
                    this.contentColor = k.C;
                }
                this.i();
            }

            setTextSize(k) {
                if (k.T === 'Title') {
                    this.titleSize = k.S;
                } else if (k.T === 'Content') {
                    this.contentSize = k.S;
                }
                this.i();
            }

            alignTitleText(k) {
                this.titleAlignment = k.A;
                this.i();
            }

            alignContentText(k) {
                this.contentAlignment = k.A;
                this.i();
            }

            i() {
                if (b) {
                    c.style.opacity = "0";
                    c.style.transform = `translate(${this.xPos}%, ${this.yPos}%) scale(0)`;
                    setTimeout(() => {
                        c.innerHTML = `
                <h2 style="margin-bottom: 10px; font-family: ${this.titleFont}; font-size: ${this.titleSize}px; color: ${this.titleColor}; text-shadow: ${this.outlineSize}px ${this.outlineSize}px 0px rgba(0, 0, 0, 0.7); text-align: ${this.titleAlignment};">${this.g}</h2>
                <p style="font-family: ${this.contentFont}; font-size: ${this.contentSize}px; color: ${this.contentColor}; text-shadow: ${this.outlineSize}px ${this.outlineSize}px 0px rgba(0, 0, 0, 0.7); text-align: ${this.contentAlignment};">${this.h}</p>
                `;
                        c.style.opacity = "1";
                        c.style.transform = `translate(${this.xPos}%, ${this.yPos}%) scale(1)`;
                    }, 300);
                }
            }

            getInfo() {
                return {
                    id: 'tc',
                    name: Scratch.translate({ id: 'name', default: 'Alert' }),
                    color1:"#000000",
                    color2:"#ffffff",
                    color3:"#ffffff",
                    blocks: [
                        {
                            opcode: 'd',
                            blockType: Scratch.BlockType.COMMAND,
                            text: Scratch.translate({ id: 'show_alert', default: 'Show alert' })
                        },
                        {
                            opcode: 'e',
                            blockType: Scratch.BlockType.COMMAND,
                            text: Scratch.translate({ id: 'hide_alert', default: 'Hide alert' })
                        },
                        {
                            opcode: 'j',
                            blockType: Scratch.BlockType.COMMAND,
                            text: Scratch.translate({ id: 'set_title', default: 'Set the alert title to [L]' }),
                            arguments: {
                                L: {
                                    type: Scratch.ArgumentType.STRING,
                                    defaultValue: 'Title',
                                },
                            },
                        },
                        {
                            opcode: 'l',
                            blockType: Scratch.BlockType.COMMAND,
                            text: Scratch.translate({ id: 'set_content', default: 'Set the alert content to [M]' }),
                            arguments: {
                                M: {
                                    type: Scratch.ArgumentType.STRING,
                                    defaultValue: 'Content',
                                },
                            },
                        },
                        '---',
                        {
                            opcode: 'p',
                            blockType: Scratch.BlockType.COMMAND,
                            text: Scratch.translate({ id: 'set_position', default: 'Set alert position to X: [X] Y: [Y]' }),
                            arguments: {
                                X: {
                                    type: Scratch.ArgumentType.NUMBER,
                                    defaultValue: -50,
                                },
                                Y: {
                                    type: Scratch.ArgumentType.NUMBER,
                                    defaultValue: -50,
                                },
                            },
                        },
                        {
                            opcode: 'setFont',
                            blockType: Scratch.BlockType.COMMAND,
                            text: Scratch.translate({ id: 'set_font', default: 'Set [T] font to [F]' }),
                            arguments: {
                                T: {
                                    type: Scratch.ArgumentType.STRING,
                                    menu: 'textOptions',
                                    defaultValue: 'Title',
                                },
                                F: {
                                    type: Scratch.ArgumentType.STRING,
                                    menu: 'fontOptions',
                                    defaultValue: 'Arial',
                                },
                            },
                        },
                        {
                            opcode: 'setTextColor',
                            blockType: Scratch.BlockType.COMMAND,
                            text: Scratch.translate({ id: 'set_text_color', default: 'Set [T] text color to [C]' }),
                            arguments: {
                                T: {
                                    type: Scratch.ArgumentType.STRING,
                                    menu: 'textOptions',
                                    defaultValue: 'Title',
                                },
                                C: {
                                    type: Scratch.ArgumentType.STRING,
                                    defaultValue: '#FFFFFF',
                                },
                            },
                        },
                        {
                            opcode: 'setTextSize',
                            blockType: Scratch.BlockType.COMMAND,
                            text: Scratch.translate({ id: 'set_text_size', default: 'Set [T] text size to [S]px' }),
                            arguments: {
                                T: {
                                    type: Scratch.ArgumentType.STRING,
                                    menu: 'textOptions',
                                    defaultValue: 'Title',
                                },
                                S: {
                                    type: Scratch.ArgumentType.NUMBER,
                                    defaultValue: 24,
                                },
                            },
                        },
                        {
                            opcode: 'alignTitleText',
                            blockType: Scratch.BlockType.COMMAND,
                            text: Scratch.translate({ id: 'align_title', default: 'Align title text to [A]' }),
                            arguments: {
                                A: {
                                    type: Scratch.ArgumentType.STRING,
                                    menu: 'alignmentOptions',
                                    defaultValue: 'center',
                                },
                            },
                        },
                        {
                            opcode: 'alignContentText',
                            blockType: Scratch.BlockType.COMMAND,
                            text: Scratch.translate({ id: 'align_content', default: 'Align content text to [A]' }),
                            arguments: {
                                A: {
                                    type: Scratch.ArgumentType.STRING,
                                    menu: 'alignmentOptions',
                                    defaultValue: 'center',
                                },
                            },
                        },
                    ],
                    menus: {
                        textOptions: [
                            { text: 'Title', value: 'Title' },
                            { text: 'Content', value: 'Content' },
                        ],
                        alignmentOptions: [
                            { text: 'Left', value: 'left' },
                            { text: 'Center', value: 'center' },
                            { text: 'Right', value: 'right' },
                        ],
                        fontOptions: [
                            { text: 'Arial', value: 'Arial' },
                            { text: 'Impact', value: 'Impact' },
                            { text: 'Verdana', value: 'Verdana' },
                            // Add more built-in fonts here
                            { text: 'Times New Roman', value: 'Times New Roman' },
                            { text: 'Georgia', value: 'Georgia' },
                            { text: 'Courier New', value: 'Courier New' },
                            { text: 'Tahoma', value: 'Tahoma' },
                            { text: 'Trebuchet MS', value: 'Trebuchet MS' },
                            { text: 'Comic Sans MS', value: 'Comic Sans MS' },
                            { text: 'Arial Black', value: 'Arial Black' },
                            { text: 'Courier', value: 'Courier' },
                            { text: 'Garamond', value: 'Garamond' },
                            { text: 'Brush Script MT', value: 'Brush Script MT' },
                            { text: 'Palatino Linotype', value: 'Palatino Linotype' },
                            { text: 'Lucida Console', value: 'Lucida Console' },
                        ],
                    },
                };
            }
        }

        Scratch.extensions.register(new f());
    })(Scratch);
