(function(Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {throw new Error('File System Access API must run unsandboxed');}
  
    class rtpfsaapi {
      getInfo() {
        return {
          id: 'rtpfsaapi',
          name: 'File System Access API',
          blocks: [
            {
              opcode: 'filepicker',
              blockType: 'reporter',
              text: 'window.showOpenFilePicker\([json]\)',
              arguments: {
                json: {
                  type: 'string'
                }
              }
            },
            {
              opcode: 'filesavepicker',
              blockType: 'reporter',
              text: 'window.showSaveFilePicker\([json]\)',
              arguments: {
              json: {
                  type: 'string'
                }
              }
            },
 {
   opcode: 'folderpicker',
 blockType: 'reporter',
 text: 'window.showDirectoryPicker\([json]\)',
 arguments: {
   json: {
     type: 'string'
   }
 }
 },
 {
   opcode: 'getFile',
   blockType: 'reporter',
 text: '[handle]\.getFile\(\)',
 arguments: {
   handle: {
     acceptReporters: true,
  }
}
}
          ]
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
        let handle;[handle] = args.handle;return handle.getFile()
        } catch (err) {
          return err;
        }
      }
    }
    Scratch.extensions.register(new rtpfsaapi());
  })(Scratch);
