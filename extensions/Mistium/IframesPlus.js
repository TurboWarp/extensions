// Name: IframePlus
// By: @mistium on discord
// Description: Display webpages or HTML over the stage with unique IDs. Made primarily for use in originOS (https://github.com/Mistium/Origin-OS).

(function (Scratch) {
  "use strict";

  const iframesMap = new Map();
  const SANDBOX = [
    "allow-same-origin",
    "allow-scripts",
    "allow-forms",
    "allow-modals",
    "allow-popups",
    "allow-presentation", // Allow interaction
    "allow-pointer-lock", // Allow pointer lock
  ];

  const featurePolicy = {};

  class IframePlusExtension {
    setZIndex({ ID }) {
      const iframeInfo = iframesMap.get(ID);
      if (iframeInfo) {
        const { iframe } = iframeInfo;
        const windowIndex = this.getWindowIndex(ID);
        iframe.style.zIndex = windowIndex;
      }
    }

    getWindowIndex(ID) {
      // Implement logic to get the index of the window with the specified ID in your window list
      // Replace the following line with your actual logic
      return 1;
    }

    getInfo() {
      return {
        name: Scratch.translate("Iframe Plus"),
        id: "iframePlus",
        blocks: [
          {
            opcode: "setLayerOfIframe",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set layer of iframe with ID [ID] to [LAYER]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "iframe1",
              },
              LAYER: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "getAllIframeIDs",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("all iframe IDs"),
          },
          {
            opcode: "removeAllIframes",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("remove all iframes"),
          },
          {
            opcode: "display",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("show website [URL] with ID [ID]"),
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://example.com",
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "iframe1",
              },
            },
          },
          {
            opcode: "getIframeTitle",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get title of iframe with ID [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "iframe1",
              },
            },
          },
          {
            opcode: "remove",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("remove iframe with ID [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "iframe1",
              },
            },
          },
          {
            opcode: "getIframeURL",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get URL of iframe with ID [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "iframe1",
              },
            },
          },
          {
            opcode: "setIframeURL",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set URL of iframe with ID [ID] to [URL]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "iframe1",
              },
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://example.com",
              },
            },
          },
          {
            opcode: "show",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("show iframe with ID [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "iframe1",
              },
            },
          },
          {
            opcode: "hide",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("hide iframe with ID [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "iframe1",
              },
            },
          },
          {
            opcode: "resize",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("resize iframe with ID [ID] to width [WIDTH] and height [HEIGHT]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "iframe1",
              },
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 480,
              },
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 360,
              },
            },
          },
          {
            opcode: "move",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("move iframe with ID [ID] to x [X] and y [Y]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "iframe1",
              },
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "setCorners",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set iframe with ID [ID] top-left corner at x [X1] and y [Y1] bottom-right corner at x [X2] and y [Y2]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "iframe1",
              },
              X1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              X2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
              Y2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          {
            opcode: "stamp",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stamp iframe with ID [ID] to stage"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "iframe1",
              },
            },
          },
          {
            opcode: "getTotalLayers",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("total number of layers"),
          },
          // New block to get the layer of a specific iframe
          {
            opcode: "getLayerOfIframe",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("layer of iframe with ID [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "iframe1",
              },
            },
          },
        ],
      };
    }

  setLayerOfIframe({ ID, LAYER }) {
    const iframeInfo = iframesMap.get(ID);
    if (iframeInfo) {
      const { iframe, overlay } = iframeInfo;

      // Ensure that the style property is defined before setting zIndex
      if (overlay && overlay.style) {
        overlay.style.zIndex = LAYER;
      }

      if (iframe && iframe.style) {
        iframe.style.zIndex = LAYER;
      }
    }
  }

    getTotalLayers() {
      // Return the total number of layers
      return Scratch.renderer._overlays.length;
    }

    getLayerOfIframe({ ID }) {
      const iframeInfo = iframesMap.get(ID);
      if (iframeInfo) {
        const { overlay } = iframeInfo;
        return Scratch.renderer._overlays.indexOf(overlay);
      }
      return -1; // If the iframe is not found
    }

    async display({ URL, ID }) {
      this.remove({ ID }); // Remove existing iframe with the same ID, if any

      if (await Scratch.canEmbed(URL)) {
        const src = Scratch.Cast.toString(URL);
        this.createFrame(src, ID);
      }
    }

    remove({ ID }) {
      const iframeInfo = iframesMap.get(ID);
      if (iframeInfo) {
        const { iframe, overlay } = iframeInfo;
        Scratch.renderer.removeOverlay(iframe);
        iframesMap.delete(ID);
      }
    }
    
    getAllIframeIDs() {
      return Array.from(iframesMap.keys());
    }
    
    removeAllIframes() {
      // Remove all iframes
      for (const { iframe, overlay } of iframesMap.values()) {
        Scratch.renderer.removeOverlay(iframe);
        Scratch.renderer.removeOverlay(overlay);
      }
      iframesMap.clear();
    }
    
    show({ ID }) {
      const iframeInfo = iframesMap.get(ID);
      if (iframeInfo) {
        const { iframe } = iframeInfo;
        iframe.style.display = "";
      }
    }

    hide({ ID }) {
      const iframeInfo = iframesMap.get(ID);
      if (iframeInfo) {
        const { iframe } = iframeInfo;
        iframe.style.display = "none";
      }
    }

    getIframeTitle({ ID }) {
      const iframeInfo = iframesMap.get(ID);
      if (iframeInfo) {
        const { iframe } = iframeInfo;
        return iframe.contentDocument.title;
      }
      return "";
    }
    
    resize({ ID, WIDTH, HEIGHT }) {
      const iframeInfo = iframesMap.get(ID);
      if (iframeInfo) {
        const { iframe } = iframeInfo;
        iframeInfo.x -= (WIDTH - iframeInfo.width) / 2;
        iframeInfo.y -= (HEIGHT - iframeInfo.height) / 2;
        iframeInfo.width = WIDTH;
        iframeInfo.height = HEIGHT;
        this.updateFrameAttributes(iframeInfo);
      }
    }

    move({ ID, X, Y }) {
      const iframeInfo = iframesMap.get(ID);
      if (iframeInfo) {
        iframeInfo.x = X - iframeInfo.width / 2;
        iframeInfo.y = Y + iframeInfo.height / 2;
        this.updateFrameAttributes(iframeInfo);
      }
    }

    setCorners({ ID, X1, Y1, X2, Y2 }) {
      const iframeInfo = iframesMap.get(ID);
      if (iframeInfo) {
        iframeInfo.x = X1;
        iframeInfo.y = Y1;
        iframeInfo.width = X2 - X1;
        iframeInfo.height = Y2 - Y1;
        this.updateFrameAttributes(iframeInfo);
      }
    }

    stamp({ ID }) {
      const iframeInfo = iframesMap.get(ID);
      if (iframeInfo) {
        const { iframe } = iframeInfo;

        // Create a new image element
        const img = new Image();

        // Set the source of the image to the data URL of the iframe contents
        img.src = this.getIframeDataURL(iframe);

        // Add the image to the stage
        Scratch.stage.appendChild(img);

        // Additional actions as needed...
      }
    }
    getIframeURL(ID) {
      ID = ID.ID;
      const iframe = document.getElementById(ID);
      if (iframe) {
        const iframeUrl = iframe.src;
        return iframeUrl;
      } else {
        console.error("Iframe with ID " + ID.toString() + " not found.");
        return null;
      }
    }

    setIframeURL({ ID, URL }) {
      const iframeInfo = iframesMap.get(ID);
      if (iframeInfo) {
        const { iframe } = iframeInfo;
        iframe.src = URL;
      }
    }

    getIframeDataURL(iframe) {
      // Create a new canvas element
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Set the canvas size to match the iframe size
      canvas.width = iframe.offsetWidth;
      canvas.height = iframe.offsetHeight;

      // Draw the iframe contents onto the canvas
      context.drawImage(iframe.contentWindow.document.body, 0, 0, canvas.width, canvas.height);

      // Return the data URL of the canvas
      return canvas.toDataURL();
    }

createFrame(src, ID) {
  ID = ID.toString()
  const iframe = document.createElement("iframe");
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.position = "absolute";
  iframe.setAttribute("id", ID);
  iframe.setAttribute("sandbox", SANDBOX.join(" "));
  iframe.setAttribute(
    "allow",
    Object.entries(featurePolicy)
      .map(([name, permission]) => `${name} ${permission}`)
      .join("; ")
  );
  iframe.setAttribute("allowtransparency", "true");
  iframe.setAttribute("src", src);

  const overlay = Scratch.renderer.addOverlay(iframe, "manual");

  // Store iframe information in the map
  iframesMap.set(ID, { iframe, overlay, width: 480, height: 360, x: 0, y: 0, interactive: true });

  // Update iframe attributes
  this.updateFrameAttributes(iframesMap.get(ID));
  console.log("Map Data:");
  iframesMap.forEach((value, key) => {
    console.log("Key:", key, "Value:", value);
  });
}


    updateFrameAttributes(iframeInfo) {
      if (!iframeInfo) {
        return;
      }

      const { iframe, overlay, width, height, x, y, interactive } = iframeInfo;

      // Get the center of the canvas
      const centerX = Scratch.vm.runtime.stageWidth / 2;
      const centerY = Scratch.vm.runtime.stageHeight / 2;

      // Update the position of the iframe relative to the center of the canvas
      iframe.style.transform = `translate(${centerX + x}px, ${centerY - y}px)`;
      iframe.style.width = `${width}px`;
      iframe.style.height = `${height}px`;

      overlay.mode = "manual";
      Scratch.renderer._updateOverlays();

      iframe.style.pointerEvents = interactive ? "auto" : "none";
    }
  }
 
  Scratch.extensions.register(new IframePlusExtension());
})(Scratch);
