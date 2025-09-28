// Name: Local Storage V2
// ID: 8x2sls
// Description: Store data persistently, with non-foolproof hack prevention. Like cookies, but better.
// By: 8to16 <https://scratch.mit.edu/users/8to16/>
// License: MIT AND MPL-2.0

// Some code has been copied from ../local-storage.js under the MIT Licence and MPL-2.0.

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Local Storage V2 extension must run unsandboxed");
  }

  // Polyfill for crypto.randomUUID.
  // This part was created using ChatGPT (GPT-4-mini).
  if (typeof crypto.randomUUID !== "function") {
    // @ts-ignore
    crypto.randomUUID = function () {
      // Generate an array of 16 random bytes
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);

      // Per RFC 4122 §4.4, set the version and variant bits
      bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
      bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10xxxxxx

      // Convert to UUID string format: xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
      const hex = [...bytes].map((b) => b.toString(16).padStart(2, "0"));

      return (
        hex.slice(0, 4).join("") +
        "-" +
        hex.slice(4, 6).join("") +
        "-" +
        hex.slice(6, 8).join("") +
        "-" +
        hex.slice(8, 10).join("") +
        "-" +
        hex.slice(10, 16).join("")
      );
    };
  }

  // Hack to store the UUID. Using bracket notation due to type issues.
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
          {
            opcode: "deleteAll",
            text: Scratch.translate("delete all keys"),
            blockType: Scratch.BlockType.COMMAND,
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

    deleteAll() {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (
          key &&
          key.startsWith(`extensions.turbowarp.org/local-storage-v2#${uuid}/`)
        ) {
          localStorage.removeItem(key);
        }
      }
    }
  }

  Scratch.extensions.register(new Eightx2_SLS());
})(Scratch);
