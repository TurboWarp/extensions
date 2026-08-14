// Name: Pause
// ID: SPpauseV2
// Description: Pause the project, sprites, and scripts.
// By: SharkPool
// License: MIT

// Version V.1.0.0

/**
 * Rewrite of Pause Utilities
 * https://github.com/SharkPool-SP/SharkPools-Extensions/blob/main/extension-code/Pause-Utilities.js
 */

(async function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Pause must run unsandboxed!");

  const iconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNi41IiBoZWlnaHQ9IjM2LjUiIHZpZXdCb3g9IjAgMCAzNi41IDM2LjUiPjxnIHN0cm9rZT0iI2Q4OTQwMCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMCAzNi41VjBoMzYuNXYzNi41eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTYuMzc3IDIyLjIyVjUuMTc3aDQuNDI3djE3LjA0MXptMTIuNTQ0LTExLjEyNlY1LjE3N2g0LjQyN3Y4LjU0MXptMTEuMjAyIDEyLjAwMS0xMy43OTkgOC4yMjhWMTQuODY3eiIgZmlsbD0iI2ZmYWUwMCIvPjwvZz48L3N2Zz4=";

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const Cast = Scratch.Cast;
  const isPM = Scratch.extensions.isPenguinMod;

  const ThreadPauseData = Symbol("SPpauseV2_ThreadPauseData");
  const STATUS_PROMISE_WAIT = 1;
  const STATUS_DONE = 4
  const STATUS_PAUSED = 5;

  /** @type {Set<String>} */
  const pausedScripts = new Set();
  /** @type {Map<Thread.id, Object>} */
  const pausedSpriteData = new Map();

  /**
   * Add the Pause Addon code used by the Turbowarp Packager. This is the packager version,
   * so its license-compatibile. Must be initialized with a VM.
   * 
   * Source: https://github.com/TurboWarp/packager/blob/master/src/addons/pause.js
   * License: Mozilla Public License Version 2.0
   */
  const pauseInitializer = await Scratch.external.importModule("https://raw.githubusercontent.com/TurboWarp/packager/719e7521439dcc32672de0dfd5454e72db1b0f69/src/addons/pause.js");

  // This function expects 'scaffolding', but only accesses vm.
  // We can use the Scratch object since it contains the vm.
  pauseInitializer.default({ scaffolding: Scratch });

  // Check if the pause button exists, we will use that if availiable.
  const guiPauseButton = document.querySelector(
    typeof scaffolding !== "undefined"
      ? `[class*="pause-button"]`
      : "img.pause-btn.addons-display-none-pause"
  );

  /**
   * Toggles pausing the project.
   * @param {Boolean} paused True to pause
   */
  const setProjectPause = (paused) => {
    if (guiPauseButton) {
      const isPaused = runtime.ioDevices.clock._paused;
      if (paused !== isPaused) guiPauseButton.click();
    } else {
      if (isPM) {
        if (paused) runtime.pause();
        else runtime.play();
      } else {
        vm.setPaused(paused);
      }
    }
  };

  /**
   * Toggles pausing a sprite.
   * @param {Boolean} paused True to pause
   * @param {VM.Target} target
   */
  const setSpritePause = (paused, target) => {
    for (const thread of runtime.threads) {
      if (thread.target.id === target.id) {
        setThreadPause(paused, thread);
      }
    }
  };


  /**
   * Toggles pausing the project.
   * @param {Boolean} paused True to pause
   * @param {VM.Target} target
   * @param {Object} filter (Optional) Filters clones based on a sprite-specific variable
   */
  const setClonePause = (paused, target, filter) => {
    const varName = Cast.toString(filter.VAR);
    const varValue = filter.VALUE;

    let clones = target.sprite.clones.slice(1); // Dont include parent
    if (varName) {
      clones = clones.filter((c) => {
        const variable = c.lookupVariableByNameAndType(varName, "");
        return variable && variable.value === varValue;
      });
    }

    for (const clone of clones) {
      setSpritePause(paused, clone);
    }
  }

  /**
   * Toggles pausing a thread.
   * @param {Boolean} paused True to pause
   * @param {VM.Thread} thread
   */
  const setThreadPause = (paused, thread) => {
    if (isPM) {
      if (paused && thread.status !== STATUS_PAUSED) thread.pause();
      if (!paused && thread.status === STATUS_PAUSED) thread.play();
      return;
    }

    if (paused) {
      if (thread.status === STATUS_PAUSED) return;

      thread[ThreadPauseData] = {
        paused: true,
        pauseTime: Date.now(),
        oldStatus: thread.status,
      }

      thread.status = STATUS_PAUSED;
      if (thread.timer) thread.timer.pause();
    } else {
      if (thread.status !== STATUS_PAUSED) return;

      const data = thread[ThreadPauseData];
      if (!data) return;

      const timeDiff = Date.now() - data.pauseTime;
      const stackframe = thread.peekStackFrame();
      const compatStackframe = thread.compatibilityStackFrame;
      if (stackframe && stackframe.executionContext && stackframe.executionContext.timer) {
        stackframe.executionContext.timer.startTime += timeDiff;
      }
      if (compatStackframe && compatStackframe.timer) {
        compatStackframe.timer.startTime += timeDiff;
      }

      thread.status = data.oldStatus;
      data.paused = false;
      if (thread.timer) thread.timer.play();
    }
  };

  if (!isPM) {
    // Promise blocks (STATUS 1) will continue running despite the state change.
    // Handle STATUS_PAUSED in the sequencer.
    const ogStepThreads = runtime.sequencer.stepThreads;
    runtime.sequencer.stepThreads = function (...args) {
      for (const thread of runtime.threads) {
        if (thread.status === STATUS_DONE) continue;

        if (thread[ThreadPauseData]) {
          const data = thread[ThreadPauseData];
          if (thread.status !== STATUS_PROMISE_WAIT) {
            if (thread.status !== STATUS_PAUSED) {
              data.oldStatus = thread.status;
            }

            if (data.paused) thread.status = STATUS_PAUSED;
          }
        }
      }

      return ogStepThreads.call(this, ...args);
    };
  }

  class SPpauseV2 {
    constructor() {
      runtime.on("PROJECT_STOP_ALL", () => {
        pausedScripts.clear();
        pausedSpriteData.clear();
      });

      runtime.on("RUNTIME_PAUSED", () => {
        runtime.once("BEFORE_EXECUTE", () => {
          runtime.allScriptsByOpcodeDo(
            "SPpauseV2_whenProjectPaused",
            (script, target) => {
              runtime._pushThread(script.blockId, target);
            },
          );
        });
      });
      runtime.on("RUNTIME_UNPAUSED", () => {
        runtime.startHats("SPpauseV2_whenProjectUnpaused");
      });
    }
    getInfo() {
      return {
        id: "SPpauseV2",
        name: Scratch.translate("Pause"),
        color1: "#5f5b49",
        menuIconURI: iconURI,
        blockIconURI: iconURI,
        blocks: [
          {
            opcode: "pauseProject",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("pause project")
          },
          {
            opcode: "unpauseProject",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("unpause project")
          },
          {
            opcode: "whenProjectPaused",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when project paused"),
            isEdgeActivated: false
          },
          {
            opcode: "whenProjectUnpaused",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when project unpaused"),
            restartExistingThreads: true,
            isEdgeActivated: false
          },
          {
            opcode: "isProjectPaused",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is project paused?")
          },
          "---",
          {
            opcode: "pauseOtherScripts",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("pause other scripts in sprite")
          },
          {
            opcode: "pauseSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("pause [SPRITE]"),
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "unpauseSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("unpause [SPRITE]"),
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          "---",
          {
            opcode: "pauseClones",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("pause clones of [SPRITE] with [VAR] set to [VALUE]"),
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "CLONEABLE_TARGETS" },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: Scratch.translate("my variable") },
              VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: "0" }
            }
          },
          {
            opcode: "unpauseClones",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("unpause clones of [SPRITE] with [VAR] set to [VALUE]"),
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "CLONEABLE_TARGETS" },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: Scratch.translate("my variable") },
              VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: "0" }
            }
          },
          "---",
          {
            opcode: "pauseScript",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("pause this script using ID [ID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: Scratch.translate("my script") }
            }
          },
          {
            opcode: "unpauseScript",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("unpause script with ID [ID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: Scratch.translate("my script") }
            }
          },
          {
            opcode: "unpauseAllScripts",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("unpause all scripts")
          },
          "---",
          {
            opcode: "isScriptPaused",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("script with ID [ID] paused?"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: Scratch.translate("my script") }
            }
          },
          {
            opcode: "allPausedScripts",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("all paused scripts"),
            disableMonitor: true
          },
        ],
        menus: {
          TARGETS: { acceptReporters: true, items: "_getTargets"},
          CLONEABLE_TARGETS: { acceptReporters: true, items: "_getCloneables" }
        }
      };
    }

    // Helper Funcs
    _getTargets() {
      const list = [
        { text: Scratch.translate("myself"), value: "_myself_" },
        { text: Scratch.translate("Stage"), value: "_stage_" }
      ];

      for (const target of runtime.targets) {
        if (target.isOriginal && !target.isStage) list.push(target.getName());
      }

      return list.length > 0 ? list : [""];
    }

    _getCloneables() {
      const list = this._getTargets();
      list.splice(1, 1); // _stage_ is index 1, stage cannot have clones

      return list;
    }

    _getTarget(query, util) {
      if (query=== "_myself_") return util.target;
      if (query === "_stage_") return runtime.getTargetForStage();
      return runtime.getSpriteTargetByName(query);
    }

    _doAfterTick(util, callback) {
      if (!util.stackFrame._initialized) {
        util.stackFrame._initialized = true;
        queueMicrotask(callback);
        util.yieldTick();
      }
    }

    // Block Funcs
    pauseProject(_, util) {
      this._doAfterTick(util, () => setProjectPause(true));
    }

    unpauseProject() {
      setProjectPause(false);
    }

    isProjectPaused() {
      return runtime.ioDevices.clock._paused;
    }

    pauseOtherScripts(_, util) {
      const myThreadId = util.thread.getId();

      for (const thread of runtime.threads) {
        if (myThreadId === thread.getId()) continue;

        setThreadPause(true, thread);
      };
    }

    pauseSprite(args, util) {
      this._doAfterTick(util, () => {
        const target = this._getTarget(args.SPRITE, util);
        if (target) setSpritePause(true, target);
      });
    }

    unpauseSprite(args, util) {
      const target = this._getTarget(args.SPRITE, util);
      if (target) setSpritePause(false, target);
    }

    pauseClones(args, util) {
      const target = this._getTarget(args.SPRITE, util);
      if (target) setClonePause(true, target, args);
    }

    unpauseClones(args, util) {
      const target = this._getTarget(args.SPRITE, util);
      if (target) setClonePause(false, target, args);
    }

    pauseScript(args, util) {
      const id = Cast.toString(args.ID);
      const initialized = util.stackFrame._initialized;

      if (!initialized) {
        pausedScripts.add(id);
        util.stackFrame._initialized = true;
      }

      if (pausedScripts.has(id)) {
        util.yield();
      }
    }

    unpauseScript(args) {
      const id = Cast.toString(args.ID);
      pausedScripts.delete(id);
    }

    unpauseAllScripts() {
      pausedScripts.clear();
    }

    isScriptPaused(args) {
      return pausedScripts.has(Cast.toString(args.ID));
    }

    allPausedScripts() {
      return JSON.stringify(Array.from(pausedScripts));
    }
  }

  Scratch.extensions.register(new SPpauseV2());
})(Scratch);
