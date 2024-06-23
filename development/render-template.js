import fs from "node:fs";
import ejs from "ejs";

// TODO: Investigate the value of removing dependency on `ejs` and possibly writing our own DSL.

const renderTemplate = (path, data) => {
  const inputEJS = fs.readFileSync(path, "utf-8");
  const outputHTML = ejs.render(inputEJS, data);
  return outputHTML;
};

export default renderTemplate;
