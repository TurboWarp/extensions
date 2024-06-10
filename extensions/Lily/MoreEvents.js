// Name: More Events
// ID: lmsMoreEvents
// Description: Start your scripts in new ways.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>
// License: MIT AND LGPL-3.0

(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const stopIcon =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAQlBMVEUAAAC/UFC8Q0OzTU24SEi4SEi3SEi4R0e4SEi4SEi4SEi4SEi7SUm8SUnMTk7MT0/OT0/PT0/gVVXiVVXsWVn///+CoOd2AAAAC3RSTlMAEBMUu7zLz9D8/dIXnJwAAAABYktHRBXl2PmjAAAAxklEQVRIx+3WwRKDIBAD0JWqVEOtWv7/W3twOqKwELzW3N9wYhORMMYiztgZUZMUAKxqmh5Kno/MG256nzI59Z2mB+BWH+XzUt5RhWoyQjFZkTQFkTBFERlCnAwlDoYUgaHFblpaeL86AK0MvNjMIABmT2cGIAAWniw3ucm/k9ovduEjXzgXtUfJmtrTt9VZzYH9FSB/xvfKZMsiLFmuko61zBTfucjL9RpXf6nEU2MhPxXS86J+kORmjz6V6seViOnG8oT7ApMcjsYZwhXCAAAAAElFTkSuQmCC";

  // Source:
  // https://github.com/TurboWarp/scratch-vm/blob/develop/src/io/keyboard.js
  // https://github.com/TurboWarp/scratch-blocks/blob/develop/blocks_vertical/event.js
  const validKeyboardInputs = [
    // Special Inputs
    { text: "space", value: "space" },
    { text: "up arrow", value: "up arrow" },
    { text: "down arrow", value: "down arrow" },
    { text: "right arrow", value: "right arrow" },
    { text: "left arrow", value: "left arrow" },
    { text: "enter", value: "enter" },
    // TW: Extra Special Inputs
    { text: "backspace", value: "backspace" },
    { text: "delete", value: "delete" },
    { text: "shift", value: "shift" },
    { text: "caps lock", value: "caps lock" },
    { text: "scroll lock", value: "scroll lock" },
    { text: "control", value: "control" },
    { text: "escape", value: "escape" },
    { text: "insert", value: "insert" },
    { text: "home", value: "home" },
    { text: "end", value: "end" },
    { text: "page up", value: "page up" },
    { text: "page down", value: "page down" },
    // Letter Keyboard Inputs
    { text: "a", value: "a" },
    { text: "b", value: "b" },
    { text: "c", value: "c" },
    { text: "d", value: "d" },
    { text: "e", value: "e" },
    { text: "f", value: "f" },
    { text: "g", value: "g" },
    { text: "h", value: "h" },
    { text: "i", value: "i" },
    { text: "j", value: "j" },
    { text: "k", value: "k" },
    { text: "l", value: "l" },
    { text: "m", value: "m" },
    { text: "n", value: "n" },
    { text: "o", value: "o" },
    { text: "p", value: "p" },
    { text: "q", value: "q" },
    { text: "r", value: "r" },
    { text: "s", value: "s" },
    { text: "t", value: "t" },
    { text: "u", value: "u" },
    { text: "v", value: "v" },
    { text: "w", value: "w" },
    { text: "x", value: "x" },
    { text: "y", value: "y" },
    { text: "z", value: "z" },
    // Number Keyboard Inputs
    { text: "0", value: "0" },
    { text: "1", value: "1" },
    { text: "2", value: "2" },
    { text: "3", value: "3" },
    { text: "4", value: "4" },
    { text: "5", value: "5" },
    { text: "6", value: "6" },
    { text: "7", value: "7" },
    { text: "8", value: "8" },
    { text: "9", value: "9" },
  ];

  var lastValues = {};
  var runTimer = 0;

  const MAX_BEFORE_SAVE_MS = 3000;

  const beforeSave = () =>
    new Promise((resolve) => {
      const threads = vm.runtime.startHats("lmsMoreEvents_beforeSave");

      if (threads.length === 0) {
        resolve();
        return;
      }

      const startTime = performance.now();
      const checkThreadStatus = () => {
        if (
          performance.now() - startTime > MAX_BEFORE_SAVE_MS ||
          threads.every((thread) => !vm.runtime.isActiveThread(thread))
        ) {
          vm.runtime.off("AFTER_EXECUTE", checkThreadStatus);
          resolve();
        }
      };

      vm.runtime.on("AFTER_EXECUTE", checkThreadStatus);
    });

  const afterSave = () => {
    // Wait until the next frame actually starts so that the actual file
    // saving routine has a chance to finish before we starting running blocks.
    vm.runtime.once("BEFORE_EXECUTE", () => {
      vm.runtime.startHats("lmsMoreEvents_afterSave");
    });
  };

  const originalSaveProjectSb3 = vm.saveProjectSb3;
  vm.saveProjectSb3 = async function (...args) {
    await beforeSave();
    const result = await originalSaveProjectSb3.apply(this, args);
    afterSave();
    return result;
  };

  const originalSaveProjectSb3Stream = vm.saveProjectSb3Stream;
  vm.saveProjectSb3Stream = function (...args) {
    // This is complicated because we need to return a stream object syncronously...

    let realStream = null;
    const queuedCalls = [];

    const whenStreamReady = (methodName, args) => {
      if (realStream) {
        return realStream[methodName].apply(realStream, args);
      } else {
        return new Promise((resolve) => {
          queuedCalls.push({
            resolve,
            methodName,
            args,
          });
        });
      }
    };

    const streamWrapper = {
      on: (...args) => void whenStreamReady("on", args),
      pause: (...args) => void whenStreamReady("pause", args),
      resume: (...args) => void whenStreamReady("resume", args),
      accumulate: (...args) => whenStreamReady("accumulate", args),
    };

    beforeSave().then(() => {
      realStream = originalSaveProjectSb3Stream.apply(this, args);

      realStream.on("end", () => {
        // Not sure how JSZip handles errors here, so we'll make sure not to break anything if
        // afterSave somehow throws
        try {
          afterSave();
        } catch (e) {
          console.error(e);
        }
      });

      for (const queued of queuedCalls) {
        queued.resolve(
          realStream[queued.methodName].apply(realStream, queued.args)
        );
      }
      queuedCalls.length = 0;
    });

    return streamWrapper;
  };

  class MoreEvents {
    constructor() {
      // Stop Sign Clicked contributed by @CST1229
      runtime.shouldExecuteStopClicked = true;
      runtime.on("BEFORE_EXECUTE", () => {
        runTimer++;
        runtime.shouldExecuteStopClicked = false;

        runtime.startHats("lmsMoreEvents_forever");
        runtime.startHats("lmsMoreEvents_whileTrueFalse");
        runtime.startHats("lmsMoreEvents_whenValueChanged");
        runtime.startHats("lmsMoreEvents_everyDuration");
        runtime.startHats("lmsMoreEvents_whileKeyPressed");
      });
      runtime.on("PROJECT_START", () => {
        runTimer = 0;
      });
      runtime.on("PROJECT_STOP_ALL", () => {
        runTimer = 0;
        if (runtime.shouldExecuteStopClicked)
          queueMicrotask(() =>
            runtime.startHats("lmsMoreEvents_whenStopClicked")
          );
      });
      runtime.on("AFTER_EXECUTE", () => {
        runtime.shouldExecuteStopClicked = true;
      });
      const originalGreenFlag = vm.greenFlag;
      vm.greenFlag = function () {
        runtime.shouldExecuteStopClicked = false;
        originalGreenFlag.call(this);
      };
    }

    getInfo() {
      return {
        id: "lmsMoreEvents",
        name: Scratch.translate("More Events"),
        color1: "#FFBF00",
        color2: "#E6AC00",
        color3: "#CC9900",
        blocks: [
          {
            opcode: "whenStopClicked",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when [STOP] clicked"),
            isEdgeActivated: false,
            arguments: {
              STOP: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: stopIcon,
              },
            },
            extensions: ["colours_event"],
          },
          {
            opcode: "forever",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("forever"),
            isEdgeActivated: false,
            extensions: ["colours_event"],
          },

          "---",

          {
            opcode: "whenTrueFalse",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when [CONDITION] becomes [STATE]"),
            isEdgeActivated: true,
            arguments: {
              CONDITION: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              STATE: {
                type: Scratch.ArgumentType.STRING,
                menu: "boolean",
              },
            },
            extensions: ["colours_event"],
          },
          {
            opcode: "whileTrueFalse",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("while [CONDITION] is [STATE]"),
            isEdgeActivated: false,
            arguments: {
              CONDITION: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              STATE: {
                type: Scratch.ArgumentType.STRING,
                menu: "boolean",
              },
            },
            extensions: ["colours_event"],
          },

          "---",

          {
            opcode: "whenValueChanged",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when [INPUT] is changed"),
            isEdgeActivated: false,
            arguments: {
              INPUT: {
                // Intentional:
                // Encourages people to place a block
                // (as opposed to typing a value)
                type: null,
              },
            },
            extensions: ["colours_event"],
          },
          {
            opcode: "everyDuration",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("every [DURATION] frames"),
            isEdgeActivated: false,
            arguments: {
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3,
              },
            },
            extensions: ["colours_event"],
          },

          "---",

          {
            opcode: "whenKeyAction",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when [KEY_OPTION] key [ACTION]"),
            isEdgeActivated: true,
            arguments: {
              KEY_OPTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "space",
                menu: "keyboardButtons",
              },
              ACTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "action",
              },
            },
            extensions: ["colours_event"],
          },
          {
            opcode: "whileKeyPressed",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("while [KEY_OPTION] key pressed"),
            isEdgeActivated: false,
            arguments: {
              KEY_OPTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "space",
                menu: "keyboardButtons",
              },
            },
            extensions: ["colours_event"],
          },

          "---",

          {
            opcode: "broadcastToTarget",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("broadcast [BROADCAST_OPTION] to [TARGET]"),
            arguments: {
              BROADCAST_OPTION: {
                type: null,
              },
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "targetMenu",
              },
            },
            hideFromPalette: true,
            extensions: ["colours_event"],
          },
          {
            opcode: "broadcastToTargetAndWait",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("broadcast [BROADCAST_OPTION] to [TARGET] and wait"),
            arguments: {
              BROADCAST_OPTION: {
                type: null,
              },
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "targetMenu",
              },
            },
            hideFromPalette: true,
            extensions: ["colours_event"],
          },

          "---",

          {
            opcode: "broadcastData",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("broadcast [BROADCAST_OPTION] with data [DATA]"),
            arguments: {
              BROADCAST_OPTION: {
                type: null,
              },
              DATA: {
                type: Scratch.ArgumentType.STRING,
              },
            },
            hideFromPalette: true,
            extensions: ["colours_event"],
          },
          {
            opcode: "broadcastDataAndWait",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("broadcast [BROADCAST_OPTION] with data [DATA] and wait"),
            arguments: {
              BROADCAST_OPTION: {
                type: null,
              },
              DATA: {
                type: Scratch.ArgumentType.STRING,
              },
            },
            hideFromPalette: true,
            extensions: ["colours_event"],
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: '<block type="lmsMoreEvents_broadcastToTarget"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value><value name="TARGET"><shadow type="lmsMoreEvents_menu_targetMenu"></shadow></value></block><block type="lmsMoreEvents_broadcastToTargetAndWait"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value><value name="TARGET"><shadow type="lmsMoreEvents_menu_targetMenu"></shadow></value></block><sep gap="36"/><block type="lmsMoreEvents_broadcastData"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value><value name="DATA"><shadow type="text"></shadow></value></block><block type="lmsMoreEvents_broadcastDataAndWait"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value><value name="DATA"><shadow type="text"></shadow></value></block>',
          },
          {
            opcode: "receivedData",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("received data"),
            disableMonitor: true,
            allowDropAnywhere: true,
            extensions: ["colours_event"],
          },

          "---",

          {
            opcode: "broadcastDataToTarget",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("broadcast [BROADCAST_OPTION] to [TARGET] with data [DATA]"),
            func: "broadcastToTarget",
            arguments: {
              BROADCAST_OPTION: {
                type: null,
              },
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "targetMenu",
              },
              DATA: {
                type: Scratch.ArgumentType.STRING,
              },
            },
            hideFromPalette: true,
            extensions: ["colours_event"],
          },
          {
            opcode: "broadcastDataToTargetAndWait",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("broadcast [BROADCAST_OPTION] to [TARGET] with data [DATA] and wait"),
            func: "broadcastToTargetAndWait",
            arguments: {
              BROADCAST_OPTION: {
                type: null,
              },
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "targetMenu",
              },
              DATA: {
                type: Scratch.ArgumentType.STRING,
              },
            },
            hideFromPalette: true,
            extensions: ["colours_event"],
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: '<block type="lmsMoreEvents_broadcastDataToTarget"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value><value name="TARGET"><shadow type="lmsMoreEvents_menu_targetMenu"></shadow></value><value name="DATA"><shadow type="text"></shadow></value></block><block type="lmsMoreEvents_broadcastDataToTargetAndWait"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value><value name="TARGET"><shadow type="lmsMoreEvents_menu_targetMenu"></shadow></value><value name="DATA"><shadow type="text"></shadow></value></block>',
          },
          "---",
          {
            blockType: Scratch.BlockType.EVENT,
            opcode: "beforeSave",
            text: Scratch.translate("before project saves"),
            shouldRestartExistingThreads: true,
            isEdgeActivated: false,
            extensions: ["colours_event"],
          },
          {
            blockType: Scratch.BlockType.EVENT,
            opcode: "afterSave",
            text: Scratch.translate("after project saves"),
            shouldRestartExistingThreads: true,
            isEdgeActivated: false,
            extensions: ["colours_event"],
          },
        ],
        menus: {
          // Targets have acceptReporters: true
          targetMenu: {
            acceptReporters: true,
            items: "_getTargets",
          },
          keyboardButtons: {
            acceptReporters: true,
            items: validKeyboardInputs,
          },
          // Attributes have acceptReporters: false
          action: {
            acceptReporters: false,
            items: [
              {
                text: Scratch.translate("hit"),
                value: "hit",
              },
              {
                text: Scratch.translate("released"),
                value: "released",
              },
            ],
          },
          boolean: {
            acceptReporters: false,
            items: [
              {
                text: Scratch.translate("true"),
                value: "true",
              },
              {
                text: Scratch.translate("false"),
                value: "false",
              },
            ],
          },
          state: {
            acceptReporters: false,
            items: [
              {
                text: Scratch.translate("enabled"),
                value: "enabled",
              },
              {
                text: Scratch.translate("disabled"),
                value: "disabled",
              },
            ],
          },
        },
      };
    }

    whenTrueFalse(args) {
      return args.STATE === "true" ? args.CONDITION : !args.CONDITION;
    }

    whileTrueFalse(args) {
      return args.STATE === "true" ? args.CONDITION : !args.CONDITION;
    }

    whenValueChanged(args, util) {
      const blockId = util.thread.peekStack();
      if (!lastValues[blockId])
        lastValues[blockId] = Scratch.Cast.toString(args.INPUT);
      if (lastValues[blockId] !== Scratch.Cast.toString(args.INPUT)) {
        lastValues[blockId] = Scratch.Cast.toString(args.INPUT);
        return true;
      }
      return false;
    }

    everyDuration(args, util) {
      const duration = Math.max(
        Math.round(Scratch.Cast.toNumber(args.DURATION)),
        0
      );
      return !!(runTimer % duration === 0);
    }

    whenKeyAction(args, util) {
      const key = Scratch.Cast.toString(args.KEY_OPTION).toLowerCase();
      const pressed = util.ioQuery("keyboard", "getKeyIsDown", [key]);
      return args.ACTION === "released" ? !pressed : pressed;
    }

    whileKeyPressed(args, util) {
      const key = Scratch.Cast.toString(args.KEY_OPTION).toLowerCase();
      return util.ioQuery("keyboard", "getKeyIsDown", [key]);
    }

    broadcastToTarget(args, util) {
      const broadcastOption = Scratch.Cast.toString(args.BROADCAST_OPTION);
      if (!broadcastOption) return;

      const data = Scratch.Cast.toString(args.DATA);
      console.log(data);

      const cloneTargets = this._getTargetFromMenu(args.TARGET).sprite.clones;
      let startedThreads = [];

      for (const clone of cloneTargets) {
        startedThreads = [
          ...startedThreads,
          ...util.startHats(
            "event_whenbroadcastreceived",
            {
              BROADCAST_OPTION: broadcastOption,
            },
            clone
          ),
        ];
        if (data) {
          startedThreads.forEach((thread) => (thread.receivedData = args.DATA));
        }
      }
    }

    broadcastToTargetAndWait(args, util) {
      if (!util.stackFrame.broadcastVar) {
        util.stackFrame.broadcastVar = Scratch.Cast.toString(
          args.BROADCAST_OPTION
        );
      }

      const spriteTarget = this._getTargetFromMenu(args.TARGET);
      if (!spriteTarget) return;
      const cloneTargets = spriteTarget.sprite.clones;

      const data = Scratch.Cast.toString(args.DATA);

      if (util.stackFrame.broadcastVar) {
        const broadcastOption = util.stackFrame.broadcastVar;
        if (!util.stackFrame.startedThreads) {
          util.stackFrame.startedThreads = [];
          for (const clone of cloneTargets) {
            util.stackFrame.startedThreads = [
              ...util.stackFrame.startedThreads,
              ...util.startHats(
                "event_whenbroadcastreceived",
                {
                  BROADCAST_OPTION: broadcastOption,
                },
                clone
              ),
            ];
            if (data) {
              util.stackFrame.startedThreads.forEach(
                (thread) => (thread.receivedData = args.DATA)
              );
            }
          }
          if (util.stackFrame.startedThreads.length === 0) {
            return;
          }
        }

        const waiting = util.stackFrame.startedThreads.some(
          (thread) => runtime.threads.indexOf(thread) !== -1
        );
        if (waiting) {
          if (
            util.stackFrame.startedThreads.every((thread) =>
              runtime.isWaitingThread(thread)
            )
          ) {
            util.yieldTick();
          } else {
            util.yield();
          }
        }
      }
    }

    broadcastData(args, util) {
      const broadcast = Scratch.Cast.toString(args.BROADCAST_OPTION);
      if (!broadcast) return;

      const data = Scratch.Cast.toString(args.DATA);

      let threads = util.startHats("event_whenbroadcastreceived", {
        BROADCAST_OPTION: broadcast,
      });
      threads.forEach((thread) => (thread.receivedData = data));
    }

    broadcastDataAndWait(args, util) {
      const data = Scratch.Cast.toString(args.DATA);

      if (!util.stackFrame.broadcastVar) {
        util.stackFrame.broadcastVar = Scratch.Cast.toString(
          args.BROADCAST_OPTION
        );
      }

      if (util.stackFrame.broadcastVar) {
        const broadcastOption = util.stackFrame.broadcastVar;
        if (!util.stackFrame.startedThreads) {
          util.stackFrame.startedThreads = util.startHats(
            "event_whenbroadcastreceived",
            {
              BROADCAST_OPTION: broadcastOption,
            }
          );
          if (util.stackFrame.startedThreads.length === 0) {
            return;
          } else {
            util.stackFrame.startedThreads.forEach(
              (thread) => (thread.receivedData = data)
            );
          }
        }

        const waiting = util.stackFrame.startedThreads.some(
          (thread) => runtime.threads.indexOf(thread) !== -1
        );
        if (waiting) {
          if (
            util.stackFrame.startedThreads.every((thread) =>
              runtime.isWaitingThread(thread)
            )
          ) {
            util.yieldTick();
          } else {
            util.yield();
          }
        }
      }
    }

    receivedData(args, util) {
      const received = util.thread.receivedData;
      return received ? received : "";
    }

    _getTargetFromMenu(targetName) {
      let target = Scratch.vm.runtime.getSpriteTargetByName(targetName);
      if (targetName === "_stage_") target = runtime.getTargetForStage();
      return target;
    }

    _getTargets() {
      const spriteNames = [{ text: "Stage", value: "_stage_" }];
      const targets = Scratch.vm.runtime.targets;
      for (let index = 1; index < targets.length; index++) {
        const target = targets[index];
        if (target.isOriginal) {
          const targetName = target.getName();
          spriteNames.push({
            text: targetName,
            value: targetName,
          });
        }
      }
      if (spriteNames.length > 0) {
        return spriteNames;
      } else {
        return [{ text: "", value: 0 }]; //this should never happen but it's a failsafe
      }
    }
  }

  Scratch.extensions.register(new MoreEvents());
})(Scratch);
