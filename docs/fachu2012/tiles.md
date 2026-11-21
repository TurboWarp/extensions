# Tiles

A grid-based tilemap system for 2D games. You create a grid, tell it which sprite costume represents each tile id, mark which tiles are solid, and then draw it. Only the part of the map that's actually on screen gets redrawn, so it stays fast even on big maps, and it works without clones.

This doesn't do animation or multiple layers. It's the grid, the drawing and the collision queries, plus a way to save and load the grid as text. Combine it with the **Files** extension if you want to keep map data in a separate file, and with **List Tools** or plain lists if you want to build the map from external data.

## Getting started

The minimum to get something on screen is a grid, a costume for tile id `1`, one tile placed in the grid, and a draw:

```scratch
create tilemap (20) columns x (15) rows, tile size (24) ::#5C7CFA
set tile (1) to costume [ground v] of [Tileset v] ::#5C7CFA
set tile at column (5) row (5) to (1) ::#5C7CFA
draw tilemap with tile \(0,0\) at x: (0) y: (0) ::#5C7CFA
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

The blocks that convert coordinates (`column at x`, `row at y`, `x at column`, `y at row`) work in **map space**. In map space the top-left corner of the tilemap is (0, 0), x grows to the right and y grows **upward**, so rows count downward. With a tile size of 24, the first tiles cover:

- Column 0, row 0: x from 0 to 24, y from 0 down to -24
- Column 1, row 0: x from 24 to 48, y from 0 down to -24
- Column 0, row 1: x from 0 to 24, y from -24 down to -48
- Column 1, row 1: x from 24 to 48, y from -24 down to -48

`draw tilemap` places the map on the stage. If you draw it with `draw tilemap with tile (0,0) at x: X y: Y`, a point on the stage is (x - X, y - Y) in map space. Subtract `X` and `Y` from a stage position before converting it with the blocks above.

## Blocks

Every block works the same from any sprite, clone or the Stage, because there is only one tilemap. The blocks are listed in the same order as in the palette.

### Creating and drawing

```scratch
create tilemap (20) columns x (15) rows, tile size (24) ::#5C7CFA
```
Sets up the tilemap. Columns and rows are rounded to whole numbers, and anything below 1 counts as 1. A tilemap can have up to 1,000,000 tiles in total (for example 1000 × 1000). Bigger sizes, or `Infinity`, are ignored and leave the current tilemap as it was.

Running it again empties every tile. The tileset (which costume each tile id uses) and the solid tiles are kept.

```scratch
draw tilemap with tile \(0,0\) at x: (0) y: (0) ::#5C7CFA
```
Draws the tilemap. `x` and `y` are where the top-left corner of tile (0, 0) lands, so passing the stage's top-left corner (`-240`, `180` on a normal stage) puts the map right in the corner. There's no hidden camera inversion: a bigger `x` moves the whole map right and a bigger `y` moves it up. To follow a scrolling player, pass the negative of the player's map-space position, in a `forever` loop.

Only the tiles on the stage (plus one extra tile around the edges) are drawn. Tiles whose id has no costume, or whose sprite or costume doesn't exist anymore, are skipped. If there is no tilemap yet, nothing happens. If the tilemap was hidden with `hide tilemap`, this block shows it again.

> **Important:** Every `draw tilemap` clears what the previous one drew, so you can call it again with a new position to move or scroll the map. The tilemap is drawn on its own private layer behind the sprites, so the regular Pen extension's canvas is never touched: using Pen blocks in your project won't get erased by `draw tilemap`, and vice versa.

```scratch
hide tilemap ::#5C7CFA
```
Hides the drawn tilemap. It only hides the drawing: the tiles are still there, so the blocks that read the map keep working while it's hidden. `draw tilemap` shows it again.

If the tilemap was never drawn, this block does nothing.

### Editing tiles

```scratch
set tile (1) to costume [costume1 v] of [Sprite1 v] ::#5C7CFA
```
Tells the tilemap what a tile id looks like. Both the sprite and the costume are dropdowns, and you can also drop a reporter into them. The id is rounded to a whole number. Running the block again with the same id points it at a different costume.

The costume dropdown lists the costumes of every sprite, since a dropdown can't change based on which sprite you picked, so make sure the costume you choose actually belongs to that sprite.

> **Note:** If you rename the sprite or the costume, the tilemap follows the new name and saves it. The dropdown of this block keeps showing the old name, though, so change it there too, or the next time the block runs it will point at a name that doesn't exist anymore.

> **Tip:** If you repaint a costume's artwork while testing, run `set tile ... to costume ...` again for that tile id so it measures the new size. Otherwise it can keep using the old proportions.

```scratch
set tile at column (0) row (0) to (1) ::#5C7CFA
```
Puts a tile id in one cell. Use `0` to clear the cell. Cells outside the grid are ignored.

The id doesn't have to have a costume yet. The cell keeps the id, and it starts to show up as soon as the id gets a costume.

```scratch
(tile at column (0) row (0) ::#5C7CFA)
```
Reports the tile id in that cell, not the name of its costume. Empty cells and cells outside the grid report `0`.

```scratch
fill tiles from column (0) row (0) to column (9) row (9) with (1) ::#5C7CFA
```
Works like `set tile at column row to`, but for a whole rectangle of cells at once. It is much faster than a nested loop, since it doesn't go through the block engine for each cell.

The two corners can be given in any order, and any part of the rectangle outside the grid is cut off. Filling with `0` clears the area.

### Collision

```scratch
set tile (1) solid? [solid v] ::#5C7CFA
```
Marks a tile **id** as solid or not solid, so every cell that has that id changes together. It is the id that is marked, not a single cell.

Tile id `0` is empty and can't be made solid, so using it here does nothing.

```scratch
<is solid at column (0) row (0)? ::#5C7CFA>
```
Reports true if the tile id in that cell is marked as solid. It reports false for empty cells and for cells outside the grid.

### Coordinates

The first four blocks work in **map space**, explained in the Map space section above. If there is no tilemap yet, every block in this section reports `0`.

```scratch
(column at x: (0) ::#5C7CFA)
```
Reports the column that contains the map-space x. Positions to the left of the map give negative columns, and positions past the right edge give columns bigger than the grid. Those are still just numbers, and `tile at column row` reports `0` for them.

```scratch
(row at y: (0) ::#5C7CFA)
```
Reports the row that contains the map-space y. Since rows count downward, a y below the top of the map gives a bigger row.

```scratch
(x at column: (0) ::#5C7CFA)
```
Reports the x of the **center** of the column, which is where a sprite standing on a tile of that column should go.

```scratch
(y at row: (0) ::#5C7CFA)
```
Reports the y of the **center** of the row.

```scratch
(tilemap width in pixels ::#5C7CFA)
```
Reports the width of the whole tilemap: columns × tile size.

```scratch
(tilemap height in pixels ::#5C7CFA)
```
Reports the height of the whole tilemap: rows × tile size. Together with the width, it is useful for camera math, for example centering the whole map on screen or keeping a scrolling camera from showing past the edge of the map.

### Saving and loading

```scratch
(tilemap as text ::#5C7CFA)
```
Reports the whole tilemap as text: the grid, the tile size, which costume each tile id uses, and which ids are solid. You can keep it in a variable, a list, or a file. It reports empty text if there is no tilemap yet.

```scratch
load tilemap from text [map text] ::#5C7CFA
```
Loads text made by `tilemap as text`, and replaces everything in the current tilemap: the grid, the tile size, the tileset and the solid tiles. If the text isn't valid, or doesn't match the size it says, nothing changes.

Loading doesn't draw anything, so call `draw tilemap` to see the new map.

#### Saving with the project

The tilemap is also stored inside the project file itself, so it's still there when you save and reopen the project. Changes are written to the project a moment (about half a second) after the last edit, rather than on every single block, to keep big maps fast. You still need to call `draw tilemap` after the project loads. The map is restored, but nothing is drawn until you ask for it.

## Examples

### Which tile is the player on?

Give each kind of floor its own id (for example `1` grass, `2` water, `3` lava), then read the id under the sprite. This map is drawn with its corner at the stage's top-left corner (`x: -240`, `y: 180`), so the stage position is shifted by that corner before converting:

```scratch
when green flag clicked
create tilemap (20) columns x (15) rows, tile size (24) ::#5C7CFA
draw tilemap with tile \(0,0\) at x: (-240) y: (180) ::#5C7CFA
forever
  set [tile v] to (tile at column (column at x: ((x position) + (240)) ::#5C7CFA) row (row at y: ((y position) - (180)) ::#5C7CFA) ::#5C7CFA)
  if <(tile) = [3]> then
    say [lava!]
  end
end
```

### Stopping at solid tiles

Mark the ids that block movement once, then check the tile you're about to walk onto:

```scratch
set tile (1) solid? [solid v] ::#5C7CFA
change x by (4)
if <is solid at column (column at x: ((x position) + (240)) ::#5C7CFA) row (row at y: ((y position) - (180)) ::#5C7CFA)? ::#5C7CFA> then
  change x by (-4)
end
```

This checks the center of the sprite. For a bigger sprite, check the corners you care about.

### Keeping a map in a variable

```scratch
set [saved map v] to (tilemap as text ::#5C7CFA)
load tilemap from text (saved map) ::#5C7CFA
```
