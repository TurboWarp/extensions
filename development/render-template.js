import * as fs from "node:fs";
import ejs from "ejs";

const renderTemplate = (path, data) => {
  const inputEJS = fs.readFileSync(path, "utf-8");
  const outputHTML = ejs.render(inputEJS, data);
  return outputHTML;
};

export default renderTemplate;
