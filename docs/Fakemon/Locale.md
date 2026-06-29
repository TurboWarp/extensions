# Locale
The Locale extension allows developers to manualy register translations for text rather than using an external server like the Translate extension. It is designed for those who want control over the translations.

> [!NOTE]
> Some of these blocks use JSON, a format for storing data in key-value pairs. The JSON extension will make these blocks much easier to use, especially for beginners.
 

## Working With Translation Information
The first step to translating text is _having_ the translations. These blocks allow you to register translations of text to be used later.

Translation information is stored in the project file, but it is recommended to always have the translation registration blocks in the project.

### Global Translations
If you want to register all of your translations within the same block, you can use:
```scratchblocks
set global translation information to JSON [{}] ::#2a5fa0
```
In the input, use JSON in the following format to register translations:
```json
{
    "language-code":{
        "text in your language":"translation in other language",
        "more text in your language":"another translation in other language"
    },
    "other-language-code":{
        "even more text in your language":"blah blah blah"
    }
}
```
Don't worry if you don't know any language codes—we'll get to that later.

If you need to merge the existing the existing information with something new, use this block:

```scratchblocks
merge current translation information with JSON [{}] ::#2a5fa0
```
This block takes the current translation information and sets the values of the keys defined in the input to their new values. This can both replace and add new keys.

You can get the global information with this block:
```scratchblocks
(get global translation information ::#2a5fa0)
```

For an array of all languages that can be translated to, use:
```scratchblocks
(all languages that can be translated to ::#2a5fa0)
```

### Per-Language Translations
Sometimes, you might want to register all of the translations, one language at a time. For this, you can use:
```scratchblocks
set translations for language code [es] to JSON [{}] ::#2a5fa0
```
In this block, the first input is the language code, and the second input is the JSON. 
The JSON follows a similar format to last time, but, since you're defining the language code somewhere else, that part isn't needed.

```json
{
    "text in your language":"translation in other language",
    "more text in your language":"another translation in other language"
    }
```

To merge per-language translation information, use this block:

```scratchblocks
merge current translations for language code [es] with JSON [{}] ::#2a5fa0
```
This block is similar to the previous merge block, but for a specific language rather than all of them. The first input is the language code, and the second is the JSON to merge.

You can get per-language information with this block:
```scratchblocks
(get translations for language code [es] ::#2a5fa0)
```

### Per-Word Translations
If you only want to register one translation with a block, you can use:
```scratchblocks
set translation for [Hello, World!] in language code [es] to [¡Hola, mundo!] ::#2a5fa0
```
Here, the first input is the text in your language (or an ID), the second is the language code, and the third is the translation.
You don't need to know JSON for this block, since it does everything for you.


## Language Codes

Locale also features various blocks to help you _find_ language codes.

### Preferred Languages

Many of these blocks are for the languages preferred by the user. These can be used to determine what language to translate to.

```scratchblocks
(get user's current language code ::#2a5fa0)
```
If it's available, this block uses the language TurboWarp (or any other Scratch mod) is set to. However, if that information isn't available, like in packaged projects, the highest-priority language set by the browser is used.

```scratchblocks
(get user's preferred language array ::#2a5fa0)
```
This block gets all languages preferred by the user as an array. It pulls both from the browser and, if available, TurboWarp.

```scratchblocks
<does the user prefer language code [es]? ::#2a5fa0>

This block returns true if the afformentioned preferred language array contains the specified language code, or false otherwise.

```scratchblocks
(preferred languages that can be translated to ::#2a5fa0)
```
This block returns an array of language codes that are both preferred by the user and have registered translations.

### Language Code ⇆ Name Conversions

Sometimes, you might want to get the name from a language code or the code from a name. These blocks support the same languages as the Translate extension.

```scratchblocks
(name of language with code [es v] ::#2a5fa0)
```
This block returns the name associated with the language code in the current language.

```scratchblocks
(name of language with code [es v] in [Spanish v] ::#2a5fa0)
```
This block returns the name associated with the language code in the specified language.

```scratchblocks
(code of language with name [Spanish v] ::#2a5fa0)
```
This block returns the language code of the specified language. The language's name can be in **any** language supported by the extension, not just the current one or its native name.

## Translating Text
The last block you should know about is the translate block. It's what actually gets the translation to be used in the project.

```scratchblocks
(translate [Hello, world!] to language code [es] ::#2a5fa0)
```

This block uses the information set by the blocks in the **Working With Translation Information** section of this documentation to actually translate the text. If the specified text has no translation in that language, the input will be used instead. This is to prevent errors and projects with completely blank strings. In this case, an untranslated language is better than none.

```scratchblocks
(all strings with attempted translations ::#2a5fa0)
```

This block returns every piece of text that has had a translation block used on it as an array since the most recent green flag click. It's useful for providing translators with all strings that can be translated, including ones that have already been completed.

```scratchblocks
(all strings with failed translations ::#2a5fa0)
```

This block returns every translation that has failed since the most recent green flag click. It's useful for providing translators with strings that still need to be translated.

## Example <!--TODO: Make more examples and/or a sample project (priority: low-medium)-->

This is an example of a simple project that uses the Locale extension:

```scratchblocks
when gf clicked
set translation for [Hello, World!] in language code [en] to [Hello, world!] ::#2a5fa0 // en is the language code for English.
set translation for [Hello, World!] in language code [es] to [¡Hola, mundo!] ::#2a5fa0 // es is the language code for Español—Spanish.
set [language v] to (item (1) of array  (preferred languages that can be translated to ::#2a5fa0) ::#3271d0) // The `item () of array` block is from the JSON extension.
say (translate [Hello, world!] to language code (language ::variables) ::#2a5fa0) for (2) secs
```
