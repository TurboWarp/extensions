// Name: Tiles
// ID: fachu2012tiles
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

  const EXTENSION_ID = "fachu2012tiles";
  const MAX_TILES = 1000000;
  const OFFSTAGE_X = 1e6;
  const OFFSTAGE_Y = 1e6;
  const NO_ROTATION_DIRECTION = 90;
  const STORAGE_FLUSH_DELAY_MS = 500;
  const EDITOR_URL =
    "https://extensions.turbowarp.org/fachu2012/tiles-editor/index.html";

  const state = {
    columns: 0,
    rows: 0,
    tileSize: 1,
    originalTileSize: 1,
    originX: 0,
    originY: 0,
    grid: new Int32Array(0),
    tileset: new Map(),
    solidIds: new Set(),
    attributes: new Map(),
    scaleCache: new Map(),
  };

  const render = {
    penSkinId: null,
    penDrawableId: null,
    stampDrawableId: null,
    lastDrawKey: null,
    revision: 0,
  };

  function resetState() {
    state.columns = 0;
    state.rows = 0;
    state.tileSize = 1;
    state.originalTileSize = 1;
    state.originX = 0;
    state.originY = 0;
    state.grid = new Int32Array(0);
    state.tileset.clear();
    state.solidIds.clear();
    state.attributes.clear();
    state.scaleCache.clear();
    render.lastDrawKey = null;
    render.revision++;
  }

  function indexFor(column, row) {
    if (column < 0 || row < 0 || column >= state.columns || row >= state.rows) {
      return -1;
    }
    return row * state.columns + column;
  }

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

    if (!found && entry.dataURI) {
      loadEmbeddedSkin(entry);
    }
  }

  function loadEmbeddedSkin(entry) {
    if (
      !entry.dataURI ||
      entry.embeddedSkinId !== null ||
      entry.loadingEmbeddedSkin
    ) {
      return;
    }

    entry.loadingEmbeddedSkin = true;

    // This image uses an embedded data URI, not a network URL.
    // eslint-disable-next-line extension/check-can-fetch
    const image = new Image();

    image.onload = () => {
      try {
        entry.embeddedSkinId = runtime.renderer.createBitmapSkin(image, 1, [
          image.width / 2,
          image.height / 2,
        ]);

        render.revision++;
        render.lastDrawKey = null;
      } catch (error) {
        entry.embeddedSkinId = null;
      }

      entry.loadingEmbeddedSkin = false;
    };

    image.onerror = () => {
      entry.loadingEmbeddedSkin = false;
    };

    image.src = entry.dataURI;
  }

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
        bindEntry(entry);
      }
    }
    if (changed) markDirty();
  }

  function serializeState() {
    return {
      columns: state.columns,
      rows: state.rows,
      tileSize: state.tileSize,
      originalTileSize: state.originalTileSize,
      grid: Array.from(state.grid),
      tileset: Array.from(state.tileset, ([id, entry]) => [
        id,
        entry.targetName,
        entry.costumeName,
        entry.dataURI || "",
      ]),
      solid: Array.from(state.solidIds),
      attributes: Array.from(state.attributes, ([id, attributes]) => [
        id,
        Array.from(attributes),
      ]),
    };
  }

  function serializeModernState() {
    const tiles = [];
    const tileIds = new Map();

    for (const [id, entry] of state.tileset) {
      const tile = {
        spriteName: entry.targetName,
        name: entry.costumeName,
        costumeIndex: 0,
        dataURI: entry.dataURI || "",
        solid: state.solidIds.has(id),
        attributes: Array.from(state.attributes.get(id) || []),
      };

      tileIds.set(id, tiles.length);
      tiles.push(tile);
    }

    return {
      format: "fachu2012tiles-editor",
      version: 1,
      width: state.columns,
      height: state.rows,
      tileSize: state.tileSize,
      tiles,
      cells: Array.from(state.grid, (id) =>
        id === 0 ? null : tileIds.has(id) ? tileIds.get(id) : null
      ),
    };
  }

  function restoreState(data) {
    if (!data || typeof data !== "object") return false;
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

    const restoredAttributes = new Map();
    if (!Array.isArray(data.tileset)) return false;
    const restoredTileset = new Map();

    for (const item of data.tileset) {
      if (
        !Array.isArray(item) ||
        (item.length !== 3 && item.length !== 4) ||
        (typeof item[3] !== "undefined" && typeof item[3] !== "string") ||
        !Number.isInteger(item[0]) ||
        item[0] <= 0 ||
        typeof item[1] !== "string" ||
        item[1].trim() === "" ||
        typeof item[2] !== "string" ||
        item[2].trim() === "" ||
        restoredTileset.has(item[0])
      ) {
        return false;
      }
      restoredTileset.set(item[0], item);
    }

    if (!grid.every((id) => Number.isInteger(id) && id >= 0)) return false;

    if (
      data.solid !== undefined &&
      (!Array.isArray(data.solid) ||
        !data.solid.every((id) => Number.isInteger(id) && id > 0))
    ) {
      return false;
    }

    if (data.attributes !== undefined) {
      if (!Array.isArray(data.attributes)) return false;
      for (const item of data.attributes) {
        if (
          !Array.isArray(item) ||
          item.length !== 2 ||
          !Number.isInteger(Number(item[0])) ||
          Number(item[0]) <= 0 ||
          !Array.isArray(item[1]) ||
          !item[1].every(
            (attribute) =>
              typeof attribute === "string" && attribute.trim() !== ""
          )
        ) {
          return false;
        }
        const id = Number(item[0]);
        restoredAttributes.set(
          id,
          new Set(item[1].map((attribute) => attribute.trim().toLowerCase()))
        );
      }
    }

    state.columns = columns;
    state.rows = rows;
    state.tileSize = tileSize;
    state.originalTileSize =
      Number.isFinite(data.originalTileSize) && data.originalTileSize > 0
        ? data.originalTileSize
        : tileSize;
    state.grid = Int32Array.from(grid);
    state.tileset.clear();

    for (const [id, item] of restoredTileset) {
      const entry = {
        targetName: item[1],
        costumeName: item[2],
        dataURI: item[3] || "",
        embeddedSkinId: null,
        loadingEmbeddedSkin: false,
        sprite: null,
        costume: null,
      };
      bindEntry(entry);
      state.tileset.set(id, entry);
    }

    state.solidIds = new Set(data.solid || []);
    state.attributes = restoredAttributes;
    state.scaleCache.clear();
    render.lastDrawKey = null;
    render.revision++;
    return true;
  }

  let flushTimeout = null;

  function flushStorage() {
    flushTimeout = null;
    runtime.extensionStorage[EXTENSION_ID] = serializeState();
  }

  function markDirty() {
    render.revision++;
    render.lastDrawKey = null;
    if (flushTimeout === null) {
      flushTimeout = setTimeout(flushStorage, STORAGE_FLUSH_DELAY_MS);
    }
  }

  function clearProject() {
    clearTimeout(flushTimeout);
    flushTimeout = null;
    resetState();
    if (render.penSkinId !== null) {
      runtime.renderer.penClear(render.penSkinId);
      runtime.renderer.updateDrawableVisible(render.penDrawableId, false);
    }
  }

  runtime.on("RUNTIME_DISPOSED", clearProject);
  runtime.on("PROJECT_LOADED", () => {
    clearProject();
    restoreState(runtime.extensionStorage[EXTENSION_ID]);
  });
  vm.on("targetsUpdate", () => {
    syncTileset();
    render.lastDrawKey = null;
    render.revision++;
  });
  restoreState(runtime.extensionStorage[EXTENSION_ID]);

  function getTileSkinId(tileId) {
    const entry = state.tileset.get(tileId);
    if (!entry) return null;

    if (
      entry.costume &&
      entry.sprite &&
      entry.sprite.costumes.includes(entry.costume) &&
      typeof entry.costume.skinId === "number"
    ) {
      return entry.costume.skinId;
    }

    if (typeof entry.embeddedSkinId === "number") {
      return entry.embeddedSkinId;
    }

    return null;
  }

  function getScaleForSkin(skinId) {
    let scale = state.scaleCache.get(skinId);
    if (scale) return scale;

    const nativeSize = runtime.renderer.getSkinSize(skinId);
    scale = [
      (state.tileSize / nativeSize[0]) * 100,
      (state.tileSize / nativeSize[1]) * 100,
    ];
    state.scaleCache.set(skinId, scale);
    return scale;
  }

  function ensureRenderResources() {
    if (render.penSkinId !== null) return;

    render.penSkinId = runtime.renderer.createPenSkin();
    render.penDrawableId = runtime.renderer.createDrawable("pen");
    runtime.renderer.updateDrawableSkinId(
      render.penDrawableId,
      render.penSkinId
    );

    render.stampDrawableId = runtime.renderer.createDrawable("pen");
    runtime.renderer.updateDrawableVisible(render.stampDrawableId, true);
    runtime.renderer.updateDrawablePosition(render.stampDrawableId, [
      OFFSTAGE_X,
      OFFSTAGE_Y,
    ]);
  }

  class Tiles {
    constructor() {
      this.editorFrame = null;
      this.editorOverlay = null;
      this.editorCloseButton = null;
      this.editorClosing = false;
      this.editorOpening = false;
      this.editorHasUnsavedChanges = false;
      this.previousBodyOverflowY = "";

      window.addEventListener("message", (event) => {
        if (
          !this.editorFrame ||
          event.source !== this.editorFrame.contentWindow
        ) {
          return;
        }

        if (event.origin !== new URL(EDITOR_URL).origin) {
          return;
        }

        if (!event.data || typeof event.data !== "object") {
          return;
        }

        if (event.data.type === "EDITOR_DIRTY") {
          this.editorHasUnsavedChanges = true;
          return;
        }

        if (event.data.type === "EDITOR_SAVED") {
          this.editorHasUnsavedChanges = false;
          return;
        }

        if (
          event.data.type === "TRANSLATE_TEXT" &&
          typeof event.data.text === "string" &&
          (typeof event.data.id === "number" ||
            typeof event.data.id === "string")
        ) {
          const translatedText = Scratch.translate.call(
            Scratch,
            event.data.text
          );

          this.editorFrame.contentWindow.postMessage(
            {
              type: "TRANSLATION_RESULT",
              id: event.data.id,
              text: translatedText,
            },
            new URL(EDITOR_URL).origin
          );

          return;
        }

        if (event.data.type === "EDITOR_CLOSE") {
          this.closeTilemapEditor();
        }

        if (event.data.type === "PROJECT_DATA_REQUEST") {
          this.editorFrame.contentWindow.postMessage(
            {
              type: "PROJECT_DATA",
              sprites: this.getProjectData(),
            },
            new URL(EDITOR_URL).origin
          );
          this.editorFrame.contentWindow.postMessage(
            {
              type: "EDITOR_TILE_PROPERTIES",
              tiles: this.getEditorTileProperties(),
            },
            new URL(EDITOR_URL).origin
          );
        }

        if (event.data.type === "EDITOR_TILE_PROPERTIES_UPDATE") {
          this.applyEditorTileProperties(event.data.tiles);
        }
      });
    }

    getEditorTileProperties() {
      return Array.from(state.tileset, ([id, entry]) => ({
        id,
        spriteName: entry.targetName,
        costumeName: entry.costumeName,
        solid: state.solidIds.has(id),
        attributes: Array.from(state.attributes.get(id) || []),
      }));
    }

    applyEditorTileProperties(tiles) {
      if (!Array.isArray(tiles)) return;
      let changed = false;

      for (const tile of tiles) {
        if (
          !tile ||
          typeof tile.spriteName !== "string" ||
          typeof tile.costumeName !== "string" ||
          typeof tile.solid !== "boolean" ||
          !Array.isArray(tile.attributes) ||
          !tile.attributes.every(
            (attribute) =>
              typeof attribute === "string" && attribute.trim() !== ""
          )
        ) {
          continue;
        }

        const matchingIds = [];
        for (const [id, entry] of state.tileset) {
          if (
            entry.targetName === tile.spriteName &&
            entry.costumeName === tile.costumeName
          ) {
            matchingIds.push(id);
          }
        }

        for (const id of matchingIds) {
          if (id === 0) continue;
          if (tile.solid) state.solidIds.add(id);
          else state.solidIds.delete(id);

          const attributes = new Set(
            tile.attributes.map((attribute) => attribute.trim().toLowerCase())
          );
          if (attributes.size > 0) state.attributes.set(id, attributes);
          else state.attributes.delete(id);
          changed = true;
        }
      }

      if (changed) markDirty();
    }

    getProjectData() {
      return runtime.targets
        .filter((target) => target.isOriginal && !target.isStage)
        .map((target) => ({
          name: target.getName(),
          costumes: target.sprite.costumes.map((costume, index) => ({
            name: costume.name,
            index,
            dataURI: costume.asset.encodeDataURI(),
          })),
        }));
    }

    async openTilemapEditor() {
      if (this.editorFrame || this.editorOpening || this.editorClosing) return;
      this.editorOpening = true;

      let canEmbed = false;
      try {
        canEmbed = await Scratch.canEmbed(EDITOR_URL);
      } catch (error) {
        this.editorOpening = false;
        return;
      }

      this.editorOpening = false;
      if (!canEmbed || this.editorFrame || this.editorClosing) return;

      this.previousBodyOverflowY = document.body.style.overflowY;

      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.inset = "0";
      overlay.style.backgroundColor = "rgba(120, 80, 220, 0.65)";
      overlay.style.zIndex = "10000";

      const frame = document.createElement("iframe");
      frame.title = "Tiles Editor";
      frame.src = EDITOR_URL;
      frame.style.position = "absolute";
      frame.style.left = "10%";
      frame.style.top = "6%";
      frame.style.width = "80%";
      frame.style.height = "88%";
      frame.style.border = "4px solid #8b7be8";
      frame.style.borderRadius = "8px";
      frame.style.backgroundColor = "white";
      frame.style.zIndex = "10001";

      frame.onload = () => {
        frame.contentWindow.postMessage(
          { type: "REGISTER_PARENT" },
          new URL(EDITOR_URL).origin
        );
      };

      const closeButton = document.createElement("button");
      closeButton.textContent = "×";
      closeButton.title = "Close editor";
      closeButton.setAttribute("aria-label", "Close editor");

      closeButton.style.position = "fixed";
      closeButton.style.top = "3.5%";
      closeButton.style.right = "8.3%";
      closeButton.style.width = "40px";
      closeButton.style.height = "40px";
      closeButton.style.padding = "0";
      closeButton.style.display = "grid";
      closeButton.style.placeItems = "center";

      closeButton.style.fontFamily = "Arial, sans-serif";
      closeButton.style.fontSize = "27px";
      closeButton.style.fontWeight = "400";
      closeButton.style.lineHeight = "1";

      closeButton.style.color = "#ffffff";
      closeButton.style.backgroundColor = "rgba(30, 35, 48, 0.95)";
      closeButton.style.border = "1px solid rgba(255, 255, 255, 0.2)";
      closeButton.style.borderRadius = "50%";
      closeButton.style.boxShadow = "0 4px 14px rgba(0, 0, 0, 0.3)";

      closeButton.style.cursor = "pointer";
      closeButton.style.zIndex = "10002";
      closeButton.style.transition =
        "background-color 0.2s ease, transform 0.2s ease";

      closeButton.addEventListener("mouseenter", () => {
        closeButton.style.backgroundColor = "#e05252";
        closeButton.style.transform = "scale(1.1)";
      });

      closeButton.addEventListener("mouseleave", () => {
        closeButton.style.backgroundColor = "rgba(30, 35, 48, 0.95)";
        closeButton.style.transform = "scale(1)";
      });

      closeButton.addEventListener("click", () => {
        this.closeTilemapEditor();
      });

      this.editorCloseButton = closeButton;
      this.editorOverlay = overlay;
      this.editorFrame = frame;
      this.editorHasUnsavedChanges = false;

      document.body.style.overflowY = "hidden";

      document.body.appendChild(overlay);
      document.body.appendChild(frame);
      document.body.appendChild(closeButton);

      overlay.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 350,
        easing: "ease-out",
        fill: "forwards",
      });

      frame.animate(
        [
          { transform: "translateY(-45px)", opacity: 0 },
          { transform: "translateY(0)", opacity: 1 },
        ],
        {
          duration: 350,
          easing: "ease-out",
          fill: "both",
        }
      );

      closeButton.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 350,
        easing: "ease-out",
        fill: "forwards",
      });
    }

    closeTilemapEditor() {
      if (this.editorClosing) return;
      if (!this.editorFrame && !this.editorOverlay && !this.editorCloseButton) {
        return;
      }

      if (
        this.editorFrame &&
        this.editorHasUnsavedChanges &&
        !window.confirm(
          "If you close the editor, any unsaved changes will be lost. Do you want to close it?"
        )
      ) {
        return;
      }

      this.editorClosing = true;

      const frame = this.editorFrame;
      const overlay = this.editorOverlay;
      const closeButton = this.editorCloseButton;
      const duration = 350;

      if (frame) {
        frame.animate(
          [
            { transform: "translateY(0)", opacity: 1 },
            { transform: "translateY(-45px)", opacity: 0 },
          ],
          {
            duration,
            easing: "ease-in",
            fill: "forwards",
          }
        );
      }

      if (overlay) {
        overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration,
          easing: "ease-in",
          fill: "forwards",
        });
      }

      if (closeButton) {
        closeButton.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration,
          easing: "ease-in",
          fill: "forwards",
        });
      }

      window.setTimeout(() => {
        if (frame) frame.remove();
        if (overlay) overlay.remove();
        if (closeButton) closeButton.remove();

        this.editorFrame = null;
        this.editorOverlay = null;
        this.editorCloseButton = null;

        document.body.style.overflowY = this.previousBodyOverflowY;
        this.editorClosing = false;
        this.editorHasUnsavedChanges = false;
      }, duration);
    }

    getInfo() {
      return {
        id: EXTENSION_ID,
        name: Scratch.translate("Tiles"),
        docsURI: "https://extensions.turbowarp.org/fachu2012/tiles",
        color1: "#5C7CFA",
        blocks: [
          {
            blockType: Scratch.BlockType.BUTTON,
            func: "openTilemapEditor",
            text: Scratch.translate("Open tilemap editor"),
          },
          "---",
          {
            opcode: "loadTilemapFromJSONFile",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("load tilemap from JSON file"),
          },
          {
            opcode: "loadTilemap",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("load tilemap from JSON data [TEXT]"),
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
            },
          },
          {
            opcode: "tilemapAsText",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("tilemap JSON data"),
          },
          {
            opcode: "tileSize",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("tile size"),
          },
          {
            opcode: "originalTileSize",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("original tile size"),
          },
          {
            opcode: "setTileSize",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set tile size to [SIZE]"),
            arguments: {
              SIZE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 24,
              },
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
          "---",
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
          {
            opcode: "getTile",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("tile at column [COLUMN] row [ROW]"),
            arguments: {
              COLUMN: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ROW: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
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
          {
            opcode: "setTileAttribute",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set tile [ID] attribute [ATTRIBUTE] [ACTION]"
            ),
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              ATTRIBUTE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "wall",
              },
              ACTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "ATTRIBUTE_ACTION_MENU",
                defaultValue: "add",
              },
            },
          },
          {
            opcode: "tileHasAttribute",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate(
              "tile at column [COLUMN] row [ROW] has attribute [ATTRIBUTE]?"
            ),
            arguments: {
              COLUMN: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ROW: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ATTRIBUTE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "wall",
              },
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
            text: Scratch.translate("y at row: [ROW]"),
            arguments: {
              ROW: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          "---",
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
        ],
        menus: {
          SOLID_MENU: {
            acceptReporters: false,
            items: [
              { text: Scratch.translate("solid"), value: "solid" },
              { text: Scratch.translate("not solid"), value: "not solid" },
            ],
          },
          ATTRIBUTE_ACTION_MENU: {
            acceptReporters: false,
            items: [
              { text: Scratch.translate("add"), value: "add" },
              { text: Scratch.translate("remove"), value: "remove" },
            ],
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

    setTilesetCostume(args) {
      const entry = {
        targetName: Scratch.Cast.toString(args.SPRITE),
        costumeName: Scratch.Cast.toString(args.COSTUME),
        sprite: null,
        costume: null,
      };
      bindEntry(entry);
      state.tileset.set(Math.round(Scratch.Cast.toNumber(args.ID)), entry);
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
      if (id === 0) return;
      if (Scratch.Cast.toString(args.SOLID) === "solid") {
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

    setTileAttribute(args) {
      const id = Math.round(Scratch.Cast.toNumber(args.ID));
      const attribute = Scratch.Cast.toString(args.ATTRIBUTE)
        .trim()
        .toLowerCase();
      if (id === 0 || attribute === "") return;

      let attributes = state.attributes.get(id);
      if (!attributes) {
        attributes = new Set();
        state.attributes.set(id, attributes);
      }

      if (Scratch.Cast.toString(args.ACTION) === "add") {
        attributes.add(attribute);
      } else {
        attributes.delete(attribute);
        if (attributes.size === 0) state.attributes.delete(id);
      }
      markDirty();
    }

    tileHasAttribute(args) {
      const column = Math.round(Scratch.Cast.toNumber(args.COLUMN));
      const row = Math.round(Scratch.Cast.toNumber(args.ROW));
      const index = indexFor(column, row);
      if (index === -1) return false;

      const tileId = state.grid[index];
      if (tileId === 0) return false;

      const attribute = Scratch.Cast.toString(args.ATTRIBUTE)
        .trim()
        .toLowerCase();
      if (attribute === "") return false;

      const attributes = state.attributes.get(tileId);
      return Boolean(attributes && attributes.has(attribute));
    }

    fillTiles(args) {
      const id = Math.round(Scratch.Cast.toNumber(args.ID));
      let column1 = Math.round(Scratch.Cast.toNumber(args.COLUMN1));
      let column2 = Math.round(Scratch.Cast.toNumber(args.COLUMN2));
      let row1 = Math.round(Scratch.Cast.toNumber(args.ROW1));
      let row2 = Math.round(Scratch.Cast.toNumber(args.ROW2));

      if (column1 > column2) [column1, column2] = [column2, column1];
      if (row1 > row2) [row1, row2] = [row2, row1];

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
      if (state.columns === 0) return "";
      return JSON.stringify(serializeModernState());
    }

    tileSize() {
      return state.tileSize;
    }

    originalTileSize() {
      return state.originalTileSize;
    }

    setTileSize(args) {
      const newSize = Scratch.Cast.toNumber(args.SIZE);

      if (!Number.isFinite(newSize) || newSize <= 0) return;

      state.tileSize = newSize;
      state.scaleCache.clear();
      markDirty();
    }

    async loadTilemapFromJSONFile() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json,application/json";

      const file = await new Promise((resolve) => {
        input.addEventListener(
          "change",
          () => {
            resolve(input.files && input.files[0] ? input.files[0] : null);
          },
          { once: true }
        );

        input.addEventListener(
          "cancel",
          () => {
            resolve(null);
          },
          { once: true }
        );

        input.click();
      });

      if (!file) return;

      try {
        const data = JSON.parse(await file.text());
        let tilemap = data;

        if (
          data &&
          data.format === "fachu2012tiles-editor" &&
          data.version === 1
        ) {
          const width = data.width;
          const height = data.height;

          if (
            !Number.isInteger(width) ||
            !Number.isInteger(height) ||
            width < 1 ||
            height < 1 ||
            !Array.isArray(data.tiles) ||
            !Array.isArray(data.cells) ||
            data.cells.length !== width * height
          ) {
            throw new Error("Invalid modern tilemap data.");
          }

          const tileset = [];
          const solid = [];
          const attributes = [];
          const grid = [];

          data.tiles.forEach((tile, index) => {
            if (
              !tile ||
              typeof tile.spriteName !== "string" ||
              typeof tile.name !== "string" ||
              !Number.isInteger(tile.costumeIndex) ||
              typeof tile.dataURI !== "string" ||
              !Array.isArray(tile.attributes)
            ) {
              throw new Error("Invalid tile data.");
            }

            const id = index + 1;

            tileset.push([id, tile.spriteName, tile.name, tile.dataURI]);

            if (tile.solid === true) {
              solid.push(id);
            }

            if (tile.attributes.length > 0) {
              attributes.push([id, tile.attributes]);
            }
          });

          data.cells.forEach((cell) => {
            if (cell === null) {
              grid.push(0);
              return;
            }

            if (
              !Number.isInteger(cell) ||
              cell < 0 ||
              cell >= data.tiles.length
            ) {
              throw new Error("Invalid cell data.");
            }

            grid.push(cell + 1);
          });

          tilemap = {
            columns: width,
            rows: height,
            tileSize:
              Number.isFinite(data.tileSize) && data.tileSize > 0
                ? data.tileSize
                : 24,
            grid,
            tileset,
            solid,
            attributes,
          };
        }

        if (!restoreState(tilemap)) {
          throw new Error("Invalid tilemap data.");
        }

        state.scaleCache.clear();
        markDirty();
      } catch (error) {
        window.alert("Could not load tilemap: " + error.message);
      }
    }

    loadTilemap(args) {
      let data;

      try {
        data = JSON.parse(Scratch.Cast.toString(args.TEXT));
      } catch (e) {
        return;
      }

      let tilemap = data;

      if (
        data &&
        data.format === "fachu2012tiles-editor" &&
        data.version === 1
      ) {
        const width = data.width;
        const height = data.height;

        if (
          !Number.isInteger(width) ||
          !Number.isInteger(height) ||
          width < 1 ||
          height < 1 ||
          width * height > MAX_TILES ||
          !Array.isArray(data.tiles) ||
          !Array.isArray(data.cells) ||
          data.cells.length !== width * height
        ) {
          return;
        }

        const tileset = [];
        const solid = [];
        const attributes = [];
        const grid = [];

        for (let index = 0; index < data.tiles.length; index++) {
          const tile = data.tiles[index];

          if (
            !tile ||
            typeof tile.spriteName !== "string" ||
            typeof tile.name !== "string" ||
            !Number.isInteger(tile.costumeIndex) ||
            typeof tile.dataURI !== "string" ||
            !Array.isArray(tile.attributes)
          ) {
            return;
          }

          const id = index + 1;

          tileset.push([id, tile.spriteName, tile.name, tile.dataURI]);

          if (tile.solid === true) {
            solid.push(id);
          }

          if (tile.attributes.length > 0) {
            attributes.push([id, tile.attributes]);
          }
        }

        for (const cell of data.cells) {
          if (cell === null) {
            grid.push(0);
            continue;
          }

          if (
            !Number.isInteger(cell) ||
            cell < 0 ||
            cell >= data.tiles.length
          ) {
            return;
          }

          grid.push(cell + 1);
        }

        tilemap = {
          columns: width,
          rows: height,
          tileSize:
            Number.isFinite(data.tileSize) && data.tileSize > 0
              ? data.tileSize
              : 24,
          originalTileSize:
            Number.isFinite(data.originalTileSize) && data.originalTileSize > 0
              ? data.originalTileSize
              : Number.isFinite(data.tileSize) && data.tileSize > 0
                ? data.tileSize
                : 24,
          grid,
          tileset,
          solid,
          attributes,
        };
      }

      if (restoreState(tilemap)) {
        markDirty();
      }
    }

    hideTilemap() {
      if (render.penDrawableId === null) return;
      runtime.renderer.updateDrawableVisible(render.penDrawableId, false);
    }

    columnAtX(args) {
      if (state.columns === 0) return 0;
      return Math.floor(
        (Scratch.Cast.toNumber(args.X) - state.originX) / state.tileSize
      );
    }

    rowAtY(args) {
      if (state.columns === 0) return 0;
      return Math.floor(
        (state.originY - Scratch.Cast.toNumber(args.Y)) / state.tileSize
      );
    }

    xAtColumn(args) {
      if (state.columns === 0) return 0;
      return (
        (Math.round(Scratch.Cast.toNumber(args.COLUMN)) + 0.5) * state.tileSize
      );
    }

    yAtRow(args) {
      if (state.columns === 0) return 0;
      return (
        -(Math.round(Scratch.Cast.toNumber(args.ROW)) + 0.5) * state.tileSize
      );
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
      runtime.renderer.updateDrawableVisible(render.penDrawableId, true);

      const originX = Scratch.Cast.toNumber(args.X);
      const originY = Scratch.Cast.toNumber(args.Y);
      state.originX = originX;
      state.originY = originY;

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

      const drawKey = [
        render.revision,
        originX,
        originY,
        state.columns,
        state.rows,
        state.tileSize,
        minColumn,
        maxColumn,
        minRow,
        maxRow,
      ].join(":");

      if (render.lastDrawKey === drawKey) return;

      runtime.renderer.penClear(render.penSkinId);

      for (let row = minRow; row <= maxRow; row++) {
        for (let column = minColumn; column <= maxColumn; column++) {
          const tileId = state.grid[indexFor(column, row)];
          if (tileId === 0) continue;

          const skinId = getTileSkinId(tileId);
          if (skinId === null) continue;

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
            centerY,
          ]);
          runtime.renderer.penStamp(render.penSkinId, render.stampDrawableId);
        }
      }

      runtime.renderer.updateDrawablePosition(render.stampDrawableId, [
        OFFSTAGE_X,
        OFFSTAGE_Y,
      ]);
      render.lastDrawKey = drawKey;
    }
  }

  Scratch.extensions.register(new Tiles());
})(Scratch);
