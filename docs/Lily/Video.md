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
start video [my video] at [0] seconds :: #557882
```

Starts playing the specified video from the given time, in seconds.

If the video is already playing, playback restarts from the specified position.

---

```scratch
start video [my video] at [0] seconds and wait until done:: #557882
```

Starts playing the specified video from the given time, in seconds, and waits until playback finishes.

If the video is already playing, playback restarts from the specified position before waiting for it to finish.

---

```scratch
([current time v] of video [my video] :: #557882)
```

Reports the selected property of the specified video.

**Available properties:**
- current time -- Current playback position, in seconds
- duration -- Total length of the video, in seconds
- volume -- Current volume, from 0 to 100
- width -- Native width, in pixels
- height -- Native height, in pixels
- playback rate -- Current playback speed (1 is normal speed)

---

```scratch
(screenshot of video [my video] at current time :: #557882)
```

Reports a Data.URI containing an image of the video's current frame.

The returned value can be used anywhere a URL/Data.URI image is accepted, such as the Skins extension.

---

```scratch
pause video [my video] :: #557882
```

Pauses playback of the specified video.

---

```scratch
resume video [my video] :: #557882
```

Resumes playback of the specified video. If the video is already playing, this block has no effect.

---

```scratch
set video [my video] to [loop v] :: #557882
```

Toggles wether the specified video should loop or not.

---

```scratch
<video [my video] is (playing v) ? :: #557882>
```

Reports the selected property of the specified video.

**Available properties:**
- playing -- True if the video is actively playing
- paused -- True if the video is paused
- looping -- True if the video will loop

---

```scratch
set volume of video [my video] to [100] :: #557882
```

Sets the volume of the specified video.

The volume value ranges from `0` (muted) to `100` (maximum volume).

---

```scratch
set playback rate of video [my video] to [2] :: #557882
```

Changes the playback speed of the specified video.

A value of `1` is the normal playback speed. Values above `1` make the video play faster, while values below `1` make it play slower.

Values less than `0` will do nothing.

