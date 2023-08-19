# Jazz-Soft Midi

This extension allows communication with midi ports and virtual ports

## Blocks

```scratch
Open Jazz MIDI port :: #e8b62d
```
Opens the first avalible port
---
```scratch
play note (60) with velocity (127) for (1) seconds on channel (1 v) :: #e8b62d
(channel 10 is the percussion channel)
```
Plays a MIDI note at the specified velocity
(velocity ranges from 0 to 127, note 60 if middle C)
---
```scratch
set instrument to (0) for channel (1 v) :: #e8b62d
```
Sets the instrument for the specified channel
(instrument values range from 0 to 127)
---
```scratch
(port name) :: #e8b62d
```
returns the port that is active