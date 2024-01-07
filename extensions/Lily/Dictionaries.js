(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const menuIconURI =
    "data:image/png;base64,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";

  // Check if the VM has extensionStorage
  if (!runtime.extensionStorage || Scratch.extensions.isPenguinMod) {
    alert("The VM is outdated!");
  }

  vm.on("EXTENSION_ADDED", tryUseScratchBlocks);
  vm.on("BLOCKSINFO_UPDATE", tryUseScratchBlocks);
  tryUseScratchBlocks();

  function tryUseScratchBlocks() {
    if (!window.ScratchBlocks) return;
    vm.removeListener("EXTENSION_ADDED", tryUseScratchBlocks);
    vm.removeListener("BLOCKSINFO_UPDATE", tryUseScratchBlocks);

    // https://github.com/Xeltalliv/extensions/blob/0a90e48aeed737530fc2f1dcc9dd5fa714a00bf3/examples/dynamic-blocks.js#L45C11-L45C11
    ScratchBlocks.BlockSvg.prototype.showContextMenu_ = function (a) {
      if (!this.workspace.options.readOnly && this.contextMenu) {
        var b = [];
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
        }
        // END OF NEW
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

    if (!target.extensionStorage["lmsDictionaries"]) {
      target.extensionStorage["lmsDictionaries"] = Object.create(null);
      target.extensionStorage["lmsDictionaries"].dictionaries =
        Object.create(null);
    }
    const dictionaries =
      target.extensionStorage["lmsDictionaries"].dictionaries;

    dictionaries[uid()] = {
      name,
      value: Object.create(null),
      scope,
    };
    Scratch.vm.extensionManager.refreshBlocks();
    Scratch.vm.emitWorkspaceUpdate();
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
      return true;
    }

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

    // Getting dictionaries from the stage
    const stageStorage = stage.extensionStorage["lmsDictionaries"];
    const stageDictionaries = !stageStorage ? {} : stageStorage.dictionaries;

    // Getting dictionaries from the editing target
    // Also checking if the editing target is the stage, which'd make this redundant
    const targetStorage = editingTarget.extensionStorage["lmsDictionaries"];
    const targetDictionaries =
      !targetStorage || editingTarget.isStage ? {} : targetStorage.dictionaries;

    // Concatenate and sort alphabetically
    // (Thank you Ashime for helping me with the sorting)
    const dictionaries = { ...stageDictionaries, ...targetDictionaries };
    let reporters = [],
      uids = Object.keys(dictionaries);
    let xml = {},
      names = [];

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

    names.sort(compareStrings);
    for (const name of names) {
      reporters.push(xml[name]);
    }

    return reporters.join();
  }

  function compareStrings(str1, str2) {
    return str1.localeCompare(str2, [], {
      sensitivity: "base",
      numeric: true,
    });
  }

  // Get a dictionary by checking for its ID in every target
  function getDictionaryByID(uid) {
    const targets = runtime.targets;
    for (const target of targets) {
      const storage = target.extensionStorage["lmsDictionaries"];
      if (storage) {
        const dictionaries = storage.dictionaries;
        if (dictionaries[uid]) return dictionaries[uid];
      }
    }
  }

  // Get a dictionary by checking for its ID in every target
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
    const stageDictionaries = _getDictionariesForTarget(
      runtime.getTargetForStage()
    );
    const targetDictionaries = _getDictionariesForTarget(
      runtime.getEditingTarget()
    );
    return stageDictionaries.concat(targetDictionaries).length === 0;
  }

  function _getDictionariesForTarget(target) {
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

  function renameDictionary(name, uid) {
    ScratchBlocks.prompt(
      `Rename all "${name}" dictionaries to:`,
      "",
      (text) => {
        if (!text) return;
        const target = getTargetFromDictionary(uid);
        const dictionary = getDictionaryByID(uid);

        if (!checkValid(text, target))
          return alert('A dictionary named "' + text + '" already exists.');
        dictionary.name = text;

        Scratch.vm.extensionManager.refreshBlocks();
        Scratch.vm.emitWorkspaceUpdate();
      },
      "Rename Dictionary",
      "broadcast_msg"
    );
  }

  function deleteDictionary(uid) {
    const target = getTargetFromDictionary(uid);
    const storage = target.extensionStorage["lmsDictionaries"].dictionaries;

    Reflect.deleteProperty(storage, uid);

    Scratch.vm.extensionManager.refreshBlocks();
    Scratch.vm.emitWorkspaceUpdate();
  }

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
                defaultValue: 0,
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
            text: "delete all of [DICTIONARY]",
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
          : vm.runtime.flyoutBlocks;
      const blockInfo = JSON.parse(
        new DOMParser()
          .parseFromString(blocks.blockToXML(blkId), "application/xml")
          .querySelector("mutation")
          .getAttribute("blockInfo")
      );
      const uid = blockInfo.arguments.DICTIONARY.defaultValue;
      const dictionary = getDictionaryByID(uid);
      if (!dictionary) return;

      return dictionary ? JSON.stringify(dictionary.value) : "{}";
    }

    setDictionary(args) {
      const key = Scratch.Cast.toString(args.KEY);
      const value = args.VALUE;
      const uid = Scratch.Cast.toString(args.DICTIONARY);
      const dictionary = getDictionaryByID(uid);
      if (!dictionary) return;

      dictionary.value[key] = value;
    }

    changeDictionary(args) {
      const key = Scratch.Cast.toString(args.KEY);
      const value = Scratch.Cast.toNumber(args.VALUE);
      const uid = Scratch.Cast.toString(args.DICTIONARY);
      const dictionary = getDictionaryByID(uid);
      if (!dictionary) return;

      const ogValue = Scratch.Cast.toNumber(dictionary.value[key]);
      dictionary.value[key] = ogValue + value;
    }

    deleteKey(args) {
      const key = Scratch.Cast.toString(args.KEY);
      const uid = Scratch.Cast.toString(args.DICTIONARY);
      const dictionary = getDictionaryByID(uid);
      if (!dictionary) return;

      Reflect.deleteProperty(dictionary.value, key);
    }

    deleteAll(args) {
      const uid = Scratch.Cast.toString(args.DICTIONARY);
      const dictionary = getDictionaryByID(uid);
      if (!dictionary) return;

      dictionary.value = Object.create(null);
    }

    getKey(args) {
      const key = Scratch.Cast.toString(args.KEY);
      const uid = Scratch.Cast.toString(args.DICTIONARY);
      const dictionary = getDictionaryByID(uid);
      if (!dictionary) return;

      return dictionary.value[key] ?? "";
    }

    allProperty(args) {
      const property = Scratch.Cast.toString(args.PROPERTY);
      const uid = Scratch.Cast.toString(args.DICTIONARY);
      const dictionary = getDictionaryByID(uid);
      if (!dictionary) return;

      const currentDictionaries = dictionary.value;
      const res =
        property === "values"
          ? Object.values(currentDictionaries)
          : Object.keys(currentDictionaries);
      return JSON.stringify(res);
    }

    lengthOf(args) {
      const uid = Scratch.Cast.toString(args.DICTIONARY);
      const dictionary = getDictionaryByID(uid);
      if (!dictionary) return;

      return Object.keys(dictionary.value).length;
    }

    containsProperty(args) {
      const value = args.VALUE;
      const uid = Scratch.Cast.toString(args.DICTIONARY);
      const dictionary = getDictionaryByID(uid);
      const property = Scratch.Cast.toString(args.PROPERTY);
      if (!dictionary) return;

      if (property === "key") {
        return !!Object.keys(dictionary.value).includes(value);
      } else return !!Object.values(dictionary.value).includes(value);
    }

    // sorted w/ love lmao -Ashime
    getDictionaries(a) {
      const stage = runtime.getTargetForStage();
      const editingTarget = runtime.getEditingTarget();
      if (!stage || !editingTarget) return [""];

      const stageDictionaries = _getDictionariesForTarget(stage);
      const targetDictionaries = _getDictionariesForTarget(editingTarget);

      let dictionaries = [];
      if (editingTarget.isStage) {
        dictionaries =
          stageDictionaries.length === 0 ? [""] : stageDictionaries;
      } else dictionaries = stageDictionaries.concat(targetDictionaries);

      if (dictionaries.length === 0) return [""];

      const text = () => {
        return ScratchBlocks.DropDownDiv.owner_.text_;
      };
      const value = () => {
        return ScratchBlocks.DropDownDiv.owner_.value_;
      };

      const names = dictionaries.map((dict) => dict.text).sort(compareStrings);
      for (let i = 0; i < names.length; i++) {
        const dict = dictionaries[i];
        names[names.indexOf(dict.text)] = dict;
      }
      dictionaries = names;

      // TO DO: Display name of dictionary to delete (need block ID)
      dictionaries.push({
        text: "Rename dictionary",
        value: () => renameDictionary(text(), value()),
      });
      dictionaries.push({
        text: `Delete dictionary`,
        value: () => deleteDictionary(value()),
      });
      return dictionaries;
    }
  }

  Scratch.extensions.register(new Dictionaries());
})(Scratch);
