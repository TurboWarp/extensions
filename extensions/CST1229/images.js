(function (Scratch) {
  "use strict";
  const QueryImage = {
    WIDTH: "width",
    HEIGHT: "height",
    TOP: "top",
    BOTTOM: "bottom",
    LEFT: "left",
    RIGHT: "right",
    ROTATION_CENTER_X: "rotation center x",
    ROTATION_CENTER_Y: "rotation center y",
  };

  class ImagesExt {
    constructor(vm) {
      this.vm = vm;
      this.render = vm.runtime.renderer;
      [];

      this.createdImages = new Set();
      this.validImages = new Set();

      Scratch.vm.runtime.on("RUNTIME_DISPOSED", () => {
        this.deleteAllImages();
      });
    }

    getInfo() {
      return {
        id: "images",
        name: "Images",
        blocks: [
          {
            opcode: "getImage",
            blockType: Scratch.BlockType.REPORTER,
            text: "new image from URL [IMAGEURL]",
            arguments: {
              IMAGEURL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/robot.png",
              },
            },
            disableMonitor: true,
          },

          // hidden because of bugs
          {
            opcode: "penTrailsImage",
            blockType: Scratch.BlockType.REPORTER,
            text: "pen trails as image",
            arguments: {},
            hideFromPalette: true,
          },

          {
            opcode: "queryImage",
            blockType: Scratch.BlockType.REPORTER,
            text: "[QUERY] of image [IMG]",
            arguments: {
              QUERY: {
                type: Scratch.ArgumentType.STRING,
                menu: "queryImage",
                defaultValue: "width",
              },
              IMG: {
                // Intentional null input to require dropping a block in
                type: null,
                defaultValue: "",
              },
            },
            disableMonitor: true,
          },
          // legacy block, for compatiblity with projects that
          // used images v1
          {
            opcode: "drawImage",
            blockType: Scratch.BlockType.COMMAND,
            text: "stamp image [IMG] at x: [X] y: [Y] x scale: [XSCALE] y scale: [YSCALE]",
            arguments: {
              IMG: {
                // Intentional null input to require dropping a block in
                type: null,
                defaultValue: "",
              },
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              XSCALE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
              YSCALE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
            hideFromPalette: true,
          },
          {
            opcode: "switchToImage",
            blockType: Scratch.BlockType.COMMAND,
            text: "switch costume to image [IMG]",
            arguments: {
              IMG: {
                // Intentional null input to require dropping a block in
                type: null,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "imageID",
            blockType: Scratch.BlockType.REPORTER,
            text: "current image ID",
            arguments: {},
            disableMonitor: true,
          },
          {
            opcode: "resetCostume",
            blockType: Scratch.BlockType.COMMAND,
            text: "switch back to costume",
            arguments: {},
          },
          {
            opcode: "deleteImage",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete image [IMG]",
            arguments: {
              IMG: {
                type: null,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "deleteAllImages",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete all images",
            arguments: {},
          },
        ],
        menus: {
          queryImage: {
            acceptReporters: false,
            items: this._queryImageMenu(),
          },
        },
      };
    }

    _queryImageMenu() {
      const get = (param) => QueryImage[param];
      return [
        get("WIDTH"),
        get("HEIGHT"),
        get("TOP"),
        get("BOTTOM"),
        get("LEFT"),
        get("RIGHT"),
        get("ROTATION_CENTER_X"),
        get("ROTATION_CENTER_Y"),
      ];
    }

    _createdImage(id) {
      if (!this.render || id === undefined || !this.render._allSkins[id])
        return "";
      this.createdImages.add(id);
      this.validImages.add(id);
      return id;
    }
    _deletedImage(id) {
      this.createdImages.delete(id);
      this.validImages.delete(id);
      return id;
    }
    _gotImage(id) {
      if (!this.render || id === undefined || !this.render._allSkins[id])
        return "";
      this.validImages.add(id);
      return id;
    }

    async getImage({ IMAGEURL }) {
      IMAGEURL = Scratch.Cast.toString(IMAGEURL);
      try {
        const resp = await Scratch.fetch(IMAGEURL);
        const type = resp.headers.get("Content-Type");

        if (!resp.ok) {
          return "";
        }

        let skinId;
        switch (type) {
          case "image/svg+xml":
          case "image/svg":
            skinId = this.render.createSVGSkin(await resp.text());
            break;
          case "image/png":
          case "image/bmp":
          case "image/jpeg":
            {
              if (!(await Scratch.canFetch(IMAGEURL))) return;
              // eslint-disable-next-line no-restricted-syntax
              const image = new Image();
              image.crossOrigin = "anonymous";
              image.src = IMAGEURL;
              await image.decode();
              skinId = this.render.createBitmapSkin(image, 1);
            }
            break;
          default:
            return "";
        }

        this._createdImage(skinId);
        return skinId;
      } catch (e) {
        console.error("Error creating image:", e);
      }
      return "";
    }

    penTrailsImage() {
      return this._gotImage(this.render._penSkinId);
    }

    // stamp image with position and stretch
    // (only for compatibility with images v1, requires
    // making pen create the pen layer first)
    drawImage({ IMG, X, Y, XSCALE = 100, YSCALE = 100 }) {
      let drawableID = null;
      try {
        if (!this.render._penSkinId) return;
        if (!this.render._allSkins[IMG] || !this.validImages.has(IMG)) return;

        // Create a temporary drawable to stamp the image
        drawableID = this.render.createDrawable("sprite");
        const img = this.render._allDrawables[drawableID];
        img.updateVisible(false);
        img.skin = this.render._allSkins[IMG];

        img.updatePosition([Number(X) || 0, Number(Y) || 0]);
        img.updateScale([Number(XSCALE) || 0, Number(YSCALE) || 0]);
        this.render.penStamp(this.render._penSkinId, drawableID);
      } catch (e) {
        console.error("Error drawing image:", e);
      } finally {
        // Delete the temporary drawable
        if (drawableID !== null) {
          this.render.destroyDrawable(drawableID, "sprite");
        }
      }
    }

    deleteImage({ IMG }) {
      try {
        IMG = Scratch.Cast.toNumber(IMG);
        if (!this.render._allSkins[IMG] || !this.createdImages.has(IMG)) return;

        const targetsToReset = [];
        for (const target of this.vm.runtime.targets) {
          const drawable = this.render._allDrawables[target.drawableID];
          if (drawable.skin.id === IMG) {
            targetsToReset.push(target);
          }
        }

        this._deleteImage(IMG);

        for (const target of targetsToReset) {
          // Reset costume
          target.updateAllDrawableProperties();
        }
      } catch (e) {
        console.error("Error deleting image:", e);
      }
    }
    deleteAllImages() {
      try {
        for (const skinId of this.createdImages) {
          this._deleteImage(skinId);
        }
        for (const target of this.vm.runtime.targets) {
          // Reset costume
          target.updateAllDrawableProperties();
        }
      } catch (e) {
        console.error("Error deleting all images:", e);
      }
    }
    _deleteImage(skinId) {
      this._deletedImage(skinId);
      try {
        this.render._allSkins[skinId].dispose();
      } catch (e) {
        console.error("Error _deleting image:", e);
      }
    }

    switchToImage({ IMG }, util) {
      IMG = Scratch.Cast.toNumber(IMG);
      if (!this.render._allSkins[IMG] || !this.validImages.has(IMG)) return;

      const drawableID = util.target.drawableID;
      this.render._allDrawables[drawableID].skin = this.render._allSkins[IMG];
    }
    resetCostume(_args, util) {
      util.target.updateAllDrawableProperties();
    }

    imageID(_args, util) {
      const drawable = this.render._allDrawables[util.target.drawableID];
      if (!drawable || !drawable.skin) return "";

      const skinID = drawable.skin.id;
      if (!this.validImages.has(skinID)) return "";
      return skinID;
    }

    queryImage({ QUERY, IMG }) {
      if (!this.render._allSkins[IMG] || !this.validImages.has(IMG)) return "";

      IMG = Scratch.Cast.toNumber(IMG);

      let returnValue = 0;
      let drawableID = null;
      try {
        // Create a temporary drawable to query the image
        drawableID = this.render.createDrawable("sprite");
        const img = this.render._allDrawables[drawableID];
        img.updateVisible(false);
        img.skin = this.render._allSkins[IMG];

        const bounds = img.getFastBounds();
        const rotationCenter = img.skin.rotationCenter;

        switch (QUERY) {
          case QueryImage.WIDTH:
            returnValue = bounds.right - bounds.left;
            break;
          case QueryImage.HEIGHT:
            returnValue = bounds.top - bounds.bottom;
            break;
          case QueryImage.ROTATION_CENTER_X:
            returnValue = rotationCenter[0];
            break;
          case QueryImage.ROTATION_CENTER_Y:
            returnValue = rotationCenter[1];
            break;
          case QueryImage.TOP:
            returnValue = bounds.top;
            break;
          case QueryImage.BOTTOM:
            returnValue = bounds.bottom;
            break;
          case QueryImage.LEFT:
            returnValue = bounds.left;
            break;
          case QueryImage.RIGHT:
            returnValue = bounds.right;
            break;
          default:
            returnValue = 0;
        }
      } catch (e) {
        console.error("Error querying image:", e);
      } finally {
        // Delete the temporary drawable
        if (drawableID !== null) {
          this.render._allDrawables[drawableID].dispose();
        }
      }
      return Math.round(returnValue / 0.01) * 0.01;
    }
  }

  if (!Scratch.extensions.unsandboxed)
    throw new Error("This extension cannot run in sandboxed mode.");
  Scratch.extensions.register(new ImagesExt(Scratch.vm));
})(globalThis.Scratch);
