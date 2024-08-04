// Name: Project Translate
// ID: projecttranslate
// Description: Translate your projects into different languages.
// By: RBryanYT <https://scratch.mit.edu/users/a_Gameer0438791>
// License: MIT

Scratch.translate.setup(
  {"es":
    {
      "_set translation key [KEY] in language [LANG] to [VAL]": "establezca la clave de traducción [KEY] en el idioma [LANG] en [VAL]",
      "_get translation key [KEY] in language [LANG]": "obtener clave de traducción [KEY] en el idioma [LANG]",
      "_get translation key [KEY] in current language": "obtener clave de traducción [KEY] en el idioma actual",
      "_current language locale code": "código de configuración regional del idioma actual",
      "_Project Translate": "Proyecto Traducir",
      "_english": "inglés",
      "_spanish": "español",
      "_french": "francés",
      "_german": "alemán",
      "_en": "es"
    }
  },
  {"fr":
    {
      "_set translation key [KEY] in language [LANG] to [VAL]": "définir la clé de traduction [KEY] dans la langue [LANG] sur [VAL]",
      "_get translation key [KEY] in language [LANG]": "obtenir la clé de traduction [KEY] dans la langue [LANG]",
      "_get translation key [KEY] in current language": "obtenir la clé de traduction [KEY] dans la langue actuelle",
      "_current language locale code": "code régional de la langue actuelle",
      "_Project Translate": "Projet Traduire",
      "_english": "anglais",
      "_spanish": "espagnol",
      "_french": "français",
      "_german": "allemand",
      "_en": "fr"
    }
  },
  {"de":
    {
      "_set translation key [KEY] in language [LANG] to [VAL]": "setze übersetzungsschlüssel [KEY] in sprache [LANG] auf [VAL]",
      "_get translation key [KEY] in language [LANG]": "übersetzungsschlüssel [KEY] in sprache [LANG] abrufen",
      "_get translation key [KEY] in current language": "übersetzungsschlüssel [KEY] in aktueller sprache abrufen",
      "_current language locale code": "aktueller sprach-locale-code",
      "_Project Translate": "Projekt Translate",
      "_english": "englisch",
      "_spanish": "spanisch",
      "_french": "französisch",
      "_german": "deutsch",
      "_en": "de"
    }
  },
);

(function(Scratch) {
  const vm = Scratch.vm;

  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Project Translate must run unsandboxed!");
  }

  var translationKeys = {}
  
  const logo = "data:image/png;base64,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"
  
  class ProjectTranslate {
    getInfo() {
      return {
        id: 'projecttranslate',
        name: Scratch.translate("Project Translate"),
        color1: "#4a8af4",
        color2: "#4784e8",
        color3: "#4178d2",
        menuIconURI: logo,
        blocks: [
          {
            opcode: 'setTranslationKey',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set translation key [KEY] in language [LANG] to [VAL]"),
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                menu: "lang"
              },
              KEY: {
                type: Scratch.ArgumentType.STRING
              },
              VAL: {
                type: Scratch.ArgumentType.STRING
              }
            }
          },
          {
            opcode: 'translationKeyInLang',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get translation key [KEY] in language [LANG]"),
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                menu: "lang"
              },
              KEY: {
                type: Scratch.ArgumentType.STRING
              }
            }
          },
          {
            opcode: 'translationKey',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get translation key [KEY] in current language"),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING
              }
            }
          },
          {
            opcode: 'currentLangCode',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current language locale code"),
            disableMonitor: true
          }
        ],
        menus: {
            lang: {
              acceptReporters: false,
              items: [
                {
                  text: Scratch.translate("english"),
                  value: "en",
                },
                {
                  text: Scratch.translate("spanish"),
                  value: "es",
                },
                {
                  text: Scratch.translate("french"),
                  value: "fr",
                },
                {
                  text: Scratch.translate("german"),
                  value: "de",
                },
              ],
            },
          },
      };
    }
  
    setTranslationKey(args) {
      if (translationKeys[args.LANG] == null){
        translationKeys[args.LANG] = {}
        translationKeys[args.LANG][args.KEY] = args.VAL
      }
    }
  
    translationKeyInLang(args) {
      return translationKeys[args.LANG][args.KEY]
    }
  
    translationKey(args) {
      return translationKeys[Scratch.translate("en")][args.KEY]
    }
  
    currentLangCode() {
      return Scratch.translate("en")
    }
  }
  Scratch.extensions.register(new ProjectTranslate());
})(Scratch);
