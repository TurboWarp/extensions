// Name: Tools+ Data
// ID: twtoolsplusdata
// Description: JSON, dictionary, and storage utilities for TurboWarp.
// By: fachu2012
// License: MPL-2.0

// TW Tools+ — v1.4.4
// Licensed under the Mozilla Public License 2.0
// https://www.mozilla.org/en-US/MPL/2.0/
//
// twtoolsplus-data.js — only Tools+ Data.
// Standalone pack: only Tools+ Data (twtoolsplusdata).
//
// UNSANDBOXED — enable "Run extension without sandbox".
// Reloading the same URL replaces the previous version (same extension id).

(function (Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('TW Tools+ must be run unsandboxed');
  }

  const MENU_ICON = 'data:image/png;base64,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';
  const BLOCK_ICON = 'data:image/png;base64,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';

  const toNumber = (v) => Number(v) || 0;
  const savedKeys = new Map();
  function storageKey(key) {
    return `twtoolsplus:${key}`;
  }
  function label(text) {
    return { blockType: Scratch.BlockType.LABEL, text: Scratch.translate(text) };
  }

  /** Remove a previously loaded extension with the same id so reloading updates it. */
  function unregisterIfExists(id) {
    try {
      const em = Scratch.vm && Scratch.vm.extensionManager;
      if (!em) return;
      if (em._loadedExtensions && em._loadedExtensions.has(id)) {
        em._loadedExtensions.delete(id);
      }
      // Drop block info cache if present (TurboWarp / scratch-vm internals)
      if (em.blockInfoMap && typeof em.blockInfoMap.delete === 'function') {
        em.blockInfoMap.delete(id);
      }
    } catch (e) { /* ignore */ }
  }

  class TWToolsPlusCore {
    constructor() {
      this.runtime = Scratch.vm.runtime;

      this._keysDownNow = new Set();
      this._keysPressedBuffer = new Set();
      this._keysPressedThisFrame = new Set();
      this._keysReleasedBuffer = new Set();
      this._keysReleasedThisFrame = new Set();
      this._lastKeyPressed = '';
      this._mouseButtonsDown = { left: false, middle: false, right: false };
      this._scrollDeltaAccum = 0;
      this._scrollDeltaThisFrame = 0;
      this._doubleClickBuffer = false;
      this._doubleClickThisFrame = false;

      this._cloneCounters = new Map();
      this._timers = new Map();
      this._camera = { x: 0, y: 0, zoom: 1 };

      this._tasks = new Map();
      this._debounceTimestamps = new Map();
      this._throttleTimestamps = new Map();

      // New state for ideas
      this._cooldowns = new Map(); // id -> readyAt ms
      this._stopwatches = new Map(); // id -> { start, pausedAt, accumulated }
      this._frameCounters = new Map(); // id -> count
      this._onceFlags = new Map(); // id -> used
      this._tweens = new Map(); // id -> { from, to, start, duration, easing }
      this._mousePrev = { x: 0, y: 0 };
      this._mouseDelta = { x: 0, y: 0 };
      this._bulletLifetimes = new Map(); // targetId -> frames left
      this._frameIndex = 0;

      this._setupInputListeners();
      this._setupFrameHook();
      this._setupCloneTracking();
    }

    _setupInputListeners() {
      const keyName = (event) => {
        const map = {
          ' ': 'space',
          ArrowUp: 'up arrow',
          ArrowDown: 'down arrow',
          ArrowLeft: 'left arrow',
          ArrowRight: 'right arrow'
        };
        return map[event.key] || event.key.toLowerCase();
      };

      document.addEventListener('keydown', (e) => {
        const key = keyName(e);
        if (!this._keysDownNow.has(key)) this._keysPressedBuffer.add(key);
        this._keysDownNow.add(key);
        this._lastKeyPressed = key;
      });

      document.addEventListener('keyup', (e) => {
        const key = keyName(e);
        this._keysDownNow.delete(key);
        this._keysReleasedBuffer.add(key);
      });

      const attachToCanvas = () => {
        const canvas = this.runtime.renderer && this.runtime.renderer.canvas;
        if (!canvas || canvas.__twToolsPlusBound) return;
        canvas.__twToolsPlusBound = true;
        const buttonName = (n) => (n === 0 ? 'left' : n === 1 ? 'middle' : 'right');
        canvas.addEventListener('mousedown', (e) => {
          this._mouseButtonsDown[buttonName(e.button)] = true;
          if (e.button === 2) e.preventDefault();
        });
        canvas.addEventListener('mouseup', (e) => {
          this._mouseButtonsDown[buttonName(e.button)] = false;
        });
        canvas.addEventListener('contextmenu', (e) => e.preventDefault());
        canvas.addEventListener('wheel', (e) => { this._scrollDeltaAccum += e.deltaY; });
        canvas.addEventListener('dblclick', () => { this._doubleClickBuffer = true; });
      };
      attachToCanvas();
      setTimeout(attachToCanvas, 500);
    }

    _setupFrameHook() {
      this.runtime.on('BEFORE_EXECUTE', () => {
        this._keysPressedThisFrame = this._keysPressedBuffer;
        this._keysPressedBuffer = new Set();
        this._keysReleasedThisFrame = this._keysReleasedBuffer;
        this._keysReleasedBuffer = new Set();
        this._doubleClickThisFrame = this._doubleClickBuffer;
        this._doubleClickBuffer = false;
        this._scrollDeltaThisFrame = this._scrollDeltaAccum;
        this._scrollDeltaAccum = 0;
        this._frameIndex++;

        // mouse delta
        try {
          const mx = this.runtime.ioDevices.mouse.getScratchX();
          const my = this.runtime.ioDevices.mouse.getScratchY();
          this._mouseDelta.x = mx - this._mousePrev.x;
          this._mouseDelta.y = my - this._mousePrev.y;
          this._mousePrev.x = mx;
          this._mousePrev.y = my;
        } catch (e) { /* ignore */ }
      });
    }

    _setupCloneTracking() {
      this.runtime.on('targetWasCreated', (newTarget, sourceTarget) => {
        if (!newTarget.isOriginal && sourceTarget) {
          const current = this._cloneCounters.get(sourceTarget) || 0;
          const next = current + 1;
          this._cloneCounters.set(sourceTarget, next);
          newTarget.__twToolsCloneNumber = next;
        }
      });
    }

    mathRound(args) {
      const factor = Math.pow(10, toNumber(args.DECIMALS));
      return Math.round(toNumber(args.N) * factor) / factor;
    }
    mathMap(args) {
      const t = (toNumber(args.VALUE) - toNumber(args.A)) / (toNumber(args.B) - toNumber(args.A) || 1);
      return toNumber(args.C) + t * (toNumber(args.D) - toNumber(args.C));
    }
    mathClamp(args) {
      return Math.min(Math.max(toNumber(args.VALUE), toNumber(args.MIN)), toNumber(args.MAX));
    }
    mathDistance(args) {
      const dx = toNumber(args.X2) - toNumber(args.X1);
      const dy = toNumber(args.Y2) - toNumber(args.Y1);
      return Math.sqrt(dx * dx + dy * dy);
    }
    mathIsEvenOdd(args) {
      const isEven = toNumber(args.N) % 2 === 0;
      return args.PARITY === 'even' ? isEven : !isEven;
    }
    mathGcdLcm(args) {
      const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
      const a = Math.abs(Math.round(toNumber(args.A)));
      const b = Math.abs(Math.round(toNumber(args.B)));
      const g = gcd(a, b);
      return args.MODE === 'GCD' ? g : (g === 0 ? 0 : Math.abs(a * b) / g);
    }
    mathRandomSeed(args) {
      let seed = toNumber(args.SEED) || 1;
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    mathIsBetween(args) {
      const n = toNumber(args.N);
      return n >= toNumber(args.MIN) && n <= toNumber(args.MAX);
    }
    mathAngleBetween(args) {
      const dx = toNumber(args.X2) - toNumber(args.X1);
      const dy = toNumber(args.Y2) - toNumber(args.Y1);
      return (Math.atan2(dy, dx) * 180) / Math.PI;
    }
    mathNumberToFormat(args) {
      const n = Math.round(toNumber(args.N));
      if (args.FORMAT === 'Roman numeral') return this._toRoman(n);
      return this._toWords(n);
    }
    _toRoman(num) {
      if (num <= 0 || num > 3999) return String(num);
      const table = [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
      let result = '', remaining = num;
      for (const [value, symbol] of table) {
        while (remaining >= value) { result += symbol; remaining -= value; }
      }
      return result;
    }
    _toWords(num) {
      const ones = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
      const tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
      const chunk = (n) => {
        if (n < 20) return ones[n];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? '-' + ones[n % 10] : '');
        return ones[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + chunk(n % 100) : '');
      };
      if (num === 0) return 'zero';
      const negative = num < 0;
      num = Math.abs(num);
      const scales = [[1e9,'billion'],[1e6,'million'],[1000,'thousand']];
      let words = '';
      for (const [value, name] of scales) {
        if (num >= value) { words += chunk(Math.floor(num / value)) + ' ' + name + ' '; num %= value; }
      }
      if (num > 0) words += chunk(num);
      return (negative ? 'negative ' : '') + words.trim();
    }
    mathLerp(args) {
      const t = toNumber(args.T);
      return toNumber(args.A) + (toNumber(args.B) - toNumber(args.A)) * t;
    }
    mathSign(args) {
      const n = toNumber(args.N);
      return n > 0 ? 1 : n < 0 ? -1 : 0;
    }
    mathPercentChance(args) {
      return Math.random() * 100 < toNumber(args.N);
    }
    mathPingPong(args) {
      const a = toNumber(args.A), b = toNumber(args.B);
      const len = Math.abs(b - a);
      if (len === 0) return a;
      let v = toNumber(args.VALUE) - a;
      const cycle = 2 * len;
      v = ((v % cycle) + cycle) % cycle;
      if (v > len) v = cycle - v;
      return a + v;
    }
    mathSmoothDamp(args) {
      const c = toNumber(args.CURRENT), t = toNumber(args.TARGET), s = Math.max(0, Math.min(1, toNumber(args.SPEED)));
      return c + (t - c) * s;
    }
    mathNoise1D(args) {
      const x = toNumber(args.X);
      let n = Math.sin(x * 12.9898 + toNumber(args.SEED) * 78.233) * 43758.5453;
      return n - Math.floor(n);
    }

    // ===== TEXT =====
    textCase(args) {
      const text = String(args.TEXT);
      if (args.CASE === 'UPPERCASE') return text.toUpperCase();
      if (args.CASE === 'lowercase') return text.toLowerCase();
      return text.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
    }
    textReplace(args) { return String(args.TEXT).split(String(args.FIND)).join(String(args.REPLACE)); }
    textContains(args) { return String(args.TEXT).includes(String(args.SUBSTRING)); }
    textSplit(args) { return JSON.stringify(String(args.TEXT).split(String(args.SEPARATOR))); }
    textJoinList(args) { return this._parseArray(args.LIST).join(args.SEPARATOR); }
    textTrim(args) { return String(args.TEXT).trim(); }
    textPad(args) {
      const text = String(args.TEXT), n = toNumber(args.N), ch = String(args.CHAR) || ' ';
      return args.SIDE === 'start' ? text.padStart(n, ch) : text.padEnd(n, ch);
    }
    textMatchesPattern(args) {
      try { return new RegExp(String(args.REGEX)).test(String(args.TEXT)); } catch (e) { return false; }
    }
    textCountOccurrences(args) {
      const sub = String(args.SUBSTRING);
      if (!sub) return 0;
      return String(args.TEXT).split(sub).length - 1;
    }
    textWordCount(args) {
      const t = String(args.TEXT).trim();
      return t ? t.split(/\s+/).length : 0;
    }
    textTruncate(args) {
      const t = String(args.TEXT), n = Math.max(0, Math.round(toNumber(args.N)));
      return t.length <= n ? t : t.slice(0, Math.max(0, n - 1)) + '…';
    }
    textCenter(args) {
      const t = String(args.TEXT), n = Math.max(0, Math.round(toNumber(args.N)));
      if (t.length >= n) return t;
      const pad = n - t.length;
      const left = Math.floor(pad / 2);
      return ' '.repeat(left) + t + ' '.repeat(pad - left);
    }
    textEscapeHtml(args) {
      const t = String(args.TEXT);
      if (args.MODE === 'escape') {
        return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
      }
      return t.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&amp;/g,'&');
    }
    textSlugify(args) {
      return String(args.TEXT).toLowerCase().trim()
        .replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    }
    textCompareSemver(args) {
      const parse = (s) => String(s).split('.').map((x) => parseInt(x, 10) || 0);
      const a = parse(args.A), b = parse(args.B);
      for (let i = 0; i < 3; i++) {
        const d = (a[i] || 0) - (b[i] || 0);
        if (d !== 0) return d > 0 ? 1 : -1;
      }
      return 0;
    }
    textCharsToList(args) { return JSON.stringify([...String(args.TEXT)]); }
    textBase64(args) {
      try {
        if (args.MODE === 'encode') return btoa(unescape(encodeURIComponent(String(args.TEXT))));
        return decodeURIComponent(escape(atob(String(args.TEXT))));
      } catch (e) { return ''; }
    }
    textHash(args) {
      let h = 5381;
      const s = String(args.TEXT);
      for (let i = 0; i < s.length; i++) h = ((h << 5) + h) ^ s.charCodeAt(i);
      return (h >>> 0).toString(16);
    }
    textRandomId(args) {
      const n = Math.max(1, Math.min(64, Math.round(toNumber(args.N))));
      const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let out = '';
      for (let i = 0; i < n; i++) out += chars[Math.floor(Math.random() * chars.length)];
      return out;
    }
    textFormatNumber(args) {
      const n = Math.round(toNumber(args.N));
      return n.toLocaleString('en-US');
    }
    textIsNumber(args) {
      const t = String(args.TEXT).trim();
      return t !== '' && !isNaN(Number(t));
    }

    // ===== LISTS =====
    listReverse(args) { return this._withArray(args.LIST, (arr) => [...arr].reverse()); }
    listShuffle(args) {
      return this._withArray(args.LIST, (arr) => {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
      });
    }
    listRemoveDuplicates(args) { return this._withArray(args.LIST, (arr) => [...new Set(arr)]); }
    listSort(args) {
      return this._withArray(args.LIST, (arr) => {
        const copy = [...arr];
        if (args.MODE === 'numeric') copy.sort((a, b) => toNumber(a) - toNumber(b));
        else copy.sort((a, b) => String(a).localeCompare(String(b)));
        return copy;
      });
    }
    listSublist(args) {
      return this._withArray(args.LIST, (arr) => arr.slice(toNumber(args.I) - 1, toNumber(args.J)));
    }
    listMerge(args) {
      return JSON.stringify([...this._parseArray(args.LIST1), ...this._parseArray(args.LIST2)]);
    }
    listEquals(args) {
      return JSON.stringify(this._parseArray(args.LIST1)) === JSON.stringify(this._parseArray(args.LIST2));
    }
    listIndexOfMinMax(args) {
      const arr = this._parseArray(args.LIST).map(toNumber);
      if (!arr.length) return 0;
      const value = args.MODE === 'max' ? Math.max(...arr) : Math.min(...arr);
      return arr.indexOf(value) + 1;
    }
    listSumAverage(args) {
      const arr = this._parseArray(args.LIST).map(toNumber);
      const sum = arr.reduce((a, b) => a + b, 0);
      return args.MODE === 'sum' ? sum : (arr.length ? sum / arr.length : 0);
    }
    listChunk(args) {
      const arr = this._parseArray(args.LIST);
      const n = Math.max(1, toNumber(args.N));
      const out = [];
      for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
      return JSON.stringify(out);
    }
    listFilterGreater(args) {
      const n = toNumber(args.N);
      const op = args.OP;
      const arr = this._parseArray(args.LIST).filter((v) => {
        const x = toNumber(v);
        if (op === '>') return x > n;
        if (op === '>=') return x >= n;
        if (op === '<') return x < n;
        if (op === '<=') return x <= n;
        return x === n;
      });
      return JSON.stringify(arr);
    }
    listMapOp(args) {
      const n = toNumber(args.N);
      const op = args.OP;
      const arr = this._parseArray(args.LIST).map((v) => {
        const x = toNumber(v);
        if (op === '+') return x + n;
        if (op === '-') return x - n;
        if (op === '*') return x * n;
        return n === 0 ? 0 : x / n;
      });
      return JSON.stringify(arr);
    }
    listRandomIndex(args) {
      const arr = this._parseArray(args.LIST);
      if (!arr.length) return 0;
      return Math.floor(Math.random() * arr.length) + 1;
    }
    listStack(args) {
      const arr = this._parseArray(args.LIST);
      if (args.OP === 'push') {
        arr.push(args.VALUE);
        return JSON.stringify(arr);
      }
      if (args.OP === 'pop') {
        arr.pop();
        return JSON.stringify(arr);
      }
      return arr.length ? arr[arr.length - 1] : '';
    }
    listIndexOf(args) {
      const arr = this._parseArray(args.LIST);
      const idx = arr.findIndex((x) => String(x) === String(args.ITEM));
      return idx === -1 ? 0 : idx + 1;
    }
    listWeightedPick(args) {
      const items = this._parseArray(args.ITEMS);
      const weights = this._parseArray(args.WEIGHTS).map((w) => Math.max(0, toNumber(w)));
      if (!items.length) return '';
      let total = weights.reduce((a, b) => a + b, 0);
      if (total <= 0) return items[Math.floor(Math.random() * items.length)];
      let r = Math.random() * total;
      for (let i = 0; i < items.length; i++) {
        r -= weights[i] || 0;
        if (r <= 0) return items[i];
      }
      return items[items.length - 1];
    }
    _parseArray(value) {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [value];
      } catch (e) { return [value]; }
    }
    _withArray(value, fn) { return JSON.stringify(fn(this._parseArray(value))); }

    // ===== JSON =====
    jsonListToJson(args) { return JSON.stringify(this._parseArray(args.LIST)); }
    jsonJsonToList(args) { return JSON.stringify(this._parseArray(args.JSON)); }
    jsonGetPath(args) {
      try {
        const obj = JSON.parse(args.JSON);
        const path = String(args.PATH).split('.');
        let cur = obj;
        for (const key of path) cur = cur == null ? undefined : cur[key];
        return cur === undefined ? '' : (typeof cur === 'object' ? JSON.stringify(cur) : String(cur));
      } catch (e) { return ''; }
    }
    jsonSetPath(args) {
      try {
        const obj = JSON.parse(args.JSON || '{}');
        const path = String(args.PATH).split('.');
        let cur = obj;
        for (let i = 0; i < path.length - 1; i++) {
          if (typeof cur[path[i]] !== 'object' || cur[path[i]] === null) cur[path[i]] = {};
          cur = cur[path[i]];
        }
        let value = args.VALUE;
        try { value = JSON.parse(args.VALUE); } catch (e) { /* keep */ }
        cur[path[path.length - 1]] = value;
        return JSON.stringify(obj);
      } catch (e) { return args.JSON; }
    }
    jsonHasKey(args) {
      try { return Object.prototype.hasOwnProperty.call(JSON.parse(args.JSON), args.KEY); }
      catch (e) { return false; }
    }
    jsonKeys(args) {
      try { return JSON.stringify(Object.keys(JSON.parse(args.JSON))); }
      catch (e) { return '[]'; }
    }
    jsonPretty(args) {
      try { return JSON.stringify(JSON.parse(args.JSON), null, 2); }
      catch (e) { return args.JSON; }
    }

    // ===== STORAGE =====
    storageSave(args) {
      try { localStorage.setItem(storageKey(args.KEY), args.VALUE); } catch (e) {}
      savedKeys.set(args.KEY, args.VALUE);
    }
    storageLoad(args) {
      try {
        const v = localStorage.getItem(storageKey(args.KEY));
        return v === null ? args.DEFAULT : v;
      } catch (e) {
        return savedKeys.has(args.KEY) ? savedKeys.get(args.KEY) : args.DEFAULT;
      }
    }
    storageDelete(args) {
      try { localStorage.removeItem(storageKey(args.KEY)); } catch (e) {}
      savedKeys.delete(args.KEY);
    }
    storageHasKey(args) {
      try { return localStorage.getItem(storageKey(args.KEY)) !== null; }
      catch (e) { return savedKeys.has(args.KEY); }
    }
    storageListKeys() {
      try {
        const prefix = 'twtoolsplus:', keys = [];
        for (let i = 0; i < localStorage.length; i++) {
          const fullKey = localStorage.key(i);
          if (fullKey && fullKey.startsWith(prefix)) keys.push(fullKey.slice(prefix.length));
        }
        return JSON.stringify(keys);
      } catch (e) { return JSON.stringify([...savedKeys.keys()]); }
    }

    // ===== SPRITE =====
    spriteDistanceTo(args, util) {
      const other = this.runtime.getSpriteTargetByName(args.SPRITE);
      if (!other || !util.target) return 0;
      const dx = other.x - util.target.x, dy = other.y - util.target.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
    spriteTouchingEdge(args, util) {
      if (!util.target) return false;
      const bounds = util.target.getBounds();
      if (!bounds) return false;
      const halfW = this.runtime.stageWidth / 2, halfH = this.runtime.stageHeight / 2;
      return bounds.left <= -halfW || bounds.right >= halfW || bounds.top >= halfH || bounds.bottom <= -halfH;
    }
    spriteRandomPosition(args) {
      const halfW = this.runtime.stageWidth / 2, halfH = this.runtime.stageHeight / 2;
      return args.AXIS === 'x'
        ? Math.round(Math.random() * halfW * 2 - halfW)
        : Math.round(Math.random() * halfH * 2 - halfH);
    }
    spriteCostumeSize(args, util) {
      if (!util.target) return 0;
      const costume = util.target.sprite.costumes[util.target.currentCostume];
      if (!costume) return 0;
      const res = costume.bitmapResolution || 1;
      const scale = (util.target.size || 100) / 100;
      const dim = args.DIMENSION === 'width' ? costume.size[0] : costume.size[1];
      return Math.round((dim / res) * scale);
    }
    spriteCloneNumber(args, util) {
      if (!util.target || util.target.isOriginal) return 0;
      return util.target.__twToolsCloneNumber || 0;
    }
    spriteIsOriginalOrClone(args, util) {
      return util && util.target ? !util.target.isOriginal : false;
    }
    spritePointTowardsXY(args, util) {
      if (!util.target) return;
      const dx = toNumber(args.X) - util.target.x;
      const dy = toNumber(args.Y) - util.target.y;
      util.target.setDirection((Math.atan2(dx, dy) * 180) / Math.PI);
    }
    spriteBoundingBox(args, util) {
      if (!util.target) return 0;
      const b = util.target.getBounds();
      return b ? b[args.SIDE] : 0;
    }
    spriteApplyFriction(args) { return toNumber(args.V) * toNumber(args.F); }
    spriteBounceVelocity(args, util) {
      let v = toNumber(args.V);
      if (!util.target) return v;
      const bounds = util.target.getBounds();
      if (!bounds) return v;
      const halfW = this.runtime.stageWidth / 2, halfH = this.runtime.stageHeight / 2;
      if (args.AXIS === 'x') {
        if (bounds.left <= -halfW || bounds.right >= halfW) v = -v;
      } else {
        if (bounds.top >= halfH || bounds.bottom <= -halfH) v = -v;
      }
      return v;
    }
    spriteOrbit(args) {
      const rad = (toNumber(args.ANGLE) * Math.PI) / 180;
      const r = toNumber(args.R);
      return args.AXIS === 'x'
        ? toNumber(args.CX) + Math.cos(rad) * r
        : toNumber(args.CY) + Math.sin(rad) * r;
    }
    spriteSmoothFollow(args, util) {
      if (!util.target) return 0;
      const f = Math.max(0, Math.min(1, toNumber(args.F)));
      if (args.AXIS === 'x') return util.target.x + (toNumber(args.TX) - util.target.x) * f;
      return util.target.y + (toNumber(args.TY) - util.target.y) * f;
    }
    spriteSnapGrid(args) {
      const n = toNumber(args.N) || 1;
      return Math.round(toNumber(args.VALUE) / n) * n;
    }
    spriteWrapStage(args) {
      const half = (args.AXIS === 'x' ? this.runtime.stageWidth : this.runtime.stageHeight) / 2;
      let v = toNumber(args.V);
      const span = half * 2;
      while (v > half) v -= span;
      while (v < -half) v += span;
      return v;
    }
    spriteDistToEdge(args, util) {
      if (!util.target) return 0;
      const halfW = this.runtime.stageWidth / 2, halfH = this.runtime.stageHeight / 2;
      const x = util.target.x, y = util.target.y;
      return Math.min(halfW - Math.abs(x), halfH - Math.abs(y));
    }
    spritePointOnEdge(args) {
      const dir = toNumber(args.DIR);
      const rad = ((90 - dir) * Math.PI) / 180;
      const halfW = this.runtime.stageWidth / 2, halfH = this.runtime.stageHeight / 2;
      const dx = Math.cos(rad), dy = Math.sin(rad);
      let t = Infinity;
      if (dx > 0) t = Math.min(t, halfW / dx);
      if (dx < 0) t = Math.min(t, -halfW / dx);
      if (dy > 0) t = Math.min(t, halfH / dy);
      if (dy < 0) t = Math.min(t, -halfH / dy);
      if (!isFinite(t)) t = 0;
      return args.AXIS === 'x' ? dx * t : dy * t;
    }
    spriteMouseAngle(args, util) {
      if (!util.target) return 0;
      try {
        const mx = this.runtime.ioDevices.mouse.getScratchX();
        const my = this.runtime.ioDevices.mouse.getScratchY();
        return (Math.atan2(mx - util.target.x, my - util.target.y) * 180) / Math.PI;
      } catch (e) { return 0; }
    }
    spriteMouseDelta(args) {
      return args.AXIS === 'x' ? this._mouseDelta.x : this._mouseDelta.y;
    }
    spriteKnockback(args, util) {
      if (!util.target) return;
      const dx = util.target.x - toNumber(args.X);
      const dy = util.target.y - toNumber(args.Y);
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const a = toNumber(args.AMOUNT);
      util.target.setXY(util.target.x + (dx / len) * a, util.target.y + (dy / len) * a);
    }
    spriteShortestTurn(args) {
      let d = toNumber(args.TO) - toNumber(args.FROM);
      d = ((d + 180) % 360 + 360) % 360 - 180;
      return d;
    }

    // ===== INPUT =====
    inputKeyPressedThisFrame(args) {
      return this._keysPressedThisFrame.has(String(args.KEY).toLowerCase());
    }
    inputLastKeyPressed() { return this._lastKeyPressed; }
    inputMouseButtonDown(args) { return !!this._mouseButtonsDown[args.BUTTON]; }
    inputScrollDelta() { return this._scrollDeltaThisFrame; }
    inputDoubleClick() { return this._doubleClickThisFrame; }
    inputKeyReleasedThisFrame(args) {
      return this._keysReleasedThisFrame.has(String(args.KEY).toLowerCase());
    }

    // ===== TIME =====
    timeTimer(args) {
      let start = this._timers.get(args.ID);
      if (start === undefined) { start = Date.now(); this._timers.set(args.ID, start); }
      return (Date.now() - start) / 1000;
    }
    timeResetTimer(args) { this._timers.set(args.ID, Date.now()); }
    timeCurrentFormatted(args) {
      const d = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const tokens = { YYYY: d.getFullYear(), MM: pad(d.getMonth() + 1), DD: pad(d.getDate()), HH: pad(d.getHours()), mm: pad(d.getMinutes()), ss: pad(d.getSeconds()) };
      let out = String(args.FORMAT);
      for (const [token, value] of Object.entries(tokens)) out = out.split(token).join(value);
      return out;
    }
    timeWaitFrames(args) {
      const n = Math.max(0, Math.round(toNumber(args.N)));
      if (n === 0) return Promise.resolve();
      return new Promise((resolve) => {
        let count = 0;
        const step = () => { count++; if (count >= n) resolve(); else requestAnimationFrame(step); };
        requestAnimationFrame(step);
      });
    }
    timeDaysBetween(args) {
      return Math.round(Math.abs(new Date(args.DATE2) - new Date(args.DATE1)) / 86400000);
    }
    timeCooldownReady(args) {
      const now = Date.now();
      const readyAt = this._cooldowns.get(args.ID) || 0;
      if (now >= readyAt) {
        this._cooldowns.set(args.ID, now + toNumber(args.SECONDS) * 1000);
        return true;
      }
      return false;
    }
    timeStopwatch(args) {
      const id = args.ID;
      let sw = this._stopwatches.get(id);
      if (!sw) { sw = { start: 0, pausedAt: 0, accumulated: 0, running: false }; this._stopwatches.set(id, sw); }
      const now = Date.now();
      if (args.OP === 'start' || args.OP === 'reset') {
        sw.start = now; sw.accumulated = 0; sw.pausedAt = 0; sw.running = true;
        return 0;
      }
      if (args.OP === 'pause') {
        if (sw.running) { sw.accumulated += (now - sw.start) / 1000; sw.running = false; sw.pausedAt = now; }
        return sw.accumulated;
      }
      if (args.OP === 'resume') {
        if (!sw.running) { sw.start = now; sw.running = true; }
        return sw.accumulated + (sw.running ? (now - sw.start) / 1000 : 0);
      }
      // read
      return sw.accumulated + (sw.running ? (now - sw.start) / 1000 : 0);
    }
    timeEveryNFrames(args) {
      const n = Math.max(1, Math.round(toNumber(args.N)));
      const id = args.ID;
      let c = (this._frameCounters.get(id) || 0) + 1;
      this._frameCounters.set(id, c);
      return c % n === 0;
    }
    timeTween(args) {
      const id = args.ID;
      let tw = this._tweens.get(id);
      const dur = Math.max(0.001, toNumber(args.SECONDS)) * 1000;
      const from = toNumber(args.A), to = toNumber(args.B);
      if (!tw || tw.from !== from || tw.to !== to || tw.duration !== dur) {
        tw = { from, to, duration: dur, start: Date.now(), easing: args.EASING };
        this._tweens.set(id, tw);
      }
      let t = (Date.now() - tw.start) / tw.duration;
      t = Math.max(0, Math.min(1, t));
      if (tw.easing === 'ease-in') t = t * t;
      else if (tw.easing === 'ease-out') t = t * (2 - t);
      else if (tw.easing === 'ease-in-out') t = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      return tw.from + (tw.to - tw.from) * t;
    }
    timeOnce(args) {
      if (this._onceFlags.get(args.ID)) return false;
      this._onceFlags.set(args.ID, true);
      return true;
    }

    // ===== DEBUG =====
    debugLog(args) { console.log('[TW Tools+]', args.VALUE); }
    debugLogLevel(args) {
      const level = args.LEVEL === 'error' ? 'error' : args.LEVEL === 'warning' ? 'warn' : 'log';
      console[level]('[TW Tools+]', args.VALUE);
    }
    debugAssert(args) {
      if (!args.CONDITION) console.error('[TW Tools+] Assertion failed:', args.TEXT);
    }

    // ===== COLOR =====
    colorRgbToHex(args) {
      const clamp255 = (n) => Math.max(0, Math.min(255, Math.round(toNumber(n))));
      const toHex = (n) => clamp255(n).toString(16).padStart(2, '0');
      return `#${toHex(args.R)}${toHex(args.G)}${toHex(args.B)}`;
    }
    colorHexToRgb(args) {
      const hex = String(args.HEX).replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16) || 0;
      const g = parseInt(hex.substring(2, 4), 16) || 0;
      const b = parseInt(hex.substring(4, 6), 16) || 0;
      return { r, g, b }[args.COMPONENT];
    }
    colorMix(args) {
      const p = Math.max(0, Math.min(100, toNumber(args.PERCENT))) / 100;
      const c1 = this.colorHexToRgbObj(args.C1);
      const c2 = this.colorHexToRgbObj(args.C2);
      const mix = (a, b) => Math.round(a + (b - a) * p);
      return this.colorRgbToHex({ R: mix(c1.r, c2.r), G: mix(c1.g, c2.g), B: mix(c1.b, c2.b) });
    }
    colorHexToRgbObj(hex) {
      const h = String(hex).replace('#', '');
      return {
        r: parseInt(h.substring(0, 2), 16) || 0,
        g: parseInt(h.substring(2, 4), 16) || 0,
        b: parseInt(h.substring(4, 6), 16) || 0
      };
    }
    colorRandom() {
      return this.colorRgbToHex({
        R: Math.floor(Math.random() * 256),
        G: Math.floor(Math.random() * 256),
        B: Math.floor(Math.random() * 256)
      });
    }
    colorBrightness(args) {
      const { r, g, b } = this.colorHexToRgbObj(args.C);
      return Math.round((r * 299 + g * 587 + b * 114) / 1000);
    }
    colorIsLightDark(args) { return this.colorBrightness(args) > 127; }
    colorFromHsl(args) {
      let h = ((toNumber(args.H) % 360) + 360) % 360 / 360;
      let s = Math.max(0, Math.min(100, toNumber(args.S))) / 100;
      let l = Math.max(0, Math.min(100, toNumber(args.L))) / 100;
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1; if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      let r, g, b;
      if (s === 0) { r = g = b = l; }
      else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
      }
      return this.colorRgbToHex({ R: r * 255, G: g * 255, B: b * 255 });
    }
    colorInvertGray(args) {
      const { r, g, b } = this.colorHexToRgbObj(args.C);
      if (args.MODE === 'grayscale') {
        const y = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
        return this.colorRgbToHex({ R: y, G: y, B: y });
      }
      return this.colorRgbToHex({ R: 255 - r, G: 255 - g, B: 255 - b });
    }
    colorContrast(args) {
      const lum = (hex) => {
        const { r, g, b } = this.colorHexToRgbObj(hex);
        const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
      };
      const l1 = lum(args.C1), l2 = lum(args.C2);
      const lighter = Math.max(l1, l2), darker = Math.min(l1, l2);
      return Math.round(((lighter + 0.05) / (darker + 0.05)) * 100) / 100;
    }
    colorPalette(args) {
      const n = Math.max(1, Math.min(24, Math.round(toNumber(args.N))));
      const base = toNumber(args.H);
      const out = [];
      for (let i = 0; i < n; i++) {
        out.push(this.colorFromHsl({ H: base + (360 / n) * i, S: 70, L: 50 }));
      }
      return JSON.stringify(out);
    }
    colorSimilar(args) {
      const a = this.colorHexToRgbObj(args.C1);
      const b = this.colorHexToRgbObj(args.C2);
      const d = Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
      return d <= toNumber(args.T);
    }

    // ===== CAMERA =====
    cameraGetPosition(args) { return args.AXIS === 'x' ? this._camera.x : this._camera.y; }
    cameraSetPosition(args) { this._camera.x = toNumber(args.X); this._camera.y = toNumber(args.Y); }
    cameraGetZoom() { return this._camera.zoom; }
    cameraSetZoom(args) { this._camera.zoom = toNumber(args.N) || 1; }
    cameraWorldToScreen(args) {
      const relX = (toNumber(args.X) - this._camera.x) * this._camera.zoom;
      const relY = (toNumber(args.Y) - this._camera.y) * this._camera.zoom;
      return args.AXIS === 'x' ? relX : relY;
    }

    // ===== DICT =====
    dictCreate() { return '{}'; }
    dictSet(args) {
      try {
        const obj = JSON.parse(args.DICT || '{}');
        let value = args.VALUE;
        try { value = JSON.parse(args.VALUE); } catch (e) {}
        obj[args.KEY] = value;
        return JSON.stringify(obj);
      } catch (e) { return args.DICT; }
    }
    dictGet(args) {
      try {
        const obj = JSON.parse(args.DICT || '{}');
        return Object.prototype.hasOwnProperty.call(obj, args.KEY) ? obj[args.KEY] : args.DEFAULT;
      } catch (e) { return args.DEFAULT; }
    }
    dictDeleteKey(args) {
      try {
        const obj = JSON.parse(args.DICT || '{}');
        delete obj[args.KEY];
        return JSON.stringify(obj);
      } catch (e) { return args.DICT; }
    }
    dictHasKey(args) {
      try { return Object.prototype.hasOwnProperty.call(JSON.parse(args.DICT || '{}'), args.KEY); }
      catch (e) { return false; }
    }
    dictKeysOrValues(args) {
      try {
        const obj = JSON.parse(args.DICT || '{}');
        return JSON.stringify(args.MODE === 'keys' ? Object.keys(obj) : Object.values(obj));
      } catch (e) { return '[]'; }
    }

    // ===== NETWORK =====
    netUrlEncodeDecode(args) {
      return args.MODE === 'URL-encode' ? encodeURIComponent(args.TEXT) : decodeURIComponent(args.TEXT);
    }
    netParseQueryString(args) {
      const params = new URLSearchParams(args.TEXT);
      const obj = {};
      for (const [k, v] of params.entries()) obj[k] = v;
      return JSON.stringify(obj);
    }
    netGetQueryParam(args) {
      try { return new URL(args.URL).searchParams.get(args.KEY) || ''; }
      catch (e) { return ''; }
    }

    // ===== AUDIO =====
    audioCurrentVolume(args, util) { return util.target ? util.target.volume : 100; }
    _findSoundPlayer(soundName, util) {
      try {
        const sound = util.target.sprite.sounds.find((s) => s.name === soundName);
        if (!sound) return null;
        return util.target.sprite.soundBank.soundPlayers[sound.soundId] || null;
      } catch (e) { return null; }
    }
    audioSetPlaybackRate(args, util) {
      const player = this._findSoundPlayer(args.SOUND, util);
      const rate = toNumber(args.N);
      try {
        if (player && player.outputNode && player.outputNode.playbackRate) player.outputNode.playbackRate.value = rate;
        else if (player && typeof player.setPlaybackRate === 'function') player.setPlaybackRate(rate);
      } catch (e) {}
    }
    audioIsPlaying(args, util) {
      const player = this._findSoundPlayer(args.SOUND, util);
      return !!(player && player.isPlaying);
    }
    audioDuration(args, util) {
      const player = this._findSoundPlayer(args.SOUND, util);
      try { return player && player.buffer ? player.buffer.duration : 0; }
      catch (e) { return 0; }
    }

    // ===== CONTROL =====
    controlRunAfter(args) {
      const id = args.ID;
      const handle = setTimeout(() => {
        this._tasks.delete(id);
        try {
          const stage = this.runtime.getTargetForStage();
          const broadcastVar = stage && stage.lookupBroadcastMsg(null, id);
          if (broadcastVar) this.runtime.startHats('event_whenbroadcastreceived', { BROADCAST_OPTION: broadcastVar.id });
        } catch (e) {}
      }, toNumber(args.SECONDS) * 1000);
      this._tasks.set(id, handle);
    }
    controlCancelTask(args) {
      const handle = this._tasks.get(args.ID);
      if (handle) clearTimeout(handle);
      this._tasks.delete(args.ID);
    }
    controlDebounce(args) {
      const now = Date.now();
      const last = this._debounceTimestamps.get(args.ID) || 0;
      const ok = (now - last) / 1000 >= toNumber(args.SECONDS);
      if (ok) this._debounceTimestamps.set(args.ID, now);
      return ok;
    }
    controlThrottle(args) {
      const now = Date.now();
      const last = this._throttleTimestamps.get(args.ID) || 0;
      const ok = (now - last) / 1000 >= toNumber(args.SECONDS);
      if (ok) this._throttleTimestamps.set(args.ID, now);
      return ok;
    }
    controlTaskExists(args) { return this._tasks.has(args.ID); }

    // ===== GEOMETRY =====
    geoPointInRect(args) {
      const minX = Math.min(toNumber(args.X1), toNumber(args.X2));
      const maxX = Math.max(toNumber(args.X1), toNumber(args.X2));
      const minY = Math.min(toNumber(args.Y1), toNumber(args.Y2));
      const maxY = Math.max(toNumber(args.Y1), toNumber(args.Y2));
      return toNumber(args.X) >= minX && toNumber(args.X) <= maxX && toNumber(args.Y) >= minY && toNumber(args.Y) <= maxY;
    }
    geoPointInCircle(args) {
      const dx = toNumber(args.X) - toNumber(args.CX);
      const dy = toNumber(args.Y) - toNumber(args.CY);
      return Math.sqrt(dx * dx + dy * dy) <= toNumber(args.R);
    }
    geoRectsOverlap(args) {
      const aMinX = Math.min(toNumber(args.AX1), toNumber(args.AX2));
      const aMaxX = Math.max(toNumber(args.AX1), toNumber(args.AX2));
      const aMinY = Math.min(toNumber(args.AY1), toNumber(args.AY2));
      const aMaxY = Math.max(toNumber(args.AY1), toNumber(args.AY2));
      const bMinX = Math.min(toNumber(args.BX1), toNumber(args.BX2));
      const bMaxX = Math.max(toNumber(args.BX1), toNumber(args.BX2));
      const bMinY = Math.min(toNumber(args.BY1), toNumber(args.BY2));
      const bMaxY = Math.max(toNumber(args.BY1), toNumber(args.BY2));
      return aMinX <= bMaxX && aMaxX >= bMinX && aMinY <= bMaxY && aMaxY >= bMinY;
    }
    geoRotatePoint(args) {
      const rad = (toNumber(args.ANGLE) * Math.PI) / 180;
      const dx = toNumber(args.X) - toNumber(args.CX);
      const dy = toNumber(args.Y) - toNumber(args.CY);
      const x = toNumber(args.CX) + dx * Math.cos(rad) - dy * Math.sin(rad);
      const y = toNumber(args.CY) + dx * Math.sin(rad) + dy * Math.cos(rad);
      return args.AXIS === 'x' ? x : y;
    }
    geoMidpoint(args) {
      return args.AXIS === 'x'
        ? (toNumber(args.X1) + toNumber(args.X2)) / 2
        : (toNumber(args.Y1) + toNumber(args.Y2)) / 2;
    }
    geoNormalizeVector(args) {
      const x = toNumber(args.X), y = toNumber(args.Y);
      const len = Math.sqrt(x * x + y * y) || 1;
      return args.AXIS === 'x' ? x / len : y / len;
    }

    // ===== BULLETS =====
    _dirToRad(dir) { return ((90 - toNumber(dir)) * Math.PI) / 180; }
    bulletVelocityX(args, util) {
      const tx = toNumber(args.X), ty = toNumber(args.Y);
      const x = util.target ? util.target.x : 0, y = util.target ? util.target.y : 0;
      const dx = tx - x, dy = ty - y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      return (dx / dist) * toNumber(args.SPEED);
    }
    bulletVelocityY(args, util) {
      const tx = toNumber(args.X), ty = toNumber(args.Y);
      const x = util.target ? util.target.x : 0, y = util.target ? util.target.y : 0;
      const dx = tx - x, dy = ty - y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      return (dy / dist) * toNumber(args.SPEED);
    }
    bulletDirectionTowards(args, util) {
      const tx = toNumber(args.X), ty = toNumber(args.Y);
      const x = util.target ? util.target.x : 0, y = util.target ? util.target.y : 0;
      return (Math.atan2(tx - x, ty - y) * 180) / Math.PI;
    }
    bulletVelocityFromDirection(args) {
      const rad = this._dirToRad(args.DIR);
      const s = toNumber(args.SPEED);
      return args.AXIS === 'x' ? Math.cos(rad) * s : Math.sin(rad) * s;
    }
    bulletSpeedFromVelocity(args) {
      const vx = toNumber(args.VX), vy = toNumber(args.VY);
      return Math.sqrt(vx * vx + vy * vy);
    }
    bulletAngleDifference(args) {
      let d = toNumber(args.DIR2) - toNumber(args.DIR1);
      return ((d + 180) % 360 + 360) % 360 - 180;
    }
    bulletSpreadDirection(args) {
      const n = Math.max(1, Math.round(toNumber(args.N)));
      const i = Math.max(1, Math.min(n, Math.round(toNumber(args.I))));
      const spread = toNumber(args.SPREAD), center = toNumber(args.DIR);
      if (n === 1) return center;
      return center - spread / 2 + (i - 1) * (spread / (n - 1));
    }
    bulletPointInDirectionOfMotion(args, util) {
      if (!util.target) return;
      util.target.setDirection((Math.atan2(toNumber(args.VX), toNumber(args.VY)) * 180) / Math.PI);
    }
    bulletMoveByVelocity(args, util) {
      if (!util.target) return;
      util.target.setXY(util.target.x + toNumber(args.VX), util.target.y + toNumber(args.VY));
    }
    bulletIsOffStage(args, util) {
      if (!util.target) return true;
      const m = toNumber(args.MARGIN);
      const halfW = this.runtime.stageWidth / 2 + m, halfH = this.runtime.stageHeight / 2 + m;
      const x = util.target.x, y = util.target.y;
      return x < -halfW || x > halfW || y < -halfH || y > halfH;
    }
    bulletHomingDir(args, util) {
      const current = toNumber(args.CURRENT);
      const target = util.target
        ? (Math.atan2(toNumber(args.X) - util.target.x, toNumber(args.Y) - util.target.y) * 180) / Math.PI
        : (Math.atan2(toNumber(args.X), toNumber(args.Y)) * 180) / Math.PI;
      let diff = ((target - current + 180) % 360 + 360) % 360 - 180;
      const max = Math.abs(toNumber(args.MAX));
      if (diff > max) diff = max;
      if (diff < -max) diff = -max;
      return current + diff;
    }
    bulletAccelerate(args) {
      return Math.min(toNumber(args.MAX), toNumber(args.SPEED) + toNumber(args.ACCEL));
    }
    bulletCircleDir(args) {
      const n = Math.max(1, Math.round(toNumber(args.N)));
      const i = Math.max(1, Math.min(n, Math.round(toNumber(args.I))));
      return toNumber(args.OFFSET) + ((i - 1) * 360) / n;
    }
    bulletSetLifetime(args, util) {
      if (!util.target) return;
      this._bulletLifetimes.set(util.target.id, Math.max(0, Math.round(toNumber(args.FRAMES))));
    }
    bulletTickLifetime(args, util) {
      if (!util.target) return true;
      let left = this._bulletLifetimes.get(util.target.id);
      if (left === undefined) return false;
      left -= 1;
      this._bulletLifetimes.set(util.target.id, left);
      return left <= 0;
    }

    // ===== MISC =====
    miscDeepCopy(args) {
      try { return JSON.stringify(JSON.parse(JSON.stringify(JSON.parse(args.JSON)))); }
      catch (e) { return args.JSON; }
    }
  }

  // One shared core per script load (state for input, timers, bullets, etc.)
  const core = new TWToolsPlusCore();

  const SHARED_MENUS = {
    parityMenu: { items: [Scratch.translate('even'), Scratch.translate('odd')] },
    gcdLcmMenu: { items: [Scratch.translate('GCD'), Scratch.translate('LCM')] },
    numberFormatMenu: { items: [Scratch.translate('Roman numeral'), Scratch.translate('words')] },
    caseMenu: { items: [Scratch.translate('UPPERCASE'), Scratch.translate('lowercase'), Scratch.translate('Capitalized')] },
    padSideMenu: { items: [Scratch.translate('start'), Scratch.translate('end')] },
    sortModeMenu: { items: [Scratch.translate('numeric'), Scratch.translate('alphabetical')] },
    minMaxMenu: { items: [Scratch.translate('max'), Scratch.translate('min')] },
    sumAverageMenu: { items: [Scratch.translate('sum'), Scratch.translate('average')] },
    axisMenu: { items: [Scratch.translate('x'), Scratch.translate('y')] },
    dimensionMenu: { items: [Scratch.translate('width'), Scratch.translate('height')] },
    boxSideMenu: { items: [Scratch.translate('top'), Scratch.translate('bottom'), Scratch.translate('left'), Scratch.translate('right')] },
    mouseButtonMenu: { items: [Scratch.translate('left'), Scratch.translate('right'), Scratch.translate('middle')] },
    logLevelMenu: { items: [Scratch.translate('info'), Scratch.translate('warning'), Scratch.translate('error')] },
    rgbComponentMenu: { items: [Scratch.translate('r'), Scratch.translate('g'), Scratch.translate('b')] },
    keysValuesMenu: { items: [Scratch.translate('keys'), Scratch.translate('values')] },
    urlEncodeMenu: { items: [Scratch.translate('URL-encode'), Scratch.translate('URL-decode')] },
    escapeMenu: { items: [Scratch.translate('escape'), Scratch.translate('unescape')] },
    base64Menu: { items: [Scratch.translate('encode'), Scratch.translate('decode')] },
    compareOpMenu: { items: ['>', '>=', '<', '<=', '=='] },
    mapOpMenu: { items: ['+', '-', '*', '/'] },
    stackOpMenu: { items: [Scratch.translate('push'), Scratch.translate('pop'), Scratch.translate('peek')] },
    stopwatchMenu: { items: [Scratch.translate('start'), Scratch.translate('pause'), Scratch.translate('resume'), Scratch.translate('read'), Scratch.translate('reset')] },
    easingMenu: { items: [Scratch.translate('linear'), Scratch.translate('ease-in'), Scratch.translate('ease-out'), Scratch.translate('ease-in-out')] },
    invertGrayMenu: { items: [Scratch.translate('invert'), Scratch.translate('grayscale')] }
  };

  function registerGroup(id, name, color1, color2, color3, blocks) {
    unregisterIfExists(id);
    const opcodes = [];
    for (const b of blocks) {
      if (b && b.opcode) opcodes.push(b.opcode);
    }
    class GroupExt {
      getInfo() {
        return {
          id,
          name: Scratch.translate(name),
          color1,
          color2,
          color3,
          menuIconURI: MENU_ICON,
          blockIconURI: BLOCK_ICON,
          blocks,
          menus: SHARED_MENUS
        };
      }
    }
    for (const op of opcodes) {
      if (typeof core[op] === 'function') {
        GroupExt.prototype[op] = function (args, util) {
          return core[op](args, util);
        };
      }
    }
    Scratch.extensions.register(new GroupExt());
  }

  registerGroup(
    'twtoolsplusdata',
    'Tools+ Data',
    '#FF8C1A',
    '#d87716',
    '#b26212',
    [
label('JSON'),
      {
                  opcode: 'jsonListToJson',
                  blockType: Scratch.BlockType.REPORTER,
                  text: Scratch.translate('list [LIST] to JSON'),
                  arguments: { LIST: { type: Scratch.ArgumentType.STRING, defaultValue: '["a","b"]' } }
                },
      {
                  opcode: 'jsonJsonToList',
                  blockType: Scratch.BlockType.REPORTER,
                  text: Scratch.translate('JSON [JSON] to list'),
                  arguments: { JSON: { type: Scratch.ArgumentType.STRING, defaultValue: '["a","b","c"]' } }
                },
      {
                  opcode: 'jsonGetPath',
                  blockType: Scratch.BlockType.REPORTER,
                  text: Scratch.translate('get value from [JSON] at path [PATH]'),
                  arguments: {
                    JSON: { type: Scratch.ArgumentType.STRING, defaultValue: '{"a":{"b":1}}' },
                    PATH: { type: Scratch.ArgumentType.STRING, defaultValue: 'a.b' }
                  }
                },
      {
                  opcode: 'jsonSetPath',
                  blockType: Scratch.BlockType.REPORTER,
                  text: Scratch.translate('set value in [JSON] at path [PATH] to [VALUE]'),
                  arguments: {
                    JSON: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' },
                    PATH: { type: Scratch.ArgumentType.STRING, defaultValue: 'a.b' },
                    VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: '1' }
                  }
                },
      {
                  opcode: 'jsonHasKey',
                  blockType: Scratch.BlockType.BOOLEAN,
                  text: Scratch.translate('does [JSON] have key [KEY]?'),
                  arguments: {
                    JSON: { type: Scratch.ArgumentType.STRING, defaultValue: '{"a":1}' },
                    KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'a' }
                  }
                },
      {
                  opcode: 'jsonKeys',
                  blockType: Scratch.BlockType.REPORTER,
                  text: Scratch.translate('keys of [JSON]'),
                  arguments: { JSON: { type: Scratch.ArgumentType.STRING, defaultValue: '{"a":1,"b":2}' } }
                },
      {
                  opcode: 'jsonPretty',
                  blockType: Scratch.BlockType.REPORTER,
                  text: Scratch.translate('pretty-print [JSON]'),
                  arguments: { JSON: { type: Scratch.ArgumentType.STRING, defaultValue: '{"a":1}' } }
                },
      label('Dictionaries'),
      {
                  opcode: 'dictCreate',
                  blockType: Scratch.BlockType.REPORTER,
                  text: Scratch.translate('create empty dictionary')
                },
      {
                  opcode: 'dictSet',
                  blockType: Scratch.BlockType.REPORTER,
                  text: Scratch.translate('set dict [DICT] key [KEY] to [VALUE]'),
                  arguments: {
                    DICT: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' },
                    KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'name' },
                    VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'value' }
                  }
                },
      {
                  opcode: 'dictGet',
                  blockType: Scratch.BlockType.REPORTER,
                  text: Scratch.translate('get dict [DICT] key [KEY] (default [DEFAULT])'),
                  arguments: {
                    DICT: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' },
                    KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'name' },
                    DEFAULT: { type: Scratch.ArgumentType.STRING, defaultValue: '' }
                  }
                },
      {
                  opcode: 'dictDeleteKey',
                  blockType: Scratch.BlockType.REPORTER,
                  text: Scratch.translate('delete key [KEY] from dict [DICT]'),
                  arguments: {
                    KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'name' },
                    DICT: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' }
                  }
                },
      {
                  opcode: 'dictHasKey',
                  blockType: Scratch.BlockType.BOOLEAN,
                  text: Scratch.translate('does dict [DICT] have key [KEY]?'),
                  arguments: {
                    DICT: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' },
                    KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'name' }
                  }
                },
      {
                  opcode: 'dictKeysOrValues',
                  blockType: Scratch.BlockType.REPORTER,
                  text: Scratch.translate('dict [DICT] [MODE]'),
                  arguments: {
                    DICT: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' },
                    MODE: { type: Scratch.ArgumentType.STRING, menu: 'keysValuesMenu', defaultValue: 'keys' }
                  }
                },
      label('Storage'),
      {
                  opcode: 'storageSave',
                  blockType: Scratch.BlockType.COMMAND,
                  text: Scratch.translate('save [KEY] = [VALUE]'),
                  arguments: {
                    KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'highscore' },
                    VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: '0' }
                  }
                },
      {
                  opcode: 'storageLoad',
                  blockType: Scratch.BlockType.REPORTER,
                  text: Scratch.translate('load [KEY] (default [DEFAULT])'),
                  arguments: {
                    KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'highscore' },
                    DEFAULT: { type: Scratch.ArgumentType.STRING, defaultValue: '0' }
                  }
                },
      {
                  opcode: 'storageDelete',
                  blockType: Scratch.BlockType.COMMAND,
                  text: Scratch.translate('delete [KEY]'),
                  arguments: { KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'highscore' } }
                },
      {
                  opcode: 'storageHasKey',
                  blockType: Scratch.BlockType.BOOLEAN,
                  text: Scratch.translate('does key [KEY] exist?'),
                  arguments: { KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'highscore' } }
                },
      {
                  opcode: 'storageListKeys',
                  blockType: Scratch.BlockType.REPORTER,
                  text: Scratch.translate('list all saved keys')
                }
    ]
  );
})(Scratch);
