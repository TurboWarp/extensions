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
        color1: "#7c20ba",
        color2: "#681a9c",
        color3: "#401061",
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
