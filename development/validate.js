const Builder = require("./builder");
const Colors = require("./colors");

const builder = new Builder("production");
const errors = builder.validate();

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
  for (const { fileName, error } of errors) {
    console.error(`${Colors.BOLD}${fileName}${Colors.RESET}: ${error}`);
  }
  console.error(``);
  process.exit(1);
}
