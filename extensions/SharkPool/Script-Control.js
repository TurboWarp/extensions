// Name: Script Control
// ID: SPscripts
// Description: Control Scripts
// By: SharkPool

// Version V.1.4.11

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Script Control must be run unsandboxed");

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  let storedScripts = {};

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMTguMTU4IiBoZWlnaHQ9IjExOC4xNTgiIHZpZXdCb3g9IjAsMCwxMTguMTU4LDExOC4xNTgiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCB4MT0iMTk4LjIyNDgyIiB5MT0iMTM4LjIyNDgzIiB4Mj0iMjgxLjc3NTE2IiB5Mj0iMjIxLjc3NTE3IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzEzNTM0NyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFmMzMzNCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSIyMDIuMDk1IiB5MT0iMTQyLjA5NTAxIiB4Mj0iMjc3LjkwNDk3IiB5Mj0iMjE3LjkwNDk5IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTIiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzFlODM3MCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzNhNjA2MiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xODAuOTIwOTgsLTEyMC45MjEpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTk4LjIyNDgyLDIyMS43NzUxN2MtMjMuMDcxNzgsLTIzLjA3MTc4IC0yMy4wNzE3OCwtNjAuNDc4NTUgMCwtODMuNTUwMzNjMjMuMDcxNzgsLTIzLjA3MTc4IDYwLjQ3ODU1LC0yMy4wNzE3OCA4My41NTAzMywwYzIzLjA3MTc4LDIzLjA3MTc4IDIzLjA3MTc4LDYwLjQ3ODU1IDAsODMuNTUwMzNjLTIzLjA3MTc4LDIzLjA3MTc4IC02MC40Nzg1NSwyMy4wNzE3OCAtODMuNTUwMzMsMHoiIGZpbGw9InVybCgjY29sb3ItMSkiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjAyLjA5NSwyMTcuOTA0OTljLTIwLjkzNDM1LC0yMC45MzQzNSAtMjAuOTM0MzUsLTU0Ljg3NTYzIDAsLTc1LjgwOTk3YzIwLjkzNDM1LC0yMC45MzQzNSA1NC44NzU2MywtMjAuOTM0MzUgNzUuODA5OTcsMGMyMC45MzQzNSwyMC45MzQzNSAyMC45MzQzNSw1NC44NzU2MyAwLDc1LjgwOTk3Yy0yMC45MzQzNSwyMC45MzQzNSAtNTQuODc1NjMsMjAuOTM0MzUgLTc1LjgwOTk3LDB6IiBmaWxsPSJ1cmwoI2NvbG9yLTIpIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI4My41MzE5OSwxODguMzk3MzFjMC4yMjA2OCwyLjE1NTkgLTEuMDQ1NTgsNC4wNTM1NiAtMi44MjY1Miw0LjIzNTg1bC0zNC4xOTIyOSwzLjQ5OTc4Yy0wLjg1ODE5LDAuMDg3ODQgLTEuNjM2MSwwLjU3Nzg4IC0yLjE2MTA0LDEuMzczNTdsLTMuOTQ1ODQsNS45MTMyM2MtMC41MjU3NCwwLjc4Nzg3IC0xLjMwMjg1LDEuMjg1NzMgLTIuMTYxMDQsMS4zNzM1N2wtMTYuNjg2MzksMS43MDc5NWMtMC44NTgxOSwwLjA4Nzg0IC0xLjcyMDA2LC0wLjI0MjI3IC0yLjQwMDk3LC0wLjkwNjYzbC01LjA1NTUxLC00Ljk5MTg4Yy0wLjY4MTcxLC0wLjY3MjE5IC0xLjU0Mjc3LC0wLjk5NDQ3IC0yLjM5NDUsLTAuOTA3MjlsLTguNDA3NzQsMC44NjA1OGMtMS43ODA5MiwwLjE4MjI4IC0zLjQwNTM4LC0xLjQxOTQ4IC0zLjYyNjA1LC0zLjU3NTM4bC0zLjIwNjA5LC0zMS4zMjI5OWMtMC4yMjA2OCwtMi4xNTU5IDEuMDQ1NTgsLTQuMDUzNTYgMi44MjY1MiwtNC4yMzU4NWw4LjM0MzIyLC0wLjg1Mzk4YzAuODU4MTksLTAuMDg3ODQgMS43MjAwMywwLjI0MjI3IDIuMzk0NDgsMC45MDcyOWw1LjEyODAzLDUuMDYzNDFjMC42ODA5MiwwLjY2NDM2IDEuNTQyNzcsMC45OTQ0NyAyLjQwMDk3LDAuOTA2NjNsMTYuNjg2MzksLTEuNzA3OTVjMC44NTgxOSwtMC4wODc4NCAxLjYzNTMxLC0wLjU4NTcxIDIuMTYxMDQsLTEuMzczNTdsMy45OTU5MSwtNS45OTczMWMwLjUzMjIsLTAuNzg4NTMgMS4zMDkyOCwtMS4yODY0IDIuMTY3NDcsLTEuMzc0MjNsMzQuMTI3NzcsLTMuNDkzMTljMS43ODA5MiwtMC4xODIyOCAzLjQwNTM4LDEuNDE5NDggMy42MjYwNSwzLjU3NTM4ek0yNjAuOTI4OCwxNjAuMzA1NDdsLTEyLjUyMzc5LDEuMjgxODljLTguMDY5NSwwLjgyNTk2IC0xMy45NDE1Myw4LjAzNzEzIC0xMy4xMTU1NywxNi4xMDY2M2MwLjgyNTk2LDguMDY5NDggOC4wMzcxMywxMy45NDE1MSAxNi4xMDY2MywxMy4xMTU1NWwxMi41MjM3OSwtMS4yODE4OWM4LjA2OTUsLTAuODI1OTYgMTMuOTQxNTMsLTguMDM3MTIgMTMuMTE1NTcsLTE2LjEwNjYxYy0wLjgyNTk2LC04LjA2OTUgLTguMDM3MTMsLTEzLjk0MTUzIC0xNi4xMDY2MywtMTMuMTE1NTd6TTI2MC42MTAzOCwxNzUuMTAyMjVjMC41ODkzOSw1Ljc2NDE2IC0zLjYwNTIxLDEwLjkxNDgyIC05LjM2OTI3LDExLjUwNDgyYy0zLjcyOTIzLDAuMzgxNzIgLTcuMzc4NzksLTEuMjU1MjMgLTkuNTczNzksLTQuMjk0MTFjLTIuMTk0OTcsLTMuMDM4OSAtMi42MDE4OCwtNy4wMTgwMSAtMS4wNjczNiwtMTAuNDM4MjdjMS41MzQ1MiwtMy40MjAyNyA0Ljc3NzI1LC01Ljc2MTk1IDguNTA2NTUsLTYuMTQyOTJjNS43NjQxOSwtMC41ODg3OSAxMC45MTQ0NiwzLjYwNjMzIDExLjUwMzg3LDkuMzcwNDV6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvZz48L3N2Zz4=";

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
            items: ["start", "stop", "restart"]
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
              } else { console.error("Script Was Deleted!") }
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
              for (let i = 0; i <= num; i++) {
                newID = index.blockContainer.getNextBlock(newID);
              }
              if (newID) {
                runtime._stopThread(index);
                runtime._pushThread(newID, storedScripts[key].target, { stackClick: true });
              }
            } else { console.error("Script Was Deleted!") }
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

  function addLinearGradientToBody() {
    var grad1 = document.createElement("div");
    grad1.innerHTML = `<svg><defs>
      <linearGradient x1="200" y1="0" x2="240" y2="100" gradientUnits="userSpaceOnUse" id="SPscripts-GRAD1">
      <stop offset="0" stop-color="#1e8370"/><stop offset="0.5" stop-color="#3a6062"/></linearGradient>
      </defs></svg>`;
    document.body.append(grad1);
  }
  if (Scratch.gui) Scratch.gui.getBlockly().then((ScratchBlocks) => {
    addLinearGradientToBody();
    if (!ScratchBlocks?.SPgradients?.patched) { // Gradient Patch by 0znzw & SharkPool
      ScratchBlocks.SPgradients = {gradientUrls: {}, patched: false};
      const BSP = ScratchBlocks.BlockSvg.prototype, BSPR = BSP.render;
      BSP.render = function(...args) {
        const res = BSPR.apply(this, args);
        let category;
        if (this?.svgPath_ && this?.category_ && (category = this.type.slice(0, this.type.indexOf("_"))) && ScratchBlocks.SPgradients.gradientUrls[category]) {
          const urls = ScratchBlocks.SPgradients.gradientUrls[category];
          if (urls) this.svgPath_.setAttribute("fill", urls[0]);
        }
        return res;
      }
      ScratchBlocks.SPgradients.patched = true;
    }
    ScratchBlocks.SPgradients.gradientUrls["SPscripts"] = ["url(#SPscripts-GRAD1)"];
  });
  Scratch.extensions.register(new SPscripts());
})(Scratch);
