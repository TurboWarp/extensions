# TW Tools+

Utility extensions for [TurboWarp](https://turbowarp.org/) (160+ blocks).

You can load **everything at once**, or **only the packs you need**.

## Files

| File | What you get |
|------|----------------|
| **twtoolsplus.js** | All packs (Math, Text, Data, Sprite, Time, Bullets, Extra) |
| **twtoolsplus-math.js** | Math + Geometry only |
| **twtoolsplus-text.js** | Text + Lists only |
| **twtoolsplus-data.js** | JSON + Dictionaries + Storage only |
| **twtoolsplus-sprite.js** | Sprite/Stage + Camera + Input only |
| **twtoolsplus-time.js** | Time + Control flow + Debug only |
| **twtoolsplus-bullets.js** | Bullets only |
| **twtoolsplus-extra.js** | Color + Audio + Network + Misc only |

Each pack has its own color in the palette.

## How to load

1. Open the [TurboWarp editor](https://turbowarp.org/editor).
2. **Add Extension** → **Custom Extension**.
3. Paste the **raw URL** of the file you want (the full pack or one category).
4. Enable **Run extension without sandbox**.
5. Confirm.

Example (full pack on GitHub):

```text
https://raw.githubusercontent.com/YOUR_USER/YOUR_REPO/main/twtoolsplus.js
```

Example (only bullets):

```text
https://raw.githubusercontent.com/YOUR_USER/YOUR_REPO/main/twtoolsplus-bullets.js
```

You can add several category files in the same project if you do not use the full pack.

## Updating / reloading

If you load an extension that is **already in the project** (same internal id), the old one is **removed first**, then the new code is registered. That way you can replace a file URL or paste an updated version without duplicate categories.

## Packs overview

| Pack | Color | Contents |
|------|--------|----------|
| Tools+ Math | Green | Math, Geometry |
| Tools+ Text | Purple | Text, Lists |
| Tools+ Data | Orange | JSON, Dictionaries, Storage |
| Tools+ Sprite | Blue | Sprite/Stage, Camera, Input |
| Tools+ Time | Amber | Time, Control, Debug |
| Tools+ Bullets | Red | Bullets / shooters |
| Tools+ Extra | Teal | Color, Audio, Network, Misc |

## Quick example (bullets)

1. Load **twtoolsplus-bullets.js** (or the full pack).
2. Create a clone → set velocity toward the player at speed 5.
3. Loop: move by velocity → if off stage → delete clone.

## Important

- Requires **unsandboxed** load.
- Cannot be uploaded to the Scratch website.
- List helpers use JSON text such as `["a","b"]`.

## License

[Mozilla Public License 2.0](LICENSE)
