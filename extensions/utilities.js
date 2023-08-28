// Name: Utilities
// ID: utilities
// Description: A bunch of interesting blocks.
// Original: Sheep_maker <https://scratch.mit.edu/users/Sheep_maker/>

/*!
 * This is based on:
 * https://github.com/SheepTester/sheeptester.github.io/blob/master/javascripts/utilities.js
 *
 * Original license:
 * MIT License
 *
 * Copyright (c) 2021 Sean
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function (Scratch) {
  "use strict";

  const icon =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADTUlEQVRIS63VTWgUZxgH8P+7Mzsf+2U2SrPJKBoEA1WKUMzupaKHpgoetadCnaBN9FRaLLRQEW17KKIed1V21dJLbU/FRqiixx219NDaVi+NmnWNZT+cze7Ozsf7yoxEYpnMRJI5DQzP+5v3P8/7DEHANVHM7iXAVyAkwQCNgZYjDp3KH7jzZ1DdwmckBLirrE29KQgcTNOBZTrQdYP2es631LSPnp34zQqDlgTIcvTlOowxNBsG6o3uHw6he899eOt+EBIGeBHxUW5ElDjEYwKSKdFbzzAsVB61/q4lWlsvv3/XXAwJBOaL9pe29slE3MgoOSHF+N0DAwnwfASNehe1WudkYVw7sixgYfFkMXtSikU/VZQU3LhmHjVZ17Sz59Tbt/2QJe3glUIGMnEhe3PgjcR2Ny5dN/Df0873ebX8gS/wshUBUMK+PKveuhzWGZPF0fdiceHq4FAK3a6FyoyuFca13GKA14ruw8qM/ldhXNscBnz03duDUSY83jCchu04ePBvs5ZXtTW+wGQpW12/IZ1xP9r0dAM9g2bOH9Rmg5DDpW0ZwvFVD7CpW1ctqNqQP1DM/ZJRErvdFqw+bqHdMccKqvZr4AEsbdsVj4lTbkTttolqtXWloGp7FtlB7uv+1fIX6bSM9pyJJ9W5a3m1PAYC5ou4H7mUvT44mNwZTwio17to1Dsn8qp21Bc4cGl0WCLcP+vW9wkRQrxddNrW6cyw9NmxnTfthUX7ftgs9LcTP8dkfmxIWeW16cOHTdO22EheLU8v2qYTxezn6bT8zeo1MS/T2dk5GB3rHgNOMd6+SsFxnE3eJcAnohwdUZQkQAjqtTYadePHwri2L/CgHbuxg3/ywPhdUZJbJOnF3GnpPS9fw7ABAkgij3h8flS46REYPRvVig5KoebV8oXAg3bw4ugmjkV+6u+Xt/T1SSDE/wy6sTxrdiHHBYgCH4q8ssqLjOPHZYk/kkiKEUHg4Y5qBgbLpDBNG62W5Rhde4rjsGdISUEUgxHf1zx0MfsWdTBGCHIAeQeABbAyBdPmfziTpdz+SASlMOT1Z9GCoJeCLAtwrTBk2UAYsiKAH+JN2YreXDHg/wilzJ3Oz1YUmEcYY2fce0LIx88BFi6vvp70RPYAAAAASUVORK5CYII=";

  class Utilities {
    getInfo() {
      return {
        id: "utilities",
        name: "Utilities",

        color1: "#8BC34A",
        color2: "#7CB342",
        color3: "#689F38",

        menuIconURI: icon,

        blocks: [
          {
            opcode: "isExactly",

            blockType: Scratch.BlockType.BOOLEAN,

            text: "is [A] exactly [B]?",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "APPLE",
              },
            },
          },
          {
            opcode: "isLessOrEqual",

            blockType: Scratch.BlockType.BOOLEAN,

            text: "[A] <= [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
              },
              B: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
            },
          },
          {
            opcode: "isMoreOrEqual",

            blockType: Scratch.BlockType.BOOLEAN,

            text: "[A] >= [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
              },
              B: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
            },
          },
          {
            opcode: "trueBlock",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "true",
            disableMonitor: true,
          },
          {
            opcode: "falseBlock",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "false",
            disableMonitor: true,
          },
          {
            opcode: "exponent",

            blockType: Scratch.BlockType.REPORTER,

            text: "[A] ^ [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
              },
              B: {
                type: Scratch.ArgumentType.NUMBER,
              },
            },
          },
          {
            opcode: "pi",
            blockType: Scratch.BlockType.REPORTER,
            text: "pi",
          },
          {
            opcode: "ternaryOperator",

            blockType: Scratch.BlockType.REPORTER,

            text: "if [A] then [B] else [C]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "banana",
              },
              C: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
            },
          },
          {
            opcode: "letters",

            blockType: Scratch.BlockType.REPORTER,

            text: "letters [START] to [END] of [STRING]",
            arguments: {
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5,
              },
              END: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 7,
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "red apple",
              },
            },
          },
          {
            opcode: "clamp",

            blockType: Scratch.BlockType.REPORTER,

            text: "clamp [INPUT] between [MIN] and [MAX]",
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 30,
              },
              MIN: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 25,
              },
              MAX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 40,
              },
            },
          },
          {
            opcode: "currentMillisecond",
            blockType: Scratch.BlockType.REPORTER,
            text: "current millisecond",
          },
          {
            opcode: "fetchFrom",

            blockType: Scratch.BlockType.REPORTER,

            text: "get content from [URL]",
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/hello.txt",
              },
            },
          },
          {
            opcode: "parseJSON",

            blockType: Scratch.BlockType.REPORTER,

            text: "[PATH] of [JSON_STRING]",
            arguments: {
              PATH: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "fruit/apples",
              },
              JSON_STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue:
                  '{"fruit": {"apples": 2, "bananas": 3}, "total_fruit": 5}',
              },
            },
          },
          {
            opcode: "newline",
            blockType: Scratch.BlockType.REPORTER,
            text: "newline character",
            disableMonitor: true,
            arguments: {},
          },
          {
            opcode: "stringToBoolean",

            blockType: Scratch.BlockType.BOOLEAN,

            text: "[STRING]",
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "true",
              },
            },
          },
          {
            opcode: "regexReplace",

            blockType: Scratch.BlockType.REPORTER,

            text: "replace [STRING] using the rule [REGEX] with [NEWSTRING]",
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "bananas are awesome. i like bananas.",
              },
              REGEX: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "banana",
              },
              NEWSTRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
            },
          },
        ],
      };
    }

    isExactly({ A, B }) {
      return A === B;
    }

    isLessOrEqual({ A, B }) {
      return A <= B;
    }

    isMoreOrEqual({ A, B }) {
      return A >= B;
    }

    trueBlock() {
      return true;
    }

    falseBlock() {
      return false;
    }

    exponent({ A, B }) {
      return Math.pow(A, B);
    }

    pi() {
      return Math.PI;
    }

    ternaryOperator({ A, B, C }) {
      return A ? B : C;
    }

    letters({ STRING, START, END }) {
      return STRING.slice(Math.max(1, START) - 1, Math.min(STRING.length, END));
    }

    clamp({ INPUT, MIN, MAX }) {
      if (MIN > MAX) {
        return Scratch.Cast.toNumber(Math.min(Math.max(INPUT, MAX), MIN));
      } else {
        return Scratch.Cast.toNumber(Math.min(Math.max(INPUT, MIN), MAX));
      }
    }

    currentMillisecond() {
      return Date.now() % 1000;
    }

    fetchFrom({ URL }) {
      return Scratch.fetch(URL)
        .then((res) => res.text())
        .catch((err) => "");
    }

    parseJSON({ PATH, JSON_STRING }) {
      try {
        const path = PATH.toString()
          .split("/")
          .map((prop) => decodeURIComponent(prop));
        if (path[0] === "") path.splice(0, 1);
        if (path[path.length - 1] === "") path.splice(-1, 1);
        let json;
        try {
          json = JSON.parse(" " + JSON_STRING);
        } catch (e) {
          return e.message;
        }
        path.forEach((prop) => (json = json[prop]));
        if (json === null) return "null";
        else if (json === undefined) return "";
        else if (typeof json === "object") return JSON.stringify(json);
        else return json.toString();
      } catch (err) {
        return "";
      }
    }

    newline() {
      return "\n";
    }

    stringToBoolean({ STRING }) {
      return STRING;
    }

    regexReplace({ STRING, REGEX, NEWSTRING }) {
      return STRING.toString().replace(new RegExp(REGEX, "gi"), NEWSTRING);
    }
  }

  Scratch.extensions.register(new Utilities());
})(Scratch);
