module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    React: 'writable',
  },
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    // semi: 'off',
    semi: [
      2,
      'always',
    ],
    'no-multiple-empty-lines': [
      2,
      {
        max: 1,
      },
    ],
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsForRegex: ['^draft'] }],
    'no-floating-decimal': 'off',
    'no-console': 'off',
    'arrow-parens': 'off',
    'no-lonely-if': 'off',
    'class-methods-use-this': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-no-target-blank': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'linebreak-style': 0,
    'react/prop-types': [2, { skipUndeclared: true }],
    // 'react-hooks/exhaustive-deps': 'warn',
    'no-underscore-dangle': 'off',
  },
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {
        rootPathPrefix: '~',
        rootPathSuffix: 'src',
      },
    },
  },
};
