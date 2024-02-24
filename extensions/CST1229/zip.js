// Name: Zip
// ID: cst1229zip
// Description: Create and edit .zip format files, including .sb3 files.
// By: CST1229 <https://scratch.mit.edu/users/CST1229/>
// License: MIT

(function (Scratch) {
  "use strict";

  // @ts-expect-error - not typed yet
  const JSZip = Scratch.vm.exports.JSZip;

  const extIcon =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHJlY3Qgd2lkdGg9IjIzIiBoZWlnaHQ9IjIwIiB4PSI2IiB5PSIzIiBmaWxsPSIjZDhkODZjIiBzdHJva2U9IiM3ZDdkMjMiIHN0cm9rZS13aWR0aD0iMiIgcGFpbnQtb3JkZXI9InN0cm9rZSBtYXJrZXJzIGZpbGwiIHJ4PSI0IiByeT0iNCIgc3R5bGU9ImZvbnQtdmFyaWF0aW9uLXNldHRpbmdzOm5vcm1hbCIvPjxyZWN0IHdpZHRoPSIyOCIgaGVpZ2h0PSIyMCIgeD0iMSIgeT0iOCIgZmlsbD0iI2Q4ZDg2YyIgc3Ryb2tlPSIjN2Q3ZDIzIiBzdHJva2Utd2lkdGg9IjIiIHBhaW50LW9yZGVyPSJzdHJva2UgbWFya2VycyBmaWxsIiByeD0iNCIgcnk9IjQiIHN0eWxlPSJmb250LXZhcmlhdGlvbi1zZXR0aW5nczpub3JtYWwiLz48cGF0aCBmaWxsPSIjN2Q3ZDIzIiBkPSJNNSAxMlY3LjU1bDQtLjAyNlYxMlptMyA0di00aDR2NHptLTMgNHYtNGg0djR6bTMgNHYtNGg0djR6bS0zIDQuMTgxVjI0aDR2NC4xNzV6IiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6bm9ybWFsIi8+PHBhdGggZmlsbD0iIzdkN2QyMyIgc3Ryb2tlPSIjN2Q3ZDIzIiBzdHJva2Utd2lkdGg9Ii4xIiBkPSJNMTAgNy4xMjNWNWgydjIuMTM2Wk0xMSA1VjIuNTYybDItLjE2MlY1WiIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOm5vcm1hbCIvPjxwYXRoIGZpbGw9IiNmZmYiIHN0cm9rZT0iIzdkN2QyMyIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNMTUuNDg3IDI0Ljh2LTEuNzY1bDUuNjczLTguNTJoLTUuNDkzVjEyLjRoOC40NTN2MS44OTdsLTUuNzExIDguMzg3aDUuNzg3VjI0Ljh6IiBhcmlhLWxhYmVsPSJaIiBmb250LWZhbWlseT0iQ29uc29sYXMiIGZvbnQtc2l6ZT0iMTkuNDMiIGZvbnQtd2VpZ2h0PSI3MDAiIHBhaW50LW9yZGVyPSJzdHJva2UgbWFya2VycyBmaWxsIiBzdHlsZT0iLWlua3NjYXBlLWZvbnQtc3BlY2lmaWNhdGlvbjomcXVvdDtDb25zb2xhcywgQm9sZCZxdW90OyIgdHJhbnNmb3JtPSJzY2FsZSgxLjAzMyAuOTY4KSIvPjwvc3ZnPg==";

  class ZipExt {
    constructor() {
      this.zip = null;
      // jszip has its own "go to directory" system, but it sucks
      // implement our own instead
      this.zipPath = null;

      Scratch.vm.runtime.on("RUNTIME_DISPOSED", () => {
        this.close();
      });
    }

    getInfo() {
      return {
        id: "cst1229zip",
        name: Scratch.translate("Zip"),
        docsURI: "https://extensions.turbowarp.org/CST1229/zip",

        blockIconURI: extIcon,

        color1: "#a49a3a",
        color2: "#7d7d23",
        color3: "#666600",

        blocks: [
          {
            opcode: "createEmpty",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("create empty archive"),
            arguments: {},
          },
          {
            opcode: "open",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("open zip from [TYPE] [DATA]"),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "URL",
                menu: "fileType",
              },
              DATA: {
                type: Scratch.ArgumentType.STRING,
                // defaultValue: "http:/localhost:8000/hello.zip",
                defaultValue: "https://extensions.turbowarp.org/hello.zip",
              },
            },
          },
          {
            opcode: "getZip",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "output zip type [TYPE] compression level [COMPRESSION]"
            ),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "data: URL",
                menu: "zipFileType",
              },
              COMPRESSION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "6",
                menu: "compressionLevel",
              },
            },
          },
          {
            opcode: "close",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("close archive"),
            arguments: {},
          },
          {
            opcode: "isOpen",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("archive is open?"),
            arguments: {},
          },

          "---",

          {
            opcode: "exists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("[OBJECT] exists?"),
            arguments: {
              OBJECT: {
                type: Scratch.ArgumentType.STRING,
                // Don't translate so this matches the default zip
                defaultValue: "folder/",
              },
            },
          },
          {
            opcode: "writeFile",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "write file [FILE] content [CONTENT] type [TYPE]"
            ),
            arguments: {
              FILE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: `${Scratch.translate({
                  default: "new file",
                  description: "Default file name",
                })}.txt`,
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "text",
                menu: "writeFileType",
              },
              CONTENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Hello, world?"),
              },
            },
          },
          {
            opcode: "renameFile",
            blockType: Scratch.BlockType.COMMAND,
            text: "rename [FROM] to [TO]",
            arguments: {
              FROM: {
                type: Scratch.ArgumentType.STRING,
                // Don't translate so matches default zip
                defaultValue: "hello.txt",
              },
              TO: {
                type: Scratch.ArgumentType.STRING,
                // Don't translate so matches default zip
                defaultValue: "hello renamed.txt",
              },
            },
          },
          {
            opcode: "deleteFile",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete [FILE]"),
            arguments: {
              FILE: {
                type: Scratch.ArgumentType.STRING,
                // Don't translate so matches default zip
                defaultValue: "hello.txt",
              },
            },
          },
          {
            opcode: "getFile",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("file [FILE] as [TYPE]"),
            arguments: {
              FILE: {
                type: Scratch.ArgumentType.STRING,
                // Don't translate so matches default zip
                defaultValue: "hello.txt",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "text",
                menu: "getFileType",
              },
            },
          },

          "---",

          {
            opcode: "setFileMeta",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [META] of [FILE] to [VALUE]"),
            arguments: {
              META: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "modified days since 2000",
                menu: "setFileMeta",
              },
              FILE: {
                type: Scratch.ArgumentType.STRING,
                // Don't translate so matches default zip
                defaultValue: "folder/dango.png",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "getFileMeta",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[META] of [FILE]"),
            arguments: {
              META: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
                menu: "fileMeta",
              },
              FILE: {
                type: Scratch.ArgumentType.STRING,
                // Don't translate so matches default zip
                defaultValue: "folder/dango.png",
              },
            },
          },

          "---",

          {
            opcode: "createDir",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("create directory [DIR]"),
            arguments: {
              DIR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("new folder"),
              },
            },
          },
          {
            opcode: "goToDir",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("go to directory [DIR]"),
            arguments: {
              DIR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "folder",
              },
            },
          },
          {
            opcode: "getDir",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("contents of directory [DIR]"),
            arguments: {
              DIR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ".",
              },
            },
          },
          {
            opcode: "currentDir",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current directory path"),
          },

          "---",

          {
            opcode: "setComment",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set archive comment to [COMMENT]"),
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("any text"),
              },
            },
          },
          {
            opcode: "getComment",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("archive comment"),
            arguments: {},
          },

          "---",

          {
            opcode: "normalizePath",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("path [PATH] from [ORIGIN]"),
            arguments: {
              PATH: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "../folder3/",
              },
              ORIGIN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/folder/folder2",
              },
            },
          },
        ],
        menus: {
          fileType: {
            // used in the open zip block
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("URL"),
                value: "URL",
              },
              {
                text: Scratch.translate("base64"),
                value: "base64",
              },
              {
                text: Scratch.translate("hex"),
                value: "hex",
              },
              {
                text: Scratch.translate("binary"),
                value: "binary",
              },
              {
                text: Scratch.translate("string"),
                value: "string",
              },
            ],
          },
          zipFileType: {
            // used in the output zip block
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("data: URL"),
                value: "data: URL",
              },
              {
                text: Scratch.translate("base64"),
                value: "base64",
              },
              {
                text: Scratch.translate("hex"),
                value: "hex",
              },
              {
                text: Scratch.translate("binary"),
                value: "binary",
              },
              {
                text: Scratch.translate("string"),
                value: "string",
              },
            ],
          },
          getFileType: {
            // used in the get file block
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("text"),
                value: "text",
              },
              {
                text: Scratch.translate("data: URL"),
                value: "data: URL",
              },
              {
                text: Scratch.translate("base64"),
                value: "base64",
              },
              {
                text: Scratch.translate("hex"),
                value: "hex",
              },
              {
                text: Scratch.translate("binary"),
                value: "binary",
              },
            ],
          },
          writeFileType: {
            // used in the write file block
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("text"),
                value: "text",
              },
              {
                text: Scratch.translate("URL"),
                value: "URL",
              },
              {
                text: Scratch.translate("base64"),
                value: "base64",
              },
              {
                text: Scratch.translate("hex"),
                value: "hex",
              },
              {
                text: Scratch.translate("binary"),
                value: "binary",
              },
            ],
          },
          compressionLevel: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("no compression (fastest)"),
                value: "0",
              },
              { text: Scratch.translate("1 (fast, large)"), value: "1" },
              { text: "2", value: "2" },
              { text: "3", value: "3" },
              { text: "4", value: "4" },
              { text: "5", value: "5" },
              { text: "6", value: "6" },
              { text: "7", value: "7" },
              { text: "8", value: "8" },
              { text: Scratch.translate("9 (slowest, smallest)"), value: "9" },
            ],
          },
          fileMeta: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("name"),
                value: "name",
              },
              {
                text: Scratch.translate("path"),
                value: "path",
              },
              {
                text: Scratch.translate("folder"),
                value: "folder",
              },
              {
                text: Scratch.translate("modification date"),
                value: "modification date",
              },
              {
                text: Scratch.translate("long modification date"),
                value: "long modification date",
              },
              {
                text: Scratch.translate("modified days since 2000"),
                value: "modified days since 2000",
              },
              {
                text: Scratch.translate("unix modified timestamp"),
                value: "unix modified timestamp",
              },
              {
                text: Scratch.translate("comment"),
                value: "comment",
              },
            ],
          },
          setFileMeta: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("modified days since 2000"),
                value: "modified days since 2000",
              },
              {
                text: Scratch.translate("unix modified timestamp"),
                value: "unix modified timestamp",
              },
              {
                text: Scratch.translate("comment"),
                value: "comment",
              },
            ],
          },
        },
      };
    }

    /// Utilities

    normalize(origin, path) {
      path = path.toString().replaceAll(/\\/g, "/");
      origin = origin.toString().replaceAll(/\\/g, "/");

      if (path.startsWith("/")) origin = "";
      else if (!origin.endsWith("/")) origin += "/";

      let parsedPath = origin + path;

      let split = parsedPath.split("/");

      let result = [];
      for (const i in split) {
        const part = split[i];
        if (part === ".") continue;
        if (part === "") {
          // First split of `/` is blank, so ignore in that case
          // Last split of a directory is also blank due to the /
          if (+i !== 0 && +i !== split.length - 1) {
            throw new Error("Cannot have empty directory names");
          }
          if (+i === 0) continue;
        }
        if (part === "..") {
          if (result.length <= 0) {
            throw new Error("Cannot go above root");
          }
          result.pop();
          continue;
        }
        result.push(part);
      }
      return "/" + result.join("/");
    }
    splitIntoParts(string, partLength) {
      const arr = [];
      for (let i = 0; i < string.length; i += partLength) {
        arr.push(string.substring(i, i + partLength));
      }
      return arr;
    }
    // get a file/folder by path
    getObj(path) {
      // JSZip.prototype.files seems to be a null-prototype object
      // it should be safe doing this
      return this.zip.files[path.substring(1)] || this.zip.files[path];
    }
    // create folders up to a certain path
    createFolders(path) {
      try {
        path = this.normalize(path, ".");

        let currentPath = "";
        for (const folder of path.split("/")) {
          if (folder === "") continue;
          if (currentPath !== "") currentPath += "/";
          currentPath += folder;
          this.zip.folder(currentPath);
        }
      } catch (e) {
        console.error(`Zip extension: Error creating folders for ${path}:`, e);
      }
    }

    /// Blocks

    createEmpty() {
      this.close();

      this.zip = new JSZip();
      this.zipPath = "/";
    }
    async open({ TYPE, DATA }) {
      this.close();
      try {
        DATA = Scratch.Cast.toString(DATA);

        switch (TYPE) {
          case "base64":
          case "data: URL":
          case "URL":
            {
              if (TYPE === "base64")
                DATA = "data:application/zip;base64," + DATA;
              const resp = await Scratch.fetch(DATA);
              DATA = await resp.blob();
            }
            break;
          case "hex":
            {
              if (!/^(?:[0-9A-F]{2})*$/i.test(DATA)) return;
              const dataArr = this.splitIntoParts(DATA, 2);
              DATA = Uint8Array.from(dataArr.map((o) => parseInt(o, 16)));
            }
            break;
          case "binary":
            {
              if (!/^(?:[01]{8})*$/i.test(DATA)) return;
              const dataArr = this.splitIntoParts(DATA, 8);
              DATA = Uint8Array.from(dataArr.map((o) => parseInt(o, 2)));
            }
            break;
        }

        this.zip = await JSZip.loadAsync(DATA, { createFolders: true });
        this.zipPath = "/";
      } catch (e) {
        console.error("Zip extension: Could not open zip file.", e);
      }
    }
    async getZip({ TYPE, COMPRESSION }) {
      if (!this.zip) return "";
      try {
        COMPRESSION = Scratch.Cast.toNumber(COMPRESSION);
        COMPRESSION = Math.max(Math.min(Math.round(COMPRESSION), 9), 0);

        const compType = COMPRESSION === 0 ? "STORE" : "DEFLATE";
        const options = {
          compression: compType,
          compressionOptions: { level: COMPRESSION },
        };

        switch (TYPE) {
          case "text":
          case "string":
            return await this.zip.generateAsync({
              type: "binarystring",
              ...options,
            });
          case "base64":
          case "data: URL": {
            let data = await this.zip.generateAsync({
              type: "base64",
              ...options,
            });
            if (TYPE === "data: URL")
              data = "data:application/zip;base64," + data;
            return data;
          }
          case "hex": {
            const data = await this.zip.generateAsync({
              type: "array",
              ...options,
            });
            return data
              .map((data) => data.toString(16).padStart(2, "0"))
              .join("");
          }
          case "binary": {
            const data = await this.zip.generateAsync({
              type: "array",
              ...options,
            });
            return data
              .map((data) => data.toString(2).padStart(8, "0"))
              .join("");
          }
          default:
            return "";
        }
      } catch (e) {
        console.error(
          `Zip extension: Error creating zip with type ${TYPE} compression ${COMPRESSION}:`,
          e
        );
      }
    }
    close() {
      this.zip = null;
      this.zipPath = null;
    }
    isOpen() {
      return !!this.zip;
    }

    exists({ OBJECT }) {
      try {
        return !!this.getObj(
          this.normalize(this.zipPath, Scratch.Cast.toString(OBJECT))
        );
      } catch (e) {
        return false;
      }
    }
    async getFile({ FILE, TYPE }) {
      if (!this.zip) return "";

      FILE = Scratch.Cast.toString(FILE);
      TYPE = Scratch.Cast.toString(TYPE);
      try {
        const path = this.normalize(this.zipPath, FILE);
        if (path.endsWith("/")) return "";
        const obj = this.getObj(path);
        if (!obj || obj.dir) return "";

        switch (TYPE) {
          case "text":
            return await obj.async("string");
          case "base64":
          case "data: URL": {
            let data = await obj.async("base64");
            if (TYPE === "data: URL")
              data = "data:application/octet-stream;base64," + data;
            return data;
          }
          case "hex": {
            const data = await obj.async("array");
            return data
              .map((data) => data.toString(16).padStart(2, "0"))
              .join("");
          }
          case "binary": {
            const data = await obj.async("array");
            return data
              .map((data) => data.toString(2).padStart(8, "0"))
              .join("");
          }
          default:
            return "";
        }
      } catch (e) {
        console.error(
          `Zip extension: Error getting file ${FILE} with type ${TYPE}:`,
          e
        );
        return "";
      }
    }
    async writeFile({ FILE, CONTENT, TYPE }) {
      if (!this.zip) return;

      FILE = Scratch.Cast.toString(FILE);
      CONTENT = Scratch.Cast.toString(CONTENT);
      TYPE = Scratch.Cast.toString(TYPE);
      try {
        let path = this.normalize(this.zipPath, FILE);
        if (path.endsWith("/")) return;

        const obj = this.getObj(path);
        if (obj && obj.dir) return;

        if (path.startsWith("/")) path = path.substring(1);

        switch (TYPE) {
          case "text":
            this.zip.file(path, CONTENT, {
              createFolders: true,
            });
            break;
          case "base64":
          case "data: URL": {
            // compatibility
            if (TYPE === "data: URL")
              CONTENT = CONTENT.substring(CONTENT.indexOf(","));
            this.zip.file(path, CONTENT, {
              base64: true,
              createFolders: true,
            });
            break;
          }
          case "URL":
            {
              const resp = await Scratch.fetch(CONTENT);
              this.zip.file(path, await resp.blob(), {
                base64: true,
                createFolders: true,
              });
            }
            break;
          case "hex":
            {
              if (!/^(?:[0-9A-F]{2})*$/i.test(CONTENT)) return "";
              const dataArr = this.splitIntoParts(CONTENT, 2);
              const data = Uint8Array.from(dataArr.map((o) => parseInt(o, 16)));
              this.zip.file(path, data, {
                createFolders: true,
              });
            }
            break;
          case "binary":
            {
              if (!/^(?:[01]{8})*$/i.test(CONTENT)) return "";
              const dataArr = this.splitIntoParts(CONTENT, 8);
              const data = Uint8Array.from(dataArr.map((o) => parseInt(o, 2)));
              this.zip.file(path, data, {
                createFolders: true,
              });
            }
            break;
          default:
            return "";
        }
      } catch (e) {
        console.error(
          `Zip extension: Error writing to file ${FILE} type ${TYPE}:`,
          e
        );
      }
    }
    renameFile({ FROM, TO }) {
      if (!this.zip) return;

      const renameOne = (from, to) => {
        const obj = this.zip.files[from];
        this.zip.files[to] = obj;
        obj.name = to;
        delete this.zip.files[from];
      };

      FROM = Scratch.Cast.toString(FROM);
      TO = Scratch.Cast.toString(TO);
      try {
        let fromPath = this.normalize(this.zipPath, FROM);
        let fromObj = this.getObj(fromPath);
        if (!fromObj && !fromPath.endsWith("/")) {
          fromPath += "/";
          fromObj = this.getObj(fromPath);
        }
        if (!fromObj) return;
        let toPath = this.normalize(this.zipPath, TO);
        const replacedTo = TO.replaceAll(/\\/g, "/");
        const slashes = replacedTo.split("/").length - 1;
        if (
          slashes <= +fromObj.dir &&
          (slashes === 0 || replacedTo.endsWith("/"))
        ) {
          // this is a name-only change
          toPath = this.normalize(fromPath, "../" + replacedTo);
          if (fromObj.dir) {
            if (!fromPath.endsWith("/")) fromPath += "/";
          } else {
            if (fromPath.endsWith("/")) return;
          }
        }

        if (fromPath.startsWith("/")) fromPath = fromPath.substring(1);
        if (toPath.startsWith("/")) toPath = toPath.substring(1);

        // If this is a file, just renaming this one is enough
        if (!fromObj.dir) {
          renameOne(fromPath, toPath);
          return;
        }

        // Otherwise, we need to rename this object
        // and everything else in it
        if (!toPath.endsWith("/")) toPath += "/";

        // Move current directory
        if (this.zipPath.substring(1).startsWith(fromPath)) {
          this.zipPath =
            "/" + toPath + this.zipPath.substring(1).substring(fromPath.length);
        }

        for (const path in this.zip.files) {
          if (!path.startsWith(fromPath)) continue;
          const extraPath = path.substring(fromPath.length);
          renameOne(path, toPath + extraPath);
        }
        this.createFolders(toPath);
      } catch (e) {
        console.error(`Zip extension: Error renaming ${FROM} to ${TO}:`, e);
      }
    }
    deleteFile({ FILE }) {
      if (!this.zip) return;

      FILE = Scratch.Cast.toString(FILE);
      try {
        let path = this.normalize(this.zipPath, FILE);
        if (!this.getObj(path)) return;
        if (path === "/") return;

        const shouldGoBack =
          this.getObj(path).dir && this.zipPath.startsWith(path);
        if (path.startsWith("/")) path = path.substring(1);

        this.zip.remove(path);

        if (shouldGoBack) {
          // Go back until we are in a directory that exists
          const split = this.zipPath.split("/");
          this.zipPath = "";

          let i = 0;
          while (i < split.length) {
            if (split[i] === "") {
              i++;
              continue;
            }
            const newPath = this.zipPath + split[i] + "/";
            if (!this.getObj(newPath)) break;
            this.zipPath = newPath;
            i++;
          }
          if (this.zipPath === "") this.zipPath = "/";
        }
      } catch (e) {
        console.error(`Zip extension: Error deleting file ${FILE}:`, e);
      }
    }

    setFileMeta({ META, FILE, VALUE }) {
      if (!this.zip) return;

      META = Scratch.Cast.toString(META);
      FILE = Scratch.Cast.toString(FILE);
      VALUE = Scratch.Cast.toString(VALUE);
      try {
        const normalized = this.normalize(this.zipPath, FILE);
        const obj = this.getObj(normalized);
        if (!obj) return "";
        switch (META) {
          case "modified days since 2000":
            {
              const msPerDay = 24 * 60 * 60 * 1000;
              const start = +new Date(2000, 0, 1);
              obj.date = new Date(
                start + Scratch.Cast.toNumber(VALUE) * msPerDay
              );
            }
            break;
          case "unix modified timestamp":
            obj.date = new Date(Scratch.Cast.toNumber(VALUE));
            break;
          case "comment":
            obj.comment = VALUE;
            break;
          default:
            return;
        }
      } catch (e) {
        console.error(`Zip extension: Error getting ${META} of ${FILE}:`, e);
        return "";
      }
    }
    getFileMeta({ META, FILE }) {
      if (!this.zip) return "";

      META = Scratch.Cast.toString(META);
      FILE = Scratch.Cast.toString(FILE);
      try {
        const normalized = this.normalize(this.zipPath, FILE);
        const obj = this.getObj(normalized);
        if (!obj) return "";
        switch (META) {
          case "name": {
            const splitPath = obj.name.split("/");
            // Directories have an extra slash at the end
            // (obj.dir is casted to 0 or 1)
            return splitPath[splitPath.length - 1 - +obj.dir] || "";
          }
          case "path":
            return "/" + obj.name;
          case "folder": {
            /** @type {Array} */
            const splitPath = obj.name.split("/");
            const folders = splitPath
              .slice(0, splitPath.length - 1 - +obj.dir)
              .join("/");
            return "/" + folders + (folders === "" ? "" : "/");
          }
          case "modification date":
            return obj.date.toLocaleString(navigator.language);
          case "long modification date":
            return new Date().toLocaleString(navigator.language, {
              dateStyle: "full",
              timeStyle: "medium",
            });
          case "modified days since 2000": {
            const msPerDay = 24 * 60 * 60 * 1000;
            const start = +new Date(2000, 0, 1);
            return (+obj.date - start) / msPerDay;
          }
          case "unix modified timestamp":
            return +obj.date;
          case "comment":
            return obj.comment || "";
          default:
            return "";
        }
      } catch (e) {
        console.error(`Zip extension: Error getting ${META} of ${FILE}:`, e);
        return "";
      }
    }

    createDir({ DIR }) {
      if (!this.zip) return;
      DIR = Scratch.Cast.toString(DIR);
      try {
        let newPath = this.normalize(this.zipPath, DIR);
        if (!newPath.endsWith("/")) newPath += "/";
        if (newPath.startsWith("/")) newPath = newPath.substring(1);
        if (this.getObj(newPath)) return;
        this.zip.folder(newPath);
      } catch (e) {
        console.error(`Error creating directory ${DIR}:`, e);
      }
    }
    goToDir({ DIR }) {
      if (!this.zip) return;
      DIR = Scratch.Cast.toString(DIR);
      try {
        let newPath = this.normalize(this.zipPath, DIR);
        if (!newPath.endsWith("/")) newPath += "/";
        if (!this.getObj(newPath) && newPath !== "/") return;
        this.zipPath = newPath;
      } catch (e) {
        console.error(`Error going to directory ${DIR}:`, e);
      }
    }
    getDir({ DIR }) {
      if (!this.zip) return "";
      try {
        DIR = Scratch.Cast.toString(DIR);
        if (!DIR.endsWith("/")) DIR += "/";

        const normalized = this.normalize(this.zipPath, DIR);
        if (!this.getObj(normalized) && normalized !== "/") return "";
        const dir = normalized.substring(1);
        const length = dir.length;

        return JSON.stringify(
          Object.values(this.zip.files)
            .filter((obj) => {
              // Above the current directory
              if (!obj.name.startsWith(dir)) return false;
              // Below the current directory
              if (obj.name.substring(length).split("/").length > obj.dir + 1)
                return false;
              // Is the current directory
              if (obj.name === dir) return false;
              return true;
            })
            .map((obj) => obj.name.substring(length))
        );
      } catch (e) {
        console.error(`Zip extension: Could not get directory ${DIR}:`, e);
        return "";
      }
    }
    currentDir() {
      return this.zipPath || "";
    }

    setComment({ COMMENT }) {
      if (!this.zip) return;
      this.zip.comment = Scratch.Cast.toString(COMMENT);
    }
    getComment({ COMMENT }) {
      if (!this.zip) return "";
      return this.zip.comment || "";
    }

    normalizePath({ ORIGIN, PATH }) {
      try {
        return this.normalize(
          Scratch.Cast.toString(ORIGIN),
          Scratch.Cast.toString(PATH)
        );
      } catch (e) {
        return "";
      }
    }
  }

  // @ts-ignore
  Scratch.extensions.register(new ZipExt());
})(globalThis.Scratch);
