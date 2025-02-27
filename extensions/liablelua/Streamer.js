// Name: Streamer
// ID: Streamer
// Description: OBSChat support for Scratch.
// By: liablelua <https://scratch.mit.edu/users/scrattching/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  let chat = null;
  let text = null;
  let image = null;

  const FONTS = [
    "Sans Serif",
    "Serif",
    "Handwriting",
    "Marker",
    "Curly",
    "Pixel",
  ];

  const POSITIONS = ["static", "relative", "fixed", "absolute", "sticky"];

  const CreateTextElement = (args) => {
    text = document.createElement("p");
    text.style.font = Scratch.Cast.toString(args.font);
    text.innerText = Scratch.Cast.toString(args.text);
    text.width = "20%";
    text.height = "10%";
    text.style.border = "none";
    text.style.position = "absolute";
    text.style.bottom = 0;
    if (Scratch.Cast.toBoolean(args.bold)) {
      text.style.fontWeight = "bold";
    }
    if (Scratch.Cast.toBoolean(args.italic)) {
      text.style.fontStyle = "italic";
    }
    text.style.fontSize = Scratch.Cast.toString(args.size) + "px";
    text.style.fontFamily = Scratch.Cast.toString(args.font);
  };

  const CreateImageElement = (args) => {
    image = document.createElement("img");
    image.style.width = Scratch.Cast.toString(args.width) + "px";
    image.style.height = Scratch.Cast.toString(args.height) + "px";
    image.style.position = Scratch.Cast.toString(args.position);
    if (Scratch.Cast.toBoolean(args.bottom)) {
      image.style.bottom = 0;
    } else {
      if (Scratch.Cast.toBoolean(args.top)) {
        image.style.top = 0;
      }
    }
    image.setAttribute("src", Scratch.Cast.toString(args.image));
  };

  class Streamer {
    getInfo() {
      return {
        id: "Streamer",
        name: Scratch.translate("Streamer"),
        color1: "#772CE8",
        menuIconURI:
          "https://liablelua.github.io/liables-extensions/StreamerURI.png",
        blockIconURI:
          "https://liablelua.github.io/liables-extensions/StreamerURI.png",
        docsURI:
          "https://github.com/TurboWarp/extensions/blob/master/docs/liablelua/Streamer.md",
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Streamer Chat"),
          },
          {
            opcode: "setupchat",
            text: Scratch.translate(
              "setup chat [username] chat fade enabled [fade] show bots [bots] prevent clipping [prevent] width [width] height [height] position [position]"
            ),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              username: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Username",
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
                menu: "position",
              },
            },
          },
          {
            opcode: "closechat",
            text: Scratch.translate("close chat"),
            blockType: Scratch.BlockType.COMMAND,
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Overlays"),
          },
          {
            opcode: "text",
            text: Scratch.translate(
              "create text overlay with text [text] with italic [italic] with bold [bold] with size [size] with font [font]"
            ),
            blockType: Scratch.BlockType.COMMAND,
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
                defaultValue: "20",
              },
              font: {
                type: Scratch.ArgumentType.STRING,
                menu: "font",
              },
            },
          },
          {
            opcode: "image",
            text: Scratch.translate(
              "create image with image [image] with width [width] with height [height] with position [position] is bottom [bottom] is top [top]"
            ),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              image: {
                type: Scratch.ArgumentType.STRING,
                defaultValue:
                  "https://liablelua.github.io/liables-extensions/StreamerURI.png",
              },
              width: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "50",
              },
              height: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "50",
              },
              position: {
                type: Scratch.ArgumentType.STRING,
                menu: "position",
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
            text: Scratch.translate("close text"),
            blockType: Scratch.BlockType.COMMAND,
          },
          {
            opcode: "closeimage",
            text: Scratch.translate("close image"),
            blockType: Scratch.BlockType.COMMAND,
          },
        ],
        menus: {
          font: {
            acceptReporters: true,
            items: "getFonts",
          },
          position: {
            acceptReporters: true,
            items: "getPositions",
          },
        },
      };
    }

    setupchat(args) {
      if (chat == null) {
        const Link =
          "https://nightdev.com/hosted/obschat/?theme=bttv_dark&channel=" +
          Scratch.Cast.toString(args.username) +
          "&fade=" +
          Scratch.Cast.toNumber(args.fade) +
          "&bot_activity=" +
          Scratch.Cast.toString(args.bots) +
          "&prevent_clipping=" +
          Scratch.Cast.toString(args.prevent);
        chat = document.createElement("iframe");
        chat.style.width = Scratch.Cast.toString(args.width);
        chat.style.height = Scratch.Cast.toString(args.height);
        chat.style.border = "none";
        chat.style.position = Scratch.Cast.toString(args.position);
        chat.setAttribute("allowtransparency", "true");
        chat.setAttribute("src", Link);
        Scratch.renderer.addOverlay(chat, "manual");
      }
    }

    closechat() {
      if (chat != null) {
        Scratch.renderer.removeOverlay(chat);
        chat = null;
      }
    }

    text(args) {
      if (text !== null) Scratch.renderer.removeOverlay(text);
      CreateTextElement(args);
      Scratch.renderer.addOverlay(text, "manual");
    }

    image(args) {
      if (text !== null) Scratch.renderer.removeOverlay(image);
      CreateImageElement(args);
      Scratch.renderer.addOverlay(image, "manual");
    }

    closetext() {
      if (text != null) {
        Scratch.renderer.removeOverlay(text);
        text = null;
      }
    }

    closeimage() {
      if (image != null) {
        Scratch.renderer.removeOverlay(image);
        image = null;
      }
    }

    // https://extensions.turbowarp.org/lab/text.js (thx garbo <3)

    getFonts() {
      const customFonts = Scratch.vm.runtime.fontManager
        ? Scratch.vm.runtime.fontManager.getFonts().map((i) => ({
            text: i.name,
            value: i.family,
          }))
        : [];

      return [...FONTS, ...customFonts];
    }

    getPositions() {
      return [...POSITIONS];
    }
  }

  Scratch.extensions.register(new Streamer());
})(Scratch);
