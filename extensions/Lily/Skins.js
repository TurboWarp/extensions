(function (Scratch) {
  'use strict';

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const renderer = runtime.renderer;
  const Cast = Scratch.Cast;

  var createdSkins = [];

  class Skins {
    getInfo() {
      return {
        id: 'lmsSkins',
        name: 'Skins',
        color1: '#6b56ff',
        blocks: [
          {
            opcode: 'registerSVGSkin',
            blockType: Scratch.BlockType.COMMAND,
            text: 'create SVG skin [SVG] as [NAME]',
            arguments: {
              SVG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '<svg />'
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my skin'
              }
            }
          },

          '---',

          {
            opcode: 'registerCostumeSkin',
            blockType: Scratch.BlockType.COMMAND,
            text: 'load skin from [COSTUME] as [NAME]',
            arguments: {
              COSTUME: {
                type: Scratch.ArgumentType.COSTUME
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my skin'
              }
            }
          },
          {
            opcode: 'registerURLSkin',
            blockType: Scratch.BlockType.COMMAND,
            text: 'load skin from URL [URL] as [NAME]',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my skin'
              }
            }
          },
          { // Current Query: Is this even necessary?
            opcode: 'getSkinLoaded',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'skin [NAME] is loaded?',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my skin'
              }
            }
          },

          '---',

          {
            opcode: 'setSkin',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set skin of [TARGET] to [NAME]',
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: 'targetMenu'
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my skin'
              }
            }
          },
          {
            opcode: 'restoreSkin',
            blockType: Scratch.BlockType.COMMAND,
            text: 'restore skin of [TARGET]',
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: 'targetMenu'
              }
            }
          },
          {
            opcode: 'restoreTargets',
            blockType: Scratch.BlockType.COMMAND,
            text: 'restore targets with skin [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my skin'
              }
            }
          },
          {
            opcode: 'getCurrentSkin',
            blockType: Scratch.BlockType.REPORTER,
            text: 'current skin of [TARGET]',
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: 'targetMenu'
              }
            }
          },

          '---',

          {
            opcode: 'deleteSkin',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete skin [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my skin'
              }
            }
          },
          {
            opcode: 'deleteAllSkins',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete all skins'
          }
        ],
        menus: {
          // Targets have acceptReporters: true
          targetMenu: {
            acceptReporters: true,
            items: '_getTargets'
          }
        }
      };
    }

    async registerSVGSkin (args, util) {
      const skinName = args.NAME;
      const svgData = args.SVG;

      let oldSkinId = null;
      if (createdSkins[skinName]) {
        oldSkinId = createdSkins[skinName];
      }

      // This generally takes a few frames, so yield the block
      const skinId = await renderer.createSVGSkin(svgData);
      createdSkins[skinName] = skinId;

      if (oldSkinId) {
        this._refreshTargetsFromID(oldSkinId, false, skinId);
        renderer.destroySkin(oldSkinId);
      }
    }

    async registerCostumeSkin (args, util) {
      const skinName = args.NAME;
      const costumeIndex = util.target.getCostumeIndexByName(args.COSTUME);
      const url = util.target.sprite.costumes[costumeIndex].asset.encodeDataURI();

      let oldSkinId = null;
      if (createdSkins[skinName]) {
        oldSkinId = createdSkins[skinName];
      }

      const skinId = await this._createURLSkin(url);
      createdSkins[skinName] = skinId;

      if (oldSkinId) {
        this._refreshTargetsFromID(oldSkinId, false, skinId);
        renderer.destroySkin(oldSkinId);
      }
    }

    async registerURLSkin (args, util) {
      const skinName = args.NAME;
      const url = args.URL;

      let oldSkinId = null;
      if (createdSkins[skinName]) {
        oldSkinId = createdSkins[skinName];
      }

      const skinId = await this._createURLSkin(url);
      createdSkins[skinName] = skinId;

      if (oldSkinId) {
        this._refreshTargetsFromID(oldSkinId, false, skinId);
        renderer.destroySkin(oldSkinId);
      }
    }

    getSkinLoaded (args, util) {
      const skinName = args.NAME;
      return !!(createdSkins[skinName]);
    }

    setSkin (args, util) {
      const skinName = args.NAME;
      if (!createdSkins[skinName]) return;

      let target = this._getTargetFromMenu(args.TARGET, util);
      const drawableID = target.drawableID;

      const skinId = createdSkins[skinName];
      renderer._allDrawables[drawableID].skin = renderer._allSkins[skinId];
    }

    restoreSkin (args, util) {
      let target = this._getTargetFromMenu(args.TARGET, util);
      target.updateAllDrawableProperties();
    }

    getCurrentSkin (args, util) {
      let target = this._getTargetFromMenu(args.TARGET, util);
      const drawableID = target.drawableID;

      const skinId = renderer._allDrawables[drawableID].skin._id;
      const skinName = this._getSkinNameFromID(skinId);
      return (skinName) ? skinName : '';
    }

    deleteSkin (args, util) {
      const skinName = args.NAME;
      if (!createdSkins[skinName]) return;
      const skinId = createdSkins[skinName];

      this._refreshTargetsFromID(skinId, true);
      renderer.destroySkin(skinId);
      Reflect.deleteProperty(createdSkins, skinName);
    }

    deleteAllSkins (args, util) {
      this._refreshTargets();
      for (let i = 0; i < createdSkins.length; i++) renderer.destroySkin(createdSkins[i]);
      createdSkins = [];
    }

    restoreTargets (args, util) {
      const skinName = args.NAME;
      if (!createdSkins[skinName]) return;
      const skinId = createdSkins[skinName];

      this._refreshTargetsFromID(skinId, false);
    }

    // Utility Functions

    _refreshTargetsFromID (skinId, reset, newId) {
      const drawables = renderer._allDrawables;
      const skins = renderer._allSkins;

      for (const target of runtime.targets) {
        const drawableID = target.drawableID;
        const targetSkin = drawables[drawableID].skin.id;

        if (targetSkin === skinId) {
          target.updateAllDrawableProperties();
          if (!reset) drawables[drawableID].skin = (newId) ? skins[newId] : skins[skinId];
        }
      }
    }

    _refreshTargets () {
      for (const target of runtime.targets) {
        target.updateAllDrawableProperties();
      }
    }

    _getSkinNameFromID (skinId) {
      for (const skinName in createdSkins) {
        if (createdSkins[skinName] === skinId) return skinName;
      }
    }

    _getTargetFromMenu (targetName, util) {
      let target = Scratch.vm.runtime.getSpriteTargetByName(targetName);
      if (targetName === '_myself_') target = util.target;
      if (targetName === '_stage_') target = runtime.getTargetForStage();
      return target;
    }

    async _createURLSkin (URL) {
      const imageData = await Scratch.fetch(URL);
      const contentType = imageData.headers.get("Content-Type");
      if (contentType === 'image/svg+xml') {
        return renderer.createSVGSkin(await imageData.text());
      } else if (contentType === 'image/png' || contentType === 'image/jpeg' || contentType === 'image/bmp') {
        const output = new Image();
        output.src = URL;
        output.crossOrigin = 'anonymous';
        await output.decode();
        return renderer.createBitmapSkin(output);
      }
    }

    _getTargets() {
      const spriteNames = [
        {text: 'myself', value: '_myself_'},
        {text: 'Stage', value: '_stage_'}
      ];
      const targets = Scratch.vm.runtime.targets;
      const myself = Scratch.vm.runtime.getEditingTarget().getName();
      for (let index = 1; index < targets.length; index++) {
        const target = targets[index];
        if (target.isOriginal) {
          const targetName = target.getName();
          spriteNames.push({
            text: targetName,
            value: targetName
          });
        }
      }
      return spriteNames;
    }

  }
  Scratch.extensions.register(new Skins());
})(Scratch);
