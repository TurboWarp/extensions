# Tiles

A simple grid-based tilemap system for 2D games. You create a grid, tell it which sprite costume represents each tile id, mark which tiles are solid, and then draw it — only the part of the map that's actually on screen gets redrawn, so it stays fast even on bigger maps.

This doesn't do animation or multiple layers. It's just the grid + drawing part, plus a way to save and load the grid as text. Combine it with the **Files** extension if you want to keep map data in a separate file, and with **List Tools** or plain lists if you want to build the map from external data.

## Basic idea

Everything is column/row based. Column 0 and row 0 are the top-left of the grid, and you can't go negative — same as most tile editors. Tile id `0` always means "empty."

There is one tilemap for the whole project. Every sprite and clone sees the same one, so your player sprite can ask what tile it's standing on.

```blocks
create tilemap (20) columns x (15) rows, tile size (24)
set tile (1) to costume [ground] of [Tileset]
set tile at column (5) row (5) to (1)
draw tilemap with tile (0,0) at x: (0) y: (0)
```

That's the minimum to get something on screen: a 20x15 grid, tile id `1` pointing at the "ground" costume of a sprite called "Tileset", one tile placed at column 5 row 5, then drawn.

## Blocks

**`create tilemap (columns) x (rows), tile size (px)`**
Sets up (or resets) the tilemap. A tilemap can have up to 1,000,000 tiles in total (for example 1000 × 1000); bigger sizes are ignored.

**`draw tilemap with tile (0,0) at x: (x) y: (y)`**
Draws the grid. `x`/`y` is where the top-left corner of tile (0, 0) lands, so passing the stage's top-left corner (`-240`, `180` on a normal stage) puts the map right in the corner. There's no hidden camera inversion: a bigger `x` moves the whole map right and a bigger `y` moves it up. To follow a scrolling player, pass the negative of the player's position.

**`hide tilemap`**
Hides the drawn tilemap. Calling `draw tilemap` again automatically shows it again.

**`set tile (id) to costume (name) of (sprite)`**
Registers what a tile id looks like. Both the sprite and the costume are dropdowns (you can also drop a reporter in). The costume dropdown lists the costumes of every sprite, since a dropdown can't change based on which sprite you picked — just make sure the costume you choose actually belongs to that sprite. The sprite doesn't need to be visible, and it isn't moved or cloned — its costume is just used as a stamp. You can reuse the same tile id later to point it at a different costume. Tile costumes should have their rotation center in the middle, which is what the paint editor does by default. If you rename the sprite or the costume, the tilemap follows the new name, but the dropdown of this block keeps showing the old one, so change it there too, or the next time the block runs it will point at a name that doesn't exist anymore.

**`set tile at column (x) row (y) to (id)`** / **`tile at column (x) row (y)`**
Read/write a single cell.

**`fill tiles from column (x1) row (y1) to column (x2) row (y2) with (id)`**
Fills a rectangular range in one go — much faster than a nested loop, since it doesn't go through the block engine per cell. Corners can be given in any order.

**`set tile (id) solid? (solid/not solid)`** / **`is solid at column (x) row (y)?`**
For collision — mark which tile ids block movement, then check a cell. Empty cells (tile id `0`) are never solid.

**`column at x:`** / **`row at y:`** / **`x at column:`** / **`y at row:`**
Convert between pixel coordinates and grid coordinates, using whatever tile size you set with `create tilemap`. They work in map space, where the top-left corner of the tilemap is (0, 0), x grows to the right and y grows upward (so rows count downward). If you drew the map with `draw tilemap` at x: `X` y: `Y`, subtract `X` and `Y` from a position on the stage before converting it. `x at column` and `y at row` give the center of the tile, which is where a sprite standing on it should go.

**`tilemap width in pixels`** / **`tilemap height in pixels`**
Useful for camera math — e.g. centering the whole map on screen, or clamping a scrolling camera so it doesn't show past the edge of the map.

**`tilemap as text`**
Reports the whole tilemap (grid, tile size, which costume each tile id uses, and which ids are solid) as text, so you can keep it in a variable, a list, or a file.

**`load tilemap from text (text)`**
Loads a tilemap from text made by `tilemap as text`. If the text isn't valid, nothing changes. After loading, call `draw tilemap` to see it.

## Saving with the project

The tilemap is also stored inside the project file itself, so it's still there when you save and reopen the project. Changes are written to the project a moment (about half a second) after the last edit, rather than on every single block, to keep big maps fast. You still need to call `draw tilemap` after the project loads — the map is restored, but nothing is drawn until you ask for it.

## Notes

- This is unsandboxed, because drawing tiles without moving or cloning real sprites needs direct access to the renderer (the same kind of access the built-in Pen extension uses internally for `stamp`).
- The tilemap is drawn on its own private layer, completely separate from the regular Pen extension's canvas — using Pen blocks in your project won't get erased by `draw tilemap`, and vice versa.
- Each tile costume is stretched to fill exactly one tile (tile size × tile size), so any transparent area in the costume shows up as a gap between tiles. For tiles that should touch each other, make the artwork fill the whole costume.
- If you repaint a costume's artwork while testing, call `set tile ... to costume ...` again for that tile id so it re-measures the new size. Otherwise it can keep using the old aspect ratio.

## Testing notes

I tested this myself in the TurboWarp dev server before opening the PR, not just in theory:
- Grid create/read/write, including out-of-range and negative columns/rows (they're safely ignored, no crash)
- `fill tiles` with corners given in reverse order and with out-of-range corners
- Solid/collision checks
- All four coordinate conversion blocks
- Drawing with more than one tile id in the same map at once
- A non-square source costume getting scaled to a square tile, and re-registering the costume after repainting it
- `hide tilemap` followed by `draw tilemap` to make sure it reappears
- The sprite and costume dropdowns, including dropping a reporter into them
- `tilemap as text` and `load tilemap from text`, including loading text that isn't valid (nothing changes)
- Saving the project, reopening it, and calling `draw tilemap` to get the same map back, with the same tiles still marked solid

I used AI assistance (Claude) while building this, mainly for scaffolding the renderer-access parts and catching a bug I described from testing (a stale scale cache). I designed the block set and the coordinate system myself, and everything above is stuff I actually ran, not just read about.
