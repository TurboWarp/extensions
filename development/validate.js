import pathUtil from "node:path";
import Builder from "./builder.js";
import { createAnnotation, isCI } from "./ci-interop.js";
import * as Colors from "./colors.js";

const builder = new Builder("production");
const errors = await builder.validate();

const rootDir = pathUtil.join(import.meta.dirname, "..");

if (errors.length === 0) {
  console.log(
    `${Colors.GREEN}${Colors.BOLD}Validation checks passed.${Colors.RESET}`
  );
  process.exit(0);
} else {
  console.error(
    `${Colors.RED}${Colors.BOLD}${errors.length} ${
      errors.length === 1 ? "file" : "files"
    } failed validation.${Colors.RESET}`
  );

  console.error("");

  for (const { outputFileName, inputFilePath, error } of errors) {
    const displayName = inputFilePath
      ? pathUtil.relative(rootDir, inputFilePath)
      : outputFileName;
    console.error(`${Colors.BOLD}${displayName}${Colors.RESET}: ${error}`);

    if (isCI() && inputFilePath) {
      createAnnotation({
        type: "error",
        file: inputFilePath,
        title: "Validation error",
        message: error,
      });
    }
  }

  console.error("");
  process.exit(1);
}
