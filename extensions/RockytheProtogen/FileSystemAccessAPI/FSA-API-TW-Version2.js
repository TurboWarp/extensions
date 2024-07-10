// Name: File System Access API
// ID: FileSystemAccessAPIv2
// Description: Access and modify files and folders using FSA-API.
// By: Rocky the Protogen
// License: GNU-GPL3

(function(Scratch) {
    'use strict';

    //Define varaibles

    //Define const stuff

    //Checks
  
    if (!Scratch.extensions.unsandboxed) {
      throw new Error('<Extension Name> must run unsandboxed');
    }


    //WOAH
    // 2 Classes? Yes!
    // Why? Separation.

    class files {
        getInfo() {
          return {
            id: 'filesystemaccessapiv2files',
            name: 'File System Access Files',
            blocks: [
              {
                opcode: 'OpenFile',
                blockType: Scratch.BlockType.REPORTER,
                text: 'Open a file'
              }
            ]
          };
        }
        hello() {
          return 'World!';
        }
      }
  

    class folders {
      getInfo() {
        return {
          id: 'filesystemaccessapiv2folders',
          name: 'File System Access Folders',
          blocks: [
            {
              opcode: 'OpenFolder',
              blockType: Scratch.BlockType.REPORTER,
              text: 'Open a Folder'
            }
          ]
        };
      }
      hello() {
        return 'World!';
      }
    }
    Scratch.extensions.register(new files())
    Scratch.extensions.register(new folders());
  })(Scratch);