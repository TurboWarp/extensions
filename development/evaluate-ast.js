/**
 * @param {import('acorn').Node} node
 * @returns {unknown}
 */
const evaluateAST = (node) => {
  if (node.type == "Literal") {
    return node.value;
  }

  if (node.type === "ObjectExpression") {
    const object = {};
    for (const { key, value } of node.properties) {
      // Normally Identifier refers to a variable, but inside of key we treat it as a string.
      let evaluatedKey;
      if (key.type === "Identifier") {
        evaluatedKey = key.name;
      } else {
        evaluatedKey = evaluateAST(key);
      }

      object[evaluatedKey] = evaluateAST(value);
    }
    return object;
  }

  console.error(`Can't evaluate node:`, node);
  throw new Error(`Can't evaluate ${node.type} node at build-time`);
};

export default evaluateAST;
