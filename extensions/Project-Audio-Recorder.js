(function (Scratch) {
  "use strict";

  let mediaRecorder = null;
  let audioChunks = [];
  let isRecording = false;
  let recorderDest = null;
  let sourceNode = null;

  class ProjectAudioRecorder {
    getInfo() {
      return {
        id: "projectAudioRecorder",
        name: Scratch.translate("Project Audio Recorder"),
        color1: "#202d40",
        blocks: [
          {
            opcode: "startRecording",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("Start recording project audio"),
          },
          {
            opcode: "stopAndDownloadMp3",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "Stop recording and download .mp3 file name [NAME]"
            ),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "My Audio",
              },
            },
          },
          {
            opcode: "stopAndDownloadWav",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "Stop recording and download .wav file name [NAME]"
            ),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "My Audio",
              },
            },
          },
          {
            opcode: "isRecording",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("Is recording?"),
          },
        ],
      };
    }

    startRecording() {
      if (isRecording) return;

      const vm = Scratch.vm;
      if (!vm || !vm.runtime || !vm.runtime.audioEngine) {
        return;
      }

      const audioEngine = vm.runtime.audioEngine;
      const audioCtx = audioEngine.audioContext;

      if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume();
      }

      sourceNode =
        audioEngine.inputNode ||
        audioEngine.masterGain ||
        audioEngine._masterGain;

      if (!sourceNode) {
        return;
      }

      recorderDest = audioCtx.createMediaStreamDestination();
      sourceNode.connect(recorderDest);

      audioChunks = [];

      try {
        mediaRecorder = new MediaRecorder(recorderDest.stream);
      } catch (e) {
        return;
      }

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.start();
      isRecording = true;
    }

    _stopAndDownload(fileName, ext) {
      if (!mediaRecorder || !isRecording) return;

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: "audio/wav" });
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64data = reader.result;
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = base64data;

          const safeName = fileName || "My Audio";
          a.download = `${safeName}.${ext}`;

          document.body.appendChild(a);
          a.click();
          setTimeout(() => document.body.removeChild(a), 1000);
        };

        reader.readAsDataURL(blob);

        if (sourceNode && recorderDest) {
          try {
            sourceNode.disconnect(recorderDest);
          } catch (e) {
            // ignore
          }
        }

        isRecording = false;
      };

      mediaRecorder.stop();
    }

    stopAndDownloadMp3(args) {
      const name = Scratch.Cast.toString(args.NAME);
      this._stopAndDownload(name, "mp3");
    }

    stopAndDownloadWav(args) {
      const name = Scratch.Cast.toString(args.NAME);
      this._stopAndDownload(name, "wav");
    }

    isRecording() {
      return isRecording;
    }
  }

  Scratch.extensions.register(new ProjectAudioRecorder());
})(Scratch);
