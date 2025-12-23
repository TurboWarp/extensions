# Welcome to RubyFS

**Version:** 1.5.0

**Author:** kx1bx1 (based on work by 0832)

**License:** MIT

> *Why did we choose this?*

> `MIT`'s license specifically states that you can do whatever you want with the software, even if your software isn't open-source. Don't we all love providing code for the closed-source community?

RubyFS is a fully virtual, structured file system implemented entirely in memory. It gives Scratch projects a realistic filesystem model: directories, files, permissions, metadata, size limits, a trash bin, and even a volatile RAM disk.

Nothing touches the user’s real disk. Everything lives inside the project runtime.

If you treat this like a tiny UNIX-ish filesystem, you’ll be right most of the time.

---

## Core Concepts You Need to Understand First

### Paths

RubyFS uses normalized, absolute paths.

* `/` is the root directory.
* Directories **must** end with `/`.
* Files **must not** end with `/`.
* `.` and `..` are resolved during normalization.
* Relative paths are automatically prefixed with `/`.

Examples:

* `test.txt` → `/test.txt`
* `/foo/../bar.txt` → `/bar.txt`
* `/data` (file) and `/data/` (directory) are distinct and mutually exclusive.

### Stores: Main FS vs RAM FS

There are two storage backends:

| Store    | Root    | Persistence                      |
| -------- | ------- | -------------------------------- |
| Main FS  | `/`     | Lives for the project’s lifetime |
| RAM Disk | `/RAM/` | Cleared on project start         |

RAM behaves exactly like the main filesystem except:

* It auto-clears when the green flag is clicked
* It is mounted under `/RAM/`
* Cross-FS operations (copy/rename) are handled explicitly

### Permissions

Every entry has a permission object:

```json
{
  "create": true,
  "delete": true,
  "see": true,
  "read": true,
  "write": true,
  "control": true
}
```

Permissions are inherited from the parent at creation time.

Important nuance:

* `see` controls visibility
* `read` controls reading file content
* `write` controls modifying file content and tags
* `create` controls creating children
* `delete` controls deletion
* `control` controls permission and size-limit changes

If `see` is false, the file effectively does not exist to most blocks.

---

## File Operations

### `[ACTION] [PATH] [DATA / DEST]`

This is the main dispatcher block. Internally it routes to different methods.

#### create

Creates a file or directory.

* Trailing slash = directory
* Parent directories are auto-created if allowed
* File content starts as empty string
* Directory content is `null`

Edge cases:

* Cannot create `/`
* File/dir collisions are blocked
* Permission errors come from the parent directory

#### delete

Deletes a file or directory.

* Non-trash paths are moved into `/.Trash/`
* Trash deletions are permanent
* Directories delete recursively

Edge cases:

* Cannot delete `/` or `/RAM/`
* Delete permission is required on the target
* Deleting a directory respects subtree permissions

#### set content to

Writes content to a file.

* Auto-creates the file if it does not exist
* Fails if target is a directory
* Enforces directory size limits

Important: This is not an append operation. It replaces content.

#### copy to

Copies a file or directory.

* Recursive for directories
* Preserves permissions, tags, limits
* Cross-FS copy is supported

Edge cases:

* Destination must not exist
* Requires `read` on source and `create` on destination
* Size limits are checked for the entire copy payload

#### rename to

Renames or moves a file/directory.

* Same-FS rename is atomic
* Cross-FS rename becomes copy + delete

Edge cases:

* Cannot rename `/` or `/RAM/`
* Destination collisions are blocked
* Size limits are enforced on the destination path

---

## Reading & Listing

### `read content of [PATH]`

Reads file content.

Fails if:

* Path doesn’t exist
* Path is a directory
* `see` or `read` permission is missing

Side effects:

* Sets “was read” flag
* Updates access timestamp

---

### `list [TYPE] under [DIR] as JSON`

Lists immediate children.

* TYPE: `all`, `files`, or `directories`
* Output is a JSON array of **names**, not full paths

Edge cases:

* Path is auto-forced to a directory
* Hidden entries (`see = false`) are excluded
* Results are sorted lexicographically

---

### `list [TYPE] matching [PATTERN] in [DIR] as JSON`

Same as `list`, but filtered using glob patterns.

Supported glob syntax:

* `*` → any string
* `?` → any single character

Internally converted to a regex.

Important:

* Matching is done on the child name only
* This is non-recursive

---

## Info & Checks

### `check if [PATH] [CONDITION]`

Conditions:

* `exists` — entry exists and is visible
* `is file`
* `is directory`
* `was read`
* `was written`

The last two are **edge-triggered**:

* They return true once
* Then reset automatically

Useful for event-style logic without hats.

---

### `get [ATTRIBUTE] of [PATH]`

Attributes include:

* file name
* directory path
* size (bytes)
* size limit
* hash (FNV-1a)
* tree structure
* date created / modified / accessed
* last read path
* last write path
* last error
* version

Notes:

* Dates are ISO strings
* `tree structure` returns an ASCII tree (not JSON)
* `hash` reads file content, so permissions apply

---

## Metadata (Tags)

Tags are arbitrary key/value pairs stored per entry.

### set tag

Requires `write` permission.

### get tag

Requires `see` permission.
Returns empty string if missing.

### delete tag

Requires `write` permission.

Tags are copied during copy operations and preserved in exports.

---

## Permissions

### `[add/remove] [PERM] permission for [PATH]`

Applies recursively if PATH is a directory.

Rules:

* Requires `control` permission on PATH
* Cannot modify `/`
* Affects both files and directories under that path

This is intentionally powerful. You can lock entire subtrees.

---

### `list permissions for [PATH]`

Returns a JSON object of the permission flags.

If `see` is false, returns `{}`.

---

## Size Limits

### set size limit

Applies to directories only.

* Limit is in bytes (string length)
* `-1` means unlimited
* Enforced recursively for all descendants

Writes that exceed the limit fail before modifying anything.

### remove size limit

Resets limit back to unlimited.

---

## Import & Export

### export file system

Exports the entire main filesystem as JSON.

* RAM disk is excluded
* Includes permissions, tags, timestamps

### import file system from [JSON]

Replaces the entire filesystem.

Important behaviors:

* Requires delete permission on `/`
* RAM disk is cleared
* Trash is recreated
* Root permissions are reset to defaults

Invalid JSON or missing root aborts safely.

---

### export file [PATH] as Base64 / Data URL

Reads file content and encodes it.

* Respects read permissions
* MIME type is inferred from extension
* Data URL includes MIME header

---

### import Base64 [DATA] to file [PATH]

Decodes Base64 and writes to a file.

* Validates Base64 format
* Accepts raw Base64 or full Data URLs
* Auto-creates the file if needed

---

## Events & Debugging

### when file at [PATH] changes

Hat block triggered when:

* File content changes
* File is deleted
* File is renamed or copied into that path

Important:

* Exact path match only
* Trigger is synchronous to the operation

---

### turn console logging on/off

Enables verbose console logging for debugging.
Does not affect functionality.

---

### run integrity test

Runs a self-check against internal invariants.

This is meant for extension developers, not end users.
It resets the filesystem during the test.

---

## Trash System

* Deleted entries are moved into `/.Trash/`
* Trash names are timestamp-prefixed
* Deleting from trash is permanent
* Trash can be emptied via “clear trash”

This mirrors desktop OS behavior closely.

---

## RAM Disk Details

* Path prefix: `/RAM/`
* Cleared on PROJECT_START
* Supports permissions, tags, size limits
* Cannot be deleted or renamed

RAM is ideal for caches, temp files, and runtime data.

---

## Error Handling Philosophy

RubyFS never throws.
It reports errors via:

* `last error`
* Silent failures in reporters
* Permission-based invisibility

This matches Scratch’s “fail soft” philosophy and keeps projects from crashing.

---

## Final Notes

RubyFS is intentionally strict about:

* Path correctness
* Permission boundaries
* Directory vs file semantics

If you treat it like a toy filesystem, it will surprise you.
If you treat it like a real one, it will behave exactly how you expect.

This is one of those extensions where the power comes from discipline, not convenience.
