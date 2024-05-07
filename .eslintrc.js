// eslint-disable-next-line no-undef
module.exports = {
  env: {
    es2021: true
  },
  extends: 'eslint:recommended',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  globals: {
    Blockly: 'readonly',
    Scratch: 'readonly',
    ScratchBlocks: 'readonly',
    ScratchExtensions: 'readonly',
    scaffolding: 'readonly',

    GPUBufferUsage: 'readonly',
    GPUShaderStage: 'readonly',
    GPUMapMode: 'readonly'
  },
  rules: {
    // Unused variables commonly indicate logic errors
    'no-unused-vars': [
      'error',
      {
        // Unused arguments are useful, eg. it can be nice for blocks to accept `args` even if they don't use it
        args: 'none',
        // Allow silently eating try { } catch { }
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
};
