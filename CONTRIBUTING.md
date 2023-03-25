# Contributing extensions

Before you submit extensions, please read the NEW custom extension tutorial in full:

 - https://docs.turbowarp.org/development/extensions/introduction

Please pay special attention to:

 - Unsandboxed extensions: https://docs.turbowarp.org/development/extensions/unsandboxed
 - Maintaining backward compatibility: https://docs.turbowarp.org/development/extensions/compatibility
 - A better development server: https://docs.turbowarp.org/development/extensions/better-development-server

Pull requests that don't follow the guidelines outlined in these documents tend to take much longer to be reviewed and merged.

## Local development server

We recommend using our local development server:

```bash
# Clone the repository
git clone https://github.com/TurboWarp/extensions.git
cd extensions

# Install dependencies
npm ci

# Start development server
npm run dev
```

This starts an HTTP server on [http://localhost:8000/](http://localhost:8000/) in development mode which adds a couple of extra tools to the homepage.

After installing npm dependencies, TypeScript aware editors such as Visual Studio Code will give you smart autocomplete suggestions for most Scratch and extension APIs based on [@turbowarp/types](https://github.com/TurboWarp/types) and [@turbowarp/types-tw](https://github.com/TurboWarp/types-tw). Note that these types are not perfect; some methods are missing or incorrect. Please report any issues you find.

If you encounter a TypeScript error, as long as you understand the error, feel free to add `// @ts-ignore`, `// @ts-expect-error`, or just ignore the error entirely. We currently do not require extensions to pass type checking.

## Alternative development server

If for some reason you can't set up our local development server, you can start any other HTTP server in the `extensions` folder. You won't get some of the nice things our server has, but it may be good enough. If you have Python 3 installed this is very simple:

```bash
cd extensions
python3 -m http.server
```

Note that browsers tend to aggressively cache JavaScript files that don't opt out of caching as our development server does, so you may have to do hard reloads to ensure that changes to your scripts are applied.

## Types of extensions we accept

We strive to be tolerant of accepting almost any extension, including one-use novelty extensions or extensions that are similar to ones that already exist.

Extensions end up in one of these categories depending on various qualities:

 - Extensions that are in the repository, but not listed on the website
 - Extensions that are listed on the website
 - Extensions that are listed in the editor's builtin extension library

## Writing extensions

Extension source code goes in the `extensions` folder. For example, an extension placed at `extensions/hello-world.js` would be accessible at [http://localhost:8000/hello-world.js](http://localhost:8000/hello-world.js).

New extensions should be added in a user folder. You can name your folder your GitHub username, your Scratch username, or something else. For example, if your GitHub username is "TestMuffin", you could make a `TestMuffin` folder inside of the `extensions` folder and put your extensions inside there. You could then access a file placed at `extensions/TestMuffin/hello-world.js` at [http://localhost:8000/TestMuffin/hello-world.js](http://localhost:8000/TestMuffin/hello-world.js).

Static resources go in the `website` folder. This is where some example resources used by extensions such as fetch are placed. It works similarly to the `extensions` folder.

Extensions must not use `eval()`, `new Function()`, untrusted `<script>` or `<iframe>` tags, or similar arbitrary JS/CSS/HTML/etc.

Extensions must be self-contained. All libraries and hardcoded resources it needs should be embedded into the extension's JavaScript file. If you include minified code, please link where to find the unminified code.

To add an extension to the website homepage, modify `website/index.ejs`. Copy one of the existing extensions. New extensions should usually be added to the end of the list.

To add an image for your extension on the homepage, put a file in the `images` folder with the same name and directory structure (but a different file extension) as the extension's source code. The homepage generator will automatically update the image if you did it correctly. Images will be displayed in a 2:1 aspect ratio. SVG (preferred), PNG, or JPG are accepted. PNG or JPG should be 600x300 in resolution. Please add proper attribution to `images/README.md` for *any* resources that were not made by you.

## License

**We are not lawyers. This section should not be interpreted as legal advice.**

The source code of the extension and any libraries it uses must be available under a permissive open source license that is compatible with the [GNU General Public License version 3](licenses/GPL-3.0.txt) so that we can include it in the desktop app. If unsure, use the [MIT License](licenses/MIT.txt). For this to be legally possible, either you must have written the entire extension yourself or have permission to use all of its components under an open source license.

If you use a license other than MIT, leave a comment at the top of each file indicating its license. For example, if you prefer to use Apache 2.0, add a comment like the one below. Extensions using the default MIT License do not need to include this type of comment, but you can include one if you want.

```js
/*!
 * Copyright 2023 Your Name Here
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

Please update the copyright year and name appropriately. Pseudonyms are accepted. Add a copy of the full plain text license in the `licenses` folder if a copy doesn't already exist. You should use `/*!` instead of `/*` for license comments so that JavaScript minifiers won't remove it.

We don't want extension code to use the GPLv3 or LGPLv3 licenses exclusively. Our non-lawyer understanding suggests that the copyleft could extend to projects that use the extension and to any packaged projects, neither of which we want.

Extension images in the [images](images) directory are instead licensed under the [GNU General Public version 3](licenses/GPL-3.0.txt).

Please avoid code and image assets that are under these licenses as they are not compatible with the GPLv3:

 - Creative Commons Attribution-ShareAlike licenses prior to version 4.0
   - User-generated content on the Scratch website uses version 2.0 of this license.
   - StackOverflow uses [different versions of this license depending on what when the post was made](https://stackoverflow.com/help/licensing).
 - Creative Commons Attribution-NoDerivs and similar "no derivatives" licenses
 - Creative Commons Attribution-NonCommercial and similar "non commercial" licenses
 - This list is non-comprehensive
 - More information: https://www.gnu.org/licenses/license-list.en.html

## Suggested code style

Our preferred code style is:

 - Indent with 2 spaces
 - Use semicolons
 - We don't care which type of quotes you use

## Automated linting

We use ESLint to automatically find problems in pull requests. To run our linting rules locally:

```bash
npm run lint
```

To run ESLint's automatic fixes for common style issues:

```bash
npm run fix
```

Our linting is not intended to be overbearing -- we just want to prevent common mistakes and encourage writing readable code. If one of the rules is getting in your way, feel free to just disable it for that line or section.

When including third-party code, especially minified code, you may use [`/* eslint-disable*/` and `/* eslint-enable */`](https://eslint.org/docs/latest/user-guide/configuring/rules#disabling-rules) markers to disable linting for that section.

## Updating extensions

Please make note of everything on this page: https://docs.turbowarp.org/development/extensions/compatibility

When editing extensions made by other people, please ping the person who owns its user folder, if it's in one.

If you need to break compatibility, you can submit a "v2" version of the extension and leave the original unchanged.
