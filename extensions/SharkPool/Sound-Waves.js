// Name: Sound Waves
// ID: SPsoundWaves
// Description: Make sounds with oscillators!
// By: SharkPool <https://github.com/SharkPool-SP>

// Version V.2.0.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Sound Waves must run unsandboxed");
  }

  const menuIconURI =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMTAuODgxNzkiIGhlaWdodD0iMTEwLjg4MTc5IiB2aWV3Qm94PSIwLDAsMTEwLjg4MTc5LDExMC44ODE3OSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4NC44OTc1NCwtMTI0Ljg5ODUzKSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xODQuODk3NTQsMTgwLjMzOTQzYzAsLTMwLjYxOTE2IDI0LjgyMTc0LC01NS40NDA4OSA1NS40NDA5LC01NS40NDA4OWMzMC42MTkxNiwwIDU1LjQ0MDksMjQuODIxNzQgNTUuNDQwOSw1NS40NDA5YzAsMzAuNjE5MTYgLTI0LjgyMTczLDU1LjQ0MDkgLTU1LjQ0MDksNTUuNDQwOWMtMzAuNjE5MTYsMCAtNTUuNDQwOSwtMjQuODIxNzQgLTU1LjQ0MDksLTU1LjQ0MDl6IiBmaWxsPSIjMmJiMzlhIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMTk3Ljc1OTMyLDE4Ny40Mjg1NGw5LjAzMDc3LC0xNC41NjU3NWwxNS43MzEwMSwyNy45NjYyNGwxNy40Nzg5LC00MS42NTgwNWwxNy43NzAyMiw0MS4wNzU0MmwxMy42OTE4LC0yNy4wOTIzbDEwLjc3ODY2LDE0LjI3NDQ0IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjcuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPjwvZz48L3N2Zz4=";

  const blockIconURI =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMTEuNDI4NTYiIGhlaWdodD0iNzgiIHZpZXdCb3g9IjAsMCwxMTEuNDI4NTYsNzgiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xODQuMjg1NzIsLTE0MSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yNjcuMTYwNzIsMjE5aC0yNi40NjQyOGMtMy40NjE2NCwwIC02LjI2Nzg1LC0yLjgwNjIxIC02LjI2Nzg1LC02LjI2Nzg1di02MC41ODkyOGgtMTYuNzE0Mjh2MjcuMTYwNzJjMCwzLjQ2MTY0IC0yLjgwNjIxLDYuMjY3ODUgLTYuMjY3ODUsNi4yNjc4NWgtMjQuMzc1Yy0xLjUzODUxLDAgLTIuNzg1NzIsLTEuMjQ3MjEgLTIuNzg1NzIsLTIuNzg1NzJ2LTUuNTcxNDNjMCwtMS41Mzg1MSAxLjI0NzIxLC0yLjc4NTcyIDIuNzg1NzIsLTIuNzg1NzJoMTkuNXYtMjcuMTYwNzJjMCwtMy40NjE2NCAyLjgwNjIxLC02LjI2Nzg1IDYuMjY3ODUsLTYuMjY3ODVoMjYuNDY0MjhjMy40NjE2NCwwIDYuMjY3ODUsMi44MDYyMSA2LjI2Nzg1LDYuMjY3ODV2NjAuNTg5MjhoMTYuNzE0Mjh2LTI3LjE2MDcyYzAsLTMuNDYxNjQgMi44MDYyMSwtNi4yNjc4NSA2LjI2Nzg1LC02LjI2Nzg1aDI0LjM3NWMxLjUzODUxLDAgMi43ODU3MiwxLjI0NzIxIDIuNzg1NzIsMi43ODU3MnY1LjU3MTQzYzAsMS41Mzg1MSAtMS4yNDcyMSwyLjc4NTcyIC0yLjc4NTcyLDIuNzg1NzJoLTE5LjV2MjcuMTYwNzJjMCwzLjQ2MTY0IC0yLjgwNjIxLDYuMjY3ODUgLTYuMjY3ODUsNi4yNjc4NXoiLz48L2c+PC9nPjwvc3ZnPg==";

  const notes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];

  class SPsoundWaves {
    constructor() {
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      this.currentNote = "C2";
      this.keyPressed = false;
      this.keyPressedTime = 0;
      this.playingNote = false;
      this.oscillators = [];
      this.noteIDMap = new Map();
      this.gainNodes = new Map();
      this.playingStatus = new Map();
      this.registerKeyEvents();
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
            opcode: "playNote",
            blockType: Scratch.BlockType.COMMAND,
            text: "play [WAVE] note [NOTE] for [DURATION] seconds with ID [ID]",
            arguments: {
              WAVE: {
                type: Scratch.ArgumentType.STRING,
                menu: "WAVES",
                defaultValue: "sine",
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
            opcode: "playNoteContinuously",
            blockType: Scratch.BlockType.COMMAND,
            text: "play [WAVE] note [NOTE] continuously with ID [ID]",
            arguments: {
              WAVE: {
                type: Scratch.ArgumentType.STRING,
                menu: "WAVES",
                defaultValue: "sine",
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
            text: "stop note with ID [ID]",
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
            text: "stop all notes",
          },

          "---",

          {
            opcode: "setVolume",
            blockType: Scratch.BlockType.COMMAND,
            text: "set volume of note with ID [ID] to [VOLUME]%",
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
            opcode: "getVol",
            blockType: Scratch.BlockType.REPORTER,
            text: "volume of note with ID [ID]",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 1,
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
                defaultValue: 100,
              },
            },
          },

          "---",

          {
            opcode: "isPlaying",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is ID [ID] being played?",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 1,
              },
            },
          },

          "---",

          {
            opcode: "convertPressedKeyToNote",
            blockType: Scratch.BlockType.REPORTER,
            text: "pressed key to note",
          },
          {
            opcode: "getKeyPressedDuration",
            blockType: Scratch.BlockType.REPORTER,
            text: "pressed key duration",
          },
        ],
        menus: {
          WAVES: ["triangle", "sine", "square", "sawtooth"],
          NOTES: this.getNotesMenu(),
        },
      };
    }

    getVol({ ID }) {
      const gainNode = this.gainNodes.get(ID);
      if (gainNode) {
        return gainNode.gain.value * 100;
      }
      return 100;
    }

    isPlaying({ ID }) {
      let check = this.playingStatus.get(ID);
      check = check === undefined ? false : check;
      return check;
    }

    getNotesMenu() {
      const menu = [];
      for (let octave = 0; octave < 8; octave++) {
        for (const note of notes) {
          menu.push(`${note}${octave}`);
        }
      }
      return menu;
    }

    convertScratchNoteToRealNote(scratchNote) {
      const octave = Math.floor(scratchNote / 12) - 1;
      const noteName = notes[scratchNote % 12];
      return `${noteName}${octave}`;
    }

    playNote({ WAVE, NOTE, DURATION, ID }) {
      const realNote = this.convertScratchNoteToRealNote(Math.round(NOTE));
      const frequency = this.noteToFrequency(realNote);
      this.playSound(frequency, DURATION, WAVE, ID);
    }

    playNoteContinuously({ WAVE, NOTE, ID }) {
      const realNote = this.convertScratchNoteToRealNote(Math.round(NOTE));
      const frequency = this.noteToFrequency(realNote);
      this.playingNote = true;
      this.noteStopTime = Infinity;
      this.playSound(frequency, this.noteStopTime, WAVE, ID);
    }

    stopNote() {
      this.oscillators.forEach((oscillator) => {
        oscillator.stop();
      });
      this.oscillators = [];
      this.playingNote = false;
      this.playingStatus.forEach((value, key) => {
        this.playingStatus.set(key, false);
      });
    }

    stopID({ ID }) {
      const oscillator = this.noteIDMap.get(ID);
      if (oscillator) {
        oscillator.stop();
        this.noteIDMap.delete(ID);
        this.playingStatus.set(ID, false);
      }
    }

    noteToFrequency(note) {
      const noteValue = this.noteToMIDI(note);
      return 440 * Math.pow(2, (noteValue - 69) / 12);
    }

    noteToMIDI(note) {
      const noteName = note.substring(0, note.length - 1);
      const octave = parseInt(note.charAt(note.length - 1));
      return notes.indexOf(noteName) + (octave + 1) * 12;
    }

    setVolume({ ID, VOLUME }) {
      const gainNode = this.gainNodes.get(ID);
      if (gainNode) {
        gainNode.gain.setValueAtTime(
          VOLUME / 100,
          this.audioContext.currentTime
        );
      }
    }

    setAllVolume({ VOLUME }) {
      let gainNode = "";
      this.gainNodes.forEach((value, key) => {
        gainNode = this.gainNodes.get(key);
        if (gainNode) {
          gainNode.gain.setValueAtTime(
            VOLUME / 100,
            this.audioContext.currentTime
          );
        }
      });
    }

    playSound(frequency, duration, waveform, ID) {
      const oscillator = this.audioContext.createOscillator();
      oscillator.type = waveform;
      oscillator.frequency.setValueAtTime(
        frequency,
        this.audioContext.currentTime
      );
      const gainNode = this.audioContext.createGain();
      gainNode.gain.setValueAtTime(1.0, this.audioContext.currentTime);
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      const now = this.audioContext.currentTime;
      oscillator.start(now);

      this.oscillators.push(oscillator);
      this.gainNodes.set(ID, gainNode);
      this.playingStatus.set(ID, true);

      if (duration !== Infinity) {
        oscillator.stop(now + duration);
        oscillator.onended = () => {
          this.removeOscillator(oscillator);
          this.gainNodes.delete(ID);
          this.playingStatus.delete(ID);
          this.playingNote = false;
        };
      }

      if (ID) {
        this.noteIDMap.set(ID, oscillator);
      }
    }

    removeOscillator(oscillator) {
      const index = this.oscillators.indexOf(oscillator);
      if (index !== -1) {
        this.oscillators.splice(index, 1);
      }
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
        Z: 48,
        X: 50,
        C: 52,
        V: 53,
        B: 55,
        N: 57,
        M: 59,
        ",": 60,
        A: 49,
        S: 51,
        D: 53,
        F: 54,
        G: 56,
        H: 58,
        J: 60,
        K: 62,
        L: 64,
        Q: 60,
        W: 62,
        E: 64,
        R: 65,
        T: 67,
        Y: 69,
        U: 71,
        I: 72,
        P: 72,
        1: 62,
        2: 64,
        3: 65,
        4: 67,
        5: 69,
        6: 71,
        7: 72,
        8: 74,
        9: 76,
        0: this.currentNote,
        O: this.currentNote,
      };
      const note = keysToNotes[key.toUpperCase()] || 0;
      this.currentNote = note;
      return note;
    }

    convertPressedKeyToNote() {
      return this.keyPressed ? this.currentNote : 0;
    }

    getKeyPressedDuration() {
      return this.keyPressed
        ? this.audioContext.currentTime - this.keyPressedTime
        : 0;
    }
  }

  Scratch.extensions.register(new SPsoundWaves());
})(Scratch);
