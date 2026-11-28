// Name: Read Aloud
// ID: zhread
// Description: Speaks text with the voices that are already installed in the operating system. Any language the system supports can be spoken, including Mandarin, Taiwanese Mandarin, Cantonese and English. Volume, rate and pitch are adjustable, speech can be queued, paused and resumed, long text is split into chunks so browsers don't cut it off, and a hat block fires when speech finishes. Nothing is downloaded and no engine is bundled.
// By: anonymous
// License: MPL-2.0

/*
Notes for future me / reviewers:
1. This extension must run unsandboxed: speechSynthesis and SpeechSynthesisUtterance live on window,
   and sandboxed extensions run in a worker where those APIs do not exist.
2. Voices come from the OS. On Windows 11 the natural Mandarin voices (Xiaoxiao, Yunxi, ...) sound
   almost human. On Linux, speech-dispatcher (espeak-ng, ...) usually needs to be installed first.
3. Chrome does not fill getVoices() until the "voiceschanged" event, so voices are cached and
   refreshed on that event.
4. Chrome silently stops speaking long utterances after roughly 15 seconds. Text is therefore split
   into sentence-sized chunks and each chunk is spoken separately.
*/

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error(
      "Read Aloud must be run unsandboxed: it needs the browser's speech synthesis API, which is not available inside a sandbox."
    );
  }

  const synth =
    typeof window !== "undefined" && window.speechSynthesis
      ? window.speechSynthesis
      : null;

  let lastError = "";
  const cachedVoices = [];

  const settings = {
    volume: 1, // 0 to 1
    rate: 1, // 0.1 to 10
    pitch: 1, // 0 to 2
    lang: "auto",
    voice: "auto",
  };

  let sequence = 0; // incremented on every new utterance so stale runs can bail out
  let active = false;
  const waiters = []; // resolve functions of pending "wait until finished" calls

  /* ---------------------------------- helpers --------------------------------- */

  const fail = (message) => {
    lastError = String(message);
    console.warn("[Read Aloud]", message);
  };

  /** @param {unknown} value @param {number} fallback */
  const num = (value, fallback) => {
    const parsed = parseFloat(String(value));
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  /** @param {number} n @param {number} low @param {number} high */
  const clamp = (n, low, high) => (n < low ? low : n > high ? high : n);

  /** @param {unknown} name */
  const normalizeName = (name) =>
    String(name || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

  /* ---------------------------------- voices ---------------------------------- */

  const allVoices = () => {
    if (!synth) {
      return [];
    }
    try {
      const voices = synth.getVoices();
      if (voices && voices.length) {
        cachedVoices.length = 0;
        cachedVoices.push(...voices);
      }
    } catch (e) {
      fail(e);
    }
    return cachedVoices;
  };

  if (synth && typeof synth.addEventListener === "function") {
    synth.addEventListener("voiceschanged", () => {
      allVoices();
    });
  }
  allVoices();

  /** @param {SpeechSynthesisVoice | null | undefined} voice */
  const languageOf = (voice) =>
    String((voice && voice.lang) || "")
      .toLowerCase()
      .replace(/_/g, "-");

  const languageMatches = (voiceLang, wanted) => {
    const tag = languageOf({ lang: voiceLang });
    const want = String(wanted || "zh-CN").toLowerCase();
    if (want === "zh-cn") {
      return (
        tag.indexOf("zh") === 0 &&
        tag.indexOf("zh-tw") !== 0 &&
        tag.indexOf("zh-hk") !== 0 &&
        tag.indexOf("zh-hant") !== 0 &&
        tag.indexOf("yue") !== 0
      );
    }
    if (want === "zh-tw") {
      return tag.indexOf("zh-tw") === 0 || tag.indexOf("zh-hant") === 0;
    }
    if (want === "zh-hk") {
      return (
        tag.indexOf("zh-hk") === 0 ||
        tag.indexOf("yue") === 0 ||
        tag.indexOf("zh-hant") === 0
      );
    }
    if (want === "zh") {
      return tag.indexOf("zh") === 0 || tag.indexOf("yue") === 0;
    }
    return tag.indexOf(want) === 0 || tag.split("-")[0] === want.split("-")[0];
  };

  // Voices whose names look like these are usually the higher quality ones.
  const QUALITY_HINTS = [
    [/xiaoxiao|晓晓/i, 10],
    [/yunxi|yunyang|yunjian|yunye|yunfeng|云希|云扬|云健/i, 9],
    [/xiaoyi|xiaomo|xiaorui|xiaohan|xiaoshuang|晓伊|晓墨|晓睿|晓涵/i, 8],
    [/aria|jenny|guy|davis|jane/i, 7],
    [/huihui|慧慧/i, 6],
    [/google/i, 5],
    [/yaoyao|瑶瑶/i, 5],
    [/samantha|kangkang|康康/i, 4],
    [/natural|neural/i, 2],
    [/zira/i, 7],
    [/mark/i, 5],
    [/david/i, 2],
  ];

  /**
   * @param {string} requested Menu value or a free-form voice name.
   * @param {string} wanted Language tag.
   * @param {boolean} [forceLocal]
   */
  const pickVoice = (requested, wanted, forceLocal) => {
    const all = allVoices();
    if (!all.length) {
      return null;
    }

    const wantLang = wanted === "auto" ? "zh-CN" : wanted;
    const requestedRaw = String(requested || "").trim();

    const offlineOnly = !!(forceLocal || requestedRaw === "offline");
    let pool = offlineOnly
      ? all.filter((voice) => voice.localService !== false)
      : all.slice();
    if (!pool.length) {
      // Every voice is online, or the OS reports no local ones: fall back to the full list
      // rather than returning null and speaking with no voice at all.
      pool = all.slice();
    }

    if (requestedRaw && requestedRaw !== "auto" && requestedRaw !== "offline") {
      let hit = pool.find(
        (voice) => normalizeName(voice.name) === normalizeName(requestedRaw)
      );

      if (!hit) {
        hit = pool.find(
          (voice) =>
            normalizeName(voice.name).indexOf(normalizeName(requestedRaw)) >= 0
        );
      }
      if (hit) {
        return hit;
      }
      fail(Scratch.translate("Voice not found, choosing another one"));
    }

    const sameLanguage = pool.filter((voice) =>
      languageMatches(voice.lang, wantLang)
    );
    const candidates = sameLanguage.length ? sameLanguage : pool;

    let best = null;
    let bestScore = -1;
    for (const voice of candidates) {
      let score = 0;
      for (const [pattern, weight] of QUALITY_HINTS) {
        if (pattern.test(voice.name || "")) {
          score += weight;
        }
      }
      if (languageMatches(voice.lang, wantLang)) {
        score += 3;
      }
      if (voice.localService === false) {
        score -= 2; // online voices are nice to have but break when the network is down
      }
      if (score > bestScore) {
        bestScore = score;
        best = voice;
      }
    }
    return best;
  };

  /* ---------------------------------- chunking --------------------------------- */

  // Roughly one sentence. Browsers truncate long utterances, so keep chunks small.
  // CJK text is counted in characters, Latin text in characters with a larger limit.
  const LIMIT_CJK = 55;
  const LIMIT_LATIN = 180;

  /** @param {unknown} text @returns {string[]} */
  const splitText = (text) => {
    const raw = String(text).replace(/\r/g, "");
    if (!raw.trim()) {
      return [];
    }

    const limit = /[\u3400-\u9fff\uf900-\ufaff]/.test(raw)
      ? LIMIT_CJK
      : LIMIT_LATIN;

    // Split after sentence-ending punctuation, keeping the punctuation.
    const parts = raw.split(/(?<=[。！？；!?;\n])/);
    const chunks = [];
    let buffer = "";

    const flush = () => {
      if (buffer.trim()) {
        chunks.push(buffer);
      }
      buffer = "";
    };

    for (const part of parts) {
      if (!part) {
        continue;
      }
      if ((buffer + part).length <= limit) {
        buffer += part;
        continue;
      }
      flush();
      let rest = part;
      while (rest.length > limit) {
        let cut = Math.max(
          rest.lastIndexOf("，", limit),
          rest.lastIndexOf(",", limit),
          rest.lastIndexOf("、", limit),
          rest.lastIndexOf(" ", limit)
        );
        if (cut < limit / 3) {
          cut = limit;
        }
        chunks.push(rest.slice(0, cut));
        rest = rest.slice(cut);
      }
      buffer = rest;
    }
    flush();
    return chunks.length ? chunks : [raw];
  };

  /* ---------------------------------- speaking --------------------------------- */

  /** @param {string} text */
  const languageFor = (text) => {
    if (settings.lang !== "auto") {
      return settings.lang;
    }
    // Anything with CJK code points is treated as Mandarin, everything else as English.
    return /[\u3400-\u9fff\uf900-\ufaff]/.test(text) ? "zh-CN" : "en-US";
  };

  /**
   * @param {string} text
   * @param {string | undefined} forcedVoice
   * @param {boolean} offlineOnly
   */
  const buildUtterance = (text, forcedVoice, offlineOnly) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const lang = languageFor(text);
    utterance.lang = lang;

    const voice = pickVoice(
      forcedVoice === undefined ? settings.voice : forcedVoice,
      lang,
      offlineOnly
    );
    if (voice) {
      utterance.voice = voice;
      if (voice.lang) {
        utterance.lang = voice.lang;
      }
    }

    utterance.volume = clamp(settings.volume, 0, 1);
    utterance.rate = clamp(settings.rate, 0.1, 10);
    utterance.pitch = clamp(settings.pitch, 0, 2);
    return utterance;
  };

  /** @param {object} runtime @returns {?{target: object, blockId: string}} */
  const firstHatNextBlock = (runtime) => {
    const targets =
      runtime && Array.isArray(runtime.targets) ? runtime.targets : [];
    for (const target of targets) {
      const blocks = target && target.blocks;
      if (!blocks || !blocks._blocks) {
        continue;
      }
      const map = blocks._blocks;
      for (const id in map) {
        const block = map[id];
        if (block && block.opcode === "zhread_whenDone" && block.next) {
          return { target: target, blockId: block.next };
        }
      }
    }
    return null;
  };

  /**
   * Start the "when speech finishes" scripts.
   *
   * startHats() is the documented entry point, but not every runtime advances
   * the thread it creates past the hat block. When that happens the thread
   * reports as finished without ever running the stack below the hat, so the
   * hat block looks broken. Advance the thread ourselves, and if it never left
   * the hat at all, start the script from its first real block instead.
   */
  const fireHat = () => {
    try {
      if (typeof Scratch.vm !== "object" || !Scratch.vm) {
        return;
      }
      const runtime = Scratch.vm.runtime;
      if (!runtime || typeof runtime.startHats !== "function") {
        return;
      }

      let threads = null;
      try {
        threads = runtime.startHats("zhread_whenDone");
      } catch (e) {
        threads = null;
      }

      const started = Array.isArray(threads)
        ? threads.filter((thread) => thread)
        : [];
      let moved = 0;

      for (const thread of started) {
        try {
          if (
            typeof thread.peekStack === "function" &&
            thread.peekStack() === thread.topBlock &&
            typeof thread.goToNextBlock === "function"
          ) {
            thread.goToNextBlock();
          }
          if (
            typeof thread.peekStack === "function" &&
            thread.peekStack() !== null &&
            thread.peekStack() !== thread.topBlock
          ) {
            moved += 1;
          }
        } catch (e) {
          // Ignore this thread; the fallback below still applies.
        }
      }

      if (moved > 0) {
        return;
      }

      const next = firstHatNextBlock(runtime);
      if (next && typeof runtime._pushThread === "function") {
        runtime._pushThread(next.blockId, next.target);
      }
    } catch (e) {
      fail(e);
    }
  };

  const stopEverything = () => {
    sequence++; // stale runs notice the change and leave
    active = false;
    try {
      if (synth) {
        synth.cancel();
      }
    } catch (e) {
      fail(e);
    }
    const pending = waiters.slice();
    waiters.length = 0;
    for (const resolve of pending) {
      try {
        resolve(false);
      } catch (e) {
        fail(e);
      }
    }
  };

  /**
   * Resolves when the text finishes, is stopped, or fails. Command blocks drop the promise.
   * @param {unknown} text
   * @param {string} [forcedVoice]
   */
  const speak = (text, forcedVoice) => {
    if (text === null || text === undefined) {
      return Promise.resolve();
    }
    const raw = String(text);
    if (!raw.trim()) {
      return Promise.resolve();
    }
    if (!synth) {
      fail(Scratch.translate("This environment has no speech synthesis API"));
      return Promise.resolve();
    }

    stopEverything();
    const runId = ++sequence;
    const chunks = splitText(raw);
    active = true;

    return new Promise((resolve) => {
      let settled = false;
      let offlineOnly = false;
      let index = 0;

      const settle = (finished) => {
        if (settled) {
          return;
        }
        settled = true;
        const at = waiters.indexOf(settle);
        if (at >= 0) {
          waiters.splice(at, 1);
        }
        if (runId !== sequence) {
          // A newer utterance took over; this run must not fire the hat.
        } else {
          active = false;
          if (finished) {
            fireHat();
          }
        }
        resolve();
      };

      waiters.push(settle);

      const step = () => {
        if (runId !== sequence) {
          settle(false);
          return;
        }
        if (index >= chunks.length) {
          settle(true);
          return;
        }
        attempt(chunks[index++], false);
      };

      /** @param {string} piece @param {boolean} isRetry */
      const attempt = (piece, isRetry) => {
        if (runId !== sequence) {
          return;
        }
        const useLocalOnly = offlineOnly || isRetry;

        let utterance;
        try {
          utterance = buildUtterance(piece, forcedVoice, useLocalOnly);
        } catch (e) {
          fail(e);
          settle(false);
          return;
        }

        let handled = false;
        let watchdog = null;

        const next = () => {
          if (handled) {
            return;
          }
          handled = true;
          if (watchdog) {
            clearTimeout(watchdog);
            watchdog = null;
          }
          setTimeout(step, 30);
        };

        utterance.onend = next;
        utterance.onerror = (event) => {
          if (handled) {
            return;
          }
          const kind = event && event.error ? String(event.error) : "error";

          // An online voice failed (usually because the network is down). Retry this piece
          // with a voice that is installed locally.
          const networkIssue =
            /network|synthesis-failed|audio-busy|lang-not-supported|voice-unavailable|text-too-long/i.test(
              kind
            );
          if (
            !isRetry &&
            !useLocalOnly &&
            networkIssue &&
            utterance.voice &&
            utterance.voice.localService === false
          ) {
            handled = true;
            if (watchdog) {
              clearTimeout(watchdog);
              watchdog = null;
            }
            offlineOnly = true;
            fail(
              Scratch.translate(
                {
                  default:
                    "Online voice unavailable ({error}), retrying with a local voice",
                  description:
                    "{error} is a technical error code such as network or synthesis-failed",
                },
                { error: kind }
              )
            );
            setTimeout(() => attempt(piece, true), 40);
            return;
          }

          if (kind !== "interrupted" && kind !== "canceled") {
            fail(
              Scratch.translate(
                {
                  default: "Speech failed: {error}",
                  description:
                    "{error} is a technical error code such as synthesis-failed",
                },
                { error: kind }
              )
            );
          }
          next();
        };

        // Some browsers never fire onend for long utterances, so do not wait forever.
        watchdog = setTimeout(
          () => {
            fail(Scratch.translate("This part took too long, skipping it"));
            next();
          },
          Math.min(20000, 320 * piece.length + 2500)
        );

        try {
          synth.speak(utterance);
        } catch (e) {
          fail(e);
          next();
        }
      };

      step();
    });
  };

  /* ----------------------------------- blocks ---------------------------------- */

  class ReadAloud {
    getInfo() {
      return {
        id: "zhread",
        name: Scratch.translate("Read Aloud"),
        color1: "#1f6f8b",
        color2: "#175a72",
        color3: "#11485c",
        blocks: [
          {
            opcode: "speak",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              default: "speak [TEXT]",
              description:
                "Starts speaking the text immediately. Any speech that was still running is stopped first.",
            }),
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate(
                  "Hello! This is the system voice."
                ),
              },
            },
          },
          {
            opcode: "speakWait",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              default: "speak [TEXT] and wait until it finishes",
              description:
                "Waits until the whole text has been spoken before running the next block.",
            }),
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate(
                  "This block continues only after the sentence ends."
                ),
              },
            },
          },
          {
            opcode: "speakWith",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("speak [TEXT] with voice [VOICE]"),
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Let's try another voice."),
              },
              VOICE: {
                type: Scratch.ArgumentType.STRING,
                menu: "VOICE_MENU",
                defaultValue: "auto",
              },
            },
          },
          {
            opcode: "stop",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stop speaking"),
          },
          {
            opcode: "pause",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("pause speaking"),
          },
          {
            opcode: "resume",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("resume speaking"),
          },
          {
            opcode: "setVolume",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set volume to [N] %"),
            arguments: {
              N: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          {
            opcode: "setRate",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              default: "set rate to [N] %",
              description:
                "[N] is a percentage. 100 is normal speed, 200 is twice as fast, 50 is half speed.",
            }),
            arguments: {
              N: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          {
            opcode: "setPitch",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              default: "set pitch to [N] %",
              description:
                "[N] is a percentage. 100 is the normal pitch, 200 is higher, 50 is lower.",
            }),
            arguments: {
              N: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          {
            opcode: "setLang",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set language to [LANG]"),
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                menu: "LANG_MENU",
                defaultValue: "auto",
              },
            },
          },
          {
            opcode: "setVoice",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              default: "set voice to [VOICE]",
              description:
                "[VOICE] accepts a voice name as returned by the 'available voices' block, or automatic, or offline.",
            }),
            arguments: {
              VOICE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "auto",
              },
            },
          },
          "---",
          {
            opcode: "speaking",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("speaking?"),
          },
          {
            opcode: "currentVoice",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current voice"),
          },
          {
            opcode: "voiceList",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              default: "available voices",
              description:
                "Returns a list of voices installed on this computer, one per line, in the form name | language | local or online.",
            }),
          },
          {
            opcode: "hasChinese",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("has a Chinese voice?"),
          },
          {
            opcode: "ready",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("speech available?"),
          },
          {
            opcode: "lastError",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("last error"),
          },
          {
            opcode: "whenDone",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when speech finishes"),
            isEdgeActivated: false,
            shouldRestartExistingThreads: true,
          },
        ],
        menus: {
          VOICE_MENU: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate({
                  default: "automatic (best voice)",
                  description:
                    "Chooses the best sounding voice for the detected language, preferring locally installed voices so it keeps working offline.",
                }),
                value: "auto",
              },
              {
                text: Scratch.translate("offline voices only"),
                value: "offline",
              },
            ],
          },
          LANG_MENU: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate({
                  default:
                    "automatic (Mandarin if the text has Chinese characters)",
                  description:
                    "Looks at the text each time it speaks: text with Chinese characters is spoken as Mandarin, everything else as English.",
                }),
                value: "auto",
              },
              {
                text: Scratch.translate("Mandarin (China)"),
                value: "zh-CN",
              },
              {
                text: Scratch.translate("Mandarin (Taiwan)"),
                value: "zh-TW",
              },
              {
                text: Scratch.translate("Cantonese"),
                value: "zh-HK",
              },
              {
                text: Scratch.translate("English"),
                value: "en-US",
              },
            ],
          },
        },
      };
    }

    speak(args) {
      try {
        speak(args.TEXT);
      } catch (e) {
        fail(e);
      }
    }

    speakWait(args) {
      try {
        return speak(args.TEXT);
      } catch (e) {
        fail(e);
        return undefined;
      }
    }

    speakWith(args) {
      try {
        speak(args.TEXT, Scratch.Cast.toString(args.VOICE));
      } catch (e) {
        fail(e);
      }
    }

    stop() {
      try {
        stopEverything();
      } catch (e) {
        fail(e);
      }
    }

    pause() {
      try {
        if (synth) {
          synth.pause();
        }
      } catch (e) {
        fail(e);
      }
    }

    resume() {
      try {
        if (synth) {
          synth.resume();
        }
      } catch (e) {
        fail(e);
      }
    }

    setVolume(args) {
      settings.volume = clamp(num(args.N, 100) / 100, 0, 1);
    }

    setRate(args) {
      const percent = clamp(num(args.N, 100), 10, 1000);
      settings.rate = clamp(percent / 100, 0.1, 10);
    }

    setPitch(args) {
      const percent = clamp(num(args.N, 100), 0, 200);
      settings.pitch = clamp(percent / 100, 0, 2);
    }

    setLang(args) {
      const value = Scratch.Cast.toString(args.LANG);
      settings.lang = ["auto", "zh-CN", "zh-TW", "zh-HK", "en-US"].includes(
        value
      )
        ? value
        : "auto";
    }
    setVoice(args) {
      settings.voice = Scratch.Cast.toString(args.VOICE);
    }

    speaking() {
      try {
        if (!synth) {
          return false;
        }
        return !!(active || synth.speaking);
      } catch (e) {
        fail(e);
        return false;
      }
    }

    currentVoice() {
      try {
        const wanted = settings.lang === "auto" ? "zh-CN" : settings.lang;
        const voice = pickVoice(settings.voice, wanted);
        if (!voice) {
          return Scratch.translate("(no voices available)");
        }
        const where =
          voice.localService === false
            ? Scratch.translate("online")
            : Scratch.translate("local");
        return (
          String(voice.name || "") +
          " | " +
          String(voice.lang || "") +
          " | " +
          where
        );
      } catch (e) {
        fail(e);
        return "";
      }
    }

    voiceList() {
      try {
        const all = allVoices();
        if (!all.length) {
          return Scratch.translate(
            "(voices have not loaded yet, click the page or speak once)"
          );
        }
        const chinese = [];
        const other = [];
        for (const voice of all) {
          const tag = languageOf(voice);
          if (tag.indexOf("zh") === 0 || tag.indexOf("yue") === 0) {
            chinese.push(voice);
          } else {
            other.push(voice);
          }
        }
        return chinese
          .concat(other)
          .slice(0, 40)
          .map((voice) => {
            const tag = languageOf(voice);
            const isChinese =
              tag.indexOf("zh") === 0 || tag.indexOf("yue") === 0;
            const where =
              voice.localService === false
                ? Scratch.translate("online")
                : Scratch.translate("local");
            return (
              (isChinese ? "* " : "  ") +
              String(voice.name || "") +
              " | " +
              String(voice.lang || "") +
              " | " +
              where
            );
          })
          .join("\n");
      } catch (e) {
        fail(e);
        return "";
      }
    }

    hasChinese() {
      try {
        return allVoices().some((voice) => {
          const tag = languageOf(voice);
          return tag.indexOf("zh") === 0 || tag.indexOf("yue") === 0;
        });
      } catch (e) {
        fail(e);
        return false;
      }
    }

    ready() {
      return !!synth;
    }

    lastError() {
      return lastError;
    }

    whenDone() {
      // Hat blocks have no body; they are started by startHats().
    }
  }

  Scratch.extensions.register(new ReadAloud());
})(Scratch);
