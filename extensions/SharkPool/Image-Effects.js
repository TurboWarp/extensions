// Name: Image Effects
// ID: imgEffectsSP
// Description: Apply a variety of new effects to the data URI of Images or Costumes.
// By: SharkPool

// Version V.2.3.5

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Image Effects must run unsandboxed");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMzUuNzMwNjQiIGhlaWdodD0iMTM1LjczMDY0IiB2aWV3Qm94PSIwLDAsMTM1LjczMDY0LDEzNS43MzA2NCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3Mi4xMzQ2OCwtMTEyLjEzNDY4KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsPSIjOTk2NmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTc1Ljg4NDY4LDE4MGMwLC0zNS40MDk5MSAyOC43MDU0MSwtNjQuMTE1MzIgNjQuMTE1MzIsLTY0LjExNTMyYzM1LjQwOTkxLDAgNjQuMTE1MzIsMjguNzA1NDEgNjQuMTE1MzIsNjQuMTE1MzJjMCwzNS40MDk5MSAtMjguNzA1NDEsNjQuMTE1MzIgLTY0LjExNTMyLDY0LjExNTMyYy0zNS40MDk5MSwwIC02NC4xMTUzMiwtMjguNzA1NDEgLTY0LjExNTMyLC02NC4xMTUzMnoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBzdHJva2U9IiM3NzRkY2IiIHN0cm9rZS13aWR0aD0iNy41Ii8+PHBhdGggZD0iTTI0MC40NDQ3MSwxNzMuMjY3NjJjNC4wOTQ5MiwtMS42NzM4NiA5LjMwMjQ5LC0xLjE5MDEgMTIuMTM5MDIsLTUuMDU1MzljMi45NDAxOSwtNC4wMDY1NSAzLjgyMTg1LC0xMi4zNTQ5MyA0LjQ0ODA0LC0xNy4yNTg2MWMwLjYxMDA3LC00Ljc3NzQ5IDEuNzYyMTIsLTQuNjEwOTMgMi42MzYyMywwLjI0MTA0YzAuOTI1MDIsNS4xMzQ1MyAyLjAzNDk4LDEzLjY3Njk1IDQuNjU0MTcsMTcuMjQ2MDhjMi45OTI4OSw0LjA3ODM3IDguOTIyODMsMy44NDQ2MiAxMy4zMDU3Miw1LjUyMjUyYzMuMDc3MjksMS4xNzgwNyAyLjgwMzA3LDEuODUyNzYgLTAuNTU3NTMsMi41NjMxOGMtNC4zMTUyNSwwLjkxMjIyIC05LjkwMjk2LDEuNjU3MSAtMTIuOTE1ODksNS43NjI3N2MtMy4xNzkwMyw0LjMzMjAyIC00LjI2MTk4LDE0LjY4OTEyIC01LjAwNjEyLDIwLjg0MjU5Yy0wLjUxMDM2LDQuMjIwMjYgLTEuOTQ5MjEsMi40MjI2MiAtMi4yMTYzMiwwLjI3NjAxYy0wLjc3MDA3LC02LjE4ODY3IC0xLjk2NjQ1LC0xNi44MzA3NiAtNS41MjIxNiwtMjEuNjc2MDdjLTIuNTE2NjgsLTMuNDI5NDQgLTYuNjk2MjksLTQuMDQ3ODUgLTEwLjExNzcyLC01LjAwMDM5Yy00LjYxNjIsLTEuMjg1MTggLTUuMTMyNDYsLTEuNzEyMTUgLTAuODQ3NDUsLTMuNDYzNzJ6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjE1Ii8+PHBhdGggZD0iTTI1Mi41ODM3MywxNjguMjEyMjNjMi45NDAxOSwtNC4wMDY1NSAyLjgyMTg1LC0xMi4zNTQ5MiAzLjQ0ODA0LC0xNy4yNTg2YzAuNjEwMDcsLTQuNzc3NDkgMy44NzMyMywtNC42MTA5MyA0Ljc0NzM0LDAuMjQxMDRjMC45MjUwMiw1LjEzNDUzIDAuOTIzODcsMTMuNjc2OTUgMy41NDMwNiwxNy4yNDYwOGMyLjk5Mjg5LDQuMDc4MzcgOC4zNjcyNywyLjczMzUxIDEyLjc1MDE2LDQuNDExNGMzLjA3NzI5LDEuMTc4MDcgMy4zNTg2MywzLjg1Mjc2IC0wLjAwMTk3LDQuNTYzMThjLTQuMzE1MjUsMC45MTIyMiAtOS45MDI5NiwwLjc2ODIxIC0xMi45MTU4OSw0Ljg3Mzg4Yy0zLjE3OTAzLDQuMzMyMDIgLTMuNDg0MiwxNC45MTEzNCAtNC4yMjgzMywyMS4wNjQ4MWMtMC41MTAzNiw0LjIyMDI2IC0zLjcyNjk5LDIuMjAwNCAtMy45OTQxLDAuMDUzNzljLTAuNzcwMDcsLTYuMTg4NjcgLTAuOTY2NDUsLTE2LjgzMDc2IC00LjUyMjE2LC0yMS42NzYwN2MtMi41MTY2OCwtMy40Mjk0NCAtNy40NzQwNywtMy4zODExOCAtMTAuODk1NSwtNC4zMzM3MmMtNC42MTYyLC0xLjI4NTE4IC00LjM1NDY4LC0zLjI2NzcxIC0wLjA2OTY3LC01LjAxOTI4YzAsMCA5LjMwMjQ5LC0wLjMwMTIzIDEyLjEzOTAyLC00LjE2NjUxeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTIxNC4xNjUzMSwxNTIuMzM0NzJjMS40OTI4MiwtMS42NDY2OSAxLjk0MDQ3LC01LjA3Nzg3IDIuMjU4NCwtNy4wOTMyOGMwLjMwOTc1LC0xLjk2MzU1IDAuODk0NjcsLTEuODk1MDkgMS4zMzg0OSwwLjA5OTA2YzAuNDY5NjYsMi4xMTAyOSAxLjAzMzIyLDUuNjIxMjMgMi4zNjMwNiw3LjA4ODE0YzEuNTE5NTgsMS42NzYyMSA0LjUzMDM3LDEuNTgwMTMgNi43NTU3LDIuMjY5NzVjMS41NjI0MywwLjQ4NDE4IDEuNDIzMiwwLjc2MTQ4IC0wLjI4MzA3LDEuMDUzNDZjLTIuMTkwOTgsMC4zNzQ5MiAtNS4wMjgwMSwwLjY4MTA3IC02LjU1Nzc2LDIuMzY4NWMtMS42MTQwOCwxLjc4MDQ2IC0yLjE2MzkzLDYuMDM3MjIgLTIuNTQxNzUsOC41NjYyOWMtMC4yNTkxMiwxLjczNDUyIC0wLjk4OTY3LDAuOTk1NyAtMS4xMjUyOSwwLjExMzQ0Yy0wLjM5MDk5LC0yLjU0MzU0IC0wLjk5ODQyLC02LjkxNzQ0IC0yLjgwMzc2LC04LjkwODg2Yy0xLjI3Nzc5LC0xLjQwOTUgLTMuMzk5OSwtMS42NjM2NyAtNS4xMzcwNiwtMi4wNTUxNmMtMi4zNDM3NywtMC41MjgyMSAtMi42MDU5LC0wLjcwMzcgLTAuNDMwMjcsLTEuNDIzNTljMCwwIDQuNzIzMTMsLTAuNDg5MTIgNi4xNjMzMSwtMi4wNzc3NXoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMTAiLz48cGF0aCBkPSJNMjE0LjE2NTMxLDE1Mi4zMzQ3MmMxLjQ5MjgyLC0xLjY0NjY5IDEuMjczODEsLTQuOTY2NzYgMS41OTE3NCwtNi45ODIxN2MwLjMwOTc1LC0xLjk2MzU1IDIuMTE2ODksLTIuMDA2MiAyLjU2MDcsLTAuMDEyMDVjMC40Njk2NiwyLjExMDI5IDAuNDc3NjcsNS42MjEyMyAxLjgwNzUxLDcuMDg4MTRjMS41MTk1OCwxLjY3NjIxIDQuMzA4MTUsMC42MzU2OCA2LjUzMzQ4LDEuMzI1M2MxLjU2MjQzLDAuNDg0MTggMS42NDU0MiwyLjI2MTQ4IC0wLjA2MDg1LDIuNTUzNDZjLTIuMTkwOTgsMC4zNzQ5MiAtNS4wMjgwMSwwLjEyNTUyIC02LjU1Nzc2LDEuODEyOTVjLTEuNjE0MDgsMS43ODA0NiAtMS4xNjM5Myw2LjAzNzIyIC0xLjU0MTc1LDguNTY2MjljLTAuMjU5MTIsMS43MzQ1MiAtMi43Njc0NSwwLjk5NTcgLTIuOTAzMDcsMC4xMTM0NGMtMC4zOTA5OSwtMi41NDM1NCAtMC4yMjA2NCwtNi45MTc0NCAtMi4wMjU5OCwtOC45MDg4NmMtMS4yNzc3OSwtMS40MDk1IC00LjI4ODc5LC0wLjk5NyAtNi4wMjU5NSwtMS4zODg0OWMtMi4wMDQ1OCwtMC40NTE3NyAtMS4yNjQyMSwtMi4yMDEwOCAtMC4wMDA1MiwtMi42OTgwOWMwLjIxMzgyLC0wLjA4NDA5IDUuMTgyMjgsMC4xMTg3MSA2LjYyMjQ2LC0xLjQ2OTkyeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTIyMC44NTY0LDIwNC44MDk1MWMxLjU2MTg4LC0xLjk1NjIgMi4wMzAyNSwtNi4wMzIyOSAyLjM2Mjg5LC04LjQyNjUyYzAuMzI0MDgsLTIuMzMyNjIgMC45MzYwNiwtMi4yNTEyOSAxLjQwMDQxLDAuMTE3NjhjMC40OTEzOSwyLjUwNjkzIDEuMDgxMDIsNi42Nzc3OSAyLjQ3MjM5LDguNDIwNDFjMS41ODk4OSwxLjk5MTI2IDQuNzM5OTgsMS44NzcxNCA3LjA2ODI1LDIuNjk2MzdjMS42MzQ3MiwwLjU3NTIgMS40ODkwNSwwLjkwNDYxIC0wLjI5NjE3LDEuMjUxNDdjLTIuMjkyMzUsMC40NDUzOCAtNS4yNjA2NCwwLjgwOTA4IC02Ljg2MTE2LDIuODEzNjhjLTEuNjg4NzUsMi4xMTUxMSAtMi4yNjQwNSw3LjE3MTk4IC0yLjY1OTM1LDEwLjE3NjQxYy0wLjI3MTExLDIuMDYwNTQgLTEuMDM1NDUsMS4xODI4NSAtMS4xNzczNSwwLjEzNDc2Yy0wLjQwOTA4LC0zLjAyMTYyIC0xLjA0NDYxLC04LjIxNzY0IC0yLjkzMzQ4LC0xMC41ODMzNmMtMS4zMzY5MSwtMS42NzQ0MiAtMy41NTcxOSwtMS45NzYzNyAtNS4zNzQ3MSwtMi40NDE0NWMtMi40NTIyLC0wLjYyNzQ5IC0yLjcyNjQ2LC0wLjgzNTk1IC0wLjQ1MDE5LC0xLjY5MTE2YzAsMCA0Ljk0MTY1LC0wLjU4MTA3IDYuNDQ4NDYsLTIuNDY4M3oiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMTAiLz48cGF0aCBkPSJNMjIwLjg1NjQsMjA0LjgwOTUxYzEuNTYxODgsLTEuOTU2MiAxLjM2MzU4LC02LjAzMjI5IDEuNjk2MjIsLTguNDI2NTJjMC4zMjQwOCwtMi4zMzI2MiAyLjM4MDUsLTIuMjUxMjkgMi44NDQ4NiwwLjExNzY4YzAuNDkxMzksMi41MDY5MyAwLjMwMzI0LDYuNjc3NzkgMS42OTQ2LDguNDIwNDFjMS41ODk4OSwxLjk5MTI2IDQuMjk1NTMsMC45NDY1OCA2LjYyMzgxLDEuNzY1ODJjMS42MzQ3MiwwLjU3NTIgMS45MzM0OSwyLjM5MDcyIDAuMTQ4MjgsMi43Mzc1OGMtMi4yOTIzNSwwLjQ0NTM4IC01LjI2MDY0LDAuMjUzNTIgLTYuODYxMTYsMi4yNTgxM2MtMS42ODg3NSwyLjExNTExIC0xLjQ4NjI3LDcuMTcxOTggLTEuODgxNTYsMTAuMTc2NDFjLTAuMjcxMTEsMi4wNjA1NCAtMi41OTEwMSwxLjE4Mjg1IC0yLjczMjksMC4xMzQ3NmMtMC40MDkwOCwtMy4wMjE2MiAtMC4yNjY4MywtOC4yMTc2NCAtMi4xNTU3LC0xMC41ODMzNmMtMS4zMzY5MSwtMS42NzQ0MiAtNC4wMDE2NCwtMS41MzE5MyAtNS44MTkxNiwtMS45OTcwMWMtMi40NTIyLC0wLjYyNzQ5IC0yLjI4MjAxLC0xLjgzNTk1IC0wLjAwNTc0LC0yLjY5MTE2YzAsMCA0Ljk0MTY0LC0wLjAyNTUyIDYuNDQ4NDUsLTEuOTEyNzV6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAiLz48L2c+PC9nPjwvc3ZnPg==";

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const a = hex.length === 9 ? parseInt(hex.slice(7, 9), 16) / 255 : 255;
    return [r, g, b, a];
  }
  function rgbaToHex(r, g, b, a) {
    const alpha = a !== undefined ? Math.round(a).toString(16).padStart(2, "0") : "";
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}${alpha}`;
  }

  class imgEffectsSP {
    constructor() {
      this.cutPos = [0, 0];
      this.scale = [100, 100];
      this.cutoutDirection = 90;
      this.softness = 10;
      this.allShards = [];
    }
    getInfo() {
      return {
        id: "imgEffectsSP",
        name: "Image Effects",
        menuIconURI,
        color1: "#9966FF",
        color2: "#774DCB",
        blocks: [
          { blockType: Scratch.BlockType.LABEL, text: "Effects" },
          {
            opcode: "convertHexToRGB",
            blockType: Scratch.BlockType.REPORTER,
            text: "convert [HEX] to [CHANNEL]",
            hideFromPalette: true, // depreciated block
            arguments: {
              HEX: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
              CHANNEL: { type: Scratch.ArgumentType.STRING, menu: "CHANNELS" }
            }
          },
          {
            opcode: "applyHueEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply hue [COLOR] to URI [SVG]",
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue:  "svg/data-uri" },
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" }
            }
          },
          "---",
          {
            opcode: "deleteColor",
            blockType: Scratch.BlockType.REPORTER,
            text: "remove color [COLOR] from [DATA_URI]",
            arguments: {
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
              DATA_URI: { type: Scratch.ArgumentType.STRING, defaultValue:  "svg/data-uri" }
            }
          },
          {
            opcode: "replaceColor",
            blockType: Scratch.BlockType.REPORTER,
            text: "replace color [COLOR] with [REPLACE] from [DATA_URI]",
            arguments: {
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
              REPLACE: { type: Scratch.ArgumentType.COLOR, defaultValue: "#00ff00" },
              DATA_URI: { type: Scratch.ArgumentType.STRING, defaultValue:  "svg/data-uri" }
            }
          },
          {
            opcode: "setSoftness",
            blockType: Scratch.BlockType.COMMAND,
            text: "set softness of color detection to [AMT]%",
            arguments: {
              AMT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
            }
          },
          "---",
          {
            opcode: "applyEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "set [EFFECT] effect of URI [SVG] to [PERCENTAGE]%",
            arguments: {
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTS" },
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue:  "svg/data-uri" },
              PERCENTAGE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 }
            }
          },
          {
            opcode: "applyBulgeEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "set bulge effect of URI [SVG] to [STRENGTH]% at x [CENTER_X] y [CENTER_Y]",
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue:  "svg/data-uri" },
              STRENGTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              CENTER_X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              CENTER_Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "applyWaveEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "set wave effect of URI [SVG] to amplitude x [AMPX] y [AMPY] and frequency x [FREQX] y [FREQY]",
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue:  "svg/data-uri" },
              AMPX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              AMPY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              FREQX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              FREQY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            }
          },
          {
            opcode: "applyLineGlitchEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "set line glitch of URI [SVG] to [PERCENTAGE]% on [DIRECT] axis and line width [WIDTH]",
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue:  "svg/data-uri" },
              PERCENTAGE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              DIRECT: { type: Scratch.ArgumentType.STRING, menu: "POSITIONS" },
              WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            }
          },
          {
            opcode: "applyAbberationEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "set abberation of URI [SVG] to colors [COLOR1] and [COLOR2] at [PERCENTAGE]% on [DIRECT] axis",
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue:  "svg/data-uri" },
              PERCENTAGE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              COLOR1: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
              COLOR2: { type: Scratch.ArgumentType.COLOR, defaultValue: "#00f7ff" },
              DIRECT: { type: Scratch.ArgumentType.STRING, menu: "POSITIONS" }
            }
          },
          "---",
          {
            opcode: "removeTransparencyEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "remove pixels from URI [SVG] [REMOVE] [THRESHOLD]% transparency",
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue:  "svg/data-uri" },
              THRESHOLD: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              REMOVE: { type: Scratch.ArgumentType.STRING, menu: "REMOVAL" }
            }
          },
          {
            opcode: "applyEdgeOutlineEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "add outline to URI [SVG] with thickness [THICKNESS] and color [COLOR] opacity [A]%",
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue:  "svg/data-uri" },
              THICKNESS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
              A: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: "Clipping" },
          {
            opcode: "clipImage",
            blockType: Scratch.BlockType.REPORTER,
            text: "clip [CUTOUT] from [MAIN]",
            arguments: {
              MAIN: { type: Scratch.ArgumentType.STRING, defaultValue: "source-here" },
              CUTOUT: { type: Scratch.ArgumentType.STRING, defaultValue: "cutout-here" }
            }
          },
          {
            opcode: "overlayImage",
            blockType: Scratch.BlockType.REPORTER,
            text: "clip [CUTOUT] onto [MAIN]",
            arguments: {
              MAIN: { type: Scratch.ArgumentType.STRING, defaultValue: "source-here" },
              CUTOUT: { type: Scratch.ArgumentType.STRING, defaultValue: "cutout-here" }
            }
          },
          "---",
          {
            opcode: "setCutout",
            blockType: Scratch.BlockType.COMMAND,
            text: "set clipping position to x [X] y [Y]",
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "changeCutout",
            blockType: Scratch.BlockType.COMMAND,
            text: "change clipping position by x [X] y [Y]",
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "currentCut",
            blockType: Scratch.BlockType.REPORTER,
            text: "clipping [POS]",
            disableMonitor: true,
            arguments: {
              POS: { type: Scratch.ArgumentType.STRING, menu: "POSITIONS" }
            }
          },
          "---",
          {
            opcode: "setScale",
            blockType: Scratch.BlockType.COMMAND,
            text: "set clipping size to x [SIZE] y [Y]",
            arguments: {
              SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            }
          },
          {
            opcode: "changeScale",
            blockType: Scratch.BlockType.COMMAND,
            text: "change clipping size by x [SIZE] y [Y]",
            arguments: {
              SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "currentScale",
            blockType: Scratch.BlockType.REPORTER,
            text: "clipping size [POS]",
            disableMonitor: true,
            arguments: {
              POS: { type: Scratch.ArgumentType.STRING, menu: "POSITIONS" }
            }
          },
          "---",
          {
            opcode: "setDirection",
            blockType: Scratch.BlockType.COMMAND,
            text: "set clipping direction to [ANGLE]",
            arguments: {
              ANGLE: { type: Scratch.ArgumentType.ANGLE, defaultValue: 90 }
            }
          },
          {
            opcode: "changeDirection",
            blockType: Scratch.BlockType.COMMAND,
            text: "change clipping direction by [ANGLE]",
            arguments: {
              ANGLE: { type: Scratch.ArgumentType.ANGLE, defaultValue: 15 }
            }
          },
          {
            opcode: "currentDir",
            blockType: Scratch.BlockType.REPORTER,
            text: "clipping direction"
          },
          "---",
          {
            opcode: "crackImage",
            blockType: Scratch.BlockType.COMMAND,
            text: "crack [URI] into [SHARDS] shards",
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue:  "svg/data-uri" },
              SHARDS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            }
          },
          {
            opcode: "getShard",
            blockType: Scratch.BlockType.REPORTER,
            text: "get shard #[SHARD]",
            arguments: {
              SHARD: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: "Pixels" },
          {
            opcode: "numPixels",
            blockType: Scratch.BlockType.REPORTER,
            text: "number of pixels [TYPE] in [URI]",
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue:  "svg/data-uri" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "PIXELTYPE" }
            }
          },
          {
            opcode: "getPixel",
            blockType: Scratch.BlockType.REPORTER,
            text: "get hex of pixel #[NUM] in [URI]",
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue:  "svg/data-uri" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: "setPixel",
            blockType: Scratch.BlockType.REPORTER,
            text: "set color of pixel #[NUM] to [COLOR] in [URI]",
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue:  "svg/data-uri" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              COLOR: { type: Scratch.ArgumentType.COLOR }
            }
          },
          {
            opcode: "setPixels",
            blockType: Scratch.BlockType.REPORTER,
            text: "set color of pixels from #[NUM] to [NUM2] to [COLOR] in [URI]",
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue:  "svg/data-uri" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              NUM2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              COLOR: { type: Scratch.ArgumentType.COLOR }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: "Image Conversions" },
          {
            opcode: "svgToBitmap",
            blockType: Scratch.BlockType.REPORTER,
            text: "convert svg content [SVG] to bitmap with width [WIDTH] height [HEIGHT]",
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: "<svg />" },
              WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              HEIGHT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            }
          },
          {
            opcode: "convertImageToSVG",
            blockType: Scratch.BlockType.REPORTER,
            text: "convert bitmap URI [URI] to svg [TYPE]",
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue:  "svg/data-uri" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "fileType" }
            }
          },
          {
            opcode: "makeSVGimage",
            blockType: Scratch.BlockType.REPORTER,
            text: "make new svg with image URI [URI] to svg [TYPE]",
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue:  "svg/data-uri" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "fileType" }
            }
          },
          {
            opcode: "upscaleImage",
            blockType: Scratch.BlockType.REPORTER,
            text: "upscale image URI [URI] by [NUM] %",
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue:  "svg/data-uri" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            }
          },
          "---",
          {
            opcode: "stretchImg",
            blockType: Scratch.BlockType.REPORTER,
            text: "stretch URI [URI] to width [W] height [H]",
            arguments: {
              URI: { type: Scratch.ArgumentType.STRING, defaultValue:  "svg/data-uri" },
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 200 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            }
          },
          "---",
          {
            opcode: "audioToImage",
            blockType: Scratch.BlockType.REPORTER,
            text: "convert audio URI [AUDIO_URI] to PNG with width [W] height [H]",
            arguments: {
              AUDIO_URI: { type: Scratch.ArgumentType.STRING, defaultValue: "audio_uri_here" },
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            }
          },
          {
            opcode: "skewSVG",
            blockType: Scratch.BlockType.REPORTER,
            text: "skew SVG content [SVG] at x [Y] y [X] as [TYPE]",
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: "<svg>" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "fileType" }
            }
          },
          {
            opcode: "removeThorns",
            blockType: Scratch.BlockType.REPORTER,
            text: "remove vector thorns from [SVG]",
            arguments: {
              SVG: { type: Scratch.ArgumentType.STRING, defaultValue: "<svg>" }
            }
          }
        ],
        menus: {
          CHANNELS: { acceptReporters: true, items: ["R", "G", "B"] },
          POSITIONS: ["X", "Y"],
          PIXELTYPE: ["total", "per line", "per row"],
          REMOVAL: ["under", "over", "equal to"],
          fileType: ["content", "dataURI"],
          EFFECTS: {
            acceptReporters: true,
            items: [
              "Saturation", "Opaque", "Glitch", "Chunk Glitch", "Clip Glitch",
              "Vignette", "Ripple", "Displacement", "Posterize",
              "Blur", "Scanlines", "Grain", "Cubism",
            ]
          },
        },
      };
    }

    setCutout(args) { this.cutPos = [Scratch.Cast.toNumber(args.X), Scratch.Cast.toNumber(args.Y)] }
    changeCutout(args) {
      this.cutPos = [this.cutPos[0] + Scratch.Cast.toNumber(args.X),
      this.cutPos[1] + Scratch.Cast.toNumber(args.Y)];
    }
    currentCut(args) { return this.cutPos[args.POS === "X" ? 0 : 1] }

    setScale(args) { this.scale = [Scratch.Cast.toNumber(args.SIZE), Scratch.Cast.toNumber(args.Y)] }
    changeScale(args) {
      this.scale = [this.scale[0] + Scratch.Cast.toNumber(args.SIZE),
      this.scale[1] + Scratch.Cast.toNumber(args.Y)];
    }
    currentScale(args) { return this.scale[args.POS === "X" ? 0 : 1] }

    setDirection(args) { this.cutoutDirection = Scratch.Cast.toNumber(args.ANGLE) }
    changeDirection(args) {
      let direction = this.cutoutDirection + Scratch.Cast.toNumber(args.ANGLE);
      if (direction > 180) { direction = -180 + Scratch.Cast.toNumber(args.ANGLE) }
      if (direction < -180) { direction = 180 + Scratch.Cast.toNumber(args.ANGLE) }
      this.cutoutDirection = direction;
    }
    currentDir() { return this.cutoutDirection }

    clipImage(args) {
      return new Promise((resolve, reject) => {
        const mainImage = new Image();
        mainImage.onload = () => {
          const cutoutImage = new Image();
          cutoutImage.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = mainImage.width;
            canvas.height = mainImage.height;
            const context = canvas.getContext("2d");
            const scaledWidth = cutoutImage.width + this.scale[0];
            const scaledHeight = cutoutImage.height + this.scale[1];
            const cutX = this.cutPos[0] + mainImage.width / 2 - scaledWidth / 2;
            const cutY = this.cutPos[1] - mainImage.height / 2 + scaledHeight / 2;

            context.drawImage(mainImage, 0, 0);
            context.globalCompositeOperation = "destination-in";
            const rotationAngle = ((this.cutoutDirection + 270) * Math.PI) / 180;
            context.translate(cutX + scaledWidth / 2, cutY * -1 + scaledHeight / 2);
            context.rotate(rotationAngle);
            context.drawImage(cutoutImage, -scaledWidth / 2,
              -scaledHeight / 2, scaledWidth, scaledHeight
            );
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.globalCompositeOperation = "source-over";
            resolve(canvas.toDataURL("image/png"));
          };
          cutoutImage.src = this.confirmAsset(args.CUTOUT, "png");
        };
        mainImage.src = this.confirmAsset(args.MAIN, "png");
      });
    }

    overlayImage(args) {
      return new Promise((resolve, reject) => {
        const mainImage = new Image();
        mainImage.onload = () => {
          const cutoutImage = new Image();
          cutoutImage.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = Math.max(mainImage.width, cutoutImage.width);
            canvas.height = Math.max(mainImage.height, cutoutImage.height);
            const context = canvas.getContext("2d");

            context.drawImage(mainImage, 0, 0);
            const scaledWidth = cutoutImage.width + this.scale[0];
            const scaledHeight = cutoutImage.height + this.scale[1];
            const cutX = this.cutPos[0] + mainImage.width / 2 - scaledWidth / 2;
            const cutY = this.cutPos[1] - mainImage.height / 2 + scaledHeight / 2;

            context.translate(cutX + scaledWidth / 2, cutY * -1 + scaledHeight / 2);
            context.rotate(((this.cutoutDirection + 270) * Math.PI) / 180);
            context.drawImage(cutoutImage, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
            context.setTransform(1, 0, 0, 1, 0, 0);
            resolve(canvas.toDataURL("image/png"));
          };
          cutoutImage.src = this.confirmAsset(args.CUTOUT, "png");
        };
        mainImage.src = this.confirmAsset(args.MAIN, "png");
      });
    }

    setSoftness(args) { this.softness = Scratch.Cast.toNumber(args.AMT) }

    convertHexToRGB(args) {
      const hexColor = args.HEX;
      const channelOffset = { R: 1, G: 3, B: 5 }[args.CHANNEL];
      return parseInt(hexColor.substring(channelOffset, channelOffset + 2), 16);
    }

    applyHueEffect(args) {
      return new Promise((resolve) => {
        const color = hexToRgb(args.COLOR);
        const img = new Image();
        img.onload = async () => {
          const pixelData = this.printImg(img);
          await this.applyHue(pixelData, color[0], color[1], color[2]);
          resolve(this.exportImg(img, pixelData));
        };
        img.src = this.confirmAsset(args.SVG, "png");
      });
    }
    applyHue(pixelData, r, g, b) {
      const data = pixelData;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, (data[i] * r) / 255);
        data[i + 1] = Math.min(255, (data[i + 1] * g) / 255);
        data[i + 2] = Math.min(255, (data[i + 2] * b) / 255);
      }
    }

    deleteColor(args) {
      return this.replaceColor({
        COLOR : args.COLOR, REPLACE : "#00000000", DATA_URI : args.DATA_URI
      });
    }

    replaceColor(args) {
      const colRem = hexToRgb(args.COLOR);
      const colRep = hexToRgb(args.REPLACE);
      return new Promise(resolve => {
        const imageElement = new Image();
        imageElement.onload = () => {
          const pixelData = this.printImg(imageElement);
          for (let i = 0; i < pixelData.length; i += 4) {
            const [r, g, b] = pixelData.slice(i, i + 3);
            const inRange = (val, target) => val >= target - this.softness && val <= target + this.softness;
            if (inRange(r, colRem[0]) && inRange(g, colRem[1]) && inRange(b, colRem[2])) {
              pixelData.set(colRep, i);
            }
          }
          resolve(this.exportImg(imageElement, pixelData));
        };
        imageElement.src = this.confirmAsset(args.DATA_URI, "png");
      });
    }

    applyEffect(args) {
      return new Promise((resolve) => {
        const percentage = Scratch.Cast.toNumber(args.PERCENTAGE) + 1 || 101; // let 0 pass
        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const effectFunction = this[`apply${Scratch.Cast.toString(args.EFFECT).replaceAll(" ", "")}`];
          if (effectFunction && typeof effectFunction === "function") {
            await effectFunction(imageData, percentage - 1);
          } else { this.applySaturation(imageData, percentage - 1) }
          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL());
        };
        img.src = this.confirmAsset(args.SVG, "png");
      });
    }

    applySaturation(imageData, percentage) {
      const data = imageData.data;
      const percent = Scratch.Cast.toNumber(percentage) / 100;
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        for (let j = 0; j < 3; j++) { data[i + j] = avg + (data[i + j] - avg) * percent }
      }
    }

    applyOpaque(imageData, percentage) {
      const data = imageData.data;
      const percent = Math.max(Scratch.Cast.toNumber(percentage) / 100, 0);
      for (let i = 0; i < data.length; i += 4) {
        data[i + 3] = data[i + 3] * percent;
      }
    }

    applyGlitch(imageData, percentage) {
      const data = imageData.data;
      const percent = Scratch.Cast.toNumber(percentage);
      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() * 100 <= percentage) {
          const rnd = () => (Math.random() - 0.5) * percent * 3;
          for (let j = 0; j < 3; j++) { data[i + j] = (data[i + j] + rnd()) % 256 }
        }
      }
    }

    applyVignette(imageData, percentage) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      let center = [width / 2, height / 2];
      const maxDistance = Math.sqrt(center[0] * center[0] + center[1] * center[1]);
      const percent = Scratch.Cast.toNumber(percentage);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          center = [Math.abs(x - center[0]), Math.abs(y - center[1])];
          const distance = Math.sqrt(center[0] * center[0] + center[1] * center[1]);
          let vigAMT = (percent < 0) ? 1 - (distance / maxDistance) * (percent / 100) : ((maxDistance - distance) / maxDistance) * (percent / 100);
          vigAMT = Math.max(0, Math.min(1, vigAMT));
          for (let i = 0; i < 3; i++) {
            data[index + i] = Math.round(data[index + i] * vigAMT);
          }
        }
      }
    }

    applyRipple(imageData, percentage) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      const centerX = width / 2;
      const centerY = height / 2;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          const dx = x - centerX;
          const dy = y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const offset = Math.sin(distance * (percentage / 100)) * (percentage / 100);
          const sourceX = Math.floor(x + offset);
          const sourceY = Math.floor(y);
          if (sourceX >= 0 && sourceX < width && sourceY >= 0 && sourceY < height) {
            const sourceIndex = (sourceY * width + sourceX) * 4;
            if (data[sourceIndex + 3] > 0) data.copyWithin(index, sourceIndex, sourceIndex + 4);
            else data[index + 3] = 0;
          } else { data[index + 3] = 0 }
        }
      }
    }

    applyDisplacement(imageData, dispAmt) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      const newData = new Uint8ClampedArray(data.length);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const srcX = x + Math.floor(Math.random() * dispAmt * 2 - dispAmt);
          const srcY = y + Math.floor(Math.random() * dispAmt * 2 - dispAmt);
          if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < height) {
            const srcIndex = (srcY * width + srcX) * 4;
            const dstIndex = (y * width + x) * 4;
            newData.set(data.subarray(srcIndex, srcIndex + 4), dstIndex);
          }
        }
      }
      data.set(newData);
    }

    applyPosterize(imageData, percentage) {
      const data = imageData.data;
      const numLevels = Math.max(percentage / 10, 1);
      for (let i = 0; i < data.length; i += 4) {
        for (let j = 0; j < 3; j++) {
          data[i + j] = Math.round((data[i + j] * (numLevels - 1)) / 255) * (255 / (numLevels - 1));
        }
      }
    }

    applyBulgeEffect(args) {
      return new Promise((resolve) => {
        let centerX = Scratch.Cast.toNumber(args.CENTER_X) / 100 || 0;
        let centerY = Scratch.Cast.toNumber(args.CENTER_Y) / -100 || 0;
        const strength = Scratch.Cast.toNumber(args.STRENGTH) / 100 || 0;
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          centerX = centerX + img.width / 200;
          centerY = centerY + img.height / 200;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          this.applyBulge(imageData, centerX, centerY, strength);
          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL());
        };
        img.src = this.confirmAsset(args.SVG, "png");
      });
    }
    applyBulge(imageData, centerX, centerY, strength) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      const newData = new Uint8ClampedArray(data.length);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const dx = (x / width - centerX) * 2;
          const dy = (y / height - centerY) * 2;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const bulge = Math.pow(distance, strength);
          const srcX = Math.floor(x + dx * bulge * width - dx * width);
          const srcY = Math.floor(y + dy * bulge * height - dy * height);
          if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < height) {
            const srcIndex = (srcY * width + srcX) * 4;
            const dstIndex = (y * width + x) * 4;
            newData.set(data.subarray(srcIndex, srcIndex + 4), dstIndex);
          }
        }
      }
      data.set(newData);
    }

    applyWaveEffect(args) {
      return new Promise((resolve) => {
        const amplitudeX = Scratch.Cast.toNumber(args.AMPX) / 10 || 0;
        const amplitudeY = Scratch.Cast.toNumber(args.AMPY) / 10 || 0;
        const frequencyX = Scratch.Cast.toNumber(args.FREQX) / 100 || 0;
        const frequencyY = Scratch.Cast.toNumber(args.FREQY) / 100 || 0;
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          this.applyWave(imageData, amplitudeX, amplitudeY, frequencyX, frequencyY);
          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL());
        };
        img.src = this.confirmAsset(args.SVG, "png");
      });
    }
    applyWave(imageData, amplitudeX, amplitudeY, frequencyX, frequencyY) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      const newData = new Uint8ClampedArray(data.length);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const srcX = Math.floor(x + amplitudeX * Math.sin(y * frequencyX));
          const srcY = Math.floor(y + amplitudeY * Math.sin(x * frequencyY));
          if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < height) {
            const srcIndex = (srcY * width + srcX) * 4;
            const dstIndex = (y * width + x) * 4;
            newData.set(data.subarray(srcIndex, srcIndex + 4), dstIndex);
          }
        }
      }
      data.set(newData);
    }

    applyBlur(imageData, percentage) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      const radius = Math.floor((percentage / 100) * 10);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let sum = [0, 0, 0, 0];
          let count = 0;
          for (let ky = -radius; ky <= radius; ky++) {
            for (let kx = -radius; kx <= radius; kx++) {
              const offsetX = x + kx;
              const offsetY = y + ky;
              if (offsetX >= 0 && offsetX < width && offsetY >= 0 && offsetY < height) {
                const pixelIndex = (offsetY * width + offsetX) * 4;
                for (let i = 0; i < 4; i++) { sum[i] += data[pixelIndex + i] }
                count++;
              }
            }
          }
          const pixelIndex = (y * width + x) * 4;
          if (count > 0) for (let i = 0; i < 4; i++) { data[pixelIndex + i] = sum[i] / count }
        }
      }
    }

    applyChunkGlitch(imageData, percentage) {
      const newWidth = percentage / 10;
      const data = imageData.data;
      const imgWidth = imageData.width;
      const imgHeight = imageData.height;
      const numLines = Math.floor(imgWidth * 1);
      for (let lineIndex = 0; lineIndex < numLines; lineIndex++) {
        const linePos = Math.floor(Math.random() * imgHeight);
        const lineStart = linePos - Math.floor(newWidth / 2);
        const lineEnd = lineStart + newWidth;
        for (let y = 0; y < imgHeight; y++) {
          const srcIndex = (y * imgWidth + linePos) * 4;
          if (linePos >= 0 && linePos < imgWidth) {
            for (let x = lineStart; x < lineEnd; x++) {
              const dstIndex = (y * imgWidth + x) * 4;
              data.copyWithin(dstIndex, srcIndex, srcIndex + 4);
            }
          }
        }
      }
    }

    removeTransparencyEffect(args) {
      return new Promise((resolve) => {
        const threshold = Scratch.Cast.toNumber(args.THRESHOLD) / 100 || 0;
        const removeUnder = args.REMOVE;
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          this.applyTransparencyRemoval(imageData, threshold, removeUnder);
          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL());
        };
        img.src = this.confirmAsset(args.SVG, "png");
      });
    }
    applyTransparencyRemoval(imageData, threshold, removeUnder) {
      const data = imageData.data;
      const pixelCount = data.length / 4;
      for (let i = 0; i < pixelCount; i++) {
        const alpha = data[i * 4 + 3] / 255;
        if ((removeUnder === "under" && alpha < threshold) ||
          (removeUnder === "over" && alpha > threshold) ||
          (removeUnder === "equal to" && alpha > threshold - 0.01 &&
          alpha < threshold + 0.01)) {
          data[i * 4 + 3] = 0;
        }
      }
    }

    applyLineGlitchEffect(args) {
      return new Promise((resolve) => {
        const percentage = Scratch.Cast.toNumber(args.PERCENTAGE) / 100 || 0;
        const direction = args.DIRECT;
        const width = Scratch.Cast.toNumber(args.WIDTH) / 50 || 0;
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          this.applyLineGlitch(imageData, percentage, direction, width);
          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL());
        };
        img.src = this.confirmAsset(args.SVG, "png");
      });
    }
    applyLineGlitch(imageData, percentage, direction, width) {
      const data = imageData.data;
      const imgWidth = imageData.width;
      const imgHeight = imageData.height;
      const numLines = Math.floor(imgHeight * percentage);
      for (let lineIndex = 0; lineIndex < numLines; lineIndex++) {
        const linePosition = Math.floor(Math.random() * imgHeight);
        const lineStart = linePosition - Math.floor(width / 2);
        const lineEnd = lineStart + width;
        for (let y = (direction === "Y" ? 0 : lineStart); y < (direction === "Y" ? imgHeight : lineEnd); y++) {
          for (let x = (direction === "Y" ? lineStart : 0); x < (direction === "Y" ? lineEnd : imgWidth); x++) {
            const srcX = (direction === "Y" ? x : linePosition);
            const srcY = (direction === "Y" ? linePosition : y);
            if (srcX >= 0 && srcX < imgWidth && srcY >= 0 && srcY < imgHeight) {
              const srcIndex = (srcY * imgWidth + srcX) * 4;
              const dstIndex = (y * imgWidth + x) * 4;
              data.copyWithin(dstIndex, srcIndex, srcIndex + 4);
            }
          }
        }
      }
    }

    applyEdgeOutlineEffect(args) {
      return new Promise((resolve) => {
        const thickness = Math.ceil(Scratch.Cast.toNumber(args.THICKNESS) / 4);
        const color = hexToRgb(args.COLOR);
        const a = Math.min(Math.max(args.A, 0), 100) * 2.55;
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          this.applyOutline(imageData, thickness, color[0], color[1], color[2], a);
          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL());
        };
        img.src = this.confirmAsset(args.SVG, "png");
      });
    }
    applyOutline(imageData, thickness, r, g, b, a) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      const copyData = new Uint8ClampedArray(data);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          if (data[index + 3] < 255) {
            for (let dy = -thickness; dy <= thickness; dy++) {
              for (let dx = -thickness; dx <= thickness; dx++) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                  const neighborIndex = (ny * width + nx) * 4;
                  const neighborAlpha = copyData[neighborIndex + 3];
                  if (neighborAlpha === 255) {
                    data.set([r, g, b, a], index);
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }

    applyClipGlitch(imageData, percentage) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      const percent = percentage / 100;
      const numPixelsToEnlarge = Math.floor((percent / 100) * (width * height));
      for (let i = 0; i < numPixelsToEnlarge; i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        const index = (y * width + x) * 4;
        const enlargeFactor = 1 + Math.random() * (1.5 + percent / 200);
        const blurRadius = Math.floor(enlargeFactor * 4);
        for (let offsetY = -blurRadius; offsetY <= blurRadius; offsetY++) {
          for (let offsetX = -blurRadius; offsetX <= blurRadius; offsetX++) {
            const newX = x + offsetX;
            const newY = y + offsetY;
            const bound = newX >= 0 && newX < width && newY >= 0 && newY < height;
            if (bound) data.copyWithin((newY * width + newX) * 4, index, index + 4);
          }
        }
      }
    }

    applyScanlines(imageData, percentage) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      for (let y = 0; y < height; y++) {
        if (Math.random() < percentage / 100) {
          const scanBright = Math.random() * (percentage / 2);
          for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            data[index] = Math.min(data[index] + scanBright, 255);
            data[index + 1] = Math.min(data[index + 1] + scanBright, 255);
            data[index + 2] = Math.min(data[index + 2] + scanBright, 255);
          }
        }
      }
    }

    applyGrain(imageData, percentage) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          if (Math.random() < percentage) {
            const grain = Math.floor(Math.random() * percentage);
            data[index] += grain;
            data[index + 1] += grain;
            data[index + 2] += grain;
          }
        }
      }
    }

    applyCubism(imageData, percentage) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      const percent = percentage === 0 || percentage === "" ? 1 : Math.abs(Scratch.Cast.toNumber(percentage));
      for (let y = 0; y < height; y += percent) {
        for (let x = 0; x < width; x += percent) {
          const endX = Math.min(x + percent, width);
          const endY = Math.min(y + percent, height);
          const avgColor = [0, 0, 0];
          for (let j = y; j < endY; j++) {
            for (let i = x; i < endX; i++) {
              const index = (j * width + i) * 4;
              avgColor[0] += data[index];
              avgColor[1] += data[index + 1];
              avgColor[2] += data[index + 2];
            }
          }
          const totalPixels = (endX - x) * (endY - y);
          avgColor[0] /= totalPixels;
          avgColor[1] /= totalPixels;
          avgColor[2] /= totalPixels;
          for (let j = y; j < endY; j++) {
            for (let i = x; i < endX; i++) {
              const index = (j * width + i) * 4;
              data[index] = avgColor[0];
              data[index + 1] = avgColor[1];
              data[index + 2] = avgColor[2];
            }
          }
        }
      }
    }

    applyAbberationEffect(args) {
      return new Promise((resolve) => {
        const percentage = args.PERCENTAGE;
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width + Math.abs(percentage) * 5;
          canvas.height = img.height + Math.abs(percentage) * 5;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, Math.abs(percentage) * 2.5, Math.abs(percentage) * 2.5);
          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          this.applyChromAb(imageData, args.COLOR1, args.COLOR2,
            percentage, args.DIRECT);
          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL());
        };
        img.src = this.confirmAsset(args.SVG, "png");
      });
    }
    applyChromAb(imageData, color1, color2, percentage, direction) {
      const data = imageData.data;
      let width = imageData.width;
      let height = imageData.height;
      const copy1 = new Uint8ClampedArray(data.length);
      const copy2 = new Uint8ClampedArray(data.length);
      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const srcIndex = (y * width + x) * 4;
          const r = data[srcIndex];
          const g = data[srcIndex + 1];
          const b = data[srcIndex + 2];
          const a = data[srcIndex + 3];
          let newX1, newY1, newX2, newY2;
          if (direction === "X") {
            newX1 = x + Math.floor((width / 2) * (percentage / 100));
            newY1 = y;
            newX2 = x - Math.floor((width / 2) * (percentage / 100));
            newY2 = y;
          } else {
            newX1 = x;
            newY1 = y + Math.floor((height / 2) * (percentage / 100));
            newX2 = x;
            newY2 = y - Math.floor((height / 2) * (percentage / 100));
          }
          newX1 = Math.max(0, Math.min(width - 1, newX1));
          newY1 = Math.max(0, Math.min(height - 1, newY1));
          newX2 = Math.max(0, Math.min(width - 1, newX2));
          newY2 = Math.max(0, Math.min(height - 1, newY2));
          const leftColor = [(rgb1[0] * r) / 255, (rgb1[1] * g) / 255, (rgb1[2] * b) / 255];
          const rightColor = [(rgb2[0] * r) / 255, (rgb2[1] * g) / 255, (rgb2[2] * b) / 255];
          const leftIndex = (newY1 * width + newX1) * 4;
          const rightIndex = (newY2 * width + newX2) * 4;
          for (let i = 0; i < 4; i++) {
            copy1[leftIndex + i] = leftColor[i];
            copy2[rightIndex + i] = rightColor[i];
          }
          copy1[leftIndex + 3] = copy2[rightIndex + 3] = a;
        }
      }
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.max(0, Math.min(255, (data[i] + copy1[i] + copy2[i]) / 2));
      }
    }

    stretch(src, w, h) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          resolve(this.exportImg(img, this.printImg(img, w, h), w, h));
        };
        img.src = src;
      });
    }
    svgToBitmap(args) {
      return this.stretch(this.confirmAsset(args.SVG, "png"),
        Math.abs(Scratch.Cast.toNumber(args.WIDTH)), Math.abs(Scratch.Cast.toNumber(args.HEIGHT))
      );
    }
    stretchImg(args) {
      return this.stretch(this.confirmAsset(args.URI, "png"),
        Math.abs(Scratch.Cast.toNumber(args.W)), Math.abs(Scratch.Cast.toNumber(args.H))
      );
    }

    convertImageToSVG(args) {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = this.confirmAsset(args.URI, "png");
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, img.width, img.height);
          const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svg.setAttribute("version", "1.1");
          svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
          svg.setAttribute("width", img.width.toFixed(5));
          svg.setAttribute("height", img.height.toFixed(5));
          svg.setAttribute("viewBox", `0,0,${img.width.toFixed(5)},${img.height.toFixed(5)}`);
          const mergedColors = new Map();
          for (let y = 0; y < img.height; y++) {
            for (let x = 0; x < img.width; x++) {
              const colorData = ctx.getImageData(x, y, 1, 1).data;
              const alpha = colorData[3];
              if (alpha === 0) continue;
              const color = `rgb(${colorData[0]}, ${colorData[1]}, ${colorData[2]})`;
              const rightColorData = ctx.getImageData(x + 1, y, 1, 1).data;
              const rightColor = `rgb(${rightColorData[0]}, ${rightColorData[1]}, ${rightColorData[2]})`;
              if (color === rightColor) {
                const mergedPixel = mergedColors.get(color) || {x1: x, y1: y, x2: x + 1, y2: y};
                mergedPixel.x2++;
                mergedColors.set(color, mergedPixel);
              } else {
                mergedColors.forEach((mergedPixel, colorKey) => {
                  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                  rect.setAttribute("x", mergedPixel.x1.toFixed(5));
                  rect.setAttribute("y", mergedPixel.y1.toFixed(5));
                  rect.setAttribute("width", (mergedPixel.x2 - mergedPixel.x1 + 1).toFixed(5));
                  rect.setAttribute("height", (mergedPixel.y2 - mergedPixel.y1 + 1).toFixed(5));
                  rect.setAttribute("fill", colorKey);
                  svg.appendChild(rect);
                });
                mergedColors.clear();
              }
            }
          }
          let svgString = new XMLSerializer().serializeToString(svg);
          if (args.TYPE === "dataURI") svgString = `data:image/svg+xml;base64,${btoa(svgString)}`;
          resolve(svgString);
        };
      });
    }

    async makeSVGimage(args) {
      if (args.URI.startsWith("data:image/")) {
        return await new Promise((resolve, reject) => {
          // eslint-disable-next-line
          const img = new Image();
          img.onload = () => {
            const width = img.width;
            const height = img.height;
            const svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
              width="${width / 2}" height="${(height / 2) + 0.001}" viewBox="0,0,${width / 2},${(height / 2) + 0.001}">
              <g transform="translate(${img.offsetLeft / -2},${img.offsetTop / -2})"><g data-paper-data="{&quot;isPaintingLayer&quot;:true}" fill="none" 
              fill-rule="nonzero" stroke="none" stroke-width="0.5" stroke-linecap="butt" stroke-linejoin="miter" 
              stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" style="mix-blend-mode: normal">
              <image x="0" y="0" transform="scale(0.5,0.5)" width="${width}" height="${height + 0.002}" 
              xlink:href="${img.src}"/></g></g></svg>`;
            resolve(args.TYPE === "dataURI" ? `data:image/svg+xml;base64,${btoa(svg)}` : svg);
          };
          img.onerror = reject;
          img.src = this.confirmAsset(args.URI, "png");
        });
      } else { return args.URI }
    }

    upscaleImage(args) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const pixelData = this.printImg(img);
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.putImageData(new ImageData(new Uint8ClampedArray(pixelData), img.width, img.height), 0, 0);
          const percentage = args.NUM * 10 || 0;
          const factor = percentage / 100;
          const weights = [0, -factor, 0, -factor, 1 + 4 * factor, -factor, 0, -factor, 0];
          this.sharpen(ctx, img.width, img.height, weights, 25);
          resolve(this.exportImg(img, ctx.getImageData(0, 0, img.width, img.height).data));
        };
        img.src = this.confirmAsset(args.URI, "png");
      });
    }
    sharpen(ctx, width, height, weights, alphaThreshold) {
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      const side = Math.round(Math.sqrt(weights.length));
      const halfSide = Math.floor(side / 2);
      const output = ctx.createImageData(width, height);
      const outputData = output.data;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const pixelIndex = (y * width + x) * 4;
          let r = 0, g = 0, b = 0;
          for (let ky = 0; ky < side; ky++) {
            for (let kx = 0; kx < side; kx++) {
              const weight = weights[ky * side + kx];
              const neighborY = Math.min(height - 1, Math.max(0, y + ky - halfSide));
              const neighborX = Math.min(width - 1, Math.max(0, x + kx - halfSide));
              const neighborPixelIndex = (neighborY * width + neighborX) * 4;
              r += data[neighborPixelIndex] * weight;
              g += data[neighborPixelIndex + 1] * weight;
              b += data[neighborPixelIndex + 2] * weight;
            }
          }
          if (data[pixelIndex + 3] / 255 > alphaThreshold / 50) {
            outputData[pixelIndex] = this.clamp(r, 0, 255);
            outputData[pixelIndex + 1] = this.clamp(g, 0, 255);
            outputData[pixelIndex + 2] = this.clamp(b, 0, 255);
            outputData[pixelIndex + 3] = 255;
          } else { outputData[pixelIndex + 3] = 0 }
        }
      }
      ctx.putImageData(output, 0, 0);
    }
    clamp(value, min, max) { return Math.min(max, Math.max(min, value)) }

    audioToImage(args) {
      const audioURI = args.AUDIO_URI;
      const imageWidth = Math.abs(Scratch.Cast.toString(args.W));
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = imageWidth;
      canvas.height = Math.abs(Scratch.Cast.toString(args.H));
      for (let i = 0; i < audioURI.length; i++) {
        const charCode = audioURI.charCodeAt(i);
        ctx.fillStyle = `rgb(${(charCode * 2) % 256},${(charCode * 3) % 256},${(charCode * 4) % 256})`;
        ctx.fillRect(i % imageWidth, Math.floor(i / imageWidth), 1, 1);
      }
      return canvas.toDataURL("image/png");
    }

    skewSVG(args) {
      let svg = this.updateView(args.SVG, Math.abs(args.X) + Math.abs(args.Y));
      const widthMatch = /width="([^"]*)"/.exec(svg);
      const heightMatch = /height="([^"]*)"/.exec(svg);
      if (widthMatch && heightMatch) {
        const width = parseFloat(widthMatch[1]);
        const height = parseFloat(heightMatch[1]);
        let transform = "";
        if (svg.includes("style=\"transform-origin: center; transform:")) {
          svg = svg.replace(/(style="[^"]*transform:[^"]*)/, `$1 skew(${args.Y}deg, ${args.X}deg)`);
        } else {
          svg = svg.replace(
            `width="${width}" height="${height}"`, `width="${width}" height="${height}" style="transform-origin: center; transform: skew(${args.Y}deg, ${args.X}deg)"`
          );
        }
        const currentTransform = /transform="([^"]*)"/.exec(svg);
        const existingTransform = currentTransform ? currentTransform[1] : "";
        const newTransform = existingTransform ? `${existingTransform} ${transform}` : transform;
        svg = svg.replace(/transform="([^"]*)"/, `transform="${newTransform}"`);
        if (args.TYPE === "dataURI") svg = `data:image/svg+xml;base64,${btoa(svg)}`;
      }
      return svg;
    }

    updateView(svg, amt) {
      let values;
      const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);
      let viewBoxValues = -1;
      if (viewBoxMatch) viewBoxValues = viewBoxMatch[1].split(/\s*,\s*/).map(parseFloat);
      const translateMatch = svg.match(/<g transform="translate\((-?[\d.]+),(-?[\d.]+)\)/);
      let translateValues = -1;
      if (translateMatch) translateValues = [parseFloat(translateMatch[1]), parseFloat(translateMatch[2])];
      values = `${viewBoxValues},${translateValues}`;
      values = values.split(",");
      values = values.map(item => Scratch.Cast.toNumber(item));
      amt = Scratch.Cast.toNumber(amt);
      if (values.length > 3) {
        svg = svg.replace(/viewBox="([^"]+)"/, `viewBox="${values[0]},${values[1]},${values[2] + (amt * 2)},${values[3] + (amt * 2)}"`);
        svg = svg.replace(/width="([^"]+)"/, `width="${values[2] + (amt * 2)}"`);
        svg = svg.replace(/height="([^"]+)"/, `height="${values[3] + (amt * 2)}"`);
        svg = svg.replace(/<g transform="([^"]+)"/, `<g transform="translate(${values[4] + amt},${values[5] + amt})"`);
      }
      return svg;
    }

    removeThorns(args) { return args.SVG.replaceAll("linejoin=\"miter\"", "linejoin=\"round\"") }

    numPixels(args) {
      const img = new Image();
      img.src = this.confirmAsset(args.URI, "png");
      return new Promise((resolve) => {
        img.onload = () => {
          const pixelData = this.printImg(img);
          resolve(args.TYPE === "total" ? pixelData.length / 4 : args.TYPE === "per line" ? img.width : img.height);
        };
      });
    }

    setPixel(args) { return this.setPixels(args) }
    setPixels(args) {
      const img = new Image();
      img.src = this.confirmAsset(args.URI, "png");
      return new Promise((resolve) => {
        img.onload = () => {
          const startNum = Scratch.Cast.toNumber(args.NUM);
          const endNum = Scratch.Cast.toNumber(args.NUM2) || startNum;
          const pixelData = this.printImg(img);
          for (let num = startNum; num <= endNum && num <= pixelData.length / 4; num++) {
            const rgb = hexToRgb(args.COLOR);
            for (let i = 0; i < 4; i++) { pixelData[((num - 1) * 4) + i] = rgb[i] }
          }
          resolve(this.exportImg(img, pixelData));
        };
      });
    }
    getPixel(args) {
      const img = new Image();
      img.src = this.confirmAsset(args.URI, "png");
      return new Promise((resolve) => {
        img.onload = () => {
          const targetPixel = Scratch.Cast.toNumber(args.NUM);
          const pixelData = this.printImg(img);
          if (targetPixel >= 1 && targetPixel <= pixelData.length / 4) {
            const pixelIndex = (targetPixel - 1) * 4;
            const rgba = pixelData.slice(pixelIndex, pixelIndex + 4);
            resolve(rgbaToHex(rgba[0], rgba[1], rgba[2], rgba[3]));
          } else { resolve("#00000000") }
        };
      });
    }

    crackImage(args) {
      const cracks = Math.max(2, args.SHARDS);
      const img = new Image();
      img.src = this.confirmAsset(args.URI, "png");
      const newWidth = img.width * 4;
      const newHeight = img.height * 4;
      this.allShards = [];
      return new Promise((resolve) => {
        img.onload = () => {
          for (let i = 0; i < cracks; i++) {
            if (this.allShards.length >= args.SHARDS) break;
            for (let j = 0; j < cracks; j++) {
              if (this.allShards.length >= args.SHARDS) break;
              const shardCanvas = document.createElement("canvas");
              const shardWidth = newWidth / cracks;
              const shardHeight = newHeight / cracks;
              shardCanvas.width = shardWidth;
              shardCanvas.height = shardHeight;
              const ctx = shardCanvas.getContext("2d");
              ctx.clearRect(0, 0, shardWidth, shardHeight);
              ctx.beginPath();
              ctx.moveTo(Math.random() * shardWidth, Math.random() * shardHeight);
              for (let k = 0; k < Math.random() * 10 + 3; k++) {
                ctx.lineTo(Math.random() * shardWidth, Math.random() * shardHeight);
              }
              ctx.closePath();
              ctx.clip();
              const offsetX = Math.random() * (newWidth - shardWidth);
              const offsetY = Math.random() * (newHeight - shardHeight);
              ctx.drawImage(img, -offsetX, -offsetY, newWidth, newHeight);
              const pixelData = this.printImg(shardCanvas);
              this.allShards.push(this.exportImg(shardCanvas, pixelData));
            }
          }
          resolve();
        };
      });
    }

    getShard(args) { return this.allShards[args.SHARD - 1] || "" }

    printImg(img, forceWid, forceHei) {
      const canvas = document.createElement("canvas");
      canvas.width = forceWid || img.width;
      canvas.height = forceHei || img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      return ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    }

    exportImg(img, pixelData, forceWid, forceHei) {
      const canvas = document.createElement("canvas");
      canvas.width = forceWid || img.width;
      canvas.height = forceHei || img.height;
      const ctx = canvas.getContext("2d");
      ctx.putImageData(new ImageData(new Uint8ClampedArray(pixelData), canvas.width, canvas.height), 0, 0);
      return canvas.toDataURL();
    }

    confirmAsset(input, type) {
      if (!input || !(input.startsWith("data:image/") || input.startsWith("<svg"))) return menuIconURI;
      if (type === "png") return input.startsWith("data:image/") ? input : `data:image/svg+xml;base64,${btoa(input)}`;
      else return input.startsWith("data:image/") ? this.makeSVGimage({ URI : input, TYPE : "content" }) : input;
    }
  }

  Scratch.extensions.register(new imgEffectsSP());
})(Scratch);
