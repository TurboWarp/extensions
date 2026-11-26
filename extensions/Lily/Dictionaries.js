(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const menuIconURI =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI5OS45IiBoZWlnaHQ9Ijk5LjkiIHZpZXdCb3g9IjAsMCw5OS45LDk5LjkiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xOTAuMDUsLTEzMC4wNSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTkyLjMsMTgwYzAsLTI2LjM0Mzk4IDIxLjM1NjAyLC00Ny43IDQ3LjcsLTQ3LjdjMjYuMzQzOTgsMCA0Ny43LDIxLjM1NjAyIDQ3LjcsNDcuN2MwLDI2LjM0Mzk4IC0yMS4zNTYwMiw0Ny43IC00Ny43LDQ3LjdjLTI2LjM0Mzk4LDAgLTQ3LjcsLTIxLjM1NjAyIC00Ny43LC00Ny43eiIgZmlsbD0iI2ZmNGQ0ZCIgc3Ryb2tlPSIjY2MzZTNlIiBzdHJva2Utd2lkdGg9IjQuNSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48cGF0aCBkPSJNMjE0LjAzODg5LDIwNy44MTYyMnYtNDkuMzI2MTFjMCwtNC4xNTQxOSAwLC02LjIzMjgyIDAuODA4NDcsLTcuODE5NDljMC43MTExMSwtMS4zOTU3MSAxLjg0NTAyLC0yLjUyOTYxIDMuMjQwNzMsLTMuMjQwNzNjMS41ODY2NywtMC44MDg0NyAzLjY2NTMsLTAuODA4NDcgNy44MTk0OSwtMC44MDg0N2gzNC4xMjAzMmMyLjA3Njg5LDAgMy4xMTcxOSwwIDMuOTEwNDksMC40MDQyMWMwLjY5NzYxLDAuMzU1NTkgMS4yNjE3MSwwLjkyMjU1IDEuNjE3MDEsMS42MjAzOGMwLjQwNDI1LDAuNzkzMzMgMC40MDU3NCwxLjgzMjY3IDAuNDA1NzQsMy45MDk3NHY0My43NjMwMmMwLDIuMDc2ODkgLTAuMDAxNDgsMy4xMTQyMiAtMC40MDU3NCwzLjkwNzUyYy0wLjM1NTMsMC42OTc5OCAtMC45MTg2NSwxLjI2NjUzIC0xLjYxNjI2LDEuNjIyMmMtMC43OTI1NiwwLjQwMzg4IC0xLjgzMTM3LDAuNDAzODggLTMuOTA0NTUsMC40MDM4OGgtMzcuNjUxMDNjLTQuNjA4NjIsMCAtOC4zNDQ2NCwzLjczNjE3IC04LjM0NDY0LDguMzQ0NjRjMCwxLjUzNjE2IDEuMjQ1MzUsMi43ODE1NSAyLjc4MTU1LDIuNzgxNTVoMzkuNTA1MzljMi4wNzMxOCwwIDMuMTExOTksMCAzLjkwNDU1LC0wLjQwMzg4YzAuNjk3NjEsLTAuMzU1NjcgMS4yNjA5NywtMC45MjM4NCAxLjYxNjI2LC0xLjYyMTgzYzAuNDA0MjUsLTAuNzkzMyAwLjQwNTczLC0xLjgzMSAwLjQwNTczLC0zLjkwODI2di01LjE5MjIyIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMjI5LjY1LDE1OC4zNWgyNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjYuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6NDkuOTQ5OTk5OTk5OTk5OTk6NDkuOTQ5OTk5OTk5OTk5OS0tPg==";

  // Check if the VM has extensionStorage
  if (!runtime.extensionStorage || Scratch.extensions.isPenguinMod) {
    alert("The VM is outdated!");
  }

  // This patch gives us the blockId in menu functions.
  // It's required in order to get the currently selected menu.
  // Right now it's only used in order to get the name of the selected
  // dictionary for the "Delete the X dictionary" function within the
  // dictionary menu.
  const extensionManager = runtime.extensionManager;
  const gemi = extensionManager._getExtensionMenuItems.bind(extensionManager);
  extensionManager._getExtensionMenuItems = function (
    extensionObject,
    menuItemFunctionName,
    block
  ) {
    const menuFunc = extensionObject[menuItemFunctionName];
    const menuFunc2 = function (...args) {
      return menuFunc(...args, block);
    };
    return gemi(
      {
        fn: menuFunc2,
      },
      "fn"
    );
  };

  vm.on("EXTENSION_ADDED", tryUseScratchBlocks);
  vm.on("BLOCKSINFO_UPDATE", tryUseScratchBlocks);
  tryUseScratchBlocks();

  function tryUseScratchBlocks() {
    if (!window.ScratchBlocks) return;
    vm.removeListener("EXTENSION_ADDED", tryUseScratchBlocks);
    vm.removeListener("BLOCKSINFO_UPDATE", tryUseScratchBlocks);

    // This is the second part of the previously mentioned patch
    ScratchBlocks.defineBlocksWithJsonArray = function (jsonArray) {
      for (var i = 0; i < jsonArray.length; i++) {
        let jsonDef = jsonArray[i];
        if (!jsonDef) {
          console.warn(
            "Block definition #" +
              i +
              " in JSON array is " +
              jsonDef +
              ". " +
              "Skipping."
          );
        } else {
          var typename = jsonDef.type;
          if (typename == null || typename === "") {
            console.warn(
              "Block definition #" +
                i +
                " in JSON array is missing a type attribute. Skipping."
            );
          } else {
            if (ScratchBlocks.Blocks[typename]) {
              console.warn(
                "Block definition #" +
                  i +
                  " in JSON array" +
                  ' overwrites prior definition of "' +
                  typename +
                  '".'
              );
            }
            ScratchBlocks.Blocks[typename] = {
              init: function () {
                let block = this;
                let row = 0;
                while (jsonDef["args" + row]) {
                  let blockArgs = jsonDef["args" + row];
                  for (let arg of blockArgs) {
                    if (typeof arg.options === "function") {
                      const menuGen = arg.options;
                      arg.options = function (...args) {
                        return menuGen(...args, block.id);
                      };
                    }
                  }
                  row++;
                }
                this.jsonInit(jsonDef);
              },
            };
          }
        }
      }
    };

    // This patch is to append the context menu data for the reporters
    // We can't use mixins because they don't work on dynamic blocks
    // (this also allows us to discriminate isInFlyout)
    // https://github.com/Xeltalliv/extensions/blob/0a90e48aeed737530fc2f1dcc9dd5fa714a00bf3/examples/dynamic-blocks.js#L45C11-L45C11
    ScratchBlocks.BlockSvg.prototype.showContextMenu_ = function (a) {
      if (!this.workspace.options.readOnly && this.contextMenu) {
        var b = [];
        if (this.isDeletable() && this.isMovable() && !this.isInFlyout)
          b.push(ScratchBlocks.ContextMenu.blockDuplicateOption(this, a)),
            this.isEditable() &&
              this.workspace.options.comments &&
              b.push(ScratchBlocks.ContextMenu.blockCommentOption(this)),
            b.push(ScratchBlocks.ContextMenu.blockDeleteOption(this));
        else if (this.parentBlock_ && this.isShadow_) {
          this.parentBlock_.showContextMenu_(a);
          return;
        }
        // START OF NEW
        if (this.type == "lmsDictionaries_getDictionary" && this.isInFlyout) {
          const name = JSON.parse(this.blockInfoText).text;
          const uid = JSON.parse(this.blockInfoText).arguments.DICTIONARY
            .defaultValue;
          b.push({
            text: "Rename dictionary",
            enabled: true,
            callback: () => {
              renameDictionary(name, uid);
            },
          });
          b.push({
            text: `Delete the "${name}" dictionary`,
            enabled: true,
            callback: () => {
              deleteDictionary(uid);
            },
          });
        } else if (this.type == "lmsDictionaries_getDictionary") {
          // The current dictionary in the reporter
          const uid = JSON.parse(this.blockInfoText).arguments.DICTIONARY
            .defaultValue;

          const stage = runtime.getTargetForStage();
          const editingTarget = runtime.getEditingTarget();

          // getting stage dictionaries
          let stageDictionaries;
          const stageStorage = stage.extensionStorage["lmsDictionaries"];
          if (stageStorage) stageDictionaries = stageStorage.dictionaries;

          // getting editing target dictonaries
          let targetDictionaries;
          const targetStorage = stage.extensionStorage["lmsDictionaries"];
          if (targetStorage) targetDictionaries = targetStorage.dictionaries;

          // if the stage is the editing target then just output the stage dictionaries
          let dictionaries = [];
          if (editingTarget.isStage) {
            dictionaries = stageDictionaries;
          } else dictionaries = { ...targetDictionaries, ...stageDictionaries };

          // alphabetise the dictionaries
          let sorted = Object.entries(dictionaries);
          sorted = sorted
            .sort((f, e) => compareStrings(f[1].name, e[1].name))
            .filter((dict) => dict[0] !== uid);

          // push them onto the context menu
          // addons will push them after this, so we don't need to worry about them
          let i = 0;
          for (const dictionary of sorted) {
            i++;
            b.push({
              text: dictionary[1].name,
              enabled: true,
              separator: i === 1,
              callback: () => {
                const currentBlock = ScratchBlocks.ContextMenu.currentBlock.id;
                const block = editingTarget.blocks.getBlock(currentBlock);

                block.mutation.blockInfo.arguments.DICTIONARY.defaultValue =
                  dictionary[0];
                block.mutation.blockInfo.text = dictionary[1].name;

                vm.emitWorkspaceUpdate();
              },
            });
          }
        }
        // END OF NEW
        this.customContextMenu && this.customContextMenu(b);
        ScratchBlocks.ContextMenu.show(a, b, this.RTL);
        ScratchBlocks.ContextMenu.currentBlock = this;
      }
    };
  }

  const soup_ =
    "!#%()*+,-./:;=?@[]^_`{|}~" +
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const uid = function () {
    const length = 20;
    const soupLength = soup_.length;
    const id = [];
    for (let i = 0; i < length; i++) {
      id[i] = soup_.charAt(Math.random() * soupLength);
    }
    return id.join("");
  };

  // https://github.com/TurboWarp/scratch-vm/blob/develop/src/util/xml-escape.js
  /**
   * Escape a string to be safe to use in XML content.
   * CC-BY-SA: hgoebl
   * https://stackoverflow.com/questions/7918868/
   * how-to-escape-xml-entities-in-javascript
   * @param {!string | !Array.<string>} unsafe Unsafe string.
   * @return {string} XML-escaped string, for use within an XML tag.
   * Modified for use in this extension
   */
  const xmlEscape = function (unsafe) {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "&":
          return "&amp;";
        case "'":
          return "&apos;";
        case '"':
          return "&quot;";
      }
    });
  };

  const jsonEscape = function (unsafe) {
    return String(unsafe).replaceAll("\\", "\\\\").replaceAll('"', '\\"');
  };

  function createNewDictionary(name, target, scope) {
    if (!checkValid(name, target))
      return alert('A dictionary named "' + name + '" already exists.');

    const newUid = uid();
    const clones = target.sprite.clones;

    for (const clone of clones) {
      if (!clone.extensionStorage["lmsDictionaries"]) {
        clone.extensionStorage["lmsDictionaries"] = Object.create(null);
        clone.extensionStorage["lmsDictionaries"].dictionaries =
          Object.create(null);
      }
      const dictionaries =
        clone.extensionStorage["lmsDictionaries"].dictionaries;

      dictionaries[newUid] = {
        name,
        value: Object.create(null),
        scope,
      };
    }

    vm.extensionManager.refreshBlocks();
    vm.emitWorkspaceUpdate();
  }

  // Check if the name is used by the global target (stage) or itself
  function checkValid(name, scope) {
    if (!scope.isStage) {
      // In this case we only need to check if the stage has used the name
      const stage = runtime.getTargetForStage();
      const storage = stage.extensionStorage["lmsDictionaries"];
      if (!storage) return true;

      const dictionaries = storage.dictionaries;
      const uids = Object.keys(dictionaries);
      for (const uid of uids) {
        // For Scratch parity, names are checked case-sensitively
        if (dictionaries[uid].name === name) return false;
      }
    } else {
      const targets = runtime.targets;
      for (const target of targets) {
        const storage = target.extensionStorage["lmsDictionaries"];
        if (storage) {
          const dictionaries = storage.dictionaries;
          const uids = Object.keys(dictionaries);
          for (const uid of uids) {
            // For Scratch parity, names are checked case-sensitively
            if (dictionaries[uid].name === name) return false;
          }
        }
      }
    }
    return true;
  }

  function mutationXML(blockInfo) {
    return `<mutation blockInfo="${xmlEscape(blockInfo)}"/>`;
  }

  // Generate the XML for the dynamic reporter blocks
  function generateReporterBlocks() {
    const stage = runtime.getTargetForStage();
    const editingTarget = runtime.getEditingTarget();

    // Targets haven't been loaded yet
    if (!stage || !editingTarget) return;

    // getting stage dictionaries
    let stageDictionaries;
    const stageStorage = stage.extensionStorage["lmsDictionaries"];
    if (stageStorage) stageDictionaries = stageStorage.dictionaries;

    // getting editing target dictonaries
    let targetDictionaries;
    const targetStorage = stage.extensionStorage["lmsDictionaries"];
    if (targetStorage) targetDictionaries = targetStorage.dictionaries;

    // if the stage is the editing target then just output the stage dictionaries
    let dictionaries = [];
    if (editingTarget.isStage) {
      dictionaries = stageDictionaries;
    } else dictionaries = { ...targetDictionaries, ...stageDictionaries };

    let reporters = [],
      uids = Object.keys(dictionaries);
    let xml = {},
      names = [];

    // Create a mutation of getDictionary for each dictionary in the target
    for (const uid of uids) {
      let name = dictionaries[uid].name,
        safeName = jsonEscape(name);
      if (safeName.length < 1)
        safeName += jsonEscape("/!\\ Invalid name, please check the console.");
      const mutation = mutationXML(
        `{"blockType":"reporter","terminal":false,"blockAllThreads":false,"arguments":{"DICTIONARY":{"type":"string","defaultValue":"${uid}"}},"opcode":"getDictionary","text":"${safeName}","isDynamic":true,"hideFromPalette":false}`
      );
      const reporter = `<block type="lmsDictionaries_getDictionary">${mutation}</block>`;
      xml[name] = reporter;
      names.push(name);
    }

    // Alphabetise the reporters with the same rules as variables
    // (Thank you Ashime for helping me with the sorting)
    names.sort(compareStrings);
    for (const name of names) {
      reporters.push(xml[name]);
    }

    return reporters.join();
  }

  // an abridged version of Scratch's native comparison script
  function compareStrings(str1, str2) {
    return str1.localeCompare(str2, [], {
      sensitivity: "base",
      numeric: true,
    });
  }

  // Get a dictionary by checking for its ID in every target
  // OR from the specified target
  function getDictionaryByID(uid, t) {
    if (t) {
      const storage = t.extensionStorage["lmsDictionaries"];
      if (storage) {
        const dictionaries = storage.dictionaries;
        if (dictionaries[uid]) return dictionaries[uid];
      }
      return;
    } else {
      const targets = runtime.targets.filter((target) => target.isOriginal);
      for (const target of targets) {
        const storage = target.extensionStorage["lmsDictionaries"];
        if (storage) {
          const dictionaries = storage.dictionaries;
          if (dictionaries[uid]) return dictionaries[uid];
        }
      }
    }
  }

  // Get a dictionary's target by checking for its ID in every target
  function getTargetFromDictionary(uid) {
    const targets = runtime.targets;
    for (const target of targets) {
      const storage = target.extensionStorage["lmsDictionaries"];
      if (storage) {
        const dictionaries = storage.dictionaries;
        if (dictionaries[uid]) return target;
      }
    }
  }

  function dictionaryHidden() {
    const stageDictionaries = getDictionaryMenuForTarget(
      runtime.getTargetForStage()
    );
    const targetDictionaries = getDictionaryMenuForTarget(
      runtime.getEditingTarget()
    );
    return stageDictionaries.concat(targetDictionaries).length === 0;
  }

  // Get all dictionaries within a target (mapped to menu syntax)
  function getDictionaryMenuForTarget(target) {
    if (!target) return [];
    const storage = target.extensionStorage["lmsDictionaries"];
    if (!storage) return [];

    const targetDictionaries = storage.dictionaries;
    let dictionaries = [];

    for (const uid of Object.keys(targetDictionaries)) {
      dictionaries.push({
        text: targetDictionaries[uid].name,
        value: uid,
      });
    }

    if (dictionaries.length === 0) return [];
    return dictionaries;
  }

  // Throw a prompt and rename the dictionary to the result.
  // TO DO: In the future it might be wise to rename
  // dictonaries within other clones, but it's not
  // necessary right now.
  function renameDictionary(name, uid) {
    ScratchBlocks.prompt(
      `Rename all "${name}" dictionaries to:`,
      name,
      (text) => {
        if (!text) return;
        const target = getTargetFromDictionary(uid);
        const dictionary = getDictionaryByID(uid);

        if (!checkValid(text, target))
          return alert('A dictionary named "' + text + '" already exists.');
        dictionary.name = text;

        vm.extensionManager.refreshBlocks();
        vm.emitWorkspaceUpdate();
      },
      "Rename Dictionary",
      "broadcast_msg"
    );
  }

  // Delete a dictionary based on its UID.
  // In parity with other Data categories, we delete the blocks
  // that were using the dictionary.
  // Because we can't automatically create dictionaries when
  // one is detected in a block, we have to delete every instance
  // in every target as opposed to just the editing target.
  function deleteDictionary(uid) {
    const clones = getTargetFromDictionary(uid).sprite.clones;

    for (const clone of clones) {
      const storage = clone.extensionStorage["lmsDictionaries"].dictionaries;
      Reflect.deleteProperty(storage, uid);
    }

    // TODO there has got to be a better way of handling this
    for (const target of runtime.targets) {
      const blocks = target.blocks._blocks;

      for (let block in blocks) {
        block = blocks[block];

        // Blocks within the extension
        if (block.opcode.includes("lmsDictionaries")) {
          let uidCheck;

          // Reporters are accessed slightly differently
          if (block.opcode === "lmsDictionaries_getDictionary") {
            uidCheck =
              block.mutation.blockInfo.arguments.DICTIONARY.defaultValue;
          } else uidCheck = block.fields.DICTIONARY.value;

          if (uidCheck === uid) {
            deleteSingleBlock(block.id, target);
          }
        }
      }
    }

    vm.extensionManager.refreshBlocks();
    vm.emitWorkspaceUpdate();
  }

  // custom function to remove a single block from
  // any target.
  function deleteSingleBlock(blockId, target) {
    const blocks = target.blocks._blocks;
    const block = blocks[blockId];
    const next = block.next ?? undefined;

    // Delete inputs (not including branches)
    for (const input in block.inputs) {
      if (
        block.inputs[input].shadow !== null &&
        block.inputs[input].shadow !== block.inputs[input].block
      ) {
        deleteSingleBlock(block.inputs[input].shadow, target);
      }
    }

    // If the block is in between 2 blocks, move those 2 blocks together
    if (block.parent && next) {
      blocks[block.parent].next = next;
    }

    // If the block is currently the top block, replace the script id
    // with that block and remove the parent of the block underneath
    if (!block.parent && next) {
      target.blocks._addScript(next);
      blocks[next].parent = null;
    }
    target.blocks._deleteScript(blockId);

    // Delete the block itself
    delete blocks[blockId];

    target.blocks.resetCache();
    runtime.emitProjectChanged();
  }

  // copy the extisting dictionaries onto clones
  runtime.on("targetWasCreated", (newTarget, original) => {
    if (!original) return;

    const storage = original.extensionStorage["lmsDictionaries"];
    if (!storage) return;

    newTarget.extensionStorage["lmsDictionaries"] = Object.create(null);
    newTarget.extensionStorage["lmsDictionaries"].dictionaries = JSON.parse(
      JSON.stringify(storage.dictionaries)
    );
  });

  class Dictionaries {
    getInfo() {
      return {
        id: "lmsDictionaries",
        name: "Dictionaries",
        color1: "#ff4d4d",
        color2: "#e64545",
        color3: "#cc3e3e",
        menuIconURI,
        blocks: [
          {
            blockType: Scratch.BlockType.BUTTON,
            func: "createDictionary",
            text: "Make a Dictionary",
          },
          {
            opcode: "getDictionary",
            blockType: Scratch.BlockType.REPORTER,
            text: "created with love by Lily",
            isDynamic: true,
            hideFromPalette: true,
            arguments: {
              DICTIONARY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: Scratch.Cast.toString(generateReporterBlocks()),
          },
          "---",
          {
            opcode: "setDictionary",
            blockType: Scratch.BlockType.COMMAND,
            text: "set key [KEY] to [VALUE] in [DICTIONARY]",
            hideFromPalette: dictionaryHidden(),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "turbo",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "warp",
              },
              DICTIONARY: {
                type: Scratch.ArgumentType.STRING,
                menu: "dictionaryMenu",
              },
            },
          },
          {
            opcode: "changeDictionary",
            blockType: Scratch.BlockType.COMMAND,
            text: "change key [KEY] by [VALUE] in [DICTIONARY]",
            hideFromPalette: dictionaryHidden(),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "turbo",
              },
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              DICTIONARY: {
                type: Scratch.ArgumentType.STRING,
                menu: "dictionaryMenu",
              },
            },
          },
          "---",
          {
            opcode: "deleteKey",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete key [KEY] in [DICTIONARY]",
            hideFromPalette: dictionaryHidden(),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "turbo",
              },
              DICTIONARY: {
                type: Scratch.ArgumentType.STRING,
                menu: "dictionaryMenu",
              },
            },
          },
          {
            opcode: "deleteAll",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete all keys in [DICTIONARY]",
            hideFromPalette: dictionaryHidden(),
            arguments: {
              DICTIONARY: {
                type: Scratch.ArgumentType.STRING,
                menu: "dictionaryMenu",
              },
            },
          },
          "---",
          {
            opcode: "getKey",
            blockType: Scratch.BlockType.REPORTER,
            text: "key [KEY] in [DICTIONARY]",
            disableMonitor: true,
            allowDropAnywhere: true,
            hideFromPalette: dictionaryHidden(),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "turbo",
              },
              DICTIONARY: {
                type: Scratch.ArgumentType.STRING,
                menu: "dictionaryMenu",
              },
            },
          },
          {
            opcode: "allProperty",
            blockType: Scratch.BlockType.REPORTER,
            text: "all [PROPERTY] of [DICTIONARY]",
            disableMonitor: true,
            hideFromPalette: dictionaryHidden(),
            arguments: {
              PROPERTY: {
                type: Scratch.ArgumentType.STRING,
                menu: "properties",
              },
              DICTIONARY: {
                type: Scratch.ArgumentType.STRING,
                menu: "dictionaryMenu",
              },
            },
          },
          {
            opcode: "lengthOf",
            blockType: Scratch.BlockType.REPORTER,
            text: "length of [DICTIONARY]",
            disableMonitor: true,
            allowDropAnywhere: true,
            hideFromPalette: dictionaryHidden(),
            arguments: {
              DICTIONARY: {
                type: Scratch.ArgumentType.STRING,
                menu: "dictionaryMenu",
              },
            },
          },
          "---",
          {
            opcode: "containsProperty",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[DICTIONARY] contains [PROPERTY] [VALUE]?",
            disableMonitor: true,
            hideFromPalette: dictionaryHidden(),
            arguments: {
              DICTIONARY: {
                type: Scratch.ArgumentType.STRING,
                menu: "dictionaryMenu",
              },
              PROPERTY: {
                type: Scratch.ArgumentType.STRING,
                menu: "property",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "turbo",
              },
            },
          },
        ],
        menus: {
          dictionaryMenu: {
            acceptReporters: false,
            items: "getDictionaries",
          },
          properties: {
            acceptReporters: false,
            items: ["keys", "values"],
          },
          property: {
            acceptReporters: false,
            items: ["key", "value"],
          },
        },
      };
    }

    createDictionary() {
      const editingTarget = runtime.getEditingTarget();
      const stage = runtime.getTargetForStage();
      ScratchBlocks.prompt(
        "New dictionary name:",
        "",
        (text, _, scope) => {
          if (!text) return;
          let target;
          if (scope.scope === "global") {
            target = stage;
          } else target = editingTarget;
          createNewDictionary(text, target, scope.scope);
        },
        "New Dictionary",
        "list"
      );
      if (vm.editingTarget.isStage) {
        // TO DO: This might be fragile
        document.querySelector(
          "body > div.ReactModalPortal > div > div > div > div[class*=prompt_body][class*=box_box] > div:nth-child(3) > div > span"
        ).textContent = "This dictionary will be available to all sprites.";
      }
    }

    getDictionary(args, util) {
      // ASHIME IS GREAT
      const blkId = util.thread.peekStack(),
        blocks = util.target.blocks.getBlock(blkId)
          ? util.target.blocks
          : runtime.flyoutBlocks;
      const blockInfo = JSON.parse(
        new DOMParser()
          .parseFromString(blocks.blockToXML(blkId), "application/xml")
          .querySelector("mutation")
          .getAttribute("blockInfo")
      );
      const uid = blockInfo.arguments.DICTIONARY.defaultValue;

      // Get the dictionary from the target the block is in.
      // failing that it's probably from a different sprite
      // or the stage.
      // We have to check the target first because of clones.
      let dictionary = getDictionaryByID(uid, util.target);
      if (!dictionary) dictionary = getDictionaryByID(uid);
      if (!dictionary) return;

      return dictionary ? JSON.stringify(dictionary.value) : "{}";
    }

    setDictionary(args, util) {
      const key = Scratch.Cast.toString(args.KEY);
      const value = args.VALUE;
      const uid = Scratch.Cast.toString(args.DICTIONARY);

      let dictionary = getDictionaryByID(uid, util.target);
      if (!dictionary) dictionary = getDictionaryByID(uid);
      if (!dictionary) return;

      dictionary.value[key] = value;
    }

    changeDictionary(args, util) {
      const key = Scratch.Cast.toString(args.KEY);
      const value = Scratch.Cast.toNumber(args.VALUE);
      const uid = Scratch.Cast.toString(args.DICTIONARY);

      let dictionary = getDictionaryByID(uid, util.target);
      if (!dictionary) dictionary = getDictionaryByID(uid);
      if (!dictionary) return;

      const ogValue = Scratch.Cast.toNumber(dictionary.value[key]);
      dictionary.value[key] = ogValue + value;
    }

    deleteKey(args, util) {
      const key = Scratch.Cast.toString(args.KEY);
      const uid = Scratch.Cast.toString(args.DICTIONARY);

      let dictionary = getDictionaryByID(uid, util.target);
      if (!dictionary) dictionary = getDictionaryByID(uid);
      if (!dictionary) return;

      Reflect.deleteProperty(dictionary.value, key);
    }

    deleteAll(args, util) {
      const uid = Scratch.Cast.toString(args.DICTIONARY);

      let dictionary = getDictionaryByID(uid, util.target);
      if (!dictionary) dictionary = getDictionaryByID(uid);
      if (!dictionary) return;

      dictionary.value = Object.create(null);
    }

    getKey(args, util) {
      const key = Scratch.Cast.toString(args.KEY);
      const uid = Scratch.Cast.toString(args.DICTIONARY);
      const dictionary = getDictionaryByID(uid);
      if (!dictionary) return;

      return dictionary.value[key] ?? "";
    }

    allProperty(args, util) {
      const property = Scratch.Cast.toString(args.PROPERTY);
      const uid = Scratch.Cast.toString(args.DICTIONARY);

      let dictionary = getDictionaryByID(uid, util.target);
      if (!dictionary) dictionary = getDictionaryByID(uid);
      if (!dictionary) return;

      const currentDictionaries = dictionary.value;
      const res =
        property === "values"
          ? Object.values(currentDictionaries)
          : Object.keys(currentDictionaries);
      return JSON.stringify(res);
    }

    lengthOf(args, util) {
      const uid = Scratch.Cast.toString(args.DICTIONARY);

      let dictionary = getDictionaryByID(uid, util.target);
      if (!dictionary) dictionary = getDictionaryByID(uid);
      if (!dictionary) return;

      return Object.keys(dictionary.value).length;
    }

    containsProperty(args, util) {
      const value = args.VALUE;
      const uid = Scratch.Cast.toString(args.DICTIONARY);

      let dictionary = getDictionaryByID(uid, util.target);
      if (!dictionary) dictionary = getDictionaryByID(uid);
      if (!dictionary) return;

      const property = Scratch.Cast.toString(args.PROPERTY);
      if (property === "key") {
        return !!Object.keys(dictionary.value).includes(value);
      } else return !!Object.values(dictionary.value).includes(value);
    }

    // sorted w/ love lmao -Ashime
    getDictionaries(_, blockId) {
      const stage = runtime.getTargetForStage();
      const editingTarget = runtime.getEditingTarget();
      if (!stage || !editingTarget) return [""];

      const stageDictionaries = getDictionaryMenuForTarget(stage);
      const targetDictionaries = getDictionaryMenuForTarget(editingTarget);

      let dictionaries = [];
      if (editingTarget.isStage) {
        dictionaries =
          stageDictionaries.length === 0 ? [""] : stageDictionaries;
      } else dictionaries = stageDictionaries.concat(targetDictionaries);

      if (dictionaries.length === 0) return [""];

      // Alphabetise the dictionary names
      const names = dictionaries.map((dict) => dict.text).sort(compareStrings);
      for (let i = 0; i < names.length; i++) {
        const dict = dictionaries[i];
        names[names.indexOf(dict.text)] = dict;
      }
      dictionaries = names;

      // Functions to get the currently selected values within the dropdown.
      // These will only work when the dropdown is already open.
      const text = () => {
        return ScratchBlocks.DropDownDiv.owner_.text_;
      };
      const value = () => {
        return ScratchBlocks.DropDownDiv.owner_.value_;
      };

      // if the block isn't in the target it's probably in the toolbox (flyout)
      let block = editingTarget.blocks.getBlock(blockId);
      if (!block) block = runtime.flyoutBlocks.getBlock(blockId);

      // Get the name of the currently selected dictionary
      // (this is where the first patch comes into play)
      let name;
      if (block) {
        const field = block.fields.DICTIONARY;

        // in any other case, it's probably the standalone
        // menu block, or a broken block
        if (field) {
          const currentUid = field.value;
          const dictionary = getDictionaryByID(currentUid);
          if (dictionary) name = dictionary.name;
        }
      }

      // any block within the extension itself
      // (not the standalone menu block, ie All Menus)
      if (name) {
        dictionaries.push({
          text: "Rename dictionary",
          value: () => renameDictionary(text(), value()),
        });
        dictionaries.push({
          text: `Delete the "${name}" dictionary`,
          value: () => deleteDictionary(value()),
        });
      }
      return dictionaries;
    }
  }

  Scratch.extensions.register(new Dictionaries());
})(Scratch);
