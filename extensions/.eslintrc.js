// eslint-disable-next-line
module.exports = {
  env: {
    browser: true
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
      }
    ]
  }
};
