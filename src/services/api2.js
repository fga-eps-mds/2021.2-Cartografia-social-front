import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const instance = axios.create({
  baseURL: 'http://10.0.2.2:8000',
});

instance.interceptors.request.use(async (config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: await AsyncStorage.getItem('access_token'),
  },
}));

export default instance;
