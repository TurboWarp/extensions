// Name: Fetch
// ID: fetch
// Description: Make requests to the broader internet.
// By: GarboMuffin
// License: MIT AND MPL-2.0

(function (Scratch: typeof globalThis.Scratch) {
  "use strict";

  class Fetch implements Scratch.Extension {
    getInfo(): Scratch.Info {
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

    get(args: { URL: unknown }) {
      return Scratch.fetch(Scratch.Cast.toString(args.URL))
        .then((r) => r.text())
        .catch(() => "");
    }
  }

  Scratch.extensions.register(new Fetch());
})(Scratch);
