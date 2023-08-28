// Name: Lily's Toolbox
// ID: lmsutilsblocks
// Description: Previously called LMS Utilities.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>

(function (Scratch) {
  "use strict";
  const menuIconURI =
    "data:image/png;base64,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";

  let hideLegacyBlocks = true;

  var vars = {};
  vars["variables"] = Object.create(null);

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This extension must run unsandboxed");
  }

  class LMSUtils {
    constructor(runtime) {
      this.runtime = runtime;
    }
    getInfo() {
      return {
        id: "lmsutilsblocks",
        name: "Lily's Toolbox",
        color1: "#3bb2ed",
        color2: "#37a1de",
        color3: "#3693d9",
        menuIconURI: menuIconURI,
        blocks: [
          {
            opcode: "whenBooleanHat",
            blockType: Scratch.BlockType.HAT,
            text: "when [INPUT] is true",
            isEdgeActivated: true,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "whenKeyString",
            blockType: Scratch.BlockType.HAT,
            text: "when key [KEY_OPTION] pressed",
            isEdgeActivated: true,
            arguments: {
              KEY_OPTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "enter",
              },
            },
          },

          "---",

          {
            opcode: "keyStringPressed",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "key [KEY_OPTION] pressed?",
            arguments: {
              KEY_OPTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "enter",
              },
            },
          },
          {
            opcode: "trueFalseBoolean",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[TRUEFALSE]",
            arguments: {
              TRUEFALSE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "true",
                menu: "trueFalseMenu",
              },
            },
          },
          {
            opcode: "stringIf",
            blockType: Scratch.BlockType.REPORTER,
            text: "if [BOOLEAN] then [INPUTA]",
            disableMonitor: true,
            arguments: {
              BOOLEAN: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: "",
              },
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
            },
          },
          {
            opcode: "stringIfElse",
            blockType: Scratch.BlockType.REPORTER,
            text: "if [BOOLEAN] then [INPUTA] else [INPUTB]",
            disableMonitor: true,
            arguments: {
              BOOLEAN: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: "",
              },
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "banana",
              },
            },
          },

          "---",

          {
            opcode: "getEffectValue",
            blockType: Scratch.BlockType.REPORTER,
            text: "effect [INPUT]",
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "color",
                menu: "colorMenu",
              },
            },
          },
          {
            opcode: "clonesBeingUsed",
            blockType: Scratch.BlockType.REPORTER,
            text: "clone count",
          },
          {
            opcode: "isClone",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is clone?",
            filter: [Scratch.TargetType.SPRITE],
            disableMonitor: true,
          },
          {
            opcode: "spriteClicked",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "sprite clicked?",
            filter: [Scratch.TargetType.SPRITE],
            disableMonitor: true,
          },

          "---",

          {
            opcode: "lettersToOf",
            blockType: Scratch.BlockType.REPORTER,
            text: "letters [INPUTA] to [INPUTB] of [STRING]",
            disableMonitor: true,
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
              },
              INPUTB: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "3",
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "suspicious",
              },
            },
          },
          {
            opcode: "replaceWords",
            blockType: Scratch.BlockType.REPORTER,
            text: "replace first [INPUTA] with [INPUTB] in [STRING]",
            disableMonitor: true,
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Scratch",
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Turbowarp",
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Scratch is brilliant!",
              },
            },
          },
          {
            opcode: "findIndexOfString",
            blockType: Scratch.BlockType.REPORTER,
            text: "index of [INPUTA] in [INPUTB]",
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "brilliant",
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Turbowarp is brilliant!",
              },
            },
          },
          {
            opcode: "itemOfFromString",
            blockType: Scratch.BlockType.REPORTER,
            text: "item [INPUTA] of [INPUTB] split by [INPUTC]",
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "2",
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple|banana",
              },
              INPUTC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "|",
              },
            },
          },
          {
            opcode: "stringToUpperCase",
            blockType: Scratch.BlockType.REPORTER,
            text: "[STRING] to uppercase",
            disableMonitor: true,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
            },
          },
          {
            opcode: "stringToLowerCase",
            blockType: Scratch.BlockType.REPORTER,
            text: "[STRING] to lowercase",
            disableMonitor: true,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "APPLE",
              },
            },
          },
          {
            opcode: "reverseString",
            blockType: Scratch.BlockType.REPORTER,
            text: "reverse [STRING]",
            disableMonitor: true,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "prawobrut",
              },
            },
          },

          "---",

          {
            opcode: "norBoolean",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[INPUTA] nor [INPUTB]",
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: "",
              },
              INPUTB: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "xorBoolean",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[INPUTA] xor [INPUTB]",
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: "",
              },
              INPUTB: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "xnorBoolean",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[INPUTA] xnor [INPUTB]",
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: "",
              },
              INPUTB: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "nandBoolean",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[INPUTA] nand [INPUTB]",
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: "",
              },
              INPUTB: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: "",
              },
            },
          },

          "---",

          {
            opcode: "stringReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: "[STRING]",
            disableMonitor: true,
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
            },
          },
          {
            opcode: "colourHex",
            blockType: Scratch.BlockType.REPORTER,
            text: "color [COLOUR]",
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              COLOUR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#0088ff",
              },
            },
          },
          {
            opcode: "angleReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: "angle [ANGLE]",
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              ANGLE: {
                type: Scratch.ArgumentType.ANGLE,
                defaultValue: "90",
              },
            },
          },
          {
            opcode: "matrixReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: "matrix [MATRIX]",
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              MATRIX: {
                type: Scratch.ArgumentType.MATRIX,
                defaultValue: "0101001010000001000101110",
              },
            },
          },
          {
            opcode: "noteReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: "note [NOTE]",
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              NOTE: {
                type: Scratch.ArgumentType.NOTE,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "newlineCharacter",
            blockType: Scratch.BlockType.REPORTER,
            text: "newline character",
            hideFromPalette: hideLegacyBlocks,
            disableMonitor: true,
          },

          "---",

          {
            opcode: "equalsExactly",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[ONE] === [TWO]",
            arguments: {
              ONE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              TWO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "banana",
              },
            },
          },
          {
            opcode: "notEqualTo",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[INPUTA] ≠ [INPUTB]",
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "banana",
              },
            },
          },
          {
            opcode: "moreThanEqual",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[INPUTA] ≥ [INPUTB]",
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "16",
              },
              INPUTB: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "25",
              },
            },
          },
          {
            opcode: "lessThanEqual",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[INPUTA] ≤ [INPUTB]",
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "16",
              },
              INPUTB: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "25",
              },
            },
          },
          {
            opcode: "stringCheckBoolean",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[INPUT] is [DROPDOWN]",
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              DROPDOWN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "text",
                menu: "stringCheckMenu",
              },
            },
          },

          "---",

          {
            opcode: "encodeToBlock",
            blockType: Scratch.BlockType.REPORTER,
            text: "encode [STRING] to [DROPDOWN]",
            disableMonitor: true,
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              DROPDOWN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "base64",
                menu: "conversionMenu",
              },
            },
          },
          {
            opcode: "decodeFromBlock",
            blockType: Scratch.BlockType.REPORTER,
            text: "decode [STRING] from [DROPDOWN]",
            disableMonitor: true,
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
              DROPDOWN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "base64",
                menu: "conversionMenu",
              },
            },
          },

          "---",

          {
            opcode: "negativeReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: "- [INPUT]",
            disableMonitor: true,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "exponentBlock",
            blockType: Scratch.BlockType.REPORTER,
            text: "[INPUTA] ^ [INPUTB]",
            disableMonitor: true,
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              INPUTB: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "rootBlock",
            blockType: Scratch.BlockType.REPORTER,
            text: "[INPUTA] √ [INPUTB]",
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              INPUTB: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "normaliseValue",
            blockType: Scratch.BlockType.REPORTER,
            text: "normalise [INPUT]",
            disableMonitor: true,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
            },
          },
          {
            opcode: "clampNumber",
            blockType: Scratch.BlockType.REPORTER,
            text: "clamp [INPUTA] between [INPUTB] and [INPUTC]",
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
              INPUTB: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "25",
              },
              INPUTC: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "50",
              },
            },
          },

          "---",

          {
            opcode: "setVariableTo",
            blockType: Scratch.BlockType.COMMAND,
            text: "set variable [INPUTA] to [INPUTB]",
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "changeVariableBy",
            blockType: Scratch.BlockType.COMMAND,
            text: "change variable [INPUTA] by [INPUTB]",
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
            },
          },
          {
            opcode: "getVariable",
            blockType: Scratch.BlockType.REPORTER,
            text: "variable [INPUT]",
            disableMonitor: true,
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
            },
          },
          {
            opcode: "deleteVariable",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete variable [INPUT]",
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
            },
          },
          {
            opcode: "deleteAllVariables",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete all variables",
            hideFromPalette: hideLegacyBlocks,
          },
          {
            opcode: "listVariables",
            blockType: Scratch.BlockType.REPORTER,
            text: "list active variables",
            disableMonitor: true,
            hideFromPalette: hideLegacyBlocks,
          },

          "---",

          {
            opcode: "greenFlag",
            blockType: Scratch.BlockType.COMMAND,
            text: "green flag",
            hideFromPalette: hideLegacyBlocks,
          },
          {
            opcode: "setUsername",
            blockType: Scratch.BlockType.COMMAND,
            text: "set username to [INPUT]",
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "LilyMakesThings",
              },
            },
          },

          "---",

          {
            opcode: "setSpriteSVG",
            blockType: Scratch.BlockType.COMMAND,
            text: "replace SVG data for costume [INPUTA] with [INPUTB]",
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },

          "---",

          {
            opcode: "alertBlock",
            blockType: Scratch.BlockType.COMMAND,
            text: "alert [STRING]",
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "A red spy is in the base!",
              },
            },
          },
          {
            opcode: "inputPromptBlock",
            blockType: Scratch.BlockType.REPORTER,
            text: "prompt [STRING]",
            hideFromPalette: hideLegacyBlocks,
            disableMonitor: true,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "The code is 1, 1, 1.. err... 1!",
              },
            },
          },
          {
            opcode: "confirmationBlock",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "confirm [STRING]",
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Are you the red spy?",
              },
            },
          },

          "---",

          {
            opcode: "goToLink",
            blockType: Scratch.BlockType.COMMAND,
            text: "open link [INPUT] in new tab",
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "redirectToLink",
            blockType: Scratch.BlockType.COMMAND,
            text: "redirect to link [INPUT]",
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },

          "---",

          {
            opcode: "setClipboard",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [STRING] to clipboard",
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
            },
          },
          {
            opcode: "readClipboard",
            blockType: Scratch.BlockType.REPORTER,
            text: "clipboard",
            hideFromPalette: hideLegacyBlocks,
          },

          "---",

          {
            opcode: "isUserMobile",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is mobile?",
          },
          {
            opcode: "screenReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: "screen [DROPDOWN]",
            disableMonitor: true,
            arguments: {
              DROPDOWN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "width",
                menu: "screenReporterMenu",
              },
            },
          },
          {
            opcode: "windowReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: "window [DROPDOWN]",
            disableMonitor: true,
            arguments: {
              DROPDOWN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "width",
                menu: "screenReporterMenu",
              },
            },
          },
          {
            opcode: "osBrowserDetails",
            blockType: Scratch.BlockType.REPORTER,
            text: "get [DROPDOWN] of user",
            disableMonitor: true,
            arguments: {
              DROPDOWN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "operating system",
                menu: "osBrowserMenu",
              },
            },
          },
          {
            opcode: "projectURL",
            blockType: Scratch.BlockType.REPORTER,
            text: "project URL",
            disableMonitor: true,
          },

          "---",

          {
            opcode: "consoleLog",
            blockType: Scratch.BlockType.COMMAND,
            text: "console [DROPDOWN] [INPUT]",
            disableMonitor: true,
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              DROPDOWN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "log",
                menu: "consoleLogMenu",
              },
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Apple",
              },
            },
          },
          {
            opcode: "clearConsole",
            blockType: Scratch.BlockType.COMMAND,
            text: "clear console",
            hideFromPalette: hideLegacyBlocks,
          },

          "---",

          {
            opcode: "commentHat",
            blockType: Scratch.BlockType.HAT,
            text: "// [STRING]",
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment",
              },
            },
          },
          {
            opcode: "commentCommand",
            blockType: Scratch.BlockType.COMMAND,
            text: "// [STRING]",
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment",
              },
            },
          },
          {
            opcode: "commentString",
            blockType: Scratch.BlockType.REPORTER,
            text: "// [INPUTA] [INPUTB]",
            disableMonitor: true,
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment",
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "input",
              },
            },
          },
          {
            opcode: "commentBool",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "// [INPUTA] [INPUTB]",
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment",
              },
              INPUTB: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },

          "---",

          {
            func: "showLegacyBlocks",
            blockType: Scratch.BlockType.BUTTON,
            text: "Show Legacy Blocks",
            hideFromPalette: !hideLegacyBlocks,
          },
          {
            func: "hideLegacyBlocks",
            blockType: Scratch.BlockType.BUTTON,
            text: "Hide Legacy Blocks",
            hideFromPalette: hideLegacyBlocks,
          },
        ],
        menus: {
          conversionMenu: {
            acceptReporters: true,
            items: ["base64", "binary"],
          },
          trueFalseMenu: {
            acceptReporters: true,
            items: ["true", "false", "random"],
          },
          screenReporterMenu: {
            acceptReporters: true,
            items: ["width", "height"],
          },
          windowReporterMenu: {
            acceptReporters: true,
            items: ["width", "height"],
          },
          stringCheckMenu: {
            acceptReporters: true,
            items: ["text", "number", "uppercase", "lowercase"],
          },
          osBrowserMenu: {
            acceptReporters: true,
            items: ["operating system", "browser"],
          },
          consoleLogMenu: {
            acceptReporters: false,
            items: ["log", "error", "warn"],
          },
          colorMenu: {
            acceptReporters: true,
            items: [
              "color",
              "fisheye",
              "whirl",
              "pixelate",
              "mosaic",
              "brightness",
              "ghost",
            ],
          },
        },
      };
    }

    showLegacyBlocks() {
      if (
        confirm(
          "Are you sure you want to show legacy blocks? \n \n These blocks were removed because they were buggy or implemented better in other extensions."
        )
      ) {
        hideLegacyBlocks = false;
        Scratch.vm.extensionManager.refreshBlocks();
      } else {
        //
      }
    }

    hideLegacyBlocks() {
      hideLegacyBlocks = true;
      Scratch.vm.extensionManager.refreshBlocks();
    }

    whenBooleanHat(args) {
      return args.INPUT;
    }

    whenKeyString(args, util) {
      return util.ioQuery("keyboard", "getKeyIsDown", [args.KEY_OPTION]);
    }

    keyStringPressed(args, util) {
      return util.ioQuery("keyboard", "getKeyIsDown", [args.KEY_OPTION]);
    }

    trueFalseBoolean(args) {
      if (args.TRUEFALSE === "random") return Math.random() > 0.5;
      if (args.TRUEFALSE === "true") return true;
      return false;
    }

    stringIf(args) {
      if (args.BOOLEAN) return args.INPUTA;
      return "";
    }

    stringIfElse(args) {
      if (args.BOOLEAN) return args.INPUTA;
      return args.INPUTB;
    }

    getEffectValue(args, util) {
      return util.target.effects[args.INPUT];
    }

    clonesBeingUsed(args, util) {
      return Scratch.vm.runtime._cloneCounter;
    }

    isClone(args, util) {
      return util.target.isOriginal ? false : true;
    }

    spriteClicked(args, util) {
      return (
        util.ioQuery("mouse", "getIsDown") &&
        util.target.isTouchingObject("_mouse_")
      );
    }

    lettersToOf(args) {
      var string = args.STRING.toString();
      var input1 = args.INPUTA - 1;
      var input2 = args.INPUTB;
      return string.slice(input1, input2);
    }

    replaceWords(args) {
      var input1 = args.INPUTA;
      var input2 = args.INPUTB;
      var string = args.STRING;
      return string.replace(input1, input2);
    }

    findIndexOfString(args) {
      var input1 = args.INPUTA;
      var input2 = args.INPUTB;
      if (input2.includes(input1)) return input2.indexOf(input1) + 1;
      return "";
    }

    itemOfFromString(args, util) {
      var input1 = args.INPUTA - 1;
      var input2 = String(args.INPUTB);
      var input3 = args.INPUTC;
      var output = input2.split(input3)[input1] || "";
      return output;
    }

    stringToUpperCase(args) {
      return args.STRING.toUpperCase();
    }

    stringToLowerCase(args) {
      return args.STRING.toLowerCase();
    }

    reverseString(args) {
      var input = args.STRING;
      var splitInput = input.split("");
      var reversedInput = splitInput.reverse();
      var joinedArray = reversedInput.join("");
      return joinedArray;
    }

    norBoolean(args) {
      return !(args.INPUTA || args.INPUTB);
    }

    xorBoolean(args) {
      return args.INPUTA !== args.INPUTB;
    }

    xnorBoolean(args) {
      return args.INPUTA === args.INPUTB;
    }

    nandBoolean(args) {
      return !(args.INPUTA && args.INPUTB);
    }

    stringReporter(args) {
      return args.STRING;
    }

    colourHex(args) {
      return args.COLOUR;
    }

    angleReporter(args) {
      return args.ANGLE;
    }

    matrixReporter(args) {
      return args.MATRIX;
    }

    noteReporter(args) {
      return args.NOTE;
    }

    newlineCharacter() {
      return "\n";
    }

    equalsExactly(args) {
      return args.ONE === args.TWO;
    }

    notEqualTo(args) {
      return args.INPUTA != args.INPUTB;
    }

    moreThanEqual(args) {
      return args.INPUTA >= args.INPUTB;
    }

    lessThanEqual(args) {
      return args.INPUTA <= args.INPUTB;
    }

    stringCheckBoolean(args) {
      const input = args.INPUT;
      const dropdown = args.DROPDOWN;
      if (dropdown === "text") return isNaN(input);
      if (dropdown === "number") return !isNaN(input);
      if (dropdown === "uppercase") return input == input.toUpperCase();
      if (dropdown === "lowercase") return input == input.toLowerCase();
      return false;
    }

    encodeToBlock(args) {
      if (args.STRING === "") return "";
      if (args.DROPDOWN === "base64") return btoa(args.STRING);
      if (args.DROPDOWN === "binary") {
        return args.STRING.split("")
          .map(function (char) {
            return char.charCodeAt(0).toString(2);
          })
          .join(" ");
      }
      return "";
    }

    decodeFromBlock(args) {
      if (args.STRING === "") return "";
      if (args.DROPDOWN === "base64") return atob(args.STRING);
      if (args.DROPDOWN === "binary") {
        var output = args.STRING.toString();
        return output
          .split(" ")
          .map((x) => (x = String.fromCharCode(parseInt(x, 2))))
          .join("");
      }
      return "";
    }

    negativeReporter(args) {
      return args.INPUT * -1;
    }

    exponentBlock(args) {
      return Math.pow(args.INPUTA, args.INPUTB);
    }

    rootBlock(args) {
      return Math.pow(args.INPUTB, 1 / args.INPUTA);
    }

    normaliseValue(args) {
      var input1 = args.INPUT;
      var input2 = Math.abs(input1);
      var output = input1 / input2;
      if (isNaN(output)) return "0";
      return output;
    }

    clampNumber(args) {
      var input1 = args.INPUTA;
      var input2 = args.INPUTB;
      var input3 = args.INPUTC;
      return Math.min(Math.max(input1, input2), input3);
    }

    setVariableTo(args) {
      vars["variables"][args.INPUTA] = args.INPUTB;
    }

    changeVariableBy(args) {
      if (args.INPUTA in vars["variables"]) {
        var prev = vars["variables"][args.INPUTA];
        var next = args.INPUTB;
        vars["variables"][args.INPUTA] = prev + next;
      } else {
        vars["variables"][args.INPUTA] = args.INPUTB;
      }
    }

    getVariable(args) {
      if (args.INPUT in vars["variables"]) return vars["variables"][args.INPUT];
      return "";
    }

    deleteVariable(args) {
      Reflect.deleteProperty(vars["variables"], args.INPUT);
    }

    deleteAllVariables() {
      Reflect.deleteProperty(vars, "variables");
      vars["variables"] = {};
    }

    greenFlag(args, util) {
      util.runtime.greenFlag();
    }

    setUsername(args, util) {
      util.runtime.ioDevices.userData._username = args.INPUT;
    }

    setSpriteSVG(args, util) {
      try {
        Scratch.vm.runtime.renderer.updateSVGSkin(
          util.target.sprite.costumes[args.INPUTA - 1].skinId,
          args.INPUTB
        );
      } catch (error) {
        return;
      }
      Scratch.vm.emitTargetsUpdate();
    }

    alertBlock(args) {
      alert(args.STRING);
    }

    inputPromptBlock(args) {
      return prompt(args.STRING);
    }

    confirmationBlock(args) {
      return confirm(args.STRING);
    }

    goToLink(args) {
      Scratch.openWindow(args.INPUT);
    }

    redirectToLink(args) {
      Scratch.redirect(args.INPUT);
    }

    setClipboard(args) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(args.STRING);
      }
    }

    readClipboard(args) {
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

    isUserMobile(args, util) {
      return (
        navigator.userAgent.includes("Mobile") ||
        navigator.userAgent.includes("Android")
      );
    }

    screenReporter(args) {
      if (args.DROPDOWN === "width") return screen.width;
      if (args.DROPDOWN === "height") return screen.height;
      return "";
    }

    windowReporter(args) {
      if (args.DROPDOWN === "width") return window.innerWidth;
      if (args.DROPDOWN === "height") return window.innerHeight;
      return "";
    }

    osBrowserDetails(args) {
      var user = navigator.userAgent;
      if (args.DROPDOWN === "operating system") {
        if (user.includes("Mac OS")) return "macOS";
        if (user.includes("CrOS")) return "ChromeOS";
        if (user.includes("Android")) return "Android";
        if (user.includes("Linux")) return "Linux";
        if (user.includes("Windows")) return "Windows";
        if (user.includes("iPad")) return "iOS";
        if (user.includes("iPod")) return "iOS";
        if (user.includes("iPhone")) return "iOS";
        return "Other";
      }
      if (args.DROPDOWN === "browser") {
        if (user.includes("Chrome")) return "Chrome";
        if (user.includes("MSIE")) return "Internet Explorer";
        if (user.includes("Firefox")) return "Firefox";
        if (user.includes("Safari")) return "Safari";
        return "Other";
      }
    }

    projectURL() {
      return window.location.href;
    }

    consoleLog(args) {
      if (args.DROPDOWN === "log") {
        console.log(args.INPUT);
      } else if (args.DROPDOWN === "error") {
        console.error(args.INPUT);
      } else if (args.DROPDOWN === "warn") {
        console.warn(args.INPUT);
      }
    }

    clearConsole() {
      console.clear();
    }

    commentHat() {
      // no-op
    }

    commentCommand() {
      // no-op
    }

    commentString(args) {
      return args.INPUT;
    }

    commentBool(args) {
      return args.INPUT || false;
    }
  }
  Scratch.extensions.register(new LMSUtils());
})(Scratch);
