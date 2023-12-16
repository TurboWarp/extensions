// Name: HTML
// ID: ShowierTWHtml
// Description: Allows for building HTML within scratch.
// By: ShowierData9978 <github.com/showierdata9978>
/* eslint-disable require-await */
/// <reference types="@turbowarp/types" />

/**
 * @typedef {import("@turbowarp/scratch-vm/")}

 */

((Scratch) => {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("HTML Extension must be run unsandboxed");
  }

  /**
   * @type {VM}
   */
  const vm = Scratch.vm;

  class Html {
    constructor() {
      this.stack = [];
      this.html = "";
    }

    /**
     *
     * @returns {Scratch.Info}
     */
    getInfo() {
      return {
        id: "ShowierTWHtml",
        name: "HTML",
        color1: "#FF0000",
        blocks: [
          {
            opcode: "htmlWrap",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: "<[element] [attributes]>",
            arguments: {
              element: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "div",
              },
              attributes: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "htmlCommand",
            blockType: Scratch.BlockType.COMMAND,
            text: "<[element] [attributes]>[text] </>",
            arguments: {
              element: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "div",
              },
              attributes: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "rawInsert",
            blockType: Scratch.BlockType.COMMAND,
            text: "Insert raw [html]",
            arguments: {
              html: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "noInner",
            blockType: Scratch.BlockType.COMMAND,
            text: "<[element] [attributes] />",
            arguments: {
              element: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "div",
              },
              attributes: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },

          "---",
          {
            opcode: "exit",
            blockType: Scratch.BlockType.COMMAND,
            text: "</>",
          },
          {
            opcode: "html_ret",
            blockType: Scratch.BlockType.REPORTER,
            text: "html",
          },
          {
            opcode: "clear",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset html",
          },
        ],
      };
    }

    /**
     * @typedef arg_wrap
     *  @prop {string} element
     *  @prop {string} attributes
     * @param {arg_wrap} args
     */
    async htmlWrap({ element, attributes }) {
      this._appendHtml(`<${element} ${attributes}>`);
      this.stack.push(element);
      return true;
    }

    /**
     * @param {arg_wrap} args
     */
    async noInner({ element, attributes }) {
      this._appendHtml(`<${element} ${attributes} />`);
      return true;
    }
    /**
     * @typedef arg_command
     *  @prop {string} element
     *  @prop {string} attributes
     *  @prop {string} text
     * @param {arg_command} args
     */
    async htmlCommand({ element, attributes, text }) {
      this._appendHtml(`<${element} ${attributes}>${text}</${element}>`);
      return true;
    }

    /**
     * @param {string} text
     */
    _appendHtml(text) {
      let whitespace = " ".repeat(
        this.stack.length ? this.stack.length - 1 : 0
      );
      this.html += whitespace + text + "\n";
    }

    exit() {
      /* @type {string} */
      const element = this.stack.pop();
      if (!element) {
        throw "Error: No element to close";
      }
      this._appendHtml(`</${element}>`);
    }

    rawInsert({ html }) {
      this._appendHtml(html);
    }

    html_ret() {
      return this.html;
    }

    clear() {
      this.html = "";
    }
  }

  Scratch.extensions.register(new Html());
  // @ts-ignore
})(Scratch);
