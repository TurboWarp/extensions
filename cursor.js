(function (Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('MouseCursor extension must be run unsandboxed');
  }

  class MouseCursor {
    constructor() {
      this.canvas = Scratch.renderer.canvas;
    }

    getInfo() {
      return {
        id: 'MouseCursor',
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
              { text: 'grab', value: 'grab' },
              { text: 'text', value: 'text' },
              { text: 'wait', value: 'wait' },
              { text: 'progress', value: 'progress' },
              { text: 'help', value: 'help' },
              { text: 'none', value: 'none' },
            ],
          },
        },
      };
    }

    setCur(args) {
      this.canvas.style.cursor = args.cur;
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
