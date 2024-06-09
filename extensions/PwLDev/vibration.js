// Name: Vibration
// ID: pwldevvibration
// Description: Access and control the device's vibration. Only available in some devices.
// By: PwLDev <https://scratch.mit.edu/users/PwLDev/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This extension must run unsandboxed in order to work.");
  }

  class Vibration {
    getInfo() {
      return {
        id: "pwldevvibration",
        name: Scratch.translate("Vibration"),
        color1: "#45a15c",
        color2: "#317041",
        color3: "#35523c",
        blocks: [
          {
            opcode: "startVibration",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("start vibration"),
          },
          {
            opcode: "stopVibration",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stop vibrations"),
          },
          "---",
          {
            opcode: "timedVibration",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("vibrate for [SECONDS] seconds"),
            arguments: {
              SECONDS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "2",
              },
            },
          },
        ],
      };
    }

    startVibration() {
      navigator.vibrate(5000);
    }

    stopVibration() {
      navigator.vibrate(0);
    }

    timedVibration(args) {
      navigator.vibrate(args.SECONDS * 1000);
    }
  }

  Scratch.extensions.register(new Vibration());
})(Scratch);
