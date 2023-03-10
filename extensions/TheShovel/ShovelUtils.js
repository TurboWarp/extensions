(function (Scratch) {
  'use strict';
  console.log("ShovelUtils v1.2");
  const vm = Scratch.vm;
  class ShovelUtils {
    getInfo() {
      return {
        id: 'ShovelUtils',
        name: 'ShovelUtils',
        color1: '#f54242',
        color2: '#f54242',
        color3: '#f54242',
        blocks: [{
          opcode: 'importImage',
          blockType: Scratch.BlockType.COMMAND,
          text: "Import image from [TEXT] name [NAME]",
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://extensions.turbowarp.org/dango.png',
            },
            NAME: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Apple',
            }
          }
        },
        {
          opcode: 'getlist',
          blockType: Scratch.BlockType.REPORTER,
          text: "Get list [TEXT]",
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'MyList',
            }
          }
        },
        {
          opcode: 'setlist',
          blockType: Scratch.BlockType.COMMAND,
          text: "Set list [NAME] to [TEXT]",
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '[1,2]',
            },
            NAME: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'MyList',
            }
          }
        },
        {
          opcode: 'importSprite',
          blockType: Scratch.BlockType.COMMAND,
          text: "Import sprite from [TEXT]",
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Link or data uri here',
            }
          }
        },
        {
          opcode: 'importSound',
          blockType: Scratch.BlockType.COMMAND,
          text: "Import sound from [TEXT] name [NAME]",
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://theshovel.github.io/kewlab-data/char%20edit.mp3',
            },
            NAME: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Apple',
            }
          }
        },
        {
          opcode: 'importProject',
          blockType: Scratch.BlockType.COMMAND,
          text: "Import project from [TEXT]",
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://theshovel.github.io/Bullet-Hell/Bullet%20Hell',
            }
          }
        },
        {
          opcode: 'loadExtension',
          blockType: Scratch.BlockType.COMMAND,
          text: "Load extension from [TEXT]",
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://extensions.turbowarp.org/utilities.js',
            }
          }
        },

        {
          opcode: 'restartProject',
          blockType: Scratch.BlockType.COMMAND,
          text: "Restart project",
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '0',
            }
          }
        },
        {
          opcode: 'setedtarget',
          blockType: Scratch.BlockType.COMMAND,
          text: "Set editing target to [NAME]",
          arguments: {
            NAME: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Sprite1',
            }
          }
        },

        {
          opcode: 'brightnessByColor',
          blockType: Scratch.BlockType.REPORTER,
          text: "Get brightness of [color]",
          arguments: {
            color: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '#ffffff',
            }
          }
        },



        ]
      };
    }

    importImage({ TEXT, NAME }) {
      Scratch.fetch(TEXT)
        .then((r) => r.arrayBuffer())
        .then((arrayBuffer) => {
          const storage = vm.runtime.storage;
          vm.addCostume(NAME + '.PNG', {
            name: NAME,
            asset: new storage.Asset(
              storage.AssetType.ImageBitmap,
              null, // asset id, doesn't need to be set here because of `true` at the end will make Scratch generate it for you
              storage.DataFormat.PNG,
              new Uint8Array(arrayBuffer),
              true
            )
          });
        });
    }

    importSprite({ TEXT }) {
      Scratch.fetch(TEXT)
        .then(r => r.arrayBuffer())
        .then(buffer => vm.addSprite(buffer))
        .then(() => {
          console.log("Done");
        })
        .catch((error) => {
          console.log("Error", error);
        });
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
            md5: NAME + '.mp3',
            asset: asset,
            name: NAME
          });
        });
    }

    importProject({ TEXT }) {
      Scratch.fetch(TEXT)
        .then(r => r.arrayBuffer())
        .then(buffer => vm.loadProject(buffer))
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
      const list = vm.runtime.getTargetForStage().lookupVariableByNameAndType(TEXT, 'list');
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

      const list = vm.runtime.getTargetForStage().lookupVariableByNameAndType(NAME, 'list');
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
      color = "" + color;
      var isHEX = color.indexOf("#") == 0, isRGB = color.indexOf("rgb") == 0;
      if (isHEX) {
        const hasFullSpec = color.length == 7;
        var m = color.substr(1).match(hasFullSpec ? /(\S{2})/g : /(\S{1})/g);
        if (m) var r = parseInt(m[0] + (hasFullSpec ? '' : m[0]), 16), g = parseInt(m[1] + (hasFullSpec ? '' : m[1]), 16), b = parseInt(m[2] + (hasFullSpec ? '' : m[2]), 16);
      }
      if (isRGB) {
        m = color.match(/(\d+){3}/g);
        if (m) r = m[0], g = m[1], b = m[2];
      }
      if (Number.isNaN(((r * 299) + (g * 587) + (b * 114)) / 1000)){
        return "";
      } else {
        return ((r * 299) + (g * 587) + (b * 114)) / 1000;
      }
    }
  }

  Scratch.extensions.register(new ShovelUtils());
// @ts-ignore
})(Scratch);
