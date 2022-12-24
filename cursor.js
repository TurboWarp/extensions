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
              { text: 'move', value: 'move' },
              { text: 'grab', value: 'grab' },
              { text: 'grabbing', value: 'grabbing' },
              { text: 'text', value: 'text' },
              { text: 'vertical-text', value: 'vertical-text' },
              { text: 'wait', value: 'wait' },
              { text: 'progress', value: 'progress' },
              { text: 'help', value: 'help' },
              { text: 'context-menu', value: 'context-menu' },
              { text: 'zoom-in', value: 'zoom-in' },
              { text: 'zoom-out', value: 'zoom-out' },
              { text: 'crosshair', value: 'crosshair' },
              { text: 'cell', value: 'cell' },
              { text: 'not-allowed', value: 'not-allowed' },
              { text: 'copy', value: 'copy' },
              { text: 'alias', value: 'alias' },
              { text: 'no-drop', value: 'no-drop' },
              { text: 'all-scroll', value: 'all-scroll' },
              { text: 'col-resize', value: 'col-resize' },
              { text: 'row-resize', value: 'row-resize' },
              { text: 'n-resize', value: 'n-resize' },
              { text: 'e-resize', value: 'e-resize' },
              { text: 's-resize', value: 's-resize' },
              { text: 'w-resize', value: 'w-resize' },
              { text: 'ne-resize', value: 'ne-resize' },
              { text: 'nw-resize', value: 'nw-resize' },
              { text: 'se-resize', value: 'se-resize' },
              { text: 'sw-resize', value: 'sw-resize' },
              { text: 'ew-resize', value: 'ew-resize' },
              { text: 'ns-resize', value: 'ns-resize' },
              { text: 'nesw-resize', value: 'nesw-resize' },
              { text: 'nwse-resize', value: 'nwse-resize' },
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
