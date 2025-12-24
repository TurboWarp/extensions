// Name: RubyFS
// ID: rubyFS
// Description: A structured, in-memory file system for Scratch projects. (Consolidated Version)
// By: kx1bx1 <https://scratch.mit.edu/users/kx1bx1/>
// Original: 0832 <https://scratch.mit.edu/users/0832/>
// License: MIT

// Version: 1.5.1
// - Removed Hat Block/Event system completely
// - Fixed linting errors (translations, case scope, unused vars)

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

  const extensionVersion = "1.5.1";

  class RubyFS {
    constructor() {
      // Main Persistent Storage
      this.fs = new Map();
      this.childIndex = new Map();

      // Volatile RamDisk Storage
      this.ramfs = new Map();
      this.ramIndex = new Map();

      this.RubyFSLogEnabled = false;
      this.lastError = "";
      this.readActivity = false;
      this.writeActivity = false;
      this.lastReadPath = "";
      this.lastWritePath = "";

      // VM Hook
      this.runtime = Scratch.vm ? Scratch.vm.runtime : null;

      this._log("Initializing RubyFS v1.5.1...");
      this._internalClean();

      if (this.runtime) {
        this.runtime.on("PROJECT_START", () => {
          this._log("Project start: Clearing RamDisk...");
          this.clearRamdisk();
        });
      }
    }

    getInfo() {
      return {
        id: "rubyFS",
        name: Scratch.translate("RubyFS"),
        color1: "#d52246",
        color2: "#a61734",
        color3: "#7f1026",
        description: Scratch.translate(
          "A structured, in-memory file system. Use /RAM/ for volatile storage."
        ),
        blocks: [
          // --- Main Operations ---
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("File Operations"),
          },
          {
            opcode: "fsManage",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[ACTION] [STR] [STR2]"),
            arguments: {
              ACTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "MANAGE_MENU",
              },
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/file.txt",
              },
              STR2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "data / destination",
              },
            },
          },
          {
            opcode: "open",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("read content of [STR]"),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/file.txt",
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
            opcode: "listGlob",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "list [TYPE] matching [PATTERN] in [DIR] as JSON"
            ),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "LIST_TYPE_MENU",
                defaultValue: "all",
              },
              PATTERN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "*.txt",
              },
              DIR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/",
              },
            },
          },
          {
            opcode: "fsClear",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("clear [TARGET]"),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "CLEAR_MENU" },
            },
          },

          // --- Information & Checks ---
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Info & Checks"),
          },
          {
            opcode: "fsCheck",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("check if [STR] [CONDITION]"),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/file.txt",
              },
              CONDITION: {
                type: Scratch.ArgumentType.STRING,
                menu: "CHECK_MENU",
              },
            },
          },
          {
            opcode: "fsGet",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get [ATTRIBUTE] of [STR]"),
            arguments: {
              ATTRIBUTE: {
                type: Scratch.ArgumentType.STRING,
                menu: "GET_MENU",
              },
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/file.txt",
              },
            },
          },

          // --- Metadata (Tags) ---
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Metadata (Tags)"),
          },
          {
            opcode: "setTag",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set tag [KEY] to [VALUE] for [PATH]"),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "author",
              },
              VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: "me" },
              PATH: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/file.txt",
              },
            },
          },
          {
            opcode: "getTag",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get tag [KEY] of [PATH]"),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "author",
              },
              PATH: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/file.txt",
              },
            },
          },
          {
            opcode: "deleteTag",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete tag [KEY] of [PATH]"),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "author",
              },
              PATH: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/file.txt",
              },
            },
          },

          // --- Permissions ---
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Permissions"),
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
              BYTES: { type: Scratch.ArgumentType.NUMBER, defaultValue: 8192 },
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

          // --- Import/Export ---
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Import & Export"),
          },
          {
            opcode: "in",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("import file system from [STR]"),
            arguments: {
              STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"version":"1.5.1","fs":{}}',
              },
            },
          },
          {
            opcode: "out",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("export file system"),
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
              STR: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
              STR2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/RubyFS/imported.txt",
              },
            },
          },

          // --- Debugging ---
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Debugging"),
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
            opcode: "runIntegrityTest",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("run integrity test"),
          },
        ],
        menus: {
          MANAGE_MENU: {
            acceptReporters: true,
            items: [
              { text: "create", value: "create" },
              { text: "delete", value: "delete" },
              { text: "set content to", value: "set" },
              { text: "copy to", value: "copy" },
              { text: "rename to", value: "rename" },
            ],
          },
          CLEAR_MENU: {
            acceptReporters: true,
            items: [
              { text: "filesystem", value: "all" },
              { text: "trash", value: "trash" },
              { text: "ramdisk", value: "ram" },
            ],
          },
          CHECK_MENU: {
            acceptReporters: true,
            items: [
              { text: "exists", value: "exists" },
              { text: "is file", value: "file" },
              { text: "is directory", value: "directory" },
              { text: "was read", value: "read" },
              { text: "was written", value: "written" },
            ],
          },
          GET_MENU: {
            acceptReporters: true,
            items: [
              { text: "file name", value: "name" },
              { text: "directory path", value: "dir" },
              { text: "size (bytes)", value: "size" },
              { text: "size limit", value: "limit" },
              { text: "hash (checksum)", value: "hash" },
              { text: "tree structure", value: "tree" },
              { text: "date created", value: "created" },
              { text: "date modified", value: "modified" },
              { text: "date accessed", value: "accessed" },
              { text: "last read path", value: "lastRead" },
              { text: "last write path", value: "lastWrite" },
              { text: "last error", value: "error" },
              { text: "version", value: "version" },
            ],
          },
          LIST_TYPE_MENU: {
            acceptReporters: true,
            items: ["all", "files", "directories"],
          },
          PERM_ACTION_MENU: { acceptReporters: true, items: ["add", "remove"] },
          PERM_TYPE_MENU: {
            acceptReporters: true,
            items: ["create", "delete", "see", "read", "write", "control"],
          },
          LOG_STATE_MENU: { acceptReporters: true, items: ["on", "off"] },
          BASE64_FORMAT_MENU: {
            acceptReporters: true,
            items: [
              { text: "Base64 String", value: "base64" },
              { text: "Data URL", value: "data_url" },
            ],
          },
        },
      };
    }

    // --- CONSOLIDATED DISPATCHERS ---

    // Default value for STR2 fixes validation error
    fsManage({ ACTION, STR, STR2 = "" }) {
      switch (ACTION) {
        case "create":
          this.start({ STR });
          break;
        case "delete":
          this.del({ STR });
          break;
        case "set":
          this.setContent({ STR, STR2 });
          break;
        case "copy":
          this.copy({ STR, STR2 });
          break;
        case "rename":
          this.sync({ STR, STR2 });
          break;
        default:
          this._setError(`Unknown action: ${ACTION}`);
      }
    }

    fsClear({ TARGET }) {
      if (TARGET === "trash") this.emptyTrash();
      else if (TARGET === "ram") this.clearRamdisk();
      else this.clean();
    }

    fsCheck({ STR, CONDITION }) {
      const path = this._normalizePath(STR);
      switch (CONDITION) {
        case "exists":
          return this._exists(path);
        case "file":
          return this._isFile(path);
        case "directory":
          return this._isDir(path);
        case "read": {
          const r = this.readActivity;
          this.readActivity = false;
          return r;
        }
        case "written": {
          const w = this.writeActivity;
          this.writeActivity = false;
          return w;
        }
        default:
          return false;
      }
    }

    fsGet({ ATTRIBUTE, STR }) {
      if (ATTRIBUTE === "lastRead") return this.lastReadPath;
      if (ATTRIBUTE === "lastWrite") return this.lastWritePath;
      if (ATTRIBUTE === "error") return this.lastError;
      if (ATTRIBUTE === "version") return extensionVersion;

      const path = this._normalizePath(STR);
      if (!path) return "";

      switch (ATTRIBUTE) {
        case "name":
          return this._fileName(path);
        case "dir":
          return this._dirName(path);
        case "size":
          return this.getSize({ DIR: path });
        case "limit":
          return this.getLimit({ DIR: path });
        case "hash":
          return this.getHash({ PATH: path });
        case "tree":
          return this.getTree({ DIR: path });
        case "created":
          return this._getTimestamp(path, "created");
        case "modified":
          return this._getTimestamp(path, "modified");
        case "accessed":
          return this._getTimestamp(path, "accessed");
        default:
          return "";
      }
    }

    // --- INTERNAL IMPLEMENTATIONS ---

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

    _getStore(path) {
      if (path.startsWith("/RAM/"))
        return { fs: this.ramfs, index: this.ramIndex, isRam: true };
      return { fs: this.fs, index: this.childIndex, isRam: false };
    }

    _addToIndex(path) {
      const parent = this._internalDirName(path);
      const parentStore = this._getStore(parent);

      // Virtual entry for /RAM/ in Main Root index
      if (parent === "/" && path === "/RAM/") {
        if (!this.childIndex.has("/")) this.childIndex.set("/", new Set());
        this.childIndex.get("/").add("/RAM/");
        return;
      }
      if (!parentStore.index.has(parent))
        parentStore.index.set(parent, new Set());
      parentStore.index.get(parent).add(path);
    }

    _removeFromIndex(path) {
      const parent = this._internalDirName(path);
      const parentStore = this._getStore(parent);
      if (parent === "/" && path === "/RAM/") return;
      if (parentStore.index.has(parent))
        parentStore.index.get(parent).delete(path);
      const store = this._getStore(path);
      if (store.index.has(path)) store.index.delete(path);
    }

    _ensureTrash() {
      if (!this.fs.has("/.Trash/")) {
        const now = Date.now();
        this.fs.set("/.Trash/", {
          content: null,
          perms: JSON.parse(JSON.stringify(defaultPerms)),
          limit: -1,
          tags: {},
          created: now,
          modified: now,
          accessed: now,
        });
        this._addToIndex("/.Trash/");
        if (!this.childIndex.has("/.Trash/"))
          this.childIndex.set("/.Trash/", new Set());
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
        } else newSegments.push(segment);
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
      const store = this._getStore(dirPath);
      const stack = [dirPath];
      while (stack.length > 0) {
        const currentPath = stack.pop();
        const children = store.index.get(currentPath);
        if (children) {
          for (const child of children) {
            const entry = store.fs.get(child);
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
        const store = this._getStore(currentDir);
        const entry = store.fs.get(currentDir);
        // Cross-FS: Stop at /RAM/ root
        if (currentDir === "/RAM/") break;
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
      const store = this._getStore(path);
      if (store.fs.has(path)) return false;
      const parentStore = this._getStore(parentDir);

      if (path === "/RAM/") return false; // System root

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
      const parentEntry = parentStore.fs.get(parentDir);
      if (parentEntry) permsToInherit = parentEntry.perms;
      else if (parentDir === "/") permsToInherit = this.fs.get("/").perms;
      else permsToInherit = defaultPerms;

      const now = Date.now();
      // DEEP COPY WARNING: Use JSON.parse/stringify to break reference link for permissions
      store.fs.set(path, {
        content: content,
        perms: JSON.parse(JSON.stringify(permsToInherit)),
        limit: -1,
        tags: {},
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
      const store = this._getStore(normPath);
      const entry = store.fs.get(normPath);
      if (entry) return entry.perms[action];
      if (action === "create") {
        const parentDir = this._internalDirName(normPath);
        if (parentDir === "/") {
          const root = this.fs.get("/");
          return root ? root.perms.create : defaultPerms.create;
        }
        if (parentDir === "/RAM/") {
          const ramRoot = this.ramfs.get("/RAM/");
          return ramRoot ? ramRoot.perms.create : defaultPerms.create;
        }

        const parentStore = this._getStore(parentDir);
        const parentEntry = parentStore.fs.get(parentDir);
        if (!parentEntry) return false;
        return parentEntry.perms.create;
      }
      return false;
    }

    _internalClean() {
      const now = Date.now();
      this.fs.clear();
      this.childIndex.clear();
      this.fs.set("/", {
        content: null,
        perms: JSON.parse(JSON.stringify(defaultPerms)),
        limit: -1,
        tags: {},
        created: now,
        modified: now,
        accessed: now,
      });
      this.clearRamdisk();
      this.writeActivity = true;
      this.lastWritePath = "/";
    }

    clearRamdisk() {
      const now = Date.now();
      this.ramfs.clear();
      this.ramIndex.clear();
      this.ramfs.set("/RAM/", {
        content: null,
        perms: JSON.parse(JSON.stringify(defaultPerms)),
        limit: -1,
        tags: {},
        created: now,
        modified: now,
        accessed: now,
      });
      if (!this.childIndex.has("/")) this.childIndex.set("/", new Set());
      this.childIndex.get("/").add("/RAM/");
      this._ensureTrash();
      this.writeActivity = true;
    }

    clean() {
      this.lastError = "";
      if (!this.hasPermission("/", "delete"))
        return this._setError("Clean failed: No 'delete' permission on /");
      this._internalClean();
    }

    // --- HELPER ACCESSORS FOR DISPATCHERS ---

    _exists(path) {
      if (!path) return false;
      const store = this._getStore(path);
      const entry = store.fs.get(path);
      return !!(entry && entry.perms.see);
    }

    _isFile(path) {
      if (!path) return false;
      const store = this._getStore(path);
      const entry = store.fs.get(path);
      if (!entry || !entry.perms.see) return false;
      return !this._isPathDir(path);
    }

    _isDir(path) {
      if (!path) return false;
      const store = this._getStore(path);
      const entry = store.fs.get(path);
      if (!entry || !entry.perms.see) return false;
      return this._isPathDir(path);
    }

    _fileName(path) {
      if (!path || path === "/") return "/";
      const store = this._getStore(path);
      const entry = store.fs.get(path);
      if (!entry || !entry.perms.see) return "";
      if (this._isPathDir(path)) {
        const parts = path.split("/").filter((p) => p);
        return parts.length ? parts[parts.length - 1] : "";
      }
      return path.split("/").pop();
    }

    _dirName(path) {
      if (!path || path === "/") return "";
      const store = this._getStore(path);
      const entry = store.fs.get(path);
      if (!entry || !entry.perms.see) return "";
      return this._internalDirName(path);
    }

    // --- OPERATIONAL METHODS ---

    start({ STR }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) return this._setError("Invalid path provided.");
      if (path === "/")
        return this._setError("Create failed: Cannot create root");

      const store = this._getStore(path);
      if (store.fs.has(path))
        return this._setError("Create failed: Path exists");

      if (this._isPathDir(path)) {
        if (store.fs.has(path.slice(0, -1)))
          return this._setError("Create failed: File collision");
      } else {
        if (store.fs.has(path + "/"))
          return this._setError("Create failed: Directory collision");
      }

      const parentDir = this._internalDirName(path);
      const parentStore = this._getStore(parentDir);

      if (parentDir !== "/" && parentDir !== "/RAM/") {
        const pEntry = parentStore.fs.get(parentDir);
        if (pEntry && !pEntry.perms.see)
          return this._setError("Create failed: Parent hidden");
      }

      if (
        parentDir !== "/" &&
        parentDir !== "/RAM/" &&
        !parentStore.fs.has(parentDir)
      ) {
        if (!this.hasPermission(parentDir, "create"))
          return this._setError("Create failed: No permission on parent");
        this.start({ STR: parentDir });
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

      const store = this._getStore(path);
      const entry = store.fs.get(path);

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
      if (path === "/" || path === "/RAM/")
        return this._setError("Delete failed: Cannot delete root/mount");
      if (!this.hasPermission(path, "delete"))
        return this._setError("Delete failed: Denied");

      const store = this._getStore(path);

      if (path.startsWith("/.Trash/")) {
        // Permanent
        const toDelete = [];
        const stack = [];
        if (this._isPathDir(path)) stack.push(path);
        else toDelete.push(path);
        while (stack.length > 0) {
          const curr = stack.pop();
          toDelete.push(curr);
          const children = store.index.get(curr);
          if (children) {
            for (const c of children) {
              if (this._isPathDir(c)) stack.push(c);
              else toDelete.push(c);
            }
          }
        }
        for (const key of toDelete) {
          store.fs.delete(key);
          this._removeFromIndex(key);
        }
      } else {
        // Move to Trash
        this._ensureTrash();
        const name = path.endsWith("/")
          ? path.split("/").slice(-2, -1)[0] + "/"
          : path.split("/").pop();
        const trashPath = `/.Trash/${Date.now()}_${name}`;

        this.copy({ STR: path, STR2: trashPath }); // Cross-FS aware copy

        if (!this.lastError) {
          const toDelete = [];
          const stack = [];
          if (this._isPathDir(path)) stack.push(path);
          else toDelete.push(path);
          while (stack.length > 0) {
            const curr = stack.pop();
            toDelete.push(curr);
            const children = store.index.get(curr);
            if (children) {
              for (const c of children) {
                if (this._isPathDir(c)) stack.push(c);
                else toDelete.push(c);
              }
            }
          }
          for (const key of toDelete) {
            store.fs.delete(key);
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

    // Renamed from 'folder' to 'setContent'
    setContent({ STR, STR2 }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) return this._setError("Invalid path");

      const store = this._getStore(path);
      let entry = store.fs.get(path);
      if (!entry) {
        this.start({ STR: path });
        entry = store.fs.get(path);
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

    // RESTORED 'list' method
    list({ TYPE, STR }) {
      this.lastError = "";
      let path = this._normalizePath(STR);
      if (!path) return "[]";
      if (!this._isPathDir(path)) path += "/";

      const store = this._getStore(path);
      const entry = store.fs.get(path);
      if (!entry) {
        this._setError("List failed: Directory not found");
        return "[]";
      }
      if (!entry.perms.see) {
        this._setError("List failed: Directory hidden");
        return "[]";
      }

      this.readActivity = true;
      this.lastReadPath = path;
      entry.accessed = Date.now();

      const childrenSet = store.index.get(path);
      const results = [];
      if (childrenSet) {
        for (const childPath of childrenSet) {
          const childEntry = store.fs.get(childPath);
          if (!childEntry || !childEntry.perms.see) continue;

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

    sync({ STR, STR2 }) {
      this.lastError = "";
      const path1 = this._normalizePath(STR);
      const path2 = this._normalizePath(STR2);
      if (!path1 || !path2) return this._setError("Invalid path provided.");
      if (path1 === "/" || path1 === "/RAM/")
        return this._setError("Rename failed: Root/Mount cannot be renamed");

      const store1 = this._getStore(path1);
      const store2 = this._getStore(path2);

      // Cross-FS? Use Copy+Delete
      if (store1.isRam !== store2.isRam) {
        this.copy({ STR, STR2 });
        if (this.lastError) return;
        this.del({ STR });
        return;
      }

      if (!this.hasPermission(path1, "delete"))
        return this._setError("Rename failed: No 'delete' permission");
      if (store2.fs.has(path2))
        return this._setError("Rename failed: Destination exists");

      if (this._isPathDir(path2)) {
        if (store2.fs.has(path2.slice(0, -1)))
          return this._setError("Rename failed: File collision");
      } else {
        if (store2.fs.has(path2 + "/"))
          return this._setError("Rename failed: Directory collision");
      }

      if (!this.hasPermission(path2, "create"))
        return this._setError("Rename failed: No 'create' permission");

      const entry = store1.fs.get(path1);
      if (!entry) return this._setError("Rename failed: Source not found");

      const isDir = this._isPathDir(path1);
      let deltaSize = 0;
      if (isDir) deltaSize = this._getDirectorySize(path1);
      else deltaSize = this._getStringSize(entry.content);

      if (!this._canAccommodateChange(path2, deltaSize)) return;

      const now = Date.now();
      const toRename = [];
      const stack = [];

      if (isDir) {
        stack.push(path1);
        while (stack.length > 0) {
          const curr = stack.pop();
          toRename.push(curr);
          const children = store1.index.get(curr);
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
        const entryVal = store1.fs.get(oldKey);
        if (!entryVal) continue;
        const remainder = oldKey.substring(path1Length);
        const newKey = path2 + remainder;
        if (oldKey === path1) {
          entryVal.modified = now;
          entryVal.accessed = now;
        }
        store1.fs.set(newKey, entryVal);
        store1.fs.delete(oldKey);
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

      const store1 = this._getStore(path1);
      const store2 = this._getStore(path2);

      const entry = store1.fs.get(path1);
      if (!entry) return this._setError("Copy failed: Source not found");
      if (!entry.perms.read)
        return this._setError("Copy failed: No 'read' permission");
      if (store2.fs.has(path2))
        return this._setError("Copy failed: Destination exists");
      if (!this.hasPermission(path2, "create"))
        return this._setError("Copy failed: No 'create' permission");

      this.readActivity = true;
      this.lastReadPath = path1;
      const now = Date.now();
      entry.accessed = now;

      const toCopy = [];
      let totalDeltaSize = 0;
      const stack = [];

      if (this._isPathDir(path1)) {
        stack.push(path1);
        while (stack.length > 0) {
          const curr = stack.pop();
          const val = store1.fs.get(curr);
          toCopy.push({ key: curr, value: val });
          const children = store1.index.get(curr);
          if (children) {
            for (const c of children) {
              if (this._isPathDir(c)) stack.push(c);
              else {
                const fVal = store1.fs.get(c);
                totalDeltaSize += this._getStringSize(fVal.content);
                toCopy.push({ key: c, value: fVal });
              }
            }
          }
        }
      } else {
        totalDeltaSize = this._getStringSize(entry.content);
        toCopy.push({ key: path1, value: entry });
      }

      if (!this._canAccommodateChange(path2, totalDeltaSize)) return;

      const path1Length = path1.length;
      for (const item of toCopy) {
        const remainder =
          item.key === path1 ? "" : item.key.substring(path1Length);
        const newPath = path2 + remainder;
        store2.fs.set(newPath, {
          content: item.value.content === null ? null : "" + item.value.content,
          perms: JSON.parse(JSON.stringify(item.value.perms)),
          limit: item.value.limit,
          tags: JSON.parse(JSON.stringify(item.value.tags || {})),
          created: now,
          modified: now,
          accessed: now,
        });
        this._addToIndex(newPath);
      }
      this.writeActivity = true;
      this.lastWritePath = path2;
    }

    _getTimestamp(path, type) {
      const store = this._getStore(path);
      const entry = store.fs.get(path);
      if (!entry || !entry.perms.see) return "";
      this.readActivity = true;
      this.lastReadPath = path;
      entry.accessed = Date.now();
      return new Date(entry[type]).toISOString();
    }

    toggleLogging({ STATE }) {
      this.RubyFSLogEnabled = STATE === "on";
    }
    getVersion() {
      return extensionVersion;
    }

    setLimit({ DIR, BYTES }) {
      this.lastError = "";
      let path = this._normalizePath(DIR);
      if (!path || path === "/" || !this._isPathDir(path))
        return this._setError("Invalid path");
      if (!this.hasPermission(path, "control")) return this._setError("Denied");
      const store = this._getStore(path);
      const entry = store.fs.get(path);
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
      const store = this._getStore(path);
      const entry = store.fs.get(path);
      if (!entry) return this._setError("Not found");
      entry.limit = -1;
      this.writeActivity = true;
    }
    getLimit({ DIR }) {
      let path = this._normalizePath(DIR);
      if (!path) return -1;
      if (!this._isPathDir(path)) path += "/";
      const store = this._getStore(path);
      const entry = store.fs.get(path);
      if (!entry || !entry.perms.see) return -1;
      return entry.limit;
    }
    getSize({ DIR }) {
      let path = this._normalizePath(DIR);
      if (!path) return 0;
      if (!this._isPathDir(path)) path += "/";
      const store = this._getStore(path);
      const entry = store.fs.get(path);
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
      const store = this._getStore(path);
      for (const [p, e] of store.fs.entries()) {
        if ((isDir && (p === path || p.startsWith(prefix))) || p === path)
          e.perms[PERM] = val;
      }
      this.writeActivity = true;
    }
    listPerms({ STR }) {
      const path = this._normalizePath(STR);
      if (!path) return "{}";
      const store = this._getStore(path);
      const e = store.fs.get(path);
      if (!e || !e.perms.see) return "{}";
      return JSON.stringify(e.perms);
    }

    // --- Base64 & Import/Export ---
    _encodeUTF8Base64(str) {
      try {
        return btoa(str);
      } catch (e) {
        try {
          return btoa(
            encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (m, p1) =>
              String.fromCharCode(parseInt(p1, 16))
            )
          );
        } catch (e2) {
          this._setError(`Base64 Error: ${e2.message}`);
          return "";
        }
      }
    }
    _decodeUTF8Base64(base64) {
      try {
        return decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
      } catch (e) {
        return atob(base64);
      }
    }
    _getMimeType(path) {
      const ext = path.split(".").pop().toLowerCase();
      const mimes = {
        txt: "text/plain",
        json: "application/json",
        svg: "image/svg+xml",
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        gif: "image/gif",
        zip: "application/zip",
        sprite3: "application/x-zip-compressed",
        sb3: "application/x-zip-compressed",
        wav: "audio/wav",
        mp3: "audio/mpeg",
      };
      return mimes[ext] || "application/octet-stream";
    }

    out() {
      this.lastError = "";
      this.readActivity = true;
      this.lastReadPath = "/";
      const fsObject = {};
      for (const [path, entry] of this.fs.entries()) {
        fsObject[path] = JSON.parse(JSON.stringify(entry));
      }
      return JSON.stringify({ version: extensionVersion, fs: fsObject });
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

      // Virtual /RAM/ in main index
      if (!tempIndex.has("/")) tempIndex.set("/", new Set());
      tempIndex.get("/").add("/RAM/");

      try {
        // const version = data.version || ""; // REMOVED unused var
        let oldData = {};
        if (data.fs) oldData = data.fs;
        else if (data.sy) {
          /* Migration skipped */
        }

        if (!oldData["/"]) return this._setError("Missing root");
        oldData["/"].perms = JSON.parse(JSON.stringify(defaultPerms));
        oldData["/"].limit = -1;

        for (const path in oldData) {
          if (Object.prototype.hasOwnProperty.call(oldData, path)) {
            if (path.startsWith("/RAM/")) continue; // Skip RAM in imports
            const entry = oldData[path];
            if (!entry.tags) entry.tags = {}; // Ensure tags exist
            const fixedPath = this._normalizePath(path);
            tempFS.set(fixedPath, JSON.parse(JSON.stringify(entry)));
            // FIX: Do not add root to the index to avoid infinite recursion
            if (fixedPath !== "/") {
              addToTempIndex(fixedPath);
            }
          }
        }
        this.fs = tempFS;
        this.childIndex = tempIndex;
        this._ensureTrash();
        this.clearRamdisk();
        this.writeActivity = true;
        this.lastWritePath = "/";
      } catch (e) {
        this._setError("Import error: " + e.message);
      }
    }

    exportFileBase64({ STR, FORMAT }) {
      this.lastError = "";
      const path = this._normalizePath(STR);
      if (!path) return "";

      const store = this._getStore(path);
      const entry = store.fs.get(path);
      if (!entry) return this._setError("Export failed: Not found");
      if (this._isPathDir(path)) return this._setError("Export failed: Is dir");
      if (!entry.perms.see || !entry.perms.read)
        return this._setError("Export failed: Denied");

      this.readActivity = true;
      this.lastReadPath = path;
      entry.accessed = Date.now();
      const b64 = this._encodeUTF8Base64(String(entry.content));
      if (FORMAT === "data_url")
        return `data:${this._getMimeType(path)};base64,${b64}`;
      return b64;
    }

    importFileBase64({ FORMAT, STR, STR2 }) {
      this.lastError = "";
      const path = this._normalizePath(STR2);
      if (!path || this._isPathDir(path)) return this._setError("Invalid path");
      if (!STR || !STR.trim()) return this._setError("Empty input");
      let base64String =
        STR.replace(/\s+/g, "").match(/^data:.*?,(.*)$/)?.[1] ||
        STR.replace(/\s+/g, "");
      if (
        !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
          base64String
        )
      )
        return this._setError("Invalid Base64");
      const decoded = this._decodeUTF8Base64(base64String);
      this.setContent({ STR: path, STR2: decoded }); // Updated call
      if (!this.lastError) this.lastWritePath = path;
    }

    // --- Tags ---
    setTag({ KEY, VALUE, PATH }) {
      this.lastError = "";
      const path = this._normalizePath(PATH);
      if (!path) return this._setError("Invalid path");
      const store = this._getStore(path);
      const entry = store.fs.get(path);
      if (!entry) return this._setError("Path not found");
      if (!entry.perms.write) return this._setError("Write denied");
      entry.tags[KEY] = VALUE;
      entry.modified = Date.now();
      this.writeActivity = true;
      this.lastWritePath = path;
    }

    getTag({ KEY, PATH }) {
      this.lastError = "";
      const path = this._normalizePath(PATH);
      if (!path) return "";
      const store = this._getStore(path);
      const entry = store.fs.get(path);
      if (!entry || !entry.perms.see) return "";
      return entry.tags[KEY] || "";
    }

    deleteTag({ KEY, PATH }) {
      this.lastError = "";
      const path = this._normalizePath(PATH);
      if (!path) return this._setError("Invalid path");
      const store = this._getStore(path);
      const entry = store.fs.get(path);
      if (!entry) return this._setError("Path not found");
      if (!entry.perms.write) return this._setError("Write denied");
      delete entry.tags[KEY];
      entry.modified = Date.now();
      this.writeActivity = true;
      this.lastWritePath = path;
    }

    // --- New Features (Glob, Hash, Tree) ---

    listGlob({ TYPE, PATTERN, DIR }) {
      this.lastError = "";
      let path = this._normalizePath(DIR);
      if (!path) return "[]";
      if (!this._isPathDir(path)) path += "/";
      const store = this._getStore(path);
      const entry = store.fs.get(path);
      if (!entry || !entry.perms.see) return "[]";
      this.readActivity = true;
      this.lastReadPath = path;

      const childrenSet = store.index.get(path);
      const results = [];
      // Regex conversion
      const regexBody = PATTERN.split("")
        .map((c) => {
          if (c === "*") return ".*";
          if (c === "?") return ".";
          if (/[.+^${}()|[\]\\]/.test(c)) return "\\" + c;
          return c;
        })
        .join("");
      const regex = new RegExp(`^${regexBody}$`);

      if (childrenSet) {
        for (const childPath of childrenSet) {
          const childEntry = store.fs.get(childPath);
          if (!childEntry || !childEntry.perms.see) continue;
          const childName = childPath.substring(path.length);
          if (regex.test(childName)) {
            if (TYPE === "all") results.push(childName);
            else if (TYPE === "files" && !this._isPathDir(childPath))
              results.push(childName);
            else if (TYPE === "directories" && this._isPathDir(childPath))
              results.push(childName);
          }
        }
      }
      results.sort();
      return JSON.stringify(results);
    }

    getHash({ PATH }) {
      const content = this.open({ STR: PATH });
      if (typeof content !== "string" || content === "") return "0";
      let hash = 0x811c9dc5;
      for (let i = 0; i < content.length; i++) {
        hash ^= content.charCodeAt(i);
        hash = Math.imul(hash, 0x01000193);
      }
      return (hash >>> 0).toString(16);
    }

    getTree({ DIR }) {
      let path = this._normalizePath(DIR);
      if (!this._isPathDir(path)) path += "/";
      const store = this._getStore(path);
      const rootEntry = store.fs.get(path);
      if (!rootEntry || !rootEntry.perms.see) return "Path not found";

      let output = path + "\n";
      const treeStack = [];
      const rootChildren = Array.from(store.index.get(path) || [])
        .filter((p) => {
          const e = store.fs.get(p);
          return e && e.perms.see;
        })
        .sort();

      for (let i = rootChildren.length - 1; i >= 0; i--) {
        treeStack.push({
          path: rootChildren[i],
          prefix: "",
          isLast: i === rootChildren.length - 1,
        });
      }

      while (treeStack.length > 0) {
        const { path: currentPath, prefix, isLast } = treeStack.pop();
        const name = currentPath
          .substring(this._internalDirName(currentPath).length)
          .replace("/", "");
        output += prefix + (isLast ? "└── " : "├── ") + name + "\n";
        if (this._isPathDir(currentPath)) {
          const children = Array.from(store.index.get(currentPath) || [])
            .filter((p) => {
              const e = store.fs.get(p);
              return e && e.perms.see;
            })
            .sort();
          const newPrefix = prefix + (isLast ? "    " : "│   ");
          for (let i = children.length - 1; i >= 0; i--) {
            treeStack.push({
              path: children[i],
              prefix: newPrefix,
              isLast: i === children.length - 1,
            });
          }
        }
      }
      return output;
    }

    runIntegrityTest() {
      const oldFS = this.fs;
      const oldIndex = this.childIndex;
      const oldRamFS = this.ramfs;
      const oldRamIndex = this.ramIndex;
      this.fs = new Map();
      this.childIndex = new Map();
      this.ramfs = new Map();
      this.ramIndex = new Map();
      this._internalClean();

      try {
        this.fsManage({ ACTION: "create", STR: "/a.txt", STR2: "" });
        if (!this.fsCheck({ STR: "/a.txt", CONDITION: "exists" }))
          throw new Error("Create failed");
        this.fsManage({ ACTION: "delete", STR: "/a.txt", STR2: "" });
        if (this.fsCheck({ STR: "/a.txt", CONDITION: "exists" }))
          throw new Error("Delete failed");

        if (this.lastError)
          throw new Error("Manage op failed: " + this.lastError);

        const trash = this.childIndex.get("/.Trash/");
        if (!trash || !trash.size) throw new Error("Trash failed");
        this.fsClear({ TARGET: "trash" });
        const empty = this.childIndex.get("/.Trash/");
        if (empty && empty.size) throw new Error("Empty failed");

        // New Feature Tests
        this.fsManage({ ACTION: "create", STR: "/RAM/temp.txt", STR2: "" });
        if (!this.ramfs.has("/RAM/temp.txt")) throw new Error("RamDisk failed");

        this.setTag({ KEY: "foo", VALUE: "bar", PATH: "/RAM/temp.txt" });
        if (this.getTag({ KEY: "foo", PATH: "/RAM/temp.txt" }) !== "bar")
          throw new Error("Tag failed");

        // List check
        const listResult = JSON.parse(this.list({ TYPE: "all", STR: "/RAM/" }));
        if (!listResult.includes("temp.txt")) throw new Error("List failed");
      } catch (e) {
        this.fs = oldFS;
        this.childIndex = oldIndex;
        this.ramfs = oldRamFS;
        this.ramIndex = oldRamIndex;
        return "FAIL: " + e.message;
      }
      this.fs = oldFS;
      this.childIndex = oldIndex;
      this.ramfs = oldRamFS;
      this.ramIndex = oldRamIndex;
      return "PASS";
    }
  }

  Scratch.extensions.register(new RubyFS());
})(Scratch);
