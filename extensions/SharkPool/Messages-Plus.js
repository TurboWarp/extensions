// Name: Messages+
// ID: SPmessagePlus
// Description: New Powerful Message Blocks that work with Vanilla Blocks!
// By: SharkPool

// Version 1.3.11

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Messages+ must run unsandboxed");

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const kMessageName = Symbol("kMessageName"); // May be defined on a Thread as a string
  const kMessageFlag = Symbol("kMessageFlag"); // May be defined on a Thread as a number
  const kReceivedData = Symbol("kReceivedData"); // May be defined on a Thread as any Scratch-compatible value

  // TODO: _all_ is not actually a reserved value
  const ALL = "_all_", STAGE = "_stage_", MYSELF = "_myself_", MYSELF2 = "_myselfOnly_";

  let nonRestartedMsgs = [], threadedMsgs = [];

  const ogStartHats = runtime.startHats;
  runtime.startHats = function (opcode, fields, target) {
    let threads = ogStartHats.call(this, opcode, fields, target);
    if (opcode === "event_whenbroadcastreceived") {
      threads = [...threads, ...runtime.startHats("SPmessagePlus_whenAnyBroadcast")];
      runtime.allScriptsByOpcodeDo(
        "SPmessagePlus_whenReceived", (script, target) => {
          // fields are evaluated in the hat, which makes it slower :(
          const id = script.blockId;
          const existing = runtime.threadMap.get(`${target.id}&${id}`);
          if (existing) threads.push(runtime._restartThread(existing));
          else threads.push(runtime._pushThread(id, target));
        }
      );
      const name = fields.BROADCAST_OPTION;
      for (const thread of threads) thread[kMessageName] = name;
    }
    return threads;
  };

  const ogRestartThread = runtime._restartThread;
  runtime._restartThread = function (thread) {
    const name = thread[kMessageName];
    if (name) {
      if (threadedMsgs.indexOf(name) > -1) return runtime._pushThread(thread.topBlock, thread.target);
      else if (nonRestartedMsgs.indexOf(name) > -1) return thread;
    }
    return ogRestartThread.call(this, thread);
  };

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2My42OCIgaGVpZ2h0PSI2My42OCIgdmlld0JveD0iMCAwIDYzLjY4IDYzLjY4Ij48cGF0aCBkPSJNMiAzMS44NEMyIDE1LjM2IDE1LjM2IDIgMzEuODQgMnMyOS44NCAxMy4zNiAyOS44NCAyOS44NC0xMy4zNiAyOS44NC0yOS44NCAyOS44NFMyIDQ4LjMyIDIgMzEuODR6IiBmaWxsPSIjZmZiZjAwIiBzdHJva2U9IiNjOTAiIHN0cm9rZS13aWR0aD0iNCIvPjxwYXRoIGQ9Ik0xMC44MTIgMzAuNDY1Yy0uMTg1LTkuMDg3IDUuMDMzLTExLjk5NyA4Ljk2NC0xMS45OTcgNC43ODMgMCAxNS4zNy0uMjc2IDIzLjUyMiAwIDMuOTguMTM1IDkuNzYyIDMuMTUzIDkuNTcgMTEuOTk3LS4xODEgOC4zNy02LjY0IDEwLjkxOC05LjYzOCAxMC45MThIMzAuNzYyYy0xLjM3IDAtNS4yMDMgNy4yMjYtMTEuNDU4IDcuMDEtNC40MzYtLjE1MyAyLjUyMi03LjAxLjc0MS03LjAxLTUuMjc5IDAtOS4xMDUtNC41OTQtOS4yMzMtMTAuOTE4IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTM4LjYyNSA0NC44MjR2LTMuMTc2aC0zLjE3NmMtMS41MyAwLTIuNzctMS4xMzQtMi43Ny0yLjUzNHMxLjI0LTIuNTM0IDIuNzctMi41MzRoMy4xNzZ2LTMuMTc2YzAtMS41MyAxLjEzNC0yLjc3IDIuNTM0LTIuNzdzMi41MzMgMS4yNCAyLjUzMyAyLjc3djMuMTc2aDMuMTc2YzEuNTMgMCAyLjc3MSAxLjEzNSAyLjc3MSAyLjUzNCAwIDEuNC0xLjI0IDIuNTM0LTIuNzcgMi41MzRoLTMuMTc3djMuMTc2YzAgMS41My0xLjEzNCAyLjc3LTIuNTMzIDIuNzdzLTIuNTM0LTEuMjQtMi41MzQtMi43N3oiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmYmYwMCIgc3Ryb2tlLXdpZHRoPSI2Ii8+PHBhdGggZD0iTTM4LjYyNSA0NC44MjR2LTMuMTc2aC0zLjE3NmMtMS41MyAwLTIuNzctMS4xMzQtMi43Ny0yLjUzNHMxLjI0LTIuNTM0IDIuNzctMi41MzRoMy4xNzZ2LTMuMTc2YzAtMS41MyAxLjEzNC0yLjc3IDIuNTM0LTIuNzdzMi41MzMgMS4yNCAyLjUzMyAyLjc3djMuMTc2aDMuMTc2YzEuNTMgMCAyLjc3MSAxLjEzNSAyLjc3MSAyLjUzNCAwIDEuNC0xLjI0IDIuNTM0LTIuNzcgMi41MzRoLTMuMTc3djMuMTc2YzAgMS41My0xLjEzNCAyLjc3LTIuNTMzIDIuNzdzLTIuNTM0LTEuMjQtMi41MzQtMi43NyIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==";

  class SPmessagePlus {
    constructor() {
      runtime.on("AFTER_EXECUTE", () => {
        for (const thread of runtime.threads) {
          if (thread[kMessageFlag]) thread[kMessageFlag]--;
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
            text: Scratch.translate("when any broadcast is received")
          },
          {
            opcode: "messageName",
            blockType: Scratch.BlockType.REPORTER,
            extensions: ["colours_event"],
            allowDropAnywhere: true, disableMonitor: true,
            text: Scratch.translate("broadcast name")
          },
          "---",
          {
            opcode: "broadcastTarget",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_event"],
            hideFromPalette: true,
            text: Scratch.translate("broadcast [BROADCAST_OPTION] to [TARGET] and [WAIT]"),
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
            text: Scratch.translate("broadcast [BROADCAST_OPTION] with data [DATA] to [TARGET] and [WAIT]"),
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
            text: Scratch.translate("broadcast [MESSAGES] with data [DATA] to [TARGET] and [WAIT]"),
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
            allowDropAnywhere: true, disableMonitor: true,
            text: Scratch.translate("received data")
          },
          {
            opcode: "otherData",
            blockType: Scratch.BlockType.REPORTER,
            extensions: ["colours_event"],
            allowDropAnywhere: true, disableMonitor: true, hideFromPalette: true,
            text: Scratch.translate("received data from [BROADCAST_OPTION] in [TARGET]"),
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
            text: Scratch.translate("broadcast [BROADCAST_OPTION] to [TARGET]"),
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
            text: Scratch.translate("broadcast [BROADCAST_OPTION] with data [DATA] to [TARGET]"),
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
            text: Scratch.translate("respond [DATA]"),
            arguments: {
              DATA: { type: Scratch.ArgumentType.STRING, defaultValue: Scratch.translate("received!") }
            },
          },
          "---",
          {
            opcode: "isReceived",
            blockType: Scratch.BlockType.BOOLEAN,
            extensions: ["colours_event"],
            disableMonitor: true, hideFromPalette: true,
            text: Scratch.translate("is [BROADCAST_OPTION] received?"),
            arguments: {
              BROADCAST_OPTION: { type: null }
            },
          },
          {
            opcode: "isWaiting",
            blockType: Scratch.BlockType.BOOLEAN,
            extensions: ["colours_event"],
            disableMonitor: true, hideFromPalette: true,
            text: Scratch.translate("is [BROADCAST_OPTION] waiting?"),
            arguments: {
              BROADCAST_OPTION: { type: null }
            },
          },
          {
            opcode: "receivers",
            blockType: Scratch.BlockType.REPORTER,
            extensions: ["colours_event"],
            disableMonitor: true, hideFromPalette: true,
            text: Scratch.translate("receivers of [BROADCAST_OPTION]"),
            arguments: {
              BROADCAST_OPTION: { type: null }
            },
          },
          {
            opcode: "toggleRestart",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_event"],
            hideFromPalette: true,
            text: Scratch.translate("set script restart for [BROADCAST_OPTION] to [TOGGLE]"),
            arguments: {
              BROADCAST_OPTION: { type: null },
              TOGGLE: { type: Scratch.ArgumentType.STRING, menu: "TOGGLE" }
            },
          },
          {
            opcode: "toggleOverlap",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_event"],
            hideFromPalette: true,
            text: Scratch.translate("set script overlap for [BROADCAST_OPTION] to [TOGGLE]"),
            arguments: {
              BROADCAST_OPTION: { type: null },
              TOGGLE: { type: Scratch.ArgumentType.STRING, menu: "TOGGLE" }
            },
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: `
              <block type="SPmessagePlus_isReceived"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value></block>
              <block type="SPmessagePlus_isWaiting"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value></block>
              <block type="SPmessagePlus_receivers"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value></block>
              <sep gap="36"/>
              <block type="SPmessagePlus_toggleRestart"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value><value name="TOGGLE"><shadow type="SPmessagePlus_TOGGLE_menu"></shadow></value></block>
              <block type="SPmessagePlus_toggleOverlap"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value><value name="TOGGLE"><shadow type="SPmessagePlus_TOGGLE_menu"></shadow></value></block>
            `,
          },
          { blockType: Scratch.BlockType.LABEL, text: Scratch.translate("Slower than Normal 'when I receive'") },
          {
            opcode: "whenReceived",
            blockType: Scratch.BlockType.HAT,
            extensions: ["colours_event"],
            isEdgeActivated: false, hideFromPalette: true,
            shouldRestartExistingThreads: true,
            text: Scratch.translate("when I receive [BROADCAST_OPTION]"),
            arguments: {
              BROADCAST_OPTION: { type: null }
            },
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: `
              <block type="SPmessagePlus_whenReceived"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value></block>
            `,
          },
        ],
        menus: {
          TARGETS: { acceptReporters: true, items: "_getTargets" },
          SHOULD_WAIT: [
            {
              text: Scratch.translate({
                default: "continue",
                description: "Used in context 'broadcast [...] to [...] and [continue]'. Won't wait for broadcasts to finish.",
              }),
              value: "continue"
            },
            {
              text: Scratch.translate({
                default: "wait",
                description: "Used in context 'broadcast [...] to [...] and [wait]'. Will wait for broadcasts to finish.",
              }),
              value: "wait"
            }
          ],
          TOGGLE: [
            {
              text: Scratch.translate({
                default: "on",
                description: "Allows only one instance of a broadcast, restarts old instance",
              }),
              value: "on"
            },
            {
              text: Scratch.translate({
                default: "off",
                description: "Allows multiple instances of a broadcast, no restarts",
              }),
              value: "off"
            }
          ]
        },
      };
    }

    // Helper Funcs
    _getTargets() {
      const spriteNames = [
        { text: Scratch.translate("all sprites"), value: ALL },
        { text: Scratch.translate("stage"), value: STAGE },
        { text: Scratch.translate("myself and clones"), value: MYSELF },
        { text: Scratch.translate("myself only"), value: MYSELF2 }
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
      if (targetName === ALL) return undefined;
      if (targetName === STAGE) return util.runtime.getTargetForStage();
      if (targetName === MYSELF || targetName === MYSELF2) return util.target;
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
      if (!broadcastName) return [];
      const target = this._getTargetFromMenu(targetName, util);
      let newThreads = [];
      if (target) {
        // MYSELF2 -> "myself only" is the executors instance
        const clones = targetName === MYSELF2 ? [target] : target.sprite.clones;
        for (const clone of clones) newThreads = newThreads.concat(util.startHats("event_whenbroadcastreceived", { BROADCAST_OPTION: broadcastName }, clone));
      } else {
        // All sprites
        newThreads = util.startHats("event_whenbroadcastreceived", { BROADCAST_OPTION: broadcastName });
      }
      for (const thread of newThreads) thread[kReceivedData] = data;
      return newThreads;
    }

    _getMessageHats(name, type) {
      const IDs = [];
      runtime.allScriptsByOpcodeDo(
        "event_whenbroadcastreceived", (script, target) => {
          const { blockId: topBlockId, fieldsOfInputs: hatFields } = script;
          if (hatFields.BROADCAST_OPTION.value === name.toUpperCase()) {
            IDs.push(type === "IDs" ? topBlockId : target);
          }
        }
      );
      return IDs;
    }

    /**
     * @param {VM.BlockUtility} util
     */
    _waitForStartedThreads(util) {
      if (util.stackFrame.startedThreads.some((thread) => runtime.threads.indexOf(thread) !== -1)) {
        const running = util.stackFrame.startedThreads.every((thread) => runtime.isWaitingThread(thread));
        if (running) util.yieldTick();
        else util.yield();
      }
    }

    // Block Funcs
    messageName(args, util) {
      if (!Object.prototype.hasOwnProperty.call(util.thread, kMessageName)) return "";
      const name = util.thread[kMessageName];
      // The name stored on the thread is toUpperCase(), so lookup the user-facing name
      const variable = util.runtime.getTargetForStage().lookupBroadcastByInputValue(name);
      if (variable) return variable.name;
      return name; // this is a dynamic message
    }

    broadcastTarget(args, util) {
      this.broadcastDataTarget({ ...args, DATA: "" }, util);
    }

    broadcastDataTarget(args, util) {
      if (!util.stackFrame.startedThreads) {
        const name = Scratch.Cast.toString(args.BROADCAST_OPTION);
        const data = Scratch.Cast.toString(args.DATA);
        const newThreads = this._broadcast(name, args.TARGET, data, util);
        if (
          newThreads.length === 0 || Scratch.Cast.toString(args.WAIT) === "continue"
        ) return;
        util.stackFrame.startedThreads = newThreads;
      }
      this._waitForStartedThreads(util);
    }

    broadcastArray(args, util) {
      if (!util.stackFrame.startedThreads) {
        const namesTxt = Scratch.Cast.toString(args.MESSAGES);
        let parsedNames;
        try {
          // try parsing and removing duplicates
          parsedNames = [...new Set(JSON.parse(namesTxt))];
        } catch (e) {
          console.warn(e);
          return;
        }
        const data = Scratch.Cast.toString(args.DATA);
        const newThreads = [];
        for (const name of parsedNames) newThreads.concat(this._broadcast(name, args.TARGET, data, util));
        if (
          newThreads.length === 0 || Scratch.Cast.toString(args.WAIT) === "continue"
        ) return;
        util.stackFrame.startedThreads = newThreads;
      }
      this._waitForStartedThreads(util);
    }

    receivedData(args, util) {
      if (!Object.prototype.hasOwnProperty.call(util.thread, kReceivedData)) return "";
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
          else if (target.id === thread.target.id) received = thread.receivedData;
        }
      }
      return received;
    }

    broadcastReturn(args, util) {
      return this.broadcastReturnData({ ...args, DATA: "" }, util) || "";
    }

    broadcastReturnData(args, util) {
      if (!util.stackFrame.broadcastVar) util.stackFrame.broadcastVar = Scratch.Cast.toString(args.BROADCAST_OPTION);
      const data = Scratch.Cast.toString(args.DATA);
      let response = "";
      if (util.stackFrame.broadcastVar) {
        const name = util.stackFrame.broadcastVar;
        if (!util.stackFrame.startedThreads) {
          util.stackFrame.startedThreads = this._broadcast(
            name, args.TARGET, data, util
          );
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
          if (util.stackFrame.startedThreads.every((thread) => runtime.isWaitingThread(thread)))
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

    toggleRestart(args) {
      const msg = Scratch.Cast.toString(args.BROADCAST_OPTION).toUpperCase();
      const index = nonRestartedMsgs.indexOf(msg);
      if (args.TOGGLE === "on" && index > -1) nonRestartedMsgs.splice(index, 1);
      else if (args.TOGGLE === "off" && index === -1) nonRestartedMsgs.push(msg);
    }

    toggleOverlap(args) {
      const msg = Scratch.Cast.toString(args.BROADCAST_OPTION).toUpperCase();
      const index = threadedMsgs.indexOf(msg);
      if (args.TOGGLE === "on" && index === -1) threadedMsgs.push(msg);
      else if (args.TOGGLE === "off" && index > -1) threadedMsgs.splice(index, 1);
    }

    whenReceived(args, util) {
      const messageName = util.thread[kMessageName];
      const inputName = Scratch.Cast.toString(args.BROADCAST_OPTION).toUpperCase();
      if (messageName) return inputName === messageName;
      return false;
    }
  }

  Scratch.extensions.register(new SPmessagePlus());
})(Scratch);
