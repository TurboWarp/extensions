// Name: Touches
// ID: dnintouches
// Description: Handle multiple simultaneous touch events. Also detects mouse input.
// By: D-ScratchNinja <https://scratch.mit.edu/users/D-ScratchNinja/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Touches extension must run unsandboxed");
  }

  const clamp = (n, min, max) => Math.max(Math.min(n, max), min);

  class TouchesExtension {
    constructor() {
      this.ongoingTouches = Array(64); // We don't really know how many we'll need so...
      this.lastPointerType = "";

      this.canvas = Scratch.renderer.canvas;

      const nextFreeTouchID = () => this.ongoingTouches.findIndex((i) => !i);
      const toStageX = (x, rect) => {
        const relX = x - rect.x;
        const stageWidth = Scratch.vm.runtime.stageWidth;
        const stageX = clamp(
          (relX / rect.width - 0.5) * stageWidth,
          -stageWidth / 2,
          stageWidth / 2,
        );
        if (Scratch.vm.runtime.runtimeOptions.miscLimits) {
          return Math.round(stageX);
        } else {
          return stageX;
        }
      };
      const toStageY = (y, rect) => {
        const relY = y - rect.y;
        const stageHeight = Scratch.vm.runtime.stageHeight;
        const stageY = clamp(
          (relY / rect.height - 0.5) * -stageHeight,
          -stageHeight / 2,
          stageHeight / 2,
        );
        if (Scratch.vm.runtime.runtimeOptions.miscLimits) {
          return Math.round(stageY);
        } else {
          return stageY;
        }
      };

      this.canvas.addEventListener("pointerdown", (e) => {
        const existingTouch = this.ongoingTouches.findIndex(
          (i) => i?.identifier === e.pointerId,
        ); // Depending on the user agent and pointer, events may not always have unique identifiers
        const i = existingTouch > 0 ? existingTouch : nextFreeTouchID();
        const canvasRect = this.canvas.getBoundingClientRect();
        const pressedTarget = Scratch.vm.runtime.ioDevices.mouse._pickTarget(
          e.offsetX,
          e.offsetY,
        );
        Scratch.vm.runtime.startHats(
          "dnintouches_whenSpritePressed",
          null,
          pressedTarget,
        );
        this.ongoingTouches[i] = {
          active: true,
          canceled: false,
          identifier: e.pointerId,
          willRemove: false,
          x: toStageX(e.clientX, canvasRect),
          y: toStageY(e.clientY, canvasRect),
          canvasX: e.offsetX,
          canvasY: e.offsetY,
          pressedTarget: pressedTarget,
        };
        this.lastPointerType = e.pointerType;
      });
      document.addEventListener("pointermove", (e) => {
        const touch = this.ongoingTouches.find(
          (i) => i?.identifier === e.pointerId,
        );
        if (!touch) return;
        const canvasRect = this.canvas.getBoundingClientRect();
        touch.x = toStageX(e.clientX, canvasRect);
        touch.y = toStageY(e.clientY, canvasRect);
        touch.canvasX = e.clientX - canvasRect.x;
        touch.canvasY = e.clientY - canvasRect.y;
      });
      document.addEventListener("pointerup", (e) => {
        const slot = this.ongoingTouches.find(
          (i) => i?.identifier === e.pointerId,
        );
        if (!slot) return;
        slot.active = false;
      });
      document.addEventListener("pointercancel", (e) => {
        const slot = this.ongoingTouches.find(
          (i) => i?.identifier === e.pointerId,
        );
        if (!slot) return;
        slot.active = false;
        slot.canceled = true;
      });

      const preClearInactiveTouches = () => {
        this.ongoingTouches.forEach((touch) => {
          if (!touch.active) {
            touch.willRemove = true;
          }
        });
      };
      const clearInactiveTouches = () => {
        this.ongoingTouches.forEach((touch, index) => {
          if (!touch.active) {
            if (touch.willRemove) {
              delete this.ongoingTouches[index]; // Don't splice, the index of each item must be preserved
            }
          }
        });
      };

      Scratch.vm.runtime.on("BEFORE_EXECUTE", () => {
        preClearInactiveTouches();
      });
      Scratch.vm.runtime.on("AFTER_EXECUTE", () => {
        clearInactiveTouches();
      });
    }

    getInfo() {
      return {
        id: "dnintouches",
        name: "Touches",
        color1: "#5cb1d6",
        color2: "#3ba2ce",
        color3: "#2e8eb8",
        blocks: [
          {
            opcode: "isTouchScreen",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is touch screen?"),
            extensions: ["colours_sensing"],
          },
          {
            opcode: "maxTouchPoints",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("max touch points"),
            extensions: ["colours_sensing"],
          },
          {
            opcode: "inputMethod",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("input method"),
            extensions: ["colours_sensing"],
          },

          "---",

          {
            opcode: "countTouches",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("number of fingers down"),
            extensions: ["colours_sensing"],
          },
          {
            opcode: "touchProperty",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[PROPERTY] of touch [TOUCH]"),
            arguments: {
              PROPERTY: {
                type: Scratch.ArgumentType.STRING,
                menu: "touchProperty",
                defaultValue: "x position",
              },
              TOUCH: {
                type: Scratch.ArgumentType.STRING,
                menu: "touchIDs",
                defaultValue: "1",
              },
            },
            extensions: ["colours_sensing"],
          },
          {
            opcode: "isTouchActive",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is touch [TOUCH] down?"),
            arguments: {
              TOUCH: {
                type: Scratch.ArgumentType.STRING,
                menu: "touchIDs",
                defaultValue: "1",
              },
            },
            extensions: ["colours_sensing"],
          },
          {
            opcode: "wasTouchCanceled",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("was touch [TOUCH] canceled?"),
            arguments: {
              TOUCH: {
                type: Scratch.ArgumentType.STRING,
                menu: "touchIDs",
                defaultValue: "1",
              },
            },
            extensions: ["colours_sensing"],
          },

          "---",

          {
            opcode: "whenSpritePressed",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when this sprite pressed"),
            isEdgeActivated: false,
            shouldRestartExistingThreads: true,
            extensions: ["colours_event"],
          },
          {
            opcode: "isPressed",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is this sprite being pressed?"),
            extensions: ["colours_sensing"],
          },
          {
            opcode: "isTouched",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is this sprite being touched?"),
            extensions: ["colours_sensing"],
          },
          {
            opcode: "isIdTouchingMe",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is touch [TOUCH] touching me?"),
            arguments: {
              TOUCH: {
                type: Scratch.ArgumentType.STRING,
                menu: "touchIDs",
                defaultValue: "1",
              },
            },
            extensions: ["colours_sensing"],
          },
          {
            opcode: "relatedTouchIndex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("# of [SELECTOR] touch"),
            arguments: {
              SELECTOR: {
                type: Scratch.ArgumentType.STRING,
                menu: "touchSelector",
                defaultValue: "pressed",
              },
            },
            extensions: ["colours_sensing"],
          },
          {
            opcode: "relatedTouchProperty",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[PROPERTY] of [SELECTOR] touch"),
            arguments: {
              PROPERTY: {
                type: Scratch.ArgumentType.STRING,
                menu: "touchProperty",
                defaultValue: "x position",
              },
              SELECTOR: {
                type: Scratch.ArgumentType.STRING,
                menu: "touchSelector",
                defaultValue: "pressed",
              },
            },
            extensions: ["colours_sensing"],
          },

          "---",

          {
            opcode: "goToTouch",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("go to touch [TOUCH]"),
            arguments: {
              TOUCH: {
                type: Scratch.ArgumentType.STRING,
                menu: "touchIDs",
                defaultValue: "1",
              },
            },
            extensions: ["colours_motion"],
          },
          {
            opcode: "pointTowardsTouch",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("point towards touch [TOUCH]"),
            arguments: {
              TOUCH: {
                type: Scratch.ArgumentType.STRING,
                menu: "touchIDs",
                defaultValue: "1",
              },
            },
            extensions: ["colours_motion"],
          },
        ],
        menus: {
          touchProperty: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("x position"),
                value: "x position",
              },
              {
                text: Scratch.translate("y position"),
                value: "y position",
              },
              {
                text: Scratch.translate({
                  default: "distance (from)",
                  description:
                    "Returns how far away the touch is from the target. This is an argument in a reporter block labeled '[parameter] of touch', so this would end up saying 'distance (from) of touch'",
                }),
                value: "distance",
              },
              {
                text: Scratch.translate({
                  default: "initial target",
                  description:
                    "Returns the sprite that the finger was touching when it made contact with the screen",
                }),
                value: "initial target",
              },
              {
                text: Scratch.translate({
                  default: "touched target",
                  description:
                    "Returns the sprite that the finger is currently touching",
                }),
                value: "touched target",
              },
            ],
          },
          touchIDs: {
            acceptReporters: true,
            items: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          },
          touchSelector: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("pressed"),
                value: "pressed",
              },
              {
                text: Scratch.translate("contacted"),
                value: "contacted",
              },
            ],
          },
        },
      };
    }

    isTouchScreen() {
      return navigator.maxTouchPoints > 0;
    }

    maxTouchPoints() {
      return Math.max(
        navigator.maxTouchPoints,
        window.matchMedia("(any-pointer)").matches, // Returns true (1) if a pointing device is connected
      );
    }

    inputMethod() {
      return this.lastPointerType;
    }

    isPressed(_, util) {
      for (let i = 0; i < this.ongoingTouches.length; i++) {
        const touch = this.ongoingTouches[i];
        if (touch?.active && touch?.pressedTarget.id === util.target.id)
          return true;
      }
      return false;
    }

    relatedTouchIndex({ SELECTOR }, util) {
      // Iterate through active touches until a match is found
      for (let i = 0; i < this.ongoingTouches.length; i++) {
        const touch = this.ongoingTouches[i];
        if (!touch) continue;
        // Then return its property
        switch (SELECTOR) {
          case "pressed": {
            if (touch?.pressedTarget.id === util.target.id) {
              return i + 1 ?? "";
            } else break;
          }
          case "contacted": {
            if (util.target.isTouchingPoint(touch.canvasX, touch.canvasY)) {
              return i + 1 ?? "";
            } else break;
          }
          default:
            return 0;
        }
      }
      return 0;
    }

    relatedTouchProperty({ PROPERTY, SELECTOR }, util) {
      // Iterate through active touches until a match is found
      for (let i = 0; i < this.ongoingTouches.length; i++) {
        const touch = this.ongoingTouches[i];
        if (!touch) continue;
        const returnValue = () =>
          this.touchProperty({ PROPERTY: PROPERTY, TOUCH: i + 1 }, util);
        // Then return its property
        switch (SELECTOR) {
          case "pressed": {
            if (touch?.pressedTarget.id === util.target.id) {
              return returnValue();
            } else break;
          }
          case "contacted": {
            if (util.target.isTouchingPoint(touch.canvasX, touch.canvasY)) {
              return returnValue();
            } else break;
          }
          default:
            return "";
        }
      }
      return "";
    }

    isTouched(_, util) {
      for (const touch of this.ongoingTouches.filter((i) => i?.active)) {
        if (util.target.isTouchingPoint(touch.canvasX, touch.canvasY)) {
          return true;
        }
      }
      return false;
    }

    isTouchingId({ TOUCH }, util) {
      const index = Scratch.Cast.toNumber(TOUCH) - 1;
      const touch = this.ongoingTouches[index];
      if (!touch) return false;
      if (util.target.isTouchingPoint(touch.canvasX, touch.canvasY)) {
        return true;
      } else {
        return false;
      }
    }

    touchProperty({ PROPERTY, TOUCH }, util) {
      const index = Scratch.Cast.toNumber(TOUCH) - 1;
      const touch = this.ongoingTouches[index];
      switch (PROPERTY) {
        case "x position":
          return touch?.x ?? "";
        case "y position":
          return touch?.y ?? "";
        case "distance": {
          if (!touch) return NaN;
          const dx = touch.x - util.target.x;
          const dy = touch.y - util.target.y;
          return Math.sqrt(dx ** 2 + dy ** 2);
        }
        case "initial target":
          return touch?.pressedTarget?.sprite?.name ?? "";
        case "touched target":
          return this.touchedTarget({ TOUCH: TOUCH }, util)?.sprite?.name ?? "";
        default:
          return "";
      }
    }

    isIdTouchingMe({ TOUCH }, util) {
      return this.isTouchingId({ TOUCH: TOUCH }, util);
    }

    touchedTarget({ TOUCH }, util) {
      const index = Scratch.Cast.toNumber(TOUCH) - 1;
      const touch = this.ongoingTouches[index];
      if (!touch) return "";
      return Scratch.vm.runtime.ioDevices.mouse._pickTarget(
        touch.canvasX,
        touch.canvasY,
      );
    }

    isTouchActive({ TOUCH }, util) {
      const index = Scratch.Cast.toNumber(TOUCH) - 1;
      const touch = this.ongoingTouches[index];
      return !!touch?.active;
    }

    wasTouchCanceled({ TOUCH }, util) {
      const index = Scratch.Cast.toNumber(TOUCH) - 1;
      const touch = this.ongoingTouches[index];
      return !!touch?.canceled;
    }

    countTouches() {
      return this.ongoingTouches.filter((i) => i?.active).length;
    }

    goToTouch({ TOUCH }, util) {
      const index = Scratch.Cast.toNumber(TOUCH) - 1;
      const touch = this.ongoingTouches[index];
      if (touch) {
        util.target.setXY(touch.x, touch.y);
      }
    }

    pointTowardsTouch({ TOUCH }, util) {
      const index = Scratch.Cast.toNumber(TOUCH) - 1;
      const touch = this.ongoingTouches[index];
      if (touch) {
        const dx = touch.x - util.target.x;
        const dy = touch.y - util.target.y;
        util.target.setDirection((Math.atan2(dx, dy) * 180) / Math.PI);
      }
    }
  }

  Scratch.extensions.register(new TouchesExtension());
})(Scratch);
