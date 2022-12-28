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
        ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Could not get 2d rendering context');
        }
      }
      // Setting canvas size also clears it
      canvas.width = width;
      canvas.height = height;
      return [canvas, ctx];
    }
  };
  const getRawSkinCanvas = lazilyCreatedCanvas();

  /**
   * @param {RenderWebGL.Skin} skin
   * @returns {string}
   */
  const encodeSkinToURL = (skin) => {
    // TODO: be more resilient to weird edge cases, unloaded costumes, etc.

    const svgSkin = /** @type {RenderWebGL.SVGSkin} */ (skin);
    if (svgSkin._svgImage) {
      // This is an SVG skin
      return svgSkin._svgImage.src;
    }

    // It's probably a bitmap skin.
    // The most reliable way to get the bitmap in every runtime is through the silhouette.
    // This is very slow and could involve reading the texture from the GPU.
    const silhouette = skin._silhouette;
    // unlazy() only exists in TW
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
    return canvas.toDataURL();
  };

  /**
   * @param {VM.Costume} costume
   * @param {number} maxSize
   * @returns {{uri: string, width: number, height: number}}
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

    const imageURI = encodeSkinToURL(skin);

    // For high DPI displays, we want the browser to be able to show it at full resolution.
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`;
    svg += `<image href="${imageURI}" width="${width}" height="${height}" />`;
    svg += '</svg>';
    const svgURI = `data:image/svg+xml;base64,${btoa(svg)}`;

    return {
      uri: svgURI,
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

      let encodedCostume;
      try {
        encodedCostume = costumeToCursor(currentCostume, maxSize);
      } catch (e) {
        // This could happen for a variety of reasons.
        console.error(e);
      }

      if (encodedCostume) {
        let x = 0;
        let y = 0;
        if (positionName === 'top-left') {
          // initial value is already correct
        } else if (positionName === 'top-right') {
          x = encodedCostume.width;
        } else if (positionName === 'bottom-left') {
          y = encodedCostume.height;
        } else if (positionName === 'bottom-right') {
          x = encodedCostume.width;
          y = encodedCostume.height;
        } else if (positionName === 'center') {
          x = encodedCostume.width / 2;
          y = encodedCostume.height / 2;
        }

        currentCanvasCursor = `url("${encodedCostume.uri}") ${x} ${y}, ${nativeCursor}`;
        updateCanvasCursor();
      } else {
        // If for some reason the costume couldn't be encoded, we'll leave the cursor unchanged.
        // This is the same behavior that would happen if we successfully encode a cursor but the browser
        // is unable to parse it for some reason.
      }

      customCursorImageName = costumeName;
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
