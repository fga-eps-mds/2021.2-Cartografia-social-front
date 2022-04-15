import uuid from 'react-native-uuid';
import * as localDatabase from './localDatabase';
import api from './api';

const AREA_ENTITY = 'area';
const ONLINE_MAP_ENTITY = 'onlineMap';

const getCommunityDataOnServer = async(userEmail) => {
    const response = await api.get(
        `/maps/communityDataByUserEmail/${userEmail}`,
    );
    const { data } = response;
    localDatabase.put(ONLINE_MAP_ENTITY, {
        ...data,
        id: ONLINE_MAP_ENTITY
    });
    return data;
};

const postArea = async(area, userEmail) => {
    const response = await api.post('/maps/area', area);
    const locationId = response.data.id;
    await api.post('/maps/addToCommunity', {
        locationId,
        userEmail,
    });
};

const getOfflineCommunityData = async() => {
    const data = await localDatabase.get(ONLINE_MAP_ENTITY, ONLINE_MAP_ENTITY) || { areas: [], points: [] };
    const localAreas = await localDatabase.getAll(AREA_ENTITY);
    return {
        areas: [...data.areas, ...localAreas],
        points: data.points
    }
}

const getOnlineCommunityData = async(userEmail) => {
    const data = await getCommunityDataOnServer(userEmail);
    const localAreas = await localDatabase.getAll(AREA_ENTITY);
    return {
        areas: [...data.areas, ...localAreas],
        points: data.points
    }
}

export const saveArea = async(area, userEmail, isOffline = false) => {
    await localDatabase.post(AREA_ENTITY, {...area, id: uuid.v4() });
    if (!isOffline) {
        await syncCommunityData(userEmail);
    }
}


export const getCommunityData = async(userEmail, isOffline = false) => {
    if (isOffline) {
        return getOfflineCommunityData();
    } else {
        return getOnlineCommunityData(userEmail);
    }
}

export const syncCommunityData = async(userEmail) => {
    const areas = await localDatabase.getAll(AREA_ENTITY);
    /* eslint-disable-next-line */
    for (const area of areas) {
        /* eslint-disable no-await-in-loop */
        await postArea(area, userEmail);
        await localDatabase.remove(AREA_ENTITY, area.id);
    }
};