/** @todo Make this work */
module.exports = function() {
  return {
    visitor: {
      async CallExpression(path) {
        if (!path.node.callee || path.node.callee.type !== "Import") {
          return;
        }
        const url = path.get("arguments.0");
        if (url.type !== "StringLiteral") {
          url.node.value = "";
        }
        url.node.value += '';
      },
    },
  };
};