// Name: Hyper Sense
// ID: HyperSense2SP
// Description: Cool New Sensing Blocks
// By: SharkPool
// License: MIT

// Version 2.0.0

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Hyper Sense must run unsandboxed");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDUuMjkzIiBoZWlnaHQ9IjE0NS4yOTMiIHZpZXdCb3g9IjAgMCAxNDUuMjkzIDE0NS4yOTMiPjxnIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTAgNzIuNjQ3QzAgMzIuNTI1IDMyLjUyNSAwIDcyLjY0NyAwczcyLjY0NyAzMi41MjUgNzIuNjQ3IDcyLjY0Ny0zMi41MjUgNzIuNjQ3LTcyLjY0NyA3Mi42NDdTMCAxMTIuNzY5IDAgNzIuNjQ3IiBmaWxsPSIjNDI3Zjk5Ii8+PHBhdGggZD0iTTguMDkxIDcyLjY0N2MwLTM1LjY1MyAyOC45MDMtNjQuNTU2IDY0LjU1Ni02NC41NTZzNjQuNTU2IDI4LjkwMyA2NC41NTYgNjQuNTU2LTI4LjkwMyA2NC41NTYtNjQuNTU2IDY0LjU1NlM4LjA5MSAxMDguMyA4LjA5MSA3Mi42NDciIGZpbGw9IiM1Y2IxZDYiLz48cGF0aCBkPSJNMTA2LjIxNSAxMDguODg0YTIuNjcgMi42NyAwIDAgMS0xLjg4Ni0uNzhMMzcuNzUgNDEuNTIyYTIuNjcgMi42NyAwIDAgMSAwLTMuNzcyIDIuNjcgMi42NyAwIDAgMSAzLjc3MiAwbDY2LjU4IDY2LjU4YTIuNjY5IDIuNjY5IDAgMCAxLTEuODg3IDQuNTU0IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTY1Ljc1NCA1MS4wODNjMCA4LjEwMy02LjU2OCAxNC42NzEtMTQuNjcxIDE0LjY3MXMtMTQuNjcxLTYuNTY4LTE0LjY3MS0xNC42N2MwLTguMTA0IDYuNTY4LTE0LjY3MiAxNC42Ny0xNC42NzIgOC4xMDQgMCAxNC42NzIgNi41NjggMTQuNjcyIDE0LjY3MSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik02My43MiA4MS4zNzFjLTcuODg1LTEuODYyLTEyLjc2OS05Ljc2NC0xMC45MDYtMTcuNjVzOS43NjQtMTIuNzY5IDE3LjY1LTEwLjkwNyAxMi43NjkgOS43NjUgMTAuOTA3IDE3LjY1Yy0xLjg2MiA3Ljg4Ni05Ljc2NSAxMi43Ny0xNy42NSAxMC45MDciIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNOTcuNzY3IDgzLjA5NGMwIDguMTAyLTYuNTcgMTQuNjczLTE0LjY3MyAxNC42NzNzLTE0LjY3Mi02LjU3LTE0LjY3Mi0xNC42NzMgNi41NjktMTQuNjcxIDE0LjY3Mi0xNC42NzFjOC4xMDIgMCAxNC42NzMgNi41NyAxNC42NzMgMTQuNjciIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTA2LjIxNSAxMDguODg0YTIuNjcgMi42NyAwIDAgMS0xLjg4Ni0uNzhsLTE2LjM0LTE2LjM0YTIuNjY1IDIuNjY1IDAgMCAxIDAtMy43NzMgMi42NyAyLjY3IDAgMCAxIDMuNzcyIDBsMTYuMzQgMTYuMzRhMi42NyAyLjY3IDAgMCAxIDAgMy43NzMgMi42OCAyLjY4IDAgMCAxLTEuODg2Ljc4IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTE1LjMxNSA3Mi42NDcgMjguMTIyIDU5Ljg0djI1LjYxNHptNzAuMTM5LTQ0LjUyNUg1OS44NGwxMi44MDctMTIuODA3em00NC41MjUgNDQuNTI1LTEyLjgwNyAxMi44MDdWNTkuODR6TTU5Ljg0IDExNy4xNzJoMjUuNjE0bC0xMi44MDcgMTIuODA3eiIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIvPjwvZz48L3N2Zz4=";

  const Cast = Scratch.Cast;
  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const render = vm.renderer;
  const sensingCore = runtime.ext_scratch3_sensing;
  const isPackaged = typeof scaffolding !== "undefined";

  const translatedKeys = [
    "any", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u",
    "v", "w", "x", "y", "z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "up arrow", "down arrow", "left arrow", "right arrow",
    "space", "enter", "shift", "control", "alt", "meta", "escape",
    "backspace", "tab", "caps lock", "insert", "delete", "page up", "page down",
    "`", "~", "!", "?", "@", "#", "$", "%", "^", "&", "*", "-", "_", "+", "=",
    "(", ")", "[", "]", "{", "}", "\\", "|", "/", "<", ">", ",", ".",
    "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12" 
  ].map((key) => {
    if (/^[a-z0-9 ]+$/i.test(key)) return { text: Scratch.translate(key), value: key };
    else return { text: key, value: key };
  });

  const keyData = {
    curKey: "",
    lastKey: "",
    keys: [],
    keyTimers: new Map(),
    keyBlockers: new Set()
  };

  const mouseData = {
    client: [0, 0],
    velocity: [0, 0],
    scroll: [0, 0],
    scrollVelocity: [0, 0]
  };

  /* undefined is default values */
  const askBoxSettings = {
    x: undefined, y: undefined,
    width: undefined,
    input: {
      type: undefined,
      value: undefined
    },
  };

  const validInputs = [
    { text: Scratch.translate("text"), value: "text" },
    { text: Scratch.translate("password"), value: "password" },
    { text: Scratch.translate("number"), value: "number" },
    { text: Scratch.translate("color"), value: "color" }
  ];

  let loudnessCache = [];

  class HyperSense2SP {
    constructor() {
      runtime.on("BEFORE_EXECUTE", () => {
        // key operations
        const keyTimers = keyData.keyTimers;
        keyTimers.forEach((value, key) => {
          keyTimers.set(key, value + 0.1);
        });
        runtime.startHats("HyperSense2SP_whenKey");

        // velocity application
        const { velocity, scrollVelocity } = mouseData;
        mouseData.velocity[0] += (0 - velocity[0]) / 3;
        mouseData.velocity[1] += (0 - velocity[1]) / 3;

        mouseData.scrollVelocity[0] += (0 - scrollVelocity[0]) / 4;
        mouseData.scrollVelocity[1] += (0 - scrollVelocity[1]) / 4;
      });

      window.addEventListener("keydown", (e) => {
        const key = this.toProperKey(e, false);
        keyData.curKey = key;
        keyData.lastKey = key;
        if (!keyData.keyTimers.has(key)) {
          keyData.keys.push(key);
          keyData.keyTimers.set(key, 0);
        }

        // if this is a blocked key, prevent default
        if (keyData.keyBlockers.has("any") || keyData.keyBlockers.has(key)) {
          e.preventDefault();
        }
      });
      window.addEventListener("keyup", (e) => {
        const key = this.toProperKey(e, false);
        const index = keyData.keys.indexOf(key);

        keyData.keyTimers.delete(key);
        keyData.keys.splice(index, 1);
        keyData.curKey = keyData.keys[0] || "";
      });

      document.addEventListener("wheel", (e) => {
        const oldScroll = mouseData.scroll;
        mouseData.scroll = [oldScroll[0] + e.deltaX, oldScroll[1] + e.deltaY];
        mouseData.scrollVelocity = [e.deltaX, e.deltaY];

        if (e.deltaX > 1) runtime.startHats("HyperSense2SP_whenScrolled", { DIR: "right" });
        else if (e.deltaX < -1) runtime.startHats("HyperSense2SP_whenScrolled", { DIR: "left" });

        if (e.deltaY > 1) runtime.startHats("HyperSense2SP_whenScrolled", { DIR: "up" });
        else if (e.deltaY < -1) runtime.startHats("HyperSense2SP_whenScrolled", { DIR: "down" });
      });
      document.addEventListener("mousemove", (e) => {
        mouseData.client = [e.clientX, e.clientY];
        mouseData.velocity = [
          runtime.ioDevices.mouse.getScratchX(),
          runtime.ioDevices.mouse.getScratchY()
        ];
      });
    }
    getInfo() {
      return {
        id: "HyperSense2SP",
        name: Scratch.translate("Hyper Sense"),
        color1: "#5cb1d6",
        color2: "#47a8d1",
        color3: "#2e8eb8",
        menuIconURI,
        blocks: [
          { blockType: Scratch.BlockType.LABEL, text: Scratch.translate("Scroll Dectection") },
          {
            opcode: "scrollValue",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("scroll [TYPE]"),
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "SCROLL_TYPES" }
            },
          },
          {
            opcode: "setScrollDist",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set scroll distance [POS] to [AMT]"),
            arguments: {
              POS: { type: Scratch.ArgumentType.STRING, menu: "POSITION" },
              AMT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "changeScrollDist",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("change scroll distance [POS] by [AMT]"),
            arguments: {
              POS: { type: Scratch.ArgumentType.STRING, menu: "POSITION" },
              AMT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            },
          },
          {
            opcode: "whenScrolled",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when scrolled [DIR]"),
            isEdgeActivated: false,
            arguments: {
              DIR: { type: Scratch.ArgumentType.STRING, menu: "SCROLL_EVENTS" }
            },
          },
          {
            opcode: "isScrolled",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is scrolling [TYPE] ?"),
            disableMonitor: true,
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "SCROLL_EVENTS" }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: Scratch.translate("Mouse Detection") },
          {
            opcode: "mouseClick",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is mouse [BUTTON] down?"),
            arguments: {
              BUTTON: { type: Scratch.ArgumentType.STRING, menu: "MOUSE_BUTTONS" }
            }
          },
          {
            opcode: "realMouse",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("real mouse [POS]"),
            arguments: {
              POS: { type: Scratch.ArgumentType.STRING, menu: "POSITION" }
            }
          },
          {
            opcode: "mouseVelocity",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("mouse velocity [POS]"),
            arguments: {
              POS: { type: Scratch.ArgumentType.STRING, menu: "POSITION" }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: Scratch.translate("Key Detection") },
          {
            opcode: "whenKey",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when [KEY] key [TYPE]"),
            isEdgeActivated: false,
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, menu: "KEYS" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "KEY_PRESS" }
            }
          },
          {
            opcode: "isKey",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("key [KEY] [TYPE] ?"),
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, menu: "KEYS" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "KEY_PRESS" }
            }
          },
          "---",
          {
            opcode: "currentKey",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[TYPE] pressed"),
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "KEY_LISTS" }
            }
          },
          {
            opcode: "timeKeyPressed",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("seconds [KEY] key pressed"),
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, menu: "KEYS" }
            }
          },
          "---",
          {
            opcode: "setKeyBlock",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("block default behaviour of key [KEY]"),
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, menu: "KEYS" }
            }
          },
          {
            opcode: "resetKeyBlocks",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("reset blocked key behaviours")
          },
          {
            opcode: "getKeyBlockers",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("blocked keys")
          },
          { blockType: Scratch.BlockType.LABEL, text: Scratch.translate("Touching Expanded") },
          {
            opcode: "spritePointing",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [SPRITE1] pointing towards [SPRITE2]?"),
            arguments: {
              SPRITE1: { type: Scratch.ArgumentType.STRING, menu: "ALL_TARGETS" },
              SPRITE2: { type: Scratch.ArgumentType.STRING, menu: "OBJECTS" }
            }
          },
          {
            opcode: "spriteTouchingSprite",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [SPRITE1] touching [SPRITE2]?"),
            arguments: {
              SPRITE1: { type: Scratch.ArgumentType.STRING, menu: "OBJECTS" },
              SPRITE2: { type: Scratch.ArgumentType.STRING, menu: "ALL_TARGETS" }
            }
          },
          {
            opcode: "spriteTouchingSpriteType",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [SPRITE1] touching [TYPE] of [SPRITE2]?"),
            arguments: {
              SPRITE1: { type: Scratch.ArgumentType.STRING, menu: "ALL_OBJECTS" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "TARGET_TYPE" },
              SPRITE2: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "spriteTouchingClone",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [SPRITE1] touching clone of [SPRITE2] with [VAR] set to [VAL]?"),
            arguments: {
              SPRITE1: { type: Scratch.ArgumentType.STRING, menu: "ALL_OBJECTS" },
              SPRITE2: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: Scratch.translate("my variable") },
              VAL: { type: Scratch.ArgumentType.STRING, defaultValue: 0 }
            }
          },
          "---",
          {
            opcode: "spritesTouching",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("sprites touching [SPRITE]"),
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "ALL_OBJECTS" }
            }
          },
          {
            opcode: "getNeighbors",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("neighbors of [SPRITE] in range [DIAMETER]"),
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "ALL_OBJECTS" },
              DIAMETER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 200 }
            }
          },
          "---",
          {
            opcode: "objTouchingColor",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("color touching [SPRITE]"),
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "ALL_OBJECTS" }
            }
          },
          {
            opcode: "colorAtPosition",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("color at x [x] y [y]"),
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          "---",
          {
            opcode: "spriteDragMode",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set drag mode of [SPRITE] to [DRAG]"),
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "ALL_TARGETS" },
              DRAG: { type: Scratch.ArgumentType.STRING, menu: "DRAG_MODES" }
            },
          },
          {
            opcode: "spriteDraggable",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [SPRITE] [DRAG] ?"),
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "ALL_TARGETS" },
              DRAG: { type: Scratch.ArgumentType.STRING, menu: "DRAG_TYPE" }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: Scratch.translate("Asking") },
          {
            opcode: "advancedAsk",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("ask [QUESTION] as [TYPE] and [WAIT]"),
            arguments: {
              QUESTION: { type: Scratch.ArgumentType.STRING, defaultValue: Scratch.translate("what is your name?") },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "ASK_TYPE" },
              WAIT: { type: Scratch.ArgumentType.STRING, menu: "WAIT_TYPES" }
            }
          },
          {
            opcode: "askReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("ask [QUESTION] as [TYPE]"),
            arguments: {
              QUESTION: { type: Scratch.ArgumentType.STRING, defaultValue: Scratch.translate("what is your name?") },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "ASK_TYPE" }
            }
          },
          {
            opcode: "stopAsking",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stop asking question")
          },
          {
            opcode: "currentTyped",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("typed answer")
          },
          {
            opcode: "isAsking",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is asking question?")
          },
          "---",
          {
            opcode: "setAskDisplay",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set ask monitor x: [x] y: [y] width: [width]"),
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0, exemptFromNormalization: true },
              width: { type: Scratch.ArgumentType.NUMBER, defaultValue: 480 }
            }
          },
          {
            opcode: "setAskType",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set ask box input to [TYPE] default value [TEXT]"),
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "ASK_INPUTS" },
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "..." }
            }
          },
          {
            opcode: "setAskList",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set ask box input to dropdown with items in array [LIST]"),
            arguments: {
              LIST: { type: Scratch.ArgumentType.STRING, defaultValue: "[\"option 1\", \"option 2\"]" }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: Scratch.translate("Miscellaneous") },
          {
            opcode: "isScreen",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [SCREEN] ?"),
            arguments: {
              SCREEN: { type: Scratch.ArgumentType.STRING, menu: "SCREENS" }
            }
          },
          {
            opcode: "screenOff",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("stage [TYPE]"),
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "STAGE_SCALES" }
            }
          },
          "---",
          {
            opcode: "averageMicVolume",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("average loudness")
          },
          {
            opcode: "getSpriteName",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("my sprite name")
          },
          {
            opcode: "allLayers",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("max sprite layers")
          },
          "---",
          {
            opcode: "boolean",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [STRING] real?"),
            arguments: {
              STRING: { type: Scratch.ArgumentType.STRING, exemptFromNormalization: true }
            }
          },
          {
            opcode: "getAllString",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get [TEXT] in [STRING]"),
            arguments: {
              STRING: { type: Scratch.ArgumentType.STRING, defaultValue: Scratch.translate("rotating a 6 makes a 9!") },
              TEXT: { type: Scratch.ArgumentType.STRING, menu: "string_types" }
            }
          },
        ],
        menus: {
          OBJECTS: { acceptReporters: true, items: this._getObjects(true, false) },
          ALL_OBJECTS: { acceptReporters: true, items: this._getObjects(true, true) },
          TARGETS: { acceptReporters: true, items: this._getObjects(false, false) },
          ALL_TARGETS: { acceptReporters: true, items: this._getObjects(false, true) },
          POSITION: ["x", "y"],
          WAIT_TYPES: [
            { text: Scratch.translate("wait"), value: "wait" },
            { text: Scratch.translate("continue"), value: "continue" }
          ],
          SCROLL_TYPES: [
            { text: Scratch.translate("distance x"), value: "distanceX" },
            { text: Scratch.translate("distance y"), value: "distanceY" },
            { text: Scratch.translate("velocity x"), value: "velocityX" },
            { text: Scratch.translate("velocity y"), value: "velocityY" }
          ],
          SCROLL_EVENTS: [
            { text: Scratch.translate("up"), value: "up" },
            { text: Scratch.translate("down"), value: "down" },
            { text: Scratch.translate("left"), value: "left" },
            { text: Scratch.translate("right"), value: "right" }
          ],
          MOUSE_BUTTONS: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("left"), value: "0" },
              { text: Scratch.translate("scroll wheel"), value: "1" },
              { text: Scratch.translate("right"), value: "2" },
              { text: Scratch.translate("back"), value: "3" },
              { text: Scratch.translate("foward"), value: "4" }
            ],
          },
          KEY_PRESS: [
            { text: Scratch.translate("pressed"), value: "pressed" },
            { text: Scratch.translate("hit"), value: "hit" }
          ],
          KEY_LISTS: [
            { text: Scratch.translate("current key"), value: "press" },
            { text: Scratch.translate("keys"), value: "pressed" },
            { text: Scratch.translate("last key"), value: "lastPress" }
          ],
          KEYS: {
            acceptReporters: true,
            items: translatedKeys
          },
          TARGET_TYPE: [
            { text: Scratch.translate("parent"), value: "parent" },
            { text: Scratch.translate("clone"), value: "clone" }
          ],
          DRAG_TYPE: [
            { text: Scratch.translate("draggable"), value: "draggable" },
            { text: Scratch.translate("being dragged"), value: "being dragged" }
          ],
          DRAG_MODES: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("draggable"), value: "draggable" },
              { text: Scratch.translate("not draggable"), value: "not draggable" }
            ]
          },
          ASK_TYPE: [
            { text: Scratch.translate("stage"), value: "stage" },
            { text: Scratch.translate("sprite"), value: "sprite" }
          ],
          ASK_INPUTS: {
            acceptReporters: true,
            items: validInputs
          },
          SCREENS: [
            { text: Scratch.translate("fullscreen"), value: "fullscreen" },
            { text: Scratch.translate("smallscreen"), value: "smallscreen" }
          ],
          STAGE_SCALES: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("width"), value: "width" },
              { text: Scratch.translate("display width"), value: "display width" },
              { text: Scratch.translate("height"), value: "height" },
              { text: Scratch.translate("display height"), value: "display height" },
              { text: Scratch.translate("size ratio"), value: "ratio" }
            ]
          },
          string_types: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("numbers"), value: "numbers" },
              { text: Scratch.translate("letters"), value: "letters" },
              { text: Scratch.translate("special characters"), value: "special" }
            ]
          }
        }
      };
    }

    // Helper Funcs
    _getObjects(mouse, myself) {
      const spriteNames = [];
      if (mouse) { spriteNames.push({ text: Scratch.translate("mouse-pointer"), value: "_mouse_" }) }
      if (myself) { spriteNames.push({ text: Scratch.translate("myself"), value: "_myself_" }) }
      const targets = runtime.targets;
      for (let i = 1; i < targets.length; i++) {
        const target = targets[i];
        if (target.isOriginal) {
          const targetName = target.getName();
          spriteNames.push({ text: targetName, value: targetName });
        }
      }
      return spriteNames.length > 0 ? spriteNames : [""];
    }

    toProperKey(event, reverse) {
      let key = event.key;
      if (key === " ") return "space";
      else if (key.length > 1) key = key.toLowerCase();

      if (key.startsWith("arrow")) key = key.replace("arrow", "") + " arrow";
      else if (key.startsWith("page")) key = key.replace("page", "page ");
      else if (key === "capslock") key = "caps lock";
      else if (key === "contextmenu") key = "context menu";
      return key;
    }

    keyCheckHandler(key, hitOnly) {
      const { keyTimers, curKey } = keyData;
      if (key === "any" && curKey !== "") return hitOnly ? keyTimers.get(curKey) <= 0.1 : true;
      if (keyTimers.has(key)) return hitOnly ? keyTimers.get(key) <= 0.1 : true;
      return false;
    }

    colorAtPos(x, y) {
      const clientX = Math.round((((runtime.stageWidth / 2) + x) / runtime.stageWidth) * render._gl.canvas.clientWidth);
      const clientY = Math.round((((runtime.stageHeight / 2) - y) / runtime.stageHeight) * render._gl.canvas.clientHeight);
      const rgb = render.extractColor(clientX, clientY, 20).color;
      return `#${rgb.r.toString(16).padStart(2, "0")}${rgb.g.toString(16).padStart(2, "0")}${rgb.b.toString(16).padStart(2, "0")}`;
    }

    getTarget(name, util, checkMouse, checkMyself, returnName) {
      if (checkMouse && name === "_mouse_") return "_mouse_";
      if (checkMyself && name === "_myself_") return returnName ? util.target.getName() : util.target;

      const target = runtime.getSpriteTargetByName(name);
      if (returnName) return target ? target.getName() : name;
      else return target;
    }

    updateAskMonitor() {
      let box = document.querySelector(`div[class*="question"]`);
      if (!box) return;

      if (isPackaged) box = box.firstElementChild;
      else box = box.firstElementChild.firstElementChild;
      const { x, y, width, input } = askBoxSettings;

      if (x !== undefined || y !== undefined || width !== undefined) {
        const canvasBounds = render.canvas.getBoundingClientRect();
        const ratio = canvasBounds.width / runtime.stageWidth;

        const widthCSS = `width: calc(${width ? `${width * ratio}px` : "100%"} - 1rem);`;
        const positionCSS = `transform: translate(calc(-50% + ${x ?? 0}px), calc(-50% + ${y ?? isPackaged ? -55 : 100}px));`;
        box.setAttribute("style", `margin: 0; position: absolute; left: 50%; top: 50%; ${widthCSS} ${positionCSS}`);
      }

      if (input.type === undefined) return;
      const askInput = document.querySelector(isPackaged ? `input[class="sc-question-input"]` : `div[class*="question"] [class^="input_input-form"]`);
      const element = box.querySelector(`select[id="SP-input_select"]`);
      if (element) element.remove();

      if (input.type === "dropdown") {
        const width = askInput.parentNode.getBoundingClientRect().width;
        const dropdown = document.createElement("select");
        dropdown.id = "SP-input_select";
        dropdown.setAttribute("class", askInput.getAttribute("class"));
        dropdown.setAttribute("style", `width: 100%; background: #fff; color: #505050; border-color: #D9D9D9;`);
        input.value.forEach(item => {
          const option = document.createElement("option");
          option.value = item; option.text = item;
          dropdown.appendChild(option);
        });

        askInput.parentNode.appendChild(dropdown);
        askInput.style.display = "none";
        askInput.value = dropdown.value;
        dropdown.addEventListener("change", (e) => {
          askInput.value = dropdown.value;
          e.stopPropagation();
        });

        const button = box.querySelector(`button[class*="question-submit-button"]`);
        button.addEventListener("click", () => {
          setTimeout(() => { sensingCore._answer = askInput.value }, 10);
        });
      } else {
        if (input.value) askInput.value = input.value;
        askInput.type = input.type;
        askInput.pattern = input.type === "number" ? "[0-9]*" : "none";
        askInput.style.display = "block";
      }
    }

    // Block Funcs
    scrollValue(args) {
      const type = Cast.toString(args.TYPE);
      const index = type.endsWith("X") ? 0 : 1;
      if (type.startsWith("distance")) return mouseData.scroll[index];
      else return mouseData.scrollVelocity[index];
    }

    setScrollDist(args) {
      const index = args.POS === "x" ? 0 : 1;
      mouseData.scroll[index] = Cast.toNumber(args.AMT);
    }

    changeScrollDist(args) {
      const index = args.POS === "x" ? 0 : 1;
      mouseData.scroll[index] += Cast.toNumber(args.AMT);
    }

    isScrolled(args, util) {
      const type = Cast.toString(args.TYPE);
      const isX = type === "left" || type === "right";
      const scrollDist = mouseData.scroll[isX ? 0 : 1];
      const stackName = `SPscrollCheck${isX ? "X" : "Y"}`;

      if (util.thread.stackFrames[0][stackName] === undefined) util.thread.stackFrames[0][stackName] = 0;
      const testerVal = util.thread.stackFrames[0][stackName];

      const status = type === "down" || type === "left" ?
        scrollDist > testerVal : scrollDist < testerVal;

      if (status) util.thread.stackFrames[0][stackName] = scrollDist;
      return Cast.toBoolean(status);
    }

    mouseClick(args, util) {
      return util.ioQuery("mouse", "getButtonIsDown", [Cast.toNumber(args.BUTTON)])
    }

    realMouse(args) {
      return mouseData.client[args.POS === "x" ? 0 : 1];
    }

    mouseVelocity(args) {
      return mouseData.velocity[args.POS === "x" ? 0 : 1];
    }

    whenKey(args) {
      const key = Cast.toString(args.KEY);
      const isHit = Cast.toString(args.TYPE) === "hit";
      return this.keyCheckHandler(key, isHit);
    }

    isKey(args) {
      // really nothing special here
      return this.whenKey(args);
    }

    currentKey(args) {
      const type = Cast.toString(args.TYPE);
      switch (type) {
        case "press": return keyData.curKey;
        case "pressed": return JSON.stringify(keyData.keys);
        case "lastPress": return keyData.lastKey;
        default: return "";
      }
    }

    timeKeyPressed(args) {
      const key = Cast.toString(args.KEY).toLowerCase();
      if (key === "any") return Math.max(0, ...keyData.keyTimers.values().toArray());
      else return keyData.keyTimers.get(key) ?? 0;
    }

    setKeyBlock(args) {
      const key = Cast.toString(args.KEY);
      keyData.keyBlockers.add(key);
    }

    resetKeyBlocks() {
      keyData.keyBlockers.clear();
    }

    getKeyBlockers() {
      return JSON.stringify(keyData.keyBlockers.values().toArray());
    }

    spritePointing(args, util) {
      const target = this.getTarget(args.SPRITE1, util, false, true, false);
      if (!target) return false;
      const oldDir = target.direction;
      runtime.ext_scratch3_motion.pointTowards({ TOWARDS: args.SPRITE2 }, { ...util, target, ioQuery: util.ioQuery });
      const newDir = target.direction;
      target.setDirection(oldDir);
      return Math.round(newDir) === Math.round(oldDir);
    }

    spriteTouchingSprite(args, util) {
      const target = this.getTarget(args.SPRITE2, util, false, true, false);
      if (!target) return false;
      return target.sprite.clones.some((t) => t.isTouchingObject(args.SPRITE1));
    }

    spriteTouchingSpriteType(args, util) {
      const target1 = this.getTarget(args.SPRITE1, util, true, true, false);
      const target2 = runtime.getSpriteTargetByName(args.SPRITE2);
      if (!target1 || !target2) return false;
      if (args.TYPE === "parent") {
        if (target1 === "_mouse_") return target2.isTouchingObject("_mouse_");
        else return render.isTouchingDrawables(target1.drawableID, [target2.drawableID]);
      } else {
        const clones = target2.sprite.clones;
        if (target1 === "_mouse_") return clones.some((c) => !c.isOriginal && c.isTouchingObject("_mouse_"));
        else {
          const cloneIds = [];
          for (var i = 1; i < clones.length; i++) cloneIds.push(clones[i].drawableID);
          return render.isTouchingDrawables(target1.drawableID, cloneIds);
        }
      }
    }

    spriteTouchingClone(args, util) {
      const target1 = this.getTarget(args.SPRITE1, util, true, true, false);
      const target2 = runtime.getSpriteTargetByName(args.SPRITE2);
      if (!target1 || !target2) return false;

      const clones = target2.sprite.clones;
      for (var i = 1; i < clones.length; i++) {
        const variable = clones[i].lookupVariableByNameAndType(args.VAR, "", clones[i]);
        if (variable && Cast.toString(variable.value) === Cast.toString(args.VAL)) {
          if (target1 === "_mouse_") {
            if (clones[i].isTouchingObject("_mouse_")) return true;
          } else {
            if (render.isTouchingDrawables(target1.drawableID, [clones[i].drawableID])) return true;
          }
        }
      }
      return false;
    }

    spritesTouching(args, util) {
      const list = [];
      const thisSprite = this.getTarget(args.SPRITE, util, true, true, true);
      const targets = runtime.targets;
      for (let i = 1; i < targets.length; i++) {
        const target = targets[i];
        const name = `${target.getName()}${target.isOriginal ? "" : " (Clone)"}`;
        if (target.isTouchingObject(thisSprite) && name !== thisSprite) list.push(name);
      }
      return JSON.stringify(list);
    }

    getNeighbors(args, util) {
      const circ = Cast.toNumber(args.DIAMETER);
      let list = [], pos = [];
      if (args.SPRITE === "_mouse_") pos = [util.ioQuery("mouse", "getScratchX"), util.ioQuery("mouse", "getScratchY"), ""];
      else if (args.SPRITE === "_myself_") pos = [util.target.x, util.target.y, util.target.id];
      else {
        const nameTarget = runtime.getSpriteTargetByName(args.SPRITE);
        if (!nameTarget) return "[]";
        pos = [nameTarget.x, nameTarget.y, nameTarget.id];
      }
      const targets = runtime.targets;
      for (let i = 1; i < targets.length; i++) {
        const target = targets[i];
        const dx = pos[0] - target.x;
        const dy = pos[1] - target.y;
        if (Math.sqrt((dx * dx) + (dy * dy)) <= circ && target.id !== pos[2]) list.push(`${target.getName()}${target.isOriginal ? "" : " (Clone)"}`);
      }
      return JSON.stringify(list);
    }

    colorAtPosition(args) { return this.colorAtPos(Cast.toNumber(args.x), Cast.toNumber(args.y)) }
    objTouchingColor(args, util) {
      if (args.SPRITE === "_mouse_") return this.colorAtPos(util.ioQuery("mouse", "getScratchX"), util.ioQuery("mouse", "getScratchY"));
      else {
        const target = this.getTarget(args.SPRITE, util, false, true, false);
        if (!target) return "";
        const wasVisible = target.visible;
        target.setVisible(false);
        const hex = this.colorAtPos(target.x, target.y);
        target.setVisible(wasVisible);
        return hex;
      }
    }

    spriteDragMode(args, util) {
      const target = this.getTarget(args.SPRITE, util, false, true, false);
      if (target) target.setDraggable(args.DRAG === "draggable");
    }
    spriteDraggable(args, util) {
      const target = this.getTarget(args.SPRITE, util, false, true, false);
      if (target) return target[args.DRAG === "draggable" ? "draggable" : "dragging"];
      return false;
    }

    advancedAsk(args, util) {
      const wasVisible = util.target.visible;
      if (!util.target.isStage && args.TYPE === "stage") util.target.setVisible(false);

      return new Promise(resolve => {
        sensingCore.askAndWait(args, util);
        if (!util.target.isStage && wasVisible) util.target.setVisible(true);
        this.updateAskMonitor();

        if (args.WAIT === "continue") resolve();
        else runtime.once("ANSWER", () => resolve());
      });
    }

    askReporter(args, util) {
      return this.advancedAsk(args, util).then(() => { return sensingCore.getAnswer() });
    }

    stopAsking() {
      runtime.emit("ANSWER", this.currentTyped());
      runtime.emit("QUESTION", null);
    }

    currentTyped() {
      let box = document.querySelector(isPackaged ? `input[class="sc-question-input"]` : `div[class*="question"] [class^="input_input-form"]`);
      return box ? box.value : "";
    }

    isAsking() { return Cast.toBoolean(document.querySelector(`div[class*="question-input"]`)) }

    setAskDisplay(args) {
      askBoxSettings.width = Cast.toNumber(args.width);
      if (askBoxSettings.width < 0) askBoxSettings.width = undefined;

      askBoxSettings.x = Cast.toNumber(args.x);
      askBoxSettings.y = args.y === NaN ? undefined : Cast.toNumber(args.y) * -1;
      if (isNaN(args.y)) askBoxSettings.y = undefined;
      this.updateAskMonitor();
    }

    setAskType(args) {
      const inputType = Cast.toString(args.TYPE);
      askBoxSettings.input = {
        type: validInputs.find((i) => i.value === inputType) ? inputType : "text",
        value: args.TEXT
      };
      this.updateAskMonitor();
    }

    setAskList(args) {
      try {
        const array = JSON.parse(args.LIST);
        if (Array.isArray(array) && array.length > 0) {
          askBoxSettings.input = { type: "dropdown", value: array };
          this.updateAskMonitor();
        }
      } catch {}
    }

    isScreen(args) {
      const values = [render.canvas.getBoundingClientRect().width, runtime.stageWidth];
      return args.SCREEN === "fullscreen" ? values[0] > values[1] : values[0] < values[1];
    }

    screenOff(args) {
      const type = Cast.toString(args.TYPE);
      const canvasBounds = type.startsWith("display") || type === "ratio" ?
        render.canvas.getBoundingClientRect() : {};
      switch (type) {
        case "width": return runtime.stageWidth;
        case "height": return runtime.stageHeight;
        case "display width": return canvasBounds.width;
        case "display height": return canvasBounds.height;
        case "ratio": return canvasBounds.width / runtime.stageWidth;
        default: return 0;
      }
    }

    averageMicVolume() {
      if (loudnessCache.length >= 30) loudnessCache = [];
      loudnessCache.push(sensingCore.getLoudness());
      let sum = loudnessCache.reduce((accumulator, curValue) => accumulator + curValue, 0);
      return Math.round((sum / loudnessCache.length) * 100) / 100;
    }

    getSpriteName(_, util) { return util.target.getName() }

    allLayers() { return render._drawList.length - 1 }

    boolean(args) {
      return Cast.toBoolean(args.STRING) && args.STRING !== undefined;
    }

    getAllString(args) {
      let regex;
      switch (args.TEXT) {
        case "numbers": {regex = /[^0-9]/g; break }
        case "special characters": {regex = /[A-Za-z0-9]/g; break }
        default: regex = /[^A-Za-z]/g;
      }
      return Cast.toString(args.STRING).replace(regex, "");
    }
  }

  Scratch.extensions.register(new HyperSense2SP());
})(Scratch);
