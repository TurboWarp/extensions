# More Control

This extension serves as a comprehensive expansion of the Control category in vanilla TurboWarp.

The extension adds a wide range of blocks with varying functionalities.

The documentation will have to cover basic concepts in JavaScript in order for you to understand fully how some of these blocks work.

# Switch/Case

Switch/Case is a concept in many programming languages to shorten those long if/else trees you might come across in scripts. You may have even seen these in other mods.

Unlike other mods the switch/case blocks in this extension works far differently; it works exactly how it does in JavaScript, which means there are some quirky behaviours that once you get used to you'll soon learn to love.

Switch/Case is formatted like this:

```scratch
switch (join [a] ()) {
case [a] {
}  :: control 
case [b] {
}  :: control 
}  :: control 
```

The **case** blocks check if the switch value matches their case. When they match, the rest of the cases below it will run, even if they don't match. This is called **fallthrough**, and is a native feature in JavaScript switch/case.

You can also have a default value, when none of the cases are matched to the switch.

```scratch
switch (join [a] ()) {
case [a] {
}  :: control 
case [b] {
}  :: control 
default {
}  :: control cap 
}  :: control 
```

This doesn't necessarily do anything that wasn't already possible before, but especially with fallthrough, it makes the following concepts a whole lot easier.

## Break and Continue

The **break switch** and **continue switch** blocks are what we use to prevent fallthrough.

Break switch will stop any and all cases after that case from running.

```scratch
switch (join [a] ()) {
case [a] {
  // [no cases after this will run] :: #e4db8c
  break switch :: control cap
}  :: control
case [b] {
}  :: control 
default {
}  :: control cap 
}  :: control 
```

You can use this to shorten what would be quite complicated scripts.
Consider the following script.

```scratch
set [switch v] to (pick random [1] to [3]) :: variables
if <(switch) = [1]> then {
  say [Hello!]
} else {
  if <(switch) = [2]> then {
    say [Hey!]
  } else {
    say [How's it going?]
  } :: control
} :: control
```

This script can be simplified with switch/case combined the **break switch** block.

```scratch
switch (pick random [1] to [3]) {
  case [1] {
    say [Hello!]
    break switch :: control cap
  }  :: control
  case [2] {
    say [Hey!]
    break switch :: control cap
  }  :: control 
  case [3] {
    say [How's it going?]
    break switch :: control cap
  }  :: control 
}  :: control 
```

**Continue switch** will stop the fallthrough from occuring but will continue to check the rest of the cases. If any of them match, the fallthrough will continue.

```scratch
switch (join [a] ()) {
case [a] {
  continue switch :: control cap
}  :: control
case [b] {
  // [this case wont run] :: #e4db8c
}  :: control 
case [a] {
  // [this case will run] :: #e4db8c
}  :: control 
}  :: control 
```

## Run next case

The **run next case** and **run next case when ()** blocks will allow you to force the very next case in the script to run, under different conditions.

**Run next case**, once run, will force the next case to run. The only exception is if it's broken by **continue switch** or **break switch** between it and the next case.

```scratch
switch (pick random [1] to [3]) {
run next case :: control
case [1] {
  // [this case will always run] :: #e4db8c
  break switch :: control cap
}  :: control
case [1] {
  // [this case will act as normal] :: #e4db8c
  break switch :: control cap
}  :: control
}  :: control 
```

The main intention for this is if you want to run a switch under a weird edge-case. A simple example is an if statement.

```scratch
switch (pick random [1] to [3]) {
if <(my variable) = [true]> then {
  run next case :: control
  break switch :: control cap
}  :: control
case [1] {
  // [this case will run when the above condition is true] :: #e4db8c
  break switch :: control cap
}  :: control
case [1] {
  // [this case will act as normal] :: #e4db8c
  break switch :: control cap
}  :: control
}  :: control 
```

**Run next case when ()** will run the next case only when the switch value match its own case. This allows for a kind of "or" statement, letting you have cases run under a variety of instances.

```scratch
switch (pick random [1] to [3]) {
run next case when [1] :: control
case [2] {
  // [this case will run when the switch is 1] :: #e4db8c
  break switch :: control cap
}  :: control
case [3] {
  // [this case will act as normal] :: #e4db8c
  break switch :: control cap
}  :: control
}  :: control 
```

# Conditionals

There are 2 extra **if** blocks within this extension.

```scratch
if <> then {

} else if <> then {

} :: control

if <> then {

} else if <> then {

} else {

} :: control
```

The likelihood of you needing a longer one for something that can't be solved with **switch/case** is very, very slim, as a double if/else is the most common (even during the **switch/case** section).

# For Loops

If you aren't familiar with how this works, I suggest look at the removed blocks of a similar nature in the "Hidden Block Collection" extension before reading further.

The for loops in this extension are unique in that they don't use any variables. They use their own, contained reporter that is accessible through the block itself.

```scratch
for (i :: control) = [1] to [10] {
} :: control
```

Drag the "i" reporter and it will create a brand new reporter to use in the script. This reporter will report the current iteration of the loop, just like the vanilla version, except not in a variable. 

The first number in the block determines its start position, and the second number determines its end position.

```scratch
for (i :: control) = [1] to [4] {
  add (i :: control) to [list v]
} :: control
```
```
list:
1
2
3
4
```

The other block iterates through the list and reports the values through the **i** block.

```scratch
for each item (i :: control) in (list v) {
  add (i :: control) to [a different list v]
} :: control
```
```
a different list:
1
2
3
4
```

# Other Loops

**Repeat for () seconds** will repeat the script contained within it until the specified duration has passed.

```scratch
repeat for [10] seconds {
  point towards (random direction v)
} :: control
```

**Repeat () or until <>** will repeat the specified number of times, or until the condition has been met.

```scratch
repeat [10] or until <key (space v) pressed?> {
  change thread var [variable] by [1] :: #FF791A
} :: control
```

The next block is strange. When the first condition is met, the loop will start and will run until the second condition is met.

```scratch
if <key (space v) pressed?> start loop {
  change [keyDown v] by [1]
} repeat until <(pick random [1] to [100]) = [1]> @loopArrow :: control
```

# Everything Else

The **start blocks** block will run the code inside it in a brand new thread, separately from the original script. It will not wait for the code to finish, instead just running the scripts below it immediately. Because it's acting like a separate script (or more appropriately, "thread"), thread-specific things will not be copied over, such as custom block parameters and thread variables if you're using the "Temporary Variables" extension.

```scratch
start blocks {
  forever {
    move [10] steps
  } :: control cap
} :: control
say [Hello!]
```

**Without screen refresh** will run the script inside of it without screen refresh, or in "warp mode", just like a custom block with the setting of the same name will try to run the definition instantaneously. As this is being written, the block does this by circumventing TurboWarp's compiler; therefore the script inside of it will not be compiled.

```scratch
without screen refresh {
  repeat [10] {
    turn @turnLeft [15] degrees
  } :: control
} :: control
repeat [10] {
  turn @turnLeft [15] degrees
} :: control
```

In this example, the **say [Hello!]** block will still run. This can be useful if you want to run 2 sets of code simultaneously within the same script.

The **restart script** block will stop the script where it is and restart it from the top, even when there isn't a hat block. In this example, clicking on the script will cause the sprite to move to the left infinitely. The script can still be stopped through all the usual means, such as the stop button and any "stop script" blocks.

```scratch
change x by [10]
restart script :: control cap
```

The **stop [target]** block will stop the selected sprite and its clones, with the exception of "myself", which will stop the sprite/clone its in exclusively.

```scratch
stop (myself v) :: control stack
```

Its cousin, **stop all targets except [target]**, will stop every single sprite and clone in the runtime except the sprite that's been specified (as well as its clones), with the exception of "myself".

```scratch
stop all targets except (stage v) :: control stack
```

The **wait [1] (frames v)** block allows you to wait the selected duration in either frames or seconds.

```scratch
wait [10] (frames v) :: control stack
wait [1] (seconds v) :: control stack
```

The **wait [1] (frames v) or until <>** block will wait until the duration has elapsed, or until the condition has been met - whichever comes first.

```scratch
when (space v) key [hit v] :: events hat
wait [3] (seconds v) or until <not <key (space v) pressed?>> :: control stack
```
