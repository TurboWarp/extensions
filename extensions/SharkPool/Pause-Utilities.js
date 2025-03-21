// Name: Pause Utilities
// ID: SPPause
// Description: Pause the Project, Scripts, and Sprites!
// By: SharkPool
// License: MIT

// Version V.1.8.01

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed)
    throw new Error("Pause Utilities must run unsandboxed!");

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const Cast = Scratch.Cast;

  const menuIconURI =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTgiIHdpZHRoPSIxOCI+PHBhdGggZD0iTTIzMS40MjkgMTg4LjkyOVYxNzEuMDdoNC4yODV2MTcuODU4em0xMi4xNDIgMFYxNzEuMDdoNC4yODZ2MTcuODU4eiIgdHJhbnNmb3JtPSJtYXRyaXgoMS4wMzMwOSAwIDAgLjk1NDI3IC0yMzguNTczIC0xNjIuNzY5KSIgZmlsbD0iI2ZmYWUwMCIgc3Ryb2tlPSIjZDg5NDAwIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48L3N2Zz4=";
  const blockIconURI =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMS40NzciIGhlaWdodD0iMzEuNDc3IiB2aWV3Qm94PSIwIDAgMzEuNDc3IDMxLjQ3NyI+PGcgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMCAzMS40NzhWLS4wMDFoMzEuNDc4djMxLjQ3OHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNNy4yNjcgMjQuMjM5VjcuMTk2aDQuNDI3djE3LjA0MXptMTIuNTQ0IDBWNy4xOTZoNC40Mjh2MTcuMDQxeiIgZmlsbD0iI2ZmYWUwMCIgc3Ryb2tlPSIjZDg5NDAwIi8+PC9nPjwvc3ZnPg==";

  let storedScripts = Object.create(null);

  // Inject Packager Pause Module (minified)
  // https://github.com/TurboWarp/packager/blob/master/src/addons/pause.js
  // eslint-disable-next-line
  const STATUS_PROMISE_WAIT = 1,
    STATUS_DONE = 4;
  let paused = !1,
    pausedThreadState = new WeakMap(),
    audioContextStateChange = Promise.resolve();
  const setPaused = (e) => {
      if ((paused = e)) {
        for (let t of ((audioContextStateChange = audioContextStateChange.then(
          () => vm.runtime.audioEngine.audioContext.suspend()
        )),
        vm.runtime.ioDevices.clock._paused ||
          vm.runtime.ioDevices.clock.pause(),
        vm.runtime.threads))
          if (!t.updateMonitor && !pausedThreadState.has(t)) {
            let a = { pauseTime: vm.runtime.currentMSecs, status: t.status };
            pausedThreadState.set(t, a), (t.status = 1);
          }
        vm.runtime.emit("PROJECT_RUN_STOP"), vm.runtime.emit("RUNTIME_PAUSED");
      } else {
        (audioContextStateChange = audioContextStateChange.then(() =>
          vm.runtime.audioEngine.audioContext.resume()
        )),
          vm.runtime.ioDevices.clock.resume();
        let i = Date.now();
        for (let s of vm.runtime.threads) {
          let r = pausedThreadState.get(s);
          if (r) {
            let n = s.peekStackFrame();
            if (n && n.executionContext && n.executionContext.timer) {
              let u = i - r.pauseTime;
              n.executionContext.timer.startTime += u;
            }
            if (
              (s.compatibilityStackFrame &&
                s.compatibilityStackFrame.timer &&
                (s.compatibilityStackFrame.timer.startTime += i - r.pauseTime),
              s.timer)
            ) {
              let o = i - r.pauseTime;
              s.timer.startTime += o;
            }
            s.status = r.status;
          }
        }
        (pausedThreadState = new WeakMap()),
          vm.runtime.emit("RUNTIME_UNPAUSED");
      }
    },
    ensurePausedThreadIsStillPaused = (e) => {
      if (4 === e.status) return;
      let t = pausedThreadState.get(e);
      t && 1 !== e.status && ((t.status = e.status), (e.status = 1));
    },
    originalStepThreads = vm.runtime.sequencer.stepThreads;
  vm.runtime.sequencer.stepThreads = function () {
    if (paused)
      for (let e of this.runtime.threads) ensurePausedThreadIsStillPaused(e);
    return originalStepThreads.call(this);
  };
  const originalGreenFlag = vm.runtime.greenFlag;
  vm.runtime.greenFlag = function () {
    return setPaused(!1), originalGreenFlag.call(this);
  };
  const originalStartHats = vm.runtime.startHats;
  vm.runtime.startHats = function (...e) {
    return paused ? [] : originalStartHats.apply(this, e);
  };
  const originalGetMonitorThreadCount = vm.runtime._getMonitorThreadCount;
  (vm.runtime._getMonitorThreadCount = function (e) {
    let t = originalGetMonitorThreadCount.call(this, e);
    if (paused) for (let a of e) pausedThreadState.has(a) && t++;
    return t;
  }),
    (vm.setPaused = setPaused),
    (vm.isPaused = () => paused);

  // check if the pause button exists, we will use that if availiable
  const pauseButton = document.querySelector(
    typeof scaffolding !== "undefined"
      ? `[class*="pause-button"]`
      : "img.pause-btn.addons-display-none-pause"
  );

  runtime.on("PROJECT_STOP_ALL", () => {
    storedScripts = Object.create(null);
  });
  runtime.on("RUNTIME_PAUSED", () => {
    runtime.once("BEFORE_EXECUTE", () => {
      runtime.allScriptsByOpcodeDo(
        "SPPause_whenProjectPaused",
        (script, target) => runtime._pushThread(script.blockId, target)
      );
    });
  });
  runtime.on("RUNTIME_UNPAUSED", () => {
    runtime.startHats("SPPause_whenProjectUnPaused");
  });

  class SPPause {
    getInfo() {
      return {
        id: "SPPause",
        name: Scratch.translate("Pause Utilities"),
        color1: "#5f5b49",
        menuIconURI,
        blockIconURI,
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Project Control"),
          },
          {
            opcode: "pause",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("pause project"),
          },
          {
            opcode: "unpause",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("unpause project"),
          },
          {
            opcode: "whenProjectPaused",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when project is paused"),
            isEdgeActivated: false,
          },
          {
            opcode: "whenProjectUnPaused",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when project is unpaused"),
            restartExistingThreads: true,
            isEdgeActivated: false,
          },
          {
            opcode: "isProjectPaused",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is project paused?"),
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Sprite Control"),
          },
          {
            opcode: "pauseSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("pause [SPRITE]"),
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          {
            opcode: "unpauseSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("unpause [SPRITE]"),
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          "---",
          {
            opcode: "pauseClones",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "pause clones of [SPRITE] with [VAR] set to [NUM]"
            ),
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" },
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("my variable"),
              },
              NUM: { type: Scratch.ArgumentType.STRING, defaultValue: "0" },
            },
          },
          {
            opcode: "unpauseClones",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "unpause clones of [SPRITE] with [VAR] set to [NUM]"
            ),
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" },
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("my variable"),
              },
              NUM: { type: Scratch.ArgumentType.STRING, defaultValue: "0" },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Script Control"),
          },
          {
            opcode: "pauseLoop",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("pause this script with ID [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("my script"),
              },
            },
          },
          {
            opcode: "breakLoop",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("unpause script with ID [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("my script"),
              },
            },
          },
          {
            opcode: "breakAll",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("unpause all scripts"),
          },
          "---",
          {
            opcode: "isPaused",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is script with ID [NAME] paused?"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("my script"),
              },
            },
          },
          {
            opcode: "allPausedScripts",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("all paused scripts"),
            disableMonitor: true,
          },
        ],
        menus: {
          TARGETS: { acceptReporters: true, items: this._getTargets(true) },
          TARGETS2: { acceptReporters: true, items: this._getTargets(false) },
        },
      };
    }

    // Helper Funcs
    _getTargets(includeStage) {
      const spriteNames = [
        { text: Scratch.translate("myself"), value: "_myself_" },
      ];
      if (includeStage)
        spriteNames.push({
          text: Scratch.translate("Stage"),
          value: "_stage_",
        });
      const targets = runtime.targets;
      for (let i = 0; i < targets.length; i++) {
        const target = targets[i];
        if (target.isOriginal && !target.isStage) spriteNames.push(target.getName());
      }
      return spriteNames.length > 0 ? spriteNames : [""];
    }

    searchThreads(target, cntrl) {
      const thread = runtime.threads;
      thread.forEach((t) => {
        if (t.target.id === target && t.status !== cntrl) t.status = cntrl;
      });
    }

    modifyClones(args, util, cntrl) {
      const target =
        args.SPRITE === "_myself_"
          ? util.target
          : runtime.getSpriteTargetByName(args.SPRITE);
      if (target) {
        const clones = target.sprite.clones;
        const varName = Cast.toString(args.VAR);
        const varValue = args.NUM;
        for (let i = 1; i < clones.length; i++) {
          const variable = clones[i].lookupVariableByNameAndType(varName, "");
          if (variable && variable.value === varValue)
            this.searchThreads(clones[i].id, cntrl);
        }
      }
    }

    // Block Funcs
    pause() {
      if (pauseButton) pauseButton.click();
      else setPaused(true);
    }

    unpause() {
      // Ignore "generator is running" error. It lies
      try {
        if (pauseButton) pauseButton.click();
        else setPaused(false);
      } catch {}
    }

    isProjectPaused() {
      return runtime.ioDevices.clock._paused;
    }

    pauseSprite(args, util) {
      const target =
        args.SPRITE === "_stage_"
          ? runtime.getTargetForStage()
          : args.SPRITE === "_myself_"
            ? util.target
            : runtime.getSpriteTargetByName(args.SPRITE);
      if (target) this.searchThreads(target.id, 1);
    }
    unpauseSprite(args, util) {
      const target =
        args.SPRITE === "_stage_"
          ? runtime.getTargetForStage()
          : args.SPRITE === "_myself_"
            ? util.target
            : runtime.getSpriteTargetByName(args.SPRITE);
      if (target) this.searchThreads(target.id, 0);
    }

    pauseClones(args, util) {
      this.modifyClones(args, util, 1);
    }
    unpauseClones(args, util) {
      this.modifyClones(args, util, 0);
    }

    pauseLoop(args, util) {
      const scriptName = Cast.toString(args.NAME);
      const state = util.stackFrame.pausedScript;
      if (!state) {
        storedScripts[scriptName] = true;
        util.stackFrame.pausedScript = scriptName;
        util.yield();
      } else if (state in storedScripts) {
        util.yield();
      }
    }

    breakLoop(args) {
      const scriptName = Cast.toString(args.NAME);
      if (scriptName in storedScripts) delete storedScripts[scriptName];
    }

    breakAll() {
      const allScripts = Object.keys(storedScripts);
      for (let i = 0; i < allScripts.length; i++)
        this.breakLoop({ NAME: allScripts[i] });
    }

    isPaused(args) {
      return Cast.toString(args.NAME) in storedScripts;
    }

    allPausedScripts() {
      return JSON.stringify(Object.keys(storedScripts));
    }
  }

  Scratch.extensions.register(new SPPause());
})(Scratch);
