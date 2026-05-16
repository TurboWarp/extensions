// Name: Libxmp
// ID: nishiowoLibxmp
// Description: Play tracker modules using Libxmp.
// By: NishiOwO
// License: BSD-3-Clause

// Repository is at https://github.com/nishiowo/tw-libxmp

(async function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Libxmp must be run unsandboxed");
  }

  let Module, xmp_start, xmp_read, xmp_end, xmp_loop_count;
  let xmp;
  let g_keepplaying = {};
  let embedded = false;
  let full_libxmp = false;
  var libxmp;

  /* DO NOT REMOVE THE COMMENT BELOW!!! */
  /* EMBED XMP.JS HERE */

  if (embedded) {
    xmp = libxmp;
  } else {
    if (full_libxmp) {
      xmp = await Scratch.external.evalAndReturn(
        "https://raw.githubusercontent.com/NishiOwO/tw-libxmp/63101e3cfd7281498b5066f4e79fe8fe09b5797f/xmp.js",
        "libxmp"
      );
    } else {
      xmp = await Scratch.external.evalAndReturn(
        "https://raw.githubusercontent.com/NishiOwO/tw-libxmp/63101e3cfd7281498b5066f4e79fe8fe09b5797f/xmp.full.js",
        "libxmp"
      );
    }
  }

  Module = await xmp();
  xmp_start = Module.cwrap("xmp_start", "number", ["number", "number"]);
  xmp_read = Module.cwrap("xmp_read", "number", ["number"]);
  xmp_end = Module.cwrap("xmp_end", null, ["number"]);
  xmp_loop_count = Module.cwrap("xmp_loop_count", "number", ["number"]);

  const blockIconURI =
    "data:image/png;base64,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";

  class Libxmp {
    constructor() {
      Scratch.vm.runtime.on("PROJECT_STOP_ALL", this.stopAll);
    }

    getInfo() {
      return {
        id: "nishiowoLibxmp",
        name: Scratch.translate("Libxmp"),
        blockIconURI: blockIconURI,
        color1: "#2050a0",
        blocks: [
          {
            opcode: "playURLAndWait",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "play URL [URL] with repeat count [REPEAT]"
            ),
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://f.nishi.boats/f/g/module/aryx.s3m",
              },
              REPEAT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "-1",
              },
            },
          },
          {
            opcode: "stopAll",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stop all playing"),
          },
        ],
      };
    }

    playURLAndWait(args, util) {
      return (async function () {
        const res = await Scratch.fetch(Scratch.Cast.toString(args.URL));
        const bytes = await res.bytes();
        const pointer = Module._malloc(bytes.length);
        let h_xmp;

        function keep_playing() {
          return (
            g_keepplaying[h_xmp] &&
            !util.thread.isKilled &&
            (args.REPEAT == -1 ? true : xmp_loop_count(h_xmp) < args.REPEAT)
          );
        }

        Module.HEAPU8.set(bytes, pointer);

        h_xmp = xmp_start(pointer, bytes.length);
        if (h_xmp != 0) {
          g_keepplaying[h_xmp] = true;

          await new Promise(function (res, rej) {
            const audioContext = Scratch.vm.runtime.audioEngine.audioContext;
            let baseTime = audioContext.currentTime;
            let samples = 0;
            let sources = [];

            function read() {
              const buf = xmp_read(h_xmp);

              const buffer = new Float32Array(Module.HEAPF32.buffer, buf);
              const len = buffer[0];

              const audioBuffer = audioContext.createBuffer(2, len, 44100);
              const lChannelData = audioBuffer.getChannelData(0);
              const rChannelData = audioBuffer.getChannelData(1);

              if (keep_playing()) {
                for (let i = 0; i < len; i++) {
                  lChannelData[i] = buffer[2 * i + 0 + 1];
                  rChannelData[i] = buffer[2 * i + 1 + 1];
                }
              } else {
                for (let i = 0; i < len; i++) {
                  lChannelData[i] = rChannelData[i] = 0;
                }
              }

              Module._free(buf);

              const currentSource = audioContext.createBufferSource();
              currentSource.buffer = audioBuffer;
              currentSource.connect(audioContext.destination);

              currentSource.onended = function () {
                sources = sources.filter((x) => x != currentSource);
                if (keep_playing()) {
                  for (let i = sources.length; i < 5; i++) read();
                } else if (sources.length == 0) {
                  res();
                }
              };

              sources.push(currentSource);

              currentSource.start(baseTime + samples / 44100);

              samples += len;
            }

            read();
            read();
            read();
            read();
          });
          xmp_end(h_xmp);
          if (g_keepplaying[h_xmp]) delete g_keepplaying[h_xmp];
        }

        Module._free(pointer);
      })();
    }

    stopAll() {
      g_keepplaying = {};
    }
  }

  Scratch.extensions.register(new Libxmp());
})(Scratch);
