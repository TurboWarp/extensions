// Name: Fetch
// ID: fetch
// Description: Make requests to the broader internet.
// By: GarboMuffin
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
            // eslint-disable-next-line extension/should-translate
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
      let url;
      try {
        url = new URL(args.URL);
      } catch (e) {
        return Promise.resolve("");
      }
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        return Promise.resolve("");
      }
      return Scratch.fetch(url.toString())
        .then((r) => r.text())
        .catch(() => "");
    }
  }

  Scratch.extensions.register(new Fetch());
})(Scratch);
