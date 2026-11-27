# Tiles

A grid-based tilemap system for 2D games. You create a grid, tell it which sprite costume represents each tile id, mark which tiles are solid, and then draw it. Only the part of the map that's actually on screen gets redrawn, so it stays fast even on big maps, and it works without clones.

This doesn't do animation or multiple layers. It's the grid, the drawing and the collision queries, plus a way to save and load the grid as text. Combine it with the **Files** extension if you want to keep map data in a separate file, and with **List Tools** or plain lists if you want to build the map from external data.

## Getting started

The minimum to get something on screen is a grid, a costume for tile id `1`, one tile placed in the grid, and a draw:

```scratch
load tilemap from JSON file ::#5C7CFA
set tile (1) to costume [ground v] of [Tileset v] ::#5C7CFA
set tile at column (5) row (5) to (1) ::#5C7CFA
draw tilemap with tile \(0,0\) at x: (0) y: (0) ::#5C7CFA
```

This loads a tilemap from a JSON file, points tile id `1` at the "ground" costume of a sprite called "Tileset", puts that tile at column 5, row 5, and draws it. To keep the map on screen while things change, put `draw tilemap` inside a `forever` loop.

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
Open tilemap editor ::#5C7CFA
```
Opens the tilemap editor.

```scratch
load tilemap from JSON file ::#5C7CFA
```
Always opens the file picker so the user can choose a JSON tilemap file. This is useful when you want people who try your project to load their own maps. If you want the project to load a specific map instead, use `load tilemap from JSON data [TEXT]` and provide that map's JSON data.

```scratch
load tilemap from JSON data [TEXT] ::#5C7CFA
```
Loads tilemap data from a JSON string and replaces the current tilemap. The data can use the format reported by `tilemap JSON data` or exported by the tilemap editor. If the data isn't valid, nothing changes.

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

```scratch
set tile (1) attribute [wall] [add v] ::#5C7CFA
```
Adds or removes an attribute from a tile id. The attribute is shared by every cell that uses that id.

```scratch
<tile at column (0) row (0) has attribute [wall]? ::#5C7CFA>
```
Reports true if the tile in that cell has the given attribute. It reports false for empty cells and for cells outside the grid.

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

```scratch
(tile size ::#5C7CFA)
```
Reports the current tile size.

```scratch
(original tile size ::#5C7CFA)
```
Reports the tile size the map was originally saved with.

```scratch
set tile size to (24) ::#5C7CFA
```
Changes the current tile size.

### Saving and loading

```scratch
(tilemap JSON data ::#5C7CFA)
```
Reports the whole tilemap JSON data: the grid, the tile size, which costume each tile id uses, and which ids are solid. You can keep it in a variable, a list, or a file. It reports empty text if there is no tilemap yet.

```scratch
load tilemap from JSON data [TEXT] ::#5C7CFA
```
Loads JSON data made by `tilemap JSON data`, and replaces everything in the current tilemap: the grid, the tile size, the tileset and the solid tiles. If the data isn't valid, or doesn't match the size it says, nothing changes.

Loading doesn't draw anything, so call `draw tilemap` to see the new map.

#### Saving with the project

The tilemap is also stored inside the project file itself, so it's still there when you save and reopen the project. Changes are written to the project a moment (about half a second) after the last edit, rather than on every single block, to keep big maps fast. You still need to call `draw tilemap` after the project loads. The map is restored, but nothing is drawn until you ask for it.

## Examples

### Which tile is the player on?

Give each floor type its own tile id (for example, `1` for grass and `3` for lava). Draw the map at `(0, 0)`, then check the tile under the player:

```scratch
when green flag clicked
load tilemap from JSON file ::#5C7CFA
draw tilemap with tile \(0,0\) at x: (0) y: (0) ::#5C7CFA
forever
  set [tile v] to (tile at column (column at x: (x position) ::#5C7CFA) row (row at y: (y position) ::#5C7CFA) ::#5C7CFA)
  if <(tile) = [3]> then
    say [Lava!]
  end
end
```

### Stopping at solid tiles

Mark the wall tile as solid. When the player moves, check the tile at its new position. If it is solid, undo that movement:

```scratch
set tile (1) solid? [solid v] ::#5C7CFA
change x by (4)
if <is solid at column (column at x: (x position) ::#5C7CFA) row (row at y: (y position) ::#5C7CFA)? ::#5C7CFA> then
  change x by (-4)
end
```

This simple example checks the tile at the player's position.

### Keeping a map in a variable

Save the tilemap JSON data in a variable, then load it whenever you want to use that map again:

```scratch
set [saved map v] to (tilemap JSON data ::#5C7CFA)
load tilemap from JSON data (saved map) ::#5C7CFA
```
