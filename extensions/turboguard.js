// Name: TurboGuard
// ID: turboguard
// Description: System info and file integrity checking for desktop builds.
// By: nub1k0vB4Nan
// Original: nub1k0vB4Nan
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("TurboGuard requires unsandboxed mode");
  }

  const BLOCK_ICON_URI =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMjAgNCBMMzQgMTEgTDM0IDI1IEwyMCAzNiBMNiAyNSBMNiAxMSBaIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMiLz48dGV4dCB4PSIyMCIgeT0iMjYiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSJib2xkIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPlQ8L3RleHQ+PC9zdmc+";

  const MENU_ICON_URI =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMjAgNCBMMzQgMTEgTDM0IDI1IEwyMCAzNiBMNiAyNSBMNiAxMSBaIiBmaWxsPSJub25lIiBzdHJva2U9IiNmMjZhMWIiIHN0cm9rZS13aWR0aD0iMyIvPjx0ZXh0IHg9IjIwIiB5PSIyNiIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZjI2YTFiIj5UPC90ZXh0Pjwvc3ZnPg==";

  Scratch.translate.setup({
    ru: {
      "turboguard.name": "TurboGuard",
      "turboguard.getHash": "хэш файла [FILE]",
      "turboguard.getFileSize": "размер файла в байтах [FILE]",
      "turboguard.fileExists": "файл [FILE] существует?",
      "turboguard.readFile": "содержимое файла [FILE]",
      "turboguard.writeFile": "переписать файл [FILE] на [TEXT]",
      "turboguard.getHWID": "HWID системы",
      "turboguard.getProcessPath": "путь к папке игры",
      "turboguard.getFullReport": "полный отчёт о системе",
    },
  });

  const isNode = typeof require !== "undefined";
  const fs = isNode ? require("fs") : null;
  const path = isNode ? require("path") : null;
  const crypto = isNode ? require("crypto") : null;
  const os = isNode ? require("os") : null;

  class TurboGuard {
    getInfo() {
      return {
        id: "turboguard",
        name: Scratch.translate({
          id: "turboguard.name",
          default: "TurboGuard",
        }),
        color1: "#f26a1b",
        color2: "#d95316",
        color3: "#bf400b",
        blockIconURI: BLOCK_ICON_URI,
        menuIconURI: MENU_ICON_URI,
        blocks: [
          {
            opcode: "getHash",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "turboguard.getHash",
              default: "file hash [FILE]",
            }),
            arguments: {
              FILE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "package.json",
              },
            },
          },
          {
            opcode: "getFileSize",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "turboguard.getFileSize",
              default: "file size in bytes [FILE]",
            }),
            arguments: {
              FILE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "package.json",
              },
            },
          },
          {
            opcode: "fileExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate({
              id: "turboguard.fileExists",
              default: "file [FILE] exists?",
            }),
            arguments: {
              FILE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "package.json",
              },
            },
          },
          {
            opcode: "readFile",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "turboguard.readFile",
              default: "contents of file [FILE]",
            }),
            arguments: {
              FILE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "package.json",
              },
            },
          },
          {
            opcode: "writeFile",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "turboguard.writeFile",
              default: "rewrite file [FILE] with [TEXT]",
            }),
            arguments: {
              FILE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "test.txt",
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "hello world",
              },
            },
          },
          {
            opcode: "getHWID",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "turboguard.getHWID",
              default: "system HWID",
            }),
          },
          {
            opcode: "getProcessPath",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "turboguard.getProcessPath",
              default: "game directory path",
            }),
          },
          {
            opcode: "getFullReport",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "turboguard.getFullReport",
              default: "full system report",
            }),
          },
        ],
      };
    }

    getHash(args) {
      if (!isNode) return "NO_NODE";
      try {
        const safePath = path.join(process.cwd(), ...args.FILE.split(/[/\\]/));
        if (fs.existsSync(safePath)) {
          const fileBuffer = fs.readFileSync(safePath);
          return crypto.createHash("sha256").update(fileBuffer).digest("hex");
        }
        return "NOT_FOUND";
      } catch (e) {
        return "FAILED";
      }
    }

    getFileSize(args) {
      if (!isNode) return "NO_NODE";
      try {
        const safePath = path.join(process.cwd(), ...args.FILE.split(/[/\\]/));
        if (fs.existsSync(safePath)) {
          return String(fs.statSync(safePath).size);
        }
        return "NOT_FOUND";
      } catch (e) {
        return "FAILED";
      }
    }

    fileExists(args) {
      if (!isNode) return false;
      try {
        const safePath = path.join(process.cwd(), ...args.FILE.split(/[/\\]/));
        return fs.existsSync(safePath);
      } catch (e) {
        return false;
      }
    }

    readFile(args) {
      if (!isNode) return "NO_NODE";
      try {
        const safePath = path.join(process.cwd(), ...args.FILE.split(/[/\\]/));
        if (fs.existsSync(safePath)) {
          return fs.readFileSync(safePath, "utf8");
        }
        return "NOT_FOUND";
      } catch (e) {
        return "FAILED";
      }
    }

    writeFile(args) {
      if (!isNode) return;
      try {
        const safePath = path.join(process.cwd(), ...args.FILE.split(/[/\\]/));
        const dir = path.dirname(safePath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(safePath, String(args.TEXT), "utf8");
      } catch (e) {
        // Safe fail
      }
    }

    getHWID() {
      if (!isNode) return "NO_NODE";
      try {
        const rawHwid =
          os.hostname() + "_" + os.userInfo().username + "_" + os.arch();
        return crypto.createHash("sha256").update(rawHwid).digest("hex");
      } catch (e) {
        return "UNKNOWN_HWID";
      }
    }

    getProcessPath() {
      if (!isNode) return "NO_NODE";
      try {
        return process.cwd();
      } catch (e) {
        return "UNKNOWN_PATH";
      }
    }

    getFullReport() {
      const report = {
        hwid: this.getHWID(),
        processPath: this.getProcessPath(),
        targetHash: this.getHash({ FILE: "package.json" }),
        targetSize: this.getFileSize({ FILE: "package.json" }),
      };
      return JSON.stringify(report);
    }
  }

  Scratch.extensions.register(new TurboGuard());
})(Scratch);
