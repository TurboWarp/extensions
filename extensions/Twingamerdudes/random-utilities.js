(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Random Utils must run unsandboxed');
  }

  const vm = Scratch.vm;
  let modalInput = "";
  let isModalOpen = false;
  class RandomUtils {
    getInfo() {
      return {
        id: 'randomutilities',
        name: 'Random Utilities',
        color1: '#a01c1c',
        color2: '#861515',
        color3: '#6d1212',
        blocks: [
          {
            opcode: 'greenFlag',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Green Flag',
          },
          {
            opcode: 'showModal',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Show Modal [TEXT] with the background [COLOR] and text color [TCOLOR]',
            arguments: {
                TEXT: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: 'Hello World!'
                },
                COLOR: {
                    type: Scratch.ArgumentType.COLOR,
                    defaultValue: '#696969'
                },
                TCOLOR: {
                    type: Scratch.ArgumentType.COLOR,
                    defaultValue: '#ffffff'
                }
            }
          },
          {
            opcode: 'showModalWithInput',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Show Input Modal [TEXT] with the background [COLOR] secondary color [SCOLOR], text color [TCOLOR], and placeholder [PLACEHOLDER]',
            arguments: {
                TEXT: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: 'Hello World!'
                },
                COLOR: {
                    type: Scratch.ArgumentType.COLOR,
                    defaultValue: '#696969'
                },
                TCOLOR: {
                    type: Scratch.ArgumentType.COLOR,
                    defaultValue: '#ffffff'
                },
                SCOLOR: {
                    type: Scratch.ArgumentType.COLOR,
                    defaultValue: '#808080'
                },
                PLACEHOLDER: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Your text.'
                }
            }
          },
          {
            opcode: 'addTextToModal',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Add [TEXT] to the current modal',
            arguments: {
                TEXT: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: 'Hello World!'
                }
            }
          },
          {
            opcode: 'inputModalValue',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Input Modal Value',
            disableMonitor: true
          },
          {
            opcode: 'IsModalOpen',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'Is Modal Open?',
          },
          {
            opcode: 'modalOpen',
            blockType: Scratch.BlockType.HAT,
            text: 'When a modal is opened',
            isEdgeActivated: false
          },
          {
            opcode: 'modalClose',
            blockType: Scratch.BlockType.HAT,
            text: 'When a modal is closed',
            isEdgeActivated: false
          },
          {
            opcode: 'setVariableIfElse',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set [VARIABLE] to [VALUE] if [CONDITION] else [ELSE]',
            arguments: {
                VARIABLE: {
                    type: Scratch.ArgumentType.STRING,
                    menu: 'variablesMenu'
                },
                VALUE: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: 'Hello World!'
                },
                CONDITION: {
                    type: Scratch.ArgumentType.BOOLEAN,
                    defaultValue: true
                },
                ELSE: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: 'Goodbye World!'
                }
            }
          },
          {
            opcode: 'swapLetters',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Swap letters in [TEXT] at index [INDEX1] and [INDEX2]',
            arguments: {
                TEXT: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Hello World!'
                },
                INDEX1: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 0
                },
                INDEX2: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 1
                }
              }
          },
          {
            opcode: 'variableTrue',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[VARIABLE]',
            arguments: {
              VARIABLE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'variablesMenu'
              }
            }
          },
          {
            opcode: 'getDirectionKey',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'Is Direction Key [KEY] Pressed?',
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                menu: 'DirectionKeys'
              }
            }
          },
          {
            opcode: 'normalizeValue',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Normalize [VALUE] between [MIN] and [MAX]',
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              },
              MIN: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              MAX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              }
            }
          }
        ],
        menus: {
            variablesMenu: {
                acceptReporters: false,
                items: 'getVariables'
            },
            DirectionKeys: {
              acceptReporters: false,
              items: ['up', 'down', 'left', 'right']
            }
        }
      };
    }


    variableTrue(args, util){
      return Scratch.Cast.toBoolean(vm.getVariableValue(util.target.id, args.VARIABLE));
    }

    normalizeValue(args, util){
      const divisor = args.MAX - args.MIN;
      return (args.VALUE - args.MIN) / divisor;
    }

    addTextToModal(args, util){
      if(isModalOpen){
        const text = args.TEXT;

        //select the first <dialog> element
        var modal = document.querySelector("dialog");
        var textNode = document.createTextNode(text);
        var breakNode = document.createElement("br");
        modal.appendChild(breakNode);
        modal.appendChild(textNode);
      }
    }

    getDirectionKey(args, util){
      switch(args.KEY){
        case 'up':
          return util.ioQuery('keyboard', 'getKeyIsDown', ["up arrow"]) || util.ioQuery('keyboard', 'getKeyIsDown', ["w"]);
        case 'down':
          return util.ioQuery('keyboard', 'getKeyIsDown', ["down arrow"]) || util.ioQuery('keyboard', 'getKeyIsDown', ["s"]);
        case 'left':
          return util.ioQuery('keyboard', 'getKeyIsDown', ["left arrow"]) || util.ioQuery('keyboard', 'getKeyIsDown', ["a"]);
        case 'right':
          return util.ioQuery('keyboard', 'getKeyIsDown', ["right arrow"]) || util.ioQuery('keyboard', 'getKeyIsDown', ["d"]);
      }
      return false;
    }
    greenFlag(){
        vm.greenFlag();
    }

    IsModalOpen(){
        return isModalOpen;
    }

    setVariableIfElse(args, util){
        vm.setVariableValue(util.target.id, args.VARIABLE, args.CONDITION ? args.VALUE : args.ELSE);
    }

    inputModalValue(){
        return modalInput;
    }

    //Get variables made by LilyMakesThings
    getVariables() {
        // @ts-expect-error - Blockly not typed yet
        // eslint-disable-next-line no-undef
        const variables = typeof Blockly === 'undefined' ? [] : Blockly.getMainWorkspace()
          .getVariableMap()
          .getVariablesOfType('')
          .map(model => ({
            text: model.name,
            value: model.getId()
          }));
        if (variables.length > 0) {
          return variables;
        } else {
          return [{ text: "", value: "" }];
        }
    }

    swapLetters(args){
      //Get arguments
      const text = args.TEXT;
      const index1 = args.INDEX1;
      const index2 = args.INDEX2;

      //Swap letters
      let newText = text.split('');
      let temp = newText[index1];
      newText[index1] = newText[index2];
      newText[index2] = temp;

      //Return new text
      newText = newText.join('');
      return newText;
    }
    showModal(args, util){
      //Create Modal
      if(!isModalOpen){
        var modal = document.createElement("dialog");
        var text = document.createElement("p");
        text.textContent = args.TEXT;
        modal.appendChild(text);
        document.body.appendChild(modal);
        //Create Close Button
        var close = document.createElement("button");
        close.innerHTML = "X";
        close.addEventListener("click", function(){
            util.startHats('randomutilities_modalClose');
            isModalOpen = false;
            modal.close();
            modal.remove();
        });
        //CSS Hell
        close.style.position = "absolute";
        close.style.top = "0";
        close.style.right = "0";
        close.style.padding = "5px";
        close.style.border = "none";
        close.style.background = "#ff0000";
        close.style.fontSize = "0.8em";
        close.style.cursor = "pointer";
        close.style.outline = "none";
        close.style.transformOrigin = "50% 50%";
        close.style.zIndex = "100";
        close.style.borderRadius = "0 0 0 5px";
        //Finish Modal
        modal.style.width = "300px";
        modal.style.padding = "20px 30px";
        modal.style.textAlign = "center";
        modal.style.background = args.COLOR;
        modal.style.color = args.TCOLOR;
        modal.appendChild(close);
        modal.showModal();
        isModalOpen = true;
        util.startHats('randomutilities_modalOpen');
      }
    }

    showModalWithInput(args, util){

      if(!isModalOpen){
      //Create Modal
      var modal = document.createElement("dialog");
      var text = document.createElement("p");
      text.textContent = args.TEXT;
      modal.appendChild(text);
      document.body.appendChild(modal);

      //Create input
      var input = document.createElement("input");
      input.placeholder = args.PLACEHOLDER;

      //CSS Hell
      input.type = "text";
      input.id = "randomutilities_modalInput";
      input.style.width = "100%";
      input.style.margin = "10px 0";
      input.style.padding = "5px";
      input.style.border = "none";
      input.style.background = args.SCOLOR;
      input.style.fontSize = "0.8em";
      input.style.outline = "none";
      input.style.transformOrigin = "50% 50%";
      input.style.zIndex = "100";
      input.style.borderRadius = "5px";
      input.style.color = args.TCOLOR;

      //WHY DO I HAVE TO DO THIS!?!?!?!?!?!?
      var pcss = "#randomutilities_modalInput::placeholder { color: " + args.TCOLOR + "; opacity: 0.5; }";
      var styleElement = document.createElement("style");
      styleElement.appendChild(document.createTextNode(pcss));
      document.head.appendChild(styleElement);

      //Create Close Button
      var close = document.createElement("button");
      close.innerHTML = "X";
      close.addEventListener("click", function(){
          util.startHats('randomutilities_modalClose');
          isModalOpen = false;
          modal.close();
          modal.remove();
      });

      //More CSS Hell
      close.style.position = "absolute";
      close.style.top = "0";
      close.style.right = "0";
      close.style.padding = "5px";
      close.style.border = "none";
      close.style.background = "#ff0000";
      close.style.fontSize = "0.8em";
      close.style.cursor = "pointer";
      close.style.outline = "none";
      close.style.transformOrigin = "50% 50%";
      close.style.zIndex = "0";
      close.style.borderRadius = "0 0 0 5px";

      //Create Submit Button
      var submit = document.createElement("button");
      submit.innerHTML = "Submit";
      submit.addEventListener("click", function(){
        util.startHats('randomutilities_modalClose');
        const input = document.getElementById("randomutilities_modalInput");
        isModalOpen = false;
        // @ts-ignore
        modalInput = input.value;
        modal.close();
        modal.remove();
      });

      //More CSS Hell
      submit.style.backgroundColor = args.SCOLOR;
      submit.style.color = args.TCOLOR;
      submit.style.border = "none";
      submit.style.padding = "5px";
      submit.style.fontSize = "1em";
      submit.style.cursor = "pointer";
      submit.style.outline = "none";
      submit.style.transformOrigin = "50% 50%";
      submit.style.zIndex = "0";
      submit.style.borderRadius = "5px";

      //Finish Modal
      modal.style.width = "300px";
      modal.style.padding = "20px 30px";
      modal.style.textAlign = "center";
      modal.style.background = args.COLOR;
      modal.style.color = args.TCOLOR;
      modal.style.overflow = "hidden";
      modal.appendChild(close);
      modal.appendChild(input);
      modal.appendChild(submit);
      isModalOpen = true;
      modal.showModal();
      util.startHats('randomutilities_modalOpen');
    }
  }
}
Scratch.extensions.register(new RandomUtils());
})(Scratch);