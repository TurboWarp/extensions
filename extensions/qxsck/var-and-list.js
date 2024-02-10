// Name: Variable and list
// ID: qxsckvarandlist
// Description: More blocks related to variables and lists.
// By: qxsck
(function(Scratch) {
  'use strict';
  const qxsckvarandlistIcon="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI3OS45ODQzOSIgaGVpZ2h0PSI3OS45ODQzOSIgdmlld0JveD0iMCwwLDc5Ljk4NDM5LDc5Ljk4NDM5Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA5LjU2NDk1LC0xNDcuOTY0OTUpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PGc+PHBhdGggZD0iTTIzNy40NDIwNywxOTkuMzk1NTdjMCwtMTMuMDA4MTMgMTAuNTQ1MTEsLTIzLjU1Mzc3IDIzLjU1MzUsLTIzLjU1Mzc3YzEzLjAwODEzLDAgMjMuNTUzNzcsMTAuNTQ1NjQgMjMuNTUzNzcsMjMuNTUzNzdjMCwxMy4wMDgxMyAtMTAuNTQ1NjQsMjMuNTUzNzcgLTIzLjU1Mzc3LDIzLjU1Mzc3Yy0xMy4wMDg0MSwwIC0yMy41NTM3NywtMTAuNTQ1NjUgLTIzLjU1Mzc3LC0yMy41NTM3N3oiIGZpbGw9Im5vbmUiIHN0cm9rZS1vcGFjaXR5PSIwLjE1IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMTAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTIzNy42NDIwNywxOTkuNTk1NTdjMCwtMTMuMDA4MTMgMTAuNTQ1MTEsLTIzLjU1Mzc3IDIzLjU1MzUsLTIzLjU1Mzc3YzEzLjAwODEzLDAgMjMuNTUzNzcsMTAuNTQ1NjQgMjMuNTUzNzcsMjMuNTUzNzdjMCwxMy4wMDgxMyAtMTAuNTQ1NjQsMjMuNTUzNzcgLTIzLjU1Mzc3LDIzLjU1Mzc3Yy0xMy4wMDg0MSwwIC0yMy41NTM3NywtMTAuNTQ1NjUgLTIzLjU1Mzc3LC0yMy41NTM3N3oiIGZpbGw9IiNmZjhjMTkiIHN0cm9rZT0iI2RiNmUwMCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiPjxwYXRoIGQ9Ik0yNjQuMzU1NDMsMjA1LjY0MDgzbC02LjcyNTM5LC0xMS4zOTQ3OCIvPjxwYXRoIGQ9Ik0yNTUuMjY0MjUsMjA1LjA0OTE4bDExLjY1MzksLTEwLjgwMzEzIiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIvPjwvZz48cGF0aCBkPSJNMjcyLjAwNzE5LDE4Ni41NjAwNWMwLDAgNC42NzA1LDUuNDc1NTIgNC42MDIwMSwxMy4xMTQ2OGMtMC4wODIxOCw5LjE2Mjk0IC01LjM3OTkzLDEzLjMyMzk1IC01LjM3OTkzLDEzLjMyMzk1IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yNTAuODg2NjcsMjEyLjU3OTJjMCwwIC01LjI1MDU2LC00LjYxMTE2IC00Ljc3NTM2LC0xNC4xMzY3OWMwLjM5NjI0LC03Ljk0MTU0IDUuNTg0OTMsLTEzLjM3Nzk1IDUuNTg0OTMsLTEzLjM3Nzk1IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPjxnPjxwYXRoIGQ9Ik0yMTQuNTY1MjMsMTc2LjUxODcyYzAsLTEzLjAwODEzIDEwLjU0NTEsLTIzLjU1Mzc3IDIzLjU1Mzc3LC0yMy41NTM3N2MxMy4wMDgxMywwIDIzLjU1MzUsMTAuNTQ1NjUgMjMuNTUzNSwyMy41NTM3N2MwLDEzLjAwODEzIC0xMC41NDU2NSwyMy41NTM3OCAtMjMuNTUzNzcsMjMuNTUzNzhjLTEzLjAwODEzLDAgLTIzLjU1Mzc3LC0xMC41NDU2NSAtMjMuNTUzNzcsLTIzLjU1Mzc3eiIgZmlsbD0ibm9uZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMTUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMjE0LjU2NTIzLDE3Ni41MTg3MmMwLC0xMy4wMDgxMyAxMC41NDUxLC0yMy41NTM3NyAyMy41NTM3NywtMjMuNTUzNzdjMTMuMDA4MTMsMCAyMy41NTM1LDEwLjU0NTY1IDIzLjU1MzUsMjMuNTUzNzdjMCwxMy4wMDgxMyAtMTAuNTQ1NjUsMjMuNTUzNzggLTIzLjU1Mzc3LDIzLjU1Mzc4Yy0xMy4wMDgxMywwIC0yMy41NTM3NywtMTAuNTQ1NjUgLTIzLjU1Mzc3LC0yMy41NTM3N3oiIGZpbGw9IiNmZjY2MWEiIHN0cm9rZT0iI2U2NGQwMCIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0yNTEuMDA0NDEsMTc2LjMxMzE4aC0xNS4wNzQ2NE0yNTEuMDA0NDEsMTY1LjkxNjk3aC0xNS4wNzQ2NE0yMjUuNzA2ODgsMTY2LjA5MDI5aDAuNjkzMjZNMjI2LjQwMDE1LDE3Ni40ODY1aC0wLjY5MzI2TTIzNS45Mjk3NywxODYuNzA5MzhoMTUuMDc0NjRNMjI2LjQwMDE1LDE4Ni44ODI3aC0wLjY5MzI2IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPjxnIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PHBhdGggZD0iTTI1OC4zNTU2NCwxNjkuMzY5MzNoMjQuMjAyMzlNMjcwLjQ1Njg0LDE1Ny4yNjg3djI0LjIwMTg0IiBzdHJva2Utb3BhY2l0eT0iMC4xNSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEwIi8+PHBhdGggZD0iTTI1OC4zNTU2NCwxNjkuMzY5MzNoMjQuMjAyMzlNMjcwLjQ1Njg0LDE1Ny4yNjg3djI0LjIwMTg0IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNSIvPjwvZz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjozMC40MzUwNTAwMDAwMDAxMDM6MzIuMDM1MDUwMDAwMDAwMDEtLT4=";

  let i10ndefaultValue={
    'qxsckvarandlist.name': 'variable and list',

    'qxsckvarandlist.open': 'open',
    'qxsckvarandlist.close': 'close',

    'qxsckvarandlist.asc': 'ascending',
    'qxsckvarandlist.desc': 'descending',
    'qxsckvarandlist.dictOrder': 'dictionary order',

    'qxsckvarandlist.haveVar': 'have variable [VAR] ?',
    'qxsckvarandlist.getVar': 'value of variable [VAR]',
    'qxsckvarandlist.setVar': 'set variable [VAR] to [VALUE]',
    'qxsckvarandlist.seriVarsToJson': 'convert all variables starting with [START] to json',

    'qxsckvarandlist.openCaseSensitive': '[CASE] case sensitive',
    'qxsckvarandlist.haveList': 'have list [LIST] ?',
    'qxsckvarandlist.length': 'length of list [LIST]',
    'qxsckvarandlist.getList': 'value of list [LIST]',
    'qxsckvarandlist.newGetList': 'values of list [LIST]',
    'qxsckvarandlist.getListRange': 'values of from [LEFT] to [RIGHT] in list [LIST]',
    'qxsckvarandlist.getValueOfList': 'item # [INDEX] of list [LIST]',
    'qxsckvarandlist.seriListsToJson': 'convert all lists starting with [START] to json',
    'qxsckvarandlist.clearList': 'delete all of list [LIST]',
    'qxsckvarandlist.setList': 'set list [LIST] to list [LIST2]',
    'qxsckvarandlist.setListValue': 'set list [LIST] to [VALUE] [NUM] times',
    'qxsckvarandlist.deleteOfList': 'delete # [INDEX] of list [LIST]',
    'qxsckvarandlist.addValueInList': 'add [VALUE] to list [LIST]',
    'qxsckvarandlist.addListToList': 'add list [LIST2] to list [LIST]',
    'qxsckvarandlist.insertOfList': 'insert [VALUE] before item # [INDEX] in the list [LIST]',
    'qxsckvarandlist.insertListToList': 'insert list [LIST2] before item # [INDEX] in list [LIST]',
    'qxsckvarandlist.replaceOfList': 'replace item [INDEX] of list [LIST] to [VALUE]',
    'qxsckvarandlist.replaceRangeOfList': 'replace items [LEFT] to [RIGHT] in list [LIST] with [VALUE]',
    'qxsckvarandlist.getIndexOfList': 'first index of [VALUE] in list [LIST]',
    'qxsckvarandlist.getIndexesOfList': 'indexes of [VALUE] in list [LIST]',
    'qxsckvarandlist.newGetIndexesOfList': 'indexes of  [VALUE] in list [LIST]',
    'qxsckvarandlist.getCountsOfList': 'number of [VALUE] in list [LIST]',
    'qxsckvarandlist.listContains': 'list [LIST] have [VALUE] ?',
    'qxsckvarandlist.copyList': 'copy list [LIST1] to list [LIST2]',
    'qxsckvarandlist.reverseList': 'reverse list [LIST]',
    'qxsckvarandlist.sortList': 'sort list [LIST] with [CASE]',
    'qxsckvarandlist.sortListRange': 'sort item [LEFT] to [RIGHT] in list [LIST] with [CASE]',
    'qxsckvarandlist.mapObject': 'map object [OBJ] to list [LIST], and key to list [LIST2]',

    'qxsckvarandlist.unSupportCompile': '⚠️Compilation not supported',

    'qxsckvarandlist.forEach': '⚠️for each variable [VAR] from [LEFT] to [RIGHT]',
    'qxsckvarandlist.forEachList': '⚠️for each variable [VAR] in value of from [LEFT] to [RIGHT] in list [LIST]',
  };
  let openCaseSensitive=false;

  Scratch.translate.setup({
    en: {
      'qxsckvarandlist.name': 'variable and list',

      'qxsckvarandlist.open': 'open',
      'qxsckvarandlist.close': 'close',

      'qxsckvarandlist.asc': 'ascending',
      'qxsckvarandlist.desc': 'descending',
      'qxsckvarandlist.dictOrder': 'dictionary order',

      'qxsckvarandlist.haveVar': 'have variable [VAR] ?',
      'qxsckvarandlist.getVar': 'value of variable [VAR]',
      'qxsckvarandlist.setVar': 'set variable [VAR] to [VALUE]',
      'qxsckvarandlist.seriVarsToJson': 'convert all variables starting with [START] to json',

      'qxsckvarandlist.openCaseSensitive': '[CASE] case sensitive',
      'qxsckvarandlist.haveList': 'have list [LIST] ?',
      'qxsckvarandlist.length': 'length of list [LIST]',
      'qxsckvarandlist.getList': 'value of list [LIST]',
      'qxsckvarandlist.newGetList': 'values of list [LIST]',
      'qxsckvarandlist.getListRange': 'values of from [LEFT] to [RIGHT] in list [LIST]',
      'qxsckvarandlist.getValueOfList': 'item # [INDEX] of list [LIST]',
      'qxsckvarandlist.seriListsToJson': 'convert all lists starting with [START] to json',
      'qxsckvarandlist.clearList': 'delete all of list [LIST]',
      'qxsckvarandlist.setList': 'set list [LIST] to list [LIST2]',
      'qxsckvarandlist.setListValue': 'set list [LIST] to [VALUE] [NUM] times',
      'qxsckvarandlist.deleteOfList': 'delete # [INDEX] of list [LIST]',
      'qxsckvarandlist.addValueInList': 'add [VALUE] to list [LIST]',
      'qxsckvarandlist.addListToList': 'add list [LIST2] to list [LIST]',
      'qxsckvarandlist.insertOfList': 'insert [VALUE] before item # [INDEX] in the list [LIST]',
      'qxsckvarandlist.insertListToList': 'insert list [LIST2] before item # [INDEX] in list [LIST]',
      'qxsckvarandlist.replaceOfList': 'replace item [INDEX] of list [LIST] to [VALUE]',
      'qxsckvarandlist.replaceRangeOfList': 'replace items [LEFT] to [RIGHT] in list [LIST] with [VALUE]',
      'qxsckvarandlist.getIndexOfList': 'first index of [VALUE] in list [LIST]',
      'qxsckvarandlist.getIndexesOfList': 'indexes of [VALUE] in list [LIST]',
      'qxsckvarandlist.newGetIndexesOfList': 'indexes of  [VALUE] in list [LIST]',
      'qxsckvarandlist.getCountsOfList': 'number of [VALUE] in list [LIST]',
      'qxsckvarandlist.listContains': 'list [LIST] have [VALUE] ?',
      'qxsckvarandlist.copyList': 'copy list [LIST1] to list [LIST2]',
      'qxsckvarandlist.reverseList': 'reverse list [LIST]',
      'qxsckvarandlist.sortList': 'sort list [LIST] with [CASE]',
      'qxsckvarandlist.sortListRange': 'sort item [LEFT] to [RIGHT] in list [LIST] with [CASE]',
      'qxsckvarandlist.mapObject': 'map object [OBJ] to list [LIST], and key to list [LIST2]',

      'qxsckvarandlist.unSupportCompile': '⚠️Compilation not supported',

      'qxsckvarandlist.forEach': '⚠️for each variable [VAR] from [LEFT] to [RIGHT]',
      'qxsckvarandlist.forEachList': '⚠️for each variable [VAR] in value of from [LEFT] to [RIGHT] in list [LIST]',
    },
    zh: {
      'qxsckvarandlist.name': '变量与列表',

      'qxsckvarandlist.open': '打开',
      'qxsckvarandlist.close': '关闭',

      'qxsckvarandlist.asc': '升序',
      'qxsckvarandlist.desc': '降序',
      'qxsckvarandlist.dictOrder': '字典序',

      'qxsckvarandlist.haveVar': '有变量 [VAR] 吗？',
      'qxsckvarandlist.getVar': '变量 [VAR] 的值',
      'qxsckvarandlist.setVar': '设置变量 [VAR] 的值为 [VALUE]',
      'qxsckvarandlist.seriVarsToJson': '将以 [START] 为开头的所有变量转换为json',

      'qxsckvarandlist.openCaseSensitive': '[CASE] 大小写敏感',
      'qxsckvarandlist.haveList': '有列表 [LIST] 吗？',
      'qxsckvarandlist.emptyList': '列表 [LIST] 是空的吗？',
      'qxsckvarandlist.length': '列表 [LIST] 的长度',
      'qxsckvarandlist.getList': '列表 [LIST] 的值',
      'qxsckvarandlist.newGetList': '列表 [LIST] 的值',
      'qxsckvarandlist.getListRange': '列表 [LIST] 中第 [LEFT] 到 [RIGHT] 项的值',
      'qxsckvarandlist.getValueOfList': '列表 [LIST] 的第 [INDEX] 项',
      'qxsckvarandlist.seriListsToJson': '将以 [START] 为开头的所有列表转换为json',
      'qxsckvarandlist.clearList': '清空列表 [LIST]',
      'qxsckvarandlist.setList': '设置列表 [LIST] 的内容为列表 [LIST2]',
      'qxsckvarandlist.setListValue': '设置列表 [LIST] 为 [NUM] 个 [VALUE]',
      'qxsckvarandlist.deleteOfList': '删除列表 [LIST] 的第 [INDEX] 项',
      'qxsckvarandlist.addValueInList': '在列表 [LIST] 末尾添加 [VALUE]',
      'qxsckvarandlist.addListToList': '在列表 [LIST] 末尾添加列表 [LIST2]',
      'qxsckvarandlist.insertOfList': '在列表 [LIST] 的第 [INDEX] 项前插入 [VALUE]',
      'qxsckvarandlist.insertListToList': '在列表 [LIST] 的第 [INDEX] 项前插入列表 [LIST2]',
      'qxsckvarandlist.replaceOfList': '替换列表 [LIST] 的第 [INDEX] 项为 [VALUE]',
      'qxsckvarandlist.replaceRangeOfList': '把列表 [LIST] 的第 [LEFT] 到 [RIGHT] 项都替换为 [VALUE]',
      'qxsckvarandlist.getIndexOfList': '列表 [LIST] 中第一个 [VALUE] 的位置',
      'qxsckvarandlist.getIndexesOfList': '列表 [LIST] 中所有 [VALUE] 的位置',
      'qxsckvarandlist.newGetIndexesOfList': '列表 [LIST] 中所有 [VALUE] 的位置',
      'qxsckvarandlist.getCountsOfList': '列表 [LIST] 中 [VALUE] 的数量',
      'qxsckvarandlist.listContains': '列表 [LIST] 包括 [VALUE] 吗？',
      'qxsckvarandlist.copyList': '将列表 [LIST1] 复制到列表 [LIST2]',
      'qxsckvarandlist.reverseList': '反转列表 [LIST]',
      'qxsckvarandlist.sortList': '以 [CASE] 排序列表 [LIST]',
      'qxsckvarandlist.sortListRange': '以 [CASE] 排序列表 [LIST] 的第 [LEFT] 到 [RIGHT] 项',
      'qxsckvarandlist.mapObject': '映射对象 [OBJ] 的值到列表 [LIST] ，键到列表 [LIST2]',

      'qxsckvarandlist.unSupportCompile': '⚠️不支持编译',

      'qxsckvarandlist.forEach': '⚠️对于从 [LEFT] 到 [RIGHT] 中的每个变量 [VAR]',
      'qxsckvarandlist.forEachList': '⚠️对于列表 [LIST] 中从第 [LEFT] 到第 [RIGHT] 项的每个变量 [VAR]',
    }
  });

  class VarAndList {
    constructor(){
      this.formatMessage=function(id){
        return Scratch.translate({id: id,default: i10ndefaultValue[id]});
      }
    }

    getInfo() {
      return {
        id:'qxsckvarandlist',
        name: this.formatMessage('qxsckvarandlist.name'),
        color1: '#ed6b00',
        color2: '#ed6b00',
        blockIconURI: qxsckvarandlistIcon,
        menuIconURI: qxsckvarandlistIcon,
        blocks: [
          //command,reporter,Boolean,hat,conditional,loop
          {
            opcode:'haveVar',
            blockType: 'Boolean',
            text: this.formatMessage('qxsckvarandlist.haveVar'),
            arguments: {
              VAR: {
                type: 'string',
                defaultValue:'variable'
              },
            }
          },
          {
            opcode:'getVar',
            blockType: 'reporter',
            text: this.formatMessage('qxsckvarandlist.getVar'),
            arguments: {
              VAR: {
                type: 'string',
                defaultValue:'variable'
              },
            }
          },
          {
            opcode:'setVar',
            blockType: 'command',
            text: this.formatMessage('qxsckvarandlist.setVar'),
            arguments: {
              VAR: {
                type: 'string',
                defaultValue:'variable'
              },
              VALUE: {
                type: 'string',
                defaultValue:'value'
              },
            }
          },
          {
            opcode:'seriVarsToJson',
            blockType: 'reporter',
            text: this.formatMessage('qxsckvarandlist.seriVarsToJson'),
            arguments: {
              START: {
                type: 'string',
                defaultValue:'variable'
              },
            }
          },

          '---',

          {
            opcode:'openCaseSensitive',
            blockType: 'command',
            text: this.formatMessage('qxsckvarandlist.openCaseSensitive'),
            arguments: {
              CASE: {
                type: 'string',
                menu: 'openCaseSensitive.List',
              },
            }
          },
          {
            opcode:'haveList',
            blockType: 'Boolean',
            text: this.formatMessage('qxsckvarandlist.haveList'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
            }
          },
          {
            opcode:'emptyList',
            blockType: 'Boolean',
            text: this.formatMessage('qxsckvarandlist.emptyList'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
            }
          },
          {
            opcode:'length',
            blockType: 'reporter',
            text: this.formatMessage('qxsckvarandlist.length'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              }
            }
          },
          {
            opcode:'getList',
            blockType: 'reporter',
            text: this.formatMessage('qxsckvarandlist.getList'),
            hideFromPalette: true,
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
            }
          },
          {
            opcode:'newGetList',
            blockType: 'reporter',
            text: this.formatMessage('qxsckvarandlist.newGetList'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
            }
          },
          {
            opcode:'getListRange',
            blockType: 'reporter',
            text: this.formatMessage('qxsckvarandlist.getListRange'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
              LEFT: {
                type: 'string',
                defaultValue:'1'
              },
              RIGHT: {
                type: 'string',
                defaultValue:'2'
              },
            }
          },
          {
            opcode:'getValueOfList',
            blockType: 'reporter',
            text: this.formatMessage('qxsckvarandlist.getValueOfList'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
              INDEX: {
                type: 'string',
                defaultValue:'1'
              }
            }
          },
          {
            opcode:'seriListsToJson',
            blockType: 'reporter',
            text: this.formatMessage('qxsckvarandlist.seriListsToJson'),
            arguments: {
              START: {
                type: 'string',
                defaultValue:'list'
              },
            }
          },
          {
            opcode:'clearList',
            blockType: 'command',
            text: this.formatMessage('qxsckvarandlist.clearList'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
            }
          },
          {
            opcode:'setList',
            blockType: 'command',
            text: this.formatMessage('qxsckvarandlist.setList'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
              LIST2: {
                type: 'string',
                defaultValue:'["a","b"]'
              },
            }
          },
          {
            opcode:'setListValue',
            blockType: 'command',
            text: this.formatMessage('qxsckvarandlist.setListValue'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
              NUM: {
                type: 'string',
                defaultValue:'5'
              },
              VALUE: {
                type: 'string',
                defaultValue:'thing'
              },
            }
          },
          {
            opcode:'deleteOfList',
            blockType: 'command',
            text: this.formatMessage('qxsckvarandlist.deleteOfList'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
              INDEX: {
                type: 'string',
                defaultValue:'1'
              }
            }
          },
          {
            opcode:'addValueInList',
            blockType: 'command',
            text: this.formatMessage('qxsckvarandlist.addValueInList'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
              VALUE: {
                type: 'string',
                defaultValue:'value'
              },
            }
          },
          {
            opcode:'addListToList',
            blockType: 'command',
            text: this.formatMessage('qxsckvarandlist.addListToList'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
              LIST2: {
                type: 'string',
                defaultValue:'["a","b"]'
              },
            }
          },
          {
            opcode:'insertOfList',
            blockType: 'command',
            text: this.formatMessage('qxsckvarandlist.insertOfList'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
              INDEX: {
                type: 'string',
                defaultValue:'1'
              },
              VALUE: {
                type: 'string',
                defaultValue:'thing'
              }
            }
          },
          {
            opcode:'insertListToList',
            blockType: 'command',
            text: this.formatMessage('qxsckvarandlist.insertListToList'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
              INDEX: {
                type: 'string',
                defaultValue:'1'
              },
              LIST2: {
                type: 'string',
                defaultValue:'["ark","os"]'
              }
            }
          },
          {
            opcode:'replaceOfList',
            blockType: 'command',
            text: this.formatMessage('qxsckvarandlist.replaceOfList'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
              INDEX: {
                type: 'string',
                defaultValue:'1'
              },
              VALUE: {
                type: 'string',
                defaultValue:'thing'
              }
            }
          },
          {
            opcode:'replaceRangeOfList',
            blockType: 'command',
            text: this.formatMessage('qxsckvarandlist.replaceRangeOfList'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
              LEFT: {
                type: 'string',
                defaultValue:'1'
              },
              RIGHT: {
                type: 'string',
                defaultValue:'2'
              },
              VALUE: {
                type: 'string',
                defaultValue:'thing'
              }
            }
          },
          {
            opcode:'getIndexOfList',
            blockType: 'reporter',
            text: this.formatMessage('qxsckvarandlist.getIndexOfList'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
              VALUE: {
                type: 'string',
                defaultValue:'thing'
              }
            }
          },
          {
            opcode:'getIndexesOfList',
            blockType: 'reporter',
            text: this.formatMessage('qxsckvarandlist.getIndexesOfList'),
            hideFromPalette: true,
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
              VALUE: {
                type: 'string',
                defaultValue:'thing'
              }
            }
          },
          {
            opcode:'newGetIndexesOfList',
            blockType: 'reporter',
            text: this.formatMessage('qxsckvarandlist.newGetIndexesOfList'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
              VALUE: {
                type: 'string',
                defaultValue:'thing'
              }
            }
          },
          {
            opcode:'getCountsOfList',
            blockType: 'reporter',
            text: this.formatMessage('qxsckvarandlist.getCountsOfList'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
              VALUE: {
                type: 'string',
                defaultValue:'thing'
              }
            }
          },
          {
            opcode:'listContains',
            blockType: 'Boolean',
            text: this.formatMessage('qxsckvarandlist.listContains'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
              VALUE: {
                type: 'string',
                defaultValue:'thing'
              }
            }
          },
          {
            opcode:'copyList',
            blockType: 'command',
            text: this.formatMessage('qxsckvarandlist.copyList'),
            arguments: {
              LIST1: {
                type: 'string',
                defaultValue:'list1'
              },
              LIST2: {
                type: 'string',
                defaultValue:'list2'
              }
            }
          },
          {
            opcode:'reverseList',
            blockType: 'command',
            text: this.formatMessage('qxsckvarandlist.reverseList'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
            },
          },
          {
            opcode:'sortList',
            blockType: 'command',
            text: this.formatMessage('qxsckvarandlist.sortList'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
              CASE:{
                type: 'string',
                menu: 'sortList.List',
              }
            }
          },
          {
            opcode:'sortListRange',
            blockType: 'command',
            text: this.formatMessage('qxsckvarandlist.sortListRange'),
            arguments: {
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
              CASE:{
                type: 'string',
                menu: 'sortList.List',
              },
              LEFT: {
                type: 'string',
                defaultValue:'1'
              },
              RIGHT: {
                type: 'string',
                defaultValue:'2'
              },
            }
          },
          {
            opcode:'mapObject',
            blockType: 'command',
            text: this.formatMessage('qxsckvarandlist.mapObject'),
            arguments: {
              OBJ: {
                type: 'string',
                defaultValue:'{"name":"Gandi"}'
              },
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
              LIST2: {
                type: 'string',
                defaultValue:'list2'
              },
            }
          },

          '---',

          {
            opcode:'unSupportCompile',
            blockType: 'label',
            text: this.formatMessage('qxsckvarandlist.unSupportCompile'),
            arguments: {}
          },

          {
            opcode:'forEach',
            blockType: 'conditional',
            text: this.formatMessage('qxsckvarandlist.forEach'),
            arguments: {
              VAR: {
                type: 'string',
                defaultValue:'variable'
              },
              LEFT: {
                type: 'string',
                defaultValue:'1'
              },
              RIGHT: {
                type: 'string',
                defaultValue:'5'
              },
            }
          },
          {
            opcode:'forEachList',
            blockType: 'conditional',
            text: this.formatMessage('qxsckvarandlist.forEachList'),
            arguments: {
              VAR: {
                type: 'string',
                defaultValue:'variable'
              },
              LIST: {
                type: 'string',
                defaultValue:'list'
              },
              LEFT: {
                type: 'string',
                defaultValue:'1'
              },
              RIGHT: {
                type: 'string',
                defaultValue:'5'
              },
            }
          },
        ],
        menus: {
          'openCaseSensitive.List':[
            {
              text: this.formatMessage("qxsckvarandlist.open"),
              value: 'open'
            },
            {
              text: this.formatMessage("qxsckvarandlist.close"),
              value: 'close'
            },
          ],
          'sortList.List':[
            {
              text: this.formatMessage("qxsckvarandlist.asc"),
              value: 'asc'
            },
            {
              text: this.formatMessage("qxsckvarandlist.desc"),
              value: 'desc'
            },
            {
              text: this.formatMessage("qxsckvarandlist.dictOrder"),
              value: 'dictOrder'
            },
          ],
        }
      };
    }

    haveVar(args, util) {
      const variable = util.target.lookupVariableByNameAndType(String(args.VAR), '');
      return variable ? true : false;
    }
    getVar(args, util) {
      const variable = util.target.lookupVariableByNameAndType(String(args.VAR), '');
      return variable ? variable.value :'';
    }
    setVar(args, util) {
      const variable = util.target.lookupVariableByNameAndType(String(args.VAR), '');
      if (variable) {
        variable.value = args.VALUE;
        if (variable.isCloud) {
          util.runtime.ioDevices.cloud.requestUpdateVariable(
            variable.name,
            variable.value
          );
        }
      }
    }
    seriVarsToJson(args, util) {
      const start = String(args.START);
      const serialized = {};
      for (const variable of Object.values(util.runtime.getTargetForStage().variables)) {
        if (variable.type === '' && variable.name.startsWith(start)) {
          serialized[variable.name.replace(start, '')] = variable.value;
        }
      }
      for (const variable of Object.values(util.target.variables)) {
        if (variable.type === '' && variable.name.startsWith(start)) {
          serialized[variable.name.replace(start, '')] = variable.value;
        }
      }
      return JSON.stringify(serialized);
    }

    openCaseSensitive(args){
      openCaseSensitive=(String(args.CASE)==='open'?true:false);
    }
    haveList(args, util) {
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      return variable ? true : false;
    }
    emptyList(args, util) {
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      return variable ? (variable.value.length?false:true) : true;
    }
    length(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      if (variable) {
        return variable.value.length;
      }
      return 0;
    }
    getList(args, util) {
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      return variable ? variable.value.toString() : '';
    }
    newGetList(args, util) {
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      return variable ? '['+variable.value.map(value=>'"'+String(value)+'"').join(',')+']' : '[]';
    }
    getListRange(args, util) {
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      if (variable) {
        let length=variable.value.length,left=Number(args.LEFT),right=Number(args.RIGHT);
        if(left<1) left=1;
        if(right>length) right=length;
        left-=1,right-=1;
        return '['+variable.value.slice(left,right+1).map(value=>'"'+String(value)+'"').join(',')+']';
      }
      return '';
    }
    getValueOfList(args, util) {
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      if (!variable) return '';
      const index = String(args.INDEX);
      if(Number(index)<=variable.value.length && Number(index)>=1){
        return variable.value[index - 1];
      }
      return '';
    }
    seriListsToJson(args, util) {
      const start = String(args.START);
      const serialized = {};
      for (const variable of Object.values(util.runtime.getTargetForStage().variables)) {
        if (variable.type === 'list' && variable.name.startsWith(start)) {
          serialized[variable.name.replace(start, '')] = variable.value;
        }
      }
      for (const variable of Object.values(util.target.variables)) {
        if (variable.type === 'list' && variable.name.startsWith(start)) {
          serialized[variable.name.replace(start, '')] = variable.value;
        }
      }
      return JSON.stringify(serialized);
    }
    clearList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      if (variable) {
        variable.value = [];
        variable._monitorUpToDate = false;
      }
    }
    setList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      if (variable) {
        try{
          let arr=JSON.parse(args.LIST2);
          variable.value=arr;
          variable._monitorUpToDate = false;
        }catch(error){
          console.log('error:', error);
        }
      }
    }
    setListValue(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      if (variable) {
        let val=String(args.VALUE),num=Number(args.NUM);
        variable.value=[];
        for(let i=1;i<=num;i++) variable.value.push(val);
        variable._monitorUpToDate = false;
      }
    }
    deleteOfList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      if (variable) {
        const index = String(args.INDEX);
        if (index === 'ALL') {
          variable.value = [];
        } else if(Number(index)<=variable.value.length && Number(index)>=1){
          variable.value.splice(Number(index) - 1, 1);
          variable._monitorUpToDate = false;
        }
      }
    }
    addValueInList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      if (variable) {
        variable.value.push(args.VALUE);
        variable._monitorUpToDate = false;
      }
    }
    addListToList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      if (variable) {
        try{
          let arr=JSON.parse(args.LIST2);
          for(let i=0;i<arr.length;i++) variable.value.push(String(arr[i]));
          variable._monitorUpToDate = false;
        }catch(error){
          console.log('error:', error);
        }
      }
    }
    insertOfList(args,util){
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      const value=String(args.VALUE);
      const index=Number(args.INDEX)>variable.value.length?variable.value.length+1:Number(args.INDEX);
      variable.value.splice(index-1,0,value);
      variable._monitorUpToDate = false;
    }
    insertListToList(args,util){
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      const index=Number(args.INDEX)>variable.value.length?variable.value.length+1:Number(args.INDEX);
      try{
        let arr=JSON.parse(args.LIST2).map(String);
        variable.value.splice(index-1,0,...arr);
        variable._monitorUpToDate = false;
      }catch(error){
        console.log('error:', error);
      }
    }
    replaceOfList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      if (variable) {
        const index = String(args.INDEX);
        if(Number(index)<=variable.value.length && Number(index)>=1){
          variable.value[index-1]=String(args.VALUE);
          variable._monitorUpToDate = false;
        }
      }
    }
    replaceRangeOfList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      if (variable) {
        let length=variable.value.length,left=Number(args.LEFT),right=Number(args.RIGHT);
        if(left<1) left=1;
        if(right>length) right=length;
        left-=1,right-=1;
        for(let i=left;i<=right;i++) variable.value[i]=String(args.VALUE);
        variable._monitorUpToDate = false;
      }
    }
    getIndexOfList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      const value=String(args.VALUE);
      let flag=openCaseSensitive;
      if (variable) {
        for(let i=0;i<variable.value.length;i++){
          if(!flag){
            if(Scratch.Cast.compare(variable.value[i],value)===0) return i + 1;
          }else{
            if(String(variable.value[i]) ==String(value)) return i + 1;
          }
        }
      }
      return 0;
    }
    getIndexesOfList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      const value=String(args.VALUE);
      let flag=openCaseSensitive;
      if(variable){
        let indexes=[];
        for(let i=0;i<variable.value.length;i++){
          if(!flag){
            if(Scratch.Cast.compare(variable.value[i],value)===0) indexes.push(i + 1);
          }else{
            if(String(variable.value[i])===String(value)) indexes.push(i + 1);
          }
        }
        if(indexes.length>0) return indexes.toString();
      }
      return '';
    }
    newGetIndexesOfList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      const value=String(args.VALUE);
      let flag=openCaseSensitive;
      if(variable){
        let indexes=[];
        for(let i=0;i<variable.value.length;i++){
          if(!flag){
            if(Scratch.Cast.compare(variable.value[i],value)===0) indexes.push(i + 1);
          }else{
            if(String(variable.value[i])===String(value)) indexes.push(i + 1);
          }
        }
        if(indexes.length>0) return '['+indexes.map(value=>'"'+String(value)+'"').join(',')+']';
      }
      return '[]';
    }
    getCountsOfList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      const value=String(args.VALUE);
      let flag=openCaseSensitive;
      if(variable){
        let indexes=[];
        for(let i=0;i<variable.value.length;i++){
          if(!flag){
            if(Scratch.Cast.compare(variable.value[i],value)===0) indexes.push(i + 1);
          }else{
            if(String(variable.value[i])===String(value)) indexes.push(i + 1);
          }
        }
        return indexes.length;
      }
      return 0;
    }
    listContains(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      const value=String(args.VALUE);
      let flag=openCaseSensitive;
      if (variable) {
        for(let i=0;i<variable.value.length;i++){
          if(!flag){
            if(Scratch.Cast.compare(variable.value[i],value)===0) return true;
          }else{
            if(String(variable.value[i])===String(value)) return false;
          }
        }
        return false;
      }
      return false;
    }
    copyList(args, util) {
      /** @type {VM.ListVariable} */
      const list1 = util.target.lookupVariableByNameAndType(String(args.LIST1), 'list');
      const list2 = util.target.lookupVariableByNameAndType(String(args.LIST2), 'list');
      if (list1 && list2) {
        list2.value = list1.value.slice();
        list2._monitorUpToDate = false;
      }
    }
    reverseList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      if (variable) {
        let list=variable.value.slice();
        list.reverse();
        variable.value=list;
        variable._monitorUpToDate = false;
      }
    }
    sortList(args,util){
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      let order=String(args.CASE);
      if (variable) {
        let list=variable.value.slice();
        if(order==='asc'){
          list=list.map(val=>isNaN(Number(val))?0:Number(val));
          variable.value=list.sort((a,b)=>a-b);
        }
        else if(order==='desc'){
          list=list.map(val=>isNaN(Number(val))?0:Number(val));
          variable.value=list.sort((a,b)=>b-a);
        }
        else if(order==='dictOrder'){
          list=list.map(val=>String(val));
          variable.value=list.sort();
        }
        variable._monitorUpToDate = false;
      }
    }
    sortListRange(args,util){
      const variable = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      let order=String(args.CASE);
      if (variable) {
        let length=variable.value.length,left=Number(args.LEFT),right=Number(args.RIGHT);
        if(left<1) left=1;
        if(right>length) right=length;
        left-=1,right-=1;
        let list=variable.value.slice(left,right+1);
        if(order==='asc'){
          list=list.map(val=>isNaN(Number(val))?0:Number(val));
          list=list.sort((a,b)=>a-b);
        }
        else if(order==='desc'){
          list=list.map(val=>isNaN(Number(val))?0:Number(val));
          list=list.sort((a,b)=>b-a);
        }
        else if(order==='dictOrder'){
          list=list.map(val=>String(val));
          list=list.sort();
        }
        let list2=variable.value.slice();
        variable.value=[...list2.slice(0,left),...list,...list2.slice(right+1,length)];
        variable._monitorUpToDate = false;
      }
    }
    mapObject(args,util){
      const list = util.target.lookupVariableByNameAndType(String(args.LIST), 'list'),
            list2 = util.target.lookupVariableByNameAndType(String(args.LIST2), 'list');
      if (list && list2) {
        try{
          let object=JSON.parse(args.OBJ);
          list.value=Object.keys(object);
          list2.value=Object.values(object);
          list._monitorUpToDate = false;
          list2._monitorUpToDate = false;
        }catch(error){
          console.log('error:', error);
        }
      }
    }

    forEach(args,util){
      const variable = util.target.lookupVariableByNameAndType(String(args.VAR), '');
      if (variable) {
        let left=Number(args.LEFT),right=Number(args.RIGHT);
        let range=right-left+1;
        if(typeof util.stackFrame.index==='undefined'){
          util.stackFrame.index = 0;
        }

        if(util.stackFrame.index<range){
            util.stackFrame.index++;
            variable.value=util.stackFrame.index+left-1;
            util.startBranch(1,true);
        }
      }
    }
    forEachList(args,util){
      const variable = util.target.lookupVariableByNameAndType(String(args.VAR), '');
      const list = util.target.lookupVariableByNameAndType(String(args.LIST), 'list');
      if (variable && list) {
        let left=Number(args.LEFT)>0?Number(args.LEFT):1,
            right=Number(args.RIGHT)<=list.value.length?Number(args.RIGHT):list.value.length;
        let range=right-left+1;
        if(typeof util.stackFrame.index==='undefined'){
          util.stackFrame.index = 0;
        }

        if(util.stackFrame.index<range){
            util.stackFrame.index++;
            variable.value=list.value[util.stackFrame.index+left-2];
            util.startBranch(1,true);
        }
      }
    }
  }
  Scratch.extensions.register(new VarAndList());
}(Scratch));
