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

  const MIN_ZOOM = 20;
  const MAX_ZOOM = 2000;
  const DEFAULT_ZOOM = 100;

  /**
   * @param {number} zoom
   * @returns {number}
   */
  const clampZoom = (zoom) => {
    if (zoom < MIN_ZOOM) return MIN_ZOOM;
    if (zoom > MAX_ZOOM) return MAX_ZOOM;
    return zoom;
  };

  /**
   * @typedef {"mask"|"color"} VideoSpriteMode
   */

  /**
   * @typedef CustomState
   * @property {number} zoom
   * @property {VideoSpriteSkin|null} skin
   * @property {VideoSpriteMode} mode
   * @property {[number, number, number]|null} maskColor All in 0-255
   */

  const CUSTOM_STATE_KEY = Symbol();

  /**
   * @param {import("scratch-vm").Target} target
   * @returns {CustomState|null}
   */
  const getState = (target) => target[CUSTOM_STATE_KEY] || null;

  /**
   * @param {import("scratch-vm").Target} target
   * @returns {CustomState}
   */
  const getOrCreateState = (target) => {
    let state = target[CUSTOM_STATE_KEY];
    if (!state) {
      state = {
        zoom: DEFAULT_ZOOM,
        skin: null,
        mode: "mask",
        maskColor: null
      };
      target[CUSTOM_STATE_KEY] = state;
    }
    return state;
  };

  /**
   * @param {import("scratch-vm").Target} target
   * @param {number} zoom 
   */
  const setZoom = (target, zoom) => {
    const clamped = clampZoom(zoom);
    const state = getOrCreateState(target);
    if (state.zoom === clamped) {
      return;
    }

    state.zoom = clamped;
    if (state.skin) {
      state.skin.emitWasAltered();
    }
  };

  /**
   * Get cropped/scaled video frame, zoomed around the center.
   * @param {number} width
   * @param {number} height
   * @param {number} zoom
   * @returns {boolean} true if a frame was drawn
   */
  const sampleVideoToWorkCanvas = (width, height, zoom) => {
    const videoCanvas = videoDevice.getFrame({
      format: "canvas"
    });

    if (!videoCanvas) {
      return false;
    }

    const videoWidth = videoCanvas.width;
    const videoHeight = videoCanvas.height;
    const upscaleFactor = width > height ? videoWidth / width : videoHeight / height;
    const zoomFactor = zoom / 100;
    const cropWidth = (width * upscaleFactor) / zoomFactor;
    const cropHeight = (height * upscaleFactor) / zoomFactor;
    const cropX = (videoWidth - cropWidth) / 2;
    const cropY = (videoHeight - cropHeight) / 2;

    workContext.clearRect(0, 0, width, height);
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

  /**
   * @param {number} r1 from 0-255
   * @param {number} g1 from 0-255
   * @param {number} b1 from 0-255
   * @param {number} r2 from 0-255
   * @param {number} g2 from 0-255
   * @param {number} b2 from 0-255
   * @returns {boolean} true if matching
   */
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
      const state = getState(this.target);
      if (!state) {
        // Shouldn't be able to happen
        this.setEmptyImageData();
        return;
      }

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

      if (!sampleVideoToWorkCanvas(width, height, state.zoom)) {
        return;
      }

      const sampledVideoData = workContext.getImageData(0, 0, width, height).data;
      const outData = new Uint8ClampedArray(silhouetteData);

      const isMask = state.mode === "mask";
      const maskColor = state.maskColor;

      for (let i = 0; i < outData.length; i += 4) {
        const alpha = outData[i + 3];
        if (alpha === 0) {
          continue;
        }

        const shouldFill = isMask
          ? true
          : colorMatches(outData[i], outData[i + 1], outData[i + 2], maskColor[0], maskColor[1], maskColor[2]);

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

  /**
   * @param {import("scratch-vm").Target} target
   */
  const attach = (target) => {
    const state = getOrCreateState(target);
    if (!state.skin) {
      const id = renderer._nextSkinId++;
      state.skin = new VideoSpriteSkin(id, target);
      renderer._allSkins[id] = state.skin;
    }

    renderer.updateDrawableSkinId(target.drawableID, state.skin.id);
    runtime.requestRedraw();
  };

  /**
   * @param {import("scratch-vm").Target} target
   */
  const detach = (target) => {
    const state = getState(target);
    if (!state || !state.skin) {
      return;
    }

    target.setCostume(target.currentCostume);
    renderer.destroySkin(state.skin.id);
    state.skin = null;
  };

  const stopAllFills = () => {
    for (let i = 0; i < renderer._allSkins.length; i++) {
      const skin = renderer._allSkins[i];
      if (!(skin instanceof VideoSpriteSkin)) {
        continue;
      }
      const target = skin.target;
      if (runtime.getTargetById(target.id)) {
        target.setCostume(target.currentCostume);
      }
      renderer.destroySkin(skin.id);
      const state = target[CUSTOM_STATE_KEY];
      if (state) {
        state.skin = null;
      }
    }
  };

  let hidPreview = false;
  const ensureCamera = async () => {
    try {
      await videoDevice.enableVideo();
      if (!hidPreview) {
        hidPreview = true;
        videoDevice.setPreviewGhost(100);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  runtime.on("BEFORE_EXECUTE", () => {
    for (let i = 0; i < renderer._allSkins.length; i++) {
      const skin = renderer._allSkins[i];
      if (!(skin instanceof VideoSpriteSkin)) {
        continue;
      }
      const target = skin.target;
      // VM's setCostume swaps our skin off the drawable; put ours back.
      const drawable = renderer._allDrawables[target.drawableID];
      if (drawable && drawable.skin !== skin) {
        renderer.updateDrawableSkinId(target.drawableID, skin.id);
      }
      skin.emitWasAltered();
    }
  });

  runtime.on("PROJECT_STOP_ALL", stopAllFills);
  runtime.on("PROJECT_LOADED", stopAllFills);

  runtime.on("targetWasRemoved", (target) => {
    const state = getState(target);
    if (state && state.skin) {
      renderer.destroySkin(state.skin.id);
      state.skin = null;
    }
  });

  class VideoSpritesExtension {
    getInfo() {
      return {
        id: "videoSprites",
        name: Scratch.translate("Video Sprites"),
        blocks: [
          {
            opcode: "videoSpriteFillSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("fill sprite with camera")
          },
          {
            opcode: "videoSpriteFillColor",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("fill [COLOR] with camera"),
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#fcb1e3"
              }
            }
          },
          '---',
          {
            opcode: "changeCameraBy",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("change camera zoom by [CAMERA_SCALE_INC]"),
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
            text: Scratch.translate("set camera zoom [CAMERA_SCALE]"),
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
            text: Scratch.translate("stop filling with camera")
          }
        ]
      };
    }

    async videoSpriteFillSprite(args, util) {
      if (!(await ensureCamera())) {
        return;
      }

      const state = getOrCreateState(util.target);
      state.mode = "mask";
      state.maskColor = null;
      attach(util.target);
    }

    async videoSpriteFillColor(args, util) {
      if (!(await ensureCamera())) {
        return;
      }

      const state = getOrCreateState(util.target);
      state.mode = "color";
      state.maskColor = Scratch.Cast.toRgbColorList(args.COLOR);
      attach(util.target);
    }

    changeCameraBy(args, util) {
      const state = getState(util.target);
      const currentZoom = state ? state.zoom : DEFAULT_ZOOM;
      setZoom(util.target, currentZoom + Scratch.Cast.toNumber(args.CAMERA_SCALE_INC));
    }

    scaleCamera(args, util) {
      setZoom(util.target, Scratch.Cast.toNumber(args.CAMERA_SCALE));
    }

    videoSpriteOff(args, util) {
      detach(util.target);
    }
  }

  Scratch.extensions.register(new VideoSpritesExtension());
})(Scratch);
