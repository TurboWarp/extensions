__internal.base85decode = (function () {
  const getBase85DecodeValue = (code) => {
    if (code === 0x28) code = 0x5c;
    return code - 0x2a;
  };
  const base85decode = (str, resultByteLength) => {
    const outBuffer = new ArrayBuffer(Math.ceil(resultByteLength / 4) * 4);
    const view = new DataView(outBuffer, 0, outBuffer.byteLength);
    for (let i = 0, j = 0; i < str.length; i += 5, j += 4) {
      view.setUint32(
        j,
        getBase85DecodeValue(str.charCodeAt(i + 4)) * 85 * 85 * 85 * 85 +
        getBase85DecodeValue(str.charCodeAt(i + 3)) * 85 * 85 * 85 +
        getBase85DecodeValue(str.charCodeAt(i + 2)) * 85 * 85 +
        getBase85DecodeValue(str.charCodeAt(i + 1)) * 85 +
        getBase85DecodeValue(str.charCodeAt(i)),
        true
      );
    }
    return new Uint8Array(outBuffer, 0, resultByteLength);
  };
  return base85decode;
}());
