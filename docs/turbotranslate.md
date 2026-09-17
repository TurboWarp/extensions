# TurboTranslate

TurboTranslate is an extension for localizing Scratch projects into different languages.

Instead of writing custom list parsers or nested checks for each language, you can store translations in a dictionary and look them up with blocks.

## Key Concepts

- **Languages**: 13 common languages are included by default (English, Russian, Spanish, French, German, Ukrainian, Japanese, Chinese, etc.). Custom languages can be added at any time.
- **Language code vs Name**: Languages are identified by standard codes like `en` or `ru`, but also have human-readable names like `English` or `Русский`.
- **Fallbacks**: If a translation is missing in the current language, TurboTranslate falls back to English.
- **Plurals**: Supports grammatical plural forms (`.one`, `.few`, `.many`, `.other`) with `{n}` replacement for numbers.

## Blocks

### Language Settings

```scratch
set language to [en v] :: #4361ee
```

Sets the current language and triggers the `when language changed` event.

---

```scratch
(current language :: #4361ee)
```

Returns the active language code (for example: `en` or `ru`).

---

```scratch
(current language name :: #4361ee)
```

Returns the display name of the current language (for example: `English` or `Русский`).

---

```scratch
when language changed :: #4361ee hat
```

Fires across all sprites when `set language to [...]` changes the language. Use this to update text costumes or redraw text labels.

---

```scratch
(system language :: #4361ee)
```

Returns the language reported by the player's browser (e.g. `ru` or `en`).

---

```scratch
add language [es] with name [Español] :: #4361ee
```

Adds a new language code and its display name.

---

```scratch
remove language [es v] :: #4361ee
```

Deletes a language and all of its translations.

---

```scratch
(name of language [en v] :: #4361ee)
```

Gets the display name for a language code.

---

```scratch
(languages list :: #4361ee)
```

Returns a comma-separated list of all registered language codes.

---

```scratch
<language [en] exists? :: #4361ee>
```

Checks if a language code is registered.

---

### Translations

```scratch
set translation [welcome] to [Welcome to the game!] for [en v] :: #4361ee
```

Sets a translation for a key in a specific language.

---

```scratch
(value for [welcome] in [current v] :: #4361ee)
```

Gets the translation for a key. Defaults to the current language. If not found, falls back to English.

---

```scratch
(value for [greet] replacing [{player}] with (username) in [current v] :: #4361ee)
```

Gets a translation and replaces a placeholder tag (like `{player}`) with the given value.

---

```scratch
(value for [coins] with count (10) in [current v] :: #4361ee)
```

Picks the appropriate plural form for a number and replaces `{n}` with the count:
- Looks up subkeys like `coins.one`, `coins.few`, `coins.many`, `coins.other`.
- Uses language-specific rules (for example, Russian uses different endings for 1, 2-4, and 5-20).
- If no plural subkeys exist, falls back to the main key `coins`.

---

```scratch
<has translation for [welcome] in [current v]? :: #4361ee>
```

Checks if a key exists in the specified language (or in fallback).

---

```scratch
remove key [welcome] from [en v] :: #4361ee
```

Deletes a key from a language.

---

```scratch
clear translations for [en v] :: #4361ee
```

Deletes all translations for one language.

---

```scratch
clear all translations :: #4361ee
```

Deletes all translations across all languages.

---

### Saving and Loading

```scratch
(export data :: #4361ee)
```

Exports all registered languages and translations as a JSON string.

---

```scratch
import data [{}] :: #4361ee
```

Loads a previously exported JSON string.
