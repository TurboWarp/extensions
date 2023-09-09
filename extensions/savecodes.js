// Name: SaveCodes
// ID: TeksSaveCodes
// Description: Save codes easily using this!
// By: Tek <https://scratch.mit.edu/users/ggez-io/>

// ty skyhigh173 for fixing dropdown

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Save Codes must run Unsandboxed!");
  }

  let Save = "";

  class SaveCodes {
    getInfo() {
      return {
        id: "TeksSaveCodes",
        name: "SaveCodes",
        blocks: [
          {
            opcode: "save",
            text: "add value [val] to save code",
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              val: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "100",
              },
            },
          },
          {
            opcode: "saveset",
            text: "set save code to [savecode]",
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              savecode: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "i like cupcakes|200|100",
              },
            },
          },
          {
            opcode: "savedelete",
            text: "delete save code",
            blockType: Scratch.BlockType.COMMAND,
          },
          {
            opcode: "read",
            text: "get [number] of save code",
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              number: {
                type: Scratch.ArgumentType.STRING,
                menu: "number",
              },
            },
          },
        ],
        menus: {
          number: {
            items: "frfrong",
          },
        },
      };
    }

    save(args) {
      if (Save == "") {
        Save = args.val;
        return;
      }
      Save = Save + "|" + args.val;
      console.log(Save);
    }

    saveset(args) {
      Save = args.savecode;
      console.log(Save);
    }

    savedelete(arg) {
      Save = "";
    }

    read(arg) {
      let repSave = Save;
      return repSave.split("|")[Scratch.Cast.toNumber(arg.number) - 1];
    }

    frfrong() {
      if (Save == "") {
        return [{ text: "none", value: "error, no value assigned" }];
      } else {
        let repSave = Save;
        let saveamt = 0;
        let Test = [];
        repSave.split("|").forEach((x) => {
          saveamt += 1;
          if (x == "") {
            console.log("Blank values don't belong in save codes.");
          } else {
            Test.push({ text: saveamt.toString(), value: saveamt.toString() });
          }
        });
        return Test;
      }
    }
  }

  Scratch.extensions.register(new SaveCodes());
})(Scratch);
