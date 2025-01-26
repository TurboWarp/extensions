// Name: Game Version
// ID: gameversion
// Description: A REST API-based Game Version utility, Useful for Games!
// By: Thebloxers998 <https://scratch.mit.edu/users/Thebloxers998/>
// Original: Thebloxers998
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  class GameVersion {
    constructor() {
      this.version = "1.0.0";
      this.latestVersion = "1.0.0";
      this.serverURL = "https://example.com/version"; // Your server URL
      this.updateStatus = "No updates checked";
      this.versionID = null; // Store the ID of the version
    }

    getInfo() {
      return {
        id: "gameversion",
        name: Scratch.translate("Game Version"),
        color1: "#FF5733", // Primary color
        color2: "#FFBD33", // Secondary color
        color3: "#FFBD33", // Tertiary color
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Version Management"),
          },
          {
            opcode: "getVersion",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current game version"),
          },
          {
            opcode: "setVersion",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set game version to [VERSION]"),
            arguments: {
              VERSION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1.0.0",
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Latest Version"),
          },
          {
            opcode: "getLatestVersion",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("latest game version"),
          },
          {
            opcode: "fetchLatestVersion",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("fetch latest game version from server"),
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Server Settings"),
          },
          {
            opcode: "setServerURL",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set server URL to [URL]"),
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://example.com/version",
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Update Management"),
          },
          {
            opcode: "checkForUpdates",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("check for updates"),
          },
          {
            opcode: "getUpdateStatus",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("update status"),
          },
        ],
      };
    }

    getVersion() {
      return Scratch.fetch(this.serverURL)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            this.version = data[0].version;
            this.versionID = data[0].id;
          }
          return this.version;
        })
        .catch((error) => {
          console.error("Error fetching current version:", error);
          return this.version;
        });
    }

    setVersion(args) {
      const method = this.versionID ? "PUT" : "POST";
      const url = this.serverURL;

      Scratch.fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ version: Scratch.Cast.toString(args.VERSION) }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.version = data.version;
          if (!this.versionID) {
            this.versionID = data.id;
          }
        })
        .catch((error) => {
          console.error("Error setting version:", error);
        });
    }

    getLatestVersion() {
      return this.latestVersion;
    }

    fetchLatestVersion() {
      Scratch.fetch(this.serverURL)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            this.latestVersion = data[0].version;
          }
        })
        .catch((error) => {
          console.error("Error fetching latest version:", error);
        });
    }

    setServerURL(args) {
      this.serverURL = Scratch.Cast.toString(args.URL);
    }

    checkForUpdates() {
      Scratch.fetch(this.serverURL)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0 && data[0].version !== this.version) {
            this.updateStatus = "Update available";
          } else {
            this.updateStatus = "No updates available";
          }
        })
        .catch((error) => {
          console.error("Error checking for updates:", error);
          this.updateStatus = "Error checking for updates";
        });
    }

    getUpdateStatus() {
      return this.updateStatus;
    }
  }

  Scratch.extensions.register(new GameVersion());
})(Scratch);
