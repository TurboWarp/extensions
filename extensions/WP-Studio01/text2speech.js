(function (Scratch) {
  "use strict";

  class Tools {
    getInfo() {
      return {
        id: "wpstudio01tts",
        name: Scratch.translate("System Text To Speech"),
        blocks: [
          {
            opcode: "speak",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("speak [TEXT]"),
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Hello"),
              },
            },
          },
        ],
      };
    }

    speak(args) {
      return new Promise((resolve, reject) => {
        const utterance = new SpeechSynthesisUtterance(args.TEXT);
        utterance.onend = () => {
          resolve();
        };
        utterance.onerror = () => {
          reject(new Error("Utterance error"));
        };
        speechSynthesis.speak(utterance);
      });
    }
  }

  Scratch.extensions.register(new Tools());
})(Scratch);
