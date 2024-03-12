# Key Simulation

This extension allows you to simulate key presses and mouse clicks on the project.

## Press key

```scratch
press (space v) for (0.1) seconds (without waiting v) :: #BF0000
```

This will trigger "key down?" and "when key pressed" blocks. It won't type text into text fields in the editor, for example.

When `0` is used as a duration, the key will be pressed for exactly one frame.

## Click mouse

```scratch
click (left v) mouse button at x: (0) y: (0) for (0.1) seconds (without waiting v) :: #BF0000
```

This will trigger "mouse down?" and "when this sprite clicked" blocks as well as update the "mouse x" and "mouse y" blocks. It can't be used to click on buttons in the editor, for example.

When `0` is used as a duration, the button will be pressed for exactly one frame.

## Move mouse

```scratch
move mouse to x: (0) y: (0) :: #BF0000
```

This will update the values of the "mouse x" and "mouse y" block without clicking.
