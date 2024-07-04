import pathUtil from "node:path";
import Builder from "./builder.js";
import urlUtil from "node:url";

const dirname = pathUtil.dirname(urlUtil.fileURLToPath(import.meta.url));
const outputDirectory = pathUtil.join(dirname, "../build");
const l10nOutput = pathUtil.join(dirname, "../build-l10n");

const builder = new Builder("production");
const build = await builder.build();

await build.export(outputDirectory);
console.log(`Built to ${outputDirectory}`);

await build.exportL10N(l10nOutput);
console.log(`Exported L10N to ${l10nOutput}`);
