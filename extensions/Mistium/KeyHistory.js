// Name: KeyHistory
// By: @mistium on discord
// Description: Store a list of previously pressed keys. Made primarily for use in originOS (https://github.com/Mistium/Origin-OS).

(function (Scratch) {
  "use strict";

  const MAX_KEY_HISTORY = 100; // Adjust the maximum number of keys to keep in history

  // Define keybinds
  const keybinds = ["Ctrl", "Shift", "Alt"];

  class KeyHistoryExtension {
    constructor() {
      this.keyHistory = [];
    }

    getInfo() {
      return {
        id: 'keyhistoryextension',
        name: 'Key History Extension',
        blocks: [
          {
            opcode: 'getRecentKeys',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Get recent keys',
          },
          {
            opcode: 'deleteFirstKey',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Delete the first key from history',
          },
          {
            opcode: 'deleteAllKeys',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Delete all keys from history',
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
      if (event.key && event.key.length === 1) {
        const key = event.key;
        this.addKeyToHistory(key);
      }
    }

    onPaste(event) {
      const pastedText = event.clipboardData.getData('text/plain');
      if (pastedText.trim() !== '') {
        this.addKeyToHistory(pastedText);
      }
    }

    isKeybind(key) {
      return keybinds.includes(key);
    }

    addKeyToHistory(key) {
      // Check if the maximum history size is reached
      if (this.keyHistory.length >= MAX_KEY_HISTORY) {
        this.keyHistory.pop(); // Remove the last element
      }
      
      // Add the key to the end of the array
      this.keyHistory.push(key);
    }
  }

  // Create an instance of the KeyHistoryExtension class
  const extension = new KeyHistoryExtension();

  // Register the extension with Scratch
  Scratch.extensions.register(extension);

  // Listen for keydown events and call the onKeyDown method
  document.addEventListener('keydown', (event) => extension.onKeyDown(event));

  // Listen for paste events and call the onPaste method
  document.addEventListener('paste', (event) => extension.onPaste(event));

})(Scratch);
