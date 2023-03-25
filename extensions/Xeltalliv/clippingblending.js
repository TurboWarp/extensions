(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Effects extension must be run unsandboxed");
  }


  // Simplified remake of an icon by True-Fantom
  const icon = 'data:image/svg+xml,' + encodeURIComponent(`
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
    if (target == gl.FRAMEBUFFER) {
      if (framebuffer == null) {
        toCorrectThing = true;
        flipY = false;
        width = canvas.width;
        height = canvas.height;
      } else if (renderer._penSkinId) {
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
    bfb.call(this, target, framebuffer);
  };

  // Getting Drawable
  const dr = renderer.createDrawable('background');
  const DrawableProto = renderer._allDrawables[dr].__proto__;
  renderer.destroyDrawable(dr, 'background');

  function setupModes(clipbox, blendMode, flipY) {
    if (clipbox) {
      gl.enable(gl.SCISSOR_TEST);
      let x = (clipbox.x / scratchUnitWidth + 0.5) * width | 0;
      let y = (clipbox.y / scratchUnitHeight + 0.5) * height | 0;
      let x2 = ((clipbox.x + clipbox.w) / scratchUnitWidth + 0.5) * width | 0;
      let y2 = ((clipbox.y + clipbox.h) / scratchUnitHeight + 0.5) * height | 0;
      let w = x2 - x;
      let h = y2 - y;
      if (flipY) {
        y = (-(clipbox.y + clipbox.h) / scratchUnitHeight + 0.5) * height | 0;
      }
      gl.scissor(x, y, w, h);
    } else {
      gl.disable(gl.SCISSOR_TEST);
    }
    switch (blendMode) {
      case 'additive':
        gl.blendFunc(gl.ONE, gl.ONE);
        break;
      case 'multiply':
        gl.blendFunc(gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA);
        break;
      default:
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    }
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
      vm.removeListener('targetsUpdate', regTargetStuff);
      const proto = vm.runtime.targets[0].__proto__;
      const osa = proto.onStopAll;
      proto.onStopAll = function () {
        this.renderer.updateDrawableClipBox.call(renderer, this.drawableID, null);
        this.renderer.updateDrawableBlendMode.call(renderer, this.drawableID, null);
        osa.call(this);
      };
      const mc = proto.makeClone;
      proto.makeClone = function () {
        const newTarget = mc.call(this);
        if (this.clipbox || this.blendMode) {
          newTarget.clipbox = Object.assign({}, this.clipbox);
          newTarget.blendMode = this.blendMode;
          renderer.updateDrawableClipBox.call(renderer, newTarget.drawableID, this.clipbox);
          renderer.updateDrawableBlendMode.call(renderer, newTarget.drawableID, this.blendMode);
        }
        return newTarget;
      };
    }
  };
  vm.on('targetsUpdate', regTargetStuff);


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
    const willDrawPenWithTarget = function(target) {
      if (!penDirty && target == lastTarget) return;
      penDirty = false;

      const clipbox = target.clipbox;
      if ((!lastClipbox ^ !clipbox) ||
          (lastBlendMode != target.blendMode) ||
          (clipbox && (clipbox.x != lastClipbox.x || clipbox.y != lastClipbox.y || clipbox.w != lastClipbox.w || clipbox.h != lastClipbox.h))) {
        if (skin.a_lineColorIndex) {
          skin._flushLines();
        }
        lastTarget = target;
        if (clipbox) {
          lastClipbox = {
            x: clipbox.x,
            y: clipbox.y,
            w: clipbox.w,
            h: clipbox.h
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
    ext_pen._onTargetMoved = function(target, oldX, oldY, isForce) {
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
    ext_pen._penDown = function(target) {
      willDrawPenWithTarget(target);
      penDown.call(this, target);
    };
    // Set up correct clipping/blending before drawing
    const flushLines = skin.__proto__._flushLines;
    skin.__proto__._flushLines = function() {
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
    renderer.createPenSkin = function() {
      let skinId = createPenSkin.call(this);
      patchPen(renderer._allSkins[skinId]);
      renderer.createPenSkin = createPenSkin;
      return skinId;
    };
  }

  class Extension {
    getInfo() {
      return {
        id: 'xeltallivclipblend',
        name: 'Clipping & Blending',
        color1: '#9966FF',
        color2: '#855CD6',
        color3: '#774DCB',
        menuIconURI: icon,
        blocks: [
          {
            opcode: 'setClipbox',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set clipping box x1:[X1] y1:[Y1] x2:[X2] y2:[Y2]',
            arguments: {
              X1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '0'
              },
              Y1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '0'
              },
              X2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '100'
              },
              Y2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '100'
              }
            },
            filter: [Scratch.TargetType.SPRITE]
          },
          {
            opcode: 'clearClipbox',
            blockType: Scratch.BlockType.COMMAND,
            text: 'clear clipping box',
            filter: [Scratch.TargetType.SPRITE]
          },
          {
            opcode: 'getClipbox',
            blockType: Scratch.BlockType.REPORTER,
            text: 'clipping box [PROP]',
            arguments: {
              PROP: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'width',
                menu: 'props'
              }
            },
            filter: [Scratch.TargetType.SPRITE]
          },
          '---',
          {
            opcode: 'setBlend',
            blockType: Scratch.BlockType.COMMAND,
            text: 'use [BLENDMODE] blending ',
            arguments: {
              BLENDMODE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'default',
                menu: 'blends'
              }
            },
            filter: [Scratch.TargetType.SPRITE]
          },
          {
            opcode: 'getBlend',
            blockType: Scratch.BlockType.REPORTER,
            text: 'blending',
            filter: [Scratch.TargetType.SPRITE],
            disableMonitor: true
          },
          '---',
          {
            opcode: 'setAdditiveBlend',
            blockType: Scratch.BlockType.COMMAND,
            text: 'turn additive blending [STATE]',
            arguments: {
              STATE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'on',
                menu: 'states'
              }
            },
            filter: [Scratch.TargetType.SPRITE],
            hideFromPalette: true
          },
          {
            opcode: 'getAdditiveBlend',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is additive blending on?',
            filter: [Scratch.TargetType.SPRITE],
            hideFromPalette: true
          },
        ],
        menus: {
          states: {
            acceptReporters: true,
            items: ['on', 'off']
          },
          blends: {
            acceptReporters: true,
            items: ['default', 'additive', 'multiply']
          },
          props: {
            acceptReporters: true,
            items: ['width', 'height', 'min x', 'min y', 'max x', 'max y']
          },
        }
      };
    }

    setClipbox ({X1, Y1, X2, Y2}, {target}) {
      if (target.isStage) return;
      const newClipbox = {
        x: Math.min(X1, X2),
        y: Math.min(Y1, Y2),
        w: Math.max(X1, X2) - Math.min(X1, X2),
        h: Math.max(Y1, Y2) - Math.min(Y1, Y2)
      };
      penDirty = true;
      target.clipbox = newClipbox;
      renderer.updateDrawableClipBox.call(renderer, target.drawableID, newClipbox);
      if (target.visible) {
        renderer.dirty = true;
        target.emitVisualChange();
        target.runtime.requestRedraw();
        target.runtime.requestTargetsUpdate(target);
      }
    }

    clearClipbox (args, {target}) {
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

    getClipbox ({PROP}, {target}) {
      const clipbox = target.clipbox;
      if (!clipbox) return '';
      switch (PROP) {
        case 'width': return clipbox.w;
        case 'height': return clipbox.h;
        case 'min x': return clipbox.x;
        case 'min y': return clipbox.y;
        case 'max x': return clipbox.x + clipbox.w;
        case 'max y': return clipbox.y + clipbox.h;
        default: return '';
      }
    }

    setBlend ({BLENDMODE}, {target}) {
      let newValue = null;
      switch (BLENDMODE) {
        case 'default':
        case 'additive':
        case 'multiply':
          newValue = BLENDMODE;
          break;
        default:
          return;
      }
      if (target.isStage) return;
      penDirty = true;
      target.blendMode = newValue;
      renderer.updateDrawableBlendMode.call(renderer, target.drawableID, newValue);
      if (target.visible) {
        renderer.dirty = true;
        target.emitVisualChange();
        target.runtime.requestRedraw();
        target.runtime.requestTargetsUpdate(target);
      }
    }

    getBlend (args, {target}) {
      return target.blendMode ?? 'default';
    }

    setAdditiveBlend ({STATE}, util) {
      if (STATE === 'on') this.setBlend ({BLENDMODE: 'additive'}, util);
      if (STATE === 'off') this.setBlend ({BLENDMODE: 'default'}, util);
    }

    getAdditiveBlend (args, {target}) {
      return target.blendMode === 'additive';
    }
  }

  Scratch.extensions.register(new Extension());
})(Scratch);