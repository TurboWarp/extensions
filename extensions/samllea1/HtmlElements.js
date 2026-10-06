// Name: Html Elements
// ID: htmlelements
// Description: Lets you add HTML elements to the scratch canvas.
// By: samllea1 <https://scratch.mit.edu/users/samllea1/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  const Cast = Scratch.Cast;
  const runtime = Scratch.vm.runtime;

  class HtmlElements {
    constructor() {
      this.elements = {};
      this.zIndexCounter = 0;
    }

    getInfo() {
      return {
        id: "htmlElements",
        name: Scratch.translate({
          default: "HTML Elements",
          id: "htmlElements.name",
        }),
        color1: "#9596bf",
        color2: "#7b7c9e",
        blocks: this.getBlockDefinitions(),
      };
    }

    getBlockDefinitions() {
      return [
        {
          opcode: "createInput",
          blockType: Scratch.BlockType.COMMAND,
          text: "create input with id [ID] at x: [X] y: [Y]",
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: "input1" },
            X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
          },
        },
        {
          opcode: "createDropdown",
          blockType: Scratch.BlockType.COMMAND,
          text: "create dropdown with id [ID] at x: [X] y: [Y] with options [OPTIONS]",
          arguments: {
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "dropdown1",
            },
            X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            OPTIONS: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "option1,option2,option3",
            },
          },
        },
        {
          opcode: "createButton",
          blockType: Scratch.BlockType.COMMAND,
          text: "create button with id [ID] at x: [X] y: [Y] with text [TEXT]",
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: "button1" },
            X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "Click me",
            },
          },
        },
        {
          opcode: "createToggleButton",
          blockType: Scratch.BlockType.COMMAND,
          text: "create toggle button with id [ID] at x: [X] y: [Y] with text [TEXT]",
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: "toggle1" },
            X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "Toggle me",
            },
          },
        },
        {
          opcode: "createPanel",
          blockType: Scratch.BlockType.COMMAND,
          text: "create panel with id [ID] at x: [X] y: [Y]",
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: "panel1" },
            X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
          },
        },
        { blockType: Scratch.BlockType.LABEL, text: "Element Actions" },
        {
          opcode: "whenButtonClicked",
          blockType: Scratch.BlockType.HAT,
          text: "when button [ID] clicked",
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: "button1" },
          },
        },
        {
          opcode: "getInputValue",
          blockType: Scratch.BlockType.REPORTER,
          text: "get value of element [ID]",
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: "input1" },
          },
        },
        {
          opcode: "setInputValue",
          blockType: Scratch.BlockType.COMMAND,
          text: "set value of element [ID] to [VALUE]",
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: "input1" },
            VALUE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "Hello, World!",
            },
          },
        },
        {
          opcode: "setButtonText",
          blockType: Scratch.BlockType.COMMAND,
          text: "set button [ID] text to [TEXT]",
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: "button1" },
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "New Text",
            },
          },
        },
        {
          opcode: "setToggleButtonText",
          blockType: Scratch.BlockType.COMMAND,
          text: "set toggle button [ID] text to [TEXT]",
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: "toggle1" },
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "New Text",
            },
          },
        },
        { blockType: Scratch.BlockType.LABEL, text: "Styling" },
        {
          opcode: "setElementBackgroundColor",
          blockType: Scratch.BlockType.COMMAND,
          text: "set element [ID] background color to [COLOR]",
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: "button1" },
            COLOR: {
              type: Scratch.ArgumentType.COLOR,
              defaultValue: "#000000",
            },
          },
        },
        {
          opcode: "setElementTextColor",
          blockType: Scratch.BlockType.COMMAND,
          text: "set element [ID] text color to [COLOR]",
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: "input1" },
            COLOR: {
              type: Scratch.ArgumentType.COLOR,
              defaultValue: "#000000",
            },
          },
        },
        {
          opcode: "setElementBorder",
          blockType: Scratch.BlockType.COMMAND,
          text: "set element [ID] border to width: [WIDTH] color: [COLOR] rounding: [ROUNDING]",
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: "input1" },
            WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            COLOR: {
              type: Scratch.ArgumentType.COLOR,
              defaultValue: "#000000",
            },
            ROUNDING: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
          },
        },
        {
          opcode: "setElementFont",
          blockType: Scratch.BlockType.COMMAND,
          text: "set element [ID] font to base64 or data url [FONT_URL]",
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: "input1" },
            FONT_URL: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
          },
        },
        {
          opcode: "setElementTransparency",
          blockType: Scratch.BlockType.COMMAND,
          text: "set element [ID] transparency to [ALPHA]",
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: "button1" },
            ALPHA: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1,
              min: 0,
              max: 1,
            },
          },
        },
        {
          opcode: "setElementTextTransparency",
          blockType: Scratch.BlockType.COMMAND,
          text: "set element [ID] text transparency to [ALPHA]",
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: "button1" },
            ALPHA: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1,
              min: 0,
              max: 1,
            },
          },
        },
        { blockType: Scratch.BlockType.LABEL, text: "Layering" },
        {
          opcode: "bringToFront",
          blockType: Scratch.BlockType.COMMAND,
          text: "bring element [ID] to front",
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: "button1" },
          },
        },
        {
          opcode: "sendToBack",
          blockType: Scratch.BlockType.COMMAND,
          text: "send element [ID] to back",
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: "button1" },
          },
        },
        {
          opcode: "setLayer",
          blockType: Scratch.BlockType.COMMAND,
          text: "set element [ID] layer to [LAYER]",
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: "button1" },
            LAYER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
          },
        },
        { blockType: Scratch.BlockType.LABEL, text: "Element Management" },
        {
          opcode: "moveElement",
          blockType: Scratch.BlockType.COMMAND,
          text: "move element [ID] to x: [X] y: [Y]",
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: "input1" },
            X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
          },
        },
        {
          opcode: "resizeElement",
          blockType: Scratch.BlockType.COMMAND,
          text: "resize element [ID] to width: [WIDTH] height: [HEIGHT]",
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: "input1" },
            WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            HEIGHT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 },
          },
        },
        {
          opcode: "removeElement",
          blockType: Scratch.BlockType.COMMAND,
          text: "remove element [ID]",
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: "input1" },
          },
        },
        {
          opcode: "removeAllElements",
          blockType: Scratch.BlockType.COMMAND,
          text: "remove all elements",
        },
        {
          opcode: "listElements",
          blockType: Scratch.BlockType.REPORTER,
          text: "list all elements",
        },
      ];
    }

    createElement(tag, { ID, X, Y }, additionalSetup = () => {}) {
      ID = Cast.toString(ID);
      X = Cast.toNumber(X);
      Y = Cast.toNumber(Y);

      if (this.elements[ID]) {
        this.removeElement({ ID });
      }

      const element = document.createElement(tag);
      element.id = ID;
      element.style.position = "absolute";
      element.style.left = X + runtime.stageWidth / 2 + "px";
      element.style.top = -Y + runtime.stageHeight / 2 + "px";
      element.style.pointerEvents = "auto";
      element.style.transform = "translate(-50%, -50%)";

      additionalSetup(element);

      Scratch.renderer.addOverlay(element);
      this.elements[ID] = {
        element,
        overlay: element,
        zIndex: this.zIndexCounter++,
      };
      this.updateZIndex(ID);
    }

    createInput(args) {
      this.createElement("input", args);
    }

    createDropdown({ ID, X, Y, OPTIONS }) {
      this.createElement("select", { ID, X, Y }, (select) => {
        Cast.toString(OPTIONS)
          .split(",")
          .forEach((optionText) => {
            const option = document.createElement("option");
            option.textContent = optionText;
            select.appendChild(option);
          });
      });
    }

    createButton({ ID, X, Y, TEXT }) {
      this.createElement("button", { ID, X, Y }, (button) => {
        button.textContent = Cast.toString(TEXT);
        button.addEventListener("click", () => {
          runtime.startHats("htmlElements_whenButtonClicked", { ID });
        });
      });
    }

    createToggleButton({ ID, X, Y, TEXT }) {
      this.createElement("button", { ID, X, Y }, (button) => {
        button.textContent = Cast.toString(TEXT);
        button.dataset.toggled = "false";
        button.addEventListener("click", () => {
          const isToggled = button.dataset.toggled === "true";
          button.dataset.toggled = !isToggled;
          runtime.startHats("htmlElements_whenButtonClicked", { ID });
        });
      });
    }

    createPanel(args) {
      this.createElement("div", args, (panel) => {
        panel.style.width = "50px";
        panel.style.height = "50px";
        panel.style.backgroundColor = "#ccc";
      });
    }

    whenButtonClicked(args) {
      return args.ID;
    }

    getInputValue({ ID }) {
      ID = Cast.toString(ID);
      const element = this.elements[ID]?.element;
      if (element?.dataset.toggled !== undefined) {
        return element.dataset.toggled === "true";
      } else if (element && "value" in element) {
        return element.value || "";
      }
      return "";
    }

    setInputValue({ ID, VALUE }) {
      ID = Cast.toString(ID);
      const element = this.elements[ID]?.element;
      if (element?.dataset.toggled !== undefined) {
        element.dataset.toggled = Cast.toBoolean(VALUE);
      } else if (element && "value" in element) {
        element.value = Cast.toString(VALUE);
      }
    }

    setButtonText({ ID, TEXT }) {
      ID = Cast.toString(ID);
      const element = this.elements[ID]?.element;
      if (element && element.tagName === "BUTTON") {
        element.textContent = Cast.toString(TEXT);
      }
    }

    setToggleButtonText({ ID, TEXT }) {
      ID = Cast.toString(ID);
      const element = this.elements[ID]?.element;
      if (element && element.tagName === "BUTTON") {
        element.textContent = Cast.toString(TEXT);
      }
    }

    removeElement({ ID }) {
      ID = Cast.toString(ID);
      if (this.elements[ID]) {
        Scratch.renderer.removeOverlay(this.elements[ID].overlay);
        delete this.elements[ID];
      }
    }

    setElementStyle({ ID, property, value }) {
      ID = Cast.toString(ID);
      if (this.elements[ID]) {
        this.elements[ID].element.style[property] = value;
      }
    }

    setElementBackgroundColor({ ID, COLOR }) {
      this.setElementStyle({ ID, property: "backgroundColor", value: COLOR });
    }

    setElementTextColor({ ID, COLOR }) {
      this.setElementStyle({ ID, property: "color", value: COLOR });
    }

    setElementBorder({ ID, WIDTH, COLOR, ROUNDING }) {
      ID = Cast.toString(ID);
      if (this.elements[ID]) {
        this.elements[ID].element.style.border = `${WIDTH}px solid ${COLOR}`;
        this.elements[ID].element.style.borderRadius = `${ROUNDING}px`;
      }
    }

    setElementFont({ ID, FONT_URL }) {
      ID = Cast.toString(ID);
      if (this.elements[ID] && FONT_URL) {
        const fontFace = new FontFace("CustomFont", `url(${FONT_URL})`);
        document.fonts.add(fontFace);
        fontFace.load().then(() => {
          this.elements[ID].element.style.fontFamily = "CustomFont";
        });
      }
    }

    setElementTransparency({ ID, ALPHA }) {
      this.setElementStyle({ ID, property: "opacity", value: ALPHA });
    }

    setElementTextTransparency({ ID, ALPHA }) {
      ID = Cast.toString(ID);
      if (this.elements[ID]) {
        const color =
          this.elements[ID].element.style.color || "rgba(0, 0, 0, 1)";
        const rgbaColor = this.hexToRgba(color, ALPHA);
        this.elements[ID].element.style.color = rgbaColor;
      }
    }

    hexToRgba(hex, alpha) {
      let r = 0,
        g = 0,
        b = 0;
      if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
      } else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
      }
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    bringToFront({ ID }) {
      ID = Cast.toString(ID);
      if (this.elements[ID]) {
        this.zIndexCounter++;
        this.elements[ID].zIndex = this.zIndexCounter;
        this.updateZIndex(ID);
      }
    }

    sendToBack({ ID }) {
      ID = Cast.toString(ID);
      if (this.elements[ID]) {
        this.elements[ID].zIndex = -1;
        this.updateZIndex(ID);
      }
    }

    setLayer({ ID, LAYER }) {
      ID = Cast.toString(ID);
      LAYER = Cast.toNumber(LAYER);
      if (this.elements[ID]) {
        this.elements[ID].zIndex = LAYER;
        this.updateZIndex(ID);
      }
    }

    updateZIndex(ID) {
      if (this.elements[ID]) {
        this.elements[ID].overlay.style.zIndex = this.elements[ID].zIndex;
      }
    }

    moveElement({ ID, X, Y }) {
      ID = Cast.toString(ID);
      if (this.elements[ID]) {
        X = Cast.toNumber(X) + runtime.stageWidth / 2;
        Y = -Cast.toNumber(Y) + runtime.stageHeight / 2;
        this.elements[ID].overlay.style.left = X + "px";
        this.elements[ID].overlay.style.top = Y + "px";
      }
    }

    resizeElement({ ID, WIDTH, HEIGHT }) {
      ID = Cast.toString(ID);
      if (this.elements[ID]) {
        WIDTH = Cast.toNumber(WIDTH);
        HEIGHT = Cast.toNumber(HEIGHT);
        this.elements[ID].overlay.style.width = WIDTH + "px";
        this.elements[ID].overlay.style.height = HEIGHT + "px";
      }
    }

    removeAllElements() {
      Object.keys(this.elements).forEach((id) =>
        this.removeElement({ ID: id })
      );
      this.zIndexCounter = 0;
    }

    listElements() {
      return JSON.stringify(Object.keys(this.elements));
    }
  }

  Scratch.extensions.register(new HtmlElements());
})(Scratch);
