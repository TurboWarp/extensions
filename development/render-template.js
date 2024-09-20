import { readFile } from "node:fs/promises";
import { render } from "ejs";

// TODO: Investigate the value of removing dependency on `ejs` and possibly writing our own DSL.

const renderTemplate = async (path, data) => {
  const inputEJS = await readFile(path, "utf-8");
  const outputHTML = render(inputEJS, data);
  return outputHTML;
};

export default renderTemplate;
