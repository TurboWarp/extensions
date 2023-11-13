// Name: Window Controls
// ID: cubesterWindowControls
// Description: Move, resize, rename the window, enter fullscreen, get screen size, and more.
// By: CubesterYT <https://scratch.mit.edu/users/CubesterYT/>
// Original: BlueDome77

// Version V.1.0.0

(function (Scratch) {
  "use strict";

  const icon =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAA0GVYSWZJSSoACAAAAAoAAAEEAAEAAABAAAAAAQEEAAEAAABAAAAAAgEDAAMAAACGAAAAEgEDAAEAAAABAAAAGgEFAAEAAACMAAAAGwEFAAEAAACUAAAAKAEDAAEAAAACAAAAMQECAA0AAACcAAAAMgECABQAAACqAAAAaYcEAAEAAAC+AAAAAAAAAAgACAAIAEgAAAABAAAASAAAAAEAAABHSU1QIDIuMTAuMzQAADIwMjM6MDg6MTUgMjI6MjU6MTcAAQABoAMAAQAAAAEAAAAAAAAA+Kkp0wAAAYRpQ0NQSUNDIHByb2ZpbGUAAHicfZE9SMNAHMVfW6VFKgp2KOKQoTpZKCriqFUoQoVQK7TqYHLpFzRpSFJcHAXXgoMfi1UHF2ddHVwFQfADxNXFSdFFSvxfUmgR48FxP97de9y9A/zNKlPNngSgapaRSSWFXH5VCL4ihEEEEEVCYqY+J4ppeI6ve/j4ehfnWd7n/hz9SsFkgE8gnmW6YRFvEE9vWjrnfeIIK0sK8TnxuEEXJH7kuuzyG+eSw36eGTGymXniCLFQ6mK5i1nZUImniGOKqlG+P+eywnmLs1qts/Y9+QvDBW1lmes0R5DCIpYgQoCMOiqowkKcVo0UExnaT3r4hx2/SC6ZXBUwciygBhWS4wf/g9/dmsXJCTcpnAR6X2z7YxQI7gKthm1/H9t26wQIPANXWsdfawIzn6Q3OlrsCBjYBi6uO5q8B1zuANEnXTIkRwrQ9BeLwPsZfVMeGLoF+tbc3tr7OH0AstRV+gY4OATGSpS97vHuUHdv/55p9/cDaOdyoyaJtEEAAA14aVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOmVkNmVmMzUwLWVjZDAtNGIwZC1iZjVlLTUxOTVkZjI4YzRhYiIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmN2Y5ODViOC0yMjg3LTQxNmQtOTFjMC0zNTY3ZmQ1ZjhmMjAiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplMzk3YTJiMC0zNDJjLTQ3MWMtYmQzNi0wNjExMTI2MDQwZmEiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJMaW51eCIKICAgR0lNUDpUaW1lU3RhbXA9IjE2OTIxNTYzMTc3MjY0NjciCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zNCIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjM6MDg6MTVUMjI6MjU6MTctMDU6MDAiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDIzOjA4OjE1VDIyOjI1OjE3LTA1OjAwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MzlmYmE1ZjAtZmE4OC00M2ZjLTgyMjQtMGIwYjlhMGRkZDkyIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKExpbnV4KSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMy0wOC0xNVQyMjoyNToxNy0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz45jkSCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5wgQAxkRVAqqdwAAAchQTFRFAAAAGn+yG4CyHICzHX2yHYC1GoC0Gn+yGn+zGoCzG3+zG3+0G4CzHICzHIC0HIGzG3+zG4CzG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zHIC0HIC0G3+zHIC0G3+zG3+zHoK2IIS5IYW5I4e8JIi9JYm+Jou/JovAJ4zBKpDFLJLHLpXKMJjNMZnOMZnPMpnPM5vQM5vRNJzSNJ3TNZ7UNp/UN5/UOJ/UOZ/VO6DVPqHVQ6HVRqLWR6PWSKPWSaPWX6rYbK/abq/ab7DadrPbd7Pce7Tcgbfdgbjdgrjdhrrfh7rfibvfirzfi7zfjLzfjLzgjb3gjr3gjr7gj77gkL7gkb/glMDhnMTjncTjoMfkosfko8jkpMjlpcnlsc/ns9HotNHoutXqvtbrv9frwNfswNjsxNrtzN/vzd/vzeDvzeDwzuDwzuHw0eLw0uPx1uXy2Oby2Ofy2efz2+jz3ur04u324+725O727vT57/X68Pb68fb68vb78vf78/f68/f79vn8+fv9+/z+/P3+/f7+////xM3NqwAAADF0Uk5TAAEBAQEBAgMDAwMDAwMDAwgIEBEcJjlUXV5panOEhY2Qra6vt8bO2Nri4+zx9PT8/cI6cjwAAAABYktHRJfmbhuvAAAC10lEQVRYw7WX51/TUBSGr4KIiIoILaMT6LDL7pG2oSPHDW4FBwpO3CiCigP3QgUB77/rbdOkCaTkpsH3Qz7c5Dy/JPeec96DUA11GM12p8cfDPo9TrvZ2IG0aIvB6grFmQxb4AC4Apth4iGX1bCNMrzd5I4wLKwRy0TcpnaK8H0WXzILisomfRY1xM4ebyoPNZVPeXubNorvdEQHYUMNRh2dteO7AmlQVTrQXSN8ty2cAwrlwrZmpfi2vlgRqFSM9bcpxA8kOKAUlxhYR2juS4AGJfpb1wBsMQ6G7r94S6FX904AF7PJ47vDRZj4hSn1cxyK4S7Z/gdyML6CqbUyDrmA5Dy0OtIwtIDx6vyTx6qaml/FeGEI0o7qZvZEAe6S+DG6P3iFECYBor1i/njJ+Z3B+B3tHnzAeJqcaq+QWZYUlAEzABc+vxk+/vzLJbjz7emhmgD+WUhZKvnvy4uLnzB+dAvjr0e+Y3xODZD38a9gSlYXn+G/l8+u4JcHP+I/p9QAkDSV4re6s9XFw9fOA5y5eQxO3j4NqoCsu5EADBHZIo3EZyMGArAywuLsUUrNCgDGSgAuVgAsL1a0xF/lEm8uLS4LANZF6n9IfC0tqnxuqAMZ43oAcSMyMyJg7uIo0QjRqIJGqpoTAYwZ2TNQ/y5Axo6crB4A60Segh5AwYP8nB4A50dB0AOAA3oBQf2foPsn6t5G3QdJcpTrAJCjLEmmOgAkmSTpXAeApLOkoGgHlAqKpKRpB5RLmu6i2igt69oAfFmXNRZtAL6xyFqbJoDQ2qTNVRNAaK58e5/G+H297b1sMCbpDcbVtQYDNYsWZ4rS4vwoWZwmucma0GKyxuQmi7d516lt3u8bxOZ1rzeaww+pjObrBwpGE+3QanW3b7bZ1mb3+/YqDQwt9ANHi76Rp+v/DV0I7VId+3r2qM2t+gbPTRh9S2pQHr4bNE3w1fF//4bj/z8IjCsoNvb7bgAAAABJRU5ErkJggg==";

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  class WindowControls {
    getInfo() {
      return {
        id: "cubesterWindowControls",
        name: "Window Controls",
        color1: "#359ed4",
        color2: "#298ec2",
        color3: "#2081b3",
        menuIconURI: icon,
        docsURI: "https://extensions.turbowarp.org/CubesterYT/WindowControls",

        blocks: [
          {
            blockType: "label",
            text: "May not work in normal browser tabs",
          },
          {
            blockType: "label",
            text: "Refer to Documentation for details",
          },
          {
            opcode: "moveTo",
            blockType: Scratch.BlockType.COMMAND,
            text: "move window to x: [X] y: [Y]",
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
          {
            opcode: "moveToPresets",
            blockType: Scratch.BlockType.COMMAND,
            text: "move window to the [PRESETS]",
            arguments: {
              PRESETS: {
                type: Scratch.ArgumentType.STRING,
                menu: "MOVE",
              },
            },
          },
          {
            opcode: "changeX",
            blockType: Scratch.BlockType.COMMAND,
            text: "change window x by [X]",
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "50",
              },
            },
          },
          {
            opcode: "setX",
            blockType: Scratch.BlockType.COMMAND,
            text: "set window x to [X]",
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
            },
          },
          {
            opcode: "changeY",
            blockType: Scratch.BlockType.COMMAND,
            text: "change window y by [Y]",
            arguments: {
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "50",
              },
            },
          },
          {
            opcode: "setY",
            blockType: Scratch.BlockType.COMMAND,
            text: "set window y to [Y]",
            arguments: {
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
            },
          },
          {
            opcode: "windowX",
            blockType: Scratch.BlockType.REPORTER,
            text: "window x",
          },
          {
            opcode: "windowY",
            blockType: Scratch.BlockType.REPORTER,
            text: "window y",
          },

          "---",

          {
            opcode: "resizeTo",
            blockType: Scratch.BlockType.COMMAND,
            text: "resize window to width: [W] height: [H]",
            arguments: {
              W: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "480",
              },
              H: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "360",
              },
            },
          },
          {
            opcode: "resizeToPresets",
            blockType: Scratch.BlockType.COMMAND,
            text: "resize window to [PRESETS]",
            arguments: {
              PRESETS: {
                type: Scratch.ArgumentType.STRING,
                menu: "RESIZE",
              },
            },
          },
          {
            opcode: "changeW",
            blockType: Scratch.BlockType.COMMAND,
            text: "change window width by [W]",
            arguments: {
              W: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "50",
              },
            },
          },
          {
            opcode: "setW",
            blockType: Scratch.BlockType.COMMAND,
            text: "set window width to [W]",
            arguments: {
              W: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1000",
              },
            },
          },
          {
            opcode: "changeH",
            blockType: Scratch.BlockType.COMMAND,
            text: "change window height by [H]",
            arguments: {
              H: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "50",
              },
            },
          },
          {
            opcode: "setH",
            blockType: Scratch.BlockType.COMMAND,
            text: "set window height to [H]",
            arguments: {
              H: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1000",
              },
            },
          },
          {
            opcode: "matchStageSize",
            blockType: Scratch.BlockType.COMMAND,
            text: "match stage size",
          },
          {
            opcode: "windowW",
            blockType: Scratch.BlockType.REPORTER,
            text: "window width",
          },
          {
            opcode: "windowH",
            blockType: Scratch.BlockType.REPORTER,
            text: "window height",
          },

          "---",

          {
            opcode: "isTouchingEdge",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is window touching screen edge?",
          },
          {
            opcode: "screenW",
            blockType: Scratch.BlockType.REPORTER,
            text: "screen width",
          },
          {
            opcode: "screenH",
            blockType: Scratch.BlockType.REPORTER,
            text: "screen height",
          },

          "---",

          {
            opcode: "isFocused",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is window focused?",
          },

          "---",

          {
            opcode: "changeTitleTo",
            blockType: Scratch.BlockType.COMMAND,
            text: "set window title to [TITLE]",
            arguments: {
              TITLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello World!",
              },
            },
          },
          {
            opcode: "windowTitle",
            blockType: Scratch.BlockType.REPORTER,
            text: "window title",
          },

          "---",

          {
            opcode: "enterFullscreen",
            blockType: Scratch.BlockType.COMMAND,
            text: "enter fullscreen",
          },
          {
            opcode: "exitFullscreen",
            blockType: Scratch.BlockType.COMMAND,
            text: "exit fullscreen",
          },
          {
            opcode: "isFullscreen",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is window fullscreen?",
          },

          "---",

          {
            opcode: "closeWindow",
            blockType: Scratch.BlockType.COMMAND,
            isTerminal: true,
            text: "close window",
          },
        ],
        menus: {
          MOVE: {
            acceptReporters: true,
            items: [
              "center",
              "right",
              "left",
              "top",
              "bottom",
              "top right",
              "top left",
              "bottom right",
              "bottom left",
              "random position",
            ],
          },
          RESIZE: {
            acceptReporters: true,
            items: [
              "480x360",
              "640x480",
              "1280x720",
              "1920x1080",
              "2560x1440",
              "2048x1080",
              "3840x2160",
              "7680x4320",
            ],
          },
        },
      };
    }

    moveTo(args) {
      window.moveTo(args.X, args.Y);
      Scratch.vm.runtime.requestRedraw();
    }
    moveToPresets(args) {
      if (args.PRESETS == "center") {
        const left = (screen.width - window.outerWidth) / 2;
        const top = (screen.height - window.outerHeight) / 2;
        window.moveTo(left, top);
      } else if (args.PRESETS == "right") {
        const right = screen.width - window.outerWidth;
        const top = (screen.height - window.outerHeight) / 2;
        window.moveTo(right, top);
      } else if (args.PRESETS == "left") {
        const top = (screen.height - window.outerHeight) / 2;
        window.moveTo(0, top);
      } else if (args.PRESETS == "top") {
        const left = (screen.width - window.outerWidth) / 2;
        window.moveTo(left, 0);
      } else if (args.PRESETS == "bottom") {
        const left = (screen.width - window.outerWidth) / 2;
        const bottom = screen.height - window.outerHeight;
        window.moveTo(left, bottom);
      } else if (args.PRESETS == "top right") {
        const right = screen.width - window.outerWidth;
        window.moveTo(right, 0);
      } else if (args.PRESETS == "top left") {
        window.moveTo(0, 0);
      } else if (args.PRESETS == "bottom right") {
        const right = screen.width - window.outerWidth;
        const bottom = screen.height - window.outerHeight;
        window.moveTo(right, bottom);
      } else if (args.PRESETS == "bottom left") {
        const bottom = screen.height - window.outerHeight;
        window.moveTo(0, bottom);
      } else if (args.PRESETS == "random position") {
        const randomX = getRandomInt(0, screen.width);
        const randomY = getRandomInt(0, screen.height);
        window.moveTo(randomX, randomY);
      }
      Scratch.vm.runtime.requestRedraw();
    }
    changeX(args) {
      window.moveBy(args.X, 0);
      Scratch.vm.runtime.requestRedraw();
    }
    setX(args) {
      const currentY = window.screenY;
      window.moveTo(args.X, currentY);
      Scratch.vm.runtime.requestRedraw();
    }
    changeY(args) {
      window.moveBy(0, args.Y);
      Scratch.vm.runtime.requestRedraw();
    }
    setY(args) {
      const currentX = window.screenX;
      window.moveTo(currentX, args.Y);
      Scratch.vm.runtime.requestRedraw();
    }
    windowX() {
      return window.screenLeft;
    }
    windowY() {
      return window.screenTop;
    }
    resizeTo(args) {
      window.resizeTo(args.W, args.H);
      Scratch.vm.runtime.requestRedraw();
    }
    resizeToPresets(args) {
      if (args.PRESETS == "480x360") {
        window.resizeTo(
          480 + (window.outerWidth - window.innerWidth),
          360 + (window.outerHeight - window.innerHeight)
        );
      } else if (args.PRESETS == "640x480") {
        window.resizeTo(
          640 + (window.outerWidth - window.innerWidth),
          480 + (window.outerHeight - window.innerHeight)
        );
      } else if (args.PRESETS == "1280x720") {
        window.resizeTo(
          1280 + (window.outerWidth - window.innerWidth),
          720 + (window.outerHeight - window.innerHeight)
        );
      } else if (args.PRESETS == "1920x1080") {
        window.resizeTo(
          1920 + (window.outerWidth - window.innerWidth),
          1080 + (window.outerHeight - window.innerHeight)
        );
      } else if (args.PRESETS == "2560x1440") {
        window.resizeTo(
          2560 + (window.outerWidth - window.innerWidth),
          1440 + (window.outerHeight - window.innerHeight)
        );
      } else if (args.PRESETS == "2048x1080") {
        window.resizeTo(
          2048 + (window.outerWidth - window.innerWidth),
          1080 + (window.outerHeight - window.innerHeight)
        );
      } else if (args.PRESETS == "3840x2160") {
        window.resizeTo(
          3840 + (window.outerWidth - window.innerWidth),
          2160 + (window.outerHeight - window.innerHeight)
        );
      } else if (args.PRESETS == "7680x4320") {
        window.resizeTo(
          7680 + (window.outerWidth - window.innerWidth),
          4320 + (window.outerHeight - window.innerHeight)
        );
      }
      Scratch.vm.runtime.requestRedraw();
    }
    changeW(args) {
      window.resizeBy(args.W, 0);
      Scratch.vm.runtime.requestRedraw();
    }
    setW(args) {
      const currentH = window.outerHeight;
      window.resizeTo(args.W, currentH);
      Scratch.vm.runtime.requestRedraw();
    }
    changeH(args) {
      window.resizeBy(0, args.H);
      Scratch.vm.runtime.requestRedraw();
    }
    setH(args) {
      const currentW = window.outerWidth;
      window.resizeTo(currentW, args.H);
      Scratch.vm.runtime.requestRedraw();
    }
    matchStageSize() {
      window.resizeTo(
        Scratch.vm.runtime.stageWidth + (window.outerWidth - window.innerWidth),
        Scratch.vm.runtime.stageHeight +
          (window.outerHeight - window.innerHeight)
      );
      Scratch.vm.runtime.requestRedraw();
    }
    windowW() {
      return window.outerWidth;
    }
    windowH() {
      return window.outerHeight;
    }
    isTouchingEdge() {
      const edgeX = screen.width - window.outerWidth;
      const edgeY = screen.height - window.outerHeight;
      return (
        window.screenLeft <= 0 ||
        window.screenTop <= 0 ||
        window.screenLeft >= edgeX ||
        window.screenTop >= edgeY
      );
    }
    screenW() {
      return screen.width;
    }
    screenH() {
      return screen.height;
    }
    isFocused() {
      return document.hasFocus();
    }
    changeTitleTo(args) {
      document.title = args.TITLE;
    }
    windowTitle() {
      return document.title;
    }
    enterFullscreen() {
      if (document.fullscreenElement == null) {
        document.documentElement.requestFullscreen();
      }
    }
    exitFullscreen() {
      if (document.fullscreenElement !== null) {
        document.exitFullscreen();
      }
    }
    isFullscreen() {
      return document.fullscreenElement !== null;
    }
    closeWindow() {
      const editorConfirmation = [
        "Are you sure you want to close this window?",
        "",
        "(This message will not appear when the project is packaged)",
      ].join("\n");
      if (typeof ScratchBlocks === "undefined" || confirm(editorConfirmation)) {
        window.close();
      }
    }
  }
  Scratch.extensions.register(new WindowControls());
})(Scratch);
