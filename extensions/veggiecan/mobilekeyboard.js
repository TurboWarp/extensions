// Name: Mobile Keyboard
// ID: mobilekeyboard0419
// Description: Show the keyboard on mobile devices and get the users input without showing any input modal.
// License: MPL-2.0
// By: veggiecan0419

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("The mobile keyboard extension must run unsandboxed");
  }

  const menuicon =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3NC4yMiIgaGVpZ2h0PSI3NC4yMiIgdmlld0JveD0iMCAwIDc0LjIyIDc0LjIyIj48ZyBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0yLjQgMzcuMTFDMi40IDE3Ljk0IDE3Ljk0IDIuNCAzNy4xMSAyLjRzMzQuNzEgMTUuNTQgMzQuNzEgMzQuNzEtMTUuNTQgMzQuNzEtMzQuNzEgMzQuNzFTMi40IDU2LjI4IDIuNCAzNy4xMXoiIGZpbGw9IiM5OTkiIHN0cm9rZT0iIzY2NiIgc3Ryb2tlLXdpZHRoPSIzIi8+PHBhdGggZD0iTTMwLjIwMyA2MS4zMzZhMi4yOCAyLjI4IDAgMCAxLTIuNjM5LTEuODVMMjAuNTA3IDE5LjMzYTIuMjggMi4yOCAwIDAgMSAxLjg1LTIuNjM5bDIxLjY2LTMuODA3YzEuMjQtLjIxOCAyLjQyLjYxIDIuNjM5IDEuODVsNy4wNTcgNDAuMTU2YTIuMjggMi4yOCAwIDAgMS0xLjg1IDIuNjM5em0xOC42MDEtMTEuMjgzYS42Ny42NyAwIDAgMCAuNTQ0LS43NzVsLTUuMjItMjkuNjk1YS42Ny42NyAwIDAgMC0uNzc1LS41NDRsLTE4LjI3NCAzLjIxMmEuNjcuNjcgMCAwIDAtLjU0My43NzZsNS4yMTkgMjkuNjk0YS42Ny42NyAwIDAgMCAuNzc1LjU0NHptLTE3LjQ3MiAyLjE4OWEuNjQ1LjY0NSAwIDAgMS0uNzQ3LS41MjRsLTIuMjI4LTEyLjY3NGEuNjQ1LjY0NSAwIDAgMSAuNTI0LS43NDhsMTYuMzctMi44NzdhLjY0NS42NDUgMCAwIDEgLjc0Ni41MjRsMi4yMjggMTIuNjc0YS42NDUuNjQ1IDAgMCAxLS41MjQuNzQ4eiIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjUiLz48cGF0aCBkPSJNMzAuMjAzIDYxLjMzNmEyLjI4IDIuMjggMCAwIDEtMi42MzktMS44NUwyMC41MDcgMTkuMzNhMi4yOCAyLjI4IDAgMCAxIDEuODUtMi42MzlsMjEuNjYtMy44MDdjMS4yNC0uMjE4IDIuNDIuNjEgMi42MzkgMS44NWw3LjA1NyA0MC4xNTZhMi4yOCAyLjI4IDAgMCAxLTEuODUgMi42Mzl6bTE4LjYwMS0xMS4yODNhLjY3LjY3IDAgMCAwIC41NDQtLjc3NWwtNS4yMi0yOS42OTVhLjY3LjY3IDAgMCAwLS43NzUtLjU0NGwtMTguMjc0IDMuMjEyYS42Ny42NyAwIDAgMC0uNTQzLjc3Nmw1LjIxOSAyOS42OTRhLjY3LjY3IDAgMCAwIC43NzUuNTQ0eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0zMC4yMDMgNjEuMzM2YTIuMjggMi4yOCAwIDAgMS0yLjYzOS0xLjg1TDIwLjUwNyAxOS4zM2EyLjI4IDIuMjggMCAwIDEgMS44NS0yLjYzOWwyMS42Ni0zLjgwN2MxLjI0LS4yMTggMi40Mi42MSAyLjYzOSAxLjg1bDcuMDU3IDQwLjE1NmEyLjI4IDIuMjggMCAwIDEtMS44NSAyLjYzOXptMTguNjAxLTExLjI4M2EuNjcuNjcgMCAwIDAgLjU0NC0uNzc1bC01LjIyLTI5LjY5NWEuNjcuNjcgMCAwIDAtLjc3NS0uNTQ0bC0xOC4yNzQgMy4yMTJhLjY3LjY3IDAgMCAwLS41NDMuNzc2bDUuMjE5IDI5LjY5NGEuNjcuNjcgMCAwIDAgLjc3NS41NDR6bS0xNy40NzIgMi4xODlhLjY0NS42NDUgMCAwIDEtLjc0Ny0uNTI0bC0yLjIyOC0xMi42NzRhLjY0NS42NDUgMCAwIDEgLjUyNC0uNzQ4bDE2LjM3LTIuODc3YS42NDUuNjQ1IDAgMCAxIC43NDYuNTI0bDIuMjI4IDEyLjY3NGEuNjQ1LjY0NSAwIDAgMS0uNTI0Ljc0OHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzguMjE1IDU1Ljg5MWEyLjA4OSAyLjA4OSAwIDEgMSA0LjExNC0uNzIzIDIuMDg5IDIuMDg5IDAgMCAxLTQuMTE0LjcyM20tOC43MzctMzYuNDk5YS42MjUuNjI1IDAgMCAxLS43MjQtLjUwOGwtLjA4LS40NTZhLjYyNS42MjUgMCAwIDEgLjUwOC0uNzI1bDguNzY0LTEuNTRjLjM0LS4wNi42NjQuMTY4LjcyNC41MDhsLjA4LjQ1NmEuNjI1LjYyNSAwIDAgMS0uNTA3LjcyNHoiIGZpbGw9IiNjZmNmY2YiLz48cGF0aCBkPSJNMzEuMzMyIDUyLjI0MmEuNjQ1LjY0NSAwIDAgMS0uNzQ3LS41MjRsLTIuMjI4LTEyLjY3NGEuNjQ1LjY0NSAwIDAgMSAuNTI0LS43NDhsMTYuMzctMi44NzdhLjY0NS42NDUgMCAwIDEgLjc0Ni41MjRsMi4yMjggMTIuNjc0YS42NDUuNjQ1IDAgMCAxLS41MjQuNzQ4eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0zMS41NyA0Ny44NWEuNjcuNjcgMCAwIDEtLjc3NS0uNTQ0bC0xLjI3NC03LjI1MWEuNjcuNjcgMCAwIDEgLjU0My0uNzc2bDE0LjQxLTIuNTMyYS42Ny42NyAwIDAgMSAuNzc0LjU0M2wxLjI3NSA3LjI1MmEuNjcuNjcgMCAwIDEtLjU0NC43NzZ6bTMuNTk5IDIuNTI2YS42Ny42NyAwIDAgMS0uNzc2LS41NDNsLS4yMTEtMS4yMDJhLjY3LjY3IDAgMCAxIC41NDMtLjc3Nmw4LjI5LTEuNDU3YS42Ny42NyAwIDAgMSAuNzc2LjU0NGwuMjExIDEuMjAyYS42Ny42NyAwIDAgMS0uNTQzLjc3NXptLTMuMDU5LjUzOGEuNjcuNjcgMCAwIDEtLjc3Ni0uNTQzbC0uMjExLTEuMjAzYS42Ny42NyAwIDAgMSAuNTQzLS43NzVsMS4wNi0uMTg2YS42Ny42NyAwIDAgMSAuNzc1LjU0M2wuMjExIDEuMjAzYS42Ny42NyAwIDAgMS0uNTQzLjc3NXptMTMuMzE5LTIuMzQxYS42Ny42NyAwIDAgMS0uNzc2LS41NDNsLS4yMTEtMS4yMDNhLjY3LjY3IDAgMCAxIC41NDQtLjc3NWwxLjA2LS4xODZhLjY3LjY3IDAgMCAxIC43NzUuNTQzbC4yMSAxLjIwM2EuNjcuNjcgMCAwIDEtLjU0My43NzV6IiBmaWxsLW9wYWNpdHk9Ii4xNDUiIGZpbGw9IiM2NzY3NjciLz48cGF0aCBkPSJNMCA3NC4yMlYwaDc0LjIydjc0LjIyeiIgZmlsbD0ibm9uZSIvPjwvZz48L3N2Zz4=";
  const blockicon =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MS44MjYiIGhlaWdodD0iNjEuODI2IiB2aWV3Qm94PSIwIDAgNjEuODI2IDYxLjgyNiI+PGcgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMjQuMDA2IDU1LjEzOWEyLjI4IDIuMjggMCAwIDEtMi42MzktMS44NUwxNC4zMSAxMy4xMzNhMi4yOCAyLjI4IDAgMCAxIDEuODUtMi42MzlsMjEuNjYtMy44MDdjMS4yNC0uMjE4IDIuNDIuNjEgMi42MzkgMS44NWw3LjA1NyA0MC4xNTZhMi4yOCAyLjI4IDAgMCAxLTEuODUgMi42Mzl6bTE4LjYwMS0xMS4yODNhLjY3LjY3IDAgMCAwIC41NDQtLjc3NWwtNS4yMi0yOS42OTVhLjY3LjY3IDAgMCAwLS43NzUtLjU0NGwtMTguMjc0IDMuMjEyYS42Ny42NyAwIDAgMC0uNTQzLjc3Nmw1LjIxOSAyOS42OTRhLjY3LjY3IDAgMCAwIC43NzUuNTQ0em0tMTcuNDcyIDIuMTg5YS42NDUuNjQ1IDAgMCAxLS43NDctLjUyNEwyMi4xNiAzMi44NDdhLjY0NS42NDUgMCAwIDEgLjUyNC0uNzQ4bDE2LjM3LTIuODc3YS42NDUuNjQ1IDAgMCAxIC43NDYuNTI0bDIuMjI4IDEyLjY3NGEuNjQ1LjY0NSAwIDAgMS0uNTI0Ljc0OHoiIGZpbGw9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuMjQzIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iNSIvPjxwYXRoIGQ9Ik0yNC4wMDYgNTUuMTM5YTIuMjggMi4yOCAwIDAgMS0yLjYzOS0xLjg1TDE0LjMxIDEzLjEzM2EyLjI4IDIuMjggMCAwIDEgMS44NS0yLjYzOWwyMS42Ni0zLjgwN2MxLjI0LS4yMTggMi40Mi42MSAyLjYzOSAxLjg1bDcuMDU3IDQwLjE1NmEyLjI4IDIuMjggMCAwIDEtMS44NSAyLjYzOXptMTguNjAxLTExLjI4M2EuNjcuNjcgMCAwIDAgLjU0NC0uNzc1bC01LjIyLTI5LjY5NWEuNjcuNjcgMCAwIDAtLjc3NS0uNTQ0bC0xOC4yNzQgMy4yMTJhLjY3LjY3IDAgMCAwLS41NDMuNzc2bDUuMjE5IDI5LjY5NGEuNjcuNjcgMCAwIDAgLjc3NS41NDR6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTI0LjAwNiA1NS4xMzlhMi4yOCAyLjI4IDAgMCAxLTIuNjM5LTEuODVMMTQuMzEgMTMuMTMzYTIuMjggMi4yOCAwIDAgMSAxLjg1LTIuNjM5bDIxLjY2LTMuODA3YzEuMjQtLjIxOCAyLjQyLjYxIDIuNjM5IDEuODVsNy4wNTcgNDAuMTU2YTIuMjggMi4yOCAwIDAgMS0xLjg1IDIuNjM5em0xOC42MDEtMTEuMjgzYS42Ny42NyAwIDAgMCAuNTQ0LS43NzVsLTUuMjItMjkuNjk1YS42Ny42NyAwIDAgMC0uNzc1LS41NDRsLTE4LjI3NCAzLjIxMmEuNjcuNjcgMCAwIDAtLjU0My43NzZsNS4yMTkgMjkuNjk0YS42Ny42NyAwIDAgMCAuNzc1LjU0NHptLTE3LjQ3MiAyLjE4OWEuNjQ1LjY0NSAwIDAgMS0uNzQ3LS41MjRMMjIuMTYgMzIuODQ3YS42NDUuNjQ1IDAgMCAxIC41MjQtLjc0OGwxNi4zNy0yLjg3N2EuNjQ1LjY0NSAwIDAgMSAuNzQ2LjUyNGwyLjIyOCAxMi42NzRhLjY0NS42NDUgMCAwIDEtLjUyNC43NDh6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTMyLjAxOCA0OS42OTRhMi4wODkgMi4wODkgMCAxIDEgNC4xMTQtLjcyMyAyLjA4OSAyLjA4OSAwIDAgMS00LjExNC43MjNtLTguNzM3LTM2LjQ5OWEuNjI1LjYyNSAwIDAgMS0uNzI0LS41MDhsLS4wOC0uNDU2YS42MjUuNjI1IDAgMCAxIC41MDgtLjcyNWw4Ljc2NC0xLjU0Yy4zNC0uMDYuNjY0LjE2OC43MjQuNTA4bC4wOC40NTZhLjYyNS42MjUgMCAwIDEtLjUwNy43MjR6IiBmaWxsPSIjY2ZjZmNmIi8+PHBhdGggZD0iTTI1LjEzNSA0Ni4wNDVhLjY0NS42NDUgMCAwIDEtLjc0Ny0uNTI0TDIyLjE2IDMyLjg0N2EuNjQ1LjY0NSAwIDAgMSAuNTI0LS43NDhsMTYuMzctMi44NzdhLjY0NS42NDUgMCAwIDEgLjc0Ni41MjRsMi4yMjggMTIuNjc0YS42NDUuNjQ1IDAgMCAxLS41MjQuNzQ4eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yNS4zNzMgNDEuNjUzYS42Ny42NyAwIDAgMS0uNzc1LS41NDRsLTEuMjc0LTcuMjUxYS42Ny42NyAwIDAgMSAuNTQzLS43NzZsMTQuNDEtMi41MzJhLjY3LjY3IDAgMCAxIC43NzQuNTQzbDEuMjc1IDcuMjUyYS42Ny42NyAwIDAgMS0uNTQ0Ljc3NnptMy41OTkgMi41MjZhLjY3LjY3IDAgMCAxLS43NzYtLjU0M2wtLjIxMS0xLjIwMmEuNjcuNjcgMCAwIDEgLjU0My0uNzc2bDguMjktMS40NTdhLjY3LjY3IDAgMCAxIC43NzYuNTQ0bC4yMTEgMS4yMDJhLjY3LjY3IDAgMCAxLS41NDMuNzc1em0tMy4wNTkuNTM4YS42Ny42NyAwIDAgMS0uNzc2LS41NDNsLS4yMTEtMS4yMDNhLjY3LjY3IDAgMCAxIC41NDMtLjc3NWwxLjA2LS4xODZhLjY3LjY3IDAgMCAxIC43NzUuNTQzbC4yMTEgMS4yMDNhLjY3LjY3IDAgMCAxLS41NDMuNzc1em0xMy4zMTktMi4zNDFhLjY3LjY3IDAgMCAxLS43NzYtLjU0M2wtLjIxMS0xLjIwM2EuNjcuNjcgMCAwIDEgLjU0NC0uNzc1bDEuMDYtLjE4NmEuNjcuNjcgMCAwIDEgLjc3NS41NDNsLjIxIDEuMjAzYS42Ny42NyAwIDAgMS0uNTQzLjc3NXoiIGZpbGwtb3BhY2l0eT0iLjE0NSIgZmlsbD0iIzY3Njc2NyIvPjxwYXRoIGQ9Ik0wIDYxLjgyNlYwaDYxLjgyNnY2MS44MjZ6IiBmaWxsPSJub25lIi8+PC9nPjwvc3ZnPg==";

  class MobileKeyboard {
    constructor() {
      this.keyboardOpen = false;
      /** @type {Array<() => void>} */
      this.waitCallbacks = [];
      this.defaultValue = "";
      this.typedText = "";
      this.inputElement = null;
    }

    getInfo() {
      return {
        id: "mobilekeyboard0419",
        color1: "#999999",
        color2: "#666666",
        color3: "#333333",
        menuIconURI: menuicon,
        blockIconURI: blockicon,
        name: Scratch.translate("Mobile Keyboard"),
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Currently only works on Android"),
          },
          {
            opcode: "showKeyboardBlock",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("show [TYPE] keyboard"),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "keyboardtypes",
                defaultValue: "alphabetical",
              },
            },
          },
          {
            opcode: "showKeyboardAndWaitBlock",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("show [TYPE] keyboard and wait"),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "keyboardtypes",
                defaultValue: "alphabetical",
              },
            },
          },
          {
            opcode: "typedTextSinceKeyboardOpened",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("typed text"),
          },
          {
            opcode: "isKeyboardOpen",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is keyboard open?"),
          },
          {
            opcode: "setDefaultValue",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set text box's default value to [VALUE]"),
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("You typed: "),
              },
            },
          },
          {
            opcode: "setCurrentValue",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set textbox current value to [TEXT]"),
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Now the text is different"),
              },
            },
          },
          {
            opcode: "getCursorPosition",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("cursor position/start of selection"),
          },
          {
            opcode: "getSelectionEnd",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("end of selection"),
          },
          {
            opcode: "isAnySelected",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is any text selected?"),
          },
          {
            opcode: "setCursorPosition",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set cursor position to [INDEX]"),
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "3",
              },
            },
          },
          {
            opcode: "setSelectedText",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "select text starting at position in text [START] ending at position [END]"
            ),
            arguments: {
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              END: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "3",
              },
            },
          },
          {
            opcode: "closeKeyboardBlock",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("close keyboard"),
          },
        ],
        menus: {
          keyboardtypes: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("alphabetical"),
                value: "text",
              },
              {
                text: Scratch.translate("alphabetical (allows newlines)"),
                value: "textarea",
              },
              {
                text: Scratch.translate("numerical"),
                value: "number",
              },
              {
                text: Scratch.translate("email adress"),
                value: "email",
              },
              {
                text: Scratch.translate("web address"),
                value: "url",
              },
              {
                text: Scratch.translate("search"),
                value: "search",
              },
            ],
          },
        },
      };
    }

    showKeyboard(type) {
      const input = document.createElement(
        type === "textarea" ? "textarea" : "input"
      );
      if (type !== "textarea") {
        /** @type {HTMLInputElement} */ (input).type = type;
      }
      input.style.position = "absolute";
      input.style.top = "0";
      input.style.left = "0";
      input.style.width = "1px";
      input.style.height = "1px";
      input.style.fontSize = "1px";
      input.style.padding = "0px";
      input.style.border = "none";
      input.style.backgroundColor = "#fff";
      input.value = this.defaultValue;

      this.typedText = this.defaultValue;
      this.keyboardOpen = true;
      this.inputElement = input;

      document.body.appendChild(input);
      input.focus();
      input.click();

      const done = () => {
        this.keyboardOpen = false;
        this.inputElement = null;

        if (input.parentNode) {
          input.parentNode.removeChild(input);
        }

        for (const callback of this.waitCallbacks) {
          callback();
        }
        this.waitCallbacks.length = 0;
      };

      input.addEventListener("input", () => {
        this.typedText = input.value;
      });

      if (type !== "textarea") {
        input.addEventListener("keydown", (event) => {
          if (/** @type {KeyboardEvent} */ (event).key === "Enter") {
            input.blur();
          }
        });
      }

      input.addEventListener("blur", () => {
        done();
      });
    }

    showKeyboardBlock(args) {
      this.showKeyboard(args.TYPE);
    }

    showKeyboardAndWaitBlock(args) {
      return new Promise((resolve) => {
        this.waitCallbacks.push(() => resolve());
        this.showKeyboard(args.TYPE);
      });
    }

    typedTextSinceKeyboardOpened() {
      return this.typedText;
    }

    isKeyboardOpen() {
      return this.keyboardOpen;
    }

    setDefaultValue(args) {
      this.defaultValue = Scratch.Cast.toString(args.VALUE);
    }

    setCurrentValue(args) {
      if (this.inputElement) {
        const text = Scratch.Cast.toString(args.TEXT);
        this.inputElement.value = text;
        this.typedText = text;
      }
    }

    getCursorPosition() {
      if (this.inputElement) {
        return this.inputElement.selectionStart;
      }
      return -1;
    }

    getSelectionEnd() {
      if (this.inputElement) {
        return this.inputElement.selectionEnd;
      }
      return -1;
    }

    isAnySelected() {
      if (this.inputElement) {
        return (
          this.inputElement.selectionEnd !== this.inputElement.selectionStart
        );
      }
      return false;
    }

    setCursorPosition(args) {
      if (this.inputElement) {
        this.inputElement.setSelectionRange(args.INDEX, args.INDEX);
      }
    }

    setSelectedText(args) {
      if (this.inputElement) {
        this.inputElement.setSelectionRange(args.START, args.END);
      }
    }

    closeKeyboardBlock() {
      if (this.inputElement) {
        this.inputElement.blur();
      }
    }
  }

  Scratch.extensions.register(new MobileKeyboard());
})(Scratch);
