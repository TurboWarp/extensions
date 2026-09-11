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

### Formatting Events


These are all the same:

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
