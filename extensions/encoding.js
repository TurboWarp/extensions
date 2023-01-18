(function (Scratch) {
    'use strict';
    const icon = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMzcuNzk1MDYiIGhlaWdodD0iMTM0LjIzNzA3IiB2aWV3Qm94PSIwLDAsMTM3Ljc5NTA2LDEzNC4yMzcwNyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1Mi44OTU4NiwtMTMwLjM3OTg5KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xOTkuMzA5MDgsMjE5LjYyMDExdi03OS4yNDAyMmg4MS4zODE4NHY3OS4yNDAyMnoiLz48cGF0aCBkPSJNMTYyLjg5NTg2LDI1NC42MTY5NnYtNzkuMjQwMjJoODEuMzgxODR2NzkuMjQwMjJ6Ii8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6ODcuMTA0MTQwMTg0NTE2NDQ6NDkuNjIwMTA4MzQwNzA3OTYtLT4=';
    const icon2 = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4MS44ODUzOSIgaGVpZ2h0PSI4MC42MDMwNyIgdmlld0JveD0iMCwwLDgxLjg4NTM5LDgwLjYwMzA3Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTk5LjA1NzMsLTEzOS42OTg0NikiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTI4MC45NDI3LDE4MGMwLDIyLjI1NzkyIC0xOC4zMzA2Nyw0MC4zMDE1NCAtNDAuOTQyNyw0MC4zMDE1NGMtMjIuNjEyMDMsMCAtNDAuOTQyNywtMTguMDQzNjEgLTQwLjk0MjcsLTQwLjMwMTU0YzAsLTIyLjI1NzkyIDE4LjMzMDY3LC00MC4zMDE1NCA0MC45NDI3LC00MC4zMDE1NGMyMi42MTIwMywwIDQwLjk0MjcsMTguMDQzNjEgNDAuOTQyNyw0MC4zMDE1NHoiIGZpbGw9IiM2NDk1ZWQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTIzMS44MTg3NiwxODcuOTc2MDh2LTI4Ljc2NzE1aDI5LjczNDExdjI4Ljc2NzE1eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjYiLz48cGF0aCBkPSJNMjE4LjQ0NzEzLDIwMC43OTEwN3YtMjguNzY3MTVoMjkuNzM0MTF2MjguNzY3MTV6IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNiIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjQwLjk0MjY5NjA1MzgwMTE0OjQwLjMwMTUzNTI2NTQ4NjcwNi0tPg==';

    /*!
     * MD5 function license:
     * Copyright © 2011-2012, Paul Vorbach.
     * Copyright © 2009, Jeff Mott.
     *
     * All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without modification,
     * are permitted provided that the following conditions are met:
     *
     * * Redistributions of source code must retain the above copyright notice, this
     *   list of conditions and the following disclaimer.
     * * Redistributions in binary form must reproduce the above copyright notice, this
     *   list of conditions and the following disclaimer in the documentation and/or
     *   other materials provided with the distribution.
     * * Neither the name Crypto-JS nor the names of its contributors may be used to
     *   endorse or promote products derived from this software without specific prior
     *   written permission.
     *
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
     * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
     * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
     * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
     * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
     * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
     * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
     * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
     * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
     * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     */
    /* eslint-disable */
    var MD5=function(r){function n(o){if(t[o])return t[o].exports;var e=t[o]={i:o,l:!1,exports:{}};return r[o].call(e.exports,e,e.exports,n),e.l=!0,e.exports}var t={};return n.m=r,n.c=t,n.i=function(r){return r},n.d=function(r,t,o){n.o(r,t)||Object.defineProperty(r,t,{configurable:!1,enumerable:!0,get:o})},n.n=function(r){var t=r&&r.__esModule?function(){return r.default}:function(){return r};return n.d(t,"a",t),t},n.o=function(r,n){return Object.prototype.hasOwnProperty.call(r,n)},n.p="",n(n.s=4)}([function(r,n){var t={utf8:{stringToBytes:function(r){return t.bin.stringToBytes(unescape(encodeURIComponent(r)))},bytesToString:function(r){return decodeURIComponent(escape(t.bin.bytesToString(r)))}},bin:{stringToBytes:function(r){for(var n=[],t=0;t<r.length;t++)n.push(255&r.charCodeAt(t));return n},bytesToString:function(r){for(var n=[],t=0;t<r.length;t++)n.push(String.fromCharCode(r[t]));return n.join("")}}};r.exports=t},function(r,n,t){!function(){var n=t(2),o=t(0).utf8,e=t(3),u=t(0).bin,i=function(r,t){r.constructor==String?r=t&&"binary"===t.encoding?u.stringToBytes(r):o.stringToBytes(r):e(r)?r=Array.prototype.slice.call(r,0):Array.isArray(r)||(r=r.toString());for(var f=n.bytesToWords(r),s=8*r.length,c=1732584193,a=-271733879,l=-1732584194,g=271733878,h=0;h<f.length;h++)f[h]=16711935&(f[h]<<8|f[h]>>>24)|4278255360&(f[h]<<24|f[h]>>>8);f[s>>>5]|=128<<s%32,f[14+(s+64>>>9<<4)]=s;for(var p=i._ff,y=i._gg,v=i._hh,d=i._ii,h=0;h<f.length;h+=16){var b=c,T=a,x=l,B=g;c=p(c,a,l,g,f[h+0],7,-680876936),g=p(g,c,a,l,f[h+1],12,-389564586),l=p(l,g,c,a,f[h+2],17,606105819),a=p(a,l,g,c,f[h+3],22,-1044525330),c=p(c,a,l,g,f[h+4],7,-176418897),g=p(g,c,a,l,f[h+5],12,1200080426),l=p(l,g,c,a,f[h+6],17,-1473231341),a=p(a,l,g,c,f[h+7],22,-45705983),c=p(c,a,l,g,f[h+8],7,1770035416),g=p(g,c,a,l,f[h+9],12,-1958414417),l=p(l,g,c,a,f[h+10],17,-42063),a=p(a,l,g,c,f[h+11],22,-1990404162),c=p(c,a,l,g,f[h+12],7,1804603682),g=p(g,c,a,l,f[h+13],12,-40341101),l=p(l,g,c,a,f[h+14],17,-1502002290),a=p(a,l,g,c,f[h+15],22,1236535329),c=y(c,a,l,g,f[h+1],5,-165796510),g=y(g,c,a,l,f[h+6],9,-1069501632),l=y(l,g,c,a,f[h+11],14,643717713),a=y(a,l,g,c,f[h+0],20,-373897302),c=y(c,a,l,g,f[h+5],5,-701558691),g=y(g,c,a,l,f[h+10],9,38016083),l=y(l,g,c,a,f[h+15],14,-660478335),a=y(a,l,g,c,f[h+4],20,-405537848),c=y(c,a,l,g,f[h+9],5,568446438),g=y(g,c,a,l,f[h+14],9,-1019803690),l=y(l,g,c,a,f[h+3],14,-187363961),a=y(a,l,g,c,f[h+8],20,1163531501),c=y(c,a,l,g,f[h+13],5,-1444681467),g=y(g,c,a,l,f[h+2],9,-51403784),l=y(l,g,c,a,f[h+7],14,1735328473),a=y(a,l,g,c,f[h+12],20,-1926607734),c=v(c,a,l,g,f[h+5],4,-378558),g=v(g,c,a,l,f[h+8],11,-2022574463),l=v(l,g,c,a,f[h+11],16,1839030562),a=v(a,l,g,c,f[h+14],23,-35309556),c=v(c,a,l,g,f[h+1],4,-1530992060),g=v(g,c,a,l,f[h+4],11,1272893353),l=v(l,g,c,a,f[h+7],16,-155497632),a=v(a,l,g,c,f[h+10],23,-1094730640),c=v(c,a,l,g,f[h+13],4,681279174),g=v(g,c,a,l,f[h+0],11,-358537222),l=v(l,g,c,a,f[h+3],16,-722521979),a=v(a,l,g,c,f[h+6],23,76029189),c=v(c,a,l,g,f[h+9],4,-640364487),g=v(g,c,a,l,f[h+12],11,-421815835),l=v(l,g,c,a,f[h+15],16,530742520),a=v(a,l,g,c,f[h+2],23,-995338651),c=d(c,a,l,g,f[h+0],6,-198630844),g=d(g,c,a,l,f[h+7],10,1126891415),l=d(l,g,c,a,f[h+14],15,-1416354905),a=d(a,l,g,c,f[h+5],21,-57434055),c=d(c,a,l,g,f[h+12],6,1700485571),g=d(g,c,a,l,f[h+3],10,-1894986606),l=d(l,g,c,a,f[h+10],15,-1051523),a=d(a,l,g,c,f[h+1],21,-2054922799),c=d(c,a,l,g,f[h+8],6,1873313359),g=d(g,c,a,l,f[h+15],10,-30611744),l=d(l,g,c,a,f[h+6],15,-1560198380),a=d(a,l,g,c,f[h+13],21,1309151649),c=d(c,a,l,g,f[h+4],6,-145523070),g=d(g,c,a,l,f[h+11],10,-1120210379),l=d(l,g,c,a,f[h+2],15,718787259),a=d(a,l,g,c,f[h+9],21,-343485551),c=c+b>>>0,a=a+T>>>0,l=l+x>>>0,g=g+B>>>0}return n.endian([c,a,l,g])};i._ff=function(r,n,t,o,e,u,i){var f=r+(n&t|~n&o)+(e>>>0)+i;return(f<<u|f>>>32-u)+n},i._gg=function(r,n,t,o,e,u,i){var f=r+(n&o|t&~o)+(e>>>0)+i;return(f<<u|f>>>32-u)+n},i._hh=function(r,n,t,o,e,u,i){var f=r+(n^t^o)+(e>>>0)+i;return(f<<u|f>>>32-u)+n},i._ii=function(r,n,t,o,e,u,i){var f=r+(t^(n|~o))+(e>>>0)+i;return(f<<u|f>>>32-u)+n},i._blocksize=16,i._digestsize=16,r.exports=function(r,t){if(void 0===r||null===r)throw new Error("Illegal argument "+r);var o=n.wordsToBytes(i(r,t));return t&&t.asBytes?o:t&&t.asString?u.bytesToString(o):n.bytesToHex(o)}}()},function(r,n){!function(){var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",t={rotl:function(r,n){return r<<n|r>>>32-n},rotr:function(r,n){return r<<32-n|r>>>n},endian:function(r){if(r.constructor==Number)return 16711935&t.rotl(r,8)|4278255360&t.rotl(r,24);for(var n=0;n<r.length;n++)r[n]=t.endian(r[n]);return r},randomBytes:function(r){for(var n=[];r>0;r--)n.push(Math.floor(256*Math.random()));return n},bytesToWords:function(r){for(var n=[],t=0,o=0;t<r.length;t++,o+=8)n[o>>>5]|=r[t]<<24-o%32;return n},wordsToBytes:function(r){for(var n=[],t=0;t<32*r.length;t+=8)n.push(r[t>>>5]>>>24-t%32&255);return n},bytesToHex:function(r){for(var n=[],t=0;t<r.length;t++)n.push((r[t]>>>4).toString(16)),n.push((15&r[t]).toString(16));return n.join("")},hexToBytes:function(r){for(var n=[],t=0;t<r.length;t+=2)n.push(parseInt(r.substr(t,2),16));return n},bytesToBase64:function(r){for(var t=[],o=0;o<r.length;o+=3)for(var e=r[o]<<16|r[o+1]<<8|r[o+2],u=0;u<4;u++)8*o+6*u<=8*r.length?t.push(n.charAt(e>>>6*(3-u)&63)):t.push("=");return t.join("")},base64ToBytes:function(r){r=r.replace(/[^A-Z0-9+\/]/gi,"");for(var t=[],o=0,e=0;o<r.length;e=++o%4)0!=e&&t.push((n.indexOf(r.charAt(o-1))&Math.pow(2,-2*e+8)-1)<<2*e|n.indexOf(r.charAt(o))>>>6-2*e);return t}};r.exports=t}()},function(r,n){function t(r){return!!r.constructor&&"function"==typeof r.constructor.isBuffer&&r.constructor.isBuffer(r)}function o(r){return"function"==typeof r.readFloatLE&&"function"==typeof r.slice&&t(r.slice(0,0))}/*!
    * Determine if an object is a Buffer
    *
    * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
    * @license  MIT
    */
    r.exports=function(r){return null!=r&&(t(r)||o(r)||!!r._isBuffer)}},function(r,n,t){r.exports=t(1)}]);
    /* eslint-enable */

    class Encoding {
        constructor () {}
        getInfo() {
            return {
                id: 'Encoding',
                name: 'Encoding',
                color1: '#6495ed',
                color2: '#739fee',
                color3: '#83aaf0',
                menuIconURI: icon2,
                blockIconURI: icon,
                blocks: [
                    {
                        opcode: 'encode',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Encode [string] in [code]',
                        arguments: {
                            string: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'apple'
                            },
                            code: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'encode',
                                defaultValue: 'Base64'
                            }
                        }
                    },
                    {
                        opcode: 'decode',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Decode [string] with [code]',
                        arguments: {
                            string: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'VHVyYm9XYXJw'
                            },
                            code: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'encode',
                                defaultValue: 'Base64'
                            }
                        }
                    },
                    {
                        opcode: 'hash',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Hash [string] with [hash]',
                        arguments: {
                            string: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'apple'
                            },
                            hash: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'hash',
                                defaultValue: 'MD5'
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
                ],
                menus: {
                    Code: {
                        acceptReporters: true,
                        items: ['UNICODE']
                    },
                    encode: {
                        acceptReporters: true,
                        items: ['Base64','URL']
                    },
                    hash: {
                        acceptReporters: true,
                        items: ['MD5']
                    }
                }
            };
        }
        encode(args) {
            switch (args.code) {
                case 'Base64':
                    return btoa(encodeURIComponent(args.string));
                case 'URL':
                    return encodeURIComponent(args.string);
            }
            return '';
        }
        decode(args) {
            switch (args.code) {
                case 'Base64':
                    return decodeURIComponent(atob(args.string));
                case 'URL':
                    return decodeURIComponent(args.string);
            }
            return '';
        }
        hash({ string, hash }) {
            switch (hash) {
                case 'MD5': {
                    return MD5(encodeURIComponent(string));
                }
            }
            return '';
        }
        Conversioncodes(args) {
            switch (args.CodeList) {
                case 'UNICODE':
                    return String(args.string).charCodeAt(0);
            }
            return 0;
        }
        Restorecode(args) {
            switch (args.CodeList) {
                case 'UNICODE':
                    return String.fromCharCode(args.string);
            }
            return '';
        }
        Randomstrings({position}) {
            position = position || 32;
            let t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
            let a = t.length;
            let string = '';
            for (let i = 0; i < position; i++) {
                string += t.charAt(Math.floor(Math.random() * a));
            }
            return string;
        }
        Fontgenerationstring({wordbank,position}) {
            position = position || 32;
            let t = String(wordbank);
            let a = t.length;
            let string = '';
            for (let i = 0; i < position; i++) {
                string += t.charAt(Math.floor(Math.random() * a));
            }
            return string;
        }
    }
    Scratch.extensions.register(new Encoding());
})(Scratch);
