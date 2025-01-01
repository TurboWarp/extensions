// Name: Rich Presence
// ID: cubesterRichPresence
// Description: Adds rich presence support to your project.
// By: CubesterYT <https://scratch.mit.edu/users/CubesterYT/>

// Version V.1.0.0

(function (Scratch) {
  "use strict";

  /* globals RPC */

  const canUseRPC = typeof RPC !== "undefined";
  const client = canUseRPC && new RPC.Client({ transport: "ipc" });

  let clientID = "";
  let clientData = {};
  let clientReady = false;

  if (canUseRPC) {
    client.on("ready", () => {
      clientReady = true;
    });
  }

  class RichPresence {
    getInfo() {
      return {
        id: "cubesterRichPresence",
        name: "Rich Presence",
        color1: "#4D5057",
        docsURI: "https://extensions.turbowarp.org/CubesterYT/RichPresence",

        blocks: [
          {
            opcode: "hasPresence",
            text: Scratch.translate("has rich presence support?"),
            blockType: Scratch.BlockType.BOOLEAN,
          },
          {
            opcode: "setClientID",
            text: Scratch.translate("set client id [ID] and log in"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "clientID",
            text: Scratch.translate("client id"),
            blockType: Scratch.BlockType.REPORTER,
          },

          "---",

          {
            opcode: "setData",
            text: Scratch.translate("set [DATA] to [INPUT]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              DATA: {
                type: Scratch.ArgumentType.STRING,
                menu: "DATA",
              },
              INPUT: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "setTimestamp",
            text: "turn timestamp [TOGGLE]",
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              TOGGLE: {
                type: Scratch.ArgumentType.STRING,
                menu: "TOGGLE",
              },
            },
          },
          {
            opcode: "presenceData",
            text: Scratch.translate("rich presence data"),
            blockType: Scratch.BlockType.REPORTER,
          },

          "---",

          {
            opcode: "presenceReady",
            text: Scratch.translate("is rich presence ready?"),
            blockType: Scratch.BlockType.BOOLEAN,
          },
          {
            opcode: "updatePresence",
            text: Scratch.translate("update rich presence"),
            blockType: Scratch.BlockType.COMMAND,
          },
        ],
        menus: {
          DATA: {
            acceptReporters: false,
            items: [
              { text: Scratch.translate("details"), value: "details" },
              { text: Scratch.translate("state"), value: "state" },
              {
                text: Scratch.translate("large image key"),
                value: "large image key",
              },
              {
                text: Scratch.translate("large image text"),
                value: "large image text",
              },
              {
                text: Scratch.translate("small image key"),
                value: "small image key",
              },
              {
                text: Scratch.translate("small image text"),
                value: "small image text",
              },
              { text: Scratch.translate("party size"), value: "party size" },
              { text: Scratch.translate("party max"), value: "party max" },
              "JSON",
            ],
          },
          TOGGLE: {
            acceptReporters: false,
            items: ["on", "off"],
          },
        },
      };
    }

    hasPresence() {
      return canUseRPC;
    }
    setClientID(args) {
      if (!canUseRPC) return;
      args.ID = Scratch.Cast.toNumber(args.ID);
      clientID = args.ID;
      client.login({ clientID }).catch(console.error);
    }
    clientID() {
      if (!canUseRPC) return "Rich Presence unavailable";
      return clientID;
    }
    setData(args) {
      if (!canUseRPC) return;
      args.INPUT = Scratch.Cast.toString(args.INPUT);
      switch (args.DATA) {
        case "details":
          clientData.details = args.INPUT;
          break;
        case "state":
          clientData.state = args.INPUT;
          break;
        case "large image key":
          clientData.largeImageKey = args.INPUT;
          break;
        case "large image text":
          clientData.largeImageText = args.INPUT;
          break;
        case "small image key":
          clientData.smallImageKey = args.INPUT;
          break;
        case "small image text":
          clientData.smallImageText = args.INPUT;
          break;
        case "party size":
          clientData.partySize = Scratch.Cast.toNumber(args.INPUT);
          break;
        case "party max":
          clientData.partyMax = Scratch.Cast.toNumber(args.INPUT);
          break;
        case "JSON":
          try {
            clientData = JSON.parse(args.INPUT);
          } catch (error) {}
          break;
        default:
          return; // This shouldn't happen, but it's good to have.
      }
    }
    setTimestamp(args) {
      if (!canUseRPC) return;
      switch (args.TOGGLE) {
        case "on":
          clientData.startTimestamp = Date.now();
          break;
        case "off":
          clientData.startTimestamp = null;
          break;
        default:
          return; // This shouldn't happen, but it's good to have.
      }
    }
    presenceData() {
      if (!canUseRPC) return "Rich Presence unavailable";
      return JSON.stringify(clientData);
    }
    presenceReady() {
      if (!canUseRPC) return false;
      return clientReady;
    }
    updatePresence() {
      if (!canUseRPC) return;
      clientData.instance = false;
      client.setActivity(clientData);
    }
  }

  Scratch.extensions.register(new RichPresence());
})(Scratch);
