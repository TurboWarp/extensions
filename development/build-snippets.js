import fs from "node:fs";
import path from "node:path";

/**
 * @fileoverview Build snippets are short pieces of code that get injected into extensions
 * during production builds to implement certain features, such as the resource inlining
 * that happens when using Scratch.external.
 *
 * Unlike Scratch.external, these are all managed very manually in the build server code.
 * They're only for short snippets that are used across generated code. Not for general
 * use by extensions.
 */

// The variable where requirements can be accessed at runtime.
export const __internal = "__internal";

const snippetDir = path.join(import.meta.dirname, "../build-snippets/");

const SNIPPETS = {
  base85decode: fs.readFileSync(
    path.join(snippetDir, "base85decode.js"),
    "utf-8"
  ),
  fzstd: fs.readFileSync(path.join(snippetDir, "fzstd.js"), "utf-8"),
};

/**
 * @typedef {keyof SNIPPETS} SnippetName
 */

/**
 * @param {Set<SnippetName>} snippets
 * @returns {{prefix: string; suffix: string;}} JS code to insert at start and end of extension.
 */
const generateBuildSnippetJS = (snippets) => {
  if (snippets.size === 0) {
    return {
      prefix: "",
      suffix: "",
    };
  }

  // We want to keep line numbers somewhat in tact, so we put all the snippets at the end of the file and only
  // a very tiny stub near the start.
  const prefix = `/* snippet prefix */(function(){var ${__internal}={};${__internal}_setup();/* end snippet prefix */`;
  let suffix = `/* snippet suffix */function ${__internal}_setup() {`;
  for (const snippet of snippets) {
    suffix += `/* snippet ${snippet} */${SNIPPETS[snippet]}/* end snippet ${snippet} */`;
  }
  suffix += "}}({}));/* end snippet suffix */";

  return {
    prefix,
    suffix,
  };
};

export default generateBuildSnippetJS;
