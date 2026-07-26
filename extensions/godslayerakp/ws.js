// Name: WebSocket
// ID: gsaWebsocket
// Description: Manually connect to WebSocket servers.
// By: RedMan13 <https://scratch.mit.edu/users/RedMan13/>
// License: MIT

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("can not load outside unsandboxed mode");
  }

  const blobToDataURL = (blob) =>
    new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = () =>
        reject(new Error(`Failed to read as data URL: ${fr.error}`));
      fr.readAsDataURL(blob);
    });

  /* ------- BLOCKS -------- */
  const { BlockType, Cast, ArgumentType } = Scratch;
  const vm = Scratch.vm;
  const runtime = vm.runtime;

  /**
   * @typedef WebSocketInfo
   * @property {boolean} destroyed
   * @property {boolean} errored
   * @property {string} closeMessage
   * @property {number} closeCode
   * @property {string} data
   * @property {string[]} messageQueue
   * @property {WebSocket|null} websocket
   * @property {VM.Thread[]} connectThreads
   * @property {boolean} messageThreadsRunning
   * @property {VM.Thread[]} messageThreads
   * @property {object[]} sendOnceConnected
   */

  /**
   * @param {unknown} exitCode
   * @return {number} a valid code that won't throw an error in WebSocket#close()
   */
  const toCloseCode = (exitCode) => {
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
  const toCloseReason = (reason) => {
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

    return "";
  };

  class WebSocketExtension {
    /**
     * no need to install runtime as it comes with Scratch var
     */
    constructor() {
      /** @type {Record<string, WebSocketInfo>} */
      this.instances = {};

      runtime.on("targetWasRemoved", (target) => {
        const instance = this.instances[target.id];
        if (instance) {
          instance.destroyed = true;
          if (instance.websocket) {
            instance.websocket.close();
          }
          delete this.instances[target.id];
        }
      });
    }
    getInfo() {
      return {
        id: "gsaWebsocket",
        // eslint-disable-next-line extension/should-translate
        name: "WebSocket",
        docsURI: "https://extensions.turbowarp.org/godslayerakp/ws",
        color1: "#307eff",
        color2: "#2c5eb0",
        blocks: [
          {
            opcode: "newInstance",
            blockType: BlockType.COMMAND,
            arguments: {
              URL: {
                type: ArgumentType.STRING,
                defaultValue: "wss://echo.websocket.org/",
              },
            },
            text: Scratch.translate("connect to [URL]"),
          },
          "---",
          {
            opcode: "onOpen",
            blockType: BlockType.EVENT,
            isEdgeActivated: false,
            shouldRestartExistingThreads: true,
            text: Scratch.translate("when connected"),
          },
          {
            opcode: "isConnected",
            blockType: BlockType.BOOLEAN,
            text: Scratch.translate("is connected?"),
            disableMonitor: true,
          },
          "---",
          {
            opcode: "onMessage",
            blockType: BlockType.EVENT,
            isEdgeActivated: false,
            shouldRestartExistingThreads: true,
            text: Scratch.translate("when message received"),
          },
          {
            opcode: "messageData",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("received message data"),
            disableMonitor: true,
          },
          "---",
          {
            opcode: "sendMessage",
            blockType: BlockType.COMMAND,
            arguments: {
              PAYLOAD: {
                type: ArgumentType.STRING,
                defaultValue: "Hello!",
              },
            },
            text: Scratch.translate("send message [PAYLOAD]"),
          },
          "---",
          {
            opcode: "onError",
            blockType: BlockType.EVENT,
            isEdgeActivated: false,
            shouldRestartExistingThreads: true,
            text: Scratch.translate("when connection errors"),
          },
          {
            opcode: "hasErrored",
            blockType: BlockType.BOOLEAN,
            text: Scratch.translate("connection errored?"),
            disableMonitor: true,
          },
          "---",
          {
            opcode: "onClose",
            blockType: BlockType.EVENT,
            isEdgeActivated: false,
            shouldRestartExistingThreads: true,
            text: Scratch.translate("when connection closes"),
          },
          {
            opcode: "isClosed",
            blockType: BlockType.BOOLEAN,
            text: Scratch.translate("is connection closed?"),
            disableMonitor: true,
          },
          {
            opcode: "closeCode",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("closing code"),
            disableMonitor: true,
          },
          {
            opcode: "closeMessage",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("closing message"),
            disableMonitor: true,
          },
          {
            opcode: "closeWithoutReason",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("close connection"),
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
            text: Scratch.translate("close connection with code [CODE]"),
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
                defaultValue: "fulfilled",
              },
            },
            text: Scratch.translate(
              "close connection with reason [REASON] and code [CODE]"
            ),
          },
        ],
      };
    }

    newInstance(args, util) {
      const target = util.target;

      let url = Cast.toString(args.URL);
      if (!/^(ws|wss):/is.test(url)) {
        // url doesnt start with a valid connection type
        // so we just assume its formated without it
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

      const oldInstance = this.instances[util.target.id];
      if (oldInstance) {
        oldInstance.destroyed = true;
        if (oldInstance.websocket) {
          oldInstance.websocket.close();
        }
      }

      /** @type {WebSocketInfo} */
      const instance = {
        destroyed: false,
        errored: false,
        closeMessage: "",
        closeCode: 0,
        data: "",
        websocket: null,
        messageThreadsRunning: false,
        connectThreads: [],
        messageThreads: [],
        messageQueue: [],
        sendOnceConnected: [],
      };
      this.instances[util.target.id] = instance;

      return Scratch.canFetch(url)
        .then(
          (allowed) =>
            new Promise((resolve) => {
              if (!allowed) {
                throw new Error("Not allowed");
              }

              if (instance.destroyed) {
                resolve();
                return;
              }

              // canFetch() checked above
              // eslint-disable-next-line extension/check-can-fetch
              const websocket = new WebSocket(url);
              instance.websocket = websocket;

              const beforeExecute = () => {
                if (instance.messageThreadsRunning) {
                  const stillRunning = instance.messageThreads.some((i) =>
                    runtime.isActiveThread(i)
                  );
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

              const onStopAll = () => {
                instance.destroyed = true;
                websocket.close();
              };

              vm.runtime.on("BEFORE_EXECUTE", beforeExecute);
              vm.runtime.on("PROJECT_STOP_ALL", onStopAll);

              const cleanup = () => {
                vm.runtime.off("BEFORE_EXECUTE", beforeExecute);
                vm.runtime.off("PROJECT_STOP_ALL", onStopAll);

                for (const thread of instance.connectThreads) {
                  thread.status = 4; // STATUS_DONE
                }

                resolve();
              };

              websocket.onopen = (e) => {
                if (instance.destroyed) {
                  cleanup();
                  websocket.close();
                  return;
                }

                for (const item of instance.sendOnceConnected) {
                  websocket.send(item);
                }
                instance.sendOnceConnected.length = 0;

                instance.connectThreads = runtime.startHats(
                  "gsaWebsocket_onOpen",
                  null,
                  target
                );
                resolve();
              };

              websocket.onclose = (e) => {
                if (!instance.errored) {
                  instance.closeMessage = e.reason || "";
                  instance.closeCode = e.code;
                  cleanup();

                  if (!instance.destroyed) {
                    runtime.startHats("gsaWebsocket_onClose", null, target);
                  }
                }
              };

              websocket.onerror = (e) => {
                console.error("websocket error", e);
                instance.errored = true;
                cleanup();

                if (!instance.destroyed) {
                  runtime.startHats("gsaWebsocket_onError", null, target);
                }
              };

              websocket.onmessage = async (e) => {
                if (instance.destroyed) {
                  return;
                }

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
            })
        )
        .catch((error) => {
          console.error("could not open websocket connection", error);

          instance.errored = true;
          if (!instance.destroyed) {
            runtime.startHats("gsaWebsocket_onError", null, target);
          }
        });
    }

    isConnected(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return false;
      return (
        !!instance.websocket && instance.websocket.readyState === WebSocket.OPEN
      );
    }

    messageData(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return "";
      return instance.data;
    }

    isClosed(_, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return false;
      return instance.closeCode !== 0;
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

      if (
        !instance.websocket ||
        instance.websocket.readyState === WebSocket.CONNECTING
      ) {
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
      instance.destroyed = true;
      if (instance.websocket) {
        instance.websocket.close();
      }
    }

    closeWithCode(args, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return;
      instance.destroyed = true;
      if (instance.websocket) {
        instance.websocket.close(toCloseCode(args.CODE));
      }
    }

    closeWithReason(args, utils) {
      const instance = this.instances[utils.target.id];
      if (!instance) return;
      instance.destroyed = true;
      if (instance.websocket) {
        instance.websocket.close(
          toCloseCode(args.CODE),
          toCloseReason(args.REASON)
        );
      }
    }
  }

  // @ts-ignore
  Scratch.extensions.register(new WebSocketExtension());
})(Scratch);
