// Name: Local Storage
// ID: localstorage
// Description: Store data persistently. Like cookies, but better.

(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Local Storage must be run unsandboxed");
  }

  const PREFIX = "extensions.turbowarp.org/local-storage:";

  const soup_ =
    "!#%()*+,-./:;=?@[]^_`{|}~" +
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const uid = function () {
    const length = 10;
    const soupLength = soup_.length;
    const id = [];
    for (let i = 0; i < length; i++) {
      id[i] = soup_.charAt(Math.random() * soupLength);
    }
    return id.join("");
  };

  if (!runtime.extensionStorage["localstorage"]) {
    runtime.extensionStorage["localstorage"] = Object.create(null);
    runtime.extensionStorage["localstorage"].namespace = uid();
  }
  const extStorage = runtime.extensionStorage["localstorage"];
  const namespace = extStorage.namespace;

  const getFullStorageKey = () => `${PREFIX}${namespace}`;

  const readFromStorage = () => {
    try {
      // localStorage could throw if unsupported
      const data = localStorage.getItem(getFullStorageKey());
      if (data) {
        // JSON.parse could throw if data is invalid
        const parsed = JSON.parse(data);
        if (parsed && parsed.data) {
          // Remove invalid values from the JSON
          const processed = {};
          for (const [key, value] of Object.entries(parsed.data)) {
            if (
              typeof value === "number" ||
              typeof value === "string" ||
              typeof value === "boolean"
            ) {
              processed[key] = value;
            }
          }
          return processed;
        }
      }
    } catch (error) {
      console.error("error reading from local storage", error);
    }
    return {};
  };

  const saveToLocalStorage = (data) => {
    try {
      if (Object.keys(data).length > 0) {
        localStorage.setItem(
          getFullStorageKey(),
          JSON.stringify({
            time: Math.round(Date.now() / 1000),
            data,
          })
        );
      } else {
        localStorage.removeItem(getFullStorageKey());
      }
    } catch (error) {
      console.error("error saving to locacl storage", error);
    }
  };

  window.addEventListener("storage", (event) => {
    if (
      namespace &&
      event.key === getFullStorageKey() &&
      event.storageArea === localStorage
    ) {
      Scratch.vm.runtime.startHats("localstorage_whenChanged");
    }
  });

  Scratch.vm.runtime.on("RUNTIME_DISPOSED", () => {
    // reset to another randomly generated id when
    // runtime is cleared
    extStorage.namespace = uid();
  });

  class LocalStorage {
    getInfo() {
      return {
        id: "localstorage",
        name: Scratch.translate("Local Storage"),
        docsURI: "https://extensions.turbowarp.org/local-storage",
        blocks: [
          {
            opcode: "setProjectId",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set storage namespace ID to [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("project title"),
              },
            },
          },
          {
            opcode: "getProjectId",
            blockType: Scratch.BlockType.REPORTER,
            text: "get storage ID", // used "get" to be consistent with "get key"
          },
          "---",
          {
            opcode: "get",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get key [KEY]"),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("score"),
              },
            },
          },
          {
            opcode: "set",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set key [KEY] to [VALUE]"),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("score"),
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1000",
              },
            },
          },
          {
            opcode: "remove",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete key [KEY]"),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("score"),
              },
            },
          },
          {
            opcode: "removeAll",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete all keys"),
          },
          {
            opcode: "whenChanged",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when another window changes storage"),
            isEdgeActivated: false,
          },
        ],
      };
    }
    setProjectId({ ID }) {
      extStorage.namespace = Scratch.Cast.toString(ID);
    }
    getProjectId() {
      return Scratch.Cast.toString(extStorage.namespace);
    }
    get({ KEY }) {
      const storage = readFromStorage();
      KEY = Scratch.Cast.toString(KEY);
      if (!Object.prototype.hasOwnProperty.call(storage, KEY)) {
        return "";
      }
      return storage[KEY];
    }
    set({ KEY, VALUE }) {
      const storage = readFromStorage();
      storage[Scratch.Cast.toString(KEY)] = VALUE;
      saveToLocalStorage(storage);
    }
    remove({ KEY }) {
      const storage = readFromStorage();
      delete storage[Scratch.Cast.toString(KEY)];
      saveToLocalStorage(storage);
    }
    removeAll() {
      saveToLocalStorage({});
    }
  }
  Scratch.extensions.register(new LocalStorage());
})(Scratch);
