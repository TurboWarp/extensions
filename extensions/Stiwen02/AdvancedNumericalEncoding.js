// Name: Advanced Numerical Encoding
// ID: advancedNumericalEncoding
// Description: Encode strings to numbers with advanced blocks.
// By: Stiwen02 <https://scratch.mit.edu/users/Stiwen02/>

(function (Scratch) {
  "use strict";
  const icon =
    "data:image/png;base64,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";
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
