# MIDI Extension Documentation

## Overview

This extension uses the [Web MIDI api](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API) to communicate with MIDI instruments.


---

## Getting Started

### Check if MIDI available

```scratch
when flag clicked
if <(MIDI | number of [input v] devices:: #4c97ff) = (0)> then
say [No devices connected!]
else
say (MIDI | (Name v) of [input v] device at (1):: #4c97ff)
end
```

### Monitor for MIDI messages

```scratch

MIDI | when input event (Any v):: #4c97ff
say (MIDI | Input Event:: #4c97ff) // note C4 108 ch01 dev1 t=920.192
```

### Output Events

You can format output messages in a number of different ways. There's two output blocks: 

**Blocking** *(waits for note to complete, similar to the Music extension)*

```scratch
MIDI | play note [62] for [0.5] beats:: #4c97ff


MIDI | Send [note D4] to (loopMIDI Port v):: #4c97ff
wait (0.5) seconds
MIDI | Send [off D4] to (loopMIDI Port v):: #4c97ff
```

**Scheduled** *(Schedules events without refresh or waiting)*. Events are sent immediately unless they have a `pos=` or `time=` parameter, which schedules them for that many **beats**/**seconds** in the future

```scratch
MIDI | Send [note Eb4 beats=1/4] to (loopMIDI Port v):: #4c97ff
MIDI | Send [{"pitch": 60, "velocity": 92, "channel": 2}] to (loopMIDI Port v):: #4c97ff // JSON
MIDI | Send [cc 74 124] to (Any v):: #4c97ff // send CC message

MIDI | Send [note D4 dur=0.5] to (loopMIDI Port v):: #4c97ff

MIDI | Send (MIDI | Note [60] Beats [0.5] Volume [96]% (channel 1 v) (any v) to (any v):: #4c97ff):: #4c97ff

MIDI | Send [note D4] to (loopMIDI Port v):: #4c97ff // note message with no duration
MIDI | Send [off D4 pos=0.5] to (loopMIDI Port v):: #4c97ff // send note off message as separate event

MIDI | play note [62] for [0.5] beats:: #4c97ff

MIDI | Send [note D4] to (loopMIDI Port v):: #4c97ff
wait (0.5) seconds
MIDI | Send [off D4] to (loopMIDI Port v):: #4c97ff
```


## Troubleshooting

1. Make sure you have a MIDI compatible browser. Most browsers support it aside from Safari. You can test support [here](https://studiocode.dev/check-webmidi/)
2. Make sure you have a MIDI device (for example a MIDI keyboard controller) connected.
3. When the extension first loads you may get a browser prompt asking for permission to access MIDI devices.
4. When **exporting** your project: Because of browser restrictions you'll need to access your project on a "trusted" protocol, i.e. `https://` or `http://localhost`. File based access *(`file://`)* or `http://` *(with no `s`)* likely won't work.


## References

- [About MIDI note values (scratch wiki)](https://en.scratch-wiki.info/wiki/MIDI_Notes)

- [MIDI Specification](https://www.midi.org/specifications/item/table-1-summary-of-midi-message)
- [MIDI Essentials](https://ccrma.stanford.edu/~craig/articles/linuxmidi/misc/essenmidi.html)
- [WebMIDI API](https://www.w3.org/TR/webmidi/)


## Appendix - Message Format

### JSON MidiEvent

Represents a parsed MIDI event with the following properties:

| Property | Aliases | Type | Description |
|----------|---------|------|-------------|
| `type` | - | `note` / `noteOff` / `cc` / `polyTouch` / `programChange` / `pitchBend` / `channelPressure` / `songPosition` / `songSelect` / `clock` / `start` / `continue` / `stop` / `activeSensing` / `reset` / `rest` | Type of MIDI command. Default: `note`. `rest` is a special null value *(no output, used for making sequences of notes)* |
| `value1` | - | number (0-127) | Raw data1 byte value |
| `value2` | - | number (0-127) | Raw data2 byte value |
| `channel` | `ch` | number (1-16) | Channel of event. Default: 1 |
| `device` | `dev` | number (1-N) | Index of MIDI input/output device |
| `pitch` | `note` | number (0-127) | Note pitch. C4=60 |
| `velocity` | - | number (0-127) | Note velocity. 0 = note off |
| `cc` | - | number (0-127) | Continuous controller number |
| `value` | - | number | CC/pitchBend/programChange value *(0-127 except for songPosition/pitchBend, which is 0-16384)* |
| `time` | `t` / `@` | number | Time of event in **seconds** |
| `pos` | - | number | Time in **beats** (converted to time using current tempo) |
| `dur` | `duration` | number | **[Output only]** Duration in **seconds** (for `note` type, sends corresponding MIDI note off message automatically) |
| `beats` | - | number | **[Output only]** Duration in **beats** - (converted to `duration` using current tempo) |

### Input Events

Input events use the format: `<TYPE> <VALUE1> <VALUE2> ch<CHANNEL> dev<DEVICE> t=<TIME>`.

### Output Events

This library tries to parse input strings as best as possible, filling in with defaults if not otherwise specified.

**Defaults for all events**: `channel=1 device=1`

**Default note**: `type=note pitch=60 velocity=96 duration=1/2`

#### Time Values

* **time** - `time=1.0`, `t=1.0`, `@1` - schedule event to happen X seconds into the future
* **pos** - `pos=1/2`, `pos=0.5` - schedule event to happen X beats into the future. Fractions are supported. Tempo is based off of the **Music** extension's `🎶 tempo` block.
* **dur** - `dur=0.5`, `

You can schedule output events to play at a specific time by using the `time` parameter (which is specified in seconds from `now`). You can set the duration of the event by adding a `dur` or `beats` value.

#### EXAMPLE - arpeggiate a chord, playing each note for a quarter note
```
C4 beats=1/4 pos=0
E4 beats=1/4 pos=1/4
G4 beats=1/4 pos=2/4
C5 beats=1/4 pos=3/4
```
#### EXAMPLE - "strum" a chord, offsetting each note slightly
```
C4 dur=2 time=0
E4 dur=2 time=0.05
G4 dur=2 time=0.1
C5 dur=2 time=0.15
```


---

## MIDI Event Mappings

This library parses raw MIDI messages (which encode `command`, `channel`, `param1` and `param2`) into a more readable object format.

### Supported MIDI Commands

<figure>

| Event Type | Alias | Description | param1 | param2 |
|------------|---------|-------------|--------|--------|
| `note` | `note` | Note-on | `pitch` | `velocity` |
| `noteOff` | `off` | Note-off | `pitch` | `velocity` |
| `cc` | `cc` | Continuous controller | `cc` | `value` |
| `polyTouch` | `touch` | Aftertouch | `pitch` | `value` |
| `programChange` | `program` | Patch change | `value` | - |
| `pitchBend` | `bend` | Pitch bend | - | `value`* |
| `channelPressure` | `pressure` | Channel Pressure | `value` | - |
| `songPosition` | `songpos` | Song Position Pointer † | - | `value`* |
| `songSelect` | `songsel` | Song Select †| `value` | - |
| `clock` | `clock` | Timing Clock †| - | - |
| `start` | `start` | Start †| - | - |
| `continue` | `continue` | Continue †| - | - |
| `stop` | `stop` | Stop †| - | - |
| `activeSensing` | `ping` | Active Sensing †| - | - |
| `reset` | `reset` | System Reset †| - | - |

<figcaption>


**Event Type** - name of MIDI data type

**Alias** - alternative short name

**param1** - Name of first value. For example, `note` events have `pitch`, `cc` has the controller # aka `cc`

**param2** - Name of 2nd data parameter. This is the velocity for notes or `value` for CCs. These values will be in the range 0-127, except for `pitchBend` and `songPosition` which have the range 0-16384.


\* High-resolution parameters (0-16384), instead of usual midi 0-127 range</small>

† These types of commands may not be supported by all MIDI devices.

</figcaption>
</figure>




---

## Formatting Events

This library tries to support a lot of different ways to trigger events, defaulting to note events. 

`{ }`

These are all equivalent:

| Value | Description |
| ----- | ----------- |
| `{ "type": "note", "pitch": 61 } `| JSON format |
| `type=note pitch=61` | String format |
| `{ "pitch": 61 }` | JSON format, `type` defaults to "note" |
| `{ "pitch": "C#4" }` | JSON format, use note name instead of note number |
| `pitch=61` | String format, type defaults to "note" |
| `60` | single values are treated as notes (60 = middle C) |
| `C#4` | middle C-sharp |
| `Db4` | Same note (61), but written as D-flat |

---

## String Format Examples

### Note Events

```
note C4 96              # Note on C4 with velocity 96
note Db4 96 ch1 dev0   # With channel and device
off D4                  # Note off
note E4 96 dur=0.5     # With duration
note F4 96 beats=1/4   # Duration in beats
```

### CC Events

```
cc 7 100               # CC #7 (volume) at value 100
cc 10 64 ch5           # CC on channel 5
```

### Pitch Bend

```
bend 8192              # Pitch bend at center
bend 16383             # Max up
```

### Other Events

```
program 5              # Program change
pressure 100           # Channel pressure
touch C4 64            # Aftertouch on C4
clock                  # Timing clock
```

### Timing

```
note C4 96 t=1.5       # Timestamp 1.5 seconds
note C4 96 pos=2       # Position in beats
note C4 96 dur=0.25    # Duration in seconds
note C4 96 @1.5        # Shorthand for timestamp
```

---
