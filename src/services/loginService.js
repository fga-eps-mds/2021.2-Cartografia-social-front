import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import api from 'services/api';
import * as localDatabase from 'services/localDatabase';

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

const firebaseLogin = async (email, password) => {
  const userCredentials = await auth().signInWithEmailAndPassword(
    email.trim(),
    password.trim(),
  );
  return userCredentials.user.getIdToken();
};

export const login = async (email, password) => {
  const token = await firebaseLogin(email, password);
  await AsyncStorage.setItem('access_token', `Bearer ${token}`);
  const userInfo = await getUserInfo(email);
  await localDatabase.put(USER_ENTITY, userInfo);
  return userInfo;
};
