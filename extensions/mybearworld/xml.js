// Name: XML
// ID: mbwxml
// Description: Create and extract values from XML.
// By: mybearworld <https://scratch.mit.edu/users/mybearworld/>

(function (Scratch) {
  "use strict";

  class XML {
    constructor() {
      this.domParser = new DOMParser();
    }
    /**
     * @param {string} string
     * @returns {{xml: null; error: string} | {xml: HTMLElement; error: null}}
     */
    stringToXml(string) {
      const doc = this.domParser.parseFromString(string, "application/xml");
      const error = doc.querySelector("parsererror");
      console.log(error);
      if (error) {
        return { xml: null, error: error.querySelector("div").textContent };
      }
      return { xml: doc.documentElement, error: null };
    }
    /** @param {Element} element */
    xmlToString(element) {
      return element.outerHTML;
    }

    /** @returns {Scratch.Info} */
    getInfo() {
      return {
        id: "mbwxml",
        name: "XML",
        color1: "#6c2b5f",
        blocks: [
          {
            opcode: "isValid",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [MAYBE_XML] valid XML?",
            arguments: {
              MAYBE_XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '<hello apple="banana" />',
              },
            },
          },
          {
            opcode: "errorMessage",
            blockType: Scratch.BlockType.REPORTER,
            text: "error message of [MAYBE_XML]",
            arguments: {
              MAYBE_XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '<hello apple="banana">',
              },
            },
          },
          "---",
          {
            opcode: "tagName",
            blockType: Scratch.BlockType.REPORTER,
            text: "tag name of [XML]",
            arguments: {
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '<hello apple="banana" />',
              },
            },
          },
          {
            opcode: "textContent",
            blockType: Scratch.BlockType.REPORTER,
            text: "text of [XML]",
            arguments: {
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "<hello>world</hello>",
              },
            },
          },
          "---",
          {
            opcode: "attributes",
            blockType: Scratch.BlockType.REPORTER,
            text: "attributes of [XML]",
            arguments: {
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '<hello apple="banana" />',
              },
            },
          },
          {
            opcode: "hasAttribute",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "does [XML] have attribute [ATTR]?",
            arguments: {
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '<hello apple="banana" />',
              },
              ATTR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "foo",
              },
            },
          },
          {
            opcode: "setAttribute",
            blockType: Scratch.BlockType.REPORTER,
            text: "set attribute [ATTR] of [XML] to [VALUE]",
            arguments: {
              ATTR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '<hello apple="banana" />',
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "foo",
              },
            },
          },
          {
            opcode: "getAttribute",
            blockType: Scratch.BlockType.REPORTER,
            text: "attribute [ATTR] of [XML]",
            arguments: {
              ATTR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '<hello apple="banana" />',
              },
            },
          },
          {
            opcode: "removeAttribute",
            blockType: Scratch.BlockType.REPORTER,
            text: "remove attribute [ATTR] of [XML]",
            arguments: {
              ATTR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '<hello apple="banana" />',
              },
            },
          },
          "---",
          {
            opcode: "hasChildren",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "does [XML] have children?",
            arguments: {
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "<a><b /><c /></a>",
              },
            },
          },
          {
            opcode: "childrenAmount",
            blockType: Scratch.BlockType.REPORTER,
            text: "children amount of [XML]",
            arguments: {
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "<a><b /><c /></a>",
              },
            },
          },
          {
            opcode: "addChild",
            blockType: Scratch.BlockType.REPORTER,
            text: "add child [CHILD] to [XML]",
            arguments: {
              CHILD: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "<d />",
              },
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "<a><b /><c /></a>",
              },
            },
          },
          {
            opcode: "replaceChild",
            blockType: Scratch.BlockType.REPORTER,
            text: "replace child #[NO] of [XML] with [CHILD]",
            arguments: {
              NO: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "2",
              },
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "<a><b /><c /></a>",
              },
              CHILD: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "<d />",
              },
            },
          },
          {
            opcode: "getChild",
            blockType: Scratch.BlockType.REPORTER,
            text: "child #[NO] of [XML]",
            arguments: {
              NO: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "2",
              },
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "<a><b /><c /></a>",
              },
            },
          },
          {
            opcode: "removeChild",
            blockType: Scratch.BlockType.REPORTER,
            text: "remove child #[NO] of [XML]",
            arguments: {
              NO: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "2",
              },
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "<a><b /><c /></a>",
              },
            },
          },
          "---",
          {
            opcode: "querySuccessful",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "query [QUERY] on [XML] successful?",
            arguments: {
              QUERY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ".foo",
              },
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '<a><b /><c class="foo" /></a>',
              },
            },
          },
          {
            opcode: "querySelector",
            blockType: Scratch.BlockType.REPORTER,
            text: "query [QUERY] on [XML]",
            arguments: {
              QUERY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ".foo",
              },
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '<a><b /><c class="foo" /></a>',
              },
            },
          },
          {
            opcode: "querySelectorAll",
            blockType: Scratch.BlockType.REPORTER,
            text: "query all [QUERY] on [XML]",
            arguments: {
              QUERY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ".foo",
              },
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '<a><b class="foo"/><c class="foo" /></a>',
              },
            },
          },
        ],
      };
    }

    /**
     * @param {object} args
     * @param {string} args.MAYBE_XML
     */
    isValid({ MAYBE_XML }) {
      const { xml } = this.stringToXml(MAYBE_XML);
      return xml !== null;
    }

    /**
     * @param {object} args
     * @param {string} args.MAYBE_XML
     */
    errorMessage({ MAYBE_XML }) {
      const { xml, error } = this.stringToXml(MAYBE_XML);
      return xml === null ? error : "";
    }

    /**
     * @param {object} args
     * @param {string} args.XML
     */
    tagName({ XML }) {
      const { xml } = this.stringToXml(XML);
      if (xml === null) {
        return "";
      }
      return xml.tagName;
    }

    /**
     * @param {object} args
     * @param {string} args.XML
     */
    textContent({ XML }) {
      const { xml } = this.stringToXml(XML);
      if (xml === null) {
        return "";
      }
      return xml.textContent;
    }

    /**
     * @param {object} args
     * @param {string} args.XML
     */
    attributes({ XML }) {
      const { xml } = this.stringToXml(XML);
      if (xml === null) {
        return "";
      }
      return JSON.stringify([...xml.attributes].map((attr) => attr.name));
    }

    /**
     * @param {object} args
     * @param {string} args.XML
     * @param {string} args.ATTR
     */
    hasAttribute({ XML, ATTR }) {
      return this.getAttribute({ XML, ATTR }) === "";
    }

    /**
     * @param {object} args
     * @param {string} args.ATTR
     * @param {string} args.XML
     * @param {string} args.VALUE
     */
    setAttribute({ ATTR, XML, VALUE }) {
      const { xml } = this.stringToXml(XML);
      if (xml === null) {
        return "";
      }
      xml.setAttribute(ATTR, VALUE);
      return this.xmlToString(xml);
    }

    /**
     * @param {object} args
     * @param {string} args.ATTR
     * @param {string} args.XML
     */
    getAttribute({ ATTR, XML }) {
      const { xml } = this.stringToXml(XML);
      if (xml === null) {
        return "";
      }
      return xml.getAttribute(ATTR) ?? "";
    }

    /**
     * @param {object} args
     * @param {string} args.ATTR
     * @param {string} args.XML
     */
    removeAttribute({ ATTR, XML }) {
      const { xml } = this.stringToXml(XML);
      if (xml === null) {
        return "";
      }
      xml.removeAttribute(ATTR);
      return this.xmlToString(xml);
    }

    /**
     * @param {object} args
     * @param {string} args.XML
     */
    hasChildren({ XML }) {
      return this.childrenAmount({ XML }) !== 0;
    }

    /**
     * @param {object} args
     * @param {string} args.XML
     */
    childrenAmount({ XML }) {
      const { xml } = this.stringToXml(XML);
      if (xml === null) {
        return 0;
      }
      return xml.childElementCount;
    }

    /**
     * @param {object} args
     * @param {string} args.CHILD
     * @param {string} args.XML
     */
    addChild({ CHILD, XML }) {
      const { xml } = this.stringToXml(XML);
      if (xml === null) {
        return "";
      }
      const { xml: childXML } = this.stringToXml(CHILD);
      if (childXML === null) {
        return this.xmlToString(xml);
      }
      xml.append(childXML);
      return this.xmlToString(xml);
    }

    /**
     * @param {object} args
     * @param {string} args.NO
     * @param {string} args.XML
     * @param {string} args.CHILD
     */
    replaceChild({ NO, XML, CHILD }) {
      const { xml } = this.stringToXml(XML);
      if (xml === null) {
        return "";
      }
      const { xml: childXML } = this.stringToXml(CHILD);
      if (childXML === null) {
        return this.xmlToString(xml);
      }
      const originalChild = xml.children[parseInt(NO) - 1];
      if (originalChild === null) {
        return this.xmlToString(xml);
      }
      xml.replaceChild(childXML, originalChild);
      return this.xmlToString(xml);
    }

    /**
     * @param {object} args
     * @param {string} args.NO
     * @param {string} args.XML
     */
    getChild({ NO, XML }) {
      const { xml } = this.stringToXml(XML);
      if (xml === null) {
        return "";
      }
      const child = xml.children[parseInt(NO) - 1];
      if (child === null) {
        return "";
      }
      return this.xmlToString(child);
    }

    /**
     * @param {object} args
     * @param {string} args.NO
     * @param {string} args.XML
     */
    removeChild({ NO, XML }) {
      const { xml } = this.stringToXml(XML);
      if (xml === null) {
        return "";
      }
      const child = xml.children[parseInt(NO) - 1];
      if (child === null) {
        return this.xmlToString(xml);
      }
      xml.removeChild(child);
      return this.xmlToString(xml);
    }

    /**
     * @param {object} args
     * @param {string} args.QUERY
     * @param {string} args.XML
     */
    querySuccessful({ QUERY, XML }) {
      const { xml } = this.stringToXml(XML);
      if (xml === null) {
        return "";
      }
      const child = xml.querySelector(QUERY);
      return child !== null;
    }

    /**
     * @param {object} args
     * @param {string} args.QUERY
     * @param {string} args.XML
     */
    querySelector({ QUERY, XML }) {
      const { xml } = this.stringToXml(XML);
      if (xml === null) {
        return "";
      }
      const child = xml.querySelector(QUERY);
      if (child === null) {
        return "";
      }
      return this.xmlToString(child);
    }
    /**
     * @param {object} args
     * @param {string} args.QUERY
     * @param {string} args.XML
     */
    querySelectorAll({ QUERY, XML }) {
      const { xml } = this.stringToXml(XML);
      if (xml === null) {
        return "";
      }
      const child = xml.querySelectorAll(QUERY);
      if (child.length === 0) {
        return "";
      }
      return JSON.stringify([...child].map(this.xmlToString));
    }
  }

  Scratch.extensions.register(new XML());
})(Scratch);
