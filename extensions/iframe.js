// Name: Iframe
// ID: iframe
// Description: Display webpages or HTML over the stage.

(function (Scratch) {
  "use strict";

  /** @type {HTMLIFrameElement|null} */
  let iframe = null;

  const featurePolicy = {
    accelerometer: "'none'",
    "ambient-light-sensor": "'none'",
    battery: "'none'",
    camera: "'none'",
    "display-capture": "'none'",
    "document-domain": "'none'",
    "encrypted-media": "'none'",
    fullscreen: "'none'",
    geolocation: "'none'",
    gyroscope: "'none'",
    magnetometer: "'none'",
    microphone: "'none'",
    midi: "'none'",
    payment: "'none'",
    "picture-in-picture": "'none'",
    "publickey-credentials-get": "'none'",
    "speaker-selection": "'none'",
    usb: "'none'",
    vibrate: "'none'",
    vr: "'none'",
    "screen-wake-lock": "'none'",
    "web-share": "'none'",
    "interest-cohort": "'none'",
  };

  let x = 0;
  let y = 0;
  let width = -1; // negative means default
  let height = -1; // negative means default
  let interactive = true;

  const updateFrameAttributes = () => {
    if (!iframe) {
      return;
    }

    const { stageWidth, stageHeight } = Scratch.vm.runtime;
    const effectiveWidth = width >= 0 ? width : stageWidth;
    const effectiveHeight = height >= 0 ? height : stageHeight;
    iframe.style.width = `${effectiveWidth}px`;
    iframe.style.height = `${effectiveHeight}px`;

    let transform = "";
    transform += `translate(${stageWidth / 2 - effectiveWidth / 2 + x}px,${
      stageHeight / 2 - effectiveHeight / 2 - y
    }px)`;
    iframe.style.transform = transform;

    iframe.style.pointerEvents = interactive ? "" : "none";
  };

  const createFrame = (src) => {
    iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
    iframe.setAttribute(
      "allow",
      Object.entries(featurePolicy)
        .map(([name, permission]) => `${name} ${permission}`)
        .join("; ")
    );
    iframe.setAttribute("allowtransparency", "true");
    iframe.setAttribute("allowtransparency", "true");
    iframe.setAttribute("src", src);
    Scratch.vm.renderer.scaledOverlay.appendChild(iframe);

    updateFrameAttributes();
  };

  class IframeExtension {
    getInfo() {
      return {
        name: "Iframe",
        id: "iframe",
        blocks: [
          {
            opcode: "display",
            blockType: Scratch.BlockType.COMMAND,
            text: "show website [URL]",
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://example.com/",
              },
            },
          },
          {
            opcode: "displayHTML",
            blockType: Scratch.BlockType.COMMAND,
            text: "show HTML [HTML]",
            arguments: {
              HTML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "<h1>It works!</h1>",
              },
            },
          },
          "---",
          {
            opcode: "show",
            blockType: Scratch.BlockType.COMMAND,
            text: "show iframe",
          },
          {
            opcode: "hide",
            blockType: Scratch.BlockType.COMMAND,
            text: "hide iframe",
          },
          {
            opcode: "close",
            blockType: Scratch.BlockType.COMMAND,
            text: "close iframe",
          },
          "---",
          {
            opcode: "get",
            blockType: Scratch.BlockType.REPORTER,
            text: "iframe [MENU]",
            arguments: {
              MENU: {
                type: Scratch.ArgumentType.STRING,
                menu: "getMenu",
              },
            },
          },
          {
            opcode: "setX",
            blockType: Scratch.BlockType.COMMAND,
            text: "set iframe x position to [X]",
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "setY",
            blockType: Scratch.BlockType.COMMAND,
            text: "set iframe y position to [Y]",
            arguments: {
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "setWidth",
            blockType: Scratch.BlockType.COMMAND,
            text: "set iframe width to [WIDTH]",
            arguments: {
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: Scratch.vm.runtime.stageWidth,
              },
            },
          },
          {
            opcode: "setHeight",
            blockType: Scratch.BlockType.COMMAND,
            text: "set iframe height to [HEIGHT]",
            arguments: {
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: Scratch.vm.runtime.stageHeight,
              },
            },
          },
          {
            opcode: "setInteractive",
            blockType: Scratch.BlockType.COMMAND,
            text: "set iframe interactive to [INTERACTIVE]",
            arguments: {
              INTERACTIVE: {
                type: Scratch.ArgumentType.STRING,
                menu: "interactiveMenu",
              },
            },
          },
        ],
        menus: {
          getMenu: {
            acceptReporters: true,
            items: [
              "url",
              "visible",
              "x",
              "y",
              "width",
              "height",
              "interactive",
            ],
          },
          interactiveMenu: {
            acceptReporters: true,
            items: ["true", "false"],
          },
        },
      };
    }

    async display({ URL }) {
      this.close();
      if (await Scratch.canEmbed(URL)) {
        createFrame(Scratch.Cast.toString(URL));
      }
    }

    async displayHTML({ HTML }) {
      this.close();
      const url = `data:text/html;,${encodeURIComponent(
        Scratch.Cast.toString(HTML)
      )}`;
      if (await Scratch.canEmbed(url)) {
        createFrame(url);
      }
    }

    show() {
      if (iframe) {
        iframe.style.display = "";
      }
    }

    hide() {
      if (iframe) {
        iframe.style.display = "none";
      }
    }

    close() {
      if (iframe) {
        iframe.remove();
        iframe = null;
      }
    }

    get({ MENU }) {
      MENU = Scratch.Cast.toString(MENU);
      if (MENU === "url") {
        if (iframe) return iframe.getAttribute("src");
        return "";
      } else if (MENU === "visible") {
        return !!iframe && iframe.style.display !== "none";
      } else if (MENU === "x") {
        return x;
      } else if (MENU === "y") {
        return y;
      } else if (MENU === "width") {
        return width >= 0 ? width : Scratch.vm.runtime.stageWidth;
      } else if (MENU === "height") {
        return height >= 0 ? height : Scratch.vm.runtime.stageHeight;
      } else if (MENU === "interactive") {
        return interactive;
      } else {
        return "";
      }
    }

    setX({ X }) {
      x = Scratch.Cast.toNumber(X);
      updateFrameAttributes();
    }

    setY({ Y }) {
      y = Scratch.Cast.toNumber(Y);
      updateFrameAttributes();
    }

    setWidth({ WIDTH }) {
      width = Scratch.Cast.toNumber(WIDTH);
      updateFrameAttributes();
    }

    setHeight({ HEIGHT }) {
      height = Scratch.Cast.toNumber(HEIGHT);
      updateFrameAttributes();
    }

    setInteractive({ INTERACTIVE }) {
      interactive = Scratch.Cast.toBoolean(INTERACTIVE);
      updateFrameAttributes();
    }
  }

  Scratch.extensions.register(new IframeExtension());
})(Scratch);
