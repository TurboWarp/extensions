// Name: RubyFS
// ID: rubyFS
// Description: A structured, in-memory file system for Scratch projects (Previously LiFS/Lithium FS).
// By: kx1bx1 <https://scratch.mit.edu/users/kx1bx1/>
// Original: 0832 <https://scratch.mit.edu/users/0832/>
// License: MIT

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

  const extensionVersion = "1.1.2";

  class RubyFS {
    constructor() {
      this.fs = new Map();
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
          "A structured, in-memory file system for Scratch projects (Previously LiFS/Lithium FS). (Use 'turn on console logging' for debugging.)"
        ),

        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Core Operations"), // FIX: ESLint should-translate
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
            text: Scratch.translate("File & Directory Utilities"), // FIX: ESLint should-translate
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
            text: Scratch.translate("Timestamp Utilities"), // FIX: ESLint should-translate
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
            text: Scratch.translate("Permissions & Limits"), // FIX: ESLint should-translate
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
            text: Scratch.translate("Import & Export"), // FIX: ESLint should-translate
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
                defaultValue: '{"version":"1.1.2","fs":{}}',
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
            text: Scratch.translate("Debugging & Activity"), // FIX: ESLint should-translate
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
      if (this.RubyFSLogEnabled) {
        console.log(`[RubyFS] ${message}`, ...args);
      }
    }

    _warn(message, ...args) {
      if (this.RubyFSLogEnabled) {
        console.warn(`[RubyFS] ${message}`, ...args);
      }
    }

    _setError(message, ...args) {
      this._warn(message, ...args);
      this.lastError = message;
    }

    _encodeUTF8Base64(str) {
      try {
        return btoa(str);
      } catch (e) {
        this._setError(
          `Base64 Encode Error: ${e.message}. (Note: Unicode text is not supported for export)`
        );
        return "";
      }
    }

    _decodeUTF8Base64(base64) {
      return atob(base64);
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

    _normalizePath(path) {
      if (typeof path !== "string" || !path.trim()) {
        return null;
      }

      const hadTrailingSlash = path.length > 1 && path.endsWith("/");

      if (path[0] !== "/") {
        path = "/" + path;
      }

      const segments = path.split("/");
      const newSegments = [];

      for (const segment of segments) {
        if (segment === "" || segment === ".") {
          continue;
        }

        if (segment === "..") {
          if (newSegments.length > 0) {
            newSegments.pop();
          }
        } else {
          newSegments.push(segment);
        }
      }

      let newPath = "/" + newSegments.join("/");

      if (newPath === "/") {
        return "/";
      }

      if (hadTrailingSlash) {
        newPath += "/";
      }

      return newPath;
    }

    _isPathDir(path) {
      return path === "/" || path.endsWith("/");
    }

    _internalDirName(path) {
      if (path === "/") {
        return "/";
      }

      let procPath = this._isPathDir(path)
        ? path.substring(0, path.length - 1)
        : path;

      const lastSlash = procPath.lastIndexOf("/");
      if (lastSlash === 0) {
        return "/";
      }
      if (lastSlash === -1) {
        return "/";
      }

      return procPath.substring(0, lastSlash + 1);
    }

    _getStringSize(str) {
      if (str === null || str === undefined) {
        return 0;
      }

      let length = 0;
      for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        if (charCode < 0x0080) {
          length += 1;
        } else if (charCode < 0x0800) {
          length += 2;
        } else if (charCode < 0xd800 || charCode > 0xdfff) {
          length += 3;
        } else {
          length += 4;
          i++;
        }
      }
      return length;
    }

    _getDirectorySize(dirPath) {
      let totalSize = 0;

      for (const [itemPath, entry] of this.fs.entries()) {
        if (
          !this._isPathDir(itemPath) &&
          itemPath.startsWith(dirPath) &&
          dirPath !== itemPath
        ) {
          totalSize += this._getStringSize(entry.content);
        }
      }
      return totalSize;
    }

    _canAccommodateChange(filePath, deltaSize) {
      if (deltaSize <= 0) {
        return true;
      }

      let currentDir = this._internalDirName(filePath);
      this._log(`Checking size change of ${deltaSize} bytes for ${filePath}`);

      while (true) {
        const entry = this.fs.get(currentDir);
        if (!entry) {
          this._warn(`Size check: Could not find parent dir ${currentDir}`);
          break;
        }

        const limit = entry.limit;
        if (limit !== -1) {
          const currentSize = this._getDirectorySize(currentDir);
          if (currentSize + deltaSize > limit) {
            this._setError(
              `Size limit exceeded for ${currentDir}: ${currentSize} + ${deltaSize} > ${limit}`
            );
            return false;
          }
        }

        if (currentDir === "/") {
          break;
        }
        currentDir = this._internalDirName(currentDir);
      }

      return true;
    }

    _internalCreate(path, content, parentDir) {
      if (this.fs.has(path)) {
        this._log("InternalCreate failed: Path already exists", path);

        return false;
      }

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

      if (parentEntry) {
        permsToInherit = parentEntry.perms;
      } else if (parentDir === "/") {
        permsToInherit = this.fs.get("/").perms;
      } else {
        this._warn(
          "InternalCreate: Parent not found, using default perms",
          parentDir
        );
        permsToInherit = defaultPerms;
      }

      const now = Date.now();
      this.fs.set(path, {
        content: content,
        perms: JSON.parse(JSON.stringify(permsToInherit)),
        limit: -1,
        created: now,
        modified: now,
        accessed: now,
      });
      this.writeActivity = true;
      this.lastWritePath = path;
      this._log("InternalCreate successful:", path);
      return true;
    }

    hasPermission(path, action) {
      const normPath = this._normalizePath(path);
      if (!normPath) {
        this._log("Permission check failed: Invalid path");
        return false;
      }
      this._log("Checking permission:", action, "on", normPath);

      const entry = this.fs.get(normPath);

      if (entry) {
        const result = entry.perms[action];
        this._log("Permission result:", result);
        return result;
      }

      if (action === "create") {
        const parentDir = this._internalDirName(normPath);
        const parentEntry = this.fs.get(parentDir);

        if (!parentEntry) {
          const result = parentDir === "/";
          this._log("Permission result (parent check, root):", result);
          return result;
        }
        const result = parentEntry.perms.create;
        this._log("Permission result (parent check):", result);
        return result;
      }

      this._log("Permission result (default fail):", false);
      return false;
    }

    _internalClean() {
      this._log("Internal: Clearing file system...");
      const now = Date.now();
      this.fs.clear();
      this.fs.set("/", {
        content: null,
        perms: JSON.parse(JSON.stringify(defaultPerms)),
        limit: -1,
        created: now,
        modified: now,
        accessed: now,
      });
      this._log("Internal: File system reset to root.");
      this.writeActivity = true;
      this.lastWritePath = "/";
    }

    clean() {
      this.lastError = "";
      this._log("Block: clean");
      if (!this.hasPermission("/", "delete")) {
        return this._setError("Clean failed: No 'delete' permission on /");
      }
      this._internalClean();
    }

    sync({ STR, STR2 }) {
      this.lastError = "";
      const path1 = this._normalizePath(STR);
      const path2 = this._normalizePath(STR2);
      if (!path1 || !path2) {
        return this._setError("Invalid path provided.");
      }
      this._log("Block: rename", path1, "to", path2);

      if (path1 === "/") {
        return this._setError(
          "Rename failed: Root directory cannot be renamed"
        );
      }

      if (!this.hasPermission(path1, "delete")) {
        return this._setError(
          `Rename failed: No 'delete' permission on ${path1}`
        );
      }
      if (this.fs.has(path2)) {
        return this._setError(
          `Rename failed: Destination ${path2} already exists`
        );
      }

      if (this._isPathDir(path2)) {
        if (this.fs.has(path2.slice(0, -1))) {
          return this._setError(
            `Rename failed: A file with the same name exists at ${path2.slice(0, -1)}`
          );
        }
      } else {
        if (this.fs.has(path2 + "/")) {
          return this._setError(
            `Rename failed: A directory with the same name exists at ${path2 + "/"}`
          );
        }
      }

      if (!this.hasPermission(path2, "create")) {
        return this._setError(
          `Rename failed: No 'create' permission for ${path2}`
        );
      }

      const entry = this.fs.get(path1);
      if (!entry) {
        return this._setError(`Rename failed: Source ${path1} not found`);
      }

      const isDir = this._isPathDir(path1);
      let deltaSize = 0;
      if (isDir) {
        deltaSize = this._getDirectorySize(path1);
      } else {
        deltaSize = this._getStringSize(entry.content);
      }

      if (!this._canAccommodateChange(path2, deltaSize)) {
        return;
      }

      const now = Date.now();

      if (isDir) {
        this._log("Renaming directory and children...");

        const path1Prefix = path1.endsWith("/") ? path1 : path1 + "/";

        const toRename = [];
        for (const [key, value] of this.fs.entries()) {
          if (key === path1 || key.startsWith(path1Prefix)) {
            toRename.push({
              oldKey: key,
              value: value,
            });
          }
        }

        const path1Length = path1.length;
        for (const item of toRename) {
          const remainder = item.oldKey.substring(path1Length);
          const newChildPath = path2 + remainder;

          if (item.oldKey === path1) {
            item.value.modified = now;
            item.value.accessed = now;
          }

          this.fs.set(newChildPath, item.value);
          this.fs.delete(item.oldKey);

          this._log(`Renaming: ${item.oldKey} to ${newChildPath}`);
        }
      } else {
        this._log("Renaming single file...");
        entry.modified = now;
        entry.accessed = now;
        this.fs.set(path2, entry);
        this.fs.delete(path1);
        this._log("Rename successful");
      }
      this.writeActivity = true;
      this.lastWritePath = path2;
    }

    copy({ STR, STR2 }) {
      this.lastError = "";
      const path1 = this._normalizePath(STR);
      const path2 = this._normalizePath(STR2);
      if (!path1 || !path2) {
        return this._setError("Invalid path provided.");
      }
      this._log("Block: copy", path1, "to", path2);

      const entry = this.fs.get(path1);
      if (!entry) {
        return this._setError(`Copy failed: Source ${path1} not found`);
      }

      if (!entry.perms.read) {
        return this._setError(`Copy failed: No 'read' permission on ${path1}`);
      }
      if (this.fs.has(path2)) {
        return this._setError(
          `Copy failed: Destination ${path2} already exists`
        );
      }
      if (!this.hasPermission(path2, "create")) {
        return this._setError(
          `Copy failed: No 'create' permission for ${path2}`
        );
      }

      this.readActivity = true;
      this.lastReadPath = path1;
      const now = Date.now();
      entry.accessed = now;

      if (this._isPathDir(path1)) {
        const toCopy = [];
        let totalDeltaSize = 0;
        const path1Length = path1.length;

        const path1Prefix = path1.endsWith("/") ? path1 : path1 + "/";

        for (const [key, value] of this.fs.entries()) {
          if (key === path1 || key.startsWith(path1Prefix)) {
            if (!this._isPathDir(key)) {
              totalDeltaSize += this._getStringSize(value.content);
            }
            toCopy.push({
              key,
              value,
            });
          }
        }

        if (!this._canAccommodateChange(path2, totalDeltaSize)) {
          return;
        }

        for (const item of toCopy) {
          const remainder = item.key.substring(path1Length);
          const newChildPath = path2 + remainder;

          this.fs.set(newChildPath, {
            content:
              item.value.content === null ? null : "" + item.value.content,
            perms: JSON.parse(JSON.stringify(item.value.perms)),
            limit: item.value.limit,
            created: now,
            modified: now,
            accessed: now,
          });
          this._log(`Copied ${item.key} to ${newChildPath}`);
        }
        this.writeActivity = true;
        this.lastWritePath = path2;
        this._log("Recursive copy successful");
      } else {
        const content = "" + entry.content;
        const deltaSize = this._getStringSize(content);
        if (!this._canAccommodateChange(path2, deltaSize)) {
          return;
        }

        const destParentDir = this._internalDirName(path2);
        const destParentEntry = this.fs.get(destParentDir);
        let permsToInherit = defaultPerms;

        if (destParentEntry) {
          permsToInherit = destParentEntry.perms;
        } else if (destParentDir === "/") {
          permsToInherit = this.fs.get("/").perms;
        } else {
          this._log(
            `Copy: Could not find parent "${destParentDir}", using default perms.`
          );
        }

        this.fs.set(path2, {
          content: content,
          perms: JSON.parse(JSON.stringify(permsToInherit)),
          limit: -1,
          created: now,
          modified: now,
          accessed: now,
        });
        this.writeActivity = true;
        this.lastWritePath = path2;
        this._log("Copy successful");
      }
    }

    start({ STR }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) {
        return this._setError("Invalid path provided.");
      }
      this._log("Block: create", path);

      if (path === "/") {
        return this._setError(
          "Create failed: Cannot create root directory '/'"
        );
      }

      if (this.fs.has(path)) {
        return this._setError(`Create failed: ${path} already exists`);
      }

      if (this._isPathDir(path)) {
        if (this.fs.has(path.slice(0, -1))) {
          return this._setError(
            `Create failed: A file with the same name exists at ${path.slice(0, -1)}`
          );
        }
      } else {
        if (this.fs.has(path + "/")) {
          return this._setError(
            `Create failed: A directory with the same name exists at ${path + "/"}`
          );
        }
      }

      const parentDir = this._internalDirName(path);
      if (parentDir !== "/" && !this.fs.has(parentDir)) {
        this._log("Creating parent directory:", parentDir);

        if (!this.hasPermission(parentDir, "create")) {
          return this._setError(
            `Create failed: No 'create' permission in ${this._internalDirName(parentDir)}, aborting recursive create.`
          );
        }

        this.start({
          STR: parentDir,
        });

        if (this.lastError) {
          this._log(
            "Create failed: Parent creation failed (recursive call failed)."
          );

          return;
        }
        if (!this.fs.has(parentDir)) {
          return this._setError(
            "Create failed: Parent creation failed, aborting."
          );
        }
      }

      const ok = this._internalCreate(
        path,
        this._isPathDir(path) ? null : "",
        parentDir
      );

      if (!ok) {
        this._log("Create failed: _internalCreate returned false.");

        if (!this.lastError) {
          this._setError(
            `Create failed: An internal error occurred for ${path}`
          );
        }
        return;
      }
    }

    open({ STR }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) {
        this._setError("Invalid path provided.");
        return "";
      }
      this._log("Block: open", path);

      const entry = this.fs.get(path);

      if (!entry) {
        this._log("Result: (Not found)", "");
        return "";
      }

      if (!entry.perms.see) {
        this._warn(`Read permission denied for "${path}" (cannot see)`);
        return "";
      }

      if (this._isPathDir(path)) {
        this._log("Result: (Is a directory)", "");
        return "";
      }

      if (!entry.perms.read) {
        this._warn(`Read permission denied for "${path}"`);
        return "";
      }

      this.readActivity = true;
      this.lastReadPath = path;
      entry.accessed = Date.now();

      const content = entry.content;
      this._log("Result:", content);
      return content;
    }

    del({ STR }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) {
        return this._setError("Invalid path provided.");
      }
      this._log("Block: delete", path);

      if (path === "/") {
        return this._setError(
          "Delete failed: Root directory cannot be deleted"
        );
      }

      if (!this.hasPermission(path, "delete")) {
        return this._setError(
          `Delete failed: No 'delete' permission on ${path}`
        );
      }

      const isDir = this._isPathDir(path);

      const pathPrefix = path.endsWith("/") ? path : path + "/";

      const toDelete = [];
      for (const currentPath of this.fs.keys()) {
        if (isDir) {
          if (currentPath === path || currentPath.startsWith(pathPrefix)) {
            toDelete.push(currentPath);
          }
        } else {
          if (currentPath === path) {
            toDelete.push(currentPath);
            break;
          }
        }
      }

      for (const key of toDelete) {
        this.fs.delete(key);
        this._log("Deleted:", key);
      }

      this.writeActivity = true;
      this.lastWritePath = path;
      this._log("Delete complete");
    }

    folder({ STR, STR2 }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) {
        return this._setError("Invalid path provided.");
      }
      this._log("Block: set", path, "to", STR2);

      let entry = this.fs.get(path);

      if (!entry) {
        this._log("Set: File not found, attempting to create...");
        this.start({
          STR: path,
        });
        entry = this.fs.get(path);
        if (!entry) {
          this._log("Set failed: Creation also failed");

          return;
        }
      }

      if (this._isPathDir(path)) {
        return this._setError("Set failed: Cannot set content of a directory");
      }
      if (!entry.perms.write) {
        return this._setError(`Set failed: No 'write' permission on ${path}`);
      }

      const oldContent = entry.content || "";
      const deltaSize =
        this._getStringSize(STR2) - this._getStringSize(oldContent);

      if (!this._canAccommodateChange(path, deltaSize)) {
        return;
      }

      entry.content = STR2;
      const now = Date.now();
      entry.modified = now;
      entry.accessed = now;
      this.writeActivity = true;
      this.lastWritePath = path;
      this._log("Set successful");
    }

    list({ TYPE, STR }) {
      this.lastError = "";
      let path = this._normalizePath(STR);
      if (!path) {
        this._setError("Invalid path provided.");
        return "[]";
      }
      if (!this._isPathDir(path)) {
        path += "/";
      }

      this._log("Block: list", TYPE, "under", path);
      const emptyList = "[]";

      const entry = this.fs.get(path);
      if (!entry) {
        this._log("List failed: Directory not found.");
        return emptyList;
      }

      if (!this.hasPermission(path, "see")) {
        this._log("List failed: No see permission on directory");
        return emptyList;
      }

      this.readActivity = true;
      this.lastReadPath = path;
      entry.accessed = Date.now();

      let children = new Set();
      const pathLen = path.length;

      for (const itemPath of this.fs.keys()) {
        if (itemPath === path || itemPath === "/") continue;

        if (itemPath.startsWith(path)) {
          let remainder = itemPath.substring(pathLen);
          let nextSlash = remainder.indexOf("/");
          let childName = "";
          let isDir = false;

          if (nextSlash === -1) {
            childName = remainder;
            isDir = false;
          } else {
            childName = remainder.substring(0, nextSlash + 1);
            isDir = true;
          }

          if (childName === "") continue;

          const childPath = `${path}${childName}`;
          if (!this.hasPermission(childPath, "see")) {
            this._log("List: Skipping item (no see perm):", childPath);
            continue;
          }

          if (TYPE === "all") children.add(childName);
          else if (TYPE === "files" && !isDir) children.add(childName);
          else if (TYPE === "directories" && isDir) children.add(childName);
        }
      }

      const childrenArray = Array.from(children);
      childrenArray.sort();
      this._log("List result (raw):", childrenArray);
      return JSON.stringify(childrenArray);
    }

    in({ STR }) {
      this.lastError = "";
      this._log("Block: import");
      if (!this.hasPermission("/", "delete")) {
        return this._setError("Import failed: No 'delete' permission on /");
      }

      let data;
      try {
        data = JSON.parse(STR);
      } catch (e) {
        return this._setError(
          `Import failed: JSON parse error. File system was not changed.`
        );
      }

      const tempFS = new Map();
      const now = Date.now();

      try {
        const version = data ? data.version : null;
        if (!version) {
          return this._setError(
            "Import failed: Data invalid or missing version."
          );
        }

        let _needsMigration = false; // FIX: ESLint no-unused-vars (changed to _needsMigration)
        let oldData = {};

        if (version.startsWith("1.0.") || version.startsWith("1.1.")) {
          if (data.fs) {
            if (typeof data.fs !== "object" || Array.isArray(data.fs)) {
              return this._setError(
                `Import failed: v${version} data is corrupt (missing 'fs' object).`
              );
            }
            oldData = data.fs;
          } else if (data.sy) {
            this._log(`Import: Migrating v${version} save...`);
            _needsMigration = true; // FIX: Use _needsMigration

            if (!Array.isArray(data.sl))
              data.sl = new Array(data.sy.length).fill(-1);
            if (
              !Array.isArray(data.fi) ||
              !Array.isArray(data.sy) ||
              !Array.isArray(data.pm) ||
              !Array.isArray(data.sl) ||
              data.fi.length !== data.sy.length ||
              data.fi.length !== data.pm.length ||
              data.fi.length !== data.sl.length ||
              data.sy.indexOf("/") === -1
            ) {
              return this._setError(
                "Import failed: Old version data arrays are corrupt or mismatched."
              );
            }

            for (let i = 0; i < data.sy.length; i++) {
              oldData[data.sy[i]] = {
                content: data.fi[i],
                perms: data.pm[i],
                limit: data.sl[i],
                created: now,
                modified: now,
                accessed: now,
              };
            }
          } else {
            return this._setError(
              `Import failed: v${version} data is corrupt (missing 'fs' or 'sy' key).`
            );
          }
        } else {
          return this._setError(
            `Import failed: Incompatible version "${version}".`
          );
        }

        if (!oldData["/"]) {
          return this._setError(
            "Import failed: Filesystem is missing root '/'."
          );
        }

        if (!oldData["/"].perms || typeof oldData["/"].limit !== "number") {
          return this._setError("Import failed: Root entry is malformed.");
        }
        oldData["/"].perms = JSON.parse(JSON.stringify(defaultPerms));
        oldData["/"].limit = -1;

        for (const path in oldData) {
          if (Object.prototype.hasOwnProperty.call(oldData, path)) {
            const entry = oldData[path];

            const fixedPath = this._normalizePath(path);
            if (fixedPath !== path) {
              return this._setError(
                `Import failed: Path "${path}" is not normalized (should be "${fixedPath}")`
              );
            }
            if (entry.content === null && !path.endsWith("/")) {
              return this._setError(
                `Import failed: Directory "${path}" must end with "/"`
              );
            }
            if (entry.content !== null && path.endsWith("/")) {
              return this._setError(
                `Import failed: File "${path}" must not end with "/"`
              );
            }

            if (
              !entry ||
              (typeof entry.content !== "string" && entry.content !== null) ||
              typeof entry.perms !== "object" ||
              entry.perms === null ||
              Array.isArray(entry.perms) ||
              typeof entry.limit !== "number" ||
              isNaN(entry.limit) ||
              typeof entry.created !== "number" ||
              isNaN(entry.created) ||
              typeof entry.modified !== "number" ||
              isNaN(entry.modified) ||
              typeof entry.accessed !== "number" ||
              isNaN(entry.accessed) ||
              typeof entry.perms.create !== "boolean" ||
              typeof entry.perms.delete !== "boolean" ||
              typeof entry.perms.see !== "boolean" ||
              typeof entry.perms.read !== "boolean" ||
              typeof entry.perms.write !== "boolean" ||
              typeof entry.perms.control !== "boolean"
            ) {
              return this._setError(
                `Import failed: Corrupt entry for path "${path}".`
              );
            }

            tempFS.set(path, JSON.parse(JSON.stringify(entry)));
          }
        }

        this.fs = tempFS;
        this.writeActivity = true;
        this.lastWritePath = "/";
        this._log("Import successful");
      } catch (e) {
        this._setError(
          `Import failed: An unexpected error occurred. File system was not changed. ${e.message}`
        );
      }
    }

    out() {
      this.lastError = "";
      this._log("Block: export");
      this.readActivity = true;
      this.lastReadPath = "/";

      const fsObject = {};
      for (const [path, entry] of this.fs.entries()) {
        fsObject[path] = JSON.parse(JSON.stringify(entry));
      }

      const result = JSON.stringify({
        version: extensionVersion,
        fs: fsObject,
      });
      this._log("Export successful, size:", result.length);
      return result;
    }

    exportFileBase64({ STR, FORMAT }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) {
        this._setError("Invalid path provided.");
        return ""; // FIX: Explicitly return string on error
      }
      this._log("Block: exportFileBase64", path, "as", FORMAT);

      const entry = this.fs.get(path);

      if (!entry) {
        this._setError(`Export failed: File ${path} not found`); // FIX: Changed return to assignment + return ""
        return "";
      }
      if (this._isPathDir(path)) {
        this._setError(`Export failed: ${path} is a directory`); // FIX: Changed return to assignment + return ""
        return "";
      }
      if (!entry.perms.see) {
        this._setError(`Export failed: No 'see' permission on ${path}`); // FIX: Changed return to assignment + return ""
        return "";
      }
      if (!entry.perms.read) {
        this._setError(`Export failed: No 'read' permission on ${path}`); // FIX: Changed return to assignment + return ""
        return "";
      }

      this.readActivity = true;
      this.lastReadPath = path;

      try {
        entry.accessed = Date.now();
        const content = entry.content;

        if (content === null || content === undefined) {
          this._log("Result: Empty content");
          return "";
        }

        const base64Content = this._encodeUTF8Base64(String(content));

        let result = base64Content;
        if (FORMAT === "data_url") {
          const mimeType = this._getMimeType(path);
          result = `data:${mimeType};base64,${base64Content}`;
          this._log(
            `Export successful as Data URL (${mimeType}), size:`,
            result.length
          );
        } else {
          this._log("Export successful as Base64 string, size:", result.length);
        }

        return result;
      } catch (e) {
        this._setError(
          `Export failed: Base64 encoding error: ${e.message}. (Note: Unicode text is not supported for export)`
        );
        return "";
      }
    }

    importFileBase64({ FORMAT, STR, STR2 }) {
      this.lastError = "";
      let dataString = STR;
      const path = this._normalizePath(STR2);
      if (!path) {
        return this._setError("Invalid path provided.");
      }
      this._log("Block: importFileBase64", FORMAT, "to", path);

      if (this._isPathDir(path)) {
        return this._setError("Import failed: Target path is a directory.");
      }

      try {
        if (typeof dataString !== "string" || !dataString.trim()) {
          return this._setError("Import failed: Input is empty.");
        }

        let base64String = dataString;

        const match = dataString.match(/^data:.*?,(.*)$/);
        if (match && match[1]) {
          base64String = match[1];
          this._log("Import: Stripped Data URL prefix successfully.");
        }

        base64String = base64String.replace(/\s+/g, "");
        if (!base64String) {
          return this._setError(
            "Import failed: Base64 content is empty after processing."
          );
        }
        if (
          !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
            base64String
          )
        ) {
          return this._setError(
            "Import failed: Input is not a valid Base64 string."
          );
        }

        const decodedContent = this._decodeUTF8Base64(base64String);

        this.folder({ STR: path, STR2: decodedContent });

        if (!this.lastError) {
          this.lastWritePath = path;
        }
      } catch (e) {
        this._setError(`Import failed: Base64 decoding error: ${e.message}`);
      }
    }

    exists({ STR }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) {
        return false;
      }
      this._log("Block: exists", path);

      const entry = this.fs.get(path);
      if (!entry) {
        this._log("Result: false (not found)");
        return false;
      }
      if (!entry.perms.see) {
        this._log("Result: false (no see perm)");
        return false;
      }

      this.readActivity = true;
      this.lastReadPath = path;
      entry.accessed = Date.now();

      this._log("Result: true");
      return true;
    }

    isFile({ STR }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) {
        return false;
      }
      this._log("Block: isFile", path);

      const entry = this.fs.get(path);
      if (!entry) {
        this._log("Result: false (not found)");
        return false;
      }
      if (!entry.perms.see) {
        this._log("Result: false (no see perm)");
        return false;
      }

      this.readActivity = true;
      this.lastReadPath = path;
      entry.accessed = Date.now();

      const result = !this._isPathDir(path);
      this._log("Result:", result);
      return result;
    }

    isDir({ STR }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) {
        return false;
      }
      this._log("Block: isDir", path);

      const entry = this.fs.get(path);
      if (!entry) {
        this._log("Result: false (not found)");
        return false;
      }
      if (!entry.perms.see) {
        this._log("Result: false (no see perm)");
        return false;
      }

      this.readActivity = true;
      this.lastReadPath = path;
      entry.accessed = Date.now();

      const result = this._isPathDir(path);
      this._log("Result:", result);
      return result;
    }

    setPerm({ ACTION, PERM, STR }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) {
        return this._setError("Invalid path provided.");
      }
      this._log("Block: setPerm", ACTION, PERM, "for", path);

      if (path === "/") {
        return this._setError(
          "setPerm failed: Permissions for root directory cannot be changed"
        );
      }

      if (!this.fs.has(path)) {
        return this._setError(`setPerm failed: Path ${path} not found`);
      }

      if (!this.hasPermission(path, "control")) {
        return this._setError(
          `setPerm failed: No 'control' permission on ${path}`
        );
      }

      const newValue = ACTION === "add";
      const isDir = this._isPathDir(path);
      const now = Date.now();

      const pathPrefix = path.endsWith("/") ? path : path + "/";

      this._log("Applying changes...");
      for (const [currentPath, entry] of this.fs.entries()) {
        if (
          (isDir &&
            (currentPath === path || currentPath.startsWith(pathPrefix))) ||
          currentPath === path
        ) {
          entry.perms[PERM] = newValue;
          entry.modified = now;
          entry.accessed = now;
          this._log("Changed perm for:", currentPath);
        }
      }
      this.writeActivity = true;
      this.lastWritePath = path;
      this._log("setPerm complete");
    }

    listPerms({ STR }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) {
        return JSON.stringify({});
      }
      this._log("Block: listPerms", path);

      const entry = this.fs.get(path);
      if (!entry) {
        this._log("Result: {} (not found)");
        return JSON.stringify({});
      }

      if (!entry.perms.see) {
        this._warn(`See permission denied for "${path}"`);
        return JSON.stringify({});
      }

      this.readActivity = true;
      this.lastReadPath = path;
      entry.accessed = Date.now();

      const result = JSON.stringify(entry.perms);
      this._log("Result:", result);
      return result;
    }

    fileName({ STR }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) {
        return "";
      }
      this._log("Block: fileName", path);

      if (!this.hasPermission(path, "see")) {
        this._warn(`See permission denied for "${path}"`);
        return "";
      }

      this.readActivity = true;
      this.lastReadPath = path;
      const entry = this.fs.get(path);
      if (entry) entry.accessed = Date.now();

      if (path === "/") {
        this._log("Result: /");
        return "/";
      }

      let procPath = this._isPathDir(path)
        ? path.substring(0, path.length - 1)
        : path;

      const lastSlash = procPath.lastIndexOf("/");
      if (lastSlash === -1) {
        this._log("Result (no slash):", procPath);
        return procPath;
      }
      const file = procPath.substring(lastSlash + 1);
      this._log("Result:", file);
      return file;
    }

    dirName({ STR }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) {
        return "";
      }
      this._log("Block: dirName", path);

      if (!this.hasPermission(path, "see")) {
        this._warn(`See permission denied for "${path}"`);
        return "";
      }

      this.readActivity = true;
      this.lastReadPath = path;
      const entry = this.fs.get(path);
      if (entry) entry.accessed = Date.now();

      const parent = this._internalDirName(path);
      this._log("Result:", parent);
      return parent;
    }

    toggleLogging({ STATE }) {
      this.lastError = "";
      this.RubyFSLogEnabled = STATE === "on";
      this._log("Console logging turned", STATE);
    }

    setLimit({ DIR, BYTES }) {
      this.lastError = "";
      let path = this._normalizePath(DIR);
      if (!path) {
        return this._setError("Invalid path provided.");
      }

      if (path === "/") {
        return this._setError(
          "setLimit failed: Size limit for root directory cannot be changed"
        );
      }

      if (!this._isPathDir(path)) {
        return this._setError(
          `setLimit failed: Path ${path} must be a directory (end with /)`
        );
      }

      this._log("Block: setLimit", path, "to", BYTES, "bytes");

      if (!this.hasPermission(path, "control")) {
        return this._setError(
          `setLimit failed: No 'control' permission on ${path}`
        );
      }
      const entry = this.fs.get(path);
      if (!entry) {
        return this._setError(`setLimit failed: Path ${path} not found`);
      }

      const limitInBytes = Math.max(-1, parseFloat(BYTES) || 0);

      if (limitInBytes !== -1) {
        const currentSize = this._getDirectorySize(path);
        if (currentSize > limitInBytes) {
          return this._setError(
            `setLimit failed: New limit (${limitInBytes} B) is smaller than current directory size (${currentSize} B)`
          );
        }
      }

      const now = Date.now();
      entry.limit = limitInBytes;
      entry.modified = now;
      entry.accessed = now;
      this.writeActivity = true;
      this.lastWritePath = path;
      this._log("setLimit successful");
    }

    removeLimit({ DIR }) {
      this.lastError = "";
      let path = this._normalizePath(DIR);
      if (!path) {
        return this._setError("Invalid path provided.");
      }

      if (path === "/") {
        return this._setError(
          "removeLimit failed: Size limit for root directory cannot be changed"
        );
      }

      if (!this._isPathDir(path)) {
        return this._setError(
          `removeLimit failed: Path ${path} must be a directory (end with /)`
        );
      }

      this._log("Block: removeLimit", path);

      if (!this.hasPermission(path, "control")) {
        return this._setError(
          `removeLimit failed: No 'control' permission on ${path}`
        );
      }
      const entry = this.fs.get(path);
      if (!entry) {
        return this._setError(`removeLimit failed: Path ${path} not found`);
      }

      const now = Date.now();
      entry.limit = -1;
      entry.modified = now;
      entry.accessed = now;
      this.writeActivity = true;
      this.lastWritePath = path;
      this._log("removeLimit successful");
    }

    getLimit({ DIR }) {
      this.lastError = "";
      let path = this._normalizePath(DIR);
      if (!path) {
        return -1;
      }
      if (!this._isPathDir(path)) {
        path += "/";
      }

      this._log("Block: getLimit", path);

      if (!this.hasPermission(path, "see")) {
        this._warn(`getLimit failed: No 'see' permission for "${path}"`);
        return -1;
      }

      const entry = this.fs.get(path);
      if (!entry) {
        this._warn(`getLimit failed: Path ${path} not found`);
        return -1;
      }

      this.readActivity = true;
      this.lastReadPath = path;
      entry.accessed = Date.now();

      const limitInBytes = entry.limit;
      this._log("getLimit result:", limitInBytes, "bytes");
      return limitInBytes;
    }

    getSize({ DIR }) {
      this.lastError = "";
      let path = this._normalizePath(DIR);
      if (!path) {
        return 0;
      }
      if (!this._isPathDir(path)) {
        path += "/";
      }

      this._log("Block: getSize", path);

      if (!this.hasPermission(path, "see")) {
        this._warn(`getSize failed: No 'see' permission for "${path}"`);
        return 0;
      }

      const entry = this.fs.get(path);
      if (!entry) {
        this._warn(`getSize failed: Path ${path} not found`);
        return 0;
      }

      this.readActivity = true;
      this.lastReadPath = path;
      entry.accessed = Date.now();

      const sizeInBytes = this._getDirectorySize(path);
      this._log("getSize result:", sizeInBytes, "bytes");
      return sizeInBytes;
    }

    _getTimestamp(path, type) {
      const entry = this.fs.get(path);
      if (!entry) {
        this._warn(`Timestamp check failed: ${path} not found.`);
        return "";
      }
      if (!entry.perms.see) {
        this._warn(`Timestamp check failed: No 'see' permission on ${path}.`);
        return "";
      }

      this.readActivity = true;
      this.lastReadPath = path;
      entry.accessed = Date.now();

      const timestamp = entry[type];
      return new Date(timestamp).toISOString();
    }

    dateCreated({ STR }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) {
        return "";
      }
      return this._getTimestamp(path, "created");
    }

    dateModified({ STR }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) {
        return "";
      }
      return this._getTimestamp(path, "modified");
    }

    dateAccessed({ STR }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) {
        return "";
      }
      return this._getTimestamp(path, "accessed");
    }

    getLastError() {
      return this.lastError;
    }

    wasRead() {
      const val = this.readActivity;
      this.readActivity = false;
      return val;
    }

    wasWritten() {
      const val = this.writeActivity;
      this.writeActivity = false;
      return val;
    }

    getLastReadPath() {
      return this.lastReadPath;
    }

    getLastWritePath() {
      return this.lastWritePath;
    }

    getVersion() {
      return extensionVersion;
    }

    runIntegrityTest() {
      const oldFS = this.fs;
      const oldLogState = this.RubyFSLogEnabled;
      this.RubyFSLogEnabled = true;
      this._log("--- RFS SELF-TEST STARTING ---");
      this._internalClean();

      let testsPassed = 0;
      const totalTests = 12;

      try {
        this.start({ STR: "/test/a.txt" });
        if (!this.fs.has("/test/a.txt")) throw new Error("Create file failed");
        testsPassed++;

        this.folder({ STR: "/test/a.txt", STR2: "hello" });
        if (this.fs.get("/test/a.txt").content !== "hello")
          throw new Error("Write content failed");
        testsPassed++;

        const content = this.open({ STR: "/test/a.txt" });
        if (content !== "hello") throw new Error("Read content failed");
        testsPassed++;

        this.sync({ STR: "/test/a.txt", STR2: "/test/b.txt" });
        if (this.fs.has("/test/a.txt") || !this.fs.has("/test/b.txt"))
          throw new Error("Rename failed");
        testsPassed++;

        this.copy({ STR: "/test/b.txt", STR2: "/copy.txt" });
        if (this.fs.get("/copy.txt").content !== "hello")
          throw new Error("Copy failed");
        testsPassed++;

        this.start({ STR: "/limited/" });
        this.setLimit({ DIR: "/limited/", BYTES: 10 });
        this.folder({ STR: "/limited/copy.txt", STR2: "hello world" });
        if (this.lastError === "")
          throw new Error("Size limit did not trigger error");
        testsPassed++;

        this.setPerm({ ACTION: "remove", PERM: "write", STR: "/test/b.txt" });
        this.folder({ STR: "/test/b.txt", STR2: "fail" });
        if (this.lastError === "")
          throw new Error("Permission block did not trigger error");
        testsPassed++;

        this.del({ STR: "/test/b.txt" });
        if (this.fs.has("/test/b.txt")) throw new Error("Delete failed");
        testsPassed++;

        this.del({ STR: "/" });
        if (this.lastError === "")
          throw new Error("Root deletion block failed");
        testsPassed++;

        const b64 = this._encodeUTF8Base64("test_data_123");
        this.importFileBase64({
          FORMAT: "base64",
          STR: b64,
          STR2: "/ascii.txt",
        });
        const rt = this.open({ STR: "/ascii.txt" });
        if (rt !== "test_data_123") throw new Error("Base64 roundtrip failed");
        testsPassed++;

        this.start({ STR: "/list_test/" });
        this.start({ STR: "/list_test/file.txt" });
        const listJSON = this.list({ TYPE: "all", STR: "/list_test/" });
        if (listJSON !== '["file.txt"]')
          throw new Error(`list() as JSON failed, got: ${listJSON}`);
        testsPassed++;

        const dataURL = this.exportFileBase64({
          STR: "/ascii.txt",
          FORMAT: "data_url",
        });
        if (!dataURL.startsWith("data:text/plain;base64,"))
          throw new Error("MIME type export failed");
        testsPassed++;
      } catch (e) {
        this.fs = oldFS;
        this.RubyFSLogEnabled = oldLogState;
        this.lastError = "";
        this._warn(`--- RFS SELF-TEST FAILED ---`, e.message);
        return `FAIL: ${e.message}`;
      }

      this.fs = oldFS;
      this.RubyFSLogEnabled = oldLogState;
      this.lastError = "";
      this._log(`--- RFS SELF-TEST PASSED: ${testsPassed}/${totalTests} ---`);
      return `PASS (${testsPassed}/${totalTests})`;
    }
  }

  Scratch.extensions.register(new RubyFS());
})(Scratch);
