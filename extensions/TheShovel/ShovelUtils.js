// Name: ShovelUtils
// ID: ShovelUtils
// Description: A bunch of miscellaneous blocks.
// By: TheShovel

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("ShovelUtils must be run unsandboxed");
  }
  console.log("ShovelUtils v1.4");
  const vm = Scratch.vm;

  // Based on from https://www.growingwiththeweb.com/2017/12/fast-simple-js-fps-counter.html
  const times = [];
  let fps = vm.runtime.frameLoop.framerate;
  const oldStep = vm.runtime._step;
  vm.runtime._step = function () {
    oldStep.call(this);
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
  };

  class ShovelUtils {
    getInfo() {
      return {
        id: "ShovelUtils",
        name: "ShovelUtils",
        color1: "#f54242",
        color2: "#f54242",
        color3: "#f54242",
        docsURI: "https://extensions.turbowarp.org/TheShovel/ShovelUtils",
        blocks: [
          {
            opcode: "importImage",
            blockType: Scratch.BlockType.COMMAND,
            text: "import image from [TEXT] name [NAME]",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/dango.png",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Dango",
              },
            },
          },
          {
            opcode: "getlist",
            blockType: Scratch.BlockType.REPORTER,
            text: "get list [TEXT] as array",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "MyList",
              },
            },
          },
          {
            opcode: "setlist",
            blockType: Scratch.BlockType.COMMAND,
            text: "set list [NAME] to [TEXT]",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[1,2]",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "MyList",
              },
            },
          },
          {
            opcode: "importSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: "import sprite from [TEXT]",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Link or data uri here",
              },
            },
          },
          {
            opcode: "importSound",
            blockType: Scratch.BlockType.COMMAND,
            text: "import sound from [TEXT] name [NAME]",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/meow.mp3",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Meow",
              },
            },
          },
          {
            opcode: "importProject",
            blockType: Scratch.BlockType.COMMAND,
            text: "import project from [TEXT]",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue:
                  "https://extensions.turbowarp.org/samples/Box2D.sb3",
              },
            },
          },
          {
            opcode: "loadExtension",
            blockType: Scratch.BlockType.COMMAND,
            text: "load extension from [TEXT]",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/utilities.js",
              },
            },
          },

          {
            opcode: "restartProject",
            blockType: Scratch.BlockType.COMMAND,
            text: "restart project",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "deleteSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete sprite [SPRITE]",
            arguments: {
              SPRITE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Sprite1",
              },
            },
          },
          {
            opcode: "deleteImage",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete costume [COSNAME] in [SPRITE]",
            arguments: {
              COSNAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "costume1",
              },
              SPRITE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Sprite1",
              },
            },
          },
          {
            opcode: "setedtarget",
            blockType: Scratch.BlockType.COMMAND,
            text: "set editing target to [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Sprite1",
              },
            },
          },

          {
            opcode: "brightnessByColor",
            blockType: Scratch.BlockType.REPORTER,
            text: "brightness of [color]",
            arguments: {
              color: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "#ffffff",
              },
            },
          },

          {
            opcode: "getAllSprites",
            blockType: Scratch.BlockType.REPORTER,
            text: "all sprites",
          },
          {
            opcode: "getfps",
            blockType: Scratch.BlockType.REPORTER,
            text: "fps",
          },
        ],
      };
    }

    importImage({ TEXT, NAME }) {
      Scratch.fetch(TEXT)
        .then((r) => r.arrayBuffer())
        .then((arrayBuffer) => {
          const storage = vm.runtime.storage;
          vm.addCostume(NAME + ".PNG", {
            name: NAME + "",
            asset: new storage.Asset(
              storage.AssetType.ImageBitmap,
              null, // asset id, doesn't need to be set here because of `true` at the end will make Scratch generate it for you
              storage.DataFormat.PNG,
              new Uint8Array(arrayBuffer),
              true
            ),
          });
        });
    }

    importSprite({ TEXT }) {
      Scratch.fetch(TEXT)
        .then((r) => r.arrayBuffer())
        .then((buffer) => vm.addSprite(buffer))
        .then(() => {
          console.log("Done");
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }

    deleteSprite({ SPRITE }) {
      const target = vm.runtime.getSpriteTargetByName(SPRITE);
      if (!target || target.isStage) {
        return;
      }
      // @ts-expect-error
      if (typeof ScratchBlocks !== "undefined") {
        if (
          !confirm(
            `Do you want to delete the sprite "${SPRITE}"? This cannot be undone.`
          )
        ) {
          return;
        }
      }
      vm.deleteSprite(target.id);
    }

    importSound({ TEXT, NAME }) {
      Scratch.fetch(TEXT)
        .then((r) => r.arrayBuffer())
        .then((arrayBuffer) => {
          const storage = vm.runtime.storage;
          const asset = new storage.Asset(
            storage.AssetType.Sound,
            null,
            storage.DataFormat.MP3,
            new Uint8Array(arrayBuffer),
            true
          );
          vm.addSound({
            md5: asset.assetId + "." + asset.dataFormat,
            asset: asset,
            name: NAME + "",
          });
        });
    }

    importProject({ TEXT }) {
      // @ts-ignore
      if (typeof ScratchBlocks !== "undefined") {
        // We are in the editor. Ask before loading a new project to avoid unrecoverable data loss.
        if (
          !confirm(
            `Do you want to import a project from "${TEXT}"? Everything in the current project will be permanently deleted.`
          )
        ) {
          return;
        }
      }
      Scratch.fetch(TEXT)
        .then((r) => r.arrayBuffer())
        .then((buffer) => vm.loadProject(buffer))
        .then(() => {
          console.log("Done");
          vm.greenFlag();
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }

    restartProject() {
      vm.greenFlag();
    }

    async loadExtension({ TEXT }) {
      if (await vm.securityManager.canLoadExtensionFromProject(TEXT)) {
        vm.extensionManager.loadExtensionURL(TEXT);
      }
    }

    getlist({ TEXT }) {
      const list = vm.runtime
        .getTargetForStage()
        .lookupVariableByNameAndType(TEXT, "list");
      if (list) {
        return JSON.stringify(list.value);
      } else {
        return "";
      }
    }
    setlist({ TEXT, NAME }) {
      let parsed;
      try {
        parsed = JSON.parse(TEXT);
      } catch (e) {
        return; // JSON was invalid
      }

      if (!Array.isArray(parsed)) {
        return; // it's not an array
      }

      for (const element of parsed) {
        const type = typeof element;
        if (type !== "string" && type !== "number" && type !== "boolean") {
          return; // One of the elements has a disallowed type
        }
      }

      const list = vm.runtime
        .getTargetForStage()
        .lookupVariableByNameAndType(NAME, "list");
      if (!list) {
        return; // List was not found
      }

      list.value = parsed;
    }

    setedtarget({ NAME }) {
      let target;

      //I know this might cause sprites called "stage" to be ignored. But lets be real, who names their sprite "stage"?
      if (NAME.toLowerCase() === "stage") {
        target = vm.runtime.getTargetForStage();
      } else {
        target = vm.runtime.getSpriteTargetByName(NAME);
      }
      if (target) {
        vm.setEditingTarget(target.id);
      }
    }

    /**
     * Calculate brightness value by RGB or HEX color.
     * @param color (String) The color value in RGB or HEX (for example: #000000 || #000 || rgb(0,0,0) || rgba(0,0,0,0))
     * @returns (Number) The brightness value (dark) 0 ... 255 (light)
     */
    brightnessByColor({ color }) {
      // https://www.w3.org/TR/AERT/#color-contrast
      const { r, g, b } = Scratch.Cast.toRgbColorObject(color);
      return (r * 299 + g * 587 + b * 114) / 1000;
    }

    getfps() {
      return fps;
    }

    deleteImage({ SPRITE, COSNAME }) {
      // 0znzw, since shovel did not add it yet.
      const target = vm.runtime.getSpriteTargetByName(SPRITE);
      if (!target) {
        return;
      }
      target.deleteCostume(target.getCostumeIndexByName(COSNAME));
    }

    getAllSprites() {
      // 0znzw, since shovel did not add it yet.
      let sprites = [];
      for (const target of vm.runtime.targets) {
        if (target.isOriginal) sprites.push(target.sprite.name);
      }
      return JSON.stringify(sprites);
    }
  }
  Scratch.extensions.register(new ShovelUtils());
  // @ts-ignore
})(Scratch);
