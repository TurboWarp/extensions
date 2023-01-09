const ejs = require('ejs');
const fs = require('fs');
const pathUtil = require('path');

const IMAGE_EXTENSIONS = ['png', 'jpg', 'svg'];

const iterateDirectory = (directory) => fs.readdirSync(directory)
  .map(filename => [filename, pathUtil.join(directory, filename)]);

const ejsSyncRender = (path, data) => {
  const inputEJS = fs.readFileSync(path, 'utf-8');
  const outputHTML = ejs.render(inputEJS, data);
  return outputHTML;
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
  // TODO: we can add some code to eg. show a message when the extension was modified on disk?
}

class EJSFile {
  constructor (path, data) {
    this.path = path;
    this.data = data;
  }

  getType () {
    return '.html';
  }

  read () {
    return ejsSyncRender(this.path, this.data);
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
   * @param {boolean} isProduction True if this is a production build, false for development.
   */
  constructor (isProduction) {
    this.isProduction = isProduction;
    this.extensionsRoot = pathUtil.join(__dirname, '..', 'extensions');
    this.websiteRoot = pathUtil.join(__dirname, '..', 'website');
    this.imagesRoot = pathUtil.join(__dirname, '..', 'images');
  }

  build () {
    const build = new Build();

    const images = {};
    for (const [imageFilename, path] of iterateDirectory(this.imagesRoot)) {
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
    for (const [extensionFilename, path] of iterateDirectory(this.extensionsRoot)) {
      if (!extensionFilename.endsWith('.js')) {
        continue;
      }
      const file = new ExtensionFile(path);
      extensionFiles.push(file);
      build.files[`/${extensionFilename}`] = file;
    }

    const mostRecentExtensions = extensionFiles
      .sort((a, b) => b.getLastModified() - a.getLastModified())
      .slice(0, 5)
      .map((file) => pathUtil.basename(file.getDiskPath()));

    const ejsData = {
      isProduction: this.isProduction,
      host: this.isProduction ? 'https://extensions.turbowarp.org/' : 'http://localhost:8000/',
      mostRecentExtensions: mostRecentExtensions,
      extensionImages: images
    };

    for (const [websiteFilename, path] of iterateDirectory(this.websiteRoot)) {
      if (websiteFilename.endsWith('.ejs')) {
        const realFilename = websiteFilename.replace('.ejs', '.html');
        build.files[`/${realFilename}`] = new EJSFile(path, ejsData);
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
