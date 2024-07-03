// Name: xterm
// ID: xterm
// Description: Create console applications & games with xterm.
// By: FurryR <https://scratch.mit.edu/users/FurryR/>
// License: MPL-2.0

(async function (Scratch) {
  "use strict";
  const xtermStyle = document.createElement("link");
  xtermStyle.rel = "stylesheet";
  xtermStyle.href =
    "https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/css/xterm.min.css";
  document.head.appendChild(xtermStyle);
  const { Terminal } = await import(
    "https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/+esm"
  );
  const { WebglAddon } = await import(
    "https://cdn.jsdelivr.net/npm/@xterm/addon-webgl@0.18.0/+esm"
  );
  const { FitAddon } = await import(
    "https://cdn.jsdelivr.net/npm/@xterm/addon-fit@0.10.0/+esm"
  );
  const { Unicode11Addon } = await import(
    "https://cdn.jsdelivr.net/npm/@xterm/addon-unicode11@0.8.0/+esm"
  );
  const { CanvasAddon } = await import(
    "https://cdn.jsdelivr.net/npm/@xterm/addon-canvas@0.7.0/+esm"
  );
  const { WebLinksAddon } = await import(
    "https://cdn.jsdelivr.net/npm/@xterm/addon-web-links@0.11.0/+esm"
  );
  // Special patch for ligature addon that uses fs module which rollup doesn't support
  await import(
    "https://cdn.jsdelivr.net/npm/@xterm/addon-ligatures@0.9.0/lib/addon-ligatures.min.js"
  );
  const {
    LigaturesAddon: { LigaturesAddon },
  } = globalThis;
  delete globalThis.LigaturesAddon;
  const runtime = Scratch.vm.runtime;
  const themeColor = [
    "foreground",
    "background",
    "selection",
    "black",
    "brightBlack",
    "red",
    "brightRed",
    "green",
    "brightGreen",
    "yellow",
    "brightYellow",
    "blue",
    "brightBlue",
    "magenta",
    "brightMagenta",
    "cyan",
    "brightCyan",
    "white",
    "brightWhite",
    "cursor",
    "cursorAccent",
    "selectionBackground",
    "selectionForeground",
    "selectionInactiveBackground",
  ];

  class ScratchXTerm {
    /** @type {HTMLDivElement?} */
    element;
    /** @type {Terminal} */
    terminal;
    /** @type {FitAddon} */
    fitAddon;
    /** @type {LigaturesAddon?} */
    ligaturesAddon;
    /** @type {WebLinksAddon?} */
    webLinksAddon;
    /** @type {((data: string) => void)[]} */
    dataCallbacks = [];
    /** @type {string} */
    buffer;
    /** @type {boolean} */
    bufferEnabled;
    /** @type {object} */
    eventData;

    constructor() {
      this.terminal = new Terminal({
        allowTransparency: true,
        fontFamily:
          '"Jetbrains Mono", "Fira Code", "Cascadia Code", "Noto Emoji", "Segoe UI Emoji", "Lucida Console", Menlo, courier-new, courier, monospace',
        cursorBlink: true,
        theme: {
          foreground: "#F8F8F8",
          background: "rgba(45,46,44,0.8)",
          selection: "#5DA5D533",
          black: "#1E1E1D",
          brightBlack: "#262625",
          red: "#CE5C5C",
          brightRed: "#FF7272",
          green: "#5BCC5B",
          brightGreen: "#72FF72",
          yellow: "#CCCC5B",
          brightYellow: "#FFFF72",
          blue: "#5D5DD3",
          brightBlue: "#7279FF",
          magenta: "#BC5ED1",
          brightMagenta: "#E572FF",
          cyan: "#5DA5D5",
          brightCyan: "#72F0FF",
          white: "#F8F8F8",
          brightWhite: "#FFFFFF",
        },
        allowProposedApi: true,
      });
      this.terminal.onData((e) => {
        if (this.dataCallbacks.length > 0) {
          for (const callback of this.dataCallbacks) {
            callback(this.buffer + e);
          }
          this.buffer = "";
          this.dataCallbacks = [];
        } else if (this.bufferEnabled) {
          this.buffer += e;
        }
      });
      this.terminal.onResize(() => {
        if (this.justInitialized) this.justInitialized = false;
        else runtime.startHats("xterm_whenTerminalResized");
      });
      // Mouse event report support
      this.terminal._core.coreMouseService.addEncoding("cursorReport", (e) => {
        const actionMap = {
          1: "down",
          0: "up",
          32: "drag",
        };
        if (e.button >= 0 && e.button <= 2) {
          const buttonMap = {
            0: "left",
            1: "middle",
            2: "right",
          };
          if (
            runtime.startHats("xterm_whenMouseClicked", {
              BUTTON: buttonMap[e.button],
            }).length > 0
          ) {
            this.eventData = {
              x: e.col - 1,
              y: e.row - 1,
              type: actionMap[e.action],
              ctrl: e.ctrl,
              alt: e.alt,
              shift: e.shift,
            };
          }
        } else if (e.button === 3) {
          if (runtime.startHats("xterm_whenMouseOver").length > 0) {
            this.eventData = {
              x: e.col - 1,
              y: e.row - 1,
              ctrl: e.ctrl,
              alt: e.alt,
              shift: e.shift,
            };
          }
        } else if (e.button === 4) {
          if (runtime.startHats("xterm_whenScrolled").length > 0) {
            this.eventData = {
              x: e.col - 1,
              y: e.row - 1,
              type: actionMap[e.action],
              ctrl: e.ctrl,
              alt: e.alt,
              shift: e.shift,
            };
          }
        } else {
          console.log(e);
        }
      });
      const style = document.createElement("style");
      style.textContent = `
.xterm-viewport.xterm-viewport {
    scrollbar-width: none;
}
.xterm-viewport::-webkit-scrollbar {
    width: 0;
}
`;
      document.head.appendChild(style);
      this.fitAddon = new FitAddon();
      try {
        this.terminal.loadAddon(new WebglAddon());
      } catch {
        this.terminal.loadAddon(new CanvasAddon());
      }
      this.terminal.loadAddon(new Unicode11Addon());
      this.terminal.unicode.activeVersion = "11";
      this.terminal.loadAddon(this.fitAddon);
      this.element = null;
      this.buffer = "";
      this.bufferEnabled = false;
      this.ligaturesAddon = null;
      this.webLinksAddon = null;
      this.justInitialized = false;
      this.eventData = {};
    }
    getInfo() {
      return {
        id: "xterm",
        name: "xterm",
        color1: "#1c1628",
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: "🎨 " + Scratch.translate("Appearance"),
          },
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: "changeVisibility",
            text: Scratch.translate("[STATUS] terminal"),
            arguments: {
              STATUS: {
                type: Scratch.ArgumentType.STRING,
                menu: "VISIBILITY",
              },
            },
          },
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: "changeTheme",
            text: Scratch.translate("set [THEME] color to [COLOR]"),
            arguments: {
              THEME: {
                type: Scratch.ArgumentType.STRING,
                menu: "THEME",
              },
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#5DA5D5",
              },
            },
          },
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: "changeOption",
            text: Scratch.translate("set [OPTION] to [VALUE]"),
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "OPTION",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: "adjustFeature",
            text: Scratch.translate("[STATUS] [FEATURE]"),
            arguments: {
              STATUS: {
                type: Scratch.ArgumentType.STRING,
                menu: "STATUS",
              },
              FEATURE: {
                type: Scratch.ArgumentType.STRING,
                menu: "FEATURE",
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "🎮 " + Scratch.translate("Input"),
          },
          {
            blockType: Scratch.BlockType.REPORTER,
            opcode: "get",
            text: Scratch.translate("received character"),
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "📄 " + Scratch.translate("Output"),
          },
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: "print",
            text: Scratch.translate("print [INFO] with [NEWLINE]"),
            arguments: {
              INFO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello World",
              },
              NEWLINE: {
                type: Scratch.ArgumentType.STRING,
                menu: "NEWLINE",
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "🖥️ " + Scratch.translate("Cursor & Screen"),
          },
          {
            blockType: Scratch.BlockType.REPORTER,
            opcode: "screenOptions",
            text: Scratch.translate("query [SCREENOPTION]"),
            arguments: {
              SCREENOPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "SCREENOPTION",
              },
            },
            disableMonitor: true,
          },
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: "moveCursorTo",
            text: Scratch.translate("move cursor to x:[X]y:[Y]"),
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: "moveCursor",
            text: Scratch.translate("move cursor [N] character(s) [DIRECTION]"),
            arguments: {
              N: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              DIRECTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "DIRECTION",
              },
            },
          },
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: "clear",
            text: Scratch.translate("clear [CLEARTYPE]"),
            arguments: {
              CLEARTYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "CLEARTYPE",
              },
            },
          },
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: "reset",
            text: Scratch.translate("reset screen"),
          },
          {
            blockType: Scratch.BlockType.CONDITIONAL,
            opcode: "saveCursor",
            text: Scratch.translate("cursor wrapper"),
            branchCount: 1,
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "❗ " + Scratch.translate("Events"),
          },
          {
            blockType: Scratch.BlockType.HAT,
            opcode: "whenTerminalResized",
            text: Scratch.translate("when terminal resized"),
            shouldRestartExistingThreads: false,
            isEdgeActivated: false,
          },
          {
            blockType: Scratch.BlockType.HAT,
            opcode: "whenMouseClicked",
            text: Scratch.translate("when mouse [BUTTON] clicked"),
            shouldRestartExistingThreads: false,
            isEdgeActivated: false,
            arguments: {
              BUTTON: {
                type: Scratch.ArgumentType.STRING,
                menu: "BUTTON",
              },
            },
          },
          {
            blockType: Scratch.BlockType.HAT,
            opcode: "whenMouseOver",
            text: Scratch.translate("when mouse over terminal"),
            shouldRestartExistingThreads: false,
            isEdgeActivated: false,
          },
          {
            blockType: Scratch.BlockType.HAT,
            opcode: "whenScrolled",
            text: Scratch.translate("when mouse scrolled"),
            shouldRestartExistingThreads: false,
            isEdgeActivated: false,
          },
          {
            blockType: Scratch.BlockType.REPORTER,
            opcode: "getEventData",
            text: Scratch.translate("mouse event data"),
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "🛠️ " + Scratch.translate("Utilities"),
          },
          {
            blockType: Scratch.BlockType.REPORTER,
            opcode: "coloredText",
            text: Scratch.translate("[TEXT] in [COLOR] [TYPE]"),
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello World",
              },
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#FFFFFF",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "COLORTYPE",
              },
            },
          },
          {
            blockType: Scratch.BlockType.REPORTER,
            opcode: "withOpacity",
            text: Scratch.translate("[COLOR] with opacity [OPACITY]"),
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#808080",
              },
              OPACITY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0.5,
              },
            },
          },
          {
            blockType: Scratch.BlockType.REPORTER,
            opcode: "toCodePoint",
            text: Scratch.translate("the code point of [CHAR]"),
            arguments: {
              CHAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "a",
              },
            },
          },
          {
            blockType: Scratch.BlockType.REPORTER,
            opcode: "fromCodePoint",
            text: Scratch.translate("the character of code point [CODE]"),
            arguments: {
              CODE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 32,
              },
            },
          },
        ],
        menus: {
          VISIBILITY: {
            items: [
              {
                text: Scratch.translate("show"),
                value: "show",
              },
              {
                text: Scratch.translate("hide"),
                value: "hide",
              },
            ],
          },
          THEME: {
            items: [
              {
                text: Scratch.translate("foreground"),
                value: "foreground",
              },
              {
                text: Scratch.translate("background"),
                value: "background",
              },
              {
                text: Scratch.translate("selection"),
                value: "selection",
              },
              {
                text: Scratch.translate("black"),
                value: "black",
              },
              {
                text: Scratch.translate("bright black"),
                value: "brightBlack",
              },
              {
                text: Scratch.translate("red"),
                value: "red",
              },
              {
                text: Scratch.translate("bright red"),
                value: "brightRed",
              },
              {
                text: Scratch.translate("green"),
                value: "green",
              },
              {
                text: Scratch.translate("bright green"),
                value: "brightGreen",
              },
              {
                text: Scratch.translate("yellow"),
                value: "yellow",
              },
              {
                text: Scratch.translate("bright yellow"),
                value: "brightYellow",
              },
              {
                text: Scratch.translate("blue"),
                value: "blue",
              },
              {
                text: Scratch.translate("bright blue"),
                value: "brightBlue",
              },
              {
                text: Scratch.translate("magenta"),
                value: "magenta",
              },
              {
                text: Scratch.translate("bright magenta"),
                value: "brightMagenta",
              },
              {
                text: Scratch.translate("cyan"),
                value: "cyan",
              },
              {
                text: Scratch.translate("bright cyan"),
                value: "brightCyan",
              },
              {
                text: Scratch.translate("white"),
                value: "white",
              },
              {
                text: Scratch.translate("bright white"),
                value: "brightWhite",
              },
              {
                text: Scratch.translate("cursor"),
                value: "cursor",
              },
              {
                text: Scratch.translate("accent cursor"),
                value: "cursorAccent",
              },
              {
                text: Scratch.translate("selection background"),
                value: "selectionBackground",
              },
              {
                text: Scratch.translate("selection foreground"),
                value: "selectionForeground",
              },
              {
                text: Scratch.translate("selection background when inactive"),
                value: "selectionInactiveBackground",
              },
            ],
          },
          OPTION: {
            items: [
              {
                text: Scratch.translate("font size"),
                value: "fontsize",
              },
              {
                text: Scratch.translate("line height"),
                value: "lineheight",
              },
              {
                text: Scratch.translate("font family"),
                value: "fontfamily",
              },
              {
                text: Scratch.translate("scrollback size"),
                value: "scrollback",
              },
            ],
          },
          COLORTYPE: {
            items: [
              {
                text: Scratch.translate("background"),
                value: "background",
              },
              {
                text: Scratch.translate("foreground"),
                value: "foreground",
              },
            ],
          },
          STATUS: {
            items: [
              {
                text: Scratch.translate("enable"),
                value: "enable",
              },
              {
                text: Scratch.translate("disable"),
                value: "disable",
              },
            ],
          },
          FEATURE: {
            items: [
              {
                text: Scratch.translate("cursor blinking"),
                value: "cursorblink",
              },
              {
                text: Scratch.translate("ligatures"),
                value: "ligatures",
              },
              {
                text: Scratch.translate("web link"),
                value: "link",
              },
              {
                text: Scratch.translate(
                  "mouse event report (disables selection)"
                ),
                value: "mouse",
              },
              {
                text: Scratch.translate("input buffer"),
                value: "buffer",
              },
            ],
          },
          DIRECTION: {
            items: [
              {
                text: Scratch.translate("up"),
                value: "up",
              },
              {
                text: Scratch.translate("down"),
                value: "down",
              },
              {
                text: Scratch.translate("left"),
                value: "left",
              },
              {
                text: Scratch.translate("right"),
                value: "right",
              },
            ],
          },
          BUTTON: {
            items: [
              {
                text: Scratch.translate("left"),
                value: "left",
              },
              {
                text: Scratch.translate("middle"),
                value: "middle",
              },
              {
                text: Scratch.translate("right"),
                value: "right",
              },
            ],
          },
          CLEARTYPE: {
            items: [
              {
                text: Scratch.translate("entire screen"),
                value: "screen",
              },
              {
                text: Scratch.translate("characters after cursor"),
                value: "after",
              },
              {
                text: Scratch.translate("characters before cursor"),
                value: "before",
              },
              {
                text: Scratch.translate("scrollback"),
                value: "scrollback",
              },
            ],
          },
          SCREENOPTION: {
            items: [
              {
                text: Scratch.translate("terminal size"),
                value: "size",
              },
              {
                text: Scratch.translate("cursor position"),
                value: "cursor",
              },
            ],
          },
          NEWLINE: {
            items: [
              {
                text: Scratch.translate("newline"),
                value: "newline",
              },
              {
                text: Scratch.translate("no newline"),
                value: "none",
              },
            ],
          },
        },
      };
    }
    _initalizeXterm() {
      const parentElement = runtime.renderer.canvas.parentElement;
      runtime.renderer.canvas.style.position = "relative";
      this.element = document.createElement("div");
      this.element.style.position = "absolute";
      this.element.style.top = "0";
      this.element.style.left = "0";
      this.element.style.width = "100%";
      this.element.style.height = "100%";
      this.element.style.margin = "0";
      this.element.style.display = "grid";
      const _resize = runtime.renderer.resize;
      runtime.renderer.resize = (width, height) => {
        _resize.call(runtime.renderer, width, height);
        this.fitAddon.fit();
      };
      parentElement.appendChild(this.element);
      this.terminal.open(this.element);
      this.justInitialized = true;
      this.terminal._core.viewport.scrollBarWidth = 0;
      this.fitAddon.fit();
    }
    changeVisibility({ STATUS }) {
      STATUS = Scratch.Cast.toString(STATUS).toLowerCase();
      switch (STATUS) {
        case "show": {
          if (this.element) {
            this.element.style.display = "grid";
          } else {
            // initialize the element lazily.
            this._initalizeXterm();
          }
          break;
        }
        case "hide": {
          if (this.element) {
            this.element.style.display = "none";
          }
          break;
        }
      }
    }
    changeTheme({ THEME, COLOR }) {
      THEME = Scratch.Cast.toString(THEME);
      if (!themeColor.includes(THEME)) return;
      this.terminal.options.theme = Object.assign(
        {},
        this.terminal.options.theme,
        { [THEME]: Scratch.Cast.toString(COLOR) }
      );
    }
    changeOption({ OPTION, VALUE }) {
      OPTION = Scratch.Cast.toString(OPTION).toLowerCase();
      switch (OPTION) {
        case "fontsize": {
          VALUE = Scratch.Cast.toNumber(VALUE);
          if (isFinite(VALUE) && Math.floor(VALUE) === VALUE && VALUE > 0) {
            this.terminal.options.fontSize = VALUE;
            this.fitAddon.fit();
          }
          break;
        }
        case "lineheight": {
          VALUE = Scratch.Cast.toNumber(VALUE);
          if (isFinite(VALUE) && VALUE > 1) {
            this.terminal.options.lineHeight = VALUE;
            this.fitAddon.fit();
          }
          break;
        }
        case "fontfamily": {
          this.terminal.options.fontFamily = Scratch.Cast.toString(VALUE);
          break;
        }
        case "scrollback":
          {
            VALUE = Scratch.Cast.toNumber(VALUE);
            if (isFinite(VALUE) && Math.floor(VALUE) === VALUE && VALUE > 0) {
              this.terminal.options.scrollback = VALUE;
              this.fitAddon.fit();
            }
          }
          break;
      }
    }
    adjustFeature({ STATUS, FEATURE }) {
      FEATURE = Scratch.Cast.toString(FEATURE).toLowerCase();
      STATUS = Scratch.Cast.toString(STATUS).toLowerCase();
      switch (FEATURE) {
        case "cursorblink": {
          this.terminal.options.cursorBlink = STATUS === "enable";
          break;
        }
        case "ligatures": {
          if (STATUS === "enable") {
            if (this.ligaturesAddon) break;
            this.ligaturesAddon = new LigaturesAddon();
            this.terminal.loadAddon(this.ligaturesAddon);
          } else {
            if (!this.ligaturesAddon) break;
            this.ligaturesAddon.dispose();
            this.ligaturesAddon = null;
          }
          break;
        }
        case "mouse": {
          if (STATUS === "enable") {
            this.terminal._core.coreMouseService.activeEncoding =
              "cursorReport";
            this.terminal._core.coreMouseService.activeProtocol = "ANY";
          } else {
            this.terminal._core.coreMouseService.activeEncoding = "DEFAULT";
            this.terminal._core.coreMouseService.activeProtocol = "NONE";
          }
          break;
        }
        case "link": {
          if (STATUS === "enable") {
            if (this.webLinksAddon) break;
            this.webLinksAddon = new WebLinksAddon();
            this.terminal.loadAddon(this.webLinksAddon);
          } else {
            if (!this.webLinksAddon) break;
            this.webLinksAddon.dispose();
            this.webLinksAddon = null;
          }
          break;
        }
        case "buffer": {
          if (STATUS === "enable") {
            this.bufferEnabled = true;
          } else {
            this.bufferEnabled = false;
            this.buffer = "";
          }
          break;
        }
      }
    }
    get() {
      return new Promise((resolve) => {
        this.dataCallbacks.push(resolve);
      });
    }
    print({ INFO, NEWLINE }) {
      NEWLINE = Scratch.Cast.toString(NEWLINE).toLowerCase();
      this.terminal[NEWLINE === "newline" ? "writeln" : "write"](
        Scratch.Cast.toString(INFO)
      );
    }
    screenOptions({ SCREENOPTION }) {
      SCREENOPTION = Scratch.Cast.toString(SCREENOPTION).toLowerCase();
      switch (SCREENOPTION) {
        case "size":
          return JSON.stringify({
            x: this.terminal.options.cols,
            y: this.terminal.options.rows,
          });
        case "cursor":
          return JSON.stringify({
            x: this.terminal._core._inputHandler._activeBuffer.x,
            Y: this.terminal._core._inputHandler._activeBuffer.y,
          });
      }
      return "{}";
    }
    moveCursorTo({ X, Y }) {
      X = Scratch.Cast.toNumber(X);
      Y = Scratch.Cast.toNumber(Y);
      if (
        isFinite(X) &&
        isFinite(Y) &&
        Math.floor(X) === X &&
        Math.floor(Y) === Y &&
        X >= 0 &&
        Y >= 0
      ) {
        this.terminal.write(
          `\u001b[${Scratch.Cast.toNumber(Y + 1)};${Scratch.Cast.toNumber(
            X + 1
          )}H`
        );
      }
    }
    moveCursor({ N, DIRECTION }) {
      const directionMap = {
        up: "A",
        down: "B",
        right: "C",
        left: "D",
      };
      DIRECTION = Scratch.Cast.toString(DIRECTION).toLowerCase();
      N = Scratch.Cast.toNumber(N);
      if (
        DIRECTION in directionMap &&
        isFinite(N) &&
        Math.floor(N) === N &&
        N > 0
      ) {
        this.terminal.write(`\u001b[${N}${directionMap[DIRECTION]}`);
      }
    }
    clear({ CLEARTYPE }) {
      CLEARTYPE = Scratch.Cast.toString(CLEARTYPE).toLowerCase();
      let typeMap = {
        after: 0,
        before: 1,
        screen: 2,
        scrollback: 3,
      };
      if (CLEARTYPE in typeMap) {
        this.terminal.write(`\u001b[${typeMap[CLEARTYPE]}J`);
      }
    }
    reset() {
      this.terminal.reset();
    }
    saveCursor(args, util) {
      if (util.stackFrame.shouldRestoreCursor) {
        this.moveCursorTo({
          X: util.stackFrame.cursorX,
          Y: util.stackFrame.cursorY,
        });
      } else {
        util.stackFrame.shouldRestoreCursor = true;
        util.stackFrame.cursorX =
          this.terminal._core._inputHandler._activeBuffer.x;
        util.stackFrame.cursorY =
          this.terminal._core._inputHandler._activeBuffer.y;
        util.startBranch(1, true);
      }
    }
    whenTerminalResized() {
      return true;
    }
    whenMouseClicked() {
      return true;
    }
    whenMouseOver() {
      return true;
    }
    whenScrolled() {
      return true;
    }
    getEventData() {
      return JSON.stringify(this.eventData);
    }
    coloredText({ TEXT, COLOR, TYPE }) {
      TYPE = Scratch.Cast.toString(TYPE).toLowerCase();
      COLOR = Scratch.Cast.toRgbColorList(COLOR);
      return `\u001b[${TYPE === "background" ? "48" : "38"};2;${COLOR[0]};${
        COLOR[1]
      };${COLOR[2]}m${Scratch.Cast.toString(TEXT)}\u001b[0m`;
    }
    withOpacity({ COLOR, OPACITY }) {
      COLOR = Scratch.Cast.toRgbColorList(COLOR);
      return `rgba(${COLOR[0]},${COLOR[1]},${COLOR[2]},${Scratch.Cast.toNumber(
        OPACITY
      )})`;
    }
    toCodePoint({ CHAR }) {
      CHAR = Scratch.Cast.toString(CHAR);
      return CHAR.codePointAt(0) ?? -1;
    }
    fromCodePoint({ CODE }) {
      CODE = Scratch.Cast.toNumber(CODE);
      return String.fromCodePoint(CODE);
    }
  }
  Scratch.extensions.register(new ScratchXTerm());
})(Scratch);
