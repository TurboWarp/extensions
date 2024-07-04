import * as fs from "node:fs/promises";
import pathUtil from "node:path";

/**
 * Recursively read a directory.
 * @param {string} directory
 * @returns {Promise<Array<[string, string]>>} List of tuples [name, absolutePath].
 * The return result includes files in subdirectories, but not the subdirectories themselves.
 */
const recursiveReadDirectory = async (directory) => {
  const result = [];
  for (const name of await fs.readdir(directory)) {
    if (name.startsWith(".")) {
      // Ignore .eslintrc.js, .DS_Store, etc.
      continue;
    }
    const absolutePath = pathUtil.join(directory, name);
    const stat = await fs.stat(absolutePath);
    if (stat.isDirectory()) {
      for (const [
        relativeToChildName,
        childAbsolutePath,
      ] of await recursiveReadDirectory(absolutePath)) {
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
const mkdirp = async (directory) => {
  try {
    await fs.mkdir(directory, {
      recursive: true,
    });
  } catch (e) {
    if (e.code !== "ENOENT") {
      throw e;
    }
  }
};

export { recursiveReadDirectory, mkdirp };
