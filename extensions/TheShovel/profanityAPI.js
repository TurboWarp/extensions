(function (Scratch) {
  "use strict";
  class profanityAPI {
    getInfo() {
      return {
        id: "profanityAPI",
        name: "profanityAPI",
        color1: "#cf6a3c",
        color2: "#cf6a3c",
        color3: "#cf6a3c",
        blocks: [
          {
            opcode: "checkProfanity",
            blockType: Scratch.BlockType.REPORTER,
            text: "Remove profanity from [TEXT]",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello, I love pizza!",
              },
            },
          },
        ],
      };
    }

    checkProfanity({ TEXT }) {
      return Scratch.fetch(
        "https://www.purgomalum.com/service/plain?text=" + TEXT
      )
        .then((r) => r.text())
        .catch(() => "");
    }
  }

  Scratch.extensions.register(new profanityAPI());
})(Scratch);
