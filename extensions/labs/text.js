(function(Scratch) {
  'use strict';

  // This extension was created by making projects with https://lab.scratch.mit.edu/text/
  // then extracting project.json, and implementing the blocks according to the JSON.
  // This is not, in any way, based on the source code of the website as it is
  // not open source at this time.

  const CUSTOM_STATE_KEY = 'tw/labs/text';

  const ALIGN_LEFT = 0;
  const ALIGN_RIGHT = 1;
  const ALIGN_CENTER = 2;

  const vm = Scratch.vm;
  const renderer = vm.renderer;
  const gl = renderer.gl;

  const NATIVE_FONTS = [
    'Sans Serif',
    'Serif',
    'Handwriting',
    'Marker',
    'Curly',
    'Pixel',
  ];

  const DEFAULT_COLOR = '#575E75';
  const DEFAULT_FONT = 'Handwriting';
  const DEFAULT_WIDTH = vm.runtime.stageWidth;
  const DEFAULT_ALIGN = ALIGN_CENTER;
  const DEFAULT_FONT_SIZE = 24;
  const DEFAULT_SPACE_BETWEEN_LINES = 2;

  const TYPE_DELAY = 75; // TODO: wrong

  const RAINBOW_TIME_PER = 1000; // TODO: wrong
  const RAINBOW_DURATION = 5000; // TODO: wrong
  const RAINBOW_COLORS = [
    // TODO: need to lerp this better
    '#ff0000',
    '#ffff00',
    '#00ff00',
    '#00ffff',
    '#0000ff',
    '#ff00ff'
  ];

  const ZOOM_DURATION = 500; // TODO: wrong

  /**
   * @typedef TextState
   * @property {TextCostumeSkin} skin
   */

  /** @type {typeof RenderWebGL.Skin} */
  // @ts-expect-error - exports not typed yet
  const Skin = renderer.exports.Skin;
  /** @type {typeof RenderWebGL.CanvasMeasurementProvider} */
  // @ts-expect-error - exports not typed yet
  const CanvasMeasurementProvider = renderer.exports.CanvasMeasurementProvider;
  // @ts-expect-error - exports not typed yet
  const twgl = renderer.exports.twgl;

  // TODO:
  // clones, green flag, stop sign

  class TextCostumeSkin extends Skin {
    constructor (id) {
      // @ts-expect-error - constructors not typed yet
      super(id, renderer);

      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');

      this.text = '';
      this.color = DEFAULT_COLOR;
      this.textWidth = DEFAULT_WIDTH;
      this.fontFamily = DEFAULT_FONT;
      this.baseFontSize = DEFAULT_FONT_SIZE;
      this.spaceBetweenLines = DEFAULT_SPACE_BETWEEN_LINES;
      this.align = DEFAULT_ALIGN;

      /** @type {Array<{text: string; width: number;}>} */
      this.lines = [];
      /** @type {[number, number]} */
      this._size = [0, 0];
      /** @type {[number, number]} */
      this._rotationCenter = [0, 0];
      this.calculatedFontSize = this.baseFontSize;

      this.maxDisplayableCharacters = Infinity;
      this.typeAnimationInterval = null;

      this.isRainbow = false;
      this.rainbowStartTime = 0;

      this.isZooming = false;
      this.zoomStartTime = 0;
    }

    // Part of Skin API
    get size () {
      return this._size;
    }

    // Part of Skin API
    get volatile () {
      return this.isRainbow || this.isZooming;
    }

    _calculateDimensions () {
      this.calculatedFontSize = this._calculateFontSize();

      // need to make new ones each time to avoid caching incorrectly across fonts
      // @ts-expect-error - constructors not typed yet
      const measurementProvider = new CanvasMeasurementProvider(this.ctx);
      /** @type {RenderWebGL.TextWrapper} */
      // @ts-expect-error - createTextWrapper not typed yet
      const textWrapper = renderer.createTextWrapper(measurementProvider);

      this.ctx.font = this._getFontStyle();
      const lines = textWrapper.wrapText(this.textWidth, this.text);
      this.lines = lines.map(line => ({
        text: line,
        width: measurementProvider.measureText(line)
      }));

      // TODO: we need a lot more padding
      this._size[0] = this.textWidth;
      this._size[1] = this.lines.length * (this.baseFontSize + this.spaceBetweenLines);

      // TODO: this is wrong. rotation center should actually be horizontally centered at the bottom of the first line?
      this._rotationCenter[0] = this._size[0] / 2;
      this._rotationCenter[1] = this._size[1] / 2;
    }

    _getFontStyle () {
      return `${this.calculatedFontSize}px "${this.fontFamily}"`;
    }

    _calculateFontSize () {
      if (this.isZooming) {
        // TODO: it looks like Scratch might be always making sure part of the text is visible?
        const time = Date.now() - this.zoomStartTime;
        const progress = Math.max(0, Math.min(1, time / ZOOM_DURATION));
        return this.baseFontSize * progress;
      }
      return this.baseFontSize;
    }

    _renderAtScale (requestedScale) {
      this._calculateDimensions();

      const canvasWidth = this._size[0];
      const canvasHeight = this._size[1];

      // Renderer's requested scale is accounted for at this point. Do not touch `requestedScale`
      // ever after this point.
      this.canvas.width = Math.ceil(canvasWidth * requestedScale);
      this.canvas.height = Math.ceil(canvasHeight * requestedScale);
      this.ctx.scale(requestedScale, requestedScale);

      this.ctx.fillStyle = this.color;
      this.ctx.font = this._getFontStyle();
      let displayedCharacters = 0;
      for (let i = 0; i < this.lines.length; i++) {
        const line = this.lines[i];
        const text = line.text;
        const lineWidth = line.width;

        const displayedText = text.substring(0, this.maxDisplayableCharacters - displayedCharacters);
        displayedCharacters += text.length;

        let xOffset = 0;
        if (this.align === ALIGN_LEFT) {
          // already correct
        } else if (this.align === ALIGN_CENTER) {
          xOffset = (this.textWidth - lineWidth) / 2;
        } else {
          xOffset = this.textWidth - lineWidth;
        }

        // TODO: something here is wrong
        this.ctx.fillText(
          displayedText,
          xOffset,
          i * (this.baseFontSize + this.spaceBetweenLines) + this.baseFontSize * 0.9
        );
      }

      if (this.isRainbow) {
        // TODO: it looks like scratch does a separate rainbow per line of text. that's a bit silly if you ask me.
        this.ctx.globalCompositeOperation = 'source-in';
        const gradient = this.ctx.createLinearGradient(0, 0, canvasWidth, 0);

        const timeOffset = (Date.now() - this.rainbowStartTime) / RAINBOW_TIME_PER;
        for (let i = 0; i < RAINBOW_COLORS.length; i++) {
          const offset = ((i / RAINBOW_COLORS.length) + timeOffset) % 1;
          gradient.addColorStop(offset, RAINBOW_COLORS[i]);
        }

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      }

      // TODO: don't recreate when not needed
      this._texture = twgl.createTexture(gl, {
        auto: false,
        wrap: gl.CLAMP_TO_EDGE
      });
      this._setTexture(this.canvas);
    }

    setText (text) {
      this.text = text;
      this.emitWasAltered();
    }

    setColor (color) {
      this.color = color;
      this.emitWasAltered();
    }

    setAlign (align) {
      this.align = align;
      this.emitWasAltered();
    }

    setMaxWidth (maxWidth) {
      this.textWidth = maxWidth;
      this.emitWasAltered();
    }

    setFontFamily (font) {
      this.fontFamily = font;
      this.emitWasAltered();
    }

    startTypeAnimation () {
      this.maxDisplayableCharacters = 0;
      this.typeAnimationInterval = setInterval(() => {
        if (this.maxDisplayableCharacters >= this.text.length) {
          this.maxDisplayableCharacters = Infinity;
          clearInterval(this.typeAnimationInterval);
        } else {
          this.maxDisplayableCharacters++;
        }
        this.emitWasAltered();
      }, TYPE_DELAY);
    }

    startRainbowAnimation () {
      this.isRainbow = true;
      this.rainbowStartTime = Date.now();
      setTimeout(() => {
        this.isRainbow = false;
        this.emitWasAltered();
      }, RAINBOW_DURATION);
    }

    startZoomAnimation () {
      this.isZooming = true;
      this.zoomStartTime = Date.now();
      setTimeout(() => {
        this.isZooming = false;
        this.emitWasAltered();
      }, ZOOM_DURATION);
    }

    cancelAnimation () {
      this.maxDisplayableCharacters = Infinity;
      clearInterval(this.typeAnimationInterval);

      this.isRainbow = false;

      this.isZooming = false;

      this.emitWasAltered();
    }

    // Part of Skin API
    getTexture (scale) {
      const MAX_SCALE = 10;
      const scaleMax = scale ? Math.max(Math.abs(scale[0]), Math.abs(scale[1])) : 100;
      const calculatedScale = Math.min(MAX_SCALE, scaleMax / 100);
      this._renderAtScale(calculatedScale);
      return this._texture;
    }
  }

  const createTextCostumeSkin = () => {
    const renderer = Scratch.vm.renderer;
    const id = renderer._nextDrawableId++;
    const skin = new TextCostumeSkin(id);
    renderer._allSkins[id] = skin;
    return skin;
  };

  class AnimatedText {
    getInfo() {
      return {
        id: 'text',
        name: 'Animated Text',
        blocks: [
          {
            opcode: 'setText',
            blockType: Scratch.BlockType.COMMAND,
            text: 'show text [TEXT]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Welcome to my project!'
              }
            }
          },
          {
            opcode: 'animateText',
            blockType: Scratch.BlockType.COMMAND,
            text: '[ANIMATE] text [TEXT]',
            arguments: {
              ANIMATE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'animate',
                defaultValue: 'rainbow'
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Here we go!'
              }
            }
          },
          {
            opcode: 'clearText',
            blockType: Scratch.BlockType.COMMAND,
            text: 'show sprite'
          },
          '---',
          {
            opcode: 'setFont',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set font to [FONT]',
            arguments: {
              FONT: {
                type: Scratch.ArgumentType.STRING,
                menu: 'font'
              }
            }
          },
          {
            opcode: 'setColor',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set text color to [COLOR]',
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR
              }
            }
          },
          {
            opcode: 'setWidth',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set width to [WIDTH] aligned [ALIGN]',
            arguments: {
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '200'
              },
              ALIGN: {
                type: Scratch.ArgumentType.STRING,
                menu: 'align'
              }
            }
          }
        ],
        menus: {
          // These all need acceptReporters: false for parity with the Scratch Labs version.
          animate: {
            acceptReporters: false,
            items: ['type', 'rainbow', 'zoom']
          },
          font: {
            acceptReporters: false,
            items: [
              ...NATIVE_FONTS,
              {
                text: 'random font',
                value: 'Random'
              }
            ]
          },
          align: {
            acceptReporters: false,
            items: [
              'left',
              'center',
              'right'
            ]
          }
        }
      };
    }

    /**
     * @param {VM.Target} target
     * @returns {TextState}
     */
    _getState (target) {
      // @ts-expect-error
      const state = target.getCustomState(CUSTOM_STATE_KEY);
      if (!state) {
        /** @type {TextState} */
        const newState = {
          skin: createTextCostumeSkin()
        };
        // @ts-expect-error
        target.setCustomState(CUSTOM_STATE_KEY, newState);
        return newState;
      }
      // @ts-expect-error
      return state;
    }

    /**
     * @param {VM.Target} target 
     * @param {TextState} state 
     */
    _renderText (target, state) {
      state.skin.cancelAnimation();
      renderer.updateDrawableSkinId(target.drawableID, state.skin.id);
    }

    setText ({ TEXT }, util) {
      const state = this._getState(util.target);
      state.skin.setText(Scratch.Cast.toString(TEXT));
      this._renderText(util.target, state);
      // TODO: Scratch might force 1 frame delay here? we probably shouldn't copy that though
    }

    animateText ({ ANIMATE, TEXT }, util) {
      const state = this._getState(util.target);
      this._renderText(util.target, state);

      state.skin.setText(Scratch.Cast.toString(TEXT));
      state.skin.cancelAnimation();

      // TODO: this needs to actually return a promise
      if (ANIMATE === 'type') {
        return state.skin.startTypeAnimation();
      } else if (ANIMATE === 'rainbow') {
        return state.skin.startRainbowAnimation();
      } else if (ANIMATE === 'zoom') {
        return state.skin.startZoomAnimation();
      }
    }

    clearText (args, util) {
      // TODO: this will create state when it doesn't need to!
      const state = this._getState(util.target);
      state.skin.cancelAnimation();
      util.target.setCostume(util.target.currentCostume);
    }

    setFont ({ FONT }, util) {
      const state = this._getState(util.target);
      if (FONT === 'Random') {
        state.skin.setFontFamily(NATIVE_FONTS[Math.floor(Math.random() * NATIVE_FONTS.length)]);
      } else {
        state.skin.setFontFamily(Scratch.Cast.toString(FONT));
      }
    }

    setColor ({ COLOR }, util) {
      const state = this._getState(util.target);
      state.skin.setColor(Scratch.Cast.toString(COLOR));
    }

    setWidth ({ WIDTH, ALIGN }, util) {
      const state = this._getState(util.target);

      if (ALIGN === 'left') {
        state.skin.setAlign(ALIGN_LEFT);
      } else if (ALIGN === 'center') {
        state.skin.setAlign(ALIGN_CENTER);
      } else if (ALIGN === 'right') {
        state.skin.setAlign(ALIGN_RIGHT);
      } else {
        // TODO: test what scratch does here
      }

      state.skin.setMaxWidth(Scratch.Cast.toNumber(WIDTH));
    }
  }

  Scratch.extensions.register(new AnimatedText());
})(Scratch);
