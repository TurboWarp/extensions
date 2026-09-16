# TurboTranslate

TurboTranslate is an extension designed to make localizing and translating TurboWarp games effortless. Forget about tedious list lookups, manual delimiter splits, and endless nested if-else blocks.

TurboTranslate gives you visual blocks to manage multilingual dictionaries, dynamic variable substitution, smart pluralization (e.g. 1 item, 2 items), system language auto-detection, and reactive language-change events.

## Features

- **13 Built-in Languages**: English, Russian, Spanish, French, German, Chinese, Japanese, Korean, Portuguese, Italian, Polish, Turkish, and Ukrainian supported out-of-the-box.
- **Custom Languages**: Easily add regional dialects or fictional languages (like Elvish or Klingon).
- **Default Current Language**: All translation lookup blocks default to `current language`, so you don't have to specify the language repeatedly.
- **Smart Pluralization**: Natural plural handling for both 2-form languages (English, German, Spanish, etc.) and complex 3-form Slavic languages (Russian, Ukrainian, Polish).
- **Event-Driven UI**: `when language changed` instantly alerts your sprites to update their text.
- **Export & Import**: Full JSON backup and restore so you can package or fetch translation packs.

## Blocks

### Language Management

```scratch
set language to [en v] :: #4361ee
```

Sets the active game language and triggers the `when language changed` hat event across all sprites.

---

```scratch
(current language :: #4361ee)
```

Returns the ISO 639-1 code of the current language (e.g. `en`, `ru`, `es`).

---

```scratch
(current language name :: #4361ee)
```

Returns the full native name of the active language (e.g. `English`, `Русский`, `Español`).

---

```scratch
when language changed :: #4361ee hat
```

An event block that automatically triggers whenever `set language to [...]` is called. Use this in your UI sprites to instantly redraw text without messy broadcasts.

---

```scratch
(system language :: #4361ee)
```

Auto-detects the player's device or browser language code (e.g. `en`, `ru`, `fr`). Useful for automatically choosing the best language when the game starts.

---

```scratch
add language [es] with name [Español] :: #4361ee
```

Registers a new language into the game database.

---

```scratch
remove language [es v] :: #4361ee
```

Removes a registered language and its associated translations.

---

```scratch
(name of language [en v] :: #4361ee)
```

Returns the display name of a given language code.

---

```scratch
(languages list :: #4361ee)
```

Returns a comma-separated list of all registered language codes.

---

```scratch
<language [en] exists? :: #4361ee>
```

Returns `true` if the specified language is currently registered in the database.

---

### Translations & Lookups

```scratch
set translation [welcome] to [Welcome to our game!] for [en v] :: #4361ee
```

Stores a translation string for a given key and language.

---

```scratch
(value for [welcome] in [current v] :: #4361ee)
```

Retrieves the translation for the specified key. Defaults to the active language. If the key is missing in that language, it automatically falls back to English.

---

```scratch
(value for [greet] replacing [{player}] with (username) in [current v] :: #4361ee)
```

Retrieves the translation and replaces the specified tag (such as `{player}` or `{score}`) with the replacement value.

---

```scratch
(value for [coins] with count (10) in [current v] :: #4361ee)
```

Handles grammatical plurals dynamically based on the language rules:
- Reads the subkeys for plurals: `coins.one`, `coins.other`, `coins.few`, `coins.many`, `coins.zero`.
- Automatically substitutes `{n}` in the translated text with the given number.
- Falls back to regular `coins` if specific plural subkeys are not set.

---

```scratch
<has translation for [welcome] in [current v]? :: #4361ee>
```

Returns `true` if a translation exists for the given key in the specified language (or in fallback).

---

```scratch
remove key [welcome] from [en v] :: #4361ee
```

Deletes a translation key from a specific language.

---

```scratch
clear translations for [en v] :: #4361ee
```

Clears all translations for a single language while keeping the language registered.

---

```scratch
clear all translations :: #4361ee
```

Clears all stored translation keys across all languages.

---

### Import & Export

```scratch
(export data :: #4361ee)
```

Exports the entire translation database as a clean JSON string.

---

```scratch
import data [{}] :: #4361ee
```

Restores or merges a previously exported JSON translation dataset.
