# Contributing

Before submitting new extensions or changes to extensions, please read:

 - About custom extensions in general: https://docs.turbowarp.org/development/custom-extensions
 - About unsandboxed extensions: https://docs.turbowarp.org/development/unsandboxed-extensions

## Local development server

```bash
# Clone the repository
git clone https://github.com/TurboWarp/extensions.git
cd extensions

# Install dependencies
npm ci

# Start development server
npm run dev
```

This starts an HTTP server on http://localhost:8000/ which is one of the domains that TurboWarp treats as unsandboxed.

After installing npm dependencies, TypeScript aware editors such as Visual Studio Code will give you smart autocomplete suggestions for most Scratch APIs based on [@turbowarp/types](https://github.com/TurboWarp/types). Note that these types are not complete and are currently missing anything TurboWarp specific.

Chances are you will encounter TypeScript errors. In general, as long as you understand the error, feel free to add `// @ts-ignore`, `// @ts-expect-error`, or just ignore the error entirely.

## Alternative

If for some reason you can't set up our local development server, you can start any other HTTP server in the `extensions` folder. You won't get some of the nice things our server has, but it will be good enough. If you have Python 3 installed this is very simple:

```bash
cd extensions
python3 -m http.server
```

Note that browsers tend to aggressively cache JavaScript files, so you may have to do hard reloads to ensure that changes to your scripts are applied if you don't use our development server.

## Writing extensions

The extension's source code goes in the `extensions` folder. If you name the file `extension.js`, the URL to load is http://localhost:8000/extension.js. If you use our development server, visit the website and there will be a section with links to load the most recently modified extensions.

To add an extension to the website, see `website/index.ejs`. Copy one of the existing sections.

To add an image, add it to the `images` folder with the same filename (but different extension) as the extension's source code. If you set up `website/index.ejs` with the template correctly, the image will automatically update. See existing extensions for examples. Images will be displayed in 2:1 aspect ratio. SVG (preferred), PNG, or JPG are accepted. PNG or JPG should be 600x300 in resolution. If the image includes assets not made by you, make sure to add attribution to `images/README.md`.

## Extension Guidelines

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

And add a copy of the full license in the `licenses` folder if one isn't already in there. Using `/*!` instead of just `/*` for the license comment prevents JavaScript minifiers from removing the comment.

The license must be compatible with the GNU General Public License v3 so we can include it in the desktop app. However, we don't want extensions to use the GPLv3 exclusively as our non-lawyer understanding of the copyleft clause suggests that it would spread to any projects that use the extension which isn't what we want. LGPLv3, however, is acceptable. (Do not interpret this paragraph as legal advice.)

Extensions must not use `eval()`, `new Function()`, untrusted `<script>` or `<iframe>` tags, or similar arbitrary JS/CSS/HTML/etc. It's best if extensions are entirely self-contained in one file.

## Code style

Our preferred code style is:

 - Indent with 2 spaces
 - Single quotes
 - Use semicolons

These guidelines will (in the future) be automatically enforced by eslint when pull requests are made.

When including third-party or vendored code, use [`/* eslint-disable*/` and `/* eslint-enable */`](https://eslint.org/docs/latest/user-guide/configuring/rules#disabling-rules) markers.

## Updates to extensions

When updating extensions, you MUST retain compatibility with projects made with older versions of the extension. There are no exception to this rule. Specifically, this means:

 - You MUST NOT change the extension ID
 - You MUST NOT change or remove block IDs
 - You MUST NOT change argument names
 - You MUST NOT change block behavior in a way that would break projects
