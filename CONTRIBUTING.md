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

### Guidelines

The source code of the extension and any libraries it uses must be available under an open source license that is compatible with the GNU General Public License v3. If unsure, use [the MIT License](licenses/MIT.txt). That's what most extensions here use. For this to be legally possible, either you must have written the entire extension yourself or obtained permission to use it under an open source license.

If the license is not MIT, leave a comment at the top of each file indicating its license, for example if it uses the Apache 2.0 license instead:

```js
/*!
 * Copyright 20XX Name Here
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
```

Using `/*!` instead of just `/*` indicates to JavaScript minifiers that this comment contains license information and shouldn't be removed.

The license must be compatible with the GNU General Public License v3 so we can include it in the desktop app. However, we don't want extensions to use the GPLv3 or AGPLv3 exclusively as our non-lawyer understanding of the copyleft clause indicates that it spreads to any projects that use the extension, which isn't what we want. LGPLv3 is acceptable. (if you don't know what this means then you can probably ignore it)

Extensions also must not use `eval()`, `new Function()`, untrusted `<script>` or `<iframe>` tags, or similar arbitrary JS/CSS/HTML/etc.

Just send a pull request adding an `extension.js` file with your extension's source code.

## Updates to extensions

When updating extensions, you MUST retain compatibility with projects made with older versions of the extension. There are no exception to this rule. Specifically, this means:

 - You MUST NOT change the extension ID
 - You MUST NOT change or remove block IDs
 - You MUST NOT change argument names
 - You MUST NOT change block behavior in a way that would break projects
