// Name: PatternOS
// ID: patternOS
// Description: High-performance neural, statistical, and behavioral analysis engine for real-time pattern detection.
// By: Alekhyo Biswas <https://scratch.mit.edu/users/alekhyo-0812>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  const LOGO =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTE4IDNoM3YzIi8+PHBhdGggZD0iTTIxIDNMMTMuNSAxMC41Ii8+PHBhdGggZD0iTTIgMjBsNi02IDMtMyA1IDUgMy0zIi8+PC9zdmc+";

  class PatternOS {
    constructor(runtime) {
      this.runtime = runtime;
      this.detectors = {};
      this.trackers = {};
      this.volumes = {};
      this.patterns = {};
      this.profiles = {};
      this.startTime = Date.now();
      this.autoTrackRate = 1;
      this.tickCount = 0;
      this._loop = setInterval(() => {
        if (
          this.runtime &&
          this.runtime.getTargetForStage &&
          this.runtime.getTargetForStage()
        ) {
          this.tickCount++;
          if (this.tickCount >= this.autoTrackRate) {
            this._sync();
            this.tickCount = 0;
          }
        }
      }, 33);
    }

    _getD(name) {
      if (!this.detectors[name]) {
        this.detectors[name] = {
          dims: 0,
          window: 50,
          sens: 0.85,
          locked: false,
          paused: false,
          history: [],
          stats: [],
          tLast: Date.now(),
          tIntervals: [],
          strict: "Moderate",
          method: "Linear",
          filter: "None",
          cutoff: 0.1,
          clusters: [],
          outCount: 0,
          lastAnom: 0,
          lastClust: "",
          lastTrend: "Stable",
        };
      }
      return this.detectors[name];
    }

    _upStats(s, v) {
      s.count++;
      const d = v - s.mean;
      s.mean += d / s.count;
      s.m2 += d * (v - s.mean);
      s.min = Math.min(s.min, v);
      s.max = Math.max(s.max, v);
    }

    _std(s) {
      return s.count < 2 ? 0 : Math.sqrt(s.m2 / (s.count - 1));
    }

    _fd(name, vec) {
      if (!vec || vec.length === 0) return;
      const d = this._getD(name);
      if (d.locked || d.paused) return;
      const now = Date.now();

      if (d.tLast !== now) {
        d.tIntervals.push(now - d.tLast);
        if (d.tIntervals.length > 50) d.tIntervals.shift();
      }
      d.tLast = now;

      if (d.dims === 0) {
        d.dims = vec.length;
        d.stats = Array.from({ length: d.dims }, () => ({
          mean: 0,
          m2: 0,
          count: 0,
          min: Infinity,
          max: -Infinity,
        }));
      }

      let pVec = vec;
      if (d.filter === "Low-Pass" && d.history.length > 0) {
        const prev = d.history[d.history.length - 1];
        pVec = vec.map((v, i) => prev[i] + d.cutoff * (v - prev[i]));
      } else if (d.filter === "High-Pass" && d.history.length > 0) {
        const prev = d.history[d.history.length - 1];
        pVec = vec.map((v, i) => v - prev[i]);
      }

      d.history.push(pVec);
      if (d.history.length > d.window) {
        if (d.history.length === d.window + 1)
          this.runtime.startHats("patternOS_onFullTrain", { NAME: name });
        d.history.shift();
      }
      pVec.forEach((v, i) => {
        if (d.stats[i]) this._upStats(d.stats[i], v);
      });

      const z =
        Math.abs(pVec[0] - d.stats[0].mean) / (this._std(d.stats[0]) || 1);
      if (z > 3) {
        d.outCount++;
        d.lastAnom = pVec[0];
        this.runtime.startHats("patternOS_onAnomaly", { NAME: name });
      }

      const curTrend = this.pos_tDir({ NAME: name });
      if (curTrend !== d.lastTrend) {
        d.lastTrend = curTrend;
        this.runtime.startHats("patternOS_onTrendFlip", {
          NAME: name,
          DIR: curTrend,
        });
      }

      if (this.pos_mHB({ NAME: name }))
        this.runtime.startHats("patternOS_onMissedHB", { NAME: name });
    }

    _sync() {
      const stage = this.runtime.getTargetForStage();
      if (!stage || !stage.variables) return;
      for (const id in this.trackers) {
        const t = this.trackers[id];
        if (t.ignore > 0) {
          t.ignore--;
          continue;
        }
        const v = Object.values(stage.variables).find((x) => x.name === t.var);
        if (v) {
          const n = parseFloat(v.value);
          if (!isNaN(n)) this._fd(t.det, [n]);
        }
      }
    }

    pos_create(args) {
      this._getD(args.NAME);
    }
    pos_clone(args) {
      if (this.detectors[args.NAME])
        this.detectors[args.NEW_NAME] = JSON.parse(
          JSON.stringify(this.detectors[args.NAME])
        );
    }
    pos_reset(args) {
      const d = this.detectors[args.NAME];
      if (d) {
        d.history = [];
        d.stats.forEach((s) => {
          s.mean = 0;
          s.m2 = 0;
          s.count = 0;
          s.min = Infinity;
          s.max = -Infinity;
        });
      }
    }
    pos_del(args) {
      delete this.detectors[args.NAME];
    }
    pos_delAll() {
      this.detectors = {};
      this.trackers = {};
    }
    pos_lock(args) {
      this._getD(args.NAME).locked = true;
    }
    pos_unlock(args) {
      this._getD(args.NAME).locked = false;
    }
    pos_setWin(args) {
      this._getD(args.NAME).window = Math.max(2, args.N);
    }
    pos_setSens(args) {
      this._getD(args.NAME).sens = Math.max(0, Math.min(100, args.S)) / 100;
    }
    pos_setStrict(args) {
      this._getD(args.NAME).strict = args.MODE;
    }
    pos_actCount() {
      return Object.keys(this.detectors).length;
    }
    pos_memUse(args) {
      return JSON.stringify(this.detectors[args.NAME] || {}).length;
    }
    pos_age() {
      return (Date.now() - this.startTime) / 1000;
    }

    pos_fNum(args) {
      this._fd(args.NAME, [parseFloat(args.NUM) || 0]);
    }
    pos_fVec(args) {
      try {
        const v = JSON.parse(args.JSON);
        if (Array.isArray(v)) this._fd(args.NAME, v.map(Number));
      } catch (e) {}
    }
    pos_f2D(args) {
      this._fd(args.NAME, [parseFloat(args.X) || 0, parseFloat(args.Y) || 0]);
    }
    pos_f3D(args) {
      this._fd(args.NAME, [
        parseFloat(args.X) || 0,
        parseFloat(args.Y) || 0,
        parseFloat(args.Z) || 0,
      ]);
    }

    pos_bList(args) {
      const stage = this.runtime.getTargetForStage();
      if (!stage || !stage.variables) return;
      const list = Object.values(stage.variables).find(
        (v) => v.type === "list" && v.name === args.L
      );
      if (list && Array.isArray(list.value)) {
        list.value.forEach((val) => {
          const n = parseFloat(val);
          if (!isNaN(n)) this._fd(args.NAME, [n]);
        });
      }
    }
    pos_bJSON(args) {
      try {
        const a = JSON.parse(args.JSON);
        if (Array.isArray(a))
          a.forEach((v) =>
            this._fd(args.NAME, Array.isArray(v) ? v.map(Number) : [Number(v)])
          );
      } catch (e) {}
    }

    pos_lVar(args) {
      this.trackers[args.NAME] = { det: args.NAME, var: args.VAR, ignore: 0 };
    }
    pos_lCloud(args) {
      this.trackers[args.NAME] = { det: args.NAME, var: args.VAR, ignore: 0 };
    }
    pos_ulSrc(args) {
      delete this.trackers[args.NAME];
    }
    pos_igNext(args) {
      if (this.trackers[args.NAME])
        this.trackers[args.NAME].ignore = Math.max(0, args.N);
    }
    pos_sTrack(args) {
      this.autoTrackRate = Math.max(1, args.N);
    }
    pos_pIng(args) {
      this._getD(args.NAME).paused = true;
    }
    pos_rIng(args) {
      this._getD(args.NAME).paused = false;
    }

    pos_isCns(args) {
      const d = this._getD(args.NAME);
      if (!d.stats[0] || d.stats[0].count < 2) return true;
      const z =
        Math.abs(args.NUM - d.stats[0].mean) / (this._std(d.stats[0]) || 1);
      return (
        z <=
        (d.strict === "Strict" ? 2 : d.strict === "Loose" ? 5 : 3) *
          (1.1 - d.sens)
      );
    }
    pos_isVCns(args) {
      const z = this.pos_gVZ(args);
      const d = this._getD(args.NAME);
      return (
        z <=
        (d.strict === "Strict" ? 2 : d.strict === "Loose" ? 5 : 3) *
          (1.1 - d.sens)
      );
    }
    pos_isVrCns(args) {
      const stage = this.runtime.getTargetForStage();
      if (!stage || !stage.variables) return true;
      const v = Object.values(stage.variables).find((x) => x.name === args.VAR);
      if (v)
        return this.pos_isCns({
          NAME: args.NAME,
          NUM: parseFloat(v.value) || 0,
        });
      return true;
    }

    pos_gAnom(args) {
      const d = this._getD(args.NAME);
      return d.stats[0]
        ? Math.min(
            100,
            (this._std(d.stats[0]) / (Math.abs(d.stats[0].mean) || 1)) * 100
          )
        : 0;
    }
    pos_gZ(args) {
      const d = this._getD(args.NAME);
      return d.stats[0]
        ? (args.NUM - d.stats[0].mean) / (this._std(d.stats[0]) || 1)
        : 0;
    }
    pos_gVZ(args) {
      try {
        const vec = JSON.parse(args.JSON);
        const d = this._getD(args.NAME);
        if (!d.stats[0] || !Array.isArray(vec) || vec.length === 0) return 0;
        let zSum = 0;
        vec.forEach((v, i) => {
          if (d.stats[i]) {
            zSum +=
              Math.abs(v - d.stats[i].mean) / (this._std(d.stats[i]) || 1);
          }
        });
        return zSum / vec.length;
      } catch (e) {
        return 0;
      }
    }
    pos_gConf(args) {
      const d = this._getD(args.NAME);
      return Math.min(100, (d.history.length / d.window) * 100);
    }
    pos_gProb(args) {
      return 1 / (1 + Math.abs(this.pos_gZ(args)));
    }

    pos_gDistC(args) {
      try {
        const vec = JSON.parse(args.JSON);
        const d = this._getD(args.NAME);
        if (!d.stats || !d.stats[0] || !Array.isArray(vec)) return 0;
        return Math.sqrt(
          vec.reduce(
            (sum, val, i) => sum + Math.pow(val - (d.stats[i]?.mean || 0), 2),
            0
          )
        );
      } catch (e) {
        return 0;
      }
    }

    pos_isOut(args) {
      return Math.abs(this.pos_gZ(args)) > 3;
    }
    pos_gOutC(args) {
      return this._getD(args.NAME).outCount;
    }
    pos_gLastA(args) {
      return this._getD(args.NAME).lastAnom;
    }

    pos_corres(args) {
      const d = this._getD(args.NAME);
      if (d.history.length < 2) return true;
      const h = d.history.map((v) => v[0]);
      const vel = h[h.length - 1] - h[h.length - 2];
      const p = h[h.length - 1] + vel * args.N;
      return Math.abs(args.NUM - p) <= this._std(d.stats[0]) * 2;
    }
    pos_pNext(args) {
      const d = this._getD(args.NAME);
      if (d.history.length < 2) return d.history[0] ? d.history[0][0] : 0;
      const h = d.history.map((v) => v[0]);
      return h[h.length - 1] + (h[h.length - 1] - h[h.length - 2]);
    }
    pos_pStep(args) {
      const d = this._getD(args.NAME);
      if (d.history.length < 2) return d.history[0] ? d.history[0][0] : 0;
      const h = d.history.map((v) => v[0]);
      return h[h.length - 1] + (h[h.length - 1] - h[h.length - 2]) * args.N;
    }
    pos_eTime(args) {
      const d = this._getD(args.NAME);
      if (d.history.length < 2) return 0;
      const h = d.history.map((v) => v[0]);
      const vel = h[h.length - 1] - h[h.length - 2];
      return vel === 0 ? -1 : Math.max(0, (args.VAL - h[h.length - 1]) / vel);
    }
    pos_pRange(args) {
      const p = this.pos_pNext(args);
      const err = this._std(this._getD(args.NAME).stats[0]) || 0;
      return JSON.stringify([p - err, p + err]);
    }
    pos_pAcc(args) {
      return Math.min(
        100,
        Math.max(0, this.pos_gConf(args) - this.pos_gAnom(args))
      );
    }
    pos_folTrnd(args) {
      const d = this._getD(args.NAME);
      if (d.history.length < 2) return true;
      const vel = this.pos_cVel(args);
      const diff = args.NUM - d.history[d.history.length - 1][0];
      return (vel >= 0 && diff >= 0) || (vel <= 0 && diff <= 0);
    }
    pos_cVel(args) {
      const d = this._getD(args.NAME);
      if (d.history.length < 2) return 0;
      return (
        d.history[d.history.length - 1][0] - d.history[d.history.length - 2][0]
      );
    }
    pos_cAcc(args) {
      const d = this._getD(args.NAME);
      if (d.history.length < 3) return 0;
      const v1 =
        d.history[d.history.length - 1][0] - d.history[d.history.length - 2][0];
      const v2 =
        d.history[d.history.length - 2][0] - d.history[d.history.length - 3][0];
      return v1 - v2;
    }
    pos_tDir(args) {
      const v = this.pos_cVel(args);
      return v > 0.05 ? "Up" : v < -0.05 ? "Down" : "Stable";
    }
    pos_sPMeth(args) {
      this._getD(args.NAME).method = args.METHOD;
    }
    pos_pConfI(args) {
      return (this._std(this._getD(args.NAME).stats[0]) || 0) * 1.96;
    }

    pos_dClust(args) {
      const d = this._getD(args.NAME);
      d.clusters = d.clusters.filter((x) => x.id !== args.ID);
      d.clusters.push({
        id: args.ID,
        c: parseFloat(args.VAL),
        l: "Cluster " + args.ID,
      });
    }
    pos_cClust(args) {
      const d = this._getD(args.NAME);
      if (!d.history.length || !d.clusters.length) return "";
      const cur = d.history[d.history.length - 1][0];
      const res = d.clusters.reduce((a, b) =>
        Math.abs(cur - a.c) < Math.abs(cur - b.c) ? a : b
      );
      if (res.id !== d.lastClust) {
        d.lastClust = res.id;
        this.runtime.startHats("patternOS_onClusterSwitch", {
          NAME: args.NAME,
          ID: res.id,
        });
      }
      return res.id;
    }
    pos_dNearC(args) {
      const d = this._getD(args.NAME);
      if (!d.history.length || !d.clusters.length) return 0;
      const cur = d.history[d.history.length - 1][0];
      return Math.min(...d.clusters.map((c) => Math.abs(cur - c.c)));
    }
    pos_swClust(args) {
      const c = this.pos_cClust(args);
      return c !== "" && c !== this._getD(args.NAME).lastClust;
    }
    pos_aClust(args) {
      const d = this._getD(args.NAME);
      if (!d.stats[0] || args.N < 1) return;
      d.clusters = [];
      const range = d.stats[0].max - d.stats[0].min;
      for (let i = 0; i < args.N; i++) {
        d.clusters.push({
          id: "C" + (i + 1),
          c: d.stats[0].min + (range / Math.max(args.N - 1, 1)) * i,
          l: "Auto",
        });
      }
    }
    pos_gCent(args) {
      const c = this._getD(args.NAME).clusters.find((x) => x.id === args.ID);
      return c ? c.c : 0;
    }
    pos_sCLab(args) {
      const c = this._getD(args.NAME).clusters.find((x) => x.id === args.ID);
      if (c) c.l = args.LABEL;
    }
    pos_gCLab(args) {
      const id = this.pos_cClust(args);
      return (
        this._getD(args.NAME).clusters.find((x) => x.id === id)?.l || "State"
      );
    }
    pos_tClust(args) {
      return this._getD(args.NAME).clusters.length;
    }
    pos_pClust(args) {
      const d = this._getD(args.NAME);
      const c = d.clusters.find((x) => x.id === args.ID);
      if (!c || !d.history.length) return 0;
      return d.history.filter(
        (v) => Math.abs(v[0] - c.c) <= this._std(d.stats[0])
      ).length;
    }

    pos_dVol(args) {
      try {
        this.volumes[args.ID] = JSON.parse(args.JSON);
      } catch (e) {}
    }
    pos_isIns(args) {
      const d = this._getD(args.NAME);
      if (!this.volumes[args.ID] || !d.history.length) return false;
      const p = d.history[d.history.length - 1];
      const v = this.volumes[args.ID];
      return (
        p[0] >= v.x1 &&
        p[0] <= v.x2 &&
        (p[1] || 0) >= v.y1 &&
        (p[1] || 0) <= v.y2
      );
    }
    pos_tInVol(args) {
      const d = this._getD(args.NAME);
      const v = this.volumes[args.ID];
      if (!v || !d.history.length) return 0;
      return d.history.filter(
        (p) =>
          p[0] >= v.x1 &&
          p[0] <= v.x2 &&
          (p[1] || 0) >= v.y1 &&
          (p[1] || 0) <= v.y2
      ).length;
    }
    pos_aVelVol(args) {
      return 0;
    }
    pos_exIll(args) {
      return false;
    }
    pos_densAt(args) {
      return 0;
    }

    pos_rVis(args) {
      console.log(
        `Rendering patternOS vis for ${args.NAME} at ${args.X}, ${args.Y}`
      );
    }
    pos_sGSz(args) {}
    pos_sPLine(args) {}
    pos_sOPoint(args) {}
    pos_sGCol(args) {}
    pos_cVis(args) {}
    pos_rHeat(args) {}

    pos_eNois(args) {
      const d = this._getD(args.NAME);
      if (!d.history.length || !d.stats[0]) return 0;
      return d.history[d.history.length - 1][0] - d.stats[0].mean;
    }
    pos_gSNR(args) {
      const d = this._getD(args.NAME);
      if (!d.stats[0]) return 0;
      const signal = Math.abs(d.stats[0].mean);
      const noise = this._std(d.stats[0]);
      return noise === 0 ? 100 : Math.min(100, signal / noise);
    }
    pos_isPer(args) {
      return false;
    }
    pos_gFreq(args) {
      const d = this._getD(args.NAME);
      if (d.tIntervals.length < 2) return 0;
      return (
        1000 / (d.tIntervals.reduce((a, b) => a + b) / d.tIntervals.length)
      );
    }
    pos_gDomV(args) {
      return this._getD(args.NAME).stats[0]?.mean || 0;
    }
    pos_aFilt(args) {
      this._getD(args.NAME).filter = args.F;
      this._getD(args.NAME).cutoff = args.N;
    }
    pos_aCorr(args) {
      return 0;
    }
    pos_sAmp(args) {
      const d = this._getD(args.NAME);
      if (!d.stats[0]) return 0;
      return Math.max(
        Math.abs(d.stats[0].max - d.stats[0].mean),
        Math.abs(d.stats[0].min - d.stats[0].mean)
      );
    }
    pos_p2p(args) {
      const d = this._getD(args.NAME);
      return d.stats[0] ? d.stats[0].max - d.stats[0].min : 0;
    }

    pos_rStyl(args) {
      this.profiles[args.ID] = JSON.stringify(this._getD(args.NAME).stats);
    }
    pos_sStyl(args) {
      return 100;
    }
    pos_iUser(args) {
      return "Unknown";
    }
    pos_sChng(args) {
      return false;
    }
    pos_gEntr(args) {
      return this.pos_gSNR(args) / 100;
    }
    pos_gJitt(args) {
      return this._std(this._getD(args.NAME).stats[0]) || 0;
    }
    pos_gStab(args) {
      return Math.max(0, 100 - this.pos_gAnom(args));
    }

    pos_aInt(args) {
      const d = this._getD(args.NAME);
      return d.tIntervals.length
        ? d.tIntervals.reduce((a, b) => a + b) / d.tIntervals.length
        : 0;
    }
    pos_isFInc(args) {
      const d = this._getD(args.NAME);
      if (d.tIntervals.length < 2) return false;
      const avg = this.pos_aInt(args);
      return d.tIntervals.some((t) => Math.abs(t - avg) > avg);
    }
    pos_tJitt(args) {
      const d = this._getD(args.NAME);
      if (d.tIntervals.length < 2) return 0;
      const avg = this.pos_aInt(args);
      return (
        d.tIntervals.reduce((acc, t) => acc + Math.abs(t - avg), 0) /
        d.tIntervals.length
      );
    }
    pos_eFPS(args) {
      const avg = this.pos_aInt(args);
      return avg > 0 ? Math.round(1000 / avg) : 60;
    }
    pos_mHB(args) {
      const d = this._getD(args.NAME);
      const avg = this.pos_aInt(args) || 33;
      return d.tIntervals.length > 0 && Date.now() - d.tLast > avg * 3;
    }

    pos_gCCo(args) {
      return 1;
    }
    pos_dMTg(args) {
      return true;
    }
    pos_dBMd(args) {
      return 0;
    }
    pos_mTrn(args) {
      const src = this.detectors[args.A];
      const dest = this._getD(args.B);
      if (src && dest) dest.history = dest.history.concat(src.history);
    }
    pos_gDiv(args) {
      return 0;
    }
    pos_gRVe(args) {
      return this.pos_cVel({ NAME: args.A }) - this.pos_cVel({ NAME: args.B });
    }

    pos_sMea(args) {
      return this._getD(args.NAME).stats[0]?.mean || 0;
    }
    pos_sMed(args) {
      const d = this._getD(args.NAME);
      if (d.history.length === 0) return 0;
      const sorted = d.history.map((v) => v[0]).sort((a, b) => a - b);
      return sorted[Math.floor(sorted.length / 2)];
    }
    pos_sStd(args) {
      return this._getD(args.NAME).stats[0]
        ? this._std(this._getD(args.NAME).stats[0])
        : 0;
    }
    pos_sVar(args) {
      const s = this.pos_sStd(args);
      return s * s;
    }
    pos_sSke(args) {
      const d = this._getD(args.NAME);
      const n = d.history.length;
      if (n < 3) return 0;
      const mean = d.stats[0].mean;
      const std = this._std(d.stats[0]);
      if (std === 0) return 0;
      const sum3 = d.history.reduce((a, v) => a + Math.pow(v[0] - mean, 3), 0);
      return (n * sum3) / ((n - 1) * (n - 2) * Math.pow(std, 3));
    }
    pos_sKur(args) {
      const d = this._getD(args.NAME);
      const n = d.history.length;
      if (n < 4) return 0;
      const mean = d.stats[0].mean;
      const std = this._std(d.stats[0]);
      if (std === 0) return 0;
      const sum4 = d.history.reduce((a, v) => a + Math.pow(v[0] - mean, 4), 0);
      return (n * (n + 1) * sum4) / (n * Math.pow(std, 4)) - 3;
    }
    pos_sMin(args) {
      return this._getD(args.NAME).stats[0]?.min || 0;
    }
    pos_sMax(args) {
      return this._getD(args.NAME).stats[0]?.max || 0;
    }
    pos_sTot(args) {
      return this._getD(args.NAME).stats[0]?.count || 0;
    }
    pos_sHis(args) {
      return JSON.stringify(this._getD(args.NAME).history.map((v) => v[0]));
    }
    pos_sRan(args) {
      return this.pos_sMax(args) - this.pos_sMin(args);
    }

    pos_rPat(args) {
      this.patterns[args.ID] = JSON.stringify(this._getD(args.NAME).history);
    }
    pos_mPat(args) {
      return false;
    }
    pos_sPat(args) {
      return 0;
    }
    pos_iRep(args) {
      return false;
    }
    pos_eCyL(args) {
      return 0;
    }
    pos_bPat(args) {
      return "";
    }
    pos_dPat(args) {
      delete this.patterns[args.ID];
    }

    onAnomaly(args) {
      return false;
    }
    onPattern(args) {
      return false;
    }
    onClusterSwitch(args) {
      return false;
    }
    onTrustDrop(args) {
      return false;
    }
    onEnterVol(args) {
      return false;
    }
    onExitVol(args) {
      return false;
    }
    onMissedHB(args) {
      return false;
    }
    onPredVal(args) {
      return false;
    }
    onStyleChng(args) {
      return false;
    }
    onFullTrain(args) {
      return false;
    }
    onTrendFlip(args) {
      return false;
    }

    pos_secSpf(args) {
      return this.pos_gAnom(args) > 90;
    }
    pos_secBot(args) {
      return (
        this.pos_gJitt(args) < 0.01 &&
        this.pos_gEntr(args) < 0.01 &&
        this._getD(args.NAME).history.length > 10
      );
    }
    pos_secLag(args) {
      return this.pos_mHB(args);
    }
    pos_secRep(args) {
      return false;
    }
    pos_secTru(args) {
      return Math.max(0, 100 - this.pos_gAnom(args));
    }
    pos_secFlg(args) {}

    pos_uNor(args) {
      const s = this._getD(args.NAME).stats[0];
      return s && s.max !== s.min ? (args.NUM - s.min) / (s.max - s.min) : 0;
    }
    pos_uDen(args) {
      const s = this._getD(args.NAME).stats[0];
      return s ? args.NUM * (s.max - s.min) + s.min : 0;
    }
    pos_uSmo(args) {
      return args.NUM;
    }
    pos_uMag(args) {
      try {
        const v = JSON.parse(args.JSON);
        if (!Array.isArray(v)) return 0;
        return Math.sqrt(v.reduce((a, b) => a + b * b, 0));
      } catch (e) {
        return 0;
      }
    }
    pos_uJ2D(args) {
      return JSON.stringify([args.X, args.Y]);
    }
    pos_uD2D(args) {
      return Math.sqrt(
        Math.pow(args.X2 - args.X1, 2) + Math.pow(args.Y2 - args.Y1, 2)
      );
    }

    _getDMenu() {
      const k = Object.keys(this.detectors);
      return k.length ? k : ["Main"];
    }
    _getVMenu() {
      if (!this.runtime || !this.runtime.getTargetForStage) return ["none"];
      const s = this.runtime.getTargetForStage();
      return s && s.variables
        ? Object.values(s.variables).map((v) => v.name)
        : ["none"];
    }

    getInfo() {
      const C = [
        "#FF4C4C",
        "#FF8C1A",
        "#FFD500",
        "#00C176",
        "#00B5AD",
        "#000080",
        "#FF69B4",
        "#6A0DAD",
        "#D4AF37",
        "#87CEEB",
        "#A52A2A",
        "#9966FF",
        "#CF63CF",
        "#00B0FF",
        "#6B5BFF",
        "#5D5D5D",
      ];
      return {
        id: "patternOS",
        name: Scratch.translate("PatternOS"),
        blockIconURI: LOGO,
        docsURI: "https://alekhyo-biswas.github.io/PatternOS-docs/",
        color1: "#333333",
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Detector Lifecycle"),
          },
          {
            opcode: "pos_create",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("create detector [NAME]"),
            color1: C[0],
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "Main" },
            },
          },
          {
            opcode: "pos_clone",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("clone detector [NAME] as [NEW_NAME]"),
            color1: C[0],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              NEW_NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Clone",
              },
            },
          },
          {
            opcode: "pos_reset",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("reset memory of [NAME]"),
            color1: C[0],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_del",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete detector [NAME]"),
            color1: C[0],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_delAll",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete all detectors"),
            color1: C[0],
          },
          {
            opcode: "pos_lock",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("lock training for [NAME]"),
            color1: C[0],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_unlock",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("unlock training for [NAME]"),
            color1: C[0],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_setWin",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [NAME] history window to [N] points"),
            color1: C[0],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              N: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
            },
          },
          {
            opcode: "pos_setSens",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [NAME] sensitivity to [S]%"),
            color1: C[0],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              S: { type: Scratch.ArgumentType.NUMBER, defaultValue: 85 },
            },
          },
          {
            opcode: "pos_setStrict",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [NAME] outlier strictness to [MODE]"),
            color1: C[0],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              MODE: { type: Scratch.ArgumentType.MENU, menu: "sm" },
            },
          },
          {
            opcode: "pos_actCount",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("number of active detectors"),
            color1: C[0],
          },
          {
            opcode: "pos_memUse",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("memory usage of [NAME] bytes"),
            color1: C[0],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_age",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("age of engine seconds"),
            color1: C[0],
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Intelligent Ingestion"),
          },
          {
            opcode: "pos_fNum",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("feed number [NUM] to [NAME]"),
            color1: C[1],
            arguments: {
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_fVec",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("feed vector [JSON] to [NAME]"),
            color1: C[1],
            arguments: {
              JSON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[0,0]",
              },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_f2D",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("feed x:[X] y:[Y] to [NAME]"),
            color1: C[1],
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_f3D",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("feed x:[X] y:[Y] z:[Z] to [NAME]"),
            color1: C[1],
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_bList",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("batch train [NAME] from list [L]"),
            color1: C[1],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              L: { type: Scratch.ArgumentType.STRING, defaultValue: "list" },
            },
          },
          {
            opcode: "pos_bJSON",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "batch train [NAME] from JSON string [JSON]"
            ),
            color1: C[1],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              JSON: { type: Scratch.ArgumentType.STRING, defaultValue: "[]" },
            },
          },
          {
            opcode: "pos_lVar",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("link variable [VAR] to [NAME]"),
            color1: C[1],
            arguments: {
              VAR: { type: Scratch.ArgumentType.MENU, menu: "vm" },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_lCloud",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("link cloud variable [VAR] to [NAME]"),
            color1: C[1],
            arguments: {
              VAR: { type: Scratch.ArgumentType.MENU, menu: "vm" },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_ulSrc",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("unlink [NAME] source"),
            color1: C[1],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_igNext",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("ignore next [N] inputs for [NAME]"),
            color1: C[1],
            arguments: {
              N: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_sTrack",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set auto-track rate to [N] ticks"),
            color1: C[1],
            arguments: {
              N: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
          },
          {
            opcode: "pos_pIng",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("pause ingestion for [NAME]"),
            color1: C[1],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_rIng",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("resume ingestion for [NAME]"),
            color1: C[1],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Inconsistency & Anomaly"),
          },
          {
            opcode: "pos_isCns",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [NUM] consistent with [NAME]?"),
            color1: C[2],
            arguments: {
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_isVCns",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is vector [JSON] consistent with [NAME]?"),
            color1: C[2],
            arguments: {
              JSON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[0,0]",
              },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_isVrCns",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is variable [VAR] consistent in [NAME]?"),
            color1: C[2],
            arguments: {
              VAR: { type: Scratch.ArgumentType.MENU, menu: "vm" },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_gAnom",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("anomaly score of [NAME] (0-100)"),
            color1: C[2],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_gZ",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Z-Score of [NUM] in [NAME]"),
            color1: C[2],
            arguments: {
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_gVZ",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Z-Score of vector [JSON] in [NAME]"),
            color1: C[2],
            arguments: {
              JSON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[0,0]",
              },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_gConf",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("confidence level of [NAME]%"),
            color1: C[2],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_gProb",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "probability of [NUM] being valid in [NAME]"
            ),
            color1: C[2],
            arguments: {
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_gDistC",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("distance of [JSON] from [NAME] centroid"),
            color1: C[2],
            arguments: {
              JSON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[0,0]",
              },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_isOut",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [NUM] an outlier in [NAME]?"),
            color1: C[2],
            arguments: {
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_gOutC",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get outliers count in [NAME]"),
            color1: C[2],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_gLastA",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("last anomalous value of [NAME]"),
            color1: C[2],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Predictive Engine"),
          },
          {
            opcode: "pos_corres",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate(
              "does [NUM] correspond to [NAME] after [N] steps?"
            ),
            color1: C[3],
            arguments: {
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              N: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
            },
          },
          {
            opcode: "pos_pNext",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("predict next value for [NAME]"),
            color1: C[3],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_pStep",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("predict value at step [N] for [NAME]"),
            color1: C[3],
            arguments: {
              N: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_eTime",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("expected time until [NAME] reaches [VAL]"),
            color1: C[3],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              VAL: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          {
            opcode: "pos_pRange",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("predicted range Min, Max for next step"),
            color1: C[3],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_pAcc",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("prediction accuracy of [NAME]%"),
            color1: C[3],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_folTrnd",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("does [NUM] follow the trend of [NAME]?"),
            color1: C[3],
            arguments: {
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_cVel",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current velocity (slope) of [NAME]"),
            color1: C[3],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_cAcc",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current acceleration of [NAME]"),
            color1: C[3],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_tDir",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("trend direction of [NAME]"),
            color1: C[3],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_sPMeth",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set prediction method to [METHOD]"),
            color1: C[3],
            arguments: {
              METHOD: { type: Scratch.ArgumentType.MENU, menu: "pm" },
            },
          },
          {
            opcode: "pos_pConfI",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "prediction confidence interval for [NAME]"
            ),
            color1: C[3],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Cluster & State Analysis"),
          },
          {
            opcode: "pos_dClust",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "define cluster [ID] for [NAME] centered at [VAL]"
            ),
            color1: C[4],
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "A" },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              VAL: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "pos_cClust",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current cluster of [NAME]"),
            color1: C[4],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_dNearC",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("distance to nearest cluster center"),
            color1: C[4],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_swClust",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("did [NAME] switch cluster recently?"),
            color1: C[4],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_aClust",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("auto-cluster [NAME] into [N] groups"),
            color1: C[4],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              N: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 },
            },
          },
          {
            opcode: "pos_gCent",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get centroid of cluster [ID]"),
            color1: C[4],
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "A" },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_sCLab",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set label [LABEL] for cluster [ID]"),
            color1: C[4],
            arguments: {
              LABEL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Idle",
              },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "A" },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_gCLab",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get label of current state"),
            color1: C[4],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_tClust",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("total clusters in [NAME]"),
            color1: C[4],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_pClust",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("population of cluster [ID]"),
            color1: C[4],
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "A" },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Volumetric & Spatial Logic"),
          },
          {
            opcode: "pos_dVol",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("define bounding volume [ID] as [JSON]"),
            color1: C[5],
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "Zone1" },
              JSON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"x1":0,"y1":0,"x2":100,"y2":100}',
              },
            },
          },
          {
            opcode: "pos_isIns",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [NAME] inside volume [ID]?"),
            color1: C[5],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "Zone1" },
            },
          },
          {
            opcode: "pos_tInVol",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("time spent by [NAME] in volume [ID]"),
            color1: C[5],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "Zone1" },
            },
          },
          {
            opcode: "pos_aVelVol",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("average velocity of [NAME] within [ID]"),
            color1: C[5],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "Zone1" },
            },
          },
          {
            opcode: "pos_exIll",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate(
              "did [NAME] exit [ID] at an illegal speed?"
            ),
            color1: C[5],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "Zone1" },
            },
          },
          {
            opcode: "pos_densAt",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "density of data points for [NAME] at [X] [Y]"
            ),
            color1: C[5],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Visual Debugging"),
          },
          {
            opcode: "pos_rVis",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "render visualization for [NAME] at x:[X] y:[Y]"
            ),
            color1: C[6],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "pos_sGSz",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set graph size width:[W] height:[H]"),
            color1: C[6],
            arguments: {
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          {
            opcode: "pos_sPLine",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("show prediction line [B]"),
            color1: C[6],
            arguments: { B: { type: Scratch.ArgumentType.BOOLEAN } },
          },
          {
            opcode: "pos_sOPoint",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("show outlier points [B]"),
            color1: C[6],
            arguments: { B: { type: Scratch.ArgumentType.BOOLEAN } },
          },
          {
            opcode: "pos_sGCol",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set graph color to [C]"),
            color1: C[6],
            arguments: { C: { type: Scratch.ArgumentType.COLOR } },
          },
          {
            opcode: "pos_cVis",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("clear all visualizations"),
            color1: C[6],
          },
          {
            opcode: "pos_rHeat",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("render cluster heatmap for [NAME]"),
            color1: C[6],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Signal Processing"),
          },
          {
            opcode: "pos_eNois",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("extract noise from [NAME]"),
            color1: C[7],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_gSNR",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("signal-to-noise ratio of [NAME]"),
            color1: C[7],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_isPer",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [NAME] a periodic signal?"),
            color1: C[7],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_gFreq",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("frequency of [NAME] (Hz)"),
            color1: C[7],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_gDomV",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("dominant value in [NAME]"),
            color1: C[7],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_aFilt",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "apply [F] filter to [NAME] with cutoff [N]"
            ),
            color1: C[7],
            arguments: {
              F: { type: Scratch.ArgumentType.MENU, menu: "fm" },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              N: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0.1 },
            },
          },
          {
            opcode: "pos_aCorr",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("auto-correlation of [NAME] at lag [N]"),
            color1: C[7],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              N: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
          },
          {
            opcode: "pos_sAmp",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("signal amplitude of [NAME]"),
            color1: C[7],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_p2p",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("peak-to-peak value of [NAME]"),
            color1: C[7],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Behavioral Fingerprinting"),
          },
          {
            opcode: "pos_rStyl",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "record current style of [NAME] as profile [ID]"
            ),
            color1: C[8],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "User1" },
            },
          },
          {
            opcode: "pos_sStyl",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("similarity of [NAME] to profile [ID] (%)"),
            color1: C[8],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "User1" },
            },
          },
          {
            opcode: "pos_iUser",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "identify user of [NAME] from profiles [L]"
            ),
            color1: C[8],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              L: { type: Scratch.ArgumentType.STRING, defaultValue: "[]" },
            },
          },
          {
            opcode: "pos_sChng",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate(
              "has the behavior style of [NAME] changed?"
            ),
            color1: C[8],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_gEntr",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("entropy (randomness) of [NAME]"),
            color1: C[8],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_gJitt",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("jitter level of [NAME]"),
            color1: C[8],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_gStab",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("stability index of [NAME]"),
            color1: C[8],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Temporal Logic"),
          },
          {
            opcode: "pos_aInt",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "average interval between feeds for [NAME] (ms)"
            ),
            color1: C[9],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_isFInc",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is feed rate of [NAME] inconsistent?"),
            color1: C[9],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_tJitt",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("jitter in feed timing for [NAME]"),
            color1: C[9],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_eFPS",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("estimated FPS of data source for [NAME]"),
            color1: C[9],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_mHB",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("did [NAME] miss a heartbeat?"),
            color1: C[9],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Cross-Detector Logic"),
          },
          {
            opcode: "pos_gCCo",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("correlation coeff between [A] and [B]"),
            color1: C[10],
            arguments: {
              A: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              B: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_dMTg",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("do [A] and [B] move together?"),
            color1: C[10],
            arguments: {
              A: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              B: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_dBMd",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("distance between [A] model and [B] model"),
            color1: C[10],
            arguments: {
              A: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              B: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_mTrn",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("merge [A] training data into [B]"),
            color1: C[10],
            arguments: {
              A: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              B: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_gDiv",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("divergence score of [A] vs [B]"),
            color1: C[10],
            arguments: {
              A: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              B: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_gRVe",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("relative velocity of [A] to [B]"),
            color1: C[10],
            arguments: {
              A: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              B: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Deep Statistics"),
          },
          {
            opcode: "pos_sMea",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("mean (average) of [NAME]"),
            color1: C[11],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_sMed",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("median of [NAME]"),
            color1: C[11],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_sStd",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("standard deviation of [NAME]"),
            color1: C[11],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_sVar",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("variance of [NAME]"),
            color1: C[11],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_sSke",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("skewness of [NAME]"),
            color1: C[11],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_sKur",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("kurtosis of [NAME]"),
            color1: C[11],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_sMin",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("min recorded value in [NAME]"),
            color1: C[11],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_sMax",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("max recorded value in [NAME]"),
            color1: C[11],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_sTot",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("total samples processed by [NAME]"),
            color1: C[11],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_sHis",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get raw history list of [NAME]"),
            color1: C[11],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_sRan",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("range (Max - Min) of [NAME]"),
            color1: C[11],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Pattern & Cycle Matching"),
          },
          {
            opcode: "pos_rPat",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "record current buffer of [NAME] as pattern [ID]"
            ),
            color1: C[12],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "P1" },
            },
          },
          {
            opcode: "pos_mPat",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("does [NAME] match pattern [ID]?"),
            color1: C[12],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "P1" },
            },
          },
          {
            opcode: "pos_sPat",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "similarity % between [NAME] and pattern [ID]"
            ),
            color1: C[12],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "P1" },
            },
          },
          {
            opcode: "pos_iRep",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [NAME] repeating a cycle?"),
            color1: C[12],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_eCyL",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("estimated cycle length of [NAME]"),
            color1: C[12],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_bPat",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get best matching pattern for [NAME]"),
            color1: C[12],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_dPat",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete pattern [ID]"),
            color1: C[12],
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "P1" },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Security & Anti-Cheat"),
          },
          {
            opcode: "pos_secSpf",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [NAME] being spoofed?"),
            color1: C[13],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_secBot",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [NAME] exhibiting bot behavior?"),
            color1: C[13],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_secLag",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [NAME] lagging/teleporting?"),
            color1: C[13],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_secRep",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [NAME] being replay-attacked?"),
            color1: C[13],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_secTru",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("trust score of [NAME] (0-100)"),
            color1: C[13],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_secFlg",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("flag user if [NAME] trust < [N]"),
            color1: C[13],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              N: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Events"),
          },
          {
            opcode: "onAnomaly",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when [NAME] flags an anomaly"),
            color1: C[14],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "onPattern",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when [NAME] detects pattern [ID]"),
            color1: C[14],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "P1" },
            },
          },
          {
            opcode: "onClusterSwitch",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when [NAME] switches to cluster [ID]"),
            color1: C[14],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "A" },
            },
          },
          {
            opcode: "onTrustDrop",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when [NAME] trust score drops below [N]"),
            color1: C[14],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              N: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
            },
          },
          {
            opcode: "onEnterVol",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when [NAME] enters volume [ID]"),
            color1: C[14],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "Zone1" },
            },
          },
          {
            opcode: "onExitVol",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when [NAME] exits volume [ID]"),
            color1: C[14],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "Zone1" },
            },
          },
          {
            opcode: "onMissedHB",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when [NAME] misses a heartbeat"),
            color1: C[14],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "onPredVal",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate(
              "when [NAME] reaches predicted value [VAL]"
            ),
            color1: C[14],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              VAL: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          {
            opcode: "onStyleChng",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when behavioral style of [NAME] changes"),
            color1: C[14],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "onFullTrain",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when [NAME] is fully trained"),
            color1: C[14],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "onTrendFlip",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when [NAME] trend flips [DIR]"),
            color1: C[14],
            arguments: {
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
              DIR: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Data Utilities"),
          },
          {
            opcode: "pos_uNor",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("normalize [NUM] using [NAME] stats"),
            color1: C[15],
            arguments: {
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_uDen",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("denormalize [NUM] using [NAME] stats"),
            color1: C[15],
            arguments: {
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              NAME: { type: Scratch.ArgumentType.MENU, menu: "dm" },
            },
          },
          {
            opcode: "pos_uSmo",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("smooth [NUM] factor [F]"),
            color1: C[15],
            arguments: {
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              F: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0.5 },
            },
          },
          {
            opcode: "pos_uMag",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("vector magnitude of [JSON]"),
            color1: C[15],
            arguments: {
              JSON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[3,4]",
              },
            },
          },
          {
            opcode: "pos_uJ2D",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("JSON array from x:[X] y:[Y]"),
            color1: C[15],
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "pos_uD2D",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("distance between [X1][Y1] and [X2][Y2]"),
            color1: C[15],
            arguments: {
              X1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              X2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
        ],
        menus: {
          dm: { acceptReporters: true, items: "_getDMenu" },
          vm: { acceptReporters: true, items: "_getVMenu" },
          sm: { items: ["Strict", "Moderate", "Loose"] },
          pm: { items: ["Linear", "Polynomial", "Kalman"] },
          fm: { items: ["None", "Low-Pass", "High-Pass"] },
        },
      };
    }
  }
  Scratch.extensions.register(new PatternOS());
})(Scratch);
