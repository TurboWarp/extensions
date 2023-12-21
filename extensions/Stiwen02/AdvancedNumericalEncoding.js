// Name: Advanced Numerical Encoding
// ID: advancedNumericalEncoding
// Description: Encode strings to numbers with advanced blocks.
// By: Stiwen02 <https://scratch.mit.edu/users/Stiwen02/>

(function (Scratch) {
  "use strict";
  const icon =
    "https://extensions.turbowarp.org/images/Stiwen02/icon.png"
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-=_+[];'\\,./{}:\"|<>?`~ ";
  let encodedResult = "";
  let decodedResult = "";
  let decodedIndex = 1;
  class AdvancedNumericalEncoding {
    getInfo() {
      return {
        id: "advancedNumericalEncoding",
        name: "Advanced Numerical Encoding",
        blockIconURI: icon,
        docsURI:
          "https://extensions.turbowarp.org/Stiwen02/AdvancedNumericalEncoding",
        blocks: [
          {
            opcode: "basicEncodingDecoding",
            blockType: Scratch.BlockType.LABEL,
            text: "Basic Encoding & Decoding:",
          },
          {
            opcode: "encode",
            blockType: Scratch.BlockType.REPORTER,
            text: "encode [INPUT]",
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
            },
          },
          {
            opcode: "decode",
            blockType: Scratch.BlockType.REPORTER,
            text: "decode [INPUT]",
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "011616120500",
              },
            },
          },
          {
            opcode: "encoding",
            blockType: Scratch.BlockType.LABEL,
            text: "Encoding:",
          },
          {
            opcode: "resetEncoded",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset encoded",
          },
          {
            opcode: "encodeBlock",
            blockType: Scratch.BlockType.COMMAND,
            text: "encode [INPUT] to encoded",
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
            },
          },
          {
            opcode: "encoded",
            blockType: Scratch.BlockType.REPORTER,
            text: "encoded",
          },
          {
            opcode: "decoding",
            blockType: Scratch.BlockType.LABEL,
            text: "Decoding:",
          },
          {
            opcode: "resetDecoded",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset decoded",
          },
          {
            opcode: "decodeBlock",
            blockType: Scratch.BlockType.COMMAND,
            text: "decode [INPUT] at decoded index to decoded",
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "011616120500",
              },
            },
          },
          {
            opcode: "decoded",
            blockType: Scratch.BlockType.REPORTER,
            text: "decoded",
          },
          {
            opcode: "advancedEncoding",
            blockType: Scratch.BlockType.LABEL,
            text: "Advanced Encoding:",
          },
          {
            opcode: "setEncoded",
            blockType: Scratch.BlockType.COMMAND,
            text: "set encoded to [OUTPUT]",
            arguments: {
              OUTPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "011616120500",
              },
            },
          },
          {
            opcode: "advancedDecoding",
            blockType: Scratch.BlockType.LABEL,
            text: "Advanced Decoding:",
          },
          {
            opcode: "amountItems",
            blockType: Scratch.BlockType.REPORTER,
            text: "amount of items encoded in [INPUT]",
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "01161612050002011401140100",
              },
            },
          },
          "---",
          {
            opcode: "decodeIndex",
            blockType: Scratch.BlockType.REPORTER,
            text: "decode [INPUT] at index [INDEX]",
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "01161612050002011401140100",
              },
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 13,
              },
            },
          },
          {
            opcode: "decodeBlockIndex",
            blockType: Scratch.BlockType.COMMAND,
            text: "decode [INPUT] at index [INDEX] to decoded",
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "01161612050002011401140100",
              },
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 13,
              },
            },
          },
          "---",
          {
            opcode: "decodeAt",
            blockType: Scratch.BlockType.REPORTER,
            text: "decode [INPUT] at item [INDEX]",
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "01161612050002011401140100",
              },
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
              },
            },
          },
          {
            opcode: "decodeAtBlock",
            blockType: Scratch.BlockType.COMMAND,
            text: "decode [INPUT] at item [INDEX] to decoded",
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "01161612050002011401140100",
              },
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
              },
            },
          },
          "---",
          {
            opcode: "setDecoded",
            blockType: Scratch.BlockType.COMMAND,
            text: "set decoded to [OUTPUT]",
            arguments: {
              OUTPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
            },
          },
          {
            opcode: "setDecodedIndex",
            blockType: Scratch.BlockType.COMMAND,
            text: "set decoded index to [INDEX]",
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "addDecodedIndex",
            blockType: Scratch.BlockType.COMMAND,
            text: "add decoded index by [AMOUNT]",
            arguments: {
              AMOUNT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
              },
            },
          },
          {
            opcode: "decodedIndex",
            blockType: Scratch.BlockType.REPORTER,
            text: "decoded index",
          },
        ],
      };
    }

    encode(args) {
      let result = "";
      const chars = args.INPUT.toString().split("");
      for (let i = 0; i < chars.length; i++) {
        let num = (characters.indexOf(chars[i]) + 1).toString();
        if (num.length == 1) {
          num = "0" + num;
        }
        result += num;
      }
      return result + "00";
    }

    decode(args) {
      let INPUT = args.INPUT.toString();
      let result = "";
      let index = 1;
      while (true) {
        const num = parseInt(INPUT.substr(index - 1, 2));
        if (index - 1 < INPUT.length && num != 0) {
          result += characters[num - 1];
          index += 2;
        } else {
          index += 2;
          break;
        }
      }
      return result;
    }

    resetEncoded() {
      encodedResult = "";
    }

    encodeBlock(args) {
      encodedResult += this.encode({ INPUT: args.INPUT });
    }

    setEncoded(args) {
      const OUTPUT = args.OUTPUT.toString();
      encodedResult = OUTPUT;
    }

    encoded() {
      return encodedResult;
    }

    resetDecoded() {
      decodedResult = "";
      decodedIndex = 1;
    }

    setDecodedIndex(args) {
      decodedIndex = args.INDEX;
    }

    decodeBlock(args) {
      let INPUT = args.INPUT.toString();
      decodedResult = "";
      while (true) {
        const num = parseInt(INPUT.substr(decodedIndex - 1, 2));
        if (decodedIndex - 1 < INPUT.length && num != 0) {
          decodedResult += characters[num - 1];
        } else {
          decodedIndex += 2;
          break;
        }
        decodedIndex += 2;
      }
    }

    decoded() {
      return decodedResult;
    }

    amountItems(args) {
      const split = args.INPUT.toString().match(/.{1,2}/g);
      return split.filter((num) => num == "00").length;
    }

    decodeIndex(args) {
      let INPUT = args.INPUT.toString();
      let result = "";
      let index = args.INDEX;
      while (true) {
        const num = parseInt(INPUT.substr(index - 1, 2));
        if (index - 1 < INPUT.length && num != 0) {
          result += characters[num - 1];
          index += 2;
        } else {
          index += 2;
          break;
        }
      }
      return result;
    }

    decodeBlockIndex(args) {
      let INPUT = args.INPUT.toString();
      decodedResult = "";
      let index = args.INDEX;
      while (true) {
        const num = parseInt(INPUT.substr(index - 1, 2));
        if (index - 1 < INPUT.length && num != 0) {
          decodedResult += characters[num - 1];
        } else {
          index += 2;
          break;
        }
        index += 2;
      }
    }

    _indexOf(array, search, number) {
      let previous = -1;
      let instances = 0;
      for (const i in array) {
        if (array[i] == search) {
          if (instances == number) break;
          previous = i;
          instances++;
        }
      }
      return previous;
    }

    decodeAt(args) {
      const split = args.INPUT.toString().match(/.{1,2}/g);
      let index = parseInt(this._indexOf(split, "00", args.INDEX - 1)) * 2 + 3;
      return this.decodeIndex({ INPUT: args.INPUT, INDEX: index });
    }

    decodeAtBlock(args) {
      let INPUT = args.INPUT.toString();
      const split = INPUT.match(/.{1,2}/g);
      decodedIndex =
        parseInt(this._indexOf(split, "00", args.INDEX - 1)) * 2 + 3;
      decodedResult = "";
      while (true) {
        const num = parseInt(INPUT.substr(decodedIndex - 1, 2));
        if (decodedIndex - 1 < INPUT.length && num != 0) {
          decodedResult += characters[num - 1];
        } else {
          decodedIndex += 2;
          break;
        }
        decodedIndex += 2;
      }
    }

    setDecoded(args) {
      decodedResult = args.OUTPUT;
    }

    addDecodedIndex(args) {
      decodedIndex += args.AMOUNT;
    }

    decodedIndex() {
      return decodedIndex;
    }
  }
  Scratch.extensions.register(new AdvancedNumericalEncoding());
})(Scratch);
