// Name: Steamworks
// ID: steamworks
// Description: Connect your project to Steamworks APIs.
// License: MPL-2.0
// Context: Probably don't translate the word "Steamworks".

(function (Scratch) {
  "use strict";

  /* globals Steamworks */

  const canUseSteamworks = typeof Steamworks !== "undefined" && Steamworks.ok();

  class SteamworksExtension {
    getInfo() {
      return {
        id: "steamworks",
        name: "Steamworks",
        color1: "#136C9F",
        color2: "#105e8c",
        color3: "#0d486b",
        docsURI: "https://extensions.turbowarp.org/steamworks",
        blocks: [
          {
            blockType: Scratch.BlockType.BOOLEAN,
            opcode: "hasSteamworks",
            text: Scratch.translate("has steamworks?"),
          },

          {
            blockType: Scratch.BlockType.REPORTER,
            opcode: "getUserInfo",
            text: Scratch.translate({
              default: "get user [THING]",
              description:
                "[THING] is a dropdown with name, steam ID, account level, IP country, etc.",
            }),
            arguments: {
              THING: {
                type: Scratch.ArgumentType.STRING,
                menu: "userInfo",
              },
            },
          },

          "---",

          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: "setAchievement",
            text: Scratch.translate({
              default: "set achievement [ACHIEVEMENT] unlocked to [STATUS]",
              description: "[STATUS] is true/false dropdown",
            }),
            arguments: {
              ACHIEVEMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              STATUS: {
                type: Scratch.ArgumentType.STRING,
                menu: "achievementUnlocked",
              },
            },
          },
          {
            blockType: Scratch.BlockType.BOOLEAN,
            opcode: "getAchievement",
            text: Scratch.translate("achievement [ACHIEVEMENT] unlocked?"),
            arguments: {
              ACHIEVEMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },

          "---",

          {
            blockType: Scratch.BlockType.BOOLEAN,
            opcode: "getUserOwns",
            text: Scratch.translate({
              default: "user owns [TYPE] with ID [ID]?",
              description: "eg. 'user owns DLC with ID Extra_Skins_DLC'",
            }),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "ownType",
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },

          // "---",

          // {
          //   blockType: Scratch.BlockType.COMMAND,
          //   opcode: "updateLeaderboard",
          //   text: "set score on leaderboard [LEADERBOARD] to [VALUE] by [METHOD]",
          //   arguments: {
          //     LEADERBOARD: {
          //       type: Scratch.ArgumentType.STRING,
          //       defaultValue: "",
          //     },
          //     VALUE: {
          //       type: Scratch.ArgumentType.NUMBER,
          //       defaultValue: "",
          //     },
          //     METHOD: {
          //       type: Scratch.ArgumentType.STRING,
          //       menu: "leaderboardUpdateMethod",
          //     },
          //   },
          // },

          "---",

          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: "openInOverlay",
            text: Scratch.translate({
              default: "open [TYPE] [DATA] in overlay",
              description: "eg. 'open URL example.com in overlay'",
            }),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "overlayType",
              },
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://example.com/",
              },
            },
          },
        ],
        menus: {
          userInfo: {
            acceptReporters: true,
            items: [
              {
                value: "name",
                text: Scratch.translate("name"),
              },
              {
                value: "level",
                text: Scratch.translate({
                  default: "level",
                  description: "Steam account level",
                }),
              },
              {
                value: "IP country",
                text: Scratch.translate("IP country"),
              },
              {
                value: "steam ID",
                text: Scratch.translate("steam ID"),
              },
            ],
          },

          achievementUnlocked: {
            acceptReporters: true,
            items: [
              {
                value: "true",
                text: Scratch.translate("true"),
              },
              {
                value: "false",
                text: Scratch.translate("false"),
              },
            ],
          },

          ownType: {
            acceptReporters: true,
            items: [
              {
                value: "DLC",
                text: Scratch.translate({
                  default: "DLC",
                  description: "Downloadable content",
                }),
              },
            ],
          },

          // leaderboardUpdateMethod: {
          //   acceptReporters: true,
          //   items: ["keeping the best score", "forcibly updating"],
          // },

          overlayType: {
            acceptReporters: true,
            items: [
              {
                value: "URL",
                text: Scratch.translate("URL"),
              },
            ],
          },
        },
      };
    }

    hasSteamworks() {
      return canUseSteamworks;
    }

    getUserInfo({ THING }) {
      if (!canUseSteamworks) return "Steamworks unavailable";
      switch (THING) {
        case "name":
          return Steamworks.localplayer.getName();
        case "level":
          return Steamworks.localplayer.getLevel();
        case "IP country":
          return Steamworks.localplayer.getIpCountry();
        case "steam ID":
          return Steamworks.localplayer.getSteamId().steamId64;
      }
      return "???";
    }

    setAchievement({ ACHIEVEMENT, STATUS }) {
      if (!canUseSteamworks) return;
      if (Scratch.Cast.toBoolean(STATUS)) {
        Steamworks.achievement.activate(Scratch.Cast.toString(ACHIEVEMENT));
      } else {
        Steamworks.achievement.clear(Scratch.Cast.toString(ACHIEVEMENT));
      }
    }

    getAchievement({ ACHIEVEMENT }) {
      if (!canUseSteamworks) return false;
      return Steamworks.achievement.isActivated(
        Scratch.Cast.toString(ACHIEVEMENT)
      );
    }

    getUserOwns({ TYPE, ID }) {
      if (!canUseSteamworks) return false;
      if (TYPE === "DLC") {
        return Steamworks.apps.isDlcInstalled(Scratch.Cast.toNumber(ID));
      }
      return false;
    }

    // async updateLeaderboard({ LEADERBOARD, VALUE, METHOD }) {
    //   if (!canUseSteamworks) return;
    //   await Steamworks.leaderboard.uploadScore(
    //     Scratch.Cast.toString(LEADERBOARD),
    //     Scratch.Cast.toNumber(VALUE),
    //     METHOD === "forcibly updating",
    //     []
    //   );
    // }

    openInOverlay({ TYPE, DATA }) {
      if (!canUseSteamworks) return;
      if (TYPE === "URL") {
        Steamworks.overlay.activateToWebPage(Scratch.Cast.toString(DATA));
      }
    }
  }

  Scratch.extensions.register(new SteamworksExtension());
})(Scratch);
