# Mouse Speed
This extension lets you get the speed of the mouse.

## "mouse speed"
```scratch
mouse speed :: #38c3e5 reporter
```
This block constantly returns the speed of the mouse
## "is mouse faster than ()?"
```scratch
is mouse faster than ()? :: #38c3e5 boolean
```
This block checks if the mouse speed is greater than the value. In other terms, if the mouse is faster than the value.

## Usage:

Basic Example:
```scratch
when green flag clicked
forever
if <is mouse faster than (50)? :: #38c3e5> then // checks if mouse faster than value
say[ouch, that hurts!]
else
say(mouse speed :: #38c3e5) //otherwise, returns mouse speed
```

Swiping Example:
```scratch
define explode
... // insert code here
change [score v] by [1]
delete this clone

when green flag clicked
set [score v] to [0]
forever
wait[5] seconds
create clone of [myself v]

when i start as a clone // simple code
point in direction(pick random [-180] to [180])
forever
move [5] steps
if on edge, bounce
if <<touching [mouse pointer v] > and <is mouse faster than (50)? :: #38c3e5>> then // checks if mouse faster than value
Explode
```

