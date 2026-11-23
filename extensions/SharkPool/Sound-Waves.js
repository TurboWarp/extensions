// Name: Sound Waves
// ID: SPsoundWaves
// Description: Make sounds with oscillators!
// By: SharkPool
// License: MIT

// Version V.2.1.4

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Sound Waves must run unsandboxed");
  }

  const menuIconURI =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMTAuODgyIiBoZWlnaHQ9IjExMC44ODIiIHZpZXdCb3g9IjAgMCAxMTAuODgyIDExMC44ODIiPjxwYXRoIGQ9Ik0wIDU1LjQ0MUMwIDI0LjgyMSAyNC44MjEgMCA1NS40NCAwYzMwLjYyIDAgNTUuNDQxIDI0LjgyMSA1NS40NDEgNTUuNDQgMCAzMC42Mi0yNC44MjEgNTUuNDQxLTU1LjQ0IDU1LjQ0MUMyNC44MjEgMTEwLjg4MSAwIDg2LjA2IDAgNTUuNDQxIiBmaWxsPSIjMmJiMzlhIi8+PHBhdGggZD0ibTEyLjg2MiA2Mi41MyA5LjAzLTE0LjU2NkwzNy42MjMgNzUuOTNsMTcuNDc5LTQxLjY1OCAxNy43NyA0MS4wNzUgMTMuNjkyLTI3LjA5Mkw5Ny4zNDMgNjIuNTMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI3LjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==";
  const blockIconURI =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMTEuNDI5IiBoZWlnaHQ9Ijc4IiB2aWV3Qm94PSIwIDAgMTExLjQyOSA3OCI+PHBhdGggZD0iTTI2Ny4xNiAyMTloLTI2LjQ2NGE2LjI3IDYuMjcgMCAwIDEtNi4yNjctNi4yNjh2LTYwLjU5aC0xNi43MTV2MjcuMTYyYTYuMjcgNi4yNyAwIDAgMS02LjI2OCA2LjI2N2gtMjQuMzc1YTIuNzg2IDIuNzg2IDAgMCAxLTIuNzg1LTIuNzg1di01LjU3MmEyLjc4NiAyLjc4NiAwIDAgMSAyLjc4NS0yLjc4NWgxOS41di0yNy4xNjFBNi4yNyA2LjI3IDAgMCAxIDIxMi44NCAxNDFoMjYuNDY1YTYuMjcgNi4yNyAwIDAgMSA2LjI2NyA2LjI2OHY2MC41OWgxNi43MTV2LTI3LjE2MmE2LjI3IDYuMjcgMCAwIDEgNi4yNjgtNi4yNjdoMjQuMzc1YTIuNzg2IDIuNzg2IDAgMCAxIDIuNzg1IDIuNzg1djUuNTcyYTIuNzg2IDIuNzg2IDAgMCAxLTIuNzg1IDIuNzg1aC0xOS41djI3LjE2MWE2LjI3IDYuMjcgMCAwIDEtNi4yNyA2LjI2OCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4NC4yODYgLTE0MSkiIGZpbGw9IiNmZmYiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpub3JtYWwiLz48L3N2Zz4=";

  const Cast = Scratch.Cast;
  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const WAVES = [
    { text: Scratch.translate("triangle"), value: "triangle" },
    { text: Scratch.translate("sine"), value: "sine" },
    { text: Scratch.translate("square"), value: "square" },
    { text: Scratch.translate("sawtooth"), value: "sawtooth" },
  ];

  /**
   * Map of normal volumes for different waves. Some waves are 'louder' than others.
   * @type {Object<String, Number>}
   */
  const NORM_VOLUMES = {
    sine: 1.0,
    triangle: 1.2,
    square: 0.2,
    sawtooth: 0.4,
  };

  class SPsoundWaves {
    constructor() {
      this.audioContext = runtime.audioEngine.audioContext;
      this.audioNode = runtime.audioEngine.inputNode;

      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = 1;
      this.gainNode.connect(this.audioNode);

      this.waves = new Map();

      runtime.on("RUNTIME_DISPOSED", () => this._cleanup());
      runtime.on("PROJECT_START", () => this._cleanup());
      runtime.on("PROJECT_STOP_ALL", () => this._cleanup());
    }
    getInfo() {
      return {
        id: "SPsoundWaves",
        name: Scratch.translate("Sound Waves"),
        color1: "#2BB39A",
        menuIconURI,
        blockIconURI,
        blocks: [
          {
            opcode: "playNoteV2",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "play [WAVE] wave [NOTE] for [DURATION] seconds with ID [ID]"
            ),
            arguments: {
              WAVE: {
                type: Scratch.ArgumentType.STRING,
                menu: "WAVES",
              },
              NOTE: {
                type: Scratch.ArgumentType.NOTE,
                defaultValue: 60,
              },
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0.5,
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "playNoteContinuouslyV2",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "play [WAVE] wave [NOTE] continuously with ID [ID]"
            ),
            arguments: {
              WAVE: {
                type: Scratch.ArgumentType.STRING,
                menu: "WAVES",
              },
              NOTE: {
                type: Scratch.ArgumentType.NOTE,
                defaultValue: 60,
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "stopID",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stop wave with ID [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "stopNote",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stop all waves"),
          },
          "---",
          {
            opcode: "setVolume",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set volume of wave ID [ID] to [VOLUME] %"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 1,
              },
              VOLUME: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          {
            opcode: "setAllVolume",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set volume of all waves to [VOLUME] %"),
            arguments: {
              VOLUME: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          {
            opcode: "getVol",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("volume of wave ID [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 1,
              },
            },
          },
          "---",
          {
            opcode: "setPitch",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set detune of wave ID [ID] to [PITCH]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 1,
              },
              PITCH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "setAllPitch",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set detune of all waves to [PITCH]"),
            arguments: {
              PITCH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          {
            opcode: "getPitch",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("detune of wave ID [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 1,
              },
            },
          },
          "---",
          {
            opcode: "isPlaying",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("wave ID [ID] playing?"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 1,
              },
            },
          },
        ],
        menus: {
          WAVES: { acceptReporters: true, items: WAVES },
        },
      };
    }

    // Helper Funcs
    _cleanup() {
      for (const data of this.waves.values()) {
        if (data.oscillator) {
          try {
            data.oscillator.stop();
          } catch (error) {
            // An oscillator that has already stopped cannot be stopped again.
          }

          data.oscillator.disconnect();
          data.oscillator = null;
          data.detuneNode = null;
        }

        data.gainNode.disconnect();
        data.playing = false;
      }

      this.waves.clear();
    }

    _newNote(id, waveType, note) {
      waveType = Cast.toString(waveType).toLowerCase();
      id = Cast.toString(id);

      if (this.waves.has(id)) {
        return this._updateNote(id, waveType, note);
      }

      const gainNode = this.audioContext.createGain();
      const wave = WAVES.find((w) => w.value === waveType)?.value || "square";

      const data = {
        id,
        oscillator: null,
        detuneNode: null,
        gainNode,
        type: wave,
        detune: 0,
        volume: 100,
        playing: false,
      };

      gainNode.connect(this.gainNode);
      this.waves.set(id, data);

      return this._createOscillator(data, wave, note);
    }

    _createOscillator(data, waveType, note) {
      const t = this.audioContext.currentTime;
      const oscillator = this.audioContext.createOscillator();
      const wave = WAVES.find((w) => w.value === waveType)?.value || "square";
      const frequency = this._scratchNoteToFreq(note);
      const normVolume = NORM_VOLUMES[wave] ?? 1;

      oscillator.type = wave;
      oscillator.frequency.setValueAtTime(frequency, t);
      oscillator.detune.setValueAtTime(data.detune, t);

      data.gainNode.gain.cancelScheduledValues(t);
      data.gainNode.gain.setValueAtTime((data.volume / 100) * normVolume, t);

      oscillator.connect(data.gainNode);
      oscillator.start(t + 0.03);

      data.oscillator = oscillator;
      data.detuneNode = oscillator.detune;
      data.type = wave;
      data.playing = true;

      return data;
    }

    _updateNote(id, waveType, note) {
      const data = this.waves.get(id);
      const newWave =
        WAVES.find((w) => w.value === waveType)?.value || "square";

      if (!data.playing || !data.oscillator) {
        return this._createOscillator(data, newWave, note);
      }

      const t = this.audioContext.currentTime;
      const newFrequency = this._scratchNoteToFreq(note);

      data.oscillator.type = newWave;
      data.oscillator.frequency.setValueAtTime(newFrequency, t);
      data.type = newWave;

      // Keep the current volume consistent when changing waveform.
      const normVolume = NORM_VOLUMES[newWave] ?? 1;
      data.gainNode.gain.setTargetAtTime(
        (data.volume / 100) * normVolume,
        t,
        0.005
      );

      return data;
    }

    _scratchNoteToFreq(note) {
      const freq = 440 * Math.pow(2, (note - 69) / 12);
      return this._clamp(-20000, 20000, freq);
    }

    _clamp(min, max, val) {
      if (isNaN(val)) return 0 > min ? 0 : min;
      return Math.min(max, Math.max(min, val));
    }

    // Block Funcs
    playNoteV2(args, util) {
      if (util.stackTimerNeedsInit()) {
        const duration = Math.max(0, 1000 * Cast.toNumber(args.DURATION));
        this._newNote(args.ID, args.WAVE, args.NOTE);

        util.startStackTimer(duration);
        runtime.requestRedraw();
        util.yield();
      } else if (!util.stackTimerFinished()) {
        util.yield();
      } else {
        this.stopID({ ID: args.ID });
      }
    }

    playNoteContinuouslyV2(args) {
      this._newNote(args.ID, args.WAVE, args.NOTE);
    }

    stopID(args) {
      const data = this.waves.get(Cast.toString(args.ID));
      if (!data || !data.playing || !data.oscillator) return;

      const t = this.audioContext.currentTime;
      data.gainNode.gain.cancelScheduledValues(t);
      data.gainNode.gain.setTargetAtTime(0, t, 0.005);
      data.oscillator.stop(t + 0.03);
      data.playing = false;
    }

    stopNote() {
      for (const entry of this.waves) {
        this.stopID({ ID: entry[0] });
      }
    }

    getVol(args) {
      const data = this.waves.get(Cast.toString(args.ID));
      if (data) return data.volume;
      return 0;
    }

    setVolume(args) {
      const data = this.waves.get(Cast.toString(args.ID));
      if (!data) return;

      const volFactor = NORM_VOLUMES[data.type] ?? 1;
      const volume = this._clamp(0, 200, Cast.toNumber(args.VOLUME));
      const t = this.audioContext.currentTime;

      data.volume = volume;
      data.gainNode.gain.cancelScheduledValues(t);
      data.gainNode.gain.setValueAtTime((volume * volFactor) / 100, t);
    }

    setAllVolume(args) {
      const volume = args.VOLUME;
      for (const entry of this.waves) {
        this.setVolume({ ID: entry[0], VOLUME: volume });
      }
    }

    setPitch(args) {
      const data = this.waves.get(Cast.toString(args.ID));
      if (!data) return;

      const detune = this._clamp(-150000, 150000, Cast.toNumber(args.PITCH));
      const t = this.audioContext.currentTime;

      data.detune = detune;
      if (data.detuneNode) {
        data.detuneNode.setValueAtTime(detune, t);
      }
    }

    setAllPitch(args) {
      const pitch = args.PITCH;
      for (const entry of this.waves) {
        this.setPitch({ ID: entry[0], PITCH: pitch });
      }
    }

    getPitch(args) {
      const data = this.waves.get(Cast.toString(args.ID));
      if (data) return data.detune;
      return 0;
    }

    isPlaying(args) {
      const data = this.waves.get(Cast.toString(args.ID));
      return data && data.playing;
    }

    /* Deprecation Marker */
    playNote(args, util) {
      this.playNoteV2(args, util);
    }
    playNoteContinuously(args) {
      this.playNoteContinuouslyV2(args);
    }
    convertPressedKeyToNote() {
      return "deprecated";
    }
    getKeyPressedDuration() {
      return "deprecated";
    }
    /* Marker End */
  }

  Scratch.extensions.register(new SPsoundWaves());
})(Scratch);
