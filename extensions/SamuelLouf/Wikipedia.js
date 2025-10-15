// Name: Wikipedia
// ID: samuelloufwikipedia
// Description: Allow you to fetch the content of wikipedia pages.
// By: SamuelLouf <https://scratch.mit.edu/users/samuellouf/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  const icon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxOTkuMjYzMzkiIGhlaWdodD0iMTk5LjA5MTgzIiB2aWV3Qm94PSIwLDAsMTk5LjI2MzM5LDE5OS4wOTE4MyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE0OS4zNzY4MywtNjguNDQwOTUpIj48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTE0OS4zNzY4MywyNjcuNTMyNzhjMCwwIDAsLTI3Ljg4Nzk3IDAsLTU0LjgzNjE5YzAsLTE0LjQ3MzQzIDM1LjI3MzgsMjkuNDg0NzUgMzUuNjM5ODUsLTMzLjc2NDA3YzAuNDY2MjksLTgwLjU2OTEgLTM1LjYzOTg1LC0yMi41MDAzNiAtMzUuNjM5ODUsLTMxLjg4ODI5YzAsLTE1LjE2MzIgMCwtMjguNTEyOSAwLC0yOC41MTI5YzAsMCA0Ny41MjAxNSwwIDc4LjE4MTU1LDBjNi41NTQxNiwwIC01My4zMTY1LC00My41NTA0MyAyNC41ODY3NywtNDkuNDIxODdjOTguMzA3NTEsLTcuNDA5MjggMjMuMTQzNTgsNDkuMjA5ODIgMzUuNTY1NjYsNDkuNDIxODdjMTMuMzE2MTEsMC4yMjczMSAxOS40MzcwOSwwIDE5LjQzNzA5LDBjMCwwIDAuMjI3MzEsMjcuNzEzMjIgMCw0My41MTkxNWMtMC4yMDYyNywxNC4zNDMwNiA0NS4wNTQ2NiwtMTIuMTU4MTcgNDEuMjY3MiwzOS4zOTE0MWMtMi42NTk0NiwzNi4xOTY3NyAtNDEuMjY3MiwxOC41NjA0MiAtNDEuMjY3MiwyOC43NjE5OGMwLDE5LjEyMjY0IDAsMzcuMzI4OSAwLDM3LjMyODljMCwwIC03LjgwOTg4LDAgLTQxLjYyMTMsMGMtMTQuMDcyMjMsMCA1OC45ODk2MywtMzIuNzI1NTggLTMyLjUxMzU1LC0zNy41MTU2M2MtNjkuMzIzMTQsMTQuMDYzNjggLTI3LjU2MTM1LDM3LjUxNTYzIC0zNC4zODkzMywzNy41MTU2M2MtMjYuMDE5MzcsMCAtNDkuMjQ2ODksMCAtNDkuMjQ2ODksMHoiIGZpbGw9IiNhYWFhYWEiIHN0cm9rZS13aWR0aD0ibm9uZSIvPjx0ZXh0IHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5Mi4yNzMyNCwyMDkuMTcwMzYpIHNjYWxlKDIuNTI4MzEsMi41MjgzMSkiIGZvbnQtc2l6ZT0iNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIgZm9udC1mYW1pbHk9IlNlcmlmIiBmb250LXdlaWdodD0ibm9ybWFsIiB0ZXh0LWFuY2hvcj0ic3RhcnQiPjx0c3BhbiB4PSIwIiBkeT0iMCI+VzwvdHNwYW4+PC90ZXh0PjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjkwLjYyMzE2NTE2MzU1Njk5OjExMS41NTkwNDgwNDU3MTI2MS0tPg==";

  const languages_list = [
    {
      text: Scratch.translate("English"),
      value: "en",
    },
    {
      text: Scratch.translate("French"),
      value: "fr",
    },
    {
      text: Scratch.translate("Spanish"),
      value: "es",
    },
    {
      text: Scratch.translate("German"),
      value: "de",
    },
    {
      text: Scratch.translate("Italian"),
      value: "it",
    },
    {
      text: Scratch.translate("Portuguese"),
      value: "pt",
    },
    {
      text: Scratch.translate("Russian"),
      value: "ru",
    },
    {
      text: Scratch.translate("Japanese"),
      value: "ja",
    },
    {
      text: Scratch.translate("Chinese"),
      value: "zh",
    },
    {
      text: Scratch.translate("Arabic"),
      value: "ar",
    },
    {
      text: Scratch.translate("Polish"),
      value: "pl",
    },
    {
      text: Scratch.translate("Egypt"),
      value: "arz",
    },
    {
      text: Scratch.translate("Dutch"),
      value: "nl",
    },
    {
      text: Scratch.translate("Vietnamese"),
      value: "vi",
    },
    {
      text: Scratch.translate("Ukrainian"),
      value: "uk",
    },
    {
      text: Scratch.translate("Swedish"),
      value: "sv",
    },
    {
      text: Scratch.translate("Vietnamese"),
      value: "vi",
    },
  ];

  const hasOwn = (obj, property) =>
    Object.prototype.hasOwnProperty.call(obj, property);

  function json_array_filter(key, json) {
    json = JSON.stringify(json);
    try {
      json = JSON.parse(json);
      return json.map((x) => {
        if (hasOwn(x, key)) {
          return x[key];
        }
        return null;
      });
    } catch (e) {
      return null;
    }
  }

  class Wikipedia {
    constructor() {
      this.wikipediaLanguages = "en";
    }

    getInfo() {
      return {
        id: "samuelloufwikipedia",
        name: Scratch.translate("Wikipedia"),
        color1: "#bcbcbc",
        menuIconURI: icon,
        blocks: [
          {
            opcode: "fetchFirstParagraph",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("first paragraph on [NAME]'s article"),
            disableMonitor: true,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Scratch (programming language)",
              },
            },
          },
          {
            opcode: "fetchShortPhrase",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("short phrase about [NAME]"),
            disableMonitor: true,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate(
                  "Scratch (programming language)"
                ),
              },
            },
          },
          {
            opcode: "getPageURL",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("URL of page [NAME]"),
            disableMonitor: true,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate(
                  "Scratch (programming language)"
                ),
              },
            },
          },
          {
            opcode: "doesPageExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("does page [NAME] exist?"),
            disableMonitor: true,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Unexistant page"),
              },
            },
          },
          "---",
          "---",
          {
            opcode: "addLanguage",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "add the language [text] with the id [value]"
            ),
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Esperanto"),
              },
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "eo",
              },
            },
          },
          {
            opcode: "selectLanguage",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("switch wikipedia to [LANGUAGE]"),
            arguments: {
              LANGUAGE: {
                type: Scratch.ArgumentType.STRING,
                menu: "languages",
              },
            },
          },
          {
            opcode: "getLanguage",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Wikipedia's language"),
          },
        ],
        menus: {
          languages: {
            acceptReporters: false,
            items: languages_list,
          },
        },
      };
    }

    fetchFirstParagraph(args) {
      return Scratch.fetch(
        `https://${this.wikipediaLanguages}.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=1&titles=${encodeURIComponent(args.NAME)}&explaintext=1&exsectionformat=plain&format=json&origin=*`
      )
        .then((response) => {
          if (response.ok == true) {
            return response.json();
          } else {
            return "";
          }
        })
        .then((data) => {
          const pageId = Object.keys(data.query.pages)[0];
          let extract = data.query.pages[pageId].extract;
          extract = extract.replace(/\s{2,}/g, " ");
          var paragraph = extract.split("\n")[0];
          var split_paragraph = paragraph.split(".");
          var result = "";
          for (var i in split_paragraph) {
            // @ts-ignore
            if (i != split_paragraph.length - 1) {
              result = result + split_paragraph[i] + ".";
            }
          }
          return result;
        });
    }

    fetchShortPhrase(args) {
      return Scratch.fetch(
        `https://${this.wikipediaLanguages}.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=1&titles=${encodeURIComponent(args.NAME)}&explaintext=1&exsectionformat=plain&format=json&origin=*`
      )
        .then((response) => {
          if (response.ok == true) {
            return response.json();
          } else {
            return "";
          }
        })
        .then((data) => {
          const pageId = Object.keys(data.query.pages)[0];
          let extract = data.query.pages[pageId].extract;
          extract = extract.replace(/\s{2,}/g, " ");
          return extract.split(".").slice(0, 2).join(".") + ".";
        })
        .catch((error) => {
          return "";
        });
    }

    getPageURL(args) {
      return `https://${this.wikipediaLanguages}.wikipedia.org/wiki/${args.NAME.replace(/\s/g, "_")}`;
    }

    doesPageExists(args) {
      return Scratch.fetch(
        `https://${this.wikipediaLanguages}.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=1&titles=${encodeURIComponent(args.NAME)}&explaintext=1&exsectionformat=plain&format=json&origin=*`
      )
        .then((response) => {
          if (response.ok == true) {
            return response.json();
          } else {
            return "";
          }
        })
        .then((data) => {
          return !!data.query.pages[0];
        })
        .catch((error) => {
          return "";
        });
    }

    // ---
    // ---

    addLanguage(args) {
      languages_list.push(args);
      Scratch.vm.extensionManager.refreshBlocks();
    }

    selectLanguage(args) {
      this.wikipediaLanguages = args.LANGUAGE;
    }

    getLanguage(args) {
      try {
        return json_array_filter("text", languages_list)[
          json_array_filter("value", languages_list).indexOf(
            this.wikipediaLanguages
          )
        ];
      } catch {
        return "";
      }
    }
  }
  Scratch.extensions.register(new Wikipedia());
  // @ts-ignore
})(Scratch);
