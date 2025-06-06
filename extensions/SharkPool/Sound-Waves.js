// Name: Sound Waves
// ID: SPsoundWaves
// Description: Make sounds with oscillators!
// By: SharkPool
// License: MIT

// Version V.2.1.2

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Sound Waves must run unsandboxed");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMTAuODgyIiBoZWlnaHQ9IjExMC44ODIiIHZpZXdCb3g9IjAgMCAxMTAuODgyIDExMC44ODIiPjxwYXRoIGQ9Ik0wIDU1LjQ0MUMwIDI0LjgyMSAyNC44MjEgMCA1NS40NCAwYzMwLjYyIDAgNTUuNDQxIDI0LjgyMSA1NS40NDEgNTUuNDQgMCAzMC42Mi0yNC44MjEgNTUuNDQxLTU1LjQ0IDU1LjQ0MUMyNC44MjEgMTEwLjg4MSAwIDg2LjA2IDAgNTUuNDQxIiBmaWxsPSIjMmJiMzlhIi8+PHBhdGggZD0ibTEyLjg2MiA2Mi41MyA5LjAzLTE0LjU2NkwzNy42MjMgNzUuOTNsMTcuNDc5LTQxLjY1OCAxNy43NyA0MS4wNzUgMTMuNjkyLTI3LjA5Mkw5Ny4zNDMgNjIuNTMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI3LjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==";
  const blockIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMTEuNDI5IiBoZWlnaHQ9Ijc4IiB2aWV3Qm94PSIwIDAgMTExLjQyOSA3OCI+PHBhdGggZD0iTTI2Ny4xNiAyMTloLTI2LjQ2NGE2LjI3IDYuMjcgMCAwIDEtNi4yNjctNi4yNjh2LTYwLjU5aC0xNi43MTV2MjcuMTYyYTYuMjcgNi4yNyAwIDAgMS02LjI2OCA2LjI2N2gtMjQuMzc1YTIuNzg2IDIuNzg2IDAgMCAxLTIuNzg1LTIuNzg1di01LjU3MmEyLjc4NiAyLjc4NiAwIDAgMSAyLjc4NS0yLjc4NWgxOS41di0yNy4xNjFBNi4yNyA2LjI3IDAgMCAxIDIxMi44NCAxNDFoMjYuNDY1YTYuMjcgNi4yNyAwIDAgMSA2LjI2NyA2LjI2OHY2MC41OWgxNi43MTV2LTI3LjE2MmE2LjI3IDYuMjcgMCAwIDEgNi4yNjgtNi4yNjdoMjQuMzc1YTIuNzg2IDIuNzg2IDAgMCAxIDIuNzg1IDIuNzg1djUuNTcyYTIuNzg2IDIuNzg2IDAgMCAxLTIuNzg1IDIuNzg1aC0xOS41djI3LjE2MWE2LjI3IDYuMjcgMCAwIDEtNi4yNyA2LjI2OCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4NC4yODYgLTE0MSkiIGZpbGw9IiNmZmYiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpub3JtYWwiLz48L3N2Zz4=";

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const waves = ["triangle", "sine", "square", "sawtooth"];
  const notes = [
    "C", "C#", "D", "D#", "E", "F",
    "F#", "G", "G#", "A", "A#", "B"
  ];

  class SPsoundWaves {
    constructor() {
      this.audioContext = runtime.audioEngine.audioContext;
      this.audioNode = runtime.audioEngine.inputNode;
      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = 1;
      this.gainNode.connect(this.audioNode);

      this.currentNote = "C2";
      this.keyPressed = false;
      this.keyPressedTime = 0;
      this.playingNote = false;
      this.oscillators = new Map();
      this.gainNodes = new Map();
      this.playingStatus = new Map();
      this.registerKeyEvents();
      runtime.on("PROJECT_STOP_ALL", () => this.stopNote());
    }
    getInfo() {
      return {
        id: "SPsoundWaves",
        name: "Sound Waves",
        color1: "#2BB39A",
        menuIconURI,
        blockIconURI,
        blocks: [
          {
            opcode: "playNoteV2",
            blockType: Scratch.BlockType.COMMAND,
            text: "play [WAVE] note [NOTE] for [DURATION] seconds with ID [ID]",
            arguments: {
              WAVE: {
                type: Scratch.ArgumentType.STRING,
                menu: "WAVES"
              },
              NOTE: {
                type: Scratch.ArgumentType.NOTE,
                defaultValue: 60
              },
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0.5
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 1
              },
            },
          },
          {
            opcode: "playNoteContinuouslyV2",
            blockType: Scratch.BlockType.COMMAND,
            text: "play [WAVE] note [NOTE] continuously with ID [ID]",
            arguments: {
              WAVE: {
                type: Scratch.ArgumentType.STRING,
                menu: "WAVES"
              },
              NOTE: {
                type: Scratch.ArgumentType.NOTE,
                defaultValue: 60
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 1
              },
            },
          },
          {
            opcode: "stopID",
            blockType: Scratch.BlockType.COMMAND,
            text: "stop note with ID [ID]",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 1
              },
            },
          },
          {
            opcode: "stopNote",
            blockType: Scratch.BlockType.COMMAND,
            text: "stop all notes"
          },
          { blockType: Scratch.BlockType.LABEL, text: "Volume" },
          {
            opcode: "setVolume",
            blockType: Scratch.BlockType.COMMAND,
            text: "set volume of note with ID [ID] to [VOLUME]%",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 1
              },
              VOLUME: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              },
            },
          },
          {
            opcode: "getVol",
            blockType: Scratch.BlockType.REPORTER,
            text: "volume of note with ID [ID]",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 1
              },
            },
          },
          {
            opcode: "setAllVolume",
            blockType: Scratch.BlockType.COMMAND,
            text: "set volume for all IDs to [VOLUME]%",
            arguments: {
              VOLUME: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              },
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Pitch" },
          {
            opcode: "setPitch",
            blockType: Scratch.BlockType.COMMAND,
            text: "set pitch of note with ID [ID] to [PITCH]",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 1
              },
              PITCH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
            },
          },
          {
            opcode: "getPitch",
            blockType: Scratch.BlockType.REPORTER,
            text: "pitch of note with ID [ID]",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 1
              },
            },
          },
          {
            opcode: "setAllPitch",
            blockType: Scratch.BlockType.COMMAND,
            text: "set pitch for all notes to [PITCH]",
            arguments: {
              PITCH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Operators" },
          {
            opcode: "isPlaying",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is ID [ID] playing?",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 1
              },
            },
          },
          {
            opcode: "convertPressedKeyToNote",
            blockType: Scratch.BlockType.REPORTER,
            text: "pressed key to note"
          },
          {
            opcode: "getKeyPressedDuration",
            blockType: Scratch.BlockType.REPORTER,
            text: "pressed key duration"
          },
        ],
        menus: {
          WAVES: { acceptReporters: true, items: waves }
        },
      };
    }

    // Helper Funcs
    convertScratchNoteToRealNote(scratchNote) {
      const octave = Math.floor(scratchNote / 12) - 1;
      const noteName = notes[scratchNote % 12];
      return `${noteName}${octave}`;
    }

    noteToFrequency(note) {
      return 440 * Math.pow(2, (this.noteToMIDI(note) - 69) / 12);
    }

    noteToMIDI(note) {
      const noteName = note.substring(0, note.length - 1);
      const octave = parseInt(note.charAt(note.length - 1));
      return notes.indexOf(noteName) + (octave + 1) * 12;
    }

    playSound(frequency, duration, waveform, ID) {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      oscillator.type = waves.includes(waveform) ? waveform : "square";
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      gainNode.gain.setValueAtTime(1.0, this.audioContext.currentTime);

      oscillator.connect(gainNode);
      gainNode.connect(this.gainNode);
      oscillator.start();

      this.oscillators.set(ID, oscillator);
      this.gainNodes.set(ID, gainNode);
      this.playingStatus.set(ID, true);
      if (duration !== Infinity) {
        setTimeout(() => {
          this.stopID({ ID });
        }, duration * 1000);
      }
    }

    removeOscillator(oscillator) {
      const index = this.oscillators.indexOf(oscillator);
      if (index !== -1) this.oscillators.splice(index, 1);
    }

    registerKeyEvents() {
      document.addEventListener("keydown", (event) => {
        if (!this.keyPressed) {
          this.keyPressed = true;
          this.keyPressedTime = this.audioContext.currentTime;
          this.convertAndReportNoteFromKeyPressed(event.key);
        }
      });
      document.addEventListener("keyup", () => {
        this.keyPressed = false;
        this.keyPressedTime = 0;
      });
    }

    convertAndReportNoteFromKeyPressed(key) {
      const keysToNotes = {
        Z: 48, X: 50, C: 52, V: 53,
        B: 55, N: 57, M: 59, ",": 60,
        A: 49, S: 51, D: 53, F: 54,
        G: 56, H: 58, J: 60, K: 62,
        L: 64, Q: 60, W: 62, E: 64,
        R: 65, T: 67, Y: 69, U: 71,
        I: 72, P: 72, 1: 62, 2: 64,
        3: 65, 4: 67, 5: 69, 6: 71,
        7: 72, 8: 74, 9: 76, 0: this.currentNote,
        O: this.currentNote
      };
      const note = keysToNotes[key.toUpperCase()] || 0;
      this.currentNote = note;
      return note;
    }

    // Block Funcs
    playNoteV2({ WAVE, NOTE, DURATION, ID }) {
      this.stopID({ ID });
      const realNote = this.convertScratchNoteToRealNote(Math.round(NOTE));
      const frequency = this.noteToFrequency(realNote);
      this.playSound(frequency, DURATION, WAVE, ID);
    }

    playNoteContinuouslyV2({ WAVE, NOTE, ID }) {
      this.stopID({ ID });
      const realNote = this.convertScratchNoteToRealNote(Math.round(NOTE));
      const frequency = this.noteToFrequency(realNote);
      this.playingNote = true;
      this.noteStopTime = Infinity;
      this.playSound(frequency, this.noteStopTime, WAVE, ID);
    }

    stopID({ ID }) {
      const oscillator = this.oscillators.get(ID);
      if (oscillator) {
        oscillator.stop();
        this.oscillators.delete(ID);
        this.playingStatus.set(ID, false);
      }
    }

    stopNote() {
      this.oscillators.forEach((oscillator) => { oscillator.stop() });
      this.oscillators.clear();
      this.playingNote = false;
      this.playingStatus.forEach((value, key) => {
        this.playingStatus.set(key, false);
      });
    }

    getVol({ ID }) {
      const gainNode = this.gainNodes.get(ID);
      if (gainNode) return gainNode.gain.value * 100;
      return 100;
    }

    setVolume({ ID, VOLUME }) {
      const gainNode = this.gainNodes.get(ID);
      if (gainNode) {
        gainNode.gain.setValueAtTime(
          VOLUME / 100, this.audioContext.currentTime
        );
      }
    }

    setAllVolume({ VOLUME }) {
      let gainNode = "";
      this.gainNodes.forEach((value, key) => {
        gainNode = this.gainNodes.get(key);
        if (gainNode) {
          gainNode.gain.setValueAtTime(
            VOLUME / 100, this.audioContext.currentTime
          );
        }
      });
    }

    setPitch({ ID, PITCH }) {
      const oscillator = this.oscillators.get(ID);
      if (oscillator) {
        const pitchFactor = Math.pow(2, PITCH / 12);
        const newFrequency = 440 * pitchFactor;
        oscillator.frequency.setValueAtTime(newFrequency, this.audioContext.currentTime);
      }
    }

    setAllPitch({ PITCH }) {
      const pitchFactor = Math.pow(2, PITCH / 12);
      this.oscillators.forEach((oscillator, ID) => {
        const newFrequency = 440 * pitchFactor;
        oscillator.frequency.setValueAtTime(newFrequency, this.audioContext.currentTime);
      });
    }

    getPitch({ ID }) {
      const oscillator = this.oscillators.get(ID);
      if (oscillator) {
        const currentFrequency = oscillator.frequency.value;
        const pitchFactor = currentFrequency / 440;
        return Math.round(12 * Math.log2(pitchFactor));
      }
      return 0;
    }

    isPlaying({ ID }) { return this.playingStatus.get(ID) !== undefined && this.playingStatus.get(ID) }

    convertPressedKeyToNote() { return this.keyPressed ? this.currentNote : 0 }

    getKeyPressedDuration() {
      return this.keyPressed ? this.audioContext.currentTime - this.keyPressedTime : 0;
    }
  }

  Scratch.extensions.register(new SPsoundWaves());
})(Scratch);
