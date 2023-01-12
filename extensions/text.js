
// Made by CST1229
// Modified port of an extension from a mod I worked on.

(function(Scratch) {
  "use strict";

  const CaseParam = {
    LOWERCASE: "lowercase",
    UPPERCASE: "uppercase",
    MIXEDCASE: "mixedcase",
    TITLECASE: "titlecase"
  };

  let splitCache;
  let matchCache;

  class StringsExt {
    constructor () {}

    _initCaseMenu () {
      return [
        {
          text: "lowercase",
          value: CaseParam.LOWERCASE
        },
        {
          text: "UPPERCASE",
          value: CaseParam.UPPERCASE
        },
        {
          text: "Title Case",
          value: CaseParam.TITLECASE
        },
        {
          text: "MiXeD CaSe",
          value: CaseParam.MIXEDCASE
        }
      ];
    }

    getInfo () {
      return {
        // id "text" could conflict with Scratch Lab's Animated Text
        // for mods which implement it or if it ever comes out
        id: "strings",
        name: "Text",
        blocks: [
          {
            opcode: "letters_of",
            blockType: Scratch.BlockType.REPORTER,
            text: "letters [LETTER1] to [LETTER2] of [STRING]",
            arguments: {
              LETTER1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              },
              LETTER2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 4
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple"
              }
            }
          },
          {
            opcode: "split",
            blockType: Scratch.BlockType.REPORTER,
            text: "item [ITEM] of [STRING] split by [SPLIT]",
            arguments: {
              ITEM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple"
              },
              SPLIT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "p"
              }
            }
          },
          {
            opcode: "count",
            blockType: Scratch.BlockType.REPORTER,
            text: "count number of [SUBSTRING]s in [STRING]",
            arguments: {
              SUBSTRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "p"
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple"
              }
            }
          },
          {
            opcode: "indexof",
            blockType: Scratch.BlockType.REPORTER,
            text: "index of [SUBSTRING] in [STRING]",
            arguments: {
              SUBSTRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "p"
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple"
              }
            }
          },

          "---",

          {
            opcode: "replace",
            blockType: Scratch.BlockType.REPORTER,
            text: "replace [SUBSTRING] in [STRING] with [REPLACE]",
            arguments: {
              SUBSTRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "world"
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello world!"
              },
              REPLACE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "fellow Scratchers"
              }
            }
          },
          {
            opcode: "repeat",
            blockType: Scratch.BlockType.REPORTER,
            text: "repeat [STRING] [REPEAT] times",
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple "
              },
              REPEAT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3
              }
            }
          },

          "---",

          {
            opcode: "unicodeof",
            blockType: Scratch.BlockType.REPORTER,
            text: "Unicode of [STRING]",
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "A"
              }
            }
          },
          {
            opcode: "unicodefrom",
            blockType: Scratch.BlockType.REPORTER,
            text: "Unicode [NUM] as letter",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 65
              }
            }
          },

          "---",
          {
            opcode: "replaceRegex",
            blockType: Scratch.BlockType.REPORTER,
            text: "replace regex /[REGEX]/[FLAGS] in [STRING] with [REPLACE]",
            arguments: {
              REGEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "."
              },
              FLAGS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "g"
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello world!"
              },
              REPLACE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "$&$&"
              }
            }
          },
          {
            opcode: "matchRegex",
            blockType: Scratch.BlockType.REPORTER,
            text: "item [ITEM] of [STRING] matched by regex /[REGEX]/[FLAGS]",
            arguments: {
              ITEM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello world!"
              },
              REGEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "(.) (.{2})"
              },
              FLAGS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "g"
              }
            }
          },
          {
            opcode: "testRegex",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[STRING] matches regex /[REGEX]/[FLAGS]?",
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello world!"
              },
              REGEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "hello"
              },
              FLAGS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "i"
              }
            }
          },

          "---",

          {
            opcode: "identical",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [OPERAND1] identical to [OPERAND2]?",
            arguments: {
              OPERAND1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "A"
              },
              OPERAND2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "a"
              }
            }
          },

          "---",

          {
            opcode: "isCase",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [STRING] [TEXTCASE]?",
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple"
              },
              TEXTCASE: {
                type: Scratch.ArgumentType.STRING,
                menu: "textCase",
                defaultValue: CaseParam.LOWERCASE
              }
            }
          },
          {
            opcode: "toCase",
            blockType: Scratch.BlockType.REPORTER,
            text: "convert [STRING] to [TEXTCASE]",
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple"
              },
              TEXTCASE: {
                type: Scratch.ArgumentType.STRING,
                menu: "textCase",
                defaultValue: CaseParam.UPPERCASE
              }
            }
          }
        ],
        menus: {
          textCase: {
            acceptReporters: true,
            items: this._initCaseMenu()
          }
        }
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

    count(args, util) {
      //.toLowerCase() for case insensitivity
      args.STRING = args.STRING.toString().toLowerCase();
      args.SUBSTRING = args.SUBSTRING.toString().toLowerCase();

      return args.STRING.split(args.SUBSTRING).length - 1;
    }

    _caseInsensitiveRegex(str) {
      return new RegExp(
        str.replaceAll(/[^a-zA-Z0-9]/g, "\\$&"),
        "gi"
      );
    }

    split(args, util) {
      args.STRING = args.STRING.toString();
      args.SPLIT = args.SPLIT.toString();
      args.ITEM = Number(args.ITEM) || 0;

      // Cache the last split
      if (!(
        splitCache &&
        splitCache.string === args.STRING &&
        splitCache.split === args.SPLIT
      )) {
        const regex = this._caseInsensitiveRegex(args.SPLIT);

        splitCache = {
          string: args.STRING,
          split: args.SPLIT,
          arr: args.STRING.split(regex)
        };
      }
      return splitCache.arr[args.ITEM - 1] || "";
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
      args.STRING = args.STRING.toString().toLowerCase();
      args.SUBSTRING = args.SUBSTRING.toString().toLowerCase();

      // Since both arguments are casted to strings beforehand,
      // we don't have to worry about type differences
      // like in the item number of in list block
      const found = args.STRING.indexOf(args.SUBSTRING);

      // indexOf returns -1 when no matches are found
      return found === -1 ? 0 : found + 1;
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
        args.STRING = args.STRING.toString();
        args.REGEX = args.REGEX.toString();
        args.FLAGS = args.FLAGS.toString();
        args.ITEM = Number(args.ITEM) || 0;

        // Cache the last matched string
        if (!(
          matchCache &&
          matchCache.string === args.STRING &&
          matchCache.regex === args.REGEX &&
          matchCache.flags === args.FLAGS
        )) {
          const newFlags = args.FLAGS.includes("g") ? args.FLAGS : args.FLAGS + "g";
          const regex = new RegExp(args.REGEX, newFlags);

          matchCache = {
            string: args.STRING,
            regex: args.REGEX,
            flags: args.FLAGS,
            arr: args.STRING.match(regex)
          };
        }
        return matchCache.arr[args.ITEM - 1] || "";
      } catch (e) {
        console.error(e);
        return "";
      }
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
          return (!(
            string.toUpperCase() === string ||
            string.toLowerCase() === string
          ));
        case CaseParam.TITLECASE:
          return ![...string.matchAll(/\b./g)].some((match) => {
            return match[0].toLowerCase() === match[0];
          });
        default: return false;
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
          return Array.from(string).map(
            (char, index) => index % 2 === 0 ?
              char.toUpperCase() :
              char.toLowerCase()
          ).join("");
        case CaseParam.TITLECASE:
          return string.split(/\b/g).map((str) => {
            let chars = Array.from(str);
            if (chars.length < 1) return "";
            chars[0] = chars[0].toUpperCase();
            return chars.join("");
          }).join("");
        default: return string;
      }
    }
  }

  Scratch.extensions.register(new StringsExt());
})(Scratch);