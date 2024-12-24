# Window Controls

This extension provides a set of blocks that gives you greater control over the Program Window.

**Note: Most of these blocks only work in Electron, Pop Ups/Web Apps containing HTML packaged projects, and normal Web Apps.**

Examples include, but are not limited to: **TurboWarp Desktop App, TurboWarp Web App, Pop Up/Web App windows that contain the HTML packaged project, and plain Electron.**

**Blocks that still work outside of these will be specified.**

## Move Window Block

```scratch
move window to x: (0) y: (0) :: #359ed4
```

Moves the Program Window to the defined "x" and "y" coordinate on the screen.

## Move Window to Preset Block

Moves the Program Window to a preset.

The menu area has ten options, **("center", "right", "left", "top", "bottom", "top right", "top left", "bottom right", "bottom left", "random position")**

### Center

```scratch
move window to the (center v) :: #359ed4
```

When choosing "center", it will move the Program Window to the center of the screen.

### Right

```scratch
move window to the (right v) :: #359ed4
```

When choosing "right", it will move the Program Window to the right of the screen.

### Left

```scratch
move window to the (left v) :: #359ed4
```

When choosing "left", it will move the Program Window to the left of the screen.

### Top

```scratch
move window to the (top v) :: #359ed4
```

When choosing "top", it will move the Program Window to the top of the screen.

### Bottom

```scratch
move window to the (bottom v) :: #359ed4
```

When choosing "bottom", it will move the Program Window to the bottom of the screen.

### Top Right

```scratch
move window to the (top right v) :: #359ed4
```

When choosing "top right", it will move the Program Window to the top right of the screen.

### Top Left

```scratch
move window to the (top left v) :: #359ed4
```

When choosing "top left", it will move the Program Window to the top left of the screen.

### Bottom Right

```scratch
move window to the (bottom right v) :: #359ed4
```

When choosing "bottom right", it will move the Program Window to the bottom right of the screen.

### Bottom Left

```scratch
move window to the (bottom left v) :: #359ed4
```

When choosing "bottom left", it will move the Program Window to the bottom left of the screen.

### Random Position

```scratch
move window to the (random position v) :: #359ed4
```

When choosing "random position", it will move the Program Window to a random position on the screen.

## Change "x" Block

```scratch
change window x by (50) :: #359ed4
```

Dynamically changes the "x" position of the Program Window on the screen.

## Set "x" Block

```scratch
set window x to (100) :: #359ed4
```

Statically changes the "x" position of the Program Window on the screen.

## Change "y" Block

```scratch
change window y by (50) :: #359ed4
```

Dynamically changes the "y" position of the Program Window on the screen.

## Set "y" Block

```scratch
set window y to (100) :: #359ed4
```

Statically changes the "y" position of the Program Window on the screen.

## Window "x" Reporter

```scratch
(window x :: #359ed4)
```

This reporter returns the "x" position of the Program Window.

**This is supported outside of Electron, Pop Ups, and Web Apps.**

## Window "y" Reporter

```scratch
(window y :: #359ed4)
```

This reporter returns the "y" position of the Program Window.

**This is supported outside of Electron, Pop Ups, and Web Apps.**

## Resize Window Block

```scratch
resize window to width: (1000) height: (1000) :: #359ed4
```

Resizes the Program Window to the defined width and height values.

## Resize Window Preset Block

Resizes the Program Window to a preset.

The menu area has eight options, **("480x360", "640x480", "1280x720", "1920x1080", "2560x1440", "2048x1080", "3840x2160", "7680x4320")**

### 480x360

```scratch
resize window to (480x360 v) :: #359ed4
```

When choosing "480x360", it will resize the Program Window to 480x360 (360p). The aspect ratio for this size is 4:3.

### 640x480

```scratch
resize window to (640x480 v) :: #359ed4
```

When choosing "640x480", it will resize the Program Window to 640x480 (480p). The aspect ratio for this size is 4:3.

### 1280x720

```scratch
resize window to (1280x720 v) :: #359ed4
```

When choosing "1280x720", it will resize the Program Window to 1280x720 (720p). The aspect ratio for this size is 16:9.

### 1920x1080

```scratch
resize window to (1920x1080 v) :: #359ed4
```

When choosing "1920x1080", it will resize the Program Window to 1920x1080 (1080p). The aspect ratio for this size is 16:9.

### 2560x1440

```scratch
resize window to (2560x1440 v) :: #359ed4
```

When choosing "2560x1440", it will resize the Program Window to 2560x1440 (1440p). The aspect ratio for this size is 16:9.

### 2048x1080

```scratch
resize window to (2048x1080 v) :: #359ed4
```

When choosing "2048x1080", it will resize the Program Window to 2048x1080 (2K/1080p[Higher Pixel Rate]). The aspect ratio for this size is 1:1.77.

### 3840x2160

```scratch
resize window to (3840x2160 v) :: #359ed4
```

When choosing "3840x2160", it will resize the Program Window to 3840x2160 (4K). The aspect ratio for this size is 1:1.9.

### 7680x4320

```scratch
resize window to (7680x4320 v) :: #359ed4
```

When choosing "7680x4320", it will resize the Program Window to 7680x4320 (8K). The aspect ratio for this size is 16:9.

## Change Width Block

```scratch
change window width by (50) :: #359ed4
```

Dynamically changes the width of the Program Window.

## Set Width Block

```scratch
set window width to (1000) :: #359ed4
```

Statically changes the width of the Program Window.

## Change Height Block

```scratch
change window height by (50) :: #359ed4
```

Dynamically changes the height of the Program Window.

## Set Height Block

```scratch
set window height to (1000) :: #359ed4
```

Statically changes the height of the Program Window.

## Match Stage Size Block

```scratch
match stage size :: #359ed4
```

Resizes the Program Window to match the aspect ratio of the stage. Works best when the stage is dynamically changed.

**Example: When using runtime options to change the stage size, using this block can help you adapt to the new stage size.**

**Try this example script in a packaged project:**

```scratch
when green flag clicked
wait (1) seconds
set stage size width: (360) height: (480) :: #8c9abf
match stage size :: #359ed4
move window to the (center v) :: #359ed4
wait (1) seconds
set stage size width: (480) height: (360) :: #8c9abf
match stage size :: #359ed4
move window to the (center v) :: #359ed4
```

## Window Width Reporter

```scratch
(window width :: #359ed4)
```

This reporter returns the width of the Program Window.

**This is supported outside of Electron, Pop Ups, and Web Apps.**

## Window Height Reporter

```scratch
(window height :: #359ed4)
```

This reporter returns the height of the Program Window.

**This is supported outside of Electron, Pop Ups, and Web Apps.**

## Is Window Touching Screen Edge Boolean

```scratch
<is window touching screen edge? :: #359ed4>
```

This boolean returns true or false for whether or not the Program Window is touching the screen's edge.

**This is supported outside of Electron, Pop Ups, and Web Apps.**

## Screen Width Reporter

```scratch
(screen width :: #359ed4)
```

This reporter returns the width of the Screen.

**This is supported outside of Electron, Pop Ups, and Web Apps.**

## Screen Height Reporter

```scratch
(screen height :: #359ed4)
```

This reporter returns the height of the Screen.

**This is supported outside of Electron, Pop Ups, and Web Apps.**

## Is Window Focused Boolean

```scratch
<is window focused? :: #359ed4>
```

This boolean returns true or false for whether or not the Program Window is in focus.

**This is supported outside of Electron, Pop Ups, and Web Apps.**

## Set Window Title Block

```scratch
set window title to ["Hello World!] :: #359ed4
```

Changes the title of the Program Window.

**This is supported outside of Electron, Pop Ups, and Web Apps.**

## Window Title Reporter

```scratch
(window title :: #359ed4)
```

This reporter returns the title of the Program Window.

**This is supported outside of Electron, Pop Ups, and Web Apps.**

## Enter Fullscreen Block

```scratch
enter fullscreen :: #359ed4
```

Makes the Program Window enter Fullscreen.

**This is supported outside of Electron, Pop Ups, and Web Apps.**

## Exit Fullscreen Block

```scratch
exit fullscreen :: #359ed4
```

Makes the Program Window exit Fullscreen.

**This is supported outside of Electron, Pop Ups, and Web Apps.**

## Is Window Fullscreen Boolean

```scratch
<is window fullscreen? :: #359ed4>
```

This boolean returns true or false for whether or not the Program Window is in fullscreen.

**This is supported outside of Electron, Pop Ups, and Web Apps.**

## Close Window Block

```scratch
close window :: cap :: #359ed4
```

Closes the Program Window.

**This is supported outside of Electron, Pop Ups, and Web Apps.**
