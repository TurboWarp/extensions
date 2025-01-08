const js = require("@eslint/js");
const globals = require("globals");
const esquery = require("esquery");

const reportQueryMatches = (context, ast, selector, message) => {
  const parsedSelector = esquery.parse(selector);
  const matches = esquery.match(ast, parsedSelector);
  for (const match of matches) {
    context.report({
      node: match,
      message,
    });
  }
};

/**
 * Allows creating new rules using same lgoic as ESLint no-restricted-syntax.
 * @param {Array<{selector: string; message: string;}>} rules
 */
const createQueryRule = (rules) => ({
  create: (context) => ({
    Program: (node) => {
      for (const rule of rules) {
        reportQueryMatches(context, node, rule.selector, rule.message);
      }
    },
  }),
});

module.exports = [
  // Base on eslint recommended
  js.configs.recommended,

  // Common for all files
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
    },
    rules: {
      // Unused variables commonly indicate logic errors
      "no-unused-vars": [
        "error",
        {
          // Unused arguments are useful, eg. it can be nice for blocks to accept `args` even if they don't use it
          args: "none",
          // Allow silently eating try { } catch (e) { }
          caughtErrors: "none",
          // Variables starting with _ are intentionally unused
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      // Allow while (true) { }
      "no-constant-condition": [
        "error",
        {
          checkLoops: false,
        },
      ],
      // Allow empty catch {} blocks
      "no-empty": [
        "error",
        {
          allowEmptyCatch: true,
        },
      ],
      // Returning a value from a constructor() implies a mistake
      "no-constructor-return": "error",
      // new Promise(async () => {}) implies a mistake
      "no-async-promise-executor": "warn",
      // x === x implies a mistake
      "no-self-compare": "error",
      // Using ${...} in a non-template-string implies a mistake
      "no-template-curly-in-string": "error",
      // Loops that only iterate once imply a mistake
      "no-unreachable-loop": "error",
      // Detect some untrusted code execution
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-script-url": "error",
      // Combinations of || and && are unreadable and may not do what you expect
      "no-mixed-operators": [
        "error",
        {
          groups: [["&&", "||"]],
        },
      ],
      // Disallow async functions that don't need to be. This is important as a Promise and non-Promise return value
      // significantly impacts the behavior of projects.
      "require-await": "error",
    },
  },

  // For development server
  {
    files: ["development/**"],
    languageOptions: {
      globals: {
        ...globals.commonjs,
        ...globals.node,
      },
    },
  },

  // For extensions
  {
    files: ["extensions/**"],
    languageOptions: {
      globals: {
        ...globals.browser,
        Blockly: "readonly",
        Scratch: "readonly",
        ScratchBlocks: "readonly",
        ScratchExtensions: "readonly",
        scaffolding: "readonly",
      },
    },
    plugins: {
      extension: {
        rules: {
          "no-new-syntax": createQueryRule([
            {
              selector: 'AssignmentExpression[operator="??="]',
              message: "x ??= y syntax is too new; use x = x ?? y intead",
            },
            {
              selector:
                "MemberExpression[object.name=Object][property.name=hasOwn]",
              message:
                "Object.hasOwn(...) is too new; use Object.prototype.hasOwnProperty.call(...) instead",
            },
          ]),
          "no-xmlhttprequest": createQueryRule([
            {
              selector: "NewExpression[callee.name=XMLHttpRequest]",
              message: "Use Scratch.fetch() instead of XMLHttpRequest",
            },
          ]),
          iife: createQueryRule([
            {
              selector:
                "Program > :not(ExpressionStatement[expression.type=CallExpression][expression.callee.type=/FunctionExpression/])",
              message:
                "All extension code must be within (function (Scratch) { ... })(Scratch);",
            },
          ]),
          "use-scratch-vm": createQueryRule([
            {
              selector:
                "MemberExpression[object.name=window][property.name=vm]",
              message: "Use Scratch.vm instead of window.vm",
            },
          ]),
          "use-scratch-fetch": createQueryRule([
            {
              selector: "CallExpression[callee.name=fetch]",
              message: "Use Scratch.fetch() instead of fetch()",
            },
            {
              selector:
                "CallExpression[callee.object.name=window][callee.property.name=fetch]",
              message: "Use Scratch.fetch() instead of window.fetch()",
            },
          ]),
          "use-scratch-open-window": createQueryRule([
            {
              selector: "CallExpression[callee.name=open]",
              message: "Use Scratch.openWindow() instead of open()",
            },
            {
              selector:
                "CallExpression[callee.object.name=window][callee.property.name=open]",
              message: "Use Scratch.openWindow() instead of window.open()",
            },
          ]),
          "use-scratch-redirect": createQueryRule([
            {
              selector:
                "AssignmentExpression[left.object.name=location][left.property.name=href]",
              message: "Use Scratch.redirect() instead of location.href = ...",
            },
            {
              selector:
                "AssignmentExpression[left.object.object.name=window][left.object.property.name=location][left.property.name=href]",
              message:
                "Use Scratch.redirect() instead of window.location.href = ...",
            },
            {
              selector: "AssignmentExpression[left.name=location]",
              message: "Use Scratch.redirect() instead of location = ...",
            },
            {
              selector:
                "AssignmentExpression[left.object.name=window][left.property.name=location]",
              message:
                "Use Scratch.redirect() instead of window.location = ...",
            },
            {
              selector:
                "CallExpression[callee.object.name=location][callee.property.name=assign]",
              message: "Use Scratch.redirect() instead of location.assign()",
            },
            {
              selector:
                "CallExpression[callee.object.object.name=window][callee.object.property.name=location][callee.property.name=assign]",
              message:
                "Use Scratch.redirect() instead of window.location.assign()",
            },
            {
              selector:
                "CallExpression[callee.object.name=location][callee.property.name=replace]",
              message: "Use Scratch.redirect() instead of location.replace()",
            },
            {
              selector:
                "CallExpression[callee.object.object.name=window][callee.object.property.name=location][callee.property.name=replace]",
              message:
                "Use Scratch.redirect() instead of window.location.replace()",
            },
          ]),
          "check-can-fetch": createQueryRule([
            {
              selector: "NewExpression[callee.name=WebSocket]",
              message:
                "Ensure that `await Scratch.canFetch(url)` is checked first, then add // eslint-disable-next-line no-restricted-syntax",
            },
            {
              selector: "NewExpression[callee.name=Image]",
              message:
                "Ensure that `await Scratch.canFetch(url)` is checked first, then add // eslint-disable-next-line no-restricted-syntax",
            },
            {
              selector: "NewExpression[callee.name=Audio]",
              message:
                "Ensure that `await Scratch.canFetch(url)` is checked first, then add // eslint-disable-next-line no-restricted-syntax",
            },
          ]),
          "no-translate-setup": createQueryRule([
            {
              selector:
                "CallExpression[callee.object.object.name=Scratch][callee.object.property.name=translate][callee.property.name=setup]",
              message:
                "Do not call Scratch.translate.setup() yourself. Just use Scratch.translate() and let the build script handle it",
            },
          ]),
          "no-translate-alias": createQueryRule([
            {
              selector:
                "VariableDeclarator[init.type=MemberExpression][init.object.name=Scratch][init.property.name=translate]",
              message:
                "Do not store Scratch.translate in a variable as the build script will not be able to statically analyze the strings",
            },
            {
              selector:
                "AssignmentExpression[right.type=MemberExpression][right.object.name=Scratch][right.property.name=translate]",
              message:
                "Do not store Scratch.translate in a variable as the build script will not be able to statically analyze the strings",
            },
          ]),
          "should-translate": createQueryRule([
            {
              selector:
                "MethodDefinition[key.name=getInfo] Property[key.name=name][value.type=Literal]",
              message: "Extension name should usually be translated",
            },
            {
              selector:
                "MethodDefinition[key.name=getInfo] Property[key.name=blocks] Property[key.name=text][value.type=Literal]",
              message: "Block text should usually be translated",
            },
          ]),
          "should-not-translate": createQueryRule([
            {
              selector:
                "MethodDefinition[key.name=getInfo] Property[key.name=id][value.callee.property.name=translate]",
              message: "Do not translate extension ID",
            },
            {
              selector:
                "MethodDefinition[key.name=docsURI] Property[key.name=id][value.callee.property.name=translate]",
              message: "Do not translate docsURI",
            },
            {
              selector:
                "MethodDefinition[key.name=getInfo] Property[key.name=opcode][value.callee.property.name=translate]",
              message: "Do not translate block opcode",
            },
          ]),
        },
      },
    },
    rules: {
      // Require each extension to use strict mode
      strict: ["error", "function"],
      // Disallow APIs that are replaced by Scratch.* APIs
      // This is not comprehensive, but it should be enough to prevent the most common ways for these to be written.
      "no-restricted-globals": [
        "error",
        {
          name: "vm",
          message:
            "Use Scratch.vm instead of the global vm object. You also can use const vm = Scratch.vm;",
        },
      ],
      "extension/no-new-syntax": "error",
      "extension/no-xmlhttprequest": "error",
      "extension/iife": "error",
      "extension/use-scratch-vm": "error",
      "extension/use-scratch-fetch": "error",
      "extension/use-scratch-open-window": "error",
      "extension/use-scratch-redirect": "error",
      "extension/check-can-fetch": "error",
      "extension/no-translate-setup": "error",
      "extension/no-translate-alias": "error",
      "extension/should-translate": "error",
      "extension/should-not-translate": "error",
    },
  },
];
