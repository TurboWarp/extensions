// Name: Tab_Utils
// By: @mistium on discord
// Description: Detect when the tab key is pressed and allow it to be disabled and enabled.

(function (Scratch) {
    "use strict";

    class TabControlExtension {
        constructor() {
            this.tabEnabled = true;
            this.tab_pressed = false;
            // Disable tab key by default
            document.addEventListener('keydown', this.handleTabKeyDown.bind(this));
            document.addEventListener('keyup', this.handleTabKeyUp.bind(this));
        }

        getInfo() {
            return {
                id: 'tabcontrol',
                name: 'Tab Control',
                blocks: [
                    {
                        opcode: 'disableTabKey',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Use Default Tab Method',
                    },
                    {
                        opcode: 'enableTabKey',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Make Tab Into A Normal Key',
                    },
                    {
                        opcode: 'tabKeyPressed',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'Tab Key Pressed?',
                    },
                ],
            };
        }

        disableTabKey() {
            this.tabEnabled = false;
        }

        enableTabKey() {
            this.tabEnabled = true;
        }

        tabKeyPressed() {
            return this.tab_pressed;
        }

        handleTabKeyDown(event) {
            if (event.key === 'Tab' && !this.tabEnabled) {
                event.preventDefault();
                this.tab_pressed = true;
            }
        }

        handleTabKeyUp(event) {
            if (event.key === 'Tab') {
                this.tab_pressed = false;
            }
        }
    }

    Scratch.extensions.register(new TabControlExtension());
})(Scratch);
