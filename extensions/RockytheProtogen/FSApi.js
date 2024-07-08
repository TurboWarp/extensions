// Name: File System Access API
// ID: fsaapi98396
// Description: Access and modify files and folders using FSA-API.
// By: Rocky the Protogen
// License: GNU-GPL3

/**
 * Credits:
 *  https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
 *  https://github.com/TurboWarp/extensions/blob/master/extensions/files.js
 *
 */

(function (Scratch) {
  "use strict";

  const app = {
    hasFSAccess:
      "chooseFileSystemEntries" in window || "showOpenFilePicker" in window,
  };

  let fileHandles;
  let output = "";
  let storefd = "";
  let storefhi = "";
  let writeFail = false;
  let unsupportedBrowser = false;
  let mayOpenFilePicker = false;
  console.log(fileHandles); //This cannot be removed for some reason.
  if (!Scratch.extensions.unsandboxed) {
    throw new Error(
      "File System Access API cannot run on sandboxes. Please disable the sandbox when loading the extension."
    );
  }
  alert(
    "🛠️   This extension is in development   🛠️\nTo prevent data loss, avoid using this on personal files or folders."
  );
  if (app.hasFSAccess) {
    console.log("Browser supports FSAAPI.");
  } else {
    unsupportedBrowser = true;
    alert(
      "Your current browser does not support File System Access API!\nThese blocks will not function.\nThere is a button in the palette to let you see supported browsers."
    );
  }

  class fsaapi98396 {
    /**
     * Code Import Section
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
            opcode: "getUserPermissionFP",
            blockType: Scratch.BlockType.COMMAND,
            text: "Request file picker permission",
          },
          {
            opcode: "rqFilePicker",
            blockType: Scratch.BlockType.COMMAND,
            text: "Request to open file",
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
            text: "(Broken?) Write string [IN] to open file",
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
            opcode: "dirMultiFileOpen",
            blockType: Scratch.BlockType.COMMAND,
            text: "(No Code Yet) Open a Directory",
          },
        ],
        menus: {
          TYPES: {
            acceptReporters: true,
            items: ["stream", "text", "arrayBuffer"],
          },
        },
      };
    }

    getSupportedBrowsers() {
      Scratch.openWindow(
        "https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker#browser_compatibility"
      );
    }

    getUserPermissionFP() {
      return new Promise((resolve, reject) => {
        if (!mayOpenFilePicker) {
          mayOpenFilePicker = confirm(
            `Do you allow the following site to open your file picker?\n"${window.location.href}"`
          );
          mayOpenFilePicker ? resolve() : reject();
        } else {
          resolve();
        }
      });
    }

    rqFilePicker() {
      return new Promise((resolve, reject) => {
        if (output === "" && mayOpenFilePicker) {
          window
            .showOpenFilePicker({ multiple: false })
            .then(async (handles) => {
              try {
                output = "";
                const fileHandle = handles[0];
                await fileHandle.createWritable();
                const file = await fileHandle.getFile();
                output = JSON.stringify({
                  type: file.kind,
                  name: file.name,
                  size: file.size,
                  lastModified: file.lastModified,
                  lastModifiedDate: file.lastModifiedDate,
                });
                if (file.size >= 25000000) {
                  if (
                    confirm(
                      "This file is a rather large file, it could cause the site to freeze or crash!\nContinue anyway?\nSize:" +
                        this.humanFileSize(file.size, true)
                    )
                  ) {
                    console.log("Large file was imported");
                  } else {
                    reject;
                  }
                }
                storefd = file;
                storefhi = fileHandle;
                resolve(output);
              } catch (error) {
                writeFail = true;
                reject(error);
              }
            })
            .catch(reject);
        } else {
          reject(
            new Error("Could not prompt, check user input and try again.")
          );
        }
      });
    }

    getOpenedFileData(args) {
      if (output === "") {
        return "";
      }

      const file = storefd;

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
          if (args.TYPE === "arrayBuffer") {
            const arrayBuffer = reader.StreamOutResult;
            const uint8Array = new Uint8Array(arrayBuffer);
            resolve("[" + Array.from(uint8Array).toString() + "]");
          } else if (args.TYPE === "text") {
            resolve(reader.StreamOutResult);
          } else {
            console.log('Reading stream...');
            const streamReader = file.stream().getReader();
            const decoder = new TextDecoder();
            let StreamOutResult = "";
            const delay = 5;
            const chunkSize = 1024;
            
            async function readChunks() {
              while (true) {
                const { done, value } = await streamReader.read();
                if (done) {
                  console.log('Stream reading complete.');
                  resolve(StreamOutResult)
                }
            
                StreamOutResult += decoder.decode(value, { stream: true });
                console.log(StreamOutResult);
            
                if (value.length >= chunkSize) {
                  console.log('waiting...');
                  await new Promise(resolve => setTimeout(resolve, delay));
                }
              }
            }
            
            readChunks().catch(error => console.error('Error reading stream:', error));
        };

        reader.onerror = () => {
          reject(new Error("Error reading file"));
        };

        if (args.TYPE === "arrayBuffer") {
          reader.readAsArrayBuffer(file);
        } else if (args.TYPE === "text") {
          reader.readAsText(file);
        }
      });
    }

    getFileHandles() {
      return output;
    }

    outputCheck() {
      return output === "";
    }

    writeSingleFile(args) {
      if (output !== "") {
        const fileHandle = storefhi;

        return new Promise((resolve, reject) => {
          fileHandle
            .createWritable()
            .then((writable) => {
              writable.pipeTo(args.IN);
              console.log("Piped to file:" + args.IN);
              resolve("File written successfully");
            })
            .catch(reject);
        });
      } else {
        return Promise.reject("No file to write to!");
      }
    }

    closeSingleFile() {
      const fileHandle = storefhi;
      output = "";
      storefd = "";

      return new Promise((resolve, reject) => {
        fileHandle
          .createWritable()
          .then((writable) => {
            writable
              .close()
              .then(() => {
                storefhi = "";
                resolve("File closed successfully");
              })
              .catch(reject);
          })
          .catch(reject);
      });
    }

    writeAccessFailCheck() {
      return writeFail || !mayOpenFilePicker;
    }
  }

  Scratch.extensions.register(new fsaapi98396());
})(Scratch);
