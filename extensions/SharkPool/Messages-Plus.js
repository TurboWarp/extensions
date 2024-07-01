// Name: Messages+
// ID: SPmessagePlus
// Description: New Powerful Message Blocks that work with Vanilla Blocks!
// By: SharkPool

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Messages+ must run unsandboxed");
  }

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  // May be defined on a Thread as a string.
  const kMessageName = Symbol("kMessageName");

  // May be defined on a Thread as a number.
  const kMessageFlag = Symbol("kMessageFlag");

  // May be defined on a Thread as any Scratch-compatible value
  const kReceivedData = Symbol("kReceivedData");

  const originalStartHats = runtime.startHats;
  runtime.startHats = function (opcode, fields, target) {
    let threads = originalStartHats.call(this, opcode, fields, target);

    if (opcode === "event_whenbroadcastreceived") {
      const name = fields.BROADCAST_OPTION;
      threads = [
        ...threads,
        ...runtime.startHats("SPmessagePlus_whenAnyBroadcast"),
      ];
      for (const thread of threads) {
        thread[kMessageName] = name;
      }
    }

    return threads;
  };

  // TODO: _all_ is not actually a reserved value
  const ALL = "_all_";
  const STAGE = "_stage_";
  const MYSELF = "_myself_";

  const menuIconURI =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2My42Nzk1NSIgaGVpZ2h0PSI2My42Nzk1NiIgdmlld0JveD0iMCwwLDYzLjY3OTU1LDYzLjY3OTU2Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA4LjE2MDIyLC0xNDguMTYwMjIpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yMTAuMTYwMjMsMTgwYzAsLTE2LjQ4MDA1IDEzLjM1OTcyLC0yOS44Mzk3OCAyOS44Mzk3OCwtMjkuODM5NzhjMTYuNDgwMDUsMCAyOS44Mzk3NywxMy4zNTk3MiAyOS44Mzk3NywyOS44Mzk3OGMwLDE2LjQ4MDA1IC0xMy4zNTk3MiwyOS44Mzk3OCAtMjkuODM5NzcsMjkuODM5NzhjLTE2LjQ4MDA1LDAgLTI5LjgzOTc4LC0xMy4zNTk3MiAtMjkuODM5NzgsLTI5LjgzOTc4eiIgZmlsbD0iI2ZmYmYwMCIgc3Ryb2tlPSIjY2M5OTAwIiBzdHJva2Utd2lkdGg9IjQiLz48cGF0aCBkPSJNMjE4Ljk3MTc2LDE3OC42MjQ5MmMtMC4xODQ2NiwtOS4wODY3NyA1LjAzMzYsLTExLjk5NjkyIDguOTYzOTksLTExLjk5NjkyYzQuNzgyODgsMCAxNS4zNzA5LC0wLjI3NjA1IDIzLjUyMjA0LDBjMy45ODAyLDAuMTM0NzkgOS43NjIyMywzLjE1MjU0IDkuNTcwNTgsMTEuOTk2OTJjLTAuMTgxMzgsOC4zNzAyNiAtNi42NDAyOCwxMC45MTg1NCAtOS42Mzc5NywxMC45MTg1NGMtMi43Mjg3NiwwIC03LjI5MTYzLDAgLTEyLjQ2ODcxLDBjLTEuMzY4OCwwIC01LjIwMzEsNy4yMjUwNyAtMTEuNDU3NzMsNy4wMDk0NGMtNC40MzYwNiwtMC4xNTI5NCAyLjUyMTY3LC03LjAwOTQ0IDAuNzQxMzksLTcuMDA5NDRjLTUuMjc5MTksMCAtOS4xMDUwNiwtNC41OTQzIC05LjIzMzU5LC0xMC45MTg1NHoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI0Ni43ODQ4MywxOTIuOTgzOXYtMy4xNzU5NGgtMy4xNzU5NGMtMS41MzAyNCwwIC0yLjc3MDc0LC0xLjEzNDQyIC0yLjc3MDc0LC0yLjUzMzhjMCwtMS4zOTkzOCAxLjI0MDUsLTIuNTMzODEgMi43NzA3NCwtMi41MzM4MWgzLjE3NTk0di0zLjE3NTk0YzAsLTEuNTMwMjQgMS4xMzQ0MiwtMi43NzA3NCAyLjUzMzgxLC0yLjc3MDc0YzEuMzk5MzgsMCAyLjUzMzgsMS4yNDA1IDIuNTMzOCwyLjc3MDc0djMuMTc1OTRoMy4xNzU5NWMxLjUzMDIzLDAgMi43NzA3MywxLjEzNDQyIDIuNzcwNzMsMi41MzM4MWMwLDEuMzk5MzggLTEuMjQwNSwyLjUzMzgxIC0yLjc3MDczLDIuNTMzODFoLTMuMTc1OTV2My4xNzU5NGMwLDEuNTMwMjQgLTEuMTM0NDIsMi43NzA3NCAtMi41MzM4LDIuNzcwNzRjLTEuMzk5MzgsMCAtMi41MzM4MSwtMS4yNDA1IC0yLjUzMzgxLC0yLjc3MDc0eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZiZjAwIiBzdHJva2Utd2lkdGg9IjYiLz48cGF0aCBkPSJNMjQ2Ljc4NDgzLDE5Mi45ODM5di0zLjE3NTk0aC0zLjE3NTk0Yy0xLjUzMDI0LDAgLTIuNzcwNzQsLTEuMTM0NDIgLTIuNzcwNzQsLTIuNTMzOGMwLC0xLjM5OTM4IDEuMjQwNSwtMi41MzM4IDIuNzcwNzQsLTIuNTMzOGgzLjE3NTk0di0zLjE3NTk0YzAsLTEuNTMwMjQgMS4xMzQ0MiwtMi43NzA3NCAyLjUzMzgsLTIuNzcwNzRjMS4zOTkzOCwwIDIuNTMzOCwxLjI0MDUgMi41MzM4LDIuNzcwNzR2My4xNzU5NGgzLjE3NTk0YzEuNTMwMjQsMCAyLjc3MDc0LDEuMTM0NDIgMi43NzA3NCwyLjUzMzhjMCwxLjM5OTM4IC0xLjI0MDUsMi41MzM4IC0yLjc3MDc0LDIuNTMzOGgtMy4xNzU5NHYzLjE3NTk0YzAsMS41MzAyNCAtMS4xMzQ0MiwyLjc3MDc0IC0yLjUzMzgsMi43NzA3NGMtMS4zOTkzOCwwIC0yLjUzMzgsLTEuMjQwNSAtMi41MzM4LC0yLjc3MDc0eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48L2c+PC9nPjwvc3ZnPg==";

  class SPmessagePlus {
    constructor() {
      runtime.on("AFTER_EXECUTE", () => {
        for (const thread of runtime.threads) {
          if (thread[kMessageFlag]) {
            thread[kMessageFlag]--;
          }
        }
      });
    }

    getInfo() {
      return {
        id: "SPmessagePlus",
        name: Scratch.translate("Messages+"),
        color1: "#FFBF00",
        color2: "#E6AC00",
        color3: "#CC9900",
        menuIconURI,
        blocks: [
          {
            opcode: "whenAnyBroadcast",
            blockType: Scratch.BlockType.EVENT,
            extensions: ["colours_event"],
            isEdgeActivated: false,
            shouldRestartExistingThreads: true,
            text: Scratch.translate("when any broadcast is received"),
          },
          {
            opcode: "messageName",
            blockType: Scratch.BlockType.REPORTER,
            extensions: ["colours_event"],
            allowDropAnywhere: true,
            disableMonitor: true,
            text: Scratch.translate("broadcast name"),
          },
          "---",
          {
            opcode: "broadcastTarget",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_event"],
            hideFromPalette: true,
            text: Scratch.translate(
              "broadcast [BROADCAST_OPTION] to [TARGET] and [WAIT]"
            ),
            arguments: {
              BROADCAST_OPTION: { type: null },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              WAIT: { type: Scratch.ArgumentType.STRING, menu: "SHOULD_WAIT" },
            },
          },
          {
            opcode: "broadcastDataTarget",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_event"],
            hideFromPalette: true,
            text: Scratch.translate(
              "broadcast [BROADCAST_OPTION] with data [DATA] to [TARGET] and [WAIT]"
            ),
            arguments: {
              BROADCAST_OPTION: { type: null },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              DATA: { type: Scratch.ArgumentType.STRING },
              WAIT: { type: Scratch.ArgumentType.STRING, menu: "SHOULD_WAIT" },
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
            text: Scratch.translate(
              "broadcast [MESSAGES] with data [DATA] to [TARGET] and [WAIT]"
            ),
            arguments: {
              MESSAGES: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: `["message1", "message2"]`,
              },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              DATA: { type: Scratch.ArgumentType.STRING },
              WAIT: { type: Scratch.ArgumentType.STRING, menu: "SHOULD_WAIT" },
            },
          },
          {
            opcode: "receivedData",
            blockType: Scratch.BlockType.REPORTER,
            extensions: ["colours_event"],
            allowDropAnywhere: true,
            disableMonitor: true,
            text: Scratch.translate("received data"),
          },
          {
            opcode: "otherData",
            blockType: Scratch.BlockType.REPORTER,
            extensions: ["colours_event"],
            allowDropAnywhere: true,
            disableMonitor: true,
            hideFromPalette: true,
            text: Scratch.translate(
              "received data from [BROADCAST_OPTION] in [TARGET]"
            ),
            arguments: {
              BROADCAST_OPTION: { type: null },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          {
            opcode: "broadcastReturn",
            blockType: Scratch.BlockType.REPORTER,
            extensions: ["colours_event"],
            hideFromPalette: true,
            text: Scratch.translate("broadcast [BROADCAST_OPTION] to [TARGET]"),
            arguments: {
              BROADCAST_OPTION: { type: null },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          {
            opcode: "broadcastReturnData",
            blockType: Scratch.BlockType.REPORTER,
            extensions: ["colours_event"],
            hideFromPalette: true,
            text: Scratch.translate(
              "broadcast [BROADCAST_OPTION] with data [DATA] to [TARGET]"
            ),
            arguments: {
              BROADCAST_OPTION: { type: null },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              DATA: { type: Scratch.ArgumentType.STRING },
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
            text: Scratch.translate("respond [DATA]"),
            arguments: {
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("received!"),
              },
            },
          },
          "---",
          {
            opcode: "isReceived",
            blockType: Scratch.BlockType.BOOLEAN,
            extensions: ["colours_event"],
            disableMonitor: true,
            hideFromPalette: true,
            text: Scratch.translate("is [BROADCAST_OPTION] received?"),
            arguments: {
              BROADCAST_OPTION: { type: null },
            },
          },
          {
            opcode: "isWaiting",
            blockType: Scratch.BlockType.BOOLEAN,
            extensions: ["colours_event"],
            disableMonitor: true,
            hideFromPalette: true,
            text: Scratch.translate("is [BROADCAST_OPTION] waiting?"),
            arguments: {
              BROADCAST_OPTION: { type: null },
            },
          },
          {
            opcode: "receivers",
            blockType: Scratch.BlockType.REPORTER,
            extensions: ["colours_event"],
            disableMonitor: true,
            hideFromPalette: true,
            text: Scratch.translate("receivers of [BROADCAST_OPTION]"),
            arguments: {
              BROADCAST_OPTION: { type: null },
            },
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: `
              <block type="SPmessagePlus_isReceived"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value></block>
              <block type="SPmessagePlus_isWaiting"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value></block>
              <block type="SPmessagePlus_receivers"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value></block>
            `,
          },
        ],
        menus: {
          TARGETS: {
            acceptReporters: true,
            items: "_getTargets",
          },
          SHOULD_WAIT: [
            {
              text: Scratch.translate({
                default: "continue",
                description:
                  "Used in context 'broadcast [...] to [...] and [continue]'. Won't wait for broadcasts to finish.",
              }),
              value: "continue",
            },
            {
              text: Scratch.translate({
                default: "wait",
                description:
                  "Used in context 'broadcast [...] to [...] and [wait]'. Will wait for broadcasts to finish.",
              }),
              value: "wait",
            },
          ],
        },
      };
    }

    // Helper Functions

    _getTargets() {
      const spriteNames = [
        { text: Scratch.translate("all sprites"), value: ALL },
        { text: Scratch.translate("stage"), value: STAGE },
        { text: Scratch.translate("myself"), value: MYSELF },
      ];
      const targets = runtime.targets;
      for (let index = 1; index < targets.length; index++) {
        const target = targets[index];
        if (target.isOriginal) {
          const targetName = target.getName();
          spriteNames.push({ text: targetName, value: targetName });
        }
      }
      return spriteNames;
    }

    /**
     * @param {string} targetName
     * @param {VM.BlockUtility} util
     * @returns {VM.Target|undefined}
     */
    _getTargetFromMenu(targetName, util) {
      if (targetName === ALL) {
        return undefined;
      }
      if (targetName === MYSELF) {
        return util.target;
      }
      if (targetName === STAGE) {
        return util.runtime.getTargetForStage();
      }
      return util.runtime.getSpriteTargetByName(targetName) || null;
    }

    /**
     * @param {string} broadcastName
     * @param {string} targetName
     * @param {unknown} data
     * @param {VM.BlockUtility} util
     * @returns {VM.Thread[]}
     */
    _broadcast(broadcastName, targetName, data, util) {
      if (!broadcastName) {
        return [];
      }

      let startedThreads = [];

      const target = this._getTargetFromMenu(targetName, util);
      if (target) {
        for (const clone of target.sprite.clones) {
          const newThreads = util.startHats(
            "event_whenbroadcastreceived",
            { BROADCAST_OPTION: broadcastName },
            clone
          );
          for (const newThread of newThreads) {
            startedThreads.push(newThread);
          }
        }
      } else {
        // All sprites
        startedThreads = util.startHats("event_whenbroadcastreceived", {
          BROADCAST_OPTION: broadcastName,
        });
      }

      for (const thread of startedThreads) {
        thread[kReceivedData] = data;
      }

      return startedThreads;
    }

    _getMessageHats(name, type) {
      const IDs = [];
      runtime.allScriptsByOpcodeDo(
        "event_whenbroadcastreceived",
        (script, target) => {
          const { blockId: topBlockId, fieldsOfInputs: hatFields } = script;
          if (hatFields.BROADCAST_OPTION.value === name.toUpperCase()) {
            if (type === "IDs") IDs.push(topBlockId);
            else IDs.push(target);
          }
        }
      );
      return IDs;
    }

    /**
     * @param {VM.BlockUtility} util
     */
    _waitForStartedThreads(util) {
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

    // Blocks

    messageName(args, util) {
      if (!Object.prototype.hasOwnProperty.call(util.thread, kMessageName)) {
        return "";
      }
      const name = util.thread[kMessageName];

      // The name stored on the thread has been toUpperCase()'d, so lookup the user-facing name
      const stage = util.runtime.getTargetForStage();
      const variable = stage.lookupBroadcastByInputValue(name);

      if (!variable) {
        // dynamic message
        return name;
      }
      return variable.name;
    }

    broadcastTarget(args, util) {
      this.broadcastDataTarget({ ...args, DATA: "" }, util);
    }

    broadcastDataTarget(args, util) {
      if (!util.stackFrame.startedThreads) {
        const name = Scratch.Cast.toString(args.BROADCAST_OPTION);
        const data = Scratch.Cast.toString(args.DATA);
        const startedThreads = this._broadcast(name, args.TARGET, data, util);

        if (
          startedThreads.length === 0 ||
          Scratch.Cast.toString(args.WAIT) === "continue"
        ) {
          return;
        }

        util.stackFrame.startedThreads = startedThreads;
      }

      this._waitForStartedThreads(util);
    }

    broadcastArray(args, util) {
      if (!util.stackFrame.startedThreads) {
        const namesJson = Scratch.Cast.toString(args.MESSAGES);

        // TODO: remove duplicates?
        let parsedNames;
        try {
          parsedNames = JSON.parse(namesJson);
        } catch (e) {
          console.warn(e);
          return;
        }

        const data = Scratch.Cast.toString(args.DATA);

        const startedThreads = [];
        for (const name of parsedNames) {
          for (const newThread of this._broadcast(
            name,
            args.TARGET,
            data,
            util
          )) {
            startedThreads.push(newThread);
          }
        }

        if (
          startedThreads.length === 0 ||
          Scratch.Cast.toString(args.WAIT) === "continue"
        ) {
          return;
        }

        util.stackFrame.startedThreads = startedThreads;
      }

      this._waitForStartedThreads(util);
    }

    receivedData(args, util) {
      if (!Object.prototype.hasOwnProperty.call(util.thread, kReceivedData)) {
        return "";
      }
      return util.thread[kReceivedData];
    }

    otherData(args, util) {
      const broadcast = Scratch.Cast.toString(args.BROADCAST_OPTION);
      const blockIds = this._getMessageHats(broadcast, "IDs");
      let received = "";
      const target = this._getTargetFromMenu(args.TARGET, util);
      for (const ID of blockIds) {
        const thread = runtime.threads.find((thread) => thread.topBlock === ID);
        if (thread && thread.receivedData !== undefined) {
          if (!target) received = thread.receivedData;
          else if (target.id === thread.target.id)
            received = thread.receivedData;
        }
      }
      return received;
    }

    broadcastReturn(args, util) {
      return this.broadcastReturnData({ ...args, DATA: "" }, util) || "";
    }

    broadcastReturnData(args, util) {
      if (!util.stackFrame.broadcastVar)
        util.stackFrame.broadcastVar = Scratch.Cast.toString(
          args.BROADCAST_OPTION
        );
      const data = Scratch.Cast.toString(args.DATA);
      let response = "";
      if (util.stackFrame.broadcastVar) {
        const name = util.stackFrame.broadcastVar;
        if (!util.stackFrame.startedThreads) {
          util.stackFrame.startedThreads = this._broadcast(
            name,
            args.TARGET,
            data,
            util
          );
          if (util.stackFrame.startedThreads.length === 0) return;
        }
        const waiting = util.stackFrame.startedThreads.some(
          (thread) => runtime.threads.indexOf(thread) !== -1
        );
        for (const thread of util.stackFrame.startedThreads) {
          if (thread.justReported) {
            response = thread.justReported;
            break;
          }
        }
        if (!response && waiting) {
          if (
            util.stackFrame.startedThreads.every((thread) =>
              runtime.isWaitingThread(thread)
            )
          )
            util.yieldTick();
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
      util.thread.stopThisScript();
    }

    isReceived(args) {
      const broadcast = Scratch.Cast.toString(args.BROADCAST_OPTION);
      const blockIds = this._getMessageHats(broadcast, "IDs");
      let waiting = false;
      for (const ID of blockIds) {
        const thread = runtime.threads.find((thread) => thread.topBlock === ID);
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
        const thread = runtime.threads.find((thread) => thread.topBlock === ID);
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
