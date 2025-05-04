// Name: Script Control
// ID: SPscripts
// Description: Control Scripts
// By: SharkPool
// License: MIT

// Version V.2.0.0

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Script Control must be run unsandboxed");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMTguMTU4IiBoZWlnaHQ9IjExOC4xNTgiIHZpZXdCb3g9IjAgMCAxMTguMTU4IDExOC4xNTgiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCB4MT0iMTk4LjIyNSIgeTE9IjEzOC4yMjUiIHgyPSIyODEuNzc1IiB5Mj0iMjIxLjc3NSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJhIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMxMzUzNDciLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxZjMzMzQiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iMjAyLjA5NSIgeTE9IjE0Mi4wOTUiIHgyPSIyNzcuOTA1IiB5Mj0iMjE3LjkwNSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJiIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMxZTgzNzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzYTYwNjIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZyBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0xOTguMjI1IDIyMS43NzVjLTIzLjA3Mi0yMy4wNzItMjMuMDcyLTYwLjQ3OCAwLTgzLjU1czYwLjQ3OC0yMy4wNzIgODMuNTUgMCAyMy4wNzIgNjAuNDc4IDAgODMuNTUtNjAuNDc4IDIzLjA3Mi04My41NSAwIiBmaWxsPSJ1cmwoI2EpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTgwLjkyMSAtMTIwLjkyMSkiLz48cGF0aCBkPSJNMjAyLjA5NSAyMTcuOTA1Yy0yMC45MzQtMjAuOTM0LTIwLjkzNC01NC44NzYgMC03NS44MXM1NC44NzYtMjAuOTM0IDc1LjgxIDAgMjAuOTM0IDU0Ljg3NiAwIDc1LjgxLTU0Ljg3NiAyMC45MzQtNzUuODEgMCIgZmlsbD0idXJsKCNiKSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4MC45MjEgLTEyMC45MjEpIi8+PHBhdGggZD0iTTEwMi42MTEgNjcuNDc2Yy4yMiAyLjE1Ni0xLjA0NiA0LjA1NC0yLjgyNyA0LjIzNmwtMzQuMTkyIDMuNWMtLjg1OC4wODgtMS42MzYuNTc4LTIuMTYgMS4zNzRsLTMuOTQ3IDUuOTEzYy0uNTI1Ljc4OC0xLjMwMyAxLjI4NS0yLjE2IDEuMzczTDQwLjYzOCA4NS41OGMtLjg1OC4wODgtMS43Mi0uMjQyLTIuNDAxLS45MDZsLTUuMDU2LTQuOTkyYy0uNjgxLS42NzItMS41NDItLjk5NS0yLjM5NC0uOTA4bC04LjQwOC44NjFjLTEuNzguMTgyLTMuNDA1LTEuNDItMy42MjYtMy41NzVsLTMuMjA2LTMxLjMyM2MtLjIyLTIuMTU2IDEuMDQ2LTQuMDU0IDIuODI3LTQuMjM2bDguMzQzLS44NTRjLjg1OC0uMDg4IDEuNzIuMjQyIDIuMzk0LjkwN2w1LjEyOCA1LjA2NGMuNjgxLjY2NCAxLjU0My45OTQgMi40MDEuOTA2bDE2LjY4Ny0xLjcwOGMuODU4LS4wODggMS42MzUtLjU4NSAyLjE2LTEuMzczbDMuOTk3LTUuOTk4Yy41MzItLjc4OCAxLjMwOS0xLjI4NiAyLjE2Ny0xLjM3NGwzNC4xMjgtMy40OTJjMS43OC0uMTgyIDMuNDA1IDEuNDIgMy42MjYgMy41NzV6TTgwLjAwOCAzOS4zODRsLTEyLjUyNCAxLjI4MmMtOC4wNy44MjYtMTMuOTQyIDguMDM3LTEzLjExNiAxNi4xMDdzOC4wMzggMTMuOTQyIDE2LjEwNyAxMy4xMTZsMTIuNTI0LTEuMjgyYzguMDctLjgyNiAxMy45NDEtOC4wMzcgMTMuMTE1LTE2LjEwN3MtOC4wMzctMTMuOTQxLTE2LjEwNi0xMy4xMTZtLS4zMTkgMTQuNzk3Yy41OSA1Ljc2NC0zLjYwNSAxMC45MTUtOS4zNjkgMTEuNTA1YTEwLjQ5MiAxMC40OTIgMCAxIDEtMi4xMzQtMjAuODc1YzUuNzY0LS41ODkgMTAuOTE0IDMuNjA2IDExLjUwMyA5LjM3IiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L2c+PC9zdmc+";

  const vm = Scratch.vm;
  const Cast = Scratch.Cast;
  const runtime = vm.runtime;
  const translated = {
    script: Scratch.translate("script-1")
  };

  const controlKey = Symbol("SPscriptsData");
  let markedScripts = new Map();

  const ogStepThreads = runtime.sequencer.stepThreads;
  runtime.sequencer.stepThreads = function() {
    markedScripts.forEach((script) => {
      const thread = script.threadCtx;
      if (thread[controlKey]) {
        if (thread.status !== 5) thread[controlKey] = thread.status;
        thread.status = 5
      }
    });
    return ogStepThreads.call(this);
  };

  const expRenderedTarget = new vm.exports.RenderedTarget({ blocks: null }, runtime);
  const Blocks = expRenderedTarget.blocks.constructor;
  const ogGetNext = Blocks.prototype.getNextBlock;
  Blocks.prototype.getNextBlock = function(name) {
    const thisBlock = ogGetNext.call(this, name);
    if (thisBlock) return thisBlock;
    for (const target of this.runtime.targets) {
      if (!target.isOriginal || target.blocks === this) continue;
      const targetBlock = ogGetNext.call(target.blocks, name);
      if (targetBlock) return targetBlock;
    }
    return undefined;
  }
  const ogGetBranch = Blocks.prototype.getBranch;
  Blocks.prototype.getBranch = function(id, branchNum) {
    const thisBlock = ogGetBranch.call(this, id, branchNum);
    if (thisBlock) return thisBlock;
    for (const target of this.runtime.targets) {
      if (!target.isOriginal || target.blocks === this) continue;
      const targetBlock = ogGetBranch.call(target.blocks, id, branchNum);
      if (targetBlock) return targetBlock;
    }
    return undefined;
  }

  class SPscripts {
    getInfo() {
      return {
        id: "SPscripts",
        name: Scratch.translate("Script Control"),
        color1: "#3a6062",
        color2: "#124d42",
        color3: "#1c2e2f",
        menuIconURI,
        blocks: [
          { blockType: Scratch.BlockType.LABEL, text: Scratch.translate("Markers") },
          {
            opcode: "logScript",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("log this script with custom ID [ID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: translated.script }
            }
          },
          {
            opcode: "removeLog",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("erase script with custom ID [ID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: translated.script }
            }
          },
          {
            opcode: "removeLogs",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("remove all logged scripts")
          },
          {
            opcode: "allLogs",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("all logged scripts")
          },
          "---",
          {
            opcode: "indexLog",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("index of log in script with custom ID [ID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: translated.script }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: Scratch.translate("Control") },
          {
            opcode: "doScripts",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[TYPE] script with ID [ID]"),
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "CONTROL" },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: translated.script }
            }
          },
          {
            opcode: "skipBlocks",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("start script with ID [ID] at block index [NUM]"),
            arguments: {
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: translated.script }
            }
          },
          {
            opcode: "skipMyBlocks",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("skip next [NUM] blocks"),
            arguments: {
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            }
          },
          "---",
          {
            opcode: "doScriptTarget",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("start script with ID [ID] in [TARGET]"),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: translated.script }
            }
          },
          {
            opcode: "doScriptClone",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("start script with ID [ID] in clones of [TARGET] with [VAR] set to [VAL]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: translated.script },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: "my variable" },
              VAL: { type: Scratch.ArgumentType.STRING, defaultValue: "0" }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: Scratch.translate("Operations") },
          {
            opcode: "whileScript",
            blockType: Scratch.BlockType.LOOP,
            text: Scratch.translate("while script with ID [ID] is running"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: translated.script }
            }
          },
          {
            opcode: "isScript",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("script with ID [ID] running?"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: translated.script }
            }
          },
          {
            opcode: "isManual",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("script with ID [ID] manually running?"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: translated.script }
            }
          },
        ],
        menus: {
          TARGETS: { acceptReporters: true, items: this.getTargets(false) },
          TARGETS2: { acceptReporters: true, items: this.getTargets(true) },
          CONTROL: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("start"), value: "start" },
              { text: Scratch.translate("stop"), value: "stop" },
              { text: Scratch.translate("restart"), value: "restart" },
              { text: Scratch.translate("pause"), value: "pause" },
              { text: Scratch.translate("unpause"), value: "unpause" }
            ]
          }
        },
      };
    }

    // Helper Funcs
    getTargets(spritesOnly) {
      const spriteNames = [];
      if (spritesOnly) spriteNames.push({ text: Scratch.translate("myself"), value: "_myself_" });
      else spriteNames.push({ text: Scratch.translate("Stage"), value: "_stage_" });
      const targets = runtime.targets;
      for (let i = 1; i < targets.length; i++) {
        const target = targets[i];
        if (target.isOriginal) spriteNames.push({ text: target.getName(), value: target.getName() });
      }
      return spriteNames.length > 0 ? spriteNames : [""];
    }

    getTarget(name, util) {
      if (name === "_myself_") return util.target;
      if (name === "_stage_") return runtime.getTargetForStage();
      return runtime.getSpriteTargetByName(name);
    }

    getThisBlock(util) {
      return util.thread.blockContainer.getBlock(
        util.thread.isCompiled ? util.thread.peekStack() : util.thread.peekStackFrame().op.id
      );
    }

    getBlockIndex(thread, id) {
      const container = thread.blockContainer;
      let index = 0;
      while (id) {
        index++;
        id = container.getBlock(id)?.parent;
      }
      return index;
    }

    targetHasBlock(id, target) {
      if (target.blocks._blocks[id]) return true;
      else return false;
    }

    pushThreadAsTarget(id, newT, oldT) {
      const thread = runtime._pushThread(id, oldT);
      thread.target = newT;
      thread.ogTarget = oldT;
      if (runtime.compilerOptions.enabled) thread.tryCompile();
      return thread;
    }

    addMissingData(srcObj, newObj) {
      // re-add any missing custom thread data
      Reflect.ownKeys(srcObj).forEach(key => {
        if (!(key in newObj)) newObj[key] = srcObj[key];
      });
      Reflect.ownKeys(srcObj.stackFrames[0]).forEach(key => {
        if (!(key in newObj.stackFrames[0])) newObj.stackFrames[0][key] = srcObj.stackFrames[0][key];
      });
    }

    // Block Funcs
    logScript(args, util) {
      const thisBlock = this.getThisBlock(util);
      if (!thisBlock) return;
      
      const thread = util.thread;
      markedScripts.set(Cast.toString(args.ID), {
        threadCtx: thread, target: thread.ogTarget ?? thread.target,
        logIndex: this.getBlockIndex(thread, thisBlock.id)
      });
    }

    removeLog(args) {
      markedScripts.delete(Cast.toString(args.ID));
    }

    removeLogs() {
      markedScripts = new Map();
    }

    allLogs() {
      return JSON.stringify(markedScripts.keys().toArray());
    }

    indexLog(args) {
      const script = markedScripts.get(Cast.toString(args.ID));
      return script ? script.logIndex : 0;
    }

    doScripts(args) {
      const script = markedScripts.get(Cast.toString(args.ID));
      if (!script) return;

      const ctx = script.threadCtx;
      switch (args.TYPE) {
        case "start":
          if (this.targetHasBlock(ctx.topBlock, script.target)) runtime._pushThread(ctx.topBlock, script.target);
          break;
        case "restart":
          if (this.targetHasBlock(ctx.topBlock, script.target)) runtime._restartThread(ctx);
          break;
        case "stop":
          runtime._stopThread(ctx);
          break;
        case "pause":
          if (this.isScript(args) && ctx[controlKey] === undefined) {
            ctx[controlKey] = ctx.status;
            ctx.status = 5;
          }
          break;
        case "unpause":
          if (this.isScript(args) && ctx[controlKey] !== undefined) {
            ctx.status = ctx[controlKey];
            ctx[controlKey] = undefined;
          }
          break;
        default: return;
      }
    }

    skipBlocks(args) {
      const script = markedScripts.get(Cast.toString(args.ID));
      if (!script) return;

      const ctx = script.threadCtx;
      const container = ctx.blockContainer;
      const index = Cast.toNumber(args.NUM);

      let curID = container.getBlock(ctx.topBlock)?.id;
      if (!curID) return;
      for (let i = 1; i < index; i++) {
        curID = container.getNextBlock(curID);
        if (!curID) return;
      }
      runtime._pushThread(curID, script.target);
    }

    skipMyBlocks(args, util) {
      const thisBlock = this.getThisBlock(util);
      if (!thisBlock) return;

      const thread = util.thread;
      const container = thread.blockContainer;
      const index = Cast.toNumber(args.NUM) + 1;

      let curID = thisBlock;
      for (let i = 0; i < index; i++) {
        curID = container.getNextBlock(curID);
        if (!curID) break;
      }

      if (thread.isCompiled) this.addMissingData(thread, runtime._pushThread(curID, thread.target));
      else thread.reuseStackForNextBlock(curID);
    }

    doScriptTarget(args, util) {
      const script = markedScripts.get(Cast.toString(args.ID));
      const target = this.getTarget(args.TARGET, util);
      if (!target || !script) return;

      const ctx = script.threadCtx;
      this.pushThreadAsTarget(ctx.topBlock, target, script.target);
    }

    doScriptClone(args, util) {
      const script = markedScripts.get(Cast.toString(args.ID));
      const target = this.getTarget(args.TARGET, util);
      if (!target || !script) return;

      const varName = Cast.toString(args.VAR);
      const ctx = script.threadCtx;
      const clones = target.sprite.clones;
      if (!varName) {
        for (const clone of clones) {
          if (!clone.isOriginal) this.pushThreadAsTarget(ctx.topBlock, clone, script.target);
        }
      } else {
        for (const clone of clones) {
          const variable = clone.lookupVariableByNameAndType(varName, "", true);
          if (variable && Cast.toString(variable.value) === Cast.toString(args.VAL)) {
            this.pushThreadAsTarget(ctx.topBlock, clone, script.target);
          }
        }
      }
    }

    whileScript(args, util) {
      if (this.isScript(args)) util.startBranch(1, true);
    }

    isScript(args) {
      const script = markedScripts.get(Cast.toString(args.ID));
      return script ? script.threadCtx.status !== 4 : false;
    }

    isManual(args) {
      const script = markedScripts.get(Cast.toString(args.ID));
      if (!script) return false;

      const thread = script.threadCtx;
      return thread.stackClick && thread.status !== 4;
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
        const blockTheme = ReduxStore.getState().scratchGui?.theme?.theme?.blocks;
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
