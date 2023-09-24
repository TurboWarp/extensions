// Name: Twitch
// ID: twitch
// Description: Blocks that allow you to stream easier on TurboWarp.
// By: BOP <https://scratch.mit.edu/users/CEFSharp/>

(function (Scratch) {
  "use strict";

  let chat = null;
  let token = null;
  let text = null;
  let image = null;

  class Twitch {
    getInfo() {
      return {
        id: "twitch",
        name: "Twitch",
        color1: "#772CE8",
        menuIconURI: "https://tekinical.github.io/twitchURI.png",
        docsURI:
          "https://github.com/Tekinical/tekinical.github.io/blob/main/Twitch%20Extension%20Doc.md",
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Twitch Chat",
          },
          {
            opcode: "setupchat",
            text: "setup chat [username] chat fade enabled [fade] show bots [bots] prevent clipping [prevent] width [width] height [height] position [position]",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: "https://tekinical.github.io/twitchURI.png",
            arguments: {
              username: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Twitch Username",
              },
              fade: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 30,
              },
              bots: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: true,
              },
              prevent: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: false,
              },
              width: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "100%",
              },
              height: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "100%",
              },
              position: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "absolute",
              },
            },
          },
          {
            opcode: "closechat",
            text: "close chat",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: "https://tekinical.github.io/twitchURI.png",
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Overlays",
          },
          {
            opcode: "text",
            text: "create text overlay with text [text] with italic [italic] with bold [bold] with size [size] with font [font]",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: "https://tekinical.github.io/twitchURI.png",
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "hi chat",
              },
              italic: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: false,
              },
              bold: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: false,
              },
              size: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "20px",
              },
              font: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "MS Comic Sans",
              },
            },
          },
          {
            opcode: "image",
            text: "create image with image [image] with width [width] with height [height] with position [position] is bottom [bottom] is top [top]",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: "https://tekinical.github.io/twitchURI.png",
            arguments: {
              image: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://tekinical.github.io/twitchURI.png",
              },
              width: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "50px",
              },
              height: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "50px",
              },
              position: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "absolute",
              },
              bottom: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: false,
              },
              top: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: false,
              },
            },
          },
          {
            opcode: "closetext",
            text: "close text",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: "https://tekinical.github.io/twitchURI.png",
          },
          {
            opcode: "closeimage",
            text: "close image",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: "https://tekinical.github.io/twitchURI.png",
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Utilities",
          },
          {
            opcode: "true",
            text: "true",
            blockType: Scratch.BlockType.BOOLEAN,
            blockIconURI: "https://tekinical.github.io/twitchURI.png",
          },
          {
            opcode: "false",
            text: "false",
            blockType: Scratch.BlockType.BOOLEAN,
            blockIconURI: "https://tekinical.github.io/twitchURI.png",
          },
        ],
      };
    }

    setupchat(args) {
      var Link =
        "https://nightdev.com/hosted/obschat/?theme=bttv_dark&channel=" +
        args.username +
        "&fade=" +
        args.fade +
        "&bot_activity=" +
        args.bots +
        "&prevent_clipping=" +
        args.prevent;
      chat = document.createElement("iframe");
      chat.style.width = args.width;
      chat.style.height = args.height;
      chat.style.border = "none";
      chat.style.position = args.position;
      chat.setAttribute("allowtransparency", "true");
      chat.setAttribute("src", Link);
      Scratch.renderer.addOverlay(chat, "manual");
    }

    closechat() {
      if (chat == null) {
        console.log("Can't close chat if chat wasn't opened.");
      } else {
        Scratch.renderer.removeOverlay(chat);
        chat = null;
      }
    }

    text(args) {
      if (text == null) {
        text = document.createElement("p");
        text.style.font = args.font;
        text.innerText = args.text;
        text.width = "20%";
        text.height = "10%";
        text.style.border = "none";
        text.style.position = "absolute";
        text.style.bottom = 0;
        if (args.bold) {
          text.style.fontWeight = "bold";
        }
        if (args.italic) {
          text.style.fontStyle = "italic";
        }
        text.style.fontSize = args.size;
        text.style.fontFamily = args.font;
        Scratch.renderer.addOverlay(text, "manual");
      } else {
        Scratch.renderer.removeOverlay(text);
        text = document.createElement("p");
        text.style.font = args.font;
        text.innerText = args.text;
        text.width = "20%";
        text.height = "10%";
        text.style.border = "none";
        text.style.position = "absolute";
        text.style.bottom = 0;
        if (args.bold) {
          text.style.fontWeight = "bold";
        }
        if (args.italic) {
          text.style.fontStyle = "italic";
        }
        text.style.fontSize = args.size;
        text.style.fontFamily = args.font;
        Scratch.renderer.addOverlay(text, "manual");
      }
    }

    image(args) {
      if (image == null) {
        image = document.createElement("img");
        image.style.width = args.width;
        image.style.height = args.height;
        image.style.position = args.position;
        if (args.bottom) {
          image.style.bottom = 0;
        } else {
          if (args.top) {
            image.style.top = 0;
          }
        }
        image.setAttribute("src", args.image);
        Scratch.renderer.addOverlay(image, "manual");
      } else {
        Scratch.renderer.removeOverlay(image);
        image = document.createElement("img");
        image.style.width = args.width;
        image.style.height = args.height;
        image.style.position = args.position;
        if (args.bottom) {
          image.style.bottom = 0;
        } else {
          if (args.top) {
            image.style.top = 0;
          }
        }
        image.setAttribute("src", args.image);
        Scratch.renderer.addOverlay(image, "manual");
      }
    }

    closetext() {
      if (text == null) {
        console.log("No text element has been created!");
      } else {
        Scratch.renderer.removeOverlay(text);
        text = null;
      }
    }

    closeimage() {
      if (image == null) {
        console.log("No img element has been created!");
      } else {
        Scratch.renderer.removeOverlay(image);
        image = null;
      }
    }

    true() {
      return true;
    }

    false() {
      return false;
    }
  }

  Scratch.extensions.register(new Twitch());
})(Scratch);
