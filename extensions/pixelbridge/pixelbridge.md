# PixelBridge

Convert PNG Data URLs to pixel arrays and reconstruct images from arrays.  
Enables **pixel-level image manipulation** directly inside Scratch/TurboWarp projects — no external tools required.

---

## Blocks

### `PNG [URL] to pixel array`
Decodes a PNG Data URL and returns a **JSON array** of 24-bit RGB integers.

| Position | Value | Example |
|---|---|---|
| `[0]` | Dimensions header `"WxH"` | `"320x240"` |
| `[1…]` | One integer per pixel `(R<<16)\|(G<<8)\|B` | `16711680` = red |

**Returns** `[]` if the URL is invalid or the image cannot be loaded.

---

### `array [ARRAY] width [W] height [H] to PNG`
Encodes a JSON array of 24-bit RGB integers back into a PNG Data URL.

- Accepts arrays **with or without** the `"WxH"` header produced by the block above.
- If the header is present and `W`/`H` are both `0`, dimensions are read automatically — handy for a lossless round-trip.
- **Returns** an empty string if the array is too short or dimensions are invalid.

---

### `dimensions of PNG [URL]`
Returns the width and height of a PNG Data URL as `"width height"` (space-separated).  
**Returns** `"0 0"` on error.

---

## Pixel format

All pixel values are **24-bit unsigned integers** (RGB, no alpha):

```
color = (R << 16) | (G << 8) | B
```

| Color | Integer | Hex |
|---|---|---|
| Red | `16711680` | `0xFF0000` |
| Green | `65280` | `0x00FF00` |
| Blue | `255` | `0x0000FF` |
| White | `16777215` | `0xFFFFFF` |
| Black | `0` | `0x000000` |

> **Note:** The alpha channel of the source image is ignored. All reconstructed pixels are fully opaque.

---

## Example usage

### Read pixels from a costume

```
set [dataURL v] to (costume [costume1 v] as [png data url v])  ── using the Looks extension
set [pixels v] to (PNG (dataURL) to pixel array)
set [width v]  to (item (1 v) of (pixels) split by [ v])       ── parse "WxH" header
```

### Modify and rebuild

```
// Change pixel at index 42 to pure red
replace item (43 v) of [pixels v] with [16711680]              ── index 1 = header, so pixel N is at N+1

set [newImage v] to (array (pixels) width [0] height [0] to PNG)
switch costume to (newImage)
```

### Create a solid-color image from scratch

```
// Build a 4×4 red image
set [arr v] to []
repeat (16)
  add [16711680] to [arr v]
end
set [png v] to (array (arr) width [4] height [4] to PNG)
```

---

## Notes

- Large images (e.g. 480×360 = 172 800 pixels) produce large JSON strings. Consider downscaling images before processing if performance matters.
- The `"WxH"` header is only added by the **PNG to array** block. Manually built arrays do not have it — always provide `W` and `H` explicitly in that case.
- This extension uses the browser's built-in Canvas API and requires no network access.
