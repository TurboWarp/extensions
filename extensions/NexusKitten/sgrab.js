// Name: S-Grab
// ID: nexuskittensgrab
// Description: Get information about Scratch projects and Scratch users.
// By: NamelessCat <https://scratch.mit.edu/users/NamelessCat/>
// License: MIT

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This Extension must run unsandboxed");
  }

  class nexuskittensgrab {
    getInfo() {
      return {
        id: "nexuskittensgrab",
        name: Scratch.translate("S-Grab"),
        color1: "#ECA90B",
        color2: "#EBAF00",
        blocks: [
          {
            opcode: "usergrab2",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[WHAT] of user [WHO]"),
            arguments: {
              WHAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "WHAT5",
              },
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "griffpatch",
              },
            },
          },
          {
            opcode: "projectgrab",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("grab [WHAT] count of project id [WHO]"),
            arguments: {
              WHAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "WHAT3",
              },
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "60917032",
              },
            },
          },
          {
            opcode: "idtoname",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("name of project id [WHO]"),
            arguments: {
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "60917032",
              },
            },
          },
          {
            opcode: "idtoowner",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("creator of project id [WHO]"),
            arguments: {
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "60917032",
              },
            },
          },

          "---",
          {
            blockType: Scratch.BlockType.XML,
            xml: "<sep gap='12'/><label text='The blocks below rely on a third-party'/><sep gap='-12'/><label text='API that is currently offline.'/>",
          },
          {
            opcode: "usergrab",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("grab [WHAT] count of user [WHO]"),
            arguments: {
              WHAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "WHAT",
              },
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "griffpatch",
              },
            },
          },
          {
            opcode: "rankusergrab",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("global [WHAT] ranking for [WHO]"),
            arguments: {
              WHAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "WHAT2",
              },
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "griffpatch",
              },
            },
          },
          {
            opcode: "rankprojectgrab",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "global [WHAT] ranking for project id [WHO]"
            ),
            arguments: {
              WHAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "WHAT4",
              },
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "60917032",
              },
            },
          },
        ],
        menus: {
          WHAT: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("follower"),
                value: "follower",
              },
              {
                text: Scratch.translate("following"),
                value: "following",
              },
            ],
          },
          WHAT2: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("follower"),
                value: "follower",
              },
              {
                text: Scratch.translate("love"),
                value: "love",
              },
              {
                text: Scratch.translate("favorite"),
                value: "favorite",
              },
              {
                text: Scratch.translate("view"),
                value: "view",
              },
            ],
          },
          WHAT3: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("love"),
                value: "love",
              },
              {
                text: Scratch.translate("favorite"),
                value: "favorite",
              },
              {
                text: Scratch.translate("view"),
                value: "view",
              },
            ],
          },
          WHAT4: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("love"),
                value: "love",
              },
              {
                text: Scratch.translate("favorite"),
                value: "favorite",
              },
              {
                text: Scratch.translate("view"),
                value: "view",
              },
            ],
          },
          WHAT5: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("about me"),
                value: "about me",
              },
              {
                text: Scratch.translate({
                  default: "wiwo",
                  description:
                    "WIWO stands for 'What I'm Working On', part of the Scratch profile page.",
                }),
                value: "wiwo",
              },
              {
                text: Scratch.translate("location"),
                value: "location",
              },
              {
                text: Scratch.translate("status"),
                value: "status",
              },
            ],
          },
        },
      };
    }
    async usergrab(args) {
      try {
        const response = await Scratch.fetch(
          "https://scratchdb.lefty.one/v3/user/info/" + args.WHO
        );
        if (!response.ok) {
          return "";
        }
        const jsonData = await response.json();
        if (args.WHAT === "follower") {
          return jsonData.statistics.followers ?? "";
        } else if (args.WHAT === "following") {
          return jsonData.statistics.following ?? "";
        } else {
          return "";
        }
      } catch (error) {
        return "";
      }
    }
    async rankusergrab(args) {
      try {
        const response = await Scratch.fetch(
          "https://scratchdb.lefty.one/v3/user/info/" + args.WHO
        );
        if (!response.ok) {
          return "";
        }
        const jsonData = await response.json();
        if (args.WHAT === "follower") {
          return jsonData.statistics.ranks.followers ?? "";
        } else if (args.WHAT === "love") {
          return jsonData.statistics.ranks.loves ?? "";
        } else if (args.WHAT === "favorite") {
          return jsonData.statistics.ranks.favorites ?? "";
        } else if (args.WHAT === "view") {
          return jsonData.statistics.ranks.views ?? "";
        } else {
          return "";
        }
      } catch (error) {
        return "";
      }
    }
    async usergrab2(args) {
      try {
        const response = await Scratch.fetch(
          `https://trampoline.turbowarp.org/api/users/${args.WHO}`
        );
        if (!response.ok) {
          return "";
        }
        const jsonData = await response.json();
        if (args.WHAT === "about me") {
          return jsonData.profile.bio ?? "";
        } else if (args.WHAT === "wiwo") {
          return jsonData.profile.status ?? "";
        } else if (args.WHAT === "location") {
          return jsonData.profile.country ?? "";
        } else if (args.WHAT === "status") {
          // ScratchDB would tell us whether they are a New Scratcher but api.scratch.mit.edu doesn't
          return jsonData.scratchteam ? "Scratch Team" : "Scratcher";
        } else {
          return "";
        }
      } catch (error) {
        return "";
      }
    }
    async projectgrab(args) {
      try {
        const response = await Scratch.fetch(
          `https://trampoline.turbowarp.org/api/projects/${args.WHO}`
        );
        if (!response.ok) {
          return "";
        }
        const jsonData = await response.json();
        if (args.WHAT === "love") {
          return jsonData.stats.loves ?? "";
        } else if (args.WHAT === "favorite") {
          return jsonData.stats.favorites ?? "";
        } else if (args.WHAT === "view") {
          return jsonData.stats.views ?? "";
        } else {
          return "";
        }
      } catch (error) {
        return "";
      }
    }
    async rankprojectgrab(args) {
      try {
        const response = await Scratch.fetch(
          "https://scratchdb.lefty.one/v3/project/info/" + args.WHO
        );
        if (!response.ok) {
          return "";
        }
        const jsonData = await response.json();
        if (args.WHAT === "love") {
          return jsonData.statistics.ranks.loves ?? "";
        } else if (args.WHAT === "favorite") {
          return jsonData.statistics.ranks.favorites ?? "";
        } else if (args.WHAT === "view") {
          return jsonData.statistics.ranks.views ?? "";
        } else {
          return "";
        }
      } catch (error) {
        return "";
      }
    }
    async idtoname(args) {
      try {
        const response = await Scratch.fetch(
          `https://trampoline.turbowarp.org/api/projects/${args.WHO}`
        );
        if (!response.ok) {
          return "";
        }
        const jsonData = await response.json();
        return jsonData.title ?? "";
      } catch (error) {
        return "";
      }
    }
    async idtoowner(args) {
      try {
        const response = await Scratch.fetch(
          `https://trampoline.turbowarp.org/api/projects/${args.WHO}`
        );
        if (!response.ok) {
          return "";
        }
        const jsonData = await response.json();
        return jsonData.author.username ?? "";
      } catch (error) {
        return "";
      }
    }
  }
  Scratch.extensions.register(new nexuskittensgrab());
})(Scratch);
