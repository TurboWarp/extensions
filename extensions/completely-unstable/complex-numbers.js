(function(Scratch) {
  'use strict';
  const vm = Scratch.vm;

  class ComplexNumbers {
    c = class C extends Array {
      get re() {
        return this[0];
      }
      get im() {
        return this[1];
      }
      get abs() {
        return Math.hypot(this[0], this[1]);
      }
      get arg() {
        return Math.atan2(this[1], this[0]);
      }
      _parrallel(fn) {
        return new C(fn(this[0]), fn(this[1]));
      }
      conj() {
        return new C(this[0], -this[1]);
      }

      floor() {
        return this._parrallel(Math.floor);
      }
      ceil() {
        return this._parrallel(Math.ceil);
      }
      round() {
        return this._parrallel(Math.round);
      }
      sgn() {
        return this._parrallel(n => n / this.abs);
      }
      step() {
        return +(this[0] > 0);
      }

      recip() {
        return (den =>
          this.conj()._parrallel(n => n / den)
        )(this[0] * this[0] + this[1] * this[1]);
      }
      square() {
        return new C(
          this[0] * this[0] - this[1] * this[1],
          2 * this[0] * this[1]
        );
      }
      cube() {
        return (
          (x, y) => new C(
            x * x * x - 3 * x * y * y,
            3 * x * x * y - y * y * y
          ))(this[0], this[1]);
      }
      nadd(n) {
        return new C(this[0] + n, this[1]);
      }
      nsub(n) {
        return new C(this[0] - n, this[1]);
      }
      nmul(n) {
        return this._parrallel(m => m * n);
      }
      ndiv(n) {
        return this._parrallel(m => m / n);
      }

      npow(n) {
        return C.polar(
          Math.pow(this.abs, n),
          this.arg * n
        );
      }
      nroot(n, k = 0) {
        return C.polar(
          Math.pow(this.abs, 1 / n),
          (this.arg + 2 * k * Math.PI) / n
        );
      }

      exp() {
        return C.polar(
          Math.exp(this[0]),
          this[1]
        );
      }
      ln() {
        return new C(
          Math.log(this.abs),
          this.arg
        );
      }

      sqrt() {
        return new C(
          Math.sqrt((this.abs + this[0]) / 2),
          Math.sqrt((this.abs - this[0]) / 2) * Math.sign(this[1])
        );
      }
      cbrt() {
        return this.nroot(3);
      }

      neg() {
        return this._parrallel(n => -n);
      }

      add(z) {
        return typeof z == 'number' ?
          this.nadd(z) :
          new C(this[0] + z[0], this[1] + z[1]);
      }
      sub(z) {
        return typeof z == 'number' ?
          this.nsub(z) :
          new C(this[0] - z[0], this[1] - z[1]);
      }
      mul(z) {
        return typeof z == 'number' ?
          this.nmul(z) :
          new C(
            this[0] * z[0] - this[1] * z[1],
            this[0] * z[1] + this[1] * z[0]
          );
      }
      div(z) {
        return typeof z == 'number' ?
          this.ndiv(z) :
          new C(
            this[0] * z[0] + this[1] * z[1],
            this[0] * z[1] - this[1] * z[0]
          )._parrallel((den => n => n / den)(z[0] * z[0] + z[1] * z[1]));
      }
      pow(z) {
        return typeof z == 'number' ?
          this.npow(z) :
          this.ln().mul(z).exp();
      }
      imul() {
        return new C(-this[1], this[0]);
      }
      cis() {
        return this.imul().exp();
      }

      _cisS() {
        return this.cis().add(this.neg().cis());
      }
      _cisD() {
        return this.cis().sub(this.neg().cis());
      }
      _expS() {
        return this.exp().add(this.neg().exp());
      }
      _expD() {
        return this.exp().sub(this.neg().exp());
      }

      sin() {
        return this._cisD().imul().ndiv(-2);
      }
      cos() {
        return this._cisS().ndiv(2);
      }

      csc() {
        return this._cisD().recip().imul().nmul(2);
      }
      sec() {
        return this._cisS().recip().nmul(2);
      }

      sinh() {
        return this._expD().ndiv(2);
      }
      cosh() {
        return this._expS().ndiv(2);
      }

      csch() {
        return this._expD().recip().nmul(2);
      }
      sech() {
        return this._expS().recip().nmul(2);
      }

      tan() {
        return this._cisD().div(this._cisS()).imul().neg();
      }
      cot() {
        return this._cisS().div(this._cisD()).imul();
      }

      tanh() {
        return this.nmul(2).exp().nsub(1).div(this.nmul(2).exp().nadd(1));
      }
      coth() {
        return this.nmul(2).exp().nadd(1).div(this.nmul(2).exp().nsub(1));
      }


      constructor(re = 0, im = 0) {
        super(2);
        this[0] = +re;
        this[1] = +im;
      }
      static polar(r, theta) {
        return new C(r * Math.cos(theta), r * Math.sin(theta));
      }
      toString() {
        var [re, im] = this;
        return re == 0 ?
          im == 0 ? 0 :
          im == 1 ? 'i' :
          im == -1 ? '-i' :
          im + 'i' :
          im == 0 ? re :
          im == 1 ? re + ' + i' :
          im == -1 ? re + ' - i' :
          im < 0 ? re + ' - ' + -im + 'i' :
          re + ' + ' + im + 'i';
      }

      static fromString(str) {
        if (str.trim() == '') return 0;
        var i = 0;
        var ss = [];
        var s = '';
        while (i < str.length) {
          let char = str[i];
          if (char != ' ') {
            if ('+-'.includes(char) && '.0123456789i'.includes(s.at(-1))) {
              ss.push(s);
              s = '';
            }
            s = s + char;
          }
          i++;
        }
        if (!ss.includes(s) && s.length > 0) ss.push(s);
        if (ss[ss.length - 1] == 'i') ss[ss.length - 1] = '1i';
        if (ss[ss.length - 1] == '+i') ss[ss.length - 1] = '1i';
        if (ss[ss.length - 1] == '-i') ss[ss.length - 1] = '-1i';
        if (ss.length == 2) {
          return new C(+ss[0], +(ss[1].replace('i', '')));
        }
        if (ss[0].includes('i')) return new C(0, +(ss[0].replace('i', '')));
        return +ss[0];
      }

      static branchMaybe(z, fn1, fn2) {
        if (typeof z == 'string') z = this.fromString(z);
        return typeof z == 'number' ? fn1(z) : fn2(z);
      }

      static real(z) {
        return this.branchMaybe(z, z => z, z => z[0]);
      }
      static imag(z) {
        return this.branchMaybe(z, z => 0, z => z[1]);
      }
      static abs(z) {
        return this.branchMaybe(z, z => Math.abs(z), z => z.abs);
      }
      static arg(z) {
        return this.branchMaybe(z, z => z < 0 ? Math.PI : 0, z => z.arg);
      }
      static conj(z) {
        return this.branchMaybe(z, z => z, z => z.conj());
      }
      static floor(z) {
        return this.branchMaybe(z, z => Math.floor(z), z => z.floor());
      }
      static ceil(z) {
        return this.branchMaybe(z, z => Math.ceil(z), z => z.ceil());
      }
      static round(z) {
        return this.branchMaybe(z, z => Math.round(z), z => z.round());
      }
      static sgn(z) {
        return this.branchMaybe(z, z => Math.sign(z), z => z.sgn());
      }
      static step(z) {
        return this.branchMaybe(z, z => +(z > 0), z => z.step());
      }
      static square(z) {
        return this.branchMaybe(z, z => z * z, z => z.square());
      }
      static cube(z) {
        return this.branchMaybe(z, z => z * z * z, z => z.cube());
      }
      static sqrt(z) {
        return this.branchMaybe(z, z => Math.sqrt(z), z => z.sqrt());
      }
      static cbrt(z) {
        return this.branchMaybe(z, z => Math.cbrt(z), z => z.cbrt());
      }
      static recip(z) {
        return this.branchMaybe(z, z => 1 / z, z => z.recip());
      }
      static neg(z) {
        return this.branchMaybe(z, z => -z, z => z.neg());
      }
      static exp(z) {
        return this.branchMaybe(z, z => Math.exp(z), z => z.exp());
      }
      static ln(z) {
        return this.branchMaybe(z, z => Math.log(z), z => z.ln());
      }
      static add(z, w) {
        return this.branchMaybe(z,
          z => this.branchMaybe(w, w => z + w, w => w.nadd(z)),
          z => this.branchMaybe(w, w => z.nadd(w), w => z.add(w))
        );
      }
      static sub(z, w) {
        return this.branchMaybe(z,
          z => this.branchMaybe(w, w => z - w, w => w.neg().nadd(z)),
          z => this.branchMaybe(w, w => z.nsub(w), w => z.sub(w))
        );
      }
      static mul(z, w) {
        return this.branchMaybe(z,
          z => this.branchMaybe(w, w => z * w, w => w.nmul(z)),
          z => this.branchMaybe(w, w => z.nmul(w), w => z.mul(w))
        );
      }
      static div(z, w) {
        return this.branchMaybe(z,
          z => this.branchMaybe(w, w => z / w, w => w.recip().nmul(z)),
          z => this.branchMaybe(w, w => z.ndiv(w), w => z.div(w))
        );
      }
      static pow(z, w) {
        return this.branchMaybe(z,
          z => this.branchMaybe(w, w => Math.pow(z, w), w => w.ln().npow(z)),
          z => this.branchMaybe(w, w => z.npow(w), w => z.pow(w))
        );
      }

      static imul(z) {
        return this.branchMaybe(z, z => new C(0, z), z => z.imul());
      }
      static cis(z) {
        return this.branchMaybe(z, z => C.polar(1, z), z => z.cis());
      }
      static sin(z) {
        return this.branchMaybe(z, z => Math.sin(z), z => z.sin());
      }
      static cos(z) {
        return this.branchMaybe(z, z => Math.cos(z), z => z.cos());
      }
      static tan(z) {
        return this.branchMaybe(z, z => Math.tan(z), z => z.tan());
      }
      static csc(z) {
        return this.branchMaybe(z, z => 1 / Math.sin(z), z => z.csc());
      }
      static sec(z) {
        return this.branchMaybe(z, z => 1 / Math.cos(z), z => z.sec());
      }
      static cot(z) {
        return this.branchMaybe(z, z => 1 / Math.tan(z), z => z.cot());
      }
      static sinh(z) {
        return this.branchMaybe(z, z => Math.sinh(z), z => z.sinh());
      }
      static cosh(z) {
        return this.branchMaybe(z, z => Math.cosh(z), z => z.cosh());
      }
      static tanh(z) {
        return this.branchMaybe(z, z => Math.tanh(z), z => z.tanh());
      }
      static csch(z) {
        return this.branchMaybe(z, z => 1 / Math.sinh(z), z => z.csch());
      }
      static sech(z) {
        return this.branchMaybe(z, z => 1 / Math.cosh(z), z => z.sech());
      }
      static coth(z) {
        return this.branchMaybe(z, z => 1 / Math.tanh(z), z => z.coth());
      }
    };

    addBlock(opcode, type, text, args = false) {
      type = Scratch.BlockType[type.toUpperCase()];

      if (!args) return ({
        opcode: opcode,
        blockType: type,
        text: text
      });

      var _args = args;
      args = {};

      _args.forEach(arg => {
        args[arg[0]] = {
          type: Scratch.ArgumentType[arg[1].toUpperCase()]
        };
        if (arg.length == 3) args[arg[0]].menu = arg[2];
      });
      return ({
        opcode: opcode,
        blockType: type,
        text: text,
        arguments: args
      });
    }

    getInfo() {
      return {
        id: 'complexOps',
        name: 'Complex Numbers',
        color2: '#64C214',
        color1: '#000000',
        color3: '#64C214',
        blocks: [
          this.addBlock('c_i', 'reporter', 'i'),
          this.addBlock('c_imul', 'reporter', '[z]i', [
            ['z', 'string']
          ]),
          this.addBlock('c_cartesian', 'reporter', '[re] + [im]i', [
            ['re', 'number'],
            ['im', 'number']
          ]),
          this.addBlock('c_polar', 'reporter', '[abs] e ^ i[arg]', [
            ['abs', 'number'],
            ['arg', 'number']
          ]),
          '---',
          this.addBlock('c_add', 'reporter', '[z] + [w]', [
            ['z', 'string'],
            ['w', 'string']
          ]),
          this.addBlock('c_sub', 'reporter', '[z] − [w]', [
            ['z', 'string'],
            ['w', 'string']
          ]),
          this.addBlock('c_mul', 'reporter', '[z] × [w]', [
            ['z', 'string'],
            ['w', 'string']
          ]),
          this.addBlock('c_div', 'reporter', '[z] / [w]', [
            ['z', 'string'],
            ['w', 'string']
          ]),
          this.addBlock('c_pow', 'reporter', '[z] ^ [w]', [
            ['z', 'string'],
            ['w', 'string']
          ]),
          this.addBlock('c_neg', 'reporter', '−[z]', [
            ['z', 'string']
          ]),
          this.addBlock('c_recip', 'reporter', '1 / [z]', [
            ['z', 'string']
          ]),
          this.addBlock('c_conj', 'reporter', '[z]*', [
            ['z', 'string']
          ]),
          '---',
          this.addBlock('c_equal', 'boolean', '[z] = [w]', [
            ['z', 'string'],
            ['w', 'string']
          ]),
          this.addBlock('c_isComplex', 'boolean', '[z] is complex?', [
            ['z', 'string']
          ]),
          '---',
          this.addBlock('c_component', 'reporter', '[component] of [z]', [
            ['component', 'string', 'components'],
            ['z', 'string']
          ]),
          this.addBlock('c_unary', 'reporter', '[unary] of [z]', [
            ['unary', 'string', 'unary'],
            ['z', 'string']
          ]),
          this.addBlock('c_trig', 'reporter', '[trig] of [z]', [
            ['trig', 'string', 'trig'],
            ['z', 'string']
          ]),
          '---',
          this.addBlock('c_goTo', 'command', 'go to [z]', [
            ['z', 'string']
          ]),
          this.addBlock('c_getPos', 'reporter', 'position as complex #'),
          this.addBlock('c_color', 'reporter', 'get color of [z]', [
            ['z', 'string']
          ]),
          this.addBlock('c_setPen', 'command', 'set pen to [z]', [
            ['z', 'string']
          ])
        ],
        menus: {
          components: {
            items: ['Re', 'Im', 'Abs', 'Arg']
          },
          unary: {
            items: ['floor', 'ceiling', 'round', 'sign', 'step', 'square', 'cube', 'sqrt', 'cbrt', 'exp', 'ln']
          },
          trig: {
            items: ['sin', 'cos', 'tan', 'csc', 'sec', 'cot', 'sinh', 'cosh', 'tanh', 'csch', 'sech', 'coth']
          },
        }
      };
    }

    c_component(args) {
      return this[({
        Re: 'c_real',
        Im: 'c_imag',
        Abs: 'c_abs',
        Arg: 'c_arg',
      })[args.component]](args);
    }
    c_unary(args) {
      return this[({
        floor: 'c_floor',
        ceiling: 'c_ceil',
        round: 'c_round',
        sign: 'c_sgn',
        step: 'c_step',
        square: 'c_square',
        cube: 'c_cube',
        sqrt: 'c_sqrt',
        cbrt: 'c_cbrt',
        exp: 'c_exp',
        ln: 'c_ln',
      })[args.unary]](args);
    }
    c_trig(args) {
      return this[({
        sin: 'c_sin',
        cos: 'c_cos',
        tan: 'c_tan',
        csc: 'c_csc',
        sec: 'c_sec',
        cot: 'c_cot',
        sinh: 'c_sinh',
        cosh: 'c_cosh',
        tanh: 'c_tanh',
        csch: 'c_csch',
        sech: 'c_sech',
        coth: 'c_coth',
      })[args.trig]](args);
    }

    c_i() {
      return 'i';
    }

    c_cartesian({re,im}) {
      return new this.c(re, im).toString();
    }
    c_polar({abs,arg}) {
      return this.c.polar(abs, arg).toString();
    }

    c_real({z}) {
      return this.c.real(z);
    }
    c_imag({z}) {
      return this.c.imag(z);
    }
    c_abs({z}) {
      return this.c.abs(z);
    }
    c_arg({z}) {
      return this.c.arg(z);
    }

    c_conj({z}) {
      return this.c.conj(z).toString();
    }
    c_neg({z}) {
      return this.c.neg(z).toString();
    }
    c_recip({z}) {
      return this.c.recip(z).toString();
    }
    c_floor({z}) {
      return this.c.floor(z).toString();
    }
    c_ceil({z}) {
      return this.c.ceil(z).toString();
    }
    c_round({z}) {
      return this.c.round(z).toString();
    }
    c_sgn({z}) {
      return this.c.sgn(z).toString();
    }
    c_step({z}) {
      return this.c.step(z).toString();
    }
    c_sq({z}) {
      return this.c.sq(z).toString();
    }
    c_cube({z}) {
      return this.c.cube(z).toString();
    }
    c_sqrt({z}) {
      return this.c.sqrt(z).toString();
    }
    c_cbrt({z}) {
      return this.c.cbrt(z).toString();
    }
    c_exp({z}) {
      return this.c.exp(z).toString();
    }
    c_ln({z}) {
      return this.c.ln(z).toString();
    }
    c_imul({z}) {
      return this.c.imul(z).toString();
    }
    c_sin({z}) {
      return this.c.sin(z).toString();
    }
    c_cos({z}) {
      return this.c.cos(z).toString();
    }
    c_tan({z}) {
      return this.c.tan(z).toString();
    }
    c_csc({z}) {
      return this.c.csc(z).toString();
    }
    c_sec({z}) {
      return this.c.sec(z).toString();
    }
    c_cot({z}) {
      return this.c.cot(z).toString();
    }
    c_sinh({z}) {
      return this.c.sinh(z).toString();
    }
    c_cosh({z}) {
      return this.c.cosh(z).toString();
    }
    c_tanh({z}) {
      return this.c.tanh(z).toString();
    }
    c_csch({z}) {
      return this.c.csch(z).toString();
    }
    c_sech({z}) {
      return this.c.sech(z).toString();
    }
    c_coth({z}) {
      return this.c.coth(z).toString();
    }

    c_add({z,w}) {
      return this.c.add(z, w).toString();
    }
    c_sub({z,w}) {
      return this.c.sub(z, w).toString();
    }
    c_mul({z,w}) {
      return this.c.mul(z, w).toString();
    }
    c_div({z,w}) {
      return this.c.div(z, w).toString();
    }
    c_pow({z,w}) {
      return this.c.pow(z, w).toString();
    }

    c_isComplex({z}) {
      return !!+this.c.imag(z);
    }
    c_equal({z,w}) {
      return (
        +this.c.real(z) == +this.c.real(w) &&
        +this.c.imag(z) == +this.c.imag(w)
      );
    }


    c_getPos(_, util) {
      return new this.c(util.target.x, util.target.y).toString();
    }
    c_goTo({z}, util) {
      const targetX = this.c.real(z),
        targetY = this.c.imag(z);
      util.target.setXY(+targetX, +targetY);
    }



    hslToHex(H, S, L) { // H: [0-360] S: [0-1] L: [0-1]
      const a = S * Math.min(L, 1 - L);
      const f = n => {
        const k = (n + H / 30) % 12;
        const color = L - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    }

    c_color({z}) {
      var l1 = r => (2 / Math.PI) * Math.atan(r),
        l2 = (r, a) => Math.pow(r, a) / (Math.pow(r, a) + 1),
        H = (+this.c.arg(z) + Math.PI) * 180 / Math.PI,
        S = 1,
        L = l2(+this.c.abs(z), .5);

      return this.hslToHex((H + 180) % 360, S, L);
    }

    c_setPen(args, util) {
      vm.runtime.ext_pen._setPenColorToColor(this.c_color(args), util.target);
    }
  }

  Scratch.extensions.register(new ComplexNumbers());
})(Scratch);
