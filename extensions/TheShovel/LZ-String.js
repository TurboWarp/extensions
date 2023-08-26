// Name: LZ Compress
// ID: shovellzcompress
// Description: Compress and decompress text using lz-string.

(function (Scratch) {
  "use strict";

  /* eslint-disable */
  // Code from https://github.com/pieroxy/lz-string/
  // MIT License

  // Copyright (c) 2013 pieroxy

  // Permission is hereby granted, free of charge, to any person obtaining a copy
  // of this software and associated documentation files (the "Software"), to deal
  // in the Software without restriction, including without limitation the rights
  // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  // copies of the Software, and to permit persons to whom the Software is
  // furnished to do so, subject to the following conditions:

  // The above copyright notice and this permission notice shall be included in all
  // copies or substantial portions of the Software.

  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  // SOFTWARE.
  var LZString = (function () {
    var r = String.fromCharCode,
      o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",
      e = {};

    function t(r, o) {
      if (!e[r]) {
        e[r] = {};
        for (var n = 0; n < r.length; n++) e[r][r.charAt(n)] = n;
      }
      return e[r][o];
    }
    var i = {
      compressToBase64: function (r) {
        if (null == r) return "";
        var n = i._compress(r, 6, function (r) {
          return o.charAt(r);
        });
        switch (n.length % 4) {
          default:
          case 0:
            return n;
          case 1:
            return n + "===";
          case 2:
            return n + "==";
          case 3:
            return n + "=";
        }
      },
      decompressFromBase64: function (r) {
        return null == r
          ? ""
          : "" == r
          ? null
          : i._decompress(r.length, 32, function (n) {
              return t(o, r.charAt(n));
            });
      },
      compressToUTF16: function (o) {
        return null == o
          ? ""
          : i._compress(o, 15, function (o) {
              return r(o + 32);
            }) + " ";
      },
      decompressFromUTF16: function (r) {
        return null == r
          ? ""
          : "" == r
          ? null
          : i._decompress(r.length, 16384, function (o) {
              return r.charCodeAt(o) - 32;
            });
      },
      compressToUint8Array: function (r) {
        for (
          var o = i.compress(r),
            n = new Uint8Array(2 * o.length),
            e = 0,
            t = o.length;
          e < t;
          e++
        ) {
          var s = o.charCodeAt(e);
          (n[2 * e] = s >>> 8), (n[2 * e + 1] = s % 256);
        }
        return n;
      },
      decompressFromUint8Array: function (o) {
        if (null == o) return i.decompress(o);
        for (var n = new Array(o.length / 2), e = 0, t = n.length; e < t; e++)
          n[e] = 256 * o[2 * e] + o[2 * e + 1];
        var s = [];
        return (
          n.forEach(function (o) {
            s.push(r(o));
          }),
          i.decompress(s.join(""))
        );
      },
      compressToEncodedURIComponent: function (r) {
        return null == r
          ? ""
          : i._compress(r, 6, function (r) {
              return n.charAt(r);
            });
      },
      decompressFromEncodedURIComponent: function (r) {
        return null == r
          ? ""
          : "" == r
          ? null
          : ((r = r.replace(/ /g, "+")),
            i._decompress(r.length, 32, function (o) {
              return t(n, r.charAt(o));
            }));
      },
      compress: function (o) {
        return i._compress(o, 16, function (o) {
          return r(o);
        });
      },
      _compress: function (r, o, n) {
        if (null == r) return "";
        var e,
          t,
          i,
          s = {},
          u = {},
          a = "",
          p = "",
          c = "",
          l = 2,
          f = 3,
          h = 2,
          d = [],
          m = 0,
          v = 0;
        for (i = 0; i < r.length; i += 1)
          if (
            ((a = r.charAt(i)),
            Object.prototype.hasOwnProperty.call(s, a) ||
              ((s[a] = f++), (u[a] = !0)),
            (p = c + a),
            Object.prototype.hasOwnProperty.call(s, p))
          )
            c = p;
          else {
            if (Object.prototype.hasOwnProperty.call(u, c)) {
              if (c.charCodeAt(0) < 256) {
                for (e = 0; e < h; e++)
                  (m <<= 1),
                    v == o - 1 ? ((v = 0), d.push(n(m)), (m = 0)) : v++;
                for (t = c.charCodeAt(0), e = 0; e < 8; e++)
                  (m = (m << 1) | (1 & t)),
                    v == o - 1 ? ((v = 0), d.push(n(m)), (m = 0)) : v++,
                    (t >>= 1);
              } else {
                for (t = 1, e = 0; e < h; e++)
                  (m = (m << 1) | t),
                    v == o - 1 ? ((v = 0), d.push(n(m)), (m = 0)) : v++,
                    (t = 0);
                for (t = c.charCodeAt(0), e = 0; e < 16; e++)
                  (m = (m << 1) | (1 & t)),
                    v == o - 1 ? ((v = 0), d.push(n(m)), (m = 0)) : v++,
                    (t >>= 1);
              }
              0 == --l && ((l = Math.pow(2, h)), h++), delete u[c];
            } else
              for (t = s[c], e = 0; e < h; e++)
                (m = (m << 1) | (1 & t)),
                  v == o - 1 ? ((v = 0), d.push(n(m)), (m = 0)) : v++,
                  (t >>= 1);
            0 == --l && ((l = Math.pow(2, h)), h++),
              (s[p] = f++),
              (c = String(a));
          }
        if ("" !== c) {
          if (Object.prototype.hasOwnProperty.call(u, c)) {
            if (c.charCodeAt(0) < 256) {
              for (e = 0; e < h; e++)
                (m <<= 1), v == o - 1 ? ((v = 0), d.push(n(m)), (m = 0)) : v++;
              for (t = c.charCodeAt(0), e = 0; e < 8; e++)
                (m = (m << 1) | (1 & t)),
                  v == o - 1 ? ((v = 0), d.push(n(m)), (m = 0)) : v++,
                  (t >>= 1);
            } else {
              for (t = 1, e = 0; e < h; e++)
                (m = (m << 1) | t),
                  v == o - 1 ? ((v = 0), d.push(n(m)), (m = 0)) : v++,
                  (t = 0);
              for (t = c.charCodeAt(0), e = 0; e < 16; e++)
                (m = (m << 1) | (1 & t)),
                  v == o - 1 ? ((v = 0), d.push(n(m)), (m = 0)) : v++,
                  (t >>= 1);
            }
            0 == --l && ((l = Math.pow(2, h)), h++), delete u[c];
          } else
            for (t = s[c], e = 0; e < h; e++)
              (m = (m << 1) | (1 & t)),
                v == o - 1 ? ((v = 0), d.push(n(m)), (m = 0)) : v++,
                (t >>= 1);
          0 == --l && ((l = Math.pow(2, h)), h++);
        }
        for (t = 2, e = 0; e < h; e++)
          (m = (m << 1) | (1 & t)),
            v == o - 1 ? ((v = 0), d.push(n(m)), (m = 0)) : v++,
            (t >>= 1);
        for (;;) {
          if (((m <<= 1), v == o - 1)) {
            d.push(n(m));
            break;
          }
          v++;
        }
        return d.join("");
      },
      decompress: function (r) {
        return null == r
          ? ""
          : "" == r
          ? null
          : i._decompress(r.length, 32768, function (o) {
              return r.charCodeAt(o);
            });
      },
      _decompress: function (o, n, e) {
        var t,
          i,
          s,
          u,
          a,
          p,
          c,
          l = [],
          f = 4,
          h = 4,
          d = 3,
          m = "",
          v = [],
          g = {
            val: e(0),
            position: n,
            index: 1,
          };
        for (t = 0; t < 3; t += 1) l[t] = t;
        for (s = 0, a = Math.pow(2, 2), p = 1; p != a; )
          (u = g.val & g.position),
            (g.position >>= 1),
            0 == g.position && ((g.position = n), (g.val = e(g.index++))),
            (s |= (u > 0 ? 1 : 0) * p),
            (p <<= 1);
        switch (s) {
          case 0:
            for (s = 0, a = Math.pow(2, 8), p = 1; p != a; )
              (u = g.val & g.position),
                (g.position >>= 1),
                0 == g.position && ((g.position = n), (g.val = e(g.index++))),
                (s |= (u > 0 ? 1 : 0) * p),
                (p <<= 1);
            c = r(s);
            break;
          case 1:
            for (s = 0, a = Math.pow(2, 16), p = 1; p != a; )
              (u = g.val & g.position),
                (g.position >>= 1),
                0 == g.position && ((g.position = n), (g.val = e(g.index++))),
                (s |= (u > 0 ? 1 : 0) * p),
                (p <<= 1);
            c = r(s);
            break;
          case 2:
            return "";
        }
        for (l[3] = c, i = c, v.push(c); ; ) {
          if (g.index > o) return "";
          for (s = 0, a = Math.pow(2, d), p = 1; p != a; )
            (u = g.val & g.position),
              (g.position >>= 1),
              0 == g.position && ((g.position = n), (g.val = e(g.index++))),
              (s |= (u > 0 ? 1 : 0) * p),
              (p <<= 1);
          switch ((c = s)) {
            case 0:
              for (s = 0, a = Math.pow(2, 8), p = 1; p != a; )
                (u = g.val & g.position),
                  (g.position >>= 1),
                  0 == g.position && ((g.position = n), (g.val = e(g.index++))),
                  (s |= (u > 0 ? 1 : 0) * p),
                  (p <<= 1);
              (l[h++] = r(s)), (c = h - 1), f--;
              break;
            case 1:
              for (s = 0, a = Math.pow(2, 16), p = 1; p != a; )
                (u = g.val & g.position),
                  (g.position >>= 1),
                  0 == g.position && ((g.position = n), (g.val = e(g.index++))),
                  (s |= (u > 0 ? 1 : 0) * p),
                  (p <<= 1);
              (l[h++] = r(s)), (c = h - 1), f--;
              break;
            case 2:
              return v.join("");
          }
          // @ts-ignore
          if ((0 == f && ((f = Math.pow(2, d)), d++), l[c])) m = l[c];
          else {
            if (c !== h) return null;
            m = i + i.charAt(0);
          }
          v.push(m),
            (l[h++] = i + m.charAt(0)),
            (i = m),
            0 == --f && ((f = Math.pow(2, d)), d++);
        }
      },
    };
    return i;
  })();
  // @ts-ignore
  "function" == typeof define && define.amd
    ? define(function () {
        return LZString;
        // @ts-ignore
      })
    : "undefined" != typeof module && null != module
    ? (module.exports = LZString)
    : "undefined" != typeof angular &&
      null != angular &&
      angular.module("LZString", []).factory("LZString", function () {
        return LZString;
      });
  /* eslint-enable */

  class lzcompress {
    getInfo() {
      return {
        id: "shovellzcompress",
        name: "LZ Compress",
        blocks: [
          {
            opcode: "compress",
            blockType: Scratch.BlockType.REPORTER,
            text: "compress [TEXT] to [TYPE]",
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
            text: "decompress [TEXT] from [TYPE]",
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
              "Raw",
              "Base64",
              "EncodedURIComponent",
              "Uint8Array",
              "UTF16",
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
