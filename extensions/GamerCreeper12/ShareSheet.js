// Name: ShareSheet
// ID: gamerCreeperShare
// Description: Share data from your browser.
// By: GamerCreeper12 <https://scratch.mit.edu/users/GamerCreeper12/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("ShareSheet must run unsandboxed");
  }

  const Cast = Scratch.Cast;

  class GamerCreeperShareExtension {
    constructor() {
      this.dataType = "text";
      this.title = "";
      this.data = null;
      this.shareData = {};
      this.cancelled = false;
      this.hasError = false;
      this.errorMsg = "";
    }
    getInfo() {
      return {
        id: "gamercreepernoobssharesheetextension",
        name: Scratch.translate("ShareSheet"),
        color1: "#742DEB",
        color3: "#a176e8",
        blockIconURI:
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KCjwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+Cjxzdmcgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgaWQ9IkNvbW11bmljYXRpb24gLyBTaGFyZV9pT1NfRXhwb3J0Ij4KICAgIDxwYXRoIGlkPSJWZWN0b3IiIGQ9Ik05IDZMMTIgM00xMiAzTDE1IDZNMTIgM1YxM003LjAwMDIzIDEwQzYuMDY4MzUgMTAgNS42MDI0MSAxMCA1LjIzNDg2IDEwLjE1MjJDNC43NDQ4MSAxMC4zNTUyIDQuMzU1MjMgMTAuNzQ0OCA0LjE1MjI0IDExLjIzNDlDNCAxMS42MDI0IDQgMTIuMDY4MSA0IDEzVjE3LjhDNCAxOC45MjAxIDQgMTkuNDc5OCA0LjIxNzk5IDE5LjkwNzZDNC40MDk3MyAyMC4yODM5IDQuNzE1NDcgMjAuNTkwNSA1LjA5MTggMjAuNzgyMkM1LjUxOTIgMjEgNi4wNzg5OSAyMSA3LjE5NjkxIDIxSDE2LjgwMzZDMTcuOTIxNSAyMSAxOC40ODA1IDIxIDE4LjkwNzkgMjAuNzgyMkMxOS4yODQyIDIwLjU5MDUgMTkuNTkwNSAyMC4yODM5IDE5Ljc4MjIgMTkuOTA3NkMyMCAxOS40ODAyIDIwIDE4LjkyMSAyMCAxNy44MDMxVjEzQzIwIDEyLjA2ODEgMTkuOTk5OSAxMS42MDI0IDE5Ljg0NzcgMTEuMjM0OUMxOS42NDQ3IDEwLjc0NDggMTkuMjU1NCAxMC4zNTUyIDE4Ljc2NTQgMTAuMTUyMkMxOC4zOTc4IDEwIDE3LjkzMTkgMTAgMTcgMTAiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIC8+CiAgPC9nPgo8L3N2Zz4=",
        blocks: [
          {
            opcode: "issupported",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is share sheet supported?"),
          },
          {
            opcode: "settitleandtextto",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set title [TITLE]"),
            arguments: {
              TITLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Check out this file!"),
              },
            },
          },
          {
            opcode: "setdatatotxt",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set data to text [TXT]"),
            arguments: {
              TXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Hello, World!"),
              },
            },
          },
          {
            opcode: "setdatatourl",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set data to url [URL]"),
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("https://example.com"),
              },
            },
          },
          {
            opcode: "setdatatoimageurl",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set data to image url [URL]"),
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("https://example.com/myimage/"),
              },
            },
          },
          {
            opcode: "setdatatocostume",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set data to costume [COSTUME]"),
            arguments: {
              COSTUME: {
                type: Scratch.ArgumentType.COSTUME,
              },
            },
          },
          {
            opcode: "share",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("share data"),
          },
          {
            opcode: "isdatatosharesupported",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is last data to share supported?"),
          },
          {
            opcode: "iscancelled",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is sharing cancelled?"),
          },
          {
            opcode: "gotaerrortwhilesharing",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("got a error while sharing?"),
          },
          {
            opcode: "lasterrormsg",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("last error message"),
          },
        ],
      };
    }
    // helpers
    isShareSheetSupported() {
      return !!(navigator.share && navigator.canShare);
    }

    isShareSheetDataSupported(shareData) {
      if (!this.isShareSheetSupported()) return false;
      return !!navigator.canShare(shareData);
    }

    async shareDataFunc(shareData) {
      if (!this.isShareSheetDataSupported(shareData)) return;
      await navigator.share(shareData);
    }

    async shareDataForShareSheet() {
      if (!this.isShareSheetSupported()) return;
      this.shareData = {};
      this.cancelled = false;
      this.hasError = false;
      try {
        switch (this.dataType) {
          case "text":
            if (this.title) this.shareData["title"] = this.title;
            if (this.data) this.shareData["text"] = this.data;
            await this.shareDataFunc(this.shareData);
            break;

          case "url":
            if (this.title) this.shareData["title"] = this.title;
            if (this.data) this.shareData["url"] = this.data;
            await this.shareDataFunc(this.shareData);
            break;

          case "image":
            if (this.title) this.shareData["title"] = this.title;
            if (this.data) this.shareData["files"] = [this.data];
            await this.shareDataFunc(this.shareData);
            break;

          default:
            return;
        }
      } catch (err) {
        if (err.name === "AbortError") {
          this.cancelled = true;
        } else {
          this.hasError = true;
          this.errorMsg = err;
        }
      }
    }

    // blocks
    issupported() {
      return Cast.toBoolean(this.isShareSheetSupported());
    }

    settitleandtextto({ TITLE: title }) {
      this.title = Cast.toString(title) || "Share";
    }

    setdatatotxt({ TXT: text }) {
      this.dataType = "text";
      this.data = Cast.toString(text);
    }

    setdatatourl({ URL: url }) {
      this.dataType = "url";
      this.data = Cast.toString(url);
    }

    async setdatatoimageurl({ URL: url }) {
      this.hasError = false;
      try {
        const response = await Scratch.fetch(url);
        const blob = await response.blob();

        const imageFile = new File([blob], "image.png", {
          type: blob.type,
        });

        this.dataType = "image";
        this.data = imageFile;
      } catch (err) {
        this.hasError = true;
        this.errorMsg = err.message;
      }
    }

    async setdatatocostume({ COSTUME: costumeName }, util) {
      const target = util.target;
      const costumeIndex = target.getCostumeIndexByName(costumeName);
      const costume = target.sprite.costumes[costumeIndex];
      const asset = costume.asset.encodeDataURI();

      this.hasError = false;
      try {
        const response = await Scratch.fetch(asset);
        const blob = await response.blob();

        const imageFile = new File([blob], "image.png", {
          type: blob.type,
        });

        this.dataType = "image";
        this.data = imageFile;
      } catch (err) {
        this.hasError = true;
        this.errorMsg = err.message;
      }
    }

    async share() {
      await this.shareDataForShareSheet();
    }

    isdatatosharesupported() {
      return this.isShareSheetDataSupported(this.shareData);
    }

    iscancelled() {
      return this.cancelled;
    }

    gotaerrortwhilesharing() {
      return this.hasError;
    }

    lasterrormsg() {
      return this.errorMsg;
    }
  }
  Scratch.extensions.register(new GamerCreeperNoobsShareSheetExtension());
})(Scratch);
