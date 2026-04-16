// Name: Video sprites
// ID: videosprites
// Description: A TurboWarp extension that lets you use your webcam inside sprites—either filling the whole sprite or replacing specific colors with live camera video, with adjustable zoom and real-time rendering.
// By: Staevski_G <https://scratch.mit.edu/users/Staevski_G/>
// Original: Video sprites (from Scratch Lab)

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Video Sprites must run unsandboxed.");
  }

  const DEFAULT_CAMERA_WIDTH = 640;
  const DEFAULT_CAMERA_HEIGHT = 480;
  const MIN_ZOOM = 10;
  const MAX_ZOOM = 400;

  class VideoSprites {
    constructor() {
      this.vm = Scratch.vm;
      this.runtime = this.vm.runtime;
      this.renderer = this.runtime.renderer;

      this.video = document.createElement("video");
      this.video.setAttribute("playsinline", "");
      this.video.muted = true;
      this.video.autoplay = true;
      this.video.style.display = "none";

      this.sourceCanvas = document.createElement("canvas");
      this.sourceContext = this.sourceCanvas.getContext("2d", {
        willReadFrequently: true
      });

      this.workCanvas = document.createElement("canvas");
      this.workContext = this.workCanvas.getContext("2d", {
        willReadFrequently: true
      });

      this.stream = null;
      this.zoom = 100;
      this.mirror = true;
      this.lastError = "";
      this.renderHandle = null;
      this.isRendering = false;
      this.fillStates = new Map();

      this._boundRefresh = this.refreshAllTargets.bind(this);
      this.runtime.on("PROJECT_STOP_ALL", this._boundRefresh);
      this.runtime.on("PROJECT_LOADED", this._boundRefresh);
      this.runtime.on("PROJECT_CHANGED", this._boundRefresh);
    }

    getInfo() {
      return {
        id: "videosprites",
        name: "Video Sprites",
        color1: "#4C97FF",
        color2: "#3373CC",
        blocks: [
          {
            opcode: "fillSpriteWithCamera",
            blockType: Scratch.BlockType.COMMAND,
            text: "fill sprite with camera"
          },
          {
            opcode: "fillColorWithCamera",
            blockType: Scratch.BlockType.COMMAND,
            text: "fill [COLOR] with camera",
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ffffff"
              }
            }
          },
          {
            opcode: "changeZoomBy",
            blockType: Scratch.BlockType.COMMAND,
            text: "change camera zoom by [AMOUNT]",
            arguments: {
              AMOUNT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              }
            }
          },
          {
            opcode: "setZoomTo",
            blockType: Scratch.BlockType.COMMAND,
            text: "set camera zoom to [AMOUNT] %",
            arguments: {
              AMOUNT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              }
            }
          },
          {
            opcode: "stopFillingWithCamera",
            blockType: Scratch.BlockType.COMMAND,
            text: "stop filling with camera"
          },
          "---",
          {
            opcode: "cameraReady",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "camera ready?"
          },
          {
            opcode: "cameraZoom",
            blockType: Scratch.BlockType.REPORTER,
            text: "camera zoom"
          },
          {
            opcode: "activeSpriteCount",
            blockType: Scratch.BlockType.REPORTER,
            text: "camera-filled sprite count"
          },
          {
            opcode: "lastErrorText",
            blockType: Scratch.BlockType.REPORTER,
            text: "video sprites error"
          }
        ]
      };
    }

    async fillSpriteWithCamera(args, util) {
      const target = this.requireSpriteTarget(util);
      if (!target) {
        return;
      }

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

    async fillColorWithCamera(args, util) {
      const target = this.requireSpriteTarget(util);
      if (!target) {
        return;
      }

      if (!(await this.ensureCamera())) {
        return;
      }

      this.fillStates.set(target.id, {
        mode: "color",
        color: this.parseColor(args.COLOR)
      });

      this.startRenderLoop();
      this.updateTargetSkin(target);
    }

    changeZoomBy(args) {
      const amount = Scratch.Cast.toNumber(args.AMOUNT);
      this.zoom = this.clampZoom(this.zoom + amount);
      this.refreshAllTargets();
    }

    setZoomTo(args) {
      this.zoom = this.clampZoom(Scratch.Cast.toNumber(args.AMOUNT));
      this.refreshAllTargets();
    }

    stopFillingWithCamera(args, util) {
      const target = this.requireSpriteTarget(util);
      if (!target) {
        return;
      }

      this.restoreTarget(target);

      if (this.fillStates.size === 0) {
        this.stopRenderLoop();
      }
    }

    cameraReady() {
      return !!(this.stream && this.video.readyState >= 2);
    }

    cameraZoom() {
      return this.zoom;
    }

    activeSpriteCount() {
      return this.fillStates.size;
    }

    lastErrorText() {
      return this.lastError;
    }

    requireSpriteTarget(util) {
      const target = util && util.target;
      if (!target || target.isStage) {
        this.lastError = "Select a sprite before using Video Sprites blocks.";
        return null;
      }

      return target;
    }

    async ensureCamera() {
      if (this.cameraReady()) {
        return true;
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        this.lastError = "Camera access is not available in this browser.";
        return false;
      }

      try {
        if (!document.body.contains(this.video)) {
          document.body.appendChild(this.video);
        }

        if (!this.stream) {
          this.stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: "user",
              width: { ideal: DEFAULT_CAMERA_WIDTH },
              height: { ideal: DEFAULT_CAMERA_HEIGHT }
            },
            audio: false
          });
        }

        this.video.srcObject = this.stream;
        await this.video.play();
        this.lastError = "";
        return true;
      } catch (error) {
        this.lastError = error && error.message ? error.message : String(error);
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
            this.updateSourceFrame();

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
        if (!target || target.isStage) {
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
//🐱‍💻
    updateSourceFrame() {
      const width = this.video.videoWidth || DEFAULT_CAMERA_WIDTH;
      const height = this.video.videoHeight || DEFAULT_CAMERA_HEIGHT;

      if (this.sourceCanvas.width !== width || this.sourceCanvas.height !== height) {
        this.sourceCanvas.width = width;
        this.sourceCanvas.height = height;
      }

      this.sourceContext.save();
      this.sourceContext.clearRect(0, 0, width, height);

      if (this.mirror) {
        this.sourceContext.translate(width, 0);
        this.sourceContext.scale(-1, 1);
      }

      this.sourceContext.drawImage(this.video, 0, 0, width, height);
      this.sourceContext.restore();
    }

    updateTargetSkin(target) {
      const fillState = this.fillStates.get(target.id);
      if (!fillState || !this.renderer) {
        return;
      }

      const drawable = this.getDrawable(target);
      const baseSkinId = this.getTargetBaseSkinId(target, drawable);
      const baseImage = this.getSkinImage(baseSkinId);

      if (!baseImage) {
        this.lastError = "Could not read the sprite costume for Video Sprites.";
        return;
      }

      const size = this.getBaseImageSize(baseImage);
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
        this.lastError = "The current costume could not be sampled for Video Sprites.";
        return;
      }

      const source = this.sampleVideoToSize(width, height);
      const maskData = maskImageData.data;
      const sourceData = source.data.data;
      const color = fillState.color;

      for (let i = 0; i < maskData.length; i += 4) {
        const alpha = maskData[i + 3];
        if (alpha === 0) {
          maskData[i + 3] = 0;
          continue;
        }

        const shouldFill = fillState.mode === "mask"
          ? true
          : this.colorMatches(maskData[i], maskData[i + 1], maskData[i + 2], alpha, color);

        if (shouldFill) {
          maskData[i] = sourceData[i];
          maskData[i + 1] = sourceData[i + 1];
          maskData[i + 2] = sourceData[i + 2];
          maskData[i + 3] = alpha;
        }
      }

      this.workContext.putImageData(maskImageData, 0, 0);

      const fallbackCenter = [width / 2, height / 2];
      const costume = this.getCurrentCostume(target);
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

      this.rememberOriginalSkin(target, drawable, baseSkinId);
      this.renderer.updateDrawableSkinId(target.drawableID, generatedSkinId);

      if (this.runtime.requestRedraw) {
        this.runtime.requestRedraw();
      }
    }

    sampleVideoToSize(width, height) {
      const zoomScale = 100 / this.zoom;
      const cropWidth = this.sourceCanvas.width * zoomScale;
      const cropHeight = this.sourceCanvas.height * zoomScale;
      const cropX = (this.sourceCanvas.width - cropWidth) / 2;
      const cropY = (this.sourceCanvas.height - cropHeight) / 2;

      this.workContext.clearRect(0, 0, width, height);
      this.workContext.drawImage(
        this.sourceCanvas,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        width,
        height
      );

      return {
        data: this.workContext.getImageData(0, 0, width, height)
      };
    }

    restoreTarget(target) {
      this.fillStates.delete(target.id);

      const costume = this.getCurrentCostume(target);
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

    rememberOriginalSkin(target, drawable, baseSkinId) {
      if (target.__videoSpritesOriginalSkinId !== undefined) {
        return;
      }

      const currentSkinId = this.getDrawableSkinId(drawable);
      target.__videoSpritesOriginalSkinId = currentSkinId !== undefined ? currentSkinId : baseSkinId;
    }

    getDrawable(target) {
      return this.renderer && this.renderer._allDrawables
        ? this.renderer._allDrawables[target.drawableID]
        : null;
    }

    getDrawableSkinId(drawable) {
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
    }

    getTargetBaseSkinId(target, drawable) {
      const costume = this.getCurrentCostume(target);
      if (typeof costume.skinId === "number") {
        return costume.skinId;
      }

      const drawableSkinId = this.getDrawableSkinId(drawable);
      const generatedSkinId = target.__videoSpritesSkinId;

      if (drawableSkinId !== undefined && drawableSkinId !== generatedSkinId) {
        return drawableSkinId;
      }

      return target.__videoSpritesOriginalSkinId;
    }

    getCurrentCostume(target) {
      return target.sprite.costumes[target.currentCostume] || {};
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

    getBaseImageSize(image) {
      return {
        width: image.naturalWidth || image.videoWidth || image.width || 0,
        height: image.naturalHeight || image.videoHeight || image.height || 0
      };
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

    parseColor(value) {
      const hex = Scratch.Cast.toString(value).trim();
      const normalized = /^#?[0-9a-f]{6}$/i.test(hex)
        ? hex.replace(/^#/, "")
        : "ffffff";

      return {
        r: parseInt(normalized.slice(0, 2), 16),
        g: parseInt(normalized.slice(2, 4), 16),
        b: parseInt(normalized.slice(4, 6), 16)
      };
    }

    colorMatches(r, g, b, alpha, color) {
      if (!color || alpha === 0) {
        return false;
      }

      const tolerance = 24;
      return Math.abs(r - color.r) <= tolerance &&
        Math.abs(g - color.g) <= tolerance &&
        Math.abs(b - color.b) <= tolerance;
    }

    clampZoom(value) {
      const zoom = Number.isFinite(value) ? value : 100;
      return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom));
    }
  }

  Scratch.extensions.register(new VideoSprites());
})(Scratch);

//📷🐈
