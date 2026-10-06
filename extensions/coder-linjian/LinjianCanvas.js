(function (Scratch) {
  "use strict";

  /**
   * Linjian's Canvas
   * ------------------------------------------------------------
   * A TurboWarp extension that adds a Canvas 2D overlay on top of
   * the stage, allowing scripts to draw shapes, paths, and text
   * directly without going through sprites.
   *
   * Author : Coder Linjian
   * License: MIT
   * Version: 1.0.0
   *
   * Notes
   *   - Must be loaded as an UNSANDBOXED extension.
   *   - Coordinates follow Scratch conventions: origin at center,
   *     x to the right, y upwards, stage is 480 x 360 units.
   * ------------------------------------------------------------
   */

  const blockIcon =
    "data:image/png;base64,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";

  class LinjianCanvasExt {
    constructor() {
      this.canvas = null;
      this.ctx = null;
      this.visible = true;
      this._originalParentPosition = "";
      this._resizeObserver = null;
      this._onWindowResize = null;

      this._fontSize = 16;
      this._fontFamily = "sans-serif";
      this._textAlign = "left";
      this._textBaseline = "alphabetic";

      this._gradients = new Map();
      this._lastError = "No error";
    }

    getInfo() {
      return {
        id: "linjianCanvas",
        name: Scratch.translate("Linjian's Canvas"),
        color1: "#4C97FF",
        color2: "#3373CC",
        menuIconURI: blockIcon,
        blockIconURI: blockIcon,
        blocks: [
          // ===== 1. Canvas Management =====
          {
            opcode: "initCanvas",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("initialize canvas"),
          },
          {
            opcode: "destroyCanvas",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("destroy canvas"),
          },
          {
            opcode: "clearCanvas",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("clear canvas"),
          },
          {
            opcode: "syncCanvasSize",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("sync canvas size to stage"),
          },
          {
            opcode: "setCanvasVisible",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set overlay to [STATE]"),
            arguments: {
              STATE: {
                type: Scratch.ArgumentType.STRING,
                menu: "visibleMenu",
                defaultValue: "show",
              },
            },
          },
          {
            opcode: "showCanvas",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("show overlay"),
          },
          {
            opcode: "hideCanvas",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("hide overlay"),
          },
          {
            opcode: "toggleCanvas",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("toggle overlay visibility"),
          },
          {
            opcode: "canvasVisible",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("overlay visible?"),
          },
          {
            opcode: "setCanvasZIndex",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set overlay z-index [Z]"),
            arguments: {
              Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
            },
          },

          "---",

          // ===== 2. Drawing State =====
          {
            opcode: "setFillColor",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set fill color [C]"),
            arguments: {
              C: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
            },
          },
          {
            opcode: "setStrokeColor",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set stroke color [C]"),
            arguments: {
              C: { type: Scratch.ArgumentType.COLOR, defaultValue: "#0000ff" },
            },
          },
          {
            opcode: "setFillColorRGBA",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set fill color R:[R] G:[G] B:[B] A:[A]"),
            arguments: {
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 255 },
              G: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              A: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
          },
          {
            opcode: "setStrokeColorRGBA",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set stroke color R:[R] G:[G] B:[B] A:[A]"),
            arguments: {
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              G: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 255 },
              A: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
          },
          {
            opcode: "setLineWidth",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set line width [W]"),
            arguments: {
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
          },
          {
            opcode: "setAlpha",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set global alpha [A]"),
            arguments: {
              A: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
          },
          {
            opcode: "setLineCap",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set line cap [CAP]"),
            arguments: {
              CAP: {
                type: Scratch.ArgumentType.STRING,
                menu: "lineCapMenu",
                defaultValue: "butt",
              },
            },
          },
          {
            opcode: "setLineJoin",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set line join [JOIN]"),
            arguments: {
              JOIN: {
                type: Scratch.ArgumentType.STRING,
                menu: "lineJoinMenu",
                defaultValue: "miter",
              },
            },
          },
          {
            opcode: "setComposite",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set composite mode [MODE]"),
            arguments: {
              MODE: {
                type: Scratch.ArgumentType.STRING,
                menu: "compositeMenu",
                defaultValue: "source-over",
              },
            },
          },
          {
            opcode: "setFont",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set font [SIZE] px [FAMILY]"),
            arguments: {
              SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 16 },
              FAMILY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sans-serif",
              },
            },
          },
          {
            opcode: "saveState",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("save drawing state"),
          },
          {
            opcode: "restoreState",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("restore drawing state"),
          },
          {
            opcode: "setShadow",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set shadow color:[C] blur:[B] offset x:[X] offset y:[Y]",
            ),
            arguments: {
              C: { type: Scratch.ArgumentType.COLOR, defaultValue: "#000000" },
              B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 8 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 },
            },
          },
          {
            opcode: "setShadowRGBA",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set shadow R:[R] G:[G] B:[B] A:[A] blur:[BLUR] offset x:[X] offset y:[Y]",
            ),
            arguments: {
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              G: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              A: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0.5 },
              BLUR: { type: Scratch.ArgumentType.NUMBER, defaultValue: 8 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 },
            },
          },
          {
            opcode: "clearShadow",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("clear shadow"),
          },

          "---",

          // ===== 3. Basic Shapes =====
          {
            opcode: "fillRect",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "fill rect center x:[X] center y:[Y] width:[W] height:[H]",
            ),
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          {
            opcode: "strokeRect",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "stroke rect center x:[X] center y:[Y] width:[W] height:[H]",
            ),
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          {
            opcode: "clearRect",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "clear rect center x:[X] center y:[Y] width:[W] height:[H]",
            ),
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          {
            opcode: "fillRoundRect",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "fill round rect center x:[X] center y:[Y] width:[W] height:[H] radius:[R]",
            ),
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 60 },
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 12 },
            },
          },
          {
            opcode: "strokeRoundRect",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "stroke round rect center x:[X] center y:[Y] width:[W] height:[H] radius:[R]",
            ),
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 60 },
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 12 },
            },
          },
          {
            opcode: "clearRoundRect",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "clear round rect center x:[X] center y:[Y] width:[W] height:[H] radius:[R]",
            ),
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 60 },
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 12 },
            },
          },
          {
            opcode: "fillCircle",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("fill circle x:[X] y:[Y] radius:[R]"),
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
            },
          },
          {
            opcode: "strokeCircle",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stroke circle x:[X] y:[Y] radius:[R]"),
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
            },
          },
          {
            opcode: "fillEllipse",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "fill ellipse x:[X] y:[Y] radiusX:[RX] radiusY:[RY] rotation:[ROT]",
            ),
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              RX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 80 },
              RY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 40 },
              ROT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "strokeEllipse",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "stroke ellipse x:[X] y:[Y] radiusX:[RX] radiusY:[RY] rotation:[ROT]",
            ),
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              RX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 80 },
              RY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 40 },
              ROT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "drawLine",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "draw line x1:[X1] y1:[Y1] x2:[X2] y2:[Y2]",
            ),
            arguments: {
              X1: { type: Scratch.ArgumentType.NUMBER, defaultValue: -100 },
              Y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              X2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              Y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "drawPolygon",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "draw polygon sides:[N] center x:[X] center y:[Y] radius:[R] rotation:[ROT] mode:[FILL]",
            ),
            arguments: {
              N: { type: Scratch.ArgumentType.NUMBER, defaultValue: 6 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              ROT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              FILL: {
                type: Scratch.ArgumentType.STRING,
                menu: "fillMenu",
                defaultValue: "fill",
              },
            },
          },
          {
            opcode: "beginPath",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("begin path"),
          },
          {
            opcode: "moveTo",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("move to x:[X] y:[Y]"),
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "lineTo",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("line to x:[X] y:[Y]"),
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "quadraticCurveTo",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "quadratic curve ctrl x:[CX] ctrl y:[CY] end x:[X] end y:[Y]",
            ),
            arguments: {
              CX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              CY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "bezierCurveTo",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "bezier curve c1 x:[C1X] c1 y:[C1Y] c2 x:[C2X] c2 y:[C2Y] end x:[X] end y:[Y]",
            ),
            arguments: {
              C1X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 30 },
              C1Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              C2X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 70 },
              C2Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "arc",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "arc (add to path) x:[X] y:[Y] radius:[R] start:[A1] end:[A2]",
            ),
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              A1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              A2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 180 },
            },
          },
          {
            opcode: "closePath",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("close path"),
          },
          {
            opcode: "fillPath",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("fill path"),
          },
          {
            opcode: "strokePath",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stroke path"),
          },

          "---",

          // ===== 4. Text =====
          {
            opcode: "fillText",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("fill text [TEXT] x:[X] y:[Y]"),
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "Hello" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "strokeText",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stroke text [TEXT] x:[X] y:[Y]"),
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "Hello" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "fillTextMaxWidth",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "fill text [TEXT] x:[X] y:[Y] max width:[MAXW]",
            ),
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello world",
              },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              MAXW: { type: Scratch.ArgumentType.NUMBER, defaultValue: 200 },
            },
          },
          {
            opcode: "strokeTextMaxWidth",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "stroke text [TEXT] x:[X] y:[Y] max width:[MAXW]",
            ),
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello world",
              },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              MAXW: { type: Scratch.ArgumentType.NUMBER, defaultValue: 200 },
            },
          },
          {
            opcode: "setTextAlign",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set text align [ALIGN]"),
            arguments: {
              ALIGN: {
                type: Scratch.ArgumentType.STRING,
                menu: "textAlignMenu",
                defaultValue: "left",
              },
            },
          },
          {
            opcode: "setTextBaseline",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set text baseline [BASE]"),
            arguments: {
              BASE: {
                type: Scratch.ArgumentType.STRING,
                menu: "textBaselineMenu",
                defaultValue: "alphabetic",
              },
            },
          },
          {
            opcode: "measureText",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("width of text [TEXT]"),
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "Hello" },
            },
          },

          "---",

          // ===== 5. Gradient =====
          {
            opcode: "createLinearGradient",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "create linear gradient ID:[ID] x1:[X1] y1:[Y1] x2:[X2] y2:[Y2]",
            ),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "g1" },
              X1: { type: Scratch.ArgumentType.NUMBER, defaultValue: -100 },
              Y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              X2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              Y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "createRadialGradient",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "create radial gradient ID:[ID] inner x:[X1] inner y:[Y1] inner r:[R1] outer x:[X2] outer y:[Y2] outer r:[R2]",
            ),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "g1" },
              X1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              R1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              X2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              R2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          {
            opcode: "addGradientStop",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "gradient [ID] add color [C] at position [P]",
            ),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "g1" },
              P: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              C: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
            },
          },
          {
            opcode: "addGradientStopRGBA",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "gradient [ID] add color R:[R] G:[G] B:[B] A:[A] at position [P]",
            ),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "g1" },
              P: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 255 },
              G: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              A: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
          },
          {
            opcode: "setFillGradient",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set fill to gradient [ID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "g1" },
            },
          },
          {
            opcode: "setStrokeGradient",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set stroke to gradient [ID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "g1" },
            },
          },
          {
            opcode: "deleteGradient",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete gradient [ID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "g1" },
            },
          },
          {
            opcode: "clearGradients",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("clear all gradients"),
          },

          "---",

          // ===== 6. Export =====
          {
            opcode: "exportAsSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("export overlay as new sprite"),
          },
          {
            opcode: "exportAsCostume",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("export overlay as costume of selected sprite"),
          },
          {
            opcode: "exportDataURL",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("overlay DataURL"),
          },

          "---",

          // ===== 7. Error Reporting =====
          {
            opcode: "getLastError",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("last error"),
          },
          {
            opcode: "clearErrors",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("clear error record"),
          },
        ],
        menus: {
          visibleMenu: { acceptReporters: false, items: ["show", "hide"] },
          fillMenu: { acceptReporters: false, items: ["fill", "stroke", "both"] },
          lineCapMenu: {
            acceptReporters: false,
            items: ["butt", "round", "square"],
          },
          lineJoinMenu: {
            acceptReporters: false,
            items: ["miter", "round", "bevel"],
          },
          compositeMenu: {
            acceptReporters: false,
            items: [
              "source-over",
              "source-atop",
              "source-in",
              "source-out",
              "destination-over",
              "destination-atop",
              "destination-in",
              "destination-out",
              "lighter",
              "copy",
              "xor",
              "multiply",
              "screen",
              "overlay",
              "darken",
              "lighten",
              "color-dodge",
              "color-burn",
              "hard-light",
              "soft-light",
              "difference",
              "exclusion",
              "hue",
              "saturation",
              "color",
              "luminosity",
            ],
          },
          textAlignMenu: {
            acceptReporters: false,
            items: [
              { text: "left", value: "left" },
              { text: "right", value: "right" },
              { text: "center", value: "center" },
              { text: "start", value: "start" },
              { text: "end", value: "end" },
            ],
          },
          textBaselineMenu: {
            acceptReporters: false,
            items: [
              { text: "top", value: "top" },
              { text: "hanging", value: "hanging" },
              { text: "middle", value: "middle" },
              { text: "alphabetic", value: "alphabetic" },
              { text: "ideographic", value: "ideographic" },
              { text: "bottom", value: "bottom" },
            ],
          },
        },
      };
    }

    // ============================================================
    // Error Reporting
    // ============================================================

    _setError(blockName, message) {
      this._lastError = `[${blockName}] ${message}`;
    }

    getLastError() {
      return this._lastError;
    }

    clearErrors() {
      this._lastError = "No error";
    }

    _requireCanvas(blockName) {
      if (!this.ctx) {
        this._setError(blockName, "canvas not initialized, please run \"initialize canvas\" first");
        return false;
      }
      return true;
    }

    // ============================================================
    // 1. Canvas Management
    // ============================================================

    initCanvas() {
      if (this.canvas) return;

      const vm = Scratch.vm;
      if (!vm || !vm.runtime) {
        this._setError("initialize canvas", "cannot access Scratch VM");
        return;
      }
      const renderer = vm.runtime.renderer;
      if (!renderer || !renderer.canvas) {
        this._setError(
          "initialize canvas",
          "cannot access stage renderer (is it running in a sandbox?)",
        );
        return;
      }

      const stageCanvas = renderer.canvas;
      const parent = stageCanvas.parentElement;

      this.canvas = document.createElement("canvas");
      this.canvas.width = Math.round(stageCanvas.width);
      this.canvas.height = Math.round(stageCanvas.height);
      Object.assign(this.canvas.style, {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: "10",
        visibility: "visible",
      });

      this._originalParentPosition = parent.style.position;
      if (getComputedStyle(parent).position === "static") {
        parent.style.position = "relative";
      }

      parent.appendChild(this.canvas);
      this.ctx = this.canvas.getContext("2d");
      this.visible = true;

      this._applyFont();
      this.ctx.textAlign = this._textAlign;
      this.ctx.textBaseline = this._textBaseline;

      this._onWindowResize = () => this._syncSize();
      if (typeof ResizeObserver !== "undefined") {
        this._resizeObserver = new ResizeObserver(() => this._syncSize());
        this._resizeObserver.observe(stageCanvas);
      }
      window.addEventListener("resize", this._onWindowResize);
    }

    destroyCanvas() {
      if (!this.canvas) return;

      if (this._resizeObserver) {
        this._resizeObserver.disconnect();
        this._resizeObserver = null;
      }
      if (this._onWindowResize) {
        window.removeEventListener("resize", this._onWindowResize);
        this._onWindowResize = null;
      }

      const parent = this.canvas.parentElement;
      this.canvas.remove();

      if (parent) {
        parent.style.position = this._originalParentPosition;
      }

      this.canvas = null;
      this.ctx = null;
      this.visible = false;
      this._originalParentPosition = "";
      this._gradients.clear();
    }

    clearCanvas() {
      if (!this._requireCanvas("clear canvas")) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    syncCanvasSize() {
      this._syncSize();
    }

    setCanvasVisible(args) {
      this._applyVisible(args.STATE === "show");
    }
    showCanvas() {
      this._applyVisible(true);
    }
    hideCanvas() {
      this._applyVisible(false);
    }
    toggleCanvas() {
      this._applyVisible(!this.visible);
    }
    canvasVisible() {
      return this.visible;
    }

    setCanvasZIndex(args) {
      if (!this.canvas) return;
      this.canvas.style.zIndex = String(args.Z);
    }

    _applyVisible(state) {
      this.visible = state;
      if (this.canvas) {
        this.canvas.style.visibility = state ? "visible" : "hidden";
      }
    }

    _syncSize() {
      if (!this.canvas || !this.ctx) return;
      const vm = Scratch.vm;
      if (!vm || !vm.runtime) return;
      const renderer = vm.runtime.renderer;
      if (!renderer || !renderer.canvas) return;

      const stageCanvas = renderer.canvas;
      const newW = Math.round(stageCanvas.width);
      const newH = Math.round(stageCanvas.height);

      if (this.canvas.width === newW && this.canvas.height === newH) {
        return;
      }

      const saved = document.createElement("canvas");
      saved.width = this.canvas.width;
      saved.height = this.canvas.height;
      saved.getContext("2d").drawImage(this.canvas, 0, 0);

      this.canvas.width = newW;
      this.canvas.height = newH;

      this.ctx.drawImage(saved, 0, 0, newW, newH);

      this._applyFont();
      this.ctx.textAlign = this._textAlign;
      this.ctx.textBaseline = this._textBaseline;
    }

    // ============================================================
    // 2. Drawing State
    // ============================================================

    setFillColor(args) {
      if (this.ctx) this.ctx.fillStyle = args.C;
    }
    setStrokeColor(args) {
      if (this.ctx) this.ctx.strokeStyle = args.C;
    }
    setLineWidth(args) {
      if (this.ctx) this.ctx.lineWidth = args.W;
    }
    setAlpha(args) {
      if (this.ctx) this.ctx.globalAlpha = Math.max(0, Math.min(1, args.A));
    }
    setLineCap(args) {
      if (this.ctx) this.ctx.lineCap = args.CAP;
    }
    setLineJoin(args) {
      if (this.ctx) this.ctx.lineJoin = args.JOIN;
    }
    setComposite(args) {
      if (this.ctx) this.ctx.globalCompositeOperation = args.MODE;
    }
    saveState() {
      if (this.ctx) this.ctx.save();
    }
    restoreState() {
      if (this.ctx) this.ctx.restore();
    }

    setFillColorRGBA(args) {
      if (!this.ctx) return;
      this.ctx.fillStyle = this._rgba(args.R, args.G, args.B, args.A);
    }

    setStrokeColorRGBA(args) {
      if (!this.ctx) return;
      this.ctx.strokeStyle = this._rgba(args.R, args.G, args.B, args.A);
    }

    _rgba(r, g, b, a) {
      const R = Math.max(0, Math.min(255, Math.floor(Number(r) || 0)));
      const G = Math.max(0, Math.min(255, Math.floor(Number(g) || 0)));
      const B = Math.max(0, Math.min(255, Math.floor(Number(b) || 0)));
      const A = Math.max(0, Math.min(1, Number(a)));
      return `rgba(${R},${G},${B},${isNaN(A) ? 1 : A})`;
    }

    setFont(args) {
      this._fontSize = args.SIZE;
      this._fontFamily = args.FAMILY;
      this._applyFont();
    }

    setShadow(args) {
      if (!this.ctx) return;
      this.ctx.shadowColor = args.C;
      this.ctx.shadowBlur = this._sr(args.B);
      this.ctx.shadowOffsetX = this._sx(args.X);
      this.ctx.shadowOffsetY = this._sy(args.Y);
    }

    setShadowRGBA(args) {
      if (!this.ctx) return;
      this.ctx.shadowColor = this._rgba(args.R, args.G, args.B, args.A);
      this.ctx.shadowBlur = this._sr(args.BLUR);
      this.ctx.shadowOffsetX = this._sx(args.X);
      this.ctx.shadowOffsetY = this._sy(args.Y);
    }

    clearShadow() {
      if (!this.ctx) return;
      this.ctx.shadowColor = "transparent";
      this.ctx.shadowBlur = 0;
      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 0;
    }

    _applyFont() {
      if (!this.ctx) return;
      const size = Number(this._fontSize) || 16;
      const family = this._fontFamily || "sans-serif";
      this.ctx.font = `${size}px ${family}`;
    }

    // ============================================================
    // 3. Basic Shapes
    // ============================================================

    fillRect(args) {
      if (!this.ctx) return;
      const cx = this._x(args.X);
      const cy = this._y(args.Y);
      const w = this._sx(args.W);
      const h = this._sy(args.H);
      this.ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
    }

    strokeRect(args) {
      if (!this.ctx) return;
      const cx = this._x(args.X);
      const cy = this._y(args.Y);
      const w = this._sx(args.W);
      const h = this._sy(args.H);
      this.ctx.strokeRect(cx - w / 2, cy - h / 2, w, h);
    }

    clearRect(args) {
      if (!this.ctx) return;
      const cx = this._x(args.X);
      const cy = this._y(args.Y);
      const w = this._sx(args.W);
      const h = this._sy(args.H);
      this.ctx.clearRect(cx - w / 2, cy - h / 2, w, h);
    }

    fillRoundRect(args) {
      if (!this.ctx) return;
      const cx = this._x(args.X);
      const cy = this._y(args.Y);
      const w = this._sx(args.W);
      const h = this._sy(args.H);
      const r = this._sr(args.R);
      this._roundedRectPath(cx - w / 2, cy - h / 2, w, h, r);
      this.ctx.fill();
    }

    strokeRoundRect(args) {
      if (!this.ctx) return;
      const cx = this._x(args.X);
      const cy = this._y(args.Y);
      const w = this._sx(args.W);
      const h = this._sy(args.H);
      const r = this._sr(args.R);
      this._roundedRectPath(cx - w / 2, cy - h / 2, w, h, r);
      this.ctx.stroke();
    }

    clearRoundRect(args) {
      if (!this.ctx) return;
      const cx = this._x(args.X);
      const cy = this._y(args.Y);
      const w = this._sx(args.W);
      const h = this._sy(args.H);
      const r = this._sr(args.R);
      this._roundedRectPath(cx - w / 2, cy - h / 2, w, h, r);
      this.ctx.save();
      this.ctx.globalCompositeOperation = "destination-out";
      this.ctx.fill();
      this.ctx.restore();
    }

    _roundedRectPath(x, y, w, h, r) {
      const ctx = this.ctx;
      const radius = Math.min(Math.abs(r), w / 2, h / 2);

      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + w - radius, y);
      ctx.arcTo(x + w, y, x + w, y + radius, radius);
      ctx.lineTo(x + w, y + h - radius);
      ctx.arcTo(x + w, y + h, x + w - radius, y + h, radius);
      ctx.lineTo(x + radius, y + h);
      ctx.arcTo(x, y + h, x, y + h - radius, radius);
      ctx.lineTo(x, y + radius);
      ctx.arcTo(x, y, x + radius, y, radius);
      ctx.closePath();
    }

    fillCircle(args) {
      if (!this.ctx) return;
      this.ctx.beginPath();
      this.ctx.arc(
        this._x(args.X),
        this._y(args.Y),
        this._sr(args.R),
        0,
        Math.PI * 2,
      );
      this.ctx.fill();
    }

    strokeCircle(args) {
      if (!this.ctx) return;
      this.ctx.beginPath();
      this.ctx.arc(
        this._x(args.X),
        this._y(args.Y),
        this._sr(args.R),
        0,
        Math.PI * 2,
      );
      this.ctx.stroke();
    }

    fillEllipse(args) {
      if (!this.ctx) return;
      this.ctx.beginPath();
      this.ctx.ellipse(
        this._x(args.X),
        this._y(args.Y),
        this._sx(args.RX),
        this._sy(args.RY),
        (args.ROT * Math.PI) / 180,
        0,
        Math.PI * 2,
      );
      this.ctx.fill();
    }

    strokeEllipse(args) {
      if (!this.ctx) return;
      this.ctx.beginPath();
      this.ctx.ellipse(
        this._x(args.X),
        this._y(args.Y),
        this._sx(args.RX),
        this._sy(args.RY),
        (args.ROT * Math.PI) / 180,
        0,
        Math.PI * 2,
      );
      this.ctx.stroke();
    }

    drawLine(args) {
      if (!this.ctx) return;
      this.ctx.beginPath();
      this.ctx.moveTo(this._x(args.X1), this._y(args.Y1));
      this.ctx.lineTo(this._x(args.X2), this._y(args.Y2));
      this.ctx.stroke();
    }

    drawPolygon(args) {
      if (!this.ctx) return;
      const rawN = Number(args.N);
      const n = Number.isFinite(rawN) ? Math.max(3, Math.floor(rawN)) : 6;
      const rot = ((Number(args.ROT) || 0) * Math.PI) / 180;
      const cx = this._x(args.X);
      const cy = this._y(args.Y);
      const r = this._sr(args.R);

      this.ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const a = rot + (i / n) * Math.PI * 2 - Math.PI / 2;
        const px = cx + Math.cos(a) * r;
        const py = cy + Math.sin(a) * r;
        if (i === 0) this.ctx.moveTo(px, py);
        else this.ctx.lineTo(px, py);
      }
      this.ctx.closePath();

      if (args.FILL === "fill" || args.FILL === "both") this.ctx.fill();
      if (args.FILL === "stroke" || args.FILL === "both") this.ctx.stroke();
    }

    beginPath() {
      if (this.ctx) this.ctx.beginPath();
    }
    closePath() {
      if (this.ctx) this.ctx.closePath();
    }
    fillPath() {
      if (this.ctx) this.ctx.fill();
    }
    strokePath() {
      if (this.ctx) this.ctx.stroke();
    }

    moveTo(args) {
      if (!this.ctx) return;
      this.ctx.moveTo(this._x(args.X), this._y(args.Y));
    }

    lineTo(args) {
      if (!this.ctx) return;
      this.ctx.lineTo(this._x(args.X), this._y(args.Y));
    }

    quadraticCurveTo(args) {
      if (!this.ctx) return;
      this.ctx.quadraticCurveTo(
        this._x(args.CX),
        this._y(args.CY),
        this._x(args.X),
        this._y(args.Y),
      );
    }

    bezierCurveTo(args) {
      if (!this.ctx) return;
      this.ctx.bezierCurveTo(
        this._x(args.C1X),
        this._y(args.C1Y),
        this._x(args.C2X),
        this._y(args.C2Y),
        this._x(args.X),
        this._y(args.Y),
      );
    }

    arc(args) {
      if (!this.ctx) return;
      this.ctx.arc(
        this._x(args.X),
        this._y(args.Y),
        this._sr(args.R),
        (args.A1 * Math.PI) / 180,
        (args.A2 * Math.PI) / 180,
      );
    }

    // ============================================================
    // 4. Text
    // ============================================================

    fillText(args) {
      if (!this.ctx) return;
      this._applyFont();
      this.ctx.fillText(String(args.TEXT), this._x(args.X), this._y(args.Y));
    }

    strokeText(args) {
      if (!this.ctx) return;
      this._applyFont();
      this.ctx.strokeText(String(args.TEXT), this._x(args.X), this._y(args.Y));
    }

    fillTextMaxWidth(args) {
      if (!this.ctx) return;
      this._applyFont();
      this.ctx.fillText(
        String(args.TEXT),
        this._x(args.X),
        this._y(args.Y),
        this._sx(args.MAXW),
      );
    }

    strokeTextMaxWidth(args) {
      if (!this.ctx) return;
      this._applyFont();
      this.ctx.strokeText(
        String(args.TEXT),
        this._x(args.X),
        this._y(args.Y),
        this._sx(args.MAXW),
      );
    }

    setTextAlign(args) {
      this._textAlign = args.ALIGN;
      if (this.ctx) this.ctx.textAlign = args.ALIGN;
    }

    setTextBaseline(args) {
      this._textBaseline = args.BASE;
      if (this.ctx) this.ctx.textBaseline = args.BASE;
    }

    measureText(args) {
      const text = String(args.TEXT);
      const size = Number(this._fontSize) || 16;
      const family = this._fontFamily || "sans-serif";

      if (this.ctx && this.canvas) {
        this._applyFont();
        const m = this.ctx.measureText(text);
        return m.width * (480 / this.canvas.width);
      }

      const tmp = document.createElement("canvas");
      tmp.width = 480;
      tmp.height = 360;
      const tmpCtx = tmp.getContext("2d");
      tmpCtx.font = `${size}px ${family}`;
      return tmpCtx.measureText(text).width;
    }

    // ============================================================
    // 5. Gradient
    // ============================================================

    createLinearGradient(args) {
      if (!this._requireCanvas("create linear gradient")) return;
      const id = String(args.ID).trim();
      if (!id) {
        this._setError("create linear gradient", "ID cannot be empty");
        return;
      }
      if (this._gradients.has(id)) {
        this._setError(
          "create linear gradient",
          `gradient with ID "${id}" already exists. Delete it first or use a different ID`,
        );
        return;
      }
      try {
        const grad = this.ctx.createLinearGradient(
          this._x(args.X1),
          this._y(args.Y1),
          this._x(args.X2),
          this._y(args.Y2),
        );
        this._gradients.set(id, grad);
      } catch (e) {
        this._setError("create linear gradient", e.message || String(e));
      }
    }

    createRadialGradient(args) {
      if (!this._requireCanvas("create radial gradient")) return;
      const id = String(args.ID).trim();
      if (!id) {
        this._setError("create radial gradient", "ID cannot be empty");
        return;
      }
      if (this._gradients.has(id)) {
        this._setError(
          "create radial gradient",
          `gradient with ID "${id}" already exists. Delete it first or use a different ID`,
        );
        return;
      }
      const r1 = this._sr(args.R1);
      const r2 = this._sr(args.R2);
      if (r1 < 0 || r2 < 0) {
        this._setError("create radial gradient", "radii cannot be negative");
        return;
      }
      try {
        const grad = this.ctx.createRadialGradient(
          this._x(args.X1),
          this._y(args.Y1),
          r1,
          this._x(args.X2),
          this._y(args.Y2),
          r2,
        );
        this._gradients.set(id, grad);
      } catch (e) {
        this._setError("create radial gradient", e.message || String(e));
      }
    }

    _getGradient(id, blockName) {
      const key = String(id).trim();
      if (!key) {
        this._setError(blockName, "ID cannot be empty");
        return null;
      }
      const grad = this._gradients.get(key);
      if (!grad) {
        this._setError(
          blockName,
          `gradient with ID "${key}" not found, create it first`,
        );
        return null;
      }
      return grad;
    }

    addGradientStop(args) {
      const grad = this._getGradient(args.ID, "gradient add color stop");
      if (!grad) return;

      const p = Number(args.P);
      if (!Number.isFinite(p)) {
        this._setError("gradient add color stop", `position "${args.P}" is not a valid number`);
        return;
      }
      if (p < 0 || p > 1) {
        this._setError("gradient add color stop", `position ${p} is out of the 0-1 range`);
        return;
      }
      try {
        grad.addColorStop(p, args.C);
      } catch (e) {
        this._setError("gradient add color stop", e.message || String(e));
      }
    }

    addGradientStopRGBA(args) {
      const grad = this._getGradient(args.ID, "gradient add color stop (RGBA)");
      if (!grad) return;

      const p = Number(args.P);
      if (!Number.isFinite(p)) {
        this._setError("gradient add color stop (RGBA)", `position "${args.P}" is not a valid number`);
        return;
      }
      if (p < 0 || p > 1) {
        this._setError("gradient add color stop (RGBA)", `position ${p} is out of the 0-1 range`);
        return;
      }
      try {
        grad.addColorStop(p, this._rgba(args.R, args.G, args.B, args.A));
      } catch (e) {
        this._setError("gradient add color stop (RGBA)", e.message || String(e));
      }
    }

    setFillGradient(args) {
      if (!this._requireCanvas("set fill to gradient")) return;
      const grad = this._getGradient(args.ID, "set fill to gradient");
      if (!grad) return;
      this.ctx.fillStyle = grad;
    }

    setStrokeGradient(args) {
      if (!this._requireCanvas("set stroke to gradient")) return;
      const grad = this._getGradient(args.ID, "set stroke to gradient");
      if (!grad) return;
      this.ctx.strokeStyle = grad;
    }

    deleteGradient(args) {
      const key = String(args.ID).trim();
      if (!key) {
        this._setError("delete gradient", "ID cannot be empty");
        return;
      }
      if (!this._gradients.has(key)) {
        this._setError("delete gradient", `gradient with ID "${key}" not found`);
        return;
      }
      this._gradients.delete(key);
    }

    clearGradients() {
      this._gradients.clear();
    }

    // ============================================================
    // 6. Export
    // ============================================================

    async exportAsSprite() {
      if (!this._requireCanvas("export overlay as new sprite")) return;

      try {
        const vm = Scratch.vm;
        const storage = vm.runtime && vm.runtime.storage;
        if (!storage) {
          this._setError("export overlay as new sprite", "this environment does not support asset storage");
          return;
        }

        const placeholderBytes = this._base64ToBytes(
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
        );
        const placeholderAsset = storage.createAsset(
          storage.AssetType.ImageBitmap,
          storage.DataFormat.PNG,
          placeholderBytes,
          null,
          true,
        );
        if (!placeholderAsset || !placeholderAsset.assetId) {
          this._setError("export overlay as new sprite", "cannot create placeholder asset");
          return;
        }

        let maxLayer = 0;
        for (const t of vm.runtime.targets) {
          if (t.isOriginal && typeof t.layerOrder === "number") {
            maxLayer = Math.max(maxLayer, t.layerOrder);
          }
        }
        const layerOrder = Math.max(1, maxLayer + 1);

        const beforeIds = new Set(
          vm.runtime.targets.filter((t) => t.isOriginal).map((t) => t.id),
        );

        const placeholderMd5ext = `${placeholderAsset.assetId}.${placeholderAsset.dataFormat}`;

        const spriteJSON = {
          isStage: false,
          name: "Linjian Canvas",
          variables: {},
          lists: {},
          broadcasts: {},
          blocks: {},
          comments: {},
          currentCostume: 0,
          costumes: [
            {
              name: "placeholder",
              assetId: placeholderAsset.assetId,
              md5ext: placeholderMd5ext,
              dataFormat: placeholderAsset.dataFormat,
              bitmapResolution: 1,
              rotationCenterX: 0,
              rotationCenterY: 0,
            },
          ],
          sounds: [],
          volume: 100,
          layerOrder: layerOrder,
          visible: true,
          x: 0,
          y: 0,
          size: 100,
          direction: 90,
          draggable: false,
          rotationStyle: "all around",
        };

        await vm.addSprite(JSON.stringify(spriteJSON));

        const afterTargets = vm.runtime.targets.filter((t) => t.isOriginal);
        const newTarget = afterTargets.find((t) => !beforeIds.has(t.id));
        if (!newTarget) {
          this._setError("export overlay as new sprite", "cannot locate the newly created sprite");
          return;
        }

        const data = await this._canvasToPngBytes();
        if (!data || data.length === 0) {
          this._setError("export overlay as new sprite", "canvas PNG data is empty");
          return;
        }
        const canvasAsset = storage.createAsset(
          storage.AssetType.ImageBitmap,
          storage.DataFormat.PNG,
          data,
          null,
          true,
        );
        if (!canvasAsset || !canvasAsset.assetId) {
          this._setError("export overlay as new sprite", "canvas asset registration failed");
          return;
        }

        const canvasMd5ext = `${canvasAsset.assetId}.${canvasAsset.dataFormat}`;
        const costume = {
          asset: canvasAsset,
          md5ext: canvasMd5ext,
          name: "Linjian Canvas",
        };
        await vm.addCostume(canvasMd5ext, costume, newTarget.id);

        const costumes = newTarget.getCostumes();
        if (costumes && costumes.length > 0) {
          newTarget.setCostume(costumes.length - 1);
        }

        try {
          const list = newTarget.getCostumes();
          for (let i = list.length - 1; i >= 0; i--) {
            if (list[i].name === "placeholder") {
              newTarget.deleteCostume(i);
              break;
            }
          }
        } catch (e) {
          // deletion failure does not affect main functionality
        }
      } catch (e) {
        this._setError("export overlay as new sprite", e.message || String(e));
      }
    }

    async exportAsCostume() {
      if (!this._requireCanvas("export overlay as costume of selected sprite")) return;

      const vm = Scratch.vm;
      const target = vm.editingTarget;
      if (!target || !target.sprite) {
        this._setError("export overlay as costume of selected sprite", "no sprite is currently selected");
        return;
      }

      try {
        const storage = vm.runtime && vm.runtime.storage;
        if (!storage) {
          this._setError("export overlay as costume of selected sprite", "this environment does not support asset storage");
          return;
        }

        const data = await this._canvasToPngBytes();
        if (!data || data.length === 0) {
          this._setError("export overlay as costume of selected sprite", "canvas PNG data is empty");
          return;
        }

        const asset = storage.createAsset(
          storage.AssetType.ImageBitmap,
          storage.DataFormat.PNG,
          data,
          null,
          true,
        );

        if (!asset || !asset.assetId) {
          this._setError("export overlay as costume of selected sprite", "asset registration failed");
          return;
        }

        const md5ext = `${asset.assetId}.${asset.dataFormat}`;
        const costume = {
          asset: asset,
          md5ext: md5ext,
          name: "Linjian Canvas",
        };

        await vm.addCostume(md5ext, costume, target.id);

        const costumes = target.getCostumes();
        if (costumes && costumes.length > 0) {
          target.setCostume(costumes.length - 1);
        }
      } catch (e) {
        this._setError("export overlay as costume of selected sprite", e.message || String(e));
      }
    }

    exportDataURL() {
      if (!this.canvas) {
        this._setError("overlay DataURL", "canvas not initialized");
        return "";
      }
      return this.canvas.toDataURL("image/png");
    }

    _canvasToPngBytes() {
      return new Promise((resolve, reject) => {
        if (!this.canvas) {
          resolve(null);
          return;
        }
        this.canvas.toBlob((blob) => {
          if (!blob) {
            resolve(null);
            return;
          }
          const reader = new FileReader();
          reader.onload = () => {
            resolve(new Uint8Array(reader.result));
          };
          reader.onerror = () => {
            reject(reader.error || new Error("failed to read PNG data"));
          };
          reader.readAsArrayBuffer(blob);
        }, "image/png");
      });
    }

    _base64ToBytes(b64) {
      const binary = atob(b64);
      const len = binary.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return bytes;
    }

    // ============================================================
    // Internal helpers: Scratch coordinates -> Canvas pixels
    // ============================================================

    _x(x) {
      if (!this.canvas) return 0;
      return this.canvas.width / 2 + x * (this.canvas.width / 480);
    }

    _y(y) {
      if (!this.canvas) return 0;
      return this.canvas.height / 2 - y * (this.canvas.height / 360);
    }

    _sx(v) {
      if (!this.canvas) return 0;
      return v * (this.canvas.width / 480);
    }

    _sy(v) {
      if (!this.canvas) return 0;
      return v * (this.canvas.height / 360);
    }

    _sr(v) {
      if (!this.canvas) return 0;
      return v * Math.min(this.canvas.width / 480, this.canvas.height / 360);
    }
  }

  Scratch.extensions.register(new LinjianCanvasExt());
})(Scratch);
