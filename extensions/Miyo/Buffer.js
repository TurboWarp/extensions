// Name: Buffers
// ID: 0znzwBuffers
// Description: Manipulate binary data.
// By: 0znzw <https://scratch.mit.edu/users/0znzw/>
// License: MIT AND LGPL-3.0
(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error(`"Buffers" extension needs to be ran unsandboxed.`);
  }

  // For type checking
  const ArrayBuffer = new Uint8Array().buffer.constructor,
    TypedArray = Uint8Array.prototype.__proto__.constructor;
  // The basic imports
  const { vm, Cast, BlockType, ArgumentType } = Scratch;
  const { runtime } = vm;
  // Extension id
  const extId = "0znzwBuffers";

  // Clamping values
  const clamp = function (num, min, max) {
    return Math.min(Math.max(num, min), max);
  };

  // For swapping between little endian and big endian
  function _swap8(val) {
    return (
      ((val & 0x1) << 7) |
      ((val & 0x2) << 5) |
      ((val & 0x4) << 3) |
      ((val & 0x8) << 1) |
      ((val >> 1) & 0x8) |
      ((val >> 3) & 0x4) |
      ((val >> 5) & 0x2) |
      ((val >> 7) & 0x1)
    );
  }
  function _swap16(val) {
    return ((val & 0xff) << 8) | ((val >> 8) & 0xff);
  }
  function _swap32(val) {
    return (
      ((val & 0xff) << 24) |
      ((val & 0xff00) << 8) |
      ((val >> 8) & 0xff00) |
      ((val >> 24) & 0xff)
    );
  }
  const pcLittleEndian = (() => {
    var arrayBuffer = new ArrayBuffer(2);
    var uint8Array = new Uint8Array(arrayBuffer);
    var uint16array = new Uint16Array(arrayBuffer);
    uint8Array[0] = 0xaa; // set first byte
    uint8Array[1] = 0xbb; // set second byte
    if (uint16array[0] === 0xbbaa) return true;
    if (uint16array[0] === 0xaabb) return false;
    // This should never happen so no need to worry about the error message.
    else throw new Error("What, the, frick-");
  })();

  // Some classes we need later
  const { Buffer, Base64 } = function (window, globalThis) {
    // https://github.com/feross/buffer | Feross Aboukhadijeh <https://feross.org/opensource> | https://nodejs.org/docs/latest-v21.x/api/buffer.html
    // https://github.com/beatgammit/base64-js
    // Licenses: (Buffer: MIT, ieee754: BSD-3-Clause, base64-js: MIT)
    /* eslint-disable */
    // Buffer
    // prettier-ignore
    !function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).Buffer=t()}}((function(){return function t(e,r,n){function i(f,u){if(!r[f]){if(!e[f]){var s="function"==typeof require&&require;if(!u&&s)return s(f,!0);if(o)return o(f,!0);var h=new Error("Cannot find module '"+f+"'");throw h.code="MODULE_NOT_FOUND",h}var a=r[f]={exports:{}};e[f][0].call(a.exports,(function(t){return i(e[f][1][t]||t)}),a,a.exports,t,e,r,n)}return r[f].exports}for(var o="function"==typeof require&&require,f=0;f<n.length;f++)i(n[f]);return i}({1:[function(t,e,r){"use strict";r.byteLength=function(t){var e=s(t),r=e[0],n=e[1];return 3*(r+n)/4-n},r.toByteArray=function(t){var e,r,n=s(t),f=n[0],u=n[1],h=new o(function(t,e,r){return 3*(e+r)/4-r}(0,f,u)),a=0,c=u>0?f-4:f;for(r=0;r<c;r+=4)e=i[t.charCodeAt(r)]<<18|i[t.charCodeAt(r+1)]<<12|i[t.charCodeAt(r+2)]<<6|i[t.charCodeAt(r+3)],h[a++]=e>>16&255,h[a++]=e>>8&255,h[a++]=255&e;2===u&&(e=i[t.charCodeAt(r)]<<2|i[t.charCodeAt(r+1)]>>4,h[a++]=255&e);1===u&&(e=i[t.charCodeAt(r)]<<10|i[t.charCodeAt(r+1)]<<4|i[t.charCodeAt(r+2)]>>2,h[a++]=e>>8&255,h[a++]=255&e);return h},r.fromByteArray=function(t){for(var e,r=t.length,i=r%3,o=[],f=16383,u=0,s=r-i;u<s;u+=f)o.push(h(t,u,u+f>s?s:u+f));1===i?(e=t[r-1],o.push(n[e>>2]+n[e<<4&63]+"==")):2===i&&(e=(t[r-2]<<8)+t[r-1],o.push(n[e>>10]+n[e>>4&63]+n[e<<2&63]+"="));return o.join("")};for(var n=[],i=[],o="undefined"!=typeof Uint8Array?Uint8Array:Array,f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",u=0;u<64;++u)n[u]=f[u],i[f.charCodeAt(u)]=u;function s(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var r=t.indexOf("=");return-1===r&&(r=e),[r,r===e?0:4-r%4]}function h(t,e,r){for(var i,o,f=[],u=e;u<r;u+=3)i=(t[u]<<16&16711680)+(t[u+1]<<8&65280)+(255&t[u+2]),f.push(n[(o=i)>>18&63]+n[o>>12&63]+n[o>>6&63]+n[63&o]);return f.join("")}i["-".charCodeAt(0)]=62,i["_".charCodeAt(0)]=63},{}],2:[function(t,e,r){(function(e){(function(){
    // prettier-ignore
    "use strict";var e=t("base64-js"),n=t("ieee754");r.Buffer=f,r.SlowBuffer=function(t){+t!=t&&(t=0);return f.alloc(+t)},r.INSPECT_MAX_BYTES=50;var i=2147483647;function o(t){if(t>i)throw new RangeError('The value "'+t+'" is invalid for option "size"');var e=new Uint8Array(t);return e.__proto__=f.prototype,e}function f(t,e,r){if("number"==typeof t){if("string"==typeof e)throw new TypeError('The "string" argument must be of type string. Received type number');return h(t)}return u(t,e,r)}function u(t,e,r){if("string"==typeof t)return function(t,e){"string"==typeof e&&""!==e||(e="utf8");if(!f.isEncoding(e))throw new TypeError("Unknown encoding: "+e);var r=0|p(t,e),n=o(r),i=n.write(t,e);i!==r&&(n=n.slice(0,i));return n}(t,e);if(ArrayBuffer.isView(t))return a(t);if(null==t)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(F(t,ArrayBuffer)||t&&F(t.buffer,ArrayBuffer))return function(t,e,r){if(e<0||t.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(r||0))throw new RangeError('"length" is outside of buffer bounds');var n;n=e===undefined&&r===undefined?new Uint8Array(t):r===undefined?new Uint8Array(t,e):new Uint8Array(t,e,r);return n.__proto__=f.prototype,n}(t,e,r);if("number"==typeof t)throw new TypeError('The "value" argument must not be of type number. Received type number');var n=t.valueOf&&t.valueOf();if(null!=n&&n!==t)return f.from(n,e,r);var i=function(t){if(f.isBuffer(t)){var e=0|c(t.length),r=o(e);return 0===r.length||t.copy(r,0,0,e),r}if(t.length!==undefined)return"number"!=typeof t.length||z(t.length)?o(0):a(t);if("Buffer"===t.type&&Array.isArray(t.data))return a(t.data)}(t);if(i)return i;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof t[Symbol.toPrimitive])return f.from(t[Symbol.toPrimitive]("string"),e,r);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}function s(t){if("number"!=typeof t)throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function h(t){return s(t),o(t<0?0:0|c(t))}function a(t){for(var e=t.length<0?0:0|c(t.length),r=o(e),n=0;n<e;n+=1)r[n]=255&t[n];return r}function c(t){if(t>=i)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+i.toString(16)+" bytes");return 0|t}function p(t,e){if(f.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||F(t,ArrayBuffer))return t.byteLength;if("string"!=typeof t)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);var r=t.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===r)return 0;for(var i=!1;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return N(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return $(t).length;default:if(i)return n?-1:N(t).length;e=(""+e).toLowerCase(),i=!0}}function l(t,e,r){var n=!1;if((e===undefined||e<0)&&(e=0),e>this.length)return"";if((r===undefined||r>this.length)&&(r=this.length),r<=0)return"";if((r>>>=0)<=(e>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return _(this,e,r);case"utf8":case"utf-8":return I(this,e,r);case"ascii":return T(this,e,r);case"latin1":case"binary":return R(this,e,r);case"base64":return v(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return S(this,e,r);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}function y(t,e,r){var n=t[e];t[e]=t[r],t[r]=n}function g(t,e,r,n,i){if(0===t.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),z(r=+r)&&(r=i?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(i)return-1;r=t.length-1}else if(r<0){if(!i)return-1;r=0}if("string"==typeof e&&(e=f.from(e,n)),f.isBuffer(e))return 0===e.length?-1:d(t,e,r,n,i);if("number"==typeof e)return e&=255,"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):d(t,[e],r,n,i);throw new TypeError("val must be string, number or Buffer")}function d(t,e,r,n,i){var o,f=1,u=t.length,s=e.length;if(n!==undefined&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||e.length<2)return-1;f=2,u/=2,s/=2,r/=2}function h(t,e){return 1===f?t[e]:t.readUInt16BE(e*f)}if(i){var a=-1;for(o=r;o<u;o++)if(h(t,o)===h(e,-1===a?0:o-a)){if(-1===a&&(a=o),o-a+1===s)return a*f}else-1!==a&&(o-=o-a),a=-1}else for(r+s>u&&(r=u-s),o=r;o>=0;o--){for(var c=!0,p=0;p<s;p++)if(h(t,o+p)!==h(e,p)){c=!1;break}if(c)return o}return-1}function w(t,e,r,n){r=Number(r)||0;var i=t.length-r;n?(n=Number(n))>i&&(n=i):n=i;var o=e.length;n>o/2&&(n=o/2);for(var f=0;f<n;++f){var u=parseInt(e.substr(2*f,2),16);if(z(u))return f;t[r+f]=u}return f}function b(t,e,r,n){return j(N(e,t.length-r),t,r,n)}function E(t,e,r,n){return j(function(t){for(var e=[],r=0;r<t.length;++r)e.push(255&t.charCodeAt(r));return e}(e),t,r,n)}function m(t,e,r,n){return E(t,e,r,n)}function B(t,e,r,n){return j($(e),t,r,n)}function A(t,e,r,n){return j(function(t,e){for(var r,n,i,o=[],f=0;f<t.length&&!((e-=2)<0);++f)n=(r=t.charCodeAt(f))>>8,i=r%256,o.push(i),o.push(n);return o}(e,t.length-r),t,r,n)}function v(t,r,n){return 0===r&&n===t.length?e.fromByteArray(t):e.fromByteArray(t.slice(r,n))}function I(t,e,r){r=Math.min(t.length,r);for(var n=[],i=e;i<r;){var o,f,u,s,h=t[i],a=null,c=h>239?4:h>223?3:h>191?2:1;if(i+c<=r)switch(c){case 1:h<128&&(a=h);break;case 2:128==(192&(o=t[i+1]))&&(s=(31&h)<<6|63&o)>127&&(a=s);break;case 3:o=t[i+1],f=t[i+2],128==(192&o)&&128==(192&f)&&(s=(15&h)<<12|(63&o)<<6|63&f)>2047&&(s<55296||s>57343)&&(a=s);break;case 4:o=t[i+1],f=t[i+2],u=t[i+3],128==(192&o)&&128==(192&f)&&128==(192&u)&&(s=(15&h)<<18|(63&o)<<12|(63&f)<<6|63&u)>65535&&s<1114112&&(a=s)}null===a?(a=65533,c=1):a>65535&&(a-=65536,n.push(a>>>10&1023|55296),a=56320|1023&a),n.push(a),i+=c}return function(t){var e=t.length;if(e<=U)return String.fromCharCode.apply(String,t);var r="",n=0;for(;n<e;)r+=String.fromCharCode.apply(String,t.slice(n,n+=U));return r}(n)}r.kMaxLength=i,f.TYPED_ARRAY_SUPPORT=function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()}catch(e){return!1}}(),f.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(f.prototype,"parent",{enumerable:!0,get:function(){return f.isBuffer(this)?this.buffer:undefined}}),Object.defineProperty(f.prototype,"offset",{enumerable:!0,get:function(){return f.isBuffer(this)?this.byteOffset:undefined}}),"undefined"!=typeof Symbol&&null!=Symbol.species&&f[Symbol.species]===f&&Object.defineProperty(f,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1}),f.poolSize=8192,f.from=function(t,e,r){return u(t,e,r)},f.prototype.__proto__=Uint8Array.prototype,f.__proto__=Uint8Array,f.alloc=function(t,e,r){return function(t,e,r){return s(t),t<=0?o(t):e!==undefined?"string"==typeof r?o(t).fill(e,r):o(t).fill(e):o(t)}(t,e,r)},f.allocUnsafe=function(t){return h(t)},f.allocUnsafeSlow=function(t){return h(t)},f.isBuffer=function(t){return null!=t&&!0===t._isBuffer&&t!==f.prototype},f.compare=function(t,e){if(F(t,Uint8Array)&&(t=f.from(t,t.offset,t.byteLength)),F(e,Uint8Array)&&(e=f.from(e,e.offset,e.byteLength)),!f.isBuffer(t)||!f.isBuffer(e))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===e)return 0;for(var r=t.length,n=e.length,i=0,o=Math.min(r,n);i<o;++i)if(t[i]!==e[i]){r=t[i],n=e[i];break}return r<n?-1:n<r?1:0},f.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},f.concat=function(t,e){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return f.alloc(0);var r;if(e===undefined)for(e=0,r=0;r<t.length;++r)e+=t[r].length;var n=f.allocUnsafe(e),i=0;for(r=0;r<t.length;++r){var o=t[r];if(F(o,Uint8Array)&&(o=f.from(o)),!f.isBuffer(o))throw new TypeError('"list" argument must be an Array of Buffers');o.copy(n,i),i+=o.length}return n},f.byteLength=p,f.prototype._isBuffer=!0,f.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var e=0;e<t;e+=2)y(this,e,e+1);return this},f.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var e=0;e<t;e+=4)y(this,e,e+3),y(this,e+1,e+2);return this},f.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var e=0;e<t;e+=8)y(this,e,e+7),y(this,e+1,e+6),y(this,e+2,e+5),y(this,e+3,e+4);return this},f.prototype.toString=function(){var t=this.length;return 0===t?"":0===arguments.length?I(this,0,t):l.apply(this,arguments)},f.prototype.toLocaleString=f.prototype.toString,f.prototype.equals=function(t){if(!f.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===f.compare(this,t)},f.prototype.inspect=function(){var t="",e=r.INSPECT_MAX_BYTES;return t=this.toString("hex",0,e).replace(/(.{2})/g,"$1 ").trim(),this.length>e&&(t+=" ... "),"<Buffer "+t+">"},f.prototype.compare=function(t,e,r,n,i){if(F(t,Uint8Array)&&(t=f.from(t,t.offset,t.byteLength)),!f.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(e===undefined&&(e=0),r===undefined&&(r=t?t.length:0),n===undefined&&(n=0),i===undefined&&(i=this.length),e<0||r>t.length||n<0||i>this.length)throw new RangeError("out of range index");if(n>=i&&e>=r)return 0;if(n>=i)return-1;if(e>=r)return 1;if(this===t)return 0;for(var o=(i>>>=0)-(n>>>=0),u=(r>>>=0)-(e>>>=0),s=Math.min(o,u),h=this.slice(n,i),a=t.slice(e,r),c=0;c<s;++c)if(h[c]!==a[c]){o=h[c],u=a[c];break}return o<u?-1:u<o?1:0},f.prototype.includes=function(t,e,r){return-1!==this.indexOf(t,e,r)},f.prototype.indexOf=function(t,e,r){return g(this,t,e,r,!0)},f.prototype.lastIndexOf=function(t,e,r){return g(this,t,e,r,!1)},f.prototype.write=function(t,e,r,n){if(e===undefined)n="utf8",r=this.length,e=0;else if(r===undefined&&"string"==typeof e)n=e,r=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e>>>=0,isFinite(r)?(r>>>=0,n===undefined&&(n="utf8")):(n=r,r=undefined)}var i=this.length-e;if((r===undefined||r>i)&&(r=i),t.length>0&&(r<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var o=!1;;)switch(n){case"hex":return w(this,t,e,r);case"utf8":case"utf-8":return b(this,t,e,r);case"ascii":return E(this,t,e,r);case"latin1":case"binary":return m(this,t,e,r);case"base64":return B(this,t,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return A(this,t,e,r);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0}},f.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var U=4096;function T(t,e,r){var n="";r=Math.min(t.length,r);for(var i=e;i<r;++i)n+=String.fromCharCode(127&t[i]);return n}function R(t,e,r){var n="";r=Math.min(t.length,r);for(var i=e;i<r;++i)n+=String.fromCharCode(t[i]);return n}function _(t,e,r){var n=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>n)&&(r=n);for(var i="",o=e;o<r;++o)i+=P(t[o]);return i}function S(t,e,r){for(var n=t.slice(e,r),i="",o=0;o<n.length;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}function L(t,e,r){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}function O(t,e,r,n,i,o){if(!f.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>i||e<o)throw new RangeError('"value" argument is out of bounds');if(r+n>t.length)throw new RangeError("Index out of range")}function x(t,e,r,n,i,o){if(r+n>t.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function C(t,e,r,i,o){return e=+e,r>>>=0,o||x(t,0,r,4),n.write(t,e,r,i,23,4),r+4}function M(t,e,r,i,o){return e=+e,r>>>=0,o||x(t,0,r,8),n.write(t,e,r,i,52,8),r+8}f.prototype.slice=function(t,e){var r=this.length;(t=~~t)<0?(t+=r)<0&&(t=0):t>r&&(t=r),(e=e===undefined?r:~~e)<0?(e+=r)<0&&(e=0):e>r&&(e=r),e<t&&(e=t);var n=this.subarray(t,e);return n.__proto__=f.prototype,n},f.prototype.readUIntLE=function(t,e,r){t>>>=0,e>>>=0,r||L(t,e,this.length);for(var n=this[t],i=1,o=0;++o<e&&(i*=256);)n+=this[t+o]*i;return n},f.prototype.readUIntBE=function(t,e,r){t>>>=0,e>>>=0,r||L(t,e,this.length);for(var n=this[t+--e],i=1;e>0&&(i*=256);)n+=this[t+--e]*i;return n},f.prototype.readUInt8=function(t,e){return t>>>=0,e||L(t,1,this.length),this[t]},f.prototype.readUInt16LE=function(t,e){return t>>>=0,e||L(t,2,this.length),this[t]|this[t+1]<<8},f.prototype.readUInt16BE=function(t,e){return t>>>=0,e||L(t,2,this.length),this[t]<<8|this[t+1]},f.prototype.readUInt32LE=function(t,e){return t>>>=0,e||L(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},f.prototype.readUInt32BE=function(t,e){return t>>>=0,e||L(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},f.prototype.readIntLE=function(t,e,r){t>>>=0,e>>>=0,r||L(t,e,this.length);for(var n=this[t],i=1,o=0;++o<e&&(i*=256);)n+=this[t+o]*i;return n>=(i*=128)&&(n-=Math.pow(2,8*e)),n},f.prototype.readIntBE=function(t,e,r){t>>>=0,e>>>=0,r||L(t,e,this.length);for(var n=e,i=1,o=this[t+--n];n>0&&(i*=256);)o+=this[t+--n]*i;return o>=(i*=128)&&(o-=Math.pow(2,8*e)),o},f.prototype.readInt8=function(t,e){return t>>>=0,e||L(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},f.prototype.readInt16LE=function(t,e){t>>>=0,e||L(t,2,this.length);var r=this[t]|this[t+1]<<8;return 32768&r?4294901760|r:r},f.prototype.readInt16BE=function(t,e){t>>>=0,e||L(t,2,this.length);var r=this[t+1]|this[t]<<8;return 32768&r?4294901760|r:r},f.prototype.readInt32LE=function(t,e){return t>>>=0,e||L(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},f.prototype.readInt32BE=function(t,e){return t>>>=0,e||L(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},f.prototype.readFloatLE=function(t,e){return t>>>=0,e||L(t,4,this.length),n.read(this,t,!0,23,4)},f.prototype.readFloatBE=function(t,e){return t>>>=0,e||L(t,4,this.length),n.read(this,t,!1,23,4)},f.prototype.readDoubleLE=function(t,e){return t>>>=0,e||L(t,8,this.length),n.read(this,t,!0,52,8)},f.prototype.readDoubleBE=function(t,e){return t>>>=0,e||L(t,8,this.length),n.read(this,t,!1,52,8)},f.prototype.writeUIntLE=function(t,e,r,n){(t=+t,e>>>=0,r>>>=0,n)||O(this,t,e,r,Math.pow(2,8*r)-1,0);var i=1,o=0;for(this[e]=255&t;++o<r&&(i*=256);)this[e+o]=t/i&255;return e+r},f.prototype.writeUIntBE=function(t,e,r,n){(t=+t,e>>>=0,r>>>=0,n)||O(this,t,e,r,Math.pow(2,8*r)-1,0);var i=r-1,o=1;for(this[e+i]=255&t;--i>=0&&(o*=256);)this[e+i]=t/o&255;return e+r},f.prototype.writeUInt8=function(t,e,r){return t=+t,e>>>=0,r||O(this,t,e,1,255,0),this[e]=255&t,e+1},f.prototype.writeUInt16LE=function(t,e,r){return t=+t,e>>>=0,r||O(this,t,e,2,65535,0),this[e]=255&t,this[e+1]=t>>>8,e+2},f.prototype.writeUInt16BE=function(t,e,r){return t=+t,e>>>=0,r||O(this,t,e,2,65535,0),this[e]=t>>>8,this[e+1]=255&t,e+2},f.prototype.writeUInt32LE=function(t,e,r){return t=+t,e>>>=0,r||O(this,t,e,4,4294967295,0),this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t,e+4},f.prototype.writeUInt32BE=function(t,e,r){return t=+t,e>>>=0,r||O(this,t,e,4,4294967295,0),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},f.prototype.writeIntLE=function(t,e,r,n){if(t=+t,e>>>=0,!n){var i=Math.pow(2,8*r-1);O(this,t,e,r,i-1,-i)}var o=0,f=1,u=0;for(this[e]=255&t;++o<r&&(f*=256);)t<0&&0===u&&0!==this[e+o-1]&&(u=1),this[e+o]=(t/f>>0)-u&255;return e+r},f.prototype.writeIntBE=function(t,e,r,n){if(t=+t,e>>>=0,!n){var i=Math.pow(2,8*r-1);O(this,t,e,r,i-1,-i)}var o=r-1,f=1,u=0;for(this[e+o]=255&t;--o>=0&&(f*=256);)t<0&&0===u&&0!==this[e+o+1]&&(u=1),this[e+o]=(t/f>>0)-u&255;return e+r},f.prototype.writeInt8=function(t,e,r){return t=+t,e>>>=0,r||O(this,t,e,1,127,-128),t<0&&(t=255+t+1),this[e]=255&t,e+1},f.prototype.writeInt16LE=function(t,e,r){return t=+t,e>>>=0,r||O(this,t,e,2,32767,-32768),this[e]=255&t,this[e+1]=t>>>8,e+2},f.prototype.writeInt16BE=function(t,e,r){return t=+t,e>>>=0,r||O(this,t,e,2,32767,-32768),this[e]=t>>>8,this[e+1]=255&t,e+2},f.prototype.writeInt32LE=function(t,e,r){return t=+t,e>>>=0,r||O(this,t,e,4,2147483647,-2147483648),this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24,e+4},f.prototype.writeInt32BE=function(t,e,r){return t=+t,e>>>=0,r||O(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},f.prototype.writeFloatLE=function(t,e,r){return C(this,t,e,!0,r)},f.prototype.writeFloatBE=function(t,e,r){return C(this,t,e,!1,r)},f.prototype.writeDoubleLE=function(t,e,r){return M(this,t,e,!0,r)},f.prototype.writeDoubleBE=function(t,e,r){return M(this,t,e,!1,r)},f.prototype.copy=function(t,e,r,n){if(!f.isBuffer(t))throw new TypeError("argument should be a Buffer");if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);var i=n-r;if(this===t&&"function"==typeof Uint8Array.prototype.copyWithin)this.copyWithin(e,r,n);else if(this===t&&r<e&&e<n)for(var o=i-1;o>=0;--o)t[o+e]=this[o+r];else Uint8Array.prototype.set.call(t,this.subarray(r,n),e);return i},f.prototype.fill=function(t,e,r,n){if("string"==typeof t){if("string"==typeof e?(n=e,e=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),n!==undefined&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!f.isEncoding(n))throw new TypeError("Unknown encoding: "+n);if(1===t.length){var i=t.charCodeAt(0);("utf8"===n&&i<128||"latin1"===n)&&(t=i)}}else"number"==typeof t&&(t&=255);if(e<0||this.length<e||this.length<r)throw new RangeError("Out of range index");if(r<=e)return this;var o;if(e>>>=0,r=r===undefined?this.length:r>>>0,t||(t=0),"number"==typeof t)for(o=e;o<r;++o)this[o]=t;else{var u=f.isBuffer(t)?t:f.from(t,n),s=u.length;if(0===s)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(o=0;o<r-e;++o)this[o+e]=u[o%s]}return this};var k=/[^+/0-9A-Za-z-_]/g;function P(t){return t<16?"0"+t.toString(16):t.toString(16)}function N(t,e){var r;e=e||Infinity;for(var n=t.length,i=null,o=[],f=0;f<n;++f){if((r=t.charCodeAt(f))>55295&&r<57344){if(!i){if(r>56319){(e-=3)>-1&&o.push(239,191,189);continue}if(f+1===n){(e-=3)>-1&&o.push(239,191,189);continue}i=r;continue}if(r<56320){(e-=3)>-1&&o.push(239,191,189),i=r;continue}r=65536+(i-55296<<10|r-56320)}else i&&(e-=3)>-1&&o.push(239,191,189);if(i=null,r<128){if((e-=1)<0)break;o.push(r)}else if(r<2048){if((e-=2)<0)break;o.push(r>>6|192,63&r|128)}else if(r<65536){if((e-=3)<0)break;o.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;o.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return o}function $(t){return e.toByteArray(function(t){if((t=(t=t.split("=")[0]).trim().replace(k,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function j(t,e,r,n){for(var i=0;i<n&&!(i+r>=e.length||i>=t.length);++i)e[i+r]=t[i];return i}function F(t,e){return t instanceof e||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===e.name}function z(t){return t!=t}}).call(this)}).call(this,t("buffer").Buffer)},{"base64-js":1,buffer:2,ieee754:3}],3:[function(t,e,r){
    // prettier-ignore
    r.read=function(t,e,r,n,i){var o,f,u=8*i-n-1,s=(1<<u)-1,h=s>>1,a=-7,c=r?i-1:0,p=r?-1:1,l=t[e+c];for(c+=p,o=l&(1<<-a)-1,l>>=-a,a+=u;a>0;o=256*o+t[e+c],c+=p,a-=8);for(f=o&(1<<-a)-1,o>>=-a,a+=n;a>0;f=256*f+t[e+c],c+=p,a-=8);if(0===o)o=1-h;else{if(o===s)return f?NaN:(l?-1:1)*Infinity;f+=Math.pow(2,n),o-=h}return(l?-1:1)*f*Math.pow(2,o-n)},r.write=function(t,e,r,n,i,o){var f,u,s,h=8*o-i-1,a=(1<<h)-1,c=a>>1,p=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,l=n?0:o-1,y=n?1:-1,g=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===Infinity?(u=isNaN(e)?1:0,f=a):(f=Math.floor(Math.log(e)/Math.LN2),e*(s=Math.pow(2,-f))<1&&(f--,s*=2),(e+=f+c>=1?p/s:p*Math.pow(2,1-c))*s>=2&&(f++,s/=2),f+c>=a?(u=0,f=a):f+c>=1?(u=(e*s-1)*Math.pow(2,i),f+=c):(u=e*Math.pow(2,c-1)*Math.pow(2,i),f=0));i>=8;t[r+l]=255&u,l+=y,u/=256,i-=8);for(f=f<<i|u,h+=i;h>0;t[r+l]=255&f,l+=y,f/=256,h-=8);t[r+l-y]|=128*g}},{}],4:[function(t,e,r){(function(e){(function(){
    // prettier-ignore
    "use strict";const e=t("base64-js"),n=t("ieee754"),i="function"==typeof Symbol&&"function"==typeof Symbol["for"]?Symbol["for"]("nodejs.util.inspect.custom"):null;r.Buffer=s,r.SlowBuffer=function(t){+t!=t&&(t=0);return s.alloc(+t)},r.INSPECT_MAX_BYTES=50;const o=2147483647;r.kMaxLength=o;const f=268435440;function u(t){if(t>o)throw new RangeError('The value "'+t+'" is invalid for option "size"');const e=new Uint8Array(t);return Object.setPrototypeOf(e,s.prototype),e}function s(t,e,r){if("number"==typeof t){if("string"==typeof e)throw new TypeError('The "string" argument must be of type string. Received type number');return c(t)}return h(t,e,r)}function h(t,e,r){if("string"==typeof t)return function(t,e){"string"==typeof e&&""!==e||(e="utf8");if(!s.isEncoding(e))throw new TypeError("Unknown encoding: "+e);const r=0|g(t,e);let n=u(r);const i=n.write(t,e);i!==r&&(n=n.slice(0,i));return n}(t,e);if(ArrayBuffer.isView(t))return function(t){if(H(t,Uint8Array)){const e=new Uint8Array(t);return l(e.buffer,e.byteOffset,e.byteLength)}return p(t)}(t);if(null==t)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(H(t,ArrayBuffer)||t&&H(t.buffer,ArrayBuffer))return l(t,e,r);if("undefined"!=typeof SharedArrayBuffer&&(H(t,SharedArrayBuffer)||t&&H(t.buffer,SharedArrayBuffer)))return l(t,e,r);if("number"==typeof t)throw new TypeError('The "value" argument must not be of type number. Received type number');const n=t.valueOf&&t.valueOf();if(null!=n&&n!==t)return s.from(n,e,r);const i=function(t){if(s.isBuffer(t)){const e=0|y(t.length),r=u(e);return 0===r.length||t.copy(r,0,0,e),r}if(t.length!==undefined)return"number"!=typeof t.length||J(t.length)?u(0):p(t);if("Buffer"===t.type&&Array.isArray(t.data))return p(t.data)}(t);if(i)return i;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof t[Symbol.toPrimitive])return s.from(t[Symbol.toPrimitive]("string"),e,r);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}function a(t){if("number"!=typeof t)throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function c(t){return a(t),u(t<0?0:0|y(t))}function p(t){const e=t.length<0?0:0|y(t.length),r=u(e);for(let n=0;n<e;n+=1)r[n]=255&t[n];return r}function l(t,e,r){if(e<0||t.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(r||0))throw new RangeError('"length" is outside of buffer bounds');let n;return n=e===undefined&&r===undefined?new Uint8Array(t):r===undefined?new Uint8Array(t,e):new Uint8Array(t,e,r),Object.setPrototypeOf(n,s.prototype),n}function y(t){if(t>=o)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+o.toString(16)+" bytes");return 0|t}function g(t,e){if(ArrayBuffer.isView(t)||H(t,ArrayBuffer))return t.byteLength;if("undefined"!=typeof SharedArrayBuffer&&H(t,SharedArrayBuffer))return t.byteLength;if("string"!=typeof t)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);const r=t.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===r)return 0;let i=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return V(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return X(t).length;default:if(i)return n?-1:V(t).length;e=(""+e).toLowerCase(),i=!0}}function d(t,e,r){let n=!1;if((e===undefined||e<0)&&(e=0),e>this.length)return"";if((r===undefined||r>this.length)&&(r=this.length),r<=0)return"";if((r>>>=0)<=(e>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return L(this,e,r);case"utf8":case"utf-8":return T(this,e,r);case"ascii":return _(this,e,r);case"latin1":case"binary":return S(this,e,r);case"base64":return U(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return O(this,e,r);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}function w(t,e,r){const n=t[e];t[e]=t[r],t[r]=n}function b(t,e,r,n,i){if(0===t.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),J(r=+r)&&(r=i?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(i)return-1;r=t.length-1}else if(r<0){if(!i)return-1;r=0}if("string"==typeof e&&(e=s.from(e,n)),s.isBuffer(e))return 0===e.length?-1:E(t,e,r,n,i);if("number"==typeof e)return e&=255,"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):E(t,[e],r,n,i);throw new TypeError("val must be string, number or Buffer")}function E(t,e,r,n,i){let o,f=1,u=t.length,s=e.length;if(n!==undefined&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||e.length<2)return-1;f=2,u/=2,s/=2,r/=2}function h(t,e){return 1===f?t[e]:t.readUInt16BE(e*f)}if(i){let n=-1;for(o=r;o<u;o++)if(h(t,o)===h(e,-1===n?0:o-n)){if(-1===n&&(n=o),o-n+1===s)return n*f}else-1!==n&&(o-=o-n),n=-1}else for(r+s>u&&(r=u-s),o=r;o>=0;o--){let r=!0;for(let n=0;n<s;n++)if(h(t,o+n)!==h(e,n)){r=!1;break}if(r)return o}return-1}function m(t,e,r,n){r=Number(r)||0;const i=t.length-r;n?(n=Number(n))>i&&(n=i):n=i;const o=e.length;n>o>>>1&&(n=o>>>1);for(let i=0;i<n;++i){const n=e.charCodeAt(2*i+0),o=e.charCodeAt(2*i+1),f=K[127&n],u=K[127&o];if(-128&(n|o|f|u))return i;t[r+i]=f<<4|u}return n}function B(t,e,r,n){return W(V(e,t.length-r),t,r,n)}function A(t,e,r,n){return W(function(t){const e=[];for(let r=0;r<t.length;++r)e.push(255&t.charCodeAt(r));return e}(e),t,r,n)}function v(t,e,r,n){return W(X(e),t,r,n)}function I(t,e,r,n){return W(function(t,e){let r,n,i;const o=[];for(let f=0;f<t.length&&!((e-=2)<0);++f)r=t.charCodeAt(f),n=r>>8,i=r%256,o.push(i),o.push(n);return o}(e,t.length-r),t,r,n)}function U(t,r,n){return 0===r&&n===t.length?e.fromByteArray(t):e.fromByteArray(t.slice(r,n))}function T(t,e,r){r=Math.min(t.length,r);const n=[];let i=e;for(;i<r;){const e=t[i];let o=null,f=e>239?4:e>223?3:e>191?2:1;if(i+f<=r){let r,n,u,s;switch(f){case 1:e<128&&(o=e);break;case 2:r=t[i+1],128==(192&r)&&(s=(31&e)<<6|63&r,s>127&&(o=s));break;case 3:r=t[i+1],n=t[i+2],128==(192&r)&&128==(192&n)&&(s=(15&e)<<12|(63&r)<<6|63&n,s>2047&&(s<55296||s>57343)&&(o=s));break;case 4:r=t[i+1],n=t[i+2],u=t[i+3],128==(192&r)&&128==(192&n)&&128==(192&u)&&(s=(15&e)<<18|(63&r)<<12|(63&n)<<6|63&u,s>65535&&s<1114112&&(o=s))}}null===o?(o=65533,f=1):o>65535&&(o-=65536,n.push(o>>>10&1023|55296),o=56320|1023&o),n.push(o),i+=f}return function(t){const e=t.length;if(e<=R)return String.fromCharCode.apply(String,t);let r="",n=0;for(;n<e;)r+=String.fromCharCode.apply(String,t.slice(n,n+=R));return r}(n)}r.kStringMaxLength=f,r.constants={MAX_LENGTH:o,MAX_STRING_LENGTH:f},r.Blob="undefined"!=typeof Blob?Blob:undefined,r.File="undefined"!=typeof File?File:undefined,r.atob="undefined"!=typeof atob?atob:undefined,r.btoa="undefined"!=typeof btoa?btoa:undefined,s.TYPED_ARRAY_SUPPORT=function(){try{const t=new Uint8Array(1),e={foo:function(){return 42}};return Object.setPrototypeOf(e,Uint8Array.prototype),Object.setPrototypeOf(t,e),42===t.foo()}catch(t){return!1}}(),s.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(s.prototype,"parent",{enumerable:!0,get:function(){return s.isBuffer(this)?this.buffer:undefined}}),Object.defineProperty(s.prototype,"offset",{enumerable:!0,get:function(){return s.isBuffer(this)?this.byteOffset:undefined}}),s.poolSize=8192,s.from=function(t,e,r){return h(t,e,r)},Object.setPrototypeOf(s.prototype,Uint8Array.prototype),Object.setPrototypeOf(s,Uint8Array),s.alloc=function(t,e,r){return function(t,e,r){return a(t),t<=0?u(t):e!==undefined?"string"==typeof r?u(t).fill(e,r):u(t).fill(e):u(t)}(t,e,r)},s.allocUnsafe=function(t){return c(t)},s.allocUnsafeSlow=function(t){return c(t)},s.isBuffer=function(t){return null!=t&&!0===t._isBuffer&&t!==s.prototype},s.compare=function(t,e){if(!H(t,Uint8Array)||!H(e,Uint8Array))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===e)return 0;let r=t.length,n=e.length;for(let i=0,o=Math.min(r,n);i<o;++i)if(t[i]!==e[i]){r=t[i],n=e[i];break}return r<n?-1:n<r?1:0},s.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},s.concat=function(t,e){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return s.alloc(0);let r;if(e===undefined)for(e=0,r=0;r<t.length;++r)e+=t[r].length;const n=s.allocUnsafe(e);let i=0;for(r=0;r<t.length;++r){const e=t[r];if(!H(e,Uint8Array))throw new TypeError('"list" argument must be an Array of Buffers');if(i+e.length>n.length){n.set(e.subarray(0,n.length-i),i);break}n.set(e,i),i+=e.length}return n},s.byteLength=g,s.prototype._isBuffer=!0,s.prototype.swap16=function(){const t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let e=0;e<t;e+=2)w(this,e,e+1);return this},s.prototype.swap32=function(){const t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let e=0;e<t;e+=4)w(this,e,e+3),w(this,e+1,e+2);return this},s.prototype.swap64=function(){const t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let e=0;e<t;e+=8)w(this,e,e+7),w(this,e+1,e+6),w(this,e+2,e+5),w(this,e+3,e+4);return this},s.prototype.toString=function(){const t=this.length;return 0===t?"":0===arguments.length?T(this,0,t):d.apply(this,arguments)},s.prototype.toLocaleString=s.prototype.toString,s.prototype.equals=function(t){return this===t||0===s.compare(this,t)},s.prototype.inspect=function(){let t="";const e=r.INSPECT_MAX_BYTES;return t=this.toString("hex",0,e).replace(/(.{2})/g,"$1 ").trim(),this.length>e&&(t+=" ... "),"<Buffer "+t+">"},i&&(s.prototype[i]=s.prototype.inspect),s.prototype.compare=function(t,e,r,n,i){if(!H(t,Uint8Array))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(e===undefined&&(e=0),r===undefined&&(r=t?t.length:0),n===undefined&&(n=0),i===undefined&&(i=this.length),e<0||r>t.length||n<0||i>this.length)throw new RangeError("out of range index");if(n>=i&&e>=r)return 0;if(n>=i)return-1;if(e>=r)return 1;if(this===t)return 0;let o=(i>>>=0)-(n>>>=0),f=(r>>>=0)-(e>>>=0);const u=Math.min(o,f);for(let r=0;r<u;++r)if(this[n+r]!==t[e+r]){o=this[n+r],f=t[e+r];break}return o<f?-1:f<o?1:0},s.prototype.includes=function(t,e,r){return-1!==this.indexOf(t,e,r)},s.prototype.indexOf=function(t,e,r){return b(this,t,e,r,!0)},s.prototype.lastIndexOf=function(t,e,r){return b(this,t,e,r,!1)},s.prototype.write=function(t,e,r,n){if(e===undefined)n="utf8",r=this.length,e=0;else if(r===undefined&&"string"==typeof e)n=e,r=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e>>>=0,isFinite(r)?(r>>>=0,n===undefined&&(n="utf8")):(n=r,r=undefined)}const i=this.length-e;if((r===undefined||r>i)&&(r=i),t.length>0&&(r<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");let o=!1;for(;;)switch(n){case"hex":return m(this,t,e,r);case"utf8":case"utf-8":return B(this,t,e,r);case"ascii":case"latin1":case"binary":return A(this,t,e,r);case"base64":return v(this,t,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return I(this,t,e,r);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0}},s.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this,0)}};const R=4096;function _(t,e,r){let n="";r=Math.min(t.length,r);for(let i=e;i<r;++i)n+=String.fromCharCode(127&t[i]);return n}function S(t,e,r){let n="";r=Math.min(t.length,r);for(let i=e;i<r;++i)n+=String.fromCharCode(t[i]);return n}function L(t,e,r){const n=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>n)&&(r=n);let i="";for(let n=e;n<r;++n)i+=Z[t[n]];return i}function O(t,e,r){const n=t.slice(e,r);let i="";for(let t=0;t<n.length-1;t+=2)i+=String.fromCharCode(n[t]+256*n[t+1]);return i}function x(t,e,r){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}function C(t,e,r,n,i,o){if(!s.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>i||e<o)throw new RangeError('"value" argument is out of bounds');if(r+n>t.length)throw new RangeError("Index out of range")}function M(t,e,r,n,i){D(e,n,i,t,r,7);let o=Number(e&BigInt(4294967295));t[r++]=o,o>>=8,t[r++]=o,o>>=8,t[r++]=o,o>>=8,t[r++]=o;let f=Number(e>>BigInt(32)&BigInt(4294967295));return t[r++]=f,f>>=8,t[r++]=f,f>>=8,t[r++]=f,f>>=8,t[r++]=f,r}function k(t,e,r,n,i){D(e,n,i,t,r,7);let o=Number(e&BigInt(4294967295));t[r+7]=o,o>>=8,t[r+6]=o,o>>=8,t[r+5]=o,o>>=8,t[r+4]=o;let f=Number(e>>BigInt(32)&BigInt(4294967295));return t[r+3]=f,f>>=8,t[r+2]=f,f>>=8,t[r+1]=f,f>>=8,t[r]=f,r+8}function P(t,e,r,n,i,o){if(r+n>t.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function N(t,e,r,i,o){return e=+e,r>>>=0,o||P(t,0,r,4),n.write(t,e,r,i,23,4),r+4}function $(t,e,r,i,o){return e=+e,r>>>=0,o||P(t,0,r,8),n.write(t,e,r,i,52,8),r+8}s.prototype.slice=function(t,e){const r=this.length;(t=~~t)<0?(t+=r)<0&&(t=0):t>r&&(t=r),(e=e===undefined?r:~~e)<0?(e+=r)<0&&(e=0):e>r&&(e=r),e<t&&(e=t);const n=this.subarray(t,e);return Object.setPrototypeOf(n,s.prototype),n},s.prototype.readUintLE=s.prototype.readUIntLE=function(t,e,r){t>>>=0,e>>>=0,r||x(t,e,this.length);let n=this[t],i=1,o=0;for(;++o<e&&(i*=256);)n+=this[t+o]*i;return n},s.prototype.readUintBE=s.prototype.readUIntBE=function(t,e,r){t>>>=0,e>>>=0,r||x(t,e,this.length);let n=this[t+--e],i=1;for(;e>0&&(i*=256);)n+=this[t+--e]*i;return n},s.prototype.readUint8=s.prototype.readUInt8=function(t,e){return t>>>=0,e||x(t,1,this.length),this[t]},s.prototype.readUint16LE=s.prototype.readUInt16LE=function(t,e){return t>>>=0,e||x(t,2,this.length),this[t]|this[t+1]<<8},s.prototype.readUint16BE=s.prototype.readUInt16BE=function(t,e){return t>>>=0,e||x(t,2,this.length),this[t]<<8|this[t+1]},s.prototype.readUint32LE=s.prototype.readUInt32LE=function(t,e){return t>>>=0,e||x(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},s.prototype.readUint32BE=s.prototype.readUInt32BE=function(t,e){return t>>>=0,e||x(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},s.prototype.readBigUInt64LE=Q((function(t){Y(t>>>=0,"offset");const e=this[t],r=this[t+7];e!==undefined&&r!==undefined||q(t,this.length-8);const n=e+256*this[++t]+65536*this[++t]+this[++t]*2**24,i=this[++t]+256*this[++t]+65536*this[++t]+r*2**24;return BigInt(n)+(BigInt(i)<<BigInt(32))})),s.prototype.readBigUInt64BE=Q((function(t){Y(t>>>=0,"offset");const e=this[t],r=this[t+7];e!==undefined&&r!==undefined||q(t,this.length-8);const n=e*2**24+65536*this[++t]+256*this[++t]+this[++t],i=this[++t]*2**24+65536*this[++t]+256*this[++t]+r;return(BigInt(n)<<BigInt(32))+BigInt(i)})),s.prototype.readIntLE=function(t,e,r){t>>>=0,e>>>=0,r||x(t,e,this.length);let n=this[t],i=1,o=0;for(;++o<e&&(i*=256);)n+=this[t+o]*i;return i*=128,n>=i&&(n-=Math.pow(2,8*e)),n},s.prototype.readIntBE=function(t,e,r){t>>>=0,e>>>=0,r||x(t,e,this.length);let n=e,i=1,o=this[t+--n];for(;n>0&&(i*=256);)o+=this[t+--n]*i;return i*=128,o>=i&&(o-=Math.pow(2,8*e)),o},s.prototype.readInt8=function(t,e){return t>>>=0,e||x(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},s.prototype.readInt16LE=function(t,e){t>>>=0,e||x(t,2,this.length);const r=this[t]|this[t+1]<<8;return 32768&r?4294901760|r:r},s.prototype.readInt16BE=function(t,e){t>>>=0,e||x(t,2,this.length);const r=this[t+1]|this[t]<<8;return 32768&r?4294901760|r:r},s.prototype.readInt32LE=function(t,e){return t>>>=0,e||x(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},s.prototype.readInt32BE=function(t,e){return t>>>=0,e||x(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},s.prototype.readBigInt64LE=Q((function(t){Y(t>>>=0,"offset");const e=this[t],r=this[t+7];e!==undefined&&r!==undefined||q(t,this.length-8);const n=this[t+4]+256*this[t+5]+65536*this[t+6]+(r<<24);return(BigInt(n)<<BigInt(32))+BigInt(e+256*this[++t]+65536*this[++t]+this[++t]*2**24)})),s.prototype.readBigInt64BE=Q((function(t){Y(t>>>=0,"offset");const e=this[t],r=this[t+7];e!==undefined&&r!==undefined||q(t,this.length-8);const n=(e<<24)+65536*this[++t]+256*this[++t]+this[++t];return(BigInt(n)<<BigInt(32))+BigInt(this[++t]*2**24+65536*this[++t]+256*this[++t]+r)})),s.prototype.readFloatLE=function(t,e){return t>>>=0,e||x(t,4,this.length),n.read(this,t,!0,23,4)},s.prototype.readFloatBE=function(t,e){return t>>>=0,e||x(t,4,this.length),n.read(this,t,!1,23,4)},s.prototype.readDoubleLE=function(t,e){return t>>>=0,e||x(t,8,this.length),n.read(this,t,!0,52,8)},s.prototype.readDoubleBE=function(t,e){return t>>>=0,e||x(t,8,this.length),n.read(this,t,!1,52,8)},s.prototype.writeUintLE=s.prototype.writeUIntLE=function(t,e,r,n){if(t=+t,e>>>=0,r>>>=0,!n){C(this,t,e,r,Math.pow(2,8*r)-1,0)}let i=1,o=0;for(this[e]=255&t;++o<r&&(i*=256);)this[e+o]=t/i&255;return e+r},s.prototype.writeUintBE=s.prototype.writeUIntBE=function(t,e,r,n){if(t=+t,e>>>=0,r>>>=0,!n){C(this,t,e,r,Math.pow(2,8*r)-1,0)}let i=r-1,o=1;for(this[e+i]=255&t;--i>=0&&(o*=256);)this[e+i]=t/o&255;return e+r},s.prototype.writeUint8=s.prototype.writeUInt8=function(t,e,r){return t=+t,e>>>=0,r||C(this,t,e,1,255,0),this[e]=255&t,e+1},s.prototype.writeUint16LE=s.prototype.writeUInt16LE=function(t,e,r){return t=+t,e>>>=0,r||C(this,t,e,2,65535,0),this[e]=255&t,this[e+1]=t>>>8,e+2},s.prototype.writeUint16BE=s.prototype.writeUInt16BE=function(t,e,r){return t=+t,e>>>=0,r||C(this,t,e,2,65535,0),this[e]=t>>>8,this[e+1]=255&t,e+2},s.prototype.writeUint32LE=s.prototype.writeUInt32LE=function(t,e,r){return t=+t,e>>>=0,r||C(this,t,e,4,4294967295,0),this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t,e+4},s.prototype.writeUint32BE=s.prototype.writeUInt32BE=function(t,e,r){return t=+t,e>>>=0,r||C(this,t,e,4,4294967295,0),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},s.prototype.writeBigUInt64LE=Q((function(t,e=0){return M(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))})),s.prototype.writeBigUInt64BE=Q((function(t,e=0){return k(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))})),s.prototype.writeIntLE=function(t,e,r,n){if(t=+t,e>>>=0,!n){const n=Math.pow(2,8*r-1);C(this,t,e,r,n-1,-n)}let i=0,o=1,f=0;for(this[e]=255&t;++i<r&&(o*=256);)t<0&&0===f&&0!==this[e+i-1]&&(f=1),this[e+i]=(t/o>>0)-f&255;return e+r},s.prototype.writeIntBE=function(t,e,r,n){if(t=+t,e>>>=0,!n){const n=Math.pow(2,8*r-1);C(this,t,e,r,n-1,-n)}let i=r-1,o=1,f=0;for(this[e+i]=255&t;--i>=0&&(o*=256);)t<0&&0===f&&0!==this[e+i+1]&&(f=1),this[e+i]=(t/o>>0)-f&255;return e+r},s.prototype.writeInt8=function(t,e,r){return t=+t,e>>>=0,r||C(this,t,e,1,127,-128),t<0&&(t=255+t+1),this[e]=255&t,e+1},s.prototype.writeInt16LE=function(t,e,r){return t=+t,e>>>=0,r||C(this,t,e,2,32767,-32768),this[e]=255&t,this[e+1]=t>>>8,e+2},s.prototype.writeInt16BE=function(t,e,r){return t=+t,e>>>=0,r||C(this,t,e,2,32767,-32768),this[e]=t>>>8,this[e+1]=255&t,e+2},s.prototype.writeInt32LE=function(t,e,r){return t=+t,e>>>=0,r||C(this,t,e,4,2147483647,-2147483648),this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24,e+4},s.prototype.writeInt32BE=function(t,e,r){return t=+t,e>>>=0,r||C(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},s.prototype.writeBigInt64LE=Q((function(t,e=0){return M(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))})),s.prototype.writeBigInt64BE=Q((function(t,e=0){return k(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))})),s.prototype.writeFloatLE=function(t,e,r){return N(this,t,e,!0,r)},s.prototype.writeFloatBE=function(t,e,r){return N(this,t,e,!1,r)},s.prototype.writeDoubleLE=function(t,e,r){return $(this,t,e,!0,r)},s.prototype.writeDoubleBE=function(t,e,r){return $(this,t,e,!1,r)},s.prototype.copy=function(t,e,r,n){if(!H(t,Uint8Array))throw new TypeError("argument should be a Buffer");if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);const i=n-r;return this===t&&"function"==typeof Uint8Array.prototype.copyWithin?this.copyWithin(e,r,n):Uint8Array.prototype.set.call(t,this.subarray(r,n),e),i},s.prototype.fill=function(t,e,r,n){if("string"==typeof t){if("string"==typeof e?(n=e,e=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),n!==undefined&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!s.isEncoding(n))throw new TypeError("Unknown encoding: "+n);if(1===t.length){const e=t.charCodeAt(0);("utf8"===n&&e<128||"latin1"===n)&&(t=e)}}else"number"==typeof t?t&=255:"boolean"==typeof t&&(t=Number(t));if(e<0||this.length<e||this.length<r)throw new RangeError("Out of range index");if(r<=e)return this;let i;if(e>>>=0,r=r===undefined?this.length:r>>>0,t||(t=0),"number"==typeof t)for(i=e;i<r;++i)this[i]=t;else{const o=H(t,Uint8Array)?t:s.from(t,n),f=o.length;if(0===f)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(i=0;i<r-e;++i)this[i+e]=o[i%f]}return this};const j={};function F(t,e,r){function n(){const i=new r(e.apply(null,arguments));return Object.setPrototypeOf(i,n.prototype),i.code=t,i.name=`${i.name} [${t}]`,Error.captureStackTrace&&Error.captureStackTrace(i,n),i.stack,delete i.name,i}Object.setPrototypeOf(n.prototype,r.prototype),Object.setPrototypeOf(n,r),n.prototype.toString=function(){return`${this.name} [${t}]: ${this.message}`},j[t]=n}function z(t){let e="",r=t.length;const n="-"===t[0]?1:0;for(;r>=n+4;r-=3)e=`_${t.slice(r-3,r)}${e}`;return`${t.slice(0,r)}${e}`}function D(t,e,r,n,i,o){if(t>r||t<e){const n="bigint"==typeof e?"n":"";let i;throw i=o>3?0===e||e===BigInt(0)?`>= 0${n} and < 2${n} ** ${8*(o+1)}${n}`:`>= -(2${n} ** ${8*(o+1)-1}${n}) and < 2 ** ${8*(o+1)-1}${n}`:`>= ${e}${n} and <= ${r}${n}`,new j.ERR_OUT_OF_RANGE("value",i,t)}!function(t,e,r){Y(e,"offset"),t[e]!==undefined&&t[e+r]!==undefined||q(e,t.length-(r+1))}(n,i,o)}function Y(t,e){if("number"!=typeof t)throw new j.ERR_INVALID_ARG_TYPE(e,"number",t)}function q(t,e,r){if(Math.floor(t)!==t)throw Y(t,r),new j.ERR_OUT_OF_RANGE(r||"offset","an integer",t);if(e<0)throw new j.ERR_BUFFER_OUT_OF_BOUNDS;throw new j.ERR_OUT_OF_RANGE(r||"offset",`>= ${r?1:0} and <= ${e}`,t)}F("ERR_BUFFER_OUT_OF_BOUNDS",(function(t){return t?`${t} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"}),RangeError),F("ERR_INVALID_ARG_TYPE",(function(t,e){return`The "${t}" argument must be of type number. Received type ${typeof e}`}),TypeError),F("ERR_OUT_OF_RANGE",(function(t,e,r){let n=`The value of "${t}" is out of range.`,i=r;return Number.isInteger(r)&&Math.abs(r)>2**32?i=z(String(r)):"bigint"==typeof r&&(i=String(r),(r>BigInt(2)**BigInt(32)||r<-(BigInt(2)**BigInt(32)))&&(i=z(i)),i+="n"),n+=` It must be ${e}. Received ${i}`,n}),RangeError);const G=/[^+/0-9A-Za-z-_]/g;function V(t,e){let r;e=e||Infinity;const n=t.length;let i=null;const o=[];for(let f=0;f<n;++f){if(r=t.charCodeAt(f),r>55295&&r<57344){if(!i){if(r>56319){(e-=3)>-1&&o.push(239,191,189);continue}if(f+1===n){(e-=3)>-1&&o.push(239,191,189);continue}i=r;continue}if(r<56320){(e-=3)>-1&&o.push(239,191,189),i=r;continue}r=65536+(i-55296<<10|r-56320)}else i&&(e-=3)>-1&&o.push(239,191,189);if(i=null,r<128){if((e-=1)<0)break;o.push(r)}else if(r<2048){if((e-=2)<0)break;o.push(r>>6|192,63&r|128)}else if(r<65536){if((e-=3)<0)break;o.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;o.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return o}function X(t){return e.toByteArray(function(t){if((t=(t=t.split("=")[0]).trim().replace(G,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function W(t,e,r,n){let i;for(i=0;i<n&&!(i+r>=e.length||i>=t.length);++i)e[i+r]=t[i];return i}function H(t,e){return t instanceof e||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===e.name||e===Uint8Array&&s.isBuffer(t)}function J(t){return t!=t}const Z=function(){const t="0123456789abcdef",e=new Array(256);for(let r=0;r<16;++r){const n=16*r;for(let i=0;i<16;++i)e[n+i]=t[r]+t[i]}return e}(),K=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,-1,-1,-1,-1,-1,-1,-1,10,11,12,13,14,15,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,11,12,13,14,15,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];function Q(t){return"undefined"==typeof BigInt?tt:t}function tt(){throw new Error("BigInt not supported")}}).call(this)}).call(this,t("buffer").Buffer)},{"base64-js":5,buffer:2,ieee754:6}],5:[function(t,e,r){arguments[4][1][0].apply(r,arguments)},{dup:1}],6:[function(t,e,r){arguments[4][3][0].apply(r,arguments)},{dup:3}]},{},[4])(4)}));
    // base64js
    // prettier-ignore
    (function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"==typeof window?"undefined"==typeof global?"undefined"==typeof self?this:self:global:window,b.base64js=a()}})(function(){return function(){function b(d,e,g){function a(j,i){if(!e[j]){if(!d[j]){var f="function"==typeof require&&require;if(!i&&f)return f(j,!0);if(h)return h(j,!0);var c=new Error("Cannot find module '"+j+"'");throw c.code="MODULE_NOT_FOUND",c}var k=e[j]={exports:{}};d[j][0].call(k.exports,function(b){var c=d[j][1][b];return a(c||b)},k,k.exports,b,d,e,g)}return e[j].exports}for(var h="function"==typeof require&&require,c=0;c<g.length;c++)a(g[c]);return a}return b}()({"/":[function(a,b,c){'use strict';function d(a){var b=a.length;if(0<b%4)throw new Error("Invalid string. Length must be a multiple of 4");var c=a.indexOf("=");-1===c&&(c=b);var d=c===b?0:4-c%4;return[c,d]}function e(a,b,c){return 3*(b+c)/4-c}function f(a){var b,c,f=d(a),g=f[0],h=f[1],j=new m(e(a,g,h)),k=0,n=0<h?g-4:g;for(c=0;c<n;c+=4)b=l[a.charCodeAt(c)]<<18|l[a.charCodeAt(c+1)]<<12|l[a.charCodeAt(c+2)]<<6|l[a.charCodeAt(c+3)],j[k++]=255&b>>16,j[k++]=255&b>>8,j[k++]=255&b;return 2===h&&(b=l[a.charCodeAt(c)]<<2|l[a.charCodeAt(c+1)]>>4,j[k++]=255&b),1===h&&(b=l[a.charCodeAt(c)]<<10|l[a.charCodeAt(c+1)]<<4|l[a.charCodeAt(c+2)]>>2,j[k++]=255&b>>8,j[k++]=255&b),j}function g(a){return k[63&a>>18]+k[63&a>>12]+k[63&a>>6]+k[63&a]}function h(a,b,c){for(var d,e=[],f=b;f<c;f+=3)d=(16711680&a[f]<<16)+(65280&a[f+1]<<8)+(255&a[f+2]),e.push(g(d));return e.join("")}function j(a){for(var b,c=a.length,d=c%3,e=[],f=16383,g=0,j=c-d;g<j;g+=f)e.push(h(a,g,g+f>j?j:g+f));return 1===d?(b=a[c-1],e.push(k[b>>2]+k[63&b<<4]+"==")):2===d&&(b=(a[c-2]<<8)+a[c-1],e.push(k[b>>10]+k[63&b>>4]+k[63&b<<2]+"=")),e.join("")}c.byteLength=function(a){var b=d(a),c=b[0],e=b[1];return 3*(c+e)/4-e},c.toByteArray=f,c.fromByteArray=j;for(var k=[],l=[],m="undefined"==typeof Uint8Array?Array:Uint8Array,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o=0,p=n.length;o<p;++o)k[o]=n[o],l[n.charCodeAt(o)]=o;l[45]=62,l[95]=63},{}]},{},[])("/")});
    /* eslint-enable */
    return {
      Buffer: window.Buffer.Buffer,
      Base64: window.base64js,
    };
  }.call({}, {}, {});

  // Cool little utility I made for waiting for extensions to load.
  const modExtension = (function () {
    // A check if the user is in the editor
    /* eslint-disable no-undef */
    const inEditor = () =>
      !!(
        !ReduxStore?.getState?.()?.scratchGui?.mode.isPlayerOnly &&
        ReduxStore?.getState?.()?.scratchGui?.mode.hasEverEnteredEditor
      );
    /* eslint-enable no-undef */
    // Wait for some extensions
    const waiting = new Map(),
      registerOnLoad = [];
    vm.on("EXTENSION_ADDED", (extension) => {
      if (extension.id === extId) {
        // Load anything that needs loaded when our extension is added
        let fn = () => {};
        while ((fn = registerOnLoad.shift())) {
          fn(inEditor());
        }
        vm.extensionManager.refreshBlocks();
      } else if (waiting.has(extension.id)) {
        // Check if this is a waiting extension and if it is remove it from the waitlist
        // and run the function 300ms later (to allow for the refresh to take effect correctly)
        const fn = waiting.get(extension.id);
        waiting.delete(extension.id);
        setTimeout(() => {
          fn(inEditor());
          vm.extensionManager.refreshBlocks();
        }, 300);
      }
    });
    return (extensionId, callback) => {
      // If the extension is already loaded then just wait for us to load
      // then run the function.
      if (vm.extensionManager.isExtensionLoaded(extensionId))
        registerOnLoad.push(callback);
      // Otherwise set it to be waiting with the callback
      else waiting.set(extensionId, callback);
    };
  })();
  modExtension(
    "cst1229zip",
    () => (runtime.ext_cst1229zip._showArrayBufferOption = true)
  );
  modExtension(
    "filesExpanded",
    () => (runtime.ext_filesexpanded._showUnsafeOptions = true)
  );

  // This is probably not a good implementation but IDC it does what I need.
  class View {
    constructor(arrayBuffer) {
      // Make sure this is a valid argument and arraybuffer
      if (!arrayBuffer) throw new Error("View takes 1 arguments but found 0");
      if (!(arrayBuffer instanceof ArrayBuffer))
        throw new TypeError(
          `TypeError: The first argument must be ArrayBuffer. Received type ${typeof arrayBuffer}`
        );
      this.buffer = new Buffer(arrayBuffer);
      // Some info about the Buffer / View
      this.length = Number(this.buffer.length);
      this.littleEndian = false;
      this.byteOffset = 0;
    }
    // Utils
    _checkIdx(idx) {
      // Make sure the index is greater than zero but not the length
      if (idx + this.byteOffset > this.length - 1 || idx < 0)
        throw new Error(
          `Index (${idx}) is out of bounds of the view (${this.length})`
        );
    }
    get arrayBuffer() {
      // Get the arrayBuffer
      return this.buffer.slice(this.byteOffset, this.byteOffset + this.length)
        .buffer;
    }
    // Some management functions
    copy(target, ...args) {
      // Allocate / get the buffer
      target = target || Buffer.allocUnsafe(this.length);
      if (target instanceof View) target = target.buffer;
      // Run the copy and return a View
      this.buffer.copy(target, ...args);
      return new View(target.buffer);
    }
    fill(byte) {
      // Just a map lol
      this.buffer.fill(byte);
    }
    concat(other) {
      // Allocate a buffer thats the length of both buffers
      const buff = Buffer.allocUnsafe(this.length + other.length);
      // Copy the buffers into the new buffer
      this.buffer.copy(buff, 0, 0, this.length);
      other.copy(buff, this.length, 0, other.length);
      // Return a view
      return new View(buff);
    }
    // Data manipulation
    getInt8(idx, littleEndian = this.littleEndian) {
      this._checkIdx(idx), (idx += this.byteOffset);
      return this.buffer.readInt8(idx);
    }
    setInt8(idx, val, littleEndian = this.littleEndian) {
      this._checkIdx(idx), (idx += this.byteOffset);
      return this.buffer.writeInt8(val, idx);
    }
    getInt16(idx, littleEndian = this.littleEndian) {
      this._checkIdx(idx), (idx += this.byteOffset);
      if (littleEndian) return this.buffer.readInt16LE(idx);
      else return this.buffer.readInt16BE(idx);
    }
    setInt16(idx, val, littleEndian = this.littleEndian) {
      this._checkIdx(idx), (idx += this.byteOffset);
      if (littleEndian) return this.buffer.writeInt16LE(val, idx);
      else return this.buffer.writeInt16BE(val, idx);
    }
    getInt32(idx, littleEndian = this.littleEndian) {
      this._checkIdx(idx), (idx += this.byteOffset);
      if (littleEndian) return this.buffer.readInt32LE(idx);
      else return this.buffer.readInt32BE(idx);
    }
    setInt32(idx, val, littleEndian = this.littleEndian) {
      this._checkIdx(idx), (idx += this.byteOffset);
      if (littleEndian) return this.buffer.writeInt32LE(val, idx);
      else return this.buffer.writeInt32BE(val, idx);
    }
    getUint8(idx, littleEndian = this.littleEndian) {
      this._checkIdx(idx), (idx += this.byteOffset);
      return this.buffer.readUint8(idx);
    }
    setUint8(idx, val, littleEndian = this.littleEndian) {
      this._checkIdx(idx), (idx += this.byteOffset);
      return this.buffer.writeUint8(val, idx);
    }
    getUint16(idx, littleEndian = this.littleEndian) {
      this._checkIdx(idx), (idx += this.byteOffset);
      if (littleEndian) return this.buffer.readUint16LE(idx);
      else return this.buffer.readUint16BE(idx);
    }
    setUint16(idx, val, littleEndian = this.littleEndian) {
      this._checkIdx(idx), (idx += this.byteOffset);
      if (littleEndian) return this.buffer.writeUint16LE(val, idx);
      else return this.buffer.writeUint16BE(val, idx);
    }
    getUint32(idx, littleEndian = this.littleEndian) {
      this._checkIdx(idx), (idx += this.byteOffset);
      if (littleEndian) return this.buffer.readUint32LE(idx);
      else return this.buffer.readUint32BE(idx);
    }
    setUint32(idx, val, littleEndian = this.littleEndian) {
      this._checkIdx(idx), (idx += this.byteOffset);
      if (littleEndian) return this.buffer.writeUint32LE(val, idx);
      else return this.buffer.writeUint32BE(val, idx);
    }
    // Unimplemented
    getFloat16(idx, littleEndian = this.littleEndian) {
      throw new Error("Unimplemented");
    }
    setFloat16(idx, val, littleEndian = this.littleEndian) {
      throw new Error("Unimplemented");
    }
    getFloat32(idx, littleEndian = this.littleEndian) {
      throw new Error("Unimplemented");
    }
    setFloat32(idx, val, littleEndian = this.littleEndian) {
      throw new Error("Unimplemented");
    }
    getFloat64(idx, littleEndian = this.littleEndian) {
      throw new Error("Unimplemented");
    }
    setFloat64(idx, val, littleEndian = this.littleEndian) {
      throw new Error("Unimplemented");
    }
    getBigInt64(idx, littleEndian = this.littleEndian) {
      throw new Error("Unimplemented");
    }
    setBigInt64(idx, val, littleEndian = this.littleEndian) {
      throw new Error("Unimplemented");
    }
    getBigUint64(idx, littleEndian = this.littleEndian) {
      throw new Error("Unimplemented");
    }
    setBigUint64(idx, val, littleEndian = this.littleEndian) {
      throw new Error("Unimplemented");
    }
  }

  class extension {
    constructor() {
      // The last block error
      this.lastErr = "";
      // All the views
      this.views = new Map();
      // Current view
      this.view_name = "";
      this.view = this.emptyView;
      // Access methods (LE, BE, and the type)
      this.accessMethod = "Uint8";
      this.littleEndian = false;
      // Encoders and decoders for the string option
      this.textDecoder = new TextDecoder();
      this.textEncoder = new TextEncoder();
    }
    // Some exports for any extension that wants them
    static exports = {
      Buffer,
      Base64,
      View,
      _swap8,
      _swap16,
      _swap32,
      TypedArray,
      ArrayBuffer,
    };
    getInfo() {
      return {
        id: extId,
        name: "Buffers",
        color1: "#e855e3",
        color2: "#e43ade",
        color3: "#e43ade",
        color4: "#e43ade",
        blocks: [
          {
            blockType: BlockType.REPORTER,
            func: "getAttr",
            opcode: "getAttr1",
            text: "[ATTR]",
            arguments: {
              ATTR: { type: ArgumentType.STRING, menu: "attr_type" },
            },
            allowDropAnywhere: true,
          },
          "---",
          {
            blockType: BlockType.BOOLEAN,
            opcode: "hasView",
            text: "buffer [NAME] exists?",
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "my new buffer",
              },
            },
          },
          "---",
          {
            blockType: BlockType.COMMAND,
            opcode: "remove",
            text: "delete buffer [NAME]",
            arguments: {
              NAME: { type: ArgumentType.STRING, defaultValue: "my buffer" },
            },
          },
          {
            blockType: BlockType.COMMAND,
            opcode: "create",
            text: "new buffer [NAME] from [OPT] [DATA]",
            arguments: {
              NAME: { type: ArgumentType.STRING, defaultValue: "my buffer" },
              OPT: { type: ArgumentType.STRING, menu: "creation_type" },
              DATA: {
                type: ArgumentType.STRING,
                defaultValue: "Hello, World~",
              },
            },
          },
          {
            blockType: BlockType.COMMAND,
            opcode: "use",
            text: "use buffer [NAME]",
            arguments: {
              NAME: { type: ArgumentType.STRING, defaultValue: "my buffer" },
            },
          },
          {
            blockType: BlockType.COMMAND,
            opcode: "setAccessMethod",
            text: "set access method to [SIGNED][TYPE][SIZE]",
            arguments: {
              SIGNED: { type: ArgumentType.STRING, menu: "is_signed" },
              TYPE: { type: ArgumentType.STRING, menu: "number_type" },
              SIZE: { type: ArgumentType.STRING, menu: "block_size" },
            },
          },
          {
            blockType: BlockType.COMMAND,
            opcode: "setLittleEndian",
            text: "enable little endian: [LITTLE_ENDIAN]?",
            arguments: {
              LITTLE_ENDIAN: { type: ArgumentType.BOOLEAN },
            },
          },
          "---",
          {
            blockType: BlockType.COMMAND,
            opcode: "setAtIdx",
            text: "set byte [IDX] to [NUM]",
            arguments: {
              IDX: { type: ArgumentType.NUMBER, defaultValue: 1 },
              NUM: { type: ArgumentType.NUMBER, defaultValue: 5 },
            },
          },
          {
            blockType: BlockType.REPORTER,
            opcode: "getAtIdx",
            text: "get byte [IDX]",
            arguments: {
              IDX: { type: ArgumentType.NUMBER, defaultValue: 1 },
            },
          },
          {
            blockType: BlockType.REPORTER,
            func: "getAttr",
            opcode: "getAttr2",
            text: "current buffer as [ATTR]",
            arguments: {
              ATTR: { type: ArgumentType.STRING, menu: "attr_type2" },
            },
            allowDropAnywhere: true,
          },
          "---",
          {
            blockType: BlockType.COMMAND,
            opcode: "sliceIntoView",
            text: "slice [START]-[END] into [NAME]",
            arguments: {
              START: { type: ArgumentType.NUMBER, defaultValue: 1 },
              END: { type: ArgumentType.NUMBER, defaultValue: 5 },
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "my new buffer",
              },
            },
          },
          {
            blockType: BlockType.COMMAND,
            opcode: "mergeViews",
            text: "merge [NAME1] and [NAME2] into buffer [NAME3]",
            arguments: {
              NAME1: { type: ArgumentType.STRING, defaultValue: "my buffer" },
              NAME2: {
                type: ArgumentType.STRING,
                defaultValue: "my other buffer",
              },
              NAME3: {
                type: ArgumentType.STRING,
                defaultValue: "my new buffer",
              },
            },
          },
          {
            blockType: BlockType.COMMAND,
            opcode: "cloneView",
            text: "clone buffer into [NAME]",
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "my new buffer",
              },
            },
          },
          {
            blockType: BlockType.COMMAND,
            opcode: "fillView",
            text: "fill buffer with [BYTE]",
            arguments: {
              BYTE: { type: ArgumentType.STRING, defaultValue: 0 },
            },
          },
          "---",
          {
            blockType: BlockType.REPORTER,
            opcode: "swapEndians",
            text: "swap endian for u[SIZE] [NUM]",
            arguments: {
              SIZE: { type: ArgumentType.STRING, menu: "block_size" },
              NUM: { type: ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
        ],
        menus: {
          number_type: {
            // Removed "float" because its a pain to support, and I do not see a use for it
            items: ["int" /*, 'float'*/],
            acceptReporters: true,
          },
          is_signed: {
            items: ["signed", "unsigned"],
            acceptReporters: true,
          },
          block_size: {
            // Remove "64" because only floats and bigint use it
            items: ["8", "16", "32" /*, '64'*/],
            acceptReporters: false,
          },
          creation_type: {
            // Removed "array" becayse arrayBuffer exists (and its better)
            items: [
              "text",
              "length",
              /*'array',*/ "base64",
              "url",
              "arrayBuffer",
            ],
            acceptReporters: true,
          },
          attr_type: {
            items: [
              { text: "last block error", value: "error" },
              { text: "current buffer name", value: "name" },
              { text: "current buffer length", value: "length" },
              { text: "current access method", value: "access" },
              { text: "is little endian enabled?", value: "le" },
            ],
            acceptReporters: true,
          },
          attr_type2: {
            items: [
              { text: "text", value: "as_text" },
              // Removed for now due to arrayBuffer existing
              /*{text: 'array', value: 'as_array'},*/
              { text: "base64", value: "as_base64" },
              { text: "arrayBuffer", value: "as_arrayBuffer" },
            ],
            acceptReporters: true,
          },
        },
      };
    }
    // Util functions
    get emptyView() {
      // Return an empty view
      return new View(new ArrayBuffer(0));
    }
    _CToSWO(str) {
      if (typeof str === "object") return str;
      return Cast.toString(str);
    }
    _toJSON(str) {
      // If this is already
      if (typeof str === "object") return str;
      try {
        return JSON.parse(str);
      } catch {
        return false;
      }
    }
    lastBlockError() {
      // Return the last block error
      return this.lastErr;
    }
    // Some current data for the user
    hasView({ NAME }) {
      NAME = Cast.toString(NAME);
      if (this.views.has(NAME)) return true;
      return false;
    }
    // Empty opcode functions
    getAttr1() {}
    getAttr2() {}
    // Shared getAttr function
    getAttr({ ATTR }) {
      ATTR = Cast.toString(ATTR);
      switch (ATTR) {
        // Some output options
        case "as_text":
          return this.view.buffer.toString("utf8");
        case "as_array":
          return JSON.stringify(this.view.toJSON());
        case "as_base64":
          return Base64.fromByteArray(this.view.buffer);
        case "as_arrayBuffer":
          return this.view.arrayBuffer;
        // Real attrs
        case "name":
          return this.view_name;
        case "length":
          return this.view.length;
        case "access":
          return this.accessMethod;
        case "le":
          return this.littleEndian;
        case "error":
          return this.lastErr;
        default:
          return "";
      }
    }
    // Management
    setLittleEndian({ LITTLE_ENDIAN }) {
      this.littleEndian = Cast.toBoolean(LITTLE_ENDIAN);
    }
    _remove(name) {
      this.views.get(name).fill(0);
      return this.views.delete(name);
    }
    remove({ NAME }) {
      // Remove the view from the map
      NAME = Cast.toString(NAME);
      return this.views.delete(NAME);
    }
    async create({ NAME, OPT, DATA }) {
      NAME = Cast.toString(NAME);
      OPT = Cast.toString(OPT);
      let buff;
      // Remove the view from the map to temporarilly save memory
      this.views.delete(NAME);
      switch (OPT) {
        case "length":
          DATA = Cast.toNumber(DATA);
          // Create the ArrayBuffer based on a number
          // which makes it that length (filled with 0's)
          buff = new ArrayBuffer(DATA);
          break;
        case "array":
          // If the user wants to use slow and bad array they can :shrug:
          DATA = this._toJSON(this._CToSWO(DATA));
          if (!DATA || !Array.isArray(DATA)) {
            this.lastErr = "Invalid array json.";
            return false;
          }
          // Create the ArrayBuffer
          buff = new ArrayBuffer(DATA);
          break;
        case "base64":
          DATA = Cast.toString(DATA);
          // Decode the base64 and get the ArrayBuffer
          buff = Base64.toByteArray(DATA).buffer;
          break;
        case "url":
          DATA = Cast.toString(DATA);
          // Fetch the URL
          if (!(await Scratch.canFetch(DATA))) return false;
          buff = await Scratch.fetch(DATA);
          if (!buff.ok) {
            this.lastErr = "Failed to fetch";
            return false;
          }
          // Get the ArrayBuffer
          buff = await buff.arrayBuffer();
          break;
        case "text":
          DATA = Cast.toString(DATA);
          buff = this.textEncoder.encode(DATA).buffer;
          break;
        case "arrayBuffer":
          // Make sure its actually an ArrayBuffer and not some random object
          if (!(DATA instanceof ArrayBuffer)) {
            this.lastErr = `Expected arrayBuffer got ${typeof DATA}:${DATA.constructor.name}`;
            return false;
          }
          buff = DATA;
          break;
        default:
          this.lastErr = "Unkown creation type";
          return false;
      }
      // Add the view
      this.views.set(NAME, new View(buff));
      // Clear any errors
      this.lastErr = "";
      // If the view is the same as the one we just created automatically update the view
      if (this.view_name === NAME) return this.use({ NAME });
      return true;
    }
    use({ NAME }) {
      NAME = Cast.toString(NAME);
      // Check if the view exists
      if (!this.views.has(NAME)) {
        // Make the view empty to save memory
        this.view = this.emptyView;
        this.view_name = "";
        this.lastErr = "Could not find Buffer";
        return false;
      }
      // Update the current view
      this.view_name = NAME;
      this.view = this.views.get(NAME);
      return true;
    }
    setAccessMethod({ SIGNED, TYPE, SIZE }) {
      SIGNED = Cast.toString(SIGNED).toLowerCase() === "signed";
      SIZE = Cast.toNumber(SIZE);
      TYPE =
        Cast.toString(TYPE).toLowerCase() === "int"
          ? !SIGNED && SIZE <= 32
            ? "Uint"
            : "Int"
          : "Float";
      this.accessMethod = `${TYPE}${SIZE}`;
    }
    // Usage
    setAtIdx({ IDX, NUM, LITTLE_ENDIAN }) {
      if (!this.view) return false;
      IDX = clamp(Cast.toNumber(IDX), 1, this.view.byteLength);
      NUM = Cast.toNumber(NUM);
      try {
        // Set the value
        this.view[`set${this.accessMethod}`](IDX - 1, NUM, this.littleEndian);
        return true;
      } catch (err) {
        // Catch the error while setting
        this.lastErr = err.message;
        return false;
      }
    }
    getAtIdx({ IDX }) {
      if (!this.view) return "";
      IDX = clamp(Cast.toNumber(IDX), 1, this.view.length);
      try {
        // Get the value
        return this.view[`get${this.accessMethod}`](IDX - 1, this.littleEndian);
      } catch (err) {
        // Catch the error while getting
        this.lastErr = err.message;
        return "";
      }
    }
    sliceIntoView({ NAME, START, END }) {
      if (!this.view) return false;
      END = Cast.toNumber(END);
      // Clamp the start and end values to be in a valid range (prevents errors)
      START = clamp(Cast.toNumber(START), 1, this.view.length) - 1;
      // If end is 0 then just treat it like passing 1 argument to slice on an array
      if (END !== 0) END = clamp(END, START + 1, this.view.length) - 1;
      else END = this.view.length - 1;
      // Get the size
      const size = END - START + 1;
      if (size < 1) {
        this.lastErr = "Invalid size";
        return false;
      }
      // Create the output view
      const newBuff = new View(new ArrayBuffer(size));
      for (let i = START; i <= END; i++) {
        // Populate the view
        newBuff[`set${this.accessMethod}`](
          i - START,
          this.view[`get${this.accessMethod}`](i)
        );
      }
      // Set the buff into the output view in the map
      this.views.set(Cast.toString(NAME), newBuff);
      if (NAME === this.view_name) this.use({ NAME: this.view_name });
      return true;
    }
    mergeViews({ NAME1, NAME2, NAME3 }) {
      NAME1 = Cast.toString(NAME1);
      NAME2 = Cast.toString(NAME2);
      NAME3 = Cast.toString(NAME3);
      // Make sure the 2 views exist
      if (!this.views.has(NAME1) || !this.views.has(NAME2)) {
        this.lastError = `Missing a view, cannot merge "${NAME1}" and "${NAME2}".`;
        return false;
      }
      // Get the views
      NAME1 = this.views.get(NAME1);
      NAME2 = this.views.get(NAME2);
      // Concat the 2 views
      this.views.set(NAME3, NAME1.concat(NAME2));
      if (NAME3 === this.view_name) this.use({ NAME: this.view_name });
      return true;
    }
    cloneView({ NAME }) {
      if (!this.view) return false;
      // Clone the view and save it
      NAME = Cast.toString(NAME);
      this.views.set(NAME, this.view.copy());
      if (NAME === this.view_name) this.use({ NAME: this.view_name });
      return true;
    }
    fillView({ BYTE }) {
      if (!this.view) return false;
      // Fill the current view with the byte specified
      // If this is a string grab the first letter, it will be converted to a number by the fill function
      if (typeof BYTE !== "string") BYTE = Cast.toNumber(BYTE);
      else BYTE = BYTE[0] || "";
      this.view.fill(BYTE);
      return true;
    }
    // Some utilitie functions for users
    swapEndians({ SIZE, NUM }) {
      SIZE = Cast.toString(SIZE);
      NUM = Cast.toNumber(NUM);
      switch (SIZE) {
        // Swap64 was going to be added, but it is not needed as we are not supporting floats / bigint
        case 32:
          return _swap32(NUM);
        case 16:
          return _swap16(NUM);
        default:
        case 8:
          return _swap8(NUM);
      }
    }
    isLittleEndianOnForUser() {
      return pcLittleEndian;
    }
  }

  // Register and expose the class
  Scratch.extensions.register((runtime[`ext_${extId}`] = new extension()));
})(Scratch);
