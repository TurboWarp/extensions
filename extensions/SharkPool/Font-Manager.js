// Name: Font Manager
// ID: SPASfontManager
// Description: Add, delete, and manage fonts.
// By: SharkPool
// By: Ashimee <https://scratch.mit.edu/users/0znzw/>
// License: MIT

// Version V.1.1.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Font Manager must be run unsandboxed");
  }

  const extensionId = "SPASfontManager";
  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const storage = runtime.storage;
  const fontManager = runtime.fontManager;

  const FONT_EXTENSIONS = [
    storage.DataFormat.TTF,
    storage.DataFormat.OTF,
    storage.DataFormat.WOFF,
    storage.DataFormat.WOFF2,
  ];

  const menuIconURI =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMDIuMzMzMzQiIGhlaWdodD0iMTAyLjMzMzM0IiB2aWV3Qm94PSIwLDAsMTAyLjMzMzM0LDEwMi4zMzMzNCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4OC44MzUyMywtMTI4LjU2MDQ0KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xODguODM1MjMsMTc5LjcyNzExYzAsLTI4LjI1ODU3IDIyLjkwODEsLTUxLjE2NjY3IDUxLjE2NjY3LC01MS4xNjY2N2MyOC4yNTg1NywwIDUxLjE2NjY3LDIyLjkwODEgNTEuMTY2NjcsNTEuMTY2NjdjMCwyOC4yNTg1NyAtMjIuOTA4MSw1MS4xNjY2NyAtNTEuMTY2NjcsNTEuMTY2NjdjLTI4LjI1ODU3LDAgLTUxLjE2NjY3LC0yMi45MDgxIC01MS4xNjY2NywtNTEuMTY2Njd6IiBmaWxsPSIjMWM0ZTQ1IiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMTkzLjgxMTkyLDE3OS43MjcxMmMwLC0yNS41MTAwMiAyMC42Nzk5NSwtNDYuMTg5OTcgNDYuMTg5OTcsLTQ2LjE4OTk3YzI1LjUxMDAyLDAgNDYuMTg5OTcsMjAuNjc5OTUgNDYuMTg5OTcsNDYuMTg5OTdjMCwyNS41MTAwMiAtMjAuNjc5OTUsNDYuMTg5OTcgLTQ2LjE4OTk3LDQ2LjE4OTk3Yy0yNS41MTAwMiwwIC00Ni4xODk5NywtMjAuNjc5OTUgLTQ2LjE4OTk3LC00Ni4xODk5N3oiIGZpbGw9IiMyYjdkNmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yNTcuNDI2MTUsMTg3LjY2NzUxYzAsMi42OTA0OSAtMi4xODg4Myw0Ljg3OTMyIC00Ljg3OTMyLDQuODc5MzJjLTIuNjkwNDksMCAtNC44NzkzMiwtMi4xODg4MyAtNC44NzkzMiwtNC44NzkzMmMwLC0yLjY5MDQ5IDIuMTg4ODMsLTQuODc5MzIgNC44NzkzMiwtNC44NzkzMmMyLjY5MDQ5LDAgNC44NzkzMiwyLjE4ODgzIDQuODc5MzIsNC44NzkzMnoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yNjcuODgxODUsMTYzLjc0NjRjMCw2LjYzMDAxIDAsMzguNTU5MDggMCwzOC41NTkwOGMwLDIuMzA5NzIgLTEuODcyNTUsNC4xODIyOCAtNC4xODIyOCw0LjE4MjI4aC00Ny4zOTkxM2MtMi4zMDk3MiwwIC00LjE4MjI4LC0xLjg3MjU1IC00LjE4MjI4LC00LjE4MjI4YzAsMCAwLC00MC4yNTQ1IDAsLTQ2LjE3NDk2YzAsLTEuNDA5ODEgMS4zNDM5OSwtMi42MTgyNyAyLjUzMDAyLC0yLjYxODI3YzIuMTEwNzUsMCA5LjA2MzMyLDAgMTIuMzkxOTMsMGMxLjEwMjI5LDAgMi4zMTA2LDAuNTAzNDQgMi45ODcyMSwxLjE4MDA2YzEuMDgzODcsMS4wODM4NyAyLjYxMjExLDIuNjEyMSAzLjIyNzA3LDMuMjI3MDZjMC41MTQ0OSwwLjUxNDQ5IDEuODI5MDEsMS4xNjkyNSAyLjk1MDU4LDEuMTY5MjVjNS4zOTM3NSwwIDIxLjQ2NzgxLDAgMjYuMjAzNzcsMGMyLjUyOTkyLDAgNS40NzMxLDIuMzUzNDcgNS40NzMxLDQuNjU3Nzh6TTI0My45Mzc3OCwxOTUuNTc2MTljLTIuMDM3NTUsLTQuNTQzNzUgLTkuNDkxNTMsLTIxLjE2NjIyIC0xMS4zNTMzNSwtMjUuMzE4MTFjLTAuODEzMjUsLTEuODEzNTUgLTIuNDgyOTcsLTEuOTQxMDQgLTMuMjUyNTEsLTAuMjE2ODJjLTEuNzYxNTIsMy45NDY4NCAtOC44Mzg1LDE5LjgwMzQyIC0xMS4xNjU0MiwyNS4wMTcwOGMtMC40Njk1NSwxLjA1MjA3IC0wLjIxMTUyLDEuNjcwNzcgMC40NTYyMiwxLjY3MDc3YzAuODQ0MjIsMCAxLjkwMTk1LDAgMi4zNjM2NCwwYzAuNDQxMDYsMCAxLjIyOTk2LC0wLjQ4Mjc4IDEuNDQyMDksLTAuOTU4MDdjMC42MTY5NCwtMS4zODIyOCAzLjYxNjc4LC04LjEwMzUzIDMuNjE2NzgsLTguMTAzNTNoOS43NjI3OWMwLDAgMy4wODg4LDYuODg4MjkgMy42ODQ5Nyw4LjIxNzc5YzAuMTkxMDMsMC40MjYwMiAwLjg3MDQsMC44NDM4MSAxLjQ5MzM3LDAuODQzODFjMC43OTQxMywwIDEuODAxMDQsMCAyLjI3MjczLDBjMC41MDAwNSwwIDEuMDA3ODgsLTAuNDE4ODIgMC42Nzg2OSwtMS4xNTI5MnpNMjYwLjQ0MDkxLDE3OC42MDU5MWMtMC40NjM5MSwwIC0xLjQ2MTEsMCAtMi4xODE4MiwwYy0wLjQ3NzAzLDAgLTAuODMyOTQsMC41NjM4MiAtMC44MzI5NCwwLjgxNjgyYzAsMC4yMTk1NCAwLDAuNjE1MDYgMCwwLjYxNTA2Yy0xLjQwOTU2LC0wLjkwNDc0IC0zLjA4MzU2LC0xLjQzMTg4IC00Ljg3OTMyLC0xLjQzMTg4Yy00Ljk5NjYyLDAgLTkuMDYxNiw0LjA2NTA4IC05LjA2MTYsOS4wNjE2YzAsNC45OTY2MiA0LjA2NDk4LDkuMDYxNiA5LjA2MTYsOS4wNjE2YzEuNzk1NzYsMCAzLjQ2OTc2LC0wLjUyNzE0IDQuODc5MzIsLTEuNDMyYzAsMCAwLDAuMzY4MjYgMCwwLjU4MDE2YzAsMC4yNTY3NiAwLjM1NDYsMC44NTE4NCAwLjgzMjk0LDAuODUxODRjMC43NTAwMiwwIDEuODA0MjQsMCAyLjI3MjczLDBjMC40NTE3NiwwIDEuMDc2NjEsLTAuNzE3MTkgMS4wNzY2MSwtMS44NTE4NGMwLC0zLjY4NjggMCwtMTEuNzgxMDUgMCwtMTRjMCwtMS4wOTg0NCAtMC42ODc3NCwtMi4yNzEzNiAtMS4xNjc1MiwtMi4yNzEzNnoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yMzIuOTc3OTEsMTgzLjQ4NTIzYy0wLjcwOTExLDAgLTIuODcxOTMsMCAtNC4xMzA2NCwwYy0wLjU1NTk4LDAgLTAuNzA3MjYsLTAuNTExNTUgLTAuMzg5NTMsLTEuMjIzNDNjMC41NjUzNywtMS4yNjY3NCAxLjQxMzg1LC0zLjE2Nzg0IDEuNzYyODcsLTMuOTQ5ODVjMC4yOTg5NywtMC42Njk4NiAxLjEzNzkxLC0wLjU2Njc3IDEuNDYwNDgsMC4xNTI1NmMwLjM2NTE0LDAuODE0MjUgMS4yMjk3LDIuNzQyMjEgMS43NzQ5NSwzLjk1ODExYzAuMjgwNTEsMC42MjU1NCAtMC4wMzQzNCwxLjA2MjYxIC0wLjQ3ODEzLDEuMDYyNjF6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48ZyBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXdlaWdodD0ibm9ybWFsIiBmb250LXNpemU9IjEyIiB0ZXh0LWFuY2hvcj0ic3RhcnQiLz48ZyBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXdlaWdodD0ibm9ybWFsIiBmb250LXNpemU9IjEyIiB0ZXh0LWFuY2hvcj0ic3RhcnQiLz48ZyBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXdlaWdodD0ibm9ybWFsIiBmb250LXNpemU9IjEyIiB0ZXh0LWFuY2hvcj0ic3RhcnQiLz48cGF0aCBkPSJNMjM2LjI4NDgyLDE1Ni4yNzQzYzAsMCAxLjM0Mzk4LC0yLjYxODI3IDIuNTMwMDIsLTIuNjE4MjdjMi4xMTA3NSwwIDkuMDYzMzIsMCAxMi4zOTE5MywwYzEuMTAyMjksMCAyLjMxMDYsMC41MDM0NCAyLjk4NzIxLDEuMTgwMDZjMS4wODM4NywxLjA4Mzg3IDEuOTk4MTQsMS40NzQ4MSAwLjgxNDY3LDEuNDcyNjNjLTMuMjk3MDcsLTAuMDA2MDYgLTE4LjcyMzgzLC0wLjAzNDQyIC0xOC43MjM4MywtMC4wMzQ0MnoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9IiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iIiBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSIiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9IiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvZz48L3N2Zz4=";

  class SPASfontManager {
    constructor() {
      /** @type {string[]} */
      this.oldFonts = [];

      /** @type {string[]} */
      this.addedFonts = [];

      /** @type {string[]} */
      this.removedFonts = [];

      fontManager.on("change", () => {
        this._onchange();
      });
    }

    getInfo() {
      return {
        id: extensionId,
        name: Scratch.translate("Font Manager"),
        color1: "#2b7d6e",
        color2: "#24675b",
        color3: "#1c4e45",
        menuIconURI,
        blocks: [
          {
            opcode: "fontNames",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("all custom fonts"),
            disableMonitor: true,
          },
          {
            opcode: "fontAdded",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("font [NAME] added?"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Comic Sans MS",
              },
            },
          },
          {
            opcode: "fontDetail",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[DATA] of font [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Comic Sans MS",
              },
              DATA: {
                type: Scratch.ArgumentType.STRING,
                menu: "DATA",
              },
            },
          },
          "---",
          {
            opcode: "addSystemFont",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "add system font named [NAME] with fallback [BACKUP]"
            ),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Comic Sans MS",
              },
              BACKUP: {
                type: Scratch.ArgumentType.STRING,
                menu: "FALLBACKS",
              },
            },
          },
          {
            opcode: "addCustomFont",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "add font named [NAME] with fallback [BACKUP] from URL [URL]"
            ),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Pusab",
              },
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              BACKUP: {
                type: Scratch.ArgumentType.STRING,
                menu: "FALLBACKS",
              },
            },
          },
          {
            opcode: "removeFont",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("remove font [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Comic Sans MS",
              },
            },
          },
          {
            opcode: "removeAllFonts",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("remove all fonts"),
          },
          "---",
          {
            opcode: "whenFont",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when font is [ADDED]"),
            isEdgeActivated: false,
            arguments: {
              ADDED: {
                type: Scratch.ArgumentType.STRING,
                menu: "ADDED_FIELD",
              },
            },
          },
          {
            disableMonitor: true,
            opcode: "fontsChanged",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[ADDED] fonts"),
            arguments: {
              ADDED: {
                type: Scratch.ArgumentType.STRING,
                menu: "ADDED_INPUT",
              },
            },
          },
        ],
        menus: {
          DATA: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("fallback"),
                value: "fallback",
              },
              {
                text: Scratch.translate("is system"),
                value: "is system",
              },
              {
                text: Scratch.translate("data: uri"),
                value: "data: uri",
              },
              {
                text: Scratch.translate("format"),
                value: "format",
              },
            ],
          },
          ADDED_FIELD: {
            acceptReporters: false,
            items: [
              {
                text: Scratch.translate({
                  default: "added",
                  id: "added_field_added",
                  description: "Used in the context 'when font is added', an event block"
                }),
                value: "added",
              },
              {
                text: Scratch.translate({
                  default: "removed",
                  id: "added_field_removed",
                  description: "Used in the context 'when font is removed', an event block"
                }),
                value: "removed",
              },
            ],
          },
          ADDED_INPUT: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate({
                  default: "added",
                  id: "added_input_added",
                  description: "Used in the context 'added fonts' for a block that reports a list of fonts that were just added"
                }),
                value: "added",
              },
              {
                text: Scratch.translate({
                  default: "removed",
                  id: "added_input_removed",
                  description: "Used in the context 'removed fonts' for a block that reports a list of fonts that were just removed"
                }),
                value: "removed",
              },
            ],
          },
          FALLBACKS: [
            "Sans Serif",
            "Serif",
            "Handwriting",
            "Marker",
            "Curly",
            "Pixel",
            "Scratch",
          ],
          FILES: {
            acceptReporters: true,
            items: FONT_EXTENSIONS.map((i) => `.${i}`),
          },
        },
      };
    }

    fontNames() {
      return JSON.stringify(fontManager.fonts.map((i) => i.family));
    }

    fontAdded(args) {
      return fontManager.hasFont(Scratch.Cast.toString(args.NAME));
    }

    fontDetail(args) {
      const name = Scratch.Cast.toString(args.NAME);
      const font = fontManager.fonts.find((item) => item.family === name);
      if (!font) return "";
      switch (Scratch.Cast.toString(args.DATA)) {
        case "is system":
          return font.system;
        case "data: uri":
          return font.asset ? font.asset.encodeDataURI() : "";
        case "format":
          return font.asset ? font.asset.dataFormat : "";
        case "fallback":
          return font.fallback;
      }
      return "";
    }

    addSystemFont(args) {
      const name = Scratch.Cast.toString(args.NAME);
      if (fontManager.isValidFamily(name)) {
        fontManager.addSystemFont(name, Scratch.Cast.toString(args.BACKUP));
      }
    }

    async addCustomFont(args) {
      const name = Scratch.Cast.toString(args.NAME);
      if (!fontManager.isValidFamily(name)) {
        return;
      }

      try {
        const response = await Scratch.fetch(Scratch.Cast.toString(args.URL));
        const arrayBuffer = await response.arrayBuffer();
        const uint8array = new Uint8Array(arrayBuffer);

        // font files should have a content-type of font/ttf, font/otf, etc.
        // if we can't detect it, we'll just assume it's ttf, browser can figure it out anyways
        const contentType = (
          response.headers.get("content-type") || ""
        ).toLowerCase();
        let dataFormat = vm.runtime.storage.DataFormat.TTF;
        for (const extension of FONT_EXTENSIONS) {
          if (contentType === `font/${extension}`) {
            dataFormat = extension;
            break;
          }
        }

        const asset = vm.runtime.storage.createAsset(
          vm.runtime.storage.AssetType.Font,
          dataFormat,
          uint8array,
          null,
          true
        );
        fontManager.addCustomFont(
          name,
          Scratch.Cast.toString(args.BACKUP),
          asset
        );
      } catch (e) {
        console.warn(e);
      }
    }

    removeFont(args) {
      const name = args.NAME;
      const index = fontManager.fonts.findIndex(
        (i) => i.family === Scratch.Cast.toString(name)
      );
      if (index !== -1) {
        fontManager.deleteFont(index);
      }
    }

    removeAllFonts() {
      fontManager.clear();
    }

    fontsChanged(args, util) {
      const added = Scratch.Cast.toString(args.ADDED);
      if (added === "added") {
        return JSON.stringify(this.addedFonts);
      } else if (added === "removed") {
        return JSON.stringify(this.removedFonts);
      } else {
        return "";
      }
    }

    _onchange() {
      this.removedFonts = [];
      this.addedFonts = [];
      for (const family of this.oldFonts) {
        if (!fontManager.hasFont(family)) {
          this.removedFonts.push(family);
        }
      }
      for (const { family } of fontManager.fonts) {
        if (!this.oldFonts.includes(family)) {
          this.addedFonts.push(family);
        }
      }
      this.oldFonts = fontManager.fonts.map((i) => i.family);

      if (this.addedFonts.length) {
        Scratch.vm.runtime.startHats(`${extensionId}_whenFont`, {
          ADDED: "added",
        });
      }
      if (this.removedFonts.length) {
        Scratch.vm.runtime.startHats(`${extensionId}_whenFont`, {
          ADDED: "removed",
        });
      }
    }
  }

  Scratch.extensions.register(new SPASfontManager());
})(Scratch);
