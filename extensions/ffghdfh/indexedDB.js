// Name: Indexed Database
// ID: ffghdfh-IndexedDB
// Description: Lets you use an IndexedDB database, allowing for you to store more than 5MB of data locally.
// License: LGPL-3.0
(function(Scratch) {
    "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Indexed Database must be run unsandboxed");
  }

class IndexedDBExtension {
  constructor() {
    this.dbName = 'MyScratchDB'; // Default database name
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
          console.error('Database error:', event.target.error);
          reject(event.target.error);
        };
  
        request.onsuccess = (event) => {
          this.db = event.target.result;
          resolve(this.db);
        };
  
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          db.createObjectStore('data', { keyPath: 'key' });
        };
      });
    }
  
    // Set value in the IndexedDB
    _setValue(key, value) {
      return this._initDB().then((db) => {
        const transaction = db.transaction(['data'], 'readwrite');
        const store = transaction.objectStore('data');
        const request = store.put({ key, value });
  
        return new Promise((resolve, reject) => {
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
      });
    }
  
    // Get value from the IndexedDB
    _getValue(key) {
      return this._initDB().then((db) => {
        const transaction = db.transaction(['data'], 'readonly');
        const store = transaction.objectStore('data');
        const request = store.get(key);
  
        return new Promise((resolve, reject) => {
          request.onsuccess = () => resolve(request.result ? request.result.value : null);
          request.onerror = () => reject(request.error);
        });
      });
    }
  
    // Delete all keys in the IndexedDB
    _deleteAllKeys() {
      return this._initDB().then((db) => {
        const transaction = db.transaction(['data'], 'readwrite');
        const store = transaction.objectStore('data');
        const request = store.clear();
  
        return new Promise((resolve, reject) => {
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
      });
    }
  
    // Delete a specific key in the IndexedDB
    _deleteKey(key) {
      return this._initDB().then((db) => {
        const transaction = db.transaction(['data'], 'readwrite');
        const store = transaction.objectStore('data');
        const request = store.delete(key);
  
        return new Promise((resolve, reject) => {
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
      });
    }
  
    // Check if a key exists in the IndexedDB
    _keyExists(key) {
      return this._initDB().then((db) => {
        const transaction = db.transaction(['data'], 'readonly');
        const store = transaction.objectStore('data');
        const request = store.get(key);
  
        return new Promise((resolve) => {
          request.onsuccess = () => resolve(request.result !== undefined);
        });
      });
    }
  
    // Scratch blocks implementation
    getInfo() {
      return {
        id: 'IndexedDB',
        name: 'IndexedDB',
        blocks: [
          {
            opcode: 'setDBName',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set database name [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'MyScratchDB',
              },
            },
            color1: '#fd7f54', // Main block color
            color3: '#cc6e45', // Slightly darker outline color
          },
          {
            opcode: 'setValue',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set key [KEY] to [VALUE]',
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'myKey',
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'myValue',
              },
            },
            color1: '#fd7f54', // Main block color
            color3: '#cc6e45', // Slightly darker outline color
          },
          {
            opcode: 'getValue',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get value for key [KEY]',
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'myKey',
              },
            },
            color1: '#fd7f54', // Main block color
            color3: '#cc6e45', // Slightly darker outline color
          },
          {
            opcode: 'deleteAllKeys',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete all keys',
            color1: '#fd7f54', // Main block color
            color3: '#cc6e45', // Slightly darker outline color
          },
          {
            opcode: 'deleteKey',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete key [KEY]',
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'myKey',
              },
            },
            color1: '#fd7f54', // Main block color
            color3: '#cc6e45', // Slightly darker outline color
          },
          {
            opcode: 'keyExists',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'key [KEY] exists?',
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'myKey',
              },
            },
            color1: '#fd7f54', // Main block color
            color3: '#cc6e45', // Slightly darker outline color
          },
          // Add other blocks as needed...
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
  }

Scratch.extensions.register(new IndexedDBExtension());
})(Scratch);
