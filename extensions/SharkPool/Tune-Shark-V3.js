// Name: Tune Shark V3
// ID: SPtuneShark3
// Description: An advanced audio engine, providing complex sound control.
// By: SharkPool
// License: MIT AND LGPL-3.0

// Version V.3.5.2

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed)
    throw new Error(Scratch.translate("Tune Shark V3 must be run unsandboxed"));

  const menuIconURI =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDIuMTg1IiBoZWlnaHQ9IjEwMi4xODUiIHZpZXdCb3g9IjAgMCAxMDIuMTg1IDEwMi4xODUiPjxnIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTAgNTEuMDkzQzAgMjIuODc1IDIyLjg3NSAwIDUxLjA5MyAwczUxLjA5MyAyMi44NzUgNTEuMDkzIDUxLjA5My0yMi44NzUgNTEuMDkzLTUxLjA5MyA1MS4wOTNTMCA3OS4zMTEgMCA1MS4wOTMiIGZpbGw9IiM0MDQwNDAiLz48cGF0aCBkPSJNNC44NiA1MS4wOTNjMC0yNS41MzQgMjAuNy00Ni4yMzMgNDYuMjMzLTQ2LjIzMyAyNS41MzQgMCA0Ni4yMzMgMjAuNyA0Ni4yMzMgNDYuMjMzIDAgMjUuNTM0LTIwLjcgNDYuMjMzLTQ2LjIzMyA0Ni4yMzMtMjUuNTM0IDAtNDYuMjMzLTIwLjctNDYuMjMzLTQ2LjIzMyIgZmlsbD0iIzY2NiIvPjxwYXRoIGQ9Ik03Mi44MzcgODYuNjQzdi0uMDAzYy0xLjI1NCAyLjUzNi00LjY2OCAzLjkzNS04LjI2NCAzLjE5Ny00LjExOC0uODQ0LTYuOTE1LTQuMTctNi4yNDYtNy40MjguNjY4LTMuMjYgNC41NDgtNS4yMTYgOC42NjYtNC4zNzEgMS44NzUuMzg0IDMuNDc0IDEuMjg0IDQuNiAyLjQ1N2w2LjY4My0xNC4xNzhjLTEwLjU2Ni00LjEzNS0xOS43Ni01LjA5Ni0xOS43Ni01LjA5NmwtOC45ODcgMTkuMDYxYy0uOTY2IDIuOTI3LTQuNjM2IDQuNjIyLTguNTIgMy44MjYtNC4xMTctLjg0NC02LjkxNC00LjE3LTYuMjQ2LTcuNDMuNjY5LTMuMjU4IDQuNTQ4LTUuMjE0IDguNjY3LTQuMzcgMS45MS4zOTEgMy41MzYgMS4zMTcgNC42NjQgMi41MjJsMTIuMDM1LTI1LjUwN3MxMy41MzIuMjM2IDI2Ljk0NyA3LjExNHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJtMjguMzA5IDMwLjgzMSA0LjA0MyAyMy42ODQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIi8+PHBhdGggZD0iTTM0LjAzMyA1NS4yMTljMS4zOCAyLjYwNi0uNzcyIDYuMDQtNC44MDggNy42Ny00LjAzNyAxLjYzLTguNDI5LjgzNy05LjgxLTEuNzctMS4zOC0yLjYwNi43NzItNi4wNCA0LjgwOS03LjY3IDQuMDM2LTEuNjI5IDguNDI4LS44MzcgOS44MDkgMS43N20tNy45NS0yNy4wNjhzOS43MDUtMS43MDQgMTIuMzYzIDIuNzdjMi4zNzUgNCAuMDcxIDguNjk1LjIxMiAxMC4xMjguMTQgMS40MzMgMi4xNzUgMS4xMDkgMi4xNzUgMS4xMDlsLS4wMTQgMS42NzRzLTIuODY0LjY2OS0zLjQxMi0xLjMyYy0uNTQ3LTEuOTg4LS41Ni01Ljk3OC0yLjgyMy04LjIyNy0yLjI2NS0yLjI1LTcuNTM3LS43NTktNy41MzctLjc1OSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik02MC40MzYgMzUuMzcxYy0uMzMzIDIuMTE4LTIuMzUzIDMuMzA5LTQuMTg5IDQuMDAyLTEuNjUuNzI2LTMuNTUgMS4wMDgtNS4yNzYuMzctMS42MzEtLjM4MS0zLjE4OC0xLjgwNy0yLjk5NC0zLjU5OC4xNTQtMi4wODUgMS44OTYtMy44MjIgMy44NDItNC40MDUgMS45NC0uNzk5IDQuMjUzLS43MyA2LjEwNS4yNi45MTMuNDIxIDIuMTg5LTE0LjE0MiAzLjAzNS0yMC41ODMuMS0uNjQyIDIuNTg0LS40NyAyLjUxMy4xNTEgMCAwLTEuODU0IDE1LjUyMi0zLjAzNiAyMy44MDMiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvZz48L3N2Zz4=";
  const blockIconURI =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3OC45NzQiIGhlaWdodD0iNzguOTc0IiB2aWV3Qm94PSIwIDAgNzguOTc0IDc4Ljk3NCI+PGcgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMCA3OC45NzRWMGg3OC45NzR2NzguOTc0eiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Im02MS4yMDIgNTMuODM2LS4wMDItLjAwM2MtLjA2OCAzLjcxLTMuMzM3IDcuMjgtOC4wMTYgOC40MTYtNS4zNTkgMS4zMDItMTAuNTM4LTEuMDgtMTEuNTY4LTUuMzJzMi40OC04LjczMyA3LjgzOS0xMC4wMzVjMi40NC0uNTkzIDQuODQtLjQyIDYuODMxLjM0MnYtMjAuNTZjLTE0Ljg1IDEuMDAzLTI2LjI5OCA1LjAwNi0yNi4yOTggNS4wMDZ2MjcuNjQ0Yy40OSA0LjAxNC0yLjkxNiA4LjA3OC03Ljk3IDkuMzA2LTUuMzU4IDEuMzAxLTEwLjUzNy0xLjA4MS0xMS41NjctNS4zMjFzMi40OC04LjczMyA3LjgzOC0xMC4wMzVjMi40ODYtLjYwNCA0LjkzMy0uNDE0IDYuOTQ2LjM4NGwuMDEyLTM2Ljk5OHMxNi4xOS03LjI5IDM1Ljk1NS02LjYzM3oiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+";

  const extraIcons = {
    set: "dpZHRoPSI3OC45NzQiIGhlaWdodD0iNzguOTc0IiB2aWV3Qm94PSIwIDAgNzguOTc0IDc4Ljk3NCI+PGcgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiID48cGF0aCBkPSJtNjQuNTMzIDQyLjYxIDIuMDQyLjg1NWE1LjAyIDUuMDIgMCAwIDEgMi42OSA2LjU3bC0xLjM3IDMuMjc0YTUuMDIgNS4wMiAwIDAgMS02LjU3IDIuNjlsLTIuMDQyLS44NTVhMjUgMjUgMCAwIDEtNC4yOTUgNC4yNmwuODQgMi4wNWE1LjAyIDUuMDIgMCAwIDEtMi43NDIgNi41NDhsLTMuMjg1IDEuMzQ1YTUuMDIgNS4wMiAwIDAgMS02LjU0OC0yLjc0MmwtLjg0LTIuMDVhMjUgMjUgMCAwIDEtNi4wNDktLjAyMmwtLjg1NSAyLjA0MmE1LjAyIDUuMDIgMCAwIDEtNi41NyAyLjY5bC0zLjI3NC0xLjM3YTUuMDIgNS4wMiAwIDAgMS0yLjY5LTYuNTdsLjg1NS0yLjA0MmEyNSAyNSAwIDAgMS00LjI2LTQuMjk1bC0yLjA1Ljg0YTUuMDIgNS4wMiAwIDAgMS02LjU0OC0yLjc0MmwtMS4zNDUtMy4yODVhNS4wMiA1LjAyIDAgMCAxIDIuNzQyLTYuNTQ4bDIuMDUtLjg0YTI1IDI1IDAgMCAxIC4wMjItNi4wNDlsLTIuMDQyLS44NTVhNS4wMiA1LjAyIDAgMCAxLTIuNjktNi41N2wxLjM3LTMuMjc0YTUuMDIgNS4wMiAwIDAgMSA2LjU3LTIuNjlsMi4wNDIuODU1YTI1IDI1IDAgMCAxIDQuMjk1LTQuMjZsLS44NC0yLjA1YTUuMDIgNS4wMiAwIDAgMSAyLjc0Mi02LjU0OGwzLjI4NS0xLjM0NWE1LjAyIDUuMDIgMCAwIDEgNi41NDggMi43NDJsLjg0IDIuMDVhMjUgMjUgMCAwIDEgNi4wNDkuMDIybC44NTUtMi4wNDJhNS4wMiA1LjAyIDAgMCAxIDYuNTctMi42OWwzLjI3NCAxLjM3YTUuMDIgNS4wMiAwIDAgMSAyLjY5IDYuNTdsLS44NTUgMi4wNDJhMjUgMjUgMCAwIDEgNC4yNiA0LjI5NWwyLjA1LS44NGE1LjAyIDUuMDIgMCAwIDEgNi41NDggMi43NDJsMS4zNDUgMy4yODVhNS4wMiA1LjAyIDAgMCAxLTIuNzQyIDYuNTQ4bC0yLjA1Ljg0YTI1IDI1IDAgMCAxLS4wMjIgNi4wNDltLTM3LjQ5OC04LjMzOGMtMi44OCA2Ljg3Ny4zNiAxNC43ODcgNy4yMzcgMTcuNjY3czE0Ljc4Ny0uMzYgMTcuNjY3LTcuMjM3LS4zNi0xNC43ODctNy4yMzctMTcuNjY3LTE0Ljc4Ny4zNi0xNy42NjcgNy4yMzciIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMCA3OC45NzRWMGg3OC45NzR2NzguOTc0eiIgZmlsbD0ibm9uZSIvPjwvZz48L3N2Zz4=",
    nob: "dpZHRoPSI3OC45NzQiIGhlaWdodD0iNzguOTc0IiB2aWV3Qm94PSIwIDAgNzguOTc0IDc4Ljk3NCI+PGcgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0wIDc4Ljk3NFYwaDc4Ljk3NHY3OC45NzR6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTM3Ljk2MSAxMC44NDdhMi4xMDUgMi4xMDUgMCAwIDEtMi4xMDQtMi4xMDRWNS42OTJjMC0xLjE2My45NDItMi4xMDUgMi4xMDQtMi4xMDVoMy4wNTJjMS4xNjIgMCAyLjEwNC45NDIgMi4xMDQgMi4xMDV2My4wNTFhMi4xMDUgMi4xMDUgMCAwIDEtMi4xMDQgMi4xMDV6bTAgNjQuNTRhMi4xMDUgMi4xMDUgMCAwIDEtMi4xMDQtMi4xMDV2LTMuMDUxYzAtMS4xNjIuOTQyLTIuMTA1IDIuMTA0LTIuMTA1aDMuMDUyYzEuMTYyIDAgMi4xMDQuOTQzIDIuMTA0IDIuMTA1djMuMDUxYTIuMTA1IDIuMTA1IDAgMCAxLTIuMTA0IDIuMTA1em0yMC42OTgtNTcuMjNhMi4xMDUgMi4xMDUgMCAwIDEgMC0yLjk3NmwyLjE1OC0yLjE1OGEyLjEwNSAyLjEwNSAwIDAgMSAyLjk3NiAwbDIuMTU4IDIuMTU4YTIuMTA1IDIuMTA1IDAgMCAxIDAgMi45NzZsLTIuMTU4IDIuMTU4YTIuMTA1IDIuMTA1IDAgMCAxLTIuOTc2IDB6TTEzLjAyMyA2My43OTNhMi4xMDUgMi4xMDUgMCAwIDEgMC0yLjk3NmwyLjE1OC0yLjE1OGEyLjEwNSAyLjEwNSAwIDAgMSAyLjk3NiAwbDIuMTU4IDIuMTU4YTIuMTA1IDIuMTA1IDAgMCAxIDAgMi45NzZsLTIuMTU4IDIuMTU4YTIuMTA1IDIuMTA1IDAgMCAxLTIuOTc2IDB6bTU1LjEwNC0yNS44MzJjMC0xLjE2Mi45NDItMi4xMDQgMi4xMDQtMi4xMDRoMy4wNTFjMS4xNjMgMCAyLjEwNS45NDIgMi4xMDUgMi4xMDR2My4wNTJhMi4xMDUgMi4xMDUgMCAwIDEtMi4xMDUgMi4xMDRoLTMuMDUxYTIuMTA1IDIuMTA1IDAgMCAxLTIuMTA1LTIuMTA0em0tNjQuNTQgMGMwLTEuMTYyLjk0Mi0yLjEwNCAyLjEwNS0yLjEwNGgzLjA1MWMxLjE2MiAwIDIuMTA1Ljk0MiAyLjEwNSAyLjEwNHYzLjA1MmEyLjEwNSAyLjEwNSAwIDAgMS0yLjEwNSAyLjEwNEg1LjY5MmEyLjEwNSAyLjEwNSAwIDAgMS0yLjEwNS0yLjEwNHptNTcuMjMgMjAuNjk4YTIuMTA1IDIuMTA1IDAgMCAxIDIuOTc2IDBsMi4xNTggMi4xNThhMi4xMDUgMi4xMDUgMCAwIDEgMCAyLjk3NmwtMi4xNTggMi4xNThhMi4xMDUgMi4xMDUgMCAwIDEtMi45NzYgMGwtMi4xNTgtMi4xNThhMi4xMDUgMi4xMDUgMCAwIDEgMC0yLjk3NnpNMTUuMTgxIDEzLjAyM2EyLjEwNSAyLjEwNSAwIDAgMSAyLjk3NiAwbDIuMTU4IDIuMTU4YTIuMTA1IDIuMTA1IDAgMCAxIDAgMi45NzZsLTIuMTU4IDIuMTU4YTIuMTA1IDIuMTA1IDAgMCAxLTIuOTc2IDBsLTIuMTU4LTIuMTU4YTIuMTA1IDIuMTA1IDAgMCAxIDAtMi45NzZ6bTguNDE2IDEwLjQzYzcuNTQ2LTcuNTQ3IDE5LjA2NS04LjcwMiAyNy44MjctMy40NjUtLjEyNS4wOS0xMy4yNjQgMTcuODcyLTEyLjEzMyAxOS4wMDNsMS4wMzcgMS4wMzdjMS4xMyAxLjEzIDE4LjkxMy0xMi4wMDggMTkuMDAzLTEyLjEzMyA1LjIzNyA4Ljc2MiA0LjA4MiAyMC4yOC0zLjQ2NSAyNy44MjgtOC45MTEgOC45MS0yMy4zNTkgOC45MS0zMi4yNyAwLTguOTEtOC45MTEtOC45MS0yMy4zNTkgMC0zMi4yNyIgZmlsbD0iI2ZmZiIvPjwvZz48L3N2Zz4=",
    flag: "ZpZXdCb3g9IjAgMCAxNi42MyAxNy41Ij48cGF0aCBkPSJNLjc1IDJhNi40NCA2LjQ0IDAgMCAxIDcuNjkgMGgwYTYuNDQgNi40NCAwIDAgMCA3LjY5IDB2MTAuNGE2LjQ0IDYuNDQgMCAwIDEtNy42OSAwaDBhNi40NCA2LjQ0IDAgMCAwLTcuNjkgMCIgc3R5bGU9ImZpbGw6IzRjYmY1NjtzdHJva2U6IzQ1OTkzZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQiLz48cGF0aCBzdHlsZT0iZmlsbDojNGNiZjU2O3N0cm9rZTojNDU5OTNkO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MS41cHgiIGQ9Ik0uNzUgMTYuNzV2LTE2Ii8+PC9zdmc+",
    stop: "ZpZXdCb3g9IjAgMCAxNCAxNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBhdGggc3R5bGU9ImZpbGw6I2VjNTk1OTtzdHJva2U6I2I4NDg0ODtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTAiIGQ9Ik00LjMuNWg1LjRsMy44IDMuOHY1LjRsLTMuOCAzLjhINC4zTC41IDkuN1Y0LjN6Ii8+PC9zdmc+",
  };
  for (const key in extraIcons) {
    extraIcons[key] =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIH" +
      extraIcons[key];
  }

  // Pizzicato (Library to simplify the way you create and manipulate sounds with the Web Audio API.)
  // Original: https://github.com/alemangui/pizzicato
  // Modified Version: https://github.com/SharkPool-SP/pizzicato/
  /*
    MIT License

    Copyright (c) 2016 Alejandro Mantecon Guillen

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
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  */

  /* eslint-disable */
  // prettier-ignore
  const PzInitializer = (function(e){"use strict";var h={},u=h,t="undefined"!=typeof window?window.AudioContext||window.webkitAudioContext:"undefined"!=typeof global?global.AudioContext||global.webkitAudioContext:null;if(!t)throw new Error("No AudioContext found in this environment.");h.context=e||new t;var i=h.context.createGain();i.connect(h.context.destination),h.Util={isString:function(e){return"[object String]"===toString.call(e)},isObject:function(e){return"[object Object]"===toString.call(e)},isFunction:function(e){return"[object Function]"===toString.call(e)},isNumber:function(e){return"[object Number]"===toString.call(e)&&e===+e},isArray:function(e){return"[object Array]"===toString.call(e)},isInRange:function(e,t,i){return!!(u.Util.isNumber(e)&&u.Util.isNumber(t)&&u.Util.isNumber(i))&&(t<=e&&e<=i)},isBool:function(e){return"boolean"==typeof e},isOscillator:function(e){return e&&"[object OscillatorNode]"===e.toString()},isAudioBufferSourceNode:function(e){return e&&"[object AudioBufferSourceNode]"===e.toString()},isSound:function(e){return e instanceof u.Sound},isEffect:function(e){for(var t in h.Effects)if(e instanceof h.Effects[t])return!0;return!1},normalize:function(e,t,i){if(u.Util.isNumber(e)&&u.Util.isNumber(t)&&u.Util.isNumber(i))return(i-t)*e+t},getDryLevel:function(e){return!u.Util.isNumber(e)||1<e||e<0?0:e<=.5?1:1-2*(e-.5)},getWetLevel:function(e){return!u.Util.isNumber(e)||1<e||e<0?0:.5<=e?1:1-2*(.5-e)}};var e=h.context.createGain(),t=Object.getPrototypeOf(Object.getPrototypeOf(e)),n=t.connect;t.connect=function(e){var t=u.Util.isEffect(e)?e.inputNode:e;return n.call(this,t),e},Object.defineProperty(h,"volume",{enumerable:!0,get:function(){return i.gain.value},set:function(e){u.Util.isInRange(e,0,1)&&i&&(i.gain.value=e)}}),Object.defineProperty(h,"masterGainNode",{enumerable:!1,get:function(){return i},set:function(e){console.error("Can't set the master gain node")}}),h.Events={on:function(e,t,i){e&&t&&(this._events=this._events||{},(this._events[e]||(this._events[e]=[])).push({callback:t,context:i||this,handler:this}))},trigger:function(e){var t,i,n,o;if(e&&(this._events=this._events||{},t=this._events[e]||(this._events[e]=[]))){for(i=Math.max(0,arguments.length-1),n=[],o=0;o<i;o++)n[o]=arguments[o+1];for(o=0;o<t.length;o++)t[o].callback.apply(t[o].context,n)}},off:function(e){e?this._events[e]=void 0:this._events={}}},h.Sound=function(e,t){var o=this,s=h.Util,i=function(e){if(e&&!s.isFunction(e)&&!s.isString(e)&&!s.isObject(e))return"Description type not supported. Initialize a sound using an object, a function or a string.";if(s.isObject(e))return s.isString(e.source)&&-1!==["wave","file","input","script","sound","buffer"].indexOf(e.source)?"file"!==e.source||e.options&&e.options.path?"script"!==e.source||e.options&&e.options.audioFunction?void 0:"An audio function is needed for sounds with a script source":"A path is needed for sounds with a file source":"Specified source not supported. Sources can be wave, file, input or script"}(e),n=s.isObject(e)&&s.isObject(e.options);if(i)throw console.error(i),new Error("Error initializing Pizzicato Sound: "+i);function a(i,e){i=i||{},this.getRawSourceNode=function(){var e=this.sourceNode?this.sourceNode.frequency.value:i.frequency,t=h.context.createOscillator();return t.type=i.type||"sine",t.frequency.value=e||440,t},this.sourceNode=this.getRawSourceNode(),this.sourceNode.gainSuccessor=u.context.createGain(),this.sourceNode.connect(this.sourceNode.gainSuccessor),s.isFunction(e)&&e()}function r(t,i){t=s.isArray(t)?t:[t];var n=new XMLHttpRequest;n.open("GET",t[0],!0),n.responseType="arraybuffer",n.onload=function(e){h.context.decodeAudioData(e.target.response,function(t){o.getRawSourceNode=function(){var e=h.context.createBufferSource();return e.loop=this.loop,e.buffer=t,e},s.isFunction(i)&&i()}.bind(o),function(e){if(console.error("Error decoding audio file "+t[0]),1<t.length)return t.shift(),void r(t,i);e=e||new Error("Error decoding audio file "+t[0]),s.isFunction(i)&&i(e)}.bind(o))},n.onreadystatechange=function(e){4===n.readyState&&200!==n.status&&console.error("Error while fetching "+t[0]+". "+n.statusText)},n.send()}function c(e,t){var i=s.isFunction(e)?e:e.audioFunction,n=s.isObject(e)&&e.bufferSize?e.bufferSize:null;if(!n)try{h.context.createScriptProcessor()}catch(e){n=2048}this.getRawSourceNode=function(){var e=h.context.createScriptProcessor(n,1,1);return e.onaudioprocess=i,e}}this.detached=n&&e.options.detached,this.masterVolume=h.context.createGain(),this.fadeNode=h.context.createGain(),this.fadeNode.gain.value=0,this.detached||this.masterVolume.connect(h.masterGainNode),this.lastTimePlayed=0,this.effects=[],this.effectConnectors=[],this.playing=this.paused=!1,this.loop=n&&e.options.loop,this.attack=n&&s.isNumber(e.options.attack)?e.options.attack:.04,this.volume=n&&s.isNumber(e.options.volume)?e.options.volume:1,n&&s.isNumber(e.options.release)?this.release=e.options.release:n&&s.isNumber(e.options.sustain)?(console.warn("'sustain' is deprecated. Use 'release' instead."),this.release=e.options.sustain):this.release=.04,e?s.isString(e)?r.bind(this)(e,t):s.isFunction(e)?c.bind(this)(e,t):"file"===e.source?r.bind(this)(e.options.path,t):"wave"===e.source?a.bind(this)(e.options,t):"input"===e.source?function(e,t){if(navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,!navigator.getUserMedia&&(!navigator.mediaDevices||navigator.mediaDevices.getUserMedia))return void console.error("Your browser does not support getUserMedia. Note that the current document must be loaded securely for this to work");function i(e){s.isFunction(t)&&t(e)}var n=function(e){o.getRawSourceNode=function(){return h.context.createMediaStreamSource(e)},s.isFunction(t)&&t()}.bind(o);navigator.mediaDevices.getUserMedia?navigator.mediaDevices.getUserMedia({audio:!0}).then(n).catch(i):navigator.getUserMedia({audio:!0},n,i)}.bind(this)(e,t):"script"===e.source?c.bind(this)(e.options,t):"sound"===e.source?function(e,t){this.getRawSourceNode=e.sound.getRawSourceNode,e.sound.sourceNode&&u.Util.isOscillator(e.sound.sourceNode)&&(this.sourceNode=this.getRawSourceNode(),this.frequency=e.sound.frequency)}.bind(this)(e.options,t):"buffer"===e.source&&function(e,t){var i=Array.isArray(e)?e[0]:e;i instanceof AudioBuffer?(this.getRawSourceNode=function(){let e=h.context.createBufferSource();return e.loop=this.loop,e.buffer=i,e},"function"==typeof t&&t()):console.error("Invalid buffer provided. Expected an AudioBuffer.")}.bind(this)(e.options.buffer,t):a.bind(this)({},t)},h.Sound.prototype=Object.create(h.Events,{play:{enumerable:!0,value:function(e,t){this.playing||(u.Util.isNumber(t)||(t=this.offsetTime||0),u.Util.isNumber(e)||(e=0),this.playing=!0,this.paused=!1,this.sourceNode=this.getSourceNode(),this.applyAttack(),u.Util.isFunction(this.sourceNode.start)&&(this.lastTimePlayed=h.context.currentTime-t,this.sourceNode.start(u.context.currentTime+e,t)),this.trigger("play"))}},stop:{enumerable:!0,value:function(){(this.paused||this.playing)&&(this.paused=this.playing=!1,this.stopWithRelease(),this.offsetTime=0,this.trigger("stop"))}},pause:{enumerable:!0,value:function(){var e;!this.paused&&this.playing&&(this.paused=!0,this.playing=!1,this.stopWithRelease(),e=u.context.currentTime-this.lastTimePlayed,this.sourceNode.buffer?this.offsetTime=e%(this.sourceNode.buffer.length/u.context.sampleRate):this.offsetTime=e,this.trigger("pause"))}},clone:{enumerable:!0,value:function(){for(var e=new h.Sound({source:"sound",options:{loop:this.loop,attack:this.attack,release:this.release,volume:this.volume,sound:this}}),t=0;t<this.effects.length;t++)e.addEffect(this.effects[t]);return e}},onEnded:{enumerable:!0,value:function(e){return function(){this.sourceNode&&this.sourceNode!==e||(this.playing&&this.stop(),this.paused||this.trigger("end"))}}},addEffect:{enumerable:!0,value:function(e){if(!u.Util.isEffect(e))return console.error("The object provided is not a Pizzicato effect."),this;this.effects.push(e);var t=0<this.effectConnectors.length?this.effectConnectors[this.effectConnectors.length-1]:this.fadeNode;t.disconnect(),t.connect(e);t=u.context.createGain();return this.effectConnectors.push(t),e.connect(t),t.connect(this.masterVolume),this}},removeEffect:{enumerable:!0,value:function(e){var t=this.effects.indexOf(e);if(-1===t)return console.warn("Cannot remove effect that is not applied to this sound."),this;var i=this.playing;i&&this.pause();var n=0===t?this.fadeNode:this.effectConnectors[t-1];n.disconnect();var o=this.effectConnectors[t];return o.disconnect(),e.disconnect(o),this.effectConnectors.splice(t,1),this.effects.splice(t,1),t=t>this.effects.length-1||0===this.effects.length?this.masterVolume:this.effects[t],n.connect(t),i&&this.play(),this}},connect:{enumerable:!0,value:function(e){return this.masterVolume.connect(e),this}},disconnect:{enumerable:!0,value:function(e){return this.masterVolume.disconnect(e),this}},connectEffects:{enumerable:!0,value:function(){for(var e=[],t=0;t<this.effects.length;t++){var i=t===this.effects.length-1?this.masterVolume:this.effects[t+1].inputNode;e[t]=u.context.createGain(),this.effects[t].outputNode.disconnect(this.effectConnectors[t]),this.effects[t].outputNode.connect(i)}}},volume:{enumerable:!0,get:function(){if(this.masterVolume)return this.masterVolume.gain.value},set:function(e){u.Util.isInRange(e,0,1)&&this.masterVolume&&(this.masterVolume.gain.value=e)}},frequency:{enumerable:!0,get:function(){return this.sourceNode&&u.Util.isOscillator(this.sourceNode)?this.sourceNode.frequency.value:null},set:function(e){this.sourceNode&&u.Util.isOscillator(this.sourceNode)&&(this.sourceNode.frequency.value=e)}},sustain:{enumerable:!0,get:function(){return console.warn("'sustain' is deprecated. Use 'release' instead."),this.release},set:function(e){console.warn("'sustain' is deprecated. Use 'release' instead."),u.Util.isInRange(e,0,10)&&(this.release=e)}},getSourceNode:{enumerable:!0,value:function(){var e;this.sourceNode&&((e=this.sourceNode).gainSuccessor.gain.setValueAtTime(e.gainSuccessor.gain.value,u.context.currentTime),e.gainSuccessor.gain.linearRampToValueAtTime(1e-4,u.context.currentTime+.2),setTimeout(function(){e.disconnect(),e.gainSuccessor.disconnect()},200));var t=this.getRawSourceNode();return t.gainSuccessor=u.context.createGain(),t.connect(t.gainSuccessor),t.gainSuccessor.connect(this.fadeNode),this.fadeNode.connect(this.getInputNode()),u.Util.isAudioBufferSourceNode(t)&&(t.onended=this.onEnded(t).bind(this)),t}},getInputNode:{enumerable:!0,value:function(){return 0<this.effects.length?this.effects[0].inputNode:this.masterVolume}},applyAttack:{enumerable:!1,value:function(){var e,t;this.fadeNode.gain.value;this.fadeNode.gain.cancelScheduledValues(u.context.currentTime),this.attack?(e=-1<navigator.userAgent.toLowerCase().indexOf("firefox"),t=this.attack,e||(t=(1-this.fadeNode.gain.value)*this.attack),this.fadeNode.gain.setTargetAtTime(1,u.context.currentTime,2*t)):this.fadeNode.gain.setTargetAtTime(1,u.context.currentTime,.001)}},stopWithRelease:{enumerable:!1,value:function(e){function t(){return u.Util.isFunction(i.stop)?i.stop(0):i.disconnect()}var i=this.sourceNode;this.fadeNode.gain.value;if(this.fadeNode.gain.cancelScheduledValues(u.context.currentTime),!this.release)return this.fadeNode.gain.setTargetAtTime(0,u.context.currentTime,.001),void t();var n=-1<navigator.userAgent.toLowerCase().indexOf("firefox"),o=this.release;n||(o=this.fadeNode.gain.value*this.release),this.fadeNode.gain.setTargetAtTime(1e-5,u.context.currentTime,o/5),window.setTimeout(function(){t()},1e3*o)}}}),h.Group=function(e){e=e||[],this.mergeGainNode=u.context.createGain(),this.masterVolume=u.context.createGain(),this.sounds=[],this.effects=[],this.effectConnectors=[],this.mergeGainNode.connect(this.masterVolume),this.masterVolume.connect(u.masterGainNode);for(var t=0;t<e.length;t++)this.addSound(e[t])},h.Group.prototype=Object.create(u.Events,{connect:{enumerable:!0,value:function(e){return this.masterVolume.connect(e),this}},disconnect:{enumerable:!0,value:function(e){return this.masterVolume.disconnect(e),this}},addSound:{enumerable:!0,value:function(e){u.Util.isSound(e)?-1<this.sounds.indexOf(e)?console.warn("The Pizzicato.Sound object was already added to this group"):e.detached?console.warn("Groups do not support detached sounds. You can manually create an audio graph to group detached sounds together."):(e.disconnect(u.masterGainNode),e.connect(this.mergeGainNode),this.sounds.push(e)):console.error("You can only add Pizzicato.Sound objects")}},removeSound:{enumerable:!0,value:function(e){var t=this.sounds.indexOf(e);-1!==t?(e.disconnect(this.mergeGainNode),e.connect(u.masterGainNode),this.sounds.splice(t,1)):console.warn("Cannot remove a sound that is not part of this group.")}},volume:{enumerable:!0,get:function(){if(this.masterVolume)return this.masterVolume.gain.value},set:function(e){u.Util.isInRange(e,0,1)&&(this.masterVolume.gain.value=e)}},play:{enumerable:!0,value:function(){for(var e=0;e<this.sounds.length;e++)this.sounds[e].play();this.trigger("play")}},stop:{enumerable:!0,value:function(){for(var e=0;e<this.sounds.length;e++)this.sounds[e].stop();this.trigger("stop")}},pause:{enumerable:!0,value:function(){for(var e=0;e<this.sounds.length;e++)this.sounds[e].pause();this.trigger("pause")}},addEffect:{enumerable:!0,value:function(e){if(!u.Util.isEffect(e))return console.error("The object provided is not a Pizzicato effect."),this;this.effects.push(e);var t=0<this.effectConnectors.length?this.effectConnectors[this.effectConnectors.length-1]:this.mergeGainNode;t.disconnect(),t.connect(e);t=u.context.createGain();return this.effectConnectors.push(t),e.connect(t),t.connect(this.masterVolume),this}},removeEffect:{enumerable:!0,value:function(e){var t=this.effects.indexOf(e);if(-1===t)return console.warn("Cannot remove effect that is not applied to this group."),this;var i=0===t?this.mergeGainNode:this.effectConnectors[t-1];i.disconnect();var n=this.effectConnectors[t];return n.disconnect(),e.disconnect(n),this.effectConnectors.splice(t,1),this.effects.splice(t,1),t=t>this.effects.length-1||0===this.effects.length?this.masterVolume:this.effects[t],i.connect(t),this}}}),h.Effects={};e=Object.create(null,{connect:{enumerable:!0,value:function(e){return this.outputNode.connect(e),this}},disconnect:{enumerable:!0,value:function(e){return this.outputNode.disconnect(e),this}}});function o(e,t){this.options={},e=e||this.options;var i,n={frequency:350,peak:1};for(i in this.inputNode=this.filterNode=u.context.createBiquadFilter(),this.filterNode.type=t,this.outputNode=h.context.createGain(),this.filterNode.connect(this.outputNode),n)this[i]=e[i],this[i]=(void 0===this[i]||null===this[i]?n:this)[i]}h.Effects.Delay=function(e){this.options={},e=e||this.options;var t,i={feedback:.5,time:.3,mix:.5};for(t in this.inputNode=h.context.createGain(),this.outputNode=h.context.createGain(),this.dryGainNode=h.context.createGain(),this.wetGainNode=h.context.createGain(),this.feedbackGainNode=h.context.createGain(),this.delayNode=h.context.createDelay(),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.delayNode.connect(this.feedbackGainNode),this.feedbackGainNode.connect(this.delayNode),this.inputNode.connect(this.delayNode),this.delayNode.connect(this.wetGainNode),this.wetGainNode.connect(this.outputNode),i)this[t]=e[t],this[t]=(void 0===this[t]||null===this[t]?i:this)[t]},h.Effects.Delay.prototype=Object.create(e,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(e){u.Util.isInRange(e,0,1)&&(this.options.mix=e,this.dryGainNode.gain.value=h.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=h.Util.getWetLevel(this.mix))}},time:{enumerable:!0,get:function(){return this.options.time},set:function(e){u.Util.isInRange(e,0,180)&&(this.options.time=e,this.delayNode.delayTime.value=e)}},feedback:{enumerable:!0,get:function(){return this.options.feedback},set:function(e){u.Util.isInRange(e,0,1)&&(this.options.feedback=parseFloat(e,10),this.feedbackGainNode.gain.value=this.feedback)}}}),h.Effects.Compressor=function(e){this.options={},e=e||this.options;var t,i={threshold:-24,knee:30,attack:.003,release:.25,ratio:12};for(t in this.inputNode=this.compressorNode=h.context.createDynamicsCompressor(),this.outputNode=h.context.createGain(),this.compressorNode.connect(this.outputNode),i)this[t]=e[t],this[t]=(void 0===this[t]||null===this[t]?i:this)[t]},h.Effects.Compressor.prototype=Object.create(e,{threshold:{enumerable:!0,get:function(){return this.compressorNode.threshold.value},set:function(e){h.Util.isInRange(e,-100,0)&&(this.compressorNode.threshold.value=e)}},knee:{enumerable:!0,get:function(){return this.compressorNode.knee.value},set:function(e){h.Util.isInRange(e,0,40)&&(this.compressorNode.knee.value=e)}},attack:{enumerable:!0,get:function(){return this.compressorNode.attack.value},set:function(e){h.Util.isInRange(e,0,1)&&(this.compressorNode.attack.value=e)}},release:{enumerable:!0,get:function(){return this.compressorNode.release.value},set:function(e){h.Util.isInRange(e,0,1)&&(this.compressorNode.release.value=e)}},ratio:{enumerable:!0,get:function(){return this.compressorNode.ratio.value},set:function(e){h.Util.isInRange(e,1,20)&&(this.compressorNode.ratio.value=e)}},getCurrentGainReduction:function(){return this.compressorNode.reduction}}),h.Effects.LowPassFilter=function(e){o.call(this,e,"lowpass")},h.Effects.HighPassFilter=function(e){o.call(this,e,"highpass")};t=Object.create(e,{frequency:{enumerable:!0,get:function(){return this.filterNode.frequency.value},set:function(e){h.Util.isInRange(e,10,22050)&&(this.filterNode.frequency.value=e)}},peak:{enumerable:!0,get:function(){return this.filterNode.Q.value},set:function(e){h.Util.isInRange(e,1e-4,1e3)&&(this.filterNode.Q.value=e)}}});function s(){for(var e,t=u.context.sampleRate*this.time,i=h.context.createBuffer(2,t,u.context.sampleRate),n=i.getChannelData(0),o=i.getChannelData(1),s=0;s<t;s++)e=this.reverse?t-s:s,n[s]=(2*Math.random()-1)*Math.pow(1-e/t,this.decay),o[s]=(2*Math.random()-1)*Math.pow(1-e/t,this.decay);this.reverbNode.buffer&&(this.inputNode.disconnect(this.reverbNode),this.reverbNode.disconnect(this.wetGainNode),this.reverbNode=h.context.createConvolver(),this.inputNode.connect(this.reverbNode),this.reverbNode.connect(this.wetGainNode)),this.reverbNode.buffer=i}h.Effects.LowPassFilter.prototype=t,h.Effects.HighPassFilter.prototype=t,h.Effects.Distortion=function(e){this.options={},e=e||this.options;var t,i={gain:.5};for(t in this.waveShaperNode=h.context.createWaveShaper(),this.inputNode=this.outputNode=this.waveShaperNode,i)this[t]=e[t],this[t]=(void 0===this[t]||null===this[t]?i:this)[t]},h.Effects.Distortion.prototype=Object.create(e,{gain:{enumerable:!0,get:function(){return this.options.gain},set:function(e){u.Util.isInRange(e,0,1)&&(this.options.gain=e,this.adjustGain())}},adjustGain:{writable:!1,configurable:!1,enumerable:!1,value:function(){for(var e,t=u.Util.isNumber(this.options.gain)?parseInt(100*this.options.gain,10):50,i=new Float32Array(44100),n=Math.PI/180,o=0;o<44100;++o)e=2*o/44100-1,i[o]=(3+t)*e*20*n/(Math.PI+t*Math.abs(e));this.waveShaperNode.curve=i}}}),h.Effects.Flanger=function(e){this.options={},e=e||this.options;var t,i={time:.45,speed:.2,depth:.1,feedback:.1,mix:.5};for(t in this.inputNode=h.context.createGain(),this.outputNode=h.context.createGain(),this.inputFeedbackNode=h.context.createGain(),this.wetGainNode=h.context.createGain(),this.dryGainNode=h.context.createGain(),this.delayNode=h.context.createDelay(),this.oscillatorNode=h.context.createOscillator(),this.gainNode=h.context.createGain(),this.feedbackNode=h.context.createGain(),this.oscillatorNode.type="sine",this.inputNode.connect(this.inputFeedbackNode),this.inputNode.connect(this.dryGainNode),this.inputFeedbackNode.connect(this.delayNode),this.inputFeedbackNode.connect(this.wetGainNode),this.delayNode.connect(this.wetGainNode),this.delayNode.connect(this.feedbackNode),this.feedbackNode.connect(this.inputFeedbackNode),this.oscillatorNode.connect(this.gainNode),this.gainNode.connect(this.delayNode.delayTime),this.dryGainNode.connect(this.outputNode),this.wetGainNode.connect(this.outputNode),this.oscillatorNode.start(0),i)this[t]=e[t],this[t]=(void 0===this[t]||null===this[t]?i:this)[t]},h.Effects.Flanger.prototype=Object.create(e,{time:{enumberable:!0,get:function(){return this.options.time},set:function(e){u.Util.isInRange(e,0,1)&&(this.options.time=e,this.delayNode.delayTime.value=u.Util.normalize(e,.001,.02))}},speed:{enumberable:!0,get:function(){return this.options.speed},set:function(e){u.Util.isInRange(e,0,1)&&(this.options.speed=e,this.oscillatorNode.frequency.value=u.Util.normalize(e,.5,5))}},depth:{enumberable:!0,get:function(){return this.options.depth},set:function(e){u.Util.isInRange(e,0,1)&&(this.options.depth=e,this.gainNode.gain.value=u.Util.normalize(e,5e-4,.005))}},feedback:{enumberable:!0,get:function(){return this.options.feedback},set:function(e){u.Util.isInRange(e,0,1)&&(this.options.feedback=e,this.feedbackNode.gain.value=u.Util.normalize(e,0,.8))}},mix:{enumberable:!0,get:function(){return this.options.mix},set:function(e){u.Util.isInRange(e,0,1)&&(this.options.mix=e,this.dryGainNode.gain.value=h.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=h.Util.getWetLevel(this.mix))}}}),h.Effects.Panner3D=function(e){this.options={},e=e||this.options;var t,i={x:0,y:0,z:0,panningModel:"HRTF",distanceModel:"inverse",refDistance:1,maxDistance:1e4,rolloffFactor:1};if(this.inputNode=h.context.createGain(),this.outputNode=h.context.createGain(),!h.context.createPanner)return console.warn("Your browser does not support 3D PannerNode."),void this.inputNode.connect(this.outputNode);for(t in this.pannerNode=h.context.createPanner(),this.pannerNode.panningModel=i.panningModel,this.pannerNode.distanceModel=i.distanceModel,this.pannerNode.refDistance=i.refDistance,this.pannerNode.maxDistance=i.maxDistance,this.pannerNode.rolloffFactor=i.rolloffFactor,this.inputNode.connect(this.pannerNode),this.pannerNode.connect(this.outputNode),i)this.options[t]=(void 0!==e[t]?e:i)[t];this.pannerNode.setPosition(this.options.x,this.options.y,this.options.z)},h.Effects.Panner3D.prototype=Object.create(e,{x:{enumerable:!0,get:function(){return this.options.x},set:function(e){this.options.x=e,this._updatePosition()}},y:{enumerable:!0,get:function(){return this.options.y},set:function(e){this.options.y=e,this._updatePosition()}},z:{enumerable:!0,get:function(){return this.options.z},set:function(e){this.options.z=e,this._updatePosition()}},_updatePosition:{value:function(){this.pannerNode&&"function"==typeof this.pannerNode.setPosition&&this.pannerNode.setPosition(this.options.x,this.options.y,this.options.z)}}}),h.Effects.StereoPanner=function(e){this.options={},e=e||this.options;var t,i={pan:0};for(t in this.inputNode=h.context.createGain(),this.outputNode=h.context.createGain(),h.context.createStereoPanner?(this.pannerNode=h.context.createStereoPanner(),this.inputNode.connect(this.pannerNode),this.pannerNode.connect(this.outputNode)):h.context.createPanner?(console.warn("Your browser does not support the StereoPannerNode. Will use PannerNode instead."),this.pannerNode=h.context.createPanner(),this.pannerNode.type="equalpower",this.inputNode.connect(this.pannerNode),this.pannerNode.connect(this.outputNode)):(console.warn("Your browser does not support the Panner effect."),this.inputNode.connect(this.outputNode)),i)this[t]=e[t],this[t]=(void 0===this[t]||null===this[t]?i:this)[t]},h.Effects.StereoPanner.prototype=Object.create(e,{pan:{enumerable:!0,get:function(){return this.options.pan},set:function(e){u.Util.isInRange(e,-1,1)&&(this.options.pan=e,this.pannerNode&&(-1<this.pannerNode.toString().indexOf("StereoPannerNode")?this.pannerNode.pan.value=e:this.pannerNode.setPosition(e,0,1-Math.abs(e))))}}}),h.Effects.Convolver=function(t,e){this.options={},t=t||this.options;var i,n=this,o=new XMLHttpRequest,s={mix:.5};for(i in this.callback=e,this.inputNode=h.context.createGain(),this.convolverNode=h.context.createConvolver(),this.outputNode=h.context.createGain(),this.wetGainNode=h.context.createGain(),this.dryGainNode=h.context.createGain(),this.inputNode.connect(this.convolverNode),this.convolverNode.connect(this.wetGainNode),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.wetGainNode.connect(this.outputNode),s)this[i]=t[i],this[i]=(void 0===this[i]||null===this[i]?s:this)[i];t.impulse?(o.open("GET",t.impulse,!0),o.responseType="arraybuffer",o.onload=function(e){e=e.target.response;h.context.decodeAudioData(e,function(e){n.convolverNode.buffer=e,n.callback&&u.Util.isFunction(n.callback)&&n.callback()},function(e){e=e||new Error("Error decoding impulse file"),n.callback&&u.Util.isFunction(n.callback)&&n.callback(e)})},o.onreadystatechange=function(e){4===o.readyState&&200!==o.status&&console.error("Error while fetching "+t.impulse+". "+o.statusText)},o.send()):console.error("No impulse file specified.")},h.Effects.Convolver.prototype=Object.create(e,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(e){u.Util.isInRange(e,0,1)&&(this.options.mix=e,this.dryGainNode.gain.value=h.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=h.Util.getWetLevel(this.mix))}}}),h.Effects.PingPongDelay=function(e){this.options={},e=e||this.options;var t,i={feedback:.5,time:.3,mix:.5};for(t in this.inputNode=h.context.createGain(),this.outputNode=h.context.createGain(),this.delayNodeLeft=h.context.createDelay(),this.delayNodeRight=h.context.createDelay(),this.dryGainNode=h.context.createGain(),this.wetGainNode=h.context.createGain(),this.feedbackGainNode=h.context.createGain(),this.channelMerger=h.context.createChannelMerger(2),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.delayNodeLeft.connect(this.channelMerger,0,0),this.delayNodeRight.connect(this.channelMerger,0,1),this.delayNodeLeft.connect(this.delayNodeRight),this.feedbackGainNode.connect(this.delayNodeLeft),this.delayNodeRight.connect(this.feedbackGainNode),this.inputNode.connect(this.feedbackGainNode),this.channelMerger.connect(this.wetGainNode),this.wetGainNode.connect(this.outputNode),i)this[t]=e[t],this[t]=(void 0===this[t]||null===this[t]?i:this)[t]},h.Effects.PingPongDelay.prototype=Object.create(e,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(e){u.Util.isInRange(e,0,1)&&(this.options.mix=e,this.dryGainNode.gain.value=h.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=h.Util.getWetLevel(this.mix))}},time:{enumerable:!0,get:function(){return this.options.time},set:function(e){u.Util.isInRange(e,0,180)&&(this.options.time=e,this.delayNodeLeft.delayTime.value=e,this.delayNodeRight.delayTime.value=e)}},feedback:{enumerable:!0,get:function(){return this.options.feedback},set:function(e){u.Util.isInRange(e,0,1)&&(this.options.feedback=parseFloat(e,10),this.feedbackGainNode.gain.value=this.feedback)}}}),h.Effects.Reverb=function(e){this.options={},e=e||this.options;var t,i={mix:.5,time:.01,decay:.01,reverse:!1};for(t in this.inputNode=h.context.createGain(),this.reverbNode=h.context.createConvolver(),this.outputNode=h.context.createGain(),this.wetGainNode=h.context.createGain(),this.dryGainNode=h.context.createGain(),this.inputNode.connect(this.reverbNode),this.reverbNode.connect(this.wetGainNode),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.wetGainNode.connect(this.outputNode),i)this[t]=e[t],this[t]=(void 0===this[t]||null===this[t]?i:this)[t];s.bind(this)()},h.Effects.Reverb.prototype=Object.create(e,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(e){u.Util.isInRange(e,0,1)&&(this.options.mix=e,this.dryGainNode.gain.value=h.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=h.Util.getWetLevel(this.mix))}},time:{enumerable:!0,get:function(){return this.options.time},set:function(e){u.Util.isInRange(e,1e-4,10)&&(this.options.time=e,s.bind(this)())}},decay:{enumerable:!0,get:function(){return this.options.decay},set:function(e){u.Util.isInRange(e,1e-4,10)&&(this.options.decay=e,s.bind(this)())}},reverse:{enumerable:!0,get:function(){return this.options.reverse},set:function(e){u.Util.isBool(e)&&(this.options.reverse=e,s.bind(this)())}}}),h.Effects.Bitcrusher=function(e){const r=u.context;this.inputNode=r.createGain(),this.outputNode=r.createGain(),this.bits=e.bits||4,this.frequency=e.frequency||44100,this.crusherNode=r.createScriptProcessor(4096,1,1);var c=this;this.crusherNode.onaudioprocess=function(e){const t=e.inputBuffer,i=e.outputBuffer;var n=Math.pow(.5,c.bits-1),o=c.frequency/r.sampleRate;for(let e=0;e<i.numberOfChannels;e++){var s=t.getChannelData(e);const a=i.getChannelData(e);for(let e=0;e<s.length;e++)e%o==0?a[e]=Math.floor(s[e]/n)*n:a[e]=a[e-1]}},this.inputNode.connect(this.crusherNode),this.crusherNode.connect(this.outputNode),this.connect=function(e){this.outputNode.connect(e)},this.disconnect=function(){this.outputNode.disconnect()}},h.Effects.Bitcrusher.prototype={constructor:h.Effects.Bitcrusher,setBits:function(e){1<=e&&e<=16&&(this.bits=e)},getBits:function(){return this.bits},setFrequency:function(e){0<e&&(this.frequency=e)},getFrequency:function(){return this.frequency}},h.Effects.ThreeBandEqualizer=function(e){(function(e){this.options={},e=e||this.options;var t,i={cutoff_frequency_low:100,cutoff_frequency_high:8e3,low_band_gain:1,mid_band_gain:1,high_band_gain:1,low_peak:1,mid_peak:1,high_peak:1};for(t in this.inputNode=u.context.createGain(),this.outputNode=u.context.createGain(),this.lowFilterNode=u.context.createBiquadFilter(),this.lowFilterNode.type="lowpass",this.inputNode.connect(this.lowFilterNode),this.lowGainNode=u.context.createGain(),this.lowFilterNode.connect(this.lowGainNode),this.midFilterNode=u.context.createBiquadFilter(),this.midFilterNode.type="bandpass",this.inputNode.connect(this.midFilterNode),this.midGainNode=u.context.createGain(),this.midFilterNode.connect(this.midGainNode),this.highFilterNode=u.context.createBiquadFilter(),this.highFilterNode.type="highpass",this.inputNode.connect(this.highFilterNode),this.highGainNode=u.context.createGain(),this.highFilterNode.connect(this.highGainNode),this.analyserNode=u.context.createAnalyser(),this.lowGainNode.connect(this.analyserNode),this.midGainNode.connect(this.analyserNode),this.highGainNode.connect(this.analyserNode),this.analyserNode.connect(this.outputNode),this.analyserNode.minDecibels=-90,this.analyserNode.maxDecibels=15,this.analyserNode.smoothingTimeConstant=.85,this.analyserNode.fftSize=256,this.options.cutoff_frequency_low=i.cutoff_frequency_low,this.options.cutoff_frequency_high=i.cutoff_frequency_high,i)this[t]=e[t],this[t]=(void 0===this[t]||null===this[t]?i:this)[t]}).call(this,e)};t=Object.create(e,{cutoff_frequency_low:{enumerable:!0,get:function(){return this.options.cutoff_frequency_low},set:function(e){h.Util.isInRange(e,10,22050)&&(this.options.cutoff_frequency_low=e,this.lowFilterNode.frequency.value=e,this.midFilterNode.frequency.value=.707*(this.options.cutoff_frequency_low+this.options.cutoff_frequency_high))}},cutoff_frequency_high:{enumerable:!0,get:function(){return this.options.cutoff_frequency_high},set:function(e){h.Util.isInRange(e,10,22050)&&(this.options.cutoff_frequency_high=e,this.highFilterNode.frequency.value=e,this.midFilterNode.frequency.value=.707*(this.options.cutoff_frequency_low+this.options.cutoff_frequency_high))}},low_band_gain:{enumerable:!0,get:function(){return this.options.low_band_gain},set:function(e){h.Util.isInRange(e,-40,15)&&(this.options.low_band_gain=e,this.lowGainNode.gain.value=Math.pow(10,e/20))}},mid_band_gain:{enumerable:!0,get:function(){return this.options.mid_band_gain},set:function(e){h.Util.isInRange(e,-40,15)&&(this.options.mid_band_gain=e,this.midGainNode.gain.value=Math.pow(10,e/20))}},high_band_gain:{enumerable:!0,get:function(){return this.options.high_band_gain},set:function(e){h.Util.isInRange(e,-40,15)&&(this.options.high_band_gain=e,this.highGainNode.gain.value=Math.pow(10,e/20))}},low_peak:{enumerable:!0,get:function(){return this.lowFilterNode.Q.value},set:function(e){h.Util.isInRange(e,1e-4,100)&&(this.lowFilterNode.Q.value=e)}},mid_peak:{enumerable:!0,get:function(){return this.midFilterNode.Q.value},set:function(e){h.Util.isInRange(e,1e-4,100)&&(this.midFilterNode.Q.value=e)}},high_peak:{enumerable:!0,get:function(){return this.highFilterNode.Q.value},set:function(e){h.Util.isInRange(e,1e-4,1e3)&&(this.highFilterNode.Q.value=e)}},visualizerBinCount:{enumerable:!0,get:function(){return this.analyserNode.frequencyBinCount},set:function(e){h.Util.isInRange(e,16,1024)&&(this.analyzerNode.fftSize=e)}},analyser:{enumerable:!0,get:function(){return this.analyserNode}},frequencyData:{enumerable:!0,get:function(){return void 0===this.byteFrequencyData&&(this.byteFrequencyData=new Uint8Array(this.analyserNode.frequencyBinCount.value)),this.analyserNode.getByteFrequencyData(this.FrequencyData),this.byteFrequencyData}}});h.Effects.ThreeBandEqualizer.prototype=t,h.Effects.Tremolo=function(e){this.options={},e=e||this.options;var t,i={speed:4,depth:1,mix:.8};for(t in this.inputNode=h.context.createGain(),this.outputNode=h.context.createGain(),this.dryGainNode=h.context.createGain(),this.wetGainNode=h.context.createGain(),this.tremoloGainNode=h.context.createGain(),this.tremoloGainNode.gain.value=0,this.lfoNode=h.context.createOscillator(),this.shaperNode=h.context.createWaveShaper(),this.shaperNode.curve=new Float32Array([0,1]),this.shaperNode.connect(this.tremoloGainNode.gain),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.lfoNode.connect(this.shaperNode),this.lfoNode.type="sine",this.lfoNode.start(0),this.inputNode.connect(this.tremoloGainNode),this.tremoloGainNode.connect(this.wetGainNode),this.wetGainNode.connect(this.outputNode),i)this[t]=e[t],this[t]=(void 0===this[t]||null===this[t]?i:this)[t]},h.Effects.Tremolo.prototype=Object.create(e,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(e){u.Util.isInRange(e,0,1)&&(this.options.mix=e,this.dryGainNode.gain.value=h.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=h.Util.getWetLevel(this.mix))}},speed:{enumerable:!0,get:function(){return this.options.speed},set:function(e){u.Util.isInRange(e,0,20)&&(this.options.speed=e,this.lfoNode.frequency.value=e)}},depth:{enumerable:!0,get:function(){return this.options.depth},set:function(e){u.Util.isInRange(e,0,1)&&(this.options.depth=e,this.shaperNode.curve=new Float32Array([1-e,1]))}}}),h.Effects.DubDelay=function(e){this.options={},e=e||this.options;var t,i={feedback:.6,time:.7,mix:.5,cutoff:700};for(t in this.inputNode=h.context.createGain(),this.outputNode=h.context.createGain(),this.dryGainNode=h.context.createGain(),this.wetGainNode=h.context.createGain(),this.feedbackGainNode=h.context.createGain(),this.delayNode=h.context.createDelay(),this.bqFilterNode=h.context.createBiquadFilter(),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.inputNode.connect(this.wetGainNode),this.inputNode.connect(this.feedbackGainNode),this.feedbackGainNode.connect(this.bqFilterNode),this.bqFilterNode.connect(this.delayNode),this.delayNode.connect(this.feedbackGainNode),this.delayNode.connect(this.wetGainNode),this.wetGainNode.connect(this.outputNode),i)this[t]=e[t],this[t]=(void 0===this[t]||null===this[t]?i:this)[t]},h.Effects.DubDelay.prototype=Object.create(e,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(e){u.Util.isInRange(e,0,1)&&(this.options.mix=e,this.dryGainNode.gain.value=h.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=h.Util.getWetLevel(this.mix))}},time:{enumerable:!0,get:function(){return this.options.time},set:function(e){u.Util.isInRange(e,0,180)&&(this.options.time=e,this.delayNode.delayTime.value=e)}},feedback:{enumerable:!0,get:function(){return this.options.feedback},set:function(e){u.Util.isInRange(e,0,1)&&(this.options.feedback=parseFloat(e,10),this.feedbackGainNode.gain.value=this.feedback)}},cutoff:{enumerable:!0,get:function(){return this.options.cutoff},set:function(e){u.Util.isInRange(e,0,4e3)&&(this.options.cutoff=e,this.bqFilterNode.frequency.value=this.cutoff)}}}),h.Effects.RingModulator=function(e){this.options={},e=e||this.options;var t,i={speed:30,distortion:1,mix:.5};for(t in this.inputNode=h.context.createGain(),this.outputNode=h.context.createGain(),this.dryGainNode=h.context.createGain(),this.wetGainNode=h.context.createGain(),this.vIn=h.context.createOscillator(),this.vIn.start(0),this.vInGain=h.context.createGain(),this.vInGain.gain.value=.5,this.vInInverter1=h.context.createGain(),this.vInInverter1.gain.value=-1,this.vInInverter2=h.context.createGain(),this.vInInverter2.gain.value=-1,this.vInDiode1=new a(h.context),this.vInDiode2=new a(h.context),this.vInInverter3=h.context.createGain(),this.vInInverter3.gain.value=-1,this.vcInverter1=h.context.createGain(),this.vcInverter1.gain.value=-1,this.vcDiode3=new a(h.context),this.vcDiode4=new a(h.context),this.outGain=h.context.createGain(),this.outGain.gain.value=3,this.compressor=h.context.createDynamicsCompressor(),this.compressor.threshold.value=-24,this.compressor.ratio.value=16,this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.inputNode.connect(this.vcInverter1),this.inputNode.connect(this.vcDiode4.node),this.vcInverter1.connect(this.vcDiode3.node),this.vIn.connect(this.vInGain),this.vInGain.connect(this.vInInverter1),this.vInGain.connect(this.vcInverter1),this.vInGain.connect(this.vcDiode4.node),this.vInInverter1.connect(this.vInInverter2),this.vInInverter1.connect(this.vInDiode2.node),this.vInInverter2.connect(this.vInDiode1.node),this.vInDiode1.connect(this.vInInverter3),this.vInDiode2.connect(this.vInInverter3),this.vInInverter3.connect(this.compressor),this.vcDiode3.connect(this.compressor),this.vcDiode4.connect(this.compressor),this.compressor.connect(this.outGain),this.outGain.connect(this.wetGainNode),this.wetGainNode.connect(this.outputNode),i)this[t]=e[t],this[t]=(void 0===this[t]||null===this[t]?i:this)[t]};var a=function(e){this.context=e,this.node=this.context.createWaveShaper(),this.vb=.2,this.vl=.4,this.h=1,this.setCurve()};function r(e){for(var t=u.context.sampleRate,i=new Float32Array(t),n=Math.PI/180,o=0;o<t;o++){var s=2*o/t-1;i[o]=(3+e)*s*20*n/(Math.PI+e*Math.abs(s))}return i}return a.prototype.setDistortion=function(e){return this.h=e,this.setCurve()},a.prototype.setCurve=function(){for(var e,t,i=new Float32Array(1024),n=t=0,o=i.length;0<=o?t<o:o<t;n=0<=o?++t:--t)e=(n-512)/512,e=(e=Math.abs(e))<=this.vb?0:this.vb<e&&e<=this.vl?this.h*(Math.pow(e-this.vb,2)/(2*this.vl-2*this.vb)):this.h*e-this.h*this.vl+this.h*(Math.pow(this.vl-this.vb,2)/(2*this.vl-2*this.vb)),i[n]=e;return this.node.curve=i},a.prototype.connect=function(e){return this.node.connect(e)},h.Effects.RingModulator.prototype=Object.create(e,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(e){u.Util.isInRange(e,0,1)&&(this.options.mix=e,this.dryGainNode.gain.value=h.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=h.Util.getWetLevel(this.mix))}},speed:{enumerable:!0,get:function(){return this.options.speed},set:function(e){u.Util.isInRange(e,0,2e3)&&(this.options.speed=e,this.vIn.frequency.value=e)}},distortion:{enumerable:!0,get:function(){return this.options.distortion},set:function(e){if(u.Util.isInRange(e,.2,50)){this.options.distortion=parseFloat(e,10);for(var t=[this.vInDiode1,this.vInDiode2,this.vcDiode3,this.vcDiode4],i=0,n=t.length;i<n;i++)t[i].setDistortion(e)}}}}),h.Effects.Quadrafuzz=function(e){this.options={},e=e||this.options;var t={lowGain:.6,midLowGain:.8,midHighGain:.5,highGain:.6};this.inputNode=u.context.createGain(),this.outputNode=u.context.createGain(),this.dryGainNode=u.context.createGain(),this.wetGainNode=u.context.createGain(),this.lowpassLeft=u.context.createBiquadFilter(),this.lowpassLeft.type="lowpass",this.lowpassLeft.frequency.value=147,this.lowpassLeft.Q.value=.7071,this.bandpass1Left=u.context.createBiquadFilter(),this.bandpass1Left.type="bandpass",this.bandpass1Left.frequency.value=587,this.bandpass1Left.Q.value=.7071,this.bandpass2Left=u.context.createBiquadFilter(),this.bandpass2Left.type="bandpass",this.bandpass2Left.frequency.value=2490,this.bandpass2Left.Q.value=.7071,this.highpassLeft=u.context.createBiquadFilter(),this.highpassLeft.type="highpass",this.highpassLeft.frequency.value=4980,this.highpassLeft.Q.value=.7071,this.overdrives=[];for(var i=0;i<4;i++)this.overdrives[i]=u.context.createWaveShaper(),this.overdrives[i].curve=r();this.inputNode.connect(this.wetGainNode),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode);for(var n,o=[this.lowpassLeft,this.bandpass1Left,this.bandpass2Left,this.highpassLeft],i=0;i<o.length;i++)this.wetGainNode.connect(o[i]),o[i].connect(this.overdrives[i]),this.overdrives[i].connect(this.outputNode);for(n in t)this[n]=e[n],this[n]=(void 0===this[n]||null===this[n]?t:this)[n]},h.Effects.Quadrafuzz.prototype=Object.create(e,{lowGain:{enumerable:!0,get:function(){return this.options.lowGain},set:function(e){u.Util.isInRange(e,0,1)&&(this.options.lowGain=e,this.overdrives[0].curve=r(u.Util.normalize(this.lowGain,0,150)))}},midLowGain:{enumerable:!0,get:function(){return this.options.midLowGain},set:function(e){u.Util.isInRange(e,0,1)&&(this.options.midLowGain=e,this.overdrives[1].curve=r(u.Util.normalize(this.midLowGain,0,150)))}},midHighGain:{enumerable:!0,get:function(){return this.options.midHighGain},set:function(e){u.Util.isInRange(e,0,1)&&(this.options.midHighGain=e,this.overdrives[2].curve=r(u.Util.normalize(this.midHighGain,0,150)))}},highGain:{enumerable:!0,get:function(){return this.options.highGain},set:function(e){u.Util.isInRange(e,0,1)&&(this.options.highGain=e,this.overdrives[3].curve=r(u.Util.normalize(this.highGain,0,150)))}}}),h})
  /* eslint-enable */

  const { vm, Cast } = Scratch;
  const runtime = vm.runtime;

  // initialize engine
  const Pizzicato = PzInitializer(runtime.audioEngine.audioContext);
  Pizzicato.masterGainNode.disconnect();
  Pizzicato.masterGainNode.connect(runtime.audioEngine.inputNode);

  const ts3Data = Symbol("ts3Data");
  const simpleEffects = [
    { text: Scratch.translate("pitch"), value: "pitch" },
    { text: Scratch.translate("detune"), value: "detune" },
    { text: Scratch.translate("speed"), value: "speed" },
    { text: Scratch.translate("pan"), value: "pan" },
    { text: Scratch.translate("gain"), value: "gain" },
    { text: Scratch.translate("distortion"), value: "distortion" },
    { text: Scratch.translate("attack"), value: "attack" },
    { text: Scratch.translate("release"), value: "release" },
  ];
  const complexEffects = [
    { text: Scratch.translate("reverb"), value: "reverb" },
    { text: Scratch.translate("delay"), value: "delay" },
    { text: Scratch.translate("pan 3D"), value: "pan3D" },
    { text: Scratch.translate("tremolo"), value: "tremolo" },
    { text: Scratch.translate("fuzz"), value: "fuzz" },
    { text: Scratch.translate("bitcrush"), value: "bitcrush" },
    { text: Scratch.translate("highpass"), value: "highpass" },
    { text: Scratch.translate("lowpass"), value: "lowpass" },
    { text: Scratch.translate("flanger"), value: "flanger" },
    { text: Scratch.translate("compressor"), value: "compressor" },
    { text: Scratch.translate("equalizer"), value: "equalizer" },
  ];

  const clamp = (min, max, value) => {
    return Math.max(min, Math.min(max, value));
  };

  const compareObjects = (obj1, obj2) => {
    for (let k in obj1) {
      if (obj1[k] !== obj2[k]) return false;
    }
    return true;
  };

  let deltaTime = 0,
    prevFrameTime = 0;
  let soundBank = Object.create(null);
  let settings = { flagCtrl: true };

  class SPtuneShark3 {
    constructor() {
      runtime.on("PROJECT_START", () => {
        if (settings.flagCtrl) this.ctrlSounds({ CONTROL: "stop" });
      });
      runtime.on("PROJECT_STOP_ALL", () => {
        if (settings.flagCtrl) this.ctrlSounds({ CONTROL: "stop" });
      });
      runtime.on("RUNTIME_PAUSED", () => {
        this.ctrlSounds({ CONTROL: "pause" });
      });
      runtime.on("RUNTIME_UNPAUSED", () => {
        this.ctrlSounds({ CONTROL: "unpause" });
      });
      runtime.on("BEFORE_EXECUTE", () => {
        const now = performance.now();
        deltaTime = prevFrameTime === 0 ? 0 : (now - prevFrameTime) * 0.001;
        prevFrameTime = now;

        const speedBuffer = runtime.currentStepTime * 0.001;
        Object.values(soundBank).forEach((bank) => {
          if (bank.loaded) {
            const sound = bank.context;
            if (sound.playing) {
              // Increment Current Time
              const leng =
                sound.loop && bank.loopParm[1]
                  ? bank.loopParm[1]
                  : sound.sourceNode.buffer.duration;
              let time = bank.currentTime;
              time += deltaTime * bank.rate;

              if (sound.loop) {
                time =
                  Math.max(0, (time % (leng - bank.loopParm[0])) + 0.00001) +
                  bank.loopParm[0];
              } else {
                time = clamp(0, leng, time);
              }
              bank.currentTime = time;

              // Apply Speed Changes
              if (bank.speed !== 1) {
                const lastTime = bank.currentTime;
                sound.release = speedBuffer;
                sound.stop();
                bank.currentTime = lastTime;
                sound.attack = speedBuffer;
                sound.play(0, lastTime);
                this.updateAudioNodes(sound.sourceNode, bank);
              }
            }
          }
        });
      });
    }
    getInfo() {
      return {
        id: "SPtuneShark3",
        name: Scratch.translate("Tune Shark V3"),
        docsURI: "https://extensions.turbowarp.org/SharkPool/Tune-Shark-V3",
        color1: "#666666",
        menuIconURI,
        blockIconURI,
        blocks: [
          {
            opcode: "importURL",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("import sound from URL [URL] named [NAME]"),
            blockIconURI: extraIcons.set,
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/meow.mp3",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
            },
          },
          {
            opcode: "importMenu",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("import sound [SOUND] named [NAME]"),
            blockIconURI: extraIcons.set,
            arguments: {
              SOUND: { type: Scratch.ArgumentType.SOUND },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
            },
          },
          {
            opcode: "duplicateSound",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("duplicate sound [NAME1] as [NAME2]"),
            blockIconURI: extraIcons.set,
            arguments: {
              NAME1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              NAME2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound2"),
              },
            },
          },
          {
            opcode: "bindSound",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[TYPE] sound [NAME2] and sound [NAME]"),
            blockIconURI: extraIcons.set,
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "bindMenu" },
              NAME2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound2"),
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Audio Playback"),
          },
          {
            opcode: "startSound",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("start sound [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
            },
          },
          {
            opcode: "startSoundAt",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("start sound [NAME] at time [TIME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              TIME: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
            },
          },
          {
            opcode: "playAndStop",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "start sound [NAME] at time [TIME] and stop at [MAX] seconds"
            ),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              TIME: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              MAX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
            },
          },
          {
            opcode: "stopSound",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stop sound [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
            },
          },
          {
            opcode: "pauseSound",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[UN_PAUSE] sound [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              UN_PAUSE: {
                type: Scratch.ArgumentType.STRING,
                menu: "un_pauseMenu",
              },
            },
          },
          "---",
          {
            opcode: "ctrlSounds",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[CONTROL] all sounds"),
            arguments: {
              CONTROL: { type: Scratch.ArgumentType.STRING, menu: "playMenu" },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Audio Operations"),
          },
          {
            opcode: "enableControl",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "toggle sound link to [GO] [STOP] [ON_OFF]"
            ),
            blockIconURI: extraIcons.set,
            arguments: {
              GO: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: extraIcons.flag,
              },
              STOP: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: extraIcons.stop,
              },
              ON_OFF: { type: Scratch.ArgumentType.STRING, menu: "toggleMenu" },
            },
          },
          {
            opcode: "toggleOverlap",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("toggle sound [NAME] overlapping [TYPE]"),
            blockIconURI: extraIcons.set,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "toggleMenu" },
            },
          },
          {
            opcode: "toggleReverse",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("toggle sound [NAME] reverse mode [TYPE]"),
            blockIconURI: extraIcons.set,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "toggleMenu" },
            },
          },
          {
            opcode: "toggleLoop",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("toggle sound [NAME] looping [TYPE]"),
            blockIconURI: extraIcons.set,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "toggleMenu" },
            },
          },
          {
            opcode: "loopParams",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "sound [NAME] loop start [START] end [END]"
            ),
            blockIconURI: extraIcons.set,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              START: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              END: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
            },
          },
          "---",
          {
            opcode: "deleteSound",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete sound [NAME]"),
            blockIconURI: extraIcons.set,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
            },
          },
          {
            opcode: "deleteAllSounds",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete all sounds"),
            blockIconURI: extraIcons.set,
          },
          {
            opcode: "allSounds",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("all sounds"),
            blockIconURI: extraIcons.set,
          },
          {
            opcode: "allPlaySounds",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("all playing sounds"),
            blockIconURI: extraIcons.set,
          },
          "---",
          {
            opcode: "whenSound",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when sound [NAME] [CONTROL]"),
            isEdgeActivated: false,
            blockIconURI: extraIcons.set,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              CONTROL: { type: Scratch.ArgumentType.STRING, menu: "hatPlayer" },
            },
          },
          {
            opcode: "soundCheck",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("sound [NAME] [CONTROL] ?"),
            blockIconURI: extraIcons.set,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              CONTROL: {
                type: Scratch.ArgumentType.STRING,
                menu: "soundBools",
              },
            },
          },
          {
            opcode: "soundProperty",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[PROP] of sound [NAME]"),
            blockIconURI: extraIcons.set,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              PROP: { type: Scratch.ArgumentType.STRING, menu: "soundProps" },
            },
          },
          {
            opcode: "getLoudTime",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "[TYPE] of sound [NAME] at time [TIME] in channel [CHANNEL]"
            ),
            blockIconURI: extraIcons.set,
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "loudProps" },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              TIME: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              CHANNEL: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
          },
          {
            opcode: "cropSound",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "crop sound [NAME] at time [START] to [END]"
            ),
            blockIconURI: extraIcons.set,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              START: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              END: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
          },
          {
            opcode: "joinSound",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("join sound [NAME1] and [NAME2]"),
            blockIconURI: extraIcons.set,
            arguments: {
              NAME1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              NAME2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound2"),
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Audio Effects"),
          },
          {
            opcode: "setVol",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set volume of sound [NAME] to [NUM]"),
            blockIconURI: extraIcons.nob,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          {
            opcode: "resetEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("reset [EFFECT] of sound [NAME]"),
            blockIconURI: extraIcons.nob,
            arguments: {
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "effectMenu" },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
            },
          },
          "---",
          {
            opcode: "setThingNew",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [TYPE] of sound [NAME] to [VALUE]"),
            blockIconURI: extraIcons.nob,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "singleEffectNew",
              },
              VALUE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "setReverb",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set reverb of sound [NAME] to time [TIME] decay [DECAY] mix [MIX]"
            ),
            blockIconURI: extraIcons.nob,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              TIME: { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 },
              DECAY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              MIX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
            },
          },
          {
            opcode: "setDelay",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set delay of sound [NAME] to time [TIME] feedback [FEED] mix [MIX]"
            ),
            blockIconURI: extraIcons.nob,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              FEED: { type: Scratch.ArgumentType.NUMBER, defaultValue: 60 },
              TIME: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              MIX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
            },
          },
          {
            opcode: "setPan3D",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set pan 3D of sound [NAME] to x [X] y [Y] z [Z]"
            ),
            blockIconURI: extraIcons.nob,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
            },
          },
          {
            opcode: "setTremolo",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set tremolo of sound [NAME] to speed [SPEED] depth [DEPTH] mix [MIX]"
            ),
            blockIconURI: extraIcons.nob,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              SPEED: { type: Scratch.ArgumentType.NUMBER, defaultValue: 35 },
              DEPTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 80 },
              MIX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          "---",
          {
            opcode: "setFuzz",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set fuzz of sound [NAME] to low [LOW] med-low [MED1] med-high [MED2] high [HIGH] mix [MIX]"
            ),
            blockIconURI: extraIcons.nob,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              LOW: { type: Scratch.ArgumentType.NUMBER, defaultValue: 60 },
              MED1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 80 },
              MED2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              HIGH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 60 },
              MIX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
            },
          },
          {
            opcode: "setBitcrush",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set bitcrush of sound [NAME] bits [BITS] freq [FREQ]"
            ),
            blockIconURI: extraIcons.nob,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              BITS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 65 },
              FREQ: { type: Scratch.ArgumentType.NUMBER, defaultValue: 60000 },
            },
          },
          {
            opcode: "setPass",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set [TYPE] of sound [NAME] to frequency [FREQ] peak [PEAK]"
            ),
            blockIconURI: extraIcons.nob,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "typePass" },
              FREQ: { type: Scratch.ArgumentType.NUMBER, defaultValue: 400 },
              PEAK: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
            },
          },
          {
            opcode: "setFlanger",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set flanger of sound [NAME] to time [TIME] speed [SPEED] depth [DEPTH] feed [FEED] mix [MIX]"
            ),
            blockIconURI: extraIcons.nob,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              TIME: { type: Scratch.ArgumentType.NUMBER, defaultValue: 45 },
              SPEED: { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 },
              DEPTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              FEED: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              MIX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
            },
          },
          {
            opcode: "setCompress",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set compressor of sound [NAME] to threshold [THRESH] knee [KNEE] attack [ATTACK] release [RELEASE] ratio [RATIO]"
            ),
            blockIconURI: extraIcons.nob,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              THRESH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              KNEE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              ATTACK: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              RELEASE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              RATIO: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
            },
          },
          {
            opcode: "setEqualize",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set equalizer of sound [NAME] to gain low [LOW] mid [MID] high [HIGH] cutoff low [CUT_LOW] cutoff high [CUT_HIGH]"
            ),
            blockIconURI: extraIcons.nob,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("MySound"),
              },
              LOW: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              MID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              HIGH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              CUT_LOW: { type: Scratch.ArgumentType.NUMBER, defaultValue: -50 },
              CUT_HIGH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
            },
          },
        ],
        menus: {
          un_pauseMenu: [
            { text: Scratch.translate("pause"), value: "pause" },
            { text: Scratch.translate("unpause"), value: "unpause" },
          ],
          playMenu: [
            { text: Scratch.translate("start"), value: "start" },
            { text: Scratch.translate("stop"), value: "stop" },
            { text: Scratch.translate("pause"), value: "pause" },
            { text: Scratch.translate("unpause"), value: "unpause" },
          ],
          hatPlayer: [
            { text: Scratch.translate("starts"), value: "starts" },
            { text: Scratch.translate("stops"), value: "stops" },
          ],
          toggleMenu: [
            { text: Scratch.translate("on"), value: "on" },
            { text: Scratch.translate("off"), value: "off" },
          ],
          bindMenu: [
            { text: Scratch.translate("bind"), value: "bind" },
            { text: Scratch.translate("unBind"), value: "unBind" },
          ],
          loudProps: [
            { text: Scratch.translate("loudness"), value: "loudness" },
            { text: Scratch.translate("raw noise"), value: "raw noise" },
            { text: Scratch.translate("tone"), value: "tone" },
          ],
          typePass: [
            { text: Scratch.translate("highpass"), value: "highpass" },
            { text: Scratch.translate("lowpass"), value: "lowpass" },
          ],
          singleEffectNew: { acceptReporters: true, items: simpleEffects },
          soundProps: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("length"), value: "length" },
              {
                text: Scratch.translate("current time"),
                value: "current time",
              },
              { text: Scratch.translate("source"), value: "source" },
              {
                text: Scratch.translate("estimated bpm"),
                value: "estimated bpm",
              },
              { text: Scratch.translate("channels"), value: "channels" },
              { text: Scratch.translate("sample rate"), value: "samples" },
              { text: Scratch.translate("fft data"), value: "fft" },
              { text: Scratch.translate("binds"), value: "binds" },
              { text: Scratch.translate("volume"), value: "volume" },
            ].concat(simpleEffects, complexEffects),
          },
          soundBools: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("exists"), value: "exists" },
              { text: Scratch.translate("playing"), value: "playing" },
              { text: Scratch.translate("paused"), value: "paused" },
              { text: Scratch.translate("looped"), value: "looped" },
              { text: Scratch.translate("overlaped"), value: "overlaped" },
              { text: Scratch.translate("reversed"), value: "reversed" },
              { text: Scratch.translate("binded"), value: "binded" },
            ],
          },
          effectMenu: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("all effects"), value: "all effects" },
            ].concat(simpleEffects, complexEffects),
          },
        },
      };
    }

    // Helper Funcs
    startDataHats(data) {
      let newThreads = [];
      runtime.allScriptsByOpcodeDo(
        "SPtuneShark3_whenSound",
        (script, target) => {
          const thread = runtime._pushThread(script.blockId, target);
          thread[ts3Data] = data;
          newThreads.push(thread);
        }
      );
      return newThreads;
    }

    createBankData(name, src, context, isVanilla) {
      return {
        name,
        src,
        context,
        isVanilla,
        effects: {},
        loaded: true,
        reversed: false,
        currentTime: 0,
        gain: 1,
        pitch: 1,
        detune: 0,
        speed: 1,
        attack: 0,
        release: 0,
        rate: 1,
        loopParm: [0, 0],
        overlap: false,
        overlays: [],
        isBind: false,
        binds: {},
        _cache: { loudness: {}, tone: {} },
      };
    }

    getBPM(data, sampleRate) {
      const peaks = [];
      let lastPeakIndex = 0,
        max = 0.1;
      for (let i = 0; i < data.length; i++) {
        if (data[i] > max) max = data[i];
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i] > max - 0.1 && i - lastPeakIndex > sampleRate / 4) {
          peaks.push(i);
          lastPeakIndex = i;
        }
      }
      const intervals = [];
      for (let i = 1; i < peaks.length; i++) {
        intervals.push(peaks[i] - peaks[i - 1]);
      }

      const avgInterval =
        intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const value = Math.round((sampleRate / avgInterval) * 60);
      return isNaN(value) ? 0 : value;
    }

    updateAudioNodes(src, sound) {
      src.playbackRate.value = sound.pitch;
      src.detune.value = sound.detune;
      src.gainSuccessor.gain.value = sound.gain;
      sound.context.attack = sound.attack;
      sound.context.release = sound.release;
      if (src.loop) {
        this.loopParams({
          NAME: sound.name,
          START: sound.loopParm[0],
          END: sound.loopParm[1],
        });
      }
    }

    initEffect(type, rawValues, values) {
      const effectsMapping = {
        PAN: "StereoPanner",
        DISTORTION: "Distortion",
        REVERB: "Reverb",
        DELAY: "Delay",
        FUZZ: "Quadrafuzz",
        BITCRUSH: "Bitcrusher", // NOTE: this uses 'ScriptProcessorNode' which though deprecated are still widely supported
        PAN3D: "Panner3D",
        TREMOLO: "Tremolo",
        HIGHPASS: "HighPassFilter",
        LOWPASS: "LowPassFilter",
        FLANGER: "Flanger",
        COMPRESSOR: "Compressor",
        EQUALIZER: "ThreeBandEqualizer",
      };

      const effect = new Pizzicato.Effects[effectsMapping[type]](values);
      effect.id = type;
      effect.params = values;
      effect.rawParams = rawValues;
      return effect;
    }

    handleEffect(sound, type, rawValues, values) {
      delete rawValues.NAME;
      delete rawValues.TYPE;

      const effect = sound.effects[type];
      if (!effect) {
        const newEffect = this.initEffect(type, rawValues, values);
        sound.context.addEffect(newEffect);
        sound.effects[type] = newEffect;
        return;
      }

      // Dont remove and re-init the effect, this causes lag and audio glitches.
      // Simply just change each effect node value
      const isParamsStatic = compareObjects(values, effect.params);
      if (isParamsStatic) return;

      effect.params = values;
      effect.rawParams = rawValues;
      switch (type) {
        case "PAN": {
          effect.pannerNode.pan.value = values.pan;
          effect.pan = values.pan;
          break;
        }
        case "PAN3D": {
          effect.x = values.x;
          effect.y = values.y;
          effect.z = values.z;
          break;
        }
        case "DISTORTION": {
          effect.gain = values.gain;
          break;
        }
        case "REVERB": {
          effect.time = values.time;
          effect.decay = values.decay;
          effect.mix = values.mix;
          break;
        }
        case "BITCRUSH": {
          effect.frequency = values.frequency;
          effect.bits = values.bits;
          break;
        }
        case "LOWPASS":
        case "HIGHPASS": {
          const freq = values.frequency;
          effect.filterNode.frequency.value = freq;
          effect.inputNode.frequency.value = freq;
          effect.frequency = freq;

          const peak = values.peak;
          effect.filterNode.Q.value = peak;
          effect.inputNode.Q.value = peak;
          effect.peak = peak;
          break;
        }
        case "COMPRESSOR": {
          const node = effect.compressorNode;
          node.knee.value = values.knee;
          node.ratio.value = values.ratio;
          node.threshold.value = values.threshold;
          node.attack.value = values.attack;
          node.release.value = values.release;
          break;
        }
        default: {
          Object.assign(effect, values);
        }
      }
    }

    playSound(sound, atTime, con) {
      try {
        if (sound.playing && con.overlap) {
          // Clone context to soundBank for 'audioControlDo'
          const clone = sound.clone();
          const newName = `${con.name}_COPY_${Math.random()}`;
          soundBank[newName] = {
            ...sound,
            context: clone,
            name: newName,
            loopParm: [0, 0],
            overlap: false,
            overlays: [],
            isBind: false,
            binds: {},
          };
          clone.play(0, atTime);
          clone.sourceNode.playbackRate.value = con.pitch;
          clone.sourceNode.gainSuccessor.gain.value = con.gain;
          const overlayIndex = con.overlays.length;
          con.overlays.push(clone);
          clone.on("end", () => {
            clone.sourceNode.disconnect();
            clone.disconnect();

            con.overlays.splice(overlayIndex, 1);
            delete soundBank[newName];
          });
        } else {
          if (!sound.playing) con.currentTime = atTime;
          sound.play(0, atTime);
          const srcNode = sound.sourceNode;
          this.updateAudioNodes(srcNode, con);
          if (Object.keys(con.binds).length > 0) {
            Object.keys(con.binds).forEach((key) => {
              const thisSound = con.binds[key];
              const context = thisSound.context;
              if (!context.playing) thisSound.currentTime = atTime;
              context.play(0, atTime);
              this.updateAudioNodes(context.sourceNode, thisSound);
            });
          }
          if (sound.loop) {
            this.loopParams({
              NAME: con.name,
              START: con.loopParm[0],
              END: con.loopParm[1],
            });
          }
        }
        this.startDataHats({ name: con.name, type: "starts" });
      } catch {
        console.warn(Scratch.translate("Audio has not loaded yet!"));
        sound.stop(); // Reset
      }
    }

    audioControlDo(sound, type) {
      const ctx = sound.context;
      if (type === "stop") {
        const lastTime = sound.currentTime;
        ctx.stop();
        sound.currentTime = lastTime;
        for (let i = 0; i < sound.overlays.length; i++) {
          sound.overlays[i].stop();
        }
        this.startDataHats({ name: sound.name, type: "stops" });
      } else if (type === "pause") {
        ctx.pause();
        for (let i = 0; i < sound.overlays.length; i++) {
          sound.overlays[i].pause();
        }
        this.startDataHats({ name: sound.name, type: "stops" });
      } else if (type === "unpause") {
        // unpause route
        this.startDataHats({ name: sound.name, type: "starts" });
        if (!ctx.paused) return;
        const lastTime = sound.currentTime;
        ctx.stop();
        sound.currentTime = lastTime;
        ctx.play(0, lastTime);
        this.updateAudioNodes(ctx.sourceNode, sound);
      }
    }

    initSound(engine, name, url, isVanilla) {
      const bank = this.createBankData(name, url, engine, isVanilla);
      soundBank[name] = bank;
      engine.sourceNode = engine.getSourceNode();

      bank.analyser = Pizzicato.context.createAnalyser();
      bank.analyser.fftSize = 1024;
      bank.analyser.smoothingTimeConstant = 0.8;
      engine.connect(bank.analyser);

      engine.on("stop", () => {
        bank.currentTime =
          engine.loop && bank.loopParm[1]
            ? bank.loopParm[1]
            : engine.sourceNode.buffer.duration;
      });
    }

    bufferToWavBlob(buffer) {
      // building WAVs are a pain
      const numberOfChannels = buffer.numberOfChannels;
      const sampleRate = buffer.sampleRate;
      const numFrames = buffer.length;
      const numSamples = numFrames * numberOfChannels;
      const dataView = new DataView(new ArrayBuffer(44 + numSamples * 2));

      let offset = 0;
      const setUint = (is32Bit, isLittleEndian, data) => {
        if (is32Bit) {
          dataView.setUint32(offset, data, isLittleEndian);
          offset += 4;
        } else {
          dataView.setUint16(offset, data, isLittleEndian);
          offset += 2;
        }
      };

      setUint(true, false, 0x52494646); // "RIFF" header
      setUint(true, true, 36 + numSamples * 2); // File size
      setUint(true, false, 0x57415645); // "WAVE" header
      setUint(true, false, 0x666d7420); // "fmt " chunk
      setUint(true, true, 16); // Chunk size
      setUint(false, true, 1); // Audio format (PCM)
      setUint(false, true, numberOfChannels);
      setUint(true, true, sampleRate);
      setUint(true, true, sampleRate * numberOfChannels * 2); // Byte rate
      setUint(false, true, numberOfChannels * 2); // Block align
      setUint(false, true, 16); // Bits per sample
      setUint(true, false, 0x64617461); // "data" chunk
      setUint(true, true, numSamples * 2); // Subchunk2Size

      // Audio data
      for (let i = 0; i < numFrames; i++) {
        for (let channel = 0; channel < numberOfChannels; channel++) {
          const sample = clamp(-1, 1, buffer.getChannelData(channel)[i]);
          dataView.setInt16(
            offset,
            sample < 0 ? sample * 32768 : sample * 32767,
            true
          );
          offset += 2;
        }
      }
      return new Blob([dataView], { type: "audio/wav" });
    }

    // Block Funcs
    importURL(args) {
      const url = Cast.toString(args.URL);
      if (!url) return;

      return new Promise((resolve) => {
        this.deleteSound(args);

        const engine = new Pizzicato.Sound(
          {
            source: "file",
            options: { path: url, attack: 0 },
          },
          () => {
            try {
              // try catch placed here since 'new Pizzicato.Sound' doesnt error, however
              // if the url is invalid, functions called within 'initSound' will error
              this.initSound(engine, args.NAME, url, false);
              resolve();
            } catch (e) {
              console.error("Sound load error:", e);
              alert(
                Scratch.translate(
                  "Tune Shark V3 can't import this sound, file may be corrupted or non-existent."
                )
              );
              resolve();
            }
          }
        );
      });
    }

    importMenu(args, util) {
      const name = Cast.toString(args.SOUND);
      const target = util.target.sprite;
      const sound = target.sounds.find((i) => i.name === name);

      if (sound) {
        this.deleteSound(args);
        const sourceURL = `/${target.name.replaceAll("/", "")}/${sound.name.replaceAll("/", "")}.${sound.dataFormat}`;
        const buffer = target.soundBank.soundPlayers[sound.soundId].buffer;
        const engine = new Pizzicato.Sound({
          source: "buffer",
          options: { buffer, attack: 0 },
        });
        this.initSound(engine, args.NAME, sourceURL, true);
      }
    }

    duplicateSound(args) {
      const sound = soundBank[args.NAME1];
      if (sound) {
        this.deleteSound({ NAME: args.NAME2 });

        const engine = new Pizzicato.Sound({
          source: "buffer",
          options: {
            buffer: sound.context.sourceNode.buffer,
            attack: 0,
          },
        });
        this.initSound(engine, args.NAME2, sound.src, sound.isVanilla);
      }
    }

    bindSound(args) {
      const sound1 = soundBank[args.NAME];
      const sound2 = soundBank[args.NAME2];
      if (sound1 === undefined || sound2 === undefined) return;
      const shouldBind = args.TYPE === "bind";
      sound1.isBind = shouldBind;
      sound2.isBind = shouldBind;
      if (shouldBind) {
        if (sound1.binds[sound2.name]) {
          this.audioControlDo(sound1.binds[sound2.name], "stop");
        }
        if (sound2.binds[sound1.name]) {
          this.audioControlDo(sound2.binds[sound1.name], "stop");
        }
        sound1.binds[sound2.name] = sound2;
        sound2.binds[sound1.name] = sound1;
      } else {
        delete sound1.binds[sound2.name];
        delete sound2.binds[sound1.name];
      }
    }

    startSound(args) {
      const sound = soundBank[args.NAME];
      if (sound !== undefined) this.playSound(sound.context, 0, sound);
    }

    startSoundAt(args) {
      const sound = soundBank[args.NAME];
      const time = Cast.toNumber(args.TIME);
      if (sound !== undefined) this.playSound(sound.context, time, sound);
    }

    playAndStop(args, util) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      if (util.stackFrame.awaitingSound === undefined) {
        util.stackFrame.awaitingSound = true;
        this.playSound(sound.context, Cast.toNumber(args.TIME), sound);
        util.yield();
      } else if (util.stackFrame.awaitingSound) {
        if (sound.currentTime >= Cast.toNumber(args.MAX))
          this.audioControlDo(sound, "stop");
        else util.yield();
      }
    }

    stopSound(args) {
      const sound = soundBank[args.NAME];
      if (sound !== undefined) this.audioControlDo(sound, "stop");
    }

    pauseSound(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      if (args.UN_PAUSE === "pause") this.audioControlDo(sound, "pause");
      else this.audioControlDo(sound, "unpause");
    }

    ctrlSounds(args) {
      const controlFuncs = {
        start: (sound) => this.playSound(sound.context, 0, sound),
        pause: (sound) => this.audioControlDo(sound, "pause"),
        unpause: (sound) => this.audioControlDo(sound, "unpause"),
        stop: (sound) => {
          if (sound.context.playing) sound.context.stop();
        },
      };

      const func = controlFuncs[Cast.toString(args.CONTROL)];
      if (func) {
        Object.values(soundBank).forEach(func);
      }
    }

    enableControl(args) {
      settings.flagCtrl = args.ON_OFF === "on";
    }

    toggleOverlap(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      sound.overlap = args.TYPE === "on";
    }

    toggleLoop(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      const oldValue = sound.context.loop;
      sound.context.loop = args.TYPE === "on";
      if (args.TYPE === "off") this.audioControlDo(sound, "stop");
      else if (!oldValue && sound.context.playing) {
        const lastTime = sound.currentTime;
        sound.context.stop();
        sound.currentTime = lastTime;
        sound.context.play(0, lastTime);
      }
    }

    toggleReverse(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      if (sound.reversed === (args.TYPE === "on")) return;
      sound.reversed = args.TYPE === "on";
      this.audioControlDo(sound, "stop");
      sound._cache = { loudness: {}, tone: {} };

      const node = sound.context.sourceNode;
      const reverseBuffer = (buffer) => {
        for (let i = 0; i < buffer.numberOfChannels; i++)
          buffer.getChannelData(i).reverse();
        return buffer;
      };

      const bufferSource = node.context.createBufferSource();
      bufferSource.buffer = reverseBuffer(node.buffer);
      bufferSource.connect(node.context.destination);
    }

    loopParams(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      sound.context.loop = true;
      const srcNode = sound.context.sourceNode;
      srcNode.loopStart = Cast.toNumber(args.START);
      srcNode.loopEnd = Cast.toNumber(args.END);
      sound.loopParm = [srcNode.loopStart, srcNode.loopEnd];
    }

    deleteSound(args) {
      const sound = soundBank[args.NAME];
      if (sound) {
        this.stopSound(args);

        const ctx = sound.context;
        ctx.volume = 0;
        ctx.sourceNode.disconnect();
        ctx.disconnect();
        delete soundBank[args.NAME];
      }
    }

    deleteAllSounds() {
      for (let name in soundBank) this.deleteSound({ NAME: name });
    }

    allSounds() {
      return JSON.stringify(Object.keys(soundBank));
    }

    allPlaySounds() {
      const players = [];
      Object.entries(soundBank).forEach(([key, innerSrc]) => {
        if (innerSrc.context.playing) players.push(key);
      });
      return JSON.stringify(players);
    }

    whenSound(args, util) {
      const data = util.thread[ts3Data] ?? {};
      return args.CONTROL === data.type && args.NAME === data.name;
    }

    soundCheck(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return false;
      switch (args.CONTROL) {
        case "exists":
          return sound.loaded;
        case "playing":
          return sound.context.playing;
        case "paused":
          return sound.context.paused;
        case "looped":
          return sound.context.loop;
        case "overlaped":
          return sound.overlap;
        case "reversed":
          return sound.reversed;
        case "binded":
          return sound.isBind;
        default:
          return false;
      }
    }

    soundProperty(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return 0;
      const src = sound.context.sourceNode;
      const prop = Cast.toString(args.PROP);
      switch (prop) {
        case "length":
          return src.buffer.duration;
        case "current time":
          return sound.currentTime;
        case "estimated bpm":
          return this.getBPM(
            src.buffer.getChannelData(0),
            src.buffer.sampleRate
          );
        case "channels":
          return src.buffer.numberOfChannels;
        case "samples":
          return src.buffer.sampleRate;
        case "fft": {
          const dataArray = new Uint8Array(sound.analyser.frequencyBinCount);
          sound.analyser.getByteFrequencyData(dataArray);
          return JSON.stringify(Array.from(dataArray));
        }
        case "source":
          return sound.src;
        case "binds":
          return JSON.stringify(Object.keys(sound.binds));
        case "volume":
          return sound.context.volume * 100;
        case "pitch":
          return Math.round((sound.pitch - 1) * 100);
        case "detune":
          return sound.detune / 10;
        case "speed":
          return sound.speed * 100;
        case "gain":
          return sound.gain * 100;
        case "pan":
          return sound.effects[prop.toUpperCase()]?.options.pan * 100 || 0;
        case "distortion":
          return sound.effects[prop.toUpperCase()]?.options.gain * 100 || 0;
        case "attack":
          return sound.attack * 100;
        case "release":
          return sound.release * 100;
        default: {
          const effect = sound.effects[prop.toUpperCase()];
          if (effect === undefined) return "";
          return JSON.stringify(effect.rawParams);
        }
      }
    }

    getLoudTime(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return 0;
      const time = Cast.toNumber(args.TIME);
      const chan = Cast.toNumber(args.CHANNEL) - 1;
      const audioCtx = sound.context.sourceNode;
      const buffer = audioCtx.buffer;
      const duration = buffer.duration;
      if (
        time < 0 ||
        time > duration ||
        chan < 0 ||
        chan > buffer.numberOfChannels - 1
      ) {
        return 0;
      }

      let value = 0;
      if (
        args.TYPE !== "raw noise" &&
        sound._cache[args.TYPE][`${time}${chan}`] !== undefined
      ) {
        value = sound._cache[args.TYPE][`${time}${chan}`];
      } else {
        const sampleRate = buffer.sampleRate;
        const channelData = buffer.getChannelData(chan);
        const sampleIndex = Math.floor(sampleRate * time);
        const windowSize = sampleRate * 0.1;
        const startSample = Math.max(0, sampleIndex - windowSize / 2);
        const endSample = Math.min(
          channelData.length,
          sampleIndex + windowSize / 2
        );

        // no need to cache raw noise, no work is done
        if (args.TYPE === "raw noise") value = channelData[endSample];
        else if (args.TYPE === "tone") {
          const data = channelData.slice(startSample, endSample);
          const size = data.length;
          const tauArray = new Array(size).fill(0);
          for (let tau = 1; tau < size; tau++) {
            let sum = 0;
            for (let i = 0; i < size - tau; i++) {
              const diff = data[i] - data[i + tau];
              sum += diff * diff;
            }
            tauArray[tau] = sum;
          }
          for (let tau = 1; tau < size; tau++) {
            value += tauArray[tau];
            tauArray[tau] *= tau / value;
          }

          let bestTau = -1;
          for (let tau = 1; tau < size; tau++) {
            if (tauArray[tau] < 0.1) {
              bestTau = tau;
              break;
            }
          }

          value = bestTau > 0 ? sampleRate / bestTau : 0;
          sound._cache["tone"][`${time}${chan}`] = value;
          return value;
        } else if (args.TYPE === "loudness") {
          for (let i = startSample; i < endSample; i++) {
            value += channelData[i] * channelData[i];
          }

          const rms = Math.sqrt(value / (endSample - startSample));
          const dB = 20 * Math.log10(rms);
          value = clamp(0, 1, (dB + 50) / 50) * 100;
          sound._cache["loudness"][`${time}${chan}`] = value;
        } else {
          return "";
        }
      }
      return isNaN(value) ? 0 : value * sound.gain;
    }

    cropSound(args) {
      const sound = soundBank[args.NAME];
      const start = Cast.toNumber(args.START);
      const end = Cast.toNumber(args.END);
      if (sound === undefined || start >= end) return "";

      const context = sound.context.sourceNode;
      const buffer = context.buffer;

      const startSample = Math.floor(start * buffer.sampleRate);
      const endSample = Math.floor(end * buffer.sampleRate);
      const croppedBuffer = context.context.createBuffer(
        buffer.numberOfChannels,
        endSample - startSample,
        buffer.sampleRate
      );
      for (let i = 0; i < buffer.numberOfChannels; i++) {
        croppedBuffer
          .getChannelData(i)
          .set(buffer.getChannelData(i).subarray(startSample, endSample));
      }

      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => resolve("");
        reader.readAsDataURL(this.bufferToWavBlob(croppedBuffer));
      });
    }

    joinSound(args) {
      const sound1 = soundBank[args.NAME1];
      const sound2 = soundBank[args.NAME2];
      if (sound1 === undefined || sound2 === undefined) return "";

      const context = sound1.context.sourceNode;
      const buffer1 = context.buffer;
      const buffer2 = sound2.context.sourceNode.buffer;

      if (
        buffer1.sampleRate !== buffer2.sampleRate ||
        buffer1.numberOfChannels !== buffer2.numberOfChannels
      ) {
        console.warn(
          "Cannot join sounds! Sample rate or channel count doesnt match."
        );
        return "";
      }

      const joinedBuffer = context.context.createBuffer(
        buffer1.numberOfChannels,
        buffer1.length + buffer2.length,
        buffer1.sampleRate
      );
      for (let i = 0; i < buffer1.numberOfChannels; i++) {
        const channel = joinedBuffer.getChannelData(i);
        channel.set(buffer1.getChannelData(i), 0);
        channel.set(buffer2.getChannelData(i), buffer1.length);
      }

      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => resolve("");
        reader.readAsDataURL(this.bufferToWavBlob(joinedBuffer));
      });
    }

    setVol(args) {
      const sound = soundBank[args.NAME];
      if (sound) {
        sound.context.volume = clamp(0, 1, Cast.toNumber(args.NUM) / 100);
      }
    }

    resetEffect(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;

      const ctx = sound.context;
      const effect = Cast.toString(args.EFFECT);
      const name = effect.toUpperCase();
      if (effect === "pitch") sound.pitch = 1;
      else if (effect === "detune") sound.detune = 0;
      else if (effect === "speed") sound.speed = 1;
      else if (effect === "gain") sound.gain = 1;
      else if (effect === "attack") sound.attack = 0;
      else if (effect === "release") sound.release = 0;
      else if (effect === "all effects") {
        sound.pitch = 1;
        sound.detune = 0;
        sound.speed = 1;
        sound.gain = 1;
        sound.attack = 0;
        sound.release = 0;
        const effects = sound.effects;
        Object.values(effects).forEach((e) => ctx.removeEffect(e));
        sound.effects = {};
      }
      if (sound.effects[name] !== undefined) {
        ctx.removeEffect(sound.effects[name]);
        delete sound.effects[name];
      }
      sound.rate = sound.pitch * sound.speed * Math.pow(2, sound.detune / 1200);
      this.updateAudioNodes(ctx.sourceNode, sound);
    }

    setThingNew(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      const ctx = sound.context;
      const value = Cast.toNumber(args.VALUE) / 100;

      if (args.TYPE === "gain") sound.gain = value;
      else if (args.TYPE === "pitch") sound.pitch = Math.max(0, value + 1);
      else if (args.TYPE === "detune") sound.detune = value * 1000;
      else if (args.TYPE === "speed") sound.speed = Math.max(0, value);
      else if (args.TYPE === "attack") sound.attack = Math.max(0, value);
      else if (args.TYPE === "release") sound.release = Math.max(0, value);
      else if (args.TYPE === "pan") {
        this.handleEffect(sound, "PAN", args, { pan: clamp(-1, 1, value) });
        return;
      } else if (args.TYPE === "distortion") {
        this.handleEffect(sound, "DISTORTION", args, { gain: value });
        return;
      }
      sound.rate = sound.pitch * sound.speed * Math.pow(2, sound.detune / 1200);
      this.updateAudioNodes(ctx.sourceNode, sound);
    }

    setReverb(args) {
      const sound = soundBank[args.NAME];
      if (sound) {
        this.handleEffect(sound, "REVERB", args, {
          time: Cast.toNumber(args.TIME) / 10,
          decay: Cast.toNumber(args.DECAY) / 10,
          mix: Cast.toNumber(args.MIX) / 100,
        });
      }
    }

    setDelay(args) {
      const sound = soundBank[args.NAME];
      if (sound) {
        this.handleEffect(sound, "DELAY", args, {
          time: clamp(0, 1, Cast.toNumber(args.TIME) / 100),
          decay: Cast.toNumber(args.FEED) / 100,
          mix: Cast.toNumber(args.MIX) / 100,
        });
      }
    }

    setFuzz(args) {
      const sound = soundBank[args.NAME];
      if (sound) {
        this.handleEffect(sound, "FUZZ", args, {
          lowGain: clamp(0, 1, Cast.toNumber(args.LOW) / 100),
          midLowGain: clamp(0, 1, Cast.toNumber(args.MED1) / 100),
          midHighGain: clamp(0, 1, Cast.toNumber(args.MED2) / 100),
          highGain: clamp(0, 1, Cast.toNumber(args.HIGH) / 100),
          mix: Cast.toNumber(args.MIX) / 100,
        });
      }
    }

    setBitcrush(args) {
      const sound = soundBank[args.NAME];
      if (sound) {
        this.handleEffect(sound, "BITCRUSH", args, {
          bits: Math.max(10, Cast.toNumber(args.BITS)) / 10,
          frequency: Math.max(30000, Cast.toNumber(args.FREQ)),
        });
      }
    }

    setPan3D(args) {
      const sound = soundBank[args.NAME];
      if (sound) {
        this.handleEffect(sound, "PAN3D", args, {
          x: Cast.toNumber(args.X),
          y: Cast.toNumber(args.Y),
          z: Cast.toNumber(args.Z) - 1,
        });
      }
    }

    setTremolo(args) {
      const sound = soundBank[args.NAME];
      if (sound) {
        this.handleEffect(sound, "TREMOLO", args, {
          speed: Cast.toNumber(args.SPEED) / 5,
          depth: clamp(0, 1, Cast.toNumber(args.DEPTH) / 100),
          mix: Cast.toNumber(args.MIX) / 100,
        });
      }
    }

    setPass(args) {
      const sound = soundBank[args.NAME];
      if (sound) {
        this.handleEffect(
          sound,
          args.TYPE === "highpass" ? "HIGHPASS" : "LOWPASS",
          args,
          {
            frequency: Cast.toNumber(args.FREQ),
            peak: Cast.toNumber(args.PEAK) / 5,
          }
        );
      }
    }

    setFlanger(args) {
      const sound = soundBank[args.NAME];
      if (sound) {
        this.handleEffect(sound, "FLANGER", args, {
          time: Cast.toNumber(args.TIME) / 100,
          speed: Cast.toNumber(args.SPEED) / 100,
          depth: Cast.toNumber(args.DEPTH) / 100,
          feedback: Cast.toNumber(args.FEED) / 100,
          mix: Cast.toNumber(args.MIX) / 100,
        });
      }
    }

    setCompress(args) {
      const sound = soundBank[args.NAME];
      if (sound) {
        this.handleEffect(sound, "COMPRESSOR", args, {
          threshold: clamp(-100, 0, Cast.toNumber(args.THRESH) * -1),
          ratio: Cast.toNumber(args.RATIO) / 5,
          attack: clamp(0, 1, Cast.toNumber(args.ATTACK) / 100),
          release: clamp(0, 1, Cast.toNumber(args.RELEASE) / 100),
          knee: Cast.toNumber(args.KNEE) / 2.5,
        });
      }
    }

    setEqualize(args) {
      const sound = soundBank[args.NAME];
      if (sound) {
        this.handleEffect(sound, "EQUALIZER", args, {
          cutoff_frequency_high: 120 * (Cast.toNumber(args.CUT_HIGH) + 100),
          cutoff_frequency_low: 120 * (Cast.toNumber(args.CUT_LOW) + 100),
          low_band_gain: Cast.toNumber(args.LOW) / 10,
          mid_band_gain: Cast.toNumber(args.MID) / 10,
          high_band_gain: Cast.toNumber(args.HIGH) / 10,
        });
      }
    }
  }

  Scratch.extensions.register(new SPtuneShark3());
})(Scratch);
