class Person {
  constructor (name, link) {
    /** @type {string} */
    this.name = name;
    /** @type {string|null} */
    this.link = link;
  }

  toHTML () {
    // Don't need to bother escaping here. There's no vulnerability.
    if (this.link) {
      return `<a href="${this.link}">${this.name}</a>`;
    }
    return this.name;
  }
}

class Extension {
  constructor () {
    this.id = '';
    this.name = '';
    this.description = '';
    /** @type {Person[]} */
    this.by = [];
    /** @type {Person[]} */
    this.original = [];
  }
}

/**
 * @param {string} string
 * @param {string} split
 * @returns {string[]}
 */
const splitFirst = (string, split) => {
  const idx = string.indexOf(split);
  if (idx === -1) {
    return [string];
  }
  return [string.substring(0, idx), string.substring(idx + split.length)];
};

/**
 * @param {string} person
 * @returns {Person}
 */
const parsePerson = (person) => {
  const parts = splitFirst(person, '<');
  if (parts.length === 1) {
    return new Person(person, null);
  }

  const name = parts[0].trim();
  const link = parts[1].replace('>', '');
  return new Person(name, link);
};

/**
 * @param {string} extensionCode
 * @return {Extension}
 */
const parseMetadata = (extensionCode) => {
  const metadata = new Extension();

  for (const line of extensionCode.split('\n')) {
    if (!line.startsWith('//')) {
      // End of header.
      break;
    }

    const withoutComment = line.substring(2).trim();
    const parts = splitFirst(withoutComment, ':');
    if (parts.length === 1) {
      // Invalid.
      continue;
    }

    const key = parts[0].toLowerCase().trim();
    const value = parts[1].trim();

    switch (key) {
      case 'name':
        metadata.name = value;
        break;
      case 'description':
        metadata.description = value;
        break;
      case 'by':
        metadata.by.push(parsePerson(value));
        break;
      case 'original':
        metadata.original.push(parsePerson(value));
        break;
      default:
        // TODO
        break;
    }
  }

  return metadata;
};

module.exports = parseMetadata;
