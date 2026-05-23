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
  if (!workContext) {
    throw new Error('Failed to get 2D rendering context for work canvas');
  }

  /**
   * Get cropped/scaled video frame.
   * @param {number} width
   * @param {number} height
   * @returns {boolean} true if a frame was drawn
   */
  const sampleVideo = (width, height) => {
    const videoCanvas = videoDevice.getFrame({
      format: "canvas"
    });

    if (!videoCanvas) {
      return false;
    }

    const videoWidth = videoCanvas.width;
    const videoHeight = videoCanvas.height;
    const upscaleFactor = width > height ? videoWidth / width : videoHeight / height;
    const cropWidth = width * upscaleFactor;
    const cropHeight = height * upscaleFactor;
    const cropX = (videoWidth - cropWidth) / 2;
    const cropY = (videoHeight - cropHeight) / 2;

    workContext.drawImage(
      videoCanvas,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      width,
      height
    );
    return true;
  };

  const colorMatches = (r1, g1, b1, r2, g2, b2) => {
    const tolerance = 1;
    return Math.abs(r1 - r2) <= tolerance &&
      Math.abs(g1 - g2) <= tolerance &&
      Math.abs(b1 - b2) <= tolerance;
  };

  class VideoSpriteSkin extends Skin {
    constructor(id, target) {
      super(id, renderer);

      // Assumed to always contain webcam feed
      this.private = true;

      this.target = target;

      this.mode = "mask";
      this.maskColor = null;
    }

    dispose() {
      if (this._texture) {
        gl.deleteTexture(this._texture);
        this._texture = null;
      }
      super.dispose();
    }

    _parentSkin() {
      const costume = this.target.sprite.costumes[this.target.currentCostume];
      if (!costume || typeof costume.skinId !== "number") {
        return null;
      }
      return renderer._allSkins[costume.skinId] || null;
    }

    get size() {
      const parent = this._parentSkin();
      return parent ? parent.size : [1, 1];
    }

    get rotationCenter() {
      const parent = this._parentSkin();
      return parent ? parent.rotationCenter : [0, 0];
    }

    useNearest(scale, drawable) {
      const parent = this._parentSkin();
      return parent ? parent.useNearest(scale, drawable) : true;
    }

    getTexture(scale) {
      this._render();
      return this._texture || super.getTexture(scale);
    }

    updateSilhouette(scale) {
      this.getTexture(scale);
      this._silhouette.unlazy();
    }

    _render() {
      const parent = this._parentSkin();
      if (!parent) {
        // Parent skin does not exist - fall back to empty
        this.setEmptyImageData();
        return;
      }

      parent.updateSilhouette();
      const silhouette = parent._silhouette;
      const silhouetteData = silhouette._colorData;
      const width = silhouette._width;
      const height = silhouette._height;
      if (!width || !height || !silhouetteData) {
        // Something is wrong with the parent skin - fall back to empty
        this.setEmptyImageData();
        return;
      }

      if (workCanvas.width !== width || workCanvas.height !== height) {
        workCanvas.width = width;
        workCanvas.height = height;
      }

      if (!sampleVideo(width, height)) {
        return;
      }

      const sampledVideoData = workContext.getImageData(0, 0, width, height).data;
      const outData = new Uint8ClampedArray(silhouetteData);

      const isMask = this.mode === "mask";
      const maskColor = this.maskColor;

      for (let i = 0; i < outData.length; i += 4) {
        const alpha = outData[i + 3];
        if (alpha === 0) {
          continue;
        }

        const shouldFill = isMask
          ? true
          : colorMatches(outData[i], outData[i + 1], outData[i + 2], maskColor.r, maskColor.g, maskColor.b);

        if (shouldFill) {
          outData[i] = sampledVideoData[i];
          outData[i + 1] = sampledVideoData[i + 1];
          outData[i + 2] = sampledVideoData[i + 2];
        }
      }

      if (!this._texture) {
        this._texture = twgl.createTexture(gl, {
          auto: false,
          wrap: gl.CLAMP_TO_EDGE
        });
      }

      this._setTexture(new ImageData(outData, width, height));
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
