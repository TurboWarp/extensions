# File System Access API
Here is documentation for the extension "File System Access API"

```scratch
Request file picker permission:: #1565c0
\/\/ [Requests user to allow opening the file picker.]:: #ffc107

Request folder picker permission:: #1565c0
\/\/ [Requests user to allow opening the folder picker.]::#ffc107

\/\/(Check permissions::#1565c0)::#ffc107//You can only have one permission at a time.
\/\/[Can be "Files", "Folders", or "None".]::#ffc107

//Single File

Open a file starting in (desktop v) with slot (Slot 1 v)::#1565c0//Requires user interaction
\/\/[Open a file of the user's choice in Slot 1 of 5.]::#ffc107

\/\/<Access denied?::#1565c0>::#ffc107
\/\/[Did file opening fail?]::#ffc107

\/\/<Is (Slot 1 v) occupied?::#1565c0>::#ffc107
\/\/[Is there an open file in the slot?]::#ffc107

\/\/(Read file (Slot 1) using (stream v))
\/\/[Read the open file in specified slot.]

\/\/(Get information JSON for (Slot 1 v)::#1565c0)::#ffc107
\/\/[Returns a JSON object with file metadata.]::#ffc107

Write string () to open file in (Slot 1 v)::#1565c0
\/\/[Overwrites the contents of the file. Takes normal text.]::#ffc107

Empty slot (Slot 1 v)::#1565c0
\/\/[Clears out the slot for more files.]::#ffc107

//Folders

Open a Directory starting in (desktop v)::#1565c0//Requires user interaction
\/\/[Open a folder of the user's choice.]::#ffc107

\/\/<Is folder open?::#1565c0>::#ffc107
\/\/[Is a folder open?]::#ffc107

\/\/(Folder contents JSON::#1565c0)::#ffc107
\/\/[Contents of the current folder.]::#ffc107

\/\/(Read file path () using (stream v)::#1565c0)::#ffc107
\/\/[Reads a file, treat as case sensitive.]::#ffc107

Write () to file path ()::#1565c0
\/\/[Writes data to a file, treat as case sensitive.]::#ffc107

(Create v) (File v) with path ()::#1565c0//Delete Folder deletes recusively! Be careful when using it.
\/\/[Creates/Deletes a File/Folder, treat as case sensitive.]::#ffc107
```

Please note:
    Folders return data very differently compared to files!
    Avoid using folders named ".files".

Example folder return:
```json
{
  ".git": {
    "branches": {},
    "files": [ //Notice how this lists the files?
      {
        "type": "unknown",
        "name": "description",
        "size": 73,
        "lastModified": 1719604853330
      },
      {
        "type": "unknown",
        "name": "packed-refs",
        "size": 352,
        "lastModified": 1719604853860
      },
      {
        "type": "unknown",
        "name": "HEAD",
        "size": 23,
        "lastModified": 1719604853860
      },
      {
        "type": "unknown",
        "name": "config",
        "size": 258,
        "lastModified": 1719604853860
      },
      {
        "type": "unknown",
        "name": "index",
        "size": 2820,
        "lastModified": 1719604853863
      }
    ],
  }
}
```