// Name: More Timers
// ID: lmsTimers
// Description: Control several timers at once.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>

(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;

  /**
   * @typedef Timer
   * @property {number} startTime
   * @property {number} pauseTime
   * @property {boolean} paused
   */

  /** @type {Record<string, Timer>} */
  let timers = Object.create(null);

  /**
   * @param {Timer} timer
   * @return {number}
   */
  const timerValue = (timer) => {
    return (
      ((timer.paused ? 0 : Date.now() - timer.startTime) + timer.pauseTime) /
      1000
    );
  };

  class Timers {
    constructor() {
      vm.runtime.on("PROJECT_START", () => {
        timers = Object.create(null);
      });
    }

    getInfo() {
      return {
        id: "lmsTimers",
        name: "More Timers",
        color1: "#5cb1d6",
        color2: "#428faf",
        color3: "#3281a3",
        blocks: [
          {
            opcode: "whenTimerOp",
            blockType: Scratch.BlockType.HAT,
            extensions: ["colours_sensing"],
            text: "when timer [TIMER] [OP] [NUM]",
            arguments: {
              TIMER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "timer",
              },
              OP: {
                type: Scratch.ArgumentType.STRING,
                menu: "operation",
              },
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "5",
              },
            },
          },

          "---",

          {
            opcode: "startResetTimer",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_sensing"],
            text: "start/reset timer [TIMER]",
            arguments: {
              TIMER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "timer",
              },
            },
          },
          {
            opcode: "valueOfTimer",
            blockType: Scratch.BlockType.REPORTER,
            extensions: ["colours_sensing"],
            text: "timer [TIMER]",
            arguments: {
              TIMER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "timer",
              },
            },
          },

          "---",

          {
            opcode: "pauseTimer",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_sensing"],
            text: "pause timer [TIMER]",
            arguments: {
              TIMER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "timer",
              },
            },
          },
          {
            opcode: "resumeTimer",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_sensing"],
            text: "resume timer [TIMER]",
            arguments: {
              TIMER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "timer",
              },
            },
          },

          "---",

          {
            opcode: "setTimer",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_sensing"],
            text: "set timer [TIMER] to [NUM]",
            arguments: {
              TIMER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "timer",
              },
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "10",
              },
            },
          },
          {
            opcode: "changeTimer",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_sensing"],
            text: "change timer [TIMER] by [NUM]",
            arguments: {
              TIMER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "timer",
              },
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "10",
              },
            },
          },

          "---",

          {
            opcode: "removeTimer",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_sensing"],
            text: "remove timer [TIMER]",
            arguments: {
              TIMER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "timer",
              },
            },
          },
          {
            opcode: "removeTimers",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_sensing"],
            text: "remove all timers",
          },
          {
            opcode: "timerExists",
            blockType: Scratch.BlockType.BOOLEAN,
            extensions: ["colours_sensing"],
            text: "timer [TIMER] exists?",
            arguments: {
              TIMER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "timer",
              },
            },
          },
          {
            opcode: "listExistingTimers",
            blockType: Scratch.BlockType.REPORTER,
            extensions: ["colours_sensing"],
            text: "list existing timers",
            disableMonitor: false,
          },
        ],
        menus: {
          operation: {
            // false for Scratch parity
            acceptReporters: false,
            items: [">", "<"],
          },
        },
      };
    }

    whenTimerOp(args) {
      if (!timers[args.TIMER]) return false;
      const value = timerValue(timers[args.TIMER]);
      if (args.OP === ">") return value > args.NUM;
      if (args.OP === "<") return value < args.NUM;
      return false;
    }

    startResetTimer(args) {
      timers[args.TIMER] = {
        startTime: Date.now(),
        pauseTime: 0,
        paused: false,
      };
    }

    pauseTimer(args) {
      const timer = timers[args.TIMER];
      if (!timer) return;
      timer.pauseTime = timerValue(timer) * 1000;
      timer.paused = true;
    }

    resumeTimer(args) {
      const timer = timers[args.TIMER];
      if (!timer) return;
      if (timer.paused === false) return;
      timer.paused = false;
      timer.startTime = Date.now();
    }

    valueOfTimer(args) {
      if (!timers[args.TIMER]) return "";
      return timerValue(timers[args.TIMER]);
    }

    setTimer(args) {
      timers[args.TIMER] = {
        paused: false,
        startTime: Date.now(),
        pauseTime: Scratch.Cast.toNumber(args.NUM) * 1000,
      };
    }

    changeTimer(args) {
      if (!timers[args.TIMER]) this.startResetTimer(args);
      timers[args.TIMER].pauseTime += Scratch.Cast.toNumber(args.NUM) * 1000;
    }

    removeTimers(args) {
      timers = Object.create(null);
    }

    removeTimer(args) {
      Reflect.deleteProperty(timers, args.TIMER);
    }

    timerExists(args) {
      return !!timers[args.TIMER];
    }

    listExistingTimers(args) {
      return Object.keys(timers).join(",");
    }
  }

  // "Extension" option reimplementation by Xeltalliv
  // https://github.com/Xeltalliv/extensions/blob/examples/examples/extension-colors.js

  // const cbfsb = Scratch.vm.runtime._convertBlockForScratchBlocks.bind(Scratch.vm.runtime);
  // Scratch.vm.runtime._convertBlockForScratchBlocks = function(blockInfo, categoryInfo) {
  //   const res = cbfsb(blockInfo, categoryInfo);
  //   if (blockInfo.extensions) {
  //     if (!res.json.extensions) res.json.extensions = [];
  //     res.json.extensions.push(...blockInfo.extensions);
  //   }
  //   return res;
  // };

  Scratch.extensions.register(new Timers());
})(Scratch);
