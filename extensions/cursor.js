(function (Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('MouseCursor extension must be run unsandboxed');
  }

  class MouseCursor {
    constructor() {
      this.canvas = Scratch.renderer.canvas;
      this.intendedNativeCursor = 'default';
      this.customCursorImageName = null;
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
            opcode: 'setCursorImage',
            blockType: Scratch.BlockType.COMMAND,
            text: "set cursor to this sprite's costume at [position]",
            arguments: {
              position: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'top-left',
                menu: 'imagePositions'
              }
            }
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
            ],
          },
          imagePositions: {
            acceptReporters: true,
            items: [
              { text: 'top-left', value: 'top-left' },
              { text: 'top-right', value: 'top-right' },
              { text: 'bottom-left', value: 'bottom-left' },
              { text: 'bottom-right', value: 'bottom-right' },
              { text: 'center', value: 'center' },
            ]
          }
        },
      };
    }

    setCur(args) {
      const cursor = args.cur;
      this.intendedNativeCursor = cursor;
      this.customCursorImageName = null;
      this.canvas.style.cursor = cursor;
    }

    setCursorImage(args, util) {
      // TODO: this isn't going to work in the packager/packaged runtime mode
      const currentCostume = util.target.getCostumes()[util.target.currentCostume];
      const costumeName = currentCostume.name;
      const encodedCostume = currentCostume.asset.encodeDataURI();
      const costumeSize = currentCostume.size; // [width, height]

      const positionName = args.position;
      const position = [0, 0]; // [x, y]
      if (positionName === 'top-left') {
        // initial value is already correct
      } else if (positionName === 'top-right') {
        position[0] = costumeSize[0];
      } else if (positionName === 'bottom-left') {
        position[1] = costumeSize[1];
      } else if (positionName === 'bottom-right') {
        position[0] = costumeSize[0];
        position[1] = costumeSize[1];
      } else if (positionName === 'center') {
        position[0] = costumeSize[0] / 2;
        position[1] = costumeSize[1] / 2;
      }

      this.customCursorImageName = costumeName;
      this.canvas.style.cursor = `url("${encodedCostume}") ${position[0]} ${position[1]}, ${this.intendedNativeCursor}`;
    }

    hideCur() {
      this.setCur({
        cur: 'none'
      });
    }

    getCur() {
      if (this.customCursorImageName !== null) {
        // TODO: should we try to "decorate" this a bit more?
        return this.customCursorImageName;
      }
      return this.intendedNativeCursor;
    }
  }

  Scratch.extensions.register(new MouseCursor());
})(Scratch);
