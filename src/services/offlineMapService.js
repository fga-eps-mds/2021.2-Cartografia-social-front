import uuid from 'react-native-uuid';
import * as localDatabase from './localDatabase';
import api from './api';

const AREA_ENTITY = 'area';

const postArea = async (area, userEmail) => {
    const response = await api.post('/maps/area', area)
    const locationId = response.data.id;
    await api.post('/maps/addToCommunity', {
        locationId: locationId,
        userEmail: userEmail,
    })
}

export const saveArea = async (area) => localDatabase.post(AREA_ENTITY, {
    ...area,
    id: uuid.v4(),
});

export const getAreas = async () => localDatabase.getAll(AREA_ENTITY);

export const syncAreas = async (areas) => {

}