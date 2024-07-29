// Name: Variables Expanded
// ID: DICandSPmonitorsPlus
// Description: Expansion of Monitor Types and Variable Blocks.
// By: SharkPool and DogeIsCut

// Version 1.4.04

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Variables Expanded must run unsandboxed!");

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzMjEiIGhlaWdodD0iMzIxIiB2aWV3Qm94PSIwLDAsMzIxLDMyMSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTc5LjUsLTE5LjUpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNOTQsMTgwYzAsLTgwLjYzMzU3IDY1LjM2NjQyLC0xNDYgMTQ2LC0xNDZjODAuNjMzNTgsMCAxNDYsNjUuMzY2NDMgMTQ2LDE0NmMwLDgwLjYzMzU4IC02NS4zNjY0MiwxNDYgLTE0NiwxNDZjLTgwLjYzMzU4LDAgLTE0NiwtNjUuMzY2NDIgLTE0NiwtMTQ2eiIgZmlsbD0iI2ZmOGMxYSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0xNjkuMDg3MzIsODQuMDM5NzRjNi4yMTQ2MSwyLjczMDg3IDkuMDQ1MDIsOS45Nzc2MyA2LjMyNjQyLDE2LjE5NzYxYy05LjQ4MDc2LDIxLjc0MDEgLTE0LjM1NDY2LDQ1LjIwODYxIC0xNC4zMTQ0NSw2OC45MjYwMmMwLDI0LjUzMDI3IDUuMTIwMjEsNDcuODI5NzMgMTQuMzI2NzYsNjguOTI2MDJjMi40NzI4OSw2LjE3MzU1IC0wLjQwNTQxLDEzLjE5NDk2IC02LjUwMDA2LDE1Ljg1NjM4Yy02LjA5NDY0LDIuNjYxNDIgLTEzLjIwMTE4LDAuMDAwMTkgLTE2LjA0ODYxLC02LjAwOTgxYy0xMC44NDQ4LC0yNC44NDQwMiAtMTYuNDI2ODYsLTUxLjY2NDc3IC0xNi4zOTQ1NCwtNzguNzcyNTljMCwtMjcuOTg4ODggNS44NDY0LC01NC42NDg0OCAxNi4zOTQ1NCwtNzguNzcyNTljMS4zMDY4OCwtMi45OTIxOSAzLjc0OTEzLC01LjM0MjQ2IDYuNzg5MjgsLTYuNTMzNThjMy4wNDAxMiwtMS4xOTExMiA2LjQyODk2LC0xLjEyNTQ2IDkuNDIwNjYsMC4xODI1NHpNMjcxLjM4MDkyLDEzMi4yMzg3MmMtMTEuMjE0NjcsMC4wMDI1MiAtMjEuODIwNDIsNS4xMDE2MiAtMjguODI1ODUsMTMuODU5MDZsLTQuMDM3MSw1LjA0NjM2bC0xLjM2NjIxLC0zLjQzMzk5Yy0zLjczNzYsLTkuMzQwOCAtMTIuNzgzMjIsLTE1LjQ2NzA3IC0yMi44NDQwNiwtMTUuNDcxNDNoLTMuOTc1NTZjLTYuNzk3NjQsMCAtMTIuMzA4MjIsNS41MTA1OCAtMTIuMzA4MjIsMTIuMzA4MjJjMCw2Ljc5NzY0IDUuNTEwNTgsMTIuMzA4MjIgMTIuMzA4MjIsMTIuMzA4MjJoMy45NzU1Nmw2LjU0Nzk3LDE2LjM2OTkybC0xMi43MzksMTUuOTM5MTRjLTIuMzM2ODUsMi45MTg3MyAtNS44NzM3NSw0LjYxNjk5IC05LjYxMjcyLDQuNjE1NTloLTAuNDgwMDJjLTYuNzk3NjQsMCAtMTIuMzA4MjIsNS41MTA1NyAtMTIuMzA4MjIsMTIuMzA4MjJjMCw2Ljc5NzY0IDUuNTEwNTcsMTIuMzA4MjIgMTIuMzA4MjIsMTIuMzA4MjJoMC40ODAwMmMxMS4yMTQ2NywtMC4wMDI1MiAyMS44MjA0MSwtNS4xMDE2MiAyOC44MjU4NSwtMTMuODU5MDZsNC4wMzcxLC01LjA0NjM2bDEuMzY2MjIsMy40MzRjMy43MzkyNiw5LjM0NDk2IDEyLjc5MTA0LDE1LjQ3MjExIDIyLjg1NjM3LDE1LjQ3MTQzaDMuOTc1NTVjNi43OTc2NCwwIDEyLjMwODIyLC01LjUxMDU4IDEyLjMwODIyLC0xMi4zMDgyMmMwLC02Ljc5NzY0IC01LjUxMDU4LC0xMi4zMDgyMiAtMTIuMzA4MjIsLTEyLjMwODIyaC0zLjk3NTU1bC02LjU0Nzk4LC0xNi4zNjk5MmwxMi43MzkwMSwtMTUuOTM5MTNjMi4zMzY4NiwtMi45MTg3MyA1Ljg3Mzc2LC00LjYxNjk4IDkuNjEyNzMsLTQuNjE1NTloMC40ODAwMWM2Ljc5NzY1LDAgMTIuMzA4MjIsLTUuNTEwNTggMTIuMzA4MjIsLTEyLjMwODIyYzAsLTYuNzk3NjQgLTUuNTEwNTcsLTEyLjMwODIyIC0xMi4zMDgyMiwtMTIuMzA4MjJoLTAuNDgwMDF6TTI5NC40NDY1MSwxMDAuMjM3MzdjLTIuNjc2MjMsLTYuMjIxMTEgMC4xNzYxNCwtMTMuNDM1NTMgNi4zODMwNiwtMTYuMTQ0NTFjNi4yMDY5MywtMi43MDg5NyAxMy40MzYyNywwLjEwNTM0IDE2LjE3NzksNi4yOTc5M2MxMC44NDkwMiwyNC44NDMxMSAxNi40MzUzLDUxLjY2MzkxIDE2LjQwNjg2LDc4Ljc3MjZjMCwyNy45ODg4OCAtNS44NDYzOSw1NC42NDg0OCAtMTYuMzk0NTQsNzguNzcyNmMtMS42Njg2Niw0LjE2NTc0IC01LjQ3MjI0LDcuMDkzMTggLTkuOTI2MzMsNy42Mzk4M2MtNC40NTQwOSwwLjU0NjY1IC04Ljg1MjcsLTEuMzc0MTQgLTExLjQ3OTE3LC01LjAxMjczYy0yLjYyNjQ3LC0zLjYzODYxIC0zLjA2NDUsLTguNDE4MjggLTEuMTQzMTUsLTEyLjQ3MzY3YzkuNDg1MzIsLTIxLjczOTA4IDE0LjM2MzQ1LC00NS4yMDc3MSAxNC4zMjY3OCwtNjguOTI2MDFjMCwtMjQuNTMwMjcgLTUuMTIwMjIsLTQ3LjgyOTc0IC0xNC4zMzkwOCwtNjguOTI2MDJ6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PGcgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjk1LjEwNTIxLDMwOC45OTEwMmMtMTAuMjYxNjgsMCAtMTguNTgwNDIsLTguMzE4NzMgLTE4LjU4MDQyLC0xOC41ODA0MXYtOTAuNDI0NjdjMCwtMTAuMjYxNjggOC4zMTg3MywtMTguNTgwNDEgMTguNTgwNDIsLTE4LjU4MDQxaDEuMjM4N2MxMC4yNjE2OCwwIDE4LjU4MDQxLDguMzE4NzMgMTguNTgwNDEsMTguNTgwNDF2OTAuNDI0NjdjMCwxMC4yNjE2OCAtOC4zMTg3MywxOC41ODA0MSAtMTguNTgwNDEsMTguNTgwNDF6IiBmaWxsPSIjZmY4YzFhIiBzdHJva2U9IiNmZjhjMWEiIHN0cm9rZS13aWR0aD0iMTIuNSIvPjxwYXRoIGQ9Ik0yMzEuOTMxODIsMjQ0LjU3ODkzYzAsLTEwLjI2MTY4IDguMzE4NzQsLTE4LjU4MDQyIDE4LjU4MDQxLC0xOC41ODA0Mmg5MC40MjQ2NmMxMC4yNjE2OCwwIDE4LjU4MDQsOC4zMTg3MyAxOC41ODA0LDE4LjU4MDQydjEuMjM4N2MwLDEwLjI2MTY5IC04LjMxODcyLDE4LjU4MDQgLTE4LjU4MDQsMTguNTgwNGgtOTAuNDI0NjZjLTEwLjI2MTY3LDAgLTE4LjU4MDQxLC04LjMxODczIC0xOC41ODA0MSwtMTguNTgwNHoiIGZpbGw9IiNmZjhjMWEiIHN0cm9rZT0iI2ZmOGMxYSIgc3Ryb2tlLXdpZHRoPSIxMi41Ii8+PHBhdGggZD0iTTIzOS44ODAxMiwyNDQuNzkwMDZjMCwtNi43NjM1MSA1LjQ4MjkxLC0xMi4yNDY0MSAxMi4yNDY0MiwtMTIuMjQ2NDFoODcuMjk5M2M2Ljc2MzUxLDAgMTIuMjQ2NDIsNS40ODI5IDEyLjI0NjQyLDEyLjI0NjQxdjAuODE2NDVjMCw2Ljc2MzUxIC01LjQ4MjkxLDEyLjI0NjQyIC0xMi4yNDY0MiwxMi4yNDY0MmgtODcuMjk5M2MtNi43NjM1MSwwIC0xMi4yNDY0MiwtNS40ODI5MiAtMTIuMjQ2NDIsLTEyLjI0NjQyeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMjk2LjE4NDM5LDE4OS4zMDIxOWM2Ljc2MzUxLDAgMTIuMjQ2NDEsNS40ODI5MSAxMi4yNDY0MSwxMi4yNDY0MXY4Ny4yOTkzYzAsNi43NjM1MSAtNS40ODI5LDEyLjI0NjQyIC0xMi4yNDY0MSwxMi4yNDY0MmgtMC44MTY0NWMtNi43NjM1MSwwIC0xMi4yNDY0MiwtNS40ODI5MSAtMTIuMjQ2NDEsLTEyLjI0NjQyYzAsMCAwLC00OS4yMzE5NSAwLC02NC44NjIyN2MwLC04Ljg0ODEzIDAsLTIyLjQzNzA0IDAsLTIyLjQzNzA0YzAsLTYuNzYzNTEgNS40ODI5MSwtMTIuMjQ2NDEgMTIuMjQ2NDIsLTEyLjI0NjQyeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PHBhdGggZD0iTTg3LDE4MGMwLC04NC40OTk1NyA2OC41MDA0MywtMTUzIDE1MywtMTUzYzg0LjQ5OTU3LDAgMTUzLDY4LjUwMDQzIDE1MywxNTNjMCw4NC40OTk1NyAtNjguNTAwNDMsMTUzIC0xNTMsMTUzYy04NC40OTk1NywwIC0xNTMsLTY4LjUwMDQzIC0xNTMsLTE1M3oiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjZGI2ZTAwIiBzdHJva2Utd2lkdGg9IjE1Ii8+PC9nPjwvZz48L3N2Zz4=";

  const builtInFonts = ["Sans Serif", "Serif", "Handwriting", "Marker", "Curly", "Pixel", "Scratch"];
  let monitorButtons = {};
  let varUpdateListener = {};
  runtime.on("BEFORE_EXECUTE", () => { runtime.startHats("DICandSPmonitorsPlus_whenButtonPressed") });
  runtime.on("MONITORS_UPDATE", () =>{
    for (const [id, { func, inp }] of Object.entries(varUpdateListener)) {
      func(inp);
      if (typeof scaffolding === "undefined") {
        // Fix potential Custom Monitors that were Double-Clicked
        const varMonitor = document.querySelector(`div[data-id="${id}"][class*="monitor"]`);
        if (varMonitor) {
          Array.from(varMonitor.children).forEach(child => {
            if (
              !child.className.includes("monitor_SPmonitorPlus") && !child.style.display
            ) {
              delete varUpdateListener[id];
              const custMon = varMonitor.querySelector(`div[class^="monitor_default-monitor_SPmonitorPlus"`);
              if (custMon) varMonitor.removeChild(custMon);
            }
          });
        }
      }
    }
  });

  class MonitorsPlus {
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
          {
            opcode: "setFontSize",
            blockType: Scratch.BlockType.COMMAND,
            text: "set font size of [VARIABLE] to [SIZE]",
            arguments: {
              SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          {
            opcode: "setInpColor",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [THING] color of [VARIABLE] to [VALUE]",
            arguments: {
              VALUE: { type: Scratch.ArgumentType.COLOR },
              THING: { type: Scratch.ArgumentType.STRING, menu: "elementMenu" },
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
          variableMenu: { acceptReporters: true, items: "getVariables" },
          allFonts: { acceptReporters: true, items: "getFonts" },
          sliderMenu: ["min", "max"],
          variableTypeCreate: ["globally", "for this sprite only"],
          POSITIONS: ["x", "y"],
          BUTTON_CLICK: ["clicked", "held"],
          VISIBLE: { acceptReporters: true, items: ["show", "hide"] },
          variablesTypeMenu: {
            acceptReporters: true,
            items: [
              "normal readout", "large readout", "slider",
              "text", "number", "date", "checkbox", "color",
              "button", "file", "image", "audio"
            ]
          },
          elementMenu: {
            acceptReporters: true,
            items: ["input", "border"]
          },
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
    getVariables() {
      const globalVars = Object.values(vm.runtime.getTargetForStage().variables).filter((x) => x.type == "");
      const localVars = Object.values(vm.editingTarget.variables).filter((x) => x.type == "");
      const uniqueVars = [...new Set([...globalVars, ...localVars])];
      if (uniqueVars.length === 0) return ["make a variable"];
      return uniqueVars.map((i) => (Scratch.Cast.toString(i.name)));
    }

    getFonts() {
      const customFonts = runtime.fontManager ? runtime.fontManager.getFonts().map((i) => ({text: i.name, value: i.family})) : [];
      return [ ...builtInFonts, ...customFonts ];
    }

    findVariable(varName, sprite) {
      //support for all variable types (Cloud, Sprite-Only, Global)
      varName = Scratch.Cast.toString(varName);
      const cloudID = runtime.getTargetForStage().lookupVariableByNameAndType(Scratch.Cast.toString("ÃƒÂ¢Ã‹ÂœÃ‚Â " + varName), "");
      if (cloudID) return cloudID.id;
      let varFind = "";
      for (const name of Object.getOwnPropertyNames(sprite.target.variables)) {
        varFind = sprite.target.variables[name].name;
        if (varFind === varName) return sprite.target.variables[name].id;
      }
      const ID = runtime.getTargetForStage().lookupVariableByNameAndType(varName, "");
      if (!ID) return "";
      return ID.id;
    }

    setValue(variableN, value, util) {
      const variable = util.target.lookupOrCreateVariable(variableN, variableN);
      variable.value = value;
    }

    refresh() {
      // Use to refresh the toolbox to show new/deleted variables
      if (typeof scaffolding === "undefined") {
        vm.emitWorkspaceUpdate();
        const workspace = ScratchBlocks.getMainWorkspace();
        workspace.toolboxRefreshEnabled_ = true;
        workspace.refreshToolboxSelection_();
        workspace.toolboxRefreshEnabled_ = false;
        setTimeout(() => { runtime.requestBlocksUpdate() }, 10);
      }
    }

    generateId() {
      // Used for creating IDs for variables
      const soup = "!#%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const id = [];
      for (let i = 0; i < 20; i++) { id[i] = soup.charAt(Math.random() * soup.length) }
      return id.join("");
    }

    resetEffects(variableId, curTransform) {
      const varMonitor = document.querySelector(`div[data-id="${variableId}"][class*="monitor"]`);
      if (!varMonitor) return;
      const matches = curTransform.match(/translate\(([^,]+),\s*([^)]+)\)/);
      varMonitor.style.filter = "";
      varMonitor.style.transform = matches ? `translate(${matches[1]}, ${matches[2]})` : "";
    }

    getMonitor(variable, util) {
      const varId = this.findVariable(variable, util);
      const varMonitor = document.querySelector(`div[data-id="${varId}"][class*="monitor"]`);
      if (!varMonitor) return "normal readout";
      const inputcheck = varMonitor.querySelector("input");
      if (inputcheck !== null) {
        if (inputcheck.type === "range") return "slider";
        else return inputcheck.type;
      } else {
        if (varMonitor.querySelector("img")) return "image";
        else if (varMonitor.querySelector("audio")) return "audio";
        else if (varMonitor.querySelector(`div[class^="monitor_large-value_"]`)) return "large readout";
        else return "normal readout";
      }
    }

    setMonitor(nameID, util, nameTxt, type) {
      const baseMonitors = {
        "normal readout": "default", "large readout": "large", "slider": "slider"
      };
      const custMonitors = [
        "text", "number", "checkbox", "color", "date",
        "button", "file", "image", "audio"
      ];
      const isHexRegex = /^#([0-9A-F]{3}){1,2}$/i;
      const addVarListener = (id, inp, func) => { varUpdateListener[id] = { inp, func } }
      const buttonClick = (ID, down) => {
        if (down) monitorButtons[ID] = { varName : ID, isDown : down, timeClick : Date.now() };
        else delete monitorButtons[ID];
      }

      let varId = this.findVariable(nameID, util);
      if (!varId) return;
      const variable = util.target.lookupVariableById(varId);
      let state = runtime.getMonitorState().get(varId);
      const varMonitor = document.querySelector(`div[data-id="${varId}"][class*="monitor"]`);
      if (!varMonitor) return;
      let container, input;
      // Do Not Change This Class Name. We want to Preserve CSS Attributes
      container = varMonitor.querySelector(`div[class^="monitor_default-monitor_SPmonitorPlus"`);
      if (container) varMonitor.removeChild(container);
      delete varUpdateListener[varId];

      if (custMonitors.indexOf(type) > -1) {
        // Check if Custom CSS Exists
        const newStyles = document.querySelector(`style[class="shovelcss-style"]`);
        container = document.createElement("div");
        container.className = "monitor_default-monitor_SPmonitorPlus";
        container.setAttribute("style", "padding: 5px 5px 5px 5px");
        // Hide the Old Monitor Inner Elements rather than Delete. This Prevents Editor Crashes
        Array.from(varMonitor.children).forEach(child => {
          child.style.display = "none";
        });

        // Listners
        const normUpdate = (inp) => { inp.value = variable.value };
        const srcUpdate = (inp) => { inp.src = variable.value };
        const checkUpdate = (inp) => { inp.checked = Scratch.Cast.toBoolean(variable.value) };

        // Label Creation
        const label = document.createElement("div");
        label.className = "monitor_row";
        const innerLabel = document.createElement("div");
        innerLabel.className = "monitor_label";
        innerLabel.textContent = nameID;
        innerLabel.style.fontWeight = 700;
        innerLabel.style.margin = "0px 5px 0px 5px";
        innerLabel.style.color = newStyles ? "auto" : "#575E75";
        label.appendChild(innerLabel);

        if (type === "audio") {
          input = document.createElement("audio");
          input.src = variable.value;
          input.controls = true;
          addVarListener(varId, input, srcUpdate);
        } else if (type === "image") {
          input = document.createElement("img");
          input.src = variable.value;
          addVarListener(varId, input, srcUpdate);
        } else {
          input = document.createElement("input");
          input.type = type;
          if (type === "checkbox") input.checked = Scratch.Cast.toBoolean(variable.value);
          else if (type === "button") input.value = input.value = nameID;
          else if (type === "file") input.value = "";
          else if (type === "color") {
            input.value = isHexRegex.test(variable.value) ? variable.value : "#000";
            input.style.height = "30px";
            const colorStyle = document.createElement("style");
            colorStyle.textContent = `
              input[type="color"]::-webkit-color-swatch {
                border: black solid 1px;
                margin: 2px;
                border-radius: 5px;
              }
              input[type="color"]::-webkit-color-swatch-wrapper {
                padding: 0px;
              }
              input[type="color"]::-moz-color-swatch {
                border: black solid 1px;
                margin: 2px;
                border-radius: 5px;
              }
            `;
            input.append(colorStyle);
          } else if (type === "number") {
            input.value = Scratch.Cast.toNumber(variable.value);
            input.max = state.get("sliderMax");
            input.min = state.get("sliderMin");
          } else { input.value = variable.value }
        }
        input.id = `${type}_${varId}`;
        input.className = "no-drag"; // Mimic the Slider Behaviour in-editor
        if (!navigator.userAgent.includes("Chrome") && navigator.userAgent.includes("Safari") && type === "checkbox") {
          // Dumb Safari HTML Bug
          input.style.margin = "10px";
          input.style.width = "auto";
          input.style.transform = "scale(2.5)";
        } else {
          input.style.marginTop = "2px";
          input.style.width = type === "checkbox" ? "50%" : "100%";
          input.style.borderRadius = "5px";
          if (type !== "audio") input.style.border = "solid 1px";
        }
        if (type === "button") container.appendChild(input);
        else if (type === "checkbox") {
          label.insertBefore(input, label.firstChild);
          container.appendChild(label);
          addVarListener(varId, input, checkUpdate);
        } else {
          input.style.minWidth = type === "audio" ? "275px" : "20px";
          container.append(label, input);
          if (type !== "file" && type !== "audio" && type !== "image") addVarListener(varId, input, normUpdate);
        }

        if (type !== "audio" && type !== "image") {
          if (type === "button") {
            const btnClickFunc = (down) => () => buttonClick(varId, down);
            input.addEventListener("mousedown", btnClickFunc(true));
            input.addEventListener("mouseup", btnClickFunc(false));
            input.addEventListener("mouseleave", btnClickFunc(false));
          } else {
            input.addEventListener("change", (event) => {
              const inputType = event.target.id;
              if (inputType.startsWith("checkbox")) variable.value = input.checked;
              else if (inputType.startsWith("file")) {
                const file = event.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = function() { variable.value = reader.result };
                  reader.onerror = function(error) { console.error("Error: ", error) };
                }
              } else variable.value = input.value;
            });
          }
        }
        varMonitor.appendChild(container);
      } else {
        varMonitor.firstChild.style.display = "";
        if (baseMonitors[type] === undefined) type = "normal readout";
        runtime.requestUpdateMonitor(state.set("mode", baseMonitors[type]));
      }
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
      const variable = this.findVariable(args.VARIABLE, util);
      if (!variable) return 0;
      return util.target.lookupVariableById(variable).value;
    }

    makeVariable(args, util) {
      const name = Scratch.Cast.toString(args.VARIABLE);
      if (args.TYPE === "for this sprite only") util.target.lookupOrCreateVariable(this.generateId(), name, "");
      else runtime.createNewGlobalVariable(name, "");
      return this.refresh();
    }

    deleteVariable(args, util) {
      const variable = this.findVariable(args.VARIABLE, util);
      if (variable) {
        runtime.getTargetForStage().deleteVariable(variable)
        util.target.deleteVariable(variable);
        return this.refresh();
      }
    }

    setPosition(args, util) {
      const canvas = [runtime.stageWidth / 2, runtime.stageHeight / 2];
      const varId = this.findVariable(args.VARIABLE, util);
      const varMonitor = document.querySelector(`div[data-id="${varId}"][class*="monitor"]`);
      if (!varMonitor) return;
      let x = Scratch.Cast.toNumber(args.X) + canvas[0] - (varMonitor.offsetWidth / 2);
      let y = (Scratch.Cast.toNumber(args.Y) - canvas[1] + (varMonitor.offsetHeight / 2)) * -1;
      x = x - (parseInt(varMonitor.style.left) || 5);
      y = y - (parseInt(varMonitor.style.top) || 5);

      let styleAtts = varMonitor.getAttribute("style");
      const transformRegex = /transform:([^;]+);/;
      const transformMatch = styleAtts.match(transformRegex);
      if (transformMatch) {
        const oldTransform = transformMatch[1];
        const newTransform = oldTransform.replace(/translate\([^)]+\)/, `translate(${x}px, ${y}px)`);
        styleAtts = styleAtts.replace(transformRegex, `transform:${newTransform};`);
        varMonitor.setAttribute("style", styleAtts);
      }
      runtime.requestUpdateMonitor(new Map([["id", varId], ["x", x], ["y", y]]));
    }

    currentPos(args, util) {
      const canvas = [runtime.stageWidth / 2, runtime.stageHeight / 2];
      const varId = this.findVariable(args.VARIABLE, util);
      const varMonitor = document.querySelector(`div[data-id="${varId}"][class*="monitor"]`);
      if (!varMonitor) return ""; // Should Report Nothing if Invisible
      const styleAttribute = varMonitor.getAttribute("style");
      if (!styleAttribute) return "";
      const match = styleAttribute.match(/transform\s*:\s*translate\((-?\d+(?:\.\d+)?px),\s*(-?\d+(?:\.\d+)?px)\)/);
      if (match) {
        if (args.POSITION === "x") return Math.round(parseInt(match[1]) - canvas[0] + (varMonitor.offsetWidth / 2)) + parseInt(varMonitor.style.left);
        else return Math.round(((parseInt(match[2]) * -1) + canvas[1]) - (varMonitor.offsetHeight / 2) - parseInt(varMonitor.style.top)) - 1;
      }
    }

    setSliderMinMaxOfVaribleTo(args, util) {
      const varId = this.findVariable(args.VARIABLE, util);
      if (!varId) return;
      const margins = [Scratch.Cast.toNumber(args.MIN), Scratch.Cast.toNumber(args.MAX)];
      const moniType = this.getMonitor(args.VARIABLE, util);
      if (moniType === "number") {
        const input = document.getElementById(`number_${varId}`);
        if (input) {
          input.min = margins[0];
          input.max = margins[1];
        }
      } else {
        const varMonitor = document.querySelector(`div[data-id="${varId}"][class*="monitor"]`);
        if (varMonitor) {
          const container = varMonitor.querySelector(`div[class^="monitor_default-monitor_SPmonitorPlus"`);
          if (container) varMonitor.removeChild(container);
          varMonitor.firstChild.style.display = "";
        }
        var state = runtime.getMonitorState().get(varId);
        if (!state) return;
        state = state.set("mode", "slider");
        runtime.requestUpdateMonitor(state);
        runtime.requestUpdateMonitor(new Map([
          ["id", varId], ["sliderMin", margins[0]], ["sliderMax", margins[1]]
        ]));
      }
    }

    sliderMinMaxOfVarible(args, util) {
      const varId = this.findVariable(args.VARIABLE, util);
      const info = runtime.getMonitorState().get(varId);
      if (info === undefined) return 0;
      return info.get(args.MINMAX === "min" ? "sliderMin" : "sliderMax");
    }

    setVariableToType(args, util) { this.setMonitor(args.VARIABLE, util, args.VARIABLE, args.TYPE) }

    getVariableType(args, util) { return this.getMonitor(args.VARIABLE, util) }

    whenButtonPressed(args, util) { return this.isButtonPressed(args, util) }

    isButtonPressed(args, util) {
      const varId = this.findVariable(args.VARIABLE, util);
      if (monitorButtons[varId] !== undefined) {
        if (args.TYPE === "held") return true;
        else {
          const date = monitorButtons[varId].timeClick;
          const now = Date.now();
          // Ignore Last 3 Digits, as Events => Hats arent Instant
          const con = Math.floor(date / 1000) === Math.floor(now / 1000);
          if (con) delete monitorButtons[varId];
          return con;
        }
      }
      return false;
    }

    setDisplay(args, util) {
      let varId = this.findVariable(args.VARIABLE, util);
      const varLabels = document.querySelectorAll(`div[data-id="${varId}"][class*="monitor"] [class*="label"]`);
      // No need to xmlEscape, we edit with textContent
      if (varLabels.length > 0) {
        for (var i = 0; i < varLabels.length; i++) {
          varLabels[i].textContent = args.NAME;
        }
      }
      const btn = document.querySelector(`div[data-id="${varId}"][class*="monitor"] [id="button_${varId}"]`);
      if (btn) btn.value = args.NAME;
    }

    setFont(args, util) {
      const varId = this.findVariable(args.VARIABLE, util);
      const varMonitor = document.querySelector(`div[data-id="${varId}"][class*="monitor"]`);
      if (varMonitor) varMonitor.style.fontFamily = args.FONT;
    }

    setFontSize(args, util) {
      const varId = this.findVariable(args.VARIABLE, util);
      const varMonitor = document.querySelector(`div[data-id="${varId}"][class*="monitor"]`);
      if (varMonitor) varMonitor.style.fontSize = `${Scratch.Cast.toNumber(args.SIZE)}px`;
    }

    setInpColor(args, util) {
      const varId = this.findVariable(args.VARIABLE, util);
      const varMonitor = document.querySelector(`div[data-id="${varId}"][class*="monitor"]`);
      if (!varMonitor) return;
      let inputs = [
        ...varMonitor.querySelectorAll("input"),
        ...varMonitor.querySelectorAll("img")
      ];
      const value = Scratch.Cast.toString(args.VALUE);
      if (args.THING === "input") {
        varMonitor.style.accentColor = value;
        Array.from(inputs).forEach(input => { input.style.background = value });
      } else if (args.THING === "border") {
        Array.from(inputs).forEach(input => { input.style.borderColor = value });
      }
    }

    resetEffect(args, util) {
      const varId = this.findVariable(args.VARIABLE, util);
      const varMonitor = document.querySelector(`div[data-id="${varId}"][class*="monitor"]`);
      if (varMonitor) this.resetEffects(varId, varMonitor.style.transform || "");
    }

    setEffect(args, util) {
      const varId = this.findVariable(args.VARIABLE, util);
      const varMonitor = document.querySelector(`div[data-id="${varId}"][class*="monitor"]`);
      if (!varMonitor) return;
      let EFFECT = args.EFFECT;
      let value = args.AMOUNT;
      let curTransform = varMonitor.style.transform;
      let curFilters = varMonitor.style.filter || "";
      if (EFFECT === "saturation") EFFECT = "saturate";
      else if (EFFECT === "hue") EFFECT = "hue-rotate";
      else if (EFFECT === "direction") {
        EFFECT = "rotate";
        value = value - 90;
      } else if (EFFECT === "scale" || EFFECT === "scale x" || EFFECT === "scale y") {
        value = value / 100;
        EFFECT = EFFECT.replace("x", "X").replace("y", "Y").replaceAll(" ", "");
      }
      else if (EFFECT === "brightness") value = value + 100;
      else if (EFFECT === "skew x") EFFECT = "skewX";
      else if (EFFECT === "skew y") EFFECT = "skewY";

      const regex = new RegExp(`${EFFECT}\\([^)]+\\)`, "g");
      curTransform = curTransform.replace(regex, "").trim();
      curFilters = curFilters.replace(regex, "").trim();
      if (EFFECT.includes("scale") || EFFECT === "rotate" || EFFECT.includes("skew")) {
        curTransform += ` ${EFFECT}(${value}${EFFECT === "rotate" || EFFECT.includes("skew") ? "deg" : ""})`;
        varMonitor.style.transform = curTransform.trim();
      } else {
        curFilters += ` ${EFFECT}(${value}${EFFECT === "blur" ? "px" : EFFECT === "hue-rotate" ? "deg" : "%"})`;
        varMonitor.style.filter = curFilters.trim();
      }
    }

    currentEffect(args, util) {
      const varId = this.findVariable(args.VARIABLE, util);
      const varMonitor = document.querySelector(`div[data-id="${varId}"][class*="monitor"]`);
      if (!varMonitor) return "";
      const curTransform = varMonitor.style.transform;
      const curFilters = varMonitor.style.filter || "";
    
      const setEffect = {
        saturation: "saturate", hue: "hue-rotate",
        direction: "rotate", scale: "scale", "scale x": "scaleX", "scale y": "scaleY",
        brightness: "brightness", opacity: "opacity",
        "skew x": "skewX", "skew y": "skewY"
      }[args.EFFECT] || args.EFFECT;
      const defaultV = {
        saturation: 100, hue: 0,
        direction: 90, scale: 100, "scale x": 100, "scale y": 100,
        brightness: 0, opacity: 100
      }[args.EFFECT] || 0;

      const regex = new RegExp(`${setEffect}\\(([^)]+)\\)`);
      const transformMatch = curTransform.match(regex);
      const filterMatch = curFilters.match(regex);
      if (filterMatch || transformMatch) {
        const unitValue = (filterMatch || transformMatch)[1];
        const numericValue = parseFloat(unitValue.replace(/[^0-9.-]/g, ""));
        if (setEffect === "brightness") return numericValue - 100;
        else if (setEffect === "rotate") return numericValue + 90;
        else if (setEffect.includes("scale")) return numericValue * 100;
        else return numericValue;
      } else { return defaultV }
    }
  }

  Scratch.extensions.register(new MonitorsPlus());
})(Scratch);
