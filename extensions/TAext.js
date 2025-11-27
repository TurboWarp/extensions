(function (Scratch) {
  'use strict';

  /**
   * Custom Builders Assembly
   * Old ID: serializesystemplus15
   * ID: custombuildersassembly
   * Old Name: Serialization System+ v15 (Ultimate)
   * Name: Custom Builders Assembly
   * Author: TheJavaScripter
   *
   * - Contiene TODOS los bloques para mejorar tu proyecto
   * - Retrocompatibilidad (aliases)
   * - Bloques de guardado/carga/get saved/clear
   * - Implementaciones seguras / stubs donde corresponde
   */

  class TA {
    constructor(runtime) {
      this.runtime = runtime;

      // Core storage
      this.STORAGE = {
        vars: {},            // variables
        builders: {},        // open builder buffers
        builderStack: [],    // stack for builders
        buffers: {},         // binary buffers (Uint8Array)
        lambdas: {},         // named lambdas
        functions: {},       // function bodies (stubs)
        classes: {},
        customBlocks: {},    // user-defined custom blocks metadata
        symbols: {},         // created symbols
        savedData: null,     // last saved payload (string)
        logs: [],
        listmaps: {},  // lists can created
        appEnum: {},
      };

      this._returnValue = '';
      this._console = '';
      this._STACKvalue = '';
      this._STACKOUT = '';
    }

    getInfo() {
      return {
        id: 'turboassembly',
        name: 'Turbo Assembly',
        color1: '#ff3433',
        blockIconURI: 'data:image/png;base64,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',
         blocks: [
          
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'functions'
          },

          {
  opcode: 'setReturnValue',
  blockType: Scratch.BlockType.COMMAND,
  text: 'return [VALUEr]',
  arguments: {
    VALUEr: {
      type: Scratch.ArgumentType.STRING,
      defaultValue: '0'
    }
  },
  func: 'setReturnValue',
  isTerminal: true,
},

        {
          opcode: 'myReporterFunc',
          blockType: Scratch.BlockType.REPORTER,
          blockShape: Scratch.BlockShape.SQUARE,
          text: 'function',
          arguments: {},
          disableMonitor: true,
        },
          
          // --- Experimental ---
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'operators'
          },
          {
            opcode: 'selecttrig',
            blockType: Scratch.BlockType.REPORTER,
            text: 'calc [Menutrig] in number [NUM]',
            arguments: 
            {
             Menutrig: {type: Scratch.ArgumentType.STRING, menu: 'trigmenu'},
             NUM: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            }
          },
          {
           opcode: 'basearray',
           blockType: Scratch.BlockType.REPORTER,
           text: 'BaseArray [array]',
           arguments: 
           {
            array: {type: Scratch.ArgumentType.STRING, defaultValue: '["a","b","c"]'}
           }
          },

          {
           opcode: 'timer',
           blockType: Scratch.BlockType.REPORTER,
           text: 'timer',
           arguments: {}
          },

          {
            opcode: 'sin',
            blockType: Scratch.BlockType.REPORTER,
            text: 'sin [Sin]',
            arguments: 
            {
             Sin: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            },

            colour: '#4CBF5F'
          },

          {
            opcode: 'tan',
            blockType: Scratch.BlockType.REPORTER,
            text: 'tan [Tan]',
            arguments: 
            {
             Tan: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            },

            colour: '#4CBF5F'
          },

          {
            opcode: 'cos',
            blockType: Scratch.BlockType.REPORTER,
            text: 'cos [Cos]',
            arguments: 
            {
             Cos: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            },

            colour: '#4CBF5F'
          },

          {opcode: 'add', blockType: Scratch.BlockType.REPORTER, text: '[NUM1] + [NUM2]', arguments: {NUM1: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, NUM2: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0} }, colour: '#4CBF5F'},

          {opcode: 'subtract', blockType: Scratch.BlockType.REPORTER, text: '[NUM1s] - [NUM2s]', arguments: {NUM1s: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, NUM2s: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0} }, colour: '#4CBF5F'},

          {opcode: 'multiply', blockType: Scratch.BlockType.REPORTER, text: '[NUM1m] * [NUM2m]', arguments: {NUM1m: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, NUM2m: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0} }, colour: '#4CBF5F'},

          {opcode: 'divide', blockType: Scratch.BlockType.REPORTER, text: '[NUM1d] / [NUM2d]', arguments: {NUM1d: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, NUM2d: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0} }, colour: '#4CBF5F'},
        
          {opcode: 'module', blockType: Scratch.BlockType.REPORTER, text: '[NUM1mo] % [NUM2mo]', arguments: {NUM1mo: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, NUM2mo: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}}, colour: '#4CBF5F'},
          {
            opcode: 'sinh',
            blockType: Scratch.BlockType.REPORTER,
            text: 'sinh [Sinh]',
            arguments: 
            {
             Sinh: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            },
            colour: '#4CBF5F'
          },

          {
            opcode: 'cosh',
            blockType: Scratch.BlockType.REPORTER,
            text: 'cosh [Cosh]',
            arguments: 
            {
             Cosh: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            },
            colour: '#4CBF5F'
          },

          {
            opcode: 'tanh',
            blockType: Scratch.BlockType.REPORTER,
            text: 'tanh [Tanh]',
            arguments: 
            {
             Tanh: {type: Scratch.ArgumentType.NUMBER, defaultValue: 90},
            },
            colour: '#4CBF5F'
          },

          {
            opcode: 'negNumber',
            blockType: Scratch.BlockType.REPORTER,
            text: '- [NUMneg]',
            arguments: {NUMneg: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10}},
            colour: '#4CBF5F'
          },

          {
            opcode: 'pownumber',
            blockType: Scratch.BlockType.REPORTER,
            text: '[NUM1pow] ^ [NUM2pow]',
            arguments: {NUM1pow: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10}, NUM2pow: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10}},
            colour: '#4CBF5F'
          },
          {
            opcode: 'sqrt',
            blockType: Scratch.BlockType.REPORTER,
            text: 'sqrt [Sqrt]',
            arguments:
            {
             Sqrt: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0},
            },
            colour: '#4CBF5F'
          },
          {
            opcode: 'cbrt',
            blockType: Scratch.BlockType.REPORTER,
            text: 'cbrt [Cbrt]',
            arguments:
            {
             Cbrt: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0},
            },
            colour: '#4CBF5F'
          },
          {
            opcode: 'fixnumber',
            blockType: Scratch.BlockType.REPORTER,
            text: 'fix [NUMfix]',
            arguments: {NUMfix: {type: Scratch.ArgumentType.NUMBER, defaultValue: 1.5}},
            colour: '#4CBF5F'
          },
          {
            opcode: 'floordiv',
            blockType: Scratch.BlockType.REPORTER,
            text: '[NUM1fd] // [NUM2fd]',
            arguments: {NUM1fd: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10}, NUM2fd: {type: Scratch.ArgumentType.NUMBER, defaultValue: 1.5}},
            colour: '#4CBF5F'
          },

          {
            opcode: 'lists',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set List C [Name] = [Value]',
            arguments: 
            {
             Name: {type: Scratch.ArgumentType.STRING, defaultValue: 'list'},
             Value: {type: Scratch.ArgumentType.STRING, defaultValue: '{}'},
            }
          },

          {
            opcode: 'True',
            blockType: Scratch.BlockType.BOOLEAN,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'true',
            arguments: {},
            colour: '#4CBF5F'
          },

          {
            opcode: 'False',
            blockType: Scratch.BlockType.BOOLEAN,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'false',
            arguments: {},
            colour: '#4CBF5F'
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'ioDevices helpers'
          },
          {
            opcode: 'lastkey',
            blockType: Scratch.BlockType.REPORTER,
            text: 'last key pressed',
            arguments: {},
          },
          {
            opcode: 'mousex',
            blockType: Scratch.BlockType.REPORTER,
            text: 'mouse x',
            arguments: {},
          },
          {
            opcode: 'mousey',
            blockType: Scratch.BlockType.REPORTER,
            text: 'mouse y',
            arguments: {},
          },
          {
            opcode: 'mouseisdown',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'mouse down?',
            arguments: {},
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'text helpers'
          },
          {
            opcode: 'Join',
            blockType: Scratch.BlockType.REPORTER,
            text: 'join [word1] to [word2]',
            arguments: 
            {
              word1: {type: Scratch.ArgumentType.STRING, defaultValue: 'hello'},
              word2: {type: Scratch.ArgumentType.STRING, defaultValue: 'world'},
            },
            colour: '#4CBF5F'
          },
          {
            opcode: 'jmp',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'new line',
            arguments: {},
            colour: '#4CBF5F'
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'labels'
          },
          {
            opcode: 'label',
            blockType: Scratch.BlockType.COMMAND,
            text: '// [textlabel]',
            arguments: {textlabel: {type: Scratch.ArgumentType.STRING, defaultValue: 'text'}}
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'vars'
          },
          // --- Core variables & aliases ---
          { opcode: 'set_var_c', blockType: Scratch.BlockType.COMMAND, text: 'Set var C [NAME] = [VALUE]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'var' }, VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' } } },
          { opcode: 'var_c', blockType: Scratch.BlockType.REPORTER, text: 'Var C [NAME]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'var' } } },

           {
            blockType: Scratch.BlockType.LABEL,
            text: 'logic'
          },
          {
            opcode: 'equalto',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[NUM1e] = [NUM2e]',
            arguments: 
            {
              NUM1e: {type: Scratch.ArgumentType.STRING, defaultValue: 0},
              NUM2e: {type: Scratch.ArgumentType.STRING, defaultValue: 0}
            },
            colour: '#4CBF5F'
          },

           {
            opcode: 'majorto',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[NUM1ma] > [NUM2ma]',
            arguments: 
            {
              NUM1ma: {type: Scratch.ArgumentType.STRING, defaultValue: 0},
              NUM2ma: {type: Scratch.ArgumentType.STRING, defaultValue: 0}
            },
            colour: '#4CBF5F'
          },

           {
            opcode: 'minorto',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[NUM1mi] < [NUM2mi]',
            arguments: 
            {
              NUM1mi: {type: Scratch.ArgumentType.STRING, defaultValue: 0},
              NUM2mi: {type: Scratch.ArgumentType.STRING, defaultValue: 0}
            },
            colour: '#4CBF5F'
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: 'values'
          },
          {
            opcode: 'nothingstring',
            blockType: Scratch.BlockType.REPORTER,
            text: 'nil',
            arguments: {},
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'branchs'
          },
          {
            opcode: 'branch',
            blockType: Scratch.BlockType.LOOP,
            text: '[menubranch] branch',
            arguments: {menubranch: {type: Scratch.ArgumentType.STRING, menu: 'branchmenu', defaultValue: "true"}},
            isTerminal: true,
          },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'old vars'
          },
          // legacy names (retrocompatibility)
          { opcode: 'setVarC', blockType: Scratch.BlockType.COMMAND, text: 'Set var C [NAME] = [VALUE]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'nombre' }, VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'valor' } } },
          { opcode: 'getVarC', blockType: Scratch.BlockType.REPORTER, text: 'Var C [NAME]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'nombre' } } },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'computer logic'
          },
          {
            opcode: 'and',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[VAL1a] and [VAL2a]',
            arguments: 
            {
              VAL1a: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
              VAL2a: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
            },
            colour: '#4CBF5F'
          },
          {
            opcode: 'or',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[VAL1o] or [VAL2o]',
            arguments: 
            {
              VAL1o: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
              VAL2o: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
            },
            colour: '#4CBF5F'
          },
           {
            opcode: 'xor',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[VAL1x] xor [VAL2x]',
            arguments: 
            {
              VAL1x: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
              VAL2x: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
            },
            colour: '#4CBF5F'
          },
            {
            opcode: 'xnor',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[VAL1xn] xnor [VAL2xn]',
            arguments: 
            {
              VAL1xn: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
              VAL2xn: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
            },
            colour: '#4CBF5F'
          },
           {
            opcode: 'nor',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[VAL1no] nor [VAL2no]',
            arguments: 
            {
              VAL1no: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
              VAL2no: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
            },
            colour: '#4CBF5F'
          },
          {
            opcode: 'not',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'not [VALn]',
            arguments: 
            {
              VALn: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true},
            },
            colour: '#4CBF5F'
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'math constants'
          },
          {
            opcode: 'pi',
            blockType: Scratch.BlockType.REPORTER,
            text: 'π',
            arguments: {},
            colour: '#4CBF5F'
          },
           {
            opcode: 'euler',
            blockType: Scratch.BlockType.REPORTER,
            text: 'e',
            arguments: {},
            colour: '#4CBF5F'
          },
          {
            opcode: 'phi',
            blockType: Scratch.BlockType.REPORTER,
            text: 'φ',
            arguments: {},
            colour: '#4CBF5F'
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'modifiers helper'
          },
          {
            opcode: 'tostring',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'string [text1s]',
            arguments: {text1s: {type: Scratch.ArgumentType.STRING, defaultValue: 'Hello world!'}}
          },
          {
            opcode: 'tonumber',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'number [text1n]',
            arguments: {text1n: {type: Scratch.ArgumentType.STRING, defaultValue: '10'}}
          },
          {
            opcode: 'toboolean',
            blockType: Scratch.BlockType.BOOLEAN,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'boolean [text1b]',
            arguments: {text1b: {type: Scratch.ArgumentType.STRING, defaultValue: 'true'}}
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'maps'
          },
          {
            opcode: 'createmap',
            blockType: Scratch.BlockType.COMMAND,
            text: 'create map [NAMEmap]',
            arguments: {NAMEmap: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}},
            colour: '#EE7D16'
          },
          {
            opcode: 'createitem',
            blockType: Scratch.BlockType.COMMAND,
            text: 'create item to [mapname] with value [Valueitem]',
            arguments: {mapname: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}, Valueitem: {type: Scratch.ArgumentType.STRING, defaultValue: 'bar'}},
             colour: '#EE7D16'
          },
          {
            opcode: 'deleteitem',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete item to [mapnamed] with idx [Valueitemd]',
            arguments: {mapnamed: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}, Valueitemd: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}},
             colour: '#EE7D16'
          },
          {
            opcode: 'lengthmap',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'length of map [maplist]',
            arguments: {maplist: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}},
             colour: '#EE7D16'
          },
          {
            opcode: 'itemofmap',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'item [idxitem] of map [mapitem]',
            arguments: {mapitem: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}, idxitem: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}},
             colour: '#EE7D16'
          },
          {
            opcode: 'idx2item4map',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'idx of item [idxmapitem] of map [mapidx]',
            arguments: {mapidx: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}, idxmapitem: {type: Scratch.ArgumentType.STRING, defaultValue: 'bar'}},
             colour: '#EE7D16'
          },
          {
            opcode: 'itemexists',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'item [existsitem] exists of map [mapdef]?',
            arguments: {mapdef: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}, existsitem: {type: Scratch.ArgumentType.STRING, defaultValue: 'bar'}},
             colour: '#EE7D16'
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Enum on apps'
          },
          {
            opcode: 'arequire',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'require: save [textreq] to [required]',
            arguments: {textreq: {type: Scratch.ArgumentType.STRING, defaultValue: 'express'}, required: {type: Scratch.ArgumentType.STACK, defaultValue: ''}}
          },
          {
             opcode: 'torequire',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'require: see [textreq1]',
            arguments: {textreq1: {type: Scratch.ArgumentType.STRING, defaultValue: 'express'}}
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'key and value helpers'
          },
          // --- Key/Value helpers ---
          { opcode: 'get_key_value', blockType: Scratch.BlockType.REPORTER, text: 'Get key [KEY] value [VALUE]', arguments: { KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'key' }, VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'value' } } },
          { opcode: 'string_value', blockType: Scratch.BlockType.REPORTER, text: 'String [VALUE]', arguments: { VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'text' } } },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'classes and anonymous'
          },
          // --- Classes / anonymous ---
          { opcode: 'class_block', blockType: Scratch.BlockType.COMMAND, text: 'Class [NAME]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'MyClass' } } },
          { opcode: 'anonymous_class', blockType: Scratch.BlockType.LOOP, text: 'Anonymous class' },
          { opcode: 'anonymous_class_extends', blockType: Scratch.BlockType.LOOP, text: 'Anonymous class extends [BASE]', arguments: { BASE: { type: Scratch.ArgumentType.STRING, defaultValue: 'Object' } } },
          { opcode: 'get_value_of_class', blockType: Scratch.BlockType.REPORTER, text: 'get value of class [CLASSNAME]', arguments: { CLASSNAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'MyClass' } } },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'OOP'
          },
          {
            opcode: 'new_class',
            blockType: Scratch.BlockType.COMMAND,
            text: 'def class [nameclass]',
            arguments: {nameclass: {type: Scratch.ArgumentType.STRING, defaultValue: 'Build'}},
          },
          {
            opcode: 'Methods',
            blockType: Scratch.BlockType.LOOP,
            text: 'method. name [NAME] args [ARGS]',
            arguments: {NAME: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}, ARGS: {type: Scratch.ArgumentType.STRING, defaultValue: 'bar'}}
          },
          {
            opcode: 'argmethod',
            blockType: Scratch.BlockType.REPORTER,
            text: 'method args. class [NAME], method: [NAME1]',
            arguments: {NAME: {type: Scratch.ArgumentType.STRING, defaultValue: 'Build'}, NAME1: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'}},
          },

           {
            blockType: Scratch.BlockType.LABEL,
            text: 'builders'
          },
          // --- Builders: arrays, objects, xml, sets, functions, lambdas ---
          {
            opcode: 'tothis',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'this [buildername]',
            arguments: {buildername: {type: Scratch.ArgumentType.STRING, defaultValue: 'result'}},
            disableMonitor: true,
          },
          { opcode: 'set_builder', blockType: Scratch.BlockType.LOOP, text: 'set builder' },
          { opcode: 'blank_set', blockType: Scratch.BlockType.REPORTER, text: 'blank set' },
          { opcode: 'array_builder', blockType: Scratch.BlockType.LOOP, text: 'Array builder' },
          { opcode: 'object_builder', blockType: Scratch.BlockType.LOOP, text: 'Object builder' },
          { opcode: 'xml_builder', blockType: Scratch.BlockType.LOOP, text: 'XML builder' },
          { opcode: 'function_builder', blockType: Scratch.BlockType.LOOP, text: 'function builder [NAME] then', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'fn' } } },
          { opcode: 'create_lambda', blockType: Scratch.BlockType.LOOP, text: 'create lambda [NAME]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'lambda1' } } },
          { opcode: 'sets_builder', blockType: Scratch.BlockType.LOOP, text: 'Sets builder' },
          { opcode: 'array_builder_alt', blockType: Scratch.BlockType.LOOP, text: 'Array builder alt' /** bro, then this block its named "Array bulider" bruh*/},
          { opcode: 'append_to_builder', blockType: Scratch.BlockType.COMMAND, text: 'append [VALUE] to builder', arguments: { VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'item' } } },
          { opcode: 'end_builder', blockType: Scratch.BlockType.COMMAND, text: 'end builder save as [NAME]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'result' } } },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'set helpers'
          },
          // --- Set helpers ---
          { opcode: 'set_has', blockType: Scratch.BlockType.REPORTER, text: 'set [SETNAME] has [VALUE]?', arguments: { SETNAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'mySet' }, VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'item' } } },
          { opcode: 'set_delete', blockType: Scratch.BlockType.COMMAND, text: 'delete [VALUE] from set [SETNAME]', arguments: { VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'item' }, SETNAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'mySet' } } },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'I/O'
          },
          // --- Parse / Serialize / Formats ---
          { opcode: 'parse_in_data', blockType: Scratch.BlockType.REPORTER, text: 'parse [TYPE] in data [DATAREF]', arguments: { TYPE: { type: Scratch.ArgumentType.STRING, menu: 'parseTypes', defaultValue: 'JSON' }, DATAREF: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' } } },
          { opcode: 'save_data', blockType: Scratch.BlockType.COMMAND, text: 'save data [FORMAT]', arguments: { FORMAT: { type: Scratch.ArgumentType.STRING, menu: 'formats', defaultValue: 'JSON' } } },
          { opcode: 'get_saved_data', blockType: Scratch.BlockType.REPORTER, text: 'get saved data' },
          { opcode: 'load_data', blockType: Scratch.BlockType.COMMAND, text: 'load data [DATA]', arguments: { DATA: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' } } },
          { opcode: 'clear_data', blockType: Scratch.BlockType.COMMAND, text: 'clear saved data' },
          { opcode: 'csv_block', blockType: Scratch.BlockType.REPORTER, text: 'CSV [DATA]', arguments: { DATA: { type: Scratch.ArgumentType.STRING, defaultValue: 'data' } } },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'types'
          },
          // --- Typeof / Symbol / New object / Create symbol ---
          { opcode: 'typeof_block', blockType: Scratch.BlockType.REPORTER, text: 'typeof [TYPE]', arguments: { TYPE: { type: Scratch.ArgumentType.STRING, defaultValue: 'MyClass' } } },
          { opcode: 'create_symbol', blockType: Scratch.BlockType.REPORTER, text: 'create a symbol' },
          { opcode: 'new_object', blockType: Scratch.BlockType.REPORTER, text: 'New object' },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'calls, functions, returns'
          },
          // --- Functions / Calls / Construct / Return / Call function ---
          { opcode: 'call_function', blockType: Scratch.BlockType.COMMAND, text: 'Call function [NAME]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'fn' } } },
          { opcode: 'construct_block', blockType: Scratch.BlockType.COMMAND, text: 'Construct [TYPE] with [DATA]', arguments: { TYPE: { type: Scratch.ArgumentType.STRING, defaultValue: 'Object' }, DATA: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' } } },
          { opcode: 'return_block', blockType: Scratch.BlockType.COMMAND, text: 'return [VALUE]', arguments: { VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: '' } } },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'JSON utils'
          },
          // --- Merge / Clone / Remove / Count ---
          { opcode: 'merge_objects', blockType: Scratch.BlockType.REPORTER, text: 'merge [A] with [B]', arguments: { A: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' }, B: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' } } },
          {
            opcode: 'getkey',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get key [key] in JSON [metadata]',
            arguments: 
            {
             key: {type: Scratch.ArgumentType.STRING, defaultValue: 'foo'},
             metadata: {type: Scratch.ArgumentType.STRING, defaultValue: '{"foo": "bar"}'}
            }
          },
          { opcode: 'clone_object', blockType: Scratch.BlockType.REPORTER, text: 'clone [OBJ]', arguments: { OBJ: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' } } },
          { opcode: 'remove_key', blockType: Scratch.BlockType.COMMAND, text: 'remove key [KEY] from [OBJ]', arguments: { KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'k' }, OBJ: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' } } },
          { opcode: 'count_keys', blockType: Scratch.BlockType.REPORTER, text: 'count keys in [OBJ]', arguments: { OBJ: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' } } },
          {
            opcode: 'getidxlist',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get element [idxlist] to [listarray]',
            arguments: {idxlist: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}, listarray: {type: Scratch.ArgumentType.STRING, defaultValue: '[1, 2, 3]'}},
          },
          {
            opcode: 'json_keys',
            blockType: Scratch.BlockType.REPORTER,
            text: 'keys [Inputkeys]',
            arguments: {Inputkeys: {type: Scratch.ArgumentType.STACK, defaultValue: '["1","2"]'}}
          },
          {
            opcode: 'json_values',
            blockType: Scratch.BlockType.REPORTER,
            text: 'values [Inputvalues]',
            arguments: {Inputvalues: {type: Scratch.ArgumentType.STACK, defaultValue: '["1","2"]'}}
          },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'buffers'
          },
          // --- Buffers & Buffer type menu ---
          { opcode: 'buffer_type', blockType: Scratch.BlockType.REPORTER, text: 'buffer type [BUFFER]', arguments: { BUFFER: { type: Scratch.ArgumentType.STRING, menu: 'bufferTypes', defaultValue: '32B' } } },
          { opcode: 'allocate_buffer', blockType: Scratch.BlockType.REPORTER, text: 'allocate buffer of [BYTES] bytes', arguments: { BYTES: { type: Scratch.ArgumentType.NUMBER, defaultValue: 64 } } },
          { opcode: 'read_buffer', blockType: Scratch.BlockType.REPORTER, text: 'read buffer [ID] at [POS]', arguments: { ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'buf' }, POS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 } } },
          { opcode: 'write_buffer', blockType: Scratch.BlockType.COMMAND, text: 'write buffer [ID] at [POS] value [VAL]', arguments: { ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'buf' }, POS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }, VAL: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 } } },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'I/O and buffers'
          },
          // --- Save into with buffer (composed) ---
          { opcode: 'save_into_with_buffer', blockType: Scratch.BlockType.COMMAND, text: 'save into [FORMAT] with buffer type [BUFFERCHOICE]', arguments: { FORMAT: { type: Scratch.ArgumentType.STRING, menu: 'formats', defaultValue: 'JSON' }, BUFFERCHOICE: { type: Scratch.ArgumentType.STRING, menu: 'bufferTypes', defaultValue: '32B' } } },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'compress'
          },
          // --- Compression ---
          { opcode: 'compress_builder', blockType: Scratch.BlockType.COMMAND, text: 'Compress builder to [MODE]', arguments: { MODE: { type: Scratch.ArgumentType.STRING, menu: 'compressModes', defaultValue: 'raw' } } },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'customs'
          },
          // --- Custom Blocks / Hat / Call ---
          { opcode: 'custom_block_hat', blockType: Scratch.BlockType.HAT, text: 'custom block [NAME] json [JSONTEXT]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'custom' }, JSONTEXT: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' } } },
          { opcode: 'call_custom_block', blockType: Scratch.BlockType.COMMAND, text: 'call custom [NAME]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'custom' } } },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'control flow'
          },
          // --- Control flow & args ---
          { opcode: 'while_loop', blockType: Scratch.BlockType.LOOP, text: 'while [COND] do', arguments: { COND: { type: Scratch.ArgumentType.BOOLEAN, defaultValue: true } } },
          {
            opcode: 'ifthen',
            blockType: Scratch.BlockType.CONDITIONAL,
            text: 'if [conditional] then',
            arguments: 
            {
              conditional: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: true}
            },
            branchCount: 1
          },
          {
            opcode: 'loopforever',
            blockType: Scratch.BlockType.LOOP,
            text: 'forever',
            arguments: {},
            isTerminal: true,
          },
          // ... dentro de getInfo()

{
    opcode: 'repeatXTimes', // El nombre interno de la función
    blockType: Scratch.BlockType.LOOP, // ¡Esto le da la forma de C!
    text: 'repeat [TIMES] times',
    arguments: {
        TIMES: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 10
        }
    },
    // El código interno del bloque 'C' se ejecutará en la función 'repeatXTimes'
},
// ...
          {
          opcode: 'wait',
          text: 'wait [TIME] seconds',
          blockType: Scratch.BlockType.COMMAND,
          arguments: {
            TIME: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1
            }
          }
        },
        
        {
          opcode: 'switcacase',
          blockType: Scratch.BlockType.CONDITIONAL,
          text: 'switch [whenswitch]',
          arguments: {whenswitch: {type: Scratch.ArgumentType.STACK, defaultValue: ''}},
        },

        {
          opcode: 'casein',
          blockType: Scratch.BlockType.CONDITIONAL,
          text: 'case [inputtext]',
          arguments: {inputtext: {type: Scratch.ArgumentType.STRING, defaultValue: ''}},
        },

        {
          opcode: 'adefault',
          blockType: Scratch.BlockType.CONDITIONAL,
          text: 'default',
          arguments: {},
        },

        {
          opcode: 'trytodo',
          blockType: Scratch.BlockType.CONDITIONAL,
          branchCount: 2,
          text: 'try to do',
          arguments: {},
        },
        {
          opcode: 'reterror',
          blockType: Scratch.BlockType.REPORTER,
          text: 'error',
          arguments: {},
        },
        {
          blockType: Scratch.BlockType.LABEL,
          text: 'events'
        },

        {
          opcode: 'whenboolean',
          blockType: Scratch.BlockType.HAT,
          text: 'when [InputBoolean] is true',
          isEdgeActivated: true,
          arguments: {InputBoolean: {type: Scratch.ArgumentType.BOOLEAN, defaultValue: ''}},
        },

        {
          opcode: 'alwayshat',
          blockType: Scratch.BlockType.HAT,
          text: 'always',
          arguments: {},
        },

           {
            blockType: Scratch.BlockType.LABEL,
            text: 'URL'
          },
          {
            opcode: 'fetcha',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'fetch [url]',
            arguments: 
            {
              url: {type: Scratch.ArgumentType.STRING, defaultValue: 'https://extensions.turbowarp.org/hello.txt'},
            }
          },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'targets'
          },
          {
            opcode: 'XYpos',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set x: [X] y: [Y]',
            arguments: 
            {
              X: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0},
              Y: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0},
            }
          },
          {
            opcode: 'Xpos',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set x: [Xp]',
            arguments: {Xp: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}}
          },
          {
            opcode: 'Ypos',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set y: [Yp]',
            arguments: {Yp: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0}}
          },
          {
            opcode: 'degrees',
            blockType: Scratch.BlockType.COMMAND,
            text: 'rotate [DIR] degrees',
            arguments: {
             DIR: {type: Scratch.ArgumentType.NUMBER, defaultValue: 15}
            }
          },
           {
            opcode: 'angle',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set angle [ANGL] degrees',
            arguments: {
             ANGL: {type: Scratch.ArgumentType.ANGLE, defaultValue: 90},
            }
          },
          {
            opcode: 'movesteps',
            blockType: Scratch.BlockType.COMMAND,
            text: 'move [STEPS] steps',
            arguments: 
            {
              STEPS: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10}
            }
          },
          {
            opcode: 'posX',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'position x',
            arguments: {}
          },
           {
            opcode: 'posY',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'position y',
            arguments: {}
          },
          {
            opcode: 'Direction',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'angle',
            arguments: {}
          },
          {
            opcode: 'viewsize',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'size',
            arguments: {}
          },
          {
            opcode: 'setsize',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set size to [SIZE] %',
            arguments: {SIZE: {type: Scratch.ArgumentType.NUMBER, defaultValue: 100}},
          },
          {
            opcode: 'changesize',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change size to [SIZEc]',
            arguments: {SIZEc: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10}},
          },
          {
            opcode: 'showsprite',
            blockType: Scratch.BlockType.COMMAND,
            text: 'show',
            arguments: {},
          },
          {
            opcode: 'hidesprite',
            blockType: Scratch.BlockType.COMMAND,
            text: 'hide',
            arguments: {},
          },
          {
            opcode: 'say',
            blockType: Scratch.BlockType.COMMAND,
            text: 'say [texttosay]',
            arguments: {texttosay: {type: Scratch.ArgumentType.STRING, defaultValue: 'hello'}},
          },
          {
            opcode: 'scostume',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set costume [COSTUME]',
            arguments: {COSTUME: {type: Scratch.ArgumentType.COSTUME}},
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'console helpers'
          },
          {
            opcode: 'print',
            blockType: Scratch.BlockType.COMMAND,
            text: 'print [inputprint]',
            arguments: {inputprint: {type: Scratch.ArgumentType.STRING, defaultValue: ''}},
          },
          {
            opcode: 'console',
            blockType: Scratch.BlockType.REPORTER,
            blockShape: Scratch.BlockShape.SQUARE,
            text: 'console',
            arguments: {},
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'control debug'
          },
          { opcode: 'break_block', blockType: Scratch.BlockType.COMMAND, text: 'break', isTerminal: true },
          { opcode: 'continue_block', blockType: Scratch.BlockType.COMMAND, text: 'continue' },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'args'
          },
          { opcode: 'args_reporter', blockType: Scratch.BlockType.REPORTER, text: 'args [ARGS]', arguments: { ARGS: { type: Scratch.ArgumentType.STRING, defaultValue: 'args' } } },
           {
            blockType: Scratch.BlockType.LABEL,
            text: 'misc'
          },
          // --- Misc ---
          { opcode: 'inspect_block', blockType: Scratch.BlockType.REPORTER, text: 'inspect [OBJ]', arguments: { OBJ: { type: Scratch.ArgumentType.STRING, defaultValue: '__last' } } },
          { opcode: 'log_block', blockType: Scratch.BlockType.COMMAND, text: 'log [MSG]', arguments: { MSG: { type: Scratch.ArgumentType.STRING, defaultValue: 'msg' } } },
          { opcode: 'memory_usage', blockType: Scratch.BlockType.REPORTER, text: 'memory usage' },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'TA styles ✨'
          },
          {
            opcode: 'lerpcolor',
            blockType: Scratch.BlockType.REPORTER,
            text: 'color mix [Color1] to [Color2] amount [AmountColor]',
            arguments: 
            {
             Color1: {type: Scratch.ArgumentType.COLOR, defaultValue: '#FF0000'},
             Color2: {type: Scratch.ArgumentType.COLOR, defaultValue: '#0000FF'},
             AmountColor: {type: Scratch.ArgumentType.NUMBER, defaultValue: '50'},
            }
          },

          {
            opcode: 'hexcolor',
            blockType: Scratch.BlockType.REPORTER,
            text: 'convert color [CH] to hex',
            arguments: {CH: {type: Scratch.ArgumentType.COLOR, defaultValue: '#FFFF00'}}
          },

          {
    opcode: 'isLighter',
    blockType: Scratch.BlockType.BOOLEAN, // ¡Es booleano!
    text: '[COLOR1] is lighter than [COLOR2]?',
    arguments: {
        COLOR1: {
            type: Scratch.ArgumentType.COLOR,
            defaultValue: '#FF0000' // Rojo
        },
        COLOR2: {
            type: Scratch.ArgumentType.COLOR,
            defaultValue: '#000000' // Negro
        }
    }
},

          {
            opcode: 'vectorangle',
            blockType: Scratch.BlockType.REPORTER,
            text: 'angle of [XA] and [YA]',
            arguments: 
            {
              XA: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10},
              YA: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10},
            }
          },

          {
            opcode: 'vectorsum',
            blockType: Scratch.BlockType.REPORTER,
            text: 'vector add [VECTOR1] + [VECTOR2]',
            arguments: 
            {
              VECTOR1: {type: Scratch.ArgumentType.STRING, defaultValue: '{}'},
              VECTOR2: {type: Scratch.ArgumentType.STRING, defaultValue: '{}'}
            }
          },

          {
            opcode: 'vectormul',
            blockType: Scratch.BlockType.REPORTER,
            text: 'vector multiply [VECTOR1m] * [VECTOR2m]',
            arguments: 
            {
              VECTOR1m: {type: Scratch.ArgumentType.STRING, defaultValue: '{}'},
              VECTOR2m: {type: Scratch.ArgumentType.STRING, defaultValue: '{}'}
            }
          },

          {
            opcode: 'vectorsub',
            blockType: Scratch.BlockType.REPORTER,
            text: 'vector subtract [VECTOR1s] - [VECTOR2s]',
            arguments: 
            {
              VECTOR1s: {type: Scratch.ArgumentType.STRING, defaultValue: '{}'},
              VECTOR2s: {type: Scratch.ArgumentType.STRING, defaultValue: '{}'}
            }
          },

          {
            opcode: 'vectordiv',
            blockType: Scratch.BlockType.REPORTER,
            text: 'vector divide [VECTOR1d] / [VECTOR2d]',
            arguments: 
            {
              VECTOR1d: {type: Scratch.ArgumentType.STRING, defaultValue: '{}'},
              VECTOR2d: {type: Scratch.ArgumentType.STRING, defaultValue: '{}'}
            }
          },

          {
           opcode: 'vectorToArray',
           blockType: Scratch.BlockType.REPORTER,
           text: 'to array vector [VECTOR]',
           arguments: {
           VECTOR: { 
            type: Scratch.ArgumentType.STRING, 
            defaultValue: '{"x":0, "y":0}' 
           }
           }
           },

           {
        opcode: 'renderText',
        blockType: Scratch.BlockType.COMMAND,
        text: 'show text [TEXT] in x: [X] y: [Y]',
        arguments: {
            TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello TurboWarp!'
            },
            X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
            },
            Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
            }
        }
    }
        ],
        menus: {
          formats: { acceptReporters: true, items: ['JSON', 'XML', 'CSV', 'TXT', 'BIN'] },
          parseTypes: { acceptReporters: true, items: ['Object', 'XML', 'Map', 'CSV', 'JSON', 'TXT', 'BIN'] },
          bufferTypes: { acceptReporters: true, items: ['64B', '32B', '16B', '8B'] },
          compressModes: { acceptReporters: true, items: ['raw', 'gzip', 'none'] },
          editModes: { acceptReporters: true, items: ['add', 'delete', 'item', 'map', 'json edit', 'txt', 'modelcreator'] },
          trigmenu: { acceptReporters: true, items: ['sin', 'cos','tan','sinh','cosh']},
          branchmenu: {acceptReporters: true, items: ['true', 'false']}
        }
      };
    } // end getInfo

    _parseColor(color) {
            if (typeof color === 'number') {
                const hex = Math.round(color).toString(16).padStart(6, '0');
                color = `#${hex}`;
            }

            const hex = String(color).startsWith('#') ? String(color).substring(1) : String(color);
            
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);

            return [r, g, b];
        }

       _tryParse(jsonString) {
            if (typeof jsonString === 'object' && jsonString !== null) return jsonString; // Ya es un objeto, devuélvelo
            try {
                return JSON.parse(jsonString);
            } catch (e) {
                return jsonString; // Devuelve el string si no es un JSON válido
            }
        }

    // ----------------- Utilities -----------------
    _tryParseValue(v) {
      if (typeof v !== 'string') return v;
      const s = v.trim();
      if ((s.startsWith('{') && s.endsWith('}')) || (s.startsWith('[') && s.endsWith(']'))) {
        try { return JSON.parse(s); } catch (e) { /* ignore */ }
      }
      if (!isNaN(Number(s))) return Number(s);
      return s;
    }

    _deepClone(v) {
      try { return JSON.parse(JSON.stringify(v)); } catch (e) { return v; }
    }

    _genId(pref) {
      return pref + '_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
    }

    _topBuilder() {
      return this.STORAGE.builderStack.length ? this.STORAGE.builderStack[this.STORAGE.builderStack.length - 1] : null;
    }

    _convertData(data, format) {
      try {
        switch ((format || 'JSON').toString()) {
          case 'JSON': return JSON.stringify(data, null, 2);
          case 'XML': {
            let xml = '<data>\n';
            for (const k in data) xml += '  <' + k + '>' + JSON.stringify(data[k]) + '</' + k + '>\n';
            xml += '</data>';
            return xml;
          }
          case 'CSV': {
            let csv = 'key,value\n';
            for (const k in data) csv += k + ',"' + JSON.stringify(data[k]) + '"\n';
            return csv;
          }
          case 'TXT': return Object.entries(data).map(p => p[0] + ': ' + JSON.stringify(p[1])).join('\n');
          case 'BIN': {
            const s = JSON.stringify(data);
            return Array.from(s).map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
          }
          default: return JSON.stringify(data);
        }
      } catch (e) { return String(data); }
    }

    // ----------------- Core implementations -----------------

    // Variables
    set_var_c(args) {
      this.STORAGE.vars[args.NAME] = this._tryParseValue(args.VALUE);
    }
    setVarC(args) { this.set_var_c(args); }

    var_c(args) {
      const v = this.STORAGE.vars[args.NAME];
      if (typeof v === 'undefined') return '';
      return (typeof v === 'object') ? JSON.stringify(v) : String(v);
    }
    getVarC(args) { return this.var_c(args); }

    // Key/value helpers
    get_key_value(args) {
      const o = {};
      o[args.KEY] = args.VALUE;
      return JSON.stringify(o);
    }

    string_value(args) {
      return String(args.VALUE);
    }

    // Classes
    class_block(args) {
      if (!this.STORAGE.vars[args.NAME]) this.STORAGE.vars[args.NAME] = { _type: 'class', createdAt: Date.now() };
    }

    anonymous_class(util) {
      util.startBranch(1, false);
    }

    anonymous_class_extends(args, util) {
      const name = 'Anonymous_' + Math.floor(Math.random() * 10000);
      this.STORAGE.vars[name] = { _type: 'anonymous', extends: args.BASE, data: {} };
      this.STORAGE.builderStack.push({ type: 'anon', name: name });
      util.startBranch(1, false);
    }

    get_value_of_class(args) {
      return JSON.stringify(this.STORAGE.vars[args.CLASSNAME] || null);
    }

    // Builders
    set_builder(args, util) {
      const id = this._genId('builder');
      this.STORAGE.builders[id] = [];
      this.STORAGE.builderStack.push({ type: 'builder', id: id });
      util.startBranch(1, false);
    }

    blank_set() {
      return JSON.stringify({});
    }

    array_builder(args, util) {
      const id = this._genId('array');
      this.STORAGE.builders[id] = [];
      this.STORAGE.builderStack.push({ type: 'array', id: id });
      util.startBranch(1, false);
    }

    object_builder(args, util) {
      const id = this._genId('object');
      this.STORAGE.builders[id] = {};
      this.STORAGE.builderStack.push({ type: 'object', id: id });
      util.startBranch(1, false);
    }

    xml_builder(args, util) {
      const id = this._genId('xml');
      this.STORAGE.builders[id] = [];
      this.STORAGE.builderStack.push({ type: 'xml', id: id });
      util.startBranch(1, false);
    }

    function_builder(args, util) {
      const id = this._genId('function');
      this.STORAGE.builders[id] = [];
      this.STORAGE.builderStack.push({ type: 'function', id: id, name: args.NAME });
      util.startBranch(1, false);
    }

    create_lambda(args, util) {
      const id = this._genId('lambda');
      this.STORAGE.builders[id] = [];
      this.STORAGE.builderStack.push({ type: 'lambda', id: id, name: args.NAME });
      util.startBranch(1, false);
    }

    sets_builder(args, util) {
      const id = this._genId('set');
      this.STORAGE.builders[id] = [];
      this.STORAGE.builderStack.push({ type: 'set', id: id });
      util.startBranch(1, false);
    }

    array_builder_alt(args, util) {
      const id = this._genId('array_alt');
      this.STORAGE.builders[id] = [];
      this.STORAGE.builderStack.push({ type: 'array_alt', id: id });
      util.startBranch(1, false);
    }

    append_to_builder(args) {
      const top = this._topBuilder();
      if (!top) {
        const id = this._genId('builder');
        this.STORAGE.builders[id] = [];
        this.STORAGE.builderStack.push({ type: 'builder', id: id });
      }
      const cur = this._topBuilder();
      if (!cur) return;
      const id = cur.id;
      if (cur.type === 'set') {
        const v = this._tryParseValue(args.VALUE);
        const arr = this.STORAGE.builders[id];
        const key = (typeof v === 'object') ? JSON.stringify(v) : String(v);
        const exists = arr.some(x => (typeof x === 'object' ? JSON.stringify(x) : String(x)) === key);
        if (!exists) arr.push(v);
        return;
      }
      if (cur.type === 'array' || cur.type === 'builder' || cur.type === 'lambda' || cur.type === 'function' || cur.type === 'xml' || cur.type === 'array_alt') {
        this.STORAGE.builders[id].push(this._tryParseValue(args.VALUE));
        return;
      }
      if (cur.type === 'object') {
        const parsed = this._tryParseValue(args.VALUE);
        if (typeof parsed === 'object' && !Array.isArray(parsed)) {
          Object.assign(this.STORAGE.builders[id], parsed);
        } else {
          const m = String(args.VALUE).match(/^\s*([^:=]+)\s*[:=]\s*(.*)$/);
          if (m) {
            this.STORAGE.builders[id][m[1].trim()] = this._tryParseValue(m[2].trim());
          } else {
            this.STORAGE.builders[id][Object.keys(this.STORAGE.builders[id]).length] = this._tryParseValue(args.VALUE);
          }
        }
        return;
      }
    }

    end_builder(args) {
      const top = this.STORAGE.builderStack.pop();
      if (!top) return;
      const id = top.id;
      const content = this.STORAGE.builders[id];
      const name = args.NAME || top.name || ('value_' + id);
      if (top.type === 'lambda') {
        this.STORAGE.lambdas[top.name || name] = Array.isArray(content) ? content.slice() : [String(content)];
      } else if (top.type === 'function') {
        this.STORAGE.functions[top.name || name] = Array.isArray(content) ? content.slice() : [String(content)];
      } else if (top.type === 'set') {
        this.STORAGE.vars[name] = Array.isArray(content) ? content.slice() : [];
      } else {
        this.STORAGE.vars[name] = this._deepClone(content);
      }
      delete this.STORAGE.builders[id];
    }

    // --- Set helpers ---
    set_has(args) {
      const s = this.STORAGE.vars[args.SETNAME];
      if (!Array.isArray(s)) return false;
      const val = this._tryParseValue(args.VALUE);
      const key = (typeof val === 'object') ? JSON.stringify(val) : String(val);
      return s.some(x => (typeof x === 'object' ? JSON.stringify(x) : String(x)) === key);
    }

    set_delete(args) {
      const name = args.SETNAME;
      const val = this._tryParseValue(args.VALUE);
      const s = this.STORAGE.vars[name];
      if (!Array.isArray(s)) return;
      const key = (typeof val === 'object') ? JSON.stringify(val) : String(val);
      for (let i = 0; i < s.length; i++) {
        const k = (typeof s[i] === 'object') ? JSON.stringify(s[i]) : String(s[i]);
        if (k === key) { s.splice(i, 1); break; }
      }
    }

    // --- Compression ---
    compress_builder(args) {
      const mode = (args.MODE || args.MODE || '').toString().toLowerCase() || (args.system || 'rap');
      const top = this._topBuilder();
      if (!top) return;
      const id = top.id;
      const content = this.STORAGE.builders[id];
      if (typeof content === 'undefined') return;
      if (mode === 'raw') {
        try {
          const s = JSON.stringify(content);
          const min = s.replace(/\s+/g, ' ');
          this.STORAGE.builders[id] = min.replace(/(.)\1{4,}/g, function (m, ch) { return ch + 'x' + m.length; });
        } catch (e) { this.STORAGE.builders[id] = String(content); }
      } else if (mode === 'gzip') {
        this.STORAGE.builders[id] = 'GZIP:' + String(JSON.stringify(content)).slice(0, 128);
      } else {
        // none
      }
    }

    // --- Parse / Save / Convert ---
    parse_in_data(args) {
      const type = (args.TYPE || 'JSON').toString();
      const dataRef = args.DATAREF;
      const target = (this.STORAGE.vars.hasOwnProperty(dataRef) ? this.STORAGE.vars[dataRef] : dataRef);
      try {
        if (type === 'Object') {
          if (typeof target === 'string') return JSON.parse(target);
          return target;
        } else if (type === 'JSON') {
          if (typeof target === 'string') return JSON.stringify(JSON.parse(target), null, 2);
          return JSON.stringify(target, null, 2);
        } else if (type === 'XML') {
          if (typeof target === 'object') {
            let xml = '<data>';
            for (const k in target) xml += '<' + k + '>' + String(target[k]) + '</' + k + '>';
            xml += '</data>';
            return xml;
          }
          return '<data>' + String(target) + '</data>';
        } else if (type === 'CSV') {
          if (typeof target === 'object') {
            const rows = [];
            for (const k in target) rows.push([k, JSON.stringify(target[k])].join(','));
            return rows.join('\n');
          }
          return String(target);
        } else if (type === 'TXT') {
          if (typeof target === 'object') {
            return Object.entries(target).map(function (p) { return p[0] + ': ' + JSON.stringify(p[1]); }).join('\n');
          }
          return String(target);
        } else if (type === 'BIN') {
          const s = (typeof target === 'string') ? target : JSON.stringify(target);
          return Array.from(s).map(function (c) { return c.charCodeAt(0).toString(2).padStart(8, '0'); }).join(' ');
        } else if (type === 'Map') {
          if (typeof target === 'object') return JSON.stringify(Object.entries(target));
          return JSON.stringify(target);
        } else {
          return target;
        }
      } catch (e) {
        return 'parse error';
      }
    }

    save_data(args) {
      const fmt = (args.FORMAT || 'JSON').toString().toUpperCase();
      const payload = this._convertData(this.STORAGE.vars, fmt);
      this.STORAGE.savedData = payload;
      this.STORAGE.logs.push('saved:' + fmt);
    }

    get_saved_data() {
      return this.STORAGE.savedData === null ? '{}' : this.STORAGE.savedData;
    }

    load_data(args) {
      try {
        const data = args.DATA;
        const parsed = (typeof data === 'string' && (data.trim().startsWith('{') || data.trim().startsWith('['))) ? JSON.parse(data) : data;
        if (typeof parsed === 'object') {
          this.STORAGE.vars = this._deepClone(parsed);
        } else {
          // try parse for simple key=value lines
          const map = {};
          String(data).split(/\n/).forEach(function (line) {
            const m = String(line).match(/^\s*([^=]+)=(.*)$/);
            if (m) map[m[1].trim()] = m[2].trim();
          });
          this.STORAGE.vars = map;
        }
        this.STORAGE.logs.push('loaded');
      } catch (e) {
        this.STORAGE.logs.push('load error');
      }
    }

    clear_data() {
      this.STORAGE.savedData = null;
      this.STORAGE.logs.push('cleared savedData');
    }

    csv_block(args) {
      try {
        const d = this._tryParseValue(args.DATA);
        if (Array.isArray(d)) return d.join(',');
        if (typeof d === 'object') return Object.keys(d).map(k => `${k},${JSON.stringify(d[k])}`).join('\n');
        return String(d);
      } catch (e) { return String(args.DATA); }
    }

    // --- Type / Symbol / New object ---
    typeof_block(args) {
      const t = args.TYPE;
      if (this.STORAGE.vars[t]) return 'object';
      if (this.STORAGE.customBlocks[t]) return 'custom';
      return typeof t;
    }

    create_symbol() {
      const s = 'sym_' + (Math.random().toString(36).slice(2, 10));
      this.STORAGE.symbols[s] = true;
      return s;
    }

    new_object() { return JSON.stringify({}); }

    // --- Functions / Calls / Construct / Return ---
    call_function(args) {
      const name = args.NAME;
      if (this.STORAGE.functions[name]) {
        this.STORAGE.logs.push('call_function ' + name);
      } else {
        this.STORAGE.logs.push('call_function not found ' + name);
      }
    }

    construct_block(args) {
      try {
        const type = args.TYPE || 'Object';
        const data = (typeof args.DATA === 'string') ? JSON.parse(args.DATA || '{}') : args.DATA;
        return JSON.stringify({ type: type, data: data });
      } catch (e) { return JSON.stringify({ type: args.TYPE, data: args.DATA }); }
    }

    return_block(args) {
      this.STORAGE.__last_return__ = args.VALUE;
    }

    // --- Merge / Clone / Remove / Count ---
    merge_objects(args) {
      try {
        const A = this._tryParseValue(args.A) || {};
        const B = this._tryParseValue(args.B) || {};
        return JSON.stringify(Object.assign({}, A, B));
      } catch (e) { return '{}'; }
    }

    clone_object(args) { return JSON.stringify(this._deepClone(this._tryParseValue(args.OBJ))); }

    remove_key(args) {
      const name = args.OBJ;
      if (this.STORAGE.vars[name] && typeof this.STORAGE.vars[name] === 'object') {
        delete this.STORAGE.vars[name][args.KEY];
      }
    }

    count_keys(args) {
      const obj = this._tryParseValue(args.OBJ);
      if (!obj || typeof obj !== 'object') return 0;
      return Object.keys(obj).length;
    }

    // --- Buffers ---
    buffer_type(args) { return String(args.BUFFER || '32B'); }

    allocate_buffer(args) {
      const bytes = Math.max(1, Math.floor(Number(args.BYTES) || 64));
      const id = 'buf_' + this._genId('buf');
      try {
        this.STORAGE.buffers[id] = new Uint8Array(bytes);
      } catch (e) {
        // environment may not support typed arrays in some VMs; fallback to array
        this.STORAGE.buffers[id] = Array(bytes).fill(0);
      }
      return id;
    }

    read_buffer(args) {
      const id = args.ID;
      const pos = Math.max(0, Math.floor(Number(args.POS) || 0));
      const buf = this.STORAGE.buffers[id];
      if (!buf) return 'undefined';
      if (pos >= buf.length) return 'oob';
      return String(buf[pos]);
    }

    write_buffer(args) {
      const id = args.ID;
      const pos = Math.max(0, Math.floor(Number(args.POS) || 0));
      const val = Math.max(0, Math.min(255, Math.floor(Number(args.VAL) || 0)));
      const buf = this.STORAGE.buffers[id];
      if (!buf) return;
      if (pos < buf.length) {
        try { buf[pos] = val; } catch (e) { /* ignore */ }
      }
    }

    save_into_with_buffer(args) {
      const fmt = (args.FORMAT || 'BIN').toString().toUpperCase();
      const buffer = args.BUFFERCHOICE || '32B';
      const payload = this._convertData(this.STORAGE.vars, fmt);
      this.STORAGE.savedData = '---[FORMAT:' + fmt + ']---\n' + payload + '\n---[BUFFER:' + buffer + ']---';
      this.STORAGE.logs.push('saved_into_buffer');
    }

    // --- Custom blocks ---
    custom_block_hat(args) {
      try {
        const name = String(args.NAME);
        const j = JSON.parse(String(args.JSONTEXT || '{}'));
        this.STORAGE.customBlocks[name] = j;
        this.STORAGE.logs.push('custom registered ' + name);
      } catch (e) { this.STORAGE.logs.push('custom parse error'); }
    }

    call_custom_block(args) {
      const name = args.NAME;
      if (!this.STORAGE.customBlocks[name]) { this.STORAGE.logs.push('call_custom not found ' + name); return; }
      this.STORAGE.logs.push('call_custom ' + name);
    }

    // --- Control flow ---
    while_loop(args, util) {

      const condicion = Scratch.Cast.toBoolean(args.COND);

      if (condicion) {

        util.startBranch(1, true);
        return 1;
      } else {

        util.startBranch(1, false);
        return 0;
      }
    }

    break_block(args, util) { 
      console.log("breaked");
    }

    continue_block() { throw new Error('__serializeext_continue__'); }

    args_reporter(args) {
      try { return this._tryParseValue(args.ARGS); } catch (e) { return args.ARGS; }
    }

    // --- Inspect / log / memory usage ---
    inspect_block(args) {
      const id = args.OBJ;
      const v = this.STORAGE.vars.hasOwnProperty(id) ? this.STORAGE.vars[id] : (this.STORAGE.buffers[id] ? Array.from(this.STORAGE.buffers[id]) : undefined);
      this.STORAGE.vars['__last_inspect__'] = v;
      if (typeof v === 'undefined') return 'undefined';
      return (typeof v === 'object') ? JSON.stringify(v).slice(0, 256) : String(v);
    }

    log_block(args) { this.STORAGE.logs.push(String(args.MSG)); }

    memory_usage() {
      try { return new TextEncoder().encode(JSON.stringify(this.STORAGE.vars)).length; } catch (e) { return 0; }
    }

    basearray(args) {
      const jsonstring = args.array

     const arrayObj = JSON.parse(jsonstring);
            
            // 2. Verificar que el resultado sea un Array.
            if (!Array.isArray(arrayObj)) {
                 return `Error: that block is not array.`;
            }

            return arrayObj.join(', ');

    }

    selecttrig(args) {
     const funciontrigonometrica = args.Menutrig;
     const grados = args.NUM;
     const radianes = grados * (Math.PI / 180);
     const result = 0;

     switch(funciontrigonometrica) {
      case 'sin':
        result = Math.sin(radianes)
        break;
      case 'cos':
        result = Math.cos(radianes)
        break;
      case 'tan':
        result = Math.tan(radianes)
        break;
      case 'sinh':
        result = Math.sinh(radianes)
        break;
      case 'cosh':
        result = Math.cosh(radianes)
        break;
     }
     return result;
    }

    timer() {
      const ahora = new Date();

      const horas = ahora.getHours();
      const minutos = ahora.getMinutes();
      const segundos = ahora.getSeconds();

// 3. Función auxiliar para añadir un cero inicial si es menor que 10 (ej: 05)
        const formato2Digitos = (numero) => {
            return numero.toString().padStart(2, '0');
        };

        // 4. Formatear y devolver el string
        const horaFormateada = `${formato2Digitos(horas)}:${formato2Digitos(minutos)}:${formato2Digitos(segundos)}`;

        return horaFormateada;
    }

    sin(args) {
     const grados = args.Sin;
     const radianes = grados * (Math.PI / 180);

     const result = Math.sin(radianes);

     return parseFloat(result.toFixed(15));
    }

    tan(args) {
     const grados = args.Tan;
     const radianes = grados * (Math.PI / 180);
     const result = Math.tan(radianes);

     return parseFloat(result.toFixed(15));
    }

    sinh(args) {
     const grados = args.Sinh;
     const radianes = grados * (Math.PI / 180);
     const result = Math.sinh(radianes);

     return parseFloat(result.toFixed(15));
    }

     cosh(args) {
     const grados = args.Cosh;
     const radianes = grados * (Math.PI / 180);
     const result = Math.cosh(radianes);

     return parseFloat(result.toFixed(15));
    }

    tanh(args) {
     const grados = args.Tanh;
     const radianes = grados * (Math.PI / 180);
     const result = Math.tanh(radianes);

     return parseFloat(result.toFixed(15));
    }

    cos(args) {
     const grados = args.Cos;
     const radianes = grados * (Math.PI / 180);
     const result = Math.cos(radianes);

     return parseFloat(result.toFixed(15));
    }

    add(args) {
      return Number(args.NUM1) + Number(args.NUM2);
    }

    subtract(args) {
      return Number(args.NUM1s) - Number(args.NUM2s);
    }

    multiply(args) {
      return Number(args.NUM1m) * Number(args.NUM2m);
    }

    divide(args) {
      return Number(args.NUM1d) / Number(args.NUM2d);
    }

    lists(args) {
    this.STORAGE.vars[args.Name] = this._tryParseValue(args.Value);
    }

    True() {
      return true;
    }

    False() {
      return false;
    }

    equalto(args) {
      const number1 = args.NUM1e;
      const number2 = args.NUM2e;

      return number1 === number2;
    }

    majorto(args) {
      const number1 = args.NUM1ma;
      const number2 = args.NUM2ma;

      return number1 > number2;
    }

     minorto(args) {
      const number1 = args.NUM1mi;
      const number2 = args.NUM2mi;

      return number1 < number2;
    }

    ifthen(args, util) {
      const conditionalarg = args.conditional;

      if (conditionalarg) {

       util.startBranch(1, true);
       return 1;
      } else {
        
       util.startBranch(1, false);
       return 0;
      }
    }

    sqrt(args) {
      return Math.sqrt(args.Sqrt);
    }

    loopforever(args, util) {
     return 1;
    }

    Join(args) {
     return String(args.word1) + String(args.word2);
    }

    fetcha(args) {
     return fetch(args.url)
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        console.error(error);
        return 'Uh oh! Something went wrong.';
      });

    }

    and(args) {
      return Scratch.Cast.toBoolean(args.VAL1a) && Scratch.Cast.toBoolean(args.VAL2a);
    }

    or(args) {
      return Scratch.Cast.toBoolean(args.VAL1o) || Scratch.Cast.toBoolean(args.VAL2o);
    }
    not(args) {
      return !Scratch.Cast.toBoolean(args.VALn);
    }
    
    XYpos(args, util) {
      const target = util.target;

      const x = Scratch.Cast.toNumber(args.X);
      const y = Scratch.Cast.toNumber(args.Y);

      target.setXY(x, y);
    }
    
    wait (args) {
    return new Promise((resolve, reject) => {
      const timeInMilliseconds = args.TIME * 1000;
      setTimeout(() => {
        resolve();
      }, timeInMilliseconds);
    });
  }

  degrees(args, util) {
      const degrees = Number(args.DIR);
      const target = util.target;

      // Usamos el método setDirection del target
      const newDirection = target.direction + degrees;
      target.setDirection(newDirection);
  }

  pi() {
   return Math.PI;
  }

  euler() {
   return Math.E;
  }

  phi() {
    return (1 + Math.sqrt(5)) / 2;
  }

  module(args) {
    return Number(args.NUM1mo) % Number(args.NUM2mo);
  }

  lerpcolor(args) {
    const rgb1 = this._parseColor(args.Color1);
            const rgb2 = this._parseColor(args.Color2);
            
            // Tasa de mezcla (0 a 1)
            const t = Scratch.Cast.toNumber(args.AmountColor) / 100;
            const amount = Math.max(0, Math.min(1, t));

            // Función de interpolación lineal (Lerp) para un componente
            const lerp = (a, b, t) => Math.round(a + (b - a) * t);

            const r = lerp(rgb1[0], rgb2[0], amount);
            const g = lerp(rgb1[1], rgb2[1], amount);
            const b = lerp(rgb1[2], rgb2[2], amount);

            // Convierte los componentes RGB al formato HEX
            const toHex = c => c.toString(16).padStart(2, '0').toUpperCase();

            return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  getkey(args) {
    const obj = this._tryParse(args.metadata);
            // Verifica que sea un objeto antes de intentar acceder a la clave
            if (typeof obj === 'object' && obj !== null) {
                return obj[Scratch.Cast.toString(args.key)];
            }
            return '';
  }

  vectorangle(args) {
    const x = Scratch.Cast.toNumber(args.XA);
    const y = Scratch.Cast.toNumber(args.YA);
    return Math.atan2(y, x) * 180 / Math.PI;
  }

  hexcolor(args) {
    const rgb = this._parseColor(args.CH);

    const r = rgb[0]
    const g = rgb[1]
    const b = rgb[2]
    const toHex = c => c.toString(16).padStart(2, '0').toUpperCase();
    return '#' + toHex(r) + toHex(g) + toHex(b);
  }

  isLighter(args) {
    
    // --- Lógica para obtener la Luminosidad (L) del color ---
    const getLightness = (colorHex) => {
        
        let hex = String(colorHex);
        
        // 1. Convertir Hex a RGB (Mismo algoritmo de hexToRgb)
        // Normalizar a 6 dígitos si es necesario (ej. #F00 -> #FF0000)
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        
        const r255 = result ? parseInt(result[1], 16) : 0;
        const g255 = result ? parseInt(result[2], 16) : 0;
        const b255 = result ? parseInt(result[3], 16) : 0;

        // 2. Normalizar RGB a 0-1 (Necesario para la fórmula HSL)
        let r = r255 / 255;
        let g = g255 / 255;
        let b = b255 / 255;
        
        // 3. Convertir RGB (0-1) a HSL (Mismo algoritmo de rgbToHsl)
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        
        // El componente L (Lightness)
        let l = (max + min) / 2;

        // Retornamos el valor L, escalado de 0 a 100
        return l * 100; 
    };

    // --- Ejecutar y Comparar ---
    const lightness1 = getLightness(args.COLOR1);
    const lightness2 = getLightness(args.COLOR2);

    // Comparar las luminosidades
    return lightness1 > lightness2;
}

  nothingstring() {
    return null;
  }

  movesteps(args, util) {
      const steps = Number(args.STEPS);
      const target = util.target; // 'target' es el sprite que ejecuta el bloque

      // El movimiento se calcula usando trigonometría básica
      // (90 - dirección) porque en Scratch 0° es "arriba"
      const radians = (90 - target.direction) * Math.PI / 180;
      const newX = target.x + steps * Math.cos(radians);
      const newY = target.y + steps * Math.sin(radians);

      // Usamos el método setXY del target para moverlo
      target.setXY(newX, newY);
  }

  vectorsum(args) {
    let v1, v2;
    try {
        v1 = JSON.parse(args.VECTOR1);
        v2 = JSON.parse(args.VECTOR2);
    } catch (e) {
        // En un sistema real, deberías manejar mejor el parseo. Aquí asumimos el formato.
        v1 = args.VECTOR1;
        v2 = args.VECTOR2;
    }

    const x1 = v1 && v1.x ? Number(v1.x) : 0;
    const y1 = v1 && v1.y ? Number(v1.y) : 0;
    const x2 = v2 && v2.x ? Number(v2.x) : 0;
    const y2 = v2 && v2.y ? Number(v2.y) : 0;
    
    // Suma de componentes
    return { x: x1 + x2, y: y1 + y2 };
  }

   vectormul(args) {
    let v1, v2;
    try {
        v1 = JSON.parse(args.VECTOR1m);
        v2 = JSON.parse(args.VECTOR2m);
    } catch (e) {
        // En un sistema real, deberías manejar mejor el parseo. Aquí asumimos el formato.
        v1 = args.VECTOR1m;
        v2 = args.VECTOR2m;
    }

    const x1 = v1 && v1.x ? Number(v1.x) : 0;
    const y1 = v1 && v1.y ? Number(v1.y) : 0;
    const x2 = v2 && v2.x ? Number(v2.x) : 0;
    const y2 = v2 && v2.y ? Number(v2.y) : 0;
    
    // Suma de componentes
    return { x: x1 * x2, y: y1 * y2 };
  }

  vectorsub(args) {
    let v1, v2;
    try {
        v1 = JSON.parse(args.VECTOR1s);
        v2 = JSON.parse(args.VECTOR2s);
    } catch (e) {
        // En un sistema real, deberías manejar mejor el parseo. Aquí asumimos el formato.
        v1 = args.VECTOR1s;
        v2 = args.VECTOR2s;
    }

    const x1 = v1 && v1.x ? Number(v1.x) : 0;
    const y1 = v1 && v1.y ? Number(v1.y) : 0;
    const x2 = v2 && v2.x ? Number(v2.x) : 0;
    const y2 = v2 && v2.y ? Number(v2.y) : 0;
    
    // Suma de componentes
    return { x: x1 - x2, y: y1 - y2 };
  }

  vectordiv(args) {
    let v1, v2;
    try {
        v1 = JSON.parse(args.VECTOR1d);
        v2 = JSON.parse(args.VECTOR2d);
    } catch (e) {
        // En un sistema real, deberías manejar mejor el parseo. Aquí asumimos el formato.
        v1 = args.VECTOR1d;
        v2 = args.VECTOR2d;
    }

    const x1 = v1 && v1.x ? Number(v1.x) : 0;
    const y1 = v1 && v1.y ? Number(v1.y) : 0;
    const x2 = v2 && v2.x ? Number(v2.x) : 0;
    const y2 = v2 && v2.y ? Number(v2.y) : 0;
    
    // Suma de componentes
    return { x: x1 / x2, y: y1 / y2 };
  }

  vectorToArray(args) {
    let vec;
    try {
        vec = JSON.parse(args.VECTOR);
    } catch (e) {
        vec = args.VECTOR;
    }
    
    const x = vec && vec.x ? Number(vec.x) : 0;
    const y = vec && vec.y ? Number(vec.y) : 0;
    
    // Formatea el vector como una cadena legible (X, Y)
    return `[${x}, ${y}]`;
  }

  tothis(args) {
     const v = this.STORAGE.vars[args.buildername];
      if (typeof v === 'undefined') return '';
      return (typeof v === 'object') ? JSON.stringify(v) : String(v);
  }

  floordiv(args) {
   return Math.floor(args.NUM1fd / args.NUM2fd);
  }

  posX(args, util) {
    const target = util.target;
    return String(target.x);
  }

  posY(args, util) {
    const target = util.target;
    return String(target.y);
  }
  
  tostring(args) {
    return String(args.text1s);
  }

  tonumber(args) {
    return Number(args.text1n);
  }

  toboolean(args) {
    return Boolean(args.text1b);
  }

  jmp() {
    return "\n";
  }
  label() {
    return;
  }

  repeatXTimes(args, util) {
    // 1. Obtener la información de estado del bucle desde el hilo de Scratch
    const frame = util.stackFrame;
    const limit = Number(args.TIMES);
    if (typeof frame.counter === 'undefined') {
        frame.counter = 0;
    }
    if (frame.counter < limit) {
        frame.counter++; 
        return 1; 

    } else {
        delete frame.counter;
        return; 
    }
}

  fixnumber(args) {
    return Math.floor(args.NUMfix);
  }

  branch(args) {
    if (args.menubranch == "true") {
      return 1;
    }

    if (args.menubranch == "false") {
      return 0;
    }
  }

  xor(args) {
    return args.VAL1x !== args.VAL2x;
  }

  nor(args) {
    return !(args.VAL1no || args.VAL2no);
  }

   xnor(args) {
    return !((args.VAL1xn || args.VAL2xn) && !(args.VAL1xn && args.VAL2xn));
  }

  negNumber(args) {
    return args.NUMneg * -1
  }

  pownumber(args) {
    return Math.pow(args.NUM1pow, args.NUM2pow);
  }
  
  setsize(args, util) {
    const newSize = args.SIZE;

    util.target.setSize(newSize);
  }

  lastkey(args, util) {
    return util.runtime.ioDevices.keyboard.lastKeyPressed || '';
  }

  showsprite(args, util) {
    const target = util.target

    target.setVisible(true);
  }

  hidesprite(args, util) {
    const target = util.target

    target.setVisible(false);
  }

  angle(args, util) {
    const target = util.target;

    target.setDirection(args.ANGL);
  }

  Direction(args, util) {
    const target = util.target

    return target.direction;
  }

  changesize(args, util) {
    const target = util.target;
    
    const sizeChange = Number(args.SIZEc) || 0;
    
    const newSize = target.size + sizeChange;
    
        target.setSize(newSize);
  }

  viewsize(args, util) {
     const target = util.target;

     return Math.floor(target.size);
  }

  whenboolean(args) {
     return args.InputBoolean;
  }

  setReturnValue(args) {
    // Establece el valor que el reportero debe devolver más tarde
    this._returnValue = args.VALUEr; 
}

myReporterFunc(args, util) {
    const result = this._returnValue;

    if (result !== 0) {
        this._returnValue = 0; 
        return result; 
    }
    
    // Si no hay interrupción, devuelve un valor que NO sea 0.
    // Una cadena vacía es más clara si el valor esperado es texto.
    return ''; // ⬅️ Devuelve cadena vacía (o "ERROR") si el comando no ha actuado.
}
  
   print(args) {
    this._console = this._console + args.inputprint + '\n'
   }

   console() {
    return this._console;
   }

   switcacase(args) {
    this._STACKvalue = args.whenswitch;
    return 1;
   }

   casein(args) {
    const caseresult = this._STACKvalue;

    if (caseresult === args.inputtext) {
      this._STACKOUT = 'TRUE';
      return 1;
    } else {
      this._STACKOUT = 'FALSE';
      return 0;
    }
   }

   say(args, util) {
    const text = String(args.texttosay);

    util.runtime.emit('SAY', util.target, 'say', text);
   }

   alwayshat() {
    return true;
   }

   cbrt(args) {
    return Math.cbrt(args.Cbrt);
   }

   getidxlist(args) {
    let listData = args.listarray;
        let index = Number(args.idxlist);
        
        // Intenta convertir la entrada a un Array si es una cadena JSON
        let array;
        try { array = JSON.parse(listData); } catch (e) { array = []; }

        if (!Array.isArray(array)) { return ''; } // Si no es un Array, no puede funcionar

        // Se usa índice 0-basado de JavaScript
        if (index >= 0 && index < array.length) {
            return array[index];
        }
        return '';
   }

   trytodo(args, util) {
    const frame = util.stackFrame;
    const errorSignal = 'TRY_CATCH_ERROR_SIGNAL'; // Mensaje único para detectar el error

    // Asegurarse de que el objeto STORAGE y logs existen, si no, fallar silenciosamente.
    if (!this.STORAGE || !Array.isArray(this.STORAGE.logs)) {
        // Si no hay logs o STORAGE, solo ejecutamos la Rama 1 y terminamos.
        util.startBranch(1, true); 
        return; 
    }

    // --- PASO 1: INTENTAR (TRY) ---
    if (!frame.triedBranch) {
        
        // 1.1 Limpiar o marcar la posición del log antes de la ejecución.
        // Usaremos la longitud actual de los logs como punto de partida.
        frame.logStartIndex = this.STORAGE.logs.length; 

        // 1.2 Marcar el estado: Ya vamos a intentar la Rama 1.
        frame.triedBranch = true; 
        
        // 1.3 Iniciar la Rama 1 (%1).
        util.startBranch(1, true); 
        
        // 1.4 Devolver el control a la VM.
    }
    
    // --- PASO 2: VERIFICAR Y CAPTURAR (CATCH) ---
    
    let errorOccurred = false;

    // 2.1 Verificar si el mensaje de error fue escrito en el log durante la Rama 1.
    // Buscamos el mensaje único de señalización desde el punto donde empezamos la rama.
    for (let i = frame.logStartIndex; i < this.STORAGE.logs.length; i++) {
        if (this.STORAGE.logs[i] === errorSignal) {
            errorOccurred = true;
            // Opcional: Eliminar la señal de error del log una vez capturado.
            this.STORAGE.logs.splice(i, 1); 
            break;
        }
    }

    if (errorOccurred) {
        // 2.2 Hubo un error, ejecutar la Rama 2 (%2, el "Catch").
        util.startBranch(2, true);

        // 2.3 Devolver el control para que la VM ejecute la Rama 2.
        return util.context.requestThread(thread);
    } 
    
    // 3. Si no hubo error, el bloque termina.
    return;

   }

   new_class(args) {
    const classNAME = args.nameclass;
    const defclass = {
      methods: {},
      properties: {},
    };

    this._currentBuildingClass = classNAME;

    this.STORAGE.classes[classNAME] = defclass;
   }

   Methods(args, codeBody) {
    const methodName = args.NAME;
    const methodArgs = args.ARGS ? args.ARGS.split(',').map(a => a.trim()) : [];

    // ¡CRUCIAL! Se asegura de que se haya ejecutado el comando 'define class' antes
    if (!this._currentBuildingClass) {
        this.STORAGE.logs.push('TypeError: method is not precise as expected');
        return;
    }

    const className = this._currentBuildingClass;
    
    // 1. Guardar la definición del método en la clase actualmente activa.
    this.STORAGE.classes[className].methods[methodName] = {
        argsmethod: methodArgs,
        body: codeBody // El código del método se guarda aquí para ejecución futura
    };
    
    // Opcionalmente, puedes mover el "limpiar el estado" al final de todos los métodos
    // o introducir un bloque 'end class' para mayor claridad.
    
    this.STORAGE.logs.push(`Method ${className}.${methodName} created.`);
   }

   argmethod(args) {
    return this.STORAGE.classes[args.NAME].methods[args.NAME1].argsmethod;
   }

   createmap(args) {
    const Namemap = args.NAMEmap;
    const definitionmap = {
      items: [],
    }

    this.STORAGE.listmaps[Namemap] = definitionmap;
   }

   createitem(args) {
    const Namemaps = args.mapname;
    const Nameitem = args.Valueitem;

    this.STORAGE.listmaps[Namemaps].items.push(String(Nameitem));
   }

   lengthmap(args) {
    return this.STORAGE.listmaps[args.maplist].items.length;
   }

   itemofmap(args) {
    return this.STORAGE.listmaps[args.mapitem].items[Number(args.idxitem)];
   }

   idx2item4map(args) {
    const items2idx = this.STORAGE.listmaps[args.mapidx].items;

    if (items2idx.indexOf(args.idxmapitem) !== -1 ) {
      return items2idx.indexOf(args.idxmapitem);
    } else {
      return 'TypeError: [i] undefined item in the map'
    }
   }

   itemexists(args) {
    const itemscheck = this.STORAGE.listmaps[args.mapdef].items;

    return itemscheck.includes(args.existsitem);
   }

   deleteitem(args) {
    const Namemapsd = args.mapnamed;
    const Nameitemd = args.Valueitemd;

    this.STORAGE.listmaps[Namemapsd].items.splice(Number(Nameitemd));
   }

   reterror() {
    return '► TypeError TA';
   }

   mousex(args, util) {
    const mousex = util.runtime.ioDevices.mouse;

    return mousex._scratchX;
   }

   mousey(args, util) {
    const mousey = util.runtime.ioDevices.mouse;

    return mousey._scratchY;
   }

   mouseisdown(args, util) {
    const mousedown = util.runtime.ioDevices.mouse;

    return mousedown._isDown;
   }

   json_keys(args) {
    const arrays = Array(args.Inputkeys);
    const iterator = arrays.keys()

    return iterator;
   }

   json_values(args) {
    const arrays = Array(args.Inputvalues);
    const iterator = arrays.values()

    return iterator;
   }

   arequire(args) {
    this.STORAGE.appEnum[args.textreq] = this._tryParseValue(args.required);
    return "ƒ <saved>";
   }

   torequire(args) {
    return this.STORAGE.appEnum[args.textreq1];
   }

   Xpos(args, util) {
    const target = util.target;

    target.setXY(args.Xp, target.y);
   }

    Ypos(args, util) {
    const target = util.target;

    target.setXY(target.x, args.Yp);
   }
   
   scostume(args, util) {
    const target = util.target;

    const costume = args.COSTUME;

    target.setCostume(costume);
   }

   adefault() {
    const out = this._STACKOUT;

    if (out == 'FALSE') {
      return 1;
    } else {
      return 0;
    }
   }

   renderText(args) {
    // 1. Crear o encontrar el elemento de texto específico (por ejemplo, usando un ID)
    let textElement = document.getElementById('my-turbowarp-text');
    if (!textElement) {
        textElement = document.createElement('div');
        textElement.id = 'my-turbowarp-text';
        // Aplicar estilos básicos
        textElement.style.position = 'absolute'; // Necesario para posicionamiento
        textElement.style.color = 'white';
        textElement.style.fontSize = '24px';
        textElement.style.pointerEvents = 'none'; // Para que no interfiera con clics del stage

        // Añadirlo al DOM (Generalmente al contenedor principal del stage)
        // Esto varía, pero un buen lugar es dentro de un contenedor que ya esté
        // sobre el canvas de Scratch, que puede que tengas que identificar
        // o crear en la inicialización.
        // Ejemplo: document.querySelector('.stage-container').appendChild(textElement);
    }

    // 2. Aplicar el contenido y la posición
    textElement.textContent = args.TEXT;

    // Convertir coordenadas Scratch (-240 a 240, -180 a 180) a coordenadas de píxeles del stage
    const stageWidth = 480; // Ancho estándar del stage
    const stageHeight = 360; // Alto estándar del stage
    const pixelX = (args.X / stageWidth * stageWidth) + (stageWidth / 2); 
    const pixelY = (args.Y * -1) + (stageHeight / 2); // 'Y' está invertida y se centra

    textElement.style.left = `${pixelX}px`;
    textElement.style.top = `${pixelY}px`;

    // **Nota sobre this.STORAGE:** Puedes usar this.STORAGE para guardar 
    // una referencia al elemento si tienes varios textos:
    // this.STORAGE.savedData['textElementRef'] = textElement;
}
  } // end class
  Scratch.extensions.register(new TA());
})(Scratch);
