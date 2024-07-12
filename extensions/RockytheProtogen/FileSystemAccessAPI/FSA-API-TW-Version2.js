// Name: File System Access API
// ID: FileSystemAccessAPIv2
// Description: Access and modify files and folders using FSA-API.
// By: Rocky the Protogen
// License: GNU-GPL3

(function (Scratch) {
  //for some reason this was async. Changed it back.
  "use strict";

  //Define global varaibles

  /* File Info */
  let fileHandle1 = "",
    fileHandle2 = "",
    fileHandle3 = "",
    fileHandle4 = "",
    fileHandle5 = "",
    fimetadata1 = "",
    fimetadata2 = "",
    fimetadata3 = "",
    fimetadata4 = "",
    fimetadata5 = "";

  /* Folder Info */
  /*
  let folderHandle1 = "",
    folderHandle2 = "",
    folderHandle3 = "",
    folderHandle4 = "",
    folderHandle5 = "",
    fometadata1 = "",
    fometadata2 = "",
    fometadata3 = "",
    fometadata4 = "",
    fometadata5 = "";
    */

  /* MEMORY ACTIONS */
  let fileCommit1 = {},
    fileCommit2 = {},
    fileCommit3 = {},
    fileCommit4 = {},
    fileCommit5 = {};

  //Define global const
  const app = {
    hasFSAccess:
      "chooseFileSystemEntries" in window || "showOpenFilePicker" in window,
  };
  const bt = {
    reporter: Scratch.BlockType.REPORTER,
    boolean: Scratch.BlockType.BOOLEAN,
    command: Scratch.BlockType.COMMAND,
    label: Scratch.BlockType.LABEL,
    button: Scratch.BlockType.BUTTON,
  };
  const j = JSON;
  const cs = console;

  const argt = Scratch.ArgumentType.STRING;
  const fislotmenu = ["1", "2", "3", "4", "5"];
  const fislot = {
    1: { file: fileHandle1, metadata: fimetadata1, commits: fileCommit1 },
    2: { file: fileHandle2, metadata: fimetadata2, commits: fileCommit2 },
    3: { file: fileHandle3, metadata: fimetadata3, commits: fileCommit3 },
    4: { file: fileHandle4, metadata: fimetadata4, commits: fileCommit4 },
    5: { file: fileHandle5, metadata: fimetadata5, commits: fileCommit5 },
  };
  /*
  const foslot = {
    1: { file: folderHandle1, metadata: fometadata1 },
    2: { file: folderHandle2, metadata: fometadata2 },
    3: { file: folderHandle3, metadata: fometadata3 },
    4: { file: folderHandle4, metadata: fometadata4 },
    5: { file: folderHandle5, metadata: fometadata5 },
  };
  */

  //Checks
  if (!Scratch.extensions.unsandboxed)
    throw new Error("File System Access API must run unsandboxed");
  if (!app.hasFSAccess)
    alert("Browser is incompatible: API not found.\nBlocks will not function.");

  //Check extensions
  let LoadedExtensions = j.stringify(
    Array.from(Scratch.vm.extensionManager._loadedExtensions.keys())
  );

  //WOAH
  // 2 Classes? Yes!
  // Why? Separation.
  // Or, more specifically, to help the user recognise functions more easily.
  // Doesn't say I can't... so I will.
  class files {
    getInfo() {
      return {
        id: "filesystemaccessapiv2files",
        name: "FSA Files",
        blocks: [
          {
            opcode: "openFile",
            blockType: bt.command,
            text: "In FILE slot [num] open a file",
            arguments: {
              num: {
                type: argt,
                menu: "num",
              },
            },
          },
          {
            opcode: "cancel",
            blockType: bt.command,
            text: "Empty FILE slot [num]",
            arguments: {
              num: {
                type: argt,
                menu: "num",
              },
            },
          },
          "---",
          {
            opcode: "metadata",
            blockType: bt.reporter,
            text: "FILE slot [num]'s metadata",
            arguments: {
              num: {
                type: argt,
                menu: "num",
              },
            },
          },
          {
            opcode: "getData",
            blockType: bt.reporter,
            text: "Read FILE slot [num] with method [TYPE]",
            arguments: {
              num: { type: argt, menu: "num" },
              TYPE: { type: argt, menu: "methods" },
            },
          },
          {
            opcode: "memWrite",
            blockType: bt.command,
            text: "Write [in] as [type] to file slot [num] in memory",
            arguments: {
              in: { type: argt },
              type: { type: argt, menu: "wmethods" },
              num: { type: argt, menu: "num" },
            },
          },
          {
            opcode: "memPush",
            blockType: bt.command,
            text: "Push changes of [num] to disk",
            arguments: { num: { type: argt, menu: "num" } },
          },
          "---",
          {
            blockType: bt.label,
            text: "Advanced File Blocks",
          },
          {
            opcode: "store",
            blockType: bt.command,
            text: "[ss] => slot ([num]) <=> store ([name])",
            arguments: {
              num: { type: argt, menu: "num" },
              name: { type: argt },
              ss: { type: argt, menu: "ss" },
            },
          },
          "---",
        ],
        menus: {
          ss: { acceptReporters: true, items: ["Push", "Pull"] },
          num: { acceptReporters: true, items: fislotmenu },
          methods: {
            acceptReporters: true,
            items: ["stream", "arrayBuffer", "text"],
          },
          wmethods: {
            acceptReporters: true,
            items: ["arrayBuffer", "text"],
          },
        },
      };
    }
    async openFile(args) {
      const slot = fislot[args.num];
      try {
        if (slot.file == "" && slot.metadata == "") {
          [slot.file] = await window.showOpenFilePicker();
          cs.log(slot.file);
          slot.metadata = await slot.file.getFile();
          cs.log(slot.metadata);
          if (slot.metadata.size >= 750000000) {
            await this.cancel(slot);
            alert("File exceeds 750 MB and will not be loaded.");
            cs.error(
              "File to large! Please choose a file that does not exceed 750 MB."
            );
          }
          if (slot.metadata.size >= 25000000)
            if (
              !confirm(
                "This file exceeds 25 MB and could cause problems.\nIf you wish to continue, press OK.\nOtherwise, press cancel."
              )
            ) {
              await this.cancel(slot);
              cs.error("User has quit import.");
            }
        }
      } catch (err) {
        cs.error("\nFailed to open.\n\nDetails:\n" + err);
        return "Failed to open.\nDetails:\n" + err;
      }
    }
    metadata(args) {
      const slot = fislot[args.num];
      return j.stringify({
        name: slot.metadata.name,
        lastModified: slot.metadata.lastModified,
        lastModifiedDate: slot.metadata.lastModifiedDate,
        webkitRelativePath: slot.metadata.webkitRelativePath,
        size: slot.metadata.size,
        type: slot.metadata.type,
      });
    }
    cancel(args) {
      try {
        function recogslot(Block, Func) {
          if (!Block) {
            return Func;
          } else {
            return fislot[Block];
          }
        }
        const slot = recogslot(args.num, args);
        slot.file = "";
        slot.metadata = "";
      } catch (err) {
        cs.error(err);
      }
    }
    async getData(args) {
      try {
        const slot = fislot[args.num];
        slot.metadata = await slot.file.getFile();
        if (args.TYPE == "text") {
          return await slot.metadata.text();
        } else if (args.TYPE == "arrayBuffer") {
          return new Int8Array(await slot.metadata.arrayBuffer()).toString();
        } else if (args.TYPE == "stream") {
          const streamReader = slot.metadata.stream().getReader();
          const chunkSize = 1024;
          const decoder = new TextDecoder();
          const chunks = [];
          async function readChunks() {
            while (true) {
              const { done, value } = await streamReader.read();
              if (done) {
                return chunks.join("");
              }
              chunks.push(decoder.decode(value, { stream: true }));
              if (value.length >= chunkSize) {
                await new Promise((resolve) => setTimeout(resolve, 10));
              }
            }
          }
          return await readChunks();
        }
      } catch (err) {
        cs.error("File Read Error:\n" + err);
      }
    }
    async store(args) {
      const slot = fislot[args.num];
      const storeName = args.name;
      async function openDatabase(storeName) {
        return await new Promise((resolve, reject) => {
          const dbRequest = window.indexedDB.open("fileHandleStore", 3);
          dbRequest.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (db.objectStoreNames.contains(storeName)) {
              db.deleteObjectStore(storeName);
            }
            db.createObjectStore(storeName, {
              keyPath: "id",
              autoIncrement: true,
            });
          };
          dbRequest.onsuccess = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
              db.close();
              const newVersion = db.version + 1;
              const upgradeRequest = window.indexedDB.open(
                "fileHandleStore",
                newVersion
              );
              upgradeRequest.onupgradeneeded = (event) => {
                const upgradeDb = event.target.result;
                if (upgradeDb.objectStoreNames.contains(storeName)) {
                  upgradeDb.deleteObjectStore(storeName);
                }
                upgradeDb.createObjectStore(storeName, {
                  keyPath: "id",
                  autoIncrement: true,
                });
              };
              upgradeRequest.onsuccess = (event) => {
                resolve(event.target.result);
              };
              upgradeRequest.onerror = (event) => {
                reject(new Error("Database upgrade failed"));
              };
            } else {
              resolve(db);
            }
          };
          dbRequest.onerror = (event) => {
            reject(new Error("Database open failed"));
          };
        });
      }
      async function storeData(db, slotData, storeName) {
        return await new Promise((resolve, reject) => {
          const transaction = db.transaction(storeName, "readwrite");
          const store = transaction.objectStore(storeName);
          const request = store.add({ slotData });
          request.onsuccess = () => {
            resolve("Data stored successfully");
          };
          request.onerror = (event) => {
            reject(new Error("Transaction failed"));
          };
        });
      }
      async function loadData(db, storeName) {
        return await new Promise((resolve, reject) => {
          const transaction = db.transaction(storeName, "readonly");
          const store = transaction.objectStore(storeName);
          const request = store.getAll();
          request.onsuccess = () => {
            resolve(request.result[0].slotData);
          };
          request.onerror = (event) => {
            reject(new Error("Failed to load data"));
          };
        });
      }
      try {
        const db = await openDatabase(storeName);
        cs.log("Database opened successfully");
        switch (args.ss) {
          case "Push": {
            const storeMessage = await storeData(db, slot, storeName);
            cs.log(storeMessage);
            break;
          }
          case "Pull": {
            const data = await loadData(db, storeName);
            fislot[args.num] = data;
            cs.log("Data loaded successfully", data);
            break;
          }
          default:
            cs.error("Unknown operation:", args.ss);
        }
      } catch (err) {
        cs.error("Operation failed:", err);
      }
    }
    async memWrite(args) {
      const slot = fislot[args.num];
      const type = args.type;
      if (args.type == "text") {
        slot.commits[Object.keys(slot.commits).length + 1] = {
          text: args.in,
          type: type,
        };
      } else if (args.type == "arrayBuffer") {
        cs.warn("Don't use arrayBuffer yet!");
        //slot.commits[Object.keys(slot.commits).length + 1] =
      } else {
        cs.error("Invalid method.");
      }
      cs.log(slot.commits);
    }
    async memPush(args) {
      const slot = fislot[args.num];
      let pushFile = await slot.metadata.text();
      for (let [key, value] of Object.entries(slot.commits)) {
        console.log(key, value);
      }
      slot.commits = {};
    }
  }

  class folders {
    getInfo() {
      return {
        id: "filesystemaccessapiv2folders",
        name: "FSA Folders",
        blocks: [
          {
            opcode: "openFolder",
            blockType: bt.command,
            text: "In FOLDER slot [num] open a folder",
            arguments: {
              num: {
                type: argt,
                menu: "num",
              },
            },
          },
        ],
        menus: {
          num: {
            acceptReporters: true,
            items: fislotmenu,
          },
        },
      };
      //Functions
    }
  }

  if (!LoadedExtensions.includes("skyhigh173JSON"))
    Scratch.vm.extensionManager.loadExtensionURL(
      "https://extensions.turbowarp.org/Skyhigh173/json.js"
    );
  try {
    Scratch.extensions.register(new files());
    Scratch.extensions.register(new folders());
  } catch (err) {
    cs.error(
      "Failed to load a module!\nPlease report this issue.\nDetails:\n" + err
    );
    alert(
      "Failed to load a module!\nPlease report this issue.\nDetails:\n" + err
    );
  }
})(Scratch);
