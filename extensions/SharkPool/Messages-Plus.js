// Name: Messages+
// ID: SPmessagePlus
// Description: New Powerful Message Blocks that work with Vanilla Blocks!
// By: SharkPool

// Version 1.0.1

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Messages+ must run unsandboxed");

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2My42Nzk1NSIgaGVpZ2h0PSI2My42Nzk1NiIgdmlld0JveD0iMCwwLDYzLjY3OTU1LDYzLjY3OTU2Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA4LjE2MDIyLC0xNDguMTYwMjIpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yMTAuMTYwMjMsMTgwYzAsLTE2LjQ4MDA1IDEzLjM1OTcyLC0yOS44Mzk3OCAyOS44Mzk3OCwtMjkuODM5NzhjMTYuNDgwMDUsMCAyOS44Mzk3NywxMy4zNTk3MiAyOS44Mzk3NywyOS44Mzk3OGMwLDE2LjQ4MDA1IC0xMy4zNTk3MiwyOS44Mzk3OCAtMjkuODM5NzcsMjkuODM5NzhjLTE2LjQ4MDA1LDAgLTI5LjgzOTc4LC0xMy4zNTk3MiAtMjkuODM5NzgsLTI5LjgzOTc4eiIgZmlsbD0iI2ZmYmYwMCIgc3Ryb2tlPSIjY2M5OTAwIiBzdHJva2Utd2lkdGg9IjQiLz48cGF0aCBkPSJNMjE4Ljk3MTc2LDE3OC42MjQ5MmMtMC4xODQ2NiwtOS4wODY3NyA1LjAzMzYsLTExLjk5NjkyIDguOTYzOTksLTExLjk5NjkyYzQuNzgyODgsMCAxNS4zNzA5LC0wLjI3NjA1IDIzLjUyMjA0LDBjMy45ODAyLDAuMTM0NzkgOS43NjIyMywzLjE1MjU0IDkuNTcwNTgsMTEuOTk2OTJjLTAuMTgxMzgsOC4zNzAyNiAtNi42NDAyOCwxMC45MTg1NCAtOS42Mzc5NywxMC45MTg1NGMtMi43Mjg3NiwwIC03LjI5MTYzLDAgLTEyLjQ2ODcxLDBjLTEuMzY4OCwwIC01LjIwMzEsNy4yMjUwNyAtMTEuNDU3NzMsNy4wMDk0NGMtNC40MzYwNiwtMC4xNTI5NCAyLjUyMTY3LC03LjAwOTQ0IDAuNzQxMzksLTcuMDA5NDRjLTUuMjc5MTksMCAtOS4xMDUwNiwtNC41OTQzIC05LjIzMzU5LC0xMC45MTg1NHoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI0Ni43ODQ4MywxOTIuOTgzOXYtMy4xNzU5NGgtMy4xNzU5NGMtMS41MzAyNCwwIC0yLjc3MDc0LC0xLjEzNDQyIC0yLjc3MDc0LC0yLjUzMzhjMCwtMS4zOTkzOCAxLjI0MDUsLTIuNTMzODEgMi43NzA3NCwtMi41MzM4MWgzLjE3NTk0di0zLjE3NTk0YzAsLTEuNTMwMjQgMS4xMzQ0MiwtMi43NzA3NCAyLjUzMzgxLC0yLjc3MDc0YzEuMzk5MzgsMCAyLjUzMzgsMS4yNDA1IDIuNTMzOCwyLjc3MDc0djMuMTc1OTRoMy4xNzU5NWMxLjUzMDIzLDAgMi43NzA3MywxLjEzNDQyIDIuNzcwNzMsMi41MzM4MWMwLDEuMzk5MzggLTEuMjQwNSwyLjUzMzgxIC0yLjc3MDczLDIuNTMzODFoLTMuMTc1OTV2My4xNzU5NGMwLDEuNTMwMjQgLTEuMTM0NDIsMi43NzA3NCAtMi41MzM4LDIuNzcwNzRjLTEuMzk5MzgsMCAtMi41MzM4MSwtMS4yNDA1IC0yLjUzMzgxLC0yLjc3MDc0eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZiZjAwIiBzdHJva2Utd2lkdGg9IjYiLz48cGF0aCBkPSJNMjQ2Ljc4NDgzLDE5Mi45ODM5di0zLjE3NTk0aC0zLjE3NTk0Yy0xLjUzMDI0LDAgLTIuNzcwNzQsLTEuMTM0NDIgLTIuNzcwNzQsLTIuNTMzOGMwLC0xLjM5OTM4IDEuMjQwNSwtMi41MzM4IDIuNzcwNzQsLTIuNTMzOGgzLjE3NTk0di0zLjE3NTk0YzAsLTEuNTMwMjQgMS4xMzQ0MiwtMi43NzA3NCAyLjUzMzgsLTIuNzcwNzRjMS4zOTkzOCwwIDIuNTMzOCwxLjI0MDUgMi41MzM4LDIuNzcwNzR2My4xNzU5NGgzLjE3NTk0YzEuNTMwMjQsMCAyLjc3MDc0LDEuMTM0NDIgMi43NzA3NCwyLjUzMzhjMCwxLjM5OTM4IC0xLjI0MDUsMi41MzM4IC0yLjc3MDc0LDIuNTMzOGgtMy4xNzU5NHYzLjE3NTk0YzAsMS41MzAyNCAtMS4xMzQ0MiwyLjc3MDc0IC0yLjUzMzgsMi43NzA3NGMtMS4zOTkzOCwwIC0yLjUzMzgsLTEuMjQwNSAtMi41MzM4LC0yLjc3MDc0eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48L2c+PC9nPjwvc3ZnPg==";

  class SPmessagePlus {
    constructor() {
      runtime.on("AFTER_EXECUTE", () => {
        for (const thread of runtime.threads) {
          if (Math.round(thread.messageFlag / 10) === Math.round(Date.now() / 10)) {
            // Give a couple more frames for "<is () received?>" to report true
            setTimeout(function() { delete thread.messageFlag }, 10);
          }
        }
      });
    }
    getInfo() {
      return {
        id: "SPmessagePlus",
        name: "Messages+",
        color1: "#FFBF00",
        color2: "#E6AC00",
        color3: "#CC9900",
        menuIconURI,
        blocks: [
          {
            opcode: "broadcastTarget",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_event"],
            hideFromPalette: true,
            text: "broadcast [BROADCAST_OPTION] to [TARGET] and [WAIT]",
            arguments: {
              BROADCAST_OPTION: { type: null },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              WAIT: { type: Scratch.ArgumentType.STRING, menu: "SHOULD_WAIT" }
            },
          },
          {
            opcode: "broadcastDataTarget",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_event"],
            hideFromPalette: true,
            text: "broadcast [BROADCAST_OPTION] with data [DATA] to [TARGET] and [WAIT]",
            arguments: {
              BROADCAST_OPTION: { type: null },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              DATA: { type: Scratch.ArgumentType.STRING },
              WAIT: { type: Scratch.ArgumentType.STRING, menu: "SHOULD_WAIT" }
            },
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: `
              <block type="SPmessagePlus_broadcastTarget"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value><value name="TARGET"><shadow type="SPmessagePlus_menu_TARGETS"></shadow></value><value name="DATA"><shadow type="text"></shadow></value><value name="SHOULD_WAIT"><shadow type="SPmessagePlus_menu_SHOULD_WAIT"></shadow></value></block>
              <block type="SPmessagePlus_broadcastDataTarget"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value><value name="TARGET"><shadow type="SPmessagePlus_menu_TARGETS"></shadow></value><value name="DATA"><shadow type="text"></shadow></value><value name="SHOULD_WAIT"><shadow type="SPmessagePlus_menu_SHOULD_WAIT"></shadow></value></block>
            `,
          },
          {
            opcode: "broadcastArray",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_event"],
            text: "broadcast [MESSAGES] with data [DATA] to [TARGET] and [WAIT]",
            arguments: {
              MESSAGES: { type: Scratch.ArgumentType.STRING, defaultValue: `["message1", "message2"]` },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              DATA: { type: Scratch.ArgumentType.STRING },
              WAIT: { type: Scratch.ArgumentType.STRING, menu: "SHOULD_WAIT" }
            },
          },
          {
            opcode: "receivedData",
            blockType: Scratch.BlockType.REPORTER,
            extensions: ["colours_event"],
            allowDropAnywhere: true,
            disableMonitor: true,
            text: "received data"
          },
          {
            opcode: "otherData",
            blockType: Scratch.BlockType.REPORTER,
            extensions: ["colours_event"],
            allowDropAnywhere: true,
            disableMonitor: true,
            hideFromPalette: true,
            text: "received data from [BROADCAST_OPTION] in [TARGET]",
            arguments: {
              BROADCAST_OPTION: { type: null },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            },
          },
          {
            opcode: "broadcastReturn",
            blockType: Scratch.BlockType.REPORTER,
            extensions: ["colours_event"],
            hideFromPalette: true,
            text: "broadcast [BROADCAST_OPTION] to [TARGET]",
            arguments: {
              BROADCAST_OPTION: { type: null },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            },
          },
          {
            opcode: "broadcastReturnData",
            blockType: Scratch.BlockType.REPORTER,
            extensions: ["colours_event"],
            hideFromPalette: true,
            text: "broadcast [BROADCAST_OPTION] with data [DATA] to [TARGET]",
            arguments: {
              BROADCAST_OPTION: { type: null },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              DATA: { type: Scratch.ArgumentType.STRING }
            },
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: `
              <block type="SPmessagePlus_otherData"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value><value name="TARGET"><shadow type="SPmessagePlus_menu_TARGETS"></shadow></value></block>
              <sep gap="36"/>
              <block type="SPmessagePlus_broadcastReturn"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value><value name="TARGET"><shadow type="SPmessagePlus_menu_TARGETS"></shadow></value><value name="DATA"><shadow type="text"></shadow></value></block>
              <block type="SPmessagePlus_broadcastReturnData"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value><value name="TARGET"><shadow type="SPmessagePlus_menu_TARGETS"></shadow></value><value name="DATA"><shadow type="text"></shadow></value></block>
            `,
          },
          {
            opcode: "respondData",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_event"],
            isTerminal: true,
            text: "respond [DATA]",
            arguments: {
              DATA: { type: Scratch.ArgumentType.STRING, defaultValue: "received!" }
            },
          },
          "---",
          {
            opcode: "isReceived",
            blockType: Scratch.BlockType.BOOLEAN,
            extensions: ["colours_event"],
            disableMonitor: true,
            hideFromPalette: true,
            text: "is [BROADCAST_OPTION] received?",
            arguments: {
              BROADCAST_OPTION: { type: null }
            },
          },
          {
            opcode: "isWaiting",
            blockType: Scratch.BlockType.BOOLEAN,
            extensions: ["colours_event"],
            disableMonitor: true,
            hideFromPalette: true,
            text: "is [BROADCAST_OPTION] waiting?",
            arguments: {
              BROADCAST_OPTION: { type: null }
            },
          },
          {
            opcode: "receivers",
            blockType: Scratch.BlockType.REPORTER,
            extensions: ["colours_event"],
            disableMonitor: true,
            hideFromPalette: true,
            text: "receivers of [BROADCAST_OPTION]",
            arguments: {
              BROADCAST_OPTION: { type: null }
            },
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: `
              <block type="SPmessagePlus_isReceived"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value></block>
              <block type="SPmessagePlus_isWaiting"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value></block>
              <block type="SPmessagePlus_receivers"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value></block>
            `,
          }
        ],
        menus: {
          TARGETS: {
            acceptReporters: true,
            items: "_getTargets",
          },
          SHOULD_WAIT: ["continue", "wait"],
        },
      };
    }

    // Helper Functions

    _getTargets() {
      const spriteNames = [
        { text: "All Sprites", value: "_all_" },
        { text: "Stage", value: "_stage_" },
        { text: "myself", value: "_myself_" }
      ];
      const targets = runtime.targets;
      for (let index = 1; index < targets.length; index++) {
        const target = targets[index];
        if (target.isOriginal) {
          const targetName = target.getName();
          spriteNames.push({ text: targetName, value: targetName });
        }
      }
      return spriteNames.length > 0 ? spriteNames : [""];
    }

    _getTargetFromMenu(targetName, util) {
      if (targetName === "_all_") return undefined; // Scratch will default to all sprites
      if (targetName === "_myself_") return util.target;
      let target = Scratch.vm.runtime.getSpriteTargetByName(targetName);
      if (targetName === "_stage_") target = runtime.getTargetForStage();
      return target ? target : undefined;
    }

    _broadcast(name, target, data, util) {
      if (!name) return [];
      let startedThreads = [];
      target = this._getTargetFromMenu(target, util);
      if (target === undefined) {
        // Means ALL Sprites
        startedThreads = [
          ...util.startHats("event_whenbroadcastreceived", { BROADCAST_OPTION: name })
        ];
      } else {
        const cloneTargets = target.sprite.clones;
        for (const clone of cloneTargets) {
          startedThreads = [
            ...startedThreads,
            ...util.startHats("event_whenbroadcastreceived", { BROADCAST_OPTION: name }, clone )
          ];
        }
      }
      if (data) startedThreads.forEach((thread) => (thread.receivedData = data));
      return startedThreads;
    }

    _getMessageHats(name, type) {
      const IDs = [];
      const targets = runtime.targets;
      for (let index = 0; index < targets.length; index++) {
        const target = targets[index];
        for (const [blockID, block] of Object.entries(target.blocks._blocks)) {
          if (
            block.opcode === "event_whenbroadcastreceived" && block.fields &&
            block.fields.BROADCAST_OPTION.value === name
          ) {
            if (type === "IDs") IDs.push(blockID);
            else IDs.push(target);
          }
        }
      }
      return IDs;
    }

    // Blocks

    broadcastTarget(args, util) { this.broadcastDataTarget({ ...args, DATA : "" }, util) }

    broadcastDataTarget(args, util) {
      if (!util.stackFrame.broadcastVar) util.stackFrame.broadcastVar = Scratch.Cast.toString(args.BROADCAST_OPTION);
      const data = Scratch.Cast.toString(args.DATA);
      if (util.stackFrame.broadcastVar) {
        const name = util.stackFrame.broadcastVar;
        if (!util.stackFrame.startedThreads) {
          util.stackFrame.startedThreads = this._broadcast(name, args.TARGET, data, util);
          if (util.stackFrame.startedThreads.length === 0) return;
        }
        const waiting = util.stackFrame.startedThreads.some((thread) => runtime.threads.indexOf(thread) !== -1);
        if (args.WAIT === "wait" && waiting) {
          if (util.stackFrame.startedThreads.every((thread) => runtime.isWaitingThread(thread))) util.yieldTick();
          else util.yield();
        }
      }
    }

    broadcastArray(args, util) {
      try {
        if (!util.stackFrame.broadcastVar) {
          util.stackFrame.broadcastVar = JSON.parse(Scratch.Cast.toString(args.MESSAGES));
        }
        const data = Scratch.Cast.toString(args.DATA);
        const messages = util.stackFrame.broadcastVar;
        if (messages.length > 0) {
          if (!util.stackFrame.startedThreads) {
            util.stackFrame.startedThreads = [];
            for (let i = 0; i < messages.length; i++) {
              util.stackFrame.startedThreads = [
                ...util.stackFrame.startedThreads,
                ...this._broadcast(messages[i], args.TARGET, data, util)
              ];
            }
            if (util.stackFrame.startedThreads.length === 0) return;
          }
          const waiting = util.stackFrame.startedThreads.some((thread) => runtime.threads.indexOf(thread) !== -1);
          if (args.WAIT === "wait" && waiting) {
            if (util.stackFrame.startedThreads.every((thread) => runtime.isWaitingThread(thread))) util.yieldTick();
            else util.yield();
          }
        }
      } catch {}
    }

    receivedData(args, util) {
      const received = util.thread.receivedData;
      return received ? received : "";
    }

    otherData(args, util) {
      const broadcast = Scratch.Cast.toString(args.BROADCAST_OPTION);
      const blockIds = this._getMessageHats(broadcast, "IDs");
      let received = "";
      const target = this._getTargetFromMenu(args.TARGET, util);
      for (const ID of blockIds) {
        const thread = runtime.threads.find(thread => thread.topBlock === ID);
        if (thread && thread.receivedData !== undefined) {
          if (!target) received = thread.receivedData;
          else if (target.id === thread.target.id) received = thread.receivedData;
        }
      }
      return received;
    }

    broadcastReturn(args, util) { return this.broadcastReturnData({ ...args, DATA : "" }, util) || "" }

    broadcastReturnData(args, util) {
      if (!util.stackFrame.broadcastVar) util.stackFrame.broadcastVar = Scratch.Cast.toString(args.BROADCAST_OPTION);
      const data = Scratch.Cast.toString(args.DATA);
      let response = "";
      if (util.stackFrame.broadcastVar) {
        const name = util.stackFrame.broadcastVar;
        if (!util.stackFrame.startedThreads) {
          util.stackFrame.startedThreads = this._broadcast(name, args.TARGET, data, util);
          if (util.stackFrame.startedThreads.length === 0) return;
        }
        const waiting = util.stackFrame.startedThreads.some((thread) => runtime.threads.indexOf(thread) !== -1);
        for (const thread of util.stackFrame.startedThreads) {
          if (thread.justReported) {
            response = thread.justReported;
            break;
          }
        }
        if (!response && waiting) {
          if (util.stackFrame.startedThreads.every((thread) => runtime.isWaitingThread(thread))) util.yieldTick();
          else util.yield();
        }
      }
      return response ? response : "";
    }

    respondData(args, util) {
      util.thread.justReported = Scratch.Cast.toString(args.DATA);
      //Delay the Deletion of this Thread
      if (util.stackTimerNeedsInit()) {
        util.startStackTimer(0);
        runtime.requestRedraw();
        util.yield();
      } else if (!util.stackTimerFinished()) util.yield();
      util.thread.stopThisScript;
    }

    isReceived(args) {
      const broadcast = Scratch.Cast.toString(args.BROADCAST_OPTION);
      const blockIds = this._getMessageHats(broadcast, "IDs");
      let waiting = false;
      for (const ID of blockIds) {
        const thread = runtime.threads.find(thread => thread.topBlock === ID);
        if (thread && thread.messageFlag === undefined) {
          thread.messageFlag = Date.now();
          waiting = true;
          break;
        }
      }
      return waiting;
    }

    isWaiting(args) {
      const broadcast = Scratch.Cast.toString(args.BROADCAST_OPTION);
      const blockIds = this._getMessageHats(broadcast, "IDs");
      let waiting = false;
      for (const ID of blockIds) {
        const thread = runtime.threads.find(thread => thread.topBlock === ID);
        if (thread) {
          waiting = true;
          break;
        }
      }
      return waiting;
    }

    receivers(args) {
      const broadcast = Scratch.Cast.toString(args.BROADCAST_OPTION);
      const targets = this._getMessageHats(broadcast, "targets");
      for (let i = 0; i < targets.length; i++) {
        const name = targets[i].getName();
        targets[i] = targets[i].isOriginal ? name : `${name} (clone)`;
      }
      return JSON.stringify(targets);
    }
  }

  Scratch.extensions.register(new SPmessagePlus());
})(Scratch);
