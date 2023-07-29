# Contributing extensions

Before you submit extensions, please read the custom extension tutorial **in full**:

 - https://docs.turbowarp.org/development/extensions/introduction

Please pay special attention to:

 - Unsandboxed extensions: https://docs.turbowarp.org/development/extensions/unsandboxed
 - Maintaining backward compatibility: https://docs.turbowarp.org/development/extensions/compatibility
 - A better development server: https://docs.turbowarp.org/development/extensions/better-development-server
 - Maintaining compatibility: https://docs.turbowarp.org/development/extensions/compatibility

Pull requests that don't follow the guidelines outlined in these documents will take *much* longer to be reviewed and merged.

## Acceptance criteria

Unfortunately we have to limit the types of extensions we can accept. Strictly, nothing is banned, but the following are *highly* discouraged:

 - Broad "Utilities" extensions (break them up into multiple extensions, see https://github.com/TurboWarp/extensions/issues/674)
 - Joke extensions (they aren't funny when they cause us to get bug reports)
 - Extensions that are very similar to existing ones (consider modifying the existing one instead)
 - Novelties or one-use personal extensions (load the extension as a local file instead)

## Important context

Every extension that gets accepted is more code that we will be expected to maintain indefinitely, even if you disappear. Remember: broken extensions mean that real projects made by real people are now broken. If the renderer is rewritten one day, we will have to ensure that extensions like Clipping and blending, RGB channels, and Augmented Reality still work.

We're all volunteers who all have lives outside of Scratch extensions. Many have full time jobs or are full time students. We'll get to you as soon as we can, but please be patient.

## Writing extensions

Extension source code goes in the `extensions` folder. For example, an extension placed at `extensions/hello-world.js` would be accessible at [http://localhost:8000/hello-world.js](http://localhost:8000/hello-world.js).

New extensions should be added in a user folder. You can name your folder your GitHub username, your Scratch username, or anything else. If your username is `TestMuffin123`, you could use names like `TestMuffin123`, `TestMuffin` or `Muffin`. We're pretty lenient about this. Do note that this is just for organization -- other people are still allowed to edit your extension.

Static resources go in the `website` folder. This is where some example assets used by extensions such as fetch are placed.

Extensions must be self-contained. All libraries and hardcoded resources should be embedded into the extension's JavaScript file. If you include minified code, please link where to find the unminified code and include a copy of the license.

To add an extension to the website homepage, modify `website/index.ejs`. See the existing entries for a template to copy. Just place your extension wherever you want in the list; if we disagree then we will move it for you.

To add an image for your extension on the homepage, put a file in the `images` folder with the same name and directory structure (but a different file extension) as the extension's source code. For example, if your extension is located in `extensions/TestMuffin/fetch.js`, save the image as `images/TestMuffin/fetch.svg` or `images/TestMuffin/fetch.png`. The homepage generator will detect the image automatically. Images will be displayed in a 2:1 aspect ratio. SVG (preferred), PNG, or JPG are accepted. PNG or JPG should be 600x300 in resolution. Please add proper attribution to `images/README.md` for *any* resources that were not made by you.

## Banned APIs

(subject to change)

 - `eval()`
 - `new Function()`
 - untrusted `<script>`
 - untrusted `<iframe>`
 - other arbitrary JS/CSS/HTML evaluation

## Type checking

If you use our development server, TypeScript aware editors such as Visual Studio Code will give you smart autocomplete suggestions for most Scratch and extension APIs based on [@turbowarp/types](https://github.com/TurboWarp/types) and [@turbowarp/types-tw](https://github.com/TurboWarp/types-tw). Note that these types are not perfect; some methods are missing or incorrect. Please report any issues you find.

If you encounter a TypeScript error, as long as you understand the error, feel free to add `// @ts-ignore`, `// @ts-expect-error`, or just ignore the error entirely. We currently do not require extensions to pass type checking.

## License

**We are not lawyers. This section should not be interpreted as legal advice.**

The source code of the extension and any libraries it uses must be available under a permissive open source license that is compatible with the [GNU General Public License version 3](licenses/GPL-3.0.txt). This allows us to include it in TurboWarp Desktop and allows packaged projects to use your extension. If you're unsure, use our default: the [MIT License](licenses/MIT.txt). For this to be legally possible, either you must have written the entire extension yourself or have permission to use all of its components under a compatible open source license.

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

You **MUST** avoid using code or images under these licenses as they are not compatible with the GPLv3:

 - Creative Commons Attribution-ShareAlike licenses prior to version 4.0
   - User-generated content on the Scratch website [uses version 2.0](https://scratch.mit.edu/terms_of_use) of this license.
   - StackOverflow post contributed [before 2018-05-02 use older versions of this license](https://stackoverflow.com/help/licensing).
 - Creative Commons Attribution-NoDerivs and similar "no derivatives" licenses
 - Creative Commons Attribution-NonCommercial and similar "non commercial" licenses
 - This list is non-comprehensive
 - More information: https://www.gnu.org/licenses/license-list.en.html

## Code style

Our preferred code style is:

 - Indent with 2 spaces
 - Use semicolons
 - We don't care which type of quotes you use, just pick one and be consistent

Don't worry too much about this -- if we disagree we will change it ourselves.

## Linting

We use ESLint to automatically common problems in pull requests. To run our linting rules on your computer, run:

```bash
npm run lint
```

ESLint can automatically fix certain issues. You can run this with:

```bash
npm run fix
```

Our ESLint configuration separates between *warnings* and *errors*. They both cause big red error messages to appear on pull requests, but they are different:

 - Warnings are typically minor style issues. If you ignore these we will fix it ourselves. This usually takes 15 seconds to address.
 - Errors are actually problems. Please read and address all of them. Extensions with errors may take longer to review as your extension is unfinished.

You are allowed to [disable warnings or errors](https://eslint.org/docs/latest/use/configure/rules#disabling-rules) as needed, but only if actually required.

When including third-party code, especially minified code, you may use `/* eslint-disable*/` and `/* eslint-enable */` markers to disable linting for that entire section.
