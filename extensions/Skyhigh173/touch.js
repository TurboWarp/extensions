// Name: Multi Touch
// ID: skyhigh173touch
// Description: Multiple fingers at once!
// By: Skyhigh173
// License: MIT

(function (Scratch) {
  'use strict';

  /**
   * @typedef Finger
   * @property {number} date
   * @property {number} prevX
   * @property {number} prevY
   * @property {number} prevDate
   * @property {number} nowDate
   */

  class MultiTouchExtension {
    constructor() {
      /**
       * @type {HTMLElement}
       */
      this.canvasDiv = null;
      /**
       * @type {HTMLCanvasElement}
       */
      this.canvas = null;
      /**
       * @type {Array.<Touch>}
       */
      this._touches = [];
      /**
       * @type {Array.<null|(Finger & Touch)>}
       */
      this._fingers = [];
      this._setup();
    }

    _setup() {
      this.canvas = Scratch.vm.runtime.renderer.canvas;
      this.canvasDiv = this.canvas.parentElement;
      
      /**
       * update touch list
       * @param {TouchEvent} e 
       */
      const update = e => {
        this._touches = [...e.touches];

        // update position
        this._touches.forEach(touch => {
          const finger = /** @type {Touch & Finger} */ (touch);

          // if theres a new finger...
          const idx = this._fingers.findIndex(finger => finger?.identifier === touch.identifier);
          if (idx === -1) {
            finger.date = Date.now();
            finger.prevX = touch.clientX;
            finger.prevY = touch.clientY;
            finger.prevDate = Date.now();
            finger.nowDate = Date.now();
            this._fingers.push(finger);
          } else {
            const date = finger.date;
            const oldX = finger.clientX;
            const oldY = finger.clientY;
            const oldDate = finger.nowDate;
            finger.date = date;
            finger.prevX = oldX;
            finger.prevY = oldY;
            finger.prevDate = oldDate;
            finger.nowDate = Date.now();
            this._fingers[idx] = finger;
          }
        });

        this._fingers.forEach((t, index) => {
          // if the finger releases...
          if (this._touches.findIndex(f => f.identifier === t?.identifier) === -1) {
            this._fingers[index] = null;
          }
        });

        // clear trailing null values
        while (this._fingers.length > 0 && this._fingers[this._fingers.length - 1] === null) {
          this._fingers.pop();
        }
      }

      // do not use this.canvasDiv because event will lost after 'see inside' or change page
      window.addEventListener('touchstart', update);
      window.addEventListener('touchmove', update);
      window.addEventListener('touchend', update);
    }

    get bound() {
      return this.canvas.getBoundingClientRect();
    }

    _clamp(min, x, max) {
      return Math.max(Math.min(x, max), min);
    }
    _scale(x, sRmin, sRmax, tRmin, tRmax) {
      return (tRmax - tRmin) / (sRmax - sRmin) * (x - sRmin) + tRmin;
    }

    _propMap = {
      // map client coord to scratch coord
      _x: (clientX) => this._clamp(-240, this._scale(clientX, this.bound.left, this.bound.right, -240, 240), 240),
      _y: (clientY) => this._clamp(-180, this._scale(clientY, this.bound.bottom, this.bound.top, -180, 180), 180),

      x: (t) => this._propMap._x(t.clientX),
      y: (t) => this._propMap._y(t.clientY),
      dx: (t) => (this._propMap._x(t.clientX) - this._propMap._x(t.prevX)),
      dy: (t) => (this._propMap._y(t.clientY) - this._propMap._y(t.prevY)),
      sx: (t) => this._propMap.dx(t) / ((t.nowDate - t.prevDate) / 1000),
      sy: (t) => this._propMap.dy(t) / ((t.nowDate - t.prevDate) / 1000),
      duration: (t) => (Date.now() - t.date) / 1000,
      force: (t) => t.force,
    };

    getInfo() {
      return {
        id: 'skyhigh173touch',
        name: 'Multi Touch',
        color1: '#F76AB3',
        blocks: [
          {
            opcode: 'touchAvailable',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is touch available?'
          },
          {
            opcode: 'maxMultiTouch',
            blockType: Scratch.BlockType.REPORTER,
            text: 'maximum finger count'
          },
          '---',
          {
            opcode: 'numOfFingers',
            blockType: Scratch.BlockType.REPORTER,
            text: 'number of fingers',
          },
          {
            opcode: 'numOfFingersID',
            blockType: Scratch.BlockType.REPORTER,
            text: 'number of fingers ID',
          },
          {
            opcode: 'propOfFinger',
            blockType: Scratch.BlockType.REPORTER,
            text: '[PROP] of finger [ID]',
            arguments: {
              PROP: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'x',
                menu: 'prop',
              },
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: 'fingerExists',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'finger [ID] exists?',
            arguments: {
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          '---',
          {
            opcode: 'touchingFinger',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'touching any finger?',
            disableMonitor: true,
            filter: [Scratch.TargetType.SPRITE]
          },
          {
            opcode: 'touchingFingerCount',
            blockType: Scratch.BlockType.REPORTER,
            text: 'current touching finger count',
            disableMonitor: true,
            filter: [Scratch.TargetType.SPRITE]
          },
          {
            opcode: 'touchingFingerID',
            blockType: Scratch.BlockType.REPORTER,
            text: 'current touching finger [X] ID',
            disableMonitor: true,
            filter: [Scratch.TargetType.SPRITE],
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
        ],
        menus: {
          prop: {
            acceptReporters: true,
            /**
             * x: x position
             * y: y position
             * dx: change of x position compared to previous frame
             * dy: change of y position compared to previous frame
             * sx: avg speed x of finger in a second
             * sy: avg speed y of finger in a second
             * duration: time since finger press
             * force (some devices only): force of finger press
             */
            items: ['x', 'y', 'dx', 'dy', 'sx', 'sy', 'duration', 'force'],
          },
        },
      };
    }

    touchAvailable() {
      return window.navigator.maxTouchPoints > 0;
    }
    maxMultiTouch() {
      return window.navigator.maxTouchPoints;
    }

    numOfFingers() {
      return this._touches.length;
    }

    numOfFingersID() {
      return this._fingers.length;
    }

    propOfFinger({ PROP, ID }) {
      PROP = this._propMap[PROP];
      ID = Scratch.Cast.toNumber(ID) - 1;
      if (ID >= this._fingers.length || this._fingers[ID] === null) return '';
      return PROP(this._fingers[ID]);
    }

    fingerExists({ ID }) {
      ID = Scratch.Cast.toNumber(ID) - 1;
      return ID < this._fingers.length && this._fingers[ID] !== null;
    }

    _touchingCondition(f, util) {
      return f !== null && util.target.isTouchingPoint(this._propMap.x(f) + this.bound.width / 2, this.bound.height / 2 - this._propMap.y(f));
    }

    touchingFinger(_, util) {
      return this._fingers.find((f) => {
        return this._touchingCondition(f, util);
      }) !== undefined;
    }

    touchingFingerCount(_, util) {
      return this._fingers.reduce((total, f) => {
        return total + (this._touchingCondition(f, util) ? 1 : 0); 
      }, 0);
    }

    touchingFingerID({ ID }, util) {
      ID = Scratch.Cast.toNumber(ID);
      const result = this._fingers.findIndex(f => {
        return this._touchingCondition(f, util) && (--ID <= 0);
      }) + 1;
      return result == 0 ? '' : result;
    }
  }
  Scratch.extensions.register(new MultiTouchExtension());
})(Scratch);
