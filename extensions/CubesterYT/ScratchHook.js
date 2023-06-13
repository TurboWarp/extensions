(function (Scratch) {
  "use strict";

  const icon = "https://raw.githubusercontent.com/CubesterYT/dependencies/main/TurboWarp%20Extensions/ScratchHook/Logo.png";

  class ScratchHook {
    getInfo() {
      return {
        id: "cubesterScratchHook",
        name: "ScratchHook",
        color1: "#3843B0",
        menuIconURI: icon,

        blocks: [
          {
            opcode: "webhook",
            text: "webhook data: [hookDATA] webhook url: [hookURL]",
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              hookURL: {
                type: Scratch.ArgumentType.STRING
              }
            }
          },
          {
            opcode: "params",
            blockType: Scratch.BlockType.REPORTER,
            text: "[MENU] [DATA]",
            arguments: {
              MENU: {
                type: Scratch.ArgumentType.STRING,
                menu: "PARAMS"
              },
              DATA: {
                type: Scratch.ArgumentType.STRING
              }
            }
          },
          {
            opcode: "connector",
            blockType: Scratch.BlockType.REPORTER,
            text: "[STRING1] , [STRING2]"
          }
        ],
        menus: {
          PARAMS: {
            acceptReporters: true,
            items: ["content","name","icon"]
          }
        }
      };
    }

    webhook ({hookDATA,hookURL}) {
      const arrayDATA = hookDATA.split("{,}");
      if (hookDATA.includes("content") && hookDATA.includes("username") && hookDATA.includes("avatar_url")) {
        if (arrayDATA[0].includes("content") && arrayDATA[1].includes("username") && arrayDATA[2].includes("avatar_url")) {
          Scratch.fetch(hookURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({content: `${arrayDATA[0].substr(9)}`, username: `${arrayDATA[1].substr(10)}`, avatar_url: `${arrayDATA[2].substr(12)}`})
          });
        } else if (arrayDATA[0].includes("content") && arrayDATA[1].includes("avatar_url") && arrayDATA[2].includes("username")) {
          Scratch.fetch(hookURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({content: `${arrayDATA[0].substr(9)}`, username: `${arrayDATA[2].substr(10)}`, avatar_url: `${arrayDATA[1].substr(12)}`})
          });
        } else if (arrayDATA[0].includes("username") && arrayDATA[1].includes("content") && arrayDATA[2].includes("avatar_url")) {
          Scratch.fetch(hookURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({content: `${arrayDATA[1].substr(9)}`, username: `${arrayDATA[0].substr(10)}`, avatar_url: `${arrayDATA[2].substr(12)}`})
          });
        } else if (arrayDATA[0].includes("username") && arrayDATA[1].includes("avatar_url") && arrayDATA[2].includes("content")) {
          Scratch.fetch(hookURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({content: `${arrayDATA[2].substr(9)}`, username: `${arrayDATA[0].substr(10)}`, avatar_url: `${arrayDATA[1].substr(12)}`})
          });
        } else if (arrayDATA[0].includes("avatar_url") && arrayDATA[1].includes("content") && arrayDATA[2].includes("username")) {
          Scratch.fetch(hookURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({content: `${arrayDATA[1].substr(9)}`, username: `${arrayDATA[2].substr(10)}`, avatar_url: `${arrayDATA[0].substr(12)}`})
          });
        } else if (arrayDATA[0].includes("avatar_url") && arrayDATA[1].includes("username") && arrayDATA[2].includes("content")) {
          Scratch.fetch(hookURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({content: `${arrayDATA[2].substr(9)}`, username: `${arrayDATA[1].substr(10)}`, avatar_url: `${arrayDATA[0].substr(12)}`})
          });
        }
      } else if (hookDATA.includes("content") && hookDATA.includes("username")) {
        if (arrayDATA[0].includes("content") && arrayDATA[1].includes("username")) {
          Scratch.fetch(hookURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({content: `${arrayDATA[0].substr(9)}`, username: `${arrayDATA[1].substr(10)}`})
          });
        } else if (arrayDATA[0].includes("username") && arrayDATA[1].includes("content")) {
          Scratch.fetch(hookURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({content: `${arrayDATA[1].substr(9)}`, username: `${arrayDATA[0].substr(10)}`})
          });
        }
      } else if (hookDATA.includes("content") && hookDATA.includes("avatar_url")) {
        if (arrayDATA[0].includes("content") && arrayDATA[1].includes("avatar_url")) {
          Scratch.fetch(hookURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({content: `${arrayDATA[0].substr(9)}`, avatar_url: `${arrayDATA[1].substr(12)}`})
          });
        } else if (arrayDATA[0].includes("avatar_url") && arrayDATA[1].includes("content")) {
          Scratch.fetch(hookURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({content: `${arrayDATA[1].substr(9)}`, avatar_url: `${arrayDATA[0].substr(12)}`})
          });
        }
      } else if (hookDATA.includes("content")) {
        Scratch.fetch(hookURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({content: `${arrayDATA[0].substr(9)}`})
        });
      }
    }
    params ({MENU,DATA}) {
      if (MENU == "content") {
        return `content: ${DATA}`;
        } else if (MENU == "name") {
          return `username: ${DATA}`;
        } else if (MENU == "icon") {
          return `avatar_url: ${DATA}`;
        }
        return false;
    }
    connector ({STRING1,STRING2}) {
      return `${STRING1}{,}${STRING2}`;
    }
  }

  Scratch.extensions.register(new ScratchHook());
})(Scratch);