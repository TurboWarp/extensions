// Name: Modals
// ID: htmlalert
// Description: This extension adds modal dialog boxes.
// By: scratch_craft_2 <https://scratch.mit.edu/users/scratch_craft_2/>
// License: MPL-2.0

(function (Scratch) {
    "use strict";
    class modals {
      getInfo() {
        (function (Scratch) {
    "use strict";
    class modals {
      getInfo() {
        return {
          id: "htmlalert",
          name: "modals",
          color1: "#a3c0e1",
          blocks: [
            {
              opcode: "alert",
              blockType: Scratch.BlockType.COMMAND,
              text: "alert [text]",
              arguments: {
                text: {
                  defaultValue: "hello!",
                  type: Scratch.ArgumentType.STRING,
                },
            },
           },
          {
              opcode: "Prompt",
              blockType: Scratch.BlockType.REPORTER,
              text: "prompt [text], default value: [classic]",
              arguments: {
                text: {
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
              opcode: "Confirm",
              blockType: Scratch.BlockType.BOOLEAN,
              text: "confirm [text]",
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
      alert(args) {
        alert([args.text]);
      }
      Prompt(args) {
        return prompt([args.text], [args.classic]);
      }
      Confirm(args) {
        return confirm([args.text]);
      
    }
    Scratch.extensions.register(new modals());
  })(Scratch);
