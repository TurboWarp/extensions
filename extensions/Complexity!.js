/* 
Name: Complexity!
ID: complexMath
Description: Play with Complex Numbers in TurboWarp!
By Clickertale_2 <https://scratch.mit.edu/users/-Clickertale_2-/> and Kenay <https://scratch.mit.edu/users/Kenay5-55/>
Cool License: MIT AND MPL-2.0
Thanks "rawify" <https://github.com/rawify> for the complexity
complexCode source: https://github.com/rawify/Complex.js/tree/main
*/
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("We don't like sand :(");
  }

const OGcomplexCode = `
/*
Complex.js v2.4.2 11/5/2024
https://raw.org/article/complex-numbers-in-javascript/
Copyright (c) 2024, Robert Eisele (https://raw.org/)
Licensed under the MIT license. Function
*/
'use strict';(function(r){function l(a,b){if(void 0===a||null===a)f.re=f.im=0;else if(void 0!==b)f.re=a,f.im=b;else switch(typeof a){case "object":if("im"in a&&"re"in a)f.re=a.re,f.im=a.im;else if("abs"in a&&"arg"in a){if(!isFinite(a.abs)&&isFinite(a.arg))return c.INFINITY;f.re=a.abs*Math.cos(a.arg);f.im=a.abs*Math.sin(a.arg)}else if("r"in a&&"phi"in a){if(!isFinite(a.r)&&isFinite(a.phi))return c.INFINITY;f.re=a.r*Math.cos(a.phi);f.im=a.r*Math.sin(a.phi)}else 2===a.length?(f.re=a[0],f.im=a[1]):m();
break;case "string":f.im=f.re=0;a=a.replace(/_/g,"").match(/\\d+\\.?\\d*e[+-]?\\d+|\\d+\\.?\\d*|\\.\\d+|./g);b=1;let d=0;null===a&&m();for(let e=0;e<a.length;e++){const g=a[e];" "!==g&&"\\t"!==g&&"\\n"!==g&&("+"===g?b++:"-"===g?d++:("i"===g||"I"===g?(0===b+d&&m()," "===a[e+1]||isNaN(a[e+1])?f.im+=parseFloat((d%2?"-":"")+"1"):(f.im+=parseFloat((d%2?"-":"")+a[e+1]),e++)):((0===b+d||isNaN(g))&&m(),"i"===a[e+1]||"I"===a[e+1]?(f.im+=parseFloat((d%2?"-":"")+g),e++):f.re+=parseFloat((d%2?"-":"")+g)),b=d=0))}0<b+d&&
m();break;case "number":f.im=0;f.re=a;break;default:m()}return f}function m(){throw SyntaxError("Invalid Param");}function n(a,b){a=Math.abs(a);b=Math.abs(b);a<b&&([a,b]=[b,a]);if(1E8>a)return Math.sqrt(a*a+b*b);b/=a;return a*Math.sqrt(1+b*b)}function p(a,b){const d=Math.abs(a),e=Math.abs(b);if(0===a)return Math.log(e);if(0===b)return Math.log(d);if(3E3>d&&3E3>e)return.5*Math.log(a*a+b*b);a*=.5;b*=.5;return.5*Math.log(a*a+b*b)+Math.LN2}function c(a,b){if(!(this instanceof c))return new c(a,b);a=l(a,
b);this.re=a.re;this.im=a.im}const h=Math.cosh||function(a){return 1E-9>Math.abs(a)?1-a:.5*(Math.exp(a)+Math.exp(-a))},k=Math.sinh||function(a){return 1E-9>Math.abs(a)?a:.5*(Math.exp(a)-Math.exp(-a))},f={re:0,im:0};c.prototype={re:0,im:0,sign:function(){const a=n(this.re,this.im);return new c(this.re/a,this.im/a)},add:function(a,b){a=l(a,b);b=this.isInfinite();const d=!(isFinite(a.re)&&isFinite(a.im));return b||d?b&&d?c.NAN:c.INFINITY:new c(this.re+a.re,this.im+a.im)},sub:function(a,b){a=l(a,b);b=this.isInfinite();const d=!(isFinite(a.re)&&isFinite(a.im));return b||d?b&&d?c.NAN:c.INFINITY:new c(this.re-a.re,this.im-a.im)},mul:function(a,b){a=l(a,b);b=this.isInfinite();const d=!(isFinite(a.re)&&isFinite(a.im)),e=0===this.re&&0===this.im,g=0===a.re&&0===a.im;return b&&g||d&&e?c.NAN:b||d?c.INFINITY:0===a.im&&0===this.im?new c(this.re*a.re,0):new c(this.re*a.re-this.im*a.im,this.re*a.im+this.im*a.re)},div:function(a,b){a=l(a,b);b=this.isInfinite();const d=!(isFinite(a.re)&&isFinite(a.im)),e=0===
this.re&&0===this.im,g=0===a.re&&0===a.im;if(e&&g||b&&d)return c.NAN;if(g||b)return c.INFINITY;if(e||d)return c.ZERO;if(0===a.im)return new c(this.re/a.re,this.im/a.re);if(Math.abs(a.re)<Math.abs(a.im))return b=a.re/a.im,a=a.re*b+a.im,new c((this.re*b+this.im)/a,(this.im*b-this.re)/a);b=a.im/a.re;a=a.im*b+a.re;return new c((this.re+this.im*b)/a,(this.im-this.re*b)/a)},pow:function(a,b){a=l(a,b);b=0===this.re&&0===this.im;if(0===a.re&&0===a.im)return c.ONE;if(0===a.im){if(0===this.im&&0<this.re)return new c(Math.pow(this.re,
a.re),0);if(0===this.re)switch((a.re%4+4)%4){case 0:return new c(Math.pow(this.im,a.re),0);case 1:return new c(0,Math.pow(this.im,a.re));case 2:return new c(-Math.pow(this.im,a.re),0);case 3:return new c(0,-Math.pow(this.im,a.re))}}if(b&&0<a.re)return c.ZERO;const d=Math.atan2(this.im,this.re),e=p(this.re,this.im);b=Math.exp(a.re*e-a.im*d);a=a.im*e+a.re*d;return new c(b*Math.cos(a),b*Math.sin(a))},sqrt:function(){const a=this.re,b=this.im;if(0===b)return 0<=a?new c(Math.sqrt(a),0):new c(0,Math.sqrt(-a));
var d=n(a,b);d=Math.sqrt(.5*(d+Math.abs(a)));let e=Math.abs(b)/(2*d);return 0<=a?new c(d,0>b?-e:e):new c(e,0>b?-d:d)},exp:function(){const a=Math.exp(this.re);return 0===this.im?new c(a,0):new c(a*Math.cos(this.im),a*Math.sin(this.im))},expm1:function(){const a=this.re,b=this.im;var d=Math.expm1(a)*Math.cos(b);var e=Math.PI/4;-e>b||b>e?e=Math.cos(b)-1:(e=b*b,e*=e*(e*(e*(e*(e*(e*(e/20922789888E3-1/87178291200)+1/479001600)-1/3628800)+1/40320)-1/720)+1/24)-.5);return new c(d+e,Math.exp(a)*Math.sin(b))},
log:function(){const a=this.re,b=this.im;return 0===b&&0<a?new c(Math.log(a),0):new c(p(a,b),Math.atan2(b,a))},abs:function(){return n(this.re,this.im)},arg:function(){return Math.atan2(this.im,this.re)},sin:function(){const a=this.re,b=this.im;return new c(Math.sin(a)*h(b),Math.cos(a)*k(b))},cos:function(){const a=this.re,b=this.im;return new c(Math.cos(a)*h(b),-Math.sin(a)*k(b))},tan:function(){const a=2*this.re,b=2*this.im,d=Math.cos(a)+h(b);return new c(Math.sin(a)/d,k(b)/d)},cot:function(){const a=
2*this.re,b=2*this.im,d=Math.cos(a)-h(b);return new c(-Math.sin(a)/d,k(b)/d)},sec:function(){const a=this.re,b=this.im,d=.5*h(2*b)+.5*Math.cos(2*a);return new c(Math.cos(a)*h(b)/d,Math.sin(a)*k(b)/d)},csc:function(){const a=this.re,b=this.im,d=.5*h(2*b)-.5*Math.cos(2*a);return new c(Math.sin(a)*h(b)/d,-Math.cos(a)*k(b)/d)},asin:function(){var a=this.re;const b=this.im,d=(new c(b*b-a*a+1,-2*a*b)).sqrt();a=(new c(d.re-b,d.im+a)).log();return new c(a.im,-a.re)},acos:function(){var a=this.re;const b=
this.im,d=(new c(b*b-a*a+1,-2*a*b)).sqrt();a=(new c(d.re-b,d.im+a)).log();return new c(Math.PI/2-a.im,a.re)},atan:function(){var a=this.re;const b=this.im;if(0===a){if(1===b)return new c(0,Infinity);if(-1===b)return new c(0,-Infinity)}const d=a*a+(1-b)*(1-b);a=(new c((1-b*b-a*a)/d,-2*a/d)).log();return new c(-.5*a.im,.5*a.re)},acot:function(){const a=this.re,b=this.im;if(0===b)return new c(Math.atan2(1,a),0);const d=a*a+b*b;return 0!==d?(new c(a/d,-b/d)).atan():(new c(0!==a?a/0:0,0!==b?-b/0:0)).atan()},
asec:function(){const a=this.re,b=this.im;if(0===a&&0===b)return new c(0,Infinity);const d=a*a+b*b;return 0!==d?(new c(a/d,-b/d)).acos():(new c(0!==a?a/0:0,0!==b?-b/0:0)).acos()},acsc:function(){const a=this.re,b=this.im;if(0===a&&0===b)return new c(Math.PI/2,Infinity);const d=a*a+b*b;return 0!==d?(new c(a/d,-b/d)).asin():(new c(0!==a?a/0:0,0!==b?-b/0:0)).asin()},sinh:function(){const a=this.re,b=this.im;return new c(k(a)*Math.cos(b),h(a)*Math.sin(b))},cosh:function(){const a=this.re,b=this.im;return new c(h(a)*
Math.cos(b),k(a)*Math.sin(b))},tanh:function(){const a=2*this.re,b=2*this.im,d=h(a)+Math.cos(b);return new c(k(a)/d,Math.sin(b)/d)},coth:function(){const a=2*this.re,b=2*this.im,d=h(a)-Math.cos(b);return new c(k(a)/d,-Math.sin(b)/d)},csch:function(){const a=this.re,b=this.im,d=Math.cos(2*b)-h(2*a);return new c(-2*k(a)*Math.cos(b)/d,2*h(a)*Math.sin(b)/d)},sech:function(){const a=this.re,b=this.im,d=Math.cos(2*b)+h(2*a);return new c(2*h(a)*Math.cos(b)/d,-2*k(a)*Math.sin(b)/d)},asinh:function(){let a=
this.im;this.im=-this.re;this.re=a;const b=this.asin();this.re=-this.im;this.im=a;a=b.re;b.re=-b.im;b.im=a;return b},acosh:function(){const a=this.acos();if(0>=a.im){var b=a.re;a.re=-a.im;a.im=b}else b=a.im,a.im=-a.re,a.re=b;return a},atanh:function(){var a=this.re,b=this.im;const d=1<a&&0===b,e=1-a,g=1+a,q=e*e+b*b;a=0!==q?new c((g*e-b*b)/q,(b*e+g*b)/q):new c(-1!==a?a/0:0,0!==b?b/0:0);b=a.re;a.re=p(a.re,a.im)/2;a.im=Math.atan2(a.im,b)/2;d&&(a.im=-a.im);return a},acoth:function(){const a=this.re,b=
this.im;if(0===a&&0===b)return new c(0,Math.PI/2);const d=a*a+b*b;return 0!==d?(new c(a/d,-b/d)).atanh():(new c(0!==a?a/0:0,0!==b?-b/0:0)).atanh()},acsch:function(){const a=this.re,b=this.im;if(0===b)return new c(0!==a?Math.log(a+Math.sqrt(a*a+1)):Infinity,0);const d=a*a+b*b;return 0!==d?(new c(a/d,-b/d)).asinh():(new c(0!==a?a/0:0,0!==b?-b/0:0)).asinh()},asech:function(){const a=this.re,b=this.im;if(this.isZero())return c.INFINITY;const d=a*a+b*b;return 0!==d?(new c(a/d,-b/d)).acosh():(new c(0!==
a?a/0:0,0!==b?-b/0:0)).acosh()},inverse:function(){if(this.isZero())return c.INFINITY;if(this.isInfinite())return c.ZERO;const a=this.re,b=this.im,d=a*a+b*b;return new c(a/d,-b/d)},conjugate:function(){return new c(this.re,-this.im)},neg:function(){return new c(-this.re,-this.im)},ceil:function(a){a=Math.pow(10,a||0);return new c(Math.ceil(this.re*a)/a,Math.ceil(this.im*a)/a)},floor:function(a){a=Math.pow(10,a||0);return new c(Math.floor(this.re*a)/a,Math.floor(this.im*a)/a)},round:function(a){a=
Math.pow(10,a||0);return new c(Math.round(this.re*a)/a,Math.round(this.im*a)/a)},equals:function(a,b){a=l(a,b);return Math.abs(a.re-this.re)<=c.EPSILON&&Math.abs(a.im-this.im)<=c.EPSILON},clone:function(){return new c(this.re,this.im)},toString:function(){let a=this.re,b=this.im,d="";if(this.isNaN())return"NaN";if(this.isInfinite())return"Infinity";Math.abs(a)<c.EPSILON&&(a=0);Math.abs(b)<c.EPSILON&&(b=0);if(0===b)return d+a;0!==a?(d=d+a+" ",0>b?(b=-b,d+="-"):d+="+",d+=" "):0>b&&(b=-b,d+="-");1!==
b&&(d+=b);return d+"i"},toVector:function(){return[this.re,this.im]},valueOf:function(){return 0===this.im?this.re:null},isNaN:function(){return isNaN(this.re)||isNaN(this.im)},isZero:function(){return 0===this.im&&0===this.re},isFinite:function(){return isFinite(this.re)&&isFinite(this.im)},isInfinite:function(){return!this.isFinite()}};c.ZERO=new c(0,0);c.ONE=new c(1,0);c.I=new c(0,1);c.PI=new c(Math.PI,0);c.E=new c(Math.E,0);c.INFINITY=new c(Infinity,Infinity);c.NAN=new c(NaN,NaN);c.EPSILON=1E-15;
"function"===typeof define&&define.amd?define([],function(){return c}):"object"===typeof exports?(Object.defineProperty(c,"__esModule",{value:!0}),c["default"]=c,c.Complex=c,module.exports=c):r.Complex=c})(window);`;


(function (Scratch) {
	'use strict';
function coolCis(ANGLE) {
	const result = Complex(ANGLE).mul("i").exp();
	return result;
};
class ComplexityExtension {

  constructor() {
	this.trig = ['sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'asin', 'acos', 'atan', 'acot', 'asec', 'acsc', 'sinh', 'cosh', 'tanh', 'coth', 'sech', 'csch', 'asinh', 'acosh', 'atanh', 'acoth', 'asech', 'acsch'];

  	try {
	  eval(OGcomplexCode);
	  if (window.Complex) {
		this.Complex = window.Complex;
	  } else {
		console.log("Complex is not defined on window");
	  }
	} catch (e) {
	  console.log("Error evaluating ComplexNumbersCode:", e);
	}
  }

  getInfo(){
	return {
	  id: 'complexMath',
	  name: 'Complexity!',
	  color1: '#8d3d73',
	  color2: '#4c213e',
	  color3: '#562747',
	  menuIconURI: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAE7mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuYTFjZDEyZiwgMjAyNC8xMS8xMS0xOTowODo0NiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjQgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNS0wNC0yMlQxNzoyODowOS0wNTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjUtMDQtMjJUMTc6Mjk6MDItMDU6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjUtMDQtMjJUMTc6Mjk6MDItMDU6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYzMjVjOWRlLTExNzktYTI0OC05NzU0LWZlODFlOTI3YzY1NiIgeG1wTU06RG9jdW1lbnRJRD0i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",
	  blocks: [
		{
		  opcode: 'Complexity',
		  blockType: Scratch.BlockType.REPORTER,
		  text: 'New Complex [REAL] [IMAG]',
		  arguments: {
			REAL: { type: Scratch.ArgumentType.NUMBER, defaultValue: '3' },
			IMAG: { type: Scratch.ArgumentType.NUMBER, defaultValue: '4' }
		  },
		},
		{
		  blockType: Scratch.BlockType.LABEL,
		  text: Scratch.translate("Rectangular Tools"), 
		},
		{
		  opcode: 'rectComplex',
		  blockType: Scratch.BlockType.REPORTER,
		  text: '[REAL] + [IMAG] 𝙞',
		  arguments: {
			REAL: { type: Scratch.ArgumentType.STRING, defaultValue: '3' },
			IMAG: { type: Scratch.ArgumentType.STRING, defaultValue: '4' }
		  },
		},
		{
		  opcode: 'reComplex',
		  blockType: Scratch.BlockType.REPORTER,
		  text: 'Real Part of [COMPLEX]',
		  arguments: {
			COMPLEX: { type: Scratch.ArgumentType.STRING, defaultValue: '1+2i' }
		  },
		},
		{
		  opcode: 'imComplex',
		  blockType: Scratch.BlockType.REPORTER,
		  text: 'Im. Part of [COMPLEX]',
		  arguments: {
			COMPLEX: { type: Scratch.ArgumentType.STRING, defaultValue: '1+2i' },
		  },
		},
		{
		  opcode: 'conjugateComplex',
		  blockType: Scratch.BlockType.REPORTER,
		  text: 'Conjugate of [COMPLEX]',
		  arguments: {
			COMPLEX: { type: Scratch.ArgumentType.STRING, defaultValue: '3+4i' }
		  },
		},
		{
		  blockType: Scratch.BlockType.LABEL,
		  text: Scratch.translate("Binary operators"),
		},
		{
		  opcode: 'addComplex',
		  blockType: Scratch.BlockType.REPORTER,
		  text: '[COMPLEX1] + [COMPLEX2]',
		  arguments: {
			COMPLEX1: { type: Scratch.ArgumentType.STRING, defaultValue: '3+4i' },
			COMPLEX2: { type: Scratch.ArgumentType.STRING, defaultValue: '1+2i' }
		  },
		},
		{
		  opcode: 'subtractComplex',
		  blockType: Scratch.BlockType.REPORTER,
		  text: '[COMPLEX1] - [COMPLEX2]',
		  arguments: {
			COMPLEX1: { type: Scratch.ArgumentType.STRING, defaultValue: '3+4i' },
			COMPLEX2: { type: Scratch.ArgumentType.STRING, defaultValue: '1+2i' }
		  },
		},
		{
		  opcode: 'multiplyComplex',
		  blockType: Scratch.BlockType.REPORTER,
		  text: '[COMPLEX1] × [COMPLEX2]',
		  arguments: {
			COMPLEX1: { type: Scratch.ArgumentType.STRING, defaultValue: '3+4i' },
			COMPLEX2: { type: Scratch.ArgumentType.STRING, defaultValue: '1+2i' }
		  },
		},
		{
		  opcode: 'divideComplex',
		  blockType: Scratch.BlockType.REPORTER,
		  text: '[COMPLEX1] / [COMPLEX2]',
		  arguments: {
			COMPLEX1: { type: Scratch.ArgumentType.STRING, defaultValue: '3+4i' },
			COMPLEX2: { type: Scratch.ArgumentType.STRING, defaultValue: '1+2i' }
		  },
		},
		{
		  opcode: 'powComplex',
		  blockType: Scratch.BlockType.REPORTER,
		  text: '[COMPLEX1] ^ [COMPLEX2]',
		  arguments: {
			COMPLEX1: { type: Scratch.ArgumentType.STRING, defaultValue: '2+i' },
			COMPLEX2: { type: Scratch.ArgumentType.STRING, defaultValue: '3' }
		  },
		},
		{
		  opcode: 'rootComplex',
		  blockType: Scratch.BlockType.REPORTER,
		  text: '[COMPLEX1] √ [COMPLEX2]',
		  arguments: {
			COMPLEX1: { type: Scratch.ArgumentType.STRING, defaultValue: '3' },
			COMPLEX2: { type: Scratch.ArgumentType.STRING, defaultValue: '2+11i' }
		  },
		},
		{
		  opcode: 'logComplex',
		  blockType: Scratch.BlockType.REPORTER,
		  text: 'log [BASE] [INPUT]',
		  arguments: {
			BASE: { type: Scratch.ArgumentType.STRING, defaultValue: '2+i' },
			INPUT: { type: Scratch.ArgumentType.STRING, defaultValue: '2+11i' }
		  },
		},
		{
		  opcode: 'equalsComplex',
		  blockType: Scratch.BlockType.BOOLEAN,
		  text: '[COMPLEX1] =? [COMPLEX2]',
		  arguments: {
			COMPLEX1: { type: Scratch.ArgumentType.STRING, defaultValue: '3+4i' },
			COMPLEX2: { type: Scratch.ArgumentType.STRING, defaultValue: '3+4i' }
		  },
		},
		{
		  blockType: Scratch.BlockType.LABEL,
		  text: Scratch.translate("Polar Tools"), 
		},
		{
		  opcode: 'polarComplex',
		  blockType: Scratch.BlockType.REPORTER,
		  text: 'Polar [RADIUS] ∠ [ANGLE]',
		  arguments: {
			RADIUS: { type: Scratch.ArgumentType.STRING, defaultValue: 5 },
			ANGLE: { type: Scratch.ArgumentType.STRING, defaultValue: '0.9272952180016122' }
		  },
		},
		{
		  opcode: 'absComplex',
		  blockType: Scratch.BlockType.REPORTER,
		  text: 'Magnitude of [COMPLEX]',
		  arguments: {
			COMPLEX: { type: Scratch.ArgumentType.STRING, defaultValue: '3+4i' }
		  }, //Magnitude = sqrt(Re^2 + Im^2)
		},
		{
		  opcode: 'complexSign',
		  blockType: Scratch.BlockType.REPORTER,
		  text: '∠ [COMPLEX]',
		  arguments: {
			COMPLEX: { type: Scratch.ArgumentType.STRING, defaultValue: '3+4i' }
		  }, //Sign = Complex/Magnitude
		},
		{
		  opcode: 'cisThingie',
		  blockType: Scratch.BlockType.REPORTER,
		  text: 'CiS [ANGLE]',
		  arguments: {
			ANGLE: { type: Scratch.ArgumentType.STRING, defaultValue: '0.9272952180016122' }
		  }, //CiS = e^(i*Angle)
		},
		{
		  opcode: 'argComplex',
		  blockType: Scratch.BlockType.REPORTER,
		  text: 'Argument of [COMPLEX]',
		  arguments: {
			COMPLEX: { type: Scratch.ArgumentType.STRING, defaultValue: '3+4i' }
		  }, //Angle = -i*ln(Sign)
		},
		{
		  blockType: Scratch.BlockType.LABEL,
		  text: Scratch.translate("Product tools"), 
		},
		{
		  opcode: 'expComplex',
		  blockType: Scratch.BlockType.REPORTER,
		  text: '𝑒 [COMPLEX]',
		  arguments: {
			COMPLEX: { type: Scratch.ArgumentType.STRING, defaultValue: '3+4i' }
		  },
		  description: "Raises 𝑒 to the Complex"
		},
		{
		  opcode: 'lnComplex',
		  blockType: Scratch.BlockType.REPORTER,
		  text: 'ln [COMPLEX]',
		  arguments: {
			COMPLEX: { type: Scratch.ArgumentType.STRING, defaultValue: '3+4i' }
		  },
		},
		{
		  opcode: 'ComplexTimesI',
		  blockType: Scratch.BlockType.REPORTER,
		  text: '[COMPLEXY] 𝙞',
		  arguments: {
			COMPLEXY: { type: Scratch.ArgumentType.STRING, defaultValue: '3+4i' }
		  },
		  hideFromPalette: true
		},
		{
		  opcode: 'sqrtComplex',
		  blockType: Scratch.BlockType.REPORTER,
		  text: 'Square Root of [COMPLEX]',
		  arguments: {
			COMPLEX: { type: Scratch.ArgumentType.STRING, defaultValue: '3+4i' }
		  },
		},
		{
		  opcode: 'negComplex',
		  blockType: Scratch.BlockType.REPORTER,
		  text: 'Negative [COMPLEX]',
		  arguments: {
			COMPLEX: { type: Scratch.ArgumentType.STRING, defaultValue: '3+4i' }
		  },
		},
		{
		  opcode: 'inverseComplex',
		  blockType: Scratch.BlockType.REPORTER,
		  text: 'Inverse of [COMPLEX]',
		  arguments: {
			COMPLEX: { type: Scratch.ArgumentType.STRING, defaultValue: '3+4i' }
		  },
		},
		{
		  opcode: 'getPI',
		  blockType: Scratch.BlockType.REPORTER,
		  text: '[NUM] 𝜋',
		  arguments: {
			NUM: { type: Scratch.ArgumentType.STRING, defaultValue: '' }
		  },
		},
		{
		  opcode: 'toDegrees',
		  blockType: Scratch.BlockType.REPORTER,
		  text: '[ANGLE] degs to rads',
		  arguments: {
			ANGLE: { type: Scratch.ArgumentType.STRING, defaultValue: '30' }
		  },
		},
		{
		  blockType: Scratch.BlockType.LABEL,
		  text: Scratch.translate("Vectors"),
		},
		{
		  filter: [Scratch.TargetType.SPRITE],
		  opcode: 'getPosition',
		  blockType: Scratch.BlockType.REPORTER,
		  text: 'Complex Position',
		},
		{
		  filter: [Scratch.TargetType.SPRITE],
		  opcode: 'goToComplex',
		  blockType: Scratch.BlockType.COMMAND,
		  text: 'Go to [COMPLEX]',
		  arguments: {
			COMPLEX: { type: Scratch.ArgumentType.STRING, defaultValue: '30+40i' }
		  }
		},
		{
		  filter: [Scratch.TargetType.SPRITE],
		  opcode: 'goAddComplex',
		  blockType: Scratch.BlockType.COMMAND,
		  text: 'Move by [COMPLEX]',
		  arguments: {
			COMPLEX: { type: Scratch.ArgumentType.STRING, defaultValue: '30+40i' }
		  }
		},
		{
		  filter: [Scratch.TargetType.SPRITE],
		  opcode: 'GoMulComplex',
		  blockType: Scratch.BlockType.COMMAND,
		  text: 'Mul position by [COMPLEX]',
		  arguments: {
			COMPLEX: { type: Scratch.ArgumentType.STRING, defaultValue: 5 }
		  },
		},
		{
		  filter: [Scratch.TargetType.SPRITE],
		  opcode: 'goToPolar',
		  blockType: Scratch.BlockType.COMMAND,
		  text: 'Go polar [RADII] ∠ [ANGLY]',
		  arguments: {
			RADII: { type: Scratch.ArgumentType.STRING, defaultValue: 50 },
			ANGLY: { type: Scratch.ArgumentType.STRING, defaultValue: '0.9272952180016122' }
		  },
		},
		{
		  opcode: 'mulVectorAroundPoint',
		  blockType: Scratch.BlockType.REPORTER,
		  text: 'mul [VECTOR] around [POINT] by [FACTOR]',
		  arguments: {
			VECTOR: { type: Scratch.ArgumentType.STRING, defaultValue: '1+0i' },
			POINT: { type: Scratch.ArgumentType.STRING, defaultValue: '0+0i' },
			FACTOR: { type: Scratch.ArgumentType.STRING, defaultValue: 2 }
		  },
		},
		{
		  opcode: 'rotateVectorAroundPoint',
		  blockType: Scratch.BlockType.REPORTER,
		  text: 'rotate [VECTOR] around [POINT] by angle [ANGLE]',
		  arguments: {
			VECTOR: { type: Scratch.ArgumentType.STRING, defaultValue: '1+0i' },
			POINT: { type: Scratch.ArgumentType.STRING, defaultValue: '0+0i' },
			ANGLE: { type: Scratch.ArgumentType.STRING, defaultValue: 3.1415 }
		  },
		},
		{
		  blockType: Scratch.BlockType.LABEL,
		  text: Scratch.translate("Trigonometry"),
		},
		{
		  opcode: 'trigOfComplex',
		  blockType: Scratch.BlockType.REPORTER,
		  text: '[TRIG] of [COMPLEX]',
		  arguments: {
			COMPLEX: { type: Scratch.ArgumentType.STRING, defaultValue: '3+4i' },
			TRIG: { type: Scratch.ArgumentType.STRING, menu: 'trigs' }
		  },
		},
		{
		  blockType: Scratch.BlockType.LABEL,
		  text: Scratch.translate("Test the numbers"),
		},
		{
		  opcode: 'getEpsilon',
		  blockType: Scratch.BlockType.REPORTER,
		  text: 'Small',
		},
		{
		  opcode: 'isNaNComplex',
		  blockType: Scratch.BlockType.BOOLEAN,
		  text: '[COMPLEX] is NaN?',
		  arguments: {
			COMPLEX: { type: Scratch.ArgumentType.STRING, defaultValue: '3+4i' }
		  }
		},
		{
		  opcode: 'isFiniteComplex',
		  blockType: Scratch.BlockType.BOOLEAN,
		  text: '[COMPLEX] is finite?',
		  arguments: {
			COMPLEX: { type: Scratch.ArgumentType.STRING, defaultValue: '3+4i' }
		  }
		},
		{
		  opcode: 'gammaOf',
		  blockType: Scratch.BlockType.REPORTER,
		  text: 'Γ ([ZED])',
		  arguments: {
			ZED: { type: Scratch.ArgumentType.STRING, defaultValue: '3+4i' }
		  },
		  hideFromPalette: true
		},
	  ],
	  menus: {
		trigs: { acceptReporters: true, items: this.trig }
	  }
	};
  }

  Complexity({ REAL, IMAG }) 
   {
	   try {
	  const cInstance = new this.Complex(parseFloat(REAL), parseFloat(IMAG));
	  return cInstance.toString().replace(/\s+/g, '');
	   } catch (e) {
	  return NaN
	}
  }
  
  rectComplex({ REAL, IMAG }) 
  {
	  try {
	  const cInstance = Complex(IMAG).mul("i").add(Complex(REAL))
	  return cInstance.toString().replace(/\s+/g, '');
	  	   } catch (e) {
	  return NaN
	}
  }

   reComplex({ COMPLEX }) 
   {
	   try {
	  const cInstance = new this.Complex(COMPLEX);
	  return cInstance.re; 
	   } catch (e) {
	  return NaN
	}
	}

  imComplex({ COMPLEX }) 
  {
	  try {
	  const cInstance = new this.Complex(COMPLEX);
	  return cInstance.im;  
	   } catch (e) {
	  return NaN
	}
  }

  polarComplex({ RADIUS, ANGLE }) 
  {
	  try {
     const cInstance = coolCis(Complex(ANGLE)).mul(Complex(RADIUS));
     return cInstance.toString().replace(/\s+/g, '');
	   } catch (e) {
	  return NaN
	}
  }

  cisThingie({ ANGLE })
  {
	try {
    return coolCis(ANGLE).toString().replace(/\s+/g, ''); //Meet my creation!
	   } catch (e) {
	  return NaN
	}
  }

  addComplex({ COMPLEX1, COMPLEX2 }) 
  {
	  try {
	  const c1 = new this.Complex(COMPLEX1);
	  const c2 = new this.Complex(COMPLEX2);
	  const result = c1.add(c2); //Uses the structure a1.func(a2)
	  return result.toString().replace(/\s+/g, '');
	   } catch (e) {
	  return NaN
	}
  }

  subtractComplex({ COMPLEX1, COMPLEX2 }) //Same
  {
	  try {
	  const c1 = new this.Complex(COMPLEX1);
	  const c2 = new this.Complex(COMPLEX2);
	  const result = c1.sub(c2);
	  return result.toString().replace(/\s+/g, '');
	   } catch (e) {
	  return NaN
	}
  }

  multiplyComplex({ COMPLEX1, COMPLEX2 }) //Again
  {
	  try {
	  const c1 = new this.Complex(COMPLEX1);
	  const c2 = new this.Complex(COMPLEX2);
	  const result = c1.mul(c2);
	  return result.toString().replace(/\s+/g, '');
	   } catch (e) {
	  return NaN
	}
  }

  ComplexTimesI({ COMPLEXY }) //Forever
  {
	  try { 
	  const c1 = new this.Complex(COMPLEXY);
	  const result = c1.mul(Complex.I);
	  return result.toString().replace(/\s+/g, '');
	   } catch (e) {
	  return NaN
	}
  }

  divideComplex({ COMPLEX1, COMPLEX2 }) //And ever
  {
	  try {
	  const c1 = new this.Complex(COMPLEX1);
	  const c2 = new this.Complex(COMPLEX2);
	  const result = c1.div(c2);
	  return result.toString().replace(/\s+/g, '');
	   } catch (e) {
	  return NaN
	}
  }

  powComplex({ COMPLEX1, COMPLEX2 }) //ever...
  {
	  try {
	  const c1 = new this.Complex(COMPLEX1);
	  const c2 = new this.Complex(COMPLEX2);
	  const result = c1.pow(c2);
	  return result.toString().replace(/\s+/g, '');
	   } catch (e) {
	  return NaN
	}
  }

  rootComplex({ COMPLEX1, COMPLEX2 }) 
  {
	  try {
	  const c1 = new this.Complex(COMPLEX2);
	  const c2 = new this.Complex(COMPLEX1).inverse();
	  const result = c1.pow(c2);
	  return result.toString().replace(/\s+/g, ''); //Meet my... other creations!
	   } catch (e) {
	  return NaN
	}
  }

  sqrtComplex({ COMPLEX }) 
  {
	  try{
	  const cInstance = new this.Complex(COMPLEX);
	  const result = cInstance.sqrt();
	  return result.toString().replace(/\s+/g, '');
	   } catch (e) {
	  return NaN
	}
  }
  
  logComplex({ BASE, INPUT }) 
  {
	  try {
	  const cBase = new this.Complex(BASE);
	  const cInput = new this.Complex(INPUT);
	  const result = cInput.log().div(cBase.log());
	  return result.toString().replace(/\s+/g, '');
	   } catch (e) {
	  return NaN
	}
  }

  expComplex({ COMPLEX }) 
  {
	  try {
	  const cInstance = new this.Complex(COMPLEX);
	  const result = cInstance.exp();
	  return result.toString().replace(/\s+/g, '');
	   } catch (e) {
	  return NaN
	}
  }

  lnComplex({ COMPLEX }) 
  {
	  try {
	  const cInstance = new this.Complex(COMPLEX);
	  const result = cInstance.log();
	  return result.toString().replace(/\s+/g, '');
	   } catch (e) {
	  return NaN
	}
  }

  conjugateComplex({ COMPLEX }) 
  {
	  try {
	  const cInstance = new this.Complex(COMPLEX);
	  const result = cInstance.conjugate();
	  return result.toString().replace(/\s+/g, '');
	   } catch (e) {
	  return NaN
	}
  }

  complexSign({ COMPLEX }) 
  {
	  try {
      const cInstance = new this.Complex(COMPLEX);
      const result = cInstance.sign();
      return result.toString().replace(/\s+/g, '');
	   } catch (e) {
	  return NaN
	}
  }

  absComplex({ COMPLEX }) 
  {
	  try {
	  const cInstance = new this.Complex(COMPLEX);
	  const result = cInstance.abs();
	  return result.toString().replace(/\s+/g, '');
	   } catch (e) {
	  return NaN
	}
  }

  argComplex({ COMPLEX }) 
  {
	  try {
	  const cInstance = new this.Complex(COMPLEX);
	  const result = cInstance.arg();
	  return result.toString().replace(/\s+/g, '');
	   } catch (e) {
	  return NaN
	}
  }

  inverseComplex({ COMPLEX }) 
  {
	  try {
	  const cInstance = new this.Complex(COMPLEX);
	  const result = cInstance.inverse();
	  return result.toString().replace(/\s+/g, '');
	   } catch (e) {
	  return NaN
	}
  }

  negComplex({ COMPLEX }) 
  {
	  try {
	  const cInstance = new this.Complex(COMPLEX);
	  const result = cInstance.neg();
	  return result.toString().replace(/\s+/g, '');
	   } catch (e) {
	  return NaN
	}
  }

  mulVectorAroundPoint({ VECTOR, POINT, FACTOR }) 
  {
	try {
	  const p = new this.Complex(POINT);
	  const result = Complex(VECTOR).sub(p).mul(Complex(FACTOR)).add(p);
	  return result.toString().replace(/\s+/g, '');
	} catch (e) {
	  return NaN;
	}
  }

  rotateVectorAroundPoint({ VECTOR, POINT, ANGLE }) 
  {
	try {
	  const a = new this.Complex(ANGLE);
	  const p = new this.Complex(POINT);
	  const result = Complex(VECTOR).sub(p).mul(coolCis(a)).add(p);
	  return result.toString().replace(/\s+/g, '');
	} catch (e) {
	  return NaN;
	}
  }

  getPosition(args, util) 
  {
	try {
	  return Complex(util.target.x, util.target.y).toString().replace(/\s+/g, '');
	} catch (e) {
		if (util.target.y < 0) {
	  let imPart = util.target.y + "i"
	  return util.target.x + imPart;
	}
	return util.target.x + "+" + util.target.y + "i";
  }
  }

  goToComplex(args, util) 
  {
	  try {
      const cInstance = new this.Complex(args.COMPLEX);
      util.target.setXY(cInstance.re, cInstance.im);
	} catch (e) {
	  util.target.setXY(util.target.x, util.target.y);
	}
  }

  goAddComplex(args, util) 
  {
	  try {
      const cInstance = new this.Complex(args.COMPLEX);
      util.target.setXY(util.target.x + cInstance.re, util.target.y + cInstance.im);
	} catch (e) {
	  util.target.setXY(util.target.x, util.target.y);
	}
  }

  goToPolar(args, util) 
  {
	  try {
      const cInstance = coolCis(args.ANGLY).mul(args.RADII);
      util.target.setXY(cInstance.re, cInstance.im);
	} catch (e) {
	  util.target.setXY(util.target.x, util.target.y);
	}
  }

  GoMulComplex(args, util) 
  {
	  try {
      const cIn = Complex(args.COMPLEX);
	  const cInstance = Complex(util.target.x, util.target.y).mul(cIn);
      util.target.setXY(cInstance.re, cInstance.im);
	} catch (e) {
	  util.target.setXY(util.target.x, util.target.y);
	}
  }

  trigOfComplex({ COMPLEX, TRIG }) 
  {
	try {
	  const cInstance = new this.Complex(COMPLEX);
	  const trigMethod = TRIG.toLowerCase();
	  const validTrigFunctions = this.trig;
	  if (validTrigFunctions.includes(trigMethod) && typeof cInstance[trigMethod] === 'function') {
		const result = cInstance[trigMethod]();
		return result.toString().replace(/\s+/g, '');
	  } else {
		return "0";
	  }
	} catch (e) {
	  return NaN;
	}
  }
  
  getPI({ NUM }) 
  {
	  try {
	if (NUM == "") {
		return Complex.PI
	}
	const n = Complex(NUM).mul(Complex.PI);
	return n.toString().replace(/\s+/g, '');
	} catch (e) {
	return NaN;
  }
  }

  toDegrees({ ANGLE }) 
  {
	  try {
	  const cInstance = Complex(ANGLE).mul(0.017453292519943295);
	  return cInstance.toString().replace(/\s+/g, '');
	} catch (e) {
	  return NaN;
	}
  }

  equalsComplex({ COMPLEX1, COMPLEX2 }) 
  {
	try {
	  const c1 = new this.Complex(COMPLEX1);
	  const c2 = new this.Complex(COMPLEX2);
	  return c1.equals(c2);
	} catch (e) {
	  return false;
	}
  }

gammaOf({ ZED }) 
  {
  let c = [
  0, //term 0
  12660849.842047213,
  -50335415.002908535,
   84454267.34858105, //3
  -77919883.76930115,
   43222228.65544386,
  -14822605.274039656,
    3120357.332437802, //7
    -387970.92317872215,
      26862.929569096596,
       -580.6487234445449,
        312.43962238445295, //11
        300.96569466095724,
        301.00429242666866,
        301.00427867948963,
        301.00427867952084 //15
];
	const Z = Complex(ZED)
    if (Z.re < 0.5) {
      return Complex.PI.div(z.mul(3.1415926535897932).sin().mul(gammaOf(Complex(1).sub(Z))));
    };
  
    const z = Z.sub(1);
    let x = Complex(2.5066282746310002);
	let a;

     for (var i = 1; i < 15; i++) {
	  x = Complex(c[i]).div(z.add(i)).add(x).toString();
  };
    const b = z.add(15).pow(z.add(0.5)).mul(z.neg().sub(15).exp()).mul(x);
    return b.toString().replace(/\s+/g, '');
  }
  
  getEpsilon() 
  {
	try {
	  return this.Complex.EPSILON;
	} catch (e) {
	  return 0.000000000000001;
	}
  }

  isNaNComplex({ COMPLEX }) 
  {
	try {
	  const cInstance = new this.Complex(COMPLEX);
	  return cInstance.isNaN();
	} catch (e) {
	  return false;
	}
  }

  isFiniteComplex({ COMPLEX }) 
  { 
	try {
	  const cInstance = new this.Complex(COMPLEX);
	  return cInstance.isFinite();
	} catch (e) {
	  return false;
	}
  }
  
}
Scratch.extensions.register(new ComplexityExtension()); 

})(Scratch);
