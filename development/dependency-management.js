import fsPromises from "node:fs/promises";
import pathUtil from "node:path";
import nodeCrypto from "node:crypto";
import zlib from "node:zlib";
import * as espree from "espree";
import esquery from "esquery";
import { mkdirp } from "./fs-utils.js";
import evaluateAST from "./evaluate-ast.js";
import base85encode from "./base85encode.js";
import { __internal } from "./build-snippets.js";

/**
 * @fileoverview Implements build-time part of Scratch.external.
 */

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
 * @typedef {'importModule'|'fetch'|'dataURL'|'blob'|'evalAndReturn'} JSImportType
 */

/**
 * @typedef JSImport A call to Scratch.external.* inside an extension.
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
const canIgnoreExtension = (js) => !js.includes("Scratch.external");

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
    "CallExpression[callee.object.object.name=Scratch][callee.object.property.name=external]"
  );
  const selectorMatches = esquery.match(ast, selector);

  for (const match of selectorMatches) {
    const type = match.callee.property.name;
    if (typeof type !== "string") {
      throw new Error(
        `Scratch.external call with unknown type: ${JSON.stringify(match.callee.property)}`
      );
    }

    const args = match.arguments.map((node) => evaluateAST(node));
    for (const arg of args) {
      if (typeof arg !== "string") {
        throw new Error(
          `Scratch.external call with non-string argument: ${arg}`
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
      type === "importModule" ||
      type === "fetch" ||
      type === "dataURL" ||
      type === "blob"
    ) {
      // No extra properties
    } else if (type === "evalAndReturn") {
      jsImport.returnExpression = args[1];
    } else {
      throw new Error(`Scratch.external call with unknown type: ${type}`);
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
 * @typedef JSWithInternalDependenceis
 * @property {string} js
 * @property {import("./build-snippets.js").SnippetName[]} snippets
 */

/**
 * @param {Buffer} buffer
 * @returns {JSWithInternalDependenceis} JS code returning ArrayBuffer
 */
const toArrayBufferJS = (buffer) => {
  if (buffer.byteLength < 50000) {
    // Not large enough to justify doing anything complicated
    return {
      js: `new Uint8Array([${buffer.join(",")}]).buffer`,
      snippets: [],
    };
  }

  // The buffer is pretty large, so it's worthwhile for us to compress it down ahead of time to make the JS
  // bundles smaller. Even after accounting for the extra space used by the snippets, we come out ahead.
  const zstdData = zlib.zstdCompressSync(buffer, {
    params: {
      [zlib.constants.ZSTD_c_compressionLevel]: 20,
    },
  });
  const base85data = base85encode(zstdData);
  return {
    js: `${__internal}.fzstd.decompress(${__internal}.base85decode("${base85data}", ${zstdData.byteLength}))`,
    snippets: ["base85decode", "fzstd"],
  };
};

/**
 * @param {Buffer} buffer
 * @param {string} contentType
 * @returns {JSWithInternalDependenceis} JS code returning Blob
 */
const toBlobJS = (buffer, contentType) => {
  const toBuffer = toArrayBufferJS(buffer);
  return {
    js: `new Blob([${toBuffer.js}], {type: ${JSON.stringify(contentType)}})`,
    snippets: toBuffer.snippets,
  };
};

/**
 * @param {JSImport} jsImport
 * @returns {JSWithInternalDependenceis}
 */
const generateNewJS = (jsImport) => {
  if (!isKnownDependency(jsImport.url)) {
    throw new Error(
      `Dependency metadata missing: ${jsImport.url}. Run the development server at least once ('npm start') to update the metadata.`
    );
  }

  const { buffer, contentType } = getDependencyContent(jsImport.url);

  if (jsImport.type === "importModule") {
    const toBlob = toBlobJS(buffer, contentType);
    return {
      js: `import(URL.createObjectURL(${toBlob.js}))`,
      snippets: toBlob.snippets,
    };
  }

  if (jsImport.type === "fetch") {
    const toBuffer = toArrayBufferJS(buffer);
    return {
      js: `Promise.resolve(new Response(${toBuffer.js}, {headers: {"content-type": ${JSON.stringify(contentType)}}))`,
      snippets: toBuffer.snippets,
    };
  }

  if (jsImport.type === "dataURL") {
    const dataURL = `data:${contentType};base64,${buffer.toString("base64")}`;
    const toBuffer = toArrayBufferJS(Buffer.from(dataURL, "utf-8"));
    return {
      js: `Promise.resolve(new TextDecoder().decode(${toBuffer.js}))`,
      snippets: toBuffer.snippets,
    };
  }

  if (jsImport.type === "blob") {
    const toBlob = toBlobJS(buffer, contentType);
    return {
      js: `Promise.resolve(${toBlob.js})`,
      snippets: toBlob.snippets,
    };
  }

  if (jsImport.type === "evalAndReturn") {
    // This ends up using more space than the fancier encoding methods, but this way the code including any
    // licenses are plainly visible. It also helps the JS engine run a bit faster since it can parse all the
    // code ahead of time instead of getting surprised later with yet more code to compile.
    return {
      js: `Promise.resolve(function(){${buffer.toString("utf-8")};return ${jsImport.returnExpression};}())`,
      snippets: [],
    };
  }

  throw new Error(`Scratch.external call with unknown type: ${jsImport.type}`);
};

/**
 * @param {string} js
 * @returns {{js: string; snippets: Set<import("./build-snippets.js").SnippetName>}}}
 */
export const rewriteExternalToInline = (js) => {
  const imports = getAllImportDependencyCalls(js);
  if (imports.length === 0) {
    return {
      js: js,
      snippets: new Set(),
    };
  }

  let newJS = "";
  /** @type {Set<import("./build-snippets.js").SnippetName>} */
  const snippets = new Set();

  for (let i = 0; i < imports.length; i++) {
    const jsImport = imports[i];

    const endOfPreviousImport = i === 0 ? 0 : imports[i - 1].end;
    const precedingJS = js.substring(endOfPreviousImport, jsImport.start - 1);
    const oldJS = js.substring(jsImport.start, jsImport.end);

    const generatedJS = generateNewJS(jsImport);
    // Keeping the old JS still here but commented helps keep stack traces slightly more in tact.
    newJS += `${precedingJS}/* generated dependency -- ${oldJS} */${generatedJS.js}/* end generated dependency */`;
    for (const snippet of generatedJS.snippets) {
      snippets.add(snippet);
    }
  }

  const endOfLastImport = imports[imports.length - 1].end;
  const endingJS = js.substring(endOfLastImport);
  newJS += endingJS;

  return {
    js: newJS,
    snippets,
  };
};
