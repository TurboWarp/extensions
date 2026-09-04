// Name: Text Input
// ID: textinput
// Description: A draggable text input box per sprite that replaces the sprite when shown, can be typed into directly.
// License: MIT

(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;

  class TextInput {
    constructor() {
      /** @type {Map<VM.Target, {container: HTMLDivElement, input: HTMLInputElement, target: VM.Target, width: number, dragging: boolean, dragOffset: {x: number, y: number}}>} */
      this.boxes = new Map();
      this.activeDrag = null;

      vm.runtime.on("PROJECT_STOP_ALL", () => this._hideAll());
      vm.runtime.on("targetWasRemoved", (target) => this._removeBox(target));

      this._loop = this._loop.bind(this);
      requestAnimationFrame(this._loop);

      document.addEventListener("mousemove", (e) => this._onMouseMove(e));
      document.addEventListener("mouseup", () => this._onMouseUp());
      document.addEventListener("fullscreenchange", () => this._updateCursors());
    }

    _isFullscreen() {
      if (document.fullscreenElement) return true;
      const canvas = this._getStageCanvas();
      if (!canvas) return false;
      const rect = canvas.getBoundingClientRect();
      // 舞台垂直占满窗口即视为最大化(全屏时 4:3 舞台在宽屏会左右留黑边,
      // 宽度不占满,但高度占满;编辑器里舞台上下有顶栏/积木区,高度不会占满)
      return (
        rect.top <= window.innerHeight * 0.1 &&
        rect.height >= window.innerHeight * 0.9
      );
    }

    _updateCursors() {
      const draggable = !this._isFullscreen();
      for (const box of this.boxes.values()) {
        box.container.style.cursor = draggable ? "move" : "default";
      }
    }


    _getStageCanvas() {
      const r = vm.renderer;
      if (r) {
        if (r.canvas) return r.canvas;
        if (r._canvas) return r._canvas;
      }
      return document.querySelector("canvas");
    }

    _createBox(target) {
      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.zIndex = "500";
      container.style.padding = "5px";
      container.style.border = "1px solid #e40000";
      container.style.borderRadius = "6px";
      container.style.background = "#ffffff";
      container.style.boxSizing = "border-box";
      container.style.display = "none";
      container.style.cursor = this._isFullscreen() ? "default" : "move";
      container.style.userSelect = "none";

      const input = document.createElement("textarea");
      input.style.width = "100%";
      input.style.height = "100%";
      input.style.border = "none";
      input.style.outline = "none";
      input.style.fontSize = "15px";
      input.style.background = "transparent";
      input.style.color = "#575e75";
      input.style.cursor = "text";
      input.style.padding = "0";
      input.style.margin = "0";
      input.style.resize = "none";
      input.style.overflow = "hidden";
      input.style.whiteSpace = "pre-wrap";
      input.style.wordWrap = "break-word";
      input.style.fontFamily = "sans-serif";
      container.appendChild(input);
      document.body.appendChild(container);


      const box = {
        container,
        input,
        target,
        width: 150,
        height: 30,
        fontSize: 15,
        borderColor: "#e40000",
        bgColor: "#ffffff",
        dragging: false,
        dragOffset: { x: 0, y: 0 },
      };

      container.addEventListener("mousedown", (e) => {
        if (e.target === input) return;
        if (this._isFullscreen()) return;
        box.dragging = true;
        this.activeDrag = box;
        const rect = container.getBoundingClientRect();
        box.dragOffset.x = e.clientX - rect.left;
        box.dragOffset.y = e.clientY - rect.top;
        e.preventDefault();
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") e.preventDefault();
      });

      this.boxes.set(target, box);
      target.setVisible(false);
      vm.runtime.requestRedraw();
      return box;
    }

    _onMouseMove(e) {
      const box = this.activeDrag;
      if (!box) return;
      const canvas = this._getStageCanvas();
      if (!canvas) return;
      const crect = canvas.getBoundingClientRect();
      const stageWidth = vm.runtime.stageWidth;
      const stageHeight = vm.runtime.stageHeight;
      const scaleX = crect.width / stageWidth;
      const scaleY = crect.height / stageHeight;
      const domX = e.clientX - box.dragOffset.x;
      const domY = e.clientY - box.dragOffset.y;
      const w = box.width * scaleX;
      const h = box.height * scaleY;
      box.container.style.left = domX + "px";
      box.container.style.top = domY + "px";
      const centerX = domX + w / 2;
      const centerY = domY + h / 2;
      const stageX = (centerX - crect.left) / scaleX - stageWidth / 2;
      const stageY = stageHeight / 2 - (centerY - crect.top) / scaleY;
      box.target.setXY(stageX, stageY);
    }

    _onMouseUp() {
      if (this.activeDrag) this.activeDrag.dragging = false;
      this.activeDrag = null;
    }

    _updatePosition() {
      const canvas = this._getStageCanvas();
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const stageWidth = vm.runtime.stageWidth;
      const stageHeight = vm.runtime.stageHeight;
      const scaleX = rect.width / stageWidth;
      const scaleY = rect.height / stageHeight;
      for (const box of this.boxes.values()) {
        if (box.dragging) continue;
        const w = box.width * scaleX;
        const h = box.height * scaleY;
        const centerX = rect.left + (box.target.x + stageWidth / 2) * scaleX;
        const centerY = rect.top + (stageHeight / 2 - box.target.y) * scaleY;
        box.container.style.width = w + "px";
        box.container.style.height = h + "px";
        box.input.style.fontSize = box.fontSize * scaleY + "px";
        box.container.style.left = centerX - w / 2 + "px";
        box.container.style.top = centerY - h / 2 + "px";
      }
    }

    _loop() {
      this._updatePosition();
      this._updateCursors();
      requestAnimationFrame(this._loop);
    }

    _removeBox(target) {
      const box = this.boxes.get(target);
      if (!box) return;
      box.container.remove();
      this.boxes.delete(target);
    }

    _hideTarget(target) {
      const box = this.boxes.get(target);
      if (!box) return;
      box.container.remove();
      this.boxes.delete(target);
      target.setVisible(true);
      vm.runtime.requestRedraw();
    }

    _hideAll() {
      for (const target of [...this.boxes.keys()]) this._hideTarget(target);
    }

    getInfo() {
      return {
        id: "textinput",
        name: Scratch.translate("Text Input"),
        color1: "#e40000",
        blocks: [
          {

            opcode: "show",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("show input box"),
          },
          {
            opcode: "hide",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("hide input box"),
          },
          {
            opcode: "setWidth",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set input box width to [W]"),
            arguments: {
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 150 },
            },
          },
          {
            opcode: "setHeight",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set input box height to [H]"),
            arguments: {
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 30 },
            },
          },
          {
            opcode: "setFontSize",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set input box font size to [S]"),
            arguments: {
              S: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
            },
          },
          {
            opcode: "setBorderColor",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set input box border color to [COLOR]"),
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#e40000",
              },
            },
          },
          {
            opcode: "setBgColor",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set input box background to [COLOR]"),
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#FFFFFF",
              },
            },
          },
          "---",
          {
            opcode: "setText",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set input box text to [TEXT]"),
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
            },
          },
          {
            opcode: "getText",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("input box text"),
            disableMonitor: true,
          },
        ],
      };
    }

    show(args, util) {
      let box = this.boxes.get(util.target);
      if (!box) box = this._createBox(util.target);
      box.container.style.display = "flex";
    }

    hide(args, util) {
      this._hideTarget(util.target);
    }

    setWidth({ W }, util) {
      const box = this.boxes.get(util.target);
      if (box) box.width = Scratch.Cast.toNumber(W);
    }

    setHeight({ H }, util) {
      const box = this.boxes.get(util.target);
      if (box) box.height = Scratch.Cast.toNumber(H);
    }

    setFontSize({ S }, util) {
      const box = this.boxes.get(util.target);
      if (box) box.fontSize = Scratch.Cast.toNumber(S);
    }

    setBorderColor({ COLOR }, util) {
      const box = this.boxes.get(util.target);
      if (box) {
        const color = Scratch.Cast.toString(COLOR);
        box.borderColor = color;
        box.container.style.borderColor = color;
      }
    }

    setBgColor({ COLOR }, util) {
      const box = this.boxes.get(util.target);
      if (box) {
        const color = Scratch.Cast.toString(COLOR);
        box.bgColor = color;
        box.container.style.background = color;
      }
    }

    setText({ TEXT }, util) {
      const box = this.boxes.get(util.target);
      if (box) box.input.value = Scratch.Cast.toString(TEXT);
    }

    getText(args, util) {
      const box = this.boxes.get(util.target);
      return box ? box.input.value : "";
    }
  }

  Scratch.extensions.register(new TextInput());
})(Scratch);
