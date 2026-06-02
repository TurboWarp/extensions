// Name of Extension: Complex Analysis
// Made by: Virlasl (Scratch profile page: https://scratch.mit.edu/users/Virlasl/ )
// Description: A comprehensive toolkit for complex numbers, including arithmetic, trigonometric functions, and type classification, all supporting complex numbers.
// ID: complexAnalysis

(function(Scratch) {        
    'use strict';

    // ==========================================
    // 1. ENGINE CONSTANTS (Aligned to maximum engine limits)
    // ==========================================
    const e = Math.E;
    const pi = Math.PI;

    // ==========================================
    // 2. MATHEMATICAL CORE PIPELINE
    // ==========================================
    
    // Completely fixed precision system with a 0.001 closeness integer snapping mechanism
    function safeRound(value) {
        let parsed = parseFloat(value);
        if (isNaN(parsed)) return "NaN";
        
        // --- FIXED INFINITY PASS-THROUGH ---
        // Instead of killing infinities, pass them through as clean strings!
        if (parsed === Infinity) return "Infinity";
        if (parsed === -Infinity) return "-Infinity";

        let strVal = String(value);
        // Do not alter scientific notation Configurations
        if (strVal.includes('e') || strVal.includes('E')) {
            return strVal;
        }

        // 1. First, check your 0.001 snapping rule for integers
        let nearestInteger = Math.round(parsed);
        if (Math.abs(parsed - nearestInteger) < 0.001) {
            return String(nearestInteger);
        }

        // 2. NEW DETECTOR: Only fix trailing binary drift blocks
        if (/(9{4,}|0{4,})[0-9]?$/.test(strVal)) {
            let rounded = Math.round(parsed * 1e12) / 1e12;
            return String(rounded);
        }

        // 3. Otherwise, return the clean string
        return strVal;
    }

    function format_complex(a, b) {
        let a_str = safeRound(a);
        let b_str = safeRound(b);
        
        if (a_str === "NaN" || b_str === "NaN") return "NaN";
        
        let a_parsed = parseFloat(a_str);
        let b_parsed = parseFloat(b_str);
            
        if (b_parsed === 0) return a_str;
        if (b_parsed === 1) return a_parsed !== 0 ? `${a_str} + i` : "i";
        if (b_parsed === -1) return a_parsed !== 0 ? `${a_str} - i` : "-i";
        if (b_parsed > 0) return a_parsed !== 0 ? `${a_str} + ${b_str}i` : `${b_str}i`;
        return a_parsed !== 0 ? `${a_str} - ${safeRound(Math.abs(b_parsed))}i` : `-${safeRound(Math.abs(b_parsed))}i`;
    }

    function realpartofcomplexnumber(number) {
        if (String(number).includes("NaN") || String(number).includes("Undefined")) return "NaN";
        let cleaned = String(number).replace(/\s+/g, "");
        let parts = cleaned.match(/[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?i?/g);
        if (!parts) {
            parts = cleaned.match(/[+-]?[^+-]+/g);
        }
        if (!parts) return "0";
        for (let part of parts) {
            if (!part.includes('i') && part !== '' && part !== '+' && part !== '-') return part;
        }
        return "0";
    }

    function imaginarypartofcomplexnumber(number) {
        if (String(number).includes("NaN") || String(number).includes("Undefined")) return "NaN";
        let cleaned = String(number).replace(/\s+/g, "");
        let parts = cleaned.match(/[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?i?/g);
        if (!parts) {
            parts = cleaned.match(/[+-]?[^+-]+/g);
        }
        if (!parts) return "0i";
        for (let part of parts) {
            if (part.includes('i')) {
                if (part === 'i' || part === '+i') return "1i";
                if (part === '-i') return "-1i";
                return part;
            }
        }
        return "0i";
    }

    function imaginarypartofnumberdividedbyi(n) {
        let b_str = imaginarypartofcomplexnumber(n);
        if (b_str === "NaN") return NaN;
        if (b_str.endsWith("i")) b_str = b_str.slice(0, -1);
        if (b_str === "" || b_str === "+") return 1;
        if (b_str === "-") return -1;
        return parseFloat(b_str);
    }

    function complexaddition(n1, n2) {
        let a = parseFloat(realpartofcomplexnumber(n1));
        let b = imaginarypartofnumberdividedbyi(n1);
        let c = parseFloat(realpartofcomplexnumber(n2));
        let d = imaginarypartofnumberdividedbyi(n2);
        if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) return "NaN";
        return format_complex(a + c, b + d);
    }

    function complexsubtraction(n1, n2) {
        let a = parseFloat(realpartofcomplexnumber(n1));
        let b = imaginarypartofnumberdividedbyi(n1);
        let c = parseFloat(realpartofcomplexnumber(n2));
        let d = imaginarypartofnumberdividedbyi(n2);
        if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) return "NaN";
        return format_complex(a - c, b - d);
    }

    function multiplycomplexnumbers(a1, b1) {
        let a = parseFloat(realpartofcomplexnumber(a1));
        let b = imaginarypartofnumberdividedbyi(a1);
        let c = parseFloat(realpartofcomplexnumber(b1));
        let d = imaginarypartofnumberdividedbyi(b1);
        if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) return "NaN";
        return format_complex((a * c) - (b * d), (a * d) + (b * c));
    }

    // ==========================================
    // 3. ADVANCED OPERATIONS Pipeline
    // ==========================================
    function complexdivision(d1, d2) {
        let a = parseFloat(realpartofcomplexnumber(d1));
        let b = imaginarypartofnumberdividedbyi(d1);
        let c = parseFloat(realpartofcomplexnumber(d2));
        let d = imaginarypartofnumberdividedbyi(d2);
        if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) return "NaN";
        let denominator = c**2 + d**2;
        if (denominator === 0) return "NaN"; 
        return format_complex((a * c + b * d) / denominator, (b * c - a * d) / denominator);
    }

    function complexexponentiation(e1, e2) {
        let a = parseFloat(realpartofcomplexnumber(e1));
        let b = imaginarypartofnumberdividedbyi(e1);
        let c = parseFloat(realpartofcomplexnumber(e2));
        let d = imaginarypartofnumberdividedbyi(e2);
        
        if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) return "NaN";
        
        let r = Math.sqrt(a**2 + b**2);
        if (r === 0) return c > 0 ? "0" : "NaN";
        let arg = Math.atan2(b, a);
        
        let partA = Math.pow(e, c * Math.log(r) - d * arg);
        let partBrealpart = Math.cos(d * Math.log(r) + c * arg);
        let partBimaginarypart = Math.sin(d * Math.log(r) + c * arg);
        
        if (isNaN(partA) || isNaN(partBrealpart) || isNaN(partBimaginarypart)) return "NaN";
        
        return multiplycomplexnumbers(format_complex(partA, 0), format_complex(partBrealpart, partBimaginarypart));
    }

    function lnAplusIB(real, imag) {
        if (isNaN(real) || isNaN(imag)) return "NaN";
        let r = Math.sqrt(real**2 + imag**2);
        if (r === 0) return "NaN"; 
        let theta = Math.atan2(imag, real);
        return format_complex(Math.log(r), theta);
    }

    // Fixed naming reference to match usage
    function native_complex_ln_string(n) {
        let r = parseFloat(realpartofcomplexnumber(n));
        let i = imaginarypartofnumberdividedbyi(n);
        return lnAplusIB(r, i);
    }

    function complex_sqrt(n) {
        return complexexponentiation(n, "0.5");
    }

    // ==========================================
    // 4. TURBOWARP EXTENSION CONFIGURATION
    // ==========================================
    class ComplexAnalysisExtension {
        getInfo() {
            return {
                id: 'complexAnalysis',
                name: 'Complex Analysis',
                iconURL: 'https://raw.githubusercontent.com/Virlasl/YOUR_REPO_NAME/master/Picture.png',
                blockIconURI: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><text x="2" y="18" fill="white" font-family="monospace, sans-serif" font-size="18" font-weight="900">ℂ</text></svg>',
                color1: '#3408a2', 
                color2: '#240475', 
                blocks: [
                    { opcode: 'constant_e', blockType: Scratch.BlockType.REPORTER, text: 'e' },
                    { opcode: 'constant_pi', blockType: Scratch.BlockType.REPORTER, text: 'π' },
                    '---',
                    {
                        opcode: 'make_complex',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[BOX1] + [BOX2] i',
                        arguments: {
                            BOX1: { type: Scratch.ArgumentType.STRING, defaultValue: '3' },
                            BOX2: { type: Scratch.ArgumentType.STRING, defaultValue: '4' }
                        }
                    },
                    {
                        opcode: 'get_real',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Real part of [VAL]',
                        arguments: { VAL: { type: Scratch.ArgumentType.STRING, defaultValue: '-2 - 3i' } }
                    },
                    {
                        opcode: 'get_imag',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Imaginary part of [VAL]',
                        arguments: { VAL: { type: Scratch.ArgumentType.STRING, defaultValue: '12 - 7i' } }
                    },
                    {
                        opcode: 'get_imag_pure',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Imaginary part of [VAL] without "i"',
                        arguments: { VAL: { type: Scratch.ArgumentType.STRING, defaultValue: '10 + 8i' } }
                    },
                    '---',
                    {
                        opcode: 'is_real',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'Is [VAL] real number?',
                        arguments: { VAL: { type: Scratch.ArgumentType.STRING, defaultValue: '5' } }
                    },
                    {
                        opcode: 'is_pure_imaginary',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'Is [VAL] only imaginary?',
                        arguments: { VAL: { type: Scratch.ArgumentType.STRING, defaultValue: '3i' } }
                    },
                    {
                        opcode: 'is_complex',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'Is [VAL] a complex number?',
                        arguments: { VAL: { type: Scratch.ArgumentType.STRING, defaultValue: '2+4i' } }
                    },
                    '---', 
                    {
                        opcode: 'add',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[N1] + [N2]',
                        arguments: { N1: { type: Scratch.ArgumentType.STRING, defaultValue: '' }, N2: { type: Scratch.ArgumentType.STRING, defaultValue: '' } }
                    },
                    {
                        opcode: 'sub',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[N1] - [N2]',
                        arguments: { N1: { type: Scratch.ArgumentType.STRING, defaultValue: '' }, N2: { type: Scratch.ArgumentType.STRING, defaultValue: '' } }
                    },
                    {
                        opcode: 'mul',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[N1] * [N2]',
                        arguments: { N1: { type: Scratch.ArgumentType.STRING, defaultValue: '' }, N2: { type: Scratch.ArgumentType.STRING, defaultValue: '' } }
                    },
                    {
                        opcode: 'div',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[N1] / [N2]',
                        arguments: { N1: { type: Scratch.ArgumentType.STRING, defaultValue: '' }, N2: { type: Scratch.ArgumentType.STRING, defaultValue: '' } }
                    },
                    '---', 
                    {
                        opcode: 'pow',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[N1] ^ [N2]',
                        arguments: { N1: { type: Scratch.ArgumentType.STRING, defaultValue: '' }, N2: { type: Scratch.ArgumentType.STRING, defaultValue: '' } }
                    },
                    {
                        opcode: 'rad',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[N1] √ [N2]',
                        arguments: { N1: { type: Scratch.ArgumentType.STRING, defaultValue: '' }, N2: { type: Scratch.ArgumentType.STRING, defaultValue: '' } }
                    },
                    {
                        opcode: 'log_base',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'log [N1] of [N2]',
                        arguments: { N1: { type: Scratch.ArgumentType.STRING, defaultValue: '' }, N2: { type: Scratch.ArgumentType.STRING, defaultValue: '' } }
                    },
                    '---',
                    {
                        opcode: 'e_to_ix',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'e^i [N1]',
                        arguments: { N1: { type: Scratch.ArgumentType.STRING, defaultValue: '' } }
                    },
                    {
                        opcode: 'n_to_pow_i',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[N1] ^i',
                        arguments: { N1: { type: Scratch.ArgumentType.STRING, defaultValue: '' } }
                    },
                    {
                        opcode: 'i_to_pow_x',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'i^ [N1]',
                        arguments: { N1: { type: Scratch.ArgumentType.STRING, defaultValue: '' } }
                    },
                    '---', 
                    {
                        opcode: 'abs',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'abs of [N1]',
                        arguments: { N1: { type: Scratch.ArgumentType.STRING, defaultValue: '' } }
                    },
                    {
                        opcode: 'cos',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'cos of [N1] (Radians)',
                        arguments: { N1: { type: Scratch.ArgumentType.STRING, defaultValue: '' } }
                    },
                    {
                        opcode: 'sin',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'sin of [N1] (Radians)',
                        arguments: { N1: { type: Scratch.ArgumentType.STRING, defaultValue: '' } }
                    },
                    {
                        opcode: 'tan',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'tan of [N1] (Radians)',
                        arguments: { N1: { type: Scratch.ArgumentType.STRING, defaultValue: '' } }
                    },
                    {
                        opcode: 'acos',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'acos of [N1] (Radians)',
                        arguments: { N1: { type: Scratch.ArgumentType.STRING, defaultValue: '' } }
                    },
                    {
                        opcode: 'asin',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'asin of [N1] (Radians)',
                        arguments: { N1: { type: Scratch.ArgumentType.STRING, defaultValue: '' } }
                    },
                    {
                        opcode: 'atan',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'atan of [N1] (Radians)',
                        arguments: { N1: { type: Scratch.ArgumentType.STRING, defaultValue: '' } }
                    },
                    {
                        opcode: 'atan2',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'atan2 of [N1] and [N2] (Radians)',
                        arguments: { N1: { type: Scratch.ArgumentType.STRING, defaultValue: '' }, N2: { type: Scratch.ArgumentType.STRING, defaultValue: '' } }
                    }
                ]
            };
        }

        // ==========================================
        // 5. BLOCK IMPLEMENTATIONS (OPCODES)
        // ==========================================
        constant_e() { return String(e); }
        constant_pi() { return String(pi); }

        make_complex(args) {
            let r = parseFloat(realpartofcomplexnumber(args.BOX1));
            let i = parseFloat(realpartofcomplexnumber(args.BOX2));
            if (isNaN(r) || isNaN(i)) return "NaN";
            return format_complex(r, i);
        }

        get_real(args) { return realpartofcomplexnumber(args.VAL); }
        get_imag(args) { return imaginarypartofcomplexnumber(args.VAL); }
        get_imag_pure(args) { 
            let pureVal = imaginarypartofnumberdividedbyi(args.VAL);
            return isNaN(pureVal) ? "NaN" : String(pureVal);
        }

        is_real(args) {
            let b = imaginarypartofnumberdividedbyi(args.VAL);
            return isNaN(b) ? false : b === 0;
        }

        is_pure_imaginary(args) {
            let a = parseFloat(realpartofcomplexnumber(args.VAL));
            return isNaN(a) ? false : a === 0;
        }

        is_complex(args) {
            let a = parseFloat(realpartofcomplexnumber(args.VAL));
            let b = imaginarypartofnumberdividedbyi(args.VAL);
            if (isNaN(a) || isNaN(b)) return false;
            return a !== 0 && b !== 0;
        }

        add(args) { return complexaddition(args.N1, args.N2); }
        sub(args) { return complexsubtraction(args.N1, args.N2); }
        mul(args) { return multiplycomplexnumbers(args.N1, args.N2); }
        div(args) { return complexdivision(args.N1, args.N2); }
        pow(args) { return complexexponentiation(args.N1, args.N2); }
        
        rad(args) {
            let fractional_power = complexdivision("1", args.N1);
            if (fractional_power === "NaN") return "NaN";
            return complexexponentiation(args.N2, fractional_power);
        }

        log_base(args) {
            let base_parsed = native_complex_ln_string(args.N1);
            let num_parsed = native_complex_ln_string(args.N2);
            if (base_parsed === "NaN" || num_parsed === "NaN") return "NaN";
            return complexdivision(num_parsed, base_parsed);
        }

        e_to_ix(args) {
            let x = parseFloat(realpartofcomplexnumber(args.N1));
            if (isNaN(x)) return "NaN";
            return format_complex(Math.cos(x), Math.sin(x));
        }

        n_to_pow_i(args) {
            let n = parseFloat(realpartofcomplexnumber(args.N1));
            if (isNaN(n) || n <= 0) return "NaN";
            return format_complex(Math.cos(Math.log(n)), Math.sin(Math.log(n)));
        }

        i_to_pow_x(args) {
            let x = parseFloat(realpartofcomplexnumber(args.N1));
            if (isNaN(x)) return "NaN";
            let angle = (pi * x) / 2;
            return format_complex(Math.cos(angle), Math.sin(angle));
        }

        abs(args) {
            let a = parseFloat(realpartofcomplexnumber(args.N1));
            let b = imaginarypartofnumberdividedbyi(args.N1);
            if (isNaN(a) || isNaN(b)) return "NaN";
            let modulus = Math.sqrt(a**2 + b**2);
            return safeRound(modulus);
        }

        sin(args) {
            let a = parseFloat(realpartofcomplexnumber(args.N1));
            let b = imaginarypartofnumberdividedbyi(args.N1);
            if (isNaN(a) || isNaN(b)) return "NaN";
            return format_complex(Math.sin(a) * Math.cosh(b), Math.cos(a) * Math.sinh(b));
        }

        cos(args) {
            let a = parseFloat(realpartofcomplexnumber(args.N1));
            let b = imaginarypartofnumberdividedbyi(args.N1);
            if (isNaN(a) || isNaN(b)) return "NaN";
            return format_complex(Math.cos(a) * Math.cosh(b), -Math.sin(a) * Math.sinh(b));
        }

        tan(args) {
            let a = parseFloat(realpartofcomplexnumber(args.N1));
            let b = imaginarypartofnumberdividedbyi(args.N1);
            if (isNaN(a) || isNaN(b)) return "NaN";
            let denominator = Math.cos(2 * a) + Math.cosh(2 * b);
            if (denominator === 0) return "NaN";
            return format_complex(Math.sin(2 * a) / denominator, Math.sinh(2 * b) / denominator);
        }

        asin(args) {
            let check = parseFloat(realpartofcomplexnumber(args.N1));
            if (isNaN(check)) return "NaN";
            let iz = multiplycomplexnumbers("i", args.N1);
            let z_sq = multiplycomplexnumbers(args.N1, args.N1);
            let one_minus_z_sq = complexsubtraction("1", z_sq);
            let sqrt_term = complex_sqrt(one_minus_z_sq);
            let log_argument = complexaddition(iz, sqrt_term);
            let ln_res = native_complex_ln_string(log_argument);
            if (ln_res === "NaN") return "NaN";
            return multiplycomplexnumbers("-i", ln_res);
        }

        acos(args) {
            let check = parseFloat(realpartofcomplexnumber(args.N1));
            if (isNaN(check)) return "NaN";
            let z_sq = multiplycomplexnumbers(args.N1, args.N1);
            let one_minus_z_sq = complexsubtraction("1", z_sq);
            let sqrt_term = complex_sqrt(one_minus_z_sq);
            let i_times_sqrt = multiplycomplexnumbers("i", sqrt_term);
            let log_argument = complexaddition(args.N1, i_times_sqrt);
            let ln_res = native_complex_ln_string(log_argument);
            if (ln_res === "NaN") return "NaN";
            return multiplycomplexnumbers("-i", ln_res);
        }

        atan(args) {
            let check = parseFloat(realpartofcomplexnumber(args.N1));
            if (isNaN(check)) return "NaN";
            let iz = multiplycomplexnumbers("i", args.N1);
            let numerator = complexsubtraction("1", iz);
            let denominator = complexaddition("1", iz);
            let div_res = complexdivision(numerator, denominator);
            let ln_res = native_complex_ln_string(div_res);
            if (ln_res === "NaN") return "NaN";
            return multiplycomplexnumbers("0.5i", ln_res);
        }

        atan2(args) {
            let y_real = parseFloat(realpartofcomplexnumber(args.N1));
            let y_imag = imaginarypartofnumberdividedbyi(args.N1);
            let x_real = parseFloat(realpartofcomplexnumber(args.N2));
            let x_imag = imaginarypartofnumberdividedbyi(args.N2);

            if (isNaN(y_real) || isNaN(y_imag) || isNaN(x_real) || isNaN(x_imag)) return "NaN";

            if (y_imag === 0 && x_imag === 0) {
                if (y_real === 0 && x_real === 0) return "NaN";
                return format_complex(Math.atan2(y_real, x_real), 0);
            }

            let iy = multiplycomplexnumbers("i", args.N1);
            let numerator = complexaddition(args.N2, iy);

            let x_sq = multiplycomplexnumbers(args.N2, args.N2);
            let y_sq = multiplycomplexnumbers(args.N1, args.N1);
            let sum_sq = complexaddition(x_sq, y_sq);
            let denominator = complex_sqrt(sum_sq);

            let ratio = complexdivision(numerator, denominator);
            let ln_res = native_complex_ln_string(ratio);
            if (ln_res === "NaN") return "NaN";
            return multiplycomplexnumbers("-i", ln_res);
        }
    }

    Scratch.extensions.register(new ComplexAnalysisExtension());
})(Scratch);
