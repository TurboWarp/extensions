// Name: Hex Keyboard
// ID: hexkeyboard
// Description: Returns the hex keycode of the key currently being pressed
// By: dangerdangerau
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("The hex keyboard extension must run unsandboxed");
  }

  const SHIFTED_CHARS = {
    48: ")",
    49: "!",
    50: "@",
    51: "#",
    52: "$",
    53: "%",
    54: "^",
    55: "&",
    56: "*",
    57: "(",
    186: ":",
    187: "+",
    188: "<",
    189: "_",
    190: ">",
    191: "?",
    192: "~",
    219: "{",
    220: "|",
    221: "}",
    222: '"',
  };

  const BASE_CHARS = {
    8: "Backspace",
    9: "Tab",
    13: "Enter",
    16: "Shift",
    17: "Ctrl",
    18: "Alt",
    20: "Caps Lock",
    27: "Escape",
    32: " ",
    37: "Left",
    38: "Up",
    39: "Right",
    40: "Down",
    46: "Delete",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'",
  };

  class HexKeyboard {
    constructor() {
      this.pressedKeys = [];
      this.currentKey = null;

      const keyboard = Scratch.vm.runtime.ioDevices.keyboard;
      const originalPostData = keyboard.postData.bind(keyboard);
      keyboard.postData = (data) => {
        originalPostData(data);
        if (typeof data.keyCode !== "number") {
          return;
        }
        const index = this.pressedKeys.findIndex(
          (entry) => entry.keyCode === data.keyCode
        );
        if (data.isDown) {
          if (index === -1) {
            this.pressedKeys.push({ key: data.key, keyCode: data.keyCode });
            this.currentKey = this.pressedKeys[this.pressedKeys.length - 1];
          } else {
            this.currentKey = this.pressedKeys[index];
          }
          Scratch.vm.runtime.startHats("hexkeyboard_whenAnyKeyPressed");
        } else if (index !== -1) {
          this.pressedKeys.splice(index, 1);
          this.currentKey =
            this.pressedKeys[this.pressedKeys.length - 1] || null;
        }
      };
    }

    getInfo() {
      return {
        id: "hexkeyboard",
        name: Scratch.translate("Hex Keyboard"),
        blocks: [
          {
            opcode: "whenAnyKeyPressed",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when any key is pressed"),
            isEdgeActivated: false,
            shouldRestartExistingThreads: true,
          },
          {
            opcode: "hexKeyCode",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "hex keycode of key currently being pressed"
            ),
          },
          {
            opcode: "hexToChar",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "letter/number/symbol of hex keycode [HEX]"
            ),
            arguments: {
              HEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0x41",
              },
            },
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
      const shiftHeld = this.pressedKeys.some((entry) => entry.keyCode === 16);
      if (shiftHeld && this.currentKey.keyCode !== 16) {
        return "0x10" + "0x" + hex;
      }
      return "0x" + hex;
    }

    hexToChar({ HEX }) {
      const hex = Scratch.Cast.toString(HEX).toUpperCase();
      const parts = hex.split("0X").filter(Boolean);
      if (parts.length === 0) {
        return "";
      }
      const keyCode = parseInt(parts[parts.length - 1], 16);
      if (Number.isNaN(keyCode)) {
        return "";
      }
      const shifted = parts.length > 1;
      if (shifted && SHIFTED_CHARS[keyCode]) {
        return SHIFTED_CHARS[keyCode];
      }
      if (BASE_CHARS[keyCode]) {
        return BASE_CHARS[keyCode];
      }
      if (keyCode >= 65 && keyCode <= 90) {
        return shifted
          ? String.fromCharCode(keyCode)
          : String.fromCharCode(keyCode + 32);
      }
      return String.fromCharCode(keyCode);
    }
  }

  Scratch.extensions.register(new HexKeyboard());
})(Scratch);
