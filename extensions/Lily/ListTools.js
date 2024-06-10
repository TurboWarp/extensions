// Name: List Tools
// ID: lmsListTools
// Description: An assortment of new ways to interact with lists.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>
// License: MIT AND LGPL-3.0

// (It's getting harder and harder to think of original descriptions now)

(function (Scratch) {
  "use strict";

  /* -- SETUP -- */
  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const getVarObjectFromName = function (name, util, type) {
    const stageTarget = runtime.getTargetForStage();
    const target = util.target;
    let listObject = Object.create(null);

    listObject = stageTarget.lookupVariableByNameAndType(name, type);
    if (listObject) return listObject;
    listObject = target.lookupVariableByNameAndType(name, type);
    if (listObject) return listObject;
  };

  class Data {
    getInfo() {
      return {
        id: "lmsData",
        name: Scratch.translate("List Tools"),
        color1: "#ff661a",
        color2: "#f2590d",
        color3: "#e64d00",
        blocks: [
          {
            opcode: "deleteItems",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete items [NUM1] to [NUM2] of [LIST]"),
            arguments: {
              NUM1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
              },
              NUM2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "3",
              },
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists",
              },
            },
          },
          {
            opcode: "deleteAllOfItem",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete all [ITEM] in [LIST]"),
            arguments: {
              ITEM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "thing",
              },
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists",
              },
            },
          },
          {
            opcode: "replaceAllOfItem",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "replace all [ITEM1] with [ITEM2] in [LIST]"
            ),
            arguments: {
              ITEM1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              ITEM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "banana",
              },
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists",
              },
            },
          },
          {
            opcode: "repeatList",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("repeat [LIST1] [NUM] times in [LIST2]"),
            arguments: {
              LIST1: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists",
              },
              LIST2: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists",
              },
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "3",
              },
            },
          },

          "---",

          {
            opcode: "getListJoin",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get list [LIST] joined by [STRING]"),
            disableMonitor: true,
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists",
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ",",
              },
            },
          },
          {
            opcode: "timesItemAppears",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("# of times [ITEM] appears in [LIST]"),
            disableMonitor: true,
            arguments: {
              ITEM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "thing",
              },
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists",
              },
            },
          },
          {
            opcode: "itemIndex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("index # [INDEX] of item [ITEM] in [LIST]"),
            disableMonitor: true,
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
              },
              ITEM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "thing",
              },
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists",
              },
            },
          },

          "---",

          {
            opcode: "listIsEmpty",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("[LIST] is empty?"),
            disableMonitor: true,
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists",
              },
            },
          },
          {
            opcode: "itemNumExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("item [NUM] exists in [LIST]?"),
            disableMonitor: true,
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
              },
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists",
              },
            },
          },
          {
            opcode: "orderIs",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("order of [LIST] is [ORDER]?"),
            disableMonitor: true,
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists",
              },
              ORDER: {
                type: Scratch.ArgumentType.STRING,
                menu: "orderTypeSort",
              },
            },
          },

          "---",

          {
            opcode: "orderList",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set order of [LIST] to [ORDER]"),
            disableMonitor: true,
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists",
              },
              ORDER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "reversed",
                menu: "orderType",
              },
            },
          },
          {
            opcode: "setListToList",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set items of [LIST1] to [LIST2]"),
            arguments: {
              LIST1: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists",
              },
              LIST2: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists",
              },
            },
          },
          {
            opcode: "joinLists",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("concatenate [LIST1] onto [LIST2]"),
            arguments: {
              LIST1: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists",
              },
              LIST2: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists",
              },
            },
          },

          "---",

          {
            opcode: "forEachListItem",
            blockType: Scratch.BlockType.LOOP,
            text: Scratch.translate("for each item value [VAR] in [LIST]"),
            hideFromPalette:
              !runtime.extensionManager.isExtensionLoaded("lmsTempVars2"),
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "thread variable",
              },
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists",
              },
            },
          },
          {
            opcode: "forEachListItemNum",
            blockType: Scratch.BlockType.LOOP,
            text: Scratch.translate("for each item # [VAR] in [LIST]"),
            hideFromPalette:
              !runtime.extensionManager.isExtensionLoaded("lmsTempVars2"),
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "thread variable",
              },
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists",
              },
            },
          },

          "---",

          {
            opcode: "setListArray",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [LIST] to array [ARRAY]"),
            disableMonitor: true,
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists",
              },
              ARRAY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["apple","banana"]',
              },
            },
          },
          {
            opcode: "getListArray",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[LIST] as array"),
            disableMonitor: true,
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists",
              },
            },
          },
        ],
        menus: {
          operator: {
            acceptReporters: false,
            items: [
              {
                text: "=",
                value: "=",
              },
              {
                text: ">",
                value: ">",
              },
              {
                text: "<",
                value: "<",
              },
            ],
          },
          orderType: {
            acceptReporters: false,
            items: [
              {
                text: Scratch.translate("reversed"),
                value: "reversed",
              },
              {
                text: Scratch.translate("ascending"),
                value: "ascending",
              },
              {
                text: Scratch.translate("descending"),
                value: "descending",
              },
              {
                text: Scratch.translate("randomized"),
                value: "randomised",
              },
            ],
          },
          orderTypeSort: {
            acceptReporters: false,
            items: [
              {
                text: Scratch.translate("ascending"),
                value: "ascending",
              },
              {
                text: Scratch.translate("descending"),
                value: "descending",
              },
            ],
          },
          indexType: {
            acceptReporters: false,
            items: [
              {
                text: Scratch.translate("first"),
                value: "first",
              },
              {
                text: Scratch.translate("last"),
                value: "last",
              },
              {
                text: Scratch.translate("random"),
                value: "random",
              },
            ],
          },
          lists: {
            acceptReporters: true,
            items: "_getLists",
          },
        },
      };
    }

    deleteItems(args, util) {
      const list = getVarObjectFromName(args.LIST, util, "list");
      if (!list) return false;
      const listLength = list.value.length;
      let num1 = 0;
      let num2 = 0;
      if (!list) return;
      if (args.NUM1 > args.NUM2) {
        num1 = args.NUM2 - 1;
        num2 = args.NUM1 - 1;
      } else {
        num1 = args.NUM1 - 1;
        num2 = args.NUM2 - 1;
      }
      const listPart1 = list.value.slice(0, num1);
      const listPart2 = list.value.slice(num2 + 1, listLength);
      list.value = listPart1.concat(listPart2);
    }

    deleteAllOfItem(args, util) {
      const list = getVarObjectFromName(args.LIST, util, "list");
      if (!list) return;
      const newList = list.value.filter(function (model) {
        return model !== args.ITEM;
      });
      list.value = newList;
    }

    replaceAllOfItem(args, util) {
      const list = getVarObjectFromName(args.LIST, util, "list");
      if (!list) return;
      const listLength = list.value.length;
      const item1 = args.ITEM1;
      const item2 = args.ITEM2;
      let newList = [];
      for (let i = 0; i < listLength; i++) {
        if (list.value[i] === item1) {
          newList.push(item2);
        } else {
          newList.push(list.value[i]);
        }
      }
      list.value = newList;
    }

    repeatList(args, util) {
      const list1 = getVarObjectFromName(args.LIST1, util, "list");
      if (!list1) return;
      const list2 = getVarObjectFromName(args.LIST2, util, "list");
      if (!list2) return;
      const currentVal = list1.value;
      for (let i = 0; i < args.NUM; i++) {
        list1.value = list1.value.concat(currentVal);
      }
    }

    getListJoin(args, util) {
      const list = getVarObjectFromName(args.LIST, util, "list");
      if (!list) return "";
      return list.value.join(args.STRING);
    }

    timesItemAppears(args, util) {
      const list = getVarObjectFromName(args.LIST, util, "list");
      if (!list) return 0;
      return list.value.filter((model) => model == args.ITEM).length;
    }

    itemIndex(args, util) {
      const list = getVarObjectFromName(args.LIST, util, "list");
      if (!list) return 0;
      let indexes = [];
      for (let index = 0; index < list.value.length; index++) {
        if (list.value[index] === args.ITEM) {
          indexes.push(index);
        }
      }

      switch (args.INDEX) {
        case "_first_":
          return Scratch.Cast.toNumber(indexes[0] + 1);
        case "_last_":
          return Scratch.Cast.toNumber(indexes[indexes.length - 1] + 1);
        case "_random_":
          return Scratch.Cast.toNumber(
            indexes[Math.floor(Math.random() * indexes.length)] + 1
          );
        default:
          return Scratch.Cast.toNumber(indexes[args.INDEX - 1] + 1);
      }
    }

    listIsEmpty(args, util) {
      const list = getVarObjectFromName(args.LIST, util, "list");
      if (!list) return true;
      if (list.value.length > 0) return false;
      return true;
    }

    itemNumExists(args, util) {
      const list = getVarObjectFromName(args.LIST, util, "list");
      if (!list) return false;
      const listIndex = Scratch.Cast.toListIndex(
        args.NUM,
        list.value.length,
        false
      );
      if (listIndex === Scratch.Cast.LIST_INVALID) return false;
      return true;
    }

    orderIs(args, util) {
      const list = getVarObjectFromName(args.LIST, util, "list");
      if (!list) return false;

      for (let i = 0; i < list.value.length - 1; i++) {
        const compare = Scratch.Cast.compare(list.value[i + 1], list.value[i]);
        if (compare > 0 && args.ORDER === "descending") return false;
        if (compare < 0 && args.ORDER === "ascending") return false;
      }
      return true;
    }

    orderList(args, util) {
      const list = getVarObjectFromName(args.LIST, util, "list");
      if (!list) return;
      if (args.ORDER === "reversed") {
        list.value.reverse();
      } else if (args.ORDER === "randomised") {
        const randomised = list.value
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
        list.value = randomised;
      } else if (args.ORDER === "ascending") {
        list.value.sort(Scratch.Cast.compare);
      } else if (args.ORDER === "descending") {
        list.value.sort(Scratch.Cast.compare).reverse();
      }
      list._monitorUpToDate = false;
    }

    setListToList(args, util) {
      const list1 = getVarObjectFromName(args.LIST1, util, "list");
      if (!list1) return;
      const list2 = getVarObjectFromName(args.LIST2, util, "list");
      if (!list2) return;
      list1.value = list2.value;
    }

    joinLists(args, util) {
      const list1 = getVarObjectFromName(args.LIST1, util, "list");
      if (!list1) return;
      const list2 = getVarObjectFromName(args.LIST2, util, "list");
      if (!list2) return;
      list2.value = list2.value.concat(list1.value);
    }

    forEachListItem(args, util) {
      const list = getVarObjectFromName(args.LIST, util, "list");
      if (!list) return false;
      const listLength = list.value.length;

      const thread = util.thread;
      if (!thread.variables) thread.variables = {};
      const vars = thread.variables;

      if (typeof util.stackFrame.index === "undefined") {
        util.stackFrame.index = 0;
      }

      if (util.stackFrame.index < listLength) {
        let itemIndex = util.stackFrame.index;
        vars[args.VAR] = list.value[itemIndex];
        util.stackFrame.index++;
        return true;
      }
    }

    forEachListItemNum(args, util) {
      const list = getVarObjectFromName(args.LIST, util, "list");
      if (!list) return false;
      const listLength = list.value.length;

      const thread = util.thread;
      if (!thread.variables) thread.variables = {};
      const vars = thread.variables;

      if (typeof util.stackFrame.index === "undefined") {
        util.stackFrame.index = 0;
      }

      if (util.stackFrame.index < listLength) {
        util.stackFrame.index++;
        vars[args.VAR] = util.stackFrame.index;
        return true;
      }
    }

    setListArray(args, util) {
      const list = getVarObjectFromName(args.LIST, util, "list");
      if (!list) return;

      let array;
      try {
        array = JSON.parse(args.ARRAY);
      } catch (error) {
        return;
      }

      if (!Array.isArray(array)) return;
      const newArray = array;
      list.value = newArray;
      list._monitorUpToDate = false;
    }

    getListArray(args, util) {
      const list = getVarObjectFromName(args.LIST, util, "list");
      if (!list) return "";
      return JSON.stringify(list.value);
    }

    _getLists() {
      // @ts-expect-error - Blockly not typed yet
      const lists =
        typeof Blockly === "undefined"
          ? []
          : Blockly.getMainWorkspace()
              .getVariableMap()
              .getVariablesOfType("list")
              .map((model) => model.name);
      if (lists.length > 0) {
        return lists;
      } else {
        return [""];
      }
    }
  }
  Scratch.extensions.register(new Data());
})(Scratch);
