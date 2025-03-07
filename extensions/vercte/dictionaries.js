// Name: Dictionaries
// ID: verctedictionaries
// Description: Use the power of dictionaries in your project.
// By: Vercte <https://scratch.mit.edu/users/lolecksdeehaha/>
// License: MIT

(function (Scratch) {
  "use strict";
  let dictionaries = new Map();

  Scratch.vm.runtime.on("RUNTIME_DISPOSED", () => {
    dictionaries.clear();
  });

  class DictionaryExtension {
    getInfo() {
      return {
        id: "verctedictionaries",
        name: Scratch.translate("Dictionaries"),
        color1: "#008cff",
        color2: "#0073d1",
        color3: "#0066ba",
        blocks: [
          {
            opcode: "dict_list",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("list of dictionaries"),
          },
          {
            opcode: "dict_stringify",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("stringify dictionary [DICT] into JSON"),
            arguments: {
              DICT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "foo",
              },
            },
          },
          {
            opcode: "dict_parse",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("parse JSON [OBJ] into dictionary [DICT]"),
            arguments: {
              OBJ: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"bar": "baz"}',
              },
              DICT: { type: Scratch.ArgumentType.STRING, defaultValue: "foo" },
            },
          },

          "---",

          {
            opcode: "dict_get",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("key [KEY] from dictionary [DICT]"),
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, defaultValue: "bar" },
              DICT: { type: Scratch.ArgumentType.STRING, defaultValue: "foo" },
            },
          },
          {
            opcode: "dict_property_defined",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate(
              "key [KEY] in dictionary [DICT] is defined?"
            ),
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, defaultValue: "bar" },
              DICT: { type: Scratch.ArgumentType.STRING, defaultValue: "foo" },
            },
          },
          {
            opcode: "dict_property_null",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("key [KEY] in dictionary [DICT] is null?"),
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, defaultValue: "bar" },
              DICT: { type: Scratch.ArgumentType.STRING, defaultValue: "foo" },
            },
          },

          "---",

          {
            opcode: "dict_set",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set key [KEY] in dictionary [DICT] to [VAL]"
            ),
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, defaultValue: "bar" },
              DICT: { type: Scratch.ArgumentType.STRING, defaultValue: "foo" },
              VAL: { type: Scratch.ArgumentType.STRING, defaultValue: "baz" },
            },
          },
          {
            opcode: "dict_change",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "change key [KEY] in dictionary [DICT] by [BY]"
            ),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "number",
              },
              DICT: { type: Scratch.ArgumentType.STRING, defaultValue: "foo" },
              BY: { type: Scratch.ArgumentType.NUMBER, defaultValue: "1" },
            },
          },

          "---",

          {
            opcode: "dict_delete",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("remove dictionary [DICT]"),
            arguments: {
              DICT: { type: Scratch.ArgumentType.STRING, defaultValue: "foo" },
            },
          },
          {
            opcode: "dict_delete_key",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("remove key [KEY] from dictionary [DICT]"),
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, defaultValue: "bar" },
              DICT: { type: Scratch.ArgumentType.STRING, defaultValue: "foo" },
            },
          },
        ],
      };
    }

    dict_list() {
      return Array.from(dictionaries.keys()).join(" ");
    }

    dict_stringify({ DICT }) {
      const mapToObj = (m) => {
        return Array.from(m).reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});
      };
      if (!dictionaries.get(DICT)) return "{}";
      return JSON.stringify(mapToObj(dictionaries.get(DICT)));
    }

    dict_parse({ OBJ, DICT }) {
      let dict = null;
      try {
        dict = JSON.parse(OBJ);
      } catch (e) {
        dict = { error: String(e) };
      }
      dictionaries.set(DICT, new Map(Object.entries(dict)));
    }

    dict_get({ KEY, DICT }) {
      if (!dictionaries.get(DICT)) return "null";
      KEY = Scratch.Cast.toString(KEY);
      let dict = dictionaries.get(DICT);
      let value = dict.get(KEY);
      if (
        typeof value === "number" ||
        typeof value === "string" ||
        typeof value === "boolean"
      ) {
        return value;
      }
      if (value === undefined) {
        return "undefined";
      }
      return JSON.stringify(value);
    }

    dict_property_defined({ KEY, DICT }) {
      if (!dictionaries.get(DICT)) return false;
      let dict = dictionaries.get(DICT);
      KEY = Scratch.Cast.toString(KEY);
      return dict.get(KEY) === undefined ? false : true;
    }

    dict_property_null({ KEY, DICT }) {
      if (!dictionaries.get(DICT)) return false;
      let dict = dictionaries.get(DICT);
      return dict.get(KEY) === null ? true : false;
    }

    dict_set({ KEY, DICT, VAL }) {
      if (!dictionaries.get(DICT)) {
        dictionaries.set(DICT, new Map());
      }
      let dict = dictionaries.get(DICT);
      KEY = Scratch.Cast.toString(KEY);
      dict.set(KEY, VAL);
    }

    dict_change({ KEY, DICT, BY }) {
      if (!dictionaries.get(DICT)) {
        dictionaries.set(DICT, new Map());
      }
      let dict = dictionaries.get(DICT);
      KEY = Scratch.Cast.toString(KEY);
      if (isNaN(+dict.get(KEY))) dict.set(KEY, 0);
      dict.set(KEY, dict.get(KEY) + BY);
    }

    dict_delete({ DICT }) {
      if (dictionaries.has(DICT)) dictionaries.delete(DICT);
    }

    dict_delete_key({ KEY, DICT }) {
      if (dictionaries.has(DICT)) {
        KEY = Scratch.Cast.toString(KEY);
        dictionaries.get(DICT).delete(KEY);
      }
    }
  }

  Scratch.extensions.register(new DictionaryExtension());
})(Scratch);
