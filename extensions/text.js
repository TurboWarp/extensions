// Name: Text
// ID: strings
// Description: Manipulate characters and text.
// By: CST1229 <https://scratch.mit.edu/users/CST1229/>
// By: BludIsAnLemon <https://scratch.mit.edu/users/BludIsAnLemon/>
// By: Man-o-Valor <https://scratch.mit.edu/users/man-o-valor/>
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
    CAMELCASE: "camelcase",
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
            description:
              "Starts words after ., !, and ? with captialized letters",
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
            description:
              "If your language has randomcase, style it accordingly",
          }),
          value: CaseParam.RANDOMCASE,
        },
        {
          text: Scratch.translate({
            default: "camelCase",
            description:
              "Removes all spaces and capitalizes all words after the first",
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
            opcode: "matchRegexJSON",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              default:
                "matches of [STRING] using regex /[REGEX]/[FLAGS] as array",
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
                defaultValue: "(.) (.{2})",
              },
              FLAGS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "g",
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

          "---",
          {
            opcode: "posWith",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate({
              default: "[STRING] [POSITION] with [SUBSTRING]?",
              description:
                "[POSITION] is a dropdown with 'starts' and 'ends'. The block then takes the form '[STRING] starts with [SUBSTRING]?' or '[STRING] ends with [SUBSTRING]?'",
            }),
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "turbowarp",
              },
              POSITION: {
                type: Scratch.ArgumentType.STRING,
                menu: "positions",
              },
              SUBSTRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "turbo",
              },
            },
          },

          "---",

          {
            opcode: "reverse",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("reverse text [STRING]"),
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("apple"),
              },
            },
          },

          "---",

          {
            opcode: "trim",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("trim whitespace [STRING] from [METHOD]"),
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: `    ${Scratch.translate("apple")}    `,
              },
              METHOD: {
                type: Scratch.ArgumentType.STRING,
                menu: "trimMethod",
              },
            },
          },
        ],
        menus: {
          textCase: {
            acceptReporters: true,
            items: this._initCaseMenu(),
          },
          positions: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("starts"),
                value: "starts",
              },
              {
                text: Scratch.translate("ends"),
                value: "ends",
              },
            ],
          },
          trimMethod: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("both sides"),
                value: "both",
              },
              {
                text: Scratch.translate("the end"),
                value: "end",
              },
              {
                text: Scratch.translate("the start"),
                value: "start",
              },
            ],
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
      const chars = Array.from(Scratch.Cast.toString(args.STRING));
      return chars.map((char) => char.charCodeAt(0)).join(" ");
    }

    unicodefrom(args, util) {
      return String.fromCharCode(Number(args.NUM) || 0);
    }

    letters_of(args, util) {
      const string = Scratch.Cast.toString(args.STRING);
      const letter1 = Scratch.Cast.toNumber(args.LETTER1);
      const letter2 = Scratch.Cast.toNumber(args.LETTER2);
      return string.substring(letter1 - 1, letter2);
    }

    _caseInsensitiveRegex(str) {
      return new RegExp(str.replaceAll(/[^a-zA-Z0-9]/g, "\\$&"), "gi");
    }

    split(args, util) {
      const string = Scratch.Cast.toString(args.STRING);
      const split = Scratch.Cast.toString(args.SPLIT);
      const item = Scratch.Cast.toNumber(args.ITEM);

      // Cache the last split
      if (
        !(
          splitCache &&
          splitCache.string === string &&
          splitCache.split === split
        )
      ) {
        const regex = this._caseInsensitiveRegex(split);

        splitCache = {
          string,
          split,
          arr: string.split(regex),
        };
      }
      return splitCache.arr[item - 1] || "";
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
      const string = Scratch.Cast.toString(args.STRING);
      const substring = Scratch.Cast.toString(args.SUBSTRING);
      const replace = Scratch.Cast.toString(args.REPLACE);

      const regex = this._caseInsensitiveRegex(substring);

      return string.replace(regex, replace);
    }

    indexof(args, util) {
      // .toLowerCase() for case insensitivity
      const string = Scratch.Cast.toString(args.STRING).toLowerCase();
      const substring = Scratch.Cast.toString(args.SUBSTRING).toLowerCase();

      // Since both arguments are casted to strings beforehand,
      // we don't have to worry about type differences
      // like in the item number of in list block
      const found = string.indexOf(substring);

      // indexOf returns -1 when no matches are found, we can just +1
      return found + 1;
    }

    repeat(args, util) {
      const string = Scratch.Cast.toString(args.STRING);
      const repeat = Scratch.Cast.toNumber(args.REPEAT);
      return string.repeat(repeat);
    }

    replaceRegex(args, util) {
      try {
        const string = Scratch.Cast.toString(args.STRING);
        const replacer = Scratch.Cast.toString(args.REPLACE);
        const regex = Scratch.Cast.toString(args.REGEX);
        const flags = Scratch.Cast.toString(args.FLAGS);

        return string.replace(new RegExp(regex, flags), replacer);
      } catch (e) {
        console.error(e);
        return "";
      }
    }

    matchRegex(args, util) {
      try {
        const string = Scratch.Cast.toString(args.STRING);
        const uncleanRegex = Scratch.Cast.toString(args.REGEX);
        const flags = Scratch.Cast.toString(args.FLAGS);
        const item = Scratch.Cast.toNumber(args.ITEM);

        // Cache the last matched string
        if (
          !(
            matchCache &&
            matchCache.string === string &&
            matchCache.regex === uncleanRegex &&
            matchCache.flags === flags
          )
        ) {
          const newFlags = flags.includes("g") ? flags : flags + "g";
          const regex = new RegExp(uncleanRegex, newFlags);

          matchCache = {
            string,
            regex: uncleanRegex,
            flags,
            arr: string.match(regex) || [],
          };
        }
        return matchCache.arr[item - 1] || "";
      } catch (e) {
        console.error(e);
        return "";
      }
    }
    matchRegexJSON(args, util) {
      // matchRegex but it returns an array
      try {
        const string = Scratch.Cast.toString(args.STRING);
        const uncleanRegex = Scratch.Cast.toString(args.REGEX);
        const flags = Scratch.Cast.toString(args.FLAGS);

        // Cache the last matched string
        if (
          !(
            matchCache &&
            matchCache.string === string &&
            matchCache.regex === uncleanRegex &&
            matchCache.flags === flags
          )
        ) {
          const newFlags = flags.includes("g") ? flags : flags + "g";
          const regex = new RegExp(uncleanRegex, newFlags);

          matchCache = {
            string,
            regex: uncleanRegex,
            flags,
            arr: string.match(regex) || [],
          };
        }
        return JSON.stringify(matchCache.arr) || "[]";
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
        const string = Scratch.Cast.toString(args.STRING);
        const regex = Scratch.Cast.toString(args.REGEX);
        const flags = Scratch.Cast.toString(args.FLAGS);

        return new RegExp(regex, flags).test(string);
      } catch (e) {
        console.error(e);
        return false;
      }
    }

    isCase(args, util) {
      const string = Scratch.Cast.toString(args.STRING);
      const textCase = Scratch.Cast.toString(args.TEXTCASE);
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
        case CaseParam.CAMELCASE:
          return /^[^A-Z\s][^\s]*$/.test(string);
        case CaseParam.RANDOMCASE:
          return true;
        case CaseParam.SENTENCECASE:
          return /^[A-Z][^?.!]*(?:[?.!]\s+[A-Z][^?.!]*)*$/.test(string);
        default:
          return false;
      }
    }

    toCase(args, util) {
      const string = Scratch.Cast.toString(args.STRING);
      const textCase = Scratch.Cast.toString(args.TEXTCASE);
      let workingText = "";
      let sentenceCapitalFlag = false;
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
          for (let i = 0; i < string.length; i++) {
            if (
              /^\s*$/.test(string[i - 1] ?? " ") &&
              !sentenceCapitalFlag &&
              string[i].toUpperCase() != string[i].toLowerCase()
            ) {
              workingText += string[i].toUpperCase();
              sentenceCapitalFlag = true;
            } else {
              if (string[i] == "." || string[i] == "!" || string[i] == "?") {
                sentenceCapitalFlag = false;
              }
              workingText += string[i].toLowerCase();
            }
          }
          return workingText;
        case CaseParam.RANDOMCASE:
          for (let i = 0; i < string.length; i++) {
            if (Math.random() > 0.5) {
              workingText += string[i].toUpperCase();
            } else {
              workingText += string[i].toLowerCase();
            }
          }
          return workingText;
        case CaseParam.CAMELCASE:
          for (let i = 0; i < string.length; i++) {
            if (/^\s*$/.test(string[i - 1] ?? "x")) {
              workingText += string[i].toUpperCase();
            } else {
              workingText += string[i].toLowerCase();
            }
          }
          return workingText.replace(/\s/g, "");
        default:
          return string;
      }
    }
    posWith(args) {
      const STRING = Scratch.Cast.toString(args.STRING);
      const SUBSTRING = Scratch.Cast.toString(args.SUBSTRING);
      if (Scratch.Cast.toString(args.POSITION) === "starts") {
        return STRING.startsWith(SUBSTRING);
      }
      return STRING.endsWith(SUBSTRING);
    }
    reverse(args) {
      return Array.from(Scratch.Cast.toString(args.STRING)).reverse().join("");
    }
    trim(args) {
      const STRING = Scratch.Cast.toString(args.STRING);
      switch (Scratch.Cast.toString(args.METHOD)) {
        case "start":
          return STRING.trimStart();
        case "end":
          return STRING.trimEnd();
        case "both":
        default:
          return STRING.trim();
      }
    }
  }

  Scratch.extensions.register(new StringsExt());
})(Scratch);
