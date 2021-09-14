import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      storage: AsyncStorage,
      key: 'cartografia',
      blacklist: ['loader', 'markers'],
    },
    reducers,
  );

  return persistedReducer;
};
