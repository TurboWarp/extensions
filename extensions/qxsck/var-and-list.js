// Name: Variable and list
// ID: qxsckvarandlist
// Description: More blocks related to variables and lists.
// By: qxsck

(function (Scratch) {
  "use strict";
  const qxsckvarandlistIcon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI3OS45ODQzOSIgaGVpZ2h0PSI3OS45ODQzOSIgdmlld0JveD0iMCwwLDc5Ljk4NDM5LDc5Ljk4NDM5Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA5LjU2NDk1LC0xNDcuOTY0OTUpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PGc+PHBhdGggZD0iTTIzNy40NDIwNywxOTkuMzk1NTdjMCwtMTMuMDA4MTMgMTAuNTQ1MTEsLTIzLjU1Mzc3IDIzLjU1MzUsLTIzLjU1Mzc3YzEzLjAwODEzLDAgMjMuNTUzNzcsMTAuNTQ1NjQgMjMuNTUzNzcsMjMuNTUzNzdjMCwxMy4wMDgxMyAtMTAuNTQ1NjQsMjMuNTUzNzcgLTIzLjU1Mzc3LDIzLjU1Mzc3Yy0xMy4wMDg0MSwwIC0yMy41NTM3NywtMTAuNTQ1NjUgLTIzLjU1Mzc3LC0yMy41NTM3N3oiIGZpbGw9Im5vbmUiIHN0cm9rZS1vcGFjaXR5PSIwLjE1IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMTAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTIzNy42NDIwNywxOTkuNTk1NTdjMCwtMTMuMDA4MTMgMTAuNTQ1MTEsLTIzLjU1Mzc3IDIzLjU1MzUsLTIzLjU1Mzc3YzEzLjAwODEzLDAgMjMuNTUzNzcsMTAuNTQ1NjQgMjMuNTUzNzcsMjMuNTUzNzdjMCwxMy4wMDgxMyAtMTAuNTQ1NjQsMjMuNTUzNzcgLTIzLjU1Mzc3LDIzLjU1Mzc3Yy0xMy4wMDg0MSwwIC0yMy41NTM3NywtMTAuNTQ1NjUgLTIzLjU1Mzc3LC0yMy41NTM3N3oiIGZpbGw9IiNmZjhjMTkiIHN0cm9rZT0iI2RiNmUwMCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiPjxwYXRoIGQ9Ik0yNjQuMzU1NDMsMjA1LjY0MDgzbC02LjcyNTM5LC0xMS4zOTQ3OCIvPjxwYXRoIGQ9Ik0yNTUuMjY0MjUsMjA1LjA0OTE4bDExLjY1MzksLTEwLjgwMzEzIiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIvPjwvZz48cGF0aCBkPSJNMjcyLjAwNzE5LDE4Ni41NjAwNWMwLDAgNC42NzA1LDUuNDc1NTIgNC42MDIwMSwxMy4xMTQ2OGMtMC4wODIxOCw5LjE2Mjk0IC01LjM3OTkzLDEzLjMyMzk1IC01LjM3OTkzLDEzLjMyMzk1IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yNTAuODg2NjcsMjEyLjU3OTJjMCwwIC01LjI1MDU2LC00LjYxMTE2IC00Ljc3NTM2LC0xNC4xMzY3OWMwLjM5NjI0LC03Ljk0MTU0IDUuNTg0OTMsLTEzLjM3Nzk1IDUuNTg0OTMsLTEzLjM3Nzk1IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPjxnPjxwYXRoIGQ9Ik0yMTQuNTY1MjMsMTc2LjUxODcyYzAsLTEzLjAwODEzIDEwLjU0NTEsLTIzLjU1Mzc3IDIzLjU1Mzc3LC0yMy41NTM3N2MxMy4wMDgxMywwIDIzLjU1MzUsMTAuNTQ1NjUgMjMuNTUzNSwyMy41NTM3N2MwLDEzLjAwODEzIC0xMC41NDU2NSwyMy41NTM3OCAtMjMuNTUzNzcsMjMuNTUzNzhjLTEzLjAwODEzLDAgLTIzLjU1Mzc3LC0xMC41NDU2NSAtMjMuNTUzNzcsLTIzLjU1Mzc3eiIgZmlsbD0ibm9uZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMTUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMjE0LjU2NTIzLDE3Ni41MTg3MmMwLC0xMy4wMDgxMyAxMC41NDUxLC0yMy41NTM3NyAyMy41NTM3NywtMjMuNTUzNzdjMTMuMDA4MTMsMCAyMy41NTM1LDEwLjU0NTY1IDIzLjU1MzUsMjMuNTUzNzdjMCwxMy4wMDgxMyAtMTAuNTQ1NjUsMjMuNTUzNzggLTIzLjU1Mzc3LDIzLjU1Mzc4Yy0xMy4wMDgxMywwIC0yMy41NTM3NywtMTAuNTQ1NjUgLTIzLjU1Mzc3LC0yMy41NTM3N3oiIGZpbGw9IiNmZjY2MWEiIHN0cm9rZT0iI2U2NGQwMCIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0yNTEuMDA0NDEsMTc2LjMxMzE4aC0xNS4wNzQ2NE0yNTEuMDA0NDEsMTY1LjkxNjk3aC0xNS4wNzQ2NE0yMjUuNzA2ODgsMTY2LjA5MDI5aDAuNjkzMjZNMjI2LjQwMDE1LDE3Ni40ODY1aC0wLjY5MzI2TTIzNS45Mjk3NywxODYuNzA5MzhoMTUuMDc0NjRNMjI2LjQwMDE1LDE4Ni44ODI3aC0wLjY5MzI2IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPjxnIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PHBhdGggZD0iTTI1OC4zNTU2NCwxNjkuMzY5MzNoMjQuMjAyMzlNMjcwLjQ1Njg0LDE1Ny4yNjg3djI0LjIwMTg0IiBzdHJva2Utb3BhY2l0eT0iMC4xNSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEwIi8+PHBhdGggZD0iTTI1OC4zNTU2NCwxNjkuMzY5MzNoMjQuMjAyMzlNMjcwLjQ1Njg0LDE1Ny4yNjg3djI0LjIwMTg0IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNSIvPjwvZz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjozMC40MzUwNTAwMDAwMDAxMDM6MzIuMDM1MDUwMDAwMDAwMDEtLT4=";
  let openCaseSensitive = false;
  class VarAndList {
    constructor() {
      this.randomString = function (length) {
        let stringDict =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~`!@#$%^&*()_-+={[}}|:;<,>.?/";
        let result = "";
        for (let i = 0; i < length; i++) {
          let idx = Math.floor(Math.random() * stringDict.length);
          result += stringDict[idx];
        }
        return result;
      };
      this.sortFunc = function (data) {
        let arr = data.arr,
          order = data.order,
          length = data.arr.length;
        let left = data.range ? data.range[0] : 1,
          right = data.range ? data.range[1] : length;
        if (left < 1) left = 1;
        if (right > length) right = length;
        (left -= 1), (right -= 1);
        let list = arr.slice(left, right + 1);
        switch (order) {
          case "asc":
            list = list.map((val) => (isNaN(Number(val)) ? 0 : Number(val)));
            list.sort((a, b) => a - b);
            break;
          case "desc":
            list = list.map((val) => (isNaN(Number(val)) ? 0 : Number(val)));
            list.sort((a, b) => b - a);
            break;
          case "dictOrder":
            list = list.map((val) => String(val));
            list.sort();
            break;
          case "random":
            list.sort(function () {
              return 0.5 - Math.random();
            });
            break;
        }
        let list2 = arr.slice();
        return [
          ...list2.slice(0, left),
          ...list,
          ...list2.slice(right + 1, length),
        ];
      };
      this.isOrderFunc = function (arr, order) {
        if (order === "asc") {
          for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) return false;
          }
          return true;
        } else {
          for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] < arr[i + 1]) return false;
          }
          return true;
        }
      };
    }

    getInfo() {
      return {
        id: "qxsckvarandlist",
        name: Scratch.translate("Variable and list"),
        color1: "#ed6b00",
        color2: "#ed6b00",
        blockIconURI: qxsckvarandlistIcon,
        menuIconURI: qxsckvarandlistIcon,
        blocks: [
          //command,reporter,Boolean,hat,conditional,loop
          {
            opcode: "haveVar",
            blockType: "Boolean",
            text: Scratch.translate("have variable [VAR] ?"),
            arguments: {
              VAR: {
                type: "string",
                defaultValue: "variable",
              },
            },
          },
          {
            opcode: "getVar",
            blockType: "reporter",
            text: Scratch.translate("value of variable [VAR]"),
            arguments: {
              VAR: {
                type: "string",
                defaultValue: "variable",
              },
            },
          },
          {
            opcode: "setVar",
            blockType: "command",
            text: Scratch.translate("set variable [VAR] to [VALUE]"),
            arguments: {
              VAR: {
                type: "string",
                defaultValue: "variable",
              },
              VALUE: {
                type: "string",
                defaultValue: "value",
              },
            },
          },
          {
            opcode: "seriVarsToJson",
            blockType: "reporter",
            text: Scratch.translate(
              "convert all variables starting with [START] to json"
            ),
            arguments: {
              START: {
                type: "string",
                defaultValue: "variable",
              },
            },
          },
          {
            opcode: "swapVar",
            blockType: "command",
            text: Scratch.translate("swap variable [VAR] and [VAR2]"),
            arguments: {
              VAR: {
                type: "string",
                defaultValue: "variable1",
              },
              VAR2: {
                type: "string",
                defaultValue: "variable2",
              },
            },
          },

          "---",

          {
            opcode: "openCaseSensitive",
            blockType: "command",
            text: Scratch.translate("[CASE] case sensitive"),
            arguments: {
              CASE: {
                type: "string",
                menu: "openCaseSensitive.List",
              },
            },
          },
          {
            opcode: "haveList",
            blockType: "Boolean",
            text: Scratch.translate("have list [LIST] ?"),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
            },
          },
          {
            opcode: "emptyList",
            blockType: "Boolean",
            text: Scratch.translate("list [LIST] is empty?"),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
            },
          },
          {
            opcode: "length",
            blockType: "reporter",
            text: Scratch.translate("length of list [LIST]"),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
            },
          },
          {
            opcode: "getList",
            blockType: "reporter",
            text: Scratch.translate("value of list [LIST]"),
            hideFromPalette: true,
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
            },
          },
          {
            opcode: "newGetList",
            blockType: "reporter",
            text: Scratch.translate("values of list [LIST]"),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
            },
          },
          {
            opcode: "getListRange",
            blockType: "reporter",
            text: Scratch.translate(
              "values of from [LEFT] to [RIGHT] in list [LIST]"
            ),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
              LEFT: {
                type: "string",
                defaultValue: "1",
              },
              RIGHT: {
                type: "string",
                defaultValue: "2",
              },
            },
          },
          {
            opcode: "getValueOfList",
            blockType: "reporter",
            text: Scratch.translate("item # [INDEX] of list [LIST]"),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
              INDEX: {
                type: "string",
                defaultValue: "1",
              },
            },
          },
          {
            opcode: "seriListsToJson",
            blockType: "reporter",
            text: Scratch.translate(
              "convert all lists starting with [START] to json"
            ),
            arguments: {
              START: {
                type: "string",
                defaultValue: "list",
              },
            },
          },
          {
            opcode: "swapList",
            blockType: "command",
            text: Scratch.translate("swap list [LIST] and [LIST2]"),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list1",
              },
              LIST2: {
                type: "string",
                defaultValue: "list2",
              },
            },
          },
          {
            opcode: "clearList",
            blockType: "command",
            text: Scratch.translate("delete all of list [LIST]"),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
            },
          },
          {
            opcode: "setList",
            blockType: "command",
            text: Scratch.translate("set list [LIST] to list [LIST2]"),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
              LIST2: {
                type: "string",
                defaultValue: '["a","b"]',
              },
            },
          },
          {
            opcode: "setListValue",
            blockType: "command",
            text: Scratch.translate("set list [LIST] to [VALUE] [NUM] times"),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
              NUM: {
                type: "string",
                defaultValue: "5",
              },
              VALUE: {
                type: "string",
                defaultValue: "thing",
              },
            },
          },
          {
            opcode: "deleteOfList",
            blockType: "command",
            text: Scratch.translate("delete # [INDEX] of list [LIST]"),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
              INDEX: {
                type: "string",
                defaultValue: "1",
              },
            },
          },
          {
            opcode: "addValueInList",
            blockType: "command",
            text: Scratch.translate("add [VALUE] to list [LIST]"),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
              VALUE: {
                type: "string",
                defaultValue: "value",
              },
            },
          },
          {
            opcode: "addListToList",
            blockType: "command",
            text: Scratch.translate("add list [LIST2] to list [LIST]"),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
              LIST2: {
                type: "string",
                defaultValue: '["a","b"]',
              },
            },
          },
          {
            opcode: "insertOfList",
            blockType: "command",
            text: Scratch.translate(
              "insert [VALUE] before item # [INDEX] in the list [LIST]"
            ),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
              INDEX: {
                type: "string",
                defaultValue: "1",
              },
              VALUE: {
                type: "string",
                defaultValue: "thing",
              },
            },
          },
          {
            opcode: "insertListToList",
            blockType: "command",
            text: Scratch.translate(
              "insert list [LIST2] before item # [INDEX] in list [LIST]"
            ),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
              INDEX: {
                type: "string",
                defaultValue: "1",
              },
              LIST2: {
                type: "string",
                defaultValue: '["ark","os"]',
              },
            },
          },
          {
            opcode: "replaceOfList",
            blockType: "command",
            text: Scratch.translate(
              "replace item [INDEX] of list [LIST] to [VALUE]"
            ),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
              INDEX: {
                type: "string",
                defaultValue: "1",
              },
              VALUE: {
                type: "string",
                defaultValue: "thing",
              },
            },
          },
          {
            opcode: "replaceRangeOfList",
            blockType: "command",
            text: Scratch.translate(
              "replace items [LEFT] to [RIGHT] in list [LIST] with [VALUE]"
            ),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
              LEFT: {
                type: "string",
                defaultValue: "1",
              },
              RIGHT: {
                type: "string",
                defaultValue: "2",
              },
              VALUE: {
                type: "string",
                defaultValue: "thing",
              },
            },
          },
          {
            opcode: "getIndexOfList",
            blockType: "reporter",
            text: Scratch.translate("first index of [VALUE] in list [LIST]"),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
              VALUE: {
                type: "string",
                defaultValue: "thing",
              },
            },
          },
          {
            opcode: "getIndexesOfList",
            blockType: "reporter",
            text: Scratch.translate("indexes of [VALUE] in list [LIST]"),
            hideFromPalette: true,
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
              VALUE: {
                type: "string",
                defaultValue: "thing",
              },
            },
          },
          {
            opcode: "newGetIndexesOfList",
            blockType: "reporter",
            text: Scratch.translate("indexes of [VALUE] in list [LIST]"),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
              VALUE: {
                type: "string",
                defaultValue: "thing",
              },
            },
          },
          {
            opcode: "getCountsOfList",
            blockType: "reporter",
            text: Scratch.translate("number of [VALUE] in list [LIST]"),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
              VALUE: {
                type: "string",
                defaultValue: "thing",
              },
            },
          },
          {
            opcode: "listContains",
            blockType: "Boolean",
            text: Scratch.translate("list [LIST] have [VALUE] ?"),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
              VALUE: {
                type: "string",
                defaultValue: "thing",
              },
            },
          },
          {
            opcode: "copyList",
            blockType: "command",
            text: Scratch.translate("copy list [LIST1] to list [LIST2]"),
            arguments: {
              LIST1: {
                type: "string",
                defaultValue: "list1",
              },
              LIST2: {
                type: "string",
                defaultValue: "list2",
              },
            },
          },
          {
            opcode: "reverseList",
            blockType: "command",
            text: Scratch.translate("reverse list [LIST]"),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
            },
          },
          {
            opcode: "sortList",
            blockType: "command",
            text: Scratch.translate("sort list [LIST] with [CASE]"),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
              CASE: {
                type: "string",
                menu: "sortList.List",
              },
            },
          },
          {
            opcode: "sortListRange",
            blockType: "command",
            text: Scratch.translate(
              "sort item [LEFT] to [RIGHT] in list [LIST] with [CASE]"
            ),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
              CASE: {
                type: "string",
                menu: "sortList.List",
              },
              LEFT: {
                type: "string",
                defaultValue: "1",
              },
              RIGHT: {
                type: "string",
                defaultValue: "2",
              },
            },
          },
          {
            opcode: "isOrder",
            blockType: "Boolean",
            text: Scratch.translate("list [LIST] is [CASE] ?"),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list",
              },
              CASE: {
                type: "string",
                menu: "isOrder.List",
              },
            },
          },
          {
            opcode: "mapObject",
            blockType: "command",
            text: Scratch.translate(
              "map object [OBJ] , keys to list [LIST], and values to list [LIST2]"
            ),
            arguments: {
              OBJ: {
                type: "string",
                defaultValue: '{"name":"TruboWarp"}',
              },
              LIST: {
                type: "string",
                defaultValue: "list1",
              },
              LIST2: {
                type: "string",
                defaultValue: "list2",
              },
            },
          },
          {
            opcode: "associateList",
            blockType: "reporter",
            text: Scratch.translate(
              "associate list [LIST] to keys, and [LIST2] to values, if length is different, then [DO]"
            ),
            arguments: {
              LIST: {
                type: "string",
                defaultValue: "list1",
              },
              LIST2: {
                type: "string",
                defaultValue: "list2",
              },
              DO: {
                type: "string",
                menu: "associateList.List",
              },
            },
          },

          {
            opcode: "unSupportCompile",
            blockType: "label",
            text: Scratch.translate("⚠️Compilation not supported"),
            arguments: {},
          },

          {
            opcode: "forEach",
            blockType: "conditional",
            text: Scratch.translate(
              "⚠️for each variable [VAR] from [LEFT] to [RIGHT]"
            ),
            arguments: {
              VAR: {
                type: "string",
                defaultValue: "variable",
              },
              LEFT: {
                type: "string",
                defaultValue: "1",
              },
              RIGHT: {
                type: "string",
                defaultValue: "5",
              },
            },
          },
          {
            opcode: "forEachList",
            blockType: "conditional",
            text: Scratch.translate(
              "⚠️for each variable [VAR] in value of from [LEFT] to [RIGHT] in list [LIST]"
            ),
            arguments: {
              VAR: {
                type: "string",
                defaultValue: "variable",
              },
              LIST: {
                type: "string",
                defaultValue: "list",
              },
              LEFT: {
                type: "string",
                defaultValue: "1",
              },
              RIGHT: {
                type: "string",
                defaultValue: "5",
              },
            },
          },
        ],
        menus: {
          "openCaseSensitive.List": [
            {
              text: Scratch.translate("open"),
              value: "open",
            },
            {
              text: Scratch.translate("close"),
              value: "close",
            },
          ],
          "sortList.List": [
            {
              text: Scratch.translate("ascending"),
              value: "asc",
            },
            {
              text: Scratch.translate("descending"),
              value: "desc",
            },
            {
              text: Scratch.translate("dictionary order"),
              value: "dictOrder",
            },
            {
              text: Scratch.translate("random"),
              value: "random",
            },
          ],
          "isOrder.List": [
            {
              text: Scratch.translate("ascending"),
              value: "asc",
            },
            {
              text: Scratch.translate("descending"),
              value: "desc",
            },
          ],

          "associateList.List": [
            {
              text: Scratch.translate("complete the missing parts"),
              value: "c",
            },
            {
              text: Scratch.translate("delete the excess parts"),
              value: "d",
            },
          ],
        },
      };
    }

    haveVar(args, util) {
      const variable = util.target.lookupVariableByNameAndType(
        String(args.VAR),
        ""
      );
      return variable ? true : false;
    }
    getVar(args, util) {
      const variable = util.target.lookupVariableByNameAndType(
        String(args.VAR),
        ""
      );
      return variable ? variable.value : "";
    }
    setVar(args, util) {
      const variable = util.target.lookupVariableByNameAndType(
        String(args.VAR),
        ""
      );
      if (variable) {
        variable.value = args.VALUE;
      }
    }
    seriVarsToJson(args, util) {
      const start = String(args.START);
      const serialized = {};
      for (const variable of Object.values(
        util.runtime.getTargetForStage().variables
      )) {
        if (variable.type === "" && variable.name.startsWith(start)) {
          serialized[variable.name.replace(start, "")] = variable.value;
        }
      }
      for (const variable of Object.values(util.target.variables)) {
        if (variable.type === "" && variable.name.startsWith(start)) {
          serialized[variable.name.replace(start, "")] = variable.value;
        }
      }
      return JSON.stringify(serialized);
    }
    swapVar(args, util) {
      const variable = util.target.lookupVariableByNameAndType(
        String(args.VAR),
        ""
      );
      const variable2 = util.target.lookupVariableByNameAndType(
        String(args.VAR2),
        ""
      );
      if (variable && variable2) {
        let value = variable.value;
        variable.value = variable2.value;
        variable2.value = value;
      }
    }

    openCaseSensitive(args) {
      openCaseSensitive = args.CASE === "open" ? true : false;
    }
    haveList(args, util) {
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      return variable ? true : false;
    }
    emptyList(args, util) {
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      return variable ? (variable.value.length ? false : true) : true;
    }
    length(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      if (variable) {
        return variable.value.length;
      }
      return 0;
    }
    getList(args, util) {
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      return variable ? variable.value.toString() : "";
    }
    newGetList(args, util) {
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      return variable
        ? "[" +
            variable.value.map((value) => '"' + String(value) + '"').join(",") +
            "]"
        : "[]";
    }
    getListRange(args, util) {
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      if (variable) {
        let length = variable.value.length,
          left = Number(args.LEFT),
          right = Number(args.RIGHT);
        if (left < 1) left = 1;
        if (right > length) right = length;
        (left -= 1), (right -= 1);
        return (
          "[" +
          variable.value
            .slice(left, right + 1)
            .map((value) => '"' + String(value) + '"')
            .join(",") +
          "]"
        );
      }
      return "";
    }
    getValueOfList(args, util) {
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      if (!variable) return "";
      const index = String(args.INDEX);
      if (Number(index) <= variable.value.length && Number(index) >= 1) {
        return variable.value[index - 1];
      }
      return "";
    }
    seriListsToJson(args, util) {
      const start = String(args.START);
      const serialized = {};
      for (const variable of Object.values(
        util.runtime.getTargetForStage().variables
      )) {
        if (variable.type === "list" && variable.name.startsWith(start)) {
          serialized[variable.name.replace(start, "")] = variable.value;
        }
      }
      for (const variable of Object.values(util.target.variables)) {
        if (variable.type === "list" && variable.name.startsWith(start)) {
          serialized[variable.name.replace(start, "")] = variable.value;
        }
      }
      return JSON.stringify(serialized);
    }
    swapList(args, util) {
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      const variable2 = util.target.lookupVariableByNameAndType(
        String(args.LIST2),
        "list"
      );
      if (variable && variable2) {
        let value = variable.value;
        variable.value = variable2.value;
        variable2.value = value;
        variable._monitorUpToDate = false;
        variable2._monitorUpToDate = false;
      }
    }
    clearList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      if (variable) {
        variable.value = [];
        variable._monitorUpToDate = false;
      }
    }
    setList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      if (variable) {
        try {
          let arr = JSON.parse(args.LIST2);
          variable.value = arr;
          variable._monitorUpToDate = false;
        } catch (error) {
          console.log("error:", error);
        }
      }
    }
    setListValue(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      if (variable) {
        let val = String(args.VALUE),
          num = Number(args.NUM);
        variable.value = [];
        for (let i = 1; i <= num; i++) variable.value.push(val);
        variable._monitorUpToDate = false;
      }
    }
    deleteOfList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      if (variable) {
        const index = String(args.INDEX);
        if (index === "ALL") {
          variable.value = [];
        } else if (
          Number(index) <= variable.value.length &&
          Number(index) >= 1
        ) {
          variable.value.splice(Number(index) - 1, 1);
          variable._monitorUpToDate = false;
        }
      }
    }
    addValueInList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      if (variable) {
        variable.value.push(args.VALUE);
        variable._monitorUpToDate = false;
      }
    }
    addListToList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      if (variable) {
        try {
          let arr = JSON.parse(args.LIST2);
          for (let i = 0; i < arr.length; i++)
            variable.value.push(String(arr[i]));
          variable._monitorUpToDate = false;
        } catch (error) {
          console.log("error:", error);
        }
      }
    }
    insertOfList(args, util) {
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      const value = String(args.VALUE);
      const index =
        Number(args.INDEX) > variable.value.length
          ? variable.value.length + 1
          : Number(args.INDEX);
      variable.value.splice(index - 1, 0, value);
      variable._monitorUpToDate = false;
    }
    insertListToList(args, util) {
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      const index =
        Number(args.INDEX) > variable.value.length
          ? variable.value.length + 1
          : Number(args.INDEX);
      try {
        let arr = JSON.parse(args.LIST2).map(String);
        variable.value.splice(index - 1, 0, ...arr);
        variable._monitorUpToDate = false;
      } catch (error) {
        console.log("error:", error);
      }
    }
    replaceOfList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      if (variable) {
        const index = String(args.INDEX);
        if (Number(index) <= variable.value.length && Number(index) >= 1) {
          variable.value[index - 1] = String(args.VALUE);
          variable._monitorUpToDate = false;
        }
      }
    }
    replaceRangeOfList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      if (variable) {
        let length = variable.value.length,
          left = Number(args.LEFT),
          right = Number(args.RIGHT);
        if (left < 1) left = 1;
        if (right > length) right = length;
        (left -= 1), (right -= 1);
        for (let i = left; i <= right; i++)
          variable.value[i] = String(args.VALUE);
        variable._monitorUpToDate = false;
      }
    }
    getIndexOfList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      const value = String(args.VALUE);
      let flag = openCaseSensitive;
      if (variable) {
        for (let i = 0; i < variable.value.length; i++) {
          if (!flag) {
            if (Scratch.Cast.compare(variable.value[i], value) === 0)
              return i + 1;
          } else {
            if (String(variable.value[i]) == String(value)) return i + 1;
          }
        }
      }
      return 0;
    }
    getIndexesOfList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      const value = String(args.VALUE);
      let flag = openCaseSensitive;
      if (variable) {
        let indexes = [];
        for (let i = 0; i < variable.value.length; i++) {
          if (!flag) {
            if (Scratch.Cast.compare(variable.value[i], value) === 0)
              indexes.push(i + 1);
          } else {
            if (String(variable.value[i]) === String(value))
              indexes.push(i + 1);
          }
        }
        if (indexes.length > 0) return indexes.toString();
      }
      return "";
    }
    newGetIndexesOfList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      const value = String(args.VALUE);
      let flag = openCaseSensitive;
      if (variable) {
        let indexes = [];
        for (let i = 0; i < variable.value.length; i++) {
          if (!flag) {
            if (Scratch.Cast.compare(variable.value[i], value) === 0)
              indexes.push(i + 1);
          } else {
            if (String(variable.value[i]) === String(value))
              indexes.push(i + 1);
          }
        }
        if (indexes.length > 0)
          return (
            "[" +
            indexes.map((value) => '"' + String(value) + '"').join(",") +
            "]"
          );
      }
      return "[]";
    }
    getCountsOfList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      const value = String(args.VALUE);
      let flag = openCaseSensitive;
      if (variable) {
        let indexes = [];
        for (let i = 0; i < variable.value.length; i++) {
          if (!flag) {
            if (Scratch.Cast.compare(variable.value[i], value) === 0)
              indexes.push(i + 1);
          } else {
            if (String(variable.value[i]) === String(value))
              indexes.push(i + 1);
          }
        }
        return indexes.length;
      }
      return 0;
    }
    listContains(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      const value = String(args.VALUE);
      let flag = openCaseSensitive;
      if (variable) {
        for (let i = 0; i < variable.value.length; i++) {
          if (!flag) {
            if (Scratch.Cast.compare(variable.value[i], value) === 0)
              return true;
          } else {
            if (String(variable.value[i]) === String(value)) return false;
          }
        }
        return false;
      }
      return false;
    }
    copyList(args, util) {
      /** @type {VM.ListVariable} */
      const list1 = util.target.lookupVariableByNameAndType(
        String(args.LIST1),
        "list"
      );
      const list2 = util.target.lookupVariableByNameAndType(
        String(args.LIST2),
        "list"
      );
      if (list1 && list2) {
        list2.value = list1.value.slice();
        list2._monitorUpToDate = false;
      }
    }
    reverseList(args, util) {
      /** @type {VM.ListVariable} */
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      if (variable) {
        let list = variable.value.slice();
        list.reverse();
        variable.value = list;
        variable._monitorUpToDate = false;
      }
    }
    sortList(args, util) {
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      if (variable) {
        let order = args.CASE;
        variable.value = this.sortFunc({ arr: variable.value, order: order });
        variable._monitorUpToDate = false;
      }
    }
    sortListRange(args, util) {
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      if (variable) {
        let order = args.CASE,
          left = Number(args.LEFT),
          right = Number(args.RIGHT);
        variable.value = this.sortFunc({
          arr: variable.value,
          order: order,
          range: [left, right],
        });
        variable._monitorUpToDate = false;
      }
    }
    isOrder(args, util) {
      const variable = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      if (variable) {
        let order = args.CASE;
        return this.isOrderFunc(variable.value, order);
      }
      return false;
    }
    mapObject(args, util) {
      const list = util.target.lookupVariableByNameAndType(
          String(args.LIST),
          "list"
        ),
        list2 = util.target.lookupVariableByNameAndType(
          String(args.LIST2),
          "list"
        );
      if (list && list2) {
        try {
          let object = JSON.parse(args.OBJ);
          list.value = Object.keys(object);
          list2.value = Object.values(object);
          list._monitorUpToDate = false;
          list2._monitorUpToDate = false;
        } catch (error) {
          console.log("error:", error);
        }
      }
    }
    associateList(args, util) {
      const list = util.target.lookupVariableByNameAndType(
          String(args.LIST),
          "list"
        ),
        list2 = util.target.lookupVariableByNameAndType(
          String(args.LIST2),
          "list"
        );
      if (list && list2) {
        let object = {};
        let length =
          args.DO === "d"
            ? Math.min(list.value.length, list2.value.length)
            : Math.max(list.value.length, list2.value.length);
        for (let i = 0; i < length; i++) {
          let key =
            list.value.length <= i
              ? "key" + this.randomString(10)
              : list.value[i];
          let val = list2.value.length <= i ? "" : list2.value[i];
          object[key] = val;
        }
        return JSON.stringify(object);
      } else return "{}";
    }

    forEach(args, util) {
      const variable = util.target.lookupVariableByNameAndType(
        String(args.VAR),
        ""
      );
      if (variable) {
        let left = Number(args.LEFT),
          right = Number(args.RIGHT);
        let range = right - left + 1;
        if (typeof util.stackFrame.index === "undefined") {
          util.stackFrame.index = 0;
        }

        if (util.stackFrame.index < range) {
          util.stackFrame.index++;
          variable.value = util.stackFrame.index + left - 1;
          util.startBranch(1, true);
        }
      }
    }
    forEachList(args, util) {
      const variable = util.target.lookupVariableByNameAndType(
        String(args.VAR),
        ""
      );
      const list = util.target.lookupVariableByNameAndType(
        String(args.LIST),
        "list"
      );
      if (variable && list) {
        let left = Number(args.LEFT) > 0 ? Number(args.LEFT) : 1,
          right =
            Number(args.RIGHT) <= list.value.length
              ? Number(args.RIGHT)
              : list.value.length;
        let range = right - left + 1;
        if (typeof util.stackFrame.index === "undefined") {
          util.stackFrame.index = 0;
        }

        if (util.stackFrame.index < range) {
          util.stackFrame.index++;
          variable.value = list.value[util.stackFrame.index + left - 2];
          util.startBranch(1, true);
        }
      }
    }
  }
  Scratch.extensions.register(new VarAndList());
})(Scratch);
