# Twitch

This extension allows easy access to twitch chat and custom overlays!

## Twitch Chat

Show your twitch chat live!

```scratch
setup chat [streamer] chat fade enabled (int/30) show bots <t/f> prevent clipping <t/f> width (int) height (int) position [pos]
```

Setup your twitch chat! You can customize your chat fade, you can choose if you want bots or to prevent clipping (if your channel is big DON'T TURN ON PREVENT CLIPPING!!) width and height 1 is 50% (regular 50% doesn't work for some reason) and you change which mode the position is in, based on CSS class [position](https://developer.mozilla.org/en-US/docs/Web/CSS/position).

```scratch
close chat
```

Makes chat disappear/uncast from the screen.

## Overlays

Epic overlays for your twitch stream!

```scratch
create text overlay with text [text] with italic <t/f> with bold <t/f> with size (int) with font [font]
```

Creates a text overlay with any selected text, you can customize its Font Weight and Size, you can also load in a custom font by loading it into the Costume Editor!

```scratch
create image overlay with image [src] with width (int) with height (int) with position [pos] is bottom <t/f> is top <t/f>
```

Creates a image overlay with any image from any link, with width and height! You can customize the position like with chat and change if its on the bottom or top! (Left and right may become an option in the future!)

```scratch
close chat
```

Make the text disappear!

```scratch
close image
```

Make the image disappear!

## Example Code:

```scratch
when flag clicked
create text overlay with text [Speedrunning: Appel!] with italic <false> with bold <false> with size (20) with font [Pixel]
setup chat [xQc] chat fade enabled [30] show bots <true> prevent clipping <false> width (1) height (1) position [static]
```