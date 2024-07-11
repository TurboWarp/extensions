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
  const idb = window.indexedDB;

  const argt = Scratch.ArgumentType.STRING;
  const fislotmenu = ["1", "2", "3", "4", "5"];
  const fislot = {
    1: { file: fileHandle1, metadata: fimetadata1 },
    2: { file: fileHandle2, metadata: fimetadata2 },
    3: { file: fileHandle3, metadata: fimetadata3 },
    4: { file: fileHandle4, metadata: fimetadata4 },
    5: { file: fileHandle5, metadata: fimetadata5 },
  };
  const foslot = {
    1: { file: folderHandle1, metadata: fometadata1 },
    2: { file: folderHandle2, metadata: fometadata2 },
    3: { file: folderHandle3, metadata: fometadata3 },
    4: { file: folderHandle4, metadata: fometadata4 },
    5: { file: folderHandle5, metadata: fometadata5 },
  };

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
              num: {
                type: argt,
                menu: "num",
              },
              TYPE: {
                type: argt,
                menu: "methods",
              },
            },
          },
        ],
        menus: {
          num: {
            acceptReporters: true,
            items: fislotmenu,
          },
          methods: {
            acceptReporters: true,
            items: ["stream", "arrayBuffer", "text", "slice"],
          },
        },
      };
    }
    //Functions
    async openFile(args) {
      //Shows the file picker and gets file information.
      const slot = fislot[args.num];
      try {
        if (slot.file == "" && slot.metadata == "") {
          [slot.file] = await window.showOpenFilePicker();
          cs.log(slot.file);
          slot.metadata = await slot.file.getFile();
          cs.log(slot.metadata);
          if (slot.metadata.size >= 75000000) {
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
