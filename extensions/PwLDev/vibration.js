// Name: Vibration
// ID: pwldevvibration
// Description: Control the device's vibration. Only works on Chrome for Android.
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
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Only works on Chrome for Android."),
          },
          {
            opcode: "start",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("start vibrating for [SECONDS] seconds"),
            arguments: {
              SECONDS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "2",
              },
            },
          },
          {
            opcode: "startPattern",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("play vibration pattern [PATTERN]"),
            arguments: {
              PATTERN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1, 0.5, 1, 0.5, 1",
              },
            },
          },
          {
            opcode: "stop",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stop vibrating"),
          },
        ],
      };
    }

    start(args) {
      if (navigator.vibrate) {
        navigator.vibrate(Scratch.Cast.toNumber(args.SECONDS) * 1000);
      }
    }

    startPattern(args) {
      if (navigator.vibrate) {
        const pattern = Scratch.Cast.toString(args.PATTERN)
          .match(/[\w\-.]+/g) // Make into array
          ?.map((val) => Scratch.Cast.toNumber(val) * 1000) // Convert to numbers in milliseconds
        if (pattern) {
          navigator.vibrate(pattern);
        }
      }
    }

    stop() {
      if (navigator.vibrate) {
        navigator.vibrate(0);
      }
    }
  }

  Scratch.extensions.register(new Vibration());
})(Scratch);
