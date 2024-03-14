// Name: Display Text
// ID: SPdisText
// Description: Display Text in Your Projects!
// By: SharkPool

// Version V.1.3.4

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
    "Sans Serif", "Serif", "Handwriting",
    "Marker", "Curly", "Pixel"
  ];

  const xmlEscape = function (unsafe) {
    unsafe = String(unsafe);
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

  class SPdisText {
    constructor() {
      Scratch.vm.runtime.on("PROJECT_START", () => { this.removeAllTxt() });
      Scratch.vm.runtime.on("PROJECT_STOP_ALL", () => { this.removeAllTxt() });
    }
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
            text: "text with ID [ID] exist?",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" }
            },
          },
          {
            opcode: "allIDs",
            blockType: Scratch.BlockType.REPORTER,
            text: "all text IDs"
          },
          "---",
          {
            opcode: "debug",
            blockType: Scratch.BlockType.COMMAND,
            text: "toggle debug mode [TOGGLE]",
            arguments: {
              TOGGLE: { type: Scratch.ArgumentType.STRING, menu: "TOGGLE" }
            },
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
            opcode: "setThick",
            blockType: Scratch.BlockType.COMMAND,
            text: "set boldness of ID [ID] to [NUM]",
            arguments: {
              NUM : { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" }
            }
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
          {
            opcode: "setOverflow",
            blockType: Scratch.BlockType.COMMAND,
            text: "set text overflow of ID [ID] to [TYPE]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "OVERFLOW" }
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
          {
            opcode: "lineCnt",
            blockType: Scratch.BlockType.REPORTER,
            text: "# of lines in text ID [ID]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" }
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
          {
            opcode: "setLine",
            blockType: Scratch.BlockType.COMMAND,
            text: "set text line of ID [ID] to [TYPE1] [TYPE2] colored [COLOR] thickness [THICK]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              TYPE1: { type: Scratch.ArgumentType.STRING, menu: "STYLE" },
              TYPE2: { type: Scratch.ArgumentType.STRING, menu: "LINE_TYPE" },
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
              THICK: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 }
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
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "GRADIENTS" }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "↓ Will Lose Some Formatting ↓" },
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
            opcode: "presetTextPosition",
            blockType: Scratch.BlockType.COMMAND,
            text: "preset position of ID [ID] to x: [X] y: [Y]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
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
              ATT: { type: Scratch.ArgumentType.STRING, menu: "POS" }
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
          TOGGLE: ["on", "off"],
          FONTS: {
            acceptReporters: true,
            items: "allFonts"
          },
          STYLE: {
            acceptReporters: true,
            items: ["solid", "wavy", "dashed", "double"]
          },
          LINE_TYPE: {
            acceptReporters: true,
            items: ["underline", "strikethrough"]
          },
          ALIGNMENTS: {
            acceptReporters: true,
            items: ["left", "right", "center"]
          },
          TEXT_ATT: ["letter", "line"],
          GRADIENTS: {
            acceptReporters: true,
            items: ["linear", "radial"]
          },
          POS: ["x position", "y position", "z layer"],
          OVERFLOW: ["visible", "hidden"],
          ARCS: ["circle", "hill", "dip", "wave"],
          THICK: [
            { text : "thick", value : "900" },
            { text : "medium", value : "600" },
            { text : "none", value : "1" },
          ],
          FORMATS: {
            acceptReporters: true,
            items: [
              { text: "font", value: "fontFamily" },
              { text: "font size", value: "fontSize" },
              { text: "boldness", value: "fontWeight" },
              { text: "alignment", value: "textAlign" },
              { text: "margin width", value: "width" },
              { text: "margin height", value: "height" },
              { text: "display width", value: "box2w" },
              { text: "display height", value: "box2h" },
              { text: "letter spacing", value: "letterSpacing" },
              { text: "line spacing", value: "lineHeight" },
              { text: "overflow type", value: "overflow" }
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

    fixID(ID) {
      return xmlEscape(Scratch.Cast.toString(ID).replaceAll(" ", "_")
        .replaceAll(/[#%(),.{}[/\]$@^*&'";:]/g, "-"));
    }

    debug(args) {
      const toggle = args.TOGGLE === "on" ? "solid" : "none";
      const elements = document.querySelectorAll(`[id^="SP_Text-Ext-"]`);
      elements.forEach((element) => {
        element.style.border = toggle;
        element.style.borderWidth = "1px";
        const color = element.style.textAlign === "center" ? "#00ff00" : element.style.textAlign === "right" ? "#0000ff" : "#ff0000";
        element.style.borderColor = color;
      });
      const cross = document.getElementById(`SP_Text-Debug-Cross`);
      if (toggle === "none" && cross) {
        cross.parentNode.removeChild(cross);
      } else if (toggle === "solid" && !cross) {
        const imageUrl =
          "data:image/png;base64,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";
        const crossElement = document.createElement("img");
        crossElement.src = imageUrl;
        crossElement.id = "SP_Text-Debug-Cross";
        crossElement.style.position = "absolute";
        crossElement.style.width = "480px";
        crossElement.style.height = "360px";
        crossElement.style.transform = "translate(-50%, -50%)";
        crossElement.style.zIndex = "0";
        render.addOverlay(crossElement, "scale-centered");
        allText.push(`#SP_Text-Debug-Cross`);
      }
    }

    printTxt(args) {
      args.ID = this.fixID(args.ID);
      const newTextElement = document.createElement("div");
      newTextElement.innerHTML = xmlEscape(args.TXT).replace(/\n/g, "<br>");
      newTextElement.id = `SP_Text-Ext-${args.ID}`;
      newTextElement.classList.add(args.ID);
      render.addOverlay(newTextElement, "scale-centered");
      allText.push(`#SP_Text-Ext-${args.ID}`);
      const box = newTextElement.getBoundingClientRect();
      if (lastRecdVals.textMAR === undefined) this.setMargins({ ID : args.ID, WIDTH : box.width / 2, HEIGHT : box.height });

      // add formatting (if any)
      const propertiesAndMethods = [
        ["textMAR", "setMargins"], ["preTxt1", "presetTextPosition"],
        ["textCLR", "setTextColor"], ["textLIN", "setLine"],
        ["textOUT", "setTextOutline"], ["textSHA", "setTextDropShadow"],
        ["txtFont", "setTextFont"], ["txtFontSZ", "setFontSize"],
        ["txtALI", "setTextAlignment"], ["lineDIS", "setTextSpacing"],
        ["letDIS", "setTextSpacing"], ["textOVR", "setOverflow"],
        ["txtFontTK", "setThick"]
      ];
      for (const [property, method] of propertiesAndMethods) {
        if (lastRecdVals[property] && lastRecdVals[property].inputs.ID === args.ID) {
          this[method](lastRecdVals[property].inputs);
        }
      }
    }

    replaceTxt(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${this.fixID(args.ID)}`);
      if (elements.length > 0) {
        elements.forEach((element) => { element.innerHTML = xmlEscape(args.TXT).replace(/\n/g, "<br>") });
      } else {
        this.printTxt(args);
      }
    }

    removeTxt(args) {
      args.ID = this.fixID(args.ID);
      const elementsToRemove = document.querySelectorAll(`#SP_Text-Ext-${args.ID}`);
      elementsToRemove.forEach((element) => {
        render.removeOverlay(element);
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
      const elements = document.querySelectorAll(`#SP_Text-Ext-${this.fixID(args.ID)}`);
      elements.forEach((element) => { texts.push(element.textContent) });
      return JSON.stringify(texts);
    }

    allIDs() {
      const cleanedIDs = allText.map((item) => item.replace(/^#SP_Text-Ext-/, ""));
      for (let i = cleanedIDs.length - 1; i >= 0; i--) {
        if (cleanedIDs[i] === "#SP_Text-Debug-Cross") cleanedIDs.splice(i, 1);
      }
      return JSON.stringify(cleanedIDs);
    }

    existingID(args) {
      const index = allText.indexOf(`#SP_Text-Ext-${this.fixID(args.ID)}`);
      return Scratch.Cast.toBoolean(allText[index]);
    }

    makeGradient(args) { return `${args.TYPE}-gradient(${args.ANGLE}deg, ${args.COLOR1}, ${args.COLOR2})` }

    setTextColor(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${this.fixID(args.ID)}`);
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
      const elements = document.querySelectorAll(`#SP_Text-Ext-${this.fixID(args.ID)}`);
      elements.forEach((element) => {
        element.style.textShadow = args.z === 0 ? "none" : `${args.x}px ${args.y * -1}px ${args.z}px ${args.COLOR}`;
      });
      lastRecdVals["textSHA"] = {inputs: args};
    }

    setOverflow(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${this.fixID(args.ID)}`);
      elements.forEach((element) => { element.style.overflow = args.TYPE });
      lastRecdVals["textOVR"] = {inputs: args};
    }

    setTextOutline(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${this.fixID(args.ID)}`);
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

    setLine(args) {
      const lineType = args.TYPE2.replace("strike", "line-");
      const elements = document.querySelectorAll(`#SP_Text-Ext-${this.fixID(args.ID)}`);
      elements.forEach((element) => {
        element.style.textDecorationLine = lineType;
        element.style.textDecorationStyle = args.TYPE1;
        element.style.textDecorationThickness = `${args.THICK}px`;
        element.style.textDecorationColor = args.COLOR;
      });
      lastRecdVals["textLIN"] = {inputs: args};
    }

    setMargins(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${this.fixID(args.ID)}`);
      elements.forEach((element) => {
        element.style.width = `${args.WIDTH}px`;
        element.style.height = `${args.HEIGHT}px`;
      });
      lastRecdVals["textMAR"] = {inputs: args};
    }

    setTextAlignment(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${this.fixID(args.ID)}`);
      elements.forEach((element) => { element.style.textAlign = args.ALIGNMENT });
      lastRecdVals["txtALI"] = {inputs: args};
    }

    setTextFont(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${this.fixID(args.ID)}`);
      elements.forEach((element) => { element.style.fontFamily = args.FONT });
      lastRecdVals["txtFont"] = {inputs: args};
    }

    setFontSize(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${this.fixID(args.ID)}`);
      elements.forEach((element) => { element.style.fontSize = `${args.SIZE}px` });
      lastRecdVals["txtFontSZ"] = {inputs: args};
    }

    setThick(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${this.fixID(args.ID)}`);
      elements.forEach((element) => { element.style.fontWeight = args.NUM * 9 });
      lastRecdVals["txtFontTK"] = {inputs: args};
    }

    setTextSpacing(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${this.fixID(args.ID)}`);
      elements.forEach((element) => {
        element.style[args.ATT === "letter" ? "letterSpacing" : "lineHeight"] = `${args.SPACING}px`;
      });
      lastRecdVals["letDIS"] = {inputs: {ID : args.ID, SPACING : args.SPACING, ATT : "letter"}};
      lastRecdVals["lineDIS"] = {inputs: {ID : args.ID, SPACING : args.SPACING, ATT : "line"}};
    }

    presetTextPosition(args) {
      if (args.isPrint === undefined) {
        lastRecdVals["preTxt1"] = {inputs: {...args, isPrint: true}};
      } else {
        setTimeout(function() {
          const elements = document.querySelectorAll(`#SP_Text-Ext-${this.fixID(args.ID)}`);
          const element = elements[elements.length - 1];
          const centerW = parseFloat(element.style.width) / 2;
          const computedStyle = window.getComputedStyle(element);
          const lineHeight = computedStyle.getPropertyValue("line-height");
          const fontSize = computedStyle.getPropertyValue("font-size");
          const centerH = (lineHeight === "normal" ? parseFloat(fontSize) * 1.2 : parseFloat(lineHeight)) / 2;
          element.style.position = "absolute";
          element.style.left = `${args.X - centerW}px`;
          element.style.top = `${(args.Y * -1) - centerH}px`;
        }.bind(this), 0);
      }
    }

    setTextPosition(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${this.fixID(args.ID)}`);
      elements.forEach((element) => {
        let centerW = parseFloat(element.style.width) / 2;
        if (isNaN(centerW)) centerW = (element.getBoundingClientRect().width ?? 0 ) / 2;
        const computedStyle = window.getComputedStyle(element);
        const lineHeight = computedStyle.getPropertyValue("line-height");
        const fontSize = computedStyle.getPropertyValue("font-size");
        const centerH = (lineHeight === "normal" ? parseFloat(fontSize) * 1.2 : parseFloat(lineHeight)) / 2;
        element.style.position = "absolute";
        element.style.left = `${args.X - centerW}px`;
        element.style.top = `${(args.Y * -1) - centerH}px`;
      });
    }

    textPosition(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${this.fixID(args.ID)}`);
      let value;
      elements.forEach((element) => {
        const centerW = parseFloat(element.style.width) / 2;
        const computedStyle = window.getComputedStyle(element);
        const lineHeight = computedStyle.getPropertyValue("line-height");
        const fontSize = computedStyle.getPropertyValue("font-size");
        const centerH = (lineHeight === "normal" ? parseFloat(fontSize) * 1.2 : parseFloat(lineHeight)) / 2;
        if (args.ATT === "z layer") {
          value = element.parentNode.style.zIndex;
        } else {
          value = parseFloat(element.style[args.ATT.includes("x") ? "left" : "top"]);
          value = ((args.ATT.includes("x") ? centerW : centerH) + value) * (args.ATT.includes("x") ? 1 : -1);
        }
      });
      return Math.round(value * 100) / 100 || 0;
    }

    attOfText(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${this.fixID(args.ID)}`);
      let value;
      if (args.ATT.includes("box2")) {
        const calcs = [];
        elements.forEach((element) => {
          const tempSpan = document.createElement("span");
          tempSpan.innerHTML = element.textContent;
          tempSpan.style.fontSize = element.style.fontSize;
          tempSpan.style.fontFamily = getComputedStyle(element).fontFamily;
          tempSpan.style.display = "inline";
          document.body.appendChild(tempSpan);
          calcs.push(tempSpan[`offset${args.ATT.includes("w") ? "Width" : "Height"}`]);
          document.body.removeChild(tempSpan);
        });
        return JSON.stringify(calcs);
      } else {
        elements.forEach((element) => { value = element.style[args.ATT] });
        value = args.ATT === "fontFamily" || args.ATT === "textAlign" || args.ATT === "overflow" ? value : parseFloat(value);
        value = args.ATT === "fontWeight" ? value / 9 : value;
        return value || "";
      }
    }
  
    lineCnt(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${this.fixID(args.ID)}`);
      let value = [];
      elements.forEach((element) => {
        value.push(element.querySelectorAll("br").length + 1 || 1); 
      });
      value = value.length > 1 ? JSON.stringify(value) : (value[0] || 0);
      return value;
    }

    setTextZIndex(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${this.fixID(args.ID)}`);
      elements.forEach((element) => { element.parentNode.style.zIndex = Math.round(args.Z_INDEX) });
    }

    setEffect(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${this.fixID(args.ID)}`);
      elements.forEach((element) => {
        const curStyles = [
          element.style.filter || "",
          element.parentNode.style.transform || "",
          element.style.opacity || ""
        ];
        const regex = new RegExp(`${args.EFFECT}\\([^)]+\\)`, "g");
        curStyles.forEach((curStyle, index) => {
          curStyles[index] = curStyle.replace(regex, "");
        });
        switch (args.EFFECT) {
          case "saturate":
            element.style.filter = `${curStyles[0]} saturate(${args.VALUE}%)`;
            break;
          case "contrast":
            element.style.filter = `${curStyles[0]} contrast(${args.VALUE + 100}%)`;
            break;
          case "brightness":
            element.style.filter = `${curStyles[0]} brightness(${args.VALUE + 100}%)`;
            break;
          case "hue-rotate":
            element.style.filter = `${curStyles[0]} hue-rotate(${args.VALUE}deg)`;
            break;
          case "opacity":
            element.style.opacity = (100 - args.VALUE) / 100;
            break;
          case "sepia":
            element.style.filter = `${curStyles[0]} sepia(${args.VALUE}%)`;
            break;
          case "invert":
            element.style.filter = `${curStyles[0]} invert(${args.VALUE}%)`;
            break;
          case "rotate":
            element.parentNode.style.transform = `${curStyles[1]} rotate(${args.VALUE - 90}deg)`;
            break;
          case "scaleX":
            element.parentNode.style.transform = `${curStyles[1]} scaleX(${args.VALUE / 100})`;
            break;
          case "scaleY":
            element.parentNode.style.transform = `${curStyles[1]} scaleY(${args.VALUE / 100})`;
            break;
          case "skewX":
            element.parentNode.style.transform = `${curStyles[1]} skewX(${args.VALUE}deg)`;
            break;
          case "skewY":
            element.parentNode.style.transform = `${curStyles[1]} skewY(${args.VALUE}deg)`;
            break;
          default:
            element.style.filter = `${curStyles[0]} blur(${args.VALUE}px)`;
            break;
        }
      });
    }

    resetEffect(args) {
      const elements = document.querySelectorAll(`#SP_Text-Ext-${this.fixID(args.ID)}`);
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
      const elements = document.querySelectorAll(`#SP_Text-Ext-${this.fixID(args.ID)}`);
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
      args.ID = this.fixID(args.ID)
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
