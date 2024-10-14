// Name: Key History
// ID: MistKeyHistoryExtension
// By: Mistium <https://scratch.mit.edu/users/M1stium>
// Description: Store a list of previously pressed keys and clipboard events.
// License: MPL-2.0
// This Source Code is subject to the terms of the Mozilla Public License, v2.0,
// If a copy of the MPL was not distributed with this file,
// Then you can obtain one at https://mozilla.org/MPL/2.0/

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error(`'Key History' needs to be run unsandboxed.`);
  }

  class KeyHistoryExtension {
    constructor() {
      this.keyHistory = [];
      this.max_key_history = 100; // Adjust the maximum number of keys to keep in history
      this.keybinds = ["Ctrl", "Shift", "Alt"];
      this.pause = false;
    }

    getInfo() {
      return {
        id: "MistKeyHistoryExtension",
        name: "Key History",
        color1: "#36644E",
        blocks: [
          {
            opcode: "getRecentKeys",
            blockType: Scratch.BlockType.REPORTER,
            text: "get recent keys",
          },
          {
            opcode: "getFirstKey",
            blockType: Scratch.BlockType.REPORTER,
            text: "get first key",
          },
          {
            opcode: "deleteFirstKey",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete the first key from history",
          },
          {
            opcode: "deleteAllKeys",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete all keys from history",
          },
          {
            opcode: "AddKey",
            blockType: Scratch.BlockType.COMMAND,
            text: "add [KEY] to key history",
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "a",
              },
            },
          },
          {
            opcode: "setMaxQueueSize",
            blockType: Scratch.BlockType.COMMAND,
            text: "limit key history to [LENGTH] keys",
            arguments: {
              LENGTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          "---",
          {
            opcode: "enableKeyHistory",
            blockType: Scratch.BlockType.COMMAND,
            text: "enable key history",
          },
          {
            opcode: "disableKeyHistory",
            blockType: Scratch.BlockType.COMMAND,
            text: "disable key history",
          },
        ],
      };
    }

    getRecentKeys() {
      return JSON.stringify(this.keyHistory ?? []);
    }

    getFirstKey() {
      return Scratch.Cast.toString(this.keyHistory[0] ?? "");
    }

    deleteFirstKey() {
      this.keyHistory.shift();
    }

    deleteAllKeys() {
      this.keyHistory = [];
    }

    AddKey({ KEY }) {
      this.addKeyToHistory(Scratch.Cast.toString(KEY ?? ""));
    }

    setMaxQueueSize({ LENGTH }) {
      this.max_key_history = Scratch.Cast.toNumber(LENGTH ?? 0);
    }

    onKeyDown(event) {
      // Check if Command (Cmd) or Control (Ctrl) keys are pressed
      if (event.metaKey || event.ctrlKey) {
        return; // Skip adding keys when Cmd or Ctrl are pressed
      }

      // Check if the pressed key is part of a keybind
      if (this.isKeybind(event.key)) {
        return; // Skip adding keybind keys to history
      }

      // Add the pressed key to the history
      if (event.key && !this.pause) {
        const key = event.key;
        this.addKeyToHistory(Scratch.Cast.toString(key));
      }
    }

    onPaste(event) {
      const pastedText = event.clipboardData.getData("text/plain");
      this.addKeyToHistory(Scratch.Cast.toString(pastedText ?? ""));
    }

    isKeybind(key) {
      return this.keybinds.includes(Scratch.Cast.toString(key));
    }

    addKeyToHistory(key) {
      // Check if the maximum history size is reached
      if (this.keyHistory.length >= this.max_key_history) {
        this.keyHistory.pop(); // Remove the last element
      }

      // Add the key to the end of the array
      this.keyHistory.push(Scratch.Cast.toString(key));
    }

    enableKeyHistory() {
      this.pause = false;
    }

    disableKeyHistory() {
      this.pause = true;
    }
  }

  // Create an instance of the KeyHistoryExtension class
  const extension = new KeyHistoryExtension();

  // Register the extension with Scratch
  Scratch.extensions.register(extension);

  // Listen for keydown events and call the onKeyDown method
  document.addEventListener("keydown", (event) => extension.onKeyDown(event));

  // Listen for paste events and call the onPaste method
  document.addEventListener("paste", (event) => extension.onPaste(event));
})(Scratch);
