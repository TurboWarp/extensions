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

  console.log(`${changedFiles.length} changed files:`);
  console.log(Array.from(changedFiles).sort().join("\n"));
  console.log("");

  const tsconfigPath = pathUtil.join(rootDir, "tsconfig.json");
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

  const diagnostics = [
    ...ts.getPreEmitDiagnostics(program),
    ...emitted.diagnostics,
  ];

  let numWarnings = 0;
  let numErrors = 0;

  for (const diagnostic of diagnostics) {
    const isBlocker = diagnostic.file.fileName.endsWith(".ts");

    if (
      !isBlocker &&
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

    const startPosition = ts.getLineAndCharacterOfPosition(
      diagnostic.file,
      diagnostic.start
    );
    const endPosition = ts.getLineAndCharacterOfPosition(
      diagnostic.file,
      diagnostic.start
    );
    // Won't be the most readable, but it's probably fine.
    const flattened = ts.flattenDiagnosticMessageText(
      diagnostic.messageText,
      " ",
      0
    );

    createAnnotation({
      type: isBlocker ? "error" : "warning",
      file: diagnostic.file.fileName,
      title: isBlocker
        ? "Type error - must be fixed"
        : "Type warning - may indicate a bug - ignore if no bug",
      message: flattened,
      line: startPosition.line + 1,
      col: startPosition.character + 1,
      endLine: endPosition.line + 1,
      endCol: endPosition.character + 1,
    });
  }

  console.log(`Errors: ${numErrors}`);
  console.log(`Warnings in changed files: ${numWarnings}`);
  console.log(`Total errors+warnings in all files: ${diagnostics.length}`);

  return numErrors === 0;
};

if (isCI()) {
  check().then((success) => {
    process.exit(success ? 0 : 1);
  });
} else {
  console.error(
    "This script is only intended to be used in CI. For development, use normal TypeScript CLI instead."
  );
  process.exit(1);
}
