import * as localDataBase from './localDatabase';

export const storeLocalCredentials = async (userName, password) => {
  await localDataBase.put('offlineLoginCredentials', {
    id: '',
    username: userName,
    password: password,
  });
  // console.log('Salvo!');
};

export const offlineLogin = async (userName, password) => {
  // const data = await localDataBase.getAll('offlineLoginCredential');
  /* for (key in data) {
    if (key.username === userName && key.password === password) {
      return true;
    }
  } */
  return false;
};
