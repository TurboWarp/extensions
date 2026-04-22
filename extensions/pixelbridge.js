// Name: PixelBridge
// ID: pixelbridge
// Description: Convert PNG Data URLs to pixel arrays and back. Enables pixel-level image manipulation inside Scratch projects.
// By: Claude AI
// License: MIT

(function (Scratch) {
  "use strict";

  // ── Utilities ─────────────────────────────────────────────────────────────────

  /** Creates an off-screen canvas of the given size. */
  function createCanvas(w, h) {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    return canvas;
  }

  /**
   * Loads a Data URL into an HTMLImageElement.
   * Resolves with the element, rejects if the source is invalid.
   */
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Invalid or corrupt image source."));
      img.src = src;
    });
  }

  /**
   * Converts a raw RGBA Uint8ClampedArray into an array of 24-bit integers
   * (0xRRGGBB). The alpha channel is discarded.
   */
  function rgbaToInt24Array(data) {
    const pixels = new Array(data.length / 4);
    for (let i = 0, p = 0; i < data.length; i += 4, p++) {
      pixels[p] = (data[i] << 16) | (data[i + 1] << 8) | data[i + 2];
    }
    return pixels;
  }

  /**
   * Writes a 24-bit integer array into an ImageData buffer (alpha set to 255).
   * Returns false if the array is shorter than pixelCount.
   */
  function int24ArrayToImageData(arr, imgData, pixelCount) {
    if (arr.length < pixelCount) return false;
    for (let i = 0; i < pixelCount; i++) {
      const c = (Number(arr[i]) >>> 0) & 0xffffff;
      imgData.data[i * 4] = (c >> 16) & 0xff; // R
      imgData.data[i * 4 + 1] = (c >> 8) & 0xff; // G
      imgData.data[i * 4 + 2] = c & 0xff; // B
      imgData.data[i * 4 + 3] = 255; // A (fully opaque)
    }
    return true;
  }

  // ── Extension class ───────────────────────────────────────────────────────────

  class PixelBridge {
    getInfo() {
      return {
        id: "pixelbridge",
        name: Scratch.translate("PixelBridge"),
        color1: "#5C4FCE",
        color2: "#3D3491",
        color3: "#2B2468",

        blocks: [
          // Block 1 — PNG Data URL → pixel array
          {
            opcode: "pngToArray",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("PNG [URL] to pixel array"),
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "data:image/png;base64,...",
              },
            },
          },

          // Block 2 — pixel array → PNG Data URL
          {
            opcode: "arrayToPng",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "array [ARRAY] width [W] height [H] to PNG"
            ),
            arguments: {
              ARRAY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[16711680,65280,255]",
              },
              W: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3,
              },
              H: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },

          // Block 3 — read image dimensions
          {
            opcode: "pngDimensions",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("dimensions of PNG [URL]"),
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "data:image/png;base64,...",
              },
            },
          },
        ],
      };
    }

    /**
     * Decodes a PNG Data URL and returns a JSON array of 24-bit pixel integers.
     * Output format: ["WxH", pixel0, pixel1, ...]
     */
    async pngToArray({ URL }) {
      // eslint-disable-next-line extension/check-can-fetch
      if (!(await Scratch.canFetch(URL))) return "[]";

      let img;
      try {
        img = await loadImage(URL);
      } catch {
        return "[]";
      }

      const { width: w, height: h } = img;
      const canvas = createCanvas(w, h);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const { data } = ctx.getImageData(0, 0, w, h);
      const pixels = rgbaToInt24Array(data);

      return JSON.stringify([`${w}x${h}`, ...pixels]);
    }

    /**
     * Encodes a JSON array of 24-bit integers into a PNG Data URL.
     * Accepts arrays with or without the "WxH" header produced by pngToArray.
     */
    arrayToPng(args) {
      let arr;
      try {
        arr = JSON.parse(args.ARRAY);
      } catch {
        return "";
      }
      if (!Array.isArray(arr) || arr.length === 0) return "";

      let w = Math.floor(Number(args.W));
      let h = Math.floor(Number(args.H));

      // Auto-detect the optional "WxH" header
      if (typeof arr[0] === "string" && /^\d+x\d+$/.test(arr[0])) {
        const [dw, dh] = arr[0].split("x").map(Number);
        if (w <= 0) w = dw;
        if (h <= 0) h = dh;
        arr = arr.slice(1);
      }

      if (w <= 0 || h <= 0) return "";

      const canvas = createCanvas(w, h);
      const ctx = canvas.getContext("2d");
      const imgData = ctx.createImageData(w, h);

      if (!int24ArrayToImageData(arr, imgData, w * h)) return "";

      ctx.putImageData(imgData, 0, 0);
      return canvas.toDataURL("image/png");
    }

    /**
     * Returns the width and height of a PNG Data URL as "width height".
     * Returns "0 0" on error.
     */
    async pngDimensions({ URL }) {
      // eslint-disable-next-line extension/check-can-fetch
      if (!(await Scratch.canFetch(URL))) return "0 0";

      try {
        const img = await loadImage(URL);
        return `${img.width} ${img.height}`;
      } catch {
        return "0 0";
      }
    }
  }

  Scratch.extensions.register(new PixelBridge());
})(Scratch);
