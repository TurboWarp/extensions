// Name: Text
// ID: strings
// Description: Manipulate characters and text.
// Original: CST1229 <https://scratch.mit.edu/users/CST1229/> and Man-o-Valor <https://scratch.mit.edu/users/man-o-valor/>
// License: MIT AND MPL-2.0

(function (Scratch) {
  "use strict";

  const CaseParam = {
    LOWERCASE: "lowercase",
    UPPERCASE: "uppercase",
    MIXEDCASE: "mixedcase",
    TITLECASE: "titlecase",
    EXACTTITLECASE: "exacttitlecase",
    RANDOMCASE: "randomcase",
    SENTENCECASE: "sentencecase",
    CAMELCASE: "camelcase"
  };

  let splitCache;
  let matchCache;

  class StringsExt {
    constructor() {}

    _initCaseMenu() {
      return [
        {
          text: Scratch.translate({
            default: "lowercase",
            description: "If your language has lowercase, style it accordingly",
          }),
          value: CaseParam.LOWERCASE,
        },
        {
          text: Scratch.translate({
            default: "UPPERCASE",
            description: "If your language has uppercase, style it accordingly",
          }),
          value: CaseParam.UPPERCASE,
        },
        {
          text: Scratch.translate({
            default: "Sentence case",
            description: "Starts words after ., !, and ? with captialized letters",
          }),
          value: CaseParam.SENTENCECASE,
        },
        {
          text: Scratch.translate({
            default: "Title Case",
            description:
              "If your language has Title Case, style it accordingly. 'Abc' is title case and exactly title case but 'ABC' is only title case.",
          }),
          value: CaseParam.TITLECASE,
        },
        {
          text: Scratch.translate({
            default: "Exactly Title Case",
            description:
              "If your language has Title Case, style it accordingly. 'Abc' is title case and exactly title case but 'ABC' is only title case.",
          }),
          value: CaseParam.EXACTTITLECASE,
        },
        {
          text: Scratch.translate({
            default: "MiXeD CaSe",
            description:
              "If your language has mixed case, style it accordingly",
          }),
          value: CaseParam.MIXEDCASE,
        },
        {
          text: Scratch.translate({
            default: "RAndoMCaSe",
            description: "If your language has randomcase, style it accordingly",
          }),
          value: CaseParam.RANDOMCASE,
        },
        {
          text: Scratch.translate({
            default: "camelCase",
            description: "Removes all spaces and capitalizes all words after the first",
          }),
          value: CaseParam.CAMELCASE,
        },
      ];
    }

    getInfo() {
      return {
        // id "text" would conflict with Scratch Lab's Animated Text (lab/text.js)
        id: "strings",
        name: Scratch.translate("Text"),
        blocks: [
          {
            opcode: "letters_of",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "letters [LETTER1] to [LETTER2] of [STRING]"
            ),
            arguments: {
              LETTER1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
              },
              LETTER2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 4,
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
            },
          },
          {
            opcode: "split",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("item [ITEM] of [STRING] split by [SPLIT]"),
            arguments: {
              ITEM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3,
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              SPLIT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "p",
              },
            },
          },
          {
            opcode: "count",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              default: "count [SUBSTRING] in [STRING]",
              description:
                "Counts how many time [SUBSTRING] appears in [STRING]",
            }),
            arguments: {
              SUBSTRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "p",
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
            },
          },
          {
            opcode: "indexof",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              default: "index of [SUBSTRING] in [STRING]",
              description: "Reports where [SUBSTRING] appears in [STRING]",
            }),
            arguments: {
              SUBSTRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "p",
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
            },
          },

          "---",

          {
            opcode: "replace",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "replace [SUBSTRING] in [STRING] with [REPLACE]"
            ),
            arguments: {
              SUBSTRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "world",
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello world!",
              },
              REPLACE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "fellow Scratchers",
              },
            },
          },
          {
            opcode: "repeat",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("repeat [STRING] [REPEAT] times"),
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple ",
              },
              REPEAT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3,
              },
            },
          },
          {
            opcode: 'surround',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("surround [TEXT] with [QUOTE]"),
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple"
              },
              QUOTE: {
                type: Scratch.ArgumentType.STRING,
                menu: "QUOTES" 
              }
            },
          },

          {
            opcode: 'reverse',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("reverse [TEXT]"),
            arguments: {
                TEXT: { 
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "apple"
                }
            },
          },

          "---",

          {
            opcode: 'enter',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("enter"),
          },
          {
            opcode: 'tab',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("tab"),
          },
          
          "---",

          {
            opcode: "unicodeof",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("unicode of [STRING]"),
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "A",
              },
            },
          },
          {
            opcode: "unicodefrom",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("unicode [NUM] as letter"),
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 65,
              },
            },
          },

          "---",
          {
            opcode: "replaceRegex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "replace regex /[REGEX]/[FLAGS] in [STRING] with [REPLACE]"
            ),
            arguments: {
              REGEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ".",
              },
              FLAGS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "g",
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello world!",
              },
              REPLACE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "$&$&",
              },
            },
          },
          {
            opcode: "matchRegex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              default:
                "item [ITEM] of [STRING] matched by regex /[REGEX]/[FLAGS]",
              description:
                "/[REGEX]/ is supposed to match the syntax that some actual programming languages used for regular expressions.",
            }),
            arguments: {
              ITEM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello world!",
              },
              REGEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "(.) (.{2})",
              },
              FLAGS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "g",
              },
            },
          },
          {
            opcode: "countRegex",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              default: "count regex /[REGEX]/[FLAGS] in [STRING]",
              description:
                "/[REGEX]/ is supposed to match the syntax that some actual programming languages used for regular expressions.",
            }),
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello world!",
              },
              REGEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[AEIOU]",
              },
              FLAGS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "i",
              },
            },
          },
          {
            opcode: "testRegex",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate({
              default: "[STRING] matches regex /[REGEX]/[FLAGS]?",
              description:
                "/[REGEX]/ is supposed to match the syntax that some actual programming languages used for regular expressions.",
            }),
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello world!",
              },
              REGEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "hello",
              },
              FLAGS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "i",
              },
            },
          },

          "---",

          {
            opcode: "identical",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [OPERAND1] identical to [OPERAND2]?"),
            arguments: {
              OPERAND1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "A",
              },
              OPERAND2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "a",
              },
            },
          },

          "---",

          {
            opcode: "isCase",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate({
              default: "is [STRING] [TEXTCASE]?",
              description: "Example block context: <is [hello] [lowercase] ?>",
            }),
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              TEXTCASE: {
                type: Scratch.ArgumentType.STRING,
                menu: "textCase",
                defaultValue: CaseParam.LOWERCASE,
              },
            },
          },
          {
            opcode: "toCase",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              default: "convert [STRING] to [TEXTCASE]",
              description:
                "Example block context: (convert [HELLO] to [lowercase])",
            }),
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              TEXTCASE: {
                type: Scratch.ArgumentType.STRING,
                menu: "textCase",
                defaultValue: CaseParam.UPPERCASE,
              },
            },
          },
        ],
        menus: {
          textCase: {
            acceptReporters: true,
            items: this._initCaseMenu(),
          },
          quotes: {
            acceptReporters: true,
            items: ["\"", "'", "`", "-", "*", "()", "{}", "[]", "<>", "^$"],
          },
        },
      };
    }

    identical(args, util) {
      // Purposefully no casting, because
      // types ARE differentiated in this block
      return args.OPERAND1 === args.OPERAND2;
    }

    unicodeof(args, util) {
      const chars = Array.from(args.STRING.toString());
      return chars.map((char) => char.charCodeAt(0)).join(" ");
    }

    unicodefrom(args, util) {
      return String.fromCharCode(Number(args.NUM) || 0);
    }

    letters_of(args, util) {
      args.STRING = args.STRING.toString();
      args.LETTER1 = Number(args.LETTER1) || 0;
      args.LETTER2 = Number(args.LETTER2) || 0;
      return args.STRING.substring(args.LETTER1 - 1, args.LETTER2);
    }

    _caseInsensitiveRegex(str) {
      return new RegExp(str.replaceAll(/[^a-zA-Z0-9]/g, "\\$&"), "gi");
    }

    split(args, util) {
      args.STRING = (args.STRING ?? "").toString();
      args.SPLIT = (args.SPLIT ?? "").toString();
      args.ITEM = Number(args.ITEM) || 0;

      // Cache the last split
      if (
        !(
          splitCache &&
          splitCache.string === args.STRING &&
          splitCache.split === args.SPLIT
        )
      ) {
        const regex = this._caseInsensitiveRegex(args.SPLIT);

        splitCache = {
          string: args.STRING,
          split: args.SPLIT,
          arr: args.STRING.split(regex),
        };
      }
      return splitCache.arr[args.ITEM - 1] || "";
    }

    count(args, util) {
      // Fill cache
      this.split(
        {
          SPLIT: args.SUBSTRING,
          STRING: args.STRING,
          ITEM: 0,
        },
        util
      );
      return splitCache.arr.length - 1 || 0;
    }

    replace(args, util) {
      args.STRING = args.STRING.toString();
      args.SUBSTRING = args.SUBSTRING.toString();

      args.REPLACE = args.REPLACE.toString();

      const regex = this._caseInsensitiveRegex(args.SUBSTRING);

      return args.STRING.replace(regex, args.REPLACE);
    }

    indexof(args, util) {
      // .toLowerCase() for case insensitivity
      args.STRING = (args.STRING ?? "").toString().toLowerCase();
      args.SUBSTRING = (args.SUBSTRING ?? "").toString().toLowerCase();

      // Since both arguments are casted to strings beforehand,
      // we don't have to worry about type differences
      // like in the item number of in list block
      const found = args.STRING.indexOf(args.SUBSTRING);

      // indexOf returns -1 when no matches are found, we can just +1
      return found + 1;
    }

    repeat(args, util) {
      args.STRING = args.STRING.toString();
      args.REPEAT = Number(args.REPEAT) || 0;
      return args.STRING.repeat(args.REPEAT);
    }

    replaceRegex(args, util) {
      try {
        args.STRING = args.STRING.toString();
        args.REPLACE = args.REPLACE.toString();
        args.REGEX = args.REGEX.toString();
        args.FLAGS = args.FLAGS.toString();

        return args.STRING.replace(
          new RegExp(args.REGEX, args.FLAGS),
          args.REPLACE
        );
      } catch (e) {
        console.error(e);
        return "";
      }
    }

    matchRegex(args, util) {
      try {
        args.STRING = (args.STRING ?? "").toString();
        args.REGEX = (args.REGEX ?? "").toString();
        args.FLAGS = (args.FLAGS ?? "").toString();
        args.ITEM = Number(args.ITEM) || 0;

        // Cache the last matched string
        if (
          !(
            matchCache &&
            matchCache.string === args.STRING &&
            matchCache.regex === args.REGEX &&
            matchCache.flags === args.FLAGS
          )
        ) {
          const newFlags = args.FLAGS.includes("g")
            ? args.FLAGS
            : args.FLAGS + "g";
          const regex = new RegExp(args.REGEX, newFlags);

          matchCache = {
            string: args.STRING,
            regex: args.REGEX,
            flags: args.FLAGS,
            arr: args.STRING.match(regex) || [],
          };
        }
        return matchCache.arr[args.ITEM - 1] || "";
      } catch (e) {
        console.error(e);
        return "";
      }
    }

    countRegex(args, util) {
      // Fill cache
      // (ITEM is casted into 0,
      // but we don't care about the return value)
      this.matchRegex(args, util);
      return matchCache.arr.length || 0;
    }

    testRegex(args, util) {
      try {
        args.STRING = args.STRING.toString();
        args.REGEX = args.REGEX.toString();
        args.FLAGS = args.FLAGS.toString();

        return new RegExp(args.REGEX, args.FLAGS).test(args.STRING);
      } catch (e) {
        console.error(e);
        return false;
      }
    }

    isCase(args, util) {
      const string = args.STRING.toString();
      const textCase = args.TEXTCASE.toString();
      switch (textCase) {
        case CaseParam.LOWERCASE:
          return string.toLowerCase() === string;
        case CaseParam.UPPERCASE:
          return string.toUpperCase() === string;
        case CaseParam.MIXEDCASE:
          return !(
            string.toUpperCase() === string || string.toLowerCase() === string
          );
        case CaseParam.TITLECASE:
          return string.split(/\b/g).every((word) => {
            if (!word) return true;
            const titleCased = word[0].toUpperCase() + word.substring(1);
            return word === titleCased;
          });
        case CaseParam.EXACTTITLECASE:
          return string.split(/\b/g).every((word) => {
            if (!word) return true;
            const titleCased =
              word[0].toUpperCase() + word.substring(1).toLowerCase();
            return word === titleCased;
          });
        default:
          return false;
      }
    }

    toCase(args, util) {
      const string = args.STRING.toString();
      const textCase = args.TEXTCASE.toString();
      switch (textCase) {
        case CaseParam.LOWERCASE:
          return string.toLowerCase();
        case CaseParam.UPPERCASE:
          return string.toUpperCase();
        case CaseParam.MIXEDCASE:
          return Array.from(string)
            .map((char, index) =>
              index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
            )
            .join("");
        case CaseParam.TITLECASE:
          return string
            .split(/\b/g)
            .map((word) => {
              if (!word) return "";
              return word[0].toUpperCase() + word.substring(1);
            })
            .join("");
        case CaseParam.EXACTTITLECASE:
          return string
            .split(/\b/g)
            .map((word) => {
              if (!word) return "";
              return word[0].toUpperCase() + word.substring(1).toLowerCase();
            })
            .join("");
        case CaseParam.SENTENCECASE:
          let sentencesum = "";
          let capflag = false
          for (let i = 0; i < string.length; i++) {
              if (/^\s*$/.test(string[i-1] ?? " ") && !capflag && string[i].toUpperCase() != string[i].toLowerCase()) {
                  sentencesum +=string[i].toUpperCase();
                  capflag = true
              } else {
                  if (string[i] == "." || string[i] == "!" || string[i] == "?") {
                      capflag = false
                  }
                  sentencesum += string[i].toLowerCase();
              }
          }
          return sentencesum;
        case CaseParam.RANDOMCASE:
          let randomsum = "";
          for (let i = 0; i < string.length; i++) {
              if (Math.random()>0.5) {
                  randomsum += string[i].toUpperCase()
              } else {
                  randomsum += string[i].toLowerCase()
              }
          }
          return randomsum;
        case CaseParam.CAMELCASE:
          let camelsum = "";
          for (let i = 0; i < string.length; i++) {
              if (/^\s*$/.test(string[i-1] ?? "x")) {
                  camelsum += string[i].toUpperCase();
              } else {
                  camelsum += string[i].toLowerCase();
              }
          }
          return camelsum.replace(/\s/g, "");
        default:
          return string;
      }
    }

    surround(args) {
        if (args.QUOTE.length == 0) {
            return args.TEXT;
        } else if (args.QUOTE.length == 1) {
            return args.QUOTE + args.TEXT + args.QUOTE;
        } else if (args.QUOTE.length > 1) {
            return args.QUOTE[0] + args.TEXT + args.QUOTE[1];
        }
    }
  }
  enter() {
    return "\n";
  }
  tab() {
    return "    ";
  }
  reverse(args) {
    return args.TEXT.split("").reverse().join("");
  }

  Scratch.extensions.register(new StringsExt());
})(Scratch);
