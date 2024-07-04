import Builder from "./builder.js";
import { GREEN, BOLD, RESET, RED } from "./colors.js";

const builder = new Builder("development");
const errors = await builder.validate();

if (errors.length === 0) {
  console.log(`${GREEN}${BOLD}Validation checks passed.${RESET}`);
  process.exit(0);
} else {
  console.error(
    `${RED}${BOLD}${errors.length} ${
      errors.length === 1 ? "file" : "files"
    } failed validation.${RESET}`
  );
  console.error("");
  for (const { fileName, error } of errors) {
    console.error(`${BOLD}${fileName}${RESET}: ${error}`);
  }
  console.error(``);
  process.exit(1);
}
