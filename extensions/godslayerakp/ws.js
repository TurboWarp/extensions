// Name: WebSocket
// ID: gsaWebsocket
// Description: an extension for connecting to websocket servers like discord and cloudlink.
// By: RedMan13 <https://scratch.mit.edu/users/RedMan13/>

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("can not load outside unsandboxed mode");
  }
  // copied from https://stackoverflow.com/a/30407959
  const blobToDataURL = (blob) =>
    new Promise((resolve, reject) => {
      var a = new FileReader();
      a.onload = function (e) {
        resolve(e.target.result);
      };
      a.onerror = reject;
      a.readAsDataURL(blob);
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
            opcode: "handleCache",
            blockType: BlockType.EVENT,
            isEdgeActivated: false,
            text: "when cache is flushed",
          },
          {
            opcode: "cacheLength",
            blockType: BlockType.REPORTER,
            text: "length of the cache",
          },
          {
            opcode: "readCache",
            blockType: BlockType.REPORTER,
            text: "cache item [INDEX]",
            arguments: {
              INDEX: {
                type: ArgumentType.NUMBER,
                defaultValue: "1",
              },
            },
          },
          {
            opcode: "deleteCache",
            blockType: BlockType.COMMAND,
            text: "pop cache item to data",
          },
          {
            opcode: "clearCache",
            blockType: BlockType.COMMAND,
            text: "clear all data from cache",
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
            url = url.split(":")
            url[0] = url.startsWith("https")
              ? "wss"
              : "ws"
            url = url.join(":")
          } else {
            // we couldnt fix the url...
            resolve();
            return;
          }
        }
        if (!(await Scratch.canFetch(url))) return;

        try {
          const target = utils.target;
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
            messageCache: [],
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
            // if we are still waiting on the message hats then push the message to cache
            if (stillWaiting && instance.messageThreads.length) {
              instance.messageCache.push(data);
              return;
            }
            if (instance.messageCache.length > 0) {
              // cache must be handled by the user as we dont know how the user wants to handle the cache
              runtime.startHats("gsaWebsocket_handleCache", null, target);
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
    cacheLength(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return "0";
      return instance.messageCache.length;
    }
    readCache(args, utils) {
      const idx = Cast.toNumber(args.INDEX);
      const instance = this.instances[utils.target.id];
      if (!instance) return "";
      const data = instance.messageCache[idx - 1];
      if (typeof data === "undefined") return "";
      return data;
    }
    deleteCache(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return "";
      const data = instance.messageCache.pop();
      instance.data = data;
      instance.gottenMessage = true;
    }
    clearCache(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return "";
      instance.messageCache = [];
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
