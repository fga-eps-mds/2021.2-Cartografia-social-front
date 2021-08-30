module.exports = {
  root: true,
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'react/prop-types': ['error', {ignore: ['navigation', 'route']}],
    'react/jsx-filename-extension': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
      'babel-module': {},
    },
  },
  globals: {
    __DEV__: true,
  },
};
