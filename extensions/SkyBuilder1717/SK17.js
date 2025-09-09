// Name: SK17
// ID: SkyBuilder1717Encryption
// Description: Adds new encryption format: SK17. Useful for saving games and loading private data in compiled games.
// By: SkyBuilder1717
// License: MIT

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed)
    throw new Error("SK17 must run unsandboxed!");

  const SIG = new Uint8Array([83, 75, 49, 55]);

  function bytesToLatin1String(u8) {
    const CHUNK = 0x8000;
    let result = "";
    for (let i = 0; i < u8.length; i += CHUNK) {
      const slice = u8.subarray(i, i + CHUNK);
      result += String.fromCharCode.apply(null, slice);
    }
    return result;
  }

  function latin1StringToBytes(str) {
    const u8 = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
      u8[i] = str.charCodeAt(i) & 0xff;
    }
    return u8;
  }

  function concat(...parts) {
    const total = parts.reduce((s, p) => s + p.length, 0);
    const out = new Uint8Array(total);
    let off = 0;
    for (const p of parts) {
      out.set(p, off);
      off += p.length;
    }
    return out;
  }

  async function deriveKey(password, salt) {
    const enc = new TextEncoder();
    const pwKey = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    return await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 150000,
        hash: "SHA-256",
      },
      pwKey,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  function xorEncrypt(data, password) {
    const pwdBytes = new TextEncoder().encode(password);
    const result = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
      result[i] = data[i] ^ pwdBytes[i % pwdBytes.length];
    }
    return result;
  }

  function rotateBytes(data, _) {
    const len = data.length;
    if (len === 0) return data;
    const rotated = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      rotated[(i + 1) % len] = data[i];
    }
    return rotated;
  }

  function xorWithConst(data, constant) {
    const result = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
      result[i] = data[i] ^ constant;
    }
    return result;
  }

  const encryptionStages = [xorEncrypt, rotateBytes, xorWithConst];

  function multiStageEncrypt(data, password) {
    let encrypted = data;
    for (const stage of encryptionStages) {
      encrypted = stage(encrypted, password);
    }
    return encrypted;
  }

  function multiStageDecrypt(data, password) {
    let decrypted = data;
    for (let i = encryptionStages.length - 1; i >= 0; i--) {
      const stage = encryptionStages[i];
      if (stage === rotateBytes) {
        const len = decrypted.length;
        if (len > 0) {
          const rotated = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            rotated[i] = decrypted[(i + 1) % len];
          }
          decrypted = rotated;
        }
      } else {
        decrypted = stage(decrypted, password);
      }
    }
    return decrypted;
  }

  class Extension {
    getInfo() {
      return {
        id: "SkyBuilder1717Encryption",
        name: Scratch.translate("SK17"),
        color1: "#3f79bf",
        color2: "#2c4d8a",
        blocks: [
          {
            opcode: "encrypt",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("encrypt text [TEXT] with password [PASS]"),
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello, World!"
              },
              PASS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "password"
              }
            }
          },
          {
            opcode: "decrypt",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("decrypt text [TEXT] with password [PASS]"),
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
              PASS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "password"
              }
            }
          },
          {
            opcode: "base64Encode",
            blockType: Scratch.BlockType.REPORTER,
            text: "encode base64 bytes [TEXT]",
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "Hello" }
            }
          },
          {
            opcode: "base64Decode",
            blockType: Scratch.BlockType.REPORTER,
            text: "decode base64 bytes [TEXT]",
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "SGVsbG8=" }
            }
          },
          {
            opcode: "checkSignature",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("verify signature [TEXT]"),
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "" }
            }
          },
          {
            opcode: "isValidEncrypted",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is encrypted data valid [TEXT]"),
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "" }
            }
          }
        ]
      };
    }

    async encrypt(args) {
      const password = args.PASS;
      const data = new TextEncoder().encode(args.TEXT);
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const key = await deriveKey(password, salt);
      const cipherBuf = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        data
      );
      let ciphertext = new Uint8Array(cipherBuf);
      ciphertext = multiStageEncrypt(ciphertext, password);
      const out = concat(SIG, salt, iv, ciphertext);
      return await bytesToLatin1String(out);
    }

    async decrypt(args) {
      const password = args.PASS;
      const u8 = latin1StringToBytes(args.TEXT);
      if (u8.length < SIG.length + 16 + 12 + 1) throw new Error("Invalid data");
      for (let i = 0; i < SIG.length; i++) {
        if (u8[i] !== SIG[i]) throw new Error("Bad signature");
      }
      let off = SIG.length;
      const salt = u8.slice(off, off + 16);
      off += 16;
      const iv = u8.slice(off, off + 12);
      off += 12;
      let ciphertext = u8.slice(off);
      ciphertext = multiStageDecrypt(ciphertext, password);
      const key = await deriveKey(password, salt);
      const plainBuf = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv },
        key,
        ciphertext
      );
      return await new TextDecoder().decode(new Uint8Array(plainBuf));
    }

    base64Encode(args) {
      const u8 = new TextEncoder().encode(args.TEXT);
      let binary = "";
      u8.forEach((b) => (binary += String.fromCharCode(b)));
      return btoa(binary);
    }

    base64Decode(args) {
      try {
        const binary = atob(args.TEXT);
        const u8 = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          u8[i] = binary.charCodeAt(i);
        }
        return new TextDecoder().decode(u8);
      } catch {
        return "";
      }
    }

    checkSignature(args) {
      const text = args.TEXT;
      if (typeof text !== "string") return false;
      if (text.length < SIG.length) return false;
      for (let i = 0; i < SIG.length; i++) {
        if (text.charCodeAt(i) !== SIG[i]) return false;
      }
      return true;
    }

    isValidEncrypted(args) {
      const text = args.TEXT;
      if (typeof text !== "string") return false;
      const u8 = latin1StringToBytes(text);
      if (u8.length < SIG.length + 16 + 12 + 1) return false;
      for (let i = 0; i < SIG.length; i++) {
        if (u8[i] !== SIG[i]) return false;
      }
      return true;
    }
  }

  Scratch.extensions.register(new Extension());
})(Scratch);
