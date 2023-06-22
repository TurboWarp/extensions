(function (Scratch) {
  'use strict';

  /* -- SETUP -- */
  const vm = Scratch.vm;
  const runtime = Scratch.vm.runtime;
  const ArgumentType = Scratch.ArgumentType
  ArgumentType.VARIABLE = 'variable';

  /* Credit to skyhigh173 for the idea of this */
  const label = (name, hidden) => ({
    blockType: Scratch.BlockType.LABEL,
    text: name,
    hideFromPalette: hidden
  });

  const getVarObjectFromName = function (name, util, type) {
    const stageTarget = Scratch.vm.runtime.getTargetForStage();
    const target = util.target;
    let listObject = Object.create(null);

    listObject = stageTarget.lookupVariableByNameAndType(name, type);
    if (listObject) return listObject;
    listObject = target.lookupVariableByNameAndType(name, type);
    if (listObject) return listObject;
  }

  const cloneObj = function (original) {
    return JSON.parse(JSON.stringify(original));
  }

  const arraysEqual = function (a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }


  class Data {
    getInfo() {
      return {
        id: 'lmsData',
        name: 'List Tools',
        color1: '#ff661a',
        color2: '#f2590d',
        color3: '#e64d00',
        blocks: [
          {
            opcode: 'deleteItems',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete items [NUM1] to [NUM2] of [LIST]',
            arguments: {
              NUM1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1'
              },
              NUM2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '3'
              },
              LIST: {
                type: Scratch.ArgumentType.VARIABLE,
                variableType: 'list',
                variable: 'my list'
              }
            }
          },
          {
            opcode: 'deleteAllOfItem',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete all [ITEM] in [LIST]',
            arguments: {
              ITEM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'thing'
              },
              LIST: {
                type: Scratch.ArgumentType.VARIABLE,
                variableType: 'list',
                variable: 'my list'
              }
            }
          },
          {
            opcode: 'replaceAllOfItem',
            blockType: Scratch.BlockType.COMMAND,
            text: 'replace all [ITEM1] with [ITEM2] in [LIST]',
            arguments: {
              ITEM1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'apple'
              },
              ITEM2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'banana'
              },
              LIST: {
                type: Scratch.ArgumentType.VARIABLE,
                variableType: 'list',
                variable: 'my list'
              }
            }
          },
          {
            opcode: 'repeatList',
            blockType: Scratch.BlockType.COMMAND,
            text: 'repeat [LIST1] [NUM] times in [LIST2]',
            arguments: {
              LIST1: {
                type: Scratch.ArgumentType.VARIABLE,
                variableType: 'list',
                variable: 'my list'
              },
              LIST2: {
                type: Scratch.ArgumentType.VARIABLE,
                variableType: 'list',
                variable: 'my list'
              },
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '3'
              }
            }
          },

          '---',

          {
            opcode: 'getListSplit',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get list [LIST] split by [STRING]',
            disableMonitor: true,
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.VARIABLE,
                variableType: 'list',
                variable: 'my list'
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ','
              }
            }
          },
          {
            opcode: 'timesItemAppears',
            blockType: Scratch.BlockType.REPORTER,
            text: '# of times [ITEM] appears in [LIST]',
            disableMonitor: true,
            arguments: {
              ITEM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'thing'
              },
              LIST: {
                type: Scratch.ArgumentType.VARIABLE,
                variableType: 'list',
                variable: 'my list'
              }
            }
          },
          {
            opcode: 'itemIndex',
            blockType: Scratch.BlockType.REPORTER,
            text: 'index # [INDEX] of item [ITEM] in [LIST]',
            disableMonitor: true,
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1'
              },
              ITEM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'thing'
              },
              LIST: {
                type: Scratch.ArgumentType.VARIABLE,
                variableType: 'list',
                variable: 'my list'
              }
            }
          },

          '---',

          {
            opcode: 'listIsEmpty',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[LIST] is empty?',
            disableMonitor: true,
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.VARIABLE,
                variableType: 'list',
                variable: 'my list'
              }
            }
          },
          {
            opcode: 'itemNumExists',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'item [NUM] exists in [LIST]?',
            disableMonitor: true,
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1'
              },
              LIST: {
                type: Scratch.ArgumentType.VARIABLE,
                variableType: 'list',
                variable: 'my list'
              }
            }
          },
          {
            opcode: 'orderIs',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'order of [LIST] is [ORDER]?',
            disableMonitor: true,
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.VARIABLE,
                variableType: 'list',
                variable: 'my list'
              },
              ORDER: {
                type: Scratch.ArgumentType.STRING,
                menu: 'orderTypeSort'
              }
            }
          },

          '---',

          {
            opcode: 'orderList',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set order of [LIST] to [ORDER]',
            disableMonitor: true,
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.VARIABLE,
                variableType: 'list',
                variable: 'my list'
              },
              ORDER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'reversed',
                menu: 'orderType'
              }
            }
          },
          {
            opcode: 'setListToList',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set items of [LIST1] to [LIST2]',
            arguments: {
              LIST1: {
                type: Scratch.ArgumentType.VARIABLE,
                variableType: 'list',
                variable: 'my list'
              },
              LIST2: {
                type: Scratch.ArgumentType.VARIABLE,
                variableType: 'list',
                variable: 'my list'
              }
            }
          },
          {
            opcode: 'joinLists',
            blockType: Scratch.BlockType.COMMAND,
            text: 'merge [LIST1] onto [LIST2]',
            arguments: {
              LIST1: {
                type: Scratch.ArgumentType.VARIABLE,
                variableType: 'list',
                variable: 'my list'
              },
              LIST2: {
                type: Scratch.ArgumentType.VARIABLE,
                variableType: 'list',
                variable: 'my list'
              }
            }
          },

          '---',

          // These blocks only work with Temp Variables 2
          // I'll add a check to show these if the extension
          // is loaded. But not right now.
          /*{
            opcode: 'forEachListItem',
            blockType: Scratch.BlockType.LOOP,
            text: 'for each item [VAR] in [LIST]',
            extensions: ['colours_data_lists'],
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'thread variable'
              },
              LIST: {
                type: Scratch.ArgumentType.VARIABLE,
                variableType: 'list',
                variable: 'my list'
              }
            }
          },
          {
            opcode: 'forEachListItemNum',
            blockType: Scratch.BlockType.LOOP,
            text: 'for each item # [VAR] in [LIST]',
            extensions: ['colours_data_lists'],
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'thread variable'
              },
              LIST: {
                type: Scratch.ArgumentType.VARIABLE,
                variableType: 'list',
                variable: 'my list'
              }
            }
          },*/

          '---',

          {
            opcode: 'setListArray',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set [LIST] to array [ARRAY]',
            disableMonitor: true,
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.VARIABLE,
                variableType: 'list',
                variable: 'my list'
              },
              ARRAY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["apple","banana"]'
              }
            }
          },
          {
            opcode: 'getListArray',
            blockType: Scratch.BlockType.REPORTER,
            text: '[LIST] as array',
            disableMonitor: true,
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.VARIABLE,
                variableType: 'list',
                variable: 'my list'
              }
            }
          }
        ],
        menus: {
          operator: {
            acceptReporters: false,
            items: [
              {
                text: '=',
                value: '='
              },
              {
                text: '>',
                value: '>'
              },
              {
                text: '<',
                value: '<'
              }
            ]
          },
          orderType: {
            acceptReporters: false,
            items: [
              {
                text: 'reversed',
                value: 'reversed'
              },
              {
                text: 'ascending',
                value: 'ascending'
              },
              {
                text: 'descending',
                value: 'descending'
              },
              {
                text: 'randomised',
                value: 'randomised'
              }
            ]
          },
          orderTypeSort: {
            acceptReporters: false,
            items: [
              {
                text: 'ascending',
                value: 'ascending'
              },
              {
                text: 'descending',
                value: 'descending'
              }
            ]
          },
          indexType: {
            acceptReporters: false,
            items: [
              {
                text: 'first',
                value: 'first'
              },
              {
                text: 'last',
                value: 'last'
              },
              {
                text: 'random',
                value: 'random'
              }
            ]
          }
        }
      };
    }

    deleteItems(args, util) {
      const list = getVarObjectFromName(args.LIST, util, 'list');
      if (!list) return false;
      const listLength = list.value.length;
      let num1 = 0;
      let num2 = 0;
      if (!list) return;
      if (args.NUM1 > args.NUM2) {
        num1 = args.NUM2 - 1;
        num2 = args.NUM1 - 1;
      } else {
        num1 = args.NUM1 - 1;
        num2 = args.NUM2 - 1;
      }
      const listPart1 = list.value.slice(0, num1);
      const listPart2 = list.value.slice((num2 + 1), listLength);
      list.value = (listPart1.concat(listPart2));
      list._monitorUpToDate = false;
    }

    deleteAllOfItem(args, util) {
      const list = getVarObjectFromName(args.LIST, util, 'list');
      if (!list) return;
      const newList = list.value.filter(function(model) { 
        return model !== args.ITEM 
      });
      list.value = newList;
      list._monitorUpToDate = false;
    }

    /* To do: simplify this, maybe */
    replaceAllOfItem(args, util) {
      const list = getVarObjectFromName(args.LIST, util, 'list');
      if (!list) return;
      const listLength = list.value.length;
      const item1 = args.ITEM1;
      const item2 = args.ITEM2;
      let newList = [];
      for (let i = 0; i < listLength; i++) {
        if (list.value[i] === item1) {
          newList.push(item2);
        } else {
          newList.push(list.value[i]);
        }
      }
      list.value = newList;
      list._monitorUpToDate = false;
    }
    
    repeatList(args, util) {
      const list1 = getVarObjectFromName(args.LIST1, util, 'list');
      if (!list1) return;
      const list2 = getVarObjectFromName(args.LIST2, util, 'list');
      if (!list2) return;
      const currentVal = list1.value;
      for (let i = 0; i < args.NUM; i++) {
        list1.value = list1.value.concat(currentVal);
      }
    }

    getListSplit(args, util) {
      const list = getVarObjectFromName(args.LIST, util, 'list');
      if (!list) return '';
      return list.value.join(args.STRING);
    }

    timesItemAppears(args, util) {
      const list = getVarObjectFromName(args.LIST, util, 'list');
      if (!list) return 0;
      return list.value.filter(model => model == args.ITEM).length;
    }

    itemIndex(args, util) {
      const list = getVarObjectFromName(args.LIST, util, 'list');
      if (!list) return 0;
      let indexes = [];
      for (let index = 0; index < list.value.length; index++) {
        if (list.value[index] === args.ITEM) {
          indexes.push(index);
        }
      }
      return indexes[args.INDEX - 1];
    }

    listIsEmpty(args, util) {
      const list = getVarObjectFromName(args.LIST, util, 'list');
      if (!list) return true;
      if (list.value.length > 0) return false;
      return true;
    }

    itemNumExists(args, util) {
      const list = getVarObjectFromName(args.LIST, util, 'list');
      if (!list) return false;
      const listIndex = Scratch.Cast.toListIndex(args.NUM, list.value.length, false);
      if (listIndex === Scratch.Cast.LIST_INVALID) return false;
      return true;
    }

    orderIs(args, util) {
      const list = getVarObjectFromName(args.LIST, util, 'list');
      if (!list) return false;
      const defaultList = cloneObj(list.value);
      const orderedList = cloneObj(list.value).sort();
      if (args.ORDER === 'ascending') {
        return arraysEqual(defaultList, orderedList);
      }
      if (args.ORDER === 'descending') {
        return arraysEqual(defaultList.reverse(), orderedList);
      }
      return false;
    }

    orderList(args, util) {
      const list = getVarObjectFromName(args.LIST, util, 'list');
      if (!list) return;
      if (args.ORDER === 'reversed') {
        list.value.reverse();
      } else if (args.ORDER === 'randomised') {
        const randomised = list.value
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
        list.value = randomised;
      } else if (args.ORDER === 'ascending') {
        list.value.sort();
      } else if (args.ORDER === 'descending') {
        list.value.sort().reverse();
      }
      list._monitorUpToDate = false;
    }

    setListToList(args, util) {
      const list1 = getVarObjectFromName(args.LIST1, util, 'list');
      if (!list1) return;
      const list2 = getVarObjectFromName(args.LIST2, util, 'list');
      if (!list2) return;
      list1.value = list2.value;
    }
    
    joinLists(args, util) {
      const list1 = getVarObjectFromName(args.LIST1, util, 'list');
      if (!list1) return;
      const list2 = getVarObjectFromName(args.LIST2, util, 'list');
      if (!list2) return;
      list1.value = list1.value.concat(list2.value);
    }

    forEachListItem(args, util) {
      const list = getVarObjectFromName(args.LIST, util, 'list');
      if (!list) return false;
      const listLength = list.value.length;

      const thread = util.thread;
      if (!thread.variables) thread.variables = {};
      const vars = thread.variables;

      if (typeof util.stackFrame.index === 'undefined') {
        util.stackFrame.index = 0;
      }

      if (util.stackFrame.index < listLength) {
        let itemIndex = util.stackFrame.index;
        vars[args.VAR] = list.value[itemIndex];
        util.stackFrame.index++;
        util.startBranch(1, true);
      }
    }

    forEachListItemNum(args, util) {
      const list = getVarObjectFromName(args.LIST, util, 'list');
      if (!list) return false;
      const listLength = list.value.length;

      const thread = util.thread;
      if (!thread.variables) thread.variables = {};
      const vars = thread.variables;

      if (typeof util.stackFrame.index === 'undefined') {
        util.stackFrame.index = 0;
      }

      if (util.stackFrame.index < listLength) {
        util.stackFrame.index++;
        vars[args.VAR] = util.stackFrame.index;
        util.startBranch(1, true);
      }
    }

    setListArray(args, util) {
      const list = getVarObjectFromName(args.LIST, util, 'list');
      if (!list) return;
      const array = JSON.parse(args.ARRAY);
      if (!Array.isArray(array)) return;
      const newArray = array;
      list.value = newArray;
      list._monitorUpToDate = false;
    }
    
    getListArray(args, util) {
      const list = getVarObjectFromName(args.LIST, util, 'list');
      if (!list) return '';
      return JSON.stringify(list.value);
    }
  }

  // From Xeltalliv's example:
  // https://github.com/Xeltalliv/extensions/blob/examples/examples/other-default-field-types.js

  const cp = runtime._convertPlaceholders.bind(runtime);
  runtime._convertPlaceholders = function(context, match, placeholder) {
    const retVal = cp(context, match, placeholder);

    const argInfo = context.blockInfo.arguments[placeholder] || {};
    const argsName = `args${context.outLineNum}`;
    const blockArgs = context.blockJSON[argsName];
    const argJSON = blockArgs[blockArgs.length-1];
    
    if (argInfo.type === ArgumentType.VARIABLE) {
      argJSON.type = 'field_variable';
      argJSON.variableTypes = [argInfo.variableType ?? ''];
      if (argInfo.variable) argJSON.variable = argInfo.variable;
    }
    return retVal;
  }

  Scratch.extensions.register(new Data());
})(Scratch);
