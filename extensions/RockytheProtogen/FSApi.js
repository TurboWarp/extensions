// Name: File System Access API
// ID: fsaapi98396
// Description: Access and modify files and folders using FSA-API.
// By: Rocky the Protogen
// License: GNU-GPL3

(function (Scratch) {
  "use strict";

  let fileHandles;
  let output = "";
  let storefd = "";
  let storefhi = "";
  let writeFail = false;
  let mayOpenFilePicker = false;
  console.log(fileHandles); //This cannot be removed for some reason.
  if (!Scratch.extensions.unsandboxed) {
    throw new Error(
      "File System Access API cannot run on sandboxes. Please disable the sandbox when loading the extension."
    );
  }

  // Browser Check
  const nAgt = navigator.userAgent;
  const verOffset =
    nAgt.indexOf("OPR") !== -1 ||
    nAgt.indexOf("Edg") !== -1 ||
    nAgt.indexOf("Chrome") !== -1
      ? nAgt.indexOf("OPR") !== -1 ||
        nAgt.indexOf("Edg") !== -1 ||
        nAgt.indexOf("Chrome") !== -1
      : -1;

  if (
    verOffset === -1 ||
    nAgt.indexOf("MSIE") !== -1 ||
    nAgt.indexOf("Safari") !== -1 ||
    nAgt.indexOf("Firefox") !== -1
  ) {
    alert(
      "This browser might not be supported! Please use Edge, Chrome, or Opera. You will still be able to use the blocks, but they may not function."
    );
  }

  class fsaapi98396 {
    getInfo() {
      return {
        id: "fsaapi98396",
        name: "File System Access API",
        docsURI:
          "https://developer.chrome.com/docs/capabilities/web-apis/file-system-access",
        blocks: [
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
            text: "(Broken?) Write array [IN] to open file",
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

        reader.onload = () => {
          if (args.TYPE === "arrayBuffer") {
            const arrayBuffer = reader.result;
            const uint8Array = new Uint8Array(arrayBuffer);
            resolve("[" + Array.from(uint8Array).toString() + "]");
          } else if (args.TYPE === "text") {
            resolve(reader.result);
          } else {
            const streamReader = file.stream().getReader();
            const decoder = new TextDecoder();
            let result = "";

            streamReader
              .read()
              .then(function processText({ done, value }) {
                if (done) {
                  resolve(result);
                  return;
                }
                result += decoder.decode(value, { stream: true });
                return streamReader.read().then(processText);
              })
              .catch((error) => {
                reject(new Error("Error reading stream: " + error));
              });
          }
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
        const arrayIn = new Uint8Array(args.IN).buffer;
        const fileHandle = storefhi;

        return new Promise((resolve, reject) => {
          fileHandle
            .createWritable()
            .then((writable) => {
              writable
                .write(arrayIn)
                .then(() => writable.close())
                .then(async () => {
                  output = "";
                  const file = await fileHandle.getFile();
                  output = JSON.stringify({
                    type: file.kind,
                    name: file.name,
                    size: file.size,
                    lastModified: file.lastModified,
                    lastModifiedDate: file.lastModifiedDate,
                  });
                  storefd = file;
                  storefhi = fileHandle;
                  resolve("File written successfully");
                })
                .catch(reject);
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
