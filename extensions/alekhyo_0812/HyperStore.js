// Name: HyperStore
// ID: hyperstore
// Description: High-performance multidimensional arrays, tensors, and bulk math operations.
// By: Alekhyo Biswas <https://scratch.mit.edu/users/alekhyo-0812>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  class HyperStore {
    constructor() {
      this.stores = {};
      this.meta = {
        version: "1.0.0",
        authors: ["Alekhyo Biswas"],
        lastError: "None",
        lastAccessed: "",
      };
    }

    getInfo() {
      return {
        id: "hyperstore",
        name: Scratch.translate("HyperStore"),
        color1: "#ff4c4c",
        color2: "#cc3333",
        color3: "#992626",
        docsURI:
          "https://alekhyo-biswas.github.io/HyperStore-TurboWarp-Extension/",
        blocks: [
          // --- CATEGORY: DEVELOPER ---
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("For The Developer"),
          },
          {
            opcode: "getMetaInfo",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("extension [FIELD]"),
            arguments: {
              FIELD: { type: Scratch.ArgumentType.STRING, menu: "metaFields" },
            },
          },
          {
            opcode: "logStore",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("debug: log [ID] to JS console"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "grid1" },
            },
          },
          {
            opcode: "logAll",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("debug: log all stores to console"),
          },
          {
            opcode: "getLastError",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("debug: last error message"),
          },
          {
            opcode: "clearError",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("debug: clear error log"),
          },
          {
            opcode: "getStoreCount",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("debug: active store count"),
          },
          {
            opcode: "getTotalMemory",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("debug: approx memory usage (items)"),
          },
          {
            opcode: "getLastAccessed",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("debug: last accessed ID"),
          },
          {
            opcode: "getStoreType",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("debug: type of [ID] (Fixed/Dynamic)"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "grid1" },
            },
          },
          {
            opcode: "isStoreEmpty",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("debug: is [ID] empty/zeroed?"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "grid1" },
            },
          },
          {
            opcode: "pruneStores",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("debug: delete all empty stores"),
          },
          {
            opcode: "setSafeMode",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("debug: set safe mode [BOOL]"),
            arguments: {
              BOOL: { type: Scratch.ArgumentType.STRING, menu: "booleans" },
            },
          },
          {
            opcode: "simulateLag",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("debug: simulate lag [MS]ms"),
            arguments: {
              MS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "getDevelopers",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("list of developers (JSON)"),
          },

          // --- CATEGORY: MANAGEMENT ---
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Storage Management"),
          },
          {
            opcode: "createFixed",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "create fixed [ID] shape [SHAPE] (Clipped)"
            ),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "grid1" },
              SHAPE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "10,10",
              },
            },
          },
          {
            opcode: "createDynamic",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "create dynamic [ID] with [DIMS] dimensions (Infinite)"
            ),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "grid1" },
              DIMS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
            },
          },
          {
            opcode: "deleteStore",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete storage [ID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "grid1" },
            },
          },
          {
            opcode: "deleteAll",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete all storage"),
          },
          {
            opcode: "storeExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("storage [ID] exists?"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "grid1" },
            },
          },
          {
            opcode: "getShape",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("shape of [ID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "grid1" },
            },
          },

          // --- CATEGORY: DATA ACCESS ---
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Data Access"),
          },
          {
            opcode: "setValue",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set value at [COORDS] in [ID] to [VAL]"),
            arguments: {
              COORDS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0,0",
              },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "grid1" },
              VAL: { type: Scratch.ArgumentType.STRING, defaultValue: "hello" },
            },
          },
          {
            opcode: "getValue",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get value at [COORDS] from [ID]"),
            arguments: {
              COORDS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0,0",
              },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "grid1" },
            },
          },
          {
            opcode: "fillStore",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("fill [ID] with [VAL]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "grid1" },
              VAL: { type: Scratch.ArgumentType.STRING, defaultValue: "0" },
            },
          },

          // --- CATEGORY: STRUCTURE ---
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Structure & Math"),
          },
          {
            opcode: "reshapeStore",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("reshape [ID] to [SHAPE]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "grid1" },
              SHAPE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "100,1",
              },
            },
          },
          {
            opcode: "flattenStore",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("flatten [ID] into new storage [NEWID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "grid1" },
              NEWID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "flat1",
              },
            },
          },
          {
            opcode: "applyOp",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("apply [OP] to all in [ID] with value [N]"),
            arguments: {
              OP: { type: Scratch.ArgumentType.STRING, menu: "mathOps" },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "grid1" },
              N: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
            },
          },

          // --- CATEGORY: I/O ---
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("I/O & Lists"),
          },
          {
            opcode: "exportJSON",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("export [ID] as JSON"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "grid1" },
            },
          },
          {
            opcode: "importJSON",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("import JSON [JSON] into [ID]"),
            arguments: {
              JSON: { type: Scratch.ArgumentType.STRING, defaultValue: "{}" },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "grid1" },
            },
          },
          {
            opcode: "dumpToList",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("dump [ID] to Scratch List [LIST]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "grid1" },
              LIST: { type: Scratch.ArgumentType.STRING, menu: "projectLists" },
            },
          },
          {
            opcode: "loadFromList",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "load [ID] from Scratch List [LIST] shape [SHAPE]"
            ),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "grid1" },
              LIST: { type: Scratch.ArgumentType.STRING, menu: "projectLists" },
              SHAPE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "10,10",
              },
            },
          },
        ],
        menus: {
          mathOps: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("Add"), value: "Add" },
              { text: Scratch.translate("Subtract"), value: "Subtract" },
              { text: Scratch.translate("Multiply"), value: "Multiply" },
              { text: Scratch.translate("Divide"), value: "Divide" },
              { text: Scratch.translate("Modulo"), value: "Modulo" },
              { text: Scratch.translate("Power"), value: "Power" },
            ],
          },
          metaFields: {
            acceptReporters: true,
            items: ["Version", "Author", "Platform"],
          },
          booleans: {
            acceptReporters: true,
            items: ["true", "false"],
          },
          projectLists: {
            acceptReporters: true,
            items: "getProjectLists",
          },
        },
      };
    }

    // --- HELPER: PLATFORM DETECTION ---
    _getEnvironment() {
      if (typeof window === "undefined") return "Unknown (Headless)";

      // 1. Detect Desktop (Electron App)
      // Most reliable check for the desktop wrapper
      if (
        window.navigator &&
        window.navigator.userAgent &&
        window.navigator.userAgent.includes("Electron")
      ) {
        return "Desktop App";
      }

      // 2. Detect Web Host via URL
      const host = window.location.hostname;

      if (host.includes("turbowarp.org")) return "TurboWarp Web";
      if (host.includes("penguinmod.com")) return "PenguinMod";
      if (host.includes("snail-ide")) return "Snail IDE";
      if (host.includes("electramod")) return "ElectraMod";
      if (host.includes("localhost") || host.includes("127.0.0.1")) {
        return "Local Environment";
      }

      // 3. Fallback for unknown domains / embeds
      return "Web (" + host + ")";
    }

    // --- UTILS ---

    _parseShape(str) {
      return String(str)
        .split(",")
        .map((n) => parseInt(n) || 1);
    }

    _parseCoords(str) {
      return String(str)
        .split(",")
        .map((n) => parseInt(n) || 0);
    }

    _setError(msg) {
      this.meta.lastError = msg;
    }

    _getFlatIndex(coords, shape) {
      let index = 0;
      let stride = 1;
      for (let i = shape.length - 1; i >= 0; i--) {
        const c = coords[i] || 0;
        if (c < 0 || c >= shape[i]) return -1;
        index += c * stride;
        stride *= shape[i];
      }
      return index;
    }

    _indexToCoords(index, shape) {
      let coords = new Array(shape.length);
      let s = 1;
      let strides = new Array(shape.length);
      for (let i = shape.length - 1; i >= 0; i--) {
        strides[i] = s;
        s *= shape[i];
      }
      for (let i = 0; i < shape.length; i++) {
        coords[i] = Math.floor(index / strides[i]);
        index %= strides[i];
      }
      return coords.join(",");
    }

    _expandStore(store, targetCoords) {
      let newShape = [...store.shape];
      let changed = false;

      for (let i = 0; i < targetCoords.length; i++) {
        if (targetCoords[i] >= newShape[i]) {
          newShape[i] = targetCoords[i] + 1;
          changed = true;
        }
      }

      if (!changed) return;

      const newSize = newShape.reduce((a, b) => a * b, 1);
      const newData = new Array(newSize).fill(0);

      for (let i = 0; i < store.data.length; i++) {
        let coords = this._indexToCoords(i, store.shape).split(",").map(Number);
        let newIdx = this._getFlatIndex(coords, newShape);
        newData[newIdx] = store.data[i];
      }

      store.shape = newShape;
      store.data = newData;
    }

    // --- MENU HANDLER ---

    getProjectLists() {
      const lists = [];
      if (Scratch.vm && Scratch.vm.runtime) {
        const targets = Scratch.vm.runtime.targets;
        for (const target of targets) {
          const targetLists = Object.values(target.variables).filter(
            (v) => v.type === "list"
          );
          for (const list of targetLists) {
            lists.push({
              text: `${target.isStage ? "Stage" : target.getName()}: ${
                list.name
              }`,
              value: list.name,
            });
          }
        }
      }
      return lists.length > 0
        ? lists
        : [{ text: Scratch.translate("(No Lists Found)"), value: "" }];
    }

    // --- DEVELOPER BLOCKS ---

    getMetaInfo(args) {
      if (args.FIELD === "Version") return this.meta.version;
      if (args.FIELD === "Author") return this.meta.authors.join(", ");
      if (args.FIELD === "Platform") return this._getEnvironment();
      return "";
    }

    logStore(args) {
      const s = this.stores[args.ID];
      console.log(`[HyperStore Debug] ${args.ID}:`, s ? s : "Not Found");
    }

    logAll() {
      console.log("[HyperStore Dump]", this.stores);
    }
    getLastError() {
      return this.meta.lastError;
    }
    clearError() {
      this.meta.lastError = "None";
    }
    getStoreCount() {
      return Object.keys(this.stores).length;
    }

    getTotalMemory() {
      let count = 0;
      Object.values(this.stores).forEach((s) => (count += s.data.length));
      return count;
    }

    getLastAccessed() {
      return this.meta.lastAccessed;
    }

    getStoreType(args) {
      const s = this.stores[args.ID];
      if (!s) return "None";
      return s.mode === "dynamic" ? "Dynamic" : "Fixed";
    }

    isStoreEmpty(args) {
      const s = this.stores[args.ID];
      if (!s) return true;
      return s.data.every((v) => v == 0);
    }

    pruneStores() {
      for (const key in this.stores) {
        if (this.stores[key].data.every((v) => v == 0)) {
          delete this.stores[key];
        }
      }
    }

    setSafeMode(args) {
      this.meta.safeMode = args.BOOL === "true";
    }

    simulateLag(args) {
      const start = Date.now();
      while (Date.now() - start < args.MS) {}
    }

    getDevelopers() {
      return JSON.stringify(this.meta.authors);
    }

    // --- CORE IMPL ---

    createFixed(args) {
      const shape = this._parseShape(args.SHAPE);
      const size = shape.reduce((a, b) => a * b, 1);
      this.stores[args.ID] = {
        mode: "fixed",
        shape: shape,
        data: new Array(size).fill(0),
      };
      this.meta.lastAccessed = args.ID;
    }

    createDynamic(args) {
      const dims = parseInt(args.DIMS) || 2;
      const initialShape = new Array(dims).fill(1);
      this.stores[args.ID] = {
        mode: "dynamic",
        shape: initialShape,
        data: [0],
      };
      this.meta.lastAccessed = args.ID;
    }

    deleteStore(args) {
      delete this.stores[args.ID];
    }
    deleteAll() {
      this.stores = {};
    }
    storeExists(args) {
      return !!this.stores[args.ID];
    }

    getShape(args) {
      const s = this.stores[args.ID];
      this.meta.lastAccessed = args.ID;
      return s ? s.shape.join(",") : "";
    }

    setValue(args) {
      const id = args.ID;
      const s = this.stores[id];
      this.meta.lastAccessed = id;
      if (!s) {
        this._setError(`Store ${id} not found`);
        return;
      }

      const coords = this._parseCoords(args.COORDS);

      if (coords.length !== s.shape.length) {
        this._setError(
          `Dimension mismatch. Store is ${s.shape.length}D, coords are ${coords.length}D`
        );
        return;
      }

      if (s.mode === "fixed") {
        const idx = this._getFlatIndex(coords, s.shape);
        if (idx === -1) return;
        s.data[idx] = args.VAL;
      } else if (s.mode === "dynamic") {
        let needsExpansion = false;
        for (let i = 0; i < coords.length; i++) {
          if (coords[i] >= s.shape[i]) needsExpansion = true;
        }

        if (needsExpansion) {
          this._expandStore(s, coords);
        }

        const idx = this._getFlatIndex(coords, s.shape);
        s.data[idx] = args.VAL;
      }
    }

    getValue(args) {
      const s = this.stores[args.ID];
      this.meta.lastAccessed = args.ID;
      if (!s) return "";

      const coords = this._parseCoords(args.COORDS);
      const idx = this._getFlatIndex(coords, s.shape);

      if (idx === -1 || idx >= s.data.length) return "";
      return s.data[idx];
    }

    fillStore(args) {
      const s = this.stores[args.ID];
      if (s) s.data.fill(args.VAL);
    }

    reshapeStore(args) {
      const s = this.stores[args.ID];
      if (!s) return;
      const newShape = this._parseShape(args.SHAPE);
      const newSize = newShape.reduce((a, b) => a * b, 1);
      if (newSize === s.data.length) s.shape = newShape;
      else this._setError("Reshape failed: Total element count must match");
    }

    flattenStore(args) {
      const s = this.stores[args.ID];
      if (!s) return;
      this.stores[args.NEWID] = {
        mode: "fixed",
        shape: [s.data.length],
        data: [...s.data],
      };
    }

    applyOp(args) {
      const s = this.stores[args.ID];
      if (!s) return;
      const n = Number(args.N);
      for (let i = 0; i < s.data.length; i++) {
        let v = Number(s.data[i]);
        if (args.OP === "Add") v += n;
        else if (args.OP === "Subtract") v -= n;
        else if (args.OP === "Multiply") v *= n;
        else if (args.OP === "Divide") v /= n;
        else if (args.OP === "Modulo") v %= n;
        else if (args.OP === "Power") v = Math.pow(v, n);
        s.data[i] = v;
      }
    }

    // --- I/O IMPL ---

    exportJSON(args) {
      const s = this.stores[args.ID];
      return s ? JSON.stringify(s) : "{}";
    }

    importJSON(args) {
      try {
        const obj = JSON.parse(args.JSON);
        if (obj.shape && obj.data) this.stores[args.ID] = obj;
      } catch (e) {
        this._setError("JSON Import Failed");
      }
    }

    dumpToList(args, util) {
      const s = this.stores[args.ID];
      if (!s) return;
      const listVar = util.target.lookupVariableByNameAndType(
        args.LIST,
        "list"
      );
      if (listVar) {
        listVar.value = [...s.data];
      } else {
        this._setError("Target List not found");
      }
    }

    loadFromList(args, util) {
      const listVar = util.target.lookupVariableByNameAndType(
        args.LIST,
        "list"
      );
      if (!listVar) {
        this._setError("Target List not found");
        return;
      }
      const shape = this._parseShape(args.SHAPE);
      const size = shape.reduce((a, b) => a * b, 1);

      const newData = new Array(size).fill(0);
      for (let i = 0; i < size && i < listVar.value.length; i++) {
        newData[i] = listVar.value[i];
      }

      this.stores[args.ID] = {
        mode: "fixed",
        shape: shape,
        data: newData,
      };
    }
  }

  Scratch.extensions.register(new HyperStore());
})(Scratch);
