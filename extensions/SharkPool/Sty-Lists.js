// Name: Sty-Lists
// ID: SPlistMonitors
// Description: Customize and Organize Lists Monitors.
// By: SharkPool

// Version 1.1.4

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Sty-Lists must run unsandboxed!");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2Mi4xNDI4NiIgaGVpZ2h0PSI2Mi4xNDI4NiIgdmlld0JveD0iMCwwLDYyLjE0Mjg2LDYyLjE0Mjg2Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA4LjkyODU3LC0xNDguOTI4NTcpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yMDguOTI4NTcsMTgwYzAsLTE3LjE2MDI3IDEzLjkxMTE2LC0zMS4wNzE0MyAzMS4wNzE0MywtMzEuMDcxNDNjMTcuMTYwMjcsMCAzMS4wNzE0MywxMy45MTExNiAzMS4wNzE0MywzMS4wNzE0M2MwLDE3LjE2MDI3IC0xMy45MTExNiwzMS4wNzE0MyAtMzEuMDcxNDMsMzEuMDcxNDNjLTE3LjE2MDI3LDAgLTMxLjA3MTQzLC0xMy45MTExNiAtMzEuMDcxNDMsLTMxLjA3MTQzeiIgZmlsbD0iI2NjNDYwMiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjEyLjQ5Mjg4LDE4MGMwLC0xNS4xOTE3NiAxMi4zMTUzNiwtMjcuNTA3MTIgMjcuNTA3MTIsLTI3LjUwNzEyYzE1LjE5MTc2LDAgMjcuNTA3MTIsMTIuMzE1MzYgMjcuNTA3MTIsMjcuNTA3MTJjMCwxNS4xOTE3NiAtMTIuMzE1MzYsMjcuNTA3MTIgLTI3LjUwNzEyLDI3LjUwNzEyYy0xNS4xOTE3NiwwIC0yNy41MDcxMiwtMTIuMzE1MzYgLTI3LjUwNzEyLC0yNy41MDcxMnoiIGZpbGw9IiNmZjY2MWEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI1My4xNjc2NiwxODcuNTc0NDFjMCwwLjAxNTY1IC0wLjAwMzY3LDAuMDMwODMgLTAuMDA0NiwwLjA0NjQ3djQuNzYzNzljMC4wMDAwMSwwLjU3MzggLTAuNDYzMjYsMS4wMzk5NSAtMS4wMzcwNSwxLjA0MzV2MC4wMDA5MmgtMTYuMjg3MjZ2LTAuMDAwNDVjLTAuNTczNzksLTAuMDAzNTQgLTEuMDM3MDYsLTAuNDY5NyAtMS4wMzcwNSwtMS4wNDM1aC0wLjAwNTA2di00Ljc1NDU5Yy0wLjAwMDkyLC0wLjAxODg3IC0wLjAwNTUyLC0wLjAzNjM1IC0wLjAwNTUyLC0wLjA1NTY3YzAuMDAwMjYsLTAuNTc2NDUgMC40Njc1LC0xLjA0MzY5IDEuMDQzOTUsLTEuMDQzOTRsMC4wMDQxNCwwLjAwMDQ2di0wLjAwMDQ2bDE2LjI4NzI0LDAuMDAwNDZjMC41NzUzMywwLjAwMTAyIDEuMDQxMTgsMC40Njc3IDEuMDQxMTgsMS4wNDMwMnpNMjI5LjkwMzkxLDE4Ni44MzU4MmMwLjE5NTY0LDAuMTk1OCAwLjMwNTQxLDAuNDYxMzQgMC4zMDUxNywwLjczODEzdjQuODA5OGMtMC4wMDAyNiwwLjU3NjQ1IC0wLjQ2NzQ5LDEuMDQzNjkgLTEuMDQzOTQsMS4wNDM5NWgtNC44MTAyNmMtMC41NzYzNywtMC4wMDAyNiAtMS4wNDM0OSwtMC40Njc1NyAtMS4wNDM0OSwtMS4wNDM5NXYtNC44MDk4YzAuMDAwMjYsLTAuNTc2NDUgMC40Njc1LC0xLjA0MzY5IDEuMDQzOTUsLTEuMDQzOTRoNC44MTA3MWMwLjI3Njc4LDAgMC41NDIyMiwwLjExMDAxIDAuNzM3ODYsMC4zMDU4MXpNMjUzLjE2NzY2LDE3Ni4wNzY3MmMwLDAuMDE1NjUgLTAuMDAzNjcsMC4wMzA4MiAtMC4wMDQ2LDAuMDQ2NDd2NC43NjM3OWMwLjAwMDAxLDAuNTczOCAtMC40NjMyNiwxLjAzOTk0IC0xLjAzNzA1LDEuMDQzNDl2MC4wMDA5MmgtMTYuMjg3MjZ2LTAuMDAwNDVjLTAuNTczNzksLTAuMDAzNTQgLTEuMDM3MDYsLTAuNDY5NyAtMS4wMzcwNSwtMS4wNDM0OWgtMC4wMDUwNnYtNC43NTQ1OGMtMC4wMDA5MiwtMC4wMTg4NyAtMC4wMDU1MiwtMC4wMzYzNSAtMC4wMDU1MiwtMC4wNTU2OGMwLjAwMDI2LC0wLjU3NjQ1IDAuNDY3NSwtMS4wNDM2OSAxLjA0Mzk1LC0xLjA0Mzk0bDAuMDA0MTQsMC4wMDA0NnYtMC4wMDA0NmwxNi4yODcyNCwwLjAwMDQ2YzAuNTc1MzMsMC4wMDEwMiAxLjA0MTE4LDAuNDY3NyAxLjA0MTE4LDEuMDQzMDN6TTIyOS45MDM5MSwxNzUuMzM4MTNjMC4xOTU2NCwwLjE5NTggMC4zMDU0MSwwLjQ2MTM0IDAuMzA1MTcsMC43MzgxM3Y0LjgwOThjLTAuMDAwMjYsMC41NzY0NSAtMC40Njc0OSwxLjA0MzcgLTEuMDQzOTQsMS4wNDM5NWgtNC44MTAyNmMtMC41NzYzNywtMC4wMDAyNiAtMS4wNDM0OSwtMC40Njc1OCAtMS4wNDM0OSwtMS4wNDM5NXYtNC44MDk4YzAuMDAwMjYsLTAuNTc2NDUgMC40Njc1LC0xLjA0MzcgMS4wNDM5NSwtMS4wNDM5NWg0LjgxMDcxYzAuMjc2NzgsMCAwLjU0MjIyLDAuMTEwMDIgMC43Mzc4NiwwLjMwNTgyek0yMzQuNzk2MiwxNjkuNDI0NzJ2LTQuNzU1MDVjLTAuMDAwOTIsLTAuMDE4ODcgLTAuMDA1NTIsLTAuMDM2MzUgLTAuMDA1NTIsLTAuMDU1NjdjMC4wMDAyNiwtMC41NzY0NSAwLjQ2NzUsLTEuMDQzNjkgMS4wNDM5NSwtMS4wNDM5NWwwLjAwNDE0LDAuMDAwNDV2LTAuMDAwNDVoMTYuMjg3MjZ2MC4wMDA0NWMwLjU3NTQ3LDAuMDAxMjYgMS4wNDEzOSwwLjQ2ODAxIDEuMDQxNjUsMS4wNDM1YzAsMC4wMTU2NSAtMC4wMDM2NywwLjAzMDgzIC0wLjAwNDYsMC4wNDY0N3Y0Ljc2Mzc5YzAuMDAwMDEsMC41NzM4IC0wLjQ2MzI2LDEuMDM5OTQgLTEuMDM3MDUsMS4wNDM0OXYwLjAwMDkyaC0xNi4yODcyNnYtMC4wMDA0NmMtMC41NzM3OSwtMC4wMDM1NCAtMS4wMzcwNiwtMC40Njk2OSAtMS4wMzcwNSwtMS4wNDM0OWgtMC4wMDUwNnpNMjI5LjkwNDA1LDE2My44NzU3M2MwLjE5NTY2LDAuMTk1ODMgMC4zMDU0LDAuNDYxNDQgMC4zMDUwMywwLjczODI2djQuODA5OGMtMC4wMDAyNiwwLjU3NjQ1IC0wLjQ2NzQ5LDEuMDQzNjkgLTEuMDQzOTQsMS4wNDM5NWgtNC44MTAyNmMtMC41NzYzNywtMC4wMDAyNiAtMS4wNDM0OSwtMC40Njc1NyAtMS4wNDM0OSwtMS4wNDM5NXYtNC44MDk4YzAuMDAwMjYsLTAuNTc2NDUgMC40Njc1LC0xLjA0MzY5IDEuMDQzOTUsLTEuMDQzOTVoNC44MTA3MWMwLjI3NjgzLC0wLjAwMDEyIDAuNTQyMzQsMC4xMDk4NSAwLjczOCwwLjMwNTY4eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMjU1LjY5MDQxLDE4MS45OTEzYzAuNTIwODgsMC4wMDAyMyAwLjk0MzA5LDAuNDIyNDQgMC45NDMzMiwwLjk0MzMxdjQuMjQyNjJ2Ni4yMzM1OWgtNi4yMzM2bC00LjI0NDcxLC0wLjAwMDQxYy0wLjUyLC0wLjAwMTE1IC0wLjk0MSwtMC4zMzMwNCAtMC45NDEyMywtMC44NTMwNWMwLC0wLjAxNDE0IDAuMDA0MTYsLTQuNDM2NDEgMC4wMDQxNiwtNC40MzY0MWMtMC4wMDAwMSwtMC41MTg0OCAwLjQ2MzUzLC0wLjk4NDYzIDAuOTgyLC0wLjk4NzgzbDQuMTk5NzcsMC4wNDQxbDAuMDAwNDEsLTQuMjM4ODhjMC4wMDMyLC0wLjUxODQ3IDAuNDI0NDIsLTAuOTM3MDggMC45NDI5LC0wLjkzNzA3YzAsMCA0LjMyOTUxLC0wLjAwOTk3IDQuMzQ2OTcsLTAuMDA5OTd6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNmZjY2MWEiIHN0cm9rZS13aWR0aD0iNiIvPjxwYXRoIGQ9Ik0yNTUuNjkwNDEsMTgxLjk5MTNjMC41MjA4OCwwLjAwMDIzIDAuOTQzMDksMC40MjI0NCAwLjk0MzMyLDAuOTQzMzF2NC4yNDI2Mmw0LjIzODg3LDAuMDAwNDFjMC41MTg0NywwLjAwMzIgMC45MzcwOCwwLjQyNDQxIDAuOTM3MDgsMC45NDI4OWMwLDAgMC4wMDk5Nyw0LjMyOTUyIDAuMDA5OTcsNC4zNDY5N2MtMC4wMDAyMywwLjUyMDg4IC0wLjQyMjQzLDAuOTQzMDggLTAuOTQzMzEsMC45NDMzMWgtNC4yNDI2MWwtMC4wMDA0Miw0LjI0NDcxYy0wLjAwMTE1LDAuNTIgLTAuNDY3ODIsMC45NDEgLTAuOTg3ODIsMC45NDEyM2MtMC4wMTQxNCwwIC00LjI1NjcsLTAuMDA0MTYgLTQuMjU2NywtMC4wMDQxNmMtMC41MTg0OCwwLjAwMDAxIC0wLjk4NDYyLC0wLjQxODYgLTAuOTg3ODIsLTAuOTM3MDdsLTAuMDAwODMsLTQuMjQ0NzFsLTQuMjQ0NzEsLTAuMDAwNDFjLTAuNTIsLTAuMDAxMTUgLTAuOTQxLC0wLjMzMzA0IC0wLjk0MTIzLC0wLjg1MzA1YzAsLTAuMDE0MTQgMC4wMDQxNiwtNC40MzY0MSAwLjAwNDE2LC00LjQzNjQxYy0wLjAwMDAxLC0wLjUxODQ4IDAuNDYzNTMsLTAuOTg0NjMgMC45ODIwMSwtMC45ODc4M2w0LjE5OTc3LDAuMDQ0MWwwLjAwMDQxLC00LjIzODg4YzAuMDAzMiwtMC41MTg0NyAwLjQyNDQyLC0wLjkzNzA4IDAuOTQyOSwtMC45MzcwN2MwLDAgNC4zMjk1MSwtMC4wMDk5NyA0LjM0Njk3LC0wLjAwOTk3eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZmY2NjFhIiBzdHJva2Utd2lkdGg9IjAiLz48L2c+PC9nPjwvc3ZnPg==";

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const builtInFonts = [
    "Scratch", "Sans Serif", "Serif",
    "Handwriting", "Marker", "Curly", "Pixel"
  ];

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

  let listDocs;
  if (runtime.isPackaged) {
    listDocs = {
      body : "sc-monitor-root",
      value : "sc-monitor-row-value-outer", value2 : "sc-monitor-row-value-inner",
      ind : "sc-monitor-row-index",
      head : "sc-monitor-list-label", foot : "sc-monitor-list-footer-text",
      pkg1 : "", addButton : "sc-monitor-list-add",
      grid : ".sc-monitor-rows-inner", contain : ".sc-monitor-rows-inner",
      row : "sc-monitor-row-root", span : ""
    };
  } else {
    listDocs = {
      body : "monitor_list-monitor",
      value : "monitor_list-value", value2 : "monitor_value-inner",
      ind : "monitor_list-index",
      head : "monitor_list-header", foot : "monitor_footer-length_2",
      pkg1 : `[class*="monitor_"]`, addButton : "monitor_add-button",
      grid : ".ReactVirtualized__Grid.ReactVirtualized__List", contain : ".ReactVirtualized__Grid__innerScrollContainer",
      row : "monitor_list-row", span : "span"
    };
  }
  class SPlistMonitors {
    getInfo() {
      return {
        id: "SPlistMonitors",
        name: "Sty-Lists",
        color1: "#FF661A",
        color2: "#ba3e00",
        color3: "#cc4602",
        menuIconURI,
        blocks: [
          {
            opcode: "listExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "does [LIST] exist?",
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my list"
              },
            },
          },
          {
            opcode: "isShowing",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [LIST] showing?",
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists"
              },
            },
          },
          {
            opcode: "makeList",
            blockType: Scratch.BlockType.COMMAND,
            text: "create list named [LIST] [TYPE]",
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my list",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "listTypes",
              }
            },
          },
          "---",
          {
            opcode: "renderList",
            blockType: Scratch.BlockType.COMMAND,
            text: "render [LIST] with [NUM] columns",
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists"
              },
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
              },
            },
          },
          {
            opcode: "getColumns",
            blockType: Scratch.BlockType.REPORTER,
            text: "# of columns in [LIST]",
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists"
              },
            },
          },
          "---",
          {
            opcode: "stretchList",
            blockType: Scratch.BlockType.COMMAND,
            text: "stretch [LIST] to width: [WIDTH] and height: [HEIGHT]",
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists"
              },
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 200,
              },
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 200,
              },
            },
          },
          {
            opcode: "getAtt",
            blockType: Scratch.BlockType.REPORTER,
            text: "get [THING] of [LIST]",
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists"
              },
              THING: {
                type: Scratch.ArgumentType.STRING,
                menu: "ATTS",
              },
            },
          },
          "---",
          {
            opcode: "chooseOption",
            blockType: Scratch.BlockType.COMMAND,
            text: "turn [THING] in [LIST] [ON_OFF]",
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists"
              },
              THING: {
                type: Scratch.ArgumentType.STRING,
                menu: "listUtils",
              },
              ON_OFF: {
                type: Scratch.ArgumentType.STRING,
                menu: "ON_OFF",
              },
            },
          },
          {
            opcode: "formatItems",
            blockType: Scratch.BlockType.COMMAND,
            text: "align item text to [ALIGN] in [LIST]",
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists"
              },
              ALIGN: {
                type: Scratch.ArgumentType.STRING,
                menu: "ALIGN",
              },
            },
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: "<sep gap=\"6\"/><label text=\"Positioning\"/><sep gap=\"-12\"/><sep gap=\"12\"/>",
          },
          {
            opcode: "setPosition",
            blockType: Scratch.BlockType.COMMAND,
            text: "set position of [LIST] to x: [x] y: [y]",
            arguments: {
              x: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists"
              },
            },
          },
          {
            opcode: "currentPos",
            blockType: Scratch.BlockType.REPORTER,
            text: "current [POSITION] of [LIST]",
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists"
              },
              POSITION: {
                type: Scratch.ArgumentType.STRING,
                menu: "POSITIONS",
              },
            },
          },
          "---",
          {
            opcode: "setScroll",
            blockType: Scratch.BlockType.COMMAND,
            text: "set scrollbar position of [LIST] to [SCROLL]%",
            arguments: {
              SCROLL: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists"
              },
            },
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: "<sep gap=\"6\"/><label text=\"Effects\"/><sep gap=\"-12\"/><sep gap=\"12\"/>",
          },
          {
            opcode: "resetAll",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset all changes to [LIST]",
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists"
              },
            },
          },
          {
            opcode: "setDisplay",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [DISPLAY] name of [LIST] to [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my cooler list",
              },
              DISPLAY: {
                type: Scratch.ArgumentType.STRING,
                menu: "list_displays",
              },
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists"
              },
            },
          },
          {
            opcode: "setColor",
            blockType: Scratch.BlockType.COMMAND,
            text: "set color of item # [NUM] in [LIST] to [COLOR]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#0000ff",
              },
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists"
              },
            },
          },
          {
            opcode: "setLabel",
            blockType: Scratch.BlockType.COMMAND,
            text: "set name of label # [NUM] in [LIST] to [VALUE]",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "item 1",
              },
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists"
              },
            },
          },
          {
            opcode: "setFont",
            blockType: Scratch.BlockType.COMMAND,
            text: "set font of [LIST] to [FONT]",
            arguments: {
              FONT: {
                type: Scratch.ArgumentType.STRING,
                menu: "allFonts",
              },
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists"
              },
            },
          },
          "---",
          {
            opcode: "resetEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset effects of [LIST]",
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists"
              },
            },
          },
          {
            opcode: "setEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [EFFECT] of [LIST] to [AMOUNT]",
            arguments: {
              AMOUNT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5,
              },
              EFFECT: {
                type: Scratch.ArgumentType.STRING,
                menu: "EFFECTS",
              },
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists"
              },
            },
          },
          {
            opcode: "stretchEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "scale [LIST] to x: [x] y: [y]",
            arguments: {
              x: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 200,
              },
              y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists"
              },
            },
          },
          {
            opcode: "currentEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "current [EFFECT] of [LIST]",
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists"
              },
              EFFECT: {
                type: Scratch.ArgumentType.STRING,
                menu: "ALL_EFFECTS",
              },
            },
          }
        ],
        menus: {
          ATTS: {
            acceptReporters: true,
            items: ["width", "height"]
          },
          lists: {
            acceptReporters: true,
            items: "getLists"
          },
          allFonts: {
            acceptReporters: true,
            items: "getFonts"
          },
          POSITIONS: ["x", "y"],
          list_displays: ["header", "footer"],
          listTypes: ["globally", "for this sprite only"],
          listUtils: ["click events", "text highlighting", "numbered items", "+ and = buttons"],
          ON_OFF: ["on", "off"],
          ALIGN: {
            acceptReporters: true,
            items: ["left", "right", "center"]
          },
          EFFECTS: {
            acceptReporters: true,
            items: this.getEffects(false)
          },
          ALL_EFFECTS: {
            acceptReporters: true,
            items: this.getEffects(true)
          }
        }
      }
    }

    // Thank you SkyHigh173 for the getLists and find list functions :))
    getLists() {
      const globalLists = Object.values(
        vm.runtime.getTargetForStage().variables
      ).filter((x) => x.type == "list");
      const localLists = Object.values(vm.editingTarget.variables).filter(
        (x) => x.type == "list"
      );
      const uniqueLists = [...new Set([...globalLists, ...localLists])];
      if (uniqueLists.length === 0) return [{ text: "make a list", value: "make a list" }];
      return uniqueLists.map((i) => ({ text: i.name, value: i.id }));
    }

    lookForList(list, util) {
      const byId = util.target.lookupVariableById(list);
      if (byId && byId.type === "list") return JSON.stringify(byId.id);
      const byName = util.target.lookupVariableByNameAndType(list, "list");
      if (byName) return JSON.stringify(byName.id);
      return;
    }

    getFonts() {
      const customFonts = Scratch.vm.runtime.fontManager
        ? Scratch.vm.runtime.fontManager.getFonts().map((i) => ({
        text: i.name, value: i.family })) : [];
      return [...builtInFonts, ...customFonts];
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

    renderList(args, util) {
      let list = this.lookForList(args.LIST, util);
      if (!list) return;
      let footer = runtime.isPackaged ? document.querySelector(`[data-id=${list}] ${listDocs.grid}`) : "";
      args.NUM = args.NUM > 0 ? Math.round(args.NUM) : 1;
      const parentList = document.querySelector(`[data-id=${list}] ${listDocs.grid}`);
      if (parentList === null) return;
      let listWidth = parseFloat(parentList.style.width) || parentList.getBoundingClientRect().width / 2;
      listWidth = listWidth / args.NUM;
      list = document.querySelector(`[data-id=${list}] ${listDocs.contain}`);
      const itemsHTML = this.getListArray(args.LIST, util);
      if (itemsHTML[1] === 0 || list === null) return;
      const newContainer = document.createElement("div");
      newContainer.className = listDocs.contain;

      newContainer.setAttribute("role", "rowgroup");
      newContainer.style.width = "auto";
      newContainer.style.height = runtime.isPackaged && footer ? window.getComputedStyle(footer).height :
        `${((itemsHTML[1] * 24) / args.NUM) + 24}px`;
      newContainer.style.maxWidth = parentList.style.width;
      newContainer.style.maxHeight = list.style.maxHeight;
      newContainer.style.overflow = "scroll";
      newContainer.style.position = "relative";

      newContainer.innerHTML = itemsHTML[0];
      list.parentNode.replaceChild(newContainer, list);
      function reorderIntoColumns(numColumns) {
        const items = newContainer.querySelectorAll(`[class^="${listDocs.row}"]`);
        for (let i = 0; i < items.length; i++) {
          const column = i % numColumns;
          const top = Math.floor(i / numColumns) * items[0].offsetHeight;
          items[i].style.top = top + "px";
          items[i].style.left = (column * listWidth) + "px";
          items[i].style.width = 100 / numColumns + "%";
        }
      }
      reorderIntoColumns(args.NUM);
      parentList.scrollTop = 0;
    }

    getColumns(args, util) {
      let list = this.lookForList(args.LIST, util);
      if (!list) return 0;
      list = document.querySelectorAll(`[data-id=${list}]`);
      list = list[list.length - 1];
      list = list.querySelector(`[class^="${listDocs.contain}"]`);
      if (list === null) return 1;

      const items = Array.from(list.querySelectorAll(`[class^="${listDocs.row}"]`));
      if (items.length === 0) return 1;
      const firstItem = items[0];
      const itemWidth = parseFloat(firstItem.style.width);
      if (!isNaN(itemWidth) && itemWidth > 0) {
        const numColumns = 100 / itemWidth;
        return Math.round(numColumns);
      }
      return 1;
    }

    getListArray(list, util) {
      const items = util.target.lookupVariableById(list).value;
      let allItems = document.querySelectorAll(`[data-id="${list}"]`);
      allItems = allItems[allItems.length - 1];
      allItems = allItems.querySelectorAll(`[class^="${listDocs.ind}"`);
      let html = "";
      if (items.length === 0) return ["", 0];
      try {
        const elementClasses = {
          row : allItems[0].parentNode.className,
          index : allItems[0].className,
          outerV : allItems[0].nextElementSibling.className,
          innerV : allItems[0].nextElementSibling.children[0].className
        };
        for (let i = 0; i < items.length; i++) {
          const value = allItems[i] ? xmlEscape(allItems[i].textContent) : i + 1;
          html += `
            <div class="${elementClasses.row}" style="height: 24px; left: 0px; position: absolute; top: ${i * 24}px; width: 100%;">
              <div class="${elementClasses.index}">${value}</div>
              <div class="${elementClasses.outerV}" dataindex="${i}" style="background: rgb(252, 102, 44);">
                <div class="${elementClasses.innerV}">${xmlEscape(items[i])}</div>
              </div>
            </div>`;
        }
      } catch { return ["", 0] }
      return [html, items.length];
    }

    isShowing(args, util) {
      let list = this.lookForList(args.LIST, util);
      if (!list) return false;
      list = runtime.getMonitorState().get(args.LIST);
      if (!list) return false;
      return list.visible;
    }

    listExists(args, util) { return Scratch.Cast.toBoolean(this.lookForList(args.LIST, util)) }

    stretchList(args, util) {
      let list = this.lookForList(args.LIST, util);
      if (!list) return;
      args.WIDTH = Scratch.Cast.toNumber(args.WIDTH), args.HEIGHT = Scratch.Cast.toNumber(args.HEIGHT);
      args.WIDTH = args.WIDTH < 1 || args.WIDTH === Infinity ? 100 : args.WIDTH;
      args.HEIGHT = args.HEIGHT < 1 || args.HEIGHT === Infinity ? 200 : args.HEIGHT;

      runtime.requestUpdateMonitor(new Map([
        ["id", list.match(/"([^"]+)"/)[1]],
        ["width", args.WIDTH], ["height", args.HEIGHT]
      ]));
      list = document.querySelectorAll(`[data-id=${list}]`);
      list = list[list.length - 1];
      if (!list || (list && list.classList.contains("blocklyDraggable"))) return;
      if (!runtime.isPackaged) {
        list = list.querySelector(`[class^="${listDocs.body}"]`);
        list.style.cssText = `width: ${args.WIDTH}px; height: ${args.HEIGHT}px;`;
        let items = list.querySelector(listDocs.grid);
        if (items) items.style.cssText = `width: ${args.WIDTH}px;`;
        items = list.querySelector(listDocs.contain);
        if (items) items.style.cssText = `width: auto; height: ${Scratch.vm.runtime.stageHeight}px; max-width: ${args.WIDTH}px; max-height: ${Scratch.vm.runtime.stageHeight}px; overflow: hidden; position: relative;`;
      }
      this.renderList({"LIST":args.LIST, "NUM": this.getColumns(args, util)}, util);
    }

    getAtt(args, util) {
      let list = this.lookForList(args.LIST, util);
      if (!list) return "";
      list = document.querySelectorAll(`[data-id=${list}]`);
      list = list[list.length - 1];
      if (!list || (list && list.classList.contains("blocklyDraggable"))) return "";
      list = runtime.isPackaged ? list : list.querySelector(`[class^="${listDocs.body}"]`);
      return parseFloat(list.style[args.THING]);
    }

    chooseOption(args, util) {
      let list = this.lookForList(args.LIST, util);
      if (!list) return;
      list = document.querySelectorAll(`[data-id=${list}]`);
      list = list[list.length - 1];
      if (args.THING === "click events") {
        list.style.pointerEvents = args.ON_OFF === "off" ? "none" : "auto";
      } else if (args.THING === "text highlighting") {
        const items = list.querySelectorAll(`[class^="${listDocs.value2}"]`);
        items.forEach(item => {
          item.style.userSelect = args.ON_OFF === "off" ? "none " : "auto";
          item.style.webkitUserSelect = args.ON_OFF === "off" ? "none" : "auto"; //apple devices need this for some reason
        });
      } else if (args.THING === "numbered items") {
        const numberedItems = list.querySelectorAll(`[class^="${listDocs.ind}"]`);
        numberedItems.forEach(item => { item.style.display = args.ON_OFF === "off" ? "none" : "block" });
      } else {
        let button1 = list.querySelector(`[class^="${listDocs.addButton}"]`);
        let button2 = runtime.isPackaged ? button1 : list.querySelector(`[class^="monitor_resize-handle"]`);
        if (button1 === null || button2 === null) {
          const buttons = list.querySelectorAll(".no-drag");
          buttons.forEach(button => { button.style.display = args.ON_OFF === "off" ? "none" : "block" });
        } else {
          button1.style.display = args.ON_OFF === "off" ? "none" : "block";
          button2.style.display = args.ON_OFF === "off" ? "none" : "block";
        }
        let text = list.querySelector(`[class^="${listDocs.foot}"]`);
        text.style.margin = "0 auto";
      }
    }

    formatItems(args, util) {
      let list = this.lookForList(args.LIST, util);
      if (!list) return;
      list = document.querySelectorAll(`[data-id=${list}]`);
      list = list[list.length - 1];
      list = list.querySelector(listDocs.contain);
      if (list === null) return;
      const items = Array.from(list.querySelectorAll(`[class^="${listDocs.value}"]`));
      function reorder() {
        for (let i = 0; i < items.length; i++) {
          items[i].style.textAlign = args.ALIGN;
        }
      }
      reorder();
    }

    setPosition(args, util) {
      const canvas = [Scratch.vm.runtime.stageWidth / 2, Scratch.vm.runtime.stageHeight / 2];
      let list = this.lookForList(args.LIST, util);
      if (!list) return;
      list = document.querySelectorAll(`[data-id=${list}]`);
      list = list[list.length - 1];
      if (!list || (list && list.classList.contains("blocklyDraggable"))) return;

      const box = runtime.isPackaged ? list : list.querySelector(`[class^="${listDocs.body}"]`);
      const sizeOffset = [parseFloat(box.style.width), parseFloat(box.style.height)];
      let x = Scratch.Cast.toNumber(args.x) + canvas[0] - (sizeOffset[0] / 2);
      let y = (Scratch.Cast.toNumber(args.y) - canvas[1] + (sizeOffset[1] / 2)) * -1;

      let styleAttribute = list.getAttribute("style");
      const transformRegex = runtime.isPackaged ? /transform:([^;]+);/ : /transform:([^;]+); top:([^;]+); left:([^;]+);/;
      const transformMatch = styleAttribute.match(transformRegex);
      if (transformMatch) {
        const updatedTransform = transformMatch[1].replace(/translate\([^)]+\)/, `translate(${x}px, ${y}px)`);
        styleAttribute = styleAttribute.replace(transformRegex, `transform:${updatedTransform}; top: 5; left: 5;`);
        list.setAttribute("style", styleAttribute);
      }
    }

    currentPos(args, util) {
      const canvas = [Scratch.vm.runtime.stageWidth / 2, Scratch.vm.runtime.stageHeight / 2];
      let list = this.lookForList(args.LIST, util);
      if (!list) return "";
      list = document.querySelectorAll(`[data-id=${list}]`);
      list = list[list.length - 1];
      if (!list || (list && list.classList.contains("blocklyDraggable"))) return "";

      const box = runtime.isPackaged ? list : list.querySelector(`[class^="${listDocs.body}"]`);
      const sizeOffset = [parseFloat(box.style.width), parseFloat(box.style.height)];
      const styleAttribute = list.getAttribute("style");
      if (styleAttribute) {
        const match = styleAttribute.match(/transform\s*:\s*translate\((-?\d+(?:\.\d+)?px),\s*(-?\d+(?:\.\d+)?px)\)/);
        if (match) {
          if (args.POSITION === "x") return parseInt(match[1]) - canvas[0] + (sizeOffset[0] / 2);
          else return ((parseInt(match[2]) * -1) + canvas[1]) - (sizeOffset[1] / 2);
        }
      }
      return "";
    }

    setScroll(args, util) {
      let list = this.lookForList(args.LIST, util);
      if (!list) return;
      list = document.querySelector(`[data-id=${list}] ${listDocs.grid}`);
      if (list === null) return;
      const scroll = (args.SCROLL / 100) * (list.scrollHeight - list.clientHeight);
      list.scrollTop = scroll;
    }

    resetAll(args, util) {
      let list = this.lookForList(args.LIST, util);
      if (!list) return;
      return new Promise(resolve => {
        list = list.match(/"([^"]+)"/)[1];
        this.changeMonitorVisibility(list, false);
        setTimeout(() => {
          this.changeMonitorVisibility(list, true);
          setTimeout(() => { resolve() }, 1);
        }, 25);
      });
    }

    changeMonitorVisibility(id, visible) {
      runtime.monitorBlocks.changeBlock({
        id: id, element: "checkbox", value: visible
      }, runtime);
    }

    setDisplay(args, util) {
      let list = this.lookForList(args.LIST, util);
      if (!list) return;
      let label;
      if (args.DISPLAY === "header") {
        label = document.querySelector(`[data-id=${list}] ${listDocs.pkg1}[class^="${listDocs.head}"]`);
      } else {
        label = document.querySelector(`[data-id=${list}] ${listDocs.pkg1}[class^="${listDocs.foot}"] ${listDocs.span}`);
      }
      if (label) label.textContent = xmlEscape(args.NAME);
    }

    resetEffects(list, currentTransform) {
      const translationRegex = /translate\(([^,]+),\s*([^)]+)\)/;
      const matches = currentTransform.match(translationRegex);
      let translation = matches ? `translate(${matches[1]}, ${matches[2]})` : "";
      translation = translation.replace(/scale\([^,]+,\s*[^)]+\)/g, "scale(1)");
      list.style.filter = "";
      list.style.transform = translation;
    }

    setEffect(args, util) { this.listEffect(args.LIST, args.EFFECT, args.AMOUNT, util) }

    listEffect(LIST, EFFECT, AMOUNT, util) {
      let list = this.lookForList(LIST, util);
      if (!list) return;
      list = document.querySelectorAll(`[data-id=${list}]`);
      list = list[list.length - 1];
      let currentTransform = list.style.transform || "";
      let currentFilterEffect = list.style.filter || "";
      let setEffect = EFFECT;
      let amountIn = AMOUNT;
      if (setEffect === "saturation") setEffect = "saturate";
      else if (setEffect === "hue") setEffect = "hue-rotate";
      else if (setEffect === "direction") {
        setEffect = "rotate";
        amountIn = AMOUNT - 90;
      }
      else if (setEffect === "brightness") amountIn = AMOUNT + 100;
      else if (setEffect === "skew x") setEffect = "skewX";
      else if (setEffect === "skew y") setEffect = "skewY";
      const regex = new RegExp(`${setEffect}\\([^)]+\\)`, "g");
      currentTransform = currentTransform.replace(regex, "").trim();
      currentFilterEffect = currentFilterEffect.replace(regex, "").trim();
      if (setEffect === "rotate" || setEffect.includes("skew")) {
        currentTransform += ` ${setEffect}(${amountIn}deg)`;
        list.style.transform = currentTransform.trim();
      } else {
        currentFilterEffect += ` ${setEffect}(${amountIn}${setEffect === "blur" ? "px" : setEffect === "hue-rotate" ? "deg" : "%"})`;
        list.style.filter = currentFilterEffect.trim();
      }
    }

    stretchEffect(args, util) {
      let list = this.lookForList(args.LIST, util);
      if (!list) return;
      list = document.querySelectorAll(`[data-id=${list}]`);
      list = list[list.length - 1];
      if (!list || (list && list.classList.contains("blocklyDraggable"))) return;
      let existingTransform = list.style.transform || "";
      existingTransform = existingTransform.replace(/scale\([^)]*\)/g, "");
      list.style.transform = `${existingTransform} scale(${args.x / 100}, ${args.y / 100})`;
    }

    currentEffect(args, util) {
      let list = this.lookForList(args.LIST, util);
      if (!list) return "";
      list = document.querySelectorAll(`[data-id=${list}]`);
      list = list[list.length - 1];
      const currentTransform = list.style.transform || "";
      const currentFilterEffect = list.style.filter || "";
      const setEffect = {
        saturation: "saturate",
        hue: "hue-rotate", direction: "rotate",
        "scale x": "scale", "scale y": "scale",
        brightness: "brightness",
        opacity: "opacity",
        "skew x": "skewX", "skew y": "skewY",
      }[args.EFFECT] || args.EFFECT;
      const defaultV = {
        saturation: 100, hue: 0, direction: 90,
        "scale x": 100, "scale y": 100,
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
        else if (setEffect === "scale") {
          const arr = valueWithUnits.split(", ");
          return arr[args.EFFECT.includes("x") ? 0 : 1] * 100;
        } else { return numericValue }
      } else { return defaultV }
    }

    resetEffect(args, util) {
      let list = this.lookForList(args.LIST, util);
      if (!list) return;
      list = document.querySelectorAll(`[data-id=${list}]`);
      list = list[list.length - 1];
      let currentTransform = list.style.transform || "";
      this.resetEffects(list, currentTransform);
    }

    setFont(args, util) {
      let list = this.lookForList(args.LIST, util);
      if (!list) return;
      list = document.querySelectorAll(`[data-id=${list}]`);
      list = list[list.length - 1];
      list.style.fontFamily = args.FONT;
    }

    setColor(args, util) {
      let list = this.lookForList(args.LIST, util);
      if (!list) return;
      args.NUM = Math.abs(args.NUM);
      if (!args.COLOR.includes("gradient")) {
        args.COLOR = args.COLOR.replace(/^#/, "");
        const bigint = parseInt(args.COLOR, 16);
        args.COLOR = `rgb(${(bigint >> 16) & 255}, ${(bigint >> 8) & 255}, ${bigint & 255})`;
      }
      list = document.querySelectorAll(`[data-id=${list}]`);
      list = list[list.length - 1];
      const targetElement = list.querySelectorAll(`[class^="${listDocs.body}"] [class^="${listDocs.value}"]`)[args.NUM - 1];
      if (targetElement) targetElement.style.background = xmlEscape(args.COLOR);
    }

    setLabel(args, util) {
      let list = this.lookForList(args.LIST, util);
      if (!list) return;
      args.NUM = Math.abs(args.NUM);
      list = document.querySelectorAll(`[data-id=${list}]`);
      list = list[list.length - 1];
      const targetElement = list.querySelectorAll(`[class^="${listDocs.ind}"`)[args.NUM - 1];
      if (targetElement) targetElement.textContent = xmlEscape(args.VALUE);
    }

    makeList(args, util) {
      let list = this.lookForList(args.LIST, util);
      if (list) return;
      if (args.TYPE === "for this sprite only") {
        util.target.createVariable(this.generateId(), args.LIST, "list");
      } else {
        runtime.getTargetForStage().createVariable(this.generateId(), args.LIST, "list");
      }
      return this.refresh();
    }

    refresh() {
      if (!runtime.isPackaged) {
        Scratch.vm.emitWorkspaceUpdate();
        window.ScratchBlocks.getMainWorkspace().toolboxRefreshEnabled_ = true;
        window.ScratchBlocks.getMainWorkspace().refreshToolboxSelection_();
        window.ScratchBlocks.getMainWorkspace().toolboxRefreshEnabled_ = false;
        setTimeout(function() { vm.runtime.requestBlocksUpdate() }, 10);
      }
    }

    generateId() {
      const soup = "!#%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const id = [];
      for (let i = 0; i < 20; i++) {
        id[i] = soup.charAt(Math.random() * soup.length);
      }
      return id.join("");
    }
  }

  Scratch.extensions.register(new SPlistMonitors());
})(Scratch);
