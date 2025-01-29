// Name: MIDI
// ID: masterMathMidi
// Description: An extension that retrieves input from MIDI devices.
// By: -MasterMath- <https://scratch.mit.edu/users/-MasterMath-/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This MIDI extension must run unsandboxed!");
  }

  let midiInputDevices = [];
  let midiDeviceInfo = [];
  let notesOn = [];
  let noteVelocities = [];
  let lastNotePressed = 0;
  let lastNoteReleased = 0;

  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(onSuccess, onError);

    function onSuccess(midiAccess) {
      midiAccess.onstatechange = (event) => {
        if (event.port.state == "connected") {
          midiInputDevices.push(
            `[id: "${event.port.id}" name: "${event.port.name}"]`
          );
          midiDeviceInfo.push([event.port.id, event.port.name]);
        } else if (event.port.state == "disconnected") {
          // Find and remove from midiInputDevices
          const inputIndex = midiInputDevices.findIndex(
            (item) =>
              item === `[id: "${event.port.id}" name: "${event.port.name}"]`
          );
          if (inputIndex !== -1) midiInputDevices.splice(inputIndex, 1);

          // Find and remove from midiDeviceInfo
          const infoIndex = midiDeviceInfo.findIndex(
            (item) => item[0] === event.port.id
          );
          if (infoIndex !== -1) midiDeviceInfo.splice(infoIndex, 1);
        }
      };

      function onMIDIMessage(event) {
        const [status, note, velocity] = event.data;
        const command = status & 0xf0;
        if (command === 0x90 && velocity > 0) {
          notesOn.push(note);
          noteVelocities.push([note, velocity]);
          lastNotePressed = note;
          Scratch.vm.runtime.startHats("midi_whenAnyNote", {
            pressedReleased: "pressed",
          });
          Scratch.vm.runtime.startHats("midi_whenNote", {
            note: note,
            pressedReleased: "pressed",
          });
        } else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
          lastNoteReleased = note;
          notesOn.splice(notesOn.indexOf(note), 1);
          noteVelocities.splice(
            noteVelocities.findIndex((subArray) => subArray[0] === note),
            1
          );
          Scratch.vm.runtime.startHats("midi_whenAnyNote", {
            pressedReleased: "released",
          });
          Scratch.vm.runtime.startHats("midi_whenNote", {
            note: note,
            pressedReleased: "released",
          });
        } else {
          console.log(
            `Other MIDI Message: Status=${status}, Note=${note}, Velocity=${velocity}, Timestamp ${event.timeStamp}`
          );
        }
      }

      midiAccess.inputs.forEach((entry) => {
        entry.onmidimessage = onMIDIMessage;
      });
    }

    function onError(err) {
      throw new Error("MIDI Access Error:", err);
    }
  } else {
    throw new Error("MIDI is not supported on this browser.");
  }

  class MIDI {
    getInfo() {
      return {
        id: "masterMathMidi",
        name: Scratch.translate("MIDI"),
        blocks: [
          {
            opcode: "MIDIinputDevices",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("connected MIDI input devices"),
            disableMonitor: true,
          },
          {
            opcode: "midiDeviceInfo",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[info] of MIDI device [number]"),
            arguments: {
              info: {
                type: Scratch.ArgumentType.STRING,
                menu: "infoMenu",
              },
              number: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          "---",
          {
            opcode: "whenAnyNote",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when any note [pressedReleased]"),
            isEdgeActivated: false,
            shouldRestartExistingThreads: true,
            arguments: {
              pressedReleased: {
                type: Scratch.ArgumentType.STRING,
                menu: "pressedReleased",
              },
            },
          },
          {
            opcode: "whenNote",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when note [note] [pressedReleased]"),
            isEdgeActivated: false,
            shouldRestartExistingThreads: true,
            arguments: {
              note: {
                type: Scratch.ArgumentType.NOTE,
                defaultValue: 60,
              },
              pressedReleased: {
                type: Scratch.ArgumentType.STRING,
                menu: "pressedReleased",
              },
            },
          },
          {
            opcode: "noteOn",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is note [note] on?"),
            arguments: {
              note: {
                type: Scratch.ArgumentType.NOTE,
                defaultValue: 60,
              },
            },
          },
          {
            opcode: "noteVelocity",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("velocity of note [note]"),
            arguments: {
              note: {
                type: Scratch.ArgumentType.NOTE,
                defaultValue: 60,
              },
            },
          },
          {
            opcode: "activeNotes",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("all active notes"),
            disableMonitor: true,
          },
          {
            opcode: "lastNote",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("last note [pressedReleased]"),
            disableMonitor: true,
            arguments: {
              pressedReleased: {
                type: Scratch.ArgumentType.STRING,
                menu: "pressedReleased",
              },
            },
          },
        ],
        menus: {
          infoMenu: {
            acceptReporters: false,
            items: [
              {
                text: Scratch.translate("name"),
                value: "name",
              },
              {
                text: Scratch.translate("id"),
                value: "id",
              },
            ],
          },
          pressedReleased: {
            acceptReporters: false,
            items: [
              {
                text: Scratch.translate("pressed"),
                value: "pressed",
              },
              {
                text: Scratch.translate("released"),
                value: "released",
              },
            ],
          },
        },
      };
    }

    MIDIinputDevices() {
      return midiInputDevices;
    }

    midiDeviceInfo(args) {
      args.number = Scratch.Cast.toNumber(args.number);
      if (midiInputDevices[args.number] != null) {
        return midiDeviceInfo[args.number][args.info == "id" ? 0 : 1];
      } else {
        return;
      }
    }

    noteOn(args) {
      return notesOn.includes(Scratch.Cast.toNumber(args.note));
    }

    noteVelocity(args) {
      args.note = Scratch.Cast.toNumber(args.note);
      if (
        notesOn.includes(args.note) &&
        noteVelocities.find((subArray) => subArray[0] === args.note)[1] !==
          undefined
      ) {
        return noteVelocities.find((subArray) => subArray[0] === args.note)[1];
      }
    }

    activeNotes() {
      return notesOn;
    }

    lastNote({ pressedReleased }) {
      switch (pressedReleased) {
        case "pressed":
          return lastNotePressed;
        case "released":
          return lastNoteReleased;
        default:
          return "";
      }
    }
  }

  Scratch.extensions.register(new MIDI());
})(Scratch);
