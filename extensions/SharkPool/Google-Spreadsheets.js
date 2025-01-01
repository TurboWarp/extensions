// Name: Google Spreadsheets
// ID: SPspreads
// Description: Fetch Spreadsheet Data
// By: SharkPool

// Version 1.2.11

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Google Spreadsheets must run unsandboxed");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2My4xNjciIGhlaWdodD0iNjMuMTY3IiB2aWV3Qm94PSIwIDAgNjMuMTY3IDYzLjE2NyI+PGcgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0wIDMxLjU4M0MwIDE0LjE0IDE0LjE0IDAgMzEuNTgzIDBzMzEuNTgzIDE0LjE0IDMxLjU4MyAzMS41ODMtMTQuMTQgMzEuNTgzLTMxLjU4MyAzMS41ODNTMCA0OS4wMjYgMCAzMS41ODMiIGZpbGw9IiMzNGE4NTMiLz48cGF0aCBkPSJNMyAzMS41ODNDMyAxNS43OTcgMTUuNzk3IDMgMzEuNTgzIDNzMjguNTgzIDEyLjc5NyAyOC41ODMgMjguNTgzLTEyLjc5NyAyOC41ODMtMjguNTgzIDI4LjU4M1MzIDQ3LjM2OSAzIDMxLjU4MyIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xNS41ODMgNTAuMzM4VjEzLjAwNWMwLTEuNzYyIDIuMTg1LTMuNDA5IDMuOTY3LTMuNDA5aDE2LjkybDExLjExMyAxMS4wNXYyOS4zNTljMCAxLjc3NC0xLjYzIDMuNTkxLTQuMTE3IDMuNTkxSDE5LjU1Yy0xLjkyMiAwLTMuOTY3LTEuMjI3LTMuOTY3LTMuMjU4IiBmaWxsPSIjMzRhODUzIi8+PHBhdGggZD0iTTM2LjUzIDIwLjU2N1Y5LjU3bDEwLjk5NyAxMC45OTd6IiBmaWxsPSIjMTg4MDM4Ii8+PHBhdGggZD0iTTIxLjU0MSA0MS41MDVWMjYuNjcxaDIwdjE0LjgzNHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjMuNjMzIDMyLjY3MXYtNGg2LjgzM3Y0em05IDB2LTRoNi44MzN2NHptLTkgNi4wODR2LTRoNi44MzN2NHptOSAwdi00aDYuODMzdjR6IiBmaWxsPSIjMzRhODUzIi8+PC9nPjwvc3ZnPg==";

  const blockIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MC44OTkiIGhlaWdodD0iNTAuODk5IiB2aWV3Qm94PSIwIDAgNTAuODk5IDUwLjg5OSI+PGcgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0wIDUwLjg5OXYtNTAuOWg1MC45djUwLjl6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTkuNDUgNDQuMTkxVjYuODU4YzAtMS43NjIgMi4xODUtMy40MDkgMy45NjctMy40MDloMTYuOTJsMTEuMTEzIDExLjA1djI5LjM1OWMwIDEuNzc0LTEuNjMgMy41OTEtNC4xMTcgMy41OTFIMTMuNDE3Yy0xLjkyMiAwLTMuOTY3LTEuMjI3LTMuOTY3LTMuMjU4IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTMwLjM5NyAxNC40MlYzLjQyM0w0MS4zOTQgMTQuNDJ6TTE1LjQwOCAzNS4zNThWMjAuNTI0aDIwdjE0LjgzNHoiIGZpbGw9InNpbHZlciIvPjxwYXRoIGQ9Ik0xNy41IDI2LjUyNHYtNGg2LjgzM3Y0em05IDB2LTRoNi44MzN2NHptLTkgNi4wODR2LTRoNi44MzN2NHptOSAwdi00aDYuODMzdjR6IiBmaWxsPSIjZmZmIi8+PC9nPjwvc3ZnPg==";

  const defaultID = "1fDpOhPA2xNvar_K9mtl2h1XV5AdZnlkOZzmJnZNjHDg";
  const vm = Scratch.vm;
  let encodingType = "2D Array";

  class SPspreads {
    getInfo() {
      return {
        id: "SPspreads",
        name: "Google Spreadsheets",
        menuIconURI,
        blockIconURI,
        color1: "#34a853",
        color2: "#188038",
        color3: "#115c28",
        blocks: [
          { blockType: Scratch.BlockType.LABEL, text: "Sheet Reading" },
          {
            func: "disclaimer",
            blockType: Scratch.BlockType.BUTTON,
            text: "Reading Disclaimer"
          },
          {
            opcode: "getID",
            blockType: Scratch.BlockType.REPORTER,
            text: "get ID from sheet [URL]",
            arguments: {
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "https://docs.google.com/spreadsheets/d/1fDpOhPA2xNvar_K9mtl2h1XV5AdZnlkOZzmJnZNjHDg" }
            }
          },
          "---",
          {
            opcode: "getContent", blockType: Scratch.BlockType.REPORTER,
            text: "get data from sheet with ID [ID]", hideFromPalette: true, // Deprecated
            arguments: { ID: { type: Scratch.ArgumentType.STRING, defaultValue: "" } }
          },
          {
            opcode: "getContentNew",
            blockType: Scratch.BlockType.REPORTER,
            text: "data from sheet GID [NAME] with ID [ID]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "/d/..." },
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "0" }
            }
          },
          {
            opcode: "setEncodeType",
            blockType: Scratch.BlockType.COMMAND,
            text: "return sheet data as [TYPE]",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "ENCODING" }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: "Sheet Writing" },
          {
            func: "setup",
            blockType: Scratch.BlockType.BUTTON,
            text: "Writing Setup"
          },
          {
            opcode: "write2Sheet",
            blockType: Scratch.BlockType.COMMAND,
            text: "write [DATA] into column [COL] from webhook URL [URL]",
            arguments: {
              DATA: { type: Scratch.ArgumentType.STRING, defaultValue: "hello world!" },
              COL: { type: Scratch.ArgumentType.STRING, defaultValue: "messages" },
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "https://script.google.com/macros/..." }
            }
          },
          "---",
          {
            func: "setup2",
            blockType: Scratch.BlockType.BUTTON,
            text: "Extra Webhook Setup (Optional)"
          }
        ],
        menus: {
          ENCODING: ["2D Array", "Object", "Object Array"]
        },
      };
    }

    // Helper Funcs
    disclaimer() { alert(`Please Enable the "Anyone With Link" option in Share > General Access`) }

    setup() {
      const confirm = window.confirm(`To Write Rows and Columns in Spreadsheets, You Must install this Spreads Addon. Do you want to open the link?\n
      "workspace.google.com/marketplace/webhooks_for_sheets" \n\nFollow the Setup Steps in the "Extensions/Addons" Tab in Your Spread.`);
      if (confirm) Scratch.openWindow("https://workspace.google.com/u/0/marketplace/app/webhooks_for_sheets/860288437469", "_blank");
    }
    setup2() {
      alert(`To interact with Your Spread in this Project, import the extensions "Couplers" and "TurboHook" or "HTTP"`);
      const importExt = (NAME) => { vm.extensionManager.loadExtensionURL(NAME) };
      const confirm1 = window.confirm(`Import "Couplers" by "True-Fantom"?`);
      if (confirm1) importExt("https://extensions.turbowarp.org/true-fantom/couplers.js");
      const confirm2 = window.confirm(`Import "TurboHook" by "Cubester"?`);
      if (confirm2) importExt("https://extensions.turbowarp.org/CubesterYT/TurboHook.js");
      const confirm3 = window.confirm(`Import "HTTP" by "godslayerakp"?`);
      if (confirm3) importExt("https://extensions.turbowarp.org/godslayerakp/http.js");
    }

    tsvParser(tsv) {
      const fixName = (name) => {
        return name.endsWith("\r") ? name.substring(0, name.length - 1) : name;
      };
      const toItems = (rows, ind, objMode) => {
        const list = [];
        for (var i = 1; i < rows.length; i++) {
          const items = rows[i].split("\t");
          list.push(fixName(items[ind]))
        }
        if (objMode) return Object.assign({}, list);
        else return list;
      };
      const rows = tsv.split("\n");
      const columns = rows[0].split("\t"); // assume first row is the columns
      let obj = {};
      if (encodingType === "2D Array") {
        obj = [];
        columns.forEach((item, i) => { obj.push([fixName(item), toItems(rows, i, false)]) });
      } else {
        columns.forEach((item, i) => { obj[fixName(item)] = toItems(rows, i, encodingType === "Object") });
      }
      return obj;
    }

    // Block Funcs
    getID(args) {
      const url = Scratch.Cast.toString(args.URL);
      const startIndex = url.indexOf("/d/") + 3;
      if (startIndex === -1) return "";
      else {
        const endIndex = url.indexOf("/", startIndex);
        return endIndex !== -1 ? url.substring(startIndex, endIndex) : url.substring(startIndex);
      }
    }

    async getContent(args) { return await this.getSheetData(args.ID, "Sheet1") }
    async getContentNew(args) { return await this.getSheetData(args.ID, args.NAME) }
    async getSheetData(id, name) {
      const defaultReturn = encodingType === "2D Array" ? "[]" : "{}";
      try {
        id = id === "/d/..." ? defaultID : Scratch.Cast.toString(id);
        name = encodeURIComponent(Scratch.Cast.toString(name));
        const url = `https://docs.google.com/spreadsheets/d/${id}/export?format=tsv&id=${id}&gid=${name}&cache=${Math.random()}`;
        const response = await Scratch.fetch(`${url}`);
        if (!response.ok) return defaultReturn;
        const content = await response.text();
        return JSON.stringify(this.tsvParser(content));
      } catch (e) {
        console.warn(e);
        return defaultReturn;
      }
    }

    setEncodeType(args) { encodingType = args.TYPE }

    async write2Sheet(args) {
      const url = Scratch.Cast.toString(args.URL);
      if (!url.startsWith("https://script.google.com/macros/")) return console.warn("Invalid URL!");
      const column = encodeURIComponent(Scratch.Cast.toString(args.COL));
      const data = encodeURIComponent(Scratch.Cast.toString(args.DATA));
      try {
        const response = await Scratch.fetch(`${url}&${column}=${data}&cache=${Math.random()}`);
        if (!response.ok) console.warn("Failed to Write to Spreadsheet!");
      } catch (e) {
        console.warn(e);
      }
    }
  }

  Scratch.extensions.register(new SPspreads());
})(Scratch);
