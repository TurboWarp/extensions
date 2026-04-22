// Name: SmartTEAM Live
// ID: smartteamlive
// Description: Read real-time AI signals from a SmartTEAM WebSocket room (currently gestures).
// By: marianobat <https://scratch.mit.edu/users/marianobat/>
// License: MPL-2.0
// Manual testing:
// https://turbowarp.org/editor?extension=http://localhost:8000/marianobat/live.js&room=ST-XXXX&wsBase=wss://smartteam-gesture-bridge.marianobat.workers.dev/ws

(function (Scratch) {
  "use strict";

  if (!Scratch) return;

  const DEFAULT_WS_BASE =
    "wss://smartteam-gesture-bridge.marianobat.workers.dev/ws";

  // Backoff sequence (ms). Cap is handled by last value.
  const BACKOFF_MS = [1000, 2000, 3000, 5000];

  /**
   * Read a querystring param from current page.
   * TurboWarp editor runs in a browser page with window.location.search.
   */
  function getQueryParam(name) {
    try {
      const params = new URLSearchParams(window.location.search || "");
      const v = params.get(name);
      return v == null ? "" : String(v);
    } catch (e) {
      return "";
    }
  }

  /**
   * Validate wsBase override:
   * Only allow ws:// or wss://. If invalid, return default.
   */
  function normalizeWsBase(maybeWsBase) {
    const raw = (maybeWsBase || "").trim();
    if (!raw) return DEFAULT_WS_BASE;
    try {
      const u = new URL(raw);
      if (u.protocol === "ws:" || u.protocol === "wss:") return raw;
      return DEFAULT_WS_BASE;
    } catch (e) {
      return DEFAULT_WS_BASE;
    }
  }

  /**
   * Normalize room string:
   * - Trim
   * - Keep as-is otherwise (backend expects ST-XXXXXXX style)
   */
  function normalizeRoom(room) {
    return String(room || "").trim();
  }

  /**
   * Safe parse JSON. Returns null on failure.
   */
  function safeJsonParse(text) {
    try {
      return JSON.parse(text);
    } catch (e) {
      return null;
    }
  }

  /**
   * Coerce confidence to a finite number.
   */
  function toFiniteNumber(x, fallback) {
    const n = Number(x);
    return Number.isFinite(n) ? n : fallback;
  }

  /**
   * Round to 2 decimals for reporting.
   */
  function round2(n) {
    // Avoid showing -0
    const r = Math.round(n * 100) / 100;
    return Object.is(r, -0) ? 0 : r;
  }

  class SmartteamGesturesExtension {
    constructor() {
      // Internal state
      this._connected = false;
      this._room = "";
      this._wsBase = normalizeWsBase(getQueryParam("wsBase"));
      this._gesture = "";
      this._confidence = 0;
      this._subscribers = 0;

      // WebSocket + reconnect handling
      this._ws = null;
      this._shouldReconnect = false;
      this._reconnectTimer = null;
      this._backoffIndex = 0;

      // Auto-connect from URL (?room=ST-...)
      const urlRoom = normalizeRoom(getQueryParam("room"));
      if (urlRoom) {
        this.setRoomInternal(urlRoom, /*auto*/ true);
      } else {
        // Protection: if room empty, do not connect.
        this._connected = false;
      }
    }

    getInfo() {
      return {
        id: "smartteamlive",
        name: Scratch.translate("SmartTEAM Live"),
        blocks: [
          {
            opcode: "getRoom",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("room"),
          },
          {
            opcode: "isConnected",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("connected?"),
          },
          {
            opcode: "getGesture",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("gesture"),
          },
          {
            opcode: "getConfidence",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("confidence"),
          },
          {
            opcode: "getSubscribers",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("subscribers"),
          },
          "---",
          {
            opcode: "setRoom",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set room to [ROOM]"),
            arguments: {
              ROOM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("ST-XXXXXXX"),
              },
            },
          },
          {
            opcode: "reconnect",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("reconnect"),
          },
          {
            opcode: "disconnect",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("disconnect"),
          },
        ],
      };
    }

    // --- Reporters/Booleans ---

    getRoom() {
      return this._room;
    }

    isConnected() {
      return !!this._connected;
    }

    getGesture() {
      return this._gesture || "";
    }

    getConfidence() {
      return round2(toFiniteNumber(this._confidence, 0));
    }

    getSubscribers() {
      return toFiniteNumber(this._subscribers, 0);
    }

    // --- Commands ---

    setRoom(args) {
      const room = normalizeRoom(args.ROOM);
      this.setRoomInternal(room, /*auto*/ false);
    }

    reconnect() {
      // Explicit reconnect: close existing and attempt again using current room.
      if (!this._room) {
        this._connected = false;
        return;
      }
      this._backoffIndex = 0;
      this._shouldReconnect = true;
      this._clearReconnectTimer();
      this._closeWs("manual reconnect");
      this._openWs();
    }

    disconnect() {
      // Explicit disconnect: stop reconnecting and close socket.
      this._shouldReconnect = false;
      this._clearReconnectTimer();
      this._closeWs("manual disconnect");
      this._connected = false;
    }

    // --- Internal logic ---

    setRoomInternal(room, auto) {
      // Protection: if empty, do not connect.
      if (!room) {
        this._room = "";
        this._connected = false;

        // If user sets room empty manually, treat as disconnect.
        if (!auto) {
          this._shouldReconnect = false;
          this._clearReconnectTimer();
          this._closeWs("room cleared");
        }
        return;
      }

      // If unchanged, do nothing.
      if (room === this._room && this._ws) return;

      this._room = room;

      // Reset gesture values when room changes (avoid misleading stale data).
      this._gesture = "";
      this._confidence = 0;
      this._subscribers = 0;

      // (Re)connect
      this._backoffIndex = 0;
      this._shouldReconnect = true;
      this._clearReconnectTimer();
      this._closeWs("room changed");
      this._openWs();
    }

    _buildWsUrl() {
      // wsBase is expected to be like wss://.../ws
      const base = this._wsBase || DEFAULT_WS_BASE;

      // Build URL with ?room=... (no token, subscriber read-only)
      const u = new URL(base);
      u.searchParams.set("room", this._room);
      return u.toString();
    }

    _openWs() {
      void this._openWsAsync();
    }

    async _openWsAsync() {
      if (!this._room) {
        this._connected = false;
        return;
      }

      // Only allow reconnect attempts if explicitly enabled.
      if (!this._shouldReconnect) {
        this._connected = false;
        return;
      }

      let wsUrl = "";
      try {
        wsUrl = this._buildWsUrl();
      } catch (e) {
        // If URL building fails, fall back to default base and retry once.
        this._wsBase = DEFAULT_WS_BASE;
        try {
          wsUrl = this._buildWsUrl();
        } catch (e2) {
          this._connected = false;
          this._scheduleReconnect();
          return;
        }
      }

      let allowed = false;
      try {
        allowed = await Scratch.canFetch(wsUrl);
      } catch (e) {
        this._connected = false;
        this._scheduleReconnect();
        return;
      }

      if (!allowed) {
        this._connected = false;
        this._scheduleReconnect();
        return;
      }

      try {
        // eslint-disable-next-line extension/check-can-fetch
        const ws = new WebSocket(wsUrl);
        this._ws = ws;

        ws.onopen = () => {
          this._connected = true;
          this._backoffIndex = 0; // reset backoff after successful open
        };

        ws.onmessage = (evt) => {
          // Parse and update internal state
          const msg = safeJsonParse(evt.data);
          if (!msg || typeof msg !== "object") return;

          // Ignore everything except gesture & presence
          if (msg.type === "gesture") {
            // Accept missing fields (room/seq/ts). Normalize what we use.
            const label = typeof msg.label === "string" ? msg.label : "";
            const conf = toFiniteNumber(msg.confidence, 0);

            this._gesture = label;
            this._confidence = conf;
          } else if (msg.type === "presence") {
            const subs = toFiniteNumber(msg.subscribers, this._subscribers);
            this._subscribers = subs;
          }
        };

        ws.onerror = () => {
          // Some browsers also call onclose; we handle robustly there.
          this._connected = false;
        };

        ws.onclose = () => {
          this._connected = false;
          this._ws = null;
          this._scheduleReconnect();
        };
      } catch (e) {
        this._connected = false;
        this._ws = null;
        this._scheduleReconnect();
      }
    }

    _closeWs(reason) {
      // Close without triggering reconnect logic beyond existing schedule,
      // but onclose handler will still run; we guard with _shouldReconnect.
      const ws = this._ws;
      this._ws = null;

      if (ws) {
        try {
          ws.onopen = null;
          ws.onmessage = null;
          ws.onerror = null;
          ws.onclose = null;
          ws.close(1000, reason || "close");
        } catch (e) {
          // ignore
        }
      }
    }

    _scheduleReconnect() {
      if (!this._shouldReconnect) return;
      if (!this._room) return;

      // If already scheduled, don't schedule another.
      if (this._reconnectTimer) return;

      const idx = Math.min(this._backoffIndex, BACKOFF_MS.length - 1);
      const delay = BACKOFF_MS[idx];

      // Increase backoff for next time (capped).
      this._backoffIndex = Math.min(
        this._backoffIndex + 1,
        BACKOFF_MS.length - 1
      );

      this._reconnectTimer = setTimeout(() => {
        this._reconnectTimer = null;
        // If a socket appeared in the meantime or reconnect disabled, skip.
        if (this._ws) return;
        if (!this._shouldReconnect) return;
        if (!this._room) return;
        this._openWs();
      }, delay);
    }

    _clearReconnectTimer() {
      if (this._reconnectTimer) {
        try {
          clearTimeout(this._reconnectTimer);
        } catch (e) {
          // ignore
        }
        this._reconnectTimer = null;
      }
    }
  }

  Scratch.extensions.register(new SmartteamGesturesExtension());
})(Scratch);
