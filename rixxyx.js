var count = 0
var isMeasure = false
var time = 0

class RixxyX {
  getInfo() {
    return {
      color1: "#773c00",
      color2: "#5f3000",
      id: "RixxyX",
      name: "RixxyX",
      description: '[deleted]',
      blocks: [
        {
          opcode: 'notEquals',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[TEXT_1] != [TEXT_2]',
          arguments: {
            TEXT_1: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'RixxyX'
            },
            TEXT_2: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'TyruntX'
            }
          }
        },
        {
          opcode: 'color',
          blockType: Scratch.BlockType.REPORTER,
          text: 'color [COLOR] in hex',
          arguments: {
            COLOR: {
              type: Scratch.ArgumentType.COLOR,
              defaultValue: '#ff0000'
            }
          }
        },
        {
          opcode: 'returnTrue',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'true',
          arguments: {}
        },
        {
          opcode: 'returnFalse',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'false',
          arguments: {}
        },
        {
          opcode: 'ifElseString',
          blockType: Scratch.BlockType.REPORTER,
          text: 'if [BOOL] then [TEXT_1] else [TEXT_2]',
          arguments: {
            BOOL: {
              type: Scratch.ArgumentType.BOOLEAN,
              defaultValue: ''
            },
            TEXT_1: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'RixxyX'
            },
            TEXT_2: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'TyruntX'
            }
          }
        },
        {
          opcode: 'ifString',
          blockType: Scratch.BlockType.REPORTER,
          text: 'if [BOOL] then [TEXT]',
          arguments: {
            BOOL: {
              type: Scratch.ArgumentType.BOOLEAN,
              defaultValue: ''
            },
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'RixxyX'
            }
          }
        },
        {
          opcode: 'extractTextBetweenToCharacters',
          blockType: Scratch.BlockType.REPORTER,
          text: 'extract text [TEXT] between [NUM_1] to [NUM_2] characters',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'RixxyX is cool, right?'
            },
            NUM_1: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1
            },
            NUM_2: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 6
            }
          }
        },
        {
          opcode: 'returnString',
          blockType: Scratch.BlockType.REPORTER,
          text: '[TEXT] as text',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'RixxyX is cool, right?'
            }
          }
        },
        {
          opcode: 'returnObject',
          blockType: Scratch.BlockType.REPORTER,
          text: 'JavaScript object [OBJ_NAME] with value [OBJ_VAL]',
          arguments: {
            OBJ_NAME: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'String'
            },
            OBJ_VAL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'RixxyX is cool, right?'
            }
          }
        },
        {
          opcode: 'isTheSameTypeAs',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[TEXT_1] is the same type as [TEXT_2]?',
          arguments: {
            TEXT_1: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'RixxyX is cool, right?'
            },
            TEXT_2: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'RixxyX is cool, right?'
            }
          }
        },
        {
          opcode: 'reverseTxt',
          blockType: Scratch.BlockType.REPORTER,
          text: 'reverse text [TEXT]',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'XyxxiR'
            }
          }
        },
        {
          opcode: 'returnCount',
          blockType: Scratch.BlockType.REPORTER,
          text: 'counter',
          arguments: {}
        },
        {
          opcode: 'incrementCountByNum',
          blockType: Scratch.BlockType.COMMAND,
          text: 'increment counter by [NUM]',
          arguments: {
            NUM: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1
            }
          }
        },
        {
          opcode: 'decrementCountByNum',
          blockType: Scratch.BlockType.COMMAND,
          text: 'decrement counter by [NUM]',
          arguments: {
            NUM: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1
            }
          }
        },
        {
          opcode: 'setCount',
          blockType: Scratch.BlockType.COMMAND,
          text: 'set counter to [NUM]',
          arguments: {
            NUM: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'toUppercase',
          blockType: Scratch.BlockType.REPORTER,
          text: '[TEXT] to uppercase',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'rixxyx'
            }
          }
        },
        {
          opcode: 'toLowercase',
          blockType: Scratch.BlockType.REPORTER,
          text: '[TEXT] to lowercase',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'RIXXYX'
            }
          }
        },
        {
          opcode: 'toCapitalize',
          blockType: Scratch.BlockType.REPORTER,
          text: 'capitalize [TEXT]',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'rixxyX is cool, right?'
            }
          }
        },
        {
          opcode: 'isJsNan',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'is JavaScript NaN [OBJ]',
          arguments: {
            OBJ: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: NaN
            }
          }
        },
        {
          opcode: 'returnNum',
          blockType: Scratch.BlockType.REPORTER,
          text: '[NUM] as number',
          arguments: {
            NUM: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1
            }
          }
        },
        {
          opcode: 'returnBool',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[BOOL] as boolean',
          arguments: {
            BOOL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'true'
            }
          }
        },
        {
          opcode: 'binToTxt',
          blockType: Scratch.BlockType.REPORTER,
          text: 'binary [BIN] to text',
          arguments: {
            BIN: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '01010010 01101001 01111000 01111000 01111001 01011000'
            }
          }
        },
        {
          opcode: 'txtToBin',
          blockType: Scratch.BlockType.REPORTER,
          text: 'text [TEXT] to binary',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'RixxyX'
            }
          }
        },
        {
          opcode: 'repeatTxtTimes',
          blockType: Scratch.BlockType.REPORTER,
          text: 'repeat text [TEXT] [NUM] times',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'x'
            },
            NUM: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 2
            }
          }
        },
        {
          opcode: 'returnJsCode',
          blockType: Scratch.BlockType.REPORTER,
          text: 'execute JavaScript code [JS_CODE]',
          arguments: {
            JS_CODE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '\"Ri\" + \"xx\" + \"yX\"'
            }
          }
        },
        {
          opcode: 'jsonParse',
          blockType: Scratch.BlockType.REPORTER,
          text: 'JSON.parse([TEXT])',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '\"RixxyX\"'
            }
          }
        },
        {
          opcode: 'execJsCode',
          blockType: Scratch.BlockType.COMMAND,
          text: 'execute JavaScript code [JS_CODE]',
          arguments: {
            JS_CODE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '\"Ri\" + \"xx\" + \"yX\"'
            }
          }
        },
        {
          opcode: 'returnENum',
          blockType: Scratch.BlockType.REPORTER,
          text: 'e', // e
          arguments: {}
        },
				{
					opcode: 'startTime',
					blockType: Scratch.BlockType.COMMAND,
					text: 'start measuring time',
					arguments: {}
				},
				{
					opcode: 'endTime',
					blockType: Scratch.BlockType.COMMAND,
					text: 'end measuring time',
					arguments: {}
				},
				{
					opcode: 'returnTime',
					blockType: Scratch.BlockType.REPORTER,
					text: 'time',
					arguments: {}
				}
      ]
    }
  }
  notEquals(args) {
    var isEquals = args.TEXT_1 != args.TEXT_2;
    return isEquals;
  }
  color(args) {
    return args.COLOR;
  }
  returnTrue(args) {
    return true;
  }
  returnFalse(args) {
    return false;
  }
  ifElseString(args) {
    if (args.BOOL) {
      return args.TEXT_1;
    } else {
      return args.TEXT_2;
    }
  }
  ifString(args) {
    if (args.BOOL) {
      return args.TEXT;
    } else {
      return "";
    }
  }
  extractTextBetweenToCharacters(args) {
    var txt = args.TEXT.toString();
    var char1 = args.NUM_1 - 1;
    var char2 = args.NUM_2;
    return txt.slice(char1, char2);
  }
  returnString(args) {
    return args.TEXT.toString();
  }
  returnObject(args) {
    try {
      return eval("new " + args.OBJ_NAME + "(\"" + args.OBJ_VAL + "\");");
    } catch(err) {
      return err;
    }
  }
  isTheSameTypeAs(args) {
    return (typeof args.TEXT_1 == typeof args.TEXT_2);
  }
  reverseTxt(args) {
    var emptyStr = "";
    var txt = args.TEXT.toString();
    var localCount = args.TEXT.length - 1;
    while (localCount != -1) {
      emptyStr = emptyStr + txt.charAt(localCount);
      localCount -= 1;
    }
    return emptyStr;
  }
  returnCount(args) {
    return count;
  }
  incrementCountByNum(args) {
    if ((count.toString().indexOf("-") == -1) || (args.NUM.toString().indexOf("-") == -1)) {
      count += Math.floor(args.NUM);
    } else {
      count = 0;
    }
  }
  decrementCountByNum(args) {
    if ((count - Math.floor(args.NUM)).toString().indexOf("-") == -1) {
      count -= Math.floor(args.NUM);
    } else {
      count = 0;
    }
  }
  setCount(args) {
    if ((count.toString().indexOf("-") == -1) && (args.NUM.toString().indexOf("-") == -1)) {
      count = Math.floor(args.NUM);
    } else {
      count = 0;
    }
  }
  toUppercase(args) {
    return args.TEXT.toUpperCase();
  }
  toLowercase(args) {
    return args.TEXT.toLowerCase();
  }
  toCapitalize(args) {
    return args.TEXT.charAt(0).toUpperCase() + args.TEXT.slice(1);
  }
  isJsNan(args) {
    return isNaN(args.OBJ);
  }
  returnNum(args) {
    return Math.floor(args.NUM);
  }
  returnBool(args) {
    try {
      if ((JSON.parse(args.BOOL).toString() == "true") || (JSON.parse(args.BOOL).toString() == "false")) {
        return JSON.parse(args.BOOL);
      } else if (JSON.parse(args.BOOL).toString() == "1") {
        return true;
      } else if (JSON.parse(args.BOOL).toString() == "0") {
        return false;
      } else {
        return "";
      }
    } catch (err) {
      return err;
    }
  }
  binToTxt(args) {
    var binary = args.BIN.toString();
    return binary.split(" ").map((x) => x = String.fromCharCode(parseInt(x, 2))).join("");
  }
  txtToBin(args) {
    var text = args.TEXT.toString();
    return Array.from(text).map((each)=>each.charCodeAt(0).toString(2)).join(" ");
  }
  repeatTxtTimes(args) {
    return args.TEXT.repeat(Math.floor(args.NUM));
  }
  returnJsCode(args) {
    var func = eval(args.JS_CODE);
    return func;
  }
  jsonParse(args) {
    return JSON.parse(args.TEXT.toString());
  }
  execJsCode(args) {
    var func = new Function(args.JS_CODE);
  }
  returnENum(args) {
    return Math.E
  }
	startTime(args) {
		time = 0
		isMeasure = true
	}
	endTime(args) {
		isMeasure = false
	}
	returnTime(args) {
		if (isMeasure == true) {
			time += 1
		}
		return time
	}
}
Scratch.extensions.register(new RixxyX());
