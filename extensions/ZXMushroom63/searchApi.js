// Name: Search Params
// ID: zxmushroom63searchparams
// Description: Interact with URL search parameters: the part of the URL after a question mark.
// By: ZXMushroom63
// License: MIT

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("SearchParams must be run unsandboxed.");
  }

  class SearchApi {
    getInfo() {
      return {
        id: "zxmushroom63searchparams",
        name: Scratch.translate("Search Params"),
        color1: "#b4b4b4",
        color2: "#9c9c9c",
        color3: "#646464",
        blocks: [
          {
            opcode: "searchparam",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("value of search parameter [ID]"),
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
            text: Scratch.translate("occurrences of search parameter [ID]"),
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
            text: Scratch.translate("index [I] of search parameters [ID]"),
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
            text: Scratch.translate("set search parameter [ID] to [VAL]"),
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
            text: Scratch.translate("delete search parameter [ID]"),
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
            text: Scratch.translate(
              "append search parameter [ID] with value [VAL]"
            ),
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
            text: Scratch.translate("has search parameter [ID]?"),
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
            text: Scratch.translate("length of search parameters"),
          },
          {
            opcode: "searchparamatindex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("search parameter [PARAM] at index [I]"),
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
            items: [
              { text: Scratch.translate("value"), value: "value" },
              { text: Scratch.translate("name"), value: "name" },
            ],
          },
        },
      };
    }

    searchparam({ ID }) {
      return (
        new URLSearchParams(location.search).get(Scratch.Cast.toString(ID)) ||
        ""
      );
    }

    occurencesofsearchparam({ ID }) {
      return (
        new URLSearchParams(location.search).getAll(Scratch.Cast.toString(ID))
          .length || 0
      );
    }

    indexedsearchparam({ ID, I }) {
      return (
        new URLSearchParams(location.search).getAll(Scratch.Cast.toString(ID))[
          parseInt(I) - 1
        ] || ""
      );
    }

    setsearchparam({ ID, VAL }) {
      var s = new URLSearchParams(location.search);
      s.set(Scratch.Cast.toString(ID), Scratch.Cast.toString(VAL));
      history.replaceState("", "", "?" + Scratch.Cast.toString(s));
    }

    searchparamslength() {
      var s = new URLSearchParams(location.search);
      // @ts-ignore
      return typeof s.size !== "object" ? s.size : 0;
    }

    deletesearchparam({ ID }) {
      var s = new URLSearchParams(location.search);
      s.delete(Scratch.Cast.toString(ID));
      history.replaceState("", "", "?" + Scratch.Cast.toString(s));
    }

    appendsearchparam({ ID, VAL }) {
      var s = new URLSearchParams(location.search);
      s.append(Scratch.Cast.toString(ID), Scratch.Cast.toString(VAL));
      history.replaceState("", "", "?" + Scratch.Cast.toString(s));
    }

    hassearchparam({ ID }) {
      var s = new URLSearchParams(location.search);
      return s.has(Scratch.Cast.toString(ID)) || false;
    }

    searchparamatindex({ PARAM, I }) {
      var index = parseInt(I) - 1 || 0;
      index = Math.max(0, index);
      var s = new URLSearchParams(location.search);
      var values =
        Scratch.Cast.toString(PARAM) === "value" ? s.values() : s.keys();
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
