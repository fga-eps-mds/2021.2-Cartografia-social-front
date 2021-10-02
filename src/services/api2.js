import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';

const instance = axios.create({
  baseURL: Config.API2,
});

instance.interceptors.request.use(async (config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: await AsyncStorage.getItem('access_token'),
  },
}));

export default instance;
