// Name: Key Simulation
// ID: cubesterKeySimulation
// Description: Simulate key presses and mouse clicks.
// By: CubesterYT <https://scratch.mit.edu/users/CubesterYT/>
// License: MIT AND MPL-2.0

(function (Scratch) {
  "use strict";

  const icon = `data:image/svg+xml;,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="64.412" height="64.412"><g stroke-miterlimit="10" data-paper-data="{&quot;isPaintingLayer&quot;:true}" style="mix-blend-mode:normal"><path fill="#bf0000" stroke="maroon" stroke-width="3.5" d="M1.75 32.206c0-16.82 13.636-30.456 30.456-30.456s30.456 13.636 30.456 30.456-13.636 30.456-30.456 30.456S1.75 49.026 1.75 32.206z"/><path fill="none" d="M.066 64.346V.066h64.28v64.28z"/><path fill="#fff" d="M17.988 33.804c-2.648 0-4.768-2.03-4.795-4.795-.136-13.804 5.217-13.443 11.823-13.618 2.547-.067 9.038 0 13.68 0 6.427 0 12.15.676 12.523 13.618.05 1.697-2.146 4.795-4.795 4.795zM20.254 49.022c-2.743 0-4.966-2.147-4.966-4.795l-2.096-9.435c0-.368 2.223 2.526 4.965 2.526h28.097c2.743 0 4.966-3.374 4.966-3.126l-2.096 10.035c0 2.648-2.223 4.795-4.966 4.795z"/><path fill="#bf0000" fill-rule="evenodd" d="M25.604 25.55h3.199l1.374-6.151c.148-.705 1.208-1.202 2.36-1.098.93.08 1.655.543 1.768 1.098l1.374 6.15h3.125c.89 0 1.32.66.705 1.04l-6.598 4.116c-.39.231-1.024.231-1.394 0l-6.62-4.115c-.613-.382-.167-1.04.707-1.04"/></g></svg>`)}`;

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
