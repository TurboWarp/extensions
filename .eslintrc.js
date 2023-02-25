// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'eslint:recommended',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  globals: {
    Scratch: 'readonly'
  },
  rules: {
    // Here is where we enforce rules to have somewhat consistent code style without being overbearing
    'semi': [
      'warn',
      'always'
    ],
    'brace-style': 'warn',
    'key-spacing': 'warn',
    'keyword-spacing': 'warn',
    'new-parens': 'warn',
    'no-trailing-spaces': [
      'warn',
      {
        ignoreComments: true
      }
    ],
    'space-infix-ops': 'warn',
    'no-tabs': 'warn',

    // Allow blocks to accept unused `util` arguments
    'no-unused-vars': 'off',
    // Allow while (true) { }
    'no-constant-condition': [
      'error',
      {
        checkLoops: false
      }
    ],
    // Allow empty catch {} blocks
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true
      }
    ],
    // Returning a value from a constructor() implies a mistake
    'no-constructor-return': 'error',
    // new Promise(async () => {}) implies a mistake
    'no-async-promise-executor': 'warn',
    // x === x implies a mistake
    'no-self-compare': 'error',
    // Using ${...} in a non-template-string implies a mistake
    'no-template-curly-in-string': 'error',
    // Loops that only iterate once imply a mistake
    'no-unreachable-loop': 'error',
    // Detect some untrusted code execution
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    // Combinations of || and && are unreadable and may not do what you expect
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['&&', '||']
        ]
      }
    ],
    // Disallow async functions that don't need to be. This is important as a Promise and non-Promise return value
    // significantly impacts the behavior of projects.
    'require-await': 'error',
    // Require each extension to use strict mode
    'strict': ['error', 'function'],
    // Disallow APIs that are replaced by Scratch.* APIs
    // This is not comprehensive, but it should be enough to prevent the most common ways for these to be written.
    'no-restricted-globals': [
      'error',
      {
        name: 'vm',
        message: 'Use Scratch.vm instead of the global vm object. You also can use const vm = Scratch.vm;'
      }
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'CallExpression[callee.name=fetch]',
        message: 'Use Scratch.fetch() instead of fetch()'
      },
      {
        selector: 'CallExpression[callee.object.name=window][callee.property.name=fetch]',
        message: 'Use Scratch.fetch() instead of window.fetch()'
      },
      {
        selector: 'CallExpression[callee.name=open]',
        message: 'Use Scratch.openWindow() instead of open()'
      },
      {
        selector: 'CallExpression[callee.object.name=window][callee.property.name=open]',
        message: 'Use Scratch.openWindow() instead of window.open()'
      },
      {
        selector: 'AssignmentExpression[left.object.name=location][left.property.name=href]',
        message: 'Use Scratch.redirect() instead of location.href = ...'
      },
      {
        selector: 'AssignmentExpression[left.object.object.name=window][left.object.property.name=location][left.property.name=href]',
        message: 'Use Scratch.redirect() instead of window.location.href = ...'
      },
      {
        selector: 'AssignmentExpression[left.name=location]',
        message: 'Use Scratch.redirect() instead of location = ...'
      },
      {
        selector: 'AssignmentExpression[left.object.name=window][left.property.name=location]',
        message: 'Use Scratch.redirect() instead of window.location = ...'
      },
      {
        selector: 'CallExpression[callee.object.name=location][callee.property.name=assign]',
        message: 'Use Scratch.redirect() instead of location.assign()'
      },
      {
        selector: 'CallExpression[callee.object.object.name=window][callee.object.property.name=location][callee.property.name=assign]',
        message: 'Use Scratch.redirect() instead of window.location.assign()'
      },
      {
        selector: 'CallExpression[callee.object.name=location][callee.property.name=replace]',
        message: 'Use Scratch.redirect() instead of location.replace()'
      },
      {
        selector: 'CallExpression[callee.object.object.name=window][callee.object.property.name=location][callee.property.name=replace]',
        message: 'Use Scratch.redirect() instead of window.location.replace()'
      },
      {
        selector: 'NewExpression[callee.name=XMLHttpRequest]',
        message: 'Use Scratch.fetch() instead of XMLHttpRequest'
      },
      {
        selector: 'NewExpression[callee.name=WebSocket]',
        message: 'Ensure that `await Scratch.canFetch(url)` is checked first, then add // eslint-disable-next-line no-restricted-syntax'
      },
      {
        selector: 'NewExpression[callee.name=Image]',
        message: 'Ensure that `await Scratch.canFetch(url)` is checked first, then add // eslint-disable-next-line no-restricted-syntax'
      },
      {
        selector: 'NewExpression[callee.name=Audio]',
        message: 'Ensure that `await Scratch.canFetch(url)` is checked first, then add // eslint-disable-next-line no-restricted-syntax'
      }
    ]
  }
};
