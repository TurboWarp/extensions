const fs = require('fs');
const pathUtil = require('path');
const sizeOfImage = require('image-size');
const renderTemplate = require('./render-template');
const renderDocs = require('./render-docs');
const compatibilityAliases = require('./compatibility-aliases');
const parseMetadata = require('./parse-extension-metadata');
const featuredExtensionsIDs = require('../extensions/extensions.json');

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
    if (name.startsWith('.')) {
      // Ignore .eslintrc.js, .DS_Store, etc.
      continue;
    }
    const absolutePath = pathUtil.join(directory, name);
    const stat = fs.statSync(absolutePath);
    if (stat.isDirectory()) {
      for (const [relativeToChildName, childAbsolutePath] of recursiveReadDirectory(absolutePath)) {
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
  constructor (source) {
    this.sourcePath = source;
  }

  getType () {
    return pathUtil.extname(this.sourcePath);
  }

  getLastModified () {
    return fs.statSync(this.sourcePath).mtimeMs;
  }

  read () {
    return fs.readFileSync(this.sourcePath);
  }

  validate () {
    // no-op by default
  }
}

class ExtensionFile extends BuildFile {
  constructor (absolutePath, featured) {
    super(absolutePath);
    this.featured = featured;
  }

  getMetadata () {
    const data = fs.readFileSync(this.sourcePath, 'utf-8');
    return parseMetadata(data);
  }

  validate () {
    if (!this.featured) {
      return;
    }

    const metadata = this.getMetadata();

    if (!metadata.id) {
      throw new Error('Missing // ID:');
    }

    if (!metadata.name) {
      throw new Error('Missing // Name:');
    }

    if (!metadata.description) {
      throw new Error('Missing // Description:');
    }

    const PUNCTUATION = ['.', '!', '?'];
    if (!PUNCTUATION.some((punctuation) => metadata.description.endsWith(punctuation))) {
      throw new Error(`Description is missing punctuation: ${metadata.description}`);
    }

    for (const person of [...metadata.by, ...metadata.original]) {
      if (!person.name) {
        throw new Error('Person is missing name');
      }
      if (person.link && !person.link.startsWith('https://scratch.mit.edu/users/')) {
        throw new Error(`Link for ${person.name} does not point to a Scratch user`);
      }
    }
  }
}

class HomepageFile extends BuildFile {
  constructor (extensionFiles, extensionImages, mode) {
    super(pathUtil.join(__dirname, 'homepage-template.ejs'));

    /** @type {Record<string, ExtensionFile>} */
    this.extensionFiles = extensionFiles;

    /** @type {Record<string, string>} */
    this.extensionImages = extensionImages;

    /** @type {Mode} */
    this.mode = mode;

    this.host = mode === 'development' ? 'http://localhost:8000/' : 'https://extensions.turbowarp.org/';
  }

  getType () {
    return '.html';
  }

  getFullExtensionURL (extensionID) {
    return `${this.host}${extensionID}.js`;
  }

  getRunExtensionURL (extensionID) {
    return `https://turbowarp.org/editor?extension=${this.getFullExtensionURL(extensionID)}`;
  }

  read () {
    const mostRecentExtensions = Object.entries(this.extensionFiles)
      .sort((a, b) => b[1].getLastModified() - a[1].getLastModified())
      .slice(0, 5)
      .map((i) => i[0]);

    const extensionMetadata = Object.fromEntries(featuredExtensionsIDs.map((id) => [
      id,
      this.extensionFiles[id].getMetadata()
    ]));

    return renderTemplate(this.sourcePath, {
      mode: this.mode,
      mostRecentExtensions,
      extensionImages: this.extensionImages,
      extensionMetadata,
      getFullExtensionURL: this.getFullExtensionURL.bind(this),
      getRunExtensionURL: this.getRunExtensionURL.bind(this)
    });
  }
}

class JSONMetadataFile extends BuildFile {
  constructor (extensionFiles, extensionImages) {
    super(null);

    /** @type {Record<string, ExtensionFile>} */
    this.extensionFiles = extensionFiles;

    /** @type {Record<string, string>} */
    this.extensionImages = extensionImages;
  }

  getType () {
    return '.json';
  }

  read () {
    const extensions = [];
    for (const extensionID of featuredExtensionsIDs) {
      const extension = {};
      const file = this.extensionFiles[extensionID];
      const metadata = file.getMetadata();
      const image = this.extensionImages[extensionID];

      extension.id = extensionID;
      extension.name = metadata.name;
      extension.description = metadata.description;
      if (image) {
        extension.image = image;
      }
      extensions.push(extension);
    }

    const data = {
      extensions
    };
    return JSON.stringify(data);
  }
}

class ImageFile extends BuildFile {
  validate () {
    const contents = this.read();
    const {width, height} = sizeOfImage(contents);
    const aspectRatio = width / height;
    if (aspectRatio !== 2) {
      throw new Error(`Aspect ratio must be exactly 2, but found ${aspectRatio.toFixed(4)} (${width}x${height})`);
    }
  }
}

class SVGFile extends ImageFile {
  validate () {
    const contents = this.read();
    if (contents.includes('<text')) {
      throw new Error('SVG must not contain <text> elements -- please convert the text to a path. This ensures it will display correctly on all devices.');
    }

    super.validate();
  }
}

class SitemapFile extends BuildFile {
  constructor (build) {
    super(null);
    this.build = build;
  }

  getType () {
    return '.xml';
  }

  read () {
    let xml = '';
    xml += '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    xml += Object.keys(this.build.files)
      .filter(file => file.endsWith('.html'))
      .map(file => file.replace('index.html', '').replace('.html', ''))
      .sort((a, b) => {
        if (a.length < b.length) return -1;
        if (a.length > b.length) return 1;
        return a - b;
      })
      .map(path => `https://extensions.turbowarp.org${path}`)
      .map(absoluteURL => `<url><loc>${absoluteURL}</loc></url>`)
      .join('\n');

    xml += '</urlset>\n';
    return xml;
  }
}

const IMAGE_FORMATS = new Map();
IMAGE_FORMATS.set('.png', ImageFile);
IMAGE_FORMATS.set('.jpg', ImageFile);
IMAGE_FORMATS.set('.svg', SVGFile);

class DocsFile extends BuildFile {
  constructor (absolutePath, extensionId) {
    super(absolutePath);
    this.extensionId = extensionId;
  }

  read () {
    const markdown = super.read().toString('utf-8');
    return renderDocs(markdown, this.extensionId);
  }

  getType () {
    return '.html';
  }
}

class Build {
  constructor (mode) {
    /** @type {Mode} */
    this.mode = mode;

    this.files = {};
  }

  getFile (path) {
    return this.files[path] || this.files[`${path}.html`] || this.files[`${path}index.html`] || null;
  }

  export (root) {
    try {
      fs.rmSync(root, {
        recursive: true
      });
    } catch (e) {
      if (e.code !== 'ENOENT') {
        throw e;
      }
    }

    for (const [relativePath, file] of Object.entries(this.files)) {
      if (this.mode === 'desktop' && relativePath.endsWith('.html')) {
        continue;
      }

      const directoryName = pathUtil.dirname(relativePath);
      fs.mkdirSync(pathUtil.join(root, directoryName), {
        recursive: true
      });
      fs.writeFileSync(pathUtil.join(root, relativePath), file.read());
    }
  }
}

class Builder {
  /**
   * @param {Mode} mode
   */
  constructor (mode) {
    if (process.argv.includes('--production')) {
      this.mode = 'production';
    } else if (process.argv.includes('--development')) {
      this.mode = 'development';
    } else if (process.argv.includes('--desktop')) {
      this.mode = 'desktop';
    } else {
      /** @type {Mode} */
      this.mode = mode;
    }

    this.extensionsRoot = pathUtil.join(__dirname, '../extensions');
    this.websiteRoot = pathUtil.join(__dirname, '../website');
    this.imagesRoot = pathUtil.join(__dirname, '../images');
    this.docsRoot = pathUtil.join(__dirname, '../docs');
  }

  build () {
    const build = new Build(this.mode);

    /** @type {Record<string, ImageFile>} */
    const extensionImages = {};
    for (const [filename, absolutePath] of recursiveReadDirectory(this.imagesRoot)) {
      const extension = pathUtil.extname(filename);
      const ImageFileClass = IMAGE_FORMATS.get(extension);
      if (!ImageFileClass) {
        continue;
      }
      const extensionId = filename.split('.')[0];
      if (extensionId !== 'unknown') {
        extensionImages[extensionId] = `images/${filename}`;
      }
      build.files[`/images/${filename}`] = new ImageFileClass(absolutePath);
    }

    for (const [filename, absolutePath] of recursiveReadDirectory(this.docsRoot)) {
      if (!filename.endsWith('.md')) {
        continue;
      }
      const extensionId = filename.split('.')[0];
      build.files[`/${extensionId}.html`] = new DocsFile(absolutePath, extensionId);
    }

    const scratchblocksPath = pathUtil.join(__dirname, '../node_modules/scratchblocks/build/scratchblocks.min.js');
    build.files['/docs-internal/scratchblocks.js'] = new BuildFile(scratchblocksPath);

    /** @type {Record<string, ExtensionFile>} */
    const extensionFiles = {};
    for (const [filename, absolutePath] of recursiveReadDirectory(this.extensionsRoot)) {
      if (!filename.endsWith('.js')) {
        continue;
      }
      const extensionId = filename.split('.')[0];
      const featured = featuredExtensionsIDs.includes(extensionId);
      const file = new ExtensionFile(absolutePath, featured);
      extensionFiles[extensionId] = file;
      build.files[`/${filename}`] = file;
    }

    for (const [oldPath, newPath] of Object.entries(compatibilityAliases)) {
      build.files[oldPath] = build.files[newPath];
    }

    for (const [filename, absolutePath] of recursiveReadDirectory(this.websiteRoot)) {
      build.files[`/${filename}`] = new BuildFile(absolutePath);
    }

    build.files['/index.html'] = new HomepageFile(extensionFiles, extensionImages, this.mode);
    build.files['/generated-metadata/extensions-v0.json'] = new JSONMetadataFile(extensionFiles, extensionImages);
    build.files['/sitemap.xml'] = new SitemapFile(build);

    return build;
  }

  tryBuild (...args) {
    const start = new Date();
    process.stdout.write(`[${start.toLocaleTimeString()}] Building... `);

    try {
      const build = this.build(...args);
      const time = Date.now() - start.getTime();
      console.log(`done in ${time}ms`);
      return build;
    } catch (error) {
      console.log('error');
      console.error(error);
    }

    return null;
  }

  startWatcher (callback) {
    // Load chokidar lazily.
    const chokidar = require('chokidar');
    callback(this.tryBuild());
    chokidar.watch([
      `${this.extensionsRoot}/**/*`,
      `${this.imagesRoot}/**/*`,
      `${this.websiteRoot}/**/*`,
      `${this.docsRoot}/**/*`,
    ], {
      ignoreInitial: true
    }).on('all', () => {
      callback(this.tryBuild());
    });
  }

  validate () {
    const errors = [];
    const build = this.build();
    for (const [fileName, file] of Object.entries(build.files)) {
      try {
        file.validate();
      } catch (e) {
        errors.push({
          fileName,
          error: e
        });
      }
    }
    return errors;
  }
}

module.exports = Builder;
