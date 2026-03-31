// This is based on what we do in the packager:
// https://github.com/TurboWarp/packager/blob/master/src/packager/base85.js
// It's worked pretty well over there.
// We've just changed the character set a bit to accomodate us being in a JS context instead of an HTML context.

// This implements a custom base85 encoding for improved efficiency compared to base64.
// The character set used is 0x2a - 0x7e of ASCII. Little endian.
// 0x5c (\) is replaced with 0x28 (opening parenthesis) to make it safe to include in a JS string without escapes.

const getBase85EncodeCharacter = (n) => {
  n += 0x2a;
  if (n === 0x5c) return 0x28;
  return n;
};

/**
 * @param {Uint8Array} uint8array The data to encode. No assumptions made about backing buffer.
 * @returns {string} Base 85 encoding
 */
const base85encode = (uint8array) => {
  const originalLength = uint8array.length;

  // Data length needs to be a multiple of 4 so we can use getUint32.
  // If it's not, we'll have to make a copy and pad with zeros.
  let dataView;
  if (originalLength % 4 !== 0) {
    const newUint8 = new Uint8Array(Math.ceil(originalLength / 4) * 4);
    for (let i = 0; i < originalLength; i++) {
      newUint8[i] = uint8array[i];
    }
    dataView = new DataView(newUint8.buffer);
  } else {
    dataView = new DataView(
      uint8array.buffer,
      uint8array.byteOffset,
      uint8array.byteLength
    );
  }

  // Pre-allocating buffer and using TextDecoder at the end is faster than string concatenation
  // Each set of 4 bytes is represented by 5 characters. Pad with zeros if needed.
  const result = new Uint8Array(Math.ceil(originalLength / 4) * 5);
  let resultIndex = 0;

  for (let i = 0; i < dataView.byteLength; i += 4) {
    let n = dataView.getUint32(i, true);
    result[resultIndex++] = getBase85EncodeCharacter(n % 85);
    n = Math.floor(n / 85);
    result[resultIndex++] = getBase85EncodeCharacter(n % 85);
    n = Math.floor(n / 85);
    result[resultIndex++] = getBase85EncodeCharacter(n % 85);
    n = Math.floor(n / 85);
    result[resultIndex++] = getBase85EncodeCharacter(n % 85);
    n = Math.floor(n / 85);
    result[resultIndex++] = getBase85EncodeCharacter(n % 85);
  }

  return new TextDecoder().decode(result);
};

export default base85encode;
