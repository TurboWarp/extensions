// Name: Speech Bubbles
// ID: speechSP
// Description: Customizable Speech Bubbles
// By: SharkPool

// Version V.1.1.0

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Speech Bubbles must run unsandboxed");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2Ny4wNTgxNCIgaGVpZ2h0PSI2Ny4wNTgxNCIgdmlld0JveD0iMCwwLDY3LjA1ODE0LDY3LjA1ODE0Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA2LjQ3MDkzLC0xNDYuNDcwOTMpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjA4LjIyMDkzLDE4MGMwLC0xNy41NTEwOSAxNC4yMjc5OCwtMzEuNzc5MDcgMzEuNzc5MDcsLTMxLjc3OTA3YzE3LjU1MTA5LDAgMzEuNzc5MDcsMTQuMjI3OTggMzEuNzc5MDcsMzEuNzc5MDdjMCwxNy41NTEwOSAtMTQuMjI3OTgsMzEuNzc5MDcgLTMxLjc3OTA3LDMxLjc3OTA3Yy0xNy41NTEwOSwwIC0zMS43NzkwNywtMTQuMjI3OTggLTMxLjc3OTA3LC0zMS43NzkwN3oiIGZpbGw9IiM5OTY2ZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjNzc0ZGNiIiBzdHJva2Utd2lkdGg9IjMuNSIvPjxwYXRoIGQ9Ik0yMTUuNjIxMDEsMTg1LjYyNjI1Yy0yLjM3MDA3LC04LjU1NzI2IDEuODY2NjYsLTEyLjU3MjggNS41ODczMSwtMTMuNTIyMzRjNC41Mjc2NiwtMS4xNTU1IDE0LjQ4Mzk4LC0zLjk3NDc4IDIyLjI2Njg0LC01LjY4MjY5YzMuODAwMzYsLTAuODMzOTYgMTAuMDAyOSwwLjYyNTg2IDExLjk1ODE5LDkuMDQ0NThjMS44NTA0Nyw3Ljk2NzQyIC0zLjY0ODEzLDExLjk0MDExIC02LjQ4NTg2LDEyLjY2NDMzYy0yLjU4MzE0LDAuNjU5MjQgLTYuOTAyNTIsMS43NjE1OCAtMTEuODAzMzQsMy4wMTIzMWMtMS4yOTU3NiwwLjMzMDY5IC0zLjE3OTk1LDguMDk2NTQgLTkuMTUyOTEsOS40MDM0N2MtNC4yMzYyOSwwLjkyNjkzIDAuNjkzNjksLTcuMjQ0NjEgLTAuOTkxNTksLTYuODE0NTFjLTQuOTk3NDksMS4yNzU0IC05LjcyOTEyLC0yLjE0OTQ0IC0xMS4zNzg2NiwtOC4xMDUxNXoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjNzc0ZGNiIiBzdHJva2Utd2lkdGg9IjAiLz48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48cGF0aCBkPSJNMjU1LjczNjcxLDE5MC41OTgwNmMwLjc1OTA2LDAuNDM3OTYgMS42OTM5MSwwLjQzNzk2IDIuNDUyOTcsMGwxLjcyNjQzLC0wLjk5NDhjMC44MTY5NywtMC40Njk0NiAxLjcyOTQ3LDAuNDQzMDQgMS4yNTksMS4yNTlsLTAuOTkzNzksMS43Mjc0NGMtMC40Mzc5NiwwLjc1OTA2IC0wLjQzNzk2LDEuNjkzOTEgLTAuMDAxMDIsMi40NTE5NWwwLjk5NDgsMS43MjY0M2MwLjQ2OTQ2LDAuODE2OTggLTAuNDQzMDQsMS43Mjk0OCAtMS4yNjAwMiwxLjI2MDAybC0xLjcyNjQzLC0wLjk5NDhjLTAuNzU4MDQsLTAuNDM2OTUgLTEuNjkyODksLTAuNDM2OTQgLTIuNDUwOTQsMGwtMS43Mjc0NSwwLjk5Mzc5Yy0wLjgxNTk2LDAuNDcwNDcgLTEuNzI4NDYsLTAuNDQyMDIgLTEuMjU5LC0xLjI1OWwwLjk5NDgsLTEuNzI2NDNjMC40MzY5NSwtMC43NTgwNCAwLjQzNjk0LC0xLjY5Mjg5IC0wLjAwMTAxLC0yLjQ1MTk1bC0wLjk5NDgsLTEuNzI2NDNjLTAuNDY5NDYsLTAuODE2OTggMC40NDMwNCwtMS43Mjk0OCAxLjI2MDAyLC0xLjI2MDAyeiIvPjwvZz48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48cGF0aCBkPSJNMjQwLjYwMTcsMTU3LjI2MTQzYy0wLjMwMjU2LDAuOTM0MTEgLTAuMDg0MTIsMS45NTg1MiAwLjU3MzE2LDIuNjg3OTZsMS40OTM1LDEuNjU5MzhjMC43MDUzMywwLjc4NTU1IC0wLjA4MTM3LDEuOTk4NjggLTEuMDg1NDQsMS42NzM4bC0yLjEyNTE1LC0wLjY4NTM2Yy0wLjkzNDExLC0wLjMwMjU2IC0xLjk1ODUyLC0wLjA4NDEyIC0yLjY4NzA5LDAuNTcxODFsLTEuNjU5MzgsMS40OTM1Yy0wLjc4NTU1LDAuNzA1MzMgLTEuOTk4NjksLTAuMDgxMzcgLTEuNjc1MTQsLTEuMDg2MzFsMC42ODY3MSwtMi4xMjQyN2MwLjMwMTY4LC0wLjkzMjc2IDAuMDgzMjQsLTEuOTU3MTcgLTAuNTcyNjksLTIuNjg1NzRsLTEuNDkyNjMsLTEuNjYwNzNjLTAuNzA2MiwtMC43ODQyIDAuMDgwNSwtMS45OTczMyAxLjA4NTQ0LC0xLjY3Mzc5bDIuMTI0MjcsMC42ODY3MWMwLjkzMjc2LDAuMzAxNjggMS45NTcxNywwLjA4MzI0IDIuNjg2NjEsLTAuNTc0MDNsMS42NTkzOCwtMS40OTM1YzAuNzg1NTUsLTAuNzA1MzMgMS45OTg2OSwwLjA4MTM3IDEuNjc1MTQsMS4wODYzMXoiLz48L2c+PGcgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSI+PHBhdGggZD0iTTI2Mi4wNjc1NSwxNzAuMzI5OTljMC4zMTU3MiwwLjU5MTMzIDAuOTIyNywwLjk2OTQgMS41OTI2NiwwLjk5MjAxbDEuNTIzMjQsMC4wNTIyOWMwLjcyMDMsMC4wMjU1OSAwLjk0Mzc0LDAuOTg3MDggMC4zMDgyOCwxLjMyNjZsLTEuMzQzODQsMC43MTk3Yy0wLjU5MTMzLDAuMzE1NzIgLTAuOTY5NCwwLjkyMjcgLTAuOTkyMjYsMS41OTE1OWwtMC4wNTIyOSwxLjUyMzI0Yy0wLjAyNTU4LDAuNzIwMyAtMC45ODcwOCwwLjk0Mzc0IC0xLjMyNzY3LDAuMzA4NTNsLTAuNzE4NjMsLTEuMzQ0MDljLTAuMzE1NDcsLTAuNTkwMjYgLTAuOTIyNDUsLTAuOTY4MzMgLTEuNTkxMzQsLTAuOTkxMTlsLTEuNTIzNDksLTAuMDUzMzZjLTAuNzIwMDUsLTAuMDI0NTIgLTAuOTQzNDksLTAuOTg2MDEgLTAuMzA4MjgsLTEuMzI2NmwxLjM0NDEsLTAuNzE4NjJjMC41OTAyNiwtMC4zMTU0NyAwLjk2ODMyLC0wLjkyMjQ2IDAuOTkwOTQsLTEuNTkyNDFsMC4wNTIyOSwtMS41MjMyNGMwLjAyNTU4LC0wLjcyMDMgMC45ODcwOCwtMC45NDM3NCAxLjMyNzY3LC0wLjMwODUzeiIvPjwvZz48L2c+PC9nPjwvc3ZnPg==";
  const blockIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MS4yODgyMSIgaGVpZ2h0PSI2MS4yODgyMSIgdmlld0JveD0iMCwwLDYxLjI4ODIxLDYxLjI4ODIxIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA5LjM1NTksLTE0OS4zNTU5KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIwOS4zNTU5LDIxMC42NDQxdi02MS4yODgyMWg2MS4yODgyMXY2MS4yODgyMXoiIGZpbGw9IiM5OTY2ZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjE1LjYyMTAxLDE4NS42MjYyNWMtMi4zNzAwNywtOC41NTcyNiAxLjg2NjY2LC0xMi41NzI4IDUuNTg3MzEsLTEzLjUyMjM0YzQuNTI3NjYsLTEuMTU1NSAxNC40ODM5OCwtMy45NzQ3OCAyMi4yNjY4NCwtNS42ODI2OWMzLjgwMDM2LC0wLjgzMzk2IDEwLjAwMjksMC42MjU4NiAxMS45NTgxOSw5LjA0NDU4YzEuODUwNDcsNy45Njc0MiAtMy42NDgxMywxMS45NDAxMSAtNi40ODU4NiwxMi42NjQzM2MtMi41ODMxNCwwLjY1OTI0IC02LjkwMjUyLDEuNzYxNTggLTExLjgwMzM0LDMuMDEyMzFjLTEuMjk1NzYsMC4zMzA2OSAtMy4xNzk5NSw4LjA5NjU0IC05LjE1MjkxLDkuNDAzNDdjLTQuMjM2MjksMC45MjY5MyAwLjY5MzY5LC03LjI0NDYxIC0wLjk5MTU5LC02LjgxNDUxYy00Ljk5NzQ5LDEuMjc1NCAtOS43MjkxMiwtMi4xNDk0NCAtMTEuMzc4NjYsLTguMTA1MTV6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iIzc3NGRjYiIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI1NS43MzY3MSwxOTAuNTk4MDZjMC43NTkwNiwwLjQzNzk2IDEuNjkzOTEsMC40Mzc5NiAyLjQ1Mjk3LDBsMS43MjY0MywtMC45OTQ4YzAuODE2OTcsLTAuNDY5NDYgMS43Mjk0NywwLjQ0MzA0IDEuMjU5LDEuMjU5bC0wLjk5Mzc5LDEuNzI3NDRjLTAuNDM3OTYsMC43NTkwNiAtMC40Mzc5NiwxLjY5MzkxIC0wLjAwMTAyLDIuNDUxOTVsMC45OTQ4LDEuNzI2NDNjMC40Njk0NiwwLjgxNjk4IC0wLjQ0MzA0LDEuNzI5NDggLTEuMjYwMDIsMS4yNjAwMmwtMS43MjY0MywtMC45OTQ4Yy0wLjc1ODA0LC0wLjQzNjk1IC0xLjY5Mjg5LC0wLjQzNjk0IC0yLjQ1MDk0LDBsLTEuNzI3NDUsMC45OTM3OWMtMC44MTU5NiwwLjQ3MDQ3IC0xLjcyODQ2LC0wLjQ0MjAyIC0xLjI1OSwtMS4yNTlsMC45OTQ4LC0xLjcyNjQzYzAuNDM2OTUsLTAuNzU4MDQgMC40MzY5NCwtMS42OTI4OSAtMC4wMDEwMSwtMi40NTE5NWwtMC45OTQ4LC0xLjcyNjQzYy0wLjQ2OTQ2LC0wLjgxNjk4IDAuNDQzMDQsLTEuNzI5NDggMS4yNjAwMiwtMS4yNjAwMnoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMjQwLjYwMTcsMTU3LjI2MTQzYy0wLjMwMjU2LDAuOTM0MTEgLTAuMDg0MTIsMS45NTg1MiAwLjU3MzE2LDIuNjg3OTZsMS40OTM1LDEuNjU5MzhjMC43MDUzMywwLjc4NTU1IC0wLjA4MTM3LDEuOTk4NjggLTEuMDg1NDQsMS42NzM4bC0yLjEyNTE1LC0wLjY4NTM2Yy0wLjkzNDExLC0wLjMwMjU2IC0xLjk1ODUyLC0wLjA4NDEyIC0yLjY4NzA5LDAuNTcxODFsLTEuNjU5MzgsMS40OTM1Yy0wLjc4NTU1LDAuNzA1MzMgLTEuOTk4NjksLTAuMDgxMzcgLTEuNjc1MTQsLTEuMDg2MzFsMC42ODY3MSwtMi4xMjQyN2MwLjMwMTY4LC0wLjkzMjc2IDAuMDgzMjQsLTEuOTU3MTcgLTAuNTcyNjksLTIuNjg1NzRsLTEuNDkyNjMsLTEuNjYwNzNjLTAuNzA2MiwtMC43ODQyIDAuMDgwNSwtMS45OTczMyAxLjA4NTQ0LC0xLjY3Mzc5bDIuMTI0MjcsMC42ODY3MWMwLjkzMjc2LDAuMzAxNjggMS45NTcxNywwLjA4MzI0IDIuNjg2NjEsLTAuNTc0MDNsMS42NTkzOCwtMS40OTM1YzAuNzg1NTUsLTAuNzA1MzMgMS45OTg2OSwwLjA4MTM3IDEuNjc1MTQsMS4wODYzMXoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMjYyLjA2NzU1LDE3MC4zMjk5OWMwLjMxNTcyLDAuNTkxMzMgMC45MjI3LDAuOTY5NCAxLjU5MjY2LDAuOTkyMDFsMS41MjMyNCwwLjA1MjI5YzAuNzIwMywwLjAyNTU5IDAuOTQzNzQsMC45ODcwOCAwLjMwODI4LDEuMzI2NmwtMS4zNDM4NCwwLjcxOTdjLTAuNTkxMzMsMC4zMTU3MiAtMC45Njk0LDAuOTIyNyAtMC45OTIyNiwxLjU5MTU5bC0wLjA1MjI5LDEuNTIzMjRjLTAuMDI1NTgsMC43MjAzIC0wLjk4NzA4LDAuOTQzNzQgLTEuMzI3NjcsMC4zMDg1M2wtMC43MTg2MywtMS4zNDQwOWMtMC4zMTU0NywtMC41OTAyNiAtMC45MjI0NSwtMC45NjgzMyAtMS41OTEzNCwtMC45OTExOWwtMS41MjM0OSwtMC4wNTMzNmMtMC43MjAwNSwtMC4wMjQ1MiAtMC45NDM0OSwtMC45ODYwMSAtMC4zMDgyOCwtMS4zMjY2bDEuMzQ0MSwtMC43MTg2MmMwLjU5MDI2LC0wLjMxNTQ3IDAuOTY4MzIsLTAuOTIyNDYgMC45OTA5NCwtMS41OTI0MWwwLjA1MjI5LC0xLjUyMzI0YzAuMDI1NTgsLTAuNzIwMyAwLjk4NzA4LC0wLjk0Mzc0IDEuMzI3NjcsLTAuMzA4NTN6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvZz48L3N2Zz4=";

  let allBubbles = {};
  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const render = vm.renderer;

  const fontMenu = [
    "Scratch", "Sans Serif", "Serif",
    "Handwriting", "Marker", "Curly", "Pixel"
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

  class speechSP {
    constructor() {
      runtime.on("PROJECT_START", () => {this.shutUp({ SPRITE: "_all_" }) });
      runtime.on("PROJECT_STOP_ALL", () => { this.shutUp({ SPRITE: "_all_" }) });
      runtime.on("AFTER_EXECUTE", () => {
        for (var i = 1; i < runtime.targets.length; i++) {
          const targetInfo = runtime.targets[i];
          const id = `#SP_Speech-Ext-${btoa(targetInfo.id).replaceAll("=", "_").replaceAll("/", "-")}`;
          const element = document.querySelector(`div[id="${id.substring(1)}"]`);
          if (element) {
            let curTransform = element.style.transform || "";
            curTransform = curTransform.replace(/translate\([^)]*\)/g, "");
            const translate = `translate(${targetInfo.x + allBubbles[id].offset[0]}px, ${(targetInfo.y + allBubbles[id].offset[1]) * -1}px)`;
            element.style.transform = `${curTransform} ${translate}`;
          }
        }
      });
    }
    getInfo() {
      return {
        id: "speechSP",
        name: "Speech Bubbles",
        color1: "#9966ff",
        color2: "#774dcb",
        menuIconURI,
        blockIconURI,
        blocks: [
          { blockType: Scratch.BlockType.LABEL, text: "Speech" },
          {
            opcode: "sayThis",
            blockType: Scratch.BlockType.COMMAND,
            text: "say [SPEECH] hooked to [SPRITE]",
            arguments: {
              SPEECH: { type: Scratch.ArgumentType.STRING, defaultValue: "hello!" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "shutUp",
            blockType: Scratch.BlockType.COMMAND,
            text: "tell [SPRITE] to shut up",
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "isYapping",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [SPRITE] yapping?",
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: "Bubble Text" },
          {
            opcode: "bubbleFont",
            blockType: Scratch.BlockType.COMMAND,
            text: "set bubble font of [SPRITE] to [FONT]",
            arguments: {
              FONT: { type: Scratch.ArgumentType.STRING, menu: "FONTS" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "bubbleFontSize",
            blockType: Scratch.BlockType.COMMAND,
            text: "set bubble font size of [SPRITE] to [NUM]",
            arguments: {
              NUM : { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "bubbleBold",
            blockType: Scratch.BlockType.COMMAND,
            text: "set bubble boldness of [SPRITE] to [NUM]",
            arguments: {
              NUM : { type: Scratch.ArgumentType.NUMBER, menu: "THICK" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "bubbleAlign",
            blockType: Scratch.BlockType.COMMAND,
            text: "set bubble text alignment of [SPRITE] to [TYPE]",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "ALIGNMENTS" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "bubbleWidth",
            blockType: Scratch.BlockType.COMMAND,
            text: "set bubble width of [SPRITE] to [WIDTH]",
            arguments: {
              WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 300 },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: "Bubble Formatting" },
          {
            opcode: "bubblePads",
            blockType: Scratch.BlockType.COMMAND,
            text: "set bubble [TYPE] of [SPRITE] to [NUM]",
            arguments: {
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "FOCUS" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "bubbleColor",
            blockType: Scratch.BlockType.COMMAND,
            text: "set bubble [TYPE] color of [SPRITE] to [COLOR]",
            arguments: {
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "COLOR" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "bubbleImg",
            blockType: Scratch.BlockType.COMMAND,
            text: "set bubble image of [SPRITE] to [URL]",
            arguments: {
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "https://extensions.turbowarp.org/dango.png" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          "---",
          {
            opcode: "arrowPos",
            blockType: Scratch.BlockType.COMMAND,
            text: "set arrow position of [SPRITE] to x [x] y [y]",
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "bubbleOffset",
            blockType: Scratch.BlockType.COMMAND,
            text: "set bubble offset of [SPRITE] to x [x] y [y]",
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "getOffset",
            blockType: Scratch.BlockType.REPORTER,
            text: "bubble offset [POS] of [SPRITE]",
            arguments: {
              POS: { type: Scratch.ArgumentType.STRING, menu: "POS" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: "Bubble Styling" },
          {
            opcode: "setStretch",
            blockType: Scratch.BlockType.COMMAND,
            text: "stretch [TYPE] of [SPRITE] to x [x] y [y]",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "ELEMENT" },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 200 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" }
            }
          },
          {
            opcode: "setGlow",
            blockType: Scratch.BlockType.COMMAND,
            text: "set glow of [SPRITE] to x [x] y [y] z [z] color [COLOR]",
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" }
            }
          },
          "---",
          {
            opcode: "setEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [TYPE] [EFFECT] of [SPRITE] to [NUM]",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "ELEMENT" },
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTS" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" }
            }
          },
          {
            opcode: "resetEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset all bubble styling of [SPRITE]",
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "getEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "get [EFFECT] of [TYPE] in [SPRITE]",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "ELEMENT" },
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTSALL" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" }
            }
          },
        ],
        menus: {
          TARGETS: { acceptReporters: true, items: this.getTargets(true) },
          TARGETS2: { acceptReporters: true, items: this.getTargets(false) },
          FONTS: { acceptReporters: true, items: "allFonts" },
          EFFECTS: { acceptReporters: true, items: this.getEffects(false) },
          EFFECTSALL: { acceptReporters: true, items: this.getEffects(true) },
          POS: ["x", "y"],
          ALIGNMENTS: ["left", "right", "center"],
          COLOR: ["background", "arrow", "text"],
          ELEMENT: ["bubble", "arrow"],
          FOCUS: ["padding", "border radius"],
          THICK: [
            { text : "thick", value : "900" },
            { text : "medium", value : "600" },
            { text : "none", value : "1" },
          ]
        },
      };
    }

    isFull() {
      const values = [parseFloat(render.canvas.style.width), runtime.stageWidth];
      if (values[0] > values[1]) return (render.canvas.width / runtime.stageWidth) * 1.5;
      else return 2;
    }

    allFonts() {
      const customFonts = runtime.fontManager ? runtime.fontManager.getFonts().map((i) => ({ text: i.name, value: i.family })) : [];
      return [...fontMenu, ...customFonts];
    }

    getTargets(includeAll) {
      const spriteNames = [];
      spriteNames.push({ text : "myself", value: "_myself_" });
      if (includeAll) spriteNames.push({ text : "all sprites", value: "_all_" });
      const targets = runtime.targets;
      for (let index = 1; index < targets.length; index++) {
        const target = targets[index];
        if (target.isOriginal) spriteNames.push({ text : target.getName(), value : target.id });
      }
      return spriteNames.length > 0 ? spriteNames : [""];
    }

    getEffects(enable) {
      return [
        "blur", "saturation", "contrast",
        "brightness", "hue", "opacity",
        "sepia", "invert", "direction",
        ...(enable ? ["scale x", "scale y"] : []),
        "skew x", "skew y"
      ];
    }

    speech(txt, target) {
      target = btoa(target).replaceAll("=", "_").replaceAll("/", "-");
      try {
        const elements = document.querySelectorAll(`div[id="SP_Speech-Ext-${target}"] div[id="text-ID"]`);
        if (elements.length > 0) elements.forEach((element) => { element.innerHTML = xmlEscape(txt).replace(/\n/g, "<br>") });
        else this.saySpeech(txt, target);
      } catch { return }
    }

    saySpeech(txt, target) {
      if (!allBubbles[`#SP_Speech-Ext-${target}`]) this.addDefault(target);
      allBubbles[`#SP_Speech-Ext-${target}`].stopped = false; // failsafe
      const newTxtElement = document.createElement("div");
      const styles = allBubbles[`#SP_Speech-Ext-${target}`].styles;
      Object.assign(newTxtElement.style, styles);

      const textEl = document.createElement("div");
      textEl.id = "text-ID";
      textEl.innerHTML = xmlEscape(txt).replace(/\n/g, "<br>");
      newTxtElement.appendChild(textEl);
      const arrowElement = document.createElement("div");
      arrowElement.id = "arrow-ID";
      const arrowStyles = allBubbles[`#SP_Speech-Ext-${target}`].arrowStyles;
      Object.assign(arrowElement.style, arrowStyles);

      newTxtElement.appendChild(arrowElement);
      newTxtElement.id = `SP_Speech-Ext-${target}`;
      newTxtElement.classList.add(target);
      render.addOverlay(newTxtElement, "scale-centered");
    }

    addDefault(target) {
      allBubbles[`#SP_Speech-Ext-${target}`] = {
        target: target,
        stopped: false,
        offset: [0, 0],
        styles: {
          width: "150px",
          background: "#00bfb6",
          backgroundSize: "cover",
          padding: "10px",
          borderRadius: "12px",
          textAlign: "center",
          fontWeight: "900",
          fontSize: "15px",
          color: "#ffffff",
          fontFamily: "arial",
          position: "relative",
          pointerEvents: "none",
          boxShadow: "0px 0px 0px #00000000",
          transform: "scale(1,1) skewX(0deg) skewY(0deg) rotate(0deg)",
          filter: "blur(0px) brightness(1) contrast(1) hue-rotate(0deg) invert(0) opacity(1) saturate(1) sepia(0)"
        },
        arrowStyles: {
          position: "absolute",
          width: "0px",
          height: "0px",
          borderLeft: "10px solid #00bfb6",
          borderRight: "10px solid transparent",
          borderTop: "10px solid #00bfb6",
          borderBottom: "10px solid transparent",
          left: "-10px",
          top: "-10px",
          transform: "scale(1,1) skewX(0deg) skewY(0deg) rotate(0deg)",
          filter: "blur(0px) brightness(1) contrast(1) hue-rotate(0deg) invert(0) opacity(1) saturate(1) sepia(0)"
        }
      };
    }

    setBubbleAtt(type, value, target, target2) {
      const applyUpdate = (newTarget) => {
        const encodeTarget = btoa(newTarget).replaceAll("=", "_").replaceAll("/", "-");
        const key = `#SP_Speech-Ext-${encodeTarget}`;
        if (!allBubbles[key]) this.addDefault(encodeTarget);
        allBubbles[key][target2][type] = value;
        this.updateElement(key, allBubbles[key]);
      };
      if (target !== "_all_") applyUpdate(Scratch.Cast.toString(target));
      else {
        const sprites = this.getTargets(false);
        for (let i = 1; i < sprites.length; i++) { applyUpdate(sprites[i].value) }
      }
    }

    updateElement(key, object) {
      const elements = document.querySelectorAll(`div[id="${key.substring(1)}"]`);
      elements.forEach((element) => {
        let translate = element.style.transform.match(/translate\(([^,]+),([^)]+)\)/);
        translate = translate ? `translate(${translate[1]},${translate[2]})` : "";
        Object.assign(element.style, object.styles);
        element.style.transform = `${translate} ${object.styles.transform}`;
        element.style.filter = object.styles.filter;
        const arrowElement = element.querySelector(`div[id="arrow-ID"]`);
        Object.assign(arrowElement.style, object.arrowStyles);
        arrowElement.style.transform = object.arrowStyles.transform;
        arrowElement.style.filter = object.arrowStyles.filter;
      });
    }

    //Speech
    sayThis(args, util) {
      const target = args.SPRITE === "_myself_" ? util.target.id : args.SPRITE;
      if (target !== "_all_") this.speech(args.SPEECH, target);
      else {
        const list = this.getTargets(false);
        for (let i = 1; i < list.length; i++) { this.speech(args.SPEECH, list[i].value) }
      }
    }

    shutUp(args, util) {
      let target = args.SPRITE === "_myself_" ? util.target.id : args.SPRITE;
      try { target = btoa(target).replaceAll("=", "_").replaceAll("/", "-") } catch {}
      const shutUpTarget = (key) => {
        const elementsToRemove = document.querySelectorAll(`div[id="${key.substring(1)}"]`);
        elementsToRemove.forEach((element) => {
          render.removeOverlay(element);
          allBubbles[key].stopped = true;
        });
      };
      if (args.SPRITE === "_all_") Object.keys(allBubbles).forEach(shutUpTarget);
      else shutUpTarget(`#SP_Speech-Ext-${target}`);
    }

    isYapping(args, util) {
      let target = args.SPRITE === "_myself_" ? util.target.id : args.SPRITE;
      target = btoa(target).replaceAll("=", "_").replaceAll("/", "-");
      try {
        const con1 = !allBubbles[`#SP_Speech-Ext-${target}`].stopped;
        const con2 = document.querySelector(`div[id="SP_Speech-Ext-${target}"]`);
        return Scratch.Cast.toBoolean(con1 && con2);
      } catch (e) { return false }
    }

    //Positions
    bubbleOffset(args, util) {
      let target = args.SPRITE === "_myself_" ? util.target.id : args.SPRITE;
      target = btoa(target).replaceAll("=", "_").replaceAll("/", "-");
      if (!allBubbles[`#SP_Speech-Ext-${target}`]) this.addDefault(target);
      const setOff = (key) => {
        const elements = document.querySelectorAll(`div[id="${key.substring(1)}"]`);
        elements.forEach((element) => {
          const box = element.getBoundingClientRect();
          allBubbles[key].offset = [
            Scratch.Cast.toNumber(args.x) - (box.width / this.isFull()),
            Scratch.Cast.toNumber(args.y) + (box.height / this.isFull())
          ];
        });
      };
      if (args.SPRITE === "_all_") Object.keys(allBubbles).forEach(setOff);
      else setOff(`#SP_Speech-Ext-${target}`);
    }

    getOffset(args, util) {
      let target = args.SPRITE === "_myself_" ? util.target.id : args.SPRITE;
      target = btoa(target).replaceAll("=", "_").replaceAll("/", "-");
      try {
        const key = `#SP_Speech-Ext-${target}`;
        let offset = allBubbles[key].offset;
        offset = offset[args.POS === "x" ? 0 : 1];
        const element = document.querySelector(`div[id="${key.substring(1)}"]`).getBoundingClientRect();
        return offset + (args.POS === "x" ? element.width / this.isFull() : element.height / -this.isFull());
      } catch (e) { return 0 }
    }

    //Customization
    bubbleWidth(args, util) {
      this.setBubbleAtt(
        "width", `${Math.abs(Scratch.Cast.toNumber(args.WIDTH))}px`,
        args.SPRITE === "_myself_" ? util.target.id : args.SPRITE,
        "styles"
      );
    }

    bubblePads(args, util) {
      this.setBubbleAtt(
        args.TYPE === "padding" ? "padding" : "borderRadius", 
        `${Scratch.Cast.toNumber(args.NUM)}px`, args.SPRITE === "_myself_" ? util.target.id : args.SPRITE,
        "styles"
      );
    }

    bubbleFont(args, util) {
      this.setBubbleAtt(
        "fontFamily", args.FONT, args.SPRITE === "_myself_" ? util.target.id : args.SPRITE,
        "styles"
      );
    }

    bubbleFontSize(args, util) {
      this.setBubbleAtt(
        "fontSize", `${Math.abs(Scratch.Cast.toNumber(args.NUM))}px`,
        args.SPRITE === "_myself_" ? util.target.id : args.SPRITE,
        "styles"
      );
    }

    bubbleBold(args, util) {
      this.setBubbleAtt(
        "fontWeight", args.NUM, args.SPRITE === "_myself_" ? util.target.id : args.SPRITE,
        "styles"
      );
    }

    bubbleAlign(args, util) {
      this.setBubbleAtt(
        "textAlign", args.TYPE, args.SPRITE === "_myself_" ? util.target.id : args.SPRITE,
        "styles"
      );
    }

    bubbleColor(args, util) {
      if (args.TYPE === "arrow") {
        this.setBubbleAtt(
          "borderLeft", `10px solid ${args.COLOR}`,
          args.SPRITE === "_myself_" ? util.target.id : args.SPRITE,
          "arrowStyles"
        );
        this.setBubbleAtt(
          "borderTop", `10px solid ${args.COLOR}`,
          args.SPRITE === "_myself_" ? util.target.id : args.SPRITE,
          "arrowStyles"
        );
      } else {
        this.setBubbleAtt(
          args.TYPE === "background" ? "background" : "color", args.COLOR,
          args.SPRITE === "_myself_" ? util.target.id : args.SPRITE,
          "styles"
        );
      }
    }

    bubbleImg(args, util) {
      Scratch.canFetch(encodeURI(args.URL)).then((canFetch) => {
        if (canFetch) {
          this.setBubbleAtt(
            "background", `url(${encodeURI(args.URL)})`,
            args.SPRITE === "_myself_" ? util.target.id : args.SPRITE,
            "styles"
          );
        }
      });
    }

    arrowPos(args, util) {
      const target = args.SPRITE === "_myself_" ? util.target.id : args.SPRITE;
      this.setBubbleAtt("left", `${Scratch.Cast.toNumber(args.x)}px`, target, "arrowStyles");
      this.setBubbleAtt("top", `${Scratch.Cast.toNumber(args.y) * -1}px`, target, "arrowStyles");
    }

    getEffect(args, util) {
      args.EFFECT = Scratch.Cast.toString(args.EFFECT).replaceAll(" ", "");
      if (args.EFFECT === "saturation") args.EFFECT = "saturate";
      if (args.EFFECT === "hue") args.EFFECT = "hue-rotate";
      if (args.EFFECT === "direction") args.EFFECT = "rotate";
      let target = args.SPRITE === "_myself_" ? util.target.id : args.SPRITE;
      target = btoa(target).replaceAll("=", "_").replaceAll("/", "-");
      const key = `#SP_Speech-Ext-${target}`;
      if (!allBubbles[key]) this.addDefault(target);
      let path = allBubbles[key][args.TYPE === "arrow" ? "arrowStyles" : "styles"];
      path = path[args.EFFECT.includes("scale") || args.EFFECT.includes("skew") || args.EFFECT === "rotate"
        ? "transform" : "filter"];
      const filterProps = path.match(/[\w-]+\([^)]+\)/g) || [];
      const filterObject = {};
      filterProps.forEach(property => {
        const [name, value] = property.split("(");
        filterObject[name.toLowerCase()] = value.replace(/\)$/, "");
      });
      try {
        if (args.EFFECT.includes("scale")) {
          const value = filterObject["scale"].split(",");
          return value[args.EFFECT.includes("x") ? 0 : 1] * 100;
        } else {
          let number = Scratch.Cast.toNumber(filterObject[args.EFFECT].replace("px", "").replace("deg", ""));
          if (args.EFFECT === "saturate" || args.EFFECT === "invert" || args.EFFECT === "sepia") number = number * 100;
          if (args.EFFECT === "contrast" || args.EFFECT === "brightness") number = number * 100 - 100;
          if (args.EFFECT === "opacity") number = (number * -100) + 100;
          if (args.EFFECT === "rotate") number = number + 90;
          return number;
        }
      } catch { return "" }
    }

    setEffect(args, util) {
      const target = args.SPRITE === "_myself_" ? util.target.id : args.SPRITE;
      const key = btoa(target).replaceAll("=", "_").replaceAll("/", "-");
      if (!allBubbles[`#SP_Speech-Ext-${key}`]) this.addDefault(key);
      let element = document.querySelector(`div[id="SP_Speech-Ext-${key}"]`);
      if (!element) return;
      if (args.TYPE === "arrow") element = element.querySelector(`div[id="arrow-ID"]`);
      let effect = Scratch.Cast.toString(args.EFFECT).replaceAll(" ", "");
      let term = "";
      const source = effect.includes("skew") || effect === "direction" ? "transform" : "filter";
      if (effect === "blur") term = "px";
      if (effect === "saturation") effect = "saturate";
      if (effect === "hue") { effect = "hue-rotate"; term = "deg" }
      if (effect === "direction") { effect = "rotate"; term = "deg" }
      if (effect === "skewx") { effect = "skewX"; term = "deg" }
      if (effect === "skewy") { effect = "skewY"; term = "deg" }
      let value = Scratch.Cast.toNumber(args.NUM);
      if (effect === "saturate" || effect === "invert" || effect === "sepia") value = value / 100;
      if (effect === "contrast" || effect === "brightness") value = (value + 100) / 100;
      if (effect === "opacity") value = (100 - value) / 100;
      if (effect === "rotate") value = value - 90;
      value = `${effect}(${value}${term})`;

      let curSource = element.style[source] || "";
      curSource = curSource.replace(new RegExp(`${effect}\\([^)]*\\)`, "g"), "");
      element.style[source] = `${curSource} ${value}`;
      this.setBubbleAtt(
        source, `${curSource} ${value}`.trim(), target,
        args.TYPE === "arrow" ? "arrowStyles" : "styles"
      );
    }

    setStretch(args, util) {
      const target = args.SPRITE === "_myself_" ? util.target.id : args.SPRITE;
      const key = btoa(target).replaceAll("=", "_").replaceAll("/", "-");
      if (!allBubbles[`#SP_Speech-Ext-${key}`]) this.addDefault(key);
      let element = document.querySelector(`div[id="SP_Speech-Ext-${key}"]`);
      if (!element) return;
      if (args.TYPE === "arrow") element = element.querySelector(`div[id="arrow-ID"]`);
      let curTransform = element.style.transform || "";
      curTransform = curTransform.replace(/scale\([^)]*\)/g, "");
      const value = `scale(${Scratch.Cast.toNumber(args.x) / 100},${Scratch.Cast.toNumber(args.y) / 100})`;
      element.style.transform = `${curTransform} ${value}`;
      this.setBubbleAtt(
        "transform", `${curTransform} ${value}`.trim(), target,
        args.TYPE === "arrow" ? "arrowStyles" : "styles"
      );
    }

    setGlow(args, util) {
      let target = args.SPRITE === "_myself_" ? util.target.id : args.SPRITE;
      target = btoa(target).replaceAll("=", "_").replaceAll("/", "-");
      const color = args.z === 0 ? "none" : `${args.x}px ${args.y * -1}px ${args.z}px ${args.COLOR}`;
      const applyGlow = (key) => {
        const elements = document.querySelectorAll(`div[id="${key.substring(1)}"]`);
        elements.forEach((element) => {
          element.style.boxShadow = color;
          allBubbles[key].styles.boxShadow = color;
        });
      };
      if (args.SPRITE === "_all_") Object.keys(allBubbles).forEach(applyGlow);
      else applyGlow(`#SP_Speech-Ext-${target.replaceAll(" ", "-")}`);
    }

    resetEffect(args, util) {
      const effects = this.getEffects(false);
      const defaultVals = [0, 100, 0, 0, 0, 0, 0, 0, 90, 0, 0];
      let target = args.SPRITE === "_myself_" ? util.target.id : args.SPRITE;
      const setEffects = (key) => {
        for (let i = 0; i < defaultVals.length; i++) {
          this.setEffect({ TYPE : "bubble", EFFECT: effects[i], NUM: defaultVals[i], SPRITE: target });
          this.setEffect({ TYPE : "arrow", EFFECT: effects[i], NUM: defaultVals[i], SPRITE: target });
        }
        this.setStretch({ TYPE : "bubble", x: 100, y: 100, SPRITE: target });
        this.setStretch({ TYPE : "arrow", x: 100, y: 100, SPRITE: target });
      };
      if (args.SPRITE === "_all_") Object.keys(allBubbles).forEach(setEffects);
      else setEffects(Scratch.Cast.toString(target));
    }
  }

  Scratch.extensions.register(new speechSP());
})(Scratch);
