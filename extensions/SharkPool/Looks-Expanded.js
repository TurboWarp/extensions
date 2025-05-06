// Name: Looks Expanded
// ID: SPlooksExpanded
// Description: Expansion of the Looks Category
// By: SharkPool
// By: CST1229 <https://scratch.mit.edu/users/CST1229/>
// Licence: MIT

// Version V.1.0.22

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed)
    throw new Error("Looks Expanded must run unsandboxed!");

  const menuIconURI =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5Ny43MzkiIGhlaWdodD0iOTcuNzM5IiB2aWV3Qm94PSIwIDAgOTcuNzM5IDk3LjczOSI+PGcgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMCA0OC44N0MwIDIxLjg4IDIxLjg4IDAgNDguODcgMHM0OC44NyAyMS44OCA0OC44NyA0OC44Ny0yMS44OCA0OC44Ny00OC44NyA0OC44N1MwIDc1Ljg2IDAgNDguODciIGZpbGw9IiM2MzQyYTYiLz48cGF0aCBkPSJNNS43ODIgNDguODdjMC0yMy43OTcgMTkuMjkxLTQzLjA4OCA0My4wODgtNDMuMDg4UzkxLjk1OCAyNS4wNzMgOTEuOTU4IDQ4Ljg3IDcyLjY2NyA5MS45NTggNDguODcgOTEuOTU4IDUuNzgyIDcyLjY2NyA1Ljc4MiA0OC44NyIgZmlsbD0iIzk2ZiIvPjxwYXRoIGQ9Ik0xNi4xODYgNDQuOTk2YzQuNTMyLTUuMzEgMTYuMjE4LTE2Ljg3NCAzMi4xNzYtMTcuMDM0IDE3LjExNy0uMTcyIDI5LjMzNCAxMi41MzkgMzMuNTIgMTcuNjA0IDEuMDM5IDEuMjU4IDEuMSAyLjc2NC4xNjcgMy45MjctMy45MzUgNC45MDEtMTUuODk4IDE3LjY4Mi0zMy42ODcgMTcuNzY3LTE2Ljk1Ni4wOC0yOC43My0xMi41OS0zMi43MzYtMTcuNjI0LS45OTMtMS4yNDctLjc5My0zLjA1NC41Ni00LjY0IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTM1LjE0NiA0Ny42MWMwLTcuNTM2IDYuMTEtMTMuNjQ1IDEzLjY0NS0xMy42NDUgNy41MzYgMCAxMy42NDUgNi4xMSAxMy42NDUgMTMuNjQ1IDAgNy41MzYtNi4xMSAxMy42NDUtMTMuNjQ1IDEzLjY0NS03LjUzNiAwLTEzLjY0NS02LjExLTEzLjY0NS0xMy42NDUiIGZpbGw9IiM5NmYiLz48cGF0aCBkPSJNNDEuMzQyIDQ3LjYxYTcuNDQ5IDcuNDQ5IDAgMSAxIDE0Ljg5OCAwIDcuNDQ5IDcuNDQ5IDAgMCAxLTE0Ljg5OCAwIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTY1LjY1IDc4Ljc5YTIuOTIgMi45MiAwIDAgMS0yLjkxOC0yLjkydi02LjcxMmgtNi43MTNhMi45MiAyLjkyIDAgMCAxLTIuOTE5LTIuOTE5VjY0LjA1YTIuOTIgMi45MiAwIDAgMSAyLjkxOS0yLjkxOGg2LjcxM3YtNi43MTNBMi45MiAyLjkyIDAgMCAxIDY1LjY1IDUxLjVoMi4xOWEyLjkyIDIuOTIgMCAwIDEgMi45MTggMi45MTl2Ni43MTNoNi43MTNhMi45MiAyLjkyIDAgMCAxIDIuOTE5IDIuOTE4djIuMTlhMi45MiAyLjkyIDAgMCAxLTIuOTIgMi45MThoLTYuNzEydjYuNzEzYTIuOTIgMi45MiAwIDAgMS0yLjkxOSAyLjkxOXoiIGZpbGw9IiNmZmYiIHN0cm9rZT0iIzk2ZiIgc3Ryb2tlLXdpZHRoPSI4Ii8+PHBhdGggZD0iTTY1LjY1IDc4Ljc5YTIuOTIgMi45MiAwIDAgMS0yLjkxOC0yLjkydi02LjcxMmgtNi43MTNhMi45MiAyLjkyIDAgMCAxLTIuOTE5LTIuOTE5VjY0LjA1YTIuOTIgMi45MiAwIDAgMSAyLjkxOS0yLjkxOGg2LjcxM3YtNi43MTNBMi45MiAyLjkyIDAgMCAxIDY1LjY1IDUxLjVoMi4xOWEyLjkyIDIuOTIgMCAwIDEgMi45MTggMi45MTl2Ni43MTNoNi43MTNhMi45MiAyLjkyIDAgMCAxIDIuOTE5IDIuOTE4djIuMTlhMi45MiAyLjkyIDAgMCAxLTIuOTIgMi45MThoLTYuNzEydjYuNzEzYTIuOTIgMi45MiAwIDAgMS0yLjkxOSAyLjkxOXoiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+";

  const vm = Scratch.vm;
  const Cast = Scratch.Cast;
  const runtime = vm.runtime;
  const looksCore = runtime.ext_scratch3_looks;
  const isPM = Scratch.extensions.isPenguinMod;

  const render = vm.renderer;
  const twgl = render.exports.twgl;
  const drawableKey = Symbol("SPlooksKey");
  const newUniforms = [
    "u_replaceColorFromSP",
    "u_replaceColorToSP",
    "u_replaceThresholdSP",
    "u_numReplacersSP",
    "u_warpSP",
    "u_maskTextureSP",
    "u_shouldMaskSP",
    "u_tintColorSP",
    "u_saturateSP",
    "u_opaqueSP",
    "u_contrastSP",
    "u_posterizeSP",
    "u_sepiaSP",
    "u_bloomSP",
  ];
  const defaultNewEffects = {
    warp: [0.5, -0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5],
    tint: [1, 1, 1, 1],
    replacers: [],
    maskTexture: "",
    oldMask: "",
    shouldMask: 0,
    newEffects: {
      saturation: 1,
      opaque: 0,
      contrast: 1,
      posterize: 0,
      sepia: 0,
      bloom: 0,
    },
  };

  /* patch for new effects */
  function initDrawable(drawable) {
    if (!drawable[drawableKey])
      drawable[drawableKey] = structuredClone(defaultNewEffects);
  }

  const ogGetShader = render._shaderManager.getShader;
  render._shaderManager.getShader = function (drawMode, effectBits) {
    const shader = ogGetShader.call(this, drawMode, effectBits);
    const gl = render._gl;

    // add uniforms to the existing shader
    newUniforms.forEach((name) => {
      shader.uniformSetters[name] = gl.getUniformLocation(shader.program, name);
    });
    return shader;
  };

  // Clear the renderer"s shader cache since we"re patching shaders
  for (const cache of Object.values(render._shaderManager._shaderCache)) {
    for (const programInfo of cache) {
      if (programInfo) render.gl.deleteProgram(programInfo.program);
    }
    cache.length = 0;
  }

  let patchShaders = false;
  const ogCreateProgramInfo = twgl.createProgramInfo;
  twgl.createProgramInfo = function (...args) {
    // perform a string find-and-replace on the shader text
    if (patchShaders && args[1] && args[1][0] && args[1][1]) {
      args[1][0] = args[1][0]
        // replace attribute properties with variables we can modify
        .replaceAll("vec4(a_position", "vec4(positionSP")
        .replace("v_texCoord = a_texCoord;", "")
        .replace(
          "#if !(defined(DRAW_MODE_line) || defined(DRAW_MODE_background))",
          "#if 1"
        )
        .replace(
          `void main() {`,
          `uniform vec2 u_warpSP[4];

void main() {
  vec2 positionSP = a_position;
  #ifndef DRAW_MODE_background
  v_texCoord = a_texCoord;
  #endif

  float u = v_texCoord.x;
  float v = v_texCoord.y;

  // apply position warp (bilinear)
  vec2 warpedPos = 
    (1.0 - u) * (1.0 - v) * u_warpSP[0] + u * (1.0 - v) * u_warpSP[1] +
    u * v * u_warpSP[2] + (1.0 - u) * v * u_warpSP[3];

  // compute w for perspective correction
  float w = (1.0 - u) * (1.0 - v) + u * (1.0 - v) + u * v + (1.0 - u) * v;

  positionSP = warpedPos / max(w, 1e-5);

  #ifdef DRAW_MODE_background
  gl_Position = vec4(positionSP * 2.0, 0, 1);
  #else
  gl_Position = u_projectionMatrix * u_modelMatrix * vec4(positionSP, 0, 1);
  #endif`
        );

      args[1][1] = args[1][1]
        .replace(
          `uniform sampler2D u_skin;`,
          `uniform sampler2D u_skin;
uniform sampler2D u_maskTextureSP;
uniform float u_shouldMaskSP;

#define MAX_REPLACERS 15
uniform vec3 u_replaceColorFromSP[MAX_REPLACERS];
uniform vec4 u_replaceColorToSP[MAX_REPLACERS];
uniform float u_replaceThresholdSP[MAX_REPLACERS];
uniform int u_numReplacersSP;

uniform vec4 u_tintColorSP;
uniform float u_saturateSP;
uniform float u_opaqueSP;
uniform float u_contrastSP;
uniform float u_posterizeSP;
uniform float u_sepiaSP;
uniform float u_bloomSP;

vec3 spRGB2HSV(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}
vec3 spHSV2RGB(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}`
        )
        .replace(
          `gl_FragColor.rgb = clamp(gl_FragColor.rgb / (gl_FragColor.a + epsilon), 0.0, 1.0);`,
          `gl_FragColor.rgb = clamp(gl_FragColor.rgb / (gl_FragColor.a + epsilon), 0.0, 1.0);
vec3 finalColor = gl_FragColor.rgb;
float finalAlpha = gl_FragColor.a;

if (u_shouldMaskSP > 0.5 && finalAlpha > 0.0) {
  vec4 maskColor = texture2D(u_maskTextureSP, texcoord0);
  maskColor.rgb = clamp(maskColor.rgb / (maskColor.a + epsilon), 0.0, 1.0);
  finalAlpha *= maskColor.a;
}

for (int i = 0; i < MAX_REPLACERS; i++) {
  if (i >= u_numReplacersSP) break;

  float dist = distance(finalColor, u_replaceColorFromSP[i]);
  if (dist <= u_replaceThresholdSP[i]) {
    float strength = 1.0 - (dist / (u_replaceThresholdSP[i] + 1.0));
    finalColor = mix(finalColor, u_replaceColorToSP[i].rgb, strength);
    if (u_replaceColorToSP[i].a < 1.0 && strength > 0.01) {
      finalAlpha = clamp(mix(finalAlpha, u_replaceColorToSP[i].a, strength), 0.0, 1.0);
    }
  }
}

vec3 hsv = spRGB2HSV(finalColor);
if (u_saturateSP < 0.0) {
  hsv.x = mod(hsv.x + 0.5, 1.0);
  hsv.y *= -u_saturateSP;
} else {
  hsv.y *= u_saturateSP;
}
finalColor = spHSV2RGB(hsv);
finalColor = (finalColor - 0.5) * u_contrastSP + 0.5;
if (u_posterizeSP > 0.0) finalColor = floor(finalColor * u_posterizeSP) / u_posterizeSP;

if (u_sepiaSP > 0.0) {
  vec3 sepiaColor = vec3(
    dot(finalColor, vec3(0.393, 0.769, 0.189)),
    dot(finalColor, vec3(0.349, 0.686, 0.168)),
    dot(finalColor, vec3(0.272, 0.534, 0.131))
  );
  finalColor = mix(finalColor, sepiaColor, u_sepiaSP);
}
if (u_bloomSP > 0.0) {
  vec3 bloom = max(finalColor - 0.4, 0.0);

  bloom += texture2D(u_skin, v_texCoord + vec2( 0.001,  0.001)).rgb;
  bloom += texture2D(u_skin, v_texCoord + vec2(-0.001,  0.001)).rgb;
  bloom += texture2D(u_skin, v_texCoord + vec2( 0.001, -0.001)).rgb;
  bloom += texture2D(u_skin, v_texCoord + vec2(-0.001, -0.001)).rgb;
  bloom *= 0.25;

  finalColor += bloom * u_bloomSP;
  finalColor = clamp(finalColor, 0.0, 1.0);
}

gl_FragColor.rgb = finalColor * u_tintColorSP.rgb;
float baseAlpha = finalAlpha;
if (baseAlpha > 0.0 && baseAlpha < 1.0) baseAlpha = mix(baseAlpha, 1.0, u_opaqueSP);
gl_FragColor.a = baseAlpha;`
        )
        .replaceAll(
          // The unpremultiply code will now always run due to palette replacement stuff.
          // This is a bit more inefficient, but whatever.
          "#if defined(ENABLE_color) || defined(ENABLE_brightness)",
          // i have no idea how webgl works, and i don"t want to have to remove the #endif somehow
          // just do something that will always be true -CST
          "#if defined(MAX_REPLACERS)"
        );
    }
    return ogCreateProgramInfo.apply(this, args);
  };
  const ogBuildShader = render._shaderManager._buildShader;
  render._shaderManager._buildShader = function (...args) {
    try {
      patchShaders = true;
      return ogBuildShader.apply(this, args);
    } finally {
      patchShaders = false;
    }
  };

  const MAX_REPLACERS = 15;
  // Clipping and Blending Support
  let toCorrectThing = null,
    active = false,
    flipY = false;
  const canvas = render.canvas;
  let width = 0,
    height = 0;
  let scratchUnitWidth = 480,
    scratchUnitHeight = 360;

  render._drawThese = function (drawables, drawMode, projection, opts = {}) {
    // Clipping and Blending Support
    active = true;
    [scratchUnitWidth, scratchUnitHeight] = render.getNativeSize();

    const gl = render._gl;
    let currentShader = null;

    const framebufferSpaceScaleDiffers =
      "framebufferWidth" in opts &&
      "framebufferHeight" in opts &&
      opts.framebufferWidth !== render._nativeSize[0] &&
      opts.framebufferHeight !== render._nativeSize[1];

    const numDrawables = drawables.length;
    for (let drawableIndex = 0; drawableIndex < numDrawables; ++drawableIndex) {
      const drawableID = drawables[drawableIndex];
      if (opts.filter && !opts.filter(drawableID)) continue;

      const drawable = render._allDrawables[drawableID];
      if (!drawable || (!drawable.getVisible() && !opts.ignoreVisibility))
        continue;

      const drawableScale = framebufferSpaceScaleDiffers
        ? [
            (drawable.scale[0] * opts.framebufferWidth) / render._nativeSize[0],
            (drawable.scale[1] * opts.framebufferHeight) /
              render._nativeSize[1],
          ]
        : drawable.scale;

      if (!drawable.skin || !drawable.skin.getTexture(drawableScale)) continue;
      if (opts.skipPrivateSkins && drawable.skin.private) continue;

      const uniforms = {};

      let effectBits = drawable.enabledEffects;
      effectBits &= Object.prototype.hasOwnProperty.call(opts, "effectMask")
        ? opts.effectMask
        : effectBits;
      const newShader = render._shaderManager.getShader(drawMode, effectBits);

      if (render._regionId !== newShader) {
        render._doExitDrawRegion();
        render._regionId = newShader;

        currentShader = newShader;
        gl.useProgram(currentShader.program);
        twgl.setBuffersAndAttributes(gl, currentShader, render._bufferInfo);
        Object.assign(uniforms, { u_projectionMatrix: projection });
      }

      /* handle new effects */
      initDrawable(drawable);
      const effectData = drawable[drawableKey];
      const replacers = effectData.replacers;

      const replaceFrom = new Float32Array(MAX_REPLACERS * 3).fill(0);
      const replaceTo = new Float32Array(MAX_REPLACERS * 4).fill(0);
      const replaceThresh = new Float32Array(MAX_REPLACERS).fill(1);
      if (replacers.length > 0) {
        for (let i = 0; i < Math.min(replacers.length, MAX_REPLACERS); i++) {
          replaceFrom.set(replacers[i].targetVert, i * 3);
          replaceTo.set(replacers[i].replaceVert, i * 4);
          replaceThresh[i] = replacers[i].soft;
        }
      }

      if (effectData.shouldMask) {
        gl.activeTexture(gl.TEXTURE30);
        gl.bindTexture(gl.TEXTURE_2D, effectData._maskTexture);
        gl.uniform1i(currentShader.uniformSetters["u_maskTextureSP"], 30);
        gl.activeTexture(gl.TEXTURE0);
      }

      const newUniformSetters = {
        u_replaceColorFromSP: { method: "uniform3fv", value: replaceFrom },
        u_replaceColorToSP: { method: "uniform4fv", value: replaceTo },
        u_replaceThresholdSP: { method: "uniform1fv", value: replaceThresh },
        u_numReplacersSP: {
          method: "uniform1i",
          value: replacers ? Math.min(replacers.length, MAX_REPLACERS) : 0,
        },
        u_tintColorSP: { method: "uniform4fv", value: effectData.tint },
        u_warpSP: { method: "uniform2fv", value: effectData.warp },
        u_shouldMaskSP: { method: "uniform1f", value: effectData.shouldMask },
        u_saturateSP: {
          method: "uniform1f",
          value: effectData.newEffects.saturation,
        },
        u_opaqueSP: {
          method: "uniform1f",
          value: effectData.newEffects.opaque,
        },
        u_contrastSP: {
          method: "uniform1f",
          value: effectData.newEffects.contrast,
        },
        u_posterizeSP: {
          method: "uniform1f",
          value: effectData.newEffects.posterize,
        },
        u_sepiaSP: { method: "uniform1f", value: effectData.newEffects.sepia },
        u_bloomSP: { method: "uniform1f", value: effectData.newEffects.bloom },
      };

      Object.entries(newUniformSetters).forEach(([key, { method, value }]) => {
        if (currentShader.uniformSetters[key])
          gl[method](currentShader.uniformSetters[key], value);
      });
      /* end of new effects */

      Object.assign(
        uniforms,
        drawable.skin.getUniforms(drawableScale),
        drawable.getUniforms()
      );
      if (opts.extraUniforms) Object.assign(uniforms, opts.extraUniforms);

      if (uniforms.u_skin) {
        twgl.setTextureParameters(gl, uniforms.u_skin, {
          minMag: drawable.skin.useNearest(drawableScale, drawable)
            ? gl.NEAREST
            : gl.LINEAR,
        });
      }

      twgl.setUniforms(currentShader, uniforms);
      twgl.drawBufferInfo(gl, render._bufferInfo, gl.TRIANGLES);
    }
    render._regionId = null;

    // Clipping and Blending Support
    gl.disable(gl.SCISSOR_TEST);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    active = false;
  };

  // reset on stop/start/clear
  const ogClearEffects = vm.exports.RenderedTarget.prototype.clearEffects;
  vm.exports.RenderedTarget.prototype.clearEffects = function () {
    const drawable = render._allDrawables[this.drawableID];
    drawable[drawableKey] = structuredClone(defaultNewEffects);
    ogClearEffects.call(this);
  };

  // manipulate bounds for warping
  const radianConverter = Math.PI / 180;
  function rotatePoint(x, y, cx, cy, rads) {
    const cos = Math.cos(rads),
      sin = Math.sin(rads);
    const dx = x - cx,
      dy = y - cy;
    return {
      x: cx + dx * cos - dy * sin,
      y: cy + dx * sin + dy * cos,
    };
  }
  function warpBounds(drawable, bounds) {
    if (!drawable[drawableKey]) return bounds;

    let warpVals = drawable[drawableKey].warp;
    if (warpVals.join(",") === defaultNewEffects.warp.join(",")) return bounds;

    // original getBounds already accounts for rotation, so we have to make our own system
    // for getting the non-rotated scale and position
    warpVals = warpVals.map((v, i) => (i > 0 && i < 5 ? v * -1 : v));
    const angle = (drawable._direction - 90) * radianConverter;
    const [x, y] = drawable._position;
    const width = drawable.skin.size[0] * (drawable.scale[0] / 200);
    const height = drawable.skin.size[1] * (drawable.scale[1] / 200);

    const points = [
      { x: warpVals[0] * 2 * -width + x, y: warpVals[1] * -2 * height - y },
      { x: warpVals[2] * 2 * width + x, y: warpVals[3] * -2 * height - y },
      { x: warpVals[4] * 2 * width + x, y: warpVals[5] * -2 * -height - y },
      { x: warpVals[6] * 2 * -width + x, y: warpVals[7] * -2 * -height - y },
    ];

    const rotatedPoints = points.map((p) =>
      rotatePoint(p.x, p.y, x, -y, angle)
    );
    const xs = rotatedPoints.map((p) => p.x);
    const ys = rotatedPoints.map((p) => p.y);

    bounds.left = Math.min(...xs);
    bounds.top = -Math.min(...ys);
    bounds.right = Math.max(...xs);
    bounds.bottom = -Math.max(...ys);
    return bounds;
  }

  const ogGetBounds = render.exports.Drawable.prototype.getBounds;
  render.exports.Drawable.prototype.getBounds = function () {
    return warpBounds(this, ogGetBounds.call(this));
  };
  const ogGetAABB = render.exports.Drawable.prototype.getAABB;
  render.exports.Drawable.prototype.getAABB = function () {
    return warpBounds(this, ogGetAABB.call(this));
  };

  // update the pen shader
  if (runtime.ext_pen && runtime.ext_pen._penSkinId > -1) {
    const penSkin = render._allSkins[runtime.ext_pen._penSkinId];
    const gl = render.gl;
    penSkin._lineShader = render._shaderManager.getShader("line", 0);
    penSkin._drawTextureShader = render._shaderManager.getShader("default", 0);
    penSkin.a_position_loc = gl.getAttribLocation(
      penSkin._lineShader.program,
      "a_position"
    );
    penSkin.a_lineColor_loc = gl.getAttribLocation(
      penSkin._lineShader.program,
      "a_lineColor"
    );
    penSkin.a_lineThicknessAndLength_loc = gl.getAttribLocation(
      penSkin._lineShader.program,
      "a_lineThicknessAndLength"
    );
    penSkin.a_penPoints_loc = gl.getAttribLocation(
      penSkin._lineShader.program,
      "a_penPoints"
    );
  }

  // Clipping and Blending Support
  if (vm.extensionManager._loadedExtensions.has("xeltallivclipblend")) {
    const gl = render._gl;
    /* compressed code from Clipping and Blending.js */
    const bfb = gl.bindFramebuffer;
    const ogGetUniforms = render.exports.Drawable.prototype.getUniforms;
    gl.bindFramebuffer = function (e, i) {
      if (e == gl.FRAMEBUFFER) {
        if (null == i)
          (toCorrectThing = !0),
            (flipY = !1),
            (width = canvas.width),
            (height = canvas.height);
        else if (render._penSkinId) {
          let f = render._allSkins[render._penSkinId]._framebuffer;
          i == f.framebuffer
            ? ((toCorrectThing = !0),
              (flipY = !0),
              (width = f.width),
              (height = f.height))
            : (toCorrectThing = !1);
        } else toCorrectThing = !1;
      }
      bfb.call(this, e, i);
    };
    // eslint-disable-next-line
    function setupModes(e, n, a) {
      if (e) {
        gl.enable(gl.SCISSOR_TEST);
        let E = ((e.x_min / scratchUnitWidth + 0.5) * width) | 0,
          S = ((e.y_min / scratchUnitHeight + 0.5) * height) | 0,
          N = ((e.x_max / scratchUnitWidth + 0.5) * width) | 0,
          l = (((e.y_max / scratchUnitHeight + 0.5) * height) | 0) - S;
        a && (S = ((-e.y_max / scratchUnitHeight + 0.5) * height) | 0),
          gl.scissor(E, S, N - E, l);
      } else gl.disable(gl.SCISSOR_TEST);
      switch (n) {
        case "additive":
          gl.blendEquation(gl.FUNC_ADD), gl.blendFunc(gl.ONE, gl.ONE);
          break;
        case "subtract":
          gl.blendEquation(gl.FUNC_REVERSE_SUBTRACT),
            gl.blendFunc(gl.ONE, gl.ONE);
          break;
        case "multiply":
          gl.blendEquation(gl.FUNC_ADD),
            gl.blendFunc(gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA);
          break;
        case "invert":
          gl.blendEquation(gl.FUNC_ADD),
            gl.blendFunc(gl.ONE_MINUS_DST_COLOR, gl.ONE_MINUS_SRC_COLOR);
          break;
        default:
          gl.blendEquation(gl.FUNC_ADD),
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      }
    }
    render.exports.Drawable.prototype.getUniforms = function () {
      return (
        active &&
          toCorrectThing &&
          setupModes(this.clipbox, this.blendMode, flipY),
        ogGetUniforms.call(this)
      );
    };
  }

  // this will allow clones to inherit parent effects
  const ogInitDrawable = vm.exports.RenderedTarget.prototype.initDrawable;
  vm.exports.RenderedTarget.prototype.initDrawable = function (layerGroup) {
    ogInitDrawable.call(this, layerGroup);
    if (this.isOriginal) return;

    const parentSprite = this.sprite.clones[0]; // clone[0] is always the original
    const parentDrawable = render._allDrawables[parentSprite.drawableID];
    if (!parentDrawable[drawableKey]) return;

    const drawable = render._allDrawables[this.drawableID];
    drawable[drawableKey] = structuredClone(parentDrawable[drawableKey]);
  };

  /* patch for "when costume switches" event */
  const ogSetCoreCostume = looksCore.constructor.prototype._setCostume;
  ogSetCoreCostume.constructor.prototype._setCostume = function (
    target,
    requestedCostume,
    optZeroIndex
  ) {
    ogSetCoreCostume.call(this, target, requestedCostume, optZeroIndex);
    runtime.startHats("SPlooksExpanded_whenCostumeSwitch", {
      COSTUME: target.getCurrentCostume()?.name || "",
    });
  };
  const ogSetSpriteCostume = vm.exports.RenderedTarget.prototype.setCostume;
  vm.exports.RenderedTarget.prototype.setCostume = function (index) {
    ogSetSpriteCostume.call(this, index);
    runtime.startHats("SPlooksExpanded_whenCostumeSwitch", {
      COSTUME: this.getCurrentCostume()?.name || "",
    });
  };

  class SPlooksExpanded {
    getInfo() {
      return {
        id: "SPlooksExpanded",
        name: Scratch.translate("Looks Expanded"),
        color1: "#9966FF",
        color2: "#855CD6",
        color3: "#774DCB",
        menuIconURI,
        blocks: [
          {
            opcode: "getSpeech",
            blockType: Scratch.BlockType.REPORTER,
            extensions: ["colours_looks"],
            text: Scratch.translate("speech from [TARGET]"),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          "---",
          {
            opcode: "costumeCnt",
            blockType: Scratch.BlockType.REPORTER,
            extensions: ["colours_looks"],
            text: Scratch.translate("# of costumes in [TARGET]"),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          {
            opcode: "costumeInfo",
            blockType: Scratch.BlockType.REPORTER,
            extensions: ["colours_looks"],
            text: Scratch.translate("[INFO] of costume # [NUM] in [TARGET]"),
            arguments: {
              INFO: { type: Scratch.ArgumentType.STRING, menu: "COSTUME_DATA" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          {
            opcode: "setTargetCostume",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_looks"],
            text: Scratch.translate("switch costume of [TARGET] to [VALUE]"),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: "..." },
            },
          },
          {
            opcode: "whenCostumeSwitch",
            blockType: Scratch.BlockType.EVENT,
            extensions: ["colours_event"],
            isEdgeActivated: false,
            text: Scratch.translate("when costume switches to [COSTUME]"),
            arguments: {
              COSTUME: { type: Scratch.ArgumentType.STRING, menu: "COSTUMES" },
            },
          },
          "---",
          {
            opcode: "setSpriteEffect",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_looks"],
            text: Scratch.translate("set [EFFECT] of [TARGET] to [VALUE]"),
            arguments: {
              EFFECT: {
                type: Scratch.ArgumentType.STRING,
                menu: "EFFECT_MENU",
              },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              VALUE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "effectValue",
            blockType: Scratch.BlockType.REPORTER,
            extensions: ["colours_looks"],
            text: Scratch.translate("[EFFECT] effect of [TARGET]"),
            arguments: {
              EFFECT: {
                type: Scratch.ArgumentType.STRING,
                menu: "EFFECT_MENU",
              },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          {
            opcode: "tintSprite",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_looks"],
            text: Scratch.translate("set tint of [TARGET] to [COLOR]"),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              COLOR: { type: Scratch.ArgumentType.COLOR },
            },
          },
          "---",
          {
            opcode: "replaceColor",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_looks"],
            text: Scratch.translate(
              "replace [COLOR1] with [COLOR2] in [TARGET] softness [VALUE]"
            ),
            arguments: {
              COLOR1: { type: Scratch.ArgumentType.COLOR },
              COLOR2: { type: Scratch.ArgumentType.COLOR },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              VALUE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
            },
          },
          {
            opcode: "resetColor",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_looks"],
            text: Scratch.translate("reset [COLOR1] replacer in [TARGET]"),
            arguments: {
              COLOR1: { type: Scratch.ArgumentType.COLOR },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          {
            opcode: "resetReplacers",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_looks"],
            text: Scratch.translate("reset color replacers in [TARGET]"),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: `<sep gap="24"/><label text="${Scratch.translate("Warping and Masking does NOT")}"/><sep gap="0"/>`,
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: `<sep gap="-12"/><label text=" ${Scratch.translate("affect Touching Blocks")}"/><sep gap="6"/>`,
          },
          {
            opcode: "warpSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "warp [TARGET] to x1: [x1] y1: [y1] x2: [x2] y2: [y2] x3: [x3] y3: [y3] x4: [x4] y4: [y4]"
            ),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              x1: { type: Scratch.ArgumentType.NUMBER, defaultValue: -100 },
              y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              x2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              x3: { type: Scratch.ArgumentType.NUMBER, defaultValue: -100 },
              y3: { type: Scratch.ArgumentType.NUMBER, defaultValue: -100 },
              x4: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              y4: { type: Scratch.ArgumentType.NUMBER, defaultValue: -100 },
            },
          },
          {
            opcode: "maskSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("mask [TARGET] with image [IMAGE]"),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              IMAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/dango.png",
              },
            },
          },
          "---",
          {
            opcode: "showSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("show [TARGET]"),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          {
            opcode: "hideSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("hide [TARGET]"),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
          {
            opcode: "spriteShowing",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("[TARGET] [TYPE] ?"),
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "DISPLAY_TYPES",
              },
            },
          },
          "---",
          {
            opcode: "spriteProperty",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[PROP] of [TARGET]"),
            arguments: {
              PROP: { type: Scratch.ArgumentType.STRING, menu: "SPRITE_PROPS" },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
            },
          },
        ],
        menus: {
          COSTUMES: { acceptReporters: false, items: "getCostumes" },
          TARGETS: { acceptReporters: true, items: "getTargets" },
          EFFECT_MENU: { acceptReporters: true, items: "getEffects" },
          DISPLAY_TYPES: {
            acceptReporters: false,
            items: [
              { text: Scratch.translate("showing"), value: "showing" },
              { text: Scratch.translate("visible"), value: "visible" },
            ],
          },
          COSTUME_DATA: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("name"), value: "name" },
              { text: Scratch.translate("type"), value: "type" },
              { text: Scratch.translate("width"), value: "width" },
              { text: Scratch.translate("height"), value: "height" },
              {
                text: Scratch.translate("rotation center x"),
                value: "rotation center x",
              },
              {
                text: Scratch.translate("rotation center y"),
                value: "rotation center y",
              },
              { text: Scratch.translate("content"), value: "content" },
              { text: Scratch.translate("data.uri"), value: "data.uri" },
            ],
          },
          SPRITE_PROPS: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("width"), value: "width" },
              { text: Scratch.translate("height"), value: "height" },
              { text: Scratch.translate("layer #"), value: "layer #" },
            ],
          },
        },
      };
    }

    // Helper Funcs
    getTargets() {
      const spriteNames = [
        { text: Scratch.translate("myself"), value: "_myself_" },
        { text: Scratch.translate("Stage"), value: "_stage_" },
      ];
      const targets = runtime.targets;
      for (let i = 1; i < targets.length; i++) {
        const target = targets[i];
        if (target.isOriginal)
          spriteNames.push({ text: target.getName(), value: target.getName() });
      }
      return spriteNames.length > 0 ? spriteNames : [""];
    }

    getCostumes() {
      let costumeNames = [];
      if (vm.editingTarget)
        costumeNames = vm.editingTarget.getCostumes().map((e) => {
          return e.name;
        });
      return costumeNames.length > 0 ? costumeNames : [""];
    }

    getEffects() {
      const effects = Object.keys(vm.editingTarget?.effects || {});
      if (!isPM) effects.push("saturation", "opaque");
      effects.push("contrast", "posterize", "sepia", "bloom");
      effects.map((effect) => {
        return { text: Scratch.translate(effect), value: effect };
      });
      return effects.length > 0 ? effects : [""];
    }

    getTarget(name, util) {
      if (name === "_myself_") return util.target;
      if (name === "_stage_") return runtime.getTargetForStage();
      return runtime.getSpriteTargetByName(name);
    }

    exportCostume(costume, keepBase64) {
      const asset = costume.asset;
      if (runtime.isPackaged) {
        const skin = render._allSkins[costume.skinId];
        let type = costume.dataFormat;
        if (type === "svg") {
          const svgText = decodeURIComponent(skin._svgImage.src.split(",")[1]);
          if (keepBase64) return `data:image/svg+xml;base64,${btoa(svgText)}`;
          else return svgText;
        } else {
          // always return base 64, theres literally no point
          const gl = render.gl;
          const width = skin.size[0] * 2;
          const height = skin.size[1] * 2;

          const fbo = twgl.createFramebufferInfo(
            gl,
            [{ attachment: skin._texture }],
            width,
            height
          );
          twgl.bindFramebufferInfo(gl, fbo);
          const pixels = new Uint8Array(width * height * 4);
          gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          const imageData = ctx.createImageData(width, height);
          imageData.data.set(pixels);
          ctx.putImageData(imageData, 0, 0);
          return canvas.toDataURL("image/png");
        }
      } else {
        if (keepBase64) return asset.encodeDataURI();
        else return asset.decodeText();
      }
    }

    hex2Vec4(hex) {
      hex = hex.startsWith("#") ? hex.slice(1) : hex;
      let a = 255;
      if (hex.length === 8) a = parseInt(hex.slice(6, 8), 16);
      return [
        parseInt(hex.slice(0, 2), 16) / 255,
        parseInt(hex.slice(2, 4), 16) / 255,
        parseInt(hex.slice(4, 6), 16) / 255,
        a / 255,
      ];
    }

    arrayMatches(arr1, arr2) {
      return arr1.every((val, i) => val === arr2[i]);
    }

    // Block Funcs
    getSpeech(args, util) {
      const target = this.getTarget(args.TARGET, util);
      if (!target) return "";
      return target._customState["Scratch.looks"]?.text || "";
    }

    costumeCnt(args, util) {
      const target = this.getTarget(args.TARGET, util);
      if (!target) return 0;
      return target.sprite.costumes.length;
    }

    costumeInfo(args, util) {
      const target = this.getTarget(args.TARGET, util);
      if (!target) return "";

      const costumes = target.getCostumes();
      const index = Cast.toNumber(args.NUM) - 1;
      const costume = costumes[index];
      if (!costume) return "";

      switch (args.INFO) {
        case "name":
          return costume.name;
        case "width":
          return costume.size[0];
        case "height":
          return costume.size[1];
        case "type":
          return costume.dataFormat;
        case "rotation center x":
          return costume.rotationCenterX;
        case "rotation center y":
          return costume.rotationCenterY;
        case "content":
          return this.exportCostume(costume, false);
        case "data.uri":
          return this.exportCostume(costume, true);
        default:
          return "";
      }
    }

    setTargetCostume(args, util) {
      const target = this.getTarget(args.TARGET, util);
      if (target) {
        if (target.isStage)
          runtime.ext_scratch3_looks._setBackdrop(target, args.VALUE);
        else runtime.ext_scratch3_looks._setCostume(target, args.VALUE);
      }
    }

    setSpriteEffect(args, util) {
      const target = this.getTarget(args.TARGET, util);
      if (target) {
        const name = Cast.toString(args.EFFECT);
        let value = Cast.toNumber(args.VALUE);
        if (name !== "posterize") value /= 100;
        if (
          name === "contrast" ||
          name === "posterize" ||
          name === "sepia" ||
          name === "bloom" ||
          (!isPM && (name === "saturation" || name === "opaque"))
        ) {
          const drawable = render._allDrawables[target.drawableID];
          initDrawable(drawable);
          const oldValue = drawable[drawableKey].newEffects[name];
          drawable[drawableKey].newEffects[name] = value;
          if (oldValue !== value) render.dirty = true;
        } else {
          target.setEffect(name, value);
        }
      }
    }

    effectValue(args, util) {
      const target = this.getTarget(args.TARGET, util);
      if (!target) return 0;

      const effects = target.effects;
      const name = Cast.toString(args.EFFECT);
      if (
        name === "contrast" ||
        name === "posterize" ||
        name === "sepia" ||
        name === "bloom" ||
        (!isPM && (name === "saturation" || name === "opaque"))
      ) {
        const drawable = render._allDrawables[target.drawableID];
        initDrawable(drawable);
        const value = drawable[drawableKey].newEffects[name];
        return name === "posterize" ? value : value * 100;
      }
      if (Object.prototype.hasOwnProperty.call(effects, name))
        return effects[name];
      return 0;
    }

    tintSprite(args, util) {
      const target = this.getTarget(args.TARGET, util);
      if (!target) return;

      const drawable = render._allDrawables[target.drawableID];
      initDrawable(drawable);
      const oldTint = drawable[drawableKey].tint;
      drawable[drawableKey].tint = this.hex2Vec4(args.COLOR);
      if (!this.arrayMatches(oldTint, drawable[drawableKey].tint))
        render.dirty = true;
    }

    replaceColor(args, util) {
      const target = this.getTarget(args.TARGET, util);
      if (!target) return;

      this.resetColor(args, util);
      const drawable = render._allDrawables[target.drawableID];
      initDrawable(drawable);
      drawable[drawableKey].replacers.push({
        targetHex: args.COLOR1,
        targetVert: this.hex2Vec4(args.COLOR1),
        replaceVert: this.hex2Vec4(args.COLOR2),
        soft: Math.max(Cast.toNumber(args.VALUE), 1) / 100,
      });
      render.dirty = true;
    }

    resetColor(args, util) {
      const target = this.getTarget(args.TARGET, util);
      if (!target) return;

      const drawable = render._allDrawables[target.drawableID];
      initDrawable(drawable);
      const index = drawable[drawableKey].replacers.findIndex((i) => {
        return i.targetHex === args.COLOR1;
      });
      if (index > -1) drawable[drawableKey].replacers.splice(index, 1);
      render.dirty = true;
    }

    resetReplacers(args, util) {
      const target = this.getTarget(args.TARGET, util);
      if (!target) return;

      const drawable = render._allDrawables[target.drawableID];
      initDrawable(drawable);
      if (drawable[drawableKey].replacers.length > 0) {
        drawable[drawableKey].replacers = [];
        render.dirty = true;
      }
    }

    warpSprite(args, util) {
      const target = this.getTarget(args.TARGET, util);
      if (!target) return;

      const drawable = render._allDrawables[target.drawableID];
      initDrawable(drawable);
      const oldWarp = drawable[drawableKey].warp;
      drawable[drawableKey].warp = [
        Cast.toNumber(args.x1) / -200,
        Cast.toNumber(args.y1) / -200,
        Cast.toNumber(args.x2) / -200,
        Cast.toNumber(args.y2) / -200,
        Cast.toNumber(args.x4) / -200,
        Cast.toNumber(args.y4) / -200,
        Cast.toNumber(args.x3) / -200,
        Cast.toNumber(args.y3) / -200,
      ];
      if (!this.arrayMatches(oldWarp, drawable[drawableKey].warp))
        render.dirty = true;
    }

    maskSprite(args, util) {
      const target = this.getTarget(args.TARGET, util);
      if (!target) return;

      const drawable = render._allDrawables[target.drawableID];
      initDrawable(drawable);

      const url = Cast.toString(args.IMAGE);
      if (drawable[drawableKey].oldMask === url) return;
      if (
        !url ||
        !(url.startsWith("data:image/") || url.startsWith("https://"))
      ) {
        drawable[drawableKey].maskTexture = "";
        drawable[drawableKey].oldMask = "";
        drawable[drawableKey].shouldMask = 0;
        render.dirty = true;
        return;
      }
      return new Promise((resolve) => {
        const gl = render._gl;
        if (!drawable[drawableKey]._maskTexture) {
          drawable[drawableKey]._maskTexture = gl.createTexture();
          gl.bindTexture(gl.TEXTURE_2D, drawable[drawableKey]._maskTexture);

          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }

        // eslint-disable-next-line
        const image = new Image();
        image.crossOrigin = "Anonymous";
        image.onload = () => {
          gl.bindTexture(gl.TEXTURE_2D, drawable[drawableKey]._maskTexture);
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            image
          );

          drawable[drawableKey].maskTexture =
            drawable[drawableKey]._maskTexture;
          drawable[drawableKey].shouldMask = 1;
          drawable[drawableKey].oldMask = url;
          render.dirty = true;
          resolve();
        };
        image.onerror = (e) => {
          console.warn(e);
          resolve();
        };
        image.src = url;
      });
    }

    showSprite(args, util) {
      const target = this.getTarget(args.TARGET, util);
      if (target) target.setVisible(true);
    }

    hideSprite(args, util) {
      const target = this.getTarget(args.TARGET, util);
      if (target) target.setVisible(false);
    }

    spriteShowing(args, util) {
      const target = this.getTarget(args.TARGET, util);
      if (!target || !target.visible) return false;
      if (args.TYPE === "showing") return true;
      else {
        // check if sprite is visible
        if (target.effects.ghost === 100) return false;

        // check if sprite is on-screen
        const bounds = target.getBounds();
        if (
          bounds.left > runtime.stageWidth / 2 ||
          bounds.right < runtime.stageWidth / -2
        )
          return false;
        if (
          bounds.bottom > runtime.stageHeight / 2 ||
          bounds.top < runtime.stageHeight / -2
        )
          return false;

        // check if sprite is being covered
        const layerInd = target.getLayerOrder() + 1;
        const rangeIds = new Array(render._allDrawables.length - layerInd);
        for (let i = 0; i < rangeIds.length; i++) {
          rangeIds[i] = layerInd + i;
        }
        return !render.isTouchingDrawables(target.drawableID, rangeIds);
      }
    }

    spriteProperty(args, util) {
      const target = this.getTarget(args.TARGET, util);
      switch (args.PROP) {
        case "width":
          return target.getBounds().width;
        case "height":
          return target.getBounds().height;
        case "layer #":
          return target.getLayerOrder();
        default:
          return "";
      }
    }
  }

  Scratch.extensions.register(new SPlooksExpanded());
})(Scratch);
