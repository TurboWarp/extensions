// Name: File System Access API
// ID: fsaapi98396
// Description: Access and modify files and folders using FSA-API.
// By: Rocky the Protogen
// License: GNU-GPL3

/**
 * Credits:
 *
 *  Basics in JS: https://www.w3schools.com/Js/
 *
 *  How to add commits to pull rq: https://stackoverflow.com/questions/10147445/github-adding-commits-to-existing-pull-request
 *
 *  File size conversion: https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
 *
 *  Original files by GarboMuffin: https://github.com/TurboWarp/extensions/blob/master/extensions/files.js
 *
 *  MDN web docs: https://developer.mozilla.org/en-US/docs/Web/API/Window/
 *
 *  LMS Utils (Labels, Buttons): https://github.com/TurboWarp/extensions/blob/master/extensions/Lily/lmsutils.js
 *
 *  Fixes and proper cleanup (from @kindpump): https://github.com/TurboWarp/extensions/pull/1594#issuecomment-2214487201
 *
 *  Assets.js (for Extension check): https://github.com/TurboWarp/extensions/blob/master/extensions/Lily/Assets.js
 *
 */

/**
 * Just in case you want to make it easy for yourself.
 * VSCode Extensions Installed:
 *
 *  mgmcdermott.vscode-language-babel
 *
 *  jeff-hykin.better-js-syntax
 *
 *  moshfeu.compare-folders
 *
 *  dbaeumer.vscode-eslint
 *
 *  xabikos.JavaScriptSnippets
 *
 *  ms-vscode.vscode-typescript-next
 *
 *  sburg.vscode-javascript-booster
 *
 *  cmstead.js-codeformer
 *
 *  ms-edgedevtools.vscode-edge-devtools
 *
 *  esbenp.prettier-vscode
 *
 *  bysabi.prettier-vscode-standard
 *
 *  rvest.vs-code-prettier-eslint
 *
 *  numso.prettier-standard-vscode
 *
 *  svipas.prettier-plus
 *
 *  standard.vscode-standard
 *
 *  lihui.vs-color-picker
 *
 */

(function (Scratch) {
  "use strict";

  const app = {
    hasFSAccess:
      "chooseFileSystemEntries" in window || "showOpenFilePicker" in window,
  };

  let fileHandle1,
    fileHandle2,
    fileHandle3,
    fileHandle4,
    fileHandle5,
    folderHandle,
    storefd1,
    storefd2,
    storefd3,
    storefd4,
    storefd5,
    writeFail = false,
    FolderData = "",
    output1,
    output2,
    output3,
    output4,
    output5,
    unsupportedBrowser = false,
    mayOpenFilePicker = false,
    mayOpenFolderPicker = false,
    NoBlankFileType;

  if (!Scratch.extensions.unsandboxed) {
    throw new Error(
      "File System Access API cannot run on sandboxed mode.\nPlease disable the sandbox when loading the extension."
    );
  }

  if (app.hasFSAccess) {
    alert(
      "🛠️   This extension is in development   🛠️\nTo prevent data loss, avoid using this on personal files or folders."
    );
    console.log("Browser supports FSAAPI.");
  } else {
    unsupportedBrowser = true;
    let QuitLoadingExt = confirm(
      'Your current browser does not support File System Access API! This extension will not function here.\n\nKnown browsers that support this:\nChrome (v86+)\nEdge (v86+)\nOpera (v72+)\n\nFor more information, click "Supported Browsers" in the palette. Would you like to continue?'
    );
    if (!QuitLoadingExt) throw new Error("User cancelled extension loading.");
  }
  let LoadedExtensions = JSON.stringify(
    Array.from(Scratch.vm.extensionManager._loadedExtensions.keys())
  );
  if (!LoadedExtensions.includes("skyhigh173JSON"))
    if (
      confirm(
        "Import JSON extension by Skyhigh173?\nThis tool will be crucial to get file data."
      )
    )
      Scratch.vm.extensionManager
        .loadExtensionURL("https://extensions.turbowarp.org/Skyhigh173/json.js")
        .then(() => {
          alert("Imported JSON extension by Skyhigh173.");
        });
  class fsaapi98396 {
    /**
     * Imported code for later use.
     */
    humanFileSize(bytes, si = false, dp = 1) {
      const thresh = si ? 1000 : 1024;
      if (Math.abs(bytes) < thresh) {
        return bytes + " B";
      }
      const units = si
        ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
        : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
      let u = -1;
      const r = 10 ** dp;
      do {
        bytes /= thresh;
        ++u;
      } while (
        Math.round(Math.abs(bytes) * r) / r >= thresh &&
        u < units.length - 1
      );
      return bytes.toFixed(dp) + " " + units[u];
    }

    /**
     * End of Imports
     */

    getInfo() {
      return {
        id: "fsaapi98396",
        name: "File System Access API",
        color1: "#1565c0",
        color2: "#9964b9",
        color3: "#ffc107",
        docsURI:
          "https://developer.chrome.com/docs/capabilities/web-apis/file-system-access",
        blocks: [
          {
            func: "getSupportedBrowsers",
            blockType: Scratch.BlockType.BUTTON,
            text: "Supported Browsers",
            hideFromPalette: !unsupportedBrowser,
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Permission Management",
          },
          {
            opcode: "getUserPermissionFiP",
            blockType: Scratch.BlockType.COMMAND,
            text: "Request file picker permission",
          },
          {
            opcode: "getUserPermissionFoP",
            blockType: Scratch.BlockType.COMMAND,
            text: "Request folder picker permission",
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Single File",
          },
          {
            opcode: "rqFilePicker",
            blockType: Scratch.BlockType.COMMAND,
            text: "Open a file starting in [LOC] with slot [NAME]",
            arguments: {
              LOC: {
                type: Scratch.ArgumentType.STRING,
                menu: "LOCATIONS",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: "FILESAVES",
              },
            },
          },
          {
            opcode: "writeAccessFailCheck",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Access denied?",
          },
          {
            opcode: "outputCheck",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Is JSON [NAME] blank?",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: "FILESAVES",
              },
            },
          },
          {
            opcode: "getFileHandles",
            blockType: Scratch.BlockType.REPORTER,
            text: "Get information JSON for [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: "FILESAVES",
              },
            },
          },
          {
            opcode: "getOpenedFileData",
            blockType: Scratch.BlockType.REPORTER,
            text: "Read file [NAME] using [TYPE]",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "TYPES",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: "FILESAVES",
              },
            },
          },
          {
            opcode: "writeSingleFile",
            blockType: Scratch.BlockType.COMMAND,
            text: "Write string [IN] to open file in [NAME]",
            arguments: {
              IN: {
                type: Scratch.ArgumentType.STRING,
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: "FILESAVES",
              },
            },
          },
          {
            opcode: "closeSingleFile",
            blockType: Scratch.BlockType.COMMAND,
            text: "Empty slot [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: "FILESAVES",
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Folders",
          },
          {
            opcode: "dirMultiFileOpen",
            blockType: Scratch.BlockType.COMMAND,
            text: "Open a Directory starting in [LOC]",
            arguments: {
              LOC: {
                type: Scratch.ArgumentType.STRING,
                menu: "LOCATIONS",
              },
            },
          },
          {
            opcode: "isFolderDataBlank",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Is folder open?",
          },
          {
            opcode: "getFolderContentsJSON",
            blockType: Scratch.BlockType.REPORTER,
            text: "Folder contents JSON",
          },
          {
            opcode: "readFileFromPath",
            blockType: Scratch.BlockType.REPORTER,
            text: "Read file path [PATH] using [TYPE]",
            arguments: {
              PATH: {
                type: Scratch.ArgumentType.STRING,
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "TYPES",
              },
            },
          },
          {
            opcode: "writeToFilePath",
            blockType: Scratch.BlockType.COMMAND,
            text: "Write [DATA] to file path [PATH]",
            arguments: {
              PATH: {
                type: Scratch.ArgumentType.STRING,
              },
              DATA: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "folderCreate",
            blockType: Scratch.BlockType.COMMAND,
            text: "[ACTION] [KIND] with path [NAME] and [INDX]",
            arguments: {
              ACTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "ACTIONS",
              },
              KIND: {
                type: Scratch.ArgumentType.STRING,
                menu: "KINDS",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
              },
              INDX: {
                type: Scratch.ArgumentType.STRING,
                menu: "INDEX",
              },
            },
          },
        ],
        menus: {
          INDEX: {
            acceptReporters: true,
            items: ["index", "keep"],
          },
          ACTIONS: {
            acceptReporters: true,
            items: ["Create", "Delete"],
          },
          KINDS: {
            acceptReporters: true,
            items: ["File", "Folder"],
          },
          TYPES: {
            acceptReporters: true,
            items: ["stream", "text", "arrayBuffer"],
          },
          LOCATIONS: {
            acceptReporters: true,
            items: [
              "desktop",
              "documents",
              "downloads",
              "music",
              "pictures",
              "videos",
            ],
          },
          FILESAVES: {
            acceptReporters: true,
            items: ["Slot 1", "Slot 2", "Slot 3", "Slot 4", "Slot 5"],
          },
        },
      };
    }

    getSupportedBrowsers() {
      Scratch.openWindow(
        "https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker#browser_compatibility"
      );
    }

    getUserPermissionFiP() {
      //Remove folder picker permission when file picker permission is requested
      mayOpenFolderPicker = false;
      if (!mayOpenFilePicker) {
        mayOpenFilePicker = confirm(
          `Do you allow the following site to open your file picker?\n"${window.location.href}"`
        );
        if (!mayOpenFilePicker) console.error("Permission denied");
      }
    }
    getUserPermissionFoP() {
      //vice-versa.
      mayOpenFilePicker = false;
      if (!mayOpenFolderPicker) {
        mayOpenFolderPicker = confirm(
          `Do you allow the following site to open your directory picker?\n"${window.location.href}"`
        );
        if (!mayOpenFolderPicker) console.error("Permission denied");
      }
    }

    async rqFilePicker(args) {
      try {
        let output;
        let storefd;
        let fileHandle;
        //Set current slot
        if (args.NAME == "Slot 1") {
          output = output1;
        } else if (args.NAME == "Slot 2") {
          output = output2;
        } else if (args.NAME == "Slot 3") {
          output = output3;
        } else if (args.NAME == "Slot 4") {
          output = output4;
        } else if (args.NAME == "Slot 5") {
          output = output5;
        } else {
          console.error("Not a slot.");
        }
        writeFail = false;
        if (output === "" && mayOpenFilePicker) {
          [fileHandle] = await window.showOpenFilePicker({
            multiple: false,
            startIn: args.LOC,
            mode: "readwrite",
          });
          if (args.NAME == "Slot 1") {
            fileHandle1 = fileHandle;
          } else if (args.NAME == "Slot 2") {
            fileHandle2 = fileHandle;
          } else if (args.NAME == "Slot 3") {
            fileHandle3 = fileHandle;
          } else if (args.NAME == "Slot 4") {
            fileHandle4 = fileHandle;
          } else if (args.NAME == "Slot 5") {
            fileHandle5 = fileHandle;
          }
          const file = await fileHandle.getFile();
          if (file.type === "") {
            NoBlankFileType = "unknown";
          } else {
            NoBlankFileType = file.type;
          }
          const FileTypeUnblank = NoBlankFileType;
          output = JSON.stringify({
            type: FileTypeUnblank,
            name: file.name,
            size: file.size,
            lastModified: file.lastModified,
          });
          if (file.size >= 25000000) {
            if (
              !confirm(
                `This file is quite large (${this.humanFileSize(
                  file.size,
                  true
                )}). It could cause the site to freeze or crash! Continue anyway?`
              )
            ) {
              console.error("Large file import aborted by user");
            }
          }
          storefd = file;
          if (args.NAME == "Slot 1") {
            storefd1 = storefd;
            output1 = output;
          } else if (args.NAME == "Slot 2") {
            storefd2 = storefd;
            output2 = output;
          } else if (args.NAME == "Slot 3") {
            storefd3 = storefd;
            output3 = output;
          } else if (args.NAME == "Slot 4") {
            storefd4 = storefd;
            output4 = output;
          } else if (args.NAME == "Slot 5") {
            storefd5 = storefd;
            output5 = output;
          }
        } else {
          console.error("Could not prompt, check user input and try again.");
        }
      } catch (error) {
        writeFail = true;
        console.error("Error opening file:", error);
        throw error;
      }
    }

    async getOpenedFileData(args) {
      let fileHandle;
      let storefd;
      if (args.NAME == "Slot 1") {
        fileHandle = fileHandle1;
        storefd = storefd1;
      } else if (args.NAME == "Slot 2") {
        fileHandle = fileHandle2;
        storefd = storefd2;
      } else if (args.NAME == "Slot 3") {
        fileHandle = fileHandle3;
        storefd = storefd3;
      } else if (args.NAME == "Slot 4") {
        fileHandle = fileHandle4;
        storefd = storefd4;
      } else if (args.NAME == "Slot 5") {
        fileHandle = fileHandle5;
        storefd = storefd5;
      }
      if (!storefd) return "";
      try {
        const file = await fileHandle.getFile(); // Re-acquire the file after writing
        storefd = file;
        if (args.NAME == "Slot 1") {
          storefd1 = storefd;
        } else if (args.NAME == "Slot 2") {
          storefd2 = storefd;
        } else if (args.NAME == "Slot 3") {
          storefd3 = storefd;
        } else if (args.NAME == "Slot 4") {
          storefd4 = storefd;
        } else if (args.NAME == "Slot 5") {
          storefd5 = storefd;
        }
        if (args.TYPE === "arrayBuffer") {
          const arrayBuffer = await file.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          return "[" + Array.from(uint8Array).toString() + "]";
        } else if (args.TYPE === "text") {
          return await file.text();
        } else if (args.TYPE === "stream") {
          const streamReader = file.stream().getReader();
          const decoder = new TextDecoder();
          let StreamOutResult = "";
          const chunkSize = 1024;

          async function readChunks() {
            while (true) {
              const { done, value } = await streamReader.read();
              if (done) {
                console.log("Stream reading complete.");
                return StreamOutResult;
              }
              StreamOutResult += decoder.decode(value, { stream: true });
              if (value.length >= chunkSize) {
                await new Promise((resolve) => setTimeout(resolve, 5));
              }
            }
          }

          return await readChunks();
        } else {
          console.error("Invalid type specified");
        }
      } catch (error) {
        console.error("Error reading file:", error);
        console.error("Error reading file");
      }
    } //arch btw

    getFileHandles(args) {
      let output;
      if (args.NAME == "Slot 1") {
        output = output1;
      } else if (args.NAME == "Slot 2") {
        output = output2;
      } else if (args.NAME == "Slot 3") {
        output = output3;
      } else if (args.NAME == "Slot 4") {
        output = output4;
      } else if (args.NAME == "Slot 5") {
        output = output5;
      } else {
        console.error("Not a slot.");
      }
      return output;
    }

    outputCheck(args) {
      let output;
      if (args.NAME == "Slot 1") {
        output = output1;
      } else if (args.NAME == "Slot 2") {
        output = output2;
      } else if (args.NAME == "Slot 3") {
        output = output3;
      } else if (args.NAME == "Slot 4") {
        output = output4;
      } else if (args.NAME == "Slot 5") {
        output = output5;
      } else {
        console.error("Not a slot.");
      }
      return output === "";
    }

    async writeSingleFile(args) {
      let fileHandle, storefd; //L e a r n i n g
      if (args.NAME == "Slot 1") {
        fileHandle = fileHandle1;
        storefd = storefd1;
      } else if (args.NAME == "Slot 2") {
        fileHandle = fileHandle2;
        storefd = storefd2;
      } else if (args.NAME == "Slot 3") {
        fileHandle = fileHandle3;
        storefd = storefd3;
      } else if (args.NAME == "Slot 4") {
        fileHandle = fileHandle4;
        storefd = storefd4;
      } else if (args.NAME == "Slot 5") {
        fileHandle = fileHandle5;
        storefd = storefd5;
      }
      if (fileHandle) {
        try {
          const writable = await fileHandle.createWritable();
          await writable.write(args.IN);
          await writable.close();
          console.log("File written successfully");
          storefd = await fileHandle.getFile(); // Re-acquire the file handle after writing
          if (args.NAME == "Slot 1") {
            storefd1 = storefd;
          } else if (args.NAME == "Slot 2") {
            storefd2 = storefd;
          } else if (args.NAME == "Slot 3") {
            storefd3 = storefd;
          } else if (args.NAME == "Slot 4") {
            storefd4 = storefd;
          } else if (args.NAME == "Slot 5") {
            storefd5 = storefd;
          }
        } catch (error) {
          console.error("Error writing to file:", error);
          console.error("Error writing to file");
        }
      } else {
        console.error("No file to write to!");
      }
    }

    closeSingleFile(args) {
      if (args.NAME == "Slot 1") {
        if (fileHandle1) {
          fileHandle1 = "";
          storefd1 = "";
          output1 = "";
          console.log("File closed successfully");
        } else {
          console.error("No file to close!");
        }
      } else if (args.NAME == "Slot 2") {
        if (fileHandle2) {
          fileHandle2 = "";
          storefd2 = "";
          output2 = "";
          console.log("File closed successfully");
        } else {
          console.error("No file to close!");
        }
      } else if (args.NAME == "Slot 3") {
        if (fileHandle3) {
          fileHandle3 = "";
          storefd3 = "";
          output3 = "";
          console.log("File closed successfully");
        } else {
          console.error("No file to close!");
        }
      } else if (args.NAME == "Slot 4") {
        if (fileHandle4) {
          fileHandle4 = "";
          storefd4 = "";
          output4 = "";
          console.log("File closed successfully");
        } else {
          console.error("No file to close!");
        }
      } else if (args.NAME == "Slot 5") {
        if (fileHandle5) {
          fileHandle5 = "";
          storefd5 = "";
          output5 = "";
          console.log("File closed successfully");
        } else {
          console.error("No file to close!");
        }
      }
    }

    writeAccessFailCheck() {
      return writeFail;
    }

    /**
     * This is the end of file functions.
     * Now, to the folders.
     */

    async dirMultiFileOpen(args) {
      if (mayOpenFolderPicker) {
        try {
          folderHandle = await window.showDirectoryPicker({
            multiple: false,
            startIn: args.LOC,
            mode: "readwrite",
          });
          FolderData = await this.internalGetFolderContents(folderHandle);
        } catch (error) {
          console.error(error);
        }
      } else {
        return "Access denied.";
      }
    }

    isFolderDataBlank() {
      return FolderData !== "";
    }

    getFolderContentsJSON() {
      return FolderData;
    }

    async getFileInfoinDir(args) {} //Idk if I will implement yet.

    //// Gets Folder Contents //// Not called directly by a block. ////
    async internalGetFolderContents(internalDirHandle) {
      const dirHandle = internalDirHandle;

      async function collectDirectoryStructure(handle) {
        const structure = {};

        for await (const entry of handle.values()) {
          if (entry.kind === "directory") {
            const subDirHandle = await handle.getDirectoryHandle(entry.name);
            structure[entry.name] =
              await collectDirectoryStructure(subDirHandle);
          } else {
            if (!structure["files"]) {
              structure["files"] = [];
            }
            const fileHandle = await handle.getFileHandle(entry.name);
            const file = await fileHandle.getFile();
            if (file.type === "") {
              NoBlankFileType = "unknown";
            } else {
              NoBlankFileType = file.type;
            }
            structure["files"].push({
              type: NoBlankFileType,
              name: entry.name,
              size: file.size,
              lastModified: file.lastModified,
            });
          }
        }

        return structure;
      }

      const directoryStructure = await collectDirectoryStructure(dirHandle);
      return JSON.stringify(directoryStructure, null, 2);
    }

    async readFileFromPath(args) {
      const parts = args.PATH.split("/").filter((part) => part);
      let currentHandle = folderHandle;

      for (let i = 0; i < parts.length - 1; i++) {
        currentHandle = await currentHandle.getDirectoryHandle(parts[i]);
      }
      const fileHandle = await currentHandle.getFileHandle(
        parts[parts.length - 1]
      );

      const contents = await this.getFileDataFromFolder(fileHandle, args.TYPE);
      return contents;
    }

    async getFileDataFromFolder(fileHandle, method) {
      if (!fileHandle) return "";
      try {
        const file = await fileHandle.getFile();
        if (method === "arrayBuffer") {
          const arrayBuffer = await file.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          return "[" + Array.from(uint8Array).toString() + "]";
        } else if (method === "text") {
          return await file.text();
        } else if (method === "stream") {
          const streamReader = file.stream().getReader();
          const decoder = new TextDecoder();
          let StreamOutResult = "";
          const chunkSize = 1024;

          async function readChunks() {
            while (true) {
              const { done, value } = await streamReader.read();
              if (done) {
                console.log("Stream reading complete.");
                return StreamOutResult;
              }
              StreamOutResult += decoder.decode(value, { stream: true });
              if (value.length >= chunkSize) {
                await new Promise((resolve) => setTimeout(resolve, 5));
              }
            }
          }

          return await readChunks();
        } else {
          console.error("Invalid type specified");
        }
      } catch (error) {
        console.error("Error reading file:", error);
        console.error("Error reading file");
      }
    }

    async writeToFilePath(args) {
      const parts = args.PATH.split("/").filter((part) => part);
      let currentHandle = folderHandle;

      for (let i = 0; i < parts.length - 1; i++) {
        currentHandle = await currentHandle.getDirectoryHandle(parts[i]);
      }
      const fileHandle = await currentHandle.getFileHandle(
        parts[parts.length - 1]
      );

      const contents = await this.setFileDataFromFolder(fileHandle);
      return contents;
    }

    async setFileDataFromFolder(fileHandle, string) {
      if (fileHandle) {
        try {
          const writable = await fileHandle.createWritable();
          await writable.write(string);
          await writable.close();
          console.log("File written successfully");
        } catch (error) {
          console.error("Error writing to file:", error);
          console.error("Error writing to file");
        }
      } else {
        console.error("No file to write to!");
      }
    }

    async folderCreate(args) {
      if ((args.ACTION == "Create") & (args.KIND == "File")) {
        await this.internalFolderCreateFile(args.NAME);
        if (args.INDX == "index")
          await this.internalGetFolderContents(folderHandle);
      } else if ((args.ACTION == "Delete") & (args.KIND == "File")) {
        await this.internalFolderDeleteFile(args.NAME);
        if (args.INDX == "index")
          await this.internalGetFolderContents(folderHandle);
      } else if ((args.ACTION == "Create") & (args.KIND == "Folder")) {
        await this.internalFolderCreateFolder(args.NAME);
        if (args.INDX == "index")
          await this.internalGetFolderContents(folderHandle);
      } else if ((args.ACTION == "Delete") & (args.KIND == "Folder")) {
        await this.internalFolderDeleteFolder(args.NAME);
        if (args.INDX == "index")
          await this.internalGetFolderContents(folderHandle);
      }
    }

    async internalFolderCreateFile(filename) {
      try {
        const fileHandle = await this.directoryHandle.getFileHandle(filename, {
          create: true,
        });
        const writable = await fileHandle.createWritable();
        await writable.write("");
        await writable.close();
        console.log(`File ${filename} created in ${this.directoryHandle.name}`);
      } catch (err) {
        console.error(`Error creating file ${filename}:`, err);
      }
    }

    async internalFolderDeleteFile(filename) {
      try {
        await this.directoryHandle.removeEntry(filename);
        console.log(
          `File ${filename} deleted from ${this.directoryHandle.name}`
        );
      } catch (err) {
        console.error(`Error deleting file ${filename}:`, err);
      }
    }

    async internalFolderCreateFolder(foldername) {
      try {
        await this.directoryHandle.getDirectoryHandle(foldername, {
          create: true,
        });
        console.log(
          `Folder ${foldername} created in ${this.directoryHandle.name}`
        );
      } catch (err) {
        console.error(`Error creating folder ${foldername}:`, err);
      }
    }

    async internalFolderDeleteFolder(foldername) {
      try {
        await this.directoryHandle.removeEntry(foldername, { recursive: true });
        console.log(
          `Folder ${foldername} deleted from ${this.directoryHandle.name}`
        );
      } catch (err) {
        console.error(`Error deleting folder ${foldername}:`, err);
      }
    }

    /*
 ................... *--------::.:*++===========:.%##*********************++++++++++++++====+====== 
 .:................. #-----------:.:+++==========-:##**************************+*++++++++==+======= 
 ................... :=------------::.=*+=========:-#%#**********************+*+++++++++++++======= 
 .................... #--------------::.=*++=======:=###*******************+*****++++++++++=+====== 
 .................... .+---------------::.:+*+======:=##********##*************++**+++++++++======= 
 ....................:.*#=----------------:.:+*+====-:=%%****##******************+*++*+++++++=+==== 
 ............::-=+**+=   @*=----------------::.-*+===-:+##******#********************++++++++=+==== 
 .......:-=+++-:          *@%####%%@@@@@@@#+=-::.-+++=--*%##**######*****#**********+*++++++++++=== 
 ..:-=+*=.                    -            :@@#=-:.:+*+:**%#*******##*#**************+*++++++++++== 
 +**:                                          #@%%#*=+*+##%####*****####***##********+*+++++++==+= 
                                                         =---+*##%%##***###************+*+++++++++= 
                                                  -=@@@@@@@@%#*=-:-*%%##***##***********++*++++++++ 
                    :@.--:#@@@@@.      . .    -@@@@@@@@%%%##%%%@@@@+.=#####*#*************++++++++= 
                    #@@@@@@%-.  :@@*      .%@@@@@@%#%#%%%%%%%##%##%@@+:+%####*#**********+*+++++++= 
                  @%:--+@@@@@@@%%#-.*@+ @@@@@@%%@@@@@@@%@%%%%%%%##%%%@@=-###*#*#**#**********++++++ 
                   @ :@          %# +@@@@%-%%#%*==-----:-%%##%%#%%%%#%%@#=%#*##*##*#*******++++++++ 
              .==*@@@  @    @@@@@@@%@. #@%*-@%%-:=+*++==#%%#%%%%%@@@@@@@#*+@####*#**********+*+++++ 
          .:@@-::.==@@* @:   *@:@ :-  @*%%%=+%%@%=:-:-+%@%%%%%@@@##@@+--=+=+%##*##*************++++ 
            :@@@*     =@ +@  :@  @   *# %@%#=*@%%@@@@@@@%#%#%@@-:----=+***+++%##**##*********+*++++ 
          +@   =@@@*%   @@ @: .@@    @: .@@%#-#@%#%##%@@@@@@@#-=====--++***++####**#************+++ 
           @#:=@          @@:%%#  . .@    %@@#.*@####%*  .::-===-@@@@@+-++==#######*#*********+*+++ 
            *@  @@      *@@ @@@  ..  @   ++@@@@:+@%##%@@%*:::::*@@##%%@@*-#%#####*####*#********+*+ 
              @@  @@      @:  # ..  @@  *+  @@@@=:%%%#%%@@@@@@@@%#%#%@*:#%%#########***********++++ 
                @@. =@@    +@@+ .. -@.+ @    *%@@%:-%%%###%######%%@#-+%%##########*##**********+++ 
                  =@@   @@@  -. .  =- @@@:   -%@@@@#.-%%######%%@@+:=#%##*#############*#********++ 
                     +@@*   +@.   @@=    %  @-  -#@@@%.=#%#%%%%*-:*%%#############**#*************+ 
                        :+@@ @  @%  @  @%@ *-  -==:%@@@%=*#*+=-+%####################*##*********++ 
   @@@@@@@@@@@@@@  -=+++==-%* #@@   :@@*  @@ @#  @ +-*@@@@@@@@@@##**##*##############**#**********+ 
+@@@@@%########%@@. ...::-:-+@@ @  =@  %   @=  +. @- @@       *@@@#*################**###*********+ 
 =@%#############@- .....:::.:@  %%-== @ @:=  @@@+@   .@@@*      %###################*##*#******+*+ 
--#@%############@: .......::.:%@@-@ @  #  @ @ -  @+@*:   %@  #@=@@%###############*#*##*#********+ 
-#.@%############@- ...........    #% @@  @@@  @  :@=   +@  @@.   @@#+++*##%%%%#########*********** 
 =-@%############@- .............:..+@=+@@@ %  @       @.  @: @    *=@@%#*+=--+#%###*###*********++ 
 @@%%############@. ............::::..:--.@ @  @     @@ @ @  .@@@@@@@#:+@%%%%%#+=####*##**********+ 
 -%##############@@  ........:::::..        = @@    @    %  @@  @  @-*@+-##***##*=%##************++ 
+@%###%@@@@%#####%@  ......::---:   .-+@%%%+@@@@   @@@     @=   @  @@*-@%=##****#+-%##***********+* 
=%%%%#%@  +%#####%@%  ...::::-:. +@@@@@@@@@@===@ :@@@@    @     @- @@%%-*%=*##*****+####*#********* 
:@%#%#%@@@@%######@@   ..:::--.:@@@@%##*###@#==%@@@#%@@  @@@   %@@@@%#%%++@=+#****#+##**********+** 
 %%*%#############%@@      :-.+%@%##*##*####%+=+%####%@@@@@@@  @@#%#####%=+@+##***#+*#************+ 
*@%%%###############@@@@:.    *@%#**#**#**###+++########%##%@@%@#######*##=*+#%%@@%+*#**********+*+ 
 %@%#################%@@@@@@@@+%#*#******#*##+=+##**#*#***#*#%%##*#######%#=+%@@@*-%%*********+***+ 
 -%%#################%@ :@#%@=-%#**********##+=*#*****************########%#=-     @##**********+** 
-++@%################%#  @#%@@-%#*********###+=*#*******************#*#####@#= ... *%#*********++*+ 
:#-+@##%%%%##########%@@@@#%%%:%##***##***###=+#***************#**#########@%@  .. #%********+***++ 
.#*.@##%==%############%%%#%%@:#%###*####%%%*+%#**#*************###*#######%@@  .: :@#***********++ 
:%%:@##%%%%#############%%##%@+-@@@@@@@@%%#*=####*#************#############@@+ .. :@#***********++ 
.:-.@##########%%%#######%%##%@=+*####%=+=:=%@#########**###*##############%@@= .. -@#*********++++ 
:+%@@%########@@@@@######%%%#%@%* ::----==-.#@%#####################%###%@@@@@# ..  ##*********+*++ 
.#=:%@%#######@   @######%%%%%@%#..:.....::.+%@%###%%%%%#%%##%##%###%@@@@@#=+.:..:  #%************+ 
.##*:#@%######@@@@@#######%%%%%@*: ......:-.-#@@@@@@@@%%%%%%@%@@@@@@@@##*:. @--.....@%*****+****+++ 
.###*-@%%%%###############%%%%%@++ ::..:::-::#-.+++##@@@@@@@@@@@@@#*+=.::-- @.:.... +%*********+*++ 
.#%%%-@@@@@%################%%%@#+ ::..:::-- *@ .:=+***++===-----:::......  @-.. .. +@*********+*++ 
.+-:: %@  @%#############%%%%%%@#*::::..::--.-@ .....:-----::::....         -@ :... :@#**********++ 
 . *#*+@@@@=====================#             =                              =                      
  */
  }
  Scratch.extensions.register(new fsaapi98396());
})(Scratch);
