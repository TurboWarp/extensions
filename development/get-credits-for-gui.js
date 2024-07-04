import { readFile } from "node:fs/promises";
import { recursiveReadDirectory } from "./fs-utils.js";
import parseMetadata from "./parse-extension-metadata.js";
import pathUtil from "node:path";
import urlUtil from "node:url";

const dirname = pathUtil.dirname(urlUtil.fileURLToPath(import.meta.url));

class AggregatePersonInfo {
  /** @param {Person} person */
  constructor(person) {
    this.name = person.name;

    /** @type {Set<string>} */
    this.links = new Set();
  }

  /** @param {string} link */
  addLink(link) {
    this.links.add(link);
  }
}

/**
 * @param {string} username
 * @returns {Promise<string>}
 */
const getUserID = async (username) => {
  process.stdout.write(`Getting user ID for ${username}... `);
  const request = await fetch(`https://api.scratch.mit.edu/users/${username}`);
  try {
    const json = await request.json();
    const userID = String(json.id);
    process.stdout.write(`${userID}\n`);
    return userID;
  } catch (e) {
    process.stdout.write("error\n");
    throw e;
  }
};

const run = async () => {
  /**
   * @type {Map<string, AggregatePersonInfo>}
   */
  const aggregate = new Map();

  const extensionRoot = pathUtil.resolve(dirname, "../extensions/");
  for (const [name, absolutePath] of await recursiveReadDirectory(
    extensionRoot
  )) {
    if (!name.endsWith(".js")) {
      continue;
    }

    const code = await readFile(absolutePath, "utf-8");
    const metadata = parseMetadata(code);

    for (const person of [...metadata.by, ...metadata.original]) {
      const personID = person.name.toLowerCase();
      if (!aggregate.has(personID)) {
        aggregate.set(personID, new AggregatePersonInfo(person));
      }

      if (person.link) {
        aggregate.get(personID).addLink(person.link);
      }
    }
  }

  const result = [];

  for (const id of [...aggregate.keys()].sort()) {
    const info = aggregate.get(id);

    if (info.links.size > 0) {
      const link = [...info.links.values()].sort()[0];
      const username = link.match(/users\/(.+?)\/?$/)[1];
      const userID = await getUserID(username);
      result.push({
        userID,
        username,
      });
    } else {
      result.push({
        username: info.name,
      });
    }
  }

  return result;
};

run()
  .then((result) => {
    console.log(JSON.stringify(result, null, 4));
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
