// Name: Clipping & Blending
// ID: xeltallivclipblend
// Description: Clipping outside of a specified rectangular area and different color blending modes.
// By: Vadik1 <https://scratch.mit.edu/users/Vadik1/>
// License: MIT

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Clipping & Blending extension must be run unsandboxed");
  }

  // Simplified remake of an icon by True-Fantom
  const icon =
    "data:image/svg+xml," +
    encodeURIComponent(`
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,200,200">
      <circle r="100" cx="100" cy="100" fill="#9966ff"/>
      <path d="M122,61v-4a12,12 0,0,0 -12,-12h-4m-17,0h-16m-17,0h-4a12,12 0,0,0 -12,12v4m0,17v16m0,17v4a12,12 0,0,0 12,12h4" stroke="#ffffff" stroke-width="11" stroke-linecap="round" fill="none"/>
      <g fill="#ffffff" stroke="#9966ff" stroke-width="7.5">
        <circle r="32" cx="118" cy="102"/>
        <circle r="32" cx="96" cy="137"/>
        <circle r="32" cx="140" cy="137"/>
      </g>
    </svg>`);

  let toCorrectThing = null;
  let active = false;
  let flipY = false;
  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const renderer = vm.renderer;
  const _drawThese = renderer._drawThese;
  const gl = renderer._gl;
  const canvas = renderer.canvas;
  let width = 0;
  let height = 0;
  let scratchUnitWidth = 480;
  let scratchUnitHeight = 360;
  let penDirty = false;
  const publicApi =
    runtime.ext_clippingblendingapi ?? (runtime.ext_clippingblendingapi = {});
  if (!publicApi.mainFramebuffer) publicApi.mainFramebuffer = null;
  if (!publicApi.setActive)
    publicApi.setActive = (value) => {
      active = value;
    };

  // prettier-ignore
  const Blendings = Object.assign(Object.create(null), {
    "default": [gl.ONE, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA, gl.FUNC_ADD],
    "default behind": [gl.ONE_MINUS_DST_ALPHA, gl.ONE, gl.ONE_MINUS_DST_ALPHA, gl.ONE, gl.FUNC_ADD],
    "additive": [gl.ONE, gl.ONE, gl.ZERO, gl.ONE, gl.FUNC_ADD],
    "additive with alpha": [gl.ONE, gl.ONE, gl.ONE, gl.ONE, gl.FUNC_ADD],
    "additive legacy": [gl.ONE, gl.ONE, gl.ONE, gl.ONE, gl.FUNC_ADD],
    "subtract": [gl.ONE, gl.ONE, gl.ZERO, gl.ONE, gl.FUNC_REVERSE_SUBTRACT],
    "subtract with alpha": [gl.ONE, gl.ONE, gl.ONE, gl.ONE, gl.FUNC_REVERSE_SUBTRACT],
    "subtract legacy": [gl.ONE, gl.ONE, gl.ONE, gl.ONE, gl.FUNC_REVERSE_SUBTRACT],
    "multiply": [gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA, gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA, gl.FUNC_ADD],
    "invert": [gl.ONE_MINUS_DST_COLOR, gl.ONE_MINUS_SRC_COLOR, gl.ZERO, gl.ONE, gl.FUNC_ADD],
    "invert legacy": [gl.ONE_MINUS_DST_COLOR, gl.ONE_MINUS_SRC_COLOR, gl.ONE_MINUS_DST_COLOR, gl.ONE_MINUS_SRC_COLOR, gl.FUNC_ADD],
    "mask": [gl.ZERO, gl.SRC_ALPHA, gl.ZERO, gl.SRC_ALPHA, gl.FUNC_ADD],
    "erase": [gl.ZERO, gl.ONE_MINUS_SRC_ALPHA, gl.ZERO, gl.ONE_MINUS_SRC_ALPHA, gl.FUNC_ADD],
  });

  renderer._drawThese = function (drawables, drawMode, projection, opts) {
    active = true;
    [scratchUnitWidth, scratchUnitHeight] = renderer.getNativeSize();
    _drawThese.call(this, drawables, drawMode, projection, opts);
    gl.disable(gl.SCISSOR_TEST);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    active = false;
  };

  const bfb = gl.bindFramebuffer;
  gl.bindFramebuffer = function (target, framebuffer) {
    let toCanvas = false;
    if (target == gl.FRAMEBUFFER) {
      if (framebuffer == publicApi.mainFramebuffer) {
        toCanvas = true;
        toCorrectThing = true;
        flipY = false;
        width = canvas.width;
        height = canvas.height;
      } else if (renderer._penSkinId !== null) {
        const fbInfo = renderer._allSkins[renderer._penSkinId]._framebuffer;
        if (framebuffer == fbInfo.framebuffer) {
          toCorrectThing = true;
          flipY = true;
          width = fbInfo.width;
          height = fbInfo.height;
        } else {
          toCorrectThing = false;
        }
      } else {
        toCorrectThing = false;
      }
    }
    if (toCanvas === true) {
      Blendings["subtract legacy"][2] = gl.ZERO;
      Blendings["invert legacy"][2] = gl.ZERO;
      Blendings["invert legacy"][3] = gl.ONE;
    } else {
      Blendings["subtract legacy"][2] = gl.ONE;
      Blendings["invert legacy"][2] = gl.ONE_MINUS_DST_COLOR;
      Blendings["invert legacy"][3] = gl.ONE_MINUS_SRC_COLOR;
    }
    bfb.call(this, target, framebuffer);
  };

  // Getting Drawable
  const dr = renderer.createDrawable("background");
  const DrawableProto = renderer._allDrawables[dr].__proto__;
  renderer.destroyDrawable(dr, "background");

  function setupModes(clipbox, blendMode, flipY) {
    if (clipbox) {
      gl.enable(gl.SCISSOR_TEST);
      let x = ((clipbox.x_min / scratchUnitWidth + 0.5) * width) | 0;
      let y = ((clipbox.y_min / scratchUnitHeight + 0.5) * height) | 0;
      let x2 = ((clipbox.x_max / scratchUnitWidth + 0.5) * width) | 0;
      let y2 = ((clipbox.y_max / scratchUnitHeight + 0.5) * height) | 0;
      let w = x2 - x;
      let h = y2 - y;
      if (flipY) {
        y = ((-clipbox.y_max / scratchUnitHeight + 0.5) * height) | 0;
      }
      gl.scissor(x, y, w, h);
    } else {
      gl.disable(gl.SCISSOR_TEST);
    }
    const blend = Blendings[blendMode] ?? Blendings.default;
    gl.blendEquation(blend[4]);
    gl.blendFuncSeparate(blend[0], blend[1], blend[2], blend[3]);
  }

  // Modifying and expanding Drawable
  const gu = DrawableProto.getUniforms;
  DrawableProto.getUniforms = function () {
    if (active && toCorrectThing) {
      setupModes(this.clipbox, this.blendMode, flipY);
    }
    return gu.call(this);
  };
  DrawableProto.updateClipBox = function (clipbox) {
    this.clipbox = clipbox;
  };
  DrawableProto.updateBlendMode = function (blendMode) {
    this.blendMode = blendMode;
  };

  // Expanding renderer
  renderer.updateDrawableClipBox = function (drawableID, clipbox) {
    const drawable = this._allDrawables[drawableID];
    if (!drawable) return;
    drawable.updateClipBox(clipbox);
  };
  renderer.updateDrawableBlendMode = function (drawableID, blendMode) {
    const drawable = this._allDrawables[drawableID];
    if (!drawable) return;
    drawable.updateBlendMode(blendMode);
  };

  // Reset on stop & clones inherit effects
  const regTargetStuff = function (args) {
    if (args.editingTarget) {
      vm.removeListener("targetsUpdate", regTargetStuff);
      const proto = vm.runtime.targets[0].__proto__;
      const osa = proto.onStopAll;
      proto.onStopAll = function () {
        this.clipbox = null;
        this.blendMode = "default";
        this.renderer.updateDrawableClipBox.call(
          renderer,
          this.drawableID,
          null
        );
        this.renderer.updateDrawableBlendMode.call(
          renderer,
          this.drawableID,
          null
        );
        osa.call(this);
      };
      const mc = proto.makeClone;
      proto.makeClone = function () {
        const newTarget = mc.call(this);
        if (this.clipbox || this.blendMode) {
          newTarget.clipbox = this.clipbox
            ? Object.assign({}, this.clipbox)
            : null;
          newTarget.blendMode = this.blendMode;
          renderer.updateDrawableClipBox.call(
            renderer,
            newTarget.drawableID,
            this.clipbox
          );
          renderer.updateDrawableBlendMode.call(
            renderer,
            newTarget.drawableID,
            this.blendMode
          );
        }
        return newTarget;
      };
    }
  };
  vm.on("targetsUpdate", regTargetStuff);

  // Pen lines support
  let emptyObject = {};
  let lastTarget = emptyObject;
  let lastClipbox = {};
  let lastBlendMode = "default";
  function patchPen(skin) {
    const ext_pen = runtime.ext_pen;
    skin._lineOnBufferDrawRegionId.exit = () => {
      skin._exitDrawLineOnBuffer();
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.disable(gl.SCISSOR_TEST);
      lastTarget = emptyObject;
      lastClipbox = null;
      lastBlendMode = "default";
    };
    const willDrawPenWithTarget = function (target) {
      if (!penDirty && target == lastTarget) return;
      penDirty = false;

      const clipbox = target.clipbox;
      if (
        !lastClipbox ^ !clipbox ||
        lastBlendMode != target.blendMode ||
        (clipbox &&
          (clipbox.x_min != lastClipbox.x_min ||
            clipbox.y_min != lastClipbox.y_min ||
            clipbox.x_max != lastClipbox.x_max ||
            clipbox.y_max != lastClipbox.y_max))
      ) {
        if (skin.attribute_index || skin.a_lineColorIndex) {
          // Supporting both before and after https://github.com/TurboWarp/scratch-render/pull/11
          skin._flushLines();
        }
        lastTarget = target;
        if (clipbox) {
          lastClipbox = {
            x_min: clipbox.x_min,
            y_min: clipbox.y_min,
            x_max: clipbox.x_max,
            y_max: clipbox.y_max,
          };
        } else {
          lastClipbox = null;
        }
        lastBlendMode = target.blendMode;
      }
    };
    // onTargetMoved function of pen draws a line.
    // When drawing a line it is important to know the target.
    // This saves target.
    const onTargetMoved = ext_pen._onTargetMoved;
    ext_pen._onTargetMoved = function (target, oldX, oldY, isForce) {
      willDrawPenWithTarget(target);
      onTargetMoved.call(this, target, oldX, oldY, isForce);
    };
    // Existing tragets may still have old onTargetMoved
    for (let target in runtime.tragets) {
      if (target.onTargetMoved == onTargetMoved) {
        target.onTargetMoved = ext_pen._onTargetMoved;
      }
    }
    // When drawing a dot it is important to know the target.
    // This saves target.
    const penDown = ext_pen._penDown;
    ext_pen._penDown = function (target) {
      willDrawPenWithTarget(target);
      penDown.call(this, target);
    };
    // Set up correct clipping/blending before drawing
    const flushLines = skin.__proto__._flushLines;
    skin.__proto__._flushLines = function () {
      setupModes(lastClipbox, lastBlendMode, true);
      flushLines.call(this);
    };
  }
  if (renderer._allSkins[renderer._penSkinId]) {
    // If pen skin already exists, things can be patched
    patchPen(renderer._allSkins[renderer._penSkinId]);
  } else {
    // If pen skin does not exist, wait until it will,
    // trigger code once, and return everything as it was
    const createPenSkin = renderer.createPenSkin;
    renderer.createPenSkin = function () {
      let skinId = createPenSkin.call(this);
      patchPen(renderer._allSkins[skinId]);
      renderer.createPenSkin = createPenSkin;
      return skinId;
    };
  }

  class Extension {
    getInfo() {
      return {
        id: "xeltallivclipblend",
        name: Scratch.translate("Clipping & Blending"),
        color1: "#9966FF",
        color2: "#855CD6",
        color3: "#774DCB",
        menuIconURI: icon,
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Stage selected: no blocks"),
            filter: [Scratch.TargetType.STAGE],
          },
          {
            opcode: "setClipbox",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set clipping box x1:[X1] y1:[Y1] x2:[X2] y2:[Y2]"
            ),
            arguments: {
              X1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              Y1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              X2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
              Y2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
            },
            filter: [Scratch.TargetType.SPRITE],
            extensions: ["colours_looks"],
          },
          {
            opcode: "clearClipbox",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("clear clipping box"),
            filter: [Scratch.TargetType.SPRITE],
            extensions: ["colours_looks"],
          },
          {
            opcode: "getClipbox",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("clipping box [PROP]"),
            arguments: {
              PROP: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "width",
                menu: "props",
              },
            },
            filter: [Scratch.TargetType.SPRITE],
            extensions: ["colours_looks"],
          },
          "---",
          {
            opcode: "setBlend2",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("use [BLENDMODE] blending"),
            arguments: {
              BLENDMODE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "default",
                menu: "blends2",
              },
            },
            filter: [Scratch.TargetType.SPRITE],
            extensions: ["colours_looks"],
          },
          {
            opcode: "setBlend",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("use [BLENDMODE] blending (old)"),
            arguments: {
              BLENDMODE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "default",
                menu: "blends",
              },
            },
            filter: [Scratch.TargetType.SPRITE],
            hideFromPalette: true,
            extensions: ["colours_looks"],
          },
          {
            opcode: "getBlend",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("blending"),
            filter: [Scratch.TargetType.SPRITE],
            disableMonitor: true,
            extensions: ["colours_looks"],
          },
          "---",
          {
            opcode: "setAdditiveBlend",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("turn additive blending [STATE]"),
            arguments: {
              STATE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "on",
                menu: "states",
              },
            },
            filter: [Scratch.TargetType.SPRITE],
            hideFromPalette: true,
            extensions: ["colours_looks"],
          },
          {
            opcode: "getAdditiveBlend",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is additive blending on?"),
            filter: [Scratch.TargetType.SPRITE],
            hideFromPalette: true,
            disableMonitor: true,
            extensions: ["colours_looks"],
          },
        ],
        menus: {
          states: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("on"), value: "on" },
              { text: Scratch.translate("off"), value: "off" },
            ],
          },
          blends: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("default"), value: "default" },
              { text: Scratch.translate("additive"), value: "additive" }, // -> additive legacy
              { text: Scratch.translate("subtract"), value: "subtract" }, // -> subtract legacy
              { text: Scratch.translate("multiply"), value: "multiply" },
              { text: Scratch.translate("invert"), value: "invert" }, // -> invert legacy
            ],
          },
          blends2: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("default"), value: "default" },
              {
                text: Scratch.translate("default behind"),
                value: "default behind",
              },
              { text: Scratch.translate("additive"), value: "additive" },
              {
                text: Scratch.translate("additive with alpha"),
                value: "additive with alpha",
              },
              { text: Scratch.translate("subtract"), value: "subtract" },
              {
                text: Scratch.translate("subtract with alpha"),
                value: "subtract with alpha",
              },
              { text: Scratch.translate("multiply"), value: "multiply" },
              { text: Scratch.translate("invert"), value: "invert" },
              { text: Scratch.translate("mask"), value: "mask" },
              { text: Scratch.translate("erase"), value: "erase" },
            ],
          },
          props: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("width"), value: "width" },
              { text: Scratch.translate("height"), value: "height" },
              { text: Scratch.translate("min x"), value: "min x" },
              { text: Scratch.translate("min y"), value: "min y" },
              { text: Scratch.translate("max x"), value: "max x" },
              { text: Scratch.translate("max y"), value: "max y" },
            ],
          },
        },
      };
    }

    setClipbox({ X1, Y1, X2, Y2 }, { target }) {
      if (target.isStage) return;
      const newClipbox = {
        x_min: Math.min(X1, X2),
        y_min: Math.min(Y1, Y2),
        x_max: Math.max(X1, X2),
        y_max: Math.max(Y1, Y2),
      };
      penDirty = true;
      target.clipbox = newClipbox;
      renderer.updateDrawableClipBox.call(
        renderer,
        target.drawableID,
        newClipbox
      );
      if (target.visible) {
        renderer.dirty = true;
        target.emitVisualChange();
        target.runtime.requestRedraw();
        target.runtime.requestTargetsUpdate(target);
      }
    }

    clearClipbox(args, { target }) {
      if (target.isStage) return;
      target.clipbox = null;
      penDirty = true;
      renderer.updateDrawableClipBox.call(renderer, target.drawableID, null);
      if (target.visible) {
        renderer.dirty = true;
        target.emitVisualChange();
        target.runtime.requestRedraw();
        target.runtime.requestTargetsUpdate(target);
      }
    }

    getClipbox({ PROP }, { target }) {
      const clipbox = target.clipbox;
      if (!clipbox) return "";
      switch (PROP) {
        case "width":
          return clipbox.x_max - clipbox.x_min;
        case "height":
          return clipbox.y_max - clipbox.y_min;
        case "min x":
          return clipbox.x_min;
        case "min y":
          return clipbox.y_min;
        case "max x":
          return clipbox.x_max;
        case "max y":
          return clipbox.y_max;
        default:
          return "";
      }
    }

    setBlend({ BLENDMODE }, { target }) {
      switch (BLENDMODE) {
        case "additive":
          this._setBlend("additive legacy", target);
          return;
        case "subtract":
          this._setBlend("subtract legacy", target);
          return;
        case "invert":
          this._setBlend("invert legacy", target);
          return;
        case "default":
        case "multiply":
          this._setBlend(BLENDMODE, target);
          return;
        default:
          return;
      }
    }

    setBlend2({ BLENDMODE }, { target }) {
      switch (BLENDMODE) {
        case "default":
        case "default behind":
        case "additive":
        case "additive with alpha":
        case "subtract":
        case "subtract with alpha":
        case "multiply":
        case "invert":
        case "mask":
        case "erase":
          this._setBlend(BLENDMODE, target);
          return;
        default:
          return;
      }
    }

    _setBlend(newValue, target) {
      if (target.isStage) return;
      penDirty = true;
      target.blendMode = newValue;
      renderer.updateDrawableBlendMode.call(
        renderer,
        target.drawableID,
        newValue
      );
      if (target.visible) {
        renderer.dirty = true;
        target.emitVisualChange();
        target.runtime.requestRedraw();
        target.runtime.requestTargetsUpdate(target);
      }
    }

    getBlend(args, { target }) {
      switch (target.blendMode) {
        case "additive legacy":
          return "additive";
        case "subtract legacy":
          return "subtract";
        case "invert legacy":
          return "invert";
        default:
          return target.blendMode ?? "default";
      }
    }

    setAdditiveBlend({ STATE }, { target }) {
      if (STATE === "on") this._setBlend("additive legacy", target);
      if (STATE === "off") this._setBlend("default", target);
    }

    getAdditiveBlend(args, { target }) {
      switch (target.blendMode) {
        case "additive":
        case "additive legacy":
        case "additive with alpha":
          return true;
        default:
          return false;
      }
    }
  }

  Scratch.extensions.register(new Extension());
})(Scratch);
