import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    throw new Error("Error saving local data");
  }
}

const getData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key)
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error(e);
    throw new Error("Error getting local data");
  }
  throw new Error("No data found");
}

const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    throw new Error("Error deleting local data");
  }
}

const getEntityArray = async (entityName) => {
  try {
    return await getData(entityName);
  }
  catch (e) {
    if (e.message === "No data found") {
      return [];
    }
    else throw e;
  }
}
