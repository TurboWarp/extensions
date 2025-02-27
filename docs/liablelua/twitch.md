# Twitch

This extension allows easy access to twitch chat and custom overlays!

Use with Sheep_maker's Utility extension for True and False blocks. (I was told it was unnecessary to add into my project.)

## Twitch Chat

Show your twitch chat live!

```scratch
setup chat [xQc] chat fade enabled [30] show bots <true :: #772CE8> prevent clipping <false :: #772CE8> width (1) height (1) position [static v] :: #772CE8
```

Setup your twitch chat! You can customize your chat fade, you can choose if you want bots or to prevent clipping (if you're channel is big DON'T TURN ON PREVENT CLIPPING!!) width and height 1 is 50% (regular 50% doesn't work for some reason) and you change which mode the position is in, based on CSS class "position."

```scratch
close chat :: #772CE8
```

Makes chat disappear/uncast from the screen.

## Overlays

Epic overlays for your twitch stream!

```scratch
create text overlay with text [hi chat] with italic <false :: #772CE8> with bold <false :: #772CE8> with size (20) with font [Sans Serif v] :: #772CE8
```

Creates a text overlay with any selected text, you can customize its Font Weight and Size, you can also load in a custom font by loading it into the Costume Editor!

```scratch
create image overlay with image [https://tekinical.github.io/twitchURI.png] with width (50) with height (50) with position [static v] is bottom <true :: #772CE8> is top <false :: #772CE8> :: #772CE8
```

Creates a image overlay with any image from any link, with width and height! You can customize the position like with chat and change if its on the bottom or top! (Left and right may become an option in the future!)

```scratch
close chat :: #772CE8
```

Make the text disappear!

```scratch
close image :: #772CE8
```

Make the image disappear!

## Example Code:

```scratch
when flag clicked
create text overlay with text [Speedrunning: Appel!] with italic <false :: #772CE8> with bold <false :: #772CE8> with size (20) with font [Pixel v] :: #772CE8
setup chat [xQc] chat fade enabled [30] show bots <true :: #772CE8> prevent clipping <false :: #772CE8> width (1) height (1) position [static v] :: #772CE8
```

Result:

![image](https://github.com/Tekinical/extensions/assets/140775902/b14f4dd3-706c-4058-b957-863e9718676e)
