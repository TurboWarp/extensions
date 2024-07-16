// Name: SQLSnap! Fileshare
// ID: bitter130SQLSnapFileshare
// Description: Port of the SQLSnap! Fileshare extension for cloud file share utilization.
// By: Bitter_130

(function (Scratch) {
  "use strict";

  class SQLSnapFileshare {
    constructor() {
      this.serverURL =
        "https://snapextensions.uni-goettingen.de/handleTextfile.php";
    }

    getInfo() {
      return {
        id: "bitter130SQLSnapFileshare",
        name: "SQLSnap! " + Scratch.translate("Fileshare"),
        color1: "#31b3d4",
        color2: "#179fc2",
        blocks: [
          {
            opcode: "setServerURL",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set server URL to [URL]"),
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: this.serverURL,
              },
            },
          },
          {
            opcode: "saveToServer",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("save [FILE] with content [CONTENT]"),
            arguments: {
              FILE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("data") + ".txt",
              },
              CONTENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Hello World!"),
              },
            },
          },
          {
            opcode: "loadFromServer",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("load [FILE]"),
            arguments: {
              FILE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("data") + ".txt",
              },
            },
          },
          {
            opcode: "fits",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("[DATA] fits on server?"),
            arguments: {
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("data"),
              },
            },
          },
          {
            opcode: "deleteFromServer",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete [FILE]"),
            arguments: {
              FILE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("data") + ".txt",
              },
            },
          },
        ],
      };
    }

    setServerURL(args) {
      args.URL = Scratch.Cast.toString(args.URL);
      this.serverURL = args.URL;
    }

    saveToServer(args) {
      args.FILE = Scratch.Cast.toString(args.FILE);
      args.CONTENT = Scratch.Cast.toString(args.CONTENT);

      const url =
        this.serverURL +
        "?type=write" +
        "&content=" +
        encodeURIComponent(args.CONTENT) +
        "&filename=./textfiles/" +
        encodeURIComponent(args.FILE);

      return fetch(url)
        .then((response) => response.text())
        .then((result) => result === "ok")
        .catch((error) => {
          console.error("Failed to save data:", error);
          return false;
        });
    }

    loadFromServer(args) {
      args.FILE = Scratch.Cast.toString(args.FILE);

      const url =
        this.serverURL +
        "?type=read" +
        "&filename=./textfiles/" +
        encodeURIComponent(args.FILE);

      return fetch(url)
        .then((response) => response.text())
        .then((text) => {
          if (text === "ERROR: file does not exist") {
            return ""; // Return empty string or any indication that file does not exist
          } else {
            return text;
          }
        })
        .catch((error) => {
          console.error("Failed to load data:", error);
          return "can't get data";
        });
    }

    fits(args) {
      args.DATA = Scratch.Cast.toString(args.DATA);
      return args.DATA.length < 10001;
    }

    deleteFromServer(args) {
      args.FILE = Scratch.Cast.toString(args.FILE);

      const url =
        this.serverURL +
        "?type=delete" +
        "&filename=./textfiles/" +
        encodeURIComponent(args.FILE);

      return fetch(url)
        .then((response) => response.text())
        .then((result) => result === "ok")
        .catch((error) => {
          console.error("Failed to delete data:", error);
          return false;
        });
    }
  }

  Scratch.extensions.register(new SQLSnapFileshare());
})(Scratch);
