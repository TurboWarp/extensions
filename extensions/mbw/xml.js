// Name: XML
// ID: mbwxml
// Description: Create and extract values from XML.
// By: mybearworld <https://scratch.mit.edu/users/mybearworld/>
// License: MIT

/* generated l10n code */Scratch.translate.setup({"nb":{"_add child [CHILD] to [XML]":"legg til barnet [CHILD] til [XML]","_attribute [ATTR] of [XML]":"attributt [ATTR] av [XML]","_attributes of [XML]":"attributter av [XML]","_child #[NO] of [XML]":"barn #[NO] av [XML]","_children amount of [XML]":"antall barn av [XML]","_does [XML] have attribute [ATTR]?":"Har [XML] attributt [ATTR]?","_does [XML] have children?":"Har [XML] barn?","_error message of [MAYBE_XML]":"feilmelding av [MAYBE_XML]","_is [MAYBE_XML] valid XML?":"er [MAYBE_XML] gyldig XML?","_query [QUERY] on [XML]":"spørr [QUERY] på [XML]","_query [QUERY] on [XML] matches?":"spørsmål [QUERY] på [XML] matcher?","_query all [QUERY] on [XML]":"spørr alle [QUERY] på [XML]","_remove attribute [ATTR] of [XML]":"fjern attributtet [ATTR] av [XML]","_remove child #[NO] of [XML]":"fjern barn #[NO] av [XML]","_replace child #[NO] of [XML] with [CHILD]":"erstatt barn #[NO] av [XML] med [CHILD]","_set attribute [ATTR] of [XML] to [VALUE]":"sett attributt [ATTR] av [XML] til [VALUE]","_tag name of [XML]":"tag navn av [XML]","_text of [XML]":"tekst av [XML]","_set text of [XML] to [VALUE]":"sett tekst av [XML] til [VALUE]"},"nl":{"_add child [CHILD] to [XML]":"voeg onderliggende [CHILD] toe aan [XML]","_attribute [ATTR] of [XML]":"attribuut [ATTR] van [XML]","_attributes of [XML]":"attributen van [XML]","_child #[NO] of [XML]":"onderliggende #[NO] van [XML]","_children amount of [XML]":"aantal onderliggenden van [XML]","_does [XML] have attribute [ATTR]?":"[XML] bevat attribuut [ATTR]?","_does [XML] have children?":"[XML] bevat onderliggenden?","_error message of [MAYBE_XML]":"foutmelding van [MAYBE_XML]","_is [MAYBE_XML] valid XML?":"is [MAYBE_XML] geldige XML?","_query [QUERY] on [XML]":"query [QUERY] op [XML]","_query [QUERY] on [XML] matches?":"query [QUERY] op [XML] komt overeen?","_query all [QUERY] on [XML]":"query alle [QUERY] op [XML]","_remove attribute [ATTR] of [XML]":"verwijder attribuut [ATTR] van [XML]","_remove child #[NO] of [XML]":"verwijder onderliggende #[NO] van [XML]","_replace child #[NO] of [XML] with [CHILD]":"vervang onderliggende #[NO] van [XML] door [CHILD]","_set attribute [ATTR] of [XML] to [VALUE]":"stel attribuut [ATTR] van [XML] in op [VALUE]","_tag name of [XML]":"tagnaam van [XML]","_text of [XML]":"tekst van [XML]","_set text of [XML] to [VALUE]":"stel tekst van [XML] in op [VALUE]"},"ru":{"_add child [CHILD] to [XML]":"добавить ребёнка [CHILD] файлу [XML]","_attribute [ATTR] of [XML]":"атрибут [ATTR] файла [XML]","_attributes of [XML]":"атрибуты [XML]","_child #[NO] of [XML]":"#[NO] ребёнок файла [XML]","_children amount of [XML]":"количество детей файла [XML]","_does [XML] have attribute [ATTR]?":"[XML] имеет атрибут [ATTR]?","_does [XML] have children?":"[XML] имеет ребёнка?","_error message of [MAYBE_XML]":"ошибка сообщения [MAYBE_XML]","_is [MAYBE_XML] valid XML?":"[MAYBE_XML] правильный XML файл?","_query [QUERY] on [XML]":"запрос [QUERY] на [XML]","_query [QUERY] on [XML] matches?":"запрос [QUERY] на [XML] совпадает?","_query all [QUERY] on [XML]":"запрос всех [QUERY] на [XML]","_remove attribute [ATTR] of [XML]":"удалить атрибут [ATTR] файла [XML]","_remove child #[NO] of [XML]":"удалить #[NO] ребёнка файла [XML]","_replace child #[NO] of [XML] with [CHILD]":"заменить ребёнка  под номером #[NO] файла [XML] на [CHILD]","_set attribute [ATTR] of [XML] to [VALUE]":"установить атрибут [ATTR] XML файла [XML] в [VALUE]","_tag name of [XML]":"имя тега [XML]","_text of [XML]":"текст [XML]","_set text of [XML] to [VALUE]":"установить текст XML файла [XML] в [VALUE]"},"zh-cn":{"_add child [CHILD] to [XML]":"[XML]添加子元素[CHILD]","_attribute [ATTR] of [XML]":"[XML]中属性[ATTR]的值","_attributes of [XML]":"[XML]的所有属性","_child #[NO] of [XML]":"[XML]第[NO]个子元素","_children amount of [XML]":"[XML]的子元素数量","_does [XML] have attribute [ATTR]?":"[XML]有属性[ATTR]吗？","_does [XML] have children?":"[XML]有子元素吗？","_error message of [MAYBE_XML]":"[MAYBE_XML]的错误信息","_is [MAYBE_XML] valid XML?":"[MAYBE_XML]是合法 XML？","_query [QUERY] on [XML]":"[XML]中第一个匹配[QUERY]的元素","_query [QUERY] on [XML] matches?":"[XML]能匹配[QUERY]吗？","_query all [QUERY] on [XML]":"[XML]中所有匹配[QUERY]的元素","_remove attribute [ATTR] of [XML]":"删除[XML]的属性[ATTR]","_remove child #[NO] of [XML]":"删除[XML]第[NO]个子元素","_replace child #[NO] of [XML] with [CHILD]":"将[XML]第[NO]子元素替换为[CHILD]","_set attribute [ATTR] of [XML] to [VALUE]":"设置[XML]的属性[ATTR]为[VALUE]","_tag name of [XML]":"[XML]的标签名称","_text of [XML]":"[XML]的文本","_set text of [XML] to [VALUE]":"将[XML]的文本设置为[VALUE]"}});/* end generated l10n code */(function (Scratch) {
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
      if (error) {
        console.error(error.textContent);
        return { xml: null, error: error.textContent };
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
          // For translations:
          //  - Block text should be translated
          //  - Default XML and attributes should NOT be translated because we can't expect translators
          //    to know how to write valid XML in their language.
          {
            opcode: "isValid",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [MAYBE_XML] valid XML?"),
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
            text: Scratch.translate("error message of [MAYBE_XML]"),
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
            text: Scratch.translate("tag name of [XML]"),
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
            text: Scratch.translate("text of [XML]"),
            arguments: {
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "<hello>world</hello>",
              },
            },
          },
          {
            opcode: "setTextContent",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("set text of [XML] to [VALUE]"),
            arguments: {
              XML: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "<hello>world</hello>",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "world!",
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
                defaultValue: '<hello apple="banana" />',
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
            text: Scratch.translate("set attribute [ATTR] of [XML] to [VALUE]"),
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
            text: Scratch.translate("attribute [ATTR] of [XML]"),
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
            text: Scratch.translate("remove attribute [ATTR] of [XML]"),
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
            text: Scratch.translate("query [QUERY] on [XML] matches?"),
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
     * @param {unknown} args.VALUE
     */
    setTextContent({ XML, VALUE }) {
      const { xml } = this.stringToXml(Scratch.Cast.toString(XML));
      if (xml === null) {
        return "";
      }
	  xml.textContent = VALUE;
      return this.xmlToString(xml);
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
      return this.getAttribute({ XML, ATTR }) !== "";
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
