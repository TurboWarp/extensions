// Name: Video Sprites
// ID: videoSprites
// Description: Replace sprites with a live video feed. Compatible with Scratch Lab's Video Sprites experiment.
// By: Staevski_G <https://scratch.mit.edu/users/Gogoi-does-things/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  /*

    FYI on the architecture here - we know that the Scratch Lab version of this does the swapping on the
    GPU which is a much faster approach. We unfortunately don't have a ton of control over render internals
    fom here and it's hard to justify somewhat large renderer changes right now to emulate that.

    Instead, we're doing the swapping on with a CPU canvas and uploading that to the GPU as needed.
    It's not ideal, but... it seems to work good enough.

  */

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Video Sprites must run unsandboxed.");
  }

  const runtime = Scratch.vm.runtime;
  const renderer = runtime.renderer;

  const Skin = renderer.exports.Skin;
  const twgl = renderer.exports.twgl;
  const gl = renderer.gl;
  const videoDevice = runtime.ioDevices.video;
  const RenderedTarget = Scratch.vm.exports.RenderedTarget;

  const workCanvas = document.createElement("canvas");
  const workContext = workCanvas.getContext("2d", {
    willReadFrequently: true,
  });
  if (!workContext) {
    throw new Error("Failed to get 2D rendering context for work canvas");
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
        maskColor: null,
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
      format: "canvas",
    });

    if (!videoCanvas) {
      return false;
    }

    const videoWidth = videoCanvas.width;
    const videoHeight = videoCanvas.height;
    const upscaleFactor = Math.min(videoWidth / width, videoHeight / height);
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
    return (
      Math.abs(r1 - r2) <= tolerance &&
      Math.abs(g1 - g2) <= tolerance &&
      Math.abs(b1 - b2) <= tolerance
    );
  };

  /**
   * A skin for replacing all or parts (based on color) of a skin.
   *
   * The idea is that we wrap the original skin as much as possible, but returning a new WebGL texture
   * that we generate with colors swapped.
   */
  class VideoSpriteSkin extends Skin {
    /**
     * @param {number} id
     * @param {import('scratch-vm').Target} target
     */
    constructor(id, target) {
      super(id, renderer);

      // Don't set private = true because we make all touching operations occur against the parent skin, not us
      // Thus, the private video data is not visible to the project.

      /** @type {import('scratch-vm').Target} */
      this.target = target;

      /**
       * Cached image data to reduce unnecessary allocations
       * @type {Uint8ClampedArray|null}
       */
      this._outData = null;
    }

    dispose() {
      if (this._texture) {
        gl.deleteTexture(this._texture);
        this._texture = null;
      }
      super.dispose();
    }

    _getParentSkin() {
      const costume = this.target.sprite.costumes[this.target.currentCostume];
      if (!costume || typeof costume.skinId !== "number") {
        return null;
      }
      return renderer._allSkins[costume.skinId] || null;
    }

    get size() {
      const parent = this._getParentSkin();
      return parent ? parent.size : [0, 0];
    }

    get rotationCenter() {
      const parent = this._getParentSkin();
      return parent ? parent.rotationCenter : [0, 0];
    }

    useNearest(scale, drawable) {
      const parent = this._getParentSkin();
      return parent ? parent.useNearest(scale, drawable) : true;
    }

    updateSilhouette(scale) {
      const parent = this._getParentSkin();
      if (parent) {
        parent.updateSilhouette(scale);
        this._silhouette = parent._silhouette;
      }
    }

    _getParentTexture(scale) {
      return (
        this._getParentSkin()?.getTexture(scale) || super.getTexture(scale)
      );
    }

    getTexture(scale) {
      const parentTexture = this._getParentTexture(scale);
      const parent = this._getParentSkin();

      const state = getState(this.target);
      if (!state || !parent) {
        return parentTexture;
      }

      parent.updateSilhouette(scale);
      const silhouette = parent._silhouette;
      this._silhouette = silhouette;

      const silhouetteData = silhouette?._colorData;
      const width = silhouette?._width;
      const height = silhouette?._height;
      if (!width || !height || !silhouetteData) {
        return parentTexture;
      }

      if (workCanvas.width !== width || workCanvas.height !== height) {
        workCanvas.width = width;
        workCanvas.height = height;
      }

      if (!sampleVideoToWorkCanvas(width, height, state.zoom)) {
        return parentTexture;
      }

      const sampledVideoData = workContext.getImageData(
        0,
        0,
        width,
        height
      ).data;

      if (!this._outData || this._outData.length !== silhouetteData.length) {
        this._outData = new Uint8ClampedArray(silhouetteData.length);
      }
      const outData = this._outData;

      const isMask = state.mode === "mask";
      const maskColor = state.maskColor;

      for (let i = 0; i < silhouetteData.length; i += 4) {
        const parentA = silhouetteData[i + 3];
        if (parentA === 0) {
          outData[i] = 0;
          outData[i + 1] = 0;
          outData[i + 2] = 0;
          outData[i + 3] = 0;
          continue;
        }

        const parentR = silhouetteData[i];
        const parentG = silhouetteData[i + 1];
        const parentB = silhouetteData[i + 2];

        const match = isMask
          ? true
          : colorMatches(
              parentR,
              parentG,
              parentB,
              maskColor[0],
              maskColor[1],
              maskColor[2]
            );

        if (match) {
          outData[i] = sampledVideoData[i];
          outData[i + 1] = sampledVideoData[i + 1];
          outData[i + 2] = sampledVideoData[i + 2];
          outData[i + 3] = parentA;
        } else {
          outData[i] = parentR;
          outData[i + 1] = parentG;
          outData[i + 2] = parentB;
          outData[i + 3] = parentA;
        }
      }

      if (!this._texture) {
        this._texture = twgl.createTexture(gl, {
          auto: false,
          wrap: gl.CLAMP_TO_EDGE,
        });
      }

      // Use direct WebGL as setTexture would update silhouette based on this texture, which we don't want.
      gl.bindTexture(gl.TEXTURE_2D, this._texture);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new ImageData(outData, width, height)
      );
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);

      return this._texture;
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
    state.skin.emitWasAltered();
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

  runtime.on("AFTER_EXECUTE", () => {
    for (let i = 0; i < renderer._allSkins.length; i++) {
      // The skin existing is the source-of-truth for whether we are using video mode on a given target.

      const skin = renderer._allSkins[i];
      if (!(skin instanceof VideoSpriteSkin)) {
        continue;
      }

      const target = skin.target;

      // If another script override the costume, switch it back to the video sprite one.
      const drawable = renderer._allDrawables[target.drawableID];
      if (drawable && drawable.skin !== skin) {
        renderer.updateDrawableSkinId(target.drawableID, skin.id);
      }

      // Always have to assume the webcam image might have changed.
      skin.emitWasAltered();
    }
  });

  runtime.on("PROJECT_STOP_ALL", stopAllFills);
  runtime.on("PROJECT_LOADED", stopAllFills);

  // targetWasCreated runs before the clone's Drawable is set up, so we have to patch makeClone.
  const originalMakeClone = RenderedTarget.prototype.makeClone;
  RenderedTarget.prototype.makeClone = function () {
    const newClone = originalMakeClone.call(this);
    const originalState = getState(this);
    if (originalState && originalState.skin) {
      const newState = getOrCreateState(newClone);
      newState.zoom = originalState.zoom;
      newState.mode = originalState.mode;
      newState.maskColor = originalState.maskColor;
      attach(newClone);
    }
    return newClone;
  };

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
            text: Scratch.translate("fill sprite with camera"),
          },
          {
            opcode: "videoSpriteFillColor",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("fill [COLOR] with camera"),
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#fcb1e3",
              },
            },
          },
          "---",
          {
            opcode: "changeCameraBy",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("change camera zoom by [CAMERA_SCALE_INC]"),
            arguments: {
              CAMERA_SCALE_INC: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 25,
              },
            },
          },
          {
            opcode: "scaleCamera",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set camera zoom [CAMERA_SCALE]"),
            arguments: {
              CAMERA_SCALE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          "---",
          {
            opcode: "videoSpriteOff",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stop filling with camera"),
          },
        ],
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
      setZoom(
        util.target,
        currentZoom + Scratch.Cast.toNumber(args.CAMERA_SCALE_INC)
      );
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
