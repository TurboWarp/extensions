// Name: Looks Plus
// ID: lmsLooksPlus
// Description: Expands upon the looks category, allowing you to show/hide, get costume data and edit SVG skins on sprites.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>

(function (Scratch) {
  "use strict";

  const menuIconURI =
    "data:image/png;base64,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";

  const requireNonPackagedRuntime = (blockName) => {
    if (Scratch.vm.runtime.isPackaged) {
      alert(
        `To use the Looks+ ${blockName} block, the creator of the packaged project must uncheck "Remove raw asset data after loading to save RAM" under advanced settings in the packager.`
      );
      return false;
    }
    return true;
  };

  /**
   * @param {VM.BlockUtility} util
   * @param {unknown} targetName
   */
  const getSpriteTargetByName = (util, targetName) => {
    const nameString = Scratch.Cast.toString(targetName);
    const target = util.target;
    if (target.getName() === nameString) {
      return target;
    }
    return util.runtime.getSpriteTargetByName(nameString);
  };

  class LooksPlus {
    getInfo() {
      return {
        id: "lmsLooksPlus",
        name: "Looks+",
        color1: "#9966FF",
        color2: "#855CD6",
        color3: "#774DCB",
        menuIconURI: menuIconURI,
        blocks: [
          {
            opcode: "showSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: "show [TARGET]",
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "spriteMenu",
              },
            },
          },
          {
            opcode: "hideSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: "hide [TARGET]",
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "spriteMenu",
              },
            },
          },
          {
            opcode: "spriteVisible",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[TARGET] visible?",
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "spriteMenu",
              },
            },
          },

          "---",

          {
            opcode: "setLayerTo",
            blockType: Scratch.BlockType.COMMAND,
            text: "set layer # of [TARGET] to [LAYER]",
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "spriteMenu",
              },
              LAYER: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
              },
            },
          },
          {
            opcode: "spriteLayerNumber",
            blockType: Scratch.BlockType.REPORTER,
            text: "layer # of [TARGET]",
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "spriteMenu",
              },
            },
          },
          {
            opcode: "effectValue",
            blockType: Scratch.BlockType.REPORTER,
            text: "[EFFECT] effect of [TARGET]",
            arguments: {
              EFFECT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "color",
                menu: "effectMenu",
              },
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "spriteMenu",
              },
            },
          },

          "---",

          {
            opcode: "targetCostumeNumber",
            blockType: Scratch.BlockType.REPORTER,
            text: "# of costumes in [TARGET]",
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "spriteMenu",
              },
            },
          },
          {
            opcode: "costumeAttribute",
            blockType: Scratch.BlockType.REPORTER,
            text: "[ATTRIBUTE] of [COSTUME]",
            arguments: {
              ATTRIBUTE: {
                type: Scratch.ArgumentType.STRING,
                menu: "costumeAttribute",
              },
              COSTUME: {
                type: Scratch.ArgumentType.COSTUME,
              },
            },
          },

          "---",

          {
            opcode: "snapshotStage",
            blockType: Scratch.BlockType.REPORTER,
            text: "snapshot stage",
            disableMonitor: true,
          },

          "---",

          {
            opcode: "replaceCostumeContent",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [TYPE] for [COSTUME] to [CONTENT]",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "SVGPNG",
                defaultValue: "SVG",
              },
              COSTUME: {
                type: Scratch.ArgumentType.COSTUME,
              },
              CONTENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "<svg />",
              },
            },
          },
          {
            opcode: "restoreCostumeContent",
            blockType: Scratch.BlockType.COMMAND,
            text: "restore content for [COSTUME]",
            arguments: {
              COSTUME: {
                type: Scratch.ArgumentType.COSTUME,
              },
            },
          },
          {
            opcode: "costumeContent",
            blockType: Scratch.BlockType.REPORTER,
            text: "[CONTENT] of costume # [COSTUME] of [TARGET]",
            arguments: {
              CONTENT: {
                type: Scratch.ArgumentType.STRING,
                menu: "contentType",
                defaultValue: "content",
              },
              COSTUME: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "spriteMenu",
              },
            },
          },

          "---",

          {
            opcode: "replaceColors",
            blockType: Scratch.BlockType.REPORTER,
            text: "replace [COLOR1] with [COLOR2] in [SVG]",
            arguments: {
              COLOR1: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#FCB1E3",
              },
              COLOR2: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#8ECAFF",
              },
              SVG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "<svg />",
              },
            },
          },
          {
            opcode: "colorHex",
            blockType: Scratch.BlockType.REPORTER,
            text: "hex of [COLOR]",
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#FFD983",
              },
            },
          },
        ],
        menus: {
          effectMenu: {
            // false for Scratch parity
            acceptReporters: false,
            items: [
              {
                text: "color",
                value: "color",
              },
              {
                text: "fisheye",
                value: "fisheye",
              },
              {
                text: "whirl",
                value: "whirl",
              },
              {
                text: "pixelate",
                value: "pixelate",
              },
              {
                text: "mosaic",
                value: "mosaic",
              },
              {
                text: "brightness",
                value: "brightness",
              },
              {
                text: "ghost",
                value: "ghost",
              },
            ],
          },
          costumeAttribute: {
            acceptReporters: false,
            items: [
              {
                text: "width",
                value: "width",
              },
              {
                text: "height",
                value: "height",
              },
              {
                text: "format",
                value: "format",
              },
              {
                text: "rotation center x",
                value: "rotationCenterX",
              },
              {
                text: "rotation center y",
                value: "rotationCenterY",
              },
            ],
          },
          contentType: {
            acceptReporters: false,
            items: [
              {
                text: "content",
                value: "content",
              },
              {
                text: "dataURI",
                value: "dataURI",
              },
            ],
          },
          SVGPNG: {
            acceptReporters: false,
            items: [
              {
                text: "SVG",
                value: "SVG",
              },
            ],
          },
          spriteMenu: {
            acceptReporters: true,
            items: "getSprites",
          },
        },
      };
    }

    showSprite(args, util) {
      const target = getSpriteTargetByName(util, args.TARGET);
      if (target) {
        target.setVisible(true);
      }
    }

    hideSprite(args, util) {
      const target = getSpriteTargetByName(util, args.TARGET);
      if (target) {
        target.setVisible(false);
      }
    }

    spriteVisible(args, util) {
      const target = getSpriteTargetByName(util, args.TARGET);
      if (!target) {
        return false;
      }
      return Scratch.Cast.toBoolean(target.visible);
    }

    setLayerTo(args, util) {
      const target = getSpriteTargetByName(util, args.TARGET);
      if (!target) {
        return;
      }
      const drawableID = target.drawableID;
      const layerOrder = target.getLayerOrder();
      const newLayer = args.LAYER - layerOrder;
      target.renderer.setDrawableOrder(drawableID, newLayer, "sprite", true);
    }

    spriteLayerNumber(args, util) {
      const target = getSpriteTargetByName(util, args.TARGET);
      if (!target) {
        return 0;
      }
      return target.getLayerOrder();
    }

    effectValue(args, util) {
      const target = getSpriteTargetByName(util, args.TARGET);
      if (!target) {
        return 0;
      }
      const effects = target.effects;
      const name = Scratch.Cast.toString(args.EFFECT);
      if (Object.prototype.hasOwnProperty.call(effects, name)) {
        return effects[name];
      }
      // should never happen
      return 0;
    }

    costumeAttribute(args, util) {
      const costumeIndex = this.getCostumeInput(args.COSTUME, util.target);
      const costume = util.target.sprite.costumes[costumeIndex];
      if (!costume) {
        console.error("Costume doesn't exist");
        return 0;
      }

      const attribute = args.ATTRIBUTE;
      if (attribute === "width") {
        return Math.ceil(Scratch.Cast.toNumber(costume.size[0]));
      } else if (attribute === "height") {
        return Math.ceil(Scratch.Cast.toNumber(costume.size[1]));
      } else if (attribute === "format") {
        if (!requireNonPackagedRuntime("costume format")) {
          return "unknown";
        }
        return costume.asset.assetType.runtimeFormat;
      } else if (attribute === "rotationCenterX") {
        return costume.rotationCenterX;
      } else if (attribute === "rotationCenterY") {
        return costume.rotationCenterY;
      } else {
        return "";
      }
    }

    targetCostumeNumber(args, util) {
      const target = getSpriteTargetByName(util, args.TARGET);
      if (!target) {
        return 0;
      }
      return Scratch.Cast.toNumber(target.sprite.costumes.length);
    }

    snapshotStage(args, util) {
      return new Promise((resolve) => {
        Scratch.vm.runtime.renderer.requestSnapshot((uri) => {
          resolve(uri);
        });
      });
    }

    replaceCostumeContent(args, util) {
      const costumeIndex = this.getCostumeInput(args.COSTUME, util.target);
      const costume = util.target.sprite.costumes[costumeIndex];
      if (!costume) {
        console.error("Costume doesn't exist");
        return;
      }

      //This is here to ensure no changes are made to bitmap costumes, as changes are irreversible
      //Check will be removed when it's possible to edit bitmap skins
      const format = costume.asset.assetType.runtimeFormat;
      if (format !== "svg") {
        console.error("Costume is not vector");
        return;
      }

      const contentType = args.TYPE;
      const content = args.CONTENT;
      if (contentType === "SVG") {
        Scratch.vm.runtime.renderer.updateSVGSkin(
          costume.skinId,
          Scratch.Cast.toString(content)
        );
      } else {
        console.error("Options other than SVG are currently unavailable");
        return;
      }
      Scratch.vm.emitTargetsUpdate();
    }

    restoreCostumeContent(args, util) {
      const costumeIndex = this.getCostumeInput(args.COSTUME, util.target);
      const costume = util.target.sprite.costumes[costumeIndex];
      if (!costume) {
        console.error("Costume doesn't exist");
        return;
      }

      if (!requireNonPackagedRuntime("restore costume content")) {
        return;
      }

      //This is here to ensure no changes are made to bitmap costumes, as changes are irreversible
      //Check will be removed when it's possible to edit bitmap skins
      const format = costume.asset.assetType.runtimeFormat;
      if (format !== "svg") {
        console.error("Costume is not vector");
        return;
      }

      const content = costume.asset.decodeText();
      const rotationCenterX = costume.rotationCenterX;
      const rotationCenterY = costume.rotationCenterY;
      util.target.renderer.updateSVGSkin(costume.skinId, content, [
        rotationCenterX,
        rotationCenterY,
      ]);
    }

    costumeContent(args, util) {
      const target = getSpriteTargetByName(util, args.TARGET);
      if (!target) {
        console.error("Target does not exist");
        return "";
      }

      if (!requireNonPackagedRuntime("costume content")) {
        return "";
      }

      const costume = target.sprite.costumes[args.COSTUME - 1];
      if (!costume) {
        console.error("Target costume does not exist");
        return "";
      }

      const format = args.CONTENT;
      if (format === "content") {
        return costume.asset.decodeText();
      } else {
        return costume.asset.encodeDataURI();
      }
    }

    replaceColors(args, util) {
      const svg = Scratch.Cast.toString(args.SVG);
      const color1 = args.COLOR1;
      const color2 = args.COLOR2;
      try {
        return svg.replace(new RegExp(color1, "gi"), color2);
      } catch (e) {
        // regex was invalid, don't replace anything
        return svg;
      }
    }

    colorHex(args, util) {
      return args.COLOR;
    }

    getCostumeInput(costume, target) {
      if (typeof costume === "number") {
        costume = Math.round(costume - 1);
        if (costume === Infinity || costume === -Infinity || !costume) {
          costume = 0;
        }
        costume = this.wrapClamp(costume, 0, target.sprite.costumes.length - 1);
        return costume;
      } else {
        return target.getCostumeIndexByName(Scratch.Cast.toString(costume));
      }
    }

    wrapClamp(n, min, max) {
      const range = max - min + 1;
      return n - Math.floor((n - min) / range) * range;
    }

    getSprites() {
      const spriteNames = [];
      const targets = Scratch.vm.runtime.targets;
      const myself = Scratch.vm.runtime.getEditingTarget().getName();
      for (let index = 1; index < targets.length; index++) {
        const target = targets[index];
        if (target.isOriginal) {
          const targetName = target.getName();
          if (targetName === myself) {
            spriteNames.unshift({
              text: "this sprite",
              value: targetName,
            });
          } else {
            spriteNames.push({
              text: targetName,
              value: targetName,
            });
          }
        }
      }
      if (spriteNames.length > 0) {
        return spriteNames;
      } else {
        return [{ text: "", value: 0 }]; //this should never happen but it's a failsafe
      }
    }
  }
  Scratch.extensions.register(new LooksPlus());
})(Scratch);
