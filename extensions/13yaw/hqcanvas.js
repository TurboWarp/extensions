// Name: HQCanvas
// ID: 13hqcanvas
// Description: Useful HTML5 Canvas2d API Interface for Scratch
// By: 13yaw

(function (Scratch) {
    /*
     * HQCanvas by 13yaw (QQ 2334660277)
     * Useful HTML5 Canvas2d API Interface for Scratch
     *
     * License: MIT
     */
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("HQCanvas must be run unsandboxed");
  }

  const t = {
    b: Scratch.BlockType,
    a: Scratch.ArgumentType,
  };

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const renderer = runtime.renderer;

  const nsize = renderer._nativeSize;

  const MAX_CANVAS_COUNT = 64;

  const num = (x) => {
    const n = parseFloat(x);
    return n ? n : 0;
  };

  const label = (text) => ({ blockType: "label", text });

  const block = (opcode, blockType, text, args) => {
    return { opcode, blockType, text, arguments: args };
  };

  const blarg = (type, defaultValue) => {
    defaultValue = defaultValue ?? "";
    return { type, defaultValue };
  };

  const canvas = (w, h) => {
    const cvs = document.createElement("canvas");
    cvs.width = w;
    cvs.height = h;
    return cvs;
  };

  class HQCanvas {
    constructor() {
      this.clear_color = "#ffffff00";
      this.canvas = {};
      this.canvas_count = 0;
      this.initCanvas({ n: 4 });
      this.switchCanvas({ n: 0 });
      this.stage = canvas(renderer.canvas.width, renderer.canvas.height);
      this.stage.style.position = "absolute";
      this.stage.style.left =
        this.stage.style.right =
        this.stage.style.top =
        this.stage.style.bottom =
          "0";
      renderer.canvas.parentElement.appendChild(this.stage);
      this.resize_observer = new ResizeObserver(() => {
        console.log("HQCanvas: Canvas Resized");
        this.onRendererCanvasResized(
          renderer.canvas.width,
          renderer.canvas.height
        );
      });
      this.resize_observer.observe(renderer.canvas);
      this.image_cache = {};
    }

    switchCanvas({ n }) {
      this.cctx = this.canvas[n].ctx;
      this.cel = this.canvas[n].el;
      if (!this.canvas[n].inited) {
        this.resetTransform();
      }
    }

    initCanvas({ n }) {
      for (let i = 0; i < n; ++i) {
        if (!this.canvas[i]) {
          if (this.canvas_count >= MAX_CANVAS_COUNT) continue;
          this.canvas_count += 1;

          const el = canvas(
            renderer.canvas.offsetWidth,
            renderer.canvas.offsetHeight
          );
          const ctx = el.getContext("2d");
          this.canvas[i] = { el, ctx, inited: false };
        }
      }
    }

    onRendererCanvasResized(w, h) {
      for (const k in this.canvas) {
        this.canvas[k].el.width = w;
        this.canvas[k].el.height = h;
        this.canvas[k].ctx = this.canvas[k].el.getContext("2d");
        this.canvas[k].inited = false;
      }
      this.stage.width = w;
      this.stage.height = h;
    }

    returnPI() {
      return Math.PI;
    }

    n2c(n) {
      return [
        (n[0] / nsize[0]) * this.cel.width,
        (n[1] / nsize[1]) * this.cel.height,
      ];
    }

    loadImageAsWait({ uri, n }) {
      if (this.image_cache[n.toString()]) return;
      return new Promise((resolve, reject) => {
        Scratch.canFetch(uri).then((ok) => {
          if (!ok) throw new Error("unable to access to `" + uri + "`");
          // eslint-disable-next-line no-restricted-syntax
          const imageEl = new Image();
          imageEl.src = uri;
          imageEl.onload = () => {
            this.image_cache[n.toString()] = imageEl;
            resolve();
          };
          imageEl.onerror = reject;
        });
      }).catch(console.error);
    }

    loadImageAs({ uri, n }) {
      if (this.image_cache[n.toString()]) return;
      Scratch.canFetch(uri)
        .then((ok) => {
          if (!ok) throw new Error("unable to access to `" + uri + "`");
          // eslint-disable-next-line no-restricted-syntax
          const imageEl = new Image();
          imageEl.src = uri;
          imageEl.onload = () => {
            this.image_cache[n.toString()] = imageEl;
          };
          imageEl.onerror = console.error;
        })
        .catch(console.error);
    }

    drawImage({ n, x, y }) {
      const idx = parseInt(n);
      let image;
      if (isNaN(idx)) {
        image = this.image_cache[n.toString()];
      } else {
        image = this.canvas[idx]?.el;
      }
      image && this.cctx.drawImage(image, x, y);
    }

    drawImageClip({ n, sx, sy, sw, sh, x, y, w, h }) {
      const idx = parseInt(n);
      let image;
      if (isNaN(idx)) {
        image = this.image_cache[n.toString()];
      } else {
        image = this.canvas[idx]?.el;
      }
      image && this.cctx.drawImage(image, sx, sy, sw, sh, x, y, w, h);
    }

    applyToRenderer() {
      const ctx = this.stage.getContext("2d");
      ctx.clearRect(0, 0, this.stage.width, this.stage.height);
      ctx.drawImage(this.cel, 0, 0);
    }

    debugGetRealCanvasSize() {
      return "[" + this.stage.width + ", " + this.stage.height + "]";
    }

    beginPath() {
      this.cctx.beginPath();
    }

    closePath() {
      this.cctx.closePath();
    }

    moveTo({ x, y }) {
      this.cctx.moveTo(x, y);
    }

    lineTo({ x, y }) {
      this.cctx.lineTo(x, y);
    }

    rectPath({ x, y, w, h }) {
      this.cctx.rect(x, y, w, h);
    }

    roundRectPath({ x, y, w, h, r }) {
      this.cctx.roundRect(x, y, w, h, r);
    }

    ellipsePath({ x, y, rx, ry, r, a, b }) {
      this.cctx.ellipse(x, y, rx, ry, r, a, b);
    }

    arcPath({ x, y, r, a, b }) {
      this.cctx.arc(x, y, r, a, b);
    }

    arcToPath({ x1, y1, x2, y2, r }) {
      this.cctx.arcTo(x1, y1, x2, y2, r);
    }

    bezierCurveToPath({ cx1, cy1, cx2, cy2, x, y }) {
      this.cctx.bezierCurveTo(cx1, cy1, cx2, cy2, x, y);
    }

    setClearColor({ c }) {
      this.clear_color = c;
    }

    clearRect({ x, y, w, h }) {
      this.cctx.save();
      this.cctx.fillStyle = this.clear_color;
      this.cctx.clearRect(x, y, w, h);
      this.cctx.fillRect(x, y, w, h);
      this.cctx.restore();
    }

    save() {
      this.cctx.save();
    }

    restore() {
      this.cctx.restore();
    }

    clip() {
      this.cctx.clip();
    }

    transform({ a, b, c, d, e, f }) {
      this.cctx.transform(a, b, c, d, e, f);
    }

    rotate({ n }) {
      this.cctx.rotate(n);
    }

    scale({ x, y }) {
      this.cctx.scale(x, y);
    }

    translate({ x, y }) {
      this.cctx.translate(x, y);
    }

    resetTransform() {
      this.cctx.resetTransform();
      this.cctx.scale(...this.n2c([1, 1]));
    }

    setLineDash({ d }) {
      this.cctx.setLineDash(d.split(" ").map(num));
    }

    setFillStyle({ c }) {
      this.cctx.fillStyle = c;
    }

    setStrokeStyle({ c }) {
      this.cctx.strokeStyle = c;
    }

    setLineWidth({ n }) {
      this.cctx.lineWidth = n;
    }

    setLineCap({ n }) {
      this.cctx.lineCap = n;
    }

    setGlobalAlpha({ a }) {
      this.cctx.globalAlpha = a;
    }

    setFont({ f }) {
      this.cctx.font = f;
    }

    fillText({ t, x, y }) {
      this.cctx.fillText(t, x, y);
    }

    strokeText({ t, x, y }) {
      this.cctx.strokeText(t, x, y);
    }

    measureTextWidth({ t }) {
      return this.cctx.measureText(t).width;
    }

    fill() {
      this.cctx.fill();
    }

    stroke() {
      this.cctx.stroke();
    }

    getInfo() {
      return {
        id: "13hqcanvas",
        name: "HQCanvas",
        color1: "#0fbd8c",
        color2: "#0ab887",
        blocks: [
          ...this.constBlocks(),
          label("Basic Blocks"),
          ...this.basicBlocks(),
          label("Path Blocks"),
          ...this.pathBlocks(),
          label("Transform Blocks"),
          ...this.transformBlocks(),
          label("Attributes"),
          ...this.attrBlocks(),
          label("⚠️ Debug Blocks"),
          ...this.debugBlocks(),
        ],
      };
    }

    transformBlocks() {
      return [
        block("resetTransform", t.b.COMMAND, "ResetTransform()", {}),
        block(
          "transform",
          t.b.COMMAND,
          "Transform([a], [b], [c], [d], [e], [f])",
          {
            a: blarg(t.a.NUMBER, 1),
            b: blarg(t.a.NUMBER, 0),
            c: blarg(t.a.NUMBER, 0),
            d: blarg(t.a.NUMBER, 1),
            e: blarg(t.a.NUMBER, 0),
            f: blarg(t.a.NUMBER, 0),
          }
        ),
        block("translate", t.b.COMMAND, "Translate([x], [y])", {
          x: blarg(t.a.NUMBER, 0),
          y: blarg(t.a.NUMBER, 0),
        }),
        block("rotate", t.b.COMMAND, "Rotate([n])", {
          n: blarg(t.a.NUMBER, 3.142),
        }),
        block("scale", t.b.COMMAND, "Scale([x], [y])", {
          x: blarg(t.a.NUMBER, 1),
          y: blarg(t.a.NUMBER, 1),
        }),
      ];
    }

    pathBlocks() {
      return [
        block("clip", t.b.COMMAND, "Clip()", {}),
        "---",
        block("beginPath", t.b.COMMAND, "BeginPath()", {}),
        block("closePath", t.b.COMMAND, "ClosePath()", {}),
        block("moveTo", t.b.COMMAND, "MoveTo([x], [y])", {
          x: blarg(t.a.NUMBER, 0),
          y: blarg(t.a.NUMBER, 0),
        }),
        block("lineTo", t.b.COMMAND, "LineTo([x], [y])", {
          x: blarg(t.a.NUMBER, 0),
          y: blarg(t.a.NUMBER, 0),
        }),
        "---",
        block("rectPath", t.b.COMMAND, "Rect([x], [y], [w], [h])", {
          x: blarg(t.a.NUMBER, 0),
          y: blarg(t.a.NUMBER, 0),
          w: blarg(t.a.NUMBER, 100),
          h: blarg(t.a.NUMBER, 100),
        }),
        block("arcPath", t.b.COMMAND, "Arc([x], [y], [r], [a], [b])", {
          x: blarg(t.a.NUMBER, 100),
          y: blarg(t.a.NUMBER, 100),
          r: blarg(t.a.NUMBER, 80),
          a: blarg(t.a.NUMBER, 0),
          b: blarg(t.a.NUMBER, 6.283),
        }),
        block("arcToPath", t.b.COMMAND, "ArcTo([x1], [y1], [x2], [y2], [r])", {
          x1: blarg(t.a.NUMBER, 100),
          y1: blarg(t.a.NUMBER, 100),
          x2: blarg(t.a.NUMBER, 0),
          y2: blarg(t.a.NUMBER, 100),
          r: blarg(t.a.NUMBER, 10),
        }),
        block(
          "ellipsePath",
          t.b.COMMAND,
          "Ellipse([x], [y], [rx], [ry], [r], [a], [b])",
          {
            x: blarg(t.a.NUMBER, 100),
            y: blarg(t.a.NUMBER, 100),
            rx: blarg(t.a.NUMBER, 80),
            ry: blarg(t.a.NUMBER, 40),
            r: blarg(t.a.NUMBER, 0),
            a: blarg(t.a.NUMBER, 0),
            b: blarg(t.a.NUMBER, 6.283),
          }
        ),
        block(
          "roundRectPath",
          t.b.COMMAND,
          "RoundRect([x], [y], [w], [h], [r])",
          {
            x: blarg(t.a.NUMBER, 100),
            y: blarg(t.a.NUMBER, 100),
            w: blarg(t.a.NUMBER, 100),
            h: blarg(t.a.NUMBER, 100),
            r: blarg(t.a.NUMBER, 10),
          }
        ),
        block(
          "bezierCurveToPath",
          t.b.COMMAND,
          "BezierCurveTo([cx1], [cy1], [cx2], [cy2], [x], [y])",
          {
            cx1: blarg(t.a.NUMBER, 100),
            cy1: blarg(t.a.NUMBER, 100),
            cx2: blarg(t.a.NUMBER, 0),
            cy2: blarg(t.a.NUMBER, 100),
            x: blarg(t.a.NUMBER, 100),
            y: blarg(t.a.NUMBER, 0),
          }
        ),
      ];
    }

    basicBlocks() {
      return [
        block("initCanvas", t.b.COMMAND, "InitCanvas([n])", {
          n: blarg(t.a.NUMBER, 4),
        }),
        block("switchCanvas", t.b.COMMAND, "SwitchCanvas([n])", {
          n: blarg(t.a.NUMBER, 0),
        }),
        block("applyToRenderer", t.b.COMMAND, "ApplyToStage()", {}),
        "---",
        block("setClearColor", t.b.COMMAND, "GlobalSetClearColor([c])", {
          c: blarg(t.a.STRING, "#ffffff"),
        }),
        block("clearRect", t.b.COMMAND, "ClearRect([x], [y], [w], [h])", {
          x: blarg(t.a.NUMBER, 0),
          y: blarg(t.a.NUMBER, 0),
          w: blarg(t.a.NUMBER, 100),
          h: blarg(t.a.NUMBER, 100),
        }),
        "---",
        block("applyToRenderer", t.b.COMMAND, "ApplyToStage()", {}),
        "---",
        block("fill", t.b.COMMAND, "Fill()", {}),
        block("stroke", t.b.COMMAND, "Stroke()", {}),
        "---",
        block("save", t.b.COMMAND, "Save()", {}),
        block("restore", t.b.COMMAND, "Restore()", {}),
        "---",
        block("measureTextWidth", t.b.REPORTER, "MeasureTextWidth([t])", {
          t: blarg(t.a.STRING, "Hello, World"),
        }),
        block("fillText", t.b.COMMAND, "FillText([t], [x], [y])", {
          t: blarg(t.a.STRING, "Hello, World"),
          x: blarg(t.a.NUMBER, 0),
          y: blarg(t.a.NUMBER, 100),
        }),
        block("strokeText", t.b.COMMAND, "StrokeText([t], [x], [y])", {
          t: blarg(t.a.STRING, "Hello, World"),
          x: blarg(t.a.NUMBER, 0),
          y: blarg(t.a.NUMBER, 100),
        }),
        "---",
        block("loadImageAsWait", t.b.COMMAND, "LoadImageAndWait([uri], [n])", {
          uri: blarg(t.a.STRING, "https://extensions.turbowarp.org/dango.png"),
          n: blarg(t.a.STRING, "my image"),
        }),
        block("loadImageAs", t.b.COMMAND, "LoadImage([uri], [n])", {
          uri: blarg(t.a.STRING, "https://extensions.turbowarp.org/dango.png"),
          n: blarg(t.a.STRING, "my image"),
        }),
        block("drawImage", t.b.COMMAND, "TryDrawImage([n], [x], [y])", {
          n: blarg(t.a.STRING, "my image"),
          x: blarg(t.a.NUMBER, 0),
          y: blarg(t.a.NUMBER, 0),
        }),
        block(
          "drawImageClip",
          t.b.COMMAND,
          "TryDrawImageAndClip([n], [sx], [sy], [sw], [sh], [x], [y], [w], [h])",
          {
            n: blarg(t.a.STRING, "my image"),
            sx: blarg(t.a.NUMBER, 0),
            sy: blarg(t.a.NUMBER, 0),
            sw: blarg(t.a.NUMBER, 20),
            sh: blarg(t.a.NUMBER, 20),
            x: blarg(t.a.NUMBER, 0),
            y: blarg(t.a.NUMBER, 0),
            w: blarg(t.a.NUMBER, 40),
            h: blarg(t.a.NUMBER, 40),
          }
        ),
      ];
    }

    attrBlocks() {
      return [
        block("setFillStyle", t.b.COMMAND, "SetFillStyle([c])", {
          c: blarg(t.a.STRING, "#000000"),
        }),
        block("setStrokeStyle", t.b.COMMAND, "SetStrokeStyle([c])", {
          c: blarg(t.a.STRING, "#000000"),
        }),
        block("setLineWidth", t.b.COMMAND, "SetLineWidth([n])", {
          n: blarg(t.a.NUMBER, 10),
        }),
        block("setLineCap", t.b.COMMAND, "SetLineCap([n])", {
          n: blarg(t.a.STRING, "round"),
        }),
        block("setLineDash", t.b.COMMAND, "SetLineDash([d])", {
          d: blarg(t.a.STRING, "12 3 3"),
        }),
        block("setGlobalAlpha", t.b.COMMAND, "SetGlobalAlpha([a])", {
          a: blarg(t.a.NUMBER, 1.0),
        }),
        block("setFont", t.b.COMMAND, "SetFont([f])", {
          f: blarg(t.a.STRING, "14px Consolas"),
        }),
      ];
    }

    constBlocks() {
      return [block("returnPI", t.b.REPORTER, "PI", {})];
    }

    debugBlocks() {
      return [
        block("debugGetRealCanvasSize", t.b.REPORTER, "RealCanvasSize", {}),
      ];
    }
  }

  // @ts-ignore
  Scratch.extensions.register(new HQCanvas());
})(Scratch);
