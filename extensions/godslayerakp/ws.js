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

  /**
   * @typedef WebSocketInfo
   * @property {boolean} errored
   * @property {string} closeMessage
   * @property {number} closeCode
   * @property {string} data
   * @property {string[]} messageQueue
   * @property {WebSocket} websocket
   * @property {boolean} messageThreadsRunning
   * @property {VM.Thread[]} messageThreads
   * @property {object[]} sendOnceConnected
   */

  /**
   * @param {unknown} exitCode
   * @return {number} a valid code that won't throw an error in WebSocket#close()
   */
  const toCloseCode = exitCode => {
    const casted = Cast.toNumber(exitCode);
    // Only valid values are 1000 or the range 3000-4999
    if (casted === 1000 || (casted >= 3000 && casted <= 4999)) {
      return casted;
    }
    return 1000;
  };

  /**
   * @param {unknown} reason
   * @returns {string} a valid reason that won't throw an error in WebSocket#close()
   */
  const toCloseReason = reason => {
    const casted = Cast.toString(reason);

    // Reason can't be longer than 123 UTF-8 bytes
    // We can't just truncate by reason.length as that would not work for eg. emoji
    const encoder = new TextEncoder();
    let encoded = encoder.encode(casted);
    encoded = encoded.slice(0, 123);

    // Now we have another problem: If the 123 byte cut-off produced invalid UTF-8, we
    // need to keep cutting off bytes until it's valid.
    const decoder = new TextDecoder();
    while (encoded.byteLength > 0) {
      try {
        const decoded = decoder.decode(encoded);
        return decoded;
      } catch (e) {
        encoded = encoded.slice(0, encoded.byteLength - 1);
      }
    }

    return '';
  };

  class WebSocketExtension {
    /**
     * no need to install runtime as it comes with Scratch var
     */
    constructor() {
      /** @type {Record<string, WebSocketInfo>} */
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
            text: "is connected?",
          },
          "---",
          {
            opcode: "onMessage",
            blockType: BlockType.EVENT,
            isEdgeActivated: false,
            text: "when message received",
          },
          {
            opcode: "messageReceived",
            blockType: BlockType.BOOLEAN,
            text: "received message?",
          },
          {
            opcode: "messageData",
            blockType: BlockType.REPORTER,
            text: "received message data",
          },
          "---",
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

    newInstance(args, util) {
      const target = util.target;

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
          return;
        }
      }

      return Scratch.canFetch(url).then((allowed) => new Promise((resolve) => {
        if (!allowed) {
          resolve();
          return;
        }

        // TODO: close pre-existing instance

        // canFetch() checked above
        // eslint-disable-next-line no-restricted-syntax
        const websocket = new WebSocket(url);

        /** @type {WebSocketInfo} */
        const instance = {
          errored: false,
          closeMessage: "",
          closeCode: 0,
          data: "",
          websocket,
          messageThreadsRunning: false,
          messageThreads: [],
          messageQueue: [],
          sendOnceConnected: []
        };

        const beforeExecute = () => {
          if (instance.messageThreadsRunning) {
            const stillRunning = instance.messageThreads.some(i => runtime.isActiveThread(i));
            if (!stillRunning) {
              const isQueueEmpty = instance.messageQueue.length === 0;
              if (isQueueEmpty) {
                instance.messageThreadsRunning = false;
                instance.messageThreads = [];
              } else {
                instance.data = instance.messageQueue.shift();
                instance.messageThreads = runtime.startHats(
                  "gsaWebsocket_onMessage",
                  null,
                  target
                );
              }
            }
          }
        };
        vm.runtime.on('BEFORE_EXECUTE', beforeExecute);

        const cleanup = () => {
          vm.runtime.off('BEFORE_EXECUTE', beforeExecute);
          resolve();
        };

        websocket.onopen = (e) => {
          for (const item of instance.sendOnceConnected) {
            websocket.send(item);
          }
          instance.sendOnceConnected.length = 0;

          runtime.startHats("gsaWebsocket_onOpen", null, target);
          resolve();
        };

        websocket.onclose = (e) => {
          instance.closeMessage = e.reason || "";
          instance.closeCode = e.code;
          runtime.startHats("gsaWebsocket_onClose", null, target);
          cleanup();
        };

        websocket.onerror = (e) => {
          console.error('websocket error', e);
          instance.errored = true;
          runtime.startHats("gsaWebsocket_onError", null, target);
          cleanup();
        };

        websocket.onmessage = async (e) => {
          let data = e.data;

          // Convert binary messages to a data: uri
          // TODO: doing this right now might break order?
          if (data instanceof Blob) {
            data = await blobToDataURL(data);
          }

          if (instance.messageThreadsRunning) {
            instance.messageQueue.push(data);
          } else {
            instance.data = data;
            instance.messageThreads = runtime.startHats(
              "gsaWebsocket_onMessage",
              null,
              target
            );
            instance.messageThreadsRunning = true;
          }
        };

        this.instances[target.id] = instance;
      })).catch((error) => {
        console.error('could not open websocket connection', error);
      });
    }

    isConnected(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return false;
      return instance.websocket.readyState === WebSocket.OPEN;
    }

    messageReceived(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return false;
      return "TODO";
    }

    messageData(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return "";
      return instance.data;
    }

    isClosed(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return "";
      return instance.websocket.readyState === WebSocket.CLOSED;
    }

    closeCode(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return 0;
      return instance.closeCode;
    }

    closeMessage(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return "";
      return instance.closeMessage;
    }

    hasErrored(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return false;
      return instance.errored;
    }

    sendMessage(args, utils) {
      const PAYLOAD = Cast.toString(args.PAYLOAD);
      const instance = this.instances[utils.target.id];
      if (!instance) return;

      if (instance.websocket.readyState === WebSocket.CONNECTING) {
        // Trying to send now will throw an error. Send it once we get connected.
        instance.sendOnceConnected.push(PAYLOAD);
      } else {
        // CLOSING and CLOSED states won't throw an error, just silently ignore
        instance.websocket.send(PAYLOAD);
      }
    }

    closeWithoutReason(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return;
      instance.websocket.close();
    }

    closeWithCode(args, utils) {
      const CODE = toCloseCode(args.CODE);
      const instance = this.instances[utils.target.id];
      if (!instance) return;
      instance.websocket.close(CODE);
    }

    closeWithReason(args, utils) {
      const CODE = toCloseCode(args.CODE);
      const REASON = toCloseReason(args.REASON);

      const instance = this.instances[utils.target.id];
      if (!instance) return "";
      instance.websocket.close(CODE, REASON);
    }
  }

  // @ts-ignore
  Scratch.extensions.register(new WebSocketExtension());
})(Scratch);
