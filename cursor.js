(function (Scratch) {
  'use strict';

  class MouseCursor {
    constructor() {
      this.canvas = Scratch.renderer.canvas;
    }

    getInfo() {
      return {
        id: 'mouseCursor',
        name: 'Mouse Cursor',
        blocks: [
          {
            opcode: 'setCur',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set cursor to [cur]',
            arguments: {
              cur: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'pointer',
                menu: 'cursors',
              },
            },
          },
          {
            opcode: 'hideCur',
            blockType: Scratch.BlockType.COMMAND,
            text: 'hide cursor',
          },
          {
            opcode: 'getCur',
            blockType: Scratch.BlockType.REPORTER,
            text: 'cursor',
          },
        ],
        menus: {
          cursors: {
            acceptReporters: true,
            items: [
              { text: 'default', value: 'default' },
              { text: 'pointer', value: 'pointer' },
              { text: 'crosshair', value: 'crosshair' },
              { text: 'move', value: 'move' },
              { text: 'text', value: 'text' },
              { text: 'wait', value: 'wait' },
              { text: 'progress', value: 'progress' },
              { text: 'help', value: 'help' },
            ],
          },
        },
      };
    }

    setCur({ cur }) {
      this.canvas.style.cursor = cur;
    }

    hideCur() {
      this.canvas.style.cursor = 'none';
    }

    getCur() {
      return this.canvas.style.cursor || 'default';
    }
  }

  Scratch.extensions.register(new MouseCursor());
})(Scratch);
