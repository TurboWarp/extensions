// Name: CORS Proxy
// ID: nkcorsproxy
// Description: Simple blocks for avoiding CORS errors.
// By: NamelessCat <https://scratch.mit.edu/users/NexusKitten/>

(function(Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("CORS Proxy must run unsandboxed");
  }

  var proxy = "corsproxy";

  // Provide 2 options in case one goes down, or something.
  const corsproxy = "https://corsproxy.io/?";
  const allorigins = "https://api.allorigins.win/raw?url=";

  class nkcorsproxy {
    getInfo() {
      return {
        id: "nkcorsproxy",
        name: "CORS Proxy",
        docsURI: "https://extensions.turbowarp.org/CubesterYT/corsproxy",
        color1: "#376661",
        color2: "#3b6766",
        blocks: [
          "---",
          {
            opcode: "addcors",
            blockType: Scratch.BlockType.REPORTER,
            text: "[URL] CORS protected",
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                default: ""
              }
            }
          },
          {
            opcode: "fetchcors",
            blockType: Scratch.BlockType.REPORTER,
            text: "fetch [URL] CORS protected",
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                default: ""
              }
            }
          },
          "---",
          {
            opcode: "setcors",
            blockType: Scratch.BlockType.COMMAND,
            text: "change proxy to [PROXY]",
            arguments: {
              PROXY: {
                type: Scratch.ArgumentType.STRING,
                menu: "PROXIES",
                default: proxy
              }
            }
          },
        ],
        menus: {
          PROXIES: {
            acceptreporters: true,
            items: ["corsproxy", "allorigins"]
          }
        }
      };
    }

    addcors(args) {
      if (proxy === "allorigins") {
        return allorigins + args.URL;
      }
      return corsproxy + encodeURIComponent(args.URL);
    }

    async fetchcors(args) {
      if (proxy === "allorigins") {
        return await Scratch.fetch(allorigins + args.URL)
          .then(r => r.text())
          .catch(() => "");
      }
      return await Scratch.fetch(corsproxy + encodeURIComponent(args.URL))
        .then(r => r.text())
        .catch(() => "");
    }

    setcors(args) {
      proxy = args.PROXY;
    }
  }

  Scratch.extensions.register(new nkcorsproxy());
})(Scratch);
