// Name: File System Access API
// ID: FileSystemAccessAPIv2
// Description: Access and modify files and folders using FSA-API.
// By: Rocky the Protogen
// License: GNU-GPL3

(function(Scratch) {
    'use strict';

    //Define global varaibles

    //Define global const
    const app = {hasFSAccess: "chooseFileSystemEntries" in window || "showOpenFilePicker" in window};
    const bt = {reporter: Scratch.BlockType.REPORTER, boolean: Scratch.BlockType.BOOLEAN, command: Scratch.BlockType.COMMAND, label: Scratch.BlockType.LABEL, button: Scratch.BlockType.BUTTON}
    const conv = Scratch.Cast()
    
    //Checks
    if (!Scratch.extensions.unsandboxed) throw new Error('<Extension Name> must run unsandboxed');


    //WOAH
    // 2 Classes? Yes!
    // Why? Separation.
    // Doesn't say I can't... so I will

    class files {
        //Variables
        getInfo() {
          return {
            id: 'filesystemaccessapiv2files',
            name: 'File System Access Files',
            blocks: [
              {
                opcode: 'OpenFile',
                blockType: bt.command,
                text: 'Open a file'
              }
            ]
          };
        }
        //Functions

      }
  

    class folders {
      getInfo() {
        return {
          id: 'filesystemaccessapiv2folders',
          name: 'File System Access Folders',
          blocks: [
            {
              opcode: 'OpenFolder',
              blockType: bt.command,
              text: 'Open a Folder'
            }
          ]
        };
      }
      //Functions
    }

    try {
        Scratch.extensions.register(new files())
        Scratch.extensions.register(new folders())
    } catch (err) {
        alert('Failed to load a module!\nPlease report this issue.\nDetails:\n' + err);
    }
  })(Scratch);