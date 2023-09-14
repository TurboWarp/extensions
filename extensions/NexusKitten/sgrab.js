// Name: S-Grab (Very Buggy)
// ID: nexuskittensgrab
// Description: Get information about Scratch projects and Scratch users.
// By: NamelessCat <https://scratch.mit.edu/users/NamelessCat/>

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This Extension must run unsandboxed");
  }

  class nexuskittensgrab {
    getInfo() {
      return {
        id: "nexuskittensgrab",
        name: "S-Grab",
        color1: "#ECA90B",
        color2: "#EBAF00",
        blocks: [
          {
            opcode: "usergrab",
            blockType: Scratch.BlockType.REPORTER,
            text: "grab [WHAT] count of user [WHO]",
            arguments: {
              WHAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "WHAT",
              },
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "john",
              },
            },
          },
          {
            opcode: "rankusergrab",
            blockType: Scratch.BlockType.REPORTER,
            text: "global [WHAT] ranking for [WHO]",
            arguments: {
              WHAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "WHAT2",
              },
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "john",
              },
            },
          },
          {
            opcode: "usergrab2",
            blockType: Scratch.BlockType.REPORTER,
            text: "[WHAT] of user [WHO]",
            arguments: {
              WHAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "WHAT5",
              },
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "john",
              },
            },
          },
          "---",
          {
            opcode: "projectgrab",
            blockType: Scratch.BlockType.REPORTER,
            text: "grab [WHAT] count of project id [WHO]",
            arguments: {
              WHAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "WHAT3",
              },
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "717954208",
              },
            },
          },
          {
            opcode: "rankprojectgrab",
            blockType: Scratch.BlockType.REPORTER,
            text: "global [WHAT] ranking for project id [WHO]",
            arguments: {
              WHAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "WHAT4",
              },
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "717954208",
              },
            },
          },
          {
            opcode: "idtoname",
            blockType: Scratch.BlockType.REPORTER,
            text: "name of project id [WHO]",
            arguments: {
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "717954208",
              },
            },
          },
          {
            opcode: "idtoowner",
            blockType: Scratch.BlockType.REPORTER,
            text: "creator of project id [WHO]",
            arguments: {
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "717954208",
              },
            },
          },
        ],
        menus: {
          WHAT: {
            acceptReporters: true,
            items: ["follower", "following"],
          },
          WHAT2: {
            acceptReporters: true,
            items: ["follower", "love", "favorite", "view"],
          },
          WHAT3: {
            acceptReporters: true,
            items: ["love", "favorite", "view"],
          },
          WHAT4: {
            acceptReporters: true,
            items: ["love", "favorite", "view"],
          },
          WHAT5: {
            acceptReporters: true,
            items: ["about me", "wiwo", "location", "status"],
          },
        },
      };
    }
    async usergrab(args) {
      try {
        const response = await Scratch.fetch(
          "https://scratchdb.lefty.one/v3/user/info/" + args.WHO
        );
        const jsonData = await response.json();
        if (args.WHAT === "follower") {
          return jsonData.statistics.followers;
        } else if (args.WHAT === "following") {
          return jsonData.statistics.following;
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
        const jsonData = await response.json();
        if (args.WHAT === "follower") {
          return jsonData.statistics.ranks.followers;
        } else if (args.WHAT === "love") {
          return jsonData.statistics.ranks.loves;
        } else if (args.WHAT === "favorite") {
          return jsonData.statistics.ranks.favorites;
        } else if (args.WHAT === "view") {
          return jsonData.statistics.ranks.views;
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
          "https://scratchdb.lefty.one/v3/user/info/" + args.WHO
        );
        const jsonData = await response.json();
        if (args.WHAT === "about me") {
          return jsonData.bio;
        } else if (args.WHAT === "wiwo") {
          return jsonData.work;
        } else if (args.WHAT === "location") {
          return jsonData.country;
        } else if (args.WHAT === "status") {
          return jsonData.status;
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
          "https://scratchdb.lefty.one/v3/project/info/" + args.WHO
        );
        const jsonData = await response.json();
        if (args.WHAT === "love") {
          return jsonData.statistics.loves;
        } else if (args.WHAT === "favorite") {
          return jsonData.statistics.favorites;
        } else if (args.WHAT === "view") {
          return jsonData.statistics.views;
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
        const jsonData = await response.json();
        if (args.WHAT === "love") {
          return jsonData.statistics.ranks.loves;
        } else if (args.WHAT === "favorite") {
          return jsonData.statistics.ranks.favorites;
        } else if (args.WHAT === "view") {
          return jsonData.statistics.ranks.views;
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
          "https://scratchdb.lefty.one/v3/project/info/" + args.WHO
        );
        const jsonData = await response.json();
        return jsonData.title;
      } catch (error) {
        return "";
      }
    }
    async idtoowner(args) {
      try {
        const response = await Scratch.fetch(
          "https://scratchdb.lefty.one/v3/project/info/" + args.WHO
        );
        const jsonData = await response.json();
        return jsonData.username;
      } catch (error) {
        return "";
      }
    }
  }
  Scratch.extensions.register(new nexuskittensgrab());
})(Scratch);
