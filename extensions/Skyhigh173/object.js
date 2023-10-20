(function (Scratch) {
  'use strict';

  // JSON can't be displayed properly
  // but Map can!
  // when saved to project, it will be converted to JSON string
  // we modify toString() to use it as string
  class ObjMap extends Map {
    static reviver(key, value) {
      if (value instanceof Array || value instanceof Object) return new ObjMap(Object.entries(value));
      return value;
    }
    toString() {
      return JSON.stringify(this.toJSON());
    }
    toJSON() {
      return Object.fromEntries(this);
    }
    static fromAny(value) {
      if (value instanceof ObjMap) return value;
      try {
        const map = JSON.parse(value, ObjMap.reviver);
        if (map instanceof ObjMap) return map;
      } catch {
        // ignore
      }
      return ObjMap.emptyMap;
    }
    static toMapOrString(value) {
      if (value instanceof ObjMap) return value;
      if (value instanceof Boolean || value instanceof Number) return value;
      try {
        return new ObjMap(Object.entries(JSON.parse(value)));
      } catch {
        return value;
      }
    }
    static fromArray(arr) {
      return new ObjMap(Object.entries(arr));
    }
    static get emptyMap() {
      return new ObjMap();
    }
  }

  const exampleJSON = {
    empty: '{}',
    keyValue: '{"key":"value"}',
    keyValue2: '{"key2":"value2"}',
    double: '{"apple":"banana","one":"two"}',
    array: '{"0":"a","1":"b","2":"c"}'
  };

  class ObjectExtension {
    getInfo() {
      return {
        id: 'skyhigh173object',
        name: 'Object',
        color1: '#9999FF',
        blocks: [
          {
            opcode: 'newObject',
            blockType: Scratch.BlockType.REPORTER,
            text: 'new Object',
            disableMonitor: true
          },
          {
            opcode: 'toJSON',
            blockType: Scratch.BlockType.REPORTER,
            text: '[obj] to JSON',
            arguments: {
              obj: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: exampleJSON.keyValue
              }
            }
          },
          {
            opcode: 'toMap',
            blockType: Scratch.BlockType.REPORTER,
            text: '[obj] to Object',
            arguments: {
              obj: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: exampleJSON.keyValue
              }
            }
          },
          {
            opcode: 'toArray',
            blockType: Scratch.BlockType.REPORTER,
            text: '[obj] to Array',
            arguments: {
              obj: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: exampleJSON.array
              }
            }
          },
          '---',
          {
            opcode: 'set',
            blockType: Scratch.BlockType.REPORTER,
            text: '[obj] set [key] to value [value]',
            arguments: {
              obj: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: exampleJSON.empty
              },
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'key'
              },
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'value'
              },
            }
          },
          {
            opcode: 'get',
            blockType: Scratch.BlockType.REPORTER,
            text: '[obj] get [key]',
            arguments: {
              obj: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: exampleJSON.keyValue
              },
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'key'
              }
            }
          },
          {
            opcode: 'delete',
            blockType: Scratch.BlockType.REPORTER,
            text: '[obj] delete [key]',
            arguments: {
              obj: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: exampleJSON.keyValue
              },
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'key'
              }
            }
          },
          '---',
          {
            opcode: 'length',
            blockType: Scratch.BlockType.REPORTER,
            text: 'length of [obj]',
            arguments: {
              obj: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: exampleJSON.empty
              }
            }
          },
          {
            opcode: 'has',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[obj] has [key]?',
            arguments: {
              obj: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: exampleJSON.keyValue
              },
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'key'
              }
            }
          },
          {
            opcode: 'merge',
            blockType: Scratch.BlockType.REPORTER,
            text: 'merge [obj1] [obj2]',
            arguments: {
              obj1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: exampleJSON.keyValue
              },
              obj2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: exampleJSON.keyValue2
              }
            }
          },
          {
            opcode: 'itemFromTo',
            blockType: Scratch.BlockType.REPORTER,
            text: 'key index [a] to [b] in [obj]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              },
              obj: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: exampleJSON.array
              }
            }
          },
          '---',
          {
            opcode: 'indexOf',
            blockType: Scratch.BlockType.REPORTER,
            text: 'index of [key] in [obj]',
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'one'
              },
              obj: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: exampleJSON.double
              }
            }
          },
          {
            opcode: 'getWhole',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get whole object from [key] in [obj]',
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'one'
              },
              obj: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: exampleJSON.double
              }
            }
          },
          '---',
          {
            opcode: 'keys',
            blockType: Scratch.BlockType.REPORTER,
            text: 'keys of [obj]',
            arguments: {
              obj: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: exampleJSON.keyValue
              }
            }
          },
          {
            opcode: 'values',
            blockType: Scratch.BlockType.REPORTER,
            text: 'values of [obj]',
            arguments: {
              obj: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: exampleJSON.keyValue
              }
            }
          },
          {
            opcode: 'entries',
            blockType: Scratch.BlockType.REPORTER,
            text: 'entries of [obj]',
            arguments: {
              obj: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: exampleJSON.keyValue
              }
            }
          },
          '---',
          {
            opcode: 'isObject',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is [obj] object?',
            arguments: {
              obj: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ' '
              }
            }
          },
          '---',
          {
            opcode: 'listAsObject',
            blockType: Scratch.BlockType.REPORTER,
            text: 'list [list] as object',
            arguments: {
              list: {
                type: Scratch.ArgumentType.STRING,
                menu: 'list'
              }
            }
          },
          {
            opcode: 'setListAsObject',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set list [list] to object [obj]',
            arguments: {
              list: {
                type: Scratch.ArgumentType.STRING,
                menu: 'list'
              },
              obj: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: exampleJSON.array
              }
            }
          },
        ],
        menus: {
          list: {
            acceptReporters: true,
            items: 'getLists'
          }
        }
      };
    }

    getLists () {
      const globalLists = Object.values(Scratch.vm.runtime.getTargetForStage().variables).filter(x => x.type == 'list');
      const localLists = Object.values(Scratch.vm.editingTarget.variables).filter(x => x.type == 'list');
      const uniqueLists = [...new Set([...globalLists, ...localLists])];
      if (uniqueLists.length === 0) {
        return [
          {
            text: 'select a list',
            value: 'select a list'
          }
        ];
      }
      return uniqueLists.map(i => ({
        text: i.name,
        value: i.id
      }));
    }

    getScratchLists(util) {
      const globalLists = Object.values(Scratch.vm.runtime.getTargetForStage().variables).filter(x => x.type == 'list');
      const localLists = Object.values(util.target.variables).filter(x => x.type == 'list');
      const uniqueLists = [...new Set([...globalLists, ...localLists])];
      return uniqueLists.map(i => ({
        text: i.name,
        value: i.id
      }));
    }

    newObject() {
      return new ObjMap();
    }

    toJSON(args) {
      return JSON.stringify(ObjMap.fromAny(args.obj));
    }

    toMap(args) {
      return ObjMap.fromAny(args.obj);
    }

    _toArray(obj) {
      return Array.from(obj.values());
    }

    toArray(args) {
      return JSON.stringify(this._toArray(ObjMap.fromAny(args.obj)));
    }

    set(args) {
      let value = ObjMap.toMapOrString(args.value);
      return ObjMap.fromAny(args.obj).set(Scratch.Cast.toString(args.key), value);
    }

    get(args) {
      return ObjMap.fromAny(args.obj).get(Scratch.Cast.toString(args.key)) ?? '';
    }

    delete(args) {
      let obj = ObjMap.fromAny(args.obj);
      obj.delete(args.key);
      return obj;
    }

    length(args) {
      return ObjMap.fromAny(args.obj).size;
    }

    has(args) {
      return ObjMap.fromAny(args.obj).has(args.key);
    }

    merge(args) {
      return new ObjMap([...ObjMap.fromAny(args.obj1), ...ObjMap.fromAny(args.obj2)]);
    }

    isObject(args) {
      return args.obj instanceof ObjMap;
    }

    keys(args) {
      return ObjMap.fromArray([...ObjMap.fromAny(args.obj).keys()]);
    }

    values(args) {
      return  ObjMap.fromArray([...ObjMap.fromAny(args.obj).values()]);
    }

    entries(args) {
      // currently O(n) time
      const obj = ObjMap.fromAny(args.obj);
      return new ObjMap(Object.entries([...obj.entries()].map(x => ObjMap.emptyMap.set(x[0],x[1]))));
    }

    // from json extension
    listAsObject({ list }, util) {
      try {
        let listVariable = util.target.lookupVariableById(list);
        if (listVariable == undefined) {
          listVariable = this.getListsID(util).find(x => x.text === list).value;
          listVariable = util.target.lookupVariableById(listVariable);
        }

        if (listVariable && listVariable.type === 'list') {
          return ObjMap.fromArray(listVariable.value);
        }
      } catch (e) {
        // ignore
      }
      return '';
    }

    setListAsObject({ list, obj }, util) {
      try {
        let listVariable = util.target.lookupVariableById(list);

        if (listVariable == undefined) {
          listVariable = this.getListsID(util).find(x => x.text === list).value;
          listVariable = util.target.lookupVariableById(listVariable);
        }

        if (listVariable && listVariable.type === 'list') {
          listVariable.value = this._toArray(ObjMap.fromAny(obj));
        }
      } catch (e) {
        // ignore
      }
    }

    itemFromTo(args) {
      const obj = ObjMap.fromAny(args.obj);
      args.b++; // inclusive slice
      return new ObjMap([...obj.entries()].slice(args.a < 0 ? args.a + obj.size() : args.a, args.b <= 0 ? args.b + obj.size : args.b));
    }

    indexOf(args) {
      return [...ObjMap.fromAny(args.obj).keys()].indexOf(Scratch.Cast.toString(args.key));
    }

    getWhole(args) {
      const key = Scratch.Cast.toString(args.key);
      const obj = ObjMap.fromAny(args.obj);
      if (!obj.has(key)) return ObjMap.emptyMap;
      return new ObjMap().set(key, obj.get(key));
    }
  }

  Scratch.extensions.register(new ObjectExtension());
})(Scratch);
