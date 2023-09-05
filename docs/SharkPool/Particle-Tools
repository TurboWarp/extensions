# Particle Tools

This extension contains numerous tools that make creating particle engines easy!

To use this extension properly, you will need to use clones. 

## The Basics

The way this extension works is by making and storing an ID for a clone to use. The ID contains an x and y velocity that the host can use to change its posiion by.

All values are customizable; you can even apply forces like gravity to your particles!

---
## ID Blocks

```scratch
generate new particle ID with velocity x [5] and y [8] :: #0090ff
```
This Block creates a new ID number with the inputted x and y velocity. In this case, the x velocity is 5 and the y velocity is 8.

---

```scratch
replace particle ID [2] with velocity x [5] and y [8] :: #0090ff
```
This Block replaces the inputted ID number with the inputted x and y velocity.

If the inputted ID doesnt exist, it will simply create a new ID automatically with the inputted values.

---

```scratch
delete all particle IDs:: #0090ff
```
This Block deletes *all* stored IDs and their values.

---

```scratch
delete particle ID [5] :: #0090ff
```
This Block deletes the inputted ID and its values.

---

```scratch
(particle ID: [5] (all v):: #0090ff)
```
This Block reports the specified values of the inputted ID.

For example, I made an ID with the ID set to **5**, x velocity set to **3**, and y velocity set to **8**.
Depending on what you set the dropdown to (__left column__), the Block will report different values (__right column__):

| Left columns  | Right columns |
| ------------- |:-------------:|
| all      | {"ID":"5","X Velocity":"3","Y Velocity":"8"} |
| x velocity     | 3 |
| y velocity      | 8 |

#### Note: Setting the dropdown to 'all' will output a JSON...

---

```scratch
(number of particle IDs :: #0090ff)
```
This Block reports the number of all existing ID's.

---

## Velocity Randomizer


```scratch
(pick random [1] to [10] precision (on v) :: #0090ff)
```
This Block generates a random number from input one (1) to input two (10). Setting precision mode to 'on' will make the Block generate a number with decimals.

This block is meant to go into the ID generation blocks. You can technically use a pick random block instead.

**Example:**
```scratch
generate new particle ID with velocity x (pick random [-9] to [9] precision (on v) :: #0090ff) and y (pick random [10] to [20] precision (off v) :: #0090ff) :: #0090ff
```
This will make a new ID with the x velocity set to a **random precise number** from -9 to 9 and the y velocity set to a **random number** from 10 to 20.

---

## Gravity and Force

```scratch
set gravity to [9.8] :: #0090ff
```
This Block will set the gravity force.

---

```scratch
(current gravity :: #0090ff)
```
This Block reports the current gravity.

---

```scratch
update (x velocity v) with gravity for particle ID:[3]:: #0090ff
```
This Block updates the **x, y, or both velocities** of an inputted ID with the current gravity force.

This adds a cool gravitational effect with your particles!

---

```scratch
update (y velocity v)  with force [2.5] for particle ID:[3]:: #0090ff
```
This Block updates the **x, y, or both velocities** of an inputted ID with an inputted force.

This also adds a cool gravitational effect with your particles!

---

## Basic Example Usage:

Creating Clones Loop:
```scratch
when green flag clicked
forever
generate new particle ID with velocity x (pick random [-9] to [9] precision (on v) :: #0090ff) and y (pick random [10] to [20] precision (off v) :: #0090ff) :: #0090ff
create clone of (myself v)
```

Particle Clones Loop
```scratch
when I start as a clone // Without Gravity
set [Clone ID v] to (number of particle IDs :: #0090ff) //The Variable Should be Sprite-Only
repeat (20)
...
change x by (particle ID: (Clone ID) (x velocity v):: #0090ff)
change y by (particle ID: (Clone ID) (y velocity v):: #0090ff)
...
end
delete this clone

when I start as a clone // With Gravity
set [Clone ID v] to (number of particle IDs :: #0090ff) //The Variable Should be Sprite-Only
repeat (20)
...
change x by (particle ID: (Clone ID) (x velocity v):: #0090ff)
change y by (particle ID: (Clone ID) (y velocity v):: #0090ff)
update (y velocity v) with gravity for particle ID:(Clone ID):: #0090ff
...
end
delete this clone
```
