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

 - You agree to make the source code available under [the MIT License](LICENSE)
 - No `eval()`, `new Function()`, remote scripts, or similar arbitrary JS/CSS/HTML/etc.

Just send a pull request adding an `extension.js` file with your extension's source code.

## Updates to extensions

When updating extensions, you MUST retain compatibility with projects made with older versions of the extension. There are no exception to this rule. Specifically, this means:

 - You MUST NOT change the extension ID
 - You MUST NOT change or remove block IDs
 - You MUST NOT change argument names
 - You MUST NOT change block behavior in a way that would break projects
