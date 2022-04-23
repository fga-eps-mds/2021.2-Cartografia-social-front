import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';

const DEFAULT_TIMEOUT = 30000;
axios.defaults.timeout = DEFAULT_TIMEOUT;

const instance = axios.create({
  // baseURL: Config.API,
  baseURL: 'http://192.168.0.155:8000',
});
instance.interceptors.request.use(async (config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: await AsyncStorage.getItem('access_token'),
  },
}));

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return auth()
        .currentUser.getIdToken(true)
        .then(async (token) => {
          await AsyncStorage.setItem('access_token', `Bearer ${token}`);
          return axios(originalRequest);
        });
    }
    throw error;
  },
);

export default instance;
