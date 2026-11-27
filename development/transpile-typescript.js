import { stripTypeScriptTypes } from "node:module";

/**
 * @fileoverview Transpiles TypeScript to JavaScript.
 */

/**
 * @param {string} tsCode TypeScript code
 * @param {string} slug extension slug, used in error messages
 * @returns {string} JavaScript code
 */
const transpileTypeScript = (tsCode, slug) => {
  try {
    return stripTypeScriptTypes(tsCode, { mode: "strip" });
  } catch (e) {
    throw new Error(`${slug}.ts: ${e.message}`, { cause: e });
  }
};

export default transpileTypeScript;
