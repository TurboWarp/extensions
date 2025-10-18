// Name: Browser Bridge
// ID: browserBridge
// Description: Provides access to browser APIs like localStorage, console, and dialogs.
// By: Startoto1007 <https://scratch.mit.edu/users/Startoto1007/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions || !Scratch.extensions.unsandboxed) {
    console.warn(
      Scratch.translate(
        "Browser Bridge: running in sandboxed mode or Scratch extensions API not available. Some features may be limited."
      )
    );
  }

  const consent = { storage: null, misc: null };

  function askConsent(type, message) {
    if (consent[type] === null) {
      consent[type] = window.confirm(message);
    }
    return consent[type];
  }

  const STORAGE_PREFIX = "tw-extension:";

  function getNamespace() {
    try {
      const runtimeStore =
        Scratch.vm && Scratch.vm.runtime && Scratch.vm.runtime.extensionStorage
          ? Scratch.vm.runtime.extensionStorage["browserBridge"] || {}
          : {};
      if (!runtimeStore.namespace) {
        const newNamespace =
          (Scratch.vm && Scratch.vm.runtime && Scratch.vm.runtime.projectID) ||
          Math.random().toString(36).substring(2, 10);
        runtimeStore.namespace = newNamespace;
        if (
          Scratch.vm &&
          Scratch.vm.runtime &&
          Scratch.vm.runtime.extensionStorage
        ) {
          Scratch.vm.runtime.extensionStorage["browserBridge"] = runtimeStore;
        }
      }
      return runtimeStore.namespace;
    } catch (e) {
      console.error("Browser Bridge: error obtaining namespace:", e);
      return Math.random().toString(36).substring(2, 10);
    }
  }

  const getStorageKey = () => `${STORAGE_PREFIX}${getNamespace()}`;

  function readStorage() {
    try {
      const data = localStorage.getItem(getStorageKey());
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error("Browser Bridge: error reading localStorage:", e);
      return {};
    }
  }

  function writeStorage(obj) {
    try {
      localStorage.setItem(getStorageKey(), JSON.stringify(obj));
    } catch (e) {
      console.error("Browser Bridge: error saving localStorage:", e);
    }
  }

  function clearStorage() {
    try {
      localStorage.removeItem(getStorageKey());
    } catch (e) {
      console.error("Browser Bridge: error clearing localStorage:", e);
    }
  }

  class BrowserBridge {
    getInfo() {
      return {
        id: "browserBridge",
        name: Scratch.translate("Browser Bridge"),
        color1: "#4b9de2",
        color2: "#2d7cc5",
        unsandboxed: true,
        blocks: [
          {
            opcode: "lsSet",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set localStorage key [KEY] to [VALUE]"),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myKey",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello world",
              },
            },
          },
          {
            opcode: "lsGet",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("localStorage key [KEY]"),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myKey",
              },
            },
          },
          {
            opcode: "lsDelete",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete key [KEY]"),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myKey",
              },
            },
          },
          {
            opcode: "lsClear",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete all keys"),
          },
          "---",
          {
            opcode: "consoleLog",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("console.log [MSG]"),
            arguments: {
              MSG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello world!",
              },
            },
          },
          {
            opcode: "alertMsg",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("alert [MSG]"),
            arguments: {
              MSG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "This is an alert",
              },
            },
          },
          {
            opcode: "confirmDialog",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("confirm [MSG]"),
            arguments: {
              MSG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Are you sure?",
              },
            },
          },
          {
            opcode: "promptDialog",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("prompt [MSG] default [DEF]"),
            arguments: {
              MSG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Enter text",
              },
              DEF: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
            },
          },
          "---",
          {
            opcode: "openUrl",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("open url [URL]"),
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://turbowarp.org",
              },
            },
          },
        ],
      };
    }

    lsSet({ KEY, VALUE }) {
      if (
        !askConsent(
          "storage",
          Scratch.translate(
            "Allow this project to modify, read or delete saved data?"
          )
        )
      )
        return;
      const data = readStorage();
      data[KEY] = VALUE;
      writeStorage(data);
    }

    lsGet({ KEY }) {
      if (
        !askConsent(
          "storage",
          Scratch.translate(
            "Allow this project to modify, read or delete saved data?"
          )
        )
      )
        return "";
      const data = readStorage();
      return Object.prototype.hasOwnProperty.call(data, KEY) ? data[KEY] : "";
    }

    lsDelete({ KEY }) {
      if (
        !askConsent(
          "storage",
          Scratch.translate(
            "Allow this project to modify, read or delete saved data?"
          )
        )
      )
        return;
      const data = readStorage();
      if (Object.prototype.hasOwnProperty.call(data, KEY)) {
        delete data[KEY];
        writeStorage(data);
      }
    }

    lsClear() {
      if (
        !askConsent(
          "storage",
          Scratch.translate(
            "Allow this project to modify, read or delete saved data?"
          )
        )
      )
        return;
      clearStorage();
    }

    consoleLog({ MSG }) {
      if (
        !askConsent(
          "misc",
          Scratch.translate("Allow access to console and alert features?")
        )
      )
        return;
      console.log(MSG);
    }

    alertMsg({ MSG }) {
      if (
        !askConsent(
          "misc",
          Scratch.translate("Allow access to console and alert features?")
        )
      )
        return;
      window.alert(MSG);
    }

    confirmDialog({ MSG }) {
      if (
        !askConsent(
          "misc",
          Scratch.translate("Allow access to console and alert features?")
        )
      )
        return false;
      return window.confirm(MSG);
    }

    async promptDialog({ MSG, DEF }) {
      if (
        !askConsent(
          "misc",
          Scratch.translate("Allow access to console and alert features?")
        )
      )
        return "";
      let result = window.prompt(MSG, DEF);
      if (result instanceof Promise) result = await result;
      return result === null ? "" : String(result);
    }

    openUrl({ URL }) {
      let urlInput = String(URL || "").trim();
      if (!urlInput)
        return console.warn(
          Scratch.translate(
            "Browser Bridge: openUrl called with empty URL argument"
          )
        );
      if (!urlInput.match(/^[a-zA-Z][a-zA-Z0-9+.-]*:/))
        urlInput = "https://" + urlInput;
      let validUrl = null;
      try {
        validUrl = new window.URL(urlInput);
      } catch (e) {
        return console.error("Browser Bridge: Invalid URL:", urlInput);
      }
      // eslint-disable-next-line no-script-url
      if (validUrl.href.toLowerCase().startsWith("javascript:")) {
        console.error("Browser Bridge: Blocked javascript: URL");
        return;
      }

      if (typeof Scratch.openWindow === "function") {
        try {
          Scratch.openWindow(validUrl.href);
          return;
        } catch (e) {
          console.warn(
            "Scratch.openWindow failed, falling back to window.open()"
          );
        }
      }

      // eslint-disable-next-line extension/use-scratch-open-window
      window.open(validUrl.href, "_blank");
    }
  }

  Scratch.extensions.register(new BrowserBridge());
})(Scratch);
