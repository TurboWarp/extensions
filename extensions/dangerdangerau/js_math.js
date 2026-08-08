class Js_math {
  constructor() {
    this.FUNCTIONS = {
      abs: { fn: Math.abs, min: 1, max: 1 },
      acos: { fn: Math.acos, min: 1, max: 1 },
      acosh: { fn: Math.acosh, min: 1, max: 1 },
      asin: { fn: Math.asin, min: 1, max: 1 },
      asinh: { fn: Math.asinh, min: 1, max: 1 },
      atan: { fn: Math.atan, min: 1, max: 1 },
      atanh: { fn: Math.atanh, min: 1, max: 1 },
      atan2: { fn: Math.atan2, min: 2, max: 2 },
      cbrt: { fn: Math.cbrt, min: 1, max: 1 },
      ceil: { fn: Math.ceil, min: 1, max: 1 },
      clz32: { fn: Math.clz32, min: 1, max: 1 },
      cos: { fn: Math.cos, min: 1, max: 1 },
      cosh: { fn: Math.cosh, min: 1, max: 1 },
      exp: { fn: Math.exp, min: 1, max: 1 },
      expm1: { fn: Math.expm1, min: 1, max: 1 },
      floor: { fn: Math.floor, min: 1, max: 1 },
      fround: { fn: Math.fround, min: 1, max: 1 },
      hypot: { fn: Math.hypot, min: 1, max: Infinity },
      imul: { fn: Math.imul, min: 2, max: 2 },
      log: { fn: Math.log, min: 1, max: 1 },
      log10: { fn: Math.log10, min: 1, max: 1 },
      log1p: { fn: Math.log1p, min: 1, max: 1 },
      log2: { fn: Math.log2, min: 1, max: 1 },
      max: { fn: Math.max, min: 1, max: Infinity },
      min: { fn: Math.min, min: 1, max: Infinity },
      pow: { fn: Math.pow, min: 2, max: 2 },
      round: { fn: Math.round, min: 1, max: 1 },
      sign: { fn: Math.sign, min: 1, max: 1 },
      sin: { fn: Math.sin, min: 1, max: 1 },
      sinh: { fn: Math.sinh, min: 1, max: 1 },
      sqrt: { fn: Math.sqrt, min: 1, max: 1 },
      tan: { fn: Math.tan, min: 1, max: 1 },
      tanh: { fn: Math.tanh, min: 1, max: 1 },
      trunc: { fn: Math.trunc, min: 1, max: 1 }
    };

    const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const MATH_FUNCTIONS = [
      { name: 'random', arity: 0 },
      { name: 'abs', arity: 1 },
      { name: 'acos', arity: 1 },
      { name: 'acosh', arity: 1 },
      { name: 'asin', arity: 1 },
      { name: 'asinh', arity: 1 },
      { name: 'atan', arity: 1 },
      { name: 'atanh', arity: 1 },
      { name: 'atan2', arity: 2 },
      { name: 'cbrt', arity: 1 },
      { name: 'ceil', arity: 1 },
      { name: 'clz32', arity: 1 },
      { name: 'cos', arity: 1 },
      { name: 'cosh', arity: 1 },
      { name: 'exp', arity: 1 },
      { name: 'expm1', arity: 1 },
      { name: 'floor', arity: 1 },
      { name: 'fround', arity: 1 },
      { name: 'hypot', arity: 3 },
      { name: 'imul', arity: 2 },
      { name: 'log', arity: 1 },
      { name: 'log10', arity: 1 },
      { name: 'log1p', arity: 1 },
      { name: 'log2', arity: 1 },
      { name: 'max', arity: 3 },
      { name: 'min', arity: 3 },
      { name: 'pow', arity: 2 },
      { name: 'round', arity: 1 },
      { name: 'sign', arity: 1 },
      { name: 'sin', arity: 1 },
      { name: 'sinh', arity: 1 },
      { name: 'sqrt', arity: 1 },
      { name: 'tan', arity: 1 },
      { name: 'tanh', arity: 1 },
      { name: 'trunc', arity: 1 }
    ];

    this.BLOCK_DEFS = MATH_FUNCTIONS.map((def) => {
      const entry = {
        name: def.name,
        arity: def.arity,
        argNames: LETTERS.slice(0, def.arity).split(''),
        opcode: 'math_' + def.name,
        fn: def.arity === 0 ? Math.random : this.FUNCTIONS[def.name].fn
      };
      this[entry.opcode] = (args) => {
        const values = entry.argNames.map((name) => Number(args[name]));
        return entry.fn.apply(null, values);
      };
      return entry;
    });
  }

  getInfo() {
    const blocks = [
      {
        opcode: 'evaluate',
        blockType: Scratch.BlockType.REPORTER,
        text: 'evaluate [EXPRESSION]',
        arguments: {
          EXPRESSION: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: '2 + 3 * 4'
          }
        }
      },
      {
        opcode: 'isValid',
        blockType: Scratch.BlockType.BOOLEAN,
        text: 'is [EXPRESSION] a valid equation?',
        arguments: {
          EXPRESSION: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: '2 + 3 * 4'
          }
        }
      }
    ];
    for (const def of this.BLOCK_DEFS) {
      blocks.push(this.makeMathBlock(def));
    }
    return {
      id: 'jsmath',
      name: 'JS Math',
      blocks: blocks
    };
  }

  makeMathBlock(def) {
    let text;
    if (def.arity === 0) {
      text = def.name;
    } else if (def.arity === 1) {
      text = def.name + ' of [' + def.argNames[0] + ']';
    } else if (def.arity === 2) {
      text = def.name + ' of [' + def.argNames[0] + '] and [' + def.argNames[1] + ']';
    } else {
      text = def.name + ' of [' + def.argNames[0] + '], [' + def.argNames[1] + '], and [' + def.argNames[2] + ']';
    }
    const blockArguments = {};
    for (const letter of def.argNames) {
      blockArguments[letter] = {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: '1'
      };
    }
    return {
      opcode: def.opcode,
      blockType: Scratch.BlockType.REPORTER,
      text: text,
      arguments: blockArguments
    };
  }

  evaluate(args) {
    const expression = args.EXPRESSION.toString();
    try {
      return this.evaluateString(expression);
    } catch (e) {
      return 'Error: ' + e.message;
    }
  }

  isValid(args) {
    const expression = args.EXPRESSION.toString();
    try {
      this.evaluateString(expression);
      return true;
    } catch (e) {
      return false;
    }
  }

  evaluateString(str) {
    this.tokens = this.tokenize(str);
    this.pos = 0;
    const result = this.parseExpression();
    if (this.pos < this.tokens.length) {
      throw new Error('Unexpected token "' + this.tokens[this.pos].value + '"');
    }
    return result;
  }

  tokenize(str) {
    const tokens = [];
    let i = 0;
    while (i < str.length) {
      const c = str[i];
      if (/\s/.test(c)) {
        i++;
      } else if (/[0-9.]/.test(c)) {
        let num = '';
        while (i < str.length && /[0-9.]/.test(str[i])) {
          num += str[i];
          i++;
        }
        tokens.push({ type: 'number', value: num });
      } else if (/[a-zA-Z]/.test(c)) {
        let name = '';
        while (i < str.length && /[a-zA-Z0-9]/.test(str[i])) {
          name += str[i];
          i++;
        }
        tokens.push({ type: 'name', value: name.toLowerCase() });
      } else if ('+-*/^%(),'.indexOf(c) !== -1) {
        tokens.push({ type: c, value: c });
        i++;
      } else {
        throw new Error('Unexpected character "' + c + '"');
      }
    }
    return tokens;
  }

  parseExpression() {
    let value = this.parseTerm();
    while (this.match('+') || this.match('-')) {
      const op = this.previous().value;
      const right = this.parseTerm();
      if (op === '+') {
        value += right;
      } else {
        value -= right;
      }
    }
    return value;
  }

  parseTerm() {
    let value = this.parseUnary();
    while (this.match('*') || this.match('/') || this.match('%')) {
      const op = this.previous().value;
      const right = this.parseUnary();
      if (op === '*') {
        value *= right;
      } else if (op === '/') {
        value /= right;
      } else {
        value %= right;
      }
    }
    return value;
  }

  parseUnary() {
    if (this.match('+')) {
      return this.parseUnary();
    }
    if (this.match('-')) {
      return -this.parseUnary();
    }
    return this.parsePower();
  }

  parsePower() {
    const left = this.parsePrimary();
    if (this.match('^')) {
      const right = this.parseUnary();
      return Math.pow(left, right);
    }
    return left;
  }

  parsePrimary() {
    if (this.match('number')) {
      const n = parseFloat(this.previous().value);
      if (isNaN(n)) {
        throw new Error('Invalid number "' + this.previous().value + '"');
      }
      return n;
    }
    if (this.match('name')) {
      const name = this.previous().value;
      if (name === 'pi') {
        return Math.PI;
      }
      if (name === 'e') {
        return Math.E;
      }
      if (this.check('(')) {
        this.advance();
        const args = [];
        if (!this.check(')')) {
          do {
            args.push(this.parseExpression());
          } while (this.match(','));
        }
        if (!this.match(')')) {
          throw new Error('Missing closing parenthesis after "' + name + '"');
        }
        return this.callFunction(name, args);
      }
      throw new Error('Unknown name "' + name + '"');
    }
    if (this.match('(')) {
      const value = this.parseExpression();
      if (!this.match(')')) {
        throw new Error('Missing closing parenthesis');
      }
      return value;
    }
    if (this.pos >= this.tokens.length) {
      throw new Error('Unexpected end of expression');
    }
    throw new Error('Unexpected token "' + this.tokens[this.pos].value + '"');
  }

  callFunction(name, args) {
    if (name === 'random') {
      if (args.length !== 0) {
        throw new Error('Function "random" expects no arguments, got ' + args.length);
      }
      return Math.random();
    }
    const entry = this.FUNCTIONS[name];
    if (!entry) {
      throw new Error('Unknown function "' + name + '"');
    }
    if (args.length < entry.min || args.length > entry.max) {
      throw new Error(
        'Function "' + name + '" expects ' +
        (entry.min === entry.max ? entry.min : entry.min + '-' + entry.max) +
        ' argument(s), got ' + args.length
      );
    }
    return entry.fn.apply(null, args);
  }

  match(type) {
    if (this.check(type)) {
      this.advance();
      return true;
    }
    return false;
  }

  check(type) {
    if (this.pos >= this.tokens.length) {
      return false;
    }
    return this.tokens[this.pos].type === type;
  }

  advance() {
    this.pos++;
  }

  previous() {
    return this.tokens[this.pos - 1];
  }
}

Scratch.extensions.register(new Js_math());
