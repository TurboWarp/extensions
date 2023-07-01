(function(Scratch) {
  'use strict';

  const IconURI = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMC4yMDciIGhlaWdodD0iMjEuMzI4MjciIHZpZXdCb3g9IjAsMCwyMC4yMDcsMjEuMzI4MjciPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMjkuNzUsLTE2OC45MjE3MykiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTI0Mi41ODYsMTgwLjAwMDAxbC01LjI5MywtNS4yOTNjLTAuMjU5OTYsLTAuMjUxMDcgLTAuMzY0MjEsLTAuNjIyODggLTAuMjcyNywtMC45NzI1MWMwLjA5MTUyLC0wLjM0OTYzIDAuMzY0NTYsLTAuNjIyNjcgMC43MTQxOSwtMC43MTQxOWMwLjM0OTYzLC0wLjA5MTUyIDAuNzIxNDMsMC4wMTI3NCAwLjk3MjUxLDAuMjcyN2wxLjI5MywxLjI5M2wzLjI5MywtMy4yOTNjMS40OTUwMywtMS40OTUwMyAzLjkxODk3LC0xLjQ5NTAzIDUuNDE0LDBjMS40OTUwMywxLjQ5NTAzIDEuNDk1MDMsMy45MTg5NyAwLDUuNDE0bC0xLjUsMS41Yy0wLjM5MjM4LDAuMzc4OTcgLTEuMDE2MDgsMC4zNzM1NSAtMS40MDE4MiwtMC4wMTIxOGMtMC4zODU3MywtMC4zODU3MyAtMC4zOTExNSwtMS4wMDk0NCAtMC4wMTIxOCwtMS40MDE4MmwxLjUsLTEuNWMwLjcxNDEsLTAuNzE0MSAwLjcxNDEsLTEuODcxOSAwLC0yLjU4NmMtMC43MTQxLC0wLjcxNDEgLTEuODcxOSwtMC43MTQxIC0yLjU4NiwwbC0zLjI5MywzLjI5M2w1LjI5Myw1LjI5M2MwLjM3ODk3LDAuMzkyMzggMC4zNzM1NSwxLjAxNjA4IC0wLjAxMjE4LDEuNDAxODJjLTAuMzg1NzMsMC4zODU3MyAtMS4wMDk0NCwwLjM5MTE1IC0xLjQwMTgyLDAuMDEyMThsLTEuMjkzLC0xLjI5M2wtNy4yOTMsNy4yOTNjLTAuMTg3NDksMC4xODc1NSAtMC40NDE4MSwwLjI5Mjk0IC0wLjcwNywwLjI5M2gtNGMtMC41NTIyOCwwIC0xLC0wLjQ0NzcyIC0xLC0xdi00YzAuMDAwMDYsLTAuMjY1MTkgMC4xMDU0NSwtMC41MTk1MSAwLjI5MywtMC43MDdsNS41LC01LjVjMC4zOTIzOCwtMC4zNzg5NyAxLjAxNjA4LC0wLjM3MzU1IDEuNDAxODIsMC4wMTIxOGMwLjM4NTczLDAuMzg1NzMgMC4zOTExNSwxLjAwOTQ0IDAuMDEyMTgsMS40MDE4MmwtNS4yMDcsNS4yMDd2Mi41ODZoMi41ODZ6IiBzdHJva2Utb3BhY2l0eT0iMC4xMjk0MSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIuNSIvPjxwYXRoIGQ9Ik0yNDIuNTg2LDE4MC4wMDAwMWwtNS4yOTMsLTUuMjkzYy0wLjI1OTk2LC0wLjI1MTA3IC0wLjM2NDIxLC0wLjYyMjg4IC0wLjI3MjcsLTAuOTcyNTFjMC4wOTE1MiwtMC4zNDk2MyAwLjM2NDU2LC0wLjYyMjY3IDAuNzE0MTksLTAuNzE0MTljMC4zNDk2MywtMC4wOTE1MiAwLjcyMTQzLDAuMDEyNzQgMC45NzI1MSwwLjI3MjdsMS4yOTMsMS4yOTNsMy4yOTMsLTMuMjkzYzEuNDk1MDMsLTEuNDk1MDMgMy45MTg5NywtMS40OTUwMyA1LjQxNCwwYzEuNDk1MDMsMS40OTUwMyAxLjQ5NTAzLDMuOTE4OTcgMCw1LjQxNGwtMS41LDEuNWMtMC4zOTIzOCwwLjM3ODk3IC0xLjAxNjA4LDAuMzczNTUgLTEuNDAxODIsLTAuMDEyMThjLTAuMzg1NzMsLTAuMzg1NzMgLTAuMzkxMTUsLTEuMDA5NDQgLTAuMDEyMTgsLTEuNDAxODJsMS41LC0xLjVjMC43MTQxLC0wLjcxNDEgMC43MTQxLC0xLjg3MTkgMCwtMi41ODZjLTAuNzE0MSwtMC43MTQxIC0xLjg3MTksLTAuNzE0MSAtMi41ODYsMGwtMy4yOTMsMy4yOTNsNS4yOTMsNS4yOTNjMC4zNzg5NywwLjM5MjM4IDAuMzczNTUsMS4wMTYwOCAtMC4wMTIxOCwxLjQwMTgyYy0wLjM4NTczLDAuMzg1NzMgLTEuMDA5NDQsMC4zOTExNSAtMS40MDE4MiwwLjAxMjE4bC0xLjI5MywtMS4yOTNsLTcuMjkzLDcuMjkzYy0wLjE4NzQ5LDAuMTg3NTUgLTAuNDQxODEsMC4yOTI5NCAtMC43MDcsMC4yOTNoLTRjLTAuNTUyMjgsMCAtMSwtMC40NDc3MiAtMSwtMXYtNGMwLjAwMDA2LC0wLjI2NTE5IDAuMTA1NDUsLTAuNTE5NTEgMC4yOTMsLTAuNzA3bDUuNSwtNS41YzAuMzkyMzgsLTAuMzc4OTcgMS4wMTYwOCwtMC4zNzM1NSAxLjQwMTgyLDAuMDEyMThjMC4zODU3MywwLjM4NTczIDAuMzkxMTUsMS4wMDk0NCAwLjAxMjE4LDEuNDAxODJsLTUuMjA3LDUuMjA3djIuNTg2aDIuNTg2eiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoxMC4yNToxMS4wNzgyNjc1MDAwMDAwMS0tPg==';

  function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
      } : null;
  }

  var x = document.createElement("INPUT");
  x.setAttribute("type", "color");
  x.className = "ColorExtension";
  x.hidden = false;
  document.body.appendChild(x);
  var colorPicker = document.querySelector('.ColorExtension');
  class ColorPicker {
      getInfo() {
          return {
              id: 'shovelColorPicker',
              name: 'ColorPicker',
              menuIconURI: IconURI,
              color1: '#ff7db5',
              blocks: [{
                      blockIconURI: IconURI,
                      opcode: 'showPicker',
                      blockType: Scratch.BlockType.COMMAND,
                      text: 'Show color picker',
                  },
                  {
                      blockIconURI: IconURI,
                      opcode: 'setColor',
                      blockType: Scratch.BlockType.COMMAND,
                      text: 'Set picker color to [Color]',
                      arguments: {
                          Color: {
                              type: Scratch.ArgumentType.COLOR,
                              defaultValue: '#855CD6'
                          }
                      }
                  },
                  {
                      blockIconURI: IconURI,
                      disableMonitor: true,
                      opcode: 'getColorHEX',
                      blockType: Scratch.BlockType.REPORTER,
                      text: 'Picker HEX value',
                  },
                  {
                      blockIconURI: IconURI,
                      disableMonitor: true,
                      opcode: 'getColorRGB',
                      blockType: Scratch.BlockType.REPORTER,
                      text: 'Picker [RGB] value',
                      arguments: {
                          RGB: {
                              type: Scratch.ArgumentType.STRING,
                              menu: 'RGBMenu'
                          }
                      }
                  },
              ],
              menus: {
                  RGBMenu: {
                      acceptReporters: true,
                      items: ['Red', 'Green', 'Blue']
                  }
              }
          };
      }
      setColor(args) {
          document.querySelector('.ColorExtension').value = args.Color;
      }
      getColorHEX() {
          return colorPicker.value;
      }
      showPicker() {
          colorPicker.click();
      }
      getColorRGB(args) {
          if (args.RGB == 'Red') {
              return hexToRgb(colorPicker.value).r;
          } else {
              if (args.RGB == 'Green') {
                  return hexToRgb(colorPicker.value).g;
              } else {
                  if (args.RGB == 'Blue') {
                      return hexToRgb(colorPicker.value).b;
                  } else {
                      return '';
                  }
              }
          }
      }

  }

  Scratch.extensions.register(new ColorPicker());
})(Scratch);