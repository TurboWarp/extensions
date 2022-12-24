const ejs = require('ejs');
const fs = require('fs');
const pathUtil = require('path');
const chokidar = require('chokidar');

const ejsSyncRender = (path, data = {}) => {
  const inputEJS = fs.readFileSync(path, 'utf-8');
  const outputHTML = ejs.render(inputEJS, data);
  return outputHTML;
};

const recursiveCopyDirectory = (from, to) => {
  // TODO: we can probably do something like rsync and look at mtime to not copy files unnecessarily
  fs.cpSync(from, to, {recursive: true});
};

class Builder {
  /**
   * @param {boolean} isProduction True if this is a production build, false for development.
   */
  constructor (isProduction) {
    this.isProduction = isProduction;
    this.outputRoot = pathUtil.join(__dirname, '..', 'build');
    this.extensionsRoot = pathUtil.join(__dirname, '..', 'extensions');
    this.websiteRoot = pathUtil.join(__dirname, '..', 'website');
    this.imagesRoot = pathUtil.join(__dirname, '..', 'images');
  }

  clean () {
    try {
      fs.rmSync(this.outputRoot, {
        recursive: true
      });
    } catch (e) {
      // If the folder just didn't exist, don't throw an error.
      if (e.code !== 'ENOENT') {
        throw e;
      }
    }
    fs.mkdirSync(this.outputRoot, {
      recursive: true
    });
  }

  build () {
    recursiveCopyDirectory(this.extensionsRoot, this.outputRoot);
    recursiveCopyDirectory(this.websiteRoot, this.outputRoot);
    recursiveCopyDirectory(this.imagesRoot, pathUtil.join(this.outputRoot, 'images'));

    const ejsData = {
      isProduction: this.isProduction,
      host: this.isProduction ? 'https://extensions.turbowarp.org/' : 'http://localhost:8000/'
    };
    fs.writeFileSync(
      pathUtil.join(this.outputRoot, 'index.html'),
      ejsSyncRender(pathUtil.join(this.websiteRoot, 'index.ejs'), ejsData)
    );
  }

  tryBuild (...args) {
    const now = new Date();
    console.log(`[${now.toLocaleTimeString()}] Building...`);

    try {
      this.build(...args);
    } catch (e) {
      console.error(e);
    }
  }

  startWatcher () {
    this.clean();
    this.tryBuild();

    chokidar.watch(`${this.extensionsRoot}/**/*`, {ignoreInitial: true})
      .on('all', () => {
        this.tryBuild();
      });

    chokidar.watch(`${this.imagesRoot}/**/*`, {ignoreInitial: true})
      .on('all', () => {
        this.tryBuild();
      });

    chokidar.watch(`${this.websiteRoot}/**/*`, {ignoreInitial: true})
      .on('all', () => {
        this.tryBuild();
      });
  }
}

module.exports = Builder;
