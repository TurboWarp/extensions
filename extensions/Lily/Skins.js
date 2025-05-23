// Name: Skins
// ID: lmsSkins
// Description: Have your sprites render as other images or costumes.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>
// License: MIT AND LGPL-3.0

(function (Scratch) {
  "use strict";

  const requireNonPackagedRuntime = (blockName) => {
    if (Scratch.vm.runtime.isPackaged) {
      alert(
        `To use the Skins ${blockName} block, the creator of the packaged project must uncheck "Remove raw asset data after loading to save RAM" under advanced settings in the packager.`
      );
      return false;
    }
    return true;
  };

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const renderer = runtime.renderer;
  const Cast = Scratch.Cast;

  const createSVGSkin = (...args) => {
    const skinId = renderer.createSVGSkin(...args);
    if (!skinId) return;
    const svgSkin = renderer._allSkins[skinId];
    if (!svgSkin) return;
    // To prevent a issue in the skin loading we will override the onload event ourself.
    const _onload = svgSkin._svgImage.onload;
    svgSkin._svgImage.onload = /**
     * @this {RenderWebGL.SVGSkin}
     */ function (ev) {
      // Reimplement the begining logic of SVGSkin to fix a loading error.
      if (!this._size) throw "_size race";
      if (this._size[0] === 0 || this._size[1] === 0) {
        Object.getPrototypeOf(
          vm.renderer.exports.SVGSkin
        ).prototype.setEmptyImageData.call(this);
        return;
      }
      const maxDimension = Math.ceil(Math.max(this._size[0], this._size[1]));
      const rendererMax = this._renderer.maxTextureDimension;
      let testScale = 2;
      for (
        testScale;
        maxDimension * testScale <= rendererMax;
        testScale = testScale * 2
      ) {
        this._maxTextureScale = testScale;
      }
      this.resetMIPs();
      const _rotationCenter = this.calculateRotationCenter();
      if (!Array.isArray(this._rotationCenter)) throw "rotationCenter race";
      return _onload.call(this, ev);
    }.bind(svgSkin);
    return skinId;
  };

  /**
   * @param {RenderWebGL.SVGSkin} svgSkin
   * @returns {Promise<boolean>}
   */
  const svgSkinFinishedLoading = (svgSkin) =>
    new Promise((resolve) => {
      if (svgSkin._svgImageLoaded) {
        resolve(true);
      } else {
        svgSkin._svgImage.addEventListener("load", () => {
          resolve(true);
        });
        svgSkin._svgImage.addEventListener("error", () => {
          resolve(false);
        });
      }
    });

  const createdSkins = Object.create(null);

  class Skins {
    constructor() {
      runtime.on("PROJECT_START", () => {
        this._refreshTargets();
      });

      runtime.on("PROJECT_STOP_ALL", () => {
        this._refreshTargets();
      });
    }

    getInfo() {
      return {
        id: "lmsSkins",
        name: Scratch.translate("Skins"),
        color1: "#6b56ff",
        color2: "#604de6",
        color3: "#5645cc",
        docsURI: "https://extensions.turbowarp.org/Lily/Skins",
        blocks: [
          {
            opcode: "registerSVGSkin",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("create SVG skin [SVG] as [NAME]"),
            arguments: {
              SVG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "<svg />",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my skin",
              },
            },
          },

          "---",

          {
            opcode: "registerCostumeSkin",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("load skin from [COSTUME] as [NAME]"),
            arguments: {
              COSTUME: {
                type: Scratch.ArgumentType.COSTUME,
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my skin",
              },
            },
          },
          {
            opcode: "registerURLSkin",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("load skin from URL [URL] as [NAME]"),
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/dango.png",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my skin",
              },
            },
          },
          {
            opcode: "getSkinLoaded",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("skin [NAME] is loaded?"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my skin",
              },
            },
          },

          "---",

          {
            opcode: "setSkin",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set skin of [TARGET] to [NAME]"),
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "targetMenu",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my skin",
              },
            },
          },
          {
            opcode: "restoreSkin",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("restore skin of [TARGET]"),
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "targetMenu",
              },
            },
          },
          {
            opcode: "restoreTargets",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("restore targets with skin [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my skin",
              },
            },
          },

          "---",

          {
            opcode: "getCurrentSkin",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current skin of [TARGET]"),
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "targetMenu",
              },
            },
          },
          {
            opcode: "getSkinAttribute",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[ATTRIBUTE] of skin [NAME]"),
            arguments: {
              ATTRIBUTE: {
                type: Scratch.ArgumentType.STRING,
                menu: "skinAttributes",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my skin",
              },
            },
          },

          "---",

          {
            opcode: "deleteSkin",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete skin [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my skin",
              },
            },
          },
          {
            opcode: "deleteAllSkins",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete all skins"),
          },
        ],
        menus: {
          targetMenu: {
            acceptReporters: true,
            items: "_getTargets",
          },
          skinAttributes: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("width"),
                value: "width",
              },
              {
                text: Scratch.translate("height"),
                value: "height",
              },
            ],
          },
        },
      };
    }

    _disposeSafe(skinId, skinName) {
      if (renderer._allSkins[skinId]) renderer.destroySkin(skinId);
      if (typeof skinName !== "undefined") {
        if (createdSkins[skinName] !== skinId) {
          throw new Error(
            `Lily/Skins: skinName "${skinName}" mismatched with skinId "${skinId}". actual value of "${
              skinName
            }" is "${createdSkins[skinName]}". please report this to the developers`
          );
        }
        delete createdSkins[skinName];
      }
    }

    async registerSVGSkin(args) {
      const skinName = `lms-${Cast.toString(args.NAME)}`;
      const svgData = Cast.toString(args.SVG);

      let oldSkinId = null;
      if (createdSkins[skinName]) {
        oldSkinId = createdSkins[skinName];
      }

      // This generally takes a few frames, so yield the block
      const skinId = createSVGSkin(svgData);
      createdSkins[skinName] = skinId;

      if (!(await svgSkinFinishedLoading(renderer._allSkins[skinId]))) {
        this._disposeSafe(skinId, skinName);
        debugger;
        return;
      }

      if (oldSkinId) {
        if (renderer._allSkins[oldSkinId])
          this._refreshTargetsFromID(oldSkinId, false, skinId);
        this._disposeSafe(oldSkinId);
      }
    }

    async registerCostumeSkin(args, util) {
      if (!requireNonPackagedRuntime("add costume skin")) {
        return;
      }

      const skinName = `lms-${Cast.toString(args.NAME)}`;
      const costumeIndex = util.target.getCostumeIndexByName(args.COSTUME);
      if (costumeIndex === -1) return;
      const costume = util.target.sprite.costumes[costumeIndex];

      const url = costume.asset.encodeDataURI();
      const rotationCenterX = costume.rotationCenterX;
      const rotationCenterY = costume.rotationCenterY;

      let rotationCenter = [rotationCenterX, rotationCenterY];
      if (!rotationCenterX || !rotationCenterY) rotationCenter = null;

      let oldSkinId = null;
      if (createdSkins[skinName]) {
        oldSkinId = createdSkins[skinName];
      }

      const skinId = await this._createURLSkin(url, rotationCenter);
      const skin = renderer._allSkins[skinId];
      if (!skin || !skin._svgImage || !skin._svgImage.onload) {
        this._disposeSafe(skinId);
        return;
      }
      const _onload = skin._svgImage.onload;
      skin._svgImage.onload = (...args) => {
        try {
          return _onload.apply(skin, args);
        } catch (err) {
          // Handle a race condition.
          if (err !== "rotationCenter race") throw err;
          this._disposeSafe(skinId, skinName);
          return;
        }
      };
      createdSkins[skinName] = skinId;

      if (oldSkinId) {
        if (renderer._allSkins[oldSkinId])
          this._refreshTargetsFromID(oldSkinId, false, skinId);
        this._disposeSafe(oldSkinId);
      }
    }

    async registerURLSkin(args) {
      const skinName = `lms-${Cast.toString(args.NAME)}`;
      const url = Cast.toString(args.URL);

      let oldSkinId = null;
      if (createdSkins[skinName]) {
        oldSkinId = createdSkins[skinName];
      }

      const skinId = await this._createURLSkin(url);
      if (!skinId) return;
      createdSkins[skinName] = skinId;

      if (oldSkinId) {
        if (renderer._allSkins[oldSkinId])
          this._refreshTargetsFromID(oldSkinId, false, skinId);
        this._disposeSafe(oldSkinId);
      }
    }

    getSkinLoaded(args) {
      const skinName = `lms-${Cast.toString(args.NAME)}`;
      return !!createdSkins[skinName];
    }

    setSkin(args, util) {
      const skinName = `lms-${Cast.toString(args.NAME)}`;
      if (!createdSkins[skinName]) return;
      const skinId = createdSkins[skinName];
      // Make sure the skin we are setting still well.. exists.
      if (!renderer._allSkins[skinId]) {
        this._disposeSafe(skinId, skinName);
        return;
      }

      const targetName = Cast.toString(args.TARGET);
      const target = this._getTargetFromMenu(targetName, util);
      if (!target) return;
      const drawableID = target.drawableID;

      renderer._allDrawables[drawableID].skin = renderer._allSkins[skinId];
    }

    restoreSkin(args, util) {
      const targetName = Cast.toString(args.TARGET);
      const target = this._getTargetFromMenu(targetName, util);
      if (!target) return;
      target.updateAllDrawableProperties();
    }

    getCurrentSkin(args, util) {
      const targetName = Cast.toString(args.TARGET);
      const target = this._getTargetFromMenu(targetName, util);
      if (!target) return;
      const drawableID = target.drawableID;

      const skinId = renderer._allDrawables[drawableID].skin._id;
      const skinName = this._getSkinNameFromID(skinId);
      return skinName ? skinName.replace("lms-", "") : "";
    }

    getSkinAttribute(args) {
      const skins = renderer._allSkins;
      const skinName = `lms-${Cast.toString(args.NAME)}`;

      if (!createdSkins[skinName]) return 0;
      const skinId = createdSkins[skinName];
      if (!skins[skinId]) {
        // If the skin doesnt exist in the renderer we should probably just delete it on our end...
        this.safeDispose(skinId, skinName);
        return 0;
      }

      const size = skins[skinId].size;
      const attribute = Cast.toString(args.ATTRIBUTE).toLowerCase();

      switch (attribute) {
        case "width":
          return Math.ceil(size[0]);
        case "height":
          return Math.ceil(size[1]);
        default:
          return 0;
      }
    }

    deleteSkin(args) {
      const skinName = `lms-${Cast.toString(args.NAME)}`;
      if (!createdSkins[skinName]) return;
      const skinId = createdSkins[skinName];

      this._refreshTargetsFromID(skinId, true);
      renderer.destroySkin(skinId);
      delete createdSkins[skinName];
    }

    deleteAllSkins() {
      this._refreshTargets();
      for (const skinName in createdSkins) {
        this._disposeSafe(createdSkins[skinName], skinName);
      }
    }

    restoreTargets(args) {
      const skinName = `lms-${Cast.toString(args.NAME)}`;
      if (!createdSkins[skinName]) return;
      const skinId = createdSkins[skinName];

      this._refreshTargetsFromID(skinId, true);
    }

    // Utility Functions

    _refreshTargetsFromID(skinId, reset, newId) {
      const drawables = renderer._allDrawables;
      const skins = renderer._allSkins;

      for (const target of runtime.targets) {
        const drawableID = target.drawableID;
        const targetSkin = drawables[drawableID].skin.id;

        if (targetSkin === skinId) {
          target.updateAllDrawableProperties();
          if (!reset)
            drawables[drawableID].skin = newId ? skins[newId] : skins[skinId];
        }
      }
    }

    _refreshTargets() {
      for (const target of runtime.targets) {
        target.updateAllDrawableProperties();
      }
    }

    _getSkinNameFromID(skinId) {
      for (const skinName in createdSkins) {
        if (createdSkins[skinName] === skinId) return skinName;
      }
    }

    _getTargetFromMenu(targetName, util) {
      let target = Scratch.vm.runtime.getSpriteTargetByName(targetName);
      if (targetName === "_myself_") target = util.target;
      if (targetName === "_stage_") target = runtime.getTargetForStage();
      return target;
    }

    async _createURLSkin(URL, rotationCenter) {
      let imageData;
      if (await Scratch.canFetch(URL)) {
        imageData = await Scratch.fetch(URL);
      } else {
        return;
      }

      const contentType = imageData.headers.get("Content-Type");
      if (contentType === "image/svg+xml") {
        return createSVGSkin(await imageData.text(), rotationCenter);
      } else if (
        contentType === "image/png" ||
        contentType === "image/jpeg" ||
        contentType === "image/bmp"
      ) {
        // eslint-disable-next-line extension/check-can-fetch
        const output = new Image();
        output.src = URL;
        output.crossOrigin = "anonymous";
        await output.decode();
        return renderer.createBitmapSkin(output);
      }
    }

    _getTargets() {
      const spriteNames = [
        { text: "myself", value: "_myself_" },
        { text: "Stage", value: "_stage_" },
      ];
      const targets = Scratch.vm.runtime.targets;
      for (let index = 1; index < targets.length; index++) {
        const target = targets[index];
        if (target.isOriginal) {
          const targetName = target.getName();
          spriteNames.push({
            text: targetName,
            value: targetName,
          });
        }
      }
      return spriteNames;
    }
  }
  Scratch.extensions.register(new Skins());
})(Scratch);
