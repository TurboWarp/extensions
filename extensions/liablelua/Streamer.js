// License: MPL-2.0
// Name: Streamer
// ID: Streamer
// Description: OBSChat support for Scratch.
// By: liablelua <https://scratch.mit.edu/users/scrattching/>

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

  const STYLES = [
    "dark",
    "light",
    "bttv_light",
    "bttv_dark",
    "s0n0s_1080",
    "s0n0s_1440",
  ];

  const Settings = {
    username: "xQc", // Default username will be xQc, his chat is always active to test.
    theme: "bttv_dark", // best theme oat
    fade: 30, // Chat fade default should ALWAYS be 30 DO NOT CHANGE.
    bots: "true", // always nice to see nightbot in chat yk
    prevent: "false", // if your channel's chat is like 10+ msgs/sec do not enable this
    width: 50, // Default
    height: 50, // Default
    position: "static", // Default
  };

  const ImageSettings = {
    image: "https://extensions.turbowarp.org/favicon.ico", // turbowarp icon
    width: 10,
    height: 10,
    position: "static",
  };

  const TextSettings = {
    font: "Pixel",
    text: "liablelua was here",
    width: 10,
    height: 10,
    position: "static",
    weight: "none",
    style: "none",
    size: 12,
  };

  const icon =
    "data:image/png;base64,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";

  const POSITIONS = ["static", "relative", "fixed", "absolute", "sticky"];

  const CreateTextElement = () => {
    text = document.createElement("p");
    text.style.fontFamily = Scratch.Cast.toString(TextSettings.font);
    text.innerText = Scratch.Cast.toString(TextSettings.text);
    text.style.width = Scratch.Cast.toString(TextSettings.width);
    text.style.height = Scratch.Cast.toString(TextSettings.height);
    text.style.border = "none";
    text.style.position = "absolute";
    text.style.bottom = "0";
    text.style.fontWeight = TextSettings.weight;
    text.style.fontStyle = TextSettings.style;
    text.style.fontSize = Scratch.Cast.toString(TextSettings.size) + "px";
  };

  const CreateImageElement = () => {
    image = document.createElement("img");
    image.style.width = Scratch.Cast.toString(ImageSettings.width) + "%";
    image.style.height = Scratch.Cast.toString(ImageSettings.height) + "%";
    image.style.position = Scratch.Cast.toString(ImageSettings.position);
    image.setAttribute("src", Scratch.Cast.toString(ImageSettings.image));
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
            text: Scratch.translate("Stream Chat"),
          },
          {
            opcode: "setusername",
            text: Scratch.translate("set username [username]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              username: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "xQc",
              },
            },
          },
          {
            opcode: "settheme",
            text: Scratch.translate("set theme [theme]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              theme: {
                type: Scratch.ArgumentType.STRING,
                menu: "theme",
              },
            },
          },
          {
            opcode: "setfade",
            text: Scratch.translate("set chat fade [fade]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              fade: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 30,
              },
            },
          },
          {
            opcode: "setbots",
            text: Scratch.translate("chat bots enabled [bots]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              bots: {
                type: Scratch.ArgumentType.STRING,
                menu: "bools",
              },
            },
          },
          {
            opcode: "setprevent",
            text: Scratch.translate("prevent clipping enabled [prevent]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              prevent: {
                type: Scratch.ArgumentType.STRING,
                menu: "bools",
              },
            },
          },
          {
            opcode: "setsize",
            text: Scratch.translate("set css-size W [width]% H [height]%"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              width: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
              height: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
            },
          },
          {
            opcode: "setposition",
            text: Scratch.translate("set css-position [position]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              position: {
                type: Scratch.ArgumentType.STRING,
                menu: "position",
              },
            },
          },
          {
            opcode: "setupchat",
            text: Scratch.translate("create stream chat"),
            blockType: Scratch.BlockType.COMMAND,
          },
          {
            opcode: "closechat",
            text: Scratch.translate("close chat"),
            blockType: Scratch.BlockType.COMMAND,
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Text Overlay"),
          },
          {
            opcode: "setfont",
            text: Scratch.translate("set font [font]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              font: {
                type: Scratch.ArgumentType.STRING,
                menu: "font",
              },
            },
          },
          {
            opcode: "settext",
            text: Scratch.translate("set text [text]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "liablelua was here",
              },
            },
          },
          {
            opcode: "settextsize",
            text: Scratch.translate("set css-size W [width]% H [height]%"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              width: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
              height: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
            },
          },
          {
            opcode: "settextposition",
            text: Scratch.translate("set css-position [position]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              position: {
                type: Scratch.ArgumentType.STRING,
                menu: "position",
              },
            },
          },
          {
            opcode: "setbold",
            text: Scratch.translate("set bold [bold]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              bold: {
                type: Scratch.ArgumentType.STRING,
                menu: "bools",
              },
            },
          },
          {
            opcode: "setitalic",
            text: Scratch.translate("set italic [italic]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              italic: {
                type: Scratch.ArgumentType.STRING,
                menu: "bools",
              },
            },
          },
          {
            opcode: "setfontsize",
            text: Scratch.translate("set font-size [size]px"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              size: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 12,
              },
            },
          },
          {
            opcode: "text",
            text: Scratch.translate("create text"),
            blockType: Scratch.BlockType.COMMAND,
          },
          {
            opcode: "closetext",
            text: Scratch.translate("close text"),
            blockType: Scratch.BlockType.COMMAND,
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Image Overlay"),
          },
          {
            opcode: "setimage",
            text: Scratch.translate("set image link [image]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              image: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/favicon.ico",
              },
            },
          },
          {
            opcode: "setimagesize",
            text: Scratch.translate("set css size W [width]% H [height]%"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              width: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
              },
              height: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
              },
            },
          },
          {
            opcode: "setimageposition",
            text: Scratch.translate("set css position [position]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              position: {
                type: Scratch.ArgumentType.STRING,
                menu: "position",
              },
            },
          },
          {
            opcode: "image",
            text: Scratch.translate("create image"),
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
          theme: {
            acceptReporters: true,
            items: "getThemes",
          },
          bools: {
            acceptReporters: true,
            items: "getBools",
          },
        },
      };
    }

    setusername(args) {
      Settings.username = args.username;
    }

    settheme(args) {
      Settings.theme = args.theme;
    }

    setfade(args) {
      Settings.fade = args.fade;
    }

    setbots(args) {
      Settings.bots = args.bots;
    }

    setprevent(args) {
      Settings.prevent = args.prevent;
    }

    setsize(args) {
      Settings.width = args.width;
      Settings.height = args.height;
    }

    setposition(args) {
      Settings.position = args.position;
    }

    setupchat() {
      if (chat !== null) Scratch.renderer.removeOverlay(chat);
      const Link =
        "https://nightdev.com/hosted/obschat/?theme=" +
        Scratch.Cast.toString(Settings.theme) +
        "&channel=" +
        Scratch.Cast.toString(Settings.username) +
        "&fade=" +
        Scratch.Cast.toNumber(Settings.fade) +
        "&bot_activity=" +
        Scratch.Cast.toString(Settings.bots) +
        "&prevent_clipping=" +
        Scratch.Cast.toString(Settings.prevent);
      chat = document.createElement("iframe");
      chat.style.width = Scratch.Cast.toString(Settings.width) + "%" || "50%";
      chat.style.height = Scratch.Cast.toString(Settings.height) + "%" || "50%";
      chat.style.border = "none";
      chat.style.position = Scratch.Cast.toString(Settings.position);
      chat.setAttribute("allowtransparency", "true");
      chat.setAttribute("src", Link);
      Scratch.renderer.addOverlay(chat, "manual");
    }

    closechat() {
      if (chat != null) {
        Scratch.renderer.removeOverlay(chat);
        chat = null;
      }
    }

    setfont(args) {
      TextSettings.font = args.font;
    }

    settext(args) {
      TextSettings.text = args.text;
    }

    settextsize(args) {
      TextSettings.width = args.width;
      TextSettings.height = args.height;
    }

    settextposition(args) {
      TextSettings.position = args.position;
    }

    setbold(args) {
      args.bold === "true"
        ? (TextSettings.weight = "bold")
        : (TextSettings.weight = "none");
    }

    setitalic(args) {
      args.italic === "true"
        ? (TextSettings.style = "italic")
        : (TextSettings.style = "none");
    }

    setfontsize(args) {
      TextSettings.size = args.size;
    }

    text() {
      if (text !== null) Scratch.renderer.removeOverlay(text);
      CreateTextElement();
      Scratch.renderer.addOverlay(text, "manual");
    }

    setimage(args) {
      ImageSettings.image = args.image;
    }

    setimagesize(args) {
      ImageSettings.width = args.width;
      ImageSettings.height = args.height;
    }

    setimageposition(args) {
      ImageSettings.position = args.position;
    }

    image(args) {
      if (image !== null) Scratch.renderer.removeOverlay(image);
      CreateImageElement();
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
      return POSITIONS;
    }

    getThemes() {
      return STYLES;
    }

    getBools() {
      return ["true", "false"];
    }
  }

  Scratch.extensions.register(new Streamer());
})(Scratch);
