// Name: Multi Touch
// ID: skyhigh173touch
// Description: Sense multiple fingers at once.
// By: Skyhigh173
// License: MIT

(function (Scratch) {
  "use strict";

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
      const update = (e) => {
        this._touches = [...e.touches];

        // update position
        this._touches.forEach((touch) => {
          const finger = /** @type {Touch & Finger} */ (touch);

          // if theres a new finger...
          const idx = this._fingers.findIndex(
            (finger) => finger?.identifier === touch.identifier
          );
          if (idx === -1) {
            finger.date = performance.now();
            finger.prevX = touch.clientX;
            finger.prevY = touch.clientY;
            finger.prevDate = performance.now();
            finger.nowDate = performance.now();
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
            finger.nowDate = performance.now();
            this._fingers[idx] = finger;
          }
        });

        this._fingers.forEach((t, index) => {
          // if the finger releases...
          if (
            this._touches.findIndex((f) => f.identifier === t?.identifier) ===
            -1
          ) {
            this._fingers[index] = null;
          }
        });

        // clear trailing null values
        while (
          this._fingers.length > 0 &&
          this._fingers[this._fingers.length - 1] === null
        ) {
          this._fingers.pop();
        }
      };

      // do not use this.canvasDiv because event will lost after 'see inside' or change page
      window.addEventListener("touchstart", update);
      window.addEventListener("touchmove", update);
      window.addEventListener("touchend", update);
    }

    _getCanvasBounds() {
      return this.canvas.getBoundingClientRect();
    }
    _clamp(min, x, max) {
      return Math.max(Math.min(x, max), min);
    }
    _map(x, sRmin, sRmax, tRmin, tRmax) {
      return ((tRmax - tRmin) / (sRmax - sRmin)) * (x - sRmin) + tRmin;
    }
    _toScratchX(clientX) {
      const bounds = this._getCanvasBounds();
      const min = -Scratch.vm.runtime.stageWidth / 2;
      const max = Scratch.vm.runtime.stageWidth / 2;
      return this._clamp(
        min,
        this._map(clientX, bounds.left, bounds.right, min, max),
        max
      );
    }
    _toScratchY(clientY) {
      const bounds = this._getCanvasBounds();
      const min = -Scratch.vm.runtime.stageHeight / 2;
      const max = Scratch.vm.runtime.stageHeight / 2;
      return this._clamp(
        min,
        this._map(clientY, bounds.bottom, bounds.top, min, max),
        max
      );
    }

    _propMap = {
      x: (t) => this._toScratchX(t.clientX),
      y: (t) => this._toScratchY(t.clientY),
      dx: (t) => this._toScratchX(t.clientX) - this._toScratchX(t.prevX),
      dy: (t) => this._toScratchY(t.clientY) - this._toScratchY(t.prevY),
      sx: (t) => this._propMap.dx(t) / ((t.nowDate - t.prevDate) / 1000),
      sy: (t) => this._propMap.dy(t) / ((t.nowDate - t.prevDate) / 1000),
      duration: (t) => (performance.now() - t.date) / 1000,
      force: (t) => t.force,
    };

    getInfo() {
      return {
        id: "skyhigh173touch",
        name: Scratch.translate("Multi Touch"),
        color1: "#F76AB3",
        blocks: [
          {
            opcode: "touchAvailable",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is touch available?"),
          },
          {
            opcode: "maxMultiTouch",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("maximum finger count"),
          },
          "---",
          {
            opcode: "numOfFingers",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("number of fingers"),
          },
          {
            opcode: "numOfFingersID",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("number of fingers ID"),
          },
          {
            opcode: "propOfFinger",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[PROP] of finger [ID]"),
            arguments: {
              PROP: {
                type: Scratch.ArgumentType.STRING,
                menu: "prop",
              },
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
              },
            },
          },
          {
            opcode: "fingerExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("finger [ID] exists?"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
              },
            },
          },
          "---",
          {
            opcode: "touchingFinger",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("touching any finger?"),
            disableMonitor: true,
            filter: [Scratch.TargetType.SPRITE],
          },
          {
            opcode: "touchingFingerCount",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current touching finger count"),
            disableMonitor: true,
            filter: [Scratch.TargetType.SPRITE],
          },
          {
            opcode: "touchingFingerID",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current touching finger [X] ID"),
            disableMonitor: true,
            filter: [Scratch.TargetType.SPRITE],
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
              },
            },
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
            items: [
              {
                text: Scratch.translate({
                  default: "x position",
                  description:
                    "Menu option to get how the x coordinate of a finger. ",
                }),
                value: "x",
              },
              {
                text: Scratch.translate({
                  default: "y position",
                  description:
                    "Menu option to get how the y coordinate of a finger. ",
                }),
                value: "y",
              },
              {
                text: Scratch.translate({
                  default: "x delta",
                  description:
                    "Menu option to get how much the X coordinate of a finger has moved.",
                }),
                value: "dx",
              },
              {
                text: Scratch.translate({
                  default: "y delta",
                  description:
                    "Menu option to get how much the X coordinate of a finger has moved.",
                }),
                value: "dy",
              },
              {
                text: Scratch.translate({
                  default: "x speed",
                  description:
                    "Menu option to get fast the X coordinate of a finger is changing.",
                }),
                value: "sx",
              },
              {
                text: Scratch.translate({
                  default: "y speed",
                  description:
                    "Menu option to get fast the Y coordinate of a finger is changing.",
                }),
                value: "sy",
              },
              {
                text: Scratch.translate({
                  default: "duration",
                  description:
                    "Menu option to get how long a finger has been pressed.",
                }),
              },
              {
                text: Scratch.translate({
                  default: "force",
                  description:
                    "Menu option to get how hard a finger is being pressed.",
                }),
              },
            ],
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
      if (ID >= this._fingers.length || this._fingers[ID] === null) return "";
      return PROP(this._fingers[ID]);
    }

    fingerExists({ ID }) {
      ID = Scratch.Cast.toNumber(ID) - 1;
      return ID < this._fingers.length && this._fingers[ID] !== null;
    }

    _touchingCondition(f, util) {
      return (
        f !== null &&
        util.target.isTouchingPoint(
          this._propMap.x(f) + this.bound.width / 2,
          this.bound.height / 2 - this._propMap.y(f)
        )
      );
    }

    touchingFinger(_, util) {
      return (
        this._fingers.find((f) => {
          return this._touchingCondition(f, util);
        }) !== undefined
      );
    }

    touchingFingerCount(_, util) {
      return this._fingers.reduce((total, f) => {
        return total + (this._touchingCondition(f, util) ? 1 : 0);
      }, 0);
    }

    touchingFingerID({ ID }, util) {
      ID = Scratch.Cast.toNumber(ID);
      const result =
        this._fingers.findIndex((f) => {
          return this._touchingCondition(f, util) && --ID <= 0;
        }) + 1;
      return result == 0 ? "" : result;
    }
  }

  Scratch.extensions.register(new MultiTouchExtension());
})(Scratch);
