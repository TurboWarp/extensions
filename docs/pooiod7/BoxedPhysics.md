# Boxed Physics

Boxed Physics is an extension for Scratch 3 that allows you to add 2D physics simulations to your Scratch projects. 
This documentation will guide you through the process of using Boxed Physics.

## Startup & world options
When using the Boxed Physics extension, you always need to initialise the environment when starting the project. to do this, you can use the `Init World, scale 1m: [SCALE]  gravity: [GRAVITY]  scene: [SCENE]` block.

```scratch3
Init World, scale 1m: [50]  gravity: [-10]  scene: [boxed stage] :: #2cb0c0
```

Scene is the type of containment to keep objects within the stage:
 - boxed stage: Keeps sprites from going off the bottom and sides.
 - closed stage: Keeps sprites from going off the bottom, sides, or top.
 - opened stage: Keeps sprites from going off the bottom.
 - nothing: Removes all walls so objects can go wherever they want.
 - stage: a depricated option that is the same as boxed stage.

You can move forward in time using the step simulation block. Run this in a loop to keep the physics going.

```scratch3
Step Simulation :: #2cb0c0
```

This next block lets you set the physics options. You usually won't need to use this block.
```scratch3
Set physics Position Iterations: (10) Velocity Iterations: (10) Continuous Physics: <true :: #5EC15D> Warm Starting: <true :: #5EC15D> :: #2cb0c0
```

You can also set the speed of the world with the set slow motion block.
```scratch3
Set slow motion to (30) :: #2cb0c0
```
You can also get the slow motion value with the get slow motion block.
```scratch3
(Slow motion :: #2cb0c0)
```

## Making objects

Making objects requires that you define an object first, so running this does nothing on its own.

```scratch3
Create Body [box] at x: (0)  y: (0)  dir: (90) :: #2cb0c0
```

Define an object type first, then the object itself. Now, you can place it in the world. <br>
You can do the steps in any order, just Create the object body last.

```scratch3
when green flag clicked
Dеfine Type [Dynamic v]  Density (1)  Friction (0.5)  Bounce (0.2) :: #2cb0c0
Dеfine Polygon, points: [0 50   40 -50   -40 -50] :: #2cb0c0
Create Body [box] at x: (0)y: (0)  dir: (90) :: #2cb0c0
```

## Defining types

Types allow you to make objects with spesific properties.

```scratch3
Dеfine Type [Dynamic v]  Density (1)  Friction (0.5)  Bounce (0.2) :: #2cb0c0
```

## Making a box

Making a box is simple, just define the box, then create the body.

```scratch3
Dеfine Box, width: (100) height: (100) :: #2cb0c0
Create Body [box] at x: (0)  y: (0)  dir: (90) :: #2cb0c0
```

## Making a circle

Making a circle is just as simple, Use the code from the box, and replace it with the circle making block.

```scratch3
Dеfine Circle, redius: (100) :: #2cb0c0
Create Body [box] at x: (0)  y: (0)  dir: (90) :: #2cb0c0
```

## Making pollygons

Thare are two ways of making a pollygon object. You can eather use the `Define pollygon as this costume` block, or the `Define Polygon, points: [POINTS]` block.

`Define pollygon as this costume` lets you use the costume of a sprite to make a pollygon, while
`Define Polygon, points: [POINTS]` lets you defide a pollygon manually.

```scratch3
Dеfine pollygon as this costume :: #2cb0c0
Create Body [box] at x: (0)  y: (0)  dir: (90) :: #2cb0c0
```
```scratch3
Dеfine Polygon, points: [0 50   40 -50   -40 -50] :: #2cb0c0
Create Body [box] at x: (0)  y: (0)  dir: (90) :: #2cb0c0
```

Every point in a pollygon is seperated by 3 spaces. Every point has only one space from x to y.

## Destroying objects

You can destroy an object by simply providing its name into the destroy block.

```scratch3
Destroy object [Object] :: #2cb0c0
```

## Updating collision

You can make objects not collide with eachother using collision groups.

The objects in here will be in their own no-collide group, and will collide with everything else.
```scratch3
Disable collision between [Object1 Object2] :: #2cb0c0
```

You can also remove no-collide tags from objects

```scratch3
Reset collision of objects [Object1 Object2] :: #2cb0c0
```

## Damping

You can set the damping or the rotational damping of an object.

```scratch3
Set [damping v] of object [Object] to (0.1) :: #2cb0c0
```

## Moving objects

Thare are a two ways to move your objects. you can push them, or you can set their movement directly.

You can push your objects using inpulses, or World Impulses.
```scratch3
Apply [Impulse v] to object [Object] at x: (0)  y: (0)  power: (500)  dir: (90) :: #2cb0c0
Apply Angular Impulse to object [Object] power: (-70) :: #2cb0c0
```

You can also set the velocity of an object directly, or remove it entirely.
```scratch3
Set Velocity of [Object] to x (-2) y (5) dir (-10) :: #2cb0c0
```
```scratch3
Clear velocity of object [Object] :: #2cb0c0
```

While I'm at it, I might as well mention these blocks
```scratch3
Move object [Object] to x (0) y (0) :: #2cb0c0
```
```scratch3
Set rotation of object [Object] to (90) :: #2cb0c0
```

## Object attributes

You can get the attributes of any object using the `(get [thing] from [object])` block.

```scratch3
(Get [Direction v] from [Object] :: #2cb0c0)
```

You can get the following from an object:
- X
- Y
- Direction
- X velocity
- Y velocity
- Directional velocity
- Is awake?

You can also get the object at any position with this:
```scratch3
Get object at x: (0)  y: (0) :: #2cb0c0
```

## Making joints

Joints are another thing built into Boxed Physics. Just like objects, they need to be defined before you can place them. 
```scratch3
Create Joint [Joint] of type [Rotating v] between [Object1] at (0) (0) and [Object2] at (0) (0) :: #2cb0c0
```
Thare are Rotating, Spring, Weld, Slider, and Mouse jonts built into Boxed Physics, but more are on the way. <br>
Thare are only two joints that need extra info to define them, being springs and sliders.

## Making a spring

Springs are made of three values: Length, Damping, and Frequency.
```scratch3
Dеfine Spring, Length: (100)  Damping: (0.7)  Freq: (5) :: #2cb0c0
```

## Making a slider

Sliders are another type of joint is a slider joint. Sliders are made with a direction, lower stop, and an upper stop.
```scratch3
Dеfine Slider, Angle: (90) Lower stop: (-100) Upper stop: (100) :: #2cb0c0
```

## Editing joints

You can edit joints using the `Set [attr] of [joint]` block to set attributes of joints. 
```scratch3
Set [Max Torque v] of joint [Joint] to (0) :: #2cb0c0
```
You can set the following:
 - Motor On
 - Motor Speed
 - Max Torque
 - Limits On
 - Lower Limit
 - Upper 

Getting joint attributes is just as easy.
```scratch3
Get [Motor Speed v] of joint: [Joint] :: #2cb0c0
```

You can also delete joints.
```scratch3
Destroy Joint [Joint] :: #2cb0c0
```

If you made a mouse joint, you can edit the target position with this block.
```scratch3
Set Mouse Joint Target [Joint] to x: (0)  y: (0) :: #2cb0c0
```

## Simple example code

```scratch3
when green flag clicked
Init World, scale 1m: [50]  gravity: [-10]  scene: [boxed stage] :: #2cb0c0
Dеfine Type [Dynamic v]  Density (1)  Friction (0.5)  Bounce (0.2) :: #2cb0c0
Dеfine Polygon, points: [0 50   40 -50   -40 -50] :: #2cb0c0
Create Body [tri] at x: (0)y: (0)  dir: (90) :: #2cb0c0
Set Velocity of [tri] to x (-2) y (5) dir (-10) :: #2cb0c0
forever
  step simulation :: #2cb0c0
  go to x: (Get [x v] from [tri] :: #2cb0c0) y: (Get [y v] from [tri] :: #2cb0c0)
  point in direction (Get [Direction v] from [tri] :: #2cb0c0)
end
```
