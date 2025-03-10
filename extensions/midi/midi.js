// Name: MIDI
// ID: extmidi
// Description: An extension to use the WebMidi API for midi input/output.
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Midi must be run unsandboxed");
  }

  const EXT_ID = "extmidi";

//#region utils

  /** 
   * This section includes logic to map raw data coming from the 'midimessage'
   * event into a friendly object representation of the event
   * 
   * 
   * // definition for the parsed midi event
   * @typedef {'noteOn' | 'noteOff' | 'cc' | 'polyTouch' | 'programChange' | 'pitchBend' | 'channelPressure' | 'songPosition' | 'songSelect' | 'clock' | 'start' | 'continue' | 'stop' | 'activeSensing' | 'reset'} EventType
   * @typedef {object} MidiEvent
   * @property {EventType | 'rest'} type
   * @property {number} [value1]
   * @property {number} [value2]
   * @property {number} [channel]
   * @property {number} [device]
   * @property {number} [time]
   * @property {number} [pitch]
   * @property {number} [velocity]
   * @property {number} [cc]
   * @property {number} [value]
   * @property {number} [pos]
   * @property {number} [dur]
   * @property {string} [_str] cached string representation of this event
   * 
   * 
   * @typedef {object} FormatOptions
   * @property {number} [tempo]
   * @property {boolean} [useFlats]
   * @property {boolean} [noMinify]
   * @property {'omit' | 'timestamp' | 'absolute'} [timestampFormat]
   * @property {number} [startTimestamp]
   * @property {boolean} [fixedWidth]
   * @property {boolean} [useHex]
   * @property {number} [defaultOctave]
   * 
   */

  /**
   * MIDI commands with code, name, and parameters
   * From: https://ccrma.stanford.edu/~craig/articles/linuxmidi/misc/essenmidi.html
   * https://www.midi.org/specifications/item/table-1-summary-of-midi-message
   *
   * adapted from https://github.com/fheyen/musicvis-lib/blob/905edbdc8280e8ca76a329ffc83a160f3cda674a/src/fileFormats/Midi.js#L41
   * 
   * each key (the "EventType" relates to a raw midi "command". The "shorthand" could
   * be used to format midi events to string (future). param1 and param2 determine what property of the object the value1 + value2 bytes mean (i.e. noteOn gets pitch + velocity, cc gets cc# and value)
   */
  const SHARPS = "C C# D D# E F F# G G# A A# B".split(" ");
  const FLATS = "C Db D Eb E F Gb G Ab A Bb B".split(" ");
  function midiPitchToNoteName(midi, { useFlats = false, fixedWidth = false } = {}) {
    if (!isFinite(midi)) return "";
    let chroma = (useFlats ? FLATS : SHARPS)[midi % 12];
    if (fixedWidth) chroma = chroma.padEnd(2, "_");
    const octave = Math.floor(midi / 12) - 1;
    return `${chroma}${octave}`;
  }
  /**
   * convert a note string name (or raw midi number) to midi number value
   * @param {string} note 
   * @param {number} [defaultOctave] 
   * @returns {number | null}
   */
  function noteNameToMidiPitch(note, defaultOctave = 4) {
    const parts = /(?<pitch>[A-G])(?<flat>[b♭]+)?(?<sharp>[#♯]+)?_?(?<octave>-?\d+)?/i.exec(note || '');
    if (!parts?.groups) {
      const numVal = typeof note === 'string' ? parseInt(note.trim(), 10) : +note;
      return (numVal >= 0 && numVal <= 127) ? numVal : null;
    }
    const { pitch, octave, flat, sharp } = parts.groups;
    let chroma = SHARPS.indexOf(pitch.toUpperCase()) - (flat?.length || 0) + (sharp?.length || 0);
    const height = octave ? parseInt(octave, 10) : defaultOctave;
    return chroma + ((height + 1) * 12);
  }
  function parseNumValue(text, opts) {
    if (typeof text === 'number') return text;
    if (!text) return undefined;
    text = text.trim();
    const useHex = opts?.useHex ?? /[a-f]/i.test(text);
    const radix = useHex ? 16 : 10;
    const val = parseInt(text, radix);
    return isNaN(val) ? undefined : val;
  }
  function formatHex(value, pad = 2) {
    return Math.round(value).toString(16).padStart(pad, "0");
  }

  /**
   * IMPORTANT! This mapping is key in translating raw midi messages to/from their object/string representation.
   * @typedef {object} EventSpec Definition of midi event type and how to convert to/from raw midi
   * @property {string} shorthand Short name used in string representation
   * @property {number} command   Actual midi command bytes (1st byte along with channel)
   * @property {string} description English description of type TODO - translate if ever exposed in UI
   * @property {'pitch' | 'cc' | 'value'} [param1] - corresponding key for 2nd byte of raw message
   * @property {'velocity' | 'value'} [param2] - corresponding key for 3rd byte of raw message
   * @property {'value'} [highResParam] - corresponding key for "high res" param that goes from 0-16384 instead of 127
   * @property {[data1: number, data2: number]} [defaults] - default values if not otherwise specified
   */

  /**
   * @type {Record<EventType, EventSpec>}
   */
  const eventMapping = {
    noteOn: { shorthand: "note", command: 144, description: "Note-on", param1: "pitch", param2: "velocity", defaults: [60, 96] },
    noteOff: { shorthand: "off", command: 128, description: "Note-off", param1: "pitch", param2: "velocity", defaults: [60, 0] },
    cc: { shorthand: "cc", command: 176, description: "Continuous controller", param1: "cc", param2: "value", defaults: [0, 0] },
    polyTouch: { shorthand: "touch", command: 160, description: "Aftertouch", param1: "pitch", param2: "value", defaults: [60, 64] },
    programChange: { shorthand: "program", command: 192, description: "Patch change", param1: "value" },
    pitchBend: { shorthand: "bend", command: 224, description: "Pitch bend", highResParam: "value" },
    channelPressure: { shorthand: "pressure", command: 208, description: "Channel Pressure", param1: "value" },
    songPosition: { shorthand: "songpos", command: 242, description: "Song Position Pointer (Sys Common)", highResParam: "value" },
    songSelect: { shorthand: "songsel", command: 243, description: "Song Select (Sys Common)", param1: "value" },
    clock: { shorthand: "clock", command: 248, description: "Timing Clock (Sys Realtime)" },
    start: { shorthand: "start", command: 250, description: "Start (Sys Realtime)" },
    continue: { shorthand: "continue", command: 251, description: "Continue (Sys Realtime)" },
    stop: { shorthand: "stop", command: 252, description: "Stop (Sys Realtime)" },
    activeSensing: { shorthand: "ping", command: 254, description: "Active Sensing (Sys Realtime)" },
    reset: { shorthand: "reset", command: 255, description: "System Reset (Sys Realtime)" }
  };
  /** @type {Map<number, EventType>} */
  // @ts-ignore
  const commandLookup = new Map(Object.entries(eventMapping).map(([key, { command }]) => [command, key]));
  /** @type {Map<string, EventType>} */
    const shorthandLookup = Object.fromEntries([
    ...Object.entries(eventMapping).map(([key, { shorthand }]) => [shorthand, key]),
    ...Object.keys(eventMapping).map(key => [key.toLowerCase(), key])
  ]);
  const shorthands = Object.fromEntries(Object.entries(eventMapping).map(([key, { shorthand }]) => [key, shorthand]));


  /** aliases for MidiEvent keys
   * the allows for more permissive translation of input strings, i.e. ch10 === channel=10
   * @type {Record<string, keyof MidiEvent>} */
  const paramLookup = {
    type: 'type', note: 'pitch', pitch: 'pitch',
    ch: 'channel', channel: 'channel',
    dev: 'device', device: 'device',
    t: 'time', time: 'time', "@": 'time',
    dur: 'dur', duration: 'dur',
    pos: 'pos', value: 'value2'
  };
  
  // These are how different midi event keys are split. ch and dev are special cases that don't include =, since they're common. Other params use = to allow arbitrary additional properties if needed
  const PREFIX_CHANNEL = "ch";
  const PREFIX_DEVICE = "dev";
  const PREFIX_WHEN = 't=';
  const PREFIX_POS = 'pos=';
  const PREFIX_DURATION = 'dur=';
  /** Used when creating lists - treat ~ as empty no value */
  const REST_LITERAL = '~';

  /**
   * @param {string} value 
   * @returns {EventType | undefined}
   */
  function normalizeType(value) {
    if (typeof value === "number") {
      return commandLookup.get(value);
    }
    if (typeof value !== "string") return undefined;
    return eventMapping[value] !== undefined
      ? value
      : shorthandLookup[value.toLowerCase()];
  }

  function formatNumValue(value, opts) {
    const str = opts?.useHex ? formatHex(value) : value.toFixed().padStart(opts?.fixedWidth ? 2 : 3, "0");
    return str;
  }
  function formatDefault(type, value, value2, opts) {
    return `${type} ${formatNumValue(value, opts)}${value2 != undefined ? " " + formatNumValue(value2, opts) : ""}`;
  }
  function formatNoteType(type, note, value, opts = {}) {
    return `${type ? type + " " : ""}${midiPitchToNoteName(note, opts)} ${formatNumValue(value, opts)}`;
  }
  /** 
   * This is a mapping of midi events and their string representation
   * @type {Record<EventType, (event: MidiEvent, opts: FormatOptions) => string>}
   */
  const formatters = {
    noteOn({ value1: note, value2: velocity = eventMapping.noteOn.defaults[1] }, opts = {}) {
      return formatNoteType(opts?.noMinify ? shorthands.noteOn : undefined, note, velocity, opts);
    },
    noteOff({ value1: note }, opts = {}) {
      return formatNoteType(opts?.noMinify ? shorthands.noteOff : undefined, note, 0, opts);
    },
    polyTouch({ value1: note, value2: value = eventMapping.polyTouch.defaults[1] }, opts = {}) {
      return formatNoteType(shorthands.polyTouch, note, value, opts);
    },
    cc({ value1: cc, value2: value }, opts) {
      return formatDefault(shorthands.cc, cc, value, opts);
    },
    programChange({ value1: program }, opts) {
      return formatDefault(shorthands.programChange, program, undefined, opts);
    },
    channelPressure: ({ value1: value }, opts) => formatDefault(shorthands.channelPressure, value, undefined, opts),
    pitchBend({ value1, value2 }, opts) {
      if (value1 == undefined) {
        [value1, value2] = [0, 64];
      }
      return `${shorthands.pitchBend} ${formatHighResValue(value1, value2, opts)}`;
    },
    songPosition({ value1 = 0, value2 }, opts) {
      return `${shorthands.songPosition} ${formatHighResValue(value1, value2, opts)}`;
    },
    songSelect: ({ value1 }, opts) => formatDefault(shorthands.songSelect, value1, undefined, opts),
    // tuneRequest: () => shorthands.tuneRequest,
    continue: () => shorthands.continue,
    activeSensing: () => shorthands.activeSensing,
    clock: () => shorthands.clock,
    start: () => shorthands.start,
    stop: () => shorthands.stop,
    reset: () => shorthands.reset
  };


  /**
   * convert midi event to string.
   * The opts includes more formatting options than available through the current scratch blocks available.
   * @param {MidiEvent} event 
   * @param {FormatOptions} opts 
   * @returns 
   */
  function midiToString(event, opts = {}) {
    const { noMinify } = opts;
    let type = shorthands[event.type];
    const spec = eventMapping[event.type] ?? {};
    // ensure these are set properly
    const {
      value1 = event[spec.param1] ?? event[spec.highResParam],
      value2 = event[spec.param2]
    } = event;
    const formatter = formatters[event.type];
    if (!formatter) {
      console.debug(`unknown event type ${event.type}`);
      return "";
    }
    let msg = formatter({...event, value1, value2}, opts);
    if (event.channel != undefined || noMinify) {
      msg += formatChannel(event.channel, opts);
    }
    if (event.device != undefined || noMinify) {
      msg += formatDevice(event.device, opts);
    }
    if (event.time != undefined) {
      msg += formatTime(event, opts);
    }
    if (event.pos) {
      msg += formatPosition(event.pos, opts);
    }
    if (event.dur) {
      msg += formatDuration(event.dur, opts);
    }
    return msg;
  }

  /**
   * convert a string representation of a note to a midievent
   * FUTURE - support unicode note durations? https://en.wikipedia.org/wiki/Musical_Symbols_(Unicode_block)
   * @param {string} text 
   * @param {FormatOptions} opts 
   * @returns {MidiEvent}
   */
  function stringToMidi(text, opts = {}) {
    if (typeof text !== 'string') text = `${String(text) ?? ''}`;
    const fullRe = /^\s*(?<type>[a-zA-Z]{2,})?\s*((?<pitch>[A-G][#b♯♭_]*-?\d?)|(?<data1>\b-?[0-9a-f]{1,5}\b))?\s*(?<data2>\b[0-9a-f]{1,3}\b)?\s*(?<keyvals>.+)\s*$/;
    const match = fullRe.exec(text);
    if (!match?.groups) return null;
    // turn key=val other=32.43 @14.23 into {key: 'val', other: 32.43, time=14.23}
    // ch/dev/@ (channel, device, time) are special keys that don't need =
    const keyvalRe = /\s*(?<key>\w+(?=\=)|ch|dev|@)=?(?<val>\S+)\s*/g;
    /** @type {{[K in keyof MidiEvent]?: string}} */
    const extras = Object.fromEntries(
      [...match.groups.keyvals?.matchAll(keyvalRe)]
        // paramLookup converts "t=2" into "time=2"
        .map(({groups: {key, val}}) => [paramLookup[key] || key, val])
    );
    let {
      type: shorthand = extras.type,
      pitch = extras.pitch, data1, data2
    } = match.groups;

    // midi value1 can be specified as pitch or as number
    const value1 = pitch
      ? noteNameToMidiPitch(pitch, opts.defaultOctave)
      : parseNumValue(data1, opts);

    let value2 = parseNumValue(data2, opts);

    /** @type {MidiEvent} */
    const event = {
      type: shorthand === REST_LITERAL
        ? 'rest'
        : normalizeType(shorthand),
      ...(value1 != undefined) && {value1},
      ...(value2 != undefined) && {value2},
      channel: parseNumValue(extras.channel, opts),
      device: parseNumValue(extras.device, opts),
      ...extras.time && { time: parseTimespan(extras.time)},
      // REVIEW is pos even needed? it's for setting output in beats, but setting time would make more sense instead
      ...extras.pos && { pos: parseFraction(extras.pos)},
      ...extras.dur && { dur: parseFraction(extras.dur)},
    };

    // default to note event if has pitch (off if velocity = 0)
    if (!event.type && value1 >= 0) {
      event.type = 'noteOn';
    } else if (!event.type) {
      // no type set, invalid input
      return null;
    }
    const spec = eventMapping[event.type];
    switch (event.type) {
      case "noteOn":
      case "noteOff":
        if (value1 == undefined) return null;
        if (value2 === 0) event.type = 'noteOff';
        if (value2 == undefined) {
          event.value2 = event.velocity ?? event.value ?? (event.type === 'noteOn' ? 96 : 0);
        }
        break;
      case "polyTouch":
        // these types have note pitch
        if (event.value1 == undefined) return null;
        if (value2 == undefined) {
          event.value2 = event.value ?? event.velocity ?? 64;
        }
        break;
      case "cc":
        if (value2 == undefined) {
          event.value2 = event.value;
          value2 = event.value2
        }
        if (value1 == undefined || value2 == undefined) return null;
        break;
      case "programChange":
      case "channelPressure":
      case "songSelect":
        // default to 0 for these types
        event.value1 ||= event.value ?? 0;
        break;
      case "songPosition":
      case "pitchBend":
        if (value1 == undefined) return null;
        // these two types have a higher precision value
        const { value: highResValue, ...normedValues } = parseHighResValue(value1, value2);
        Object.assign(event, normedValues);
        event[spec.highResParam ?? "value"] = highResValue;
        break;
      case "clock":
      case "start":
      case "continue":
      case "stop":
      case "activeSensing":
      case "reset":
        break;
      case "rest":
      // do nothing
    }
    // look at eventMap to give 'friendly' names to value1/value2 (ex. "pitch", "velocity")
    if (spec?.param1 && event.value1 != undefined) {
      event[spec.param1] = event.value1;
    }
    if (spec?.param2 && event.value2 != undefined) {
      event[spec.param2] = event.value2;
    }
    return event;
  }

  function formatChannel(channel = 0, opts) {
    const str = opts?.useHex ? formatHex(channel, 1) : channel.toFixed().padStart(2, "0");
    return ` ${PREFIX_CHANNEL}${str}`;
  }
  function formatDevice(device = 0, opts) {
    const str = opts?.useHex ? formatHex(device, 1) : device.toFixed();
    return ` ${PREFIX_DEVICE}${str}`;
  }
  function formatTime({ time = undefined }, { noMinify = false, timestampFormat = "absolute", startTimestamp = 0 }) {
    if (timestampFormat === "omit" || time == undefined) {
      return "";
    }
    if (timestampFormat === "absolute") {
      return ` ${PREFIX_WHEN}${time.toFixed(3)}`;
    }
    const ONE_DAY = 1e3 * 60 * 60 * 24;
    let val = (time - startTimestamp) % ONE_DAY;
    return ` ${PREFIX_WHEN}${formatTimespan(val)}`;
  }

  // TODO FUTURE add in opts flag to use fractions or not
  function formatPosition(value, opts) {
    return `${PREFIX_POS}${formatFraction(value)}`
  }

  // TODO FUTURE add in opts flag to use fractions or not
  function formatDuration(value, opts) {
    return `${PREFIX_DURATION}${formatFraction(value)}`
  }


  function formatTimespan(seconds, hoursOptional = true) {
    const ms = 1e3 * (seconds % 1);
    let t = Math.floor(seconds);
    const s = t % 60;
    const m = Math.floor(t / 60);
    const h = Math.floor(t / 3600);
    const parts = hoursOptional && h === 0 ? [m, s] : [h, m, s];
    return `${parts.map((p) => p.toFixed(0).padStart(2, "0")).join(":")}.${ms.toFixed().padEnd(3, "0")}`;
  }
  /**
   * 
   * @param {string} text 
   * @returns 
   */
  function parseTimespan(text) {
    if (!text) return 0;
    // split into [hh]:mm:ss.000 parts
    const parts = text.split(':');
    // somewhat unnecessarily clever method to sum [hh][mm][ss]
    // by incrementing the scale from [1, 60, 3600].
    // goes right to left because hours and minutes are optional
    const [value] = parts.reduceRight(([acc, scale], part) => {
      const val = (parseFloat(part) || 0) * scale;
      return [acc + val, scale * 60];
    }, [0, 1]);
    return value;
  }
  function parseFraction(text) {
    if (typeof text !== 'string') {
      return +text || 0;
    }
    const [top, bottom] = text.split('/');
    return (parseFloat(top) / (parseFloat(bottom) || 1)) || 0;
  }
  function formatFraction(value, threshold = 2e-3) {
    for (let d of [4, 3, 10, 8, 1]) {
      const numerator = value * d;
      if (Math.abs(numerator % 1) <= threshold) {
        return `${numerator}/${d}`;
      }
    }
    // truncate to milliseconds (0.001)
    return `${value}`.replace(/(\.\d{3})\d+$/, '$1');
  }

  function valueToMsbLsb(value) {
    return {
      value1: value & 127,
      value2: value >> 7
    };
  }
  function msbLsbToValue(lsb, msb = 0) {
    return (msb << 7) + lsb;
  }
  function parseHighResValue(value1, value2) {
    const value = typeof value2 == undefined ? value1 : msbLsbToValue(value1, value2);
    return {
      value,
      ...valueToMsbLsb(value)
    };
  }
  function formatHighResValue(value1, value2, opts = {}) {
    if (opts?.useHex) {
      return `${shorthands.pitchBend} ${formatHex(value1)} ${formatHex(value2)}`;
    }
    const value = msbLsbToValue(value1, value2);
    let txt = value.toFixed();
    if (opts?.fixedWidth) {
      txt = txt.padStart(5, " ");
    }
    return txt;
  }

  /**
   * parse raw input midi bytes
   * @param {Uint8Array} data 
   * @returns {MidiEvent | null}
   */
  function rawMessageToMidi(data) {
    const [commandAndChannel, value1, value2] = data;
    const channel = commandAndChannel % 16;
    const command = commandAndChannel - channel;
    const type = commandLookup.get(command);
    if (!type) {
      console.debug("unknown command type", command);
      return null;
    }
    /** @type {MidiEvent} */
    const event = {
      type,
      channel: channel + 1,
      ...value1 != undefined && { value1 },
      ...value2 != undefined && { value2 }
    };
    const spec = eventMapping[type];
    if (spec?.param1 && event.value1 != undefined) {
      event[spec.param1] = event.value1;
    }
    if (spec?.param2 && event.value2 != undefined) {
      event[spec.param2] = event.value2;
    }
    if (spec.highResParam) {
      const { value } = parseHighResValue(value1, value2);
      event[spec.highResParam] = value;
    }
    return event;
  }
  /**
   * convert midi event into bytes expected by MidiOut.send
   * @param {MidiEvent} event
   * @returns {Uint8Array}
   */
  function midiToRawMessage(event) {
    let {
      type,
      value1,
      value2,
      channel = 1
    } = event;
    const spec = eventMapping[type];
    // return empty if not valid event
    if (!spec) return new Uint8Array();
    const commandAndChannel = spec.command + Math.max(channel - 1, 0);
    if (spec.param1 && value1 == undefined) {
      value1 = (event[spec.param1] ?? spec.defaults?.[0]) || 0;
    }
    if (spec.param2 && value2 == undefined) {
      value2 = (event[spec.param2] ?? spec.defaults?.[1]) ?? undefined;
    }
    if (spec.highResParam && event.value != undefined) {
      const highRes = parseHighResValue(event.value);
      [value1, value2] = [highRes.value1, highRes.value2];
    }
    return new Uint8Array([commandAndChannel, value1, ...(value2 !== undefined ? [value2] : [])]);
  }
  /**
   * read the "pos" / "dur" values of an event as relative time vs. a fixed wall-clock time
   * @param {Pick<MidiEvent, 'time' | 'pos' | 'dur'>} event 
   * @param {number} [offsetMs] time to return relative to. Default is now
   */
  function getMidiOffsetTime(event, offsetMs = window.performance.now()) {
    const { pos = 0, dur } = event;
    return {
      start: offsetMs + (pos * 1000),
      ...(dur > 0) && {
        end: offsetMs + ((pos + dur) * 1000)
      }
    };
  }
  function isPitchedEvent(type) {
    return !!type && (type === "noteOn" || type === "noteOff" || type === "polyTouch");
  }

  // Make a full array of notes in full midi range from 0 (C-1) to 127 (G-9)
  const MIDI_NOTES = "_".repeat(11).split('')
    .flatMap((_, i) => SHARPS.map(c => `${c}${i - 1}`))
    .slice(0, 128);

  /**
   * represents "any note" or "any device" etc. in menus
   */
  const ANY_TYPE = "*";
  /**
   * Scratch menu items of @see {MidiEvent} properties
   */
  const eventProps = {
    type: { key: "type", text: Scratch.translate("Event Type") },
    pitch: { key: "pitch", text: Scratch.translate("Note Pitch") },
    velocity: { key: "velocity", type: "noteOn", text: Scratch.translate("Velocity") },
    ccNumber: { key: "cc", text: Scratch.translate("Continuous Controller #") },
    ccValue: { key: "value", type: "cc", text: Scratch.translate("CC Value") },
    channel: { key: "channel", text: Scratch.translate("Channel") },
    device: { key: "device", text: Scratch.translate("Device") },
    pitchbend: { key: "value", type: "pitchBend", text: Scratch.translate("Pitch Bend") },
    aftertouch: { key: "value", type: "polyTouch", text: Scratch.translate("Aftertouch") },
    time: { key: "time", text: Scratch.translate("Timestamp") }
  };

//#endregion utils

//#region wrapper
  /**
   * This is a singleton wrapper class around the WebMIDI API. It:
   * 1) Handles requesting API permission and reporting Input/Output devices
   * 2) Translate raw midi input events into friendlier @see {MidiEvent} objects
   * 3) Sends out midi events, translating MidiEvents into the raw midi payload
   * 4) Keeps track of "note on"/"note off" messages to support "panic" stopping midi output
   * 
   * It extends the native EventTarget class to dispatch events
   */
  class MidiBackend extends EventTarget {
    constructor() {
      super();
      this.status = "pending" /* Initial */;
      /** @type {MIDIInput[]} */
      this.inputs = [];
      /** @type {MIDIOutput[]} */
      this.outputs = [];
      this._init = undefined;
      /** @type {MidiEvent} */
      this._defaultOutputEvent = {
        type: 'noteOn',
        channel: 1,
        device: 0,
        pitch: 60,
        dur: 0.5,
        velocity: 196
      }
      // TIP! If you use arrow functions on class methods then 'this' is automatically bound correctly, even if using as event listener
      this.refreshDevices = () => {
        for (const input of this.access.inputs.values()) {
          if (!this.inputs.some((d) => d.id === input.id)) {
            input.addEventListener("midimessage", this._onInputEvent);
            input.addEventListener("statechange", this._onDeviceStateChange);
            this.inputs.push(input);
          }
        }
        for (const output of this.access.outputs.values()) {
          if (!this.outputs.some((d) => d.id === output.id)) {
            this.outputs.push(output);
          }
        }
      };
      this._onDeviceStateChange = (event) => {
        const { port } = event;
        if (!port) return;
        const { type, id, name } = port;
        const deviceList = type === "input" ? this.inputs : this.outputs;
        const index = deviceList.findIndex((dev) => dev.id === id);
        if (index === -1) {
          this.refreshDevices();
          return;
        }
        this._emit("device:status", { index, id, name, type, state: port.state });
      };
      this._onInputEvent = (event) => {
        const {
          target: device,
          data,
          timeStamp
        } = event;
        if (!data) return;
        const deviceIndex = this.inputs.indexOf(device);
        const midiEvent = rawMessageToMidi(data);
        if (!midiEvent) {
          console.warn("Unable to parse message", data);
          this._emit("midi:unhandled", event);
          return;
        } else {
          midiEvent.time = timeStamp / 1000;
          if (deviceIndex !== -1) {
            midiEvent.device = deviceIndex;
          }
          midiEvent._str = midiToString(midiEvent, { noMinify: true });
          this._emit("midi", midiEvent);
        }
      };
    }
    get defaultInput() {
      return this.inputs.find(d => d.state === 'connected');
    }
    get defaultOutput() {
      return this.outputs.find(d => d.state === 'connected');
    }
    async initialize({ sysex = false, force = false, timeoutMS = 1e3 * 30 } = {}) {
      if (this._init && !force) {
        return this._init;
      }
      if (!navigator.requestMIDIAccess) {
        return false;
      }
      return this._init = (async () => {
        this.status = "initializing" /* Initializing */;
        this._emit("status", { status: this.status });
        try {
          let timer;
          const whenTimeout = new Promise((resolve, reject) => {
            timer = setTimeout(() => reject(new DOMException("Timeout waiting for midi access")), timeoutMS);
          });
          const midiAccess = await Promise.race([
            navigator.requestMIDIAccess({ sysex }),
            whenTimeout
          ]);
          clearTimeout(timer);
          this.access = midiAccess;
          midiAccess.addEventListener("statechange", this.refreshDevices);
          this.refreshDevices();
          this.status = "connected" /* Connected */;
          return true;
        } catch (error) {
          console.warn("Request failure", error);
          if (sysex) {
            return this.initialize({ sysex: false, force: true, timeoutMS });
          }
          this.status = "error" /* Error */;
          return false;
        } finally {
          this._emit("status", { status: this.status });
        }
      })();
    }
    /**
     * 
     * @param {MidiEvent | string | number} event
     * @param {MidiEvent} [defaults]
     * @param {FormatOptions} [formatOpts]
     */
    sendOutputEvent(event, defaults = this._defaultOutputEvent, formatOpts = {}) {
      /** @type {MidiEvent} */
      let data;
      // midi pitch = noteon now for 1/2 beat
      if (typeof event === 'number') {
        data = {
          ...defaults,
          pitch: event
        };
      } else if (typeof event === 'string') {
        data = {
          ...defaults,
          ...stringToMidi(event, formatOpts)
        };
      } else if (typeof event === 'object') {
        data = event;
      } else {
        throw new TypeError('Invalid data to send to output - must be midievent object, string or number');
      }

      // ignore, just placebo rest event
      if (data.type === 'rest') {
        return false;
      }

      const device = (data.device != undefined && this.outputs[data.device]) || this.defaultOutput;
      if (!device) {
        // no output. Should this throw error?
        return false;
      }
      // ensure 0 velocity is interpreted as noteOff
      if (data.type === 'noteOn' && data.velocity === 0) {
        data.type = 'noteOff';
      }

      // TODO be able to specify offset time to calculate from?
      const { start, end } = getMidiOffsetTime(data);
      let raw = midiToRawMessage(data);
      device.send(raw, start);
      // also send off event
      if (data.type === 'noteOn' && end) {
        /** @type {MidiEvent} */
        const offEvent = {
          ...data,
          type: 'noteOff',
          value2: 0,
          velocity: 0
        };
        raw = midiToRawMessage(offEvent);
        device.send(raw, end);
      }

      // Keep track of notes so stop events can be sent if necessary
      this._trackActiveNotes(data, device);
    }

    /**
     * Stop all notes on all devices and clear pending
     */
    panic() {
      for (let [device, active] of this._activeNotes.entries()) {
        if (device.state !== 'connected') continue;
        for (let key of active) {
          const [channel, pitch] = key.split('_');
          const raw = midiToRawMessage({
            type: 'noteOff',
            channel: parseInt(channel, 10),
            pitch: parseInt(pitch)
          });
          // console.debug(`Stopping note ${pitch} on ${channel}`);
          device.send(raw);
        }
      }
      this._activeNotes.clear();
    }
    /**
     * Keep track of events sent to midi devices to allow panic stopping them if necessary
     * @private
     * @param {MidiEvent} event 
     * @param {MIDIOutput} device
     */
    _trackActiveNotes(event, device) {
      // NOTE - same default channel as midiToRawEvent, maybe default should be a magic value?
      const { type, pitch, channel = 1 } = event;
      if (!(type === 'noteOn' || type === 'noteOff')) {
        return;
      }
      const key = `${channel}_${pitch}`;
      if (!this._activeNotes.has(device)) {
        this._activeNotes.set(device, new Set());
      }
      const list = this._activeNotes.get(device);
      if (type === 'noteOn') {
        list.add(key);
      } else {
        list.delete(key);
      }
    }
    /** @type {Map<MIDIOutput, Set<string>>} */
    _activeNotes = new Map();
    _emit(name, data) {
      const event = new CustomEvent(name, { detail: data });
      this.dispatchEvent(event);
    }
    // @ts-ignore
    _whenEvent(event, { target = this, signal, timeoutMS = 1e3 * 60 } = {}) {
      const events = Array.isArray(event) ? event : [event];
      let timer;
      return new Promise((resolve, reject) => {
        events.forEach((name) => target.addEventListener(name, resolve, { once: true, signal }));
        timer = setTimeout(() => {
          events.forEach((name) => target.removeEventListener(name, resolve));
          reject(new DOMException("Timeout", "TimeoutError"));
        }, timeoutMS);
      }).finally(() => clearTimeout(timer));
    }
    on(type, callback, options) {
      return super.addEventListener(type, callback, options);
    }
    off(type, callback) {
      return super.removeEventListener(type, callback);
    }
  };

  /**
   * this singleton keeps track of events in order to:
   * 1) Report the "last" value for a given CC/note
   * 2) Track "active" notes
   * 3) Keep short term memory of events to avoid missing events because of scratch's slower event sample rate
   * 4) Allow recording events for playback/storage
   * 
   * It keeps track of midi events, automatically pruning them after a certain time period or # of max entries have been reached (lazy, it doesn't actively poll)
   */
  class MidiRecorder extends EventTarget {
    constructor() {
      super();
      this.active = /* @__PURE__ */ new Map();
      // REVIEW should this just be a {[key: channel]: Map()}  instead?
      this.activeByChannel = /* @__PURE__ */ new Map();
      this.ccs = {};
      this.lastNotes = {};
      this.buffer = [];
      this.paused = false;
      this.recordStart = 0;
      // 5 minute record time should be safe...midi doesn't take up much memory
      this.bufferSeconds = 60 * 5;
      this.maxEntries = 256 * 256;
    }
    _now() {
      return (globalThis.performance ? globalThis.performance.now() : Date.now()) / 1000;
    }
    /**
     * REVIEW should record start be a protection against purging?
     */
    startRecording(waitForEvent = true) {
      if (!waitForEvent) {
        this.recordStart = this._now();
      }
      this.paused = false;
    }
    /**
     * REVIEW should stop recording pause collecting events? probably bad
     */
    stopRecording() {
      this.paused = true;
      const { recordStart } = this;
      this.recordStart = 0;
      return recordStart ? this.buffer.filter((evt) => evt.when >= recordStart) : this.buffer;
    }
    /**
     * add note to buffer
     * @param evt 
     * @param when -- note, only used for setting "when" of active notes...evt should already have time value
     * @returns 
     */
    add(evt, when = this._now()) {
      const doc = { ...evt, when };
      if (!this.paused) {
        this.buffer.push(doc);
        this._prune(when);
      }
      switch (evt.type) {
        case "noteOn":
          this._onNoteOn(evt);
          break;
        case "noteOff":
          this._onNoteOff(doc);
          break;
        case "polyTouch":
          this._onNoteTouch(doc);
          break;
        case "cc":
          Object.assign(this.ccs, {
            [`${evt.cc}_${evt.channel}`]: evt,
            [`${evt.cc}`]: evt
          });
          break;
      }
    }
    _onNoteOn(evt) {
      if (evt.pitch == undefined) return;
      this.active.set(evt.pitch, evt);
      this.lastNotes[`${evt.pitch}`] = evt;
      if (evt.channel) {
        this.lastNotes[`${evt.pitch}_${evt.channel}`] = evt;
      }
      this.activeByChannel.set(channelKeyForEvent(evt.pitch, evt.channel), evt);
    }
    _onNoteOff(evt) {
      const { pitch, channel } = evt;
      if (pitch == undefined) return;
      const key = channelKeyForEvent(pitch, channel);
      const existing = this.activeByChannel.get(key) || this.active.get(pitch);
      if (!existing) return;
      existing.duration = evt.when - existing.when;
      this.active.delete(pitch);
      this.activeByChannel.delete(key);
    }
    _onNoteTouch(evt) {
      const { pitch, channel } = evt;
      if (pitch == undefined) return;
      const key = channelKeyForEvent(pitch, channel);
      const existing = this.activeByChannel.get(key) || this.active.get(pitch);
      if (!existing) return;
      existing.aftertouch = evt.value;
    }
    isNoteActive(pitch, channel) {
      if (channel == undefined) {
        return this.active.has(pitch);
      }
      const key = channelKeyForEvent(pitch, channel);
      return this.activeByChannel.has(key);
    }
    getActiveNote(pitch, channel) {
      if (pitch == undefined) {
        const list = this.getActiveNotes(channel);
        return list.length == 0 ? undefined : list.reduce((a, b) => a.when > b.when ? a : b);
      }
      if (channel == undefined) {
        return this.active.get(pitch);
      }
      const key = channelKeyForEvent(pitch, channel);
      return this.activeByChannel.get(key);
    }
    getActiveNotes(channel) {
      if (channel == undefined) {
        return [...this.active.values()];
      }
      return [...this.activeByChannel.values()].filter((c) => c.channel == channel);
      ;
    }
    clear(newStartTime = 0) {
      this.lastNotes = {};
      this.active.clear();
      this.activeByChannel.clear();
      this.ccs = {};
      this.recordStart = newStartTime;
      // remove old events
      this._prune(newStartTime + this.bufferSeconds);
    }
    getRange(start = this.recordStart ?? 0, end) {
      const first = this.buffer.findIndex((e) => (e.time ?? e.when) >= start);
      if (!end) {
        return this.buffer.slice(first);
      }
      const last = findLastIndex(this.buffer, (e) => (e.time ?? e.when) <= end);
      return this.buffer.slice(first, last);
    }
    getLastEvent(channel) {
      return this.getLast(undefined, undefined, channel);
    }
    getLastNote(pitch, channel) {
      return this.getLast("noteOn", pitch, channel);
    }
    getLastCC(cc, channel) {
      return this.getLast("cc", cc, channel);
    }
    getLastAftertouch(pitch, channel) {
      return this.getLast("polyTouch", pitch, channel);
    }
    getLast(type, value1, channel) {
      if (type === value1 === channel === undefined) {
        return this.buffer[this.buffer.length - 1];
      }
      if (type === "cc" && value1) {
        const key = channel != undefined ? `${value1}_${channel}` : `${value1}`;
        const foundCC = this.ccs[key];
        if (foundCC) return foundCC;
      }
      for (let i = this.buffer.length - 1; i >= 0; i--) {
        const evt = this.buffer[i];
        if (value1 != undefined && evt.value1 != value1) continue;
        if (channel != undefined && evt.channel != channel) continue;
        if (type) {
          const eType = evt.type;
          const isType = Array.isArray(type) ? type.includes(eType) : type === eType;
          if (!isType) continue;
        }
        return evt;
      }
    }
    *streamLast(type) {
      for (let i = this.buffer.length; i >= 0; i--) {
        const evt = this.buffer[i];
        if (type && evt.type != type) continue;
        yield evt;
      }
    }
    _prune(when = this._now()) {
      this.recordStart || (this.recordStart = when);
      const threshold = when - this.bufferSeconds;
      const n = this.buffer.length;
      if (this.buffer.length > this.maxEntries) {
        this.buffer = this.buffer.slice(-1 * this.maxEntries);
      }
      const firstNonStaleEvent = this.buffer.findIndex((e) => e.when >= threshold);
      if (firstNonStaleEvent === -1) {
        this.buffer = [];
      } else {
        this.buffer = this.buffer.slice(firstNonStaleEvent);
      }
    }
  };
  // polyfill for findLastIndex for 5% of browsers without it
  const findLastIndex = (arr, cb) => {
    if (typeof arr.findLastIndex === 'function') {
      return arr.findLastIndex(cb);
    }
    let i = arr.length - 1;
    while (i > -1 && !cb(arr[i], i, arr)) {
      i -= 1;
    }
    return i;
  }

  function channelKeyForEvent(value = 0, channel = 0) {
    return msbLsbToValue(value, channel);
  }

  // src/midi/midi-thread.ts
  const TARGET_MIDI_KEY = "_midi";
  /**
   * 
   * @param {import("scratch-vm").Thread} thread 
   * @returns {MidiEvent | undefined}
   */
  function getThreadMidiValue(thread) {
    return thread[TARGET_MIDI_KEY];
  }
  function setThreadMidiValue(thread, evt) {
    thread[TARGET_MIDI_KEY] = evt;
  }
  function setThreadActiveNotes(thread, value) {
    thread._activeNotes = value;
  }
  function getThreadActiveNotes(thread) {
    return thread._activeNotes;
  }
  /**
   * Get the current tempo.
   * @return {number} - the current tempo, in beats per minute.
   */
  function getTempo() {
    const stage = Scratch.vm.runtime.getTargetForStage();
    if (stage) {
      return stage.tempo;
    }
    return 60;
  }
  function beatsToSeconds(beats = 1, tempo = getTempo()) {
    return beats * 60 / tempo;
  }
  function secondsToBeats(seconds = 1, tempo = getTempo()) {
    return seconds * tempo / 60;
  }

  //#endregion wrapper

//#region Scratch Extension

  // hardcoded mapping of hats events, b/c I'll never remember the convention otherwise
  const HATS = {
    NOTE: `${EXT_ID}_whenNoteOnOff`,
    NOTEANY: `${EXT_ID}_whenAnyNoteOnOff`,
    MIDI: `${EXT_ID}_whenMidiEvent`
    // not currently implemented
    // CC: `${EXT_ID}_whenCC`
  };
  /**
   * Block separator constant
   * @type {'---'}
   */
  const SEPARATOR = '---';
  const { Cast } = Scratch;

  class MidiExtension {
    constructor() {
      this.midi = new MidiBackend();
      this.recorder = new MidiRecorder();
      /**
       * Lazy initialize midi - only upon first executing, and used in other calls to make sure it gets triggered
       */
      this._ensureInitialize = (evt) => {
        if (this.midi.status === "pending" /* Initial */) {
          this.initialize().catch(() => {
          });
        }
      };
      this._addListeners();
      // globalThis.midiExt = this;
      const vm = Scratch.vm;
      vm.runtime.once("BEFORE_EXECUTE", this._ensureInitialize);
    }
    /**
     * This helper actually glues together the extension with the MidiBackend / recorder. In particular it triggers HATS when incoming midi events occur
     */
    _addListeners() {
      const vm = globalThis.Scratch.vm;
      this.midi.on("midi", (domEvent) => {
        const midiEvent = domEvent.detail;
        this.recorder.add(midiEvent);
        const threads = vm.runtime.startHats(HATS.MIDI);
        // set the thread local variable to the passed in midi event for use with the "input event" reporter
        for (let thread of threads) {
          setThreadMidiValue(thread, midiEvent);
        }
        switch (midiEvent.type) {
          case "noteOn":
          case "noteOff":
            vm.runtime.startHats(HATS.NOTE);
            vm.runtime.startHats(HATS.NOTEANY);
            break;
          // FUTURE - support a "whenCC" block if needed
          // case "cc":
          //   vm.runtime.startHats(HATS.CC);
          //   break;
        }
      });
    }
    getInfo() {
      const EVENT_TYPES_ITEMS = [
        { value: "noteOn", text: Scratch.translate("Note On") },
        { value: "noteOff", text: Scratch.translate("Note Off") },
        { value: "cc", text: Scratch.translate("CC") },
        { value: "polyTouch", text: Scratch.translate("AfterTouch") },
        { value: "pitchBend", text: Scratch.translate("Pitch Bend") },
        { value: "programChange", text: Scratch.translate("Program Change") },
        { value: "channelPressure", text: Scratch.translate("Channel Pressure") }
      ];

      return {
        id: EXT_ID,
        name: Scratch.translate("Midi"),
        menuIconURI: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjEuNzc1IDcuNTE3SDI0djguOTY2aC0yLjIyNXptLTguNTYyIDBoNi41MDZjLjY2IDAgMS4wNDUuNTcgMS4wNDUgMS4yNDd2Ni42MDdjMCAuODQtLjM1IDEuMTEyLTEuMTEyIDEuMTEyaC02LjQzOXYtNS42OTZoMi4yMjV2My41MDVoMy4xMzVWOS41NGgtNS4zNnptLTMuMjM1IDBoMi4xOXY4Ljk2NmgtMi4xOXpNMCA3LjUxN2g3Ljg1NGMuNjYgMCAxLjA0NS41NyAxLjA0NSAxLjI0N3Y3LjcySDYuNzA4VjkuNzc0SDUuNDI3djYuNzA4SDMuNDM4VjkuNzc1SDIuMTkxdjYuNzA4SDBaIiBmaWxsPSIjMDAwIj48L3BhdGg+PC9zdmc+",
        blockIconURI: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjEuNzc1IDcuNTE3SDI0djguOTY2aC0yLjIyNXptLTguNTYyIDBoNi41MDZjLjY2IDAgMS4wNDUuNTcgMS4wNDUgMS4yNDd2Ni42MDdjMCAuODQtLjM1IDEuMTEyLTEuMTEyIDEuMTEyaC02LjQzOXYtNS42OTZoMi4yMjV2My41MDVoMy4xMzVWOS41NGgtNS4zNnptLTMuMjM1IDBoMi4xOXY4Ljk2NmgtMi4xOXpNMCA3LjUxN2g3Ljg1NGMuNjYgMCAxLjA0NS41NyAxLjA0NSAxLjI0N3Y3LjcySDYuNzA4VjkuNzc0SDUuNDI3djYuNzA4SDMuNDM4VjkuNzc1SDIuMTkxdjYuNzA4SDBaIiBmaWxsPSIjRkZGIj48L3BhdGg+PC9zdmc+",
        blocks: [
          // FUTURE - could force requesting permissions and checking midi device status. Usually refreshing is safer option
          // {
          //   opcode: "initialize",
          //   text: Scratch.translate("Initialize force? [FORCE]"),
          //   blockType: Scratch.BlockType.COMMAND,
          //   arguments: {
          //     FORCE: {
          //       type: Scratch.ArgumentType.NUMBER,
          //       defaultValue: 1
          //     }
          //   }
          // },
          {
            opcode: "numDevices",
            text: Scratch.translate("number of [DEVICE_TYPE] devices"),
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              DEVICE_TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'DEVICE_TYPES',
                defaultValue: 'input'
              }
            }
          },
          {
            opcode: "getDeviceInfo",
            text: Scratch.translate("[DEVICE_PROP] of [DEVICE_TYPE] device at [INDEX]"),
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              DEVICE_PROP: {
                type: Scratch.ArgumentType.STRING,
                menu: "DEVICE_PROPS",
                defaultValue: "name"
              },
              DEVICE_TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'DEVICE_TYPES',
                defaultValue: 'input'
              },
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          SEPARATOR,
          {
            opcode: "whenNoteOnOff",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when note [NOTE] [PRESS]"),
            isEdgeActivated: false,
            shouldRestartExistingThreads: true,
            arguments: {
              NOTE: {
                type: Scratch.ArgumentType.NOTE,
                defaultValue: 60
              },
              PRESS: {
                type: Scratch.ArgumentType.STRING,
                menu: "NOTE_EVENT_TYPE",
                defaultValue: ANY_TYPE
              }
            }
          },
          {
            opcode: "whenAnyNoteOnOff",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when any note [PRESS]"),
            isEdgeActivated: false,
            shouldRestartExistingThreads: true,
            arguments: {
              PRESS: {
                type: Scratch.ArgumentType.STRING,
                menu: "NOTE_EVENT_TYPE",
                defaultValue: ANY_TYPE
              }
            }
          },
          {
            opcode: "whenMidiEvent",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when input event [TYPE]"),
            isEdgeActivated: false,
            shouldRestartExistingThreads: true,
            arguments: {
              TYPE: {
                menu: "EVENT_TYPES_OPTIONAL",
                type: Scratch.ArgumentType.STRING,
                defaultValue: ANY_TYPE
              }
            }
          },
          {
            opcode: "lastEvent",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Input Event"),
            disableMonitor: true,
            allowDropAnywhere: true
          },
          {
            opcode: "getEventProp",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[PROP] of [EVENT]"),
            arguments: {
              EVENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "note C4 82 ch1 dev0 @1000"
              },
              PROP: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "type",
                menu: "PROPS"
              }
            }
          },
          {
            opcode: "isNoteActive",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("Is Note [NOTE] Pressed?"),
            arguments: {
              NOTE: {
                type: Scratch.ArgumentType.NOTE,
                defaultValue: 60
              },
              CHANNEL: {
                type: Scratch.ArgumentType.STRING,
                menu: "CHANNELS",
                defaultValue: "0"
              }
            }
          },
          {
            opcode: "isEventOfType",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("Is input event [TYPE]?"),
            arguments: {
              TYPE: {
                menu: "EVENT_TYPES",
                type: Scratch.ArgumentType.STRING,
                defaultValue: "noteOn"
              }
            }
          },
          SEPARATOR,
          {
            opcode: "getActiveNotes",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Active Notes")
          },
          {
            opcode: "numActiveNotes",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("length of active notes")
          },
          {
            opcode: "getActiveNoteByIndex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Note [INDEX] of active notes"),
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: "setActiveNoteList",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("Set list [LIST] to Active Notes"),
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists"
              }
            }
          },
          SEPARATOR,
          {
            opcode: "playNoteForBeats",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("play midi note [NOTE] for [BEATS] beats"),
            arguments: {
              NOTE: {
                type: Scratch.ArgumentType.NOTE,
                defaultValue: 60
              },
              BEATS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0.25
              }
            }
          },
          {
            opcode: "sendOutputEvent",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("schedule [EVENT] for [POS] beats from now"),
            arguments: {
              EVENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Eb4 beats=1/4"
              },
              POS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: "makeOutputNote",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Note [NOTE] Duration [BEATS] Volume [VELOCITY]% [CHANNEL] [DEVICE]"),
            arguments: {
              NOTE: {
                type: Scratch.ArgumentType.NOTE,
                defaultValue: 60
              },
              BEATS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0.25
              },
              VELOCITY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 96
              },
              CHANNEL: {
                type: Scratch.ArgumentType.STRING,
                menu: "CHANNELS",
                defaultValue: "1"
              },
              DEVICE: {
                type: Scratch.ArgumentType.STRING,
                menu: "OUTPUT_DEVICES"
              }
            }
          },
          {
            opcode: "makeOutputEvent",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Event [TYPE] [VALUE1] [VALUE2] [CHANNEL] [DEVICE]"),
            arguments: {
              TYPE: {
                menu: "EVENT_TYPES",
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'cc'
              },
              VALUE1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              VALUE2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              CHANNEL: {
                type: Scratch.ArgumentType.STRING,
                menu: "CHANNELS",
                defaultValue: "1"
              },
              DEVICE: {
                type: Scratch.ArgumentType.STRING,
                menu: "OUTPUT_DEVICES"
              }
            }
          },
          {
            opcode: "stopAllNotes",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stop all notes on output devices")
          },
          SEPARATOR,

          {
            opcode: "noteForName",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("MIDI Note # [NOTE]"),
            arguments: {
              NOTE: {
                type: Scratch.ArgumentType.STRING,
                menu: "NOTE_NAMES",
                defaultValue: "C4"
              }
            }
          },
          {
            opcode: "nameForNote",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Pitch Name of [NOTE] (use [ACCIDENTAL])"),
            arguments: {
              NOTE: {
                type: Scratch.ArgumentType.NOTE,
                defaultValue: 60
              },
              ACCIDENTAL: {
                type: Scratch.ArgumentType.STRING,
                menu: "ACCIDENTALS",
                defaultValue: 'sharps'
              }
            }
          },
          {
            opcode: "normalizeMidiVal",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Scale MIDI Value [VALUE] to min=[MIN] max=[MAX]"),
            arguments: {
              VALUE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              MIN: { type: Scratch.ArgumentType.NUMBER, defaultValue: -1 },
              MAX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: "eventToJSON",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Convert MIDI Event [EVENT] to JSON"),
            arguments: {
              EVENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "note Eb4 96 t=0.5 dur=0.25"
              }
            }
          },
          {
            opcode: "jsonToEvent",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Convert JSON [TEXT] to MIDI Event"),
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"type":"noteOn","channel":1,"device":0,"pos":0.25,"dur":0.25,"pitch":52,"velocity":96}'
              }
            }
          },
          SEPARATOR,
          {
            opcode: "getMidiStartTime",
            text: Scratch.translate("MIDI Start Time"),
            blockType: Scratch.BlockType.REPORTER
          },
          {
            opcode: "getMidiCurrentTime",
            text: Scratch.translate("MIDI Current Time"),
            blockType: Scratch.BlockType.REPORTER
          },
          {
            opcode: "clearEvents",
            text: Scratch.translate("Clear event buffer"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              TIME: {
                type: Scratch.ArgumentType.NUMBER
              }
            }
          },
          {
            opcode: "setMidiEventList",
            text: Scratch.translate("Set list [LIST] to events in last [TIME] seconds"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              LIST: {
                type: Scratch.ArgumentType.STRING,
                menu: "lists"
              },
              TIME: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5
              }
            }
          }
        ],
        menus: {
          EVENT_TYPES: {
            acceptReporters: true,
            items: EVENT_TYPES_ITEMS
          },
          EVENT_TYPES_OPTIONAL: {
            acceptReporters: true,
            items: [
              ...EVENT_TYPES_ITEMS,
              { value: ANY_TYPE, text: Scratch.translate("Any") }
            ]
          },
          INPUT_DEVICES: {
            acceptReporters: true,
            items: "inputDevicesMenu"
          },
          OUTPUT_DEVICES: {
            acceptReporters: true,
            items: "outputDevicesMenu"
          },
          DEVICE_TYPES: {
            acceptReporters: true,
            items: [
              { value: 'input', text: Scratch.translate("input") },
              { value: 'output', text: Scratch.translate("output") },
            ]
          },
          DEVICE_PROP: {
            acceptReporters: true,
            items: [
              { value: "id", text: Scratch.translate("Device ID") },
              { value: "manufacturer", text: Scratch.translate("Manufacturer") },
              { value: "name", text: Scratch.translate("Device Name") },
              { value: "state", text: Scratch.translate("State") }
            ]
          },
          NOTE_EVENT_TYPE: {
            acceptReporters: true,
            items: [
              { value: ANY_TYPE, text: Scratch.translate("Note On/Off") },
              { value: "noteOn", text: Scratch.translate("Note On") },
              { value: "noteOff", text: Scratch.translate("Note Off") }
            ]
          },
          ACCIDENTALS: {
            acceptReporters: true,
            items: [
              { value: "sharps", text: `♯ ${Scratch.translate("Sharps")}` },
              { value: "flats", text: `♭ ${Scratch.translate("Flats")}` }
            ]
          },
          NOTE_NAMES: {
            acceptReporters: true,
            // the result of these don't need translation - they're just "C4" or "G#6"
            items: [...MIDI_NOTES.entries()]
              .map(([index, text]) => ({ value: `${index}`, text }))
          },
          CHANNELS: {
            acceptReporters: true,
            items: [
              { value: "0", text: Scratch.translate("any channel") },
              ..."0".repeat(15).split("").map((_, i) => ({ value: `${i + 1}`, text: `channel ${i + 1}` }))
            ]
          },
          PROPS: {
            acceptReporters: true,
            items: Object.entries(eventProps).map(([value, { text }]) => ({ value, text }))
          },
          DEVICE_PROPS: {
            acceptReporters: true,
            items: [
              { value: "id", text: Scratch.translate("Id") },
              { value: "name", text: Scratch.translate("Name") },
              { value: "state", text: Scratch.translate("State") },
              { value: "manufacturer", text: Scratch.translate("Manufacturer") }
            ]
          },
          // taken from /Lily/ListTools.js
          lists: {
            acceptReporters: true,
            items: "_getLists",
          },
        }
      };
    }
    // taken from /Lily/ListTools.js
    _getLists() {
      if (typeof Blockly === "undefined") {
        return [""];
      }
      const lists = Blockly.getMainWorkspace()
        .getVariableMap()
        // @ts-expect-error - Blockly not typed yet
        .getVariablesOfType("list")
        .map((model) => model.name);

      if (lists.length > 0) {
        return lists;
      } else {
        return [""];
      }
    }
    async initialize({ sysex = false, FORCE = false } = {}, util) {
      const force = Cast.toBoolean(FORCE);
      await this.midi.initialize({ sysex, force });
    }
    _isAnyArg(val) {
      return val == undefined || val == "" || val == ANY_TYPE || typeof val === "string" && /^\*|any$/i.test(val);
    }
    numDevices({ DEVICE_TYPE }) {
      this._ensureInitialize();
      const deviceType = Cast.toString(DEVICE_TYPE).toLowerCase();
      const deviceList = deviceType === 'output' ? this.midi.outputs : this.midi.inputs;

      return deviceList.length;
    }
    numOutputDevices() {
      this._ensureInitialize();
      return this.midi.outputs.length;
    }
    getDeviceInfo({ DEVICE_TYPE, INDEX, DEVICE_PROP }, util) {
      const index = Cast.toNumber(INDEX);
      const deviceType = Cast.toString(DEVICE_TYPE).toLowerCase();
      const deviceList = deviceType === 'input' ? this.midi.inputs : this.midi.outputs;
      const device = deviceList[index];
      if (!device) return "";
      return device[DEVICE_PROP];
    }
    inputDevicesMenu() {
      const inputList = this.midi.inputs.map((d) => ({ text: d.name || d.id, value: d.id }));
      return [{ text: Scratch.translate("any"), value: ANY_TYPE }].concat(inputList);
    }
    outputDevicesMenu() {
      const outputList = this.midi.outputs.map((d) => ({ text: d.name || d.id, value: d.id }));
      return [{ text: Scratch.translate("any"), value: ANY_TYPE }].concat(outputList);
    }
    whenNoteOnOff({ NOTE, PRESS }, util) {
      const isAny = this._isAnyArg(PRESS);
      let type = isAny ? ['noteOn', 'noteOff'] : [normalizeType(Scratch.Cast.toString(PRESS))];

      const pitch = this._isAnyArg(NOTE) ? undefined : Cast.toNumber(NOTE);
      const last = this.recorder.getLast();

      // filter if only note on or note off
      if (last &&
        type.includes(last.type) &&
        (pitch === undefined || last.pitch === pitch)
      ) {
        setThreadMidiValue(util.thread, last);
        return true;
      }

      return false;
    }
    whenAnyNoteOnOff({ PRESS }, util) {
      const isAny = this._isAnyArg(PRESS);
      let type = isAny ? ['noteOn', 'noteOff'] : [normalizeType(Scratch.Cast.toString(PRESS))];

      const last = this.recorder.getLast();
      // filter if only note on or note off
      if (last && type.includes(last.type)) {
        setThreadMidiValue(util.thread, last);
        return true;
      }

      return false;
    }
    whenMidiEvent({ TYPE }, util) {
      const isAny = this._isAnyArg(TYPE);
      const type = isAny ? undefined : normalizeType(Scratch.Cast.toString(TYPE));
      const last = this.recorder.getLast();
      if (last && (isAny || last.type === type)) {
        setThreadMidiValue(util.thread, last);
        return !!last;
      }
      return false;
    }
    /**
     * 
     * @param {MidiEvent} event
     * @returns {MidiEvent}
     */
    _eventBeatsToSeconds(event) {
      const tempo = getTempo();
      const { dur, pos } = event;
      const out = { ...event };
      if (dur != undefined) {
        out.dur = beatsToSeconds(parseFraction(dur), tempo);
      }
      if (pos != undefined) {
        out.pos = beatsToSeconds(parseFraction(pos), tempo);
      }
      return out;
    }
    playNoteForBeats({ NOTE, BEATS }, util) {
      const pitch = noteNameToMidiPitch(Cast.toString(NOTE)) || undefined;
      const beats = typeof BEATS === 'string' && BEATS.includes('/')
        ? parseFraction(BEATS)
        : Cast.toNumber(BEATS);

      const event = this._eventBeatsToSeconds({
        type: 'noteOn',
        ...(pitch != undefined) && { pitch },
        dur: beats
      });
      this.midi.sendOutputEvent(event);
    }
    sendOutputEvent({ EVENT, POS }, util) {
      const text = Cast.toString(EVENT);
      const pos = typeof POS === 'string' && POS.includes('/')
        ? parseFraction(POS)
        : Cast.toNumber(POS);
      const event = this._eventBeatsToSeconds({
        // default value is 0, so if event has something set (like "C#3 pos=1/4 beats=1") then let it take precedence, otherwise override
        ...(pos > 0) && { pos },
        ...stringToMidi(text),
      });

      this.midi.sendOutputEvent(event);
    }
    stopAllNotes() {
      this.midi.panic();
    }
    getEventProp({ EVENT, PROP }, util) {
      const propName = Cast.toString(PROP);
      const { key = "value", type } = eventProps[propName] ?? {};
      if (!EVENT) return "";
      const last = getThreadMidiValue(util.thread);
      // use cached thread value if available instead of re-parsing
      const evt = last?._str === EVENT
        ? last
        : stringToMidi(EVENT);

      return evt?.[key] ?? "";
    }
    lastEvent(args, util) {
      let last = getThreadMidiValue(util.thread);
      last || (last = this.recorder.getLast());
      return last ? midiToString(last) : "";
    }
    isNoteActive({ NOTE, CHANNEL }, util) {
      const pitch = this._isAnyArg(NOTE) ? undefined : Cast.toNumber(NOTE);
      const channel = Cast.toNumber(CHANNEL) || undefined;
      if (pitch == undefined) {
        const notes = this.recorder.getActiveNotes(channel);
        setThreadActiveNotes(util.thread, { channel, notes });
        return notes.length == 0 ? undefined : notes.reduce((a, b) => a.when > b.when ? a : b);
      }
      const note = this.recorder.getActiveNote(pitch, channel || undefined);
      if (note) {
        setThreadMidiValue(util.thread, note);
      }
      return !!note;
    }
    isEventOfType({ TYPE }, util) {
      const type = TYPE === ANY_TYPE ? undefined : TYPE;
      let last = getThreadMidiValue(util.thread);
      last || (last = this.recorder.getLast());
      return last?.type === type;
    }
    noteForName({ NOTE }) {
      if (typeof NOTE === "number" || /^\d+$/.test(NOTE)) {
        return Cast.toNumber(NOTE);
      }
      const name = Cast.toString(NOTE);
      return noteNameToMidiPitch(name) || 0;
    }
    nameForNote({ NOTE, ACCIDENTAL }, util) {
      const useFlats = Cast.toString(ACCIDENTAL) === 'flats';
      let val = Cast.toNumber(NOTE);
      if (!val && /^[a-g]/i.test(`${NOTE}`)) {
        val = noteNameToMidiPitch(Cast.toString(NOTE)) || 0;
      }
      return midiPitchToNoteName(val, { useFlats });
    }
    makeOutputNote({ NOTE, BEATS, VELOCITY, CHANNEL, DEVICE }) {
      let dur = typeof BEATS === 'string' && BEATS.includes('/')
        ? parseFraction(BEATS)
        : Cast.toNumber(BEATS);
      // sanity check - don't let a note be more than 1 minute
      // if anyone ever needs a longer note then they should manually write event string
      dur = Math.max(0, Math.min(dur, 60));
      // convert from percent to midi value
      let velocity = (Cast.toNumber(VELOCITY) / 100) * 127;
      // clamp value
      // NOTE - if 0 velocity then nothing will happen because treated as note off
      velocity = Math.max(0, Math.min(velocity, 127));
      // REVIEW - should OUTPUT_DEVICES be changed to output device index instead of id?
      const deviceId = Cast.toString(DEVICE);
      const device = this.midi.outputs.findIndex(d => d.id === deviceId);
      /** @type {MidiEvent} */
      const event = {
        type: 'noteOn',
        pitch: this.noteForName({ NOTE }),
        velocity,
        channel: Cast.toNumber(CHANNEL) || undefined,
        device: device === -1 ? undefined : device,
        dur
      };
      return midiToString(event);
    }
    makeOutputEvent({ TYPE, VALUE1, VALUE2, CHANNEL, DEVICE }) {
      /** @type {EventType} */
      // @ts-ignore
      let type = Cast.toString(TYPE);
      // TODO make menu for EVENT_TYPE that doesn't include "any"
      // default is CC - is that right?
      // @ts-ignore
      if (type === ANY_TYPE) type = "cc";
      // UNDOCUMENTED - allow raw number for command.
      // note that the command lookup restricts command types, so will exclude sysex messages (which are possible security risk but already blocked by browsers anyways)
      let spec = eventMapping[type];
      if (!spec && /(0x)?[a-f0-9]+/i.test(type)) {
        const rawType = /[a-f]/.test(type)
          ? parseInt(type, 16)
          : parseInt(type);
        type = commandLookup[rawType];
      }

      // clamp values
      let value1 = Cast.toNumber(VALUE1);
      // pitchbend can be a bigger number
      const maxValue1 = spec?.highResParam ? 16384 : 127;
      value1 = Math.max(0, Math.min(value1, maxValue1));

      let value2 = Cast.toNumber(VALUE2);
      value2 = Math.max(0, Math.min(value2, 127));

      // REVIEW - should OUTPUT_DEVICES be changed to output device index instead of id?
      const deviceId = Cast.toString(DEVICE);
      const device = this.midi.outputs.findIndex(d => d.id === deviceId);
      // FUTURE this may make sense to get moved out to helper alongside rawMessageToMidi
      /** @type {MidiEvent} */
      const event = {
        type,
        value1,
        value2,
        channel: Cast.toNumber(CHANNEL) || undefined,
        device: device === -1 ? undefined : device,
        ...spec?.param1 && { [spec.param1]: value1 },
        ...spec?.param2 && { [spec.param2]: value2 },
        ...spec?.highResParam && parseHighResValue(value1, value2)
      };
      return midiToString(event);
    }
    normalizeMidiVal({ VALUE, MIN, MAX }) {
      const min = Cast.toNumber(MIN);
      const max = Cast.toNumber(MAX);
      const val = Cast.toNumber(VALUE) / 127;
      return val * (max - min) + min;
    }
    getMidiStartTime() {
      return this.recorder.recordStart;
    }
    getMidiCurrentTime() {
      return this.recorder._now();
    }
    clearEvents(args, util) {
      this.recorder.clear();
    }
    setMidiEventList({ LIST, TIME }, util) {
      const duration = Cast.toNumber(TIME) || 5;
      const start = this.recorder._now() - duration;
      const events = this.recorder.getRange(start);
      if (LIST) {
        this._upsertList(LIST, events.map((evt) => evt._str), util.target);
      }
    }
    getActiveNotes(args, util) {
      const notes = Array.from(this.recorder.getActiveNotes());
      setThreadActiveNotes(util.thread, { notes });
      return notes.map((note) => note._str ?? midiToString(note)).join("\n");
    }
    getActiveNoteByIndex({ INDEX }, util) {
      const index = Cast.toNumber(INDEX) || 0;
      let active = getThreadActiveNotes(util.thread);
      if (!active) {
        active = { notes: this.recorder.getActiveNotes() };
        setThreadActiveNotes(util.thread, active);
      }
      const note = (active.notes || [])[index];
      if (note) {
        setThreadMidiValue(util.thread, note);
        return note._str;
      }
      return '';
    }
    setActiveNoteList({ LIST }, util) {
      const notes = Array.from(this.recorder.getActiveNotes());
      setThreadActiveNotes(util.thread, { notes });
      if (LIST) {
        this._upsertList(LIST, notes.map((note) => note._str), util.target);
      }
    }
    _upsertList(name, value, target) {
      const vm = globalThis.Scratch.vm;
      const stageTarget = vm.runtime.getTargetForStage();
      let listObj = stageTarget?.lookupVariableByNameAndType(name, "list");
      listObj || (listObj = target?.lookupVariableByNameAndType(name, "list"));
      if (listObj) {
        listObj.value = value;
      }
    }
    numActiveNotes(args, util) {
      let active = getThreadActiveNotes(util.thread);
      if (!active) {
        active = { notes: this.recorder.getActiveNotes() };
        setThreadActiveNotes(util.thread, active);
      }
      return active.notes.length;
    }
    eventToJSON({ EVENT }, util) {
      const raw = Cast.toString(EVENT);
      // NOTE will be null if could not parse
      const event = stringToMidi(raw);

      // REVIEW - remove value1/value2 if already specified by event spec?
      if (event && ('pitch' in event || 'value' in event)) {
        delete event.value1;
        delete event.value2;
      }
      // QUESTION does this need an error handler?
      return JSON.stringify(event);
    }
    jsonToEvent({ TEXT }, util) {
      const raw = Cast.toString(TEXT);
      let event = null;
      try {
        event = {
          ...JSON.parse(raw)
        };
        // rename aliases just in case
        [['beats', 'dur'], ['offset', 'pos'], ['@', 'time']]
          .filter(([alias, key]) => (alias in event) && event[key] == undefined)
          .forEach(([alias, key]) => event[key] = event[alias]);
      } catch (error) { }
      return event ? midiToString(event) : ""
    }
  };

//#endregion
  Scratch.extensions.register(new MidiExtension());
})(Scratch);