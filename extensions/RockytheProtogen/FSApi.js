// Name: File System Access API
// ID: fsaapi98396
// Description: Access and modify files and folders using FSA-API.
// By: Rocky the Protogen
// License: GNU-GPL3

/**
 * Credits
 * Browser Check: https://stackoverflow.com/questions/11219582/how-to-detect-my-browser-version-and-operating-system-using-javascript
 * Some code is inspired by already existing extensions.
 * Inspiration:
 *    GarboMuffin's Files Extension
 *        https://github.com/TurboWarp/extensions/blob/master/extensions/files.js
 *    Lily's LMS Utilities Extension
 *        https://github.com/TurboWarp/extensions/blob/master/extensions/Lily/lmsutils.js
 *
 */

(function (Scratch) {
  "use strict";
  let fileHandles;
  let output = "";
  let storefd = "";
  let storefhi = "";
  let WriteFail = false;
  let MayOpenFilePicker = false;
  if (!Scratch.extensions.unsandboxed) {
    throw new Error(
      "File System Access API cannot run on sandboxes, it's too grainy!\nPlease disable the sandbox when loading the extension.\n Cheers! - Rocky"
    );
  }

  //// Browser Check Start ////
  //// From StackOverFlow :3 ////
  var nVer = navigator.appVersion;
  var nAgt = navigator.userAgent;
  var browserName = navigator.appName;
  var fullVersion = "" + parseFloat(navigator.appVersion);
  var majorVersion = parseInt(navigator.appVersion, 10);
  var nameOffset, verOffset, ix;

  //more ESLint trickery.

  // In Opera, the true version is after "OPR" or after "Version"
  if ((verOffset = nAgt.indexOf("OPR")) != -1) {
    console.log();
  }
  // In MS Edge, the true version is after "Edg" in userAgent
  else if ((verOffset = nAgt.indexOf("Edg")) != -1) {
    console.log();
  }
  // In MSIE, the true version is after "MSIE" in userAgent
  else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
    alert(
      "This browser might not be supported! Please use Edge, Chrome, or Opera.\nYou will still be able to use the blocks, but they may not function."
    );
  }
  // In Chrome, the true version is after "Chrome"
  else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
    console.log();
  }
  // In Safari, the true version is after "Safari" or after "Version"
  else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
    alert(
      "This browser might not be supported! Please use Edge, Chrome, or Opera.\nYou will still be able to use the blocks, but they may not function."
    );
  }
  // In Firefox, the true version is after "Firefox"
  else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
    alert(
      "This browser might not be supported! Please use Edge, Chrome, or Opera.\nYou will still be able to use the blocks, but they may not function."
    );
  } else {
    alert(
      "This browser might not be supported! Please use Edge, Chrome, or Opera.\nYou will still be able to use the blocks, but they may not function."
    );
  }
  //ESLint stuff, idk what I can remove here.
  console.log(
    nVer +
      browserName +
      fullVersion +
      majorVersion +
      nameOffset +
      verOffset +
      ix
  );
  //// End of Browser Check ////

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
            opcode: "writeaccessfailcheck",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Access denied?",
          },
          {
            opcode: "outputchkr",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Is JSON blank?",
          },
          {
            opcode: "getfileHandles",
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
            opcode: "writesinglefile",
            blockType: Scratch.BlockType.COMMAND,
            text: "(Broken?) Write array [IN] to open file",
            arguments: {
              IN: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "closesinglefile",
            blockType: Scratch.BlockType.COMMAND,
            text: "Close File",
          },
          {
            opcode: "dirmultifileopen",
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
    ESLintBait() {
      //"Unused" variables I can't remove without breaking the script.
      //Why you ask?
      //idfk
      return fileHandles;
    }
    getUserPermissionFP() {
      return new Promise((resolve, reject) => {
        if (MayOpenFilePicker == false) {
          MayOpenFilePicker = confirm(
            'Do you allow the following site to open your file picker?\n"' +
              window.location.href +
              '"'
          );
          if (MayOpenFilePicker) {
            resolve();
          } else {
            reject();
          }
        } else {
          resolve();
        }
      });
    }
    rqFilePicker() {
      return new Promise((resolve, reject) => {
        if ((output == "") & (MayOpenFilePicker == true)) {
          window
            .showOpenFilePicker({ multiple: false })
            .then(async (fileHandles) => {
              try {
                output = "";
                const fileHandle = fileHandles[0];
                console.log(fileHandle);
                try {
                  await fileHandle.createWritable();
                } catch (error) {
                  WriteFail = true;
                  reject(error);
                }
                WriteFail = false;
                const file = await fileHandle.getFile();
                const Prejson = {
                  type: file.kind,
                  name: file.name,
                  size: file.size,
                  lastModified: file.lastModified,
                  lastModifiedDate: file.lastModifiedDate,
                };
                console.log(file);
                output = JSON.stringify(Prejson);
                storefd = file;
                storefhi = fileHandle;
                resolve(output);
              } catch (error) {
                reject(error);
              }
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          reject(
            new Error("Could not prompt, check user input and try again.")
          );
        }
      });
    }
    getOpenedFileData(args) {
      if (output == "") {
        return "";
      }
      try {
        if (args.TYPE == "arrayBuffer") {
          const file = storefd;
          return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
              const arrayBuffer = reader.result;
              const uint8Array = new Uint8Array(arrayBuffer);
              const string = Array.from(uint8Array).toString();
              resolve("[" + string + "]");
            };

            reader.onerror = () => {
              reject(new Error("Error reading file"));
            };

            reader.readAsArrayBuffer(file);
          });
        } else if (args.TYPE == "text") {
          const file = storefd;
          return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
              const text = reader.result;
              resolve(text);
            };
            reader.onerror = () => {
              reject(new Error("Error reading file"));
            };

            reader.readAsText(file);
          });
        } else if (args.TYPE == "stream") {
          const file = storefd;
          return new Promise((resolve, reject) => {
            const reader = file.stream().getReader();
            const decoder = new TextDecoder();
            let result = "";

            reader
              .read()
              .then(function processText({ done, value }) {
                if (done) {
                  resolve(result);
                  return;
                }
                result += decoder.decode(value, { stream: true });
                return reader.read().then(processText);
              })
              .catch((error) => {
                reject(new Error("Error reading stream: " + error));
              });
          });
        } else {
          return "Invalid Read Method.\nMust be arrayBuffer, Text, or Stream.";
        }
      } catch (error) {
        throw new Error("Could not read. Reason:\n" + error);
      }
    }
    getfileHandles() {
      return output;
    }
    outputchkr() {
      return output == "";
    }
    writesinglefile(args) {
      if (output !== "") {
        const arrayIn = new Uint8Array(args.IN).buffer;
        const fileHandle = storefhi;

        return new Promise((resolve, reject) => {
          fileHandle
            .createWritable()
            .then((writable) => {
              console.log("Writing to file:", arrayIn);
              return writable
                .write(arrayIn)
                .then(() => writable.close())
                .then(async () => {
                  output = "";
                  const fileHandle = fileHandles[0];
                  console.log(fileHandle);
                  const file = await fileHandle.getFile();
                  const Prejson = {
                    type: file.kind,
                    name: file.name,
                    size: file.size,
                    lastModified: file.lastModified,
                    lastModifiedDate: file.lastModifiedDate,
                  };
                  console.log(file);
                  output = JSON.stringify(Prejson);
                  storefd = file;
                  storefhi = fileHandle;
                  return fileHandle.createWritable();
                })
                .then(() => resolve("File written successfully"))
                .catch((error) => reject(error));
            })
            .catch((error) => reject(error));
        });
      } else {
        return Promise.reject("No file to write to!");
      }
    }
    closesinglefile() {
      const fileHandle = storefhi;
      output = "";
      Scratch; //this just appeared, and it works. I'm not going to touch it.
      storefd = "";
      return new Promise((resolve, reject) => {
        fileHandle.createWritable().then((writable) => {
          return writable
            .close()
            .then(() => (storefhi = ""))
            .then(() => resolve("File closed successfully"))
            .catch((error) => reject(error));
        });
      });
    }
    writeaccessfailcheck() {
      return WriteFail || !MayOpenFilePicker;
    }
  }
  Scratch.extensions.register(new fsaapi98396());
})(Scratch);
