// Name: Hyper Sense
// ID: HyperSenseSP
// Description: Cool New Sensing Blocks
// By: SharkPool
// License: MIT

// Version 3.0.32 (TW Ver)

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed)
    throw new Error("Hyper Sense must run unsandboxed");

  const menuIconURI =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDUuMjkzIiBoZWlnaHQ9IjE0NS4yOTMiIHZpZXdCb3g9IjAgMCAxNDUuMjkzIDE0NS4yOTMiPjxnIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTAgNzIuNjQ3QzAgMzIuNTI1IDMyLjUyNSAwIDcyLjY0NyAwczcyLjY0NyAzMi41MjUgNzIuNjQ3IDcyLjY0Ny0zMi41MjUgNzIuNjQ3LTcyLjY0NyA3Mi42NDdTMCAxMTIuNzY5IDAgNzIuNjQ3IiBmaWxsPSIjNDI3Zjk5Ii8+PHBhdGggZD0iTTguMDkxIDcyLjY0N2MwLTM1LjY1MyAyOC45MDMtNjQuNTU2IDY0LjU1Ni02NC41NTZzNjQuNTU2IDI4LjkwMyA2NC41NTYgNjQuNTU2LTI4LjkwMyA2NC41NTYtNjQuNTU2IDY0LjU1NlM4LjA5MSAxMDguMyA4LjA5MSA3Mi42NDciIGZpbGw9IiM1Y2IxZDYiLz48cGF0aCBkPSJNMTA2LjIxNSAxMDguODg0YTIuNjcgMi42NyAwIDAgMS0xLjg4Ni0uNzhMMzcuNzUgNDEuNTIyYTIuNjcgMi42NyAwIDAgMSAwLTMuNzcyIDIuNjcgMi42NyAwIDAgMSAzLjc3MiAwbDY2LjU4IDY2LjU4YTIuNjY5IDIuNjY5IDAgMCAxLTEuODg3IDQuNTU0IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTY1Ljc1NCA1MS4wODNjMCA4LjEwMy02LjU2OCAxNC42NzEtMTQuNjcxIDE0LjY3MXMtMTQuNjcxLTYuNTY4LTE0LjY3MS0xNC42N2MwLTguMTA0IDYuNTY4LTE0LjY3MiAxNC42Ny0xNC42NzIgOC4xMDQgMCAxNC42NzIgNi41NjggMTQuNjcyIDE0LjY3MSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik02My43MiA4MS4zNzFjLTcuODg1LTEuODYyLTEyLjc2OS05Ljc2NC0xMC45MDYtMTcuNjVzOS43NjQtMTIuNzY5IDE3LjY1LTEwLjkwNyAxMi43NjkgOS43NjUgMTAuOTA3IDE3LjY1Yy0xLjg2MiA3Ljg4Ni05Ljc2NSAxMi43Ny0xNy42NSAxMC45MDciIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNOTcuNzY3IDgzLjA5NGMwIDguMTAyLTYuNTcgMTQuNjczLTE0LjY3MyAxNC42NzNzLTE0LjY3Mi02LjU3LTE0LjY3Mi0xNC42NzMgNi41NjktMTQuNjcxIDE0LjY3Mi0xNC42NzFjOC4xMDIgMCAxNC42NzMgNi41NyAxNC42NzMgMTQuNjciIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTA2LjIxNSAxMDguODg0YTIuNjcgMi42NyAwIDAgMS0xLjg4Ni0uNzhsLTE2LjM0LTE2LjM0YTIuNjY1IDIuNjY1IDAgMCAxIDAtMy43NzMgMi42NyAyLjY3IDAgMCAxIDMuNzcyIDBsMTYuMzQgMTYuMzRhMi42NyAyLjY3IDAgMCAxIDAgMy43NzMgMi42OCAyLjY4IDAgMCAxLTEuODg2Ljc4IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTE1LjMxNSA3Mi42NDcgMjguMTIyIDU5Ljg0djI1LjYxNHptNzAuMTM5LTQ0LjUyNUg1OS44NGwxMi44MDctMTIuODA3em00NC41MjUgNDQuNTI1LTEyLjgwNyAxMi44MDdWNTkuODR6TTU5Ljg0IDExNy4xNzJoMjUuNjE0bC0xMi44MDcgMTIuODA3eiIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIvPjwvZz48L3N2Zz4=";

  const Cast = Scratch.Cast;
  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const render = vm.renderer;

  let curPressKey = "",
    pressedKeys = {};
  let mousePos = [0, 0, 0, 0],
    scrollDist = 0,
    oldScroll = [0, 0];
  let publicVars = {},
    askAs = "sprite",
    loudnessArray = [];

  class HyperSenseSP {
    constructor() {
      runtime.on("BEFORE_EXECUTE", () => {
        runtime.startHats("HyperSenseSP_whenKeyPressed");
        oldScroll[1] += (0 - oldScroll[1]) / 4;
        mousePos[2] += (0 - mousePos[2]) / 3;
        mousePos[3] += (0 - mousePos[3]) / 3;
        Object.keys(pressedKeys).forEach((key) => {
          pressedKeys[key] += 0.1;
        });
      });
      document.addEventListener("wheel", this.handleScroll);
      document.addEventListener("mousemove", (e) => {
        mousePos = [
          e.clientX,
          e.clientY,
          runtime.ioDevices.mouse.getScratchX(),
          runtime.ioDevices.mouse.getScratchY(),
        ];
      });
      window.addEventListener("keydown", (e) => {
        const name = this.toProperKey(e.key, false);
        if (pressedKeys[name] === undefined) pressedKeys[name] = 0;
        curPressKey = name;
      });
      window.addEventListener("keyup", (e) => {
        delete pressedKeys[this.toProperKey(e.key, false)];
        curPressKey = Object.keys(pressedKeys).pop() || "";
      });
    }
    getInfo() {
      return {
        id: "HyperSenseSP",
        name: "Hyper Sense",
        color1: "#5cb1d6",
        color2: "#47a8d1",
        color3: "#2e8eb8",
        menuIconURI,
        blocks: [
          { blockType: Scratch.BlockType.LABEL, text: "Scrolling" },
          {
            opcode: "monitorScrollWheel",
            blockType: Scratch.BlockType.REPORTER,
            text: "scroll distance",
          },
          {
            opcode: "scrollVel",
            blockType: Scratch.BlockType.REPORTER,
            text: "scroll velocity",
          },
          {
            opcode: "setScrollDistance",
            blockType: Scratch.BlockType.COMMAND,
            text: "set scroll distance to [DISTANCE]",
            arguments: {
              DISTANCE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "changeScrollDistance",
            blockType: Scratch.BlockType.COMMAND,
            text: "change scroll distance by [DISTANCE]",
            arguments: {
              DISTANCE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          {
            opcode: "scrollWheelHat",
            blockType: Scratch.BlockType.EVENT,
            text: "when scrolled [EVENT]",
            isEdgeActivated: false,
            arguments: {
              EVENT: {
                type: Scratch.ArgumentType.STRING,
                menu: "SCROLL_EVENTS",
              },
            },
          },
          {
            opcode: "scrollWheelBool",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is scrolling [EVENT]?",
            disableMonitor: true,
            arguments: {
              EVENT: {
                type: Scratch.ArgumentType.STRING,
                menu: "SCROLL_EVENTS",
              },
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Mouse Detection" },
          {
            opcode: "mouseClick",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is mouse [BUTTON] down?",
            arguments: {
              BUTTON: {
                type: Scratch.ArgumentType.NUMBER,
                menu: "mouseButtons",
              },
            },
          },
          {
            opcode: "realX",
            blockType: Scratch.BlockType.REPORTER,
            text: "real mouse x",
          },
          {
            opcode: "realY",
            blockType: Scratch.BlockType.REPORTER,
            text: "real mouse y",
          },
          "---",
          {
            opcode: "velX",
            blockType: Scratch.BlockType.REPORTER,
            text: "mouse velocity x",
          },
          {
            opcode: "velY",
            blockType: Scratch.BlockType.REPORTER,
            text: "mouse velocity y",
          },
          { blockType: Scratch.BlockType.LABEL, text: "Key Detection" },
          {
            opcode: "whenKeyHit",
            blockType: Scratch.BlockType.HAT,
            text: "when [KEY] hit",
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, menu: "keys" },
            },
          },
          {
            opcode: "isKeyHit",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "key [KEY] hit?",
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, menu: "keys" },
            },
          },
          "---",
          {
            opcode: "whenKeyPressed",
            blockType: Scratch.BlockType.HAT,
            text: "when [KEY] pressed",
            isEdgeActivated: false,
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                menu: "keys",
                defaultValue: "Tab",
              },
            },
          },
          {
            opcode: "isKeyPressed",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "key [KEY] pressed?",
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                menu: "keys",
                defaultValue: "Tab",
              },
            },
          },
          "---",
          {
            opcode: "currentKey",
            blockType: Scratch.BlockType.REPORTER,
            text: "current key pressed",
          },
          {
            opcode: "currentKeys",
            blockType: Scratch.BlockType.REPORTER,
            text: "current keys pressed",
          },
          {
            opcode: "timeKeyPressed",
            blockType: Scratch.BlockType.REPORTER,
            text: "seconds [KEY] key pressed",
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, menu: "keys" },
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Touching Expanded" },
          {
            opcode: "spritePointing",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [SPRITE1] pointing towards [SPRITE2]?",
            arguments: {
              SPRITE1: { type: Scratch.ArgumentType.STRING, menu: "TARGETS3" },
              SPRITE2: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          {
            opcode: "spriteTouchingSprite",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [SPRITE1] touching [SPRITE2]?",
            arguments: {
              SPRITE1: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              SPRITE2: { type: Scratch.ArgumentType.STRING, menu: "TARGETS3" },
            },
          },
          {
            opcode: "spriteTouchingSpriteType",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [SPRITE1] touching [TYPE] of [SPRITE2]?",
            arguments: {
              SPRITE1: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "TARGET_TYPE" },
              SPRITE2: { type: Scratch.ArgumentType.STRING, menu: "TARGETS4" },
            },
          },
          {
            opcode: "spriteTouchingClone",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [SPRITE1] touching clone of [SPRITE2] with [VAR] set to [VAL]?",
            arguments: {
              SPRITE1: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" },
              SPRITE2: { type: Scratch.ArgumentType.STRING, menu: "TARGETS4" },
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
              VAL: { type: Scratch.ArgumentType.STRING, defaultValue: 0 },
            },
          },
          "---",
          {
            opcode: "spriteCurrentTouching",
            blockType: Scratch.BlockType.REPORTER,
            text: "sprites touching [SPRITE]",
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" },
            },
          },
          {
            opcode: "getNeighbors",
            blockType: Scratch.BlockType.REPORTER,
            text: "neighbors of [SPRITE] in range [DIAMETER]",
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" },
              DIAMETER: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 200,
              },
            },
          },
          "---",
          {
            opcode: "colorTouchingSprite",
            blockType: Scratch.BlockType.REPORTER,
            text: "color touching [SPRITE]",
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" },
            },
          },
          {
            opcode: "colorAtPosition",
            blockType: Scratch.BlockType.REPORTER,
            text: "color at x [x] y [y]",
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Strings" },
          {
            opcode: "boolean",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [STRING] real?",
            arguments: {
              STRING: { type: Scratch.ArgumentType.STRING },
            },
          },
          {
            opcode: "getAllString",
            blockType: Scratch.BlockType.REPORTER,
            text: "get [TEXT] in [STRING]",
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "rotating a 6 makes a 9!",
              },
              TEXT: { type: Scratch.ArgumentType.STRING, menu: "string_types" },
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Asking" },
          {
            opcode: "advancedAsk",
            blockType: Scratch.BlockType.COMMAND,
            text: "ask [QUESTION] as [THING] and [WAIT]",
            arguments: {
              THING: { type: Scratch.ArgumentType.STRING, menu: "Asking" },
              QUESTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "what is your name?",
              },
              WAIT: { type: Scratch.ArgumentType.STRING, menu: "shouldWait" },
            },
          },
          {
            opcode: "advancedAskReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: "ask [QUESTION] as [THING]",
            arguments: {
              THING: { type: Scratch.ArgumentType.STRING, menu: "Asking" },
              QUESTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "what is your name?",
              },
            },
          },
          {
            opcode: "stopAsking",
            blockType: Scratch.BlockType.COMMAND,
            text: "stop asking question",
          },
          {
            opcode: "currentTyped",
            blockType: Scratch.BlockType.REPORTER,
            text: "typed answer",
          },
          {
            opcode: "isAsking",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is asking?",
          },
          "---",
          {
            opcode: "setAtt",
            blockType: Scratch.BlockType.COMMAND,
            text: "set ask monitor x: [x] y: [y] width: [width]",
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              width: { type: Scratch.ArgumentType.NUMBER, defaultValue: 480 },
            },
          },
          {
            opcode: "setAskType",
            blockType: Scratch.BlockType.COMMAND,
            text: "set ask box input to [TYPE]",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "INPUTS" },
            },
          },
          {
            opcode: "setAskType2",
            blockType: Scratch.BlockType.COMMAND,
            text: "set ask box input to dropdown with items in array [TYPE]",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["option 1", "option 2"]',
              },
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Miscellaneous" },
          {
            opcode: "isScreen",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [SCREEN] ?",
            disableMonitor: true,
            arguments: {
              SCREEN: { type: Scratch.ArgumentType.STRING, menu: "SCREENS" },
            },
          },
          {
            opcode: "screenOff",
            blockType: Scratch.BlockType.REPORTER,
            text: "stage size offset",
          },
          "---",
          {
            opcode: "averageMicrophoneLoudness",
            blockType: Scratch.BlockType.REPORTER,
            text: "average loudness",
          },
          {
            opcode: "allLayers",
            blockType: Scratch.BlockType.REPORTER,
            text: "max sprite layers",
          },
          "---",
          {
            opcode: "spriteDragMode",
            blockType: Scratch.BlockType.COMMAND,
            text: "set drag mode of [SPRITE] to [DRAG]",
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS3" },
              DRAG: { type: Scratch.ArgumentType.STRING, menu: "DRAG_MODES" },
            },
          },
          {
            opcode: "spriteDragging",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [SPRITE] [DRAG] ?",
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS3" },
              DRAG: { type: Scratch.ArgumentType.STRING, menu: "DRAG_TYPE" },
            },
          },
        ],
        menus: {
          TARGETS: {
            acceptReporters: true,
            items: this._getTargets(true, false),
          },
          TARGETS2: {
            acceptReporters: true,
            items: this._getTargets(true, true),
          },
          TARGETS3: {
            acceptReporters: true,
            items: this._getTargets(false, true),
          },
          TARGETS4: {
            acceptReporters: true,
            items: this._getTargets(false, false),
          },
          TARGET_TYPE: ["parent", "clone"],
          SCREENS: ["fullscreen", "smallscreen"],
          INPUTS: ["text", "password", "number", "color"],
          Asking: ["stage", "sprite"],
          shouldWait: ["wait", "continue"],
          SCROLL_EVENTS: ["up", "down"],
          DRAG_TYPE: ["draggable", "being dragged"],
          DRAG_MODES: {
            acceptReporters: true,
            items: ["draggable", "not draggable"],
          },
          string_types: {
            acceptReporters: true,
            items: ["numbers", "letters", "special characters"],
          },
          keys: {
            acceptReporters: true,
            items: [
              "Any",
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
              "Up Arrow",
              "Down Arrow",
              "Left Arrow",
              "Right Arrow",
              "Space",
              "Enter",
              "Shift",
              "Control",
              "Alt",
              "Escape",
              "Backspace",
              "Tab",
              "Caps Lock",
              "Insert",
              "Page Up",
              "Page Down",
            ],
          },
          mouseButtons: {
            acceptReporters: true,
            items: [
              { text: "left", value: "0" },
              { text: "scroll wheel", value: "1" },
              { text: "right", value: "2" },
              { text: "back", value: "3" },
              { text: "foward", value: "4" },
            ],
          },
        },
      };
    }

    // Helper Funcs
    _getTargets(mouse, myself) {
      const spriteNames = [];
      if (mouse) {
        spriteNames.push({ text: "mouse-pointer", value: "_mouse_" });
      }
      if (myself) {
        spriteNames.push({ text: "myself", value: "_myself_" });
      }
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

    handleScroll = (event) => {
      scrollDist += event.deltaY;
      oldScroll[1] = event.deltaY;
      if (this.scrollWheelBool({ EVENT: "up", SECRET: true }))
        runtime.startHats("HyperSenseSP_scrollWheelHat", { EVENT: "up" });
      if (this.scrollWheelBool({ EVENT: "down", SECRET: true }))
        runtime.startHats("HyperSenseSP_scrollWheelHat", { EVENT: "down" });
    };

    toProperKey(key, reverse) {
      if (reverse) {
        if (key === "CAPSLOCK") return "Caps Lock";
        key = Scratch.Cast.toString(key).replace("DIGIT", "").toLowerCase();
        if (key.includes("arrow")) key = key.replace("arrow", "") + " Arrow";
        if (key.includes("page"))
          key = "Page " + key.charAt(4).toUpperCase() + key.slice(5);
        key = key.charAt(0).toUpperCase() + key.slice(1);
      } else {
        if (key === " ") return "SPACE";
        key = key.toUpperCase().replaceAll(" ", "");
        if (!isNaN(parseFloat(key))) return "DIGIT" + key;
        if (key.includes("ARROW")) key = key.replace("ARROW", "") + "ARROW";
      }
      return key;
    }

    getTarget(name, util, checkMouse, checkMyself, returnName) {
      if (checkMouse && name === "_mouse_") return "_mouse_";
      if (checkMyself && name === "_myself_")
        return returnName ? util.target.getName() : util.target;

      const target = runtime.getSpriteTargetByName(name);
      if (returnName) return target ? target.getName() : name;
      else return target;
    }

    keyHandler(key, loop) {
      key = this.toProperKey(key, false);
      if (key === "ANY" && curPressKey !== "") {
        if (loop) return true;
        else return pressedKeys[curPressKey] <= 0.1;
      }
      if (pressedKeys[key]) {
        if (loop) return true;
        else return pressedKeys[key] <= 0.1;
      }
      return false;
    }

    colorTouching(x, y) {
      const clientX = Math.round(
        ((runtime.stageWidth / 2 + x) / runtime.stageWidth) *
          render._gl.canvas.clientWidth
      );
      const clientY = Math.round(
        ((runtime.stageHeight / 2 - y) / runtime.stageHeight) *
          render._gl.canvas.clientHeight
      );
      const rgb = render.extractColor(clientX, clientY, 20).color;
      return `#${rgb.r.toString(16).padStart(2, "0")}${rgb.g.toString(16).padStart(2, "0")}${rgb.b.toString(16).padStart(2, "0")}`;
    }

    // Block Funcs
    monitorScrollWheel() {
      return scrollDist;
    }
    scrollVel() {
      return oldScroll[1] * -1;
    }

    setScrollDistance(args) {
      scrollDist = Scratch.Cast.toNumber(args.DISTANCE);
    }
    changeScrollDistance(args) {
      scrollDist += Scratch.Cast.toNumber(args.DISTANCE);
    }

    scrollWheelBool(args, util) {
      let oldVal;
      if (args.SECRET) oldVal = oldScroll[0];
      else {
        if (util.thread.stackFrames[0].oldVal === undefined)
          util.thread.stackFrames[0].oldVal = 0;
        oldVal = util.thread.stackFrames[0].oldVal;
      }
      const status =
        args.EVENT === "down" ? scrollDist > oldVal : scrollDist < oldVal;
      if (status) {
        if (args.SECRET) oldScroll[0] = scrollDist;
        else util.thread.stackFrames[0].oldVal = scrollDist;
      }
      return Scratch.Cast.toBoolean(status);
    }

    mouseClick(args, util) {
      return util.ioQuery("mouse", "getButtonIsDown", [
        Scratch.Cast.toNumber(args.BUTTON),
      ]);
    }
    realX() {
      return mousePos[0];
    }
    realY() {
      return mousePos[1];
    }
    velX() {
      return mousePos[2];
    }
    velY() {
      return mousePos[3];
    }

    isKeyHit(args) {
      return this.keyHandler(Scratch.Cast.toString(args.KEY), false);
    }
    whenKeyHit(args) {
      return this.keyHandler(Scratch.Cast.toString(args.KEY), false);
    }

    whenKeyPressed(args) {
      return this.keyHandler(Scratch.Cast.toString(args.KEY), true);
    }
    isKeyPressed(args) {
      return this.keyHandler(Scratch.Cast.toString(args.KEY), true);
    }

    currentKey() {
      return this.toProperKey(curPressKey, true);
    }
    currentKeys() {
      return JSON.stringify(
        Object.keys(pressedKeys).map((key) => {
          return this.toProperKey(key, true);
        })
      );
    }

    timeKeyPressed(args) {
      const key = this.toProperKey(Scratch.Cast.toString(args.KEY), false);
      if (key === "ANY") return Math.max(0, ...Object.values(pressedKeys));
      else return pressedKeys[key] ?? 0;
    }

    spritePointing(args, util) {
      const target = this.getTarget(args.SPRITE1, util, false, true, false);
      if (!target) return false;
      const oldDir = target.direction;
      runtime.ext_scratch3_motion.pointTowards(
        { TOWARDS: args.SPRITE2 },
        { ...util, target, ioQuery: util.ioQuery }
      );
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
        else
          return render.isTouchingDrawables(target1.drawableID, [
            target2.drawableID,
          ]);
      } else {
        const clones = target2.sprite.clones;
        if (target1 === "_mouse_")
          return clones.some(
            (c) => !c.isOriginal && c.isTouchingObject("_mouse_")
          );
        else {
          const cloneIds = [];
          for (var i = 1; i < clones.length; i++)
            cloneIds.push(clones[i].drawableID);
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
        if (clones[i]) {
          const variable = clones[i].lookupVariableByNameAndType(
            args.VAR,
            "",
            clones[i]
          );
          if (
            variable &&
            Cast.toString(variable.value) === Cast.toString(args.VAL)
          ) {
            if (target1 === "_mouse_") {
              if (clones[i].isTouchingObject("_mouse_")) return true;
            } else {
              if (
                render.isTouchingDrawables(target1.drawableID, [
                  clones[i].drawableID,
                ])
              )
                return true;
            }
          }
        }
      }
      return false;
    }

    spriteCurrentTouching(args, util) {
      const list = [];
      const thisSprite = this.getTarget(args.SPRITE, util, true, true, true);
      const targets = runtime.targets;
      for (let i = 1; i < targets.length; i++) {
        const target = targets[i];
        const name = `${target.getName()}${target.isOriginal ? "" : " (Clone)"}`;
        if (target.isTouchingObject(thisSprite) && name !== thisSprite)
          list.push(name);
      }
      return JSON.stringify(list);
    }

    getNeighbors(args, util) {
      const circ = Scratch.Cast.toNumber(args.DIAMETER);
      let list = [],
        pos = [];
      if (args.SPRITE === "_mouse_")
        pos = [
          util.ioQuery("mouse", "getScratchX"),
          util.ioQuery("mouse", "getScratchY"),
          "",
        ];
      else if (args.SPRITE === "_myself_")
        pos = [util.target.x, util.target.y, util.target.id];
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
        if (Math.sqrt(dx * dx + dy * dy) <= circ && target.id !== pos[2])
          list.push(
            `${target.getName()}${target.isOriginal ? "" : " (Clone)"}`
          );
      }
      return JSON.stringify(list);
    }

    colorAtPosition(args) {
      return this.colorTouching(
        Scratch.Cast.toNumber(args.x),
        Scratch.Cast.toNumber(args.y)
      );
    }
    colorTouchingSprite(args, util) {
      if (args.SPRITE === "_mouse_")
        return this.colorTouching(
          util.ioQuery("mouse", "getScratchX"),
          util.ioQuery("mouse", "getScratchY")
        );
      else {
        const target = this.getTarget(args.SPRITE, util, false, true, false);
        if (!target) return "";
        const wasVisible = target.visible;
        target.setVisible(false);
        const hex = this.colorTouching(target.x, target.y);
        target.setVisible(wasVisible);
        return hex;
      }
    }

    boolean(args) {
      return Scratch.Cast.toBoolean(args.STRING) && args.STRING !== undefined;
    }

    getAllString(args) {
      let regex;
      switch (args.TEXT) {
        case "numbers": {
          regex = /[^0-9]/g;
          break;
        }
        case "special characters": {
          regex = /[A-Za-z0-9]/g;
          break;
        }
        default:
          regex = /[^A-Za-z]/g;
      }
      return Scratch.Cast.toString(args.STRING).replace(regex, "");
    }

    advancedAsk(args, util) {
      const wasVisible = util.target.visible;
      if (!util.target.isStage && args.THING === "stage")
        util.target.setVisible(false);
      askAs = args.THING;
      return new Promise((resolve) => {
        runtime.ext_scratch3_sensing.askAndWait(args, util);
        if (!util.target.isStage && wasVisible) util.target.setVisible(true);
        if (publicVars.askStuff) this.setAtt(publicVars.askStuff);
        if (publicVars.askType) this.setAskType(publicVars.askType);
        if (args.WAIT === "continue") resolve();
        else runtime.once("ANSWER", () => resolve());
      });
    }
    advancedAskReporter(args, util) {
      return this.advancedAsk(args, util).then(() => {
        return runtime.ext_scratch3_sensing.getAnswer();
      });
    }

    stopAsking() {
      runtime.emit("ANSWER", this.currentTyped());
      runtime.emit("QUESTION", null);
    }

    currentTyped() {
      let box = document.querySelector(
        typeof scaffolding !== "undefined"
          ? `input[class="sc-question-input"]`
          : `div[class*="question"] [class^="input_input-form"]`
      );
      return box ? box.value : "";
    }

    isAsking() {
      return Scratch.Cast.toBoolean(
        document.querySelector(`div[class*="question-input"]`)
      );
    }

    setAtt(args) {
      let box = document.querySelector(`div[class*="question"]`);
      if (!box) return (publicVars.askStuff = args);
      const canvas = getComputedStyle(render.canvas);
      const width = Scratch.Cast.toNumber(args.width);
      if (width)
        box.style.width = `${width * (parseInt(canvas.width) / 480)}px`;
      const x =
        Scratch.Cast.toNumber(args.x) +
        parseInt(canvas.width) / 2 -
        (width * (parseInt(canvas.width) / 480)) / 2;
      const y =
        Scratch.Cast.toNumber(args.y) +
        parseInt(canvas.height) / 2 -
        (askAs === "stage" ? 53 : 39);
      box.style.transform = `translate(${x}px, ${y * -1}px)`;
    }

    setAskType(args) {
      let box = document.querySelector(
        typeof scaffolding !== "undefined"
          ? `input[class="sc-question-input"]`
          : `div[class*="question"] [class^="input_input-form"]`
      );
      if (!box) return (publicVars.askType = args);
      const element = document.getElementById("SP-input_select");
      if (element) box.parentNode.removeChild(element);
      if (args.TYPE === "dropdown") {
        const width = box.parentNode.getBoundingClientRect().width;
        let dropdown = document.createElement("select");
        dropdown.id = "SP-input_select";
        dropdown.setAttribute(
          "style",
          `background: #fff; color: #505050; width: ${width - 40}px; display: block; border-width: 2px; border-color: #D9D9D9; transform: translate(0px,3px);`
        );
        args.LIST.forEach((item) => {
          let option = document.createElement("option");
          option.value = item;
          option.text = item;
          dropdown.appendChild(option);
        });
        box.parentNode.appendChild(dropdown);
        box.style.display = "none";
        box.value = dropdown.value;
        dropdown.addEventListener("change", () => {
          box.value = dropdown.value;
        });
        const button = document.querySelector(
          `button[class*="question-submit-button"]`
        );
        button.addEventListener("click", () => {
          setTimeout(() => {
            runtime.ext_scratch3_sensing._answer = box.value;
          }, 10);
        });
      } else {
        box.type = args.TYPE;
        box.pattern = args.TYPE === "number" ? "[0-9]*" : "none";
        box.style.display = "block";
      }
    }
    setAskType2(args, util) {
      try {
        const array = JSON.parse(args.TYPE);
        if (array.length > 0)
          this.setAskType({ ...args, TYPE: "dropdown", LIST: array });
      } catch {}
    }

    isScreen(args) {
      const values = [
        render.canvas.getBoundingClientRect().width,
        runtime.stageWidth,
      ];
      return args.SCREEN === "fullscreen"
        ? values[0] > values[1]
        : values[0] < values[1];
    }
    screenOff() {
      return render.canvas.getBoundingClientRect().width / runtime.stageWidth;
    }

    averageMicrophoneLoudness() {
      if (loudnessArray.length >= 30) loudnessArray = [];
      loudnessArray.push(runtime.ext_scratch3_sensing.getLoudness());
      let sum = loudnessArray.reduce(
        (accumulator, curValue) => accumulator + curValue,
        0
      );
      return Math.round((sum / loudnessArray.length) * 100) / 100;
    }

    allLayers() {
      return render._drawList.length - 1;
    }

    spriteDragMode(args, util) {
      const target = this.getTarget(args.SPRITE, util, false, true, false);
      if (target) target.setDraggable(args.DRAG === "draggable");
    }
    spriteDragging(args, util) {
      const target = this.getTarget(args.SPRITE, util, false, true, false);
      if (target)
        return target[args.DRAG === "draggable" ? "draggable" : "dragging"];
      return false;
    }
  }

  Scratch.extensions.register(new HyperSenseSP());
})(Scratch);
