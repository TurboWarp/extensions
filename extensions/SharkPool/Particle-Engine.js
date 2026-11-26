// Name: Particle Engine
// ID: SPpartEngine
// Description: Create powerful particle engines without clones.
// By: SharkPool
// License: MIT

// Version V.2.0.6

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed)
    throw new Error("Particle Engine must run unsandboxed!");

  const menuIconURI =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5Mi4zNjciIGhlaWdodD0iOTIuMzY3IiB2aWV3Qm94PSIwIDAgOTIuMzY3IDkyLjM2NyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIyMTEuNDYxIiB5MT0iMTUxLjQ2MSIgeDI9IjI2OC41MzkiIHkyPSIyMDguNTM5IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzAwOTBmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwNzJmZiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGQ9Ik0wIDQ2LjE4M0MwIDIwLjY3NyAyMC42NzcgMCA0Ni4xODMgMHM0Ni4xODMgMjAuNjc3IDQ2LjE4MyA0Ni4xODMtMjAuNjc3IDQ2LjE4My00Ni4xODMgNDYuMTgzUzAgNzEuNjg5IDAgNDYuMTgzIiBmaWxsPSIjMTk1M2ZmIi8+PHBhdGggZD0iTTIxMS40NiAyMDguNTRjLTE1Ljc2MS0xNS43NjItMTUuNzYxLTQxLjMxNyAwLTU3LjA4IDE1Ljc2My0xNS43NjEgNDEuMzE4LTE1Ljc2MSA1Ny4wOCAwIDE1Ljc2MSAxNS43NjMgMTUuNzYxIDQxLjMxOCAwIDU3LjA4LTE1Ljc2MiAxNS43NjEtNDEuMzE3IDE1Ljc2MS01Ny4wOCAwIiBmaWxsPSJ1cmwoI2EpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTkzLjgxNyAtMTMzLjgxNykiLz48cGF0aCBkPSJNMjguODQ4IDU1LjYyOWE1Ljc3IDUuNzcgMCAwIDAgNC4xNDQtNC4wMTNsMS4yOS00LjUwNWMuNjEyLTIuMTMgMy42NDctMi4wOCA0LjE4Ny4wNjhsMS4xNDcgNC41NDRhNS43NyA1Ljc3IDAgMCAwIDQuMDEgNC4xNDVsNC41MDQgMS4yOWMyLjEzLjYxMiAyLjA4MSAzLjY0Ny0uMDY3IDQuMTlsLTQuNTQ1IDEuMTQ0YTUuNzcgNS43NyAwIDAgMC00LjE0MSA0LjAxbC0xLjI5MyA0LjUwNGMtLjYxIDIuMTMtMy42NDQgMi4wODEtNC4xODctLjA2N2wtMS4xNDQtNC41NDVhNS43NyA1Ljc3IDAgMCAwLTQuMDEzLTQuMTQxbC00LjUwNS0xLjI5Yy0yLjEzLS42MTItMi4wOC0zLjY0Ny4wNjgtNC4xOXptMjkuNjk4LTE2LjMyM2E0LjAyIDQuMDIgMCAwIDAgMi45MDMtMi43OGwuOTE2LTMuMTMzYy40MzUtMS40ODEgMi41NS0xLjQzNSAyLjkxNy4wNjNsLjc4MSAzLjE3MWE0LjAyIDQuMDIgMCAwIDAgMi43NzcgMi45MDNsMy4xMzQuOTE2YzEuNDgyLjQzNSAxLjQzNiAyLjU1LS4wNjMgMi45MmwtMy4xNy43NzhhNC4wMiA0LjAyIDAgMCAwLTIuOTAyIDIuNzc4bC0uOTE4IDMuMTMzYy0uNDMzIDEuNDgyLTIuNTQ3IDEuNDM2LTIuOTE3LS4wNjNsLS43NzktMy4xN2E0LjAyIDQuMDIgMCAwIDAtMi43OC0yLjkwMmwtMy4xMzMtLjkxNmMtMS40ODItLjQzNS0xLjQzNi0yLjU0OS4wNjMtMi45MTl6bS0yMC4xNzEtOC4xNjhhNC4xOCA0LjE4IDAgMCAwLTIuODkzLTMuMDE3bC0zLjI1OS0uOTVjLTEuNTQtLjQ1MS0xLjQ5NS0yLjY1LjA2NC0zLjAzM2wzLjI5Ni0uODE1YTQuMTggNC4xOCAwIDAgMCAzLjAxNi0yLjg5bC45NS0zLjI1OWMuNDUxLTEuNTQgMi42NS0xLjQ5NCAzLjAzNi4wNjRsLjgxMiAzLjI5NmE0LjE4IDQuMTggMCAwIDAgMi44OSAzLjAxNGwzLjI2Ljk1M2MxLjU0LjQ0OCAxLjQ5NCAyLjY0Ni0uMDY0IDMuMDMybC0zLjI5Ny44MTNhNC4xOCA0LjE4IDAgMCAwLTMuMDE0IDIuODkybC0uOTUgMy4yNmMtLjQ1IDEuNTQtMi42NDkgMS40OTQtMy4wMzUtLjA2NHoiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==";

  const vm = Scratch.vm;
  const Cast = Scratch.Cast;
  const runtime = vm.runtime;
  const render = vm.renderer;
  const gl = render.gl;
  const { Drawable, Skin, twgl } = render.exports;
  const engineTag = Symbol("particleEngine");

  // Custom Skin using framebuffers
  class ParticleSkin extends Skin {
    constructor(id, renderer, width, height) {
      super(id, renderer);
      const gl = renderer.gl;
      width = Math.max(1, Math.round(width));
      height = Math.max(1, Math.round(height));

      this._texture = twgl.createTexture(gl, {
        min: gl.LINEAR,
        mag: gl.LINEAR,
        wrap: gl.CLAMP_TO_EDGE,
        width: width,
        height: height,
      });
      this._size = [width, height];
      this._rotationCenter = [width / 2, height / 2];

      // Create framebuffer
      this._framebuffer = twgl.createFramebufferInfo(
        gl,
        [
          {
            format: gl.RGBA,
            attachment: this._texture,
          },
        ],
        width,
        height
      );

      this._silhouetteDirty = true;
      this._silhouetteImageData = null;
    }
    dispose() {
      const gl = this._renderer.gl;
      if (this._texture) {
        gl.deleteTexture(this._texture);
        this._texture = null;
      }
      if (this._framebuffer) {
        gl.deleteFramebuffer(this._framebuffer.framebuffer);
        this._framebuffer = null;
      }
      super.dispose();
    }
    set size(value) {
      const w = Math.max(1, Math.round(value[0]));
      const h = Math.max(1, Math.round(value[1]));
      if (this._size[0] === w && this._size[1] === h) return;

      const gl = this._renderer.gl;
      this._size = [w, h];
      this._rotationCenter = [w / 2, h / 2];

      // Recreate texture and framebuffer, keeping the old contents
      const oldTexture = this._texture;
      const oldFramebuffer = this._framebuffer;

      this._texture = twgl.createTexture(gl, {
        mag: gl.LINEAR,
        min: gl.LINEAR,
        wrap: gl.CLAMP_TO_EDGE,
        width: w,
        height: h,
      });

      this._framebuffer = twgl.createFramebufferInfo(
        gl,
        [
          {
            format: gl.RGBA,
            attachment: this._texture,
          },
        ],
        w,
        h
      );

      if (oldTexture) {
        blitTexture(oldTexture, this._framebuffer, w, h);
        gl.deleteTexture(oldTexture);
      }
      if (oldFramebuffer) {
        gl.deleteFramebuffer(oldFramebuffer.framebuffer);
      }

      this._silhouetteDirty = true;
    }
    get size() {
      return this._size;
    }
    getTexture(scale) {
      return this._texture || super.getTexture();
    }
    useNearest() {
      return false;
    }
    /**
     * Called by the renderer before CPU "touching color" checks. Like pen,
     * read the framebuffer back so that CPU and GPU checks see the same
     * particles. Only happens when the particles changed since last time.
     */
    updateSilhouette() {
      if (!this._silhouetteDirty || !this._framebuffer) return;
      this._silhouetteDirty = false;

      const [width, height] = this._size;
      if (
        !this._silhouetteImageData ||
        this._silhouetteImageData.width !== width ||
        this._silhouetteImageData.height !== height
      ) {
        this._silhouetteImageData = new ImageData(width, height);
      }

      const gl = this._renderer.gl;
      this._renderer._doExitDrawRegion();
      twgl.bindFramebufferInfo(gl, this._framebuffer);
      gl.readPixels(
        0,
        0,
        width,
        height,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array(this._silhouetteImageData.data.buffer)
      );
      twgl.bindFramebufferInfo(gl, null);
      this._silhouette.update(this._silhouetteImageData, true);
    }
    // Particles can still be detected with "touching color", but never
    // count as a sprite for clicking or "touching sprite"
    isTouchingNearest() {
      return false;
    }
    isTouchingLinear() {
      return false;
    }
  }

  // Shape Presets
  const _base64SvgHeader =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI";
  const PRESET_SHAPES = Object.assign(Object.create(null), {
    square:
      "1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cGF0aCBkPSJNMCA1MC41VjBoNTB2NTAuNXoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=",
    circle:
      "1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDQ5LjUgNDkuNSI+PHBhdGggZD0iTTAgMjQuNTVDMCAxMC45OTIgMTAuOTkyIDAgMjQuNTUgMFM0OS4xIDEwLjk5MiA0OS4xIDI0LjU1IDM4LjEwOCA0OS4xIDI0LjU1IDQ5LjEgMCAzOC4xMDggMCAyNC41NSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==",
    triangle:
      "0OS4wOTgiIGhlaWdodD0iNDIuNTIiIHZpZXdCb3g9IjAgMCA0OS4wOTggNDIuNTIiPjxwYXRoIGQ9Ik0wIDQyLjUyIDI0LjU1IDAgNDkuMSA0Mi41MnoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=",
    star: "1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDEuNSAxLjUiPjxwYXRoIGQ9Ik0xLjM3NS42MTNBLjA2LjA2IDAgMCAwIDEuMzIzLjU3TC45NjcuNTIxLjgwNS4yMmEuMDYzLjA2MyAwIDAgMC0uMTEgMEwuNTM2LjUyMS4xOC41N2EuMDYuMDYgMCAwIDAtLjA1MS4wNDMuMDYuMDYgMCAwIDAgLjAxOC4wNjNsLjI1Ni4yMzMtLjA2My4zMjhhLjA2My4wNjMgMCAwIDAgLjA5MS4wN2wuMzE5LS4xNTguMzIuMTU4YS4xLjEgMCAwIDAgLjAyOC4wMDYuMDYzLjA2MyAwIDAgMCAuMDYzLS4wNzRMMS4wOTguOTExbC4yNTYtLjIzM2EuMDYuMDYgMCAwIDAgLjAyMS0uMDY1IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
  });
  for (const key in PRESET_SHAPES)
    PRESET_SHAPES[key] = _base64SvgHeader + PRESET_SHAPES[key];

  const DEFAULT_BEHAVIOURS = {
    maxP: { val: 100, inf: 0 },
    emission: { val: 1, inf: 0 },
    time: { val: 0.8, inf: 0.4 },
    speed: { val: 15, inf: 0 },
    xPos: { val: 0, inf: 0 },
    yPos: { val: 0, inf: 0 },
    gravX: { val: 0, inf: 0 },
    gravY: { val: -1.5, inf: 0 },
    sDir: { val: 0, inf: 25 },
    eDir: { val: 0, inf: 0 },
    sSpin: { val: 0, inf: 0 },
    eSpin: { val: 45, inf: 135 },
    sSize: { val: 25, inf: 10 },
    eSize: { val: 15, inf: 5 },
    sStreX: { val: 100, inf: 0 },
    eStreX: { val: 100, inf: 0 },
    sStreY: { val: 100, inf: 0 },
    eStreY: { val: 100, inf: 0 },
    accelRad: { val: 0, inf: 0 },
    accelTan: { val: 0, inf: 0 },
    sinW: { val: 0, inf: 0 },
    cosW: { val: 0, inf: 0 },
    sinS: { val: 1, inf: 0 },
    cosS: { val: 1, inf: 0 },
    fIn: { val: 0, inf: 5 },
    fOut: { val: 15, inf: 2 },
    sCol: { val: "#ff00ff", inf: 0 },
    eCol: { val: "#0000ff", inf: 0 },
  };

  // Ripped from the Clipping & Blending extension.
  const BLENDINGS = Object.assign(Object.create(null), {
    default: [
      gl.ONE,
      gl.ONE_MINUS_SRC_ALPHA,
      gl.ONE,
      gl.ONE_MINUS_SRC_ALPHA,
      gl.FUNC_ADD,
    ],
    additive: [gl.ONE, gl.ONE, gl.ZERO, gl.ONE, gl.FUNC_ADD],
    "additive with alpha": [gl.ONE, gl.ONE, gl.ONE, gl.ONE, gl.FUNC_ADD],
    subtract: [gl.ONE, gl.ONE, gl.ZERO, gl.ONE, gl.FUNC_REVERSE_SUBTRACT],
    "subtract with alpha": [
      gl.ONE,
      gl.ONE,
      gl.ONE,
      gl.ONE,
      gl.FUNC_REVERSE_SUBTRACT,
    ],
    multiply: [
      gl.DST_COLOR,
      gl.ONE_MINUS_SRC_ALPHA,
      gl.DST_COLOR,
      gl.ONE_MINUS_SRC_ALPHA,
      gl.FUNC_ADD,
    ],
    invert: [
      gl.ONE_MINUS_DST_COLOR,
      gl.ONE_MINUS_SRC_COLOR,
      gl.ZERO,
      gl.ONE,
      gl.FUNC_ADD,
    ],
    mask: [gl.ZERO, gl.SRC_ALPHA, gl.ZERO, gl.SRC_ALPHA, gl.FUNC_ADD],
  });

  let blendDirty = false;
  const restoreDefaultBlend = () => {
    if (!blendDirty) return;

    blendDirty = false;
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  };

  const gu = Drawable.prototype.getUniforms;
  Drawable.prototype.getUniforms = function () {
    if (
      blendDirty &&
      !this[engineTag] &&
      this.blendMode === undefined &&
      !this._blendMode
    ) {
      restoreDefaultBlend();
    }

    return gu.call(this);
  };

  const ogDraw = render.draw;
  render.draw = function (...args) {
    try {
      return ogDraw.apply(this, args);
    } finally {
      restoreDefaultBlend();
    }
  };

  /**
   * Helper used by engine drawables.
   */
  const engineGetUniforms = function () {
    const uniforms = Drawable.prototype.getUniforms.call(this);
    const mode = this[engineTag];
    const blend = BLENDINGS[mode] || BLENDINGS.default;
    gl.blendEquation(blend[4]);
    gl.blendFuncSeparate(blend[0], blend[1], blend[2], blend[3]);
    blendDirty = mode !== "default";

    return uniforms;
  };

  let deltaTime = 0;
  let prevTime = 0;

  const allEngines = new Map();

  // Constants
  const EPSILON = 1e-6;
  const MAX_INT = 1e5;
  const MAX_DELTA = 3; // Prevents jumps after tab inactivity.
  const FPS_NORM = 100 / 3; // 33.333 ms, one "frame" at 30 FPS
  const radianConvert = Math.PI / 180;
  const FRAMES_PER_LIFE_UNIT = 30;
  const MAX_PARTICLES = 200000;
  const MAX_BATCH = 8192;
  const MAX_TEXTURE_SIZE = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 4096;
  const VERTS_PER_PARTICLE = 6;
  const FLOATS_PER_VERTEX = 8; // x, y, u, v, r, g, b, a
  const STRIDE = FLOATS_PER_VERTEX * 4;
  const QUAD_VERTS = [
    -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5,
  ];
  const QUAD_UVS = [0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1];

  /* allows sin/cos computations to be a bit faster */
  const TWO_PI = Math.PI * 2;
  const INV_TWO_PI = 8192 / TWO_PI;
  const sinTable = new Float32Array(8192);
  const cosTable = new Float32Array(8192);
  for (let i = 0; i < 8192; i++) {
    const angle = (i / 8192) * TWO_PI;
    sinTable[i] = Math.sin(angle);
    cosTable[i] = Math.cos(angle);
  }

  // Util Funcs
  const fastSin = (rads) => sinTable[Math.floor(rads * INV_TWO_PI) & 8191];
  const fastCos = (rads) => cosTable[Math.floor(rads * INV_TWO_PI) & 8191];

  const rng = (val, inf) => val + (Math.random() * 2 - 1) * inf;
  const isColorKey = (key) => key === "sCol" || key === "eCol";
  const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
  const sanitizeInt = (v, limit = 1e9) => {
    const n = Cast.toNumber(v);
    if (isNaN(n)) return 0;
    return Math.max(-limit, Math.min(limit, n));
  };

  const TEXTURE_MIN_SIZE = 256;
  const TEXTURE_MAX_SIZE = Math.min(2048, MAX_TEXTURE_SIZE);
  const TEXTURE_CONTENT_RATIO = 0.875; // leaves >= 1/16 transparent border per side
  const nextPowerOfTwo = (n) => 2 ** Math.ceil(Math.log2(Math.max(1, n)));

  /**
   * Particles are anti-aliased by:
   *  - a transparent border, so the quad's own edges are never visible and
   *    the shape's outline is smoothed by texture filtering instead.
   *  - power-of-two size + mipmaps, so small particles don't shimmer.
   *  - premultiplied upload, so filtering doesn't create dark fringes.
   * Small images (e.g. 50x50 SVGs) are rasterized larger so big particles
   * stay sharp.
   */
  const textureCanvas = document.createElement("canvas");
  const createParticleTexture = (img) => {
    const width = Math.max(1, img.width);
    const height = Math.max(1, img.height);
    const maxDim = Math.max(width, height);
    const contentScale =
      Math.min(
        Math.max(maxDim, TEXTURE_MIN_SIZE),
        TEXTURE_MAX_SIZE * TEXTURE_CONTENT_RATIO
      ) / maxDim;

    const contentWidth = width * contentScale;
    const contentHeight = height * contentScale;
    textureCanvas.width = Math.max(
      16,
      nextPowerOfTwo(contentWidth / TEXTURE_CONTENT_RATIO)
    );
    textureCanvas.height = Math.max(
      16,
      nextPowerOfTwo(contentHeight / TEXTURE_CONTENT_RATIO)
    );

    const ctx = textureCanvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.save();
    ctx.translate(textureCanvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(
      img,
      (textureCanvas.width - contentWidth) / 2,
      (textureCanvas.height - contentHeight) / 2,
      contentWidth,
      contentHeight
    );
    ctx.restore();

    const texture = twgl.createTexture(gl, {
      src: textureCanvas,
      flipY: true,
      premultiplyAlpha: true,
      min: gl.LINEAR_MIPMAP_LINEAR,
      mag: gl.LINEAR,
      wrap: gl.CLAMP_TO_EDGE,
      auto: false,
    });
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.generateMipmap(gl.TEXTURE_2D);

    return {
      tWidth: width,
      tHeight: height,
      // How much bigger the quad is than the visible image
      padX: textureCanvas.width / contentWidth,
      padY: textureCanvas.height / contentHeight,
      texture,
    };
  };

  const newTexture = (url, callback) => {
    let called = false;
    const handleCallback = (value) => {
      if (called) return;
      called = true;
      callback(value);
    };

    Scratch.canFetch(url)
      .then((canFetch) => {
        if (!canFetch) {
          handleCallback(null);
          return;
        }

        // eslint-disable-next-line extension/check-can-fetch
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onerror = (e) => {
          console.error("Error loading texture:", e);
          handleCallback(null);
        };
        img.onload = () => {
          try {
            handleCallback(createParticleTexture(img));
          } catch (e) {
            console.error("Error creating texture:", e);
            handleCallback(null);
          }
        };
        img.src = url;
      })
      .catch(() => handleCallback(null));
  };

  const createParticleRGB = (color) => {
    const rgb = Cast.toRgbColorList(color.val);
    return rgb.map((c) => Math.max(Math.min(rng(c, color.inf), 255), 0));
  };

  // Engine Parts
  const engineVertShader = `
attribute vec2 a_position;
attribute vec2 a_texcoord;
attribute vec4 a_color;

varying vec2 v_texcoord;
varying vec4 v_color;

void main() {
  gl_Position = vec4(a_position, 0, 1);
  v_texcoord = a_texcoord;
  v_color = a_color;
}`;
  const engineFragShader = `
precision mediump float;

uniform sampler2D u_texture;

varying vec2 v_texcoord;
varying vec4 v_color;

void main() {
  // Texture is premultiplied, v_color is not
  vec4 tex = texture2D(u_texture, v_texcoord);
  gl_FragColor = tex * vec4(v_color.rgb * v_color.a, v_color.a);
}`;

  // Shared program and batch buffer (created once, reused by all engines)
  const sharedProgramInfo = twgl.createProgramInfo(gl, [
    engineVertShader,
    engineFragShader,
  ]);
  const engineProgram = sharedProgramInfo.program;
  const aPosition = gl.getAttribLocation(engineProgram, "a_position");
  const aTexcoord = gl.getAttribLocation(engineProgram, "a_texcoord");
  const aColor = gl.getAttribLocation(engineProgram, "a_color");
  const uTexture = gl.getUniformLocation(engineProgram, "u_texture");
  const batchBuffer = gl.createBuffer();
  const batchData = new Float32Array(
    MAX_BATCH * VERTS_PER_PARTICLE * FLOATS_PER_VERTEX
  );

  // Used to copy old framebuffer contents into a resized framebuffer
  const blitProgramInfo = twgl.createProgramInfo(gl, [
    `
attribute vec2 a_position;
varying vec2 v_texcoord;
void main() {
  gl_Position = vec4(a_position, 0, 1);
  v_texcoord = a_position * 0.5 + 0.5;
}`,
    `
precision mediump float;
uniform sampler2D u_texture;
varying vec2 v_texcoord;
void main() {
  gl_FragColor = texture2D(u_texture, v_texcoord);
}`,
  ]);
  const blitBufferInfo = twgl.createBufferInfoFromArrays(gl, {
    a_position: {
      numComponents: 2,
      data: [-1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1],
    },
  });
  const blitTexture = (texture, framebufferInfo, width, height) => {
    render._doExitDrawRegion();
    twgl.bindFramebufferInfo(gl, framebufferInfo);
    gl.viewport(0, 0, width, height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.BLEND);
    gl.useProgram(blitProgramInfo.program);
    twgl.setBuffersAndAttributes(gl, blitProgramInfo, blitBufferInfo);
    twgl.setUniforms(blitProgramInfo, { u_texture: texture });
    twgl.drawBufferInfo(gl, blitBufferInfo, gl.TRIANGLES);
    gl.enable(gl.BLEND);
    twgl.bindFramebufferInfo(gl, null);
  };

  const releaseEmitter = (emitter) => {
    if (!emitter || emitter.released) return;

    emitter.released = true;
    emitter.data.clear();
    if (emitter.texture) {
      gl.deleteTexture(emitter.texture.texture);
    }

    emitter.texture = null;
    const queue = emitter.removalQueue;
    emitter.removalQueue = [];
    for (const resolve of queue) resolve();
  };

  const rollMaxParticles = (emitter) => {
    const option = emitter.opts.maxP;
    emitter.maxP = Math.max(
      0,
      Math.min(MAX_PARTICLES, Math.round(rng(option.val, option.inf)))
    );
  };

  /**
   * Like high quality pen, engines render at the canvas's actual resolution.
   */
  const getRenderQuality = (engine) => {
    const quality = gl.canvas.width / Math.max(engine.stageWidth, 1);
    const maxQuality =
      MAX_TEXTURE_SIZE / Math.max(engine.stageWidth, engine.stageHeight, 1);
    return Math.max(0, Math.min(quality, maxQuality));
  };

  const applyEngineResolution = (engine) => {
    const quality = getRenderQuality(engine);
    engine.renderWidth = Math.max(1, Math.round(engine.stageWidth * quality));
    engine.renderHeight = Math.max(1, Math.round(engine.stageHeight * quality));
    engine.skin.size = [engine.renderWidth, engine.renderHeight];

    engine.drawable.updateScale([
      (engine.drawableScale[0] * engine.stageWidth) / engine.renderWidth,
      (engine.drawableScale[1] * engine.stageHeight) / engine.renderHeight,
    ]);

    engine.skin.emitWasAltered();
    runtime.requestRedraw();
  };

  const makeEngine = (target) => {
    const width = runtime.stageWidth || 480;
    const height = runtime.stageHeight || 360;

    const drawableId = render.createDrawable("sprite");
    const drawable = render._allDrawables[drawableId];
    const skinId = render._nextSkinId++;
    const skin = new ParticleSkin(skinId, render, width, height);
    render._allSkins[skinId] = skin;

    const engine = {
      drawableId,
      drawable,
      skinId,
      skin,
      target,
      targetId: target.id,
      disposed: false,
      stageWidth: width,
      stageHeight: height,
      renderWidth: width,
      renderHeight: height,
      drawableScale: [100, -100],
      emitters: new Map(),
      emitterNameTokens: new Map(),
      interpolate: runtime.interpolationEnabled,
      paused: false,
      noTrails: true,
      dirtyCanvas: false,
      errored: false,
    };
    target[engineTag] = engine;
    allEngines.set(engine.targetId, engine);

    drawable.interactive = false;
    render.updateDrawableSkinId(drawableId, skinId);
    drawable.customDrawableName = `${target.getName()} Particle Engine (SP)`;
    drawable[engineTag] = "default";
    drawable.getUniforms = engineGetUniforms;

    engine.onStageSizeChange = (event) => {
      const [w, h] = event.newSize;
      engine.stageWidth = w;
      engine.stageHeight = h;
      applyEngineResolution(engine);
    };

    applyEngineResolution(engine);

    render.on("NativeSizeChanged", engine.onStageSizeChange);
    runtime.requestRedraw();
  };

  const disposeEngine = (target) => {
    const engine = target[engineTag];
    if (!engine) return;

    target[engineTag] = undefined;
    allEngines.delete(engine.targetId);
    engine.disposed = true;
    for (const emitter of engine.emitters.values()) {
      releaseEmitter(emitter);
    }

    engine.emitters.clear();
    render.removeListener("NativeSizeChanged", engine.onStageSizeChange);

    render.destroyDrawable(engine.drawableId, "sprite");
    render.destroySkin(engine.skinId);
    runtime.requestRedraw();
  };

  const flushDeletingEmitters = (engine) => {
    for (const [name, emitter] of engine.emitters) {
      if (!emitter._isDeleting) continue;
      engine.emitters.delete(name);
      releaseEmitter(emitter);
    }
  };

  const spawnParticle = (opts, px, py) => {
    const life = rng(opts.time.val, opts.time.inf);
    const lifeFrames = life * FRAMES_PER_LIFE_UNIT;
    if (lifeFrames <= 0) return null;

    const x = px + rng(opts.xPos.val, opts.xPos.inf);
    const y = py + rng(opts.yPos.val * -1, opts.yPos.inf);
    return {
      ind: 0,
      lifeFrames,
      speed: rng(opts.speed.val, opts.speed.inf),
      x,
      y,
      bx: x,
      by: y,
      ox: px,
      oy: py,
      dir0: rng(opts.sDir.val - 90, opts.sDir.inf),
      eDir: rng(opts.eDir.val - 90, opts.eDir.inf),
      spin0: rng(opts.sSpin.val - 90, opts.sSpin.inf),
      eSpin: rng(opts.eSpin.val - 90, opts.eSpin.inf),
      size0: rng(opts.sSize.val, opts.sSize.inf) * 0.01,
      eSize: rng(opts.eSize.val, opts.eSize.inf) * 0.01,
      streX0: rng(opts.sStreX.val, opts.sStreX.inf) * 0.01,
      eStreX: rng(opts.eStreX.val, opts.eStreX.inf) * 0.01,
      streY0: rng(opts.sStreY.val, opts.sStreY.inf) * 0.01,
      eStreY: rng(opts.eStreY.val, opts.eStreY.inf) * 0.01,
      gravX: rng(opts.gravX.val, opts.gravX.inf),
      gravY: rng(opts.gravY.val, opts.gravY.inf),
      accelRad: rng(opts.accelRad.val, opts.accelRad.inf),
      accelTan: rng(opts.accelTan.val, opts.accelTan.inf),
      sinW: rng(opts.sinW.val, opts.sinW.inf),
      cosW: rng(opts.cosW.val, opts.cosW.inf),
      sinS: rng(opts.sinS.val, opts.sinS.inf),
      cosS: rng(opts.cosS.val, opts.cosS.inf),
      fIn: Math.max(0, rng(opts.fIn.val, opts.fIn.inf)),
      fOut: Math.max(0, rng(opts.fOut.val, opts.fOut.inf)),
      sCol: createParticleRGB(opts.sCol),
      eCol: createParticleRGB(opts.eCol),
    };
  };

  const updateEngine = (engine, delta) => {
    if (engine.disposed) return false;

    const { skin, emitters, noTrails } = engine;
    const width = engine.stageWidth;
    const height = engine.stageHeight;
    const invW2 = 2 / width;
    const invH2 = 2 / height;

    let glReady = false;
    let batchCount = 0;
    let drawn = 0;

    /**
     * Draw only when something has to be drawn or cleared.
     */
    const startDraw = () => {
      if (glReady) return;
      glReady = true;

      render._doExitDrawRegion(); // Re-bind pen buffers

      twgl.bindFramebufferInfo(gl, skin._framebuffer);
      gl.viewport(0, 0, engine.renderWidth, engine.renderHeight);
      if (noTrails) {
        /* Clear canvas */
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }

      gl.useProgram(engineProgram);
      gl.bindBuffer(gl.ARRAY_BUFFER, batchBuffer);
      gl.enableVertexAttribArray(aPosition);
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, STRIDE, 0);
      gl.enableVertexAttribArray(aTexcoord);
      gl.vertexAttribPointer(aTexcoord, 2, gl.FLOAT, false, STRIDE, 8);
      gl.enableVertexAttribArray(aColor);
      gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, STRIDE, 16);

      gl.enable(gl.BLEND);
      gl.blendEquation(gl.FUNC_ADD);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.activeTexture(gl.TEXTURE0);
      gl.uniform1i(uTexture, 0);
    };

    const flush = () => {
      if (batchCount === 0) return;

      gl.bufferData(
        gl.ARRAY_BUFFER,
        batchData.subarray(
          0,
          batchCount * VERTS_PER_PARTICLE * FLOATS_PER_VERTEX
        ),
        gl.DYNAMIC_DRAW
      );
      gl.drawArrays(gl.TRIANGLES, 0, batchCount * VERTS_PER_PARTICLE);
      batchCount = 0;
    };

    try {
      if (emitters.size > 0) {
        // Emitter positions are offset by the engine owner.
        const ownerX = engine.target.x;
        const ownerY = engine.target.y;

        for (const [name, emitter] of emitters) {
          const texture = emitter.texture;
          if (!texture) continue;

          const { opts, data } = emitter;
          const quadWidth = texture.tWidth * texture.padX;
          const quadHeight = texture.tHeight * texture.padY;
          const posX = emitter.pos[0] + ownerX;
          const posY = emitter.pos[1] - ownerY;

          if (!emitter._isDeleting) {
            // Emit particles
            const rate = rng(opts.emission.val, opts.emission.inf);
            emitter.acc += rate > 0 ? rate * delta : 0;
            const spawnCnt = Math.floor(emitter.acc);
            emitter.acc -= spawnCnt;
            const count = Math.min(spawnCnt, emitter.maxP - data.size);

            for (let i = 0; i < count; i++) {
              const p = spawnParticle(opts, posX, posY);
              if (p) data.add(p);
            }
          }

          let textureBinded = false;
          for (const p of data) {
            /* do not draw if dead */
            if (p.ind >= p.lifeFrames) {
              data.delete(p);
              continue;
            }

            const ind = p.ind;
            const life = p.lifeFrames;
            const t = Math.max(0, Math.min(ind / life, 1));
            const dir = p.dir0 + (p.eDir - p.dir0) * t;
            const spin = p.spin0 + (p.eSpin - p.spin0) * t;
            const size = p.size0 + (p.eSize - p.size0) * t;
            const streX = p.streX0 + (p.eStreX - p.streX0) * t;
            const streY = p.streY0 + (p.eStreY - p.streY0) * t;
            const dirRad = dir * radianConvert;

            const dx = p.bx - p.ox;
            const dy = p.by - p.oy;
            const mag = Math.hypot(dx, dy);
            let normX;
            let normY;
            if (mag > EPSILON) {
              normX = dx / mag;
              normY = dy / mag;
            } else {
              normX = fastCos(dirRad);
              normY = fastSin(dirRad);
            }

            p.bx +=
              (fastCos(dirRad) * p.speed +
                normX * p.accelRad * ind -
                normY * p.accelTan * ind) *
              delta;
            p.by +=
              (fastSin(dirRad) * p.speed +
                normY * p.accelRad * ind +
                normX * p.accelTan * ind) *
              delta;
            p.bx -= p.gravX * ind * delta;
            p.by -= p.gravY * ind * delta;

            p.x = p.bx + fastSin(ind * p.sinS) * p.sinW;
            p.y = p.by + (fastCos(ind * p.cosS) - 1) * p.cosW;

            const fadeIn = p.fIn > 0 ? ind / p.fIn : 1;
            const fadeOut = p.fOut > 0 ? (life - ind) / p.fOut : 1;
            const opacity = Math.max(Math.min(fadeIn, fadeOut, 1), 0);

            p.ind += delta;

            const screenX = p.x + width * 0.5;
            const screenY = p.y + height * 0.5;
            const sizeX = quadWidth * size * streX;
            const sizeY = quadHeight * size * streY;
            /* do not draw if invisible or out-of-bounds */
            if (
              opacity <= 0 ||
              screenX + sizeX < 0 ||
              screenX - sizeX > width ||
              screenY + sizeY < 0 ||
              screenY - sizeY > height
            ) {
              continue;
            }

            if (!glReady) startDraw();
            if (!textureBinded) {
              gl.bindTexture(gl.TEXTURE_2D, texture.texture);
              textureBinded = true;
            }

            const r = (p.eCol[0] * t + p.sCol[0] * (1 - t)) / 255;
            const g = (p.eCol[1] * t + p.sCol[1] * (1 - t)) / 255;
            const b = (p.eCol[2] * t + p.sCol[2] * (1 - t)) / 255;
            const spinRad = spin * radianConvert;
            const c = fastCos(spinRad);
            const s = fastSin(spinRad);

            let o = batchCount * VERTS_PER_PARTICLE * FLOATS_PER_VERTEX;
            for (let v = 0; v < VERTS_PER_PARTICLE; v++) {
              const lx = QUAD_VERTS[v * 2] * sizeX;
              const ly = QUAD_VERTS[v * 2 + 1] * sizeY;
              const px = screenX + lx * c - ly * s;
              const py = screenY + lx * s + ly * c;
              batchData[o++] = px * invW2 - 1;
              batchData[o++] = 1 - py * invH2;
              batchData[o++] = QUAD_UVS[v * 2];
              batchData[o++] = QUAD_UVS[v * 2 + 1];
              batchData[o++] = r;
              batchData[o++] = g;
              batchData[o++] = b;
              batchData[o++] = opacity;
            }

            drawn++;
            if (++batchCount >= MAX_BATCH) flush();
          }

          flush();
          if (emitter._isDeleting && data.size === 0) {
            emitters.delete(name);
            releaseEmitter(emitter);
          }
        }
      }

      if (!glReady && engine.dirtyCanvas && noTrails) {
        startDraw();
      }
    } finally {
      if (glReady) {
        twgl.bindFramebufferInfo(gl, null);
      }
    }

    if (!glReady) return false;
    if (noTrails) {
      engine.dirtyCanvas = drawn > 0;
    } else if (drawn > 0) {
      engine.dirtyCanvas = true;
    }

    skin._silhouetteDirty = true;
    skin.emitWasAltered();
    return true;
  };

  const safeUpdateEngine = (engine, delta) => {
    try {
      return updateEngine(engine, delta);
    } catch (e) {
      if (!engine.errored) {
        engine.errored = true;
        console.error("Particle Engine update failed:", e);
      }

      return false;
    }
  };

  const releaseAllEmitters = () => {
    allEngines.forEach((engine) => {
      engine.emitterNameTokens.clear();
      for (const entry of engine.emitters) {
        engine.emitters.delete(entry[0]);
        releaseEmitter(entry[1]);
      }
    });
  };
  runtime.on("PROJECT_START", releaseAllEmitters);
  runtime.on("PROJECT_STOP_ALL", releaseAllEmitters);
  runtime.on("PROJECT_LOADED", releaseAllEmitters);
  runtime.on("INTERPOLATION_CHANGED", (isEnabled) => {
    // toggle interpolation for all engines
    allEngines.forEach((engine) => {
      engine.interpolate = isEnabled;
    });
  });
  runtime.on("targetWasRemoved", (target) => {
    // Remove engines from a deleted sprite.
    if (target.isOriginal) disposeEngine(target);
  });
  vm.on("targetsUpdate", () => {
    // Fix engine drawable names after sprite rename
    allEngines.forEach((engine) => {
      engine.drawable.customDrawableName = `${engine.target.getName()} Particle Engine (SP)`;
    });
  });

  // Update non-interpolated engines.
  runtime.on("AFTER_EXECUTE", () => {
    if (runtime.ioDevices.clock._paused) return;
    allEngines.forEach((engine) => {
      if (
        engine.paused ||
        engine.interpolate ||
        runtime.frameLoop.framerate === 0
      ) {
        return;
      }

      // 30 FPS is a normal delta, anything else would need normalization
      const normalizedDelta = runtime.currentStepTime / FPS_NORM;
      safeUpdateEngine(engine, normalizedDelta);
    });
  });

  // Update interpolated engines.
  let lastCanvasWidth = gl.canvas.width;
  let lastCanvasHeight = gl.canvas.height;
  function interpolateEngines(deltaFrame) {
    requestAnimationFrame(interpolateEngines);

    // The renderer has no event for canvas resizes, so check every frame
    if (
      gl.canvas.width !== lastCanvasWidth ||
      gl.canvas.height !== lastCanvasHeight
    ) {
      lastCanvasWidth = gl.canvas.width;
      lastCanvasHeight = gl.canvas.height;
      allEngines.forEach((engine) => applyEngineResolution(engine));
    }

    if (runtime.ioDevices.clock._paused) {
      prevTime = deltaFrame;
      return;
    }

    deltaTime =
      prevTime === 0
        ? 0
        : Math.min((deltaFrame - prevTime) / FPS_NORM, MAX_DELTA);
    prevTime = deltaFrame;

    let hasReasonToRefresh = false;
    allEngines.forEach((engine) => {
      if (
        engine.paused ||
        (!engine.interpolate && runtime.frameLoop.framerate > 0)
      ) {
        return;
      }

      const engineChanged = safeUpdateEngine(engine, deltaTime);
      if (engineChanged) hasReasonToRefresh = true;
    });

    if (hasReasonToRefresh) render.dirty = true;
  }
  requestAnimationFrame(interpolateEngines);

  const color1 = "#2474ff";

  class SPpartEngine {
    getInfo() {
      return {
        id: "SPpartEngine",
        name: Scratch.translate("Particle Engine"),
        color1,
        color2: "#005dff",
        color3: "#0043ff",
        menuIconURI,
        blocks: [
          {
            opcode: "createEngine",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("create engine for [TARGET]"),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          {
            opcode: "deleteEngine",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("remove engine from [TARGET]"),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "ALL_TARG" },
            },
          },
          "---",
          {
            opcode: "engineAction",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [TARGET] engine [TYPE]?"),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "ACTION" },
            },
          },
          {
            opcode: "setVisible",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[TYPE] [TARGET] engine"),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "ALL_TARG" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "VISIBLE" },
            },
          },
          {
            opcode: "setEngineSize",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set size of [TARGET] engine to x [x] y [y]"
            ),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          {
            opcode: "setCanvasQuality",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set quality of [TARGET] engine to [QUALITY]"
            ),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              QUALITY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
            },
          },
          "---",
          {
            opcode: "setLayer",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set layer of [TARGET] engine to [VAL]"),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              VAL: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
          },
          {
            opcode: "getLayer",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[TARGET] engine layer"),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          "---",
          {
            opcode: "setEngineOpt",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [OPT] in [TARGET] engine [TYPE]"),
            arguments: {
              OPT: { type: Scratch.ArgumentType.STRING, menu: "ENGINE_OPS" },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "ALL_TARG" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "TOGGLER" },
            },
          },
          {
            opcode: "setEngineBlend",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set blend mode of engine [TARGET] to [TYPE]"
            ),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "ALL_TARG" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "BLENDING" },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Emitters"),
          },
          {
            opcode: "createEmitter",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("create emitter named [NAME] for [TARGET]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("emit-1"),
              },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          {
            opcode: "deleteEmitter",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete emitter [NAME] from [TARGET]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("emit-1"),
              },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          {
            opcode: "deleteEmitterWait",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "delete emitter [NAME] from [TARGET] and wait"
            ),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("emit-1"),
              },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          {
            opcode: "emitterExist",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("emitter [NAME] in [TARGET] exists?"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("emit-1"),
              },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          "---",
          {
            opcode: "setEmitPos",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set position of emitter [NAME] in [TARGET] to x [x] y [y]"
            ),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("emit-1"),
              },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              x: { type: Scratch.ArgumentType.NUMBER },
              y: { type: Scratch.ArgumentType.NUMBER },
            },
          },
          {
            opcode: "emitterPos",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[TYPE] of emitter [NAME] in [TARGET]"),
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "POS" },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("emit-1"),
              },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          "---",
          {
            opcode: "setEmitTexture",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set texture of emitter [NAME] in [TARGET] to [IMG]"
            ),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("emit-1"),
              },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              IMG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "data.URI",
              },
            },
          },
          {
            opcode: "defaultTexture",
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true,
            text: Scratch.translate("[TYPE] texture"),
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "TEXTURES" },
            },
          },
          "---",
          {
            opcode: "setEmitMotion",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set [TYPE] of emitter [NAME] in [TARGET] to [VAL] ± [INT]"
            ),
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "BEHAVIOURS" },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("emit-1"),
              },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              VAL: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              INT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
            },
          },
          {
            opcode: "setEmitColor",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set [TYPE] color of emitter [NAME] in [TARGET] to [VAL] ± [INT]"
            ),
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "COLOR_EMIT" },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("emit-1"),
              },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              VAL: { type: Scratch.ArgumentType.COLOR },
              INT: { type: Scratch.ArgumentType.NUMBER },
            },
          },
          {
            opcode: "getBehaviour",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "[BEHAVE] [TYPE] of emitter [NAME] in [TARGET]"
            ),
            arguments: {
              BEHAVE: {
                type: Scratch.ArgumentType.STRING,
                menu: "ALL_BEHAVIOURS",
              },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "BEHAVE_VAL" },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("emit-1"),
              },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Advanced"),
          },
          {
            opcode: "importEmit",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "import data [DATA] to emitter [NAME] in [TARGET]"
            ),
            arguments: {
              DATA: { type: Scratch.ArgumentType.STRING, defaultValue: "{}" },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("emit-1"),
              },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          {
            opcode: "exportEmit",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("export emitter [NAME] in [TARGET]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("emit-1"),
              },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          {
            opcode: "listEmitters",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get emitter names in [TARGET]"),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
            disableMonitor: true,
          },
        ],
        menus: {
          TARGETS: { acceptReporters: true, items: "getTargets" },
          ALL_TARG: { acceptReporters: true, items: "getTargetsAll" },
          BEHAVIOURS: {
            acceptReporters: true,
            items: this.getBehaviours(false),
          },
          ALL_BEHAVIOURS: {
            acceptReporters: true,
            items: this.getBehaviours(true),
          },
          POS: ["x", "y"],
          BEHAVE_VAL: [
            { text: Scratch.translate("value"), value: "value" },
            { text: Scratch.translate("randomizer"), value: "randomizer" },
          ],
          ACTION: [
            { text: Scratch.translate("created"), value: "created" },
            { text: Scratch.translate("visible"), value: "visible" },
          ],
          VISIBLE: [
            { text: Scratch.translate("show"), value: "show" },
            { text: Scratch.translate("hide"), value: "hide" },
          ],
          ENGINE_OPS: [
            { text: Scratch.translate("freeze"), value: "freeze" },
            { text: Scratch.translate("particle trails"), value: "trails" },
          ],
          TOGGLER: [
            { text: Scratch.translate("on"), value: "on" },
            { text: Scratch.translate("off"), value: "off" },
          ],
          TEXTURES: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("circle"), value: "circle" },
              { text: Scratch.translate("square"), value: "square" },
              { text: Scratch.translate("triangle"), value: "triangle" },
              { text: Scratch.translate("star"), value: "star" },
            ],
          },
          COLOR_EMIT: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("start"), value: "start" },
              { text: Scratch.translate("end"), value: "end" },
            ],
          },
          BLENDING: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("default"), value: "default" },
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
            ],
          },
        },
      };
    }

    // Helper Funcs
    getTargets() {
      const items = [{ text: Scratch.translate("Stage"), value: "_stage_" }];
      const targets = runtime.targets;
      for (let i = 1; i < targets.length; i++) {
        const target = targets[i];
        if (target.isOriginal) {
          items.push({ text: target.getName(), value: target.getName() });
        }
      }

      return items.length > 0 ? items : [""];
    }

    getTargetsAll() {
      let items = this.getTargets();
      items = [
        ...items.slice(0, 1),
        { text: Scratch.translate("all"), value: "_all_" },
        ...items.slice(1, items.length),
      ];

      return items;
    }

    getBehaviours(optAll) {
      const items = [
        { text: Scratch.translate("max particles"), value: "maxP" },
        { text: Scratch.translate("emission"), value: "emission" },
        { text: Scratch.translate("lifetime"), value: "time" },
        { text: Scratch.translate("speed"), value: "speed" },
        { text: Scratch.translate("start x"), value: "xPos" },
        { text: Scratch.translate("start y"), value: "yPos" },
        { text: Scratch.translate("gravity x"), value: "gravX" },
        { text: Scratch.translate("gravity y"), value: "gravY" },
        { text: Scratch.translate("start direction"), value: "sDir" },
        { text: Scratch.translate("end direction"), value: "eDir" },
        { text: Scratch.translate("start spin"), value: "sSpin" },
        { text: Scratch.translate("end spin"), value: "eSpin" },
        { text: Scratch.translate("start size"), value: "sSize" },
        { text: Scratch.translate("end size"), value: "eSize" },
        { text: Scratch.translate("start stretch x"), value: "sStreX" },
        { text: Scratch.translate("end stretch x"), value: "eStreX" },
        { text: Scratch.translate("start stretch y"), value: "sStreY" },
        { text: Scratch.translate("end stretch y"), value: "eStreY" },
        { text: Scratch.translate("acceleration radius"), value: "accelRad" },
        { text: Scratch.translate("acceleration tan"), value: "accelTan" },
        { text: Scratch.translate("sine wave"), value: "sinW" },
        { text: Scratch.translate("sine speed"), value: "sinS" },
        { text: Scratch.translate("cosine wave"), value: "cosW" },
        { text: Scratch.translate("cosine speed"), value: "cosS" },
        { text: Scratch.translate("fade in"), value: "fIn" },
        { text: Scratch.translate("fade out"), value: "fOut" },
      ];
      if (optAll) {
        items.push(
          { text: Scratch.translate("start color"), value: "sCol" },
          { text: Scratch.translate("end color"), value: "eCol" }
        );
      }

      return items;
    }

    getSprite(name) {
      name = Cast.toString(name);
      if (name === "_all_") return "_all_";
      if (name === "_stage_") return runtime.getTargetForStage();
      return runtime.getSpriteTargetByName(name);
    }

    getEngine(target) {
      return target ? target[engineTag] : undefined;
    }

    getEmitterCtx(args) {
      const target = this.getSprite(args.TARGET);
      const engine = this.getEngine(target);
      if (!engine || engine.disposed) return {};

      const emitter = engine.emitters.get(Cast.toString(args.NAME));
      return { target, engine, emitter };
    }

    getEngines(target) {
      // Return all engines for "_all_", otherwise the single engine of a target
      if (target === "_all_") return Array.from(allEngines.values());
      const engine = this.getEngine(target);
      return engine ? [engine] : [];
    }

    _setOpt(args, isColor) {
      const { emitter } = this.getEmitterCtx(args);
      if (!emitter) return;

      const type = Cast.toString(args.TYPE);
      if (!hasOwn(DEFAULT_BEHAVIOURS, type)) return;
      if (isColor !== isColorKey(type)) return;

      const val = isColor ? Cast.toString(args.VAL) : sanitizeInt(args.VAL);
      emitter.opts[type] = { val, inf: sanitizeInt(args.INT) };
      if (type === "maxP") rollMaxParticles(emitter);
    }

    // Block Funcs
    createEngine(args) {
      const target = this.getSprite(args.TARGET);
      if (!target || target === "_all_") return;
      if (target[engineTag] === undefined) {
        makeEngine(target);
      }
    }

    deleteEngine(args) {
      const target = this.getSprite(args.TARGET);
      if (target === "_all_") {
        allEngines.forEach((engine) => disposeEngine(engine.target));
        return;
      }
      if (target && target[engineTag] !== undefined) {
        disposeEngine(target);
      }
    }

    engineAction(args) {
      const target = this.getSprite(args.TARGET);
      const engine = this.getEngine(target);
      if (engine) {
        if (args.TYPE === "visible") {
          return engine.drawable._visible;
        }

        return true;
      }

      return false;
    }

    setVisible(args) {
      const target = this.getSprite(args.TARGET);
      const isVisible = args.TYPE === "show";
      for (const engine of this.getEngines(target)) {
        engine.drawable.updateVisible(isVisible);
      }

      runtime.requestRedraw();
    }

    setEngineSize(args) {
      const target = this.getSprite(args.TARGET);
      const engine = this.getEngine(target);
      if (engine) {
        engine.drawableScale = [
          sanitizeInt(args.x, MAX_INT),
          sanitizeInt(args.y, MAX_INT) * -1,
        ];
        applyEngineResolution(engine);
      }
    }

    setCanvasQuality(args) {
      const target = this.getSprite(args.TARGET);
      const engine = this.getEngine(target);
      if (engine) {
        // To mimic the old functionality, we can use the pixelate effect.
        // It looks closely the same!
        const quality = Math.min(150, Math.max(0, sanitizeInt(args.QUALITY)));
        engine.drawable.updateEffect("pixelate", 150 - quality);
      }
    }

    setLayer(args) {
      const target = this.getSprite(args.TARGET);
      const engine = this.getEngine(target);
      if (engine) {
        const ind = sanitizeInt(args.VAL, MAX_INT);
        const id = engine.drawableId;
        render.setDrawableOrder(
          id,
          ind - render.getDrawableOrder(id),
          "sprite",
          true,
          0
        );
      }
    }

    getLayer(args) {
      const target = this.getSprite(args.TARGET);
      const engine = this.getEngine(target);
      if (engine) {
        return render.getDrawableOrder(engine.drawableId);
      }

      return "";
    }

    setEngineOpt(args) {
      const target = this.getSprite(args.TARGET);
      const toggle = args.TYPE === "on";

      for (const engine of this.getEngines(target)) {
        switch (args.OPT) {
          case "freeze":
            engine.paused = toggle;
            if (toggle) flushDeletingEmitters(engine);
            break;
          case "trails":
            engine.noTrails = !toggle;
            break;
        }
      }
    }

    setEngineBlend(args) {
      const target = this.getSprite(args.TARGET);
      const type = Cast.toString(args.TYPE);
      const mode = BLENDINGS[type] ? type : "default";
      for (const engine of this.getEngines(target)) {
        engine.drawable[engineTag] = mode;
      }

      runtime.requestRedraw();
    }

    createEmitter(args) {
      const target = this.getSprite(args.TARGET);
      const engine = this.getEngine(target);
      if (!engine || engine.disposed) return;

      const name = Cast.toString(args.NAME);
      const emitters = engine.emitters;

      const token = (engine.emitterNameTokens.get(name) || 0) + 1;
      engine.emitterNameTokens.set(name, token);

      const oldEmitter = emitters.get(name);
      if (oldEmitter) releaseEmitter(oldEmitter);

      const emitter = {
        pos: [0, 0],
        rawPos: [0, 0],
        opts: structuredClone(DEFAULT_BEHAVIOURS),
        data: new Set(),
        texture: null,
        acc: 0,
        maxP: 0,
        removalQueue: [],
        released: false,
        _isDeleting: false,
        _texToken: 0,
      };

      rollMaxParticles(emitter);
      emitters.set(name, emitter);

      newTexture(PRESET_SHAPES["square"], (textureObj) => {
        if (!textureObj) return;
        if (
          emitter.released ||
          engine.disposed ||
          target[engineTag] !== engine ||
          engine.emitterNameTokens.get(name) !== token ||
          emitters.get(name) !== emitter
        ) {
          gl.deleteTexture(textureObj.texture);
          return;
        }

        emitter.texture = textureObj;
        runtime.requestRedraw();
      });
    }

    deleteEmitter(args) {
      const { engine, emitter } = this.getEmitterCtx(args);
      if (!engine) return;

      const name = Cast.toString(args.NAME);

      // Invalidate any pending texture loads for this name
      const token = (engine.emitterNameTokens.get(name) || 0) + 1;
      engine.emitterNameTokens.set(name, token);
      if (!emitter) return;

      engine.emitters.delete(name);
      releaseEmitter(emitter);
    }

    deleteEmitterWait(args) {
      const { engine, emitter } = this.getEmitterCtx(args);
      if (!emitter) return;

      emitter.opts.emission = { val: 0, inf: 0 };
      emitter.acc = 0;
      emitter._isDeleting = true;

      if (engine.paused || emitter.data.size === 0) {
        engine.emitters.delete(Cast.toString(args.NAME));
        releaseEmitter(emitter);
        return;
      }

      return new Promise((resolve) => {
        emitter.removalQueue.push(resolve);
      });
    }

    emitterExist(args) {
      const { emitter } = this.getEmitterCtx(args);
      return Cast.toBoolean(emitter);
    }

    setEmitPos(args) {
      const { emitter } = this.getEmitterCtx(args);
      if (emitter) {
        emitter.rawPos = [
          sanitizeInt(args.x, MAX_INT),
          sanitizeInt(args.y, MAX_INT),
        ];
        emitter.pos = [emitter.rawPos[0], emitter.rawPos[1] * -1];
      }
    }

    emitterPos(args) {
      const { emitter } = this.getEmitterCtx(args);
      if (emitter) {
        return emitter.rawPos[args.TYPE === "x" ? 0 : 1];
      }

      return "";
    }

    setEmitTexture(args) {
      const { engine, emitter } = this.getEmitterCtx(args);
      if (!emitter) return;

      const token = ++emitter._texToken;
      newTexture(Cast.toString(args.IMG), (texture) => {
        if (!texture) return;

        if (
          emitter.released ||
          engine.disposed ||
          emitter._texToken !== token
        ) {
          gl.deleteTexture(texture.texture);
          return;
        }

        if (emitter.texture) gl.deleteTexture(emitter.texture.texture);
        emitter.texture = texture;
      });

      runtime.requestRedraw();
    }

    defaultTexture(args) {
      return PRESET_SHAPES[Cast.toString(args.TYPE)] || "";
    }

    setEmitColor(args) {
      if (args.TYPE === "start") args.TYPE = "sCol";
      else if (args.TYPE === "end") args.TYPE = "eCol";
      this._setOpt(args, true);
    }
    setEmitMotion(args) {
      this._setOpt(args, false);
    }

    getBehaviour(args) {
      const { emitter } = this.getEmitterCtx(args);
      if (emitter) {
        const key = Cast.toString(args.BEHAVE);
        if (hasOwn(emitter.opts, key)) {
          return emitter.opts[key][args.TYPE === "value" ? "val" : "inf"];
        }
      }
      return "";
    }

    importEmit(args) {
      const { emitter } = this.getEmitterCtx(args);
      if (!emitter) return;

      try {
        const raw = JSON.parse(Cast.toString(args.DATA));
        if (!raw || typeof raw !== "object" || Array.isArray(raw)) return;

        const next = Object.create(null);
        for (const key of Object.keys(DEFAULT_BEHAVIOURS)) {
          const option = hasOwn(raw, key) ? raw[key] : null;
          if (!option || typeof option !== "object") return;
          if (typeof option.inf !== "number" || !isFinite(option.inf)) return;
          if (isColorKey(key)) {
            if (typeof option.val !== "string") return;
          } else if (typeof option.val !== "number" || !isFinite(option.val)) {
            return;
          }

          next[key] = {
            val: isColorKey(key) ? option.val : sanitizeInt(option.val),
            inf: sanitizeInt(option.inf),
          };
        }

        if (emitter._isDeleting) {
          next.emission = { val: 0, inf: 0 };
        }

        emitter.opts = Object.assign({}, next);
        rollMaxParticles(emitter);
      } catch {}
    }

    exportEmit(args) {
      const { emitter } = this.getEmitterCtx(args);
      if (emitter) return JSON.stringify(emitter.opts);
      else return "{}";
    }

    listEmitters(args) {
      const target = this.getSprite(args.TARGET);
      const data = this.getEngine(target);
      try {
        let names = Array.from(data.emitters.keys());
        return JSON.stringify(names);
      } catch (e) {
        console.warn(e);
        return "[]";
      }
    }
  }

  if (Scratch.gui)
    Scratch.gui.getBlockly().then((SB) => {
      function add2Body() {
        if (document.getElementById("SPpartEngine-GRAD")) return;

        const grad =
          document.querySelector(`div[class="SPgradCache"]`) ||
          document.createElement("div");
        grad.setAttribute("class", "SPgradCache");
        grad.insertAdjacentHTML(
          "beforeend",
          `<svg><defs>
          <linearGradient x1="100" y1="0" x2="100" y2="200" id="SPpartEngine-GRAD" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#0090ff"></stop><stop offset="50%" stop-color="#0000ff"></stop></linearGradient>
        </defs></svg>`
        );
        if (!grad.isConnected) document.body.append(grad);
      }
      add2Body();
      if (!SB?.SPgradients?.patched) {
        /* Gradient Patch by SharkPool, inspired by 0znzw */
        SB.SPgradients = { gradientUrls: new Map(), patched: true };
        const ogBlockRender = SB.BlockSvg.prototype.render;
        SB.BlockSvg.prototype.render = function (...args) {
          const result = ogBlockRender.apply(this, args);
          const grad = SB.SPgradients.gradientUrls.get(
            this.type.slice(0, this.type.indexOf("_"))
          );
          if (grad && this?.svgPath_ && this?.category_) {
            const svg = this.svgPath_;
            const fill = svg.getAttribute("fill");
            this.svgPath_.setAttribute(
              fill === grad.check || fill === grad.path ? "fill" : "stroke",
              grad.path
            );
          }
          return result;
        };
      }
      SB.SPgradients.gradientUrls.set("SPpartEngine", {
        path: "url(#SPpartEngine-GRAD)",
        check: color1,
      });
    });

  Scratch.extensions.register(new SPpartEngine());
})(Scratch);
