// Name: LZ Compress
// ID: shovellzcompress
// Description: Compress and decompress text using lz-string.
// License: MIT

(async function (Scratch) {
  "use strict";

  /*!
    https://github.com/pieroxy/lz-string
    We use it under this license:

    MIT License

    Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
  */
  const LZString = await Scratch.external.evalAndReturn(
    "https://cdn.jsdelivr.net/npm/lz-string@1.5.0/libs/lz-string.min.js",
    "LZString"
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
