import * as espree from "espree";
import esquery from "esquery";
import parseMetadata from "./parse-extension-metadata.js";
import evaluateAST from "./evaluate-ast.js";

/**
 * @fileoverview Parses extension code to find calls to Scratch.translate() and statically
 * evaluate its arguments.
 */

/**
 * Generate default ID for a translation that has no explicit ID.
 * @param {string} string
 * @returns {string}
 */
const defaultIdForString = (string) => {
  // hardcoded in VM
  return `_${string}`;
};

/**
 * @param {string} js
 * @returns {Record<string, TranslatableString>}
 */
const parseTranslations = (js) => {
  const metadata = parseMetadata(js);
  if (!metadata.name) {
    throw new Error(`Extension needs a // Name: to generate translations`);
  }

  let defaultDescription = `Part of the '${metadata.name}' extension.`;
  if (metadata.context) {
    defaultDescription += ` ${metadata.context}`;
  }

  const ast = espree.parse(js, {
    ecmaVersion: 2022,
  });
  const selector = esquery.parse(
    'CallExpression[callee.object.name="Scratch"][callee.property.name="translate"]'
  );
  const matches = esquery.match(ast, selector);

  const result = {};
  for (const match of matches) {
    const args = match.arguments;
    if (args.length === 0) {
      throw new Error(`Scratch.translate() needs at least 1 argument`);
    }

    const evaluated = evaluateAST(args[0]);

    let id;
    let english;
    let description;

    if (typeof evaluated === "string") {
      id = defaultIdForString(evaluated);
      english = evaluated;
      description = defaultDescription;
    } else if (typeof evaluated === "object" && evaluated !== null) {
      english = evaluated.default;
      id = evaluated.id || defaultIdForString(english);

      description = [defaultDescription, evaluated.description]
        .filter((i) => i)
        .join(" ");
    } else {
      throw new Error(
        `Not a valid argument for Scratch.translate(): ${evaluated}`
      );
    }

    if (typeof id !== "string") {
      throw new Error(
        `Scratch.translate() passed a value for id that is not a string: ${id}`
      );
    }
    if (typeof english !== "string") {
      throw new Error(
        `Scratch.translate() passed a value for default that is not a string: ${english}`
      );
    }
    if (typeof description !== "string") {
      throw new Error(
        `Scratch.translate() passed a value for description that is not a string: ${description}`
      );
    }

    result[id] = {
      string: english,
      developer_comment: description,
    };
  }

  return result;
};

export default parseTranslations;
