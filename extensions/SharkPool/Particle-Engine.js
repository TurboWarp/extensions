// Name: Particle Engine
// ID: SPpartEngine
// Description: Create powerful Particle Engines without Clones
// By: SharkPool
// Licence: MIT

// Version V.1.0.1

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Particle Engine must run unsandboxed!");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5Mi4zNjciIGhlaWdodD0iOTIuMzY3IiB2aWV3Qm94PSIwIDAgOTIuMzY3IDkyLjM2NyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIyMTEuNDYxIiB5MT0iMTUxLjQ2MSIgeDI9IjI2OC41MzkiIHkyPSIyMDguNTM5IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzAwOTBmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwNzJmZiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGQ9Ik0wIDQ2LjE4M0MwIDIwLjY3NyAyMC42NzcgMCA0Ni4xODMgMHM0Ni4xODMgMjAuNjc3IDQ2LjE4MyA0Ni4xODMtMjAuNjc3IDQ2LjE4My00Ni4xODMgNDYuMTgzUzAgNzEuNjg5IDAgNDYuMTgzIiBmaWxsPSIjMTk1M2ZmIi8+PHBhdGggZD0iTTIxMS40NiAyMDguNTRjLTE1Ljc2MS0xNS43NjItMTUuNzYxLTQxLjMxNyAwLTU3LjA4IDE1Ljc2My0xNS43NjEgNDEuMzE4LTE1Ljc2MSA1Ny4wOCAwIDE1Ljc2MSAxNS43NjMgMTUuNzYxIDQxLjMxOCAwIDU3LjA4LTE1Ljc2MiAxNS43NjEtNDEuMzE3IDE1Ljc2MS01Ny4wOCAwIiBmaWxsPSJ1cmwoI2EpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTkzLjgxNyAtMTMzLjgxNykiLz48cGF0aCBkPSJNMjguODQ4IDU1LjYyOWE1Ljc3IDUuNzcgMCAwIDAgNC4xNDQtNC4wMTNsMS4yOS00LjUwNWMuNjEyLTIuMTMgMy42NDctMi4wOCA0LjE4Ny4wNjhsMS4xNDcgNC41NDRhNS43NyA1Ljc3IDAgMCAwIDQuMDEgNC4xNDVsNC41MDQgMS4yOWMyLjEzLjYxMiAyLjA4MSAzLjY0Ny0uMDY3IDQuMTlsLTQuNTQ1IDEuMTQ0YTUuNzcgNS43NyAwIDAgMC00LjE0MSA0LjAxbC0xLjI5MyA0LjUwNGMtLjYxIDIuMTMtMy42NDQgMi4wODEtNC4xODctLjA2N2wtMS4xNDQtNC41NDVhNS43NyA1Ljc3IDAgMCAwLTQuMDEzLTQuMTQxbC00LjUwNS0xLjI5Yy0yLjEzLS42MTItMi4wOC0zLjY0Ny4wNjgtNC4xOXptMjkuNjk4LTE2LjMyM2E0LjAyIDQuMDIgMCAwIDAgMi45MDMtMi43OGwuOTE2LTMuMTMzYy40MzUtMS40ODEgMi41NS0xLjQzNSAyLjkxNy4wNjNsLjc4MSAzLjE3MWE0LjAyIDQuMDIgMCAwIDAgMi43NzcgMi45MDNsMy4xMzQuOTE2YzEuNDgyLjQzNSAxLjQzNiAyLjU1LS4wNjMgMi45MmwtMy4xNy43NzhhNC4wMiA0LjAyIDAgMCAwLTIuOTAyIDIuNzc4bC0uOTE4IDMuMTMzYy0uNDMzIDEuNDgyLTIuNTQ3IDEuNDM2LTIuOTE3LS4wNjNsLS43NzktMy4xN2E0LjAyIDQuMDIgMCAwIDAtMi43OC0yLjkwMmwtMy4xMzMtLjkxNmMtMS40ODItLjQzNS0xLjQzNi0yLjU0OS4wNjMtMi45MTl6bS0yMC4xNzEtOC4xNjhhNC4xOCA0LjE4IDAgMCAwLTIuODkzLTMuMDE3bC0zLjI1OS0uOTVjLTEuNTQtLjQ1MS0xLjQ5NS0yLjY1LjA2NC0zLjAzM2wzLjI5Ni0uODE1YTQuMTggNC4xOCAwIDAgMCAzLjAxNi0yLjg5bC45NS0zLjI1OWMuNDUxLTEuNTQgMi42NS0xLjQ5NCAzLjAzNi4wNjRsLjgxMiAzLjI5NmE0LjE4IDQuMTggMCAwIDAgMi44OSAzLjAxNGwzLjI2Ljk1M2MxLjU0LjQ0OCAxLjQ5NCAyLjY0Ni0uMDY0IDMuMDMybC0zLjI5Ny44MTNhNC4xOCA0LjE4IDAgMCAwLTMuMDE0IDIuODkybC0uOTUgMy4yNmMtLjQ1IDEuNTQtMi42NDkgMS40OTQtMy4wMzUtLjA2NHoiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==";

  const shapes = {
    sqr: "B4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cGF0aCBkPSJNMCA1MC41VjBoNTB2NTAuNXoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=",
    circ: "B4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDQ5LjUgNDkuNSI+PHBhdGggZD0iTTAgMjQuNTVDMCAxMC45OTIgMTAuOTkyIDAgMjQuNTUgMFM0OS4xIDEwLjk5MiA0OS4xIDI0LjU1IDM4LjEwOCA0OS4xIDI0LjU1IDQ5LjEgMCAzOC4xMDggMCAyNC41NSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==",
    tri: "B4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OS4wOTgiIGhlaWdodD0iNDIuNTIiIHZpZXdCb3g9IjAgMCA0OS4wOTggNDIuNTIiPjxwYXRoIGQ9Ik0wIDQyLjUyIDI0LjU1IDAgNDkuMSA0Mi41MnoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=",
    star: "B4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDEuNSAxLjUiPjxwYXRoIGQ9Ik0xLjM3NS42MTNBLjA2LjA2IDAgMCAwIDEuMzIzLjU3TC45NjcuNTIxLjgwNS4yMmEuMDYzLjA2MyAwIDAgMC0uMTEgMEwuNTM2LjUyMS4xOC41N2EuMDYuMDYgMCAwIDAtLjA1MS4wNDMuMDYuMDYgMCAwIDAgLjAxOC4wNjNsLjI1Ni4yMzMtLjA2My4zMjhhLjA2My4wNjMgMCAwIDAgLjA5MS4wN2wuMzE5LS4xNTguMzIuMTU4YS4xLjEgMCAwIDAgLjAyOC4wMDYuMDYzLjA2MyAwIDAgMCAuMDYzLS4wNzRMMS4wOTguOTExbC4yNTYtLjIzM2EuMDYuMDYgMCAwIDAgLjAyMS0uMDY1IiBmaWxsPSIjZmZmIi8+PC9zdmc+"
  };
  for (const key in shapes) shapes[key] = "data:image/svg+xml;base64,PHN2Zy" + shapes[key];

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const render = vm.renderer;
  const { Drawable, Skin } = render.exports;
  const engineTag = Symbol("particleEngine");

  const optionList = {
    maxP: { val: 30, inf: 0 }, emission: { val: 28, inf: 0 },
    time: { val: 0.2, inf: 0.3 }, speed: { val: 15, inf: 0 },
    xPos: { val: 10, inf: 0 }, yPos: { val: 0, inf: 0 },
    gravX: { val: 0, inf: 0 }, gravY: { val: -2, inf: 0 },
    sDir: { val: 0, inf: 25 }, eDir: { val: 0, inf: 0 },
    sSpin: { val: 0, inf: 0 }, eSpin: { val: 45, inf: 135 },
    sSize: { val: 25, inf: 10 }, eSize: { val: 15, inf: 5 },
    sStreX: { val: 100, inf: 0 }, eStreX: { val: 100, inf: 0 },
    sStreY: { val: 100, inf: 0 }, eStreY: { val: 100, inf: 0 },
    accelRad: { val: 0, inf: 0 }, accelTan: { val: 0, inf: 0 },
    fIn: { val: 0, inf: 5 }, fOut: { val: 15, inf: 2 },
    sCol: { val: { h: 0.83, s: 1, l: 0.5 }, inf: 0 }, eCol: { val: { h: 0.5, s: 1, l: 0.5 }, inf: 0 }
  };
  let defaultTexture, tabBlured = false;
  let deltaTime = 0, prevTime = 0;

  const allEngines = {};

  // Util Funcs
  const rng = (val, inf) => val + (Math.random() * 2 - 1) * inf;

  const rgb2Hsl = (rgb) => {
    const r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) h = s = 0;
    else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h, s, l };
  }
  const hsl2Rgb = (h, s, l) => {
    let r, g, b;
    h = h % 1;
    if (s === 0) r = g = b = l;
    else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 3) return q;
        if (t < 1 / 2) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      }
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
      r: Math.round(Math.max(0, Math.min(r * 255, 255))), g: Math.round(Math.max(0, Math.min(g * 255, 255))), b: Math.round(Math.max(0, Math.min(b * 255, 255)))
    };
  }
  const shiftHue = (sC, inf1, eC, inf2, t) => {
    const startHue = rng(sC.h, (inf1 / 360)) % 360;
    const endHue = rng(eC.h, (inf2 / 360)) % 360;
    return hsl2Rgb(
      (startHue + t * (endHue - startHue)) % 360,
      sC.s + t * (eC.s - sC.s), sC.l + t * (eC.l - sC.l)
    );
  };

  const newTexture = (url, callback) => {
    // eslint-disable-next-line
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    img.onload = () => { callback(img) };
    img.onerror = (e) => { console.error("Error loading texture:", e) };
  };
  newTexture(shapes.sqr, (t) => { defaultTexture = t });

  const tintTexture = (texture, rgb, a, emitter) => {
    if (rgb === "rgb(255, 255, 255)") return texture;
    // TODO this should be improved
    const cacheKey = rgb + a;
    if (emitter.tintCache.has(cacheKey)) return emitter.tintCache.get(cacheKey);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { alpha: true });
    canvas.width = texture.width; canvas.height = texture.height;

    ctx.drawImage(texture, 0, 0, texture.width, texture.height);
    ctx.globalCompositeOperation = "source-in";
    ctx.globalAlpha = a; ctx.fillStyle = rgb;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    emitter.tintCache.set(cacheKey, canvas);
    return canvas;
  };

  // Custom Skin
  class particleSkin extends Skin {
    constructor(id, renderer) {
      super(id, renderer);
      const gl = renderer.gl;
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      this._texture = texture;
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
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureData);
      this.emitWasAltered();
    }
  }

  // Patch to allow opacity in our engine
  const DrawableProto = Drawable.__proto__;
  const gu = DrawableProto.getUniforms;
  DrawableProto.getUniforms = function () {
    if (this[engineTag]) {
      const gl = this._renderer.gl;
      gl.blendEquation(gl.FUNC_ADD);
      gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    }
    return gu.call(this);
  }

  // Engine Parts
  const makeEngine = (target) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { alpha: true });
    canvas.width = runtime.stageWidth || 480; canvas.height = runtime.stageHeight || 360;

    const targetName = target.getName();
    const drawableId = render.createDrawable("sprite");
    const drawable = render._allDrawables[drawableId];
    const skinId = render._nextSkinId++;
    const skin = new particleSkin(skinId, render);
    render._allSkins[skinId] = skin;
    const engine = {
      drawableId, drawable, skinId, skin, canvas, ctx, target,
      emitters: {}, data: {}, interpolate: false
    };

    target[engineTag] = engine;
    allEngines[targetName] = engine;
    render.updateDrawableSkinId(drawableId, skinId);
    drawable.customDrawableName = `${targetName} Particle Engine (SP)`;
    drawable[engineTag] = true;
    drawable.stageSZChange = (() => {
      const size = [runtime.stageWidth || 480, runtime.stageHeight || 360];
      skin.size = size;
      canvas.width = size[0]; canvas.height = size[1];
    }).bind(this);
    vm.on("STAGE_SIZE_CHANGED", drawable.stageSZChange);
  };

  const disposeEngine = (target) => {
    const engine = target[engineTag];
    if (!engine) return;
    vm.off("STAGE_SIZE_CHANGED", engine.drawable.stageSZChange);
    render.destroyDrawable(engine.drawableId, "sprite");
    render.destroySkin(engine.skinId);
    runtime.requestRedraw();
    target[engineTag] = undefined;
    delete allEngines[target.getName()];
  };

  const updateEngine = (engine, fps) => {
    const { canvas, ctx, emitters, data, interpolate } = engine;
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    for (const key in emitters) {
      const emitter = emitters[key];
      const { texture, pos, opts } = emitter;
      emitter.frameCnt++;
      if (!texture) continue;
      const delta = interpolate ? deltaTime * fps : 1;
      const maxP = Math.round(rng(opts.maxP.val, opts.maxP.inf));
      const emit = (maxP + 1) - Math.round(rng(opts.emission.val, opts.emission.inf));
      const rPos = [pos[0] - (texture.width / 4), pos[1] + (texture.height / 4)];
      if (!data[key]) data[key] = [];
      while (emitter.frameCnt % emit === 0 && data[key].length < maxP) {
        const life = rng(opts.time.val, opts.time.inf);
        data[key].push({
          ind: 0, conLife: life * 100, life, speed: rng(opts.speed.val, opts.speed.inf),
          x: rPos[0] + rng(opts.xPos.val, opts.xPos.inf), y: rPos[1] + rng(opts.yPos.val * -1, opts.yPos.inf),
          dir: rng(opts.sDir.val - 90, opts.sDir.inf), eDir: rng(opts.eDir.val - 90, opts.eDir.inf),
          spin: rng(opts.sSpin.val - 90, opts.sSpin.inf), eSpin: rng(opts.eSpin.val - 90, opts.eSpin.inf),
          size: rng(opts.sSize.val, opts.sSize.inf) / 100, eSize: rng(opts.eSize.val, opts.eSize.inf) / 100,
          streX: rng(opts.sStreX.val, opts.sStreX.inf) / 100, eStreX: rng(opts.eStreX.val, opts.eStreX.inf) / 100,
          streY: rng(opts.sStreY.val, opts.sStreY.inf) / 100, eStreY: rng(opts.eStreY.val, opts.eStreY.inf) / 100,
          gravX: rng(opts.gravX.val, opts.gravX.inf), gravY: rng(opts.gravY.val, opts.gravY.inf),
          accelRad: rng(opts.accelRad.val, opts.accelRad.inf), accelTan: rng(opts.accelTan.val, opts.accelTan.inf),
          fIn: rng(opts.fIn.val, opts.fIn.inf), fOut: rng(opts.fOut.val, opts.fOut.inf),
          sCol: opts.sCol, eCol: opts.eCol
        });
        emitter.frameCnt++; // force frameCnt++ to not spawn multiple in one frame
      }
      for (let i = data[key].length - 1; i >= 0; i--) {
        const particle = data[key][i];
        let {
          ind, conLife, x, y, dir, eDir, eSize, eStreX, eStreY,
          eSpin, accelRad, accelTan, fIn, fOut, sCol, eCol
        } = particle;
        const angle2Cen = Math.atan2(y - (pos[1] + height / 2), x - (pos[0] + width / 2));
        const radAccelX = Math.cos(angle2Cen) * accelRad * ind;
        const radAccelY = Math.sin(angle2Cen) * accelRad * ind;
        const tanAngle = angle2Cen + Math.PI / 2;
        const tanAccelX = Math.cos(tanAngle) * accelTan * ind;
        const tanAccelY = Math.sin(tanAngle) * accelTan * ind;
  
        particle.x += (Math.cos((dir * Math.PI) / 180) * particle.speed + radAccelX + tanAccelX) * delta;
        particle.y += (Math.sin((dir * Math.PI) / 180) * particle.speed + radAccelY + tanAccelY) * delta;
        particle.x -= particle.gravX * ind * delta;
        particle.y -= particle.gravY * ind * delta;

        let opacity = 1;
        if (ind < fIn) opacity = ind / fIn;
        else if (ind > conLife - fOut) opacity = (conLife - ind) / fOut;
        opacity = Math.max(0, Math.min(opacity, 1));
        const t = Math.max(0, Math.min(ind / conLife, 1));
        const shifted = shiftHue(sCol.val, sCol.inf, eCol.val, eCol.inf, t);
        const rgb = `rgb(${shifted.r}, ${shifted.g}, ${shifted.b})`;
        const brightness = 0.299 * shifted.r + 0.587 * shifted.g + 0.114 * shifted.b;
  
        particle.ind++;
        particle.life -= 0.01 * delta;
        if (particle.life <= 0) {
          data[key].splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(particle.x + width / 2, particle.y + height / 2);
        ctx.rotate((particle.spin * Math.PI) / 180);
        if (particle.streX < 0) ctx.scale(-1, 1);
        if (particle.streY < 0) ctx.scale(1, -1);
        ctx.drawImage(
          tintTexture(texture, rgb, opacity * (1 - (brightness / 255)), emitter), -particle.size / 2, -particle.size / 2,
          texture.width * particle.size * Math.abs(particle.streY),
          texture.height * particle.size * Math.abs(particle.streX)
        );
        ctx.restore();

        const deltaFactor = delta / conLife;
        particle.dir += (eDir - particle.dir) * deltaFactor;
        particle.spin += (eSpin - particle.spin) * deltaFactor;
        particle.size += (eSize - particle.size) * deltaFactor;
        particle.streX += (eStreX - particle.streX) * deltaFactor;
        particle.streY += (eStreY - particle.streY) * deltaFactor;
      }
    }
  };

  const resetFrameCnts = () => {
    const engines = Object.values(allEngines);
    for (let i = 0; i < engines.length; i++) {
      const emitters = engines[i].emitters;
      for (const key in emitters) emitters[key].frameCnt = 0;
    }
  };
  runtime.on("PROJECT_START", resetFrameCnts);
  runtime.on("PROJECT_STOP_ALL", resetFrameCnts);
  runtime.on("PROJECT_LOADED", () => {
    const engines = Object.values(allEngines);
    for (let i = 0; i < engines.length; i++) disposeEngine(engines[i].target);
  });

  window.addEventListener("focus", () => { tabBlured = false });
  window.addEventListener("blur", () => { tabBlured = true });
  runtime.on("BEFORE_EXECUTE", () => {
    const now = performance.now();
    deltaTime = prevTime === 0 ? 0 : (now - prevTime) / 1000;
    prevTime = now;
  });
  runtime.on("AFTER_EXECUTE", () => {
    if (tabBlured || runtime.ioDevices.clock._paused) return;
    const fps = runtime.frameLoop.framerate;
    const frameTime = 1000 / fps;
    const engines = Object.values(allEngines);
    for (let i = 0; i < engines.length; i++) {
      const engine = engines[i];
      let remainingTime = deltaTime * 1000;
      if (engine.interpolate) {
        const updatesNeeded = Math.floor(remainingTime / frameTime);
        for (let j = 0; j < updatesNeeded; j++) {
          updateEngine(engine, fps);
          remainingTime -= frameTime;
          if (remainingTime < frameTime) break;
        }
        if (remainingTime > 0) updateEngine(engine, fps);
      } else {
        updateEngine(engine, fps);
      }
      engine.skin.setContent(engine.canvas);
    }
  });

  class SPpartEngine {
    getInfo() {
      return {
        id: "SPpartEngine",
        name: "Particle Engine",
        color1: "#2474ff",
        color2: "#005dff",
        color3: "#0043ff",
        menuIconURI,
        blocks: [
          {
            opcode: "createEngine",
            blockType: Scratch.BlockType.COMMAND,
            text: "create engine for [TARGET]",
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            },
          },
          {
            opcode: "deleteEngine",
            blockType: Scratch.BlockType.COMMAND,
            text: "remove engine from [TARGET]",
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "ALL_TARG" }
            },
          },
          "---",
          {
            opcode: "engineAction",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [TARGET] engine [TYPE]?",
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "ACTION" }
            },
          },
          {
            opcode: "setVisible",
            blockType: Scratch.BlockType.COMMAND,
            text: "[TYPE] [TARGET] engine",
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "ALL_TARG" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "VISIBLE" }
            },
          },
          {
            opcode: "setEngineSize",
            blockType: Scratch.BlockType.COMMAND,
            text: "set size of [TARGET] engine to x [x] y [y]",
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            },
          },
          {
            opcode: "setCanvasSize",
            blockType: Scratch.BlockType.COMMAND,
            text: "set stage size of [TARGET] engine to width [w] height [h]",
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              w: { type: Scratch.ArgumentType.NUMBER, defaultValue: 480 },
              h: { type: Scratch.ArgumentType.NUMBER, defaultValue: 360 }
            },
          },
          "---",
          {
            opcode: "setLayer",
            blockType: Scratch.BlockType.COMMAND,
            text: "set layer of [TARGET] engine to [VAL]",
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              VAL: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            },
          },
          {
            opcode: "getLayer",
            blockType: Scratch.BlockType.REPORTER,
            text: "[TARGET] engine layer",
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            },
          },
          "---",
          {
            opcode: "setEngineOpt",
            blockType: Scratch.BlockType.COMMAND,
            text: "set interpolation in [TARGET] engine [TYPE]",
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "ALL_TARG" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "TOGGLER" }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Emitters" },
          {
            opcode: "createEmitter",
            blockType: Scratch.BlockType.COMMAND,
            text: "create emitter named [NAME] for [TARGET]",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "emit-1" },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            },
          },
          {
            opcode: "deleteEmitter",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete emitter [NAME] from [TARGET]",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "emit-1" },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            },
          },
          {
            opcode: "emitterExist",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "does emitter [NAME] in [TARGET] exist?",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "emit-1" },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            },
          },
          "---",
          {
            opcode: "setEmitPos",
            blockType: Scratch.BlockType.COMMAND,
            text: "set position of emitter [NAME] in [TARGET] to x [x] y [y]",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "emit-1" },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              x: { type: Scratch.ArgumentType.NUMBER },
              y: { type: Scratch.ArgumentType.NUMBER }
            },
          },
          {
            opcode: "emitterPos",
            blockType: Scratch.BlockType.REPORTER,
            text: "[TYPE] of emitter [NAME] in [TARGET]",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "POS" },
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "emit-1" },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            },
          },
          "---",
          {
            opcode: "setEmitTexture",
            blockType: Scratch.BlockType.COMMAND,
            text: "set texture of emitter [NAME] in [TARGET] to [IMG]",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "emit-1" },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              IMG: { type: Scratch.ArgumentType.STRING, defaultValue: "data.URI" }
            },
          },
          {
            opcode: "defaultTexture",
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true,
            text: "[TYPE] texture",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "TEXTURES" }
            },
          },
          "---",
          {
            opcode: "setEmitMotion",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [TYPE] of emitter [NAME] in [TARGET] to [VAL] ± [INT]",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "BEHAVIOURS" },
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "emit-1" },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              VAL: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              INT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            },
          },
          {
            opcode: "setEmitColor",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [TYPE] color of emitter [NAME] in [TARGET] to [VAL] ± [INT]",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "COLOR_EMIT" },
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "emit-1" },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              VAL: { type: Scratch.ArgumentType.COLOR },
              INT: { type: Scratch.ArgumentType.NUMBER }
            },
          },
          {
            opcode: "getBehaviour",
            blockType: Scratch.BlockType.REPORTER,
            text: "[BEHAVE] [TYPE] of emitter [NAME] in [TARGET]",
            arguments: {
              BEHAVE: { type: Scratch.ArgumentType.STRING, menu: "ALL_BEHAVIOURS" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "BEHAVE_VAL" },
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "emit-1" },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            },
          },
        ],
        menus: {
          TARGETS: { acceptReporters: true, items: this.getTargets(false) },
          ALL_TARG: { acceptReporters: true, items: this.getTargets(true) },
          BEHAVIOURS: { acceptReporters: true, items: this.getBehaviours(false) },
          ALL_BEHAVIOURS: { acceptReporters: true, items: this.getBehaviours(true) },
          BEHAVE_VAL: ["value", "randomizer"],
          ACTION: ["created", "visible"],
          VISIBLE: ["show", "hide"],
          POS: ["x", "y"],
          TOGGLER: ["on", "off"],
          TEXTURES: {
            acceptReporters: true, items: ["circle", "square", "triangle", "star"]
          },
          COLOR_EMIT: {
            acceptReporters: true,
            items: [{ text: "start", value: "sCol" }, { text: "end", value: "eCol" }]
          }
        },
      };
    }

    // Helper Funcs
    getTargets(optAll) {
      const items = [{ text: "Stage", value: "_stage_" }];
      if (optAll) items.push({ text: "all", value: "_all_" });
      const targets = runtime.targets;
      for (let index = 1; index < targets.length; index++) {
        const target = targets[index];
        if (target.isOriginal) items.push({ text: target.getName(), value: target.getName() });
      }
      return items.length > 0 ? items : [""];
    }

    getBehaviours(optAll) {
      const items = [
        { text: "max particles", value: "maxP" }, { text: "emission", value: "emission" },
        { text: "lifetime", value: "time" }, { text: "speed", value: "speed" },
        { text: "start x", value: "xPos" }, { text: "start y", value: "yPos" },
        { text: "gravity x", value: "gravX" }, { text: "gravity y", value: "gravY" },
        { text: "start direction", value: "sDir" }, { text: "end direction", value: "eDir" },
        { text: "start spin", value: "sSpin" }, { text: "end spin", value: "eSpin" },
        { text: "start size", value: "sSize" }, { text: "end size", value: "eSize" },
        { text: "start stretch x", value: "sStreX" }, { text: "end stretch x", value: "eStreX" },
        { text: "start stretch y", value: "sStreY" }, { text: "end stretch y", value: "eStreY" },
        { text: "acceleration radius", value: "accelRad" },
        { text: "acceleration tan", value: "accelTan" },
        { text: "fade in", value: "fIn" }, { text: "fade out", value: "fOut" }
      ];
      if (optAll) items.push({ text: "start color", value: "sCol" }, { text: "end color", value: "eCol" });
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
        const engines = Object.values(allEngines);
        for (let i = 0; i < engines.length; i++) disposeEngine(engines[i].target);
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
        const engines = Object.values(allEngines);
        for (let i = 0; i < engines.length; i++) engines[i].drawable.updateVisible(args.TYPE === "show");
        return;
      }
      if (target && target[engineTag]) target[engineTag].drawable.updateVisible(args.TYPE === "show");
    }

    setEngineSize(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) target[engineTag].drawable.updateScale(
        new Float32Array([
          Scratch.Cast.toNumber(args.x), Scratch.Cast.toNumber(args.y)
        ])
      );
    }

    setCanvasSize(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) {
        const canvas = target[engineTag].canvas;
        canvas.width = Math.max(0, Scratch.Cast.toNumber(args.w));
        canvas.height = Math.max(0, Scratch.Cast.toNumber(args.h));
      }
    }

    setLayer(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) {
        const ind = Scratch.Cast.toNumber(args.VAL);
        const id = target[engineTag].drawableId;
        render.setDrawableOrder(id, ind - render.getDrawableOrder(id), "sprite", true);
      }
    }

    getLayer(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) return render.getDrawableOrder(target[engineTag].drawableId);
    }

    setEngineOpt(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) target[engineTag].interpolate = args.TYPE === "on";
    }

    createEmitter(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) target[engineTag].emitters[args.NAME] = {
        pos: [0,0], texture: defaultTexture, opts: structuredClone(optionList),
        frameCnt: 0, tintCache: new Map()
      };
    }

    deleteEmitter(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) delete target[engineTag].emitters[args.NAME];
    }

    emitterExist(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) return target[engineTag].emitters[args.NAME] !== undefined;
      return false;
    }

    setEmitPos(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) {
        const engine = target[engineTag];
        if (engine.emitters[args.NAME]) engine.emitters[args.NAME].pos = [
          Scratch.Cast.toNumber(args.x), Scratch.Cast.toNumber(args.y) * -1
        ];
      }
    }

    emitterPos(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) {
        const engine = target[engineTag];
        if (engine.emitters[args.NAME]) return engine.emitters[args.NAME].pos[args.TYPE === "x" ? 0 : 1];
      }
      return "";
    }

    setEmitTexture(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) {
        const engine = target[engineTag];
        const space = engine.emitters[args.NAME];
        if (space) newTexture(args.IMG, (texture) => {
          space.texture = texture;
          space.tintCache = new Map(); // clear cache
        });
      }
    }

    defaultTexture(args) {
      switch (args.TYPE) {
        case "circle": return shapes.circ;
        case "square": return shapes.sqr;
        case "triangle": return shapes.tri;
        case "star": return shapes.star;
        default: return "";
      }
    }

    setEmitColor(args) { this.setEmitMotion({ ...args, TOCOL: true }) }
    setEmitMotion(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) {
        const engine = target[engineTag];
        if (engine.emitters[args.NAME]) {
          let type, val;
          if (args.TOCOL) {
            type = args.TYPE === "sCol" ? "sCol" : "eCol";
            val = rgb2Hsl(Scratch.Cast.toRgbColorObject(args.VAL));
          } else {
            type = args.TYPE;
            val = Scratch.Cast.toNumber(args.VAL);
          }
          let opt = engine.emitters[args.NAME].opts[type];
          if (opt) engine.emitters[args.NAME].opts[type] = { val, inf: Scratch.Cast.toNumber(args.INT) };
        }
      }
    }

    getBehaviour(args) {
      const target = this.getSprite(args.TARGET);
      if (target && target[engineTag]) {
        const engine = target[engineTag];
        if (engine.emitters[args.NAME]) {
          const opt = engine.emitters[args.NAME].opts[args.BEHAVE];
          if (opt) {
            if (args.BEHAVE.endsWith("Col") && args.TYPE === "value") return JSON.stringify(hsl2Rgb(...Object.values(opt.val)));
            return opt[args.TYPE === "value" ? "val" : "inf"];
          }
        }
      }
      return "";
    }
  }

  function add2Body() {
    var svg = document.createElement("div");
    svg.innerHTML = `<svg><defs>
      <linearGradient x1="100" y1="0" x2="100" y2="200" id="SPpartEngine-GRAD1" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0090ff"></stop><stop offset="50%" stop-color="#0000ff"></stop></linearGradient>
      </defs></svg>`;
    document.body.appendChild(svg);
  }
  if (Scratch.gui) Scratch.gui.getBlockly().then((SB) => {
    add2Body();
    if (!SB?.SPgradients?.patched) { // Gradient Patch by 0znzw & SharkPool
      SB.SPgradients = {gradientUrls: {}, patched: false};
      const BSP = SB.BlockSvg.prototype, BSPR = BSP.render;
      BSP.render = function(...args) {
        const res = BSPR.apply(this, args);
        let category;
        if (this?.svgPath_ && this?.category_ && (category = this.type.slice(0, this.type.indexOf("_"))) && SB.SPgradients.gradientUrls[category]) {
          const urls = SB.SPgradients.gradientUrls[category];
          if (urls) this.svgPath_.setAttribute("fill", urls[0]);
        }
        return res;
      }
      SB.SPgradients.patched = true;
    }
    SB.SPgradients.gradientUrls["SPpartEngine"] = ["url(#SPpartEngine-GRAD1)"];
  });

  Scratch.extensions.register(new SPpartEngine());
})(Scratch);
