// Name: Messages+
// ID: SPmessagePlus
// Description: Powerful new message blocks that work with vanilla broadcasts.
// By: SharkPool
// License: MIT

// Version 1.3.2

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Messages+ must run unsandboxed");
  }

  const Cast = Scratch.Cast;
  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const kMessageName = Symbol("kMessageName"); // May be defined on a Thread as a string
  const kReceivedData = Symbol("kReceivedData"); // May be defined on a Thread as any Scratch-compatible value
  const kResponseData = Symbol("kResponseData"); // May be defined on a Thread as any Scratch-compatible value

  // TODO: _all_ is not actually a reserved value
  const ALL = "_all_",
    STAGE = "_stage_",
    MYSELF = "_myself_",
    MYSELF2 = "_myselfOnly_";

  const ALL_TARGETS = Symbol("ALL_TARGETS"); // broadcast to every sprite
  const NO_TARGET = Symbol("NO_TARGET"); // the named target does not exist

  const noRestartMsgs = new Set();
  const overlappedMsgs = new Set();
  const multiResponseMsgs = new Set();
  const receivedMsgs = new Map();

  const ogStartHats = runtime.startHats;
  runtime.startHats = function (opcode, fields, target) {
    let threads = ogStartHats.call(this, opcode, fields, target);
    if (opcode === "event_whenbroadcastreceived") {
      threads = [
        ...threads,
        ...runtime.startHats("SPmessagePlus_whenAnyBroadcast"),
      ];

      runtime.allScriptsByOpcodeDo(
        "SPmessagePlus_whenReceived",
        (script, target) => {
          // inputs are evaluated in the hat, which makes it slower :(
          const id = script.blockId;
          const existing = runtime.threadMap.get(`${target.id}&${id}`);
          if (existing) threads.push(runtime._restartThread(existing));
          else threads.push(runtime._pushThread(id, target));
        }
      );

      const name = fields.BROADCAST_OPTION;
      for (const thread of threads) {
        thread[kMessageName] = name;
      }

      // <is () received?> blocks get stored in this temporary cache.
      receivedMsgs.set(name, new WeakMap());
    }

    return threads;
  };

  const ogRestartThread = runtime._restartThread;
  runtime._restartThread = function (thread) {
    const name = thread[kMessageName];
    if (name) {
      if (overlappedMsgs.has(name)) {
        return runtime._pushThread(thread.topBlock, thread.target);
      } else if (noRestartMsgs.has(name)) {
        return thread;
      }
    }

    return ogRestartThread.call(this, thread);
  };

  runtime.on("PROJECT_STOP_ALL", () => receivedMsgs.clear());
  runtime.on("PROJECT_START", () => receivedMsgs.clear());

  const menuIconURI =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2My42OCIgaGVpZ2h0PSI2My42OCIgdmlld0JveD0iMCAwIDYzLjY4IDYzLjY4Ij48cGF0aCBkPSJNMiAzMS44NEMyIDE1LjM2IDE1LjM2IDIgMzEuODQgMnMyOS44NCAxMy4zNiAyOS44NCAyOS44NC0xMy4zNiAyOS44NC0yOS44NCAyOS44NFMyIDQ4LjMyIDIgMzEuODR6IiBmaWxsPSIjZmZiZjAwIiBzdHJva2U9IiNjOTAiIHN0cm9rZS13aWR0aD0iNCIvPjxwYXRoIGQ9Ik0xMC44MTIgMzAuNDY1Yy0uMTg1LTkuMDg3IDUuMDMzLTExLjk5NyA4Ljk2NC0xMS45OTcgNC43ODMgMCAxNS4zNy0uMjc2IDIzLjUyMiAwIDMuOTguMTM1IDkuNzYyIDMuMTUzIDkuNTcgMTEuOTk3LS4xODEgOC4zNy02LjY0IDEwLjkxOC05LjYzOCAxMC45MThIMzAuNzYyYy0xLjM3IDAtNS4yMDMgNy4yMjYtMTEuNDU4IDcuMDEtNC40MzYtLjE1MyAyLjUyMi03LjAxLjc0MS03LjAxLTUuMjc5IDAtOS4xMDUtNC41OTQtOS4yMzMtMTAuOTE4IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTM4LjYyNSA0NC44MjR2LTMuMTc2aC0zLjE3NmMtMS41MyAwLTIuNzctMS4xMzQtMi43Ny0yLjUzNHMxLjI0LTIuNTM0IDIuNzctMi41MzRoMy4xNzZ2LTMuMTc2YzAtMS41MyAxLjEzNC0yLjc3IDIuNTM0LTIuNzdzMi41MzMgMS4yNCAyLjUzMyAyLjc3djMuMTc2aDMuMTc2YzEuNTMgMCAyLjc3MSAxLjEzNSAyLjc3MSAyLjUzNCAwIDEuNC0xLjI0IDIuNTM0LTIuNzcgMi41MzRoLTMuMTc3djMuMTc2YzAgMS41My0xLjEzNCAyLjc3LTIuNTMzIDIuNzdzLTIuNTM0LTEuMjQtMi41MzQtMi43N3oiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmYmYwMCIgc3Ryb2tlLXdpZHRoPSI2Ii8+PHBhdGggZD0iTTM4LjYyNSA0NC44MjR2LTMuMTc2aC0zLjE3NmMtMS41MyAwLTIuNzctMS4xMzQtMi43Ny0yLjUzNHMxLjI0LTIuNTM0IDIuNzctMi41MzRoMy4xNzZ2LTMuMTc2YzAtMS41MyAxLjEzNC0yLjc3IDIuNTM0LTIuNzdzMi41MzMgMS4yNCAyLjUzMyAyLjc3djMuMTc2aDMuMTc2YzEuNTMgMCAyLjc3MSAxLjEzNSAyLjc3MSAyLjUzNCAwIDEuNC0xLjI0IDIuNTM0LTIuNzcgMi41MzRoLTMuMTc3djMuMTc2YzAgMS41My0xLjEzNCAyLjc3LTIuNTMzIDIuNzdzLTIuNTM0LTEuMjQtMi41MzQtMi43NyIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==";

  class SPmessagePlus {
    getInfo() {
      return {
        id: "SPmessagePlus",
        name: Scratch.translate("Messages+"),
        docsURI: "https://extensions.turbowarp.org/SharkPool/Messages-Plus",
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
            opcode: "toggleRestart",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_event"],
            hideFromPalette: true,
            text: Scratch.translate(
              "set script restart for [BROADCAST_OPTION] to [TOGGLE]"
            ),
            arguments: {
              BROADCAST_OPTION: { type: null },
              TOGGLE: { type: Scratch.ArgumentType.STRING, menu: "TOGGLE" },
            },
          },
          {
            opcode: "toggleOverlap",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_event"],
            hideFromPalette: true,
            text: Scratch.translate(
              "set script overlap for [BROADCAST_OPTION] to [TOGGLE]"
            ),
            arguments: {
              BROADCAST_OPTION: { type: null },
              TOGGLE: { type: Scratch.ArgumentType.STRING, menu: "TOGGLE" },
            },
          },
          {
            opcode: "toggleMultiResponse",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_event"],
            hideFromPalette: true,
            text: Scratch.translate(
              "set multiple responses for [BROADCAST_OPTION] to [TOGGLE]"
            ),
            arguments: {
              BROADCAST_OPTION: { type: null },
              TOGGLE: { type: Scratch.ArgumentType.STRING, menu: "TOGGLE" },
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
              <block type="SPmessagePlus_toggleMultiResponse"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value><value name="TOGGLE"><shadow type="SPmessagePlus_TOGGLE_menu"></shadow></value></block>
            `,
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Slower than Normal 'when I receive'"),
          },
          {
            opcode: "whenReceived",
            blockType: Scratch.BlockType.HAT,
            extensions: ["colours_event"],
            isEdgeActivated: false,
            hideFromPalette: true,
            shouldRestartExistingThreads: true,
            text: Scratch.translate("when I receive [BROADCAST_OPTION]"),
            arguments: {
              BROADCAST_OPTION: { type: null },
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
          TOGGLE: [
            {
              text: Scratch.translate({
                default: "on",
                description:
                  "Used in context 'set [option] for [...] to [on]'. Will enable the option for a specific message.",
              }),
              value: "on",
            },
            {
              text: Scratch.translate({
                default: "off",
                description:
                  "Used in context 'set [option] for [...] to [off]'. Will disable the option for a specific message.",
              }),
              value: "off",
            },
          ],
        },
      };
    }

    // Helper Funcs
    _getTargets() {
      const spriteNames = [
        { text: Scratch.translate("all sprites"), value: ALL },
        { text: Scratch.translate("stage"), value: STAGE },
        { text: Scratch.translate("myself and clones"), value: MYSELF },
        { text: Scratch.translate("myself only"), value: MYSELF2 },
      ];
      const targets = runtime.targets;
      for (let i = 1; i < targets.length; i++) {
        const target = targets[i];
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
     * @returns {VM.Target|typeof ALL_TARGETS|typeof NO_TARGET}
     */
    _getTargetFromMenu(targetName, util) {
      if (targetName === ALL) return ALL_TARGETS;
      if (targetName === STAGE) return util.runtime.getTargetForStage();
      if (targetName === MYSELF || targetName === MYSELF2) return util.target;
      return util.runtime.getSpriteTargetByName(targetName) || NO_TARGET;
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
      if (target === NO_TARGET) return [];

      let newThreads = [];
      if (target === ALL_TARGETS) {
        newThreads = util.startHats("event_whenbroadcastreceived", {
          BROADCAST_OPTION: broadcastName,
        });
      } else {
        // MYSELF2 -> "myself only" is the executors instance
        const clones = targetName === MYSELF2 ? [target] : target.sprite.clones;
        for (const clone of clones) {
          newThreads = newThreads.concat(
            util.startHats(
              "event_whenbroadcastreceived",
              { BROADCAST_OPTION: broadcastName },
              clone
            )
          );
        }
      }

      for (const thread of newThreads) thread[kReceivedData] = data;
      return newThreads;
    }

    /**
     * @param {string} broadcastName
     * @param {string} type
     * @returns {(string|VM.Target)[]}
     */
    _getMessageHats(broadcastName, type) {
      broadcastName = Cast.toString(broadcastName).toUpperCase();

      const IDs = [];
      runtime.allScriptsByOpcodeDo(
        "event_whenbroadcastreceived",
        (script, target) => {
          const { blockId: topBlockId, fieldsOfInputs: hatFields } = script;
          if (hatFields.BROADCAST_OPTION.value === broadcastName) {
            IDs.push(type === "blocks" ? topBlockId : target);
          }
        }
      );

      return IDs;
    }

    /**
     * @param {VM.BlockUtility} util
     * @returns {string}
     */
    _thisBlockID(util) {
      return util.thread.isCompiled
        ? util.thread.peekStack()
        : util.thread.peekStackFrame().op.id;
    }

    /**
     * @param {VM.BlockUtility} util
     */
    _waitForStartedThreads(util) {
      if (
        util.stackFrame.startedThreads.some(
          (t) => runtime.threads.indexOf(t) !== -1
        )
      ) {
        const running = util.stackFrame.startedThreads.every((t) =>
          runtime.isWaitingThread(t)
        );
        if (running) util.yieldTick();
        else util.yield();
      }
    }

    // Block Funcs
    messageName(args, util) {
      if (!Object.prototype.hasOwnProperty.call(util.thread, kMessageName)) {
        return "";
      }

      const name = util.thread[kMessageName];
      // The name stored on the thread is toUpperCase(), so lookup the user-facing name
      const variable = util.runtime
        .getTargetForStage()
        .lookupBroadcastByInputValue(name);
      if (variable) return variable.name;
      return name; // this is a dynamic message
    }

    broadcastTarget(args, util) {
      this.broadcastDataTarget({ ...args, DATA: "" }, util);
    }

    broadcastDataTarget(args, util) {
      if (!util.stackFrame.startedThreads) {
        const name = Cast.toString(args.BROADCAST_OPTION);
        const newThreads = this._broadcast(name, args.TARGET, args.DATA, util);
        if (
          newThreads.length === 0 ||
          Cast.toString(args.WAIT) === "continue"
        ) {
          return;
        }
        util.stackFrame.startedThreads = newThreads;
      }
      this._waitForStartedThreads(util);
    }

    broadcastArray(args, util) {
      if (!util.stackFrame.startedThreads) {
        const namesTxt = Cast.toString(args.MESSAGES);
        let parsedNames;
        try {
          // try parsing and removing duplicates
          parsedNames = [...new Set(JSON.parse(namesTxt))];
        } catch (e) {
          console.warn(e);
          return;
        }
        let newThreads = [];
        for (const name of parsedNames) {
          newThreads = newThreads.concat(
            this._broadcast(name, args.TARGET, args.DATA, util)
          );
        }
        if (
          newThreads.length === 0 ||
          Cast.toString(args.WAIT) === "continue"
        ) {
          return;
        }
        util.stackFrame.startedThreads = newThreads;
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
      const broadcast = Cast.toString(args.BROADCAST_OPTION);
      const blockIds = this._getMessageHats(broadcast, "blocks");
      let received = "";

      const target = this._getTargetFromMenu(args.TARGET, util);
      if (target === NO_TARGET) return received;

      for (const ID of blockIds) {
        const thread = runtime.threads.find((t) => t.topBlock === ID);
        if (thread && thread[kReceivedData] !== undefined) {
          if (target === ALL_TARGETS) received = thread[kReceivedData];
          else if (target.id === thread.target.id) {
            received = thread[kReceivedData];
          }
        }
      }

      return received;
    }

    broadcastReturn(args, util) {
      return this.broadcastReturnData({ ...args, DATA: "" }, util) ?? "";
    }

    broadcastReturnData(args, util) {
      const name = Cast.toString(args.BROADCAST_OPTION);
      if (!util.stackFrame.initialized) {
        util.stackFrame.initialized = true;
        util.stackFrame.responses = [];
        util.stackFrame.startedThreads = this._broadcast(
          name,
          args.TARGET,
          args.DATA,
          util
        );

        if (util.stackFrame.startedThreads.length === 0) {
          return multiResponseMsgs.has(name) ? "[]" : "";
        }
        util.yield();
      }

      const threads = util.stackFrame.startedThreads;
      if (threads.some((t) => runtime.isActiveThread(t))) {
        util.yield();
        return; // restart block
      }

      for (const thread of threads) {
        if (thread[kResponseData] !== undefined) {
          util.stackFrame.responses.push(thread[kResponseData]);
        }
      }

      util.stackFrame.initialized = false;
      return multiResponseMsgs.has(name)
        ? JSON.stringify(util.stackFrame.responses)
        : (util.stackFrame.responses[0] ?? "");
    }

    respondData(args, util) {
      util.thread[kResponseData] = args.DATA;
      // Delay the deletion of this Thread
      if (util.stackTimerNeedsInit()) {
        util.startStackTimer(0);
        runtime.requestRedraw();
        util.yield();
      } else if (!util.stackTimerFinished()) util.yield();
      util.thread.stopThisScript();
    }

    isReceived(args, util) {
      const blockID = this._thisBlockID(util);
      const broadcastName = Cast.toString(args.BROADCAST_OPTION).toUpperCase();

      const receiveCache = receivedMsgs.get(broadcastName);
      if (receiveCache !== undefined) {
        let receivedBlocks = receiveCache.get(util.thread);
        if (receivedBlocks === undefined) {
          receivedBlocks = new Set();
          receiveCache.set(util.thread, receivedBlocks);
        }
        if (!receivedBlocks.has(blockID)) {
          receivedBlocks.add(blockID);
          return true;
        }
      }

      return false;
    }

    isWaiting(args) {
      const broadcastName = Cast.toString(args.BROADCAST_OPTION).toUpperCase();

      let waiting = false;
      for (const thread of runtime.threads) {
        if (thread[kMessageName] === broadcastName) {
          waiting = true;
          break;
        }
      }

      return waiting;
    }

    receivers(args) {
      const broadcast = Cast.toString(args.BROADCAST_OPTION);
      const targets = this._getMessageHats(broadcast, "targets");
      for (let i = 0; i < targets.length; i++) {
        const name = targets[i].getName();
        targets[i] = targets[i].isOriginal ? name : `${name} (clone)`;
      }

      return JSON.stringify(targets);
    }

    toggleRestart(args) {
      const msg = Cast.toString(args.BROADCAST_OPTION).toUpperCase();

      if (args.TOGGLE === "off") noRestartMsgs.add(msg);
      else if (args.TOGGLE === "on") noRestartMsgs.delete(msg);
    }

    toggleOverlap(args) {
      const msg = Cast.toString(args.BROADCAST_OPTION).toUpperCase();

      if (args.TOGGLE === "on") overlappedMsgs.add(msg);
      else if (args.TOGGLE === "off") overlappedMsgs.delete(msg);
    }

    toggleMultiResponse(args) {
      const msg = Cast.toString(args.BROADCAST_OPTION);

      if (args.TOGGLE === "on") multiResponseMsgs.add(msg);
      else if (args.TOGGLE === "off") multiResponseMsgs.delete(msg);
    }

    whenReceived(args, util) {
      const messageName = util.thread[kMessageName];
      const inputName = Cast.toString(args.BROADCAST_OPTION).toUpperCase();

      if (messageName) return inputName === messageName;
      return false;
    }
  }

  Scratch.extensions.register(new SPmessagePlus());
})(Scratch);
