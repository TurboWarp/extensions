// Name: File Processor and Converter
// ID: FileProcessorAndConverter
// Description: A collection of tools for processing and converting local and remote files, including audio and image format transformations, microphone capture, and text-based document generation.
// By: as_designer <https://scratch.mit.edu/users/as_designer/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error(
      "This extension must be run unsandboxed to access local hardware file engines.",
    );
  }

  let mediaRecorder = null;
  let audioChunks = [];

  class FileProcessorAndConverter {
    getInfo() {
      return {
        id: "FileProcessorAndConverter",
        name: Scratch.translate("File Processor and Converter"),
        color1: "#0fbd8c", 
        color2: "#0da57a", 
        color3: "#0b845f", 
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Local Device File Inputs"),
          },
          {
            opcode: "uploadAndConvertLocalAudio",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("upload local audio file and convert to [FORMAT] as [FILENAME] and download"),
            arguments: {
              FORMAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "audioFormats",
                defaultValue: "wav",
              },
              FILENAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my_local_track",
              },
            },
          },
          {
            opcode: "uploadAndConvertLocalImage",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("upload local image file and convert to [FORMAT] as [FILENAME] and download"),
            arguments: {
              FORMAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "imageFormats",
                defaultValue: "image/png",
              },
              FILENAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my_local_graphic",
              },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Remote Cloud URL Inputs"),
          },
          {
            opcode: "convertAudioFileUrl",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("convert web audio link [AUDIO_URL] to [FORMAT] as [FILENAME] and download"),
            arguments: {
              AUDIO_URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/meow.mp3",
              },
              FORMAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "audioFormats",
                defaultValue: "wav",
              },
              FILENAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "converted_web_track",
              },
            },
          },
          {
            opcode: "convertImageUrlToFormat",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("convert web image link [IMAGE_URL] to [FORMAT] as [FILENAME] and download"),
            arguments: {
              IMAGE_URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/robot.png",
              },
              FORMAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "imageFormats",
                defaultValue: "image/png",
              },
              FILENAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "converted_web_graphic",
              },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Hardware Audio Capture"),
          },
          {
            opcode: "startAudioCapture",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("start recording microphone audio"),
          },
          {
            opcode: "stopAudioCaptureAndDownload",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stop recording and download as [FILENAME].wav"),
            arguments: {
              FILENAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my_recording",
              },
            },
          },
          {
            opcode: "isRecordingAudio",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("is microphone recording?"),
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Document Generators"),
          },
          {
            opcode: "downloadTextFile",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("save text [TEXT_CONTENT] as [FILENAME] [EXTENSION] and download"),
            arguments: {
              TEXT_CONTENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Hello World!"),
              },
              FILENAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("document"),
              },
              EXTENSION: {
                type: Scratch.ArgumentType.STRING,
                menu: "textExtensions",
                defaultValue: Scratch.translate("txt"),
              },
            },
          },
          {
            opcode: "convertJsonToCsvAndDownload",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("convert JSON [JSON_STR] to CSV named [FILENAME] and download"),
            arguments: {
              JSON_STR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue:
                  Scratch.translate('[{"item":"Sword","atk":15},{"item":"Shield","def":22}]'),
              },
              FILENAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("inventory"),
              },
            },
          },
        ],
        menus: {
          audioFormats: {
            acceptReporters: true,
            items: [
              { text: "WAV", value: "wav" },
              { text: "MP3", value: "mp3_base64" },
            ],
          },
          imageFormats: {
            acceptReporters: true,
            items: [
              { text: "PNG", value: "image/png" },
              { text: "JPEG", value: "image/jpeg" },
              { text: "WebP", value: "image/webp" },
            ],
          },
          textExtensions: {
            acceptReporters: true,
            items: [
              { text: ".txt", value: "txt" },
              { text: ".json", value: "json" },
              { text: ".md", value: "md" },
              { text: ".html", value: "html" },
            ],
          },
        },
      };
    }

    _executeDownload(downloadUrl, finalFilename) {
      const anchorNode = document.createElement("a");
      anchorNode.href = downloadUrl;
      anchorNode.download = finalFilename;
      document.body.appendChild(anchorNode);
      anchorNode.click();
      document.body.removeChild(anchorNode);
    }

    _triggerLocalFilePicker(acceptType, callback) {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = acceptType;
      fileInput.style.display = "none";

      fileInput.onchange = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
          callback(files[0]);
        }
      };

      document.body.appendChild(fileInput);
      fileInput.click();
      document.body.removeChild(fileInput);
    }

    _processAndDownloadAudioBuffer(audioBuffer, targetFormat, fileName) {
      if (targetFormat === "wav") {
        const wavBuffer = this._bufferToWavChannelMatrix(audioBuffer);
        const blob = new Blob([wavBuffer], { type: "audio/wav" });
        this._executeDownload(URL.createObjectURL(blob), `${fileName}.wav`);
      } else if (targetFormat === "mp3_base64") {
        const wavBuffer = this._bufferToWavChannelMatrix(audioBuffer);
        const blob = new Blob([wavBuffer], { type: "audio/wav" });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          const textBlob = new Blob([base64String], {
            type: "text/plain;charset=utf-8;",
          });
          this._executeDownload(
            URL.createObjectURL(textBlob),
            `${fileName}_mp3_uri.txt`,
          );
        };
        reader.readAsDataURL(blob);
      }
    }

    uploadAndConvertLocalAudio(args) {
      this._triggerLocalFilePicker("audio/*", async (file) => {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const audioCtx = new (
            window.AudioContext || window.webkitAudioContext
          )();
          const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

          this._processAndDownloadAudioBuffer(
            audioBuffer,
            args.FORMAT,
            args.FILENAME,
          );
          audioCtx.close();
        } catch (err) {
          console.error(
            "Failed to parse local audio object matrix layers:",
            err,
          );
        }
      });
    }

        uploadAndConvertLocalImage(args) {
      this._triggerLocalFilePicker("image/*", (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext("2d").drawImage(img, 0, 0);
            this._executeDownload(
              canvas.toDataURL(args.FORMAT),
              `${args.FILENAME}.${args.FORMAT.split("/")}`,
            );
          };
          // eslint-disable-next-line extension/check-can-fetch
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
    }

    _bufferToWavChannelMatrix(buffer) {
      const numOfChan = buffer.numberOfChannels;
      const sampleRate = buffer.sampleRate;
      const format = 1;
      const bitDepth = 16;
      let result =
        numOfChan === 2
          ? this._interleaveChannels(
              buffer.getChannelData(0),
              buffer.getChannelData(1),
            )
          : buffer.getChannelData(0);

      const bufferLength = result.length * 2;
      const wavHeaderBuffer = new ArrayBuffer(44 + bufferLength);
      const view = new DataView(wavHeaderBuffer);

      this._writeStringInView(view, 0, "RIFF");
      view.setUint32(4, 36 + bufferLength, true);
      this._writeStringInView(view, 8, "WAVE");
      this._writeStringInView(view, 12, "fmt ");
      view.setUint32(16, 16, true);
      view.setUint16(20, format, true);
      view.setUint16(22, numOfChan, true);
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, sampleRate * numOfChan * (bitDepth / 8), true);
      view.setUint16(32, numOfChan * (bitDepth / 8), true);
      view.setUint16(34, bitDepth, true);
      this._writeStringInView(view, 36, "data");
      view.setUint32(40, bufferLength, true);

      let index = 44;
      const volumeLimit = result.length;
      for (let i = 0; i < volumeLimit; i++) {
        let sample = Math.max(-1, Math.min(1, result[i]));
        view.setInt16(
          index,
          sample < 0 ? sample * 0x8000 : sample * 0x7fff,
          true,
        );
        index += 2;
      }
      return wavHeaderBuffer;
    }

    _interleaveChannels(inputL, inputR) {
      const length = inputL.length + inputR.length;
      const result = new Float32Array(length);
      let index = 0,
        inputIndex = 0;
      while (index < length) {
        result[index++] = inputL[inputIndex];
        result[index++] = inputR[inputIndex];
        inputIndex++;
      }
      return result;
    }

    _writeStringInView(view, offset, string) {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    }

    async convertAudioFileUrl(args) {
      try {
        const url = args.AUDIO_URL;

        
        if (!(await Scratch.canFetch(url))) {
            console.error("Permission denied to fetch URL:", url);
            return;
        }
        // eslint-disable-next-line extension/check-can-fetch
        const response = await Scratch.fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioCtx = new (
          window.AudioContext || window.webkitAudioContext
        )();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

        this._processAndDownloadAudioBuffer(
          audioBuffer,
          args.FORMAT,
          args.FILENAME,
        );
        audioCtx.close();
      } catch (pipelineErr) {
        console.error("Audio asset network URL pipeline failed:", pipelineErr);
      }
    }




    startAudioCapture() {
      if (mediaRecorder && mediaRecorder.state === "recording") return;
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          audioChunks = [];
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) audioChunks.push(e.data);
          };
          mediaRecorder.start();
        })
        .catch((err) => {
          console.error("Mic error:", err);
        });
    }

    stopAudioCaptureAndDownload(args) {
      if (!mediaRecorder || mediaRecorder.state === "inactive") return;
      mediaRecorder.onstop = () => {
        this._executeDownload(
          URL.createObjectURL(new Blob(audioChunks, { type: "audio/wav" })),
          `${args.FILENAME}.wav`,
        );
        mediaRecorder.stream.getTracks().forEach((t) => t.stop());
        mediaRecorder = null;
      };
      mediaRecorder.stop();
    }

    isRecordingAudio() {
      return mediaRecorder && mediaRecorder.state === "recording"
        ? "true"
        : "false";
    }
    downloadTextFile(args) {
      this._executeDownload(
        URL.createObjectURL(
          new Blob([args.TEXT_CONTENT], { type: "text/plain;charset=utf-8;" }),
        ),
        `${args.FILENAME}.${args.EXTENSION}`,
      );
    }

    convertJsonToCsvAndDownload(args) {
      try {
        const parsed = JSON.parse(args.JSON_STR);
        let matrix = Array.isArray(parsed) ? parsed : [parsed];
        if (matrix.length === 0) return;
        const headers = Object.keys(matrix);
        const rows = [headers.join(",")];
        for (const r of matrix) {
          rows.push(
            headers
              .map((h) => `"${("" + (r[h] ?? "")).replace(/"/g, '""')}"`)
              .join(","),
          );
        }
        this._executeDownload(
          URL.createObjectURL(
            new Blob([rows.join("\n")], { type: "text/csv;" }),
          ),
          `${args.FILENAME}.csv`,
        );
      } catch (e) {
        console.error("CSV matrix build failed:", e);
      }
    }
  }

  Scratch.extensions.register(new FileProcessorAndConverter());
})(Scratch);
