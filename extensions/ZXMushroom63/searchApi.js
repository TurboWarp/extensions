// Name: Search Params
// ID: zxmushroom63searchparams
// Description: Interact with URL search parameters: the part of the URL after a question mark.
// By: ZXMushroom63

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("SearchParams must be run unsandboxed.");
  }

  class SearchApi {
    getInfo() {
      return {
        id: "zxmushroom63searchparams",
        name: "Search Params",
        color1: "#b4b4b4",
        color2: "#9c9c9c",
        color3: "#646464",
        blocks: [
          {
            opcode: "searchparam",
            blockType: Scratch.BlockType.REPORTER,
            text: "value of search parameter [ID]",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "x",
              },
            },
          },
          {
            opcode: "occurencesofsearchparam",
            blockType: Scratch.BlockType.REPORTER,
            text: "occurences of search parameter [ID]",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "x",
              },
            },
          },
          {
            opcode: "indexedsearchparam",
            blockType: Scratch.BlockType.REPORTER,
            text: "index [I] of search parameters [ID]",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "x",
              },
              I: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "setsearchparam",
            blockType: Scratch.BlockType.COMMAND,
            text: "set search parameter [ID] to [VAL]",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "x",
              },
              VAL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "15",
              },
            },
          },
          {
            opcode: "deletesearchparam",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete search parameter [ID]",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "x",
              },
            },
          },
          {
            opcode: "appendsearchparam",
            blockType: Scratch.BlockType.COMMAND,
            text: "append search parameter [ID] with value [VAL]",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "x",
              },
              VAL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "15",
              },
            },
          },
          {
            opcode: "hassearchparam",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "has search parameter [ID]",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "x",
              },
            },
          },
          {
            opcode: "searchparamslength",
            blockType: Scratch.BlockType.REPORTER,
            text: "length of search parameters",
          },
          {
            opcode: "searchparamatindex",
            blockType: Scratch.BlockType.REPORTER,
            text: "search parameter [PARAM] at index [I]",
            arguments: {
              PARAM: {
                type: Scratch.ArgumentType.STRING,
                menu: "PARAM",
              },
              I: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
        ],
        menus: {
          PARAM: {
            acceptReporters: true,
            items: ["value", "name"],
          },
        },
      };
    }

    searchparam({ ID }) {
      return new URLSearchParams(location.search).get(ID.toString()) || "";
    }

    occurencesofsearchparam({ ID }) {
      return (
        new URLSearchParams(location.search).getAll(ID.toString()).length || 0
      );
    }

    indexedsearchparam({ ID, I }) {
      return (
        new URLSearchParams(location.search).getAll(ID.toString())[
          parseInt(I) - 1
        ] || ""
      );
    }

    setsearchparam({ ID, VAL }) {
      var s = new URLSearchParams(location.search);
      s.set(ID.toString(), VAL.toString());
      history.replaceState("", "", "?" + s.toString());
    }

    searchparamslength() {
      var s = new URLSearchParams(location.search);
      // @ts-ignore
      return typeof s.size !== "object" ? s.size : 0;
    }

    deletesearchparam({ ID }) {
      var s = new URLSearchParams(location.search);
      s.delete(ID.toString());
      history.replaceState("", "", "?" + s.toString());
    }

    appendsearchparam({ ID, VAL }) {
      var s = new URLSearchParams(location.search);
      s.append(ID.toString(), VAL.toString());
      history.replaceState("", "", "?" + s.toString());
    }

    hassearchparam({ ID }) {
      var s = new URLSearchParams(location.search);
      return s.has(ID.toString()) || false;
    }

    searchparamatindex({ PARAM, I }) {
      var index = parseInt(I) - 1 || 0;
      index = Math.max(0, index);
      var s = new URLSearchParams(location.search);
      var values = PARAM.toString() === "value" ? s.values() : s.keys();
      var i = 0;
      for (const value of values) {
        if (i === index) {
          return value;
        }
        i++;
      }
      return "";
    }
  }
  Scratch.extensions.register(new SearchApi());
})(Scratch);
