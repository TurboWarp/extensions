// Name: Unavatar tools
// Id: unavatartools
// What it does: it gets unavatar images easily instead of external websites
// includes: 6 blocks, runs unsandboxed because of 2 blocks, doesn't use math, only
// strings, 4 reporters, 2 commands, what it can do, gets url images, opens tabs

(function (Scratch) {
  "use strict";

  class Unavatar {
    getInfo() {
      return {
        id: "unavatartools",
        name: "Unavatar Tools",
        color1: "#4a4a4a",
        color2: "#333333",
        blocks: [
          {
            opcode: "getProfilePic",
            blockType: Scratch.BlockType.REPORTER,
            text: "get pfp unavatar user image with provider [PROVIDER] size [SIZE] user [USERNAME] fallback [FALLBACK]",
            arguments: {
              PROVIDER: {
                type: Scratch.ArgumentType.STRING,
                menu: "providersMenu",
                defaultValue: "github",
              },
              USERNAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "kikobeats",
              },
              SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 400 },
              FALLBACK: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
            },
          },
          {
            opcode: "getAvatarByEmail",
            blockType: Scratch.BlockType.REPORTER,
            text: "unavatar of email [EMAIL] size [SIZE]",
            arguments: {
              EMAIL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "hello@microlink.io",
              },
              SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 400 },
            },
          },
          {
            opcode: "getDomainLogo",
            blockType: Scratch.BlockType.REPORTER,
            text: "logo of website [DOMAIN] via Google size [SIZE]",
            arguments: {
              DOMAIN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "turbowarp.org",
              },
              SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 400 },
            },
          },
          {
            opcode: "GetDomainLogoNoGoogle",
            blockType: Scratch.BlockType.REPORTER,
            text: "Get domain logo [DOMAINLOGO] size [SIZEDOMAINLOGO]",
            arguments: {
              DOMAINLOGO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "hello@microlink.io",
              },
              SIZEDOMAINLOGO: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 400,
              },
            },
          },
          {
            opcode: "openProfile",
            blockType: Scratch.BlockType.COMMAND,
            text: "Open profile of [PROVIDER] user [USERNAME]",
            arguments: {
              PROVIDER: {
                type: Scratch.ArgumentType.STRING,
                menu: "allProvidersMenu",
                defaultValue: "github",
              },
              USERNAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "kikobeats",
              },
            },
          },
          {
            opcode: "GetProfilePicSize",
            blockType: Scratch.BlockType.COMMAND,
            text: "Open unavatar image in new tab [PROVIDERSIZE] user [USERSIZE] size [SIZE]",
            arguments: {
              PROVIDERSIZE: {
                type: Scratch.ArgumentType.STRING,
                menu: "providersMenu",
                defaultValue: "github",
              },
              USERSIZE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "kikobeats",
              },
              SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 400 },
            },
          },
        ],
        menus: {
          providersMenu: {
            acceptReporters: true,
            items: [
              "github",
              "twitter",
              "instagram",
              "youtube",
              "facebook",
              "reddit",
              "tiktok",
              "twitch",
              "soundcloud",
              "telegram",
              "duckduckgo",
              "deviantart",
              "dribbble",
              "bluesky",
              "mastodon",
              "threads",
            ],
          },
          allProvidersMenu: {
            acceptReporters: true,
            items: [
              "github",
              "twitter",
              "instagram",
              "youtube",
              "facebook",
              "reddit",
              "tiktok",
              "twitch",
              "soundcloud",
              "telegram",
              "apple-music",
              "spotify",
              "patreon",
            ],
          },
        },
      };
    }

    _buildUrl(path, size, fallback) {
      const s = size || 400;
      let url = `https://unavatar.io/${path}?size=${s}`;
      if (fallback) {
        url += `&fallback=${encodeURIComponent(fallback)}`;
      }
      return url;
    }

    getProfilePic(args) {
      const provider = String(args.PROVIDER).toLowerCase().trim();
      const user = encodeURIComponent(args.USERNAME);
      return this._buildUrl(`${provider}/${user}`, args.SIZE, args.FALLBACK);
    }

    getAvatarByEmail(args) {
      const email = encodeURIComponent(args.EMAIL);
      return this._buildUrl(email, args.SIZE);
    }

    getDomainLogo(args) {
      const domain = encodeURIComponent(args.DOMAIN);
      return this._buildUrl(`google/${domain}`, args.SIZE);
    }

    GetDomainLogoNoGoogle(args) {
      const domain = encodeURIComponent(args.DOMAINLOGO);
      return this._buildUrl(domain, args.SIZEDOMAINLOGO);
    }

    openProfile(args) {
      const provider = String(args.PROVIDER).toLowerCase().trim();
      const userEnc = encodeURIComponent(args.USERNAME);

      const profiles = {
        github: `https://github.com/${userEnc}`,
        twitter: `https://twitter.com/${userEnc}`,
        instagram: `https://instagram.com{/$ userEnc}`,
        youtube: `https://youtube.com/${userEnc}`,
        twitch: `https://twitch.tv/${userEnc}`,
        "apple-music": `https://music.apple.com/${userEnc}`,
        spotify: `https://open.spotify.com/${userEnc}`,
        patreon: `https://www.patreon.com/${userEnc}`,
      };

      const url =
        profiles[provider] || `https://unavatar.io{provider}/${userEnc}`;
      if (typeof window !== "undefined")
        window.open(url, "_blank", "noopener,noreferrer");
    }

    GetProfilePicSize(args) {
      const url = this.getProfilePic({
        PROVIDER: args.PROVIDERSIZE,
        USERNAME: args.USERSIZE,
        SIZE: args.SIZE,
        FALLBACK: "",
      });
      if (typeof window !== "undefined")
        window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  Scratch.extensions.register(new Unavatar());
})(Scratch);
