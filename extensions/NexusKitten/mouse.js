// Name: Mouse Utilities
// ID: nkmouse
// Description: Several blocks for sensing mouse position and state.
// By: NamelessCat <https://scratch.mit.edu/users/NamelessCat/>

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Mouse Utilities must run unsandboxed");
  }

  const icon = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzNC4yIiBoZWlnaHQ9IjM0LjIiIHZpZXdCb3g9IjAsMCwzNC4yLDM0LjIiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMjIuOSwtMTYyLjkpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIyMy40LDE4MGMwLC05LjE2NzkzIDcuNDMyMDcsLTE2LjYgMTYuNiwtMTYuNmM5LjE2NzkzLDAgMTYuNiw3LjQzMjA3IDE2LjYsMTYuNmMwLDkuMTY3OTMgLTcuNDMyMDcsMTYuNiAtMTYuNiwxNi42Yy05LjE2NzkzLDAgLTE2LjYsLTcuNDMyMDcgLTE2LjYsLTE2LjZ6IiBmaWxsPSIjNGNiZmU2IiBzdHJva2U9IiMyZThlYjgiLz48cGF0aCBkPSJNMjQ5LjM2ODgzLDE5MC4wMzY2N2gtMTEuMDAzNzNjLTAuNDY3NDgsMCAtMC44NDY0NCwtMC4zNzg5NiAtMC44NDY0NCwtMC44NDY0NGMwLC0wLjQ2NzQ4IDAuMzc4OTYsLTAuODQ2NDQgMC44NDY0NCwtMC44NDY0NGgxMS4wMDM3M2MyLjE1MTY1LDAgMy4zODU3NiwtMS4xNTcwOCAzLjM4NTc2LC0zLjE3NDE1YzAsLTEuMzAwOTggLTEuMzkwNywtMi43NTA5MyAtMy4zODU3NiwtMi43NTA5M2gtNS45MjUwOWMtMC40Njc0OCwwIC0wLjg0NjQ0LC0wLjM3ODk2IC0wLjg0NjQ0LC0wLjg0NjQ0YzAsLTAuNDY3NDggMC4zNzg5NiwtMC44NDY0NCAwLjg0NjQ0LC0wLjg0NjQ0aDUuOTI1MDljMy4wMzc4OCwwIDUuMDc4NjUsMi4yOTgwOSA1LjA3ODY1LDQuNDQzODFjMCwyLjk1NjYyIC0xLjk5MzM3LDQuODY3MDMgLTUuMDc4NjUsNC44NjcwM3oiIGZpbGw9IiNlYTU5NmUiIHN0cm9rZT0ibm9uZSIvPjxwYXRoIGQ9Ik0yMzMuNDE1OTYsMTg0Ljk1ODAzYy0yLjQxMTUxLDAgLTcuODYzNDQsMCAtNy44NjM0NCwtMS41ODc5MmMwLC0xLjU4NzkyIDUuMTk0NjEsLTcuMTQ1NjUgOC41ODAzNywtNy4xNDU2NWMyLjUzOTMyLDAgMCwzLjU0MjM2IDAsNS45NTQ3MWMwLDIuNDExNTEgMS42OTQ1NywyLjc3ODg3IC0wLjcxNjk0LDIuNzc4ODd6IiBmaWxsPSIjY2NkNmRkIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMjQ0Ljc2MjUsMTg0Ljk1NzE4Yy00LjE2NjE4LDAgLTExLjkxMDI3LDAuMTk2MzcgLTExLjkxMDI3LC0zLjk2OTgxYzAsLTMuMTc1ODUgMS40ODI5NiwtNy4wNDA3IDkuNDIyNTgsLTguNjI4NjJjNC4wODU3NywtMC44MTY4MiA5LjYzMzM0LDAuNjg5IDkuNjMzMzQsNy40Mzc2OGMwLDQuMTY3MDMgLTIuOTc5NDcsNS4xNjA3NSAtNy4xNDU2NSw1LjE2MDc1eiIgZmlsbD0iI2NjZDZkZCIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTI0NS4xMzY2MywxODQuOTU4MDNoLTExLjQ5MDQzbC0yLjk4ODc4LC00Ljc2NDYybDE0LjQ3OTIyLC0xLjU4NzA4ek0yMzQuNTIyMjYsMTc4LjE4NjVjLTIuMDg0NzgsMCAtMy43NzUxMywtMS44NDAxNiAtMy43NzUxMywtNC4xMTExNmMwLC0yLjI3MSAxLjY5MDM0LC00LjExMTE2IDMuNzc1MTMsLTQuMTEyMDFjMi4wODMwOSwwIDMuNzczNDMsMS44NDEwMSAzLjc3MzQzLDQuMTEyMDFjMCwyLjI3MSAtMS42OTAzNCw0LjExMTE2IC0zLjc3MzQzLDQuMTExMTZ6IiBmaWxsPSIjY2NkNmRkIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMjM2LjEzODk2LDE3NC41MzI0MmMwLDEuNTEzNDQgLTAuOTY1NzksMi43NDE2MiAtMi4xNTY3MywyLjc0MTYyYy0xLjE5MTc5LDAgLTIuMTU2NzMsLTEuMjI4MTkgLTIuMTU2NzMsLTIuNzQxNjJjMCwtMS41MTM0NCAwLjk2NDk0LC0yLjc0MDc4IDIuMTU2NzMsLTIuNzQwNzhjMS4xOTA5NCwtMC4wMDA4NSAyLjE1NjczLDEuMjI2NDkgMi4xNTY3MywyLjc0MDc4eiIgZmlsbD0iI2Y0YWJiYSIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTIyOS45MDA2OSwxODAuMzAyNmMwLC0wLjcwMTIxIDAuNTY4NDUsLTEuMjY5NjYgMS4yNjk2NiwtMS4yNjk2NmMwLjcwMTIxLDAgMS4yNjk2NiwwLjU2ODQ1IDEuMjY5NjYsMS4yNjk2NmMwLDAuNzAxMjEgLTAuNTY4NDUsMS4yNjk2NiAtMS4yNjk2NiwxLjI2OTY2Yy0wLjcwMTIxLDAgLTEuMjY5NjYsLTAuNTY4NDUgLTEuMjY5NjYsLTEuMjY5NjZ6IiBmaWxsPSIjZGQyZTQ0IiBzdHJva2U9Im5vbmUiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoxNy4xMDAwMDAwMDAwMDAwNToxNy4xMDAwMDAwMDAwMDAwMjMtLT4=";

  const canvas = Scratch.renderer.canvas;
  const vm = Scratch.vm;

  var buttondown = [];
  var contextMenu = true;
  var cps = 0;
  var xold, yold, xnew, ynew, lastx, lasty, scrollvel, buttonclicked, globalx, globaly;

  vm.runtime.on("AFTER_EXECUTE", () => {
    scrollvel = 0;
    buttonclicked = undefined;
    xold = xnew;
    yold = ynew;
    xnew = vm.runtime.ioDevices.mouse.getScratchX();
    ynew = vm.runtime.ioDevices.mouse.getScratchY();

    if (buttondown[buttondown.length - 1] == 0) {
      lastx = vm.runtime.ioDevices.mouse.getScratchX();
      lasty = vm.runtime.ioDevices.mouse.getScratchY();
    }
  });

  setInterval(function () {
    cps = 0;
  }, 1000);

  window.addEventListener("wheel", event => {
    scrollvel = event.deltaY * -1;
  });

  window.addEventListener("mousemove", event => {
    globalx = event.clientX;
    // I decided to invert the Y axis to parody the Scratch coordinate grid... should hopefully eliviate some errors.
    globaly = -event.clientY;
  });

  window.addEventListener("mousedown", event => {
    // If this is a lot to swallow, it essentially converts the buttons pressed to binary and sorts them in an array.
    buttondown = Array.from(String(parseInt(event.buttons, 10).toString(2)));
  });

  window.addEventListener("mouseup", event => {
    // We aren"t able to apply the same technique here as in "mousedown", as event.buttons only reports keys that are down.
    buttonclicked = event.button;
    buttondown = Array.from(String(parseInt(event.buttons, 10).toString(2)));
    if (buttonclicked == 0) {
      cps++;
    }
  });

  canvas.addEventListener("contextmenu", event => {
    if (!contextMenu) {
      event.preventDefault();
    }
  });

  class nkmouse {
    getInfo() {
      return {
        id: "nkmouse",
        name: "Mouse Utilities",
        color1: "#5cb1d6",
        color2: "#3ba2ce",
        color3: "#2e8eb8",
        menuIconURI: icon,
        blocks: [
          {
            opcode: "buttondown",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "button [BUTTON] down?",
            arguments: {
              BUTTON: {
                type: Scratch.ArgumentType.STRING,
                menu: "BUTTONS"
              }
            }
          },
          {
            opcode: "buttonclicked",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "button [BUTTON] clicked?",
            arguments: {
              BUTTON: {
                type: Scratch.ArgumentType.STRING,
                menu: "BUTTON"
              }
            }
          },
          "---",
          {
            opcode: "mousespeedx",
            blockType: Scratch.BlockType.REPORTER,
            text: "mouse x speed",
          },
          {
            opcode: "mousespeedy",
            blockType: Scratch.BlockType.REPORTER,
            text: "mouse y speed",
          },
          {
            opcode: "mousevelocity",
            blockType: Scratch.BlockType.REPORTER,
            text: "mouse velocity",
          },
          "---",
          {
            opcode: "scroll",
            blockType: Scratch.BlockType.REPORTER,
            text: "scroll wheel velocity",
          },
          "---",
          {
            opcode: "globalXY",
            blockType: Scratch.BlockType.REPORTER,
            text: "global mouse [WHAT]",
            arguments: {
              WHAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "XY"
              }
            }
          },
          {
            opcode: "uplast",
            blockType: Scratch.BlockType.REPORTER,
            text: "mouse [WHAT] of last mouse up",
            disableMonitor: true,
            arguments: {
              WHAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "XY"
              }
            }
          },
          "---",
          {
            opcode: "contextOff",
            blockType: Scratch.BlockType.COMMAND,
            text: "canvas context menu [WHAT]",
            arguments: {
              WHAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "TOGGLE"
              }
            }
          },
          "---",
          {
            opcode: "cps",
            blockType: Scratch.BlockType.REPORTER,
            text: "clicks per second"
          }
        ],
        menus: {
          BUTTONS: {
            acceptReporters: true,
            items: [{
              text: "left button (0)",
              value: "0"
            }, {
              text: "right button (1)",
              value: "1"
            }, {
              text: "middle button (2)",
              value: "2"
            }, {
              text: "x1 (3)",
              value: "3"
            }, {
              text: "x2 (4)",
              value: "4"
            }]
          },
          // Due to the way the WebAPI works, we need 2 menus for mouse down and mouse clicked.
          BUTTON: {
            acceptReporters: true,
            items: [{
              text: "left button (0)",
              value: "0"
            }, {
              text: "middle button (1)",
              value: "1"
            }, {
              text: "right button (2)",
              value: "2"
            }, {
              text: "x1 (3)",
              value: "3"
            }, {
              text: "x2 (4)",
              value: "4"
            }]
          },
          WHERE: {
            acceptReporters: true,
            items: ["page", "screen"]
          },
          XY: {
            acceptReporters: true,
            items: ["x", "y"]
          },
          TOGGLE: {
            acceptReporters: true,
            items: [{
              text: "enabled",
              value: "true"
            }, {
              text: "disable",
              value: "false"
            }]
          }
        }
      };
    }

    buttondown(args) {
      return (buttondown[buttondown.length - args.BUTTON - 1] || 0) == 1;
    }

    buttonclicked(args) {
      return buttonclicked == args.BUTTON;
    }

    mousespeedx() {
      return xnew - xold;
    }

    mousespeedy() {
      return ynew - yold;
    }

    mousevelocity() {
      // Shoutout to Pythagoras!
      return Math.sqrt(((ynew - yold) ** 2) + ((xnew - xold) ** 2));
    }

    scroll() {
      return scrollvel;
    }

    globalXY(args) {
      if (args.WHAT === "x") {
        return globalx;
      } else {
        return globaly;
      }
    }

    uplast(args) {
      if (args.WHAT === "x") {
        return lastx;
      } else {
        return lasty;
      }
    }

    contextOff(args) {
      contextMenu = (args.WHAT === "true");
    }

    cps() {
      return cps;
    }

  }
  Scratch.extensions.register(new nkmouse());
})(Scratch);
