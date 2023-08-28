// Name: Modals
// ID: modals
// Description: Adds support for HTML modals.
// By: Twingamerdudes <https://scratch.mit.edu/users/twingamerdudesreal/>
(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Modals must run unsandboxed");
  }

  const vm = Scratch.vm;
  let modalInput = ""; // By: Twingamerdudes <https://scratch.mit.edu/users/twingamerdudesreal/>
  // Original: YourMom
  let buttonPressed = "";
  let isModalOpen = false;
  class Modals {
    getInfo() {
      return {
        id: "modals",
        name: "Modals",
        color1: "#a01c1c",
        color2: "#861515",
        color3: "#6d1212",
        blocks: [
          {
            opcode: "showModal",
            blockType: Scratch.BlockType.COMMAND,
            text: "show modal [TEXT] with the background [COLOR] and text color [TCOLOR]",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello World!",
              },
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#696969",
              },
              TCOLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ffffff",
              },
            },
          },
          {
            opcode: "showModalWithInput",
            blockType: Scratch.BlockType.COMMAND,
            text: "show input modal [TEXT] with the background [COLOR] secondary color [SCOLOR], text color [TCOLOR], and placeholder [PLACEHOLDER]",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello World!",
              },
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#696969",
              },
              TCOLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ffffff",
              },
              SCOLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#808080",
              },
              PLACEHOLDER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Your text.",
              },
            },
          },
          {
            opcode: "closeModal",
            blockType: Scratch.BlockType.COMMAND,
            text: "close modal",
          },
          {
            opcode: "addTextToModal",
            blockType: Scratch.BlockType.COMMAND,
            text: "add [TEXT] to the current modal",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello World!",
              },
            },
          },
          {
            opcode: "addModalButton",
            blockType: Scratch.BlockType.COMMAND,
            text: "add button [NAME] with the background color of [SCOLOR] and the text color of [TCOLOR] to the current modal",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "My Button",
              },
              SCOLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#808080",
              },
              TCOLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ffffff",
              },
            },
          },
          {
            opcode: "changeDefaultModalText",
            blockType: Scratch.BlockType.COMMAND,
            text: "change default modal text to [TEXT]",
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello World!",
              },
            },
          },
          {
            opcode: "changeDefaultModalColor",
            blockType: Scratch.BlockType.COMMAND,
            text: "change modal background color to [COLOR]",
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#696969",
              },
            },
          },
          {
            opcode: "changeDefaultModalTextColor",
            blockType: Scratch.BlockType.COMMAND,
            text: "change modal text color to [COLOR]",
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ffffff",
              },
            },
          },
          {
            opcode: "inputModalValue",
            blockType: Scratch.BlockType.REPORTER,
            text: "input modal value",
            disableMonitor: true,
          },
          {
            opcode: "IsModalOpen",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is modal open?",
          },
          {
            opcode: "modalOpen",
            blockType: Scratch.BlockType.HAT,
            text: "when a modal is opened",
            isEdgeActivated: false,
          },
          {
            opcode: "modalClose",
            blockType: Scratch.BlockType.HAT,
            text: "when a modal is closed",
            isEdgeActivated: false,
          },
          {
            blockType: Scratch.BlockType.EVENT,
            opcode: "whenButtonPressed",
            text: "when [BUTTON] is clicked",
            isEdgeActivated: false, // required boilerplate
            arguments: {
              BUTTON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "My Button",
              },
            },
          },
        ],
      };
    }

    whenButtonPressed(args) {
      if (buttonPressed == args.BUTTON) {
        buttonPressed = "";
        return true;
      }
      return false;
    }
    addTextToModal(args) {
      if (isModalOpen) {
        const text = args.TEXT;
        //select the first <dialog> element
        const modal = document.querySelector("dialog");
        const textNode = document.createTextNode(text);
        const breakNode = document.createElement("br");
        modal.appendChild(breakNode);
        modal.appendChild(textNode);
      }
    }

    closeModal(args) {
      if (isModalOpen) {
        const modal = document.querySelector("dialog");
        modal.close();
        modal.remove();
        isModalOpen = false;
      }
    }

    changeDefaultModalText(args) {
      if (isModalOpen) {
        const defaultModalText = args.TEXT;
        const modal = document.querySelector("dialog");
        const text = document.getElementById("modals_modalText");
        text.textContent = defaultModalText;
      }
    }

    addModalButton(args, util) {
      if (isModalOpen) {
        //init stuff
        const buttonName = args.NAME;
        const modal = document.querySelector("dialog");
        const button = document.createElement("button");

        //CSS Hell
        button.style.backgroundColor = args.SCOLOR;
        button.style.color = args.TCOLOR;
        button.style.border = "none";
        button.style.padding = "5px";
        button.style.fontSize = "1em";
        button.style.cursor = "pointer";
        button.style.outline = "none";
        button.style.transformOrigin = "50% 50%";
        button.style.zIndex = "0";
        button.style.borderRadius = "5px";
        button.innerHTML = buttonName;

        button.addEventListener("click", function () {
          buttonPressed = buttonName;
          util.startHats("modals_whenButtonPressed");
        });
        modal.appendChild(button);
      }
    }

    changeDefaultModalColor(args) {
      if (isModalOpen) {
        const defaultModalColor = args.COLOR;
        const modal = document.querySelector("dialog");
        modal.style.backgroundColor = defaultModalColor;
      }
    }

    changeDefaultModalTextColor(args) {
      if (isModalOpen) {
        const defaultModalTextColor = args.COLOR;
        const modal = document.querySelector("dialog");
        modal.style.color = defaultModalTextColor;
      }
    }

    IsModalOpen() {
      return isModalOpen;
    }

    inputModalValue() {
      return modalInput;
    }
    showModal(args, util) {
      //Create Modal
      if (!isModalOpen) {
        var modal = document.createElement("dialog");
        var text = document.createElement("p");
        text.id = "modals_modalText";
        text.textContent = args.TEXT;
        modal.appendChild(text);
        document.body.appendChild(modal);
        //Create Close Button
        var close = document.createElement("button");
        close.innerHTML = "X";
        close.addEventListener("click", function () {
          util.startHats("modals_modalClose");
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
        util.startHats("modals_modalOpen");
      }
    }

    showModalWithInput(args, util) {
      if (!isModalOpen) {
        //Create Modal
        var modal = document.createElement("dialog");
        var text = document.createElement("p");
        text.id = "modals_modalText";
        text.textContent = args.TEXT;
        modal.appendChild(text);
        document.body.appendChild(modal);

        //Create input
        var input = document.createElement("input");
        input.placeholder = args.PLACEHOLDER;

        //CSS Hell
        input.type = "text";
        input.id = "modals_modalInput";
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
        var pcss =
          "#modals_modalInput::placeholder { color: " +
          args.TCOLOR +
          "; opacity: 0.5; }";
        var styleElement = document.createElement("style");
        styleElement.appendChild(document.createTextNode(pcss));
        document.head.appendChild(styleElement);

        //Create Close Button
        var close = document.createElement("button");
        close.innerHTML = "X";
        close.addEventListener("click", function () {
          util.startHats("modals_modalClose");
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
        submit.addEventListener("click", function () {
          util.startHats("modals_modalClose");
          const input = document.getElementById("modals_modalInput");
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
        util.startHats("modals_modalOpen");
      }
    }
  }
  Scratch.extensions.register(new Modals());
})(Scratch);
