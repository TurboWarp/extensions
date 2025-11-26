// Name: Iframe
// ID: iframe
// Description: Display webpages or HTML over the stage.
// Context: "iframe" is an HTML element that lets websites embed other websites.
// License: MIT AND MPL-2.0

// Edited by izum00

(function (Scratch) {
  "use strict";

  /** @type {Object.<string, {iframe: HTMLIFrameElement, overlay: any, x: number, y: number, width: number, height: number, interactive: boolean, resizeBehavior: string, latestMessage: string|number|boolean}>} */
  const iframes = {};

  // ブロックモードを管理する変数 (デフォルトは古いブロック)
  let useNewBlocks = true;

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

  const getOverlayMode = (resizeBehavior) =>
    resizeBehavior === "scale" ? "scale-centered" : "manual";

  const updateFrameAttributes = (id) => {
    const iframeData = iframes[id];
    if (!iframeData || !iframeData.iframe) {
      return;
    }

    const { iframe, x, y, width, height, interactive, resizeBehavior } =
      iframeData;
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

  const createFrame = (src, id) => {
    const iframe = document.createElement("iframe");
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
    iframe.setAttribute("src", src);
    iframe.setAttribute("data-iframe-id", id);

    const overlay = Scratch.renderer.addOverlay(
      iframe,
      getOverlayMode("scale")
    );

    iframes[id] = {
      iframe,
      overlay,
      x: 0,
      y: 0,
      width: -1,
      height: -1,
      interactive: true,
      resizeBehavior: "scale",
      latestMessage: "",
    };

    updateFrameAttributes(id);
    return id;
  };

  const closeFrame = (id) => {
    const iframeData = iframes[id];
    if (iframeData) {
      Scratch.renderer.removeOverlay(iframeData.iframe);
      delete iframes[id];
    }
  };

  const getIframeData = (id) => {
    if (!iframes[id]) {
      // デフォルト値を持つ新しいiframeデータを作成（非表示）
      iframes[id] = {
        iframe: null,
        overlay: null,
        x: 0,
        y: 0,
        width: -1,
        height: -1,
        interactive: true,
        resizeBehavior: "scale",
        latestMessage: "",
      };
    }
    return iframes[id];
  };

  window.addEventListener("message", (e) => {
    // すべてのiframeをチェックしてメッセージの送信元を特定
    for (const id in iframes) {
      const iframeData = iframes[id];
      if (
        iframeData.iframe &&
        iframeData.iframe.contentWindow &&
        e.source === iframeData.iframe.contentWindow
      ) {
        iframeData.latestMessage =
          typeof e.data === "string" ||
          typeof e.data === "number" ||
          typeof e.data === "boolean"
            ? e.data
            : JSON.stringify(e.data);
        Scratch.vm.runtime.startHats("iframe_whenMessage", {
          IFRAME_ID: id,
        });
        Scratch.vm.runtime.startHats("iframe_whenMessage_new", {
          IFRAME_ID: id,
        });
        break;
      }
    }
  });

  Scratch.vm.on("STAGE_SIZE_CHANGED", () => {
    for (const id in iframes) {
      updateFrameAttributes(id);
    }
  });

  Scratch.vm.runtime.on("RUNTIME_DISPOSED", () => {
    for (const id in iframes) {
      closeFrame(id);
    }
  });

  class IframeExtension {
    getInfo() {
      const oldBlocks = [
        {
          opcode: "display_new",
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate("show website [URL] as [ID]"),
          hideFromPalette: useNewBlocks,
          arguments: {
            URL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "https://extensions.turbowarp.org/hello.html",
            },
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "iframe1",
            },
          },
        },
        {
          opcode: "displayHTML_new",
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate("show HTML [HTML] as [ID]"),
          hideFromPalette: useNewBlocks,
          arguments: {
            HTML: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: `<h1>${Scratch.translate("It works!")}</h1>`,
            },
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "iframe1",
            },
          },
        },
        "---",
        {
          opcode: "show_new",
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate("show iframe [ID]"),
          hideFromPalette: useNewBlocks,
          arguments: {
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "iframe1",
            },
          },
        },
        {
          opcode: "hide_new",
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate("hide iframe [ID]"),
          hideFromPalette: useNewBlocks,
          arguments: {
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "iframe1",
            },
          },
        },
        {
          opcode: "close_new",
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate("close iframe [ID]"),
          hideFromPalette: useNewBlocks,
          arguments: {
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "iframe1",
            },
          },
        },
        "---",
        {
          opcode: "get_new",
          blockType: Scratch.BlockType.REPORTER,
          text: Scratch.translate("iframe [ID] [MENU]"),
          hideFromPalette: useNewBlocks,
          arguments: {
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "iframe1",
            },
            MENU: {
              type: Scratch.ArgumentType.STRING,
              menu: "getMenu",
            },
          },
        },
        {
          opcode: "setX_new",
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate("set iframe [ID] x position to [X]"),
          hideFromPalette: useNewBlocks,
          arguments: {
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "iframe1",
            },
            X: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: "0",
            },
          },
        },
        {
          opcode: "setY_new",
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate("set iframe [ID] y position to [Y]"),
          hideFromPalette: useNewBlocks,
          arguments: {
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "iframe1",
            },
            Y: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: "0",
            },
          },
        },
        {
          opcode: "setWidth_new",
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate("set iframe [ID] width to [WIDTH]"),
          hideFromPalette: useNewBlocks,
          arguments: {
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "iframe1",
            },
            WIDTH: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: Scratch.vm.runtime.stageWidth,
            },
          },
        },
        {
          opcode: "setHeight_new",
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate("set iframe [ID] height to [HEIGHT]"),
          hideFromPalette: useNewBlocks,
          arguments: {
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "iframe1",
            },
            HEIGHT: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: Scratch.vm.runtime.stageHeight,
            },
          },
        },
        {
          opcode: "setInteractive_new",
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate(
            "set iframe [ID] interactive to [INTERACTIVE]"
          ),
          hideFromPalette: useNewBlocks,
          arguments: {
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "iframe1",
            },
            INTERACTIVE: {
              type: Scratch.ArgumentType.STRING,
              menu: "interactiveMenu",
            },
          },
        },
        {
          opcode: "setResize_new",
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate(
            "set iframe [ID] resize behavior to [RESIZE]"
          ),
          hideFromPalette: useNewBlocks,
          arguments: {
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "iframe1",
            },
            RESIZE: {
              type: Scratch.ArgumentType.STRING,
              menu: "resizeMenu",
            },
          },
        },
        "---",
        {
          opcode: "sendMessage_new",
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate("send message [MESSAGE] to iframe [ID]"),
          hideFromPalette: useNewBlocks,
          arguments: {
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "iframe1",
            },
            MESSAGE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "hello",
            },
          },
        },
        {
          opcode: "whenMessage_new",
          blockType: Scratch.BlockType.EVENT,
          text: Scratch.translate("when message received from iframe"),
          hideFromPalette: useNewBlocks,
          isEdgeActivated: false,
        },
        {
          opcode: "iframeMessage_new",
          blockType: Scratch.BlockType.REPORTER,
          text: Scratch.translate("message from iframe [ID]"),
          hideFromPalette: useNewBlocks,
          arguments: {
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "iframe1",
            },
          },
        },
        {
          opcode: "lastMessageId_new",
          blockType: Scratch.BlockType.REPORTER,
          text: Scratch.translate("ID of iframe that sent last message"),
          hideFromPalette: useNewBlocks,
        },
      ];

      const newBlocks = [
        {
          opcode: "display",
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate("show website [URL]"),
          hideFromPalette: !useNewBlocks,
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
          hideFromPalette: !useNewBlocks,
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
          hideFromPalette: !useNewBlocks,
        },
        {
          opcode: "hide",
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate("hide iframe"),
          hideFromPalette: !useNewBlocks,
        },
        {
          opcode: "close",
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate("close iframe"),
          hideFromPalette: !useNewBlocks,
        },
        "---",
        {
          opcode: "get",
          blockType: Scratch.BlockType.REPORTER,
          text: Scratch.translate("iframe [MENU]"),
          hideFromPalette: !useNewBlocks,
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
          hideFromPalette: !useNewBlocks,
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
          hideFromPalette: !useNewBlocks,
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
          hideFromPalette: !useNewBlocks,
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
          hideFromPalette: !useNewBlocks,
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
          hideFromPalette: !useNewBlocks,
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
          hideFromPalette: !useNewBlocks,
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
          hideFromPalette: !useNewBlocks,
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
          hideFromPalette: !useNewBlocks,
          isEdgeActivated: false,
        },
        {
          opcode: "iframeMessage",
          blockType: Scratch.BlockType.REPORTER,
          text: Scratch.translate("iframe message"),
          hideFromPalette: !useNewBlocks,
        },
      ];

      const modeSwitchBlock = {
        opcode: "switchMode",
        blockType: Scratch.BlockType.BUTTON,
        text: !useNewBlocks
          ? Scratch.translate("Switch to Old Blocks [▶]")
          : Scratch.translate("Switch to New Blocks [▶]"),
        func: "switchMode",
      };

      return {
        name: Scratch.translate("Iframe+"),
        id: "iframeplus",
        blocks: [modeSwitchBlock, "---", ...oldBlocks, ...newBlocks],
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

    switchMode() {
      useNewBlocks = !useNewBlocks;
      // ブロックパレットを更新
      Scratch.vm.extensionManager.refreshBlocks();
    }

    // 新しいブロックの実装 (単一iframe用 - IDは"iframe"固定)
    async display({ URL }) {
      const ID = "iframe";
      closeFrame(ID);
      if (await Scratch.canEmbed(URL)) {
        createFrame(Scratch.Cast.toString(URL), ID);
      }
    }

    async displayHTML({ HTML }) {
      const ID = "iframe";
      closeFrame(ID);
      const url = `data:text/html;charset=utf-8,${encodeURIComponent(
        Scratch.Cast.toString(HTML)
      )}`;
      if (await Scratch.canEmbed(url)) {
        createFrame(url, ID);
      }
    }

    show() {
      const ID = "iframe";
      const iframeData = getIframeData(ID);
      if (iframeData.iframe) {
        iframeData.iframe.style.display = "";
      }
    }

    hide() {
      const ID = "iframe";
      const iframeData = getIframeData(ID);
      if (iframeData.iframe) {
        iframeData.iframe.style.display = "none";
      }
    }

    close() {
      const ID = "iframe";
      closeFrame(ID);
    }

    get({ MENU }) {
      const ID = "iframe";
      MENU = Scratch.Cast.toString(MENU);
      const iframeData = getIframeData(ID);

      if (MENU === "url") {
        if (iframeData.iframe) return iframeData.iframe.getAttribute("src");
        return "";
      } else if (MENU === "visible") {
        return (
          !!iframeData.iframe && iframeData.iframe.style.display !== "none"
        );
      } else if (MENU === "x") {
        return iframeData.x;
      } else if (MENU === "y") {
        return iframeData.y;
      } else if (MENU === "width") {
        return iframeData.width >= 0
          ? iframeData.width
          : Scratch.vm.runtime.stageWidth;
      } else if (MENU === "height") {
        return iframeData.height >= 0
          ? iframeData.height
          : Scratch.vm.runtime.stageHeight;
      } else if (MENU === "interactive") {
        return iframeData.interactive;
      } else if (MENU === "resize behavior") {
        return iframeData.resizeBehavior;
      } else {
        return "";
      }
    }

    setX({ X }) {
      const ID = "iframe";
      const iframeData = getIframeData(ID);
      iframeData.x = Scratch.Cast.toNumber(X);
      updateFrameAttributes(ID);
    }

    setY({ Y }) {
      const ID = "iframe";
      const iframeData = getIframeData(ID);
      iframeData.y = Scratch.Cast.toNumber(Y);
      updateFrameAttributes(ID);
    }

    setWidth({ WIDTH }) {
      const ID = "iframe";
      const iframeData = getIframeData(ID);
      iframeData.width = Scratch.Cast.toNumber(WIDTH);
      updateFrameAttributes(ID);
    }

    setHeight({ HEIGHT }) {
      const ID = "iframe";
      const iframeData = getIframeData(ID);
      iframeData.height = Scratch.Cast.toNumber(HEIGHT);
      updateFrameAttributes(ID);
    }

    setInteractive({ INTERACTIVE }) {
      const ID = "iframe";
      const iframeData = getIframeData(ID);
      iframeData.interactive = Scratch.Cast.toBoolean(INTERACTIVE);
      updateFrameAttributes(ID);
    }

    setResize({ RESIZE }) {
      const ID = "iframe";
      const iframeData = getIframeData(ID);
      if (RESIZE === "scale" || RESIZE === "viewport") {
        iframeData.resizeBehavior = RESIZE;
        if (iframeData.overlay) {
          iframeData.overlay.mode = getOverlayMode(RESIZE);
          Scratch.renderer._updateOverlays();
          updateFrameAttributes(ID);
        }
      }
    }

    sendMessage({ MESSAGE }) {
      const ID = "iframe";
      const iframeData = iframes[ID];
      if (iframeData && iframeData.iframe && iframeData.iframe.contentWindow) {
        iframeData.iframe.contentWindow.postMessage(MESSAGE, "*");
      }
    }

    iframeMessage() {
      const ID = "iframe";
      const iframeData = getIframeData(ID);
      return iframeData.latestMessage;
    }

    // 古いブロックの実装 (複数iframe対応)
    async display_new({ URL, ID }) {
      ID = Scratch.Cast.toString(ID);
      if (!ID) ID = "iframe";
      closeFrame(ID);
      if (await Scratch.canEmbed(URL)) {
        createFrame(Scratch.Cast.toString(URL), ID);
      }
    }

    async displayHTML_new({ HTML, ID }) {
      ID = Scratch.Cast.toString(ID);
      if (!ID) ID = "iframe";
      closeFrame(ID);
      const url = `data:text/html;,${encodeURIComponent(
        Scratch.Cast.toString(HTML)
      )}`;
      if (await Scratch.canEmbed(url)) {
        createFrame(url, ID);
      }
    }

    show_new({ ID }) {
      ID = Scratch.Cast.toString(ID);
      if (!ID) ID = "iframe";
      const iframeData = getIframeData(ID);
      if (iframeData.iframe) {
        iframeData.iframe.style.display = "";
      }
    }

    hide_new({ ID }) {
      ID = Scratch.Cast.toString(ID);
      if (!ID) ID = "iframe";
      const iframeData = getIframeData(ID);
      if (iframeData.iframe) {
        iframeData.iframe.style.display = "none";
      }
    }

    close_new({ ID }) {
      ID = Scratch.Cast.toString(ID);
      if (!ID) ID = "iframe";
      closeFrame(ID);
    }

    get_new({ ID, MENU }) {
      ID = Scratch.Cast.toString(ID);
      if (!ID) ID = "iframe";
      MENU = Scratch.Cast.toString(MENU);
      const iframeData = getIframeData(ID);

      if (MENU === "url") {
        if (iframeData.iframe) return iframeData.iframe.getAttribute("src");
        return "";
      } else if (MENU === "visible") {
        return (
          !!iframeData.iframe && iframeData.iframe.style.display !== "none"
        );
      } else if (MENU === "x") {
        return iframeData.x;
      } else if (MENU === "y") {
        return iframeData.y;
      } else if (MENU === "width") {
        return iframeData.width >= 0
          ? iframeData.width
          : Scratch.vm.runtime.stageWidth;
      } else if (MENU === "height") {
        return iframeData.height >= 0
          ? iframeData.height
          : Scratch.vm.runtime.stageHeight;
      } else if (MENU === "interactive") {
        return iframeData.interactive;
      } else if (MENU === "resize behavior") {
        return iframeData.resizeBehavior;
      } else {
        return "";
      }
    }

    setX_new({ ID, X }) {
      ID = Scratch.Cast.toString(ID);
      if (!ID) ID = "iframe";
      const iframeData = getIframeData(ID);
      iframeData.x = Scratch.Cast.toNumber(X);
      updateFrameAttributes(ID);
    }

    setY_new({ ID, Y }) {
      ID = Scratch.Cast.toString(ID);
      if (!ID) ID = "iframe";
      const iframeData = getIframeData(ID);
      iframeData.y = Scratch.Cast.toNumber(Y);
      updateFrameAttributes(ID);
    }

    setWidth_new({ ID, WIDTH }) {
      ID = Scratch.Cast.toString(ID);
      if (!ID) ID = "iframe";
      const iframeData = getIframeData(ID);
      iframeData.width = Scratch.Cast.toNumber(WIDTH);
      updateFrameAttributes(ID);
    }

    setHeight_new({ ID, HEIGHT }) {
      ID = Scratch.Cast.toString(ID);
      if (!ID) ID = "iframe";
      const iframeData = getIframeData(ID);
      iframeData.height = Scratch.Cast.toNumber(HEIGHT);
      updateFrameAttributes(ID);
    }

    setInteractive_new({ ID, INTERACTIVE }) {
      ID = Scratch.Cast.toString(ID);
      if (!ID) ID = "iframe";
      const iframeData = getIframeData(ID);
      iframeData.interactive = Scratch.Cast.toBoolean(INTERACTIVE);
      updateFrameAttributes(ID);
    }

    setResize_new({ ID, RESIZE }) {
      ID = Scratch.Cast.toString(ID);
      if (!ID) ID = "iframe";
      const iframeData = getIframeData(ID);
      if (RESIZE === "scale" || RESIZE === "viewport") {
        iframeData.resizeBehavior = RESIZE;
        if (iframeData.overlay) {
          iframeData.overlay.mode = getOverlayMode(RESIZE);
          Scratch.renderer._updateOverlays();
          updateFrameAttributes(ID);
        }
      }
    }

    sendMessage_new({ ID, MESSAGE }) {
      ID = Scratch.Cast.toString(ID);
      if (!ID) ID = "iframe";
      const iframeData = iframes[ID];
      if (iframeData && iframeData.iframe && iframeData.iframe.contentWindow) {
        iframeData.iframe.contentWindow.postMessage(MESSAGE, "*");
      }
    }

    iframeMessage_new({ ID }) {
      ID = Scratch.Cast.toString(ID);
      if (!ID) ID = "iframe";
      const iframeData = getIframeData(ID);
      return iframeData.latestMessage;
    }

    lastMessageId_new() {
      // 最後にメッセージを受信したiframeのIDを返す
      for (const id in iframes) {
        if (iframes[id].latestMessage !== "") {
          return id;
        }
      }
      return "iframe";
    }
  }

  Scratch.extensions.register(new IframeExtension());
})(Scratch);
