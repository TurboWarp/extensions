# Video

This extension allows you to load and display videos onto sprites.

Unlike costumes, videos are temporary. As in, they are not loaded when the project is opened. Instead, videos are loaded with blocks as the project is running.

## Video Management

```scratch
load video from URL [https://extensions.turbowarp.org/dango.mp4] as [my video] :: #557882
```

Videos can be imported using this block.

The URL input must point **directly** to the video file (for example, a URL ending in .mp4, .webm, or another supported video format). Data.URIs are supported.

The extension supports any video format that your browser's standard `<video>` element can play.

You must also provide a name for the video. This name is used by other blocks to identify and reference the imported video.
Importing a video with the same name as another will overwrite the data of that video. Any sprite that was using this video will now show the new one.

---

```scratch
delete video [my video] ::#557882
```

This block will delete the referenced video.

After a video is deleted, it can no longer be referenced by other blocks. Any sprites currently displaying the deleted video will stop using it.

---

```scratch
(loaded videos :: #557882)
```

This reporter will output an array of the names of all imported videos.

---

```scratch
show video [my video] on (myself v) :: #557882
```

Displays the specified video on the selected sprite.

If the sprite is already showing a video, it will be replaced with the new one.

---

```scratch
stop showing video on (myself v) :: #557882
```

Stops displaying a video on the selected sprite and switches back to its original image.

This only removes the video from the _sprite_. The video remains loaded in the extension and can be shown again later.

---

```scratch
(current video on (myself v) :: #557882)
```

Reports the name of the video currently being displayed on the selected sprite.

If no video is displayed, this block will return an empty value.

## Video Playback

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
((width v) of skin [my skin] :: #6b56ff)
```
Get the width/height of a skin. The values are rounded.

---

```scratch
(current skin of (myself v) :: #6b56ff)
```
The name of the skin that is applied to the specified sprite.
