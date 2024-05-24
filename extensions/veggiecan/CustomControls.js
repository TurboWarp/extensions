// Name: Custom Controls
// ID: customControls0419
// Description: Customize your project's controls!
// By: Veggiecan0419
// Liscense: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Custom controls must run unsandboxed");
  }

  const vm = Scratch.vm;

  /**
   * This is a div on TurboWarp, but a img in packaged projects
   * @type {HTMLDivElement | HTMLImageElement | undefined}
   */

  let fullScreen;

  /** @type {HTMLImageElement | undefined} */

  let greenFlag;

  /** @type {HTMLImageElement | undefined} */

  let pauseButton;

  /** @type {HTMLImageElement | undefined} */

  let stopButton;

  /**
   * The div which stores the controls on the left (eg. green flag, stop button)
   * @type {HTMLDivElement | undefined}
   */

  let leftContainer;

  /**
   * The div which stores the controls on the right (eg. fullscreen)
   * @type {HTMLDivElement | undefined}
   */

  let rightContainer;

  let controlBarExists = false;
  let duplicates = {};

  /**
   * Treats duplicates (eg. name, name1, name2)
   * @param {string} name - The name to treat
   * @returns {string} - The resulting name
   */

  function treatDuplicate(name) {
    if (!duplicates[name]) {
      duplicates[name] = 0;
    }
    duplicates[name]++;
    return name + duplicates[name];
  }

  /**
   * Gets some controls data:
   * - The default controls (green flag, pause, stop, and fullscreen)
   * - The left and right control containers
   * - Wether or not the control bar exists
   */

  function getControls() {
    fullScreen = undefined;
    greenFlag = undefined;
    pauseButton = undefined;
    stopButton = undefined;
    leftContainer = undefined;
    rightContainer = undefined;
    controlBarExists = false;

    const rB = document.querySelectorAll(
      '[class*="stage-header_stage-button_"]'
    );
    fullScreen = rB[rB.length - 1]?.parentElement;
    if (!fullScreen) {
      fullScreen =
        document.querySelector(".fullscreen-button") ||
        document.querySelector(".standalone-fullscreen-button");
    }
    greenFlag =
      document.querySelector('[class*="green-flag_green-flag_"]') ||
      document.querySelector(".green-flag-button");
    pauseButton =
      document.querySelector(".pause-btn") ||
      document.querySelector(".pause-button");
    stopButton =
      document.querySelector('[class*="stop-all_stop-all_"]') ||
      document.querySelector(".stop-all-button");

    leftContainer = document.querySelector(
      '[class*="controls_controls-container_"]'
    );
    rightContainer = document.querySelector(
      '[class*="stage_header_stage-size-row_"]'
    );

    if (fullScreen)
      fullScreen.setAttribute("data-c-control-name", "fullscreen");
    addListeners(fullScreen);
    if (greenFlag) greenFlag.setAttribute("data-c-control-name", "green flag");
    addListeners(greenFlag);
    if (pauseButton) pauseButton.setAttribute("data-c-control-name", "pause");
    addListeners(pauseButton);
    if (stopButton) stopButton.setAttribute("data-c-control-name", "stop");
    addListeners(stopButton);

    if (leftContainer && rightContainer) {
      controlBarExists = true;
      return;
    }

    const oneLeftButton = greenFlag || pauseButton || stopButton;
    leftContainer = oneLeftButton?.parentElement;
    rightContainer = leftContainer?.nextElementSibling;

    if (leftContainer) {
      controlBarExists = true;
    }
  }

  /**
   * Gets all the control elements, along with their names
   * @returns {object} - The controls and their names
   */

  function listControls() {
    getControls();
    let controls = {
      left: {},
      right: {},
      all: {},
    };
    if (!controlBarExists) {
      if (fullScreen) {
        controls.right["fullscreen"] = fullScreen;
        controls.all["fullscreen"] = fullScreen;
      }
      return controls;
    }
    duplicates = {};
    if (leftContainer) {
      const leftControls = Array.from(leftContainer.children);
      leftControls.forEach((control) => {
        let controlName = control.getAttribute("data-c-control-name");
        if (!controlName) {
          controlName =
            control.getAttribute("title") ||
            control.alt ||
            control.id ||
            control.getAttribute("class") ||
            "unnamed";
          controlName = controlName.toLowerCase();
          control.setAttribute("data-c-control-name", controlName);
        }
        if (controls.all[controlName]) {
          controlName = treatDuplicate(controlName);
          control.setAttribute("data-c-control-name", controlName);
        }
        addListeners(control);
        controls.left[controlName] = control;
        controls.all[controlName] = control;
      });
    }
    if (rightContainer) {
      const rightControls = Array.from(rightContainer.children);
      rightControls.forEach((control) => {
        let controlName = control.getAttribute("data-c-control-name");
        if (!controlName) {
          controlName =
            control.getAttribute("title") ||
            control.alt ||
            control.id ||
            control.getAttribute("class") ||
            "unnamed";
          controlName = controlName.toLowerCase();
          control.setAttribute("data-c-control-name", controlName);
        }
        if (controls.all[controlName]) {
          controlName = treatDuplicate(controlName);
          control.setAttribute("data-c-control-name", controlName);
        }
        addListeners(control);
        controls.right[controlName] = control;
        controls.all[controlName] = control;
      });
    }
    return controls;
  }

  /**
   * Gets a control by name
   * @param {string} name - The name of the control
   * @returns {HTMLImageElement | HTMLDivElement | undefined} - The control element
   */

  function getControlByName(name) {
    name = name.toLowerCase();
    getControls();
    switch (name) {
      case "green flag":
        return greenFlag;
      case "stop":
        return stopButton;
      case "pause":
        return pauseButton;
      case "fullscreen":
        return fullScreen;
    }
    const controlElement = document.querySelector(
      `[data-c-control-name="${escapeName(name)}"]`
    );
    // @ts-ignore
    if (controlElement) return controlElement;
    return listControls().all[name];
  }

  /**
   * Hides an element while retaining its original display style
   * @param {HTMLDivElement} ele - The element to hide
   */

  function hideElement(ele) {
    if (!ele) return;
    // @ts-ignore
    if (!ele.originalDisplay && ele.style.display !== "none") {
      // @ts-ignore
      ele.originalDisplay = ele.style.display;
    }
    ele.style.display = "none";
  }

  /**
   * Shows an element
   * @param {HTMLDivElement} ele - The element to show
   */

  function showElement(ele) {
    if (!ele || ele?.style.display !== "none") return;
    // @ts-ignore
    ele.style.display = ele.originalDisplay || "";
    // @ts-ignore
    delete ele.originalDisplay;
  }

  /**
   * Escapes a string for use in a CSS selector
   * @param {string} str - The string to escape
   * @returns {string} - The escaped string
   */

  function escapeName(str) {
    const esc = str.replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, "\\$&");
    return esc;
  }

  /**
   * Converts the given text to atype base64 encoded data:URL with the given MIME type
   * @param {string} text - The text to convert
   * @param {string} type - The MIME type
   * @returns {string} - The data:URL or an empty string if there was an error
   */

  function dataUrl(text, type) {
    try {
      return `data:${type};base64,${btoa(text)}`;
    } catch (e) {
      console.error(new Error(`Failed to convert ${text} to data url`));
      return "";
    }
  }

  /**
   * Converts a color to hex
   * @param {string} color - The none hex color
   * @returns {string} - The hex color
   */

  function toHex(color) {
    if (!color) return "";
    if (color.startsWith("rgb")) {
      return (
        "#" +
        color
          .replace(/rgba?\(/, "")
          .replace(")", "")
          .split(",")
          .map((c) => parseInt(c).toString(16).padEnd(2, "0"))
          .join("")
      );
    }
    return "";
  }

  /**
   * Makes sure a color is a  valid hex code. Otherwise it returns black (#000000)
   * @param {string} color - The color to validate
   * @returns {string} - The color
   */

  function validateColor(color) {
    color = Scratch.Cast.toString(color);
    const regex = /^#([0-9a-fA-F]{3,4}){1,2}$/;
    return regex.test(color) ? color : "#000000";
  }

  /**
   * Creates a control element using the ele- variables
   * @returns {HTMLDivElement | HTMLImageElement | undefined} The created element
   */

  function createcontrolElement() {
    const ele = (function () {
      if (eleType === "button" || eleType === "bordered button") {
        if (!(eleName && eleIcon)) return;
        const btn = document.createElement("img");
        btn.src = eleIcon;
        btn.alt = eleName;
        btn.classList.add(
          eleType === "button" ? "c-control-btn" : "c-control-bordered-btn"
        );
        return btn;
      }
      if (eleType === "label") {
        if (!(eleName && eleText)) return;
        const lbl = document.createElement("div");
        lbl.style.color = eleColor || "#000000";
        lbl.classList.add("c-control-label");
        if (eleIcon) {
          const lblIcon = document.createElement("img");
          lblIcon.src = eleIcon;
          lblIcon.alt = eleName;
          lblIcon.classList.add("c-control-label-icon");
          lbl.appendChild(lblIcon);
        }
        const lblText = document.createElement("span");
        lblText.textContent = eleText;
        lblText.classList.add("c-control-label-text");
        lbl.appendChild(lblText);
        return lbl;
      }
    })();
    if (!ele) return;
    ele.setAttribute("data-c-control-name", eleName);
    // @ts-ignore
    ele.cControlType = eleType;
    // @ts-ignore
    ele.cControlIsCustom = true;
    ele.style.marginLeft = `${eleMargin.l || 0}px`;
    ele.style.marginRight = `${eleMargin.r || 0}px`;
    ele.style.opacity = `${eleOpacity || 100}%`;
    ele.draggable = false;
    addListeners(ele);
    return ele;
  }

  /**
   * Adds click and hover event listeners to the given element
   * @param {HTMLDivElement | HTMLImageElement} ele - The element to add the listeners to
   */

  function addListeners(ele) {
    if (!ele) return;
    // @ts-ignore
    if (ele.cControlHasListeners) return;
    const name = ele.getAttribute("data-c-control-name");
    if (!name) return;
    [
      ["click", "clicked"],
      ["dblclick", "double clicked"],
      ["contextmenu", "right clicked"],
      ["mouseover", "hovered"],
      ["mouseout", "hover ended"],
    ].forEach((event) => {
      const eventName = event[0];
      const eventMenuName = event[1];
      ele.addEventListener(eventName, (e) => {
        lastEventTargets[eventName] = name;
        vm.runtime.startHats("customControls0419_whenEvent", {
          EVENT: eventMenuName,
        });
      });
    });
    // @ts-ignore
    ele.cControlHasListeners = true;
  }

  let eleType = "button";
  let eleName = "";
  let eleIcon = "";
  let eleText = "";
  let eleColor = "#000000";
  let eleMargin = { l: 0, r: 0 };
  let eleOpacity = 100;

  let lastEventTargets = {
    click: "",
    dblclick: "",
    contextmenu: "",
    mouseover: "",
    mouseout: "",
  };

  /**
   * Resets all the ele- info except the color
   */

  function resetEleInfo() {
    eleType = "button";
    eleName = "";
    eleIcon = "";
    eleText = "";
    eleMargin = { l: 0, r: 0 };
    eleOpacity = 100;
  }

  /**
   * The extension's blocks
   */

  const blocks = [
    {
      opcode: "createNewControl",
      blockType: Scratch.BlockType.COMMAND,
      text: "create new [TYPE]",
      arguments: {
        TYPE: {
          type: Scratch.ArgumentType.STRING,
          menu: "controlTypeMenu",
          defaultValue: "button",
        },
      },
      extensions: ["colours_control"],
    },
    {
      opcode: "setControlName",
      blockType: Scratch.BlockType.COMMAND,
      text: "set name to [NAME]",
      arguments: {
        NAME: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "my control",
        },
      },
      extensions: ["colours_control"],
    },
    {
      opcode: "setControlIcon",
      blockType: Scratch.BlockType.COMMAND,
      text: "set icon to [MODE] [ICON]",
      arguments: {
        MODE: {
          type: Scratch.ArgumentType.STRING,
          menu: "iconModeMenu",
          defaultValue: "url",
        },
        ICON: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "https://extensions.turbowarp.org/dango.png",
        },
      },
      extensions: ["colours_control"],
    },
    {
      opcode: "setControlText",
      blockType: Scratch.BlockType.COMMAND,
      text: "set text to [TEXT]",
      arguments: {
        TEXT: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "Custom label",
        },
      },
      extensions: ["colours_control"],
    },
    {
      opcode: "setControlColor",
      blockType: Scratch.BlockType.COMMAND,
      text: "set text color to [COLOR]",
      arguments: {
        COLOR: {
          type: Scratch.ArgumentType.COLOR,
          defaultValue: "#ff7700",
        },
      },
      extensions: ["colours_control"],
    },
    {
      opcode: "setControlMargin",
      blockType: Scratch.BlockType.COMMAND,
      text: "set [SIDE] margin to [MARGIN] px",
      arguments: {
        SIDE: {
          type: Scratch.ArgumentType.STRING,
          menu: "marginSideMenu",
          defaultValue: "left",
        },
        MARGIN: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: "10",
        },
      },
      extensions: ["colours_control"],
    },
    {
      opcode: "setControlOpacity",
      blockType: Scratch.BlockType.COMMAND,
      text: "set opacity to [OPACITY]%",
      arguments: {
        OPACITY: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: "50",
        },
      },
      extensions: ["colours_control"],
    },

    "---",

    {
      opcode: "appendControl",
      blockType: Scratch.BlockType.COMMAND,
      text: "add control to [SIDE]",
      arguments: {
        SIDE: {
          type: Scratch.ArgumentType.STRING,
          menu: "rightLeftMenu",
          defaultValue: "left",
        },
      },
      extensions: ["colours_control"],
    },
    {
      opcode: "insertControl",
      blockType: Scratch.BlockType.COMMAND,
      text: "add control [SIDE] [CONTROL]",
      arguments: {
        SIDE: {
          type: Scratch.ArgumentType.STRING,
          menu: "afterBeforeMenu",
          defaultValue: "after",
        },
        CONTROL: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "my control",
        },
      },
      extensions: ["colours_control"],
    },

    "---",

    {
      opcode: "setIconOf",
      blockType: Scratch.BlockType.COMMAND,
      text: "set icon of [CONTROL] to [MODE] [ICON]",
      arguments: {
        CONTROL: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "my control",
        },
        MODE: {
          type: Scratch.ArgumentType.STRING,
          menu: "iconModeMenu",
          defaultValue: "url",
        },
        ICON: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "https://extensions.turbowarp.org/robot.png",
        },
      },
      extensions: ["colours_control"],
    },
    {
      opcode: "setTextOf",
      blockType: Scratch.BlockType.COMMAND,
      text: "set text of [CONTROL] to [TEXT]",
      arguments: {
        CONTROL: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "my control",
        },
        TEXT: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "Custom label with new text",
        },
      },
      extensions: ["colours_control"],
    },
    {
      opcode: "setColorOf",
      blockType: Scratch.BlockType.COMMAND,
      text: "set text color of [CONTROL] to [COLOR]",
      arguments: {
        CONTROL: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "my control",
        },
        COLOR: {
          type: Scratch.ArgumentType.COLOR,
          defaultValue: "#7777ff",
        },
      },
      extensions: ["colours_control"],
    },
    {
      opcode: "setMarginOf",
      blockType: Scratch.BlockType.COMMAND,
      text: "set [SIDE] margin of [CONTROL] to [MARGIN] px",
      arguments: {
        CONTROL: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "my control",
        },
        SIDE: {
          type: Scratch.ArgumentType.STRING,
          menu: "marginSideMenu",
          defaultValue: "left",
        },
        MARGIN: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: "10",
        },
      },
      extensions: ["colours_control"],
    },
    {
      opcode: "setOpacityOf",
      blockType: Scratch.BlockType.COMMAND,
      text: "set opacity of [CONTROL] to [OPACITY]%",
      arguments: {
        CONTROL: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "my control",
        },
        OPACITY: {
          type: Scratch.ArgumentType.NUMBER,
          defaultValue: "50",
        },
      },
      extensions: ["colours_control"],
    },

    "---",

    {
      opcode: "hide",
      blockType: Scratch.BlockType.COMMAND,
      text: "hide [CONTROL]",
      arguments: {
        CONTROL: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "my control",
        },
      },
      extensions: ["colours_control"],
    },
    {
      opcode: "show",
      blockType: Scratch.BlockType.COMMAND,
      text: "show [CONTROL]",
      arguments: {
        CONTROL: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "my control",
        },
      },
      extensions: ["colours_control"],
    },
    {
      opcode: "remove",
      blockType: Scratch.BlockType.COMMAND,
      text: "remove [CONTROL]",
      arguments: {
        CONTROL: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "my control",
        },
      },
      extensions: ["colours_control"],
    },

    "---",

    {
      opcode: "propertyOf",
      blockType: Scratch.BlockType.REPORTER,
      text: "[PROPERTY] of [CONTROL]",
      arguments: {
        PROPERTY: {
          type: Scratch.ArgumentType.STRING,
          menu: "controlPropertyMenu",
          defaultValue: "icon",
        },
        CONTROL: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "my control",
        },
      },
      extensions: ["colours_control"],
    },
    {
      opcode: "isVisible",
      blockType: Scratch.BlockType.BOOLEAN,
      text: "[CONTROL] visible?",
      arguments: {
        CONTROL: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "my control",
        },
      },
      extensions: ["colours_control"],
    },
    {
      opcode: "isCustom",
      blockType: Scratch.BlockType.BOOLEAN,
      text: "[CONTROL] is a custom control?",
      arguments: {
        CONTROL: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "my control",
        },
      },
      extensions: ["colours_control"],
    },
    {
      opcode: "exists",
      blockType: Scratch.BlockType.BOOLEAN,
      text: "[CONTROL] exists?",
      arguments: {
        CONTROL: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "my control",
        },
      },
      extensions: ["colours_control"],
    },

    "---",

    {
      opcode: "allControls",
      blockType: Scratch.BlockType.REPORTER,
      disableMonitor: true,
      text: "all controls",
      extensions: ["colours_control"],
    },
    {
      opcode: "controlsOnSide",
      blockType: Scratch.BlockType.REPORTER,
      text: "controls on [SIDE]",
      arguments: {
        SIDE: {
          type: Scratch.ArgumentType.STRING,
          menu: "rightLeftMenu",
          defaultValue: "left",
        },
      },
      extensions: ["colours_control"],
    },

    "---",

    {
      opcode: "whenEvent",
      blockType: Scratch.BlockType.HAT,
      text: "when [CONTROL] [EVENT]",
      isEdgeActivated: false,
      arguments: {
        CONTROL: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "my control",
        },
        EVENT: {
          type: Scratch.ArgumentType.STRING,
          menu: "eventTypeSquareMenu",
          defaultValue: "clicked",
        },
      },
      extensions: ["colours_control"],
    },
    {
      opcode: "lastEventTarget",
      blockType: Scratch.BlockType.REPORTER,
      text: "last control [EVENT]",
      arguments: {
        EVENT: {
          type: Scratch.ArgumentType.STRING,
          menu: "eventTypeMenu",
          defaultValue: "clicked",
        },
      },
      extensions: ["colours_control"],
    },

    "---",

    {
      func: "toggleMenuEmbed",
      blockType: Scratch.BlockType.BUTTON,
      text: "Use controls menu istead of text input",
    },
    {
      opcode: "utilMenu",
      blockType: Scratch.BlockType.REPORTER,
      text: "[OPTION]",
      arguments: {
        OPTION: {
          type: Scratch.ArgumentType.STRING,
          menu: "utilMenu",
          defaultValue: "green flag",
        },
      },
      extensions: ["colours_control"],
    },
    {
      opcode: "barExists",
      blockType: Scratch.BlockType.BOOLEAN,
      disableMonitor: true,
      text: "control bar exists?",
      extensions: ["colours_control"],
    },
    {
      opcode: "refreshControls",
      blockType: Scratch.BlockType.COMMAND,
      text: "refresh controls",
      extensions: ["colours_control"],
    },

    "---",

    // These may be in other extensions, but they fit here perfectly too
    {
      opcode: "canLoad",
      blockType: Scratch.BlockType.BOOLEAN,
      text: "can load [URL]?",
      arguments: {
        URL: {
          type: Scratch.ArgumentType.STRING,
          defaultValue: "https://extensions.turbowarp.org/dango.png",
        },
      },
      extensions: ["colours_control"],
    },
    {
      opcode: "isPackaged",
      blockType: Scratch.BlockType.BOOLEAN,
      text: "is packaged?",
      extensions: ["colours_control"],
    },
    {
      opcode: "colorScheme",
      blockType: Scratch.BlockType.REPORTER,
      text: "color scheme",
      extensions: ["colours_control"],
    },
  ];

  let menuEmbedded = false;

  class CustomControls {
    constructor() {
      vm.runtime.on("RUNTIME_DISPOSED", () => {
        getControls();
        [fullScreen, greenFlag, pauseButton, stopButton].forEach((button) => {
          showElement(button);
        });
        let custom_controls = Object.values(listControls().all).filter(
          (control) => !!control.cControlIsCustom
        );
        custom_controls.forEach((control) => {
          control?.remove();
        });
      });
    }
    getInfo() {
      return {
        id: "customControls0419",
        name: "Custom controls",
        color1: "#ffab19",
        color2: "#ec9c13",
        color3: "#b87d17",
        blocks,
        menus: {
          controlTypeMenu: {
            acceptReporters: true,
            items: ["button", "bordered button", "label"],
            extensions: ["colours_control"],
          },
          iconModeMenu: {
            acceptReporters: true,
            items: ["url", "svg"],
            extensions: ["colours_control"],
          },
          marginSideMenu: {
            acceptReporters: true,
            items: ["left", "right", "both sides"],
            extensions: ["colours_control"],
          },
          rightLeftMenu: {
            acceptReporters: true,
            items: ["right", "left"],
            extensions: ["colours_control"],
          },
          afterBeforeMenu: {
            acceptReporters: true,
            items: ["after", "before"],
            extensions: ["colours_control"],
          },
          controlPropertyMenu: {
            acceptReporters: true,
            items: [
              "icon",
              "text",
              "text color",
              "opacity",
              "left margin",
              "right margin",
              "type",
            ],
            extensions: ["colours_control"],
          },
          eventTypeMenu: {
            acceptReporters: true,
            items: [
              "clicked",
              "double clicked",
              "right clicked",
              "hovered",
              "hover ended",
            ],
            extensions: ["colours_control"],
          },
          eventTypeSquareMenu: {
            acceptReporters: false,
            items: [
              "clicked",
              "double clicked",
              "right clicked",
              "hovered",
              "hover ended",
            ],
            extensions: ["colours_control"],
          },
          utilMenu: {
            acceptReporters: true,
            items: "_listControls",
            extensions: ["colours_control"],
          },
        },
      };
    }

    // For the util menu
    _listControls() {
      return Object.keys(listControls().all) || [""];
    }

    createNewControl(args) {
      const type = Scratch.Cast.toString(args.TYPE).toLowerCase();
      resetEleInfo();
      if (type === "label") {
        eleType = "label";
      } else if (type === "bordered button") {
        eleType = "bordered button";
      } else {
        eleType = "button";
      }
    }

    setControlName(args) {
      const name = Scratch.Cast.toString(args.NAME).toLowerCase();
      if (getControlByName(name)) return;
      eleName = name;
    }

    async setControlIcon(args) {
      const mode = Scratch.Cast.toString(args.MODE).toLowerCase();
      const icon = Scratch.Cast.toString(args.ICON);
      if (mode === "svg") {
        const url = dataUrl(icon, "image/svg+xml");
        eleIcon = url;
      } else {
        const canLoad = await Scratch.canFetch(icon);
        // Here we default to " " so the icon still gets created
        eleIcon = canLoad ? icon : " ";
      }
    }

    setControlText(args) {
      eleText = Scratch.Cast.toString(args.TEXT);
    }

    setControlColor(args) {
      eleColor = validateColor(args.COLOR);
    }

    setControlMargin(args) {
      const side = Scratch.Cast.toString(args.SIDE).toLowerCase();
      const margin = Scratch.Cast.toNumber(args.MARGIN);
      if (side === "left") {
        eleMargin.l = margin;
      } else if (side === "right") {
        eleMargin.r = margin;
      } else {
        eleMargin.l = margin;
        eleMargin.r = margin;
      }
    }

    setControlOpacity(args) {
      const opacity = Scratch.Cast.toNumber(args.OPACITY);
      eleOpacity = Math.min(Math.max(opacity, 0), 100);
    }

    appendControl(args) {
      const side = Scratch.Cast.toString(args.SIDE).toLowerCase();
      getControls();
      if (!controlBarExists) return;
      const ele = createcontrolElement();
      resetEleInfo();
      if (!ele) return;
      if (side === "right" && rightContainer) {
        rightContainer.appendChild(ele);
      } else if (leftContainer) {
        leftContainer.appendChild(ele);
      } else {
        ele.remove();
      }
    }

    insertControl(args) {
      const side = Scratch.Cast.toString(args.SIDE).toLowerCase();
      const control = Scratch.Cast.toString(args.CONTROL);
      getControls();
      if (!controlBarExists) return;
      const eleToInsertAt = getControlByName(control);
      if (!eleToInsertAt) return;
      const ele = createcontrolElement();
      resetEleInfo();
      if (!ele) return;
      const appended = eleToInsertAt.insertAdjacentElement(
        side === "before" ? "beforebegin" : "afterend",
        ele
      );
      if (!appended) {
        ele.remove();
      }
    }

    async setIconOf(args) {
      const control = Scratch.Cast.toString(args.CONTROL).toLowerCase();
      let icon = Scratch.Cast.toString(args.ICON);
      const mode = Scratch.Cast.toString(args.MODE).toLowerCase();
      if (mode === "svg") {
        icon = dataUrl(icon, "image/svg+xml");
      } else {
        const canLoad = await Scratch.canFetch(icon);
        if (!canLoad) return;
      }
      const ele = getControlByName(control);
      if (!ele) return;
      if (ele.tagName.toLowerCase() === "img") {
        ele.src = icon;
        return;
      }
      // @ts-ignore
      const eleType = ele.cControlType;
      if (eleType === "label" && ele.children.length === 2) {
        ele.firstChild.src = icon;
      }
    }

    setTextOf(args) {
      const control = Scratch.Cast.toString(args.CONTROL).toLowerCase();
      const text = Scratch.Cast.toString(args.TEXT);
      const controlElement = getControlByName(control);
      if (!controlElement) return;
      // @ts-ignore
      if (controlElement.cControlType === "label") {
        const controlText = controlElement.lastChild;
        if (controlText) controlText.textContent = text;
      }
    }

    setColorOf(args) {
      const control = Scratch.Cast.toString(args.CONTROL).toLowerCase();
      const color = validateColor(args.COLOR);
      const controlElement = getControlByName(control);
      if (!controlElement) return;
      controlElement.style.color = color;
    }

    setMarginOf(args) {
      const control = Scratch.Cast.toString(args.CONTROL).toLowerCase();
      const side = Scratch.Cast.toString(args.SIDE).toLowerCase();
      const margin = Scratch.Cast.toNumber(args.MARGIN);
      const controlElement = getControlByName(control);
      if (!controlElement) return;
      if (side === "left") {
        controlElement.style.marginLeft = margin + "px";
      } else if (side === "right") {
        controlElement.style.marginRight = margin + "px";
      }
    }

    setOpacityOf(args) {
      const control = Scratch.Cast.toString(args.CONTROL).toLowerCase();
      const opacity = Scratch.Cast.toNumber(args.OPACITY);
      const controlElement = getControlByName(control);
      if (!controlElement) return;
      controlElement.style.opacity = Math.min(Math.max(opacity, 0), 100) + "%";
    }

    hide(args) {
      const control = Scratch.Cast.toString(args.CONTROL).toLowerCase();
      const controlElement = getControlByName(control);
      hideElement(controlElement);
    }

    show(args) {
      const control = Scratch.Cast.toString(args.CONTROL).toLowerCase();
      const controlElement = getControlByName(control);
      showElement(controlElement);
    }

    remove(args) {
      const control = Scratch.Cast.toString(args.CONTROL).toLowerCase();
      const controlElement = getControlByName(control);
      // @ts-ignore
      if (!controlElement?.cControlIsCustom) return;
      controlElement?.remove();
    }

    propertyOf(args) {
      const property = Scratch.Cast.toString(args.PROPERTY).toLowerCase();
      const control = Scratch.Cast.toString(args.CONTROL).toLowerCase();
      const controlElement = getControlByName(control);
      if (!controlElement) return "";
      // @ts-ignore
      const eleType = controlElement.cControlType;
      if (property === "type") {
        if (eleType) return eleType;
        if (control === "fullscreen") return "bordered button";
        if (controlElement.tagName.toLowerCase() === "img") return "button";
      }
      if (property === "icon") {
        if (eleType === "label" && controlElement.children.length === 2) {
          return controlElement.firstChild.src || "";
        }
        if (controlElement.tagName.toLowerCase() === "img") {
          return controlElement.src || "";
        }
      }
      if (property === "text") {
        if (eleType === "label") {
          return controlElement.lastChild?.textContent || "";
        }
        return controlElement.textContent || "";
      }
      let computedStyle = window.getComputedStyle(controlElement);
      if (property === "text color") {
        const color = computedStyle.color;
        return toHex(color) || "";
      }
      if (property === "opacity") {
        return parseFloat(computedStyle.opacity) * 100;
      }
      if (property === "left margin") {
        return computedStyle.marginLeft;
      }
      if (property === "right margin") {
        return computedStyle.marginRight;
      }
      return "";
    }

    isVisible(args) {
      const control = Scratch.Cast.toString(args.CONTROL).toLowerCase();
      const controlElement = getControlByName(control);
      if (!controlElement) return false;
      return controlElement.style.display !== "none";
    }

    isCustom(args) {
      const control = Scratch.Cast.toString(args.CONTROL).toLowerCase();
      const controlElement = getControlByName(control);
      // @ts-ignore
      return !!controlElement?.cControlIsCustom;
    }

    exists(args) {
      const control = Scratch.Cast.toString(args.CONTROL).toLowerCase();
      return !!getControlByName(control);
    }

    allControls() {
      const names = Object.keys(listControls().all);
      return JSON.stringify(names);
    }

    controlsOnSide(args) {
      const side = Scratch.Cast.toString(args.SIDE).toLowerCase();
      const controls = listControls()[side === "right" ? "right" : "left"];
      const names = Object.keys(controls);
      return JSON.stringify(names);
    }

    whenEvent(args) {
      const event = Scratch.Cast.toString(args.EVENT).toLowerCase();
      const control = Scratch.Cast.toString(args.CONTROL).toLowerCase();
      switch (event) {
        case "clicked":
          return lastEventTargets.click === control;
        case "double clicked":
          return lastEventTargets.dblclick === control;
        case "right clicked":
          return lastEventTargets.contextmenu === control;
        case "hovered":
          return lastEventTargets.mouseover === control;
        case "hover ended":
          return lastEventTargets.mouseout === control;
      }
      return false;
    }

    lastEventTarget(args) {
      const event = Scratch.Cast.toString(args.EVENT).toLowerCase();
      switch (event) {
        case "clicked":
          return lastEventTargets.click || "";
        case "double clicked":
          return lastEventTargets.dblclick || "";
        case "right clicked":
          return lastEventTargets.contextmenu || "";
        case "hovered":
          return lastEventTargets.mouseover || "";
        case "hover ended":
          return lastEventTargets.mouseout || "";
      }
      return "";
    }

    toggleMenuEmbed() {
      menuEmbedded = !menuEmbedded;
      // @ts-ignore
      blocks[blocks.length - 1].text = menuEmbedded
        ? "Use text input instead of menu"
        : "Use menu instead of text input";
      blocks.forEach((block) => {
        // @ts-ignore
        if (block.arguments?.CONTROL) {
          if (menuEmbedded) {
            // @ts-ignore
            block.arguments.CONTROL.menu = "utilMenu";
            // @ts-ignore
            delete block.arguments.CONTROL.defaultValue;
          } else {
            // @ts-ignore
            delete block.arguments.CONTROL.menu;
            // @ts-ignore
            block.arguments.CONTROL.defaultValue = "my control";
          }
        }
      });
      vm.runtime.extensionManager.refreshBlocks();
      // BUG?
      if (menuEmbedded)
        alert(
          "You will have to leave the editor and come back in for the changes to come into effect"
        );
    }

    utilMenu(args) {
      return args.OPTION || "";
    }

    barExists() {
      getControls();
      return !!controlBarExists;
    }

    refreshControls() {
      listControls();
    }

    async canLoad(args) {
      const url = Scratch.Cast.toString(args.URL);
      const canLoad = await Scratch.canFetch(url);
      return canLoad;
    }

    isPackaged() {
      // @ts-ignore
      return !!window.scaffolding;
    }

    colorScheme() {
      const root = document.documentElement;
      const computedStyle = window.getComputedStyle(root);
      const colorScheme = computedStyle.getPropertyValue("--color-scheme");
      return colorScheme.trim();
    }
  }

  function loadStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .c-control-btn {
        height: 2rem;
        padding: 0.375rem;
        border-radius: 0.25rem;
        background: none;
        user-select: none;
        user-drag: none;
        context-menu: none;
        cursor: pointer;
      }

      .c-control-btn:hover {
        background-color: #ff4d4d26;
      }

      .c-control-bordered-btn {
        display: block;
        background-color: ${
          // @ts-ignore
          window.scaffolding ? "#ffffff" : "var(--ui-white)"
        };
        height: ${
          // We need to do this here, as in Turbowarp the bordered buttons are 2px taller than the others, but in packaged projects, they are the same height
          // @ts-ignore
          window.scaffolding ? "2rem" : "calc(2rem + 2px)"
        };
        border: 1px solid var(--ui-black-transparent);
        border-radius: 0.25rem;
        padding: 0.375rem;
        whitespace: nowrap;
        user-select: none;
        cursor: pointer;
        context-menu: none;
      }

      .c-control-label {
        display: flex;
        align-items: center;
        padding: 0.25;
        background: none;
        user-select: none;
        context-menu: none;
      }

      .c-control-label-icon {
        margin: 0.25rem;
        height: 16px;
        background: inherit;
        context-menu: none;
      }

      .c-control-label-text {
        font-size: 0.625rem;
        font-weight: bold;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        white-space: nowrap;
        background: inherit;
      }
    `;
    style.id = "custom-controls-stylesheet";
    document.body.appendChild(style);
  }

  loadStyles();

  // @ts-ignore
  Scratch.extensions.register(new CustomControls());
})(Scratch);
