(function (Scratch) {
  "use strict";
  class codegioExtension {
    getInfo() {
      return {
        id: "utilitiesCodegio",
        name: "Utilities",
        color1: "#0fbd8c",

        blocks: [
          {
            opcode: "newline",
            blockType: Scratch.BlockType.REPORTER,
            text: "New Line",
          },

          {
            opcode: "strict_equality",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Strict Equality | [one]=[two]",
            arguments: {
              one: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              two: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },

          {
            opcode: "returntrue",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "true",
          },

          {
            opcode: "returnfalse",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "false",
          },

          {
            opcode: "exponent",
            blockType: Scratch.BlockType.REPORTER,
            text: "[one] ^ [two]",
            arguments: {
              one: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              two: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },

          {
            opcode: "color",
            blockType: Scratch.BlockType.REPORTER,
            text: "Hex [color]",
            arguments: {
              color: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#96ccff",
              },
            },
          },

          {
            opcode: "monitor_width",
            blockType: Scratch.BlockType.REPORTER,
            text: "Screen | Width",
          },

          {
            opcode: "monitor_height",
            blockType: Scratch.BlockType.REPORTER,
            text: "Screen | Height",
          },

          {
            opcode: "window_width",
            blockType: Scratch.BlockType.REPORTER,
            text: "Window | Width",
          },

          {
            opcode: "window_height",
            blockType: Scratch.BlockType.REPORTER,
            text: "Window | Height",
          },

          {
            opcode: "alert_ext",
            blockType: Scratch.BlockType.COMMAND,
            text: "Alert | Text: [one]",
            arguments: {
              one: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Alert...",
              },
            },
          },

          {
            opcode: "confirm_ext",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Confirm | Text: [one]",
            arguments: {
              one: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Confirm...",
              },
            },
          },

          {
            opcode: "prompt_ext",
            blockType: Scratch.BlockType.REPORTER,
            text: "Prompt | Text: [one] Default: [two]",
            arguments: {
              one: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Enter Username:",
              },
              two: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "griffpatch",
              },
            },
          },

          {
            opcode: "open_link",
            blockType: Scratch.BlockType.COMMAND,
            text: "Open | Link: [one]",
            arguments: {
              one: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://turbowarp.org/",
              },
            },
          },

          {
            opcode: "redirect",
            blockType: Scratch.BlockType.COMMAND,
            text: "Redirect | Link: [one]",
            arguments: {
              one: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://turbowarp.org/",
              },
            },
          },

          {
            opcode: "get_current_url",
            blockType: Scratch.BlockType.REPORTER,
            text: "Current URL",
          },

          {
            opcode: "get_current_url_hash",
            blockType: Scratch.BlockType.REPORTER,
            text: "Current URL hash (#)",
          },

          {
            opcode: "set_clipboard",
            blockType: Scratch.BlockType.COMMAND,
            text: "Set clipboard | Text: [one]",
            arguments: {
              one: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },

          {
            opcode: "get_clipboard",
            blockType: Scratch.BlockType.REPORTER,
            text: "Clipboard",
          },

          {
            opcode: "get_browser",
            blockType: Scratch.BlockType.REPORTER,
            text: "Browser",
          },

          {
            opcode: "get_os",
            blockType: Scratch.BlockType.REPORTER,
            text: "Operating System",
          },

          {
            opcode: "consoleLog",
            blockType: Scratch.BlockType.COMMAND,
            text: "Console | Log: [input] Font: [font] Size [size] Color [color]",
            arguments: {
              input: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello World!",
              },
              font: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Monospace",
                menu: "consoleFonts",
              },
              size: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "8",
              },
              color: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#000000",
              },
            },
          },

          {
            opcode: "consoleClear",
            blockType: Scratch.BlockType.COMMAND,
            text: "Console | Clear",
          },
        ],
        menus: {
          consoleFonts: {
            acceptReporters: true,
            items: [
              { text: "Serif (default)", value: "serif" },
              { text: "Monospace", value: "monospace" },
              { text: "Sans-serif", value: "sans-serif" },
            ],
          },
        },
      };
    }

    newline() {
      return "\n";
    }

    returntrue() {
      return true;
    }

    returnfalse() {
      return false;
    }

    strict_equality(args) {
      return args.one == args.two;
    }

    exponent(args) {
      return args.one ** args.two;
    }

    color(args) {
      return args.color;
    }

    monitor_width() {
      return screen.width;
    }

    monitor_height() {
      return screen.height;
    }

    window_width() {
      return window.innerWidth;
    }

    window_height() {
      return window.innerHeight;
    }

    alert_ext(args) {
      alert(args.one);
    }

    confirm_ext(args) {
      if (confirm(args.one)) {
        return true;
      } else {
        return false;
      }
    }

    prompt_ext(args) {
      let userInput = prompt(args.one, args.two);
      if (userInput == null || userInput == "") {
        return "";
      } else {
        return userInput;
      }
    }

    open_link(args) {
      Scratch.openWindow(args.one);
    }

    redirect(args) {
      Scratch.redirect(args.one);
    }

    get_current_url() {
      return window.location.href;
    }

    get_current_url_hash() {
      if (window.location.hash) {
        return window.location.hash.substring(1);
      } else {
        return "";
      }
    }

    set_clipboard(args) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(args.one);
      }
    }

    get_clipboard() {
      if (navigator.clipboard && navigator.clipboard.readText) {
        return Scratch.canReadClipboard().then((allowed) => {
          if (allowed) {
            return navigator.clipboard.readText();
          }
          return "";
        });
      }
      return "";
    }

    get_browser() {
      let userAgent = navigator.userAgent;

      if (userAgent.match(/chrome|chromium|crios/i)) {
        return "Chrome";
      } else if (userAgent.match(/firefox|fxios/i)) {
        return "Firefox";
      } else if (userAgent.match(/safari/i)) {
        return "Safari";
      } else if (userAgent.match(/opr\//i)) {
        return "Opera";
      } else if (userAgent.match(/edg/i)) {
        return "Edge";
      } else {
        return "No browser detection";
      }
    }

    get_os() {
      return window.navigator.platform;
    }

    consoleLog(args) {
      console.log(
        `%c${args.input}`,
        `color:${args.color}; font-family:${args.font}; font-size: ${args.size}px;`
      );
    }

    consoleClear() {
      console.clear();
    }
  }
  Scratch.extensions.register(new codegioExtension());
})(Scratch);
