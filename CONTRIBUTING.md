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

After installing npm dependencies, TypeScript aware editors such as Visual Studio Code will give you smart autocomplete suggestions for many Scratch and extension APIs based on [@turbowarp/types](https://github.com/TurboWarp/types). Note that these types are not complete and are currently missing anything TurboWarp specific.

Chances are you will encounter TypeScript errors. In general, as long as you understand the error, feel free to add `// @ts-ignore`, `// @ts-expect-error`, or just ignore the error entirely. We currently do not enforce TypeScript errors.

## Alternative development server

If for some reason you can't set up our local development server, you can start any other HTTP server in the `extensions` folder. You won't get some of the nice things our server has, but it may be good enough. If you have Python 3 installed this is very simple:

```bash
cd extensions
python3 -m http.server
```

Note that browsers tend to aggressively cache JavaScript files that don't opt out of caching as our development server does, so you may have to do hard reloads to ensure that changes to your scripts are applied.

## Types of extensions we accept

We strive to be tolerant of accepting almost any extension that:

 - Does not contain security bugs such as arbitrary code execution/XSS
 - Does not threaten the safety of our users

We are willing to accept one-use novelty extensions or extensions that are similar to ones that already exist. They just might not get listed on the website.

There are effectively three categories of extensions:

 - Extensions that are in the repository, but not listed on the website
 - Extensions that are listed on the website
 - Extensions that are listed in the editor's builtin extension library

Qualities such as uniqueness, quality, and bugginess may be factors in the decision of each extension's category.

## Writing extensions

Extension source code goes in the `extensions` folder. For example, an extension placed at `extensions/hello-world.js` would be accessible at [http://localhost:8000/hello-world.js](http://localhost:8000/hello-world.js).

We ask that new extensions be added in a user-specific folder. For example, if your GitHub username is "TestMuffin", you could make a `TestMuffin` folder inside of the `extensions` folder and put your extensions inside there. You could then access a file placed at `extensions/TestMuffin/hello-world.js` at [http://localhost:8000/TestMuffin/hello-world.js](http://localhost:8000/TestMuffin/hello-world.js). We're lenient on what you choose to name your folder -- it can be your GitHub username, Scratch username, or whatever you want it to be (within reason).

Static resources go in the `website` folder. This is where some example resources used by extensions such as fetch are placed. It works similarly to the `extensions` folder.

To add an extension to the website homepage, modify `website/index.ejs`. It should be easy to understand if you copy one of the existing extensions. New extensions should generally be added to the end of the list.

To add an image for your extension on the homepage, put a file in the `images` folder with the same name and directory structure (but a different file extension) as the extension's source code. The homepage generator will automatically update the image if you did it correctly. Images will be displayed in a 2:1 aspect ratio. SVG (preferred), PNG, or JPG are accepted. PNG or JPG should be 600x300 in resolution. Please add proper attribution to `images/README.md`.

## License

**We are not lawyers. This section should not be interpreted as legal advice.**

The source code of the extension and any libraries it uses must be available under an open source license that is compatible with the GNU General Public License v3 so that we can include it in the desktop app. If unsure, use [the MIT License](licenses/MIT.txt) as that's what most extensions here use. For this to be legally possible, either you must have written the entire extension yourself or have permission to use all of its components under an open source license.

If you use a different license than MIT, leave a comment at the top of each file indicating its license. For example, if it uses the Apache 2.0 license instead, add a comment like this:

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

Please update the copyright year and name appropriately. Pseudonyms are accepted.

Add a copy of the full plain text license in the `licenses` folder if one doesn't already exist. You should use `/*!` instead of `/*` for the license comment so that JavaScript minifiers will not remove it.

We don't want extension code to be GPLv3 exclusively as our non-lawyer understanding of the copyleft clause suggests that it would spread to any projects that use the extension. That isn't what we want.

Extensions must not use `eval()`, `new Function()`, untrusted `<script>` or `<iframe>` tags, or similar arbitrary JS/CSS/HTML/etc.

Extensions must be self-contained. All libraries and hardcoded resources it needs should be embedded into the extension's JavaScript file.

## Suggested code style

Our preferred code style is:

 - Indent with 2 spaces
 - Use semicolons
 - We don't care which type of quotes you use

If we dislike your style choices we will just fix it ourselves.

## Automated linting

We use ESLint. You can run our linting rules locally with:

```bash
npm run lint
```

And you can run ESLint's automatic fixes can fix many issues automatically by running:

```bash
npm run fix
```

The goal of our linting is to prevent common mistakes and ensure the code is *somewhat* cohesive. It is not intended to be overbearing. If one of the rules is getting in your way, feel free to just disable it for that line, section, etc.

When including third-party code, especially minified code, you may use [`/* eslint-disable*/` and `/* eslint-enable */`](https://eslint.org/docs/latest/user-guide/configuring/rules#disabling-rules) markers to disable linting for that section.

## Updating extensions

Please make note of everything on this page: https://docs.turbowarp.org/development/extensions/compatibility

When editing extensions made by other people, please ping the person who owns its user folder, if it's in one.

If you need to break compatibility, you can submit a "v2" version of the extension and leave the original unchanged.
