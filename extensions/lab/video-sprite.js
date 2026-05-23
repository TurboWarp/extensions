// Name: Video sprites
// ID: videoSprites
// Description: A TurboWarp extension that lets you use your webcam inside sprites—either filling the whole sprite or replacing specific colors with live camera video, with adjustable zoom and real-time rendering.
// By: Staevski_G <https://scratch.mit.edu/users/Staevski_G/>
// Original: Scratch Lab

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Video Sprites must run unsandboxed.");
  }

  const runtime = Scratch.vm.runtime;
  const renderer = runtime.renderer;

  const Skin = renderer.exports.Skin;
  const twgl = renderer.exports.twgl;
  const gl = renderer.gl;
  const videoDevice = runtime.ioDevices.video;

  const workCanvas = document.createElement("canvas");
  const workContext = workCanvas.getContext("2d", {
    willReadFrequently: true
  });

  // TODO: zoom should be per-target, not hardcoded
  const sampleVideo = (width, height) => {
    const sourceCanvas = videoDevice.getFrame({ format: "canvas" });
    if (!sourceCanvas) {
      return null;
    }

    const videoW = sourceCanvas.width;
    const videoH = sourceCanvas.height;
    const upscaleFactor = width > height ? videoW / width : videoH / height;
    const cropWidth = width * upscaleFactor;
    const cropHeight = height * upscaleFactor;
    const cropX = (videoW - cropWidth) / 2;
    const cropY = (videoH - cropHeight) / 2;

    workContext.clearRect(0, 0, width, height);
    workContext.drawImage(
      sourceCanvas,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      width,
      height
    );

    return workContext.getImageData(0, 0, width, height).data;
  };

  // TODO: this is wrong, should be MUCH less tolerant
  // TODO: actually handle alpha
  const colorMatches = (r, g, b, alpha, color) => {
    if (!color || alpha === 0) {
      return false;
    }
    const tolerance = 24;
    return Math.abs(r - color.r) <= tolerance &&
      Math.abs(g - color.g) <= tolerance &&
      Math.abs(b - color.b) <= tolerance;
  };

  class VideoSpriteSkin extends Skin {
    constructor(id, target) {
      super(id, renderer);

      // Assumed to always contain webcam feed
      this.private = true;

      this.target = target;

      this.mode = "mask";
      this.color = null;
    }

    dispose() {
      if (this._texture) {
        gl.deleteTexture(this._texture);
        this._texture = null;
      }
      super.dispose();
    }

    _baseSkin() {
      const costume = this.target.sprite.costumes[this.target.currentCostume];
      if (!costume || typeof costume.skinId !== "number") {
        return null;
      }
      return renderer._allSkins[costume.skinId] || null;
    }

    get size() {
      const base = this._baseSkin();
      return base ? base.size : [0, 0];
    }

    get rotationCenter() {
      const base = this._baseSkin();
      return base ? base.rotationCenter : this._rotationCenter;
    }

    useNearest() {
      return false;
    }

    getTexture(scale) {
      this._render();
      return this._texture || super.getTexture(scale);
    }

    updateSilhouette() {
      this._render();
      this._silhouette.unlazy();
    }

    _render() {
      const baseSkin = this._baseSkin();
      if (!baseSkin) {
        return;
      }

      baseSkin.updateSilhouette();
      const silhouette = baseSkin._silhouette;
      const silhouetteData = silhouette._colorData;
      const width = silhouette._width;
      const height = silhouette._height;
      if (!width || !height || !silhouetteData) {
        return;
      }

      if (workCanvas.width !== width || workCanvas.height !== height) {
        workCanvas.width = width;
        workCanvas.height = height;
      }

      const sourceData = sampleVideo(width, height);
      if (!sourceData) {
        return;
      }

      const out = new Uint8ClampedArray(silhouetteData);
      const color = this.color;
      const isMask = this.mode === "mask";

      for (let i = 0; i < out.length; i += 4) {
        const alpha = out[i + 3];
        if (alpha === 0) {
          continue;
        }

        const shouldFill = isMask
          ? true
          : colorMatches(out[i], out[i + 1], out[i + 2], alpha, color);

        if (shouldFill) {
          out[i] = sourceData[i];
          out[i + 1] = sourceData[i + 1];
          out[i + 2] = sourceData[i + 2];
        }
      }

      workContext.putImageData(new ImageData(out, width, height), 0, 0);

      if (!this._texture) {
        this._texture = twgl.createTexture(gl, {
          auto: false,
          wrap: gl.CLAMP_TO_EDGE
        });
      }
      this._setTexture(workCanvas);
    }
  }

  class VideoSpritesExtension {
    constructor() {
      this.fillStates = new Map();
      this._hidPreview = false;

      runtime.on("BEFORE_EXECUTE", () => this._onBeforeExecute());
      runtime.on("PROJECT_STOP_ALL", () => this._disposeAll());
      runtime.on("PROJECT_LOADED", () => this._disposeAll());
      runtime.on("targetWasRemoved", (target) => {
        const skin = this.fillStates.get(target.id);
        if (skin) {
          renderer.destroySkin(skin.id);
          this.fillStates.delete(target.id);
        }
      });
    }

    getInfo() {
      return {
        id: "videoSprites",
        name: "Video Sprites",
        blocks: [
          {
            opcode: "videoSpriteFillSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: "fill sprite with camera"
          },
          {
            opcode: "videoSpriteFillColor",
            blockType: Scratch.BlockType.COMMAND,
            text: "fill [COLOR] with camera",
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ffab19"
              }
            }
          },
          '---',
          {
            opcode: "changeCameraBy",
            blockType: Scratch.BlockType.COMMAND,
            text: "change camera zoom by [CAMERA_SCALE_INC]",
            arguments: {
              CAMERA_SCALE_INC: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 25
              }
            }
          },
          {
            opcode: "scaleCamera",
            blockType: Scratch.BlockType.COMMAND,
            text: "set camera zoom [CAMERA_SCALE]",
            arguments: {
              CAMERA_SCALE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              }
            }
          },
          '---',
          {
            opcode: "videoSpriteOff",
            blockType: Scratch.BlockType.COMMAND,
            text: "stop filling with camera"
          }
        ]
      };
    }

    async videoSpriteFillSprite(args, util) {
      if (!(await this.ensureCamera())) {
        return;
      }
      const skin = this._getOrCreateSkin(util.target);
      skin.mode = "mask";
      skin.color = null;
      this._attach(util.target, skin);
    }

    async videoSpriteFillColor(args, util) {
      if (!(await this.ensureCamera())) {
        return;
      }
      const skin = this._getOrCreateSkin(util.target);
      skin.mode = "color";
      skin.color = Scratch.Cast.toRgbColorObject(args.COLOR);
      this._attach(util.target, skin);
    }

    // TODO: zoom needs to be per-target rather than global. Hardcoded for now.
    changeCameraBy() {}

    scaleCamera() {}

    videoSpriteOff(args, util) {
      const target = util.target;
      const skin = this.fillStates.get(target.id);
      if (!skin) {
        return;
      }
      target.setCostume(target.currentCostume);
      renderer.destroySkin(skin.id);
      this.fillStates.delete(target.id);
    }

    async ensureCamera() {
      try {
        await videoDevice.enableVideo();
        if (!this._hidPreview) {
          this._hidPreview = true;
          videoDevice.setPreviewGhost(100);
        }
        return true;
      } catch (error) {
        return false;
      }
    }

    _getOrCreateSkin(target) {
      const existing = this.fillStates.get(target.id);
      if (existing) {
        return existing;
      }
      const id = renderer._nextSkinId++;
      const skin = new VideoSpriteSkin(id, target);
      renderer._allSkins[id] = skin;
      this.fillStates.set(target.id, skin);
      return skin;
    }

    _attach(target, skin) {
      renderer.updateDrawableSkinId(target.drawableID, skin.id);
      skin.emitWasAltered();
      runtime.requestRedraw();
    }

    _onBeforeExecute() {
      if (this.fillStates.size === 0) {
        return;
      }
      for (const [targetId, skin] of this.fillStates) {
        const target = runtime.getTargetById(targetId);
        if (!target) {
          renderer.destroySkin(skin.id);
          this.fillStates.delete(targetId);
          continue;
        }
        const drawable = renderer._allDrawables[target.drawableID];
        if (drawable && drawable.skin !== skin) {
          renderer.updateDrawableSkinId(target.drawableID, skin.id);
        }
        skin.emitWasAltered();
      }
    }

    _disposeAll() {
      for (const [targetId, skin] of this.fillStates) {
        const target = runtime.getTargetById(targetId);
        if (target) {
          target.setCostume(target.currentCostume);
        }
        renderer.destroySkin(skin.id);
      }
      this.fillStates.clear();
    }
  }

  Scratch.extensions.register(new VideoSpritesExtension());
})(Scratch);
