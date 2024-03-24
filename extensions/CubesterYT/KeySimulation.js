// Name: Key Simulation
// ID: cubesterKeySimulation
// Description: Simulate key presses and mouse clicks.
// By: CubesterYT <https://scratch.mit.edu/users/CubesterYT/>
// License: MIT AND MPL-2.0

(function (Scratch) {
  "use strict";

  const icon =
    "data:image/png;base64,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";

  // This is from the Scratch Addons gamepad addon, which normally could be a problem because it is GPLv3,
  // but I (GarboMuffin) wrote that code so there is no problem.
  let getCanvasSize;
  if (window.ResizeObserver) {
    let canvasWidth = Scratch.vm.runtime.stageWidth;
    let canvasHeight = Scratch.vm.runtime.stageHeight;
    const resize = new ResizeObserver((entries) => {
      for (const entry of entries) {
        canvasWidth = entry.contentRect.width;
        canvasHeight = entry.contentRect.height;
      }
    });
    resize.observe(Scratch.vm.runtime.renderer.canvas);
    getCanvasSize = () => [canvasWidth, canvasHeight];
  } else {
    getCanvasSize = () => {
      const rectangle =
        Scratch.vm.runtime.renderer.canvas.getBoundingClientRect();
      return [rectangle.width, rectangle.height];
    };
  }

  let simulatedX = 0;
  let simulatedY = 0;
  const postMouseData = (data) => {
    const [rectangleWidth, rectangleHeight] = getCanvasSize();
    Scratch.vm.postIOData("mouse", {
      ...data,
      canvasWidth: rectangleWidth,
      canvasHeight: rectangleHeight,
      x:
        (simulatedX + Scratch.vm.runtime.stageWidth / 2) *
        (rectangleWidth / Scratch.vm.runtime.stageWidth),
      y:
        (Scratch.vm.runtime.stageHeight / 2 - simulatedY) *
        (rectangleHeight / Scratch.vm.runtime.stageHeight),
    });
  };

  /**
   * @param {unknown} seconds
   * @param {unknown} andWait
   * @param {() => void} callback
   * @returns {Promise<void>|void}
   */
  const doLater = (seconds, andWait, callback) => {
    const ms = Scratch.Cast.toNumber(seconds) * 1000;

    if (Scratch.Cast.toString(andWait) === "and wait") {
      return new Promise((resolve) => {
        setTimeout(() => {
          callback();
          resolve();
        }, ms);
      });
    }

    setTimeout(callback, ms);
    // don't return a Promise at all, otherwise the block waits for 1 frame
  };

  class KeySimulation {
    getInfo() {
      return {
        id: "cubesterKeySimulation",
        name: Scratch.translate("Key Simulation"),
        color1: "#BF0000",
        color2: "#800000",
        menuIconURI: icon,
        docsURI: "https://extensions.turbowarp.org/CubesterYT/KeySimulation",

        blocks: [
          {
            opcode: "pressKey",
            text: Scratch.translate(
              "press [KEY] for [SECONDS] seconds [AND_WAIT]"
            ),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                menu: "KEYS",
              },
              SECONDS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0.1",
              },
              AND_WAIT: {
                type: Scratch.ArgumentType.STRING,
                menu: "AND_WAIT",
              },
            },
          },
          {
            opcode: "clickMouse",
            text: Scratch.translate(
              "click [BUTTON] mouse button at x: [X] y: [Y] for [SECONDS] seconds [AND_WAIT]"
            ),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              BUTTON: {
                type: Scratch.ArgumentType.STRING,
                menu: "BUTTONS",
              },
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              SECONDS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0.1",
              },
              AND_WAIT: {
                type: Scratch.ArgumentType.STRING,
                menu: "AND_WAIT",
              },
            },
          },
          {
            opcode: "moveMouse",
            text: Scratch.translate("move mouse to x: [X] y: [Y]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
        ],
        menus: {
          KEYS: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate({
                  default: "space",
                  description: "Refers to the space key",
                }),
                value: " ",
              },
              { text: Scratch.translate("up arrow"), value: "ArrowUp" },
              { text: Scratch.translate("down arrow"), value: "ArrowDown" },
              { text: Scratch.translate("right arrow"), value: "ArrowRight" },
              { text: Scratch.translate("left arrow"), value: "ArrowLeft" },
              { text: Scratch.translate("enter"), value: "Enter" },
              { text: Scratch.translate("backspace"), value: "Backspace" },
              { text: Scratch.translate("delete"), value: "Delete" },
              { text: Scratch.translate("shift"), value: "Shift" },
              { text: Scratch.translate("caps lock"), value: "CapsLock" },
              { text: Scratch.translate("scroll lock"), value: "ScrollLock" },
              { text: Scratch.translate("control"), value: "Control" },
              { text: Scratch.translate("escape"), value: "Escape" },
              { text: Scratch.translate("insert"), value: "Insert" },
              { text: Scratch.translate("home"), value: "Home" },
              { text: Scratch.translate("end"), value: "End" },
              { text: Scratch.translate("page up"), value: "PageUp" },
              { text: Scratch.translate("page down"), value: "PageDown" },
              "a",
              "b",
              "c",
              "d",
              "e",
              "f",
              "g",
              "h",
              "i",
              "j",
              "k",
              "l",
              "m",
              "n",
              "o",
              "p",
              "q",
              "r",
              "s",
              "t",
              "u",
              "v",
              "w",
              "x",
              "y",
              "z",
              "0",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "-",
              ",",
              ".",
              "`",
              "=",
              "[",
              "]",
              "\\",
              ";",
              "'",
              "/",
              "~",
              "+",
              "!",
              ":",
              "*",
              "#",
              "(",
              ")",
              "?",
              "<",
              ">",
              "@",
              '"',
            ],
          },
          BUTTONS: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("left"), value: "0" },
              { text: Scratch.translate("middle"), value: "1" },
              { text: Scratch.translate("right"), value: "2" },
            ],
          },
          AND_WAIT: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("without waiting"),
                value: "without waiting",
              },
              {
                text: Scratch.translate("and wait"),
                value: "and wait",
              },
            ],
          },
        },
      };
    }

    pressKey(args) {
      Scratch.vm.postIOData("keyboard", {
        key: Scratch.Cast.toString(args.KEY),
        isDown: true,
      });

      return doLater(args.SECONDS, args.AND_WAIT, () => {
        Scratch.vm.postIOData("keyboard", {
          key: Scratch.Cast.toString(args.KEY),
          isDown: false,
        });
      });
    }

    clickMouse(args) {
      simulatedX = Scratch.Cast.toNumber(args.X);
      simulatedY = Scratch.Cast.toNumber(args.Y);
      postMouseData({
        isDown: true,
        button: Scratch.Cast.toNumber(args.BUTTON),
      });

      return doLater(args.SECONDS, args.AND_WAIT, () => {
        postMouseData({
          isDown: false,
          button: Scratch.Cast.toNumber(args.BUTTON),
        });
      });
    }

    moveMouse(args) {
      simulatedX = Scratch.Cast.toNumber(args.X);
      simulatedY = Scratch.Cast.toNumber(args.Y);
      postMouseData({});
    }
  }

  Scratch.extensions.register(new KeySimulation());
})(Scratch);
