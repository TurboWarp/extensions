(function(Scratch){
  "use strict";

  const Icon="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI3OS41IiBoZWlnaHQ9Ijc5LjUiIHZpZXdCb3g9IjAsMCw3OS41LDc5LjUiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMDAuMjUsLTE0MC4yNSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjAwLjI1LDE4MGMwLC0yMS45NTMzMiAxNy43OTY2OCwtMzkuNzUgMzkuNzUsLTM5Ljc1YzIxLjk1MzMyLDAgMzkuNzUsMTcuNzk2NjggMzkuNzUsMzkuNzVjMCwyMS45NTMzMiAtMTcuNzk2NjgsMzkuNzUgLTM5Ljc1LDM5Ljc1Yy0yMS45NTMzMiwwIC0zOS43NSwtMTcuNzk2NjggLTM5Ljc1LC0zOS43NXoiIGZpbGw9IiMwZTdiZWQiIHN0cm9rZT0iIzU5YzBlYiIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMi41Ij48cGF0aCBkPSJNMjIxLjg1OTM2LDE4OC44NjM3NGw3LjEzNTQsLTQuMTgzMDgiIHN0cm9rZT0iIzU5YzBlYiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTIyMi4wMTk4MiwxODkuNDIxMzRjMS45ODU2NSwzLjM4NzA4IDAuODQ5NTcsNy43NDI1NCAtMi41Mzc1MSw5LjcyODJjLTMuMzg3MDgsMS45ODU2NSAtNy43NDI1NSwwLjg0OTU3IC05LjcyODIsLTIuNTM3NTFjLTEuOTg1NjUsLTMuMzg3MDggLTAuODQ5NTcsLTcuNzQyNTQgMi41Mzc1MSwtOS43MjgyYzMuMzg3MDgsLTEuOTg1NjUgNy43NDI1NSwtMC44NDk1NyA5LjcyODIsMi41Mzc1MXoiIHN0cm9rZT0iI2ViNTk1OSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48L2c+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNTljMGViIiBzdHJva2Utd2lkdGg9IjIuNSI+PHBhdGggZD0iTTIzOS45OTc5NCwxNTguNTA0ODd2OC4yNzExNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTIzMi44MTM1NiwxNTEuMzA3NTJjMCwtMy45Njc4MyAzLjIxNjU2LC03LjE4NDM5IDcuMTg0MzksLTcuMTg0MzljMy45Njc4MiwwIDcuMTg0MzgsMy4yMTY1NiA3LjE4NDM4LDcuMTg0MzljMCwzLjk2NzgzIC0zLjIxNjU2LDcuMTg0MzggLTcuMTg0MzgsNy4xODQzOGMtMy45Njc4MiwwIC03LjE4NDM5LC0zLjIxNjU2IC03LjE4NDM5LC03LjE4NDM4eiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48L2c+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyLjUiPjxwYXRoIGQ9Ik0yNTguMTQwNjQsMTg4Ljg2Mzc0bC03LjEzNTQsLTQuMTgzMDgiIHN0cm9rZT0iIzU5YzBlYiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTI2Ny43MDgzOCwxODYuODgzODNjMy4zODcwOCwxLjk4NTY1IDQuNTIzMTYsNi4zNDExMSAyLjUzNzUxLDkuNzI4MmMtMS45ODU2NSwzLjM4NzA4IC02LjM0MTEyLDQuNTIzMTYgLTkuNzI4MiwyLjUzNzUxYy0zLjM4NzA4LC0xLjk4NTY1IC00LjUyMzE2LC02LjM0MTExIC0yLjUzNzUxLC05LjcyODJjMS45ODU2NSwtMy4zODcwOCA2LjM0MTExLC00LjUyMzE2IDkuNzI4MiwtMi41Mzc1MXoiIHN0cm9rZT0iIzZmZWI1OSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48L2c+PGcgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiPjxnIGZpbGw9IiM4YmQ3ZjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PGc+PHBhdGggZD0iTTI0MS45NTUxNywxNjMuMjQ5MTRsMC45MDUxOCwzLjUxMjA3bDMuNDM5NjUsMS41OTMxbC0xLjYyOTMxLDIuODk2NTVsLTkuNjY3MjQsLTAuMTA4NjJsLTEuMzAzNDUsLTIuODk2NTVsMy40NzU4NiwtMS40NDgyN2wwLjg2ODk3LC0zLjU0ODI4eiIvPjxwYXRoIGQ9Ik0yMzguMDQ0ODIsMTk2Ljc1MDg2bC0wLjg2ODk3LC0zLjU0ODI3bC0zLjQ3NTg2LC0xLjQ0ODI3bDEuMzAzNDUsLTIuODk2NTVsOS42NjcyNCwtMC4xMDg2MmwxLjYyOTMxLDIuODk2NTVsLTMuNDM5NjUsMS41OTMxbC0wLjkwNTE4LDMuNTEyMDd6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIvPjwvZz48Zz48cGF0aCBkPSJNMjIzLjI0OTE0LDE3OC4wNDQ4M2wzLjUxMjA3LC0wLjkwNTE4bDEuNTkzMSwtMy40Mzk2NmwyLjg5NjU1LDEuNjI5MzFsLTAuMTA4NjIsOS42NjcyNGwtMi44OTY1NSwxLjMwMzQ1bC0xLjQ0ODI3LC0zLjQ3NTg2bC0zLjU0ODI4LC0wLjg2ODk3eiIvPjxwYXRoIGQ9Ik0yNTYuNzUwODYsMTgxLjk1NTE3bC0zLjU0ODI3LDAuODY4OTdsLTEuNDQ4MjcsMy40NzU4NmwtMi44OTY1NSwtMS4zMDM0NWwtMC4xMDg2MiwtOS42NjcyNGwyLjg5NjU1LC0xLjYyOTMxbDEuNTkzMSwzLjQzOTY2bDMuNTEyMDcsMC45MDUxOHoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9Ii8+PC9nPjxnPjxwYXRoIGQ9Ik0yNTMuMjI3MTYsMTY5LjUzNzg3bC0xLjg0MzM1LDMuMTIzNDZsMS4zMDU3MSwzLjU1ODdsLTMuMjAwMjcsMC44OTYwN2wtNi43NTg5NywtNi45MTI1OGwxLjEyNjQ5LC0yLjk2OTg1bDMuNDgxODksMS40MzM3MmwzLjEyMzQ2LC0xLjg5NDU2eiIvPjxwYXRoIGQ9Ik0yMjYuNzcyODMsMTkwLjQ2MjEzbDEuODk0NTYsLTMuMTIzNDZsLTEuNDMzNzIsLTMuNDgxODlsMi45Njk4NSwtMS4xMjY0OWw2LjkxMjU4LDYuNzU4OTdsLTAuODk2MDgsMy4yMDAyN2wtMy41NTg3LC0xLjMwNTcxbC0zLjEyMzQ2LDEuODQzMzV6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIvPjwvZz48Zz48cGF0aCBkPSJNMjI5LjUzNzg3LDE2Ni43NzI4NGwzLjEyMzQ2LDEuODQzMzVsMy41NTg3LC0xLjMwNTcxbDAuODk2MDgsMy4yMDAyN2wtNi45MTI1OCw2Ljc1ODk3bC0yLjk2OTg1LC0xLjEyNjQ5bDEuNDMzNzIsLTMuNDgxODlsLTEuODk0NTYsLTMuMTIzNDZ6Ii8+PHBhdGggZD0iTTI1MC40NjIxMywxOTMuMjI3MTZsLTMuMTIzNDYsLTEuODk0NTZsLTMuNDgxODksMS40MzM3MmwtMS4xMjY0OSwtMi45Njk4NWw2Ljc1ODk3LC02LjkxMjU4bDMuMjAwMjcsMC44OTYwN2wtMS4zMDU3MSwzLjU1ODdsMS44NDMzNSwzLjEyMzQ2eiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iLz48L2c+PC9nPjxnIHN0cm9rZS1saW5lY2FwPSJidXR0Ij48cGF0aCBkPSJNMjI5LjQ1NDE1LDE3OS43YzAsLTUuODI0MzEgNC43MjE1NCwtMTAuNTQ1ODUgMTAuNTQ1ODUsLTEwLjU0NTg1YzUuODI0MzEsMCAxMC41NDU4NCw0LjcyMTU0IDEwLjU0NTg0LDEwLjU0NTg1YzAsNS44MjQzMSAtNC43MjE1NCwxMC41NDU4NSAtMTAuNTQ1ODQsMTAuNTQ1ODVjLTUuODI0MzEsMCAtMTAuNTQ1ODUsLTQuNzIxNTMgLTEwLjU0NTg1LC0xMC41NDU4NXoiIGZpbGw9IiM1OWMwZWIiLz48cGF0aCBkPSJNMjMxLjk4MDcyLDE3OS43YzAsLTQuNDI4OTIgMy41OTAzNiwtOC4wMTkyOCA4LjAxOTI4LC04LjAxOTI4YzQuNDI4OTIsMCA4LjAxOTI4LDMuNTkwMzUgOC4wMTkyOCw4LjAxOTI4YzAsNC40Mjg5MiAtMy41OTAzNSw4LjAxOTI4IC04LjAxOTI4LDguMDE5MjhjLTQuNDI4OTIsMCAtOC4wMTkyOCwtMy41OTAzNSAtOC4wMTkyOCwtOC4wMTkyOHoiIGZpbGw9IiNmZmZmZmYiLz48L2c+PC9nPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjM5Ljc1OjM5Ljc1LS0+";

  let structs=Object.create(null);
  let useStructs=Object.create(null);
  let useStructLists=Object.create(null);

  Scratch.translate.setup({
    'en':{
      'struct_name':'Easily struct',

      'clearAllStructTypes':'clear all struct types',
      'clearAllStructs':'clear all structs',
      'clearAllStructLists':'clear all struct lists',

      'setStructType':'set struct type,name = [NAME] , members = [MEMBERS]',
      'setStruct':'set struct,name = [NAME] , type = [TYPE]',
      'setStructList':'set struct list,name = [NAME] , type = [TYPE]',
      'getLengthofStructType':'length of members in struct type [NAME]',
      'deleteStructType':'delete struct type [NAME]',
      'deleteStruct':'delete struct [NAME]',
      'deleteStructList':'delete struct list [NAME]',

      'checkHaveStructType':'have struct type [NAME] ?',
      'checkHaveStruct':'have struct [NAME] ?',
      'checkHaveStructList':'have struct list [NAME] ?',
      'checkHaveStructTypeMember':'struct type [NAME] have member [MEMBER] ?',
      'checkHaveStructMember':'struct [NAME] have member [MEMBER] ?',
      'checkHaveStructListMember':'struct list [NAME] have member [MEMBER] ?',

      'getStructType':'type in struct [NAME]',
      'setStructMemberData':'set member [MEMBER] in struct [NAME] to [DATA]',
      'getStructMember':'member [MEMBER] in struct [NAME]',
      'getStructMemberIndex':'item [INDEX] of members in struct [NAME]',

      'getStructListType':'type in struct list [NAME]',
      'getStructListLength':'length of struct list [NAME]',
      'getStructListPushData':'push [NUM] none datas to struct list [NAME]',

      'setStructListMemberData':'set item [INDEX] of member [MEMBER] in struct list [NAME] to [DATA]',
      'getStructListMember':'item [INDEX] of member [MEMBER] in struct list [NAME]',
      'getStructListMemberIndex':'item [INDEX2] of the [INDEX] member in the struct list [NAME]',
      'deleteStructListMember':'delete item [INDEX] in struct list [NAME]',
    },
    'zh': {
      'struct_name':'简易结构体',

      'clearAllStructTypes':'清空所有结构体类型',
      'clearAllStructs':'清空所有结构体',
      'clearAllStructLists':'清空所有结构体列表',

      'setStructType':'设置结构体类型，类型名称 = [NAME] ，成员 = [MEMBERS]',
      'setStruct':'设置结构体，结构体名称 = [NAME] ，结构体类型名称 = [TYPE]',
      'setStructList':'设置结构体列表，结构体列表名称 = [NAME] ，结构体类型名称 = [TYPE]',
      'getLengthofStructType':'结构体类型 [NAME] 的成员数量',
      'deleteStructType':'删除结构体类型 [NAME]',
      'deleteStruct':'删除结构体 [NAME]',
      'deleteStructList':'设删除结构体列表 [NAME]',

      'checkHaveStructType':'存在结构体类型 [NAME] ？',
      'checkHaveStruct':'存在结构体 [NAME] ？',
      'checkHaveStructList':'存在结构体列表 [NAME] ？',
      'checkHaveStructTypeMember':'结构体类型 [NAME] 存在成员 [MEMBER] ？',
      'checkHaveStructMember':'结构体 [NAME] 存在成员 [MEMBER] ？',
      'checkHaveStructListMember':'结构体列表 [NAME] 存在成员 [MEMBER] ？',

      'getStructType':'结构体 [NAME] 的类型',
      'setStructMemberData':'设置结构体 [NAME] 的成员 [MEMBER] 的数据为 [DATA]',
      'getStructMember':'结构体 [NAME] 的成员 [MEMBER]',
      'getStructMemberIndex':'结构体 [NAME] 的第 [INDEX] 个成员',

      'getStructListType':'结构体列表 [NAME] 的类型',
      'getStructListLength':'结构体列表 [NAME] 的长度',
      'getStructListPushData':'结构体列表 [NAME] 增加 [NUM] 项空白项',

      'setStructListMemberData':'设置结构体列表 [NAME] 的第 [INDEX] 项的成员 [MEMBER] 的数据为 [DATA]',
      'getStructListMember':'结构体列表 [NAME] 的第 [INDEX] 项的成员 [MEMBER]',
      'getStructListMemberIndex':'结构体列表 [NAME] 的第 [INDEX] 项的第 [INDEX2] 个成员',
      'deleteStructListMember':'删除结构体列表 [NAME] 的第 [INDEX] 项',
    },
  });

  class struct {
    getInfo() {
      return {
      id: "qxsckeasilystruct",
      name: Scratch.translate({id: "struct_name",default: "Easily struct"}),
      color1: '#0e7bed',
      color2: '#0e7bed',
      blockIconURI: Icon,
      menuIconURI: Icon,
        blocks: [
          //command,reporter,Boolean,hat
          {
            opcode: "clearAllStructTypes",
            blockType: 'command',
            text: Scratch.translate({id: "clearAllStructTypes",default: "clear all struct types"}),
            arguments: {},
          },
          {
            opcode: "clearAllStructs",
            blockType: 'command',
            text: Scratch.translate({id: "clearAllStructs",default: "clear all structs"}),
            arguments: {},
          },
          {
            opcode: "clearAllStructLists",
            blockType: 'command',
            text: Scratch.translate({id: "clearAllStructLists",default: "clear all struct lists"}),
            arguments: {},
          },

          '---',

          {
            opcode: "setStructType",
            blockType: 'command',
            text: Scratch.translate({id: "setStructType",default: "set struct type,name = [NAME],members = [MEMBERS]"}),
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
            text: Scratch.translate({id: "setStruct",default: "set struct,name = [NAME],type = [TYPE]"}),
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
            text: Scratch.translate({id: "setStructList",default: "set struct list,name = [NAME],type = [TYPE]"}),
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
            opcode: "getLengthofStructType",
            blockType: 'reporter',
            text: Scratch.translate({id: "getLengthofStructType",default: "length of members in struct type [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct_'
              },
            },
          },
          {
            opcode: "deleteStructType",
            blockType: 'command',
            text: Scratch.translate({id: "deleteStructType",default: "delete struct type [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct_'
              },
            },
          },
          {
            opcode: "deleteStruct",
            blockType: 'command',
            text: Scratch.translate({id: "deleteStruct",default: "delete struct [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct'
              },
            },
          },
          {
            opcode: "deleteStructList",
            blockType: 'command',
            text: Scratch.translate({id: "deleteStructList",default: "delete struct list [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'structList'
              },
            },
          },

          '---',

          {
            opcode: "checkHaveStructType",
            blockType: 'Boolean',
            text: Scratch.translate({id: "checkHaveStructType",default: "have struct type [NAME] ?"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct_'
              },
            },
          },
          {
            opcode: "checkHaveStruct",
            blockType: 'Boolean',
            text: Scratch.translate({id: "checkHaveStruct",default: "have struct [NAME] ?"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct'
              },
            },
          },
          {
            opcode: "checkHaveStructList",
            blockType: 'Boolean',
            text: Scratch.translate({id: "checkHaveStructList",default: "have struct list [NAME] ?"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'structList'
              },
            },
          },
          {
            opcode: "checkHaveStructTypeMember",
            blockType: 'Boolean',
            text: Scratch.translate({id: "checkHaveStructTypeMember",default: "struct type [NAME] have member [MEMBER] ?"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'struct_'
              },
              MEMBER: {
                type: 'string',
                defaultValue: 'mem1'
              },
            },
          },
          {
            opcode: "checkHaveStructMember",
            blockType: 'Boolean',
            text: Scratch.translate({id: "checkHaveStructMember",default: "struct [NAME] have member [MEMBER] ?"}),
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
            opcode: "checkHaveStructListMember",
            blockType: 'Boolean',
            text: Scratch.translate({id: "checkHaveStructListMember",default: "struct list [NAME] have member [MEMBER] ?"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'structList'
              },
              MEMBER: {
                type: 'string',
                defaultValue: 'mem1'
              },
            },
          },

          '---',



          '---',

          {
            opcode: "getStructType",
            blockType: 'reporter',
            text: Scratch.translate({id: "getStructType",default: "type in struct [NAME]"}),
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
            text: Scratch.translate({id: "setStructMemberData",default: "set member [MEMBER] in struct [NAME] to [DATA]"}),
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
            text: Scratch.translate({id: "getStructMember",default: "member [MEMBER] in struct [NAME]"}),
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
            text: Scratch.translate({id: "getStructMemberIndex",default: "item [INDEX] of members in struct [NAME]"}),
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
            opcode: "getStructListType",
            blockType: 'reporter',
            text: Scratch.translate({id: "getStructListType",default: "type in struct list [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'structList'
              },
            },
          },
          {
            opcode: "getStructListLength",
            blockType: 'reporter',
            text: Scratch.translate({id: "getStructListLength",default: "length of struct list [NAME]"}),
            arguments: {
              NAME: {
                type: 'string',
                defaultValue: 'structList'
              },
            },
          },
          {
            opcode: "getStructListPushData",
            blockType: 'command',
            text: Scratch.translate({id: "getStructListPushData",default: "push [NUM] datas to struct list [NAME]"}),
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
            text: Scratch.translate({id: "setStructListMemberData",default: "set item [INDEX] of member [MEMBER] in struct list [NAME] to [DATA]"}),
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
            text: Scratch.translate({id: "getStructListMember",default: "item [INDEX] of member [MEMBER] in struct list [NAME]"}),
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
            text: Scratch.translate({id: "getStructListMemberIndex",default: "item [INDEX2] of the [INDEX] member in the struct list [NAME]"}),
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
            text: Scratch.translate({id: "deleteStructListMember",default: "delete item [INDEX] in struct list [NAME]"}),
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
        ],
      };
    }

    clearAllStructTypes(){
      structs=Object.create(null);
    }
    clearAllStructs(){
      useStructs=Object.create(null);
    }
    clearAllStructs(){
      useStructLists=Object.create(null);
    }

    setStructType(args){
      var name=String(args.NAME),members=String(args.MEMBERS).split(' ');
      if(name in structs){
      }else{
        var flag=0,v={};
        for(var i in members){
          if(v[members[i]]) flag=1;
          v[members[i]] = true;
        }
        if(flag==0){
          structs[name]=members;
        }
      }
    }
    setStruct(args){
      var name=String(args.NAME),type=String(args.TYPE);
      if(name in useStructs){
      }else{
        if(type in structs){
          var members=structs[type];
          var json={"type":type,"data":{}};
          for(var i in members) json['data'][members[i]]="";
          useStructs[name]=json;
        }
      }
    }
    setStructList(args){
      var name=String(args.NAME),type=String(args.TYPE);
      if(name in useStructLists){
      }else{
        if(type in structs){
          var members=structs[type];
          var json={"type":type,"members":members,"data":[]};
          useStructLists[name]=json;
        }
      }
    }
    getLengthofStructType(args){
      var name=String(args.NAME);
      if(name in structs) return structs[name].length;
    }
    deleteStructType(args){
      var name=String(args.NAME);
      if((name in structs)) delete structs[name];
    }
    deleteStruct(args){
      var name=String(args.NAME);
      if((name in useStructs)) delete useStructs[name];
    }
    deleteStructList(args){
      var name=String(args.NAME);
      if((name in useStructLists)) delete useStructLists[name];
    }

    checkHaveStructType(args){
      var name=String(args.NAME);
      return (name in structs);
    }
    checkHaveStruct(args){
      var name=String(args.NAME);
      return (name in useStructs);
    }
    checkHaveStructList(args){
      var name=String(args.NAME);
      return (name in useStructLists);
    }
    checkHaveStructTypeMember(args){
      var name=String(args.NAME),member=String(args.MEMBER);
      if(name in structs) return (structs[name].indexOf(member)>-1);
      else return false;
    }
    checkHaveStructMember(args){
      var name=String(args.NAME),member=String(args.MEMBER);
      if(name in useStructs) return (member in useStructs[name]['data']);
      else return false;
    }
    checkHaveStructListMember(args){
      var name=String(args.NAME),member=String(args.MEMBER);
      if(name in useStructLists) return (useStructLists[name]['members'].indexOf(member)>-1);
      else return false;
    }

    getStructType(args){
      var name=String(args.NAME);
      if(name in useStructs) return useStructs[name]['type'];
      else return '';
    }
    setStructMemberData(args){
      var name=String(args.NAME),member=String(args.MEMBER),data=String(args.DATA);
      if(name in useStructs) if(member in useStructs[name]['data']) useStructs[name]['data'][member]=data;
    }
    getStructMember(args){
      var name=String(args.NAME),member=String(args.MEMBER);
      if(name in useStructs) if(member in useStructs[name]['data']) return useStructs[name]['data'][member];
      else return '';
    }
    getStructMemberIndex(args){
      var name=String(args.NAME),index=Number(args.INDEX);
      if(name in useStructs){
        var members=Object.keys(useStructs[name]['data']);
        if(index<=members.length) return useStructs[name]['data'][members[index-1]];
        else return '';
      }
      else return '';
    }

    getStructListType(args){
      var name=String(args.NAME);
      if(name in useStructLists) return useStructLists[name]['type'];
      return '';
    }
    getStructListLength(args){
      var name=String(args.NAME);
      if(name in useStructLists) return useStructLists[name]['data'].length;
      else return -1;
    }
    getStructListPushData(args){
      var name=String(args.NAME),num=Number(args.NUM);
      if(name in useStructLists){
        var type=useStructLists[name]['type'],members=structs[type],json={};
        for(var i in members) json[members[i]]="";
        for(var i=0;i<num;i++) useStructLists[name]['data'].push(json);
      }
    }
    setStructListMemberData(args){
      var name=String(args.NAME),member=String(args.MEMBER),data=String(args.DATA),index=Number(args.INDEX);
      if(name in useStructLists) if(index<=useStructLists[name]['data'].length) if(member in useStructLists[name]['data'][index-1]) useStructLists[name]['data'][index-1][member]=data;
    }
    getStructListMember(args){
      var name=String(args.NAME),member=String(args.MEMBER),index=Number(args.INDEX);
      if(name in useStructLists) if(index<=useStructLists[name]['data'].length) if(member in useStructLists[name]['data'][index-1]) return useStructLists[name]['data'][index-1][member];
      else return '';
    }
    getStructListMemberIndex(args){
      var name=String(args.NAME),index=Number(args.INDEX),index2=Number(args.INDEX2);
      if(name in useStructLists) if(index<=useStructLists[name]['data'].length){
        var members=Object.keys(useStructLists[name]['data'][index-1]);
        if(index2<=members.length) return useStructLists[name]['data'][index-1][members[index2-1]];
        else return '';
      }
      else return '';
    }
    deleteStructListMember(args){
      var name=String(args.NAME),index=Number(args.INDEX);
      if(name in useStructLists) if(index<=useStructLists[name]['data'].length) delete useStructLists[name]['data'][index-1];
      else return '';
    }
  }

  Scratch.extensions.register(new struct());
})(Scratch);
