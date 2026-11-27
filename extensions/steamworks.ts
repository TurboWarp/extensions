// Name: Steamworks
// ID: steamworks
// Description: Connect your project to Steamworks APIs.
// By: GarboMuffin
// License: MPL-2.0
// Context: Probably don't translate the word "Steamworks".

(function (Scratch: typeof globalThis.Scratch) {
  "use strict";

  const steamworks =
    window.Steamworks && window.Steamworks.ok() ? window.Steamworks : null;

  class SteamworksExtension implements Scratch.Extension {
    getInfo(): Scratch.Info {
      return {
        id: "steamworks",
        // eslint-disable-next-line extension/should-translate
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
            opcode: "getInstalled",
            text: Scratch.translate({
              default: "[TYPE] [ID] installed?",
              description: "eg. can be read as 'DLC 1234 installed?'",
            }),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "installType",
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },

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

          installType: {
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
      return !!steamworks;
    }

    getUserInfo({ THING }: { THING: unknown }) {
      if (!steamworks) return "Steamworks unavailable";
      switch (THING) {
        case "name":
          return steamworks.localplayer.getName();
        case "level":
          return steamworks.localplayer.getLevel();
        case "IP country":
          return steamworks.localplayer.getIpCountry();
        case "steam ID":
          return String(steamworks.localplayer.getSteamId().steamId64);
      }
      return "???";
    }

    setAchievement({
      ACHIEVEMENT,
      STATUS,
    }: {
      ACHIEVEMENT: unknown;
      STATUS: unknown;
    }) {
      if (!steamworks) return;
      if (Scratch.Cast.toBoolean(STATUS)) {
        steamworks.achievement.activate(Scratch.Cast.toString(ACHIEVEMENT));
      } else {
        steamworks.achievement.clear(Scratch.Cast.toString(ACHIEVEMENT));
      }
    }

    getAchievement({ ACHIEVEMENT }: { ACHIEVEMENT: unknown }) {
      if (!steamworks) return false;
      return steamworks.achievement.isActivated(
        Scratch.Cast.toString(ACHIEVEMENT)
      );
    }

    getInstalled({ TYPE, ID }: { TYPE: unknown; ID: unknown }) {
      if (!steamworks) return false;
      if (TYPE === "DLC") {
        return steamworks.apps.isDlcInstalled(Scratch.Cast.toNumber(ID));
      }
      return false;
    }

    openInOverlay({ TYPE, DATA }: { TYPE: unknown; DATA: unknown }) {
      if (TYPE === "URL") {
        const url = Scratch.Cast.toString(DATA);
        if (steamworks) {
          // This will always be a packaged environment so don't need to bother
          // with canOpenWindow()
          steamworks.overlay.activateToWebPage(url);
        } else {
          // Don't await result, we don't care
          Scratch.openWindow(url);
        }
      }
    }
  }

  Scratch.extensions.register(new SteamworksExtension());
})(Scratch);
