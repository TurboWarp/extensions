// Name: Recording
// ID: SPrecording
// Description: Record your voice while you run your projects!
// By: SharkPool <https://github.com/SharkPool-SP>

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Recording must run unsandboxed");
  }

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  let warningSent = false;

  //this script was ripped from the Files Extension. Thanks GarboMuffin :D
  const downloadURL = (url, file) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const menuIconURI =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMTIuMDA1NDgiIGhlaWdodD0iMTEyLjAwNTQ4IiB2aWV3Qm94PSIwLDAsMTEyLjAwNTQ4LDExMi4wMDU0OCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4My45OTcyNiwtMTIzLjk5NzI2KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTgzLjk5NzI2LDE4MGMwLC0zMC45Mjk0NiAyNS4wNzMyOCwtNTYuMDAyNzQgNTYuMDAyNzQsLTU2LjAwMjc0YzMwLjkyOTQ2LDAgNTYuMDAyNzQsMjUuMDczMjggNTYuMDAyNzQsNTYuMDAyNzRjMCwzMC45Mjk0NiAtMjUuMDczMjgsNTYuMDAyNzQgLTU2LjAwMjc0LDU2LjAwMjc0Yy0zMC45Mjk0NiwwIC01Ni4wMDI3NCwtMjUuMDczMjggLTU2LjAwMjc0LC01Ni4wMDI3NHoiIGZpbGw9IiM3YjkxNDkiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiPjxwYXRoIGQ9Ik0yNDAsMTYwLjAyMDk1YzEyLjk3MjUyLDAgMjMuNDg4ODIsOS45MTgzNiAyMy40ODg4MiwyMi4xNTMyOGMwLDEyLjIzNDkyIC0xMC41MTYzLDIyLjE1MzI4IC0yMy40ODg4MiwyMi4xNTMyOGMtMTIuOTcyNTIsMCAtMjMuNDg4ODIsLTkuOTE4MzYgLTIzLjQ4ODgyLC0yMi4xNTMyOGMwLC0xMi4yMzQ5MiAxMC41MTYzLC0yMi4xNTMyOCAyMy40ODg4MiwtMjIuMTUzMjh6TTIyMi44MjAxNiwxODIuMTc0MjNjMCw4Ljk0ODY4IDcuNjkxNjgsMTYuMjAzMDIgMTcuMTc5ODQsMTYuMjAzMDJjOS40ODgxNiwwIDE3LjE3OTg0LC03LjI1NDM0IDE3LjE3OTg0LC0xNi4yMDMwMmMwLC04Ljk0ODY4IC03LjY5MTY4LC0xNi4yMDMwMiAtMTcuMTc5ODQsLTE2LjIwMzAyYy05LjQ4ODE2LDAgLTE3LjE3OTg0LDcuMjU0MzQgLTE3LjE3OTg0LDE2LjIwMzAyeiIvPjxwYXRoIGQ9Ik0yNDAsMTYwLjAyMDk1YzEyLjk3MjUyLDAgMjMuNDg4ODIsOS45MTgzNiAyMy40ODg4MiwyMi4xNTMyOGMwLDAuMjM4MjEgLTAuMDAzOTksMC40NzU1NSAtMC4wMTE5LDAuNzExOTVoLTQ2Ljk1Mzg0Yy0wLjAwNzkxLC0wLjIzNjQgLTAuMDExOSwtMC40NzM3NCAtMC4wMTE5LC0wLjcxMTk1YzAsLTEyLjIzNDkyIDEwLjUxNjMsLTIyLjE1MzI4IDIzLjQ4ODgyLC0yMi4xNTMyOHoiLz48L2c+PHBhdGggZD0iTTIxMC42ODc1MSwxODQuMzgwOTJ2LTMwLjU3NjE0aDU4LjYyNDk4djMwLjU3NjE0eiIgZmlsbD0iIzdiOTE0OSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjQwLDE5MC4zMDg3OGMtNi40NjQ2LDAgLTExLjcwNTE5LC01LjcwMjM4IC0xMS43MDUxOSwtMTIuNzM2NjF2LTE5LjQ2NjM1YzAsLTcuMDM0MjMgNS4yNDA1OSwtMTIuNzM2NjEgMTEuNzA1MTksLTEyLjczNjYxdjBjNi40NjQ2LDAgMTEuNzA1MTksNS43MDIzOCAxMS43MDUxOSwxMi43MzY2MXYxOS40NjYzNWMwLDcuMDM0MjMgLTUuMjQwNTksMTIuNzM2NjEgLTExLjcwNTE5LDEyLjczNjYxeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjM3LjYxMTQyLDIxNC42MzA3OGMtMi4zMTcxNiwwIC00LjE5NTU5LC0xLjQxNjQ1IC00LjE5NTU5LC0zLjE2Mzcydi04LjI3NTA3YzAsLTEuNzQ3MjggMS44Nzg0MywtMy4xNjM3MiA0LjE5NTU5LC0zLjE2MzcyaDQuNzc3MTZjMi4zMTcxNiwwIDQuMTk1NTksMS40MTY0NSA0LjE5NTU5LDMuMTYzNzJ2OC4yNzUwN2MwLDEuNzQ3MjggLTEuODc4NDMsMy4xNjM3MiAtNC4xOTU1OSwzLjE2MzcyeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9nPjwvc3ZnPg==";

  const blockIconURI =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI3NS42NjY2NiIgaGVpZ2h0PSI3NS42NjY2NiIgdmlld0JveD0iMCwwLDc1LjY2NjY2LDc1LjY2NjY2Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAyLjE2NjY3LC0xNDIuMzQwOSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIwMi4xNjY2NywyMTguMDA3NTZ2LTc1LjY2NjY2aDc1LjY2NjY2djc1LjY2NjY2eiIgZmlsbD0iIzdiOTE0OSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEuNSI+PHBhdGggZD0iTTI0MC4wMDAwMSwxNjAuMDIwOTVjMTIuOTcyNTIsMCAyMy40ODg4Miw5LjkxODM2IDIzLjQ4ODgyLDIyLjE1MzI4YzAsMTIuMjM0OTIgLTEwLjUxNjMsMjIuMTUzMjggLTIzLjQ4ODgyLDIyLjE1MzI4Yy0xMi45NzI1MiwwIC0yMy40ODg4MiwtOS45MTgzNiAtMjMuNDg4ODIsLTIyLjE1MzI4YzAsLTEyLjIzNDkyIDEwLjUxNjMsLTIyLjE1MzI4IDIzLjQ4ODgyLC0yMi4xNTMyOHpNMjIyLjgyMDE2LDE4Mi4xNzQyNGMwLDguOTQ4NjggNy42OTE2OCwxNi4yMDMwMiAxNy4xNzk4NSwxNi4yMDMwMmM5LjQ4ODE3LDAgMTcuMTc5ODQsLTcuMjU0MzQgMTcuMTc5ODQsLTE2LjIwMzAyYzAsLTguOTQ4NjggLTcuNjkxNjgsLTE2LjIwMzAyIC0xNy4xNzk4NCwtMTYuMjAzMDJjLTkuNDg4MTcsMCAtMTcuMTc5ODQsNy4yNTQzNCAtMTcuMTc5ODQsMTYuMjAzMDJ6Ii8+PHBhdGggZD0iTTI0MC4wMDAwMSwxNjAuMDIwOTVjMTIuOTcyNTIsMCAyMy40ODg4Miw5LjkxODM2IDIzLjQ4ODgyLDIyLjE1MzI4YzAsMC4yMzgyMSAtMC4wMDM5OSwwLjQ3NTU1IC0wLjAxMTksMC43MTE5NWgtNDYuOTUzODRjLTAuMDA3OTEsLTAuMjM2NCAtMC4wMTE5LC0wLjQ3Mzc0IC0wLjAxMTksLTAuNzExOTVjMCwtMTIuMjM0OTIgMTAuNTE2MywtMjIuMTUzMjggMjMuNDg4ODIsLTIyLjE1MzI4eiIvPjwvZz48cGF0aCBkPSJNMjEwLjY4NzUxLDE4NC4zODA5M3YtMzAuNTc2MTRoNTguNjI0OTl2MzAuNTc2MTR6IiBmaWxsPSIjN2I5MTQ5IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yNDAsMTkwLjMwODc4Yy02LjQ2NDYsMCAtMTEuNzA1MTksLTUuNzAyMzggLTExLjcwNTE5LC0xMi43MzY2MXYtMTkuNDY2MzVjMCwtNy4wMzQyMyA1LjI0MDU5LC0xMi43MzY2MSAxMS43MDUxOSwtMTIuNzM2NjF2MGM2LjQ2NDYsMCAxMS43MDUxOSw1LjcwMjM4IDExLjcwNTE5LDEyLjczNjYxdjE5LjQ2NjM1YzAsNy4wMzQyMyAtNS4yNDA1OSwxMi43MzY2MSAtMTEuNzA1MTksMTIuNzM2NjF6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yMzcuNjExNDIsMjE0LjYzMDc4Yy0yLjMxNzE2LDAgLTQuMTk1NTksLTEuNDE2NDUgLTQuMTk1NTksLTMuMTYzNzJ2LTguMjc1MDdjMCwtMS43NDcyOCAxLjg3ODQzLC0zLjE2MzcyIDQuMTk1NTksLTMuMTYzNzJoNC43NzcxNmMyLjMxNzE2LDAgNC4xOTU1OSwxLjQxNjQ1IDQuMTk1NTksMy4xNjM3MnY4LjI3NTA3YzAsMS43NDcyOCAtMS44Nzg0MywzLjE2MzcyIC00LjE5NTU5LDMuMTYzNzJ6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L2c+PC9zdmc+";

  class SPrecording {
    constructor() {
      this.isRecording = false;
      this.recording = null;
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      this.mediaStream = null;
      this.audioRecorder = null;
      this.analyzerNode = null;
    }

    getInfo() {
      return {
        id: "SPrecording",
        name: "Recording",
        color1: "#7B9149",
        color2: "#64753C",
        color3: "#505E30",
        menuIconURI,
        blockIconURI,
        blocks: [
          {
            opcode: "recordingSet",
            blockType: Scratch.BlockType.COMMAND,
            text: "recording mode [MODE]",
            arguments: {
              MODE: {
                type: Scratch.ArgumentType.STRING,
                menu: "MODE",
              },
            },
          },
          {
            opcode: "recordForX",
            blockType: Scratch.BlockType.COMMAND,
            text: "record for [TIME] seconds",
            arguments: {
              TIME: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "clearRecording",
            blockType: Scratch.BlockType.COMMAND,
            text: "clear recording",
          },
          {
            opcode: "isRecordingMic",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is recording?",
          },
          {
            opcode: "averageLoudness",
            blockType: Scratch.BlockType.REPORTER,
            text: "average loudness",
          },

          "---",

          {
            opcode: "recordedAudio",
            blockType: Scratch.BlockType.REPORTER,
            text: "recorded audio as [TYPE]",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "FILETYPES",
              },
            },
          },
          {
            opcode: "saveRecording",
            blockType: Scratch.BlockType.COMMAND,
            text: "save recording to [SPRITE] named [NAME]",
            arguments: {
              SPRITE: {
                type: Scratch.ArgumentType.STRING,
                menu: "TARGETS",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Recording 1",
              },
            },
          },
          {
            opcode: "saveRecording2",
            blockType: Scratch.BlockType.COMMAND,
            text: "download recording named [NAME] as [TYPE]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Recording_1",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "FILETYPES",
              },
            },
          },
        ],
        menus: {
          MODE: {
            acceptReporters: true,
            items: ["enabled", "disabled"],
          },
          FILETYPES: {
            acceptReporters: true,
            items: ["mp3", "wav", "mpeg", "ogg"],
          },
          TARGETS: {
            acceptReporters: true,
            items: "_getTargets",
          },
        },
      };
    }

    recordingSet(args) {
      if (args.MODE === "enabled") {
        if (!warningSent) {
          const confirmed = window.confirm(
            "Allow access to record Microphone Audio? Be aware of privacy concerns if you Accept.",
          );
          if (confirmed) {
            this.startRecording();
            warningSent = true;
          }
        } else {
          this.startRecording();
        }
      } else {
        this.stopRecording();
      }
    }

    isRecordingMic() {
      return this.isRecording;
    }

    clearRecording() {
      this.stopRecording();
      setTimeout(() => {
        this.recording = null;
      }, 100);
    }

    recordForX(args) {
      return new Promise((resolve, reject) => {
        const time = args.TIME * 1000;
        this.startRecording();
        setTimeout(() => {
          this.stopRecording();
          resolve();
        }, time);
      });
    }

    recordedAudio(args) {
      if (this.recording) {
        return this.convertBlobToBase64(this.recording, args.TYPE);
      } else {
        return "Nothing has been Recorded!";
      }
    }

    convertBlobToBase64(blob, TYPE) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = reader.result.split(",")[1];
          const formattedData = `data:audio/${TYPE};base64,${base64Data}`;
          resolve(formattedData);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }

    async saveRecording(args) {
      if (this.recording) {
        const target = args.SPRITE;
        Scratch.fetch(await this.convertBlobToBase64(this.recording, "mp3"))
          .then((r) => r.arrayBuffer())
          .then((arrayBuffer) => {
            const storage = vm.runtime.storage;
            const asset = new storage.Asset(
              storage.AssetType.Sound,
              null,
              storage.DataFormat.MP3,
              new Uint8Array(arrayBuffer),
              true,
            );
            vm.addSound(
              {
                md5: asset.assetId + "." + asset.dataFormat,
                asset: asset,
                name: args.NAME + "",
              },
              target,
            );
          });
      }
    }

    async saveRecording2(args) {
      if (this.recording) {
        const audioData = await this.convertBlobToBase64(
          this.recording,
          args.TYPE,
        );
        const fileName = `${Scratch.Cast.toString(args.NAME)}.${args.TYPE}`;
        downloadURL(audioData, fileName);
      }
    }

    _getTargets() {
      const spriteNames = [];
      const targets = Scratch.vm.runtime.targets;

      for (let index = 0; index < targets.length; index++) {
        const target = targets[index];
        if (target.isOriginal) {
          spriteNames.push(target.getName());
        }
      }
      if (spriteNames.length > 0) {
        return spriteNames;
      } else {
        return [""];
      }
    }

    startRecording() {
      if (!this.isRecording) {
        this.audioContext.resume().then(() => {
          navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
              this.mediaStream = stream;
              this.audioRecorder = new MediaRecorder(stream);
              const audioChunks = [];
              this.audioRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                  audioChunks.push(e.data);
                }
              };
              this.audioRecorder.onstop = () => {
                this.recording = new Blob(audioChunks, { type: "audio/wav" });
              };
              this.analyzerNode = this.audioContext.createAnalyser();
              this.analyzerNode.fftSize = 256;
              const audioSource =
                this.audioContext.createMediaStreamSource(stream);
              audioSource.connect(this.analyzerNode);

              this.audioRecorder.start();
              this.isRecording = true;
            })
            .catch((error) => {
              console.error("Error accessing microphone:", error);
            });
        });
      }
    }

    averageLoudness() {
      if (this.analyzerNode) {
        const dataArray = new Uint8Array(this.analyzerNode.frequencyBinCount);
        this.analyzerNode.getByteFrequencyData(dataArray);
        const Items = dataArray.slice(0, 20);
        const sum = Items.reduce((acc, val) => acc + val, 0);
        const averageLoudness = sum / Items.length;
        return Math.round(averageLoudness / 7) + 1;
      } else {
        return 0;
      }
    }

    stopRecording() {
      if (this.isRecording) {
        this.audioRecorder.stop();
        this.mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
        this.isRecording = false;
      }
    }
  }

  Scratch.extensions.register(new SPrecording());
})(Scratch);
