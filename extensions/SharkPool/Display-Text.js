// Name: Display Text
// ID: SPdisText
// Description: Display Text in Your Projects!
// By: SharkPool

// Version V.1.5.0

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Display Text must run unsandboxed!");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NS4yMzQiIGhlaWdodD0iNjUuMjM0IiB2aWV3Qm94PSIwIDAgNjUuMjM0IDY1LjIzNCI+PGcgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMCAzMi42MTdDMCAxNC42MDMgMTQuNjAzIDAgMzIuNjE3IDBzMzIuNjE3IDE0LjYwMyAzMi42MTcgMzIuNjE3LTE0LjYwMyAzMi42MTctMzIuNjE3IDMyLjYxN1MwIDUwLjYzMSAwIDMyLjYxNyIgZmlsbD0iIzNjNGU1YyIvPjxwYXRoIGQ9Ik0zLjM5MSAzMi42MTdjMC0xNi4xNDEgMTMuMDg1LTI5LjIyNiAyOS4yMjYtMjkuMjI2czI5LjIyNiAxMy4wODUgMjkuMjI2IDI5LjIyNi0xMy4wODUgMjkuMjI2LTI5LjIyNiAyOS4yMjZTMy4zOTEgNDguNzU4IDMuMzkxIDMyLjYxNyIgZmlsbD0iIzc4OSIvPjxwYXRoIGQ9Ik0xOS4wNzYgNDkuNDc5YTMuMzIgMy4zMiAwIDAgMS0zLjMyMS0zLjMydi00Ljk1aDIuNjA3djIuODU1YTIuODEgMi44MSAwIDAgMCAyLjgwOCAyLjgwOGgyLjg1NHYyLjYwN3ptMjQuOTg4LTIuNjA3YTIuODEgMi44MSAwIDAgMCAyLjgwOC0yLjgwOFY0MS4yMWgyLjYwN3Y0Ljk0OGEzLjMyIDMuMzIgMCAwIDEtMy4zMiAzLjMyMWgtNC45NXYtMi42MDd6bS0yOC4zMS0yNy43OTZhMy4zMiAzLjMyIDAgMCAxIDMuMzIyLTMuMzIxaDQuOTQ4djIuNjA3SDIxLjE3YTIuODEgMi44MSAwIDAgMC0yLjgwOCAyLjgwOHYyLjg1NGgtMi42MDd6bTMwLjQwNC0zLjMyMWEzLjMyIDMuMzIgMCAwIDEgMy4zMjEgMy4zMnY0Ljk1aC0yLjYwN1YyMS4xN2EyLjgxIDIuODEgMCAwIDAtMi44MDgtMi44MDhINDEuMjF2LTIuNjA3eiIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIuNSIvPjxwYXRoIGQ9Ik0yNS44MTEgMjcuNTIxYS45My45MyAwIDAgMS0uOTI4LS45Mjl2LTEuNjI2YzAtLjUxMy40MTUtLjkyOC45MjgtLjkyOGgxMy42MTJjLjUxMyAwIC45MjguNDE1LjkyOC45Mjh2MS42MjZhLjkzLjkzIDAgMCAxLS45MjguOTI5eiIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIvPjxwYXRoIGQ9Ik0zMC44NzUgMjYuNjU3YS45My45MyAwIDAgMSAuOTI5LS45M2gxLjYyNmEuOTMuOTMgMCAwIDEgLjkyOS45M3YxMy42MTFhLjkzLjkzIDAgMCAxLS45MjkuOTI4aC0xLjYyNmEuOTMuOTMgMCAwIDEtLjkyOS0uOTI4eiIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIvPjwvZz48L3N2Zz4=";

  const blockIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OS42MjQiIGhlaWdodD0iNDkuNjI0IiB2aWV3Qm94PSIwIDAgNDkuNjI0IDQ5LjYyNCI+PGcgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMCA0OS42MjRWMGg0OS42MjR2NDkuNjI0eiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xMS4yNzEgNDEuNjc0YTMuMzIgMy4zMiAwIDAgMS0zLjMyMS0zLjMydi00Ljk1aDIuNjA3djIuODU1YTIuODEgMi44MSAwIDAgMCAyLjgwOCAyLjgwOGgyLjg1NHYyLjYwN3ptMjQuOTg4LTIuNjA3YTIuODEgMi44MSAwIDAgMCAyLjgwOC0yLjgwOHYtMi44NTRoMi42MDd2NC45NDhhMy4zMiAzLjMyIDAgMCAxLTMuMzIgMy4zMjFoLTQuOTV2LTIuNjA3ek03Ljk0OSAxMS4yNzFhMy4zMiAzLjMyIDAgMCAxIDMuMzIyLTMuMzIxaDQuOTQ4djIuNjA3aC0yLjg1NGEyLjgxIDIuODEgMCAwIDAtMi44MDggMi44MDh2Mi44NTRINy45NXpNMzguMzUzIDcuOTVhMy4zMiAzLjMyIDAgMCAxIDMuMzIxIDMuMzJ2NC45NWgtMi42MDd2LTIuODU1YTIuODEgMi44MSAwIDAgMC0yLjgwOC0yLjgwOGgtMi44NTRWNy45NXoiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyLjUiLz48cGF0aCBkPSJNMTguMDA2IDE5LjcxNmEuOTMuOTMgMCAwIDEtLjkyOC0uOTI5di0xLjYyNmMwLS41MTMuNDE1LS45MjguOTI4LS45MjhoMTMuNjEyYy41MTMgMCAuOTI4LjQxNS45MjguOTI4djEuNjI2YS45My45MyAwIDAgMS0uOTI4LjkyOXoiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBkPSJNMjMuMDcgMTguODUyYS45My45MyAwIDAgMSAuOTI5LS45M2gxLjYyNmEuOTMuOTMgMCAwIDEgLjkyOS45M3YxMy42MTFhLjkzLjkzIDAgMCAxLS45MjkuOTI4aC0xLjYyNmEuOTMuOTMgMCAwIDEtLjkyOS0uOTI4eiIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIvPjwvZz48L3N2Zz4=";

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const render = vm.renderer;
  const fontMenu = [
    "Scratch", "Sans Serif", "Serif", "Handwriting", "Marker", "Curly", "Pixel"
  ];
  const markdownConsts = {
    "**": "b", "*/": "i", "~~": "s", "#1": "h1", "#2": "h2",
    "@c": `span style="color: ---"`, "@h": `span style="background-color: ---"`, "@f": `span style="font-family: ---"`,
  };

  let allText = [], clickedTxts = [], txtSettings = {};

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

  const txt2md = function (txt) {
    const mdCache = [];
    let md = "";
    txt = xmlEscape(txt);
    for (let i = 0; i < txt.length; i++) {
      const code = `${txt[i]}${txt[i + 1]}`;
      const form = markdownConsts[code];
      if (!form) md += txt[i];
      else {
        const cacheInd = mdCache.indexOf(form);
        if (cacheInd === -1) {
          if (code === "@c" || code === "@h" || code === "@f") {
            const testString = txt.substring(i + 2, txt.length);
            const ind = testString.indexOf(":");
            if (testString.indexOf(code) > -1 && ind) {
              const color = testString.substring(0, ind);
              md += `<${form.replace("---", color)}>`;
              mdCache.push(form);
              i += ind + 1;
            } else {
              md += code;
            }
          } else {
            md += `<${form}>`;
            mdCache.push(form);
          }
        } else {
          md += `</${form}>`;
          mdCache.splice(cacheInd, 1);
        }
        i++;
      }
    }
    if (mdCache.length > 0) {
      const mdConstVals = Object.entries(markdownConsts);
      for (let i = 0; i < mdCache.length; i++) {
        const oldForm = mdConstVals.find(([k, v]) => v === mdCache[i])?.[0];
        const item = `<${mdCache[i]}>`;
        const lastInd = md.lastIndexOf(item);
        md = md.substring(0, lastInd) + oldForm + md.substring(lastInd + item.length, md.length); 
      }
    }
    return md.replace(/\n/g, "<br>");
  };

  class SPdisText {
    constructor() {
      runtime.on("PROJECT_START", () => { this.removeAllTxt() });
      runtime.on("PROJECT_STOP_ALL", () => { this.removeAllTxt() });
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
              TXT: { type: Scratch.ArgumentType.STRING, defaultValue: "hello world" }
            },
          },
          {
            opcode: "replaceTxt",
            blockType: Scratch.BlockType.COMMAND,
            text: "replace text of ID [ID] with [TXT]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              TXT: { type: Scratch.ArgumentType.STRING, defaultValue: "lorem ipsum" }
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
          "---",
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
          { blockType: Scratch.BlockType.LABEL, text: "Advanced" },
          {
            func: "tutorial",
            blockType: Scratch.BlockType.BUTTON,
            text: "Markdown Formatting"
          },
          {
            opcode: "debug",
            blockType: Scratch.BlockType.COMMAND,
            text: "toggle debug mode [TOGGLE]",
            arguments: {
              TOGGLE: { type: Scratch.ArgumentType.STRING, menu: "TOGGLE" }
            },
          },
          "---",
          {
            opcode: "resetTxt",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset text settings with ID [ID]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" }
            },
          },
          {
            opcode: "reuseStyle",
            blockType: Scratch.BlockType.COMMAND,
            text: "reuse text settings in ID [ID] for ID [ID2]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              ID2: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text2" }
            },
          },
          "---",
          {
            opcode: "toggleSelect",
            blockType: Scratch.BlockType.COMMAND,
            text: "toggle highlighting for ID [ID] [TYPE]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "TOGGLE" }
            },
          },
          {
            opcode: "makeClick",
            blockType: Scratch.BlockType.COMMAND,
            text: "toggle clicking for ID [ID] [TYPE]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "TOGGLE" }
            },
          },
          {
            opcode: "isClicked",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "ID [ID] clicked?",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-text" }
            },
          },
          {
            opcode: "whenClick",
            blockType: Scratch.BlockType.EVENT,
            isEdgeActivated: false,
            text: "when any text clicked"
          },
          {
            opcode: "clickedID",
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true,
            text: "clicked text ID"
          },
        ],
        menus: {
          FONTS: { acceptReporters: true, items: "allFonts" },
          TOGGLE: ["on", "off"],
          TEXT_ATT: ["letter", "line"],
          POS: ["x position", "y position", "z layer"],
          OVERFLOW: ["visible", "hidden"],
          ARCS: ["circle", "hill", "dip", "wave"],
          STYLE: {
            acceptReporters: true,
            items: ["solid", "wavy", "dashed", "double"]
          },
          LINE_TYPE: { acceptReporters: true, items: ["underline", "strikethrough"] },
          ALIGNMENTS: { acceptReporters: true, items: ["left", "right", "center"] },
          GRADIENTS: { acceptReporters: true, items: ["linear", "radial"] },
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
              { text: "skew y", value: "skewY" }
            ]
          }
        }
      };
    }

    // Helper Funcs
    allFonts() {
      const customFonts = runtime.fontManager ? runtime.fontManager.getFonts().map((i) => ({ text: i.name, value: i.family })) : [];
      return [...fontMenu, ...customFonts];
    }

    fixID(ID) {
      ID = xmlEscape(Scratch.Cast.toString(ID).replaceAll(" ", "_").replaceAll(/[#%(),.{}[/\]$@^*&'";:]/g, "-"));
      txtSettings[ID] = { ...txtSettings[ID] };
      return ID;
    }

    handleClick(e) {
      clickedTxts.push(e.target.className);
      const index = clickedTxts.length - 1;
      const threads = runtime.startHats("SPdisText_whenClick");
      for (let i = 0; i < threads.length; i++) threads[i].SPdisTxtClickID = e.target.className;
      setTimeout(() => { clickedTxts.splice(index, 1) }, 100);
    }

    updateStyles(txtSetting, optOverrideName) {
      const propsd2Func = [
        ["textMAR", "setMargins"], ["preTxt1", "presetTextPosition"],
        ["textCLR", "setTextColor"], ["textLIN", "setLine"],
        ["textOUT", "setTextOutline"], ["textSHA", "setTextDropShadow"],
        ["txtFont", "setTextFont"], ["txtFontSZ", "setFontSize"],
        ["txtALI", "setTextAlignment"], ["lineDIS", "setTextSpacing"],
        ["letDIS", "setTextSpacing"], ["textOVR", "setOverflow"],
        ["txtFontTK", "setThick"]
      ];
      if (optOverrideName) {
        for (const [id, func] of propsd2Func) {
          if (txtSetting[id]) this[func]({ ...txtSetting[id], ID: optOverrideName });
        }
      } else {
        for (const [id, func] of propsd2Func) {
          if (txtSetting[id]) this[func](txtSetting[id]);
        }
      }
    }

    // Block Funcs
    tutorial() {
      alert([
        "Can be Inlined:\n",
        "Bold Text → **text**\n","Italic Text → */text*/\n","Strike Text → ~~text~~\n","Header 1 Text → #1text#1\n","Header 2 Text → #2text#2\n",
        "\nCannot be Inlined:\n",
        "Color → @c #ff0000: text@c\n","Highlight → @h #00ff00: text@h\n","Font → @f name: text@f"
      ].join(""));
    }

    debug(args) {
      const toggle = args.TOGGLE === "on" ? "solid" : "none";
      const elements = document.querySelectorAll(`div[id^="SP_Text-Ext-"]`);
      elements.forEach((element) => {
        element.style.border = toggle; element.style.borderWidth = "1px";
        element.style.borderColor = element.style.textAlign === "center" ? "#00ff00" : element.style.textAlign === "right" ? "blue" : "red";
      });
      const cross = document.getElementById(`SP_Text-Debug-Cross`);
      if (toggle === "none" && cross) cross.parentNode.removeChild(cross);
      else if (toggle === "solid" && !cross) {
        const xyCross = document.createElement("img");
        xyCross.crossOrigin = "Anonymous";
        xyCross.src = "https://cdn.assets.scratch.mit.edu/internalapi/asset/9838d02002d05f88dc54d96494fbc202.png/get/";
        xyCross.id = "SP_Text-Debug-Cross";
        xyCross.style.position = "absolute";
        xyCross.style.width = "480px"; xyCross.style.height = "360px";
        xyCross.style.transform = "translate(-50%, -50%)";
        xyCross.style.zIndex = "0"; xyCross.style.opacity = "50%";
        render.addOverlay(xyCross, "scale-centered");
        allText.push(`#SP_Text-Debug-Cross`);
      }
    }

    printTxt(args) {
      const ID = this.fixID(args.ID);
      const settings = txtSettings[ID];
      const textDiv = document.createElement("div");
      textDiv.style.transformOrigin = "left top";
      const txtElement = document.createElement("div");
      txtElement.innerHTML = txt2md(args.TXT);
      txtElement.id = `SP_Text-Ext-${ID}`;
      txtElement.classList.add(ID);
      txtElement.style.userSelect = "none";
      txtElement.setAttribute("sptxtpos", "120|-10");
      txtElement.setAttribute("txtContent", args.TXT);
      textDiv.appendChild(txtElement);
      render.addOverlay(textDiv, "scale-centered");
      allText.push(`#SP_Text-Ext-${ID}`);
      const box = txtElement.getBoundingClientRect();
      if (settings.textMAR === undefined) this.setMargins({ ID, WIDTH : box.width / 2, HEIGHT : box.height });
      this.updateStyles(settings); // add formatting (if any)
    }

    replaceTxt(args) {
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${this.fixID(args.ID)}"]`);
      if (elements.length > 0) elements.forEach((element) => {
        element.setAttribute("txtContent", args.TXT);
        element.innerHTML = txt2md(args.TXT);
      });
      else this.printTxt(args);
    }

    removeTxt(args) {
      const ID = this.fixID(args.ID);
      const elementsToRemove = document.querySelectorAll(`div[id="SP_Text-Ext-${ID}"]`);
      elementsToRemove.forEach((element) => {
        render.removeOverlay(element.parentNode);
        element.removeEventListener("click", this.handleClick);
        const index = allText.indexOf(`#SP_Text-Ext-${ID}`);
        if (index !== -1) allText.splice(index, 1);
      });
    }

    removeAllTxt() {
      for (let i = 0; i < allText.length; i++) {
        const elementsToRemove = document.querySelectorAll(allText[i]);
        elementsToRemove.forEach((element) => {
          render.removeOverlay(element.parentNode);
          element.removeEventListener("click", this.handleClick);
        });
      }
      allText = []; clickedTxts = [];
    }

    displayedTexts(args) {
      let texts = [];
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${this.fixID(args.ID)}"]`);
      elements.forEach((element) => { texts.push(element.getAttribute("txtContent")) });
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
      const ID = this.fixID(args.ID);
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${ID}"]`);
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
      txtSettings[ID]["textCLR"] = { ...args };
    }

    setTextDropShadow(args) {
      const ID = this.fixID(args.ID);
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${ID}"]`);
      elements.forEach((element) => {
        element.style.textShadow = args.z === 0 ? "none" : `${args.x}px ${args.y * -1}px ${args.z}px ${args.COLOR}`;
      });
      txtSettings[ID]["textSHA"] = { ...args };
    }

    setOverflow(args) {
      const ID = this.fixID(args.ID);
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${ID}"]`);
      elements.forEach((element) => { element.style.overflow = args.TYPE });
      txtSettings[ID]["textOVR"] = { ...args };
    }

    setTextOutline(args) {
      const ID = this.fixID(args.ID);
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${ID}"]`);
      elements.forEach((element) => {
        element.style.webkitTextStrokeColor = args.COLOR;
        element.style.webkitTextStrokeWidth = `${args.THICKNESS}px`;
        //multi-platform support cuz we cant have nice things
        element.style.textStrokeColor = args.COLOR;
        element.style.textStrokeWidth = `${args.THICKNESS}px`;
        element.style.mozTextStrokeColor = args.COLOR;
        element.style.mozTextStrokeWidth = `${args.THICKNESS}px`;
      });
      txtSettings[ID]["textOUT"] = { ...args };
    }

    setLine(args) {
      const ID = this.fixID(args.ID);
      const lineType = args.TYPE2.replace("strike", "line-");
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${ID}"]`);
      elements.forEach((element) => {
        element.style.textDecorationLine = lineType;
        element.style.textDecorationStyle = args.TYPE1;
        element.style.textDecorationThickness = `${args.THICK}px`;
        element.style.textDecorationColor = args.COLOR;
      });
      txtSettings[ID]["textLIN"] = { ...args };
    }

    setMargins(args) {
      const ID = this.fixID(args.ID);
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${ID}"]`);
      elements.forEach((element) => {
        element.style.width = `${args.WIDTH}px`;
        element.style.height = `${args.HEIGHT}px`;
      });
      txtSettings[ID]["textMAR"] = { ...args };
    }

    setTextAlignment(args) {
      const ID = this.fixID(args.ID);
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${ID}"]`);
      elements.forEach((element) => { element.style.textAlign = args.ALIGNMENT });
      txtSettings[ID]["txtALI"] = { ...args };
    }

    setTextFont(args) {
      const ID = this.fixID(args.ID);
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${ID}"]`);
      elements.forEach((element) => { element.style.fontFamily = args.FONT });
      txtSettings[ID]["txtFont"] = { ...args };
    }

    setFontSize(args) {
      const ID = this.fixID(args.ID);
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${ID}"]`);
      elements.forEach((element) => { element.style.fontSize = `${args.SIZE}px` });
      txtSettings[ID]["txtFontSZ"] = { ...args };
    }

    setThick(args) {
      const ID = this.fixID(args.ID);
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${ID}"]`);
      elements.forEach((element) => { element.style.fontWeight = args.NUM * 9 });
      txtSettings[ID]["txtFontTK"] = { ...args };
    }

    setTextSpacing(args) {
      const ID = this.fixID(args.ID);
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${ID}"]`);
      elements.forEach((element) => {
        element.style[args.ATT === "letter" ? "letterSpacing" : "lineHeight"] = `${args.SPACING}px`;
      });
      txtSettings[ID][args.ATT === "letter" ? "letDIS" : "lineDIS"] = { ...args, ID };
    }

    presetTextPosition(args) {
      const ID = this.fixID(args.ID);
      if (args.isPrint === undefined) txtSettings[ID]["preTxt1"] = { ...args, isPrint: true };
      else {
        const pos = [Scratch.Cast.toNumber(args.X), Scratch.Cast.toNumber(args.Y)];
        runtime.once("AFTER_EXECUTE", () => {
          const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${ID}"]`);
          const element = elements[elements.length - 1];
          const centerW = parseFloat(element.style.width) / 2;
          const computedStyle = window.getComputedStyle(element);
          const lineHeight = computedStyle.getPropertyValue("line-height");
          const fontSize = computedStyle.getPropertyValue("font-size");
          const centerH = (lineHeight === "normal" ? parseFloat(fontSize) * 1.2 : parseFloat(lineHeight)) / 2;

          let transform = element.style.transform;
          const string = `translate(${pos[0] - centerW}px, ${(pos[1] * -1) - centerH}px)`;
          if (transform.includes("translate")) transform = transform.replace(/translate\([^)]*\)/, string);
          else transform += ` ${string}`;
          element.style.transform = transform.trim();
          element.style.position = "absolute";
          element.setAttribute("sptxtpos", `${pos[0]}|${pos[1]}`);
        });
      }
    }

    setTextPosition(args) {
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${this.fixID(args.ID)}"]`);
      const pos = [Scratch.Cast.toNumber(args.X), Scratch.Cast.toNumber(args.Y)];
      elements.forEach((element) => {
        let centerW = parseFloat(element.style.width) / 2;
        if (isNaN(centerW)) centerW = (element.getBoundingClientRect().width ?? 0 ) / 2;
        const computedStyle = window.getComputedStyle(element);
        const lineHeight = computedStyle.getPropertyValue("line-height");
        const fontSize = computedStyle.getPropertyValue("font-size");
        const centerH = (lineHeight === "normal" ? parseFloat(fontSize) * 1.2 : parseFloat(lineHeight)) / 2;

        let transform = element.style.transform;
        const string = `translate(${pos[0] - centerW}px, ${(pos[1] * -1) - centerH}px)`;
        if (transform.includes("translate")) transform = transform.replace(/translate\([^)]*\)/, string);
        else transform += ` ${string}`;
        element.style.transform = transform.trim();
        element.style.position = "absolute";
        element.setAttribute("sptxtpos", `${pos[0]}|${pos[1]}`);
      });
    }

    textPosition(args) {
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${this.fixID(args.ID)}"]`);
      let value;
      elements.forEach((element) => {
        if (args.ATT === "z layer") value = element.parentNode.parentNode.style.zIndex;
        else value = element.getAttribute("sptxtpos")?.split("|", 2)[args.ATT.includes("x") ? 0 : 1];
      });
      return value || 0;
    }

    attOfText(args) {
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${this.fixID(args.ID)}"]`);
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
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${this.fixID(args.ID)}"]`);
      let value = [];
      elements.forEach((element) => { value.push(element.querySelectorAll("br").length + 1 || 1) });
      return value.length > 1 ? JSON.stringify(value) : (value[0] || 0);
    }

    setTextZIndex(args) {
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${this.fixID(args.ID)}"]`);
      elements.forEach((element) => { element.parentNode.parentNode.style.zIndex = Math.round(args.Z_INDEX) });
    }

    setEffect(args) {
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${this.fixID(args.ID)}"]`);
      const val = Scratch.Cast.toNumber(args.VALUE);
      elements.forEach((element) => {
        const parent = element.parentNode;
        const curStyles = [
          element.style.filter || "",
          element.parentNode.style.transform || "",
          element.style.opacity || ""
        ];
        const regex = new RegExp(`${args.EFFECT}\\([^)]+\\)`, "g");
        curStyles.forEach((curStyle, index) => { curStyles[index] = curStyle.replace(regex, "") });
        switch (args.EFFECT) {
          case "saturate": return element.style.filter = `${curStyles[0]} saturate(${val}%)`;
          case "contrast": return element.style.filter = `${curStyles[0]} contrast(${val + 100}%)`;
          case "brightness": return element.style.filter = `${curStyles[0]} brightness(${val + 100}%)`;
          case "hue-rotate": return element.style.filter = `${curStyles[0]} hue-rotate(${val}deg)`;
          case "opacity": return element.style.opacity = (100 - val) / 100;
          case "sepia": return element.style.filter = `${curStyles[0]} sepia(${val}%)`;
          case "invert": return element.style.filter = `${curStyles[0]} invert(${val}%)`;
          case "scaleX": return parent.style.transform = `${curStyles[1]} scaleX(${val / 100})`;
          case "scaleY": return parent.style.transform = `${curStyles[1]} scaleY(${val / 100})`;
          case "skewX": return parent.style.transform = `${curStyles[1]} skewX(${val}deg)`;
          case "skewY": return parent.style.transform = `${curStyles[1]} skewY(${val}deg)`;
          case "rotate": {
            let transform = element.style.transform;
            if (transform.includes("rotate")) transform = transform.replace(/rotate\([^)]*\)/, `rotate(${val - 90}deg)`);
            else transform += ` rotate(${val - 90}deg)`;
            element.style.transform = transform.trim();
            return element.style.transformOrigin = "center";
          }
          default: return element.style.filter = `${curStyles[0]} blur(${val}px)`;
        }
      });
    }

    resetEffect(args) {
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${this.fixID(args.ID)}"]`);
      elements.forEach((element) => {
        element.parentNode.style.transform = (element.parentNode.style.transform || "")
          .replace(/scaleX\([^)]*\)/, "scaleX(1)").replace(/scaleY\([^)]*\)/, "scaleY(1)")
          .replace(/skewX\([^)]*\)/, "skewX(0deg)").replace(/skewY\([^)]*\)/, "skewY(0deg)");
        element.style.transform = (element.style.transform || "")
          .replace(/rotate\([^)]*\)/, "rotate(0deg)");
        element.style.filter = "";
        element.style.opacity = 1;
      });
    }

    amtOfEffect(args) {
      const effect = args.EFFECT;
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${this.fixID(args.ID)}"]`);
      let effectValue = effect === "rotate" ? 90 : effect.includes("scale") ? 100 : 0;
      elements.forEach((element) => {
        if (effect === "rotate" || effect.includes("scale") || effect.includes("skew")) {
          const thisElement = effect === "rotate" ? element : element.parentNode;
          const transformV = thisElement.style.transform.split(" ");
          const index = transformV.findIndex(value => value.includes(effect));
          if (index !== -1) {
            effectValue = transformV[index].replace(/[^\d.-]/g, "");
            effectValue = effect === "rotate" ? parseFloat(effectValue) + 90 :
              parseFloat(effectValue) * (effect.includes("scale") ? 100 : 1);
          }
        } else if (effect === "opacity") {
          effectValue = 100 - (parseFloat(element.style.opacity || 0) * 100);
        } else {
          const filterV = element.style.filter.split(" ");
          const index = filterV.findIndex((value) => value.includes(effect));
          if (index !== -1) {
            effectValue = effect === "contrast" || effect === "brightness"
              ? parseFloat(filterV[index].replace(/[^\d.-]/g, "")) - 100
              : parseFloat(filterV[index].replace(/[^\d.-]/g, ""));
          }
        }
      });
      return effectValue;
    }

    setTextCurve(args) {
      // TODO clean this up and add more availiable text stylings
      // Perhaps make the entire extension rely on svgs?
      const ID = this.fixID(args.ID);
      const settings = txtSettings[ID];
      const regex = args.ARC.includes("<svg") ? /<path[^>]*d="([^"]*)"/ : /<path[^>]*d="([^"]*)"/;
      const match = args.ARC.match(regex);
      const outline = settings["textOUT"] !== undefined ? settings["textOUT"] : "";
      if (match && match[1]) {
        const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${ID}"]`)
        elements.forEach((element) => {
          const existingSvg = element.querySelector("svg");
          if (existingSvg) {
            const path = existingSvg.querySelector("path");
            path.setAttribute("d", match[1]);
            const textFill = existingSvg.querySelector("text");
            textFill.setAttribute("fill", element.style.color === "transparent" ? "#000" : element.style.color);
            const textPathFill = existingSvg.querySelector("textPath");
            textPathFill.setAttribute("href", `#MyPath-${ID}`);
            textPathFill.textContent = element.textContent;

            const textStroke = existingSvg.querySelector("text");
            textStroke.setAttribute("fill", outline ? outline.inputs.COLOR ?? "#00000000" : "#00000000");
            textStroke.setAttribute("stroke", outline ? outline.inputs.COLOR ?? "#00000000" : "#00000000");
            textStroke.setAttribute("stroke-width", outline ? outline.inputs.THICKNESS ?? 1 : 1);
            const textPathStroke = existingSvg.querySelector("textPath");
            textPathStroke.setAttribute("href", `#MyPath-${ID}`);
            textPathStroke.textContent = element.textContent;
          } else {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("id", `MyPath-${ID}`);
            path.setAttribute("d", match[1]);
            defs.appendChild(path);

            const textStroke = document.createElementNS("http://www.w3.org/2000/svg", "text");
            textStroke.setAttribute("fill", outline ? outline.inputs.COLOR : "#00000000");
            textStroke.setAttribute("stroke", outline ? outline.inputs.COLOR : "#00000000");
            textStroke.setAttribute("stroke-width", outline ? outline.inputs.THICKNESS : 1);
            const textPathStroke = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
            textPathStroke.setAttribute("href", `#MyPath-${ID}`);
            textPathStroke.textContent = element.textContent;
            textStroke.appendChild(textPathStroke);

            svg.appendChild(defs);
            svg.appendChild(textStroke);
            const textFill = document.createElementNS("http://www.w3.org/2000/svg", "text");
            textFill.setAttribute("fill", element.style.color === "transparent" ? "#000" : element.style.color);
            const textPathFill = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
            textPathFill.setAttribute("href", `#MyPath-${ID}`);
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
      return {
        circle: `<svg><path d="M41.9375,89.5c0,-37.83151 30.66849,-68.5 68.5,-68.5c37.83151,0 68.5,30.66849 68.5,68.5c0,37.83151 -30.66849,68.5 -68.5,68.5c-37.83151,0 -68.5,-30.66849 -68.5,-68.5z"/></svg>`,
        hill: `<svg><path d="M37.4375,89.5c0,0 43.00879,-31 74.5,-31c31.49121,0 71.5,31 71.5,31"/></svg>`,
        dip: `<svg><path d="M37.4375,89.5c0,0 42.00879,25 73.5,25c31.49121,0 72.5,-25 72.5,-25"/></svg>`,
        wave: `<svg><path d="M24.4375,98.67214c0,0 38.3049,-22.48612 65.97496,-23c27.67006,-0.51388 44.8836,19.04663 76.52154,23.35359c37.46107,5.09968 76.066,-17.35359 76.066,-17.35359"/></svg>`
      }[args.ARC];
    }

    resetTxt(args) { delete txtSettings[this.fixID(args.ID)] }

    reuseStyle(args) {
      this.updateStyles(txtSettings[this.fixID(args.ID)], this.fixID(args.ID2));
    }

    toggleSelect(args) {
      const type = args.TYPE === "on" ? "auto" : "none";
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${this.fixID(args.ID)}"]`);
      elements.forEach((element) => {
        element.style.userSelect = type; element.style.webkitUserSelect = type; element.style.mozUserSelect = type;
        element.style.pointerEvents = type;
      });
    }

    makeClick(args) {
      const elements = document.querySelectorAll(`div[id="SP_Text-Ext-${this.fixID(args.ID)}"]`);
      elements.forEach((element) => {
        if (args.TYPE === "on") {
          element.style.pointerEvents = "auto";
          element.style.cursor = "pointer";
        } else {
          element.style.pointerEvents = "none";
          element.style.cursor = "none";
        }
        element.removeEventListener("click", this.handleClick);
        if (args.TYPE === "on") element.addEventListener("click", this.handleClick);
      });
    }

    isClicked(args) { return clickedTxts.indexOf(this.fixID(args.ID)) > -1 }

    clickedID(_, util) { return util.thread.SPdisTxtClickID ?? "" }
  }

  Scratch.extensions.register(new SPdisText());
})(Scratch);
