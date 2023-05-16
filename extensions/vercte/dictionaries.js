window.dictionaries = new Map();
class DictionaryExtension {
  getInfo() {
    return {
      id: 'verctedictionaries',
      name: 'Dictionaries',
      blocks: [
        {
          opcode: 'dict_stringify',
          blockType: Scratch.BlockType.REPORTER,
          text: 'stringify dictionary [DICT] into JSON',
          arguments: {
            DICT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'foo'
            }
          }
        },
        {
          opcode: 'dict_parse',
          blockType: Scratch.BlockType.COMMAND,
          text: 'parse JSON [OBJ] into dictionary [DICT]',
          arguments: {
            OBJ: { type: Scratch.ArgumentType.STRING, defaultValue: '{"bar": "baz"}' },
           DICT: { type: Scratch.ArgumentType.STRING, defaultValue: 'foo' }
          }
        },
        
        '---',
        
        {
          opcode: 'dict_get',
          blockType: Scratch.BlockType.REPORTER,
          text: 'get key [KEY] from dictionary [DICT]',
          arguments: {
            KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'bar' },
           DICT: { type: Scratch.ArgumentType.STRING, defaultValue: 'foo' },
          }
        },
        {
          opcode: 'dict_property_defined',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'key [KEY] in dictionary [DICT] is defined?',
          arguments: {
            KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'bar' },
           DICT: { type: Scratch.ArgumentType.STRING, defaultValue: 'foo' },
          }
        },
        {
          opcode: 'dict_property_null',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'key [KEY] in dictionary [DICT] is null?',
          arguments: {
            KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'bar' },
           DICT: { type: Scratch.ArgumentType.STRING, defaultValue: 'foo' },
          }
        },
        
        '---',
        
        {
          opcode: 'dict_set',
          blockType: Scratch.BlockType.COMMAND,
          text: 'set key [KEY] in dictionary [DICT] to [VAL]',
          arguments: {
            KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'bar' },
           DICT: { type: Scratch.ArgumentType.STRING, defaultValue: 'foo' },
            VAL: { type: Scratch.ArgumentType.STRING, defaultValue: 'baz' }
          }
        },
        {
          opcode: 'dict_change',
          blockType: Scratch.BlockType.COMMAND,
          text: 'change key [KEY] in dictionary [DICT] by [BY]',
          arguments: {
            KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'number' },
           DICT: { type: Scratch.ArgumentType.STRING, defaultValue: 'foo' },
             BY: { type: Scratch.ArgumentType.NUMBER, defaultValue: '1' }
          }
        }
      ]
    };
  }

  dict_stringify({ DICT }) {
    const mapToObj = m => {
      return Array.from(m).reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
    };
    if(!window.dictionaries.get(DICT)) return "{}";
    return JSON.stringify(mapToObj(window.dictionaries.get(DICT)));
  }
  
  dict_parse({ OBJ, DICT }) {
    let dict = null;
    try {
      dict = JSON.parse(OBJ);
    } catch(e) {
      dict = {"error": String(e)};
    }
    window.dictionaries.set(DICT, new Map(Object.entries(dict)));
  }
  
  dict_get({ KEY, DICT }) {
    if(!window.dictionaries.get(DICT)) return "null";
    let dict = window.dictionaries.get(DICT);
    return dict.get(KEY) ? dict.get(KEY) : null; 
  }
  
  dict_property_defined({ KEY, DICT }) {
    if(!window.dictionaries.get(DICT)) return false;
    let dict = window.dictionaries.get(DICT);
    return dict.get(KEY) === undefined ? false : true;
  }
  
  dict_property_null({ KEY, DICT }) {
    if(!window.dictionaries.get(DICT)) return false;
    let dict = window.dictionaries.get(DICT);
    return dict.get(KEY) === null ? true : false;
  }
  
  dict_set({ KEY, DICT, VAL }) {
    if(!window.dictionaries.get(DICT)) {
       window.dictionaries.set(DICT, new Map());
    }
    let dict = window.dictionaries.get(DICT);
    dict.set(KEY, VAL); 
  }
  
  dict_change({ KEY, DICT, BY }) {
    if(!window.dictionaries.get(DICT)) {
       window.dictionaries.set(DICT, new Map());
    }
    let dict = window.dictionaries.get(DICT);
    if(isNaN(+dict.get(KEY))) dict.set(KEY, 0);
    dict.set(KEY, dict.get(KEY) + BY); 
  }
}

Scratch.extensions.register(new DictionaryExtension());
