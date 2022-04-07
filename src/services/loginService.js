import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import api from 'services/api';
import * as localDatabase from 'services/localDatabase';
import {
  offlineLogin as localLogin,
  saveLoginDataOffline,
} from './offilineLogin';

export const USER_ENTITY = 'user';

const getUserInfo = async (email, token) => {
  const result = await api.get(
    'users/userByEmail',
    {
      params: {
        email: email.value,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
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
  return userCredentials;
};

const onlineLogin = async (email, password) => {
  const userCredentials = await firebaseLogin(email, password);
  const token = await userCredentials.user.getIdToken();
  const userInfo = await getUserInfo(email, token);
  const userLogIn = {
    name: userCredentials.user.displayName,
    id: userCredentials.user.providerId,
    token,
    email,
    data: userInfo,
  };
  await AsyncStorage.setItem('access_token', `Bearer ${token}`);
  await localDatabase.put(USER_ENTITY, userLogIn);
  await saveLoginDataOffline(email, password);
  return userLogIn;
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
