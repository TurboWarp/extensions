import pathUtil from "node:path";
import ts from "typescript";
import { createAnnotation, getChangedFiles, isCI } from "./ci-interop.js";

/**
 * @fileoverview Generates CI annotations for type checking.
 * JavaScript files are warn-only; TypeScript are hard errors.
 */

const check = async () => {
  const rootDir = pathUtil.join(import.meta.dirname, "..");

  const changedFiles = Array.from(await getChangedFiles()).sort();
  const changedFilesAbsolute = changedFiles.map((f) =>
    pathUtil.join(rootDir, f)
  );

  if (isCI()) {
    console.log(
      `(ci-only) Checking these files for type warnings:`
    );
    console.log(Array.from(changedFiles).sort().join("\n") || "(none)");
  }
  console.log("");

  const diagnostics = [];
  for (const [configName, isBlocker] of [
    ["tsconfig/tsconfig.ts.json", true],
    ["tsconfig/tsconfig.js.json", false],
  ]) {
    if (!isBlocker && !isCI()) {
      continue;
    }

    const tsconfigPath = pathUtil.join(rootDir, configName);
    const commandLine = ts.getParsedCommandLineOfConfigFile(
      tsconfigPath,
      {},
      ts.sys
    );

    const program = ts.createProgram({
      rootNames: commandLine.fileNames,
      options: commandLine.options,
    });
    const emitted = program.emit();

    for (const diagnostic of [
      ...commandLine.errors,
      ...ts.getPreEmitDiagnostics(program),
      ...emitted.diagnostics,
    ]) {
      diagnostics.push({ diagnostic, isBlocker, tsconfigPath });
    }
  }

  /** @type {ts.FormatDiagnosticsHost} */
  const formatHost = {
    getCurrentDirectory: () => rootDir,
    getCanonicalFileName: (fileName) => fileName,
    getNewLine: () => "\n",
  };

  let numWarnings = 0;
  let numErrors = 0;

  for (const { diagnostic, isBlocker, tsconfigPath } of diagnostics) {
    if (
      !isBlocker &&
      diagnostic.file &&
      !changedFilesAbsolute.includes(diagnostic.file.fileName)
    ) {
      // Warning in a file not touched by the PR: ignore
      continue;
    }

    if (isBlocker) {
      numErrors++;
    } else {
      numWarnings++;
    }

    if (!isCI()) {
      const humanDiagnostic = {
        ...diagnostic,
        category: isBlocker
          ? ts.DiagnosticCategory.Error
          : ts.DiagnosticCategory.Warning,
      };
      const format = process.stdout.isTTY
        ? ts.formatDiagnosticsWithColorAndContext
        : ts.formatDiagnostics;
      console.log(format([humanDiagnostic], formatHost));
      continue;
    }

    // Diagnostics such as tsconfig errors may not be attached to any file
    const position = {};
    if (diagnostic.file && diagnostic.start !== undefined) {
      const startPosition = ts.getLineAndCharacterOfPosition(
        diagnostic.file,
        diagnostic.start
      );
      const endPosition = ts.getLineAndCharacterOfPosition(
        diagnostic.file,
        diagnostic.start + (diagnostic.length ?? 0)
      );
      position.line = startPosition.line + 1;
      position.col = startPosition.character + 1;
      position.endLine = endPosition.line + 1;
      position.endCol = endPosition.character + 1;
    }

    // Won't be the most readable, but it's probably fine.
    const flattened = ts.flattenDiagnosticMessageText(
      diagnostic.messageText,
      " ",
      0
    );

    createAnnotation({
      type: isBlocker ? "error" : "warning",
      file: diagnostic.file ? diagnostic.file.fileName : tsconfigPath,
      title: isBlocker
        ? "Type error - must be fixed"
        : "Type warning - may indicate a bug - ignore if no bug",
      message: flattened,
      ...position,
    });
  }

  console.log(`Errors: ${numErrors}`);

  if (isCI()) {
    console.log(`Warnings in changed files: ${numWarnings}`);
    console.log(`Total errors + warnings in all files: ${diagnostics.length}`);
  }

  return numErrors === 0;
};

check().then((success) => {
  process.exit(success ? 0 : 1);
});
