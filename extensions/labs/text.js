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

  class TextCostumeSkin extends Skin {
    constructor (id) {
      // @ts-expect-error - constructors not typed yet
      super(id, renderer);

      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');

      /** @type {[number, number]} [width, height] */
      this._size = [100, 100];
      this._rotationCenter = [this._size[0] / 2, this._size[1] / 2];

      this.text = '';
      this.color = '#575E75';
      this.maxWidth = 480;
      this.fontFamily = 'Handwriting';
      this.fontSize = 24;
      this.lineSpacing = 2;
      this.align = ALIGN_LEFT;

      /** @type {Array<{text: string; width: number;}>} */
      this.lines = [];
      this.longestLineWidth = 0;

      this.maxDisplayableCharacters = Infinity;
      this.typeAnimationInterval = null;
    }

    // Part of Skin API
    get size () {
      return this._size;
    }

    _calculateDimensions () {
      // need to make new ones each time to avoid caching incorrectly across fonts
      // @ts-expect-error - constructors not typed yet
      const measurementProvider = new CanvasMeasurementProvider(this.ctx);
      /** @type {RenderWebGL.TextWrapper} */
      // @ts-expect-error - createTextWrapper not typed yet
      const textWrapper = renderer.createTextWrapper(measurementProvider);

      this.ctx.font = this._getFontStyle();
      const lines = textWrapper.wrapText(this.maxWidth, this.text);
      this.lines = lines.map(line => ({
        text: line,
        width: measurementProvider.measureText(line)
      }));

      this.longestLineWidth = 0;
      for (const line of this.lines) {
        if (line.width > this.longestLineWidth) {
          this.longestLineWidth = line.width;
        }
      }

      // TODO: we need a lot more padding
      this._size[0] = this.longestLineWidth;
      this._size[1] = this.lines.length * (this.fontSize + this.lineSpacing);

      // TODO: this is wrong
      this._rotationCenter[0] = this._size[0] / 2;
      this._rotationCenter[1] = this._size[1] / 2;
    }

    _getFontStyle () {
      return `${this.fontSize}px "${this.fontFamily}"`;
    }

    _renderText (scale) {
      this._calculateDimensions();

      this.canvas.width = this._size[0] * scale;
      this.canvas.height = this._size[1] * scale;
      this.ctx.scale(scale, scale);

      // TODO: remove
      // this.ctx.fillStyle = 'purple';
      // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.fillStyle = this.color;
      this.ctx.font = this._getFontStyle();
      this.ctx.textBaseline = 'bottom';

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
          xOffset = (this.longestLineWidth - lineWidth) / 2;
        } else {
          xOffset = this.longestLineWidth - lineWidth;
        }

        // TODO: something here is wrong
        this.ctx.fillText(
          displayedText,
          xOffset,
          i * (this.fontSize + this.lineSpacing) + this.fontSize * 0.9
        );
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
      this.maxWidth = maxWidth;
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
      }, 75);
    }

    cancelAnimation () {
      this.maxDisplayableCharacters = Infinity;
      clearInterval(this.typeAnimationInterval);

      this.emitWasAltered();
    }

    // Part of Skin API
    getTexture (scale) {
      const MAX_SCALE = 10;
      const scaleMax = scale ? Math.max(Math.abs(scale[0]), Math.abs(scale[1])) : 100;
      const calculatedScale = Math.min(MAX_SCALE, scaleMax / 100);
      this._renderText(calculatedScale);
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

      if (ANIMATE === 'type') {
        state.skin.startTypeAnimation();
      }

      // TODO: this needs to return a promise
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
