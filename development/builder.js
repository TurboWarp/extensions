const fs = require("fs");
const AdmZip = require("adm-zip");
const pathUtil = require("path");
const compatibilityAliases = require("./compatibility-aliases");
const parseMetadata = require("./parse-extension-metadata");
const featuredExtensionSlugs = require("../extensions/extensions.json");

/**
 * @typedef {'development'|'production'|'desktop'} Mode
 */

/**
 * Recursively read a directory.
 * @param {string} directory
 * @returns {Array<[string, string]>} List of tuples [name, absolutePath].
 * The return result includes files in subdirectories, but not the subdirectories themselves.
 */
const recursiveReadDirectory = (directory) => {
  const result = [];
  for (const name of fs.readdirSync(directory)) {
    if (name.startsWith(".")) {
      // Ignore .eslintrc.js, .DS_Store, etc.
      continue;
    }
    const absolutePath = pathUtil.join(directory, name);
    const stat = fs.statSync(absolutePath);
    if (stat.isDirectory()) {
      for (const [
        relativeToChildName,
        childAbsolutePath,
      ] of recursiveReadDirectory(absolutePath)) {
        // This always needs to use / on all systems
        result.push([`${name}/${relativeToChildName}`, childAbsolutePath]);
      }
    } else {
      result.push([name, absolutePath]);
    }
  }
  return result;
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
}

class ExtensionFile extends BuildFile {
  constructor(absolutePath, featured) {
    super(absolutePath);
    this.featured = featured;
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
}

class HomepageFile extends BuildFile {
  constructor(extensionFiles, extensionImages, withDocs, samples, mode) {
    super(pathUtil.join(__dirname, "homepage-template.ejs"));

    /** @type {Record<string, ExtensionFile>} */
    this.extensionFiles = extensionFiles;

    /** @type {Record<string, string>} */
    this.extensionImages = extensionImages;

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
      featuredExtensionSlugs.map((slug) => [
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
  constructor(extensionFiles, extensionImages, withDocs, samples) {
    super(null);

    /** @type {Record<string, ExtensionFile>} */
    this.extensionFiles = extensionFiles;

    /** @type {Record<string, string>} */
    this.extensionImages = extensionImages;

    /** @type {Set<string>} */
    this.withDocs = withDocs;

    /** @type {Map<string, SampleFile[]>} */
    this.samples = samples;
  }

  getType() {
    return ".json";
  }

  read() {
    const extensions = [];
    for (const extensionSlug of featuredExtensionSlugs) {
      const extension = {};
      const file = this.extensionFiles[extensionSlug];
      const metadata = file.getMetadata();
      const image = this.extensionImages[extensionSlug];

      extension.slug = extensionSlug;
      extension.id = metadata.id;
      extension.name = metadata.name;
      extension.description = metadata.description;
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
    const sizeOfImage = require("image-size");
    const contents = this.read();
    const { width, height } = sizeOfImage(contents);
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
    try {
      fs.rmSync(root, {
        recursive: true,
      });
    } catch (e) {
      if (e.code !== "ENOENT") {
        throw e;
      }
    }

    for (const [relativePath, file] of Object.entries(this.files)) {
      const directoryName = pathUtil.dirname(relativePath);
      fs.mkdirSync(pathUtil.join(root, directoryName), {
        recursive: true,
      });
      fs.writeFileSync(pathUtil.join(root, relativePath), file.read());
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
  }

  build() {
    const build = new Build(this.mode);

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
      const file = new ExtensionFile(absolutePath, featured);
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

    if (this.mode !== "desktop") {
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

      const scratchblocksPath = pathUtil.join(
        __dirname,
        "../node_modules/@turbowarp/scratchblocks/build/scratchblocks.min.js"
      );
      build.files["/docs-internal/scratchblocks.js"] = new BuildFile(
        scratchblocksPath
      );

      build.files["/index.html"] = new HomepageFile(
        extensionFiles,
        extensionImages,
        extensionsWithDocs,
        samples,
        this.mode
      );
      build.files["/sitemap.xml"] = new SitemapFile(build);
    }

    build.files["/generated-metadata/extensions-v0.json"] =
      new JSONMetadataFile(
        extensionFiles,
        extensionImages,
        extensionsWithDocs,
        samples
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
          `${this.extensionsRoot}/**/*`,
          `${this.imagesRoot}/**/*`,
          `${this.websiteRoot}/**/*`,
          `${this.docsRoot}/**/*`,
          `${this.samplesRoot}/**/*`,
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
