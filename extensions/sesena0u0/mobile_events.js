// Name: Mobile events
// ID: Sesena0u0MobileEvents
// Description: Use swipe, click event and more in mobile.
// By: Sesena0u0 <https://scratch.mit.edu/users/Sesena0u0/>
// License: MIT
// Version V.1.0.0

(function (Scratch) {
  "use strict";

  const menuIconURI = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iQ2FscXVlXzIiIGRhdGEtbmFtZT0iQ2FscXVlIDIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDU3Ljg2IDQ5LjMiPgogIDxkZWZzPgogICAgPHN0eWxlPgogICAgICAuY2xzLTEgewogICAgICAgIGZvbnQtZmFtaWx5OiBFcmFzSVRDLUJvbGQsICdFcmFzIEJvbGQgSVRDJzsKICAgICAgICBmb250LXNpemU6IDUuN3B4OwogICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7CiAgICAgIH0KCiAgICAgIC5jbHMtMSwgLmNscy0yIHsKICAgICAgICBmaWxsOiAjZmZmOwogICAgICB9CgogICAgICAuY2xzLTMsIC5jbHMtNCwgLmNscy01LCAuY2xzLTIgewogICAgICAgIHN0cm9rZS13aWR0aDogMHB4OwogICAgICB9CgogICAgICAuY2xzLTQgewogICAgICAgIGZpbGw6ICMxZmZmMzQ7CiAgICAgIH0KCiAgICAgIC5jbHMtNSB7CiAgICAgICAgZmlsbDogIzMzMzsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPGcgaWQ9IkNhbHF1ZV8xLTIiIGRhdGEtbmFtZT0iQ2FscXVlIDEiPgogICAgPGc+CiAgICAgIDxnPgogICAgICAgIDxyZWN0IGNsYXNzPSJjbHMtNCIgeD0iLjUiIHk9Ii41IiB3aWR0aD0iNTYuODYiIGhlaWdodD0iNDguMyIgcng9IjE3IiByeT0iMTciLz4KICAgICAgICA8cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik00MC4zNiwxYzkuMSwwLDE2LjUsNy40LDE2LjUsMTYuNXYxNC4zYzAsOS4xLTcuNCwxNi41LTE2LjUsMTYuNWgtMjIuODZjLTkuMSwwLTE2LjUtNy40LTE2LjUtMTYuNXYtMTQuM0MxLDguNCw4LjQsMSwxNy41LDFoMjIuODZNNDAuMzYsMGgtMjIuODZDNy44NCwwLDAsNy44NCwwLDE3LjV2MTQuM2MwLDkuNjYsNy44NCwxNy41LDE3LjUsMTcuNWgyMi44NmM5LjY2LDAsMTcuNS03Ljg0LDE3LjUtMTcuNXYtMTQuM0M1Ny44Niw3Ljg0LDUwLjAyLDAsNDAuMzYsMGgwWiIvPgogICAgICA8L2c+CiAgICAgIDxnPgogICAgICAgIDxyZWN0IGNsYXNzPSJjbHMtNSIgeD0iNi4yMSIgeT0iMy4wMyIgd2lkdGg9IjQ1LjMxIiBoZWlnaHQ9IjQyLjc0IiByeD0iOC43MSIgcnk9IjguNzEiLz4KICAgICAgICA8cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik00Mi44MiwzLjUzYzQuNTMsMCw4LjIxLDMuNjgsOC4yMSw4LjIxdjI1LjMyYzAsNC41My0zLjY4LDguMjEtOC4yMSw4LjIxSDE0LjkyYy00LjUzLDAtOC4yMS0zLjY4LTguMjEtOC4yMVYxMS43NGMwLTQuNTMsMy42OC04LjIxLDguMjEtOC4yMWgyNy44OU00Mi44MiwyLjUzSDE0LjkyYy01LjA5LDAtOS4yMSw0LjEyLTkuMjEsOS4yMXYyNS4zMmMwLDUuMDksNC4xMiw5LjIxLDkuMjEsOS4yMWgyNy44OWM1LjA5LDAsOS4yMS00LjEyLDkuMjEtOS4yMVYxMS43NGMwLTUuMDktNC4xMi05LjIxLTkuMjEtOS4yMWgwWiIvPgogICAgICA8L2c+CiAgICAgIDxnPgogICAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTIyLjc0LDEuNTJjLS4xNCwwLS4yNi0uMTItLjI2LS4yNnMuMTItLjI2LjI2LS4yNmgxMi4zOWMuMTQsMCwuMjYuMTIuMjYuMjZzLS4xMi4yNi0uMjYuMjZoLTEyLjM5WiIvPgogICAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTM1LjEyLjUxaC0xMi4zOWMtLjQyLDAtLjc2LjM0LS43Ni43NnMuMzQuNzYuNzYuNzZoMTIuMzljLjQyLDAsLjc2LS4zNC43Ni0uNzZzLS4zNC0uNzYtLjc2LS43NmgwWiIvPgogICAgICA8L2c+CiAgICAgIDx0ZXh0IGNsYXNzPSJjbHMtMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNy41NyAxOC43OSkgc2NhbGUoMi4xNCAxKSI+PHRzcGFuIHg9IjAiIHk9IjAiPk1vYmlsZTwvdHNwYW4+PHRzcGFuIHg9Ii4wMyIgeT0iNi44NCI+RXZlbnRzPC90c3Bhbj48L3RleHQ+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTEzLjAxLDM0Ljg5YzMuMTQuNDgsOC4yNCwxLjAxLDE0LjM1LjUxLDEwLjQ1LS44NiwxNy4yMi00LjE5LDE5Ljc0LTUuNTYtLjgzLjc2LTYuNiw1Ljg4LTE3Ljk0LDYuODMtNy45OS42Ny0xNC4xNC0xLjEyLTE2LjE1LTEuNzdaIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4=";

  class MobileEvent {
    getInfo() {
      return {
        id: "Sesena0u0MobileEvents",
        name: "Mobile events",
        color1: "#50aa50",
        color2: "#50aa50",
        color3: "#50aa50",
        menuIconURI,
        blocks: [
          {
            opcode: "checkSwipe",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is swipe detected?",
          },
          {
            opcode: "checkClick",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is click detected?",
          },
          {
            opcode: "isMobile",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is mobile device?",
          },
          {
            opcode: "getTouchCount",
            blockType: Scratch.BlockType.REPORTER,
            text: "number of touches",
          },
          {
            opcode: "isLandscape",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is landscape?",
          },
          {
            opcode: "getOrientation",
            blockType: Scratch.BlockType.REPORTER,
            text: "device orientation",
          }
        ],
      };
    }

    constructor() {
      this.isSwipe = false;
      this.isClick = false;
      this.startX = 0;
      this.startY = 0;
      this.startTime = 0;
      this.touchThreshold = 50;
      this.timeThreshold = 300;
      this.touchCount = 0;

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
      window.addEventListener(
        "deviceorientation",
        (e) => this.handleOrientation(e),
        false
      );
    }

    handleTouchStart(e) {
      this.touchCount = e.touches.length;
      const touch = e.touches[0];
      this.startX = touch.screenX;
      this.startY = touch.screenY;
      this.startTime = new Date().getTime();
      this.isSwipe = false;
      this.isClick = false;
    }

    handleTouchEnd(e) {
      this.touchCount = e.touches.length;
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
        } else {
          this.isClick = true;
        }
      }
    }

    handleOrientation(e) {
      this.orientation = e.alpha;
    }

    checkSwipe() {
      const swipeDetected = this.isSwipe;
      this.isSwipe = false;
      return swipeDetected;
    }

    checkClick() {
      const clickDetected = this.isClick;
      this.isClick = false;
      return clickDetected;
    }

    isMobile() {
      return /Mobi|Android/i.test(navigator.userAgent);
    }

    getTouchCount() {
      return this.touchCount;
    }

    isLandscape() {
      return window.innerWidth > window.innerHeight;
    }

    getOrientation() {
      return window.orientation || screen.orientation.angle || "unknown";
    }

  }

  Scratch.extensions.register(new MobileEvent());
})(Scratch);
