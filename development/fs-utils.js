import * as fsPromises from "node:fs/promises";
import * as pathUtil from "node:path";

/**
 * Recursively read a directory.
 * @param {string} directory
 * @returns {Promise<Array<[string, string]>>} List of tuples [name, absolutePath].
 * The return result includes files in subdirectories, but not the subdirectories themselves.
 */
export const recursiveReadDirectory = async (directory) => {
  const result = [];
  for (const name of await fsPromises.readdir(directory)) {
    if (name.startsWith(".")) {
      // Ignore .eslintrc.js, .DS_Store, etc.
      continue;
    }
    const absolutePath = pathUtil.join(directory, name);
    const stat = await fsPromises.stat(absolutePath);
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
 * @returns {Promise<void>}
 */
export const mkdirp = async (directory) => {
  try {
    await fsPromises.mkdir(directory, {
      recursive: true,
    });
  } catch (e) {
    if (e.code !== "ENOENT") {
      throw e;
    }
  }
};
