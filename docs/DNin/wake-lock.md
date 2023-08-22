# Wake Lock

The Wake Lock feature allows you to keep your computer's screen on while a project is running. This can be helpful when playing media or performing an important but time-consuming task.

## Activating and Releasing Wake Lock

```scratch
set wake lock to [on v] :: #0FBD8C
```
This block will activate wake lock.

If you ever need to check that wake lock has properly been activated, use the `is wake lock active?` boolean reporter.

To release wake lock, simply change "on" to "off".

You can also insert boolean reporters into the menu input.

Wake lock will also be released automatically when the project stops or is restarted to ensure it isn't accidentally left on forever.

## Browser support

Not all browsers support wake lock (notably, Firefox does not). In these browsers requesting wake lock will not do anything.

## Note

The wake lock block takes a moment to finish running as it activates wake lock, so if you put it in a script with other blocks, it will yield briefly, so try keeping it separate from your other scripts. The `is wake lock active?` boolean reporter, however, does not have a delay.
