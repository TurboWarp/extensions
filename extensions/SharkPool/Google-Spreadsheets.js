// Name: Google Spreadsheets
// ID: SPspreads
// Description: Fetch Spreadsheet Data
// By: SharkPool

// Version 1.1.1

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Google Spreadsheets must run unsandboxed");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2My4xNjY2NyIgaGVpZ2h0PSI2My4xNjY2NyIgdmlld0JveD0iMCwwLDYzLjE2NjY3LDYzLjE2NjY3Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA4LjQxNjY2LC0xNDguNDE2NjYpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIwOC40MTY2NywxODBjMCwtMTcuNDQyOTkgMTQuMTQwMzQsLTMxLjU4MzM0IDMxLjU4MzM0LC0zMS41ODMzNGMxNy40NDI5OSwwIDMxLjU4MzMzLDE0LjE0MDM0IDMxLjU4MzMzLDMxLjU4MzM0YzAsMTcuNDQyOTkgLTE0LjE0MDM0LDMxLjU4MzM0IC0zMS41ODMzMywzMS41ODMzNGMtMTcuNDQyOTksMCAtMzEuNTgzMzQsLTE0LjE0MDM0IC0zMS41ODMzNCwtMzEuNTgzMzR6IiBmaWxsPSIjMzRhODUzIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMjExLjQxNjY3LDE4MGMwLC0xNS43ODYxNCAxMi43OTcxOSwtMjguNTgzMzMgMjguNTgzMzMsLTI4LjU4MzMzYzE1Ljc4NjE0LDAgMjguNTgzMzMsMTIuNzk3MTkgMjguNTgzMzMsMjguNTgzMzNjMCwxNS43ODYxNCAtMTIuNzk3MTksMjguNTgzMzMgLTI4LjU4MzMzLDI4LjU4MzMzYy0xNS43ODYxNCwwIC0yOC41ODMzMywtMTIuNzk3MTkgLTI4LjU4MzMzLC0yOC41ODMzM3oiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIvPjxwYXRoIGQ9Ik0yMjQsMTk4Ljc1NTExYzAsLTguOTI2ODYgMCwtMzMuMzc2MzkgMCwtMzcuMzMzMzNjMCwtMS43NjE3MyAyLjE4NDkzLC0zLjQwODM0IDMuOTY2NjcsLTMuNDA4MzRjMy42Nzk4LDAgMTYuOTE5NDUsMCAxNi45MTk0NSwwbDExLjExMzg4LDExLjA0OTY2YzAsMCAwLDI0LjI4NjgzIDAsMjkuMzU4NjhjMCwxLjc3Mzk3IC0xLjYyOTYsMy41OTE2NiAtNC4xMTY2NywzLjU5MTY2Yy02Ljg0MTE3LDAgLTIwLjE3MDIxLDAgLTIzLjkxNjY3LDBjLTEuOTIxNjEsMCAtMy45NjY2NywtMS4yMjc0NyAtMy45NjY2NywtMy4yNTgzM3oiIGZpbGw9IiMzNGE4NTMiIHN0cm9rZT0iIzAwMDAwMCIvPjxwYXRoIGQ9Ik0yNDQuOTQ2NjYsMTY4Ljk4NDJ2LTEwLjk5NzY0bDEwLjk5NzY0LDEwLjk5NzY0eiIgZmlsbD0iIzE4ODAzOCIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTIyOS45NTgzNCwxODkuOTIxNzl2LTE0LjgzMzM0aDIwdjE0LjgzMzM0eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTIzMi4wNSwxODEuMDg4NDN2LTRoNi44MzMzM3Y0eiIgZmlsbD0iIzM0YTg1MyIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTI0MS4wNSwxODEuMDg4NDN2LTRoNi44MzMzM3Y0eiIgZmlsbD0iIzM0YTg1MyIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTIzMi4wNSwxODcuMTcxNzh2LTRoNi44MzMzM3Y0eiIgZmlsbD0iIzM0YTg1MyIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTI0MS4wNSwxODcuMTcxNzh2LTRoNi44MzMzM3Y0eiIgZmlsbD0iIzM0YTg1MyIgc3Ryb2tlPSJub25lIi8+PC9nPjwvZz48L3N2Zz4=";

  const blockIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MC44OTkzOSIgaGVpZ2h0PSI1MC44OTkzOSIgdmlld0JveD0iMCwwLDUwLjg5OTM5LDUwLjg5OTM5Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE0LjU1MDMxLC0xNTQuNTYzNzYpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIxNC41NTAzMSwyMDUuNDYzMTV2LTUwLjg5OTM5aDUwLjg5OTM5djUwLjg5OTM5eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIi8+PHBhdGggZD0iTTIyNC4wMDAwMSwxOTguNzU1MTNjMCwtOC45MjY4NiAwLC0zMy4zNzYzOSAwLC0zNy4zMzMzM2MwLC0xLjc2MTczIDIuMTg0OTMsLTMuNDA4MzQgMy45NjY2NywtMy40MDgzNGMzLjY3OTgsMCAxNi45MTk0NSwwIDE2LjkxOTQ1LDBsMTEuMTEzODgsMTEuMDQ5NjZjMCwwIDAsMjQuMjg2ODMgMCwyOS4zNTg2OGMwLDEuNzczOTcgLTEuNjI5NiwzLjU5MTY2IC00LjExNjY3LDMuNTkxNjZjLTYuODQxMTcsMCAtMjAuMTcwMjEsMCAtMjMuOTE2NjcsMGMtMS45MjE2MSwwIC0zLjk2NjY3LC0xLjIyNzQ3IC0zLjk2NjY3LC0zLjI1ODMzeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMDAwMDAwIi8+PHBhdGggZD0iTTI0NC45NDY2NywxNjguOTg0MnYtMTAuOTk3NjRsMTAuOTk3NjQsMTAuOTk3NjR6IiBmaWxsPSIjYzBjMGMwIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMjI5Ljk1ODMzLDE4OS45MjE3OXYtMTQuODMzMzRoMjB2MTQuODMzMzR6IiBmaWxsPSIjYzBjMGMwIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMjMyLjA1LDE4MS4wODg0M3YtNGg2LjgzMzMzdjR6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMjQxLjA1LDE4MS4wODg0M3YtNGg2LjgzMzMzdjR6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMjMyLjA1LDE4Ny4xNzE3OXYtNGg2LjgzMzMzdjR6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMjQxLjA1LDE4Ny4xNzE3OXYtNGg2LjgzMzMzdjR6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiLz48L2c+PC9nPjwvc3ZnPg==";

  const defaultID = "1fDpOhPA2xNvar_K9mtl2h1XV5AdZnlkOZzmJnZNjHDg";
  const vm = Scratch.vm;

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
            text: "Fetch Disclaimer"
          },
          {
            opcode: "getID",
            blockType: Scratch.BlockType.REPORTER,
            text: "get ID from sheet [URL]",
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://docs.google.com/spreadsheets/d/1fDpOhPA2xNvar_K9mtl2h1XV5AdZnlkOZzmJnZNjHDg"
              }
            }
          },
          "---",
          {
            opcode: "getContent",
            blockType: Scratch.BlockType.REPORTER,
            text: "get data from sheet with ID [ID]",
            hideFromPalette: true,
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "/d/..." }
            }
          },
          {
            opcode: "getContentNew",
            blockType: Scratch.BlockType.REPORTER,
            text: "data from sheet named [NAME] with ID [ID]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "/d/..." },
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "Sheet1" }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: "Sheet Writing" },
          {
            func: "setup",
            blockType: Scratch.BlockType.BUTTON,
            text: "Writing Setup"
          },
          {
            func: "setup2",
            blockType: Scratch.BlockType.BUTTON,
            text: "Webhook Setup"
          },
        ],
      };
    }

    disclaimer() { alert(`Please Enable the "Anyone With Link" option in Share > General Access`) }

    setup() {
      const confirm = window.confirm(`To Write Rows and Columns in Spreadsheets, You Must install this Spreads Extension. Do you want to open the link?\n
      "workspace.google.com/marketplace/webhooks_for_sheets" \n\nFollow the Setup Steps in the "Extensions/Addons" Tab in Your Spread.`);
      if (confirm) Scratch.openWindow("https://workspace.google.com/u/0/marketplace/app/webhooks_for_sheets/860288437469", "_blank");
    }
    setup2() {
      alert(`To interact with Your Spread in this Project, import the extensions "Couplers" and "TurboHook" or "HTTP"`);
      const confirm1 = window.confirm(`Import "Couplers" by "True-Fantom"?`);
      if (confirm1) this.importExt("https://extensions.turbowarp.org/true-fantom/couplers.js");
      const confirm2 = window.confirm(`Import "TurboHook" by "Cubester"?`);
      if (confirm2) this.importExt("https://extensions.turbowarp.org/CubesterYT/TurboHook.js");
      const confirm3 = window.confirm(`Import "HTTP" by "godslayerakp"?`);
      if (confirm3) this.importExt("https://extensions.turbowarp.org/godslayerakp/http.js");
    }
    importExt(NAME) { vm.extensionManager.loadExtensionURL(NAME) }

    getID(args) {
      const url = Scratch.Cast.toString(args.URL);
      const startIndex = url.indexOf("/d/") + 3;
      if (startIndex !== -1) {
        const endIndex = url.indexOf("/", startIndex);
        return endIndex !== -1 ? url.substring(startIndex, endIndex) : url.substring(startIndex);
      } else { return "" }
    }

    async getContentNew(args) { return await this.getContent(args) }

    async getContent(args) {
      try {
        const ID = args.ID === "/d/..." ? defaultID : Scratch.Cast.toString(args.ID);
        const name = encodeURIComponent(Scratch.Cast.toString(args.NAME));
        const url = `https://docs.google.com/spreadsheets/d/${ID}/gviz/tq?tqx=out:csv&sheet=${name}&cache=${Math.random()}`;
        const response = await Scratch.fetch(`https://corsproxy.io?${url}`);
        if (!response.ok) return "[]";
        const csvContent = await response.text();
        return JSON.stringify(csvContent.split("\n").map(item => item.split(`","`).map(field => field.replace(/^"|"$/g, ""))));
      } catch { return "[]" }
    }
  }

  Scratch.extensions.register(new SPspreads());
})(Scratch);
