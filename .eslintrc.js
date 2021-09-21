module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb',
    'plugin:cypress/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jest/recommended',
    'plugin:react/recommended',
  ],
  overrides: [
    {
      files: ['*.test.js', '*.test.jsx'],
      rules: { // mock component and promise rejections more easily without lint err
        'prefer-promise-reject-errors': 'off',
        'react/destructuring-assignment': 'off',
        'react/prop-types': 'off',
        'react/display-name': 'off',
      },
    },
    {
      files: ['*.spec.js'],
      rules: { 'jest/valid-expect': 'off' }, // stop incorrect errors from jest plugin in cypress files
    },
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'testing-library',
  ],
  root: true,
  rules: {
    camelcase: [0, { properties: 'never' }],
    'import/no-unresolved': 'off', // we get import errors from jest, vscode & webpack anyway
    indent: ['error', 2, { ignoredNodes: ['TemplateLiteral *'] }],
    'function-paren-newline': 'off',
    'import/no-extraneous-dependencies': 'off',
    'jest/expect-expect': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-quotes': [2, 'prefer-single'],
    'new-cap': 0,
    'no-prototype-builtins': 0,
    'no-tabs': 'error',
    'linebreak-style': 0,
    'max-len': ['error', {
      code: 125, ignoreComments: true, ignoreRegExpLiterals: true, ignoreStrings: true, ignoreUrls: true,
    }],
    'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0, maxEOF: 0 }],
    'react/jsx-curly-brace-presence': 0,
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/jsx-indent': [2],
    'react/jsx-indent-props': [2],
    'react/jsx-props-no-spreading': 'off',
    'react/self-closing-comp': 'off',
    'template-curly-spacing': 'off',
    'testing-library/no-await-sync-query': 'off',
  },
};
