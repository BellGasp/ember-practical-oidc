module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true,
    jquery: true,
    node: true
  },
  globals: {
    'UserManager': true,
    'define': true
  },
  rules: {
    'indent': ['error', 2],
    'no-unused-vars': ['warn', { 'vars': 'all', 'args': 'after-used' }],
    'max-len': ['warn', 100, { 'ignoreComments': true }],
    'object-curly-spacing': ['error', 'always'],
    'quote-props': ['error', 'consistent'],
    'quotes': ['error', 'single']
  }
};
