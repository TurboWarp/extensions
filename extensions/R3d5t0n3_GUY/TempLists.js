// Name: Temporary Lists
// ID: r3d5t0n3guyTempLists
// Description: Addon for Lily's "Temporary Variables" and "List Tools" that adds temporary lists for various scopes.
// By: R3d5t0n3_GUY <https://scratch.mit.edu/users/R3dstone_engineerer>
// Original: LilyMakesThings, Miyo, SharkPool
// License: MIT AND LGPL-3.0

// REFERENCES:
// "Temporary Variables" By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>, Miyo <https://scratch.mit.edu/users/0znzw/>
// "List Tools" By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>
// "Extra Controls" By: SharkPool

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This extension must run unsandboxed");
  } else {
    class TemporaryLists {
      constructor() {
        this.resetTemporaryLists();

        Scratch.vm.runtime.on("PROJECT_START", () => {
          this.resetTemporaryLists();
        });
        Scratch.vm.runtime.on("PROJECT_STOP_ALL", () => {
          this.resetTemporaryLists();
        });
        Scratch.vm.runtime.on("targetWasRemoved", (target) => {
          this.scopedLists = this?.scopedLists ?? Object.create(null);
          const id = target.id;
          delete this.scopedLists[id];
        });
      }

      getInfo() {
        let iconURI = {
          arrow:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjQgMjQiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGQ9Ik0yMy4zIDExYy0uMy42LS45IDEtMS41IDFoLTEuNmMtLjEgMS4zLS41IDIuNS0xLjEgMy42LS45IDEuNy0yLjMgMy4yLTQuMSA0LjEtMS43LjktMy42IDEuMi01LjUuOS0xLjgtLjMtMy41LTEuMS00LjktMi4zLS43LS43LS43LTEuOSAwLTIuNi42LS42IDEuNi0uNyAyLjMtLjJIN2MuOS42IDEuOS45IDIuOS45czEuOS0uMyAyLjctLjljMS4xLS44IDEuOC0yLjEgMS44LTMuNWgtMS41Yy0uOSAwLTEuNy0uNy0xLjctMS43IDAtLjQuMi0uOS41LTEuMmw0LjQtNC40Yy43LS42IDEuNy0uNiAyLjQgMEwyMyA5LjJjLjUuNS42IDEuMi4zIDEuOHoiIHN0eWxlPSJmaWxsOiMwMDAzIi8+PHBhdGggZD0iTTIxLjggMTFoLTIuNmMwIDEuNS0uMyAyLjktMSA0LjItLjggMS42LTIuMSAyLjgtMy43IDMuNi0xLjUuOC0zLjMgMS4xLTQuOS44LTEuNi0uMi0zLjItMS00LjQtMi4xLS40LS4zLS40LS45LS4xLTEuMi4zLS40LjktLjQgMS4yLS4xIDEgLjcgMi4yIDEuMSAzLjQgMS4xczIuMy0uMyAzLjMtMWMuOS0uNiAxLjYtMS41IDItMi42LjMtLjkuNC0xLjguMi0yLjhoLTIuNGMtLjQgMC0uNy0uMy0uNy0uNyAwLS4yLjEtLjMuMi0uNGw0LjQtNC40Yy4zLS4zLjctLjMuOSAwTDIyIDkuOGMuMy4zLjQuNi4zLjlzLS4zLjMtLjUuM3oiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=",
        };
        let blockInfo = {
          id: "r3d5t0n3guyTempLists",
          name: Scratch.translate("Temporary Lists"),
          color1: "#ff4e1a",
          color3: "#ff1d00",
          blocks: [
            this.fieldParamTemplate("label", "Basic"),
            {
              opcode: "addToTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("add [ITEM] to [SCOPE] list [LIST]"),
              arguments: {
                ITEM: this.fieldParamTemplate("string", "thing"),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              }
            },
            {
              opcode: "deleteFromTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("delete [IDX] of [SCOPE] list [LIST]"),
              arguments: {
                IDX: this.fieldParamTemplate("index", "1"),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              }
            },
            {
              opcode: "deleteAllOfTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("delete all of [SCOPE] list [LIST]"),
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              }
            },
            {
              opcode: "insertIntoTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("insert [ITEM] at [IDX] of [SCOPE] list [LIST]"),
              arguments: {
                ITEM: this.fieldParamTemplate("string", "thing"),
                IDX: this.fieldParamTemplate("index", "1"),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              }
            },
            {
              opcode: "replaceItemOfTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("replace item [IDX] of [SCOPE] list [LIST] with [ITEM]"),
              arguments: {
                IDX: this.fieldParamTemplate("index", "1"),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
                ITEM: this.fieldParamTemplate("string", "thing")
              }
            },
            {
              opcode: "itemOfTempList",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("item [IDX] of [SCOPE] list [LIST]"),
              arguments: {
                IDX: this.fieldParamTemplate("index", "1"),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              }
            },
            {
              opcode: "indexInTempList",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("index of [ITEM] in [SCOPE] list [LIST]"),
              arguments: {
                ITEM: this.fieldParamTemplate("string", "thing"),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              }
            },
            {
              opcode: "lengthOfTempList",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("length of [SCOPE] list [LIST]"),
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              }
            },
            {
              opcode: "tempListContains",
              blockType: Scratch.BlockType.BOOLEAN,
              text: Scratch.translate("[SCOPE] list [LIST] contains [ITEM] ?"),
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
                ITEM: this.fieldParamTemplate("string", "thing"),
              } 
            },

            "---",
            this.fieldParamTemplate("label", "Advanced"),
            {
              opcode: "deleteItemsFromTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("delete items [IDX1] to [IDX2] from [SCOPE] list [LIST]"),
              arguments: {
                IDX1: this.fieldParamTemplate("index", "1"),
                IDX2: this.fieldParamTemplate("index", "3"),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              }
            },
            {
              opcode: "deleteAllInstancesFromTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("delete all instances of [ITEM] in [SCOPE] list [LIST]"),
              arguments: {
                ITEM: this.fieldParamTemplate("string", "thing"),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              }
            },
            {
              opcode: "replaceAllInstancesInTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("replace all [ITEM1] with [ITEM2] in [SCOPE] list [LIST]"),
              arguments: {
                ITEM1: this.fieldParamTemplate("string", "apple"),
                ITEM2: this.fieldParamTemplate("string", "banana"),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              }
            },
            {
              opcode: "sortTempList",
              BlockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("sort [SCOPE] list [LIST] by [METHOD]"),
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
                METHOD: this.fieldParamTemplate("menu", "sortMethod"),
              }
            },
            {
              opcode: "deleteTempList",
              BlockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("delete [SCOPE] list [LIST]"),
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              }
            },
            {
              opcode: "deleteAllTempLists",
              BlockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("delete all [SCOPE] lists"),
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
              },
            },

            this.fieldParamTemplate(
              "separator",
              "",
              this.isDependencyNotLoaded()
            ),
            this.fieldParamTemplate(
              "label",
              "Iteration loops",
              this.isDependencyNotLoaded()
            ),
            {
              opcode: "forOfLoop",
              blockType: Scratch.BlockType.LOOP,
              text: Scratch.translate("for each value [ITEM] of [SCOPE] list [LIST]"),
              hideFromPalette: this.isDependencyNotLoaded(),
              arguments: {
                ITEM: this.fieldParamTemplate("string", "thing"),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              }
            },
            {
              opcode: "forInLoop",
              blockType: Scratch.BlockType.LOOP,
              text: Scratch.translate("for each # [IDX] in [SCOPE] list [LIST]"),
              hideFromPalette: this.isDependencyNotLoaded(),
              arguments: {
                IDX: this.fieldParamTemplate("string", "index"),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              }
            },
            {
              opcode: "forEachLoop",
              blockType: Scratch.BlockType.LOOP,
              text: Scratch.translate("for each value [ITEM] # [IDX] in [SCOPE] list [LIST]"),
              hideFromPalette: this.isDependencyNotLoaded(),
              arguments: {
                ITEM: this.fieldParamTemplate("string", "thing"),
                IDX: this.fieldParamTemplate("string", "index"),
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              }
            },
            {
              opcode: "loopFlowControl",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("[MODE] [ICON]"),
              hideFromPalette: this.isDependencyNotLoaded(),
              isTerminal: true,
              arguments: {
                MODE: this.fieldParamTemplate("menu", "loopFlowControl"),
                ICON: this.fieldParamTemplate("image", iconURI.arrow),
              },
            },

            "---",
            this.fieldParamTemplate("label", "Misc"),
            {
              opcode: "setTempList1ToTempList2",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("set [SCOPE1] list [LIST1] to [SCOPE2] list [LIST2]"),
              arguments: {
                SCOPE1: this.fieldParamTemplate("menu", "scope"),
                LIST1: this.fieldParamTemplate("string", "list1"),
                SCOPE2: this.fieldParamTemplate("menu", "scope"),
                LIST2: this.fieldParamTemplate("string", "list2"),
              }
            },
            {
              opcode: "setTempListToList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("set [SCOPE] list [LIST] to [LISTS]"),
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
                LISTS: this.fieldParamTemplate("menu", "lists"),
              },
            },
            {
              opcode: "splitStringToTempList",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("set [SCOPE] list [LIST] to [STRING] split by [DELIMITER]"),
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
                STRING: this.fieldParamTemplate("string", "apple,banana,cherry,durian,elderberry"),
                DELIMITER: this.fieldParamTemplate("string", ","),
              }
            },
            {
              opcode: "joinTempListToString",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("join [SCOPE] list [LIST] by [DELIMITER]"),
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
                DELIMITER: this.fieldParamTemplate("string", ",")
              },
            },
            {
              opcode: "setTempListToArray",
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate("set [SCOPE] list [LIST] to array [ARRAY]"),
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
                ARRAY: this.fieldParamTemplate("string", '["apple","banana", ["cherry", "durian", ["elderberry"]]]'),
              }
            },
            {
              opcode: "getTempListAsArray",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("[SCOPE] list [LIST] as array"),
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              }
            },
            { //can't just use 'isListInEnvironment' here
              opcode: "tempListExists",
              blockType: Scratch.BlockType.BOOLEAN,
              text: Scratch.translate("[SCOPE] list [LIST] exists?"),
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
                LIST: this.fieldParamTemplate("string", "list"),
              }
            },
            {
              opcode: "listTempLists",
              blockType: Scratch.BlockType.REPORTER,
              text: Scratch.translate("active [SCOPE] lists"),
              disableMonitor: true,
              arguments: {
                SCOPE: this.fieldParamTemplate("menu", "scope"),
              }
            },
          ].filter((i) => i),
          menus: {
            loopFlowControl: {
              acceptReporters: false,
              items: [
                {
                  text: Scratch.translate("break out of current loop"),
                  value: "break",
                },
                {
                  text: Scratch.translate("continue to next iteration"),
                  value: "continue",
                },
              ],
            },
            scope: {
              acceptReporters: false,
              items: [
                { text: Scratch.translate("thread"), value: "0" },
                { text: Scratch.translate("sprite"), value: "1" },
                { text: Scratch.translate("runtime"), value: "2" },
              ],
            },
            sortMethod: {
              items: [
                { text: Scratch.translate("ascending order"), value: "A-Z" },
                { text: Scratch.translate("descending order"), value: "Z-A" },
                {
                  text: Scratch.translate("increasing frequency"),
                  value: "frequency",
                },
                {
                  text: Scratch.translate("decreasing frequency"),
                  value: "rarity",
                },
                { text: Scratch.translate("reverse order"), value: "reverse" },
                { text: Scratch.translate("random order"), value: "shuffle" },
              ],
            },
            lists: { acceptReporters: true, items: "_getLists" },
          },
        };
        return blockInfo;
      }


      /*--------FUNCTIONS--------*/

      // EXTENSION CONSTRUCTION
      resetTemporaryLists() {
        this.scopedLists = Object.create(null);
        this.runtimeLists = Object.create(null);
      }
      getListObjectFromName(name, util) {
        const runtime = Scratch.vm.runtime;
        let stageTarget = runtime.getTargetForStage();
        const target = util.target;
        let listObject =
          stageTarget?.lookupVariableByNameAndType(name, "list") ?? null;
        if (listObject) return listObject;
        listObject = target?.lookupVariableByNameAndType(name, "list");
        return listObject ?? Object.create(null);
      }
      getListEnvironment(args, util, scope = "SCOPE", name = "LIST") {
        switch (args[scope]) {
          case "0": {
            //THREAD
            const thread = util.thread;
            thread.lists = thread?.lists ?? Object.create(null);
            thread.lists[args[name]] = thread.lists?.[args[name]] ?? [];
            return thread.lists[args[name]];
          }
          case "1": {
            //SPRITE
            const id = util.target.id;
            this.scopedLists = this?.scopedLists ?? Object.create(null);
            this.scopedLists[id] =
              this.scopedLists?.[id] ?? Object.create(null);
            this.scopedLists[id][args[name]] =
              this.scopedLists[id]?.[args[name]] ?? [];
            return this.scopedLists[id][args[name]];
          }
          case "2": {
            //RUNTIME
            this.runtimeLists = this?.runtimeLists ?? Object.create(null);
            this.runtimeLists[args[name]] =
              this.runtimeLists?.[args[name]] ?? [];
            return this.runtimeLists[args[name]];
          }
          default:
            return [];
        }
      }
      isListInEnvironment(args, util, scope = "SCOPE", name = "LIST") {
        switch (args[scope]) {
          case "0": {
            //THREAD
            const thread = util.thread;
            thread.lists = thread?.lists ?? Object.create(null);
            return args[name] in thread.lists;
          }
          case "1": {
            //SPRITE
            const id = util.target.id;
            this.scopedLists = this?.scopedLists ?? Object.create(null);
            this.scopedLists[id] =
              this.scopedLists?.[id] ?? Object.create(null);
            return args[name] in this.scopedLists[id];
          }
          case "2": {
            //RUNTIME
            this.runtimeLists = this?.runtimeLists ?? Object.create(null);
            return args[name] in this.runtimeLists;
          }
          default:
            return "";
        }
      }
      isDependencyNotLoaded() {
        return !(
          Scratch?.vm?.runtime?.extensionManager?.isExtensionLoaded(
            "lmsTempVars2"
          ) || false
        );
      }
      fieldParamTemplate(argType, text, hidden = false, translate = true) {
        switch (argType) {
          case "string":
            return {
              type: Scratch.ArgumentType.STRING,
              defaultValue: translate ? Scratch.translate(text) : text,
            };
          case "index":
            return { type: Scratch.ArgumentType.NUMBER, defaultValue: text };
          case "image":
            return { type: Scratch.ArgumentType.IMAGE, dataURI: text };
          case "label":
            return {
              blockType: Scratch.BlockType.LABEL,
              text: translate ? Scratch.translate(text) : text,
              hideFromPalette: hidden,
            };
          case "menu":
            return { type: Scratch.ArgumentType.STRING, menu: text };
          case "separator":
            return hidden ? null : "---";
          default:
            return {};
        }
      }
      /*
        blockBuilder(opcode, type, text, scopeListArgs, properties, ...args) {
          let display = Object.assign(
            { hideFromPalette: false, disableMonitor: false, isTerminal: false },
            Object(properties)
          );
          let argNames =
            String(text)
              .match(/\[\s*[^\u005B\u005D]+\s*\]/g)
              ?.valueOf()
              ?.filter((i) => i !== "[scopeList]" || !scopeListArgs) ?? [];
          if (scopeListArgs) {
            text = String(text).replace("[scopeList]", "[SCOPE] list [LIST]");
          }
          let newBlock = {
            opcode: String(opcode),
            blockType: Scratch.BlockType[type],
            text: Scratch.translate(text),
            hideFromPalette: Boolean(display?.hideFromPalette ?? false),
            disableMonitor: Boolean(display?.disableMonitor ?? false),
            isTerminal: Boolean(display?.isTerminal ?? false),
          };
          if (args) {
            if (args.length > 0 || scopeListArgs) {
              newBlock.arguments = Object.create(null);
            }
            if (args.length > 0) {
              argNames.forEach((i, j) => {
                newBlock.arguments[i.slice(1, -1)] = args[j];
              });
            }
          }
          if (scopeListArgs) {
            newBlock.arguments = newBlock?.arguments ?? Object.create(null);
            newBlock.arguments.SCOPE = this.fieldParamTemplate("menu", "scope");
            newBlock.arguments.LIST = this.fieldParamTemplate("string", "list");
          }
          return newBlock;
        }
      */
      _getLists() {
        try {
          const lists =
            typeof Blockly === "undefined"
              ? []
              : (
                  Blockly?.getMainWorkspace()
                    ?.getVariableMap()
                    ?.getVariablesOfType("list") || []
                ).map((model) => model?.name || model);
          if (lists.length > 0) {
            return Array.isArray(lists) ? lists : [""];
          } else {
            return [""];
          }
        } catch (e) {
          return [""];
        }
      }

      // BASIC
      addToTempList(args, util) {
        let list = this.getListEnvironment(args, util);
        list.push(args.ITEM);
      }
      deleteFromTempList(args, util) {
        let list = this.getListEnvironment(args, util),
          i = Scratch.Cast.toNumber(args.IDX);
        if (list.length > 0 ? 1 <= i && i < list.length + 1 : false) {
          list.splice(Math.floor(i - 1), 1);
        }
      }
      deleteAllOfTempList(args, util) {
        let list = this.getListEnvironment(args, util);
        list.splice(0, list.length);
      }
      insertIntoTempList(args, util) {
        let list = this.getListEnvironment(args, util),
          i = Scratch.Cast.toNumber(args.IDX);
        if (list.length > 0) {
          if (1 <= i && i < list.length + 1) {
            list.splice(Math.floor(i - 1), 0, args.ITEM);
          }
        } else {
          list.push(args.ITEM);
        }
      }
      replaceItemOfTempList(args, util) {
        let list = this.getListEnvironment(args, util),
          i = Scratch.Cast.toNumber(args.IDX);
        if (list.length > 0) {
          if (1 <= i && i < list.length + 1) {
            list.splice(Math.floor(i - 1), 1, args.ITEM);
          }
        } else {
          list.push(args.ITEM);
        }
      }
      itemOfTempList(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util),
            i = Scratch.Cast.toNumber(args.IDX);
          if (1 <= i && i < list.length + 1) {
            return list?.[i - 1] ?? "";
          } else {
            return "";
          }
        } else {
          return "";
        }
      }
      indexInTempList(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util);
          return list.indexOf(args.ITEM) + 1 || 0;
        } else {
          return "";
        }
      }
      lengthOfTempList(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util);
          return list.length ?? "";
        } else {
          return "";
        }
      }
      tempListContains(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util);
          return list.indexOf(args.ITEM) > -1;
        } else {
          return false;
        }
      }

      // ADVANCED
      deleteItemsFromTempList(args, util) {
        let list = this.getListEnvironment(args, util);
        if (list.length > 0) {
          let l = [args.IDX1, args.IDX2].valueOf(),
            [i, j] = l.map((k) => {
              return Scratch.Cast.toNumber(k);
            });
          let START = Math.max(1, Math.min(Math.floor(i), Math.floor(j))),
            END = Math.min(list.length, Math.max(Math.floor(i), Math.floor(j)));
          let bound1 = i >= 1 && list.length + 1 > i,
            bound2 = j >= 1 && list.length + 1 > j;
          if (bound1 && bound2) list.splice(START - 1, END - START + 1);
        }
      }
      deleteAllInstancesFromTempList(args, util) {
        let list = this.getListEnvironment(args, util);
        if (list.length > 0) {
          let filtered = list.filter((i) => i !== args.ITEM);
          list.splice(0, list.length, ...filtered);
        }
      }
      replaceAllInstancesInTempList(args, util) {
        let list = this.getListEnvironment(args, util);
        if (list.length > 0) {
          let filtered = list.map((i) => (i === args.ITEM1 ? args.ITEM2 : i));
          list.splice(0, list.length, ...filtered);
        }
      }
      sortTempList(args, util) {
        let list = this.getListEnvironment(args, util);
        if (list.length > 0) {
          let newList = list.valueOf();
          let freqs = {};
          switch (args.METHOD) {
            case "A-Z":
              newList.sort();
              break;
            case "Z-A":
              newList.sort();
              newList.reverse();
              break;
            case "frequency":
              for (let i of newList) {
                freqs[i] = (freqs?.[i] ?? 0) + 1;
              }
              newList.sort((a, b) => {
                if (freqs[a] !== freqs[b]) {
                  return freqs[a] - freqs[b];
                }
                return `${a}`.localeCompare(`${b}`);
              });
              break;
            case "rarity":
              for (let i of newList) {
                freqs[i] = (freqs?.[i] ?? 0) + 1;
              }
              newList.sort((a, b) => {
                if (freqs[b] !== freqs[a]) {
                  return freqs[b] - freqs[a];
                }
                return `${a}`.localeCompare(`${b}`);
              });
              break;
            case "reverse":
              newList.reverse();
              break;
            case "shuffle":
              for (let i = newList.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newList[i], newList[j]] = [newList[j], newList[i]];
              }
              break;
            default:
              break;
          }
          list.splice(0, list.length, ...newList);
        }
      }
      deleteTempList(args, util) {
        if (this.isListInEnvironment(args, util)) {
          switch (args.SCOPE) {
            case "0": {
              //THREAD
              const thread = util.thread;
              delete thread.lists[args.LIST];
              break;
            }
            case "1": {
              //SPRITE
              const id = util.target.id;
              delete this.scopedLists[id][args.LIST];
              break;
            }
            case "2": //RUNTIME
              delete this.runtimeLists[args.LIST];
              break;
            default:
              break;
          }
        }
      }
      deleteAllTempLists(args, util) {
        switch (args.SCOPE) {
          case "0": {
            //THREAD
            const thread = util.thread;
            delete thread.lists;
            break;
          }
          case "1": {
            //SCOPED
            const id = util.target.id;
            delete this.scopedLists[id];
            break;
          }
          case "2": {
            //RUNTIME
            delete this.runtimeLists;
            break;
          }
          default:
            break;
        }
      }

      // ITERATION LOOPS
      forOfLoop(args, util) {
        return this.iterateOverTempList(args, util, "forOf");
      }

      forInLoop(args, util) {
        return this.iterateOverTempList(args, util, "forIn");
      }

      forEachLoop(args, util) {
        return this.iterateOverTempList(args, util, "forEach");
      }

      iterateOverTempList(args, util, mode) {
        let list = this.getListEnvironment(args, util);
        if (list.length > 0) {
          if (list.length > 0 && !this.isDependencyNotLoaded()) {
            const thread = util.thread;
            const listLength = list.length;
            if (!thread.variables) thread.variables = {};
            const vars = thread.variables;

            if (typeof util.stackFrame.index === "undefined") {
              util.stackFrame.index = 0;
            }

            if (util.stackFrame.index < listLength) {
              util.stackFrame.index++;
              if (mode !== "forOf") vars[args.IDX] = util.stackFrame.index;
              if (mode !== "forIn")
                vars[args.ITEM] = list[util.stackFrame.index - 1];
              return true;
            }
          }
        }
      }
      loopFlowControl(args, util) {
        //Credit for this goes to SharkPool
        if (!this.isDependencyNotLoaded()) {
          const thread = util.thread;
          const wasCompiled = thread.isCompiled.valueOf();
          try {
            thread.isCompiled = false; //fallback in case compiler breaks this
            const stackFrames = thread.stackFrames,
              frameCount = stackFrames.length;
            let loopBlock = null,
              stackIndex = -1;
            for (let i = frameCount - 1; i >= 0; i--) {
              //locate parent loop in surrounding block environment
              if (i < 0) break;
              if (!stackFrames[i].isLoop) continue;
              loopBlock = stackFrames[i].op.id;
              stackIndex = i;
              break;
            }
            const frameData = loopBlock
              ? { block: loopBlock, index: stackIndex }
              : false;
            if (!frameData) return; //block does nothing if not used in a loop
            const block = frameData.block;
            const afterLoop = thread.blockContainer.getBlock(block).next;
            if (args.MODE === "continue") {
              while (thread.stack[0] && thread.stack.at(-1) !== block) {
                thread.popStack();
              }
              thread.status = thread.constructor.STATUS_YIELD;
            } else {
              while (thread.stack.at(-1) !== block) thread.popStack();
              thread.popStack();
              if (afterLoop) thread.pushStack(afterLoop);
            }
          } catch (e) {
            //last resort in case all previous failsafes failed
            console.warn(e);
          } finally {
            thread.isCompiled = wasCompiled;
          }
        }
      }

      // MISC
      setTempList1ToTempList2(args, util) {
        let list1 = this.getListEnvironment(args, util, "SCOPE1", "LIST1");
        if (this.isListInEnvironment(args, util, "SCOPE2", "LIST2")) {
          let list2 = this.getListEnvironment(args, util, "SCOPE2", "LIST2");
          list1.splice(0, list1.length, ...list2);
        } else {
          list1.splice(0, list1.length);
        }
      }
      setTempListToList(args, util) {
        let list1 = this.getListEnvironment(args, util);
        const list2 = this.getListObjectFromName(
          Scratch.Cast.toString(args.LISTS),
          util
        );
        list1.splice(0, list1.length, ...(list2?.value || []));
      }
      splitStringToTempList(args, util) {
        let list = this.getListEnvironment(args, util);
        list.splice(0, list.length, ...args.STRING.split(args.DELIMITER));
      }
      joinTempListToString(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util);
          return list.join(args.DELIMITER);
        } else {
          return "";
        }
      }
      setTempListToArray(args, util) {
        let list = this.getListEnvironment(args, util),
          array;
        try {
          array = Object.values(JSON.parse(args.ARRAY)).flat(Infinity);
        } catch (e) {
          array = [];
        }
        list.splice(0, list.length, ...array);
      }
      getTempListAsArray(args, util) {
        if (this.isListInEnvironment(args, util)) {
          let list = this.getListEnvironment(args, util);
          return JSON.stringify(list || []);
        } else {
          return "";
        }
      }
      tempListExists(args, util) {
        //opcode functions with default input values, or more than two inputs, are ignored by TW in getInfo() -_-
        return this.isListInEnvironment(args, util);
      }
      listTempLists(args, util) {
        return JSON.stringify(
          Object.keys(
            (() => {
              switch (args.SCOPE) {
                case "0": {
                  //THREAD
                  const thread = util.thread;
                  thread.lists = thread?.lists ?? Object.create(null);
                  return thread.lists;
                }
                case "1": {
                  //SCOPED
                  const id = util.target.id;
                  this.scopedLists = this?.scopedLists ?? Object.create(null);
                  this.scopedLists[id] =
                    this.scopedLists?.[id] ?? Object.create(null);
                  return this.scopedLists?.[id];
                }
                case "2":
                  return this.runtimeLists; //RUNTIME
                default:
                  return null;
              }
            })() ?? []
          ).flat(Infinity)
        );
      }
    }
    const TempLists = new TemporaryLists();
    Scratch.extensions.register(TempLists);
    if (!(Scratch?.vm?.runtime?.extensionStorage ?? false))
      Scratch.vm.runtime.extensionStorage = Object.create(null);
    Scratch.vm.runtime.extensionStorage[TempLists.getInfo().id] = {
      scopedLists: TempLists.scopedLists,
      runtimeLists: TempLists.runtimeLists,
    };
    requestAnimationFrame(() => {
      if (TempLists.isDependencyNotLoaded()) {
        console.warn(
          'Install "Temporary Variables" (by LilyMakesThings) to access iteration loops'
        );
      }
    });
  }
})(Scratch);
