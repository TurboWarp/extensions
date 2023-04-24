/*!
	Multiple maths extension.
	Created by : Someone-Falcon
	v 1.0
	------------------------------
	This extension allows you to do advanced mathematics in Scratch!
	
	Short Showcase : 
	sqrt - Square Root
	power - Power of (NUM) eleveated to (NUM2)
	
	[ See more by using it! . . .]
	!*/

//! -- Code Start -- !//
// Dont edit until you know what you are doing!!
// It will work better on the turbowarp.org website.

class PowerSqrtEpiExtension {
  constructor() {
    this.runtime = null;
  }

  getInfo() {
    return {
      id: 'powerSqrtEpi',
      name: 'Power, Sqrt, e, Pi',
      blocks: [
        {
          opcode: 'power',
          blockType: Scratch.BlockType.REPORTER,
          text: '[BASE] ^ [EXPONENT]',
          arguments: {
            BASE: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            EXPONENT: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'sqrt',
          blockType: Scratch.BlockType.REPORTER,
          text: 'sqrt [NUM]',
          arguments: {
            NUM: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'e',
          blockType: Scratch.BlockType.REPORTER,
          text: 'e'
        },
        {
          opcode: 'pi',
          blockType: Scratch.BlockType.REPORTER,
          text: 'π'
        },
        {
          opcode: 'birthdayProblem',
          blockType: Scratch.BlockType.REPORTER,
          text: 'birthday problem with [N] people',
          arguments: {
            N: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 23
            }
          }
        }
      ],
      menus: {}
    };
  }

  setRuntime(runtime) {
    this.runtime = runtime;
  }

  power(args) {
    const {BASE, EXPONENT} = args;
    return Math.pow(BASE, EXPONENT);
  }

  sqrt(args) {
    const {NUM} = args;
    return Math.sqrt(NUM);
  }

  e() {
    return Math.E;
  }

  pi() {
    return Math.PI;
  }

  birthdayProblem(args) {
    const {N} = args;
    let p = 1;
    for (let i = 1; i <= N; i++) {
      p *= (365 - i + 1) / 365;
    }
    return 1 - p;
  }
}

const powerSqrtEpiExtension = new PowerSqrtEpiExtension();

if (typeof module !== 'undefined') {
  module.exports = powerSqrtEpiExtension;
} else if (typeof window !== 'undefined' && window.Scratch) {
  Scratch.extensions.register(powerSqrtEpiExtension, {
    name: 'Power, Sqrt, e, Pi',
    id: 'powerSqrtEpi',
    menuIconURI: '',
    blockIconURI: '',
    blocks: [
      {
        opcode: 'power',
        blockType: Scratch.BlockType.REPORTER,
        text: '[BASE] ^ [EXPONENT]',
        arguments: {
          BASE: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 0
          },
          EXPONENT: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 0
          }
        }
      },
      {
        opcode: 'sqrt',
        blockType: Scratch.BlockType.REPORTER,
        text: 'sqrt [NUM]',
        arguments: {
          NUM: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 0
          }
        }
      },
      {
        opcode: 'e',
        blockType: Scratch.BlockType.REPORTER,
        text: 'e'
      },
      {
        opcode: 'pi',
        blockType: Scratch.BlockType.REPORTER,
        text: 'π'
      },
      {
        opcode: 'birthdayProblem',
        blockType: Scratch.BlockType.REPORTER,
        text: 'birthday problem with [N] people',
        arguments: {
          N: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 23
          }
        }
      }
    ],
    menus: {}
  });
}
class FractionsTrigonometryExtension {
  constructor() {
    this.runtime = null;
  }

  getInfo() {
    return {
      id: 'fractionsTrigonometry',
      name: 'Fractions & Trigonometry',
      blocks: [
        {
          opcode: 'fraction',
          blockType: Scratch.BlockType.REPORTER,
          text: '[NUMERATOR] / [DENOMINATOR]',
          arguments: {
            NUMERATOR: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            DENOMINATOR: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1
            }
          }
        },
        {
          opcode: 'sine',
          blockType: Scratch.BlockType.REPORTER,
          text: 'sin [ANGLE]°',
          arguments: {
            ANGLE: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'cosine',
          blockType: Scratch.BlockType.REPORTER,
          text: 'cos [ANGLE]°',
          arguments: {
            ANGLE: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'tangent',
          blockType: Scratch.BlockType.REPORTER,
          text: 'tan [ANGLE]°',
          arguments: {
            ANGLE: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        }
      ],
      menus: {}
    };
  }

  setRuntime(runtime) {
    this.runtime = runtime;
  }

  fraction(args) {
    const {NUMERATOR, DENOMINATOR} = args;
    return NUMERATOR / DENOMINATOR;
  }

  sine(args) {
    const {ANGLE} = args;
    return Math.sin(ANGLE * Math.PI / 180);
  }

  cosine(args) {
    const {ANGLE} = args;
    return Math.cos(ANGLE * Math.PI / 180);
  }

  tangent(args) {
    const {ANGLE} = args;
    return Math.tan(ANGLE * Math.PI / 180);
  }
}

const fractionsTrigonometryExtension = new FractionsTrigonometryExtension();

if (typeof module !== 'undefined') {
  module.exports = fractionsTrigonometryExtension;
} else if (typeof window !== 'undefined' && window.Scratch) {
  Scratch.extensions.register(fractionsTrigonometryExtension, {
    name: 'Fractions & Trigonometry',
    id: 'fractionsTrigonometry',
    menuIconURI: '',
    blockIconURI: '',
    blocks: [
      {
        opcode: 'fraction',
        blockType: Scratch.BlockType.REPORTER,
        text: '[NUMERATOR] / [DENOMINATOR]',
        arguments: {
          NUMERATOR: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 0
          },
          DENOMINATOR: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 1
          }
        }
      },
      {
        opcode: 'sine',
        blockType: Scratch.BlockType.REPORTER,
        text: 'sin [ANGLE]°',
        arguments: {
          ANGLE: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 0
          }
        }
      },
      {
        opcode: 'cosine',
        blockType: Scratch.BlockType.REPORTER,
        text: 'cos [ANGLE]°',
        arguments: {
          ANGLE: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 0
          }
        }
      },
      {
        opcode: 'tangent',
        blockType: Scratch.BlockType.REPORTER,
        text: 'tan [ANGLE]°',
        arguments: {
          ANGLE: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 0
          }
        }
      }
    ],
    menus: {}
  });
}
class RootExtension {
  constructor() {
    this.runtime = null;
  }

  getInfo() {
    return {
      id: 'root',
      name: 'Sub-Maths',
      blocks: [
        {
          opcode: 'round',
          blockType: Scratch.BlockType.REPORTER,
          text: 'round [NUM]',
          arguments: {
            NUM: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'countDigits',
          blockType: Scratch.BlockType.REPORTER,
          text: 'count digits of [NUM]',
          arguments: {
            NUM: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'convertBase',
          blockType: Scratch.BlockType.REPORTER,
          text: 'convert [NUM] from base [FROM_BASE] to base [TO_BASE]',
          arguments: {
            NUM: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            FROM_BASE: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 10
            },
            TO_BASE: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 2
            }
          }
        }
      ],
      menus: {}
    };
  }

  setRuntime(runtime) {
    this.runtime = runtime;
  }

  round(args) {
    const {NUM} = args;
    return Math.round(NUM);
  }

  countDigits(args) {
    const {NUM} = args;
    return String(Math.abs(NUM)).length;
  }

  convertBase(args) {
    const {NUM, FROM_BASE, TO_BASE} = args;
    const parsedNum = parseInt(String(Math.abs(NUM)), FROM_BASE);
    return parsedNum.toString(TO_BASE);
  }
}

const rootExtension = new RootExtension();

if (typeof module !== 'undefined') {
  module.exports = rootExtension;
} else if (typeof window !== 'undefined' && window.Scratch) {
  Scratch.extensions.register(rootExtension);
}
class AdvancedMathExtension {
  constructor() {
    this.runtime = null;
  }

  getInfo() {
    return {
      id: 'advancedMath',
      name: 'Advanced Math',
      blocks: [
        {
          opcode: 'sin',
          blockType: Scratch.BlockType.REPORTER,
          text: 'sin of [NUM]',
          arguments: {
            NUM: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'cos',
          blockType: Scratch.BlockType.REPORTER,
          text: 'cos of [NUM]',
          arguments: {
            NUM: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'tan',
          blockType: Scratch.BlockType.REPORTER,
          text: 'tan of [NUM]',
          arguments: {
            NUM: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'log',
          blockType: Scratch.BlockType.REPORTER,
          text: 'log base [BASE] of [NUM]',
          arguments: {
            BASE: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 10
            },
            NUM: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1
            }
          }
        },
        {
          opcode: 'random',
          blockType: Scratch.BlockType.REPORTER,
          text: 'random number between [MIN] and [MAX]',
          arguments: {
            MIN: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            MAX: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1
            }
          }
        }
      ],
      menus: {}
    };
  }

  setRuntime(runtime) {
    this.runtime = runtime;
  }

  sin(args) {
    const {NUM} = args;
    return Math.sin(NUM);
  }

  cos(args) {
    const {NUM} = args;
    return Math.cos(NUM);
  }

  tan(args) {
    const {NUM} = args;
    return Math.tan(NUM);
  }

  log(args) {
    const {BASE, NUM} = args;
    return Math.log(NUM) / Math.log(BASE);
  }

  random(args) {
    const {MIN, MAX} = args;
    return Math.random() * (MAX - MIN) + MIN;
  }
}

const advancedMathExtension = new AdvancedMathExtension();

if (typeof module !== 'undefined') {
  module.exports = advancedMathExtension;
} else if (typeof window !== 'undefined' && window.Scratch) {
  Scratch.extensions.register(advancedMathExtension);
}
class BasesExtension {
  constructor() {
    this.runtime = null;
  }

  getInfo() {
    return {
      id: 'bases',
      name: 'Bases',
      blocks: [
        {
          opcode: 'convertToBase',
          blockType: Scratch.BlockType.REPORTER,
          text: 'convert [NUM] to base [BASE]',
          arguments: {
            NUM: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            BASE: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 2
            }
          }
        },
        {
          opcode: 'convertFromBase',
          blockType: Scratch.BlockType.REPORTER,
          text: 'convert [NUM] from base [BASE]',
          arguments: {
            NUM: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '0'
            },
            BASE: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 2
            }
          }
        },
        {
          opcode: 'addInBases',
          blockType: Scratch.BlockType.REPORTER,
          text: 'add [NUM1] in base [BASE1] to [NUM2] in base [BASE2]',
          arguments: {
            NUM1: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '0'
            },
            BASE1: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 2
            },
            NUM2: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '0'
            },
            BASE2: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 2
            }
          }
        }
      ],
      menus: {}
    };
  }

  setRuntime(runtime) {
    this.runtime = runtime;
  }

  convertToBase(args) {
    const {NUM, BASE} = args;
    if (isNaN(NUM) || isNaN(BASE) || BASE < 2 || BASE > 36) {
      throw new Error('Invalid input values');
    }
    return parseInt(NUM, 10).toString(BASE);
  }

  convertFromBase(args) {
    const {NUM, BASE} = args;
    if (isNaN(BASE) || BASE < 2 || BASE > 36) {
      throw new Error('Invalid input values');
    }
    const numInBase10 = parseInt(NUM, BASE);
    if (isNaN(numInBase10)) {
      throw new Error('Invalid input values');
    }
    return numInBase10.toString(10);
  }

  addInBases(args) {
    const {NUM1, BASE1, NUM2, BASE2} = args;
    if (isNaN(BASE1) || isNaN(BASE2) || BASE1 < 2 || BASE1 > 36 || BASE2 < 2 || BASE2 > 36) {
      throw new Error('Invalid input values');
    }
    const num1InBase10 = parseInt(NUM1, BASE1);
    const num2InBase10 = parseInt(NUM2, BASE2);
    if (isNaN(num1InBase10) || isNaN(num2InBase10)) {
      throw new Error('Invalid input values');
    }
    const sumInBase10 = num1InBase10 + num2InBase10;
    return sumInBase10.toString(BASE1);
  }
}

const BasesExtensionInstance = new BasesExtension();

if (typeof module !== 'undefined') {
  module.exports = BasesExtensionInstance;
} else if (typeof window !== 'undefined' && window.Scratch) {
  window.Scratch.extensions.register(BasesExtensionInstance);
}
class ComplexMathExtension {
  constructor() {
    this.runtime = null;
  }

  getInfo() {
    return {
      id: 'complexMath',
      name: 'Complex Math',
      blocks: [
        {
          opcode: 'complexAdd',
          blockType: Scratch.BlockType.REPORTER,
          text: 'add [NUM1] + [NUM2]i to [NUM3] + [NUM4]i',
          arguments: {
            NUM1: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            NUM2: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            NUM3: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            NUM4: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'complexSubtract',
          blockType: Scratch.BlockType.REPORTER,
          text: 'subtract [NUM3] + [NUM4]i from [NUM1] + [NUM2]i',
          arguments: {
            NUM1: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            NUM2: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            NUM3: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            NUM4: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'complexMultiply',
          blockType: Scratch.BlockType.REPORTER,
          text: 'multiply [NUM1] + [NUM2]i by [NUM3] + [NUM4]i',
          arguments: {
            NUM1: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            NUM2: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            NUM3: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            NUM4: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'complexDivide',
          blockType: Scratch.BlockType.REPORTER,
          text: 'divide [NUM1] + [NUM2]i by [NUM3] + [NUM4]i',
          arguments: {
            NUM1: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            NUM2: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            NUM3: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            NUM4: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        }
      ],
      menus: {}
    };
  }

  setRuntime(runtime) {
    this.runtime = runtime;
  }

  complexAdd(args) {
    const {NUM1, NUM2, NUM3, NUM4} = args;
    if (isNaN(NUM1) || isNaN(NUM2) || isNaN(NUM3) || isNaN(NUM4)) {
      throw new Error('Invalid input values');
    }
    const realPart = NUM1 + NUM3;
    const imaginaryPart = NUM2 + NUM4;
    return `${realPart} + ${imaginaryPart}i`;
  }

  complexSubtract(args) {
    const {NUM1, NUM2, NUM3, NUM4} = args;
    if (isNaN(NUM1) || isNaN(NUM2) || isNaN(NUM3) || isNaN(NUM4)) {
      throw new Error('Invalid input values');
    }
    const realPart = NUM1 - NUM3;
    const imaginaryPart = NUM2 - NUM4;
    return `${realPart} + ${imaginaryPart}i`;
  }

  complexMultiply(args) {
    const {NUM1, NUM2, NUM3, NUM4} = args;
    if (isNaN(NUM1) || isNaN(NUM2) || isNaN(NUM3) || isNaN(NUM4)) {
      throw new Error('Invalid input values');
    }
    const realPart = NUM1 * NUM3 - NUM2 * NUM4;
    const imaginaryPart = NUM1 * NUM4 + NUM2 * NUM3;
    return `${realPart} + ${imaginaryPart}i`;
  }

  complexDivide(args) {
    const {NUM1, NUM2, NUM3, NUM4} = args;
    if (isNaN(NUM1) || isNaN(NUM2) || isNaN(NUM3) || isNaN(NUM4)) {
      throw new Error('Invalid input values');
    }
    const denominator = NUM3 * NUM3 + NUM4 * NUM4;
    if (denominator === 0) {
      throw new Error('Cannot divide by zero');
    }
    const realPart = (NUM1 * NUM3 + NUM2 * NUM4) / denominator;
    const imaginaryPart = (NUM2 * NUM3 - NUM1 * NUM4) / denominator;
    return `${realPart} + ${imaginaryPart}i`;
  }
}

const ComplexMathExtensionInstance = new ComplexMathExtension();

if (typeof module !== 'undefined') {
  module.exports = ComplexMathExtensionInstance;
} else if (typeof window !== 'undefined' && window.Scratch) {
  window.Scratch.extensions.register(ComplexMathExtensionInstance);
}
class ComplexEquationsExtension {
  constructor() {
    this.runtime = null;
  }

  getInfo() {
    return {
      id: 'complexEquations',
      name: 'Complex Equations',
      blocks: [
        {
          opcode: 'quadraticFormula',
          blockType: Scratch.BlockType.REPORTER,
          text: 'solve quadratic equation a=[A] b=[B] c=[C]',
          arguments: {
            A: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            B: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            C: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'einsteinEquation',
          blockType: Scratch.BlockType.REPORTER,
          text: 'calculate energy (e) from mass (m) using Einstein\'s equation e=mc² m=[M]',
          arguments: {
            M: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'pythagoreanTheorem',
          blockType: Scratch.BlockType.REPORTER,
          text: 'calculate length of hypotenuse with legs [A] and [B]',
          arguments: {
            A: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            B: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        }
      ],
      menus: {}
    };
  }

  setRuntime(runtime) {
    this.runtime = runtime;
  }

  quadraticFormula(args) {
    const {A, B, C} = args;
    if (isNaN(A) || isNaN(B) || isNaN(C)) {
      throw new Error('Invalid input values');
    }
    const discriminant = B * B - 4 * A * C;
    if (discriminant < 0) {
      return 'no real solutions';
    } else if (discriminant === 0) {
      const x = -B / (2 * A);
      return x.toString();
    } else {
      const x1 = (-B + Math.sqrt(discriminant)) / (2 * A);
      const x2 = (-B - Math.sqrt(discriminant)) / (2 * A);
      return `${x1}, ${x2}`;
    }
  }

  einsteinEquation(args) {
    const {M} = args;
    if (isNaN(M)) {
      throw new Error('Invalid input value');
    }
    const c = 299792458; // speed of light in meters per second
    const e = M * c * c;
    return e.toString();
  }

  pythagoreanTheorem(args) {
    const {A, B} = args;
    if (isNaN(A) || isNaN(B)) {
      throw new Error('Invalid input values');
    }
    const c = Math.sqrt(A * A + B * B);
    return c.toString();
  }
}

const complexEquations = new ComplexEquationsExtension();

if (typeof module !== 'undefined') {
  module.exports = complexEquations;
} else if (typeof window !== 'undefined' && window.Scratch) {
  window.Scratch.extensions.register(complexEquations);
}
class AdvancedEquationsExtension {
  constructor() {
    this.runtime = null;
  }

  getInfo() {
    return {
      id: 'advancedEquations',
      name: 'Advanced Equations',
      blocks: [
        {
          opcode: 'factorial',
          blockType: Scratch.BlockType.REPORTER,
          text: 'factorial of [NUM]',
          arguments: {
            NUM: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'gcf',
          blockType: Scratch.BlockType.REPORTER,
          text: 'greatest common factor of [A] and [B]',
          arguments: {
            A: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            B: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'lcm',
          blockType: Scratch.BlockType.REPORTER,
          text: 'least common multiple of [A] and [B]',
          arguments: {
            A: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            B: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'nCr',
          blockType: Scratch.BlockType.REPORTER,
          text: '[N] choose [R]',
          arguments: {
            N: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            R: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'nPr',
          blockType: Scratch.BlockType.REPORTER,
          text: '[N] permute [R]',
          arguments: {
            N: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            R: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'sumSeries',
          blockType: Scratch.BlockType.REPORTER,
          text: 'sum of series from [START] to [END] with common difference [DIFF]',
          arguments: {
            START: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            END: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            DIFF: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1
            }
          }
        },
        {
          opcode: 'logarithm',
          blockType: Scratch.BlockType.REPORTER,
          text: 'log base [BASE] of [NUM]',
          arguments: {
            BASE: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 10
            },
            NUM: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1
            }
          }
        }
      ],
      menus: {
        // Define any custom menus here
      }
    };
  }

  setRuntime(runtime) {
    this.runtime = runtime;
  }

  factorial(args) {
    const num = args.NUM;
    if (num < 0) {
      return null;
    }
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    return result;
  }

  gcf(args) {
    let a = Math.abs(args.A);
    let b = Math.abs(args.B);
    while (b) {
      let t = b;
      b = a % b;
      a = t;
    }
    return a;
  }

  lcm(args) {
    let a = Math.abs(args.A);
    let b = Math.abs(args.B);
    return a * b / this.gcf({A: a, B: b});
  }

  nCr(args) {
    const n = args.N;
    const r = args.R;
    if (r > n) {
      return null;
    }
    let result = 1;
    for (let i = 0; i < r; i++) {
      result *= (n - i) / (i + 1);
    }
    return result;
  }

  nPr(args) {
    const n = args.N;
    const r = args.R;
    if (r > n) {
      return null;
    }
    let result = 1;
    for (let i = 0; i < r; i++) {
      result *= (n - i);
    }
    return result;
  }

  sumSeries(args) {
    const start = args.START;
    const end = args.END;
    const diff = args.DIFF;
    if (diff === 0) {
      return null;
    }
    const n = Math.floor((end - start) / diff) + 1;
    return n * (start + end) / 2;
  }

  logarithm(args) {
    const base = args.BASE;
    const num = args.NUM;
    if (num <= 0 || base <= 0 || base === 1) {
      return null;
    }
    return Math.log(num) / Math.log(base);
  }
}

const AdvancedEquationsInstance = new AdvancedEquationsExtension();

if (typeof module !== 'undefined') {
  module.exports = AdvancedEquationsInstance;
} else if (typeof window !== 'undefined' && window.Scratch) {
  window.Scratch.extensions.register(AdvancedEquationsInstance);
}
