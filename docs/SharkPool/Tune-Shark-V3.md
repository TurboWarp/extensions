# Tune Shark V3
Tune Shark V3 is a powerful audio engine that is built to give you full control over your sounds. It allows you to apply numerous audio effects, precisely measure sound outputs, and more!
This is a remaster of the now deprecated Tune Shark extension by SharkPool.

## General Setup

### Note: All Tune Shark sounds are globally accessible in your project. This means all sprites will be able to access a loaded sound.

```scratch
⚙️ import sound from URL [https://...] named [MySound] ::#666666
```

You can import "Tune Shark" sounds via URL/URI using this block. It is important to note that URLs *must* be a **direct** link to an audio file

```scratch
⚙️ import sound (Meow v) named [MySound] ::#666666
```

Alternatively, you can import "Tune Shark" sounds from pre-existing sounds from the "Sounds" tab in the editor.

```scratch
⚙️ [bind v] sound [MySound] and sound [MySound2] ::#666666
```

This block allows you to bind or unbind the first inputted sound to the second. This means when you play "MySound2", "MySound" will play as well.
This **does not** go the same way in reverse.

## Audio Playback

```scratch
🎵 start sound [MySound] ::#666666
```
Similar to Scratch, this will start a sound from the beginning.

```scratch
🎵 start sound [MySound] at time (5) ::#666666
```

You can also start sounds at certain points in the track using this block. This is measured in seconds.

```scratch
🎵 start sound [MySound] at time (0) and stop at (2) ::#666666
```

Similar to the above block, this block will start a sound at a certain point, then **waits** until the sound reaches the stopping point.

```scratch
🎵 stop sound [MySound] ::#666666
```

This block will stop the inputted sound.

```scratch
🎵 [pause v] sound [MySound] ::#666666
```

This block will pause/unpause the inputted sound.

```scratch
🎵 [start v] all sounds ::#666666
```

This block controls all loaded sounds. You can:
- start all sounds
- stop all sounds
- pause all sounds
- unpause all sounds

## Operations

```scratch
⚙️ toggle sound link to @greenFlag @stopSign [on v] ::#666666
```

Toggling this operator on will cause Tune Shark sounds to stop when the green flag or stop sign is clicked.

```scratch
⚙️ toggle sound [MySound] overlapping [on v] ::#666666
```

Toggling this operator on will allow multiple instances of a sound to play at once.
Normally, you can only play one instance of a sound at a time.

```scratch
⚙️ toggle sound [MySound] reverse mode [on v] ::#666666
```

Toggling this operator on will make the inputted ound play in reverse. Toggling it off will return it back to normal.

```scratch
⚙️ toggle sound [MySound] looping [on v] ::#666666
```

Toggling this operator on will allow the inputted sound to loop.

```scratch
⚙️ sound [MySound] loop start (0) end (2) ::#666666
```

You can mess around with the loop starting point and ending point with this block.

```scratch
⚙️ delete sound [MySound] ::#666666
```

This block will delete the inputted sound.

```scratch
⚙️ delete all sounds ::#666666
```

This block will delete all loaded sounds.

```scratch
(⚙️ all sounds ::#666666)
```

This block will return an array of the names of all loaded Tune Shark sounds.

```scratch
(⚙️ all playing sounds ::#666666)
```

Similarly, this block returns an array of the names of all loaded Tune Shark sounds that are currently playing.

```scratch
⚙️ when sound [MySound] [starts v] ::#666666 hat
```

This event block runs whenever the inputted sound starts or ends.

```scratch
<⚙️ sound [MySound] (exists v)? ::#666666>
```

Returns various information of a sound:
Options | What they Check for
--- | ---
exists | if the sound exists
playing | if the sound is playing
paused | if the sound is paused
looped | if the sound is looping
overlaped | if the sound allows instancing
reversed | if the sound is reversed
binded | if the sound is binded to another

```scratch
(⚙️ (length v) of sound [MySound] ::#666666)
```

Returns various information of a sound:
Options | What they Do
--- | ---
length | sound length (in seconds)
current time | current position in a sound
source | source URL/URI of a sound
estimated bpm | estimated beats-per-minute
channels | the number of [channels](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_concepts) in a sound
sample rate | sample rate of a sound
fft data | a live Array of loudness values across all frequencies
binds | an array of sound names binded to this sound
*...various audio effects* | returns the inputted parameters for the effect

```scratch
(⚙️ [loudness v] of sound [MySound] at time (0) in channel (1) ::#666666)
```

You can read sound outputs using this block.

If you select **"loudness"**, it returns a normalized volume of the outputted noise at a specific point in the sound.

Similarly, **"raw noise"** returns the outputted volume, but its *not normalized*

Selecting **"tone"** will return the outputted pitch of a sound at a specific point.


The channel input selects which [sound channel](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_concepts) to extract the output data from.
Typically, if there are 2 channels, channel 1 is "Left Ear" and channel 2 is "Right Ear".

## Audio Effects

```scratch
🎛️ set volume of sound [MySound] to (100) ::#666666
```

This block simply sets the volume of the inputted sound.

```scratch
🎛️ reset (all effects v) of sound [MySound] ::#666666
```

This block resets the values of each audio effect in a sound to the default (not including volume).

```scratch
🎛️ set (pitch v) of sound [MySound] to (0) ::#666666
```

Sets the effect of a selected sound to a inputted value.
Effect List | What they Do
--- | ---
pitch | changes the speed and tone of the sound
detune | changes the speed and semitone of the sound
speed | changes the speed of the sound without affecting pitch
pan | shifts sound to the left (negative) or right (positive) ear
gain | boosts the sounds volume beyond 100
distortion | distorts/crushes sound
attack | fade-in time when sound starts
release | fade-out time when sound stops

```scratch
🎛️ set reverb of sound [MySound] to time (100) decay (100) mix (50) ::#666666
```

Adds reverb to an inputted sound.

**Warning:** Initializing reverb can cause framerate drops as its heavy to setup. For dynamic on/off use, you can use the Delay effect
Parameters | What they Do
--- | ---
time | the length (or room space) of the reverb effect
decay	| the rate of how long the reverb fades over time
mix	| percentage of how dry or wet the sound is

```scratch
🎛️ set delay of sound [MySound] to time (50) feedback (60) mix (50) ::#666666
```

Adds an echoing delay effect to a sound.

Parameters | What they Do
--- | ---
time | interval between each echo
feedback | intensity of each subsequent echo
mix	| percentage of the original sound and the delayed sound

```scratch
🎛️ set pan 3D of sound [MySound] to x (0) y (50) z (50) ::#666666
```

Modulates the pan of a sound in a 3D space.

Parameters | What they Do
--- | ---
x | pan left/right
y | pan top/bottom
z	| pan close/far

```scratch
🎛️ set tremolo of sound [MySound] to speed (35) depth (80) mix (100) ::#666666
```

Modulates the volume of a sound periodically, creating a tremolo effect.

Parameters | What they Do
--- | ---
speed | how fast the volume fluctuates
depth | intensity of the volume variation. A higher depth means more dramatic volume changes
mix	| amount of the tremolo effect applied

```scratch
🎛️ set fuzz of sound [MySound] to low (60) med-low (50) med-high (80) high (60) mix (50) ::#666666
```

Applies a fuzzy distortion to a sound.

Parameters | What they Do
--- | ---
low	| amount of distortion applied to low frequencies
med-low	| amount of distortion applied to mid-low frequencies
med-high | amount of distortion applied to mid-high frequencies
high | amount of distortion applied to high frequencies
mix	| proportion of unfuzzed sound and fuzzed sound

```scratch
🎛️ set bitcrush of sound [MySound] to bits (65) freq (60000) ::#666666
```

Reduces a sound's resolution and frequency, creating a chiptune-like, retro effect.

Parameters | What they Do
--- | ---
bits | bit depth. Lower values result in more distortion
freq | sampling frequency. Lower values create a grittier effect

```scratch
🎛️ set [highpass v] of sound [MySound] to frequency (400) peak (10) ::#666666
```

Highpass: Filters out lower frequencies below the specified cutoff, allowing higher frequencies to pass through.

Lowpass: Filters out higher frequencies above the specified cutoff, allowing lower frequencies to pass through.

Parameters | What they Do
--- | ---
frequency | cutoff frequency for the filter
peak | resonance at the cutoff frequency

```scratch
🎛️ set flanger of sound [MySound] to time (45) speed (20) depth (10) feed (10) mix (50) ::#666666
```

Combines the original sound with a delayed version, creating a sweeping, "jet-like" sound.

Parameters | What they Do
--- | ---
time | delay time for the effect
speed	| modulation controlling how quickly it oscillates
depth	| intensity of the effect
feed | feedback level, controlling how much flanged sound enters
mix	| proportion of the original and flanged sound

```scratch
🎛️ set compressor of sound [MySound] to threshold (15) knee (50) attack (50) release (50) ratio (50) ::#666666
```

Compresses the dynamic range of a sound, making quiet sounds louder and loud sounds quieter.

Parameters | What they Do
--- | ---
threshold | volume level at which compression begins
knee | smoothness of the transition into compression
attack | how quickly the compressor responds to volume changes
release |	how quickly the compression effect fades after the volume decreases
ratio	| amount of compression applied

```scratch
🎛️ set equalizer of sound [MySound] to gain low (100) med (100) high (100) cutoff low (-50) cutoff high (50) ::#666666
```

Adjusts the balance between different frequency bands of the sound. This is a 3-Band Equalizer.

Parameters | What they Do
--- | ---
gain low | gain applied to low frequencies
gain med | gain applied to mid frequencies
gain high	| gain applied to high frequencies
cutoff low | low-frequency cutoff point
cutoff high	| high-frequency cutoff point
