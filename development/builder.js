const fs = require('fs');
const pathUtil = require('path');
const renderTemplate = require('./render-template');

/**
 * @typedef {'development'|'production'|'desktop'} Mode
 */

const IMAGE_EXTENSIONS = ['png', 'jpg', 'svg'];

/**
 * Recursively read a directory.
 * @param {string} directory
 * @returns {Array<[string, string]>} List of tuples [name, absolutePath].
 * The return result includes files in subdirectories, but not the subdirectories themselves.
 */
const readDirectory = (directory) => {
  const result = [];
  for (const name of fs.readdirSync(directory)) {
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
}

class ExtensionFile extends DiskFile {
  constructor (relativePath, path) {
    super(path);
    this.relativePath = relativePath;
  }

  // TODO: we can add some code to eg. show a message when the extension was modified on disk?
}

class HTMLFile {
  constructor (path, data) {
    this.path = path;
    this.data = data;
  }

  getType () {
    return '.html';
  }

  read () {
    return renderTemplate(this.path, this.data);
  }
}

class Build {
  constructor () {
    this.files = {};
  }

  getFile (path) {
    return this.files[path] || this.files[`${path}index.html`] || null;
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
      if (!IMAGE_EXTENSIONS.some(extension => imageFilename.endsWith(`.${extension}`))) {
        continue;
      }
      const extensionId = imageFilename.split('.')[0];
      if (extensionId !== 'unknown') {
        images[extensionId] = imageFilename;
      }
      build.files[`/images/${imageFilename}`] = new DiskFile(path);
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
}

module.exports = Builder;
