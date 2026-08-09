// Name: Hex Keyboard
// ID: hexkeyboard
// Description: Returns the hex keycode of the key currently being pressed
// By: dangerdangerau
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  const SHIFTED_SYMBOLS = new Set('~!@#$%^&*()_+{}|:"<>?'.split(""));

  class HexKeyboard {
    constructor() {
      this.currentKey = null;
      this.keydownHandler = (event) => {
        if (event.repeat) {
          return;
        }
        this.currentKey = {
          key: event.key,
          keyCode: event.keyCode,
        };
      };
      this.keyupHandler = (event) => {
        if (this.currentKey && this.currentKey.keyCode === event.keyCode) {
          this.currentKey = null;
        }
      };
      window.addEventListener("keydown", this.keydownHandler);
      window.addEventListener("keyup", this.keyupHandler);
    }

    getInfo() {
      return {
        id: "hexkeyboard",
        name: Scratch.translate("Hex Keyboard"),
        blocks: [
          {
            opcode: "hexKeyCode",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "hex keycode of key currently being pressed"
            ),
          },
        ],
      };
    }

    hexKeyCode() {
      if (!this.currentKey) {
        return "0x00";
      }
      const hex = this.currentKey.keyCode
        .toString(16)
        .toUpperCase()
        .padStart(2, "0");
      if (SHIFTED_SYMBOLS.has(this.currentKey.key)) {
        return "0x10" + hex;
      }
      return "0x" + hex;
    }
  }

  Scratch.extensions.register(new HexKeyboard());
})(Scratch);
