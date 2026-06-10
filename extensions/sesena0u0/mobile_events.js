// Name: Mobile events
// ID: Sesena0u0MobileEvents
// Description: Use swipe, tap event and more in mobile.
// By: Sesena0u0 <https://scratch.mit.edu/users/Sesena0u0/>
// License: MIT
// Version V.1.2.0

(function (Scratch) {
  "use strict";

  const menuIconURI =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iQ2FscXVlXzIiIGRhdGEtbmFtZT0iQ2FscXVlIDIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDU3Ljg2IDQ5LjMiPgogIDxkZWZzPgogICAgPHN0eWxlPgogICAgICAuY2xzLTEgewogICAgICAgIGZvbnQtZmFtaWx5OiBFcmFzSVRDLUJvbGQsICdFcmFzIEJvbGQgSVRDJzsKICAgICAgICBmb250LXNpemU6IDUuN3B4OwogICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7CiAgICAgIH0KCiAgICAgIC5jbHMtMSwgLmNscy0yIHsKICAgICAgICBmaWxsOiAjZmZmOwogICAgICB9CgogICAgICAuY2xzLTMsIC5jbHMtNCwgLmNscy01LCAuY2xzLTIgewogICAgICAgIHN0cm9rZS13aWR0aDogMHB4OwogICAgICB9CgogICAgICAuY2xzLTQgewogICAgICAgIGZpbGw6ICMxZmZmMzQ7CiAgICAgIH0KCiAgICAgIC5jbHMtNSB7CiAgICAgICAgZmlsbDogIzMzMzsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPGcgaWQ9IkNhbHF1ZV8xLTIiIGRhdGEtbmFtZT0iQ2FscXVlIDEiPgogICAgPGc+CiAgICAgIDxnPgogICAgICAgIDxyZWN0IGNsYXNzPSJjbHMtNCIgeD0iLjUiIHk9Ii41IiB3aWR0aD0iNTYuODYiIGhlaWdodD0iNDguMyIgcng9IjE3IiByeT0iMTciLz4KICAgICAgICA8cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik00MC4zNiwxYzkuMSwwLDE2LjUsNy40LDE2LjUsMTYuNXYxNC4zYzAsOS4xLTcuNCwxNi41LTE2LjUsMTYuNWgtMjIuODZjLTkuMSwwLTE2LjUtNy40LTE2LjUtMTYuNXYtMTQuM0MxLDguNCw4LjQsMSwxNy41LDFoMjIuODZNNDAuMzYsMGgtMjIuODZDNy44NCwwLDAsNy44NCwwLDE3LjV2MTQuM2MwLDkuNjYsNy44NCwxNy41LDE3LjUsMTcuNWgyMi44NmM5LjY2LDAsMTcuNS03Ljg0LDE3LjUtMTcuNXYtMTQuM0M1Ny44Niw3Ljg0LDUwLjAyLDAsNDAuMzYsMGgwWiIvPgogICAgICA8L2c+CiAgICAgIDxnPgogICAgICAgIDxyZWN0IGNsYXNzPSJjbHMtNSIgeD0iNi4yMSIgeT0iMy4wMyIgd2lkdGg9IjQ1LjMxIiBoZWlnaHQ9IjQyLjc0IiByeD0iOC43MSIgcnk9IjguNzEiLz4KICAgICAgICA8cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik00Mi44MiwzLjUzYzQuNTMsMCw4LjIxLDMuNjgsOC4yMSw4LjIxdjI1LjMyYzAsNC41My0zLjY4LDguMjEtOC4yMSw4LjIxSDE0LjkyYy00LjUzLDAtOC4yMS0zLjY4LTguMjEtOC4yMVYxMS43NGMwLTQuNTMsMy42OC04LjIxLDguMjEtOC4yMWgyNy44OU00Mi44MiwyLjUzSDE0LjkyYy01LjA5LDAtOS4yMSw0LjEyLTkuMjEsOS4yMXYyNS4zMmMwLDUuMDksNC4xMiw5LjIxLDkuMjEsOS4yMWgyNy44OWM1LjA5LDAsOS4yMS00LjEyLDkuMjEtOS4yMVYxMS43NGMwLTUuMDktNC4xMi05LjIxLTkuMjEtOS4yMWgwWiIvPgogICAgICA8L2c+CiAgICAgIDxnPgogICAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTIyLjc0LDEuNTJjLS4xNCwwLS4yNi0uMTItLjI2LS4yNnMuMTItLjI2LjI2LS4yNmgxMi4zOWMuMTQsMCwuMjYuMTIuMjYuMjZzLS4xMi4yNi0uMjYuMjZoLTEyLjM5WiIvPgogICAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTM1LjEyLjUxaC0xMi4zOWMtLjQyLDAtLjc2LjM0LS43Ni43NnMuMzQuNzYuNzYuNzZoMTIuMzljLjQyLDAsLjc2LS4zNC43Ni0uNzZzLS4zNC0uNzYtLjc2LS43NmgwWiIvPgogICAgICA8L2c+CiAgICAgIDx0ZXh0IGNsYXNzPSJjbHMtMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNy41NyAxOC43OSkgc2NhbGUoMi4xNCAxKSI+PHRzcGFuIHg9IjAiIHk9IjAiPk1vYmlsZTwvdHNwYW4+PHRzcGFuIHg9Ii4wMyIgeT0iNi44NCI+RXZlbnRzPC90c3Bhbj48L3RleHQ+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTEzLjAxLDM0Ljg5YzMuMTQuNDgsOC4yNCwxLjAxLDE0LjM1LjUxLDEwLjQ1LS44NiwxNy4yMi00LjE5LDE5Ljc0LTUuNTYtLjgzLjc2LTYuNiw1Ljg4LTE3Ljk0LDYuODMtNy45OS42Ny0xNC4xNC0xLjEyLTE2LjE1LTEuNzdaIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4=";

  class MobileEvent {
    getInfo() {
      return {
        id: "Sesena0u0MobileEvents",
        name: "Mobile events",
        color1: "#50aa50",
        color2: "#50aa50",
        color3: "#50aa50",
        menuIconURI,
        menus: {
          xOrY: [
            { text: "x", value: "x" },
            { text: "y", value: "y" },
          ],
        },
        blocks: [
          {
            opcode: "checkSwipe",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is swipe detected?",
          },
          {
            opcode: "checkTap",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is tap detected?",
          },
          {
            opcode: "checkLongPress",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is long press detected?",
          },
          {
            opcode: "checkPinchOpen",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is pinch open detected?",
          },
          {
            opcode: "checkPinchClose",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is pinch close detected?",
          },
          {
            opcode: "isLandscape",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is landscape?",
          },
          {
            opcode: "isMobile",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is mobile device?",
          },
          {
            opcode: "isTouchSupported",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is touchscreen supported?",
          },
          "---",
          {
            opcode: "getScreenWidth",
            blockType: Scratch.BlockType.REPORTER,
            text: "screen width",
          },
          {
            opcode: "getScreenHeight",
            blockType: Scratch.BlockType.REPORTER,
            text: "screen height",
          },
          {
            opcode: "getOrientation",
            blockType: Scratch.BlockType.REPORTER,
            text: "device orientation",
          },
          {
            opcode: "getTouchCount",
            blockType: Scratch.BlockType.REPORTER,
            text: "number of touches",
          },
          {
            opcode: "getTouchPosition",
            blockType: Scratch.BlockType.REPORTER,
            text: "position [XY] of touch [T]",
            arguments: {
              T: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              XY: {
                type: Scratch.ArgumentType.STRING,
                menu: "xOrY",
                defaultValue: "x",
              },
            },
          },
          {
            opcode: "getSwipeDirection",
            blockType: Scratch.BlockType.REPORTER,
            text: "swipe direction",
          },
          "---",
          {
            opcode: "whenSwipe",
            blockType: Scratch.BlockType.HAT,
            text: "when swipe",
          },
          {
            opcode: "whenTap",
            blockType: Scratch.BlockType.HAT,
            text: "when tap",
          },
          {
            opcode: "whenLongPress",
            blockType: Scratch.BlockType.HAT,
            text: "when long press",
          },
          {
            opcode: "whenPinchOpen",
            blockType: Scratch.BlockType.HAT,
            text: "when pinch open",
          },
          {
            opcode: "whenPinchClose",
            blockType: Scratch.BlockType.HAT,
            text: "when pinch close",
          },
        ],
      };
    }

    constructor() {
      this.isSwipe = false;
      this.isTap = false;
      this.isLongPress = false;
      this.isPinchOpen = false;
      this.isPinchClose = false;
      this.startX = 0;
      this.startY = 0;
      this.startTime = 0;
      this.startDistances = [];
      this.currentDistances = [];
      this.touchThreshold = 50;
      this.timeThreshold = 300;
      this.longPressThreshold = 500;
      this.touchCount = 0;
      this.swipeDirection = 0;

      document.addEventListener(
        "touchstart",
        (e) => this.handleTouchStart(e),
        false
      );
      document.addEventListener(
        "touchend",
        (e) => this.handleTouchEnd(e),
        false
      );
      document.addEventListener(
        "touchmove",
        (e) => this.handleTouchMove(e),
        false
      );
      window.addEventListener(
        "deviceorientation",
        (e) => this.handleOrientation(e),
        false
      );
    }

    handleTouchStart(e) {
      this.touchCount = e.touches.length;
      this.touchPositions = Array.from(e.touches);
      const touch = e.touches[0];
      this.startX = touch.screenX;
      this.startY = touch.screenY;
      this.startTime = new Date().getTime();
      this.isSwipe = false;
      this.isTap = false;
      this.isLongPress = false;
      this.isPinchOpen = false;
      this.isPinchClose = false;
      this.longPressTimeout = setTimeout(() => {
        this.isLongPress = true;
      }, this.longPressThreshold);

      if (this.touchCount >= 2) {
        this.startDistances = [this.getDistance(e.touches)];
      }
    }

    handleTouchMove(e) {
      this.touchPositions = Array.from(e.touches);

      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const diffX = touch.screenX - this.startX;
        const diffY = touch.screenY - this.startY;
        const diffTime = new Date().getTime() - this.startTime;

        if (diffTime >= this.longPressThreshold) {
          clearTimeout(this.longPressTimeout);
          this.isLongPress = true;
        } else if (
          Math.abs(diffX) > this.touchThreshold ||
          Math.abs(diffY) > this.touchThreshold
        ) {
          clearTimeout(this.longPressTimeout);
        }

        if (e.touches.length >= 2) {
          this.currentDistances = [this.getDistance(e.touches)];
          const distanceDiff =
            this.currentDistances[0] - this.startDistances[0];

          if (distanceDiff > this.touchThreshold) {
            this.isPinchOpen = true;
          } else if (distanceDiff < -this.touchThreshold) {
            this.isPinchClose = true;
          }
        }
      }
    }

    handleTouchEnd(e) {
      clearTimeout(this.longPressTimeout);
      this.touchCount = e.touches.length;
      this.touchPositions = Array.from(e.touches);

      if (this.touchCount === 0) {
        const touch = e.changedTouches[0];
        const diffX = touch.screenX - this.startX;
        const diffY = touch.screenY - this.startY;
        const diffTime = new Date().getTime() - this.startTime;

        if (diffTime < this.timeThreshold) {
          if (
            Math.abs(diffX) > this.touchThreshold ||
            Math.abs(diffY) > this.touchThreshold
          ) {
            this.isSwipe = true;
            this.calculateSwipeDirection(diffX, diffY);
          } else {
            this.isTap = true;
          }
        } else {
          this.isLongPress = false;
        }

        this.startDistances = [];
        this.currentDistances = [];
      }
    }

    handleOrientation(e) {
      this.orientation = {
        alpha: e.alpha,
        beta: e.beta,
        gamma: e.gamma,
      };
    }

    getDistance(touches) {
      const dx = touches[0].screenX - touches[1].screenX;
      const dy = touches[0].screenY - touches[1].screenY;
      return Math.sqrt(dx * dx + dy * dy);
    }

    calculateSwipeDirection(diffX, diffY) {
      let angle = Math.atan2(diffY, diffX);

      angle = angle * (180 / Math.PI);
      angle = (angle + 90) % 360;
      if (angle < 0) {
        angle += 360;
      }

      this.swipeDirection = Math.round(angle);
    }

    checkSwipe() {
      const swipeDetected = this.isSwipe;
      this.isSwipe = false;
      return swipeDetected;
    }

    checkTap() {
      const tapDetected = this.isTap;
      this.isTap = false;
      return tapDetected;
    }

    checkLongPress() {
      const longPressDetected = this.isLongPress;
      this.isLongPress = false;
      return longPressDetected;
    }

    checkPinchOpen() {
      const pinchOpenDetected = this.isPinchOpen;
      this.isPinchOpen = false;
      return pinchOpenDetected;
    }

    checkPinchClose() {
      const pinchCloseDetected = this.isPinchClose;
      this.isPinchClose = false;
      return pinchCloseDetected;
    }

    isMobile() {
      return /Mobi|Android|iPad|iPhone/i.test(navigator.userAgent);
    }

    isTouchSupported() {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }

    getTouchCount() {
      return this.touchCount;
    }

    isLandscape() {
      return window.innerWidth > window.innerHeight;
    }

    getOrientation() {
      return window.orientation || screen.orientation.angle;
    }

    getSwipeDirection() {
      return this.swipeDirection;
    }

    whenSwipe() {
      return this.isSwipe;
    }

    whenTap() {
      return this.isTap;
    }

    whenLongPress() {
      return this.isLongPress;
    }

    whenPinchOpen() {
      return this.isPinchOpen;
    }

    whenPinchClose() {
      return this.isPinchClose;
    }

    getScreenWidth() {
      return window.innerWidth;
    }

    getScreenHeight() {
      return window.innerHeight;
    }

    boundToProjectX(clientX) {
      const bounds = this.getCanvasBounds();
      const min = -Scratch.vm.runtime.stageWidth / 2;
      const max = Scratch.vm.runtime.stageWidth / 2;
      return this.specifiPlace(
        min,
        this.map(clientX, bounds.left, bounds.right, min, max),
        max
      );
    }

    boundToProjectY(clientY) {
      const bounds = this.getCanvasBounds();
      const min = -Scratch.vm.runtime.stageHeight / 2;
      const max = Scratch.vm.runtime.stageHeight / 2;
      return this.specifiPlace(
        min,
        this.map(clientY, bounds.bottom, bounds.top, min, max),
        max
      );
    }

    getCanvasBounds() {
      return document.querySelector("canvas").getBoundingClientRect();
    }

    map(value, inMin, inMax, outMin, outMax) {
      return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
    }

    specifiPlace(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    getTouchPosition(args) {
      const touchIndex = parseInt(args.T) - 1;
      const coordinate = args.XY;

      if (touchIndex < 0 || touchIndex >= this.touchCount) {
        return 0;
      }

      const touch = this.touchPositions[touchIndex];

      if (coordinate === "x") {
        return touch ? Math.round(this.boundToProjectX(touch.clientX)) : 0;
      } else if (coordinate === "y") {
        return touch ? Math.round(this.boundToProjectY(touch.clientY)) : 0;
      }

      return 0;
    }
  }

  Scratch.extensions.register(new MobileEvent());
})(Scratch);
