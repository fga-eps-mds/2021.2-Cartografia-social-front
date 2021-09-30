module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|rn-material-ui-textfield' +
      '|prop-types' +
      '|@react-native-community/async-storage' +
      '|react-(native|universal|navigation)-(.*)' +
      ')/)',
  ],
};