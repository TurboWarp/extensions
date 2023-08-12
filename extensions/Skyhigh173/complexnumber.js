(function(Scratch){
  'use strict';

  // round small values to 0 -- floating point error
  let CFG_TOPC = 14;
  let rd = x => CFG_TOPC == -1 || x > 1e200 ? x : Math.round(x * 10 ** CFG_TOPC) / 10 ** CFG_TOPC;

  /* output mode
  ** string - normal       - a+bi
  ** raw string - raw str  - !a|b
  ** JSON - json           - {}
  */
  let CFG_OUT = 'string';

  class ComplexNumber {
    constructor (r = 0, i = 0) {
      this.r = r;
      this.i = i;
    }

    static get NAN() {
      return new ComplexNumber(NaN, NaN);
    }

    static fromStr(x = '0') {
      // raw string
      if (x.charAt(0) == '!') {
        const y = x.slice(1).split('|');
        return new ComplexNumber(Number(y[0]),Number(y[1]));
      }
      // JSON
      if (x.charAt(0) == '{') {
        try {
          const y = JSON.parse(x);
          return new ComplexNumber(y.r, y.i);
        } catch {
          return ComplexNumber.NAN;
        }
      }

      if (x ==  'i') return new ComplexNumber(0, 1);
      if (x == '-i') return new ComplexNumber(0,-1);

      let tmp = Number(x);
      if (!Number.isNaN(tmp)) return new ComplexNumber(tmp);
      tmp = Number(x.slice(0,-1));
      if (x.endsWith('i') && !Number.isNaN(tmp)) return new ComplexNumber(0,tmp);

      //// case 1:
      // match + or -            (0~1)
      // match numbers 0-9       (1~)
      // if match '.'            (0~1)
      /// then match numbers 0-9 (1~)
      // if match 'e'            (0~1)
      /// then match numbers 0-9 (1~)
      // match 'i'               (0~1)
      //// case 2:
      // match 'i'               (1)
      //// case 3:
      // match '-i'              (1)
      const numbers = /((-|\+)?(\d+)(\.\d+)?(e(-|\+)?\d+)?i?)|i|-i/g;

      let result = [];
      const matched = [...x.matchAll(numbers)];
      for (let i = 0; i < matched.length; i++) {
        result.push(matched[i][0]);
      }

      var simplifyI = X => {
        if (X == 'i')  return  1;
        if (X == '-i') return -1;
        return Number(X.slice(0,-1));
      };

      if (result.length == 1) {
        result = result[0];
        if (result.slice(-1) == 'i') return new ComplexNumber(0, simplifyI(result));
        return new ComplexNumber(Number(result));
      }
      if (result.length == 2) {
        if (result[1].slice(-1) == 'i') return new ComplexNumber(Number(result[0]), simplifyI(result[1]));
        if (result[0].slice(-1) == 'i') return new ComplexNumber(Number(result[1]), simplifyI(result[0]));
      }
      console.warn(`invalid complex number ${x} | match ${JSON.stringify(matched)}, regex length ${result.length}`); return ComplexNumber.NAN;

    }

    get ZERO() {
      return new ComplexNumber(0,0);
    }
    get ONE() {
      return new ComplexNumber(1, 0);
    }
    get TWO() {
      return new ComplexNumber(2, 0);
    }
    get TEN() {
      return new ComplexNumber(10, 0);
    }
    get HALF() {
      return new ComplexNumber(0.5, 0);
    }
    get I() {
      return new ComplexNumber(0, 1);
    }
    get PI() {
      return new ComplexNumber(Math.PI, 0);
    }

    get E() {
      return new ComplexNumber(Math.E, 0);
    }

    get isZero() {
      return this.r == 0 && this.i == 0;
    }

    formatImaginary(prefix = '') {
      const i = rd(this.i);
      if (i ==  0) return '';
      if (i ==  1) return prefix + 'i';
      if (i == -1) return '-i';

      return `${i > 0 ? prefix : ''}${i}i`;
    }

    toStr(useStr = false) {

      if (useStr || CFG_OUT == 'string' || (rd(this.i) == 0 && CFG_OUT != 'JSON')) {
        const r = rd(this.r);
        if (Number.isNaN(r) || Number.isNaN(this.i)) return 'NaN';
        if (rd(this.i) == 0) return `${r}`;
        if (r == 0) return this.formatImaginary();
        return `${r}${this.formatImaginary('+')}`;

      } else if (CFG_OUT == 'raw string') {
        return `!${this.r}|${this.i}`;
      } else if (CFG_OUT == 'JSON') {
        return JSON.stringify({r: this.r, i: this.i});
      } else {
        console.warn(`invalid mode ${CFG_OUT}`);
      }
    }

    ppow2() {
      // r^2 + i^2
      return this.r ** 2 + this.i ** 2;
    }

    add(that) {
      return new ComplexNumber(this.r + that.r, this.i + that.i);
    }

    add1() {
      return this.add(this.ONE);
    }

    sub(that) {
      return new ComplexNumber(this.r - that.r, this.i - that.i);
    }

    sub1() {
      return this.sub(this.ONE);
    }

    neg() {
      return this.ZERO.sub(this);
    }

    mul(that) {
      return new ComplexNumber(this.r * that.r - this.i * that.i, this.i * that.r + this.r * that.i);
    }

    mul2() {
      return this.mul(this.TWO);
    }

    muli() {
      return this.mul(this.I);
    }

    div(that) {
      const x = that.ppow2();
      return new ComplexNumber((this.r * that.r + this.i * that.i) / x, (this.i * that.r - this.r * that.i) / x);
    }

    div2() {
      return this.div(this.TWO);
    }

    inv() {
      return this.ONE.div(this);
    }

    abs() {
      return Math.sqrt(this.ppow2());
    }

    arg() {
      return Math.atan2(this.i, this.r);
    }

    exp() {
      // e^re (cos im + i sin im)
      const e = Math.exp(this.r);
      return new ComplexNumber(e * Math.cos(this.i), e * Math.sin(this.i));
    }

    ln() {
      // 1/2*ln(ppow2)+ i*arg(z)
      return new ComplexNumber(1 / 2 * Math.log(this.ppow2()), this.arg());
    }

    pow(that) {
      // exp(ln(a) * b)
      if (this.isZero && that.isZero) return this.ONE;
      if (this.isZero) return this.ZERO;
      return (this.ln().mul(that)).exp();
    }

    square() {
      return this.mul(this);
    }

    sqrt() {
      return this.pow(this.HALF);
    }

    cbrt() {
      return this.pow(new ComplexNumber(1 / 3));
    }

    sinh() {
      // (e^z - e^(-z)) / 2
      return (this.exp().sub(this.neg().exp())).div2();
    }

    cosh() {
      // (e^z + e^(-z)) / 2
      return (this.exp().add(this.neg().exp())).div2();
    }

    tanh() {
      // (e^(2z)-1)/(e^(2z)+1)
      const e2z = this.mul2().exp();
      return (e2z.sub1()).div(e2z.add1());
    }

    coth() {
      // 1/tanh
      const e2z = this.mul2().exp();
      return (e2z.add1()).div(e2z.sub1());
    }

    sech() {
      // 2e^z / (e^(2x)+1)
      return this.exp().mul2().div(this.mul2().exp().add1());
    }

    csch() {
      // 1/sinh
      return (this.exp().mul2()).div(this.mul2().exp().sub1());
    }

    log10() {
      return this.ln().div(new ComplexNumber(Math.LN10));
    }

    log2() {
      return this.ln().div(new ComplexNumber(Math.LN2));
    }

    sin()  {
      // -i sinh(iz)
      return this.muli().sinh().muli().neg();
    }

    cos() {
      // cosh(iz)
      return this.muli().cosh();
    }

    tan() {
      // sin / cos
      return this.sin().div(this.cos());
    }

    arcsin() {
      // -i ln(iz + sqrt(1-z2))
      const sqrt = this.ONE.sub(this.square()).sqrt();
      return (this.muli().add(sqrt)).ln().muli().neg();
    }

    arccos() {
      // -i ln(z + sqrt(z2-1))
      const sqrt = this.square().sub1().sqrt();
      return (this.add(sqrt)).ln().muli().neg();
    }

    arctan() {
      // i/2 ln((1-iz)/(1+iz))
      const i2 = this.I.div2();
      const iz = this.muli();
      return i2.mul((this.ONE.sub(iz)).div(iz.add1()).ln());
    }

    factorial() {
      // factorial of complex numbers
      // algorithm: Γ function / approx.
      const SIX = new ComplexNumber(6);
      const EIG = new ComplexNumber(810);
      const T = this.add1();
      const sqrt1 = this.PI.mul2().div(T).sqrt();
      const sqrt2 = T.mul(T.inv().sinh()).add((T.pow(SIX).mul(EIG)).inv()).sqrt();
      return sqrt1.mul(T.div(this.E).mul(sqrt2).pow(T));
    }

    conjg() {
      // a-bi
      return new ComplexNumber(this.r, -this.i);
    }

    iabs() {
      // abs(a)+abs(b)i
      return new ComplexNumber(Math.abs(this.r), Math.abs(this.i));
    }

    sign() {
      if (this.r == 0 && this.i == 0) return this.ZERO;
      return this.div(new ComplexNumber(this.abs()));
    }

    equal(that) {
      return this.r == that.r && this.i == that.i;
    }
  }

  ComplexNumber.prototype.toString = function() {
    return this.toStr();
  };

  class ComplexNumberExtension {
    getInfo() {
      return {
        id: 'skyhigh173ComplexNumber',
        name: 'Complex Number',
        color1: '#9999FF',
        blocks: [
          {
            opcode: 'setout',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set output mode to [MODE]',
            arguments: {
              MODE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'string',
                menu: 'out'
              }
            }
          },
          {
            opcode: 'getout',
            blockType: Scratch.BlockType.REPORTER,
            text: 'output mode'
          },
          {
            opcode: 'toStr',
            blockType: Scratch.BlockType.REPORTER,
            text: 'complex [T] to string',
            arguments: {
              T: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"r":0,"i":0}'
              }
            }
          },
          '---',
          {
            opcode: 'from',
            blockType: Scratch.BlockType.REPORTER,
            text: '[R] + [I]i to complex',
            arguments: {
              R: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              I: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: -1
              }
            }
          },
          '---',
          {
            opcode: 'add',
            blockType: Scratch.BlockType.REPORTER,
            text: '[A] + [B]',
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1-i'
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '2+3i'
              }
            }
          },
          {
            opcode: 'sub',
            blockType: Scratch.BlockType.REPORTER,
            text: '[A] - [B]',
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1-i'
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '2+3i'
              }
            }
          },
          {
            opcode: 'mul',
            blockType: Scratch.BlockType.REPORTER,
            text: '[A] * [B]',
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1-i'
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '2+3i'
              }
            }
          },
          {
            opcode: 'div',
            blockType: Scratch.BlockType.REPORTER,
            text: '[A] / [B]',
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1-i'
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '2+3i'
              }
            }
          },
          {
            opcode: 'pow',
            blockType: Scratch.BlockType.REPORTER,
            text: '[A] ^ [B]',
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1-i'
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '2+3i'
              }
            }
          },
          {
            opcode: 'eq',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[A] = [B]',
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1-i'
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1-i'
              }
            }
          },
          '---',
          {
            opcode: 'unaryop',
            blockType: Scratch.BlockType.REPORTER,
            text: '[M] [A]',
            arguments: {
              M: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'abs',
                menu: 'unary'
              },
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '2+3i'
              }
            }
          },
          {
            opcode: 'trigop',
            blockType: Scratch.BlockType.REPORTER,
            text: '[M] [A]',
            arguments: {
              M: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'sin',
                menu: 'trig'
              },
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '2+3i'
              }
            }
          },
          {
            opcode: 'getpart',
            blockType: Scratch.BlockType.REPORTER,
            text: '[M] [A]',
            arguments: {
              M: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 're',
                menu: 'part'
              },
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '2+3i'
              }
            }
          },
          {
            opcode: 'factorial',
            blockType: Scratch.BlockType.REPORTER,
            text: '[A]!',
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '2+3i'
              }
            }
          },
        ],
        menus: {
          unary: {
            acceptReporters: true,
            items: ['abs','arg','neg','inv','muli','iabs','sign','exp','ln','log10','log2','square','sqrt','cbrt','conjg']
          },
          part: {
            acceptReporters: true,
            items: ['re','im']
          },
          trig: {
            acceptReporters: true,
            items: ['sin','cos','tan','arcsin','arccos','arctan','sinh','cosh','tanh','coth','sech','csch']
          },
          out: {
            items: ['string', 'raw string', 'JSON']
          }
        }
      };
    }

    setout(arg) {
      CFG_OUT = arg.MODE;
    }

    getout() {
      return CFG_OUT;
    }

    toStr(arg) {
      return ComplexNumber.fromStr(Scratch.Cast.toString(arg.T)).toStr(true);
    }

    /////////////////////////////////////////

    from(arg) {
      const R = Scratch.Cast.toNumber(arg.R);
      const I = Scratch.Cast.toNumber(arg.I);

      return new ComplexNumber(R, I).toStr();
    }

    ////////////////////////////////////////////////////////////////

    add(arg) {
      const A = ComplexNumber.fromStr(Scratch.Cast.toString(arg.A));
      const B = ComplexNumber.fromStr(Scratch.Cast.toString(arg.B));
      return A.add(B).toStr();
    }

    sub(arg) {
      const A = ComplexNumber.fromStr(Scratch.Cast.toString(arg.A));
      const B = ComplexNumber.fromStr(Scratch.Cast.toString(arg.B));
      return A.sub(B).toStr();
    }

    mul(arg) {
      const A = ComplexNumber.fromStr(Scratch.Cast.toString(arg.A));
      const B = ComplexNumber.fromStr(Scratch.Cast.toString(arg.B));
      return A.mul(B).toStr();
    }

    div(arg) {
      const A = ComplexNumber.fromStr(Scratch.Cast.toString(arg.A));
      const B = ComplexNumber.fromStr(Scratch.Cast.toString(arg.B));
      return A.div(B).toStr();
    }

    pow(arg) {
      const A = ComplexNumber.fromStr(Scratch.Cast.toString(arg.A));
      const B = ComplexNumber.fromStr(Scratch.Cast.toString(arg.B));
      return A.pow(B).toStr();
    }

    eq(arg) {
      const A = ComplexNumber.fromStr(Scratch.Cast.toString(arg.A));
      const B = ComplexNumber.fromStr(Scratch.Cast.toString(arg.B));
      return A.equal(B);
    }

    unaryop(arg) {
      const m = arg.M;
      const A = ComplexNumber.fromStr(Scratch.Cast.toString(arg.A));

      switch (m) {
        case 'abs':    return A.abs();
        case 'arg':    return A.arg();
        case 'neg':    return A.neg().toStr();
        case 'inv':    return A.inv().toStr();
        case 'muli':   return A.muli().toStr();
        case 'iabs':   return A.iabs().toStr();
        case 'sign':   return A.sign().toStr();
        case 'exp':    return A.exp().toStr();
        case 'ln':     return A.ln().toStr();
        case 'log10':  return A.log10().toStr();
        case 'log2':   return A.log2().toStr();
        case 'square': return A.square().toStr();
        case 'sqrt':   return A.sqrt().toStr();
        case 'cbrt':   return A.cbrt().toStr();
        case 'conjg':  return A.conjg().toStr();
      }
      return ComplexNumber.NAN;
    }

    trigop(arg) {
      const m = arg.M;
      const A = ComplexNumber.fromStr(Scratch.Cast.toString(arg.A));

      switch (m) {
        case 'sin': return A.sin().toStr();
        case 'cos': return A.cos().toStr();
        case 'tan': return A.tan().toStr();
        case 'arcsin': return A.arcsin().toStr();
        case 'arccos': return A.arccos().toStr();
        case 'arctan': return A.arctan().toStr();
        case 'sinh': return A.sinh().toStr();
        case 'cosh': return A.cosh().toStr();
        case 'tanh': return A.tanh().toStr();
        case 'coth': return A.coth().toStr();
        case 'sech': return A.sech().toStr();
        case 'csch': return A.csch().toStr();
      }
      return ComplexNumber.NAN;
    }


    getpart(arg) {
      const m = arg.M;
      const A = ComplexNumber.fromStr(Scratch.Cast.toString(arg.A));

      switch (m) {
        case 're': return A.r;
        case 'im': return A.i;
      }
      return ComplexNumber.NAN;
    }

    factorial(arg) {
      const A = ComplexNumber.fromStr(Scratch.Cast.toString(arg.A));
      return A.factorial().toStr();
    }
  }

  // for tests, if u changed fromStr
  let tests = () => {
    let make = (str, r, i) => console.assert(ComplexNumber.fromStr(str).equal(new ComplexNumber(r,i)), str, ComplexNumber.fromStr(str));
    make('0',0,0);
    make('123',123,0);
    make('-123',-123,0);
    make('123.456',123.456,0);
    make('-123.456',-123.456,0);
    make('1.23e+45',1.23e+45,0);

    make('i',0,1);
    make('-i',0,-1);
    make('-2.3i',0,-2.3);
    make('-2.34e-45i',0,-2.34e-45);

    make('1-i',1,-1);
    make('1+i',1,1);
    make('1.23+4.56i',1.23,4.56);
    make('-1.234-4.56e-2i',-1.234,-4.56e-2);
    make('1.2e+4+2.3e+5i',1.2e+4,2.3e+5);
  };
  //tests();

  Scratch.extensions.register(new ComplexNumberExtension());
})(Scratch);
