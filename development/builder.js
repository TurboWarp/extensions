const fs = require("fs");
const AdmZip = require("adm-zip");
const pathUtil = require("path");
const ExtendedJSON = require("@turbowarp/json");
const compatibilityAliases = require("./compatibility-aliases");
const parseMetadata = require("./parse-extension-metadata");
const { mkdirp, recursiveReadDirectory } = require("./fs-utils");

/**
 * @typedef {'development'|'production'|'desktop'} Mode
 */

/**
 * @typedef TranslatableString
 * @property {string} string The English version of the string
 * @property {string} developer_comment Helper text to help translators
 */

/**
 * @param {Record<string, Record<string, string>>} allTranslations
 * @param {string} idPrefix
 * @returns {Record<string, Record<string, string>>|null}
 */
const filterTranslationsByPrefix = (allTranslations, idPrefix) => {
  let translationsEmpty = true;
  const filteredTranslations = {};

  for (const [locale, strings] of Object.entries(allTranslations)) {
    let localeEmpty = true;
    const filteredStrings = {};

    for (const [id, string] of Object.entries(strings)) {
      if (id.startsWith(idPrefix)) {
        filteredStrings[id.substring(idPrefix.length)] = string;
        localeEmpty = false;
      }
    }

    if (!localeEmpty) {
      filteredTranslations[locale] = filteredStrings;
      translationsEmpty = false;
    }
  }

  return translationsEmpty ? null : filteredTranslations;
};

/**
 * @param {Record<string, Record<string, string>>} allTranslations
 * @param {string} idFilter
 * @returns {Record<string, string>}
 */
const filterTranslationsByID = (allTranslations, idFilter) => {
  let stringsEmpty = true;
  const result = {};

  for (const [locale, strings] of Object.entries(allTranslations)) {
    const translated = strings[idFilter];
    if (translated) {
      result[locale] = translated;
      stringsEmpty = false;
    }
  }

  return stringsEmpty ? null : result;
};

/**
 * @param {string} oldCode
 * @param {string} insertCode
 */
const insertAfterCommentsBeforeCode = (oldCode, insertCode) => {
  let index = 0;
  while (true) {
    if (oldCode.substring(index, index + 2) === "//") {
      // Line comment
      const end = oldCode.indexOf("\n", index);
      if (end === -1) {
        // This file is only line comments
        index = oldCode.length;
        break;
      }
      index = end;
    } else if (oldCode.substring(index, index + 2) === "/*") {
      // Block comment
      const end = oldCode.indexOf("*/", index);
      if (end === -1) {
        throw new Error("Block comment never ends");
      }
      index = end + 2;
    } else if (/\s/.test(oldCode.charAt(index))) {
      // Whitespace
      index++;
    } else {
      break;
    }
  }

  const before = oldCode.substring(0, index);
  const after = oldCode.substring(index);
  return before + insertCode + after;
};

class BuildFile {
  constructor(source) {
    this.sourcePath = source;
  }

  getType() {
    return pathUtil.extname(this.sourcePath);
  }

  getLastModified() {
    return fs.statSync(this.sourcePath).mtimeMs;
  }

  read() {
    return fs.readFileSync(this.sourcePath);
  }

  validate() {
    // no-op by default
  }

  /**
   * @returns {Record<string, Record<string, TranslatableString>>|null}
   */
  getStrings() {
    // no-op by default, to be overridden
    return null;
  }
}

class ExtensionFile extends BuildFile {
  /**
   * @param {string} absolutePath Full path to the .js file, eg. /home/.../extensions/fetch.js
   * @param {string} slug Just the extension ID from the path, eg. fetch
   * @param {boolean} featured true if the extension is the homepage
   * @param {Record<string, Record<string, string>>} allTranslations All extension runtime translations
   * @param {Mode} mode
   */
  constructor(absolutePath, slug, featured, allTranslations, mode) {
    super(absolutePath);
    /** @type {string} */
    this.slug = slug;
    /** @type {boolean} */
    this.featured = featured;
    /** @type {Record<string, Record<string, string>>} */
    this.allTranslations = allTranslations;
    /** @type {Mode} */
    this.mode = mode;
  }

  read() {
    const data = fs.readFileSync(this.sourcePath, "utf-8");

    if (this.mode !== "development") {
      const translations = filterTranslationsByPrefix(
        this.allTranslations,
        `${this.slug}@`
      );
      if (translations !== null) {
        return insertAfterCommentsBeforeCode(
          data,
          `/* generated l10n code */Scratch.translate.setup(${JSON.stringify(
            translations
          )});/* end generated l10n code */`
        );
      }
    }

    return data;
  }

  getMetadata() {
    const data = fs.readFileSync(this.sourcePath, "utf-8");
    return parseMetadata(data);
  }

  validate() {
    if (!this.featured) {
      return;
    }

    const metadata = this.getMetadata();

    if (!metadata.id) {
      throw new Error("Missing // ID:");
    }

    if (!metadata.name) {
      throw new Error("Missing // Name:");
    }

    if (!metadata.description) {
      throw new Error("Missing // Description:");
    }

    const PUNCTUATION = [".", "!", "?"];
    if (
      !PUNCTUATION.some((punctuation) =>
        metadata.description.endsWith(punctuation)
      )
    ) {
      throw new Error(
        `Description is missing punctuation: ${metadata.description}`
      );
    }

    if (!metadata.license) {
      throw new Error(
        "Missing // License: -- We recommend using // License: MPL-2.0"
      );
    }

    const spdxParser = require("spdx-expression-parse");
    try {
      // Don't care about the result -- just see if it parses.
      spdxParser(metadata.license);
    } catch (e) {
      throw new Error(
        `${metadata.license} is not a valid SPDX license. Did you typo it? It is case sensitive. We recommend using // License: MPL-2.0`
      );
    }

    for (const person of [...metadata.by, ...metadata.original]) {
      if (!person.name) {
        throw new Error("Person is missing name");
      }
      if (
        person.link &&
        !person.link.startsWith("https://scratch.mit.edu/users/")
      ) {
        throw new Error(
          `Link for ${person.name} does not point to a Scratch user`
        );
      }
    }
  }

  getStrings() {
    if (!this.featured) {
      return null;
    }

    const metadata = this.getMetadata();
    const slug = this.slug;

    const getMetadataDescription = (part) => {
      let result = `${part} of the '${metadata.name}' extension in the extension gallery.`;
      if (metadata.context) {
        result += ` ${metadata.context}`;
      }
      return result;
    };
    const metadataStrings = {
      [`${slug}@name`]: {
        string: metadata.name,
        developer_comment: getMetadataDescription("Name"),
      },
      [`${slug}@description`]: {
        string: metadata.description,
        developer_comment: getMetadataDescription("Description"),
      },
    };

    const parseTranslations = require("./parse-extension-translations");
    const jsCode = fs.readFileSync(this.sourcePath, "utf-8");
    const unprefixedRuntimeStrings = parseTranslations(jsCode);
    const runtimeStrings = Object.fromEntries(
      Object.entries(unprefixedRuntimeStrings).map(([key, value]) => [
        `${slug}@${key}`,
        value,
      ])
    );

    return {
      "extension-metadata": metadataStrings,
      "extension-runtime": runtimeStrings,
    };
  }
}

class HomepageFile extends BuildFile {
  constructor(
    extensionFiles,
    extensionImages,
    featuredSlugs,
    withDocs,
    samples,
    mode
  ) {
    super(pathUtil.join(__dirname, "homepage-template.ejs"));

    /** @type {Record<string, ExtensionFile>} */
    this.extensionFiles = extensionFiles;

    /** @type {Record<string, string>} */
    this.extensionImages = extensionImages;

    /** @type {string[]} */
    this.featuredSlugs = featuredSlugs;

    /** @type {Map<string, SampleFile[]>} */
    this.withDocs = withDocs;

    /** @type {SampleFile[]} */
    this.samples = samples;

    /** @type {Mode} */
    this.mode = mode;

    this.host =
      mode === "development"
        ? "http://localhost:8000/"
        : "https://extensions.turbowarp.org/";
  }

  getType() {
    return ".html";
  }

  getFullExtensionURL(extensionSlug) {
    return `${this.host}${extensionSlug}.js`;
  }

  getDocumentationURL(extensionSlug) {
    return `${this.host}${extensionSlug}`;
  }

  getRunExtensionURL(extensionSlug) {
    return `https://turbowarp.org/editor?extension=${this.getFullExtensionURL(
      extensionSlug
    )}`;
  }

  /**
   * @param {SampleFile} sampleFile
   * @returns {string}
   */
  getRunSampleURL(sampleFile) {
    const path = encodeURIComponent(`samples/${sampleFile.getSlug()}`);
    return `https://turbowarp.org/editor?project_url=${this.host}${path}`;
  }

  read() {
    const renderTemplate = require("./render-template");

    const mostRecentExtensions = Object.entries(this.extensionFiles)
      .sort((a, b) => b[1].getLastModified() - a[1].getLastModified())
      .slice(0, 5)
      .map((i) => i[0]);

    const extensionMetadata = Object.fromEntries(
      this.featuredSlugs.map((slug) => [
        slug,
        {
          ...this.extensionFiles[slug].getMetadata(),
          hasDocumentation: this.withDocs.has(slug),
          samples: this.samples.get(slug) || [],
        },
      ])
    );

    return renderTemplate(this.sourcePath, {
      mode: this.mode,
      mostRecentExtensions,
      extensionImages: this.extensionImages,
      extensionMetadata,
      getFullExtensionURL: this.getFullExtensionURL.bind(this),
      getRunExtensionURL: this.getRunExtensionURL.bind(this),
      getDocumentationURL: this.getDocumentationURL.bind(this),
      getRunSampleURL: this.getRunSampleURL.bind(this),
    });
  }
}

class JSONMetadataFile extends BuildFile {
  constructor(
    extensionFiles,
    extensionImages,
    featuredSlugs,
    withDocs,
    samples,
    allTranslations
  ) {
    super(null);

    /** @type {Record<string, ExtensionFile>} */
    this.extensionFiles = extensionFiles;

    /** @type {Record<string, string>} */
    this.extensionImages = extensionImages;

    /** @type {string[]} */
    this.featuredSlugs = featuredSlugs;

    /** @type {Set<string>} */
    this.withDocs = withDocs;

    /** @type {Map<string, SampleFile[]>} */
    this.samples = samples;

    /** @type {Record<string, Record<string, string>>} */
    this.allTranslations = allTranslations;
  }

  getType() {
    return ".json";
  }

  read() {
    const extensions = [];
    for (const extensionSlug of this.featuredSlugs) {
      const extension = {};
      const file = this.extensionFiles[extensionSlug];
      const metadata = file.getMetadata();
      const image = this.extensionImages[extensionSlug];

      extension.slug = extensionSlug;
      extension.id = metadata.id;

      // English fields
      extension.name = metadata.name;
      extension.description = metadata.description;

      // For other languages, translations go here.
      // This system is a bit silly to avoid backwards-incompatible JSON changes.
      const nameTranslations = filterTranslationsByID(
        this.allTranslations,
        `${extensionSlug}@name`
      );
      if (nameTranslations) {
        extension.nameTranslations = nameTranslations;
      }
      const descriptionTranslations = filterTranslationsByID(
        this.allTranslations,
        `${extensionSlug}@description`
      );
      if (descriptionTranslations) {
        extension.descriptionTranslations = descriptionTranslations;
      }

      if (image) {
        extension.image = image;
      }
      if (metadata.by.length) {
        extension.by = metadata.by;
      }
      if (metadata.original.length) {
        extension.original = metadata.original;
      }
      if (this.withDocs.has(extensionSlug)) {
        extension.docs = true;
      }
      const samples = this.samples.get(extensionSlug);
      if (samples) {
        extension.samples = samples.map((i) => i.getTitle());
      }
      if (metadata.scratchCompatible) {
        extension.scratchCompatible = true;
      }

      extensions.push(extension);
    }

    const data = {
      extensions,
    };
    return JSON.stringify(data);
  }
}

class ImageFile extends BuildFile {
  validate() {
    const { imageSize } = require("image-size");
    const contents = this.read();
    const { width, height } = imageSize(contents);
    const aspectRatio = width / height;
    if (aspectRatio !== 2) {
      throw new Error(
        `Aspect ratio must be exactly 2, but found ${aspectRatio.toFixed(
          4
        )} (${width}x${height})`
      );
    }
  }
}

class SVGFile extends ImageFile {
  validate() {
    const contents = this.read();
    if (contents.includes("<text")) {
      throw new Error(
        "SVG must not contain <text> elements -- please convert the text to a path. This ensures it will display correctly on all devices."
      );
    }

    super.validate();
  }
}

const IMAGE_FORMATS = new Map();
IMAGE_FORMATS.set(".png", ImageFile);
IMAGE_FORMATS.set(".jpg", ImageFile);
IMAGE_FORMATS.set(".svg", SVGFile);

class SitemapFile extends BuildFile {
  constructor(build) {
    super(null);
    this.build = build;
  }

  getType() {
    return ".xml";
  }

  read() {
    let xml = "";
    xml += '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    xml += Object.keys(this.build.files)
      .filter((file) => file.endsWith(".html"))
      .map((file) => file.replace("index.html", "").replace(".html", ""))
      .sort((a, b) => {
        if (a.length < b.length) return -1;
        if (a.length > b.length) return 1;
        return a - b;
      })
      .map((path) => `https://extensions.turbowarp.org${path}`)
      .map((absoluteURL) => `<url><loc>${absoluteURL}</loc></url>`)
      .join("\n");

    xml += "</urlset>\n";
    return xml;
  }
}

class DocsFile extends BuildFile {
  constructor(absolutePath, extensionSlug) {
    super(absolutePath);
    this.extensionSlug = extensionSlug;
  }

  read() {
    const renderDocs = require("./render-docs");
    const markdown = super.read().toString("utf-8");
    return renderDocs(markdown, this.extensionSlug);
  }

  getType() {
    return ".html";
  }
}

class SampleFile extends BuildFile {
  getSlug() {
    return pathUtil.basename(this.sourcePath);
  }

  getTitle() {
    return this.getSlug().replace(".sb3", "");
  }

  /** @returns {string[]} list of full URLs */
  getExtensionURLs() {
    const zip = new AdmZip(this.sourcePath);
    const entry = zip.getEntry("project.json");
    if (!entry) {
      throw new Error("package.json missing");
    }
    const data = JSON.parse(entry.getData().toString("utf-8"));
    return data.extensionURLs ? Object.values(data.extensionURLs) : [];
  }

  validate() {
    const urls = this.getExtensionURLs();

    if (urls.length === 0) {
      throw new Error("Has no extensions");
    }

    for (const url of urls) {
      if (
        !url.startsWith("https://extensions.turbowarp.org/") ||
        !url.endsWith(".js")
      ) {
        throw new Error(`Invalid extension URL for sample: ${url}`);
      }
    }
  }
}

class Build {
  constructor() {
    /** @type {Record<string, BuildFile>} */
    this.files = {};
  }

  getFile(path) {
    return (
      this.files[path] ||
      this.files[`${path}.html`] ||
      this.files[`${path}index.html`] ||
      null
    );
  }

  export(root) {
    mkdirp(root);

    for (const [relativePath, file] of Object.entries(this.files)) {
      const directoryName = pathUtil.dirname(relativePath);
      fs.mkdirSync(pathUtil.join(root, directoryName), {
        recursive: true,
      });
      fs.writeFileSync(pathUtil.join(root, relativePath), file.read());
    }
  }

  /**
   * @returns {Record<string, Record<string, TranslatableString>>}
   */
  generateL10N() {
    const allStrings = {};

    for (const [filePath, file] of Object.entries(this.files)) {
      let fileStrings;
      try {
        fileStrings = file.getStrings();
      } catch (error) {
        console.error(error);
        throw new Error(
          `Error getting translations from ${filePath}: ${error}, see above`
        );
      }
      if (!fileStrings) {
        continue;
      }

      for (const [group, strings] of Object.entries(fileStrings)) {
        if (!allStrings[group]) {
          allStrings[group] = {};
        }

        for (const [key, value] of Object.entries(strings)) {
          if (allStrings[key]) {
            throw new Error(
              `L10N collision: multiple instances of ${key} in group ${group}`
            );
          }
          allStrings[group][key] = value;
        }
      }
    }

    return allStrings;
  }

  /**
   * @param {string} root
   */
  exportL10N(root) {
    mkdirp(root);

    const groups = this.generateL10N();
    for (const [name, strings] of Object.entries(groups)) {
      const filename = pathUtil.join(root, `exported-${name}.json`);
      fs.writeFileSync(filename, JSON.stringify(strings, null, 2));
    }
  }
}

class Builder {
  /**
   * @param {Mode} mode
   */
  constructor(mode) {
    if (process.argv.includes("--production")) {
      this.mode = "production";
    } else if (process.argv.includes("--development")) {
      this.mode = "development";
    } else if (process.argv.includes("--desktop")) {
      this.mode = "desktop";
    } else {
      /** @type {Mode} */
      this.mode = mode;
    }

    this.extensionsRoot = pathUtil.join(__dirname, "../extensions");
    this.websiteRoot = pathUtil.join(__dirname, "../website");
    this.imagesRoot = pathUtil.join(__dirname, "../images");
    this.docsRoot = pathUtil.join(__dirname, "../docs");
    this.samplesRoot = pathUtil.join(__dirname, "../samples");
    this.translationsRoot = pathUtil.join(__dirname, "../translations");
  }

  build() {
    const build = new Build(this.mode);

    const featuredExtensionSlugs = ExtendedJSON.parse(
      fs.readFileSync(
        pathUtil.join(this.extensionsRoot, "extensions.json"),
        "utf-8"
      )
    );

    /**
     * Look up by [group][locale][id]
     * @type {Record<string, Record<string, Record<string, string>>>}
     */
    const translations = {};
    for (const [filename, absolutePath] of recursiveReadDirectory(
      this.translationsRoot
    )) {
      if (!filename.endsWith(".json")) {
        continue;
      }
      const group = filename.split(".")[0];
      const data = JSON.parse(fs.readFileSync(absolutePath, "utf-8"));
      translations[group] = data;
    }

    /** @type {Record<string, ExtensionFile>} */
    const extensionFiles = {};
    for (const [filename, absolutePath] of recursiveReadDirectory(
      this.extensionsRoot
    )) {
      if (!filename.endsWith(".js")) {
        continue;
      }
      const extensionSlug = filename.split(".")[0];
      const featured = featuredExtensionSlugs.includes(extensionSlug);
      const file = new ExtensionFile(
        absolutePath,
        extensionSlug,
        featured,
        translations["extension-runtime"],
        this.mode
      );
      extensionFiles[extensionSlug] = file;
      build.files[`/${filename}`] = file;
    }

    /** @type {Record<string, ImageFile>} */
    const extensionImages = {};
    for (const [filename, absolutePath] of recursiveReadDirectory(
      this.imagesRoot
    )) {
      const extension = pathUtil.extname(filename);
      const ImageFileClass = IMAGE_FORMATS.get(extension);
      if (!ImageFileClass) {
        continue;
      }
      const extensionSlug = filename.split(".")[0];
      if (extensionSlug !== "unknown") {
        extensionImages[extensionSlug] = `images/${filename}`;
      }
      build.files[`/images/${filename}`] = new ImageFileClass(absolutePath);
    }

    /** @type {Set<string>} */
    const extensionsWithDocs = new Set();

    /** @type {Map<string, SampleFile[]>} */
    const samples = new Map();
    for (const [filename, absolutePath] of recursiveReadDirectory(
      this.samplesRoot
    )) {
      if (!filename.endsWith(".sb3")) {
        continue;
      }

      const file = new SampleFile(absolutePath);
      for (const url of file.getExtensionURLs()) {
        const slug = new URL(url).pathname.substring(1).replace(".js", "");
        if (samples.has(slug)) {
          samples.get(slug).push(file);
        } else {
          samples.set(slug, [file]);
        }
      }
      build.files[`/samples/${filename}`] = file;
    }

    for (const [filename, absolutePath] of recursiveReadDirectory(
      this.websiteRoot
    )) {
      build.files[`/${filename}`] = new BuildFile(absolutePath);
    }

    for (const [filename, absolutePath] of recursiveReadDirectory(
      this.docsRoot
    )) {
      if (!filename.endsWith(".md")) {
        continue;
      }
      const extensionSlug = filename.split(".")[0];
      const file = new DocsFile(absolutePath, extensionSlug);
      extensionsWithDocs.add(extensionSlug);
      build.files[`/${extensionSlug}.html`] = file;
    }

    // Don't rely on node_modules being stored in a specific location or having a specific structure
    // so that this works when we are a dependency in a bigger npm tree.
    const scratchblocksPath = require.resolve("@turbowarp/scratchblocks");
    build.files["/docs-internal/scratchblocks.js"] = new BuildFile(
      scratchblocksPath
    );

    build.files["/index.html"] = new HomepageFile(
      extensionFiles,
      extensionImages,
      featuredExtensionSlugs,
      extensionsWithDocs,
      samples,
      this.mode
    );
    build.files["/sitemap.xml"] = new SitemapFile(build);

    build.files["/generated-metadata/extensions-v0.json"] =
      new JSONMetadataFile(
        extensionFiles,
        extensionImages,
        featuredExtensionSlugs,
        extensionsWithDocs,
        samples,
        translations["extension-metadata"]
      );

    for (const [oldPath, newPath] of Object.entries(compatibilityAliases)) {
      build.files[oldPath] = build.files[newPath];
    }

    return build;
  }

  tryBuild(...args) {
    const start = new Date();
    process.stdout.write(`[${start.toLocaleTimeString()}] Building... `);

    try {
      const build = this.build(...args);
      const time = Date.now() - start.getTime();
      console.log(`done in ${time}ms`);
      return build;
    } catch (error) {
      console.log("error");
      console.error(error);
    }

    return null;
  }

  startWatcher(callback) {
    // Load chokidar lazily.
    const chokidar = require("chokidar");
    callback(this.tryBuild());
    chokidar
      .watch(
        [
          this.extensionsRoot,
          this.imagesRoot,
          this.websiteRoot,
          this.docsRoot,
          this.samplesRoot,
          this.translationsRoot,
        ],
        {
          ignoreInitial: true,
        }
      )
      .on("all", () => {
        callback(this.tryBuild());
      });
  }

  validate() {
    const errors = [];
    const build = this.build();
    for (const [fileName, file] of Object.entries(build.files)) {
      try {
        file.validate();
      } catch (e) {
        errors.push({
          fileName,
          error: e,
        });
      }
    }
    return errors;
  }
}

module.exports = Builder;
