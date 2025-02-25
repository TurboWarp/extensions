# Window Controls

This extension provides a set of blocks that gives you greater control over the Program Window.

<strong>Note: Most of these blocks only work in Electron, Pop Ups/Web Apps containing HTML packaged projects, and normal Web Apps.</strong>

Examples include, but are not limited to: <strong>TurboWarp Desktop App, TurboWarp Web App, Pop Up/Web App windows that contain the HTML packaged project, and plain Electron.</strong>

<strong>Blocks that still work outside of these will be specified.</strong>

<hr>

<h3 id="move_window">Move Window Block <span class="heading-link">(<a href="#move_window">#</a>)</span></h3>

```scratch
move window to x: (0) y: (0) :: #359ed4
```

Moves the Program Window to the defined "x" and "y" coordinate on the screen.

<hr>

<h3 id="move_window_preset">Move Window to Preset Block <span class="heading-link">(<a href="#move_window_preset">#</a>)</span></h3>

Moves the Program Window to a preset.

The menu area has ten options, <strong>("center", "right", "left", "top", "bottom", "top right", "top left", "bottom right", "bottom left", "random position")</strong>

#### Center

```scratch
move window to the (center v) :: #359ed4
```

When choosing "center", it will move the Program Window to the center of the screen.

#### Right

```scratch
move window to the (right v) :: #359ed4
```

When choosing "right", it will move the Program Window to the right of the screen.

#### Left

```scratch
move window to the (left v) :: #359ed4
```

When choosing "left", it will move the Program Window to the left of the screen.

#### Top

```scratch
move window to the (top v) :: #359ed4
```

When choosing "top", it will move the Program Window to the top of the screen.

#### Bottom

```scratch
move window to the (bottom v) :: #359ed4
```

When choosing "bottom", it will move the Program Window to the bottom of the screen.

#### Top Right

```scratch
move window to the (top right v) :: #359ed4
```

When choosing "top right", it will move the Program Window to the top right of the screen.

#### Top Left

```scratch
move window to the (top left v) :: #359ed4
```

When choosing "top left", it will move the Program Window to the top left of the screen.

#### Bottom Right

```scratch
move window to the (bottom right v) :: #359ed4
```

When choosing "bottom right", it will move the Program Window to the bottom right of the screen.

#### Bottom Left

```scratch
move window to the (bottom left v) :: #359ed4
```

When choosing "bottom left", it will move the Program Window to the bottom left of the screen.

#### Random Position

```scratch
move window to the (random position v) :: #359ed4
```

When choosing "random position", it will move the Program Window to a random position on the screen.

<hr>

<h3 id="change_x">Change "x" Block <span class="heading-link">(<a href="#change_x">#</a>)</span></h3>

```scratch
change window x by (50) :: #359ed4
```

Dynamically changes the "x" position of the Program Window on the screen.

<hr>

<h3 id="set_x">Set "x" Block <span class="heading-link">(<a href="#set_x">#</a>)</span></h3>

```scratch
set window x to (100) :: #359ed4
```

Statically changes the "x" position of the Program Window on the screen.

<hr>

<h3 id="change_y">Change "y" Block <span class="heading-link">(<a href="#change_y">#</a>)</span></h3>

```scratch
change window y by (50) :: #359ed4
```

Dynamically changes the "y" position of the Program Window on the screen.

<hr>

<h3 id="set_y">Set "y" Block <span class="heading-link">(<a href="#set_y">#</a>)</span></h3>

```scratch
set window y to (100) :: #359ed4
```

Statically changes the "y" position of the Program Window on the screen.

<hr>

<h3 id="window_x">Window "x" Reporter <span class="heading-link">(<a href="#window_x">#</a>)</span></h3>

```scratch
(window x :: #359ed4)
```

This reporter returns the "x" position of the Program Window.

<strong>This is supported outside of Electron, Pop Ups, and Web Apps.</strong>

<hr>

<h3 id="window_y">Window "y" Reporter <span class="heading-link">(<a href="#window_y">#</a>)</span></h3>

```scratch
(window y :: #359ed4)
```

This reporter returns the "y" position of the Program Window.

<strong>This is supported outside of Electron, Pop Ups, and Web Apps.</strong>

<hr>

<h3 id="resize_window">Resize Window Block <span class="heading-link">(<a href="#resize_window">#</a>)</span></h3>

```scratch
resize window to width: (1000) height: (1000) :: #359ed4
```

Resizes the Program Window to the defined width and height values.

<hr>

<h3 id="resize_window_preset">Resize Window Preset Block <span class="heading-link">(<a href="#resize_window_preset">#</a>)</span></h3>

Resizes the Program Window to a preset.

The menu area has eight options, <strong>("480x360", "640x480", "1280x720", "1920x1080", "2560x1440", "2048x1080", "3840x2160", "7680x4320")</strong>

#### 480x360

```scratch
resize window to (480x360 v) :: #359ed4
```

When choosing "480x360", it will resize the Program Window to 480x360 (360p). The aspect ratio for this size is 4:3.

#### 640x480

```scratch
resize window to (640x480 v) :: #359ed4
```

When choosing "640x480", it will resize the Program Window to 640x480 (480p). The aspect ratio for this size is 4:3.

#### 1280x720

```scratch
resize window to (1280x720 v) :: #359ed4
```

When choosing "1280x720", it will resize the Program Window to 1280x720 (720p). The aspect ratio for this size is 16:9.

#### 1920x1080

```scratch
resize window to (1920x1080 v) :: #359ed4
```

When choosing "1920x1080", it will resize the Program Window to 1920x1080 (1080p). The aspect ratio for this size is 16:9.

#### 2560x1440

```scratch
resize window to (2560x1440 v) :: #359ed4
```

When choosing "2560x1440", it will resize the Program Window to 2560x1440 (1440p). The aspect ratio for this size is 16:9.

#### 2048x1080

```scratch
resize window to (2048x1080 v) :: #359ed4
```

When choosing "2048x1080", it will resize the Program Window to 2048x1080 (2K/1080p[Higher Pixel Rate]). The aspect ratio for this size is 1:1.77.

#### 3840x2160

```scratch
resize window to (3840x2160 v) :: #359ed4
```

When choosing "3840x2160", it will resize the Program Window to 3840x2160 (4K). The aspect ratio for this size is 1:1.9.

#### 7680x4320

```scratch
resize window to (7680x4320 v) :: #359ed4
```

When choosing "7680x4320", it will resize the Program Window to 7680x4320 (8K). The aspect ratio for this size is 16:9.

<hr>

<h3 id="change_width">Change Width Block <span class="heading-link">(<a href="#change_width">#</a>)</span></h3>

```scratch
change window width by (50) :: #359ed4
```

Dynamically changes the width of the Program Window.

<hr>

<h3 id="set_width">Set Width Block <span class="heading-link">(<a href="#set_width">#</a>)</span></h3>

```scratch
set window width to (1000) :: #359ed4
```

Statically changes the width of the Program Window.

<hr>

<h3 id="change_height">Change Height Block <span class="heading-link">(<a href="#change_height">#</a>)</span></h3>

```scratch
change window height by (50) :: #359ed4
```

Dynamically changes the height of the Program Window.

<hr>

<h3 id="set_height">Set Height Block <span class="heading-link">(<a href="#set_height">#</a>)</span></h3>

```scratch
set window height to (1000) :: #359ed4
```

Statically changes the height of the Program Window.

<hr>

<h3 id="match_stage">Match Stage Size Block <span class="heading-link">(<a href="#match_stage">#</a>)</span></h3>

```scratch
match stage size :: #359ed4
```

Resizes the Program Window to match the aspect ratio of the stage. Works best when the stage is dynamically changed.

<strong>Example: When using runtime options to change the stage size, using this block can help you adapt to the new stage size.</strong>

<strong>Try this example script in a packaged project:</strong>

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

<hr>

<h3 id="window_width">Window Width Reporter <span class="heading-link">(<a href="#window_width">#</a>)</span></h3>

```scratch
(window width :: #359ed4)
```

This reporter returns the width of the Program Window.

<strong>This is supported outside of Electron, Pop Ups, and Web Apps.</strong>

<hr>

<h3 id="window_height">Window Height Reporter <span class="heading-link">(<a href="#window_height">#</a>)</span></h3>

```scratch
(window height :: #359ed4)
```

This reporter returns the height of the Program Window.

<strong>This is supported outside of Electron, Pop Ups, and Web Apps.</strong>

<hr>

<h3 id="is_touching_edge">Is Window Touching Screen Edge Boolean <span class="heading-link">(<a href="#is_touching_edge">#</a>)</span></h3>

```scratch
<is window touching screen edge? :: #359ed4>
```

This boolean returns true or false for whether or not the Program Window is touching the screen's edge.

<strong>This is supported outside of Electron, Pop Ups, and Web Apps.</strong>

<hr>

<h3 id="screen_width">Screen Width Reporter <span class="heading-link">(<a href="#screen_width">#</a>)</span></h3>

```scratch
(screen width :: #359ed4)
```

This reporter returns the width of the Screen.

<strong>This is supported outside of Electron, Pop Ups, and Web Apps.</strong>

<hr>

<h3 id="screen_height">Screen Height Reporter <span class="heading-link">(<a href="#screen_height">#</a>)</span></h3>

```scratch
(screen height :: #359ed4)
```

This reporter returns the height of the Screen.

<strong>This is supported outside of Electron, Pop Ups, and Web Apps.</strong>

<hr>

<h3 id="is_focused">Is Window Focused Boolean <span class="heading-link">(<a href="#is_focused">#</a>)</span></h3>

```scratch
<is window focused? :: #359ed4>
```

This boolean returns true or false for whether or not the Program Window is in focus.

<strong>This is supported outside of Electron, Pop Ups, and Web Apps.</strong>

<hr>

<h3 id="set_title">Set Window Title Block <span class="heading-link">(<a href="#set_title">#</a>)</span></h3>

```scratch
set window title to ["Hello World!] :: #359ed4
```

Changes the title of the Program Window.

<strong>This is supported outside of Electron, Pop Ups, and Web Apps.</strong>

<hr>

<h3 id="window_title">Window Title Reporter <span class="heading-link">(<a href="#window_title">#</a>)</span></h3>

```scratch
(window title :: #359ed4)
```

This reporter returns the title of the Program Window.

<strong>This is supported outside of Electron, Pop Ups, and Web Apps.</strong>

<hr>

<h3 id="enter_fullscreen">Enter Fullscreen Block <span class="heading-link">(<a href="#enter_fullscreen">#</a>)</span></h3>

```scratch
enter fullscreen :: #359ed4
```

Makes the Program Window enter Fullscreen.

<strong>This is supported outside of Electron, Pop Ups, and Web Apps.</strong>

<hr>

<h3 id="exit_fullscreen">Exit Fullscreen Block <span class="heading-link">(<a href="#exit_fullscreen">#</a>)</span></h3>

```scratch
exit fullscreen :: #359ed4
```

Makes the Program Window exit Fullscreen.

<strong>This is supported outside of Electron, Pop Ups, and Web Apps.</strong>

<hr>

<h3 id="is_fullscreen">Is Window Fullscreen Boolean <span class="heading-link">(<a href="#is_fullscreen">#</a>)</span></h3>

```scratch
<is window fullscreen? :: #359ed4>
```

This boolean returns true or false for whether or not the Program Window is in fullscreen.

<strong>This is supported outside of Electron, Pop Ups, and Web Apps.</strong>

<hr>

<h3 id="close_window">Close Window Block <span class="heading-link">(<a href="#close_window">#</a>)</span></h3>

```scratch
close window :: cap :: #359ed4
```

Closes the Program Window.

<strong>This is supported outside of Electron, Pop Ups, and Web Apps.</strong>