import * as pathUtil from "node:path";
import Builder from "./builder.js";

const outputDirectory = pathUtil.join(import.meta.dirname, "../build");
const l10nOutput = pathUtil.join(import.meta.dirname, "../build-l10n");

const builder = new Builder("production");
const build = await builder.build();

await build.export(outputDirectory);
console.log(`Built to ${outputDirectory}`);

await build.exportL10N(l10nOutput);
console.log(`Exported L10N to ${l10nOutput}`);
