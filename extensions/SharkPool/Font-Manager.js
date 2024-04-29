// Name: Font Manager
// ID: SPASfontManager
// Description: Add, Delete, and Manage Fonts
// By: SharkPool
// By: Ashimee <https://scratch.mit.edu/users/0znzw/>

// Version V.1.1.0

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Font Manager must be run unsandboxed");

  const extensionId = "SPASfontManager";
  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMDIuMzMzMzQiIGhlaWdodD0iMTAyLjMzMzM0IiB2aWV3Qm94PSIwLDAsMTAyLjMzMzM0LDEwMi4zMzMzNCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4OC44MzUyMywtMTI4LjU2MDQ0KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xODguODM1MjMsMTc5LjcyNzExYzAsLTI4LjI1ODU3IDIyLjkwODEsLTUxLjE2NjY3IDUxLjE2NjY3LC01MS4xNjY2N2MyOC4yNTg1NywwIDUxLjE2NjY3LDIyLjkwODEgNTEuMTY2NjcsNTEuMTY2NjdjMCwyOC4yNTg1NyAtMjIuOTA4MSw1MS4xNjY2NyAtNTEuMTY2NjcsNTEuMTY2NjdjLTI4LjI1ODU3LDAgLTUxLjE2NjY3LC0yMi45MDgxIC01MS4xNjY2NywtNTEuMTY2Njd6IiBmaWxsPSIjMWM0ZTQ1IiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMTkzLjgxMTkyLDE3OS43MjcxMmMwLC0yNS41MTAwMiAyMC42Nzk5NSwtNDYuMTg5OTcgNDYuMTg5OTcsLTQ2LjE4OTk3YzI1LjUxMDAyLDAgNDYuMTg5OTcsMjAuNjc5OTUgNDYuMTg5OTcsNDYuMTg5OTdjMCwyNS41MTAwMiAtMjAuNjc5OTUsNDYuMTg5OTcgLTQ2LjE4OTk3LDQ2LjE4OTk3Yy0yNS41MTAwMiwwIC00Ni4xODk5NywtMjAuNjc5OTUgLTQ2LjE4OTk3LC00Ni4xODk5N3oiIGZpbGw9IiMyYjdkNmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yNTcuNDI2MTUsMTg3LjY2NzUxYzAsMi42OTA0OSAtMi4xODg4Myw0Ljg3OTMyIC00Ljg3OTMyLDQuODc5MzJjLTIuNjkwNDksMCAtNC44NzkzMiwtMi4xODg4MyAtNC44NzkzMiwtNC44NzkzMmMwLC0yLjY5MDQ5IDIuMTg4ODMsLTQuODc5MzIgNC44NzkzMiwtNC44NzkzMmMyLjY5MDQ5LDAgNC44NzkzMiwyLjE4ODgzIDQuODc5MzIsNC44NzkzMnoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yNjcuODgxODUsMTYzLjc0NjRjMCw2LjYzMDAxIDAsMzguNTU5MDggMCwzOC41NTkwOGMwLDIuMzA5NzIgLTEuODcyNTUsNC4xODIyOCAtNC4xODIyOCw0LjE4MjI4aC00Ny4zOTkxM2MtMi4zMDk3MiwwIC00LjE4MjI4LC0xLjg3MjU1IC00LjE4MjI4LC00LjE4MjI4YzAsMCAwLC00MC4yNTQ1IDAsLTQ2LjE3NDk2YzAsLTEuNDA5ODEgMS4zNDM5OSwtMi42MTgyNyAyLjUzMDAyLC0yLjYxODI3YzIuMTEwNzUsMCA5LjA2MzMyLDAgMTIuMzkxOTMsMGMxLjEwMjI5LDAgMi4zMTA2LDAuNTAzNDQgMi45ODcyMSwxLjE4MDA2YzEuMDgzODcsMS4wODM4NyAyLjYxMjExLDIuNjEyMSAzLjIyNzA3LDMuMjI3MDZjMC41MTQ0OSwwLjUxNDQ5IDEuODI5MDEsMS4xNjkyNSAyLjk1MDU4LDEuMTY5MjVjNS4zOTM3NSwwIDIxLjQ2NzgxLDAgMjYuMjAzNzcsMGMyLjUyOTkyLDAgNS40NzMxLDIuMzUzNDcgNS40NzMxLDQuNjU3Nzh6TTI0My45Mzc3OCwxOTUuNTc2MTljLTIuMDM3NTUsLTQuNTQzNzUgLTkuNDkxNTMsLTIxLjE2NjIyIC0xMS4zNTMzNSwtMjUuMzE4MTFjLTAuODEzMjUsLTEuODEzNTUgLTIuNDgyOTcsLTEuOTQxMDQgLTMuMjUyNTEsLTAuMjE2ODJjLTEuNzYxNTIsMy45NDY4NCAtOC44Mzg1LDE5LjgwMzQyIC0xMS4xNjU0MiwyNS4wMTcwOGMtMC40Njk1NSwxLjA1MjA3IC0wLjIxMTUyLDEuNjcwNzcgMC40NTYyMiwxLjY3MDc3YzAuODQ0MjIsMCAxLjkwMTk1LDAgMi4zNjM2NCwwYzAuNDQxMDYsMCAxLjIyOTk2LC0wLjQ4Mjc4IDEuNDQyMDksLTAuOTU4MDdjMC42MTY5NCwtMS4zODIyOCAzLjYxNjc4LC04LjEwMzUzIDMuNjE2NzgsLTguMTAzNTNoOS43NjI3OWMwLDAgMy4wODg4LDYuODg4MjkgMy42ODQ5Nyw4LjIxNzc5YzAuMTkxMDMsMC40MjYwMiAwLjg3MDQsMC44NDM4MSAxLjQ5MzM3LDAuODQzODFjMC43OTQxMywwIDEuODAxMDQsMCAyLjI3MjczLDBjMC41MDAwNSwwIDEuMDA3ODgsLTAuNDE4ODIgMC42Nzg2OSwtMS4xNTI5MnpNMjYwLjQ0MDkxLDE3OC42MDU5MWMtMC40NjM5MSwwIC0xLjQ2MTEsMCAtMi4xODE4MiwwYy0wLjQ3NzAzLDAgLTAuODMyOTQsMC41NjM4MiAtMC44MzI5NCwwLjgxNjgyYzAsMC4yMTk1NCAwLDAuNjE1MDYgMCwwLjYxNTA2Yy0xLjQwOTU2LC0wLjkwNDc0IC0zLjA4MzU2LC0xLjQzMTg4IC00Ljg3OTMyLC0xLjQzMTg4Yy00Ljk5NjYyLDAgLTkuMDYxNiw0LjA2NTA4IC05LjA2MTYsOS4wNjE2YzAsNC45OTY2MiA0LjA2NDk4LDkuMDYxNiA5LjA2MTYsOS4wNjE2YzEuNzk1NzYsMCAzLjQ2OTc2LC0wLjUyNzE0IDQuODc5MzIsLTEuNDMyYzAsMCAwLDAuMzY4MjYgMCwwLjU4MDE2YzAsMC4yNTY3NiAwLjM1NDYsMC44NTE4NCAwLjgzMjk0LDAuODUxODRjMC43NTAwMiwwIDEuODA0MjQsMCAyLjI3MjczLDBjMC40NTE3NiwwIDEuMDc2NjEsLTAuNzE3MTkgMS4wNzY2MSwtMS44NTE4NGMwLC0zLjY4NjggMCwtMTEuNzgxMDUgMCwtMTRjMCwtMS4wOTg0NCAtMC42ODc3NCwtMi4yNzEzNiAtMS4xNjc1MiwtMi4yNzEzNnoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yMzIuOTc3OTEsMTgzLjQ4NTIzYy0wLjcwOTExLDAgLTIuODcxOTMsMCAtNC4xMzA2NCwwYy0wLjU1NTk4LDAgLTAuNzA3MjYsLTAuNTExNTUgLTAuMzg5NTMsLTEuMjIzNDNjMC41NjUzNywtMS4yNjY3NCAxLjQxMzg1LC0zLjE2Nzg0IDEuNzYyODcsLTMuOTQ5ODVjMC4yOTg5NywtMC42Njk4NiAxLjEzNzkxLC0wLjU2Njc3IDEuNDYwNDgsMC4xNTI1NmMwLjM2NTE0LDAuODE0MjUgMS4yMjk3LDIuNzQyMjEgMS43NzQ5NSwzLjk1ODExYzAuMjgwNTEsMC42MjU1NCAtMC4wMzQzNCwxLjA2MjYxIC0wLjQ3ODEzLDEuMDYyNjF6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48ZyBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXdlaWdodD0ibm9ybWFsIiBmb250LXNpemU9IjEyIiB0ZXh0LWFuY2hvcj0ic3RhcnQiLz48ZyBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXdlaWdodD0ibm9ybWFsIiBmb250LXNpemU9IjEyIiB0ZXh0LWFuY2hvcj0ic3RhcnQiLz48ZyBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXdlaWdodD0ibm9ybWFsIiBmb250LXNpemU9IjEyIiB0ZXh0LWFuY2hvcj0ic3RhcnQiLz48cGF0aCBkPSJNMjM2LjI4NDgyLDE1Ni4yNzQzYzAsMCAxLjM0Mzk4LC0yLjYxODI3IDIuNTMwMDIsLTIuNjE4MjdjMi4xMTA3NSwwIDkuMDYzMzIsMCAxMi4zOTE5MywwYzEuMTAyMjksMCAyLjMxMDYsMC41MDM0NCAyLjk4NzIxLDEuMTgwMDZjMS4wODM4NywxLjA4Mzg3IDEuOTk4MTQsMS40NzQ4MSAwLjgxNDY3LDEuNDcyNjNjLTMuMjk3MDcsLTAuMDA2MDYgLTE4LjcyMzgzLC0wLjAzNDQyIC0xOC43MjM4MywtMC4wMzQ0MnoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9IiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iIiBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSIiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9IiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvZz48L3N2Zz4=";

  const manage = runtime.fontManager;
  let oldFonts = [];
  const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

  /**
   * Construct an Asset.
   * @param {AssetType} assetType - The type of this asset (sound, image, etc.)
   * @param {string} assetId - The ID of this asset.
   * @param {DataFormat} [dataFormat] - The format of the data (WAV, PNG, etc.); required iff `data` is present.
   * @param {Buffer} [data] - The in-memory data for this asset; optional.
   * @param {bool} [generateId] - Whether to create id from an md5 hash of data
   * (This is done for the possibility of extending the class).
   */
  class Asset extends (vm.assets[0] ? vm.assets[0].constructor : Object) {
    constructor(assetType, assetId, dataFormat, data, generateId) {
      super(assetType, assetId, dataFormat, data, generateId);
    }
  }

  // wait until vm.assets[0] exists
  function waitForAssets() {
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        if (vm.assets[0]) {
          clearInterval(intervalId);
          resolve();
        }
      }, 100);
    });
  }
  waitForAssets();

  class SPASfontManager {
    constructor() {
      this.difference = { cleared: true };
      manage.on("change", () => { this.onChanged() });
    }
    getInfo() {
      return {
        id: extensionId,
        name: "Font Manager",
        color1: "#2b7d6e",
        color2: "#24675b",
        color3: "#1c4e45",
        menuIconURI,
        blocks: [
          {
            opcode: "customFonts",
            blockType: Scratch.BlockType.REPORTER,
            hideFromPalette: true,
            text: "added font data"
          },
          {
            opcode: "customFontAtts",
            blockType: Scratch.BlockType.REPORTER,
            text: "added font [THING]",
            disableMonitor: true,
            arguments: {
              THING: { type: Scratch.ArgumentType.STRING, menu: "INFO" }
            }
          },
          {
            opcode: "fontExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "font [NAME] exists?",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "Comic Sans MS" }
            }
          },
          {
            opcode: "data4Font",
            blockType: Scratch.BlockType.REPORTER,
            text: "[DATA] of font [NAME]",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "Comic Sans MS" },
              DATA: { type: Scratch.ArgumentType.STRING, menu: "DATA" }
            }
          },
          "---",
          {
            opcode: "addSystemFont",
            blockType: Scratch.BlockType.COMMAND,
            text: "add system font named [NAME] with fallback [BACKUP]",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "Comic Sans MS" },
              BACKUP: { type: Scratch.ArgumentType.STRING, menu: "FALLBACKS" }
            }
          },
          {
            opcode: "addCustomFont",
            blockType: Scratch.BlockType.COMMAND,
            text: "add custom font named [NAME] with fallback [BACKUP] font data.uri [DATA] file type [FILE]",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "Pusab" },
              DATA: { type: Scratch.ArgumentType.STRING, defaultValue: ".ttf, .otf, .woff, .woff2" },
              FILE: { type: Scratch.ArgumentType.STRING, menu: "FILES" },
              BACKUP: { type: Scratch.ArgumentType.STRING, menu: "FALLBACKS" }
            }
          },
          {
            opcode: "deleteFont",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete font [NAME]",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "Comic Sans MS" }
            }
          },
          {
            opcode: "deleteAllFonts",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete all fonts"
          },
          "---",
          {
            opcode: "whenFont",
            blockType: Scratch.BlockType.EVENT,
            text: "when font is [ATT]",
            isEdgeActivated: false,
            arguments: {
              ATT: { type: Scratch.ArgumentType.STRING, menu: "ATT" }
            }
          },
          {
            disableMonitor: true,
            opcode: "fontsChanged",
            blockType: Scratch.BlockType.REPORTER,
            text: "[ATT] fonts",
            arguments: {
              ATT: { type: Scratch.ArgumentType.STRING, menu: "ATT" }
            }
          },
        ],
        menus: {
          INFO: ["names", "fallbacks", "data"],
          DATA: {
            acceptReporters: true,
            items: ["fallback", "is system", "data.uri", "format"]
          },
          ATT: {
            acceptReporters: false,
            items: ["added", "removed"]
          },
          FALLBACKS: [
            "Scratch", "Sans Serif", "Serif", "Handwriting",
            "Marker", "Curly", "Pixel"
          ],
          FILES: {
            acceptReporters: true,
            items: "fontsMenu"
          }
        },
      };
    }

    fontsMenu() { return [".ttf", ".otf", ".woff", ".woff2"] }

    async dataUrlToArrBuff(dataURL) {
      const data = await Scratch.fetch(dataURL);
      return (await data.arrayBuffer());
    }

    genID(len) {
      // https://github.com/TurboWarp/scratch-vm/blob/develop/src/util/uid.js
      const soup = "!#%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const id = [];
      for (let i = 0; i < len; i++) {
        id[i] = soup.charAt(Math.random() * soup.length);
      }
      return id.join("");
    }

    async createFont(fontType, name, dataURL, uid) {
      const fontAsset = new Asset({
        contentType: "application/octet-stream", runtimeFormat: fontType,
        name, immutable: true
      }, (uid ?? this.genID(20)), fontType, new Uint8Array(await this.dataUrlToArrBuff(dataURL)), true);
      return fontAsset;
    }
    
    fontNames(fontsArray) { return structuredClone(fontsArray.map(font => font.family)) }

    // ^ internal functions (Thank you <https://github.com/Ashimee> <3)
    // Ashimee also made the event block

    cast(args, func) {
      let obj = args;
      for (let key in obj) {
        if (hasOwn(obj, key)) obj[key] = Scratch.Cast[`to${(func ?? "String")}`](obj[key]);
      }
      return obj;
    }

    customFonts() { return JSON.stringify(manage.fonts) }

    customFontAtts(args) {
      if (args.THING === "data") return JSON.stringify(manage.fonts);
      let ogArray = manage.fonts;
      let newArray = [];
      for (let i = 0; i < ogArray.length; i++) {
        newArray[i] = ogArray[i][args.THING === "names" ? "family" : "fallback"];
      }
      return JSON.stringify(newArray);
    }

    fontExists(args) { return manage.hasFont(Scratch.Cast.toString(args.NAME)) }

    data4Font(args) {
      args = this.cast(args);
      const font = manage.fonts.find(item => item.family === args.NAME);
      if (font === undefined) return "";
      // Packaging Doesnt remove Font Assets, no need to check (good!)
      switch (args.DATA) {
        case "is system": return font.system;
        case "data.uri": return font.asset ? font.asset.encodeDataURI() : "";
        case "format": return font.asset ? font.asset.dataFormat : "";
        default: return font.fallback;
      }
    }

    addSystemFont(args) {
      args = this.cast(args);
      oldFonts = structuredClone(manage.fonts);
      if (manage.isValidFamily(args.NAME)) manage.addSystemFont(args.NAME, args.BACKUP);
    }

    async addCustomFont(args) {
      args = this.cast(args);
      if (!args.DATA.startsWith("data:")) return;
      if (!this.fontsMenu().includes(args.FILE)) return;
      oldFonts = structuredClone(manage.fonts);
      const myFont = await this.createFont(args.FILE.replace(".", ""), args.NAME, args.DATA);
      manage.addCustomFont(args.NAME, args.BACKUP, myFont);
    }

    deleteFont(args) {
      const names = this.customFontAtts({ THING : "names" });
      const index = names.indexOf(Scratch.Cast.toString(args.NAME));
      oldFonts = structuredClone(manage.fonts);
      if (index > -1) manage.deleteFont(this.customFonts()[index]);
    }

    deleteAllFonts() {
      oldFonts = structuredClone(manage.fonts);
      manage.clear();
    }

    fontsChanged(args, util) {
      args = this.cast(args);
      const difference = util.thread.fontDifference;
      if (!difference) return "[]";
      if (args.ATT == "clear") return JSON.stringify(difference.oldFontNames);
      if (difference.added && args.ATT.toLowerCase() === "removed") return;
      return JSON.stringify(difference.dif);
    }

    onChanged() {
      const oldFontNames = this.fontNames(oldFonts), fontNames = this.fontNames(structuredClone(manage.fonts));
      const added = oldFontNames.length < fontNames.length;
      const difference = {
        oldFonts: oldFontNames, added
      };
      if (added) difference.dif = fontNames.filter(fontName => !oldFontNames.includes(fontName));
        else difference.dif = oldFontNames.filter(fontName => !fontNames.includes(fontName));
      const threads = runtime.startHats(`${extensionId}_whenFont`, {
        ATT: (added ? "added" : "removed")
      });
      threads.forEach(thread => thread.fontDifference = difference);
      oldFonts = null;
      oldFonts = [];
    }
  }

  Scratch.extensions.register(new SPASfontManager());
})(Scratch);
