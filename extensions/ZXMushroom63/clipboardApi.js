(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("ClipboardAPI must be run unsandboxed.");
  }
  class ClipboardApi {
    getInfo() {
      return {
        id: "zxmushroom63clipboardapi",
        name: "Clipboard API",
        color1: "#b4b4b4",
        color2: "#9c9c9c",
        color3: "#646464",
        blocks: [
          {
            opcode: "get_clipboard",
            blockType: Scratch.BlockType.REPORTER,
            text: "clipboard",
          },
          {
            opcode: "set_clipboard_text",
            blockType: Scratch.BlockType.COMMAND,
            text: "Set clipboard to text: [TEXT]",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "text",
              },
            },
          },
          {
            opcode: "set_clipboard_item",
            blockType: Scratch.BlockType.COMMAND,
            text: "Set clipboard to item from url: [URL]",
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
              },
            },
          },
        ],
      };
    }
    get_clipboard() {
      return navigator.clipboard.readText();
    }

    set_clipboard_text({ TEXT }) {
      return navigator.clipboard.writeText(TEXT);
    }

    set_clipboard_item({ URL }) {
      return Scratch.fetch(URL.toString()).then((x) =>
        x.blob().then((b) => {
          navigator.clipboard.write([
            new ClipboardItem({
              [b.type]: b,
            }),
          ]);
        })
      );
    }
  }
  Scratch.extensions.register(new ClipboardApi());
})(Scratch);
