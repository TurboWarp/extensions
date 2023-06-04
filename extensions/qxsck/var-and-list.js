(function(Scratch) {
  'use strict';
  class VarAndList {
    getInfo() {
      return {
        id: 'qxsckvarandlist',
        name: 'Var and List',
        blocks: [
          {
            opcode: 'getVar',
            blockType: Scratch.BlockType.REPORTER,
            text: 'value of [VAR]',
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'variable'
              },
            }
          },
          {
            opcode: 'seriVarsToJson',
            blockType: Scratch.BlockType.REPORTER,
            text: 'convert all variables starting with [START] to json',
            arguments: {
              START: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'variable'
              },
            }
          },
          {
            opcode: 'setVar',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set the value of [VAR] to [VALUE]',
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'variable'
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'value'
              },
            }
          },
          {
            opcode: 'getList',
            blockType: Scratch.BlockType.REPORTER,
            text: 'value of [LIST] ',
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'list'
              },
            }
          },
          {
            opcode: 'getValueOfList',
            blockType: Scratch.BlockType.REPORTER,
            text: 'item [INDEX] of [LIST]',
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'list'
              },
              INDEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1'
              }
            }
          },
          {
            opcode: 'seriListsToJson',
            blockType: Scratch.BlockType.REPORTER,
            text: 'convert all lists starting with [START] to json',
            arguments: {
              START: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'list'
              },
            }
          },
          {
            opcode: 'clearList',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete all of [LIST]',
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'list'
              },
            }
          },
          {
            opcode: 'deleteOfList',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete [INDEX] of [LIST]',
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'list'
              },
              INDEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1'
              }
            }
          },
          {
            opcode: 'addValueInList',
            blockType: Scratch.BlockType.COMMAND,
            text: 'add [VALUE] to [LIST]',
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'list'
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'value'
              },
            }
          },
          {
            opcode: 'replaceOfList',
            blockType: Scratch.BlockType.COMMAND,
            text: 'replace item [INDEX] of [LIST] with [VALUE]',
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'list'
              },
              INDEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1'
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'thing'
              }
            }
          },
          {
            opcode: 'getIndexOfList',
            blockType: Scratch.BlockType.REPORTER,
            text: 'first index of [VALUE] in [LIST]',
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'list'
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'thing'
              }
            }
          },
          {
            opcode: 'getIndexsOfList',
            blockType: Scratch.BlockType.REPORTER,
            text: 'indexs of [LIST] in [VALUE]',
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'list'
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'thing'
              }
            }
          },
          {
            opcode: 'length',
            blockType: Scratch.BlockType.REPORTER,
            text: 'length of [LIST]',
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'list'
              }
            }
          },
          {
            opcode: 'listHaveValue',
            blockType: Scratch.BlockType.BOOLEAN,
            text: ' [LIST] have [VALUE] ?',
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'list'
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'thing'
              }
            }
          },
          {
            opcode: 'copyList',
            blockType: Scratch.BlockType.COMMAND,
            text: 'copy [LIST] to [LIST2]',
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'list'
              },
              LIST2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'list2'
              }
            }
          },
        ]
      };
    }

    getVar(args, util) {
      const variable = util.target.lookupVariableByNameAndType(Scratch.Cast.toString(args.VAR), '');
      return variable ? variable.value : '';
    }
    seriVarsToJson(args, util) {
      const start = Scratch.Cast.toString(args.START);
      const serialized = {};
      for (const variable of Object.values(util.runtime.getTargetForStage().variables)) {
        if (variable.type === '' && variable.name.startsWith(start)) {
          serialized[variable.name] = variable.value;
        }
      }
      for (const variable of Object.values(util.target.variables)) {
        if (variable.type === '' && variable.name.startsWith(start)) {
          serialized[variable.name] = variable.value;
        }
      }
      return JSON.stringify(serialized);
    }
    setVar(args, util) {
      const variable = util.target.lookupVariableByNameAndType(Scratch.Cast.toString(args.VAR), '');
      if (variable) {
        variable.value = args.VALUE;
      }
    }
    getList(args, util) {
      const variable = util.target.lookupVariableByNameAndType(Scratch.Cast.toString(args.LIST), 'list');
      return variable ? variable.value.toString() : '';
    }
    getValueOfList(args, util) {
      const variable = util.target.lookupVariableByNameAndType(Scratch.Cast.toString(args.LIST), 'list');
      if (!variable) return 0;
      const index = Scratch.Cast.toListIndex(args.INDEX, variable.value.length, false);
      if (index === 'INVALID') return '';
      return variable.value[index - 1];
    }
    seriListsToJson(args, util) {
      const start = Scratch.Cast.toString(args.START);
      const serialized = {};
      for (const variable of Object.values(util.runtime.getTargetForStage().variables)) {
        if (variable.type === 'list' && variable.name.startsWith(start)) {
          serialized[variable.name] = variable.value;
        }
      }
      for (const variable of Object.values(util.target.variables)) {
        if (variable.type === 'list' && variable.name.startsWith(start)) {
          serialized[variable.name] = variable.value;
        }
      }
      return JSON.stringify(serialized);
    }
    clearList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(Scratch.Cast.toString(args.LIST), 'list');
      if (variable) {
        variable.value = [];
      }
    }
    deleteOfList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(Scratch.Cast.toString(args.LIST), 'list');
      if (variable) {
        const index = Scratch.Cast.toListIndex(args.INDEX, variable.value.length, true);
        if (index === 'ALL') {
          variable.value = [];
        } else if (index !== 'INVALID') {
          variable.value.splice(index - 1, 1);
          variable._monitorUpToDate = false;
        }
      }
    }
    addValueInList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(Scratch.Cast.toString(args.LIST), 'list');
      if (variable) {
        variable.value.push(args.VALUE);
        variable._monitorUpToDate = false;
      }
    }
    replaceOfList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(Scratch.Cast.toString(args.LIST), 'list');
      if (variable) {
        const index = Scratch.Cast.toListIndex(args.INDEX, variable.value.length, false);
        if (index !== 'INVALID') {
          variable.value[index - 1] = args.VALUE;
          variable._monitorUpToDate = false;
        }
      }
    }
    getIndexOfList(args, util) {
      var listname = Scratch.Cast.toString(args.LIST),value = Scratch.Cast.toString(args.VALUE),haveList = 0,listvalue = [],vars = Scratch.vm.runtime.getTargetForStage().variables;
      for (var key in vars) {
        var list_ = vars[key];
        if (list_.type == 'list' && list_.name == listname) haveList = 1,listvalue = list_.value;
      }
      if (haveList == 1) {
        for (var i = 0;i < listvalue.length;i++) {
          if (listvalue[i] == value) return i + 1;
        }
        return 0;
      }
    }
    getIndexsOfList(args, util) {
      var listname = Scratch.Cast.toString(args.LIST),value = Scratch.Cast.toString(args.VALUE),haveList = 0,listvalue = [],vars = Scratch.vm.runtime.getTargetForStage().variables;
      for (var key in vars) {
        var list_ = vars[key];
        if (list_.type == 'list' && list_.name == listname) haveList = 1,listvalue = list_.value;
      }
      if (haveList == 1) {
        var indexs = [];
        for (var i = 0;i < listvalue.length;i++) {
          if (listvalue[i] == value) indexs.push(i + 1);
        }
        if (indexs.length > 0) return indexs;
        else return 0;
      }
    }
    length(args, util) {
      var listname = Scratch.Cast.toString(args.LIST),haveList = 0,listvalue = [],vars = Scratch.vm.runtime.getTargetForStage().variables;
      for (var key in vars) {
        var list_ = vars[key];
        if (list_.type == 'list' && list_.name == listname) haveList = 1,listvalue = list_.value;
      }
      if (haveList == 1) {
        return listvalue.length;
      }
    }
    listHaveValue(args, util) {
      var listname = Scratch.Cast.toString(args.LIST),value = Scratch.Cast.toString(args.VALUE),haveList = 0,listvalue = [],vars = Scratch.vm.runtime.getTargetForStage().variables;
      for (var key in vars) {
        var list_ = vars[key];
        if (list_.type == 'list' && list_.name == listname) haveList = 1,listvalue = list_.value;
      }
      if (haveList == 1) {
        for (var i = 0;i < listvalue.length;i++) {
          if (listvalue[i] == value) return true;
        }
        return false;
      }
    }
    copyList(args, util) {
      var listname = Scratch.Cast.toString(args.LIST),list2name = Scratch.Cast.toString(args.LIST2),
      haveList = 0,have2List = 0,
      listvalue = [],vars = Scratch.vm.runtime.getTargetForStage().variables;
      for (var key in vars) {
        var list_ = vars[key];
        if (list_.type == 'list' && list_.name == listname) haveList = 1,listvalue = list_.value;
        if (list_.type == 'list' && list_.name == list2name) have2List = 1;
      }
      if (haveList == 1 && have2List == 1) {
        Scratch.vm.runtime.getTargetForStage().lookupVariableByNameAndType(list2name,'list').value = listvalue;
      }
    }
  }
  Scratch.extensions.register(new VarAndList());
}(Scratch));
