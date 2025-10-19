import * as fsPromises from "node:fs/promises";
import * as pathUtil from "node:path";
import * as nodeCrypto from "node:crypto";
import * as espree from "espree";
import esquery from "esquery";
import AdmZip from "adm-zip";
import { mkdirp } from "./fs-utils.js";
import evaluateAST from "./evaluate-ast.js";
import { base85encode, defineBase85Decode } from "./base85.js";

const manifestPath = pathUtil.join(
  import.meta.dirname,
  "../extension-dependencies.json"
);
const cacheDir = pathUtil.join(
  import.meta.dirname,
  "../cached-extension-dependencies/"
);

/**
 * @type {Record<string, {contentType: string; sha256: string}>}
 */
let dependencies = {};

/**
 * @type {Record<string, Buffer>}
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
const getDependencyContent = (url) => ({
  buffer: cachedContent[url],
  contentType: dependencies[url].contentType,
});

/**
 * @param {string} url
 */
const addDependency = async (url) => {
  console.log(`Fetching metadata for new import: ${url}`);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url}`);
  }

  const text = Buffer.from(await res.arrayBuffer());
  const sha256 = nodeCrypto.createHash("sha256").update(text).digest("hex");

  dependencies[url] = {
    sha256,
    contentType: res.headers.get("content-type"),
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
      content = await fsPromises.readFile(cachePath);
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
      content = Buffer.from(await res.arrayBuffer());
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
 * @typedef {'asModule'|'asFetch'|'asDataURL'|'asScriptTag'|'asEval'} JSImportType
 */

/**
 * @typedef JSImport A call to Scratch.importDependency.* inside an extension.
 * @property {JSImportType} type
 * @property {number} start
 * @property {number} end
 * @property {string} url
 * @property {string} [returnExpression] If type === 'asEval'
 */

/**
 * Fast path to check if an extension has no imports and does not need to be parsed at all.
 * @param {string} js
 * @returns {boolean} true if the extension clearly does not have any imports
 */
const canIgnoreExtension = (js) => !js.includes("Scratch.importDependency");

/**
 * @param {string} js
 * @returns {JSImport[]}
 */
const getAllImportDependencyCalls = (js) => {
  if (canIgnoreExtension(js)) {
    return [];
  }

  /** @type {JSImport[]} */
  const jsImports = [];

  const ast = espree.parse(js, {
    ecmaVersion: 2022,
  });
  const selector = esquery.parse(
    "CallExpression[callee.object.object.name=Scratch][callee.object.property.name=importDependency]"
  );
  const selectorMatches = esquery.match(ast, selector);

  for (const match of selectorMatches) {
    const type = match.callee.property.name;
    if (typeof type !== "string") {
      throw new Error(
        `importDependency call with unknown type: ${JSON.stringify(match.callee.property)}`
      );
    }

    const args = match.arguments.map((node) => evaluateAST(node));
    for (const arg of args) {
      if (typeof arg !== "string") {
        throw new Error(
          `importDependency call with non-string argument: ${arg}`
        );
      }
    }

    const jsImport = {
      type,
      start: match.start,
      end: match.end,
      url: args[0],
    };

    if (
      type === "asModule" ||
      type === "asFetch" ||
      type === "asDataURL" ||
      type === "asScriptTag"
    ) {
      // No extra properties
    } else if (type === "asEval") {
      jsImport.returnExpression = args[1];
    } else {
      throw new Error(`importDependency call with unknown type: ${type}`);
    }

    jsImports.push(jsImport);
  }

  return jsImports;
};

/**
 * @param {string} js
 * @returns {string[]}
 */
export const parseExtensionDependencies = (js) => {
  const imports = getAllImportDependencyCalls(js);

  const urls = [];
  for (const jsImport of imports) {
    const parsedURL = new URL(jsImport.url);
    if (parsedURL.protocol === "https:") {
      urls.push(jsImport.url);
    } else {
      throw new Error(
        `Imports from protocol ${parsedURL.protocol} not supported`
      );
    }
  }

  return urls;
};

/**
 * @param {Buffer} buffer
 * @param {string} contentType
 * @returns {string} JS code that will return a data: URL for the buffer.
 */
const toDataURLJS = (buffer, contentType) => {
  const url = `data:${contentType};base64,${buffer.toString("base64")}`;

  if (buffer.byteLength < 100000) {
    // Short enough that we can just inline it directly.
    return `"${url}"`;
  }

  // The resource is large enough that we should encode it in a more efficient format.

  const admZip = new AdmZip();
  admZip.addFile("u", Buffer.from(url, "utf-8"));
  const compressedZip = admZip.toBuffer();
  const encodedZip = base85encode(compressedZip);
  const byteLengthNextMultipleOf4 = Math.ceil(compressedZip.byteLength / 4) * 4;

  return `(async function() {
    ${defineBase85Decode}
    const decodeBuffer = new ArrayBuffer(${byteLengthNextMultipleOf4});
    base85decode("${encodedZip}", decodeBuffer, 0);
    const zip = await Scratch.vm.exports.JSZip.loadAsync(new Uint8Array(decodeBuffer, 0, ${compressedZip.byteLength}));
    const buffer = await zip.file("u").async("arraybuffer");
    return new TextDecoder().decode(buffer);
  }())`;
};

/**
 * @param {Buffer} buffer
 * @returns {string} JS code that will return a Promise<ArrayBuffer> for the buffer.
 */
const toArrayBufferJS = buffer => {
  if (buffer.byteLength < 100000) {
    return `Promise.resolve(new Uint8Array([${buffer.join(',')}]).buffer)`;
  }

  const admZip = new AdmZip();
  admZip.addFile("u", buffer);
  const compressedZip = admZip.toBuffer();
  const encodedData = base85encode(compressedZip);
  const byteLengthNextMultipleOf4 = Math.ceil(compressedZip.byteLength / 4) * 4;

  return `(async function() {
    ${defineBase85Decode}
    const decodeBuffer = new ArrayBuffer(${byteLengthNextMultipleOf4});
    base85decode("${encodedData}", decodeBuffer, 0);
    const zip = await Scratch.vm.exports.JSZip.loadAsync(new Uint8Array(decodeBuffer, 0, ${compressedZip.byteLength}));
    return zip.file("u").async("arraybuffer");
  }())`;
};

/**
 * @param {JSImport} jsImport
 * @returns {string}
 */
const generateNewJS = (jsImport) => {
  if (!isKnownDependency(jsImport.url)) {
    throw new Error(
      `Dependency metadata missing: ${jsImport.url}. Run the development server at least once ('npm start') to update the metadata.`
    );
  }

  const { buffer, contentType } = getDependencyContent(jsImport.url);

  if (jsImport.type === "asModule") {
    return `import(${toDataURLJS(buffer, contentType)})`;
  }

  if (jsImport.type === "asDataURL") {
    // return toDataURLJS(buffer, contentType);
    return `URL.createObjectURL(new Blob([await ${toArrayBufferJS(buffer)}], {type: "${contentType}"}))`;
  }

  if (jsImport.type === "asFetch") {
    return `fetch(${toDataURLJS(buffer, contentType)})`;
  }

  if (jsImport.type === "asScriptTag") {
    return `Scratch.importDependency.asScriptTag(${toDataURLJS(buffer, contentType)})`;
  }

  if (jsImport.type === "asEval") {
    return `(function(){${buffer};return ${jsImport.returnExpression};}())`;
  }

  throw new Error(`Do not know how to inline ${jsImport.type}`);
};

/**
 * @param {string} js
 * @returns {string}
 */
export const rewriteImportsToInlineURLs = (js) => {
  const imports = getAllImportDependencyCalls(js);
  if (imports.length === 0) {
    return js;
  }

  let newJS = "";
  for (let i = 0; i < imports.length; i++) {
    const jsImport = imports[i];
    const endOfPreviousImport = i === 0 ? 0 : imports[i - 1].end;
    const jsBefore = js.substring(endOfPreviousImport, jsImport.start - 1);
    const generatedJS = generateNewJS(jsImport);
    newJS += `${jsBefore}/* generated dependency */${generatedJS}/* end generated dependency */`;
  }

  const endOfLastImport = imports[imports.length - 1].end;
  const endingJS = js.substring(endOfLastImport);
  newJS += endingJS;

  return newJS;
};
