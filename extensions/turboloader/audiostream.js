/*!
  This extension is from Turboloader - https://greasyfork.org/en/scripts/437432-turboloader
  It has been imported here with permission from the author for compatibility reasons only.
  Any future development MUST happen in a new extension.
*/

(function (Scratch) {
  "use strict";

  let contexList = [];
  let contextBindings = Object.create(null);
  let assetSourceList = Object.create(null);

  class AudioStream {
    getInfo() {
      return {
        id: "audiostr",
        name: Scratch.translate("AudioStream") + " 🔊",
        color1: "#ba45ac",
        color2: "#a8399b",
        color3: "#942c88",
        blocks: [
          {
            opcode: "am_loadasset",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("load sound from project [SRC]"),
            arguments: {
              SRC: {
                type: Scratch.ArgumentType.STRING,
                menu: "audAssetList",
              },
            },
          },
          {
            opcode: "am_playfromurl",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("load sound from URL/URI [URL]"),
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/meow.mp3",
              },
            },
          },
          {
            opcode: "am_playnew",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("start playing [SRC] in a new context"),
            arguments: {
              SRC: {
                type: Scratch.ArgumentType.STRING,
                menu: "audAssetList",
              },
            },
          },
          "---",
          {
            opcode: "am_usecontext",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("use [SPRITE]'s context in this sprite"),
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "spriteList" },
            },
          },
          "---",
          {
            opcode: "am_play",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("play"),
            arguments: {},
          },
          {
            opcode: "am_playandwait",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("play and wait till the end"),
            arguments: {},
          },
          {
            opcode: "am_resume",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("resume"),
            arguments: {},
          },
          {
            opcode: "am_pause",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("pause"),
            arguments: {},
          },
          {
            opcode: "am_stopthis",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stop (this context)"),
            arguments: {},
          },
          {
            opcode: "am_stophim",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stop sounds of [SPRITE]"),
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "spriteList" },
            },
          },
          {
            opcode: "am_stop",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stop all sounds"),
            arguments: {},
          },
          {
            opcode: "am_hasStopped",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("has stopped?"),
            arguments: {},
            disableMonitor: true,
          },
          {
            opcode: "am_isPaused",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is paused?"),
            arguments: {},
            disableMonitor: true,
          },
          "---",
          {
            opcode: "am_getanalyser",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("all visualizer data (slow)"),
            arguments: {},
          },
          {
            opcode: "am_getanalyserindex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("visualizer data at [INDEX]"),
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
              },
            },
          },
          {
            opcode: "am_analyserfft",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set visualizer read size to [VAL] (must be power of 2)"
            ),
            arguments: {
              VAL: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "256",
              },
            },
          },
          "---",
          {
            opcode: "am_setvolume",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set volume to [VAL]"),
            arguments: {
              VAL: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1.0",
              },
            },
          },
          {
            opcode: "am_getvolume",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("volume"),
            arguments: {},
          },
          "---",
          {
            opcode: "am_skipToTime",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("skip to time [VAL]"),
            arguments: {
              VAL: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "am_songDuration",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("sound duration"),
            arguments: {},
          },
          {
            opcode: "am_songCurrent",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current time"),
            arguments: {},
          },
          "---",
          {
            opcode: "am_setpitch",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set speed/pitch to [VAL]"),
            arguments: {
              VAL: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "am_setppitch",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("preservesPitch [VAL]"),
            arguments: {
              VAL: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: "false",
              },
            },
          },
          {
            opcode: "am_setstereo",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set pan to [VAL] (-1 to 1)"),
            arguments: {
              VAL: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "am_setfilter",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "(broken) filter [FIL] set frequency [FQ] quality [Q]"
            ),
            hideFromPalette: true,
            arguments: {
              FIL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "lowpass",
                menu: "filtersmenu",
              },
              Q: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              FQ: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "440",
              },
            },
          },
          {
            opcode: "am_toglefilter",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("(broken) filter [FIL] [STATE]"),
            hideFromPalette: true,
            arguments: {
              FIL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "lowpass",
                menu: "filtersmenu",
              },
              STATE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "connect",
                menu: "connectOrDisconnect",
              },
            },
          },
          {
            opcode: "am_freset",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("(broken) reset all filters"),
            hideFromPalette: true,
            arguments: {},
          },
          {
            opcode: "am_connect",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "(broken) connect [STRING] to track [TRACK]"
            ),
            hideFromPalette: true,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("filter1"),
              },
              TRACK: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("track"),
              },
            },
          },
          {
            opcode: "am_disconnect",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "(broken) disconnect [STRING] from track [TRACK]"
            ),
            hideFromPalette: true,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("filter1"),
              },
              TRACK: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("track"),
              },
            },
          },
        ],
        menus: {
          filtersmenu: [
            {
              text: Scratch.translate("lowpass"),
              value: "lowpass",
            },
            {
              text: Scratch.translate("highpass"),
              value: "highpass",
            },
            {
              text: Scratch.translate("bandpass"),
              value: "bandpass",
            },
            {
              text: Scratch.translate("lowshelf"),
              value: "lowshelf",
            },
            {
              text: Scratch.translate("highshelf"),
              value: "highshelf",
            },
            {
              text: Scratch.translate("peaking"),
              value: "peaking",
            },
            {
              text: Scratch.translate("notch"),
              value: "notch",
            },
            {
              text: Scratch.translate("allpass"),
              value: "allpass",
            },
          ],
          connectOrDisconnect: [
            {
              text: Scratch.translate("connect"),
              value: "connect",
            },
            {
              text: Scratch.translate("disconnect"),
              value: "disconnect",
            },
          ],
          audAssetList: {
            acceptReporters: true,
            items: "getProjectSounds",
          },
          spriteList: {
            acceptReporters: true,
            items: "getSprites",
          },
        },
      };
    }

    getProjectSounds() {
      const sounds = Scratch.vm.runtime.targets
        .filter((s) => s.isOriginal)
        .map((s) =>
          s.sprite.sounds.map((snd) => ({
            text: `${s.sprite.name} - ${snd.name}`,
            value: snd.assetId,
          }))
        )
        .flat();
      return sounds.length ? sounds : [{ text: "empty", value: "empty" }];
    }

    getSprites() {
      return Scratch.vm.runtime.targets
        .filter((s) => s.isOriginal)
        .map((s) => ({
          text: s.sprite.name,
          value: s.id,
        }));
    }

    // the 'am' prefix is a remenant from the original (sandboxed) extension 'AudioManager' made by me some time back, that i based this enhanced version off.

    getContext(id, opt) {
      // TODO: infinite recursion
      if (contextBindings[id] && id !== contextBindings[id]) {
        return this.getContext(contextBindings[id], opt);
      }
      const foundContext = contexList.find((c) => c.id === id);
      if (foundContext) {
        return foundContext;
      }
      return this.newContext(id, opt);
    }

    newContext(id, opt) {
      if (!opt) opt = {};
      let ctx = {
        id: id || contexList.length,
        isSimple: !!opt?.simple,
        source: document.createElement("audio"),
        effects: {},
        filters: {},
        volume: 1,
      };
      if (opt?.src) ctx.source.src = opt.src;
      ctx.source.crossOrigin = "anonymous";
      ctx.source.preservesPitch = false;
      ctx.source.id = "AudioStreamSource_" + id;
      document.body.appendChild(ctx.source);
      if (!opt?.simple) {
        ctx.audio = new AudioContext();
        ctx.track = ctx.audio.createMediaElementSource(ctx.source);
        ctx.effects.gain = ctx.audio.createGain();
        ctx.effects.panner = new StereoPannerNode(ctx.audio, { pan: 0 });
        [
          "lowpass",
          "highpass",
          "bandpass",
          "lowshelf",
          "highshelf",
          "peaking",
          "notch",
          "allpass",
        ].forEach((f) => {
          let bf = ctx.audio.createBiquadFilter();
          bf.type = f;
          ctx.filters[f] = bf;
        });
        ctx.analyser = ctx.audio.createAnalyser();
        ctx.analyser.fftSize = 2048;
        ctx.dataArray = new Uint8Array(ctx.analyser.frequencyBinCount);
        ctx.track
          .connect(ctx.effects.gain)
          .connect(ctx.effects.panner)
          .connect(ctx.analyser)
          .connect(ctx.audio.destination);
      }
      contexList.push(ctx);
      return ctx;
    }

    am_usecontext({ SPRITE }, util) {
      contextBindings[util.target.id] = SPRITE;
    }

    am_loadasset({ SRC }, util) {
      let ctx = !util?.source?.id ? this.getContext(util.target.id) : util;
      if (assetSourceList[SRC]) {
        ctx.source.src = assetSourceList[SRC];
        return;
      }
      let asset = Scratch.vm.assets.find((e) => e.assetId === SRC);
      if (!asset) {
        console.error("[AudioStream] Media error: ", asset);
        return;
      }
      let src = URL.createObjectURL(
        new Blob([asset.data], { type: asset.assetType.contentType })
      );
      ctx.source.src = src;
      assetSourceList[SRC] = src;
    }

    async am_playfromurl({ URL }, util) {
      let ctx = this.getContext(util.target.id);
      if (await Scratch.canFetch(URL)) {
        ctx.source.src = URL;
      }
    }

    am_stopthis(args, util) {
      let ctx = this.getContext(util.target.id);
      ctx.source.currentTime = 9e20;
    }

    am_stophim({ SPRITE }) {
      let ctx = this.getContext(SPRITE);
      ctx.source.currentTime = 9e20;
    }

    am_stop() {
      contexList.forEach((ctx) => {
        ctx.source.currentTime = 9e20;
      });
    }

    am_play(args, util) {
      let ctx = this.getContext(util.target.id);
      ctx.source.currentTime = 0.001;
      ctx.source.play();
    }

    am_playandwait(args, util) {
      let ctx = this.getContext(util.target.id);
      return new Promise((r) => {
        ctx.source.currentTime = 0.001;
        ctx.source.play();
        ctx.source.addEventListener("ended", r);
      });
    }

    am_playnew({ SRC }) {
      let id = btoa((Math.random() * 1e17).toString());
      let ctx = this.newContext(id, { simple: true });
      this.am_loadasset({ SRC: SRC }, ctx);
      ctx.source.currentTime = 0;
      ctx.source.play();
      ctx.source.addEventListener("ended", () => {
        ctx.source.remove();
        contexList = contexList.filter((c) => c.id != id);
      });
    }

    am_resume(args, util) {
      let ctx = this.getContext(util.target.id);
      ctx.source.play();
    }

    am_pause(args, util) {
      let ctx = this.getContext(util.target.id);
      ctx.source.pause();
    }

    am_skipToTime({ VAL }, util) {
      let ctx = this.getContext(util.target.id);
      ctx.source.currentTime = VAL;
    }

    am_setpitch({ VAL }, util) {
      let ctx = this.getContext(util.target.id);
      // Calculate the pitch value to be closer to original Scratch
      ctx.source.playbackRate = ctx.source.defaultPlaybackRate =
        VAL < 0
          ? VAL < -659
            ? 0.1
            : Math.abs(VAL) / 700
          : VAL > 700
            ? 15
            : VAL / 50 + 1;
    }

    am_setvolume({ VAL }, util) {
      let ctx = this.getContext(util.target.id);
      ctx.volume = +VAL;
      if (ctx.volume > 1) {
        ctx.source.volume = 1;
      } else if (ctx.volume < 0) {
        ctx.source.volume = 0;
      } else {
        ctx.source.volume = ctx.volume;
      }
    }

    am_getvolume(args, util) {
      let ctx = this.getContext(util.target.id);
      return ctx.volume;
    }

    am_setstereo({ VAL }, util) {
      let ctx = this.getContext(util.target.id);
      ctx.effects.panner.pan.value = VAL;
    }

    am_setppitch({ VAL }, util) {
      let ctx = this.getContext(util.target.id);
      ctx.source.preservesPitch = VAL;
    }

    am_setfilter({ FIL, FQ, Q }, util) {
      // did not work in the original version
    }

    am_toglefilter({ FIL, STATE }, util) {
      // did not work in the original version
    }

    am_freset({ FQ }, util) {
      // did not work in the original version
    }

    am_connect({ STRING }, util) {
      // did not work in the original version
    }

    am_disconnect({ STRING }, util) {
      // did not work in the original version
    }

    am_analyserfft({ VAL }, util) {
      let ctx = this.getContext(util.target.id);
      ctx.analyser.fftSize = VAL;
    }

    am_songDuration(args, util) {
      let ctx = this.getContext(util.target.id);
      return ctx.source.duration;
    }

    am_getanalyser(args, util) {
      let ctx = this.getContext(util.target.id);
      ctx.analyser.getByteTimeDomainData(ctx.dataArray);
      return JSON.stringify(ctx.dataArray);
    }

    am_getanalyserindex({ INDEX }, util) {
      let ctx = this.getContext(util.target.id);
      ctx.analyser.getByteTimeDomainData(ctx.dataArray);
      return ctx.dataArray[INDEX];
    }

    am_songCurrent(args, util) {
      let ctx = this.getContext(util.target.id);
      return ctx.source.currentTime;
    }

    am_hasStopped(args, util) {
      let ctx = this.getContext(util.target.id);
      return ctx.source.ended;
    }

    am_isPaused(args, util) {
      let ctx = this.getContext(util.target.id);
      return ctx.source.paused;
    }
  }

  Scratch.extensions.register(new AudioStream());
})(Scratch);
