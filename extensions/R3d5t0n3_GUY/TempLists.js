// Name: Temporary Lists
// ID: r3d5t0n3guyTempLists
// Description: Addon for Lily's "Temporary Variables" that adds thread lists
// Original Extensions By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>
// This Add-On By: R3d5t0n3_GUY <https://github.com/R3d5t0n3GUY>
// License: MIT AND LGPL-3.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This extension must run unsandboxed")
  } else if (!Scratch.vm.runtime.extensionManager.isExtensionLoaded("lmsTempVars2")) {
    throw new Error('Please install "Temporary Variables" (by LilyMakesThings) before loading this extension!')
  } else {
    const label = (name, hidden) => ({
      blockType: Scratch.BlockType.LABEL,
      text: name,
      hideFromPalette: hidden,
    });

    class TempLists {
      getInfo() {
        return {
          id: "r3d5t0n3guyTempLists",
          name: Scratch.translate("Temporary Lists"),
          color1: "#ff661a",
          color2: "#f2590d",
          color3: "#e64d00",
          blocks: [
            label(Scratch.translate("Basic"), false),
            {
              opcode: "addToThreadList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("add [ITEM] to list [LIST]"),
              arguments: {
                ITEM: this.fieldParamTemplate("item"),
                LIST: this.fieldParamTemplate("list")
              },
            },
            {
              opcode: "deleteFromThreadList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("delete [IDX] of list [LIST]"),
              arguments: {
                IDX: this.fieldParamTemplate("index"),
                LIST: this.fieldParamTemplate("list")
              },
            },
            {
              opcode: "deleteAllOfThreadList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("delete all of list [LIST]"),
              arguments: {
                LIST: this.fieldParamTemplate("list")
              },
            },
            {
              opcode: "insertIntoThreadList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("insert [ITEM] at [IDX] of list [LIST]"),
              arguments: {
                ITEM: this.fieldParamTemplate("item"),
                IDX: this.fieldParamTemplate("index"),
                LIST: this.fieldParamTemplate("list")
              },
            },
            {
              opcode: "replaceItemOfThreadList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("replace item [IDX] of list [LIST] with [ITEM]"),
              arguments: {
                IDX: this.fieldParamTemplate("index"),
                LIST: this.fieldParamTemplate("list"),
                ITEM: this.fieldParamTemplate("item")
              },
            },
            {
              opcode: "itemOfThreadList",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("item [IDX] of list [LIST]"),
              arguments: {
                IDX: this.fieldParamTemplate("index"),
                LIST: this.fieldParamTemplate("list")
              }
            },
            {
              opcode: "indexInThreadList",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("index of [ITEM] in list [LIST]"),
              arguments: {
                ITEM: this.fieldParamTemplate("item"),
                LIST: this.fieldParamTemplate("list")
              }
            },
            {
              opcode: "lengthOfThreadList",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("length of list [LIST]"),
              arguments: {
                LIST: this.fieldParamTemplate("list")
              }
            },
            {
              opcode: "threadListContains",
              blockType: Scratch.BlockType.BOOLEAN,
              text: Scratch.translate("list [LIST] contains [ITEM] ?"),
              arguments: {
                LIST: this.fieldParamTemplate("list"),
                ITEM: this.fieldParamTemplate("item")
              }
            },

            "---",

            label(Scratch.translate("Iteration loops"), false),
            {
              opcode: "forEachItem",
              blockType: Scratch.BlockType.LOOP,
              text: Scratch.translate("for each item value [ITEM] in [LIST]"),
              arguments: {
                ITEM: this.fieldParamTemplate("item"),
                LIST: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "thread list"
                }
              },
            },
            {
              opcode: "forEachNum",
              blockType: Scratch.BlockType.LOOP,
              text: Scratch.translate("for each item # [IDX] in [LIST]"),
              arguments: {
                IDX: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "index",
                },
                LIST: this.fieldParamTemplate("list")
              },
            },
            {
              opcode: "forEachItemNum",
              blockType: Scratch.BlockType.LOOP,
              text: Scratch.translate("for each item value [ITEM] # [IDX] in [LIST]"),
              arguments: {
                ITEM: this.fieldParamTemplate("item"),
                IDX: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "index",
                },
                LIST: this.fieldParamTemplate("list")
              },
            },
            
            "---",

            label(Scratch.translate("JSON"), false),
            {
              opcode: "setListToArray",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("set [LIST] to array [ARRAY]"),
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
              text: Scratch.translate("[LIST] as array"),
              disableMonitor: true,
              arguments: {
                LIST: this.fieldParamTemplate("list")
              },
            },

            "---",
            label(Scratch.translate("Misc"), false),
            {
              opcode: "threadListExists",
              blockType: Scratch.BlockType.BOOLEAN,
              text: Scratch.translate("thread list [LIST] exists?"),
              arguments: {
                LIST: this.fieldParamTemplate("list")
              },
            },
            {
              opcode: "listThreadLists",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("active thread lists"),
              disableMonitor: true,
            },
          ],
        };
      }

      fieldParamTemplate(argType) {
        switch (argType) {
          case "list": return { type: Scratch.ArgumentType.STRING, defaultValue: "thread list" };
          case "item": return { type: Scratch.ArgumentType.STRING, defaultValue: "thing" };
          case "index": return { type: Scratch.ArgumentType.NUMBER, defaultValue: "1" };
          default: return {};
        }
      }

      addToThreadList(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        if (args.LIST in thread.lists) {
          thread.lists[args.LIST].push(args.ITEM)
        } else {
          thread.lists[args.LIST] = [args.ITEM]
        }
      }

      deleteFromThreadList(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        if (args.LIST in thread.lists) {
          if (1 <= args.IDX < thread.lists[args.LIST].length + 1) {
            thread.lists[args.LIST].splice(Math.floor(args.IDX - 1), 1)
          }
        }
      }

      deleteAllOfThreadList(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        thread.lists[args.LIST] = []
      }

      insertIntoThreadList(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        if (args.LIST in thread.lists) {
          if (1 <= args.IDX < thread.lists[args.LIST].length + 1) {
            thread.lists[args.LIST].splice(Math.floor(args.IDX - 1), 0, args.ITEM)
          }
        }
      }

      replaceItemOfThreadList(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        if (args.LIST in thread.lists) {
          if (1 <= args.IDX < thread.lists[args.LIST].length + 1) {
            thread.lists[args.LIST] = args.ITEM
          }
        }
      }

      itemOfThreadList(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        if (args.LIST in thread.lists ? (1 <= args.IDX < thread.lists[args.LIST].length + 1) : false) {
          return thread.lists[args.LIST][args.ITEM]
        } else {
          return ""
        }
      }

      indexInThreadList(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        if (args.LIST in thread.lists) {
          return thread.lists[args.LIST].indexOf(args.ITEM) + 1
        } else {
          return ""
        }
      }

      lengthOfThreadList(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        if (args.LIST in thread.lists) {
          return thread.lists[args.LIST].length
        } else {
          return ""
        }
      }

      threadListContains(args, util) {

      }

      forEachItem(args, util) {
        const thread = util.thread;
        if (thread.lists ? args.LIST in thread.lists : false) {
          const list = thread.lists[args.LIST]
          if (!list) return false;
          const listLength = list.length;
          if (!thread.variables) thread.variables = {};
          const vars = thread.variables;

          if (typeof util.stackFrame.index === "undefined") {
            util.stackFrame.index = 0;
          }

          if (util.stackFrame.index < listLength) {
            util.stackFrame.index++;
            vars[args.ITEM] = list[util.stackFrame.index - 1]
            return true;
          }
        } else {
          return false
        }
      }

      forEachNum(args, util) {
        const thread = util.thread;
        if (thread.lists ? args.LIST in thread.lists : false) {
          const list = thread.lists[args.LIST]
          if (!list) return false;
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
        } else {
          return false
        }
      }

      forEachItemNum(args, util) {
        const thread = util.thread;
        if (thread.lists ? args.LIST in thread.lists : false) {
          const list = thread.lists[args.LIST]
          if (!list) return false;
          const listLength = list.length;
          if (!thread.variables) thread.variables = {};
          const vars = thread.variables;

          if (typeof util.stackFrame.index === "undefined") {
            util.stackFrame.index = 0;
          }

          if (util.stackFrame.index < listLength) {
            util.stackFrame.index++;
            vars[args.IDX] = util.stackFrame.index;
            vars[args.ITEM] = list[vars[args.IDX] - 1]
            return true;
          }
        } else {
          return false
        }
      }

      setListToArray(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        let array;
        try {
          array = JSON.parse(args.ARRAY);
        } catch (error) {
          array = []
        }
        thread.lists[args.LIST] = array
      }

      getListAsArray(args, util) {
        const thread = util.thread;
        if (!thread.lists) {
          thread.lists = Object.create(null);
        }
        if (args.LIST in thread.lists) {
          return JSON.stringify(thread.lists[args.LIST])
        } else {
          return ""
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
    
    const extension = new TempLists();
    Scratch.vm.runtime.ext_r3d5t0n3guyTempLists = extension;
    Scratch.extensions.register(extension);
  }
})(Scratch);