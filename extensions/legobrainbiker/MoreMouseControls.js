// Name: More Mouse Controls
// ID: legobrainbikerMoreMouseControls
// Description: Adds more options to detect properties of the cursor, including its position, clicking, and scrolling.
// By: legobrainbiker <https://scratch.mit.edu/users/legobrainbiker/>
// License: MPL-2.0
(function (Scratch) {
  "use strict";
  const iconURI =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzNi4zOTI4MSIgaGVpZ2h0PSIzNS40MjY1OSIgdmlld0JveD0iMCwwLDM2LjM5MjgxLDM1LjQyNjU5Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTU2Ljg4NTQxLC0xNTcuNjM4NDcpIj48ZyBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTE2Mi44NjU0NCwxNjcuNDYzMDljMCwtMi4wNDY3NCAxLjc0NjIsLTMuNzA1OTQgMy45MDAyNCwtMy43MDU5NGMyLjE1NDA0LDAgMy45MDAyNCwxLjY1OTIxIDMuOTAwMjQsMy43MDU5NGMwLDIuMDQ2NzQgLTEuNzQ2MiwzLjcwNTk1IC0zLjkwMDI0LDMuNzA1OTVjLTIuMTU0MDQsMCAtMy45MDAyNCwtMS42NTkyMSAtMy45MDAyNCwtMy43MDU5NXoiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0xNTguMTM1NDEsMTY3LjQ2MzA5YzAsLTQuNzM1NjMgMy44NjM5LC04LjU3NDYyIDguNjMwMjcsLTguNTc0NjJjNC43NjYzNywwIDguNjMwMjcsMy44Mzg5OSA4LjYzMDI3LDguNTc0NjJjMCw0LjczNTYzIC0zLjg2MzksOC41NzQ2MiAtOC42MzAyNyw4LjU3NDYyYy00Ljc2NjM3LDAgLTguNjMwMjcsLTMuODM4OTkgLTguNjMwMjcsLTguNTc0NjJ6IiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMTY3LjE0OTM5LDE3MC45MDY1YzEuNzMxMTMsMy41NzM5NSA3LjA5NTEzLDE0LjY0ODAxIDkuODg1MzksMjAuNDA4NTVjMS4wNDI2OSwyLjE1MjY1IDIuMzMzMzgsMS4xMzM2NiAyLjc1MjMyLC0wLjU0MjA4YzAuNDY3NjksLTEuODcwNzUgMS41NTMyMywtNi4yMTI5MiAyLjE0OTI5LC04LjU5NzE0YzAuMjQ3MDcsLTAuOTg4MjggMS4yMjc3NCwtMS45Mzk5OCAyLjAwNjEzLC0yLjIyNTM5YzEuMTc1NDYsLTAuNDMxIDQuNjg3NzgsLTEuNzE4ODUgNy41ODU3MSwtMi43ODE0MmMyLjMzMSwtMC44NTQ3IDIuMzU5MTIsLTIuMTQzNTMgLTAuNDQ3MjksLTIuOTk3NjVjLTYuNTM1MzMsLTEuOTg5MDEgLTE3Ljk1NzAzLC01LjQ2NTE4IC0yMS41ODI1MiwtNi41Njg1OWMtMi4xNzUxNCwtMC42NjIgLTMuNDAzNTEsMS4xMjY3MyAtMi4zNDkwMywzLjMwMzczeiIgZmlsbD0iI2EzYTNhMyIgc3Ryb2tlLXdpZHRoPSIzLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L2c+PC9zdmc+";
  class moreMouseControls {
    constructor() {
      this.mouseX = 0;
      this.mouseY = 0;
      this.mouseWheelDelta = 0;
      this.mouseWheelDeltaX = 0;
      this.mouseZoomDelta = 0;
      this.buttons = [];
      this.contextMenuDissabled = false;
      document.addEventListener("contextmenu", (e) => {
        if (this.contextMenuDissabled) {
          e.preventDefault();
        }
      });
      this.scrollDissabled = false;
      document.addEventListener(
        "wheel",
        (e) => {
          if (this.scrollDissabled) {
            e.preventDefault();
          }
          if (e.ctrlKey) {
            this.mouseZoomDelta = e.deltaY;
            this.mouseWheelDelta = 0;
            this.mouseWheelDeltaX = 0;
          } else {
            this.mouseZoomDelta = 0;
            this.mouseWheelDelta = e.deltaY;
            this.mouseWheelDeltaX = e.deltaX;
          }
          Scratch.vm.runtime.startHats(
            "legobrainbikerMoreMouseControls_onScroll"
          );
        },
        { passive: false }
      );
      document.addEventListener("mouseup", (e) => {
        this.buttons[e.button] = false;
      });
      document.addEventListener("mousedown", (e) => {
        this.buttons[e.button] = true;
      });
      document.addEventListener("mousemove", (e) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
      });
      document.addEventListener("mouseleave", (e) => {
        this.mouseX = NaN;
        this.mouseY = NaN;
        // this could be problomatic for some projects. it's not great to add another edge case
      });
    }
    getInfo() {
      return {
        id: "legobrainbikerMoreMouseControls",
        name: Scratch.translate("More Mouse Controls"),
        menuIconURI: iconURI,
        blockIconURI: iconURI,
        color1: "#99bbbb",
        color2: "#88bbbb",
        color3: "#88bbbb",
        blocks: [
          {
            opcode: "onMouseUp",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when mouse button [button] is released"),
            isEdgeActivated: true,
            arguments: {
              button: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "onMouseDown",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when mouse button [button] is pressed"),
            isEdgeActivated: true,
            arguments: {
              button: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "buttonPressed",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("mouse button [button] is pressed"),
            arguments: {
              button: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "toggleContextMenu",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("toggle context menu"),
          },
          {
            opcode: "toggleScroll",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("toggle scrolling and zooming"),
          },
          {
            opcode: "onScroll",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when scrolling"),
            isEdgeActivated: false,
          },
          {
            opcode: "scrollAmount",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("scroll amount"),
          },
          {
            opcode: "horozontalScrollAmount",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("horozontal scroll amount"),
          },
          {
            opcode: "zoomAmount",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("zoom amount"),
          },
          {
            opcode: "mouseGlobalX",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("mouse global x position"),
          },
          {
            opcode: "mouseGlobalY",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("mouse global y position"),
          },
        ],
      };
    }
    onMouseUp(args) {
      return !this.buttonPressed(args);
    }
    onMouseDown(args) {
      return this.buttonPressed(args);
    }
    buttonPressed({ button }) {
      return this.buttons[Scratch.Cast.toNumber(button)] || false;
    }
    toggleContextMenu() {
      this.contextMenuDissabled = !this.contextMenuDissabled;
    }
    toggleScroll() {
      this.scrollDissabled = !this.scrollDissabled;
    }
    scrollAmount() {
      return -this.mouseWheelDelta;
    }
    horozontalScrollAmount() {
      return this.mouseWheelDeltaX;
    }
    zoomAmount() {
      return -this.mouseZoomDelta;
    }
    mouseGlobalX() {
      const canvas = Scratch.renderer.canvas.getBoundingClientRect();
      return this.mouseX - canvas.x - canvas.width / 2;
    }
    mouseGlobalY() {
      const canvas = Scratch.renderer.canvas.getBoundingClientRect();
      return -(this.mouseY - canvas.y - canvas.height / 2);
    }
  }
  Scratch.extensions.register(new moreMouseControls());
})(Scratch);
