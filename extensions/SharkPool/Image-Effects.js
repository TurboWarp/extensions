// Name: Image Effects
// ID: imgEffectsSP
// Description: Apply a variety of new effects to the data URI of Images or Costumes.
// By: SharkPool
// Licence: MIT

// Version V.2.5.1

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Image Effects must run unsandboxed");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMzUuNzMxIiBoZWlnaHQ9IjEzNS43MzEiIHZpZXdCb3g9IjAgMCAxMzUuNzMxIDEzNS43MzEiPjxnIGZpbGw9IiM5NmYiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTMuNzUgNjcuODY1YzAtMzUuNDEgMjguNzA1LTY0LjExNSA2NC4xMTUtNjQuMTE1czY0LjExNSAyOC43MDUgNjQuMTE1IDY0LjExNS0yOC43MDUgNjQuMTE1LTY0LjExNSA2NC4xMTVTMy43NSAxMDMuMjc1IDMuNzUgNjcuODY1eiIgc3Ryb2tlPSIjNzc0ZGNiIiBzdHJva2Utd2lkdGg9IjcuNSIvPjxwYXRoIGQ9Ik02OC4zMSA2MS4xMzNjNC4wOTUtMS42NzQgOS4zMDItMS4xOSAxMi4xMzktNS4wNTYgMi45NC00LjAwNiAzLjgyMi0xMi4zNTUgNC40NDgtMTcuMjU4LjYxLTQuNzc4IDEuNzYyLTQuNjExIDIuNjM2LjI0LjkyNSA1LjEzNSAyLjAzNSAxMy42NzggNC42NTQgMTcuMjQ3IDIuOTkzIDQuMDc4IDguOTIzIDMuODQ0IDEzLjMwNiA1LjUyMiAzLjA3NyAxLjE3OCAyLjgwMyAxLjg1My0uNTU4IDIuNTYzLTQuMzE1LjkxMy05LjkwMyAxLjY1OC0xMi45MTYgNS43NjMtMy4xNzkgNC4zMzItNC4yNjIgMTQuNjktNS4wMDYgMjAuODQzLS41MSA0LjIyLTEuOTQ5IDIuNDIyLTIuMjE2LjI3Ni0uNzctNi4xODktMS45NjYtMTYuODMxLTUuNTIyLTIxLjY3Ni0yLjUxNy0zLjQzLTYuNjk2LTQuMDQ4LTEwLjExOC01LTQuNjE2LTEuMjg2LTUuMTMyLTEuNzEzLS44NDctMy40NjR6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMTUiLz48cGF0aCBkPSJNODAuNDQ5IDU2LjA3N2MyLjk0LTQuMDA2IDIuODIyLTEyLjM1NSAzLjQ0OC0xNy4yNTguNjEtNC43NzggMy44NzMtNC42MTEgNC43NDcuMjQuOTI1IDUuMTM1LjkyNCAxMy42NzggMy41NDMgMTcuMjQ3IDIuOTkzIDQuMDc4IDguMzY3IDIuNzMzIDEyLjc1IDQuNDExIDMuMDc4IDEuMTc4IDMuMzU5IDMuODUzLS4wMDIgNC41NjMtNC4zMTUuOTEzLTkuOTAzLjc2OS0xMi45MTYgNC44NzQtMy4xNzkgNC4zMzItMy40ODQgMTQuOTEyLTQuMjI4IDIxLjA2NS0uNTEgNC4yMi0zLjcyNyAyLjItMy45OTQuMDU0LS43Ny02LjE4OS0uOTY2LTE2LjgzMS00LjUyMi0yMS42NzYtMi41MTctMy40My03LjQ3NC0zLjM4MS0xMC44OTYtNC4zMzQtNC42MTYtMS4yODUtNC4zNTQtMy4yNjgtLjA3LTUuMDIgMCAwIDkuMzAzLS4zIDEyLjE0LTQuMTY2Ii8+PHBhdGggZD0iTTQyLjAzIDQwLjJjMS40OTMtMS42NDcgMS45NC01LjA3OCAyLjI1OS03LjA5NC4zMS0xLjk2My44OTQtMS44OTUgMS4zMzguMS40NyAyLjExIDEuMDMzIDUuNjIgMi4zNjMgNy4wODggMS41MiAxLjY3NiA0LjUzIDEuNTggNi43NTYgMi4yNyAxLjU2Mi40ODQgMS40MjMuNzYtLjI4MyAxLjA1My0yLjE5MS4zNzUtNS4wMjguNjgtNi41NTggMi4zNjgtMS42MTQgMS43OC0yLjE2NCA2LjAzOC0yLjU0MiA4LjU2Ny0uMjU5IDEuNzM0LS45OS45OTUtMS4xMjUuMTEzLS4zOS0yLjU0My0uOTk4LTYuOTE3LTIuODA0LTguOTA5LTEuMjc3LTEuNDEtMy40LTEuNjYzLTUuMTM3LTIuMDU1LTIuMzQ0LS41MjgtMi42MDYtLjcwNC0uNDMtMS40MjQgMCAwIDQuNzIzLS40ODkgNi4xNjMtMi4wNzd6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMTAiLz48cGF0aCBkPSJNNDIuMDMgNDAuMmMxLjQ5My0xLjY0NyAxLjI3NC00Ljk2NyAxLjU5Mi02Ljk4Mi4zMS0xLjk2NCAyLjExNy0yLjAwNyAyLjU2LS4wMTMuNDcgMi4xMS40NzggNS42MjIgMS44MDggNy4wODkgMS41MiAxLjY3NiA0LjMwOC42MzUgNi41MzQgMS4zMjUgMS41NjIuNDg0IDEuNjQ1IDIuMjYxLS4wNjEgMi41NTMtMi4xOTEuMzc1LTUuMDI4LjEyNi02LjU1OCAxLjgxMy0xLjYxNCAxLjc4LTEuMTY0IDYuMDM4LTEuNTQyIDguNTY3LS4yNTkgMS43MzQtMi43NjcuOTk1LTIuOTAzLjExMy0uMzktMi41NDMtLjIyLTYuOTE3LTIuMDI2LTguOTA5LTEuMjc3LTEuNDEtNC4yODgtLjk5Ny02LjAyNi0xLjM4OC0yLjAwNC0uNDUyLTEuMjY0LTIuMjAxIDAtMi42OTguMjE0LS4wODQgNS4xODIuMTE4IDYuNjIyLTEuNDciLz48cGF0aCBkPSJNNDguNzIxIDkyLjY3NWMxLjU2Mi0xLjk1NyAyLjAzLTYuMDMzIDIuMzYzLTguNDI3LjMyNC0yLjMzMy45MzYtMi4yNTEgMS40LjExOC40OTIgMi41MDcgMS4wODIgNi42NzcgMi40NzMgOC40MiAxLjU5IDEuOTkxIDQuNzQgMS44NzcgNy4wNjggMi42OTYgMS42MzUuNTc2IDEuNDkuOTA1LS4yOTYgMS4yNTItMi4yOTIuNDQ1LTUuMjYuODA5LTYuODYxIDIuODE0LTEuNjg5IDIuMTE1LTIuMjY0IDcuMTcyLTIuNjYgMTAuMTc2LS4yNyAyLjA2LTEuMDM1IDEuMTgzLTEuMTc3LjEzNS0uNDA5LTMuMDIyLTEuMDQ0LTguMjE4LTIuOTMzLTEwLjU4NC0xLjMzNy0xLjY3NC0zLjU1Ny0xLjk3Ni01LjM3NS0yLjQ0MS0yLjQ1Mi0uNjI4LTIuNzI2LS44MzYtLjQ1LTEuNjkxIDAgMCA0Ljk0Mi0uNTgxIDYuNDQ4LTIuNDY4eiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEwIi8+PHBhdGggZD0iTTQ4LjcyMSA5Mi42NzVjMS41NjItMS45NTcgMS4zNjQtNi4wMzMgMS42OTctOC40MjcuMzI0LTIuMzMzIDIuMzgtMi4yNTEgMi44NDQuMTE4LjQ5MiAyLjUwNy4zMDQgNi42NzcgMS42OTUgOC40MiAxLjU5IDEuOTkxIDQuMjk2Ljk0NyA2LjYyNCAxLjc2NiAxLjYzNS41NzUgMS45MzMgMi4zOS4xNDggMi43MzctMi4yOTIuNDQ2LTUuMjYuMjU0LTYuODYxIDIuMjU5LTEuNjg5IDIuMTE1LTEuNDg2IDcuMTcyLTEuODgyIDEwLjE3Ni0uMjcgMi4wNi0yLjU5IDEuMTgzLTIuNzMyLjEzNS0uNDEtMy4wMjItLjI2Ny04LjIxOC0yLjE1Ni0xMC41ODQtMS4zMzctMS42NzQtNC4wMDItMS41MzItNS44Mi0xLjk5Ny0yLjQ1Mi0uNjI3LTIuMjgxLTEuODM2LS4wMDUtMi42OSAwIDAgNC45NDItLjAyNiA2LjQ0OC0xLjkxNHoiLz48L2c+PC9zdmc+";

  const cast = Scratch.Cast;
  const hexToRgb = (hex) => {
    return [
      parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16),
      hex.length === 9 ? parseInt(hex.slice(7, 9), 16) : 255
    ];
  };
  const rgbaToHex = (r, g, b, a) => {
    const alpha = a !== undefined ? Math.round(a).toString(16).padStart(2, "0") : "";
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}${alpha}`;
  };
  const imageEffectMenu = [
    "Saturation", "Contrast", "Opaque", "Glitch", "Chunk Glitch", "Clip Glitch", "Vignette",
    "Ripple", "Displacement", "Posterize", "Blur", "Sepia", "Scanlines", "Grain", "Cubism",
  ];

  class imgEffectsSP {
    constructor() {
      this.cutPos = [0, 0];
      this.scale = [100, 100];
      this.cutoutDirection = 90;
      this.softness = 10;
      this.allShards = [];
    }
    getInfo() {
      return {
        id: "imgEffectsSP",
        name: "Image Effects",
        menuIconURI,
        color1: "#9966FF",
        color2: "#774DCB",
        blocks: [
          {
            opcode: "applyHueEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply hue [COLOR] to URI [SVG]",
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: "svg/data-uri" },
              COLOR: { type: Scratch.ArgumentType.COLOR }
            }
          },
          "---",
          {
            opcode: "deleteColor",
            blockType: Scratch.BlockType.REPORTER,
            text: "remove color [COLOR] from [DATA_URI]",
            arguments: {
              COLOR: { type: Scratch.ArgumentType.COLOR },
              DATA_URI: { type: Scratch.ArgumentType.STRING, defaultValue: "svg/data-uri" }
            }
          },
          {
            opcode: "replaceColor",
            blockType: Scratch.BlockType.REPORTER,
            text: "replace color [COLOR] with [REPLACE] in [DATA_URI]",
            arguments: {
              COLOR: { type: Scratch.ArgumentType.COLOR },
              REPLACE: { type: Scratch.ArgumentType.COLOR, defaultValue: "#00ff00" },
              DATA_URI: { type: Scratch.ArgumentType.STRING, defaultValue: "svg/data-uri" }
            }
          },
          {
            opcode: "replaceColorPattern",
            blockType: Scratch.BlockType.REPORTER,
            text: "replace color [COLOR] with [PATTERN] scaled [SCALE] in [DATA_URI]",
            arguments: {
              COLOR: { type: Scratch.ArgumentType.COLOR },
              PATTERN: { type: Scratch.ArgumentType.STRING, defaultValue: "svg/data-uri" },
              SCALE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              DATA_URI: { type: Scratch.ArgumentType.STRING, defaultValue: "svg/data-uri" }
            }
          },
          {
            opcode: "setSoftness",
            blockType: Scratch.BlockType.COMMAND,
            text: "set color detection softness to [AMT]%",
            arguments: {
              AMT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
            }
          },
          "---",
          {
            opcode: "applyEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "set [EFFECT] effect of URI [SVG] to [PERCENTAGE]%",
            arguments: {
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTS" },
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: "svg/data-uri" },
              PERCENTAGE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 }
            }
          },
          {
            opcode: "applyBulgeEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "set bulge effect of URI [SVG] to [STRENGTH]% at x [CENTER_X] y [CENTER_Y]",
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: "svg/data-uri" },
              STRENGTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              CENTER_X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              CENTER_Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "applyWaveEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "set wave effect of URI [SVG] to amplitude x [AMPX] y [AMPY] and frequency x [FREQX] y [FREQY]",
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: "svg/data-uri" },
              AMPX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              AMPY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              FREQX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              FREQY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            }
          },
          {
            opcode: "applyLineGlitchEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "set line glitch of URI [SVG] to [PERCENTAGE]% on [DIRECT] axis and line width [WIDTH]",
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: "svg/data-uri" },
              PERCENTAGE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              DIRECT: { type: Scratch.ArgumentType.STRING, menu: "POSITIONS" },
              WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            }
          },
          {
            opcode: "applyAbberationEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "set abberation of URI [SVG] to colors [COLOR1] and [COLOR2] at [PERCENTAGE]% on [DIRECT] axis",
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: "svg/data-uri" },
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
            text: "remove pixels from URI [SVG] [REMOVE] [THRESHOLD]% transparency",
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: "svg/data-uri" },
              THRESHOLD: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              REMOVE: { type: Scratch.ArgumentType.STRING, menu: "REMOVAL" }
            }
          },
          {
            opcode: "applyEdgeOutlineEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "add outline to URI [SVG] thickness [THICKNESS] color [COLOR]",
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: "svg/data-uri" },
              THICKNESS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: "Clipping" },
          {
            opcode: "maskImage", blockType: Scratch.BlockType.REPORTER,
            text: "[TYPE] [MASK] from [IMG]",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "MASKING" },
              IMG: { type: Scratch.ArgumentType.STRING, defaultValue: "source-here" },
              MASK: { type: Scratch.ArgumentType.STRING, defaultValue: "cutout-here" }
            }
          },
          "---",
          {
            opcode: "setCutout",
            blockType: Scratch.BlockType.COMMAND,
            text: "set clipping position to x [X] y [Y]",
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "changeCutout",
            blockType: Scratch.BlockType.COMMAND,
            text: "change clipping position by x [X] y [Y]",
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "currentCut",
            blockType: Scratch.BlockType.REPORTER,
            text: "clipping [POS]",
            disableMonitor: true,
            arguments: {
              POS: { type: Scratch.ArgumentType.STRING, menu: "POSITIONS" }
            }
          },
          "---",
          {
            opcode: "setScale",
            blockType: Scratch.BlockType.COMMAND,
            text: "set clipping size to x [SIZE] y [Y]",
            arguments: {
              SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            }
          },
          {
            opcode: "changeScale",
            blockType: Scratch.BlockType.COMMAND,
            text: "change clipping size by x [SIZE] y [Y]",
            arguments: {
              SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "currentScale",
            blockType: Scratch.BlockType.REPORTER,
            text: "clipping size [POS]",
            disableMonitor: true,
            arguments: {
              POS: { type: Scratch.ArgumentType.STRING, menu: "POSITIONS" }
            }
          },
          "---",
          {
            opcode: "setDirection",
            blockType: Scratch.BlockType.COMMAND,
            text: "set clipping direction to [ANGLE]",
            arguments: {
              ANGLE: { type: Scratch.ArgumentType.ANGLE, defaultValue: 90 }
            }
          },
          {
            opcode: "changeDirection",
            blockType: Scratch.BlockType.COMMAND,
            text: "change clipping direction by [ANGLE]",
            arguments: {
              ANGLE: { type: Scratch.ArgumentType.ANGLE, defaultValue: 15 }
            }
          },
          {
            opcode: "currentDir",
            blockType: Scratch.BlockType.REPORTER,
            text: "clipping direction"
          },
          "---",
          {
            opcode: "crackImage",
            blockType: Scratch.BlockType.COMMAND,
            text: "crack [URI] into [SHARDS] shards",
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue: "svg/data-uri" },
              SHARDS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            }
          },
          {
            opcode: "getShard",
            blockType: Scratch.BlockType.REPORTER,
            text: "get shard #[SHARD]",
            arguments: {
              SHARD: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: "Pixels" },
          {
            opcode: "commonCol",
            blockType: Scratch.BlockType.REPORTER,
            text: "[TYPE] common color in [URI]",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "DOMINANT" },
              URI: { type: Scratch.ArgumentType.STRING, defaultValue: "svg/data-uri" }
            }
          },
          "---",
          {
            opcode: "numPixels",
            blockType: Scratch.BlockType.REPORTER,
            text: "number of pixels [TYPE] in [URI]",
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue: "svg/data-uri" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "PIXELTYPE" }
            }
          },
          {
            opcode: "getPixel",
            blockType: Scratch.BlockType.REPORTER,
            text: "get hex of pixel #[NUM] in [URI]",
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue: "svg/data-uri" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: "setPixel",
            blockType: Scratch.BlockType.REPORTER,
            text: "set color of pixel #[NUM] to [COLOR] in [URI]",
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue: "svg/data-uri" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              COLOR: { type: Scratch.ArgumentType.COLOR }
            }
          },
          {
            opcode: "setPixels",
            blockType: Scratch.BlockType.REPORTER,
            text: "set color of pixels from #[NUM] to [NUM2] to [COLOR] in [URI]",
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue: "svg/data-uri" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              NUM2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              COLOR: { type: Scratch.ArgumentType.COLOR }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: "Image Conversions" },
          {
            opcode: "svgToBitmap",
            blockType: Scratch.BlockType.REPORTER,
            text: "convert svg content [SVG] to bitmap with width [WIDTH] height [HEIGHT]",
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: "<svg />" },
              WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              HEIGHT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            }
          },
          {
            opcode: "convertImageToSVG",
            blockType: Scratch.BlockType.REPORTER,
            text: "convert bitmap URI [URI] to svg [TYPE]",
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue: "svg/data-uri" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "fileType" }
            }
          },
          {
            opcode: "makeSVGimage",
            blockType: Scratch.BlockType.REPORTER,
            text: "make svg with image URI [URI] to svg [TYPE]",
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue: "svg/data-uri" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "fileType" }
            }
          },
          {
            opcode: "upscaleImage",
            blockType: Scratch.BlockType.REPORTER,
            text: "upscale image URI [URI] by [NUM] %",
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue: "svg/data-uri" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            }
          },
          "---",
          {
            opcode: "stretchImg",
            blockType: Scratch.BlockType.REPORTER,
            text: "stretch URI [URI] to width [W] height [H]",
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue: "svg/data-uri" },
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 200 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            }
          },
          "---",
          {
            opcode: "audioToImage",
            blockType: Scratch.BlockType.REPORTER,
            text: "convert audio URI [AUDIO_URI] to PNG with width [W] height [H]",
            arguments: {
              AUDIO_URI: { type: Scratch.ArgumentType.STRING, defaultValue: "audio_uri_here" },
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            }
          },
          {
            opcode: "skewSVG",
            blockType: Scratch.BlockType.REPORTER,
            text: "skew SVG content [SVG] at x [Y] y [X] as [TYPE]",
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: "<svg>" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "fileType" }
            }
          },
          {
            opcode: "removeThorns",
            blockType: Scratch.BlockType.REPORTER,
            text: "remove vector thorns from [SVG]",
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: "<svg>" }
            }
          }
        ],
        menus: {
          POSITIONS: ["X", "Y"],
          MASKING: ["clip", "mask", "overlay"],
          PIXELTYPE: ["total", "per line", "per row"],
          REMOVAL: ["under", "over", "equal to"],
          DOMINANT: ["most", "least"],
          fileType: ["content", "dataURI"],
          EFFECTS: { acceptReporters: true, items: imageEffectMenu }
        },
      };
    }

    // Helper Funcs
    clamp(value, min, max) { return Math.min(max, Math.max(min, value)) }

    printImg(img, width, height) {
      const { canvas, ctx } = this.createCanvasCtx(Math.abs(width) || img.width, Math.abs(height) || img.height);
      ctx.save();
      ctx.scale(width < 0 ? -1 : 1, height < 0 ? -1 : 1);
      ctx.drawImage(img, width < 0 ? -Math.abs(width) : 0, height < 0 ? -Math.abs(height) : 0, canvas.width, canvas.height);
      ctx.restore();
      return ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    }

    exportImg(img, pixelData, width, height) {
      const { canvas, ctx } = this.createCanvasCtx(Math.abs(width) || img.width, Math.abs(height) || img.height);
      ctx.putImageData(new ImageData(new Uint8ClampedArray(pixelData), canvas.width, canvas.height), 0, 0);
      return canvas.toDataURL();
    }

    createCanvasCtx(w, h, img, x, y) {
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (img !== undefined) ctx.drawImage(img, x, y);
      return { canvas, ctx };
    }

    getImageBounds(imageData) {
      const { data, width, height } = imageData;
      let minX = width, minY = height, maxX = 0, maxY = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (data[((y * width + x) * 4) + 3] > 0) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      return { width: maxX - minX + 1, height: maxY - minY + 1, offsetX: minX, offsetY: minY };
    }

    convertAsset(input, type) {
      if (input && (input.startsWith("http") || input.startsWith("data:image/") || input.startsWith("<svg"))) {
        if (type === "png") return input.startsWith("<svg") ? `data:image/svg+xml;base64,${btoa(input)}` : input;
        else return input.startsWith("data:image/") ? this.makeSVGimage({ URI: input, TYPE: "content" }) : input;
      }
      return menuIconURI;
    }

    // Block Funcs
    setSoftness(args) { this.softness = cast.toNumber(args.AMT) }

    applyHueEffect(args) {
      return new Promise((resolve) => {
        const color = hexToRgb(args.COLOR);
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const data = this.printImg(img);
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, (data[i] * color[0]) / 255);
            data[i + 1] = Math.min(255, (data[i + 1] * color[1]) / 255);
            data[i + 2] = Math.min(255, (data[i + 2] * color[2]) / 255);
            data[i + 3] = Math.min(255, (data[i + 3] * (color[3] ?? 255)) / 255);
          }
          resolve(this.exportImg(img, data));
        };
        img.src = this.convertAsset(args.SVG, "png");
      });
    }

    deleteColor(args) { return this.replaceColor({ ...args, REPLACE : "#00000000" }) }

    replaceColor(args) {
      const colRem = hexToRgb(args.COLOR);
      const colRep = hexToRgb(args.REPLACE);
      return new Promise(resolve => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const inRange = (val, target) => val >= target - this.softness && val <= target + this.softness;
          const pixelData = this.printImg(img);
          for (let i = 0; i < pixelData.length; i += 4) {
            const [r, g, b] = pixelData.slice(i, i + 3);
            if (inRange(r, colRem[0]) && inRange(g, colRem[1]) && inRange(b, colRem[2])) pixelData.set(colRep, i);
          }
          resolve(this.exportImg(img, pixelData));
        };
        img.src = this.convertAsset(args.DATA_URI, "png");
      });
    }

    replaceColorPattern(args) {
      const colRem = hexToRgb(args.COLOR);
      const tileSize = cast.toNumber(args.SCALE);
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const pattern = new Image();
          pattern.crossOrigin = "Anonymous";
          pattern.onload = () => {
            const inRange = (val, target) => val >= target - this.softness && val <= target + this.softness;
            const { width, height } = img;
            const finalCanvas = document.createElement("canvas");
            finalCanvas.width = width;
            finalCanvas.height = height;
            const finalCtx = finalCanvas.getContext("2d");

            const ctx = this.createCanvasCtx(width, height, img, 0, 0).ctx;
            const ogData = ctx.getImageData(0, 0, width, height);
            const moddedData = ctx.getImageData(0, 0, width, height);
            for (let i = 0; i < moddedData.data.length; i += 4) {
              const r = moddedData.data[i], g = moddedData.data[i + 1], b = moddedData.data[i + 2];
              if (inRange(r, colRem[0]) && inRange(g, colRem[1]) && inRange(b, colRem[2])) moddedData.data[i + 3] = 0;
            }
            finalCtx.putImageData(moddedData, 0, 0);

            const maskUtil = this.createCanvasCtx(width, height, img, 0, 0);
            const maskCanvas = maskUtil.canvas;
            const maskCtx = maskUtil.ctx;
            const maskData = maskCtx.createImageData(width, height);
            for (let i = 0; i < ogData.data.length; i += 4) {
              const r = ogData.data[i], g = ogData.data[i + 1], b = ogData.data[i + 2];
              if (inRange(r, colRem[0]) && inRange(g, colRem[1]) && inRange(b, colRem[2])) {
                maskData.data[i] = 255;
                maskData.data[i + 1] = 255;
                maskData.data[i + 2] = 255;
                maskData.data[i + 3] = 255;
              } else {
                maskData.data[i] = 0;
                maskData.data[i + 1] = 0;
                maskData.data[i + 2] = 0;
                maskData.data[i + 3] = 0;
              }
            }
            maskCtx.putImageData(maskData, 0, 0);

            const pattCanvas = document.createElement("canvas");
            pattCanvas.width = width;
            pattCanvas.height = height;
            const pattCtx = pattCanvas.getContext("2d");
            for (let y = 0; y < height; y += tileSize) {
              for (let x = 0; x < width; x += tileSize) pattCtx.drawImage(pattern, x, y, tileSize, tileSize);
            }

            pattCtx.globalCompositeOperation = "destination-in";
            pattCtx.drawImage(maskCanvas, 0, 0);
            pattCtx.globalCompositeOperation = "source-over";
            finalCtx.drawImage(pattCanvas, 0, 0);
            resolve(finalCanvas.toDataURL());
          };
          pattern.src = this.convertAsset(args.PATTERN, "png");
        };
        img.src = this.convertAsset(args.DATA_URI, "png");
      });
    }

    applyEffect(args) {
      return new Promise((resolve) => {
        const percent = cast.toNumber(args.PERCENTAGE);
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = async () => {
          const { canvas, ctx } = this.createCanvasCtx(img.width, img.height, img, 0, 0);
          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const effectFunc = this[`apply${cast.toString(args.EFFECT).replaceAll(" ", "")}`];
          if (effectFunc && typeof effectFunc === "function") await effectFunc(imageData, percent, ctx);
          else resolve("");
          if (imageData.isAltered === undefined) ctx.putImageData(imageData, 0, 0);
          else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height);
            if (imageData.extraDraw) imageData.extraDraw(ctx);
          }
          resolve(canvas.toDataURL());
        };
        img.src = this.convertAsset(args.SVG, "png");
      });
    }
    applySaturation(imageData, amtIn, ctx) {
      ctx.filter = `saturate(${Math.abs(amtIn)}%)${amtIn < 0 ? " invert(100%)" : ""}`;
      imageData.isAltered = true;
    }
    applyContrast(imageData, amtIn, ctx) {
      ctx.filter = `contrast(${Math.max(0, amtIn / 100) + 1})`;
      imageData.isAltered = true;
    }
    applyOpaque(imageData, amtIn) {
      const data = imageData.data;
      amtIn = Math.max((amtIn + 100) / 100, 0);
      for (let i = 0; i < data.length; i += 4) data[i + 3] = data[i + 3] * amtIn;
    }
    applyGlitch(imageData, amtIn) {
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() * 100 <= amtIn) {
          const rnd = () => (Math.random() - 0.5) * amtIn * 3;
          for (let j = 0; j < 3; j++) data[i + j] = (data[i + j] + rnd()) % 256;
        }
      }
    }
    applyChunkGlitch(imageData, amtIn) {
      const { data, width, height} = imageData;
      const newWidth = amtIn / 10;
      for (let i = 0; i < Math.floor(width * 1); i++) {
        const linePos = Math.floor(Math.random() * height);
        const lineStart = linePos - Math.floor(newWidth / 2);
        const lineEnd = lineStart + newWidth;
        for (let y = 0; y < height; y++) {
          const srcIndex = (y * width + linePos) * 4;
          if (linePos >= 0 && linePos < width) {
            for (let x = lineStart; x < lineEnd; x++) {
              data.copyWithin((y * width + x) * 4, srcIndex, srcIndex + 4);
            }
          }
        }
      }
    }
    applyClipGlitch(imageData, amtIn) {
      const { data, width, height} = imageData;
      amtIn /= 100;
      const numPixelsToEnlarge = Math.floor((amtIn / 100) * (width * height));
      for (let i = 0; i < numPixelsToEnlarge; i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        const index = (y * width + x) * 4;
        const enlargeFactor = 1 + Math.random() * (1.5 + amtIn / 200);
        const blurRadius = Math.floor(enlargeFactor * 4);
        for (let offsetY = -blurRadius; offsetY <= blurRadius; offsetY++) {
          for (let offsetX = -blurRadius; offsetX <= blurRadius; offsetX++) {
            const newX = x + offsetX;
            const newY = y + offsetY;
            const bounded = newX >= 0 && newX < width && newY >= 0 && newY < height;
            if (bounded) data.copyWithin((newY * width + newX) * 4, index, index + 4);
          }
        }
      }
    }
    applyVignette(imageData, amtIn, ctx) {
      const { width, height} = imageData;
      const col = amtIn > 0 ? 255 : 0;
      amtIn = Math.abs(amtIn) / 100;
      const grad = ctx.createRadialGradient(
        width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) / 1.5
      );
      grad.addColorStop(0, `rgba(${col}, ${col}, ${col}, 0)`);
      grad.addColorStop(1, `rgba(${col}, ${col}, ${col}, ${amtIn})`);
      imageData.isAltered = true;
      imageData.extraDraw = (ctx) => {
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      };
    }
    applyRipple(imageData, amtIn) {
      const { data, width, height} = imageData;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          const dx = x - (width / 2);
          const dy = y - (height / 2);
          const distance = Math.sqrt(dx * dx + dy * dy);
          const offset = Math.sin(distance * (amtIn / 100)) * (amtIn / 100);
          const sourceX = Math.floor(x + offset);
          const sourceY = Math.floor(y);
          if (sourceX >= 0 && sourceX < width && sourceY >= 0 && sourceY < height) {
            const sourceIndex = (sourceY * width + sourceX) * 4;
            if (data[sourceIndex + 3] > 0) data.copyWithin(index, sourceIndex, sourceIndex + 4);
            else data[index + 3] = 0;
          } else { data[index + 3] = 0 }
        }
      }
    }
    applyDisplacement(imageData, dispAmt) {
      const { data, width, height} = imageData;
      const newData = new Uint8ClampedArray(data.length);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const srcX = x + Math.floor(Math.random() * dispAmt * 2 - dispAmt);
          const srcY = y + Math.floor(Math.random() * dispAmt * 2 - dispAmt);
          if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < height) {
            const srcIndex = (srcY * width + srcX) * 4;
            const dstIndex = (y * width + x) * 4;
            newData.set(data.subarray(srcIndex, srcIndex + 4), dstIndex);
          }
        }
      }
      data.set(newData);
    }
    applyPosterize(imageData, amtIn) {
      const data = imageData.data;
      const numLevels = Math.max(amtIn / 10, 1);
      for (let i = 0; i < data.length; i += 4) {
        for (let j = 0; j < 3; j++) {
          data[i + j] = Math.round((data[i + j] * (numLevels - 1)) / 255) * (255 / (numLevels - 1));
        }
      }
    }
    applyBlur(imageData, amtIn, ctx) {
      ctx.filter = `blur(${amtIn}px)`;
      imageData.isAltered = true;
    }
    applySepia(imageData, amtIn, ctx) {
      ctx.filter = `sepia(${amtIn}%)`;
      imageData.isAltered = true;
    }
    applyScanlines(imageData, amtIn) {
      const { data, width, height} = imageData;
      for (let y = 0; y < height; y++) {
        if (Math.random() < amtIn / 100) {
          const scanBright = Math.random() * (amtIn / 2);
          for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            data[index] = Math.min(data[index] + scanBright, 255);
            data[index + 1] = Math.min(data[index + 1] + scanBright, 255);
            data[index + 2] = Math.min(data[index + 2] + scanBright, 255);
          }
        }
      }
    }
    applyGrain(imageData, amtIn) {
      const { data, width, height} = imageData;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          if (Math.random() < amtIn) {
            const grain = Math.floor(Math.random() * amtIn);
            data[index] += grain;
            data[index + 1] += grain;
            data[index + 2] += grain;
          }
        }
      }
    }
    applyCubism(imageData, amtIn) {
      const { data, width, height} = imageData;
      const percent = amtIn === 0 ? 1 : Math.abs(amtIn);
      for (let y = 0; y < height; y += percent) {
        for (let x = 0; x < width; x += percent) {
          const endX = Math.min(x + percent, width);
          const endY = Math.min(y + percent, height);
          const avgColor = [0, 0, 0];
          for (let j = y; j < endY; j++) {
            for (let i = x; i < endX; i++) {
              const index = (j * width + i) * 4;
              avgColor[0] += data[index];
              avgColor[1] += data[index + 1];
              avgColor[2] += data[index + 2];
            }
          }
          const totalPixels = (endX - x) * (endY - y);
          avgColor[0] /= totalPixels;
          avgColor[1] /= totalPixels;
          avgColor[2] /= totalPixels;
          for (let j = y; j < endY; j++) {
            for (let i = x; i < endX; i++) {
              const index = (j * width + i) * 4;
              data[index] = avgColor[0];
              data[index + 1] = avgColor[1];
              data[index + 2] = avgColor[2];
            }
          }
        }
      }
    }

    applyBulgeEffect(args) {
      return new Promise((resolve) => {
        const strength = cast.toNumber(args.STRENGTH) / 100;
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const canvasSize = Math.max(img.width, img.height) * 2;
          let centerX = cast.toNumber(args.CENTER_X) / 100;
          let centerY = cast.toNumber(args.CENTER_Y) / -100;
          const { canvas, ctx } = this.createCanvasCtx(canvasSize, canvasSize);
          const offsetX = (canvas.width - img.width) / 2;
          const offsetY = (canvas.height - img.height) / 2;
          ctx.drawImage(img, offsetX, offsetY);
          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          this.bulgeApplier(imageData, centerX + 0.5, centerY + 0.5, strength);
          ctx.putImageData(imageData, 0, 0);
          const bounds = this.getImageBounds(imageData);
          const newCanvas = this.createCanvasCtx(bounds.width, bounds.height, canvas, -bounds.offsetX, -bounds.offsetY).canvas;
          resolve(newCanvas.toDataURL());
        };
        img.src = this.convertAsset(args.SVG, "png");
      });
    }
    bulgeApplier(imageData, centerX, centerY, strength) {
      const { data, width, height } = imageData;
      const newData = new Uint8ClampedArray(data.length);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const dx = (x / width - centerX) * 2;
          const dy = (y / height - centerY) * 2;
          const bulge = Math.pow(Math.sqrt(dx * dx + dy * dy), strength);
          const srcX = Math.floor(x + dx * bulge * width);
          const srcY = Math.floor(y + dy * bulge * height);
          if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < height) {
            const srcIndex = (srcY * width + srcX) * 4;
            newData.set(data.subarray(srcIndex, srcIndex + 4), (y * width + x) * 4);
          }
        }
      }
      data.set(newData);
    }

    applyWaveEffect(args) {
      return new Promise((resolve) => {
        const ampX = cast.toNumber(args.AMPX) / 10;
        const ampY = cast.toNumber(args.AMPY) / 10;
        const freqX = cast.toNumber(args.FREQX) / 100;
        const freqY = cast.toNumber(args.FREQY) / 100;
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const { canvas, ctx } = this.createCanvasCtx(img.width, img.height, img, 0, 0);
          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          this.waveApplier(imageData, ampX, ampY, freqX, freqY);
          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL());
        };
        img.src = this.convertAsset(args.SVG, "png");
      });
    }
    waveApplier(imageData, ampX, ampY, freqX, freqY) {
      const { data, width, height} = imageData;
      const newData = new Uint8ClampedArray(data.length);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const srcX = Math.floor(x + ampX * Math.sin(y * freqX));
          const srcY = Math.floor(y + ampY * Math.sin(x * freqY));
          if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < height) {
            const srcIndex = (srcY * width + srcX) * 4;
            const dstIndex = (y * width + x) * 4;
            newData.set(data.subarray(srcIndex, srcIndex + 4), dstIndex);
          }
        }
      }
      data.set(newData);
    }

    removeTransparencyEffect(args) {
      return new Promise((resolve) => {
        const threshold = cast.toNumber(args.THRESHOLD) / 100;
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const { canvas, ctx } = this.createCanvasCtx(img.width, img.height, img, 0, 0);
          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          this.transparncyApplier(imageData, threshold, args.REMOVE);
          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL());
        };
        img.src = this.convertAsset(args.SVG, "png");
      });
    }
    transparncyApplier(imageData, threshold, removeUnder) {
      const { data, width, height} = imageData;
      for (let i = 0; i < width * height; i++) {
        const alpha = data[i * 4 + 3] / 255;
        if (
          (removeUnder === "under" && alpha < threshold) || (removeUnder === "over" && alpha > threshold) ||
          (removeUnder === "equal to" && alpha > threshold - 0.01 &&
          alpha < threshold + 0.01)
        ) {
          data[i * 4 + 3] = 0;
        }
      }
    }

    applyLineGlitchEffect(args) {
      return new Promise((resolve) => {
        const amtIn = cast.toNumber(args.PERCENTAGE) / 100;
        const width = cast.toNumber(args.WIDTH) / 50;
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const { canvas, ctx } = this.createCanvasCtx(img.width, img.height, img, 0, 0);
          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          this.lineApplier(imageData, amtIn, args.DIRECT, width);
          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL());
        };
        img.src = this.convertAsset(args.SVG, "png");
      });
    }
    lineApplier(imageData, amtIn, direct, widthInp) {
      const { data, width, height} = imageData;
      const numLines = Math.floor(height * amtIn);
      for (let lineIndex = 0; lineIndex < numLines; lineIndex++) {
        const linePosition = Math.floor(Math.random() * height);
        const lineStart = linePosition - Math.floor(widthInp / 2);
        const lineEnd = lineStart + widthInp;
        for (let y = (direct === "Y" ? 0 : lineStart); y < (direct === "Y" ? height : lineEnd); y++) {
          for (let x = (direct === "Y" ? lineStart : 0); x < (direct === "Y" ? lineEnd : width); x++) {
            const srcX = (direct === "Y" ? x : linePosition);
            const srcY = (direct === "Y" ? linePosition : y);
            if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < height) {
              const srcIndex = (srcY * width + srcX) * 4;
              data.copyWithin((y * width + x) * 4, srcIndex, srcIndex + 4);
            }
          }
        }
      }
    }

    applyEdgeOutlineEffect(args) {
      return new Promise((resolve) => {
        const thick = Math.ceil(cast.toNumber(args.THICKNESS) / 4);
        const color = hexToRgb(args.COLOR);
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const { canvas, ctx } = this.createCanvasCtx(img.width + (thick * 2), img.height + (thick * 2), img, thick, thick);
          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          this.outlineApplier(imageData, thick, color);
          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL());
        };
        img.src = this.convertAsset(args.SVG, "png");
      });
    }
    outlineApplier(imageData, thick, rgba) {
      let { data, width, height } = imageData;
      const copyData = new Uint8ClampedArray(data);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          if (data[index + 3] < 255) {
            for (let dy = -thick; dy <= thick; dy++) {
              for (let dx = -thick; dx <= thick; dx++) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                  const neighborIndex = (ny * width + nx) * 4;
                  if (copyData[neighborIndex + 3] === 255) {
                    data.set(rgba, index);
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }

    setCutout(args) { this.cutPos = [cast.toNumber(args.X), cast.toNumber(args.Y)] }
    changeCutout(args) {
      this.cutPos = [this.cutPos[0] + cast.toNumber(args.X),
      this.cutPos[1] + cast.toNumber(args.Y)];
    }
    currentCut(args) { return this.cutPos[args.POS === "X" ? 0 : 1] }

    setScale(args) { this.scale = [cast.toNumber(args.SIZE), cast.toNumber(args.Y)] }
    changeScale(args) {
      this.scale = [this.scale[0] + cast.toNumber(args.SIZE),
      this.scale[1] + cast.toNumber(args.Y)];
    }
    currentScale(args) { return this.scale[args.POS === "X" ? 0 : 1] }

    setDirection(args) { this.cutoutDirection = cast.toNumber(args.ANGLE) }
    changeDirection(args) {
      let direction = this.cutoutDirection + cast.toNumber(args.ANGLE);
      if (direction > 180) { direction = -180 + cast.toNumber(args.ANGLE) }
      if (direction < -180) { direction = 180 + cast.toNumber(args.ANGLE) }
      this.cutoutDirection = direction;
    }
    currentDir() { return this.cutoutDirection }

    maskImage(args) {
      return new Promise((resolve) => {
        const srcImg = new Image();
        srcImg.crossOrigin = "Anonymous";
        srcImg.onload = () => {
          const maskImg = new Image();
          maskImg.crossOrigin = "Anonymous";
          maskImg.onload = () => {
            const scaleW = maskImg.width * (this.scale[0] / 50);
            const scaleH = maskImg.height * (this.scale[1] / 50);
            const cutX = this.cutPos[0] + (srcImg.width / 2) - (scaleW / 2);
            const cutY = this.cutPos[1] - (srcImg.height / 2) + (scaleH / 2);
            const { canvas, ctx } = this.createCanvasCtx(srcImg.width, srcImg.height);
            ctx.drawImage(srcImg, 0, 0);
            if (args.TYPE === "clip") ctx.globalCompositeOperation = "destination-in";
            else if (args.TYPE === "mask") ctx.globalCompositeOperation = "destination-out";
            ctx.translate(cutX + scaleW / 2, cutY * -1 + scaleH / 2);
            ctx.rotate((this.cutoutDirection - 90) * (Math.PI / 180));
            ctx.drawImage(maskImg, scaleW / -2, scaleH / -2, scaleW, scaleH);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            if (args.TYPE === "clip") ctx.globalCompositeOperation = "source-over";
            resolve(canvas.toDataURL("image/png"));
          };
          maskImg.src = this.convertAsset(args.MASK, "png");
        };
        srcImg.src = this.convertAsset(args.IMG, "png");
      });
    }

    applyAbberationEffect(args) {
      return new Promise((resolve) => {
        const amtIn = cast.toNumber(args.PERCENTAGE);
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const { canvas, ctx } = this.createCanvasCtx(img.width + Math.abs(amtIn) * 5, img.height + Math.abs(amtIn) * 5, img, Math.abs(amtIn) * 2.5, Math.abs(amtIn) * 2.5);
          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          this.applyChromAb(imageData, args.COLOR1, args.COLOR2, amtIn / 100, args.DIRECT);
          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL());
        };
        img.src = this.convertAsset(args.SVG, "png");
      });
    }
    applyChromAb(imageData, color1, color2, amtIn, dir) {
      let { data, width, height } = imageData;
      const copy1 = new Uint8ClampedArray(data.length);
      const copy2 = new Uint8ClampedArray(data.length);
      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const srcIndex = (y * width + x) * 4;
          const r = data[srcIndex];
          const g = data[srcIndex + 1];
          const b = data[srcIndex + 2];
          const a = data[srcIndex + 3];
          let newPos1, newPos2;
          if (dir === "X") {
            newPos1 = [x + Math.floor((width / 2) * amtIn), y];
            newPos2 = [x - Math.floor((width / 2) * amtIn), y];
          } else {
            newPos1 = [x, y + Math.floor((height / 2) * amtIn)];
            newPos2 = [x, y - Math.floor((height / 2) * amtIn)];
          }
          newPos1 = [this.clamp(width - 1, 0, newPos1[0]), this.clamp(height - 1, 0, newPos1[1])];
          newPos2 = [this.clamp(width - 1, 0, newPos2[0]), this.clamp(height - 1, 0, newPos2[1])];
          const leftColor = [(rgb1[0] * r) / 255, (rgb1[1] * g) / 255, (rgb1[2] * b) / 255];
          const rightColor = [(rgb2[0] * r) / 255, (rgb2[1] * g) / 255, (rgb2[2] * b) / 255];
          const leftIndex = (newPos1[1] * width + newPos1[0]) * 4;
          const rightIndex = (newPos2[1] * width + newPos2[0]) * 4;
          for (let i = 0; i < 4; i++) {
            copy1[leftIndex + i] = leftColor[i];
            copy2[rightIndex + i] = rightColor[i];
          }
          copy1[leftIndex + 3] = copy2[rightIndex + 3] = a;
        }
      }
      for (let i = 0; i < data.length; i++) {
        data[i] = this.clamp((data[i] + copy1[i] + copy2[i]) / 2, 0, 255);
      }
    }

    stretch(src, w, h) {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          resolve(this.exportImg(img, this.printImg(img, w, h), w, h));
        };
        img.src = src;
      });
    }
    svgToBitmap(args) {
      return this.stretch(this.convertAsset(args.SVG, "png"),cast.toNumber(args.WIDTH), cast.toNumber(args.HEIGHT));
    }
    stretchImg(args) {
      return this.stretch(this.convertAsset(args.URI, "png"), cast.toNumber(args.W), cast.toNumber(args.H));
    }

    convertImageToSVG(args) {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = this.convertAsset(args.URI, "png");
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const ctx = this.createCanvasCtx(img.width, img.height, img).ctx;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
          svg.setAttribute("width", img.width.toFixed(5));
          svg.setAttribute("height", img.height.toFixed(5));
          svg.setAttribute("viewBox", `0,0,${img.width.toFixed(5)},${img.height.toFixed(5)}`);
          const mergedColors = new Map();
          for (let y = 0; y < img.height; y++) {
            for (let x = 0; x < img.width; x++) {
              const colorData = ctx.getImageData(x, y, 1, 1).data;
              if (colorData[3] === 0) continue;
              const color = `rgb(${colorData[0]}, ${colorData[1]}, ${colorData[2]})`;
              const pixelColor = ctx.getImageData(x + 1, y, 1, 1).data;
              if (color === `rgb(${pixelColor[0]}, ${pixelColor[1]}, ${pixelColor[2]})`) {
                const mergedPixel = mergedColors.get(color) || {x1: x, y1: y, x2: x + 1, y2: y};
                mergedPixel.x2++;
                mergedColors.set(color, mergedPixel);
              } else {
                mergedColors.forEach((mergedPixel, colorKey) => {
                  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                  rect.setAttribute("x", mergedPixel.x1.toFixed(5));
                  rect.setAttribute("y", mergedPixel.y1.toFixed(5));
                  rect.setAttribute("width", (mergedPixel.x2 - mergedPixel.x1 + 1).toFixed(5));
                  rect.setAttribute("height", (mergedPixel.y2 - mergedPixel.y1 + 1).toFixed(5));
                  rect.setAttribute("fill", colorKey);
                  svg.appendChild(rect);
                });
                mergedColors.clear();
              }
            }
          }
          let svgString = new XMLSerializer().serializeToString(svg);
          if (args.TYPE === "dataURI") svgString = `data:image/svg+xml;base64,${btoa(svgString)}`;
          resolve(svgString);
        };
      });
    }

    async makeSVGimage(args) {
      if (args.URI.startsWith("data:image/")) {
        return await new Promise((resolve) => {
          // eslint-disable-next-line
          const img = new Image();
          img.crossOrigin = "Anonymous";
          img.onload = () => {
            const { width, height } = img;
            const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
              width="${width / 2}" height="${(height / 2) + 0.001}" viewBox="0,0,${width / 2},${(height / 2) + 0.001}">
              <g transform="translate(${img.offsetLeft / -2},${img.offsetTop / -2})">
              <image x="0" y="0" transform="scale(0.5,0.5)" width="${width}" height="${height + 0.002}" 
              xlink:href="${img.src}"/></g></svg>`;
            resolve(args.TYPE === "dataURI" ? `data:image/svg+xml;base64,${btoa(svg)}` : svg);
          };
          img.src = this.convertAsset(args.URI, "png");
        });
      } else { return args.URI }
    }

    upscaleImage(args) {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const pixelData = this.printImg(img);
          const ctx = this.createCanvasCtx(img.width, img.height).ctx;
          ctx.putImageData(new ImageData(new Uint8ClampedArray(pixelData), img.width, img.height), 0, 0);
          const factor = cast.toNumber(args.NUM) / 10;
          const weights = [0, -factor, 0, -factor, 1 + 4 * factor, -factor, 0, -factor, 0];
          this.sharpen(ctx, img.width, img.height, weights, 25);
          resolve(this.exportImg(img, ctx.getImageData(0, 0, img.width, img.height).data));
        };
        img.src = this.convertAsset(args.URI, "png");
      });
    }
    sharpen(ctx, width, height, weights, alphaThreshold) {
      const data = ctx.getImageData(0, 0, width, height).data;
      const side = Math.round(Math.sqrt(weights.length));
      const halfSide = Math.floor(side / 2);
      const output = ctx.createImageData(width, height);
      const outData = output.data;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const pixelIndex = (y * width + x) * 4;
          let r = 0, g = 0, b = 0;
          for (let ky = 0; ky < side; ky++) {
            for (let kx = 0; kx < side; kx++) {
              const weight = weights[ky * side + kx];
              const neighborY = this.clamp(y + ky - halfSide, 0, height - 1);
              const neighborX = this.clamp(x + kx - halfSide, 0, width - 1);
              const neighborPixel = (neighborY * width + neighborX) * 4;
              r += data[neighborPixel] * weight;
              g += data[neighborPixel + 1] * weight;
              b += data[neighborPixel + 2] * weight;
            }
          }
          if (data[pixelIndex + 3] / 255 > alphaThreshold / 50) {
            outData[pixelIndex] = this.clamp(r, 0, 255);
            outData[pixelIndex + 1] = this.clamp(g, 0, 255);
            outData[pixelIndex + 2] = this.clamp(b, 0, 255);
            outData[pixelIndex + 3] = 255;
          } else { outData[pixelIndex + 3] = 0 }
        }
      }
      ctx.putImageData(output, 0, 0);
    }

    audioToImage(args) {
      const audioURI = args.AUDIO_URI;
      const imageWidth = Math.abs(cast.toString(args.W));
      const { canvas, ctx } = this.createCanvasCtx(imageWidth, Math.abs(cast.toString(args.H)));
      for (let i = 0; i < audioURI.length; i++) {
        const charCode = audioURI.charCodeAt(i);
        ctx.fillStyle = `rgb(${(charCode * 2) % 256},${(charCode * 3) % 256},${(charCode * 4) % 256})`;
        ctx.fillRect(i % imageWidth, Math.floor(i / imageWidth), 1, 1);
      }
      return canvas.toDataURL("image/png");
    }

    skewSVG(args) {
      let svg = this.updateView(args.SVG, Math.abs(args.X) + Math.abs(args.Y));
      const widthMatch = /width="([^"]*)"/.exec(svg);
      const heightMatch = /height="([^"]*)"/.exec(svg);
      if (widthMatch && heightMatch) {
        const width = parseFloat(widthMatch[1]);
        const height = parseFloat(heightMatch[1]);
        let transform = "";
        if (svg.includes("style=\"transform-origin: center; transform:")) svg = svg.replace(/(style="[^"]*transform:[^"]*)/, `$1 skew(${args.Y}deg, ${args.X}deg)`);
        else svg = svg.replace(`width="${width}" height="${height}"`, `width="${width}" height="${height}" style="transform-origin: center; transform: skew(${args.Y}deg, ${args.X}deg)"`);
        const curTransform = /transform="([^"]*)"/.exec(svg);
        const oldTransform = curTransform ? curTransform[1] : "";
        const newTransform = oldTransform ? `${oldTransform} ${transform}` : transform;
        svg = svg.replace(/transform="([^"]*)"/, `transform="${newTransform}"`);
        if (args.TYPE === "dataURI") svg = `data:image/svg+xml;base64,${btoa(svg)}`;
      }
      return svg;
    }
    updateView(svg, amt) {
      let values;
      const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);
      let viewBoxValues = -1;
      if (viewBoxMatch) viewBoxValues = viewBoxMatch[1].split(/\s*,\s*/).map(parseFloat);
      const translateMatch = svg.match(/<g transform="translate\((-?[\d.]+),(-?[\d.]+)\)/);
      let translateValues = -1;
      if (translateMatch) translateValues = [parseFloat(translateMatch[1]), parseFloat(translateMatch[2])];
      values = `${viewBoxValues},${translateValues}`;
      values = values.split(",");
      values = values.map(item => cast.toNumber(item));
      amt = cast.toNumber(amt);
      if (values.length > 3) {
        svg = svg.replace(/viewBox="([^"]+)"/, `viewBox="${values[0]},${values[1]},${values[2] + (amt * 2)},${values[3] + (amt * 2)}"`);
        svg = svg.replace(/width="([^"]+)"/, `width="${values[2] + (amt * 2)}"`);
        svg = svg.replace(/height="([^"]+)"/, `height="${values[3] + (amt * 2)}"`);
        svg = svg.replace(/<g transform="([^"]+)"/, `<g transform="translate(${values[4] + amt},${values[5] + amt})"`);
      }
      return svg;
    }

    removeThorns(args) {
      return cast.toString(args.SVG).replaceAll("linejoin=\"miter\"", "linejoin=\"round\"");
    }

    commonCol(args) {
      const img = new Image();
      img.src = this.convertAsset(args.URI, "png");
      return new Promise((resolve) => {
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const data = this.printImg(img);
          const colorCnt = {};
          for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] === 0) continue;
            const key = `${data[i]},${data[i + 1]},${data[i + 2]},${data[i + 3]}`;
            colorCnt[key] = (colorCnt[key] || 0) + 1;
          }
          let rgb = null;
          if (args.TYPE === "most") rgb = Object.keys(colorCnt).reduce((a, b) => colorCnt[a] > colorCnt[b] ? a : b);
          else rgb = Object.keys(colorCnt).reduce((a, b) => colorCnt[a] < colorCnt[b] ? a : b);
          rgb = rgb.split(",").map(Number);
          resolve(rgbaToHex(...rgb));
        };
      });
    }

    numPixels(args) {
      const img = new Image();
      img.src = this.convertAsset(args.URI, "png");
      return new Promise((resolve) => {
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          resolve(args.TYPE === "total" ? img.width * img.height : args.TYPE === "per line" ? img.width : img.height);
        };
      });
    }

    setPixel(args) { return this.setPixels(args) }
    setPixels(args) {
      const img = new Image();
      img.src = this.convertAsset(args.URI, "png");
      return new Promise((resolve) => {
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const startNum = cast.toNumber(args.NUM);
          const endNum = cast.toNumber(args.NUM2) || startNum;
          const pixelData = this.printImg(img);
          for (let num = startNum; num <= endNum && num <= img.width * img.height; num++) {
            const rgb = hexToRgb(args.COLOR);
            for (let i = 0; i < 4; i++) pixelData[((num - 1) * 4) + i] = rgb[i];
          }
          resolve(this.exportImg(img, pixelData));
        };
      });
    }

    getPixel(args) {
      const img = new Image();
      img.src = this.convertAsset(args.URI, "png");
      return new Promise((resolve) => {
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const targetPixel = cast.toNumber(args.NUM);
          const pixelData = this.printImg(img);
          if (targetPixel >= 1 && targetPixel <= img.width * img.height) {
            const pixelIndex = (targetPixel - 1) * 4;
            const rgba = pixelData.slice(pixelIndex, pixelIndex + 4);
            resolve(rgbaToHex(rgba[0], rgba[1], rgba[2], rgba[3]));
          } else { resolve("#00000000") }
        };
      });
    }

    crackImage(args) {
      const cracks = Math.max(2, args.SHARDS);
      const img = new Image();
      img.src = this.convertAsset(args.URI, "png");
      const newWidth = img.width * 4;
      const newHeight = img.height * 4;
      this.allShards = [];
      return new Promise((resolve) => {
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          for (let i = 0; i < cracks; i++) {
            if (this.allShards.length >= args.SHARDS) break;
            for (let j = 0; j < cracks; j++) {
              if (this.allShards.length >= args.SHARDS) break;
              const shardWidth = newWidth / cracks;
              const shardHeight = newHeight / cracks;
              const { canvas, ctx } = this.createCanvasCtx(shardWidth, shardHeight);
              ctx.clearRect(0, 0, shardWidth, shardHeight);
              ctx.beginPath();
              ctx.moveTo(Math.random() * shardWidth, Math.random() * shardHeight);
              for (let k = 0; k < Math.random() * 10 + 3; k++) {
                ctx.lineTo(Math.random() * shardWidth, Math.random() * shardHeight);
              }
              ctx.closePath();
              ctx.clip();
              const offsetX = Math.random() * (newWidth - shardWidth);
              const offsetY = Math.random() * (newHeight - shardHeight);
              ctx.drawImage(img, -offsetX, -offsetY, newWidth, newHeight);
              this.allShards.push(this.exportImg(canvas, this.printImg(canvas)));
            }
          }
          resolve();
        };
      });
    }

    getShard(args) { return this.allShards[args.SHARD - 1] || "" }
  }

  Scratch.extensions.register(new imgEffectsSP());
})(Scratch);
