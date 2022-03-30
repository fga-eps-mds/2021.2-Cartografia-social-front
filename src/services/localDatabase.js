import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) =>
  AsyncStorage.setItem(key, JSON.stringify(value));

const getData = async (key) => {
  const data = await AsyncStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return undefined;
};

const deleteData = async (key) => AsyncStorage.removeItem(key);

const getEntityArray = async (entityName) => (await getData(entityName)) || [];

export const getAll = (entityName) => getEntityArray(entityName);

export const exists = async (entityName, id) =>
  (await getData(`${entityName}_${id}`)) !== undefined;

export const put = async (entityName, data) => {
  if (!data.id) {
    throw new Error('No id provided');
  }
  let entityArray = await getEntityArray(entityName);
  if (await exists(entityName, data.id)) {
    entityArray = entityArray.map((e) => (e.id === data.id ? data : e));
  } else {
    entityArray.push(data);
  }

  storeData(`${entityName}_${data.id}`, data);
  storeData(entityName, entityArray);
};

export const post = async (entityName, data) => {
  if (await exists(entityName, data.id)) {
    throw new Error('Entity already exists');
  }
  await put(entityName, data);
};

export const get = async (entityName, id) => getData(`${entityName}_${id}`);

export const remove = async (entityName, id) => {
  const entityArray = await getAll(entityName);
  storeData(
    entityName,
    entityArray.filter((e) => e.id !== id),
  );
  deleteData(`${entityName}_${id}`);
};
