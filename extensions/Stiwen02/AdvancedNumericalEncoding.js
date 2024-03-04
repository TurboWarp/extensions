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
        color1: "#9966ff",
        color2: "#895be5",
        color3: "#7a51cc",
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
