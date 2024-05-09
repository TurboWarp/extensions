// Name: Numerical Encoding v2
// ID: numericalencoding2
// Description: More efficiently encode strings as numbers for cloud variables.
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  /**
   * @param {Uint8Array} bytes
   * @returns {string}
   */
  const encodeBinary = (bytes) => {
    let result = '';

    for (var i = 0; i <= bytes.length - 3; i += 3) {
      // AAAAAAAA BBBBBBBB CCCCCCCC
      // 11122233 34445556 66777888
      const a = bytes[i];
      const b = bytes[i + 1];
      const c = bytes[i + 2];
      result += a >> 5;
      result += (a >> 2) & 0b111;
      result += ((a & 0b11) << 1) | (b >> 7);
      result += (b >> 4) & 0b111;
      result += (b >> 1) & 0b111;
      result += ((b & 0b1) << 2) | (c >> 6);
      result += (c >> 3) & 0b111;
      result += c & 0b111;
    }

    switch (bytes.length - i) {
      case 1: {
        // AAAAAAAA
        // 11122233 3
        const a = bytes[bytes.length - 1];
        result += a >> 5;
        result += (a >> 2) & 0b111;
        result += (a & 0b11) << 1;
        break;
      }

      case 2: {
        // AAAAAAAA BBBBBBBB
        // 11122233 34445556 66
        const a = bytes[bytes.length - 2];
        const b = bytes[bytes.length - 1];
        result += a >> 5;
        result += (a >> 2) & 0b111;
        result += ((a & 0b11) << 1) | (b >> 7);
        result += (b >> 4) & 0b111;
        result += (b >> 1) & 0b111;
        result += (b & 0b1) << 2;
        break;
      }
    }

    return result;
  };

  /**
   * @param {string} string
   * @returns {Uint8Array}
   */
  const decodeBinary = (string) => {
    const encodedBytes = Math.floor(string.length * 3 / 8);
    const result = new Uint8Array(encodedBytes);
    let ptr = 0;

    for (var i = 0; i <= string.length - 8; i += 8) {
      // AAA BBB CCC DDD EEE FFF GGG HHH
      // 111 111 112 222 222 233 333 333
      const a = string.charCodeAt(i) - 48;
      const b = string.charCodeAt(i + 1) - 48;
      const c = string.charCodeAt(i + 2) - 48;
      const d = string.charCodeAt(i + 3) - 48;
      const e = string.charCodeAt(i + 4) - 48;
      const f = string.charCodeAt(i + 5) - 48;
      const g = string.charCodeAt(i + 6) - 48;
      const h = string.charCodeAt(i + 7) - 48;
      result[ptr] = (a << 5) | (b << 2) | (c >> 1);
      ptr++;
      result[ptr] = ((c & 0b1) << 7) | (d << 4) | (e << 1) | (f >> 2);
      ptr++;
      result[ptr] = ((f & 0b11) << 6) | (g << 3) | h;
      ptr++;
    }

    switch (encodedBytes - ptr) {
      case 1: {
        // AAA BBB CCC
        // 111 111 11
        const a = string.charCodeAt(string.length - 3) - 48;
        const b = string.charCodeAt(string.length - 2) - 48;
        const c = string.charCodeAt(string.length - 1) - 48;
        result[ptr] = (a << 5) | (b << 2) | (c >> 1);
        break;
      }

      case 2: {
        // AAA BBB CCC DDD EEE FFF
        // 111 111 112 222 222 2
        const a = string.charCodeAt(string.length - 6) - 48;
        const b = string.charCodeAt(string.length - 5) - 48;
        const c = string.charCodeAt(string.length - 4) - 48;
        const d = string.charCodeAt(string.length - 3) - 48;
        const e = string.charCodeAt(string.length - 2) - 48;
        const f = string.charCodeAt(string.length - 1) - 48;
        result[ptr] = (a << 5) | (b << 2) | (c >> 1);
        ptr++;
        result[ptr] = ((c & 0b1) << 7) | (d << 4) | (e << 1) | (f >> 2);
        break;
      }
    }

    return result;
  };

  const textEncoder = new TextEncoder();
  const textDecoder = new TextDecoder();

  /**
   * @param {string} text
   * @returns {string}
   */
  const encodeText = (text) => encodeBinary(textEncoder.encode(text));

  /**
   * @param {string} text
   * @returns {string}
   */
  const decodeText = (text) => textDecoder.decode(decodeBinary(text));

  // Uncomment this to validate that the encoding and decoding is correct.
  /*
  const stressValidate = () => {
    for (let i = 0; i < 100000; i++) {
      const randomLength = Math.floor(Math.random() * 1000);
      const randomArray = new Uint8Array(randomLength);
      for (let j = 0; j < randomLength; j++) {
        randomArray[j] = Math.floor(Math.random() * 256);
      }
      const encoded = encodeBinary(randomArray);
      const decoded = decodeBinary(encoded);
      if (decoded.length !== randomArray.length) {
        debugger;
      }
      for (let j = 0; j < randomArray.length; j++) {
        if (randomArray[j] !== decoded[j]) {
          debugger;
        }
      }
    }
  };
  console.time('validate');
  stressValidate();
  console.timeEnd('validate');
  */

  class NumericalEncodingV2 {
    getInfo() {
      const example = Scratch.translate({
        default: 'Hello',
        description: 'Used as default input value to show how the encoding works'
      });

      return {
        id: "numericalencoding2",
        name: Scratch.translate("Numerical Encoding v2"),
        blocks: [
          {
            blockType: Scratch.BlockType.REPORTER,
            opcode: 'encode',
            text: Scratch.translate('encode [TEXT] as numbers'),
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: example
              }
            }
          },
          {
            blockType: Scratch.BlockType.REPORTER,
            opcode: 'decode',
            text: Scratch.translate('decode [TEXT] as text'),
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: encodeText(example)
              }
            }
          }
        ],
      };
    }

    encode ({ TEXT }) {
      return encodeText(Scratch.Cast.toString(TEXT))
    }

    decode ({ TEXT }) {
      return decodeText(Scratch.Cast.toString(TEXT));
    }
  }

  Scratch.extensions.register(new NumericalEncodingV2());
})(Scratch);
