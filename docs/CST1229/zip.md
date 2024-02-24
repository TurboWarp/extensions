# Zip

The Zip extension allows you to read, create and edit .zip format files, including Scratch project and sprite files (.sb3, .sprite3). 

## Paths

Most blocks in this extension work with a path format:

 - The path is relative to the current directory by default
 - Directories (folders) and the filename are separated by slashes, like `folder1/folder2/file.txt`
 - `..` goes to the parent directory, like `../file.txt`
 - `.` goes to the current directory, like `./file.txt`
 - A `/` at the very start goes to the root directory, like `/file.txt`
 - A `/` at the end denotes a directory, like `folder/`
 - Multiple slashes in a row or trying to go above the root directory will result in an error (usually the block doing nothing or returning the empty value)

## Archive management blocks

Blocks for creating and saving the current archive. Only one archive can be open at a time. 

---

```scratch
create empty archive :: #a49a3a
```
Creates and opens an empty archive with nothing in it. 

---

```scratch
open zip from (URL v) [https://extensions.turbowarp.org] :: #a49a3a
```
 Opens a .zip (or .sb3 or .sprite3...) file.

The type can be one of the following:

 - **URL**: A URL, which can be either a web URL or data: URL. Recommended.
 - **base64**: A base64 string without the data URL header.
 - **hex**: A sequence of hexadecimal bytes (like `101A1B1C`), without a separator.
 - **binary**: A sequence of binary bytes (like `000000010010101001101011`), without a separator.
 - **string**: Plain text. **Not recommended!** Text encoding behavior will likely break it, as it's a binary file.

If the file is not of zip format (e.g RAR or 7z) or is password-protected, it won't be opened. Make sure to check if it loaded successfully with the archive `is open?` block. 

---

```scratch
(output zip type (data: URI v) compression level (6 v) :: #a49a3a)
```
Save the zip data into a string, which can be saved with e.g the Files extension.

The type can be one of the following:

 - **data**: URL: A base64-encoded data URL. Recommended.
 - **base64**: A base64 string without the data URL header.
 - **hex**: A sequence of hexadecimal bytes (like `101A1B1C`), without a separator.
 - **binary**: A sequence of binary bytes (like `000000010010101001101011`), without a separator.
 - **string**: Plain text. **Not recommended!** Text encoding behavior will likely break it, as it's a binary file.

The compression level decides how much the zip is compressed.
Lower compression levels will result in a bigger file, but are faster to create. Usually, high compression levels provide diminishing returns (lesser gains the higher you go) with much slower speeds.

A compression level of 0 (no compression) is the fastest, but will often result in a very big file. 

---

```scratch
close archive :: #a49a3a
```
Closes the archive. Use after you're done working with it.

---

```scratch
<archive is open? :: #a49a3a>
```
Returns true if an archive is open.

## File blocks

Blocks for working with files (and blocks that are general to both files and folders/directories.) 

---

```scratch
<folder [folder/] exists? :: #a49a3a>
```
Returns if a file or directory exists or not. The slash at the end matters! If a directory named `folder` exists, `[folder] exists?` will return false, but `[folder/] exists?` will return true.

---

```scratch
write file [new file.txt] content [Hello, world?] type (text v) :: #a49a3a
```
Writes content to a file, creating the file if it doesn't exist and replacing its existing data if it does.

The type can be one of the following:

 - **text**: Plain text.
 - **URL**: A URL, which can be either a web URL or data: URL. Best for binary data (like other zip files).
 - **base64**: A base64 string without the data URL header.
 - **hex**: A sequence of hexadecimal bytes (like `101A1B1C`), without a separator.
 - **binary**: A sequence of binary bytes (like `000000010010101001101011`), without a separator.

---

```scratch
rename [hello.txt] to [hello renamed.txt] :: #a49a3a
```
Renames a file or directory to another name. If the target file already exists, it will be overwritten. The current directory will also be updated. This block can also be used to move files to a different directory. 

---

```scratch
delete [hello.txt] :: #a49a3a
```

Deletes a file or directory (including everything in it).

If the current directory is in that directory, it will be set to the closest existing parent directory. 

---

```scratch
(file [hello.txt] as (text v) :: #a49a3a)
```
Get the contents of a file.

The type can be one of the following:

 - **text**: Plain text.
 - **data**: URL: A base64-encoded data URL. Best for binary data (like other zip files).
 - **base64**: A base64 string without the data URL header.
 - **hex**: A sequence of hexadecimal bytes (like `101A1B1C`), without a separator.
 - **binary**: A sequence of binary bytes (like `000000010010101001101011`), without a separator.

## File info blocks

Blocks for getting and setting additional information on a file.

---

```scratch
set (modified days since 2000 v) of [folder/dango.png] to [0] :: #a49a3a
```
Set additional info on a file or directory. 

Available options:

 - **modified days since 2000**: The modification date of the file, as days since 2000.
 - **unix modified timestamp**: The modification date of the file, as a Unix timestamp (milliseconds since 1970). Useful when combined with e.g the Time extension.
 - **comment**: A comment on the file. Can be any text. Some programs may show this as metadata.

---

```scratch
((name v) of [folder/dango.png] :: #a49a3a)
```
 Get additional info on a file or directory.

Available options:

 - **name**: Just the name of this file (without the directories it's in). For example, the name of `/folder1/folder2/dango.png` would be `dango.png`.
 - **path**: The full absolute path of this file (its name and any directories it's in).
 - **folder**: Just the folders this file is in (without its filename). For example, the folder of `/folder1/folder2/dango.png` would be `/folder1/folder2/`.
 - **modification date**: A human-readable version of the file's modification date. The output of this depends on the browser's language and possibly other factors.
 - **long modification date**: A longer human-readable version of the file's modification date. The output of this depends on the browser's language and possibly other factors.
 - **modified days since 2000**: The modification date of the file, as days since 2000.
 - **unix modified timestamp**: The modification date of the file, as a Unix timestamp (milliseconds since 1970). Useful when combined with e.g the Time extension.
 - **comment**: A comment on the file. Can be any text. Some programs may show this as metadata.

## Directory blocks

Blocks that deal with directories and the current directory.

---

```scratch
create directory [new folder] :: #a49a3a
```
Creates a directory with a name. This can create multiple directories at once (by having multiple directores in the path, like `/new folder1/new folder2/new folder3/`). 

---

```scratch
go to directory [folder] :: #a49a3a
```
Moves the current directory (the default origin of most file operations) to the specified directory. If it doesn't exist, this block will do nothing. Use `..` to go to the previous (parent) directory, and `/` to go to the root. 

---

```scratch
(contents of directory [.] :: #a49a3a)
```
Returns a list of files in a directory, as JSON (which you can parse with the JSON extension). 

---

```scratch
(current directory path :: #a49a3a)
```
Returns the absolute path to the current directory. 

## Other blocks

Miscellaneous stuff. 

---

```scratch
set archive comment to [any text] :: #a49a3a
```
Sets the archive's comment to some text. Just like file comments, this is saved and may be displayed as metadata by some programs. 

---

```scratch
(archive comment :: #a49a3a)
```
Returns the archive's comment. 

---

```scratch
(path [../folder3/] from [/folder/folder2] :: #a49a3a)
```
Returns an absolute path from an origin path and a target path. Does not depend on the archive, so it works without one open. This is mostly a utility used internally, but it might be useful for users too.
