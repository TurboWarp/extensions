// Name: Mouse Cursor
// ID: MouseCursor
// Description: Use custom cursors or hide the cursor. Also allows replacing the cursor with any costume image.

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("MouseCursor extension must be run unsandboxed");
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
        canvas = document.createElement("canvas");
        ctx = canvas.getContext("2d");
        if (!ctx) {
          throw new Error("Could not get 2d rendering context");
        }
      }
      // Setting canvas size also clears it
      canvas.width = width;
      canvas.height = height;
      return [canvas, ctx];
    };
  };
  const getRawSkinCanvas = lazilyCreatedCanvas();

  /**
   * @param {RenderWebGL.Skin} skin
   * @returns {string} A data: URI for the skin.
   */
  const encodeSkinToURL = (skin) => {
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
    if (silhouette.unlazy) {
      silhouette.unlazy();
    }
    const colorData = silhouette._colorData;
    const width = silhouette._width;
    const height = silhouette._height;
    const imageData = new ImageData(
      colorData,
      silhouette._width,
      silhouette._height
    );
    const [canvas, ctx] = getRawSkinCanvas(width, height);
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  };

  /**
   * @param {VM.Costume} costume
   * @param {number} maxWidth
   * @param {number} maxHeight
   * @returns {{uri: string, width: number, height: number}}
   */
  const costumeToCursor = (costume, maxWidth, maxHeight) => {
    const skin = Scratch.vm.renderer._allSkins[costume.skinId];
    const imageURI = encodeSkinToURL(skin);

    let width = skin.size[0];
    let height = skin.size[1];
    if (width > maxWidth) {
      height = height * (maxWidth / width);
      width = maxWidth;
    }
    if (height > maxHeight) {
      width = width * (maxHeight / height);
      height = maxHeight;
    }
    width = Math.round(width);
    height = Math.round(height);

    // We wrap the encoded image in an <svg>. This lets us do some clever things:
    //  - We can resize the image without a canvas.
    //  - We can give the browser an image with more raw pixels than its DPI independent size.
    // The latter is important so that cursors won't look horrible on high DPI displays. For
    // example, if the cursor will display at 32x32 in DPI independent units on a 2x high DPI
    // display, we actually need to send a 64x64 image for it to look good. This lets us do
    // that automatically.
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`;
    svg += `<image href="${imageURI}" width="${width}" height="${height}" />`;
    svg += "</svg>";
    // URI encoding usually results in smaller string than base 64 for the types of data we get here.
    const svgURI = `data:image/svg+xml;,${encodeURIComponent(svg)}`;

    return {
      uri: svgURI,
      width,
      height,
    };
  };

  /** @type {string} */
  let nativeCursor = "default";
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
    attributeFilter: ["style"],
    attributes: true,
  });

  /**
   * Parse strings like "60x12" or "77,1"
   * @param {string} string
   * @returns {[number, number]}
   */
  const parseTuple = (string) => {
    const [a, b] = ("" + string).split(/[ ,x]/);
    return [+a || 0, +b || 0];
  };

  const cursors = [
    "default",
    "pointer",
    "move",
    "grab",
    "grabbing",
    "text",
    "vertical-text",
    "wait",
    "progress",
    "help",
    "context-menu",
    "zoom-in",
    "zoom-out",
    "crosshair",
    "cell",
    "not-allowed",
    "copy",
    "alias",
    "no-drop",
    "all-scroll",
    "col-resize",
    "row-resize",
    "n-resize",
    "e-resize",
    "s-resize",
    "w-resize",
    "ne-resize",
    "nw-resize",
    "se-resize",
    "sw-resize",
    "ew-resize",
    "ns-resize",
    "nesw-resize",
    "nwse-resize",
  ];

  class MouseCursor {
    constructor() {
      Scratch.vm.runtime.on("RUNTIME_DISPOSED", () => {
        this.setCur({
          cur: "default",
        });
      });
    }
    getInfo() {
      return {
        id: "MouseCursor",
        name: "Mouse Cursor",
        blocks: [
          {
            opcode: "setCur",
            blockType: Scratch.BlockType.COMMAND,
            text: "set cursor to [cur]",
            arguments: {
              cur: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "pointer",
                menu: "cursors",
              },
            },
          },
          {
            opcode: "setCursorImage",
            blockType: Scratch.BlockType.COMMAND,
            text: "set cursor to current costume center: [position] max size: [size]",
            arguments: {
              position: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0,0",
                menu: "imagePositions",
              },
              size: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "32x32",
                menu: "imageSizes",
              },
            },
          },
          {
            opcode: "hideCur",
            blockType: Scratch.BlockType.COMMAND,
            text: "hide cursor",
          },
          {
            opcode: "getCur",
            blockType: Scratch.BlockType.REPORTER,
            text: "cursor",
          },
        ],
        menus: {
          cursors: {
            acceptReporters: true,
            items: cursors,
          },
          imagePositions: {
            acceptReporters: true,
            items: [
              // [x, y] where x is [0=left, 100=right] and y is [0=top, 100=bottom]
              { text: "top left", value: "0,0" },
              { text: "top right", value: "100,0" },
              { text: "bottom left", value: "0,100" },
              { text: "bottom right", value: "100,100" },
              { text: "center", value: "50,50" },
            ],
          },
          imageSizes: {
            acceptReporters: true,
            items: [
              // Some important numbers to keep in mind:
              // Browsers ignore cursor images >128 in any dimension (https://searchfox.org/mozilla-central/rev/43ee5e789b079e94837a21336e9ce2420658fd19/widget/gtk/nsWindow.cpp#3393-3402)
              // Browsers may refuse to display a cursor near window borders for images >32 in any dimension
              { text: "4x4", value: "4x4" },
              { text: "8x8", value: "8x4" },
              { text: "12x12", value: "12x12" },
              { text: "16x16", value: "16x16" },
              { text: "32x32", value: "32x32" },
              { text: "48x48 (unreliable)", value: "48x48" },
              { text: "64x64 (unreliable)", value: "64x64" },
              { text: "128x128 (unreliable)", value: "128x128" },
            ],
          },
        },
      };
    }

    setCur(args) {
      const newCursor = Scratch.Cast.toString(args.cur);
      // Prevent setting cursor to "url(...), default" from causing fetch.
      if (cursors.includes(newCursor) || newCursor === "none") {
        nativeCursor = newCursor;
        customCursorImageName = null;
        currentCanvasCursor = newCursor;
        updateCanvasCursor();
      }
    }

    setCursorImage(args, util) {
      const [maxWidth, maxHeight] = parseTuple(args.size).map((i) =>
        Math.max(0, i)
      );

      const currentCostume =
        util.target.getCostumes()[util.target.currentCostume];
      const costumeName = currentCostume.name;

      let encodedCostume;
      try {
        encodedCostume = costumeToCursor(currentCostume, maxWidth, maxHeight);
      } catch (e) {
        // This could happen for a variety of reasons.
        console.error(e);
      }

      if (encodedCostume) {
        const [percentX, percentY] = parseTuple(args.position).map(
          (i) => Math.max(0, Math.min(100, i)) / 100
        );
        const x = percentX * encodedCostume.width;
        const y = percentY * encodedCostume.height;

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
        cur: "none",
      });
    }

    getCur() {
      if (customCursorImageName !== null) {
        return customCursorImageName;
      }
      return nativeCursor;
    }
  }

  Scratch.extensions.register(new MouseCursor());
})(Scratch);
