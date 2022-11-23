# Contributing

We are currently in transitionary period. Follow https://github.com/TurboWarp/scratch-gui/issues/633 for updates.

Before submitting new extensions or changes to extensions, please read:

 - https://docs.turbowarp.org/development/custom-extensions
 - https://docs.turbowarp.org/development/unsandboxed-extensions

We're still figuring out how local development will work.

## New extensions

While you can host your custom extensions on any website, submitting them to extensions.turbowarp.org has several advantages:

 - The extension will run unsandboxed, so running blocks from your extension can be instant instead of having a forced 1-frame delay
 - The extension can be loaded automatically, without a prompt
 - Improved discoverability

We accept almost any extensions that follow these guidelines:

 - You agree to make the source code available under an open source license, preferably [the MIT License](licenses/MIT.txt). For this to be legally possible, either you must have written the entire extension on your own or whoever wrote it has given you permission to use it under an open source license.
   - If the license is not MIT, leave a comment at the top of each file indicating its license.
   - We want to avoid copyleft licenses such as the GPL because the copyleft clause likely spreads to projects created using the extension, and we feel that is too far. LGPL, however, is probably okay.
 - No `eval()`, `new Function()`, remote scripts, or similar arbitrary JS/CSS/HTML/etc.

Just send a pull request adding an `extension.js` file with your extension's source code.

## Updates to extensions

When updating extensions, you MUST retain compatibility with projects made with older versions of the extension. There are no exception to this rule. Specifically, this means:

 - You MUST NOT change the extension ID
 - You MUST NOT change or remove block IDs
 - You MUST NOT change argument names
 - You MUST NOT change block behavior in a way that would break projects
