# TW Tools+ — Block reference

**Version:** 1.4.4  
**Extension id (full pack):** packs use ids such as `twtoolsplusmath`, `twtoolsplusbullets`, …  
**Requires:** TurboWarp, **Run without sandbox**

This document describes every block in the full pack (`twtoolsplus.js`).
Lists, dictionaries, and many tools use **JSON text** (e.g. `["a","b"]`, `{"k":1}`), not Scratch’s built-in list UI.

## Packs

| Pack in palette | Sections inside |
|-----------------|------------------|
| Tools+ Math | Math, Geometry |
| Tools+ Text | Text, Lists |
| Tools+ Data | JSON, Dictionaries, Storage |
| Tools+ Sprite | Sprite / Stage, Camera, Input |
| Tools+ Time | Time, Control flow, Debug |
| Tools+ Bullets | Bullets |
| Tools+ Extra | Color, Audio, Network, Misc |

---

## Math

| Block | Type | What it does |
|-------|------|----------------|
| `round [N] to [DECIMALS] decimal places` | Reporter | Rounds a number to a fixed number of decimal places. |
| `map [VALUE] from [A] - [B] to [C] - [D]` | Reporter | Linearly maps VALUE from range A–B into range C–D. |
| `clamp [VALUE] between [MIN] and [MAX]` | Reporter | Limits VALUE so it stays between MIN and MAX (inclusive). |
| `distance from ([X1],[Y1]) to ([X2],[Y2])` | Reporter | Euclidean distance between two points (x1,y1) and (x2,y2). |
| `is [N] [PARITY]?` | Boolean | True if N is even or odd according to the menu. |
| `[MODE] of [A] and [B]` | Reporter | Greatest common divisor or least common multiple of A and B. |
| `random number with seed [SEED]` | Reporter | Deterministic pseudo-random number in [0,1) from a seed (same seed → same result). |
| `[N] is between [MIN] and [MAX]?` | Boolean | True if N is between MIN and MAX (inclusive). |
| `angle between ([X1],[Y1]) and ([X2],[Y2])` | Reporter | Angle in degrees from point (x1,y1) to (x2,y2) using atan2 (math style, not Scratch direction). |
| `[N] to [FORMAT]` | Reporter | Converts N to Roman numerals or English words. |
| `lerp [A] to [B] by [T]` | Reporter | Linear interpolation: A + (B−A)×T. T=0 → A, T=1 → B. |
| `sign of [N]` | Reporter | Returns −1, 0, or 1 depending on the sign of N. |
| `[N] % chance?` | Boolean | True with approximately N% probability (0–100). |
| `ping-pong [VALUE] between [A] and [B]` | Reporter | Oscillates VALUE back and forth between A and B. |
| `smooth damp [CURRENT] toward [TARGET] (speed [SPEED])` | Reporter | Moves CURRENT a fraction SPEED toward TARGET (simple smoothing). |
| `noise 1D at [X] seed [SEED]` | Reporter | Smooth-ish 1D noise in [0,1) for coordinate X and SEED. |

## Geometry

| Block | Type | What it does |
|-------|------|----------------|
| `point ([X],[Y]) inside rectangle ([X1],[Y1]) - ([X2],[Y2])?` | Boolean | True if point (x,y) lies inside the axis-aligned rectangle defined by two corners. |
| `point ([X],[Y]) inside circle center ([CX],[CY]) radius [R]?` | Boolean | True if point (x,y) is inside or on the circle (center, radius). |
| `do rectangle A ([AX1],[AY1])-([AX2],[AY2]) and rectangle B ([BX1],[BY1])-([BX2],[BY2]) overlap?` | Boolean | True if two axis-aligned rectangles overlap. |
| `rotate point ([X],[Y]) around ([CX],[CY]) by [ANGLE] degrees ([AXIS])` | Reporter | Rotates point (x,y) around (cx,cy) by ANGLE degrees; reports x or y of the result. |
| `midpoint [AXIS] between ([X1],[Y1]) and ([X2],[Y2])` | Reporter | Midpoint x or y between two points. |
| `normalize vector ([X],[Y]) [AXIS]` | Reporter | Unit vector component (x or y) of (x,y). Zero-length vectors become length 1 to avoid division by zero. |

## Text

| Block | Type | What it does |
|-------|------|----------------|
| `[TEXT] to [CASE]` | Reporter | Converts text to UPPERCASE, lowercase, or Capitalized words. |
| `replace [FIND] with [REPLACE] in [TEXT]` | Reporter | Replaces all occurrences of FIND with REPLACE in TEXT. |
| `does [TEXT] contain [SUBSTRING]?` | Boolean | True if TEXT contains SUBSTRING. |
| `split [TEXT] by [SEPARATOR]` | Reporter | Splits TEXT by SEPARATOR and returns a JSON array string. |
| `join list [LIST] with separator [SEPARATOR]` | Reporter | Joins a JSON array list with SEPARATOR into one string. |
| `trim [TEXT]` | Reporter | Removes leading and trailing whitespace. |
| `pad [TEXT] to [N] chars with [CHAR] ([SIDE])` | Reporter | Pads TEXT to length N with CHAR on the start or end. |
| `does [TEXT] match pattern [REGEX]?` | Boolean | True if TEXT matches the JavaScript regular expression REGEX. |
| `count occurrences of [SUBSTRING] in [TEXT]` | Reporter | How many times SUBSTRING appears in TEXT. |
| `word count of [TEXT]` | Reporter | Number of whitespace-separated words. |
| `truncate [TEXT] to [N] chars` | Reporter | Cuts TEXT to at most N characters and adds “…” if truncated. |
| `center [TEXT] in width [N]` | Reporter | Centers TEXT in a field of width N using spaces. |
| `[MODE] HTML [TEXT]` | Reporter | Escapes or unescapes HTML special characters (&, <, >, "). |
| `slugify [TEXT]` | Reporter | URL-friendly slug: lowercase, hyphens, strips special characters. |
| `compare semver [A] to [B]` | Reporter | Compares two semver-like strings: −1 if A<B, 0 if equal, 1 if A>B. |
| `characters of [TEXT] as list` | Reporter | JSON array of each character in TEXT. |
| `[MODE] base64 [TEXT]` | Reporter | Encode or decode Base64 (UTF-8 safe). |
| `hash of [TEXT]` | Reporter | Fast non-cryptographic hash of TEXT as hex (djb2-style). |
| `random id length [N]` | Reporter | Random alphanumeric id of length N. |
| `format number [N] with thousands separator` | Reporter | Integer with thousands separators (e.g. 1,234,567). |
| `is [TEXT] a number?` | Boolean | True if TEXT trims to a valid finite number. |

## Lists

| Block | Type | What it does |
|-------|------|----------------|
| `reverse list [LIST]` | Reporter | Reversed copy of a JSON array. |
| `shuffle list [LIST]` | Reporter | Randomly shuffled copy of a JSON array. |
| `remove duplicates from [LIST]` | Reporter | Array with duplicates removed (first wins). |
| `sort list [LIST] ([MODE])` | Reporter | Sort numeric or alphabetical; returns JSON array. |
| `sublist of [LIST] from [I] to [J]` | Reporter | Slice from index I to J (1-based start, end exclusive like JS slice end). |
| `merge list [LIST1] and [LIST2]` | Reporter | Concatenates two JSON arrays. |
| `is list [LIST1] equal to [LIST2]?` | Boolean | True if both JSON arrays stringify equal. |
| `index of [MODE] in [LIST]` | Reporter | 1-based index of the min or max numeric value. |
| `[MODE] of [LIST]` | Reporter | Sum or average of numeric items. |
| `chunk list [LIST] into groups of [N]` | Reporter | Splits array into sub-arrays of size N (JSON array of arrays). |
| `filter [LIST] numbers [OP] [N]` | Reporter | Keeps numbers that compare to N with the chosen operator. |
| `map [LIST] with [OP] [N]` | Reporter | Applies +, −, ×, or ÷ with N to each numeric item. |
| `random index of [LIST]` | Reporter | Random 1-based index, or 0 if empty. |
| `stack [OP] [VALUE] on [LIST]` | Reporter | push / pop mutates array (returns new JSON); peek returns last item without removing. |
| `index of [ITEM] in [LIST]` | Reporter | 1-based index of ITEM, or 0 if not found. |
| `weighted pick from items [ITEMS] weights [WEIGHTS]` | Reporter | Picks one item using parallel weight list (higher weight = more likely). |

## JSON

| Block | Type | What it does |
|-------|------|----------------|
| `list [LIST] to JSON` | Reporter | Normalizes value to a JSON array string. |
| `JSON [JSON] to list` | Reporter | Parses JSON into a list representation (array string). |
| `get value from [JSON] at path [PATH]` | Reporter | Reads nested value with dot path (e.g. a.b). Objects returned as JSON text. |
| `set value in [JSON] at path [PATH] to [VALUE]` | Reporter | Sets nested value at dot path; creates objects as needed; returns new JSON. |
| `does [JSON] have key [KEY]?` | Boolean | True if top-level object has KEY. |
| `keys of [JSON]` | Reporter | JSON array of top-level keys. |
| `pretty-print [JSON]` | Reporter | Pretty-printed JSON with indentation. |

## Dictionaries

| Block | Type | What it does |
|-------|------|----------------|
| `create empty dictionary` | Reporter | Empty dictionary as JSON object "{}". |
| `set dict [DICT] key [KEY] to [VALUE]` | Reporter | Sets KEY to VALUE (JSON-parsed when possible); returns new dict JSON. |
| `get dict [DICT] key [KEY] (default [DEFAULT])` | Reporter | Gets KEY or DEFAULT if missing. |
| `delete key [KEY] from dict [DICT]` | Reporter | Deletes KEY; returns new dict JSON. |
| `does dict [DICT] have key [KEY]?` | Boolean | True if dict has KEY. |
| `dict [DICT] [MODE]` | Reporter | JSON array of keys or values. |

## Storage

| Block | Type | What it does |
|-------|------|----------------|
| `save [KEY] = [VALUE]` | Command | Saves VALUE under KEY in localStorage (prefix twtoolsplus:). |
| `load [KEY] (default [DEFAULT])` | Reporter | Loads KEY, or DEFAULT if missing / blocked. |
| `delete [KEY]` | Command | Deletes KEY from storage. |
| `does key [KEY] exist?` | Boolean | True if KEY exists in storage. |
| `list all saved keys` | Reporter | JSON array of all Tools+ storage keys (without prefix). |

## Sprite / Stage

| Block | Type | What it does |
|-------|------|----------------|
| `distance from this sprite to [SPRITE]` | Reporter | Distance from this sprite to another sprite by name. |
| `is this sprite touching the stage edge?` | Boolean | True if this sprite’s bounds touch the stage edge. |
| `random position on stage ([AXIS])` | Reporter | Random x or y within the stage. |
| `costume [DIMENSION] in px` | Reporter | Current costume width or height in pixels (includes size %). |
| `clone number of this sprite` | Reporter | Clone index assigned by Tools+ (0 for original). |
| `is this a clone?` | Boolean | True if this target is a clone. |
| `point towards ([X],[Y])` | Command | Points this sprite toward stage coordinates (x,y). |
| `bounding box [SIDE] of this sprite` | Reporter | top / bottom / left / right of this sprite’s bounds. |
| `apply friction [F] to velocity [V]` | Reporter | Multiplies velocity V by friction factor F (e.g. 0.9). |
| `bounce [AXIS] velocity [V] if touching edge` | Reporter | Negates V on the chosen axis if the sprite is touching that stage edge. |
| `orbit [AXIS] around ([CX],[CY]) radius [R] angle [ANGLE]` | Reporter | x or y on a circle around (cx,cy) with radius R and ANGLE degrees. |
| `smooth follow [AXIS] toward ([TX],[TY]) factor [F]` | Reporter | Smoothed x or y moving this sprite toward (tx,ty) by factor F (0–1). |
| `snap [VALUE] to grid [N]` | Reporter | Snaps VALUE to the nearest multiple of grid size N. |
| `wrap [AXIS] position [V] around stage` | Reporter | Wraps a coordinate around the stage on x or y. |
| `distance to nearest stage edge` | Reporter | Distance from this sprite to the nearest stage edge. |
| `stage edge [AXIS] at direction [DIR]` | Reporter | Stage-edge x or y in direction DIR (from center). |
| `angle to mouse` | Reporter | Scratch-style direction from this sprite toward the mouse. |
| `mouse delta [AXIS] this frame` | Reporter | Mouse movement on x or y since last frame. |
| `knockback by [AMOUNT] from ([X],[Y])` | Command | Pushes this sprite away from (x,y) by AMOUNT pixels. |
| `shortest turn from [FROM] to [TO]` | Reporter | Signed shortest angle difference from FROM to TO (−180…180). |

## Camera

| Block | Type | What it does |
|-------|------|----------------|
| `camera [AXIS] position` | Reporter | Logical camera x or y. |
| `set camera position to ([X],[Y])` | Command | Sets logical camera position (does not move the stage by itself). |
| `camera zoom` | Reporter | Logical camera zoom factor. |
| `set camera zoom to [N]` | Command | Sets logical zoom (1 = normal). |
| `world to screen [AXIS] at ([X],[Y])` | Reporter | Converts world (x,y) to screen-relative x or y using camera position and zoom. Use in “go to” for scrolling games. |

## Input

| Block | Type | What it does |
|-------|------|----------------|
| `was key [KEY] pressed this frame?` | Boolean | True only on the frame the key was first pressed. |
| `last key pressed` | Reporter | Name of the last key pressed (Scratch-style names when possible). |
| `is [BUTTON] mouse button down?` | Boolean | True while left / right / middle mouse button is held on the stage. |
| `mouse scroll delta this frame` | Reporter | Mouse wheel delta accumulated this frame. |
| `was double-click detected?` | Boolean | True on a frame where a double-click was detected on the stage. |
| `was key [KEY] released this frame?` | Boolean | True only on the frame the key was released. |

## Time

| Block | Type | What it does |
|-------|------|----------------|
| `timer [ID]` | Reporter | Seconds since timer ID was created or last reset (auto-starts at 0). |
| `reset timer [ID]` | Command | Resets timer ID to now. |
| `current date/time formatted [FORMAT]` | Reporter | Formats current local date/time; tokens YYYY MM DD HH mm ss. |
| `wait [N] frames` | Command | Waits about N display frames (requestAnimationFrame). |
| `days between [DATE1] and [DATE2]` | Reporter | Whole days between two date strings parseable by JavaScript Date. |
| `cooldown [ID] ready? (use [SECONDS]s)` | Boolean | True if cooldown ID is ready; when true, starts a new cooldown of SECONDS. |
| `stopwatch [ID] [OP]` | Reporter | start / pause / resume / read / reset a named stopwatch; reports seconds. |
| `every [N] frames ([ID])?` | Boolean | True every N frames for counter ID (independent counters per id). |
| `tween [ID] from [A] to [B] in [SECONDS]s ([EASING])` | Reporter | Animates from A to B over SECONDS with easing; same ID reuses the tween until params change. |
| `once [ID]?` | Boolean | True only the first time this ID is asked; then always false until project reload. |

## Control flow

| Block | Type | What it does |
|-------|------|----------------|
| `run task [ID] after [SECONDS] seconds` | Command | After SECONDS, broadcasts a message named ID if that broadcast exists in the project. |
| `cancel scheduled task [ID]` | Command | Cancels a pending run-after task by ID. |
| `debounce [ID]: has [SECONDS] seconds passed since last call?` | Boolean | True if at least SECONDS passed since last true for ID (edge-friendly). |
| `throttle [ID]: allow call every [SECONDS] seconds?` | Boolean | True at most once every SECONDS for ID. |
| `is task [ID] still scheduled?` | Boolean | True if a run-after task ID is still scheduled. |

## Debug

| Block | Type | What it does |
|-------|------|----------------|
| `log [VALUE] to console` | Command | console.log with [TW Tools+] prefix. |
| `log [LEVEL] [VALUE]` | Command | log / warn / error to the browser console. |
| `assert [CONDITION] with message [TEXT]` | Command | If CONDITION is false, logs an error with TEXT. |

## Bullets

| Block | Type | What it does |
|-------|------|----------------|
| `velocity X towards ([X],[Y]) at speed [SPEED]` | Reporter | X speed toward (x,y) from this sprite at SPEED (length SPEED). |
| `velocity Y towards ([X],[Y]) at speed [SPEED]` | Reporter | Y speed toward (x,y) from this sprite at SPEED. |
| `direction towards ([X],[Y])` | Reporter | Scratch direction from this sprite toward (x,y). |
| `velocity [AXIS] from direction [DIR] speed [SPEED]` | Reporter | x or y component of velocity for Scratch direction and SPEED. |
| `speed from velocity ([VX],[VY])` | Reporter | Speed magnitude from (vx,vy). |
| `angle difference from [DIR1] to [DIR2]` | Reporter | Signed shortest difference DIR2−DIR1 in degrees (−180…180). |
| `spread direction [DIR] by [SPREAD] (index [I] of [N])` | Reporter | Direction for shot I of N spread evenly across SPREAD degrees around DIR. |
| `point in direction of velocity ([VX],[VY])` | Command | Points this sprite along velocity (vx,vy). |
| `move by velocity ([VX],[VY])` | Command | Adds (vx,vy) to this sprite’s position once. |
| `is this sprite off stage (margin [MARGIN])?` | Boolean | True if sprite is outside the stage plus MARGIN pixels. |
| `homing: turn [CURRENT] toward ([X],[Y]) max [MAX] °/frame` | Reporter | Turns CURRENT direction toward (x,y) by at most MAX degrees (homing). |
| `accelerate speed [SPEED] by [ACCEL] (max [MAX])` | Reporter | SPEED + ACCEL, capped at MAX. |
| `circle pattern direction index [I] of [N] (offset [OFFSET])` | Reporter | Direction for bullet I of N in a full circle, plus OFFSET. |
| `set bullet lifetime to [FRAMES] frames` | Command | Sets remaining lifetime frames for this sprite/clone. |
| `bullet lifetime expired?` | Boolean | Decrements lifetime by 1; true when expired (or no lifetime set stays false until set). |

## Color

| Block | Type | What it does |
|-------|------|----------------|
| `RGB to hex ([R],[G],[B])` | Reporter | Hex color string from RGB 0–255. |
| `hex to RGB [HEX] ([COMPONENT])` | Reporter | R, G, or B component from a hex color. |
| `mix color [C1] and [C2] by [PERCENT] %` | Reporter | Mixes two colors by PERCENT toward the second (0–100). |
| `random color` | Reporter | Random hex color. |
| `brightness of color [C]` | Reporter | Perceived brightness 0–255 (Rec. 601 weights). |
| `is color [C] light?` | Boolean | True if brightness > 127. |
| `HSL ([H],[S],[L]) to hex` | Reporter | Hex from H (0–360), S/L (0–100). |
| `[MODE] color [C]` | Reporter | Invert colors or convert to grayscale. |
| `contrast ratio [C1] vs [C2]` | Reporter | WCAG-style contrast ratio between two colors. |
| `palette of [N] colors from hue [H]` | Reporter | JSON array of N hex colors evenly spaced from base hue H. |
| `is [C1] similar to [C2] (tolerance [T])?` | Boolean | True if RGB distance between colors ≤ tolerance T. |

## Audio

| Block | Type | What it does |
|-------|------|----------------|
| `current volume of sound [SOUND]` | Reporter | This sprite’s volume (0–100 style Scratch volume). |
| `set playback rate of sound [SOUND] to [N]` | Command | Tries to set playback rate of a named sound (VM-internal; may no-op). |
| `is sound [SOUND] currently playing?` | Boolean | True if named sound appears to be playing (best-effort). |
| `duration of sound [SOUND]` | Reporter | Duration in seconds of named sound buffer, or 0. |

## Network

| Block | Type | What it does |
|-------|------|----------------|
| `[MODE] [TEXT]` | Reporter | encodeURIComponent or decodeURIComponent. |
| `parse query string [TEXT] as JSON` | Reporter | Parses a=1&b=2 into a JSON object string. |
| `get query parameter [KEY] from URL [URL]` | Reporter | Reads one query parameter from a full URL. |

## Misc

| Block | Type | What it does |
|-------|------|----------------|
| `deep copy of [JSON]` | Reporter | Deep-clones a JSON value via parse/stringify. |

---

## Notes for game makers

- **Bullets + Sprite friction/bounce** work well for cars, top-down shooters, and platformer projectiles.
- **Camera** is logical only: store camera x/y/zoom, then place sprites with **world to screen**.
- **Storage** persists in the browser (`localStorage`); clearing site data clears saves.
- **Input “this frame”** blocks fire once per key press/release edge, not while held.
- **Audio rate / is playing / duration** depend on internal TurboWarp sound APIs and may differ by version.

## License

Mozilla Public License 2.0 — see `LICENSE`.
