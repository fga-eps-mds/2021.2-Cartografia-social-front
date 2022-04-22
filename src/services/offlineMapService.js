import uuid from 'react-native-uuid';
import * as localDatabase from './localDatabase';
import api from './api';

const AREA_ENTITY = 'area';
const POINT_ENTITY = 'point';
const ONLINE_MAP_ENTITY = 'onlineMap';

const getCommunityDataOnServer = async (userEmail) => {
  const response = await api.get(`/maps/communityDataByUserEmail/${userEmail}`);
  const {data} = response;
  localDatabase.put(ONLINE_MAP_ENTITY, {
    ...data,
    id: ONLINE_MAP_ENTITY,
  });
  return data;
};

const addLocationToCommunity = async (locationId, userEmail) =>
  api.post('/maps/addToCommunity', {
    locationId,
    userEmail,
  });

const postArea = async (area, userEmail) => {
  const response = await api.post('/maps/area', area);
  const locationId = response.data.id;
  await addLocationToCommunity(locationId, userEmail);
};

const postPoint = async (point, userEmail) => {
  const response = await api.post('/maps/point', point);
  const locationId = response.data.id;
  await addLocationToCommunity(locationId, userEmail);
};

const getOfflineCommunityData = async () => {
  const data = (await localDatabase.get(
    ONLINE_MAP_ENTITY,
    ONLINE_MAP_ENTITY,
  )) || {areas: [], points: []};
  const localAreas = await localDatabase.getAll(AREA_ENTITY);
  const localPoints = await localDatabase.getAll(POINT_ENTITY);
  return {
    areas: [...data.areas, ...localAreas],
    points: [...data.points, ...localPoints],
  };
};

const getOnlineCommunityData = async (userEmail) => {
  const data = await getCommunityDataOnServer(userEmail);
  const localAreas = await localDatabase.getAll(AREA_ENTITY);
  const localPoints = await localDatabase.getAll(POINT_ENTITY);
  return {
    areas: [...data.areas, ...localAreas],
    points: [...data.points, ...localPoints],
  };
};

const syncPoints = async (userEmail) => {
  const points = await localDatabase.getAll(POINT_ENTITY);
  /* eslint-disable-next-line */
    for (const point of points) {
    /* eslint-disable no-await-in-loop */
    await postPoint(point, userEmail);
    await localDatabase.remove(POINT_ENTITY, point.id);
  }
};

const syncAreas = async (userEmail) => {
  const areas = await localDatabase.getAll(AREA_ENTITY);
  /* eslint-disable-next-line */
    for (const area of areas) {
    /* eslint-disable no-await-in-loop */
    await postArea(area, userEmail);
    await localDatabase.remove(AREA_ENTITY, area.id);
  }
};

export const saveArea = async (area, userEmail, isOffline = false) => {
  await localDatabase.post(AREA_ENTITY, {...area, id: uuid.v4()});
  if (!isOffline) {
    await syncAreas(userEmail);
  }
};

export const savePoint = async (point, userEmail, isOffline = false) => {
  await localDatabase.post(POINT_ENTITY, {...point, id: uuid.v4()});
  if (!isOffline) {
    await syncPoints(userEmail);
  }
};

export const getCommunityData = async (userEmail, isOffline = false) => {
  if (isOffline) {
    return getOfflineCommunityData();
  }
  return getOnlineCommunityData(userEmail);
};

export const syncCommunityData = async (userEmail) => {
  await syncPoints(userEmail);
  await syncAreas(userEmail);
};
