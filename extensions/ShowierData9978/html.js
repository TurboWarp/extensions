// Name: HTWL
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
      /**
       * @typedef {Object.<string, Array.<string>>} stack
       * @typedef {Object.<string, string>} html
       */

      /** @type {stack} */
      this.stack = {};
      /** @type {html} */
      this.html = {};
    }

    /**
     *
     * @returns {Scratch.Info}
     */
    getInfo() {
      return {
        id: "HTWL",
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

    sanitise(text) {
      return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    /**
     * @param {import("scratch-vm").BlockUtility} util
     *
     */
    pushStack(element, util) {
      if (!this.stack[util.target.id]) this.stack[util.target.id] = [];

      this.stack[util.target.id].push(element);
    }

    /**
     * @param {import("scratch-vm").BlockUtility} util
     * @returns {string}
     */

    popStack(util) {
      if (!this.stack[util.target.id]) {
        this.stack[util.target.id] = [];
        return;
      }

      return this.stack[util.target.id].pop();
    }

    /**
     * @param {import("scratch-vm").BlockUtility} util
     */
    getStack(util) {
      if (!this.stack[util.target.id]) {
        this.stack[util.target.id] = [];
      }

      return this.stack[util.target.id];
    }

    /**
     * @typedef arg_wrap
     *  @prop {string} element
     *  @prop {string} attributes
     * @param {arg_wrap} args
     * @param {import("scratch-vm").BlockUtility} util
     */
    async htmlWrap({ element, attributes }, util) {
      this._appendHtml(
        `<${this.sanitise(element)} ${this.sanitise(attributes)}>`,
        util
      );
      this.pushStack(element, util);
      return true;
    }

    /**
     * @param {arg_wrap} args
     * @param {import("scratch-vm").BlockUtility} util
     */
    async noInner({ element, attributes }, util) {
      this._appendHtml(
        `<${this.sanitise(element)} ${this.sanitise(attributes)} />`,
        util
      );
      return true;
    }

    /**
     * @typedef arg_command
     *  @prop {string} element
     *  @prop {string} attributes
     *  @prop {string} text
     * @param {arg_command} args
     * @param {import("scratch-vm").BlockUtility} util
     */
    async htmlCommand({ element, attributes, text }, util) {
      element = this.sanitise(element);
      attributes = this.sanitise(attributes);

      this._appendHtml(`<${element} ${attributes}>${text}</${element}>`, util);
      return true;
    }

    /**
     * @param {string} text
     * @param {import("scratch-vm").BlockUtility} util
     */
    _appendHtml(text, util) {
      let whitespace = " ".repeat(
        this.stack.length ? this.getStack(util).length - 1 : 0
      );
      if (this.html[util.target.id] === undefined) {
        this.html[util.target.id] = "";
      }
      this.html[util.target.id] += whitespace + text + "\n";
    }

    /**
     * @param {import("scratch-vm").BlockUtility} util
     */
    exit(args, util) {
      /* @type {string} */
      const element = this.popStack(util);
      if (!element) {
        throw "Error: No element to close";
      }
      this._appendHtml(`</${this.sanitise(element)}>`, util);
    }

    rawInsert({ html }, util) {
      this._appendHtml(html, util);
    }

    /**
     * @param {import("scratch-vm").BlockUtility} util
     * @returns {string}
     */
    html_ret(args, util) {
      return this.html[util.target.id];
    }

    /**
     * @param {import("scratch-vm").BlockUtility} util
     */
    clear(args, util) {
      this.html[util.target.id] = "";
    }
  }

  Scratch.extensions.register(new Html());
  // @ts-ignore
})(Scratch);
