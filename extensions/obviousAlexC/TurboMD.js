// Name: Turbo XML
// ID: obviousAlexCTurbowarpMarkdown
// Description: A XML, HTML, and SVG parser for turbowarp!
// By: ObviousAlexC <https://scratch.mit.edu/users/pinksheep2917/>
(function (Scratch) {
    "use strict";
    const parser = new DOMParser();
    let parseType = "text/html";
  
    const getParsedMD = (MD) => {
      if (parseType != "text/html") {
        if (MD.includes("?xml")) {
          return [parser.parseFromString(MD, parseType), false];
        }
        return [
          parser.parseFromString(
            '<?xml version="1.0" encoding="utf-8"?><NOLOCK>' + MD + "</NOLOCK>",
            parseType
          ),
          true,
        ];
      } else {
        return [parser.parseFromString(MD, parseType), false];
      }
    };
  
    class extension {
      getInfo() {
        return {
          blocks: [
            {
              blockType: Scratch.BlockType.LABEL,
              text: "Tags",
            },
            {
              disableMonitor: true,
              opcode: "setTagFromHTML",
              blockType: Scratch.BlockType.REPORTER,
              text: "set tag [id] of type [tagName] to [value] from [MD]",
              arguments: {
                id: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                tagName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Color",
                },
                value: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "White",
                },
                MD: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "<Color>#FFFFFF</Color>",
                },
              },
            },
            {
              disableMonitor: true,
              opcode: "getTagFromHTML",
              blockType: Scratch.BlockType.REPORTER,
              text: "tag [id] of type [tagName] from [MD]",
              arguments: {
                id: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                tagName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Color",
                },
                MD: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "<Color>#FFFFFF</Color>",
                },
              },
            },
            {
              disableMonitor: true,
              opcode: "numberOfElementsOfTypeHTML",
              blockType: Scratch.BlockType.REPORTER,
              text: "# of elements of type [tagName] from [MD]",
              arguments: {
                tagName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Color",
                },
                MD: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "<Color>#FFFFFF</Color>",
                },
              },
            },
            {
              blockType: Scratch.BlockType.LABEL,
              text: "Attributes",
            },
            {
              disableMonitor: true,
              opcode: "setAttributeFromHTML",
              blockType: Scratch.BlockType.REPORTER,
              text: "set [attribute] of element [id] of type [tagName] to [setter] from [MD]",
              arguments: {
                attribute: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "name",
                },
                id: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                tagName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Color",
                },
                setter: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "green",
                },
                MD: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '<Color name="blue">#00FF00</Color>',
                },
              },
            },
            {
                disableMonitor: true,
                opcode: "removeAttributeFromHTML",
                blockType: Scratch.BlockType.REPORTER,
                text: "remove [attribute] of element [id] of type [tagName] from [MD]",
                arguments: {
                  attribute: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "name",
                  },
                  id: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                  tagName: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "Color",
                  },
                  MD: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: '<Color name="blue">#00FF00</Color>',
                  },
                },
              },
            {
                disableMonitor: true,
                opcode: "hasAttribute",
                blockType: Scratch.BlockType.REPORTER,
                text: "[attribute] exists in element [id] of type [tagName] from [MD]",
                arguments: {
                  attribute: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "name",
                  },
                  id: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                  tagName: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: "Color",
                  },
                  MD: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: '<Color name="green">#00FF00</Color>',
                  },
                },
            },
            {
              disableMonitor: true,
              opcode: "getAttributeFromHTML",
              blockType: Scratch.BlockType.REPORTER,
              text: "[attribute] of element [id] of type [tagName] from [MD]",
              arguments: {
                attribute: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "name",
                },
                id: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                tagName: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Color",
                },
                MD: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '<Color name="green">#00FF00</Color>',
                },
              },
            },
            {
              blockType: Scratch.BlockType.LABEL,
              text: "Settings",
            },
            {
              disableMonitor: true,
              opcode: "setParseMode",
              blockType: Scratch.BlockType.COMMAND,
              text: "Set parse mode to [mode]",
              arguments: {
                mode: { type: Scratch.ArgumentType.STRING, menu: "DocTypes" },
              },
            },
          ],
          menus: {
            DocTypes: {
              items: [
                { text: "HTML", value: "text/html" },
                { text: "XML", value: "text/xml" },
                { text: "SVG", value: "image/svg+xml" },
              ],
              acceptReporters: false,
            },
          },
          name: "Turbo XML",
          //For people who where already using the extension!
          id: "obviousAlexCTurbowarpMarkdown",
          menuIconURI:
            "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2Ni4yMTI2MSIgaGVpZ2h0PSI2Ni4yMTI2MSIgdmlld0JveD0iMCwwLDY2LjIxMjYxLDY2LjIxMjYxIj4NCiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA2Ljg5MzY5LC0xNDYuODkzNjkpIj4NCiAgICAgICAgPGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPg0KICAgICAgICAgICAgPHBhdGggZD0iTTIwNi44OTM3LDE4MGMwLC0xOC4yODQxMSAxNC44MjIyLC0zMy4xMDYzIDMzLjEwNjMsLTMzLjEwNjNjMTguMjg0MTEsMCAzMy4xMDYzMSwxNC44MjIyIDMzLjEwNjMxLDMzLjEwNjNjMCwxOC4yODQxMSAtMTQuODIyMiwzMy4xMDYzIC0zMy4xMDYzMSwzMy4xMDYzYy0xOC4yODQxMSwwIC0zMy4xMDYzLC0xNC44MjIyIC0zMy4xMDYzLC0zMy4xMDYzeiIgZmlsbD0iIzU5YmM3NyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiAvPg0KICAgICAgICAgICAgPGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+DQogICAgICAgICAgICAgICAgPHBhdGggZD0iTTIyMS45ODUzMSwxNTcuODEyMzdoMjguMjQ0NjUiIC8+DQogICAgICAgICAgICAgICAgPHBhdGggZD0iTTIzNi4xMDc2NCwxOTEuNjEyNDl2LTMzLjEyMzI4IiAvPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgPHBhdGggZD0iTTI0Mi40NDUyMiwxOTcuODIyNTVsNC4zNjUwOCw0LjM2NTA5di0zMS4zMjU4OWg2LjgzOTMxdjMxLjMyNTg5bDQuMzY1MDgsLTQuMzY1MDkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+DQogICAgICAgIDwvZz4NCiAgICA8L2c+DQo8L3N2Zz4NCjwhLS1yb3RhdGlvbkNlbnRlcjozMy4xMDYzMDQ5OTk5OTk5OTozMy4xMDYzMDQ5OTk5OTk5OS0tPg==",
          color1: "#59BC77",
          color2: "#47AB6A",
          color3: "#359258",
        };
      }
      setTagFromHTML({ id, tagName, value, MD }) {
        //Fix XML errors
        let retVALUE = getParsedMD(MD);
        let currentMarkDown = retVALUE[0];
  
        let element = retVALUE[1]
          ? currentMarkDown
              .getElementsByTagName("NOLOCK")[0]
              .getElementsByTagName(tagName)
          : currentMarkDown.getElementsByTagName(tagName);
        if (element) {
          element = element[id - 1];
          if (element) {
            element.innerHTML = value;
            if (!currentMarkDown.body) {
              return "";
            }
            return currentMarkDown.body.innerHTML || "";
          }
        }
        return "";
      }
      getTagFromHTML({ id, tagName, MD }) {
        let retVALUE = getParsedMD(MD);
        let currentMarkDown = retVALUE[0];
  
        let element = retVALUE[1]
          ? currentMarkDown
              .getElementsByTagName("NOLOCK")[0]
              .getElementsByTagName(tagName)
          : currentMarkDown.getElementsByTagName(tagName);
        if (element) {
          element = element[id - 1];
          if (element) {
            return element.innerHTML || "";
          }
        }
        return "";
      }
      numberOfElementsOfTypeHTML({ tagName, MD }) {
        let retVALUE = getParsedMD(MD);
        let currentMarkDown = retVALUE[0];
  
        let element = retVALUE[1]
          ? currentMarkDown
              .getElementsByTagName("NOLOCK")[0]
              .getElementsByTagName(tagName)
          : currentMarkDown.getElementsByTagName(tagName);
        if (element) {
          return element.length;
        }
        return 0;
      }
      setAttributeFromHTML({ attribute, id, tagName, setter, MD }) {
        let retVALUE = getParsedMD(MD);
        let currentMarkDown = retVALUE[0];
  
        let element = retVALUE[1]
          ? currentMarkDown
              .getElementsByTagName("NOLOCK")[0]
              .getElementsByTagName(tagName)
          : currentMarkDown.getElementsByTagName(tagName);
        if (element) {
          element = element[id - 1];
          if (element) {
            element.setAttribute(attribute, setter);
            return currentMarkDown.body.innerHTML;
          }
        }
        return "";
      }
      getAttributeFromHTML({ attribute, id, tagName, MD }) {
        let retVALUE = getParsedMD(MD);
        let currentMarkDown = retVALUE[0];
  
        let element = retVALUE[1]
          ? currentMarkDown
              .getElementsByTagName("NOLOCK")[0]
              .getElementsByTagName(tagName)
          : currentMarkDown.getElementsByTagName(tagName);
        if (element) {
          element = element[id - 1];
          if (element) {
            return element.getAttribute(attribute) || "";
          }
        }
        return "";
      }
      hasAttribute({ attribute, id, tagName, MD }) {
        let retVALUE = getParsedMD(MD);
        let currentMarkDown = retVALUE[0];
  
        let element = retVALUE[1]
          ? currentMarkDown
              .getElementsByTagName("NOLOCK")[0]
              .getElementsByTagName(tagName)
          : currentMarkDown.getElementsByTagName(tagName);
        if (element) {
          element = element[id - 1];
          if (element) {
            return element.hasAttribute(attribute) || false;
          }
        }
        return false;
      }
      removeAttributeFromHTML({ attribute, id, tagName, MD }) {
        let retVALUE = getParsedMD(MD);
        let currentMarkDown = retVALUE[0];
  
        let element = retVALUE[1]
          ? currentMarkDown
              .getElementsByTagName("NOLOCK")[0]
              .getElementsByTagName(tagName)
          : currentMarkDown.getElementsByTagName(tagName);
        if (element) {
          element = element[id - 1];
          if (element) {
            element.removeAttribute(attribute);
            return currentMarkDown.body.innerHTML;
          }
        }
        return "";
      }
      setParseMode({ mode }) {
        parseType = mode;
      }
      runtime = Scratch.vm.runtime;
    }
    Scratch.extensions.register(new extension());
  })(Scratch);
  
