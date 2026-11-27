import { stripTypeScriptTypes } from "node:module";

/**
 * @fileoverview Transpiles TypeScript to JavaScript.
 */

/**
 * @param {string} tsCode TypeScript code
 * @returns {string} JavaScript code
 */
const transpileTypeScript = (tsCode) =>
  stripTypeScriptTypes(tsCode, { mode: "strip" });

export default transpileTypeScript;
