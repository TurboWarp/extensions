// Name: Variable and list
// ID: qxsckvarandlist
// Description: More blocks related to variables and lists.
// By: qxsck

/* generated l10n code */Scratch.translate.setup({"de":{"name":"Variablen und Listen"},"it":{"addValueInList":"aggiungi [VALUE] a [LIST]","clearList":"cancella tutto da lista [LIST]","copyList":"copia [LIST1] in [LIST2]","deleteOfList":"cancella [INDEX] da [LIST]","getIndexOfList":"prima occorrenza di [VALUE] in [LIST]","getIndexesOfList":"occorrenze di [VALUE] in [LIST]","getList":"valore di [LIST]","getValueOfList":"elemento [INDEX] di [LIST]","getVar":"valore di [VAR]","length":"lunghezza di [LIST]","listContains":"[LIST] contiene [VALUE]","name":"Variabili e liste","replaceOfList":"sostituisci elemento [INDEX] di [LIST] con [VALUE]","seriListsToJson":"converti in json tutte le liste che iniziano con [START] ","seriVarsToJson":"converti in json tutte le variabili che iniziano con [START]","setVar":"porta il valore di [VAR] a [VALUE]"},"nl":{"addValueInList":"voeg [VALUE] toe aan lijst [LIST]","clearList":"verwijder alle van lijst [LIST]","copyList":"kopieer lijst [LIST1] naar lijst [LIST2]","deleteOfList":"verwijder [INDEX] van lijst [LIST]","getIndexOfList":"eerste index van [VALUE] in lijst [LIST]","getIndexesOfList":"indexen van [VALUE] in lijst [LIST]","getList":"waarde van lijst [LIST]","getValueOfList":"item [INDEX] van lijst [LIST]","getVar":"waarde van variabele [VAR]","length":"lengte van lijst [LIST]","listContains":"lijst [LIST] bevat [VALUE] ?","name":"Gegevens","replaceOfList":"vervang item [INDEX] van lijst [LIST] door [VALUE]","seriListsToJson":"zet alle lijsten beginnend met [START] om naar JSON","seriVarsToJson":"zet alle variabelen beginnend met [START] om naar JSON","setVar":"maak de waarde van variabele [VAR] [VALUE]"},"zh-cn":{"addValueInList":"把[VALUE]加入列表[LIST]","clearList":"删除列表[LIST]的所有值","copyList":"复制列表 [LIST1] 的数据到列表 [LIST2]","deleteOfList":"删除列表[LIST]的第[INDEX]项","getIndexOfList":"列表[LIST]第一个[VALUE]的位置","getIndexesOfList":"列表[LIST]里所有[VALUE]的位置","getList":"列表[LIST]的值","getValueOfList":"列表[LIST]第[INDEX]项的值","getVar":"变量[VAR]的值","length":"列表[LIST]的长度","listContains":"列表[LIST]包括[VALUE]？","name":"变量与列表","replaceOfList":"把列表[LIST]第[INDEX]项的值替换为[VALUE]","seriListsToJson":"把所有以[START]开头的列表转换为JSON","seriVarsToJson":"把所有以[START]开头的变量转换为JSON","setVar":"把变量[VAR]的值修改为[VALUE]"}});/* end generated l10n code */(function (Scratch) {
  "use strict";
  class VarAndList {
    getInfo() {
      return {
        id: "qxsckvarandlist",
        name: Scratch.translate({ id: "name", default: "Variable and list" }),
        blocks: [
          {
            opcode: "getVar",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "getVar",
              default: "value of [VAR]",
            }),
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "variable",
              },
            },
			extensions: ["colours_data"],
          },
          {
            opcode: "seriVarsToJson",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "seriVarsToJson",
              default: "convert all variables starting with [START] to json",
            }),
            arguments: {
              START: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "variable",
              },
            },
			extensions: ["colours_data"],
          },
          {
            opcode: "setVar",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "setVar",
              default: "set the value of [VAR] to [VALUE]",
            }),
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "variable",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "value",
              },
            },
			extensions: ["colours_data"],
          },
          {
            opcode: "getList",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "getList",
              default: "value of [LIST]",
            }),
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "list",
              },
            },
			extensions: ["colours_data_lists"],
          },
          {
            opcode: "getValueOfList",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "getValueOfList",
              default: "item [INDEX] of [LIST]",
            }),
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "list",
              },
              INDEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
            },
			extensions: ["colours_data_lists"],
          },
          {
            opcode: "seriListsToJson",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "seriListsToJson",
              default: "convert all lists starting with [START] to json",
            }),
            arguments: {
              START: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "list",
              },
            },
			extensions: ["colours_data_lists"],
          },
          {
            opcode: "clearList",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "clearList",
              default: "delete all of [LIST]",
            }),
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "list",
              },
            },
			extensions: ["colours_data_lists"],
          },
          {
            opcode: "deleteOfList",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "deleteOfList",
              default: "delete [INDEX] of [LIST]",
            }),
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "list",
              },
              INDEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
            },
			extensions: ["colours_data_lists"],
          },
          {
            opcode: "addValueInList",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "addValueInList",
              default: "add [VALUE] to [LIST]",
            }),
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "list",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "value",
              },
            },
			extensions: ["colours_data_lists"],
          },
          {
            opcode: "replaceOfList",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "replaceOfList",
              default: "replace item [INDEX] of [LIST] with [VALUE]",
            }),
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "list",
              },
              INDEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "thing",
              },
            },
			extensions: ["colours_data_lists"],
          },
          {
            opcode: "getIndexOfList",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "getIndexOfList",
              default: "first index of [VALUE] in [LIST]",
            }),
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "list",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "thing",
              },
            },
			extensions: ["colours_data_lists"],
          },
          {
            opcode: "getIndexesOfList",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "getIndexesOfList",
              default: "indexes of [VALUE] in [LIST]",
            }),
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "list",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "thing",
              },
            },
			extensions: ["colours_data_lists"],
          },
          {
            opcode: "length",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "length",
              default: "length of [LIST]",
            }),
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "list",
              },
            },
			extensions: ["colours_data_lists"],
          },
          {
            opcode: "listContains",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate({
              id: "listContains",
              default: "[LIST] contains [VALUE] ?",
            }),
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "list",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "thing",
              },
            },
			extensions: ["colours_data_lists"],
          },
          {
            opcode: "copyList",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "copyList",
              default: "copy [LIST1] to [LIST2]",
            }),
            arguments: {
              LIST1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "list1",
              },
              LIST2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "list2",
              },
            },
			extensions: ["colours_data_lists"],
          },
        ],
      };
    }

    getVar(args, util) {
      const variable = util.target.lookupVariableByNameAndType(
        Scratch.Cast.toString(args.VAR),
        ""
      );
      return variable ? variable.value : "";
    }
    seriVarsToJson(args, util) {
      const start = Scratch.Cast.toString(args.START);
      const serialized = {};
      for (const variable of Object.values(
        util.runtime.getTargetForStage().variables
      )) {
        if (variable.type === "" && variable.name.startsWith(start)) {
          serialized[variable.name.replace(start, "")] = variable.value;
        }
      }
      for (const variable of Object.values(util.target.variables)) {
        if (variable.type === "" && variable.name.startsWith(start)) {
          serialized[variable.name.replace(start, "")] = variable.value;
        }
      }
      return JSON.stringify(serialized);
    }
    setVar(args, util) {
      const variable = util.target.lookupVariableByNameAndType(
        Scratch.Cast.toString(args.VAR),
        ""
      );
      if (variable) {
        variable.value = args.VALUE;
        if (variable.isCloud) {
          util.runtime.ioDevices.cloud.requestUpdateVariable(
            variable.name,
            variable.value
          );
        }
      }
    }
    getList(args, util) {
      const variable = util.target.lookupVariableByNameAndType(
        Scratch.Cast.toString(args.LIST),
        "list"
      );
      return variable ? variable.value.toString() : "";
    }
    getValueOfList(args, util) {
      const variable = util.target.lookupVariableByNameAndType(
        Scratch.Cast.toString(args.LIST),
        "list"
      );
      if (!variable) return 0;
      const index = Scratch.Cast.toListIndex(
        args.INDEX,
        variable.value.length,
        false
      );
      if (index === "INVALID") return "";
      return variable.value[index - 1];
    }
    seriListsToJson(args, util) {
      const start = Scratch.Cast.toString(args.START);
      const serialized = {};
      for (const variable of Object.values(
        util.runtime.getTargetForStage().variables
      )) {
        if (variable.type === "list" && variable.name.startsWith(start)) {
          serialized[variable.name.replace(start, "")] = variable.value;
        }
      }
      for (const variable of Object.values(util.target.variables)) {
        if (variable.type === "list" && variable.name.startsWith(start)) {
          serialized[variable.name.replace(start, "")] = variable.value;
        }
      }
      return JSON.stringify(serialized);
    }
    clearList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        Scratch.Cast.toString(args.LIST),
        "list"
      );
      if (variable) {
        variable.value = [];
      }
    }
    deleteOfList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        Scratch.Cast.toString(args.LIST),
        "list"
      );
      if (variable) {
        const index = Scratch.Cast.toListIndex(
          args.INDEX,
          variable.value.length,
          true
        );
        if (index === "ALL") {
          variable.value = [];
        } else if (index !== "INVALID") {
          variable.value.splice(index - 1, 1);
          variable._monitorUpToDate = false;
        }
      }
    }
    addValueInList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        Scratch.Cast.toString(args.LIST),
        "list"
      );
      if (variable) {
        variable.value.push(args.VALUE);
        variable._monitorUpToDate = false;
      }
    }
    replaceOfList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        Scratch.Cast.toString(args.LIST),
        "list"
      );
      if (variable) {
        const index = Scratch.Cast.toListIndex(
          args.INDEX,
          variable.value.length,
          false
        );
        if (index !== "INVALID") {
          variable.value[index - 1] = args.VALUE;
          variable._monitorUpToDate = false;
        }
      }
    }
    getIndexOfList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        Scratch.Cast.toString(args.LIST),
        "list"
      );
      const value = args.VALUE;
      if (variable) {
        for (var i = 0; i < variable.value.length; i++) {
          if (Scratch.Cast.compare(variable.value[i], value) === 0)
            return i + 1;
        }
      }
      return 0;
    }
    getIndexesOfList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        Scratch.Cast.toString(args.LIST),
        "list"
      );
      const value = args.VALUE;
      if (variable) {
        var indexes = [];
        for (var i = 0; i < variable.value.length; i++) {
          if (Scratch.Cast.compare(variable.value[i], value) === 0)
            indexes.push(i + 1);
        }
        if (indexes.length > 0) return indexes.toString();
      }
      return "0";
    }
    length(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        Scratch.Cast.toString(args.LIST),
        "list"
      );
      if (variable) {
        return variable.value.length;
      }
      return 0;
    }
    listContains(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        Scratch.Cast.toString(args.LIST),
        "list"
      );
      const value = args.VALUE;
      if (variable) {
        for (var i = 0; i < variable.value.length; i++) {
          if (Scratch.Cast.compare(variable.value[i], value) === 0) return true;
        }
      }
      return false;
    }
    copyList(args, util) {
      /** @type {VM.ListVariable} */
      const list1 = util.target.lookupVariableByNameAndType(
        Scratch.Cast.toString(args.LIST1),
        "list"
      );
      const list2 = util.target.lookupVariableByNameAndType(
        Scratch.Cast.toString(args.LIST2),
        "list"
      );
      if (list1 && list2) {
        list2.value = list1.value.slice();
      }
    }
  }
  Scratch.extensions.register(new VarAndList());
})(Scratch);
