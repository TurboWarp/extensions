// Name: IndexedDB
// ID: indexeddb
// Description: Adds basic IndexedDB functionality
// By: kilgorezer <https://scratch.mit.edu/users/kilgorezer/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  const prefix = "idb";

  class DatabaseManager {
    openDatabase(dbName) {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1); // Fixed version 1

        request.onerror = (event) => reject(event.target.error);

        request.onsuccess = (event) => resolve(event.target.result);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          // Create the *single, fixed* object store here.
          if (!db.objectStoreNames.contains("myStore")) {
            // Fixed store name: 'myStore'
            db.createObjectStore("myStore", { keyPath: "id" });
          }
        };
      });
    }

    deleteDatabase(dbName) {
      return new Promise((resolve, reject) => {
        const request = indexedDB.deleteDatabase(dbName);
        request.onerror = (event) => reject(event.target.error);
        request.onsuccess = () => resolve();
      });
    }

    putValue(dbName, key, value) {
      // Simplified: dbName, key, value
      return this.openDatabase(dbName).then((db) => {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(["myStore"], "readwrite"); // Fixed store name
          const objectStore = transaction.objectStore("myStore"); // Fixed store name
          const request = objectStore.put({ id: key, value: value });

          request.onsuccess = () => resolve();
          request.onerror = () => reject();
        });
      });
    }

    getValue(dbName, key) {
      // Simplified: dbName, key
      return this.openDatabase(dbName).then((db) => {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(["myStore"], "readonly"); // Fixed store name
          const objectStore = transaction.objectStore("myStore"); // Fixed store name
          const request = objectStore.get(key);

          request.onsuccess = (event) =>
            resolve(event.target.result ? event.target.result.value : "");
          request.onerror = () => reject();
        });
      });
    }

    deleteValue(dbName, key) {
      return this.openDatabase(dbName).then((db) => {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(["myStore"], "readwrite");
          const objectStore = transaction.objectStore("myStore");
          const request = objectStore.delete(key); // Use delete() method

          request.onsuccess = () => resolve();
          request.onerror = () => reject();
        });
      });
    }
  }

  class IndexedDBExtension {
    constructor() {
      this.dbManager = new DatabaseManager();
    }

    getInfo() {
      return {
        id: "indexeddb",
        name: "IndexedDB",
        color1: "#4285F4",
        blocks: [
          {
            opcode: "openDatabase",
            blockType: Scratch.BlockType.COMMAND,
            hideFromPalette: true,
            text: "Open/Create Database [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myDatabase",
              },
            },
          },
          {
            opcode: "deleteDatabase",
            blockType: Scratch.BlockType.COMMAND,
            text: "Delete Database [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myDatabase",
              },
            },
          },
          {
            opcode: "putValue",
            blockType: Scratch.BlockType.COMMAND,
            text: "Put [KEY] : [VALUE] in Database [DB_NAME]",
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING },
              VALUE: { type: Scratch.ArgumentType.STRING },
              DB_NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myDatabase",
              },
            },
          },
          {
            opcode: "getValue",
            blockType: Scratch.BlockType.REPORTER,
            text: "Get [KEY] from Database [DB_NAME]",
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING },
              DB_NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myDatabase",
              },
            },
          },
          {
            opcode: "deleteValue",
            blockType: Scratch.BlockType.COMMAND,
            text: "Delete [KEY] from Database [DB_NAME]",
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING },
              DB_NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myDatabase",
              },
            },
          },
          {
            opcode: "clearall",
            blockType: Scratch.BlockType.COMMAND,
            text: "Clear all keys from Database [DB_NAME]",
            arguments: {
              DB_NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myDatabase",
              },
            },
          },
        ],
      };
    }

    async openDatabase(args) {
      (await this.dbManager.openDatabase(prefix + "_" + args.NAME)).close();
    }

    async deleteDatabase(args) {
      await this.dbManager.deleteDatabase(prefix + "_" + args.NAME);
    }

    putValue(args) {
      this.dbManager.putValue(
        prefix + "_" + args.DB_NAME,
        args.KEY,
        args.VALUE
      );
    }

    getValue(args) {
      return this.dbManager.getValue(prefix + "_" + args.DB_NAME, args.KEY);
    }

    deleteValue(args) {
      this.dbManager.deleteValue(prefix + args.DB_NAME, args.KEY);
    }

    async clearall(args) {
      await this.dbManager.deleteDatabase(prefix + args.DB_NAME);
      (await this.dbManager.openDatabase(prefix + args.DB_NAME)).close();
    }
  }

  Scratch.extensions.register(new IndexedDBExtension());
})(Scratch);
