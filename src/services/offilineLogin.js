import CryptoJS from 'crypto-js';
import * as localDatabase from './localDatabase';

require('dotenv').config();

const CRIPT_KEY = process.env.CRIPT_KEY || 'offline-login';
const LOGIN_KEY = 'login';

const encryptMessage = (message) => {
  return CryptoJS.AES.encrypt(message, CRIPT_KEY).toString();
};
const decryptMessage = (message) => {
  return CryptoJS.AES.decrypt(message, CRIPT_KEY).toString(CryptoJS.enc.Utf8);
};

export const saveLoginDataOffline = async (email, password) => {
  await localDatabase.put(LOGIN_KEY, {
    email: encryptMessage(email),
    password: encryptMessage(password),
    id: LOGIN_KEY,
  });
};

export const offlineLogin = async (email, password) => {
  if (!(await localDatabase.exists(LOGIN_KEY, LOGIN_KEY)))
    throw new Error('Invalid credentials');
  const loginData = await localDatabase.get(LOGIN_KEY, LOGIN_KEY);
  const realEmail = decryptMessage(loginData.email);
  const realPassword = decryptMessage(loginData.password);
  if (realEmail !== email || realPassword !== password) {
    throw new Error('Invalid credentials');
  }
};

export const removeLoginDataOffline = () =>
  localDatabase.remove(LOGIN_KEY, LOGIN_KEY);
