const pathUtil = require("path");
const Builder = require("./builder");

const outputDirectory = pathUtil.join(__dirname, "..", "build");

const builder = new Builder("production");
const build = builder.build();
build.export(outputDirectory);

console.log(`Saved to ${outputDirectory}`);
