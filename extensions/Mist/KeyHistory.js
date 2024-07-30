// Name: KeyHistory
// ID: KeyHistoryExtension
// By: @mistium on discord
// Description: Store a list of previously pressed keys and clipboard events.
// License: MPL-2.0
// This Source Code is subject to the terms of the Mozilla Public License, v2.0,
// If a copy of the MPL was not distributed with this file,
// Then you can obtain one at https://mozilla.org/MPL/2.0/

(function (Scratch) {
  "use strict";

  class KeyHistoryExtension {
    constructor() {
      this.keyHistory = [];
      this.pasted = false;
      this.max_key_history = 100; // Adjust the maximum number of keys to keep in history
      this.keybinds = ["Ctrl", "Shift", "Alt"];
      this.pause = false;
    }

    getInfo() {
      return {
        id: "KeyHistoryExtension",
        name: "Key History",
        color1: "#36644E",
        blocks: [
          {
            opcode: "getRecentKeys",
            blockType: Scratch.BlockType.REPORTER,
            text: "Get recent keys",
          },
          {
            opcode: "deleteFirstKey",
            blockType: Scratch.BlockType.COMMAND,
            text: "Delete the first key from history",
          },
          {
            opcode: "deleteAllKeys",
            blockType: Scratch.BlockType.COMMAND,
            text: "Delete all keys from history",
          },
          {
            opcode: "AddKey",
            blockType: Scratch.BlockType.COMMAND,
            text: "Add [KEY] to key history",
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: " ",
              },
            },
          },
          {
            opcode: "enableKeyHistory",
            blockType: Scratch.BlockType.COMMAND,
            text: "Enable key history",
          },
          {
            opcode: "disableKeyHistory",
            blockType: Scratch.BlockType.COMMAND,
            text: "Disable key history",
          },
        ],
      };
    }

    getRecentKeys() {
      return JSON.stringify(this.keyHistory);
    }

    deleteFirstKey() {
      if (this.keyHistory.length > 0) {
        this.keyHistory.shift();
      }
    }

    deleteAllKeys() {
      this.keyHistory = [];
    }

    AddKey({ KEY }) {
      this.addKeyToHistory(KEY);
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
        this.addKeyToHistory(key);
      }
    }

    onPaste(event) {
      const pastedText = event.clipboardData.getData("text/plain");
      if (pastedText.trim() !== "") {
        if (this.pasted == false) {
          this.pasted = true;
          this.addKeyToHistory(pastedText);
        }
        setTimeout(() => {
          this.pasted = false;
        }, 10);
      }
    }

    isKeybind(key) {
      return this.keybinds.includes(key);
    }

    addKeyToHistory(key) {
      // Check if the maximum history size is reached
      if (this.keyHistory.length >= this.max_key_history) {
        this.keyHistory.pop(); // Remove the last element
      }

      // Add the key to the end of the array
      this.keyHistory.push(key);
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
