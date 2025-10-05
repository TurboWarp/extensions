// Name: Local Storage
// ID: localstorage
// Description: Store data persistently. Like cookies, but better.
// License: MIT AND MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Local Storage must be run unsandboxed");
  }

  const getNamespace = () =>
    Scratch.vm.runtime.extensionStorage["localstorage"]?.namespace;

  const setNamespace = (newNamespace) => {
    Scratch.vm.runtime.extensionStorage["localstorage"] = {
      namespace: newNamespace,
    };
    Scratch.vm.extensionManager.refreshBlocks("localstorage");
  };

  const generateRandomNamespace = () => {
    // doesn't need to be cryptographically secure and doesn't need to have excessive length
    // this has 16^16 = 18446744073709551616 possible namespaces which is plenty
    const soup = "0123456789abcdef";
    let id = "";
    for (let i = 0; i < 16; i++) {
      id += soup[Math.floor(Math.random() * soup.length)];
    }
    return id;
  };

  const generateRandomNamespaceIfMissing = () => {
    if (!getNamespace()) {
      setNamespace(generateRandomNamespace());
    }
  };

  Scratch.vm.runtime.on("PROJECT_LOADED", () => {
    generateRandomNamespaceIfMissing();
  });

  Scratch.vm.runtime.on("RUNTIME_DISPOSED", () => {
    generateRandomNamespace();
  });

  generateRandomNamespaceIfMissing();

  let lastNamespaceWarning = 0;
  const validNamespace = () => {
    const valid = !!getNamespace();
    if (!valid && Date.now() - lastNamespaceWarning > 3000) {
      alert(
        Scratch.translate(
          'Local Storage extension: project must run the "set storage namespace ID" block before it can use other blocks'
        )
      );
      lastNamespaceWarning = Date.now();
    }
    return valid;
  };

  const STORAGE_PREFIX = "extensions.turbowarp.org/local-storage:";
  const getStorageKey = () => `${STORAGE_PREFIX}${getNamespace()}`;

  const readFromStorage = () => {
    try {
      // localStorage could throw if unsupported
      const data = localStorage.getItem(getStorageKey());
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
          getStorageKey(),
          JSON.stringify({
            time: Math.round(Date.now() / 1000),
            data,
          })
        );
      } else {
        localStorage.removeItem(getStorageKey());
      }
    } catch (error) {
      console.error("error saving to locacl storage", error);
    }
  };

  window.addEventListener("storage", (event) => {
    if (
      getNamespace() &&
      event.key === getStorageKey() &&
      event.storageArea === localStorage
    ) {
      Scratch.vm.runtime.startHats("localstorage_whenChanged");
    }
  });

  class LocalStorage {
    getInfo() {
      return {
        id: "localstorage",
        name: Scratch.translate("Local Storage"),
        docsURI: "https://extensions.turbowarp.org/local-storage",
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: getNamespace()
              ? Scratch.translate(
                  {
                    default: "Namespace: {namespace}",
                  },
                  {
                    namespace: getNamespace(),
                  }
                )
              : Scratch.translate("No namespace set"),
          },
          {
            opcode: "get",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get [KEY] from storage"),
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
            text: Scratch.translate("set [KEY] to [VALUE] in storage"),
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
            text: Scratch.translate("delete [KEY] from storage"),
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
            text: Scratch.translate("delete storage"),
          },
          {
            opcode: "whenChanged",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when another window changes storage"),
            isEdgeActivated: false,
          },
          "---",
          {
            opcode: "setProjectId",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set namespace to [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: getNamespace() || Scratch.translate("project title"),
              },
            },
          },
        ],
      };
    }

    setProjectId({ ID }) {
      setNamespace(Scratch.Cast.toString(ID));
    }

    get({ KEY }) {
      if (!validNamespace()) {
        return "";
      }
      const storage = readFromStorage();
      KEY = Scratch.Cast.toString(KEY);
      if (!Object.prototype.hasOwnProperty.call(storage, KEY)) {
        return "";
      }
      return storage[KEY];
    }

    set({ KEY, VALUE }) {
      if (!validNamespace()) {
        return "";
      }
      const storage = readFromStorage();
      storage[Scratch.Cast.toString(KEY)] = VALUE;
      saveToLocalStorage(storage);
    }

    remove({ KEY }) {
      if (!validNamespace()) {
        return "";
      }
      const storage = readFromStorage();
      delete storage[Scratch.Cast.toString(KEY)];
      saveToLocalStorage(storage);
    }

    removeAll() {
      if (!validNamespace()) {
        return "";
      }
      saveToLocalStorage({});
    }
  }

  Scratch.extensions.register(new LocalStorage());
})(Scratch);
