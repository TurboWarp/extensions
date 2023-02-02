// https://github.com/CS2627883/Turbowarp-Encoding-Extension/blob/main/Encoding.js

(function(Scratch) {
  'use strict';
  class UnicodeEncodingExtension {
    maxcharlength = 6; // There are 149,186 unicode characters, so the maximum character code length is 6
    encoded = 0;
    decoded = 0;
    getInfo() {
      return {
        id: 'cs2627883UnicodeEncoding',
        name: 'Unicode Encoding',
        blocks: [{
          opcode: 'UnicodeEncode',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Encode [DATA] to numbers',
          arguments: {
            DATA: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Hello!'
            }
          }
        },
          {
            opcode: 'UnicodeDecode',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Decode [ENCODED] back to text',
            arguments: {
              ENCODED: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '000072000101000108000108000111000033' //Encoded "Hello!"
              }
            }
          },
          {
            opcode: 'GetUnicodeEncoded',
            blockType: Scratch.BlockType.REPORTER,
            text: 'encoded',
          },
          {
            opcode: 'GetUnicodeDecoded',
            blockType: Scratch.BlockType.REPORTER,
            text: 'decoded',
          }
        ]
      };
    }
    UnicodeEncode(args) {
      const toencode = String(args.DATA);
      var encoded = "";
      for (let i = 0; i < toencode.length; ++i) {
        // Get char code of character
        var encodedchar = String(toencode.charCodeAt(i));
        // Pad encodedchar with 0s to ensure all encodedchars are the same length
        encodedchar = "0".repeat(this.maxcharlength - encodedchar.length) + encodedchar;
        encoded += encodedchar;
      }
      this.encoded = encoded;
    }
    UnicodeDecode(args) {
      const todecode = String(args.ENCODED);
      if (todecode == "") {
        this.decoded = "";
        return;
      }
      var decoded = "";
      // Create regex to split by char length
      const regex = new RegExp('.{1,' + this.maxcharlength + '}', 'g');
      // Split into array of characters
      var encodedchars = todecode.match(regex);
      for (let i = 0; i < encodedchars.length; i++) {
        // Get character from char code
        var decodedchar = String.fromCharCode(encodedchars[i]);
        decoded += decodedchar;
      }
      this.decoded = decoded;
    }
    GetUnicodeEncoded(args) {
      return this.encoded;
    }
    GetUnicodeDecoded(args) {
      return this.decoded;
    }
  }

  // Test Code
  /*
  encoding = new UnicodeEncodingExtension();
  encoding.UnicodeEncode({"DATA": 'Hello!'});
  console.log(encoding.GetUnicodeEncoded())
  encoding.UnicodeDecode({"ENCODED": encoding.GetUnicodeEncoded()});
  console.log(encoding.GetUnicodeDecoded());
  */

  Scratch.extensions.register(new UnicodeEncodingExtension());
})(Scratch);
