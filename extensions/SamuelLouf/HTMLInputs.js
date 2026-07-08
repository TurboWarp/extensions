// Name: HTML Inputs
// ID: samuelloufhtmlinputs
// Description: Add HTML inputs over the stage.
// By: SamuelLouf <https://samuellouf.github.io/>
// License: MIT

(function (Scratch) {
  "use strict";

  const html_elements = Object.create(null);
  const overlay = Object.create(null);
  const elements_coordinates = Object.create(null);

  const interactive = true;
  const resizeBehavior = "scale";

  /**
   * Update an element's attributes
   * @param {string} name
   */
  const updateElementAttributes = (name) => {
    if (html_elements[name] == undefined) return;

    const { stageWidth, stageHeight } = Scratch.vm.runtime;
    const effectiveWidth =
      elements_coordinates[name].width >= 0
        ? elements_coordinates[name].width
        : stageWidth;
    const effectiveHeight =
      elements_coordinates[name].height >= 0
        ? elements_coordinates[name].height
        : stageHeight;

    html_elements[name].style.pointerEvents = interactive ? "auto" : "none";

    if (elements_coordinates[name].width == -1) {
      html_elements[name].style.width = "";
      html_elements[name].style.left = "0";
    } else {
      html_elements[name].style.width =
        (effectiveWidth / stageWidth) * 100 + "%";
      html_elements[name].style.left = `${
        -(stageWidth - elements_coordinates[name].width) +
        (stageWidth - elements_coordinates[name].width) / 2
      }px`;
    }

    if (elements_coordinates[name].height == -1) {
      html_elements[name].style.height = "";
      html_elements[name].style.top = "0";
    } else {
      html_elements[name].style.height =
        (effectiveHeight / stageHeight) * 100 + "%";
      html_elements[name].style.top = `${
        -(stageHeight - elements_coordinates[name].height) +
        (stageHeight - elements_coordinates[name].height) / 2
      }px`;
    }

    html_elements[name].style.transform = `translate(${
      -effectiveWidth / 2 +
      elements_coordinates[name].x +
      stageWidth / 2 -
      html_elements[name].clientWidth / 2
    }px, ${
      -effectiveHeight / 2 -
      elements_coordinates[name].y +
      stageHeight / 2 -
      html_elements[name].clientHeight / 2
    }px)`;
  };

  const getOverlayMode = () =>
    resizeBehavior === "scale" ? "scale-centered" : "manual";

  /**
   * Create an element
   * @param {string} element
   * @param {string} name
   * @param {Array<{ name: string; value: string; }>} attributes
   * @param {string} id
   * @param {string} class_names
   */
  const createElement = (
    element,
    name,
    attributes = [],
    id = "",
    class_names = ""
  ) => {
    html_elements[name] = document.createElement(element);

    html_elements[name].style.position = "absolute";

    elements_coordinates[name] = { x: 0, y: 0, width: -1, height: -1 };

    for (var i in attributes) {
      html_elements[name].setAttribute(attributes[i].name, attributes[i].value);
    }

    overlay[name] = Scratch.renderer.addOverlay(
      html_elements[name],
      getOverlayMode()
    );
    updateElementAttributes(name);
  };

  /**
   * Close an element
   * @param {string} name
   */
  const closeElement = (name) => {
    if (html_elements[name]) {
      Scratch.renderer.removeOverlay(html_elements[name]);
      delete overlay[name];
    }
  };

  const updateElementsAttributes = () => {
    var elements = Object.keys(html_elements).map((key) => key);
    for (var i in elements) {
      updateElementAttributes(elements[i]);
    }
  };

  const closeElements = () => {
    var elements = Object.keys(html_elements).map((key) => key);
    for (var i in elements) {
      closeElement(elements[i]);
    }
  };

  /**
   * Label block
   * @param {string} text
   * @returns {{blockType: string; text: string}}
   */
  const label = (text) => {
    return {
      blockType: Scratch.BlockType.LABEL,
      text: text,
    };
  };

  /**
   * Get promise from event
   * @param {*} item
   * @param {string} event
   * @returns
   */
  const getPromiseFromEvent = (item, event) => {
    return new Promise((resolve) => {
      const listener = (/** @type {event} */ e) => {
        item.removeEventListener(event, listener);
        resolve(e);
      };
      item.addEventListener(event, listener);
    });
  };

  /**
   * Look up list
   * @param {string} list
   * @param {*} util
   * @returns
   */
  function lookupList(list, util) {
    const byId = util.target.lookupVariableById(list);
    if (byId && byId.type === "list") {
      return byId;
    }
    const byName = util.target.lookupVariableByNameAndType(list, "list");
    if (byName) {
      return byName;
    }
    return null;
  }

  /**
   * @param {string} value
   * @param {string} text
   */
  function _option(value, text) {
    var option = document.createElement("option");
    option.value = value;
    option.text = text;
    return option;
  }

  Scratch.vm.on("STAGE_SIZE_CHANGED", updateElementsAttributes);

  Scratch.vm.runtime.on("RUNTIME_DISPOSED", closeElements);
  Scratch.vm.runtime.on("PROJECT_STOP_ALL", closeElements);

  class HTMLInputs {
    getInfo() {
      return {
        name: Scratch.translate("HTML Inputs"),
        id: "samuelloufhtmlinputs",
        color1: "#0fbd8c",
        color2: "#0b8e69",
        blocks: [
          label(Scratch.translate("Create")),
          {
            opcode: "createInput",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("create input of type [TYPE] named [NAME]"),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "input_types",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
            },
          },
          {
            opcode: "createSelect",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("create a select menu named [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
            },
          },
          label("Set"),
          {
            opcode: "setSelectOptionsToList",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set the select menu named [NAME]'s options to the content of the list [LIST]"
            ),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "get_list",
              },
            },
          },
          {
            opcode: "setSelectOptionsToText",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set the select menu named [NAME]'s options to the content of the list [LIST] splitted by [SPLITBY]"
            ),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
              LIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1,2,3",
              },
              SPLITBY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ",",
              },
            },
          },
          {
            opcode: "setElement",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set element named [NAME]'s [ATTRIBUTE] to [VALUE]"
            ),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
              ATTRIBUTE: {
                type: Scratch.ArgumentType.STRING,
                menu: "element_attributes",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "value",
              },
            },
          },
          label("Get"),
          {
            opcode: "getElement",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get element named [NAME]'s [ATTRIBUTE]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
              ATTRIBUTE: {
                type: Scratch.ArgumentType.STRING,
                menu: "element_attributes_coordinates",
              },
            },
          },
          {
            opcode: "waitUntilElementEvent",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "wait until element named [NAME] sends event [EVENT]"
            ),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
              EVENT: {
                type: Scratch.ArgumentType.STRING,
                menu: "element_event",
              },
            },
          },
          label("Delete"),
          {
            opcode: "deleteElement",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete element named [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
            },
          },
          {
            opcode: "deleteEveryElement",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete every element"),
          },
          {
            opcode: "elementExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("does element named [NAME] exists?"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
            },
          },
          "---",
          label("Visibility"),
          {
            opcode: "hide",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("hide element named [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
            },
          },
          {
            opcode: "show",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("show element named [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
            },
          },
          {
            opcode: "elementVisibility",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is element named [NAME] visible?"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
            },
          },
          "---",
          label("Position"),
          {
            opcode: "setElementX",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set element named [NAME]'s x position to [X]"
            ),
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
            },
          },
          {
            opcode: "setElementY",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set element named [NAME]'s y position to [Y]"
            ),
            arguments: {
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
            },
          },
          "---",
          label("Dimensions"),
          {
            opcode: "setElementWidth",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set element named [NAME]'s width to [WIDTH]"
            ),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: Scratch.vm.runtime.stageWidth,
              },
            },
          },
          {
            opcode: "setElementHeight",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set element named [NAME]'s height to [HEIGHT]"
            ),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: Scratch.vm.runtime.stageHeight,
              },
            },
          },
          "---",
          label("Refresh"),
          {
            opcode: "refreshElement",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("refresh element named [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
            },
          },
          {
            opcode: "refreshAll",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("refresh every element"),
          },
        ],
        menus: {
          element_event: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("click"), value: "click" },
              { text: Scratch.translate("change"), value: "change" },
              { text: Scratch.translate("double click"), value: "dblclick" },
              { text: Scratch.translate("focus"), value: "focus" },
              { text: Scratch.translate("mouse down"), value: "mousedown" },
              { text: Scratch.translate("mouse up"), value: "mouseup" },
              { text: Scratch.translate("mouse enter"), value: "mouseenter" },
              { text: Scratch.translate("mouse leave"), value: "mouseleave" },
              { text: Scratch.translate("mouse move"), value: "mousemove" },
              { text: Scratch.translate("mouse out"), value: "mouseout" },
              { text: Scratch.translate("mouse wheel"), value: "mousewheel" },
              { text: Scratch.translate("pointer down"), value: "pointerdown" },
              { text: Scratch.translate("pointer up"), value: "pointerup" },
              {
                text: Scratch.translate("pointer enter"),
                value: "pointerenter",
              },
              {
                text: Scratch.translate("pointer leave"),
                value: "pointerleave",
              },
              { text: Scratch.translate("pointer out"), value: "pointerout" },
              { text: Scratch.translate("double click"), value: "select" },
              {
                text: Scratch.translate("selection change"),
                value: "selectionchange",
              },
              { text: Scratch.translate("select start"), value: "selectstart" },
            ],
          },
          input_types: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("text"),
                value: "text",
              },
              {
                text: Scratch.translate("username"),
                value: "username",
              },
              {
                text: Scratch.translate("password"),
                value: "password",
              },
              {
                text: Scratch.translate("range"),
                value: "range",
              },
              {
                text: Scratch.translate("phone number"),
                value: "tel",
              },
              {
                text: Scratch.translate("email"),
                value: "email",
              },
              {
                text: Scratch.translate("number"),
                value: "number",
              },
              {
                text: Scratch.translate("color"),
                value: "color",
              },
              {
                text: Scratch.translate("date"),
                value: "date",
              },
              {
                text: Scratch.translate("datetime local"),
                value: "datetime-local",
              },
              {
                text: Scratch.translate("week"),
                value: "week",
              },
              {
                text: Scratch.translate("time"),
                value: "time",
              },
              {
                text: Scratch.translate("month"),
                value: "month",
              },
            ],
          },
          element_attributes: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("text"),
                value: "text",
              },
              {
                text: Scratch.translate("value"),
                value: "value",
              },
              {
                text: Scratch.translate("placeholder"),
                value: "placeholder",
              },
              {
                text: Scratch.translate("max"),
                value: "max",
              },
              { text: Scratch.translate("max length"), value: "maxlength" },
              {
                text: Scratch.translate("min"),
                value: "min",
              },
              { text: Scratch.translate("min length"), value: "minlength" },
            ],
          },
          element_attributes_coordinates: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("text"),
                value: "text",
              },
              {
                text: Scratch.translate("value"),
                value: "value",
              },
              {
                text: Scratch.translate("placeholder"),
                value: "placeholder",
              },
              {
                text: Scratch.translate("max"),
                value: "max",
              },
              { text: Scratch.translate("max length"), value: "maxlength" },
              {
                text: Scratch.translate("min"),
                value: "min",
              },
              { text: Scratch.translate("min length"), value: "minlength" },
              "x",
              "y",
              { text: Scratch.translate("width"), value: "width" },
              { text: Scratch.translate("height"), value: "height" },
            ],
          },
          get_list: {
            acceptReporters: true,
            items: "getLists",
          },
        },
      };
    }

    /**
     * @param {{ NAME: string; TYPE: string; }} args
     */
    createInput({ NAME, TYPE }) {
      createElement("input", Scratch.Cast.toString(NAME), [
        { name: "type", value: TYPE },
      ]);
    }

    /**
     * @param {{ NAME: string; }} args
     */
    createSelect(args) {
      createElement("select", Scratch.Cast.toString(args.NAME));
    }

    /**
     * @param {{ NAME: string }} args
     */
    emptySelectMenu({ NAME }) {
      NAME = Scratch.Cast.toString(NAME);
      try {
        html_elements[NAME].innerText = "";
      } catch {
        try {
          var i,
            L = html_elements[NAME].options.length - 1;
          for (i = L; i >= 0; i--) {
            html_elements[NAME].remove(i);
          }
        } catch {
          while (html_elements[NAME].options.length > 0) {
            html_elements[NAME].remove(0);
          }
        }
      }
      updateElementAttributes(NAME);
    }

    /**
     * @param {{ NAME: string; LIST: string; }} args
     * @param {*} util
     */
    setSelectOptionsToList({ NAME, LIST }, util) {
      NAME = Scratch.Cast.toString(NAME);
      let listVariable = lookupList(LIST, util).value;
      this.emptySelectMenu({ NAME });
      for (var i in listVariable) {
        html_elements[NAME].appendChild(
          _option(listVariable[i], listVariable[i])
        );
      }
      updateElementAttributes(NAME);
    }

    /**
     * @param {{ NAME: string; LIST: string; SPLITBY: string; }} args
     */
    setSelectOptionsToText({ NAME, LIST, SPLITBY }) {
      NAME = Scratch.Cast.toString(NAME);
      let listVariable = LIST.split(SPLITBY);
      this.emptySelectMenu({ NAME });
      for (var i in listVariable) {
        html_elements[NAME].appendChild(
          _option(listVariable[i], listVariable[i])
        );
      }
      updateElementAttributes(NAME);
    }

    /**
     * @param {{ NAME: string; ATTRIBUTE: string; VALUE: string; }} args
     */
    setElement({ NAME, ATTRIBUTE, VALUE }) {
      NAME = Scratch.Cast.toString(NAME);
      switch (ATTRIBUTE) {
        case "text":
          html_elements[NAME].innerText = VALUE;
          break;
        case "value":
        case "placeholder":
          html_elements[NAME][ATTRIBUTE] = VALUE;
          break;
        case "disabled":
          html_elements[NAME].disabled = VALUE == "true";
      }
    }

    getLists() {
      const globalLists = Object.values(
        // @ts-ignore
        Scratch.vm.runtime.getTargetForStage().variables
      ).filter((x) => x.type == "list");
      const localLists = Object.values(
        // @ts-ignore
        Scratch.vm.editingTarget.variables
      ).filter((x) => x.type == "list");
      const uniqueLists = [...new Set([...globalLists, ...localLists])];
      if (uniqueLists.length === 0) {
        return [
          {
            text: Scratch.translate("select a list"),
            value: "select a list",
          },
        ];
      }
      return uniqueLists.map((i) => ({
        text: i.name,
        value: i.id,
      }));
    }

    /**
     * @param {{ NAME: string; }} args
     */
    elementExists({ NAME }) {
      NAME = Scratch.Cast.toString(NAME);
      return html_elements[NAME] != undefined;
    }

    /**
     * @param {{ NAME: string; X: number; }} args
     */
    setElementX({ NAME, X }) {
      NAME = Scratch.Cast.toString(NAME);
      elements_coordinates[NAME].x = Scratch.Cast.toNumber(X);
      updateElementAttributes(NAME);
    }

    /**
     * @param {{ NAME: string; Y: number; }} args
     */
    setElementY({ NAME, Y }) {
      NAME = Scratch.Cast.toString(NAME);
      elements_coordinates[NAME].y = Scratch.Cast.toNumber(Y);
      updateElementAttributes(NAME);
    }

    /**
     * @param {{ NAME: string; ATTRIBUTE: string; }} args
     */
    getElement({ NAME, ATTRIBUTE }) {
      NAME = Scratch.Cast.toString(NAME);
      switch (ATTRIBUTE) {
        case "text":
          return html_elements[NAME].innerText;
        case "x":
        case "y":
          return elements_coordinates[NAME][ATTRIBUTE];
        case "width":
        case "height":
          if (elements_coordinates[NAME][ATTRIBUTE] == -1) {
            return (
              (html_elements[NAME].getBoundingClientRect().width /
                Scratch.renderer.canvas.getBoundingClientRect().width) *
              Scratch.vm.runtime.stageWidth
            );
          }
          return elements_coordinates[NAME][ATTRIBUTE];
        default:
          return html_elements[NAME][ATTRIBUTE];
      }
    }

    /**
     * @param {{ NAME: string; EVENT: string; }} args
     */
    async waitUntilElementEvent({ NAME, EVENT }) {
      NAME = Scratch.Cast.toString(NAME);
      if (html_elements[NAME]) {
        await getPromiseFromEvent(html_elements[NAME], EVENT);
      }
    }

    /**
     * @param {{ NAME: string }} args
     */
    show({ NAME }) {
      NAME = Scratch.Cast.toString(NAME);
      if (html_elements[NAME]) {
        html_elements[NAME].style.display = "";
      }
    }

    /**
     * @param {{ NAME: string }} args
     */
    hide({ NAME }) {
      NAME = Scratch.Cast.toString(NAME);
      if (html_elements[NAME]) {
        html_elements[NAME].style.display = "none";
      }
    }

    /**
     * @param {{ NAME: string }} args
     */
    elementVisibility({ NAME }) {
      NAME = Scratch.Cast.toString(NAME);
      if (html_elements[NAME]) {
        return html_elements[NAME].style.display == "";
      }
    }

    /**
     * @param {{ NAME: string }} args
     */
    deleteElement({ NAME }) {
      closeElement(Scratch.Cast.toString(NAME));
    }

    deleteEveryElement() {
      closeElements();
    }

    /**
     * @param {{ NAME: string; WIDTH: Number; }} args
     */
    setElementWidth({ NAME, WIDTH }) {
      NAME = Scratch.Cast.toString(NAME);
      elements_coordinates[NAME].width = Scratch.Cast.toNumber(WIDTH);
      updateElementAttributes(NAME);
    }

    /**
     * @param {{ NAME: string; HEIGHT: Number; }} args
     */
    setElementHeight({ NAME, HEIGHT }) {
      NAME = Scratch.Cast.toString(NAME);
      elements_coordinates[NAME].height = Scratch.Cast.toNumber(HEIGHT);
      updateElementAttributes(NAME);
    }

    /**
     * @param {{ NAME: string; }} args
     */
    refreshElement({ NAME }) {
      updateElementAttributes(Scratch.Cast.toString(NAME));
    }

    refreshAll() {
      updateElementsAttributes();
    }
  }

  Scratch.extensions.register(new HTMLInputs());
})(Scratch);
