// Name: Complexify!
// ID: kenayComplexify
// Description: Complex numbers and numerical operations  in TurboWarp
// By: Kenay <https://scratch.mit.edu/users/Kenay-con-Y-al-final/>
// By: Clickertale_2 <https://scratch.mit.edu/users/-Clickertale_2-/>
// Original: Complexity!
// License: MIT AND MPL-2.0

/** Excracted from <https://github.com/rawify/Complex.js/blob/main/LICENSE>

MIT License

Copyright (c) 2024 Robert Eisele

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

**/ //Thanks Rawify

/*
Thanks [@rawify] <https://github.com/rawify> for Complex.js v2.4.2 11/5/2024 <https://raw.org/article/complex-numbers-in-javascript/>
	(Copyrighted on 2024, from Robert Eisele's https://raw.org/, licensed under the MIT license btw)
Thanks [@scratchfoundation] for the Timer <https://github.com/scratchfoundation/scratch-vm/tree/develop>
Thanks [@Brackets-Coder] for telling me where I could be better.
Thanks [@yuri-kiss] for telling me some tips and in what I was wrong.
Thanks [@CubesterYT] and [@CubesterYT] for just passing by.
And thanks [@Clickertale2] for being always there, always helping.
*/

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Complexify! must run unsandboxed");
    //Y'know, for the `util` part to make sense.
  }

  class Timer {
    //From Scratch's vm.
    constructor(nowObj = Timer.nowObj) {
      this.startTime = 0;
      /**What is now?*/
      this.nowObj = nowObj;
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
      //What
    }
    start() {
      this.startTime = this.nowObj.now();
    }
    timeElapsed() {
      return this.nowObj.now() - this.startTime;
    }
  }

  //The complex parser.
  function l(a, b) {
    let d; //I really really really HATE lint-ing.
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
          if (a == "Infinity") return c.INFINITY;
          if (a == "NaN") return c.NAN;
          f.im = f.re = 0;
          a = a
            .replace(/_/g, "")
            .match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g); //Magic?
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
                          ? ((f.im += parseFloat((d % 2 ? "-" : "") + g)), e++)
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
          m(); //Error
      }
    return f;
  }
  function m() {
    throw SyntaxError("Invalid Param");
  }

  //Pythagoras!
  function n(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    a < b && ([a, b] = [b, a]);
    if (1e8 > a) return Math.sqrt(a * a + b * b);
    b /= a; //Avoid overflow
    return a * Math.sqrt(1 + b * b);
  }
  //Pythagoras but ln()
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
  //Complexity!
  function c(a, b) {
    if (!(this instanceof c)) return new c(a, b);
    a = l(a, b);
    this.re = a.re;
    this.im = a.im;
  }
  //Alternative functions for better calculations:
  const h =
      Math.cosh ||
      function (a) {
        return 1e-9 > Math.abs(a) ? 1 - a : 0.5 * (Math.exp(a) + Math.exp(-a));
      },
    k =
      Math.sinh ||
      function (a) {
        return 1e-9 > Math.abs(a) ? a : 0.5 * (Math.exp(a) - Math.exp(-a));
      },
    //Silly constant
    f = { re: 0, im: 0 };
  c.prototype = {
    re: 0,
    im: 0,
    sign: function () {
      //Normalized complex
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
      //Guess [a, b]*[c, d]=[ac - bd, ad + bc] now
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
      if ((e && g) || (b && d)) return c.NAN; // 0/0 = Inf/Inf = NaN
      if (g || b) return c.INFINITY;
      if (e || d) return c.ZERO;
      if (0 === a.im) return new c(this.re / a.re, this.im / a.re);
      if (Math.abs(a.re) < Math.abs(a.im))
        //Workaound
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
      if (0 === a.re && 0 === a.im) return c.ONE; //New 0^0 just dropped.
      if (0 === a.im) {
        if (0 === this.im && 0 < this.re)
          //If (-real)^real, raise it.
          return new c(Math.pow(this.re, a.re), 0);
        if (0 === this.re)
          //If imag^real, raise it.
          switch (((a.re % 4) + 4) % 4) {
            case 0:
              return new c(Math.pow(this.im, a.re));
            case 1:
              return new c(0, Math.pow(this.im, a.re));
            case 2:
              return new c(-Math.pow(this.im, a.re));
            case 3:
              return new c(0, -Math.pow(this.im, a.re));
          }
      }
      b = this.isZero();
      if (b && 0 < a.re) return c.ZERO; //0^positive = 0
      const d = this.arg(),
        e = p(this.re, this.im); //Now it's a (e*∠d)^(a.re + a.im*i) problem
      b = Math.exp(a.re * e - a.im * d);
      a = a.im * e + a.re * d;
      return new c(b * Math.cos(a), b * Math.sin(a));
    },
    sqrt: function () {
      //I don't understand this trick
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
      //e^(a+bi) = e^a * ∠b
      const a = Math.exp(this.re);
      return 0 === this.im
        ? new c(a, 0)
        : new c(a * Math.cos(this.im), a * Math.sin(this.im));
    },
    expm1: function () {
      //For smaller inputs
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
        ? new c(Math.log(a), 0) //Positive inputs acct as normal
        : new c(p(a, b), Math.atan2(b, a)); //ln(r*∠q) =? ln(r) + iq
    },
    abs: function () {
      return n(this.re, this.im);
    },
    arg: function () {
      return Math.atan2(this.im, this.re);
    },
    sin: function () {
      //I won't bother to comment on all the trigs.
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
      return new c((-2 * k(a) * Math.cos(b)) / d, (2 * h(a) * Math.sin(b)) / d);
    },
    sech: function () {
      const a = this.re,
        b = this.im,
        d = Math.cos(2 * b) + h(2 * a);
      return new c((2 * h(a) * Math.cos(b)) / d, (-2 * k(a) * Math.sin(b)) / d);
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
      //If you hate division
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
      //If you hate subtraction
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
        Math.abs(a.re - this.re) <= c.EPSILON && //Small error just in case.
        Math.abs(a.im - this.im) <= c.EPSILON
      );
    },
    clone: function () {
      //For the OG Complex.js
      return new c(this.re, this.im);
    },
    toString: function () {
      /** Check later to see why */
      if (this.isNaN()) return "NaN";
      if (this.isInfinite()) return "Infinity";
      let a = this.re,
        b = this.im,
        d = "";
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
      //Arrays
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
    /**
        The following are custom methods for this very job. Here are the:
    */
    mod: function (a, b) {
      //Short for modulus. Expect the remainder of their division.
      a = new c(a, b);
      b = this.div(a);
      return this.sub(a.mul(Math.floor(b.re), Math.floor(b.im)));
    },
    cis: function () {
      //Extension of the parser's arg/phi. Expect the complex angle.
      let cs = Math.exp(-this.im);
      return new c(Math.cos(this.re) * cs, Math.sin(this.re) * cs);
    },
    dir: function () {
      //Short for Direction. Don't ask why.
      return this.sign().log().mul(0, -1);
    },
    /*
    inverse: function () {
      if (this.isZero()) return c.INFINITY;
      if (this.isInfinite()) return c.ZERO;
      const a = this.re,
        b = this.im,
        d = a * a + b * b;
      return new c(a / d, -b / d);
    },*/
    trunc: function (a) {
      //Short for Truncation. It erases all decimals
      a = Math.pow(10, a || 0);
      return new c(Math.trunc(this.re * a) / a, Math.trunc(this.im * a) / a);
    },
  };
  c.ZERO = new c(0, 0);
  c.ONE = new c(1, 0);
  c.INFINITY = new c(Infinity, Infinity);
  c.NAN = new c(NaN, NaN);
  c.EPSILON = 5e-16;
  c.SQRT2PI = new c(Math.sqrt(2 * Math.PI));
  c.ROOT3 = new c(-0.5, 0.8660254037844386);
  c.GOLDEN = new c(1.618033988749895);
  c.SILVER = new c(-0.618033988749895);
  const Complex = c;

  var P = [
    Complex(0.99999999999980993),
    Complex(676.5203681218851),
    Complex(-1259.1392167224028),
    Complex(771.32342877765313),
    Complex(-176.61502916214059),
    Complex(12.507343278686905),
    Complex(-0.13857109526572012),
    Complex(9.9843695780195716e-6),
    Complex(1.5056327351493116e-7),
  ];

  function gamma(a, b) {
    var z = new c(a, b);
    z = z.sub(1);
    var x = P[0];
    var t = z.add(7.5);
    for (var i = 1; i < P.length; i++) {
      x = x.add(P[i].div(z.add(i)));
    }
    return c.SQRT2PI.mul(t.pow(z.add(0.5)))
      .mul(t.neg().exp())
      .mul(x);
  }

  function classicFac(x) {
    // 1*2*3*4*...*x
    if (x < 0) return Infinity;
    if (x == 0 || x == 1) return 1;
    return classicFac(x - 1) * x;
  }
  function factorial(z, t) {
    if (Number.isInteger(z)) return classicFac(z);
    for (let i = 1; i <= t; i++) {
      const numerator = c(1 + 1 / i).pow(z);
      const denominator = z.div(i).add(1);
      if (denominator.equals(0)) {
        throw new Error(`Division by zero at i=${i}`);
      }
      z = z.mul(numerator.div(denominator));
    }
    return z;
  }
  const menuIconURI =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAYAAAB/HSuDAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAK3mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuYTFjZDEyZiwgMjAyNC8xMS8xMS0xOTowODo0NiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjQgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNS0wNC0wNlQxOTowMDozNy0wNTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjUtMDUtMTRUMTE6MDE6NTctMDU6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjUtMDUtMTRUMTE6MDE6NTctMDU6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIyZGNlNDc4LWM2ZWItNTM0Ny04MDQ1LTc2NWE5MmQyMzJhOSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjdkYzllZDA2LTUxYzUtMTY0MC1hNzA0LWM1MjVmNTkzODM2YiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjU3MjAzODFmLWFlM2QtODE0ZC05NDUzLTdkYjlhOGM3NWUxNiIgdGlmZjpPcmllbnRhdGlvbj0iMSIgdGlmZjpYUmVzb2x1dGlvbj0iOTYwMDAwLzEwMDAwIiB0aWZmOllSZXNvbHV0aW9uPSI5NjAwMDAvMTAwMDAiIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiIGV4aWY6Q29sb3JTcGFjZT0iNjU1MzUiIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIxMDI0IiBleGlmOlBpeGVsWURpbWVuc2lvbj0iMTAyNCI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NTcyMDM4MWYtYWUzZC04MTRkLTk0NTMtN2RiOWE4Yzc1ZTE2IiBzdEV2dDp3aGVuPSIyMDI1LTA0LTA2VDE5OjAwOjM3LTA1OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjYuNCAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBpbWFnZS9wbmcgdG8gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzM2MjJlNTAtMjY3Ni0zNzQ1LTg0MWQtOWJjZjhmMGE1OWUyIiBzdEV2dDp3aGVuPSIyMDI1LTA0LTIyVDE2OjUxOjMwLTA1OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjYuNCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmJmZjdhNWMxLTY3ODQtZjA0YS05ZmJjLWU5ZDU0ZGEyZmE2ZCIgc3RFdnQ6d2hlbj0iMjAyNS0wNS0xNFQxMTowMTo1Ny0wNTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI2LjQgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyMmRjZTQ3OC1jNmViLTUzNDctODA0NS03NjVhOTJkMjMyYTkiIHN0RXZ0OndoZW49IjIwMjUtMDUtMTRUMTE6MDE6NTctMDU6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNi40IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YmZmN2E1YzEtNjc4NC1mMDRhLTlmYmMtZTlkNTRkYTJmYTZkIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MGRmMTlmNjctMTQxYi01MTQ1LTlhYTItMTc0YjFk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";

  const converter = {
    _all: ["degs to rads", "π", "rads to degs"],
    "degs to rads": 0.017453292519943295,
    π: 3.141592653589793,
    "rads to degs": 57.29577951308232,
  };

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
      this.noSpacing = false;
      this.advanced = false;
      this.devTools = true; /**** DON'T SET TO FALSE ****/
      this.terms = 100000; /** ignore pls **/
      try {
        console.log("Loading Complexify...");
        console.log(window);
        if (typeof window.Complex !== "undefined") {
          this.Complex = window.Complex;
          console.log("Complexified Successfully! Hooray!");
        } else {
          console.log("The complex is out of the window!");
        }
      } catch (e) {
        console.log("Complexify had a complex error!");
        console.log(e);
      }
      if (!this) {
        console.error(
          "`this` isn't bounded enough for the complex constructor"
        );
      }
    }

    getInfo() {
      return {
        id: "kenayComplexify",
        name: Scratch.translate("Complexify!"),
        docsURI:
          "https://sites.google.com/view/complexity/complexity/complexify-js/",
        color1: "#77549f",
        menuIconURI,
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("The protagonist"),
          },
          {
            opcode: "Complexity",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("complex [REAL] [IMAG]"),
            arguments: {
              REAL: { type: Scratch.ArgumentType.NUMBER, defaultValue: "3" },
              IMAG: { type: Scratch.ArgumentType.NUMBER, defaultValue: "4" },
            },
          },
          {
            blockType: Scratch.BlockType.BUTTON,
            func: "toggleAdvancedBlocks",
            text: this.advanced
              ? "Show Advanced Blocks"
              : "Hide Advanced Blocks",
            hideFromPalette: this.devTools,
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Rectangular Tools"),
          },
          {
            opcode: "rectComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[REAL] + [IMAG] i"),
            arguments: {
              REAL: { type: Scratch.ArgumentType.STRING, defaultValue: "3" },
              IMAG: { type: Scratch.ArgumentType.STRING, defaultValue: "4" },
            },
          },
          {
            opcode: "reComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("real part of [COMPLEX]"),
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
            text: Scratch.translate("imaginary part of [COMPLEX]"),
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
            text: Scratch.translate("conjugate of [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("The Binary operations"),
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
            text: Scratch.translate("[COMPLEX1] x [COMPLEX2]"),
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
          "---",
          {
            opcode: "moduloComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[COMPLEX1] mod [COMPLEX2]"),
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
            hideFromPalette: this.advanced,
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
            hideFromPalette: this.advanced,
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
            hideFromPalette: this.advanced,
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
            hideFromPalette: this.advanced,
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("The Polar Tools"),
          },
          {
            opcode: "polarComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("polar [RADIUS] ∠ [ANGLE]"),
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
            text: Scratch.translate("magnitude of [COMPLEX]"),
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
            text: Scratch.translate("sign of [COMPLEX]"),
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
            text: Scratch.translate("argument of [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
            },
            hideFromPalette: this.advanced,
          },
          "---",
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("The Spacing"),
            hideFromPalette: this.advanced,
          },
          {
            opcode: "stateSpacing",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("spacing"),
            hideFromPalette: this.advanced,
          },
          {
            opcode: "switchSpacing",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[Sw] spacing"),
            arguments: {
              Sw: { type: Scratch.ArgumentType.STRING, menu: "spacing" },
            },
            hideFromPalette: this.advanced,
          },
          "---",
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("The Unary Operations"),
          },
          {
            opcode: "negComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("negative [COMPLEX]"),
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
            text: Scratch.translate("inverse [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
            },
            description: "Inverses the Complex",
          },
          {
            opcode: "expComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("exp [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
            },
            hideFromPalette: this.advanced,
          },
          {
            opcode: "sqrtComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("sqrt of [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
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
            hideFromPalette: this.advanced,
          },
          "---",
          {
            filter: [Scratch.TargetType.SPRITE], //Just in case
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("The Motion"),
          },
          {
            filter: [Scratch.TargetType.SPRITE],
            opcode: "getPosition",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("complex Position"),
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
            hideFromPalette: this.advanced,
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
            hideFromPalette: this.advanced,
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
            hideFromPalette: this.advanced,
          },
          "---",
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("The Trigonometry"),
            hideFromPalette: this.advanced,
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
            hideFromPalette: this.advanced,
          },
          {
            opcode: "convertComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("find [ANGLE] [TOSMTH]"),
            arguments: {
              ANGLE: { type: Scratch.ArgumentType.STRING, defaultValue: "30" },
              TOSMTH: { type: Scratch.ArgumentType.STRING, menu: "angles" },
            },
            hideFromPalette: this.advanced,
          },
          "---",
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("The Equalities"),
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
            text: Scratch.translate("The Strings"), //For others extensions to use
            blockType: Scratch.BlockType.LABEL,
            hideFromPalette: this.advanced,
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
            hideFromPalette: this.advanced,
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
            hideFromPalette: this.advanced,
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("The LeftOvers"),
          },
          {
            opcode: "decimalComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "[OPERATION] [COMPLEX] to [DECIMALS] decimals"
            ),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3.000004+3.999996i",
              },
              OPERATION: {
                type: Scratch.ArgumentType.STRING,
                menu: "decTools",
              },
              DECIMALS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 4,
              },
            },
            hideFromPalette: this.advanced,
          },
          {
            opcode: "rootNo3",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("ω"),
            hideFromPalette: this.advanced,
          },
          {
            opcode: "goldenComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("φ"),
            hideFromPalette: this.advanced,
          },
          "---",
          {
            opcode: "fibonacciComplex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Fibonacci [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
            },
            hideFromPalette: this.advanced,
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
            hideFromPalette: this.advanced,
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
            hideFromPalette: this.advanced,
          },
          {
            opcode: "smallEnough",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Pretty small"),
          },
          "---",
          {
            opcode: "gammaAprox",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("aprox. Γ [COMPLEX]"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
            },
            hideFromPalette: this.advanced,
          },
          {
            opcode: "facOf",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("aprox. [COMPLEX]!"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "3+4i",
              },
            },
            hideFromPalette: this.devTools,
          },
          {
            opcode: "Tfac",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("factorial terms"),
            hideFromPalette: this.devTools,
          },
          {
            opcode: "setTfac",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [COMPLEX] factorial terms"),
            arguments: {
              COMPLEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2000,
              },
            },
            hideFromPalette: this.devTools,
          },
          {
            opcode: "empty",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("rem [smth]"),
            color1: "#FFF099",
            arguments: {
              smth: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "does nothing",
              },
            },
            hideFromPalette: this.devTools,
          },
          {
            opcode: "empty2",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("all [smth] blocks"),
            arguments: {
              smth: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "type",
              },
            },
            hideFromPalette: this.devTools,
          },
          {
            opcode: "empty3",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("and all [smth] blocks"),
            arguments: {
              smth: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "type",
              },
            },
            hideFromPalette: this.devTools,
          },
        ],
        menus: {
          spacing: {
            //For switchSpacing
            acceptReporters: true,
            items: ["switch", "turn on", "turn off"],
          },
          trigs: {
            //For trigOfComplex
            acceptReporters: true,
            items: this.trig,
          },
          angles: {
            //For convertComplex
            acceptReporters: true,
            items: converter._all,
          },
          decTools: {
            //For decimalComplex
            acceptReporters: true,
            items: ["round", "ceil of", "floor of", "truncate"],
          },
        },
      };
    }

    empty() {}
    empty2() {}
    empty3() {}

    /**
	We'll use toString() to return the Complex number with the **desired** math notation. 

	[@Brackets-Coder]: May I ask why this is the case?

	I see no problem.
	If you remember Complex is a class, you know it'll returns objects.
 	Complex(-5, 1) might mean "-5+i", but it's actually a {re: -5, im: 1} in a really silly complex wrapper.
	Rawify already made a .toString() method to get "-5+i", and we wanna use that.

	So, we don't want "{re: -5, im: 1}", "[-5,1]" or weird "[object c]" thingies. We want "-5+i" _as is_.
	Its pre-built .toString() method is the best option for this goal, to this very day.
	Thus, no Scratch.Cast.toString() or anything as silly as that, because **.toString() will always do**.

	Or, as [@yuri-kiss] said: We know the value it returns is going to be a string 'cause it's .toString().
*/

    Complexity({ REAL, IMAG }) {
      REAL = Scratch.Cast.toNumber(REAL);
      IMAG = Scratch.Cast.toNumber(IMAG);
      try {
        var r = Complex(REAL, IMAG).toString(); //Look!
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    rectComplex({ REAL, IMAG }) {
      try {
        var r = Complex(IMAG).mul("i").add(REAL).toString();
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
        var r = Complex(COMPLEX1).add(COMPLEX2).toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    subtractComplex({ COMPLEX1, COMPLEX2 }) {
      try {
        var r = Complex(COMPLEX1).sub(COMPLEX2).toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    multiplyComplex({ COMPLEX1, COMPLEX2 }) {
      try {
        var r = Complex(COMPLEX1).mul(COMPLEX2).toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    divideComplex({ COMPLEX1, COMPLEX2 }) {
      try {
        var r = Complex(COMPLEX1).div(COMPLEX2).toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    moduloComplex({ COMPLEX1, COMPLEX2 }) {
      try {
        var r = Complex(COMPLEX1).mod(COMPLEX2).toString();
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
        var r = Complex(ANGLE).cis().mul(RADIUS).toString();
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
        var r = Complex(ANGLE).cis().toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    argComplex({ COMPLEX }) {
      try {
        return Complex(COMPLEX).dir();
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    powComplex({ COMPLEX1, COMPLEX2 }) {
      try {
        var r = Complex(COMPLEX1).pow(COMPLEX2).toString();
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
      const cInstance = Complex(util.target.x, util.target.y).add(args.COMPLEX);
      util.target.setXY(cInstance.re, cInstance.im);
    }

    goToPolar(args, util) {
      if (util.target.isStage) return;
      const cInstance = Complex(args.ANGLY).cis().mul(args.RADII);
      util.target.setXY(cInstance.re, cInstance.im);
    }

    GoMulComplex(args, util) {
      if (util.target.isStage) return;
      const cInstance = Complex(util.target.x, util.target.y).mul(args.COMPLEX);
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
          if (result.isNaN()) {
            if (cInstance.isNaN()) return "NaN";
            return "Infinity";
          }
          var r = result.toString();
          if (this.noSpacing) r = r.replace(/\s+/g, "");
          return r;
        } else {
          return NaN;
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
        var r = Complex(ANGLE).mul(converter[TOSMTH]).toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return 0;
      }
    }

    decimalComplex({ COMPLEX, OPERATION, DECIMALS }) {
      const complex = Complex(COMPLEX);
      OPERATION = OPERATION.toLowerCase();
      let D = DECIMALS;
      var r;
      switch (OPERATION) {
        case "round up":
        case "round":
          r = complex.round(D).toString();
          break;
        case "ceil of":
        case "ceil":
          r = complex.ceil(D).toString();
          break;
        case "floor of":
        case "floor":
          r = complex.floor(D).toString();
          break;
        case "truncate":
        case "trunc":
          r = complex.trunc(D).toString();
          break;
        default:
          return NaN;
      }
      if (this.noSpacing) r = r.replace(/\s+/g, "");
      return r;
    }

    equalsComplex({ COMPLEX1, COMPLEX2 }) {
      try {
        return Complex(COMPLEX1).equals(COMPLEX2);
      } catch (e) {
        console.log(e);
        return false;
      }
    }

    isNaNComplex({ COMPLEX }) {
      try {
        return COMPLEX == "NaN" || Complex(COMPLEX).isNaN();
      } catch (e) {
        console.log(e);
        return false;
      }
    }

    isFiniteComplex({ COMPLEX }) {
      try {
        return COMPLEX != "Infinity" || Complex(COMPLEX).isFinite();
      } catch (e) {
        console.log(e);
        return false;
      }
    }

    complexArray({ COMPLEX }) {
      try {
        return JSON.stringify(Complex(COMPLEX).toVector());
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    complexJSON({ COMPLEX }) {
      try {
        return JSON.stringify(Complex(COMPLEX));
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    mulVectorAroundPoint({ VECTOR, POINT, FACTOR }) {
      try {
        var r = Complex(VECTOR).sub(POINT).mul(FACTOR).add(POINT).toString();
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
          .sub(POINT)
          .mul(Complex(ANGLE).cis())
          .add(POINT)
          .toString();
        if (this.noSpacing) r = r.replace(/\s+/g, "");
        return r;
      } catch (e) {
        console.log(e);
        return NaN;
      }
    }

    rootNo3() {
      if (this.noSpacing) return "-0.5+0.8660254037844386i";
      return "-0.5 + 0.8660254037844386i";
    }
    smallEnough() {
      return c.EPSILON;
    }
    goldenComplex() {
      return "1.618033988749895";
    }

    fibonacciComplex({ COMPLEX }) {
      var r = c.GOLDEN.pow(COMPLEX)
        .sub(c.SILVER.pow(COMPLEX))
        .div(2.23606797749979)
        .toString();
      if (this.noSpacing) r = r.replace(/\s+/g, "");
      return r;
    }

    toggleAdvancedBlocks() {
      this.advanced = !this.advanced;
      this.devTools = true;
      Scratch.vm.extensionManager.refreshBlocks();
    }

    /**
	The following is the v3 of the Factorial function. 
	The day it's fast, efficient and right, it'll see the light of day.
  */

    gammaAprox({ COMPLEX }) {
      //Used in the extension
      var r = gamma(COMPLEX).toString();
      if (this.noSpacing) r = r.replace(/\s+/g, "");
      return r;
    }

    facOf({ COMPLEX }) {
      try {
        var r = factorial(Complex(COMPLEX), this.terms).toString();
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
    setTfac({ COMPLEX }) {
      let ZED = Scratch.Cast.toNumber(COMPLEX);
      if (ZED < 0) return;
      if (Number.isInteger(ZED)) {
        this.terms = ZED;
      } else {
        this.terms = Math.trunc(ZED);
      }
    }
  }

  //Gradient Patch by 0znzw & SharkPool [thanks]
  if (Scratch.gui)
    Scratch.gui.getBlockly().then((SB) => {
      const svg = document.createElement("div");
      svg.innerHTML = `<svg><defs>
        <linearGradient x1="50" y1="0" x2="150" y2="50" gradientUnits="userSpaceOnUse" id="kenayComplexify-GRAD">
        <stop offset="0" stop-color="#9465bf"/><stop offset="0.5" stop-color="#893fbc"/></linearGradient>
      </defs></svg>`; //Remember the id!
      document.body.appendChild(svg);
      if (!SB?.SPgradients?.patched)
        //{
        // Patching...
        SB.SPgradients = { gradientUrls: {}, patched: false };
      const BSP = SB.BlockSvg.prototype,
        BSPR = BSP.render;
      BSP.render = function (...args) {
        /* calls the global ReduxStore */
        const res = BSPR.apply(this, args);
        let category;
        if (
          this?.svgPath_ &&
          this?.category_ &&
          (category = this.type.slice(0, this.type.indexOf("_"))) &&
          SB.SPgradients.gradientUrls[category]
        ) {
          // Cool checks, could we add more?
          this.svgPath_.setAttribute("fill", "url(#kenayComplexify-GRAD)"); //gradient id
        }
        return res;
      };
      SB.SPgradients.patched = true;
      //}
      SB.SPgradients.gradientUrls["kenayComplexify"] = [
        "url(#kenayComplexify-GRAD)",
      ]; //ext id, gradient id
    });

  Scratch.extensions.register(new ComplexityExtension());
})(Scratch);
