import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import api from 'services/api';
import * as localDatabase from 'services/localDatabase';
import {
  offlineLogin as localLogin,
  saveLoginDataOffline,
} from './offilineLogin';

export const USER_ENTITY = 'user';

const getUserInfo = async (email) => {
  const result = await api.get(
    'users/userByEmail',
    {
      params: {
        email: email.value,
      },
    },
    {
      headers: {
        Authorization: await AsyncStorage.getItem('access_token'),
      },
    },
  );
  return result.data;
};

const getUserInfoOffline = async (email) => {
  const users = await localDatabase.getAll(USER_ENTITY);
  return users.find((user) => user.email === email);
};

const firebaseLogin = async (email, password) => {
  const userCredentials = await auth().signInWithEmailAndPassword(
    email.trim(),
    password.trim(),
  );
  return userCredentials.user.getIdToken();
};

const onlineLogin = async (email, password) => {
  const token = await firebaseLogin(email, password);
  await AsyncStorage.setItem('access_token', `Bearer ${token}`);
  const userInfo = await getUserInfo(email);
  await localDatabase.put(USER_ENTITY, userInfo);
  await saveLoginDataOffline(email, password);
  return userInfo;
};

const offilineLogin = async (email, password) => {
  await localLogin(email, password);
  return getUserInfoOffline(email);
};

export const login = async (email, password, isOffline = false) => {
  if (isOffline) {
    return offilineLogin(email, password);
  }
  return onlineLogin(email, password);
};
