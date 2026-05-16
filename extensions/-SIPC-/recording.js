(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Recording must be run unsandboxed");
  }
  /** @type {MediaRecorder|null} */
  let mediaRecorder = null;
  let recordedChunks = [];
  const icon =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjg1MTAzNzAzNDU1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMzMjIiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guNzc4MTA2OS4wLmkxIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik04MzMgNDQ1LjVjMTcuNjczIDAgMzIgMTQuMzI3IDMyIDMyIDAgMTgzLjcyMi0xNDAuNTUzIDMzNC42MTYtMzE5Ljk5NyAzNTEuMDIxTDU0NSA4OTVoMTk0YzE3LjY3MyAwIDMyIDE0LjMyNyAzMiAzMiAwIDE3LjY3My0xNC4zMjcgMzItMzIgMzJIMjg3Yy0xNy42NzMgMC0zMi0xNC4zMjctMzItMzIgMC0xNy42NzMgMTQuMzI3LTMyIDMyLTMyaDE5NGwtMC4wMDMtNjYuMzg5QzMwMS4wNzUgODEyLjY3NyAxNjAgNjYxLjU2MyAxNjAgNDc3LjVjMC0xNy42NzMgMTQuMzI3LTMyIDMyLTMyIDE3LjQ5NiAwIDMxLjcxMyAxNC4wNDIgMzEuOTk2IDMxLjQ3bDAuMDA0IDAuNTNDMjI0IDYzNi44MzQgMzUzLjE2NiA3NjYgNTEyLjUgNzY2YzE1Ny43NCAwIDI4NS45MTQtMTI2LjU5NSAyODguNDYxLTI4My43M2wwLjAzOS00Ljc3YzAtMTcuNjczIDE0LjMyNy0zMiAzMi0zMnpNNTEzIDY1YzEyMy4wMjEgMCAyMjIuOTgzIDk4LjczMSAyMjQuOTcgMjIxLjI4TDczOCAyOTB2MTg2YzAgMTI0LjI2NC0xMDAuNzM2IDIyNS0yMjUgMjI1LTEyMy4wMjEgMC0yMjIuOTgzLTk4LjczMS0yMjQuOTctMjIxLjI4TDI4OCA0NzZWMjkwYzAtMTI0LjI2NCAxMDAuNzM2LTIyNSAyMjUtMjI1eiBtMCA2NGMtODguMDI5IDAtMTU5LjU1NyA3MC42NDgtMTYwLjk3OCAxNTguMzM4TDM1MiAyOTB2MTg2YzAgODguOTE4IDcyLjA4MiAxNjEgMTYxIDE2MSA4OC4wMjkgMCAxNTkuNTU3LTcwLjY0OCAxNjAuOTc4LTE1OC4zMzhMNjc0IDQ3NlYyOTBjMC04OC45MTgtNzIuMDgyLTE2MS0xNjEtMTYxeiBtMTI0LjU0MyAyNTguNTkxYzE3LjM4OCA4OS40NTMtNDEuMDMyIDE3Ni4wNjQtMTMwLjQ4NSAxOTMuNDUyLTE3LjM0OCAzLjM3Mi0zNC4xNDYtNy45NTgtMzcuNTE4LTI1LjMwNi0zLjMzOC0xNy4xNzUgNy43MzMtMzMuODEgMjQuNzg4LTM3LjQxM2wwLjUxOC0wLjEwNWM1NC4yMDktMTAuNTM3IDg5LjgtNjIuNjA0IDgwLjE3OC0xMTYuNzc0bC0wLjMwNS0xLjY0MmMtMy4zNzItMTcuMzQ4IDcuOTU4LTM0LjE0NiAyNS4zMDYtMzcuNTE4IDE3LjM0OS0zLjM3MiAzNC4xNDYgNy45NTggMzcuNTE4IDI1LjMwNnoiIGZpbGw9IiNmZmZmZmYiIHAtaWQ9IjMzMjMiPjwvcGF0aD48L3N2Zz4=";
  class Recording {
    getInfo() {
      return {
        id: "sipcrecording",
        name: Scratch.translate("Recording"),
        color1: "#696969",
        blocks: [
          {
            opcode: "startRecording",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("start recording"),
            blockIconURI: icon,
            arguments: {},
          },
          {
            opcode: "stopRecording",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stop recording"),
            blockIconURI: icon,
            arguments: {},
          },
          {
            opcode: "stopRecordingAndDownload",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "stop recording and download with [name] as filename"
            ),
            blockIconURI: icon,
            arguments: {
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue:
                  Scratch.translate({
                    default: "recording",
                    description: "Default file name",
                  }) + ".wav",
              },
            },
          },
          {
            opcode: "isRecording",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("recording?"),
            blockIconURI: icon,
            arguments: {},
          },
        ],
      };
    }
    async startRecording() {
      recordedChunks = [];
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("The recording function is not supported by the browser");
        return;
      }
      try {
        if (!(await Scratch.canRecordAudio())) {
          throw new Error("VM denied permission");
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.addEventListener("dataavailable", function (e) {
          recordedChunks.push(e.data);
        });
        mediaRecorder.start();
        console.log("Start recording");
      } catch (e) {
        console.error("Could not start recording", e);
      }
    }
    stopRecording() {
      if (!mediaRecorder) {
        console.error("Recording not started");
        return;
      }
      console.log("Stop recording");
      mediaRecorder.stop();
      mediaRecorder = null;
      recordedChunks = [];
    }
    stopRecordingAndDownload({ name }) {
      if (!mediaRecorder) {
        console.error("Recording not started");
        return;
      }
      console.log("Stop recording");
      mediaRecorder.addEventListener("stop", async function () {
        const blob = new Blob(recordedChunks, { type: "audio/wav" });
        recordedChunks = [];

        const url = URL.createObjectURL(blob);
        try {
          await Scratch.download(url, name);
        } catch (e) {
          console.error(e);
        }
        URL.revokeObjectURL(url);
      });
      mediaRecorder.stop();
      mediaRecorder = null;
    }
    isRecording() {
      return !!mediaRecorder;
    }
  }
  Scratch.extensions.register(new Recording());
})(Scratch);
//BY -SIPC- 502415953
