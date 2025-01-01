(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("File System Access API must run unsandboxed.");
  }

  class rtpfsaapi {
    getInfo() {
      return {
        id: "rtpfsaapi",
        name: "File System Access API",
        blocks: [
          {
            opcode: "filepicker",
            blockType: "reporter",
            text: "window.showOpenFilePicker([json])",
            arguments: {
              json: {
                type: "string",
              },
            },
          },
          {
            opcode: "filesavepicker",
            blockType: "reporter",
            text: "window.showSaveFilePicker([json])",
            arguments: {
              json: {
                type: "string",
              },
            },
          },
          {
            opcode: "folderpicker",
            blockType: "reporter",
            text: "window.showDirectoryPicker([json])",
            arguments: {
              json: {
                type: "string",
              },
            },
          },
          {
            opcode: "isSameEntry",
            blockType: "Boolean",
            text: "[handle].isSameEntry([Chandle])",
            arguments: {
              handle: {
                acceptReporters: true,
              },
              Chandle: {
                acceptReporters: true,
              }
            },
          },
          {
            opcode: "queryHandlePermission",
            blockType: "reporter",
            text: "[handle].queryPermission([permissions])",
            arguments: {
              handle: {
                acceptReporters: true,
              },
              permissions: {
                type: "string"
              }
            },
          },
          {
          opcode: "requestHandlePermission",
          blockType: "command",
          text: "[handle].requestPermission([permissions])",
          arguments: {
              handle: {
                acceptReporters: true,
              },
              permissions: {
                type: "string"
              }
            },
          },
          {
            opcode: "remove",
            blockType: "command",
            text: "[handle].remove()",
            arguments: {
              handle: {
                acceptReporters: true,
              },
            },
          },
          {
            opcode: "kind",
            blockType: "reporter",
            text: "[handle].kind",
            arguments: {
              handle: {
                acceptReporters: true,
              },
            },
          },
          {
            opcode: "name",
            blockType: "reporter",
            text: "[handle].name",
            arguments: {
              handle: {
                acceptReporters: true,
              },
            },
          },
          {
            opcode: "getFile",
            blockType: "reporter",
            text: "[handle].getFile()",
            arguments: {
              handle: {
                acceptReporters: true,
              },
            },
          },
          {
            opcode: "text",
            blockType: "reporter",
            text: "[handle].text()",
            arguments: {
              handle: {
                acceptReporters: true,
              },
            },
          },
          {
            opcode: "arrayBuffer",
            blockType: "reporter",
            text: "[handle].arrayBuffer()",
            arguments: {
              handle: {
                acceptReporters: true,
              },
            },
          },
          {
            opcode: "arrayFromArrayBuffer",
            blockType: "reporter",
            text: "new Uint8Array([arrayBuffer])",
            arguments: {
              handle: {
                acceptReporters: true,
              },
            },
          },
        ],
      };
    }
    filepicker(args) {
      try {
        return window.showOpenFilePicker(JSON.parse(args.json));
      } catch (err) {
        return err;
      }
    }
    filesavepicker(args) {
      try {
        return window.showSaveFilePicker(JSON.parse(args.json));
      } catch (err) {
        return err;
      }
    }
    folderpicker(args) {
      try {
        return window.showDirectoryPicker(JSON.parse(args.json));
      } catch (err) {
        return err;
      }
    }
    getFile(args) {
      try {
        let handle;
        [handle] = args.handle;
        return handle.getFile();
      } catch (err) {
        return err;
      }
    }
    slice(args) {
      try {
        let handle;
        const parameters = args.start.split(",");
        console.log(parameters);
        handle = args.handle;
        return handle.slice(parameters[0], parameters[1]);
      } catch (err) {
        return err;
      }
    }
    text(args) {
      try {
        let handle;
        handle = args.handle;
        return handle.text();
      } catch (err) {
        return err;
      }
    }
    arrayBuffer(args) {
      try {
        let handle;
        handle = args.handle;
        return handle.arrayBuffer();
      } catch (err) {
        return err;
      }
    }
    arrayFromArrayBuffer(args) {
      return new Uint8Array(args.arrayBuffer);
    }
    queryHandlePermission(args) {
      try {
        let handle;
        [handle] = args.handle;
        return handle.queryPermission(JSON.parse(args.permissions))
      } catch (err) {
        return err;
      }
    }
    isSameEntry(args) {
      try {
        let handle;
        let Chandle;
        [handle] = args.handle;
        [Chandle] = args.Chandle;
        return handle.isSameEntry(Chandle)
      } catch (err) {
        return err;
      }
    }
    remove(args) {
      let handle;
      [handle] = args.handle;
      handle.remove()
    }
    requestHandlePermission(args) {
      let handle;
      [handle] = args.handle;
      handle.requestPermission(JSON.parse(args.permissions))
    }
    kind(args) {
      try {
        let handle;
        [handle] = args.handle;
        return handle.kind;
      } catch (err) {
        return err;
      }
    }
    name(args) {
      try {
        let handle;
        [handle] = args.handle;
        return handle.name;
      } catch (err) {
        return err;
      }
    }
  }
  Scratch.extensions.register(new rtpfsaapi());
})(Scratch);
