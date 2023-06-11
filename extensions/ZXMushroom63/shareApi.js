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
            text: "search parameter of id [ID]",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "x",
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
            opcode: "searchparamatindex",
            blockType: Scratch.BlockType.REPORTER,
            text: "search parameter at index [I]",
            arguments: {
              I: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "searchkeyatindex",
            blockType: Scratch.BlockType.REPORTER,
            text: "search key at index [I]",
            arguments: {
              I: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
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
        ],
      };
    }

    searchparam({ ID }) {
      return new URLSearchParams(location.search).get(ID.toString()) || "";
    }

    setsearchparam({ ID, VAL }) {
      var s = new URLSearchParams(location.search);
      s.set(ID.toString(), VAL.toString());
      location.search = "?" + s.toString();
    }

    searchparamslength() {
      var s = new URLSearchParams(location.search);
      // @ts-ignore
      return s.size;
    }

    deletesearchparam({ ID }) {
      var s = new URLSearchParams(location.search);
      s.delete(ID.toString());
      location.search = "?" + s.toString();
    }

    hassearchparam({ ID }) {
      var s = new URLSearchParams(location.search);
      return s.has(ID.toString());
    }

    searchparamatindex({ I }) {
      var index = parseInt(I) - 1 || 0;
      index = Math.max(0, index);
      var s = new URLSearchParams(location.search);
      var values = s.values();
      var i = 0;
      for (const value of values) {
        if (i === index) {
          return value;
        }
        i++;
      }
      return "";
    }

    searchkeyatindex({ I }) {
      var index = parseInt(I) - 1 || 0;
      index = Math.max(0, index);
      var s = new URLSearchParams(location.search);
      var values = s.keys();
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
