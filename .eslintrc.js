module.exports = {
  env: {
    browser: true,
    es6: true,
    jquery: true
  },
  plugins: ['prettier'],
  extends: [
    'airbnb-base',
    'prettier',
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'prettier/prettier': 'error'
  }
}
