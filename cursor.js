(function (Scratch) {
    'use strict';

    class MouseCursor {
        constructor() {
            this.canvas = Scratch.renderer.canvas;
        }

        getInfo() {
            return {
              id: "MouseCursor",
              name: "Mouse Cursor",
              blocks: [
                {
                  opcode: "SwitchCur",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "switch cursor to [cur]",
                  arguments: {
                    cur: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue: "pointer",
                      menu: "cursors",
                    },
                  },
                },
                {
                  opcode: "hide",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "hide cursor",
                },
                {
                  opcode: "GetCur",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "cursor",
                },
              ],

              menus: {
                cursors: {
                  acceptReporters: true,
                  items: [
                    {text: "default", value: "default"},
                    {text: "pointer", value: "pointer"},
                    {text: "crosshair", value: "crosshair"},
                    {text: "move", value: "move"},
                    {text: "text", value: "text"},
                    {text: "wait", value: "wait"},
                    {text: "progress", value: "progress"},
                    {text: "help", value: "help"},
                  ],
                },
              },
            };
        }

        SwitchCur({ cur }) {
            this.canvas.style.cursor = cur;
        }

        hide() {
            this.canvas.style.cursor = "none";
        }

        GetCur() {
            return this.canvas.style.cursor || 'default';
        }
    }

    Scratch.extensions.register(new MouseCursor());
})(Scratch);
