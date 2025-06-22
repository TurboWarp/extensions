// Name: Tune Shark V3
// ID: SPtuneShark3
// Description: An advanced audio engine, providing complex sound control.
// By: SharkPool
// License: MIT AND LGPL-3.0

// Version V.3.5.01

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
  for (const key in extraIcons)
    extraIcons[key] =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIH" +
      extraIcons[key];

  // Modified Pizzicato Library (Web Audio API, but with Premade Effects and Stuff)
  // Modified Version: https://github.com/SharkPool-SP/pizzicato/
  // Original: https://github.com/alemangui/pizzicato
  /*
    The MIT License (MIT)

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
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
  */

  /* eslint-disable */
  // prettier-ignore
  const Pizzicato = (function(){"use strict";var e={},t=e,i="undefined"!=typeof window?window.AudioContext||window.webkitAudioContext:"undefined"!=typeof global?global.AudioContext||global.webkitAudioContext:null;if(!i)throw Error("No AudioContext found in this environment.");e.context=new i;var n=e.context.createGain();n.connect(e.context.destination),e.Util={isString:function(e){return"[object String]"===toString.call(e)},isObject:function(e){return"[object Object]"===toString.call(e)},isFunction:function(e){return"[object Function]"===toString.call(e)},isNumber:function(e){return"[object Number]"===toString.call(e)&&e===+e},isArray:function(e){return"[object Array]"===toString.call(e)},isInRange:function(e,i,n){return!!(t.Util.isNumber(e)&&t.Util.isNumber(i)&&t.Util.isNumber(n))&&e>=i&&e<=n},isBool:function(e){return"boolean"==typeof e},isOscillator:function(e){return e&&"[object OscillatorNode]"===e.toString()},isAudioBufferSourceNode:function(e){return e&&"[object AudioBufferSourceNode]"===e.toString()},isSound:function(e){return e instanceof t.Sound},isEffect:function(t){for(var i in e.Effects)if(t instanceof e.Effects[i])return!0;return!1},normalize:function(e,i,n){if(t.Util.isNumber(e)&&t.Util.isNumber(i)&&t.Util.isNumber(n))return(n-i)*e/1+i},getDryLevel:function(e){return!t.Util.isNumber(e)||e>1||e<0?0:e<=.5?1:1-(e-.5)*2},getWetLevel:function(e){return!t.Util.isNumber(e)||e>1||e<0?0:e>=.5?1:1-(.5-e)*2}};var o=Object.getPrototypeOf(Object.getPrototypeOf(e.context.createGain())),s=o.connect;o.connect=function(e){var i=t.Util.isEffect(e)?e.inputNode:e;return s.call(this,i),e},Object.defineProperty(e,"volume",{enumerable:!0,get:function(){return n.gain.value},set:function(e){t.Util.isInRange(e,0,1)&&n&&(n.gain.value=e)}}),Object.defineProperty(e,"masterGainNode",{enumerable:!1,get:function(){return n},set:function(e){console.error("Can't set the master gain node")}}),e.Events={on:function(e,t,i){e&&t&&(this._events=this._events||{},(this._events[e]||(this._events[e]=[])).push({callback:t,context:i||this,handler:this}))},trigger:function(e){var t,i,n,o;if(e){for(this._events=this._events||{},t=this._events[e]||(this._events[e]=[]),o=0,i=Math.max(0,arguments.length-1),n=[];o<i;o++)n[o]=arguments[o+1];for(o=0;o<t.length;o++)t[o].callback.apply(t[o].context,n)}},off:function(e){e?this._events[e]=void 0:this._events={}}},e.Sound=function(i,n){var o=this,s=e.Util,r=function e(t){if(t&&!s.isFunction(t)&&!s.isString(t)&&!s.isObject(t))return"Description type not supported. Initialize a sound using an object, a function or a string.";if(s.isObject(t)){if(!s.isString(t.source)||-1===["wave","file","input","script","sound","buffer"].indexOf(t.source))return"Specified source not supported. Sources can be wave, file, input or script";if("file"===t.source&&(!t.options||!t.options.path))return"A path is needed for sounds with a file source";if("script"===t.source&&(!t.options||!t.options.audioFunction))return"An audio function is needed for sounds with a script source"}}(i),a=s.isObject(i)&&s.isObject(i.options);if(r)throw console.error(r),Error("Error initializing Pizzicato Sound: "+r);function c(i,n){i=i||{},this.getRawSourceNode=function(){var t=this.sourceNode?this.sourceNode.frequency.value:i.frequency,n=e.context.createOscillator();return n.type=i.type||"sine",n.frequency.value=t||440,n},this.sourceNode=this.getRawSourceNode(),this.sourceNode.gainSuccessor=t.context.createGain(),this.sourceNode.connect(this.sourceNode.gainSuccessor),s.isFunction(n)&&n()}function h(t,i){t=s.isArray(t)?t:[t];var n=new XMLHttpRequest;n.open("GET",t[0],!0),n.responseType="arraybuffer",n.onload=function(n){e.context.decodeAudioData(n.target.response,(function(t){o.getRawSourceNode=function(){var i=e.context.createBufferSource();return i.loop=this.loop,i.buffer=t,i},s.isFunction(i)&&i()}).bind(o),(function(e){if(console.error("Error decoding audio file "+t[0]),t.length>1){t.shift(),h(t,i);return}e=e||Error("Error decoding audio file "+t[0]),s.isFunction(i)&&i(e)}).bind(o))},n.onreadystatechange=function(e){4===n.readyState&&200!==n.status&&console.error("Error while fetching "+t[0]+". "+n.statusText)},n.send()}function u(t,i){var n=s.isFunction(t)?t:t.audioFunction,o=s.isObject(t)&&t.bufferSize?t.bufferSize:null;if(!o)try{e.context.createScriptProcessor()}catch(r){o=2048}this.getRawSourceNode=function(){var t=e.context.createScriptProcessor(o,1,1);return t.onaudioprocess=n,t}}this.detached=a&&i.options.detached,this.masterVolume=e.context.createGain(),this.fadeNode=e.context.createGain(),this.fadeNode.gain.value=0,this.detached||this.masterVolume.connect(e.masterGainNode),this.lastTimePlayed=0,this.effects=[],this.effectConnectors=[],this.playing=this.paused=!1,this.loop=a&&i.options.loop,this.attack=a&&s.isNumber(i.options.attack)?i.options.attack:.04,this.volume=a&&s.isNumber(i.options.volume)?i.options.volume:1,a&&s.isNumber(i.options.release)?this.release=i.options.release:a&&s.isNumber(i.options.sustain)?(console.warn("'sustain' is deprecated. Use 'release' instead."),this.release=i.options.sustain):this.release=.04,i?s.isString(i)?h.bind(this)(i,n):s.isFunction(i)?u.bind(this)(i,n):"file"===i.source?h.bind(this)(i.options.path,n):"wave"===i.source?c.bind(this)(i.options,n):"input"===i.source?(function t(i,n){if(navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,!navigator.getUserMedia&&(!navigator.mediaDevices||navigator.mediaDevices.getUserMedia)){console.error("Your browser does not support getUserMedia. Note that the current document must be loaded securely for this to work");return}var r=(function(t){o.getRawSourceNode=function(){return e.context.createMediaStreamSource(t)},s.isFunction(n)&&n()}).bind(o),a=function(e){s.isFunction(n)&&n(e)};navigator.mediaDevices.getUserMedia?navigator.mediaDevices.getUserMedia({audio:!0}).then(r).catch(a):navigator.getUserMedia({audio:!0},r,a)}).bind(this)(i,n):"script"===i.source?u.bind(this)(i.options,n):"sound"===i.source?(function e(i,n){this.getRawSourceNode=i.sound.getRawSourceNode,i.sound.sourceNode&&t.Util.isOscillator(i.sound.sourceNode)&&(this.sourceNode=this.getRawSourceNode(),this.frequency=i.sound.frequency)}).bind(this)(i.options,n):"buffer"===i.source&&(function t(i,n){let o=Array.isArray(i)?i[0]:i;o instanceof AudioBuffer?(this.getRawSourceNode=function(){let t=e.context.createBufferSource();return t.loop=this.loop,t.buffer=o,t},"function"==typeof n&&n()):console.error("Invalid buffer provided. Expected an AudioBuffer.")}).bind(this)(i.options.buffer,n):c.bind(this)({},n)},e.Sound.prototype=Object.create(e.Events,{play:{enumerable:!0,value:function(i,n){this.playing||(t.Util.isNumber(n)||(n=this.offsetTime||0),t.Util.isNumber(i)||(i=0),this.playing=!0,this.paused=!1,this.sourceNode=this.getSourceNode(),this.applyAttack(),t.Util.isFunction(this.sourceNode.start)&&(this.lastTimePlayed=e.context.currentTime-n,this.sourceNode.start(t.context.currentTime+i,n)),this.trigger("play"))}},stop:{enumerable:!0,value:function(){(this.paused||this.playing)&&(this.paused=this.playing=!1,this.stopWithRelease(),this.offsetTime=0,this.trigger("stop"))}},pause:{enumerable:!0,value:function(){if(!this.paused&&this.playing){this.paused=!0,this.playing=!1,this.stopWithRelease();var e=t.context.currentTime-this.lastTimePlayed;this.sourceNode.buffer?this.offsetTime=e%(this.sourceNode.buffer.length/t.context.sampleRate):this.offsetTime=e,this.trigger("pause")}}},clone:{enumerable:!0,value:function(){for(var t=new e.Sound({source:"sound",options:{loop:this.loop,attack:this.attack,release:this.release,volume:this.volume,sound:this}}),i=0;i<this.effects.length;i++)t.addEffect(this.effects[i]);return t}},onEnded:{enumerable:!0,value:function(e){return function(){this.sourceNode&&this.sourceNode!==e||(this.playing&&this.stop(),this.paused||this.trigger("end"))}}},addEffect:{enumerable:!0,value:function(e){if(!t.Util.isEffect(e))return console.error("The object provided is not a Pizzicato effect."),this;this.effects.push(e);var i=this.effectConnectors.length>0?this.effectConnectors[this.effectConnectors.length-1]:this.fadeNode;i.disconnect(),i.connect(e);var n=t.context.createGain();return this.effectConnectors.push(n),e.connect(n),n.connect(this.masterVolume),this}},removeEffect:{enumerable:!0,value:function(e){var t,i=this.effects.indexOf(e);if(-1===i)return console.warn("Cannot remove effect that is not applied to this sound."),this;var n=this.playing;n&&this.pause();var o=0===i?this.fadeNode:this.effectConnectors[i-1];o.disconnect();var s=this.effectConnectors[i];return s.disconnect(),e.disconnect(s),this.effectConnectors.splice(i,1),this.effects.splice(i,1),t=i>this.effects.length-1||0===this.effects.length?this.masterVolume:this.effects[i],o.connect(t),n&&this.play(),this}},connect:{enumerable:!0,value:function(e){return this.masterVolume.connect(e),this}},disconnect:{enumerable:!0,value:function(e){return this.masterVolume.disconnect(e),this}},connectEffects:{enumerable:!0,value:function(){for(var e=[],i=0;i<this.effects.length;i++){var n=i===this.effects.length-1?this.masterVolume:this.effects[i+1].inputNode;e[i]=t.context.createGain(),this.effects[i].outputNode.disconnect(this.effectConnectors[i]),this.effects[i].outputNode.connect(n)}}},volume:{enumerable:!0,get:function(){if(this.masterVolume)return this.masterVolume.gain.value},set:function(e){t.Util.isInRange(e,0,1)&&this.masterVolume&&(this.masterVolume.gain.value=e)}},frequency:{enumerable:!0,get:function(){return this.sourceNode&&t.Util.isOscillator(this.sourceNode)?this.sourceNode.frequency.value:null},set:function(e){this.sourceNode&&t.Util.isOscillator(this.sourceNode)&&(this.sourceNode.frequency.value=e)}},sustain:{enumerable:!0,get:function(){return console.warn("'sustain' is deprecated. Use 'release' instead."),this.release},set:function(e){console.warn("'sustain' is deprecated. Use 'release' instead."),t.Util.isInRange(e,0,10)&&(this.release=e)}},getSourceNode:{enumerable:!0,value:function(){if(this.sourceNode){var e=this.sourceNode;e.gainSuccessor.gain.setValueAtTime(e.gainSuccessor.gain.value,t.context.currentTime),e.gainSuccessor.gain.linearRampToValueAtTime(1e-4,t.context.currentTime+.2),setTimeout(function(){e.disconnect(),e.gainSuccessor.disconnect()},200)}var i=this.getRawSourceNode();return i.gainSuccessor=t.context.createGain(),i.connect(i.gainSuccessor),i.gainSuccessor.connect(this.fadeNode),this.fadeNode.connect(this.getInputNode()),t.Util.isAudioBufferSourceNode(i)&&(i.onended=this.onEnded(i).bind(this)),i}},getInputNode:{enumerable:!0,value:function(){return this.effects.length>0?this.effects[0].inputNode:this.masterVolume}},applyAttack:{enumerable:!1,value:function(){if(this.fadeNode.gain.value,this.fadeNode.gain.cancelScheduledValues(t.context.currentTime),!this.attack){this.fadeNode.gain.setTargetAtTime(1,t.context.currentTime,.001);return}var e=navigator.userAgent.toLowerCase().indexOf("firefox")>-1,i=this.attack;e||(i=(1-this.fadeNode.gain.value)*this.attack),this.fadeNode.gain.setTargetAtTime(1,t.context.currentTime,2*i)}},stopWithRelease:{enumerable:!1,value:function(e){var i=this.sourceNode,n=function(){return t.Util.isFunction(i.stop)?i.stop(0):i.disconnect()};if(this.fadeNode.gain.value,this.fadeNode.gain.cancelScheduledValues(t.context.currentTime),!this.release){this.fadeNode.gain.setTargetAtTime(0,t.context.currentTime,.001),n();return}var o=navigator.userAgent.toLowerCase().indexOf("firefox")>-1,s=this.release;o||(s=this.fadeNode.gain.value*this.release),this.fadeNode.gain.setTargetAtTime(1e-5,t.context.currentTime,s/5),window.setTimeout(function(){n()},1e3*s)}}}),e.Group=function(e){e=e||[],this.mergeGainNode=t.context.createGain(),this.masterVolume=t.context.createGain(),this.sounds=[],this.effects=[],this.effectConnectors=[],this.mergeGainNode.connect(this.masterVolume),this.masterVolume.connect(t.masterGainNode);for(var i=0;i<e.length;i++)this.addSound(e[i])},e.Group.prototype=Object.create(t.Events,{connect:{enumerable:!0,value:function(e){return this.masterVolume.connect(e),this}},disconnect:{enumerable:!0,value:function(e){return this.masterVolume.disconnect(e),this}},addSound:{enumerable:!0,value:function(e){if(!t.Util.isSound(e)){console.error("You can only add Pizzicato.Sound objects");return}if(this.sounds.indexOf(e)>-1){console.warn("The Pizzicato.Sound object was already added to this group");return}if(e.detached){console.warn("Groups do not support detached sounds. You can manually create an audio graph to group detached sounds together.");return}e.disconnect(t.masterGainNode),e.connect(this.mergeGainNode),this.sounds.push(e)}},removeSound:{enumerable:!0,value:function(e){var i=this.sounds.indexOf(e);if(-1===i){console.warn("Cannot remove a sound that is not part of this group.");return}e.disconnect(this.mergeGainNode),e.connect(t.masterGainNode),this.sounds.splice(i,1)}},volume:{enumerable:!0,get:function(){if(this.masterVolume)return this.masterVolume.gain.value},set:function(e){t.Util.isInRange(e,0,1)&&(this.masterVolume.gain.value=e)}},play:{enumerable:!0,value:function(){for(var e=0;e<this.sounds.length;e++)this.sounds[e].play();this.trigger("play")}},stop:{enumerable:!0,value:function(){for(var e=0;e<this.sounds.length;e++)this.sounds[e].stop();this.trigger("stop")}},pause:{enumerable:!0,value:function(){for(var e=0;e<this.sounds.length;e++)this.sounds[e].pause();this.trigger("pause")}},addEffect:{enumerable:!0,value:function(e){if(!t.Util.isEffect(e))return console.error("The object provided is not a Pizzicato effect."),this;this.effects.push(e);var i=this.effectConnectors.length>0?this.effectConnectors[this.effectConnectors.length-1]:this.mergeGainNode;i.disconnect(),i.connect(e);var n=t.context.createGain();return this.effectConnectors.push(n),e.connect(n),n.connect(this.masterVolume),this}},removeEffect:{enumerable:!0,value:function(e){var t,i=this.effects.indexOf(e);if(-1===i)return console.warn("Cannot remove effect that is not applied to this group."),this;var n=0===i?this.mergeGainNode:this.effectConnectors[i-1];n.disconnect();var o=this.effectConnectors[i];return o.disconnect(),e.disconnect(o),this.effectConnectors.splice(i,1),this.effects.splice(i,1),t=i>this.effects.length-1||0===this.effects.length?this.masterVolume:this.effects[i],n.connect(t),this}}}),e.Effects={};var r=Object.create(null,{connect:{enumerable:!0,value:function(e){return this.outputNode.connect(e),this}},disconnect:{enumerable:!0,value:function(e){return this.outputNode.disconnect(e),this}}});function a(i,n){this.options={},i=i||this.options;var o={frequency:350,peak:1};for(var s in this.inputNode=this.filterNode=t.context.createBiquadFilter(),this.filterNode.type=n,this.outputNode=e.context.createGain(),this.filterNode.connect(this.outputNode),o)this[s]=i[s],this[s]=void 0===this[s]||null===this[s]?o[s]:this[s]}e.Effects.Delay=function(t){this.options={},t=t||this.options;var i={feedback:.5,time:.3,mix:.5};for(var n in this.inputNode=e.context.createGain(),this.outputNode=e.context.createGain(),this.dryGainNode=e.context.createGain(),this.wetGainNode=e.context.createGain(),this.feedbackGainNode=e.context.createGain(),this.delayNode=e.context.createDelay(),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.delayNode.connect(this.feedbackGainNode),this.feedbackGainNode.connect(this.delayNode),this.inputNode.connect(this.delayNode),this.delayNode.connect(this.wetGainNode),this.wetGainNode.connect(this.outputNode),i)this[n]=t[n],this[n]=void 0===this[n]||null===this[n]?i[n]:this[n]},e.Effects.Delay.prototype=Object.create(r,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(i){t.Util.isInRange(i,0,1)&&(this.options.mix=i,this.dryGainNode.gain.value=e.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=e.Util.getWetLevel(this.mix))}},time:{enumerable:!0,get:function(){return this.options.time},set:function(e){t.Util.isInRange(e,0,180)&&(this.options.time=e,this.delayNode.delayTime.value=e)}},feedback:{enumerable:!0,get:function(){return this.options.feedback},set:function(e){t.Util.isInRange(e,0,1)&&(this.options.feedback=parseFloat(e,10),this.feedbackGainNode.gain.value=this.feedback)}}}),e.Effects.Compressor=function(t){this.options={},t=t||this.options;var i={threshold:-24,knee:30,attack:.003,release:.25,ratio:12};for(var n in this.inputNode=this.compressorNode=e.context.createDynamicsCompressor(),this.outputNode=e.context.createGain(),this.compressorNode.connect(this.outputNode),i)this[n]=t[n],this[n]=void 0===this[n]||null===this[n]?i[n]:this[n]},e.Effects.Compressor.prototype=Object.create(r,{threshold:{enumerable:!0,get:function(){return this.compressorNode.threshold.value},set:function(t){e.Util.isInRange(t,-100,0)&&(this.compressorNode.threshold.value=t)}},knee:{enumerable:!0,get:function(){return this.compressorNode.knee.value},set:function(t){e.Util.isInRange(t,0,40)&&(this.compressorNode.knee.value=t)}},attack:{enumerable:!0,get:function(){return this.compressorNode.attack.value},set:function(t){e.Util.isInRange(t,0,1)&&(this.compressorNode.attack.value=t)}},release:{enumerable:!0,get:function(){return this.compressorNode.release.value},set:function(t){e.Util.isInRange(t,0,1)&&(this.compressorNode.release.value=t)}},ratio:{enumerable:!0,get:function(){return this.compressorNode.ratio.value},set:function(t){e.Util.isInRange(t,1,20)&&(this.compressorNode.ratio.value=t)}},getCurrentGainReduction:function(){return this.compressorNode.reduction}}),e.Effects.LowPassFilter=function(e){a.call(this,e,"lowpass")},e.Effects.HighPassFilter=function(e){a.call(this,e,"highpass")};var c=Object.create(r,{frequency:{enumerable:!0,get:function(){return this.filterNode.frequency.value},set:function(t){e.Util.isInRange(t,10,22050)&&(this.filterNode.frequency.value=t)}},peak:{enumerable:!0,get:function(){return this.filterNode.Q.value},set:function(t){e.Util.isInRange(t,1e-4,1e3)&&(this.filterNode.Q.value=t)}}});function h(){var i,n,o=t.context.sampleRate*this.time,s=e.context.createBuffer(2,o,t.context.sampleRate),r=s.getChannelData(0),a=s.getChannelData(1);for(n=0;n<o;n++)i=this.reverse?o-n:n,r[n]=(2*Math.random()-1)*Math.pow(1-i/o,this.decay),a[n]=(2*Math.random()-1)*Math.pow(1-i/o,this.decay);this.reverbNode.buffer&&(this.inputNode.disconnect(this.reverbNode),this.reverbNode.disconnect(this.wetGainNode),this.reverbNode=e.context.createConvolver(),this.inputNode.connect(this.reverbNode),this.reverbNode.connect(this.wetGainNode)),this.reverbNode.buffer=s}function u(e){this.options={},e=e||this.options;var i={cutoff_frequency_low:100,cutoff_frequency_high:8e3,low_band_gain:1,mid_band_gain:1,high_band_gain:1,low_peak:1,mid_peak:1,high_peak:1};for(var n in this.inputNode=t.context.createGain(),this.outputNode=t.context.createGain(),this.lowFilterNode=t.context.createBiquadFilter(),this.lowFilterNode.type="lowpass",this.inputNode.connect(this.lowFilterNode),this.lowGainNode=t.context.createGain(),this.lowFilterNode.connect(this.lowGainNode),this.midFilterNode=t.context.createBiquadFilter(),this.midFilterNode.type="bandpass",this.inputNode.connect(this.midFilterNode),this.midGainNode=t.context.createGain(),this.midFilterNode.connect(this.midGainNode),this.highFilterNode=t.context.createBiquadFilter(),this.highFilterNode.type="highpass",this.inputNode.connect(this.highFilterNode),this.highGainNode=t.context.createGain(),this.highFilterNode.connect(this.highGainNode),this.analyserNode=t.context.createAnalyser(),this.lowGainNode.connect(this.analyserNode),this.midGainNode.connect(this.analyserNode),this.highGainNode.connect(this.analyserNode),this.analyserNode.connect(this.outputNode),this.analyserNode.minDecibels=-90,this.analyserNode.maxDecibels=15,this.analyserNode.smoothingTimeConstant=.85,this.analyserNode.fftSize=256,this.options.cutoff_frequency_low=i.cutoff_frequency_low,this.options.cutoff_frequency_high=i.cutoff_frequency_high,i)this[n]=e[n],this[n]=void 0===this[n]||null===this[n]?i[n]:this[n]}e.Effects.LowPassFilter.prototype=c,e.Effects.HighPassFilter.prototype=c,e.Effects.Distortion=function(t){this.options={},t=t||this.options;var i={gain:.5};for(var n in this.waveShaperNode=e.context.createWaveShaper(),this.inputNode=this.outputNode=this.waveShaperNode,i)this[n]=t[n],this[n]=void 0===this[n]||null===this[n]?i[n]:this[n]},e.Effects.Distortion.prototype=Object.create(r,{gain:{enumerable:!0,get:function(){return this.options.gain},set:function(e){t.Util.isInRange(e,0,1)&&(this.options.gain=e,this.adjustGain())}},adjustGain:{writable:!1,configurable:!1,enumerable:!1,value:function(){for(var e,i=t.Util.isNumber(this.options.gain)?parseInt(100*this.options.gain,10):50,n=new Float32Array(44100),o=Math.PI/180,s=0;s<44100;++s)e=2*s/44100-1,n[s]=(3+i)*e*20*o/(Math.PI+i*Math.abs(e));this.waveShaperNode.curve=n}}}),e.Effects.Flanger=function(t){this.options={},t=t||this.options;var i={time:.45,speed:.2,depth:.1,feedback:.1,mix:.5};for(var n in this.inputNode=e.context.createGain(),this.outputNode=e.context.createGain(),this.inputFeedbackNode=e.context.createGain(),this.wetGainNode=e.context.createGain(),this.dryGainNode=e.context.createGain(),this.delayNode=e.context.createDelay(),this.oscillatorNode=e.context.createOscillator(),this.gainNode=e.context.createGain(),this.feedbackNode=e.context.createGain(),this.oscillatorNode.type="sine",this.inputNode.connect(this.inputFeedbackNode),this.inputNode.connect(this.dryGainNode),this.inputFeedbackNode.connect(this.delayNode),this.inputFeedbackNode.connect(this.wetGainNode),this.delayNode.connect(this.wetGainNode),this.delayNode.connect(this.feedbackNode),this.feedbackNode.connect(this.inputFeedbackNode),this.oscillatorNode.connect(this.gainNode),this.gainNode.connect(this.delayNode.delayTime),this.dryGainNode.connect(this.outputNode),this.wetGainNode.connect(this.outputNode),this.oscillatorNode.start(0),i)this[n]=t[n],this[n]=void 0===this[n]||null===this[n]?i[n]:this[n]},e.Effects.Flanger.prototype=Object.create(r,{time:{enumberable:!0,get:function(){return this.options.time},set:function(e){t.Util.isInRange(e,0,1)&&(this.options.time=e,this.delayNode.delayTime.value=t.Util.normalize(e,.001,.02))}},speed:{enumberable:!0,get:function(){return this.options.speed},set:function(e){t.Util.isInRange(e,0,1)&&(this.options.speed=e,this.oscillatorNode.frequency.value=t.Util.normalize(e,.5,5))}},depth:{enumberable:!0,get:function(){return this.options.depth},set:function(e){t.Util.isInRange(e,0,1)&&(this.options.depth=e,this.gainNode.gain.value=t.Util.normalize(e,5e-4,.005))}},feedback:{enumberable:!0,get:function(){return this.options.feedback},set:function(e){t.Util.isInRange(e,0,1)&&(this.options.feedback=e,this.feedbackNode.gain.value=t.Util.normalize(e,0,.8))}},mix:{enumberable:!0,get:function(){return this.options.mix},set:function(i){t.Util.isInRange(i,0,1)&&(this.options.mix=i,this.dryGainNode.gain.value=e.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=e.Util.getWetLevel(this.mix))}}}),e.Effects.Panner3D=function(t){this.options={},t=t||this.options;let i={x:0,y:0,z:0,panningModel:"HRTF",distanceModel:"inverse",refDistance:1,maxDistance:1e4,rolloffFactor:1};if(this.inputNode=e.context.createGain(),this.outputNode=e.context.createGain(),!e.context.createPanner){console.warn("Your browser does not support 3D PannerNode."),this.inputNode.connect(this.outputNode);return}for(let n in this.pannerNode=e.context.createPanner(),this.pannerNode.panningModel=i.panningModel,this.pannerNode.distanceModel=i.distanceModel,this.pannerNode.refDistance=i.refDistance,this.pannerNode.maxDistance=i.maxDistance,this.pannerNode.rolloffFactor=i.rolloffFactor,this.inputNode.connect(this.pannerNode),this.pannerNode.connect(this.outputNode),i)this.options[n]=void 0!==t[n]?t[n]:i[n];this.pannerNode.setPosition(this.options.x,this.options.y,this.options.z)},e.Effects.Panner3D.prototype=Object.create(r,{x:{enumerable:!0,get:function(){return this.options.x},set:function(e){this.options.x=e,this._updatePosition()}},y:{enumerable:!0,get:function(){return this.options.y},set:function(e){this.options.y=e,this._updatePosition()}},z:{enumerable:!0,get:function(){return this.options.z},set:function(e){this.options.z=e,this._updatePosition()}},_updatePosition:{value:function(){this.pannerNode&&"function"==typeof this.pannerNode.setPosition&&this.pannerNode.setPosition(this.options.x,this.options.y,this.options.z)}}}),e.Effects.StereoPanner=function(t){this.options={},t=t||this.options;var i={pan:0};for(var n in this.inputNode=e.context.createGain(),this.outputNode=e.context.createGain(),e.context.createStereoPanner?(this.pannerNode=e.context.createStereoPanner(),this.inputNode.connect(this.pannerNode),this.pannerNode.connect(this.outputNode)):e.context.createPanner?(console.warn("Your browser does not support the StereoPannerNode. Will use PannerNode instead."),this.pannerNode=e.context.createPanner(),this.pannerNode.type="equalpower",this.inputNode.connect(this.pannerNode),this.pannerNode.connect(this.outputNode)):(console.warn("Your browser does not support the Panner effect."),this.inputNode.connect(this.outputNode)),i)this[n]=t[n],this[n]=void 0===this[n]||null===this[n]?i[n]:this[n]},e.Effects.StereoPanner.prototype=Object.create(r,{pan:{enumerable:!0,get:function(){return this.options.pan},set:function(e){t.Util.isInRange(e,-1,1)&&(this.options.pan=e,this.pannerNode&&(this.pannerNode.toString().indexOf("StereoPannerNode")>-1?this.pannerNode.pan.value=e:this.pannerNode.setPosition(e,0,1-Math.abs(e))))}}}),e.Effects.Convolver=function(i,n){this.options={},i=i||this.options;var o=this,s=new XMLHttpRequest,r={mix:.5};for(var a in this.callback=n,this.inputNode=e.context.createGain(),this.convolverNode=e.context.createConvolver(),this.outputNode=e.context.createGain(),this.wetGainNode=e.context.createGain(),this.dryGainNode=e.context.createGain(),this.inputNode.connect(this.convolverNode),this.convolverNode.connect(this.wetGainNode),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.wetGainNode.connect(this.outputNode),r)this[a]=i[a],this[a]=void 0===this[a]||null===this[a]?r[a]:this[a];if(!i.impulse){console.error("No impulse file specified.");return}s.open("GET",i.impulse,!0),s.responseType="arraybuffer",s.onload=function(i){var n=i.target.response;e.context.decodeAudioData(n,function(e){o.convolverNode.buffer=e,o.callback&&t.Util.isFunction(o.callback)&&o.callback()},function(e){e=e||Error("Error decoding impulse file"),o.callback&&t.Util.isFunction(o.callback)&&o.callback(e)})},s.onreadystatechange=function(e){4===s.readyState&&200!==s.status&&console.error("Error while fetching "+i.impulse+". "+s.statusText)},s.send()},e.Effects.Convolver.prototype=Object.create(r,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(i){t.Util.isInRange(i,0,1)&&(this.options.mix=i,this.dryGainNode.gain.value=e.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=e.Util.getWetLevel(this.mix))}}}),e.Effects.PingPongDelay=function(t){this.options={},t=t||this.options;var i={feedback:.5,time:.3,mix:.5};for(var n in this.inputNode=e.context.createGain(),this.outputNode=e.context.createGain(),this.delayNodeLeft=e.context.createDelay(),this.delayNodeRight=e.context.createDelay(),this.dryGainNode=e.context.createGain(),this.wetGainNode=e.context.createGain(),this.feedbackGainNode=e.context.createGain(),this.channelMerger=e.context.createChannelMerger(2),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.delayNodeLeft.connect(this.channelMerger,0,0),this.delayNodeRight.connect(this.channelMerger,0,1),this.delayNodeLeft.connect(this.delayNodeRight),this.feedbackGainNode.connect(this.delayNodeLeft),this.delayNodeRight.connect(this.feedbackGainNode),this.inputNode.connect(this.feedbackGainNode),this.channelMerger.connect(this.wetGainNode),this.wetGainNode.connect(this.outputNode),i)this[n]=t[n],this[n]=void 0===this[n]||null===this[n]?i[n]:this[n]},e.Effects.PingPongDelay.prototype=Object.create(r,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(i){t.Util.isInRange(i,0,1)&&(this.options.mix=i,this.dryGainNode.gain.value=e.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=e.Util.getWetLevel(this.mix))}},time:{enumerable:!0,get:function(){return this.options.time},set:function(e){t.Util.isInRange(e,0,180)&&(this.options.time=e,this.delayNodeLeft.delayTime.value=e,this.delayNodeRight.delayTime.value=e)}},feedback:{enumerable:!0,get:function(){return this.options.feedback},set:function(e){t.Util.isInRange(e,0,1)&&(this.options.feedback=parseFloat(e,10),this.feedbackGainNode.gain.value=this.feedback)}}}),e.Effects.Reverb=function(t){this.options={},t=t||this.options;var i={mix:.5,time:.01,decay:.01,reverse:!1};for(var n in this.inputNode=e.context.createGain(),this.reverbNode=e.context.createConvolver(),this.outputNode=e.context.createGain(),this.wetGainNode=e.context.createGain(),this.dryGainNode=e.context.createGain(),this.inputNode.connect(this.reverbNode),this.reverbNode.connect(this.wetGainNode),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.wetGainNode.connect(this.outputNode),i)this[n]=t[n],this[n]=void 0===this[n]||null===this[n]?i[n]:this[n];h.bind(this)()},e.Effects.Reverb.prototype=Object.create(r,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(i){t.Util.isInRange(i,0,1)&&(this.options.mix=i,this.dryGainNode.gain.value=e.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=e.Util.getWetLevel(this.mix))}},time:{enumerable:!0,get:function(){return this.options.time},set:function(e){t.Util.isInRange(e,1e-4,10)&&(this.options.time=e,h.bind(this)())}},decay:{enumerable:!0,get:function(){return this.options.decay},set:function(e){t.Util.isInRange(e,1e-4,10)&&(this.options.decay=e,h.bind(this)())}},reverse:{enumerable:!0,get:function(){return this.options.reverse},set:function(e){t.Util.isBool(e)&&(this.options.reverse=e,h.bind(this)())}}}),e.Effects.Bitcrusher=function(e){let i=t.context;this.inputNode=i.createGain(),this.outputNode=i.createGain(),this.bits=e.bits||4,this.frequency=e.frequency||44100,this.crusherNode=i.createScriptProcessor(4096,1,1);let n=this;this.crusherNode.onaudioprocess=function(e){let t=e.inputBuffer,o=e.outputBuffer,s=Math.pow(.5,n.bits-1),r=n.frequency/i.sampleRate;for(let a=0;a<o.numberOfChannels;a++){let c=t.getChannelData(a),h=o.getChannelData(a);for(let u=0;u<c.length;u++)u%r==0?h[u]=Math.floor(c[u]/s)*s:h[u]=h[u-1]}},this.inputNode.connect(this.crusherNode),this.crusherNode.connect(this.outputNode),this.connect=function(e){this.outputNode.connect(e)},this.disconnect=function(){this.outputNode.disconnect()}},e.Effects.Bitcrusher.prototype={constructor:e.Effects.Bitcrusher,setBits:function(e){e>=1&&e<=16&&(this.bits=e)},getBits:function(){return this.bits},setFrequency:function(e){e>0&&(this.frequency=e)},getFrequency:function(){return this.frequency}},e.Effects.ThreeBandEqualizer=function(e){u.call(this,e)};var d=Object.create(r,{cutoff_frequency_low:{enumerable:!0,get:function(){return this.options.cutoff_frequency_low},set:function(t){e.Util.isInRange(t,10,22050)&&(this.options.cutoff_frequency_low=t,this.lowFilterNode.frequency.value=t,this.midFilterNode.frequency.value=.707*(this.options.cutoff_frequency_low+this.options.cutoff_frequency_high))}},cutoff_frequency_high:{enumerable:!0,get:function(){return this.options.cutoff_frequency_high},set:function(t){e.Util.isInRange(t,10,22050)&&(this.options.cutoff_frequency_high=t,this.highFilterNode.frequency.value=t,this.midFilterNode.frequency.value=.707*(this.options.cutoff_frequency_low+this.options.cutoff_frequency_high))}},low_band_gain:{enumerable:!0,get:function(){return this.options.low_band_gain},set:function(t){e.Util.isInRange(t,-40,15)&&(this.options.low_band_gain=t,this.lowGainNode.gain.value=Math.pow(10,t/20))}},mid_band_gain:{enumerable:!0,get:function(){return this.options.mid_band_gain},set:function(t){e.Util.isInRange(t,-40,15)&&(this.options.mid_band_gain=t,this.midGainNode.gain.value=Math.pow(10,t/20))}},high_band_gain:{enumerable:!0,get:function(){return this.options.high_band_gain},set:function(t){e.Util.isInRange(t,-40,15)&&(this.options.high_band_gain=t,this.highGainNode.gain.value=Math.pow(10,t/20))}},low_peak:{enumerable:!0,get:function(){return this.lowFilterNode.Q.value},set:function(t){e.Util.isInRange(t,1e-4,100)&&(this.lowFilterNode.Q.value=t)}},mid_peak:{enumerable:!0,get:function(){return this.midFilterNode.Q.value},set:function(t){e.Util.isInRange(t,1e-4,100)&&(this.midFilterNode.Q.value=t)}},high_peak:{enumerable:!0,get:function(){return this.highFilterNode.Q.value},set:function(t){e.Util.isInRange(t,1e-4,1e3)&&(this.highFilterNode.Q.value=t)}},visualizerBinCount:{enumerable:!0,get:function(){return this.analyserNode.frequencyBinCount},set:function(t){e.Util.isInRange(t,16,1024)&&(this.analyzerNode.fftSize=t)}},analyser:{enumerable:!0,get:function(){return this.analyserNode}},frequencyData:{enumerable:!0,get:function(){return void 0===this.byteFrequencyData&&(this.byteFrequencyData=new Uint8Array(this.analyserNode.frequencyBinCount.value)),this.analyserNode.getByteFrequencyData(this.FrequencyData),this.byteFrequencyData}}});e.Effects.ThreeBandEqualizer.prototype=d,e.Effects.Tremolo=function(t){this.options={},t=t||this.options;var i={speed:4,depth:1,mix:.8};for(var n in this.inputNode=e.context.createGain(),this.outputNode=e.context.createGain(),this.dryGainNode=e.context.createGain(),this.wetGainNode=e.context.createGain(),this.tremoloGainNode=e.context.createGain(),this.tremoloGainNode.gain.value=0,this.lfoNode=e.context.createOscillator(),this.shaperNode=e.context.createWaveShaper(),this.shaperNode.curve=new Float32Array([0,1]),this.shaperNode.connect(this.tremoloGainNode.gain),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.lfoNode.connect(this.shaperNode),this.lfoNode.type="sine",this.lfoNode.start(0),this.inputNode.connect(this.tremoloGainNode),this.tremoloGainNode.connect(this.wetGainNode),this.wetGainNode.connect(this.outputNode),i)this[n]=t[n],this[n]=void 0===this[n]||null===this[n]?i[n]:this[n]},e.Effects.Tremolo.prototype=Object.create(r,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(i){t.Util.isInRange(i,0,1)&&(this.options.mix=i,this.dryGainNode.gain.value=e.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=e.Util.getWetLevel(this.mix))}},speed:{enumerable:!0,get:function(){return this.options.speed},set:function(e){t.Util.isInRange(e,0,20)&&(this.options.speed=e,this.lfoNode.frequency.value=e)}},depth:{enumerable:!0,get:function(){return this.options.depth},set:function(e){t.Util.isInRange(e,0,1)&&(this.options.depth=e,this.shaperNode.curve=new Float32Array([1-e,1]))}}}),e.Effects.DubDelay=function(t){this.options={},t=t||this.options;var i={feedback:.6,time:.7,mix:.5,cutoff:700};for(var n in this.inputNode=e.context.createGain(),this.outputNode=e.context.createGain(),this.dryGainNode=e.context.createGain(),this.wetGainNode=e.context.createGain(),this.feedbackGainNode=e.context.createGain(),this.delayNode=e.context.createDelay(),this.bqFilterNode=e.context.createBiquadFilter(),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.inputNode.connect(this.wetGainNode),this.inputNode.connect(this.feedbackGainNode),this.feedbackGainNode.connect(this.bqFilterNode),this.bqFilterNode.connect(this.delayNode),this.delayNode.connect(this.feedbackGainNode),this.delayNode.connect(this.wetGainNode),this.wetGainNode.connect(this.outputNode),i)this[n]=t[n],this[n]=void 0===this[n]||null===this[n]?i[n]:this[n]},e.Effects.DubDelay.prototype=Object.create(r,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(i){t.Util.isInRange(i,0,1)&&(this.options.mix=i,this.dryGainNode.gain.value=e.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=e.Util.getWetLevel(this.mix))}},time:{enumerable:!0,get:function(){return this.options.time},set:function(e){t.Util.isInRange(e,0,180)&&(this.options.time=e,this.delayNode.delayTime.value=e)}},feedback:{enumerable:!0,get:function(){return this.options.feedback},set:function(e){t.Util.isInRange(e,0,1)&&(this.options.feedback=parseFloat(e,10),this.feedbackGainNode.gain.value=this.feedback)}},cutoff:{enumerable:!0,get:function(){return this.options.cutoff},set:function(e){t.Util.isInRange(e,0,4e3)&&(this.options.cutoff=e,this.bqFilterNode.frequency.value=this.cutoff)}}}),e.Effects.RingModulator=function(t){this.options={},t=t||this.options;var i={speed:30,distortion:1,mix:.5};for(var n in this.inputNode=e.context.createGain(),this.outputNode=e.context.createGain(),this.dryGainNode=e.context.createGain(),this.wetGainNode=e.context.createGain(),this.vIn=e.context.createOscillator(),this.vIn.start(0),this.vInGain=e.context.createGain(),this.vInGain.gain.value=.5,this.vInInverter1=e.context.createGain(),this.vInInverter1.gain.value=-1,this.vInInverter2=e.context.createGain(),this.vInInverter2.gain.value=-1,this.vInDiode1=new l(e.context),this.vInDiode2=new l(e.context),this.vInInverter3=e.context.createGain(),this.vInInverter3.gain.value=-1,this.vcInverter1=e.context.createGain(),this.vcInverter1.gain.value=-1,this.vcDiode3=new l(e.context),this.vcDiode4=new l(e.context),this.outGain=e.context.createGain(),this.outGain.gain.value=3,this.compressor=e.context.createDynamicsCompressor(),this.compressor.threshold.value=-24,this.compressor.ratio.value=16,this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.inputNode.connect(this.vcInverter1),this.inputNode.connect(this.vcDiode4.node),this.vcInverter1.connect(this.vcDiode3.node),this.vIn.connect(this.vInGain),this.vInGain.connect(this.vInInverter1),this.vInGain.connect(this.vcInverter1),this.vInGain.connect(this.vcDiode4.node),this.vInInverter1.connect(this.vInInverter2),this.vInInverter1.connect(this.vInDiode2.node),this.vInInverter2.connect(this.vInDiode1.node),this.vInDiode1.connect(this.vInInverter3),this.vInDiode2.connect(this.vInInverter3),this.vInInverter3.connect(this.compressor),this.vcDiode3.connect(this.compressor),this.vcDiode4.connect(this.compressor),this.compressor.connect(this.outGain),this.outGain.connect(this.wetGainNode),this.wetGainNode.connect(this.outputNode),i)this[n]=t[n],this[n]=void 0===this[n]||null===this[n]?i[n]:this[n]};var l=function(e){this.context=e,this.node=this.context.createWaveShaper(),this.vb=.2,this.vl=.4,this.h=1,this.setCurve()};function f(e){for(var i=t.context.sampleRate,n=new Float32Array(i),o=Math.PI/180,s=0;s<i;s++){var r=2*s/i-1;n[s]=(3+e)*r*20*o/(Math.PI+e*Math.abs(r))}return n}l.prototype.setDistortion=function(e){return this.h=e,this.setCurve()},l.prototype.setCurve=function(){var e,t,i,n,o,s,r,a;for(t=1024,o=new Float32Array(t),e=s=0,r=o.length;0<=r?s<r:s>r;e=0<=r?++s:--s)n=(i=Math.abs(i=(e-t/2)/(t/2)))<=this.vb?0:this.vb<i&&i<=this.vl?this.h*(Math.pow(i-this.vb,2)/(2*this.vl-2*this.vb)):this.h*i-this.h*this.vl+this.h*(Math.pow(this.vl-this.vb,2)/(2*this.vl-2*this.vb)),o[e]=n;return this.node.curve=o},l.prototype.connect=function(e){return this.node.connect(e)},e.Effects.RingModulator.prototype=Object.create(r,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(i){t.Util.isInRange(i,0,1)&&(this.options.mix=i,this.dryGainNode.gain.value=e.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=e.Util.getWetLevel(this.mix))}},speed:{enumerable:!0,get:function(){return this.options.speed},set:function(e){t.Util.isInRange(e,0,2e3)&&(this.options.speed=e,this.vIn.frequency.value=e)}},distortion:{enumerable:!0,get:function(){return this.options.distortion},set:function(e){if(t.Util.isInRange(e,.2,50)){this.options.distortion=parseFloat(e,10);for(var i=[this.vInDiode1,this.vInDiode2,this.vcDiode3,this.vcDiode4],n=0,o=i.length;n<o;n++)i[n].setDistortion(e)}}}}),e.Effects.Quadrafuzz=function(e){this.options={},e=e||this.options;var i={lowGain:.6,midLowGain:.8,midHighGain:.5,highGain:.6};this.inputNode=t.context.createGain(),this.outputNode=t.context.createGain(),this.dryGainNode=t.context.createGain(),this.wetGainNode=t.context.createGain(),this.lowpassLeft=t.context.createBiquadFilter(),this.lowpassLeft.type="lowpass",this.lowpassLeft.frequency.value=147,this.lowpassLeft.Q.value=.7071,this.bandpass1Left=t.context.createBiquadFilter(),this.bandpass1Left.type="bandpass",this.bandpass1Left.frequency.value=587,this.bandpass1Left.Q.value=.7071,this.bandpass2Left=t.context.createBiquadFilter(),this.bandpass2Left.type="bandpass",this.bandpass2Left.frequency.value=2490,this.bandpass2Left.Q.value=.7071,this.highpassLeft=t.context.createBiquadFilter(),this.highpassLeft.type="highpass",this.highpassLeft.frequency.value=4980,this.highpassLeft.Q.value=.7071,this.overdrives=[];for(var n=0;n<4;n++)this.overdrives[n]=t.context.createWaveShaper(),this.overdrives[n].curve=f();this.inputNode.connect(this.wetGainNode),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode);var o=[this.lowpassLeft,this.bandpass1Left,this.bandpass2Left,this.highpassLeft];for(n=0;n<o.length;n++)this.wetGainNode.connect(o[n]),o[n].connect(this.overdrives[n]),this.overdrives[n].connect(this.outputNode);for(var s in i)this[s]=e[s],this[s]=void 0===this[s]||null===this[s]?i[s]:this[s]},e.Effects.Quadrafuzz.prototype=Object.create(r,{lowGain:{enumerable:!0,get:function(){return this.options.lowGain},set:function(e){t.Util.isInRange(e,0,1)&&(this.options.lowGain=e,this.overdrives[0].curve=f(t.Util.normalize(this.lowGain,0,150)))}},midLowGain:{enumerable:!0,get:function(){return this.options.midLowGain},set:function(e){t.Util.isInRange(e,0,1)&&(this.options.midLowGain=e,this.overdrives[1].curve=f(t.Util.normalize(this.midLowGain,0,150)))}},midHighGain:{enumerable:!0,get:function(){return this.options.midHighGain},set:function(e){t.Util.isInRange(e,0,1)&&(this.options.midHighGain=e,this.overdrives[2].curve=f(t.Util.normalize(this.midHighGain,0,150)))}},highGain:{enumerable:!0,get:function(){return this.options.highGain},set:function(e){t.Util.isInRange(e,0,1)&&(this.options.highGain=e,this.overdrives[3].curve=f(t.Util.normalize(this.highGain,0,150)))}}});return e})();
  /* eslint-enable */

  const { vm, Cast } = Scratch;
  const runtime = vm.runtime;
  const scratchAudio = runtime.audioEngine;

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

  let deltaTime = 0,
    prevFrameTime = 0;
  let soundBank = Object.create(null);
  let settings = { flagCtrl: false };

  class SPtuneShark3 {
    constructor() {
      runtime.on("PROJECT_START", () => {
        if (settings.flagCtrl) this.ctrlSounds({ CONTROL: "stop" });
      });
      runtime.on("PROJECT_STOP_ALL", () => {
        if (settings.flagCtrl) this.ctrlSounds({ CONTROL: "stop" });
      });
      runtime.on("BEFORE_EXECUTE", () => {
        const now = performance.now();
        deltaTime = prevFrameTime === 0 ? 0 : (now - prevFrameTime) / 1000;
        prevFrameTime = now;

        const projectVal = scratchAudio.inputNode.gain.value;
        const speedBuffer = runtime.frameLoop.framerate / 1000;
        Object.values(soundBank).forEach((bank) => {
          if (bank.loaded) {
            const sound = bank.context;
            // Clamp Volume to Project Volume
            const curVol = Math.min(100, Math.max(0, bank.vol)) / 100;
            sound.volume = curVol * projectVal;

            if (sound.playing) {
              // Increment Current Time
              const leng =
                sound.loop && bank.loopParm[1]
                  ? bank.loopParm[1]
                  : sound.sourceNode.buffer.duration;
              let time = bank.currentTime;
              time += deltaTime * bank.rate;
              if (sound.loop)
                time =
                  Math.max(0, (time % (leng - bank.loopParm[0])) + 0.00001) +
                  bank.loopParm[0];
              else time = Math.min(leng, Math.max(0, time));
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
      runtime.on("RUNTIME_PAUSED", () => this.ctrlSounds({ CONTROL: "pause" }));
      runtime.on("RUNTIME_UNPAUSED", () =>
        this.ctrlSounds({ CONTROL: "unpause" })
      );
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
              TIME: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              DECAY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
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
    startHats(data) {
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

    generateData(name, src, context, isVanilla) {
      return {
        name,
        src,
        context,
        isVanilla,
        effects: {},
        loaded: true,
        reversed: false,
        currentTime: 0,
        vol: 100,
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
      for (let i = 1; i < peaks.length; i++)
        intervals.push(peaks[i] - peaks[i - 1]);
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
      if (src.loop)
        this.loopParams({
          NAME: sound.name,
          START: sound.loopParm[0],
          END: sound.loopParm[1],
        });
    }

    checkForStatic(obj1, obj2) {
      for (let k in obj1) {
        if (obj1[k] !== obj2[k]) return false;
      }
      return true;
    }

    updateEffect(effect, sound, name, args) {
      delete args.NAME;
      delete args.TYPE;
      effect.arguments = args; // Match Original Values, not Converted
      if (sound.effects[name] === undefined) {
        effect.id = name;
        sound.context.addEffect(effect);
        sound.effects[name] = effect;
      } else {
        // Dont Remove the Effect (Causes Glitches in Forever Loops), simply change each value
        // We use args just in case some Effects dont store them in the audio context
        const options = effect.options;
        const thisEffect = sound.context.effects.find(
          (effect) => effect.id === name
        );
        const isArgsStatic = this.checkForStatic(
          thisEffect.arguments,
          effect.arguments
        );
        if (isArgsStatic) return;

        thisEffect.arguments = effect.arguments;
        thisEffect.options = options;
        switch (name) {
          case "PAN": {
            const pan = options.pan;
            thisEffect.pannerNode.pan.value = pan;
            thisEffect.pan = pan;
            return;
          }
          case "PAN3D": {
            thisEffect.x = Cast.toNumber(args.X);
            thisEffect.y = Cast.toNumber(args.Y);
            thisEffect.z = Cast.toNumber(args.Z) - 1;
            return;
          }
          case "DISTORTION": {
            thisEffect.gain = options.gain;
            return;
          }
          case "BITCRUSH": {
            thisEffect.frequency = Math.max(30000, Cast.toNumber(args.FREQ));
            thisEffect.bits = Math.max(10, Cast.toNumber(args.BITS)) / 10;
            return;
          }
          case "LOWPASS":
          case "HIGHPASS": {
            const freq = Cast.toNumber(args.FREQ);
            const peak = Cast.toNumber(args.PEAK) / 5;
            thisEffect.filterNode.frequency.value = freq;
            thisEffect.inputNode.frequency.value = freq;
            thisEffect.frequency = freq;
            thisEffect.filterNode.Q.value = peak;
            thisEffect.inputNode.Q.value = peak;
            thisEffect.peak = peak;
            return;
          }
          case "COMPRESSOR": {
            const node = thisEffect.compressorNode;
            node.knee.value = Cast.toNumber(args.KNEE) / 2.5;
            node.ratio.value = Cast.toNumber(args.RATIO) / 5;
            node.threshold.value = Math.min(
              0,
              Math.max(-100, Cast.toNumber(args.THRESH) * -1)
            );
            node.attack.value = Math.min(
              0,
              Math.max(1, Cast.toNumber(args.ATTACK) / 100)
            );
            node.release.value = Math.min(
              0,
              Math.max(1, Cast.toNumber(args.RELEASE) / 100)
            );
            return;
          }
        }
        Object.assign(thisEffect, options);
      }
    }

    play(sound, atTime, con) {
      try {
        if (sound.playing && con.overlap) {
          const clone = sound.clone(); // Clone context to Menu for Control Purposes
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
            clone.masterVolume.disconnect();
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
          if (sound.loop)
            this.loopParams({
              NAME: con.name,
              START: con.loopParm[0],
              END: con.loopParm[1],
            });
        }
        this.startHats({ name: con.name, type: "starts" });
      } catch {
        console.warn(Scratch.translate("Audio has not loaded yet!"));
        sound.stop(); // Reset
      }
    }

    typeOverlay(sound, type) {
      const ctx = sound.context;
      if (type === "stop") {
        const lastTime = sound.currentTime;
        ctx.stop();
        sound.currentTime = lastTime;
        for (let i = 0; i < sound.overlays.length; i++)
          sound.overlays[i].stop();
        this.startHats({ name: sound.name, type: "stops" });
      } else if (type === "pause") {
        ctx.pause();
        for (let i = 0; i < sound.overlays.length; i++)
          sound.overlays[i].pause();
        this.startHats({ name: sound.name, type: "stops" });
      } else {
        this.startHats({ name: sound.name, type: "starts" });
        if (!ctx.paused) return;
        const lastTime = sound.currentTime;
        ctx.stop();
        sound.currentTime = lastTime;
        ctx.play(0, lastTime);
        this.updateAudioNodes(ctx.sourceNode, sound);
      }
    }

    attachAnalyser(bank, engine) {
      bank.analyser = Pizzicato.context.createAnalyser();
      bank.analyser.fftSize = 1024;
      bank.analyser.smoothingTimeConstant = 0.8;
      engine.connect(bank.analyser);
    }

    trackEndFn(bank, engine) {
      bank.currentTime =
        engine.loop && bank.loopParm[1]
          ? bank.loopParm[1]
          : engine.sourceNode.buffer.duration;
    }

    // Block Funcs
    importURL(args, util) {
      return new Promise((resolve) => {
        this.deleteSound(args);
        if (!args.URL) return resolve();
        const engine = new Pizzicato.Sound(
          {
            source: "file",
            options: { path: args.URL, attack: 0 },
          },
          () => {
            try {
              engine.sourceNode = engine.getSourceNode();
              const bank = (soundBank[args.NAME] = this.generateData(
                args.NAME,
                args.URL,
                engine,
                false
              ));

              this.attachAnalyser(bank, engine);
              engine.on("stop", () => this.trackEndFn(bank, engine));
              resolve();
            } catch {
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
      const sound = target.sounds.find((i) => {
        return i.name === name;
      });
      if (sound) {
        this.deleteSound(args);
        const sourceURL = `/${target.name.replaceAll("/", "")}/${sound.name.replaceAll("/", "")}.${sound.dataFormat}`;
        const buffer = target.soundBank.soundPlayers[sound.soundId].buffer;
        const engine = new Pizzicato.Sound({
          source: "buffer",
          options: { buffer, attack: 0 },
        });
        // this part of the Library was modified to work like this
        engine.sourceNode = engine.getSourceNode();
        const bank = this.generateData(args.NAME, sourceURL, engine, true);
        soundBank[args.NAME] = bank;
        this.attachAnalyser(bank, engine);
        engine.on("stop", () => this.trackEndFn(bank, engine));
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
        if (sound1.binds[sound2.name])
          this.typeOverlay(sound1.binds[sound2.name], "stop");
        if (sound2.binds[sound1.name])
          this.typeOverlay(sound2.binds[sound1.name], "stop");
        sound1.binds[sound2.name] = sound2;
        sound2.binds[sound1.name] = sound1;
      } else {
        delete sound1.binds[sound2.name];
        delete sound2.binds[sound1.name];
      }
    }

    startSound(args) {
      const sound = soundBank[args.NAME];
      if (sound !== undefined) this.play(sound.context, 0, sound);
    }

    startSoundAt(args) {
      const sound = soundBank[args.NAME];
      const time = Cast.toNumber(args.TIME);
      if (sound !== undefined) this.play(sound.context, time, sound);
    }

    playAndStop(args, util) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      if (util.stackFrame.awaitingSound === undefined) {
        util.stackFrame.awaitingSound = true;
        this.play(sound.context, Cast.toNumber(args.TIME), sound);
        util.yield();
      } else if (util.stackFrame.awaitingSound) {
        if (sound.currentTime >= Cast.toNumber(args.MAX))
          this.typeOverlay(sound, "stop");
        else util.yield();
      }
    }

    stopSound(args) {
      const sound = soundBank[args.NAME];
      if (sound !== undefined) this.typeOverlay(sound, "stop");
    }

    pauseSound(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      if (args.UN_PAUSE === "pause") this.typeOverlay(sound, "pause");
      else this.typeOverlay(sound, "unpause");
    }

    ctrlSounds(args) {
      const allSounds = Object.values(soundBank);
      if (args.CONTROL === "start")
        allSounds.forEach((sound) => {
          this.play(sound.context, 0, sound);
        });
      else if (args.CONTROL === "stop")
        allSounds.forEach((sound) => {
          sound.context.stop();
        });
      else if (args.CONTROL === "pause")
        allSounds.forEach((sound) => {
          this.typeOverlay(sound, "pause");
        });
      else
        allSounds.forEach((sound) => {
          this.typeOverlay(sound, "unpause");
        });
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
      if (args.TYPE === "off") this.typeOverlay(sound, "stop");
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
      this.typeOverlay(sound, "stop");
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
      this.stopSound(args);
      if (sound) {
        sound.vol = 0;
        sound.context.volume = 0;
      }
      delete soundBank[args.NAME];
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
          return sound.vol;
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
          return JSON.stringify(effect.arguments);
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
      )
        return 0;

      let value = 0;
      if (
        args.TYPE !== "raw noise" &&
        sound._cache[args.TYPE][`${time}${chan}`] !== undefined
      )
        value = sound._cache[args.TYPE][`${time}${chan}`];
      else {
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
          for (let i = startSample; i < endSample; i++)
            value += channelData[i] * channelData[i];
          const rms = Math.sqrt(value / (endSample - startSample));
          const dB = 20 * Math.log10(rms);
          value = Math.min(Math.max((dB + 50) / 50, 0), 1) * 100;
          sound._cache["loudness"][`${time}${chan}`] = value;
        } else {
          return "";
        }
      }
      return isNaN(value) ? 0 : value * sound.gain;
    }

    setVol(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      sound.vol = Math.max(0, Cast.toNumber(args.NUM));
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
      if (args.TYPE === "pitch") sound.pitch = Math.max(0, value + 1);
      else if (args.TYPE === "detune") sound.detune = value * 1000;
      else if (args.TYPE === "speed") sound.speed = Math.max(0, value);
      else if (args.TYPE === "gain") sound.gain = value;
      else if (args.TYPE === "attack")
        sound.attack = Math.max(0, value);
      else if (args.TYPE === "release")
        sound.release = Math.max(0, value);
      else if (args.TYPE === "pan") {
        const pan = new Pizzicato.Effects.StereoPanner({
          pan: Math.max(-1, Math.min(1, value)),
        });
        return this.updateEffect(pan, sound, "PAN", args);
      } else if (args.TYPE === "distortion") {
        const distort = new Pizzicato.Effects.Distortion({ gain: value });
        return this.updateEffect(distort, sound, "DISTORTION", args);
      }
      sound.rate = sound.pitch * sound.speed * Math.pow(2, sound.detune / 1200);
      this.updateAudioNodes(ctx.sourceNode, sound);
    }

    setReverb(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      const reverb = new Pizzicato.Effects.Reverb({
        time: Cast.toNumber(args.TIME) / 10,
        decay: Cast.toNumber(args.DECAY) / 10,
        mix: Cast.toNumber(args.MIX) / 100,
      });
      this.updateEffect(reverb, sound, "REVERB", args);
    }

    setDelay(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      const delay = new Pizzicato.Effects.Delay({
        time: Math.min(1, Math.max(0, Cast.toNumber(args.TIME) / 100)),
        decay: Cast.toNumber(args.FEED) / 100,
        mix: Cast.toNumber(args.MIX) / 100,
      });
      this.updateEffect(delay, sound, "DELAY", args);
    }

    setFuzz(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      const fuzz = new Pizzicato.Effects.Quadrafuzz({
        lowGain: Math.min(1, Math.max(0, Cast.toNumber(args.LOW) / 100)),
        midLowGain: Math.min(1, Math.max(0, Cast.toNumber(args.MED1) / 100)),
        midHighGain: Math.min(1, Math.max(0, Cast.toNumber(args.MED2) / 100)),
        highGain: Math.min(1, Math.max(0, Cast.toNumber(args.HIGH) / 100)),
        mix: Cast.toNumber(args.MIX) / 100,
      });
      this.updateEffect(fuzz, sound, "FUZZ", args);
    }

    setBitcrush(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      /* NOTE: Bitcrusher uses "ScriptProcessorNode"
        despite being "deprecated" they are still widely used
      */
      const bitcrush = new Pizzicato.Effects.Bitcrusher({
        bits: Math.max(10, Cast.toNumber(args.BITS)) / 10,
        frequency: Math.max(30000, Cast.toNumber(args.FREQ)),
      });
      this.updateEffect(bitcrush, sound, "BITCRUSH", args);
    }

    setPan3D(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      const pan3d = new Pizzicato.Effects.Panner3D({
        x: Cast.toNumber(args.X),
        y: Cast.toNumber(args.Y),
        z: Cast.toNumber(args.Z) - 1,
      });
      this.updateEffect(pan3d, sound, "PAN3D", args);
    }

    setTremolo(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      const tremelo = new Pizzicato.Effects.Tremolo({
        speed: Cast.toNumber(args.SPEED) / 5,
        depth: Cast.toNumber(args.DEPTH) / 100,
        mix: Cast.toNumber(args.MIX) / 100,
      });
      this.updateEffect(tremelo, sound, "TREMOLO", args);
    }

    setPass(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      const json = {
        frequency: Cast.toNumber(args.FREQ),
        peak: Cast.toNumber(args.PEAK) / 5,
      };
      if (args.TYPE === "highpass") {
        const highpass = new Pizzicato.Effects.HighPassFilter(json);
        this.updateEffect(highpass, sound, "HIGHPASS", args);
      } else {
        const lowpass = new Pizzicato.Effects.LowPassFilter(json);
        this.updateEffect(lowpass, sound, "LOWPASS", args);
      }
    }

    setFlanger(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      const flang = new Pizzicato.Effects.Flanger({
        time: Cast.toNumber(args.TIME) / 100,
        speed: Cast.toNumber(args.SPEED) / 100,
        depth: Cast.toNumber(args.DEPTH) / 100,
        feedback: Cast.toNumber(args.FEED) / 100,
        mix: Cast.toNumber(args.MIX) / 100,
      });
      this.updateEffect(flang, sound, "FLANGER", args);
    }

    setCompress(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      const compress = new Pizzicato.Effects.Compressor({
        threshold: Math.min(0, Math.max(-100, Cast.toNumber(args.THRESH) * -1)),
        ratio: Cast.toNumber(args.RATIO) / 5,
        attack: Math.min(0, Math.max(1, Cast.toNumber(args.ATTACK) / 100)),
        release: Math.min(0, Math.max(1, Cast.toNumber(args.RELEASE) / 100)),
        knee: Cast.toNumber(args.KNEE) / 2.5,
      });
      this.updateEffect(compress, sound, "COMPRESSOR", args);
    }

    setEqualize(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      const equalizer = new Pizzicato.Effects.ThreeBandEqualizer({
        cutoff_frequency_high: 12000 + Cast.toNumber(args.CUT_HIGH) * 120,
        cutoff_frequency_low: 12000 + Cast.toNumber(args.CUT_LOW) * 120,
        low_band_gain: Cast.toNumber(args.LOW) / 10,
        mid_band_gain: Cast.toNumber(args.MID) / 10,
        high_band_gain: Cast.toNumber(args.HIGH) / 10,
      });
      this.updateEffect(equalizer, sound, "EQUALIZER", args);
    }
  }

  Scratch.extensions.register(new SPtuneShark3());
})(Scratch);
