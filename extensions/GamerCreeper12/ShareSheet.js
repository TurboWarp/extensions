// Name: ShareSheet
// ID: gamercreepernoobssharesheetextension
// Description: Share data from your browser.
// By: GamerCreeper12 <https://scratch.mit.edu/users/GamerCreeper12/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Share Sheet must run unsandboxed");
  }

  const Cast = Scratch.Cast;

  class GamerCreeperNoobsShareSheetExtension {
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
      return Cast.toBool(this.isShareSheetSupported());
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
