import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    throw new Error('Error saving local data');
  }
};

const getData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    throw new Error('Error getting local data');
  }
  throw new Error('No data found');
};

const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    throw new Error('Error deleting local data');
  }
};

const getEntityArray = async (entityName) => {
  try {
    return await getData(entityName);
  } catch (e) {
    if (e.message === 'No data found') {
      return [];
    }
    throw e;
  }
};

export const getAll = (entityName) => getEntityArray(entityName);

export const exists = async (entityName, id) => {
  try {
    await getData(`${entityName}_${id}`);
    return true;
  } catch (e) {
    if (e.message === 'No data found') {
      return false;
    }
    throw e;
  }
};

export const put = async (entityName, data) => {
  const dataToSave = data.id
    ? data
    : {...data, id: Math.random().toString(36).substring(7)};
  let entityArray = await getEntityArray(entityName);
  if (await exists(entityName, dataToSave.id))
    entityArray = entityArray.map((e) =>
      e.id === dataToSave.id ? dataToSave : e,
    );
  else entityArray.push(dataToSave);

  storeData(`${entityName}_${dataToSave.id}`, dataToSave);
  storeData(entityName, entityArray);
};

export const post = async (entityName, data) => {
  if (await exists(entityName, data.id)) {
    throw new Error('Entity already exists');
  }
  await put(entityName, data);
};

export const get = async (entityName, id) => {
  return getData(`${entityName}_${id}`);
};

export const remove = async (entityName, id) => {
  const entityArray = await getAll(entityName);
  storeData(
    entityName,
    entityArray.filter((e) => e.id !== id),
  );
  deleteData(`${entityName}_${id}`);
};
