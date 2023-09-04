// Name: TurboAPI
// ID: TurboAPI
// Description: GET and POST requests in Scratch!
// By: Tek <https://github.com/Tekinical/>

(function (Scratch) {
  "use strict";

  let APIResponse = null;
  let JsonThing = null;

  class TurboAPI {
    getInfo() {
      return {
        id: "TurboAPI",
        name: "TurboAPI",
        menuIconURI: "https://files.catbox.moe/4eb196.png",
        color1: "#FF4C4C",
        blocks: [
          {
            opcode: "sendResponse",
            blockType: Scratch.BlockType.COMMAND,
            text: "GET Request from [endpoint]",
            arguments: {
              endpoint: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Website Endpoint",
              },
            },
          },
          {
            opcode: "sendPost",
            blockType: Scratch.BlockType.COMMAND,
            text: "Send a Post Request to [endpoint] with [arg]",
            arguments: {
              endpoint: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Website Endpoint",
              },
              arg: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Arguments",
              },
            },
          },
          {
            opcode: "responseAPI",
            blockType: Scratch.BlockType.REPORTER,
            text: "API Response",
            blockIconURI:
              "https://freeiconshop.com/wp-content/uploads/edd/download-flat.png",
          },
        ],
      };
    }

    sendResponse(args) {
      APIResponse = Scratch.fetch(args.endpoint)
        .then((r) => r.text())
        .catch(() => "");
    }

    sendPost(args) {
      APIResponse = Scratch.fetch(args.endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: args.arg,
      })
        .then((r) => r.text())
        .catch(() => "");
    }

    responseAPI() {
      return APIResponse;
    }
  }

  Scratch.extensions.register(new TurboAPI());
})(Scratch);
