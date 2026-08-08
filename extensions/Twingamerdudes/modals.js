// Name: Modals
// ID: twinGamerModals
// Description: Adds support for HTML modals.
// By: Twingamerdudes <https://scratch.mit.edu/users/twingamerdudesreal/>
// License: MPL-2.0
(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Modals must run unsandboxed");
  }

  let buttonPressed = "";
  let isModalOpen = false;

  const createBasicModel = (color, textColor) => {
    var modal = document.createElement("dialog");
    modal.style.width = "300px";
    modal.style.padding = "20px 30px";
    modal.style.textAlign = "center";
    modal.style.background = color;
    modal.style.color = textColor;
    modal.style.overflow = "hidden";

    /* 
      No eventListeners created because createModalWithInput is handled through promises that resolve when the modal is closed, 
      while normally creating a modal does not use promises (doesn't need to wait for input aside from basic buttons)
    */
    var close = document.createElement("button");
    close.innerHTML = "X";

    //Close buttons CSS
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
    close.style.color = "#ffffff";

    modal.appendChild(close);

    return { modal: modal, closeButton: close };
  };

  class Modals {
    getInfo() {
      return {
        id: "twinGamerModals",
        name: Scratch.translate("Modals"),
        color1: "#a01c1c",
        color2: "#861515",
        color3: "#6d1212",
        blocks: [
          {
            opcode: "showModal",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "show modal [TEXT] with the background [COLOR] and text color [TCOLOR]"
            ),
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
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "show input modal [TEXT] with the background [COLOR] secondary color [SCOLOR], text color [TCOLOR], and placeholder [PLACEHOLDER]"
            ),
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
            text: Scratch.translate("close current modal"),
          },
          {
            opcode: "addTextToModal",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("add [TEXT] to the current modal"),
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
            text: Scratch.translate(
              "add button [NAME] with the background color of [SCOLOR] and the text color of [TCOLOR] to the current modal"
            ),
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
            text: Scratch.translate("change default modal text to [TEXT]"),
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
            text: Scratch.translate("change modal background color to [COLOR]"),
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
            text: Scratch.translate("change modal text color to [COLOR]"),
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ffffff",
              },
            },
          },
          {
            opcode: "waitUntilModalClosed",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("wait until current modal is closed"),
          },
          {
            opcode: "IsModalOpen",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is modal open?"),
          },
          {
            opcode: "modalOpen",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when a modal is opened"),
            isEdgeActivated: false,
          },
          {
            opcode: "modalClose",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when a modal is closed"),
            isEdgeActivated: false,
          },
          {
            blockType: Scratch.BlockType.EVENT,
            opcode: "whenButtonPressed",
            text: Scratch.translate("when modal [BUTTON] is clicked"),
            isEdgeActivated: false,
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

    waitUntilModalClosed(args, util) {
      if (isModalOpen) {
        util.yield();
      }
    }

    whenButtonPressed(args) {
      if (Scratch.Cast.compare(buttonPressed, args.BUTTON) == 0) {
        buttonPressed = "";
        return true;
      }
      return false;
    }

    addTextToModal(args) {
      if (isModalOpen) {
        const text = args.TEXT;

        const modal = document.querySelector("dialog");
        const textNode = document.createTextNode(text);
        const breakNode = document.createElement("br");

        modal.appendChild(textNode);
        modal.appendChild(breakNode);
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
        const text = document.getElementById("twinGamerModals_modalText");
        text.textContent = defaultModalText;
      }
    }

    addModalButton(args, util) {
      if (isModalOpen) {
        //Initilization
        const buttonName = args.NAME;
        const modal = document.querySelector("dialog");
        const button = document.createElement("button");

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
          util.startHats("twinGamerModals_whenButtonPressed");
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

    showModal(args, util) {
      //Create Modal
      if (!isModalOpen) {
        const modalInformation = createBasicModel(args.COLOR, args.TCOLOR);

        const modal = modalInformation.modal;
        const close = modalInformation.closeButton;

        const text = document.createElement("p");
        text.id = "twinGamerModals_modalText";
        text.textContent = args.TEXT;

        modal.appendChild(text);

        //Create Close Button
        close.addEventListener("click", function () {
          util.startHats("twinGamerModals_modalClose");

          isModalOpen = false;
          modal.close();
          modal.remove();
        });

        document.body.appendChild(modal);

        modal.showModal();
        isModalOpen = true;

        util.startHats("twinGamerModals_modalOpen");
      }
    }

    showModalWithInput(args, util) {
      return new Promise((resolve, reject) => {
        if (!isModalOpen) {
          //Create Modal
          const modalInformation = createBasicModel(args.COLOR, args.TCOLOR);

          const modal = modalInformation.modal;
          const close = modalInformation.closeButton;

          const text = document.createElement("p");
          text.id = "twinGamerModals_modalText";
          text.textContent = args.TEXT;

          modal.appendChild(text);

          //Create Close Button
          close.addEventListener("click", function () {
            util.startHats("twinGamerModals_modalClose");
            isModalOpen = false;
            modal.close();
            modal.remove();

            return resolve("");
          });

          //Create input
          var input = document.createElement("input");
          input.placeholder = args.PLACEHOLDER;

          //Input's CSS
          input.type = "text";
          input.id = "twinGamerModals_modalInput";
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

          //Preview text placeholder's color
          var pcss =
            "#twinGamerModals_modalInput::placeholder { color: " +
            args.TCOLOR +
            "; opacity: 0.5; }";
          var styleElement = document.createElement("style");
          styleElement.appendChild(document.createTextNode(pcss));
          document.head.appendChild(styleElement);

          //Create Submit Button
          var submit = document.createElement("button");
          submit.innerHTML = "Submit";
          submit.addEventListener("click", function () {
            util.startHats("twinGamerModals_modalClose");
            const input = document.getElementById("twinGamerModals_modalInput");
            isModalOpen = false;

            // @ts-ignore
            let modalInput = input.value;

            modal.close();
            modal.remove();

            return resolve(modalInput);
          });

          //Submit button CSS
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
          modal.appendChild(input);
          modal.appendChild(submit);

          document.body.appendChild(modal);

          modal.showModal();
          isModalOpen = true;

          util.startHats("twinGamerModals_modalOpen");
        } else {
          return reject("NaN");
        }
      });
    }
  }
  Scratch.extensions.register(new Modals());
})(Scratch);
