const fs = require("fs");
const path = require("path");
const https = require("https");
const fsUtils = require("./fs-utils");
const parseMetadata = require("./parse-extension-metadata");

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
const getUserID = (username) =>
  new Promise((resolve, reject) => {
    process.stdout.write(`Getting user ID for ${username}... `);
    const request = https.get(`https://api.scratch.mit.edu/users/${username}`);

    request.on("response", (response) => {
      const data = [];
      response.on("data", (newData) => {
        data.push(newData);
      });

      response.on("end", () => {
        const allData = Buffer.concat(data);
        const json = JSON.parse(allData.toString("utf-8"));
        const userID = String(json.id);
        process.stdout.write(`${userID}\n`);
        resolve(userID);
      });

      response.on("error", (error) => {
        process.stdout.write("error\n");
        reject(error);
      });
    });

    request.on("error", (error) => {
      process.stdout.write("error\n");
      reject(error);
    });

    request.end();
  });

const run = async () => {
  /**
   * @type {Map<string, AggregatePersonInfo>}
   */
  const aggregate = new Map();

  const extensionRoot = path.resolve(__dirname, "../extensions/");
  for (const [name, absolutePath] of fsUtils.recursiveReadDirectory(
    extensionRoot
  )) {
    if (!name.endsWith(".js")) {
      continue;
    }

    const code = fs.readFileSync(absolutePath, "utf-8");
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
