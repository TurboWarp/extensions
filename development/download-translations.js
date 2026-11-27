import * as pathUtil from "node:path";
import * as fs from "node:fs";
import {
  transifexApi,
  ORGANIZATION_NAME,
  PROJECT_NAME,
  RUNTIME_RESOURCE,
  METADATA_RESOURCE,
  SOURCE_LOCALE,
} from "./transifex-common.js";

/**
 * @template T
 * @param {T} obj
 * @returns {T} obj but keys are sorted
 */
const withSortedKeyOrder = (obj) => {
  const result = {};
  for (const key of Object.keys(obj).sort()) {
    const value = obj[key];
    if (typeof value === "object") {
      result[key] = withSortedKeyOrder(obj);
    } else {
      result[key] = value;
    }
  }
  return result;
};

/**
 * @param {string} resource
 * @returns {Promise<Record<string, number>>}
 */
const getResourceStatistics = async (resource) => {
  const iterator = transifexApi.resource_language_stats
    .filter({
      project: `o:${ORGANIZATION_NAME}:p:${PROJECT_NAME}`,
      resource: `o:${ORGANIZATION_NAME}:p:${PROJECT_NAME}:r:${resource}`,
    })
    .all();
  const locales = {};
  for await (const languageData of iterator) {
    const localeCode = languageData.id.match(/\bl:([\w\d-]+)/)[1];
    const translatedStrings = languageData.attributes.translated_strings;
    locales[localeCode] = translatedStrings;
  }
  return withSortedKeyOrder(locales);
};

/**
 * @param {object} strings JSON with { string: string, developer_comment: string } values.
 * @returns {object} JSON with string values.
 */
const removeDeveloperComments = (strings) => {
  const result = {};
  for (const [key, value] of Object.entries(strings)) {
    if (typeof value.string === "string") {
      result[key] = value.string;
    } else {
      result[key] = removeDeveloperComments(value);
    }
  }
  return result;
};

/**
 * @param {object} strings
 * @returns {object}
 */
const removeEmptyTranslations = (strings) => {
  const result = {};
  for (const [key, value] of Object.entries(strings)) {
    if (typeof value === "object") {
      result[key] = removeEmptyTranslations(value);
    } else if (value !== "") {
      result[key] = value;
    }
  }
  return result;
};

/**
 * @param {object} source
 * @param {object} translated
 * @returns {object}
 */
const removeUnchangedTranslations = (source, translated) => {
  const result = {};
  for (const [key, translatedValue] of Object.entries(translated)) {
    const sourceValue = source[key];
    if (typeof translatedValue === "object") {
      const recursiveResult = removeUnchangedTranslations(
        sourceValue,
        translatedValue
      );
      if (Object.keys(recursiveResult).length > 0) {
        result[key] = recursiveResult;
      }
    } else if (translatedValue !== sourceValue) {
      result[key] = translatedValue;
    }
  }
  return result;
};

/**
 * @param {string} string
 * @returns {Set<string>} All placeholders in the string.
 */
const getPlaceholders = (string) => {
  const result = new Set();
  for (const match of string.matchAll(/\[(.+?)\]/g)) {
    result.add(match[1]);
  }
  return result;
};

/**
 * @param {string} source
 * @param {string} translated
 * @returns {string[]} Human-readable issues.
 */
const validateTranslation = (source, translated) => {
  const stringProblems = [];

  const sourcePlaceholders = getPlaceholders(source);
  const translatedPlaceholders = getPlaceholders(translated);

  for (const placeholder of sourcePlaceholders) {
    if (!translatedPlaceholders.has(placeholder)) {
      stringProblems.push(`Missing placeholder [${placeholder}]`);
    }
  }

  for (const placeholder of translatedPlaceholders) {
    if (!sourcePlaceholders.has(placeholder)) {
      stringProblems.push(`Using unknown placeholder [${placeholder}]`);
    }
  }

  return stringProblems;
};

/**
 * @param {object} source
 * @param {object} translated
 * @returns {object}
 */
const removeBrokenTranslations = (source, translated) => {
  const validatedStrings = {};
  const localeProblems = [];

  for (const [key, translatedValue] of Object.entries(translated)) {
    const sourceValue = source[key];
    if (typeof translatedValue === "object") {
      const recursiveResult = removeBrokenTranslations(
        sourceValue,
        translatedValue
      );
      if (Object.keys(recursiveResult.validatedStrings).length > 0) {
        validatedStrings[key] = recursiveResult.validatedStrings;
      }
      for (const p of recursiveResult.localeProblems) {
        localeProblems.push(`${key} / ${p}`);
      }
    } else if (typeof sourceValue !== "string") {
      localeProblems.push(`${key} / No matching source string`);
    } else {
      const stringProblems = validateTranslation(sourceValue, translatedValue);
      if (stringProblems.length === 0) {
        validatedStrings[key] = translatedValue;
      } else {
        for (const p of stringProblems) {
          localeProblems.push(`${key} / ${p}`);
        }
      }
    }
  }

  return {
    validatedStrings,
    localeProblems,
  };
};

/**
 * @param {number} ms
 * @returns {Promise<void>}
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * @param {string} url
 * @returns {Promise<object>} JSON response
 */
const persistentFetch = async (url) => {
  for (let i = 0; i < 5; i++) {
    try {
      const res = await fetch(url);
      const json = await res.json();
      return json;
    } catch (e) {
      const sleepFor = Math.random() * 2 ** i * 1000;
      await sleep(sleepFor);
    }
  }
};

/**
 * @param {string} resource
 * @param {string} locale
 * @returns {Promise<object>}
 */
const downloadTranslatedResource = async (resource, locale) => {
  console.log(`Starting download request for ${resource} ${locale}`);

  let urlToDownload;
  if (locale === SOURCE_LOCALE) {
    urlToDownload = await transifexApi.ResourceStringsAsyncDownload.download({
      resource: {
        data: {
          id: `o:${ORGANIZATION_NAME}:p:${PROJECT_NAME}:r:${resource}`,
          type: "resources",
        },
      },
    });
  } else {
    urlToDownload =
      await transifexApi.ResourceTranslationsAsyncDownload.download({
        mode: "onlytranslated",
        resource: {
          data: {
            id: `o:${ORGANIZATION_NAME}:p:${PROJECT_NAME}:r:${resource}`,
            type: "resources",
          },
        },
        language: {
          data: {
            id: `l:${locale}`,
            type: "languages",
          },
        },
      });
  }

  console.log(`Started download request for ${resource} ${locale}`);
  const rawTranslations = await persistentFetch(urlToDownload);

  console.log(`Downloaded data for ${resource} ${locale}`);
  const withoutDeveloperComments = removeDeveloperComments(rawTranslations);
  const withoutEmptyTranslations = removeEmptyTranslations(
    withoutDeveloperComments
  );
  const sortedTranslations = withSortedKeyOrder(withoutEmptyTranslations);
  return sortedTranslations;
};

/**
 * @param {string} resource
 * @returns {Promise<{strings: object; resourceProblems: string[]}>}
 */
const downloadAllResourceTranslations = async (resource) => {
  const transifexStatistics = await getResourceStatistics(resource);
  const localesToFetch = [];
  for (const [locale, translatedStringCount] of Object.entries(
    transifexStatistics
  )) {
    if (translatedStringCount > 0) {
      localesToFetch.push(locale);
    }
  }

  const entries = await Promise.all(
    localesToFetch.map(async (locale) => {
      const translatedStrings = await downloadTranslatedResource(
        resource,
        locale
      );
      return [locale, translatedStrings];
    })
  );

  const sourceStrings = entries.find((i) => i[0] === SOURCE_LOCALE)[1];
  const strings = {};
  const resourceProblems = [];

  for (const [locale, localeStrings] of entries) {
    if (locale !== SOURCE_LOCALE) {
      const filteredStrings = removeUnchangedTranslations(
        sourceStrings,
        localeStrings
      );
      const { validatedStrings, localeProblems } = removeBrokenTranslations(
        sourceStrings,
        filteredStrings
      );
      const normalizedLocale = locale.toLowerCase().replace(/_/g, "-");
      strings[normalizedLocale] = validatedStrings;
      for (const p of localeProblems) {
        resourceProblems.push(`${resource} / ${locale} / ${p}`);
      }
    }
  }

  return {
    strings,
    resourceProblems,
  };
};

const run = async () => {
  console.log("This is going to take a while.");

  const [runtime, metadata] = await Promise.all([
    downloadAllResourceTranslations(RUNTIME_RESOURCE),
    downloadAllResourceTranslations(METADATA_RESOURCE),
  ]);

  const allProblems = [
    ...runtime.resourceProblems,
    ...metadata.resourceProblems,
  ].sort();

  let warnings = "";
  if (allProblems.length > 0) {
    warnings = [
      `# ${allProblems.length} ${allProblems.length === 1 ? "string" : "strings"} skipped due to translation errors`,
      "",
      ...allProblems.map((problem) => ` * ${problem}`),
      "",
    ].join("\n");
    console.warn(warnings);
  }
  fs.writeFileSync(
    pathUtil.join(import.meta.dirname, "../download-warnings.txt"),
    warnings
  );

  fs.writeFileSync(
    pathUtil.join(
      import.meta.dirname,
      "../translations/extension-runtime.json"
    ),
    JSON.stringify(runtime.strings, null, 4)
  );

  fs.writeFileSync(
    pathUtil.join(
      import.meta.dirname,
      "../translations/extension-metadata.json"
    ),
    JSON.stringify(metadata.strings, null, 4)
  );
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
