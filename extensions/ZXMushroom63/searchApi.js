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

  /**
   * scratch-gui URL parameters that might have some security implications to change.
   * @type {Record<string, {canModify: false} | {canModify: true, defaultProtocol: string}>}
   */
  const SENSITIVE_GUI_PARAMS = {
    cloud_host: {
      canModify: true,
      defaultProtocol: "wss://",
    },
    project_url: {
      canModify: true,
      defaultProtocol: "https://",
    },
    extension: {
      canModify: false,
    },
  };

  /**
   * Runs callback if setting the parameter is allowed. Only returns a promise when a permission
   * check is needed so that other parameters are set without forcing a delay.
   * @param {string} name
   * @param {string} value
   * @param {() => void} callback
   * @returns {void|Promise<void>}
   */
  const withSetPermission = (name, value, callback) => {
    if (
      !Scratch.gui ||
      !Object.prototype.hasOwnProperty.call(SENSITIVE_GUI_PARAMS, name)
    ) {
      // Not in scratch-gui or it's a safe parameter - just let through.
      return callback();
    }
    const param = SENSITIVE_GUI_PARAMS[name];
    if (!param.canModify) {
      return;
    }
    const url = /^[a-z][a-z0-9+.-]*:/i.test(value)
      ? value
      : param.defaultProtocol + value;
    return Scratch.canFetch(url).then((allowed) => {
      if (allowed) {
        callback();
      }
    });
  };

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
      return withSetPermission(ID.toString(), VAL.toString(), () => {
        var s = new URLSearchParams(location.search);
        s.set(ID.toString(), VAL.toString());
        history.replaceState("", "", "?" + s.toString());
      });
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
      return withSetPermission(ID.toString(), VAL.toString(), () => {
        var s = new URLSearchParams(location.search);
        s.append(ID.toString(), VAL.toString());
        history.replaceState("", "", "?" + s.toString());
      });
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
