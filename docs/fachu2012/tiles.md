# Tiles

A simple grid-based tilemap system for 2D games. You create a grid, tell it which sprite costume represents each tile id, mark which tiles are solid, and then draw it — only the part of the map that's actually on screen gets redrawn, so it stays fast even on bigger maps.

This doesn't do animation, multiple layers, or loading maps from a file. It's just the grid + drawing part. Combine it with the **Files** extension if you want to save/load your map data, and with **List Tools** or plain lists if you want to build the map from external data.

## Basic idea

Everything is column/row based. Column 0 and row 0 are the top-left of the grid, and you can't go negative — same as most tile editors. Tile id `0` always means "empty."

```blocks
create tilemap (20) columns x (15) rows, tile size (24)
set tile (1) to costume [ground] of [Tileset]
set tile at column (5) row (5) to (1)
draw tilemap with tile (0,0) at x: (0) y: (0)
```

That's the minimum to get something on screen: a 20x15 grid, tile id `1` pointing at the "ground" costume of a sprite called "Tileset", one tile placed at column 5 row 5, then drawn.

## Blocks

**`create tilemap (columns) x (rows), tile size (px)`**
Sets up (or resets) the grid for whichever sprite/stage runs this block. Each sprite has its own independent tilemap.

**`set tile (id) to costume (name) of (sprite)`**
Registers what a tile id looks like. The sprite doesn't need to be visible, and it isn't moved or cloned — its costume is just used as a stamp. You can reuse the same tile id later to point it at a different costume.

**`set tile at column (x) row (y) to (id)`** / **`tile at column (x) row (y)`**
Read/write a single cell.

**`fill tiles from column (x1) row (y1) to column (x2) row (y2) with (id)`**
Fills a rectangular range in one go — much faster than a nested loop, since it doesn't go through the block engine per cell. Corners can be given in any order.

**`set tile (id) solid? (solid/not solid)`** / **`is solid at column (x) row (y)?`**
For collision — mark which tile ids block movement, then check a cell.

**`column at x:`** / **`row at y:`** / **`x at column:`** / **`y at row:`**
Convert between pixel coordinates and grid coordinates, using whatever tile size you set with `create tilemap`.

**`tilemap width in pixels`** / **`tilemap height in pixels`**
Useful for camera math — e.g. centering the whole map on screen, or clamping a scrolling camera so it doesn't show past the edge of the map.

**`draw tilemap with tile (0,0) at x: (x) y: (y)`**
Draws the grid. `x`/`y` is exactly where tile (0, 0) lands — there's no hidden camera inversion, so if you want tile (0,0) at the top-left of the stage, just pass the stage's top-left coordinates directly. To follow a scrolling player, pass the negative of the player's position.

**`hide tilemap`**
Hides the drawn tilemap. Calling `draw tilemap` again automatically shows it again.

## Notes

- This is unsandboxed, because drawing tiles without moving or cloning real sprites needs direct access to the renderer (the same kind of access the built-in Pen extension uses internally for `stamp`).
- The tilemap is drawn on its own private layer, completely separate from the regular Pen extension's canvas — using Pen blocks in your project won't get erased by `draw tilemap`, and vice versa.
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
- Deleting a sprite (and a clone) that had an active tilemap, to make sure it doesn't leave anything behind on stage

I used AI assistance (Claude) while building this, mainly for scaffolding the renderer-access parts and catching a couple of bugs I described from testing (a stale scale cache, and a memory leak on sprite deletion). I designed the block set and the coordinate system myself, and everything above is stuff I actually ran, not just read about.
