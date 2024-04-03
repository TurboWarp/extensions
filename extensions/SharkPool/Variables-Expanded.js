// Name: Variables Expanded
// ID: DICandSPmonitorsPlus
// Description: Expansion of Monitor Types and Variable Blocks.
// By: SharkPool and DogeIsCut

// Version 1.3.2

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Variables Expanded must run unsandboxed!");

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzMjEiIGhlaWdodD0iMzIxIiB2aWV3Qm94PSIwLDAsMzIxLDMyMSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTc5LjUsLTE5LjUpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNOTQsMTgwYzAsLTgwLjYzMzU3IDY1LjM2NjQyLC0xNDYgMTQ2LC0xNDZjODAuNjMzNTgsMCAxNDYsNjUuMzY2NDMgMTQ2LDE0NmMwLDgwLjYzMzU4IC02NS4zNjY0MiwxNDYgLTE0NiwxNDZjLTgwLjYzMzU4LDAgLTE0NiwtNjUuMzY2NDIgLTE0NiwtMTQ2eiIgZmlsbD0iI2ZmOGMxYSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0xNjkuMDg3MzIsODQuMDM5NzRjNi4yMTQ2MSwyLjczMDg3IDkuMDQ1MDIsOS45Nzc2MyA2LjMyNjQyLDE2LjE5NzYxYy05LjQ4MDc2LDIxLjc0MDEgLTE0LjM1NDY2LDQ1LjIwODYxIC0xNC4zMTQ0NSw2OC45MjYwMmMwLDI0LjUzMDI3IDUuMTIwMjEsNDcuODI5NzMgMTQuMzI2NzYsNjguOTI2MDJjMi40NzI4OSw2LjE3MzU1IC0wLjQwNTQxLDEzLjE5NDk2IC02LjUwMDA2LDE1Ljg1NjM4Yy02LjA5NDY0LDIuNjYxNDIgLTEzLjIwMTE4LDAuMDAwMTkgLTE2LjA0ODYxLC02LjAwOTgxYy0xMC44NDQ4LC0yNC44NDQwMiAtMTYuNDI2ODYsLTUxLjY2NDc3IC0xNi4zOTQ1NCwtNzguNzcyNTljMCwtMjcuOTg4ODggNS44NDY0LC01NC42NDg0OCAxNi4zOTQ1NCwtNzguNzcyNTljMS4zMDY4OCwtMi45OTIxOSAzLjc0OTEzLC01LjM0MjQ2IDYuNzg5MjgsLTYuNTMzNThjMy4wNDAxMiwtMS4xOTExMiA2LjQyODk2LC0xLjEyNTQ2IDkuNDIwNjYsMC4xODI1NHpNMjcxLjM4MDkyLDEzMi4yMzg3MmMtMTEuMjE0NjcsMC4wMDI1MiAtMjEuODIwNDIsNS4xMDE2MiAtMjguODI1ODUsMTMuODU5MDZsLTQuMDM3MSw1LjA0NjM2bC0xLjM2NjIxLC0zLjQzMzk5Yy0zLjczNzYsLTkuMzQwOCAtMTIuNzgzMjIsLTE1LjQ2NzA3IC0yMi44NDQwNiwtMTUuNDcxNDNoLTMuOTc1NTZjLTYuNzk3NjQsMCAtMTIuMzA4MjIsNS41MTA1OCAtMTIuMzA4MjIsMTIuMzA4MjJjMCw2Ljc5NzY0IDUuNTEwNTgsMTIuMzA4MjIgMTIuMzA4MjIsMTIuMzA4MjJoMy45NzU1Nmw2LjU0Nzk3LDE2LjM2OTkybC0xMi43MzksMTUuOTM5MTRjLTIuMzM2ODUsMi45MTg3MyAtNS44NzM3NSw0LjYxNjk5IC05LjYxMjcyLDQuNjE1NTloLTAuNDgwMDJjLTYuNzk3NjQsMCAtMTIuMzA4MjIsNS41MTA1NyAtMTIuMzA4MjIsMTIuMzA4MjJjMCw2Ljc5NzY0IDUuNTEwNTcsMTIuMzA4MjIgMTIuMzA4MjIsMTIuMzA4MjJoMC40ODAwMmMxMS4yMTQ2NywtMC4wMDI1MiAyMS44MjA0MSwtNS4xMDE2MiAyOC44MjU4NSwtMTMuODU5MDZsNC4wMzcxLC01LjA0NjM2bDEuMzY2MjIsMy40MzRjMy43MzkyNiw5LjM0NDk2IDEyLjc5MTA0LDE1LjQ3MjExIDIyLjg1NjM3LDE1LjQ3MTQzaDMuOTc1NTVjNi43OTc2NCwwIDEyLjMwODIyLC01LjUxMDU4IDEyLjMwODIyLC0xMi4zMDgyMmMwLC02Ljc5NzY0IC01LjUxMDU4LC0xMi4zMDgyMiAtMTIuMzA4MjIsLTEyLjMwODIyaC0zLjk3NTU1bC02LjU0Nzk4LC0xNi4zNjk5MmwxMi43MzkwMSwtMTUuOTM5MTNjMi4zMzY4NiwtMi45MTg3MyA1Ljg3Mzc2LC00LjYxNjk4IDkuNjEyNzMsLTQuNjE1NTloMC40ODAwMWM2Ljc5NzY1LDAgMTIuMzA4MjIsLTUuNTEwNTggMTIuMzA4MjIsLTEyLjMwODIyYzAsLTYuNzk3NjQgLTUuNTEwNTcsLTEyLjMwODIyIC0xMi4zMDgyMiwtMTIuMzA4MjJoLTAuNDgwMDF6TTI5NC40NDY1MSwxMDAuMjM3MzdjLTIuNjc2MjMsLTYuMjIxMTEgMC4xNzYxNCwtMTMuNDM1NTMgNi4zODMwNiwtMTYuMTQ0NTFjNi4yMDY5MywtMi43MDg5NyAxMy40MzYyNywwLjEwNTM0IDE2LjE3NzksNi4yOTc5M2MxMC44NDkwMiwyNC44NDMxMSAxNi40MzUzLDUxLjY2MzkxIDE2LjQwNjg2LDc4Ljc3MjZjMCwyNy45ODg4OCAtNS44NDYzOSw1NC42NDg0OCAtMTYuMzk0NTQsNzguNzcyNmMtMS42Njg2Niw0LjE2NTc0IC01LjQ3MjI0LDcuMDkzMTggLTkuOTI2MzMsNy42Mzk4M2MtNC40NTQwOSwwLjU0NjY1IC04Ljg1MjcsLTEuMzc0MTQgLTExLjQ3OTE3LC01LjAxMjczYy0yLjYyNjQ3LC0zLjYzODYxIC0zLjA2NDUsLTguNDE4MjggLTEuMTQzMTUsLTEyLjQ3MzY3YzkuNDg1MzIsLTIxLjczOTA4IDE0LjM2MzQ1LC00NS4yMDc3MSAxNC4zMjY3OCwtNjguOTI2MDFjMCwtMjQuNTMwMjcgLTUuMTIwMjIsLTQ3LjgyOTc0IC0xNC4zMzkwOCwtNjguOTI2MDJ6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PGcgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjk1LjEwNTIxLDMwOC45OTEwMmMtMTAuMjYxNjgsMCAtMTguNTgwNDIsLTguMzE4NzMgLTE4LjU4MDQyLC0xOC41ODA0MXYtOTAuNDI0NjdjMCwtMTAuMjYxNjggOC4zMTg3MywtMTguNTgwNDEgMTguNTgwNDIsLTE4LjU4MDQxaDEuMjM4N2MxMC4yNjE2OCwwIDE4LjU4MDQxLDguMzE4NzMgMTguNTgwNDEsMTguNTgwNDF2OTAuNDI0NjdjMCwxMC4yNjE2OCAtOC4zMTg3MywxOC41ODA0MSAtMTguNTgwNDEsMTguNTgwNDF6IiBmaWxsPSIjZmY4YzFhIiBzdHJva2U9IiNmZjhjMWEiIHN0cm9rZS13aWR0aD0iMTIuNSIvPjxwYXRoIGQ9Ik0yMzEuOTMxODIsMjQ0LjU3ODkzYzAsLTEwLjI2MTY4IDguMzE4NzQsLTE4LjU4MDQyIDE4LjU4MDQxLC0xOC41ODA0Mmg5MC40MjQ2NmMxMC4yNjE2OCwwIDE4LjU4MDQsOC4zMTg3MyAxOC41ODA0LDE4LjU4MDQydjEuMjM4N2MwLDEwLjI2MTY5IC04LjMxODcyLDE4LjU4MDQgLTE4LjU4MDQsMTguNTgwNGgtOTAuNDI0NjZjLTEwLjI2MTY3LDAgLTE4LjU4MDQxLC04LjMxODczIC0xOC41ODA0MSwtMTguNTgwNHoiIGZpbGw9IiNmZjhjMWEiIHN0cm9rZT0iI2ZmOGMxYSIgc3Ryb2tlLXdpZHRoPSIxMi41Ii8+PHBhdGggZD0iTTIzOS44ODAxMiwyNDQuNzkwMDZjMCwtNi43NjM1MSA1LjQ4MjkxLC0xMi4yNDY0MSAxMi4yNDY0MiwtMTIuMjQ2NDFoODcuMjk5M2M2Ljc2MzUxLDAgMTIuMjQ2NDIsNS40ODI5IDEyLjI0NjQyLDEyLjI0NjQxdjAuODE2NDVjMCw2Ljc2MzUxIC01LjQ4MjkxLDEyLjI0NjQyIC0xMi4yNDY0MiwxMi4yNDY0MmgtODcuMjk5M2MtNi43NjM1MSwwIC0xMi4yNDY0MiwtNS40ODI5MiAtMTIuMjQ2NDIsLTEyLjI0NjQyeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMjk2LjE4NDM5LDE4OS4zMDIxOWM2Ljc2MzUxLDAgMTIuMjQ2NDEsNS40ODI5MSAxMi4yNDY0MSwxMi4yNDY0MXY4Ny4yOTkzYzAsNi43NjM1MSAtNS40ODI5LDEyLjI0NjQyIC0xMi4yNDY0MSwxMi4yNDY0MmgtMC44MTY0NWMtNi43NjM1MSwwIC0xMi4yNDY0MiwtNS40ODI5MSAtMTIuMjQ2NDEsLTEyLjI0NjQyYzAsMCAwLC00OS4yMzE5NSAwLC02NC44NjIyN2MwLC04Ljg0ODEzIDAsLTIyLjQzNzA0IDAsLTIyLjQzNzA0YzAsLTYuNzYzNTEgNS40ODI5MSwtMTIuMjQ2NDEgMTIuMjQ2NDIsLTEyLjI0NjQyeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PHBhdGggZD0iTTg3LDE4MGMwLC04NC40OTk1NyA2OC41MDA0MywtMTUzIDE1MywtMTUzYzg0LjQ5OTU3LDAgMTUzLDY4LjUwMDQzIDE1MywxNTNjMCw4NC40OTk1NyAtNjguNTAwNDMsMTUzIC0xNTMsMTUzYy04NC40OTk1NywwIC0xNTMsLTY4LjUwMDQzIC0xNTMsLTE1M3oiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjZGI2ZTAwIiBzdHJva2Utd2lkdGg9IjE1Ii8+PC9nPjwvZz48L3N2Zz4=";

  const xmlEscape = function (unsafe) {
    return Scratch.Cast.toString(unsafe).replace(/[<>&'"]/g, c => {
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

  const builtInFonts = ["Sans Serif", "Serif", "Handwriting", "Marker", "Curly", "Pixel"];

  runtime.on("BEFORE_EXECUTE", () => { runtime.startHats("DICandSPmonitorsPlus_whenButtonPressed"); });

  class MonitorsPlus {
    constructor() {
      this.varButtonStatus = {};
      this.monitorsUpdateListeners = [];
    }
    getInfo() {
      return {
        id: "DICandSPmonitorsPlus",
        name: "Variables Expanded",
        color1: "#FF8C1A",
        color2: "#e67e17",
        color3: "#cc7015",
        menuIconURI,
        blocks: [
          {
            func: "notify",
            blockType: Scratch.BlockType.BUTTON,
            text: "Editor Debugging"
          },
          {
            opcode: "exists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "does [VARIABLE] exist?",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, defaultValue: "my variable" }
            },
          },
          {
            opcode: "isShowing",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [VARIABLE] showing?",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          {
            opcode: "setVis",
            blockType: Scratch.BlockType.COMMAND,
            text: "[VIS] variable [VAR]",
            arguments: {
              VAR: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" },
              VIS: { type: Scratch.ArgumentType.STRING, menu: "VISIBLE" }
            },
          },
          "---",
          {
            opcode: "setString",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [VARIABLE] to [STRING]",
            arguments: {
              STRING: { type: Scratch.ArgumentType.STRING, defaultValue: 0 },
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          {
            opcode: "setColor",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [VARIABLE] to [COLOR]",
            arguments: {
              COLOR: { type: Scratch.ArgumentType.COLOR },
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          {
            opcode: "swapVars",
            blockType: Scratch.BlockType.COMMAND,
            text: "swap [VAR1] with [VAR2]",
            arguments: {
              VAR1: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" },
              VAR2: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          {
            opcode: "reportVal",
            blockType: Scratch.BlockType.REPORTER,
            text: "value of [VARIABLE]",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          "---",
          {
            opcode: "makeVariable",
            blockType: Scratch.BlockType.COMMAND,
            text: "create variable named [VARIABLE] [TYPE]",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, defaultValue: "my variable 2" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "variableTypeCreate" }
            },
          },
          {
            opcode: "deleteVariable",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete variable named [VARIABLE]",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, defaultValue: "my variable 2" }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Positioning" },
          {
            opcode: "setPosition",
            blockType: Scratch.BlockType.COMMAND,
            text: "set position of [VARIABLE] to x: [X] y: [Y]",
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          {
            opcode: "currentPos",
            blockType: Scratch.BlockType.REPORTER,
            text: "current [POSITION] of [VARIABLE]",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" },
              POSITION: { type: Scratch.ArgumentType.STRING, menu: "POSITIONS" }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Variable Monitors" },
          {
            opcode: "setVariableToType",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [VARIABLE] monitor type to [TYPE]",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "variablesTypeMenu" }
            },
          },
          {
            opcode: "getVariableType",
            blockType: Scratch.BlockType.REPORTER,
            text: "monitor type of [VARIABLE]",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Sliders" },
          {
            opcode: "setSliderMinMaxOfVaribleTo",
            blockType: Scratch.BlockType.COMMAND,
            text: "set slider min [MIN] and max [MAX] of [VARIABLE]",
            arguments: {
              MIN: { type: Scratch.ArgumentType.NUMBER, defaultValue: -100 },
              MAX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          {
            opcode: "sliderMinMaxOfVarible",
            blockType: Scratch.BlockType.REPORTER,
            text: "slider [MINMAX] of [VARIABLE]",
            arguments: {
              MINMAX: { type: Scratch.ArgumentType.STRING, menu: "sliderMenu" },
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Buttons" },
          {
            opcode: "whenButtonPressed",
            blockType: Scratch.BlockType.HAT,
            isEdgeActivated: false,
            text: "when [VARIABLE] button [TYPE]",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "BUTTON_CLICK" }
            },
          },
          {
            opcode: "isButtonPressed",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [VARIABLE] button [TYPE]?",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "BUTTON_CLICK" }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Effects" },
          {
            opcode: "setDisplay",
            blockType: Scratch.BlockType.COMMAND,
            text: "set display name of [VARIABLE] to [NAME]",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "my cooler variable" },
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          {
            opcode: "setFont",
            blockType: Scratch.BlockType.COMMAND,
            text: "set font of [VARIABLE] to [FONT]",
            arguments: {
              FONT: { type: Scratch.ArgumentType.STRING, menu: "allFonts" },
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          "---",
          {
            opcode: "resetEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset effects of [VARIABLE]",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          {
            opcode: "setEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [EFFECT] of [VARIABLE] to [AMOUNT]",
            arguments: {
              AMOUNT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTS" },
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          {
            opcode: "currentEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "current [EFFECT] of [VARIABLE]",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" },
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTS" }
            },
          },
        ],
        menus: {
          variablesTypeMenu: {
            acceptReporters: true,
            items: [
              "normal readout", "large readout", "slider",
              // Custom
              "text", "checkbox", "color",
              "button", "file", "image", "audio"
            ]
          },
          sliderMenu: ["min", "max"],
          variableMenu: { acceptReporters: true, items: "getVariables" },
          allFonts: { acceptReporters: true, items: "getFonts" },
          variableTypeCreate: ["globally", "for this sprite only"],
          POSITIONS: ["x", "y"],
          BUTTON_CLICK: ["clicked", "held"],
          VISIBLE: { acceptReporters: true, items: ["show", "hide"] },
          EFFECTS: {
            acceptReporters: true,
            items: [
              "blur", "saturation", "contrast", "brightness",
              "hue", "opacity", "sepia", "invert", "direction",
              "scale x", "scale y", "skew x", "skew y"
            ]
          },
        }
      }
    }

    // Helper Functions

    notify() {
      alert(
        "Upon Double-Clicking New Monitors, it will open up the Debug Menu" +
        "\n\nThis feature is only accessible within the Editor and can be reset by using the set monitor block"
      );
    }

    getVariables() {
      const globalVars = Object.values(vm.runtime.getTargetForStage().variables).filter((x) => x.type == "");
      const localVars = Object.values(vm.editingTarget.variables).filter((x) => x.type == "");
      const uniqueVars = [...new Set([...globalVars, ...localVars])];
      if (uniqueVars.length === 0) return ["make a variable"];
      return uniqueVars.map((i) => (Scratch.Cast.toString(i.name)));
    }

    getFonts() {
      const customFonts = Scratch.vm.runtime.fontManager ? Scratch.vm.runtime.fontManager.getFonts().map((i) => ({text: i.name, value: i.family})) : [];
      return [ ...builtInFonts, ...customFonts ];
    }

    findVariable(variable, sprite) {
      //support for all variable types
      const cloudID = runtime.getTargetForStage().lookupVariableByNameAndType(Scratch.Cast.toString("ÃƒÂ¢Ã‹ÂœÃ‚Â " + variable), "");
      if (cloudID) return cloudID.id;
      let varFind = "";
      for (const name of Object.getOwnPropertyNames(sprite.target.variables)) {
        varFind = sprite.target.variables[name].name;
        if (varFind === variable) return sprite.target.variables[name].id;
      }
      const ID = runtime.getTargetForStage().lookupVariableByNameAndType(variable, "");
      if (!ID) return "";
      return ID.id;
    }

    resetFormat(variableId) {
      // Use to avoid formatting and GUI errors when switching to and from custom monitors
      runtime.requestUpdateMonitor(new Map([
        ["id", variableId],
        ["visible", false]
      ]));
      setTimeout(() => {
        runtime.requestUpdateMonitor(new Map([
          ["id", variableId],
          ["visible", true]
        ]));
      }, 30);
    }

    refresh() {
      // Use to refresh the toolbox to show new/deleted variables
      if (!runtime.isPackaged) {
        Scratch.vm.emitWorkspaceUpdate();
        window.ScratchBlocks.getMainWorkspace().toolboxRefreshEnabled_ = true;
        window.ScratchBlocks.getMainWorkspace().refreshToolboxSelection_();
        window.ScratchBlocks.getMainWorkspace().toolboxRefreshEnabled_ = false;
        setTimeout(function() { vm.runtime.requestBlocksUpdate() }, 10);
      }
    }

    generateId() {
      // Used for creating new variables
      const soup = "!#%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const id = [];
      for (let i = 0; i < 20; i++) {
        id[i] = soup.charAt(Math.random() * soup.length);
      }
      return id.join("");
    }

    reAddDeleted(variable, id, name, util) {
      // use to reimplement changed styles of monitors
      const waitAndExecute = () => {
        if (!this.isShowing({VARIABLE : name}, util)) {
          setTimeout(waitAndExecute, 5);
          return;
        }
        setTimeout(() => {
          const variableMonitor = document.querySelector(`[data-id="${id}"][class*="monitor"]`);
          const inlineStyles = variable.getAttribute("style");
          if (variableMonitor.style) variableMonitor.style = inlineStyles;
        }, 10);
      };
      waitAndExecute();
    }

    setValue(variableN, value, util) {
      const variable = util.target.lookupOrCreateVariable(variableN, variableN);
      variable.value = value;
    }

    resetEffects(variableId, currentTransform) {
      const variableMonitor = document.querySelector(`[data-id="${variableId}"][class*="monitor"]`);
      if (!variableMonitor) return;
      const translationRegex = /translate\(([^,]+),\s*([^)]+)\)/;
      const matches = currentTransform.match(translationRegex);
      const translation = matches ? `translate(${matches[1]}, ${matches[2]})` : "";
      variableMonitor.style.filter = "";
      variableMonitor.style.transform = translation;
    }

    // Block Functions

    isShowing(args, util) {
      const info = runtime.getMonitorState().get(this.findVariable(args.VARIABLE, util));
      return info ? (info.get("visible") !== undefined && info.get("visible") !== false) : false;
    }

    exists(args, util) { return Scratch.Cast.toBoolean(this.findVariable(args.VARIABLE, util)) }

    setVis(args, util) {
      const variable = util.target.lookupVariableByNameAndType(args.VAR, "");
      if (!variable) return;
      runtime.monitorBlocks.changeBlock({
        id: variable.id, element: "checkbox", value: args.VIS === "show"
      }, runtime);
    }

    setString(args, util) { this.setValue(args.VARIABLE, args.STRING, util) }
    setColor(args, util) { this.setValue(args.VARIABLE, args.COLOR, util) }

    swapVars(args, util) {
      let var1 = Scratch.Cast.toString(args.VAR1);
      let var2 = Scratch.Cast.toString(args.VAR2);
      var1 = util.target.lookupOrCreateVariable(var1, var1);
      var2 = util.target.lookupOrCreateVariable(var2, var2);
      const temp = var1.value;
      var1.value = var2.value;
      var2.value = temp;
    }

    reportVal(args, util) {
      const variableId = this.findVariable(args.VARIABLE, util);
      if (!variableId) return 0;
      const variable = util.target.lookupVariableById(variableId);
      return variable.value;
    }

    makeVariable(args, util) {
      if (args.TYPE === "for this sprite only") util.target.lookupOrCreateVariable(this.generateId(), args.VARIABLE, "");
      else runtime.createNewGlobalVariable(args.VARIABLE, "");
      return this.refresh();
    }

    deleteVariable(args, util) {
      const variableId = this.findVariable(args.VARIABLE, util);
      if (variableId) {
        runtime.getTargetForStage().deleteVariable(variableId)
        util.target.deleteVariable(variableId);
        return this.refresh();
      }
    }

    setPosition(args, util) {
      const canvas = [Scratch.vm.runtime.stageWidth / 2, Scratch.vm.runtime.stageHeight / 2];
      const variableId = this.findVariable(args.VARIABLE, util);
      const variableMonitor = document.querySelector(`[data-id="${variableId}"][class*="monitor"]`);
      if (!variableMonitor) return;
      let x = Scratch.Cast.toNumber(args.X) + canvas[0] - (variableMonitor.offsetWidth / 2);
      let y = (Scratch.Cast.toNumber(args.Y) - canvas[1] + (variableMonitor.offsetHeight / 2)) * -1;
      x = x - (parseInt(variableMonitor.style.left) || 5);
      y = y - (parseInt(variableMonitor.style.top) || 5);

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

    currentPos(args, util) {
      const canvas = [Scratch.vm.runtime.stageWidth / 2, Scratch.vm.runtime.stageHeight / 2];
      const variableId = this.findVariable(args.VARIABLE, util);
      const variableMonitor = document.querySelector(`[data-id="${variableId}"][class*="monitor"]`);
      if (!variableMonitor) return "";

      const styleAttribute = variableMonitor.getAttribute("style");
      if (styleAttribute) {
        const match = styleAttribute.match(/transform\s*:\s*translate\((-?\d+(?:\.\d+)?px),\s*(-?\d+(?:\.\d+)?px)\)/);
        if (match) {
          if (args.POSITION === "x") return Math.round(parseInt(match[1]) - canvas[0] + (variableMonitor.offsetWidth / 2)) + parseInt(variableMonitor.style.left);
          else return Math.round(((parseInt(match[2]) * -1) + canvas[1]) - (variableMonitor.offsetHeight / 2) - parseInt(variableMonitor.style.top)) - 1;
        }
      }
      return "";
    }

    setSliderMinMaxOfVaribleTo(args, util) {
      const variableId = this.findVariable(args.VARIABLE, util);
      if (!(this.getMonitor(args.VARIABLE, util).includes("readout") || this.getMonitor(args.VARIABLE, util) === "slider")) {
        this.resetFormat(variableId);
      }
      var state = runtime.getMonitorState().get(variableId);
      if (!state) return "";
      state = state.set("mode", "slider");
      runtime.requestUpdateMonitor(state);
      runtime.requestUpdateMonitor(new Map([
        ["id", variableId],
        ["sliderMin", Scratch.Cast.toNumber(args.MIN)],
        ["sliderMax", Scratch.Cast.toNumber(args.MAX)]
      ]));
    }

    sliderMinMaxOfVarible(args, util) {
      const variableId = this.findVariable(args.VARIABLE, util);
      const info = runtime.getMonitorState().get(variableId);
      if (info === undefined) return 0;
      return info.get(args.MINMAX === "min" ? "sliderMin" : "sliderMax");
    }

    async setVariableToType(args, util) { await this.setMonitor(args.VARIABLE, util, args.VARIABLE, args.TYPE) }

    // Set variable monitor, we use the same class names to avoid losing css
    async setMonitor(nameID, util, name, type) {
      let variableId = this.findVariable(nameID, util);
      const oldStyle = document.querySelector(`[data-id="${variableId}"][class*="monitor"]`);
      if (type.includes("readout") || type === "slider") {
        if (!(this.getMonitor(nameID, util).includes("readout") || this.getMonitor(nameID, util) === "slider")) {
          this.resetFormat(variableId);
        }
      }
      if (!type.includes("readout") && type !== "slider") {
        var state2 = vm.runtime.getMonitorState().get(variableId);
        vm.runtime.requestUpdateMonitor(state2.set("mode", "default"));
        let i;
        await new Promise(resolve => { const wait = () => {
          if (i) resolve();
          else {
            i = runtime.getMonitorState().get(variableId).get("visible");
            setTimeout(wait, 5);
          }};
          wait();
        });
      }

      const variableMonitor = document.querySelector(`[data-id="${variableId}"][class*="monitor"]`);
      if (!variableMonitor) return;
      let typeElement, isHex, buttonClickFunc, container;

      const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i;
      const Vvalue = xmlEscape(util.target.lookupOrCreateVariable(nameID, nameID).value);
      const isChecked = Vvalue === "true" || Vvalue === 1 ? true : false;
      nameID = name.replace(/[<>]/g, "");
      this.removeAllMonitorsUpdateListeners();
      if (type.includes("readout") || type === "slider") {
        var state = vm.runtime.getMonitorState().get(variableId);
        vm.runtime.requestUpdateMonitor(state.set("mode", "large"));
      } else {
        let oldMonitor = variableMonitor.querySelector(`[class^="monitor_default-monitor"]:not(.monitor_default-monitor_SPnew1)`);
        if (!oldMonitor) oldMonitor = variableMonitor.querySelector(`[class^="sc-monitor-inner"] [class^="sc-monitor-row"]`);
        oldMonitor.style.display = "none";
      }
      switch (type) {
        case "large readout":
          state = state.set("mode", "large");
          vm.runtime.requestUpdateMonitor(state);
          break;
        case "slider":
          state = state.set("mode", "slider");
          vm.runtime.requestUpdateMonitor(state);
          break;
        case "text":
          if (variableMonitor.querySelector(`[class^="monitor_default-monitor_SPnew1"`)) {
            container = variableMonitor.querySelector(`[class^="monitor_default-monitor_SPnew1"`);
          } else {
            container = document.createElement("div");
            container.className = "monitor_default-monitor_SPnew1";
            container.setAttribute("style", "padding: 5px 5px 5px 5px");
          }
          container.innerHTML = `
            <div class="monitor_row_2y_kM">
              <div class="monitor_label_ci1ok">${nameID}</div>
            </div>
            <div class="monitor_row_2y_kM">
              <input type="text" id="text_${variableId}" class="monitor_slider_1CHwk no-drag" value="${Vvalue}">
            </div>`;
          variableMonitor.appendChild(container);
          typeElement = container.querySelector(`[id="text_${variableId}"]`);
          typeElement = removeAllEventListeners(typeElement);

          this.addMonitorsUpdateListener(() => {
            const variable = util.target.lookupOrCreateVariable(nameID, nameID);
            typeElement.value = xmlEscape(variable.value);
          });
          typeElement.addEventListener("change", function (event) {
            if (event.target && event.target.id.startsWith(`text_${variableId}`)) {
              const variable = util.target.lookupOrCreateVariable(nameID, nameID);
              variable.value = typeElement.value;
            }
          });
          break;
        case "checkbox":
          if (variableMonitor.querySelector(`[class^="monitor_default-monitor_SPnew1"]`)) {
            container = variableMonitor.querySelector(`[class^="monitor_default-monitor_SPnew1"]`);
          } else {
            container = document.createElement("div");
            container.className = "monitor_default-monitor_SPnew1";
            container.setAttribute("style", "padding: 5px 5px 5px 5px");
          }
          container.innerHTML = `
            <div class="monitor_row_2y_kM">
              <input type="checkbox" id="checkbox_${variableId}" class="monitor_slider_1CHwk no-drag" ${isChecked ? "checked" : ""}>
              <div class="monitor_label_ci1ok">${nameID}</div>
            </div>`;
          variableMonitor.appendChild(container);
          typeElement = container.querySelector(`[id="checkbox_${variableId}"`);
          typeElement = removeAllEventListeners(typeElement);

          this.addMonitorsUpdateListener(() => {
            const variable = util.target.lookupOrCreateVariable(nameID, nameID);
            typeElement.checked = variable.value === "false" ? 0 : variable.value;
          });
          typeElement.addEventListener("change", function (event) {
            if (event.target && event.target.id.startsWith(`checkbox_${variableId}`)) {
              const variable = util.target.lookupOrCreateVariable(nameID, nameID);
              variable.value = typeElement.checked;
            }
          });
          break;
        case "color":
          if (hexColorRegex.test(Vvalue)) isHex = Vvalue;
          else isHex = "#ff0000";
          if (variableMonitor.querySelector(`[class^="monitor_default-monitor_SPnew1"]`)) {
            container = variableMonitor.querySelector(`[class^="monitor_default-monitor_SPnew1"]`);
          } else {
            container = document.createElement("div");
            container.className = "monitor_default-monitor_SPnew1";
            container.setAttribute("style", "padding: 5px 5px 5px 5px");
          }

          container.innerHTML = `
            <div class="monitor_row_2y_kM">
              <div class="monitor_label_ci1ok">${nameID}</div>
            </div>
            <div class="monitor_row_2y_kM">
              <input type="color" id="color_${variableId}" class="monitor_slider_1CHwk no-drag" value="${isHex}">
            </div>`;
          variableMonitor.appendChild(container);
          typeElement = container.querySelector(`[id="color_${variableId}"`);
          typeElement = removeAllEventListeners(typeElement);

          this.addMonitorsUpdateListener(() => {
            const variable = util.target.lookupOrCreateVariable(nameID, nameID);
            typeElement.value = xmlEscape(variable.value);
          });
          typeElement.addEventListener("change", function (event) {
            if (event.target && event.target.id.startsWith(`color_${variableId}`)) {
              const variable = util.target.lookupOrCreateVariable(nameID, nameID);
              variable.value = typeElement.value;
            }
          });
          break;
        case "button":
          if (variableMonitor.querySelector(`[class^="monitor_default-monitor_SPnew1"]`)) {
            container = variableMonitor.querySelector(`[class^="monitor_default-monitor_SPnew1"]`);
          } else {
            container = document.createElement("div");
            container.className = "monitor_default-monitor_SPnew1";
            container.setAttribute("style", "padding: 5px 5px 5px 5px");
          }
          container.innerHTML = `
            <div class="monitor_row_2y_kM">
              <input type="button" id="button_${variableId}" value="${nameID}" class="monitor_slider_1CHwk no-drag monitor-button">
            </div>`;
          variableMonitor.appendChild(container);
          typeElement = container.querySelector(`[id="button_${variableId}"]`);

          buttonClickFunc = (down) => () => this.buttonClick(variableId, down);
          typeElement.addEventListener("mousedown", buttonClickFunc(true));
          typeElement.addEventListener("mouseup", buttonClickFunc(false));
          typeElement.addEventListener("mouseleave", buttonClickFunc(false));
          break;
        case "file":
          if (variableMonitor.querySelector(`[class^="monitor_default-monitor_SPnew1"]`)) {
            container = variableMonitor.querySelector(`[class^="monitor_default-monitor_SPnew1"]`);
          } else {
            container = document.createElement("div");
            container.className = "monitor_default-monitor_SPnew1";
            container.setAttribute("style", "padding: 5px 5px 5px 5px");
          }
          container.innerHTML = `
            <div class="monitor_row_2y_kM">
              <div class="monitor_label_ci1ok">${nameID}</div>
            </div>
            <div class="monitor_row_2y_kM">
              <input type="file" id="file_${variableId}" class="monitor_slider_1CHwk no-drag" value="0">
            </div>`;
          variableMonitor.appendChild(container);

          typeElement = container.querySelector(`[id="file_${variableId}"]`);
          typeElement = removeAllEventListeners(typeElement);
          typeElement.addEventListener("change", function (event) {
            if (event.target && event.target.id === `file_${variableId}`) {
              const file = event.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                  const variable = util.target.lookupOrCreateVariable(nameID, nameID);
                  variable.value = reader.result;
                };
                reader.onerror = function (error) { console.log("Error: ", error) };
              }
            }
          });
          break;
        case "image":
          if (variableMonitor.querySelector(`[class^="monitor_default-monitor_SPnew1"]`)) {
            container = variableMonitor.querySelector(`[class^="monitor_default-monitor_SPnew1"]`);
          } else {
            container = document.createElement("div");
            container.className = "monitor_default-monitor_SPnew1";
            container.setAttribute("style", "padding: 5px 5px 5px 5px");
          }
          container.innerHTML = `
            <div class="monitor_row_2y_kM">
              <div class="monitor_label_ci1ok">${nameID}</div>
            </div>
            <div class "monitor_row_2y_kM">
              <img src="${Vvalue}" id="image_${variableId}" class="monitor_slider_1CHwk no-drag">
            </div>`;
          variableMonitor.appendChild(container);
          typeElement = container.querySelector(`[id="image_${variableId}"]`);
          this.addMonitorsUpdateListener(() => {
            const variable = util.target.lookupOrCreateVariable(nameID, nameID);
            typeElement.src = xmlEscape(variable.value);
          });
          break;
        case "audio":
          if (variableMonitor.querySelector(`[class^="monitor_default-monitor_SPnew1"]`)) {
            container = variableMonitor.querySelector(`[class^="monitor_default-monitor_SPnew1"]`);
          } else {
            container = document.createElement("div");
            container.className = "monitor_default-monitor_SPnew1";
            container.setAttribute("style", "padding: 5px 5px 5px 5px");
          }
          container.innerHTML = `
            <div class="monitor_row_2y_kM">
              <div class="monitor_label_ci1ok">${nameID}</div>
            </div>
            <div class="monitor_row_2y_kM">
              <audio id="audio_${variableId}" class="monitor_audio" src="${Vvalue}" controls></audio>
            </div>`;
          variableMonitor.appendChild(container);

          typeElement = container.querySelector(`[id="audio_${variableId}"]`);
          this.addMonitorsUpdateListener(() => {
            const variable = util.target.lookupOrCreateVariable(nameID, nameID);
            typeElement.src = variable.value;
          });
          break;
        default: // Handle unknown monitor or default monitor
          state = state.set("mode", "default");
          vm.runtime.requestUpdateMonitor(state);
          break;
      }
      this.reAddDeleted(oldStyle, variableId, nameID, util);
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
    buttonClick(ID, down) {
      if (down) this.varButtonStatus[ID] = { varName : ID, isDown : down, timeClick : Date.now() };
      else delete this.varButtonStatus[ID];
    }

    isButtonPressed(args, util) {
      const variableId = this.findVariable(args.VARIABLE, util);
      if (this.varButtonStatus[variableId] !== undefined) {
        if (args.TYPE === "held") return true;
        else {
          let date = this.varButtonStatus[variableId].timeClick;
          let now = Date.now();
          // Ingore last 3 digits of the times as hats arent instant
          date = Math.floor(date / 1000);
          now = Math.floor(now / 1000);
          return Scratch.Cast.toBoolean(date === now);
        }
      }
      return false;
    }

    whenButtonPressed(args, util) { return this.isButtonPressed(args, util) }

    getVariableType(args, util) { return this.getMonitor(args.VARIABLE, util) }

    getMonitor(variable, util) {
      const variableId = this.findVariable(variable, util);
      const variableMonitor = document.querySelector(`[data-id="${variableId}"][class*="monitor"]`);
      if (!variableMonitor) return "normal readout";
      if (variableMonitor.querySelector("input[type=\"range\"]")) return "slider";
      if (variableMonitor.querySelector("input[type=\"text\"]")) return "text";
      if (variableMonitor.querySelector("input[type=\"checkbox\"]")) return "checkbox";
      if (variableMonitor.querySelector("input[type=\"color\"]")) return "color";
      if (variableMonitor.querySelector("input[type=\"button\"]")) return "button";
      if (variableMonitor.querySelector("input[type=\"file\"]")) return "file";
      if (variableMonitor.querySelector("img")) return "image";
      if (variableMonitor.querySelector("audio")) return "audio";
      if (variableMonitor.querySelector(`[class^="monitor_large-value_"]`)) return "large readout";
      return "normal readout";
    }

    async setDisplay(args, util) {
      const type = this.getMonitor(args.VARIABLE, util);
      let variableId = this.findVariable(args.VARIABLE, util);
      if (type.includes("readout") || type === "slider") {
        const variableMonitorLabel = document.querySelector(`[data-id="${variableId}"][class*="monitor"] [class^="monitor_label"]`);
        if (variableMonitorLabel) variableMonitorLabel.textContent = args.NAME;
      } else {
        await this.setMonitor(args.VARIABLE, util, args.NAME, type);
      }
    }

    setFont(args, util) {
      const variableId = this.findVariable(args.VARIABLE, util);
      const variableMonitor = document.querySelector(`[data-id="${variableId}"][class*="monitor"]`);
      if (!variableMonitor) return;
      variableMonitor.style.fontFamily = args.FONT;
    }

    resetEffect(args, util) {
      const variableId = this.findVariable(args.VARIABLE, util);
      const variableMonitor = document.querySelector(`[data-id="${variableId}"][class*="monitor"]`);
      if (!variableMonitor) return;
      let currentTransform = variableMonitor.style.transform || "";
      this.resetEffects(variableId, currentTransform);
    }

    setEffect(args, util) { this.varEffect(args.VARIABLE, args.EFFECT, args.AMOUNT, util) }

    varEffect(VARIABLE, EFFECT, AMOUNT, util) {
      const variableId = this.findVariable(VARIABLE, util);
      const variableMonitor = document.querySelector(`[data-id="${variableId}"][class*="monitor"]`);
      if (!variableMonitor) return;
      let currentTransform = variableMonitor.style.transform;
      let currentFilterEffect = variableMonitor.style.filter || "";
      if (EFFECT === "saturation") EFFECT = "saturate";
      else if (EFFECT === "hue") EFFECT = "hue-rotate";
      else if (EFFECT === "direction") {
        EFFECT = "rotate";
        AMOUNT = AMOUNT - 90;
      } else if (EFFECT === "scale" || EFFECT === "scale x" || EFFECT === "scale y") {
        AMOUNT = AMOUNT / 100;
        EFFECT = EFFECT.replace("x", "X").replace("y", "Y").replaceAll(" ", "");
      }
      else if (EFFECT === "brightness") AMOUNT = AMOUNT + 100;
      else if (EFFECT === "skew x") EFFECT = "skewX";
      else if (EFFECT === "skew y") EFFECT = "skewY";

      const regex = new RegExp(`${EFFECT}\\([^)]+\\)`, "g");
      currentTransform = currentTransform.replace(regex, "").trim();
      currentFilterEffect = currentFilterEffect.replace(regex, "").trim();
      if (EFFECT.includes("scale") || EFFECT === "rotate" || EFFECT.includes("skew")) {
        currentTransform += ` ${EFFECT}(${AMOUNT}${EFFECT === "rotate" || EFFECT.includes("skew") ? "deg" : ""})`;
        variableMonitor.style.transform = currentTransform.trim();
      } else {
        currentFilterEffect += ` ${EFFECT}(${AMOUNT}${EFFECT === "blur" ? "px" : EFFECT === "hue-rotate" ? "deg" : "%"})`;
        variableMonitor.style.filter = currentFilterEffect.trim();
      }
    }

    currentEffect(args, util) {
      const variableId = this.findVariable(args.VARIABLE, util);
      const variableMonitor = document.querySelector(`[data-id="${variableId}"][class*="monitor"]`);
      if (!variableMonitor) return "";
      const currentTransform = variableMonitor.style.transform;
      const currentFilterEffect = variableMonitor.style.filter || "";
    
      const setEffect = {
        saturation: "saturate", hue: "hue-rotate",
        direction: "rotate", scale: "scale", "scale x": "scaleX", "scale y": "scaleY",
        brightness: "brightness", opacity: "opacity",
        "skew x": "skewX", "skew y": "skewY",
      }[args.EFFECT] || args.EFFECT;
      const defaultV = {
        saturation: 100, hue: 0,
        direction: 90, scale: 100, "scale x": 100, "scale y": 100,
        brightness: 0, opacity: 100,
      }[args.EFFECT] || 0;
    
      const regex = new RegExp(`${setEffect}\\(([^)]+)\\)`);
      const transformMatch = currentTransform.match(regex);
      const filterMatch = currentFilterEffect.match(regex);
      if (filterMatch || transformMatch) {
        const valueWithUnits = (filterMatch || transformMatch)[1];
        const numericValue = parseFloat(valueWithUnits.replace(/[^0-9.-]/g, ""));
        if (setEffect === "brightness") return numericValue - 100;
        else if (setEffect === "rotate") return numericValue + 90;
        else if (setEffect.includes("scale")) return numericValue * 100;
        else return numericValue;
      } else { return defaultV }
    }
  }

  Scratch.extensions.register(new MonitorsPlus());
})(Scratch);
