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

(function (Scratch) {
  "use strict";

  const app = {
    hasFSAccess:
      "chooseFileSystemEntries" in window || "showOpenFilePicker" in window,
  };

  let fileHandle;
  let folderHandle;
  let output = "";
  let storefd = null;
  let writeFail = false;
  let FolderData = null;
  let unsupportedBrowser = false;
  let mayOpenFilePicker = false;
  let mayOpenFolderPicker = false;

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
    async loadExtension(extUri) {
      const url = Scratch.Cast.toString(extUri);
      await Scratch.vm.extensionManager.loadExtensionURL(url);
    }
    getLoadedExtensions(args) {
      return JSON.stringify(
        Array.from(Scratch.vm.extensionManager._loadedExtensions.keys())
      );
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
            text: "Request a file starting in [LOC]",
            arguments: {
              LOC: {
                type: Scratch.ArgumentType.STRING,
                menu: "LOCATIONS",
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
            text: "Is JSON blank?",
          },
          {
            opcode: "getFileHandles",
            blockType: Scratch.BlockType.REPORTER,
            text: "Get information JSON",
          },
          {
            opcode: "getOpenedFileData",
            blockType: Scratch.BlockType.REPORTER,
            text: "Read file using [TYPE]",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "TYPES",
              },
            },
          },
          {
            opcode: "writeSingleFile",
            blockType: Scratch.BlockType.COMMAND,
            text: "Write string [IN] to open file",
            arguments: {
              IN: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "closeSingleFile",
            blockType: Scratch.BlockType.COMMAND,
            text: "Close File",
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
            opcode: 'getFolderContentsJSON',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Folder contents JSON'
          },
        ],
        menus: {
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
        },
      };
    }

    getSupportedBrowsers() {
      Scratch.openWindow(
        "https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker#browser_compatibility"
      );
    }

    getUserPermissionFiP() {
      if (!mayOpenFilePicker) {
        mayOpenFilePicker = confirm(
          `Do you allow the following site to open your file picker?\n"${window.location.href}"`
        );
        if (!mayOpenFilePicker) throw new Error("Permission denied");
      }
    }
    getUserPermissionFoP() {
      if (!mayOpenFolderPicker) {
        mayOpenFolderPicker = confirm(
          `Do you allow the following site to open your directory picker?\n"${window.location.href}"`
        );
        if (!mayOpenFolderPicker) throw new Error("Permission denied");
      }
    }

    async rqFilePicker(args) {
      try {
        writeFail = false;
        if (output === "" && mayOpenFilePicker) {
          [fileHandle] = await window.showOpenFilePicker({
            multiple: false,
            startIn: args.LOC,
            mode: "readwrite",
          });
          const file = await fileHandle.getFile();
          output = JSON.stringify({
            type: file.type,
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
              throw new Error("Large file import aborted by user");
            }
          }
          storefd = file;
        } else {
          throw new Error("Could not prompt, check user input and try again.");
        }
      } catch (error) {
        writeFail = true;
        console.error("Error opening file:", error);
        throw error;
      }
    }

    async getOpenedFileData(args) {
      if (!storefd) return "";
      try {
        const file = await fileHandle.getFile(); // Re-acquire the file after writing
        storefd = file;
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
          throw new Error("Invalid type specified");
        }
      } catch (error) {
        console.error("Error reading file:", error);
        throw new Error("Error reading file");
      }
    }

    getFileHandles() {
      return output;
    }

    outputCheck() {
      return output === "";
    }

    async writeSingleFile(args) {
      if (fileHandle) {
        try {
          const writable = await fileHandle.createWritable();
          await writable.write(args.IN);
          await writable.close();
          console.log("File written successfully");
          storefd = await fileHandle.getFile(); // Re-acquire the file handle after writing
        } catch (error) {
          console.error("Error writing to file:", error);
          throw new Error("Error writing to file");
        }
      } else {
        throw new Error("No file to write to!");
      }
    }

    closeSingleFile() {
      if (fileHandle) {
        fileHandle = null;
        storefd = null;
        output = "";
        console.log("File closed successfully");
      } else {
        throw new Error("No file to close!");
      }
    }

    writeAccessFailCheck() {
      return writeFail;
    }

    async dirMultiFileOpen(args) {
      try {
        folderHandle = await window.showDirectoryPicker({
          multiple: false,
          startIn: args.LOC,
          mode: "readwrite",
        });
        FolderData = this.internalGetFolderContents(folderHandle);
      } catch (error) {
        throw new Error(error);
      }
    }

    getFolderContentsJSON() {
      return FolderData;
    }

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
            structure["files"].push(entry.name);
          }
        }

        return structure;
      }

      const directoryStructure = await collectDirectoryStructure(dirHandle);
      return JSON.stringify(directoryStructure, null, 2);
    }
  }

  Scratch.extensions.register(new fsaapi98396());
})(Scratch);
