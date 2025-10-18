import * as fsPromises from "node:fs/promises";
import * as pathUtil from "node:path";
import * as nodeCrypto from "node:crypto";
import * as espree from "espree";
import esquery from "esquery";
import { mkdirp } from "./fs-utils.js";

const manifestPath = pathUtil.join(
  import.meta.dirname,
  "../extension-dependencies.json"
);
const cacheDir = pathUtil.join(
  import.meta.dirname,
  "../cached-extension-dependencies/"
);

/**
 * @type {Record<string, {sha256: string}>}
 */
let dependencies = {};

/**
 * @type {Record<string, string>}
 */
const cachedContent = {};

/**
 * @param {string} url
 * @returns {boolean}
 */
const isKnownDependency = (url) => Object.hasOwn(dependencies, url);

/**
 * @param {string} url
 */
const addDependency = async (url) => {
  console.log(`Fetching metadata for new import: ${url}`);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url}`);
  }

  const text = await res.text();
  const sha256 = nodeCrypto.createHash("sha256").update(text).digest("hex");
  dependencies[url] = {
    sha256,
  };
};

/**
 * @param {string} url
 */
const removeDependency = (url) => {
  console.log(`Removing unused import: ${url}`);
  delete dependencies[url];
};

/**
 * @returns {Promise<void>}
 */
const loadFromManifest = async () => {
  const text = await fsPromises.readFile(manifestPath, "utf-8");
  const json = JSON.parse(text);
  dependencies = json.dependencies;
};

/**
 * @returns {Promise<void>}
 */
const saveToManifest = async () => {
  await fsPromises.writeFile(
    manifestPath,
    JSON.stringify(
      {
        dependencies,
      },
      null,
      2
    )
  );
};

/**
 * Adds new, removes unused.
 * @param {Set<string>} urls
 * @returns {Promise<void>}
 */
export const synchronizeDependencyList = async (urls) => {
  await loadFromManifest();

  let dirty = false;
  for (const url of urls) {
    if (!isKnownDependency(url)) {
      dirty = true;
      await addDependency(url);
    }
  }
  for (const url of Object.keys(dependencies)) {
    if (!urls.has(url)) {
      dirty = true;
      removeDependency(url);
    }
  }

  if (dirty) {
    await saveToManifest();
  }
};

/**
 * Download all dependencies with integrity checking.
 * @returns {Promise<void>}
 */
export const fetchAllDependencies = async () => {
  await loadFromManifest();
  await mkdirp(cacheDir);

  for (const [url, meta] of Object.entries(dependencies)) {
    const cachePath = pathUtil.join(cacheDir, meta.sha256);

    let content;
    try {
      content = await fsPromises.readFile(cachePath, "utf-8");
    } catch (e) {
      if (e.code !== "ENOENT") {
        throw e;
      }
    }

    if (!content) {
      console.log(`Fetching and caching dependency: ${url}`);
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} fetching ${url}`);
      }
      content = await res.text();
      await fsPromises.writeFile(cachePath, content);
    }

    const actualSHA256 = nodeCrypto
      .createHash("sha256")
      .update(content)
      .digest("hex");

    if (actualSHA256 !== meta.sha256) {
      throw new Error(
        `Hash mismatch for ${url}. Expected ${meta.sha256}, got ${actualSHA256}`
      );
    }

    cachedContent[url] = content;
  }
};

/**
 * @param {string} js
 * @returns {string[]}
 */
export const parseExtensionDependencies = (js) => {
  if (!js.includes("import(")) {
    // fast path for most common case by far
    return [];
  }

  const ast = espree.parse(js, {
    ecmaVersion: 2022,
  });

  const urls = [];
  const selector = esquery.parse('ImportExpression[source.type="Literal"]');
  for (const match of esquery.match(ast, selector)) {
    const url = match.source.value;
    if (url.startsWith("http:") || url.startsWith("https:")) {
      urls.push(url);
    }
  }
  return urls;
};

/**
 * @param {string[]} strings
 * @returns {string}
 */
const shortest = (strings) => {
  let shortest = strings[0];
  for (let i = 1; i < strings.length; i++) {
    if (strings[i].length < shortest.length) {
      shortest = strings[i];
    }
  }
  return shortest;
};

/**
 * @param {string} js
 * @returns {string}
 */
export const rewriteImportsToInlineURLs = (js) => {
  const dependencies = parseExtensionDependencies(js);

  for (const url of dependencies) {
    if (!isKnownDependency(url)) {
      throw new Error(
        `Dependency ${url} is missing from manifest. Start the development server in development mode once to update it.`
      );
    }

    const content = cachedContent[url];
    const encoded = shortest([
      `data:application/javascript;,${encodeURIComponent(content)}`,
      `data:application/javascript;base64,${Buffer.from(content).toString("base64")}`,
    ]);

    // TODO: this is actually a pretty bad approach though it does work fine for now
    const newSyntax = `import("${encoded}")`;
    js = js.replaceAll(`import("${url}")`, newSyntax);
    js = js.replaceAll(`import('${url}')`, newSyntax);
    js = js.replaceAll(`import(\`${url}\`)`, newSyntax);
  }

  return js;
};
