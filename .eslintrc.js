module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'jsx-quotes': ['error', 'prefer-single'],
    'no-underscore-dangle': ['error', { allow: ['_id', '__REDUX_DEVTOOLS_EXTENSION__'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-new': 0,
  },
};