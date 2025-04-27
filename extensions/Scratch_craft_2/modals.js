// Name: Modals
// ID: htmlalert
// Description: This extension adds modal dialog boxes.
// By: scratch_craft_2 <https://scratch.mit.edu/users/scratch_craft_2/>
// License: MPL-2.0

(function (Scratch) {
    "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This Extension must run unsandboxed");
  }

    class modals {
      getInfo() {
        return {
          id: "htmlalert",
          name: "modals",
          color1: "#a3c0e1",
          blocks: [
            {
              opcode: "alertb",
              blockType: Scratch.BlockType.COMMAND,
              text: "alert [textia]",
              arguments: {
                textia: {
                  defaultValue: "hello!",
                  type: Scratch.ArgumentType.STRING,
                },
            },
           },
          {
              opcode: "Promptb",
              blockType: Scratch.BlockType.REPORTER,
              text: "prompt [textip], default value: [classic]",
              arguments: {
                textip: {
                  defaultValue: "what's your name?",
                  type: Scratch.ArgumentType.STRING,
                },
                  classic: {
                  defaultValue: " ",
                  type: Scratch.ArgumentType.STRING,
                },
            },
           },
           { 
              opcode: "Confirmb",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "confirm [textic]",
              arguments: {
                text: {
                  defaultValue: "Did you see that movie?",
                  type: Scratch.ArgumentType.STRING,
                },
            },
           },
          ],
        };
      }
alertb(args) {
 alert([args.textia]);
}
Promptb(args) {
  return prompt([args.textip], [args.classic]);
}
Confirmb(args) {
  return confirm([args.textic]);
}
    }
    Scratch.extensions.register(new modals());
  })(Scratch);
