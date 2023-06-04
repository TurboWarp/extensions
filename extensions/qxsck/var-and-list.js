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
                defaultValue: 'varible'
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
                defaultValue: 'varible'
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
                defaultValue: 'varible'
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
            text: 'clear [LIST]',
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

    getVar(args){
      var varname = Scratch.Cast.toString(args.VAR),varvalue = '',vars = Scratch.vm.runtime.getTargetForStage().variables;
      for (var key in vars) {
        var var_ = vars[key];
        if (var_.type != 'list' && var_.name == varname) varvalue = var_.value;
      }
      return varvalue;
    }
    seriVarsToJson(args){
      var varstart = Scratch.Cast.toString(args.START),varlist = {},vars = Scratch.vm.runtime.getTargetForStage().variables;
      for (var key in vars) {
        var var_ = vars[key];
        if (var_.type != 'list' && var_.name.startsWith(varstart)) varlist[var_.name] = var_.value;
      }
      return JSON.stringify(varlist);
    }
    setVar(args){
      var varname = Scratch.Cast.toString(args.VAR),varvalue = Scratch.Cast.toString(args.VALUE),haveVar = 0,vars = Scratch.vm.runtime.getTargetForStage().variables;
      for (var key in vars) {
        var var_ = vars[key];
        if (var_.type != 'list' && var_.name == varname) haveVar = 1;
      }
      if (haveVar == 1) Scratch.vm.runtime.getTargetForStage().lookupVariableByNameAndType(varname).value = varvalue;
    }
    getList(args){
      var listname = Scratch.Cast.toString(args.LIST),listvalue = [],vars = Scratch.vm.runtime.getTargetForStage().variables;
      for (var key in vars) {
        var list_ = vars[key];
        if (list_.type == 'list' && list_.name == listname) listvalue = list_.value;
      }
      return listvalue;
    }
    getValueOfList(args){
      var listname = Scratch.Cast.toString(args.LIST),index = Scratch.Cast.toNumber(args.INDEX),haveList = 0,listvalue = [],vars = Scratch.vm.runtime.getTargetForStage().variables;
      for (var key in vars) {
        var list_ = vars[key];
        if (list_.type == 'list' && list_.name == listname) haveList = 1,listvalue = list_.value;
      }
      if (haveList == 1){
        var value;
        for (var i = 0;i < listvalue.length;i++){
          if (i == (index - 1)) value = listvalue[i];
        }
        return value;
      }
    }
    seriListsToJson(args){
      var liststart = Scratch.Cast.toString(args.START),listlist = {},vars = Scratch.vm.runtime.getTargetForStage().variables;
      for (var key in vars) {
        var list_ = vars[key];
        if (list_.type == 'list' && list_.name.startsWith(liststart)) listlist[list_.name] = list_.value;
      }
      return JSON.stringify(listlist);
    }
    clearList(args){
      var listname = Scratch.Cast.toString(args.LIST),haveList = 0,vars = Scratch.vm.runtime.getTargetForStage().variables;
      for (var key in vars) {
        var list_ = vars[key];
        if (list_.type == 'list' && list_.name == listname) haveList = 1;
      }
      if (haveList == 1) Scratch.vm.runtime.getTargetForStage().lookupVariableByNameAndType(listname,'list').value = [];
    }
    deleteOfList(args){
      var listname = Scratch.Cast.toString(args.LIST),index = Scratch.Cast.toNumber(args.INDEX),haveList = 0,listvalue = [],vars = Scratch.vm.runtime.getTargetForStage().variables;
      for (var key in vars) {
        var list_ = vars[key];
        if (list_.type == 'list' && list_.name == listname) haveList = 1,listvalue = list_.value;
      }
      if (haveList == 1){
        var newvalue = [];
        for (var i = 0;i < listvalue.length;i++){
          if (i != (index - 1)) newvalue.push(listvalue[i]);
        }
        Scratch.vm.runtime.getTargetForStage().lookupVariableByNameAndType(listname,'list').value = newvalue;
      }
    }
    addValueInList(args){
      var listname = Scratch.Cast.toString(args.LIST),haveList = 0,listvalue = [],vars = Scratch.vm.runtime.getTargetForStage().variables;
      for (var key in vars) {
        var list_ = vars[key];
        if (list_.type == 'list' && list_.name == listname) haveList = 1,listvalue = list_.value;
      }
      listvalue.push(Scratch.Cast.toString(args.VALUE));
      if (haveList == 1) Scratch.vm.runtime.getTargetForStage().lookupVariableByNameAndType(listname,'list').value = listvalue;
    }
    replaceOfList(args){
      var listname = Scratch.Cast.toString(args.LIST),index = Scratch.Cast.toNumber(args.INDEX),value = Scratch.Cast.toString(args.VALUE),haveList = 0,listvalue = [],vars = Scratch.vm.runtime.getTargetForStage().variables;
      for (var key in vars) {
        var list_ = vars[key];
        if (list_.type == 'list' && list_.name == listname) haveList = 1,listvalue = list_.value;
      }
      if (haveList == 1){
        var newvalue = [];
        for (var i = 0;i < listvalue.length;i++){
          if (i == (index - 1)) newvalue.push(value);
          else newvalue.push(listvalue[i]);
        }
        Scratch.vm.runtime.getTargetForStage().lookupVariableByNameAndType(listname,'list').value = newvalue;
      }
    }
    getIndexOfList(args){
      var listname = Scratch.Cast.toString(args.LIST),value = Scratch.Cast.toString(args.VALUE),haveList = 0,listvalue = [],vars = Scratch.vm.runtime.getTargetForStage().variables;
      for (var key in vars) {
        var list_ = vars[key];
        if (list_.type == 'list' && list_.name == listname) haveList = 1,listvalue = list_.value;
      }
      if (haveList == 1){
        for (var i = 0;i < listvalue.length;i++){
          if (listvalue[i] == value) return i + 1;
        }
        return 0;
      }
    }
    getIndexsOfList(args){
      var listname = Scratch.Cast.toString(args.LIST),value = Scratch.Cast.toString(args.VALUE),haveList = 0,listvalue = [],vars = Scratch.vm.runtime.getTargetForStage().variables;
      for (var key in vars) {
        var list_ = vars[key];
        if (list_.type == 'list' && list_.name == listname) haveList = 1,listvalue = list_.value;
      }
      if (haveList == 1){
        var indexs = [];
        for (var i = 0;i < listvalue.length;i++){
          if (listvalue[i] == value) indexs.push(i + 1);
        }
        if (indexs.length > 0) return indexs;
        else return 0;
      }
    }
    length(args){
      var listname = Scratch.Cast.toString(args.LIST),haveList = 0,listvalue = [],vars = Scratch.vm.runtime.getTargetForStage().variables;
      for (var key in vars) {
        var list_ = vars[key];
        if (list_.type == 'list' && list_.name == listname) haveList = 1,listvalue = list_.value;
      }
      if (haveList == 1){
        return listvalue.length;
      }
    }
    listHaveValue(args){
      var listname = Scratch.Cast.toString(args.LIST),value = Scratch.Cast.toString(args.VALUE),haveList = 0,listvalue = [],vars = Scratch.vm.runtime.getTargetForStage().variables;
      for (var key in vars) {
        var list_ = vars[key];
        if (list_.type == 'list' && list_.name == listname) haveList = 1,listvalue = list_.value;
      }
      if (haveList == 1){
        var indexs = [];
        for (var i = 0;i < listvalue.length;i++){
          if (listvalue[i] == value) return 1 === 1;
        }
        return 1 === 0;
      }
    }
    copyList(args){
      var listname = Scratch.Cast.toString(args.LIST),list2name = Scratch.Cast.toString(args.LIST2),
      haveList = 0,have2List = 0,
      listvalue = [],vars = Scratch.vm.runtime.getTargetForStage().variables;
      for (var key in vars) {
        var list_ = vars[key];
        if (list_.type == 'list' && list_.name == listname) haveList = 1,listvalue = list_.value;
        if (list_.type == 'list' && list_.name == list2name) have2List = 1;
      }
      if (haveList == 1 && have2List == 1){
        Scratch.vm.runtime.getTargetForStage().lookupVariableByNameAndType(list2name,'list').value = listvalue;
      }
    }
  }
  Scratch.extensions.register(new VarAndList());
}(Scratch));
