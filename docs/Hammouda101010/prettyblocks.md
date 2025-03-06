# Pretty Blocks
An extension to add strict formatting rules to your project. 
## Table of Contents <!-- omit in toc -->
- [Pretty Blocks](#pretty-blocks)
  - [Rules](#rules)
  - [Creating Custom Rules](#creating-custom-rules)
    - [RegBool](#regbool)
    - [Format Functions](#format-functions)

## Rules
- Camel Case Only:
  - Affects all variables and sprites.
  - Forces the "CamelCase" naming convention.
- Griffpatch Style:
  - Affects variables only.
  - Makes sure that global variables are in "uppercase" and local variables in "lowercase". much like how [griffpatch](https://www.youtube.com/@griffpatch) writes his variables.
- No Capitalized Custom Blocks:
  - Affects custom blocks only.
  - Makes sure that custom block names aren't capitalized.
## Creating Custom Rules
If you want to create your own custom rules, first press the "Add Format Rule" button. then fill out these fields:
- The rule name
- The regular expression (or RegBool code)
- The format function
- And optionaly, the scopes
### RegBool
This is a "programming language" that can make simple boolean operations, in order to add logic to your custom rules.

Here is the available syntax for RegBool:
- `<bool>`: represents a boolean value, can be `true`, `false` or a boolean function.
- `if & else`: the tenary operators
### Format Functions
There are a limited amount of functions available for custom rules. more rules might come at the future, but here are the available ones:
- To uppercase: formats the subject's text to "UPPERCASE"
- To lowercase: formats the subject's text to "lowercase" 
- regex validation: formats the subject's text to be compatible with the custom rule's regex.
- To camelCase: formats the subject's text to [camelCase](https://en.wikipedia.org/wiki/Camel_case)
- To snake_case: formats the subject's text to [snake_case](https://en.wikipedia.org/wiki/Snake_case)
- To PascalCase: much like "To camelCase", but capitalize the first letter too.
- Space trimming: trims the subject's text