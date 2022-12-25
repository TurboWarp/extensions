(function (Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('MouseCursor extension must be run unsandboxed');
  }

  const lazilyCreatedCanvas = () => {
    /** @type {HTMLCanvasElement} */
    let canvas = null;
    /** @type {CanvasRenderingContext2D} */
    let ctx = null;
    /**
     * @param {number} width
     * @param {number} height
     * @returns {[HTMLCanvasElement, CanvasRenderingContext2D]}
     */
    return (width, height) => {
      if (!canvas) {
        canvas = document.createElement('canvas');
        // TODO: getContext() can fail
        ctx = canvas.getContext('2d');
      }
      // This also automatically clears the canvas
      canvas.width = width;
      canvas.height = height;
      return [canvas, ctx];
    }
  };
  const getRawSkinCanvas = lazilyCreatedCanvas();
  const getResizingCanvas = lazilyCreatedCanvas();

  /**
   * @param {RenderWebGL.Skin} skin
   * @returns {HTMLCanvasElement}
   */
  const getRawImageFromSkin = (skin) => {
    // TODO: be more resilient to weird edge cases, unloaded costumes, etc.
    const silhouette = skin._silhouette;
    // @ts-expect-error
    if (silhouette.unlazy) {
      // @ts-expect-error
      silhouette.unlazy();
    }
    const colorData = silhouette._colorData;
    const width = silhouette._width;
    const height = silhouette._height;
    const imageData = new ImageData(colorData, silhouette._width, silhouette._height);
    const [canvas, ctx] = getRawSkinCanvas(width, height);
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  };

  /**
   * @param {RenderWebGL.Skin} skin
   * @param {number} width
   * @param {number} height
   * @returns {string}
   */
  const encodeRendererSkin = (skin, width, height) => {
    const rawSkin = getRawImageFromSkin(skin);
    if (rawSkin.width === width && rawSkin.height === height) {
      return rawSkin.toDataURL();
    }
    const [resizingCanvas, resizingCtx] = getResizingCanvas(width, height);
    resizingCtx.drawImage(rawSkin, 0, 0, width, height);
    return resizingCanvas.toDataURL();
  };

  /**
   * @param {VM.Costume} costume
   * @param {number} maxSize
   * @returns {{encoded: string, width: number, height: number}}
   */
  const costumeToCursor = (costume, maxSize) => {
    // @ts-expect-error
    const skin = Scratch.vm.renderer._allSkins[costume.skinId];

    let width = skin.size[0];
    let height = skin.size[1];
    if (width > maxSize || height > maxSize) {
      if (width > height) {
        height = Math.round(height * maxSize / width);
        width = maxSize;
      } else {
        width = Math.round(width * maxSize / height);
        height = maxSize;
      }
    }

    const encoded = encodeRendererSkin(skin, width, height);

    return {
      encoded,
      width,
      height
    };
  };

  /** @type {string} */
  let nativeCursor = 'default';
  /** @type {null|string} */
  let customCursorImageName = null;

  const canvas = Scratch.renderer.canvas;
  /** @type {string} */
  let currentCanvasCursor = nativeCursor;
  const updateCanvasCursor = () => {
    if (canvas.style.cursor !== currentCanvasCursor) {
      canvas.style.cursor = currentCanvasCursor;
    }
  };

  // scratch-gui will sometimes reset the cursor when resizing the window or going in/out of fullscreen
  new MutationObserver(updateCanvasCursor).observe(canvas, {
    attributeFilter: ['style'],
    attributes: true
  });

  class MouseCursor {
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
            text: "set cursor to current costume center: [position] max size: [size]",
            arguments: {
              position: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'top-left',
                menu: 'imagePositions'
              },
              size: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '32',
                menu: 'imageSizes'
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
          },
          imageSizes: {
            acceptReporters: true,
            items: [
              { text: '16x16', value: '16' },
              { text: '32x32', value: '32' },
              { text: '48x48 (unreliable)', value: '48' },
              { text: '64x64 (unreliable)', value: '64' },
            ]
          }
        },
      };
    }

    setCur(args) {
      const newCursor = args.cur;
      nativeCursor = newCursor;
      customCursorImageName = null;
      currentCanvasCursor = newCursor;
      updateCanvasCursor();
    }

    setCursorImage(args, util) {
      const maxSize = +args.size || 0;
      const positionName = args.position;

      const currentCostume = util.target.getCostumes()[util.target.currentCostume];
      const costumeName = currentCostume.name;
      const {encoded, width, height} = costumeToCursor(currentCostume, maxSize);

      let x = 0;
      let y = 0;
      if (positionName === 'top-left') {
        // initial value is already correct
      } else if (positionName === 'top-right') {
        x = width;
      } else if (positionName === 'bottom-left') {
        y = height;
      } else if (positionName === 'bottom-right') {
        x = width;
        y = height;
      } else if (positionName === 'center') {
        x = width / 2;
        y = height / 2;
      }

      customCursorImageName = costumeName;
      currentCanvasCursor = `url("${encoded}") ${x} ${y}, ${nativeCursor}`;
      updateCanvasCursor();
    }

    hideCur() {
      this.setCur({
        cur: 'none'
      });
    }

    getCur() {
      if (customCursorImageName !== null) {
        // TODO: should we try to "decorate" this a bit more?
        return customCursorImageName;
      }
      return nativeCursor;
    }
  }

  Scratch.extensions.register(new MouseCursor());
})(Scratch);
