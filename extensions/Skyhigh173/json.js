// Name: JSON
// ID: skyhigh173JSON
// Description: Handle JSON strings and arrays.
// By: Skyhigh173
// License: MIT

(function (Scratch) {
  "use strict";
  /*
   * JSON extension v2.6 by skyhigh173
   * Do not remove this comment
   */

  const vm = Scratch.vm;
  const hasOwn = (obj, property) =>
    Object.prototype.hasOwnProperty.call(obj, property);

  const makeLabel = (text) => ({
    blockType: "label",
    text: text,
  });

  const sampleJSON = {
    keyval: '{"key":"value"}',
    mulkeyval: '{"key":"value","key2":"value2"}',
    list: '["scratch","TurboWarp"]',
    longList: '["apple","banana","orange"]',
    intList: "[1,2,3,4]",
    floatList: "[5.23, 214, 522, 61, 5.24, 62.2, 1, 51212, 0, 0]",
  };

  class JSONS {
    getInfo() {
      return {
        id: "skyhigh173JSON",
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
                defaultValue: sampleJSON.keyval,
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
                defaultValue: sampleJSON.keyval,
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
                defaultValue: sampleJSON.mulkeyval,
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
                defaultValue: sampleJSON.keyval,
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
                defaultValue: sampleJSON.list,
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
          "---",
          {
            opcode: "json_minify",
            blockType: Scratch.BlockType.REPORTER,
            text: "minify [json]",
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ' {"key" : "value" } ',
              },
            },
          },
          {
            opcode: "json_flip",
            blockType: Scratch.BlockType.REPORTER,
            text: "flip key-value pair in [json]",
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: sampleJSON.mulkeyval,
              },
            },
          },
          "---",
          {
            opcode: "json_get_path",
            blockType: Scratch.BlockType.REPORTER,
            text: "get value by path [path] in [json]",
            arguments: {
              path: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["key","inner",1]',
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":{"inner":[true,false]}}',
              },
            },
          },
          {
            opcode: "json_set_path",
            blockType: Scratch.BlockType.REPORTER,
            text: "set value by path [path] in [json] to [data]",
            arguments: {
              path: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["key","inner",1]',
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":{"inner":[true,false]}}',
              },
              data: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'value'
              }
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
                defaultValue: sampleJSON.mulkeyval,
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
                defaultValue: sampleJSON.keyval,
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
                defaultValue: sampleJSON.keyval,
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
                defaultValue: sampleJSON.mulkeyval,
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
                defaultValue: sampleJSON.intList,
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
                defaultValue: sampleJSON.list,
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
                defaultValue: sampleJSON.longList,
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
                defaultValue: "pear",
              },
              pos: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: sampleJSON.longList,
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
                defaultValue: sampleJSON.longList,
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
                defaultValue: sampleJSON.list,
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
                defaultValue: sampleJSON.intList,
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
                defaultValue: sampleJSON.intList,
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
            text: Scratch.translate("concatenate array [json] [json2]"),
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: sampleJSON.list,
              },
              json2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: sampleJSON.longList,
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
                defaultValue: sampleJSON.list,
              },
              len: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            // requested by sharkpool, I will improve it when theres lambda function
            opcode: "json_array_textfilter",
            blockType: Scratch.BlockType.REPORTER,
            text: "filter array [list] if text [options] [text] and return [type]",
            arguments: {
              list: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: sampleJSON.longList,
              },
              options: {
                type: Scratch.ArgumentType.STRING,
                menu: "filter_options",
              },
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "e",
              },
              type: {
                type: Scratch.ArgumentType.STRING,
                menu: "types",
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
                defaultValue: sampleJSON.floatList,
              },
              order: {
                type: Scratch.ArgumentType.STRING,
                menu: "sort_order",
              },
            },
          },
          makeLabel(Scratch.translate("Variables & Lists")),
          {
            opcode: "json_vm_export_var",
            blockType: Scratch.BlockType.REPORTER,
            text: "export all variables",
            disableMonitor: true,
          },
          {
            opcode: "json_vm_import_var",
            blockType: Scratch.BlockType.COMMAND,
            text: "import all variables from [json]",
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"my variable": 1}',
              },
            },
          },
          "---",
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
                defaultValue: sampleJSON.longList,
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
          filter_options: {
            items: ["includes", "starts with", "ends with"],
          },
        },
      };
    }

    getLists() {
      const globalLists = Object.values(
        vm.runtime.getTargetForStage().variables
      ).filter((x) => x.type == "list");
      const localLists = Object.values(vm.editingTarget.variables).filter(
        (x) => x.type == "list"
      );
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
      } else {
        try {
          JSON.parse(json);
          return true;
        } catch {
          return false;
        }
      }
    }

    /**
     * Checks if the input is valid JSON or not, then return it
     * @param {*} json 
     * @returns {Object|Any}
     */
    json_valid_return(json) {
      if (typeof json != "string") {
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
        }
      } catch {
        // ignore
      }
      return false;
    }

    json_minify({ json }) {
      try {
        return JSON.stringify(JSON.parse(json));
      } catch {
        return "";
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

    json_flip({ json }) {
      try {
        json = Object.entries(JSON.parse(json));
        let result = {};
        let store = (key,val) => {
          // invalid key
          if (typeof key === "object") return;
          if (typeof result[key] == "undefined") {
            // new key
            result[key] = val;
          } else {
            // multiple key exists
            if (Array.isArray(result[key])) {
              result[key] = result[key].push(val);
            } else {
              result[key] = [result[key], val];
            }
          }
        };
        for (const i of json) {
          if (Array.isArray(i[1])) {
            // map to different keys
            for (const key of i[1]) {
              store(key, i[0]);
            }
          } else {
            store(i[1], i[0]);
          }
        }
        return JSON.stringify(result);
      } catch {
        return "";
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
            return JSON.stringify(Object.keys(json));
          case "values":
            return JSON.stringify(Object.values(json));
          case "datas":
            return JSON.stringify(Object.entries(json));
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

    json_get_path({ path, json }) {
      try {
        path = JSON.parse(path);
        json = JSON.parse(json);
        for (let key of path) {
          if (Array.isArray(json)) {
            if (key == 0) return "";
            if (key > 0) key--;
            key += key < 0 ? json.length : 0;
            if (key >= json.length || key < 0) return "";
          }
          json = json[key];
        }
        if (typeof json == "object") {
          return JSON.stringify(json);
        } else {
          return json;
        }
      } catch {
        return "";
      }
    }

    json_set_path({ path, json, data }) {
      try {
        path = JSON.parse(path);
        json = JSON.parse(json);
        let obj = json;
        data = this.json_valid_return(data);
        let count = path.length;
        for (let key of path) {
          if (Array.isArray(obj)) {
            if (key == 0) return "";
            if (key > 0) key--;
            key += key < 0 ? obj.length : 0;
            if (key >= obj.length || key < 0) return "";
          }
          count--;
          if (count == 0) {
            obj[key] = data;
          } else {
            obj = obj[key];
          }
        }
        return JSON.stringify(json);
      } catch {
        return "";
      }
    }

    json_array_get({ item, json }) {
      // 1...length : array content, -1...-length : reverse array content, 0 : ERROR
      try {
        json = JSON.parse(json);
        item = Scratch.Cast.toNumber(item);
        if (item == 0) return "";
        if (item > 0) item--;
        item += item < 0 ? json.length : 0;
        if (item >= json.length || item < 0) return "";

        let result = json[item];
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

    json_array_textfilter(args) {
      try {
        const option = args.options;
        let list = JSON.parse(args.list);
        // check type
        const isArray = Array.isArray(list);
        // [[0, a], [1, b], [2, c]]
        list = Object.entries(list);
        const text = Scratch.Cast.toString(args.text);
        const out = args.type;

        switch (option) {
          case "includes":
            list = list.filter(
              (x) => typeof x[1] === "string" && x[1].includes(text)
            );
            break;
          case "starts with":
            list = list.filter(
              (x) => typeof x[1] === "string" && x[1].startsWith(text)
            );
            break;
          case "ends with":
            list = list.filter(
              (x) => typeof x[1] === "string" && x[1].endsWith(text)
            );
            break;
          default:
            return ""; // shouldn't happen
        }
        if (out === "Object") {
          // if array, convert to scratch index
          if (isArray) list = list.map(([k, v]) => [Number(k) + 1, v]);
          return JSON.stringify(Object.fromEntries(list));
        }
        if (out === "Array") return JSON.stringify(list.map((x) => x[1]));
      } catch {
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
      if (!Array.isArray(list)) return "";

      list.sort(Scratch.Cast.compare);
      if (args.order === "descending") list.reverse();
      return JSON.stringify(list);
    }

    json_vm_export_var(_, util) {
      const getVariables = (x) =>
        Object.fromEntries(
          Object.values(x.variables)
            .filter((x) => x.type === "")
            .map((x) => [x.name, x.value])
        );

      const global = getVariables(vm.runtime.getTargetForStage());
      const local = getVariables(util.target);
      return JSON.stringify({ ...global, ...local });
    }

    json_vm_import_var({ json }, util) {
      try {
        json = JSON.parse(json);
        Object.entries(json).forEach(([k, v]) => {
          util.target.lookupVariableByNameAndType(k, "").value = v;
        });
      } catch {}
    }
  }
  Scratch.extensions.register(new JSONS());
})(Scratch);
