# Skins

This extension allows you to load and display images onto sprites, as Skins.

In this extension, a "Skin" is an image that can replace what a sprite looks like. 

Unlike costumes, Skins are not loaded when the project is opened. Instead, Skins are loaded with blocks as the project is running.

## Loading Skins

Skins can be created in 3 different ways. Each way requires you to give the skin a name, which will be used by other blocks to reference the skin later.

Loading a skin with the same name as another skin will overwrite the data of that skin. Any sprite that was using this skin will now show the new skin.

---

```scratch
create SVG skin [<svg />] as [my skin] :: #6b56ff
```
The first way is by creating a new skin with SVG markup data. The advantage to this is that it loads much quicker than the other loading blocks. The obvious disadvantage is that, unlike the other 2 blocks, it can only work with SVGs.

---

```scratch
load skin from (costume 1 v) as [my skin] :: #6b56ff
```
The second way is by loading a skin from a costume.

It's important to note that this block will require the Advanced Option "Remove raw asset data after loading to save RAM" to be disabled in the packager in order for this block to work correctly in a packaged environment. **You do not need to do this within the editor.**

If you intend to package your project, we don't encourage using this block for that reason. **None of the other blocks in this extension require this option to be disabled.**

---

```scratch
load skin from URL [https://...] as [my skin] :: #6b56ff
```
The final way is loading a skin through a URL. This block allows you to load any bitmap image as well as SVGs.

```scratch
load skin from URL (snapshot stage :: #9966ff) as [my skin] :: #6b56ff
```
While this block can work with a website URL, it's primarily designed to work with data URIs. Try using this with the "snapshot stage" block from the "Looks Plus" extension.

For the final 2 blocks, the block will pause the script for a moment in order to load the skin. Treat them like "wait" blocks in your scripts, don't expect them to finish instantaneously.

## Using Skins

```scratch
set skin of (myself v) to [my skin] :: #6b56ff
```
Skins can be applied to a sprite with this block, so long as you loaded the skin beforehand. Skins can be applied to multiple sprites/clones.

Using the "myself" option will apply the skin to the sprite the block is running in: if the block is running in a clone, it will apply the skin to the clone. **Do not confuse "myself" with the sprite's name.**

Skins will automatically be removed from every sprite when the project has stopped.

---

```scratch
restore skin of (myself v) :: #6b56ff
```
You can remove the skin of a sprite with the "restore skin" block. This will remove the skin from that specific sprite.

---

```scratch
restore targets with skin [my skin] :: #6b56ff
```
You can remove a skin from every sprite that has it applied with the "restore targets with skin" block. "Target" refers to "sprite" in this context.

## Deleting Skins

Skins that have been loaded will still exist after the project has stopped. In order to truly delete a skin, you have 2 methods.

---

```scratch
delete skin [my skin] :: #6b56ff
```
Delete a specified skin, and reset any sprite that had it applied.

---

```scratch
delete all skins :: #6b56ff
```
Delete every skin that has been loaded and reset all sprites that had any skin applied.

## Other Blocks

```scratch
<skin [my skin] is loaded? :: #6b56ff>
```
Check whether a skin is actually loaded. This becomes true **after** the block has finished loading the skin.

---

```scratch
((width v) of [my skin] :: #6b56ff)
```
Get the width/height of a skin. The values are rounded.

---

```scratch
(current skin of (myself v) :: #6b56ff)
```
The name of the skin that is applied to the specified sprite.