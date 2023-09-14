# Contributing extensions

Before you submit extensions, please read the custom extension tutorial **in full**:

 - https://docs.turbowarp.org/development/extensions/introduction

Please pay special attention to:

 - Unsandboxed extensions: https://docs.turbowarp.org/development/extensions/unsandboxed
 - Maintaining backward compatibility: https://docs.turbowarp.org/development/extensions/compatibility
 - A better development server: https://docs.turbowarp.org/development/extensions/better-development-server

Read this document **in full** too. Pull requests that don't follow the guidelines will take *much* longer to be reviewed.

## Acceptance criteria

Strictly, nothing is banned, but the following are *highly* discouraged:

 - Broad "Utilities" extensions (break them up into multiple extensions, see https://github.com/TurboWarp/extensions/issues/674)
 - Extensions that are very similar to existing ones (consider modifying the existing one instead)
 - One-use personal extensions (load the extension as a local file instead)
 - Joke extensions (they aren't funny when they cause us to get bug reports)

Some extensions were added before these rules existed. That doesn't mean you will be exempted too.

## Important context

Every merged extension is more code that we will be expected to maintain indefinitely, even if you disappear. Remember: broken extensions mean that real projects by real people no longer work. If the renderer is rewritten one day, we will have to ensure that extensions like Clipping & Blending, RGB Channels, and Augmented Reality still work. That's not a small commitment.

We're all volunteers who all have lives outside of Scratch extensions. Many have full time jobs or are full time students. We'll get to you as soon as we can, so please be patient.

Every extension is also covered under [our bug bounty](https://github.com/TurboWarp/extensions/security/policy), so mindlessly merging things will have a direct impact on my wallet.

## On AI language models

**Generative AI language models like ChatGPT, Bing Chat, and Bard DO NOT know how to write proper extensions for TurboWarp.** Remember that the ChatGPT knowledge cutoff is in 2021 while our extension system did not exist until late 2022, thus it *literally can't know*. Pull requests submitting extensions that are made by AI (it's really obvious) will be closed as invalid.

## Writing extensions

Extension source code goes in the [`extensions`](extensions) folder. For example, an extension placed at `extensions/hello-world.js` would be accessible at [http://localhost:8000/hello-world.js](http://localhost:8000/hello-world.js) using our development server.

New extensions should be added in a user folder. You can name your folder anything you want; common choices are your GitHub username or your Scratch username. If your username is `TestMuffin123`, then `TestMuffin123`, `TestMuffin`, or even just `Muffin` would all be accepted -- we are very lenient about this. Do note that user folders are just for organization; other people are still allowed to edit your extension. Renaming your folder later is only allowed in very rare circumstances, so please get it right the first time.

Extensions must be self-contained. All libraries and hardcoded resources should be embedded into the extension's JavaScript file. If you include minified code, please link where to find the unminified code and include a copy of the original license.

## Website stuff

To add an extension to the homepage, you need to add metadata comments at the very start of the extension's JavaScript, and add the extension's path (without .js) to `extensions/extensions.json`. The order of that list determines the order of the library. Don't worry about putting it in the right spot, we'll move it if we disagree.

The header comments look like this:

```js
// Name: Example Extension
// ID: extensionid
// Description: Does a very cool thing. This must have punctuation at the end!
// By: GarboMuffin <https://scratch.mit.edu/users/GarboMuffin/>
// Original: TestMuffin
```

Remember, this has to be the *very first* thing in the JS file. `Name`, `Description`, and `ID` are required. Make sure that `ID` exactly matches what you return in `getInfo()`. You can have zero or more `By` and `Original`. Put credit links in `<angled brackets>` if you have one. It must point to a Scratch user profile. This metadata is parsed by a script to generate the website and extension library. It tries to be pretty loose, but don't deviate too far. You must use `//`, not `/* */`.

New extensions do not *need* images, but they are highly encouraged. Save the image in the `images` folder with the same folder name and file name (but different file extension) as the extension's source code. For example, if your extension is located in `extensions/TestMuffin/fetch.js`, save the image as `images/TestMuffin/fetch.svg` or `images/TestMuffin/fetch.png`. The homepage generator will detect it automatically. Images are displayed in a 2:1 aspect ratio. SVG (preferred), PNG, or JPG are accepted. PNG or JPG should be 600x300 in resolution. Please add proper attribution to `images/README.md` for *any* resources that were not made by you.

Most extensions shouldn't need external documentation -- it should be obvious what to do just by looking at the blocks. That said, some do need more explanation. Documentation is written in markdown and placed in the `docs` folder with a similar layout to images. For example, documentation for `extensions/TestMuffin/fetch.js` would be saved as `docs/TestMuffin/fetch.md`. Our version of markdown is slightly extended to allow rendering [scratchblocks](https://scratchblocks.github.io/). Just look at the existing documentation for syntax examples. It's not a perfect experience: block colors have to be manually copied, and icons aren't supported, but it's better than what we had before. Once you put your markdown there, you can set a `docsURI` like `https://extensions.turbowarp.org/TestMuffin/fetch`.

Static resources such as example resources used by extensions go in the `website` folder.

## Banned APIs

(subject to change)

 - `eval()`
 - `new Function()`
 - untrusted or remote `<script>` or `<iframe>`
 - other arbitrary JS/CSS/HTML evaluation

## License

**We are not lawyers. This is not legal advice.**

The source code of the extension and any libraries it uses must be available under a **permissive** open source license that is compatible with the [GNU General Public License version 3](licenses/GPL-3.0.txt). This allows us to include it in TurboWarp Desktop and allows the packager to include it in packaged projects. If you're unsure, use our default: the [MIT License](licenses/MIT.txt). For this to be legally possible, either you must have written the entire extension yourself or have permission to use all of its components under a compatible open source license.

If you use the default MIT license as we recommend, you don't need to add a comment (you can if you want to, though). If you wish to use a different license, leave a comment at the top of the file. For example, if you prefer Apache 2.0, add a comment like the one below.

```js
// (Remember: You don't need to include this if you just use the default license!)
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

Update the copyright year and name appropriately. Pseudonyms are accepted. Add a copy of the full plain text version of the license in the `licenses` folder if it isn't already in there. You should use `/*!` instead of `/*` for license comments so that JavaScript minifiers won't remove it.

Extension images in the [images](images) directory are instead licensed under the [GNU General Public version 3](licenses/GPL-3.0.txt).

## Banned licenses

You **MUST** avoid using any code or images under these licenses as we believe they are incompatible with the GPLv3:

 - Creative Commons Attribution-ShareAlike licenses prior to version 4.0
   - This includes user-generated content on the Scratch website which [uses version 2.0](https://scratch.mit.edu/terms_of_use) of this license.
   - This includes StackOverflow posts contributed before 2018-05-02 which [use several different versions](https://stackoverflow.com/help/licensing).
 - Creative Commons Attribution-NoDerivs and similar "no derivatives" licenses
 - Creative Commons Attribution-NonCommercial and similar "non commercial" licenses
 - This list is non-comprehensive
 - More information: https://www.gnu.org/licenses/license-list.en.html

We take licenses very seriously. License violations are one of the few things that can force us to break project compatibility.

## Type checking

If you use our development server, TypeScript aware editors such as Visual Studio Code will give you smart autocomplete suggestions for most Scratch and extension APIs based on [@turbowarp/types](https://github.com/TurboWarp/types) and [@turbowarp/types-tw](https://github.com/TurboWarp/types-tw). Note that these types are not perfect; some methods are missing or incorrect. Please report any issues you find.

If you encounter a TypeScript error, as long as you understand the error, feel free to add `// @ts-ignore`, `// @ts-expect-error`, or just ignore the error entirely. We currently do not require extensions to pass type checking.

## Linting, validation, and formatting

All pull requests are automatically checked by a combination of custom validation scripts, [ESLint](https://eslint.org/), and [Prettier](https://prettier.io/). Don't worry about passing these checks on the first attempt -- most don't. That's why we have these checks.

Our custom validation scripts do things like making sure you have the correct headers at the start of your extension and that the images are the right size. **Your extension must pass validation.** You can run them locally with:

```bash
npm run validate
```

ESLint detects common JavaScript errors such as referencing non-existant variables. **Your extension must pass linting.** You can run it locally with:

```bash
npm run lint
```

You are allowed to [disable ESLint warnings and errors](https://eslint.org/docs/latest/use/configure/rules#disabling-rules) as needed, but please only do so if actually required.

When including third-party code, especially minified code, you may use `/* eslint-disable*/` and `/* eslint-enable */` markers to disable linting for that entire section.

We use Prettier to ensure consistent code formatting. **Your extension does not need to pass format; we will fix it for you if linting and validation pass.** You can format your code automatically with:

```bash
npm run format
```

To just check formatting, use:

```bash
npm run check-format
```
