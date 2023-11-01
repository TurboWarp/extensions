// Name: WebSocket
// ID: gsaWebsocket
// Description: Manually connect to WebSocket servers.
// By: RedMan13 <https://scratch.mit.edu/users/RedMan13/>

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("can not load outside unsandboxed mode");
  }

  const blobToDataURL = (blob) => new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = () => reject(new Error(`Failed to read as data URL: ${fr.error}`));
    fr.readAsDataURL(blob);
  });

  /* ------- BLOCKS -------- */
  const { BlockType, Cast, ArgumentType } = Scratch;
  const vm = Scratch.vm;
  const runtime = vm.runtime;

  class WebSocketExtension {
    /**
     * no need to install runtime as it comes with Scratch var
     */
    constructor() {
      this.instances = {};
    }
    getInfo() {
      return {
        id: "gsaWebsocket",
        name: "WebSocket",
        color1: "#307eff",
        color2: "#2c5eb0",
        blocks: [
          {
            opcode: "newInstance",
            blockType: BlockType.COMMAND,
            arguments: {
              URL: {
                type: ArgumentType.STRING,
                defaultValue: "wss://echoserver.redman13.repl.co",
              },
            },
            text: "connect to [URL]",
          },
          "---",
          {
            opcode: "onError",
            blockType: BlockType.EVENT,
            isEdgeActivated: false,
            text: "when connection errors",
          },
          {
            opcode: "hasErrored",
            blockType: BlockType.BOOLEAN,
            text: "has connection errored?",
          },
          "---",
          {
            opcode: "onOpen",
            blockType: BlockType.EVENT,
            isEdgeActivated: false,
            text: "when connection connects",
          },
          {
            opcode: "isConnected",
            blockType: BlockType.BOOLEAN,
            text: "is connection connected?",
          },
          "---",
          {
            opcode: "handleQueue",
            blockType: BlockType.EVENT,
            isEdgeActivated: false,
            text: "when queue is flushed",
          },
          {
            opcode: "queueLength",
            blockType: BlockType.REPORTER,
            text: "length of the queue",
          },
          {
            opcode: "readQueue",
            blockType: BlockType.REPORTER,
            text: "queue item [INDEX]",
            arguments: {
              INDEX: {
                type: ArgumentType.NUMBER,
                defaultValue: "1",
              },
            },
          },
          {
            opcode: "deleteQueue",
            blockType: BlockType.COMMAND,
            text: "pop queue item to data",
          },
          {
            opcode: "clearQueue",
            blockType: BlockType.COMMAND,
            text: "clear all data from queue",
          },
          "---",
          {
            opcode: "onMessage",
            blockType: BlockType.EVENT,
            isEdgeActivated: false,
            text: "when message recieved",
          },
          {
            opcode: "messageReceived",
            blockType: BlockType.BOOLEAN,
            text: "recieved message?",
          },
          {
            opcode: "messageData",
            blockType: BlockType.REPORTER,
            text: "recieved message data",
          },
          {
            opcode: "sendMessage",
            blockType: BlockType.COMMAND,
            arguments: {
              PAYLOAD: {
                type: ArgumentType.STRING,
                defaultValue: "hello!",
              },
            },
            text: "send message [PAYLOAD]",
          },
          "---",
          {
            opcode: "onClose",
            blockType: BlockType.EVENT,
            isEdgeActivated: false,
            text: "when connection closes",
          },
          {
            opcode: "isClosed",
            blockType: BlockType.BOOLEAN,
            text: "is connection closed?",
          },
          {
            opcode: "closeCode",
            blockType: BlockType.REPORTER,
            text: "closing code",
          },
          {
            opcode: "closeMessage",
            blockType: BlockType.REPORTER,
            text: "closing message",
          },
          {
            opcode: "closeWithoutReason",
            blockType: BlockType.COMMAND,
            text: "close connection without reason",
          },
          {
            opcode: "closeWithCode",
            blockType: BlockType.COMMAND,
            arguments: {
              CODE: {
                type: ArgumentType.NUMBER,
                defaultValue: "1000",
              },
            },
            text: "close connection with code [CODE]",
          },
          {
            opcode: "closeWithReason",
            blockType: BlockType.COMMAND,
            arguments: {
              CODE: {
                type: ArgumentType.NUMBER,
                defaultValue: "1000",
              },
              REASON: {
                type: ArgumentType.STRING,
                defaultValue: "connection fulfilled",
              },
            },
            text: "close connection with reason [REASON] and code [CODE]",
          },
        ],
      };
    }
    newInstance(args, utils) {
      // dont you dare remove this
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        let resolved = false;
        let url = Cast.toString(args.URL);
        if (!/^(ws|wss):/is.test(url)) {
          // url doesnt start with a valid connection type
          // so we jsut assume its formated without it
          if (/^(?!(ws|http)s?:\/\/).*$/is.test(url)) {
            url = `wss://${url}`;
          } else if (/^(http|https):/is.test(url)) {
            const urlParts = url.split(":");
            urlParts[0] = url.toLowerCase().startsWith("https") ? "wss" : "ws";
            url = urlParts.join(":");
          } else {
            // we couldnt fix the url...
            resolve();
            return;
          }
        }
        if (!(await Scratch.canFetch(url))) return;

        try {
          const target = utils.target;
          // canFetch() checked above
          // eslint-disable-next-line no-restricted-syntax
          const websocket = new WebSocket(url);
          const instance = {
            closeMessage: "",
            closeCode: "",
            data: "",
            isOpen: false,
            isClosed: false,
            isErrored: false,
            isMessage: false,
            set gottenMessage(bool) {
              this.isMessage = bool;
            },
            get gottenMessage() {
              const oldState = this.isMessage;
              this.isMessage = false;
              return oldState;
            },
            state: "opening",
            websocket,
            messageThreads: [],
            messageQueue: [],
          };
          websocket.binaryType = "blob";
          websocket.onopen = (e) => {
            instance.state = "opened";
            instance.isOpen = true;
            runtime.startHats("gsaWebsocket_onOpen", null, target);
            if (!resolved) resolve();
          };
          websocket.onclose = (e) => {
            instance.state = "closed";
            instance.isClosed = true;
            instance.isOpen = false;
            instance.closeMessage = e.reason || "";
            instance.closeCode = Cast.toString(e.code) || "";
            runtime.startHats("gsaWebsocket_onClose", null, target);
            if (!resolved) resolve();
          };
          websocket.onerror = (e) => {
            instance.state = "errored";
            instance.isErrored = true;
            instance.isOpen = false;
            runtime.startHats("gsaWebsocket_onError", null, target);
            if (!resolved) resolve();
          };
          websocket.onmessage = async (e) => {
            let data = e.data;
            // convert binnary data to a data uri
            if (typeof data !== "string") {
              data = await blobToDataURL(data);
            }
            const stillWaiting = instance.messageThreads.every((thread) =>
              runtime.isActiveThread(thread)
            );
            // if we are still waiting on the message hats then push the message to queue
            if (stillWaiting && instance.messageThreads.length) {
              instance.messageQueue.push(data);
              return;
            }
            if (instance.messageQueue.length > 0) {
              // queue must be handled by the user as we dont know how the user wants to handle the queue
              runtime.startHats("gsaWebsocket_handleQueue", null, target);
            } else {
              instance.data = data;
              instance.gottenMessage = true;
              const threads = runtime.startHats(
                "gsaWebsocket_onMessage",
                null,
                target
              );
              instance.messageThreads = threads;
            }
          };
          this.instances[utils.target.id] = instance;
        } catch (err) {
          console.warn("couldnt create websocket instance because", err);
        }
      });
    }
    queueLength(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return "0";
      return instance.messageQueue.length;
    }
    readQueue(args, utils) {
      const idx = Cast.toNumber(args.INDEX);
      const instance = this.instances[utils.target.id];
      if (!instance) return "";
      const data = instance.messageQueue[idx - 1];
      if (typeof data === "undefined") return "";
      return data;
    }
    deleteQueue(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return "";
      const data = instance.messageQueue.pop();
      instance.data = data;
      instance.gottenMessage = true;
    }
    clearQueue(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return "";
      instance.messageQueue = [];
    }
    isConnected(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return "";
      return instance.isOpen;
    }
    messageReceived(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return "";
      const ret = instance.gottenMessage;
      instance.gottenMessage = false;
      return ret;
    }
    messageData(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return "";
      return instance.data;
    }
    isClosed(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return "";
      return instance.isClosed;
    }
    closeCode(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return "";
      return instance.closeCode;
    }
    closeMessage(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return "";
      return instance.closeMessage;
    }
    hasErrored(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return "";
      return instance.isErrored;
    }
    sendMessage(args, utils) {
      const PAYLOAD = Cast.toString(args.PAYLOAD);

      const instance = this.instances[utils.target.id];
      // if the instance isnt ready it will throw an error if we try to send to it
      // same if its closed
      if (!instance || !instance.isOpen || instance.isClosed) return "";
      instance.websocket.send(PAYLOAD);
    }
    closeWithoutReason(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return "";
      instance.websocket.close();
    }
    closeWithCode(args, utils) {
      const CODE = Cast.toString(args.CODE);

      const instance = this.instances[utils.target.id];
      if (!instance) return "";
      instance.websocket.close(CODE);
    }
    closeWithReason(args, utils) {
      const CODE = Cast.toString(args.CODE);
      const REASON = Cast.toString(args.REASON);

      const instance = this.instances[utils.target.id];
      if (!instance) return "";
      instance.websocket.close(CODE, REASON);
    }
  }

  // @ts-ignore
  Scratch.extensions.register(new WebSocketExtension());
})(Scratch);
