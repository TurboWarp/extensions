/* !format */
// Name: Background Crop (背景提取)
// ID: backgroundcrop
// Description: Extract a region of the stage background and show it as a floating panel with effects: liquid glass refraction, blur, and rounded corners. Liquid glass and blur can be enabled at the same time.
// By: 田柠檬
// License: MIT

(function (Scratch) {
  "use strict";

  // 必须非沙盒运行（要访问 vm.renderer 内部 API）
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Background Crop extension must run unsandboxed");
  }

  const vm = Scratch.vm;
  const Cast = Scratch.Cast;

  class BackgroundCropExt {
    constructor() {
      // 叠加层画布（显示给用户看的那一层）
      this.overlayCanvas = null;
      this.overlayCtx = null;
      // 特效中间层（在它上面做像素运算）
      this.tmpCanvas = document.createElement("canvas");
      this.tmpCtx = this.tmpCanvas.getContext("2d");
      // 归一化的舞台底图（480×360），每次截图更新
      this.refCanvas = document.createElement("canvas");
      this.refCanvas.width = 480;
      this.refCanvas.height = 360;
      this.refCtx = this.refCanvas.getContext("2d");
      // 当前提取区域（Scratch 舞台坐标，中心 0,0）
      this.crop = { minX: 0, minY: 0, maxX: 0, maxY: 0, w: 0, h: 0 };
      // 特效状态：liquidOn 和 blurOn 是独立开关，可同时开启
      this.liquidOn = false;
      this.blurOn = false;
      this.radius = 12; // 圆角强度
      this.liquidStrength = 5; // 液态(折射)强度
      this.blurStrength = 6; // 模糊强度
      this.shape = "round"; // 提取形状：round(圆角矩形) / circle(正圆形透镜)
      // 固定噪声种子：保证液态折射"不动"
      this.liquidSeed = 13731;
      // 幂等状态：已截图区域、有效快照标志、快照序号（用于丢弃过期快照）
      this.lastKey = null;
      this.ready = false;
      this.snapshotId = 0;
      // 软清除标志：清除提取后保持画面透明，防止参数改动让画面"复活"
      this.cleared = false;
      // 实时更新循环
      this.loopTimer = null; // 更新循环句柄
      this.pending = false; // 是否有快照请求进行中（防止回调堆积）
      this.refreshInterval = 100; // 更新间隔（毫秒）：时时跟随舞台画面
    }

    getInfo() {
      return {
        id: "backgroundcrop",
        name: Scratch.translate("Background Crop"),
        color1: "#4285F4",
        color2: "#2962FF",
        blocks: [
          {
            opcode: "getBackgroundRegion",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "get background from x: [X1] y: [Y1] to x: [X2] y: [Y2]",
            ),
            arguments: {
              X1: { type: Scratch.ArgumentType.NUMBER, defaultValue: -100 },
              Y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: -100 },
              X2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              Y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          {
            opcode: "clearCrop",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("clear extraction"),
          },
          "---",
          {
            opcode: "setEffectMode",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("apply effect [EFFECT] to extracted area"),
            arguments: {
              EFFECT: {
                type: Scratch.ArgumentType.STRING,
                menu: "EFFECT_MENU",
                defaultValue: "default",
              },
            },
          },
          {
            opcode: "setLiquidEnabled",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set liquid glass distortion to [ON]"),
            arguments: {
              ON: {
                type: Scratch.ArgumentType.STRING,
                menu: "ON_MENU",
                defaultValue: "on",
              },
            },
          },
          {
            opcode: "setBlurEnabled",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set blur to [ON]"),
            arguments: {
              ON: {
                type: Scratch.ArgumentType.STRING,
                menu: "ON_MENU",
                defaultValue: "on",
              },
            },
          },
          {
            opcode: "clearEffects",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("clear all effects"),
          },
          {
            opcode: "setShape",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set extraction shape to [SHAPE]"),
            arguments: {
              SHAPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "SHAPE_MENU",
                defaultValue: "round",
              },
            },
          },
          "---",
          {
            opcode: "setRadius",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set corner radius to [R]"),
            arguments: {
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 12 },
            },
          },
          {
            opcode: "setLiquidStrength",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set liquid distortion strength to [S]"),
            arguments: {
              S: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
            },
          },
          {
            opcode: "setBlurStrength",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set blur strength to [S]"),
            arguments: {
              S: { type: Scratch.ArgumentType.NUMBER, defaultValue: 6 },
            },
          },
          {
            opcode: "setEffectStrength",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set effect strength to [S]"),
            arguments: {
              S: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
            },
          },
        ],
        menus: {
          EFFECT_MENU: {
            acceptReporters: false,
            items: [
              { text: Scratch.translate("default"), value: "default" },
              {
                text: Scratch.translate("liquid glass distortion"),
                value: "liquid",
              },
              { text: Scratch.translate("blur"), value: "blur" },
              { text: Scratch.translate("off"), value: "none" },
            ],
          },
          ON_MENU: {
            acceptReporters: false,
            items: [
              { text: Scratch.translate("on"), value: "on" },
              { text: Scratch.translate("off"), value: "off" },
            ],
          },
          SHAPE_MENU: {
            acceptReporters: false,
            items: [
              { text: Scratch.translate("rounded rectangle"), value: "round" },
              { text: Scratch.translate("square"), value: "square" },
              { text: Scratch.translate("circle"), value: "circle" },
            ],
          },
        },
      };
    }

    // 圆角矩形 SDF：返回像素(x,y)到圆角矩形边界的有符号距离（负=内部）
    _roundRectSDF(x, y, w, h, r) {
      const cx = (w - 1) / 2;
      const cy = (h - 1) / 2;
      const hw = w / 2 - r;
      const hh = h / 2 - r;
      const qx = Math.abs(x - cx) - hw;
      const qy = Math.abs(y - cy) - hh;
      const ax = Math.max(qx, 0);
      const ay = Math.max(qy, 0);
      return Math.sqrt(ax * ax + ay * ay) + Math.min(Math.max(qx, qy), 0) - r;
    }

    // 圆形 SDF：正圆透镜，取短边一半为半径（负=内部）
    _circleSDF(x, y, w, h) {
      const cx = (w - 1) / 2;
      const cy = (h - 1) / 2;
      const r = Math.min(w, h) / 2 - 1;
      return Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy)) - r;
    }

    // 像素级形状遮罩：把形状外像素 alpha 清零（所有模式下圆角/圆形必然生效）
    _applyShapeMask(data, w, h, shape, radius) {
      const r = Math.max(0, Math.min(radius, w / 2, h / 2));
      const px = data.data;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const dist =
            shape === "circle"
              ? this._circleSDF(x, y, w, h)
              : this._roundRectSDF(x, y, w, h, r);
          if (dist > 0) {
            // 形状外：完全透明
            px[(y * w + x) * 4 + 3] = 0;
          } else if (dist > -1) {
            // 边缘 1px 抗锯齿过渡
            px[(y * w + x) * 4 + 3] *= 1 + dist;
          }
        }
      }
    }

    // 液态玻璃折射（静止）：
    // 1) 内容轻微放大（透过玻璃的折射感）
    // 2) 边缘波纹弯曲（液态玻璃边缘起伏）
    // 3) 噪声只依赖坐标，不含时间 → 完全不动
    _glassRefract(src, w, h) {
      const out = new ImageData(w, h);
      const s = src.data;
      const d = out.data;
      const amp = Math.max(0, this.liquidStrength);
      const seed = this.liquidSeed;
      const cx = (w - 1) / 2;
      const cy = (h - 1) / 2;
      const maxDist = Math.sqrt(cx * cx + cy * cy) || 1;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const vx = x - cx;
          const vy = y - cy;
          const dist = Math.sqrt(vx * vx + vy * vy);
          const nd = dist / maxDist; // 0=中心，1=角

          // 1) 折射放大：采样点向外扩张，内容看起来被玻璃轻微放大
          const zoom = 0.02 + amp * 0.003;
          let sx = cx + vx * (1 + zoom);
          let sy = cy + vy * (1 + zoom);

          // 2) 边缘波纹扭曲：越靠边缘波动越强
          const edgeWgt = Math.pow(Math.min(1, nd), 1.5);
          const wave =
            Math.sin(x * 0.13 + seed * 0.7) * Math.cos(y * 0.11 + seed * 0.3) +
            Math.cos(x * 0.09 + seed) * Math.sin(y * 0.15);
          sx += Math.cos(wave * 4) * amp * edgeWgt;
          sy += Math.sin(wave * 4) * amp * edgeWgt;

          const px = Math.max(0, Math.min(w - 1, Math.round(sx)));
          const py = Math.max(0, Math.min(h - 1, Math.round(sy)));
          const is = (py * w + px) * 4;
          const id = (y * w + x) * 4;
          d[id] = s[is];
          d[id + 1] = s[is + 1];
          d[id + 2] = s[is + 2];
          d[id + 3] = s[is + 3];
        }
      }
      return out;
    }

    // 玻璃边缘高光：在形状边界内侧叠加白色反光带，模拟玻璃厚度反光
    _applyGlassHighlight(data, w, h, shape, radius, strength) {
      const r = Math.max(0, Math.min(radius, w / 2, h / 2));
      const px = data.data;
      const hlWidth = 3; // 高光带宽度（像素）
      const bright = 0.4 * Math.min(1, 0.5 + strength / 5);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const dist =
            shape === "circle"
              ? this._circleSDF(x, y, w, h)
              : this._roundRectSDF(x, y, w, h, r);
          if (dist > -hlWidth && dist < 0) {
            const t = 1 + dist / hlWidth; // 边缘1 → 内部0
            const a = t * bright;
            const id = (y * w + x) * 4;
            px[id] = px[id] + (255 - px[id]) * a;
            px[id + 1] = px[id + 1] + (255 - px[id + 1]) * a;
            px[id + 2] = px[id + 2] + (255 - px[id + 2]) * a;
          }
        }
      }
    }

    // 手动像素模糊（box blur，不依赖画布滤镜，必然生效）
    _boxBlur(src, w, h, radius) {
      const r = Math.max(1, Math.round(radius));
      const s = src.data;
      const out = new ImageData(w, h);
      const d = out.data;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          let rSum = 0,
            gSum = 0,
            bSum = 0,
            aSum = 0,
            count = 0;
          const y0 = Math.max(0, y - r),
            y1 = Math.min(h - 1, y + r);
          const x0 = Math.max(0, x - r),
            x1 = Math.min(w - 1, x + r);
          for (let py = y0; py <= y1; py++) {
            const row = py * w;
            for (let px = x0; px <= x1; px++) {
              const i = (row + px) * 4;
              rSum += s[i];
              gSum += s[i + 1];
              bSum += s[i + 2];
              aSum += s[i + 3];
              count++;
            }
          }
          if (count === 0) continue;
          const id = (y * w + x) * 4;
          d[id] = rSum / count;
          d[id + 1] = gSum / count;
          d[id + 2] = bSum / count;
          d[id + 3] = aSum / count;
        }
      }
      return out;
    }

    // 确保叠加层容器已挂到舞台 DOM（若渲染器未自动挂载）
    _ensureOverlayContainer() {
      const container = vm.renderer.overlayContainer;
      if (container && !container.parentNode && vm.renderer.canvas) {
        vm.renderer.canvas.parentNode.appendChild(container);
      }
      return container;
    }

    // 获取背景区域：启动实时更新循环，画面持续跟随舞台内容刷新（同一画布无缝替换，不抽搐）
    getBackgroundRegion(args) {
      return new Promise((resolve, reject) => {
        try {
          const X1 = Cast.toNumber(args.X1);
          const Y1 = Cast.toNumber(args.Y1);
          const X2 = Cast.toNumber(args.X2);
          const Y2 = Cast.toNumber(args.Y2);

          const minX = Math.min(X1, X2);
          const maxX = Math.max(X1, X2);
          const minY = Math.min(Y1, Y2);
          const maxY = Math.max(Y1, Y2);
          const w = maxX - minX;
          const h = maxY - minY;
          if (w <= 2 || h <= 2) {
            reject(new Error("Region too small"));
            return;
          }

          this.crop = { minX, minY, maxX, maxY, w, h };
          this.cleared = false; // 解除清除状态

          // 创建叠加层画布并加入渲染器（scale 模式 = 舞台坐标，自动缩放）
          if (!this.overlayCanvas) {
            this.overlayCanvas = document.createElement("canvas");
            this.overlayCtx = this.overlayCanvas.getContext("2d");
            this.overlayCanvas.style.position = "absolute";
            this._ensureOverlayContainer();
            vm.renderer.addOverlay(this.overlayCanvas, "scale");
          }
          // 舞台坐标 → 叠加层内部像素（左上原点）
          this.overlayCanvas.style.left = minX + 240 + "px";
          this.overlayCanvas.style.top = 180 - maxY + "px";
          this.overlayCanvas.width = w;
          this.overlayCanvas.height = h;
          this.tmpCanvas.width = w;
          this.tmpCanvas.height = h;

          // 启动实时更新循环（同一画布实例无缝刷新，不重建、不闪烁）
          this._startUpdateLoop();
          // 立即请求一次快照尽快显示；无论成功失败都 resolve，不卡线程
          this._requestSnapshotOnce(resolve);
        } catch (e) {
          reject(e);
        }
      });
    }

    // 启动实时更新循环：每隔 refreshInterval 毫秒抓一次最新舞台画面
    _startUpdateLoop() {
      if (this.loopTimer) return;
      const loop = () => {
        if (this.cleared || !this.overlayCanvas) {
          this._stopUpdateLoop();
          return;
        }
        this._requestSnapshotOnce();
      };
      this.loopTimer = setInterval(loop, this.refreshInterval);
    }

    _stopUpdateLoop() {
      if (this.loopTimer) {
        clearInterval(this.loopTimer);
        this.loopTimer = null;
      }
    }

    // 请求一次快照：同一时刻只允许一个进行中，防止回调堆积
    // 完成后用最新快照覆盖底图并重绘；旧画面保留到新画面就绪才替换，无缝不闪烁
    _requestSnapshotOnce(done) {
      if (this.pending) {
        if (done) done();
        return;
      }
      this.pending = true;
      const id = ++this.snapshotId;
      vm.renderer.requestSnapshot((dataURL) => {
        // 加载的是本地 dataURL（非网络请求），无需 Scratch.canFetch
        // eslint-disable-next-line extension/check-can-fetch
        const img = new Image();
        img.onload = () => {
          this.pending = false;
          if (id !== this.snapshotId) {
            // 过期快照：不更新画面，但释放等待，防止脚本卡住
            if (done) done();
            return;
          }
          this.refCtx.clearRect(0, 0, 480, 360);
          this.refCtx.drawImage(img, 0, 0, 480, 360);
          this.ready = true;
          this._render();
          if (done) done();
        };
        img.onerror = () => {
          this.pending = false;
          if (done) done();
        };
        img.src = dataURL;
      });
    }

    // 清除提取：软清除。保留画布实例，停止实时更新循环，画面保持透明。
    // 再次获取背景会重新启动实时更新。
    clearCrop() {
      this.cleared = true;
      this._stopUpdateLoop();
      if (this.overlayCanvas && this.overlayCtx) {
        this.overlayCtx.clearRect(
          0,
          0,
          this.overlayCanvas.width,
          this.overlayCanvas.height,
        );
      }
      this.snapshotId++; // 作废进行中的快照（其回调已兜底 resolve，不卡脚本）
    }

    // 快捷单选菜单：default/liquid/blur/none → 映射到两个独立开关
    setEffectMode(args) {
      const mode = String(args.EFFECT);
      switch (mode) {
        case "liquid":
          this.liquidOn = true;
          this.blurOn = false;
          break;
        case "blur":
          this.blurOn = true;
          this.liquidOn = false;
          break;
        default: // default / none
          this.liquidOn = false;
          this.blurOn = false;
          break;
      }
      this._render();
    }

    // 独立开关：液态玻璃扭曲（可与模糊同时开启）
    setLiquidEnabled(args) {
      this.liquidOn = String(args.ON) === "on";
      this._render();
    }

    // 独立开关：模糊（可与液态玻璃同时开启）
    setBlurEnabled(args) {
      this.blurOn = String(args.ON) === "on";
      this._render();
    }

    // 清除所有特效：关闭液态与模糊，回到原样显示
    clearEffects() {
      this.liquidOn = false;
      this.blurOn = false;
      this._render();
    }

    // 设置提取形状：圆角矩形(长方形) / 正方形 / 圆形透镜
    setShape(args) {
      const shape = String(args.SHAPE);
      if (shape === "circle" || shape === "square") {
        this.shape = shape;
      } else {
        this.shape = "round";
      }
      this._render();
    }

    setRadius(args) {
      this.radius = Math.max(0, Cast.toNumber(args.R));
      this._render();
    }

    setLiquidStrength(args) {
      this.liquidStrength = Math.max(0, Cast.toNumber(args.S));
      this._render();
    }

    setBlurStrength(args) {
      this.blurStrength = Math.max(0, Cast.toNumber(args.S));
      this._render();
    }

    setEffectStrength(args) {
      const s = Math.max(0, Cast.toNumber(args.S));
      this.liquidStrength = s;
      this.blurStrength = s;
      this._render();
    }

    // 按形状计算实际绘制区域：正方形模式以原区域中心居中裁方
    _effectiveRect() {
      const c = this.crop;
      if (this.shape === "square") {
        const s = Math.min(c.w, c.h);
        const cx = c.minX + c.w / 2;
        const cy = c.minY + c.h / 2;
        const minX = Math.round(cx - s / 2);
        const minY = Math.round(cy - s / 2);
        return { minX, minY, maxX: minX + s, maxY: minY + s, w: s, h: s };
      }
      return c;
    }

    // 静态渲染管线（全部像素级，不依赖 canvas clip，形状遮罩在任何模式下都生效）：
    // 裁图 → 特效(先模糊后折射，可叠加) → 形状遮罩 → 玻璃高光 → 写回
    _render() {
      // 已清除提取：保持透明，参数改动不使画面"复活"
      if (this.cleared) return;
      if (!this.overlayCanvas || !this.overlayCtx) return;
      // 按形状取实际绘制区域（正方形模式居中裁方）
      const rect = this._effectiveRect();
      const { w, h } = rect;
      const ctx = this.overlayCtx;
      // 叠加层位置与尺寸随形状动态更新
      this.overlayCanvas.style.left = rect.minX + 240 + "px";
      this.overlayCanvas.style.top = 180 - rect.maxY + "px";
      if (this.overlayCanvas.width !== w || this.overlayCanvas.height !== h) {
        this.overlayCanvas.width = w;
        this.overlayCanvas.height = h;
      }
      // 舞台坐标 → 480×360 像素坐标（左上原点）
      const sx = rect.minX + 240;
      const sy = 180 - rect.maxY;

      // 1) 从底图裁出区域
      this.tmpCtx.clearRect(0, 0, w, h);
      this.tmpCtx.drawImage(this.refCanvas, sx, sy, w, h, 0, 0, w, h);
      let data = this.tmpCtx.getImageData(0, 0, w, h);

      // 2) 特效（先模糊后折射，两个开关可同时开启）
      if (this.blurOn) {
        data = this._boxBlur(data, w, h, this.blurStrength);
      }
      if (this.liquidOn) {
        data = this._glassRefract(data, w, h);
      }

      // 3) 形状遮罩（所有模式统一：圆角矩形/正方形/圆形透镜）
      this._applyShapeMask(data, w, h, this.shape, this.radius);

      // 4) 液态玻璃专属：边缘反光高光
      if (this.liquidOn) {
        this._applyGlassHighlight(
          data,
          w,
          h,
          this.shape,
          this.radius,
          this.liquidStrength,
        );
      }

      // 5) 写回显示层
      ctx.putImageData(data, 0, 0);
    }
  }

  Scratch.extensions.register(new BackgroundCropExt());
})(Scratch);
