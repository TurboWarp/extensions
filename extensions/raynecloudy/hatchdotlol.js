// Name: Hatch.lol
// ID: hatchdotlol
// Description: Blocks that allow you to interact with the Hatch.lol API. Official.
// By: raynecloudy <https://scratch.mit.edu/users/breakfast_for_dinner/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("The Hatch.lol extension must run unsandboxed!");
  }

  // i hate this function so much!
  (async () => {
    await new Promise(resolve => {
      window.parent
      window.addEventListener("message", function handle(e) {
        if (e.data.method === "hatchdotlol.auth") {
          auth_user = e.data.user;
          window.removeEventListener("message", handle);
          resolve();
        }
      });
    });
  })();
  
  const blockIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsSAAALEgHS3X78AAAEsUlEQVRoQ82ZWahVVRiALSvNLBW1jKxMhdRGDbLoIZJ6iKIksR60HvJFEVR60SYz0R40FImKJomikaAEQcQJFAsTiyhpsOI6ZFli5tA8fR+sDZvNOWevfc/e+54fPs65+6691v+v4R/W6dWrPDmVrs6DO+F16IK/4AR8Cs/AJBgCtu0oOR1t7oWt8Cf814Q/eL4R7oM+nWLBOSjyPPzSQvGsQcfCKp3b00YMCsq7VZrNerPn//LOezC8p4xwC6wCt0VR5ZP2//DuGvDs1C6Ptal8YoQr8Tb0q8uCUxjoVvipjZnPrtiv9DUHetdhxFAGWQ/OXHe3TqP3vqC/cXUYMJdBWrnK7hrlhLxWtQF6jKMlz3zaYI24uSojDFarK1Q+MWQLYwyswojr6fRgDQb8zBimI1ESm5M4+3ZaxF87o4dgfzjwUQqF2b+NzzNjX4hp597/pMDs/01bt8KNMAHWQZFo/TXtR8QoFttmMg1VSl6FJWA+08zjvMH/LgRjhpwPr7Ror2N4HN4Mq2WEvidWuZh2psK6uMtSjW/i++epmdWDHIaHgtLZfjXkEXCPJ4YbwN6Hq1ONr+X7WnguRrHYNlfR0HOQlVE8eBF+g89gCpwB7t/rwLR5FtwNtjV/mgbfwAF4EAY36Pcsnt0Qq1y77c4OCo7k8zS4A5zV78FiRuNMtbvgUegPl8MVwdh2xy/tfWd9IZwEPc9bcD/ovdw6VmUaswKc4Y6TqWh0BDzAep6si76AZ243D+yMjtMehXbBBzAio9xo/tYB6FU0YnMwdB6fjc5Vj9hmoa5neRI8B2l5OvzvOJ+my8aGj+H3sCIXt6NxbCTOG8ODqXho9eFp0eNYte0OhnjAnwXHng5eBvS4WE0Z5Jzt7G2Dxl0DSe3rChhpDYQPgKvXEbINLbZDq3zJPb80rMjtHaF1SollfNd9Gg+aiYHO+PAulHKAi5wBy71Wae5FQTl9fTOxWPE8GNBM7hqJEdtoHiWxBlhgPBxmzmsQo2jW24zhmfVCYoD/18NcmlLoK757XvRAaVHhK+FlMCV5ArxzKk3MZ0y8dJUmbXtgAaRv1gxiLwUFzW+snfU85jyLwENsTqTyY4NmTuB4WA5doW/HsI0OoTRxz2ZTZwf5EMxKVUT3+RTcAjvAlCJ5x21j5uqlr89dFa8kTctV3Hez/e8tTXs6eqfBAMmABqhF4KerkHdT533SfDA+tLrB+LZMA17IGUxFGs1id69YfM9onSuxh9h9nCexfeX1k/xfh5ArsYO63HVL1BaKNeBLtG/mt6syzPohV2IN8OB9l9tbeQ3Mqz6K6S7WABMv3WBd4pb9MWawIgboFbKpcswY3Wnj7Ht7kSuxBrik5vEW51WLccTKztqiVBlAb5aN7fj2mHe7GCN9/1SqEd7zlP3DRtYof3eL3RmFjbPa2lDhKlhPVF6heUtnZI7ZDkXaeL68FKtcrKRmhgNdRMFWbU3VF0Ntv1T2ZTB/VSwrgVtJX6bXtctdjOgNg2626GpovHt+du1apwbUW1gKWtBbfcUYouLmVnqbidDWb8Pe2Zch1rTDwANuRaZil4C1tApb6OyDnbAJ/LXnB8jWxoV1+R+VloxEf+Ju6gAAAABJRU5ErkJggg==";
  const menuIcon = "data:image/png;base64,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";
  const projectId = (location.href.match("project_url=https?://api.hatch.lol/projects/([0-9]+)/content") || [-1, -1])[1];
  
  let auth_user = window.location.hostname === "turbowarp.org" ? {
    id: 0,
    name: "example",
    displayName: "Example User",
    country: "Example Country",
    bio: "I'm an example user that acts as the authenticated user when editing a Hatch.lol project.",
    highlightedProjects: [],
    profilePicture: "/uploads/default.png",
    joinDate: "2025-03-08 03:19:59.325240129 UTC",
    bannerImage: null,
    followerCount: 1,
    followingCount: 2,
    verified: true,
    projectCount: 3,
    hatchTeam: false,
    theme: "#ff0000"
  } : {};

  /**
   * Extension for interacting with the Hatch.lol API
   * and the Hatch.lol save state API
   */
  class HatchDotLol {
    getInfo() {
      return {
        id: "hatchdotlol",
        // eslint-disable-next-line extension/should-translate
        name: "Hatch.lol",
        docsURI: "https://extensions.turbowarp.org/raynecloudy/hatchdotlol",
        color1: "#ffbd59",
        color2: "#d69d47",
        color3: "#d69d47",
        blockIconURI: blockIcon,
        menuIconURI: menuIcon,
        blocks: [
          {
            opcode: "project_id",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("project ID")
          },
          {
            opcode: "status",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[SERVER] server status code"),
            arguments: {
              SERVER: {
                type: Scratch.ArgumentType.STRING,
                menu: "SERVER_MENU"
              },
            },
            disableMonitor: true
          },
          {
            opcode: "ok",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("[SERVER] server ok?"),
            arguments: {
              SERVER: {
                type: Scratch.ArgumentType.STRING,
                menu: "SERVER_MENU"
              },
            },
            disableMonitor: true
          },
          {
            opcode: "user",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("user [DATA]"),
            arguments: {
              DATA: {
                type: Scratch.ArgumentType.STRING,
                menu: "USER_DATA_MENU"
              }
            },
            disableMonitor: true,
            hideFromPalette: true
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Main API"),
          },
          {
            opcode: "get_project",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[DATA] of project [ID]"),
            arguments: {
              DATA: {
                type: Scratch.ArgumentType.STRING,
                menu: "PROJECT_DATA_MENU"
              },
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            },
            disableMonitor: true
          },
          {
            opcode: "get_user",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[DATA] of user [USERNAME]"),
            arguments: {
              DATA: {
                type: Scratch.ArgumentType.STRING,
                menu: "USER_DATA_MENU"
              },
              USERNAME: {
                type: Scratch.ArgumentType.STRING
              }
            },
            disableMonitor: true
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Save State API"),
          },
          {
            opcode: "write_data",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("save [DATA] to user [USERNAME]"),
            arguments: {
              DATA: {
                type: Scratch.ArgumentType.STRING
              },
              USERNAME: {
                type: Scratch.ArgumentType.STRING
              }
            }
          },
          {
            opcode: "save_data",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("save data of user [USERNAME]"),
            arguments: {
              USERNAME: {
                type: Scratch.ArgumentType.STRING
              }
            },
            disableMonitor: true
          }
        ],
        menus: {
          PROJECT_DATA_MENU: {
            acceptReporters: false,
            items: ["JSON", "id", "author username", "upload timestamp", "title", "description", "version", "rating", "comment count", "upvote count", "downvote count"]
          },
          USER_DATA_MENU: {
            acceptReporters: false,
            items: ["JSON", "id", "username", "display name", "country", "bio", "join date", "banner URL", "follower count", "following count", "verified?", "project count", "hatch team?", "color theme"]
          },
          SERVER_MENU: {
            acceptReporters: true,
            items: ["main", "save state"]
          }
        }
      };
    }
  
    async status(args) {
      try {
        // eslint-disable-next-line extension/use-scratch-fetch
        if (args.SERVER === "main") return (await fetch("https://api.hatch.lol/")).status;
        // eslint-disable-next-line extension/use-scratch-fetch
        if (args.SERVER === "save state") return (await fetch("https://hatchsaves.raynec.dev/")).status;
      } catch {
        return 500;
      }
    }
  
    async ok(args) {
      try {
        // eslint-disable-next-line extension/use-scratch-fetch
        if (args.SERVER === "main") return (await fetch("https://api.hatch.lol/")).ok;
        // eslint-disable-next-line extension/use-scratch-fetch
        if (args.SERVER === "save state") return (await fetch("https://hatchsaves.raynec.dev/")).ok;
      } catch {
        return false;
      }
    }

    user(args) {
      if (args.DATA === "author username") return auth_user.author.username;
      if (args.DATA === "JSON") return JSON.stringify(auth_user);
      let r = auth_user[["id", "name", "displayName", "country", "bio", "joinDate", "bannerImage", "followerCount", "followingCount", "verified", "projectCount", "hatchTeam", "theme"][["id", "username", "display name", "country", "bio", "join date", "banner URL", "follower count", "following count", "verified?", "project count", "hatch team?", "color theme"].indexOf(args.DATA)]];
      if (r !== null) return r;
      else return  "";
    }
  
    project_id() {
      return projectId;
    }
  
    async get_project(args) {
      let num = parseInt(args.ID);
      if (Number.isNaN(num) || num < 0) return "";
      try {
        // eslint-disable-next-line extension/use-scratch-fetch
        let res = await fetch(`https://api.hatch.lol/projects/${num}`);
        if (res.ok) {
          let data = await res.json();
          if (args.DATA === "author username") return data.author.username;
          if (args.DATA === "JSON") return JSON.stringify(data);
          let r = data[["id", "uploadTs", "title", "description", "version", "rating", "commentCount", "upvotes", "downvotes"][["id", "upload timestamp", "title", "description", "version", "rating", "comment count", "upvote count", "downvote count"].indexOf(args.DATA)]];
          if (r !== null) return r;
          else return "";
        } else {
          return "";
        }
      } catch (error) {
        return "";
      }
    }
  
    async get_user(args) {
      if (args.USERNAME.toString().includes("/")) return "";
      try {
        // eslint-disable-next-line extension/use-scratch-fetch
        let res = await fetch(`https://api.hatch.lol/users/${args.USERNAME}`);
        if (res.ok) {
          let data = await res.json();
          if (args.DATA === "author username") return data.author.username;
          if (args.DATA === "JSON") return JSON.stringify(data);
          let r = data[["id", "name", "displayName", "country", "bio", "joinDate", "bannerImage", "followerCount", "followingCount", "verified", "projectCount", "hatchTeam", "theme"][["id", "username", "display name", "country", "bio", "join date", "banner URL", "follower count", "following count", "verified?", "project count", "hatch team?", "color theme"].indexOf(args.DATA)]];
          if (r !== null) return r;
          else return  "";
        } else {
          return "";
        }
      } catch (error) {
        return "";
      }
    }
  
    async write_data(args) {
      if (projectId === -1) return;
      try {
        // eslint-disable-next-line extension/use-scratch-fetch
        let res = await fetch(`https://api.hatch.lol/users/${args.USERNAME}`);
        if (res.status === 200) {
          let user = await res.json();
          // eslint-disable-next-line extension/use-scratch-fetch
          await fetch(`https://hatchsaves.raynec.dev/${projectId}/${user.id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              data: args.DATA
            })
          });
        }
      } catch (error) {
        return "";
      }
    }
    
    async save_data(args) {
      if (projectId === -1) return "";
      try {
        // eslint-disable-next-line extension/use-scratch-fetch
        let res = await fetch(`https://api.hatch.lol/users/${args.USERNAME}`);
        if (res.status === 200) {
          let user = await res.json();
          // eslint-disable-next-line extension/use-scratch-fetch
          res = await fetch(`https://hatchsaves.raynec.dev/${projectId}/${user.id}`);
          if (res.ok) {
            let data = await res.json();
            return data.data;
          } else {
            return "";
          }
        } else {
          return "";
        }
      } catch (error) {
        return "";
      }
    }
  }

  // @ts-ignore
  Scratch.extensions.register(new HatchDotLol());
})(Scratch);
