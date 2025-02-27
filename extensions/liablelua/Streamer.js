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

  const icon =
    "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";

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
        menuIconURI: icon,
        blockIconURI: icon,
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
                defaultValue: "https://turbowarp.org/favicon.ico",
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
