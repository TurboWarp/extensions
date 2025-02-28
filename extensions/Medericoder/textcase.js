/*!
 * Copyright 2023 Médéric NIOT
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function (Scratch) {
  "use strict";
  function funchangecase(text, format) {
    if (format === "uppercase") {
      return Scratch.Cast.toString(text).toUpperCase();
    } else if (format === "lowercase") {
      return Scratch.Cast.toString(text).toLowerCase();
    } else if (format === "invert") {
      let x = "";
      for (let i = 0; i < text.length; i++) {
        if (
          Scratch.Cast.toString(text)[i] ===
          Scratch.Cast.toString(text)[i].toUpperCase()
        ) {
          x += Scratch.Cast.toString(text)[i].toLowerCase();
        } else {
          x += Scratch.Cast.toString(text)[i].toUpperCase();
        }
      }
      return x;
    } else if (format === "begin") {
      let x = "";
      for (let i = 0; i < text.length; i++) {
        if (i == 0) {
          x += Scratch.Cast.toString(text)[i].toUpperCase();
        } else {
          x += Scratch.Cast.toString(text)[i];
        }
      }
      return x;
    } else if (format === "begin words") {
      let x = "";
      for (let i = 0; i < text.length; i++) {
        if (i == 0) {
          x += Scratch.Cast.toString(text)[i].toUpperCase();
        } else if (
          Scratch.Cast.toString(text)[i - 1].toLowerCase() ===
          Scratch.Cast.toString(text)[i - 1].toUpperCase()
        ) {
          x += Scratch.Cast.toString(text)[i].toUpperCase();
        } else {
          x += Scratch.Cast.toString(text)[i];
        }
      }
      return x;
    } else if (format === "begin sentences") {
      let x = "";
      let mybool = true;
      for (let i = 0; i < text.length; i++) {
        if (mybool) {
          x += Scratch.Cast.toString(text)[i].toUpperCase();
          if (
            !(
              Scratch.Cast.toString(text)[i].toLowerCase() ===
              Scratch.Cast.toString(text)[i].toUpperCase()
            )
          ) {
            mybool = false;
          }
        } else if (
          Scratch.Cast.toString(text)[i] == "." ||
          Scratch.Cast.toString(text)[i] == "!" ||
          Scratch.Cast.toString(text)[i] == "?"
        ) {
          x += Scratch.Cast.toString(text)[i];
          mybool = true;
        } else {
          x += Scratch.Cast.toString(text)[i];
        }
      }
      return x;
    } else if (format === "begin only") {
      let x = "";
      for (let i = 0; i < text.length; i++) {
        if (i == 0) {
          x += Scratch.Cast.toString(text)[i].toUpperCase();
        } else {
          x += Scratch.Cast.toString(text)[i].toLowerCase();
        }
      }
      return x;
    } else if (format === "begin words only") {
      let x = "";
      for (let i = 0; i < text.length; i++) {
        if (i == 0) {
          x += Scratch.Cast.toString(text)[i].toUpperCase();
        } else if (
          Scratch.Cast.toString(text)[i - 1].toLowerCase() ===
          Scratch.Cast.toString(text)[i - 1].toUpperCase()
        ) {
          x += Scratch.Cast.toString(text)[i].toUpperCase();
        } else {
          x += Scratch.Cast.toString(text)[i].toLowerCase();
        }
      }
      return x;
    } else if (format === "begin sentences only") {
      let x = "";
      let mybool = true;
      for (let i = 0; i < text.length; i++) {
        if (mybool) {
          x += Scratch.Cast.toString(text)[i].toUpperCase();
          if (
            !(
              Scratch.Cast.toString(text)[i].toLowerCase() ===
              Scratch.Cast.toString(text)[i].toUpperCase()
            )
          ) {
            mybool = false;
          }
        } else if (
          Scratch.Cast.toString(text)[i] == "." ||
          Scratch.Cast.toString(text)[i] == "!" ||
          Scratch.Cast.toString(text)[i] == "?"
        ) {
          x += Scratch.Cast.toString(text)[i];
          mybool = true;
        } else {
          x += Scratch.Cast.toString(text)[i].toLowerCase();
        }
      }
      return x;
    } else if (format === "1/2 up") {
      let x = "";
      for (let i = 0; i < text.length; i++) {
        if (i % 2 == 0) {
          x += Scratch.Cast.toString(text)[i].toUpperCase();
        } else {
          x += Scratch.Cast.toString(text)[i].toLowerCase();
        }
      }
      return x;
    } else if (format === "1/2 low") {
      let x = "";
      for (let i = 0; i < text.length; i++) {
        if (i % 2 == 1) {
          x += Scratch.Cast.toString(text)[i].toUpperCase();
        } else {
          x += Scratch.Cast.toString(text)[i].toLowerCase();
        }
      }
      return x;
    } else if (format === "1/2 up letters only") {
      let x = "";
      let noletters = 0;
      for (let i = 0; i < text.length; i++) {
        if (
          Scratch.Cast.toString(text)[i].toUpperCase() ===
          Scratch.Cast.toString(text)[i].toLowerCase()
        ) {
          noletters += 1;
          x += Scratch.Cast.toString(text)[i];
        } else if ((i - noletters) % 2 == 0) {
          x += Scratch.Cast.toString(text)[i].toUpperCase();
        } else {
          x += Scratch.Cast.toString(text)[i].toLowerCase();
        }
      }
      return x;
    } else if (format === "1/2 low letters only") {
      let x = "";
      let noletters = 0;
      for (let i = 0; i < text.length; i++) {
        if (
          Scratch.Cast.toString(text)[i].toUpperCase() ===
          Scratch.Cast.toString(text)[i].toLowerCase()
        ) {
          noletters += 1;
          x += Scratch.Cast.toString(text)[i];
        } else if ((i - noletters) % 2 == 1) {
          x += Scratch.Cast.toString(text)[i].toUpperCase();
        } else {
          x += Scratch.Cast.toString(text)[i].toLowerCase();
        }
      }
      return x;
    } else if (format === "random") {
      let x = "";
      for (let i = 0; i < text.length; i++) {
        if (Math.random() < 0.5) {
          x += Scratch.Cast.toString(text)[i].toUpperCase();
        } else {
          x += Scratch.Cast.toString(text)[i].toLowerCase();
        }
      }
      return x;
    } else {
      return Scratch.Cast.toString(text);
    }
  }

  function fungetcase(args) {
    var low = 0;
    var up = 0;
    for (let i = 0; i < args.TEXT.length; i++) {
      if (
        Scratch.Cast.toString(args.TEXT)[i].toLowerCase() ===
        Scratch.Cast.toString(args.TEXT)[i].toUpperCase()
      ) {
        low += 0;
        up += 0;
      } else if (
        Scratch.Cast.toString(args.TEXT)[i].toLowerCase() ===
        Scratch.Cast.toString(args.TEXT)[i]
      ) {
        low += 1;
      } else {
        up += 1;
      }
    }
    if (up == 0 && low == 0) {
      return "";
    } else if (up > 0 && low > 0) {
      if (up == low) {
        return "mixed";
      } else if (up > low) {
        return "mixed (upper)";
      } else {
        return "mixed (lower)";
      }
    } else if (up > low) {
      return "upper";
    } else {
      return "lower";
    }
  }

  class TextCase {
    getInfo() {
      return {
        id: "medericodertextcase",
        name: Scratch.translate("Text Case"),
        blocks: [
          {
            opcode: "strictlyequal",
            blockType: Scratch.BlockType.BOOLEAN,
            // eslint-disable-next-line extension/should-translate
            text: "[TEXT1] ≡ [TEXT2]",
            arguments: {
              TEXT1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Hello"),
              },
              TEXT2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("hello"),
              },
            },
          },
          {
            opcode: "quasiequal",
            blockType: Scratch.BlockType.BOOLEAN,
            // eslint-disable-next-line extension/should-translate
            text: "[TEXT1] ≈ [TEXT2]",
            arguments: {
              TEXT1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Hello"),
              },
              TEXT2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("hello"),
              },
            },
          },
          "---",
          {
            opcode: "changecase",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("convert [TEXT] to case [FORMAT]"),
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate(
                  "Where is the apple? It is here!"
                ),
              },
              FORMAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "FORMAT_MENU",
              },
            },
          },
          {
            opcode: "getcase",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("case from [TEXT]"),
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("hello world"),
              },
            },
          },
          {
            opcode: "iscase",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [TEXT] [FORMAT]"),
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("hello world"),
              },
              FORMAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "FORMAT_MENU",
              },
            },
          },
          "---",
          {
            opcode: "glitch",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("glitch [TEXT] level [PROBA]%"),
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Hello"),
              },
              PROBA: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
              },
            },
          },
        ],
        menus: {
          FORMAT_MENU: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("uppercase"), value: "uppercase" },
              { text: Scratch.translate("lowercase"), value: "lowercase" },
              { text: Scratch.translate("invert"), value: "invert" },
              { text: Scratch.translate("begin"), value: "begin" },
              { text: Scratch.translate("begin words"), value: "begin words" },
              {
                text: Scratch.translate("begin sentences"),
                value: "begin sentences",
              },
              { text: Scratch.translate("begin only"), value: "begin only" },
              {
                text: Scratch.translate("begin words only"),
                value: "begin words only",
              },
              {
                text: Scratch.translate("begin sentences only"),
                value: "begin sentences only",
              },
              { text: Scratch.translate("1/2 up"), value: "1/2 up" },
              { text: Scratch.translate("1/2 low"), value: "1/2 low" },
              {
                text: Scratch.translate("1/2 up letters only"),
                value: "1/2 up letters only",
              },
              {
                text: Scratch.translate("1/2 low letters only"),
                value: "1/2 low letters only",
              },
              { text: Scratch.translate("random"), value: "random" },
              { text: Scratch.translate("identity"), value: "identity" },
            ],
          },
        },
      };
    }

    changecase(args) {
      return funchangecase(args.TEXT, args.FORMAT);
    }

    getcase(args) {
      return fungetcase(args);
    }

    iscase(args) {
      if (args.FORMAT == "random") {
        return fungetcase(args).includes("mixed");
      } else {
        return (
          Scratch.Cast.toString(args.TEXT) ===
          funchangecase(args.TEXT, args.FORMAT)
        );
      }
    }

    strictlyequal(args) {
      return args.TEXT1 === args.TEXT2;
    }

    quasiequal(args) {
      return (
        Scratch.Cast.toString(args.TEXT1).toLowerCase() ===
        Scratch.Cast.toString(args.TEXT2).toLowerCase()
      );
    }

    glitch(args) {
      var x = "";
      for (let i = 0; i < Scratch.Cast.toString(args.TEXT).length; i++) {
        if (Math.random() * 100 < args.PROBA) {
          x += funchangecase(Scratch.Cast.toString(args.TEXT)[i], "invert");
        } else {
          x += Scratch.Cast.toString(args.TEXT)[i];
        }
      }
      return x;
    }
  }
  Scratch.extensions.register(new TextCase());
})(Scratch);
