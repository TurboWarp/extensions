# FastNoiseLite

## Creator
I did not create the noise, I only turned it into an extension.
For the original project go here:
https://github.com/Auburn/FastNoiseLite
https://auburn.github.io/FastNoiseLite/

## How to use

All features you can test on this website: https://auburn.github.io/FastNoiseLite/
*except for easing and inverted*

There are 2 blocks:

1. [create noise](#createNoise)
2. [get noise](#getNoise)

Although the [get noise](#getNoise) block has 3D coordinates, you can use just X and Y if you want 2D noise

### Create Noise <a name="createNoise"></a>

```scratch
create noise id: [myNoise] seed: (0) type: [Perlin v] octaves: (1) frequency: (0.01) fractal: [FBm v] inverted? (false v) easing: [Linear v] :: motion
```
The create noise block is where you actually add a new noise function to use.

**ID:**
the ID value is the name of this noise function, your noise must have a name for the [get noise](#getNoise) block to be able to use.

**SEED:**
defaulted to 0, this is the seed for the noise. The same seed will always be the same noise, so if you want to use the same noise every time keep the seed the same.

**TYPE:**
there are many types of noise, to get a better understanding of them go to this website: https://auburn.github.io/FastNoiseLite/

**OCTAVES:**
this describes how many different noises are layered onto eachother, every octave is a lower strength and size than the previous octave; gives more texture to your noise.

**FREQUENCY:**
this is the size of the noise, higher the frequency, smaller the size of the noise. If working with pixels I'd suggest keeping frequency from 0.001 - 0.02, with other things just test values until something works

**FRACTAL:**
None turns off octaves, FBm is normal noise and octaves, Ridged has octaves and changes the noise to give sharp ridges going through the noise instead of smooth hills, Ping Pong is similar to ridged except there are deep valleys between the ridges.

**INVERTED:**
inverts the noise values

**EASING:**

- Linear: does nothing to the values

- Squared: squares the value

- Cubed: cubes the value

- Root: square roots the value

### Get Noise <a name="getNoise"></a>

```scratch
(get noise id: [myNoise] at x: (0) y: (0) z: (0) :: motion)
```
This block returns the value of your given noise at your given coordinates.

**ID:**
the ID value of your noise (what you set for the id in the [create noise](#createNoise) block)

**X Y Z:**
the coordinates of the noise