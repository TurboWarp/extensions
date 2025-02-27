(function (Scratch) {
  "use strict";

  const parseEnglish = (text) => {
    const words = text.toLowerCase().match(/\b\w+\b/g);
    const uniques = Array.from(new Set(words));
    uniques.sort();
    return uniques;
  };

  const parseChinese = (text) => {
    const words = text.match(/[^\u4e00-\u9fa5]+|[\u4e00-\u9fa5]+/g);
    const uniques = Array.from(new Set(words));
    uniques.sort(function (a, b) {
      return a.localeCompare(b, "zh-Hans-CN", { sensitivity: "accent" });
    });
    return uniques;
  };

  const parse = (text, language) => {
    if (language === "zh") {
      return parseChinese(text);
    }
    return parseEnglish(text);
  };

  class SortUniqueWords {
    getInfo() {
      return {
        id: "nonameawasortuniquewords",
        name: Scratch.translate("Sort Unique Words"),
        color1: "#5a8b9e",
        color2: "#427081",
        color3: "#427081",
        blocks: [
          {
            opcode: "words",
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true,
            text: Scratch.translate(
              "sort unique words in [text] as [language]"
            ),
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate(
                  "movie dog restaurant book school"
                ),
              },
              language: {
                type: Scratch.ArgumentType.STRING,
                menu: "language",
              },
            },
          },
        ],
        menus: {
          language: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("English (en)"),
                value: "en",
              },
              {
                text: Scratch.translate("Chinese (zh)"),
                value: "zh",
              },
            ],
          },
        },
      };
    }
    words(args) {
      const text = Scratch.Cast.toString(args.text);
      const words = parse(text, args.language);
      return words.join(" ");
    }
  }

  Scratch.extensions.register(new SortUniqueWords());
})(Scratch);
