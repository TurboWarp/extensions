// Name: Image Effects
// ID: imgEffectsSP
// Description: Apply a variety of visual effects to images.
// By: SharkPool
// Licence: MIT

// Version V.3.0.0

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Image Effects must run unsandboxed");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDUuOTU1IiBoZWlnaHQ9IjE0NS45NTUiIHZpZXdCb3g9IjAgMCAxNDUuOTU1IDE0NS45NTUiPjxwYXRoIGQ9Ik0wIDcyLjk3N0MwIDMyLjY3MiAzMi42NzIgMCA3Mi45NzcgMHM3Mi45NzcgMzIuNjcyIDcyLjk3NyA3Mi45NzctMzIuNjcyIDcyLjk3Ny03Mi45NzcgNzIuOTc3UzAgMTEzLjI4MiAwIDcyLjk3NyIgZmlsbD0iIzc3NGRjYiIvPjxwYXRoIGQ9Ik04Ljg2MyA3Mi45NzdjMC0zNS40MSAyOC43MDUtNjQuMTE1IDY0LjExNS02NC4xMTVzNjQuMTE0IDI4LjcwNSA2NC4xMTQgNjQuMTE1LTI4LjcwNSA2NC4xMTYtNjQuMTE1IDY0LjExNlM4Ljg2MiAxMDguMzg3IDguODYyIDcyLjk3N3oiIGZpbGw9IiM5NmYiLz48cGF0aCBkPSJNMTA1LjI3OCA3NC44MDljLTIuMDQgMS4xODQtMTAuMTg2LjE4Ny0xMS42NTUgMS44NzQtNS43MjMgNi41NzItNS41NTkgMjIuNzgyLTYuMTkgMjQtLjc5MyAxLjUzLTIuNzkyIDIuMDQ1LTMuODUzIDAtLjg3LTEuNjgyLjE0Mi0xNy45ODgtNS44NzQtMjMuOTg2LTEuMzA1LTEuMzAyLTkuMzM1LS45NC0xMC45Ny0xLjg4OHMtMi4wNC0zLjE0NiAwLTQuMzNjMi4wMzktMS4xODMgOS42LS4xOSAxMS42NzktMy40MyA0LjIxNS01LjI5NSA0LjUzNy0yMS4yMzIgNS4xNjUtMjIuNDQ0Ljc5My0xLjUzIDIuNzkyLTIuMDQ2IDMuODUzIDAgLjgzOSAxLjYxOCAxLjMxOSAxNi43NDQgNi44NyAyMy4yNzggMS40NjkgMS43MyA5LjUxMyAxLjc0OCAxMC45NzUgMi41OTZzMi4wNCAzLjE0NyAwIDQuMzN6IiBmaWxsPSIjZmZmIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNCIvPjxwYXRoIGQ9Ik02NS44MDMgNTIuNzY3Yy0xLjA2Ni42MTgtNS43MzMuNjMtNi44MDUgMS44OTMtNC4wNDggNC43NjUtMi41OTggNy43OTYtMy4yMSA4Ljk3NS0uNzczIDEuNDkzLTIuMjMgMS4xMTYtMi44MSAwLS40NTctLjg4NC40NTEtNC4wMi0zLjQ3NC04Ljg1NC0xLjAzLTEuMjY5LTQuMjIyLTEuMzUyLTUuNzA5LTIuMjE1cy0xLjE5Mi0yLjQ2NiAwLTMuMTU4IDQuODQ4LS4yMjcgNS44LTEuMTc2YzQuMzg3LTQuMzc0IDIuNzQ5LTcuMjY2IDMuMzg0LTguNDkyLjc3NC0xLjQ5MiAyLjIzMi0xLjExNSAyLjgxIDAgLjQ2Ljg4OC0xLjQ2IDMuNzA5IDIuNzE0IDguNTAyIDEuMDcxIDEuMjMgNS44MTIuNTAzIDcuMyAxLjM2NnMxLjA2NiAyLjU0IDAgMy4xNTl6TTQzLjU4NSA5NS4yNzZjMS4wNjYtLjYxOSA1LjczMi0uNjMyIDYuODA0LTEuODkzIDQuMDQ4LTQuNzY2IDIuNTk4LTcuNzk2IDMuMjEtOC45NzYuNzczLTEuNDkyIDIuMjMxLTEuMTE2IDIuODEgMCAuNDU4Ljg4NC0uNDUgNC4wMiAzLjQ3NCA4Ljg1NCAxLjAzIDEuMjcgNC4yMjIgMS4zNTIgNS43MSAyLjIxNSAxLjQ4Ni44NjMgMS4xOTEgMi40NjYgMCAzLjE1OC0xLjE5My42OTItNC44NDkuMjI3LTUuOCAxLjE3Ni00LjM4OCA0LjM3NC0yLjc1IDcuMjY2LTMuMzg1IDguNDkyLS43NzMgMS40OTItMi4yMzEgMS4xMTYtMi44MSAwLS40Ni0uODg3IDEuNDYtMy43MDktMi43MTMtOC41MDItMS4wNzItMS4yMy01LjgxMy0uNTAzLTcuMy0xLjM2NnMtMS4wNjctMi41NCAwLTMuMTU4eiIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIuNSIvPjwvc3ZnPg==";

  const Cast = Scratch.Cast;
  const runtime = Scratch.vm.runtime;

  /**
   * Generates an item for a block dropdown menu.
   * 
   * @param text {String} Text value of menu item
   * @param value {String|undefined} Value of menu item, uses 'text' param if undefined
   * @returns Menu item object
   */
  const genMenuItem = (text, value) => {
    return {
      text: Scratch.translate(text),
      value: value ?? text
    };
  };

  const INVALID_IMG = "Invalid image. Must be a valid URL, Data.URI, or SVG";
  const DEFAULT_IMG_VALUE = "...";
  const EFFECTS_MENU = [
    genMenuItem("saturation"),
    genMenuItem("contrast"),
    genMenuItem("opaque"),
    genMenuItem("glitch"),
    genMenuItem("chunk glitch"),
    genMenuItem("clip glitch"),
    genMenuItem("vignette"),
    genMenuItem("ripple"),
    genMenuItem("displacement"),
    genMenuItem("posterize"),
    genMenuItem("blur"),
    genMenuItem("sepia"),
    genMenuItem("scanlines"),
    genMenuItem("grain"),
    genMenuItem("cubism")
  ];

  class ImageCache {
    /**
     * @typedef {Object} ImageItem
     * @property {HTMLImageElement} img Image element
     * @property {ImageData} data Image data
     */

    /** @type {Map<String, ImageItem>} */
    static cache = new Map();

    static clear() {
      ImageCache.cache.clear();
    }

    static getHash(source) {
      // Create an ID from the image source that can be used for caching.
      // Hash the source to minimize it for cache.
      const rawData = source.split(",").pop();

      let hash = 0x811c9dc5;
      for (let i = 0; i < rawData.length; i++) {
        hash ^= rawData.charCodeAt(i);
        hash = Math.imul(hash, 0x01000193);
      }

      return hash.toString(36);
    }

    static set(hash, image) {
      const oldCache = ImageCache.get(hash);

      ImageCache.cache.set(hash, {
        img: image.src ?? oldCache.img,
        data: image.data ?? oldCache.data,
      });
    }

    static get(hash) {
      if (ImageCache.cache.has(hash)) {
        return ImageCache.cache.get(hash);
      }

      return {};
    }
  }

  class ImageHelper {
    static HEX_COLOR_REGEX = /^#[0-9A-F]{6}[0-9a-f]{0,2}$/i;
    static TO_RAD = Math.PI / 180;
    static canvas = document.createElement("canvas");
    static context = ImageHelper.canvas.getContext("2d", { willReadFrequently: true });
    static currentImageHash = null;

    static _validateSource(input) {
      input = Cast.toString(input).trim();
      if (!input) return null;

      if (input.startsWith("<svg")) {
        /* global Base64 */
        const data = typeof Base64 !== "undefined" ? Base64.toBase64(input) : btoa(input);
        return `data:image/svg+xml;base64,${data}`;
      }

      const isURL = input.startsWith("http");
      const isDataURI = input.startsWith("data:image/");
      if (isURL || isDataURI) return input;
      return null;
    }

    static _clearStage(width, height) {
      width = Math.max(1, Math.abs(width));
      height = Math.max(1, Math.abs(height));

      const { canvas, context } = ImageHelper.getHelper();
      context.globalCompositeOperation = "source-over";
      if (width === canvas.width && height === canvas.height) {
        context.resetTransform();
        context.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        canvas.width = width;
        canvas.height = height;
      }
    }

    static _cloneImageData(imageData) {
      return new ImageData(
        new Uint8ClampedArray(imageData.data),
        imageData.width,
        imageData.height
      );
    }

    static hexToRgba(hex) {
      hex = Cast.toString(hex);
      if (!ImageHelper.HEX_COLOR_REGEX.test(hex)) return [0, 0, 0, 0]; // black

      return [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16),
        hex.length > 8 ? parseInt(hex.slice(7, 9), 16) : 255
      ];
    }

    static rgbaToHex(rgba) {
      const alpha = rgba[3] !== undefined ? Math.round(rgba[3]).toString(16).padStart(2, "0") : "";
      const rgbHex = (1 << 24 | rgba[0] << 16 | rgba[1] << 8 | rgba[2]).toString(16).slice(1);

      return `#${rgbHex}${alpha}`;
    }

    static clamp(min, max, value) {
      return Math.min(max, Math.max(min, value));
    }

    static channel(value) {
      return Math.min(255, Math.max(0, value));
    }

    static getHelper() {
      return {
        canvas: ImageHelper.canvas,
        context: ImageHelper.context,
      };
    }

    static prepCanvas(image, opt_width, opt_height) {
      const { canvas, context } = ImageHelper.getHelper();

      const srcWidth = image.naturalWidth || image.width || 300;
      const srcHeight = image.naturalHeight || image.height || 150;
      const dstWidth = opt_width ?? srcWidth;
      const dstHeight = opt_height ?? srcHeight;

      ImageHelper.currentImageHash = image._spHash;
      ImageHelper._clearStage(dstWidth, dstHeight);
      context.save();
      context.scale(dstWidth < 0 ? -1 : 1, dstHeight < 0 ? -1 : 1);
      context.drawImage(
        image,
        0,
        0,
        srcWidth,
        srcHeight,
        dstWidth < 0 ? -canvas.width : 0,
        dstHeight < 0 ? -canvas.height : 0,
        canvas.width,
        canvas.height,
      );
      context.restore();
    }

    static newImage(input) {
      const source = ImageHelper._validateSource(input);
      if (!source) return null;

      const cacheKey = ImageCache.getHash(source);
      const cached = ImageCache.get(cacheKey);
      if (cached.img) return cached.img;

      return new Promise((resolve) => {
        Scratch.canFetch(source).then((canFetch) => {
          if (!canFetch) resolve(null);

          // eslint-disable-next-line extension/check-can-fetch
          const img = new Image();
          img.crossOrigin = "Anonymous";
          img.onerror = () => resolve(null);
          img.onload = () => {
            ImageCache.set(cacheKey, { src: img });
            img._spHash = cacheKey;
            resolve(img);
          };
          img.src = source;
        });
      });
    }

    static newTempCanvas(width, height) {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = width;
      tempCanvas.height = height;
      const ctx = tempCanvas.getContext("2d", { willReadFrequently: true });

      const dispose = () => {
        tempCanvas.width = 0;
        tempCanvas.height = 0;
        tempCanvas.remove();
      };

      return {
        canvas: tempCanvas,
        ctx,
        dispose
      };
    }

    static getImageData() {
      const cacheKey = ImageHelper.currentImageHash;
      const cached = ImageCache.get(cacheKey);
      if (cached.data) {
        return ImageHelper._cloneImageData(cached.data);
      }

      const { canvas, context } = ImageHelper.getHelper();
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      ImageCache.set(cacheKey, {
        data: ImageHelper._cloneImageData(imageData),
      });

      return imageData;
    }

    static forEachPixel(callback, options = {}) {
      const imageData = ImageHelper.getImageData();
      const pixelData = imageData.data;

      const start = Math.max(0, options.start ?? 0);
      const end = Math.min(options.end ?? pixelData.length, pixelData.length);
      for (let i = start; i < end; i += 4) {
        const result = callback(
          [
            pixelData[i],
            pixelData[i + 1],
            pixelData[i + 2],
            pixelData[i + 3]
          ],
          i / 4,
        );

        pixelData[i] = result[0];
        pixelData[i + 1] = result[1];
        pixelData[i + 2] = result[2];
        pixelData[i + 3] = result[3];
      }

      if (!options.dontSetCanvas) {
        ImageHelper.context.putImageData(imageData, 0, 0);
        return ImageHelper.canvas.toDataURL("image/png");
      }
    }

    static unloadImageData(method, ...args) {
      const imageData = method.call(
        null,
        ImageHelper.context,
        ...args
      );

      ImageHelper.context.putImageData(imageData, 0, 0);
      return ImageHelper.canvas.toDataURL("image/png");
    }
  }

  class imgEffectsSP {
    constructor() {
      this.colorThreshold = 10;
      this.mask = {
        pos: [0, 0],
        scale: [100, 100],
        direction: 90
      };
      this.shardPieces = [];

      runtime.on("PROJECT_STOP_ALL", () => ImageCache.clear());
      runtime.on("PROJECT_START", () => ImageCache.clear());
    }
    getInfo() {
      return {
        id: "imgEffectsSP",
        name: Scratch.translate("Image Effects"),
        menuIconURI,
        color1: "#9966FF",
        color2: "#774DCB",
        blocks: [
          /**
           * Excuse the poor argument/opcode naming for some blocks.
           * They were made years ago and must remain the same for compatibility.
           */
          {
            opcode: "applyHueEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("set tint of [SVG] to [COLOR]"),
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE },
              COLOR: { type: Scratch.ArgumentType.COLOR }
            }
          },
          "---",
          {
            opcode: "deleteColor",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("remove [COLOR] from [DATA_URI]"),
            arguments: {
              COLOR: { type: Scratch.ArgumentType.COLOR },
              DATA_URI: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE }
            }
          },
          {
            opcode: "replaceColor",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("replace [COLOR] with [REPLACE] in [DATA_URI]"),
            arguments: {
              COLOR: { type: Scratch.ArgumentType.COLOR },
              REPLACE: { type: Scratch.ArgumentType.COLOR, defaultValue: "#00ff00" },
              DATA_URI: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE }
            }
          },
          {
            opcode: "replaceColorPattern",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("replace [COLOR] with pattern [PATTERN] scale [SCALE] in [DATA_URI]"),
            arguments: {
              COLOR: { type: Scratch.ArgumentType.COLOR },
              PATTERN: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE },
              SCALE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              DATA_URI: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE }
            }
          },
          {
            opcode: "setSoftness",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set color threshold to [AMT] %"),
            arguments: {
              AMT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
            }
          },
          "---",
          {
            opcode: "applyEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("set [EFFECT] effect of [SVG] to [PERCENTAGE] %"),
            arguments: {
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTS" },
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE },
              PERCENTAGE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 }
            }
          },
          {
            opcode: "applyBulgeEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("set bulge effect of [SVG] to [STRENGTH] % at x [CENTER_X] y [CENTER_Y]"),
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE },
              STRENGTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              CENTER_X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              CENTER_Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "applyWaveEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("set wave effect of [SVG] to amplitude x [AMPX] y [AMPY] and frequency x [FREQX] y [FREQY]"),
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE },
              AMPX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              AMPY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              FREQX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              FREQY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            }
          },
          {
            opcode: "applyLineGlitchEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("set line glitch effect of [SVG] to [PERCENTAGE]% on [DIRECT] axis and line width [WIDTH]"),
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE },
              PERCENTAGE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              DIRECT: { type: Scratch.ArgumentType.STRING, menu: "POSITIONS" },
              WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            }
          },
          {
            opcode: "applyAbberationEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("set abberation effect of [SVG] to [PERCENTAGE] % on [DIRECT] axis with [COLOR1] and [COLOR2]"),
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE },
              PERCENTAGE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              COLOR1: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
              COLOR2: { type: Scratch.ArgumentType.COLOR, defaultValue: "#00f7ff" },
              DIRECT: { type: Scratch.ArgumentType.STRING, menu: "POSITIONS" }
            }
          },
          "---",
          {
            opcode: "removeTransparencyEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("remove pixels [REMOVE] [THRESHOLD] % transparency from [SVG]"),
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE },
              THRESHOLD: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              REMOVE: { type: Scratch.ArgumentType.STRING, menu: "REMOVAL" }
            }
          },
          {
            opcode: "applyEdgeOutlineEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("add outline to [SVG] thickness [THICKNESS] color [COLOR]"),
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE },
              THICKNESS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              COLOR: { type: Scratch.ArgumentType.COLOR }
            }
          },
          {
            opcode: "upscaleImage",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("sharpen image [URI] by [NUM] %"),
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: Scratch.translate("Clipping & Masking") },
          {
            opcode: "maskImage",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[TYPE] mask [MASK] from [IMG]"),
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "MASKING" },
              IMG: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE },
              MASK: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE }
            }
          },
          "---",
          {
            opcode: "setCutout",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set mask position to x [X] y [Y]"),
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER },
              Y: { type: Scratch.ArgumentType.NUMBER }
            }
          },
          {
            opcode: "changeCutout",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("change mask position by x [X] y [Y]"),
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "currentCut",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("mask [POS]"),
            disableMonitor: true,
            arguments: {
              POS: { type: Scratch.ArgumentType.STRING, menu: "POSITIONS" }
            }
          },
          "---",
          {
            opcode: "setScale",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set mask size to x [SIZE] y [Y]"),
            arguments: {
              SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            }
          },
          {
            opcode: "changeScale",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("change mask size by x [SIZE] y [Y]"),
            arguments: {
              SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "currentScale",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("mask size [POS]"),
            disableMonitor: true,
            arguments: {
              POS: { type: Scratch.ArgumentType.STRING, menu: "POSITIONS" }
            }
          },
          "---",
          {
            opcode: "setDirection",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set mask direction to [ANGLE]"),
            arguments: {
              ANGLE: { type: Scratch.ArgumentType.ANGLE, defaultValue: 90 }
            }
          },
          {
            opcode: "changeDirection",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("change mask direction by [ANGLE]"),
            arguments: {
              ANGLE: { type: Scratch.ArgumentType.ANGLE, defaultValue: 15 }
            }
          },
          {
            opcode: "currentDir",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("mask direction"),
            disableMonitor: true
          },
          "---",
          {
            opcode: "crackImage",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("crack [URI] into [SHARDS] shards with [TEETH] teeth"),
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE },
              SHARDS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 6 },
              TEETH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 }
            }
          },
          {
            opcode: "getShard",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("shard # [SHARD]"),
            arguments: {
              SHARD: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: Scratch.translate("Image Data") },
          {
            opcode: "commonCol",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[TYPE] common color in [URI]"),
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "DOMINANT" },
              URI: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE }
            }
          },
          "---",
          {
            opcode: "numPixels",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[TYPE] of [URI]"),
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "PIXELTYPE" }
            }
          },
          {
            opcode: "getPixel",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("pixel [NUM] of [URI]"),
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: "setPixel",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("set color of pixel [NUM] to [COLOR] in [URI]"),
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              COLOR: { type: Scratch.ArgumentType.COLOR }
            }
          },
          {
            opcode: "setPixels",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("set color of pixels from [NUM] to [NUM2] to [COLOR] in [URI]"),
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              NUM2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              COLOR: { type: Scratch.ArgumentType.COLOR }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: Scratch.translate("Image Conversions") },
          {
            opcode: "svgToBitmap",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("convert svg [SVG] to bitmap with width [WIDTH] height [HEIGHT]"),
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: "<svg></svg>" },
              WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              HEIGHT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            }
          },
          {
            opcode: "convertImageToSVG",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("convert image [URI] to svg [TYPE]"),
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "fileType" }
            }
          },
          {
            opcode: "makeSVGimage",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("put image [URI] into blank svg [TYPE]"),
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "fileType" }
            }
          },
          "---",
          {
            opcode: "stretchImg",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("stretch [URI] to width [W] height [H]"),
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE },
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 200 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            }
          },
          {
            opcode: "skewSVG",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("skew image [SVG] at x [X] y [Y]"),
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: DEFAULT_IMG_VALUE },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "removeThorns",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("remove vector thorns from [SVG]"),
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: "<svg></svg>" }
            }
          },
          "---",
          {
            opcode: "audioToImage",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("convert audio URI [AUDIO_URI] to PNG with width [W]"),
            arguments: {
              AUDIO_URI: { type: Scratch.ArgumentType.STRING, defaultValue: "data:audio/..." },
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            }
          },
        ],
        menus: {
          POSITIONS: [
            genMenuItem("x"), 
            genMenuItem("y")
          ],
          REMOVAL: [
            genMenuItem("under"),
            genMenuItem("over"),
            genMenuItem("equal to")],
          DOMINANT: [genMenuItem("most"), genMenuItem("least")],
          MASKING: [
            genMenuItem("clip"),
            genMenuItem("cutout"),
            genMenuItem("overlay")
          ],
          PIXELTYPE: [
            genMenuItem("width"),
            genMenuItem("height"),
            genMenuItem("total")
          ],
          fileType: [
            genMenuItem("content"),
            genMenuItem("data.URI")
          ],
          EFFECTS: { acceptReporters: true, items: EFFECTS_MENU },
        },
      };
    }

    // Helper Funcs
    _valueInRange(value, target) {
      return value >= target - this.colorThreshold &&
        value <= target + this.colorThreshold;
    }

    _colorInRange(rgba, targetRgba) {
      return (
        this._valueInRange(rgba[0], targetRgba[0]) &&
        this._valueInRange(rgba[1], targetRgba[1]) &&
        this._valueInRange(rgba[2], targetRgba[2])
      );
    }

    // EFFECTS
    _saturate(context, value, callback) {
      context.filter = `saturate(${Math.abs(value)}%)${value < 0 ? " invert(100%)" : ""}`;
      return callback(false);
    }

    _contrast(context, value, callback) {
      context.filter = `contrast(${Math.max(0, value / 100) + 1})`;
      return callback(false);
    }

    _opaque(_, value) {
      value = Math.max((value + 100) / 100, 0);
      return ImageHelper.forEachPixel((pixel) => {
        pixel[3] *= value;
        return pixel;
      });
    }

    _glitch(_, value) {
      return ImageHelper.forEachPixel((pixel) => {
        if (Math.random() * 100 <= value) {
          const rnd = () => (Math.random() - 0.5) * value * 3;
          return [
            (pixel[0] + rnd()) % 256,
            (pixel[1] + rnd()) % 256,
            (pixel[2] + rnd()) % 256,
            pixel[3],
          ];
        }

        return pixel;
      });
    }

    _chunkGlitch(context, value, callback) {
      const chunkSize = value / 10;
      const width = context.canvas.width;
      const height = context.canvas.height;
      const imageData = ImageHelper.getImageData();

      for (let i = 0; i < Math.floor(width); i++) {
        const linePos = Math.floor(Math.random() * height);
        const lineStart = linePos - Math.floor(chunkSize / 2);
        const lineEnd = lineStart + chunkSize;

        for (let y = 0; y < height; y++) {
          const index = (y * width + linePos) * 4;
          if (linePos >= 0 && linePos < width) {
            for (let x = lineStart; x < lineEnd; x++) {
              imageData.data.copyWithin(
                (y * width + x) * 4,
                index,
                index + 4
              );
            }
          }
        }
      }

      return callback(true, imageData);
    }

    _clipGlitch(context, value, callback) {
      value /= 100;
      const width = context.canvas.width;
      const height = context.canvas.height;
      const imageData = ImageHelper.getImageData();

      const pixelsToEnlarge = Math.floor((value / 100) * (width * height));
      for (let i = 0; i < pixelsToEnlarge; i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        const index = (y * width + x) * 4;
        const enlargeFactor = 1 + Math.random() * (1.5 + value / 200);
        const blurRadius = Math.floor(enlargeFactor * 4);
  
        for (let offsetY = -blurRadius; offsetY <= blurRadius; offsetY++) {
          for (let offsetX = -blurRadius; offsetX <= blurRadius; offsetX++) {
            const newX = x + offsetX;
            const newY = y + offsetY;
            if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
              imageData.data.copyWithin(
                (newY * width + newX) * 4,
                index,
                index + 4
              );
            }
          }
        }
      }

      return callback(true, imageData);
    }

    _vignette(context, value, _) {
      value /= 100;
      const width = context.canvas.width;
      const centerX = width / 2;
      const centerY = context.canvas.height / 2;
      const maxDist = Math.hypot(centerX, centerY);

      const adjust = (channel, amount) => {
        if (value >= 0) {
          return channel * (1 - amount);
        } else {
          return channel + (255 - channel) * amount;
        }
      };

      return ImageHelper.forEachPixel((pixel, index) => {
        const x = index % width;
        const y = Math.floor(index / width);

        const dist = Math.hypot(x - centerX, y - centerY);
        const factor = dist / maxDist;
        const amount = factor * Math.abs(value);

        return [
          ImageHelper.channel(adjust(pixel[0], amount)),
          ImageHelper.channel(adjust(pixel[1], amount)),
          ImageHelper.channel(adjust(pixel[2], amount)),
          pixel[3],
        ];
      });
    }

    _ripple(context, value, callback) {
      value /= 100;
      const width = context.canvas.width;
      const height = context.canvas.height;
      const imageData = ImageHelper.getImageData();

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          const dx = x - (width / 2);
          const dy = y - (height / 2);
          const distance = Math.sqrt(dx * dx + dy * dy);
          const offset = Math.sin(distance * value) * value;
          const sourceX = Math.floor(x + offset);
          const sourceY = Math.floor(y);

          if (sourceX >= 0 && sourceX < width && sourceY >= 0 && sourceY < height) {
            const srcIndex = (sourceY * width + sourceX) * 4;
            if (imageData.data[srcIndex + 3] > 0) {
              imageData.data.copyWithin(index, srcIndex, srcIndex + 4);
            }
          } else {
            imageData.data[index + 3] = 0;
          }
        }
      }

      return callback(true, imageData);
    }

    _displace(context, value, callback) {
      const dispAmt = Math.max(0, Math.floor(value));
      const width = context.canvas.width;
      const height = context.canvas.height;
      const imageData = ImageHelper.getImageData();
      const newData = new Uint8ClampedArray(imageData.data.length);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const srcX = x + Math.floor(Math.random() * dispAmt * 2 - dispAmt);
          const srcY = y + Math.floor(Math.random() * dispAmt * 2 - dispAmt);

          if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < height) {
            const srcIndex = (srcY * width + srcX) * 4;
            const dstIndex = (y * width + x) * 4;
            newData.set(
              imageData.data.subarray(srcIndex, srcIndex + 4),
              dstIndex
            );
          }
        }
      }
    
      imageData.data.set(newData);
      return callback(true, imageData);
    }

    _posterize(_, value) {
      const numLevels = Math.max(value / 10, 1) - 1;
      return ImageHelper.forEachPixel((pixel) => {
        return [
          Math.round((pixel[0] * numLevels) / 255) * (255 / numLevels),
          Math.round((pixel[1] * numLevels) / 255) * (255 / numLevels),
          Math.round((pixel[2] * numLevels) / 255) * (255 / numLevels),
          pixel[3],
        ];
      });
    }

    _blur(context, value, callback) {
      context.filter = `blur(${value}px)`;
      return callback(false);
    }

    _sepia(context, value, callback) {
      context.filter = `sepia(${value}%)`;
      return callback(false);
    }

    _scanline(context, value) {
      const lineBrightness = [];

      return ImageHelper.forEachPixel((pixel, index) => {
        const y = Math.floor((index * 4) / context.canvas.width);

        if (lineBrightness[y] === undefined) {
          lineBrightness[y] =
            Math.random() < value / 100
              ? Math.random() * (value / 2)
              : 0;
        }

        const bright = lineBrightness[y];
        return [
          Math.min(pixel[0] + bright, 255),
          Math.min(pixel[1] + bright, 255),
          Math.min(pixel[2] + bright, 255),
          pixel[3],
        ];
      });
    }

    _grain(_, value) {
      return ImageHelper.forEachPixel((pixel) => {
        if (Math.random() < value / 100) {
          const grain = Math.random() * value;
          return [
            Math.min(pixel[0] + grain, 255),
            Math.min(pixel[1] + grain, 255),
            Math.min(pixel[2] + grain, 255),
            pixel[3],
          ];
        }

        return pixel;
      });
    }

    _cubism(context, value, callback) {
      const blockSize = Math.max(1, Math.floor(Math.abs(value)));
      const width = context.canvas.width;
      const height = context.canvas.height;
      const imageData = ImageHelper.getImageData();
      const data = imageData.data;

      for (let y = 0; y < height; y += blockSize) {
        for (let x = 0; x < width; x += blockSize) {
          const endX = Math.min(x + blockSize, width);
          const endY = Math.min(y + blockSize, height);

          let r = 0;
          let g = 0;
          let b = 0;
          let count = 0;
          for (let yy = y; yy < endY; yy++) {
            for (let xx = x; xx < endX; xx++) {
              const index = (yy * width + xx) * 4;
              r += data[index];
              g += data[index + 1];
              b += data[index + 2];
              count++;
            }
          }

          r /= count;
          g /= count;
          b /= count;
          for (let yy = y; yy < endY; yy++) {
            for (let xx = x; xx < endX; xx++) {
              const index = (yy * width + xx) * 4;
              data[index] = r;
              data[index + 1] = g;
              data[index + 2] = b;
            }
          }
        }
      }

      return callback(true, imageData);
    }

    _bulge(context, strength, centerX, centerY) {
      const width = context.canvas.width;
      const height = context.canvas.height;
      const imageData = ImageHelper.getImageData();
      const data = imageData.data;
      const output = new Uint8ClampedArray(data.length);

      const cx = width * (centerX * 0.5 + 0.5);
      const cy = height * (0.5 - centerY * 0.5);
      const radius = Math.max(width, height) * 0.5;
      const radiusSq = radius * radius;
      for (let y = 0; y < height; y++) {
        const dy = y - cy;

        for (let x = 0; x < width; x++) {
          const dx = x - cx;
          const distSq = dx * dx + dy * dy;

          let srcX = x;
          let srcY = y;
          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq) / radius;
            const scale = Math.pow(dist, 1 - strength);

            srcX = Math.round(cx + dx * scale);
            srcY = Math.round(cy + dy * scale);
          }

          if (
            srcX >= 0 && srcX < width &&
            srcY >= 0 && srcY < height
          ) {
            const s = (srcY * width + srcX) * 4;
            const d = (y * width + x) * 4;
              
            output[d] = data[s];
            output[d + 1] = data[s + 1];
            output[d + 2] = data[s + 2];
            output[d + 3] = data[s + 3];
          }
        }
      }

      imageData.data.set(output);
      return imageData;
    }

    _wave(context, ampX, ampY, freqX, freqY) {
      const width = context.canvas.width;
      const height = context.canvas.height;
      const imageData = ImageHelper.getImageData();
      const data = imageData.data;
      const output = new Uint8ClampedArray(data.length);
      for (let y = 0; y < height; y++) {
        const waveX = Math.round(ampX * Math.sin(y * freqX));

        for (let x = 0; x < width; x++) {
          const waveY = Math.round(ampY * Math.sin(x * freqY));
          const sx = x + waveX;
          const sy = y + waveY;

          if (
            sx >= 0 && sx < width &&
            sy >= 0 && sy < height
          ) {
            const s = (sy * width + sx) * 4;
            const d = (y * width + x) * 4;

            output[d] = data[s];
            output[d + 1] = data[s + 1];
            output[d + 2] = data[s + 2];
            output[d + 3] = data[s + 3];
          }
        }
      }

      imageData.data.set(output);
      return imageData;
    }

    _lineGlitch(context, amount, lineWidth, axis) {
      const width = context.canvas.width;
      const height = context.canvas.height;
      const imageData = ImageHelper.getImageData();
      const data = imageData.data;

      const horizontal = axis === "x";
      const axisSize = horizontal ? height : width;
      const count = Math.floor(axisSize * amount);
      for (let i = 0; i < count; i++) {
        const line = Math.floor(Math.random() * axisSize);
        const start = Math.max(0, line - (lineWidth >> 1));
        const end = Math.min(axisSize, start + lineWidth);

        if (horizontal) {
          const src = line * width * 4;
          for (let y = start; y < end; y++) {
            data.copyWithin(
              y * width * 4,
              src,
              src + width * 4
            );
          }
        } else {
          for (let y = 0; y < height; y++) {
            const src = (y * width + line) * 4;

            for (let x = start; x < end; x++) {
              data.copyWithin(
                (y * width + x) * 4,
                src,
                src + 4
              );
            }
          }
        }
      }

      return imageData;
    }

    _aberration(context, amount, color1, color2, axis) {
      const width = context.canvas.width;
      const height = context.canvas.height;
      const imageData = ImageHelper.getImageData();
      const data = imageData.data;

      const left = new Uint8ClampedArray(data.length);
      const right = new Uint8ClampedArray(data.length);
      const offset = Math.round(
        (axis === "x" ? width : height) * 0.5 * amount
      );

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;

          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          let lx = x;
          let ly = y;
          let rx = x;
          let ry = y;

          if (axis === "x") {
            lx += offset;
            rx -= offset;
          } else {
            ly += offset;
            ry -= offset;
          }

          lx = ImageHelper.clamp(0, width - 1, lx);
          ly = ImageHelper.clamp(0, height - 1, ly);
          rx = ImageHelper.clamp(0, width - 1, rx);
          ry = ImageHelper.clamp(0, height - 1, ry);

          const li = (ly * width + lx) * 4;
          const ri = (ry * width + rx) * 4;

          left[li] = r * color1[0] / 255;
          left[li + 1] = g * color1[1] / 255;
          left[li + 2] = b * color1[2] / 255;
          left[li + 3] = a;

          right[ri] = r * color2[0] / 255;
          right[ri + 1] = g * color2[1] / 255;
          right[ri + 2] = b * color2[2] / 255;
          right[ri + 3] = a;
        }
      }

      for (let i = 0; i < data.length; i++) {
        data[i] = ImageHelper.channel((data[i] + left[i] + right[i]) / 2);
      }

      return imageData;
    }

    _outline(context, thickness, rgba) {
      const width = context.canvas.width;
      const height = context.canvas.height;
      const imageData = ImageHelper.getImageData();
      const data = imageData.data;

      const original = new Uint8ClampedArray(data);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          if (original[index + 3] > 150) continue; // skip pixels near full opaque

          let found = false;
          for (let dy = -thickness; dy <= thickness && !found; dy++) {
            const ny = y + dy;
            if (ny < 0 || ny >= height) continue;

            for (let dx = -thickness; dx <= thickness; dx++) {
              const nx = x + dx;
              if (nx < 0 || nx >= width) continue;

              const n = (ny * width + nx) * 4;

              if (original[n + 3] > original[index + 3]) {
                data[index] = rgba[0];
                data[index + 1] = rgba[1];
                data[index + 2] = rgba[2];
                data[index + 3] = rgba[3];
                found = true;
                break;
              }
            }
          }
        }
      }

      return imageData;
    }

    _sharpen(context, factor) {
      const width = context.canvas.width;
      const height = context.canvas.height;
      const imageData = ImageHelper.getImageData();
      const data = imageData.data;

      const output = context.createImageData(width, height);
      const out = output.data;

      const side = 3;
      const weights = [
        0, -factor, 0,
        -factor, 1 + 4 * factor, -factor,
        0, -factor, 0
      ];
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let r = 0;
          let g = 0;
          let b = 0;

          const dst = (y * width + x) * 4;
          for (let ky = 0; ky < side; ky++) {
            for (let kx = 0; kx < side; kx++) {
              const weight = weights[ky * side + kx];

              const sy = ImageHelper.clamp(
                0,
                height - 1,
                y + ky - 1
              );
              const sx = ImageHelper.clamp(
                0,
                width - 1,
                x + kx - 1
              );

              const index = (sy * width + sx) * 4;
              r += data[index] * weight;
              g += data[index + 1] * weight;
              b += data[index + 2] * weight;
            }
          }

          out[dst] = ImageHelper.channel(r);
          out[dst + 1] = ImageHelper.channel(g);
          out[dst + 2] = ImageHelper.channel(b);
          out[dst + 3] = data[dst + 3];
        }
      }

      return output;
    }

    // Block Funcs
    async applyHueEffect(args) {
      const rgba = ImageHelper.hexToRgba(args.COLOR);
      const image = await ImageHelper.newImage(args.SVG);
      if (!image) return INVALID_IMG;

      ImageHelper.prepCanvas(image);
      return ImageHelper.forEachPixel((pixel) => [
        Math.min(255, (pixel[0] * rgba[0]) / 255),
        Math.min(255, (pixel[1] * rgba[1]) / 255),
        Math.min(255, (pixel[2] * rgba[2]) / 255),
        Math.min(255, (pixel[3] * rgba[3]) / 255)
      ]);
    }

    deleteColor(args) {
      return this.replaceColor({ ...args, REPLACE: "#00000000" });
    }

    async replaceColor(args) {
      const targetRgba = ImageHelper.hexToRgba(args.COLOR);
      const replaceRgba = ImageHelper.hexToRgba(args.REPLACE);

      const image = await ImageHelper.newImage(args.DATA_URI);
      if (!image) return INVALID_IMG;

      ImageHelper.prepCanvas(image);
      return ImageHelper.forEachPixel((pixel) =>
        this._colorInRange(pixel, targetRgba) ? replaceRgba : pixel
      );
    }

    async replaceColorPattern(args) {
      const targetRgba = ImageHelper.hexToRgba(args.COLOR);
      const tileSize = Math.max(1, Cast.toNumber(args.SCALE));

      const image = await ImageHelper.newImage(args.DATA_URI);
      const pattern = await ImageHelper.newImage(args.PATTERN);
      if (!image || !pattern) return INVALID_IMG;

      ImageHelper.prepCanvas(image);
      const { width, height } = image;
      const imageData = ImageHelper.getImageData();
      const modified = new ImageData(
        new Uint8ClampedArray(imageData.data),
        width,
        height
      );

      const mask = new ImageData(width, height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const rgb = [
          imageData.data[i],
          imageData.data[i + 1],
          imageData.data[i + 2],
        ];

        if (this._colorInRange(rgb, targetRgba)) {
          modified.data[i + 3] = 0;
          mask.data[i] = 255;
          mask.data[i + 1] = 255;
          mask.data[i + 2] = 255;
          mask.data[i + 3] = 255;
        }
      }

      const maskContext = ImageHelper.newTempCanvas(width, height);
      maskContext.ctx.putImageData(mask, 0, 0);

      const {
        canvas: patternCanvas,
        ctx: patternCtx,
        dispose: disposePatternCanvas,
      } = ImageHelper.newTempCanvas(width, height);

      const scale = tileSize / Math.max(pattern.width, pattern.height);
      const drawWidth = Math.round(pattern.width * scale);
      const drawHeight = Math.round(pattern.height * scale);
      for (let y = 0; y < height; y += drawHeight) {
        for (let x = 0; x < width; x += drawWidth) {
          patternCtx.drawImage(pattern, x, y, drawWidth, drawHeight);
        }
      }

      ImageHelper.context.putImageData(modified, 0, 0);
      patternCtx.globalCompositeOperation = "destination-in";
      patternCtx.drawImage(maskContext.canvas, 0, 0);
      patternCtx.globalCompositeOperation = "source-over";
      ImageHelper.context.drawImage(patternCanvas, 0, 0);

      maskContext.dispose();
      disposePatternCanvas();
      return ImageHelper.canvas.toDataURL("image/png");
    }

    setSoftness(args) {
      this.colorThreshold = Math.max(0, Cast.toNumber(args.AMT));
    }

    async applyEffect(args) {
      const effect = Cast.toString(args.EFFECT).toLowerCase();
      const value = Cast.toNumber(args.PERCENTAGE);
      const image = await ImageHelper.newImage(args.SVG);
      if (!image) return INVALID_IMG;

      const { canvas, context } = ImageHelper.getHelper();
      ImageHelper.prepCanvas(image);

      const callback = (pixelsAltered, imageData) => {
        if (pixelsAltered) context.putImageData(imageData, 0, 0);
        else {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0, image.width, image.height);
        }

        return canvas.toDataURL("image/png");
      };

      switch (effect) {
        case "saturation":
          return this._saturate(context, value, callback);
        case "contrast":
          return this._contrast(context, value, callback);
        case "opaque":
          return this._opaque(context, value, callback);
        case "glitch":
          return this._glitch(context, value, callback);
        case "chunk glitch":
          return this._chunkGlitch(context, value, callback);
        case "clip glitch":
          return this._clipGlitch(context, value, callback);
        case "vignette":
          return this._vignette(context, value, callback);
        case "ripple":
          return this._ripple(context, value, callback);
        case "displacement":
          return this._displace(context, value, callback);
        case "posterize":
          return this._posterize(context, value, callback);
        case "blur":
          return this._blur(context, value, callback);
        case "sepia":
          return this._sepia(context, value, callback);
        case "scanlines":
          return this._scanline(context, value, callback);
        case "grain":
          return this._grain(context, value, callback);
        case "cubism":
          return this._cubism(context, value, callback);
        default:
          return "";
      }
    }

    async applyBulgeEffect(args) {
      const image = await ImageHelper.newImage(args.SVG);
      if (!image) return INVALID_IMG;

      const strength = 1 - (Cast.toNumber(args.STRENGTH) / 100);
      const centerX = Cast.toNumber(args.CENTER_X) / 100;
      const centerY = Cast.toNumber(args.CENTER_Y) / 100;

      const { canvas, context } = ImageHelper.getHelper();
      ImageHelper.prepCanvas(image);

      const canvasSize = Math.max(image.width, image.height) * 2;
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      context.drawImage(
        image,
        (canvasSize - image.width) / 2,
        (canvasSize - image.height) / 2
      );

      return ImageHelper.unloadImageData(this._bulge, strength, centerX, centerY);
    }

    async applyWaveEffect(args) {
      const image = await ImageHelper.newImage(args.SVG);
      if (!image) return INVALID_IMG;

      const ampX = Cast.toNumber(args.AMPX) / 10;
      const ampY = Cast.toNumber(args.AMPY) / 10;
      const freqX = Cast.toNumber(args.FREQX) / 100;
      const freqY = Cast.toNumber(args.FREQY) / 100;

      ImageHelper.prepCanvas(image);
      return ImageHelper.unloadImageData(this._wave, ampX, ampY, freqX, freqY);
    }

    async applyLineGlitchEffect(args) {
      const image = await ImageHelper.newImage(args.SVG);
      if (!image) return INVALID_IMG;

      const value = Cast.toNumber(args.PERCENTAGE) / 100;
      const width = Math.max(1, Math.round(Cast.toNumber(args.WIDTH)));
      const axis = Cast.toString(args.DIRECT).toLowerCase();

      ImageHelper.prepCanvas(image);
      return ImageHelper.unloadImageData(this._lineGlitch, value, width, axis);
    }

    async applyAbberationEffect(args) {
      const image = await ImageHelper.newImage(args.SVG);
      if (!image) return INVALID_IMG;

      const color1 = ImageHelper.hexToRgba(args.COLOR1);
      const color2 = ImageHelper.hexToRgba(args.COLOR2);
      const axis = Cast.toString(args.DIRECT).toLowerCase();
      const amount = Cast.toNumber(args.PERCENTAGE) / 100;

      ImageHelper.prepCanvas(image);
      return ImageHelper.unloadImageData(this._aberration, amount, color1, color2, axis);
    }

    async removeTransparencyEffect(args) {
      const image = await ImageHelper.newImage(args.SVG);
      if (!image) return INVALID_IMG;

      const threshold = Cast.toNumber(args.THRESHOLD) / 100;
      const type = Cast.toString(args.REMOVE).toLowerCase();

      ImageHelper.prepCanvas(image);
      return ImageHelper.forEachPixel((pixel) => {
        const alpha = pixel[3] / 255;
        if (
          (type === "under" && alpha < threshold) ||
          (type === "over" && alpha > threshold) ||
          (type === "equal to" && Math.abs(alpha - threshold) < 0.01)
        ) {
          pixel[3] = 0;
        }

        return pixel;
      });
    }

    async applyEdgeOutlineEffect(args) {
      const image = await ImageHelper.newImage(args.SVG);
      if (!image) return INVALID_IMG;

      const rgba = ImageHelper.hexToRgba(args.COLOR);
      const thickness = Math.ceil(Cast.toNumber(args.THICKNESS) / 4);

      ImageHelper.prepCanvas(image);
      return ImageHelper.unloadImageData(this._outline, thickness, rgba);
    }

    async upscaleImage(args) {
      const image = await ImageHelper.newImage(args.URI);
      if (!image) return INVALID_IMG;

      const value = Cast.toNumber(args.NUM) / 10;

      ImageHelper.prepCanvas(image);
      return ImageHelper.unloadImageData(this._sharpen, value);
    }

    async maskImage(args) {
      const image = await ImageHelper.newImage(args.IMG);
      const maskImage = await ImageHelper.newImage(args.MASK);
      if (!image || !maskImage) return INVALID_IMG;

      const { canvas, context } = ImageHelper.getHelper();
      ImageHelper.prepCanvas(image);

      const mask = this.mask;
      const scaleW = maskImage.width * (mask.scale[0] / 50);
      const scaleH = maskImage.height * (mask.scale[1] / 50);
      const cutX = mask.pos[0] + (image.width / 2) - (scaleW / 2);
      const cutY = mask.pos[1] - (image.height / 2) + (scaleH / 2);

      if (args.TYPE === "clip") {
        context.globalCompositeOperation = "destination-in";
      } else if (args.TYPE === "overlay") {
        context.globalCompositeOperation = "source-over";
      } else {
        context.globalCompositeOperation = "destination-out";
      }

      context.translate(cutX + scaleW / 2, cutY * -1 + scaleH / 2);
      context.rotate((mask.direction - 90) * ImageHelper.TO_RAD);
      context.drawImage(maskImage, scaleW / -2, scaleH / -2, scaleW, scaleH);
      context.setTransform(1, 0, 0, 1, 0, 0);

      return canvas.toDataURL("image/png");
    }

    setCutout(args) {
      this.mask.pos[0] = Cast.toNumber(args.X);
      this.mask.pos[1] = Cast.toNumber(args.Y);
    }

    changeCutout(args) {
      this.mask.pos[0] += Cast.toNumber(args.X);
      this.mask.pos[1] += Cast.toNumber(args.Y);
    }

    currentCut(args) {
      const option = Cast.toString(args.POS).toLowerCase();
      return this.mask.pos[option === "x" ? 0 : 1];
    }

    setScale(args) {
      this.mask.scale[0] = Cast.toNumber(args.SIZE);
      this.mask.scale[1] = Cast.toNumber(args.Y);
    }

    changeScale(args) {
      this.mask.scale[0] += Cast.toNumber(args.SIZE);
      this.mask.scale[1] += Cast.toNumber(args.Y);
    }

    currentScale(args) {
      const option = Cast.toString(args.POS).toLowerCase();
      return this.mask.scale[option === "x" ? 0 : 1];
    }

    setDirection(args) {
      this.mask.direction = Cast.toNumber(args.ANGLE);
    }

    changeDirection(args) {
      this.mask.direction += Cast.toNumber(args.ANGLE);
    }

    currentDir() {
      return this.mask.direction;
    }

    async crackImage(args) {
      const image = await ImageHelper.newImage(args.URI);
      if (!image) return INVALID_IMG;

      const { width, height } = image;

      const teeth = Math.max(0, Math.round(Cast.toNumber(args.TEETH)));
      const shardCount = Math.max(2, Math.round(Cast.toNumber(args.SHARDS)));
      const cols = Math.max(1, Math.round(Math.sqrt(shardCount * (width / height))));
      const rows = Math.max(1, Math.round(shardCount / cols));

      const cellW = width / cols;
      const cellH = height / rows;
      const jitterAmount = Math.min(cellW, cellH) * 0.3;

      // Turns a straight line into a jagged polyline
      const buildJaggedLine = (x1, y1, x2, y2) => {
        const points = [{ x: x1, y: y1 }];
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;

        for (let s = 1; s < teeth; s++) {
          const t = s / teeth;
          const baseX = x1 + dx * t;
          const baseY = y1 + dy * t;
          const offset = (Math.random() - 0.5) * jitterAmount;
          points.push({ x: baseX + nx * offset, y: baseY + ny * offset });
        }

        points.push({ x: x2, y: y2 });
        return points;
      };

      const verticalEdges = [];
      for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c <= cols; c++) {
          const x = c * cellW;
          const y1 = r * cellH;
          const y2 = (r + 1) * cellH;
          if (c === 0 || c === cols) {
            row.push([{ x, y: y1 }, { x, y: y2 }]);
          } else {
            row.push(buildJaggedLine(x, y1, x, y2));
          }
        }
        verticalEdges.push(row);
      }

      const horizontalEdges = [];
      for (let r = 0; r <= rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
          const y = r * cellH;
          const x1 = c * cellW;
          const x2 = (c + 1) * cellW;
          if (r === 0 || r === rows) {
            row.push([{ x: x1, y }, { x: x2, y }]);
          } else {
            row.push(buildJaggedLine(x1, y, x2, y));
          }
        }
        horizontalEdges.push(row);
      }

      this.shardPieces = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const top = horizontalEdges[r][c];
          const right = verticalEdges[r][c + 1];
          const bottom = [...horizontalEdges[r + 1][c]].reverse();
          const left = [...verticalEdges[r][c]].reverse();
          const polygon = [...top, ...right.slice(1), ...bottom.slice(1), ...left.slice(1)];

          const { canvas: shardCanvas, ctx, dispose } = ImageHelper.newTempCanvas(width, height);

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(polygon[0].x, polygon[0].y);
          for (let i = 1; i < polygon.length; i++) {
            ctx.lineTo(polygon[i].x, polygon[i].y);
          }
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(image, 0, 0, width, height);
          ctx.restore();

          this.shardPieces.push(shardCanvas.toDataURL("image/png"));
          dispose();
        }
      }
    }

    getShard(args) {
      return this.shardPieces[Cast.toNumber(args.SHARD) - 1] || "";
    }

    async commonCol(args) {
      const image = await ImageHelper.newImage(args.URI);
      if (!image) return INVALID_IMG;

      const options = { dontSetCanvas: true };
      const pixelMap = {};
      ImageHelper.prepCanvas(image);
      ImageHelper.forEachPixel((pixel) => {
        if (pixel[3] > 0) {
          const key = pixel.toString();
          pixelMap[key] = (pixelMap[key] ?? 0) + 1;
        }

        return pixel;
      }, options);

      const sortedColors = Object.entries(pixelMap)
        .sort((a, b) => a[1] - b[1])
        .map((c) => c[0]);

      const rgba = args.TYPE === "most"
        ? sortedColors[sortedColors.length - 1]
        : sortedColors[0];
      return ImageHelper.rgbaToHex(rgba.split(","));
    }

    async numPixels(args) {
      const image = await ImageHelper.newImage(args.URI);
      if (!image) return INVALID_IMG;

      switch (Cast.toString(args.TYPE)) {
        case "total":
          return image.width * image.height;
        case "per line":
        case "width":
          return image.width;
        case "per row":
        case "height":
          return image.height;
        default:
          return "";
      }
    }
    
    async getPixel(args) {
      const image = await ImageHelper.newImage(args.URI);
      if (!image) return INVALID_IMG;

      ImageHelper.prepCanvas(image);

      const pixel = Cast.toNumber(args.NUM);
      if (pixel >= 1 && pixel <= image.width * image.height) {
        const x = (pixel - 1) % image.width;
        const y = Math.floor((pixel - 1) / image.width);

        const rgba = ImageHelper.context.getImageData(x, y, 1, 1).data;
        return ImageHelper.rgbaToHex(rgba);
      }

      return "#000000";
    }

    async setPixel(args) {
      return await this.setPixels(args);
    }
    async setPixels(args) {
      const image = await ImageHelper.newImage(args.URI);
      if (!image) return INVALID_IMG;

      const rgba = ImageHelper.hexToRgba(args.COLOR);
      const start = (Cast.toNumber(args.NUM) - 1) * 4;
      const end = (args.NUM2 === undefined ? start : Cast.toNumber(args.NUM2) * 4) + 4;
      const options = { start, end };

      ImageHelper.prepCanvas(image);
      return ImageHelper.forEachPixel((pixel) => rgba, options);
    }

    async svgToBitmap(args) {
      return await this.stretchImg({
        URI: args.SVG,
        W: args.WIDTH,
        H: args.HEIGHT,
      });
    }

    async convertImageToSVG(args) {
      const image = await ImageHelper.newImage(args.URI);
      if (!image) return INVALID_IMG;

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.setAttribute("width", width);
      svg.setAttribute("height", height);
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

      ImageHelper.prepCanvas(image);
      const { width, height } = image;
      const data = ImageHelper.getImageData().data;

      const rects = [];
      let activeRuns = new Map();
      for (let y = 0; y < height; y++) {
        const nextRuns = new Map();

        let runX = 0;
        let runWidth = 0;
        let runColor = null;
        for (let x = 0; x <= width; x++) {
          let color = null;

          if (x < width) {
            const i = (y * width + x) * 4;

            if (data[i + 3] !== 0) {
              color =
                data[i] |
                (data[i + 1] << 8) |
                (data[i + 2] << 16) |
                (data[i + 3] << 24);
            }
          }

          if (color === runColor && color !== null) {
            runWidth++;
            continue;
          }

          if (runColor !== null) {
            const key = `${runX},${runWidth},${runColor}`;
            let rect = activeRuns.get(key);

            if (rect) rect.height++;
            else {
              rect = {
                x: runX,
                y,
                width: runWidth,
                height: 1,
                color: runColor
              };
              rects.push(rect);
            }

            nextRuns.set(key, rect);
          }

          runColor = color;
          runX = x;
          runWidth = color !== null ? 1 : 0;
        }

        activeRuns = nextRuns;
      }

      for (const rect of rects) {
        const rgba = rect.color >>> 0;
        const r = rgba & 255;
        const g = (rgba >>> 8) & 255;
        const b = (rgba >>> 16) & 255;
        const a = (rgba >>> 24) & 255;

        const node = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        node.setAttribute("x", rect.x);
        node.setAttribute("y", rect.y);
        node.setAttribute("width", rect.width);
        node.setAttribute("height", rect.height);
        node.setAttribute("fill", `rgb(${r},${g},${b})`);
        if (a !== 255) {
          node.setAttribute("fill-opacity", (a / 255).toFixed(2));
        }

        svg.appendChild(node);
      }

      const svgString = new XMLSerializer().serializeToString(svg);
      return args.TYPE === "content"
        ? svgString
        : `data:image/svg+xml;base64,${btoa(svgString)}`;
    }

    async makeSVGimage(args) {
      const image = await ImageHelper.newImage(args.URI);
      if (!image) return INVALID_IMG;

      const { width, height, offsetLeft, offsetTop } = image;
      let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" `;
      svg += `width="${width / 2}" height="${height / 2}" `;
      svg += `viewBox="0,0,${width / 2},${height / 2}">`;
      svg += `<g transform="translate(${offsetLeft / -2},${offsetTop / -2})">`;
      svg += `<image x="0" y="0" width="${width / 2}" height="${height / 2}" `;
      svg += `xlink:href="${image.src}"/></g></svg>`;

      return args.TYPE === "content" ? svg : `data:image/svg+xml;base64,${btoa(svg)}`;
    }

    async stretchImg(args) {
      const image = await ImageHelper.newImage(args.URI);
      if (!image) return INVALID_IMG;

      ImageHelper.prepCanvas(image, Cast.toNumber(args.W), Cast.toNumber(args.H));
      return ImageHelper.canvas.toDataURL("image/png");
    }

    async skewSVG(args) {
      const image = await ImageHelper.newImage(args.SVG);
      if (!image) return INVALID_IMG;

      // Flip skew X and Y, looks more natural
      const skewX = Cast.toNumber(args.Y) * ImageHelper.TO_RAD;
      const skewY = Cast.toNumber(args.X) * ImageHelper.TO_RAD;
      const tanX = Math.tan(skewX);
      const tanY = Math.tan(skewY);

      const newWidth  = image.width + Math.abs(image.width * tanY);
      const newHeight = image.height + Math.abs(image.height * tanX);

      const { canvas, ctx, dispose } = ImageHelper.newTempCanvas(newWidth, newHeight);

      ctx.save();
      ctx.translate(newWidth / 2, newHeight / 2);
      ctx.setTransform(1, tanX, tanY, 1, newWidth / 2, newHeight / 2); 
      ctx.drawImage(image, -image.width / 2, -image.height / 2);
      ctx.restore();

      const result = canvas.toDataURL("image/png");
      dispose();
      return result;
    }

    removeThorns(args) {
      return Cast.toString(args.SVG).replaceAll(`linejoin="miter"`, `linejoin="round"`);
    }

    audioToImage(args) {
      const uri = Cast.toString(args.AUDIO_URI);
      const data = uri.split(",")[1];
      if (!data) return "Invalid URI";

      const width = Math.abs(Math.round(Cast.toString(args.W)));
      const height = Math.floor(data.length / width);
      const { canvas, ctx, dispose } = ImageHelper.newTempCanvas(width, height);

      for (let i = 0; i < data.length; i++) {
        const charCode = data.charCodeAt(i);
        ctx.fillStyle = `rgb(${(charCode * 2) % 256},${(charCode * 3) % 256},${(charCode * 4) % 256})`;
        ctx.fillRect(i % width, Math.floor(i / width), 1, 1);
      }

      const result = canvas.toDataURL("image/png");
      dispose(); 
      return result;
    }
  }

  Scratch.extensions.register(new imgEffectsSP());
})(Scratch);
