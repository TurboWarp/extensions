(function (Scratch) {
  'use strict';
  const icon = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMzcuNzk1MDYiIGhlaWdodD0iMTM0LjIzNzA3IiB2aWV3Qm94PSIwLDAsMTM3Ljc5NTA2LDEzNC4yMzcwNyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1Mi44OTU4NiwtMTMwLjM3OTg5KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xOTkuMzA5MDgsMjE5LjYyMDExdi03OS4yNDAyMmg4MS4zODE4NHY3OS4yNDAyMnoiLz48cGF0aCBkPSJNMTYyLjg5NTg2LDI1NC42MTY5NnYtNzkuMjQwMjJoODEuMzgxODR2NzkuMjQwMjJ6Ii8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6ODcuMTA0MTQwMTg0NTE2NDQ6NDkuNjIwMTA4MzQwNzA3OTYtLT4=';
  const icon2 = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4MS44ODUzOSIgaGVpZ2h0PSI4MC42MDMwNyIgdmlld0JveD0iMCwwLDgxLjg4NTM5LDgwLjYwMzA3Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTk5LjA1NzMsLTEzOS42OTg0NikiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTI4MC45NDI3LDE4MGMwLDIyLjI1NzkyIC0xOC4zMzA2Nyw0MC4zMDE1NCAtNDAuOTQyNyw0MC4zMDE1NGMtMjIuNjEyMDMsMCAtNDAuOTQyNywtMTguMDQzNjEgLTQwLjk0MjcsLTQwLjMwMTU0YzAsLTIyLjI1NzkyIDE4LjMzMDY3LC00MC4zMDE1NCA0MC45NDI3LC00MC4zMDE1NGMyMi42MTIwMywwIDQwLjk0MjcsMTguMDQzNjEgNDAuOTQyNyw0MC4zMDE1NHoiIGZpbGw9IiM2NDk1ZWQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTIzMS44MTg3NiwxODcuOTc2MDh2LTI4Ljc2NzE1aDI5LjczNDExdjI4Ljc2NzE1eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjYiLz48cGF0aCBkPSJNMjE4LjQ0NzEzLDIwMC43OTEwN3YtMjguNzY3MTVoMjkuNzM0MTF2MjguNzY3MTV6IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNiIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjQwLjk0MjY5NjA1MzgwMTE0OjQwLjMwMTUzNTI2NTQ4NjcwNi0tPg==';
  const Aes = (() => {
    "use strict";
    var x = {};
    if (x.cipher = function(e, r) {
        for (var o = r.length / 4 - 1, t = [
            [],
            [],
            [],
            []
          ], n = 0; n < 16; n++) t[n % 4][Math.floor(n / 4)] = e[n];
        t = x.addRoundKey(t, r, 0, 4);
        for (var f = 1; f < o; f++) t = x.subBytes(t, 4), t = x.shiftRows(t, 4), t = x.mixColumns(t, 4), t = x.addRoundKey(t, r, f, 4);
        t = x.subBytes(t, 4), t = x.shiftRows(t, 4), t = x.addRoundKey(t, r, o, 4);
        for (var a = Array(16),
            n = 0; n < 16; n++) a[n] = t[n % 4][Math.floor(n / 4)];
        return a
      }, x.keyExpansion = function(e) {
        for (var r = e.length / 4,
            o = r + 6, t = Array(4 * (o + 1)),
            n = [, , , , ], f = 0; f < r; f++) {
          var a = [e[4 * f], e[4 * f + 1], e[4 * f + 2], e[4 * f + 3]];
          t[f] = a
        }
        for (var f = r; f < 4 * (o + 1); f++) {
          t[f] = [, , , , ];
          for (var c = 0; c < 4; c++) n[c] = t[f - 1][c];
          if (f % r == 0) {
            n = x.subWord(x.rotWord(n));
            for (var c = 0; c < 4; c++) n[c] ^= x.rCon[f / r][c]
          } else r > 6 && f % r == 4 && (n = x.subWord(n));
          for (var c = 0; c < 4; c++) t[f][c] = t[f - r][c] ^ n[c]
        }
        return t
      }, x.subBytes = function(e, r) {
        for (var o = 0; o < 4; o++)
          for (var t = 0; t < r; t++) e[o][t] = x.sBox[e[o][t]];
        return e
      }, x.shiftRows = function(x, e) {
        for (var r = [, , , , ],
            o = 1; o < 4; o++) {
          for (var t = 0; t < 4; t++) r[t] = x[o][(t + o) % e];
          for (var t = 0; t < 4; t++) x[o][t] = r[t]
        }
        return x
      }, x.mixColumns = function(x, e) {
        for (var r = 0; r < 4; r++) {
          for (var o = [, , , , ],
              t = [, , , , ], n = 0; n < 4; n++) o[n] = x[n][r], t[n] = 128 & x[n][r] ? x[n][
              r
            ] << 1 ^ 283 : x[n]
            [r] << 1;
          x[0][r] = t[0] ^ o[1] ^ t[1] ^ o[2] ^ o[3], x[1][r] = o[0] ^ t[1] ^ o[2] ^ t[2] ^ o[3], x[2][r] = o[0] ^ o[1] ^ t[2] ^ o[3] ^ t[3], x[3][r] = o[0] ^ t[0] ^ o[1] ^ o[2] ^ t[3]
        }
        return x
      }, x.addRoundKey = function(x, e, r, o) {
        for (var t = 0; t < 4; t++)
          for (var n = 0; n < o; n++) x[t][n] ^= e[4 * r + n][t];
        return x
      }, x.subWord = function(e) {
        for (var r = 0; r < 4; r++) e[r] = x.sBox[e[r]];
        return e
      }, x.rotWord = function(x) {
        for (var e = x[0], r = 0; r < 3; r++) x[r] = x[r + 1];
        return x[3] = e, x
      }, x.sBox = [99, 124, 119,
        123, 242, 107, 111, 197,
        48, 1, 103, 43, 254, 215,
        171, 118, 202, 130, 201,
        125, 250, 89, 71, 240,
        173, 212, 162, 175, 156,
        164, 114, 192, 183, 253,
        147, 38, 54, 63, 247, 204,
        52, 165, 229, 241, 113,
        216, 49, 21, 4, 199, 35,
        195, 24, 150, 5, 154, 7,
        18, 128, 226, 235, 39,
        178, 117, 9, 131, 44, 26,
        27, 110, 90, 160, 82, 59,
        214, 179, 41, 227, 47,
        132, 83, 209, 0, 237, 32,
        252, 177, 91, 106, 203,
        190, 57, 74, 76, 88, 207,
        208, 239, 170, 251, 67,
        77, 51, 133, 69, 249, 2,
        127, 80, 60, 159, 168, 81,
        163, 64, 143, 146, 157,
        56, 245, 188, 182, 218,
        33, 16, 255, 243, 210,
        205, 12, 19, 236, 95, 151,
        68, 23, 196, 167, 126, 61,
        100, 93, 25, 115, 96, 129,
        79, 220, 34, 42, 144, 136,
        70, 238, 184, 20, 222, 94,
        11, 219, 224, 50, 58, 10,
        73, 6, 36, 92, 194, 211,
        172, 98, 145, 149, 228,
        121, 231, 200, 55, 109,
        141, 213, 78, 169, 108,
        86, 244, 234, 101, 122,
        174, 8, 186, 120, 37, 46,
        28, 166, 180, 198, 232,
        221, 116, 31, 75, 189,
        139, 138, 112, 62, 181,
        102, 72, 3, 246, 14, 97,
        53, 87, 185, 134, 193, 29,
        158, 225, 248, 152, 17,
        105, 217, 142, 148, 155,
        30, 135, 233, 206, 85, 40,
        223, 140, 161, 137, 13,
        191, 230, 66, 104, 65,
        153, 45, 15, 176, 84, 187,
        22
      ], x.rCon = [
        [0, 0, 0, 0],
        [1, 0, 0, 0],
        [2, 0, 0, 0],
        [4, 0, 0, 0],
        [8, 0, 0, 0],
        [16, 0, 0, 0],
        [32, 0, 0, 0],
        [64, 0, 0, 0],
        [128, 0, 0, 0],
        [27, 0, 0, 0],
        [54, 0, 0, 0]
      ], "undefined" != typeof module && module.exports && (module.exports = x), "function" == typeof define && define.amd && define([], function() {
        return x
      }), "undefined" != typeof module && module.exports) var x = require("./aes");

    function e(e) {
      var r = new FileReader;
      r.readAsArrayBuffer(e), r.onload = function(o) {
        $("body")
          .css({
            cursor: "wait"
          });
        for (var t = new Uint8Array(r.result), n = "",
            f = 0; f < t.length; f++) n += String.fromCharCode(t[f]);
        var a = $("#password-file")
          .val(),
          c = new Date,
          d = x.Ctr.encrypt(n, a, 256),
          s = new Date,
          i = new Blob([d], {
            type: "text/plain"
          });
        saveAs(i, e.name + ".encrypted"), $("#encrypt-file-time")
          .html((s - c) / 1e3 + "s"), $("body")
          .css({
            cursor: "default"
          })
      }
    }

    function r(e) {
      var r = new FileReader;
      r.readAsText(e), r.onload = function(o) {
        $("body")
          .css({
            cursor: "wait"
          });
        for (var t = r.result,
            n = $("#password-file")
            .val(), f = new Date, a = x.Ctr.decrypt(t, n, 256),
            c = new Date, d = new Uint8Array(a.length), s = 0; s < a.length; s++) d[s] = a.charCodeAt(s);
        var i = new Blob([d], {
          type: "application/octet-stream"
        });
        saveAs(i, e.name.replace(/\.encrypted$/, "") + ".decrypted"),
          $("#decrypt-file-time")
          .html((c - f) / 1e3 + "s"), $("body")
          .css({
            cursor: "default"
          })
      }
    }

    function e(e) {
      var r = new FileReader;
      r.readAsArrayBuffer(e), r.onload = function(o) {
        $("body")
          .css({
            cursor: "wait"
          });
        for (var t = new Uint8Array(r.result), n = "",
            f = 0; f < t.length; f++) n += String.fromCharCode(t[f]);
        var a = $("#password-file")
          .val(),
          c = new Date,
          d = x.Ctr.encrypt(n, a, 256),
          s = new Date,
          i = new Blob([d], {
            type: "text/plain"
          });
        saveAs(i, e.name + ".encrypted"), $("#encrypt-file-time")
          .html((s - c) / 1e3 + "s"), $("body")
          .css({
            cursor: "default"
          })
      }
    }

    function r(e) {
      var r = new FileReader;
      r.readAsText(e), r.onload = function(o) {
        $("body")
          .css({
            cursor: "wait"
          });
        for (var t = r.result,
            n = $("#password-file")
            .val(), f = new Date, a = x.Ctr.decrypt(t, n, 256),
            c = new Date, d = new Uint8Array(a.length), s = 0; s < a.length; s++) d[s] = a.charCodeAt(s);
        var i = new Blob([d], {
          type: "application/octet-stream"
        });
        saveAs(i, e.name.replace(/\.encrypted$/, "") + ".decrypted"),
          $("#decrypt-file-time")
          .html((c - f) / 1e3 + "s"), $("body")
          .css({
            cursor: "default"
          })
      }
    }
    return x.Ctr = {}, x.Ctr.encrypt = function(e, r, o) {
      if (!(128 == o || 192 == o || 256 == o)) return "";
      e = String(e)
        .utf8Encode(), r = String(r)
        .utf8Encode();
      for (var t = o / 8, n = Array(t), f = 0; f < t; f++) n[f] = isNaN(r.charCodeAt(f)) ? 0 : r.charCodeAt(f);
      var a = x.cipher(n, x.keyExpansion(n));
      a = a.concat(a.slice(0, t - 16));
      for (var c = Array(16),
          d = new Date()
          .getTime(), s = d % 1e3, i = Math.floor(d / 1e3), u = Math.floor(65535 * Math.random()), f = 0; f < 2; f++) c[f] = s >>> 8 * f & 255;
      for (var f = 0; f < 2; f++) c[f + 2] = u >>> 8 * f & 255;
      for (var f = 0; f < 4; f++) c[f + 4] = i >>> 8 * f & 255;
      for (var _ = "", f = 0; f < 8; f++) _ += String.fromCharCode(c[f]);
      for (var p = x.keyExpansion(a), v = Math.ceil(e.length / 16), l = Array(v),
          y = 0; y < v; y++) {
        for (var b = 0; b < 4; b++) c[15 - b] = y >>> 8 * b & 255;
        for (var b = 0; b < 4; b++) c[15 - b - 4] = y / 4294967296 >>> 8 * b;
        for (var h = x.cipher(c, p), w = y < v - 1 ? 16 : (e.length - 1) % 16 + 1, C = Array(w), f = 0; f < w; f++) C[f] = h[f] ^ e.charCodeAt(16 * y + f), C[f] = String.fromCharCode(C[f]);
        l[y] = C.join("")
      }
      var m = _ + l.join("");
      return m.base64Encode()
    }, x.Ctr.decrypt = function(e, r, o) {
      if (!(128 == o || 192 == o || 256 == o)) return "";
      e = String(e)
        .base64Decode(), r = String(r)
        .utf8Encode();
      for (var t = o / 8, n = Array(t), f = 0; f < t; f++) n[f] = isNaN(r.charCodeAt(f)) ? 0 : r.charCodeAt(f);
      var a = x.cipher(n, x.keyExpansion(n));
      a = a.concat(a.slice(0, t - 16));
      for (var c = Array(8), d = e.slice(0, 8), f = 0; f < 8; f++) c[f] = d.charCodeAt(f);
      for (var s = x.keyExpansion(a), i = Math.ceil((e.length - 8) / 16), u = Array(i), _ = 0; _ < i; _++) u[_] = e.slice(8 + 16 * _, 8 + 16 * _ + 16);
      e = u;
      for (var p = Array(e.length), _ = 0; _ < i; _++) {
        for (var v = 0; v < 4; v++) c[15 - v] = _ >>> 8 * v & 255;
        for (var v = 0; v < 4; v++) c[15 - v - 4] = (_ + 1) / 4294967296 - 1 >>> 8 * v & 255;
        for (var l = x.cipher(c, s), y = Array(e[_].length), f = 0; f < e[_].length; f++) y[f] = l[f] ^ e[_].charCodeAt(f), y[f] = String.fromCharCode(y[f]);
        p[_] = y.join("")
      }
      var b = p.join("");
      return b.utf8Decode()
    }, void 0 === String.prototype.utf8Encode && (String.prototype.utf8Encode = function() {
      return unescape(encodeURIComponent(this))
    }), void 0 === String.prototype.utf8Decode && (String.prototype.utf8Decode = function() {
      try {
        return decodeURIComponent(escape(this))
      } catch (x) {
        return this
      }
    }), void 0 === String.prototype.base64Encode && (String.prototype.base64Encode = function() {
      if ("undefined" != typeof btoa) return btoa(this);
      if ("undefined" != typeof Buffer) return new Buffer(this, "utf8")
        .toString("base64");
      throw Error("No Base64 Encode")
    }), void 0 === String.prototype.base64Decode && (String.prototype.base64Decode = function() {
      if ("undefined" != typeof atob) return atob(this);
      if ("undefined" != typeof Buffer) return new Buffer(this, "base64")
        .toString("utf8");
      throw Error("No Base64 Decode")
    }), "undefined" != typeof module && module.exports && (module.exports = x.Ctr), "function" == typeof define && define.amd && define(["Aes"], function() {
      return x.Ctr
    }), x
  })();
  /* eslint-disable */
  const md5 = (function () {
    /**
    * Add integers, wrapping at 2^32.
    * This uses 16-bit operations internally to work around bugs in interpreters.
    *
    * @param {number} x First integer
    * @param {number} y Second integer
    * @returns {number} Sum
    */
    function safeAdd(x, y) {
      var lsw = (x & 0xffff) + (y & 0xffff)
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
      return (msw << 16) | (lsw & 0xffff)
    }

    /**
    * Bitwise rotate a 32-bit number to the left.
    *
    * @param {number} num 32-bit number
    * @param {number} cnt Rotation count
    * @returns {number} Rotated number
    */
    function bitRotateLeft(num, cnt) {
      return (num << cnt) | (num >>> (32 - cnt))
    }

    /**
    * Basic operation the algorithm uses.
    *
    * @param {number} q q
    * @param {number} a a
    * @param {number} b b
    * @param {number} x x
    * @param {number} s s
    * @param {number} t t
    * @returns {number} Result
    */
    function md5cmn(q, a, b, x, s, t) {
      return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
    }
    /**
    * Basic operation the algorithm uses.
    *
    * @param {number} a a
    * @param {number} b b
    * @param {number} c c
    * @param {number} d d
    * @param {number} x x
    * @param {number} s s
    * @param {number} t t
    * @returns {number} Result
    */
    function md5ff(a, b, c, d, x, s, t) {
      return md5cmn((b & c) | (~b & d), a, b, x, s, t)
    }
    /**
    * Basic operation the algorithm uses.
    *
    * @param {number} a a
    * @param {number} b b
    * @param {number} c c
    * @param {number} d d
    * @param {number} x x
    * @param {number} s s
    * @param {number} t t
    * @returns {number} Result
    */
    function md5gg(a, b, c, d, x, s, t) {
      return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
    }
    /**
    * Basic operation the algorithm uses.
    *
    * @param {number} a a
    * @param {number} b b
    * @param {number} c c
    * @param {number} d d
    * @param {number} x x
    * @param {number} s s
    * @param {number} t t
    * @returns {number} Result
    */
    function md5hh(a, b, c, d, x, s, t) {
      return md5cmn(b ^ c ^ d, a, b, x, s, t)
    }
    /**
    * Basic operation the algorithm uses.
    *
    * @param {number} a a
    * @param {number} b b
    * @param {number} c c
    * @param {number} d d
    * @param {number} x x
    * @param {number} s s
    * @param {number} t t
    * @returns {number} Result
    */
    function md5ii(a, b, c, d, x, s, t) {
      return md5cmn(c ^ (b | ~d), a, b, x, s, t)
    }

    /**
    * Calculate the MD5 of an array of little-endian words, and a bit length.
    *
    * @param {Array} x Array of little-endian words
    * @param {number} len Bit length
    * @returns {Array<number>} MD5 Array
    */
    function binlMD5(x, len) {
      /* append padding */
      x[len >> 5] |= 0x80 << len % 32
      x[(((len + 64) >>> 9) << 4) + 14] = len

      var i
      var olda
      var oldb
      var oldc
      var oldd
      var a = 1732584193
      var b = -271733879
      var c = -1732584194
      var d = 271733878

      for (i = 0; i < x.length; i += 16) {
        olda = a
        oldb = b
        oldc = c
        oldd = d

        a = md5ff(a, b, c, d, x[i], 7, -680876936)
        d = md5ff(d, a, b, c, x[i + 1], 12, -389564586)
        c = md5ff(c, d, a, b, x[i + 2], 17, 606105819)
        b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330)
        a = md5ff(a, b, c, d, x[i + 4], 7, -176418897)
        d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
        c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341)
        b = md5ff(b, c, d, a, x[i + 7], 22, -45705983)
        a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
        d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417)
        c = md5ff(c, d, a, b, x[i + 10], 17, -42063)
        b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162)
        a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
        d = md5ff(d, a, b, c, x[i + 13], 12, -40341101)
        c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290)
        b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329)

        a = md5gg(a, b, c, d, x[i + 1], 5, -165796510)
        d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632)
        c = md5gg(c, d, a, b, x[i + 11], 14, 643717713)
        b = md5gg(b, c, d, a, x[i], 20, -373897302)
        a = md5gg(a, b, c, d, x[i + 5], 5, -701558691)
        d = md5gg(d, a, b, c, x[i + 10], 9, 38016083)
        c = md5gg(c, d, a, b, x[i + 15], 14, -660478335)
        b = md5gg(b, c, d, a, x[i + 4], 20, -405537848)
        a = md5gg(a, b, c, d, x[i + 9], 5, 568446438)
        d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690)
        c = md5gg(c, d, a, b, x[i + 3], 14, -187363961)
        b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
        a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467)
        d = md5gg(d, a, b, c, x[i + 2], 9, -51403784)
        c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
        b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734)

        a = md5hh(a, b, c, d, x[i + 5], 4, -378558)
        d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463)
        c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
        b = md5hh(b, c, d, a, x[i + 14], 23, -35309556)
        a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060)
        d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
        c = md5hh(c, d, a, b, x[i + 7], 16, -155497632)
        b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640)
        a = md5hh(a, b, c, d, x[i + 13], 4, 681279174)
        d = md5hh(d, a, b, c, x[i], 11, -358537222)
        c = md5hh(c, d, a, b, x[i + 3], 16, -722521979)
        b = md5hh(b, c, d, a, x[i + 6], 23, 76029189)
        a = md5hh(a, b, c, d, x[i + 9], 4, -640364487)
        d = md5hh(d, a, b, c, x[i + 12], 11, -421815835)
        c = md5hh(c, d, a, b, x[i + 15], 16, 530742520)
        b = md5hh(b, c, d, a, x[i + 2], 23, -995338651)

        a = md5ii(a, b, c, d, x[i], 6, -198630844)
        d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
        c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905)
        b = md5ii(b, c, d, a, x[i + 5], 21, -57434055)
        a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
        d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606)
        c = md5ii(c, d, a, b, x[i + 10], 15, -1051523)
        b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799)
        a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
        d = md5ii(d, a, b, c, x[i + 15], 10, -30611744)
        c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380)
        b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
        a = md5ii(a, b, c, d, x[i + 4], 6, -145523070)
        d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379)
        c = md5ii(c, d, a, b, x[i + 2], 15, 718787259)
        b = md5ii(b, c, d, a, x[i + 9], 21, -343485551)

        a = safeAdd(a, olda)
        b = safeAdd(b, oldb)
        c = safeAdd(c, oldc)
        d = safeAdd(d, oldd)
      }
      return [a, b, c, d]
    }

    /**
    * Convert an array of little-endian words to a string
    *
    * @param {Array<number>} input MD5 Array
    * @returns {string} MD5 string
    */
    function binl2rstr(input) {
      var i
      var output = ''
      var length32 = input.length * 32
      for (i = 0; i < length32; i += 8) {
        output += String.fromCharCode((input[i >> 5] >>> i % 32) & 0xff)
      }
      return output
    }

    /**
    * Convert a raw string to an array of little-endian words
    * Characters >255 have their high-byte silently ignored.
    *
    * @param {string} input Raw input string
    * @returns {Array<number>} Array of little-endian words
    */
    function rstr2binl(input) {
      var i
      var output = []
      output[(input.length >> 2) - 1] = undefined
      for (i = 0; i < output.length; i += 1) {
        output[i] = 0
      }
      var length8 = input.length * 8
      for (i = 0; i < length8; i += 8) {
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32
      }
      return output
    }

    /**
    * Calculate the MD5 of a raw string
    *
    * @param {string} s Input string
    * @returns {string} Raw MD5 string
    */
    function rstrMD5(s) {
      return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
    }

    /**
    * Calculates the HMAC-MD5 of a key and some data (raw strings)
    *
    * @param {string} key HMAC key
    * @param {string} data Raw input string
    * @returns {string} Raw MD5 string
    */
    function rstrHMACMD5(key, data) {
      var i
      var bkey = rstr2binl(key)
      var ipad = []
      var opad = []
      var hash
      ipad[15] = opad[15] = undefined
      if (bkey.length > 16) {
        bkey = binlMD5(bkey, key.length * 8)
      }
      for (i = 0; i < 16; i += 1) {
        ipad[i] = bkey[i] ^ 0x36363636
        opad[i] = bkey[i] ^ 0x5c5c5c5c
      }
      hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
      return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
    }

    /**
    * Convert a raw string to a hex string
    *
    * @param {string} input Raw input string
    * @returns {string} Hex encoded string
    */
    function rstr2hex(input) {
      var hexTab = '0123456789abcdef'
      var output = ''
      var x
      var i
      for (i = 0; i < input.length; i += 1) {
        x = input.charCodeAt(i)
        output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f)
      }
      return output
    }

    /**
    * Encode a string as UTF-8
    *
    * @param {string} input Input string
    * @returns {string} UTF8 string
    */
    function str2rstrUTF8(input) {
      return unescape(encodeURIComponent(input))
    }

    /**
    * Encodes input string as raw MD5 string
    *
    * @param {string} s Input string
    * @returns {string} Raw MD5 string
    */
    function rawMD5(s) {
      return rstrMD5(str2rstrUTF8(s))
    }
    /**
    * Encodes input string as Hex encoded string
    *
    * @param {string} s Input string
    * @returns {string} Hex encoded string
    */
    function hexMD5(s) {
      return rstr2hex(rawMD5(s))
    }
    /**
    * Calculates the raw HMAC-MD5 for the given key and data
    *
    * @param {string} k HMAC key
    * @param {string} d Input string
    * @returns {string} Raw MD5 string
    */
    function rawHMACMD5(k, d) {
      return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d))
    }
    /**
    * Calculates the Hex encoded HMAC-MD5 for the given key and data
    *
    * @param {string} k HMAC key
    * @param {string} d Input string
    * @returns {string} Raw MD5 string
    */
    function hexHMACMD5(k, d) {
      return rstr2hex(rawHMACMD5(k, d))
    }

    /**
    * Calculates MD5 value for a given string.
    * If a key is provided, calculates the HMAC-MD5 value.
    * Returns a Hex encoded string unless the raw argument is given.
    *
    * @param {string} string Input string
    * @param {string} [key] HMAC key
    * @param {boolean} [raw] Raw output switch
    * @returns {string} MD5 output
    */
    function md5(string, key, raw) {
      if (!key) {
        if (!raw) {
          return hexMD5(string)
        }
        return rawMD5(string)
      }
      if (!raw) {
        return hexHMACMD5(key, string)
      }
      return rawHMACMD5(key, string)
    }

    return md5;
  })();
  /* eslint-enable */
  function hashFnv32a(str, asString, seed) {
    /*jshint bitwise:false */
    var i, l,
      hval = (seed === undefined) ? 0x811c9dc5 : seed;
    for (i = 0, l = str.length; i < l; i++) {
      hval ^= str.charCodeAt(i);
      hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    if (asString) {
      return ("0000000" + (hval >>> 0)
          .toString(16))
        .substr(-8);
    }
    return hval >>> 0;
  }
  class EncodingV2 {
    getInfo() {
      return {
        id: 'EncodingV2',
        name: 'Encoding',
        color1: '#6495ed',
        color2: '#739fee',
        color3: '#83aaf0',
        menuIconURI: icon2,
        blockIconURI: icon,
        blocks: [
          {
            opcode: 'encoder',
            blockType: Scratch.BlockType.REPORTER,
            text: '[mode] [value] with [encoding]',
            arguments: {
              encoding: {
                type: Scratch.ArgumentType.STRING,
                menu: 'encodings'
              },
              value: {
                type: Scratch.ArgumentType.STRING
              },
              mode: {
                type: Scratch.ArgumentType.STRING,
                menu: 'recodes'
              }
            }
          },
          {
            opcode: 'hashMe',
            blockType: Scratch.BlockType.REPORTER,
            text: 'hash [value] with [hash]',
            arguments: {
              hash: {
                type: Scratch.ArgumentType.STRING,
                menu: 'hashes'
              },
              value: {
                type: Scratch.ArgumentType.STRING
              }
            }
          },

          '---',

          {
            opcode: 'Conversioncodes',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Convert the character [string] to [CodeList]',
            arguments: {
              string: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'A'
              },
              CodeList: {
                type: Scratch.ArgumentType.STRING,
                menu: 'Code',
                defaultValue: 'UNICODE'
              }
            }
          },
          {
            opcode: 'Restorecode',
            blockType: Scratch.BlockType.REPORTER,
            text: '[string] corresponding to the [CodeList] character',
            arguments: {
              string: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '65'
              },
              CodeList: {
                type: Scratch.ArgumentType.STRING,
                menu: 'Code',
                defaultValue: 'UNICODE'
              }
            }
          },

          '---',

          {
            opcode: 'Randomstrings',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Randomly generated [position] character string',
            arguments: {
              position: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '8'
              }
            }
          },
          {
            opcode: 'digitGen',
            blockType: Scratch.BlockType.REPORTER,
            text: 'random [len] digit int',
            arguments: {
              len: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 8
              }
            }
          },
          {
            opcode: 'Fontgenerationstring',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Use [wordbank] to generate a random [position] character string',
            arguments: {
              wordbank: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1234567890'
              },
              position: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '8'
              }
            }
          },

          '---',

          {
            opcode: 'doAES',
            blockType: Scratch.BlockType.REPORTER,
            text: '[mode] [data] with aes+password: [pwd] and [bytes] bytes.',
            arguments: {
              mode: {
                type: Scratch.ArgumentType.STRING,
                menu: 'cryptmodes'
              },
              pwd: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'password'
              },
              data: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello, World!'
              },
              bytes: {
                type: Scratch.ArgumentType.STRING,
                menu: 'aesbytes'
              }
            }
          },
        ],
        menus:{
        //updated by SurvExE1Pc
        cryptmodes: {
          items: ['Encrypt', 'Decrypt']
        },
        aesbytes: {
          items: ['128', '256']
        },
        encodings: {
          items: [{
            text: 'base64(browser)',
            value: 'base64_old'
          }, 'unicode', 'binary', 'cloud', {
            text: '(I36) Text',
            value: 'i36_text'
          }, {
            text: '(I36) Number',
            value: 'i36_number'
          }]
        },
        hashes: {
          items: ['md5', 'sha1',
          //'sha128', 
          'sha256', 'sha512', {
              text: '32-Bit Fnv-1a',
              value: 'Fnv32'
            },
            /*{
              text: 'Jenkins One at a Time',
              value: 'JOaaT'
            },*/
            'TinySimpleHash', 'cyrb53', '147030016'
          ]
        },
        recodes: {
          items: ['Encode', 'Decode']
        },
        i36modes: {
          items: ['text', 'number']
        }
      }
    }}
    /* moved cause it was updated */
    Conversioncodes({ string, CodeList }) {
      string = Scratch.Cast.toString(string);
      switch (CodeList) {
        case 'UNICODE': return string.charCodeAt(0);
      }
      return 0;
    }
    Restorecode({ string, CodeList}) {
      switch (CodeList) {
        case 'UNICODE': return String.fromCharCode(string);
      }
      return '';
    }
    Randomstrings({ position }) {
      position = Scratch.Cast.toNumber(position) || 32;
      let t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      let a = t.length;
      let string = '';
      for (let i = 0; i < position; i++) {
        string += t.charAt(Math.floor(Math.random() * a));
      }
      return string;
    }
    Fontgenerationstring({ wordbank, position }) {
      position = Scratch.Cast.toNumber(position) || 32;
      let t = String(wordbank);
      let a = t.length;
      let string = '';
      for (let i = 0; i < position; i++) {
        string += t.charAt(Math.floor(Math.random() * a));
      }
      return string;
    }

    /* code in this section by SurvExE1Pc */
    doAES(args) {
      var ciphertext = null;
      if (args.mode == 'Encrypt') ciphertext = Aes.Ctr.encrypt(args.data, args.pwd, args.bytes);
      if (args.mode == 'Decrypt') ciphertext = Aes.Ctr.decrypt(args.data, args.pwd, args.bytes);
      return ciphertext;
    }
    digitGen(args) {
      //Made by -SIPC- modified by As_g
      //https://extensions.turbowarp.org/encoding.js
      let t = '123456789'.split('');
      let string = t[Math.floor(Math.random() * t.length)].toString();
      t.push('0');
      for (let i = 0; i < args.len - 1; i++) {
        string += t[Math.floor(Math.random() * t.length)].toString();
      }
      return string;
    }
        //ENCODING + HASHING
        hashMe(args) {
          const val = Scratch.Cast.toString(args.value);
          const TSH = s => { //TinySimpleHash
            for (var i = 0, h = 9; i < s.length;) h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9);
            return h ^ h >>> 9;
          };
          function getHash(str, algo = "SHA-256") {
            let strBuf = new TextEncoder()
              .encode(str);
            return crypto.subtle.digest(algo, strBuf)
              .then(hash => {
                window.hash = hash;
                let result = '';
                const view = new DataView(hash);
                for (let i = 0; i < hash.byteLength; i += 4) {
                  result += ('00000000' + view.getUint32(i)
                      .toString(16))
                    .slice(-8);
                }
                return result;
              });
          }
          const cyrb53 = (str, seed = 0) => {
            let h1 = 0xdeadbeef ^ seed,
              h2 = 0x41c6ce57 ^ seed;
            for (let i = 0, ch; i < str.length; i++) {
              ch = str.charCodeAt(i);
              h1 = Math.imul(h1 ^ ch, 2654435761);
              h2 = Math.imul(h2 ^ ch, 1597334677);
            }
            h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
            h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
            h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
            h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
            return 4294967296 * (2097151 & h2) + (h1 >>> 0);
          };
    
          switch (args.hash) {
            case "md5":
              return md5(val); //You can also use https://extensions.turbowarp.org/encoding.js by -SIPC-
            case "sha1":
              console.log("SHA-1 is insecure and is considered a security vulnerability.");
              return getHash(val, 'SHA-1')
                .then(hash => {
                  return hash;
                });
            case "sha128":
              alert("I am broken :(");
              console.log("I am broken :(");
              return "I am broken :(";
            case "sha256":
              return getHash(val, 'SHA-256')
              .then(hash => {
                return hash;
              });
            case "sha512":
              return getHash(val, 'SHA-512')
              .then(hash => {
                return hash;
              });
            case "TinySimpleHash":
              return TSH(val);
            case "Fnv32":
              return hashFnv32a(val, true);
            case "cyrb53":
              return cyrb53(val, 0);
            case "147030016":
              // eslint-disable-next-line
              var hashCode = s => s.split('')
              .reduce((a, b) => {
                a = ((a << 5) - a) + b.charCodeAt(0);
                return a & a;
              }, 0); //no-redeclare
              return hashCode(val);
            case "1964351488":
              // eslint-disable-next-line
              var hashCode = s => s.split('')
                .reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0); //no-redeclare
              return hashCode(val);
            default:
              return 'fail';
          }
        }
        encoder(args) {
          const val = args.value;
    
          //START I36 Block
                //Some stupid thing I made all by myself.
                const i36 = S => {
                  return ((((S << 7616461 << 834) >> 5) << 36) < 0 ? (Math.round(Math.abs((((S << 7616461 << 834) >> 5) << 36)) ^ 0.1)) : ((((S << 7616461 << 834) >> 5) << 36)));
                };
                const h36 = S => {
                  return i36(S)
                    .toString(36);
                };
                const ri36 = E => {
                  return ((((E >> 36) >>> 5) >> (836 >> 7616461)) / 32);
                };
                const rh36 = E => {
                  return ri36(parseInt(E, 36));
                };
                const oldProtos = {
                  num: Number.prototype,
                  str: String.prototype
                };
                function addi36() {
                  Number.prototype.toI36 = function() {
                    const prim = this.valueOf();
                    var str = h36(prim);
                    return (str);
                  };
                  String.prototype.fromI36 = function() {
                    const prim = this.valueOf();
                    var str = rh36(prim);
                    return (str);
                  };
                }
                function restoreOldPrototypes() {
                  //String.prototype = oldProtos.str;
                  //Number.prototype = oldProtos.num;
                  delete String.prototype.fromI36;
                  delete String.prototype.toI36;
                }
          //END I36 Block
    
          switch (args.mode) {
            case "Encode":
              switch (args.encoding) {
                case "base64_old":
                  return btoa(val);
                case "unicode":
                  return val.toString()[0].charCodeAt();
                case "binary":
                  return Array.from(val).map((each) => each.charCodeAt(0).toString(2)).join(" "); // Oneliner is cool 😎
                case "cloud":
                  return "Currently Broken\nUse the \"Numerical Encoding\" extension.";
                case "i36_text":
                  addi36();
                  // eslint-disable-next-line
                  var ret = Array.from(val.toString()).map((each) => each.toString().charCodeAt(0).toI36()).join(" "); //no-redeclare
                  restoreOldPrototypes();
                  return ret;
                case "i36_number":
                  addi36();
                  // eslint-disable-next-line
                  var ret = h36(parseInt(val, 10)); //no-redeclare
                  restoreOldPrototypes();
                  return ret;
                default:
                  break;
              }
              return "Invalid encoding";
            case "Decode":
              switch (args.encoding) {
                case "base64_old":
                  return atob(val);
                case "unicode":
                  return String.fromCharCode(parseInt(val));
                case "binary":
                  return val.split(" ").map((x) => x = String.fromCharCode(parseInt(x, 2))).join(""); // Oneliner is cool, but its still readable
                case "cloud":
                  return "Currently Broken\nUse the \"Numerical Encoding\" extension.";
                case "i36_text":
                  addi36();
                  // eslint-disable-next-line
                  var ret = val.split(" ").map((x) => x = String.fromCharCode(x.toString().fromI36())).join(""); //no-redeclare
                  restoreOldPrototypes();
                  return ret;
                case "i36_number":
                  addi36();
                  // eslint-disable-next-line
                  var ret = rh36(val); //no-redeclare
                  restoreOldPrototypes();
                  return ret;
                default:
                  break;
              }
              return 'Invalid encoding';
            default:
              return 'fail';
          }
        }
    /* end section */
  }
  Scratch.extensions.register(new EncodingV2());
})(Scratch);

/*!
The md5 function is based on https://github.com/blueimp/JavaScript-MD5/blob/master/js/md5.js
which is licensed under:

MIT License

Copyright © 2011 Sebastian Tschan, https://blueimp.net

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/*
MD5.JS: https://github.com/blueimp/JavaScript-MD5/blob/master/js/md5.js
JSZip: http://stuartk.com/jszip
JSEncrypt: https://github.com/travist/jsencrypt/
AES.JS: https://rawgit.com/victornpb/f639f37373be0f6e82e1/raw/5d8f7ee8b32ae04de087d2377d8086e3389ee411/AES.js
getHash function used: https://stackoverflow.com/a/43383990/17448696
cyrb53+TinySimpleHash: https://stackoverflow.com/a/52171480/17448696
32-Bit Fnv-1a hash: https://gist.github.com/vaiorabbit/5657561
Jenkins One at a Time Hash: https://stackoverflow.com/a/69301377/17448696
_* THE HASHES IN THIS BLOCK HAD NO NAMES,
 * SO THEY WERE GIVEN NAMES USING SIMPLE CODE.
147030016(hash): https://stackoverflow.com/a/15710692/17448696
1964351488(hash): https://stackoverflow.com/a/34842797/17448696

_+ CODE BLOCK

const ANSWER_ID = 0;
var x = ANSWER_ID<<7616461;
if (x<0) { x=0-x; x=x^0.1; x=Math.round(x)}
//x is the new hash name.

_+ END CODE BLOCK
_* END BLOCK
*/