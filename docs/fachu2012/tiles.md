# Tiles

A grid-based tilemap system for 2D games. You create a grid, tell it which sprite costume represents each tile id, mark which tiles are solid, and then draw it. Only the part of the map that's actually on screen gets redrawn, so it stays fast even on big maps, and it works without clones.

This doesn't do animation or multiple layers. It's the grid, the drawing and the collision queries, plus a way to save and load the grid as text. Combine it with the **Files** extension if you want to keep map data in a separate file, and with **List Tools** or plain lists if you want to build the map from external data.

> **Note:** This extension runs unsandboxed. Drawing tiles without moving or cloning real sprites needs direct access to the renderer, the same kind of access the built-in Pen extension uses internally for `stamp`.

## Getting started

The minimum to get something on screen is a grid, a costume for tile id `1`, one tile placed in the grid, and a draw:

```blocks
create tilemap (20) columns x (15) rows, tile size (24) ::#5C7CFA
set tile (1) to costume [ground v] of [Tileset v] ::#5C7CFA
set tile at column (5) row (5) to (1) ::#5C7CFA
draw tilemap with tile (0,0) at x: (0) y: (0) ::#5C7CFA
```

That makes a 20 × 15 grid of 24-pixel tiles, points tile id `1` at the "ground" costume of a sprite called "Tileset", puts one tile at column 5, row 5, and draws it. To keep the map on screen while things change, put `draw tilemap` inside a `forever` loop.

## How it works

### The grid

Everything is column/row based. Column 0 and row 0 are the top-left of the grid, and columns and rows can't be negative, like in most tile editors. There is **one tilemap for the whole project**. Every sprite and clone sees the same one, so your player sprite can ask what tile it's standing on.

### Tile ids and the tileset

Each cell of the grid holds a whole number, the tile id. Tile id `0` always means "empty": it draws nothing and is never solid. Every other id needs a costume, which you register with `set tile (id) to costume`. An id without a costume draws nothing.

> **Important:** Don't use `0` as the id of a real tile. It is reserved for empty cells.

### Tile costumes

- Each costume is stretched to fill exactly one tile (tile size × tile size). Any transparent area in the costume shows up as a gap between tiles, so for tiles that should touch, make the artwork fill the whole costume.
- Costumes should have their rotation center in the middle, which is what the paint editor does by default.
- The sprite that owns the costume doesn't need to be visible, and it isn't moved or cloned. Its costume is only used as a stamp.

### Map space

The blocks that convert coordinates (`column at x`, `row at y`, `x at column`, `y at row`) work in **map space**. In map space the top-left corner of the tilemap is (0, 0), x grows to the right and y grows **upward**, so rows count downward:

```
 map space, tile size 24

 x:    0       24      48
 y: 0  +-------+-------+-----
       | (0,0) | (1,0) |
 y:-24 +-------+-------+-----
       | (0,1) | (1,1) |
 y:-48 +-------+-------+-----
```

`draw tilemap` places the map on the stage. If you draw it with `draw tilemap with tile (0,0) at x: X y: Y`, a point on the stage is (x - X, y - Y) in map space. Subtract `X` and `Y` from a stage position before converting it with the blocks above.

## Blocks

### Setting up

```blocks
create tilemap (20) columns x (15) rows, tile size (24) ::#5C7CFA
```
Sets up (or resets) the tilemap. Columns and rows are rounded to whole numbers, and anything below 1 counts as 1. A tilemap can have up to 1,000,000 tiles in total (for example 1000 × 1000). Bigger sizes, or `Infinity`, are ignored and leave the current tilemap as it was. The tileset and the solid tiles are kept when you create a tilemap again.

```blocks
set tile (1) to costume [costume1 v] of [Sprite1 v] ::#5C7CFA
```
Registers what a tile id looks like. Both the sprite and the costume are dropdowns, and you can also drop a reporter into them. The costume dropdown lists the costumes of every sprite, since a dropdown can't change based on which sprite you picked, so make sure the costume you choose actually belongs to that sprite. You can reuse the same tile id later to point it at a different costume.

> **Note:** If you rename the sprite or the costume, the tilemap follows the new name and saves it. The dropdown of this block keeps showing the old name, though, so change it there too, or the next time the block runs it will point at a name that doesn't exist anymore.

> **Tip:** If you repaint a costume's artwork while testing, run `set tile ... to costume ...` again for that tile id so it measures the new size. Otherwise it can keep using the old proportions.

### Editing tiles

```blocks
set tile at column (0) row (0) to (1) ::#5C7CFA
(tile at column (0) row (0)) ::#5C7CFA
```
Write and read a single cell. Cells outside the grid are ignored when writing, and read as `0`.

```blocks
fill tiles from column (0) row (0) to column (9) row (9) with (1) ::#5C7CFA
```
Fills a rectangle of cells in one go. It is much faster than a nested loop, since it doesn't go through the block engine for each cell. The two corners can be given in any order, and parts outside the grid are cut off. Filling with `0` clears the area.

### Drawing

```blocks
draw tilemap with tile (0,0) at x: (0) y: (0) ::#5C7CFA
```
Draws the tilemap. `x` and `y` are where the top-left corner of tile (0, 0) lands, so passing the stage's top-left corner (`-240`, `180` on a normal stage) puts the map right in the corner. There's no hidden camera inversion: a bigger `x` moves the whole map right and a bigger `y` moves it up. To follow a scrolling player, pass the negative of the player's map-space position, in a `forever` loop.

Only the tiles on the stage (plus one extra tile around the edges) are drawn, and the previous drawing of the tilemap is cleared each time. Nothing happens if there is no tilemap yet. The tilemap is drawn on its own private layer, behind sprites, so the regular Pen extension's canvas is never touched: using Pen blocks in your project won't get erased by `draw tilemap`, and vice versa.

```blocks
hide tilemap ::#5C7CFA
```
Hides the drawn tilemap. Calling `draw tilemap` again shows it again.

### Collision

```blocks
set tile (1) solid? [solid v] ::#5C7CFA
<is solid at column (0) row (0)? ::#5C7CFA>
```
Mark which tile ids block movement, then check a cell. Cells outside the grid and empty cells (tile id `0`) are never solid.

### Coordinates

| Block | What it reports |
|---|---|
| `column at x: (x)` | The column that contains map-space x |
| `row at y: (y)` | The row that contains map-space y |
| `x at column: (column)` | The x of the **center** of that column |
| `y at row: (row)` | The y of the **center** of that row |
| `tilemap width in pixels` | Columns × tile size |
| `tilemap height in pixels` | Rows × tile size |

```blocks
(column at x: (0)) ::#5C7CFA
(row at y: (0)) ::#5C7CFA
(x at column: (0)) ::#5C7CFA
(y at row: (0)) ::#5C7CFA
(tilemap width in pixels) ::#5C7CFA
(tilemap height in pixels) ::#5C7CFA
```
The center of the tile is where a sprite standing on it should go. The width and height are useful for camera math, for example centering the whole map on screen or keeping a scrolling camera from showing past the edge of the map. If there is no tilemap yet, every block here reports `0`.

### Saving and loading

```blocks
(tilemap as text) ::#5C7CFA
load tilemap from text [{"columns":2,"rows":1,"tileSize":24,"grid":[1,0],"tileset":[],"solid":[]}] ::#5C7CFA
```
`tilemap as text` reports the whole tilemap (grid, tile size, which costume each tile id uses, and which ids are solid) as text, so you can keep it in a variable, a list, or a file. `load tilemap from text` loads text made by `tilemap as text`, replacing the current tilemap. If the text isn't valid, or doesn't match the size it says, nothing changes. After loading, call `draw tilemap` to see it.

The tilemap is also stored inside the project file itself, so it's still there when you save and reopen the project. Changes are written to the project a moment (about half a second) after the last edit, rather than on every single block, to keep big maps fast. You still need to call `draw tilemap` after the project loads. The map is restored, but nothing is drawn until you ask for it.

## Examples

### Which tile is the player on?

Give each kind of floor its own id (for example `1` grass, `2` water, `3` lava), then read the id under the sprite. This map is drawn with its corner at the stage's top-left corner (`x: -240`, `y: 180`), so the stage position is shifted by that corner before converting:

```blocks
when green flag clicked ::#5C7CFA
create tilemap (20) columns x (15) rows, tile size (24) ::#5C7CFA
draw tilemap with tile (0,0) at x: (-240) y: (180) ::#5C7CFA
forever
set [tile v] to (tile at column (column at x: ((x position) + (240))) row (row at y: ((y position) - (180)))) ::#5C7CFA
if <(tile) = [3]> then
say [lava!]
end
end
```

### Stopping at solid tiles

Mark the ids that block movement once, then check the tile you're about to walk onto:

```blocks
set tile (1) solid? [solid v] ::#5C7CFA
change x by (4)
if <is solid at column (column at x: ((x position) + (240))) row (row at y: ((y position) - (180)))? ::#5C7CFA> then
change x by (-4)
end
```

This checks the center of the sprite. For a bigger sprite, check the corners you care about.

### Saving a map to a list

```blocks
set [saved map v] to (tilemap as text) ::#5C7CFA
load tilemap from text (saved map) ::#5C7CFA
```

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
