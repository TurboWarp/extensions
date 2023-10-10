// Name: Monitors Plus
// ID: DICandSPmonitorsPlus
// Description: Expansion of Monitor Types and Variables.
// By: SharkPool and DogeIsCut

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Monitors Plus must run unsandboxed!");
  }

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzMjEiIGhlaWdodD0iMzIxIiB2aWV3Qm94PSIwLDAsMzIxLDMyMSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTc5LjUsLTE5LjUpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNOTQsMTgwYzAsLTgwLjYzMzU3IDY1LjM2NjQyLC0xNDYgMTQ2LC0xNDZjODAuNjMzNTgsMCAxNDYsNjUuMzY2NDMgMTQ2LDE0NmMwLDgwLjYzMzU4IC02NS4zNjY0MiwxNDYgLTE0NiwxNDZjLTgwLjYzMzU4LDAgLTE0NiwtNjUuMzY2NDIgLTE0NiwtMTQ2eiIgZmlsbD0iI2ZmOGMxYSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0xNjkuMDg3MzIsODQuMDM5NzRjNi4yMTQ2MSwyLjczMDg3IDkuMDQ1MDIsOS45Nzc2MyA2LjMyNjQyLDE2LjE5NzYxYy05LjQ4MDc2LDIxLjc0MDEgLTE0LjM1NDY2LDQ1LjIwODYxIC0xNC4zMTQ0NSw2OC45MjYwMmMwLDI0LjUzMDI3IDUuMTIwMjEsNDcuODI5NzMgMTQuMzI2NzYsNjguOTI2MDJjMi40NzI4OSw2LjE3MzU1IC0wLjQwNTQxLDEzLjE5NDk2IC02LjUwMDA2LDE1Ljg1NjM4Yy02LjA5NDY0LDIuNjYxNDIgLTEzLjIwMTE4LDAuMDAwMTkgLTE2LjA0ODYxLC02LjAwOTgxYy0xMC44NDQ4LC0yNC44NDQwMiAtMTYuNDI2ODYsLTUxLjY2NDc3IC0xNi4zOTQ1NCwtNzguNzcyNTljMCwtMjcuOTg4ODggNS44NDY0LC01NC42NDg0OCAxNi4zOTQ1NCwtNzguNzcyNTljMS4zMDY4OCwtMi45OTIxOSAzLjc0OTEzLC01LjM0MjQ2IDYuNzg5MjgsLTYuNTMzNThjMy4wNDAxMiwtMS4xOTExMiA2LjQyODk2LC0xLjEyNTQ2IDkuNDIwNjYsMC4xODI1NHpNMjcxLjM4MDkyLDEzMi4yMzg3MmMtMTEuMjE0NjcsMC4wMDI1MiAtMjEuODIwNDIsNS4xMDE2MiAtMjguODI1ODUsMTMuODU5MDZsLTQuMDM3MSw1LjA0NjM2bC0xLjM2NjIxLC0zLjQzMzk5Yy0zLjczNzYsLTkuMzQwOCAtMTIuNzgzMjIsLTE1LjQ2NzA3IC0yMi44NDQwNiwtMTUuNDcxNDNoLTMuOTc1NTZjLTYuNzk3NjQsMCAtMTIuMzA4MjIsNS41MTA1OCAtMTIuMzA4MjIsMTIuMzA4MjJjMCw2Ljc5NzY0IDUuNTEwNTgsMTIuMzA4MjIgMTIuMzA4MjIsMTIuMzA4MjJoMy45NzU1Nmw2LjU0Nzk3LDE2LjM2OTkybC0xMi43MzksMTUuOTM5MTRjLTIuMzM2ODUsMi45MTg3MyAtNS44NzM3NSw0LjYxNjk5IC05LjYxMjcyLDQuNjE1NTloLTAuNDgwMDJjLTYuNzk3NjQsMCAtMTIuMzA4MjIsNS41MTA1NyAtMTIuMzA4MjIsMTIuMzA4MjJjMCw2Ljc5NzY0IDUuNTEwNTcsMTIuMzA4MjIgMTIuMzA4MjIsMTIuMzA4MjJoMC40ODAwMmMxMS4yMTQ2NywtMC4wMDI1MiAyMS44MjA0MSwtNS4xMDE2MiAyOC44MjU4NSwtMTMuODU5MDZsNC4wMzcxLC01LjA0NjM2bDEuMzY2MjIsMy40MzRjMy43MzkyNiw5LjM0NDk2IDEyLjc5MTA0LDE1LjQ3MjExIDIyLjg1NjM3LDE1LjQ3MTQzaDMuOTc1NTVjNi43OTc2NCwwIDEyLjMwODIyLC01LjUxMDU4IDEyLjMwODIyLC0xMi4zMDgyMmMwLC02Ljc5NzY0IC01LjUxMDU4LC0xMi4zMDgyMiAtMTIuMzA4MjIsLTEyLjMwODIyaC0zLjk3NTU1bC02LjU0Nzk4LC0xNi4zNjk5MmwxMi43MzkwMSwtMTUuOTM5MTNjMi4zMzY4NiwtMi45MTg3MyA1Ljg3Mzc2LC00LjYxNjk4IDkuNjEyNzMsLTQuNjE1NTloMC40ODAwMWM2Ljc5NzY1LDAgMTIuMzA4MjIsLTUuNTEwNTggMTIuMzA4MjIsLTEyLjMwODIyYzAsLTYuNzk3NjQgLTUuNTEwNTcsLTEyLjMwODIyIC0xMi4zMDgyMiwtMTIuMzA4MjJoLTAuNDgwMDF6TTI5NC40NDY1MSwxMDAuMjM3MzdjLTIuNjc2MjMsLTYuMjIxMTEgMC4xNzYxNCwtMTMuNDM1NTMgNi4zODMwNiwtMTYuMTQ0NTFjNi4yMDY5MywtMi43MDg5NyAxMy40MzYyNywwLjEwNTM0IDE2LjE3NzksNi4yOTc5M2MxMC44NDkwMiwyNC44NDMxMSAxNi40MzUzLDUxLjY2MzkxIDE2LjQwNjg2LDc4Ljc3MjZjMCwyNy45ODg4OCAtNS44NDYzOSw1NC42NDg0OCAtMTYuMzk0NTQsNzguNzcyNmMtMS42Njg2Niw0LjE2NTc0IC01LjQ3MjI0LDcuMDkzMTggLTkuOTI2MzMsNy42Mzk4M2MtNC40NTQwOSwwLjU0NjY1IC04Ljg1MjcsLTEuMzc0MTQgLTExLjQ3OTE3LC01LjAxMjczYy0yLjYyNjQ3LC0zLjYzODYxIC0zLjA2NDUsLTguNDE4MjggLTEuMTQzMTUsLTEyLjQ3MzY3YzkuNDg1MzIsLTIxLjczOTA4IDE0LjM2MzQ1LC00NS4yMDc3MSAxNC4zMjY3OCwtNjguOTI2MDFjMCwtMjQuNTMwMjcgLTUuMTIwMjIsLTQ3LjgyOTc0IC0xNC4zMzkwOCwtNjguOTI2MDJ6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PGcgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjk1LjEwNTIxLDMwOC45OTEwMmMtMTAuMjYxNjgsMCAtMTguNTgwNDIsLTguMzE4NzMgLTE4LjU4MDQyLC0xOC41ODA0MXYtOTAuNDI0NjdjMCwtMTAuMjYxNjggOC4zMTg3MywtMTguNTgwNDEgMTguNTgwNDIsLTE4LjU4MDQxaDEuMjM4N2MxMC4yNjE2OCwwIDE4LjU4MDQxLDguMzE4NzMgMTguNTgwNDEsMTguNTgwNDF2OTAuNDI0NjdjMCwxMC4yNjE2OCAtOC4zMTg3MywxOC41ODA0MSAtMTguNTgwNDEsMTguNTgwNDF6IiBmaWxsPSIjZmY4YzFhIiBzdHJva2U9IiNmZjhjMWEiIHN0cm9rZS13aWR0aD0iMTIuNSIvPjxwYXRoIGQ9Ik0yMzEuOTMxODIsMjQ0LjU3ODkzYzAsLTEwLjI2MTY4IDguMzE4NzQsLTE4LjU4MDQyIDE4LjU4MDQxLC0xOC41ODA0Mmg5MC40MjQ2NmMxMC4yNjE2OCwwIDE4LjU4MDQsOC4zMTg3MyAxOC41ODA0LDE4LjU4MDQydjEuMjM4N2MwLDEwLjI2MTY5IC04LjMxODcyLDE4LjU4MDQgLTE4LjU4MDQsMTguNTgwNGgtOTAuNDI0NjZjLTEwLjI2MTY3LDAgLTE4LjU4MDQxLC04LjMxODczIC0xOC41ODA0MSwtMTguNTgwNHoiIGZpbGw9IiNmZjhjMWEiIHN0cm9rZT0iI2ZmOGMxYSIgc3Ryb2tlLXdpZHRoPSIxMi41Ii8+PHBhdGggZD0iTTIzOS44ODAxMiwyNDQuNzkwMDZjMCwtNi43NjM1MSA1LjQ4MjkxLC0xMi4yNDY0MSAxMi4yNDY0MiwtMTIuMjQ2NDFoODcuMjk5M2M2Ljc2MzUxLDAgMTIuMjQ2NDIsNS40ODI5IDEyLjI0NjQyLDEyLjI0NjQxdjAuODE2NDVjMCw2Ljc2MzUxIC01LjQ4MjkxLDEyLjI0NjQyIC0xMi4yNDY0MiwxMi4yNDY0MmgtODcuMjk5M2MtNi43NjM1MSwwIC0xMi4yNDY0MiwtNS40ODI5MiAtMTIuMjQ2NDIsLTEyLjI0NjQyeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMjk2LjE4NDM5LDE4OS4zMDIxOWM2Ljc2MzUxLDAgMTIuMjQ2NDEsNS40ODI5MSAxMi4yNDY0MSwxMi4yNDY0MXY4Ny4yOTkzYzAsNi43NjM1MSAtNS40ODI5LDEyLjI0NjQyIC0xMi4yNDY0MSwxMi4yNDY0MmgtMC44MTY0NWMtNi43NjM1MSwwIC0xMi4yNDY0MiwtNS40ODI5MSAtMTIuMjQ2NDEsLTEyLjI0NjQyYzAsMCAwLC00OS4yMzE5NSAwLC02NC44NjIyN2MwLC04Ljg0ODEzIDAsLTIyLjQzNzA0IDAsLTIyLjQzNzA0YzAsLTYuNzYzNTEgNS40ODI5MSwtMTIuMjQ2NDEgMTIuMjQ2NDIsLTEyLjI0NjQyeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PHBhdGggZD0iTTg3LDE4MGMwLC04NC40OTk1NyA2OC41MDA0MywtMTUzIDE1MywtMTUzYzg0LjQ5OTU3LDAgMTUzLDY4LjUwMDQzIDE1MywxNTNjMCw4NC40OTk1NyAtNjguNTAwNDMsMTUzIC0xNTMsMTUzYy04NC40OTk1NywwIC0xNTMsLTY4LjUwMDQzIC0xNTMsLTE1M3oiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjZGI2ZTAwIiBzdHJva2Utd2lkdGg9IjE1Ii8+PC9nPjwvZz48L3N2Zz4=";

  const xmlEscape = function (unsafe) {
    return unsafe.replace(/[<>&'"]/g, c => {
      switch (c) {
        case "<": return "&lt;";
        case ">": return "&gt;";
        case "&": return "&amp;";
        case "'": return "&apos;";
        case "\"": return "&quot;";
      }
    });
  };

  function removeAllEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.parentNode.replaceChild(clonedElement, element);
    return clonedElement;
  }

  const builtInFonts = [
    "Scratch",
    "Sans Serif",
    "Serif",
    "Handwriting",
    "Marker",
    "Curly",
    "Pixel"
  ];

  class MonitorsPlus {
    constructor() {
      this.buttonClick = false;
      this.buttonName = "";
      this.monitorsUpdateListeners = [];
    }

    getInfo() {
      return {
        id: "DICandSPmonitorsPlus",
        name: "Monitors+",
        color1: "#FF8C1A",
        color2: "#e67e17",
        color3: "#cc7015",
        menuIconURI,
        blocks: [
          {
            func: "alertWarning",
            blockType: Scratch.BlockType.BUTTON,
            text: "Crash Warning",
          },
          {
            opcode: "isShowing",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [VARIABLE] showing?",
            hideFromPalette: !this.variablesExist(),
            arguments: {
              VARIABLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
            },
          },
          {
            opcode: "setColor",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [VARIABLE] to [COLOR]",
            hideFromPalette: !this.variablesExist(),
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ff0000",
              },
              VARIABLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
            },
          },
          "---",
          {
            opcode: "setVariableToType",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [VARIABLE] monitor type to [TYPE]",
            hideFromPalette: !this.variablesExist(),
            arguments: {
              VARIABLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "variablesTypeMenu",
              },
            },
          },
          {
            opcode: "getVariableType",
            blockType: Scratch.BlockType.REPORTER,
            text: "monitor type of [VARIABLE]",
            hideFromPalette: !this.variablesExist(),
            arguments: {
              VARIABLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
            },
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: "<sep gap=\"6\"/><label text=\"Sliders\"/><sep gap=\"-12\"/><sep gap=\"12\"/>",
            hideFromPalette: !this.variablesExist(),
          },
          {
            opcode: "setSliderMinMaxOfVaribleTo",
            blockType: Scratch.BlockType.COMMAND,
            text: "set slider min [MIN] and max [MAX] of [VARIABLE]",
            hideFromPalette: !this.variablesExist(),
            arguments: {
              MIN: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: -100,
              },
              MAX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
              VARIABLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
            },
          },
          {
            opcode: "sliderMinMaxOfVarible",
            blockType: Scratch.BlockType.REPORTER,
            text: "slider [MINMAX] of [VARIABLE]",
            hideFromPalette: !this.variablesExist(),
            arguments: {
              MINMAX: {
                type: Scratch.ArgumentType.STRING,
                menu: "sliderMaxMinMenu",
              },
              VARIABLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
            },
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: "<sep gap=\"6\"/><label text=\"Positioning\"/><sep gap=\"-12\"/><sep gap=\"12\"/>",
            hideFromPalette: !this.variablesExist(),
          },
          {
            opcode: "setPosition",
            blockType: Scratch.BlockType.COMMAND,
            text: "set position of [VARIABLE] to x: [X] y: [Y]",
            hideFromPalette: !this.variablesExist(),
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              VARIABLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
            },
          },
          {
            opcode: "currentPos",
            blockType: Scratch.BlockType.REPORTER,
            text: "current [POSITION] of [VARIABLE]",
            hideFromPalette: !this.variablesExist(),
            arguments: {
              VARIABLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
              POSITION: {
                type: Scratch.ArgumentType.STRING,
                menu: "POSITIONS",
                defaultValue: "x",
              },
            },
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: "<sep gap=\"6\"/><label text=\"Buttons\"/><sep gap=\"-12\"/><sep gap=\"12\"/>",
            hideFromPalette: !this.variablesExist(),
          },
          {
            opcode: "whenButtonPressed",
            blockType: Scratch.BlockType.HAT,
            text: "when [VARIABLE] button pressed",
            hideFromPalette: !this.variablesExist(),
            arguments: {
              VARIABLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
            },
          },
          {
            opcode: "isButtonPressed",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [VARIABLE] button pressed?",
            disableMonitor: true,
            hideFromPalette: !this.variablesExist(),
            arguments: {
              VARIABLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
            },
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: "<sep gap=\"6\"/><label text=\"Effects\"/><sep gap=\"-12\"/><sep gap=\"12\"/>",
            hideFromPalette: !this.variablesExist(),
          },
          {
            opcode: "setDisplay",
            blockType: Scratch.BlockType.COMMAND,
            text: "set display name of [VARIABLE] to [NAME]",
            hideFromPalette: !this.variablesExist(),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my cooler variable",
              },
              VARIABLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
            },
          },
          {
            opcode: "setFont",
            blockType: Scratch.BlockType.COMMAND,
            text: "set font of [VARIABLE] to [FONT]",
            hideFromPalette: !this.variablesExist(),
            arguments: {
              FONT: {
                type: Scratch.ArgumentType.STRING,
                menu: "allFonts",
                defaultValue: "Scratch",
              },
              VARIABLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
            },
          },
          "---",
          {
            opcode: "resetEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset effects of [VARIABLE]",
            hideFromPalette: !this.variablesExist(),
            arguments: {
              VARIABLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
            },
          },
          {
            opcode: "setEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [EFFECT] of [VARIABLE] to [AMOUNT]",
            hideFromPalette: !this.variablesExist(),
            arguments: {
              AMOUNT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              EFFECT: {
                type: Scratch.ArgumentType.STRING,
                menu: "EFFECTS",
                defaultValue: "blur",
              },
              VARIABLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
            },
          },
          {
            opcode: "currentEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "current [EFFECT] of [VARIABLE]",
            hideFromPalette: !this.variablesExist(),
            arguments: {
              VARIABLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
              EFFECT: {
                type: Scratch.ArgumentType.STRING,
                menu: "EFFECTS",
                defaultValue: "blur",
              },
            },
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: "<sep gap=\"12\"/><label text=\"No Variables Exist!\"/><sep gap=\"-6\"/><sep gap=\"24\"/>",
            hideFromPalette: this.variablesExist(),
          }
        ],
        menus: {
          variablesTypeMenu: {
            acceptReporters: true,
            items: [
              "normal readout",
              "large readout",
              "slider",
              "text",
              "checkbox",
              "color",
              "button",
              "file",
              "image",
              "audio"
            ],
          },
          sliderMaxMinMenu: {
            acceptReporters: false,
            items: ["min", "max"],
          },
          allFonts: {
            acceptReporters: true,
            items: "getFonts",
          },
          POSITIONS: {
            acceptReporters: false,
            items: ["x", "y"],
          },
          EFFECTS: {
            acceptReporters: false,
            items: [
              "blur",
              "saturation",
              "contrast",
              "brightness",
              "hue",
              "opacity",
              "sepia",
              "invert",
              "direction",
              "scale",
              "skew x",
              "skew y"
            ],
          },
        }
      }
    }

    alertWarning() {
      let popup = `WARNING: Monitors+ can easily Crash the Editor (only the Editor). To avoid these crashes:
      - DO NOT Double Click visible Monitors
      - DO NOT Right Click and Select visible Monitors popups`;
      alert(popup);
    }

    getFonts() {
      const customFonts = Scratch.vm.runtime.fontManager
        ? Scratch.vm.runtime.fontManager.getFonts().map((i) => ({
            text: i.name,
            value: i.family,
          }))
        : [];
      return [
        ...builtInFonts,
        ...customFonts,
      ];
    }

    findVariable(variable, sprite) {
      //support for all variable types
      const name = Scratch.Cast.toString(variable);
      const cloudID = runtime.getTargetForStage().lookupVariableByNameAndType(Scratch.Cast.toString("ÃƒÂ¢Ã‹ÂœÃ‚Â " + variable), "");
      if (cloudID) {
        return cloudID.id;
      }

      const myTarget = sprite.target.id;
      let varFind = "";
      for (const name of Object.getOwnPropertyNames(sprite.target.variables)) {
        varFind = sprite.target.variables[name].name;
        if (varFind === variable) {
          return sprite.target.variables[name].id;
        }
      }
      const ID = runtime.getTargetForStage().lookupVariableByNameAndType(variable, "");
      if (!ID) {
        return "";
      }
      return ID.id;
    }

    variablesExist() {
      // @ts-expect-error - Blockly not typed yet
      // eslint-disable-next-line no-undef
      const variables =
        typeof Blockly === "undefined"
          ? []
          : Blockly.getMainWorkspace()
            .getVariableMap()
            .getVariablesOfType("")
            .map((model) => model.name);
      return !!variables.length;
    }

    resetFormat(variableId) { 
      //reset to avoid Site Crashing
      runtime.requestUpdateMonitor(new Map([
        ["id", variableId],
        ["visible", false]
      ]));

      setTimeout(() => {
        runtime.requestUpdateMonitor(new Map([
          ["id", variableId],
          ["visible", true]
        ]));
      }, 50);
    }

    setVariableToType(args, util) {
      this.setMonitor(args.VARIABLE, util, args.VARIABLE, args.TYPE);
    }

    setDisplay(args, util) {
      const safeName = xmlEscape(args.NAME);
      const type = this.getMonitor(args.VARIABLE, util);
      let variableId = this.findVariable(args.VARIABLE, util);
      if (type === "normal readout" || type === "slider" || type === "large readout") {
        const variableMonitorLabel = document.querySelector(`[data-id="${variableId}"][class*="monitor_"] .monitor_label_ci1ok`);
        if (variableMonitorLabel) {
          variableMonitorLabel.textContent = args.NAME;
        }
      } else {
        this.setMonitor(args.VARIABLE, util, args.NAME, type);
      }
    }

    setMonitor(nameID, util, name, type) {
      let variableId = this.findVariable(nameID, util);
      const variableMonitor = document.querySelector(`[data-id="${variableId}"][class*="monitor_"]`);
      if (!variableMonitor) {
        return;
      }
      let newHTML;
      let typeElement;
      let isHex;
      let variableName = nameID;
      let toggleButtonClickFunction;

      const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i;
      const Vvalue = util.target.lookupOrCreateVariable(nameID, variableName).value;
      const isChecked = Vvalue === "true" || Vvalue === 1 ? true : false;
      variableName = name.replace(/[<>]/g, "");
      this.removeAllMonitorsUpdateListeners();

      switch (type) {
        case "large readout":
          this.resetFormat(variableId);
          var LState = vm.runtime.getMonitorState().get(variableId);
          state = state.set("mode", "large");
          vm.runtime.requestUpdateMonitor(state);
          break;
        case "slider":
          this.resetFormat(variableId);
          var SState = vm.runtime.getMonitorState().get(variableId);
          state = state.set("mode", "slider");
          vm.runtime.requestUpdateMonitor(state);
          break;
        case "text":
          this.setValue(nameID, "", util);
          newHTML = `
            <div class="monitor_default-monitor_2vCcZ">
              <div class="monitor_row_2y_kM">
                <div class="monitor_label_ci1ok">${variableName}</div>
              </div>
              <div class="monitor_row_2y_kM">
                <input type="text" id="text_${variableId}" class="monitor_slider_1CHwk no-drag" value="...">
              </div>
            </div>
          `;

          variableMonitor.innerHTML = newHTML;
          this.setValue(nameID, "...", util);
          typeElement = document.querySelector(`[id="text_${variableId}"]`)
          typeElement = removeAllEventListeners(typeElement);
          this.addMonitorsUpdateListener(() => {
            const variable = util.target.lookupOrCreateVariable(nameID, nameID);
            typeElement.value = variable.value;
          });
          typeElement.addEventListener("change", function (event) {
            if (event.target && event.target.id.startsWith(`text_${variableId}`)) {
              const variable = util.target.lookupOrCreateVariable(
              nameID, nameID);
              variable.value = typeElement.value;
            }
          });
          break;
        case "checkbox":
          this.setValue(nameID, isChecked, util);
          newHTML = `
            <div class="monitor_default-monitor_2vCcZ">
              <div class="monitor_row_2y_kM">
                <input type="checkbox" id="checkbox_${variableId}" class="monitor_slider_1CHwk no-drag" ${isChecked ? "checked" : ""}>
                <div class="monitor_label_ci1ok">${variableName}</div>
              </div>
            </div>
          `;

          variableMonitor.innerHTML = newHTML;
          typeElement = document.querySelector(`[id="checkbox_${variableId}"]`)
          typeElement = removeAllEventListeners(typeElement);
          this.addMonitorsUpdateListener(() => {
            const variable = util.target.lookupOrCreateVariable(nameID, nameID);
            typeElement.checked = variable.value === "false" ? 0 : variable.value;
          });
          typeElement.addEventListener("change", function (event) {
            if (event.target && event.target.id.startsWith(`checkbox_${variableId}`)) {
              const variable = util.target.lookupOrCreateVariable(
              nameID, nameID);
              variable.value = typeElement.checked;
            }
          });
          break;
        case "color":
          if (hexColorRegex.test(Vvalue)) {
            isHex = Vvalue;
          } else {
            isHex = "#ff0000";
          }
          this.setValue(nameID, isHex, util);
          newHTML = `
            <div class="monitor_default-monitor_2vCcZ">
              <div class="monitor_row_2y_kM">
                <div class="monitor_label_ci1ok">${variableName}</div>
              </div>
              <div class="monitor_row_2y_kM">
                <input type="color" id="color_${variableId}" class="monitor_slider_1CHwk no-drag" value="${isHex}">
              </div>
            </div>
          `;

          variableMonitor.innerHTML = newHTML;
          typeElement = document.querySelector(`[id="color_${variableId}"]`);
          typeElement = removeAllEventListeners(typeElement);
          this.addMonitorsUpdateListener(() => {
            const variable = util.target.lookupOrCreateVariable(nameID, nameID);
            typeElement.value = variable.value;
          });
          typeElement.addEventListener("change", function (event) {
            if (event.target && event.target.id.startsWith(`color_${variableId}`)) {
              const variable = util.target.lookupOrCreateVariable(nameID, nameID);
              variable.value = typeElement.value;
            }
          });
          break;
        case "button":
          newHTML = `
            <div class="monitor_default-monitor_2vCcZ">
              <div class="monitor_row_2y_kM">
                <input type="button" id="button_${variableId}" value="${variableName}" class="monitor_slider_1CHwk no-drag monitor-button">
              </div>
            </div>
          `;

          variableMonitor.innerHTML = newHTML;
          typeElement = document.querySelector(`[id="button_${variableId}"]`);
          toggleButtonClickFunction = () => this.toggleButtonClick(variableId);
          typeElement.onclick = toggleButtonClickFunction;
          typeElement.addEventListener("click", toggleButtonClickFunction);
          break;
        case "file":
          newHTML = `
            <div class="monitor_default-monitor_2vCcZ">
              <div class="monitor_row_2y_kM">
                <div class="monitor_label_ci1ok">${variableName}</div>
              </div>
              <div class="monitor_row_2y_kM">
                <input type="file" id="file_${variableId}" class="monitor_slider_1CHwk no-drag" value="0">
              </div>
            </div>
          `;

          variableMonitor.innerHTML = newHTML;
          typeElement = document.querySelector(`[id="file_${variableId}"]`)
          typeElement = removeAllEventListeners(typeElement);
          typeElement.addEventListener("change", function (event) {
            if (event.target && event.target.id === `file_${variableId}`) {
              const file = event.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                  const variable = util.target.lookupOrCreateVariable(nameID, variableName);
                  variable.value = reader.result;
                };
                reader.onerror = function (error) {
                  console.log("Error: ", error);
                };
              }
            }
          });
          break;
        case "image":
          newHTML = `
            <div class="monitor_default-monitor_2vCcZ">
              <div class="monitor_row_2y_kM">
                <div class="monitor_label_ci1ok">${variableName}</div>
              </div>
              <div class="monitor_row_2y_kM">
                 <img src="${Vvalue}" id="image_${variableId}" class="monitor_slider_1CHwk no-drag">
              </div>
            </div>
          `;

          variableMonitor.innerHTML = newHTML;
          typeElement = document.querySelector(`[id="image_${variableId}"]`);
          this.addMonitorsUpdateListener(() => {
            const variable = util.target.lookupOrCreateVariable(nameID, nameID);
            typeElement.src = variable.value;
          });
          break;
        case "audio":
          newHTML = `
            <div class="monitor_default-monitor_2vCcZ">
              <div class="monitor_row_2y_kM">
                <div class="monitor_label_ci1ok">${variableName}</div>
              </div>
              <div class="monitor_row_2y_kM">
                <audio id="audio_${variableId}" class="monitor_audio" src="${Vvalue}" controls></audio>
              </div>
            </div>
          `;

          variableMonitor.innerHTML = newHTML;
          typeElement = document.querySelector(`[id="audio_${variableId}"]`);
          this.addMonitorsUpdateListener(() => {
            const variable = util.target.lookupOrCreateVariable(nameID, nameID);
            typeElement.src = variable.value;
          });
          break;
        default: // Handle unknown monitor (default monitor)
          this.resetFormat(variableId);
          var state = vm.runtime.getMonitorState().get(variableId);
          state = state.set("mode", "default");
          vm.runtime.requestUpdateMonitor(state);
          break;
      }
    }

    addMonitorsUpdateListener(listener) {
      runtime.on("MONITORS_UPDATE", listener);
      this.monitorsUpdateListeners.push(listener);
    }
    removeAllMonitorsUpdateListeners() {
      for (const listener of this.monitorsUpdateListeners) {
        runtime.removeListener("MONITORS_UPDATE", listener);
      }
      this.monitorsUpdateListeners.length = 0;
    }

    toggleButtonClick(ID) {
      this.buttonName = ID;
      this.buttonClick = true;
      setTimeout(() => {
        this.buttonClick = false;
        this.buttonName = "";
      }, 100);
    }

    isButtonPressed(args, util) {
      const variableId = this.findVariable(args.VARIABLE, util);
      if (!variableId) {
        return false;
      }
      if (variableId === this.buttonName) {
        return (this.buttonClick);
      } else {
        return false;
      }
    }

    whenButtonPressed(args, util) {
      const variableId = this.findVariable(args.VARIABLE, util);
      if (!variableId) {
        return false;
      }
      if (variableId === this.buttonName) {
        return (this.buttonClick);
      } else {
        return false;
      }
    }

    getVariableType(args, util) {
      return this.getMonitor(args.VARIABLE, util);
    }

    getMonitor(variable, util) {
      const variableId = this.findVariable(variable, util);
      const variableMonitor = document.querySelector(`[data-id="${variableId}"][class*="monitor_"]`);
      if (!variableMonitor) {
        return "";
      }
      if (variableMonitor.querySelector("input[type=\"range\"]")) {
        return "slider";
      } else if (variableMonitor.querySelector("input[type=\"text\"]")) {
        return "text";
      } else if (variableMonitor.querySelector("input[type=\"checkbox\"]")) {
        return "checkbox";
      } else if (variableMonitor.querySelector("input[type=\"color\"]")) {
        return "color";
      } else if (variableMonitor.querySelector("input[type=\"button\"]")) {
        return "button";
      } else if (variableMonitor.querySelector("input[type=\"file\"]")) {
        return "file";
      } else if (variableMonitor.querySelector("input[type=\"image\"]")) {
        return "image";
      } else if (variableMonitor.querySelector("audio")) {
        return "audio";
      } else if (variableMonitor.querySelector(".monitor_large-value_P-rAm")) {
        return "large readout";
      } else {
        return "normal readout";
      }
    }

    setSliderMinMaxOfVaribleTo(args, util) {
      const variableId = this.findVariable(args.VARIABLE, util);
      this.resetFormat(variableId);
      var state = vm.runtime.getMonitorState().get(variableId);
      if (!state) {
        return "";
      }
      state = state.set("mode", "slider");
      runtime.requestUpdateMonitor(state);
      runtime.requestUpdateMonitor(new Map([
        ["id", variableId],
        ["sliderMin", args.MIN],
        ["sliderMax", args.MAX]
      ]));
    }

    sliderMinMaxOfVarible(args, util) {
      const variableId = this.findVariable(args.VARIABLE, util);
      const info = vm.runtime.getMonitorState().get(variableId);
      if (info === undefined) {
        return ""
      }
      if (args.MINMAX === "min") {
        return info.get("sliderMin");
      } else {
        return info.get("sliderMax");
      }
    }

    setColor(args, util) {
      this.setValue(args.VARIABLE, args.COLOR, util);
    }

    setValue(variableN, value, util) {
      const variableName = variableN; 
      const variable = util.target.lookupOrCreateVariable(
        variableN, variableName);
      variable.value = value;
    }

    isShowing(args, util) {
      const variableId = this.findVariable(args.VARIABLE, util);
      const info = runtime.getMonitorState().get(variableId);
      if (info) {
        return (info.get("visible") !== undefined && info.get("visible") !== false);
      } else {
        return false;
      }
    }

    setPosition(args, util) {
      const canvas = [runtime.stageWidth / 2, runtime.stageHeight / 2];
      const variableId = this.findVariable(args.VARIABLE, util);
      const variableMonitor = document.querySelector(`[data-id="${variableId}"][class*="monitor_"]`);
      if (!variableMonitor) {
        return;
      }
      const scaleSet = this.findScale(variableMonitor);
      this.varEffect(args.VARIABLE, "scale", 100, util);
      const sizeOffset = variableMonitor.getBoundingClientRect();
      let x = Scratch.Cast.toNumber(args.X * 0.725) + canvas[0] - 5 - (sizeOffset.width / 2);
      let y = canvas[1] - Scratch.Cast.toNumber(args.Y + 1) - 5 - (sizeOffset.height / 2);
      this.varEffect(args.VARIABLE, "scale", scaleSet, util);

      let styleAttribute = variableMonitor.getAttribute("style");
      const transformRegex = /transform:([^;]+);/;
      const transformMatch = styleAttribute.match(transformRegex);
      if (transformMatch) {
        const existingTransform = transformMatch[1];
        const updatedTransform = existingTransform.replace(/translate\([^)]+\)/, `translate(${x}px, ${y}px)`);
        styleAttribute = styleAttribute.replace(transformRegex, `transform:${updatedTransform};`);
        variableMonitor.setAttribute("style", styleAttribute);
      }
    }

    findScale(variableMonitor) {
      const currentTransform = variableMonitor.style.transform || "";
      const regex = new RegExp(`scale\\(([^)]+)\\)`);
      const transformMatch = currentTransform.match(regex);
      if (transformMatch) {
        const valueWithUnits = transformMatch[1];
        const scale = parseFloat(valueWithUnits.replace(/[^0-9.-]/g, ""));
        return scale * 100;
      } else {
        return 100;
      }
    }

    currentPos(args, util) {
      const canvas = [runtime.stageWidth / 2, runtime.stageHeight / 2];
      const variableId = this.findVariable(args.VARIABLE, util);
      const variableMonitor = document.querySelector(`[data-id="${variableId}"][class*="monitor_"]`);
      if (!variableMonitor) {
        return "";
      }
      const styleAttribute = variableMonitor.getAttribute("style");
      if (styleAttribute) {
        const match = styleAttribute.match(/transform\s*:\s*translate\((-?\d+(?:\.\d+)?px),\s*(-?\d+(?:\.\d+)?px)\)/);
        if (match) {
          const scaleSet = this.findScale(variableMonitor);
          this.varEffect(args.VARIABLE, "scale", 100, util);
          const sizeOffset = variableMonitor.getBoundingClientRect();
          let x = parseInt(match[1]);
          let y = parseInt(match[2]);
          x = x - canvas[0] + 5 + (sizeOffset.width / 2);
          y = canvas[1] - y - 6 - (sizeOffset.height / 2);
          this.varEffect(args.VARIABLE, "scale", scaleSet, util);
          if (args.POSITION === "x") {
            return (x * 0.275) * 5.01 + 1; //variable width is dynamic so x position is hard to calculate exactly
          } else {
            return y < 162.6 ? y - 0.5 : y + 0.5;
          }
        }
      }
      return "";
    }

    resetEffects(variableId, currentTransform) {
      const variableMonitor = document.querySelector(`[data-id="${variableId}"][class*="monitor_"]`);
      if (!variableMonitor) {
        return;
      }
      const translationRegex = /translate\(([^,]+),\s*([^)]+)\)/;
      const matches = currentTransform.match(translationRegex);
      const translation = matches ? `translate(${matches[1]}, ${matches[2]})` : '';
      variableMonitor.style.filter = "";
      variableMonitor.style.transform = translation;
    }

    setEffect(args, util) {
      this.varEffect(args.VARIABLE, args.EFFECT, args.AMOUNT, util);
    }

    varEffect(VARIABLE, EFFECT, AMOUNT, util) {
      const variableId = this.findVariable(VARIABLE, util);
      const variableMonitor = document.querySelector(`[data-id="${variableId}"][class*="monitor_"]`);
      if (!variableMonitor) {
        return;
      }
      let currentTransform = variableMonitor.style.transform || "";
      let currentFilterEffect = variableMonitor.style.filter || "";
      let setEffect = EFFECT;
      let amountIn = AMOUNT;

      if (setEffect === "saturation") {
        setEffect = "saturate";
      } else if (setEffect === "hue") {
        setEffect = "hue-rotate";
      } else if (setEffect === "direction") {
        setEffect = "rotate";
        amountIn = AMOUNT - 90;
      } else if (setEffect === "scale") {
        amountIn = AMOUNT / 100;
      } else if (setEffect === "brightness") {
        amountIn = AMOUNT + 100;
      } else if (setEffect === "skew x") {
        setEffect = "skewX";
      } else if (setEffect === "skew y") {
        setEffect = "skewY";
      }
      const regex = new RegExp(`${setEffect}\\([^)]+\\)`, "g");
      currentTransform = currentTransform.replace(regex, "").trim();
      currentFilterEffect = currentFilterEffect.replace(regex, "").trim();
      if (setEffect === "scale" || setEffect === "rotate" || setEffect.includes("skew")) {
        currentTransform += ` ${setEffect}(${amountIn}${setEffect === "rotate" || setEffect.includes("skew") ? "deg" : ""})`;
        variableMonitor.style.transform = currentTransform.trim();
      } else {
        currentFilterEffect += ` ${setEffect}(${amountIn}${setEffect === "blur" ? "px" : setEffect === "hue-rotate" ? "deg" : "%"})`;
        variableMonitor.style.filter = currentFilterEffect.trim();
      }
    }

    currentEffect(args, util) {
      const variableId = this.findVariable(args.VARIABLE, util);
      const variableMonitor = document.querySelector(`[data-id="${variableId}"][class*="monitor_"]`);
      if (!variableMonitor) {
        return "";
      }
      const currentTransform = variableMonitor.style.transform || "";
      const currentFilterEffect = variableMonitor.style.filter || "";
      const setEffect = {
        saturation: "saturate",
        hue: "hue-rotate",
        direction: "rotate",
        scale: "scale",
        brightness: "brightness",
        opacity: "opacity",
        "skew x": "skewX",
        "skew y": "skewY",
      }[args.EFFECT] || args.EFFECT;
      const defaultV = {
        saturation: 100,
        hue: 0,
        direction: 90,
        scale: 100,
        brightness: 0,
        opacity: 100,
      }[args.EFFECT] || 0;

      const regex = new RegExp(`${setEffect}\\(([^)]+)\\)`);
      const transformMatch = currentTransform.match(regex);
      const filterMatch = currentFilterEffect.match(regex);
      if (filterMatch || transformMatch) {
        const valueWithUnits = (filterMatch || transformMatch)[1];
        const numericValue = parseFloat(valueWithUnits.replace(/[^0-9.-]/g, ""));
        if (setEffect === "brightness") {
          return numericValue - 100;
        } else if (setEffect === "rotate") {
          return numericValue + 90;
        } else if (setEffect === "scale") {
          return numericValue * 100;
        } else {
          return numericValue;
        }
      } else {
        return defaultV;
      }
    }

    resetEffect(args, util) {
      const variableId = this.findVariable(args.VARIABLE, util);
      const variableMonitor = document.querySelector(`[data-id="${variableId}"][class*="monitor_"]`);
      if (!variableMonitor) {
        return;
      }
      let currentTransform = variableMonitor.style.transform || "";
      this.resetEffects(variableId, currentTransform);
    }

    setFont(args, util) {
      const variableId = this.findVariable(args.VARIABLE, util);
      const variableMonitor = document.querySelector(`[data-id="${variableId}"][class*="monitor_"]`);
      if (!variableMonitor) {
        return;
      }
      variableMonitor.style.fontFamily = args.FONT;
    }
  }

  Scratch.extensions.register(new MonitorsPlus());
})(Scratch);
