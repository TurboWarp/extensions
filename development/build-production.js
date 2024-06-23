import pathUtil from "node:path";
import urlUtil from "node:url";
import Builder from "./builder.js";

const dirname = pathUtil.dirname(urlUtil.fileURLToPath(import.meta.url));
const outputDirectory = pathUtil.join(dirname, "../build");
const l10nOutput = pathUtil.join(dirname, "../build-l10n");

const builder = new Builder("production");
const build = builder.build();

build.export(outputDirectory);
console.log(`Built to ${outputDirectory}`);

build.exportL10N(l10nOutput);
console.log(`Exported L10N to ${l10nOutput}`);
