import js from '@eslint/js';
import globals from 'globals';

export default [
  // Base on eslint recommended
  js.configs.recommended,

  // Common for all files
  {
    languageOptions: {
      ecmaVersion: 2022
    },
    rules: {
      // Unused variables commonly indicate logic errors
      'no-unused-vars': [
        'error',
        {
          // Unused arguments are useful, eg. it can be nice for blocks to accept `args` even if they don't use it
          args: 'none',
          // Allow silently eating try { } catch (e) { }
          caughtErrors: 'none',
          // Variables starting with _ are intentionally unused
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        }
      ],
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
      'require-await': 'error'
    }
  },

  // For development server
  {
    files: [
      'development/**'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },

  // For extensions
  {
    files: [
      'extensions/**'
    ],
    languageOptions: {
      sourceType: 'script',
      globals: {
        ...globals.browser,
        Blockly: 'readonly',
        Scratch: 'readonly',
        ScratchBlocks: 'readonly',
        ScratchExtensions: 'readonly',
        scaffolding: 'readonly'
      }
    },
    rules: {
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
        },
        {
          selector: 'Program > :not(ExpressionStatement[expression.type=CallExpression][expression.callee.type=/FunctionExpression/])',
          message: 'All extension code must be within (function (Scratch) { ... })(Scratch);'
        },
        {
          selector: 'CallExpression[callee.object.object.name=Scratch][callee.object.property.name=translate][callee.property.name=setup]',
          message: 'Do not call Scratch.translate.setup() yourself. Just use Scratch.translate() and let the build script handle it.'
        },
        {
          selector: 'MethodDefinition[key.name=getInfo] Property[key.name=id][value.callee.property.name=translate]',
          message: 'Do not translate extension ID'
        },
        {
          selector: 'MethodDefinition[key.name=docsURI] Property[key.name=id][value.callee.property.name=translate]',
          message: 'Do not translate docsURI'
        },
        {
          selector: 'MethodDefinition[key.name=getInfo] Property[key.name=opcode][value.callee.property.name=translate]',
          message: 'Do not translate block opcode'
        },
        {
          selector: 'MemberExpression[object.name=window][property.name=vm]',
          message: 'Use Scratch.vm instead of window.vm'
        }
      ]
    }
  }
];
