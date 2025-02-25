# Box2D

This extension allows you to easily implement proper physics using a physics library called Box2D.

## World

Adjust the physics of all sprites.

```scratch
setup stage [boxed stage v] :: #0FBD8C
```
Choose a type of containment to keep sprites within the stage.

 - Boxed stage: Keeps sprites from going off the bottom and sides.
 - Open (with floor): Keeps sprites from going off the bottom.
 - Open (no floor): Removes all boundaries; sprites can go wherever they want.

---

```scratch
set gravity to x: [0] y: [-10] :: #0FBD8C
```
Change the direction and strength of gravity.

---

```scratch
step simulation :: #0FBD8C
```

Move forward in time by one step. Run this in a loop to keep the physics going.

## Sprites

Manipulate individual sprites.

```scratch
enable for [this costume v] mode [normal v] :: #0FBD8C
```

Make physics apply to this sprite. It can also collide with other sprites that have physics enabled.

 - Enable for this costume: Enable physics only for the current sprite or clone.
 - Enable for this circle: Enable physics for the current sprite or clone as if it were shaped like a circle.
 - Enable for all sprites: Enable physics for all sprites.

Precision mode will make the sprite work extra hard to make sure it doesn't overlap with anything. Note that this can decrease performance and even cause the project to get stuck, so use with care.

---

```scratch
go to x: [0] y: [0] [in world v] :: #0FBD8C
```

Make the sprite go to the specified location.

 - In world: Relative to the center of the world.
 - On stage: Relative to the center of the screen (if you've scrolled it).
 - Relative: Relative to itself.

---

```scratch
set velocity to sx: [0] sy: [0] :: #0FBD8C
```

Set the velocity (speed) of the sprite to the specified value.

You can get the velocity of the current sprite with the (x velocity) and (y velocity) reporters.

---

```scratch
push with force [25] in direction [0] :: #0FBD8C
```

Directly send the sprite flying in a certain direction, adding on to its current velocity.

---

```scratch
set angular velocity to [30] :: #0FBD8C
```
Set the angular velocity (rotational speed) of the sprite to the specified value.

You can get the angular velocity of the current sprite with the (angular velocity) reporter.

---

```scratch
spin with force [500] :: #0FBD8C
```
Directly send the sprite spinning, adding on to its current angular (rotational) velocity.

---

```scratch
set fixed [fixed in place v] :: #0FBD8C
```
Choose whether the sprite is fixed in place or can move around.

You can tell if the sprite is currently fixed in place with the (fixed?) reporter.

---

```scratch
set density [normal v] :: #0FBD8C
```
Set the sprite's density, which affects how heavy it is.

You can get the sprite's current density with the (density) reporter.

---

```scratch
set friction [normal v] :: #0FBD8C
```
Set the sprite's roughness. Smoother settings make the sprite slipperier.

You can get the sprite's current friction with the (friction) reporter.

---

```scratch
set bounce [normal v] :: #0FBD8C
```
Set the sprite's bounciness.

You can get the sprite's current bounciness with the (bounce) reporter.

---

```scratch
(touching [any v] :: #0FBD8C)
```
Returns what other sprites the sprite is touching. Also includes the edges of the stage.

If there are multiple sprites touching, it will return a comma-separated list of them.

## Screen

Move the camera around the world.

```scratch
set scroll x: [0] y: [0] :: #0FBD8C
```

Scroll to the desired location.

You can get the current screen position with the (x scroll) and (y scroll) reporters.

This will not affect the world boundaries set by the [setup stage] block.

## Example

```scratch
when flag clicked
setup stage [boxed stage v] :: #0FBD8C
set gravity to x: [0] y: [-10] :: #0FBD8C
create clone of (myself v)
repeat [20]
    step simulation :: #0FBD8C
end
create clone of (myself v)
forever
    step simulation :: #0FBD8C
end

when I start as a clone
show
enable for [this costume v] mode [normal v] :: #0FBD8C
go to x: [-150] y: [240] [in world v] :: #0FBD8C
set bounce [quite bouncy v] :: #0FBD8C
set angular velocity to [-4.1] :: #0FBD8C
```
