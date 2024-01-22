// Name: insertHTML
// ID: samuelloufinserthtml
// Description: Add HTML elements over the stage.
// By: SamuelLouf <https://scratch.mit.edu/users/samuellouf/>

(function (Scratch) {
  "use strict";

  let html_elements = {};
  let overlay = {};

  let elements_coordinates = {};
  
  let interactive = true;
  let resizeBehavior = "scale";

  const updateElementAttributes = (name) => {
    if (html_elements[name] == undefined) {
      return;
    }

    const { stageWidth, stageHeight } = Scratch.vm.runtime;
    const effectiveWidth = elements_coordinates[name].width >= 0 ? elements_coordinates[name].width : stageWidth;
    const effectiveHeight = elements_coordinates[name].height >= 0 ? elements_coordinates[name].height : stageHeight;

    html_elements[name].style.pointerEvents = interactive ? "auto" : "none";

    if (elements_coordinates[name].width == -1){
      html_elements[name].style.width = '';
      html_elements[name].style.left = "0";
    } else {
      html_elements[name].style.width = (effectiveWidth / stageWidth * 100) + '%';
      html_elements[name].style.left = `${-(stageWidth - elements_coordinates[name].width) + ((stageWidth - elements_coordinates[name].width) / 2)}px`;
    }

    if (elements_coordinates[name].height == -1){
      html_elements[name].style.height = '';
      html_elements[name].style.top = "0";
    } else {
      html_elements[name].style.height = (effectiveHeight / stageHeight * 100) + '%';
      html_elements[name].style.top = `${-(stageHeight - elements_coordinates[name].height) + ((stageHeight - elements_coordinates[name].height) / 2)}px`;
    }

    html_elements[name].style.transform = `translate(${(-effectiveWidth / 2 + elements_coordinates[name].x) + (stageWidth / 2) - (html_elements[name].clientWidth / 2)}px, ${
      (-effectiveHeight / 2 - elements_coordinates[name].y) + (stageHeight / 2) - (html_elements[name].clientHeight / 2)
    }px)`;
  };

  const getOverlayMode = () =>
    resizeBehavior === "scale" ? "scale-centered" : "manual";

  const createElement = (element, name, attributes = [], id = '', class_names = '') => {
    html_elements[name] = document.createElement(element);
    
    html_elements[name].style.position = "absolute";

    elements_coordinates[name] = {x: 0, y: 0, width: -1, height: -1};
    
    for (var i in attributes){
      html_elements[name].setAttribute(attributes[i].name, attributes[i].value);
    }

    overlay[name] = Scratch.renderer.addOverlay(html_elements[name], getOverlayMode());
    updateElementAttributes(name);
  }

  const closeElement = (name) => {
    if (html_elements[name]) {
      Scratch.renderer.removeOverlay(html_elements[name]);
      delete overlay[name];
    }
  };

  const updateElementsAttributes = () => {
    var elements = Object.keys(html_elements).map((key) => key);
    for (var i in elements){
      updateElementAttributes(elements[i]);
    }
  }

  const closeElements = () => {
    var elements = Object.keys(html_elements).map((key) => key);
    for (var i in elements){
      closeElement(elements[i]);
    }
  }

  const label = (text) => {
    return {
      blockType: "label",
      text: text,
    }
  }

  const getPromiseFromEvent = (item, event) => {
    return new Promise((resolve) => {
      const listener = (e) => {
        item.removeEventListener(event, listener);
        resolve(e);
      }
      item.addEventListener(event, listener);
    })
  }

  Scratch.vm.on("STAGE_SIZE_CHANGED", updateElementsAttributes);

  Scratch.vm.runtime.on("RUNTIME_DISPOSED", closeElements);

  class insertHTML {
    getInfo() {
      return {
        name: "insertHTML",
        id: "samuelloufinserthtml",
        blocks: [
          label('Create'),
          {
            opcode: "createInput",
            blockType: Scratch.BlockType.COMMAND,
            text: "create input of type [TYPE] named [NAME]",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'input_types',
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
            text: "create a select menu named [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
            },
          },
          label('Set'),
          {
            opcode: "setSelectOptionsToList",
            blockType: Scratch.BlockType.COMMAND,
            text: "set the select menu named [NAME]'s options to the content of the list [LIST]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: 'get_list',
              },
            },
          },
          {
            opcode: "setSelectOptionsToText",
            blockType: Scratch.BlockType.COMMAND,
            text: "set the select menu named [NAME]'s options to the content of the list [LIST] splitted by [SPLITBY]",
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
            text: "set element named [NAME]'s [ATTRIBUTE] to [VALUE]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
              ATTRIBUTE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'element_attributes',
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "value",
              },
            },
          },
          label('Get'),
          {
            opcode: "getElement",
            blockType: Scratch.BlockType.REPORTER,
            text: "get element named [NAME]'s [ATTRIBUTE]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
              ATTRIBUTE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'element_attributes_coordinates',
              },
            },
          },
          {
            opcode: "waitUntilElementEvent",
            blockType: Scratch.BlockType.COMMAND,
            text: "wait until element named [NAME] sends event [EVENT]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'name'
              },
              EVENT: {
                type: Scratch.ArgumentType.STRING,
                menu: 'element_event',
              },
            },
          },
          label('Delete'),
          {
            opcode: "deleteElement",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete element named [NAME]",
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
            text: "delete every element",
          },
          {
            opcode: "elementExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "does element named [NAME] exists?",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
            },
          },
          "---",
          label('Visibility'),
          {
            opcode: "hide",
            blockType: Scratch.BlockType.COMMAND,
            text: "hide element named [NAME] ",
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
            text: "show element named [NAME] ",
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
            text: "is element named [NAME] visible?",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "name",
              },
            },
          },
          "---",
          label('Position'),
          {
            opcode: "setElementX",
            blockType: Scratch.BlockType.COMMAND,
            text: "set element named [NAME]'s x position to [X]",
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
            text: "set element named [NAME]'s y position to [Y]",
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
          label('Dimensions'),
          {
            opcode: "setElementWidth",
            blockType: Scratch.BlockType.COMMAND,
            text: "set element named [NAME]'s width to [WIDTH]",
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
            text: "set element named [NAME]'s height to [HEIGHT]",
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
          label('Refresh'),
          {
            opcode: "refreshElement",
            blockType: Scratch.BlockType.COMMAND,
            text: "refresh element named [NAME]",
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
            text: "refresh every element",
          },
        ],
        menus: {
          element_event: {
            acceptReporters: true,
            items: [
              "click",
              "change",
              {text:"double click",value:"dblclick"},
              "focus",
              {text:"mouse down",value:"mousedown"},
              {text:"mouse up",value:"mouseup"},
              {text:"mouse enter",value:"mouseenter"},
              {text:"mouse leave",value:"mouseleave"},
              {text:"mouse move",value:"mousemove"},
              {text:"mouse out",value:"mouseout"},
              {text:"mouse wheel",value:"mousewheel"},
              {text:"pointer down",value:"pointerdown"},
              {text:"pointer up",value:"pointerup"},
              {text:"pointer enter",value:"pointerenter"},
              {text:"pointer leave",value:"pointerleave"},
              {text:"pointer out",value:"pointerout"},
              "select",
              {text:"selection change",value:"selectionchange"},
              {text:"select start",value:"selectstart"}
            ],
          },
          input_types: {
            acceptReporters: true,
            items: [
              "text",
              "username",
              "password",
              "range",
              "tel",
              "email",
              "number",
              "color",
              "date",
              "datetime-local",
              "week",
              "time",
              "month",
            ],
          },
          element_attributes: {
            acceptReporters: true,
            items: [
              "text",
              "value",
              "placeholder",
              "max",
              {text: 'max length', value: 'maxlength'},
              "min",
              {text: 'min length', value: 'minlength'},
            ],
          },
          element_attributes_coordinates: {
            acceptReporters: true,
            items: [
              "text",
              "value",
              "placeholder",
              "max",
              {text: 'max length', value: 'maxlength'},
              "min",
              {text: 'min length', value: 'minlength'},
              "x",
              "y",
              "width",
              "height",
            ],
          },
          get_list: {
            acceptReporters: true,
            items: "getLists",
          }
        },
      };
    }

    createInput({ TYPE, NAME }){
      createElement('input', NAME, [{name: 'type', value: TYPE}]);
    }

    createSelect({ NAME }){
      createElement('select', NAME);
    }

    lookupList(list, util) {
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

    _option(value, text){
      var option = document.createElement('option');
      option.value = value;
      option.text = text;
      return option;
    }

    emptySelectMenu({NAME}){
      try{
        html_elements[NAME].innerText = ''
      } catch {
        try{
          var i, L = html_elements[NAME].options.length - 1;
          for(i = L; i >= 0; i--) {
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

    setSelectOptionsToList({NAME,LIST}, util){
      let listVariable = this.lookupList(LIST, util).value;
      this.emptySelectMenu({ NAME });
      for (var i in listVariable){
        html_elements[NAME].appendChild(this._option(listVariable[i], listVariable[i]));
      }
      updateElementAttributes(NAME);
    }

    setSelectOptionsToText({NAME,LIST,SPLITBY}){
      let listVariable = LIST.split(SPLITBY);
      this.emptySelectMenu({ NAME });
      for (var i in listVariable){
        html_elements[NAME].appendChild(this._option(listVariable[i], listVariable[i]));
      }
      updateElementAttributes(NAME);
    }

    setElement({NAME,ATTRIBUTE,VALUE}){
      switch (ATTRIBUTE){
        case 'text':
          html_elements[NAME].innerText = VALUE;
          break;
        case 'value':
          html_elements[NAME].value = VALUE;
          break;
        case 'placeholder':
          html_elements[NAME].placeholder = VALUE;
          break;
        case 'disabled':
          html_elements[NAME].disabled = (VALUE == 'true');
      }
    }

    getLists(){
      const globalLists = Object.values(
        Scratch.vm.runtime.getTargetForStage().variables
      ).filter((x) => x.type == "list");
      const localLists = Object.values(Scratch.vm.editingTarget.variables).filter(
        (x) => x.type == "list"
      );
      const uniqueLists = [...new Set([...globalLists, ...localLists])];
      if (uniqueLists.length === 0) {
        return [
          {
            text: "select a list",
            value: "select a list",
          },
        ];
      }
      return uniqueLists.map((i) => ({
        text: i.name,
        value: i.id,
      }));
    }

    elementExists({NAME}){
      return html_elements[NAME] != undefined;
    }

    setElementX({NAME,X}){
      elements_coordinates[NAME].x = Scratch.Cast.toNumber(X);
      updateElementAttributes(NAME);
    }

    setElementY({NAME,Y}){
      elements_coordinates[NAME].y = Scratch.Cast.toNumber(Y);
      updateElementAttributes(NAME);
    }

    getElement({NAME,ATTRIBUTE}){
      switch (ATTRIBUTE){
        case 'text':
          return html_elements[NAME].innerText;
        case 'value':
          return html_elements[NAME].value;
        case 'placeholder':
          return html_elements[NAME].placeholder;
        case 'disabled':
          return html_elements[NAME].disabled;
        case 'x':
          return elements_coordinates[NAME].x;
        case 'y':
          return elements_coordinates[NAME].y;
        case 'height':
          return elements_coordinates[NAME].height;
        case 'width':
          return elements_coordinates[NAME].width;
      }
    }

    async waitUntilElementEvent({NAME,EVENT}){
      if (html_elements[NAME]){
        await getPromiseFromEvent(html_elements[NAME], EVENT);
      }
    }

    show({NAME}){
      if (html_elements[NAME]){
        html_elements[NAME].style.display = '';
      }
    }

    hide({NAME}){
      if (html_elements[NAME]){
        html_elements[NAME].style.display = 'none';
      }
    }

    elementVisibility({NAME}){
      if (html_elements[NAME]){
        return html_elements[NAME].style.display == '';
      }
    }

    deleteElement({NAME}){
      closeElement(NAME);
    }

    deleteEveryElement(){
      closeElements();
    }

    setElementWidth({NAME,WIDTH}){
      elements_coordinates[NAME].width = Scratch.Cast.toNumber(WIDTH);
      updateElementAttributes(NAME);
    }

    setElementHeight({NAME,HEIGHT}){
      elements_coordinates[NAME].height = Scratch.Cast.toNumber(HEIGHT);
      updateElementAttributes(NAME);
    }

    refreshElement({NAME}){
      updateElementAttributes(NAME);
    }

    refreshAll(){
      updateElementsAttributes();
    }
  }

  Scratch.extensions.register(new insertHTML());
})(Scratch);
