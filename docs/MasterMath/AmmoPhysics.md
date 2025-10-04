# Ammo Physics

## Table of contents
1. [What Is Ammo Physics?](#description)
2. [Units of Measurement](#units)
3. [The Blocks](#the-blocks)
3.1. [Simulation Control](#sim-control)
3.2. [Bodies](#bodies)
3.3. [More Complex Bodies](#complex-bodies)
3.4 [Transformations](#transformations)
3.5 [Collisions](#collisions)
3.6 [Raycasting](#raycasting)
3.7 [Forces](#forces)
3.8. [Constraints](#constraints)
4. [More Resources](#more-resources)
 
## What is Ammo Physics? <a name="description"></a>
**Ammo Physics** is a high-level 3D rigid body physics extension based on [Ammo.js](https://github.com/kripken/ammo.js), a JavaScript port of the well-known Bullet Physics SDK for C++. It brings high-quality realtime physics to Turbowarp. 

## Units <a name="units"></a>
>[!IMPORTANT]
> In Ammo Physics, units matter. Proper usage of units will ensure the expected result.

**While Ammo Physics doesn't enforce specific units**, it assumes the use of **Standard International (SI)** units. As such, using especially large or small arbitrary values to match custom 3D renderers may result in unexpected behavior. So, to ensure the best experience, follow these Metric standards:
- Length/Distance/Position: meters
- Mass: kilograms
- Time: seconds
- Force: newtons
- Torque: newtons multiplied by meters (n•m)
- Rotation: degrees

Some Scratch-based 3D engines use large unitless values for scale, but because Ammo.js library uses single-precision floats, **large values can cause loss of precision, instability, or solver issues**, which result in jittery or innacurate collisions, instability (objects tunnelling through each other), and oddly behaving constraints.

Generally speaking, **values in between 0.01-1000 are safe**. If you must scale outside SI units, make sure to scale units proportionally and consistently to avoid unexpected behavior.

## The Blocks <a name="the-blocks"></a>
### Simulation Control <a name="sim-control"></a>
```scratch
reset world :: #0fbd8c
```
This block removes all rigid bodies, rays, and constraints from the world and resets the gravity. This function is automatically called when pressing the green flag, even if it isn't present.

```scratch
step simulation :: #0fbd8c
```

This block increases the physics simulation by one step forward in time. You should put it in your game loop or tick event. It implicitly takes the deltatime, max sub steps, and current target framerate. The higher the framerate, the higher quality your physics simulation will be.

```scratch
set max substeps (10) :: #0fbd8c
```

This block sets the max substeps of the physics simulation. This can help in complicated simulations as it computes extra physics steps per frame if necessary. By default, the physics world loads with 10 max sub steps.
If your project's deltatime is higher than your target framerate, simulation substeps are used to account for the loss in quality. For example: 
- Your project's target framerate is 60 FPS.
- Your project is lagging a bit, so your delta time might be running at 33ms instead of 16ms, so you need at least 2 substeps per frame to account for the loss in simulation quality.

Note the term "max" sub steps: It will automatically compute the substeps necessary without exceeding that value. In most scenarios, increasing max substeps will not provide a noticable increase in quality, it only helps when your delta time is higher than your FPS (e.g., you're lagging).

```scratch
set gravity to x: (0) y: (-9.81) z: (0) :: #0fbd8c
```

This sets the world's gravity in meters per second squared. By default, it matches earth's approximate gravity.

### Bodies <a name="bodies"></a>
>[!TIP]
> You can set the mass of any body to 0 to make it static, not reacting to any forces (including gravity) while retaining collision. This is useful for things like the ground or your level geometry (game map).

```scratch
(all bodies :: #0fbd8c)
```
This block returns the name of every existing body in a comma-delimited list.

```scratch
create box body with name: [body] mass: (5) size: (1) (1) (1) :: #0fbd8c
```
This creates a box-shaped body with the specified name, mass, and XYZ size in meters.

```scratch
create sphere body with name: [body] mass: (5) radius: (0.5) :: #0fbd8c
```
Creates a sphere-shaped body with the specified name, mass, and radius in meters. A 0.5 radius sphere is the same as a 1m diameter sphere.

```scratch
create cylinder body with name: [body] mass: (5) radius: (0.5) height: (1) :: #0fbd8c
```
Creates a cylinder body with the specified, name, mass, radius, and height.

```scratch
create cone body with name: [body] mass: (5) radius: (0.5) height: (1) :: #0fbd8c
```
Creates a cone body with the specified, name, mass, radius, and height.

```scratch
create capsule body with name: [body] mass: (5) radius: (0.5) height: (1) :: #0fbd8c
```
Creates a capsule body with the specified, name, mass, radius, and height. This body is great for using as your player's hitbox!

>[!TIP]
> Bodies support **safe replacement**, meaning that when you create a new object with the same name as an already existing object, it will override the new object safely. This can be strategically used to change a body's properties later, but beware of optimization.
### Complex Bodies <a name="complex-bodies"></a>

```scratch
create convex hull body with name: [body] mass: (5) from vertices: [select a list v] :: #0fbd8c
```
This block is special. It will generate a convex hull body from a list of vertices.

Convex hulls are great when you want a triangle mesh to have more detailed collision than a box or sphere but prioritize performance. They don't have concave collisions and encapsulate the set of vertices in the simplest possible shape that covers the volume of the object without concave faces.

The list of vertices must be in a specific format: each list item should contain one vertex, or three space-delimited coordinates. For example, the starting lines for a Suzanne monkey might look like this:
```
0.437500 0.164062 0.765625
-0.437500 0.164062 0.765625
0.500000 0.093750 0.687500
-0.500000 0.093750 0.687500
0.546875 0.054688 0.578125
```
... and so on. Of course, this list has been generated, but your vertex positions might look simpler.

**For convex hulls, the vertex arrangement doesn't matter since it generates the hull from the mesh automatically.**

```scratch
create [static v] mesh body with name: [body] mass: (5) from vertices: [select a list v] faces: [select a list v] :: #0fbd8c
```
This block is more special: it allows you to have **fully concave triangle mesh bodies**.
It requires:

1. A space-delimited list of vertex coordinates as demonstrated above, but in a specific order.
2. A space-delimited list of vertex indices for triangulated faces.

Before importing your meshes into lists, you must triangulate the mesh so that there are only three vertices per face. Attempting to load a non-triangulated mesh will fail and log an error.
For example, the corresponding face list to the Suzzane vertex list above looks like this:
```
47 3 45
4 48 46
45 5 43
6 46 44
3 7 5
```
**Notice two crucial facts about this list**:
1. There are no more than three values per item. This means that there are only three vertices per face.
2. These values aren't coordinates; they correspond to the items in the vertex list that form a triangle (they're vertex indicies).

Incorrect face data will reference incorrect vertex indicies, leading the solver to parse the mesh incorrectly. **You must be careful**. 

Additionally, you may notice there are **two types of triangle meshes**:
1. Static
2. Dynamic

Static triangle meshes can't move and are bounding-volume-heirarchy accelerated. This means they are much more performant for static geometry like your level terrain or map, but they can't move or react to forces. **It does not support triangle-triangle interaction,** but is significantly faster for raycasting and convex hulls. Therefore, dynamic triangle meshes won't be able to collide triangle-to-triangle with BVH static meshes.

Dynamic triangle meshes are special: they support **deformable and/or moving concave meshes**. They also support **triangle-to-triangle collision with other dynamic triangle meshes**. However:

>[!WARNING]
> Dynamic triangle meshes are computationally expensive and should only be used where necessary. As a fallback, consider using a static BVH mesh or convex hull if concave dynamic triangle collision isn't absolutely required for your simulation.

```scratch
create compound shape with name: [shape] :: #0fbd8c
```

This block allows you to create a compound shape. It's a special kind of shape that can have child shapes added to it to make complex kinds of bodies, for example a chair comprised of multiple boxes with different sizes and offsets.

You can add as many child shapes as you like, and configure their offset relative to the origin of the body and their rotation, allowing you to create many varieties of unique shapes.

```scratch
create rigid body from compound shape [shape] with mass: (5) :: #0fbd8c
```
At first, this block may seem confusing -- after all, you might wonder why it's needed if you already created your compound shape. But for the physics engine to recognize it and add it to the world, you have to realize the compound **shape** into an actual **rigid body**. **Once a compound shape has been realized, you cannot edit its geometry.** This is for optimization purposes.

```scratch
set [friction v] of body [body] to (0.5) :: #0fbd8c
```
This block allows you to set a body's physical material properties. A float from 0 to 1 is accepted as a value.

Friction 0 means entirely frictionless (for example, something like ice should have a friction of ~0.02). The default is 0.5. This type of friction is linear or sliding friction. More complex materials that have differing types of friction in different directions (e.g., ice skates have 0 friction forward but 1 friction side to side) or rolling friction aren't yet supported but may be upon enough user request.

By default bounciness (elasticity/restitution) is 0, so if you want a body to be bouncy you have to increase it. You might wonder why your body isn't more bouncy after you increase it:  **you also have to increase the bounciness of the of the reacting/colliding object (for example the ground) to see an effect.**

```scratch
set gravity of body [body] to x: (0) y: (0) z: (0) :: #0fbd8c
```
This block is interesting because it lets you specify custom gravity for each body. It overrides the world's gravity only for the specified body. It's especially useful for unique gameplay scenarios.

```scratch
delete body [body] :: #0fbd8c
```
It's pretty self-explanatory. Removed entirely from the physics world, never to be seen again.

### Transformations <a name="transformations"></a>

```scratch
set [position v] of body [body] to x: (0) y: (0) z: (0) :: #0fbd8c
```
Sets the position or rotation of the body to the specified values.

```scratch
change [position v] of body [body] by x: (0) y: (0) z: (0) :: #0fbd8c
```
Changes the position or rotation of the body by the specified values.

```scratch
([x v] [position v] of body [body] :: #0fbd8c)
```
Returns the X, Y, or Z position or rotation of the specified body. Most commonly used when plugging into your 3D renderer.

>[!IMPORTANT]
> You may notice why there's no option for adjusting the scaling of bodies in this transformations section. That's because "scale" is really vague. It varies based on the type of geometry and bodies can't be scaled non-uniformly by the physics engine in the backend. If you want to adjust a body's geometry, you can re-create it and make use of safe object replacement.

### Collisions <a name="collisions"></a>
```scratch
[enable v] collision response for body [body] :: #0fbd8c
```
This block allows you to control whether a body responds to collision forces. By default, all bodies have collision, but you can disable it. Bodies won't collide with others, but they'll react to external forces like gravity and manual pushes and retain collision detection. This opens up endless possibilities. For instance, you could create an invisible block that doesn't collide with other bodies solely for collision detection, like a “trigger volume” in other game engines, for example when a player enters a certain area.

```scratch
<is body [body] touching body [body 2]? :: #0fbd8c>
```
Fairly self-explanatory. If a the specified body is touching another specified body, the reporter returns true.

```scratch
<is body [body] touching any body? :: #0fbd8c>
```
Returns true if the specified body is touching any other body.

```scratch
(get all bodies touching [body] :: #0fbd8c)
```
Returns all bodies touching the specified body in a comma-delimited string.

### Raycasting <a name="raycasting"></a>
```scratch
cast ray with name [ray] from x: (0) y: (0) z: (0) to x: (7) y: (15) z: (12) :: #0fbd8c
```
This block fires a ray with the specified name from point A to point B.

```scratch
cast ray with name [ray] from x: (0) y: (0) z: (0) with rotation x: (7) y: (15) z: (12) distance: (5) :: #0fbd8c
```
This block fires a ray with the specified name. Unlike the block above, it accepts a starting point and a **rotation in degrees**, and will move along that rotation until it hits a body or reaches the max distance.

```scratch
cast ray with name [ray] from x: (0) y: (0) z: (0) towards coordinate x: (7) y: (15) z: (12) distance: (5) :: #0fbd8c
```
This type of ray is fired from the given starting point towards another coordinate until it hits a body or reaches the max distance.

```scratch
(hit [x v] [position v] of ray [ray] :: #0fbd8c)
```
If the specified ray has hit a body, then position returns the X, Y, or Z hit point and normal returns the X, Y, or Z surface normal (direction, not rotation) of the hit point.

If the specified ray has _not_ hit a body, then position returns the X, Y, or Z end point of the ray and normal returns null.


```scratch
<ray [ray] is touching body [body]? :: #0fbd8c>
```
Returns whether the specified ray is touching the specified body.

```scratch
delete ray [ray] :: #0fbd8c
```
This block removes a ray from the world.

>[!IMPORTANT]
> You should **ALWAYS** delete a ray when you're done with it to ensure proper memory management and optimization.

### Forces <a name="forces"></a>
Forces are interesting and helpful as they allow you to control a body's movement manually and realistically without simply setting transformations.

Before we get started, let's define a few terms:
**Force**: A force applied to a body over a period of time (every simulation step). E.g., an aircraft's thrust.
**Impulse**: A force applied to a body immediately, such as the firing of a bullet or the jumping of a character.
**Torque**: A rotational force that applies pure rotational force around the center of mass.

Forces have a meter offset from the body's origin and so can apply rotational velocity **from that point**. If the offset is zero, no rotational velocity will result. For example, if you push an object at it's top while the bottom stays stationary, it will rotate to account for that motion. Generally speaking, higher offset values result in more rotational velocity.

```scratch
push body [body] with [force v] x: (1) y: (1) z: (1) newtons with offset x: (0) y: (0.25) z: (0) meters :: #0fbd8c
```
Pushes the specified body with a force or impulse of the given XYZ strength in newtons with the given XYZ offset in meters. May result in both linear and angular velocity.

```scratch
push body [body] with central [force v] x: (1) y: (1) z: (1) newtons :: #0fbd8c
```
Pushes the specified body with a force or impulse with the given XYZ strength in newtons. Only results in linear velocity. 
>[!TIP]
> Using this block with a capsule body is a great way to set up basic player movement!

```scratch
push body [body] with torque x: (1) y: (1) z: (1) :: #0fbd8c
```
Pushes the specified body with the given XYZ rotational torque in newton-meters. Only results in rotational velocity.

### Constraints <a name="constraints"></a>

Constraints not supported:
- Cone Twist Constraint: a ragdoll-joint like constraint, not available due to complexity
- Generic 6DOF Constraint: a entirely manually setup constraint that provides full control of the behavior, not available due to complexity.

Either of these may be implemented if enough users request them.

## More Resources <a name="more-resources"></a>

**Work in Progress, coming soon**