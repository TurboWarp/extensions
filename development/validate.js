import Builder from "./builder.mjs";
import { GREEN, BOLD, RESET, RED } from "./colors.mjs";

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
