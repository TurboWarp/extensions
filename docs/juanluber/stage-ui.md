# Stage UI

Stage UI is an unsandboxed TurboWarp extension that lets you create simple UI controls over the stage using blocks. It is designed for lightweight menus and settings (inputs, buttons, checkboxes, selects, radios, and text areas).

## Quick start

A common pattern is:

1. Create UI elements once (usually on green flag).
2. Update values / visibility during the project.
3. UI is automatically removed when the project stops (Stop button). You can also remove everything manually.

## IDs

Each UI element is identified by an **ID** (a text string). Use a unique ID per element.

If you create an element with an ID that already exists, the existing element may be replaced/updated depending on the block you call.

## Main blocks

### Create elements

Create elements by ID and place them over the stage using coordinates and a size:

- `input [ID] ...`
- `textarea [ID] ...`
- `button [ID] ...`
- `checkbox [ID] ...`
- `select [ID] ...`
- `radio group [ID] ...`

### Configure elements

Use the property setter to configure UI elements after creating them:

- Set placeholder: `set placeholder of [ID] to [text]`
- Set label/text: `set text of [ID] to [text]`
- Set options (select/radio): `set options of [ID] to [csv text]`
- Set value: `set value of [ID] to [text]`
- Set font size: `set font size of [ID] to [number]`
- Set colors: `set text color / background color / border color of [ID] to [color]`

Notes:
- Options are provided as comma-separated text (CSV-like). Example: `Easy,Normal,Hard`
- Colors can be CSS color values such as `#ff0000`, `rgb(255,0,0)`, or `red`.

### Read values

- `value of [ID]`
- `checked of [ID]` (checkbox/radio where applicable)
- `exists [ID]?`

### Show/hide, focus, remove

- `show [ID]`
- `hide [ID]`
- `focus [ID]`
- `remove [ID]`
- `remove all UI`

## Events

Stage UI can trigger hat blocks when UI changes (for example, when an input value changes). Use these to react to user interaction.

## Recommended usage

### Simple name input

- On green flag:
  - remove all UI
  - create input `name`
  - set placeholder of `name` to `Type your name`
  - show `name`

- During the project:
  - read `value of name` when needed

### Simple options menu

- On green flag:
  - remove all UI
  - create select `mode`
  - set options of `mode` to `Easy,Normal,Hard`
  - set value of `mode` to `Normal`

## Cleanup

All Stage UI elements are removed automatically when the project stops (Stop button). You can also call `remove all UI` at any time.
