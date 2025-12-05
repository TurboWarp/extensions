// Name: RubyFS
// ID: rubyFS
// Description: A structured, in-memory file system for Scratch projects (Previously LiFS/Lithium FS).
// By: kx1bx1 <https://scratch.mit.edu/users/kx1bx1/>
// Original: 0832 <https://scratch.mit.edu/users/0832/>
// License: MIT

// Version: 1.2.0
// - New child indexing (O(1))
// - Trash feature
// - New "empty trash" block

(function (Scratch) {
  "use strict";

  const defaultPerms = {
    create: true,
    delete: true,
    see: true,
    read: true,
    write: true,
    control: true,
  };

  const extensionVersion = "1.2.0";

  class RubyFS {
    constructor() {
      this.fs = new Map();

      this.childIndex = new Map();

      this.RubyFSLogEnabled = false;
      this.lastError = "";
      this.readActivity = false;
      this.writeActivity = false;
      this.lastReadPath = "";
      this.lastWritePath = "";

      this._log("Initializing RubyFS...");
      this._internalClean();
    }

    getInfo() {
      return {
        id: "rubyFS",
        name: Scratch.translate("RubyFS"),
        color1: "#d52246",
        color2: "#a61734",
        color3: "#7f1026",
        description: Scratch.translate(
          "A structured, in-memory file system. (Use 'turn on console logging' for debugging.)"
        ),
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Core Operations"),
          },
          {
            opcode: "start",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("create [STR]"),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/example.txt",
              },
            },
          },
          {
            opcode: "folder",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [STR] to [STR2]"),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/example.txt",
              },
              STR2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "RubyFS is good!",
              },
            },
          },
          {
            opcode: "open",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("open [STR]"),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/example.txt",
              },
            },
          },
          {
            opcode: "del",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete [STR]"),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/example.txt",
              },
            },
          },
          {
            opcode: "list",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("list [TYPE] under [STR] as JSON"),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "LIST_TYPE_MENU",
                defaultValue: "all",
              },
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/",
              },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("File & Directory Utilities"),
          },
          {
            opcode: "copy",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("copy [STR] to [STR2]"),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/example.txt",
              },
              STR2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/copy_of_example.txt",
              },
            },
          },
          {
            opcode: "sync",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("rename [STR] to [STR2]"),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/example.txt",
              },
              STR2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/new_example.txt",
              },
            },
          },
          {
            opcode: "emptyTrash",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("empty trash"),
          },
          {
            opcode: "exists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("does [STR] exist?"),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/example.txt",
              },
            },
          },
          {
            opcode: "isFile",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [STR] a file?"),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/example.txt",
              },
            },
          },
          {
            opcode: "isDir",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [STR] a directory?"),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/",
              },
            },
          },
          {
            opcode: "fileName",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("file name of [STR]"),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/example.txt",
              },
            },
          },
          {
            opcode: "dirName",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("directory of [STR]"),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/example.txt",
              },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Timestamp Utilities"),
          },
          {
            opcode: "dateCreated",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("date created of [STR]"),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/example.txt",
              },
            },
          },
          {
            opcode: "dateModified",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("date modified of [STR]"),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/example.txt",
              },
            },
          },
          {
            opcode: "dateAccessed",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("date accessed of [STR]"),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/example.txt",
              },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Permissions & Limits"),
          },
          {
            opcode: "setLimit",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set size limit for [DIR] to [BYTES] bytes"
            ),
            arguments: {
              DIR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/",
              },
              BYTES: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 8192,
              },
            },
          },
          {
            opcode: "removeLimit",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("remove size limit for [DIR]"),
            arguments: {
              DIR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/",
              },
            },
          },
          {
            opcode: "getLimit",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("size limit of [DIR] (bytes)"),
            arguments: {
              DIR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/",
              },
            },
          },
          {
            opcode: "getSize",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current size of [DIR] (bytes)"),
            arguments: {
              DIR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/",
              },
            },
          },
          {
            opcode: "setPerm",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[ACTION] [PERM] permission for [STR]"),
            arguments: {
              ACTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "PERM_ACTION_MENU",
                defaultValue: "remove",
              },
              PERM: {
                type: Scratch.ArgumentType.STRING,
                menu: "PERM_TYPE_MENU",
                defaultValue: "write",
              },
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/",
              },
            },
          },
          {
            opcode: "listPerms",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("list permissions for [STR]"),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/",
              },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Import & Export"),
          },
          {
            opcode: "clean",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("clear the file system"),
            arguments: {},
          },
          {
            opcode: "in",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("import file system from [STR]"),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"version":"1.2.0","fs":{}}',
              },
            },
          },
          {
            opcode: "out",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("export file system"),
            arguments: {},
          },
          {
            opcode: "exportFileBase64",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("export file [STR] as [FORMAT]"),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/example.txt",
              },
              FORMAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "BASE64_FORMAT_MENU",
                defaultValue: "base64",
              },
            },
          },
          {
            opcode: "importFileBase64",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("import [FORMAT] [STR] to file [STR2]"),
            arguments: {
              FORMAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "BASE64_FORMAT_MENU",
                defaultValue: "base64",
              },
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "UmVuZUZTIWlzZ29vZCE=",
              },
              STR2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/imported.txt",
              },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Debugging & Activity"),
          },
          {
            opcode: "wasRead",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("was read?"),
          },
          {
            opcode: "wasWritten",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("was written?"),
          },
          {
            opcode: "getLastReadPath",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("last path read"),
          },
          {
            opcode: "getLastWritePath",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("last path written"),
          },
          {
            opcode: "getLastError",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("last error"),
          },
          {
            opcode: "toggleLogging",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("turn [STATE] console logging"),
            arguments: {
              STATE: {
                type: Scratch.ArgumentType.STRING,
                menu: "LOG_STATE_MENU",
                defaultValue: "on",
              },
            },
          },
          {
            opcode: "getVersion",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("version"),
          },
          {
            opcode: "runIntegrityTest",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("run integrity test"),
          },
        ],
        menus: {
          LIST_TYPE_MENU: {
            acceptReporters: true,
            items: [
              {
                text: "all",
                value: "all",
              },
              {
                text: "files",
                value: "files",
              },
              {
                text: "directories",
                value: "directories",
              },
            ],
          },
          PERM_ACTION_MENU: {
            acceptReporters: true,
            items: [
              {
                text: "add",
                value: "add",
              },
              {
                text: "remove",
                value: "remove",
              },
            ],
          },
          PERM_TYPE_MENU: {
            acceptReporters: true,
            items: [
              {
                text: "create",
                value: "create",
              },
              {
                text: "delete",
                value: "delete",
              },
              {
                text: "see",
                value: "see",
              },
              {
                text: "read",
                value: "read",
              },
              {
                text: "write",
                value: "write",
              },
              {
                text: "control",
                value: "control",
              },
            ],
          },
          LOG_STATE_MENU: {
            acceptReporters: true,
            items: [
              {
                text: "on",
                value: "on",
              },
              {
                text: "off",
                value: "off",
              },
            ],
          },
          BASE64_FORMAT_MENU: {
            acceptReporters: true,
            items: [
              {
                text: "Base64 String",
                value: "base64",
              },
              {
                text: "Data URL",
                value: "data_url",
              },
            ],
          },
        },
      };
    }

    _log(message, ...args) {
      if (this.RubyFSLogEnabled) console.log(`[RubyFS] ${message}`, ...args);
    }
    _warn(message, ...args) {
      if (this.RubyFSLogEnabled) console.warn(`[RubyFS] ${message}`, ...args);
    }
    _setError(message, ...args) {
      this._warn(message, ...args);
      this.lastError = message;
    }

    _encodeUTF8Base64(str) {
      try {
        return btoa(str);
      } catch (e) {
        try {
          return btoa(
            encodeURIComponent(str).replace(
              /%([0-9A-F]{2})/g,
              function toSolidBytes(match, p1) {
                // @ts-ignore
                return String.fromCharCode("0x" + p1);
              }
            )
          );
        } catch (e2) {
          this._setError(`Base64 Encode Error: ${e2.message}`);
          return "";
        }
      }
    }

    _decodeUTF8Base64(base64) {
      try {
        return decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
      } catch (e) {
        return atob(base64);
      }
    }

    _getMimeType(path) {
      const extension = path.split(".").pop().toLowerCase();
      switch (extension) {
        case "txt":
          return "text/plain";
        case "json":
          return "application/json";
        case "svg":
          return "image/svg+xml";
        case "png":
          return "image/png";
        case "jpg":
        case "jpeg":
          return "image/jpeg";
        case "gif":
          return "image/gif";
        case "zip":
          return "application/zip";
        case "sprite3":
          return "application/x-zip-compressed";
        case "sb3":
          return "application/x-zip-compressed";
        case "wav":
          return "audio/wav";
        case "mp3":
          return "audio/mpeg";
        default:
          return "application/octet-stream";
      }
    }

    _addToIndex(path) {
      const parent = this._internalDirName(path);
      if (!this.childIndex.has(parent)) this.childIndex.set(parent, new Set());
      this.childIndex.get(parent).add(path);
    }

    _removeFromIndex(path) {
      const parent = this._internalDirName(path);
      if (this.childIndex.has(parent)) this.childIndex.get(parent).delete(path);

      if (this.childIndex.has(path)) this.childIndex.delete(path);
    }

    _ensureTrash() {
      if (!this.fs.has("/.Trash/")) {
        const now = Date.now();
        this.fs.set("/.Trash/", {
          content: null,
          perms: JSON.parse(JSON.stringify(defaultPerms)),
          limit: -1,
          created: now,
          modified: now,
          accessed: now,
        });
        this._addToIndex("/.Trash/");

        if (!this.childIndex.has("/.Trash/")) {
          this.childIndex.set("/.Trash/", new Set());
        }
      }
    }

    _normalizePath(path) {
      if (typeof path !== "string" || !path.trim()) return null;
      const hadTrailingSlash = path.length > 1 && path.endsWith("/");
      if (path[0] !== "/") path = "/" + path;
      const segments = path.split("/");
      const newSegments = [];
      for (const segment of segments) {
        if (segment === "" || segment === ".") continue;
        if (segment === "..") {
          if (newSegments.length > 0) newSegments.pop();
        } else {
          newSegments.push(segment);
        }
      }
      let newPath = "/" + newSegments.join("/");
      if (newPath === "/") return "/";
      if (hadTrailingSlash) newPath += "/";
      return newPath;
    }

    _isPathDir(path) {
      return path === "/" || path.endsWith("/");
    }

    _internalDirName(path) {
      if (path === "/") return "/";
      let procPath = this._isPathDir(path)
        ? path.substring(0, path.length - 1)
        : path;
      const lastSlash = procPath.lastIndexOf("/");
      if (lastSlash <= 0) return "/";
      return procPath.substring(0, lastSlash + 1);
    }

    _getStringSize(str) {
      return str === null || str === undefined ? 0 : str.length;
    }

    _getDirectorySize(dirPath) {
      let totalSize = 0;
      const stack = [dirPath];
      while (stack.length > 0) {
        const currentPath = stack.pop();
        const children = this.childIndex.get(currentPath);
        if (children) {
          for (const child of children) {
            const entry = this.fs.get(child);
            if (entry) {
              if (this._isPathDir(child)) stack.push(child);
              else totalSize += this._getStringSize(entry.content);
            }
          }
        }
      }
      return totalSize;
    }

    _canAccommodateChange(filePath, deltaSize) {
      if (deltaSize <= 0) return true;
      let currentDir = this._internalDirName(filePath);
      while (true) {
        const entry = this.fs.get(currentDir);
        if (entry && entry.limit !== -1) {
          const currentSize = this._getDirectorySize(currentDir);
          if (currentSize + deltaSize > entry.limit) {
            this._setError(`Size limit exceeded for ${currentDir}`);
            return false;
          }
        }
        if (currentDir === "/") break;
        currentDir = this._internalDirName(currentDir);
      }
      return true;
    }

    _internalCreate(path, content, parentDir) {
      if (this.fs.has(path)) return false;
      if (!this.hasPermission(parentDir, "create")) {
        this._setError(`Create failed: No 'create' permission in ${parentDir}`);
        return false;
      }
      const deltaSize = this._getStringSize(content);
      if (!this._canAccommodateChange(path, deltaSize)) {
        this._log("InternalCreate failed: Size limit exceeded");
        return false;
      }
      let permsToInherit;
      const parentEntry = this.fs.get(parentDir);
      if (parentEntry) permsToInherit = parentEntry.perms;
      else if (parentDir === "/") permsToInherit = this.fs.get("/").perms;
      else permsToInherit = defaultPerms;

      const now = Date.now();
      this.fs.set(path, {
        content: content,
        perms: JSON.parse(JSON.stringify(permsToInherit)),
        limit: -1,
        created: now,
        modified: now,
        accessed: now,
      });
      this._addToIndex(path);

      this.writeActivity = true;
      this.lastWritePath = path;
      return true;
    }

    hasPermission(path, action) {
      const normPath = this._normalizePath(path);
      if (!normPath) return false;
      const entry = this.fs.get(normPath);
      if (entry) return entry.perms[action];
      if (action === "create") {
        const parentDir = this._internalDirName(normPath);
        const parentEntry = this.fs.get(parentDir);
        if (!parentEntry) return parentDir === "/";
        return parentEntry.perms.create;
      }
      return false;
    }

    _internalClean() {
      this._log("Internal: Clearing file system...");
      const now = Date.now();
      this.fs.clear();
      this.childIndex.clear();

      this.fs.set("/", {
        content: null,
        perms: JSON.parse(JSON.stringify(defaultPerms)),
        limit: -1,
        created: now,
        modified: now,
        accessed: now,
      });
      this._ensureTrash();
      this.writeActivity = true;
      this.lastWritePath = "/";
    }

    clean() {
      this.lastError = "";
      if (!this.hasPermission("/", "delete"))
        return this._setError("Clean failed: No 'delete' permission on /");
      this._internalClean();
    }

    sync({ STR, STR2 }) {
      this.lastError = "";
      const path1 = this._normalizePath(STR);
      const path2 = this._normalizePath(STR2);
      if (!path1 || !path2) return this._setError("Invalid path provided.");
      if (path1 === "/")
        return this._setError(
          "Rename failed: Root directory cannot be renamed"
        );

      if (!this.hasPermission(path1, "delete"))
        return this._setError("Rename failed: No 'delete' permission");
      if (this.fs.has(path2))
        return this._setError("Rename failed: Destination exists");

      if (this._isPathDir(path2)) {
        if (this.fs.has(path2.slice(0, -1)))
          return this._setError("Rename failed: File collision");
      } else {
        if (this.fs.has(path2 + "/"))
          return this._setError("Rename failed: Directory collision");
      }

      if (!this.hasPermission(path2, "create"))
        return this._setError("Rename failed: No 'create' permission");

      const entry = this.fs.get(path1);
      if (!entry) return this._setError("Rename failed: Source not found");

      const isDir = this._isPathDir(path1);
      let deltaSize = 0;
      if (isDir) deltaSize = this._getDirectorySize(path1);
      else deltaSize = this._getStringSize(entry.content);

      if (!this._canAccommodateChange(path2, deltaSize)) return;

      const now = Date.now();
      const toRename = [];

      if (isDir) {
        const stack = [path1];
        while (stack.length > 0) {
          const curr = stack.pop();
          toRename.push(curr);
          const children = this.childIndex.get(curr);
          if (children) {
            for (const c of children) {
              if (this._isPathDir(c)) stack.push(c);
              else toRename.push(c);
            }
          }
        }
      } else {
        toRename.push(path1);
      }

      const path1Length = path1.length;
      for (const oldKey of toRename) {
        const entryVal = this.fs.get(oldKey);
        if (!entryVal) continue;
        const remainder = oldKey.substring(path1Length);
        const newKey = path2 + remainder;
        if (oldKey === path1) {
          entryVal.modified = now;
          entryVal.accessed = now;
        }
        this.fs.set(newKey, entryVal);
        this.fs.delete(oldKey);
        this._removeFromIndex(oldKey);

        this._addToIndex(newKey);
      }
      this.writeActivity = true;
      this.lastWritePath = path2;
    }

    copy({ STR, STR2 }) {
      this.lastError = "";
      const path1 = this._normalizePath(STR);
      const path2 = this._normalizePath(STR2);
      if (!path1 || !path2) return this._setError("Invalid path provided.");

      const entry = this.fs.get(path1);
      if (!entry) return this._setError("Copy failed: Source not found");
      if (!entry.perms.read)
        return this._setError("Copy failed: No 'read' permission");
      if (this.fs.has(path2))
        return this._setError("Copy failed: Destination exists");
      if (!this.hasPermission(path2, "create"))
        return this._setError("Copy failed: No 'create' permission");

      this.readActivity = true;
      this.lastReadPath = path1;
      const now = Date.now();
      entry.accessed = now;

      const toCopy = [];
      let totalDeltaSize = 0;

      if (this._isPathDir(path1)) {
        const stack = [path1];
        while (stack.length > 0) {
          const curr = stack.pop();
          const val = this.fs.get(curr);
          toCopy.push({
            key: curr,
            value: val,
          });
          const children = this.childIndex.get(curr);
          if (children) {
            for (const c of children) {
              if (this._isPathDir(c)) stack.push(c);
              else {
                const fVal = this.fs.get(c);
                totalDeltaSize += this._getStringSize(fVal.content);
                toCopy.push({
                  key: c,
                  value: fVal,
                });
              }
            }
          }
        }
      } else {
        totalDeltaSize = this._getStringSize(entry.content);
        toCopy.push({
          key: path1,
          value: entry,
        });
      }

      if (!this._canAccommodateChange(path2, totalDeltaSize)) return;

      const path1Length = path1.length;
      for (const item of toCopy) {
        const remainder =
          item.key === path1 ? "" : item.key.substring(path1Length);
        const newPath = path2 + remainder;
        this.fs.set(newPath, {
          content: item.value.content === null ? null : "" + item.value.content,
          perms: JSON.parse(JSON.stringify(item.value.perms)),
          limit: item.value.limit,
          created: now,
          modified: now,
          accessed: now,
        });
        this._addToIndex(newPath);
      }
      this.writeActivity = true;
      this.lastWritePath = path2;
    }

    start({ STR }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) return this._setError("Invalid path provided.");
      if (path === "/")
        return this._setError("Create failed: Cannot create root");
      if (this.fs.has(path))
        return this._setError("Create failed: Path exists");

      if (this._isPathDir(path)) {
        if (this.fs.has(path.slice(0, -1)))
          return this._setError("Create failed: File collision");
      } else {
        if (this.fs.has(path + "/"))
          return this._setError("Create failed: Directory collision");
      }

      const parentDir = this._internalDirName(path);
      if (parentDir !== "/" && !this.fs.has(parentDir)) {
        if (!this.hasPermission(parentDir, "create"))
          return this._setError("Create failed: No permission on parent");
        this.start({
          STR: parentDir,
        });
        if (this.lastError) return;
      }
      const ok = this._internalCreate(
        path,
        this._isPathDir(path) ? null : "",
        parentDir
      );
      if (!ok && !this.lastError)
        this._setError("Create failed: Internal error");
    }

    open({ STR }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) return this._setError("Invalid path");
      const entry = this.fs.get(path);
      if (!entry) return this._setError("Open failed: Not found");
      if (!entry.perms.see) return this._setError("Open failed: Hidden");
      if (this._isPathDir(path))
        return this._setError("Open failed: Is directory");
      if (!entry.perms.read) return this._setError("Open failed: Read denied");
      this.readActivity = true;
      this.lastReadPath = path;
      entry.accessed = Date.now();
      return entry.content;
    }

    del({ STR }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) return this._setError("Invalid path");
      if (path === "/")
        return this._setError("Delete failed: Cannot delete root");
      if (!this.hasPermission(path, "delete"))
        return this._setError("Delete failed: Denied");

      if (path.startsWith("/.Trash/")) {
        const toDelete = [];
        const stack = [];
        if (this._isPathDir(path)) stack.push(path);
        else toDelete.push(path);

        while (stack.length > 0) {
          const curr = stack.pop();
          toDelete.push(curr);
          const children = this.childIndex.get(curr);
          if (children) {
            for (const c of children) {
              if (this._isPathDir(c)) stack.push(c);
              else toDelete.push(c);
            }
          }
        }
        for (const key of toDelete) {
          this.fs.delete(key);
          this._removeFromIndex(key);
        }
      } else {
        this._ensureTrash();
        const name = path.endsWith("/")
          ? path.split("/").slice(-2, -1)[0] + "/"
          : path.split("/").pop();
        const trashPath = `/.Trash/${Date.now()}_${name}`;

        this.copy({
          STR: path,
          STR2: trashPath,
        });
        if (!this.lastError) {
          const toDelete = [];
          const stack = [];
          if (this._isPathDir(path)) stack.push(path);
          else toDelete.push(path);
          while (stack.length > 0) {
            const curr = stack.pop();
            toDelete.push(curr);
            const children = this.childIndex.get(curr);
            if (children) {
              for (const c of children) {
                if (this._isPathDir(c)) stack.push(c);
                else toDelete.push(c);
              }
            }
          }
          for (const key of toDelete) {
            this.fs.delete(key);
            this._removeFromIndex(key);
          }
        }
      }
      this.writeActivity = true;
      this.lastWritePath = path;
    }

    emptyTrash() {
      this.lastError = "";
      const trashPath = "/.Trash/";
      if (!this.fs.has(trashPath)) return;

      const toDelete = [];
      const stack = [trashPath];
      while (stack.length > 0) {
        const curr = stack.pop();
        toDelete.push(curr);
        const children = this.childIndex.get(curr);
        if (children) {
          for (const c of children) {
            if (this._isPathDir(c)) stack.push(c);
            else toDelete.push(c);
          }
        }
      }
      for (const key of toDelete) {
        this.fs.delete(key);
        this._removeFromIndex(key);
      }
      this._ensureTrash();
      this.writeActivity = true;
    }

    folder({ STR, STR2 }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) return this._setError("Invalid path");
      let entry = this.fs.get(path);
      if (!entry) {
        this.start({
          STR: path,
        });
        entry = this.fs.get(path);
        if (!entry) return;
      }
      if (this._isPathDir(path))
        return this._setError("Set failed: Is directory");
      if (!entry.perms.write) return this._setError("Set failed: Write denied");

      const deltaSize =
        this._getStringSize(STR2) - this._getStringSize(entry.content || "");
      if (!this._canAccommodateChange(path, deltaSize)) return;

      entry.content = STR2;
      entry.modified = Date.now();
      entry.accessed = Date.now();
      this.writeActivity = true;
      this.lastWritePath = path;
    }

    list({ TYPE, STR }) {
      this.lastError = "";
      let path = this._normalizePath(STR);
      if (!path) return "[]";
      if (!this._isPathDir(path)) path += "/";

      const entry = this.fs.get(path);
      if (!entry) return "[]";
      if (!entry.perms.see) return "[]";

      this.readActivity = true;
      this.lastReadPath = path;
      entry.accessed = Date.now();

      const childrenSet = this.childIndex.get(path);
      const results = [];
      if (childrenSet) {
        for (const childPath of childrenSet) {
          const childName = childPath.substring(path.length);
          if (TYPE === "all") results.push(childName);
          else if (TYPE === "files" && !this._isPathDir(childPath))
            results.push(childName);
          else if (TYPE === "directories" && this._isPathDir(childPath))
            results.push(childName);
        }
      }
      results.sort();
      return JSON.stringify(results);
    }

    in({ STR }) {
      this.lastError = "";
      if (!this.hasPermission("/", "delete"))
        return this._setError("Import denied");
      let data;
      try {
        data = JSON.parse(STR);
      } catch (e) {
        return this._setError("JSON Error");
      }

      const tempFS = new Map();
      const tempIndex = new Map();

      const addToTempIndex = (p) => {
        const parent = this._internalDirName(p);
        if (!tempIndex.has(parent)) tempIndex.set(parent, new Set());
        tempIndex.get(parent).add(p);
      };

      try {
        const _version = data.version || ""; // FIX: Renamed to _version to mark as intentionally unused.
        let oldData = {};
        if (data.fs) oldData = data.fs;
        else if (data.sy) {
          /* Compatibility placeholder */
        } // FIX: Added comment to satisfy no-empty lint rule.

        if (!oldData["/"]) return this._setError("Missing root");
        oldData["/"].perms = JSON.parse(JSON.stringify(defaultPerms));
        oldData["/"].limit = -1;

        for (const path in oldData) {
          if (Object.prototype.hasOwnProperty.call(oldData, path)) {
            const entry = oldData[path];
            const fixedPath = this._normalizePath(path);
            tempFS.set(fixedPath, JSON.parse(JSON.stringify(entry)));

            if (fixedPath !== "/") {
              addToTempIndex(fixedPath);
            }
          }
        }
        this.fs = tempFS;
        this.childIndex = tempIndex;
        this._ensureTrash();
        this.writeActivity = true;
        this.lastWritePath = "/";
      } catch (e) {
        this._setError("Import error: " + e.message);
      }
    }

    out() {
      this.lastError = "";
      this.readActivity = true;
      this.lastReadPath = "/";
      const fsObject = {};
      for (const [path, entry] of this.fs.entries()) {
        fsObject[path] = JSON.parse(JSON.stringify(entry));
      }
      return JSON.stringify({
        version: extensionVersion,
        fs: fsObject,
      });
    }

    exportFileBase64({ STR, FORMAT }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) return "";
      const entry = this.fs.get(path);
      if (!entry) return this._setError("Export failed: Not found");
      if (this._isPathDir(path)) return this._setError("Export failed: Is dir");
      if (!entry.perms.see || !entry.perms.read)
        return this._setError("Export failed: Denied");

      this.readActivity = true;
      this.lastReadPath = path;
      entry.accessed = Date.now();

      const b64 = this._encodeUTF8Base64(String(entry.content));
      if (FORMAT === "data_url") {
        return `data:${this._getMimeType(path)};base64,${b64}`;
      }
      return b64;
    }

    importFileBase64({ FORMAT, STR, STR2 }) {
      this.lastError = "";
      const path = this._normalizePath(STR2);
      if (!path || this._isPathDir(path)) return this._setError("Invalid path");
      if (!STR || !STR.trim()) return this._setError("Empty input");

      let base64String = STR.replace(/\s+/g, "");
      const match = base64String.match(/^data:.*?,(.*)$/);
      if (match) base64String = match[1];

      if (
        !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
          base64String
        )
      ) {
        return this._setError("Invalid Base64");
      }

      const decoded = this._decodeUTF8Base64(base64String);
      this.folder({
        STR: path,
        STR2: decoded,
      });
      if (!this.lastError) this.lastWritePath = path;
    }

    exists({ STR }) {
      const path = this._normalizePath(STR);
      if (!path) return false;
      const entry = this.fs.get(path);
      return !!(entry && entry.perms.see);
    }

    isFile({ STR }) {
      const path = this._normalizePath(STR);
      if (!path) return false;
      const entry = this.fs.get(path);
      if (!entry || !entry.perms.see) return false;
      return !this._isPathDir(path);
    }

    isDir({ STR }) {
      const path = this._normalizePath(STR);
      if (!path) return false;
      const entry = this.fs.get(path);
      if (!entry || !entry.perms.see) return false;
      return this._isPathDir(path);
    }

    fileName({ STR }) {
      const path = this._normalizePath(STR);
      if (!path) return "";
      if (path === "/") return "/";
      const entry = this.fs.get(path);
      if (!entry || !entry.perms.see) return "";

      if (this._isPathDir(path)) {
        const parts = path.split("/").filter((p) => p);
        return parts.length ? parts[parts.length - 1] : "";
      }
      return path.split("/").pop();
    }

    dirName({ STR }) {
      const path = this._normalizePath(STR);
      if (!path || path === "/") return "";
      const entry = this.fs.get(path);
      if (!entry || !entry.perms.see) return "";
      return this._internalDirName(path);
    }

    setLimit({ DIR, BYTES }) {
      this.lastError = "";
      let path = this._normalizePath(DIR);
      if (!path || path === "/" || !this._isPathDir(path))
        return this._setError("Invalid path");
      if (!this.hasPermission(path, "control")) return this._setError("Denied");
      const entry = this.fs.get(path);
      if (!entry) return this._setError("Not found");
      entry.limit = Math.max(-1, parseFloat(BYTES) || 0);
      this.writeActivity = true;
    }
    removeLimit({ DIR }) {
      this.lastError = "";
      let path = this._normalizePath(DIR);
      if (!path || path === "/" || !this._isPathDir(path))
        return this._setError("Invalid path");
      if (!this.hasPermission(path, "control")) return this._setError("Denied");
      const entry = this.fs.get(path);
      if (!entry) return this._setError("Not found");
      entry.limit = -1;
      this.writeActivity = true;
    }
    getLimit({ DIR }) {
      let path = this._normalizePath(DIR);
      if (!path) return -1;
      if (!this._isPathDir(path)) path += "/";
      const entry = this.fs.get(path);
      if (!entry || !entry.perms.see) return -1;
      return entry.limit;
    }
    getSize({ DIR }) {
      let path = this._normalizePath(DIR);
      if (!path) return 0;
      if (!this._isPathDir(path)) path += "/";
      const entry = this.fs.get(path);
      if (!entry || !entry.perms.see) return 0;
      return this._getDirectorySize(path);
    }
    setPerm({ ACTION, PERM, STR }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path || path === "/") return this._setError("Invalid");
      if (!this.hasPermission(path, "control")) return this._setError("Denied");
      const val = ACTION === "add";
      const isDir = this._isPathDir(path);
      const prefix = path.endsWith("/") ? path : path + "/";
      for (const [p, e] of this.fs.entries()) {
        if ((isDir && (p === path || p.startsWith(prefix))) || p === path)
          e.perms[PERM] = val;
      }
      this.writeActivity = true;
    }
    listPerms({ STR }) {
      const path = this._normalizePath(STR);
      if (!path) return "{}";
      const e = this.fs.get(path);
      if (!e || !e.perms.see) return "{}";
      return JSON.stringify(e.perms);
    }

    dateCreated({ STR }) {
      const p = this._normalizePath(STR);
      const e = this.fs.get(p);
      return e && e.perms.see ? new Date(e.created).toISOString() : "";
    }
    dateModified({ STR }) {
      const p = this._normalizePath(STR);
      const e = this.fs.get(p);
      return e && e.perms.see ? new Date(e.modified).toISOString() : "";
    }
    dateAccessed({ STR }) {
      const p = this._normalizePath(STR);
      const e = this.fs.get(p);
      return e && e.perms.see ? new Date(e.accessed).toISOString() : "";
    }

    wasRead() {
      const v = this.readActivity;
      this.readActivity = false;
      return v;
    }
    wasWritten() {
      const v = this.writeActivity;
      this.writeActivity = false;
      return v;
    }
    getLastReadPath() {
      return this.lastReadPath;
    }
    getLastWritePath() {
      return this.lastWritePath;
    }
    getLastError() {
      return this.lastError;
    }
    toggleLogging({ STATE }) {
      this.RubyFSLogEnabled = STATE === "on";
    }
    getVersion() {
      return extensionVersion;
    }

    runIntegrityTest() {
      const oldFS = this.fs;
      const oldIndex = this.childIndex;
      this.fs = new Map();
      this.childIndex = new Map();
      this._internalClean();
      try {
        this.start({
          STR: "/a.txt",
        });
        if (!this.childIndex.get("/").has("/a.txt"))
          throw new Error("Index failed");
        this.del({
          STR: "/a.txt",
        });

        if (this.lastError)
          throw new Error("Delete op failed: " + this.lastError);

        const trash = this.childIndex.get("/.Trash/");
        if (!trash || !trash.size) throw new Error("Trash failed");

        this.emptyTrash();

        const emptyTrash = this.childIndex.get("/.Trash/");
        if (emptyTrash && emptyTrash.size) throw new Error("Empty failed");
      } catch (e) {
        this.fs = oldFS;
        this.childIndex = oldIndex;
        return "FAIL: " + e.message;
      }
      this.fs = oldFS;
      this.childIndex = oldIndex;
      return "PASS";
    }
  }

  Scratch.extensions.register(new RubyFS());
})(Scratch);
