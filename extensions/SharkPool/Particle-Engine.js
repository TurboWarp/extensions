// Name: Particle Engine
// ID: SPpartEngine
// Description: Create powerful Particle Engines without Clones
// By: SharkPool
// Licence: MIT

// Version V.2.0.2

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed)
    throw new Error("Particle Engine must run unsandboxed!");

  const menuIconURI =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5Mi4zNjciIGhlaWdodD0iOTIuMzY3IiB2aWV3Qm94PSIwIDAgOTIuMzY3IDkyLjM2NyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIyMTEuNDYxIiB5MT0iMTUxLjQ2MSIgeDI9IjI2OC41MzkiIHkyPSIyMDguNTM5IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzAwOTBmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwNzJmZiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGQ9Ik0wIDQ2LjE4M0MwIDIwLjY3NyAyMC42NzcgMCA0Ni4xODMgMHM0Ni4xODMgMjAuNjc3IDQ2LjE4MyA0Ni4xODMtMjAuNjc3IDQ2LjE4My00Ni4xODMgNDYuMTgzUzAgNzEuNjg5IDAgNDYuMTgzIiBmaWxsPSIjMTk1M2ZmIi8+PHBhdGggZD0iTTIxMS40NiAyMDguNTRjLTE1Ljc2MS0xNS43NjItMTUuNzYxLTQxLjMxNyAwLTU3LjA4IDE1Ljc2My0xNS43NjEgNDEuMzE4LTE1Ljc2MSA1Ny4wOCAwIDE1Ljc2MSAxNS43NjMgMTUuNzYxIDQxLjMxOCAwIDU3LjA4LTE1Ljc2MiAxNS43NjEtNDEuMzE3IDE1Ljc2MS01Ny4wOCAwIiBmaWxsPSJ1cmwoI2EpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTkzLjgxNyAtMTMzLjgxNykiLz48cGF0aCBkPSJNMjguODQ4IDU1LjYyOWE1Ljc3IDUuNzcgMCAwIDAgNC4xNDQtNC4wMTNsMS4yOS00LjUwNWMuNjEyLTIuMTMgMy42NDctMi4wOCA0LjE4Ny4wNjhsMS4xNDcgNC41NDRhNS43NyA1Ljc3IDAgMCAwIDQuMDEgNC4xNDVsNC41MDQgMS4yOWMyLjEzLjYxMiAyLjA4MSAzLjY0Ny0uMDY3IDQuMTlsLTQuNTQ1IDEuMTQ0YTUuNzcgNS43NyAwIDAgMC00LjE0MSA0LjAxbC0xLjI5MyA0LjUwNGMtLjYxIDIuMTMtMy42NDQgMi4wODEtNC4xODctLjA2N2wtMS4xNDQtNC41NDVhNS43NyA1Ljc3IDAgMCAwLTQuMDEzLTQuMTQxbC00LjUwNS0xLjI5Yy0yLjEzLS42MTItMi4wOC0zLjY0Ny4wNjgtNC4xOXptMjkuNjk4LTE2LjMyM2E0LjAyIDQuMDIgMCAwIDAgMi45MDMtMi43OGwuOTE2LTMuMTMzYy40MzUtMS40ODEgMi41NS0xLjQzNSAyLjkxNy4wNjNsLjc4MSAzLjE3MWE0LjAyIDQuMDIgMCAwIDAgMi43NzcgMi45MDNsMy4xMzQuOTE2YzEuNDgyLjQzNSAxLjQzNiAyLjU1LS4wNjMgMi45MmwtMy4xNy43NzhhNC4wMiA0LjAyIDAgMCAwLTIuOTAyIDIuNzc4bC0uOTE4IDMuMTMzYy0uNDMzIDEuNDgyLTIuNTQ3IDEuNDM2LTIuOTE3LS4wNjNsLS43NzktMy4xN2E0LjAyIDQuMDIgMCAwIDAtMi43OC0yLjkwMmwtMy4xMzMtLjkxNmMtMS40ODItLjQzNS0xLjQzNi0yLjU0OS4wNjMtMi45MTl6bS0yMC4xNzEtOC4xNjhhNC4xOCA0LjE4IDAgMCAwLTIuODkzLTMuMDE3bC0zLjI1OS0uOTVjLTEuNTQtLjQ1MS0xLjQ5NS0yLjY1LjA2NC0zLjAzM2wzLjI5Ni0uODE1YTQuMTggNC4xOCAwIDAgMCAzLjAxNi0yLjg5bC45NS0zLjI1OWMuNDUxLTEuNTQgMi42NS0xLjQ5NCAzLjAzNi4wNjRsLjgxMiAzLjI5NmE0LjE4IDQuMTggMCAwIDAgMi44OSAzLjAxNGwzLjI2Ljk1M2MxLjU0LjQ0OCAxLjQ5NCAyLjY0Ni0uMDY0IDMuMDMybC0zLjI5Ny44MTNhNC4xOCA0LjE4IDAgMCAwLTMuMDE0IDIuODkybC0uOTUgMy4yNmMtLjQ1IDEuNTQtMi42NDkgMS40OTQtMy4wMzUtLjA2NHoiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==";

  const shapes = {
    sqr: "1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cGF0aCBkPSJNMCA1MC41VjBoNTB2NTAuNXoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=",
    circ: "1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDQ5LjUgNDkuNSI+PHBhdGggZD0iTTAgMjQuNTVDMCAxMC45OTIgMTAuOTkyIDAgMjQuNTUgMFM0OS4xIDEwLjk5MiA0OS4xIDI0LjU1IDM4LjEwOCA0OS4xIDI0LjU1IDQ5LjEgMCAzOC4xMDggMCAyNC41NSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==",
    tri: "0OS4wOTgiIGhlaWdodD0iNDIuNTIiIHZpZXdCb3g9IjAgMCA0OS4wOTggNDIuNTIiPjxwYXRoIGQ9Ik0wIDQyLjUyIDI0LjU1IDAgNDkuMSA0Mi41MnoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=",
    star: "1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDEuNSAxLjUiPjxwYXRoIGQ9Ik0xLjM3NS42MTNBLjA2LjA2IDAgMCAwIDEuMzIzLjU3TC45NjcuNTIxLjgwNS4yMmEuMDYzLjA2MyAwIDAgMC0uMTEgMEwuNTM2LjUyMS4xOC41N2EuMDYuMDYgMCAwIDAtLjA1MS4wNDMuMDYuMDYgMCAwIDAgLjAxOC4wNjNsLjI1Ni4yMzMtLjA2My4zMjhhLjA2My4wNjMgMCAwIDAgLjA5MS4wN2wuMzE5LS4xNTguMzIuMTU4YS4xLjEgMCAwIDAgLjAyOC4wMDYuMDYzLjA2MyAwIDAgMCAuMDYzLS4wNzRMMS4wOTguOTExbC4yNTYtLjIzM2EuMDYuMDYgMCAwIDAgLjAyMS0uMDY1IiBmaWxsPSIjZmZmIi8+PC9zdmc+",
  };
  for (const key in shapes)
    shapes[key] =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI" +
      shapes[key];

  const vm = Scratch.vm;
  const Cast = Scratch.Cast;
  const runtime = vm.runtime;
  const render = vm.renderer;
  const { Drawable, Skin, twgl } = render.exports;
  const engineTag = Symbol("particleEngine");

  const optionList = {
    maxP: { val: 50, inf: 0 },
    emission: { val: 1, inf: 0 },
    time: { val: 0.4, inf: 0.1 },
    speed: { val: 15, inf: 0 },
    xPos: { val: 10, inf: 0 },
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
  let tabBlured = false,
    deltaTime = 0,
    prevTime = 0;

  const allEngines = new Map();

  // Custom Skin
  class particleSkin extends Skin {
    constructor(id, renderer) {
      super(id, renderer);
      const gl = renderer.gl;
      this._texture = twgl.createTexture(gl, {
        min: gl.NEAREST,
        mag: gl.NEAREST,
        wrap: gl.CLAMP_TO_EDGE,
        src: [0, 0, 0, 0], // Dummy pixel
      });
      this._rotationCenter = [240, 180];
      this._size = [480, 360];
    }
    dispose() {
      if (this._texture) {
        this._renderer.gl.deleteTexture(this._texture);
        this._texture = null;
      }
      super.dispose();
    }
    set size(value) {
      this._size = value;
      this._rotationCenter = [value[0] / 2, value[1] / 2];
    }
    get size() {
      return this._size;
    }
    getTexture(scale) {
      return this._texture || super.getTexture();
    }
    setContent(textureData) {
      const gl = this._renderer.gl;
      gl.bindTexture(gl.TEXTURE_2D, this._texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        textureData
      );
      this.emitWasAltered();
    }
  }

  function applyBlends(gl, type) {
    switch (type) {
      case "additive":
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFuncSeparate(gl.ONE, gl.ONE, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        break;
      case "subtract":
        gl.blendEquation(gl.FUNC_REVERSE_SUBTRACT);
        gl.blendFuncSeparate(gl.ONE, gl.ONE, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        break;
      case "multiply":
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFuncSeparate(
          gl.DST_COLOR,
          gl.ONE_MINUS_SRC_ALPHA,
          gl.ONE,
          gl.ONE_MINUS_SRC_ALPHA
        );
        break;
      case "screen":
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFuncSeparate(
          gl.ONE,
          gl.ONE_MINUS_SRC_COLOR,
          gl.ONE,
          gl.ONE_MINUS_SRC_ALPHA
        );
        break;
      case "invert":
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFuncSeparate(
          gl.ONE_MINUS_DST_COLOR,
          gl.ONE_MINUS_SRC_COLOR,
          gl.ONE,
          gl.ONE_MINUS_SRC_ALPHA
        );
        break;
      default:
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFuncSeparate(
          gl.SRC_ALPHA,
          gl.ONE_MINUS_SRC_ALPHA,
          gl.ONE,
          gl.ONE_MINUS_SRC_ALPHA
        );
    }
  }

  // Patch to allow opacity and blends in our engine
  const gu = Drawable.prototype.getUniforms;
  Drawable.prototype.getUniforms = function () {
    const gl = this._renderer.gl;
    if (this[engineTag]) applyBlends(gl, this[engineTag]);
    else {
      if (vm.extensionManager._loadedExtensions.has("xeltallivclipblend"))
        return gu.call(this);
      gl.blendEquation(gl.FUNC_ADD);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    }
    return gu.call(this);
  };

  // Constants
  const radianConvert = Math.PI / 180;
  const vertices = [
    -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5,
  ];
  const texcoords = [0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1];

  /* allows sin/cos computations to be faster */
  const TWO_PI = Math.PI * 2;
  const INV_TWO_PI = 8192 / TWO_PI;
  const sinTable = new Float32Array(8192),
    cosTable = new Float32Array(8192);
  for (let i = 0; i < 8192; i++) {
    const angle = (i / 8192) * TWO_PI;
    sinTable[i] = Math.sin(angle);
    cosTable[i] = Math.cos(angle);
  }

  // Util Funcs
  const fastSin = (rads) => sinTable[Math.floor(rads * INV_TWO_PI) & 8191];
  const fastCos = (rads) => cosTable[Math.floor(rads * INV_TWO_PI) & 8191];

  const rng = (val, inf) => val + (Math.random() * 2 - 1) * inf;

  const newTexture = (url, gl, callback) => {
    // eslint-disable-next-line
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    img.onerror = (e) => console.error("Error loading texture:", e);
    img.onload = () =>
      callback({
        tWidth: img.width,
        tHeight: img.height,
        texture: twgl.createTexture(gl, { src: img, flipY: true }),
      });
  };

  const createParticleRGB = (color) => {
    const rgb = Cast.toRgbColorList(color.val);
    return [
      rgb.map((c) => Math.max(Math.min(rng(c, color.inf), 255), 0)),
      color.val,
    ];
  };

  const createTint = (sRGB, eRGB, time) => {
    return eRGB.map((c, i) => (c * time + sRGB[i] * (1 - time)) / 255);
  };

  // Engine Parts
  const engineVertShader = `
attribute vec2 a_position;
attribute vec2 a_texcoord;

uniform mat4 u_matrix;

varying vec2 v_texcoord;

void main() {
  gl_Position = u_matrix * vec4(a_position, 0, 1);
  v_texcoord = a_texcoord;
}`;
  const engineFragShader = `
precision mediump float;

uniform sampler2D u_texture;
uniform vec4 u_tintColor;

varying vec2 v_texcoord;

void main() {
  vec4 tex = texture2D(u_texture, v_texcoord);
  gl_FragColor = tex * u_tintColor;
}`;

  const makeEngine = (target) => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    canvas.width = runtime.stageWidth || 480;
    canvas.height = runtime.stageHeight || 360;

    const targetName = target.getName();
    const drawableId = render.createDrawable("sprite");
    const drawable = render._allDrawables[drawableId];
    const skinId = render._nextSkinId++;
    const skin = new particleSkin(skinId, render);
    render._allSkins[skinId] = skin;

    const projection = twgl.m4.ortho(0, canvas.width, canvas.height, 0, -1, 1);
    const programInfo = twgl.createProgramInfo(gl, [
      engineVertShader,
      engineFragShader,
    ]);
    const bufferInfo = twgl.createBufferInfoFromArrays(gl, {
      a_position: { numComponents: 2, data: vertices },
      a_texcoord: { numComponents: 2, data: texcoords },
    });

    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const engine = {
      drawableId,
      drawable,
      skinId,
      skin,
      target,
      canvas,
      gl,
      programInfo,
      bufferInfo,
      projection,
      emitters: Object.create(null),
      data: new Map(),
      interpolate: false,
      paused: false,
      noTrails: true,
    };
    target[engineTag] = engine;
    allEngines.set(targetName, engine);
    render.updateDrawableSkinId(drawableId, skinId);
    drawable.customDrawableName = `${targetName} Particle Engine (SP)`;
    drawable[engineTag] = "default";
    drawable.stageSZChange = (() => {
      const size = [runtime.stageWidth || 480, runtime.stageHeight || 360];
      skin.size = size;
      canvas.width = size[0];
      canvas.height = size[1];
    }).bind(this);
    vm.on("STAGE_SIZE_CHANGED", drawable.stageSZChange);
    runtime.requestRedraw();
  };

  const disposeEngine = (target) => {
    const engine = target[engineTag];
    if (!engine) return;
    vm.off("STAGE_SIZE_CHANGED", engine.drawable.stageSZChange);
    render.destroyDrawable(engine.drawableId, "sprite");
    render.destroySkin(engine.skinId);
    runtime.requestRedraw();
    target[engineTag] = undefined;
    allEngines.delete(target.getName());
  };

  const updateEngine = (engine) => {
    const {
      canvas,
      gl,
      programInfo,
      bufferInfo,
      projection,
      emitters,
      data,
      interpolate,
      noTrails,
    } = engine;
    const { width, height } = canvas;
    const delta = interpolate ? 1 + deltaTime : 1;
    const lifeRate = 0.01 * delta;

    // Clear canvas
    twgl.bindFramebufferInfo(gl, null);
    gl.viewport(0, 0, width, height);
    if (noTrails) {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }

    for (const key in emitters) {
      const emitter = emitters[key];
      if (!emitter.texture) continue;

      const { pos, opts, tintCache, texture } = emitter;
      const { tWidth, tHeight } = texture;
      emitter.frameCnt++;

      const maxP = Math.round(rng(opts.maxP.val, opts.maxP.inf));
      const rPos = [pos[0] - tWidth * 0.25, pos[1] + tHeight * 0.25];

      if (!data.has(key)) data.set(key, new Set());
      const thisData = data.get(key);

      // Emit new particles
      if (emitter.frameCnt > 1 && thisData.size < maxP) {
        const count = Math.min(
          maxP,
          Math.round(rng(opts.emission.val, opts.emission.inf))
        );
        for (let i = 0; i < count; i++) {
          const life = rng(opts.time.val, opts.time.inf);
          const obj = {
            ind: 0,
            conLife: life * 100,
            life,
            speed: rng(opts.speed.val, opts.speed.inf),
            x: rPos[0] + rng(opts.xPos.val, opts.xPos.inf),
            y: rPos[1] + rng(opts.yPos.val * -1, opts.yPos.inf),
            dir: rng(opts.sDir.val - 90, opts.sDir.inf),
            eDir: rng(opts.eDir.val - 90, opts.eDir.inf),
            spin: rng(opts.sSpin.val - 90, opts.sSpin.inf),
            eSpin: rng(opts.eSpin.val - 90, opts.eSpin.inf),
            size: rng(opts.sSize.val, opts.sSize.inf) * 0.01,
            eSize: rng(opts.eSize.val, opts.eSize.inf) * 0.01,
            streX: rng(opts.sStreX.val, opts.sStreX.inf) * 0.01,
            eStreX: rng(opts.eStreX.val, opts.eStreX.inf) * 0.01,
            streY: rng(opts.sStreY.val, opts.sStreY.inf) * 0.01,
            eStreY: rng(opts.eStreY.val, opts.eStreY.inf) * 0.01,
            gravX: rng(opts.gravX.val, opts.gravX.inf),
            gravY: rng(opts.gravY.val, opts.gravY.inf),
            accelRad: rng(opts.accelRad.val, opts.accelRad.inf),
            accelTan: rng(opts.accelTan.val, opts.accelTan.inf),
            sinW: rng(opts.sinW.val, opts.sinW.inf),
            cosW: rng(opts.cosW.val, opts.cosW.inf),
            sinS: rng(opts.sinS.val, opts.sinS.inf),
            cosS: rng(opts.cosS.val, opts.cosS.inf),
            fIn: rng(opts.fIn.val, opts.fIn.inf),
            fOut: rng(opts.fOut.val, opts.fOut.inf),
            sCol: createParticleRGB(opts.sCol),
            eCol: createParticleRGB(opts.eCol),
            ogPos: [],
          };
          obj.ogPos = [obj.x, obj.y];
          thisData.add(obj);
        }
      }

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture.texture);

      for (const particle of thisData) {
        let {
          ind,
          conLife,
          life,
          x,
          y,
          ogPos,
          dir,
          eDir,
          size,
          eSize,
          spin,
          eSpin,
          speed,
          gravX,
          gravY,
          streX,
          eStreX,
          streY,
          eStreY,
          accelRad,
          accelTan,
          sinW,
          sinS,
          cosW,
          cosS,
          fIn,
          fOut,
          sCol,
          eCol,
        } = particle;
        /* do not draw if dead */
        if (particle.life - lifeRate <= 0) {
          thisData.delete(particle);
          continue;
        }

        const dx = x - (pos[0] + width * 0.5);
        const dy = y - (pos[1] + height * 0.5);
        const mag = Math.hypot(dx, dy) || 1;
        const normX = dx / mag;
        const normY = dy / mag;
        const dirRad = dir * radianConvert;

        ogPos[0] +=
          (fastCos(dirRad) * speed +
            normX * accelRad * ind +
            -normY * accelTan * ind) *
          delta;
        ogPos[1] +=
          (fastSin(dirRad) * speed +
            normY * accelRad * ind +
            normX * accelTan * ind) *
          delta;
        ogPos[0] -= gravX * ind * delta;
        ogPos[1] -= gravY * ind * delta;

        const waveT = conLife - life;
        particle.x = ogPos[0] + fastSin(waveT * sinS) * sinW * delta;
        particle.y = ogPos[1] + fastCos(waveT * cosS) * cosW * delta;

        const fadeIn = ind * (1 / fIn);
        const fadeOut = (conLife - ind) * (1 / fOut);
        const opacity = Math.max(Math.min(fadeIn, fadeOut, 1), 0);

        const tintKey = life.toFixed(4);
        let tint = tintCache.get(tintKey);
        if (!tint) {
          tint = createTint(
            sCol[0],
            eCol[0],
            Math.max(0, Math.min(ind / conLife, 1))
          );
          tintCache.set(tintKey, tint);
        }

        particle.ind++;
        particle.life -= lifeRate;

        const screenX = particle.x + width * 0.5;
        const screenY = particle.y + height * 0.5;
        const sizeX = tWidth * size * streX;
        const sizeY = tHeight * size * streY;
        /* do not draw if out-of-bounds */
        if (
          screenX + sizeX < 0 ||
          screenX - sizeX > width ||
          screenY + sizeY < 0 ||
          screenY - sizeY > height
        )
          continue;

        const posNDC = [particle.x + width * 0.5, particle.y + height * 0.5, 0];

        let matrix = twgl.m4.translate(projection, posNDC);
        matrix = twgl.m4.rotateZ(matrix, spin * radianConvert);
        matrix = twgl.m4.scale(matrix, [sizeX, sizeY, 1]);

        twgl.setUniforms(programInfo, {
          u_matrix: matrix,
          u_texture: texture.texture,
          u_tintColor: [...tint, opacity],
        });
        twgl.drawBufferInfo(gl, bufferInfo);

        const deltaFactor = delta / conLife;
        particle.dir += (eDir - dir) * deltaFactor;
        particle.spin += (eSpin - spin) * deltaFactor;
        particle.size += (eSize - size) * deltaFactor;
        particle.streX += (eStreX - streX) * deltaFactor;
        particle.streY += (eStreY - streY) * deltaFactor;
      }
    }
  };

  const resetFrameCnts = () => {
    allEngines.forEach((engine) => {
      const emitters = Object.values(engine.emitters);
      for (const emitter of emitters) {
        emitter.frameCnt = 0;
        emitter.tintCache = new Map();
      }
    });
  };
  runtime.on("PROJECT_START", resetFrameCnts);
  runtime.on("PROJECT_STOP_ALL", resetFrameCnts);
  runtime.on("PROJECT_LOADED", () =>
    allEngines.forEach((engine) => disposeEngine(engine.target))
  );

  window.addEventListener("focus", () => {
    tabBlured = false;
  });
  window.addEventListener("blur", () => {
    tabBlured = true;
  });

  // update non-interpolated engines
  runtime.on("AFTER_EXECUTE", () => {
    if (tabBlured || runtime.ioDevices.clock._paused) return;
    allEngines.forEach((engine) => {
      if (engine.paused || engine.interpolate) return;
      updateEngine(engine);
      engine.skin.setContent(engine.canvas);
    });
  });

  // update interpolated engines
  function interpolateEngines() {
    if (tabBlured || runtime.ioDevices.clock._paused) {
      requestAnimationFrame(interpolateEngines);
      return;
    }

    const now = performance.now();
    deltaTime = prevTime === 0 ? 0 : (now - prevTime) * 0.001;
    prevTime = now;

    const fps = +(1 / deltaTime).toFixed(2);
    const frameTime = 1000 / fps;
    allEngines.forEach((engine) => {
      if (!engine.interpolate || engine.paused) return;

      let remainingTime = deltaTime * 1000;
      const updatesNeeded = Math.floor(remainingTime / frameTime);
      for (let j = 0; j < updatesNeeded; j++) {
        updateEngine(engine);
        engine.skin.setContent(engine.canvas);
        remainingTime -= frameTime;
        if (remainingTime < frameTime) break;
      }

      if (remainingTime > 0) {
        updateEngine(engine);
        engine.skin.setContent(engine.canvas);
      }
    });
    requestAnimationFrame(interpolateEngines);
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
            opcode: "setCanvasSize",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set stage size of [TARGET] engine to width [w] height [h]"
            ),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              w: { type: Scratch.ArgumentType.NUMBER, defaultValue: 480 },
              h: { type: Scratch.ArgumentType.NUMBER, defaultValue: 360 },
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
            opcode: "emitterExist",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("does emitter [NAME] in [TARGET] exist?"),
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
        ],
        menus: {
          TARGETS: { acceptReporters: true, items: this.getTargets(false) },
          ALL_TARG: { acceptReporters: true, items: this.getTargets(true) },
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
            {
              text: Scratch.translate("interpolation"),
              value: "interpolation",
            },
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
              { text: Scratch.translate("start"), value: "sCol" },
              { text: Scratch.translate("end"), value: "eCol" },
            ],
          },
          BLENDING: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("default"), value: "default" },
              { text: Scratch.translate("additive"), value: "additive" },
              { text: Scratch.translate("subtract"), value: "subtract" },
              { text: Scratch.translate("screen"), value: "screen" },
              { text: Scratch.translate("multiply"), value: "multiply" },
              { text: Scratch.translate("invert"), value: "invert" },
            ],
          },
        },
      };
    }

    // Helper Funcs
    getTargets(optAll) {
      const items = [{ text: Scratch.translate("Stage"), value: "_stage_" }];
      if (optAll)
        items.push({ text: Scratch.translate("all"), value: "_all_" });
      const targets = runtime.targets;
      for (let i = 1; i < targets.length; i++) {
        const target = targets[i];
        if (target.isOriginal)
          items.push({ text: target.getName(), value: target.getName() });
      }
      return items.length > 0 ? items : [""];
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
      if (optAll)
        items.push(
          { text: Scratch.translate("start color"), value: "sCol" },
          { text: Scratch.translate("end color"), value: "eCol" }
        );
      return items;
    }

    getSprite(name) {
      if (name === "_all_") return "_all_";
      if (name === "_stage_") return runtime.getTargetForStage();
      return runtime.getSpriteTargetByName(name);
    }

    // Block Funcs
    createEngine(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag] === undefined) makeEngine(target);
    }

    deleteEngine(args) {
      const target = this.getSprite(args.TARGET);
      if (target === "_all_") {
        allEngines.forEach((engine) => disposeEngine(engine.target));
        return;
      }
      if (target && target[engineTag] !== undefined) disposeEngine(target);
    }

    engineAction(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) {
        if (args.TYPE === "visible") return target[engineTag].drawable._visible;
        return true;
      }
      return false;
    }

    setVisible(args) {
      const target = this.getSprite(args.TARGET);
      if (target === "_all_") {
        allEngines.forEach((engine) => {
          engine.drawable.updateVisible(args.TYPE === "show");
        });
        return;
      }
      if (target && target[engineTag])
        target[engineTag].drawable.updateVisible(args.TYPE === "show");
    }

    setEngineSize(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag])
        target[engineTag].drawable.updateScale(
          new Float32Array([Cast.toNumber(args.x), Cast.toNumber(args.y)])
        );
    }

    setCanvasSize(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) {
        const canvas = target[engineTag].canvas;
        canvas.width = Math.min(5000, Math.max(1, Cast.toNumber(args.w)));
        canvas.height = Math.min(5000, Math.max(1, Cast.toNumber(args.h)));
        target[engineTag].projection = twgl.m4.ortho(
          0,
          canvas.width,
          canvas.height,
          0,
          -1,
          1
        );
      }
    }

    setLayer(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) {
        const ind = Cast.toNumber(args.VAL);
        const id = target[engineTag].drawableId;
        render.setDrawableOrder(
          id,
          ind - render.getDrawableOrder(id),
          "sprite",
          true
        );
      }
    }

    getLayer(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag])
        return render.getDrawableOrder(target[engineTag].drawableId);
      return "";
    }

    setEngineOpt(args) {
      const target = this.getSprite(args.TARGET);
      const engine = target?.[engineTag];
      if (target && engine) {
        const toggle = args.TYPE === "on";
        switch (args.OPT) {
          case "interpolation":
            engine.interpolate = toggle;
            break;
          case "freeze":
            engine.paused = toggle;
            break;
          case "trails":
            engine.noTrails = !toggle;
            break;
        }
      }
    }

    setEngineBlend(args) {
      const target = this.getSprite(args.TARGET);
      const engine = target?.[engineTag];
      if (target && engine)
        engine.drawable[engineTag] = Cast.toString(args.TYPE);
    }

    createEmitter(args) {
      const target = this.getSprite(args.TARGET);
      if (!target || !target[engineTag]) return;
      const engine = target[engineTag];
      engine.emitters[args.NAME] = {
        pos: [0, 0],
        opts: structuredClone(optionList),
        frameCnt: 0,
        tintCache: new Map(),
      };
      newTexture(shapes.sqr, engine.gl, (t) => {
        engine.emitters[args.NAME].texture = t;
      });
      runtime.requestRedraw();
    }

    deleteEmitter(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag])
        delete target[engineTag].emitters[args.NAME];
    }

    emitterExist(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag])
        return target[engineTag].emitters[args.NAME] !== undefined;
      return false;
    }

    setEmitPos(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) {
        const engine = target[engineTag];
        if (engine.emitters[args.NAME])
          engine.emitters[args.NAME].pos = [
            Cast.toNumber(args.x),
            Cast.toNumber(args.y) * -1,
          ];
      }
    }

    emitterPos(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) {
        const engine = target[engineTag];
        if (engine.emitters[args.NAME])
          return engine.emitters[args.NAME].pos[args.TYPE === "x" ? 0 : 1];
      }
      return "";
    }

    setEmitTexture(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) {
        const engine = target[engineTag];
        const space = engine.emitters[args.NAME];
        if (space) {
          newTexture(args.IMG, engine.gl, (texture) => {
            space.texture = texture;
          });
          runtime.requestRedraw();
        }
      }
    }

    defaultTexture(args) {
      switch (args.TYPE) {
        case "circle":
          return shapes.circ;
        case "square":
          return shapes.sqr;
        case "triangle":
          return shapes.tri;
        case "star":
          return shapes.star;
        default:
          return "";
      }
    }

    setEmitColor(args) {
      this.setEmitMotion({ ...args, TOCOL: true });
    }
    setEmitMotion(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) {
        const engine = target[engineTag];
        const emitter = engine.emitters[args.NAME];
        if (emitter) {
          let type,
            val,
            shouldResetCache = false;
          if (args.TOCOL) {
            type = args.TYPE === "sCol" ? "sCol" : "eCol";
            val = Cast.toString(args.VAL);
            shouldResetCache = true;
          } else {
            type = Cast.toString(args.TYPE);
            if (type === "time") shouldResetCache = true;
            val = Cast.toNumber(args.VAL);
          }
          if (emitter.opts[type]) {
            emitter.opts[type] = { val, inf: Cast.toNumber(args.INT) };
            if (shouldResetCache) emitter.tintCache = new Map();
          }
        }
      }
    }

    getBehaviour(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) {
        const engine = target[engineTag];
        if (engine.emitters[args.NAME]) {
          const opt = engine.emitters[args.NAME].opts[args.BEHAVE];
          if (opt) return opt[args.TYPE === "value" ? "val" : "inf"];
        }
      }
      return "";
    }

    importEmit(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) {
        const engine = target[engineTag];
        const emitter = engine.emitters[args.NAME];
        if (emitter) {
          try {
            const rawOpts = JSON.parse(args.DATA);
            if (rawOpts.constructor.name !== "Object") return;
            const whiteKeys = [
              "maxP",
              "emission",
              "time",
              "speed",
              "xPos",
              "yPos",
              "gravX",
              "gravY",
              "sDir",
              "eDir",
              "sSpin",
              "eSpin",
              "sSize",
              "eSize",
              "sStreX",
              "eStreX",
              "sStreY",
              "eStreY",
              "accelRad",
              "accelTan",
              "sinW",
              "cosW",
              "sinS",
              "cosS",
              "fIn",
              "fOut",
              "sCol",
              "eCol",
            ];
            const entries = Object.entries(rawOpts);
            if (whiteKeys.length !== entries.length) return;
            for (let i = 0; i < entries.length; i++) {
              const entry = entries[i][1];
              if (
                typeof entry.inf === "number" &&
                (entries[i][0].includes("Col")
                  ? typeof entry.val === "string"
                  : typeof entry.val === "number")
              )
                continue;
              else return;
            }
            emitter.opts = rawOpts;
            emitter.tintCache = new Map();
          } catch {}
        }
      }
    }

    exportEmit(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) {
        const engine = target[engineTag];
        if (engine.emitters[args.NAME])
          return JSON.stringify(engine.emitters[args.NAME].opts);
      }
      return "{}";
    }
  }

  if (Scratch.gui)
    Scratch.gui.getBlockly().then((SB) => {
      function add2Body() {
        const grad =
          document.querySelector(`div[class="SPgradCache"]`) ||
          document.createElement("div");
        grad.setAttribute("class", "SPgradCache");
        grad.innerHTML = `
        ${grad.innerHTML}
        <svg><defs>
          <linearGradient x1="100" y1="0" x2="100" y2="200" id="SPpartEngine-GRAD" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#0090ff"></stop><stop offset="50%" stop-color="#0000ff"></stop></linearGradient>
        </defs></svg>`;
        document.body.append(grad);
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
      SB.SPgradients.gradientUrls.set(
        "SPpartEngine",
        { path: "url(#SPpartEngine-GRAD)", check: color1 }
      );
    });

  Scratch.extensions.register(new SPpartEngine());
})(Scratch);
