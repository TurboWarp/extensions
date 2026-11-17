// Name: Tiles
// ID: tiles
// Description: Create, draw, and query grid-based tile maps for 2D games.
// By: pro2012Fachu <https://scratch.mit.edu/users/pro2012Fachu/>
// License: MPL-2.0

(function (Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Tiles must run unsandboxed.');
  }

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  // Largest grid that create tilemap will make (for example 1000 x 1000).
  const MAX_TILES = 1000000;

  const OFFSTAGE_X = 1e6;
  const OFFSTAGE_Y = 1e6;
  // Direction 90 is "facing right", so stamped tiles are never rotated.
  const NO_ROTATION_DIRECTION = 90;
  const STORAGE_FLUSH_DELAY_MS = 500;

  // The one tilemap of the project, shared by every sprite and clone.
  // Tile (column, row) is grid[row * columns + column], and 0 means empty.
  const state = {
    columns: 0,
    rows: 0,
    tileSize: 1,
    grid: new Int32Array(0),
    // tile id -> { targetName, costumeName, sprite, costume }. The sprite and
    // costume objects survive renames, so the names can be kept up to date.
    tileset: new Map(),
    solidIds: new Set(),
    // skinId -> [scaleX%, scaleY%] that fits that skin to one tile
    scaleCache: new Map()
  };

  // Renderer objects used to draw the tilemap on its own pen skin, so the
  // regular Pen extension's canvas is never touched. They're created the first
  // time the tilemap is drawn and reused after that.
  const render = {
    penSkinId: null,
    penDrawableId: null,
    stampDrawableId: null
  };

  function resetState() {
    state.columns = 0;
    state.rows = 0;
    state.tileSize = 1;
    state.grid = new Int32Array(0);
    state.tileset.clear();
    state.solidIds.clear();
    state.scaleCache.clear();
  }

  function indexFor(column, row) {
    if (column < 0 || row < 0 || column >= state.columns || row >= state.rows) {
      return -1;
    }
    return row * state.columns + column;
  }

  // Finds a costume by sprite name and costume name.
  function findCostume(targetName, costumeName) {
    const target = runtime.getSpriteTargetByName(targetName);
    if (!target) return null;
    const costume = target.sprite.costumes.find((c) => c.name === costumeName);
    return costume ? { sprite: target.sprite, costume } : null;
  }

  function bindEntry(entry) {
    const found = findCostume(entry.targetName, entry.costumeName);
    entry.sprite = found ? found.sprite : null;
    entry.costume = found ? found.costume : null;
  }

  // Renaming a sprite or costume doesn't update the dropdowns of other
  // extensions' blocks, so follow the renames here instead.
  function syncTileset() {
    let changed = false;
    for (const entry of state.tileset.values()) {
      if (entry.costume && entry.sprite.costumes.includes(entry.costume)) {
        if (
          entry.targetName !== entry.sprite.name ||
          entry.costumeName !== entry.costume.name
        ) {
          entry.targetName = entry.sprite.name;
          entry.costumeName = entry.costume.name;
          changed = true;
        }
      } else {
        // Not found yet, or the costume was deleted: look it up by name again.
        bindEntry(entry);
      }
    }
    if (changed) markDirty();
  }

  // Plain-data snapshot of the tilemap, used for "tilemap as text" and for
  // extension storage (which is saved inside the project file).
  function serializeState() {
    return {
      columns: state.columns,
      rows: state.rows,
      tileSize: state.tileSize,
      grid: Array.from(state.grid),
      tileset: Array.from(state.tileset, ([id, entry]) => [
        id,
        entry.targetName,
        entry.costumeName
      ]),
      solid: Array.from(state.solidIds)
    };
  }

  // Returns false (and leaves the tilemap untouched) if the data isn't a valid
  // snapshot, so bad text never half-loads a map.
  function restoreState(data) {
    if (!data || typeof data !== 'object') return false;
    const { columns, rows, tileSize, grid } = data;
    if (
      !Number.isInteger(columns) ||
      !Number.isInteger(rows) ||
      columns < 1 ||
      rows < 1 ||
      columns * rows > MAX_TILES ||
      !Number.isFinite(tileSize) ||
      tileSize <= 0 ||
      !Array.isArray(grid) ||
      grid.length !== columns * rows
    ) {
      return false;
    }
    state.columns = columns;
    state.rows = rows;
    state.tileSize = tileSize;
    state.grid = Int32Array.from(grid);
    state.tileset.clear();
    if (Array.isArray(data.tileset)) {
      for (const item of data.tileset) {
        if (Array.isArray(item)) {
          const entry = {
            targetName: String(item[1]),
            costumeName: String(item[2]),
            sprite: null,
            costume: null
          };
          bindEntry(entry);
          state.tileset.set(Number(item[0]), entry);
        }
      }
    }
    state.solidIds = new Set(
      Array.isArray(data.solid) ? data.solid.map(Number) : []
    );
    state.scaleCache.clear();
    return true;
  }

  // Extension storage is saved with the project. Changes are batched so big
  // grids aren't serialized on every block.
  let flushTimeout = null;

  function flushStorage() {
    flushTimeout = null;
    runtime.extensionStorage.tiles = serializeState();
  }

  function markDirty() {
    if (flushTimeout === null) {
      flushTimeout = setTimeout(flushStorage, STORAGE_FLUSH_DELAY_MS);
    }
  }

  // Forget the old project's tilemap and drawing. This also cancels a pending
  // write to extension storage, which would otherwise end up in the next project.
  function clearProject() {
    clearTimeout(flushTimeout);
    flushTimeout = null;
    resetState();
    if (render.penSkinId !== null) {
      runtime.renderer.penClear(render.penSkinId);
      runtime.renderer.updateDrawableVisible(render.penDrawableId, false);
    }
  }

  runtime.on('RUNTIME_DISPOSED', clearProject);
  runtime.on('PROJECT_LOADED', () => {
    clearProject();
    restoreState(runtime.extensionStorage.tiles);
  });
  vm.on('targetsUpdate', syncTileset);
  restoreState(runtime.extensionStorage.tiles);

  // Looks up the render skin ID for whatever costume was registered for a
  // given tile id. Costumes get their skinId assigned by scratch-vm when
  // they finish loading (see load-costume.js: `costume.skinId = ...`).
  function getTileSkinId(tileId) {
    const entry = state.tileset.get(tileId);
    if (!entry) return null;
    const found = findCostume(entry.targetName, entry.costumeName);
    if (!found) return null;
    return typeof found.costume.skinId === 'number' ? found.costume.skinId : null;
  }

  // Returns [scaleXPercent, scaleYPercent] so that this skin renders at
  // exactly tileSize x tileSize pixels, regardless of the source costume's
  // native pixel dimensions. Cached per skinId since getSkinSize() is a
  // renderer call we don't want to repeat every tile, every frame.
  function getScaleForSkin(skinId) {
    let scale = state.scaleCache.get(skinId);
    if (scale) return scale;

    const nativeSize = runtime.renderer.getSkinSize(skinId); // [width, height] in px
    scale = [
      (state.tileSize / nativeSize[0]) * 100,
      (state.tileSize / nativeSize[1]) * 100
    ];
    state.scaleCache.set(skinId, scale);
    return scale;
  }

  function ensureRenderResources() {
    if (render.penSkinId !== null) return;

    render.penSkinId = runtime.renderer.createPenSkin();
    render.penDrawableId = runtime.renderer.createDrawable('pen');
    runtime.renderer.updateDrawableSkinId(render.penDrawableId, render.penSkinId);

    render.stampDrawableId = runtime.renderer.createDrawable('pen');
    // The helper drawable stays off-stage and only moves onto the stage while a tile is stamped.
    runtime.renderer.updateDrawableVisible(render.stampDrawableId, true);
    runtime.renderer.updateDrawablePosition(render.stampDrawableId, [
      OFFSTAGE_X,
      OFFSTAGE_Y
    ]);
  }

  class Tiles {
    getInfo() {
      return {
        id: 'tiles',
        name: Scratch.translate('Tiles'),
        color1: '#5C7CFA',
        blocks: [
          {
            opcode: 'createTilemap',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              'create tilemap [COLUMNS] columns x [ROWS] rows, tile size [TILESIZE]'
            ),
            arguments: {
              COLUMNS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 },
              ROWS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              TILESIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 24 }
            }
          },
          {
            opcode: 'drawTilemap',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('draw tilemap with tile (0,0) at x: [X] y: [Y]'),
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'hideTilemap',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('hide tilemap')
          },
          '---',
          {
            opcode: 'setTilesetCostume',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('set tile [ID] to costume [COSTUME] of [SPRITE]'),
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              COSTUME: {
                type: Scratch.ArgumentType.STRING,
                menu: 'COSTUME_MENU',
                defaultValue: 'costume1'
              },
              SPRITE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'SPRITE_MENU',
                defaultValue: 'Sprite1'
              }
            }
          },
          {
            opcode: 'setTile',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('set tile at column [COLUMN] row [ROW] to [ID]'),
            arguments: {
              COLUMN: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ROW: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: 'getTile',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate('tile at column [COLUMN] row [ROW]'),
            arguments: {
              COLUMN: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ROW: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'fillTiles',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              'fill tiles from column [COLUMN1] row [ROW1] to column [COLUMN2] row [ROW2] with [ID]'
            ),
            arguments: {
              COLUMN1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ROW1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              COLUMN2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 9 },
              ROW2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 9 },
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          '---',
          {
            opcode: 'setSolid',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('set tile [ID] solid? [SOLID]'),
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              SOLID: {
                type: Scratch.ArgumentType.STRING,
                menu: 'SOLID_MENU',
                defaultValue: 'solid'
              }
            }
          },
          {
            opcode: 'isSolid',
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate('is solid at column [COLUMN] row [ROW]?'),
            arguments: {
              COLUMN: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ROW: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          '---',
          {
            opcode: 'columnAtX',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate('column at x: [X]'),
            arguments: { X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 } }
          },
          {
            opcode: 'rowAtY',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate('row at y: [Y]'),
            arguments: { Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 } }
          },
          {
            opcode: 'xAtColumn',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate('x at column [COLUMN]'),
            arguments: { COLUMN: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 } }
          },
          {
            opcode: 'yAtRow',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate('y at row [ROW]'),
            arguments: { ROW: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 } }
          },
          {
            opcode: 'tilemapWidth',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate('tilemap width in pixels')
          },
          {
            opcode: 'tilemapHeight',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate('tilemap height in pixels')
          },
          '---',
          {
            opcode: 'tilemapAsText',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate('tilemap as text')
          },
          {
            opcode: 'loadTilemap',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('load tilemap from text [TEXT]'),
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: '' }
            }
          }
        ],
        menus: {
          SOLID_MENU: {
            acceptReporters: false,
            items: [
              { text: Scratch.translate('solid'), value: 'solid' },
              { text: Scratch.translate('not solid'), value: 'not solid' }
            ]
          },
          SPRITE_MENU: {
            acceptReporters: true,
            items: 'getSpriteMenu'
          },
          COSTUME_MENU: {
            acceptReporters: true,
            items: 'getCostumeMenu'
          }
        }
      };
    }

    // Menus can't depend on the other dropdown's value, so the costume menu
    // lists every costume name from every sprite (deduplicated).
    getSpriteMenu() {
      const names = runtime.targets
        .filter((target) => target.isOriginal && !target.isStage)
        .map((target) => target.getName());
      return names.length > 0
        ? names
        : [{ text: Scratch.translate('(none)'), value: '' }];
    }

    getCostumeMenu() {
      const names = new Set();
      for (const target of runtime.targets) {
        if (target.isOriginal && !target.isStage) {
          for (const costume of target.getCostumes()) names.add(costume.name);
        }
      }
      return names.size > 0
        ? Array.from(names)
        : [{ text: Scratch.translate('(none)'), value: '' }];
    }

    createTilemap(args) {
      const columns = Math.max(1, Math.round(Scratch.Cast.toNumber(args.COLUMNS)));
      const rows = Math.max(1, Math.round(Scratch.Cast.toNumber(args.ROWS)));
      const tileSize = Math.max(1, Scratch.Cast.toNumber(args.TILESIZE));
      // Ignore sizes that are too big (or Infinity) instead of throwing.
      if (columns * rows > MAX_TILES || !Number.isFinite(tileSize)) return;

      state.columns = columns;
      state.rows = rows;
      state.tileSize = tileSize;
      state.grid = new Int32Array(columns * rows); // all zero = empty
      state.scaleCache.clear(); // tileSize may have changed, old scales are stale
      markDirty();
    }

    setTilesetCostume(args) {
      const entry = {
        targetName: Scratch.Cast.toString(args.SPRITE),
        costumeName: Scratch.Cast.toString(args.COSTUME),
        sprite: null,
        costume: null
      };
      bindEntry(entry);
      state.tileset.set(Math.round(Scratch.Cast.toNumber(args.ID)), entry);
      // The costume may have been repainted since we measured it, so drop the cached scales.
      state.scaleCache.clear();
      markDirty();
    }

    setTile(args) {
      const column = Math.round(Scratch.Cast.toNumber(args.COLUMN));
      const row = Math.round(Scratch.Cast.toNumber(args.ROW));
      const index = indexFor(column, row);
      if (index === -1) return;
      state.grid[index] = Math.round(Scratch.Cast.toNumber(args.ID));
      markDirty();
    }

    getTile(args) {
      const column = Math.round(Scratch.Cast.toNumber(args.COLUMN));
      const row = Math.round(Scratch.Cast.toNumber(args.ROW));
      const index = indexFor(column, row);
      if (index === -1) return 0;
      return state.grid[index];
    }

    setSolid(args) {
      const id = Math.round(Scratch.Cast.toNumber(args.ID));
      // 0 means empty, which is never solid.
      if (id === 0) return;
      if (Scratch.Cast.toString(args.SOLID) === 'solid') {
        state.solidIds.add(id);
      } else {
        state.solidIds.delete(id);
      }
      markDirty();
    }

    isSolid(args) {
      const column = Math.round(Scratch.Cast.toNumber(args.COLUMN));
      const row = Math.round(Scratch.Cast.toNumber(args.ROW));
      const index = indexFor(column, row);
      if (index === -1) return false;
      const id = state.grid[index];
      return id !== 0 && state.solidIds.has(id);
    }

    fillTiles(args) {
      const id = Math.round(Scratch.Cast.toNumber(args.ID));
      // Accept the two corners in any order (C1 > C2, R1 > R2 is fine).
      let column1 = Math.round(Scratch.Cast.toNumber(args.COLUMN1));
      let column2 = Math.round(Scratch.Cast.toNumber(args.COLUMN2));
      let row1 = Math.round(Scratch.Cast.toNumber(args.ROW1));
      let row2 = Math.round(Scratch.Cast.toNumber(args.ROW2));
      if (column1 > column2) [column1, column2] = [column2, column1];
      if (row1 > row2) [row1, row2] = [row2, row1];

      // Clamp to the grid so out-of-range corners don't crash anything.
      column1 = Math.max(0, column1);
      row1 = Math.max(0, row1);
      column2 = Math.min(state.columns - 1, column2);
      row2 = Math.min(state.rows - 1, row2);

      for (let row = row1; row <= row2; row++) {
        const rowStart = row * state.columns;
        for (let column = column1; column <= column2; column++) {
          state.grid[rowStart + column] = id;
        }
      }
      markDirty();
    }

    tilemapAsText() {
      if (state.columns === 0) return '';
      return JSON.stringify(serializeState());
    }

    loadTilemap(args) {
      let data;
      try {
        data = JSON.parse(Scratch.Cast.toString(args.TEXT));
      } catch (e) {
        return; // not valid JSON, ignore instead of throwing inside a block
      }
      if (restoreState(data)) {
        markDirty();
      }
    }

    hideTilemap() {
      // Nothing to hide if draw was never called (no drawable exists yet).
      if (render.penDrawableId === null) return;
      runtime.renderer.updateDrawableVisible(render.penDrawableId, false);
    }

    // The next four blocks work in "map space": the top-left corner of the
    // tilemap is (0, 0), x grows to the right and y grows upward, so rows
    // count downward from 0. If the map was drawn with its corner at x: X y: Y,
    // subtract X and Y from stage coordinates before converting.
    columnAtX(args) {
      if (state.columns === 0) return 0;
      return Math.floor(Scratch.Cast.toNumber(args.X) / state.tileSize);
    }

    rowAtY(args) {
      if (state.columns === 0) return 0;
      return Math.floor(-Scratch.Cast.toNumber(args.Y) / state.tileSize);
    }

    // Center of the tile, which is where a sprite standing on it should go.
    xAtColumn(args) {
      if (state.columns === 0) return 0;
      return (Math.round(Scratch.Cast.toNumber(args.COLUMN)) + 0.5) * state.tileSize;
    }

    yAtRow(args) {
      if (state.columns === 0) return 0;
      return -(Math.round(Scratch.Cast.toNumber(args.ROW)) + 0.5) * state.tileSize;
    }

    tilemapWidth() {
      return state.columns * state.tileSize;
    }

    tilemapHeight() {
      return state.rows * state.tileSize;
    }

    drawTilemap(args) {
      if (state.columns === 0) return;

      ensureRenderResources();
      // draw always re-shows the tilemap, in case hide tilemap was called
      // earlier. This is the "show" counterpart to hide, folded into draw
      // itself rather than a separate block.
      runtime.renderer.updateDrawableVisible(render.penDrawableId, true);

      // X/Y is where the top-left corner of tile (column 0, row 0) lands on the
      // stage. Increasing X moves the whole map right and increasing Y moves
      // it up, like a normal "go to x/y" block.
      const originX = Scratch.Cast.toNumber(args.X);
      const originY = Scratch.Cast.toNumber(args.Y);

      // Only draw the tiles on the stage, plus one extra tile around the edges.
      const stageWidth = runtime.stageWidth || 480;
      const stageHeight = runtime.stageHeight || 360;

      const minColumn = Math.max(
        0,
        Math.floor((-stageWidth / 2 - originX) / state.tileSize) - 1
      );
      const maxColumn = Math.min(
        state.columns - 1,
        Math.ceil((stageWidth / 2 - originX) / state.tileSize) + 1
      );
      const minRow = Math.max(
        0,
        Math.floor((originY - stageHeight / 2) / state.tileSize) - 1
      );
      const maxRow = Math.min(
        state.rows - 1,
        Math.ceil((originY + stageHeight / 2) / state.tileSize) + 1
      );

      // Clear only OUR OWN pen skin, never the shared Pen extension canvas.
      runtime.renderer.penClear(render.penSkinId);

      for (let row = minRow; row <= maxRow; row++) {
        for (let column = minColumn; column <= maxColumn; column++) {
          const tileId = state.grid[indexFor(column, row)];
          if (tileId === 0) continue; // 0 = empty, nothing to draw

          const skinId = getTileSkinId(tileId);
          if (skinId === null) continue; // tileset entry missing/broken; skip silently

          // A costume is drawn around its rotation center, so stamp it at the
          // middle of its cell. Tile costumes should have their rotation
          // center in the middle, which is the default in the paint editor.
          const centerX = originX + (column + 0.5) * state.tileSize;
          const centerY = originY - (row + 0.5) * state.tileSize;

          runtime.renderer.updateDrawableSkinId(render.stampDrawableId, skinId);
          runtime.renderer.updateDrawableDirectionScale(
            render.stampDrawableId,
            NO_ROTATION_DIRECTION,
            getScaleForSkin(skinId)
          );
          runtime.renderer.updateDrawablePosition(render.stampDrawableId, [
            centerX,
            centerY
          ]);
          runtime.renderer.penStamp(render.penSkinId, render.stampDrawableId);
        }
      }

      // Park the helper back off-stage before the next real frame renders.
      runtime.renderer.updateDrawablePosition(render.stampDrawableId, [
        OFFSTAGE_X,
        OFFSTAGE_Y
      ]);
    }
  }

  Scratch.extensions.register(new Tiles());
})(Scratch);
