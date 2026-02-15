// Name: Tune Shark V3
// ID: SPtuneShark3
// Description: An advanced audio engine, providing complex sound control.
// By: SharkPool
// License: MIT AND LGPL-3.0

// Version V.3.5.22

(async function (Scratch) {
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
  const PzInitializer = await Scratch.external.evalAndReturn(
    "https://raw.githubusercontent.com/SharkPool-SP/pizzicato/bcf8c452bf25b8d34b13f745a35d77d23279d2b8/distr/Pizzicato.min.js",
    "Pizzicato"
  );

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
            opcode: "setBasicSoundEffect",
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
                menu: "basicEffects",
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
          basicEffects: { acceptReporters: true, items: simpleEffects },
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

    playSound(sound, atTime) {
      const context = sound.context;
      try {
        if (context.playing && sound.overlap) {
          // Clone context to soundBank for 'audioControlDo'
          const clone = context.clone();
          const newName = `${sound.name}_COPY_${Math.random()}`;
          soundBank[newName] = {
            ...sound,
            context: clone,
            name: newName,
            loopParm: [0, 0],
            currentTime: 0,
            overlap: false,
            overlays: [],
            isBind: false,
            binds: {},
          };
          clone.play(0, atTime);
          clone.sourceNode.playbackRate.value = sound.pitch;
          clone.sourceNode.gainSuccessor.gain.value = sound.gain;

          const overlayIndex = sound.overlays.length;
          sound.overlays.push(clone);
          clone.on("end", () => {
            clone.sourceNode.disconnect();
            clone.disconnect();

            sound.overlays.splice(overlayIndex, 1);
            delete soundBank[newName];
          });
        } else {
          if (!context.playing) sound.currentTime = atTime;
          context.play(0, atTime);
          const srcNode = context.sourceNode;
          this.updateAudioNodes(srcNode, sound);

          const binders = Object.values(sound.binds);
          if (binders.length) {
            binders.forEach((bindedSound) => {
              const bindedContext = bindedSound.context;
              if (!bindedContext.playing) bindedSound.currentTime = atTime;
              bindedContext.play(0, atTime);
              this.updateAudioNodes(bindedContext.sourceNode, bindedSound);
            });
          }
          if (context.loop) {
            this.loopParams({
              NAME: sound.name,
              START: sound.loopParm[0],
              END: sound.loopParm[1],
            });
          }
        }
        this.startDataHats({ name: sound.name, type: "starts" });
      } catch {
        console.warn(Scratch.translate("Audio has not loaded yet!"));
        context.stop(); // Reset
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
      if (sound !== undefined) this.playSound(sound, 0);
    }

    startSoundAt(args) {
      const sound = soundBank[args.NAME];
      const time = Cast.toNumber(args.TIME);
      if (sound !== undefined) this.playSound(sound, time);
    }

    playAndStop(args, util) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      if (util.stackFrame.awaitingSound === undefined) {
        util.stackFrame.awaitingSound = true;
        this.playSound(sound, Cast.toNumber(args.TIME));
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
        start: (sound) => this.playSound(sound, 0),
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
        if (ctx && ctx.sourceNode) {
          ctx.volume = 0;
          ctx.sourceNode.disconnect();
          ctx.disconnect();
        }
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

    setBasicSoundEffect(args) {
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
