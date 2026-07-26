import pathUtil from "node:path";
import ts from "typescript";
import { createAnnotation, getChangedFiles, isCI } from "./ci-interop.js";

/**
 * @fileoverview Generates CI annotations for type warnings in files modified by the
 * pull request. Standard TypeScript CLI will include all files and its output is
 * detected as errors, so not usable for us.
 */

const check = async () => {
  const rootDir = pathUtil.join(import.meta.dirname, "..");

  const changedFiles = Array.from(await getChangedFiles()).sort();
  const changedFilesAbsolute = changedFiles.map((f) =>
    pathUtil.join(rootDir, f)
  );

  console.log(`${changedFiles.size} changed files:`);
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

  for (const diagnostic of diagnostics) {
    if (!changedFilesAbsolute.includes(diagnostic.file.fileName)) {
      continue;
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

    numWarnings++;
    createAnnotation({
      type: "warning",
      file: diagnostic.file.fileName,
      title: "Type warning - may indicate a bug - ignore if no bug",
      onlyIfChanged: true,
      message: flattened,
      line: startPosition.line + 1,
      col: startPosition.character + 1,
      endLine: endPosition.line + 1,
      endCol: endPosition.character + 1,
    });
  }

  console.log(`Warnings in changed files: ${numWarnings}`);
  console.log(`Warnings in all files: ${diagnostics.length}`);
};

if (isCI()) {
  check();
} else {
  console.error(
    "This script is only intended to be used in CI. For development, use normal TypeScript CLI instead."
  );
  process.exit(1);
}
