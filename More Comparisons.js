class StrictEqualityExtension {
  getInfo() {
	return {
		id: 'Comparisons',
		name: 'More Comparisons',
		color1: '#00a889',
    color2: '#1e8c76',
    color3: '#1e8c76',
		blocks: [
        {
          opcode: 't',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'true',
          arguments: {}
        },{
          opcode: 'f',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'false',
          arguments: {},
        },{
          opcode: 'bool',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[a]',
          arguments: {
            a: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '\n'
            },
          }
        },{
          opcode: 'R_bool',
          blockType: Scratch.BlockType.REPORTER,
          text: '[a]',
          arguments: {
            a: {
              type: Scratch.ArgumentType.BOOLEAN,
            },
          }
        },'---',{
          opcode: 'equal',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[a] == [b]',
          arguments: {
            a: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'A'
            },
            b: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'a'
            },
          }
        },{
          opcode: 'equal_negative',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[a] =- [b]',
          arguments: {
            a: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: '5'
            },
            b: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: '-5'
            },
          }
        },{
          opcode: 'equal_PON',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[a] =± [b]',
          arguments: {
            a: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: '5'
            },
            b: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: '-5'
            },
          }
        },{
          opcode: 'not equal',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[a] ≠ [b]',
          arguments: {
            a: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '\n'
            },
            b: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '\n'
            },
          }
        },{
          opcode: 'XOR',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[a] ^ [b]',
          arguments: {
            a: {
              type: Scratch.ArgumentType.BOOLEAN,
            },
            b: {
              type: Scratch.ArgumentType.BOOLEAN,
            },
          }
        },{
          opcode: 'equal_almost',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[a] ≈ [b] ／ [c]',
          arguments: {
            a: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: '5'
            },
            b: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: '6'
            },
            c: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: '1'
            },
          }
        },'---',{
          opcode: 'equal_GTOE',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[a] ≥ [b]',
          arguments: {
            a: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: '\n'
            },
            b: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: '50'
            },
          }
        },{
          opcode: 'equal_LTOE',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[a] ≤ [b]',
          arguments: {
            a: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: '\n'
            },
            b: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: '50'
            },
          }
        },{
          opcode: 'DL',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[a] < [b] < [c]',
          arguments: {
            a: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: '\n'
            },
            b: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: '\n'
            },
            c: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: '\n'
            },
          }
        },{
          opcode: 'DLE',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[a] ≤ [b] ≤ [c]',
          arguments: {
            a: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: '\n'
            },
            b: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: '\n'
            },
            c: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: '\n'
            },
          }
        },'---',{
          opcode: 'vertical',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[a] ⊥ [b]',
          arguments: {
            a: {
              type: Scratch.ArgumentType.ANGLE,
              defaultValue: '0'
            },
            b: {
              type: Scratch.ArgumentType.ANGLE,
              defaultValue: '90'
            },
          }
        },
      ]
    };
  }
  t(args){
    return true;
  }
  f(args){
    return false;
  }
  bool(args){
    return args.a;
  }
  R_bool(args){
    return args.a * 1;
  }
  equal(args) {
    return (args.a == args.b);
  }
  equal_negative(args) {
    if(isNaN(args.a)||isNaN(args.b)){
      return "NaN";
    }
    else{
      return (args.a == (0 - args.b));
    }
  }
  equal_PON(args) {
    if(isNaN(args.a)||isNaN(args.b)){
      return "NaN";
    }
    else{
      return (args.a == (0 - args.b))||(args.a == args.b);
    }
  }
	equal_almost(args) {
    return (Math.abs(args.a - args.b) <= args.c);
  }
  DL(args) {
    return (args.a < args.b) && (args.b < args.c);
  }
  DLE(args) {
    return (args.a <= args.b) && (args.b <= args.c);
  }
  'not equal'(args){
    return (args.a != args.b);
  }
  'XOR'(args){
    return Boolean(Boolean(args.a) ^ Boolean(args.b));
  }
  equal_GTOE(args) {
    return (args.a >= args.b);
  }
  equal_LTOE(args) {
    return (args.a <= args.b);
  }
  vertical(args) {
    if(isNaN(args.a)||isNaN(args.b)){
      return "NaN";
    }
    else{
      return ((args.a - (args.b - 90)) % 180) == 0;
    }
  }
}
Scratch.extensions.register(new StrictEqualityExtension());
//BY NOname