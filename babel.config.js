const path = require("path");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [],
    plugins: [
      "@babel/plugin-transform-logical-assignment-operators",
      path.resolve("./development/@babel/transform-object-hasown"),
      "@babel/plugin-syntax-typescript",
    ],
  };
};
