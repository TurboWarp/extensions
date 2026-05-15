// Name: DECtalk
// ID: nishiowoDectalk
// Description: Use DECtalk.
// By: NishiOwO
// License: BSD-3-Clause

// Repository is at https://github.com/dectalk/tw-dectalk

(async function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("DECtalk must be run unsandboxed");
  }

  let Module, speak, speak_init;
  let g_buffer = {};
  let g_sources = [];
  let embedded = false;
  var DECtalkMini;

  /* DO NOT REMOVE THE COMMENT BELOW!!! */
  /* EMBED DTC.JS HERE */

  let dtc;
  if (embedded) {
    dtc = DECtalkMini;
  } else {
    dtc = await Scratch.external.evalAndReturn(
      "https://raw.githubusercontent.com/dectalk/tw-dectalk/79a9f2538e7cf712e6fd25d4345fab531c31800b/dtc.js",
      "DECtalkMini"
    );
  }

  // @ts-ignore
  window.onDECtalkAudioCallback = function (tts, buffer, length, phoneme) {
    let arr_r = new Int16Array(Module.HEAP16.buffer, buffer, length);
    let arr = new Int16Array(length);

    for (let i = 0; i < arr.length; i++) arr[i] = arr_r[i];

    if (!g_buffer[tts]) g_buffer[tts] = [];
    g_buffer[tts].push(arr);
  };

  class DECtalk {
    getInfo() {
      const blockIconURI =
        "data:image/png;base64,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";

      return {
        id: "nishiowoDectalk",
        name: Scratch.translate("DECtalk"),
        blockIconURI: blockIconURI,
        color1: "#b3353f",
        blocks: [
          {
            opcode: "speakAndWait",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("speak [WORDS]"),
            arguments: {
              WORDS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello",
              },
            },
          },
          {
            opcode: "stopAll",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stop all speaking"),
          },
        ],
      };
    }

    speakAndWait(args) {
      return new Promise(function (res, rej) {
        const audioContext = Scratch.vm.runtime.audioEngine.audioContext;
        const str = Module.stringToNewUTF8(Scratch.Cast.toString(args.WORDS));
        const tts = speak(str);
        Module._free(str);

        let b = 0;
        if (g_buffer[tts]) {
          for (let i = 0; i < g_buffer[tts].length; i++) {
            b += g_buffer[tts][i].length;
          }
        } else {
          res();
        }

        const audioBuffer = audioContext.createBuffer(1, b, 11025);
        const channelData = audioBuffer.getChannelData(0);

        b = 0;

        for (let i = 0; i < g_buffer[tts].length; i++) {
          for (let j = 0; j < g_buffer[tts][i].length; j++) {
            channelData[b + j] = g_buffer[tts][i][j] / 32767;
          }
          b += g_buffer[tts][i].length;
        }

        const currentSource = audioContext.createBufferSource();
        currentSource.buffer = audioBuffer;
        currentSource.connect(audioContext.destination);

        g_sources.push(currentSource);

        currentSource.onended = function () {
          g_sources = g_sources.filter((x) => x != currentSource);
          res();
        };

        currentSource.start();

        if (g_buffer[tts]) delete g_buffer[tts];
      });
    }

    stopAll() {
      for (let i of g_sources) {
        i.stop();
      }
      g_sources = [];
    }
  }

  Module = await dtc();
  speak_init = Module.cwrap("speak_init", null, []);
  speak = Module.cwrap("speak", "number", ["number"]);

  speak_init();

  Scratch.extensions.register(new DECtalk());
})(Scratch);
