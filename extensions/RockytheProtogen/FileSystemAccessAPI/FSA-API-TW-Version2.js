// Name: File System Access API
// ID: FileSystemAccessAPIv2
// Description: Access and modify files and folders using FSA-API.
// By: Rocky the Protogen
// License: GNU-GPL3

(function(Scratch) {
    'use strict';

    //Define global varaibles

    /* File Info */
    let fileHandle1, fileHandle2, fileHandle3, fileHandle4, fileHandle5;
    let fimetadata1, fimetadata2, fimetadata3, fimetadata4, fimetadata5;

    /* Folder Info */
    let folderHandle1, folderHandle2, folderHandle3, folderHandle4, folderHandle5;
    let fometadata1, fometadata2, fometadata3, fometadata4, fometadata5;

    //Define global const
    const app = {hasFSAccess: "chooseFileSystemEntries" in window || "showOpenFilePicker" in window};
    const bt = {reporter: Scratch.BlockType.REPORTER, boolean: Scratch.BlockType.BOOLEAN, command: Scratch.BlockType.COMMAND, label: Scratch.BlockType.LABEL, button: Scratch.BlockType.BUTTON}
    const conv = Scratch.Cast()
    const lo = console.log()
    const te = console.error()

    const argtype = Scratch.ArgumentType.STRING
    const fislotmenu = [1,2,3,4,5]
    const fislot = {1: {file: fileHandle1, metadata: fimetadata1},2: {file: fileHandle2, metadata: fimetadata2},3: {file: fileHandle3, metadata: fimetadata3},4: {file: fileHandle4, metadata: fimetadata4},5: {file: fileHandle5, metadata: fimetadata5}}
    const foslot = {1: {file: folderHandle1, fometadata1},2: {file: folderHandle2, fometadata2},3: {file: folderHandle3, fometadata3},4: {file: folderHandle4, fometadata4},5: {file: folderHandle5, fometadata5}}

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