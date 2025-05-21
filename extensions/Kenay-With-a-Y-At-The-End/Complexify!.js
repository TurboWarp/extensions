// Name: Complexify!
// ID: kenayComplexify
// Description: Complex numbers and numerical operations  in TurboWarp
// By: Kenay <https://scratch.mit.edu/users/Kenay-con-Y-al-final/>
// By: Clickertale_2 <https://scratch.mit.edu/users/-Clickertale_2-/>
// Original: Complexity!
// License: MIT AND MPL-2.0

/**
The first full version, Complexity!, can be downloaded from his Discord: <https://discord.gg/JZUZxHpF>
Thanks "rawify" <https://github.com/rawify> for Complex.js v2.4.2 11/5/2024 <https://raw.org/article/complex-numbers-in-javascript/>
Copyright (c) 2024, Robert Eisele (https://raw.org/). Licensed under the MIT license.
Thanks "scratchfoundation" for the Timer <https://github.com/scratchfoundation/scratch-vm/tree/develop>
*/

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Complexify! must run unsandboxed");
  }

  class Timer {
    constructor(nowObj = Timer.nowObj) {
      this.startTime = 0;
      /**Wht is now?*/
      this.nowObj = nowObj;
    }
    static get USE_PERFORMANCE() {
      return false;
    }
    static get legacyDateCode() {
      return {
        now: function () {
          return new Date().getTime();
        },
      };
    }
    static get nowObj() {
      if (
        Timer.USE_PERFORMANCE &&
        typeof self !== "undefined" &&
        self.performance &&
        "now" in self.performance
      ) {
        return self.performance;
      } else if (Date.now) {
        return Date;
      }
      return Timer.legacyDateCode;
    }
    time() {
      return this.nowObj.now();
    }
    start() {
      this.startTime = this.nowObj.now();
    }
    timeElapsed() {
      return this.nowObj.now() - this.startTime;
    }
    setTimeout(handler, timeout) {
      return global.setTimeout(handler, timeout);
    }
    clearTimeout(timeoutId) {
      global.clearTimeout(timeoutId);
    }
  }

    function l(a, b) {
      let d; //For lint validation
      if (void 0 === a || null === a) f.re = f.im = 0;
      else if (void 0 !== b) (f.re = a), (f.im = b);
      else
        switch (typeof a) {
          case "object":
            if ("im" in a && "re" in a) (f.re = a.re), (f.im = a.im);
            else if ("abs" in a && "arg" in a) {
              if (!isFinite(a.abs) && isFinite(a.arg)) return c.INFINITY;
              f.re = a.abs * Math.cos(a.arg);
              f.im = a.abs * Math.sin(a.arg);
            } else if ("r" in a && "phi" in a) {
              if (!isFinite(a.r) && isFinite(a.phi)) return c.INFINITY;
              f.re = a.r * Math.cos(a.phi);
              f.im = a.r * Math.sin(a.phi);
            } else 2 === a.length ? ((f.re = a[0]), (f.im = a[1])) : m();
            break;
          case "string":
            f.im = f.re = 0;
            a = a
              .replace(/_/g, "")
              .match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
            b = 1;
            d = 0;
            null === a && m();
            for (let e = 0; e < a.length; e++) {
              const g = a[e];
              " " !== g &&
                "\t" !== g &&
                "\n" !== g &&
                ("+" === g
                  ? b++
                  : "-" === g
                    ? d++
                    : ("i" === g || "I" === g
                        ? (0 === b + d && m(),
                          " " === a[e + 1] || isNaN(a[e + 1])
                            ? (f.im += parseFloat((d % 2 ? "-" : "") + "1"))
                            : ((f.im += parseFloat(
                                (d % 2 ? "-" : "") + a[e + 1]
                              )),
                              e++))
                        : ((0 === b + d || isNaN(g)) && m(),
                          "i" === a[e + 1] || "I" === a[e + 1]
                            ? ((f.im += parseFloat((d % 2 ? "-" : "") + g)),
                              e++)
                            : (f.re += parseFloat((d % 2 ? "-" : "") + g))),
                      (b = d = 0)));
            }
            0 < b + d && m();
            break;
          case "number":
            f.im = 0;
            f.re = a;
            break;
          default:
            m();
        }
      return f;
    }
    function m() {
      throw SyntaxError("Invalid Param");
    }
    function n(a, b) {
      a = Math.abs(a);
      b = Math.abs(b);
      a < b && ([a, b] = [b, a]);
      if (1e8 > a) return Math.sqrt(a * a + b * b);
      b /= a;
      return a * Math.sqrt(1 + b * b);
    }
    function p(a, b) {
      const d = Math.abs(a),
        e = Math.abs(b);
      if (0 === a) return Math.log(e);
      if (0 === b) return Math.log(d);
      if (3e3 > d && 3e3 > e) return 0.5 * Math.log(a * a + b * b);
      a *= 0.5;
      b *= 0.5;
      return 0.5 * Math.log(a * a + b * b) + Math.LN2;
    }
    function c(a, b) {
      if (!(this instanceof c)) return new c(a, b);
      a = l(a, b);
      this.re = a.re;
      this.im = a.im;
    }
    const h =
        Math.cosh ||
        function (a) {
          return 1e-9 > Math.abs(a)
            ? 1 - a
            : 0.5 * (Math.exp(a) + Math.exp(-a));
        },
      k =
        Math.sinh ||
        function (a) {
          return 1e-9 > Math.abs(a) ? a : 0.5 * (Math.exp(a) - Math.exp(-a));
        },
      f = { re: 0, im: 0 };
    c.prototype = {
      re: 0,
      im: 0,
      sign: function () {
        const a = n(this.re, this.im);
        return new c(this.re / a, this.im / a);
      },
      add: function (a, b) {
        a = l(a, b);
        b = this.isInfinite();
        const d = !(isFinite(a.re) && isFinite(a.im));
        return b || d
          ? b && d
            ? c.NAN
            : c.INFINITY
          : new c(this.re + a.re, this.im + a.im);
      },
      sub: function (a, b) {
        a = l(a, b);
        b = this.isInfinite();
        const d = !(isFinite(a.re) && isFinite(a.im));
        return b || d
          ? b && d
            ? c.NAN
            : c.INFINITY
          : new c(this.re - a.re, this.im - a.im);
      },
      mul: function (a, b) {
        a = l(a, b);
        b = this.isInfinite();
        const d = !(isFinite(a.re) && isFinite(a.im)),
          e = 0 === this.re && 0 === this.im,
          g = 0 === a.re && 0 === a.im;
        return (b && g) || (d && e)
          ? c.NAN
          : b || d
            ? c.INFINITY
            : 0 === a.im && 0 === this.im
              ? new c(this.re * a.re, 0)
              : new c(
                  this.re * a.re - this.im * a.im,
                  this.re * a.im + this.im * a.re
                );
      },
      div: function (a, b) {
        a = l(a, b);
        b = this.isInfinite();
        const d = !(isFinite(a.re) && isFinite(a.im)),
          e = 0 === this.re && 0 === this.im,
          g = 0 === a.re && 0 === a.im;
        if ((e && g) || (b && d)) return c.NAN;
        if (g || b) return c.INFINITY;
        if (e || d) return c.ZERO;
        if (0 === a.im) return new c(this.re / a.re, this.im / a.re);
        if (Math.abs(a.re) < Math.abs(a.im))
          return (
            (b = a.re / a.im),
            (a = a.re * b + a.im),
            new c((this.re * b + this.im) / a, (this.im * b - this.re) / a)
          );
        b = a.im / a.re;
        a = a.im * b + a.re;
        return new c((this.re + this.im * b) / a, (this.im - this.re * b) / a);
      },
      pow: function (a, b) {
        a = l(a, b);
        b = 0 === this.re && 0 === this.im;
        if (0 === a.re && 0 === a.im) return c.ONE;
        if (0 === a.im) {
          if (0 === this.im && 0 < this.re)
            return new c(Math.pow(this.re, a.re), 0);
          if (0 === this.re)
            switch (((a.re % 4) + 4) % 4) {
              case 0:
                return new c(Math.pow(this.im, a.re), 0);
              case 1:
                return new c(0, Math.pow(this.im, a.re));
              case 2:
                return new c(-Math.pow(this.im, a.re), 0);
              case 3:
                return new c(0, -Math.pow(this.im, a.re));
            }
        }
        if (b && 0 < a.re) return c.ZERO;
        const d = Math.atan2(this.im, this.re),
          e = p(this.re, this.im);
        b = Math.exp(a.re * e - a.im * d);
        a = a.im * e + a.re * d;
        return new c(b * Math.cos(a), b * Math.sin(a));
      },
      sqrt: function () {
        const a = this.re,
          b = this.im;
        if (0 === b)
          return 0 <= a ? new c(Math.sqrt(a), 0) : new c(0, Math.sqrt(-a));
        var d = n(a, b);
        d = Math.sqrt(0.5 * (d + Math.abs(a)));
        let e = Math.abs(b) / (2 * d);
        return 0 <= a ? new c(d, 0 > b ? -e : e) : new c(e, 0 > b ? -d : d);
      },
      exp: function () {
        const a = Math.exp(this.re);
        return 0 === this.im
          ? new c(a, 0)
          : new c(a * Math.cos(this.im), a * Math.sin(this.im));
      },
      expm1: function () {
        const a = this.re,
          b = this.im;
        var d = Math.expm1(a) * Math.cos(b);
        var e = Math.PI / 4;
        -e > b || b > e
          ? (e = Math.cos(b) - 1)
          : ((e = b * b),
            (e *=
              e *
                (e *
                  (e *
                    (e *
                      (e *
                        (e * (e / 20922789888e3 - 1 / 87178291200) +
                          1 / 479001600) -
                        1 / 3628800) +
                      1 / 40320) -
                    1 / 720) +
                  1 / 24) -
              0.5));
        return new c(d + e, Math.exp(a) * Math.sin(b));
      },
      log: function () {
        const a = this.re,
          b = this.im;
        return 0 === b && 0 < a
          ? new c(Math.log(a), 0)
          : new c(p(a, b), Math.atan2(b, a));
      },
      abs: function () {
        return n(this.re, this.im);
      },
      arg: function () {
        return Math.atan2(this.im, this.re);
      },
      sin: function () {
        const a = this.re,
          b = this.im;
        return new c(Math.sin(a) * h(b), Math.cos(a) * k(b));
      },
      cos: function () {
        const a = this.re,
          b = this.im;
        return new c(Math.cos(a) * h(b), -Math.sin(a) * k(b));
      },
      tan: function () {
        const a = 2 * this.re,
          b = 2 * this.im,
          d = Math.cos(a) + h(b);
        return new c(Math.sin(a) / d, k(b) / d);
      },
      cot: function () {
        const a = 2 * this.re,
          b = 2 * this.im,
          d = Math.cos(a) - h(b);
        return new c(-Math.sin(a) / d, k(b) / d);
      },
      sec: function () {
        const a = this.re,
          b = this.im,
          d = 0.5 * h(2 * b) + 0.5 * Math.cos(2 * a);
        return new c((Math.cos(a) * h(b)) / d, (Math.sin(a) * k(b)) / d);
      },
      csc: function () {
        const a = this.re,
          b = this.im,
          d = 0.5 * h(2 * b) - 0.5 * Math.cos(2 * a);
        return new c((Math.sin(a) * h(b)) / d, (-Math.cos(a) * k(b)) / d);
      },
      asin: function () {
        var a = this.re;
        const b = this.im,
          d = new c(b * b - a * a + 1, -2 * a * b).sqrt();
        a = new c(d.re - b, d.im + a).log();
        return new c(a.im, -a.re);
      },
      acos: function () {
        var a = this.re;
        const b = this.im,
          d = new c(b * b - a * a + 1, -2 * a * b).sqrt();
        a = new c(d.re - b, d.im + a).log();
        return new c(Math.PI / 2 - a.im, a.re);
      },
      atan: function () {
        var a = this.re;
        const b = this.im;
        if (0 === a) {
          if (1 === b) return new c(0, Infinity);
          if (-1 === b) return new c(0, -Infinity);
        }
        const d = a * a + (1 - b) * (1 - b);
        a = new c((1 - b * b - a * a) / d, (-2 * a) / d).log();
        return new c(-0.5 * a.im, 0.5 * a.re);
      },
      acot: function () {
        const a = this.re,
          b = this.im;
        if (0 === b) return new c(Math.atan2(1, a), 0);
        const d = a * a + b * b;
        return 0 !== d
          ? new c(a / d, -b / d).atan()
          : new c(0 !== a ? a / 0 : 0, 0 !== b ? -b / 0 : 0).atan();
      },
      asec: function () {
        const a = this.re,
          b = this.im;
        if (0 === a && 0 === b) return new c(0, Infinity);
        const d = a * a + b * b;
        return 0 !== d
          ? new c(a / d, -b / d).acos()
          : new c(0 !== a ? a / 0 : 0, 0 !== b ? -b / 0 : 0).acos();
      },
      acsc: function () {
        const a = this.re,
          b = this.im;
        if (0 === a && 0 === b) return new c(Math.PI / 2, Infinity);
        const d = a * a + b * b;
        return 0 !== d
          ? new c(a / d, -b / d).asin()
          : new c(0 !== a ? a / 0 : 0, 0 !== b ? -b / 0 : 0).asin();
      },
      sinh: function () {
        const a = this.re,
          b = this.im;
        return new c(k(a) * Math.cos(b), h(a) * Math.sin(b));
      },
      cosh: function () {
        const a = this.re,
          b = this.im;
        return new c(h(a) * Math.cos(b), k(a) * Math.sin(b));
      },
      tanh: function () {
        const a = 2 * this.re,
          b = 2 * this.im,
          d = h(a) + Math.cos(b);
        return new c(k(a) / d, Math.sin(b) / d);
      },
      coth: function () {
        const a = 2 * this.re,
          b = 2 * this.im,
          d = h(a) - Math.cos(b);
        return new c(k(a) / d, -Math.sin(b) / d);
      },
      csch: function () {
        const a = this.re,
          b = this.im,
          d = Math.cos(2 * b) - h(2 * a);
        return new c(
          (-2 * k(a) * Math.cos(b)) / d,
          (2 * h(a) * Math.sin(b)) / d
        );
      },
      sech: function () {
        const a = this.re,
          b = this.im,
          d = Math.cos(2 * b) + h(2 * a);
        return new c(
          (2 * h(a) * Math.cos(b)) / d,
          (-2 * k(a) * Math.sin(b)) / d
        );
      },
      asinh: function () {
        let a = this.im;
        this.im = -this.re;
        this.re = a;
        const b = this.asin();
        this.re = -this.im;
        this.im = a;
        a = b.re;
        b.re = -b.im;
        b.im = a;
        return b;
      },
      acosh: function () {
        const a = this.acos();
        if (0 >= a.im) {
          var b = a.re;
          a.re = -a.im;
          a.im = b;
        } else (b = a.im), (a.im = -a.re), (a.re = b);
        return a;
      },
      atanh: function () {
        var a = this.re,
          b = this.im;
        const d = 1 < a && 0 === b,
          e = 1 - a,
          g = 1 + a,
          q = e * e + b * b;
        a =
          0 !== q
            ? new c((g * e - b * b) / q, (b * e + g * b) / q)
            : new c(-1 !== a ? a / 0 : 0, 0 !== b ? b / 0 : 0);
        b = a.re;
        a.re = p(a.re, a.im) / 2;
        a.im = Math.atan2(a.im, b) / 2;
        d && (a.im = -a.im);
        return a;
      },
      acoth: function () {
        const a = this.re,
          b = this.im;
        if (0 === a && 0 === b) return new c(0, Math.PI / 2);
        const d = a * a + b * b;
        return 0 !== d
          ? new c(a / d, -b / d).atanh()
          : new c(0 !== a ? a / 0 : 0, 0 !== b ? -b / 0 : 0).atanh();
      },
      acsch: function () {
        const a = this.re,
          b = this.im;
        if (0 === b)
          return new c(
            0 !== a ? Math.log(a + Math.sqrt(a * a + 1)) : Infinity,
            0
          );
        const d = a * a + b * b;
        return 0 !== d
          ? new c(a / d, -b / d).asinh()
          : new c(0 !== a ? a / 0 : 0, 0 !== b ? -b / 0 : 0).asinh();
      },
      asech: function () {
        const a = this.re,
          b = this.im;
        if (this.isZero()) return c.INFINITY;
        const d = a * a + b * b;
        return 0 !== d
          ? new c(a / d, -b / d).acosh()
          : new c(0 !== a ? a / 0 : 0, 0 !== b ? -b / 0 : 0).acosh();
      },
      inverse: function () {
        if (this.isZero()) return c.INFINITY;
        if (this.isInfinite()) return c.ZERO;
        const a = this.re,
          b = this.im,
          d = a * a + b * b;
        return new c(a / d, -b / d);
      },
      conjugate: function () {
        return new c(this.re, -this.im);
      },
      neg: function () {
        return new c(-this.re, -this.im);
      },
      ceil: function (a) {
        a = Math.pow(10, a || 0);
        return new c(Math.ceil(this.re * a) / a, Math.ceil(this.im * a) / a);
      },
      floor: function (a) {
        a = Math.pow(10, a || 0);
        return new c(Math.floor(this.re * a) / a, Math.floor(this.im * a) / a);
      },
      round: function (a) {
        a = Math.pow(10, a || 0);
        return new c(Math.round(this.re * a) / a, Math.round(this.im * a) / a);
      },
      equals: function (a, b) {
        a = l(a, b);
        return (
          Math.abs(a.re - this.re) <= c.EPSILON &&
          Math.abs(a.im - this.im) <= c.EPSILON
        );
      },
      clone: function () {
        return new c(this.re, this.im);
      },
      toString: function () {
        let a = this.re,
          b = this.im,
          d = "";
        if (this.isNaN()) return "NaN";
        if (this.isInfinite()) return "Infinity";
        Math.abs(a) < c.EPSILON && (a = 0);
        Math.abs(b) < c.EPSILON && (b = 0);
        if (0 === b) return d + a;
        0 !== a
          ? ((d = d + a + " "),
            0 > b ? ((b = -b), (d += "-")) : (d += "+"),
            (d += " "))
          : 0 > b && ((b = -b), (d += "-"));
        1 !== b && (d += b);
        return d + "i";
      },
      toVector: function () {
        return [this.re, this.im];
      },
      valueOf: function () {
        return 0 === this.im ? this.re : null;
      },
      isNaN: function () {
        return isNaN(this.re) || isNaN(this.im);
      },
      isZero: function () {
        return 0 === this.im && 0 === this.re;
      },
      isFinite: function () {
        return isFinite(this.re) && isFinite(this.im);
      },
      isInfinite: function () {
        return !this.isFinite();
      },
    };
    c.ZERO = new c(0, 0);
    c.ONE = new c(1, 0);
    c.I = new c(0, 1);
    c.PI = new c(Math.PI, 0);
    c.E = new c(Math.E, 0);
    c.INFINITY = new c(Infinity, Infinity);
    c.NAN = new c(NaN, NaN);
    c.EPSILON = 1e-15;
  const Complex = c;

  function coolCis(ANGLE) {
    // e^ix trick
    const angle = Complex(ANGLE);
    const result = Complex({ arg: angle.re, abs: 1 }).mul(Math.exp(-angle.im));
    return result;
  }
  const twoPi = Math.PI * 2;

  function classicFac(x) {
    // 1*2*3*4*...*x
    if (x < 0) return Infinity;
    if (x == 0 || x == 1) return 1;
    return classicFac(x - 1) * x;
  }

  function factorial(z, t) {
    // For non-naturals numbers
    if (z.im == 0 && Number.isInteger(z.re)) {
      return classicFac(z.re);
    }
    var x = 1,
      y = 0;
    for (let i = 1; i <= t; i++) {
      const a = Complex(x, y).mul(
        Complex(1 + 1 / i)
          .pow(z)
          .div(z.div(i).add(1))
      );
      x = a.re;
      y = a.im;
    }
    return Complex(x, y).toString();
  }

  class ComplexityExtension {
    constructor() {
      this.trig = [
        "sin",
        "cos",
        "tan",
        "cot",
        "sec",
        "csc",
        "asin",
        "acos",
        "atan",
        "acot",
        "asec",
        "acsc",
        "sinh",
        "cosh",
        "tanh",
        "coth",
        "sech",
        "csch",
        "asinh",
        "acosh",
        "atanh",
        "acoth",
        "asech",
        "acsch",
      ]; // Used to make the menu look more clean.
      this.terms = 100000;
      this.noSpacing = true;
      try {
        if (typeof window.Complex !== "undefined") {
          this.Complex = window.Complex;
          console.log("We've complexified!");
        } else {
          console.log("This is out of our complex window");
        }
      } catch (e) {
        console.log("We've had a complex error!:", e);
      }
      if (!this) {
        console.error(
          "`this` isn't correctly bounded in the complex constructor"
        );
      } else {
        console.log(this);
      }
    }

    getInfo() {
      return {
        id: "kenayComplexify",
        name: Scratch.translate("Complexify!"),
        color1: "#964b99",
        menuIconURI:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAYAAAB/HSuDAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAK3mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuYTFjZDEyZiwgMjAyNC8xMS8xMS0xOTowODo0NiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjQgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNS0wNC0wNlQxOTowMDozNy0wNTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjUtMDUtMDFUMTM6Mzg6NDMtMDU6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjUtMDUtMDFUMTM6Mzg6NDMtMDU6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg2NjAyNWViLTczMzMtYmI0ZC1iYzg1LWVjOWU3YjFlZjE4NyIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmU3NzgyNGEwLTFkZWEtNTI0Yy1hZDYxLWIzYzM2ZmU2OThjNyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjU3MjAzODFmLWFlM2QtODE0ZC05NDUzLTdkYjlhOGM3NWUxNiIgdGlmZjpPcmllbnRhdGlvbj0iMSIgdGlmZjpYUmVzb2x1dGlvbj0iOTYwMDAwLzEwMDAwIiB0aWZmOllSZXNvbHV0aW9uPSI5NjAwMDAvMTAwMDAiIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiIGV4aWY6Q29sb3JTcGFjZT0iNjU1MzUiIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIxMDI0IiBleGlmOlBpeGVsWURpbWVuc2lvbj0iMTAyNCI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NTcyMDM4MWYtYWUzZC04MTRkLTk0NTMtN2RiOWE4Yzc1ZTE2IiBzdEV2dDp3aGVuPSIyMDI1LTA0LTA2VDE5OjAwOjM3LTA1OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjYuNCAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBpbWFnZS9wbmcgdG8gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzM2MjJlNTAtMjY3Ni0zNzQ1LTg0MWQtOWJjZjhmMGE1OWUyIiBzdEV2dDp3aGVuPSIyMDI1LTA0LTIyVDE2OjUxOjMwLTA1OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjYuNCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmIyMDNjZDM2LTRmMTgtNTk0MC05ZWE5LTg2ZTVkODllMjYzOCIgc3RFdnQ6d2hlbj0iMjAyNS0wNS0wMVQxMzozODo0My0wNTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI2LjQgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NjYwMjVlYi03MzMzLWJiNGQtYmM4NS1lYzllN2IxZWYxODciIHN0RXZ0OndoZW49IjIwMjUtMDUtMDFUMTM6Mzg6NDMtMDU6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNi40IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YjIwM2NkMzYtNGYxOC01OTQwLTllYTktODZlNWQ4OWUyNjM4IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MGRmMTlmNjctMTQxYi01MTQ1LTlhYTItMTc0YjFk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",
        blocks: [
          {
            opcode: "Complexity",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Complexify [REAL] [IMAG]"),
            arguments: {
              REAL: { type: Scratch.ArgumentType.NUMBER, defaultValue: "3" },
              IMAG: { type: Scratch.ArgumentType.NUMBER, defaultValue: "4" },
            },
          },
          "---",
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Rectangular Tools"),
          },
          {
            opcode: "rectComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[REAL] + [IMAG] 𝙞"),
            arguments: {
              REAL: { type: Scratch.ArgumentType.STRING, defaultValue: "3" },
              IMAG: { type: Scratch.ArgumentType.STRING, defaultValue: "4" },
            },
          },
          {
            opcode: "reComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Real Part of [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1+2i",
              },
            },
          },
          {
            opcode: "imComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Im. Part of [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1+2i",
              },
            },
          },
          {
            opcode: "conjugateComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Conjugate of [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Five basic operations"),
          },
          {
            opcode: "addComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[COMPLEX1] + [COMPLEX2]"),
            arguments: {
              COMPLEX1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
              COMPLEX2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1+2i",
              },
            },
          },
          {
            opcode: "subtractComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[COMPLEX1] - [COMPLEX2]"),
            arguments: {
              COMPLEX1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
              COMPLEX2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1+2i",
              },
            },
          },
          {
            opcode: "multiplyComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[COMPLEX1] × [COMPLEX2]"),
            arguments: {
              COMPLEX1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
              COMPLEX2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1+2i",
              },
            },
          },
          {
            opcode: "divideComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[COMPLEX1] / [COMPLEX2]"),
            arguments: {
              COMPLEX1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
              COMPLEX2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1+2i",
              },
            },
          },
          {
            opcode: "moduloComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[COMPLEX1] % [COMPLEX2]"),
            arguments: {
              COMPLEX1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
              COMPLEX2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1+2i",
              },
            },
          },
          "---", //I don't know what to name this, just a placeholder
          {
            opcode: "negComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Negative [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
            },
            description: "Negates the Complex",
          },
          {
            opcode: "inverseComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Inverse of [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
            },
            description: "Inverses the Complex",
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Polar Tools"),
          },
          {
            opcode: "polarComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Polar [RADIUS] ∠ [ANGLE]"),
            arguments: {
              RADIUS: { type: Scratch.ArgumentType.STRING, defaultValue: 5 },
              ANGLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.9272952180016123",
              },
            },
          },
          {
            opcode: "absComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Magnitude of [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
            },
          },
          {
            opcode: "complexSign",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Sign of [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
            },
          },
          {
            opcode: "cisThingie",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("∠ [ANGLE]"),
            arguments: {
              ANGLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.9272952180016123",
              },
            },
          },
          {
            opcode: "argComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Argument of [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
            },
          },
          "---",
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Spacing"),
          },
          {
            opcode: "stateSpacing",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("spacing"),
          },
          {
            opcode: "switchSpacing",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[Sw] spacing"),
            arguments: {
              Sw: { type: Scratch.ArgumentType.STRING, menu: "spacing" },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Exponents"),
          },
          {
            opcode: "powComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[COMPLEX1] ^ [COMPLEX2]"),
            arguments: {
              COMPLEX1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "2+i",
              },
              COMPLEX2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3",
              },
            },
          },
          {
            opcode: "expComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("𝑒xp [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
            },
            description: "Raises 𝑒 to the Complex",
          },
          {
            opcode: "rootComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[COMPLEX1] √ [COMPLEX2]"),
            arguments: {
              COMPLEX1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3",
              },
              COMPLEX2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "2+11i",
              },
            },
          },
          {
            opcode: "sqrtComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Square Root of [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
            },
            description: "Finds the square root of the Complex",
          },
          {
            opcode: "logComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("log [BASE] of [INPUT]"),
            arguments: {
              BASE: { type: Scratch.ArgumentType.STRING, defaultValue: "2+i" },
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "2+11i",
              },
            },
          },
          {
            opcode: "lnComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("ln [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
            },
            description: "Finds the natural logarithm of the Complex",
          },
          "---",
          {
            filter: [Scratch.TargetType.SPRITE], //Just in case
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Motion"),
          },

          {
            filter: [Scratch.TargetType.SPRITE],
            opcode: "getPosition",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Complex Position"),
          },
          {
            filter: [Scratch.TargetType.SPRITE],
            opcode: "goToComplex",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("Go to [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "30+40i",
              },
            },
          },
          {
            filter: [Scratch.TargetType.SPRITE],
            opcode: "goAddComplex",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("Move by [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "30+40i",
              },
            },
          },
          {
            filter: [Scratch.TargetType.SPRITE],
            opcode: "GoMulComplex",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("Mul position by [COMPLEX]"),
            arguments: {
              COMPLEX: { type: Scratch.ArgumentType.STRING, defaultValue: 5 },
            },
          },
          {
            filter: [Scratch.TargetType.SPRITE],
            opcode: "goToPolar",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("Go polar [RADII] ∠ [ANGLY]"),
            arguments: {
              RADII: { type: Scratch.ArgumentType.STRING, defaultValue: 50 },
              ANGLY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0.9272952180016123",
              },
            },
          },
          {
            filter: [Scratch.TargetType.SPRITE],
            opcode: "glideComplex",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("Glide [SECS] secs to [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "30+40i",
              },
              SECS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
          },
          "---",
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Trigonometry and decimals"),
          },
          {
            opcode: "trigOfComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[TRIG] of [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
              TRIG: { type: Scratch.ArgumentType.STRING, menu: "trigs" },
            },
          },
          {
            opcode: "convertComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Find [ANGLE] [TOSMTH]"),
            arguments: {
              ANGLE: { type: Scratch.ArgumentType.STRING, defaultValue: "30" },
              TOSMTH: { type: Scratch.ArgumentType.STRING, menu: "angles" },
            },
          },
          {
            opcode: "decimalComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[OPERATION] of [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1+0i",
              },
              OPERATION: {
                type: Scratch.ArgumentType.STRING,
                menu: "decTools",
              },
            },
          },
          "---",
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Booleans"),
          },
          {
            opcode: "equalsComplex",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("[COMPLEX1] = [COMPLEX2]?"),
            arguments: {
              COMPLEX1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
              COMPLEX2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
            },
          },
          {
            opcode: "isFiniteComplex",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("[COMPLEX] is finite?"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
            },
          },
          {
            opcode: "isNaNComplex",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("[COMPLEX] is NaN?"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
            },
          },
          "---",
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Strings"), //For others extensions to use
          },
          {
            opcode: "complexArray",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[COMPLEX] to array"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
            },
          },
          {
            opcode: "complexJSON",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[COMPLEX] to JSON"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Vectors"),
          },
          {
            opcode: "mulVectorAroundPoint",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("mul [VECTOR] around [POINT] by [FACTOR]"),
            arguments: {
              VECTOR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1+0i",
              },
              POINT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0+0i",
              },
              FACTOR: { type: Scratch.ArgumentType.STRING, defaultValue: 2 },
            },
          },
          {
            opcode: "rotateVectorAroundPoint",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "rotate [VECTOR] around [POINT] by angle [ANGLE]"
            ),
            arguments: {
              VECTOR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1+0i",
              },
              POINT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0+0i",
              },
              ANGLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 3.141592653589793,
              },
            },
          },
          "---",
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Factorials"),
            hideFromPalette: true,
          },
          {
            opcode: "facOf",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[ZED] !"),
            arguments: {
              ZED: { type: Scratch.ArgumentType.STRING, defaultValue: "3+4i" },
            },
            hideFromPalette: true,
          },
          {
            opcode: "Tfac",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Terms of factorials"),
            hideFromPalette: true,
          },
          {
            opcode: "setTfac",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("Set terms of factorials to [ZED]"),
            arguments: {
              ZED: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100000 },
            },
            hideFromPalette: true,
          },
        ],
        menus: {
          spacing: {
            acceptReporters: true,
            items: ["switch", "turn on", "turn off"], //For convertComplex
          },
          trigs: { acceptReporters: true, items: this.trig }, //For trigOfComplex
          angles: {
            acceptReporters: true,
            items: ["degs to rads", "𝜋", "rads to degs"], //For convertComplex
          },
          decTools: {
            acceptReporters: true,
            items: ["round", "ceil", "floor"], //For decimalComplex
          },
        },
      };
    }

    Complexity({ REAL, IMAG }) {
      REAL = Scratch.Cast.toNumber(REAL);
      IMAG = Scratch.Cast.toNumber(IMAG);
      try {
        var r = Complex(REAL, IMAG).toString(); //Don't forget: toString(), not Scratch.cast.toString()
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    /**
	We'll use toString() to return the Complex number with math notation. 
	If you wonder why, remember Complex is a class, and hence, returns objects.
 	So, new Complex(-5, 1) means "-5+i", but it actually shows {re: -5, im: 1}.
	So, we don't want "{re: -5, im: 1}", "[-5,1]" or "[object Object]". We want "-5+i" as is.
 	.toString() is the best option for this goal, to this day.
  	Thus, no Scratch.Cast.toString() or anything like that, because .toString() will always do.
*/

    rectComplex({ REAL, IMAG }) {
      try {
        //Simplifies multiplication, as shown:
        var r = Complex(IMAG).mul("i").add(Complex(REAL)).toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    reComplex({ COMPLEX }) {
      try {
        return Complex(COMPLEX).re;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    imComplex({ COMPLEX }) {
      try {
        return Complex(COMPLEX).im;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    conjugateComplex({ COMPLEX }) {
      try {
        var r = Complex(COMPLEX).conjugate().toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    addComplex({ COMPLEX1, COMPLEX2 }) {
      try {
        var r = Complex(COMPLEX1).add(Complex(COMPLEX2)).toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    subtractComplex({ COMPLEX1, COMPLEX2 }) {
      try {
        var r = Complex(COMPLEX1).sub(Complex(COMPLEX2)).toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    multiplyComplex({ COMPLEX1, COMPLEX2 }) {
      try {
        var r = Complex(COMPLEX1).mul(Complex(COMPLEX2)).toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    divideComplex({ COMPLEX1, COMPLEX2 }) {
      try {
        var r = Complex(COMPLEX1).div(Complex(COMPLEX2)).toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    moduloComplex({ COMPLEX1, COMPLEX2 }) {
      try {
        const c1 = Complex(COMPLEX1),
          c2 = Complex(COMPLEX2); // A/B = D +R/B [and R<B], so floor(A/B)=D
        var r = c1.sub(c2.mul(c1.div(c2).floor())).toString(); // A   = DB+R   and thus R=A-B*(floor[A/B])
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    negComplex({ COMPLEX }) {
      try {
        var r = Complex(COMPLEX).neg().toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    inverseComplex({ COMPLEX }) {
      try {
        var r = Complex(COMPLEX).inverse().toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    polarComplex({ RADIUS, ANGLE }) {
      try {
        var r = coolCis(Complex(ANGLE)).mul(Complex(RADIUS)).toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    absComplex({ COMPLEX }) {
      try {
        return Complex(COMPLEX).abs();
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    complexSign({ COMPLEX }) {
      try {
        var r = Complex(COMPLEX).sign().toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    cisThingie({ ANGLE }) {
      try {
        var r = coolCis(ANGLE).toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    argComplex({ COMPLEX }) {
      try {
        //There's an .arg() method, but it's a hidden direct Math.atan2()
        return Complex(COMPLEX).sign().log().mul("-i");
      } catch (e) {
        //So, -i*ln(sign[x]) is used for a little bit more presicion
        console.log(e);
        return NaN;
      }
    }

    powComplex({ COMPLEX1, COMPLEX2 }) {
      try {
        var r = Complex(COMPLEX1).pow(Complex(COMPLEX2)).toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    stateSpacing(args, util) {
      return !this.noSpacing;
    }

    switchSpacing({ Sw }) {
      try {
        if (typeof Sw == "boolean") this.noSpacing = !Sw;
        if (typeof Sw == "string") {
          Sw = Sw.toLowerCase();
          switch (Sw) {
            case "switch":
              this.noSpacing = !this.noSpacing;
              break;
            case "no":
            case "turn off":
              this.noSpacing = true;
              break;
            case "yes":
            case "turn on":
              this.noSpacing = false;
              break;
            default:
              console.log(Sw);
              break;
          }
        }
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    expComplex({ COMPLEX }) {
      try {
        var r = Complex(COMPLEX).exp().toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    rootComplex({ COMPLEX1, COMPLEX2 }) {
      try {
        var r = Complex(COMPLEX2).pow(Complex(COMPLEX1).inverse()).toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    sqrtComplex({ COMPLEX }) {
      try {
        var r = Complex(COMPLEX).sqrt().toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    logComplex({ BASE, INPUT }) {
      try {
        var r = Complex(INPUT).log().div(Complex(BASE).log()).toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    lnComplex({ COMPLEX }) {
      try {
        var r = Complex(COMPLEX).log().toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    getPosition(args, util) {
      try {
        var r = Complex(util.target.x, util.target.y).toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        if (util.target.y < 0) {
          let imPart = util.target.y + "i";
          return util.target.x + imPart;
        }
        return util.target.x + "+" + util.target.y + "i";
      }
    }

    goToComplex(args, util) {
      if (util.target.isStage) return;
      const cInstance = Complex(args.COMPLEX);
      util.target.setXY(cInstance.re, cInstance.im);
    }

    goAddComplex(args, util) {
      if (util.target.isStage) return;
      const cInstance = Complex(args.COMPLEX);
      util.target.setXY(
        util.target.x + cInstance.re,
        util.target.y + cInstance.im
      );
    }

    goToPolar(args, util) {
      if (util.target.isStage) return;
      const cInstance = coolCis(args.ANGLY).mul(args.RADII);
      util.target.setXY(cInstance.re, cInstance.im);
    }

    GoMulComplex(args, util) {
      if (util.target.isStage) return;
      const cIn = Complex(args.COMPLEX);
      const cInstance = Complex(util.target.x, util.target.y).mul(cIn);
      util.target.setXY(cInstance.re, cInstance.im);
    }

    glideComplex(args, util) {
      if (util.target.isStage) return;
      args.SECS = Scratch.Cast.toNumber(args.SECS);
      if (args.SECS == 0) {
        //We've run out of time!
        this.goToComplex(args, util);
        return;
      }
      if (util.stackFrame.timer) {
        const timeElapsed = util.stackFrame.timer.timeElapsed();
        if (timeElapsed < util.stackFrame.duration * 1000) {
          // We've moving! And we'll move again.
          const frac = timeElapsed / (util.stackFrame.duration * 1000);
          const d = util.stackFrame.finish.sub(util.stackFrame.start).mul(frac);
          util.target.setXY(
            util.stackFrame.start.re + d.re,
            util.stackFrame.start.im + d.im
          );
          console.log(util.stackFrame);
          util.yield();
        } else {
          // We're done! Now, lets end this
          util.target.setXY(
            util.stackFrame.finish.re,
            util.stackFrame.finish.im
          );
          console.log("end");
        }
      } else {
        // We're starting! So, new Timer!
        util.stackFrame.timer = new Timer();
        util.stackFrame.timer.start();
        if (args.SECS > 0) {
          util.stackFrame.start = new Complex(util.target.x, util.target.y);
          util.stackFrame.finish = new Complex(args.COMPLEX);
        } else {
          args.SECS = -args.SECS;
          util.stackFrame.finish = new Complex(util.target.x, util.target.y);
          util.stackFrame.start = new Complex(args.COMPLEX);
        }
        util.stackFrame.duration = args.SECS;
        console.log(util.stackFrame);
        util.yield();
      }
    }

    trigOfComplex({ COMPLEX, TRIG }) {
      try {
        const cInstance = Complex(COMPLEX);
        const trigMethod = TRIG.toLowerCase();
        const validTrigFunctions = this.trig;
        if (
          validTrigFunctions.includes(trigMethod) &&
          typeof cInstance[trigMethod] === "function"
        ) {
          const result = cInstance[trigMethod]();
          if (result.isNaN()) return "Infinity";
          var r = result.toString();
          if (this.noSpacing) r = r.replace(/\s+/g, "");
          return r;
        } else {
          return "0";
        }
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    convertComplex({ ANGLE, TOSMTH }) {
      try {
        if (ANGLE == "") {
          return 0;
        }
        const cInstance = Complex(ANGLE);
        switch (TOSMTH) {
          case "degs to rads":
            if (cInstance.im == 0) {
              return (cInstance.re * 0.017453292519943295) % twoPi;
            }
            return cInstance.mul(0.017453292519943295).toString();
          case "𝜋":
            return cInstance.mul(3.141592653589793).toString();
          case "rads to degs":
            if (cInstance.im == 0) {
              return (cInstance.re * 57.29577951308232) % 360;
            }
            return cInstance.mul(57.29577951308232).toString();
          default:
            return NaN;
        }
      } catch (e) {
        console.log(e);
        return 0;
      }
    }

    decimalComplex({ COMPLEX, OPERATION }) {
      const complex = Complex(COMPLEX);
      OPERATION = OPERATION.toLowerCase();
      var r;
      switch (OPERATION) {
        case "ceil":
          r = complex.ceil().toString();
          break;
        case "floor":
          r = complex.floor().toString();
          break;
        case "round":
          r = complex.round().toString();
          break;
        default:
          r = 0;
      }
      if (this.noSpacing) r = r.replace(/\s+/g, "");
      return r;
    }

    equalsComplex({ COMPLEX1, COMPLEX2 }) {
      try {
        return Complex(COMPLEX1).equals(Complex(COMPLEX2));
      } catch (e) {
        console.log(e);
        return false;
      }
    }

    isNaNComplex({ COMPLEX }) {
      try {
        return Complex(COMPLEX).isNaN();
      } catch (e) {
        console.log(e);
        return false;
      }
    }

    isFiniteComplex({ COMPLEX }) {
      try {
        return Complex(COMPLEX).isFinite();
      } catch (e) {
        console.log(e);
        return false;
      }
    }

    complexArray({ COMPLEX }) {
      try {
        const z = Complex(COMPLEX);
        return "[" + z.re + "," + z.im + "]";
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    complexJSON({ COMPLEX }) {
      try {
        const z = Complex(COMPLEX);
        return JSON.stringify({ re: z.re, im: z.im });
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    mulVectorAroundPoint({ VECTOR, POINT, FACTOR }) {
      try {
        var r = Complex(VECTOR)
          .sub(Complex(POINT))
          .mul(Complex(FACTOR))
          .add(Complex(POINT))
          .toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    rotateVectorAroundPoint({ VECTOR, POINT, ANGLE }) {
      try {
        var r = Complex(VECTOR)
          .sub(Complex(POINT))
          .mul(coolCis(Complex(ANGLE)))
          .add(Complex(POINT))
          .toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    /**
	The following is the v3 of the Factorial function. 
	The day it's fast, efficient and right , it'll see the light of day.
  */
    facOf({ ZED }) {
      try {
        var r = factorial(Complex(ZED), this.terms).toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    Tfac() {
      try {
        return this.terms;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    setTfac({ ZED }) {
      ZED = Scratch.Cast.toNumber(ZED);
      try {
        if (ZED >= 0 && Number.isInteger(ZED)) this.terms = ZED;
      } catch (e) {
        console.log(e);
      }
    }
  }
  Scratch.extensions.register(new ComplexityExtension());
})(Scratch);
