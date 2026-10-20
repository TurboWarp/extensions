// Name: TurboTranslate
// ID: turbotranslate
// Description: Easy game localization & translation blocks for TurboWarp.
// By: Calloradc
// License: MIT

(function (Scratch) {
  "use strict";

  // User-defined SVG Icon (Translate A/文, 214x202)
  const ICON_SVG =
    "data:image/svg+xml;base64," +
    btoa(
      `<svg width="214" height="202" viewBox="0 0 214 202" fill="none" xmlns="http://www.w3.org/2000/svg">` +
        `<path d="M0 33.5H58V3L79.5 0L81 33.5H134L139.5 56.5H111.5L79.5 102.5L32.5 140L14 125.5L60.5 90L87 56.5H5L0 33.5Z" fill="white"/>` +
        `<path d="M91.5 107L121.5 124.5L114.5 144L79 118.5L91.5 107Z" fill="white"/>` +
        `<path d="M149.5 81L172.5 77L194.5 136.5L213.5 198L193 201.5L185.5 174.5L180 157L161.5 104.5L143 157L186.5 155.5L189 174.5H138.5L131.5 201.5L110 196L121.5 155.5L149.5 81Z" fill="white"/>` +
        `</svg>`
    );

  // Default initial languages pre-registered in TurboTranslate
  const BASE_LANGUAGES = [
    { code: "en", name: "English" },
    { code: "ru", name: "Русский" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "pt", name: "Português" },
    { code: "it", name: "Italiano" },
    { code: "pl", name: "Polski" },
    { code: "tr", name: "Türkçe" },
    { code: "uk", name: "Українська" },
  ];

  class TurboTranslateExtension {
    constructor() {
      // In-memory dictionary: translations[langCode][key] = text
      this.translations = Object.create(null);

      // Map of language codes to their full display names (e.g. "ru" -> "Русский")
      this.languageNames = Object.create(null);

      // Registered languages list
      this.registeredLanguages = new Set();

      // Current active language and fallback
      this.currentLanguage = "en";
      this.fallbackLanguage = "en";

      // Register default base languages
      this._registerInitialLanguages();

      // Detect system language
      this.systemLanguage = this.detectSystemLanguage();
    }

    _registerInitialLanguages() {
      for (const lang of BASE_LANGUAGES) {
        this._registerBaseLanguage(lang.code, lang.name);
      }
    }

    _registerBaseLanguage(code, name) {
      const normCode = this.normalizeLang(code);
      this.registeredLanguages.add(normCode);
      this.languageNames[normCode] = name;
      if (!this.translations[normCode]) {
        this.translations[normCode] = Object.create(null);
      }
    }

    detectSystemLanguage() {
      try {
        if (typeof navigator !== "undefined" && navigator.language) {
          const code = navigator.language.split("-")[0].toLowerCase();
          return code || "en";
        }
      } catch (e) {
        // ignore
      }
      return "en";
    }

    notifyLanguageChanged() {
      if (Scratch.vm && Scratch.vm.runtime && Scratch.vm.runtime.startHats) {
        Scratch.vm.runtime.startHats("turbotranslate_whenLanguageChanged");
      }
    }

    normalizeLang(lang) {
      return Scratch.Cast.toString(lang).trim().toLowerCase();
    }

    _resolveLang(rawLang) {
      const norm = this.normalizeLang(rawLang);
      if (
        !norm ||
        norm === "current" ||
        norm === "current language" ||
        norm === "текущий язык"
      ) {
        return this.currentLanguage;
      }
      return norm;
    }

    getLanguagesMenu() {
      const menu = [];
      for (const code of this.registeredLanguages) {
        const name = this.languageNames[code];
        const label = name ? `${name} (${code})` : code;
        menu.push({
          text: label,
          value: code,
        });
      }
      return menu.length > 0 ? menu : ["en"];
    }

    getQueryLanguagesMenu() {
      const menu = [
        {
          text: Scratch.translate("current language"),
          value: "current",
        },
      ];
      for (const code of this.registeredLanguages) {
        const name = this.languageNames[code];
        const label = name ? `${name} (${code})` : code;
        menu.push({
          text: label,
          value: code,
        });
      }
      return menu;
    }

    getInfo() {
      return {
        id: "turbotranslate",
        name: Scratch.translate("TurboTranslate"),
        color1: "#4361ee",
        color2: "#3f37c9",
        color3: "#3a0ca3",
        menuIconURI: ICON_SVG,
        blockIconURI: ICON_SVG,
        docsURI: "https://extensions.turbowarp.org/turbotranslate",
        blocks: [
          // ==============================
          // 1. Language State
          // ==============================
          {
            opcode: "setLanguage",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set language to [LANG]"),
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                menu: "LANGUAGES",
                defaultValue: "en",
              },
            },
          },
          {
            opcode: "getLanguage",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current language"),
            disableMonitor: false,
          },
          {
            opcode: "getLanguageName",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current language name"),
            disableMonitor: true,
          },
          {
            opcode: "whenLanguageChanged",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when language changed"),
            isEdgeActivated: false,
          },
          {
            opcode: "getSystemLanguage",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("system language"),
            disableMonitor: true,
          },

          "---",

          // ==============================
          // 2. Custom Languages Management
          // ==============================
          {
            opcode: "addLanguage",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("add language [CODE] with name [NAME]"),
            arguments: {
              CODE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "es",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Español",
              },
            },
          },
          {
            opcode: "removeLanguage",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("remove language [LANG]"),
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                menu: "LANGUAGES",
                defaultValue: "en",
              },
            },
          },
          {
            opcode: "getNameOfLanguage",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("name of language [LANG]"),
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                menu: "LANGUAGES",
                defaultValue: "ru",
              },
            },
          },
          {
            opcode: "getLanguagesList",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("languages list"),
            disableMonitor: true,
          },
          {
            opcode: "hasLanguage",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("language [LANG] exists?"),
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                menu: "LANGUAGES",
                defaultValue: "en",
              },
            },
          },

          "---",

          // ==============================
          // 3. Translations & Queries
          // ==============================
          {
            opcode: "setTranslation",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set translation [KEY] to [VALUE] for [LANG]"
            ),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "play",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Play",
              },
              LANG: {
                type: Scratch.ArgumentType.STRING,
                menu: "LANGUAGES",
                defaultValue: "en",
              },
            },
          },
          {
            opcode: "translateKeyInLang",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("value for [KEY] in [LANG]"),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "play",
              },
              LANG: {
                type: Scratch.ArgumentType.STRING,
                menu: "QUERY_LANGUAGES",
                defaultValue: "current",
              },
            },
          },
          {
            opcode: "translateWithVarInLang",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "value for [KEY] replacing [TAG] with [VALUE] in [LANG]"
            ),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "score_msg",
              },
              TAG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "{score}",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "100",
              },
              LANG: {
                type: Scratch.ArgumentType.STRING,
                menu: "QUERY_LANGUAGES",
                defaultValue: "current",
              },
            },
          },
          {
            opcode: "translatePluralInLang",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "value for [KEY] with count [COUNT] in [LANG]"
            ),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "coins",
              },
              COUNT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              LANG: {
                type: Scratch.ArgumentType.STRING,
                menu: "QUERY_LANGUAGES",
                defaultValue: "current",
              },
            },
          },
          {
            opcode: "hasTranslationInLang",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("has translation for [KEY] in [LANG]?"),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "play",
              },
              LANG: {
                type: Scratch.ArgumentType.STRING,
                menu: "QUERY_LANGUAGES",
                defaultValue: "current",
              },
            },
          },

          "---",

          // ==============================
          // 4. Cleanup & Data Management
          // ==============================
          {
            opcode: "removeKey",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("remove key [KEY] from [LANG]"),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "play",
              },
              LANG: {
                type: Scratch.ArgumentType.STRING,
                menu: "LANGUAGES",
                defaultValue: "en",
              },
            },
          },
          {
            opcode: "clearLanguageTranslations",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("clear translations for [LANG]"),
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                menu: "LANGUAGES",
                defaultValue: "en",
              },
            },
          },
          {
            opcode: "clearAllTranslations",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("clear all translations"),
          },
          {
            opcode: "exportData",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("export data"),
            disableMonitor: true,
          },
          {
            opcode: "importData",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("import data [DATA]"),
            arguments: {
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "{}",
              },
            },
          },
        ],
        menus: {
          LANGUAGES: {
            acceptReporters: true,
            items: "getLanguagesMenu",
          },
          QUERY_LANGUAGES: {
            acceptReporters: true,
            items: "getQueryLanguagesMenu",
          },
        },
      };
    }

    // ==========================================
    // Methods Implementation
    // ==========================================

    setLanguage(args) {
      const newLang = this.normalizeLang(args.LANG) || "en";
      const changed = this.currentLanguage !== newLang;
      this.currentLanguage = newLang;

      this.registeredLanguages.add(newLang);
      if (!this.translations[newLang]) {
        this.translations[newLang] = Object.create(null);
      }
      if (!this.languageNames[newLang]) {
        this.languageNames[newLang] = newLang;
      }

      if (changed) {
        this.notifyLanguageChanged();
      }
    }

    getLanguage() {
      return this.currentLanguage;
    }

    getLanguageName() {
      return this.languageNames[this.currentLanguage] || this.currentLanguage;
    }

    getNameOfLanguage(args) {
      const lang = this._resolveLang(args.LANG);
      return this.languageNames[lang] || lang;
    }

    getSystemLanguage() {
      return this.systemLanguage || "en";
    }

    addLanguage(args) {
      const code = this.normalizeLang(args.CODE);
      if (!code) return;
      const name = Scratch.Cast.toString(args.NAME).trim() || code;

      this.registeredLanguages.add(code);
      this.languageNames[code] = name;
      if (!this.translations[code]) {
        this.translations[code] = Object.create(null);
      }
    }

    removeLanguage(args) {
      const lang = this.normalizeLang(args.LANG);
      if (!lang) return;

      this.registeredLanguages.delete(lang);
      delete this.languageNames[lang];
      delete this.translations[lang];

      if (this.currentLanguage === lang) {
        this.currentLanguage = this.fallbackLanguage;
        this.notifyLanguageChanged();
      }
    }

    getLanguagesList() {
      return Array.from(this.registeredLanguages).join(", ");
    }

    hasLanguage(args) {
      const lang = this._resolveLang(args.LANG);
      return this.registeredLanguages.has(lang);
    }

    setTranslation(args) {
      const key = Scratch.Cast.toString(args.KEY).trim();
      if (!key) return;

      const val = Scratch.Cast.toString(args.VALUE);
      const lang = this.normalizeLang(args.LANG) || "en";

      this.registeredLanguages.add(lang);
      if (!this.languageNames[lang]) {
        this.languageNames[lang] = lang;
      }
      if (!this.translations[lang]) {
        this.translations[lang] = Object.create(null);
      }

      this.translations[lang][key] = val;
    }

    translateKeyInLang(args) {
      const key = Scratch.Cast.toString(args.KEY);
      const lang = this._resolveLang(args.LANG);
      return this._lookupKey(key, lang);
    }

    _lookupKey(key, preferredLang) {
      // 1. Try preferred language
      if (
        this.translations[preferredLang] &&
        Object.prototype.hasOwnProperty.call(
          this.translations[preferredLang],
          key
        )
      ) {
        return this.translations[preferredLang][key];
      }

      // 2. Try fallback language
      if (
        this.translations[this.fallbackLanguage] &&
        Object.prototype.hasOwnProperty.call(
          this.translations[this.fallbackLanguage],
          key
        )
      ) {
        return this.translations[this.fallbackLanguage][key];
      }

      // 3. Try English
      if (
        this.translations["en"] &&
        Object.prototype.hasOwnProperty.call(this.translations["en"], key)
      ) {
        return this.translations["en"][key];
      }

      // 4. Return key itself if missing
      return key;
    }

    translateWithVarInLang(args) {
      const key = Scratch.Cast.toString(args.KEY);
      const tag = Scratch.Cast.toString(args.TAG);
      const val = Scratch.Cast.toString(args.VALUE);
      const lang = this._resolveLang(args.LANG);

      const template = this._lookupKey(key, lang);
      return this._replaceTag(template, tag, val);
    }

    _replaceTag(sourceText, tag, value) {
      if (!tag) return sourceText;

      let result = sourceText;
      const strTag = String(tag);
      const strVal = String(value);

      if (strTag.startsWith("{") && strTag.endsWith("}")) {
        result = result.split(strTag).join(strVal);
      } else {
        const bracketed = "{" + strTag + "}";
        if (result.includes(bracketed)) {
          result = result.split(bracketed).join(strVal);
        } else {
          result = result.split(strTag).join(strVal);
        }
      }

      return result;
    }

    translatePluralInLang(args) {
      const lang = this._resolveLang(args.LANG);
      return this._getPlural(args.KEY, args.COUNT, lang);
    }

    _getPlural(rawKey, rawCount, lang) {
      const key = Scratch.Cast.toString(rawKey);
      const count = Scratch.Cast.toNumber(rawCount);

      let category = "other";
      try {
        if (typeof Intl !== "undefined" && Intl.PluralRules) {
          category = new Intl.PluralRules(lang).select(count);
        } else {
          category = Math.abs(count) === 1 ? "one" : "other";
        }
      } catch (e) {
        category = Math.abs(count) === 1 ? "one" : "other";
      }

      // Smart candidate fallback order based on category (e.g. 'other' in English falls back to 'many'/'few' if defined)
      const fallbacks = [category];
      if (category === "other") {
        fallbacks.push("many", "few");
      } else if (category === "few") {
        fallbacks.push("many", "other");
      } else if (category === "many") {
        fallbacks.push("other", "few");
      } else {
        fallbacks.push("other", "many", "few");
      }

      const candidateKeys = [];
      for (const cat of fallbacks) {
        candidateKeys.push(`${key}.${cat}`);
        candidateKeys.push(`${key}_${cat}`);
      }
      candidateKeys.push(key);

      let foundTemplate = null;
      for (const cand of candidateKeys) {
        if (
          this.translations[lang] &&
          Object.prototype.hasOwnProperty.call(this.translations[lang], cand)
        ) {
          foundTemplate = this.translations[lang][cand];
          break;
        }
        if (
          this.translations[this.fallbackLanguage] &&
          Object.prototype.hasOwnProperty.call(
            this.translations[this.fallbackLanguage],
            cand
          )
        ) {
          foundTemplate = this.translations[this.fallbackLanguage][cand];
          break;
        }
      }

      if (foundTemplate === null) {
        foundTemplate = key;
      }

      let formatted = this._replaceTag(foundTemplate, "{n}", count.toString());
      formatted = this._replaceTag(formatted, "{count}", count.toString());
      return formatted;
    }

    hasTranslationInLang(args) {
      const key = Scratch.Cast.toString(args.KEY);
      const lang = this._resolveLang(args.LANG);
      return (
        !!this.translations[lang] &&
        Object.prototype.hasOwnProperty.call(this.translations[lang], key)
      );
    }

    removeKey(args) {
      const key = Scratch.Cast.toString(args.KEY);
      const lang = this.normalizeLang(args.LANG);
      if (this.translations[lang]) {
        delete this.translations[lang][key];
      }
    }

    clearLanguageTranslations(args) {
      const lang = this.normalizeLang(args.LANG);
      if (this.translations[lang]) {
        this.translations[lang] = Object.create(null);
      }
    }

    clearAllTranslations() {
      this.translations = Object.create(null);
      this.languageNames = Object.create(null);
      this.registeredLanguages = new Set();
      this._registerInitialLanguages();
      this.currentLanguage = "en";
      this.notifyLanguageChanged();
    }

    exportData() {
      try {
        const payload = {
          version: 1,
          currentLanguage: this.currentLanguage,
          languages: this.languageNames,
          translations: this.translations,
        };
        return JSON.stringify(payload);
      } catch (e) {
        return "{}";
      }
    }

    importData(args) {
      const raw = Scratch.Cast.toString(args.DATA);
      if (!raw) return;

      try {
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object") return;

        // Restore custom language names
        if (parsed.languages && typeof parsed.languages === "object") {
          for (const [code, name] of Object.entries(parsed.languages)) {
            const normCode = this.normalizeLang(code);
            if (normCode) {
              this.registeredLanguages.add(normCode);
              this.languageNames[normCode] = String(name || normCode);
            }
          }
        }

        // Restore translations
        const transObj = parsed.translations || parsed;
        if (transObj && typeof transObj === "object") {
          for (const [lang, map] of Object.entries(transObj)) {
            const normLang = this.normalizeLang(lang);
            if (!normLang || typeof map !== "object" || map === null) continue;

            this.registeredLanguages.add(normLang);
            if (!this.translations[normLang]) {
              this.translations[normLang] = Object.create(null);
            }

            for (const [k, v] of Object.entries(map)) {
              if (
                typeof v === "string" ||
                typeof v === "number" ||
                typeof v === "boolean"
              ) {
                this.translations[normLang][k] = String(v);
              }
            }
          }
        }

        // Optionally restore current language
        if (
          parsed.currentLanguage &&
          typeof parsed.currentLanguage === "string"
        ) {
          this.setLanguage({ LANG: parsed.currentLanguage });
        } else {
          this.notifyLanguageChanged();
        }
      } catch (e) {
        console.warn("[TurboTranslate] Failed to import data:", e);
      }
    }
  }

  Scratch.extensions.register(new TurboTranslateExtension());
})(Scratch);
