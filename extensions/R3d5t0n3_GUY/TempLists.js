// Name: Temporary Lists
// ID: r3d5t0n3guyTempLists
// Description: Addon for Lily's "Temporary Variables" and "List Tools" that adds thread lists.
// By: R3d5t0n3_GUY <https://scratch.mit.edu/users/R3dstone_engineerer>
// Original: LilyMakesThings and Mio
// License: MIT AND LGPL-3.0

// REFERENCES:
// "Temporary Variables" By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>, Mio <https://scratch.mit.edu/users/0znzw/>
// "List Tools" By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This extension must run unsandboxed");
  } else {
    class TemporaryLists {
      getInfo() {
        return {
          id: "r3d5t0n3guyTempLists",
          name: Scratch.translate("Temporary Lists"),
          color1: "#ff4e1a",
          color3: "#ff1d00",
          blocks: [
            this.fieldParamTemplate("label", "Basic"),
            {
              opcode: "addToThreadList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("add [ITEM] to thread list [LIST]"),
              arguments: {
                ITEM: this.fieldParamTemplate("item"),
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "deleteFromThreadList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("delete [IDX] of thread list [LIST]"),
              arguments: {
                IDX: this.fieldParamTemplate("index"),
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "deleteAllOfThreadList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("delete all of thread list [LIST]"),
              arguments: {
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "insertIntoThreadList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "insert [ITEM] at [IDX] of thread list [LIST]",
              ),
              arguments: {
                ITEM: this.fieldParamTemplate("item"),
                IDX: this.fieldParamTemplate("index"),
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "replaceItemOfThreadList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "replace item [IDX] of thread list [LIST] with [ITEM]",
              ),
              arguments: {
                IDX: this.fieldParamTemplate("index"),
                LIST: this.fieldParamTemplate("list"),
                ITEM: this.fieldParamTemplate("item"),
              },
            },
            {
              opcode: "itemOfThreadList",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("item [IDX] of thread list [LIST]"),
              arguments: {
                IDX: this.fieldParamTemplate("index"),
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "indexInThreadList",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("index of [ITEM] in thread list [LIST]"),
              arguments: {
                ITEM: this.fieldParamTemplate("item"),
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "lengthOfThreadList",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("length of thread list [LIST]"),
              arguments: {
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "threadListContains",
              blockType: Scratch.BlockType.BOOLEAN,
              text: Scratch.translate("thread list [LIST] contains [ITEM] ?"),
              arguments: {
                LIST: this.fieldParamTemplate("list"),
                ITEM: this.fieldParamTemplate("item"),
              },
            },

            "---",
            this.fieldParamTemplate("label", "Advanced"),

            {
              opcode: "deleteItemsFromThreadList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "delete items [IDX1] to [IDX2] from thread list [LIST]",
              ),
              arguments: {
                IDX1: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: "1",
                },
                IDX2: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: "3",
                },
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "deleteAllInstancesFromThreadList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "delete all instances of [ITEM] in thread list [LIST]",
              ),
              arguments: {
                ITEM: this.fieldParamTemplate("item"),
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "replaceAllInstancesInThreadList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "replace all [ITEM1] with [ITEM2] thread list [LIST]",
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
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "setThreadListToList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("set thread list [LIST] to [LISTS]"),
              arguments: {
                LIST: this.fieldParamTemplate("list"),
                LISTS: this.fieldParamTemplate("lists"),
              },
            },

            this.isDependencyNotLoaded() ? undefined : "---",
            this.fieldParamTemplate(
              "label",
              "Iteration loops",
              this.isDependencyNotLoaded(),
            ),
            {
              opcode: "forEachItem",
              blockType: Scratch.BlockType.LOOP,
              text: Scratch.translate(
                "for each item value [ITEM] in thread list [LIST]",
              ),
              hideFromPalette: this.isDependencyNotLoaded(),
              arguments: {
                ITEM: this.fieldParamTemplate("item"),
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "forEachNum",
              blockType: Scratch.BlockType.LOOP,
              text: Scratch.translate(
                "for each item # [IDX] in thread list [LIST]",
              ),
              hideFromPalette: this.isDependencyNotLoaded(),
              arguments: {
                IDX: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "index",
                },
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "forEachItemNum",
              blockType: Scratch.BlockType.LOOP,
              text: Scratch.translate(
                "for each item value [ITEM] # [IDX] in thread list [LIST]",
              ),
              hideFromPalette: this.isDependencyNotLoaded(),
              arguments: {
                ITEM: this.fieldParamTemplate("item"),
                IDX: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "index",
                },
                LIST: this.fieldParamTemplate("list"),
              },
            },

            "---",
            this.fieldParamTemplate("label", "Misc"),
            {
              opcode: "setListToArray",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "set thread list [LIST] to array [ARRAY]",
              ),
              disableMonitor: true,
              arguments: {
                LIST: this.fieldParamTemplate("list"),
                ARRAY: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '["apple","banana"]',
                },
              },
            },
            {
              opcode: "getListAsArray",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("thread list [LIST] as array"),
              disableMonitor: true,
              arguments: {
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "threadListExists",
              blockType: Scratch.BlockType.BOOLEAN,
              text: Scratch.translate("thread list [LIST] exists?"),
              arguments: {
                LIST: this.fieldParamTemplate("list"),
              },
            },
            {
              opcode: "listThreadLists",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("active thread lists"),
              disableMonitor: true,
            },
          ].filter((i) => i),
          menus: {
            lists: { acceptReporters: true, items: "_getLists" },
          },
        };
      }

      /*--------FUNCTIONS--------*/

      // EXTENSION CONSTRUCTION
      getListObjectFromName(name, util) {
        const vm = Scratch.vm;
        const runtime = vm.runtime;
        const stageTarget = runtime.getTargetForStage();
        const target = util.target;
        let listObject = Object.create(null);

        listObject = stageTarget.lookupVariableByNameAndType(name, "list");
        if (listObject) return listObject;
        listObject = target.lookupVariableByNameAndType(name, "list");
        if (listObject) return listObject;
      }
      isDependencyNotLoaded() {
        return !(
          Scratch?.vm?.runtime?.extensionManager?.isExtensionLoaded(
            "lmsTempVars2",
          ) || false
        );
      }
      fieldParamTemplate(argType, text, hidden = false) {
        switch (argType) {
          case "list":
            return {
              type: Scratch.ArgumentType.STRING,
              defaultValue: Scratch.translate("list"),
            };
          case "item":
            return {
              type: Scratch.ArgumentType.STRING,
              defaultValue: Scratch.translate("thing"),
            };
          case "index":
            return { type: Scratch.ArgumentType.NUMBER, defaultValue: "1" };
          case "label":
            return {
              blockType: Scratch.BlockType.LABEL,
              text: Scratch.translate(text),
              hideFromPalette: hidden,
            };
          case "lists":
            return { type: Scratch.ArgumentType.STRING, menu: "lists" };
          default:
            return {};
        }
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

      // BASIC
      addToThreadList(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        if (args.LIST in thread.lists) {
          thread.lists[args.LIST].push(args.ITEM);
        } else {
          thread.lists[args.LIST] = [args.ITEM];
        }
      }
      deleteFromThreadList(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        if (args.LIST in thread.lists) {
          if (1 <= args.IDX < thread.lists[args.LIST].length + 1) {
            thread.lists[args.LIST].splice(Math.floor(args.IDX - 1), 1);
          }
        } else {
          thread.lists[args.LIST] = [];
        }
      }
      deleteAllOfThreadList(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        thread.lists[args.LIST] = [];
      }
      insertIntoThreadList(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        if (args.LIST in thread.lists) {
          if (1 <= args.IDX < thread.lists[args.LIST].length + 1) {
            thread.lists[args.LIST].splice(
              Math.floor(args.IDX - 1),
              0,
              args.ITEM,
            );
          }
        } else {
          thread.lists[args.LIST] = [];
        }
      }
      replaceItemOfThreadList(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        if (args.LIST in thread.lists) {
          if (1 <= args.IDX < thread.lists[args.LIST].length + 1) {
            thread.lists[args.LIST][args.IDX - 1] = args.ITEM;
          }
        } else {
          thread.lists[args.LIST] = [];
        }
      }
      itemOfThreadList(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        if (
          args.LIST in thread.lists
            ? 1 <= args.IDX < thread.lists[args.LIST].length + 1
            : false
        ) {
          return `${thread.lists?.[args.LIST]?.[args.IDX - 1] || ""}`;
        } else {
          return "";
        }
      }
      indexInThreadList(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        if (args.LIST in thread.lists) {
          return `${thread.lists[args.LIST].indexOf(args.ITEM) + 1 || 0}`;
        } else {
          return "";
        }
      }
      lengthOfThreadList(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        if (args.LIST in thread.lists) {
          return `${thread.lists?.[args.LIST]?.length || ""}`;
        } else {
          return "";
        }
      }
      threadListContains(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        if (args.LIST in thread.lists) {
          return thread.lists?.[args.LIST]?.indexOf(args.ITEM) > -1;
        } else {
          return false;
        }
      }

      // ADVANCED
      deleteItemsFromThreadList(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        if (args.LIST in thread.lists) {
          if (1 <= args.IDX1 < thread.lists[args.LIST].length + 1) {
            if (1 <= args.IDX2 < thread.lists[args.LIST].length + 1) {
              let START = Math.min(
                  Math.floor(args.IDX1),
                  Math.floor(args.IDX2),
                ),
                LEN =
                  Math.max(Math.floor(args.IDX1), Math.floor(args.IDX2)) -
                  START;
              thread.lists[args.LIST].splice(START - 1, LEN + 1);
            }
          }
        } else {
          thread.lists[args.LIST] = [];
        }
      }
      deleteAllInstancesFromThreadList(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        if (args.LIST in thread.lists) {
          thread.lists[args.LIST] = thread.lists[args.LIST].filter(
            (i) => i !== args.ITEM,
          );
        } else {
          thread.lists[args.LIST] = [];
        }
      }
      replaceAllInstancesInThreadList(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        if (args.LIST in thread.lists) {
          thread.lists[args.LIST] = thread.lists[args.LIST].map((i) =>
            i === args.ITEM1 ? args.ITEM2 : i,
          );
        } else {
          thread.lists[args.LIST] = [];
        }
      }
      setThreadListToList(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        const list = this.getListObjectFromName(
          Scratch.Cast.toString(args.LISTS),
          util,
        );
        thread.lists[args.LIST] = list.value;
      }

      // ITERATION LOOPS (ADD "Temporary Variables" (by LilyMakesThings and Mio) TO YOUR PROJECT IF YOU WANT THESE)
      forEachItem(args, util) {
        const thread = util.thread;
        if (thread.lists ? args.LIST in thread.lists : false) {
          const list = thread.lists[args.LIST];
          if (list && !this.isDependencyNotLoaded()) {
            const listLength = list.length;
            if (!thread.variables) thread.variables = {};
            const vars = thread.variables;

            if (typeof util.stackFrame.index === "undefined") {
              util.stackFrame.index = 0;
            }

            if (util.stackFrame.index < listLength) {
              util.stackFrame.index++;
              vars[args.ITEM] = list[util.stackFrame.index - 1];
              return true;
            }
          }
        }
      }
      forEachNum(args, util) {
        const thread = util.thread;
        if (thread.lists ? args.LIST in thread.lists : false) {
          const list = thread.lists[args.LIST];
          if (list && !this.isDependencyNotLoaded()) {
            const listLength = list.length;
            if (!thread.variables) thread.variables = {};
            const vars = thread.variables;

            if (typeof util.stackFrame.index === "undefined") {
              util.stackFrame.index = 0;
            }

            if (util.stackFrame.index < listLength) {
              util.stackFrame.index++;
              vars[args.IDX] = util.stackFrame.index;
              return true;
            }
          }
        }
      }
      forEachItemNum(args, util) {
        const thread = util.thread;
        if (thread.lists ? args.LIST in thread.lists : false) {
          const list = thread.lists[args.LIST];
          if (list && !this.isDependencyNotLoaded()) {
            const listLength = list.length;
            if (!thread.variables) thread.variables = {};
            const vars = thread.variables;

            if (typeof util.stackFrame.index === "undefined") {
              util.stackFrame.index = 0;
            }

            if (util.stackFrame.index < listLength) {
              util.stackFrame.index++;
              vars[args.IDX] = util.stackFrame.index;
              vars[args.ITEM] = list[vars[args.IDX] - 1];
              return true;
            }
          }
        }
      }

      // MISC
      setListToArray(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        let array;
        try {
          array = JSON.parse(args.ARRAY);
        } catch (error) {
          array = [];
        }
        thread.lists[args.LIST] = array;
      }
      getListAsArray(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        if (args.LIST in thread.lists) {
          return JSON.stringify(thread.lists[args.LIST]);
        } else {
          return "";
        }
      }
      threadListExists(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        return Object.prototype.hasOwnProperty.call(thread.lists, args.LIST);
      }
      listThreadLists(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        return Object.keys(thread.lists).join(",");
      }
    }
    const TempLists = new TemporaryLists();
    if (TempLists.isDependencyNotLoaded())
      console.warn(
        'Install "Temporary Variables" (by LilyMakesThings) to access iteration loops',
      );
    Scratch.extensions.register(TempLists);
  }
})(Scratch);
