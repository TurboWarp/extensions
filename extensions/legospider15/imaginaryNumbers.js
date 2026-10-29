
(function (Scratch) {
    'use strict'

    const cast = Scratch.Cast

    const makeLabel = (text) => ({
        blockType: 'label',
        text: text,
    })

    const strToComplex = (str) => {
        const castString = cast.toString(str).replace(/−/g, '-') // handle unicode minus sign
        if (castString.endsWith('i)')) {
            const newString = castString.slice(1, -2)
            const parts = newString.split(' + ')

            if (parts.length !== 2) {
                throw new Error('Invalid complex number format')
            }
            return [cast.toNumber(parts[0]), cast.toNumber(parts[1])]
        }

        return [cast.toNumber(castString), 0]
        
    }

    const complexToStr = (array) => {
        return '(' + String(array[0]) + ' + ' + String(array[1]) + 'i)'
    }

    const getComplexPower = (number, power) => {
                const [a, b] = strToComplex(number)
                const [c, d] = strToComplex(power)
                const r = Math.hypot(a, b)
                const lnr = Math.log(r)
                const O = Math.atan2(b, a)
                const A = c * lnr - d * O
                const B = c * O + d * lnr
                const eUpA = Math.exp(A)
    
                return complexToStr([
                   eUpA * Math.cos(B),
                   eUpA * Math.sin(B)
                ])
    }

    const divideComplex = (numeratior, denominatior) => {
        const [a, b] = strToComplex(numeratior)
        const [c, d] = strToComplex(denominatior)
        const newDenominator = c * c + d * d

        if (newDenominator === 0) {
            throw new Error('Division by zero')
        }

        return complexToStr([(a * c + b * d) / newDenominator, (b * c - a * d) / newDenominator])
    }

    const strToQuaternion = (str) => {
        const castString = cast.toString(str).replace(/−/g, '-') // handle unicode minus sign

        if (castString.endsWith('k)')) {
            const newString = castString.slice(1, -2)
            const parts = newString.split(' + ')

            if (parts.length !== 4) {
                throw new Error('Invalid quaternion number format')
            }
            return [cast.toNumber(parts[0]), cast.toNumber(parts[1].slice(0, -1)),
             cast.toNumber(parts[2].slice(0, -1)), cast.toNumber(parts[3])]
        }

        if (castString.endsWith('i)')) {
            const newString = castString.slice(1, -2)
            const parts = newString.split(' + ')

            if (parts.length !== 2) {
                throw new Error('Invalid complex number format')
            }

            return [cast.toNumber(parts[0]), cast.toNumber(parts[1]), 0, 0]
        }
        return [cast.toNumber(castString), 0, 0, 0]
    }

    const quaternionToStr = (array) => {
        return '(' + String(array[0]) + ' + ' + String(array[1]) +  'i + ' + 
        String(array[2]) + 'j + ' + String(array[3]) + 'k)'
    }

    const getQuaternionPower = (number, power) => {
                const [a, b, c, d] = strToQuaternion(number)
                const [e, f, g, h] = strToQuaternion(power)
                const r = Math.hypot(a, b, c, d)
                if (r === 0) {
                    if (e > 0 && f === 0 && g === 0 && h === 0) {
                        return quaternionToStr([0, 0, 0, 0]);
                    }
                    throw new Error("Quaternion power is undefined for this zero base");
                }
                const s = Math.hypot(b, c, d)
                const O = Math.acos(Math.max(-1, Math.min(1, a / r)));
                const L = Math.log(r)
                if (s === 0 && a > 0) {
                    const r = a;
                    const L = Math.log(r);
                    const A = e * L;
                    const B = f * L;
                    const C = g * L;
                    const D = h * L;
                    const T = Math.hypot(B, C, D);
                    const sinT = T === 0 ? 1 : Math.sin(T) / T;
                    const scale = Math.exp(A);

                    return quaternionToStr([
                        scale * Math.cos(T),
                        scale * sinT * B,
                        scale * sinT * C,
                        scale * sinT * D
                    ]);
                }
                const u = b * O / s
                const v = c * O / s
                const w = d * O / s
                const A = e * L - f * u - g * v - h * w
                const B = e * u + f * L + g * w - h * v
                const C = e * v - f * w + g * L + h * u
                const D = e * w + f * v - g * u + h * L
                const T = Math.hypot(B, C, D)
                const sinT = T !== 0 ? Math.sin(T) / T : 1
                const eUpA = Math.exp(A)

                return quaternionToStr([
                    eUpA * Math.cos(T),
                    eUpA * sinT * B,
                    eUpA * sinT * C,
                    eUpA * sinT * D
                ])
    }

    const divideQuaternion = (numerator, denominator) => {
        const [a, b, c, d] = strToQuaternion(numerator)
        const [e, f, g, h] = strToQuaternion(denominator)
        const newDenominator = e * e + f * f + g * g + h * h;

        if (newDenominator === 0) {
            throw new Error('Division by zero');
        }

        return quaternionToStr([
            (a * e + b * f + c * g + d * h) / newDenominator,
            (b * e - a * f - c * h + d * g) / newDenominator,
            (c * e - a * g + b * h - d * f) / newDenominator,
            (d * e - a * h - b * g + c * f) / newDenominator
        ])
    }

    class ImaginaryNumbersExtension {
        getInfo() {
            return {
                id: 'imagNums',
                name: 'Imaginary Numbers',
                color1: '#ff0000',
                color2: '#cc0000',

                blocks: [
                    "---",
                    makeLabel("Complex Numbers"),
                    {
                        opcode: 'i',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'i',
                    },
                    '---',
                    {
                        opcode: 'makeComplex',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '([REAL] + [IMAG]i)',
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
                        text: 'complex powers [VALUE1] [POWER] [VALUE2]',
                        arguments: {
                            VALUE1: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i)',
                            },
                            POWER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '^',
                                menu: 'powers'
                            },
                            VALUE2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '2'
                            }
                        }
                    },
                    {
                        opcode: 'complexMinus',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'complex -[VALUE]',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i)',
                            }
                        }
                    },
                    {
                        opcode: 'complexAbs',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'complex abs [VALUE]',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i)',
                            }
                        }
                    },
                    {
                        opcode: 'complexStuff',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get [THING] of complex number [VALUE]',
                        arguments: {
                            THING: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'conjugate',
                                menu: 'thing'
                            },
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i)',
                            }
                        }
                    },
                    {
                        opcode: 'complexNormalization',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'normalize complex number [VALUE]',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i)'
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
                                defaultValue: '(1 + 2i)'
                            }
                        }
                    },
                    makeLabel('Quaternions'),
                    {
                        opcode: 'quaternionI',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'i (quaternion)',
                    },
                    {
                        opcode: 'j',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'j',
                    },
                    {
                        opcode: 'k',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'k',
                    },
                    '---',
                    {
                        opcode: 'makeQuaternion',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '([REAL] + [I]i + [J]j + [K]k)',
                        arguments: {
                            REAL: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            I: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2
                            },
                            J: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3
                            },
                            K: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 4
                            }
                        }
                    },
                    {
                        opcode: 'quaternionMath',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'quaternion math [VALUE1] [OP] [VALUE2]',
                        arguments: {
                            VALUE1: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i + 3j + 4k)',
                            },
                            OP: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '+',
                                menu: 'ops'
                            },
                            VALUE2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(2 + 3i + 4j + 5k)'
                            }
                        }
                    },
                    {
                        opcode: 'quaternionPower',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'quaternion power [VALUE1] [POWER] [VALUE2]',
                        arguments: {
                            VALUE1: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i + 3j + 4k)',
                            },
                            POWER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '^',
                                menu: 'powers'
                            },
                            VALUE2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '2'
                            }
                        }
                    },
                    {
                        opcode: 'quaternionMinus',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'quaternion -[VALUE]',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i + 3j + 4k)',
                            }
                        }
                    },
                    {
                        opcode: 'quaternionAbs',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'quaternion abs [VALUE]',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i + 3j + 4k)',
                            }
                        }
                    },
                    {
                        opcode: 'quaternionStuff',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get [THING] of quaternion [VALUE]',
                        arguments: {
                            THING: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'conjugate',
                                menu: 'thing'
                            },
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i + 3j + 4k)'
                            }
                        }
                    },
                    {
                        opcode: 'quaternionNormalization',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'normalize quaterion [VALUE]',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i + 3j + 4k)'
                            }
                        }
                    },
                    {
                        opcode: 'quaternionCompare',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'quaternion comparison [VALUE1] [COMPARISON] [VALUE2]',
                        arguments: {
                            VALUE1: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i + 3j + 4k)',
                            },
                            COMPARISON: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '=',
                                menu: 'comparisons'
                            },
                            VALUE2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i + 3j + 4k)'
                            }
                        }
                    },
                    makeLabel('Convertions'),
                    {
                        opcode: 'toReal',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'covert [VALUE] to real number',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i + 3j + 4k)'
                            }
                        }
                    },
                    {
                        opcode: 'toComplex',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'covert [VALUE] to complex number',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '7'
                            }
                        }
                    },
                    {
                        opcode: 'toQuaternion',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'convert [VALUE] to quaternion',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i)'
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
                                defaultValue: '(1 + 2i + 3j + 4k)'
                            }
                        }
                    },
                    {
                        opcode: 'getI',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get i of [VALUE]',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i + 3j + 4k)'
                            }
                        }
                    },
                    {
                        opcode: 'getJ',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get j of [VALUE]',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i + 3j + 4k)'
                            }
                        }
                    },
                    {
                        opcode: 'getK',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get k of [VALUE]',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '(1 + 2i + 3j + 4k)'
                            }
                        }
                    },
                ],
                menus: {
                    ops: {
                        items: ['+', '-', '*', '/']
                    },
                    comparisons: {
                        items: ['=', '≠', '≈']
                    },
                    powers: {
                        items: ['^', '√']
                    },
                    thing: {
                        items: ['conjugate', 'reciprocal', 'argument (degrees)', 'argument (radians)', 'log']
                    }
                }
            }
        }

        // complex numbers

        i() {
            return '(0 + 1i)'
        }

        makeComplex(args)  {
            try {
                return complexToStr([cast.toNumber(args.REAL), cast.toNumber(args.IMAG)])
            } catch (error) {
                console.log(error)
                return ''
            }
        }

        complexMath(args) {
            try {
                const [a, b] = strToComplex(args.VALUE1)
                const [c, d] = strToComplex(args.VALUE2)
                switch (args.OP) {
                    case '+':
                        return complexToStr([a + c, b + d])
                    
                    case '-':
                        return complexToStr([a - c, b - d])
                    
                    case '*':
                        return complexToStr([a * c - b * d, a * d + b * c])
                    
                    case '/':
                        return divideComplex(args.VALUE1, args.VALUE2)
            }
            } catch (error) {
                    console.log(error)
                    return ''
            }
        }

        complexMinus(args) {
            try {
                const [a, b] = strToComplex(args.VALUE)
                return complexToStr([-a, -b])
             } catch (error) {
                console.log(error)
                return ''
            }
        }

        complexAbs(args) {
            try {
                const [a, b] = strToComplex(args.VALUE)
                return Math.hypot(a, b)
             } catch (error) {
                console.log(error)
                return ''
            }
        }

        complexStuff(args) {
            try {
                const [a, b] = strToComplex(args.VALUE)
                switch (args.THING) {
                    case 'conjugate':
                        return complexToStr([a, -b])
                    
                    case 'reciprocal':
                        return divideComplex(1, args.VALUE)
                    
                    case 'argument (radians)':
                        return Math.atan2(b, a)
                    
                        case 'argument (degrees)':
                        const rad = Math.atan2(b, a)
                        return rad * 180 / Math.PI
                    
                    case 'log':
                        const r = Math.hypot(a, b )

                        if (r === 0) return ''

                        const O = Math.atan2(b, a)
                        return complexToStr([
                            Math.log(r),
                            O
                        ])
                }
            } catch (error) {
                console.log(error)
                return ''
            }
        }

        complexNormalization(args) {
            try {
                const [a, b] = strToComplex(args.VALUE)
                return divideComplex(args.VALUE, Math.hypot(a, b ))
             } catch (error) {
                console.log(error)
                return ''
            }
        }

        complexPower(args) {
            try {
                if (args.POWER === '^') {
                    return getComplexPower(cast.toString(args.VALUE1), cast.toString(args.VALUE2))
                }
                return getComplexPower(cast.toString(args.VALUE2), divideComplex(1, cast.toString(args.VALUE1)))
            } catch (error) {
                console.log(error)
                return ''
            }
        }

        complexCompare(args) {
            try {
                const [a, b] = strToComplex(args.VALUE1)
                const [c, d] = strToComplex(args.VALUE2)
                switch (args.COMPARISON) {
                    case '=':
                        return (a === c) && (b === d)
                    
                    case '≠':
                         return (a !== c) || (b !== d)
                    
                    case '≈':
                        return Math.hypot(a - c, b - d) < 1e-9
                }
            } catch (error) {
                console.log(error)
                return ''
            }
        }

        // quaternions

        quaternionI() {
            return '(0 + 1i + 0j + 0k)'
        }

        j() {
            return '(0 + 0i + 1j + 0k)'
        }

        k() {
            return '(0 + 0i + 0j + 1k)'
        }

        makeQuaternion(args)  {
            try {
                return quaternionToStr([cast.toNumber(args.REAL), cast.toNumber(args.I),
                     cast.toNumber(args.J), cast.toNumber(args.K)])
            } catch (error) {
                console.log(error)
                return ''
            }
        }

        quaternionMath(args) {
            try {
                const [a, b, c, d] = strToQuaternion(args.VALUE1)
                const [e, f, g, h] = strToQuaternion(args.VALUE2)
                switch (args.OP) {
                    case '+':
                        return quaternionToStr([a + e, b + f, c + g, d + h])
                    
                    case '-':
                        return quaternionToStr([a - e, b - f, c - g, d - h])
                    
                    case '*':
                        return quaternionToStr([
                            a * e - b * f - c * g - d * h,
                            a * f + b * e + c * h - d * g,
                            a * g - b * h + c * e + d * f,
                            a * h + b * g - c * f + d * e
                        ]);
                    
                    case '/':
                        return divideQuaternion(args.VALUE1, args.VALUE2)
            }
            } catch (error) {
                console.log(error)
                return ''
            }
        }

        quaternionMinus(args) {
            try {
                const [a, b, c, d] = strToQuaternion(args.VALUE)
                return quaternionToStr([-a, -b, -c, -d])
            } catch (error) {
                console.log(error)
                return ''
            }
        }

        quaternionAbs(args) {
            try {
                const [a, b, c, d] = strToQuaternion(args.VALUE)
                return Math.hypot(a, b, c, d)
             } catch (error) {
                console.log(error)
                return ''
            }
        }

        quaternionStuff(args) {
            try {
                const [a, b, c, d] = strToQuaternion(args.VALUE)

                switch (args.THING) {
                    case 'conjugate':
                        return quaternionToStr([a, -b, -c, -d])

                    case 'reciprocal':
                        return divideQuaternion(1, args.VALUE)

                    case 'argument (radians)': {
                        return Math.atan2(Math.hypot(b, c, d), a)
                    }

                    case 'argument (degrees)': {
                        const rad = Math.atan2(Math.hypot(b, c, d), a)
                        return rad * 180 / Math.PI
                    }

                    case 'log': {
                        const r = Math.hypot(a, b, c, d)

                        if (r === 0) return ''

                        const s = Math.hypot(b, c, d)

                        if (s === 0) {
                            if (a > 0) {
                                return quaternionToStr([
                                    Math.log(a), 0, 0, 0
                                ])
                            }

                            return quaternionToStr([
                                Math.log(-a), Math.PI, 0, 0
                            ])
                        }

                        const O = Math.atan2(s, a)
                        const OoverS = O / s

                        return quaternionToStr([
                            Math.log(r),
                            OoverS * b,
                            OoverS * c,
                            OoverS * d
                        ])
                    }
                }
            } catch (error) {
                console.log(error)
                return ''
            }
        }

        quaternionNormalization(args) {
            try {
                const [a, b, c, d] = strToQuaternion(args.VALUE)
                return divideQuaternion(args.VALUE, Math.hypot(a, b, c, d))
             } catch (error) {
                console.log(error)
                return ''
            }
        }

        quaternionPower(args) {
            try {
                if (args.POWER === '^') {
                    return getQuaternionPower(cast.toString(args.VALUE1), cast.toString(args.VALUE2))
                }
                return getQuaternionPower(cast.toString(args.VALUE2), divideQuaternion(1 ,cast.toString(args.VALUE1)))
            } catch (error) {
                console.log(error)
                return ''
            }
        }

        quaternionCompare(args) {
            try {
                const [a, b, c ,d] = strToQuaternion(args.VALUE1)
                const [e, f, g, h] = strToQuaternion(args.VALUE2)
                switch (args.COMPARISON) {
                    case '=':
                        return (a === e) && (b === f) && (c === g) && (d === h)
                    
                    case '≠':
                         return (a !== e) || (b !== f) || (c !== g) || (d !== h)
                    
                    case '≈':
                        return Math.hypot(a - e, b - f, c - g, d - h) < 1e-9
                }
            } catch (error) {
                console.log(error)
                return ''
            }
        }

        // convertions

        toQuaternion(args) {
            try {
                return quaternionToStr(strToQuaternion(args.VALUE))
            } catch (error) {
                console.log(error)
                return ''
            }
        }

        toComplex(args) {
            try {
            const [a, b, c, d] = strToQuaternion(args.VALUE)
                return complexToStr([a, b])
            } catch (error) {
                console.log(error)
                return ''
            }
        }

        toReal(args) {
            try {
                return strToQuaternion(args.VALUE)[0]
            } catch (error) {
                console.log(error)
                return ''
            }
        }

        getReal(args) {
            try {
                return strToQuaternion(args.VALUE)[0]
            } catch (error) {
                console.log(error)
                return ''
            }
        }

        getI(args) {
            try {
                return strToQuaternion(args.VALUE)[1]
            } catch (error) {
                console.log(error)
                return ''
            }
        }

        getJ(args) {
            try {
                return strToQuaternion(args.VALUE)[2]
            } catch (error) {
                console.log(error)
                return ''
            }
        }

        getK(args) {
            try {
                return strToQuaternion(args.VALUE)[3]
            } catch (error) {
                console.log(error)
                return ''
            }
        }
    }

    Scratch.extensions.register(new ImaginaryNumbersExtension())
})(Scratch);
