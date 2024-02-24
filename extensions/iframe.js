// Name: Iframe
// ID: iframe
// Description: Display webpages or HTML over the stage.
// Context: "iframe" is an HTML element that lets websites embed other websites.
// License: MIT AND LGPL-3.0

/* generated l10n code */Scratch.translate.setup({"it":{"_It works!":"Funziona!","_close iframe":"chiudi iframe","_height":"altezza","_hide iframe":"nascondi iframe","_iframe [MENU]":"[MENU] dell'iframe","_interactive":"interattività","_resize behavior":"comportamento quando ridimensionato","_scale":"scala","_set iframe height to [HEIGHT]":"imposta larghezza dell'iframe a [HEIGHT]","_set iframe interactive to [INTERACTIVE]":"imposta interattività iframe a [INTERACTIVE]","_set iframe resize behavior to [RESIZE]":"imposta comportamento dell'iframe quando ridimensionato a [RESIZE]","_set iframe width to [WIDTH]":"imposta larghezza dell'iframe a [WIDTH]","_set iframe x position to [X]":"imposta posizione x dell'iframe a [X]","_set iframe y position to [Y]":"imposta posizione y dell'iframe a[Y]","_show HTML [HTML]":"mostra HTML [HTML]","_show iframe":"mostra iframe","_show website [URL]":"mostra sito [URL]","_visible":"visibilità","_width":"larghezza"},"ja":{"_Iframe":"埋め込み","_height":"高さ","_show HTML [HTML]":"[HTML]のHTMLを表示する","_show website [URL]":"[URL]のウェブサイトを表示する","_url":"URL","_width":"横幅"},"nb":{"_Iframe":"IFrame","_It works!":"Det fungerer!","_close iframe":"lukk iframe","_height":"høyde","_hide iframe":"skjul iframe","_interactive":"interaktiv","_resize behavior":"endre størrelsesoppførsel","_scale":"skala","_set iframe height to [HEIGHT]":"set iframe høyde til [HEIGHT]","_set iframe interactive to [INTERACTIVE]":"sett iframe interaktiv til [INTERACTIVE]","_set iframe resize behavior to [RESIZE]":"sett iframe resize oppførsel til [RESIZE]","_set iframe width to [WIDTH]":"set iframe bredde til [WIDTH]","_set iframe x position to [X]":"sett iframe x-posisjon til [X]","_set iframe y position to [Y]":"sett iframe y-posisjon til [Y]","_show HTML [HTML]":"vis HTML [HTML]","_show iframe":"vis iframe","_show website [URL]":"vis nettside [URL]","_viewport":"visningsområde","_visible":"synlig","_width":"bredde"},"nl":{"_It works!":"Het werkt!","_close iframe":"sluit iframe","_height":"hoogte","_hide iframe":"verberg iframe","_iframe [MENU]":"[MENU] van iframe","_interactive":"interactief?","_resize behavior":"formaatwijzigingsgedrag","_scale":"speelveld","_set iframe height to [HEIGHT]":"maak hoogte van iframe [HEIGHT]","_set iframe interactive to [INTERACTIVE]":"maak iframe interactief? [INTERACTIVE]","_set iframe resize behavior to [RESIZE]":"maak formaatwijzigingsgedrag van iframe [RESIZE]","_set iframe width to [WIDTH]":"maak breedte van iframe [WIDTH]","_set iframe x position to [X]":"maak x-positie van iframe [X]","_set iframe y position to [Y]":"maak y-positie van iframe [Y]","_show HTML [HTML]":"toon HTML [HTML]","_show iframe":"toon iframe","_show website [URL]":"toon website [URL]","_viewport":"beeldscherm","_visible":"zichtbaar?","_width":"breedte"},"ru":{"_It works!":"Работает!","_close iframe":"закрыть iframe","_height":"высота","_hide iframe":"спрятать iframe","_set iframe x position to [X]":"задать позицию iframe x в [X]","_set iframe y position to [Y]":"задать позицию iframe y в [Y]","_show HTML [HTML]":"показать HTML [HTML]","_show iframe":"показать iframe","_show website [URL]":"показать вебсайт [URL]","_visible":"виден","_width":"ширина"},"zh-cn":{"_Iframe":"内嵌框架","_It works!":"它在工作！","_close iframe":"退出内嵌网页","_height":"高度","_hide iframe":"隐藏内嵌网页","_iframe [MENU]":"内嵌网页的[MENU]","_set iframe height to [HEIGHT]":"设置内嵌网页的高度为[HEIGHT]","_set iframe width to [WIDTH]":"设置内嵌网页的宽度为[WIDTH]","_set iframe x position to [X]":"设置内嵌网页的x坐标为[X]","_set iframe y position to [Y]":"设置内嵌网页的y坐标为[Y]","_show HTML [HTML]":"显示来自文本[HTML]的网页","_show iframe":"显示内嵌网页","_show website [URL]":"显示来自URL[URL]的网页","_url":"URL","_visible":"显示状态","_width":"宽度"}});/* end generated l10n code */(function (Scratch) {
  "use strict";

  const defaultIframe = `
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>PostMessageChild</title>
    <script>
    window.onload = function() {
        document.getElementById('click').addEventListener('click', function() {
            parent.postMessage(msg.value, '*');
        });
      }
      window.addEventListener('message', function(event) {
        rmsg.value = event.data;
      });
</script>
</head>
<body>
    <input type=text id=msg><input type=button id=click value=gsso>
    <input type=text id=rmsg>
</body>
</html>

  `;

  /** @type {HTMLIFrameElement|null} */
  let iframe = null;
  let overlay = null;

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
  let lastMessageFromChild = "";

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

  const createFrame = (src) => {
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

    window.addEventListener('message', function(event) {
      lastMessageFromChild = event.data;
      Scratch.vm.runtime.startHats('iframe_whenMessageReceivedFromChild');
    });

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

  Scratch.vm.on("STAGE_SIZE_CHANGED", updateFrameAttributes);

  Scratch.vm.runtime.on("RUNTIME_DISPOSED", closeFrame);

  class IframeExtension {
    getInfo() {
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
                defaultValue: defaultIframe,
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
          {
            opcode: "postMessage",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("post [MESSAGE] to child"),
            arguments: {
              MESSAGE: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            blockType: Scratch.BlockType.EVENT,
            opcode: 'whenMessageReceivedFromChild',
            text: 'when message is received from child',
            isEdgeActivated: false, // required boilerplate
            // arguments: {
            //   MESSAGE: {
            //     type: Scratch.ArgumentType.STRING,
            //   },
            // },
          },
          {
            blockType: Scratch.BlockType.REPORTER,
            opcode: 'messageFromChild',
            text: 'message from child',

          }
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

    async display({ URL }) {
      closeFrame();
      if (await Scratch.canEmbed(URL)) {
        createFrame(Scratch.Cast.toString(URL));
      }
    }

    async displayHTML({ HTML }) {
      closeFrame();
      const url = `about:blank`; /* data:text/html;,${encodeURIComponent(
        Scratch.Cast.toString(HTML)
      )}`;*/
      // if (await Scratch.canEmbed(url)) {
        createFrame(url);
        iframe.srcdoc = HTML;
      // }
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
      } else if (MENU === "resize behavior") {
        return resizeBehavior;
      } else {
        return "";
      }
    }

    postMessage({ MESSAGE }) {
      iframe.contentWindow.postMessage(MESSAGE);
    }

    messageFromChild() {
      return lastMessageFromChild;
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

    setResize({ RESIZE }) {
      if (RESIZE === "scale" || RESIZE === "viewport") {
        resizeBehavior = RESIZE;
        if (overlay) {
          overlay.mode = getOverlayMode();
          Scratch.renderer._updateOverlays();
          updateFrameAttributes();
        }
      }
    }
  }

  Scratch.extensions.register(new IframeExtension());
})(Scratch);
