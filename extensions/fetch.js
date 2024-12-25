// Name: Fetch
// ID: fetch
// Description: Make requests to the broader internet.
// License: MIT AND MPL-2.0

(function (Scratch) {
  "use strict";

  class Fetch {
    getInfo() {
      return {
        id: "fetch",
        name: Scratch.translate("Fetch"),
        blocks: [
          {
            opcode: "get",
            blockType: Scratch.BlockType.REPORTER,
            text: "GET [URL]",
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/hello.txt",
              },
            },
          },
        ],
      };
    }

    get(args) {
      return Scratch.fetch(args.URL)
        .then((r) => r.text())
        .catch(() => "");
    }
  }

  Scratch.extensions.register(new Fetch());
})(Scratch);
