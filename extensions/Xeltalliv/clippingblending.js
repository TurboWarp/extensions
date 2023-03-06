(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Effects extension must be run unsandboxed");
  }


  // Simplified remake of an icon by True-Fantom
  const icon = 'data:image/svg+xml,' + encodeURIComponent(`
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,360,360">
      <circle cx="180" cy="180" r="180" fill="#9966FF"/>
      <path d="M180,350
       c-25,-85  -77,-137 -162,-162
       c 85,-25  137, -77  162,-162
       c 25, 85   77, 137  162, 162
       c-85, 25 -137,  77 -162, 162z" stroke-width="0" fill="#ffffff"/>
    </svg>`);


  let toCorrectThing = null;
  let active = false;
  let flipY = false;
  const vm = Scratch.vm;
  const renderer = vm.renderer;
  const _drawThese = renderer._drawThese;
  const gl = renderer._gl;
  const canvas = renderer.canvas;
  let width = 0;
  let height = 0;
  let scratchUnitWidth = 480;
  let scratchUnitHeight = 360;


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

  // Modifying and expanding Drawable
  const gu = DrawableProto.getUniforms;
  DrawableProto.getUniforms = function () {
    if (active && toCorrectThing) {
      if (this.clipbox) {
        gl.enable(gl.SCISSOR_TEST);
        let x = (this.clipbox.x / scratchUnitWidth + 0.5) * width;
        let y = (this.clipbox.y / scratchUnitHeight + 0.5) * height;
        let w = (this.clipbox.w / scratchUnitWidth) * width;
        let h = (this.clipbox.h / scratchUnitHeight) * height;
        if (flipY) {
          y = (-(this.clipbox.y + this.clipbox.h) / scratchUnitHeight + 0.5) * height;
        }
        gl.scissor(x, y, w, h);
      } else {
        gl.disable(gl.SCISSOR_TEST);
      }
      if (this.additiveBlend) {
        gl.blendFunc(gl.ONE, gl.ONE);
      } else {
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      }
    }
    return gu.call(this);
  };
  DrawableProto.updateClipBox = function (clipbox) {
    this.clipbox = clipbox;
  };
  DrawableProto.updateAdditiveBlend = function (enabled) {
    this.additiveBlend = enabled;
  };


  // Expanding renderer
  renderer.updateDrawableClipBox = function (drawableID, clipbox) {
    const drawable = this._allDrawables[drawableID];
    if (!drawable) return;
    drawable.updateClipBox(clipbox);
  };
  renderer.updateDrawableAdditiveBlend = function (drawableID, enabled) {
    const drawable = this._allDrawables[drawableID];
    if (!drawable) return;
    drawable.updateAdditiveBlend(enabled);
  };


  // Reset on stop & clones inherit effects
  const regTargetStuff = function (args) {
    if (args.editingTarget) {
      vm.removeListener('targetsUpdate', regTargetStuff);
      const proto = vm.runtime.targets[0].__proto__;
      const osa = proto.onStopAll;
      proto.onStopAll = function () {
        this.renderer.updateDrawableClipBox.call(renderer, this.drawableID, null);
        this.renderer.updateDrawableAdditiveBlend.call(renderer, this.drawableID, false);
        osa.call(this);
      };
      const mc = proto.makeClone;
      proto.makeClone = function () {
        const newTarget = mc.call(this);
        if (this.clipbox) {
          newTarget.clipbox = Object.assign({}, this.clipbox);
          newTarget.additiveBlend = this.additiveBlend;
          renderer.updateDrawableClipBox.call(renderer, newTarget.drawableID, this.clipbox);
          renderer.updateDrawableAdditiveBlend.call(renderer, newTarget.drawableID, this.additiveBlend);
        }
        return newTarget;
      };
    }
  };
  vm.on('targetsUpdate', regTargetStuff);


  class Extension {
    getInfo() {
      return {
        id: 'xeltallivclipblend',
        name: 'Clipping, blending',
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
            filter: [Scratch.TargetType.SPRITE]
          },
          {
            opcode: 'getAdditiveBlend',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is additive blending on?',
            filter: [Scratch.TargetType.SPRITE]
          },
        ],
        menus: {
          states: {
            acceptReporters: true,
            items: ['on', 'off']
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
      renderer.updateDrawableClipBox.call(renderer, target.drawableID, null);
      if (target.visible) {
        renderer.dirty = true;
        target.emitVisualChange();
        target.runtime.requestRedraw();
        target.runtime.requestTargetsUpdate(target);
      }
    }

    setAdditiveBlend ({STATE}, {target}) {
      let newValue = null;
      if (STATE === 'on') newValue = true;
      if (STATE === 'off') newValue = false;
      if (newValue === null) return;

      if (target.isStage) return;
      target.additiveBlend = newValue;
      renderer.updateDrawableAdditiveBlend.call(renderer, target.drawableID, newValue);
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

    getAdditiveBlend (args, {target}) {
      return target.additiveBlend ?? false;
    }
  }

  Scratch.extensions.register(new Extension());
})(Scratch);