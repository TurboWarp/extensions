// Name: Script Control
// ID: SPscripts
// Description: Control Scripts
// By: SharkPool
// License: MIT

// Version V.1.5.01

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Script Control must be run unsandboxed");

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  let storedScripts = {};

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMTguMTU4IiBoZWlnaHQ9IjExOC4xNTgiIHZpZXdCb3g9IjAgMCAxMTguMTU4IDExOC4xNTgiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCB4MT0iMTk4LjIyNSIgeTE9IjEzOC4yMjUiIHgyPSIyODEuNzc1IiB5Mj0iMjIxLjc3NSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJhIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMxMzUzNDciLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxZjMzMzQiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iMjAyLjA5NSIgeTE9IjE0Mi4wOTUiIHgyPSIyNzcuOTA1IiB5Mj0iMjE3LjkwNSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJiIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMxZTgzNzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzYTYwNjIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZyBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0xOTguMjI1IDIyMS43NzVjLTIzLjA3Mi0yMy4wNzItMjMuMDcyLTYwLjQ3OCAwLTgzLjU1czYwLjQ3OC0yMy4wNzIgODMuNTUgMCAyMy4wNzIgNjAuNDc4IDAgODMuNTUtNjAuNDc4IDIzLjA3Mi04My41NSAwIiBmaWxsPSJ1cmwoI2EpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTgwLjkyMSAtMTIwLjkyMSkiLz48cGF0aCBkPSJNMjAyLjA5NSAyMTcuOTA1Yy0yMC45MzQtMjAuOTM0LTIwLjkzNC01NC44NzYgMC03NS44MXM1NC44NzYtMjAuOTM0IDc1LjgxIDAgMjAuOTM0IDU0Ljg3NiAwIDc1LjgxLTU0Ljg3NiAyMC45MzQtNzUuODEgMCIgZmlsbD0idXJsKCNiKSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4MC45MjEgLTEyMC45MjEpIi8+PHBhdGggZD0iTTEwMi42MTEgNjcuNDc2Yy4yMiAyLjE1Ni0xLjA0NiA0LjA1NC0yLjgyNyA0LjIzNmwtMzQuMTkyIDMuNWMtLjg1OC4wODgtMS42MzYuNTc4LTIuMTYgMS4zNzRsLTMuOTQ3IDUuOTEzYy0uNTI1Ljc4OC0xLjMwMyAxLjI4NS0yLjE2IDEuMzczTDQwLjYzOCA4NS41OGMtLjg1OC4wODgtMS43Mi0uMjQyLTIuNDAxLS45MDZsLTUuMDU2LTQuOTkyYy0uNjgxLS42NzItMS41NDItLjk5NS0yLjM5NC0uOTA4bC04LjQwOC44NjFjLTEuNzguMTgyLTMuNDA1LTEuNDItMy42MjYtMy41NzVsLTMuMjA2LTMxLjMyM2MtLjIyLTIuMTU2IDEuMDQ2LTQuMDU0IDIuODI3LTQuMjM2bDguMzQzLS44NTRjLjg1OC0uMDg4IDEuNzIuMjQyIDIuMzk0LjkwN2w1LjEyOCA1LjA2NGMuNjgxLjY2NCAxLjU0My45OTQgMi40MDEuOTA2bDE2LjY4Ny0xLjcwOGMuODU4LS4wODggMS42MzUtLjU4NSAyLjE2LTEuMzczbDMuOTk3LTUuOTk4Yy41MzItLjc4OCAxLjMwOS0xLjI4NiAyLjE2Ny0xLjM3NGwzNC4xMjgtMy40OTJjMS43OC0uMTgyIDMuNDA1IDEuNDIgMy42MjYgMy41NzV6TTgwLjAwOCAzOS4zODRsLTEyLjUyNCAxLjI4MmMtOC4wNy44MjYtMTMuOTQyIDguMDM3LTEzLjExNiAxNi4xMDdzOC4wMzggMTMuOTQyIDE2LjEwNyAxMy4xMTZsMTIuNTI0LTEuMjgyYzguMDctLjgyNiAxMy45NDEtOC4wMzcgMTMuMTE1LTE2LjEwN3MtOC4wMzctMTMuOTQxLTE2LjEwNi0xMy4xMTZtLS4zMTkgMTQuNzk3Yy41OSA1Ljc2NC0zLjYwNSAxMC45MTUtOS4zNjkgMTEuNTA1YTEwLjQ5MiAxMC40OTIgMCAxIDEtMi4xMzQtMjAuODc1YzUuNzY0LS41ODkgMTAuOTE0IDMuNjA2IDExLjUwMyA5LjM3IiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L2c+PC9zdmc+";

  class SPscripts {
    getInfo() {
      return {
        id: "SPscripts",
        name: "Script Control",
        color1: "#3a6062",
        color2: "#124d42",
        color3: "#1c2e2f",
        menuIconURI,
        blocks: [
          {
            opcode: "logScript",
            blockType: Scratch.BlockType.COMMAND,
            text: "log this script with custom ID [ID]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "script-1" }
            }
          },
          {
            opcode: "markScript",
            blockType: Scratch.BlockType.COMMAND,
            text: "log this script with custom ID [ID] at this block",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "script-1" }
            }
          },
          {
            opcode: "removeLog",
            blockType: Scratch.BlockType.COMMAND,
            text: "erase script with custom ID [ID]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "script-1" }
            }
          },
          {
            opcode: "removeLogs",
            blockType: Scratch.BlockType.COMMAND,
            text: "remove all logged scripts"
          },
          "---",
          {
            opcode: "doScripts",
            blockType: Scratch.BlockType.COMMAND,
            text: "[TYPE] script with custom ID [ID]",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "CONTROL" },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "script-1" }
            }
          },
          {
            opcode: "skipBlocks",
            blockType: Scratch.BlockType.COMMAND,
            text: "start script with custom ID [ID] skip [NUM] blocks",
            arguments: {
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "script-1" }
            }
          },
          {
            opcode: "skipMyBlocks",
            blockType: Scratch.BlockType.COMMAND,
            text: "skip [NUM] blocks in this script",
            arguments: {
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            }
          },
          "---",
          {
            opcode: "doScriptTarget",
            blockType: Scratch.BlockType.COMMAND,
            text: "start script with custom ID [ID] in [TARGET]",
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "script-1" }
            }
          },
          {
            opcode: "doScriptClone",
            blockType: Scratch.BlockType.COMMAND,
            text: "start script with custom ID [ID] in clones of [TARGET] with [VAR] set to [VAL]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "script-1" },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "my variable" },
              VAL: { type: Scratch.ArgumentType.STRING, defaultValue: "0" }
            }
          },
          "---",
          {
            opcode: "whileScript",
            blockType: Scratch.BlockType.LOOP,
            text: "while script with custom ID [ID] runs",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "script-1" }
            }
          },
          {
            opcode: "isScript",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "script with custom ID [ID] running?",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "script-1" }
            }
          },
          {
            opcode: "isManual",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "script with custom ID [ID] manually running?",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "script-1" }
            }
          },
          {
            opcode: "indexLog",
            blockType: Scratch.BlockType.REPORTER,
            text: "index of log in script with custom ID [ID]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "script-1" }
            }
          },
        ],
        menus: {
          TARGETS: { acceptReporters: true, items: this.getTargets(false) },
          TARGETS2: { acceptReporters: true, items: this.getTargets(true) },
          CONTROL: {
            acceptReporters: true,
            items: ["start", "stop", "restart", "pause", "unpause"]
          }
        },
      };
    }

    // Helper Funcs
    getTargets(spritesOnly) {
      const spriteNames = [];
      if (spritesOnly) spriteNames.push({ text : "myself", value: "_myself_" });
      else spriteNames.push({ text : "Stage", value: "_stage_" });
      const targets = runtime.targets;
      for (let index = 1; index < targets.length; index++) {
        const target = targets[index];
        if (target.isOriginal) spriteNames.push({ text : target.getName(), value : target.getName() });
      }
      return spriteNames.length > 0 ? spriteNames : [""];
    }

    getIndexByVal(array, name, value) {
      for (let i = 0; i < array.length; i++) {
        if (array[i][name] === value) return i;
      }
      return -1;
    }

    check4Deletion(topBlock) {
      // Make sure the called script exists and is not deleted
      const targets = runtime.targets;
      for (let index = 1; index < targets.length; index++) {
        const target = targets[index];
        if (target.isOriginal) {
          if (target.blocks._blocks[topBlock] !== undefined) return true;
        }
      }
      return false;
    }

    checkThreads(topBlock) {
      // is Script via Block ID running
      const threads = runtime.threads;
      for (let i = 0; i < threads.length; i++) {
        const item = threads[i].topBlock;
        if (item === topBlock) return true;
      }
      return false;
    }

    getIndex(thread, id) {
      let curBlock = thread.topBlock;
      let ind = 0;
      while(curBlock !== id) {
        ind++;
        const blockInfo = thread.blockContainer.getBlock(curBlock);
        if (blockInfo.next !== null) curBlock = blockInfo.next;
        else return ind;
      }
      return ind;
    }

    pushNew(sourceThread, target, blockID, isClick) {
      const thread = runtime._pushThread(blockID, target, { stackClick: isClick });
      // add any missing keys (Variables/Check/etc) in threads
      Object.keys(sourceThread).forEach(key => {
        if (!(key in thread)) thread[key] = sourceThread[key];
      });
      Object.keys(sourceThread.stackFrames[0]).forEach(key => {
        if (!(key in thread.stackFrames[0])) thread.stackFrames[0][key] = sourceThread.stackFrames[0][key];
      });
      return thread;
    }

    // Block Funcs
    logScript(args, util) {
      const ID = Scratch.Cast.toString(args.ID).replaceAll(" ", "-");
      const blockID = util.thread.isCompiled ? util.thread.peekStack() : util.thread.peekStackFrame().op.id;
      const topBlock = util.thread.topBlock;
      const index = this.getIndexByVal(runtime.threads, "topBlock", topBlock);
      // prevent compiler errors when using block: "start script in [sprite]"
      if (storedScripts[`SP-${ID}+${topBlock}`] !== undefined && storedScripts[`SP-${ID}+${topBlock}`].target !== util.target) return;
      storedScripts[`SP-${ID}+${topBlock}`] = {
        id : topBlock, ind : runtime.threads[index], target : util.target, indexBlock : this.getIndex(util.thread, blockID)
      };
    }

    markScript(args, util) {
      const ID = Scratch.Cast.toString(args.ID).replaceAll(" ", "-");
      const blockID = util.thread.isCompiled ? util.thread.peekStack() : util.thread.peekStackFrame().op.id;
      storedScripts[`SP-${ID}+${blockID}`] = {
        id : blockID, ind : { topBlock: blockID }, target : util.target, indexBlock : this.getIndex(util.thread, blockID)
      };
    }

    removeLog(args) {
      const ID = Scratch.Cast.toString(args.ID).replaceAll(" ", "-");
      Object.keys(storedScripts).forEach(key => {
        if (key.includes(`SP-${ID}+`)) delete storedScripts[key];
      });
    }

    removeLogs() { storedScripts = {} }

    runScript(args, overrideTarget) {
      // Needs to be a Promise, Stopped then Started Threads get Confused
      return new Promise((resolve, reject) => {
        const ID = Scratch.Cast.toString(args.ID).replaceAll(" ", "-");
        if (args.TYPE === "restart") this.doScripts({ ...args, TYPE: "stop" }).then(() => resolve()).catch(error => reject(error));
        const control = args.TYPE === "stop" ? "_stopThread" : "_restartThread";
        const promises = [];
        Object.keys(storedScripts).forEach(key => {
          if (key.includes(`SP-${ID}+`)) {
            try {
              const index = storedScripts[key].ind;
              if (this.check4Deletion(index.topBlock)) {
                if (args.TYPE === "start") {
                  promises.push(
                    new Promise((resolveThread, rejectThread) => {
                      const thread = runtime._pushThread(index.topBlock, storedScripts[key].target, { stackClick: true });
                      if (overrideTarget !== undefined) {
                        thread.target = overrideTarget;
                        thread.overriden = storedScripts[key].target; // custom key usable for other blocks
                        if (runtime.compilerOptions.enabled) thread.tryCompile();
                      }
                      resolveThread();
                    })
                  );
                } else if (args.TYPE.includes("pause")) {
                  if (this.isScript(args)) {
                    if (args.TYPE === "unpause") storedScripts[key].ind.status = storedScripts[key].status ?? 0;
                    else {
                      storedScripts[key].status = storedScripts[key].ind.status;
                      storedScripts[key].ind.status = 5;
                    }
                  }
                } else {
                  if (index !== -1) {
                    promises.push(
                      new Promise((resolveControl, rejectControl) => {
                        runtime[control](index);
                        resolveControl();
                      })
                    );
                  }
                }
              } else { console.warn("Script Was Deleted!") }
            } catch (e) { reject(e) }
          }
        });
        Promise.all(promises).then(() => resolve()).catch(error => reject(error));
      });
    }

    doScripts(args) { this.runScript(args) }

    doScriptTarget(args) {
      const target = args.TARGET === "_stage_" ? runtime.getTargetForStage() : runtime.getSpriteTargetByName(args.TARGET);
      if (!target) return;
      this.runScript({ ...args, TYPE : "start" }, target);
    }

    doScriptClone(args, util) {
      const target = args.TARGET === "_myself_" ? util.target : runtime.getSpriteTargetByName(args.TARGET);
      if (!target) return;
      const clones = target.sprite.clones;
      for (var i = 1; i < clones.length; i++) {
        if (clones[i]) {
          const variable = clones[i].lookupVariableByNameAndType(args.VAR, "", clones[i]);
          const value = Scratch.Cast.toString(args.VAL);
          if (variable && Scratch.Cast.toString(variable.value) === value) {
            this.runScript({ ...args, TYPE : "start" }, clones[i]);
          }
        }
      }
    }

    skipBlocks(args) {
      const ID = Scratch.Cast.toString(args.ID).replaceAll(" ", "-");
      const num = Scratch.Cast.toNumber(args.NUM);
      Object.keys(storedScripts).forEach(key => {
        if (key.includes(`SP-${ID}+`)) {
          try {
            const index = storedScripts[key].ind;
            if (this.check4Deletion(index.topBlock)) {
              let newID = index.topBlock;
              for (let i = 0; i <= num; i++) { newID = index.blockContainer.getNextBlock(newID) }
              if (newID) {
                runtime._stopThread(index);
                runtime._pushThread(newID, storedScripts[key].target, { stackClick: true });
              }
            } else { console.warn("Script Was Deleted!") }
          } catch {}
        }
      });
    }

    skipMyBlocks(args, util) {
      return new Promise(resolve => {
        const num = Scratch.Cast.toNumber(args.NUM);
        const myID = util.thread.isCompiled ? util.thread.peekStack() : util.thread.peekStackFrame().op.id;
        const thread = util.thread;
        let newID = thread.topBlock;
        while (newID !== myID && newID) { newID = thread.blockContainer.getNextBlock(newID) }
        if (!newID) {
          resolve();
          return;
        }
        for (let i = 0; i <= num; i++) {
          newID = thread.blockContainer.getNextBlock(newID);
        }
        if (num >= 0) util.stopThisScript();
        if (newID && newID !== myID) {
          if (thread.overriden === undefined) this.pushNew(thread, util.target, newID, thread.stackClick);
          else {
            const newThread = this.pushNew(thread, thread.overriden, newID, thread.stackClick);
            newThread.target = util.target;
            if (runtime.compilerOptions.enabled) newThread.tryCompile();
          }
        }
        resolve();
      });
    }

    whileScript(args, util) {
      const condition = this.isScript(args);
      if (condition) util.startBranch(1, true);
    }

    isScript(args) {
      let value = false;
      const ID = Scratch.Cast.toString(args.ID).replaceAll(" ", "-");
      Object.keys(storedScripts).forEach(key => {
        if (key.includes(`SP-${ID}+`)) {
          value = this.checkThreads(storedScripts[key].id);
        }
      });
      return value;
    }

    isManual(args) {
      let value = false;
      const ID = Scratch.Cast.toString(args.ID).replaceAll(" ", "-");
      Object.keys(storedScripts).forEach(key => {
        if (key.includes(`SP-${ID}+`)) {
          const thread = runtime.threads[this.getIndexByVal(runtime.threads, "topBlock", storedScripts[key].id)];
          if (thread) value = thread.stackClick;
        }
      });
      return value;
    }

    indexLog(args) {
      let value = "";
      const ID = Scratch.Cast.toString(args.ID).replaceAll(" ", "-");
      Object.keys(storedScripts).forEach(key => {
        if (key.includes(`SP-${ID}+`)) value = storedScripts[key].indexBlock;
      });
      return value;
    }
  }

  function add2Body() {
    var grad = document.createElement("div");
    grad.innerHTML = `
      <svg><defs>
        <linearGradient x1="200" y1="0" x2="240" y2="100" gradientUnits="userSpaceOnUse" id="SPscripts-GRAD1">
        <stop offset="0" stop-color="#1e8370"/><stop offset="0.5" stop-color="#3a6062"/></linearGradient>
      </defs></svg>`;
    document.body.append(grad);
  }
  if (Scratch.gui) Scratch.gui.getBlockly().then((SB) => {
    add2Body();
    if (!SB?.SPgradients?.patched) {
      // Gradient Patch by 0znzw & SharkPool
      SB.SPgradients = { gradientUrls: {}, patched: false };
      const BSP = SB.BlockSvg.prototype, BSPR = BSP.render;
      BSP.render = function(...args) {
        const blockTheme = ReduxStore.getState().scratchGui.theme.theme.blocks;
        const res = BSPR.apply(this, args);
        let category;
        if (this?.svgPath_ && this?.category_ && (category = this.type.slice(0, this.type.indexOf("_"))) && SB.SPgradients.gradientUrls[category]) {
          const urls = SB.SPgradients.gradientUrls[category];
          if (urls) {
            this.svgPath_.setAttribute("fill", urls[0]);
            if (blockTheme === "dark") {
              this.svgPath_.setAttribute("fill-opacity", ".5");
              this.svgPath_.setAttribute("stroke", "#31d6b7");
            }
          }
        }
        return res;
      }
      SB.SPgradients.patched = true;
    }
    ScratchBlocks.SPgradients.gradientUrls["SPscripts"] = ["url(#SPscripts-GRAD1)"];
  });

  Scratch.extensions.register(new SPscripts());
})(Scratch);
