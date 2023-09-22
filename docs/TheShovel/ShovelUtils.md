# ShovelUtils

Shovel Utils is an extension focused mostly on injecting and modifying sprites and assets inside the project, as well as several other functions.

**Disclaimer: Modifying and importing assets can be dangerous, and has the potential to corrupt your project. Be careful!**

## Importing Assets

Shovel Utils offers an easy way to import several types of assets, including sprites, costumes, sounds, extensions, and even full projects.

---

**This goes for all blocks that fetch from a link: If you're experiences errors and are not able to import an asset from a link, check your console! You may be running into a CORS error. To resolve this, use a proxy like [corsproxy.io](https://corsproxy.io).**

```scratch
Import sprite from [Link or data uri here]
```

Imports a sprite into the project using a DataURI or link. Be mindful of sprite names; having two or more sprites with the same name can cause issues.

```scratch
Import image from [https://extensions.turbowarp.org/dango.png] name [Dango]
```

Imports a costume from a PNG, Bitmap, or JPEG. **Does not work with SVGS**. The costume imports into the current sprite/backdrop the user has selected.

```scratch
Import sound from [https://extensions.turbowarp.org/meow.mp3] name [Meow]
```

Imports a sound from any Scratch-compatible sound file. The sound imports into the current sprite/backdrop the user has selected.

```scratch
Import project from [https://extensions.turbowarp.org/samples/Box2D.sb3]
```

Imports a full project from a link. This project will completely replace the contents of the current one. If the project is unsandboxed, it will ask permission before swapping contents.

```scratch
Load extension from [https://extensions.turbowarp.org/utilities.js]
```

Imports any extension from a link. Extensions from the [Extension Gallery](https://extensions.turbowarp.org) can run unsandboxed, and don't require permission to import.

## Other Ways to Modify The Project

Aside from importing assets, Shovel Utils provides multiple miscellaneous features to modify and straight up delete parts of your projects.

```scratch
Set editing target to [Sprite1]
```

Sets the selected sprite in the editor. You can also set your input to "Stage" to set the selected target to the backdrop. This does work packaged, however will not have a visual effect.

```scratch
(get all sprites ::)
```

Gets the names of all the sprites (and the stage) as a JSON array. This can then be parsed using the JSON Extension.

```scratch
Restart project
```

Emulates a green flag click on a project, even if the green flag isn't present.

```scratch
Delete costume [costume1] in [Sprite1]
```

Deletes a costume from the specified sprite. If the costume doesn't exist, the block simply doesn't do anything.

```scratch
Delete sprite [Sprite1]
```

Deletes a the specified sprite. If the user has the "Sprite Deletion Confirmation" addon enabled and the project is unpackaged, it will ask permission before deleting sprites.

## Miscellaneous Features

Aside from project modification, there's several utility blocks present in Shovel Utils.

```scratch
(fps::)
```

Get the accurate FPS, or frames per second, of the current project. This is *not* the same as the "framerate limit" block from Runtime Options, as the block in Shovel Utils accounts for lag.

```scratch
(Get list [MyList])
```

Get the values of a list, exported as a JSON array. If the specified list has not been created yet, or is empty, the block will return empty.

```scratch
Set list [MyList] to [⟦1,2⟧]
```

Sets the values of lists. Accepts JSON arrays as inputs. If the specified list has not been created yet, the block simply doesn't do anything.

```scratch
(Get brightness of [ #ffffff] ::)
```

Gets the brightness of a hex value. Reports a whole number between 0 and 255. To transfer this to a value between 0 and 100 (what TurboWarp uses), divide the output of the block by 2.55 and round.
