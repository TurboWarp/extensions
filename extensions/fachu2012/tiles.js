// Name: Tiles
// ID: tiles
// Description: Create, draw, and query grid-based tile maps for 2D games.
// By: pro2012Fachu <https://scratch.mit.edu/users/pro2012Fachu/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Tiles must run unsandboxed.");
  }

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  // ---------------------------------------------------------------------
  // Internal state. One tilemap per target (sprite or stage), stored in a
  // Map keyed by the target object. Entries are removed in the
  // `targetWasRemoved` handler below.
  // ---------------------------------------------------------------------

  /**
   * @typedef {Object} TilemapState
   * @property {number} columns
   * @property {number} rows
   * @property {number} tileSize
   * @property {Int32Array} grid - flat array, index = row * columns + column. 0 means "empty".
   * @property {Map<number, {targetName: string, costumeName: string}>} tileset
   * @property {Set<number>} solidIds
   * @property {number|null} penSkinId - our OWN pen skin, never shared with the user-facing Pen extension.
   * @property {number|null} penDrawableId - the persistent drawable that carries penSkinId.
   * @property {number|null} stampDrawableId - reusable helper drawable used only to "stamp" tile costumes.
   * @property {Map<number, number[]>} scaleCache - skinId -> [scaleX%, scaleY%] that fits the skin to one tile.
   */

  /** @type {Map<any, TilemapState>} */
  const maps = new Map();

  const OFFSTAGE_X = 1e6;
  const OFFSTAGE_Y = 1e6;
  // Reference direction (facing right, no rotation) used when stamping so
  // tiles never appear rotated regardless of the source sprite's current
  // direction.
  const NO_ROTATION_DIRECTION = 90;

  function getState(target) {
    return maps.get(target) || null;
  }

  // Frees the renderer resources for one target's tilemap (its private pen
  // skin and both drawables). Safe to call on a state that was never fully
  // set up (fields are still null).
  function destroyRenderResources(state) {
    if (state.stampDrawableId !== null) {
      runtime.renderer.destroyDrawable(state.stampDrawableId, "pen");
      state.stampDrawableId = null;
    }
    if (state.penDrawableId !== null) {
      runtime.renderer.destroyDrawable(state.penDrawableId, "pen");
      state.penDrawableId = null;
    }
    if (state.penSkinId !== null) {
      runtime.renderer.destroySkin(state.penSkinId);
      state.penSkinId = null;
    }
  }

  function getOrCreateState(target) {
    let state = maps.get(target);
    if (!state) {
      state = {
        columns: 0,
        rows: 0,
        tileSize: 1,
        grid: new Int32Array(0),
        tileset: new Map(),
        solidIds: new Set(),
        penSkinId: null,
        penDrawableId: null,
        stampDrawableId: null,
        // skinId -> [scaleXPercent, scaleYPercent], so we only call
        // getSkinSize() once per distinct costume instead of every tile,
        // every frame.
        scaleCache: new Map(),
      };
      maps.set(target, state);
    }
    return state;
  }

  // Plain-data snapshot of a tilemap, used both for "tilemap as text" and
  // for extension storage (which gets saved inside the project file).
  function serializeState(state) {
    return {
      columns: state.columns,
      rows: state.rows,
      tileSize: state.tileSize,
      grid: Array.from(state.grid),
      tileset: Array.from(state.tileset, ([id, entry]) => [
        id,
        entry.targetName,
        entry.costumeName,
      ]),
      solid: Array.from(state.solidIds),
    };
  }

  // Returns false (and leaves the state untouched) if the data isn't a
  // valid snapshot, so bad text never half-loads a map.
  function restoreState(state, data) {
    if (!data || typeof data !== "object") return false;
    const { columns, rows, tileSize, grid } = data;
    if (
      !Number.isInteger(columns) ||
      !Number.isInteger(rows) ||
      columns < 1 ||
      rows < 1 ||
      !(tileSize > 0) ||
      !Array.isArray(grid) ||
      grid.length !== columns * rows
    ) {
      return false;
    }
    state.columns = columns;
    state.rows = rows;
    state.tileSize = tileSize;
    state.grid = Int32Array.from(grid);
    state.tileset = new Map();
    if (Array.isArray(data.tileset)) {
      for (const entry of data.tileset) {
        if (Array.isArray(entry)) {
          state.tileset.set(Number(entry[0]), {
            targetName: String(entry[1]),
            costumeName: String(entry[2]),
          });
        }
      }
    }
    state.solidIds = new Set(
      Array.isArray(data.solid) ? data.solid.map(Number) : []
    );
    state.scaleCache.clear();
    return true;
  }

  // Extension storage is saved with the project. Changes are batched so big grids aren't serialized on every block.
  const STORAGE_FLUSH_DELAY_MS = 500;
  const dirtyTargets = new Set();
  let flushTimeout = null;

  function flushStorage() {
    flushTimeout = null;
    for (const target of dirtyTargets) {
      const state = maps.get(target);
      if (state && target.extensionStorage) {
        target.extensionStorage.tiles = serializeState(state);
      }
    }
    dirtyTargets.clear();
  }

  function markDirty(target) {
    dirtyTargets.add(target);
    if (flushTimeout === null) {
      flushTimeout = setTimeout(flushStorage, STORAGE_FLUSH_DELAY_MS);
    }
  }

  function restoreFromStorage() {
    for (const target of runtime.targets) {
      const saved = target.extensionStorage && target.extensionStorage.tiles;
      if (saved) restoreState(getOrCreateState(target), saved);
    }
  }

  runtime.on("PROJECT_LOADED", restoreFromStorage);
  restoreFromStorage();

  // Free the private pen skin and drawables when a sprite or clone is deleted.
  runtime.on("targetWasRemoved", (target) => {
    dirtyTargets.delete(target);
    const state = maps.get(target);
    if (!state) return;
    destroyRenderResources(state);
    maps.delete(target);
  });

  function indexFor(state, column, row) {
    if (column < 0 || row < 0 || column >= state.columns || row >= state.rows) {
      return -1;
    }
    return row * state.columns + column;
  }

  // Looks up the render skin ID for whatever costume was registered for a
  // given tile id. Costumes get their skinId assigned by scratch-vm when
  // they finish loading (see load-costume.js: `costume.skinId = ...`).
  function getTileSkinId(state, tileId) {
    const entry = state.tileset.get(tileId);
    if (!entry) return null;

    const spriteTarget = runtime.getSpriteTargetByName(entry.targetName);
    if (!spriteTarget) return null;

    const costume = spriteTarget.sprite.costumes.find(
      (c) => c.name === entry.costumeName
    );
    if (!costume) return null;

    return typeof costume.skinId === "number" ? costume.skinId : null;
  }

  // Returns [scaleXPercent, scaleYPercent] so that this skin renders at
  // exactly tileSize x tileSize pixels, regardless of the source costume's
  // native pixel dimensions. Cached per skinId since getSkinSize() is a
  // renderer call we don't want to repeat every tile, every frame.
  function getScaleForSkin(state, skinId) {
    let scale = state.scaleCache.get(skinId);
    if (scale) return scale;

    const nativeSize = runtime.renderer.getSkinSize(skinId); // [width, height] in px
    scale = [
      (state.tileSize / nativeSize[0]) * 100,
      (state.tileSize / nativeSize[1]) * 100,
    ];
    state.scaleCache.set(skinId, scale);
    return scale;
  }

  // Lazily sets up our own private pen skin + persistent drawable so we
  // never touch the shared Pen extension's canvas. Also creates the
  // reusable "stamp" drawable.
  function ensureRenderResources(state) {
    if (state.penSkinId !== null) return;

    state.penSkinId = runtime.renderer.createPenSkin();
    state.penDrawableId = runtime.renderer.createDrawable("pen");
    runtime.renderer.updateDrawableSkinId(state.penDrawableId, state.penSkinId);

    state.stampDrawableId = runtime.renderer.createDrawable("pen");
    // The helper drawable stays off-stage and only moves onto the stage while a tile is stamped.
    runtime.renderer.updateDrawableVisible(state.stampDrawableId, true);
    runtime.renderer.updateDrawablePosition(state.stampDrawableId, [
      OFFSTAGE_X,
      OFFSTAGE_Y,
    ]);
  }

  class Tiles {
    getInfo() {
      return {
        id: "tiles",
        name: Scratch.translate("Tiles"),
        color1: "#5C7CFA",
        blocks: [
          {
            opcode: "createTilemap",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "create tilemap [COLUMNS] columns x [ROWS] rows, tile size [TILESIZE]"
            ),
            arguments: {
              COLUMNS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 },
              ROWS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              TILESIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 24 },
            },
          },
          {
            opcode: "drawTilemap",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "draw tilemap with tile (0,0) at x: [X] y: [Y]"
            ),
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "hideTilemap",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("hide tilemap"),
          },
          "---",
          {
            opcode: "setTilesetCostume",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set tile [ID] to costume [COSTUME] of [SPRITE]"
            ),
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              COSTUME: {
                type: Scratch.ArgumentType.STRING,
                menu: "COSTUME_MENU",
                defaultValue: "costume1",
              },
              SPRITE: {
                type: Scratch.ArgumentType.STRING,
                menu: "SPRITE_MENU",
                defaultValue: "Sprite1",
              },
            },
          },
          {
            opcode: "setTile",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set tile at column [COLUMN] row [ROW] to [ID]"
            ),
            arguments: {
              COLUMN: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ROW: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
          },
          {
            opcode: "getTile",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("tile at column [COLUMN] row [ROW]"),
            arguments: {
              COLUMN: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ROW: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "fillTiles",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "fill tiles from column [COLUMN1] row [ROW1] to column [COLUMN2] row [ROW2] with [ID]"
            ),
            arguments: {
              COLUMN1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ROW1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              COLUMN2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 9 },
              ROW2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 9 },
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
          },
          "---",
          {
            opcode: "setSolid",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set tile [ID] solid? [SOLID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              SOLID: {
                type: Scratch.ArgumentType.STRING,
                menu: "SOLID_MENU",
                defaultValue: "solid",
              },
            },
          },
          {
            opcode: "isSolid",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is solid at column [COLUMN] row [ROW]?"),
            arguments: {
              COLUMN: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ROW: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          "---",
          {
            opcode: "columnAtX",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("column at x: [X]"),
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "rowAtY",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("row at y: [Y]"),
            arguments: {
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "xAtColumn",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("x at column [COLUMN]"),
            arguments: {
              COLUMN: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "yAtRow",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("y at row [ROW]"),
            arguments: {
              ROW: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "tilemapWidth",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("tilemap width in pixels"),
          },
          {
            opcode: "tilemapHeight",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("tilemap height in pixels"),
          },
          "---",
          {
            opcode: "tilemapAsText",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("tilemap as text"),
          },
          {
            opcode: "loadTilemap",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("load tilemap from text [TEXT]"),
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
            },
          },
        ],
        menus: {
          SOLID_MENU: {
            acceptReporters: false,
            items: ["solid", "not solid"],
          },
          SPRITE_MENU: {
            acceptReporters: true,
            items: "getSpriteMenu",
          },
          COSTUME_MENU: {
            acceptReporters: true,
            items: "getCostumeMenu",
          },
        },
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
        : [{ text: Scratch.translate("(none)"), value: "" }];
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
        : [{ text: Scratch.translate("(none)"), value: "" }];
    }

    createTilemap(args, util) {
      const columns = Math.max(
        1,
        Math.round(Scratch.Cast.toNumber(args.COLUMNS))
      );
      const rows = Math.max(1, Math.round(Scratch.Cast.toNumber(args.ROWS)));
      const tileSize = Math.max(1, Scratch.Cast.toNumber(args.TILESIZE));

      const state = getOrCreateState(util.target);
      state.columns = columns;
      state.rows = rows;
      state.tileSize = tileSize;
      state.grid = new Int32Array(columns * rows); // all zero = empty
      state.scaleCache.clear(); // tileSize may have changed, old scales are stale
      markDirty(util.target);
    }

    setTilesetCostume(args, util) {
      const state = getOrCreateState(util.target);
      const id = Math.round(Scratch.Cast.toNumber(args.ID));
      state.tileset.set(id, {
        targetName: Scratch.Cast.toString(args.SPRITE),
        costumeName: Scratch.Cast.toString(args.COSTUME),
      });
      // The costume may have been repainted since we measured it, so drop the cached scales.
      state.scaleCache.clear();
      markDirty(util.target);
    }

    setTile(args, util) {
      const state = getState(util.target);
      if (!state) return;
      const column = Math.round(Scratch.Cast.toNumber(args.COLUMN));
      const row = Math.round(Scratch.Cast.toNumber(args.ROW));
      const index = indexFor(state, column, row);
      if (index === -1) return;
      state.grid[index] = Math.round(Scratch.Cast.toNumber(args.ID));
      markDirty(util.target);
    }

    getTile(args, util) {
      const state = getState(util.target);
      if (!state) return 0;
      const column = Math.round(Scratch.Cast.toNumber(args.COLUMN));
      const row = Math.round(Scratch.Cast.toNumber(args.ROW));
      const index = indexFor(state, column, row);
      if (index === -1) return 0;
      return state.grid[index];
    }

    setSolid(args, util) {
      const state = getOrCreateState(util.target);
      const id = Math.round(Scratch.Cast.toNumber(args.ID));
      if (Scratch.Cast.toString(args.SOLID) === "solid") {
        state.solidIds.add(id);
      } else {
        state.solidIds.delete(id);
      }
      markDirty(util.target);
    }

    isSolid(args, util) {
      const state = getState(util.target);
      if (!state) return false;
      const column = Math.round(Scratch.Cast.toNumber(args.COLUMN));
      const row = Math.round(Scratch.Cast.toNumber(args.ROW));
      const index = indexFor(state, column, row);
      if (index === -1) return false;
      return state.solidIds.has(state.grid[index]);
    }

    fillTiles(args, util) {
      const state = getState(util.target);
      if (!state) return;

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
      markDirty(util.target);
    }

    tilemapAsText(args, util) {
      const state = getState(util.target);
      if (!state || state.columns === 0) return "";
      return JSON.stringify(serializeState(state));
    }

    loadTilemap(args, util) {
      let data;
      try {
        data = JSON.parse(Scratch.Cast.toString(args.TEXT));
      } catch (e) {
        return; // not valid JSON, ignore instead of throwing inside a block
      }
      if (restoreState(getOrCreateState(util.target), data)) {
        markDirty(util.target);
      }
    }

    hideTilemap(args, util) {
      const state = getState(util.target);
      // Nothing to hide if draw was never called (no drawable exists yet).
      if (!state || state.penDrawableId === null) return;
      runtime.renderer.updateDrawableVisible(state.penDrawableId, false);
    }

    columnAtX(args, util) {
      const state = getState(util.target);
      if (!state) return 0;
      return Math.floor(Scratch.Cast.toNumber(args.X) / state.tileSize);
    }

    rowAtY(args, util) {
      const state = getState(util.target);
      if (!state) return 0;
      // Scratch's Y axis points up; row 0 is the top row of the grid, so we
      // flip the sign here.
      return Math.floor(-Scratch.Cast.toNumber(args.Y) / state.tileSize);
    }

    xAtColumn(args, util) {
      const state = getState(util.target);
      if (!state) return 0;
      return Math.round(Scratch.Cast.toNumber(args.COLUMN)) * state.tileSize;
    }

    yAtRow(args, util) {
      const state = getState(util.target);
      if (!state) return 0;
      return -Math.round(Scratch.Cast.toNumber(args.ROW)) * state.tileSize;
    }

    tilemapWidth(args, util) {
      const state = getState(util.target);
      if (!state) return 0;
      return state.columns * state.tileSize;
    }

    tilemapHeight(args, util) {
      const state = getState(util.target);
      if (!state) return 0;
      return state.rows * state.tileSize;
    }

    drawTilemap(args, util) {
      const state = getState(util.target);
      if (!state || state.columns === 0) return;

      ensureRenderResources(state);
      // draw always re-shows the tilemap, in case hide tilemap was called
      // earlier. This is the "show" counterpart to hide, folded into draw
      // itself rather than a separate block.
      runtime.renderer.updateDrawableVisible(state.penDrawableId, true);

      // X/Y = exactly where tile (column 0, row 0) lands on the stage.
      // No camera-style inversion: increasing X moves the whole map right,
      // increasing Y moves it up, matching normal Scratch "go to x/y" logic.
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
      runtime.renderer.penClear(state.penSkinId);

      for (let row = minRow; row <= maxRow; row++) {
        for (let column = minColumn; column <= maxColumn; column++) {
          const tileId = state.grid[indexFor(state, column, row)];
          if (tileId === 0) continue; // 0 = empty, nothing to draw

          const skinId = getTileSkinId(state, tileId);
          if (skinId === null) continue; // tileset entry missing/broken; skip silently

          const worldX = column * state.tileSize + originX;
          const worldY = -row * state.tileSize + originY;

          runtime.renderer.updateDrawableSkinId(state.stampDrawableId, skinId);
          runtime.renderer.updateDrawableDirectionScale(
            state.stampDrawableId,
            NO_ROTATION_DIRECTION,
            getScaleForSkin(state, skinId)
          );
          runtime.renderer.updateDrawablePosition(state.stampDrawableId, [
            worldX,
            worldY,
          ]);
          runtime.renderer.penStamp(state.penSkinId, state.stampDrawableId);
        }
      }

      // Park the helper back off-stage before the next real frame renders.
      runtime.renderer.updateDrawablePosition(state.stampDrawableId, [
        OFFSTAGE_X,
        OFFSTAGE_Y,
      ]);
    }
  }

  Scratch.extensions.register(new Tiles());
})(Scratch);
