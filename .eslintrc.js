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
    semi: [
      'error',
      'always'
    ],
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
    ]
  }
};
