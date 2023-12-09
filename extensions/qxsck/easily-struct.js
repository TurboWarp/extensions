(function(Scratch){
  "use strict";

  const Icon="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI3OS41IiBoZWlnaHQ9Ijc5LjUiIHZpZXdCb3g9IjAsMCw3OS41LDc5LjUiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMDAuMjUsLTE0MC4yNSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjAwLjI1LDE4MGMwLC0yMS45NTMzMiAxNy43OTY2OCwtMzkuNzUgMzkuNzUsLTM5Ljc1YzIxLjk1MzMyLDAgMzkuNzUsMTcuNzk2NjggMzkuNzUsMzkuNzVjMCwyMS45NTMzMiAtMTcuNzk2NjgsMzkuNzUgLTM5Ljc1LDM5Ljc1Yy0yMS45NTMzMiwwIC0zOS43NSwtMTcuNzk2NjggLTM5Ljc1LC0zOS43NXoiIGZpbGw9IiMwZTdiZWQiIHN0cm9rZT0iIzU5YzBlYiIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMi41Ij48cGF0aCBkPSJNMjIxLjg1OTM2LDE4OC44NjM3NGw3LjEzNTQsLTQuMTgzMDgiIHN0cm9rZT0iIzU5YzBlYiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTIyMi4wMTk4MiwxODkuNDIxMzRjMS45ODU2NSwzLjM4NzA4IDAuODQ5NTcsNy43NDI1NCAtMi41Mzc1MSw5LjcyODJjLTMuMzg3MDgsMS45ODU2NSAtNy43NDI1NSwwLjg0OTU3IC05LjcyODIsLTIuNTM3NTFjLTEuOTg1NjUsLTMuMzg3MDggLTAuODQ5NTcsLTcuNzQyNTQgMi41Mzc1MSwtOS43MjgyYzMuMzg3MDgsLTEuOTg1NjUgNy43NDI1NSwtMC44NDk1NyA5LjcyODIsMi41Mzc1MXoiIHN0cm9rZT0iI2ViNTk1OSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48L2c+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNTljMGViIiBzdHJva2Utd2lkdGg9IjIuNSI+PHBhdGggZD0iTTIzOS45OTc5NCwxNTguNTA0ODd2OC4yNzExNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTIzMi44MTM1NiwxNTEuMzA3NTJjMCwtMy45Njc4MyAzLjIxNjU2LC03LjE4NDM5IDcuMTg0MzksLTcuMTg0MzljMy45Njc4MiwwIDcuMTg0MzgsMy4yMTY1NiA3LjE4NDM4LDcuMTg0MzljMCwzLjk2NzgzIC0zLjIxNjU2LDcuMTg0MzggLTcuMTg0MzgsNy4xODQzOGMtMy45Njc4MiwwIC03LjE4NDM5LC0zLjIxNjU2IC03LjE4NDM5LC03LjE4NDM4eiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48L2c+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyLjUiPjxwYXRoIGQ9Ik0yNTguMTQwNjQsMTg4Ljg2Mzc0bC03LjEzNTQsLTQuMTgzMDgiIHN0cm9rZT0iIzU5YzBlYiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTI2Ny43MDgzOCwxODYuODgzODNjMy4zODcwOCwxLjk4NTY1IDQuNTIzMTYsNi4zNDExMSAyLjUzNzUxLDkuNzI4MmMtMS45ODU2NSwzLjM4NzA4IC02LjM0MTEyLDQuNTIzMTYgLTkuNzI4MiwyLjUzNzUxYy0zLjM4NzA4LC0xLjk4NTY1IC00LjUyMzE2LC02LjM0MTExIC0yLjUzNzUxLC05LjcyODJjMS45ODU2NSwtMy4zODcwOCA2LjM0MTExLC00LjUyMzE2IDkuNzI4MiwtMi41Mzc1MXoiIHN0cm9rZT0iIzZmZWI1OSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48L2c+PGcgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiPjxnIGZpbGw9IiM4YmQ3ZjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PGc+PHBhdGggZD0iTTI0MS45NTUxNywxNjMuMjQ5MTRsMC45MDUxOCwzLjUxMjA3bDMuNDM5NjUsMS41OTMxbC0xLjYyOTMxLDIuODk2NTVsLTkuNjY3MjQsLTAuMTA4NjJsLTEuMzAzNDUsLTIuODk2NTVsMy40NzU4NiwtMS40NDgyN2wwLjg2ODk3LC0zLjU0ODI4eiIvPjxwYXRoIGQ9Ik0yMzguMDQ0ODIsMTk2Ljc1MDg2bC0wLjg2ODk3LC0zLjU0ODI3bC0zLjQ3NTg2LC0xLjQ0ODI3bDEuMzAzNDUsLTIuODk2NTVsOS42NjcyNCwtMC4xMDg2MmwxLjYyOTMxLDIuODk2NTVsLTMuNDM5NjUsMS41OTMxbC0wLjkwNTE4LDMuNTEyMDd6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIvPjwvZz48Zz48cGF0aCBkPSJNMjIzLjI0OTE0LDE3OC4wNDQ4M2wzLjUxMjA3LC0wLjkwNTE4bDEuNTkzMSwtMy40Mzk2NmwyLjg5NjU1LDEuNjI5MzFsLTAuMTA4NjIsOS42NjcyNGwtMi44OTY1NSwxLjMwMzQ1bC0xLjQ0ODI3LC0zLjQ3NTg2bC0zLjU0ODI4LC0wLjg2ODk3eiIvPjxwYXRoIGQ9Ik0yNTYuNzUwODYsMTgxLjk1NTE3bC0zLjU0ODI3LDAuODY4OTdsLTEuNDQ4MjcsMy40NzU4NmwtMi44OTY1NSwtMS4zMDM0NWwtMC4xMDg2MiwtOS42NjcyNGwyLjg5NjU1LC0xLjYyOTMxbDEuNTkzMSwzLjQzOTY2bDMuNTEyMDcsMC45MDUxOHoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9Ii8+PC9nPjxnPjxwYXRoIGQ9Ik0yNTMuMjI3MTYsMTY5LjUzNzg3bC0xLjg0MzM1LDMuMTIzNDZsMS4zMDU3MSwzLjU1ODdsLTMuMjAwMjcsMC44OTYwN2wtNi43NTg5NywtNi45MTI1OGwxLjEyNjQ5LC0yLjk2OTg1bDMuNDgxODksMS40MzM3MmwzLjEyMzQ2LC0xLjg5NDU2eiIvPjxwYXRoIGQ9Ik0yMjYuNzcyODMsMTkwLjQ2MjEzbDEuODk0NTYsLTMuMTIzNDZsLTEuNDMzNzIsLTMuNDgxODlsMi45Njk4NSwtMS4xMjY0OWw2LjkxMjU4LDYuNzU4OTdsLTAuODk2MDgsMy4yMDAyN2wtMy41NTg3LC0xLjMwNTcxbC0zLjEyMzQ2LDEuODQzMzV6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIvPjwvZz48Zz48cGF0aCBkPSJNMjI5LjUzNzg3LDE2Ni43NzI4NGwzLjEyMzQ2LDEuODQzMzVsMy41NTg3LC0xLjMwNTcxbDAuODk2MDgsMy4yMDAyN2wtNi45MTI1OCw2Ljc1ODk3bC0yLjk2OTg1LC0xLjEyNjQ5bDEuNDMzNzIsLTMuNDgxODlsLTEuODk0NTYsLTMuMTIzNDZ6Ii8+PHBhdGggZD0iTTI1MC40NjIxMywxOTMuMjI3MTZsLTMuMTIzNDYsLTEuODk0NTZsLTMuNDgxODksMS40MzM3MmwtMS4xMjY0OSwtMi45Njk4NWw2Ljc1ODk3LC02LjkxMjU4bDMuMjAwMjcsMC44OTYwN2wtMS4zMDU3MSwzLjU1ODdsMS44NDMzNSwzLjEyMzQ2eiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iLz48L2c+PC9nPjxnIHN0cm9rZS1saW5lY2FwPSJidXR0Ij48cGF0aCBkPSJNMjI5LjQ1NDE1LDE3OS43YzAsLTUuODI0MzEgNC43MjE1NCwtMTAuNTQ1ODUgMTAuNTQ1ODUsLTEwLjU0NTg1YzUuODI0MzEsMCAxMC41NDU4NCw0LjcyMTU0IDEwLjU0NTg0LDEwLjU0NTg1YzAsNS44MjQzMSAtNC43MjE1NCwxMC41NDU4NSAtMTAuNTQ1ODQsMTAuNTQ1ODVjLTUuODI0MzEsMCAtMTAuNTQ1ODUsLTQuNzIxNTMgLTEwLjU0NTg1LC0xMC41NDU4NXoiIGZpbGw9IiM1OWMwZWIiLz48cGF0aCBkPSJNMjMxLjk4MDcyLDE3OS43YzAsLTQuNDI4OTIgMy41OTAzNiwtOC4wMTkyOCA4LjAxOTI4LC04LjAxOTI4YzQuNDI4OTIsMCA4LjAxOTI4LDMuNTkwMzUgOC4wMTkyOCw4LjAxOTI4YzAsNC40Mjg5MiAtMy41OTAzNSw4LjAxOTI4IC04LjAxOTI4LDguMDE5MjhjLTQuNDI4OTIsMCAtOC4wMTkyOCwtMy41OTAzNSAtOC4wMTkyOCwtOC4wMTkyOHoiIGZpbGw9IiNmZmZmZmYiLz48L2c+PC9nPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjM5Ljc1OjM5Ljc1LS0+";

  let structs=Object.create(null);
  let useStructs=Object.create(null);
  let useStructLists=Object.create(null);

  Scratch.translate.setup({
    'en':{
      //qxsckeasilystruct
      'qxsckeasilystruct.name':'Easily struct',

      'qxsckeasilystruct.type':"type",
      'qxsckeasilystruct.length':"length",
      'qxsckeasilystruct.memberLength':"number of members",
      'qxsckeasilystruct.members':"members",

      'qxsckeasilystruct.structTypes':"struct types",
      'qxsckeasilystruct.structs':"structs",
      'qxsckeasilystruct.structLists':"struct lists",

      'qxsckeasilystruct.clearAll':"clear all",
      'qxsckeasilystruct.clearData':'clear all [TYPE]',

      'qxsckeasilystruct.setStructType':'set struct type,name = [NAME] , members = [MEMBERS]',
      'qxsckeasilystruct.setStruct':'set struct,name = [NAME] , type = [TYPE]',
      'qxsckeasilystruct.setStructList':'set struct list,name = [NAME] , type = [TYPE]',
      'qxsckeasilystruct.getStructTypeData':'[TYPE] in struct type [NAME]',
      'qxsckeasilystruct.deleteData':'delete [TYPE] [NAME]',

      'qxsckeasilystruct.checkData':'have [TYPE] [NAME] ?',
      'qxsckeasilystruct.checkDataMember':'[TYPE] [NAME] have member [MEMBER] ?',

      'qxsckeasilystruct.getStructType':'type in struct [NAME]',
      'qxsckeasilystruct.setStructMemberData':'set member [MEMBER] in struct [NAME] to [DATA]',
      'qxsckeasilystruct.getStructMember':'member [MEMBER] in struct [NAME]',
      'qxsckeasilystruct.getStructMemberIndex':'item [INDEX] of members in struct [NAME]',

      'qxsckeasilystruct.getStructListData':'[TYPE] in struct list [NAME]',
      'qxsckeasilystruct.structListPushData':'push [NUM] none datas to struct list [NAME]',

      'qxsckeasilystruct.setStructListMemberData':'set item [INDEX] of member [MEMBER] in struct list [NAME] to [DATA]',
      'qxsckeasilystruct.getStructListMember':'item [INDEX] of member [MEMBER] in struct list [NAME]',
      'qxsckeasilystruct.getStructListMemberIndex':'item [INDEX2] of the [INDEX] member in the struct list [NAME]',
      'qxsckeasilystruct.deleteStructListMember':'delete item [INDEX] in struct list [NAME]',
      'qxsckeasilystruct.structListSort':'sort struct list [NAME] with rule [RULE]',
    },
    'zh': {
      //qxsckeasilystruct
      'qxsckeasilystruct.name':'简易结构体',

      'qxsckeasilystruct.type':"类型",
      'qxsckeasilystruct.length':"长度",
      'qxsckeasilystruct.memberLength':"成员数量",
      'qxsckeasilystruct.members':"成员",

      'qxsckeasilystruct.structTypes':"结构体定义",
      'qxsckeasilystruct.structs':"结构体",
      'qxsckeasilystruct.structLists':"结构体列表",

      'qxsckeasilystruct.clearAll':"清空所有数据",
      'qxsckeasilystruct.clearData':'清空所有 [TYPE]',

      'qxsckeasilystruct.setStructType':'设置结构体类型，类型名称 = [NAME] ，成员 = [MEMBERS]',
      'qxsckeasilystruct.setStruct':'设置结构体，结构体名称 = [NAME] ，结构体类型名称 = [TYPE]',
      'qxsckeasilystruct.setStructList':'设置结构体列表，结构体列表名称 = [NAME] ，结构体类型名称 = [TYPE]',
      'qxsckeasilystruct.getStructTypeData':'结构体类型 [NAME] 的 [TYPE]',
      'qxsckeasilystruct.deleteData':'删除 [TYPE] [NAME]',

      'qxsckeasilystruct.checkData':'存在 [TYPE] [NAME] ？',
      'qxsckeasilystruct.checkDataMember':'[TYPE] [NAME] 存在成员 [MEMBER] ？',

      'qxsckeasilystruct.getStructType':'结构体 [NAME] 的类型',
      'qxsckeasilystruct.setStructMemberData':'设置结构体 [NAME] 的成员 [MEMBER] 的数据为 [DATA]',
      'qxsckeasilystruct.getStructMember':'结构体 [NAME] 的成员 [MEMBER]',
      'qxsckeasilystruct.getStructMemberIndex':'结构体 [NAME] 的第 [INDEX] 个成员',

      'qxsckeasilystruct.getStructListData':'结构体列表 [NAME] 的 [TYPE]',
      'qxsckeasilystruct.structListPushData':'结构体列表 [NAME] 增加 [NUM] 项空白项',

      'qxsckeasilystruct.setStructListMemberData':'设置结构体列表 [NAME] 的第 [INDEX] 项的成员 [MEMBER] 的数据为 [DATA]',
      'qxsckeasilystruct.getStructListMember':'结构体列表 [NAME] 的第 [INDEX] 项的成员 [MEMBER]',
      'qxsckeasilystruct.getStructListMemberIndex':'结构体列表 [NAME] 的第 [INDEX] 项的第 [INDEX2] 个成员',
      'qxsckeasilystruct.deleteStructListMember':'删除结构体列表 [NAME] 的第 [INDEX] 项',
      'qxsckeasilystruct.structListSort':'使用规则 [RULE] 排序结构体列表 [NAME]',
    },
  });

  class struct {
    getInfo() {
      return {
      id: "qxsckeasilystruct",
      name: Scratch.translate({id: "qxsckeasilystruct.name",default: "Easily struct"}),
      color1: '#0e7bed',
      color2: '#0e7bed',
      color3: '#0e7bed',
      blockIconURI: Icon,
      menuIconURI: Icon,
        blocks: [
          //command,reporter,Boolean,hat
          {
            opcode: "clearAll",
            blockType: 'command',
            text: Scratch.translate({id: "qxsckeasilystruct.clearAll",default: "clear all"}),
            arguments: {},
          },
          {
            opcode: "clearData",
            blockType: 'command',
            text: Scratch.translate({id: "qxsckeasilystruct.clearData",default: "clear all [TYPE]"}),
            arguments: {
              TYPE:{
                type: 'string',
                defaultValue: Scratch.translate({id: "qxsckeasilystruct.structTypes",default: "struct types"}),
                menu: 'structData.List',
              },
            },
          },

          '---',

          {
            opcode: "setStructType",
            blockType: 'command',
            text: Scratch.translate({id: "qxsckeasilystruct.setStructType",default: "set struct type,name = [NAME],members = [MEMBERS]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct_'
              },
              MEMBERS: {
                type: 'string',
                defaultValue: 'mem1 mem2'
              },
            },
          },
          {
            opcode: "setStruct",
            blockType: 'command',
            text: Scratch.translate({id: "qxsckeasilystruct.setStruct",default: "set struct,name = [NAME],type = [TYPE]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct'
              },
              TYPE: {
                type: 'string',
                defaultValue: 'struct_'
              },
            },
          },
          {
            opcode: "setStructList",
            blockType: 'command',
            text: Scratch.translate({id: "qxsckeasilystruct.setStructList",default: "set struct list,name = [NAME],type = [TYPE]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'structList'
              },
              TYPE: {
                type: 'string',
                defaultValue: 'struct_'
              },
            },
          },
          {
            opcode: "getStructTypeData",
            blockType: 'reporter',
            text: Scratch.translate({id: "qxsckeasilystruct.getStructTypeData",default: "[TYPE] in struct type [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct_'
              },
              TYPE:{
                type: 'string',
                defaultValue: Scratch.translate({id: "qxsckeasilystruct.memberLength",default: "number of members"}),
                menu: 'getStructTypeData.List',
              },
            },
          },
          {
            opcode: "deleteData",
            blockType: 'command',
            text: Scratch.translate({id: "qxsckeasilystruct.deleteData",default: "delete [TYPE] [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct_'
              },
              TYPE:{
                type: 'string',
                defaultValue: Scratch.translate({id: "qxsckeasilystruct.structTypes",default: "struct types"}),
                menu: 'structData.List',
              },
            },
          },

          '---',

          {
            opcode: "checkData",
            blockType: 'Boolean',
            text: Scratch.translate({id: "qxsckeasilystruct.checkData",default: "have [TYPE] [NAME] ?"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct_'
              },
              TYPE:{
                type: 'string',
                defaultValue: Scratch.translate({id: "qxsckeasilystruct.structTypes",default: "struct types"}),
                menu: 'structData.List',
              },
            },
          },
          {
            opcode: "checkDataMember",
            blockType: 'Boolean',
            text: Scratch.translate({id: "qxsckeasilystruct.checkDataMember",default: "[TYPE] [NAME] have member [MEMBER] ?"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct_'
              },
              MEMBER: {
                type: 'string',
                defaultValue: 'mem1'
              },
              TYPE:{
                type: 'string',
                defaultValue: Scratch.translate({id: "qxsckeasilystruct.structTypes",default: "struct types"}),
                menu: 'structData.List',
              },
            },
          },

          '---',

          {
            opcode: "getStructType",
            blockType: 'reporter',
            text: Scratch.translate({id: "qxsckeasilystruct.getStructType",default: "type in struct [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct'
              },
            },
          },
          {
            opcode: "setStructMemberData",
            blockType: 'command',
            text: Scratch.translate({id: "qxsckeasilystruct.setStructMemberData",default: "set member [MEMBER] in struct [NAME] to [DATA]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct'
              },
              MEMBER: {
                type: 'string',
                defaultValue: 'mem1'
              },
              DATA: {
                type: 'string',
                defaultValue: 'data'
              },
            },
          },
          {
            opcode: "getStructMember",
            blockType: 'reporter',
            text: Scratch.translate({id: "qxsckeasilystruct.getStructMember",default: "member [MEMBER] in struct [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct'
              },
              MEMBER: {
                type: 'string',
                defaultValue: 'mem1'
              },
            },
          },
          {
            opcode: "getStructMemberIndex",
            blockType: 'reporter',
            text: Scratch.translate({id: "qxsckeasilystruct.getStructMemberIndex",default: "item [INDEX] of members in struct [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct'
              },
              INDEX: {
                type: 'string',
                defaultValue: '1'
              },
            },
          },

          '---',

          {
            opcode: "getStructListData",
            blockType: 'reporter',
            text: Scratch.translate({id: "qxsckeasilystruct.getStructListData",default: "[TYPE] in struct list [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'structList'
              },
              TYPE:{
                type: 'string',
                defaultValue: Scratch.translate({id: "qxsckeasilystruct.type",default: "type"}),
                menu: 'getStructListData.List',
              }
            },
          },
          {
            opcode: "structListPushData",
            blockType: 'command',
            text: Scratch.translate({id: "qxsckeasilystruct.structListPushData",default: "push [NUM] datas to struct list [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'structList'
              },
              NUM: {
                type: 'string',
                defaultValue: '1'
              },
            },
          },
          {
            opcode: "setStructListMemberData",
            blockType: 'command',
            text: Scratch.translate({id: "qxsckeasilystruct.setStructListMemberData",default: "set item [INDEX] of member [MEMBER] in struct list [NAME] to [DATA]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'structList'
              },
              MEMBER: {
                type: 'string',
                defaultValue: 'mem1'
              },
              DATA: {
                type: 'string',
                defaultValue: 'data'
              },
              INDEX: {
                type: 'string',
                defaultValue: '1'
              },
            },
          },
          {
            opcode: "getStructListMember",
            blockType: 'reporter',
            text: Scratch.translate({id: "qxsckeasilystruct.getStructListMember",default: "item [INDEX] of member [MEMBER] in struct list [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'structList'
              },
              MEMBER: {
                type: 'string',
                defaultValue: 'mem1'
              },
              INDEX: {
                type: 'string',
                defaultValue: '1'
              },
            },
          },
          {
            opcode: "getStructListMemberIndex",
            blockType: 'reporter',
            text: Scratch.translate({id: "qxsckeasilystruct.getStructListMemberIndex",default: "item [INDEX2] of the [INDEX] member in the struct list [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'structList'
              },
              INDEX: {
                type: 'string',
                defaultValue: '1'
              },
              INDEX2: {
                type: 'string',
                defaultValue: '1'
              },
            },
          },
          {
            opcode: "deleteStructListMember",
            blockType: 'command',
            text: Scratch.translate({id: "qxsckeasilystruct.deleteStructListMember",default: "delete item [INDEX] in struct list [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'structList'
              },
              INDEX: {
                type: 'string',
                defaultValue: '1'
              },
            },
          },
          {
            opcode: "structListSort",
            blockType: 'command',
            text: Scratch.translate({id: "qxsckeasilystruct.structListSort",default: "sort struct list [NAME] with rule [RULE]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'structList'
              },
              RULE: {
                type: 'string',
                defaultValue: 'mem1 num asc mem2 str none'
              },
            },
          },
        ],
        menus: {
          'getStructListData.List':[
            {
              text: Scratch.translate({id: "qxsckeasilystruct.type",default: "type"}),
              value: 'type'
            },
            {
              text: Scratch.translate({id: "qxsckeasilystruct.length",default: "length"}),
              value: 'length'
            },
          ],
          'structData.List':[
            {
              text: Scratch.translate({id: "qxsckeasilystruct.structTypes",default: "struct types"}),
              value: 'structTypes'
            },
            {
              text: Scratch.translate({id: "qxsckeasilystruct.structs",default: "structs"}),
              value: 'structs'
            },
            {
              text: Scratch.translate({id: "qxsckeasilystruct.structLists",default: "structLists"}),
              value: 'structLists'
            },
          ],
          'getStructTypeData.List':[
            {
              text: Scratch.translate({id: "qxsckeasilystruct.memberLength",default: "number of members"}),
              value: 'length'
            },
            {
              text: Scratch.translate({id: "qxsckeasilystruct.members",default: "members"}),
              value: 'members'
            },
          ],
        }
      };
    }

    clearAll(){
      structs=Object.create(null),useStructs=Object.create(null),useStructLists=Object.create(null);
    }
    clearData(args){
      let type_=String(args.TYPE);
      if(type_=='structTypes') structs=Object.create(null);
      else if(type_=='structs') useStructs=Object.create(null);
      else if(type_=='structLists') useStructLists=Object.create(null);
    }

    setStructType(args){
      let name=String(args.NAME),members=String(args.MEMBERS).split(' ');
      if(!(name in structs)){
        let flag=0,v={};
        for(let i in members){
          if(v[members[i]]) flag=1;
          v[members[i]] = true;
        }
        if(flag==0){
          structs[name]=members;
        }
      }
    }
    setStruct(args){
      let name=String(args.NAME),type=String(args.TYPE);
      if(!(name in useStructs)){
        if(type in structs){
          let members=structs[type];
          let json={"type":type,"data":{}};
          for(let i in members) json['data'][members[i]]="";
          useStructs[name]=json;
        }
      }
    }
    setStructList(args){
      let name=String(args.NAME),type=String(args.TYPE);
      if(!(name in useStructLists)){
        if(type in structs){
          let members=structs[type];
          let json={"type":type,"members":members,"data":[]};
          useStructLists[name]=json;
        }
      }
    }
    getStructTypeData(args){
      let name=String(args.NAME),type_=String(args.TYPE);
      if(name in structs){
        if(type_=='length') return structs[name].length;
        else if(type_=='members'){
          let members=structs[name];
          return '['+members.map(value=>'"'+String(value)+'"').join(',')+']';
        }
      }
    }
    deleteData(args){
      let type_=String(args.TYPE),name=String(args.NAME);
      if(type_=='structTypes') if((name in structs)) delete structs[name];
      else if(type_=='structs') if((name in useStructs)) delete useStructs[name];
      else if(type_=='structLists') if((name in useStructLists)) delete useStructLists[name];
    }

    checkData(args){
      let type_=String(args.TYPE),name=String(args.NAME);
      if(type_=='structTypes') return (name in structs);
      else if(type_=='structs') return (name in useStructs);
      else if(type_=='structLists') return (name in useStructLists);
    }
    checkDataMember(args){
      let type_=String(args.TYPE),name=String(args.NAME),member=String(args.MEMBER);
      if(type_=='structTypes'){
        if(name in structs) return (structs[name].indexOf(member)>-1);
        else return false;
      }
      else if(type_=='structs'){
        if(name in useStructs) return (member in useStructs[name]['data']);
        else return false;
      }
      else if(type_=='structLists'){
        if(name in useStructLists) return (useStructLists[name]['members'].indexOf(member)>-1);
        else return false;
      }
    }

    getStructType(args){
      let name=String(args.NAME);
      if(name in useStructs) return useStructs[name]['type'];
      else return '';
    }
    setStructMemberData(args){
      let name=String(args.NAME),member=String(args.MEMBER),data=String(args.DATA);
      if(name in useStructs) if(member in useStructs[name]['data']) useStructs[name]['data'][member]=data;
    }
    getStructMember(args){
      let name=String(args.NAME),member=String(args.MEMBER);
      if(name in useStructs) if(member in useStructs[name]['data']) return useStructs[name]['data'][member];
      else return '';
    }
    getStructMemberIndex(args){
      let name=String(args.NAME),index=Number(args.INDEX);
      if(name in useStructs){
        let members=Object.keys(useStructs[name]['data']);
        if(index<=members.length) return useStructs[name]['data'][members[index-1]];
        else return '';
      }
      else return '';
    }

    getStructListData(args){
      let type_=String(args.TYPE),name=String(args.NAME);
      if(type_=="type"){
        if(name in useStructLists) return useStructLists[name]['type'];
        return '';
      }else if(type_=='length'){
        if(name in useStructLists) return useStructLists[name]['data'].length;
        else return -1;
      }
    }
    structListPushData(args){
      let name=String(args.NAME),num=Number(args.NUM);
      if(name in useStructLists){
        let type=useStructLists[name]['type'],members=structs[type],json={};
        for(let i in members) json[members[i]]="";
        for(let i=0;i<num;i++) useStructLists[name]['data'].push(json);
      }
    }
    setStructListMemberData(args){
      let name=String(args.NAME),member=String(args.MEMBER),data=String(args.DATA),index=Number(args.INDEX);
      if(name in useStructLists) if(index<=useStructLists[name]['data'].length) if(member in useStructLists[name]['data'][index-1]) useStructLists[name]['data'][index-1][member]=data;
    }
    getStructListMember(args){
      let name=String(args.NAME),member=String(args.MEMBER),index=Number(args.INDEX);
      if(name in useStructLists) if(index<=useStructLists[name]['data'].length) if(member in useStructLists[name]['data'][index-1]) return useStructLists[name]['data'][index-1][member];
      else return '';
    }
    getStructListMemberIndex(args){
      let name=String(args.NAME),index=Number(args.INDEX),index2=Number(args.INDEX2);
      if(name in useStructLists) if(index<=useStructLists[name]['data'].length){
        let members=Object.keys(useStructLists[name]['data'][index-1]);
        if(index2<=members.length) return useStructLists[name]['data'][index-1][members[index2-1]];
        else return '';
      }
      else return '';
    }
    deleteStructListMember(args){
      let name=String(args.NAME),index=Number(args.INDEX);
      if(name in useStructLists) if(index<=useStructLists[name]['data'].length) delete useStructLists[name]['data'][index-1];
    }
    structListSort(args){
      let name=String(args.NAME),rule_arr=String(args.RULE).split(" ");
      if(name in useStructLists){
        let type=useStructLists[name]['type'],members=structs[type];
        if(members.length==rule_arr.length/3 && rule_arr.length%3==0){
          let rule_member=[],rule_type=[],rule_order=[];
          for(let i=0;i<rule_arr.length/3;i++){
            if(rule_arr[i*3+2]!='asc' && rule_arr[i*3+2]!='desc' && rule_arr[i*3+2]!='none' && rule_arr[i*3+1]!='num' && rule_arr[i*3+1]!='str') return ;
            else rule_member.push(rule_arr[i*3]),rule_type.push(rule_arr[i*3+1]),rule_order.push(rule_arr[i*3+2]);
          }
          let arr=useStructLists[name]['data'];
          function structListsort(rule_member,rule_type,rule_order){
            return(a,b)=>{
              for(let i=0;i<rule_member.length;i++){
                let key=rule_member[i],value=rule_order[i],type_=rule_type[i];
                console.log(key,value,type_,i);
                if(value=='none') continue;
                let cmp_;
                if(type_=='str'){
                  let aval=a[key],bval=b[key];
                  cmp_=(value=='asc' ?
                    aval<bval?-1 : aval>bval?1:0
                    : aval>bval?-1 : aval<bval?1:0
                  );
                }else{
                  let aval=isNaN(Number(a[key]))?0:Number(a[key]),
                      bval=isNaN(Number(b[key]))?0:Number(b[key]);
                  cmp_=(value=='asc' ? aval-bval : bval-aval);
                }
                if(cmp_!=0) return cmp_;
              }
              return 0;
            };
          };
          console.log(rule_member,rule_type,rule_order);
          let result=arr.sort(structListsort(rule_member,rule_type,rule_order));
          console.log(result);
          useStructLists[name]['data']=result;
        }
      }
    }
  }

  Scratch.extensions.register(new struct());
})(Scratch);
