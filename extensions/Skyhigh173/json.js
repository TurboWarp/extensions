(function(Scratch) {
  'use strict';
  /*
  * JSON extension v2.5 by skyhigh173 (English Version)
  * Do not remove this comment
  */

  const vm = Scratch.vm;
  const hasOwn = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property);

  const makeLabel = (text) => ({
    blockType: 'label',
    text: text
  });

  /* utils for ss */
  function reverseList(arr) {
    const copy = structuredClone(arr);
    copy.reverse();
    return copy;
  }
  /* end utils for ss */

  class JSONS {
    getInfo() {
      return {
        id: 'skyhigh173JSON',
        name: 'JSON',
        color1: '#3271D0',
        blocks: [
          makeLabel('General Utils'),
          {
            opcode: 'json_is_valid',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is JSON [json] valid',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value"}'
              }
            }
          },
          {
            opcode: 'json_is',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is [json] [types]',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value"}'
              },
              types: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Object',
                menu: 'types'
              },
            }
          },
          '---',
          {
            opcode: 'json_get_all',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get all [Stype] of [json]',
            arguments: {
              Stype: {
                type: Scratch.ArgumentType.STRING,
                menu: 'get_all'
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value","key2":"value2"}'
              }
            }
          },
          {
            opcode: 'json_new',
            blockType: Scratch.BlockType.REPORTER,
            text: 'new [json]',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Object',
                menu: 'types'
              }
            }
          },
          '---',
          {
            opcode: 'json_has_key',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[json] contains key [key]?',
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'key2'
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value"}'
              }
            }
          },
          {
            opcode: 'json_has_value',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[json] contains value [value]?',
            arguments: {
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'scratch'
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["TurboWarp","scratch"]'
              }
            }
          },
          {
            opcode: 'json_equal',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[json1] [equal] [json2]',
            arguments: {
              json1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"a":0,"b":1}'
              },
              json2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"b":1,"a":0}'
              },
              equal: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '=',
                menu: 'equal'
              }
            }
          },
          makeLabel('JSON Strings'),
          {
            opcode: 'json_jlength',
            blockType: Scratch.BlockType.REPORTER,
            text: 'length of json [json]',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value","key2":"value2"}'
              }
            }
          },
          {
            opcode: 'json_get',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get [item] in [json]',
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'key'
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value"}'
              }
            }
          },
          {
            opcode: 'json_set',
            blockType: Scratch.BlockType.REPORTER,
            text: 'set [item] to [value] in [json]',
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'key'
              },
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'new value'
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value"}'
              }
            }
          },
          {
            opcode: 'json_delete',
            blockType: Scratch.BlockType.REPORTER,
            text: 'delete [item] in [json]',
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'key2'
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value","key2":"value2"}'
              }
            }
          },
          makeLabel('Array'),
          {
            opcode: 'json_length',
            blockType: Scratch.BlockType.REPORTER,
            text: 'length of array [json]',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[1,2,3]'
              }
            }
          },
          {
            opcode: 'json_array_get',
            blockType: Scratch.BlockType.REPORTER,
            text: 'item [item] of array [json]',
            arguments: {
              item: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["scratch","TurboWarp"]'
              }
            }
          },
          {
            opcode: 'json_array_push',
            blockType: Scratch.BlockType.REPORTER,
            text: 'add [item] to array [json]',
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'TurboWarp'
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["scratch"]'
              }
            }
          },
          {
            opcode: 'json_array_set',
            blockType: Scratch.BlockType.REPORTER,
            text: 'replace item [pos] of [json] to [item]',
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'fav'
              },
              pos: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["love","heart","follow"]'
              }
            }
          },
          {
            opcode: 'json_array_insert',
            blockType: Scratch.BlockType.REPORTER,
            text: 'insert [item] at [pos] of array [json]',
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'fav'
              },
              pos: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["love","follow"]'
              }
            }
          },
          '---',
          {
            opcode: 'json_array_delete',
            blockType: Scratch.BlockType.REPORTER,
            text: 'delete item [item] of array [json]',
            arguments: {
              item: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["scratch","a","TurboWarp"]'
              }
            }
          },
          {
            opcode: 'json_array_remove_all',
            blockType: Scratch.BlockType.REPORTER,
            text: 'delete all [item] in array [json]',
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'a'
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["scratch","a","TurboWarp","a","a"]'
              }
            }
          },
          '---',
          {
            opcode: 'json_array_itemH',
            blockType: Scratch.BlockType.REPORTER,
            text: 'item # of [item] in array [json]',
            arguments: {
              item: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'scratch'
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["scratch","TurboWarp"]'
              }
            }
          },
          makeLabel('Advanced'),
          {
            opcode: 'json_array_from',
            blockType: Scratch.BlockType.REPORTER,
            text: 'array from text [json]',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'abcd'
              }
            }
          },
          {
            opcode: 'json_array_fromto',
            blockType: Scratch.BlockType.REPORTER,
            text: 'array [json] from item [item] to [item2]',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[1,2,3,4]'
              },
              item: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              },
              item2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3
              }
            }
          },
          {
            opcode: 'json_array_reverse',
            blockType: Scratch.BlockType.REPORTER,
            text: 'reverse array [json]',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["a","b","c","d","e","f"]'
              }
            }
          },
          {
            opcode: 'json_array_flat',
            blockType: Scratch.BlockType.REPORTER,
            text: 'flat array [json] by depth [depth]',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[[1],2,[3,4],[5,[6]]]'
              },
              depth: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              }
            }
          },
          {
            opcode: 'json_array_concat',
            blockType: Scratch.BlockType.REPORTER,
            text: 'array concat [json] [json2]',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["a","b"]'
              },
              json2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["c","d"]'
              }
            }
          },
          {
            opcode: 'json_array_filter',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get all value with key [key] in array [json]',
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'id'
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[{"id":12},{"id":24}]'
              }
            }
          },
          {
            opcode: 'json_array_setlen',
            blockType: Scratch.BlockType.REPORTER,
            text: 'set length of array [json] to [len]',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["a","b","c"]'
              },
              len: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              }
            }
          },
          '---',
          {
            opcode: 'json_array_create',
            blockType: Scratch.BlockType.REPORTER,
            text: 'create array by [text] with delimiter [d]',
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'a,b,c'
              },
              d: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ','
              }
            }
          },
          {
            opcode: 'json_array_join',
            blockType: Scratch.BlockType.REPORTER,
            text: 'join string by array [json] with delimiter [d]',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["a","b","c"]'
              },
              d: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ','
              }
            }
          },
          '---',
          //sorting blocked added by 0znzw.
          {
            opcode: 'ss_sort',
            blockType: Scratch.BlockType.REPORTER,
            text: 'sort numbers in array [list] with [method] sort and return in [order] order',
            disableMonitor: true,
            arguments: {
                method: {
                    type: Scratch.ArgumentType.STRING,
                    menu: 'ss_sort_methods'
                },
                list: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: '[5.23, 214, 522, 61, 5.24, 62.2, 1, 51212, 0, 0]'
                },
                order: {
                    type: Scratch.ArgumentType.STRING,
                    menu: 'ss_sort_order'
                }
            }
          },
          {
            opcode: 'ss_sortA',
            blockType: Scratch.BlockType.REPORTER,
            text: 'sort words in array [list] alphabetically and return in [order] order',
            disableMonitor: true,
            arguments: {
                list: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: '["d","b","c","y","a"]'
                },
                order: {
                    type: Scratch.ArgumentType.STRING,
                    menu: 'ss_sort_order'
                }
            }
          },
          //end ss
          '---',
          makeLabel('Lists'),
          {
            opcode: 'json_vm_getlist',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get list [list] as array',
            arguments: {
              list: {
                type: Scratch.ArgumentType.STRING,
                menu: 'get_list'
              },
            }
          },
          {
            opcode: 'json_vm_setlist',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set list [list] to content [json]',
            arguments: {
              list: {
                type: Scratch.ArgumentType.STRING,
                menu: 'get_list'
              },
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["apple","banana"]'
              },
            }
          },
        ],
        menus: {
          get_all: {
            items: ['keys','values','datas']
          },
          get_list: {
            acceptReporters: true,
            items: 'getLists'
          },
          types: {
            acceptReporters: true,
            items: ['Object', 'Array']
          },
          equal: {
            acceptReporters: true,
            items: ['=','≠']
          },
          //menus used by ss
          ss_sort_methods: {
            items: ['quick','bubble','selection','insertion','merge','heap','counting','shell','bogo'],
            acceptReporters: true
          },
          ss_sort_order: {
            items: ['ascending','descending'],
            acceptReporters: true
          }
        }
      };
    }

    getLists () {
      const globalLists = Object.values(vm.runtime.getTargetForStage().variables).filter(x => x.type == 'list');
      const localLists = Object.values(vm.editingTarget.variables).filter(x => x.type == 'list');
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

    lookupList(list, util) {
      const byId = util.target.lookupVariableById(list);
      if (byId && byId.type === 'list') {
        return byId;
      }
      const byName = util.target.lookupVariableByNameAndType(list, 'list');
      if (byName) {
        return byName;
      }
      return null;
    }

    json_is_valid({ json }) {
      if (typeof json != 'string') {
        return false;
      } else if ((json.slice(0,1) != '[' || json.slice(-1) != ']') && (json.slice(0,1) != '{' || json.slice(-1) != '}')) {
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
    json_valid_return(json){
      if (typeof json != 'string') {
        return json;
      } else if ((json.slice(0,1) != '[' || json.slice(-1) != ']') && (json.slice(0,1) != '{' || json.slice(-1) != '}')) {
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
      if (!this.json_is_valid({json: json})) return false;
      try {
        json = JSON.parse(json);
        switch (types) {
        case 'Object': return !Array.isArray(json);
        case 'Array': return Array.isArray(json);
        default: return false;
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
        return ' ';
      }
    }

    json_new({ json }) {
      switch (json) {
      case 'Object': return '{}';
      case 'Array': return '[]';
      default: return '';
      }
    }

    json_has_key({ json, key }) {
      try {
        return this._fixInvalidJSONValues(this.json_valid_return(key)) in JSON.parse(json);
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
        const result = keys1.length === keys2.length && Object.keys(json1).every(key=>json1[key] === json2[key]);
        if (equal === '=') return result;
        if (equal === '≠') return !result;
      } catch {
        // ignore
      }
      return false;
    }


    json_get_all({ Stype,json }) {
      try {
        json = JSON.parse(json);
        switch (Stype) {
        case 'keys':
          return JSON.stringify(Object.keys(json).map(key => key));
        case 'values':
          return JSON.stringify(Object.keys(json).map(key => json[key]));
        case 'datas':
          return JSON.stringify(Object.keys(json).map(key => [key, json[key]]));
        default: return '';
        }
      } catch {
        return '';
      }
    }

    json_get({ item, json }) {
      try {
        json = JSON.parse(json);
        if (hasOwn(json, item)) {
          const result = json[item];
          if (typeof result === 'object') {
            return JSON.stringify(result);
          } else {
            return result;
          }
        }
      } catch {
        // ignore
      }
      return '';
    }

    _fixInvalidJSONValues(value) {
      // JSON does not support these values, so convert to string.
      if (Number.isNaN(value)) return 'NaN';
      if (value === Infinity) return 'Infinity';
      if (value === -Infinity) return '-Infinity';
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
        return '';
      }
    }

    json_delete({ item, json }) {
      try {
        json = JSON.parse(json);
        delete json[item];
        return JSON.stringify(json);
      } catch {
        return '';
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
        if (item == 0) return '';
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
        if (typeof result == 'object') {
          return JSON.stringify(result);
        } else {
          return result;
        }
      } catch {
        return '';
      }
    }

    json_array_itemH({ item, json }) {
      try {
        json = JSON.parse(json);
        item = this._fixInvalidJSONValues(this.json_valid_return(item));
        let result = JSON.stringify(json.indexOf(item) + 1);
        return result;
      } catch {
        return '';
      }
    }

    json_array_from({ json }) {
      try {
        return JSON.stringify(Array.from(String(json)));
      } catch {
        return '';
      }
    }

    json_array_concat({ json, json2 }) {
      try {
        json = JSON.parse(json);
        json2 = JSON.parse(json2);
        return JSON.stringify(json.concat(json2));
      } catch {
        return '';
      }
    }

    json_array_push({ item, json }) {
      try {
        json = JSON.parse(json);
        item = this._fixInvalidJSONValues(this.json_valid_return(item));
        json.push(item);
        return JSON.stringify(json);
      } catch {
        return '';
      }
    }

    json_array_insert({ item, pos, json }) {
      try {
        json = JSON.parse(json);
        item = this._fixInvalidJSONValues(this.json_valid_return(item));
        json.splice(pos - 1, 0, item);
        return JSON.stringify(json);
      } catch {
        return '';
      }
    }

    json_array_set({ item, pos, json }) {
      try {
        json = JSON.parse(json);
        json[pos - 1] = this._fixInvalidJSONValues(this.json_valid_return(item));
        return JSON.stringify(json);
      } catch {
        return '';
      }
    }

    json_array_delete({ item, json }) {
      try {
        json = JSON.parse(json);
        json.splice(item - 1, 1);
        return JSON.stringify(json);
      } catch {
        return '';
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
        return '';
      }
    }

    json_array_fromto({ json, item, item2 }) {
      try {
        return JSON.stringify(JSON.parse(json).slice(item - 1,item2));
      } catch {
        return '';
      }
    }

    json_array_reverse({ json }) {
      try {
        return JSON.stringify(JSON.parse(json).reverse());
      } catch {
        return '';
      }
    }

    json_array_flat({ json, depth }) {
      try {
        return JSON.stringify(JSON.parse(json).flat(depth));
      } catch {
        return '';
      }
    }

    json_array_create({ text, d }) {
      return JSON.stringify(String(text).split(d));
    }

    json_array_join({ json, d }) {
      try {
        return JSON.parse(json).join(d);
      } catch {
        return '';
      }
    }

    json_array_filter({ key, json }) {
      try {
        json = JSON.parse(json);
        return JSON.stringify(json.map(x => {
          if (hasOwn(x, key)) {
            return x[key];
          }
          return null;
        }));
      } catch (e) {
        return '';
      }
    }

    json_array_setlen({ json, len }) {
      try {
        json = JSON.parse(json);
        json.length = len;
        return JSON.stringify(json);
      } catch {
        return '';
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
      return '';
    }
    json_vm_setlist({ list, json }, util) {
      try {
        let listVariable = this.lookupList(list, util);
        if (listVariable) {
          const array = JSON.parse(json);
          if (Array.isArray(array)) {
            const safeArray = array.map(i => {
              if (typeof i === 'object') return JSON.stringify(i);
              return i;
            });
            listVariable.value = safeArray;
          }
        }
      } catch (e) {
        // ignore
      }
      return '';
    }

    //simple sort | @0znzw
    ss_sort(args) {
      var list;
      try {
      list = JSON.parse(args.list);
      } catch {
          return ' ';
      }
      /*eslint-disable*/
      function bblSort(t){for(var e=0;e<t.length;e+=1)for(var r=0;r<t.length-e-1;r+=1)if(t[r]>t[r+1]){var n=t[r];t[r]=t[r+1],t[r+1]=n}return t};
      function selectionSort(t){let e=t.length;for(let r=0;r<e;r++){let n=r;for(let o=r+1;o<e;o++)t[o]<t[n]&&(n=o);if(n!=r){let l=t[r];t[r]=t[n],t[n]=l}}return t};
      function insertionSort(t){let e=t.length;for(let r=1;r<e;r++){let n=t[r],o=r-1;for(;o>-1&&n<t[o];)t[o+1]=t[o],o--;t[o+1]=n}return t}function merge(t,e){let r=[];for(;t.length&&e.length;)t[0]<e[0]?r.push(t.shift()):r.push(e.shift());return[...r,...t,...e]};
      function mergeSort(t){let e=t.length/2;return t.length<2?t:merge(mergeSort(t.splice(0,e)),mergeSort(t))};
      function heapSort(t){class e{constructor(){this.heap=[]}parentIndex(t){return Math.floor((t-1)/2)}leftChildIndex(t){return 2*t+1}rightChildIndex(t){return 2*t+2}swap(t,e){let r=this.heap[t];this.heap[t]=this.heap[e],this.heap[e]=r}insert(t){this.heap.push(t);for(var e=this.heap.length-1,r=this.parentIndex(e);this.heap[r]&&this.heap[r]<this.heap[e];)this.swap(r,e),e=this.parentIndex(e),r=this.parentIndex(e)}delete(){var t=this.heap.shift();this.heap.unshift(this.heap.pop());for(var e=0,r=this.leftChildIndex(e),n=this.rightChildIndex(e);this.heap[r]&&this.heap[r]>this.heap[e]||this.heap[n]>this.heap[e];){var o=r;this.heap[n]&&this.heap[n]>this.heap[o]&&(o=n),this.swap(o,e),e=o,r=this.leftChildIndex(o),n=this.rightChildIndex(o)}return t}}return function t(r){var n=[],o=new e;for(let l=0;l<r.length;l++)o.insert(r[l]);for(let f=0;f<r.length;f++)n.push(o.delete());return n}(t)};
      function countingSort(t){return t.reduce((t,e)=>(t[e]=(t[e]||0)+1,t),[]).reduce((t,e,r)=>t.concat(Array(e).fill(r)),[])};
      function radixSort(t){let e=(t,e)=>{let r=String(t),n=r[r.length-1-e];return void 0===n?0:n},r=t=>{let e="0";return t.forEach(t=>{let r=String(t);r.length>e.length&&(e=r)}),e.length};return(t=>{let n=r(t);for(let o=0;o<n;o++){let l=Array.from({length:10},()=>[]);for(let f=0;f<t.length;f++){let h=e(t[f],o);void 0!==h&&l[h].push(t[f])}t=l.flat()}return t})(t)};
      function bingoSort(t,e){let r=t[0],n=t[0];for(let o=1;o<e;r=Math.min(r,t[o]),n=Math.max(n,t[o]),o++);let l=n,f=0;for(;r<n;){let h=f;for(let i=h;i<e;i++)t[i]==r?([t[i],t[f]]=[t[f],t[i]],f+=1):t[i]<n&&(n=t[i]);r=n,n=l}for(let u=0;u<t.length;u++);};
      function shellSort(t){let e=t.length;for(let r=Math.floor(e/2);r>0;r=Math.floor(r/2))for(let n=r;n<e;n+=1){let o=t[n],l;for(l=n;l>=r&&t[l-r]>o;l-=r)t[l]=t[l-r];t[l]=o}return t};
      function timSort(t,e){let r=32;function n(t){let e=0;for(;t>=r;)e|=1&t,t>>=1;return t+e}function o(t,e,r){for(let n=e+1;n<=r;n++){let o=t[n],l=n-1;for(;l>=e&&t[l]>o;)t[l+1]=t[l],l--;t[l+1]=o}}function l(t,e,r,n){let o=r-e+1,l=n-r,f=Array(o),h=Array(l);for(let i=0;i<o;i++)f[i]=t[e+i];for(let u=0;u<l;u++)h[u]=t[r+1+u];let s=0,_=0,$=e;for(;s<o&&_<l;)f[s]<=h[_]?(t[$]=f[s],s++):(t[$]=h[_],_++),$++;for(;s<o;)t[$]=f[s],$++,s++;for(;_<l;)t[$]=h[_],$++,_++}return function t(e,f){let h=n(r);for(let i=0;i<f;i+=h)o(e,i,Math.min(i+r-1,f-1));for(let u=h;u<f;u*=2)for(let s=0;s<f;s+=2*u){let _=s+u-1,$=Math.min(s+2*u-1,f-1);_<$&&l(e,s,_,$)}}(t,e)};
      //@ts-expect-error
      function combSort(t){function e(t){return(t=parseInt(10*t/13,10))<1?1:t}return function t(r){let n=r.length,o=n,l=!0;for(;1!=o||!0==l;){o=e(o),l=!1;for(let f=0;f<n-o;f++)if(r[f]>r[f+o]){let h=r[f];r[f]=r[f+o],r[f+o]=h,l=!0}}}(t)};
      function pigeonholeSort(t,e){let r=t[0],n=t[0],o,l,f,h;for(let i=0;i<e;i++)t[i]>n&&(n=t[i]),t[i]<r&&(r=t[i]);o=n-r+1;let u=[];for(l=0;l<e;l++)u[l]=0;for(l=0;l<e;l++)u[t[l]-r]++;for(f=0,h=0;f<o;f++)for(;u[f]-- >0;)t[h++]=f+r};
      function cycleSort(t,e){let r=0;for(let n=0;n<=e-2;n++){let o=t[n],l=n;for(let f=n+1;f<e;f++)t[f]<o&&l++;if(l!=n){for(;o==t[l];)l+=1;if(l!=n){let h=o;o=t[l],t[l]=h,r++}for(;l!=n;){l=n;for(let i=n+1;i<e;i++)t[i]<o&&(l+=1);for(;o==t[l];)l+=1;if(o!=t[l]){let u=o;o=t[l],t[l]=u,r++}}}}};
      function bogoSort(t,e){function r(e,r){for(var n=1;n<t.length;n++)if(e[n]<e[n-1])return!1;return!0}function n(t,e,r){var n=t[e];t[e]=t[r],t[r]=n}function o(t,e){var r,o=e;for(r=0;r<e;r++)n(t,o-r-1,Math.floor(Math.random()*e));return t}return function t(e,n){for(;!r(e,n);)e=o(e,n);return e}(t,e)}
      const quickSort=t=>{if(t.length<=1)return t;let r=t[0],u=[],e=[];for(let n=1;n<t.length;n++)t[n]<r?u.push(t[n]):e.push(t[n]);return[...quickSort(u),r,...quickSort(e)]};
      /*eslint-enable*/
      var handleCases = (function(){
      switch (args.method) {
          case 'quick':
              return quickSort(list);
          case 'bubble':
              return bblSort(list);
          case 'selection':
              return selectionSort(list);
          case 'insertion':
              return insertionSort(list);
          case 'merge':
              return mergeSort(list);
          case 'heap':
              return heapSort(list).reverse();
          case 'counting':
              return countingSort(list);
          //radix sort was skipped
          //bucket sort was skipped
          //bingo broke for some reason :(
          case 'shell':
              return shellSort(list);
          case 'bogo'://in request from jeremygamer13
              return bogoSort(list, list.length);
          /*eslint-disable*/
          //so confused but this line vvvvvv (the one below) threw an error???
          //timSort exists just it has 1 to many args to provide :\
          /*eslint-enable*/
          //skip 3
          default:
              return ' ';
      }
      });
      var handled = handleCases();
      return JSON.stringify((args.order == 'descending' ? reverseList(handled) : handled));
  }
  ss_sortA(args) {
      var list;
      try {
          list = JSON.parse(args.list);
      } catch {
          return ' ';
      }
      const sorted = list.sort();
      return JSON.stringify((args.order == 'descending' ? reverseList(sorted) : sorted));
  }
  }
  Scratch.extensions.register(new JSONS());
})(Scratch);
