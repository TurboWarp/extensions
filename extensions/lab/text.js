// Name: Animated Text
// ID: text
// Description: An easy way to display and animate text. Compatible with Scratch Lab's Animated Text experiment.

(function (Scratch) {
  "use strict";

  // This extension was created by making projects with https://lab.scratch.mit.edu/text/
  // To determine block and argument IDs, we extracted project.json and examined the result.
  // To determine block behaviors we simply experiment with Scratch Lab and made sure our
  // blocks do the same things.
  // This extension's code is not based on the source code of Scratch Lab's.

  // by @LilyMakesThings
  const blockIconURI =
    "data:image/svg+xml;,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22284.242%22%20height%3D%22284.242%22%3E%3Cg%20fill-rule%3D%22evenodd%22%20stroke-miterlimit%3D%2210%22%20data-paper-data%3D%22%7B%26quot%3BisPaintingLayer%26quot%3B%3Atrue%7D%22%20style%3D%22mix-blend-mode%3Anormal%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M188.894%20119.459c-.706%202.378-1.43%204.69-2.172%206.933-1.05%203.15-2.21%206.445-3.48%209.888a1671.47%201671.47%200%200%200-4.174%2011.462l-5.73%2015.528h30.833l-5.73-15.528a522.83%20522.83%200%200%201-4.065-11.242%20408.343%20408.343%200%200%201-3.37-10.108%20350.767%20350.767%200%200%201-2.112-6.933zm18.519-56.092%2062.329%20157.508H225.43l-9.636-26.111h-54.08l-9.636%2026.11h-43.432l62.768-157.507Z%22%2F%3E%3Cpath%20fill%3D%22%2396f%22%20stroke%3D%22%237240d6%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%2229%22%20d%3D%22M188.894%20119.459c-.706%202.378-1.43%204.69-2.172%206.933-1.05%203.15-2.21%206.445-3.48%209.888a1671.47%201671.47%200%200%200-4.174%2011.462l-5.73%2015.528h30.833l-5.73-15.528a522.83%20522.83%200%200%201-4.065-11.242%20408.343%20408.343%200%200%201-3.37-10.108%20350.767%20350.767%200%200%201-2.112-6.933zm18.519-56.092%2062.329%20157.508H225.43l-9.636-26.111h-54.08l-9.636%2026.11h-43.432l62.768-157.507Z%22%2F%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M188.894%20119.459c-.706%202.378-1.43%204.69-2.172%206.933-1.05%203.15-2.21%206.445-3.48%209.888a1671.47%201671.47%200%200%200-4.174%2011.462l-5.73%2015.528h30.833l-5.73-15.528a522.827%20522.827%200%200%201-4.065-11.242%20408.302%20408.302%200%200%201-3.37-10.108%20350.767%20350.767%200%200%201-2.112-6.933zm18.519-56.092%2062.329%20157.508H225.43l-9.636-26.111h-54.08l-9.636%2026.11h-43.432l62.768-157.507Z%22%2F%3E%3Cpath%20fill%3D%22%23ffa24d%22%20stroke%3D%22%23fff%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%229%22%20d%3D%22M188.894%20119.459c-.706%202.378-1.43%204.69-2.172%206.933-1.05%203.15-2.21%206.445-3.48%209.888a1671.47%201671.47%200%200%200-4.174%2011.462l-5.73%2015.528h30.833l-5.73-15.528a522.827%20522.827%200%200%201-4.065-11.242%20408.302%20408.302%200%200%201-3.37-10.108%20350.767%20350.767%200%200%201-2.112-6.933zm18.519-56.092%2062.329%20157.508H225.43l-9.636-26.111h-54.08l-9.636%2026.11h-43.432l62.768-157.507Z%22%2F%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M143.696%20119.459c-.706%202.378-1.43%204.69-2.172%206.933-1.05%203.15-2.21%206.445-3.479%209.888a1671.47%201671.47%200%200%200-4.175%2011.462l-5.73%2015.528h30.833l-5.73-15.528a522.827%20522.827%200%200%201-4.065-11.242%20408.343%20408.343%200%200%201-3.37-10.108%20350.767%20350.767%200%200%201-2.112-6.933zm18.519-56.092%2062.33%20157.508h-44.312l-9.637-26.111h-54.08l-9.636%2026.11H63.448l62.768-157.507Z%22%2F%3E%3Cpath%20fill%3D%22%2396f%22%20stroke%3D%22%237240d6%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%2229%22%20d%3D%22M143.696%20119.459c-.706%202.378-1.43%204.69-2.172%206.933-1.05%203.15-2.21%206.445-3.479%209.888a1671.47%201671.47%200%200%200-4.175%2011.462l-5.73%2015.528h30.833l-5.73-15.528a522.827%20522.827%200%200%201-4.065-11.242%20408.343%20408.343%200%200%201-3.37-10.108%20350.767%20350.767%200%200%201-2.112-6.933zm18.519-56.092%2062.33%20157.508h-44.312l-9.637-26.111h-54.08l-9.636%2026.11H63.448l62.768-157.507Z%22%2F%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M143.696%20119.459c-.706%202.378-1.43%204.69-2.172%206.933-1.05%203.15-2.21%206.445-3.479%209.888a1671.47%201671.47%200%200%200-4.175%2011.462l-5.73%2015.528h30.833l-5.73-15.528a522.827%20522.827%200%200%201-4.065-11.242%20408.343%20408.343%200%200%201-3.37-10.108%20350.767%20350.767%200%200%201-2.112-6.933zm18.519-56.092%2062.33%20157.508h-44.312l-9.637-26.111h-54.08l-9.636%2026.11H63.448l62.768-157.507Z%22%2F%3E%3Cpath%20fill%3D%22%23ff774d%22%20stroke%3D%22%23fff%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%229%22%20d%3D%22M143.696%20119.459c-.706%202.378-1.43%204.69-2.172%206.933-1.05%203.15-2.21%206.445-3.479%209.888a1671.47%201671.47%200%200%200-4.175%2011.462l-5.73%2015.528h30.833l-5.73-15.528a522.827%20522.827%200%200%201-4.065-11.242%20408.343%20408.343%200%200%201-3.37-10.108%20350.767%20350.767%200%200%201-2.112-6.933zm18.519-56.092%2062.33%20157.508h-44.312l-9.637-26.111h-54.08l-9.636%2026.11H63.448l62.768-157.507Z%22%2F%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M94.748%20119.459c-.706%202.378-1.43%204.69-2.172%206.933-1.05%203.15-2.21%206.445-3.479%209.888-1.27%203.442-2.66%207.263-4.175%2011.462l-5.73%2015.528h30.833l-5.73-15.528a522.885%20522.885%200%200%201-4.065-11.242%20408.343%20408.343%200%200%201-3.37-10.108%20350.767%20350.767%200%200%201-2.112-6.933zm18.52-56.092%2062.328%20157.508h-44.311l-9.637-26.111h-54.08l-9.635%2026.11H14.5L77.269%2063.368Z%22%2F%3E%3Cpath%20fill%3D%22%2396f%22%20stroke%3D%22%237240d6%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%2229%22%20d%3D%22M94.748%20119.459c-.706%202.378-1.43%204.69-2.172%206.933-1.05%203.15-2.21%206.445-3.479%209.888-1.27%203.442-2.66%207.263-4.175%2011.462l-5.73%2015.528h30.833l-5.73-15.528a522.885%20522.885%200%200%201-4.065-11.242%20408.343%20408.343%200%200%201-3.37-10.108%20350.767%20350.767%200%200%201-2.112-6.933zm18.52-56.092%2062.328%20157.508h-44.311l-9.637-26.111h-54.08l-9.635%2026.11H14.5L77.269%2063.368Z%22%2F%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M94.748%20119.459c-.706%202.378-1.43%204.69-2.172%206.933-1.05%203.15-2.21%206.445-3.479%209.888-1.27%203.442-2.66%207.263-4.175%2011.462l-5.73%2015.528h30.833l-5.73-15.528a522.885%20522.885%200%200%201-4.065-11.242%20408.302%20408.302%200%200%201-3.37-10.108%20350.767%20350.767%200%200%201-2.112-6.933zm18.52-56.092%2062.328%20157.508h-44.311l-9.637-26.111h-54.08l-9.635%2026.11H14.5L77.269%2063.368Z%22%2F%3E%3Cpath%20fill%3D%22%23ff4c4c%22%20stroke%3D%22%23fff%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%229%22%20d%3D%22M94.748%20119.459c-.706%202.378-1.43%204.69-2.172%206.933-1.05%203.15-2.21%206.445-3.479%209.888-1.27%203.442-2.66%207.263-4.175%2011.462l-5.73%2015.528h30.833l-5.73-15.528a522.885%20522.885%200%200%201-4.065-11.242%20408.302%20408.302%200%200%201-3.37-10.108%20350.767%20350.767%200%200%201-2.112-6.933zm18.52-56.092%2062.328%20157.508h-44.311l-9.637-26.111h-54.08l-9.635%2026.11H14.5L77.269%2063.368Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E";

  const CUSTOM_STATE_KEY = Symbol();

  const ALIGN_LEFT = 0;
  const ALIGN_RIGHT = 1;
  const ALIGN_CENTER = 2;

  const vm = Scratch.vm;
  const renderer = vm.renderer;
  const gl = renderer.gl;

  let compatibilityMode = true;

  const FONTS = [
    "Sans Serif",
    "Serif",
    "Handwriting",
    "Marker",
    "Curly",
    "Pixel",
  ];

  const DEFAULT_COLOR = "#575e75";
  const DEFAULT_FONT = "Handwriting";
  const DEFAULT_WIDTH = vm.runtime.stageWidth;
  const DEFAULT_ALIGN = ALIGN_CENTER;
  const DEFAULT_FONT_SIZE = 24;

  const DEFAULT_TYPE_DELAY = 1000 / 15;

  const RAINBOW_TIME_PER = 1000;
  const DEFAULT_RAINBOW_DURATION = 2000;

  const DEFAULT_ZOOM_DURATION = 500;

  let globalFrameTime = 0;

  /**
   * @typedef TextState
   * @property {TextCostumeSkin} skin
   */

  // temporary
  if (!renderer.exports || !renderer.exports.Skin || !vm.exports) {
    alert("VM is too old for animated text extension");
    throw new Error("VM is too old");
  }

  const Skin = renderer.exports.Skin;
  const CanvasMeasurementProvider = renderer.exports.CanvasMeasurementProvider;
  const twgl = renderer.exports.twgl;
  const RenderedTarget = vm.exports.RenderedTarget;

  /**
   * @param {number} c
   * @returns {string}
   */
  const formatComponent = (c) => Math.round(c).toString(16).padStart(2, "0");

  /**
   * @param {[number, number, number]} color
   * @returns {string}
   */
  const formatColor = (color) =>
    `#${formatComponent(color[0])}${formatComponent(color[1])}${formatComponent(
      color[2]
    )}`;

  /**
   * @param {number} h hue from 0-1
   * @param {number} s saturation from 0-1
   * @param {number} v value from 0-1
   * @returns {[number, number, number]} RGB channels from 0-255
   */
  const hsvToRGB = (h, s, v) => {
    // https://en.wikipedia.org/wiki/HSL_and_HSV
    var r, g, b;
    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0:
        (r = v), (g = t), (b = p);
        break;
      case 1:
        (r = q), (g = v), (b = p);
        break;
      case 2:
        (r = p), (g = v), (b = t);
        break;
      case 3:
        (r = p), (g = q), (b = v);
        break;
      case 4:
        (r = t), (g = p), (b = v);
        break;
      case 5:
        (r = v), (g = p), (b = q);
        break;
    }
    return [(r * 255) | 0, (g * 255) | 0, (b * 255) | 0];
  };

  /**
   * @param {CanvasGradient} gradient
   * @param {number} offset number of cycles to offset by
   */
  const addRainbowStops = (gradient, offset) => {
    const NUMBER_STOPS = 20;
    for (let i = 0; i < NUMBER_STOPS; i++) {
      const exactPosition = i / NUMBER_STOPS;
      let offsetPosition = (exactPosition - offset) % 1;
      if (offsetPosition < 0) {
        offsetPosition += 1;
      }
      const rgb = hsvToRGB(offsetPosition, 1, 1);
      gradient.addColorStop(exactPosition, formatColor(rgb));
    }
  };

  class TextCostumeSkin extends Skin {
    constructor(id, drawable) {
      super(id, renderer);

      /** @type {RenderWebGL.Drawable} */
      this.drawable = drawable;
      /** @type {number} */
      this._previousDrawableXScale = 100;

      this.canvas = document.createElement("canvas");
      this.canvas.width = 0;
      this.canvas.height = 0;
      this.ctx = this.canvas.getContext("2d");

      this.text = "";
      this.color = DEFAULT_COLOR;
      this.textWidth = DEFAULT_WIDTH;
      this.fontFamily = DEFAULT_FONT;
      this.baseFontSize = DEFAULT_FONT_SIZE;
      this.align = DEFAULT_ALIGN;

      /** @type {Array<{text: string; width: number;}>} */
      this.lines = [];
      /** @type {[number, number]} */
      this._size = [0, 0];
      /** @type {[number, number]} */
      this._rotationCenter = [0, 0];

      // Updated in _updateFontDimensions
      this.calculatedFontSize = 0;
      this.lineHeight = 0;
      this.verticalPadding = 0;
      this.wrapWidth = 0;

      this._textDirty = false;
      this._textureDirty = false;
      this._renderedAtScale = 1;
      this._renderTime = 0;
      this._reflowTime = 0;

      this.isTyping = false;
      this.typeAnimationInterval = null;
      this.typeDelay = DEFAULT_TYPE_DELAY;

      this.isRainbow = false;
      this.rainbowStartTime = 0;
      this.rainbowTimeout = null;
      this.rainbowDuration = DEFAULT_RAINBOW_DURATION;

      this.isZooming = false;
      this.zoomStartTime = 0;
      this.zoomTimeout = null;
      this.zoomDuration = DEFAULT_ZOOM_DURATION;

      /** @type {(() => void)|null} */
      this.resolveOngoingAnimation = null;
    }

    // Part of Skin API
    dispose() {
      if (this._texture) {
        gl.deleteTexture(this._texture);
        this._texture = null;
      }
      this.canvas = null;
      this.ctx = null;
      super.dispose();
    }

    // Part of Skin API
    get size() {
      if (this._needsReflow()) {
        this._reflowText();
      }
      return this._size;
    }

    // Part of Skin API
    useNearest() {
      return false;
    }

    _needsReflow() {
      return (
        this._textDirty ||
        (this.isZooming && this._reflowTime !== globalFrameTime) ||
        this._previousDrawableXScale !== Math.abs(this.drawable.scale[0])
      );
    }

    _updateFontDimensions() {
      this.calculatedFontSize = this.baseFontSize;
      if (this.isZooming) {
        // TODO: it looks like Scratch's animation always starts at least a little visible
        const time = globalFrameTime - this.zoomStartTime;
        const progress = Math.max(0, Math.min(1, time / this.zoomDuration));
        this.calculatedFontSize *= progress;
      }
      this.lineHeight = (this.baseFontSize * 8) / 7;
      // Always use the base size for padding. This makes the zoom animation look better.
      this.verticalPadding = this.baseFontSize / 7;
      // Only use horizontal scale for wrap width for compatibility with stretch extension.
      this.wrapWidth =
        this.textWidth / (Math.abs(this.drawable.scale[0]) / 100);
    }

    _getFontStyle() {
      return `${this.calculatedFontSize}px ${this.fontFamily}, sans-serif`;
    }

    _reflowText() {
      this._textDirty = false;
      this._textureDirty = true;
      this._reflowTime = globalFrameTime;
      this._previousDrawableXScale = Math.abs(this.drawable.scale[0]);

      this._updateFontDimensions();
      this.ctx.font = this._getFontStyle();

      // need to make new ones each time to avoid caching incorrectly across fonts
      const measurementProvider = new CanvasMeasurementProvider(this.ctx);
      /** @type {RenderWebGL.TextWrapper} */
      const textWrapper = renderer.createTextWrapper(measurementProvider);

      const lines = textWrapper.wrapText(this.wrapWidth, this.text);
      this.lines = lines.map((line) => {
        const trimmed = line.trimEnd();
        return {
          text: trimmed,
          width: measurementProvider.measureText(trimmed),
        };
      });

      this._size[0] = this.wrapWidth;
      this._size[1] =
        this.lines.length * this.lineHeight + 2 * this.verticalPadding;

      // Centered horizontally
      this._rotationCenter[0] = this._size[0] / 2;
      // Vertical center is roughly below the first line of text
      this._rotationCenter[1] =
        this.calculatedFontSize * 0.9 + this.verticalPadding;
    }

    _renderAtScale(requestedScale) {
      this._renderedAtScale = requestedScale;
      this._textureDirty = false;
      this._renderTime = globalFrameTime;

      const scratchWidth = this._size[0];
      const scratchHeight = this._size[1];

      // Renderer's requested scale is accounted for at this point. Do not touch `requestedScale`
      // ever after this point.
      this.canvas.width = Math.ceil(scratchWidth * requestedScale);
      this.canvas.height = Math.ceil(scratchHeight * requestedScale);
      this.ctx.scale(requestedScale, requestedScale);

      const rainbowOffset = this.isRainbow
        ? (globalFrameTime - this.rainbowStartTime) / RAINBOW_TIME_PER
        : 0;
      this.ctx.fillStyle = this.color;
      this.ctx.font = this._getFontStyle();
      for (let i = 0; i < this.lines.length; i++) {
        const line = this.lines[i];
        const text = line.text;
        const lineWidth = line.width;

        let xOffset = 0;
        if (this.align === ALIGN_LEFT) {
          // already correct
        } else if (this.align === ALIGN_CENTER) {
          xOffset = (this.wrapWidth - lineWidth) / 2;
        } else {
          xOffset = this.wrapWidth - lineWidth;
        }

        if (this.isRainbow) {
          const gradient = this.ctx.createLinearGradient(
            xOffset,
            0,
            xOffset + lineWidth,
            0
          );
          addRainbowStops(gradient, rainbowOffset);
          this.ctx.fillStyle = gradient;
        }

        // TODO: something here is wrong
        this.ctx.fillText(
          text,
          xOffset,
          this.verticalPadding + i * this.lineHeight + this.baseFontSize
        );
      }

      if (!this._texture) {
        // @ts-expect-error - twgl not typed yet
        this._texture = twgl.createTexture(gl, {
          auto: false,
          wrap: gl.CLAMP_TO_EDGE,
        });
      }
      this._setTexture(this.canvas);
    }

    _invalidateTexture() {
      this._textureDirty = true;
      this._renderTime = 0;
      this.emitWasAltered();
    }

    _invalidateText() {
      this._textDirty = true;
      this._textureDirty = true;
      this._reflowTime = 0;
      this.emitWasAltered();
    }

    setText(text) {
      if (text !== this.text) {
        this.text = text;
        this._invalidateText();
      }
    }

    setColor(color) {
      if (color !== this.color) {
        this.color = color;
        this._invalidateTexture();
      }
    }

    setAlign(align) {
      if (align !== this.align) {
        this.align = align;
        this._invalidateTexture();
      }
    }

    setWidth(width) {
      if (width !== this.textWidth) {
        this.textWidth = width;
        this._invalidateText();
      }
    }

    setFontFamily(font) {
      if (font !== this.fontFamily) {
        this.fontFamily = font;
        this._invalidateText();
      }
    }

    getFontFamily() {
      return this.fontFamily;
    }

    getColor() {
      return this.color;
    }

    getWidth() {
      return this.textWidth;
    }

    getAlign() {
      return this.align;
    }

    _oneAnimationAtATime(newCallback) {
      this.cancelAnimation();
      return new Promise((resolve) => {
        this.resolveOngoingAnimation = () => {
          this.resolveOngoingAnimation = null;
          resolve();
        };
        newCallback(this.resolveOngoingAnimation);
      });
    }

    startTypeAnimation() {
      return this._oneAnimationAtATime((resolve) => {
        this.isTyping = true;
        const originalText = this.text;
        let i = 1;
        const update = () => {
          this.setText(originalText.substring(0, i));
        };
        update();

        this.typeAnimationInterval = setInterval(() => {
          i++;
          update();
          if (i >= originalText.length) {
            clearInterval(this.typeAnimationInterval);
            this.isTyping = false;
            resolve();
          }
        }, this.typeDelay);
      });
    }

    setTypeDelay(delay) {
      this.typeDelay = delay;
    }

    startRainbowAnimation() {
      return this._oneAnimationAtATime((resolve) => {
        this.isRainbow = true;
        this.rainbowStartTime = Date.now();
        this._invalidateTexture();
        this.rainbowTimeout = setTimeout(() => {
          this.isRainbow = false;
          resolve();
          this._invalidateTexture();
        }, this.rainbowDuration);
      });
    }

    setRainbowDuration(duration) {
      this.rainbowDuration = duration;
    }

    startZoomAnimation() {
      return this._oneAnimationAtATime((resolve) => {
        this.isZooming = true;
        this.zoomStartTime = Date.now();
        this._invalidateText();
        this.zoomTimeout = setTimeout(() => {
          this.isZooming = false;
          resolve();
          this._invalidateText();
        }, this.zoomDuration);
      });
    }

    setZoomDuration(duration) {
      this.zoomDuration = duration;
    }

    cancelAnimation() {
      if (this.resolveOngoingAnimation) {
        this.resolveOngoingAnimation();
        this.resolveOngoingAnimation = null;

        this.isTyping = false;
        clearInterval(this.typeAnimationInterval);

        this.isRainbow = false;
        clearTimeout(this.rainbowTimeout);

        this.isZooming = false;
        clearTimeout(this.zoomTimeout);

        // TODO: sometimes we only need to invalidate the texture at this point
        this._invalidateText();
      }
    }

    // Part of Skin API
    updateSilhouette(scale) {
      this.getTexture(scale);
      this._silhouette.unlazy();
    }

    // Part of Skin API
    getTexture(scale) {
      const MAX_SCALE = 10;
      const upperScale = scale
        ? Math.max(Math.abs(scale[0]), Math.abs(scale[1]))
        : 100;
      const calculatedScale = Math.min(MAX_SCALE, upperScale / 100);

      if (this._needsReflow()) {
        this._reflowText();
      }
      if (
        this._textureDirty ||
        (this.isRainbow && this._renderTime !== globalFrameTime) ||
        calculatedScale !== this._renderedAtScale
      ) {
        this._renderAtScale(calculatedScale);
      }

      return this._texture;
    }
  }

  /**
   * Note that the returned skin is only usable by the given target. Things will break if another
   * target tries to use it.
   * @param {VM.Target} target
   * @returns {TextCostumeSkin}
   */
  const createTextCostumeSkin = (target) => {
    const drawable = renderer._allDrawables[target.drawableID];
    const id = renderer._nextSkinId++;
    const skin = new TextCostumeSkin(id, drawable);
    renderer._allSkins[id] = skin;
    return skin;
  };

  vm.runtime.on("BEFORE_EXECUTE", () => {
    globalFrameTime = Date.now();

    for (let i = 0; i < renderer._allSkins.length; i++) {
      const skin = renderer._allSkins[i];
      if (
        skin instanceof TextCostumeSkin &&
        (skin.isRainbow || skin.isZooming)
      ) {
        skin.emitWasAltered();
      }
    }
  });

  class AnimatedText {
    constructor() {
      vm.runtime.on("PROJECT_START", () => {
        this._hideAllText();
      });

      vm.runtime.on("PROJECT_STOP_ALL", () => {
        this._hideAllText();
      });

      // targetWasCreated does not work because it runs before the Drawable is set up
      const extension = this;
      const originalMakeClone = RenderedTarget.prototype.makeClone;
      RenderedTarget.prototype.makeClone = function () {
        const newClone = originalMakeClone.call(this);
        if (extension._hasState(this)) {
          // TODO: creates much unneeded state
          const originalSkin = extension._getState(this).skin;
          const newSkin = extension._getState(newClone).skin;
          newSkin.setAlign(originalSkin.align);
          newSkin.setColor(originalSkin.color);
          newSkin.setFontFamily(originalSkin.fontFamily);
          newSkin.setWidth(originalSkin.textWidth);
          newSkin.setText(originalSkin.text);
          newSkin.setRainbowDuration(originalSkin.rainbowDuration);
          newSkin.setZoomDuration(originalSkin.zoomDuration);
          newSkin.setTypeDelay(originalSkin.typeDelay);
          if (
            renderer._allDrawables[this.drawableID].skin instanceof
            TextCostumeSkin
          ) {
            renderer.updateDrawableSkinId(newClone.drawableID, newSkin.id);
          }
        }
        return newClone;
      };

      vm.runtime.on("targetWasRemoved", (target) => {
        if (this._hasState(target)) {
          const state = this._getState(target);
          renderer.destroySkin(state.skin.id);
        }
      });
    }

    getInfo() {
      return {
        id: "text",
        name: "Animated Text",
        color1: "#9966FF",
        blockIconURI: blockIconURI,
        blocks: [
          {
            opcode: "setText",
            blockType: Scratch.BlockType.COMMAND,
            text: "show text [TEXT]",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Welcome to my project!",
              },
            },
          },
          {
            opcode: "animateText",
            blockType: Scratch.BlockType.COMMAND,
            text: "[ANIMATE] text [TEXT]",
            arguments: {
              ANIMATE: {
                type: Scratch.ArgumentType.STRING,
                menu: "animate",
                defaultValue: "rainbow",
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Here we go!",
              },
            },
          },
          {
            opcode: "clearText",
            blockType: Scratch.BlockType.COMMAND,
            text: "show sprite",
          },
          "---",
          {
            opcode: "setFont",
            blockType: Scratch.BlockType.COMMAND,
            text: "set font to [FONT]",
            arguments: {
              FONT: {
                type: Scratch.ArgumentType.STRING,
                menu: "font",
              },
            },
          },
          {
            opcode: "setColor",
            blockType: Scratch.BlockType.COMMAND,
            text: "set text color to [COLOR]",
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
              },
            },
          },
          {
            opcode: "setWidth",
            blockType: Scratch.BlockType.COMMAND,
            text: "set width to [WIDTH] aligned [ALIGN]",
            arguments: {
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "200",
              },
              ALIGN: {
                type: Scratch.ArgumentType.STRING,
                menu: "align",
              },
            },
          },
          "---",

          /**
           * Contributors:
           * - LilyMakesThings
           */

          {
            func: "disableCompatibilityMode",
            blockType: Scratch.BlockType.BUTTON,
            text: "Enable Non-Scratch Lab Features",
            hideFromPalette: !compatibilityMode,
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Incompatible with Scratch Lab:",
            hideFromPalette: compatibilityMode,
          },
          {
            opcode: "setAlignment",
            blockType: Scratch.BlockType.COMMAND,
            text: "align text to [ALIGN]",
            hideFromPalette: compatibilityMode,
            arguments: {
              ALIGN: {
                type: Scratch.ArgumentType.STRING,
                menu: "twAlign",
              },
            },
          },
          {
            // why is the other block called "setWidth" :(
            opcode: "setWidthValue",
            blockType: Scratch.BlockType.COMMAND,
            text: "set width to [WIDTH]",
            hideFromPalette: compatibilityMode,
            arguments: {
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 200,
              },
            },
          },
          {
            opcode: "resetWidth",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset text width",
            hideFromPalette: compatibilityMode,
          },
          "---",
          {
            opcode: "addLine",
            blockType: Scratch.BlockType.COMMAND,
            text: "add line [TEXT]",
            hideFromPalette: compatibilityMode,
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello!",
              },
            },
          },
          {
            opcode: "getLines",
            blockType: Scratch.BlockType.REPORTER,
            text: "# of lines",
            hideFromPalette: compatibilityMode,
            disableMonitor: true,
          },
          "---",
          {
            opcode: "startAnimate",
            blockType: Scratch.BlockType.COMMAND,
            text: "start [ANIMATE] animation",
            hideFromPalette: compatibilityMode,
            arguments: {
              ANIMATE: {
                type: Scratch.ArgumentType.STRING,
                menu: "twAnimate",
                defaultValue: "rainbow",
              },
            },
          },
          {
            opcode: "animateUntilDone",
            blockType: Scratch.BlockType.COMMAND,
            text: "animate [ANIMATE] until done",
            hideFromPalette: compatibilityMode,
            arguments: {
              ANIMATE: {
                type: Scratch.ArgumentType.STRING,
                menu: "twAnimate",
                defaultValue: "rainbow",
              },
            },
          },
          {
            opcode: "isAnimating",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is animating?",
            hideFromPalette: compatibilityMode,
            disableMonitor: true,
          },
          "---",
          {
            opcode: "setAnimateDuration",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [ANIMATE] duration to [NUM] seconds",
            hideFromPalette: compatibilityMode,
            arguments: {
              ANIMATE: {
                type: Scratch.ArgumentType.STRING,
                menu: "twAnimateDuration",
                defaultValue: "rainbow",
              },
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3,
              },
            },
          },
          {
            opcode: "resetAnimateDuration",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset [ANIMATE] duration",
            hideFromPalette: compatibilityMode,
            arguments: {
              ANIMATE: {
                type: Scratch.ArgumentType.STRING,
                menu: "twAnimateDuration",
                defaultValue: "rainbow",
              },
            },
          },
          {
            opcode: "getAnimateDuration",
            blockType: Scratch.BlockType.REPORTER,
            text: "[ANIMATE] duration",
            hideFromPalette: compatibilityMode,
            arguments: {
              ANIMATE: {
                type: Scratch.ArgumentType.STRING,
                menu: "twAnimateDuration",
                defaultValue: "rainbow",
              },
            },
          },
          "---",
          {
            opcode: "setTypeDelay",
            blockType: Scratch.BlockType.COMMAND,
            text: "set typing delay to [NUM] seconds",
            hideFromPalette: compatibilityMode,
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0.1,
              },
            },
          },
          {
            opcode: "resetTypeDelay",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset typing delay",
            hideFromPalette: compatibilityMode,
          },
          {
            opcode: "getTypeDelay",
            blockType: Scratch.BlockType.REPORTER,
            text: "typing delay",
            hideFromPalette: compatibilityMode,
            disableMonitor: true,
          },
          "---",
          {
            opcode: "textActive",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is showing text?",
            hideFromPalette: compatibilityMode,
            disableMonitor: true,
          },
          {
            opcode: "getDisplayedText",
            blockType: Scratch.BlockType.REPORTER,
            text: "displayed text",
            hideFromPalette: compatibilityMode,
            disableMonitor: true,
          },
          {
            opcode: "getTextAttribute",
            blockType: Scratch.BlockType.REPORTER,
            text: "text [ATTRIBUTE]",
            arguments: {
              ATTRIBUTE: {
                type: Scratch.ArgumentType.STRING,
                menu: "attribute",
              },
            },
            disableMonitor: true,
            hideFromPalette: compatibilityMode,
          },
        ],
        menus: {
          // These all need acceptReporters: false for parity with the Scratch Labs version.
          animate: {
            acceptReporters: false,
            items: ["type", "rainbow", "zoom"],
          },
          font: {
            acceptReporters: false,
            items: "getFonts",
          },
          align: {
            acceptReporters: false,
            items: ["left", "center", "right"],
          },
          attribute: {
            acceptReporters: false,
            items: ["font", "color", "width", "alignment"],
          },
          // TurboWarp menus (acceptReporters: true)
          twAnimate: {
            acceptReporters: true,
            items: ["type", "rainbow", "zoom"],
          },
          twAnimateDuration: {
            acceptReporters: true,
            items: ["rainbow", "zoom"],
          },
          twAlign: {
            acceptReporters: true,
            items: ["left", "center", "right"],
          },
        },
      };
    }

    getFonts() {
      const customFonts = Scratch.vm.runtime.fontManager
        ? Scratch.vm.runtime.fontManager.getFonts().map((i) => ({
            text: i.name,
            value: i.family,
          }))
        : [];

      return [
        ...FONTS,
        ...customFonts,
        {
          text: "random font",
          value: "Random",
        },
      ];
    }

    /**
     * @param {VM.Target} target
     * @returns {TextState}
     */
    _getState(target) {
      const state = target[CUSTOM_STATE_KEY];
      if (!state) {
        /** @type {TextState} */
        const newState = {
          skin: createTextCostumeSkin(target),
        };
        target[CUSTOM_STATE_KEY] = newState;
        return newState;
      }
      return state;
    }

    /**
     * @param {VM.Target} target
     * @returns {boolean}
     */
    _hasState(target) {
      return !!target[CUSTOM_STATE_KEY];
    }

    _hideAllText() {
      for (const target of vm.runtime.targets) {
        if (this._hasState(target)) {
          this._hideText(target, this._getState(target));
        }
      }
    }

    /**
     * @param {VM.Target} target
     * @param {TextState} state
     */
    _renderText(target, state) {
      state.skin.cancelAnimation();
      renderer.updateDrawableSkinId(target.drawableID, state.skin.id);
    }

    /**
     * @param {VM.Target} target
     * @param {TextState} state
     */
    _hideText(target, state) {
      state.skin.cancelAnimation();
      target.setCostume(target.currentCostume);
    }

    setText({ TEXT }, util) {
      const state = this._getState(util.target);
      this._renderText(util.target, state);
      state.skin.setText(Scratch.Cast.toString(TEXT));
      // Scratch forces 1 frame delay by returning promise. I think that's silly.
      util.runtime.requestRedraw();
    }

    animateText({ ANIMATE, TEXT }, util) {
      const state = this._getState(util.target);
      this._renderText(util.target, state);

      state.skin.setText(Scratch.Cast.toString(TEXT));
      state.skin.cancelAnimation();

      if (ANIMATE === "type") {
        return state.skin.startTypeAnimation();
      } else if (ANIMATE === "rainbow") {
        return state.skin.startRainbowAnimation();
      } else if (ANIMATE === "zoom") {
        return state.skin.startZoomAnimation();
      } else {
        // Scratch does nothing here
      }
    }

    clearText(args, util) {
      if (this._hasState(util.target)) {
        const state = this._getState(util.target);
        this._hideText(util.target, state);
      }
      // Scratch forces 1 frame delay by returning promise. I think that's silly.
      util.runtime.requestRedraw();
    }

    setFont({ FONT }, util) {
      const state = this._getState(util.target);
      if (FONT === "Random") {
        // Random font always switches to a new font, never the same one
        const possibleFonts = FONTS.filter((i) => i !== state.skin.fontFamily);
        state.skin.setFontFamily(
          possibleFonts[Math.floor(Math.random() * possibleFonts.length)]
        );
      } else {
        state.skin.setFontFamily(Scratch.Cast.toString(FONT));
      }
    }

    setColor({ COLOR }, util) {
      const state = this._getState(util.target);
      state.skin.setColor(Scratch.Cast.toString(COLOR));
    }

    setWidth({ WIDTH, ALIGN }, util) {
      const state = this._getState(util.target);

      if (ALIGN === "center") {
        state.skin.setAlign(ALIGN_CENTER);
      } else if (ALIGN === "right") {
        state.skin.setAlign(ALIGN_RIGHT);
      } else {
        // Scratch treats unknown values as left alignment.
        state.skin.setAlign(ALIGN_LEFT);
      }

      state.skin.setWidth(Scratch.Cast.toNumber(WIDTH));
    }

    /*
     * Extra blocks, not compatible with Scratch:
     */

    disableCompatibilityMode() {
      let popup = [
        "This will enable new blocks and features that WILL NOT WORK in the offical Scratch Lab.",
        "Do you wish to continue?",
      ];
      if (confirm(popup.join("\n\n"))) {
        compatibilityMode = false;
        Scratch.vm.extensionManager.refreshBlocks();
      }
    }

    setAlignment(args, util) {
      // see setWidth
      const state = this._getState(util.target);
      if (args.ALIGN === "center") {
        state.skin.setAlign(ALIGN_CENTER);
      } else if (args.ALIGN === "right") {
        state.skin.setAlign(ALIGN_RIGHT);
      } else {
        state.skin.setAlign(ALIGN_LEFT);
      }
    }

    setWidthValue(args, util) {
      const state = this._getState(util.target);
      state.skin.setWidth(Scratch.Cast.toNumber(args.WIDTH));
    }

    resetWidth(args, util) {
      const state = this._getState(util.target);
      state.skin.setWidth(DEFAULT_WIDTH);
    }

    addLine(args, util) {
      const state = this._getState(util.target);
      this._renderText(util.target, state);

      const originalText = state.skin.text;
      const addingText = Scratch.Cast.toString(args.TEXT);
      state.skin.setText(
        originalText ? `${originalText}\n${addingText}` : addingText
      );
      util.runtime.requestRedraw();
    }

    getLines(args, util) {
      const drawableID = util.target.drawableID;
      const skin = renderer._allDrawables[drawableID].skin;
      if (!(skin instanceof TextCostumeSkin)) return 0;

      const state = this._getState(util.target);
      const text = state.skin.text;
      return text.split("\n").length;
    }

    startAnimate(args, util) {
      const drawableID = util.target.drawableID;
      const skin = renderer._allDrawables[drawableID].skin;
      if (!(skin instanceof TextCostumeSkin)) return;

      const state = this._getState(util.target);
      state.skin.cancelAnimation();

      // Don't return the promise
      if (args.ANIMATE === "type") {
        state.skin.startTypeAnimation();
      } else if (args.ANIMATE === "rainbow") {
        state.skin.startRainbowAnimation();
      } else if (args.ANIMATE === "zoom") {
        state.skin.startZoomAnimation();
      } else {
        // Scratch does nothing here
      }
    }

    animateUntilDone(args, util) {
      const drawableID = util.target.drawableID;
      const skin = renderer._allDrawables[drawableID].skin;
      if (!(skin instanceof TextCostumeSkin)) return;

      const state = this._getState(util.target);
      state.skin.cancelAnimation();

      if (args.ANIMATE === "type") {
        return state.skin.startTypeAnimation();
      } else if (args.ANIMATE === "rainbow") {
        return state.skin.startRainbowAnimation();
      } else if (args.ANIMATE === "zoom") {
        return state.skin.startZoomAnimation();
      } else {
        // Scratch does nothing here
      }
    }

    isAnimating(args, util) {
      const skin = this._getState(util.target).skin;
      return skin.isTyping || skin.isRainbow || skin.isZooming;
    }

    setAnimateDuration(args, util) {
      const state = this._getState(util.target);
      const animation = args.ANIMATE;
      const milliseconds = Scratch.Cast.toNumber(args.NUM) * 1000;
      if (animation === "rainbow") {
        state.skin.setRainbowDuration(milliseconds);
      } else if (animation === "zoom") {
        state.skin.setZoomDuration(milliseconds);
      }
    }

    resetAnimateDuration(args, util) {
      const state = this._getState(util.target);
      const animation = args.ANIMATE;
      if (animation === "rainbow") {
        state.skin.setRainbowDuration(DEFAULT_RAINBOW_DURATION);
      } else if (animation === "zoom") {
        state.skin.setZoomDuration(DEFAULT_ZOOM_DURATION);
      }
    }

    getAnimateDuration(args, util) {
      const state = this._getState(util.target);
      const animation = args.ANIMATE;
      if (animation === "rainbow") {
        return state.skin.rainbowDuration / 1000;
      } else if (animation === "zoom") {
        return state.skin.zoomDuration / 1000;
      } else {
        // should never happen
        return "";
      }
    }

    setTypeDelay(args, util) {
      const state = this._getState(util.target);
      state.skin.setTypeDelay(Scratch.Cast.toNumber(args.NUM) * 1000);
    }

    resetTypeDelay(args, util) {
      const state = this._getState(util.target);
      state.skin.setTypeDelay(DEFAULT_TYPE_DELAY);
    }

    getTypeDelay(args, util) {
      const state = this._getState(util.target);
      // TODO: Should we round this?
      return state.skin.typeDelay / 1000;
    }

    textActive(args, util) {
      const drawableID = util.target.drawableID;
      const skin = renderer._allDrawables[drawableID].skin;
      return skin instanceof TextCostumeSkin;
    }

    getDisplayedText(args, util) {
      const state = this._getState(util.target);
      return state.skin.text;
    }

    getTextAttribute(args, util) {
      const state = this._getState(util.target);
      const attrib = args.ATTRIBUTE;
      if (attrib === "font") {
        return state.skin.getFontFamily();
      } else if (attrib === "color") {
        return state.skin.getColor();
      } else if (attrib === "width") {
        return state.skin.getWidth();
      } else if (attrib === "alignment") {
        switch (state.skin.getAlign()) {
          case ALIGN_LEFT:
            return "left";
          case ALIGN_RIGHT:
            return "right";
          case ALIGN_CENTER:
            return "center";
        }
      } else {
        // should never happen
        return "";
      }
    }
  }

  Scratch.extensions.register(new AnimatedText());
})(Scratch);
