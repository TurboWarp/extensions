// Name: RGB Channels
// ID: lbdrawtest
// Description: Only render or stamp certain RGB channels.

(function (Scratch) {
  "use strict";
  const renderer = Scratch.vm.renderer;
  const gl = renderer._gl;
  let channel_array = [true, true, true, true];
  class LBdrawtest {
    constructor() {
      Scratch.vm.runtime.on("RUNTIME_DISPOSED", () => {
        this.clearEffects();
      });
    }
    getInfo() {
      return {
        id: "lbdrawtest",
        name: "RGB Channels",
        menuIconURI:
          "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzMyIgaGVpZ2h0PSIzMyIgdmlld0JveD0iMCwwLDMzLDMzIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjIzLjUsLTE2My41KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjI0LDE4MGMwLC04LjgzNjU2IDcuMTYzNDQsLTE2IDE2LC0xNmM4LjgzNjU2LDAgMTYsNy4xNjM0NCAxNiwxNmMwLDguODM2NTYgLTcuMTYzNDQsMTYgLTE2LDE2Yy04LjgzNjU2LDAgLTE2LC03LjE2MzQ0IC0xNiwtMTZ6IiBmaWxsPSIjYWFhYWFhIiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yMzMuOTAyMDQsMTgxLjQ4NjkyYzAsLTQuNDE4MjggMy41ODE3MiwtOCA4LC04YzQuNDE4MjgsMCA4LDMuNTgxNzIgOCw4YzAsNC40MTgyOCAtMy41ODE3Miw4IC04LDhjLTQuNDE4MjgsMCAtOCwtMy41ODE3MiAtOCwtOHoiIGZpbGw9IiMwMDAwZmYiIHN0cm9rZT0iIzNjMDBmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48cGF0aCBkPSJNMjMxLjk2MjQ1LDE3OS40NDEzNWMwLC00LjQxODI4IDMuNTgxNzIsLTggOCwtOGM0LjQxODI4LDAgOCwzLjU4MTcyIDgsOGMwLDQuNDE4MjggLTMuNTgxNzIsOCAtOCw4Yy00LjQxODI4LDAgLTgsLTMuNTgxNzIgLTgsLTh6IiBmaWxsPSIjMDBmZjAwIiBzdHJva2U9IiMwMGZmM2QiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yMzAuMjI1OSwxNzcuNjIwOThjMCwtNC40MTgyOCAzLjU4MTcyLC04IDgsLThjNC40MTgyOCwwIDgsMy41ODE3MiA4LDhjMCw0LjQxODI4IC0zLjU4MTcyLDggLTgsOGMtNC40MTgyOCwwIC04LC0zLjU4MTcyIC04LC04eiIgZmlsbD0iI2ZmMDAwMCIgc3Ryb2tlPSIjZmYzZDAwIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9nPjwvc3ZnPgo=",
        blockIconURI:
          "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMC40MjYxNCIgaGVpZ2h0PSIyMC42MTU5NCIgdmlld0JveD0iMCwwLDIwLjQyNjE0LDIwLjYxNTk0Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjI5LjcyNTksLTE2OS4xMjA5OCkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIzMy45MDIwNCwxODEuNDg2OTJjMCwtNC40MTgyOCAzLjU4MTcyLC04IDgsLThjNC40MTgyOCwwIDgsMy41ODE3MiA4LDhjMCw0LjQxODI4IC0zLjU4MTcyLDggLTgsOGMtNC40MTgyOCwwIC04LC0zLjU4MTcyIC04LC04eiIgZmlsbD0iIzAwMDBmZiIgc3Ryb2tlPSIjM2MwMGZmIiBzdHJva2Utd2lkdGg9IjAuNSIvPjxwYXRoIGQ9Ik0yMzEuOTYyNDUsMTc5LjQ0MTM1YzAsLTQuNDE4MjggMy41ODE3MiwtOCA4LC04YzQuNDE4MjgsMCA4LDMuNTgxNzIgOCw4YzAsNC40MTgyOCAtMy41ODE3Miw4IC04LDhjLTQuNDE4MjgsMCAtOCwtMy41ODE3MiAtOCwtOHoiIGZpbGw9IiMwMGZmMDAiIHN0cm9rZT0iIzAwZmYzZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTIzMC4yMjU5LDE3Ny42MjA5OGMwLC00LjQxODI4IDMuNTgxNzIsLTggOCwtOGM0LjQxODI4LDAgOCwzLjU4MTcyIDgsOGMwLDQuNDE4MjggLTMuNTgxNzIsOCAtOCw4Yy00LjQxODI4LDAgLTgsLTMuNTgxNzIgLTgsLTh6IiBmaWxsPSIjZmYwMDAwIiBzdHJva2U9IiNmZjNkMDAiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L2c+PC9zdmc+Cg==",
        color1: "#aaaaaa",
        color2: "#888888",
        color3: "#888888",
        blocks: [
          {
            opcode: "true",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "true",
            disableMonitor: true,
          },
          {
            opcode: "false",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "false",
            hideFromPalette: true,
            disableMonitor: true,
          },
          {
            opcode: "enabledCheck",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[COLOR] channel enabled?",
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.STRING,
                menu: "COLOR_MENU",
              },
            },
          },
          {
            opcode: "draw",
            blockType: Scratch.BlockType.COMMAND,
            text: "only draw colors:[R]green:[G]blue:[B]",
            arguments: {
              R: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              G: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              B: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          {
            opcode: "drawOneColor",
            blockType: Scratch.BlockType.COMMAND,
            text: "only draw [COLOR]",
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.STRING,
                menu: "COLOR_MENU",
              },
            },
          },
          {
            opcode: "drawDepth",
            blockType: Scratch.BlockType.COMMAND,
            text: "enable depth mask?[DRAW]",
            hideFromPalette: true,
            arguments: {
              DRAW: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          {
            opcode: "clearEffects",
            blockType: Scratch.BlockType.COMMAND,
            text: "clear color draw effects",
          },
        ],
        menus: {
          COLOR_MENU: {
            acceptReporters: true,
            items: ["red", "green", "blue"],
          },
        },
      };
    }

    true() {
      return true;
    }

    false() {
      return false;
    }

    enabledCheck({ COLOR }) {
      if (
        (COLOR == "red" && channel_array[0]) ||
        (COLOR == "green" && channel_array[1]) ||
        (COLOR == "blue" && channel_array[2])
      ) {
        return true;
      } else {
        return false;
      }
    }

    draw({ R, G, B }) {
      channel_array = [R, G, B, true];
      gl.colorMask(
        channel_array[0],
        channel_array[1],
        channel_array[2],
        channel_array[3]
      );
      Scratch.vm.renderer.dirty = true;
    }

    drawOneColor({ COLOR }) {
      if (COLOR == "red") {
        channel_array = [true, false, false, true];
      } else if (COLOR == "green") {
        channel_array = [false, true, false, true];
      } else {
        channel_array = [false, false, true, true];
      }
      gl.colorMask(
        channel_array[0],
        channel_array[1],
        channel_array[2],
        channel_array[3]
      );
      Scratch.vm.renderer.dirty = true;
    }

    drawDepth({ DRAW }) {
      gl.depthMask(DRAW);
      Scratch.vm.renderer.dirty = true;
    }

    clearEffects() {
      channel_array = [true, true, true, true];
      gl.colorMask(
        channel_array[0],
        channel_array[1],
        channel_array[2],
        channel_array[3]
      );
      gl.depthMask(true);
      Scratch.vm.renderer.dirty = true;
    }
  }

  Scratch.extensions.register(new LBdrawtest());
})(Scratch);
