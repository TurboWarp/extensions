import * as pathUtil from "node:path";
import ts from "typescript";

/**
 * @fileoverview Transpiles TypeScript to JavaScript.
 */

const tsconfigPath = pathUtil.join(import.meta.dirname, "../tsconfig.json");

/**
 * @type {import("typescript").CompilerOptions | null}
 */
let cachedBaseOptions = null;

/**
 * @returns {import("typescript").CompilerOptions}
 */
const getBaseCompilerOptions = () => {
  if (!cachedBaseOptions) {
    const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
    if (configFile.error) {
      throw new Error(
        ts.flattenDiagnosticMessageText(configFile.error.messageText, "\n")
      );
    }
    const parsed = ts.parseJsonConfigFileContent(
      configFile.config,
      ts.sys,
      pathUtil.dirname(tsconfigPath)
    );
    cachedBaseOptions = parsed.options;
  }
  return cachedBaseOptions;
};

/**
 * Transpile a TypeScript extension to JavaScript. Does not enforce any sort of type checking.
 * @param {string} tsCode TypeScript code
 * @param {string} slug extension slug
 * @param {boolean} sourceMap true to generate source map
 * @returns {{jsCode: string, sourcemap: string|null}}
 */
const compileTypeScript = (tsCode, slug, sourceMap) => {
  const result = ts.transpileModule(tsCode, {
    // used in the generated source map
    fileName: `${slug}.ts`,
    compilerOptions: {
      ...getBaseCompilerOptions(),
      // Our normal `tsc` is checking only - but here we want output
      noEmit: false,
      sourceMap,
    },
  });
  return {
    jsCode: result.outputText,
    sourceMap: result.sourceMapText ?? null,
  };
};

export default compileTypeScript;
