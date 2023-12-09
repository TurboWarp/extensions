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
        name: Scratch.translate("XML"),
        color1: "#6c2b5f",
        blocks: [
          {
            opcode: "isValid",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [MAYBE_XML] valid XML?"),
            arguments: {
              MAYBE_XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate({
                  default: '<hello apple="banana" />',
                  description: "This should be valid XML",
                }),
              },
            },
          },
          {
            opcode: "errorMessage",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("error message of [MAYBE_XML]"),
            arguments: {
              MAYBE_XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate({
                  default: '<hello apple="banana">',
                  description:
                    "This should be valid XML, *except* for the missing closing tag.",
                }),
              },
            },
          },
          "---",
          {
            opcode: "tagName",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("tag name of [XML]"),
            arguments: {
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate({
                  default: '<hello apple="banana" />',
                  description: "This should be valid XML",
                }),
              },
            },
          },
          {
            opcode: "textContent",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("text of [XML]"),
            arguments: {
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate({
                  default: "<hello>world</hello>",
                  description: "This should be valid XML",
                }),
              },
            },
          },
          "---",
          {
            opcode: "attributes",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("attributes of [XML]"),
            arguments: {
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate({
                  default: '<hello apple="banana" />',
                  description: "This should be valid XML",
                }),
              },
            },
          },
          {
            opcode: "hasAttribute",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("does [XML] have attribute [ATTR]?"),
            arguments: {
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate({
                  default: '<hello apple="banana" />',
                  description: "This should be valid XML",
                }),
              },
              ATTR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate({
                  default: "foo",
                  description: "This should be a valid XML attribute",
                }),
              },
            },
          },
          {
            opcode: "setAttribute",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("set attribute [ATTR] of [XML] to [VALUE]"),
            arguments: {
              ATTR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate({
                  default: "apple",
                  description:
                    'This should use the same attribute name as in `<hello apple="banana" />',
                }),
              },
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate({
                  default: '<hello apple="banana" />',
                  description: "This should be valid XML",
                }),
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate({
                  default: "foo",
                  description: "This should be a valid XML attribute",
                }),
              },
            },
          },
          {
            opcode: "getAttribute",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("attribute [ATTR] of [XML]"),
            arguments: {
              ATTR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate({
                  default: "apple",
                  description:
                    'This should use the same attribute name as in `<hello apple="banana" />',
                }),
              },
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate({
                  default: '<hello apple="banana" />',
                  description: "This should be valid XML",
                }),
              },
            },
          },
          {
            opcode: "removeAttribute",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("remove attribute [ATTR] of [XML]"),
            arguments: {
              ATTR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate({
                  default: "apple",
                  description:
                    'This should use the same attribute name as in `<hello apple="banana" />',
                }),
              },
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate({
                  default: '<hello apple="banana" />',
                  description: "This should be valid XML",
                }),
              },
            },
          },
          "---",
          {
            opcode: "hasChildren",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("does [XML] have children?"),
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
            text: Scratch.translate("children amount of [XML]"),
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
            text: Scratch.translate("add child [CHILD] to [XML]"),
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
            text: Scratch.translate(
              "replace child #[NO] of [XML] with [CHILD]"
            ),
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
            text: Scratch.translate("child #[NO] of [XML]"),
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
            text: Scratch.translate("remove child #[NO] of [XML]"),
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
            text: Scratch.translate("query [QUERY] on [XML] successful?"),
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
            text: Scratch.translate("query [QUERY] on [XML]"),
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
            text: Scratch.translate("query all [QUERY] on [XML]"),
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
     * @param {unknown} args.MAYBE_XML
     */
    isValid({ MAYBE_XML }) {
      const { xml } = this.stringToXml(Scratch.Cast.toString(MAYBE_XML));
      return xml !== null;
    }

    /**
     * @param {object} args
     * @param {unknown} args.MAYBE_XML
     */
    errorMessage({ MAYBE_XML }) {
      const { xml, error } = this.stringToXml(Scratch.Cast.toString(MAYBE_XML));
      return xml === null ? error : "";
    }

    /**
     * @param {object} args
     * @param {unknown} args.XML
     */
    tagName({ XML }) {
      const { xml } = this.stringToXml(Scratch.Cast.toString(XML));
      if (xml === null) {
        return "";
      }
      return xml.tagName;
    }

    /**
     * @param {object} args
     * @param {unknown} args.XML
     */
    textContent({ XML }) {
      const { xml } = this.stringToXml(Scratch.Cast.toString(XML));
      if (xml === null) {
        return "";
      }
      return xml.textContent;
    }

    /**
     * @param {object} args
     * @param {unknown} args.XML
     */
    attributes({ XML }) {
      const { xml } = this.stringToXml(Scratch.Cast.toString(XML));
      if (xml === null) {
        return "";
      }
      return JSON.stringify([...xml.attributes].map((attr) => attr.name));
    }

    /**
     * @param {object} args
     * @param {unknown} args.XML
     * @param {unknown} args.ATTR
     */
    hasAttribute({ XML, ATTR }) {
      return this.getAttribute({ XML, ATTR }) === "";
    }

    /**
     * @param {object} args
     * @param {unknown} args.ATTR
     * @param {unknown} args.XML
     * @param {unknown} args.VALUE
     */
    setAttribute({ ATTR, XML, VALUE }) {
      const { xml } = this.stringToXml(Scratch.Cast.toString(XML));
      if (xml === null) {
        return "";
      }
      xml.setAttribute(
        Scratch.Cast.toString(ATTR),
        Scratch.Cast.toString(VALUE)
      );
      return this.xmlToString(xml);
    }

    /**
     * @param {object} args
     * @param {unknown} args.ATTR
     * @param {unknown} args.XML
     */
    getAttribute({ ATTR, XML }) {
      const { xml } = this.stringToXml(Scratch.Cast.toString(XML));
      if (xml === null) {
        return "";
      }
      return xml.getAttribute(Scratch.Cast.toString(ATTR)) ?? "";
    }

    /**
     * @param {object} args
     * @param {unknown} args.ATTR
     * @param {unknown} args.XML
     */
    removeAttribute({ ATTR, XML }) {
      const { xml } = this.stringToXml(Scratch.Cast.toString(XML));
      if (xml === null) {
        return "";
      }
      xml.removeAttribute(Scratch.Cast.toString(ATTR));
      return this.xmlToString(xml);
    }

    /**
     * @param {object} args
     * @param {unknown} args.XML
     */
    hasChildren({ XML }) {
      return this.childrenAmount({ XML }) !== 0;
    }

    /**
     * @param {object} args
     * @param {unknown} args.XML
     */
    childrenAmount({ XML }) {
      const { xml } = this.stringToXml(Scratch.Cast.toString(XML));
      if (xml === null) {
        return 0;
      }
      return xml.childElementCount;
    }

    /**
     * @param {object} args
     * @param {unknown} args.CHILD
     * @param {unknown} args.XML
     */
    addChild({ CHILD, XML }) {
      const { xml } = this.stringToXml(Scratch.Cast.toString(XML));
      if (xml === null) {
        return "";
      }
      const { xml: childXML } = this.stringToXml(Scratch.Cast.toString(CHILD));
      if (childXML === null) {
        return this.xmlToString(xml);
      }
      xml.append(childXML);
      return this.xmlToString(xml);
    }

    /**
     * @param {object} args
     * @param {unknown} args.NO
     * @param {unknown} args.XML
     * @param {unknown} args.CHILD
     */
    replaceChild({ NO, XML, CHILD }) {
      const { xml } = this.stringToXml(Scratch.Cast.toString(XML));
      if (xml === null) {
        return "";
      }
      const { xml: childXML } = this.stringToXml(Scratch.Cast.toString(CHILD));
      if (childXML === null) {
        return this.xmlToString(xml);
      }
      const originalChild =
        xml.children[Math.floor(Scratch.Cast.toNumber(NO)) - 1];
      if (originalChild === undefined) {
        return this.xmlToString(xml);
      }
      xml.replaceChild(childXML, originalChild);
      return this.xmlToString(xml);
    }

    /**
     * @param {object} args
     * @param {unknown} args.NO
     * @param {unknown} args.XML
     */
    getChild({ NO, XML }) {
      const { xml } = this.stringToXml(Scratch.Cast.toString(XML));
      if (xml === null) {
        return "";
      }
      const child = xml.children[Math.floor(Scratch.Cast.toNumber(NO)) - 1];
      if (child === undefined) {
        return "";
      }
      return this.xmlToString(child);
    }

    /**
     * @param {object} args
     * @param {unknown} args.NO
     * @param {unknown} args.XML
     */
    removeChild({ NO, XML }) {
      const { xml } = this.stringToXml(Scratch.Cast.toString(XML));
      if (xml === null) {
        return "";
      }
      const child = xml.children[Math.floor(Scratch.Cast.toNumber(NO)) - 1];
      if (child === undefined) {
        return this.xmlToString(xml);
      }
      xml.removeChild(child);
      return this.xmlToString(xml);
    }

    /**
     * @param {object} args
     * @param {unknown} args.QUERY
     * @param {unknown} args.XML
     */
    querySuccessful({ QUERY, XML }) {
      const { xml } = this.stringToXml(Scratch.Cast.toString(XML));
      if (xml === null) {
        return "";
      }
      const child = xml.querySelector(Scratch.Cast.toString(QUERY));
      return child !== null;
    }

    /**
     * @param {object} args
     * @param {unknown} args.QUERY
     * @param {unknown} args.XML
     */
    querySelector({ QUERY, XML }) {
      const { xml } = this.stringToXml(Scratch.Cast.toString(XML));
      if (xml === null) {
        return "";
      }
      const child = xml.querySelector(Scratch.Cast.toString(QUERY));
      if (child === null) {
        return "";
      }
      return this.xmlToString(child);
    }
    /**
     * @param {object} args
     * @param {unknown} args.QUERY
     * @param {unknown} args.XML
     */
    querySelectorAll({ QUERY, XML }) {
      const { xml } = this.stringToXml(Scratch.Cast.toString(XML));
      if (xml === null) {
        return "";
      }
      const child = xml.querySelectorAll(Scratch.Cast.toString(QUERY));
      if (child.length === 0) {
        return "";
      }
      return JSON.stringify([...child].map(this.xmlToString));
    }
  }

  Scratch.extensions.register(new XML());
})(Scratch);
