import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';

const instance = axios.create({
  // baseURL: Config.API,
  baseURL: 'http://143.244.155.117:8000/',
});

instance.interceptors.request.use(async (config) => {
  const accessToken = await AsyncStorage.getItem('access_token');
  config.headers.Authorization = `${accessToken}`;
  return config;
});

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
        .then(() => {
          return axios(originalRequest);
        });
    }
    throw error;
  },
);

export default instance;
