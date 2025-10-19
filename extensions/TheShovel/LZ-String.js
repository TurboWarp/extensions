// Name: LZ Compress
// ID: shovellzcompress
// Description: Compress and decompress text using lz-string.
// License: MIT

(async function (Scratch) {
  "use strict";

  const LZString = await Scratch.external.evalAndReturn(
    'https://cdn.jsdelivr.net/npm/lz-string@1.5.0/libs/lz-string.min.js',
    'LZString'
  );

  class lzcompress {
    getInfo() {
      return {
        id: "shovellzcompress",
        name: Scratch.translate("LZ Compress"),
        color1: "#2f3463",
        color2: "#2b2f59",
        blocks: [
          {
            opcode: "compress",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("compress [TEXT] to [TYPE]"),
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello world!",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "COMPRESSIONTYPES",
              },
            },
          },
          {
            opcode: "decompress",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("decompress [TEXT] from [TYPE]"),
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "҅〶惶@✰Ӏ葀",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "COMPRESSIONTYPES",
              },
            },
          },
        ],
        menus: {
          COMPRESSIONTYPES: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("Raw"), value: "Raw" },
              { text: Scratch.translate("Base64"), value: "Base64" },
              {
                text: Scratch.translate({
                  default: "EncodedURIComponent",
                  description:
                    "A type of encoding that happens to also be used in URLs.",
                }),
                value: "EncodedURIComponent",
              },
              {
                text: Scratch.translate({
                  default: "Uint8Array",
                  description: "An array of bytes.",
                }),
                value: "Unit8Array",
              },
              {
                text: Scratch.translate({
                  default: "UTF16",
                  description:
                    "A type of unicode encoding. For almost all languages this translates to just 'UTF16'",
                }),
                value: "UTF16",
              },
            ],
          },
        },
      };
    }
    compress(args) {
      const text = Scratch.Cast.toString(args.TEXT);
      if (args.TYPE == "Raw") {
        return LZString.compress(text);
      } else if (args.TYPE == "Base64") {
        return LZString.compressToBase64(text);
      } else if (args.TYPE == "EncodedURIComponent") {
        return LZString.compressToEncodedURIComponent(text);
      } else if (args.TYPE == "Uint8Array") {
        return LZString.compressToUint8Array(text);
      } else if (args.TYPE == "UTF16") {
        return LZString.compressToUTF16(text);
      }
      return "";
    }

    decompress(args) {
      try {
        const text = Scratch.Cast.toString(args.TEXT);
        if (args.TYPE == "Raw") {
          return LZString.decompress(text) || "";
        } else if (args.TYPE == "Base64") {
          return LZString.decompressFromBase64(text) || "";
        } else if (args.TYPE == "EncodedURIComponent") {
          return LZString.decompressFromEncodedURIComponent(text) || "";
        } else if (args.TYPE == "Uint8Array") {
          return LZString.decompressFromUint8Array(text) || "";
        } else if (args.TYPE == "UTF16") {
          return LZString.decompressFromUTF16(text) || "";
        }
      } catch (e) {
        console.error("decompress error", e);
      }
      return "";
    }
  }
  Scratch.extensions.register(new lzcompress());
})(Scratch);
