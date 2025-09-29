// Name: Local Storage V2
// ID: 8x2sls
// Description: Store per-project data persistently.
// By: 8to16 <https://scratch.mit.edu/users/8to16/>
// License: MIT AND MPL-2.0

// Some code has been copied from ../local-storage.js under the MIT Licence and MPL-2.0.

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Local Storage V2 extension must run unsandboxed");
  }

  // If no crypto.randomUUID support, error out.
  if (typeof crypto.randomUUID !== "function") {
    throw new Error(
      "Browser is too old for randomUUID; please use Local Storage V1 instead"
    );
  }

  // Load the UUID if it already exists; else generate a new one.
  let uuid = "";
  function _configureUUID(force) {
    if (force || !Scratch.vm.runtime.platform["secureLocalStorageUUID"]) {
      Scratch.vm.runtime.platform["secureLocalStorageUUID"] =
        crypto.randomUUID();
    }
    uuid = Scratch.vm.runtime.platform["secureLocalStorageUUID"];
  }

  Scratch.vm.runtime.on("PROJECT_LOADED", () => {
    _configureUUID();
  });

  class Eightx2_SLS {
    _constructKeyName(name) {
      let keyName = "extensions.turbowarp.org/local-storage-v2#";
      keyName += `${uuid}/`;
      keyName += name;
      return keyName;
    }

    getInfo() {
      return {
        id: "8x2sls",
        name: Scratch.translate("Storage V2"),
        blocks: [
          {
            func: "resetUUID",
            text: Scratch.translate("Reset Storage Scope"),
            blockType: Scratch.BlockType.BUTTON,
          },
          {
            opcode: "setKey",
            text: Scratch.translate("set key [KEY] to [VALUE]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "score",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1000",
              },
            },
          },
          {
            opcode: "getKey",
            text: Scratch.translate("get key [KEY]"),
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "score",
              },
            },
          },
        ],
      };
    }

    resetUUID() {
      if (
        confirm(
          Scratch.translate({
            id: "resetUUIDConfirmation",
            default:
              "The storage scope is a unique string of letters and numbers that cannot be " +
              "easily reproduced after they are generated.\n\n" +
              "Anyone who has previously stored data in this project will lose their data " +
              "in newer versions of the project. You should only generally do this if you " +
              "need to make a breaking change.\n\n" +
              "You will NOT be able to use the previous scope again after this. Would you still " +
              "like to continue?",
          })
        )
      ) {
        // true = force, meaning the UUID will regenerate even if it already exists.
        _configureUUID(true);
      }
    }

    setKey(args, util) {
      localStorage[this._constructKeyName(args.KEY)] = Scratch.Cast.toString(
        args.VALUE
      );
    }

    getKey(args, util) {
      return localStorage[this._constructKeyName(args.KEY)]
        ? Scratch.Cast.toString(localStorage[this._constructKeyName(args.KEY)])
        : "";
    }
  }

  Scratch.extensions.register(new Eightx2_SLS());
})(Scratch);
