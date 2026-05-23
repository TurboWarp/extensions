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

  const MIN_ZOOM = 20;
  const MAX_ZOOM = 2000;

  // TODO: why are we handling Infinity differently? that's just clearly wrong. and NaN shouldn't be possible.
  const clampZoom = (value) => {
    const zoom = Number.isFinite(value) ? value : 100;
    return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom));
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

  // TODO: remove - should not be needed
  const getCurrentCostume = (target) =>
    target.sprite.costumes[target.currentCostume] || {};

  // TODO: remove
  const getBaseImageSize = (image) => ({
    width: image.naturalWidth || image.videoWidth || image.width || 0,
    height: image.naturalHeight || image.videoHeight || image.height || 0
  });

  // TODO: remove - should not be needed
  const getDrawableSkinId = (drawable) => {
    if (!drawable) {
      return undefined;
    }
    if (typeof drawable.skin === "object" && drawable.skin && typeof drawable.skin.id === "number") {
      return drawable.skin.id;
    }
    if (typeof drawable._skinId === "number") {
      return drawable._skinId;
    }
    if (typeof drawable.skinId === "number") {
      return drawable.skinId;
    }
    return undefined;
  };

  const getTargetBaseSkinId = (target, drawable) => {
    const costume = getCurrentCostume(target);
    if (typeof costume.skinId === "number") {
      return costume.skinId;
    }
    const drawableSkinId = getDrawableSkinId(drawable);
    const generatedSkinId = target.__videoSpritesSkinId;
    if (drawableSkinId !== undefined && drawableSkinId !== generatedSkinId) {
      return drawableSkinId;
    }
    return target.__videoSpritesOriginalSkinId;
  };

  const rememberOriginalSkin = (target, drawable, baseSkinId) => {
    if (target.__videoSpritesOriginalSkinId !== undefined) {
      return;
    }
    const currentSkinId = getDrawableSkinId(drawable);
    target.__videoSpritesOriginalSkinId = currentSkinId !== undefined ? currentSkinId : baseSkinId;
  };

  class VideoSpritesExtension {
    constructor() {
      this.vm = Scratch.vm;
      this.runtime = this.vm.runtime;
      this.renderer = this.runtime.renderer;
      this.videoDevice = this.runtime.ioDevices.video;

      this.workCanvas = document.createElement("canvas");
      this.workContext = this.workCanvas.getContext("2d", {
        willReadFrequently: true
      });

      this.zoom = 100;
      this.renderHandle = null;
      this.isRendering = false;
      this.fillStates = new Map();
      this._hidPreview = false;

      const _boundRefresh = this.refreshAllTargets.bind(this);
      this.runtime.on("PROJECT_STOP_ALL", _boundRefresh);
      this.runtime.on("PROJECT_LOADED", _boundRefresh);
      this.runtime.on("PROJECT_CHANGED", _boundRefresh);
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
      const target = util.target;

      if (!(await this.ensureCamera())) {
        return;
      }

      this.fillStates.set(target.id, {
        mode: "mask",
        color: null
      });

      this.startRenderLoop();
      this.updateTargetSkin(target);
    }

    async videoSpriteFillColor(args, util) {
      const target = util.target;

      if (!(await this.ensureCamera())) {
        return;
      }

      this.fillStates.set(target.id, {
        mode: "color",
        color: Scratch.Cast.toRgbColorObject(args.COLOR)
      });

      this.startRenderLoop();
      this.updateTargetSkin(target);
    }

    changeCameraBy(args) {
      const amount = Scratch.Cast.toNumber(args.CAMERA_SCALE_INC);
      this.zoom = clampZoom(this.zoom + amount);
      this.refreshAllTargets();
    }

    scaleCamera(args) {
      this.zoom = clampZoom(Scratch.Cast.toNumber(args.CAMERA_SCALE));
      this.refreshAllTargets();
    }

    videoSpriteOff(args, util) {
      this.restoreTarget(util.target);

      if (this.fillStates.size === 0) {
        this.stopRenderLoop();
      }
    }

    cameraReady() {
      return !!this.videoDevice.getFrame({ format: "canvas" });
    }

    async ensureCamera() {
      try {
        await this.videoDevice.enableVideo();
        if (!this._hidPreview) {
          this._hidPreview = true;
          this.videoDevice.setPreviewGhost(100);
        }
        return true;
      } catch (error) {
        return false;
      }
    }

    startRenderLoop() {
      if (this.renderHandle) {
        return;
      }

      const tick = async () => {
        this.renderHandle = null;

        if (this.fillStates.size === 0) {
          return;
        }

        if (this.cameraReady() && !this.isRendering) {
          this.isRendering = true;

          try {
            for (const target of this.getTargetsForFillStates()) {
              this.updateTargetSkin(target);
            }
          } finally {
            this.isRendering = false;
          }
        }

        this.renderHandle = requestAnimationFrame(tick);
      };

      this.renderHandle = requestAnimationFrame(tick);
    }

    stopRenderLoop() {
      if (this.renderHandle) {
        cancelAnimationFrame(this.renderHandle);
        this.renderHandle = null;
      }
    }

    refreshAllTargets() {
      for (const target of this.getTargetsForFillStates()) {
        this.updateTargetSkin(target);
      }
    }

    getTargetsForFillStates() {
      const targets = [];

      for (const targetId of this.fillStates.keys()) {
        const target = this.runtime.getTargetById(targetId);
        if (!target) {
          this.fillStates.delete(targetId);
          continue;
        }

        targets.push(target);
      }

      if (this.fillStates.size === 0) {
        this.stopRenderLoop();
      }

      return targets;
    }
    updateTargetSkin(target) {
      const fillState = this.fillStates.get(target.id);
      if (!fillState || !this.renderer) {
        return;
      }

      const drawable = this.getDrawable(target);
      const baseSkinId = getTargetBaseSkinId(target, drawable);
      const baseImage = this.getSkinImage(baseSkinId);

      if (!baseImage) {
        return;
      }

      const size = getBaseImageSize(baseImage);
      const width = size.width;
      const height = size.height;

      if (!width || !height) {
        return;
      }

      if (this.workCanvas.width !== width || this.workCanvas.height !== height) {
        this.workCanvas.width = width;
        this.workCanvas.height = height;
      }

      this.workContext.clearRect(0, 0, width, height);
      this.workContext.drawImage(baseImage, 0, 0, width, height);

      let maskImageData;
      try {
        maskImageData = this.workContext.getImageData(0, 0, width, height);
      } catch (error) {
        return;
      }

      const source = this.sampleVideoToSize(width, height);
      if (!source) {
        return;
      }
      const maskData = maskImageData.data;
      const sourceData = source.data;
      const color = fillState.color;

      for (let i = 0; i < maskData.length; i += 4) {
        const alpha = maskData[i + 3];
        if (alpha === 0) {
          maskData[i + 3] = 0;
          continue;
        }

        const shouldFill = fillState.mode === "mask"
          ? true
          : colorMatches(maskData[i], maskData[i + 1], maskData[i + 2], alpha, color);

        if (shouldFill) {
          maskData[i] = sourceData[i];
          maskData[i + 1] = sourceData[i + 1];
          maskData[i + 2] = sourceData[i + 2];
          maskData[i + 3] = alpha;
        }
      }

      this.workContext.putImageData(maskImageData, 0, 0);

      const fallbackCenter = [width / 2, height / 2];
      const costume = getCurrentCostume(target);
      const costumeCenter = (typeof costume.rotationCenterX === "number" && typeof costume.rotationCenterY === "number")
        ? [costume.rotationCenterX, costume.rotationCenterY]
        : null;
      const rotationCenter = this.getRotationCenter(baseSkinId) || costumeCenter || fallbackCenter;

      let generatedSkinId = target.__videoSpritesSkinId;

      if (generatedSkinId === undefined || !this.renderer._allSkins[generatedSkinId]) {
        generatedSkinId = this.renderer.createBitmapSkin(this.workCanvas, 1, rotationCenter);
        target.__videoSpritesSkinId = generatedSkinId;
      } else {
        this.renderer.updateBitmapSkin(generatedSkinId, this.workCanvas, 1, rotationCenter);
      }

      rememberOriginalSkin(target, drawable, baseSkinId);
      this.renderer.updateDrawableSkinId(target.drawableID, generatedSkinId);

      if (this.runtime.requestRedraw) {
        this.runtime.requestRedraw();
      }
    }

    sampleVideoToSize(width, height) {
      const sourceCanvas = this.videoDevice.getFrame({ format: "canvas" });
      if (!sourceCanvas) {
        return null;
      }

      const videoW = sourceCanvas.width;
      const videoH = sourceCanvas.height;
      const upscaleFactor = (100 / this.zoom) *
        (width > height ? videoW / width : videoH / height);
      const cropWidth = width * upscaleFactor;
      const cropHeight = height * upscaleFactor;
      const cropX = (videoW - cropWidth) / 2;
      const cropY = (videoH - cropHeight) / 2;

      this.workContext.clearRect(0, 0, width, height);
      this.workContext.drawImage(
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

      return this.workContext.getImageData(0, 0, width, height);
    }

    restoreTarget(target) {
      this.fillStates.delete(target.id);

      const costume = getCurrentCostume(target);
      const restoreSkinId = typeof costume.skinId === "number"
        ? costume.skinId
        : target.__videoSpritesOriginalSkinId;
      if (restoreSkinId !== undefined && this.renderer && target.drawableID !== undefined) {
        this.renderer.updateDrawableSkinId(target.drawableID, restoreSkinId);
      }

      const generatedSkinId = target.__videoSpritesSkinId;
      if (generatedSkinId !== undefined && this.renderer && this.renderer._allSkins[generatedSkinId]) {
        this.renderer.destroySkin(generatedSkinId);
      }

      delete target.__videoSpritesSkinId;
      delete target.__videoSpritesOriginalSkinId;

      if (this.runtime.requestRedraw) {
        this.runtime.requestRedraw();
      }
    }

    getDrawable(target) {
      return this.renderer && this.renderer._allDrawables
        ? this.renderer._allDrawables[target.drawableID]
        : null;
    }

    getSkinImage(skinId) {
      if (typeof skinId !== "number" || !this.renderer || !this.renderer._allSkins) {
        return null;
      }

      const skin = this.renderer._allSkins[skinId];
      if (!skin) {
        return null;
      }

      if (skin._svgImage) {
        return skin._svgImage;
      }

      if (skin._bitmapData) {
        return skin._bitmapData;
      }

      if (skin._canvas) {
        return skin._canvas;
      }

      if (skin._texture && skin._texture.canvas) {
        return skin._texture.canvas;
      }

      return null;
    }

    getRotationCenter(skinId) {
      if (typeof skinId !== "number" || !this.renderer || !this.renderer._allSkins) {
        return null;
      }

      const skin = this.renderer._allSkins[skinId];
      if (!skin) {
        return null;
      }

      if (Array.isArray(skin.rotationCenter)) {
        return skin.rotationCenter;
      }

      if (Array.isArray(skin._rotationCenter)) {
        return skin._rotationCenter;
      }

      return null;
    }

  }

  Scratch.extensions.register(new VideoSpritesExtension());
})(Scratch);

