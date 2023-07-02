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
            opcode: 'changeDefaultModalText',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Change default modal text to [TEXT]',
            arguments: {
                TEXT: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Hello World!'
                }
            }
          },
          {
            opcode: 'changeDefaultModalColor',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Change modal background color to [COLOR]',
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#696969'
              }
            }
          },
          {
            opcode: 'changeDefaultModalTextColor',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Change modal text color to [COLOR]',
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#ffffff'
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
          }
        ]
      };
    }

    addTextToModal(args, util){
      if (isModalOpen){
        const text = args.TEXT;
        //select the first <dialog> element
        const modal = document.querySelector("dialog");
        const textNode = document.createTextNode(text);
        const breakNode = document.createElement("br");
        modal.appendChild(breakNode);
        modal.appendChild(textNode);
      }
    }

    changeDefaultModalText(args, util){
      if (isModalOpen){
        const defaultModalText = args.TEXT;
        const modal = document.querySelector("dialog");
        const text = document.getElementById("randomutilities_modalText");
        text.textContent = defaultModalText;
      }
    }

    changeDefaultModalColor(args, util){
      if (isModalOpen){
        const defaultModalColor = args.COLOR;
        const modal = document.querySelector("dialog");
        modal.style.backgroundColor = defaultModalColor;
      }
    }

    changeDefaultModalTextColor(args, util){
      if (isModalOpen){
        const defaultModalTextColor = args.COLOR;
        const modal = document.querySelector("dialog");
        modal.style.color = defaultModalTextColor;
      }
    }

    IsModalOpen(){
        return isModalOpen;
    }

    inputModalValue(){
        return modalInput;
    }
    showModal(args, util){
      //Create Modal
      if (!isModalOpen){
        var modal = document.createElement("dialog");
        var text = document.createElement("p");
        text.id = "randomutilities_modalText";
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
      if (!isModalOpen){
        //Create Modal
        var modal = document.createElement("dialog");
        var text = document.createElement("p");
        text.id = "randomutilities_modalText";
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