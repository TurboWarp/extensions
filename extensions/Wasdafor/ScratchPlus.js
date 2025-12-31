// Name: Scratch Plus
// ID: WasdaforScratchPlus
// Description: More usefull blocks and a way to load the project in Scratch 3.0.
// By: Wasdafor <https://scratch.mit.edu/users/543017/>
// License: MPL-2.0

// Run: 'npm run dev' to start the server on port 8000 then open the unsandboxed extension in the browser
// Url: https://turbowarp.org/editor?turbo&offscreen&hqpen&extension=http://localhost:8000/Wasdafor/ScratchPlus.js

(function (Scratch) {
  "use strict";

  /** @type {String} */
  const extensionName = "Scratch Plus";

  /** @type {String} */
  const extensionId = `Wasdafor${extensionName.replace(" ", "")}`; // Adding the 'Wasdafor' prefix for compilation

  /** The name any file will recieve (by default) when downloaded
   * @type {String} */
  const defaultFileName = extensionName.replace(" ", "");

  // Creating reusable references to Scratch (vm) internals
  /** @type {Scratch} */
  const { extensions, Cast, BlockType, TargetType, ArgumentType } = Scratch;

  /** @type {VM & {addListener?: (event: String, handler: any) => void}} */
  const vm = Scratch.vm;

  /** @type {typeof vm} */
  const { runtime } = vm;

  // Verifying that the extension is running unsandboxed
  if (!extensions.unsandboxed)
    throw new Error(`Extension ${extensionName} must run unsandboxed`);

  const ArgType = /** @type {const} */ ({
    ...ArgumentType,
    // Exposing my custom argument types in the same object
    SCRIPT: "script",
    COMMENT: "comment",
    PRECISION: "precision",
    TEXTONLY: "textonly",
    TIMER: "timer",
  });

  /** @type {Scratch.Separator} */
  const Spacer = "---";

  /**
   * @typedef {{
   * Block: {
   *  id: Id,
   *  setCommentText: (text: String) => void,
   *  getRelativeToSurfaceXY: () => {x: Number, y: Number},
   *  workspace: {[id: Id]: any},
   *  comment: any,
   *  dispose: () => void,
   *  getField: (name: String) => ScratchBlocks["Field"],
   *  inputList: any[],
   *  setColor: (color1: String?, color2: String?, color3: String?, color4?: String?) => void,
   *  getParent: () => ScratchBlocks["Block"]
   * },
   * Blocks: {[id: Id]: ScratchBlocks["Block"]},
   * Colours:{[category: String]: any}
   * Events: {[type: String]: String} & {recordUndo: Boolean}
   * mainWorkspace: {[index: String]: any}
   * Field: {
   *  register: (name: String, field: any) => void,
   *  setText: (text: String) => void,
   *  sourceBlock_: ScratchBlocks["Block"],
   *  getOptions: () => [text: String, value: String][]
   * }
   * FieldTextInput: any
   * FieldNumber: any,
   * FieldVariable: any,
   * }} ScratchBlocks
   *
   * @type {ScratchBlocks | null} */
  let ScratchBlocks = /** @type {any} */ (window.ScratchBlocks);

  /** @type {typeof ScratchBlocks extends null ? null : (ScratchBlocks["Events"])} */
  let Events = ScratchBlocks?.Events;

  /** @type {typeof ScratchBlocks extends null ? null : ScratchBlocks["mainWorkspace"]} */
  let mainWorkspace = ScratchBlocks?.mainWorkspace;

  /** @type {String} */
  const warningMessage =
    "NOTE WARNING!!\n\nDo you want to load the compiled project?\nThis will remove all unsaved changes. (You currently opend project will be lost)";

  /**
   * @typedef {{
   * id: String,
   * name: String,
   * click: (event: MouseEvent) => void,
   * hasSeparator?: Boolean
   * }} FileMenuButton
   *
   * An object for easy button registration in the file menu
   * @satisfies {{[name: String]: FileMenuButton}} */
  const fileMenuButtons = {
    download: {
      id: "download",
      name: Scratch.translate("Download compiled project"),
      hasSeparator: true,
      click: (_) => compileProject(),
    },
    save: {
      id: "save",
      name: Scratch.translate("Save compiled project as..."),
      click: (_) => compileProject(true),
    },
    swap: {
      id: "swap",
      name: Scratch.translate("Swap to compiled project"),
      click: (_) => swapToCompiledProject(),
    },
  };

  /** These are the core menu blocks that are always available in Scratch 3.0
   * @satisfies {{[category: String]: String[]}} */
  const coreMenus = {
    motion: [
      "motion_goto_menu",
      "motion_glideto_menu",
      "motion_pointtowards_menu",
    ],
    looks: ["looks_costume", "looks_backdrops"],
    sound: ["sound_sounds_menu"],
    events: [
      "event_touchingobjectmenu",
      // This block will disappear after re-uploading the save file when it is a top level block
      "event_broadcast_menu",
    ],
    control: ["control_create_clone_of_menu"],
    sensing: [
      "sensing_distancetomenu",
      "sensing_of_object_menu",
      "sensing_touchingobjectmenu",
      "sensing_keyoptions",
    ],
  };

  /** these categories represent the different tabs in the Scratch block palette and can be used to color the extension (blocks) */
  const categories = /** @type {const} */ ({
    motion: "motion",
    looks: "looks",
    sounds: "sounds",
    control: "control",
    event: "event",
    sensing: "sensing",
    pen: "pen",
    operators: "operators",
    data: "data",
    data_lists: "data_lists",
    more: "more",
    scratchPlus: "scratchPlus",
  });

  /**
   * @typedef {{color1: String, color2: String, color3: string, color4: string}} Colors
   * Retrieving the color definitions from the ScratchBlocks Colors and appending my custom preset
   *
   * @type {{[key in keyof typeof categories]: Colors}} */
  const categoryColors = /** @type {any} */ ({
    // Adding my custom color schemes
    scratchPlus: {
      // Bright(ish) red
      color1: "#f74141",
      // Dark(ish) for contrast
      color2: "#ca1919",
      color3: "#ca1919",
      color4: "#ca1919",
    },
  });

  /** The selector for the file menu element where the popup menu element will be added
   * @type {String} */
  const fileMenuSelector =
    '.menu-bar_file-group_1_CHX div:nth-child(2) div[class^="menu-bar_menu-bar-menu"]';

  /** This class will contain all logic for the newly added blocks other logic is defined outside this class */
  class ScratchPlus {
    getInfo() {
      // Running some extra code before returning the info object
      this.onGetInfo();

      return {
        id: extensionId,
        name: extensionName,
        ...getColors(categories.scratchPlus),
        blocks: [
          {
            blockType: BlockType.LABEL,
            text: Scratch.translate("Motion"),
          },
          {
            ...getColors(categories.motion),
            opcode: "changeXAndY",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("change x:[X] y:[Y]"),
            arguments: {
              X: {
                type: ArgType.NUMBER,
                defaultValue: "10",
              },
              Y: {
                type: ArgType.NUMBER,
                defaultValue: "10",
              },
            },
            filter: [TargetType.SPRITE],
          },
          {
            ...getColors(categories.motion),
            opcode: "moveStepsInDirection",
            blockType: BlockType.COMMAND,
            text: Scratch.translate(
              "move [STEPS] steps in direction [DIRECTION]"
            ),
            arguments: {
              STEPS: {
                type: ArgType.NUMBER,
                defaultValue: "10",
              },
              DIRECTION: {
                type: ArgType.ANGLE,
                defaultValue: "90",
              },
            },
            filter: [TargetType.SPRITE],
          },
          {
            ...getColors(categories.motion),
            opcode: "turnAround",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("turn around"),
            filter: [TargetType.SPRITE],
          },
          Spacer,
          {
            ...getColors(categories.motion),
            opcode: "rotationStyle",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("rotation style"),
            filter: [TargetType.SPRITE],
          },
          {
            ...getColors(categories.motion),
            opcode: "rotationStyles",
            blockType: BlockType.REPORTER,
            disableMonitor: true,
            text: Scratch.translate("[STYLE]"),
            arguments: {
              STYLE: {
                type: ArgType.STRING,
                menu: "ROTATION_STYLES",
              },
            },
            filter: [TargetType.SPRITE],
          },
          // Future Additions for motion
          // Spacer,
          // {
          //   ...getColors(categories.motion),
          //   opcode: "moveStepsTowards",
          //   blockType: BlockType.COMMAND,
          //   text: Scratch.translate("move [STEPS] steps towards [OPERHAND]"),
          //   arguments: {
          //     STEPS: {
          //       type: ArgType.NUMBER,
          //       defaultValue: "10",
          //     },
          //     OPERHAND: {
          //       type: ArgType.STRING,
          //     },
          //   },
          //   filter: [TargetType.SPRITE],
          // },
          // {
          //   ...getColors(categories.motion),
          //   opcode: "moveStepsToXAndY",
          //   blockType: BlockType.COMMAND,
          //   text: Scratch.translate("move [STEPS] steps to x:[X] y:[Y]"),
          //   arguments: {
          //     STEPS: {
          //       type: ArgType.NUMBER,
          //       defaultValue: "10",
          //     },
          //     X: {
          //       type: ArgType.NUMBER,
          //       defaultValue: "0",
          //     },
          //     Y: {
          //       type: ArgType.NUMBER,
          //       defaultValue: "0",
          //     },
          //   },
          //   filter: [TargetType.SPRITE],
          // },
          // {
          //   ...getColors(categories.motion),
          //   opcode: "pointTowardsXAndY",
          //   blockType: BlockType.COMMAND,
          //   text: Scratch.translate("point towards x:[X] y:[Y]"),
          //   arguments: {
          //     X: {
          //       type: ArgType.NUMBER,
          //       defaultValue: "0",
          //     },
          //     Y: {
          //       type: ArgType.NUMBER,
          //       defaultValue: "0",
          //     },
          //   },
          //   filter: [TargetType.SPRITE],
          // },
          Spacer,
          ...renderXmlBlocks(coreMenus.motion),
          Spacer,
          {
            blockType: BlockType.LABEL,
            text: Scratch.translate("Looks"),
          },
          {
            ...getColors(categories.looks),
            opcode: "stopThinkOrSay",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("stop think or say"),
            filter: [TargetType.SPRITE],
          },
          Spacer,
          {
            ...getColors(categories.looks),
            opcode: "setCostumeTo",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("set costume to [TYPE]"),
            arguments: {
              TYPE: {
                type: ArgType.NUMBER,
                menu: "SETCOSTUMETYPES",
                defaultValue: Object.keys(this.setCostumeTypes)[1],
              },
            },
            filter: [TargetType.SPRITE],
          },
          {
            ...getColors(categories.looks),
            opcode: "setBackdropTo",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("set backdrop to [TYPE]"),
            arguments: {
              TYPE: {
                type: ArgType.NUMBER,
                menu: "SETCOSTUMETYPES",
                defaultValue: Object.keys(this.setCostumeTypes)[1],
              },
            },
          },
          {
            ...getColors(categories.looks),
            opcode: "setCostumeNumber",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("set costume number to [NUM]"),
            arguments: {
              NUM: {
                type: ArgType.NUMBER,
                defaultValue: "1",
              },
            },
            filter: [TargetType.SPRITE],
          },
          {
            ...getColors(categories.looks),
            opcode: "setBackdropNumber",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("set backdrop number to [NUM]"),
            arguments: {
              NUM: {
                type: ArgType.NUMBER,
                defaultValue: "1",
              },
            },
          },
          {
            ...getColors(categories.looks),
            opcode: "changeCostumeNumber",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("change costume number by [NUM]"),
            arguments: {
              NUM: {
                type: ArgType.NUMBER,
                defaultValue: "1",
              },
            },
            filter: [TargetType.SPRITE],
          },
          {
            ...getColors(categories.looks),
            opcode: "changeBackdropNumber",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("change backdrop number by [NUM]"),
            arguments: {
              NUM: {
                type: ArgType.NUMBER,
                defaultValue: "1",
              },
            },
          },
          Spacer,
          {
            ...getColors(categories.looks),
            opcode: "setColorEffect",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("set color effect to [EFFECT]"),
            arguments: {
              EFFECT: {
                type: ArgType.NUMBER,
                menu: "COLOREFECTS",
                defaultValue: "Infinity",
              },
            },
          },
          {
            ...getColors(categories.looks),
            opcode: "setBrightnessEffect",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("set color effect to [EFFECT]"),
            arguments: {
              EFFECT: {
                type: ArgType.NUMBER,
                menu: "BRIGHTNESSEFECTS",
                defaultValue: "-100",
              },
            },
          },
          {
            ...getColors(categories.looks),
            opcode: "setGhostEffect",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("set color effect to [EFFECT]"),
            arguments: {
              EFFECT: {
                type: ArgType.NUMBER,
                menu: "GHOSTSEFECTS",
                defaultValue: "100",
              },
            },
          },
          Spacer,
          {
            ...getColors(categories.looks),
            opcode: "setLayer",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("set layer to [NUM]"),
            arguments: {
              NUM: {
                type: ArgType.NUMBER,
                defaultValue: "1",
              },
            },
            filter: [TargetType.SPRITE],
          },
          Spacer,
          ...renderXmlBlocks(coreMenus.looks),
          Spacer,
          {
            blockType: BlockType.LABEL,
            text: Scratch.translate("sound"),
          },
          // Future sound addition
          // {
          //   ...getColors(categories.sounds),
          //   opcode: "loopSound",
          //   blockType: BlockType.COMMAND,
          //   isTerminal: true,
          //   text: Scratch.translate("loop sound [SOUND_MENU]"),
          //   arguments: {
          //     SOUND_MENU: {
          //       type: ArgType.SOUND,
          //     },
          //   },
          // },
          Spacer,
          {
            ...getColors(categories.sounds),
            opcode: "pitch",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("pitch"),
          },
          {
            ...getColors(categories.sounds),
            opcode: "panLeftRight",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("pan left/right"),
          },
          Spacer,
          ...renderXmlBlocks(coreMenus.sound),
          Spacer,
          {
            blockType: BlockType.LABEL,
            text: Scratch.translate("events"),
          },
          Spacer,
          ...renderXmlBlocks(coreMenus.events),
          Spacer,
          {
            blockType: BlockType.LABEL,
            text: Scratch.translate("control"),
          },
          {
            ...getColors(categories.control),
            opcode: "stopIf",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("stop [STOP_OPTION] if [OPERAND]"),
            arguments: {
              STOP_OPTION: {
                type: ArgType.STRING,
                menu: "STOPS",
              },
              OPERAND: {
                type: ArgType.BOOLEAN,
              },
            },
          },
          Spacer,
          {
            ...getColors(categories.control),
            opcode: "waitTick",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("wait tick"),
          },
          {
            ...getColors(categories.control),
            opcode: "waitFrame",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("wait frame"),
          },
          {
            ...getColors(categories.control),
            opcode: "waitSecondsOrUntil",
            func: "repeatSecondsOrUntil",
            blockType: BlockType.CONDITIONAL,
            // This removes the branch of the block but still keep it possible to fake trigger a branch to make sure the CONDITION is evaluated every trigger
            branchCount: -1,
            text: Scratch.translate("wait [NUM] seconds or until [CONDITION]"),
            arguments: {
              NUM: {
                type: ArgType.NUMBER,
                defaultValue: "1",
              },
              CONDITION: {
                type: ArgType.BOOLEAN,
              },
            },
          },
          {
            ...getColors(categories.control),
            opcode: "repeatSecondsOrUntil",
            blockType: BlockType.LOOP,
            text: Scratch.translate(
              "repeat [NUM] seconds or until [CONDITION]"
            ),
            arguments: {
              NUM: {
                type: ArgType.NUMBER,
                defaultValue: "5",
              },
              CONDITION: {
                type: ArgType.BOOLEAN,
              },
            },
          },
          {
            ...getColors(categories.control),
            opcode: "repeatSeconds",
            blockType: BlockType.LOOP,
            text: Scratch.translate("repeat [NUM] seconds"),
            arguments: {
              NUM: {
                type: ArgType.NUMBER,
                defaultValue: "5",
              },
            },
          },
          Spacer,
          {
            ...getColors(categories.control),
            opcode: "ifElseIf",
            blockType: BlockType.CONDITIONAL,
            branchCount: 2,
            text: [
              Scratch.translate("if [CONDITION1]"),
              Scratch.translate("else if [CONDITION2]"),
            ],
            arguments: {
              CONDITION1: {
                type: ArgType.BOOLEAN,
              },
              CONDITION2: {
                type: ArgType.BOOLEAN,
              },
            },
          },
          {
            ...getColors(categories.control),
            opcode: "ifElseIfElse",
            blockType: BlockType.CONDITIONAL,
            branchCount: 3,
            text: [
              Scratch.translate("if [CONDITION1]"),
              Scratch.translate("else if [CONDITION2]"),
              Scratch.translate("else"),
            ],
            arguments: {
              CONDITION1: {
                type: ArgType.BOOLEAN,
              },
              CONDITION2: {
                type: ArgType.BOOLEAN,
              },
            },
          },
          Spacer,
          {
            ...getColors(categories.control),
            opcode: "createClones",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("create [NUM] clones of [CLONE_OPTION]"),
            arguments: {
              NUM: {
                type: ArgType.NUMBER,
                defaultValue: "10",
              },
              CLONE_OPTION: {
                type: ArgType.STRING,
                menu: "CLONE_TARGETS",
              },
            },
          },
          Spacer,
          {
            ...getColors(categories.control),
            opcode: "pauzeScript",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("pauze [SCRIPT]"),
            arguments: {
              SCRIPT: { type: ArgType.SCRIPT },
            },
          },
          {
            ...getColors(categories.control),
            opcode: "waitUntilResumeScript",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("wait until resume [SCRIPT]"),
            arguments: {
              SCRIPT: { type: ArgType.SCRIPT },
            },
          },
          {
            ...getColors(categories.control),
            opcode: "pauzeAndWaitUtilResumeScript",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("pauze and wait until resume [SCRIPT]"),
            arguments: {
              SCRIPT: { type: ArgType.SCRIPT },
            },
          },
          {
            ...getColors(categories.control),
            opcode: "resumeScript",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("resume [SCRIPT]"),
            arguments: {
              SCRIPT: { type: ArgType.SCRIPT },
            },
          },
          {
            ...getColors(categories.control),
            opcode: "isScriptPaused",
            blockType: BlockType.BOOLEAN,
            text: Scratch.translate("is [SCRIPT] paused?"),
            arguments: {
              SCRIPT: { type: ArgType.SCRIPT },
            },
          },
          Spacer,
          ...renderXmlBlocks(coreMenus.control),
          Spacer,
          {
            blockType: BlockType.LABEL,
            text: Scratch.translate("sensing"),
          },
          {
            ...getColors(categories.sensing),
            opcode: "timeTimer",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("time [TIMER]"),
            arguments: {
              TIMER: { type: ArgType.TIMER },
            },
          },
          {
            ...getColors(categories.sensing),
            opcode: "isTimerActive",
            blockType: BlockType.BOOLEAN,
            text: Scratch.translate("is [TIMER] active?"),
            arguments: {
              TIMER: { type: ArgType.TIMER },
            },
          },
          {
            ...getColors(categories.sensing),
            opcode: "startTimer",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("start [TIMER]"),
            arguments: {
              TIMER: { type: ArgType.TIMER },
            },
          },
          {
            ...getColors(categories.sensing),
            opcode: "stopTimer",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("stop [TIMER]"),
            arguments: {
              TIMER: { type: ArgType.TIMER },
            },
          },
          {
            ...getColors(categories.sensing),
            opcode: "continueTimer",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("continue [TIMER]"),
            arguments: {
              TIMER: { type: ArgType.TIMER },
            },
          },
          {
            ...getColors(categories.sensing),
            opcode: "setTimer",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("set [TIMER] to [NUM]"),
            arguments: {
              NUM: {
                type: ArgType.NUMBER,
                defaultValue: "5",
              },
              TIMER: { type: ArgType.TIMER },
            },
          },
          {
            ...getColors(categories.sensing),
            opcode: "changeTimer",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("change [TIMER] by [NUM]"),
            arguments: {
              NUM: {
                type: ArgType.NUMBER,
                defaultValue: "2",
              },
              TIMER: { type: ArgType.TIMER },
            },
          },
          Spacer,
          {
            ...getColors(categories.sensing),
            opcode: "isDraggable",
            blockType: BlockType.BOOLEAN,
            disableMonitor: true,
            text: Scratch.translate("is draggable?"),
            filter: [TargetType.SPRITE],
          },
          {
            ...getColors(categories.sensing),
            opcode: "currentMillisecond",
            text: Scratch.translate("current millisecond"),
            blockType: BlockType.REPORTER,
          },
          Spacer,
          ...renderXmlBlocks(coreMenus.sensing),
          Spacer,
          {
            blockType: BlockType.LABEL,
            text: Scratch.translate("Operators"),
          },
          {
            blockType: BlockType.LABEL,
            text: Scratch.translate("Comparison"),
          },
          {
            ...getColors(categories.operators),
            opcode: "notEqualTo",
            blockType: BlockType.BOOLEAN,
            text: Scratch.translate("[OPERAND1] ≠ [OPERAND2]"),
            arguments: {
              OPERAND1: {
                type: ArgType.STRING,
                defaultValue: "apple",
              },
              OPERAND2: {
                type: ArgType.STRING,
                defaultValue: "banana",
              },
            },
          },
          {
            ...getColors(categories.operators),
            opcode: "greaterThanOrEqualTo",
            blockType: BlockType.BOOLEAN,
            text: Scratch.translate("[OPERAND1] ≥ [OPERAND2]"),
            arguments: {
              OPERAND1: {
                type: ArgType.NUMBER,
                defaultValue: "16",
              },
              OPERAND2: {
                type: ArgType.NUMBER,
                defaultValue: "25",
              },
            },
          },
          {
            ...getColors(categories.operators),
            opcode: "lessThanOrEqualTo",
            blockType: BlockType.BOOLEAN,
            text: Scratch.translate("[OPERAND1] ≤ [OPERAND2]"),
            arguments: {
              OPERAND1: {
                type: ArgType.NUMBER,
                defaultValue: "16",
              },
              OPERAND2: {
                type: ArgType.NUMBER,
                defaultValue: "25",
              },
            },
          },
          Spacer,
          {
            ...getColors(categories.operators),
            opcode: "approximatelyEqualTo",
            blockType: BlockType.BOOLEAN,
            text: Scratch.translate("[NUM1] ≈ [NUM2] ± [PRECISION]"),
            arguments: {
              NUM1: {
                type: ArgType.NUMBER,
                defaultValue: "5",
              },
              NUM2: {
                type: ArgType.NUMBER,
                defaultValue: "6.5",
              },
              PRECISION: {
                type: ArgType.NUMBER,
                defaultValue: "2",
              },
            },
          },
          {
            ...getColors(categories.operators),
            opcode: "absoluteEqualTo",
            blockType: BlockType.BOOLEAN,
            text: Scratch.translate("|[NUM1]|  =  |[NUM2]|"),
            arguments: {
              NUM1: {
                type: ArgType.NUMBER,
                defaultValue: "-3",
              },
              NUM2: {
                type: ArgType.NUMBER,
                defaultValue: "3",
              },
            },
          },
          Spacer,
          {
            ...getColors(categories.operators),
            blockType: BlockType.BOOLEAN,
            opcode: "isOddOrEven",
            text: Scratch.translate("[NUM1] is [OPTION]"),
            arguments: {
              NUM1: {
                type: ArgType.NUMBER,
                defaultValue: "10",
              },
              OPTION: {
                type: ArgType.STRING,
                menu: "ODD_EVEN",
              },
            },
          },
          {
            ...getColors(categories.operators),
            blockType: BlockType.BOOLEAN,
            opcode: "isMultipleOf",
            text: Scratch.translate("[NUM1] is multiple of [NUM2]"),
            arguments: {
              NUM1: {
                type: ArgType.NUMBER,
                defaultValue: "10",
              },
              NUM2: {
                type: ArgType.NUMBER,
                defaultValue: "5",
              },
            },
          },
          {
            ...getColors(categories.operators),
            blockType: BlockType.BOOLEAN,
            opcode: "isNumberOfType",
            text: Scratch.translate("[NUM] is of type [TYPE]"),
            arguments: {
              NUM: {
                type: ArgType.NUMBER,
                defaultValue: "10",
              },
              TYPE: {
                type: ArgType.STRING,
                menu: "NUMBER_TYPES",
              },
            },
          },
          {
            ...getColors(categories.operators),
            blockType: BlockType.BOOLEAN,
            opcode: "numberIs",
            text: Scratch.translate("[NUM] is [OPTION]"),
            arguments: {
              NUM: {
                type: ArgType.NUMBER,
                defaultValue: "10",
              },
              OPTION: {
                type: ArgType.STRING,
                menu: "NUMBER_OPTIONS",
              },
            },
          },
          Spacer,
          {
            blockType: BlockType.LABEL,
            text: Scratch.translate("Boolean"),
          },
          {
            ...getColors(categories.operators),
            opcode: "nand",
            blockType: BlockType.BOOLEAN,
            text: Scratch.translate("[OPERAND1] nand [OPERAND2]"),
            arguments: {
              OPERAND1: {
                type: ArgType.BOOLEAN,
              },
              OPERAND2: {
                type: ArgType.BOOLEAN,
              },
            },
          },
          {
            ...getColors(categories.operators),
            opcode: "nor",
            blockType: BlockType.BOOLEAN,
            text: Scratch.translate("[OPERAND1] nor [OPERAND2]"),
            arguments: {
              OPERAND1: {
                type: ArgType.BOOLEAN,
              },
              OPERAND2: {
                type: ArgType.BOOLEAN,
              },
            },
          },
          {
            ...getColors(categories.operators),
            opcode: "xor",
            blockType: BlockType.BOOLEAN,
            text: Scratch.translate("[OPERAND1] xor [OPERAND2]"),
            arguments: {
              OPERAND1: {
                type: ArgType.BOOLEAN,
              },
              OPERAND2: {
                type: ArgType.BOOLEAN,
              },
            },
          },
          {
            ...getColors(categories.operators),
            opcode: "xnor",
            blockType: BlockType.BOOLEAN,
            text: Scratch.translate("[OPERAND1] xnor [OPERAND2]"),
            arguments: {
              OPERAND1: {
                type: ArgType.BOOLEAN,
              },
              OPERAND2: {
                type: ArgType.BOOLEAN,
              },
            },
          },
          Spacer,
          {
            blockType: BlockType.LABEL,
            text: Scratch.translate("Math"),
          },
          {
            ...getColors(categories.operators),
            opcode: "numberInverse",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("- [NUM]"),
            arguments: {
              NUM: {
                type: ArgType.NUMBER,
                defaultValue: "10",
              },
            },
          },
          {
            ...getColors(categories.operators),
            opcode: "floorDivision",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("[NUM1] ~/ [NUM2]"),
            arguments: {
              NUM1: {
                type: ArgType.NUMBER,
                defaultValue: "10",
              },
              NUM2: {
                type: ArgType.NUMBER,
                defaultValue: "3",
              },
            },
          },
          {
            ...getColors(categories.operators),
            opcode: "safeFloatAddition",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("[NUM1] + [NUM2] precision [PRECISION]\t"),
            arguments: {
              NUM1: {
                type: ArgType.NUMBER,
                defaultValue: "0.2",
              },
              NUM2: {
                type: ArgType.NUMBER,
                defaultValue: "0.1",
              },
              PRECISION: {
                type: ArgType.PRECISION,
              },
            },
          },
          {
            ...getColors(categories.operators),
            opcode: "safeFloatSubtraction",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("[NUM1] - [NUM2] precision [PRECISION]"),
            arguments: {
              NUM1: {
                type: ArgType.NUMBER,
                defaultValue: "0.3",
              },
              NUM2: {
                type: ArgType.NUMBER,
                defaultValue: "0.1",
              },
              PRECISION: {
                type: ArgType.PRECISION,
              },
            },
          },
          {
            ...getColors(categories.operators),
            opcode: "percentageOf",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("[PERCENTAGE]% of [NUM]"),
            arguments: {
              PERCENTAGE: {
                type: ArgType.NUMBER,
                defaultValue: "10",
              },
              NUM: {
                type: ArgType.NUMBER,
                defaultValue: "50",
              },
            },
          },
          {
            ...getColors(categories.operators),
            opcode: "isPercentageOf",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("[NUM1] is % of [NUM2]"),
            arguments: {
              NUM1: {
                type: ArgType.NUMBER,
                defaultValue: "18",
              },
              NUM2: {
                type: ArgType.NUMBER,
                defaultValue: "12",
              },
            },
          },
          Spacer,
          {
            blockType: BlockType.LABEL,
            text: Scratch.translate("Boolean values"),
          },
          {
            opcode: "true",
            blockType: BlockType.BOOLEAN,
            disableMonitor: true,
            text: Scratch.translate("true"),
          },
          {
            opcode: "false",
            blockType: BlockType.BOOLEAN,
            disableMonitor: true,
            text: Scratch.translate("false"),
          },
          {
            opcode: "randomBoolean",
            blockType: BlockType.BOOLEAN,
            disableMonitor: true,
            text: Scratch.translate("random"),
          },
          Spacer,
          {
            opcode: "stringToBoolean",
            blockType: BlockType.BOOLEAN,
            text: Scratch.translate("text [TEXT]"),
            arguments: {
              TEXT: {
                type: ArgType.STRING,
                defaultValue: "true",
              },
            },
          },
          {
            opcode: "numberToBoolean",
            blockType: BlockType.BOOLEAN,
            text: Scratch.translate("number [NUM]"),
            arguments: {
              NUM: {
                type: ArgType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          Spacer,
          {
            blockType: BlockType.LABEL,
            text: Scratch.translate("Primitive values"),
          },
          {
            opcode: "text",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("text [TEXT]"),
            arguments: {
              TEXT: {
                type: ArgType.STRING,
                defaultValue: "Hello World",
              },
            },
          },
          {
            opcode: "number",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("number [NUM]"),
            arguments: {
              NUM: {
                type: ArgType.NUMBER,
                defaultValue: "10",
              },
            },
          },
          {
            opcode: "color",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("color [COLOR]"),
            arguments: {
              COLOR: {
                type: ArgType.COLOR,
              },
            },
          },
          {
            opcode: "angle",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("angle [ANGLE]"),
            arguments: {
              ANGLE: {
                type: ArgType.ANGLE,
              },
            },
          },

          {
            opcode: "notePicker",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("note [NOTE]"),
            arguments: {
              NOTE: {
                type: ArgType.NOTE,
              },
            },
          },
          createXmlBlock("matrix"),
          Spacer,
          {
            opcode: "tripleJoin",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("join [TEXT1] [TEXT2] [TEXT3]"),
            arguments: {
              TEXT1: {
                type: ArgType.STRING,
                defaultValue: "Hello",
              },
              TEXT2: {
                type: ArgType.STRING,
                defaultValue: "World",
              },
              TEXT3: {
                type: ArgType.STRING,
                defaultValue: "!",
              },
            },
          },
          Spacer,
          {
            blockType: BlockType.LABEL,
            text: Scratch.translate("Math constants"),
          },
          {
            opcode: "nan",
            blockType: BlockType.REPORTER,
            disableMonitor: true,
            text: Scratch.translate("NaN"),
          },
          {
            opcode: "infinity",
            blockType: BlockType.REPORTER,
            disableMonitor: true,
            text: Scratch.translate("Infinity"),
          },
          {
            opcode: "pi",
            blockType: BlockType.REPORTER,
            disableMonitor: true,
            text: Scratch.translate("π (pi)"),
          },
          {
            opcode: "phi",
            blockType: BlockType.REPORTER,
            disableMonitor: true,
            text: Scratch.translate("ϕ (phi)"),
          },
          {
            opcode: "e",
            blockType: BlockType.REPORTER,
            disableMonitor: true,
            text: Scratch.translate("e"),
          },
          Spacer,
          {
            blockType: BlockType.LABEL,
            text: Scratch.translate("Time"),
          },
          {
            opcode: "fps",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("fps"),
          },
          {
            opcode: "deltaTime",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("ΔT"),
          },
          Spacer,
          {
            blockType: BlockType.LABEL,
            text: Scratch.translate("Comments"),
          },
          {
            opcode: "hatComment",
            blockType: BlockType.HAT,
            edgeActivated: false,
            text: Scratch.translate("// [COMMENT]"),
            arguments: {
              COMMENT: { type: ArgType.COMMENT },
            },
          },
          {
            opcode: "commandComment",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("// [COMMENT]"),
            arguments: {
              COMMENT: { type: ArgType.COMMENT },
            },
          },
          {
            opcode: "cComment",
            blockType: BlockType.CONDITIONAL,
            text: Scratch.translate("// [COMMENT]"),
            arguments: {
              COMMENT: { type: ArgType.COMMENT },
            },
          },
          {
            opcode: "reporterComment",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("// [OPERAND] [COMMENT]"),
            arguments: {
              OPERAND: { type: ArgType.STRING },
              COMMENT: { type: ArgType.COMMENT },
            },
          },
          {
            opcode: "booleanComment",
            blockType: BlockType.BOOLEAN,
            text: Scratch.translate("// [OPERAND] [COMMENT]"),
            arguments: {
              OPERAND: { type: ArgType.BOOLEAN },
              COMMENT: { type: ArgType.COMMENT },
            },
          },
          Spacer,
          {
            blockType: BlockType.LABEL,
            text: Scratch.translate("Compilation"),
          },
          {
            opcode: "isCompiled",
            blockType: BlockType.BOOLEAN,
            disableMonitor: true,
            text: Scratch.translate("is compiled?"),
          },
          Spacer,
          {
            opcode: "removeOnCompile",
            blockType: BlockType.COMMAND,
            branchCount: 1,
            text: Scratch.translate("remove on compile"),
          },
          {
            opcode: "ifCompiledElse",
            blockType: BlockType.CONDITIONAL,
            branchCount: 2,
            text: [
              Scratch.translate("on compiled"),
              Scratch.translate("else remove on compile"),
            ],
          },
          Spacer,
          {
            blockType: BlockType.LABEL,
            text: Scratch.translate("Export options"),
          },
          {
            blockType: BlockType.BUTTON,
            text: fileMenuButtons.download.name,
            func: "downloadCompiledProject",
          },
          {
            blockType: BlockType.BUTTON,
            text: fileMenuButtons.save.name,
            func: "saveCompiledProjectAs",
          },
          {
            blockType: BlockType.BUTTON,
            text: fileMenuButtons.swap.name,
            func: "swapToCompiledProject",
          },
        ],
        menus: {
          SETCOSTUMETYPES: {
            acceptReporters: false,
            // the text is a translated scratch text and the value id just a string
            items: Object.keys(this.setCostumeTypes).map((value) => ({
              text: Scratch.translate(value),
              value,
            })),
          },
          COLOREFECTS: {
            acceptReporters: false,
            items: [
              { text: "black and white", value: "Infinity" },
              { text: "color", value: "0" },
            ],
          },
          BRIGHTNESSEFECTS: {
            acceptReporters: false,
            items: [
              { text: "black", value: "-100" },
              { text: "white", value: "100" },
              { text: "color", value: "0" },
            ],
          },
          GHOSTSEFECTS: {
            acceptReporters: false,
            items: [
              { text: "transparent", value: "100" },
              { text: "semitransparent", value: "50" },
              { text: "visible", value: "0" },
            ],
          },
          STOPS: {
            acceptReporters: false,
            items: getMenuOptions("control_stop", "STOP_OPTION"),
          },
          ODD_EVEN: {
            acceptReporters: false,
            items: [
              { text: "odd", value: "1" },
              { text: "even", value: "0" },
            ],
          },
          NUMBER_TYPES: {
            acceptReporters: false,
            items: [
              { text: "integer", value: "integer" },
              { text: "float", value: "float" },
            ],
          },
          NUMBER_OPTIONS: {
            acceptReporters: false,
            items: [
              { text: "positive", value: "positive" },
              { text: "negative", value: "negative" },
              { text: "zero", value: "0" },
              { text: "Infinity", value: "Infinity" },
              { text: "-Infinity", value: "-Infinity" },
              { text: "NaN", value: "NaN" },
            ],
          },
          ROTATION_STYLES: {
            acceptReporters: false,
            items: getMenuOptions("motion_setrotationstyle", "STYLE"),
          },
          CLONE_TARGETS: {
            colour: "#FFFFFF",
            acceptReporters: true,
            items: "_cloneTargetsMenu",
          },
          KEYS: {
            acceptReporters: false,
            items: getMenuOptions("event_whenkeypressed", "KEY_OPTION"),
          },
        },
        customFieldTypes: {
          [ArgType.TEXTONLY]: {
            output: ArgType.STRING,
            outputShape: 2,
            implementation: {
              fromJson: () => new TextOnlyField(),
            },
          },
          [ArgType.PRECISION]: {
            output: ArgType.NUMBER,
            outputShape: 2,
            implementation: {
              fromJson: () => new NumberOnlyField(1, 1, 15, 1),
            },
          },
          [ArgType.COMMENT]: {
            output: ArgType.STRING,
            outputShape: 2,
            implementation: {
              fromJson: () => new CommentField("comment"),
            },
          },
          [ArgType.SCRIPT]: {
            output: ArgType.STRING,
            outputShape: 2,
            implementation: {
              fromJson: () => new TextOnlyField("script"),
            },
          },
          [ArgType.TIMER]: {
            output: ArgType.STRING,
            outputShape: 2,
            implementation: {
              fromJson: () => new TextOnlyField("timer"),
            },
          },
        },
      };
    }

    onGetInfo() {
      this.setUpFpsAndDeltaTime();

      // Trying to update the ScratchBlocks dependency
      ScratchBlocks = /** @type {any} */ (window.ScratchBlocks);
      if (ScratchBlocks == null) return;

      this.onGetInfoWithScratchBlocks();
    }

    onGetInfoWithScratchBlocks() {
      // Upating the dependencies
      ({ Events, mainWorkspace } = ScratchBlocks);

      // Adding the some event listeners and handlers
      this.registerBlockChangeHandler();

      setUpCustomFieldTypes();
      setUpColors();
    }

    /** @returns {void} */
    changeXAndY({ X, Y }, { target }) {
      target.setXY(target.x + Cast.toNumber(X), target.y + Cast.toNumber(Y));
    }

    /** @returns {void} */
    moveStepsInDirection({ STEPS, DIRECTION }, util) {
      const { target, runtime } = util;

      /** @type {Number} */
      const direction = Cast.toNumber(DIRECTION);

      // Storing the direction because the sprite does need to rotate to move
      // This must happen because the fencing can be differ when the sprite is rotated
      /** @type {Number} */
      const oldDirection = target.direction;
      target.setDirection(direction);

      // Triggering the move steps block for perfect parity
      runtime.ext_scratch3_motion.moveSteps({ STEPS }, util);

      // Restoring the direction
      target.setDirection(oldDirection);
    }

    /** @returns {void} */
    turnAround(_, { target }) {
      target.setDirection(target.direction + 180);
    }

    /** @returns {String} */
    rotationStyle(_, { target }) {
      return target.isStage ? "" : target.rotationStyle;
    }

    /** @returns {String} */
    rotationStyles({ STYLE }) {
      return STYLE;
    }

    // Future additions for motion
    // /** @returns {void} */
    // moveStepsTowards() {
    //   /* TODO: implementation */
    // }

    // /** @returns {void} */
    // moveStepsToXAndY() {
    //   /* TODO: implementation */
    // }

    // /** Checks the angle between the sprite and given position
    //  * @returns {number} */
    // directionToXAndY({ X, Y }, { target }) {
    //   return (
    //     Math.atan2(target.y - Cast.toNumber(Y), target.x - Cast.toNumber(X)) /
    //       Math.PI +
    //     180
    //   );
    // }

    // /** @returns {void} */
    // pointTowardsXAndY(inputs, util) {
    //   util.target.setDirection(this.directionToXAndY(inputs, util));
    // }

    /** Triggering an empty say event because this hides the say or think bubbles
     * @returns {void} */
    stopThinkOrSay(_, util) {
      util.runtime.ext_scratch3_looks.say({ MESSAGE: "" }, util);
    }

    /** Mapping the different set costume and backdrop types to their respective functions
     * and exposing them only inside the class
     * @type {{[type: String]: (target: any) => void}} */
    setCostumeTypes = {
      next: this.nextCostume,
      previous: this.previousCostume,
      random: this.randomCostume,
      first: this.firstCostume,
      last: this.lastCostume,
    };

    /** Setting the costume index to a very large number to make sure it is larger than the amount of costumes
     * @returns {void} */
    randomCostume(target) {
      target.setCostume(Math.floor(Math.random() * 1e15));
    }

    /** Setting the costume index to the current value minus one to show the previous costume
     * @returns {void} */
    previousCostume(target) {
      target.setCostume(--target.currentCostume);
    }

    /** Setting the costume index to the current value plus one to show the next costume
     * @returns {void} */
    nextCostume(target) {
      target.setCostume(++target.currentCostume);
    }

    /** Setting the costume index to 0 (internaly 0 indexing is used)
     * @returns {void} */
    firstCostume(target) {
      target.setCostume(0);
    }

    /** Setting the costume index to -1 (internaly 0 indexing is used this will loop around to the last costume)
     * @returns {void} */
    lastCostume(target) {
      target.setCostume(-1);
    }

    /** @returns {void} */
    setCostumeTo({ TYPE }, { target }) {
      this.setCostumeTypes[TYPE](target);
    }

    /** @returns {void} */
    setBackdropTo({ TYPE }, { runtime }) {
      this.setCostumeTypes[TYPE](runtime.getTargetForStage());
    }

    /** Setting the costume index to the given value - 1 to comply with 0 indexing
     * @returns {void} */
    setCostumeNumber({ NUM }, { target }) {
      target.setCostume(Cast.toNumber(NUM) - 1);
    }

    /** Setting the backdrop index to the given value - 1 to comply with 0 indexing
     * @returns {void} */
    setBackdropNumber({ NUM }, { runtime }) {
      runtime.getTargetForStage().setCostume(Cast.toNumber(NUM) - 1);
    }

    /** Setting the costume index to the current index + the given value
     * @returns {void} */
    changeCostumeNumber({ NUM }, { target }) {
      target.setCostume(target.currentCostume + Cast.toNumber(NUM));
    }

    /** Setting the backdrop index to the current index + the given value
     * @returns {void} */
    changeBackdropNumber({ NUM }, { runtime }) {
      const target = runtime.getTargetForStage();
      target.setCostume(target.currentCostume + Cast.toNumber(NUM));
    }

    /** @returns {void} */
    setColorEffect({ EFFECT }, { target }) {
      target.setEffect("color", Cast.toNumber(EFFECT));
    }

    /** @returns {void} */
    setBrightnessEffect({ EFFECT }, { target }) {
      target.setEffect("brightness", Cast.toNumber(EFFECT));
    }

    /** @returns {void} */
    setGhostEffect({ EFFECT }, { target }) {
      target.setEffect("ghost", Cast.toNumber(EFFECT));
    }

    /** Setting the layer of the sprite using the runtime renderer
     * @returns {void} */
    setLayer({ NUM }, { target, runtime }) {
      // Return when the sprite is the stage only other sprites have layer support
      if (target.isStage) return;

      // Updating the draw order of the 'sprite' group
      runtime.renderer.setDrawableOrder(
        target.drawableID,
        Cast.toNumber(NUM),
        "sprite",
        false
      );
    }

    // Future sound addition
    // loopSound(input, util) {}

    /** @returns {Number} */
    pitch(_, { target }) {
      return target.soundEffects?.pitch ?? 0;
    }

    /** @returns {Number} */
    panLeftRight(_, { target }) {
      return target.soundEffects?.pan ?? 0;
    }

    /** Checking the different stop values and stopping the script accordingly
     * @returns {void} */
    stopIf({ STOP_OPTION, OPERAND }, util) {
      if (Cast.toBoolean(OPERAND))
        util.runtime.ext_scratch3_control.stop({ STOP_OPTION }, util);
    }

    /** Waits for the given duration in seconds
     * @returns {Boolean} */
    wait(duration, util, doesYield = true) {
      if (util.stackTimerNeedsInit()) {
        duration = Math.max(0, 1000 * duration);

        util.startStackTimer(duration);
        util.runtime.requestRedraw();
      } else if (util.stackTimerFinished()) return false;

      // When the the consuming block triggers branching we do not need to yield
      if (doesYield) util.yield();

      // If the timer is still running return true
      return true;
    }

    /** Starts a stacktimer and stops yielding when the given duration is reached
     * @returns {void} */
    runBranchForSeconds(seconds, util) {
      // Seconds must be a positive number
      if (seconds > 0 && this.wait(seconds, util, false))
        util.startBranch(1, true);
    }

    // Removing the stack timer if it is not needed anymore
    stopWait(util) {
      delete util.stackFrame.timer;
    }

    /** Yields once to wait a single tick
     * @returns {void} */
    waitTick(_, util) {
      this.wait(0, util);
    }

    /** Waits a very small amount of time to make sture it is one frame even in turbo mode
     * @returns {void} */
    waitFrame(_, util) {
      this.wait(1e-16, util);
    }

    /** Reapeats the first branch until the timer has reached the given duration or the condition is true
     * @returns {void} */
    repeatSecondsOrUntil({ NUM, CONDITION }, util) {
      // Stop the timer when the condition is true
      if (Cast.toBoolean(CONDITION)) this.stopWait(util);
      else this.runBranchForSeconds(Cast.toNumber(NUM), util);
    }

    /** Repeats the first branch until the timer has reached the given duration
     * @returns {void} */
    repeatSeconds({ NUM }, util) {
      this.runBranchForSeconds(Cast.toNumber(NUM), util);
    }

    /** @returns {void} */
    ifElseIf({ CONDITION1, CONDITION2 }, util) {
      if (CONDITION1) util.startBranch(1);
      else if (CONDITION2) util.startBranch(2);
    }

    /** @returns {void} */
    ifElseIfElse({ CONDITION1, CONDITION2 }, util) {
      if (CONDITION1) util.startBranch(1);
      else if (CONDITION2) util.startBranch(2);
      else util.startBranch(3);
    }

    /** @returns {void} */
    createClones(args, util) {
      for (let i = 0; i < Cast.toNumber(args.NUM); i++)
        util.runtime.ext_scratch3_control.createClone(args, util);
    }

    /** @type {Set<String>} */
    static blockChangeEvents = new Set();

    /** Setting up the block change events
     * @returns {void} */
    static setBlockChangeEvents() {
      ScratchPlus.blockChangeEvents = new Set([
        Events.BLOCK_CREATE,
        Events.CHANGE,
        Events.BLOCK_DELETE,
      ]);
    }

    /** This tracks if any block(s) has changed (BLOCK_CREATE, CHANGE, BLOCK_DELETE)
     * @type {Boolean} */
    static areBlocksDirty = false;

    /** Setting up listeners to track block changes and dirty state
     * @returns {void} */
    registerBlockChangeHandler() {
      // Simply set the set of block change events
      ScratchPlus.setBlockChangeEvents();

      // Adding ScratchBlocks workspace event listeners to listen to block changes
      addWorkspaceEventListener(ScratchPlus.blockChangeHandler);

      // Defining the handler for the dirty blocks
      dirtyBlocksHandler = this.onDirtyBlocks.bind(this);
    }

    /** Checks the event for any block changes than sets the dirty flag
     * @returns {void} */
    static blockChangeHandler({ type }) {
      if (ScratchPlus.blockChangeEvents.has(type))
        ScratchPlus.areBlocksDirty = true;
    }

    /**
     * When there has been a change correct the pauzed scripts
     * @typedef { (value: String) => void} BlockHandler
     * @typedef {{[opcode: String]: BlockHandler}} BlockHandlers
     *
     * @param {BlockHandlers} blockHandlers
     * @returns {void}
     * */
    forEachCustomFieldBlock(blockHandlers) {
      // Running some code for each block in the project
      for (const target of runtime.targets) {
        const { _blocks } = target.blocks;
        for (const blockId in _blocks) {
          const { opcode, fields } = _blocks[blockId];

          /** @type {BlockHandler?} */
          const handler = blockHandlers[opcode];

          // Executing the correct handler for the block
          handler?.(Object.values(fields)[0].value);
        }
      }
    }

    /** Triggers code when one or more blocks have been changed
     * @returns {void} */
    onDirtyBlocks() {
      if (!ScratchPlus.areBlocksDirty) return;

      // Resetting the dirty flag
      ScratchPlus.areBlocksDirty = false;

      this.correctTimersAndPauzedScripts();
    }

    /** This makes sure that unused timers and pauzed scripts are removed
     *  and do not cause undesired behavior when potentially used later
     * @returns {void} */
    correctTimersAndPauzedScripts() {
      /** Creating a new set to store the new pauzed scripts
       * @type {Set<String>} */
      const newPauzedScripts = new Set();

      /** Creating a new object to store the new timers
       * @type {Timers} */
      const newTimers = {};

      /** @type {BlockHandlers} */
      const blockHandlers = {
        [`${extensionId}_script`]: (value) => {
          // Checking if the script is pauzed
          if (this.pauzedScripts.has(value)) newPauzedScripts.add(value);
        },
        [`${extensionId}_timer`]: (value) => {
          // Checking if the timer exists
          const timer = this.timers[value];
          if (timer != null) newTimers[value] = timer;
        },
      };

      // Running the registerd block handlers for each block in the project
      this.forEachCustomFieldBlock(blockHandlers);

      // Updating the pauzed scripts and timers to their current state
      this.pauzedScripts = newPauzedScripts;
      this.timers = newTimers;
    }

    /** @type {Set<String>} */
    pauzedScripts = new Set();

    /** @returns {void} */
    pauzeScript({ SCRIPT }) {
      this.pauzedScripts.add(SCRIPT);
    }

    /** @returns {void} */
    waitUntilResumeScript({ SCRIPT }, util) {
      if (this.pauzedScripts.has(SCRIPT)) util.yield();
    }

    /** @returns {void} */
    pauzeAndWaitUtilResumeScript(args, util) {
      // When using yield the args object stays the same reference
      // So i store if the first frame has passed so i can pauze the script only in the first frame
      if (args.firstFrame === undefined) {
        args.firstFrame = true;
        this.pauzeScript(args);
      }
      this.waitUntilResumeScript(args, util);
    }

    /** @returns {void} */
    resumeScript({ SCRIPT }) {
      this.pauzedScripts.delete(SCRIPT);
    }

    /** @returns {Boolean} */
    isScriptPaused({ SCRIPT }) {
      return this.pauzedScripts.has(SCRIPT);
    }

    /** Storing the runtime timers
     * @typedef {{time: Number, endTime: Number, active: Boolean}} Timer
     * @typedef {{[timer: String]: Timer}} Timers
     *
     * @type {Timers} */
    timers = {};

    /** Retieves the timer if present or creates a new one
     * @returns {Timer} */
    getOrCreateTimer({ TIMER }) {
      const timer = this.timers[TIMER];
      if (timer == null)
        return (this.timers[TIMER] = { time: 0, endTime: 0, active: false });
      return timer;
    }

    /** @returns {Number} */
    timeTimer(args) {
      /** @type {Timer} */
      const { active, time, endTime } = this.getOrCreateTimer(args);
      return active ? Date.now() / 1000 - time : endTime;
    }

    /** @returns {Boolean} */
    isTimerActive(args) {
      return this.getOrCreateTimer(args).active;
    }

    /** @returns {void} */
    startTimer(args) {
      /** @type {Timer} */
      const timer = this.getOrCreateTimer(args);

      timer.time = Date.now() / 1000;
      timer.active = true;
    }

    /** @returns {void} */
    stopTimer(args) {
      /** @type {Timer} */
      const timer = this.getOrCreateTimer(args);

      if (!timer.active) return;

      timer.endTime = Date.now() / 1000 - timer.time;
      timer.active = false;
    }

    /** @returns {void} */
    continueTimer(args) {
      /** @type {Timer} */
      const timer = this.getOrCreateTimer(args);

      if (timer.active) return;
      timer.time = Date.now() / 1000 - timer.endTime;
      timer.active = true;
    }

    /** @returns {void} */
    setTimer(args) {
      /** @type {Timer} */
      const timer = this.getOrCreateTimer(args);

      if (timer.active)
        timer.time = Date.now() / 1000 - Cast.toNumber(args.NUM);
      else timer.endTime = Cast.toNumber(args.NUM);
    }

    /** @returns {void} */
    changeTimer(args) {
      /** @type {Timer} */
      const timer = this.getOrCreateTimer(args);

      // Making sure the calculation are safely done with numbers
      if (timer.active)
        timer.time = Cast.toNumber(timer.time - Cast.toNumber(args.NUM));
      else
        timer.endTime = Cast.toNumber(timer.endTime + Cast.toNumber(args.NUM));
    }

    /** @returns {Boolean} */
    isDraggable(_, { target }) {
      return target.draggable && !target.isStage;
    }

    /** @returns {Number} */
    currentMillisecond() {
      return Date.now() % 1000;
    }

    /** @returns {Boolean} */
    notEqualTo({ OPERAND1, OPERAND2 }) {
      return Cast.compare(OPERAND1, OPERAND2) !== 0;
    }

    /** @returns {Boolean} */
    greaterThanOrEqualTo({ OPERAND1, OPERAND2 }) {
      return Cast.compare(OPERAND1, OPERAND2) >= 0;
    }

    /** @returns {Boolean} */
    lessThanOrEqualTo({ OPERAND1, OPERAND2 }) {
      return Cast.compare(OPERAND1, OPERAND2) <= 0;
    }

    /** Checking if the difference between the given numbers is smaller or equal to the precision value
     * @returns {Boolean} */
    approximatelyEqualTo({ NUM1, NUM2, PRECISION }) {
      return (
        Math.abs(Cast.toNumber(NUM1) - Cast.toNumber(NUM2)) <=
        Cast.toNumber(PRECISION)
      );
    }

    /** Checking if both nummers are the same where positive and negative don't play any role
     * @returns {Boolean} */
    absoluteEqualTo({ NUM1, NUM2 }) {
      return Math.abs(Cast.toNumber(NUM1)) == Math.abs(Cast.toNumber(NUM2));
    }

    /** @returns {Boolean} */
    isOddOrEven({ NUM1, OPTION }) {
      return Cast.toNumber(NUM1) % 2 === Cast.toNumber(OPTION);
    }

    /** @returns {Boolean} */
    isMultipleOf({ NUM1, NUM2 }) {
      return Cast.toNumber(NUM1) % Cast.toNumber(NUM2) === 0;
    }

    /** @returns {Boolean} */
    isNumberOfType({ NUM, TYPE }) {
      if (TYPE === "integer") return Cast.toNumber(NUM) % 1 === 0;
      return Cast.toNumber(NUM) % 1 !== 0;
    }

    /** @returns {Boolean} */
    numberIs({ NUM, OPTION }) {
      if (OPTION === "positive") return Cast.toNumber(NUM) > 0;
      else if (OPTION === "negative") return Cast.toNumber(NUM) < 0;
      // Just a simple comparison with no type checking
      return Cast.toString(NUM) == OPTION;
    }

    /** @returns {Boolean} */
    nand({ OPERAND1, OPERAND2 }) {
      return !(Cast.toBoolean(OPERAND1) && Cast.toBoolean(OPERAND2));
    }

    /** @returns {Boolean} */
    nor({ OPERAND1, OPERAND2 }) {
      return !(Cast.toBoolean(OPERAND1) || Cast.toBoolean(OPERAND2));
    }

    /** @returns {Boolean} */
    xor({ OPERAND1, OPERAND2 }) {
      return OPERAND1 != OPERAND2;
    }

    /** @returns {Boolean} */
    xnor({ OPERAND1, OPERAND2 }) {
      return OPERAND1 == OPERAND2;
    }

    /** @returns {Number} */
    numberInverse({ NUM }) {
      return Cast.toNumber(NUM) * -1;
    }

    /** @returns {Number} */
    floorDivision({ NUM1, NUM2 }) {
      return Math.floor(Cast.toNumber(NUM1) / Cast.toNumber(NUM2));
    }

    /** @returns {Number} */
    safeFloatAddition({ NUM1, NUM2, PRECISION }) {
      // Multiplying the numbers by the precision and then dividing them back to avoid ugly floating point arithmetic
      /** @type {Number} */
      const multiplier = Math.pow(10, PRECISION);
      return (
        (Cast.toNumber(NUM1) * multiplier + Cast.toNumber(NUM2) * multiplier) /
        multiplier
      );
    }

    /** @returns {Number} */
    safeFloatSubtraction({ NUM1, NUM2, PRECISION }) {
      // Multiplying the numbers by the precision and then dividing them back to avoid ugly floating point arithmetic
      /** @type {Number} */
      const multiplier = Math.pow(10, PRECISION);
      return (
        (Cast.toNumber(NUM1) * multiplier - Cast.toNumber(NUM2) * multiplier) /
        multiplier
      );
    }

    /** @returns {Number} */
    percentageOf({ PERCENTAGE, NUM }) {
      return (Cast.toNumber(NUM) / 100) * Cast.toNumber(PERCENTAGE);
    }

    /** @returns {Number} */
    isPercentageOf({ NUM1, NUM2 }) {
      return (100 / Cast.toNumber(NUM2)) * Cast.toNumber(NUM1);
    }

    /** @returns {true} */
    true() {
      return true;
    }

    /** @returns {false} */
    false() {
      return false;
    }

    /** @returns {Boolean} */
    randomBoolean() {
      return Math.random() < 0.5;
    }

    /** @returns {Boolean} */
    stringToBoolean({ TEXT }) {
      return Cast.compare(TEXT, "true") === 0;
    }

    /** @returns {Boolean} */
    numberToBoolean({ NUM }) {
      return Cast.compare(NUM, 0) !== 0;
    }

    /** @returns {String} */
    text({ TEXT }) {
      return Cast.toString(TEXT);
    }

    /** @returns {Number} */
    number({ NUM }) {
      return Cast.toNumber(NUM);
    }

    /** @returns {String} */
    color({ COLOR }) {
      return Cast.toString(COLOR);
    }

    /** @returns {Number} */
    angle({ ANGLE }) {
      return Cast.toNumber(ANGLE);
    }

    /** @returns {Number} */
    notePicker({ NOTE }) {
      return Cast.toNumber(NOTE);
    }

    /** @returns {String} */
    matrix({ MATRIX }) {
      return Cast.toString(MATRIX);
    }

    /** @returns {String} */
    tripleJoin({ TEXT1, TEXT2, TEXT3 }) {
      return Cast.toString(TEXT1) + Cast.toString(TEXT2) + Cast.toString(TEXT3);
    }

    /** @returns {NaN} */
    nan() {
      return NaN;
    }

    /** @returns {Infinity} */
    infinity() {
      return Infinity;
    }

    /** @returns {Number} */
    pi() {
      return Math.PI;
    }

    /** @returns {Number} */
    phi() {
      return 1.618033988749894;
    }

    /** @returns {Number} */
    e() {
      return Math.E;
    }

    /** @returns {Number} */
    fps() {
      return this.internalFps;
    }

    /** @returns {Number} */
    deltaTime() {
      return this.internalDeltaTime;
    }

    /** @returns {Boolean} */
    hatComment() {
      return false;
    }

    /** @returns {void} */
    commandComment() {}

    /** @returns {void} */
    cComment(_, util) {
      util.startBranch(1);
    }

    /** @returns {any} */
    reporterComment({ OPERAND }) {
      return OPERAND;
    }

    /** @returns {Boolean} */
    booleanComment({ OPERAND }) {
      return Cast.toBoolean(OPERAND);
    }

    /** @returns {false} */
    isCompiled() {
      return false;
    }

    /** @returns {void} */
    removeOnCompile(_, util) {
      util.startBranch(1);
    }

    /** @returns {void} */
    ifCompiledElse(_, util) {
      util.startBranch(2);
    }

    /** Button handler to download the project
     * @returns {void} */
    downloadCompiledProject() {
      compileProject();
    }

    /** Button handler to save the project as
     * @returns {void} */
    saveCompiledProjectAs() {
      compileProject(true);
    }

    /** Button handler to swap the current project with the compiled version
     * @returns {void} */
    swapToCompiledProject() {
      swapToCompiledProject();
    }

    /** @type {Number} */
    internalFps = runtime.frameLoop.framerate;
    /** @type {Number} */
    internalDeltaTime = 1 / this.internalFps;
    /** @type {Number} */
    lastTime = 0;

    /** Trying to keep all the block logic in the extension class
     * @returns {void} */
    setUpFpsAndDeltaTime() {
      fpsHandler = () => {
        // Saving the current time so calculate the delta time and fps
        const newLastTime = performance.now() / 1000;

        // Only update the fps and delta time when the previous time is not 0
        if (this.lastTime !== 0) {
          this.internalDeltaTime = newLastTime - this.lastTime;
          this.internalFps = 1 / this.internalDeltaTime;
        }

        this.lastTime = newLastTime;
      };
    }

    _cloneTargetsMenu() {
      return getMenuOptions("control_create_clone_of_menu", "CLONE_OPTION");
    }
  }

  /** @type {Boolean} */
  let hasRegistered = false;

  /** When scratch triggers the registration of a custom field the name has been modified so store it and register when ScratchBlocks is loaded
   * @type {{[name: String]: {fromJson: (value: any) => any}}} */
  const customFieldTypes = {};

  /** @type {ScratchBlocks["FieldTextInput"]} */
  let TextOnlyField = class {};

  /** @type {ScratchBlocks["FieldTextInput"]} */
  let CommentField = class {};

  /** @type {ScratchBlocks["FieldNumber"]} */
  let NumberOnlyField = class {};

  // Adding the listener to register the custom field types when the ScratchBlocks dependency is loaded or store the values to register later
  runtime.on("EXTENSION_FIELD_ADDED", ({ name, implementation }) => {
    if (ScratchBlocks) ScratchBlocks.Field.register(name, implementation);
    else
      customFieldTypes[name] = /** @type {typeof customFieldTypes[String] } */ (
        implementation
      );
  });

  /** Defining the handlers here so they can be supplied to the runtime
   * And no double eventslisteners are added
   * @type {Function?} */
  let fpsHandler, dirtyBlocksHandler;

  // Running the handlers if they exist
  runtime.on("BEFORE_EXECUTE", () => (fpsHandler?.(), dirtyBlocksHandler?.()));

  /** When the ScratchBlocks dependency becomes avalible set the custom field type definitions
   * @returns {void} */
  function setUpCustomFieldTypes() {
    /** Sets the background color of the field and disables dropin blocks
     * @param {ScratchBlocks["Field"]} field\
     * @param {Boolean} [setColor] - if the color should be set
     * @returns {void} */
    function customFieldInit({ sourceBlock_: source }, setColor = true) {
      // Updating the input colors so the background is white
      // @ts-ignore
      if (setColor) source.setColour(null, "#ffffff");

      // Looping trough all the parent inputs of the source block
      // Checking if the connection is the same block is the field source block
      // Then update the connection type to 2 so no blocks can be connected to it
      for (const { connection } of source.getParent()?.inputList ?? [])
        if (connection?.targetBlock() === source) connection.type = 2;
    }

    if (!hasRegistered) {
      hasRegistered = true;

      TextOnlyField = class TextOnlyField extends ScratchBlocks.FieldTextInput {
        constructor(value, validator, config) {
          super(value ?? "", validator, config);
        }

        init(...args) {
          super.init(...args);
          customFieldInit(/** @type {any} */ (this));
        }
      };

      CommentField = class CommentField extends TextOnlyField {
        /** Stores comment listeners that are used in the global CommentField listener
         * @typedef {{field: ScratchBlocks["Field"], parent: ScratchBlocks["Block"]}} CommentListener
         * @type {{[sourceId: Id]: CommentListener}} */
        static listeners = {};
        /** @type {Set<String>} */
        static validEventTypes = new Set([Events.MOVE, Events.COMMENT_DELETE]);

        static onChange({ type, blockId }) {
          // Only listen to the right events
          if (!CommentField.validEventTypes.has(type)) return;

          /** @type {CommentListener} */
          const listener = CommentField.listeners[blockId];

          // Check if the blockId is part of the listeners
          if (listener == null) return;

          // Clearing the input when the type is comment delete
          if (type === Events.COMMENT_DELETE) listener.field.setText("");

          // Updating the comment
          undoSafeAction(() => CommentField.addComment(listener.parent));
        }

        /** Creates an empty comment
         * @param {ScratchBlocks["Block"]} block
         * @returns {void} */
        static addComment(block) {
          // Creating a new empty comment
          block.setCommentText("");

          /** @type {ScratchBlocks["Block"]} */
          const { comment } = block;
          // Updating te comment position
          const { x, y } = block.getRelativeToSurfaceXY();
          comment.moveTo(x + 100, y + 10);

          // Updating the dispose function of the comment to not trigger record undo
          const oldDispose = comment.dispose.bind(comment);
          comment.dispose = () => undoSafeAction(oldDispose);

          // Hidding the comment to make sure the comment cannot be edited
          comment.setVisible(false);

          // When cleaning up blocks the setVisible will be triggerd in this case the the visibility and right after hide it
          const oldSetVisible = comment.setVisible.bind(comment);
          comment.setVisible = function (value) {
            undoSafeAction(() => {
              oldSetVisible(value);
              oldSetVisible(false);
            });
          };
        }

        init(...args) {
          super.init(...args);

          /** @type {ScratchBlocks["Block"]} */
          const parent = this.sourceBlock_?.getParent?.();
          // Adding and registering the event listener when the block is in the main workspace
          if (parent?.workspace == mainWorkspace) {
            // Saving the parent id to dispose the listener later
            this.listenerId = parent.id;
            CommentField.listeners[this.listenerId] = {
              parent,
              field: /** @type {any} */ (this),
            };

            // Adding the event listener to detect move and delete events
            addWorkspaceEventListener(CommentField.onChange);
          }
        }

        // Clearing up the event listener to prevent memory leaks (This worked great in testing)
        dispose(...args) {
          super.dispose(...args);
          delete CommentField.listeners[this.listenerId];
        }
      };

      NumberOnlyField = class NumberOnlyField extends (
        ScratchBlocks.FieldNumber
      ) {
        constructor(value, min, max, precision, config) {
          super(value ?? 0, min, max, precision, config);

          // Simple number validator that only allows numbers between the min and max values
          this.setValidator((value) => {
            if (value > max) value = max;
            if (value < min) value = min;
            // This must be called else the field will still contain invalid values on edit
            this.setText(value);

            return value;
          });
        }

        init(...args) {
          super.init(...args);
          customFieldInit(/** @type {any} */ (this));
        }
      };
    }

    // Registering the custom field types
    for (const [name, implementation] of Object.entries(customFieldTypes))
      ScratchBlocks.Field.register(name, implementation);
  }

  /** I am utilizing interal api's that should not be controlled with undo or redo
   * @template T
   * @param {() => T} action
   * @returns {T} */
  function undoSafeAction(action) {
    // If the redo and undo functionality is disabled just return the result of the action
    if (!Events?.recordUndo) return action();

    // Simply running the action without recording the undo and redo
    Events.recordUndo = false;
    const result = action();

    // Restoring the undo and redo functionality
    Events.recordUndo = true;

    return result;
  }

  /** Creates retrieves the menu options from the given block and field name
   * @param {String} opcode - block you want the menu from
   * @param {String} fieldName - field name of the menu
   * @returns {{text: String, value: String}[] | String[]}
   */
  function getMenuOptions(opcode, fieldName) {
    // Returning an empty array when the ScratchBlocks dependency is not loaded
    if (mainWorkspace == null) return [""];

    /** Creating a temporary new block to the workspace to get the menu generators
     * @type {ScratchBlocks["Block"]} */
    const block = undoSafeAction(() => mainWorkspace.newBlock(opcode));

    // Saving the menu options before disposing the block
    const menuItems = block.getField(fieldName).getOptions();

    // Disposing the block to prevent memory leaks and temprory blocks from bleeding into the workspace
    undoSafeAction(() => block.dispose());

    // Mapping the menu options to the scratch extension format
    return menuItems.map(([text, value]) => ({ text, value }));
  }

  /** Simply retieves the internal ScratchBlocks color and adds them to the palette
   * @returns {void} */
  function setUpColors() {
    for (const [key, colors] of Object.entries(ScratchBlocks.Colours)) {
      // Only elements that contain an object are filterd
      if (typeof colors !== "object") continue;

      const { primary, secondary, tertiary, quaternary } = colors;

      categoryColors[key] = {
        color1: primary,
        color2: secondary,
        color3: tertiary,
        color4: quaternary,
      };
    }
  }

  /**
   * Simple method to retrieve the colors of a given category
   * @param {(keyof typeof categories)} category
   * @returns {Colors | {}}
   */
  function getColors(category) {
    // If no colors are found return an empty object to fallback to the default colors
    return categoryColors[category] ?? {};
  }

  /** Checks if the the listener has already when not add it
   * @param {Function} listener
   * @returns {Boolean} */
  function addWorkspaceEventListener(listener) {
    if (mainWorkspace.listeners_.includes(listener)) return false;
    mainWorkspace.addChangeListener(listener);
    return true;
  }

  /**
   * Creates a new block using the xml format so build-in blocks can be shown in the block panel
   * @param {String} idType
   * @returns {{blockType: String, xml: String}}
   */
  function createXmlBlock(idType) {
    return {
      blockType: BlockType.XML,
      xml: `<block id="${idType}" type="${idType}"/>`,
    };
  }

  /**
   * Converts the set block opcodes to an array of xml menu blocks
   * @param {Iterable<String>} blocks
   * @returns {{blockType: String, xml: String}[]}
   */
  function renderXmlBlocks(blocks) {
    return Array.from(blocks).map(createXmlBlock);
  }

  /**
   * Creates a new fileMenuButton and adds it to the given menu
   * @param {Element} menu
   * @param {FileMenuButton} fileMenuButton
   * @returns {HTMLElement}
   */
  function addFileMenuButton(menu, { id, name, click, hasSeparator = false }) {
    // No duplicate button may be added
    if (document.getElementById(id) != null) return;

    // Creating the element with the right classes and text
    /** @type {HTMLLIElement} */
    const button = document.createElement("li");
    button.id = id;
    button.className = `menu_menu-item_3EwYA menu_hoverable_3u9dt ${hasSeparator ? "menu_menu-section_2U-v6" : ""}`;
    button.innerHTML = name;

    // Adding the click as an event listener
    button.addEventListener("click", click);

    // Appending the button to the menu to make it visible
    return menu.firstElementChild.appendChild(button);
  }

  /**
   * Adds a new menu option so the user can compile the file back into Scratch 3.0 blocks
   * @returns {void}
   */
  function addFileMenuOptionListener() {
    // Selecting the dropdown div from the the file menu option (Second header option)
    /** @type {Element?} */
    const menuWrapper = document.querySelector(fileMenuSelector);
    /** @type {FileMenuButton[]} */
    const buttons = Object.values(fileMenuButtons);

    // This must sadly be done using a MutationObserver because when the menu is closed it removes the items
    // The MutationObserver must be used because the menu is not using clear ids or classes
    /** @type {MutationObserver} */
    new MutationObserver(function (_) {
      // Cecking if the dropdown menu has been opened (That happens when the menu option is clicked)
      if (menuWrapper?.firstElementChild != null)
        buttons.forEach((button) => addFileMenuButton(menuWrapper, button));
    })
      // Starting the observer only observing the element where the dropdown elements will be added
      .observe(menuWrapper, {
        attributes: false,
        childList: true,
        characterData: false,
        subtree: false,
      });
  }

  /**
   * Retrieves the project .3bs file and modifies it trough the compiler
   * @param {Boolean} saveAs
   * @param {Boolean} doesSave
   * @returns {Promise<Blob>}
   */
  async function compileProject(saveAs = false, doesSave = true) {
    return await compileSb3File(
      await vm.saveProjectSb3(),
      // @ts-ignore
      vm.exports.JSZip,
      `${defaultFileName}.sb3`,
      doesSave,
      saveAs
    );
  }

  /**
   * Compiles the project and swaps the currently loaded project with the compiled project if the user accepts
   * @returns {Promise<void>}
   */
  async function swapToCompiledProject() {
    // If the user has denied cancel compilation
    if (!confirm(Scratch.translate(warningMessage))) return;

    // Convering the file to a buffer so it can be read by the FileReader
    /** @type {FileReader} */
    const fileReader = new FileReader();
    fileReader.onload = () => vm.loadProject(fileReader.result);
    fileReader.readAsArrayBuffer(await compileProject(false, false));
  }

  // Only when the project is not packaged do we need to add menu options and detect new extensions, or custom field types
  if (!runtime.isPackaged)
    // Adding a mutation observer so I can add my own export option
    addFileMenuOptionListener();

  extensions.register(/**@type {Scratch.Extension} */ (new ScratchPlus()));

  // COMPILER CODE

  // DO NOT UPLOAD THIS FILE TO THE TURBOWARP GIT REPOSITORY
  // ADD THIS FILE INTO THE EXTENSION FILE

  ("use strict");

  /** The extension prefix for opcodes that requires conversion
   * @satisfies {String} */
  const extensionPrefix = "Wasdafor";

  /**
   * The function type that gets called when a block needs to be converted
   * @typedef {{
   * blocks: Blocks,
   * variables: Variables,
   * lists: Variables,
   * comments: Comments
   * name: String,
   * isStage: Boolean,
   * draggable: Boolean,
   * rotationStyle: String
   * }} Target
   *
   * @typedef {{target: Target, stage: Target}} Context
   * @typedef {(block: Block, context: Context) => void} BlockConverter
   *
   * Mapping object that can easily map the extension blocks to their converters
   * @satisfies {{[opcode: String] : BlockConverter}}
   */
  const blockConversionMapping = {
    changeXAndY: convertChangeXAndY,
    moveStepsInDirection: convertMoveStepsInDirection,
    turnAround: convertTurnAround,
    rotationStyle: convertRotationStyle,
    rotationStyles: convertMenuBlock,
    motion_setrotationstyle: convertSetRotationStyle,
    stopThinkOrSay: convertStopThinkOrSay,
    setCostumeTo: convertSetCostumeOrBackdropTo(),
    setBackdropTo: convertSetCostumeOrBackdropTo(true),
    setCostumeNumber: convertSetOrChangeCostumeOrBackdrop(),
    setBackdropNumber: convertSetOrChangeCostumeOrBackdrop(true),
    changeCostumeNumber: convertSetOrChangeCostumeOrBackdrop(false, true),
    changeBackdropNumber: convertSetOrChangeCostumeOrBackdrop(true, true),
    setColorEffect: convertSetEffect("color"),
    setBrightnessEffect: convertSetEffect("brightness"),
    setGhostEffect: convertSetEffect("ghost"),
    setLayer: convertSetLayer,
    pitch: convertPitch,
    panLeftRight: convertPanLeftRight,
    sound_seteffectto: convertSetOrChangeSoundEffect(),
    sound_changeeffectby: convertSetOrChangeSoundEffect(true),
    stopIf: convertStopIf,
    waitTick: convertWaitAny(0),
    waitFrame: convertWaitAny(1e-16),
    waitSecondsOrUntil: convertWaitOrRepeatSeconds(false),
    repeatSeconds: convertWaitOrRepeatSeconds(true, false),
    repeatSecondsOrUntil: convertWaitOrRepeatSeconds(),
    ifElseIf: convertIfElseIf(),
    ifElseIfElse: convertIfElseIf(true),
    createClones: convertCreateClones,
    pauzeScript: convertPauzeOrResumeScript(),
    waitUntilResumeScript: convertwaitUntilResumeScript,
    pauzeAndWaitUtilResumeScript: convertPauzeAndWaitUtilResumeScript,
    resumeScript: convertPauzeOrResumeScript(false),
    isScriptPaused: convertIsScriptPaused,
    timeTimer: convertTimeTimer,
    isTimerActive: convertIsTimerActive,
    startTimer: convertSetTimerValues(startTimeCreator),
    stopTimer: convertSetTimerValues(stopTimeCreator, 0),
    continueTimer: convertContinueTimer,
    setTimer: convertSetTimer,
    changeTimer: convertChangeTimer,
    currentMillisecond: convertCurrentMillisecond,
    isDraggable: convertIsDraggable,
    sensing_setdragmode: convertSetDragMode,
    notEqualTo: convertComparison(newEquals),
    greaterThanOrEqualTo: convertComparison(newGreaterThan),
    lessThanOrEqualTo: convertComparison(newLessThan),
    approximatelyEqualTo: convertApproximatelyEqualTo,
    absoluteEqualTo: convertAbsoluteEqualTo,
    isOddOrEven: converModResultOfEquals,
    isMultipleOf: converModResultOfEquals,
    isNumberOfType: convertIsNumberOfType,
    numberIs: convertNumberIs,
    nand: convertComparison(newAnd),
    nor: convertComparison(newOr),
    xor: convertXorOperator(),
    xnor: convertXorOperator(true),
    numberInverse: convertNumberInverse,
    floorDivision: convertFloorDivision,
    safeFloatAddition: convertSafeFloatMath(),
    safeFloatSubtraction: convertSafeFloatMath(true),
    percentageOf: convertPercentageOf,
    isPercentageOf: convertIsPercentageOf,
    true: convertTrue,
    false: convertFalse,
    randomBoolean: convertRandom,
    stringToBoolean: convertStringToBoolean,
    numberToBoolean: convertNumberToBoolean,
    text: convertTypeBlock("TEXT"),
    number: convertTypeBlock("NUM", true),
    color: convertTypeBlock("COLOR"),
    angle: convertTypeBlock("ANGLE", true),
    notePicker: convertTypeBlock("NOTE", true),
    tripleJoin: convertTripleJoin,
    nan: convertDivision(),
    infinity: convertDivision(true),
    pi: convertAddition(Math.PI),
    phi: convertAddition(1.618033988749894),
    e: convertAddition(Math.E),
    fps: convertFpsOrDeltaTime(),
    deltaTime: convertFpsOrDeltaTime(true),
    hatComment: convertHatComment,
    commandComment: convertCommandComment,
    cComment: convertCComment,
    reporterComment: convertReporterComment,
    booleanComment: convertBooleanComment,
    isCompiled: convertTrue,
    removeOnCompile: convertRemoveOnCompile,
    ifCompiledElse: convertIfCompiledElse,
    menu_PRECISIONS: convertMenuBlock,
    menu_SETCOSTUMETYPES: convertMenuBlock,
    menu_BROADCASTS: convertMenuBlock,
    menu_CLONE_TARGETS: convertCloneTargetsMenu,
  };

  /** An array of block names that are converted in the first pass
   * These blocks need an intact parent reference to be set/present before they can be converted
   * If other blocks are converted first this important refecence could have been lost
   * @type {Set<String>} */
  const prePassOpcodes = new Set([
    "fps",
    "deltaTime",
    "pitch",
    "panLeftRight",
    "rotationStyle",
    "removeOnCompile",
    "ifCompiledElse",
  ]);

  /** Short prefix for every variable the compiler creates to make them more unique
   * @satisfies {String} */
  const variablePrefix = `${extensionPrefix}_`;

  /** Define your own variable names with default values
   *
   * @satisfies {{[name: String]: VariableValue}}
   */
  const variables = {
    temp: ["temp", ""],
    rotationStyle: ["rotationStyle"],
    isDraggable: ["isDraggable"],
    pitch: ["pitch"],
    panLeftRight: ["panLeftRight"],
    fps: ["fps", 30],
    delataTime: ["deltaTime", 0.033],
    // List start from here
    timeStamps: ["timeStamps"],
    pauzedScripts: ["pauzedScripts"],
    timers: ["timers"],
    timersActive: ["timersActive"],
    flipper1: ["filpper1", -1],
    flipper2: ["flipper2", Infinity],
    // Broadcasts start from here
    frame1: ["frame1"],
    frame2: ["frame2"],
  };

  /** Simple method to reference the type of the variable when adding a new variable */
  const variableTypes = /** @type {const} */ ({
    variables: "variables",
    lists: "lists",
    broadcasts: "broadcasts",
  });

  /** Define the default values for the variables when no value is given to the addVariable function
   * @type {{[ key in keyof typeof variableTypes]: any}} */
  const variableDefaultValues = { variables: 0, lists: [], broadcasts: "" };

  /** Characters that are valid for id generation
   * @satisfies {String} */
  const validIdChars =
    "!#%()*+,-./:;=?@[]^_`{|}~" +
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  /** The length of the id that will be generated
   * @satisfies {Number} */
  const idLength = 20;

  /**
   * The following types are used to make the code more readable and to make sure the types are correct
   * Sources: https://en.scratch-wiki.info/wiki/Scratch_File_Format#Blocks
   *
   * @typedef {{ 0: string, length: typeof idLength } & string} Id
   *
   * @typedef {1 | 2 | 3} InputType
   * The second pre third input values can always be a (block) id or an input array.
   * Type 1: Only one value and this value is a shadow (Cannot be dragged)
   * Type 2: Only one value and is an input (Can be dragged)
   * Type 3: Two values where this first value is a shadow (Cannot be dragged) and the second is an input (Can be dragged)
   *
   * @typedef {4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13} InputValueType
   */
  /**
   * @template {InputValueType} [T=InputValueType]
   * @typedef {([
   * inputValueType: T,
   * value: String,
   * ...(T extends (11 | 12 | 13) ? [id?: Id] : []),
   * ...(T extends (12 | 13) ? [x?: number, y?: number] : [])
   * ] | Id)} InputData
   */
  /**
   * @typedef {[inputType: T, InputData, ...(T extends 3 ? [shadow: InputData] : [])]} Input
   * @template {InputType} [T=InputType]
   */
  /**
   * @typedef {{[name: String]: Input}} Inputs
   *
   * This represents any field
   * @typedef {[value: String, id: String | null]} Field
   * This represents a variable, list or broadcast field
   * @typedef {[value: String, id: Id]} VariableField
   * This represents a variable, list or broadcast value
   * @typedef {[name: String, value: any] | [name: String]} VariableValue
   *
   * @typedef {{[name: String]: Field}} Fields
   *
   * @typedef {keyof typeof variableTypes} VariableType
   * @typedef {[id: String, value: any | null]} Variable
   * @typedef {{[id: Id]: Variable}} Variables
   *
   * @typedef {{
   *  tagName: "mutation",
   *  children: [],
   *  proccode: String,
   *  argumentids: String,
   *  argumentnames?: String,
   *  argumentdefaults?: String,
   *  warp: "true" | "false"
   * }} Mutation
   *
   * @typedef {{
   *  id?: Id,
   *  target: Target,
   *  opcode: String,
   *  next?: Id,
   *  parent?: Id,
   *  inputs: Inputs,
   *  fields: Fields,
   *  topLevel?: boolean,
   *  x?: number,
   *  y?: number,
   *  shadow?: boolean,
   *  mutation?: Mutation,
   *  comment?: Id
   *  }} Block
   * @typedef {{[index: Id]: Block}} Blocks
   */

  /** This object will represent all the created variables and lists so they are not added multiple times
   * @type {{[name: `${String}\n${String}`]: Id}} */
  let savedVariables = {};

  /** This object will represent all the created procedures so they are not added multiple times
   * @typedef {{
   * definition: Block,
   * call: Block,
   * creationCount: number
   * args: ProcedureArgument[]
   * }} ProcedureInfo
   *
   * @type {{[name: `${String}\n${String}`]: ProcedureInfo}} */
  let savedProcedures = {};

  /** Timestamps will be saved in a list and this value will represent the current index
   * @type {Number} */
  let timeStampCount = 0;

  /** Stores the unique script names so they can retrieve the right index
   * @type {{[name: String]: Number}} */
  let scriptIndexes = {};
  let scriptsCount = 0;

  /** Stores the unique script names so they can retrieve the right index
   * @type {{[name: String]: Number}} */
  let timerIndexes = {};
  let timerCount = 0;

  /**
   * Opens sb3 file and parses the project.json file to then pass the javscript object to the convert function
   * @param {Blob} file
   * @param {JSZip} JSZip
   * @param {String} fileName
   * @param {Boolean} [doesSave=false]
   * @param {Boolean} [saveAs=false]
   * @returns {Promise<Blob>}
   */
  async function compileSb3File(
    file,
    JSZip,
    fileName,
    doesSave = false,
    saveAs = false
  ) {
    // @ts-ignore
    const jsZip = new JSZip();

    // Loading the file and retrieving the project.json file
    await jsZip.loadAsync(file);
    /** @type {String} */
    const jsonString = await jsZip.file("project.json").async("string");

    // Parsing the json so it can be modified in javascript
    /** @type {Object} */
    const modifiedJson = convert(JSON.parse(jsonString));

    // Update the project.json file in the zip
    await jsZip.file("project.json", JSON.stringify(modifiedJson));

    // Generating a blob for download
    /** @type {Blob} */
    const content = await jsZip.generateAsync({ type: "blob" });

    // Saving the file if the save funcion is present
    if (doesSave) saveSb3File(content, fileName, saveAs);

    // Returing the blob for external use
    return content;
  }

  /**
   * Creates a temporary <a> element and triggers the download of the given blob
   * @param {Blob} file
   * @param {String} name
   * @param {Boolean} [saveAs=false]
   * @returns {Promise<void>}
   */
  async function saveSb3File(file, name, saveAs = false) {
    // If saveAs and the api is supported then use the api else use the direct download method
    if (saveAs && "showSaveFilePicker" in window) await saveFileAs(file, name);
    else downloadFile(file, name);
  }

  /**
   * Opens the save file dialog and saves the given file with the given name
   * @param {Blob} file
   * @param {String} name
   * @returns {Promise<void>}
   */
  async function saveFileAs(file, name) {
    /** @type {Object} */
    const options = {
      types: [
        {
          description: "Compiled ScratchPlus project",
          accept: { "application/zip": [".sb3", ".zip"] },
        },
      ],
      suggestedName: name, // Default file name
    };

    try {
      // Open the save file dialog
      /** @type {FileSystemFileHandle} */
      // @ts-ignore
      const fileHandle = await window.showSaveFilePicker(options);

      // Create a writable stream to save the file to
      /** @type {FileSystemWritableFileStream} */
      const writableStream = await fileHandle.createWritable();

      // Write content to the file
      await writableStream.write(file);
      await writableStream.close();
    } catch (error) {
      alert("An error occured while saving the file");
    }
  }

  /**
   * Creates a temporary <a> element and triggers the download of the given blob
   * @param {Blob} file
   * @param {String} name
   * @returns {void}
   */
  function downloadFile(file, name) {
    // Create a URL for the Blob
    /** @type {String} */
    const url = URL.createObjectURL(file);

    // Create a temporary <a> element to be able to download the file
    /** @type {HTMLAnchorElement} */
    const a = document.createElement("a");

    // Setting the download properties
    a.href = url;
    a.download = name;

    // Trigger the download (Bacause the user has triggerd this action we can download the file without any issues)
    a.click();

    // Clearing the URL to free memory
    URL.revokeObjectURL(url);
  }

  /**
   * Compiles all the given code to a usable scratch project if it contains the extension
   * @param {Object} json
   * @returns {Object} compiled project.json
   */
  function convert(json) {
    runExtensionBlockConverters(json);
    setBlockParentProperties(json);

    console.log(json);

    return json;
  }

  /**
   * This function simply filters the extension blocks and triggers their converter function
   * @param {Object} json
   * @returns {void} */
  function runExtensionBlockConverters({ targets }) {
    /** @type {Target} */
    const stage = targets.find(({ isStage }) => isStage);

    // Clearing the saved variables and procedures so they can be they do not accumulate over exports
    savedVariables = {};
    savedProcedures = {};
    timeStampCount = 0;

    scriptIndexes = {};
    scriptsCount = 0;

    timerIndexes = {};
    timerCount = 0;

    // Run two passes the pre an main pass
    for (const pass of ["pre", "main"])
      for (const target of /** @type {Target[]} */ targets) {
        for (const [id, value] of Object.entries(target.blocks)) {
          // Loose variables and lists are represented as arrays and do not have an opcode thus should be skipped
          if (Array.isArray(value)) continue;

          /** @type {String} */
          const opcode = value?.opcode ?? "";

          /** @type {String} */
          let blockName = opcode;

          // Updating the block name when the block is from the extension
          if (opcode.startsWith(extensionPrefix))
            blockName = opcode.substring(opcode.indexOf("_") + 1);

          // Only run the converters in their right pass
          if (!(pass === "main" || prePassOpcodes.has(blockName))) continue;

          /** @type {BlockConverter} */
          const converter = blockConversionMapping[blockName];

          // If no block converter for the block is found continue
          if (typeof converter != "function") continue;

          /** Adding the id so it can be referenced
           * @type {Block} */
          const block = newBlock(target, opcode, { id, ...value });

          /** Running the converter */
          converter(block, { target, stage });
        }
      }
  }

  /** Simply runs the given function for each block input this could be Substack or just a normal input
   *
   * @typedef {(target: Target, id: Id, parentId: Id) => void} InputBlockHandler
   *
   * @param {Target} target
   * @param {Block} block
   * @param {InputBlockHandler} onInputBlock
   * @param {Id} [id]
   * @returns {void}
   */
  function runCodeForInputBlocks(target, block, onInputBlock, id) {
    // Top level variables and lists are represented as arrays and do not have a parent thus should be skipped
    if (block == null || Array.isArray(block)) return;

    // Defaulting the id if none is specificly given
    id = id ?? block.id;

    /** @type {Block} */
    const { next, inputs = {} } = block;

    // The next block is the parent of the current block
    if (next != null) onInputBlock(target, next, id);

    // Looping trough all the inputs of the block
    for (const input of Object.values(inputs)) {
      // The input must be an array to be checked for nested blocks
      if (!Array.isArray(input)) continue;

      /** Retrieving the needed information from the input
       * @type {Input} */
      const [_, shadowOrInput, shadow] = input;

      // Checking if the inputs are a block then set the parent to the current block id
      if (typeof shadowOrInput === "string")
        onInputBlock(target, shadowOrInput, id);
      if (typeof shadow === "string") onInputBlock(target, shadow, id);
    }
  }

  /** Sets the parent property of the blocks in the project to fix missing parent ids in the compiled project
   * @param {Object} json
   * @returns {void} */
  function setBlockParentProperties({ targets }) {
    /** simply updates the parent of the block when it is present
     * @type {InputBlockHandler} */
    function setParentProperty({ blocks }, id, parentId) {
      /** @type {Block} */
      const block = blocks[id];
      // The block must be present to be updated
      if (block != null) block.parent = parentId;
    }

    // Looping trough all the block in the project
    for (const target of targets)
      for (const [id, block] of /** @type {[Id, Block][]} */ (
        Object.entries(target.blocks)
      ))
        runCodeForInputBlocks(target, block, setParentProperty, id);
  }

  /**
   * Checks generates a random 20 character long id and makes sure its unique
   * @param {Target} target
   * @param {String} [source="blocks"] - Place the check if the id is unique
   * @returns {Id}
   */
  function newId(target, source = "blocks") {
    /** @type {Number} */
    const charsLength = validIdChars.length;
    /** @type {String} */
    let id = "";
    for (let i = 0; i < idLength; i++) {
      /** @type {String} */
      const randomChar = validIdChars[Math.floor(Math.random() * charsLength)];
      id += randomChar;
    }

    // Verifying if the id is unique if not generate a new one
    if (typeof target[source][id] != "undefined") return newId(target);
    return /** @type {Id} */ (id);
  }

  /**
   * Constructor function for easy block creation
   * @param {Target} target
   * @param {String} opcode
   * @param {Block | {}} block
   * @returns {Block}
   */
  function newBlock(target, opcode, block = {}) {
    // The opcode and target must always be present else the is no block to create
    if (opcode == null || target == null)
      throw new Error("Opcode or target cannot be null");

    // Checking if an id has been passed else generate one
    block["id"] = block["id"] ?? newId(target);

    // Adding the opcode and target to the bock
    block["target"] = target;
    block["opcode"] = opcode;

    return /** @type {Block} */ (block);
  }

  /**
   * Compiles the given block by removing compiler properties so it can be used in the "project.json" file
   * @param {Block} block
   * @returns {Block}
   */
  function compileBlock(block) {
    /** Creating a copy of the object to not mess with the old object
     * @type {Block} */
    const result = { ...block };

    // The id and target are not part of the block structure in the json file
    delete result.id;
    delete result.target;

    /** A simple map that maps fiels to their default values */
    const defaultMapping = /** @type {Block} */ ({
      next: null,
      parent: null,
      topLevel: false,
      shadow: false,
      inputs: {},
      fields: {},
    });

    // Keeping all the default values if they where not defined
    return mergeBlocks(defaultMapping, structuredClone(result));
  }

  /**
   * The origin block will be updated with the values from the override block
   * If a override property is undefined or not present the orgin property will keep its value
   * @param {Block} originBlock
   * @param {Block} overrideBlock
   * @returns {Block}
   */
  function mergeBlocks(originBlock, overrideBlock) {
    // Only updated the values that are not undefined
    for (let [key, value] of Object.entries(overrideBlock))
      if (value !== undefined) originBlock[key] = value;

    return originBlock;
  }

  /**
   * Appends a new block into the blocks list
   * @param {Block} block
   * @param {Target} [target]
   * @returns {block}
   */
  function addBlock(block, target) {
    // Using the given target if present else using the target from the block
    (target ?? block.target).blocks[block.id] = compileBlock(block);
    return block;
  }

  /**
   * Updates the properties of the given block (its) id in the given (bock) target
   * @param {Block} block
   * @param {Id} [id]
   * @param {Target} [target]
   * @returns {Block}
   */
  function updateBlock(block, id, target) {
    // Using the given target if present else using the target from the block
    const { blocks } = target ?? block.target;

    // Using the given id if present else using the id from the block
    id = id ?? block.id;

    // Mering the current state with the given block
    /** @type {Block} */
    const updatedBlock = mergeBlocks(blocks[id], block);

    // Updating the block in the blocks object
    blocks[id] = compileBlock(updatedBlock);

    // Returning the updated block
    return updatedBlock;
  }

  /**
   * Deletes a block from a given list of blocks from the id of a given block
   * (Unused for now)
   * @param {Target} target
   * @param {Id} id
   * @returns {void}
   */
  function deleteBlock(target, id) {
    delete target.blocks[id];
  }

  /** Creates a new input item data structure for a block input
   * @template {any} [S=any]
   * @template {InputValueType | undefined} [T=undefined]
   * @template {Id | undefined} [U=undefined]
   * @template {Boolean | undefined} [V=undefined]
   * @param {S} value
   * @param {{
   * id?: U,
   * x?: Number,
   * y?: Number,
   * inputValueType?: T
   * isBlock?: V
   * }} data
   * @returns {(
   * V extends false ? (InputData<(T extends undefined ?
   * (U extends undefined ? (S extends number ? 4 : 10) : 12) : T)>
   * ) : String
   * )}
   * */
  function newInputData(value, { isBlock, id, x, y, inputValueType } = {}) {
    if (isBlock ?? false) return /** @type {any} */ (value.toString());

    /** @type {Boolean} */
    const hasId = id != null;
    /** @type {Boolean} */
    const hasCoordinates = x != null && y != null;

    if (inputValueType == null)
      if (hasId)
        // The input is either a variable, broadcast or a list so default to a variable
        inputValueType = /** @type {T} */ (12);
      // if the input is a number use the number type else use the string type
      else if (typeof value == "number") inputValueType = /** @type {T} */ (4);
      else inputValueType = /** @type {T} */ (10);

    // Returning the input data and onlt passing the information that has been supplied
    return /** @type {any} */ ([
      inputValueType,
      value.toString(),
      ...(hasId ? [id, ...(hasCoordinates ? [x, y] : [])] : []),
    ]);
  }

  /**
   * Creates an input structure for the block
   * @template {InputType | undefined} [T=undefined]
   * @template {InputData | undefined} [S=undefined]
   * @param {InputData} shadowOrInput
   * @param {S} [shadow]
   * @param {T} [inputType]
   * @returns {(Input<(T extends undefined ? (S extends undefined ? 2 : 3) : T)>)}
   */
  function newInput(shadowOrInput, shadow, inputType) {
    if (shadowOrInput == null)
      throw new Error("The shadowOrInput parameter must be supplied");

    /** @type {Boolean} */
    const hasShadow = shadow != null;

    // Setting the default inputType if not supplied
    inputType = /** @type {T} */ (inputType ?? (hasShadow ? 3 : 2));

    // Returning the input array with the correct values
    return /** @type {any} */ ([
      /** @type {any} */ (inputType),
      shadowOrInput,
      ...(hasShadow ? [shadow] : []),
    ]);
  }

  /**
   * Creates a small array with the given values to represent a field
   * @param {String} value
   * @param {Id} [id=null]
   * @returns {Field}
   */
  function newField(value, id = null) {
    return [value, id];
  }

  /**
   * Created an read list or read variable block with the given target, variable and value
   * @param {VariableField} variable
   * @param {InputData} [inputData]
   * @param {typeof variableTypes[keyof typeof variableTypes]} [type=variableTypes.variables]
   * @returns {Input<1|3>}
   */
  function newVariableInput([name, id], inputData, type) {
    const { lists, broadcasts } = variableTypes;

    /** @type {11| 12 | 13} */
    const inputValueType = type === lists ? 13 : type === broadcasts ? 11 : 12;

    /** @type {[InputData, InputData?]} */
    const dataValues = [newInputData(name, { id, inputValueType })];

    // When the type is a broadcast the optinal value must be added before if present
    if (type === broadcasts) {
      if (inputData == null) dataValues.push(null);
      else dataValues.unshift(inputData);
      // The the type is a variable or list the value must be added after and default to 0 if not present
    } else dataValues.push(inputData ?? newInputData(0));

    // If the second value is null the type must be changed to 1 for only broadcast
    return newInput(...dataValues, dataValues[1] == null ? 1 : 3);
  }

  /** Creates an input for a variable block but with an empty default value backing the block
   * @param {Id} blockId
   * @returns {Input<3>}
   */
  function newBlockInput(blockId) {
    return newInput(blockId, newInputData(""));
  }

  /** Creates an input for any literal value like string or numbers and does not have a reporter block
   * @param {any} value
   * @returns {Input<1>}
   */
  function newValueInput(value) {
    return newInput(newInputData(value), null, 1);
  }

  /**
   * Creates a new variable, list or broadcast and adds it to the given target
   * @param {Target} target
   * @param {VariableValue | [String]} field
   * @param {Boolean} [isLocal=false]
   * @param {typeof variableTypes[keyof typeof variableTypes]} [type=variableTypes.variables]
   * @returns {VariableField}
   */
  function addVariable(
    target,
    [name, value = null],
    isLocal = false,
    type = variableTypes.variables
  ) {
    const { isStage, name: targetName } = target;
    if (!isLocal && !isStage)
      throw new Error("Global variables can only be added to the stage");

    /** Creating the full name for the variable
     * When the variable is local and it is added to the stage makes sure it is unique and looks like a local variable */
    name = `${isLocal && isStage ? "Stage: " : ""}${variablePrefix}${name}`;

    /** Using a linebreak to separate the target name and the variable name becuase this character is not allowed in either names
     * @type {`${String}\n${String}`} */
    const saveId = `${isStage ? "_stage_" : targetName}\n${name}`;

    /** Retrieving the current possible saved variable id
     * @type {Id | undefined} */
    const currentId = savedVariables[saveId];

    // The first time the variable is added the value can be defaulted
    if (currentId == null) value = value ?? variableDefaultValues[type];

    /** Retrieving the current id of the variable or creating a new one
     * @type {Id} */
    const variableId = (savedVariables[saveId] =
      currentId ?? newId(target, type));

    // Only update the target when a new value or the first value is given
    if (value != null)
      target[type][variableId] =
        // When the value is a broadcast just store the name else store the name and the value in an array
        type === variableTypes.broadcasts ? name : [name, value];

    return [name, variableId];
  }

  /** Swaps a block with a variable
   * @param {Target} target
   * @param {VariableField} variable
   * @param {Block} block
   */
  function swapBlockWithVariable(
    target,
    variable,
    { id, parent, x, y, topLevel }
  ) {
    /** Converting the field to input data
     * @type {InputData<12>} */
    const inputData = [12, ...variable];

    // If the variable is top level add the array format to the target blocks
    // @ts-ignore
    if (topLevel) target.blocks[id] = [...inputData, x, y];
    else {
      /** @type {Block} */
      const { inputs = {} } = target.blocks[parent];

      /** Trying to find the input name of the block
       * @type {Input | undefined} */
      const input = Object.values(inputs).find((input) =>
        (input ?? []).slice(1).includes(id)
      );

      // Checking the items and not the type fo the input
      input.forEach((item, i) => {
        if (i != 0 && item === id) {
          input[i] = inputData;
          // Deleting the unused block to clean up the targe
          deleteBlock(target, id);
        }
      });
    }
  }

  /** Adds a comment to the given block in the given target
   * @typedef {{
   * blockId: Id,
   * text: String,
   * x: Number,
   * y: Number,
   * minimized: Boolean,
   * width: Number,
   * height: Number,
   * }} Comment
   *
   * @typedef {{[id: Id]: Comment}} Comments
   *
   * @param {Target} target
   * @param {Id} blockId
   * @param {String} text
   * @param {Number} [x]
   * @param {Number} [y]
   * @param {Id} [id]
   * @returns {[Id, Comment]}
   */
  function addComment(target, blockId, text, x = 0, y = 0, id) {
    // If no is is given create a new one
    id = id ?? newId(target);

    /** @type {Comment} */
    const comment = {
      blockId,
      text,
      x,
      y,
      minimized: true,
      width: 200,
      height: 200,
    };

    // Adding the comment to the target
    target.comments[id] = comment;

    return [id, comment];
  }

  /** Searches trough the comments of the given target and returns the comment with the given block id if present
   * @param {Target} target
   * @param {Id} blockId
   * @returns {[Id, Comment] | []}
   */
  function getCommentByBlockId(target, blockId) {
    return /** @type {[Id, Comment] | []} */ (
      Object.entries(target.comments).find(([, e]) => e.blockId === blockId) ??
        []
    );
  }

  /** Reads the shadow input of a given input
   * @template {Boolean} [T=true]
   * @param {Target} target
   * @param {Input} input
   * @param {Boolean} [removeBlock=true]
   * @param {T} [onlyValue]
   * @returns {T extends false ? Input : String}
   */
  function getCustomFieldValue(
    { blocks },
    [type, shadowOrInput, shadow],
    removeBlock = true,
    onlyValue
  ) {
    const id = /** @type {Id} */ (type === 1 ? shadowOrInput : shadow);

    /** @type {String} */
    const value = Object.values(blocks[id].fields)[0][0];

    // Removing the old block
    if (removeBlock) delete blocks[id];

    return /** @type {any} */ (
      (onlyValue ?? true) ? value : newInput(newInputData(value))
    );
  }

  /** Creates a new procedure argument that can be used as reporter
   * @typedef {{
   * name: String,
   * type: "s" | "b",
   * label: String,
   * defaultValue?: String | boolean,
   * addReporter: () => Input,
   * id: Id,
   * }} ProcedureArgument
   *
   * @param {ProcedureArgument['name']} name
   * @param {ProcedureArgument['type']} type
   * @param {ProcedureArgument['label']} [label]
   * @param {ProcedureArgument['defaultValue']} [defaultValue]
   */
  function newProcedureArgument(target, name, type, label, defaultValue) {
    /** @type {Boolean} */
    const isBoolean = type === "b";

    // Setting the defualt value of the boolean if not given
    defaultValue = (defaultValue ?? (isBoolean ? false : "")).toString();

    // Setting the label to the name if not given
    label = label ?? `${name}:`;

    function addReporter() {
      return newInput(
        addProcedureArgument(target, name, type).id,
        isBoolean ? null : newInputData(""),
        isBoolean ? 2 : 3
      );
    }

    return { name, type, label, defaultValue, addReporter, id: newId(target) };
  }

  /** Creates a custom block with the inforamtion and returns the definition and call block
   * @param {String} name
   * @param {ProcedureArgument[]} args
   * @param {Target} target
   * @param {Boolean} warp
   * @param {Number} [x=0]
   * @param {Number} [y=0]
   * @param {Id} [next]
   * @returns {ProcedureInfo}
   */
  function addProcedure(
    target,
    name,
    args,
    warp = false,
    x = 0,
    y = 0,
    next,
    canCreateCopy = false
  ) {
    /** Adding the prefix to the procedure name to keep it unique */
    name = `${variablePrefix}${name}`;

    /** Using a linebreak to separate the target name and the variable name becuase this character is not allowed in either names
     * @type {`${String}\n${String}`} */
    const saveId = `${target.isStage ? "_stage_" : target.name}\n${name}`;

    /** @type {ProcedureInfo} */
    const procedureInfo = (savedProcedures[saveId] =
      savedProcedures[saveId] ?? /** @type {ProcedureInfo} */ ({}));

    /** Increamenting the creation count of the procedure or setting it to 1 if it is not present
     * @type {Number} */
    const creationCount = (procedureInfo.creationCount =
      (procedureInfo.creationCount ?? 0) + 1);

    // Checking if the procedure is already created and return the possible saved information
    if (creationCount > 1 && !canCreateCopy) {
      // The argument ids must be swapped with the stored ids and the stored creation count will be updated
      procedureInfo.args.forEach((arg, i) => (args[i].id = arg.id));

      return procedureInfo;
    }

    // Adding an extra number to the name if the procedure has been copied
    if (creationCount > 1) name += ` (${creationCount})`;

    // Setting the args in the procedure info so they can be used in the call block
    procedureInfo.args = args;

    /** @type {ReturnType<addProcedureArguments>} */
    const { mutation, argBlockIds } = addProcedureArguments(
      target,
      name,
      args,
      warp
    );

    /** @type {Id[]} */
    const argIds = JSON.parse(mutation.argumentids);

    /** Simply maps the argids to the given value of the inputGenerator
     * @param {(index: Number) => Input} inputGenerator
     * @returns {{[argId: String]: Input}} */
    function createArgInputs(inputGenerator) {
      return Object.fromEntries(argIds.map((id, i) => [id, inputGenerator(i)]));
    }

    /** @type {Id} */
    const prototypeId = newId(target);

    /** The definitaion block there the contents of the custom block will be attached to
     * @type {Block} */
    procedureInfo.definition = addBlock(
      newBlock(target, "procedures_definition", {
        inputs: { custom_block: newInput(prototypeId) },
        next,
        x,
        y,
        topLevel: true,
      })
    );

    // Creating the shadow block visible inside of the definition
    addBlock(
      newBlock(target, "procedures_prototype", {
        id: prototypeId,
        shadow: true,
        inputs: createArgInputs((index) => newInput(argBlockIds[index])),
        mutation,
      })
    );

    /** Creating a copy of the mutation and removing unwanted information
     * @type {Mutation} */
    const callMutation = structuredClone(mutation);
    for (const key of ["argumentdefaults", "argumentnames"])
      delete callMutation[key];

    /** Creating the call block with the information in the context
     * @type {Block} */
    procedureInfo.call = newBlock(target, "procedures_call", {
      // Boolean can never have empty inputs
      inputs: createArgInputs((index) =>
        args[index].type !== "b" ? newValueInput("") : undefined
      ),
      // Making sure any old fields are removed
      fields: {},
      mutation: callMutation,
    });

    // Returing both the definition block and the call
    return procedureInfo;
  }

  /**
   * Adds the argument blocks and returns the mution an argument information
   * @param {Target} target
   * @param {String} name
   * @param {ProcedureArgument[]} args
   * @param {Boolean} warp
   * @returns {{mutation: Mutation, argBlockIds: Id[] }}
   */
  function addProcedureArguments(target, name, args, warp) {
    /** @type {String} */
    let proccode = name;

    // Creating arrays for all the mutation values
    const argNames = [];
    const argIds = [];
    const argDefaults = [];
    const argBlockIds = [];

    // Setting up all the mutation information
    for (const { name, type, label, defaultValue, id } of args) {
      // Adding the data to proccode so it correctly construted
      proccode += ` ${label} %${type}`;

      // Creating the argument block that can be used in the custom blocks
      const input = addProcedureArgument(target, name, type, true);

      // Pusing the different information to the right arrays
      argBlockIds.push(input.id);
      argNames.push(name);
      argIds.push(id);
      argDefaults.push(defaultValue);
    }

    /** Combining all the information in the mutation object
     * @type {Mutation} */
    const mutation = {
      tagName: "mutation",
      children: [],
      proccode,
      argumentids: JSON.stringify(argIds),
      argumentnames: JSON.stringify(argNames),
      argumentdefaults: JSON.stringify(argDefaults),
      warp: /** @type {'true' | 'false'} */ (warp.toString()),
    };

    return { mutation, argBlockIds };
  }

  /** Adds a new procedure argument to the given target
   * @param {Target} target
   * @param {String} name
   * @param {ProcedureArgument['type']} type
   * @param {Boolean} [shadow=false]
   * @returns {Block}
   */
  function addProcedureArgument(target, name, type, shadow = false) {
    /** @type {String} */
    const opcode = `argument_reporter_${type === "b" ? "boolean" : "string_number"}`;

    return addBlock(
      newBlock(target, opcode, {
        id: newId(target),
        shadow,
        fields: { VALUE: newField(name) },
      })
    );
  }

  /** A shorter and easyer way to create a new reporter block
   * @typedef {[target?: Target, id?: Id, parentId?: Id]} ReporterValues
   *
   * @param {String} opcode
   * @param {Inputs} inputs
   * @param {ReporterValues} reporterValues
   * @returns {Block}
   */
  function newGenericReporter(opcode, inputs, ...[target, id, parent]) {
    return newBlock(target, opcode, { id, parent, inputs });
  }

  /**
   * This function makes it super easy to create quick math blocks with two input numbers (NUM1, NUM2)
   * @typedef {[NUM1: Input, NUM2: Input, ...ReporterValues]} MathReporterValues
   * @typedef {(...values: MathReporterValues) => Block} NewMathFunction
   *
   * @param {String} opcode
   * @param {Input} NUM1
   * @param {Input} NUM2
   * @param  {ReporterValues} values
   * @returns {Block}
   */
  function newMath(opcode, NUM1, NUM2, ...values) {
    return newGenericReporter(opcode, { NUM1, NUM2 }, ...values);
  }

  /** @type {NewMathFunction} */
  function newMultiply(...values) {
    return newMath("operator_multiply", ...values);
  }

  /** @type {NewMathFunction} */
  function newDivide(...values) {
    return newMath("operator_divide", ...values);
  }

  /** @type {NewMathFunction} */
  function newAddition(...values) {
    return newMath("operator_add", ...values);
  }

  /** @type {NewMathFunction} */
  function newSubtract(...values) {
    return newMath("operator_subtract", ...values);
  }

  /** @type {NewMathFunction} */
  function newMod(...values) {
    return newMath("operator_mod", ...values);
  }

  /**
   * This function makes it super easy to create quick comapre blocks with two input numbers (OPERAND1, OPERAND2)
   * @typedef {[OPERAND1: Input, OPERAND2: Input, ...ReporterValues]} CompareReporterValues
   * @typedef {(...values: CompareReporterValues) => Block} NewCompareFunction
   *
   * @param {String} opcode
   * @param {Input} OPERAND1
   * @param {Input} OPERAND2
   * @param {ReporterValues} values
   * @returns {Block}
   */
  function newCompare(opcode, OPERAND1, OPERAND2, ...values) {
    return newGenericReporter(opcode, { OPERAND1, OPERAND2 }, ...values);
  }

  /** @type {NewCompareFunction} */
  function newGreaterThan(...values) {
    return newCompare("operator_gt", ...values);
  }

  /** @type {NewCompareFunction} */
  function newLessThan(...values) {
    return newCompare("operator_lt", ...values);
  }

  /** @type {NewCompareFunction} */
  function newEquals(...values) {
    return newCompare("operator_equals", ...values);
  }

  /** @type {NewCompareFunction} */
  function newAnd(...values) {
    return newCompare("operator_and", ...values);
  }

  /** @type {NewCompareFunction} */
  function newOr(...values) {
    return newCompare("operator_or", ...values);
  }

  /**
   * Creates a not block with the given information
   * @param {Id?} childId
   * @param {ReporterValues} values
   * @returns {Block}
   */
  function newNot(childId, ...values) {
    return newGenericReporter(
      "operator_not",
      childId == null ? {} : { OPERAND: newInput(childId) },
      ...values
    );
  }

  /**
   * Creates a join block with the given information
   * @param {Input} STRING1
   * @param {Input} STRING2
   * @param {ReporterValues} values
   * @returns {Block}
   */
  function newJoin(STRING1, STRING2, ...values) {
    return newGenericReporter("operator_join", { STRING1, STRING2 }, ...values);
  }

  /** Creates a new math op block with the given value and operator
   * @param {Target} target
   * @param {Input} value
   * @param {Id} [id]
   * @param {string} [operator="floor"]
   * @returns {Block}
   */
  function newMathOp(target, value, id, operator = "floor") {
    return newBlock(target, "operator_mathop", {
      id,
      inputs: { NUM: value },
      fields: {
        OPERATOR: newField(operator),
      },
    });
  }

  /** Creates a simple wait block with the given duration
   * @param {Target} target
   * @param {Input} DURATION
   * @param {Id} id
   * @returns {Block}
   */
  function newWait(target, DURATION, next, id) {
    return newBlock(target, "control_wait", {
      id,
      inputs: { DURATION },
      next,
    });
  }

  /**
   * Create a simple set variable to block with the given target, variable and value
   * @param {Target} target
   * @param {VariableField} variable
   * @param {Input} input
   * @param {Id} [next]
   * @param {Id} [id]
   * @returns {Block}
   */
  function newSetVariable(target, variable, input, next, id) {
    // Creating a new set variable block
    return newBlock(target, "data_setvariableto", {
      id,
      next,
      inputs: { VALUE: input },
      fields: { VARIABLE: variable },
    });
  }

  /**
   * Creates a simple set index of list block with the given target, list, index and value
   * @param {Target} target
   * @param {VariableField} list
   * @param {Input} index
   * @param {Input} input
   * @param {Id} [next]
   * @param {Id} [id]
   * @returns {Block}
   */
  function newSetListItem(target, list, index, input, next, id) {
    // Creating a new replace item of list block
    return newBlock(target, "data_replaceitemoflist", {
      id,
      next,
      inputs: { ITEM: input, INDEX: index },
      fields: { LIST: list },
    });
  }

  /** Creates a get item of list block with the given index and id
   * @param {Target} target
   * @param {VariableField} list
   * @param {Input} index
   * @param {Id} [id]
   * @returns {Block}
   */
  function addItemOfList(target, list, index, id) {
    return addBlock(
      newBlock(target, "data_itemoflist", {
        id,
        fields: { LIST: list },
        inputs: { INDEX: index },
      })
    );
  }

  /**
   * Creates the correct formula to retrieve the current timer time in seconds
   * @param {Context} context
   * @param {Input} [input]
   * @param {String} [timerName]
   * @param {Boolean} [isAddition=false]
   * @returns
   */
  function newSecondsSinceMath(
    { target, stage },
    timerName,
    input,
    isAddition = false
  ) {
    /** @type {[VariableField, VariableField]} */
    const [timer, timerActive] = newTimerLists(stage, timerName);

    /** @type {Input<1>} */
    const timerIndex = newValueInput(timerIndexes[timerName]);

    /** Created the multiply block that multiplies days since 2000 by the timerActive
     * @type {Block} */
    const multiply = addDaysSinceMultiply(
      target,
      isAddition
        ? daysMultiplier
        : newBlockInput(addItemOfList(target, timerActive, timerIndex).id)
    );

    // Subtracts the timer variable from the result of the multiply block
    return (isAddition ? newAddition : newSubtract)(
      newBlockInput(multiply.id),
      // Use the timer variable by default
      input ?? newBlockInput(addItemOfList(target, timer, timerIndex).id),
      target,
      newId(target)
    );
  }

  /** Creates a new broadcast message with the given name
   * @param {Target} target
   * @param {Target} stage
   * @param {VariableValue} broadcast
   * @param {Id} [next]
   */
  function newBroadcast(target, stage, broadcast, next) {
    /** @type {VariableField} */
    const broadcastSignal = addVariable(
      stage,
      broadcast,
      false,
      variableTypes.broadcasts
    );

    return newBlock(target, "event_broadcast", {
      inputs: {
        BROADCAST_INPUT: newVariableInput(
          broadcastSignal,
          undefined,
          variableTypes.broadcasts
        ),
      },
      next,
    });
  }

  /** Creates a new broadcast message with the given name
   * @param {Target} target
   * @param {Target} stage
   * @param {VariableValue} broadcast
   * @param {Number} x
   * @param {Number} y
   * @param {Id} [next]
   */
  function newBroadcastRevieved(target, stage, broadcast, x, y, next) {
    /** @type {VariableField} */
    const broadcastSignal = addVariable(
      stage,
      broadcast,
      false,
      variableTypes.broadcasts
    );

    return newBlock(target, "event_whenbroadcastreceived", {
      fields: { BROADCAST_OPTION: broadcastSignal },
      next,
      x,
      y,
      topLevel: true,
    });
  }

  /**
   * Creates the direction block in the motion category
   * @param {Target} target
   * @returns {Block}
   */
  function addMotionDirection(target) {
    return addBlock(newBlock(target, "motion_direction"));
  }

  /**
   * Created a new daysSince2000 block to use as an input
   * @param {Target} target
   * @returns {Input}
   */
  function addDaysSince2000(target) {
    return newBlockInput(
      addBlock(newGenericReporter("sensing_dayssince2000", {}, target)).id
    );
  }

  /**
   * Created an absolute block with the given value
   * @param {Target} target
   * @param {Input} value
   * @param {Id} [id]
   * @returns {Block}
   */
  function addAbs(target, value, id) {
    return addBlock(newMathOp(target, value, id, "abs"));
  }

  /**
   * Creates a multiply block that multiplies a given input by days since 2000
   * @param {Target} target
   * @param {Input} multiplier
   * @returns
   */
  function addDaysSinceMultiply(target, multiplier = daysMultiplier) {
    return addBlock(newMultiply(addDaysSince2000(target), multiplier, target));
  }

  /** Creates an event block that checks of the timer is greater than -1 this will trigger once if the project is opend or started
   * @param {Target} target
   * @param {Id} next
   * @param {Input} value
   * @param {Number} [x=0]
   * @param {Number} [y=0]
   * @returns {Block}
   */
  function newTimerGreaterThan(target, next, value, x, y) {
    return newBlock(target, "event_whengreaterthan", {
      next,
      x,
      y,
      topLevel: true,
      inputs: { VALUE: value },
      fields: { WHENGREATERTHANMENU: newField("timer") },
    });
  }

  /**
   * Converts a given block to a not block with a nested block
   * @param {Target} target
   * @param {Id} id - orginal block id
   * @param {Id} childId - nested child block id
   * @returns {Block}
   */
  function originToNot(target, id, childId) {
    return updateBlock(newNot(childId, target), id);
  }

  /**
   * Converts the orgin block to a set costume or backdrop block with the given child
   * @param {Id} id
   * @param {Target} target
   * @param {Id} childId
   * @param {Boolean} isBackdrop
   */
  function originToSetCostumeOrBackdropTo(id, target, childId, isBackdrop) {
    /** @type {Block} */
    const menu = addBlock(
      newBlock(target, isBackdrop ? "looks_backdrops" : "looks_costume", {
        shadow: true,
      })
    );

    // Creating the parameter with the shadow menu block
    /** @type {Input} */
    const param = newInput(childId, menu.id);

    updateBlock(
      newBlock(
        target,
        isBackdrop ? "looks_switchbackdropto" : "looks_switchcostumeto",
        {
          id,
          inputs: { [isBackdrop ? "BACKDROP" : "COSTUME"]: param },
          // Making sure the old field is removed
          fields: {},
        }
      )
    );
  }

  /**
   * Converts orgin to change x block and creates a next change y block
   * @type {BlockConverter}
   */
  function convertChangeXAndY({ id, next, inputs: { X, Y } }, { target }) {
    /** @type {Block} */
    const changeY = addBlock(
      newBlock(target, "motion_changeyby", { next, inputs: { DY: Y } })
    );
    updateBlock(
      newBlock(target, "motion_changexby", {
        id,
        next: changeY.id,
        inputs: { DX: X },
      })
    );
  }

  /**
   * Converts the orgin block to a change x block with a nested change y block
   * @type {BlockConverter}
   */
  function convertMoveStepsInDirection(
    { id, next, inputs: { STEPS, DIRECTION } },
    { target, stage }
  ) {
    /** @type {VariableField} */
    const variableField = addVariable(stage, variables.temp);

    /** @type {Block} */
    const resetPointInDirection = addBlock(
      newBlock(target, "motion_pointindirection", {
        next: next,
        inputs: { DIRECTION: newVariableInput(variableField) },
      })
    );

    /** @type {Block} */
    const moveSteps = addBlock(
      newBlock(target, "motion_movesteps", {
        next: resetPointInDirection.id,
        inputs: { STEPS },
      })
    );

    /** @type {Block} */
    const pointInDirection = addBlock(
      newBlock(target, "motion_pointindirection", {
        next: moveSteps.id,
        inputs: { DIRECTION },
      })
    );

    updateBlock(
      newSetVariable(
        target,
        variableField,
        newBlockInput(addMotionDirection(target).id),
        pointInDirection.id,
        id
      )
    );
  }

  /** Just create a turn block that rotates the sprite by 180 degrees
   * @type {BlockConverter} */
  function convertTurnAround({ id, next }, { target }) {
    updateBlock(
      newBlock(target, "motion_turnright", {
        id,
        next,
        inputs: { DEGREES: newValueInput(180) },
      })
    );
  }

  /** Creates a new set rotation style block with the given target and style
   * @param {Target} target
   * @returns {VariableField} */
  function addRotationStyleVariable(target) {
    /** Initializing the rotation style variable with the current rotation style
     * @type {VariableValue} */
    const rotationStyle = [
      variables.rotationStyle[0],
      target.isStage ? "" : target.rotationStyle,
    ];

    return addVariable(target, rotationStyle, true);
  }

  /** Converts the block to the mapped variable
   * @type {BlockConverter} */
  function convertRotationStyle(block, { target }) {
    swapBlockWithVariable(target, addRotationStyleVariable(target), block);
  }

  /** Keeps the orginal block but sets the rotationStyle variable to keep the state
   * @type {BlockConverter} */
  function convertSetRotationStyle(
    { id, next, fields: { STYLE } },
    { target }
  ) {
    /** @type {Block} */
    const setRotationStyle = addBlock(
      newSetVariable(
        target,
        addRotationStyleVariable(target),
        // Only set the state to the correct value when the sprite is not the stage
        newValueInput(target.isStage ? "" : STYLE[0]),
        next
      )
    );

    // Updating the orgin block to the next block
    target.blocks[id].next = setRotationStyle.id;
  }

  /**
   * Converts the stop think or say block to an empty say block
   * @type {BlockConverter}
   */
  function convertStopThinkOrSay({ id }, { target }) {
    updateBlock(
      newBlock(target, "looks_say", {
        id,
        inputs: { MESSAGE: newValueInput("") },
      })
    );
  }

  /**
   * Wrapper that checks the given type and either created a random block or uses convertSetOrChangeConstumeOrBackdrop
   * @param {Boolean} [isBackdrop=false]
   * @returns
   */
  function convertSetCostumeOrBackdropTo(isBackdrop = false) {
    /** @type {BlockConverter} */
    return function (block, context) {
      const { id, fields } = block;
      const { target } = context;

      // Reading the type value
      const type = fields.TYPE[0];

      // When the TYPE is not random we can reuse the convertSetOrChangeConstumeOrBackdrop wrapper
      const notRandom = type !== "random";
      if (notRandom) {
        const isNext = type === "next";
        const isRelative = isNext || type === "previous";
        const value = isRelative ? (isNext ? 1 : -1) : type === "first" ? 1 : 0;

        convertSetOrChangeCostumeOrBackdrop(
          isBackdrop,
          isRelative,
          value
        )(block, context);
        return;
      }

      /** Creating the random block between 1 and a very large number to ensure correctness and completeness
       * @type {Block} */
      const random = addBlock(
        newBlock(target, "operator_random", {
          inputs: {
            FROM: newValueInput(1),
            TO: newValueInput("1e15"),
          },
        })
      );

      originToSetCostumeOrBackdropTo(id, target, random.id, isBackdrop);
    };
  }

  /**
   * Wrapper to convert a block to a set costume or backdrop to
   * @param {Boolean} [isBackdrop=false]
   * @param {Boolean} [isRelative=false]
   * @param {Number} [value]
   * @returns {BlockConverter}
   */
  function convertSetOrChangeCostumeOrBackdrop(
    isBackdrop = false,
    isRelative = false,
    value
  ) {
    /** @type {BlockConverter} */
    return function ({ id, inputs: { NUM } }, { target }) {
      // Only add the costume or backdrop number when the value is relative
      const costumeOrBackdropNumber = isRelative
        ? addBlock(
            newBlock(
              target,
              isBackdrop
                ? "looks_backdropnumbername"
                : "looks_costumenumbername",
              {
                fields: {
                  NUMBER_NAME: newField("number"),
                },
              }
            )
          )
        : null;

      /** @type {Id} */
      const additionId = newId(target);

      addBlock(
        newAddition(
          NUM ?? newValueInput(value),
          isRelative
            ? newBlockInput(costumeOrBackdropNumber.id)
            : newValueInput(""),
          target,
          additionId
        )
      );

      originToSetCostumeOrBackdropTo(id, target, additionId, isBackdrop);
    };
  }

  /** This wrapper makes it simple to specify which effect needs to be changed *
   * @param {String} effect
   * @returns {BlockConverter}
   */
  function convertSetEffect(effect) {
    return function ({ id, fields: { EFFECT } }, { target }) {
      updateBlock(
        newBlock(target, "looks_seteffectto", {
          id,
          inputs: { VALUE: newValueInput(EFFECT[0]) },
          fields: { EFFECT: newField(effect) },
        })
      );
    };
  }

  /**
   * Converts the set layer block to go to back block plus go fowards with the given layers
   * @type {BlockConverter}
   */
  function convertSetLayer({ id, inputs: { NUM }, next }, { target }) {
    /** @type {Block} */
    const subtract = addBlock(newSubtract(NUM, newValueInput(1), target));

    /** @type {Id} */
    const forwardsId = newId(target);
    addBlock(
      newBlock(target, "looks_goforwardbackwardlayers", {
        id: forwardsId,
        next,
        fields: { FORWARD_BACKWARD: newField("forward") },
        inputs: { NUM: newBlockInput(subtract.id) },
      })
    );

    updateBlock(
      newBlock(target, "looks_gotofrontback", {
        id,
        next: forwardsId,
        // Making sure the old input is removed
        inputs: {},
        fields: {
          FRONT_BACK: newField("back"),
        },
      })
    );
  }

  /** Simply creates a new pitch variable with the value of 0
   * @param {Target} target
   * @returns {VariableField} */
  function addPitchVariable(target) {
    return addVariable(target, variables.pitch, true);
  }

  /** @type {BlockConverter} */
  function convertPitch(block, { target }) {
    swapBlockWithVariable(target, addPitchVariable(target), block);
  }

  /** Simply creates a new panLeftRight variable with the value of 0
   * @param {Target} target
   * @returns {VariableField} */
  function addPanLeftRightVariable(target) {
    return addVariable(target, variables.panLeftRight, true);
  }

  /** @type {BlockConverter} */
  function convertPanLeftRight(block, { target }) {
    swapBlockWithVariable(target, addPanLeftRightVariable(target), block);
  }

  /** Creates a simple procedure that clamps a given value between a min and max value and stores it in a temp variable
   * @param {Target} target
   * @param {Input} value
   * @param {Number} min
   * @param {Number} max
   * @returns {ProcedureInfo}
   */
  function addClampProcedure(stage, target, value, min, max) {
    /** @type {ProcedureArgument} */
    const valueArgument = newProcedureArgument(target, "value", "s");
    /** @type {ProcedureArgument} */
    const minArgument = newProcedureArgument(target, "min", "s");
    /** @type {ProcedureArgument} */
    const maxArgument = newProcedureArgument(target, "max", "s");

    /** @type {Id} */
    const setVariableId = newId(target);

    /** @type {ProcedureInfo} */
    const procedureInfo = addProcedure(
      target,
      "clamp",
      [valueArgument, minArgument, maxArgument],
      true,
      0,
      0,
      setVariableId
    );

    /** @type {Inputs} */
    const inputs = procedureInfo.call.inputs;

    // Setting the inputs of the call block
    inputs[minArgument.id] = newValueInput(min);
    inputs[maxArgument.id] = newValueInput(max);
    inputs[valueArgument.id] = value;

    /** @type {VariableField} */
    const tempField = addVariable(stage, variables.temp);

    /** @type {Input} */
    const temp = newVariableInput(tempField);

    /**
     * Add simple set variable to that sets the temp variable to a given input
     * @param {Input} input
     * @param {Id} [next]
     * @param {Id} [id]
     * @returns {Block}
     */
    function addSetTempTo(input, next, id) {
      return addBlock(newSetVariable(target, tempField, input, next, id));
    }

    /** @type {Block} */
    const nestedIf = addBlock(
      newBlock(target, "control_if", {
        inputs: {
          CONDITION: newInput(
            addBlock(newGreaterThan(temp, maxArgument.addReporter(), target)).id
          ),
          SUBSTACK: newInput(addSetTempTo(maxArgument.addReporter()).id),
        },
      })
    );

    /** @type {Block} */
    const ifElse = addBlock(
      newBlock(target, "control_if_else", {
        inputs: {
          CONDITION: newInput(
            addBlock(newLessThan(temp, minArgument.addReporter(), target)).id
          ),
          SUBSTACK: newBlockInput(addSetTempTo(minArgument.addReporter()).id),
          SUBSTACK2: newInput(nestedIf.id),
        },
      })
    );

    /** Converting the value to number by adding nothing to it */
    addSetTempTo(
      newBlockInput(
        addBlock(
          newAddition(valueArgument.addReporter(), newValueInput(""), target)
        ).id
      ),
      ifElse.id,
      setVariableId
    );

    return procedureInfo;
  }

  /** Sets a given variable to the result of a clamp procedure
   * @param {Boolean} [isChange=false]
   * @returns {BlockConverter} */
  function convertSetOrChangeSoundEffect(isChange = false) {
    /** @type {BlockConverter} */
    return function (
      { id, next, inputs: { VALUE }, fields: { EFFECT } },
      { target, stage }
    ) {
      /** @type {Boolean} */
      const isPitch = EFFECT[0] === "PITCH";

      /** @type {VariableField} */
      const variable = isPitch
        ? addPitchVariable(target)
        : addPanLeftRightVariable(target);

      /** @type {Input} */
      const temp = newVariableInput(addVariable(stage, variables.temp));

      /** @type {Block} */
      const setVariable = addBlock(
        newSetVariable(target, variable, temp, next)
      );

      /** Updating the the the orginal block its next and parameter
       * @type {Block}*/
      const setEffect = addBlock(
        newBlock(target, "sound_seteffectto", {
          next: setVariable.id,
          inputs: { VALUE: temp },
          fields: { EFFECT },
        })
      );

      // If we are changing the value we need to add the current value to the given value
      if (isChange)
        VALUE = newBlockInput(
          addBlock(newAddition(newVariableInput(variable), VALUE, target)).id
        );

      /** @type {[Number, Number]} */
      const clampValues = isPitch ? [-360, 360] : [-100, 100];

      /** @type {ProcedureInfo} */
      const { call } = addClampProcedure(stage, target, VALUE, ...clampValues);

      // Updating the orgin block to the procedure call block
      updateBlock({ ...call, next: setEffect.id }, id);
    };
  }

  /** @type {BlockConverter} */
  function convertStopIf({ id, inputs: { OPERAND }, fields }, { target }) {
    // Creating the internal stop block
    const stop = addBlock(newBlock(target, "control_stop", { fields }));

    // Updating the orgin block to a if block with a nested stop block
    updateBlock(
      newBlock(target, "control_if", {
        id,
        inputs: {
          CONDITION: OPERAND,
          SUBSTACK: newInput(stop.id),
        },
        // Making sure any old field is removed
        fields: {},
      })
    );
  }

  /** Creates a wait block with the given duration
   * @param {Number} duration
   * @returns {BlockConverter} */
  function convertWaitAny(duration) {
    /** @type {BlockConverter} */
    return function ({ id, next }, { target }) {
      updateBlock(newWait(target, newValueInput(duration), next, id));
    };
  }

  /** Creates a simple list with the given items of setTimeStampCount
   * @param {Target} stage
   * @param {Boolean} [updateValue=false]
   * @returns {VariableField}
   */
  function newTimeStampsList(stage, updateValue = false) {
    const { timeStamps } = variables;
    return addVariable(
      stage,
      updateValue
        ? [timeStamps[0], Array(timeStampCount).fill("")]
        : timeStamps,
      false,
      variableTypes.lists
    );
  }

  /** Creates block that simply adds a current timestamp in seconds to the timestamps list
   * @param {Context} context
   * @param {Id} next
   * @param {Id} id
   * @returns {Block}
   */
  function newAddTimeStamp({ target, stage }, next, id) {
    return newSetListItem(
      target,
      newTimeStampsList(stage, true),
      newValueInput(timeStampCount),
      newBlockInput(addDaysSinceMultiply(target).id),
      next,
      id
    );
  }

  /** Creates a block that checks if the current time is not smaller than a given timestamp
   * @param {Context} context
   * @param {Input} seconds
   */
  function addHasTimerPassed({ stage, target }, seconds) {
    /** @type {Block} */
    const itemOfList = addItemOfList(
      target,
      newTimeStampsList(stage),
      newValueInput(timeStampCount)
    );

    /** @type {Block} */
    const subtract = addBlock(
      newSubtract(
        newBlockInput(addDaysSinceMultiply(target).id),
        newBlockInput(itemOfList.id),
        target
      )
    );

    /** @type {Block} */
    const lessThan = addBlock(
      newLessThan(newBlockInput(subtract.id), seconds, target)
    );

    return addBlock(newNot(lessThan.id, target));
  }

  /** Creates a repeat or wait until block that waits until a given timestamp has passed or the given condition is met
   * @returns {BlockConverter}
   * @param {Boolean} [isRepeat=true]
   * @param {Boolean} [hasCondition=true]
   */
  function convertWaitOrRepeatSeconds(isRepeat = true, hasCondition = true) {
    /** @type {BlockConverter} */
    return function (
      { id, next, inputs: { NUM, SUBSTACK, CONDITION } },
      context
    ) {
      // Simply increasing the time stamp count so we are using a unique index
      timeStampCount++;

      /** @type {Input} */
      let conditionInput = newBlockInput(addHasTimerPassed(context, NUM).id);

      // Wrapping the condition with an or when the block has a condition
      if (hasCondition)
        conditionInput = newBlockInput(
          addBlock(newOr(conditionInput, CONDITION, context.target)).id
        );

      // Creating the loop block where the code will be placed
      const repeatUntil = addBlock(
        newBlock(
          context.target,
          `control_${isRepeat ? "repeat" : "wait"}_until`,
          {
            next,
            inputs: {
              CONDITION: conditionInput,
              ...(isRepeat && { SUBSTACK }),
            },
          }
        )
      );

      // Updating the orgin block to the save timestamp block
      updateBlock(newAddTimeStamp(context, repeatUntil.id, id));
    };
  }

  /** Creates an if else block nested with either an if or an if else block
   * @returns {BlockConverter}
   * @param {boolean} [hasExtraElse=false]
   */
  function convertIfElseIf(hasExtraElse = false) {
    /** @type {BlockConverter} */
    return function (
      {
        id,
        inputs: { SUBSTACK, SUBSTACK2, SUBSTACK3, CONDITION1, CONDITION2 },
      },
      { target }
    ) {
      /** @type {Block} */
      const nested = addBlock(
        newBlock(target, `control_if${hasExtraElse ? "_else" : ""}`, {
          inputs: {
            CONDITION: CONDITION2,
            SUBSTACK: SUBSTACK2,
            ...(hasExtraElse && { SUBSTACK2: SUBSTACK3 }),
          },
        })
      );

      updateBlock(
        newBlock(target, "control_if_else", {
          id,
          inputs: {
            CONDITION: CONDITION1,
            SUBSTACK,
            SUBSTACK2: newInput(nested.id),
          },
        })
      );
    };
  }

  /** @type {BlockConverter} */
  function convertCreateClones(
    { id, inputs: { CLONE_OPTION, NUM } },
    { target }
  ) {
    /** @type {Id} */
    const repeatId = newId(target);

    /** @type {ProcedureArgument} */
    const count = newProcedureArgument(target, "count", "s");
    /** @type {ProcedureArgument} */
    const cloneTarget = newProcedureArgument(target, "target", "s");

    /** @type {ProcedureInfo} */
    const { call, creationCount } = addProcedure(
      target,
      "createClones",
      [count, cloneTarget],
      true,
      0,
      0,
      repeatId
    );

    // Only add the procedure call block 1 time
    if (creationCount <= 1) {
      /** Creating the menu block for the create clone block
       * @type {Block} */
      const menu = addBlock(
        newBlock(target, "control_create_clone_of_menu", { shadow: true })
      );

      /** Creating the create clone block that will be nested in the repeat block
       * @type {Block} */
      const createClone = addBlock(
        newBlock(target, "control_create_clone_of", {
          inputs: {
            CLONE_OPTION: newInput(cloneTarget.addReporter()[1], menu.id),
          },
        })
      );

      // Creating the repeat block that will be placed in the procedure
      addBlock(
        newBlock(target, "control_repeat", {
          id: repeatId,
          inputs: {
            TIMES: count.addReporter(),
            SUBSTACK: newInput(createClone.id),
          },
        })
      );
    }

    /** @type {Input} */
    const [inputType, shadowOrInput, shadow] = CLONE_OPTION;

    // Removing the menu block if an input is obscuring it
    if (inputType === 3) deleteBlock(target, /** @type {Id} */ (shadow));

    // Setting the inputs of the call block
    call.inputs[count.id] = NUM;
    call.inputs[cloneTarget.id] = newBlockInput(
      /** @type {Id} */ (shadowOrInput)
    );

    // Updating the orgin block to the procedure call block
    updateBlock(call, id);
  }

  /** @type {BlockConverter} */
  function convertCloneTargetsMenu(
    { id, fields: { CLONE_TARGETS } },
    { target }
  ) {
    // Checking if the menu block has not been deleted by the convertCreateClones function
    if (target.blocks[id] == null) return;

    updateBlock(
      newBlock(target, "control_create_clone_of_menu", {
        id,
        fields: { CLONE_OPTION: CLONE_TARGETS },
        shadow: false,
      })
    );
  }

  /** Creates a simple list with the given items of setTimeStampCount
   * @param {Target} stage
   * @param {String} script
   * @returns {VariableField}
   */
  function newPauzedScriptsList(stage, script) {
    const { pauzedScripts } = variables;

    /** @type {Number} */
    let index = scriptIndexes[script];

    /** @type {Boolean} */
    const hasIndex = index != null;

    // Setting the new index and updated the index apropiatly
    if (!hasIndex) scriptIndexes[script] = index = ++scriptsCount;

    return addVariable(
      stage,
      hasIndex ? pauzedScripts : [pauzedScripts[0], Array(index).fill("0")],
      false,
      variableTypes.lists
    );
  }

  /** Creates block that simply adds a current timestamp in seconds to the timestamps list
   * @param {Context} context
   * @param {String} script
   * @param {Boolean} isPauze
   * @returns {Block}
   */
  function newPauzeOrResumeScript({ target, stage }, script, isPauze) {
    return newSetListItem(
      target,
      newPauzedScriptsList(stage, script),
      newValueInput(scriptsCount),
      newValueInput(isPauze ? 1 : 0)
    );
  }

  /** simply sets it pauzedScripts value to 1 on for pauzing and 0 for resuming
   * @returns {BlockConverter}
   * @param {Boolean} [isPauze=true]
   * @param {Boolean} [deleteField=true]
   * */
  function convertPauzeOrResumeScript(isPauze = true, deleteField = true) {
    /** @type {BlockConverter} */
    return function ({ id, inputs: { SCRIPT } }, context) {
      updateBlock(
        newPauzeOrResumeScript(
          context,
          getCustomFieldValue(context.target, SCRIPT, deleteField),
          isPauze
        ),
        id
      );
    };
  }

  /** Checks if the given script is pauzed or playing
   * @param {Context} context
   * @param {Inputs} inputs
   * @param {Boolean} isPauzed
   */
  function newIsPauzedComparison({ target, stage }, { SCRIPT }, isPauzed) {
    /** @type {String} */
    const script = getCustomFieldValue(target, SCRIPT);

    /** @type {Block} */
    const itemOfList = addItemOfList(
      target,
      newPauzedScriptsList(stage, script),
      newValueInput(scriptsCount)
    );

    return newEquals(
      newBlockInput(itemOfList.id),
      newValueInput(isPauzed ? 1 : 0),
      target
    );
  }

  /** Waits until the pauzedScripts value is equal to 0
   * @type {BlockConverter} */
  function convertwaitUntilResumeScript({ id, inputs }, context) {
    updateBlock(
      newBlock(context.target, "control_wait_until", {
        id,
        inputs: {
          CONDITION: newInput(
            addBlock(newIsPauzedComparison(context, inputs, false)).id
          ),
        },
      })
    );
  }

  /** Checks if the the pauzedScripts value is equal to 1
   * @type {BlockConverter} */
  function convertIsScriptPaused({ inputs, id }, context) {
    updateBlock(newIsPauzedComparison(context, inputs, true), id);
  }

  /** Uses a previously defined block converters to convert a pauze block to a wait until block
   * @type {BlockConverter} */
  function convertPauzeAndWaitUtilResumeScript(block, context) {
    /** @type {Block} */
    const { id, next, inputs } = block;

    /** @type {Block} */
    const temp = addBlock(newBlock(context.target, "temp", { next, inputs }));

    // Updating the next property of the pauze or resume block
    context.target.blocks[id].next = temp.id;
    convertPauzeOrResumeScript(true, false)(block, context);

    // Using the temp block to reuse the converter functions
    convertwaitUntilResumeScript(temp, context);
  }

  /** Creates a simple list with the given items of setTimeStampCount
   * @param {Target} stage
   * @param {String} timerName
   * @returns {[timers: VariableField, timerActive: VariableField]}
   */
  function newTimerLists(stage, timerName) {
    const { timers, timersActive } = variables;

    /** @type {Number} */
    let index = timerIndexes[timerName];

    /** @type {Boolean} */
    const hasIndex = index != null;

    // Setting the new index and updated the index apropiatly
    if (!hasIndex) timerIndexes[timerName] = index = ++timerCount;

    /** Creates a list for the given list information
     * @param {VariableValue} list
     * @returns {VariableField} */
    function createList(list) {
      return addVariable(
        stage,
        hasIndex ? list : [list[0], Array(index).fill("0")],
        false,
        variableTypes.lists
      );
    }

    // Returning both the timers and the timerActive lists
    return [createList(timers), createList(timersActive)];
  }

  /** The input that support conversion form days to seconds
   * @type {Input<1>} */
  const daysMultiplier = newValueInput(86400);

  /** @type {BlockConverter} */
  function convertTimeTimer({ id, inputs: { TIMER } }, context) {
    /** @type {String} */
    const timerName = getCustomFieldValue(context.target, TIMER);

    updateBlock(newSecondsSinceMath(context, timerName), id);
  }

  /** Creates a new block that checks if the timerActive variable is equal to 86400
   * @type {BlockConverter} */
  function convertIsTimerActive({ id, inputs: { TIMER } }, { target, stage }) {
    /** @type {String} */
    const timerName = getCustomFieldValue(target, TIMER);

    /** @type {Block} */
    const activeItem = addItemOfList(
      target,
      newTimerLists(stage, timerName)[1],
      newValueInput(timerIndexes[timerName])
    );

    updateBlock(
      newEquals(newBlockInput(activeItem.id), daysMultiplier, target),
      id
    );
  }

  /** Creates a block for the seconds since 2000
   * @type {TimerInputCreator}
   */
  function startTimeCreator({ target }, _) {
    return addDaysSinceMultiply(target);
  }

  /** Creates a block for the current time but in the negative form
   * @type {TimerInputCreator}
   */
  function stopTimeCreator(context, timerName) {
    /** Creating the input for the outher multiply block
     * @type {Block} */
    const secondsSince = addBlock(newSecondsSinceMath(context, timerName));

    // Creating the outer multiply that multiplies the timer time by -1
    return addBlock(
      newMultiply(
        newBlockInput(secondsSince.id),
        newValueInput(-1),
        context.target
      )
    );
  }

  /** Set the values of the timer values based on the given inputs
   * @typedef {(context: Context, timerName: String) => Block} TimerInputCreator
   *
   * @param {TimerInputCreator} timerInputCreator
   * @param {any} [timerActiveValue]
   * @returns {BlockConverter}
   */
  function convertSetTimerValues(timerInputCreator, timerActiveValue) {
    /** @type {BlockConverter} */
    return function ({ id, next, inputs: { TIMER } }, context) {
      /** @type {Context} */
      const { target, stage } = context;

      /** @type {Id} */
      const setTimerActiveId = newId(target);

      /** @type {String} */
      const timerName = getCustomFieldValue(target, TIMER);

      /** @type {[VariableField, VariableField]} */
      const [timer, timerActive] = newTimerLists(stage, timerName);

      /** @type {Input<1>} */
      const timerIndex = newValueInput(timerIndexes[timerName]);

      // Setting the timer active variable to 86400 (Used for multiplication and comparison)
      addBlock(
        newSetListItem(
          target,
          timerActive,
          timerIndex,
          newValueInput(timerActiveValue ?? daysMultiplier[1][1]),
          next,
          setTimerActiveId
        )
      );

      // Setting the timer to the result of the multiplacation
      updateBlock(
        newSetListItem(
          target,
          timer,
          timerIndex,
          newBlockInput(timerInputCreator(context, timerName).id),
          setTimerActiveId,
          id
        )
      );
    };
  }

  /** Creates a block that checks if the the timer is inactive then start the timer again
   * @type {BlockConverter} */
  function convertContinueTimer({ id, inputs: { TIMER } }, context) {
    /** @type {Context} */
    const { target, stage } = context;

    /** @type {String} */
    const timerName = getCustomFieldValue(target, TIMER, false);

    /** @type {Block} */
    const itemOfList = addItemOfList(
      target,
      newTimerLists(stage, timerName)[1],
      newValueInput(timerIndexes[timerName])
    );

    // Creating the compare statment for the if block
    const equals = addBlock(
      newEquals(newBlockInput(itemOfList.id), newValueInput(0), target)
    );

    // Creating a temporary block so the the convertSetTimerValues function can be used and stored as the if its code
    const nested = addBlock(newBlock(target, "temp", { inputs: { TIMER } }));
    convertSetTimerValues(
      (_, a) => addBlock(newSecondsSinceMath(context, timerName, null, true))
      // Exposing the timer input
    )(nested, context);

    updateBlock(
      newBlock(target, "control_if", {
        id,
        inputs: {
          CONDITION: newInput(equals.id),
          SUBSTACK: newInput(nested.id),
        },
      })
    );
  }

  /** Adds the given input to active timer seconds since 2000
   * @type {BlockConverter} */
  function convertSetTimer({ id, next, inputs: { NUM, TIMER } }, context) {
    /** @type {String} */
    const timerName = getCustomFieldValue(context.target, TIMER);

    /** @type {Block} */
    const secondsSince = addBlock(newSecondsSinceMath(context, timerName, NUM));

    updateBlock(
      newSetListItem(
        context.target,
        newTimerLists(context.stage, timerName)[0],
        newValueInput(timerIndexes[timerName]),
        newBlockInput(secondsSince.id),
        next,
        id
      )
    );
  }

  /** Adds subtracts the given value from the timer variable
   * @type {BlockConverter} */
  function convertChangeTimer(
    { id, next, inputs: { NUM, TIMER } },
    { target, stage }
  ) {
    /** @type {String} */
    const timerName = getCustomFieldValue(target, TIMER);

    /** @type {VariableField} */
    const timer = newTimerLists(stage, timerName)[0];

    /** @type {Input<1>} */
    const timerIndex = newValueInput(timerIndexes[timerName]);

    /** @type {Block} */
    const subtract = addBlock(
      newSubtract(
        newBlockInput(addItemOfList(target, timer, timerIndex).id),
        NUM,
        target
      )
    );

    updateBlock(
      newSetListItem(
        target,
        timer,
        timerIndex,
        newBlockInput(subtract.id),
        next,
        id
      )
    );
  }

  /** @type {BlockConverter} */
  function convertCurrentMillisecond({ id }, { target }) {
    /** @type {Block} */
    const multiplier = addDaysSinceMultiply(target, newValueInput("864e5"));
    /** @type {Block} */
    const mod = addBlock(
      newMod(newBlockInput(multiplier.id), newValueInput("1e3"), target)
    );

    updateBlock(newMathOp(target, newBlockInput(mod.id), id));
  }

  /** Creates and add the isDraggable variable to the target
   * @param {Target} target
   * @returns {VariableField}
   */
  function addDragModeVariable(target) {
    /** @type {VariableValue} */
    const isDraggable = [
      variables.isDraggable[0],
      target.draggable && !target.isStage ? 1 : 0,
    ];

    return addVariable(target, isDraggable, true);
  }

  /** Simply checks if the isDraggable variable is 1
   * @type {BlockConverter} */
  function convertIsDraggable({ id }, { target }) {
    updateBlock(
      newEquals(
        newVariableInput(addDragModeVariable(target)),
        newValueInput(1),
        target,
        id
      )
    );
  }

  /** Keeps the orginal sensing_setdragmode block and adds a set variable block to keep the state
   * @type {BlockConverter} */
  function convertSetDragMode({ id, next, fields: { DRAG_MODE } }, { target }) {
    const setDragModeTo = addBlock(
      newSetVariable(
        target,
        addDragModeVariable(target),
        // Only set the state to the correct value when the sprite is not the stage
        newValueInput(DRAG_MODE[0] === "draggable" && !target.isStage ? 1 : 0),
        next
      )
    );

    // Updating the orginal block to a set the correct next block
    target.blocks[id].next = setDragModeTo.id;
  }

  /**
   * Wrapper to create a comparison converter with the given innerComparisonBlock
   * @param {NewCompareFunction} newCompare - this function greates a new comparison to keep this converter dynamic
   * @returns {BlockConverter}
   */
  function convertComparison(newCompare) {
    /**
     * Converts the block to a not block with a nested equal block
     * @type {BlockConverter}
     */
    return function ({ id, inputs: { OPERAND1, OPERAND2 } }, { target }) {
      /** @type {Block} */
      const compare = addBlock(newCompare(OPERAND1, OPERAND2, target));
      originToNot(target, id, compare.id);
    };
  }

  /**
   * Converts the approximate equal block to a not block with a nested greater than block that checks if the difference is greater than the given value
   * @type {BlockConverter}
   */
  function convertApproximatelyEqualTo(
    { id, inputs: { NUM1, NUM2, PRECISION } },
    { target }
  ) {
    /** @type {Id} */
    const greaterThanId = newId(target);
    /** @type {Id} */
    const absBlockId = newId(target);

    /** @type {Block} */
    const subtract = addBlock(newSubtract(NUM1, NUM2, target));

    addAbs(target, newBlockInput(subtract.id), absBlockId);

    addBlock(
      newGreaterThan(
        newBlockInput(absBlockId),
        PRECISION,
        target,
        greaterThanId
      )
    ).id;
    originToNot(target, id, greaterThanId);
  }

  /**
   * Converts the absolute equal block to an equals block with absolute bocks as operands
   * @type {BlockConverter}
   */
  function convertAbsoluteEqualTo({ id, inputs: { NUM1, NUM2 } }, { target }) {
    updateBlock(
      newEquals(
        newBlockInput(addAbs(target, NUM1).id),
        newBlockInput(addAbs(target, NUM2).id),
        target,
        id
      )
    );
  }

  /** Wrapper for any block that needs to check the mod result of two values
   * @type {BlockConverter}*/
  function converModResultOfEquals(
    { id, inputs: { NUM1, NUM2 }, fields: { OPTION } },
    { target }
  ) {
    /** Default to two for the odd and even checks
     * @type {Block} */
    const mod = addBlock(newMod(NUM1, NUM2 ?? newValueInput(2), target));

    /** @type {Block} */
    const eqauls = newEquals(
      newBlockInput(mod.id),
      // Default to 0 for the multiple of checks
      newValueInput(OPTION?.[0] ?? 0),
      target,
      id
    );
    // Making sure the old field is removed
    eqauls.fields = {};

    updateBlock(eqauls);
  }

  /** Checks if the mod on the given value of 1 is equal to 0 or not
   * @type {BlockConverter}
   */
  function convertIsNumberOfType(
    { id, inputs: { NUM }, fields: { TYPE } },
    { target }
  ) {
    /** @type {Boolean} */
    const hasNot = TYPE[0] === "float";

    /** @type {Block} */
    const mod = addBlock(newMod(NUM, newValueInput(1), target));
    /** @type {Block} */
    const equals = newEquals(
      newBlockInput(mod.id),
      newValueInput(0),
      target,
      hasNot ? newId(target) : id
    );
    // Making sure the old field is removed
    equals.fields = {};

    // The orgin must be not when the type is float
    if (hasNot) {
      addBlock(equals);
      originToNot(target, id, equals.id);
      // Making sure the old field is removed
      target.blocks[id].fields = {};
      return;
    }

    updateBlock(equals);
  }

  /** if the option is positive or negative it will create a greater than or less than block else it will create an equals block
   * @type {BlockConverter}*/
  function convertNumberIs(
    { id, inputs: { NUM }, fields: { OPTION } },
    { target }
  ) {
    /** @type {String} */
    const option = OPTION[0];

    const isPositive = option === "positive";
    const isNegative = option === "negative";

    /** @type {NewCompareFunction} */
    const compareFunction = isPositive
      ? newGreaterThan
      : isNegative
        ? newLessThan
        : newEquals;

    /** @type {Input} */
    const valueInput = newValueInput(isPositive || isNegative ? 0 : option);

    /** @type {Block} */
    const compareBlock = compareFunction(NUM, valueInput, target, id);
    // Making sure the old field is removed
    compareBlock.fields = {};

    updateBlock(compareBlock);
  }

  /**
   * Wrapper to convert the xor and xnor blocks
   * @param {Boolean} [isNot=false]
   * @returns {BlockConverter}
   */
  function convertXorOperator(isNot = false) {
    /**
     * Converts the block to to an equals block with a nested add or subtract block
     * @type {BlockConverter}
     */
    return function ({ id, inputs: { OPERAND1, OPERAND2 } }, { target }) {
      /** @type {Block} */
      const equals = newEquals(
        OPERAND1 ?? newValueInput(0),
        OPERAND2 ?? newValueInput(0),
        target,
        isNot ? id : null
      );

      if (isNot) updateBlock(equals);
      else {
        addBlock(equals);
        originToNot(target, id, equals.id);
      }
    };
  }

  /**
   * Takes the orginal input and places it as the first input of a mutiplty by -1 block
   * @type {BlockConverter}
   */
  function convertNumberInverse({ inputs: { NUM }, id }, { target }) {
    updateBlock(newMultiply(NUM, newValueInput(-1), target, id));
  }

  /**
   * Converts the block to a division block with a floor block
   * @type {BlockConverter}
   */
  function convertFloorDivision({ inputs: { NUM1, NUM2 }, id }, { target }) {
    /** @type {Block} */
    const divide = addBlock(newDivide(NUM1, NUM2, target));
    updateBlock(newMathOp(target, newBlockInput(divide.id), id));
  }

  /**
   * Wrapper that multiplies the operands by the precision then adds or subtracts them and finally divides the result by the precision
   * @param {Boolean} [isSubtraction=false] - Define if the block should add or subtract
   * @returns {BlockConverter}
   */
  function convertSafeFloatMath(isSubtraction = false) {
    /**
     * @type {BlockConverter}
     */
    return function ({ id, inputs: { NUM1, NUM2, PRECISION } }, { target }) {
      // Getting the multiplier, a power of 10 based on the given value
      /** @type {Number} */
      const precision = parseInt(getCustomFieldValue(target, PRECISION));
      const multiplier = precision > 1 ? `1e${precision}` : 10;

      // Creating the id beforehand so it can be used in the multiplier blocks
      /** @type {Id}*/
      const mathOperatorBlockId = newId(target);

      /**
       * Creates a multiplier block and created an input from the returned block info
       * @param {Input} input
       * @returns {Input}
       */
      function createMultiplyInput(input) {
        return newBlockInput(
          addBlock(newMultiply(input, newValueInput(multiplier), target)).id
        );
      }

      // Creating the core math block with the multiplier blocks as inputs
      addBlock(
        (isSubtraction ? newSubtract : newAddition)(
          createMultiplyInput(NUM1),
          createMultiplyInput(NUM2),
          target,
          mathOperatorBlockId
        )
      );

      // Updating the orgin block to a division block with the math operator block as input
      updateBlock(
        newDivide(
          newBlockInput(mathOperatorBlockId),
          newValueInput(multiplier),
          target,
          id
        )
      );
    };
  }

  /** Simply calculates the given percentage of the given value
   * @type {BlockConverter} */
  function convertPercentageOf(
    { id, inputs: { NUM, PERCENTAGE } },
    { target }
  ) {
    const divide = addBlock(newDivide(NUM, newValueInput(100), target));
    updateBlock(newMultiply(newBlockInput(divide.id), PERCENTAGE, target, id));
  }

  /** Simply calculates how much percent the first value is of the second
   * @type {BlockConverter} */
  function convertIsPercentageOf({ id, inputs: { NUM1, NUM2 } }, { target }) {
    const divide = addBlock(newDivide(newValueInput(100), NUM2, target));
    updateBlock(newMultiply(newBlockInput(divide.id), NUM1, target, id));
  }

  /**
   * Converts the true block to an empty not block
   * @type {BlockConverter}
   */
  function convertTrue({ id }, { target }) {
    originToNot(target, id, null);
  }

  /**
   * Converts the false block to two nested not blocks
   * @type {BlockConverter}
   */
  function convertFalse({ id }, { target }) {
    originToNot(target, id, addBlock(newNot(null, target)).id);
  }

  /**
   * Converts block to an equals block with a nested random block that checks if the random number between 0 and 1 is equal to 1
   * @type {BlockConverter}
   */
  function convertRandom({ id }, { target }) {
    /** @type {Block} */
    const random = addBlock(
      newBlock(target, "operator_random", {
        inputs: {
          FROM: newValueInput(0),
          TO: newValueInput(1),
        },
      })
    );

    updateBlock(
      newEquals(newBlockInput(random.id), newValueInput(1), target, id)
    );
  }

  /**
   * Creates an equals block that tests if the string is equal to "true"
   * @type {BlockConverter}
   */
  function convertStringToBoolean({ id, inputs: { TEXT } }, { target }) {
    updateBlock(newEquals(TEXT, newValueInput(true), target, id));
  }

  /**
   * Creates an not block with a nested equals block that checks if the given value is equal to 0
   * @type {BlockConverter}
   */
  function convertNumberToBoolean({ id, inputs: { NUM } }, { target }) {
    /** @type {Block} */
    const equals = addBlock(newEquals(NUM, newValueInput(0), target));
    originToNot(target, id, equals.id);
  }

  /**
   * Wrapper that makes it easy to convert different types of inputs
   * @param {String} inputName
   * @param {Boolean} [isNumber=false]
   * @returns {BlockConverter}
   */
  function convertTypeBlock(inputName, isNumber = false) {
    /**
     * Creates a addition or join block with the given input as the first value
     * @type {BlockConverter}
     */
    return function ({ id, inputs }, { target }) {
      const blockConverter = isNumber ? newAddition : newJoin;
      updateBlock(
        blockConverter(inputs[inputName], newValueInput(""), target, id)
      );
    };
  }

  /** Creates two nested join reporters with the given values
   * @type {BlockConverter} */
  function convertTripleJoin(
    { id, inputs: { TEXT1, TEXT2, TEXT3 } },
    { target }
  ) {
    const nestedJoin = addBlock(newJoin(TEXT1, TEXT2, target));
    updateBlock(newJoin(newBlockInput(nestedJoin.id), TEXT3, target, id));
  }

  /**
   * Wrapper that makes it easy to create an infinity or NaN converter
   * @param {Boolean} [isInfinity=false]
   * @returns {BlockConverter}
   */
  function convertDivision(isInfinity = false) {
    /**
     * Creates a division block that divides 1 by 0 to create a infinity block
     * @type {BlockConverter}
     */
    return function ({ id }, { target }) {
      updateBlock(
        newDivide(
          newValueInput(isInfinity ? 1 : 0),
          newValueInput(0),
          target,
          id
        )
      );
    };
  }

  /**
   * Wrapper that makes it easy to create mathematical symbol definitions
   * @param {Number} value
   * @returns {BlockConverter}
   */
  function convertAddition(value) {
    /**
     * Creates a static number block with the given value
     * @type {BlockConverter}
     */
    return function ({ id }, { target }) {
      updateBlock(
        newAddition(newValueInput(value), newValueInput(""), target, id)
      );
    };
  }

  /** Creates an event block to check if the timer is greater than one of the flipper variables
   * @param {Target} target
   * @param {Target} stage
   * @param {Id} next
   * @param {Number} [x=0]
   * @param {Number} [y=0]
   * @param {boolean} [isFirst=true]
   */
  function addFlipper(target, stage, next, x = 0, y = 0, isFirst = true) {
    /** @type {VariableField} */
    const variable = addVariable(stage, variables[`flipper${isFirst ? 1 : 2}`]);

    return addBlock(
      newTimerGreaterThan(target, next, newVariableInput(variable), x, y)
    );
  }

  /** Creates the core flippers that will create an infinite loop even when the project is stopped
   * @param {Target} stage
   * @returns {void}
   */
  function addCoreFlippers(stage) {
    /** @type {VariableField} */
    const flipper1 = addVariable(stage, variables.flipper1);
    /** @type {VariableField} */
    const flipper2 = addVariable(stage, variables.flipper2);

    /**
     * Creates a flips the flipper variables between Infinity and -1
     * @param {Boolean} isFirst
     * @param {Number} x
     * @param {Number} y
     * @param {boolean} [isFix=false] This represents the fix flipper that triggers on -1
     * @returns {void}
     */
    function addCoreflipper(isFirst, x, y, isFix = false) {
      /**
       * Creates a new set variable block with Infinity or -1 as the value
       * @param {VariableField} flipper
       * @param {Boolean} isFirstSet
       * @param {Id} [next]
       * @returns {Block}
       */
      function setFlipperTo(flipper, isFirstSet, next, isFix = false) {
        /** @type {Input} */
        const value = isFix
          ? newVariableInput(isFirstSet ? flipper2 : flipper1)
          : newValueInput(isFirstSet ? Infinity : -1);
        return addBlock(newSetVariable(stage, flipper, value, next));
      }

      /** @type {Block} */
      const setFlipper2 = setFlipperTo(flipper2, !isFirst, undefined, isFix);
      /** @type {Block} */
      const { id } = setFlipperTo(flipper1, isFirst, setFlipper2.id, isFix);

      if (isFix)
        addBlock(newTimerGreaterThan(stage, id, newValueInput(-1), x, y));
      else addFlipper(stage, stage, id, x, y, isFirst);
    }

    addCoreflipper(true, 0, 0);
    addCoreflipper(false, 400, 0);
    addCoreflipper(false, 800, 0, true);
  }

  /** Converts the the fps or delata time block to their their respactable location
   * And creates the backing fps and delata time calculation code in the stage
   * @param {Boolean} [isDelataTime=false]
   * @returns {BlockConverter}*/
  function convertFpsOrDeltaTime(isDelataTime = false) {
    return function (block, { target, stage }) {
      // Creating the variable fields
      const deltaTimeField = addVariable(stage, variables.delataTime);
      const fpsField = addVariable(stage, variables.fps);

      /** Creating the global variable
       * @type {VariableField} */
      const variableField = isDelataTime ? deltaTimeField : fpsField;

      // Swapping the delata time or fps block with the variable
      swapBlockWithVariable(target, variableField, block);

      /** Pre creating the wait block id so it can be set as the next block of the procedure
       * @type {Id} */
      const waitId = newId(target);

      /** @type {ProcedureArgument} */
      const lastTime = newProcedureArgument(stage, "lastTime", "s");

      /** @type {ProcedureInfo} */
      const { call, creationCount } = addProcedure(
        stage,
        "FPS",
        [lastTime],
        false,
        0,
        550,
        waitId
      );

      // Only create the procedure once
      if (creationCount > 1) return;

      addCoreFlippers(stage);

      /** @type {Block} */
      const broadcastFrame1 = addBlock(
        newBroadcast(stage, stage, variables.frame1)
      );
      /** @type {Block} */
      const broadcastFrame2 = addBlock(
        newBroadcast(stage, stage, variables.frame2)
      );

      // Adding the flipper listeners
      addFlipper(stage, stage, broadcastFrame1.id, 0, 200);
      addFlipper(stage, stage, broadcastFrame2.id, 400, 200, false);

      /** @type {Block} */
      const call1 = addBlock({
        ...call,
        inputs: { [lastTime.id]: addDaysSince2000(stage) },
      });
      /** @type {Block} */
      const call2 = addBlock({
        ...call,
        id: newId(stage),
        inputs: { [lastTime.id]: addDaysSince2000(stage) },
      });

      addBlock(
        newBroadcastRevieved(stage, stage, variables.frame1, 0, 350, call1.id)
      );
      addBlock(
        newBroadcastRevieved(stage, stage, variables.frame2, 400, 350, call2.id)
      );

      /** @type {Block} */
      const divide = addBlock(
        newDivide(newValueInput(1), newVariableInput(deltaTimeField), stage)
      );

      /** @type {Block} */
      const setFps = addBlock(
        newSetVariable(stage, fpsField, newBlockInput(divide.id))
      );

      /** @type {Block} */
      const subtract = addBlock(
        newSubtract(addDaysSince2000(stage), lastTime.addReporter(), stage)
      );

      /** @type {Block} */
      const multiply = addBlock(
        newMultiply(newBlockInput(subtract.id), daysMultiplier, stage)
      );

      /** @type {Block} */
      const setDeltaTime = addBlock(
        newSetVariable(
          stage,
          deltaTimeField,
          newBlockInput(multiply.id),
          setFps.id
        )
      );

      addBlock(newWait(stage, newValueInput("1e-16"), setDeltaTime.id, waitId));
    };
  }

  /** Creates an new comment with the value from the given custom field
   * @param {Target} target
   * @param {Id} blockId
   * @param {Input} input
   * @returns {[Id, Comment] | []} */
  function createCustomFieldComment(target, blockId, input) {
    /** @type {[Id, Comment] | []} */
    const [id, comment] = getCommentByBlockId(target, blockId);
    if (id == null) return [];

    // Updating the comment
    return addComment(
      target,
      blockId,
      getCustomFieldValue(target, input),
      comment.x,
      comment.y,
      id
    );
  }

  /** Creates an empty (defaulted values) mutation object with a given name
   * @param {String} name
   * @returns {Mutation}
   */
  function newNameMutation(name) {
    return {
      argumentids: "[]",
      proccode: name,
      tagName: "mutation",
      children: [],
      warp: "false",
    };
  }

  /** @type {BlockConverter} */
  function convertHatComment({ id, next, inputs: { COMMENT } }, { target }) {
    // Updating the comment content
    createCustomFieldComment(target, id, COMMENT);

    updateBlock(newTimerGreaterThan(target, next, newValueInput(Infinity)), id);
  }

  /** @type {BlockConverter} */
  function convertCommandComment({ id, inputs: { COMMENT } }, { target }) {
    // Updating the comment content
    createCustomFieldComment(target, id, COMMENT);

    // Creating a procedure call block that does nothing
    updateBlock(
      newBlock(target, "procedures_call", {
        mutation: newNameMutation("//"),
        id,
        // Making sure the old input is removed
        inputs: {},
      })
    );
  }

  /** @type {BlockConverter} */
  function convertCComment({ id, inputs: { COMMENT, SUBSTACK } }, { target }) {
    // Updating the comment content
    createCustomFieldComment(target, id, COMMENT);

    updateBlock(
      newBlock(target, "control_if", {
        id,
        inputs: {
          CONDITION: newInput(addBlock(newNot(null, target)).id),
          SUBSTACK,
        },
      })
    );
  }

  /** @type {BlockConverter} */
  function convertReporterComment(
    { id, inputs: { COMMENT, OPERAND } },
    { target }
  ) {
    // Updating the comment content
    createCustomFieldComment(target, id, COMMENT);
    updateBlock(newJoin(OPERAND, newValueInput(""), target, id));
  }

  /** @type {BlockConverter} */
  function convertBooleanComment(
    { id, inputs: { COMMENT, OPERAND } },
    { target }
  ) {
    // Updating the comment content
    createCustomFieldComment(target, id, COMMENT);
    updateBlock(newOr(OPERAND, undefined, target, id));
  }

  /** Takes in a block and removes the current block with all its block inputs
   * @type {InputBlockHandler} */
  function recusiveRemove(target, id, _) {
    runCodeForInputBlocks(target, target.blocks[id], recusiveRemove);
    deleteBlock(target, id);
  }

  /** Removes all the blocks from the substack if present and removes the current block
   * @type {BlockConverter} */
  function convertRemoveOnCompile({ inputs: { SUBSTACK }, id }, { target }) {
    // Removing the substack blocks if present
    if (typeof SUBSTACK?.[1] === "string")
      recusiveRemove(target, SUBSTACK[1], null);

    // Replacing the orginal block with a non working procedure to show where the old code would be resided
    updateBlock(
      newBlock(target, "procedures_call", {
        mutation: newNameMutation("Compilation removed code"),
        // Making sure any old input is removed
        inputs: {},
        id,
      })
    );
  }

  /** Creates an if block with a not operator to always run the code when compiled
   * The else code will be removed
   * @type {BlockConverter} */
  function convertIfCompiledElse(
    { inputs: { SUBSTACK, SUBSTACK2 }, id },
    { target }
  ) {
    // Removing the substack blocks if present
    if (typeof SUBSTACK2?.[1] === "string")
      recusiveRemove(target, SUBSTACK2[1], null);

    updateBlock(
      newBlock(target, "control_if", {
        id,
        inputs: {
          CONDITION: newInput(addBlock(newNot(null, target)).id),
          SUBSTACK,
        },
      })
    );
  }

  /**
   * This functions converts any menu into a simle join block
   * @type {BlockConverter}
   */
  function convertMenuBlock({ id, fields }, { target }) {
    /** Grabbing the first field value
     * @type {String} */
    const menuValue = Object.values(fields)[0][0];

    /** @type {Block} */
    const join = newJoin(
      newValueInput(menuValue),
      newValueInput(""),
      target,
      id
    );
    // Making sure the old field is removed
    join.fields = {};

    // Simply a join with the menuvalue and an empty to only return the menu value
    updateBlock(join);
  }
})(window.Scratch);
