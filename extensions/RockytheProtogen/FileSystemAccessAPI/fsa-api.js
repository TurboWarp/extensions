(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("File System Access API must run unsandboxed");
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
    async arrayFromBlob(args) {
      return await new Response(args.blob).arrayBuffer();
    }
  }
  Scratch.extensions.register(new rtpfsaapi());
})(Scratch);
