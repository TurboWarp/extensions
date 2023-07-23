const fs = require('fs');
const pathUtil = require('path');
const sizeOfImage = require('image-size');
const renderTemplate = require('./render-template');
const compatibilityAliases = require('./compatibility-aliases');

/**
 * @typedef {'development'|'production'|'desktop'} Mode
 */

/**
 * Recursively read a directory.
 * @param {string} directory
 * @returns {Array<[string, string]>} List of tuples [name, absolutePath].
 * The return result includes files in subdirectories, but not the subdirectories themselves.
 */
const readDirectory = (directory) => {
  const result = [];
  for (const name of fs.readdirSync(directory)) {
    if (name.startsWith('.')) {
      // Ignore .eslintrc.js, .DS_Store, etc.
      continue;
    }
    const absolutePath = pathUtil.join(directory, name);
    const stat = fs.statSync(absolutePath);
    if (stat.isDirectory()) {
      for (const [relativeToChildName, childAbsolutePath] of readDirectory(absolutePath)) {
        // This always needs to use / on all systems
        result.push([`${name}/${relativeToChildName}`, childAbsolutePath]);
      }
    } else {
      result.push([name, absolutePath]);
    }
  }
  return result;
};

class DiskFile {
  constructor (path) {
    this.path = path;
  }

  getDiskPath () {
    return this.path;
  }

  getLastModified () {
    return fs.statSync(this.path).mtimeMs;
  }

  read () {
    return fs.readFileSync(this.path);
  }

  validate () {
    // no-op
  }
}

class ExtensionFile extends DiskFile {
  constructor (relativePath, path) {
    super(path);
    this.relativePath = relativePath;
  }

  // TODO: we can add some code to eg. show a message when the extension was modified on disk?
}

class HTMLFile extends DiskFile {
  constructor (path, data) {
    super(path);
    this.data = data;
    // force development server to use read()
    this.getDiskPath = null;
  }

  getType () {
    return '.html';
  }

  read () {
    return renderTemplate(this.path, this.data);
  }
}

class ImageFile extends DiskFile {
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

class SitemapFile extends DiskFile {
  constructor (build) {
    super(null);
    this.getDiskPath = null;
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

class Build {
  constructor () {
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

    this.extensionsRoot = pathUtil.join(__dirname, '..', 'extensions');
    this.websiteRoot = pathUtil.join(__dirname, '..', 'website');
    this.imagesRoot = pathUtil.join(__dirname, '..', 'images');
  }

  build () {
    const build = new Build();

    const images = {};
    for (const [imageFilename, path] of readDirectory(this.imagesRoot)) {
      const extension = pathUtil.extname(imageFilename);
      const ImageFileClass = IMAGE_FORMATS.get(extension);
      if (!ImageFileClass) {
        continue;
      }
      const extensionId = imageFilename.split('.')[0];
      if (extensionId !== 'unknown') {
        images[extensionId] = imageFilename;
      }
      build.files[`/images/${imageFilename}`] = new ImageFileClass(path);
    }

    const extensionFiles = [];
    for (const [extensionFilename, path] of readDirectory(this.extensionsRoot)) {
      if (!extensionFilename.endsWith('.js')) {
        continue;
      }
      const file = new ExtensionFile(extensionFilename, path);
      extensionFiles.push(file);
      build.files[`/${extensionFilename}`] = file;
    }

    for (const [oldPath, newPath] of Object.entries(compatibilityAliases)) {
      build.files[oldPath] = build.files[newPath];
    }

    if (this.mode !== 'desktop') {
      build.files['/sitemap.xml'] = new SitemapFile(build);
    }

    const mostRecentExtensions = extensionFiles
      .sort((a, b) => b.getLastModified() - a.getLastModified())
      .slice(0, 5)
      .map((file) => file.relativePath);

    const ejsData = {
      mode: this.mode,
      host: this.mode === 'development' ? 'http://localhost:8000/' : 'https://extensions.turbowarp.org/',
      mostRecentExtensions: mostRecentExtensions,
      extensionImages: images
    };

    for (const [websiteFilename, path] of readDirectory(this.websiteRoot)) {
      if (websiteFilename.endsWith('.ejs')) {
        const realFilename = websiteFilename.replace('.ejs', '.html');
        build.files[`/${realFilename}`] = new HTMLFile(path, ejsData);
      } else {
        build.files[`/${websiteFilename}`] = new DiskFile(path);
      }
    }

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
    } catch (e) {
      console.log('error');
      console.error(e);
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
