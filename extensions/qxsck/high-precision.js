(function(Scratch) {
	'use strict';
	Scratch.translate.setup({
		zh: {
			name: '高精度',
			add: '[A] + [B]',
			subtract: '[A] - [B]',
			multiply: '[A] * [B]',
			divided: '[A] / [B] ，精度是 [PRE]',
		},
		en: {
			name: 'high precision',
			add: '[A] + [B]',
			subtract: '[A] - [B]',
			multiply: '[A] * [B]',
			divided: '[A] / [B] ,precision is [PRE]',
		}
	});

	class highPrecision {
		getInfo() {
			return {
				id: 'qxsckhighprecision',
				name: Scratch.translate({
					id: 'name',
					default: 'high precision'
				}),
				blocks: [{
					opcode: 'add',
					blockType: Scratch.BlockType.REPORTER,
					text: Scratch.translate({
						id: 'add',
						default: '[A] + [B]'
					}),
					arguments: {
						A: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: '0.2'
						},
						B: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: '0.1'
						},
					}
				}, {
					opcode: 'subtract',
					blockType: Scratch.BlockType.REPORTER,
					text: Scratch.translate({
						id: 'subtract',
						default: '[A] - [B]'
					}),
					arguments: {
						A: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: '0.4'
						},
						B: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: '0.1'
						},
					}
				}, {
					opcode: 'multiply',
					blockType: Scratch.BlockType.REPORTER,
					text: Scratch.translate({
						id: 'multiply',
						default: '[A] * [B]'
					}),
					arguments: {
						A: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: '0.3'
						},
						B: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: '0.1'
						},
					}
				}, {
					opcode: 'divided',
					blockType: Scratch.BlockType.REPORTER,
					text: Scratch.translate({
						id: 'divided',
						default: '[A] / [B] ,precision is [PRE]'
					}),
					arguments: {
						A: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: '10'
						},
						B: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: '3'
						},
						PRE: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: '10'
						},
					}
				}, ]
			};
		}

		add(args) {
			var num1 = Scratch.Cast.toString(args.A),
				num2 = Scratch.Cast.toString(args.B);
			let isNegative1 = false;
			let isNegative2 = false;
			if (num1[0] === '-') isNegative1 = true, num1 = num1.slice(1);
			if (num2[0] === '-') isNegative2 = true, num2 = num2.slice(1);
			let[intPart1, decimalPart1] = num1.split('.');
			let[intPart2, decimalPart2] = num2.split('.');
			if (!decimalPart1) decimalPart1 = '0';
			if (!decimalPart2) decimalPart2 = '0';
			const maxDecimalLength = Math.max(decimalPart1.length, decimalPart2.length);
			decimalPart1 = decimalPart1.padEnd(maxDecimalLength, '0');
			decimalPart2 = decimalPart2.padEnd(maxDecimalLength, '0');
			const combined1 = (isNegative1 ? '-' : '') + intPart1 + decimalPart1;
			const combined2 = (isNegative2 ? '-' : '') + intPart2 + decimalPart2;
			const sumBigInt = BigInt(combined1) + BigInt(combined2);
			let result = sumBigInt.toString();
			result = result.slice(0, -maxDecimalLength) + '.' + result.slice(-maxDecimalLength);
			if (result[0] == '.') result = '0' + result;
			const regex = /^[-0.0]*$/;
			if (regex.test(result)) return "0";
			return result;
		}

		subtract(args) {
			var num1 = Scratch.Cast.toString(args.A),
				num2 = Scratch.Cast.toString(args.B);
			let isNegative1 = false;
			let isNegative2 = false;
			if (num1[0] === '-') isNegative1 = true, num1 = num1.slice(1);
			if (num2[0] === '-') isNegative2 = true, num2 = num2.slice(1);
			let[intPart1, decimalPart1] = num1.split('.');
			let[intPart2, decimalPart2] = num2.split('.');
			if (!decimalPart1) decimalPart1 = '0';
			if (!decimalPart2) decimalPart2 = '0';
			const maxDecimalLength = Math.max(decimalPart1.length, decimalPart2.length);
			decimalPart1 = decimalPart1.padEnd(maxDecimalLength, '0');
			decimalPart2 = decimalPart2.padEnd(maxDecimalLength, '0');
			const combined1 = (isNegative1 ? '-' : '') + intPart1 + decimalPart1;
			const combined2 = (isNegative2 ? '-' : '') + intPart2 + decimalPart2;
			const differenceBigInt = BigInt(combined1) - BigInt(combined2);
			let result = differenceBigInt.toString();
			result = result.slice(0, -maxDecimalLength) + '.' + result.slice(-maxDecimalLength);
			if (result[0] == '.') result = '0' + result;
			const regex = /^[-0.0]*$/;
			if (regex.test(result)) return "0";
			return result;
		}

		multiply(args) {
			var num1 = Scratch.Cast.toString(args.A),
				num2 = Scratch.Cast.toString(args.B);
			let isNegative1 = false;
			let isNegative2 = false;
			if (num1[0] === '-') isNegative1 = true, num1 = num1.slice(1);
			if (num2[0] === '-') isNegative2 = true, num2 = num2.slice(1);
			let[intPart1, decimalPart1] = num1.split('.');
			let[intPart2, decimalPart2] = num2.split('.');
			if (!decimalPart1) decimalPart1 = '0';
			if (!decimalPart2) decimalPart2 = '0';
			const decimalLength = decimalPart1.length + decimalPart2.length;
			intPart1 = intPart1.replace(/^0+/, '');
			intPart2 = intPart2.replace(/^0+/, '');
			const intProduct = BigInt(intPart1) * BigInt(intPart2);
			let decimalProduct = BigInt(decimalPart1) * BigInt(decimalPart2);
			decimalProduct = decimalProduct.toString().padStart(decimalLength, '0');
			let result = (isNegative1 !== isNegative2 ? '-' : '') + intProduct.toString();
			if (decimalLength > 0) result += '.' + decimalProduct;
			const regex = /^[-0.0]*$/;
			if (regex.test(result)) return "0";
			return result;
		}

		divided(args) {
			var dividend = Scratch.Cast.toString(args.A),
				divisor = Scratch.Cast.toString(args.B);
			var precision = Scratch.Cast.toNumber(args.PRE);
      const dividendNum = parseFloat(dividend);
      const divisorNum = parseFloat(divisor);
      if (divisorNum === 0) return 'divisor can\'t is zero';
      const resultNum = dividendNum / divisorNum;
      let result = resultNum.toFixed(precision).toString();
      var last='.'+'0'.repeat(precision);
      result = result.replace(/(\.[0-9]*[1-9])0+$/, '$1');
      if(result.endsWith(last)) return result.split(last)[0];
      return result;
    }
	}
	Scratch.extensions.register(new highPrecision());
})(Scratch);
