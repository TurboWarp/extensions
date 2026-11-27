// Name: Ping Cloud Data
// ID: clouddataping
// Description: Determine whether a cloud variable server is probably up.
// By: GarboMuffin
// Original: TheShovel
// License: MIT AND MPL-2.0

(function (Scratch: typeof globalThis.Scratch) {
  "use strict";

  interface CacheEntry {
    expires: number;
    value: boolean;
  }

  const computing = new Map<string, Promise<CacheEntry>>();
  const computed = new Map<string, CacheEntry>();

  const pingWebSocket = async (uri: string): Promise<CacheEntry> => {
    if (!(await Scratch.canFetch(uri))) {
      return {
        expires: 0,
        value: false,
      };
    }

    let ws: WebSocket;
    try {
      // Permission is checked earlier.
      // eslint-disable-next-line extension/check-can-fetch
      ws = new WebSocket(uri);
    } catch (e) {
      return {
        expires: 0,
        value: false,
      };
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const isUp = await new Promise<boolean>((resolve) => {
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

  const cachedPingWebSocket = (uri: string): boolean | Promise<boolean> => {
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

  class PingUtil implements Scratch.Extension {
    getInfo(): Scratch.Info {
      return {
        id: "clouddataping",
        name: Scratch.translate("Ping Cloud Data"),
        blocks: [
          {
            opcode: "ping",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is cloud data server [SERVER] up?"),
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

    ping({ SERVER }: { SERVER: unknown }) {
      return cachedPingWebSocket(Scratch.Cast.toString(SERVER));
    }
  }

  Scratch.extensions.register(new PingUtil());
})(Scratch);
