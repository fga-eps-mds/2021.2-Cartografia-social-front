import uuid from 'react-native-uuid';
import * as localDatabase from './localDatabase';

const AREA_ENTITY = 'area';

export const saveArea = async (area) => localDatabase.post(AREA_ENTITY, {
    ...area,
    id: uuid.v4(),
});

export const getAreas = async () => localDatabase.getAll(AREA_ENTITY);