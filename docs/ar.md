# Augmented Reality

## Requirements

 - [ARCore](https://play.google.com/store/apps/details?id=com.google.ar.core)
 - browser with [WebXR API and immersive-ar](https://immersive-web.github.io/webxr-samples/report/) session type support

At the moment of writing, only Chromium-based browsers support immersive-ar session type.

## Other information

 - It is generally recommended to use this extension with fps set to 0, which in turbowarp means running project at the screen refresh rate.
 - While exiting AR mode, there is a small chance TurboWarp will lose WebGL context. This problem has also been observed on other websites with AR and likely can't be fixed. If that happens, you can save the project, refresh the tab, load the project and continue.
 - It isn't possible to be in AR mode and have video sensing enabled at the same time. Entering AR disables video sensing and makes it not toggleable until AR session ends.

## Blocks

```scratch
enter ar mode :: #d10000
```
If AR is not supported and the error message haven't been shown yet, shows a popup with an error message.

If AR is supported and project is currently not in AR, attempts to enter AR mode. While doing so, it will pause the script it is in, in the same way ask block does. It will first try to enter AR mode directly. That may fail because entering AR can only be triggred by user interaction. If it fails, it will make it so after user clicks/taps the project will attempt to enter AR. If that fails as well or either of those 2 attempts succeed it will resume the script execution. After it resumes, project may or may not be in AR mode. Projects should handle both cases.

The origin of coordinate system is placed at or close to position of the device at the time this block was called.

---

```scratch
exit ar mode :: #d10000
```

If the project is in AR mode, exits it.

---


```scratch
<is in ar? :: #d10000>
```
Tells if the project is currently in AR mode.

---

```scratch
<is [ar v] available? :: #d10000>
```
Tells if AR is supported on this device.

---

```scratch
<is [pose v] available? :: #d10000>
```
Tells if AR engine knows what the current camera position and orientation is.

After entering AR mode, is is not immediately available as the map of the environment needs to be built first. After enough information about environment has been gathered and processed, it becomes available. It can temporarily become unavailable due to lack of detailed features in the view of camera that are used for motion tracking, fast motion causing camera image to become too blurry or camera getting covered.

---

```scratch
<is [hit position v] available :: #d10000>
```
Tells if AR engine knows where the point of ray intersection is.

Can become unavailable for the same reasons as [is [pose] available?]

---

```scratch
(stage width :: #d10000)
```

Tells stage width in scratch units. Default is `480`.

This value may change when entering AR.

---

```scratch
(stage height :: #d10000)
```

Tells stage height in scratch units. Default is `360`.

This value will not change when entering AR.

---

```scratch
(item [1] of [view v] matrix :: #d10000)
```

view matrix - is a matrix that can be used to transform points from the world space (relatively to the world origin) to the view space (with origin is at the camera). It includes rotation and translation of the camera.

Also:

```
view[13] = position[x]
view[14] = position[y]
view[15] = position[z] 
```

---

```scratch
(item [1] of [inverse view v] matrix :: #d10000)
```

inverse view matrix = view matrix<sup>-1</sup>

Describes the opposite transformation to the view matrix.

---

```scratch
(item [1] of [projection v] matrix :: #d10000)
```

For perspective projection in scratch you are likely used to doing something like this:

```
screenX = x * dist / z
screenY = y * dist / z
```

With this extension it's more complicated: projection is done by first doing a 4x4 projection matrix multiplication by 4D vector `x,y,z,1`, with result being `X,Y,Z,W`, then performing division of `X,Y,Z` by `W` to get screen coordinates in range from -1 to 1, and then multiplying them by half of stage width and height to get scratch coordinates.

The matrix is a perspective projection matrix with the assumption camera <u>faces negative z</u> and that screen coordinates range from -1 to 1.

It's calculated as:

```
                                      /\
                                     /||\
                                      ||     OUT
   IN                                 ||  [X,Y,Z,W]
[x,y,z,1]                             ||
      \     [ 2 * dist / width,                 0,                             0,  0 ]  [  1, 2, 3, 4 ]
_______\    [                0, 2 * dist / height,                             0,  0 ]  [  5, 6, 7, 8 ]
^^^^^^^/    [                0,                 0,   (near + far) / (near - far), -1 ]  [  9,10,11,12 ]
      /     [                0,                 0, near * far / (near - far) * 2,  0 ]  [ 13,14,15,16 ]

near = depth of near plane
far = depth of far plane
```

Point is only visible if `-W` < `X,Y,Z` < `W`.

```
screenX = X / W
screenY = Y / W
screenZ = Z / W (for depth buffer)
```

If the first codition was true, then `-1` < `screenX,screenY,screenZ` < `1` is also always true. Note that the opposite is not always true (think of what happens when W is negative). 

To get a better understanding of this topic, you may read:

 - https://webglfundamentals.org/webgl/lessons/webgl-3d-perspective.html
 - https://stackoverflow.com/questions/41085117/why-does-gl-divide-gl-position-by-w-for-you-rather-than-letting-you-do-it-your

Projection matrix contains a lot of 0s, and can be simplified. As the result of simplifications it is possible to make it look closer to how it is usually done on scratch:

```
screenX = x * (2 * dist / width) / -z * (width / 2)
screenY = y * (2 * dist / height) / -z * (height / 2)

screenX = x * (2 * dist / width) * -1 * (width / 2) / z
screenY = y * (2 * dist / height) * -1 * (height / 2) / z

negative_dist = (2 * dist / width) * (width / -2) = (2 * dist / height) * (height / -2)

(2 * dist / width) = projection[1]
(2 * dist / height) = projection[6]

negative_dist = projection[1] * (width / -2) = projection[6] * (height / -2)
screenX = x * negative_dist / z
screenY = y * negative_dist / z
```

---

```scratch
(item [1] of [combined v] matrix :: #d10000)
```
combined matrix = projection matrix * inverse view matrix

---

```scratch
(position [x v] :: #d10000)
```
```scratch
(position [y v] :: #d10000)
```
```scratch
(position [z v] :: #d10000)
```
Camera position relatively to the world origin.

---

```scratch
(orientation [r v] :: #d10000)
```
```scratch
(orientation [i v] :: #d10000)
```
```scratch
(orientation [j v] :: #d10000)
```
```scratch
(orientation [k v] :: #d10000)
```
Camera orientation represented as quaternion.

---

```scratch
(hit position [x v] :: #d10000)
```
```scratch
(hit position [y v] :: #d10000)
```
```scratch
(hit position [z v] :: #d10000)
```
A ray that originates from camera in the direction the camera is facing (center of the screen) intersects the first detected real world surface. This block returns the coordinates of that intersection point.

---

```scratch
move everything by x: [0] y: [0] z: [0] :: #d10000
```
Moves the coordinate system by specified amount.

It can also be understood as switching to a new coordinate system with origin at a given location in the current coordinate system.

**Usage example:**

After starting the project, it may be a good idea to give user a way to pick location for AR content and then perform this before starting the main AR game/animation/etc.

```scratch
move everything by x: (hit position [x v] :: #d10000) y: (hit position [y v] :: #d10000) z: (hit position [z v] :: #d10000) :: #d10000
```

---

```scratch
turn everything by r: [0] i: [0] j: [0] k: [0] :: #d10000
```

Internally it also does quaternion normalization, so you don't have to worry about doing it yourself.

**Usage example:**

This script can be used to rotate `XZ` around `Y`-axis:

```scratch
turn everything by r: ([cos v] of ((angle) / [2])) i: [0] j: ([sin v] of ((angle) / [2])) k: [0] :: #d10000
```

---

```scratch
set resolution [1] :: #d10000
```

accepts values from `0.1` to `1`. changes the resolution at which the project is rendered

 - `1` - is native screen resolution
 - `0.5` - half the screen resolution
 - `0.1` - one tenth of screen resolution

Reducing resolution can improve performance and reduce memory usage.

## Examples

### Example 1

```scratch
when flag clicked
enter AR mode :: #d10000
repeat until <not <is in AR? :: #d10000>>
    clear
    point at [0.1] [0.5] [-0.3]
end

define point at (x) (y) (z)
set [X v] to ((((x) * (item [1] of [combined v] matrix :: #d10000)) + ((y) * (item [5] of [combined v] matrix :: #d10000))) + (((z) * (item [9] of [combined v] matrix :: #d10000)) + (item [13] of [combined v] matrix :: #d10000)))
set [Y v] to ((((x) * (item [2] of [combined v] matrix :: #d10000)) + ((y) * (item [6] of [combined v] matrix :: #d10000))) + (((z) * (item [10] of [combined v] matrix :: #d10000)) + (item [14] of [combined v] matrix :: #d10000)))
set [Z v] to ((((x) * (item [3] of [combined v] matrix :: #d10000)) + ((y) * (item [7] of [combined v] matrix :: #d10000))) + (((z) * (item [11] of [combined v] matrix :: #d10000)) + (item [15] of [combined v] matrix :: #d10000)))
set [W v] to ((((x) * (item [4] of [combined v] matrix :: #d10000)) + ((y) * (item [8] of [combined v] matrix :: #d10000))) + (((z) * (item [12] of [combined v] matrix :: #d10000)) + (item [16] of [combined v] matrix :: #d10000)))
if <([abs v] of (X)) < (W)> then
    if <([abs v] of (Y)) < (W)> then
        if <([abs v] of (Z)) < (W)> then
            go to x: (((X) / (W)) * ((stage width :: #d10000) / [2])) y: (((Y) / (W)) * ((stage height :: #d10000) / [2]))
            pen down
            pen up
        end
    end
end
```

### Example 2

```scratch
when flag clicked
enter AR mode :: #d10000
repeat until <not <is in AR? :: #d10000>>
    clear
    View matrix and camera coords
    point at [0.1] [0.5] [-0.3]
end

define View matrix and camera coords
set [MXX v] to (item [1] of [view v] matrix :: #d10000)
set [MXY v] to (item [5] of [view v] matrix :: #d10000)
set [MXZ v] to ([0] - (item [9] of [view v] matrix :: #d10000))
set [MYX v] to (item [2] of [view v] matrix :: #d10000)
set [MYY v] to (item [6] of [view v] matrix :: #d10000)
set [MYZ v] to ([0] - (item [10] of [view v] matrix :: #d10000))
set [MZX v] to (item [3] of [view v] matrix :: #d10000)
set [MZY v] to (item [7] of [view v] matrix :: #d10000)
set [MZZ v] to ([0] - (item [11] of [view v] matrix :: #d10000))
set [camX v] to (item [13] of [view v] matrix :: #d10000)
set [camY v] to (item [14] of [view v] matrix :: #d10000)
set [camZ v] to (item [15] of [view v] matrix :: #d10000)
set [dist v] to ((item [6] of [projection v] matrix :: #d10000) * ((stage height :: #d10000) / [2]))

define point at (x) (y) (z)
set [x2 v] to  ((x) - (camX))
set [y2 v] to  ((y) - (camY))
set [z2 v] to  ((z) - (camZ))
set [rotX v] to ((((x2) * (MXX)) + ((y2) * (MYX))) + ((z2) * (MZX)))
set [rotY v] to ((((x2) * (MXY)) + ((y2) * (MYY))) + ((z2) * (MZY)))
set [rotZ v] to ((((x2) * (MXZ)) + ((y2) * (MYZ))) + ((z2) * (MZZ)))
if <(rotZ) > [0]> then
    go to x: (((rotX) * (dist)) / (rotZ)) y: (((rotY) * (dist)) / (rotZ))
    pen down
    pen up
end
```
