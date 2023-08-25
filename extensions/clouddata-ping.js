// Name: Ping Cloud Data
// ID: clouddataping
// Description: Determine whether a cloud variable server is probably up.
// Original: TheShovel

(function (Scratch) {
  "use strict";

  /**
   * @typedef CacheEntry
   * @property {number} expires
   * @property {boolean} value
   */

  /** @type {Map<string, Promise<CacheEntry>>} */
  const computing = new Map();
  /** @type {Map<string, CacheEntry>} */
  const computed = new Map();

  /**
   * @param {string} uri
   * @returns {Promise<CacheEntry>}
   */
  const pingWebSocket = async (uri) => {
    if (!(await Scratch.canFetch(uri))) {
      return {
        expires: 0,
        value: false,
      };
    }

    /** @type {WebSocket} */
    let ws;
    try {
      // Permission is checked earlier.
      // eslint-disable-next-line no-restricted-syntax
      ws = new WebSocket(uri);
    } catch (e) {
      return {
        expires: 0,
        value: false,
      };
    }

    let timeoutId;
    const isUp = await new Promise((resolve) => {
      ws.onopen = () => {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      };
      ws.onclose = () => {
        resolve(false);
      };
      ws.onerror = () => {
        resolve(false);
      };
      timeoutId = setTimeout(() => {
        ws.close();
      }, 5000);
    });

    ws.close();
    clearTimeout(timeoutId);

    return {
      expires: Date.now() + 60000,
      value: isUp,
    };
  };

  /**
   * @param {string} uri
   * @returns {boolean|Promise<boolean>}
   */
  const cachedPingWebSocket = (uri) => {
    const computingEntry = computing.get(uri);
    if (computingEntry) {
      return computingEntry.then((entry) => entry.value);
    }

    const computedEntry = computed.get(uri);
    if (computedEntry && Date.now() < computedEntry.expires) {
      return computedEntry.value;
    }

    const promise = pingWebSocket(uri);
    computing.set(uri, promise);
    return promise.then((entry) => {
      computing.delete(uri);
      computed.set(uri, entry);
      return entry.value;
    });
  };

  class PingUtil {
    getInfo() {
      return {
        id: "clouddataping",
        name: "Ping Cloud Data",
        blocks: [
          {
            opcode: "ping",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is cloud data server [SERVER] up?",
            arguments: {
              SERVER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "wss://clouddata.turbowarp.org",
              },
            },
          },
        ],
      };
    }

    ping({ SERVER }) {
      return cachedPingWebSocket(SERVER);
    }
  }

  Scratch.extensions.register(new PingUtil());
})(Scratch);
