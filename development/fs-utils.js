const fs = require("fs");
const pathUtil = require("path");

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

/**
 * Synchronous create a directory and any parents. Does nothing if the folder already exists.
 * @param {string} directory
 */
const mkdirp = (directory) => {
  try {
    fs.mkdirSync(directory, {
      recursive: true,
    });
  } catch (e) {
    if (e.code !== "ENOENT") {
      throw e;
    }
  }
};

module.exports = {
  recursiveReadDirectory,
  mkdirp,
};
