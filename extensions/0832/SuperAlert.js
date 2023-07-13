(function (Scratch) {
    'use strict';
    var b = false;
    var c;

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

        i() {
            if (b) {
                c.style.opacity = "0";
                c.style.transform = "translate(-50%, -50%) scale(0)";
                setTimeout(() => {
                    c.innerHTML = `
              <h2 style="margin-bottom: 10px;">${this.g}</h2>
              <p>${this.h}</p>
            `;
                    c.style.opacity = "1";
                    c.style.transform = "translate(-50%, -50%) scale(1)";
                }, 300);
            }
        }

        getInfo() {
            return {
                id: 'tc',
                name: '弹窗',
                blocks: [
                    {
                        opcode: 'd',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '显示弹窗',
                    },
                    {
                        opcode: 'e',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '隐藏弹窗',
                    },
                    {
                        opcode: 'j',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置弹窗标题为 [L]',
                        arguments: {
                            L: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '标题',
                            },
                        },
                    },
                    {
                        opcode: 'l',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置弹窗内容为 [M]',
                        arguments: {
                            M: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '内容',
                            },
                        },
                    },
                ],
            };
        }
    }

    Scratch.extensions.register(new f());
})(Scratch);
