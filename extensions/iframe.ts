// Name: Iframe
// ID: iframe
// Description: Display webpages or HTML over the stage.
// By: GarboMuffin
// Context: "iframe" is an HTML element that lets websites embed other websites.
// License: MIT AND MPL-2.0

(function (Scratch: typeof globalThis.Scratch) {
  "use strict";

  let iframe: HTMLIFrameElement | null = null;
  let overlay: RenderWebGL.Overlay | null = null;

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

  const SANDBOX = [
    "allow-same-origin",
    "allow-scripts",
    "allow-forms",
    "allow-modals",
    "allow-popups",

    // The big one we don't want to include is allow-top-navigation
  ];

  let x = 0;
  let y = 0;
  let width = -1; // negative means default
  let height = -1; // negative means default
  let interactive = true;
  let resizeBehavior = "scale";
  let latestMessage: string | number | boolean = "";
  let latestParentMessage: string | number | boolean = "";

  const updateFrameAttributes = () => {
    if (!iframe) {
      return;
    }

    iframe.style.pointerEvents = interactive ? "auto" : "none";

    const { stageWidth, stageHeight } = Scratch.vm.runtime;
    const effectiveWidth = width >= 0 ? width : stageWidth;
    const effectiveHeight = height >= 0 ? height : stageHeight;

    if (resizeBehavior === "scale") {
      iframe.style.width = `${effectiveWidth}px`;
      iframe.style.height = `${effectiveHeight}px`;

      iframe.style.transform = `translate(${-effectiveWidth / 2 + x}px, ${
        -effectiveHeight / 2 - y
      }px)`;
      iframe.style.top = "0";
      iframe.style.left = "0";
    } else {
      // As the stage is resized in fullscreen mode, only % can be relied upon
      iframe.style.width = `${(effectiveWidth / stageWidth) * 100}%`;
      iframe.style.height = `${(effectiveHeight / stageHeight) * 100}%`;

      iframe.style.transform = "";
      iframe.style.top = `${
        (0.5 - effectiveHeight / 2 / stageHeight - y / stageHeight) * 100
      }%`;
      iframe.style.left = `${
        (0.5 - effectiveWidth / 2 / stageWidth + x / stageWidth) * 100
      }%`;
    }
  };

  const getOverlayMode = () =>
    resizeBehavior === "scale" ? "scale-centered" : "manual";

  const createFrame = (src: string) => {
    iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.position = "absolute";
    iframe.setAttribute("sandbox", SANDBOX.join(" "));
    iframe.setAttribute(
      "allow",
      Object.entries(featurePolicy)
        .map(([name, permission]) => `${name} ${permission}`)
        .join("; ")
    );
    iframe.setAttribute("allowtransparency", "true");
    iframe.setAttribute("allowtransparency", "true");
    iframe.setAttribute("src", src);

    overlay = Scratch.renderer.addOverlay(iframe, getOverlayMode());
    updateFrameAttributes();
  };

  const closeFrame = () => {
    if (iframe) {
      Scratch.renderer.removeOverlay(iframe);
      iframe = null;
      overlay = null;
    }
  };

  const normalizeMessage = (data: unknown): string | number | boolean =>
    typeof data === "string" ||
    typeof data === "number" ||
    typeof data === "boolean"
      ? data
      : JSON.stringify(data);

  const getParentWindow = (): Window | null => {
    // if no parent, window.parent is us. which is not useful
    if (window.parent !== window) {
      return window.parent;
    }
    if (window.opener) {
      return window.opener;
    }
    return null;
  };

  window.addEventListener("message", (e) => {
    if (iframe && iframe.contentWindow && e.source === iframe.contentWindow) {
      latestMessage = normalizeMessage(e.data);
      Scratch.vm.runtime.startHats("iframe_whenMessage");
    } else if (e.source === getParentWindow()) {
      latestParentMessage = normalizeMessage(e.data);
      Scratch.vm.runtime.startHats("iframe_whenMessageParent");
    }
  });

  Scratch.vm.on("STAGE_SIZE_CHANGED", updateFrameAttributes);

  Scratch.vm.runtime.on("RUNTIME_DISPOSED", closeFrame);

  class IframeExtension implements Scratch.Extension {
    getInfo(): Scratch.Info {
      return {
        name: Scratch.translate("Iframe"),
        id: "iframe",
        blocks: [
          {
            opcode: "display",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("show website [URL]"),
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/hello.html",
              },
            },
          },
          {
            opcode: "displayHTML",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("show HTML [HTML]"),
            arguments: {
              HTML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: `<h1>${Scratch.translate("It works!")}</h1>`,
              },
            },
          },
          "---",
          {
            opcode: "show",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("show iframe"),
          },
          {
            opcode: "hide",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("hide iframe"),
          },
          {
            opcode: "close",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("close iframe"),
          },
          "---",
          {
            opcode: "get",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("iframe [MENU]"),
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
            text: Scratch.translate("set iframe x position to [X]"),
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
            text: Scratch.translate("set iframe y position to [Y]"),
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
            text: Scratch.translate("set iframe width to [WIDTH]"),
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
            text: Scratch.translate("set iframe height to [HEIGHT]"),
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
            text: Scratch.translate("set iframe interactive to [INTERACTIVE]"),
            arguments: {
              INTERACTIVE: {
                type: Scratch.ArgumentType.STRING,
                menu: "interactiveMenu",
              },
            },
          },
          {
            opcode: "setResize",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set iframe resize behavior to [RESIZE]"),
            arguments: {
              RESIZE: {
                type: Scratch.ArgumentType.STRING,
                menu: "resizeMenu",
              },
            },
          },
          "---",
          {
            opcode: "sendMessage",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("send message [MESSAGE] to iframe"),
            arguments: {
              MESSAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "hello",
              },
            },
          },
          {
            opcode: "whenMessage",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when message received from iframe"),
            isEdgeActivated: false,
          },
          {
            opcode: "iframeMessage",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("iframe message"),
          },
          "---",
          {
            opcode: "sendMessageParent",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("send message [MESSAGE] to parent window"),
            arguments: {
              MESSAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "hello",
              },
            },
          },
          {
            opcode: "whenMessageParent",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when message received from parent window"),
            isEdgeActivated: false,
          },
          {
            opcode: "parentMessage",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("parent window message"),
          },
        ],
        menus: {
          getMenu: {
            acceptReporters: true,
            items: [
              Scratch.translate("url"),
              Scratch.translate("visible"),
              "x",
              "y",
              Scratch.translate("width"),
              Scratch.translate("height"),
              Scratch.translate("interactive"),
              Scratch.translate("resize behavior"),
            ],
          },
          interactiveMenu: {
            acceptReporters: true,
            items: [
              // The getter blocks will return English regardless of translating these
              "true",
              "false",
            ],
          },
          resizeMenu: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("scale"),
                value: "scale",
              },
              {
                text: Scratch.translate("viewport"),
                value: "viewport",
              },
            ],
          },
        },
      };
    }

    async display({ URL }: { URL: unknown }) {
      closeFrame();
      const url = Scratch.Cast.toString(URL);
      if (await Scratch.canEmbed(url)) {
        createFrame(url);
      }
    }

    async displayHTML({ HTML }: { HTML: unknown }) {
      closeFrame();
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
      closeFrame();
    }

    get({ MENU }: { MENU: unknown }) {
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
      } else if (MENU === "resize behavior") {
        return resizeBehavior;
      } else {
        return "";
      }
    }

    setX({ X }: { X: unknown }) {
      x = Scratch.Cast.toNumber(X);
      updateFrameAttributes();
    }

    setY({ Y }: { Y: unknown }) {
      y = Scratch.Cast.toNumber(Y);
      updateFrameAttributes();
    }

    setWidth({ WIDTH }: { WIDTH: unknown }) {
      width = Scratch.Cast.toNumber(WIDTH);
      updateFrameAttributes();
    }

    setHeight({ HEIGHT }: { HEIGHT: unknown }) {
      height = Scratch.Cast.toNumber(HEIGHT);
      updateFrameAttributes();
    }

    setInteractive({ INTERACTIVE }: { INTERACTIVE: unknown }) {
      interactive = Scratch.Cast.toBoolean(INTERACTIVE);
      updateFrameAttributes();
    }

    setResize({ RESIZE }: { RESIZE: unknown }) {
      if (RESIZE === "scale" || RESIZE === "viewport") {
        resizeBehavior = RESIZE;
        if (overlay) {
          overlay.mode = getOverlayMode();
          Scratch.renderer._updateOverlays();
          updateFrameAttributes();
        }
      }
    }

    sendMessage({ MESSAGE }: { MESSAGE: unknown }) {
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(MESSAGE, "*");
      }
    }

    sendMessageParent({ MESSAGE }: { MESSAGE: unknown }) {
      const parentWindow = getParentWindow();
      if (parentWindow) {
        parentWindow.postMessage(MESSAGE, "*");
      }
    }

    iframeMessage() {
      return latestMessage;
    }

    parentMessage() {
      return latestParentMessage;
    }
  }

  Scratch.extensions.register(new IframeExtension());
})(Scratch);
