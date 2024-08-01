(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Indexed Database must be run unsandboxed");
  }

  class IndexedDBExtension {
    constructor() {
      this.dbName = "MyScratchDB"; // Default database name
      this.db = null;
    }

    // Set the database name
    _setDBName(name) {
      this.dbName = name;
    }

    // Initialize the IndexedDB
    _initDB() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, 1);

        request.onerror = (event) => {
          console.error("Database error:", event.target.error);
          resolve();
        };

        request.onsuccess = (event) => {
          this.db = event.target.result;
          resolve(this.db);
        };

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          db.createObjectStore("data",   
 { keyPath: "key" });
        };
      });
    }

    // Set value in the IndexedDB
    _setValue(key, value) {
      return this._initDB().then((db) => {
        const transaction = db.transaction(["data"], "readwrite");
        const store = transaction.objectStore("data");
        const request = store.put({ key, value });

        return new Promise((resolve) => {
          request.onsuccess = () => resolve();
          request.onerror = () => resolve();
        });
      });
    }

    // Get value from the IndexedDB
    _getValue(key) {
      return this._initDB().then((db) => {
        const transaction = db.transaction(["data"], "readonly");
        const store = transaction.objectStore("data");
        const request = store.get(key);

        return new Promise((resolve) => {
          request.onsuccess = () => {
            const value = request.result ? request.result.value : undefined;
            resolve(value !== undefined ? value : "");
          };

          request.onerror = () => resolve("");
        });
      });
    }

    // Delete all keys in the IndexedDB
    _deleteAllKeys() {
      return this._initDB().then((db) => {
        const transaction = db.transaction(["data"], "readwrite");
        const store = transaction.objectStore("data");
        const request = store.clear();

        return new Promise((resolve) => {
          request.onsuccess = () => resolve();
          request.onerror = () => resolve();
        });
      });
    }

    // Delete a specific key in the IndexedDB
    _deleteKey(key) {
      return this._initDB().then((db) => {
        const transaction = db.transaction(["data"], "readwrite");
        const store = transaction.objectStore("data");
        const request = store.delete(key);

        return new Promise((resolve) => {
          request.onsuccess = () => resolve();
          request.onerror = () => resolve();
        });
      });
    }

    // Check if a key exists in the IndexedDB
    _keyExists(key) {
      return this._initDB().then((db) => {
        const transaction = db.transaction(["data"], "readonly");
        const store = transaction.objectStore("data");
        const request = store.get(key);

        return new Promise((resolve) => {
          request.onsuccess = () => resolve(request.result !== undefined);
        });
      });
    }

    // Export the entire database
    _exportDB() {
      return this._initDB().then((db) => {
        const transaction = db.transaction(["data"], "readonly");
        const store = transaction.objectStore("data");
        const request = store.getAll();

        return new Promise((resolve) => {
          request.onsuccess = () => {
            const result = {};
            request.result.forEach((item) => {
              result[item.key] = item.value;
            });
            resolve(JSON.stringify(result));
          };

          request.onerror = () => {
            resolve("{}");
          };

          request.onerror = () => {
            resolve("{}");
          };
        });
      });
    }

    // Import data into the database, replacing existing data
    _importDB(data) {
      return this._deleteAllKeys().then(() => {
        const parsedData = JSON.parse(data);
        const promises = Object.keys(parsedData).map(key => {
          return this._setValue(key, parsedData[key]);
        });
        return Promise.all(promises);
      });
    }

    // Merge data into the database, without replacing existing keys
    _mergeDB(data) {
      const parsedData = JSON.parse(data);
      const promises = Object.keys(parsedData).map(key => {
        return this._keyExists(key).then(exists => {
          if (!exists) {
            return this._setValue(key, parsedData[key]);
          }
        });
      });
      return Promise.all(promises);
    }

    // Scratch blocks implementation
    getInfo() {
      return {
        id: "ffghdfhIndexedDB",
        name: "IndexedDB",
        color1: "#fd7f54", // Main block color
        color2: "#c26140",
        color3: "#b35b3d", // Slightly darker outline color
        blocks: [
          {
            opcode: "setDBName",
            blockType: Scratch.BlockType.COMMAND,
            text: "set database name [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "setValue",
            blockType: Scratch.BlockType.COMMAND,
            text: "set key [KEY] to [VALUE]",
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue:   
 "",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "getValue",
            blockType: Scratch.BlockType.REPORTER,
            text: "get key [KEY]",
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "deleteAllKeys",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete all keys",
          },
          {
            opcode: "deleteKey",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete key [KEY]",
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "keyExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "key [KEY] exists?",
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "exportDB",
            blockType: Scratch.BlockType.REPORTER,
            text: "export db",
            disableMonitor: true
          },
          {
            opcode: "importDB",
            blockType: Scratch.BlockType.COMMAND,
            text: "import db from [DATA]",
            arguments: {
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "mergeDB",
            blockType: Scratch.BlockType.COMMAND,
            text: "merge db from [DATA]",
            arguments: {
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
        ],
      };
    }

    setDBName(args) {
      const { NAME } = args;
      this._setDBName(NAME);
    }

    setValue(args) {
      const { KEY, VALUE } = args;
      return this._setValue(KEY, VALUE);
    }

    getValue(args) {
      const { KEY } = args;
      return this._getValue(KEY);
    }

    deleteAllKeys() {
      return this._deleteAllKeys();
    }

    deleteKey(args) {
      const { KEY } = args;
      return this._deleteKey(KEY);
    }

    keyExists(args) {
      const { KEY } = args;
      return this._keyExists(KEY);
    }

    exportDB() {
      return this._exportDB();
    }

    importDB(args) {
      const { DATA } = args;
      return this._importDB(DATA);
    }

    mergeDB(args) {
      const { DATA } = args;
      return this._mergeDB(DATA);
    }
  }

  Scratch.extensions.register(new IndexedDBExtension());
})(Scratch);
