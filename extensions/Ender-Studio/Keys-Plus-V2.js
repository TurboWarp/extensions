// Name: Keys+ V2
// ID: enderKeysPlusV2
// Description: Even more powerful and flexible key press detection blocks with some additional features.
// By: Ender-Studio
// Original: Ender-Studio
// License: MIT AND LGPL-3.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed)
    throw new Error("Keys+ V2 must run unsandboxed!");

  const runtime = Scratch.vm.runtime;
  const Cast = Scratch.Cast;

  const _format = {
    toValue: [
      "F1",
      "F2",
      "F3",
      "F4",
      "F5",
      "F6",
      "F7",
      "F8",
      "F9",
      "F10",
      "F11",
      "F12",
      "Digit0",
      "Digit1",
      "Digit2",
      "Digit3",
      "Digit4",
      "Digit5",
      "Digit6",
      "Digit7",
      "Digit8",
      "Digit9",
      "KeyA",
      "KeyB",
      "KeyC",
      "KeyD",
      "KeyE",
      "KeyF",
      "KeyG",
      "KeyH",
      "KeyI",
      "KeyJ",
      "KeyK",
      "KeyL",
      "KeyM",
      "KeyN",
      "KeyO",
      "KeyP",
      "KeyQ",
      "KeyR",
      "KeyS",
      "KeyT",
      "KeyU",
      "KeyV",
      "KeyW",
      "KeyX",
      "KeyY",
      "KeyZ",
      "Backquote",
      "Minus",
      "Equal",
      "BracketLeft",
      "BracketRight",
      "Backslash",
      "Semicolon",
      "Quote",
      "Comma",
      "Period",
      "Slash",
    ],
    toCustomValue: {
      MetaLeft: "left windows key",
      MetaRight: "right windows key",
      ControlLeft: "left control",
      ControlRight: "right control",
      AltLeft: "left alt",
      AltRight: "right alt",
      ShiftLeft: "left shift",
      ShiftRight: "right shift",
      ArrowUp: "up arrow",
      ArrowDown: "down arrow",
      ArrowLeft: "left arrow",
      ArrowRight: "right arrow",
    },
  };
  const _filter = {
    default: [
      "_a",
      "_b",
      "_c",
      "_d",
      "_e",
      "_f",
      "_g",
      "_h",
      "_i",
      "_j",
      "_k",
      "_l",
      "_m",
      "_n",
      "_o",
      "_p",
      "_q",
      "_r",
      "_s",
      "_t",
      "_u",
      "_v",
      "_w",
      "_x",
      "_y",
      "_z",
      "_A",
      "_B",
      "_C",
      "_D",
      "_E",
      "_F",
      "_G",
      "_H",
      "_I",
      "_J",
      "_K",
      "_L",
      "_M",
      "_N",
      "_O",
      "_P",
      "_Q",
      "_R",
      "_S",
      "_T",
      "_U",
      "_V",
      "_W",
      "_X",
      "_Y",
      "_Z",
      "_0",
      "_1",
      "_2",
      "_3",
      "_4",
      "_5",
      "_6",
      "_7",
      "_8",
      "_9",
      "_`",
      "_~",
      "_!",
      "_@",
      "_#",
      "_$",
      "_%",
      "_^",
      "_&",
      "_*",
      "_(",
      "_)",
      "_-",
      "__",
      "_=",
      "_+",
      "_[",
      "_{",
      "_]",
      "_}",
      "_\\",
      "_|",
      "_;",
      "_:",
      "_'",
      '"',
      "_,",
      "_<",
      "_.",
      "_>",
      "_/",
      "_?",
      "_ ",
    ],
    shift: ["_left shift", "_right shift"],
  };
  function format(_key) {
    const name = _key.code,
      value = _key.key;
    if (_format.toValue.includes(name)) return "_" + value;
    if (name.startsWith("Numpad"))
      return "_numpad: " + name.slice(6).toLowerCase();
    if (name in _format.toCustomValue) return "_" + _format.toCustomValue[name];
    return "_" + name.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase();
  }
  const createLabel = (text) => ({
    blockType: Scratch.translate(Scratch.BlockType.LABEL),
    text: text,
  });

  function startKeyEvents(_trigger) {
    runtime.startHats("enderKeysPlusV2_eventKeyPressed", { trigger: _trigger });
    runtime.startHats("enderKeysPlusV2_eventKeysPressed", {
      trigger: _trigger,
    });
    runtime.startHats("enderKeysPlusV2_eventKeybindTriggered", {
      trigger: _trigger,
    });
  }

  class enderKeysPlusV2 {
    constructor() {
      this._settings = {
        clearOnBlur: true,
        includeTags: true,
      };

      this._tags = {
        "#a": ["a", "A"],
        "#b": ["b", "B"],
        "#c": ["c", "C"],
        "#d": ["d", "D"],
        "#e": ["e", "E"],
        "#f": ["f", "F"],
        "#g": ["g", "G"],
        "#h": ["h", "H"],
        "#i": ["i", "I"],
        "#j": ["j", "J"],
        "#k": ["k", "K"],
        "#l": ["l", "L"],
        "#m": ["m", "M"],
        "#n": ["n", "N"],
        "#o": ["o", "O"],
        "#p": ["p", "P"],
        "#q": ["q", "Q"],
        "#r": ["r", "R"],
        "#s": ["s", "S"],
        "#t": ["t", "T"],
        "#u": ["u", "U"],
        "#v": ["v", "V"],
        "#w": ["w", "W"],
        "#x": ["x", "X"],
        "#y": ["y", "Y"],
        "#z": ["z", "Z"],
        "#letters": [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
        ],
        "#uppercaseLetters": [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
        ],
        "#lowercaseLetters": [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
        ],
        "#vowels": ["a", "e", "i", "o", "u"],
        "#consonants": [
          "b",
          "c",
          "d",
          "f",
          "g",
          "h",
          "j",
          "k",
          "l",
          "m",
          "n",
          "p",
          "q",
          "r",
          "s",
          "t",
          "v",
          "w",
          "x",
          "y",
          "z",
        ],
        "#numbers": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        "#specialCharacters": [
          "!",
          "@",
          "#",
          "$",
          "%",
          "^",
          "&",
          "*",
          "(",
          ")",
          "_",
          "+",
          "=",
          "{",
          "}",
          "[",
          "]",
          "|",
          "\\",
          ":",
          ";",
          "'",
          '"',
          "<",
          ">",
          ",",
          ".",
          "?",
          "/",
          "~",
          "`",
        ],
        "#shift": ["left shift", "right shift"],
        "#alt": ["left alt", "right alt"],
        "#control": ["left control", "right control"],
        "#windowsKey": ["left windows key", "right windows key"],
        "#arrowKeys": ["up arrow", "down arrow", "right arrow", "left arrow"],
        "#functionKeys": [
          "F1",
          "F2",
          "F3",
          "F4",
          "F5",
          "F6",
          "F7",
          "F8",
          "F9",
          "F10",
          "F11",
          "F12",
        ],
        "#navigationKeys": [
          "up arrow",
          "down arrow",
          "right arrow",
          "left arrow",
          "home",
          "end",
          "page up",
          "page down",
          "insert",
          "delete",
        ],
        "#numpad": [
          "numpad: divide",
          "numpad: multiply",
          "numpad: subtract",
          "numpad: add",
          "numpad: 0",
          "numpad: 1",
          "numpad: 2",
          "numpad: 3",
          "numpad: 4",
          "numpad: 5",
          "numpad: 6",
          "numpad: 7",
          "numpad: 8",
          "numpad: 9",
          "numpad: decimal",
          "numpad: enter",
        ],
      };

      this._keybinds = {};

      this._mouseDown = {};
      this._scrollDeltaY = 0;
      this._lastScrollTime = Date.now();

      this._keysPressed = {};
      this._lastKeyPressed = "";

      this._importError = "None";

      runtime.on("BEFORE_EXECUTE", () => {
        runtime.startHats("enderKeysPlusV2_eventMouseDown", {
          trigger: "while",
        });
        startKeyEvents("while");
      });
      // Keys
      window.addEventListener("keydown", (event) => {
        const key = format(event);
        this._lastKeyPressed = key;
        if (!this._keysPressed[key]) {
          this._keysPressed[key] = {
            time: Date.now(),
            code: event.code,
            value: event.key,
          };
          startKeyEvents("when");
        }
      });
      window.addEventListener("keyup", (event) => {
        const key = format(event);
        startKeyEvents("after");
        delete this._keysPressed[key];
        this._filter();
      });
      window.addEventListener("blur", () => {
        if (this._settings["clearOnBlur"]) {
          this._keysPressed = {};
          this._mouseDown = {};
        }
      });
      // Mouse
      window.addEventListener("mousedown", (event) => {
        if (!this._mouseDown[event.button]) {
          this._mouseDown[event.button] = { time: Date.now() };
          runtime.startHats("enderKeysPlusV2_eventMouseDown", {
            trigger: "when",
          });
        }
      });
      window.addEventListener("mouseup", (event) => {
        runtime.startHats("enderKeysPlusV2_eventMouseDown", {
          trigger: "after",
        });
        delete this._mouseDown[event.button];
      });
      window.addEventListener("wheel", (event) => {
        this._scrollDeltaY = event.deltaY;
        this._lastScrollTime = Date.now();
        runtime.startHats("enderKeysPlusV2_eventScroll");
      });
    }
    getInfo() {
      return {
        id: "enderKeysPlusV2",
        name: Scratch.translate("Keys+ V2"),
        color1: "#647970",
        color2: "#4D5E56",
        blocks: [
          createLabel("Mouse"),
          {
            opcode: "eventMouseDown",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("[trigger] [button] mouse button is down"),
            isEdgeActivated: false,
            arguments: {
              trigger: {
                type: Scratch.ArgumentType.STRING,
                menu: "eventTriggerCondition",
              },
              button: {
                type: Scratch.ArgumentType.STRING,
                menu: "mouseButtons",
              },
            },
          },
          "---",
          {
            opcode: "isMouseDown",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [button] mouse button down?"),
            arguments: {
              button: {
                type: Scratch.ArgumentType.STRING,
                menu: "mouseButtons",
              },
            },
          },
          {
            opcode: "isMouseHit",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [button] mouse button clicked?"),
            arguments: {
              button: {
                type: Scratch.ArgumentType.STRING,
                menu: "mouseButtons",
              },
            },
          },
          "---",
          {
            opcode: "timeMouseDown",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("time [button] mouse button down"),
            arguments: {
              button: {
                type: Scratch.ArgumentType.STRING,
                menu: "mouseButtons",
              },
            },
          },
          createLabel("Scrolling"),
          {
            opcode: "eventScroll",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when scrolling [dir]"),
            isEdgeActivated: false,
            arguments: {
              dir: { type: Scratch.ArgumentType.STRING, menu: "upDown" },
            },
          },
          {
            opcode: "isScrolling",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is scrolling [dir]?"),
            disableMonitor: true,
            arguments: {
              dir: { type: Scratch.ArgumentType.STRING, menu: "upDown" },
            },
          },
          "---",
          {
            opcode: "scrollDirection",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("scroll direction"),
          },
          createLabel("Keys"),
          {
            opcode: "eventKeysPressed",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate(
              "[trigger] ［[keys]］ keys is pressed [ordered]"
            ),
            isEdgeActivated: false,
            arguments: {
              trigger: {
                type: Scratch.ArgumentType.STRING,
                menu: "eventTriggerCondition",
              },
              ordered: { type: Scratch.ArgumentType.STRING, menu: "orderMode" },
              keys: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '"a", "b", "c"',
              },
            },
          },
          {
            opcode: "eventKeyPressed",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("[trigger] [key] key is pressed"),
            isEdgeActivated: false,
            arguments: {
              trigger: {
                type: Scratch.ArgumentType.STRING,
                menu: "eventTriggerCondition",
              },
              key: { type: Scratch.ArgumentType.STRING, menu: "keys" },
            },
          },
          "---",
          {
            opcode: "isKeysPressed",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("are ［[keys]］ keys pressed [ordered]?"),
            arguments: {
              ordered: { type: Scratch.ArgumentType.STRING, menu: "orderMode" },
              keys: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '"a", "b", "c"',
              },
            },
          },
          {
            opcode: "isKeyPressed",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [key] key pressed?"),
            arguments: {
              key: { type: Scratch.ArgumentType.STRING, menu: "keys" },
            },
          },
          "---",
          {
            opcode: "isKeysHit",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("are ［[keys]］ keys hit [ordered]?"),
            arguments: {
              ordered: { type: Scratch.ArgumentType.STRING, menu: "orderMode" },
              keys: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '"a", "b", "c"',
              },
            },
          },
          {
            opcode: "isKeyHit",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [key] key hit?"),
            arguments: {
              key: { type: Scratch.ArgumentType.STRING, menu: "keys" },
            },
          },
          "---",
          {
            opcode: "lastKeyPressed",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("last key pressed"),
          },
          {
            opcode: "currentKeysPressed",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current keys pressed"),
          },
          {
            opcode: "currentKeyPressed",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current key pressed"),
          },
          {
            opcode: "keyPressedProperty",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current key pressed [property]"),
            disableMonitor: true,
            arguments: {
              property: {
                type: Scratch.ArgumentType.STRING,
                menu: "keyProperty",
              },
            },
          },
          "---",
          {
            opcode: "timeKeysPressed",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("time ［[keys]］ keys pressed [mode]"),
            disableMonitor: true,
            arguments: {
              mode: { type: Scratch.ArgumentType.STRING, menu: "returnMode" },
              keys: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '"a", "b", "c"',
              },
            },
          },
          {
            opcode: "timeKeyPressed",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("time [key] key pressed"),
            disableMonitor: true,
            arguments: {
              key: { type: Scratch.ArgumentType.STRING, menu: "keys" },
            },
          },
          createLabel("Keybinding"),
          {
            opcode: "eventKeybindTriggered",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("[trigger] [event] is triggered"),
            isEdgeActivated: false,
            arguments: {
              trigger: {
                type: Scratch.ArgumentType.STRING,
                menu: "eventTriggerCondition",
              },
              event: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("event"),
              },
            },
          },
          "---",
          {
            opcode: "whileKeybindTriggered",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("while [event] is triggered?"),
            arguments: {
              event: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("event"),
              },
            },
          },
          {
            opcode: "whenKeybindTriggered",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("when [event] is triggered?"),
            arguments: {
              event: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("event"),
              },
            },
          },
          "---",
          {
            opcode: "causeKeybindTriggered",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("cause of [event] triggered"),
            disableMonitor: true,
            arguments: {
              event: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("event"),
              },
            },
          },
          {
            opcode: "timeKeybindTriggered",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("time [event] is triggered"),
            disableMonitor: true,
            arguments: {
              event: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("event"),
              },
            },
          },
          "---",
          {
            opcode: "keybindBindMultiple",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "bind ［[keys]］ keys [mode] as [trigger] to [event]"
            ),
            arguments: {
              keys: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '"a", "b", "c"',
              },
              mode: { type: Scratch.ArgumentType.STRING, menu: "orderMode" },
              trigger: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("trigger"),
              },
              event: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("event"),
              },
            },
          },
          {
            opcode: "keybindBind",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("bind key [key] as [trigger] to [event]"),
            arguments: {
              key: { type: Scratch.ArgumentType.STRING, menu: "keys" },
              trigger: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("trigger"),
              },
              event: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("event"),
              },
            },
          },
          {
            opcode: "keybindUnbind",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("unbind trigger [trigger] from [event]"),
            arguments: {
              trigger: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("trigger"),
              },
              event: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("event"),
              },
            },
          },
          "---",
          {
            opcode: "keybindReset",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("reset binds of [event]"),
            arguments: {
              event: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("event"),
              },
            },
          },
          {
            opcode: "resetAllKeybinds",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("reset all keybindings"),
          },
          "---",
          {
            opcode: "keybindListTriggers",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("list triggers of [event]"),
            disableMonitor: true,
            arguments: {
              event: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("event"),
              },
            },
          },
          {
            opcode: "keybindKeysInTrigger",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("keys bound to [trigger] in [event]"),
            disableMonitor: true,
            arguments: {
              trigger: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("trigger"),
              },
              event: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("event"),
              },
            },
          },
          "---",
          {
            opcode: "listAllKeybinds",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("list all keybindings"),
            disableMonitor: true,
          },
        ],
        menus: {
          mouseButtons: {
            items: [
              { text: Scratch.translate("left"), value: "0" },
              { text: Scratch.translate("scroll wheel"), value: "1" },
              { text: Scratch.translate("right"), value: "2" },
              { text: Scratch.translate("back"), value: "3" },
              { text: Scratch.translate("forward"), value: "4" },
            ],
            acceptReporters: true,
          },
          keys: {
            items: "_getKeysMenu",
            acceptReporters: true,
          },
          settings: {
            items: [
              {
                text: Scratch.translate("clear on blur"),
                value: "clearOnBlur",
              },
              {
                text: Scratch.translate("include tags on menu"),
                value: "includeTags",
              },
            ],
          },
          eventTriggerCondition: {
            items: [
              { text: Scratch.translate("when"), value: "when" },
              { text: Scratch.translate("while"), value: "while" },
              { text: Scratch.translate("after"), value: "after" },
            ],
          },
          keyProperty: {
            items: [
              { text: Scratch.translate("time"), value: "time" },
              { text: Scratch.translate("name"), value: "name" },
              { text: Scratch.translate("code"), value: "code" },
              { text: Scratch.translate("value"), value: "value" },
            ],
          },
          returnMode: {
            items: [
              {
                text: Scratch.translate("together & in order"),
                value: "together & in order",
              },
              {
                text: Scratch.translate("together & ignore order"),
                value: "together & ignore order",
              },
              {
                text: Scratch.translate("individually"),
                value: "individually",
              },
            ],
          },
          orderMode: {
            items: [
              {
                text: Scratch.translate("together & in order"),
                value: "together & in order",
              },
              {
                text: Scratch.translate("together & ignore order"),
                value: "together & ignore order",
              },
            ],
          },
          toggle: {
            items: [
              { text: Scratch.translate("enabled"), value: "enabled" },
              { text: Scratch.translate("disabled"), value: "disabled" },
            ],
          },
          data: {
            items: [
              { text: Scratch.translate("all"), value: "all" },
              { text: Scratch.translate("tags"), value: "tags" },
              { text: Scratch.translate("keybinds"), value: "keybinds" },
              { text: Scratch.translate("settings"), value: "settings" },
            ],
          },
          upDown: {
            items: [
              { text: Scratch.translate("up"), value: "up" },
              { text: Scratch.translate("down"), value: "down" },
            ],
          },
        },
      };
    }
    // Filter
    _filter() {
      const keysPressed = runtime.ioDevices.keyboard._keysPressed.map((k) =>
        k.toLowerCase()
      );
      for (const key in this._keysPressed) {
        const keyName = key.slice(1).toLowerCase();
        if (_filter.shift.includes(key) && !keysPressed.includes("shift")) {
          delete this._keysPressed["_left shift"];
          delete this._keysPressed["_right shift"];
          continue;
        }
        if (
          !keysPressed.includes(keyName) &&
          (/^_[a-zA-Z]$/.test(key) || _filter.default.includes(key))
        ) {
          delete this._keysPressed[key];
        }
      }
    }
    // Helper Functions
    _getKeysPressed() {
      const keys = Object.keys(this._keysPressed);
      return keys.map((key) => key.slice(1));
    }
    _parse(keys) {
      if (Array.isArray(keys)) return keys.map((key) => Cast.toString(key));
      try {
        const parsed = JSON.parse(/^\[.*\]$/.test(keys) ? keys : `[${keys}]`);
        return Array.isArray(parsed)
          ? parsed.map((key) => Cast.toString(key))
          : [];
      } catch {
        return [];
      }
    }
    _isKeyPressed(_key, _source) {
      const key = Cast.toString(_key);
      const keysPressed = this._getKeysPressed();
      if (keysPressed.length) keysPressed.unshift("any");
      if (key.startsWith("#")) {
        const source = (this._tags[key] ?? []).find((currentKey) =>
          keysPressed.includes(currentKey)
        );
        return _source ? { source, isPressed: !!source } : !!source;
      }
      return _source
        ? { source: key, isPressed: keysPressed.includes(key) }
        : keysPressed.includes(key);
    }
    _isKeysPressed(_keys, ordered) {
      const keys = this._parse(_keys);
      if (!keys.length) return false;
      if (ordered) {
        return (
          this._getKeysPressed()
            .filter((key) => keys.includes(key))
            .join() === keys.join()
        );
      }
      return keys.every((key) => this._isKeyPressed(key));
    }
    _isKeybindTriggered(_event) {
      const event = this._keybinds[_event];
      for (const trigger in event) {
        const mode = event[trigger]["mode"];
        const keys = event[trigger]["keys"];
        const triggered = this._isKeysPressed(
          keys,
          mode === "together & in order"
        );
        if (triggered) return { isTriggered: true, cause: trigger };
      }
      return { isTriggered: false, cause: undefined };
    }

    // Mouse
    eventMouseDown(args) {
      return this.isMouseDown(args);
    }

    isMouseDown(args) {
      return Cast.toNumber(args.button) in this._mouseDown;
    }
    isMouseHit(args) {
      const time = this.timeMouseDown(args);
      return time !== 0 && time <= 0.075;
    }

    timeMouseDown(args) {
      const button = this._mouseDown[Cast.toNumber(args.button)];
      return button ? (Date.now() - button.time) / 1000 : 0;
    }
    // Scrolling
    eventScroll(args) {
      return args.dir === "up"
        ? this._scrollDeltaY < 0
        : this._scrollDeltaY > 0;
    }
    isScrolling({ dir }) {
      const withinRange = Date.now() - this._lastScrollTime < 50;
      return dir === "up"
        ? this._scrollDeltaY < 0 && withinRange
        : this._scrollDeltaY > 0 && withinRange;
    }
    scrollDirection() {
      if (this._scrollDeltaY && Date.now() - this._lastScrollTime < 50) {
        return this._scrollDeltaY < 0 ? "up" : "down";
      }
      return "none";
    }
    // Keys
    eventKeysPressed(args) {
      const ordered = args.ordered === "together & in order";
      return this._isKeysPressed(args.keys, ordered);
    }
    eventKeyPressed(args) {
      return this._isKeyPressed(args.key);
    }

    isKeysPressed(args) {
      const ordered = args.ordered === "together & in order";
      return this._isKeysPressed(args.keys, ordered);
    }
    isKeyPressed(args) {
      return this._isKeyPressed(args.key);
    }

    isKeysHit(args) {
      const time = this.timeKeysPressed(args);
      return time !== 0 && time <= 0.075;
    }
    isKeyHit(args) {
      const time = this.timeKeyPressed(args);
      return time !== 0 && time <= 0.075;
    }

    lastKeyPressed() {
      return this._lastKeyPressed.slice(1);
    }
    currentKeysPressed() {
      return JSON.stringify(this._getKeysPressed());
    }
    currentKeyPressed() {
      return this._getKeysPressed().reverse()[0] || "None";
    }
    keyPressedProperty(args) {
      const key = this.currentKeyPressed();
      if (key === "None") return 0;
      switch (args.property) {
        case "time":
          return this.timeKeyPressed({ key: key });
        case "name":
          return key;
        case "code":
          return this._keysPressed["_" + key].code;
        case "value":
          return this._keysPressed["_" + key].value;
      }
    }

    timeKeysPressed(args) {
      const keys = this._parse(args.keys);
      if (!keys.length) return 0;
      if (args.mode === "individually") {
        return JSON.stringify(keys.map((key) => this.timeKeyPressed({ key })));
      }
      const ordered = args.mode === "together & in order";
      const isKeysPressed = this._isKeysPressed(keys, ordered);
      console.log(isKeysPressed);
      if (isKeysPressed) {
        const key = ordered
          ? keys[keys.length - 1]
          : this._getKeysPressed()
              .filter((key) => keys.includes(key))
              .reverse()[0];
        return this.timeKeyPressed({ key: key });
      }
      return 0;
    }
    timeKeyPressed(args) {
      const data = this._isKeyPressed(args.key, true);
      const key = this._keysPressed["_" + data.source];
      return key ? (Date.now() - key.time) / 1000 : 0;
    }
    // Keybinding
    eventKeybindTriggered(args) {
      return this._isKeybindTriggered(Cast.toString(args.event)).isTriggered;
    }

    whileKeybindTriggered(args) {
      return this._isKeybindTriggered(Cast.toString(args.event)).isTriggered;
    }
    whenKeybindTriggered(args) {
      const time = this.timeKeybindTriggered(args);
      return time !== 0 && time <= 0.075;
    }

    timeKeybindTriggered(args) {
      const event = Cast.toString(args.event);
      const data = this._isKeybindTriggered(event);
      const trigger = this._keybinds[event]?.[data.cause];
      if (!data.isTriggered) return 0;
      return this.timeKeysPressed({ mode: trigger.mode, keys: trigger.keys });
    }
    causeKeybindTriggered(args) {
      return this._isKeybindTriggered(Cast.toString(args.event)).cause ?? "";
    }

    keybindBindMultiple(args) {
      const event = Cast.toString(args.event);
      const trigger = Cast.toString(args.trigger);
      if (!this._keybinds[event]) {
        this._keybinds[event] = {};
      }
      this._keybinds[event][trigger] = {
        mode: args.mode,
        keys: this._parse(args.keys),
      };
    }
    keybindBind(args) {
      const event = Cast.toString(args.event);
      const trigger = Cast.toString(args.trigger);
      if (!this._keybinds[event]) {
        this._keybinds[event] = {};
      }
      this._keybinds[event][trigger] = {
        mode: "together & in order",
        keys: [Cast.toString(args.key)],
      };
    }
    keybindUnbind(args) {
      const event = Cast.toString(args.event);
      const trigger = Cast.toString(args.trigger);
      if (!this._keybinds[event]) return;
      delete this._keybinds[event][trigger];
      if (!Object.keys(this._keybinds[event]).length)
        delete this._keybinds[event];
    }

    keybindReset(args) {
      delete this._keybinds[Cast.toString(args.event)];
    }
    resetAllKeybinds() {
      this._keybinds = {};
    }

    keybindListTriggers(args) {
      return JSON.stringify(
        Object.keys(this._keybinds[Cast.toString(args.event)] ?? {})
      );
    }
    keybindKeysInTrigger(args) {
      const event = this._keybinds[Cast.toString(args.event)];
      return event?.[Cast.toString(args.trigger)]
        ? JSON.stringify(event[args.trigger]["keys"])
        : "[]";
    }

    listAllKeybinds() {
      return JSON.stringify(Object.keys(this._keybinds));
    }
    listActiveKeybinds() {
      return JSON.stringify(
        Object.keys(this._keybinds).filter(
          (event) => this._isKeybindTriggered(event).isTriggered
        )
      );
    }
    // Tags
    createTag(args) {
      this._tags["#" + args.tag] = this._parse(args.keys);
    }

    deleteTag(args) {
      delete this._tags["#" + args.tag];
    }
    deleteAllTags() {
      this._tags = {};
    }

    valueOfTag(args) {
      return JSON.stringify(this._tags["#" + args.tag] ?? []);
    }
    listTags() {
      return JSON.stringify(Object.keys(this._tags));
    }
    // Settings
    toggleSetting(args) {
      const boolean = args.toggle === "enabled" ? true : false;
      this._settings[args.setting] = boolean;
    }
    isSettingEnabled(args) {
      return this._settings[args.setting];
    }
    resetSettings() {
      this._settings = {
        clearOnBlur: true,
        includeTags: true,
      };
    }
    // Storage

    import(args) {
      const result = this.validate(args.type, args.json);
      if (result.error) return (this._importError = result.error);
      this._importError = "None";
      switch (args.type) {
        case "tags":
          this._tags = result.output;
          break;
        case "keybinds":
          this._keybinds = result.output;
          break;
        case "settings":
          this._settings = result.output;
          break;
        case "all":
          this._tags = result.output["tags"];
          this._keybinds = result.output["keybinds"];
          this._settings = result.output["settings"];
          break;
      }
    }
    importError() {
      return this._importError;
    }

    export(args) {
      switch (args.type) {
        case "tags":
          return JSON.stringify(this._tags);
        case "keybinds":
          return JSON.stringify(this._keybinds);
        case "settings":
          return JSON.stringify(this._settings);
        case "all":
          return JSON.stringify({
            tags: this._tags,
            keybinds: this._keybinds,
            settings: this._settings,
          });
      }
    }

    validate(_type, _data) {
      let data = typeof _data === "string" ? _data : JSON.stringify(_data);
      try {
        data = JSON.parse(data);
      } catch {
        return { error: "Invalid JSON" };
      }

      if (typeof data !== "object" || data === null)
        return { error: "Invalid JSON" };
      if (Array.isArray(data)) return { error: "Input can't be an Array" };

      if (_type === "tags") {
        for (const tag in data) {
          if (tag.startsWith("#")) {
            if (Array.isArray(data[tag])) {
              const index = data[tag].findIndex(
                (item) => typeof item !== "string"
              );
              if (index !== -1)
                return {
                  error: `Tags: Expected string at item #${index} of '${tag}'`,
                };
            } else {
              return { error: `Tags: Expected array at '${tag}'` };
            }
          } else {
            return { error: `Tags: Invalid tag id, reading '${tag}'` };
          }
        }
      }
      if (_type === "keybinds") {
        for (const event in data) {
          if (typeof data[event] === "object" && data[event] !== null) {
            for (const trigger in data[event]) {
              const triggerData = data[event][trigger];
              if (typeof triggerData === "object" && trigger) {
                if (triggerData["mode"]) {
                  if (
                    triggerData["mode"] === "together & in order" ||
                    triggerData["mode"] === "together & ignore order"
                  ) {
                    if (triggerData["keys"]) {
                      if (Array.isArray(triggerData["keys"])) {
                        const index = triggerData["keys"].findIndex(
                          (item) => typeof item !== "string"
                        );
                        if (index !== -1) {
                          return {
                            error: `Keybinds: Expected string at item #${index} of '${event}/${trigger}'`,
                          };
                        }
                      } else {
                        return {
                          error: `Keybinds: Expected array at '${event}/${trigger}/keys'`,
                        };
                      }
                    } else {
                      return {
                        error: `Missing 'keys' at '${event}/${trigger}'`,
                      };
                    }
                  } else {
                    return {
                      error: `Keybinds: Invalid input in '${event}/${trigger}/mode'`,
                    };
                  }
                } else {
                  return { error: `Missing 'mode' at '${event}/${trigger}'` };
                }
              } else {
                return {
                  error: `Keybinds: Expected JSON at '${event}/${trigger}'`,
                };
              }
            }
          } else {
            return { error: `Keybinds: Expected JSON at '${event}'` };
          }
        }
      }
      if (_type === "settings") {
        for (const setting in data) {
          if (typeof data[setting] !== "boolean") {
            return { error: `Settings: Expected boolean at '${setting}'` };
          }
        }
      }
      if (_type === "all") {
        if (!("settings" in data)) return { error: "Missing 'settings'" };
        if (!("tags" in data)) return { error: "Missing 'tags'" };
        if (!("keybinds" in data)) return { error: "Missing 'keybinds'" };

        const tagsValidation = this.validate("tags", data["tags"]);
        if (tagsValidation.error)
          return { error: `Tags: ${tagsValidation.error}` };

        const keybindsValidation = this.validate("keybinds", data["keybinds"]);
        if (keybindsValidation.error)
          return { error: `Keybinds: ${keybindsValidation.error}` };

        const settingsValidation = this.validate("settings", data["settings"]);
        if (settingsValidation.error)
          return { error: `Settings: ${settingsValidation.error}` };
      }

      return { output: data };
    }

    // Menu
    _getKeysMenu() {
      const tags = this._settings["includeTags"] ? Object.keys(this._tags) : [];
      return [
        "space",
        "up arrow",
        "down arrow",
        "right arrow",
        "left arrow",
        "backspace",
        "enter",
        "any",
        "right shift",
        "left shift",
        "right control",
        "left control",
        "right alt",
        "left alt",
        "right windows key",
        "left windows key",
        "context menu",
        "escape",
        "tab",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "`",
        "~",
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        "-",
        "+",
        "=",
        "[",
        "]",
        "{",
        "}",
        "\\",
        "|",
        ";",
        ":",
        "'",
        '"',
        ",",
        ".",
        "/",
        "?",
        "<",
        ">",
        "F1",
        "F2",
        "F3",
        "F4",
        "F5",
        "F6",
        "F7",
        "F8",
        "F9",
        "F10",
        "F11",
        "F12",
        "caps lock",
        "scroll lock",
        "num lock",
        "insert",
        "delete",
        "home",
        "end",
        "page up",
        "page down",
        "numpad: divide",
        "numpad: multiply",
        "numpad: subtract",
        "numpad: add",
        "numpad: 0",
        "numpad: 1",
        "numpad: 2",
        "numpad: 3",
        "numpad: 4",
        "numpad: 5",
        "numpad: 6",
        "numpad: 7",
        "numpad: 8",
        "numpad: 9",
        "numpad: decimal",
        "numpad: enter",
        ...tags,
      ];
    }
  }

  Scratch.extensions.register(new enderKeysPlusV2());
})(Scratch);
