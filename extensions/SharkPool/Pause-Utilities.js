// Name: Pause Utilities
// ID: SPPause
// Description: Pause the Project and certain Scripts
// By: SharkPool

// Version V.1.7.2

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed)
    alert("Pause Utilities must run unsandboxed!");

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const Cast = Scratch.Cast;
  const isPM = Scratch.extensions.isPenguinMod;

  const menuIconURI =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTgiIHdpZHRoPSIxOCI+PHBhdGggZD0iTTIzMS40MjkgMTg4LjkyOVYxNzEuMDdoNC4yODV2MTcuODU4em0xMi4xNDIgMFYxNzEuMDdoNC4yODZ2MTcuODU4eiIgdHJhbnNmb3JtPSJtYXRyaXgoMS4wMzMwOSAwIDAgLjk1NDI3IC0yMzguNTczIC0xNjIuNzY5KSIgZmlsbD0iI2ZmYWUwMCIgc3Ryb2tlPSIjZDg5NDAwIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48L3N2Zz4=";
  const blockIconURI =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMS40NzciIGhlaWdodD0iMzEuNDc3IiB2aWV3Qm94PSIwIDAgMzEuNDc3IDMxLjQ3NyI+PGcgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMCAzMS40NzhWLS4wMDFoMzEuNDc4djMxLjQ3OHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNNy4yNjcgMjQuMjM5VjcuMTk2aDQuNDI3djE3LjA0MXptMTIuNTQ0IDBWNy4xOTZoNC40Mjh2MTcuMDQxeiIgZmlsbD0iI2ZmYWUwMCIgc3Ryb2tlPSIjZDg5NDAwIi8+PC9nPjwvc3ZnPg==";

  let storedScripts = {};
  let pausedThreadState = new WeakMap();
  let pauseNewThreads = false,
    steppingThread = null;
  let audioContextStateChange = Promise.resolve();

  // Inject Pause Module (minified)
  // https://github.com/TurboWarp/scratch-gui/blob/develop/src/addons/addons/debugger/module.js
  // eslint-disable-next-line
  const isPaused = () => false,
    pauseThread = (e) => {
      if (e.updateMonitor || pausedThreadState.has(e)) return;
      let t = { time: runtime.currentMSecs, status: e.status };
      pausedThreadState.set(e, t), (e.status = 1);
    },
    ensurePausedThreadIsStillPaused = (e) => {
      if (4 === e.status) return;
      let t = pausedThreadState.get(e);
      t && 1 !== e.status && ((t.status = e.status), (e.status = 1));
    },
    setSteppingThread = (e) => {
      steppingThread = e;
    },
    compensateForTimePassedWhilePaused = (e, t) => {
      e.timer && (e.timer.startTime += runtime.currentMSecs - t.time),
        e.compatibilityStackFrame &&
          e.compatibilityStackFrame.timer &&
          (e.compatibilityStackFrame.timer.startTime +=
            runtime.currentMSecs - t.time);
      let r = e.peekStackFrame();
      r &&
        r.executionContext &&
        r.executionContext.timer &&
        (r.executionContext.timer.startTime += runtime.currentMSecs - t.time);
    },
    stepUnsteppedThreads = (e) => {
      let t = runtime.threads,
        r = getThreadIndex(e);
      if (-1 !== r)
        for (let a = r; a < t.length; a++) {
          let s = t[a],
            i = s.status;
          (0 === i || 2 === i || 3 === i) &&
            ((runtime.sequencer.activeThread = s),
            runtime.sequencer.stepThread(s));
        }
    },
    setPaused = (e) => {
      let t = paused !== e;
      if ((t && (paused = e), paused)) {
        (audioContextStateChange = audioContextStateChange.then(() =>
          runtime.audioEngine.audioContext.suspend()
        )),
          runtime.ioDevices.clock._paused || runtime.ioDevices.clock.pause(),
          runtime.threads.forEach(pauseThread);
        let r = runtime.sequencer.activeThread;
        r && setSteppingThread(r);
      }
      if (!paused && t) {
        for (let a of ((audioContextStateChange = audioContextStateChange.then(
          () => runtime.audioEngine.audioContext.resume()
        )),
        runtime.ioDevices.clock.resume(),
        runtime.threads)) {
          let s = pausedThreadState.get(a);
          s &&
            (compensateForTimePassedWhilePaused(a, s), (a.status = s.status));
        }
        pausedThreadState = new WeakMap();
        let i = steppingThread;
        stepUnsteppedThreads(i), (steppingThread = null);
      }
    },
    getRunningThread = () => steppingThread,
    singleStepThread = (e) => {
      if (4 === e.status || e.isCompiled) return !1;
      let t = e.peekStack();
      if (!t && (e.popStack(), 0 === e.stack.length)) return (e.status = 4), !1;
      (pauseNewThreads = !0), (runtime.sequencer.activeThread = e);
      let r = [
        "special error used by Scratch Addons for implementing single-stepping",
      ];
      Object.defineProperty(e, "blockGlowInFrame", {
        set(e) {
          throw r;
        },
      });
      try {
        (e.status = 0), e.warpTimer && e.warpTimer.start();
        try {
          runtime.sequencer.stepThread(e);
        } catch (a) {
          if (a !== r) throw a;
        }
        if (0 !== e.status) return !1;
        for (e.peekStack() === t && e.goToNextBlock(); !e.peekStack(); ) {
          if ((e.popStack(), 0 === e.stack.length)) return (e.status = 4), !1;
          let s = e.peekStackFrame();
          if (s.isLoop) {
            if (e.peekStackFrame().warpMode) continue;
            return !1;
          }
          if (s.waitingReporter) return !1;
          e.goToNextBlock();
        }
        return !0;
      } finally {
        (pauseNewThreads = !1),
          (runtime.sequencer.activeThread = null),
          Object.defineProperty(e, "blockGlowInFrame", {
            value: t,
            configurable: !0,
            enumerable: !0,
            writable: !0,
          }),
          4 !== e.status && (e.status = 1);
      }
    },
    getRealStatus = (e) => {
      let t = pausedThreadState.get(e);
      return t ? t.status : e.status;
    },
    getThreadIndex = (e) =>
      e
        ? runtime.threads.findIndex(
            (t) =>
              t.target === e.target &&
              t.topBlock === e.topBlock &&
              t.stackClick === e.stackClick &&
              t.updateMonitor === e.updateMonitor
          )
        : -1,
    findNewSteppingThread = (e) => {
      let t = runtime.threads;
      for (let r = e; r < t.length; r++) {
        let a = t[r];
        if (a.updateMonitor || a.isCompiled) continue;
        let s = getRealStatus(a);
        if (0 === s || 2 === s || 3 === s) return pauseThread(a), a;
      }
      return null;
    },
    singleStep = () => {
      if (steppingThread) {
        let e = pausedThreadState.get(steppingThread);
        compensateForTimePassedWhilePaused(steppingThread, e),
          (e.time = runtime.currentMSecs);
        let t = singleStepThread(steppingThread);
        t ||
          (steppingThread = findNewSteppingThread(
            getThreadIndex(steppingThread) + 1
          ));
      }
      if (!steppingThread) {
        setSteppingThread(findNewSteppingThread(0)),
          (runtime.ioDevices.clock._pausedTime += runtime.currentStepTime);
        let r = runtime.audioEngine.audioContext;
        for (let a of runtime.targets)
          for (let s of Object.keys(a.sprite.soundBank.soundPlayers)) {
            let i = a.sprite.soundBank.soundPlayers[s];
            i.outputNode &&
              (i.outputNode.stop(r.currentTime),
              i._createSource(),
              i.outputNode.start(
                r.currentTime,
                r.currentTime - i.startingUntil + runtime.currentStepTime / 1e3
              ),
              (i.startingUntil -= runtime.currentStepTime / 1e3));
          }
        for (let n of runtime.threads)
          pausedThreadState.has(n) &&
            (pausedThreadState.get(n).time += runtime.currentStepTime);
        pauseNewThreads = !0;
        let u = runtime._hats;
        for (let o in u) {
          if (!Object.prototype.hasOwnProperty.call(u, o)) continue;
          let l = u[o];
          l.edgeActivated && runtime.startHats(o);
        }
        pauseNewThreads = !1;
      }
    },
    setup = () => {
      let e = vm,
        t = e.runtime.sequencer.stepThreads;
      e.runtime.sequencer.stepThreads = function () {
        if (isPaused())
          for (let e of this.runtime.threads)
            ensurePausedThreadIsStillPaused(e);
        return t.call(this);
      };
      let r = e.runtime.greenFlag;
      e.runtime.greenFlag = function () {
        return setPaused(!1), r.call(this);
      };
      let a = e.runtime.startHats;
      e.runtime.startHats = function (...e) {
        let t = e[0],
          r =
            "event_whenbroadcastreceived" === t ||
            "control_start_as_clone" === t;
        if (pauseNewThreads) {
          if (!r && !this.getIsEdgeActivatedHat(t)) return [];
          let s = a.apply(this, e);
          for (let i of s) pauseThread(i);
          return s;
        }
        return paused && !r ? [] : a.apply(this, e);
      };
      let s = e.runtime._getMonitorThreadCount;
      e.runtime._getMonitorThreadCount = function (e) {
        let t = s.call(this, e);
        if (paused) for (let r of e) pausedThreadState.has(r) && t++;
        return t;
      };
    };

  const pauseHandler = () => {
    runtime.allScriptsByOpcodeDo(
      "SPPause_whenProjectPaused",
      (script, target) => {
        const topBlockId = script.blockId;
        const threadExists = runtime.threads.find(
          (thread) => thread.topBlock === topBlockId
        );
        if (!threadExists) runtime._pushThread(topBlockId, target);
      }
    );
  };

  runtime.on("PROJECT_STOP_ALL", () => {
    storedScripts = {};
  });
  runtime.on("RUNTIME_PAUSED", () => {
    runtime.on("BEFORE_EXECUTE", pauseHandler);
  });
  runtime.on("RUNTIME_UNPAUSED", () => {
    runtime.removeListener("BEFORE_EXECUTE", pauseHandler);
    runtime.startHats("SPPause_whenProjectUnPaused");
    // Fix Paused Threads (Rare and Shouldnt Happen, but Failsafe)
    for (let i = 0; i < runtime.threads.length; i++) {
      const thread = runtime.threads[i];
      if (thread.status === undefined) thread.status = 4;
      if (thread.status === 5) thread.status = 0;
    }
  });

  class SPPause {
    getInfo() {
      return {
        id: "SPPause",
        name: "Pause Utilities",
        color1: "#5f5b49",
        menuIconURI,
        blockIconURI,
        blocks: [
          { blockType: Scratch.BlockType.LABEL, text: "Project Control" },
          {
            opcode: "pause",
            blockType: Scratch.BlockType.COMMAND,
            text: "pause project",
          },
          {
            opcode: "unpause",
            blockType: Scratch.BlockType.COMMAND,
            text: "unpause project",
          },
          {
            opcode: "whenProjectPaused",
            blockType: Scratch.BlockType.EVENT,
            text: "while project is paused",
            isEdgeActivated: false,
          },
          {
            opcode: "whenProjectUnPaused",
            blockType: Scratch.BlockType.EVENT,
            text: "when project is unpaused",
            isEdgeActivated: false,
          },
          {
            opcode: "isProjectPaused",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is project paused?",
          },
          { blockType: Scratch.BlockType.LABEL, text: "Sprite Control" },
          {
            opcode: "pauseSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: "pause [SPRITE]",
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          {
            opcode: "unpauseSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: "unpause [SPRITE]",
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          "---",
          {
            opcode: "pauseClones",
            blockType: Scratch.BlockType.COMMAND,
            text: "pause clones of [SPRITE] with [VAR] set to [NUM]",
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" },
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
              NUM: { type: Scratch.ArgumentType.STRING, defaultValue: 0 },
            },
          },
          {
            opcode: "unpauseClones",
            blockType: Scratch.BlockType.COMMAND,
            text: "unpause clones of [SPRITE] with [VAR] set to [NUM]",
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" },
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my variable",
              },
              NUM: { type: Scratch.ArgumentType.STRING, defaultValue: 0 },
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Script Control" },
          {
            opcode: "pauseLoop",
            blockType: Scratch.BlockType.COMMAND,
            text: "pause this script with ID [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my script",
              },
            },
          },
          {
            opcode: "breakLoop",
            blockType: Scratch.BlockType.COMMAND,
            text: "unpause script with ID [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my script",
              },
            },
          },
          {
            opcode: "breakAll",
            blockType: Scratch.BlockType.COMMAND,
            text: "unpause all scripts",
          },
          "---",
          {
            opcode: "isPaused",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is script with ID [NAME] paused?",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my script",
              },
            },
          },
          {
            opcode: "allPausedScripts",
            blockType: Scratch.BlockType.REPORTER,
            text: "all paused scripts",
            disableMonitor: true,
          },
        ],
        menus: {
          TARGETS: { acceptReporters: true, items: this._getTargets(false) },
          TARGETS2: { acceptReporters: true, items: this._getTargets(true) },
        },
      };
    }

    _getTargets(includeStage) {
      const spriteNames = [{ text: "myself", value: "_myself_" }];
      if (includeStage) spriteNames.push({ text: "Stage", value: "Stage" });
      const targets = runtime.targets;
      for (let i = 1; i < targets.length; i++) {
        const target = targets[i];
        if (target.isOriginal) spriteNames.push(target.getName());
      }
      return spriteNames.length > 0 ? spriteNames : [""];
    }

    searchThreads(target, cntrl) {
      const thread = runtime.threads;
      thread.forEach((t) => {
        if (t.target.id === target && t.status !== cntrl) t.status = cntrl;
      });
    }

    pause() {
      if (isPM) runtime.pause();
      else {
        const btn = document.querySelector(
          typeof scaffolding !== "undefined"
            ? `[class*="pause-button"]`
            : "img.pause-btn.addons-display-none-pause"
        );
        if (btn) btn.click();
        else setPaused(true);
      }
    }

    unpause() {
      if (isPM) runtime.play();
      else {
        const btn = document.querySelector(
          typeof scaffolding !== "undefined"
            ? `[class*="pause-button"]`
            : "img.pause-btn.addons-display-none-pause"
        );
        // Ignore "generator is running" error. It lies
        try {
          if (btn) btn.click();
          else setPaused(false);
        } catch {}
      }
    }

    isProjectPaused() {
      return runtime.ioDevices.clock._paused;
    }

    pauseSprite(args, util) {
      const target =
        args.SPRITE === "Stage"
          ? runtime.getTargetForStage()
          : args.SPRITE === "_myself_"
            ? util.target
            : runtime.getSpriteTargetByName(args.SPRITE);
      if (target) this.searchThreads(target.id, 1);
    }
    unpauseSprite(args, util) {
      const target =
        args.SPRITE === "Stage"
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
    modifyClones(args, util, cntrl) {
      const target =
        args.SPRITE === "_myself_"
          ? util.target
          : runtime.getSpriteTargetByName(args.SPRITE);
      if (target) {
        const clones = target.sprite.clones;
        const varName = args.VAR;
        const numValue = args.NUM;
        for (let i = 1; i < clones.length; i++) {
          const variable = clones[i].lookupVariableByNameAndType(varName, "");
          if (variable && variable.value === numValue)
            this.searchThreads(clones[i].id, cntrl);
        }
      }
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
      for (let i = 0; i < allScripts.length; i++) {
        this.breakLoop({ NAME: allScripts[i] });
      }
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
