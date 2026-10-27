
(function (Scratch) {
    'use strict';

    const cast = Scratch.Cast;

    const makeLabel = (text) => ({
        blockType: 'label',
        text: text,
    });

    const strToComplex = (str) => {
        const testString = cast.toString(str)
         if (!testString.startsWith('(') || !testString.endsWith('i)')) {
            throw new Error('Invalid complex number format');
        }

        const newString = str.slice(1, -2);
        const parts = newString.split(' + ');

        if (parts.length !== 2) {
            throw new Error('Invalid complex number format');
        }

        const real = cast.toNumber(parts[0]);
        const imag = cast.toNumber(parts[1]);

        if (Number.isNaN(real) || Number.isNaN(imag)) {
            throw new Error('Invalid complex number components');
        }

        return [real, imag];
    };

    const ComplexToStr = (array) => {
        return '(' + String(array[0]) + ' + ' + String(array[1]) + 'i)'
    };

    const power = (imag, real) => {
                const [a, b] = strToComplex(imag);
                const cO = real * Math.atan2(b, a);
                const rUpc = Math.sqrt(a * a + b * b) ** real;

                return ComplexToStr([rUpc * Math.cos(cO), rUpc * Math.sin(cO)])
    };

    const radToDeg = (180 / Math.PI);

    class ConstantsExtension {
        getInfo() {
            return {
                id: 'mathplus',
                name: 'Math +',
                color1: '#ff0000',
                color2: '#cc0000',

                blocks: [
                    "---",
                     makeLabel("Constants"),
                    {
                        opcode: 'pi',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'π'
                    },
                    {
                        opcode: 'tau',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'τ'
                    },
                    {
                        opcode: 'e',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'e'
                    },
                    {
                        opcode: 'phi',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'φ'
                    },
                    {
                        opcode: 'tiny',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'tiny'
                    },
                    {
                        opcode: 'infinity',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '∞'
                    },
                    {
                       opcode: 'nan',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'NaN'
                    },
                    '---',
                    {
                        opcode: 'trueValue',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'true'
                    },
                    {
                        opcode: 'falseValue',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'false'
                    },
                    makeLabel("Comparisons"),
                    {
                        opcode: 'notEqual',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: '[VALUE1] ≠ [VALUE2]',
                        arguments: {
                            VALUE1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            VALUE2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2
                            }
                        }

                    },
                    {
                        opcode: 'greaterThanOrEqualTo',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: '[VALUE1] ≥ [VALUE2]',
                        arguments: {
                            VALUE1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            VALUE2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2
                            }
                        }
                    },
                    {
                        opcode: 'lessThanOrEqualTo',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: '[VALUE1] ≤ [VALUE2]',
                        arguments: {
                            VALUE1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            VALUE2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2
                            }
                        }
                    },
                    {
                        opcode: 'between',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is [VALUE1] inbetween [VALUE2] and [VALUE3]',
                        arguments: {
                            VALUE1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2
                            },
                            VALUE2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            VALUE3: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3
                            }
                        }
                    },
                    makeLabel("Exponaints"),
                    {
                        opcode: 'square',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[VALUE]²',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3
                            }
                        }
                    },
                    {
                        opcode: 'power',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[VALUE1] ^ [VALUE2]',
                        arguments: {
                            VALUE1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3
                            },
                            VALUE2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 4
                            }
                        }
                    },
                    {
                        opcode: 'root',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[VALUE1]√[VALUE2]',
                        arguments: {
                            VALUE1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3
                            },
                            VALUE2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 27
                            }
                        }
                    },
                    makeLabel("Why is This Not in Scratch Already?"),
                    {
                        opcode: 'negate',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '-[VALUE]',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 5
                            }
                        }
                    },
                    {
                        opcode: 'sign',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'sign of [VALUE]',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: -5
                            }
                        }
                    },
                    makeLabel("Trig"),
                    {
                        opcode: 'atan2',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'atan2 [Y], [X]',
                        arguments: {
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: 'hypot',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'hypot [LEG1] [LEG2]',
                        arguments: {
                            LEG1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3
                            },
                            LEG2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 4
                            }
                        }
                    },
                    {
                        opcode: 'trig',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[FUNCTION] [VALUE]',
                        arguments: {
                            FUNCTION: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'sinh',
                                menu: 'trigFunctions'
                            },
                            VALUE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 90
                            }
                        }
                    },
                    "---",
                    makeLabel("Complex Numbers"),
                    {
                        opcode: 'i',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'i',
                    },
                    {
                        opcode: 'makeComplex',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'make complex number ([REAL] + [IMAG]i)',
                        arguments: {
                            REAL: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            IMAG: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2
                            }
                        }
                    },
                    {
                        opcode: 'getReal',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get real part of [VALUE]',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i)'
                            }
                        }
                    },
                    {
                        opcode: 'getImag',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get imaginary part of [VALUE]',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i)'
                            }
                        }
                    },
                    {
                        opcode: 'complexMath',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'complex math [VALUE1] [OP] [VALUE2]',
                        arguments: {
                            VALUE1: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i)',
                            },
                            OP: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '+',
                                menu: 'ops'
                            },
                            VALUE2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(2 + 3i)'
                            }
                        }
                    },
                    {
                        opcode: 'complexPower',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'complex powers [VALUE1] ^ [VALUE2]',
                        arguments: {
                            VALUE1: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i)',
                            },
                            VALUE2: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: '2'
                            }
                        }
                    },
                    {
                        opcode: 'complexRoot',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'complex powers [VALUE1] √ [VALUE2]',
                        arguments: {
                            VALUE1: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: '2',
                            },
                            VALUE2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(2 + 3i)'
                            }
                        }
                    },
                    {
                        opcode: 'complexCompare',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'complex comparison [VALUE1] [COMPARISON] [VALUE2]',
                        arguments: {
                            VALUE1: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i)',
                            },
                            COMPARISON: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '=',
                                menu: 'comparisons'
                            },
                            VALUE2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(2 + 3i)'
                            }
                        }
                    }
                    
                ],
                menus: {
                    trigFunctions: {
                        items: ['sinh', 'asinh', 'cosh', 'acosh', 'tanh', 'atanh']
                    },
                    ops: {
                        items: ['+', '-', '*', '/']
                    },
                    comparisons: {
                        items: ['=', '≠']
                    },
                }
            };
        }

        pi() {
            return Math.PI;
        }

        tau() {
            return Math.PI * 2;
        }

        e() {
            return Math.E;
        }

        tiny() {
            return 0.0000001
        }

        infinity() {
            return Infinity;
        }

        nan() {
            return NaN;
        }

        phi() {
            return (1 + Math.sqrt(5)) / 2;
        }

        trueValue() {
            return true;
        }

        falseValue() {
            return false;
        }

        atan2(args) {
            return Math.atan2(
            cast.toNumber(args.Y),
            cast.toNumber(args.X)
        ) * radToDeg
        }

        sign(args) {
            return Math.sign(cast.toNumber(args.VALUE))
        }

        trig(args) {
            const number = cast.toNumber(args.VALUE)
            switch (args.FUNCTION) {
                case "sinh":
                    return Math.sinh(number);

                case "asinh":
                    return Math.asinh(number);
                
                case "cosh":
                    return Math.cosh(number);
                
                case "acosh":
                    return Math.acosh(number);
                
                case "tanh":
                    return Math.tanh(number);
                
                case "atanh":
                    return Math.atanh(number);
            }
        }
        
        hypot(args) {
            return Math.hypot(
            cast.toNumber(args.LEG1),
            cast.toNumber(args.LEG2)
            )
        }

        notEqual(args) {
            return cast.compare(args.VALUE1, args.VALUE2) !== 0
        }

        greaterThanOrEqualTo(args) {
            return cast.compare(args.VALUE1, args.VALUE2) >= 0
        }

        lessThanOrEqualTo(args) {
            return cast.compare(args.VALUE1, args.VALUE2) <= 0
        }

        square(args) {
            const casted = cast.toNumber(args.VALUE)
            return casted * casted
        }

        power(args) {
            return cast.toNumber(args.VALUE1) ** cast.toNumber(args.VALUE2)
        }

        root(args) {
            return cast.toNumber(args.VALUE2) ** (1 / cast.toNumber(args.VALUE1))
        }

        negate(args) {
            return -cast.toNumber(args.VALUE)
        }

        i() {
            return '(0 + 1i)'
        }

        makeComplex(args)  {
            try {
                return ComplexToStr([cast.toNumber(args.REAL), cast.toNumber(args.IMAG)])
            } catch (error) {
                console.log(error)
                return ''
            }
        }

        getReal(args) {
            try {
                return strToComplex(args.VALUE)[0]
            } catch (error) {
                console.log(error);
                return ''
            }
        }

        getImag(args) {
            try {
                return strToComplex(args.VALUE)[1]
            } catch (error) {
                console.log(error);
                return ''
            }
        }

        complexMath(args) {
            try {
                const [a, b] = strToComplex(args.VALUE1);
                const [c, d] = strToComplex(args.VALUE2);
                switch (args.OP) {
                    case '+':
                        return ComplexToStr([a + c, b + d]);
                    
                    case '-':
                        return ComplexToStr([a - c, b - d]);
                    
                    case '*':
                        return ComplexToStr([a * c - b * d, a * d + b * c]);
                    
                    case '/':
                        return ComplexToStr([(a * c + b * d) / (c * c + d * d), (b * c - a * d) / (c * c + d * d)])
            }
            } catch (error) {
                console.log(error);
                return ''
            }
        }

        complexPower(args) {
            try {
                return power(cast.toString(args.VALUE1), cast.toNumber(args.VALUE2))
            } catch (error) {
                console.log(error);
                return ''
            }
        }

        complexRoot(args) {
            try {
                return power(cast.toString(args.VALUE2), 1 / cast.toNumber(args.VALUE1))
            } catch (error) {
                console.log(error);
                return ''
            }
        }

        complexCompare(args) {
            try {
                const [a, b] = strToComplex(args.VALUE1)
                const [c, d] = strToComplex(args.VALUE2)
                if (args.COMPARISON === '=') {
                    return (a === c) && (b === d)
                }
                return (a !== c) || (b !== d)
            } catch (error) {
                console.log(error);
                return ''
            }
        }

        between(args) {
            const a = cast.toNumber(args.VALUE2);
            const b = cast.toNumber(args.VALUE3);
            const value = cast.toNumber(args.VALUE1);

            return value >= Math.min(a, b) && value <= Math.max(a, b);
        }
    }

    Scratch.extensions.register(new ConstantsExtension());
})(Scratch);
