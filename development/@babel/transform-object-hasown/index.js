const t = require("@babel/core").types;

module.exports = function () {
  return {
    visitor: {
      CallExpression(path) {
        if (!path.get("callee").matchesPattern("Object.hasOwn")) {
          return;
        }
        path
          .get("callee")
          .replaceWith(t.identifier("Object.prototype.hasOwnProperty.call"));
      },
    },
  };
};
