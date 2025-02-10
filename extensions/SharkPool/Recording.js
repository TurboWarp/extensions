// Name: Recording
// ID: SPrecording
// Description: Record your voice while you run your projects!
// By: SharkPool
// License: MIT

// Version 1.3.0

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Recording must run unsandboxed");

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMTIuMDA1IiBoZWlnaHQ9IjExMi4wMDUiIHZpZXdCb3g9IjAgMCAxMTIuMDA1IDExMi4wMDUiPjxwYXRoIGQ9Ik0wIDU2LjAwM0MwIDI1LjA3MyAyNS4wNzQgMCA1Ni4wMDMgMGMzMC45MyAwIDU2LjAwMyAyNS4wNzQgNTYuMDAzIDU2LjAwMyAwIDMwLjkzLTI1LjA3NCA1Ni4wMDMtNTYuMDAzIDU2LjAwM0MyNS4wNzMgMTEyLjAwNiAwIDg2LjkzMiAwIDU2LjAwMyIgZmlsbD0iIzU3NjczMyIvPjxwYXRoIGQ9Ik02LjgzIDU2LjAwM0M2LjgzIDI4Ljg0NSAyOC44NDUgNi44MyA1Ni4wMDMgNi44M3M0OS4xNzMgMjIuMDE1IDQ5LjE3MyA0OS4xNzMtMjIuMDE1IDQ5LjE3My00OS4xNzMgNDkuMTczUzYuODMgODMuMTYxIDYuODMgNTYuMDAzIiBmaWxsPSIjN2I5MTQ5Ii8+PHBhdGggZD0iTTU1LjU0OCA3OC4xNTZjLTExLjM4MyAwLTIwLjg3NC03LjYzNS0yMy4wMy0xNy43NzJoNi40ODVjMi4wMjYgNi44MiA4LjY2NiAxMS44MjIgMTYuNTQ1IDExLjgyMiA3Ljg3OCAwIDE0LjUxOC01LjAwMiAxNi41NDQtMTEuODIyaDYuNDg1Yy0yLjE1NiAxMC4xMzctMTEuNjQ3IDE3Ljc3Mi0yMy4wMyAxNy43NzJ6IiBmaWxsPSIjZmZmIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMS41Ii8+PHBhdGggZD0iTTU2LjAwMyA2Ni4zMTJjLTYuNDY1IDAtMTEuNzA1LTUuNzAzLTExLjcwNS0xMi43MzdWMzQuMTA5YzAtNy4wMzQgNS4yNC0xMi43MzcgMTEuNzA1LTEyLjczN3MxMS43MDUgNS43MDMgMTEuNzA1IDEyLjczN3YxOS40NjZjMCA3LjAzNC01LjI0IDEyLjczNy0xMS43MDUgMTIuNzM3IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTUzLjYxNCA5MC42MzNjLTIuMzE3IDAtNC4xOTUtMS40MTYtNC4xOTUtMy4xNjN2LTguMjc1YzAtMS43NDcgMS44NzgtMy4xNjQgNC4xOTUtMy4xNjRoNC43NzhjMi4zMTcgMCA0LjE5NSAxLjQxNyA0LjE5NSAzLjE2NHY4LjI3NWMwIDEuNzQ3LTEuODc4IDMuMTY0LTQuMTk1IDMuMTY0eiIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZmIi8+PC9zdmc+";
  const blockIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3NS42NjciIGhlaWdodD0iNzUuNjY3IiB2aWV3Qm94PSIwIDAgNzUuNjY3IDc1LjY2NyI+PHBhdGggZD0iTTAgNzUuNjY2VjBoNzUuNjY2djc1LjY2NnoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMzcuMzc4IDU4LjIzOWMtMTAuNDg1IDAtMTkuMjI3LTcuMDM0LTIxLjIxMy0xNi4zN2g1Ljk3M2MxLjg2NyA2LjI4MiA3Ljk4MyAxMC44ODkgMTUuMjQgMTAuODg5czEzLjM3My00LjYwNyAxNS4yNC0xMC44OWg1Ljk3M2MtMS45ODYgOS4zMzctMTAuNzI5IDE2LjM3LTIxLjIxMyAxNi4zN3oiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBkPSJNMzcuNzk3IDQ3LjMyOWMtNS45NTUgMC0xMC43ODItNS4yNTMtMTAuNzgyLTExLjczMlYxNy42NjZjMC02LjQ4IDQuODI3LTExLjczMiAxMC43ODItMTEuNzMyczEwLjc4MiA1LjI1MyAxMC43ODIgMTEuNzMydjE3LjkzYzAgNi40OC00LjgyNyAxMS43MzMtMTAuNzgyIDExLjczMyIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0zNS41OTcgNjkuNzMyYy0yLjEzNCAwLTMuODY1LTEuMzA1LTMuODY1LTIuOTE0di03LjYyM2MwLTEuNjA5IDEuNzMtMi45MTQgMy44NjUtMi45MTRoNC40YzIuMTM1IDAgMy44NjUgMS4zMDUgMy44NjUgMi45MTR2Ny42MjNjMCAxLjYxLTEuNzMgMi45MTQtMy44NjUgMi45MTR6IiBmaWxsPSIjZmZmIiBzdHJva2U9IiNmZmYiLz48L3N2Zz4=";

  class SPrecording {
    constructor() {
      this.isRecording = false;
      this.recording = "";
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.mediaStream = null;
      this.audioRecorder = null;
      this.analyzerNode = null;
      this.audioChunks = [];
    }

    getInfo() {
      return {
        id: "SPrecording",
        name: Scratch.translate("Recording"),
        color1: "#7B9149",
        color2: "#64753C",
        color3: "#505E30",
        menuIconURI,
        blockIconURI,
        blocks: [
          {
            opcode: "recordingSet",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[MODE] recording"),
            arguments: {
              MODE: { type: Scratch.ArgumentType.STRING, menu: "MODE" }
            }
          },
          {
            opcode: "recordForX",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("record for [TIME] seconds"),
            arguments: {
              TIME: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: "clearRecording2",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("clear recording")
          },
          {
            opcode: "averageLoudness",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("average loudness")
          },
          "---",
          {
            opcode: "whenMic",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when mic turns [ON_OFF]"),
            isEdgeActivated: false,
            arguments: {
              ON_OFF: { type: Scratch.ArgumentType.STRING, menu: "ACTIVE" }
            }
          },
          {
            opcode: "isRecordingMic",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is recording?")
          },
          "---",
          {
            opcode: "recordedAudio",
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true,
            text: Scratch.translate("recorded audio data.URI")
          },
          {
            opcode: "saveRecording",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("save recording to [SPRITE] named [NAME]"),
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "Recording-1" }
            }
          },
          {
            opcode: "saveRecording2",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("download recording named [NAME]"),
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "Recording-1" }
            }
          }
        ],
        menus: {
          TARGETS: { acceptReporters: true, items: "_getTargets" },
          MODE: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("start"), value: "start" },
              { text: Scratch.translate("stop"), value: "stop" }
            ]
          },
          ACTIVE: {
            acceptReporters: false,
            items: [
              { text: Scratch.translate("on"), value: "on" },
              { text: Scratch.translate("off"), value: "off" }
            ]
          }
        },
      };
    }

    // Helper Funcs
    _getTargets() {
      const spriteNames = [];
      const targets = runtime.targets;
      for (let index = 0; index < targets.length; index++) {
        const target = targets[index];
        if (target.isOriginal) spriteNames.push(target.getName());
      }
      return spriteNames.length > 0 ? spriteNames : [""];
    }

    blob2Base64(blob) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result.split(",")[1];
          resolve(`data:audio/wav;base64,${base64}`);
        };
        reader.onerror = () => resolve("");
        reader.readAsDataURL(blob);
      });
    }

    startRecording() {
      if (!this.isRecording) {
        runtime.startHats("SPrecording_whenMic", { ON_OFF : "on" });
        this.audioContext.resume().then(() => {
          navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
              this.mediaStream = stream;
              this.audioRecorder = new MediaRecorder(stream);
              this.audioRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) this.audioChunks.push(e.data);
              };
              this.audioRecorder.onstop = () => { this.recording = new Blob(this.audioChunks, { type: "audio/wav" }) };
              this.analyzerNode = this.audioContext.createAnalyser();
              this.analyzerNode.fftSize = 256;
              const audioSource = this.audioContext.createMediaStreamSource(stream);
              audioSource.connect(this.analyzerNode);
              this.audioRecorder.start();
              this.isRecording = true;
            })
            .catch((e) => { console.warn("Error accessing microphone:", e) });
        });
      }
    }

    stopRecording() {
      if (this.isRecording) {
        this.audioRecorder.stop();
        this.mediaStream.getTracks().forEach((track) => track.stop());
        this.isRecording = false;
        runtime.startHats("SPrecording_whenMic", { ON_OFF : "off" });
      }
    }

    // Block Funcs
    recordingSet(args) {
      Scratch.canRecordAudio().then((canRecord) => {
        if (canRecord) {
          if (args.MODE === "stop") this.stopRecording();
          else if (args.MODE === "start") this.startRecording();

          // redraw to Allow Time to Setup Mic/Save Recording Data/etc
          runtime.requestRedraw();
        }
      });
    }

    async recordForX(args, util) {
      const canRecord = await Scratch.canRecordAudio();
      if (!canRecord) return;
      this.startRecording();

      // redraw to Allow Time to Setup Mic/Save Recording Data/etc
      runtime.requestRedraw();
      return new Promise((resolve) => {
        setTimeout(() => {
          setTimeout(() => {
            this.stopRecording();
            resolve();
          }, Math.max(0, Scratch.Cast.toNumber(args.TIME) * 1000));
        }, 150); // Short time to set up mic
      });
    }

    isRecordingMic() { return this.isRecording }

    clearRecording2() {
      this.recording = "";
      this.audioChunks = [];
    }

    recordedAudio(args) {
      return this.recording ? this.blob2Base64(this.recording) : "Nothing has been Recorded!";
    }

    averageLoudness() {
      if (!this.isRecording) return 0;
      if (this.analyzerNode) {
        const dataArray = new Uint8Array(this.analyzerNode.frequencyBinCount);
        this.analyzerNode.getByteFrequencyData(dataArray);
        const Items = dataArray.slice(0, 20);
        const sum = Items.reduce((acc, val) => acc + val, 0);
        return Math.round((sum / Items.length) / 7) + 1;
      }
      return 0;
    }

    async saveRecording(args) {
      if (this.recording) {
        let target = Scratch.Cast.toString(args.SPRITE);
        if (target === "Stage") target = runtime.getTargetForStage().id;
        else target = runtime.getSpriteTargetByName(target).id;
        if (!target) return;
        Scratch.fetch(await this.blob2Base64(this.recording))
          .then((r) => r.arrayBuffer())
          .then((arrayBuffer) => {
            const storage = runtime.storage;
            const asset = new storage.Asset(
              storage.AssetType.Sound, null,
              storage.DataFormat.MP3,
              new Uint8Array(arrayBuffer), true,
            );
            vm.addSound(
              {
                md5: `${asset.assetId}.${asset.dataFormat}`,
                asset: asset, name: Scratch.Cast.toString(args.NAME)
              },
              target
            );
          });
      }
    }

    async saveRecording2(args) {
      if (this.recording) {
        Scratch.download(
          await this.blob2Base64(this.recording),
          `${Scratch.Cast.toString(args.NAME)}.wav`
        );
      }
    }
  }

  Scratch.extensions.register(new SPrecording());
})(Scratch);
