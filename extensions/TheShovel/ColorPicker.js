// Name: Color Picker
// ID: shovelColorPicker
// Description: Access your system's color picker.
// By: TheShovel

(function (Scratch) {
  "use strict";

  const IconURI =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMC4yMDciIGhlaWdodD0iMjEuMzI4MjciIHZpZXdCb3g9IjAsMCwyMC4yMDcsMjEuMzI4MjciPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMjkuNzUsLTE2OC45MjE3MykiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTI0Mi41ODYsMTgwLjAwMDAxbC01LjI5MywtNS4yOTNjLTAuMjU5OTYsLTAuMjUxMDcgLTAuMzY0MjEsLTAuNjIyODggLTAuMjcyNywtMC45NzI1MWMwLjA5MTUyLC0wLjM0OTYzIDAuMzY0NTYsLTAuNjIyNjcgMC43MTQxOSwtMC43MTQxOWMwLjM0OTYzLC0wLjA5MTUyIDAuNzIxNDMsMC4wMTI3NCAwLjk3MjUxLDAuMjcyN2wxLjI5MywxLjI5M2wzLjI5MywtMy4yOTNjMS40OTUwMywtMS40OTUwMyAzLjkxODk3LC0xLjQ5NTAzIDUuNDE0LDBjMS40OTUwMywxLjQ5NTAzIDEuNDk1MDMsMy45MTg5NyAwLDUuNDE0bC0xLjUsMS41Yy0wLjM5MjM4LDAuMzc4OTcgLTEuMDE2MDgsMC4zNzM1NSAtMS40MDE4MiwtMC4wMTIxOGMtMC4zODU3MywtMC4zODU3MyAtMC4zOTExNSwtMS4wMDk0NCAtMC4wMTIxOCwtMS40MDE4MmwxLjUsLTEuNWMwLjcxNDEsLTAuNzE0MSAwLjcxNDEsLTEuODcxOSAwLC0yLjU4NmMtMC43MTQxLC0wLjcxNDEgLTEuODcxOSwtMC43MTQxIC0yLjU4NiwwbC0zLjI5MywzLjI5M2w1LjI5Myw1LjI5M2MwLjM3ODk3LDAuMzkyMzggMC4zNzM1NSwxLjAxNjA4IC0wLjAxMjE4LDEuNDAxODJjLTAuMzg1NzMsMC4zODU3MyAtMS4wMDk0NCwwLjM5MTE1IC0xLjQwMTgyLDAuMDEyMThsLTEuMjkzLC0xLjI5M2wtNy4yOTMsNy4yOTNjLTAuMTg3NDksMC4xODc1NSAtMC40NDE4MSwwLjI5Mjk0IC0wLjcwNywwLjI5M2gtNGMtMC41NTIyOCwwIC0xLC0wLjQ0NzcyIC0xLC0xdi00YzAuMDAwMDYsLTAuMjY1MTkgMC4xMDU0NSwtMC41MTk1MSAwLjI5MywtMC43MDdsNS41LC01LjVjMC4zOTIzOCwtMC4zNzg5NyAxLjAxNjA4LC0wLjM3MzU1IDEuNDAxODIsMC4wMTIxOGMwLjM4NTczLDAuMzg1NzMgMC4zOTExNSwxLjAwOTQ0IDAuMDEyMTgsMS40MDE4MmwtNS4yMDcsNS4yMDd2Mi41ODZoMi41ODZ6IiBzdHJva2Utb3BhY2l0eT0iMC4xMjk0MSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIuNSIvPjxwYXRoIGQ9Ik0yNDIuNTg2LDE4MC4wMDAwMWwtNS4yOTMsLTUuMjkzYy0wLjI1OTk2LC0wLjI1MTA3IC0wLjM2NDIxLC0wLjYyMjg4IC0wLjI3MjcsLTAuOTcyNTFjMC4wOTE1MiwtMC4zNDk2MyAwLjM2NDU2LC0wLjYyMjY3IDAuNzE0MTksLTAuNzE0MTljMC4zNDk2MywtMC4wOTE1MiAwLjcyMTQzLDAuMDEyNzQgMC45NzI1MSwwLjI3MjdsMS4yOTMsMS4yOTNsMy4yOTMsLTMuMjkzYzEuNDk1MDMsLTEuNDk1MDMgMy45MTg5NywtMS40OTUwMyA1LjQxNCwwYzEuNDk1MDMsMS40OTUwMyAxLjQ5NTAzLDMuOTE4OTcgMCw1LjQxNGwtMS41LDEuNWMtMC4zOTIzOCwwLjM3ODk3IC0xLjAxNjA4LDAuMzczNTUgLTEuNDAxODIsLTAuMDEyMThjLTAuMzg1NzMsLTAuMzg1NzMgLTAuMzkxMTUsLTEuMDA5NDQgLTAuMDEyMTgsLTEuNDAxODJsMS41LC0xLjVjMC43MTQxLC0wLjcxNDEgMC43MTQxLC0xLjg3MTkgMCwtMi41ODZjLTAuNzE0MSwtMC43MTQxIC0xLjg3MTksLTAuNzE0MSAtMi41ODYsMGwtMy4yOTMsMy4yOTNsNS4yOTMsNS4yOTNjMC4zNzg5NywwLjM5MjM4IDAuMzczNTUsMS4wMTYwOCAtMC4wMTIxOCwxLjQwMTgyYy0wLjM4NTczLDAuMzg1NzMgLTEuMDA5NDQsMC4zOTExNSAtMS40MDE4MiwwLjAxMjE4bC0xLjI5MywtMS4yOTNsLTcuMjkzLDcuMjkzYy0wLjE4NzQ5LDAuMTg3NTUgLTAuNDQxODEsMC4yOTI5NCAtMC43MDcsMC4yOTNoLTRjLTAuNTUyMjgsMCAtMSwtMC40NDc3MiAtMSwtMXYtNGMwLjAwMDA2LC0wLjI2NTE5IDAuMTA1NDUsLTAuNTE5NTEgMC4yOTMsLTAuNzA3bDUuNSwtNS41YzAuMzkyMzgsLTAuMzc4OTcgMS4wMTYwOCwtMC4zNzM1NSAxLjQwMTgyLDAuMDEyMThjMC4zODU3MywwLjM4NTczIDAuMzkxMTUsMS4wMDk0NCAwLjAxMjE4LDEuNDAxODJsLTUuMjA3LDUuMjA3djIuNTg2aDIuNTg2eiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoxMC4yNToxMS4wNzgyNjc1MDAwMDAwMS0tPg==";

  const input = document.createElement("input");
  input.type = "color";
  input.value = "#9966ff"; // default scratch-paint color
  input.style.pointerEvents = 'none';
  input.style.width = '1px';
  input.style.height = '1px';
  input.style.visibility = 'hidden';
  Scratch.renderer.addOverlay(input, 'scale');

  input.addEventListener("change", () => {
    Scratch.vm.runtime.startHats('shovelColorPicker_whenChanged');
  });

  let x = 0;
  let y = 0;
  const updatePosition = () => {
    const centeredX = Scratch.vm.runtime.stageWidth / 2 + x;
    const centeredY = Scratch.vm.runtime.stageHeight / 2 - y;
    input.style.transform = `translate(${centeredX}px, ${centeredY}px)`;
  };
  updatePosition();

  class ColorPicker {
    getInfo() {
      return {
        id: "shovelColorPicker",
        name: "ColorPicker",
        menuIconURI: IconURI,
        blockIconURI: IconURI,
        color1: "#ff7db5",
        blocks: [
          {
            opcode: "showPicker",
            blockType: Scratch.BlockType.COMMAND,
            text: "show color picker",
          },
          {
            opcode: "setPos",
            blockType: Scratch.BlockType.COMMAND,
            text: "set picker position to x: [X] y: [Y]",
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "setColor",
            blockType: Scratch.BlockType.COMMAND,
            text: "set picker color to [COLOR]",
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#855CD6",
              },
            },
          },
          {
            opcode: "getColor",
            blockType: Scratch.BlockType.REPORTER,
            text: "color [TYPE] value",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "RGBMenu",
              },
            },
          },
          {
            opcode: "getPos",
            blockType: Scratch.BlockType.REPORTER,
            text: "picker [COORD] position",
            arguments: {
              COORD: {
                type: Scratch.ArgumentType.STRING,
                menu: "POSMenu",
              },
            },
          },
          {
            opcode: "whenChanged",
            blockType: Scratch.BlockType.EVENT,
            isEdgeActivated: false,
            text: "when color changed"
          }
        ],
        menus: {
          RGBMenu: {
            acceptReporters: true,
            items: ["hex", "red", "green", "blue"],
          },
          POSMenu: {
            acceptReporters: true,
            items: ["X", "Y"],
          },
        },
      };
    }

    setColor(args) {
      input.value = args.COLOR;
    }

    getColorHEX() {
      return input.value;
    }

    showPicker() {
      input.click();
    }

    getColor(args) {
      if (args.TYPE === "hex" ){
        return input.value;
      } else if (args.TYPE == "red") {
        return Scratch.Cast.toRgbColorObject(input.value).r;
      } else if (args.TYPE == "green") {
        return Scratch.Cast.toRgbColorObject(input.value).g;
      } else if (args.TYPE == "blue") {
        return Scratch.Cast.toRgbColorObject(input.value).b;
      } else {
        return "";
      }
    }

    setPos(args) {
      x = Scratch.Cast.toNumber(args.X);
      y = Scratch.Cast.toNumber(args.Y);
      updatePosition();
    }

    getPos(args) {
      if (args.COORD == "X") {
        return x;
      } else if (args.COORD == "Y") {
        return y;
      } else {
        return "";
      }
    }
  }

  Scratch.extensions.register(new ColorPicker());
  // @ts-ignore
})(Scratch);
