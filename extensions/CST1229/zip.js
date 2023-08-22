// Name: Zip
// ID: cst1229zip
// Description: Create and edit .zip format files, including .sb3 files.
// By: CST1229 <https://scratch.mit.edu/users/CST1229/>

(function (Scratch) {
  "use strict";

  // @ts-expect-error - not typed yet
  const JSZip = Scratch.vm.exports.JSZip;

  const extIcon =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+PHJlY3Qgd2lkdGg9IjIzIiBoZWlnaHQ9IjIwIiB4PSI2IiB5PSIzIiByeD0iNCIgcnk9IjQiIHN0eWxlPSJmb250LXZhcmlhdGlvbi1zZXR0aW5nczpub3JtYWw7ZmlsbDojZDhkODZjO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojN2Q3ZDIzO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTtwYWludC1vcmRlcjpzdHJva2UgbWFya2VycyBmaWxsO3N0b3AtY29sb3I6IzAwMCIvPjxyZWN0IHdpZHRoPSIyOCIgaGVpZ2h0PSIyMCIgeD0iMSIgeT0iOCIgcng9IjQiIHJ5PSI0IiBzdHlsZT0iZm9udC12YXJpYXRpb24tc2V0dGluZ3M6bm9ybWFsO29wYWNpdHk6MTtmaWxsOiNkOGQ4NmM7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiM3ZDdkMjM7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxO3BhaW50LW9yZGVyOnN0cm9rZSBtYXJrZXJzIGZpbGw7c3RvcC1jb2xvcjojMDAwO3N0b3Atb3BhY2l0eToxIi8+PHBhdGggZmlsbD0iIzdkN2QyMyIgZD0iTTUgMTJWOGg0djRabTMgNHYtNGg0djRabS0zIDR2LTRoNHY0Wm0zIDR2LTRoNHY0em0tMyA0di00aDR2NFoiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpub3JtYWwiLz48cGF0aCBmaWxsPSIjN2Q3ZDIzIiBzdHJva2U9IiM3ZDdkMjMiIHN0cm9rZS13aWR0aD0iLjEiIGQ9Ik0xMCA3VjVoMnYyem0xLTJWM2gydjJ6IiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6bm9ybWFsIi8+PHRleHQgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeD0iMTQuNSIgeT0iMjQuOCIgc3R5bGU9ImZvbnQtd2VpZ2h0OjcwMDtmb250LXNpemU6MTkuNDMwNHB4O2ZvbnQtZmFtaWx5OkNvbnNvbGFzOy1pbmtzY2FwZS1mb250LXNwZWNpZmljYXRpb246JnF1b3Q7Q29uc29sYXMsIEJvbGQmcXVvdDs7Zm9udC12YXJpYXRpb24tc2V0dGluZ3M6bm9ybWFsO29wYWNpdHk6MTtmaWxsOiNmZmY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiM3ZDdkMjM7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxO3BhaW50LW9yZGVyOnN0cm9rZSBtYXJrZXJzIGZpbGw7c3RvcC1jb2xvcjojMDAwO3N0b3Atb3BhY2l0eToxIiB0cmFuc2Zvcm09InNjYWxlKDEuMDMzIC45NjgpIj48dHNwYW4geD0iMTQuNSIgeT0iMjQuOCIgc3R5bGU9InN0cm9rZS13aWR0aDoyIj5aPC90c3Bhbj48L3RleHQ+PC9zdmc+";

  class ZipExt {
    constructor() {
      this.zip = null;
      // jszip has its own "go to directory" system, but it sucks
      // implement our own instead
      this.zipPath = null;
    }

    getInfo() {
      return {
        id: "cst1229zip",
        name: "Zip",
        docsURI: "https://extensions.turbowarp.org/CST1229/zip",

        blockIconURI: extIcon,

        color1: "#a49a3a",
        color2: "#7d7d23",
        color3: "#666600",

        blocks: [
          {
            opcode: "createEmpty",
            blockType: Scratch.BlockType.COMMAND,
            text: "create empty archive",
            arguments: {},
          },
          {
            opcode: "open",
            blockType: Scratch.BlockType.COMMAND,
            text: "open zip from [TYPE] [DATA]",
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
            text: "output zip type [TYPE] compression level [COMPRESSION]",
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
            text: "close archive",
            arguments: {},
          },
          {
            opcode: "isOpen",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "archive is open?",
            arguments: {},
          },

          "---",

          {
            opcode: "exists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[OBJECT] exists?",
            arguments: {
              OBJECT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "folder/",
              },
            },
          },
          {
            opcode: "writeFile",
            blockType: Scratch.BlockType.COMMAND,
            text: "write file [FILE] content [CONTENT] type [TYPE]",
            arguments: {
              FILE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "new file.txt",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "text",
                menu: "writeFileType",
              },
              CONTENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello, world?",
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
                defaultValue: "hello.txt",
              },
              TO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "hello renamed.txt",
              },
            },
          },
          {
            opcode: "deleteFile",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete [FILE]",
            arguments: {
              FILE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "hello.txt",
              },
            },
          },
          {
            opcode: "getFile",
            blockType: Scratch.BlockType.REPORTER,
            text: "file [FILE] as [TYPE]",
            arguments: {
              FILE: {
                type: Scratch.ArgumentType.STRING,
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
            text: "set [META] of [FILE] to [VALUE]",
            arguments: {
              META: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "modified days since 2000",
                menu: "setFileMeta",
              },
              FILE: {
                type: Scratch.ArgumentType.STRING,
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
            text: "[META] of [FILE]",
            arguments: {
              META: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
                menu: "fileMeta",
              },
              FILE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "folder/dango.png",
              },
            },
          },

          "---",

          {
            opcode: "createDir",
            blockType: Scratch.BlockType.COMMAND,
            text: "create directory [DIR]",
            arguments: {
              DIR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "new folder",
              },
            },
          },
          {
            opcode: "goToDir",
            blockType: Scratch.BlockType.COMMAND,
            text: "go to directory [DIR]",
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
            text: "contents of directory [DIR]",
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
            text: "current directory path",
          },

          "---",

          {
            opcode: "setComment",
            blockType: Scratch.BlockType.COMMAND,
            text: "set archive comment to [COMMENT]",
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "any text",
              },
            },
          },
          {
            opcode: "getComment",
            blockType: Scratch.BlockType.REPORTER,
            text: "archive comment",
            arguments: {},
          },

          "---",

          {
            opcode: "normalizePath",
            blockType: Scratch.BlockType.REPORTER,
            text: "path [PATH] from [ORIGIN]",
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
            items: ["URL", "base64", "hex", "binary", "string"],
          },
          zipFileType: {
            // used in the output zip block
            acceptReporters: true,
            items: ["data: URL", "base64", "hex", "binary", "string"],
          },
          getFileType: {
            // used in the get file block
            acceptReporters: true,
            items: ["text", "data: URL", "base64", "hex", "binary"],
          },
          writeFileType: {
            // used in the write file block
            acceptReporters: true,
            items: ["text", "URL", "base64", "hex", "binary"],
          },
          compressionLevel: {
            acceptReporters: true,
            items: [
              { text: "no compression (fastest)", value: "0" },
              { text: "1 (fast, large)", value: "1" },
              { text: "2", value: "2" },
              { text: "3", value: "3" },
              { text: "4", value: "4" },
              { text: "5", value: "5" },
              { text: "6", value: "6" },
              { text: "7", value: "7" },
              { text: "8", value: "8" },
              { text: "9 (slowest, smallest)", value: "9" },
            ],
          },
          fileMeta: {
            acceptReporters: true,
            items: [
              "name",
              "path",
              "folder",
              "modification date",
              "long modification date",
              "modified days since 2000",
              "unix modified timestamp",
              "comment",
            ],
          },
          setFileMeta: {
            acceptReporters: true,
            items: [
              "modified days since 2000",
              "unix modified timestamp",
              "comment",
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
