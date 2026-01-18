# Particle Engine

This extension allows you to create powerful and efficient particle engines without the use of clones.

## Engine Setup

The first step in setting up your particle engine is to create an engine.

```scratch
create engine for (Stage v) ::#2474ff
```
This block will initialize a new engine in the specified sprite.

```scratch
remove engine from (Stage v) ::#2474ff
```
This block will remove the engine from the specified sprite. Additionally, there is an option to remove all engines.

```scratch
<is (Stage v) engine (created v)? ::#2474ff>
```
If `created` is selected, this block will return whether the engine from the specified sprite exists.


If `visible` is selected, it will return whether the specified engine is showing.

```scratch
[show v] (Stage v) engine ::#2474ff
```
This block toggles the visibility of the specified engine.

```scratch
set size of (Stage v) engine to x (100) y (100) ::#2474ff
```
This block sets the size (scale) of the specified engine.
**This does not change the amount of drawable space**

```scratch
set stage size of (Stage v) engine to width (480) height (360) ::#2474ff
```
This block sets the amount of drawable space of the specified engine.
**Engines will scale up or down to fit within the stage**


You can use this block to increase the quality of your particles, however do note this might
affect performance on low-end devices.

```scratch
set layer of (Stage v) engine to (1) ::#2474ff
```
```scratch
((Stage v) engine layer ::#2474ff)
```
You can use these blocks to set and get the layer order of the specified engine.

```scratch
set [interpolation v] in (Stage v) engine [on v] ::#2474ff
```
This block will toggle various settings in the specified engine:

| Option | Description |
| ------ | ----------- |
|  Interpolation  | Makes particle motion smoother by interpolating positions between frames. This will automatically turn on the '_interpolation_' runtime option |
|      Freeze     | Pauses the engine if enabled |
| Particle Trails | If enabled, particles will leave a permanent trail when they move |

```scratch
set blend mode of engine (Stage v) to (additive v) ::#2474ff
```
This block will set the blend mode of the engine. Changes the appearance of particles and how colors interact over other sprites.

## Emitters

The next step in setting up your particle engine is creating an emitter and setting its emission behaviours.

_Tip: Using fewer engines with multiple emitters is more efficient than using multiple engines._

```scratch
create emitter named [emit-1] for (Stage v) ::#2474ff
```
This block will create a particle emitter in a specified engine using a custom identification name.

```scratch
delete emitter [emit-1] from (Stage v) ::#2474ff
```
```scratch
delete emitter  [emit-1] from (Stage v) and wait ::#2474ff
 ```

These blocks will delete the specified emitter from the specified engine.

The first block is instantaneous, meaning all currently emitted particles will disappear.
However the second block will wait until all particles disappear before deleting.

```scratch
<emitter [emit-1] in (Stage v) exists? ::#2474ff>
```
This block simply returns whether a emitter with a given name exists in a specified engine.

```scratch
set position of emitter [emit-1] in (Stage v) to x (0) y (0) ::#2474ff
```
```scratch
([x v] of emitter [emit-1] in (Stage v) ::#2474ff)
```
These blocks set and get the position of a specified emitter in an engine.

## Emitter Behaviours

```scratch
set texture of emitter [emit-1] in (Stage v) to [data.URI] ::#2474ff
```
This block will set the texture of a specified emitter in an engine.
It expects a **valid** image data.URI or URL.

```scratch
((circle v) texture ::#2474ff)
```
This block will return the data.URI of a specified basic particle shape.
The selection of basic shapes include: square, circle, triangle, and star. 

```scratch
set (max particles v) of emitter [emit-1] in (Stage v) to (15) ± (5) ::#2474ff
```
This block will set the specified behavior of particles in a specified emitter in an engine.

The first number input determines the base value used by particles.

The ± number input will determine the random variance per-particle.
(i.e., setting `start x` to `15` ± `5` will spawn particles at a random x value from 10-20)

### Behaviour List

|   Behaviour   |     Description     |
| ------------- | ------------------- |
| Max Particles | Determines the maximum number of particles on screen at a time |
|    Emission   | The number of particles spawned per frame |
|    Lifetime   | Determines how long in seconds a single particle will live |
|     Speed     | Determines how fast a particle will move |
|    Start x    | The start position of a particle when spawned on the x axis |
|    Start y    | The start position of a particle when spawned on the y axis |
|   Gravity x   | Determines the horizontal pull force on particles |
|   Gravity y   | Determines the vertical pull force on particles |
| Start Direction | The direction particles will move in when spawned |
| End Direction | The direction particles will move towards |
|   Start Spin  | Determines the rotation of a single particle when spawned |
|    End Spin   | Determines the rotation that a single particle will turn to |
|   Start Size  | Determines the size of a single particle when spawned |
|    End Size   | Determines the size that a single particle will transform towards |
| Start Stretch x | Determines the horizontal stretch value of a single particle when spawned |
|  End Stretch x  | Determines the horizontal stretch that a single particle will stretch towards |
| Start Stretch y | Determines the vertical stretch value of a single particle when spawned |
|  End Stretch y  | Determines the horizontal stretch that a single particle will stretch towards |
| Acceleration Radius | Applies acceleration in the direction the particle is currently moving, increasing or decreasing its speed over time |
| Acceleration Tan | Applies acceleration perpendicular to the particle’s movement, causing it to curve or spiral as it moves |
| Sine Wave | Controls the amplitude of horizontal sine wave motion applied to particles |
| Sine Speed | Determines how fast particles oscillate horizontally along the sine wave |
| Cosine Wave | Controls the amplitude of vertical cosine wave motion applied to particles |
| Cosine Speed | Determines how fast particles oscillate vertically along the cosine wave |
| Fade In | Determines how fast a single particle will fade in when spawned |
| Fade Out | Determines how fast a single particle will fade out before dying |

```scratch
set (start v) color of emitter [emit-1] in (Stage v) to [#ff0000] ± (0) ::#2474ff
```
This block will set the start/end color of particles in a specified emitter in an engine.

The color input determines the base value, and the ± determines the variance or random hue-shift.

```scratch
((max particles v) [value v] of emitter [emit-1] in (Stage v) ::#2474ff)
```
This block will return the specified behaviour of a specified emitter in an engine.

Selecting `value` will return the base value, and `randomizer` will return the variance value.

## Emitter Behaviours (Advanced)

```scratch
import data [{}] to emitter [emit-1] in (Stage v) ::#2474ff
```
This block will take JSON and set all behaviours of a specified emitter in an engine.
Importing data will overwrite all existing behaviour settings for the emitter.

This block will not work if JSON is malformed, not in the right format (see the `export emitter` block), or has incorrect or missing data.

```scratch
(export emitter [emit-1] in (Stage v) ::#2474ff)
```
This block will return JSON representing the behaviour settings for a specified emitter in an engine.

## IMPORTANT

This extension uses canvas contexts to display particles, per engine. It is advised you do **not** use many
engines at once since it could affect performance or cause visual issues with the stage.

For safety, this extension will give you warning alert in the editor when the number of engines reaches 7.

