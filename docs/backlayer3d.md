# BackLayer 3D

BackLayer 3D is an extension that renders 3D objects behind every Scratch sprite. You can create basic shapes, load textures and 3D models, and use a camera, lights, fog, collision detection, and simple physics.

> [!IMPORTANT]
> This extension must run unsandboxed. Load it from the TurboWarp extension gallery, or when loading it as a custom extension, select "Run without sandbox".

## Getting started

At minimum, create an object and start drawing. The default camera is at `(0, 0, 10)` facing the negative Z direction. New objects are created at the origin `(0, 0, 0)`.

```scratch
when flag clicked
reset all :: #5B5FEF
Create object [box] :: #5B5FEF
Set color of object [box] to [#5B5FEF] :: #5B5FEF
Start drawing :: #5B5FEF
```

3D coordinates work as follows:

- **X**: Left and right. Positive values move right.
- **Y**: Up and down. Positive values move up.
- **Z**: Depth. With the default camera, larger values are closer to the camera.
- Rotation is measured in **degrees**.
- Scale is measured in **percent**, where `100` is the original size.

## Objects

```scratch
Create object [box] :: #5B5FEF
```

Creates a white cube with the given name. If an object with the same name already exists, it is replaced with a new cube.

---

```scratch
Remove object [box] :: #5B5FEF
```

Deletes the specified object. Any light attached to that object is also removed.

---

```scratch
reset all :: #5B5FEF
```

Removes all objects and lights, resets the camera to its initial position, and turns RTX shadows off. Drawing and fog settings are not changed.

## Textures and models

```scratch
Set texture of object [box] to [costume1] :: #5B5FEF
```

Looks up the costume with the given name in the sprite that runs this block, and applies it as the object's texture.

---

```scratch
Load texture for object [box] from URL [https://example.com/test.png] :: #5B5FEF
```

Loads a texture from an image URL. Access to the URL must be permitted. Some servers may block the request depending on their configuration.

---

```scratch
Set model of object [box] from list [list1] :: #5B5FEF
```

Replaces the shape of the specified object using a model stored in a list. Position, rotation, scale, pass-through, and physics settings are preserved.

Supported data:

- **OBJ**: Put each line of the OBJ file into the list.
- **glTF JSON**: Put each line of the glTF text into the list.
- **GLB / binary glTF**: Put each byte of the file into the list as a number from `0` to `255`.

> [!NOTE]
> OBJ files that reference external MTL files, or glTF files that reference external images, may not load completely with this block alone. GLB with embedded textures is the easiest format to use.

## Position

```scratch
Set position of object [box] to x [0] y [0] z [0] :: #5B5FEF
```

Sets the X, Y, and Z coordinates of the object at once.

```scratch
Set x position of object [box] to [0] :: #5B5FEF
Set y position of object [box] to [0] :: #5B5FEF
Set z position of object [box] to [0] :: #5B5FEF
```

Sets each axis position individually.

```scratch
Change x position of object [box] by [1] :: #5B5FEF
Change y position of object [box] by [1] :: #5B5FEF
Change z position of object [box] by [1] :: #5B5FEF
```

Changes each axis position by the given amount.

## Rotation

```scratch
Set rotation of object [box] to x [0] y [0] z [0] :: #5B5FEF
```

Sets the X, Y, and Z rotation angles at once.

```scratch
Set x rotation of object [box] to [0] :: #5B5FEF
Set y rotation of object [box] to [0] :: #5B5FEF
Set z rotation of object [box] to [0] :: #5B5FEF
```

Sets each axis rotation individually.

### Rotate on local axes

```scratch
Rotate object [box] around its local x axis by [1] degrees :: #5B5FEF
Rotate object [box] around its local y axis by [1] degrees :: #5B5FEF
Rotate object [box] around its local z axis by [1] degrees :: #5B5FEF
```

Rotates around axes relative to the object's own orientation. For example, after an object turns sideways, "local z axis" still refers to that object's own forward/backward direction.

### Rotate on world axes

```scratch
Rotate object [box] around world x axis by [1] degrees (not relative to object orientation) :: #5B5FEF
Rotate object [box] around world y axis by [1] degrees (not relative to object orientation) :: #5B5FEF
Rotate object [box] around world z axis by [1] degrees (not relative to object orientation) :: #5B5FEF
```

Rotates around axes of the 3D space itself, unaffected by the object's own orientation.

## Scale

```scratch
Set scale of object [box] to x [100] y [100] z [100] (%) :: #5B5FEF
```

Sets the X, Y, and Z scale at once. `100` is the original size and `200` is double.

```scratch
Set x scale of object [box] to [100] (%) :: #5B5FEF
Set y scale of object [box] to [100] (%) :: #5B5FEF
Set z scale of object [box] to [100] (%) :: #5B5FEF
```

Sets each axis scale individually.

```scratch
Change x scale of object [box] by [10] (%) :: #5B5FEF
Change y scale of object [box] by [10] (%) :: #5B5FEF
Change z scale of object [box] by [10] (%) :: #5B5FEF
```

Changes each axis scale by the given percentage points.

## Movement and direction

```scratch
Move object [box] forward by [10] steps :: #5B5FEF
```

Moves the object forward in the direction it is facing. `10 steps` equals `1` unit in 3D space.

---

```scratch
Move object [box] toward x [0] y [0] z [0] by [10] steps :: #5B5FEF
```

Moves toward the given coordinates. This block does not change the object's orientation.

---

```scratch
Point object [box] toward object [target] :: #5B5FEF
```

Points the object toward another specified object.

---

```scratch
Point object [box] toward x [0] y [0] z [0] :: #5B5FEF
```

Points the object toward the given coordinates.

---

```scratch
Glide object [box] to x [0] y [0] z [0] in [1] seconds :: #5B5FEF
```

Moves in a straight line to the coordinates over the given number of seconds. If the seconds value is `0` or less, it moves instantly.

## Camera

```scratch
Make object [camera] the view camera :: #5B5FEF
```

Uses the position and orientation of the specified object as the camera. After this, moving or rotating the object also moves the view.

```scratch
when flag clicked
reset all :: #5B5FEF
Create object [camera] :: #5B5FEF
Set position of object [camera] to x [0] y [2] z [10] :: #5B5FEF
Make object [camera] the view camera :: #5B5FEF
Create object [box] :: #5B5FEF
Start drawing :: #5B5FEF
```

## Color, opacity, and reflectivity

```scratch
Set color of object [box] to [#ffffff] :: #5B5FEF
```

Sets the color of all materials that make up the object.

---

```scratch
Set opacity of object [box] to [0] % :: #5B5FEF
```

Sets the opacity. With this block, `0` is fully opaque and `100` is fully transparent.

> [!CAUTION]
> The block is named opacity, but the input value actually behaves as "transparency".

---

```scratch
Set reflectivity of object [box] to [1] :: #5B5FEF
```

Sets the reflectivity from `0` to `1`. Values outside this range are clamped automatically. Higher values give a more metallic and smooth appearance.

## Collision and simple physics

Collision detection uses an axis-aligned bounding box around each object. Because of this, complex shapes may register a collision earlier than their visual outline suggests.

```scratch
Set pass-through of object [box] to [on v] :: #5B5FEF
```

When set to `on`, the object is excluded from collision detection and physics collisions.

---

```scratch
Set physics of object [box] to [on v] :: #5B5FEF
```

When set to `on`, gravity of `-9.8` is applied to the object along the negative Y axis. When it touches another non-pass-through object, it is pushed back along the vertical axis.

> [!NOTE]
> This is a lightweight simple physics simulation. Rotation, friction, mass, and movement along slopes are not calculated.

---

```scratch
Bounce object [box] if it touches another object :: #5B5FEF
```

If the object is touching another object, it is pushed slightly away along the axis with the greatest overlap. This is not a typical velocity-reversing "bounce".

---

```scratch
<Object [box] is touching object [target] :: #5B5FEF>
```

Returns `true` when the two objects are touching and neither is pass-through.

## Drawing

```scratch
Start drawing :: #5B5FEF
```

Starts continuous rendering of the 3D scene. The 3D scene is displayed behind all Scratch sprites.

---

```scratch
Stop drawing :: #5B5FEF
```

Stops drawing and clears the 3D display on the stage. Existing objects are not deleted, so running `Start drawing` again will show them.

---

```scratch
<Is drawing now? :: #5B5FEF>
```

Returns `true` if currently drawing.

> [!NOTE]
> Pressing "stop all" also stops drawing.

## Fog

```scratch
Set fog distance to [100] :: #5B5FEF
```

Sets the distance at which fog fully hides objects. The minimum is `1`. Fog gradually thickens starting at distance `1` from the camera.

```scratch
Set fog color to [#ffffff] :: #5B5FEF
```

Sets the color of the fog.

```scratch
Set fog to [on v] :: #5B5FEF
```

Turns fog on or off.

## Lights and shadows

The scene starts with a white ambient light. Additional lights act as point lights.

```scratch
Set object [light] as a light [on v] :: #5B5FEF
```

Adds a point light at the same position as the specified object. Moving the object also moves the light. Setting it to `off` removes only the light.

```scratch
Set light intensity of object [light] to [10] :: #5B5FEF
```

Changes the brightness of the light attached to the specified object.

```scratch
Set light color of object [light] to [#ffffff] :: #5B5FEF
```

Changes the color of the light attached to the specified object.

```scratch
Set RTX shadows to [on v] :: #5B5FEF
```

Enables casting and receiving shadows for all objects and lights, and softens the shadows.

> [!NOTE]
> Despite the "RTX" name, this uses WebGL shadow maps, not ray tracing. Enabling it may reduce performance.

## Reporter blocks

### Position

```scratch
(Object [box] x position :: #5B5FEF)
(Object [box] y position :: #5B5FEF)
(Object [box] z position :: #5B5FEF)
```

Returns the position of the specified object on each axis. Returns `0` if the object does not exist.

### Rotation

```scratch
(Object [box] x rotation :: #5B5FEF)
(Object [box] y rotation :: #5B5FEF)
(Object [box] z rotation :: #5B5FEF)
```

Returns the rotation angle of the specified object on each axis in degrees. Returns `0` if the object does not exist.

### Scale

```scratch
(Object [box] x scale (%) :: #5B5FEF)
(Object [box] y scale (%) :: #5B5FEF)
(Object [box] z scale (%) :: #5B5FEF)
```

Returns the scale of the specified object on each axis as a percentage. Returns `0` if the object does not exist.

### Distance

```scratch
(Distance from object [box] to object [target] :: #5B5FEF)
```

Returns the straight-line distance between the centers of two objects. Returns `0` if either object does not exist.

## Example: rotating cube

```scratch
when flag clicked
reset all :: #5B5FEF
Create object [box] :: #5B5FEF
Set color of object [box] to [#5B5FEF] :: #5B5FEF
Set rotation of object [box] to x [20] y [30] z [0] :: #5B5FEF
Start drawing :: #5B5FEF
forever
 Rotate object [box] around its local y axis by [1] degrees :: #5B5FEF
end
```

## Example: object falling onto a floor

```scratch
when flag clicked
reset all :: #5B5FEF
Create object [floor] :: #5B5FEF
Set position of object [floor] to x [0] y [-3] z [0] :: #5B5FEF
Set scale of object [floor] to x [800] y [100] z [800] (%) :: #5B5FEF
Create object [box] :: #5B5FEF
Set position of object [box] to x [0] y [3] z [0] :: #5B5FEF
Set physics of object [box] to [on v] :: #5B5FEF
Start drawing :: #5B5FEF
```

## Limitations

- The 3D scene is only drawn behind Scratch sprites. 3D objects cannot be displayed in front of sprites.
- This extension loads Three.js from the internet, so an internet connection is required on first load.
- Drawing is not possible when WebGL is unavailable or the WebGL context has been lost.
- Large numbers of models, lights, shadows, and high-resolution textures may reduce performance.
- Invalid color inputs are treated as white (`#ffffff`).
- Operation blocks that reference a non-existent object name do nothing.

BackLayer 3D version 1.3.0 · nofileteams · MIT License
