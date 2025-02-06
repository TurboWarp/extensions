// Name: JSON
// ID: skyhigh173JSON
// Description: Handle JSON strings and arrays.
// By: Skyhigh173 <https://scratch.mit.edu/users/Skyhigh173/>
// By: Mio <https://scratch.mit.edu/users/0znzw/>
// License: MIT

(function (Scratch) {
  "use strict";
  /*
   * JSON extension v2.6 by skyhigh173 (English Version)
   * Do not remove this comment
   */

  const vm = Scratch.vm;
  const hasOwn = (obj, property) =>
    Object.prototype.hasOwnProperty.call(obj, property);

  const makeLabel = (text) => ({
    blockType: "label",
    text: text,
  });

  class JSONS {
    getInfo() {
      return {
        id: "skyhigh173JSON",
        // eslint-disable-next-line extension/should-translate
        name: "JSON",
        color1: "#3271D0",
        blocks: [
          makeLabel(Scratch.translate("General Utils")),
          {
            opcode: "json_is_valid",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is JSON [json] valid?"),
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value"}',
              },
            },
          },
          {
            opcode: "json_is",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [json] [types]?"),
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value"}',
              },
              types: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Object",
                menu: "types",
              },
            },
          },
          "---",
          {
            opcode: "json_get_all",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("all [Stype] of [json]"),
            arguments: {
              Stype: {
                type: Scratch.ArgumentType.STRING,
                menu: "get_all",
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value","key2":"value2"}',
              },
            },
          },
          {
            opcode: "json_new",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("new [json]"),
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Object",
                menu: "types",
              },
            },
          },
          "---",
          {
            opcode: "json_has_key",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("[json] contains key [key]?"),
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "key2",
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value"}',
              },
            },
          },
          {
            opcode: "json_has_value",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("[json] contains value [value]?"),
            arguments: {
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "scratch",
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["TurboWarp","scratch"]',
              },
            },
          },
          {
            opcode: "json_equal",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("[json1] [equal] [json2]"),
            arguments: {
              json1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"a":0,"b":1}',
              },
              json2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"b":1,"a":0}',
              },
              equal: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "=",
                menu: "equal",
              },
            },
          },
          makeLabel("JSON Strings"),
          {
            opcode: "json_jlength",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("length of json [json]"),
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value","key2":"value2"}',
              },
            },
          },
          {
            opcode: "json_get",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("value of [item] in [json]"),
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "key",
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value"}',
              },
            },
          },
          {
            opcode: "json_set",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("set [item] in [json] to [value]"),
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "key",
              },
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "new value",
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value"}',
              },
            },
          },
          {
            opcode: "json_delete",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("delete [item] in [json]"),
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "key2",
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value","key2":"value2"}',
              },
            },
          },
          makeLabel(Scratch.translate("Array")),
          {
            opcode: "json_length",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("length of array [json]"),
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[1,2,3]",
              },
            },
          },
          {
            opcode: "json_array_get",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("item [item] of array [json]"),
            arguments: {
              item: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["scratch","TurboWarp"]',
              },
            },
          },
          {
            opcode: "json_array_push",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("add [item] to array [json]"),
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "TurboWarp",
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["scratch"]',
              },
            },
          },
          {
            opcode: "json_array_set",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("replace item [pos] of [json] with [item]"),
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "fav",
              },
              pos: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["love","heart","follow"]',
              },
            },
          },
          {
            opcode: "json_array_insert",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("insert [item] at [pos] of array [json]"),
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "fav",
              },
              pos: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["love","follow"]',
              },
            },
          },
          "---",
          {
            opcode: "json_array_delete",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("delete item [item] of array [json]"),
            arguments: {
              item: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["scratch","a","TurboWarp"]',
              },
            },
          },
          {
            opcode: "json_array_remove_all",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("delete all [item] in array [json]"),
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "a",
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["scratch","a","TurboWarp","a","a"]',
              },
            },
          },
          "---",
          {
            opcode: "json_array_itemH",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("item # of [item] in array [json]"),
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "scratch",
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["scratch","TurboWarp"]',
              },
            },
          },
          makeLabel(Scratch.translate("Advanced")),
          {
            opcode: "json_array_from",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("array from text [json]"),
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "abcd",
              },
            },
          },
          {
            opcode: "json_array_fromto",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("items [item] to [item2] of array [json]"),
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[1,2,3,4]",
              },
              item: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
              },
              item2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3,
              },
            },
          },
          {
            opcode: "json_array_reverse",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("reverse array [json]"),
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["a","b","c","d","e","f"]',
              },
            },
          },
          {
            opcode: "json_array_flat",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("flat array [json] by depth [depth]"),
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[[1],2,[3,4],[5,[6]]]",
              },
              depth: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
              },
            },
          },
          {
            opcode: "json_array_concat",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("array concat [json] [json2]"),
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["a","b"]',
              },
              json2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["c","d"]',
              },
            },
          },
          {
            opcode: "json_array_filter",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "get all values with key [key] in array [json]"
            ),
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "id",
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[{"id":12},{"id":24}]',
              },
            },
          },
          {
            opcode: "json_array_setlen",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("set length of array [json] to [len]"),
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["a","b","c"]',
              },
              len: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
              },
            },
          },
          "---",
          {
            opcode: "json_array_create",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "create array by [text] with delimiter [d]"
            ),
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "a,b,c",
              },
              d: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ",",
              },
            },
          },
          {
            opcode: "json_array_join",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "join string by array [json] with delimiter [d]"
            ),
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["a","b","c"]',
              },
              d: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ",",
              },
            },
          },
          "---",
          {
            opcode: "json_array_sort",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("sort array [list] in [order] order"),
            disableMonitor: true,
            arguments: {
              list: {
                type: Scratch.ArgumentType.STRING,
                defaultValue:
                  "[5.23, 214, 522, 61, 5.24, 62.2, 1, 51212, 0, 0]",
              },
              order: {
                type: Scratch.ArgumentType.STRING,
                menu: "sort_order",
              },
            },
          },
          {
            opcode: "json_array_analysis",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[analysis] of array [list]"),
            disableMonitor: true,
            arguments: {
              list: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[17, 1, 2017, 0, 120, 14]",
              },
              analysis: {
                type: Scratch.ArgumentType.STRING,
                menu: "analysis",
              },
            },
          },
          makeLabel(Scratch.translate("Lists")),
          {
            opcode: "json_vm_getlist",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get list [list] as array"),
            arguments: {
              list: {
                type: Scratch.ArgumentType.STRING,
                menu: "get_list",
              },
            },
          },
          {
            opcode: "json_vm_setlist",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set list [list] to [json]"),
            arguments: {
              list: {
                type: Scratch.ArgumentType.STRING,
                menu: "get_list",
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["apple","banana"]',
              },
            },
          },
        ],
        menus: {
          get_all: {
            items: [
              {
                text: Scratch.translate("keys"),
                value: "keys",
              },
              {
                text: Scratch.translate("values"),
                value: "values",
              },
              {
                text: Scratch.translate("datas"),
                value: "datas",
              },
            ],
          },
          get_list: {
            acceptReporters: true,
            items: "getLists",
          },
          types: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("Object"),
                value: "Object",
              },
              {
                text: Scratch.translate("Array"),
                value: "Array",
              },
            ],
          },
          equal: {
            acceptReporters: true,
            items: ["=", "≠"],
          },
          sort_order: {
            acceptReporters: true,
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
          analysis: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("minimum value"),
                value: "minimum",
              },
              {
                text: Scratch.translate("maximum value"),
                value: "maximum",
              },
              {
                text: Scratch.translate("sum"),
                value: "sum",
              },
              {
                text: Scratch.translate("average"),
                value: "average",
              },
              {
                text: Scratch.translate("median"),
                value: "median",
              },
              {
                text: Scratch.translate("mode"),
                value: "mode",
              },
              {
                text: Scratch.translate("variance"),
                value: "variance",
              },
            ],
          },
        },
      };
    }

    getLists() {
      const globalLists = Object.values(
        vm.runtime.getTargetForStage().variables
      ).filter((x) => x.type === "list");
      const localLists = vm.editingTarget
        ? Object.values(vm.editingTarget.variables).filter(
            (x) => x.type === "list"
          )
        : [];
      const uniqueLists = [...new Set([...globalLists, ...localLists])];
      if (uniqueLists.length === 0) {
        return [
          {
            text: Scratch.translate("select a list"),
            value: "select a list",
          },
        ];
      }
      return uniqueLists.map((i) => ({
        text: i.name,
        value: i.id,
      }));
    }

    lookupList(list, util) {
      const byId = util.target.lookupVariableById(list);
      if (byId && byId.type === "list") {
        return byId;
      }
      const byName = util.target.lookupVariableByNameAndType(list, "list");
      if (byName) {
        return byName;
      }
      return null;
    }

    json_is_valid({ json }) {
      if (typeof json != "string") {
        return false;
      }
      json = json.trim();
      if (
        (json.slice(0, 1) != "[" || json.slice(-1) != "]") &&
        (json.slice(0, 1) != "{" || json.slice(-1) != "}")
      ) {
        return false;
      } else {
        try {
          JSON.parse(json);
          return true;
        } catch {
          return false;
        }
      }
    }

    // return object if its json else string
    json_valid_return(json) {
      if (typeof json != "string") {
        return json;
      } else if (
        (json.slice(0, 1) != "[" || json.slice(-1) != "]") &&
        (json.slice(0, 1) != "{" || json.slice(-1) != "}")
      ) {
        return json;
      } else {
        try {
          return JSON.parse(json);
        } catch {
          return json;
        }
      }
    }

    json_is({ json, types }) {
      if (!this.json_is_valid({ json: json })) return false;
      try {
        json = JSON.parse(json);
        switch (types) {
          case "Object":
            return !Array.isArray(json);
          case "Array":
            return Array.isArray(json);
          default:
            return false;
        }
      } catch {
        return false;
      }
    }

    json_length({ json }) {
      try {
        json = JSON.parse(json);
        return Object.keys(json).length;
      } catch {
        return " ";
      }
    }

    json_new({ json }) {
      switch (json) {
        case "Object":
          return "{}";
        case "Array":
          return "[]";
        default:
          return "";
      }
    }

    json_has_key({ json, key }) {
      try {
        return (
          this._fixInvalidJSONValues(this.json_valid_return(key)) in
          JSON.parse(json)
        );
      } catch {
        return false;
      }
    }

    json_has_value({ json, value }) {
      try {
        json = JSON.parse(json);
        value = this.json_valid_return(value);
        return json.includes(value);
      } catch {
        return false;
      }
    }

    json_equal({ json1, equal, json2 }) {
      try {
        json1 = JSON.parse(json1);
        json2 = JSON.parse(json2);

        const keys1 = Object.keys(json1);
        const keys2 = Object.keys(json2);
        const result =
          keys1.length === keys2.length &&
          Object.keys(json1).every((key) => json1[key] === json2[key]);
        if (equal === "=") return result;
        if (equal === "≠") return !result;
      } catch {
        // ignore
      }
      return false;
    }

    json_get_all({ Stype, json }) {
      try {
        json = JSON.parse(json);
        switch (Stype) {
          case "keys":
            return JSON.stringify(Object.keys(json).map((key) => key));
          case "values":
            return JSON.stringify(Object.keys(json).map((key) => json[key]));
          case "datas":
            return JSON.stringify(
              Object.keys(json).map((key) => [key, json[key]])
            );
          default:
            return "";
        }
      } catch {
        return "";
      }
    }

    json_get({ item, json }) {
      try {
        json = JSON.parse(json);
        if (hasOwn(json, item)) {
          const result = json[item];
          if (typeof result === "object") {
            return JSON.stringify(result);
          } else {
            return result;
          }
        }
      } catch {
        // ignore
      }
      return "";
    }

    _fixInvalidJSONValues(value) {
      // JSON does not support these values, so convert to string.
      if (Number.isNaN(value)) return "NaN";
      if (value === Infinity) return "Infinity";
      if (value === -Infinity) return "-Infinity";
      return value;
    }

    json_set({ item, value, json }) {
      try {
        json = JSON.parse(json);
        value = this.json_valid_return(value);
        value = this._fixInvalidJSONValues(value);
        json[item] = value;
        return JSON.stringify(json);
      } catch {
        return "";
      }
    }

    json_delete({ item, json }) {
      try {
        json = JSON.parse(json);
        delete json[item];
        return JSON.stringify(json);
      } catch {
        return "";
      }
    }

    json_jlength({ json }) {
      // same function
      return this.json_length({ json: json });
    }

    json_array_get({ item, json }) {
      // 1...length : array content, -1...-length : reverse array content, 0 : ERROR
      try {
        item = Scratch.Cast.toNumber(item);
        if (item == 0) return "";
        if (item > 0) {
          item--;
        }
        json = JSON.parse(json);
        let result;
        if (item >= 0) {
          result = json[item];
        } else {
          result = json[json.length + item];
        }
        if (typeof result == "object") {
          return JSON.stringify(result);
        } else {
          return result;
        }
      } catch {
        return "";
      }
    }

    json_array_itemH({ item, json }) {
      try {
        json = JSON.parse(json);
        item = this._fixInvalidJSONValues(this.json_valid_return(item));
        let result = JSON.stringify(json.indexOf(item) + 1);
        return result;
      } catch {
        return "";
      }
    }

    json_array_from({ json }) {
      try {
        return JSON.stringify(Array.from(String(json)));
      } catch {
        return "";
      }
    }

    json_array_concat({ json, json2 }) {
      try {
        json = JSON.parse(json);
        json2 = JSON.parse(json2);
        return JSON.stringify(json.concat(json2));
      } catch {
        return "";
      }
    }

    json_array_push({ item, json }) {
      try {
        json = JSON.parse(json);
        item = this._fixInvalidJSONValues(this.json_valid_return(item));
        json.push(item);
        return JSON.stringify(json);
      } catch {
        return "";
      }
    }

    json_array_insert({ item, pos, json }) {
      try {
        json = JSON.parse(json);
        item = this._fixInvalidJSONValues(this.json_valid_return(item));
        json.splice(pos - 1, 0, item);
        return JSON.stringify(json);
      } catch {
        return "";
      }
    }

    json_array_set({ item, pos, json }) {
      try {
        json = JSON.parse(json);
        json[pos - 1] = this._fixInvalidJSONValues(
          this.json_valid_return(item)
        );
        return JSON.stringify(json);
      } catch {
        return "";
      }
    }

    json_array_delete({ item, json }) {
      try {
        json = JSON.parse(json);
        json.splice(item - 1, 1);
        return JSON.stringify(json);
      } catch {
        return "";
      }
    }

    json_array_remove_all({ item, json }) {
      try {
        json = JSON.parse(json);
        item = this._fixInvalidJSONValues(this.json_valid_return(item));
        let i = 0;
        while (i < json.length) {
          if (json[i] === item) {
            json.splice(i, 1);
          } else {
            ++i;
          }
        }
        return JSON.stringify(json);
      } catch {
        return "";
      }
    }

    json_array_fromto({ json, item, item2 }) {
      try {
        return JSON.stringify(JSON.parse(json).slice(item - 1, item2));
      } catch {
        return "";
      }
    }

    json_array_reverse({ json }) {
      try {
        return JSON.stringify(JSON.parse(json).reverse());
      } catch {
        return "";
      }
    }

    json_array_flat({ json, depth }) {
      try {
        return JSON.stringify(JSON.parse(json).flat(depth));
      } catch {
        return "";
      }
    }

    json_array_create({ text, d }) {
      return JSON.stringify(String(text).split(d));
    }

    json_array_join({ json, d }) {
      try {
        return JSON.parse(json).join(d);
      } catch {
        return "";
      }
    }

    json_array_filter({ key, json }) {
      try {
        json = JSON.parse(json);
        return JSON.stringify(
          json.map((x) => {
            if (hasOwn(x, key)) {
              return x[key];
            }
            return null;
          })
        );
      } catch (e) {
        return "";
      }
    }

    json_array_setlen({ json, len }) {
      try {
        json = JSON.parse(json);
        json.length = len;
        return JSON.stringify(json);
      } catch {
        return "";
      }
    }

    json_vm_getlist({ list }, util) {
      try {
        let listVariable = this.lookupList(list, util);
        if (listVariable) {
          return JSON.stringify(listVariable.value);
        }
      } catch (e) {
        // ignore
      }
      return "";
    }
    json_vm_setlist({ list, json }, util) {
      try {
        let listVariable = this.lookupList(list, util);
        if (listVariable) {
          const array = JSON.parse(json);
          if (Array.isArray(array)) {
            const safeArray = array.map((i) => {
              if (typeof i === "object") return JSON.stringify(i);
              return i;
            });
            listVariable.value = safeArray;
          }
        }
      } catch (e) {
        // ignore
      }
      return "";
    }

    json_array_sort(args) {
      let list;
      try {
        list = JSON.parse(args.list);
      } catch {
        return "";
      }
      if (!Array.isArray(list)) {
        return "";
      }
      list.sort(Scratch.Cast.compare);
      if (args.order === "descending") list.reverse();
      return JSON.stringify(list);
    }
    json_array_analysis(args) {
      let list;
      try {
        list = JSON.parse(args.list);
      } catch {
        return 0;
      }
      if (!Array.isArray(list)) {
        return 0;
      }
      list = list.map(Scratch.Cast.toNumber);
      const listLength = list.length;
      switch (Scratch.Cast.toString(args.analysis)) {
        case "maximum":
          return Math.max(...list);
        case "minimum":
          return Math.min(...list);
        case "sum":
          return list.reduce((a, b) => a + b, 0);
        case "average":
          return list.reduce((a, b) => a + b, 0) / listLength;
        case "median": {
          const list2 = list.sort(Scratch.Cast.compare);
          const list2Length = list2.length;
          const c = Math.floor(list2Length / 2);
          const e = list2Length % 2 === 0;
          if (e) return (list2[c - 1] + list2[c]) / 2;
          return list2[c];
        }
        case "mode": {
          const freqMap = new Map(),
            mode = [0, 0]; // current mode, max
          for (
            let i = 0, num = list[0], count = null;
            i < listLength;
            i++, num = list[i], count = freqMap.get(num)
          ) {
            count ||= 1;
            if (freqMap.has(num)) ++count;
            if (count > mode[1]) (mode[0] = num), (mode[1] = count);
            freqMap.set(num, count);
          }
          return mode[0];
        }
        case "variance": {
          const average = list.reduce((a, b) => a + b, 0) / listLength;
          const list2 = list.map((a) => (a - average) ** 2);
          return list2.reduce((a, b) => a + b, 0) / listLength;
        }
      }
      return 0;
    }
  }
  Scratch.extensions.register(new JSONS());
})(Scratch);
