// Name: Display Text
// ID: SPdisText
// Description: Display Text in Your Projects!
// By: SharkPool

// Version V.1.0.0

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Display Text Extension must run unsandboxed!");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2NS4yMzM5NiIgaGVpZ2h0PSI2NS4yMzM5NiIgdmlld0JveD0iMCwwLDY1LjIzMzk2LDY1LjIzMzk2Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA3LjM4MzAyLC0xNDcuMzgzMDIpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yMDcuMzgzMDIsMTgwYzAsLTE4LjAxMzg2IDE0LjYwMzEyLC0zMi42MTY5OCAzMi42MTY5OCwtMzIuNjE2OThjMTguMDEzODYsMCAzMi42MTY5OCwxNC42MDMxMiAzMi42MTY5OCwzMi42MTY5OGMwLDE4LjAxMzg2IC0xNC42MDMxMiwzMi42MTY5OCAtMzIuNjE2OTgsMzIuNjE2OThjLTE4LjAxMzg2LDAgLTMyLjYxNjk4LC0xNC42MDMxMiAtMzIuNjE2OTgsLTMyLjYxNjk4eiIgZmlsbD0iIzNjNGU1YyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjEwLjc3MzYyLDE4MGMwLC0xNi4xNDEyOSAxMy4wODUxLC0yOS4yMjYzOCAyOS4yMjYzOCwtMjkuMjI2MzhjMTYuMTQxMjksMCAyOS4yMjYzOCwxMy4wODUxIDI5LjIyNjM4LDI5LjIyNjM4YzAsMTYuMTQxMjkgLTEzLjA4NTEsMjkuMjI2MzggLTI5LjIyNjM4LDI5LjIyNjM4Yy0xNi4xNDEyOSwwIC0yOS4yMjYzOCwtMTMuMDg1MSAtMjkuMjI2MzgsLTI5LjIyNjM4eiIgZmlsbD0iIzc3ODg5OSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjI2LjQ1ODg1LDE5Ni44NjIzNmMtMS44MzQyNSwwIC0zLjMyMTIxLC0xLjQ4Njk2IC0zLjMyMTIxLC0zLjMyMTIydi00Ljk0ODIyaDIuNjA3NTR2Mi44NTQyNmMwLDEuNTUwNjEgMS4yNTcwMiwyLjgwNzY0IDIuODA3NjMsMi44MDc2NGgyLjg1NDI2djIuNjA3NTR6TTI1MS40NDcxOSwxOTQuMjU0ODJjMS41NTA2MSwwIDIuODA3NjMsLTEuMjU3MDIgMi44MDc2MywtMi44MDc2NHYtMi44NTQyNmgyLjYwNzU0djQuOTQ4MjJjMCwxLjgzNDI2IC0xLjQ4Njk2LDMuMzIxMjIgLTMuMzIxMjIsMy4zMjEyMmgtNC45NDgyMnYtMi42MDc1NHpNMjIzLjEzNzY0LDE2Ni40NTg4NWMwLC0xLjgzNDI2IDEuNDg2OTUsLTMuMzIxMjEgMy4zMjEyMSwtMy4zMjEyMWg0Ljk0ODIydjIuNjA3NTRoLTIuODU0MjZjLTEuNTUwNjEsMCAtMi44MDc2MywxLjI1NzAyIC0yLjgwNzYzLDIuODA3NjN2Mi44NTQyNmgtMi42MDc1NHpNMjUzLjU0MTE1LDE2My4xMzc2NGMxLjgzNDI2LDAgMy4zMjEyMiwxLjQ4Njk1IDMuMzIxMjIsMy4zMjEyMXY0Ljk0ODIyaC0yLjYwNzU0di0yLjg1NDI2YzAsLTEuNTUwNjEgLTEuMjU3MDIsLTIuODA3NjMgLTIuODA3NjMsLTIuODA3NjNoLTIuODU0MjZ2LTIuNjA3NTR6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMi41Ii8+PHBhdGggZD0iTTIzMy4xOTQsMTc0LjkwMzUyYy0wLjUxMjcyLDAgLTAuOTI4MzYsLTAuNDE1NjQgLTAuOTI4MzYsLTAuOTI4MzZ2LTEuNjI2M2MwLC0wLjUxMjcyIDAuNDE1NjQsLTAuOTI4MzYgMC45MjgzNiwtMC45MjgzNmgxMy42MTE5OWMwLjUxMjcyLDAgMC45MjgzNiwwLjQxNTY0IDAuOTI4MzYsMC45MjgzNnYxLjYyNjNjMCwwLjUxMjcyIC0wLjQxNTY0LDAuOTI4MzYgLTAuOTI4MzYsMC45MjgzNnoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBkPSJNMjM4LjI1ODQ5LDE3NC4wMzkxNWMwLC0wLjUxMjcyIDAuNDE1NjQsLTAuOTI4MzYgMC45MjgzNiwtMC45MjgzNmwxLjYyNjMxLDBjMC41MTI3MiwwIDAuOTI4MzYsMC40MTU2NCAwLjkyODM2LDAuOTI4MzZsMCwxMy42MTE5OWMwLDAuNTEyNzIgLTAuNDE1NjQsMC45MjgzNiAtMC45MjgzNiwwLjkyODM2aC0xLjYyNjMxYy0wLjUxMjcyLDAgLTAuOTI4MzYsLTAuNDE1NjQgLTAuOTI4MzYsLTAuOTI4MzZ6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS41Ii8+PC9nPjwvZz48L3N2Zz4=";

  const blockIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0OS42MjQ0MSIgaGVpZ2h0PSI0OS42MjQ0MSIgdmlld0JveD0iMCwwLDQ5LjYyNDQxLDQ5LjYyNDQxIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE1LjE4NzgsLTE1NS4xODc4KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjE1LjE4NzgsMjA0LjgxMjJ2LTQ5LjYyNDQxaDQ5LjYyNDQxdjQ5LjYyNDQxeiIgZmlsbD0iIzc3ODg5OSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjI2LjQ1ODg1LDE5Ni44NjIzNmMtMS44MzQyNSwwIC0zLjMyMTIxLC0xLjQ4Njk2IC0zLjMyMTIxLC0zLjMyMTIydi00Ljk0ODIyaDIuNjA3NTR2Mi44NTQyNmMwLDEuNTUwNjEgMS4yNTcwMiwyLjgwNzY0IDIuODA3NjMsMi44MDc2NGgyLjg1NDI2djIuNjA3NTR6TTI1MS40NDcxOSwxOTQuMjU0ODJjMS41NTA2MSwwIDIuODA3NjMsLTEuMjU3MDIgMi44MDc2MywtMi44MDc2NHYtMi44NTQyNmgyLjYwNzU0djQuOTQ4MjJjMCwxLjgzNDI2IC0xLjQ4Njk2LDMuMzIxMjIgLTMuMzIxMjIsMy4zMjEyMmgtNC45NDgyMnYtMi42MDc1NHpNMjIzLjEzNzY0LDE2Ni40NTg4NWMwLC0xLjgzNDI2IDEuNDg2OTUsLTMuMzIxMjEgMy4zMjEyMSwtMy4zMjEyMWg0Ljk0ODIydjIuNjA3NTRoLTIuODU0MjZjLTEuNTUwNjEsMCAtMi44MDc2MywxLjI1NzAyIC0yLjgwNzYzLDIuODA3NjN2Mi44NTQyNmgtMi42MDc1NHpNMjUzLjU0MTE1LDE2My4xMzc2NGMxLjgzNDI2LDAgMy4zMjEyMiwxLjQ4Njk1IDMuMzIxMjIsMy4zMjEyMXY0Ljk0ODIyaC0yLjYwNzU0di0yLjg1NDI2YzAsLTEuNTUwNjEgLTEuMjU3MDIsLTIuODA3NjMgLTIuODA3NjMsLTIuODA3NjNoLTIuODU0MjZ2LTIuNjA3NTR6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMi41Ii8+PHBhdGggZD0iTTIzMy4xOTQsMTc0LjkwMzUyYy0wLjUxMjcyLDAgLTAuOTI4MzYsLTAuNDE1NjQgLTAuOTI4MzYsLTAuOTI4MzZ2LTEuNjI2M2MwLC0wLjUxMjcyIDAuNDE1NjQsLTAuOTI4MzYgMC45MjgzNiwtMC45MjgzNmgxMy42MTE5OWMwLjUxMjcyLDAgMC45MjgzNiwwLjQxNTY0IDAuOTI4MzYsMC45MjgzNnYxLjYyNjNjMCwwLjUxMjcyIC0wLjQxNTY0LDAuOTI4MzYgLTAuOTI4MzYsMC45MjgzNnoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBkPSJNMjM4LjI1ODQ5LDE3NC4wMzkxNWMwLC0wLjUxMjcyIDAuNDE1NjQsLTAuOTI4MzYgMC45MjgzNiwtMC45MjgzNmgxLjYyNjMxYzAuNTEyNzIsMCAwLjkyODM2LDAuNDE1NjQgMC45MjgzNiwwLjkyODM2djEzLjYxMTk5YzAsMC41MTI3MiAtMC40MTU2NCwwLjkyODM2IC0wLjkyODM2LDAuOTI4MzZoLTEuNjI2MzFjLTAuNTEyNzIsMCAtMC45MjgzNiwtMC40MTU2NCAtMC45MjgzNiwtMC45MjgzNnoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==";
  const render = Scratch.vm.renderer;
  let allText = [];
  let lastRecdVals = {};
  const fontMenu = [
    "Scratch", "Sans Serif",
    "Serif", "Handwriting",
    "Marker", "Curly", "Pixel"
  ];

  class SPdisText {
    getInfo() {
      return {
        id: "SPdisText",
        name: "Display Text",
        color1: "#778899",
        color2: "#5E707F",
        color3: "#3C4E5C",
        menuIconURI,
        blockIconURI,
        blocks: [
          {
            opcode: "printTxt",
            blockType: Scratch.BlockType.COMMAND,
            text: "print text [TXT] with ID [ID]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              TXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "hello world"
              }
            },
          },
          {
            opcode: "replaceTxt",
            blockType: Scratch.BlockType.COMMAND,
            text: "replace text of ID [ID] with [TXT]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              TXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "lorem ipsum"
              }
            },
          },
          {
            opcode: "removeTxt",
            blockType: Scratch.BlockType.COMMAND,
            text: "remove text with ID [ID]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" }
            },
          },
          {
            opcode: "removeAllTxt",
            blockType: Scratch.BlockType.COMMAND,
            text: "remove all text"
          },
          "---",
          {
            opcode: "displayedTexts",
            blockType: Scratch.BlockType.REPORTER,
            text: "printed texts from ID [ID]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" }
            },
          },
          {
            opcode: "existingID",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "does text with ID [ID] exist?",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" }
            },
          },
          {
            opcode: "allIDs",
            blockType: Scratch.BlockType.REPORTER,
            text: "all text IDs"
          },
          { blockType: Scratch.BlockType.LABEL, text: "Formatting" },
          {
            opcode: "setTextFont",
            blockType: Scratch.BlockType.COMMAND,
            text: "set font of ID [ID] to [FONT]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              FONT: { type: Scratch.ArgumentType.STRING, menu: "FONTS" }
            },
          },
          {
            opcode: "setFontSize",
            blockType: Scratch.BlockType.COMMAND,
            text: "set font size of ID [ID] to [SIZE]px",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 30 }
            },
          },
          {
            opcode: "setTextAlignment",
            blockType: Scratch.BlockType.COMMAND,
            text: "set text alignment of ID [ID] to [ALIGNMENT]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              ALIGNMENT: { type: Scratch.ArgumentType.STRING, menu: "ALIGNMENTS" }
            },
          },
          {
            opcode: "setMargins",
            blockType: Scratch.BlockType.COMMAND,
            text: "set margins of ID [ID] to width [WIDTH] height [HEIGHT]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              HEIGHT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 30 }
            },
          },
          {
            opcode: "setTextSpacing",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [ATT] spacing of ID [ID] to [SPACING] px",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              SPACING: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              ATT: { type: Scratch.ArgumentType.STRING, menu: "TEXT_ATT" }
            },
          },
          "---",
          {
            opcode: "attOfText",
            blockType: Scratch.BlockType.REPORTER,
            text: "[ATT] of text with ID [ID]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              ATT: { type: Scratch.ArgumentType.STRING, menu: "FORMATS" }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Text Visuals" },
          {
            opcode: "setTextColor",
            blockType: Scratch.BlockType.COMMAND,
            text: "set text color of ID [ID] to [COLOR]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#000000" }
            },
          },
          {
            opcode: "setTextDropShadow",
            blockType: Scratch.BlockType.COMMAND,
            text: "set text shadow of ID [ID] to x [x] y [y] z [z] color [COLOR]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" }
            },
          },
          {
            opcode: "setTextOutline",
            blockType: Scratch.BlockType.COMMAND,
            text: "set outline of ID [ID] to [COLOR] with thickness [THICKNESS]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
              THICKNESS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 }
            },
          },
          "---",
          {
            opcode: "makeGradient",
            blockType: Scratch.BlockType.REPORTER,
            text: "make a [TYPE] gradient with [COLOR1] and [COLOR2] at angle [ANGLE]",
            arguments: {
              COLOR1: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
              COLOR2: { type: Scratch.ArgumentType.COLOR, defaultValue: "#00ff00" },
              ANGLE: { type: Scratch.ArgumentType.ANGLE, defaultValue: 90 },
              TYPE: { type: Scratch.ArgumentType.NUMBER, menu: "GRADIENTS" }
            },
          },
          "---",
          {
            opcode: "setTextCurve",
            blockType: Scratch.BlockType.COMMAND,
            text: "set text curve of ID [ID] to [ARC]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              ARC: { type: Scratch.ArgumentType.STRING, defaultValue: "<svg>" }
            },
          },
          {
            opcode: "presetCurve",
            blockType: Scratch.BlockType.REPORTER,
            text: "preset curve [ARC]",
            disableMonitor: true,
            arguments: {
              ARC: { type: Scratch.ArgumentType.STRING, menu: "ARCS" }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Positioning" },
          {
            opcode: "setTextPosition",
            blockType: Scratch.BlockType.COMMAND,
            text: "set position of ID [ID] to x: [X] y: [Y]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "setTextZIndex",
            blockType: Scratch.BlockType.COMMAND,
            text: "set layer of ID [ID] to [Z_INDEX]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              Z_INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            },
          },
          {
            opcode: "textPosition",
            blockType: Scratch.BlockType.REPORTER,
            text: "[ATT] of ID [ID]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              ATT: { type: Scratch.ArgumentType.NUMBER, menu: "POS" }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Effects" },
          {
            opcode: "setEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [EFFECT] of ID [ID] to [VALUE]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              VALUE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTS" }
            },
          },
          {
            opcode: "amtOfEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "current [EFFECT] of ID [ID]",
            arguments: {
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTS" },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" }
            },
          },
          {
            opcode: "resetEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset effects of ID [ID]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" }
            },
          },
        ],
        menus: {
          FONTS: {
            acceptReporters: true,
            items: "allFonts"
          },
          ALIGNMENTS: {
            acceptReporters: true,
            items: ["left", "right", "center"]
          },
          TEXT_ATT: ["letter", "line"],
          GRADIENTS: {
            acceptReporters: true, // conic gradients exist but are complex
            items: ["linear", "radial"]
          },
          POS: ["x position", "y position", "z layer"],
          ARCS: ["circle", "hill", "dip", "wave"],
          FORMATS: {
            acceptReporters: true,
            items: [
              { text: "font", value: "fontFamily" },
              { text: "font size", value: "fontSize" },
              { text: "alignment", value: "textAlign" },
              { text: "margin width", value: "width" },
              { text: "margin height", value: "height" },
              { text: "letter spacing", value: "letterSpacing" },
              { text: "text spacing", value: "lineHeight" }
            ]
          },
          EFFECTS: {
            acceptReporters: true,
            items: [
              { text: "blur", value: "blur" },
              { text: "saturation", value: "saturate" },
              { text: "contrast", value: "contrast" },
              { text: "brightness", value: "brightness" },
              { text: "hue", value: "hue-rotate" },
              { text: "opacity", value: "opacity" },
              { text: "sepia", value: "sepia" },
              { text: "invert", value: "invert" },
              { text: "direction", value: "rotate" },
              { text: "scale x", value: "scaleX" },
              { text: "scale y", value: "scaleY" },
              { text: "skew x", value: "skewX" },
              { text: "skew y", value: "skewY" },
            ]
          }
        }
      };
    }

    allFonts() {
      const customFonts = Scratch.vm.runtime.fontManager ? Scratch.vm.runtime.fontManager.getFonts().map((i) => ({ text: i.name, value: i.family })) : [];
      return [...fontMenu, ...customFonts];
    }

    printTxt(args) {
      const newTextElement = document.createElement("div");
      newTextElement.textContent = args.TXT;
      newTextElement.id = `SP_Text-Ext-${args.ID}`;
      newTextElement.classList.add(args.ID);
      render.addOverlay(newTextElement, "scale-centered");
      allText.push(`#SP_Text-Ext-${args.ID}`);

      // add formatting (if any)
      if (lastRecdVals["textCLR"]) this.setTextColor(lastRecdVals["textCLR"].inputs);
      if (lastRecdVals["textOUT"]) this.setTextOutline(lastRecdVals["textOUT"].inputs);
      if (lastRecdVals["textSHA"]) this.setTextDropShadow(lastRecdVals["textSHA"].inputs);
      if (lastRecdVals["txtFont"]) this.setTextFont(lastRecdVals["txtFont"].inputs);
      if (lastRecdVals["txtFontSZ"]) this.setFontSize(lastRecdVals["txtFontSZ"].inputs);
      if (lastRecdVals["txtALI"]) this.setTextAlignment(lastRecdVals["txtALI"].inputs);
      if (lastRecdVals["lineDIS"]) this.setTextSpacing(lastRecdVals["lineDIS"].inputs);
      if (lastRecdVals["letDIS"]) this.setTextSpacing(lastRecdVals["letDIS"].inputs);

      const box = newTextElement.getBoundingClientRect();
      this.setMargins({ ID : args.ID, WIDTH : box.width / 2, HEIGHT : box.height });
    }

    replaceTxt(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${args.ID}`);
      elements.forEach((element) => { element.textContent = args.TXT });
    }

    removeTxt(args) {
      const elementsToRemove = document.querySelectorAll(`#SP_Text-Ext-${args.ID}`);
      elementsToRemove.forEach((element) => {
        render.removeOverlay(element)
        const index = allText.indexOf(`#SP_Text-Ext-${args.ID}`);
        if (index !== -1) allText.splice(index, 1);
      });
    }

    removeAllTxt() {
      for (let i = 0; i < allText.length; i++) {
        const elementsToRemove = document.querySelectorAll(allText[i]);
        elementsToRemove.forEach((element) => { render.removeOverlay(element) });
      }
      allText = [];
    }

    displayedTexts(args) {
      let texts = [];
      const elements = document.querySelectorAll(`#SP_Text-Ext-${args.ID}`);
      elements.forEach((element) => { texts.push(element.textContent) });
      return JSON.stringify(texts);
    }

    allIDs() {
      const cleanedIDs = allText.map((item) => item.replace(/^#SP_Text-Ext-/, ""));
      return JSON.stringify(cleanedIDs);
    }

    existingID(args) {
      const index = allText.indexOf(`#SP_Text-Ext-${args.ID}`);
      return Scratch.Cast.toBoolean(allText[index]);
    }

    makeGradient(args) { return `${args.TYPE}-gradient(${args.ANGLE}deg, ${args.COLOR1}, ${args.COLOR2})` }

    setTextColor(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${args.ID}`);
      elements.forEach((element) => {
        element.style.color = args.COLOR;
        if (args.COLOR.includes("gradient")) {
          element.style.background = args.COLOR;
          element.style.color = "transparent";
          element.style.webkitTextFillColor = "transparent";
          element.style.webkitBackgroundClip = "text";
        } else {
          element.style.color = args.COLOR;
          element.style.background = "none";
          element.style.webkitTextFillColor = "initial";
          element.style.webkitBackgroundClip = "initial";
        }
      });
      lastRecdVals["textCLR"] = {inputs: args};
    }

    setTextDropShadow(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${args.ID}`);
      elements.forEach((element) => {
        element.style.textShadow = `${args.x}px ${args.y * -1}px ${args.z}px ${args.COLOR}`;
      });
      lastRecdVals["textSHA"] = {inputs: args};
    }

    setTextOutline(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${args.ID}`);
      elements.forEach((element) => {
        element.style.webkitTextStrokeColor = args.COLOR;
        element.style.webkitTextStrokeWidth = `${args.THICKNESS}px`;
        //multi-platform support cuz we cant have nice things
        element.style.textStrokeColor = args.COLOR;
        element.style.textStrokeWidth = `${args.THICKNESS}px`;
        element.style.mozTextStrokeColor = args.COLOR;
        element.style.mozTextStrokeWidth = `${args.THICKNESS}px`;
      });
      lastRecdVals["textOUT"] = {inputs: args};
    }

    setMargins(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${args.ID}`);
      elements.forEach((element) => {
        element.style.width = `${args.WIDTH}px`;
        element.style.height = `${args.HEIGHT}px`;
      });
    }

    setTextAlignment(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${args.ID}`);
      elements.forEach((element) => { element.style.textAlign = args.ALIGNMENT });
      lastRecdVals["txtALI"] = {inputs: args};
    }

    setTextFont(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${args.ID}`);
      elements.forEach((element) => { element.style.fontFamily = args.FONT });
      lastRecdVals["txtFont"] = {inputs: args};
    }

    setFontSize(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${args.ID}`);
      elements.forEach((element) => { element.style.fontSize = `${args.SIZE}px` });
      lastRecdVals["txtFontSZ"] = {inputs: args};
    }

    setTextSpacing(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${args.ID}`);
      elements.forEach((element) => {
        element.style[args.ATT === "letter" ? "letterSpacing" : "lineHeight"] = `${args.SPACING}px`;
      });
      lastRecdVals["letDIS"] = {inputs: {ID : args.ID, SPACING : args.SPACING, ATT : "letter"}};
      lastRecdVals["lineDIS"] = {inputs: {ID : args.ID, SPACING : args.SPACING, ATT : "line"}};
    }

    setTextPosition(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${args.ID}`);
      elements.forEach((element) => {
        const box = element.getBoundingClientRect();
        element.style.position = "absolute";
        element.style.left = `${args.X - (box.width / 2)}px`;
        element.style.top = `${(args.Y * -1) - (box.height / 2)}px`;
      });
    }

    textPosition(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${args.ID}`);
      let value;
      elements.forEach((element) => {
        const box = element.getBoundingClientRect();
        if (args.ATT === "z layer") {
          value = element.parentNode.style.zIndex;
        } else {
          value = parseFloat(element.style[args.ATT.includes("x") ? "left" : "top"]);
          value = ((box[args.ATT.includes("x") ? "width" : "height"] / 2) + value) * (args.ATT.includes("x") ? 1 : -1);
        }
      });
      return value || 0;
    }

    attOfText(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${args.ID}`);
      let value;
      elements.forEach((element) => { value = element.style[args.ATT] });
      value = args.ATT === "fontFamily" || args.ATT === "textAlign" ? value : parseFloat(value);
      return value || "";
    }

    setTextZIndex(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${args.ID}`);
      elements.forEach((element) => { element.parentNode.style.zIndex = Math.round(args.Z_INDEX) });
    }

    setEffect(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${args.ID}`);
      elements.forEach((element) => {
        const currentStyleArray = [
          element.style.filter || "",
          element.parentNode.style.transform || "",
          element.style.opacity || ""
        ];
        const regex = new RegExp(`${args.EFFECT}\\([^)]+\\)`, "g");
        currentStyleArray.forEach((currentStyle, index) => {
          currentStyleArray[index] = currentStyle.replace(regex, "");
        });
        switch (args.EFFECT) {
          case "saturate":
            element.style.filter = `${currentStyleArray[0]} saturate(${args.VALUE}%)`;
            break;
          case "contrast":
            element.style.filter = `${currentStyleArray[0]} contrast(${args.VALUE + 100}%)`;
            break;
          case "brightness":
            element.style.filter = `${currentStyleArray[0]} brightness(${args.VALUE + 100}%)`;
            break;
          case "hue-rotate":
            element.style.filter = `${currentStyleArray[0]} hue-rotate(${args.VALUE}deg)`;
            break;
          case "opacity":
            element.style.opacity = (100 - args.VALUE) / 100;
            break;
          case "sepia":
            element.style.filter = `${currentStyleArray[0]} sepia(${args.VALUE}%)`;
            break;
          case "invert":
            element.style.filter = `${currentStyleArray[0]} invert(${args.VALUE}%)`;
            break;
          case "rotate":
            element.parentNode.style.transform = `${currentStyleArray[1]} rotate(${args.VALUE - 90}deg)`;
            break;
          case "scaleX":
            element.parentNode.style.transform = `${currentStyleArray[1]} scaleX(${args.VALUE / 100})`;
            break;
          case "scaleY":
            element.parentNode.style.transform = `${currentStyleArray[1]} scaleY(${args.VALUE / 100})`;
            break;
          case "skewX":
            element.parentNode.style.transform = `${currentStyleArray[1]} skewX(${args.VALUE}deg)`;
            break;
          case "skewY":
            element.parentNode.style.transform = `${currentStyleArray[1]} skewY(${args.VALUE}deg)`;
            break;
          default:
            element.style.filter = `${currentStyleArray[0]} blur(${args.VALUE}px)`;
            break;
        }
      });
    }

    resetEffect(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${args.ID}`);
      elements.forEach((element) => {
        const currentTransform = element.parentNode.style.transform || "";
        const updatedTransform = currentTransform
          .replace(/rotate\([^)]*\)/, "rotate(0deg)")
          .replace(/scaleX\([^)]*\)/, "scaleX(1)")
          .replace(/scaleY\([^)]*\)/, "scaleY(1)")
          .replace(/skewX\([^)]*\)/, "skewX(0deg)")
          .replace(/skewY\([^)]*\)/, "skewY(0deg)");
        element.parentNode.style.transform = updatedTransform;
        element.style.filter = "";
        element.style.opacity = 1;
      });
    }

    amtOfEffect(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${args.ID}`);
      let effectValue = args.EFFECT === "rotate" ? 90 : args.EFFECT.includes("scale") ? 100 : 0;
      elements.forEach((element) => {
        if (args.EFFECT === "rotate" || args.EFFECT.includes("scale") || args.EFFECT.includes("skew")) {
          const transformV = element.parentNode.style.transform.split(" ");
          const effectIndex = transformV.findIndex(value => value.includes(args.EFFECT));
          if (effectIndex !== -1) {
            effectValue = transformV[effectIndex].replace(/[^\d.-]/g, "");
            effectValue = args.EFFECT === "rotate" ? parseFloat(effectValue) + 90 :
              parseFloat(effectValue) * (args.EFFECT.includes("scale") ? 100 : 1);
          }
        } else if (args.EFFECT === "opacity") {
          effectValue = 100 - (parseFloat(element.style.opacity || 0) * 100);
        } else {
          const filterV = element.style.filter.split(" ");
          const effectIndex = filterV.findIndex((value) => value.includes(args.EFFECT));
          if (effectIndex !== -1) {
            effectValue =
              args.EFFECT === "contrast" || args.EFFECT === "brightness"
                ? parseFloat(filterV[effectIndex].replace(/[^\d.-]/g, "")) - 100
                : parseFloat(filterV[effectIndex].replace(/[^\d.-]/g, ""));
          }
        }
      });
      return effectValue;
    }

    setTextCurve(args) {
      const regex = args.ARC.includes("<svg") ? /<path[^>]*d="([^"]*)"/ : /<path[^>]*d="([^"]*)"/;
      const match = args.ARC.match(regex);
      const outline = lastRecdVals["textOUT"] !== undefined ? lastRecdVals["textOUT"] : "";
      if (match && match[1]) {
        const elements = document.querySelectorAll(`#SP_Text-Ext-${args.ID}`);
        elements.forEach((element) => {
          const existingSvg = element.querySelector("svg");
          if (existingSvg) {
            const path = existingSvg.querySelector("path");
            path.setAttribute("d", match[1]);
            const textFill = existingSvg.querySelector("text");
            textFill.setAttribute("fill", element.style.color === "transparent" ? "#000000" : element.style.color);
            const textPathFill = existingSvg.querySelector("textPath");
            textPathFill.setAttribute("href", `#MyPath-${args.ID}`);
            textPathFill.textContent = element.textContent;

            const textStroke = existingSvg.querySelector("text");
            textStroke.setAttribute("fill", outline ? outline.inputs.COLOR ?? "#00000000" : "#00000000");
            textStroke.setAttribute("stroke", outline ? outline.inputs.COLOR ?? "#00000000" : "#00000000");
            textStroke.setAttribute("stroke-width", outline ? outline.inputs.THICKNESS ?? 1 : 1);
            const textPathStroke = existingSvg.querySelector("textPath");
            textPathStroke.setAttribute("href", `#MyPath-${args.ID}`);
            textPathStroke.textContent = element.textContent;
          } else {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("id", `MyPath-${args.ID}`);
            path.setAttribute("d", match[1]);
            defs.appendChild(path);

            const textStroke = document.createElementNS("http://www.w3.org/2000/svg", "text");
            textStroke.setAttribute("fill", outline ? outline.inputs.COLOR : "#00000000");
            textStroke.setAttribute("stroke", outline ? outline.inputs.COLOR : "#00000000");
            textStroke.setAttribute("stroke-width", outline ? outline.inputs.THICKNESS : 1);
            const textPathStroke = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
            textPathStroke.setAttribute("href", `#MyPath-${args.ID}`);
            textPathStroke.textContent = element.textContent;
            textStroke.appendChild(textPathStroke);

            svg.appendChild(defs);
            svg.appendChild(textStroke);
            const textFill = document.createElementNS("http://www.w3.org/2000/svg", "text");
            textFill.setAttribute("fill", element.style.color === "transparent" ? "#000000" : element.style.color);
            const textPathFill = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
            textPathFill.setAttribute("href", `#MyPath-${args.ID}`);
            textPathFill.textContent = element.textContent;
            textFill.appendChild(textPathFill);
            svg.appendChild(textFill);
            element.innerHTML = "";
            element.appendChild(svg);
          }
        });
      }
    }

    presetCurve(args) {
      const presets = {
        circle : `<svg><path d="M41.9375,89.5c0,-37.83151 30.66849,-68.5 68.5,-68.5c37.83151,0 68.5,30.66849 68.5,68.5c0,37.83151 -30.66849,68.5 -68.5,68.5c-37.83151,0 -68.5,-30.66849 -68.5,-68.5z"/></svg`,
        hill : `<svg><path d="M37.4375,89.5c0,0 43.00879,-31 74.5,-31c31.49121,0 71.5,31 71.5,31"/></svg`,
        dip : `<svg><path d="M37.4375,89.5c0,0 42.00879,25 73.5,25c31.49121,0 72.5,-25 72.5,-25"/></svg>`,
        wave : `<svg><path d="M24.4375,98.67214c0,0 38.3049,-22.48612 65.97496,-23c27.67006,-0.51388 44.8836,19.04663 76.52154,23.35359c37.46107,5.09968 76.066,-17.35359 76.066,-17.35359"/></svg>`
      };
      return presets[args.ARC];
    }
  }

  Scratch.extensions.register(new SPdisText());
})(Scratch);
