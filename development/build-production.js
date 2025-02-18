const pathUtil = require("path");
const Builder = require("./builder");

const outputDirectory = pathUtil.join(__dirname, "../build");
const l10nOutput = pathUtil.join(__dirname, "../build-l10n");

const builder = new Builder("production");
const build = builder.build();

build.export(outputDirectory);
console.log(`Built to ${outputDirectory}`);

build.exportL10N(l10nOutput);
console.log(`Exported L10N to ${l10nOutput}`);
