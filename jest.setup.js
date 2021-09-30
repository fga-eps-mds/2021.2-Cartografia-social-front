import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.useFakeTimers();

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for call immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});
jest.mock('react-redux', () => {
  const ActualReactRedux = jest.requireActual('react-redux');
  const {store} = require('./src/store/StoreProvider');
  return {
    ...ActualReactRedux,
    useSelector: jest.fn().mockImplementation(() => {
      return store;
    }),
  };
});

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);

global.__reanimatedWorkletInit = jest.fn();