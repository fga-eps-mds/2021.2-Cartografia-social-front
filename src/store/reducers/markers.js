import * as actionTypes from '../actions/actionTypes';

const AREA_INITAL_STATE = {
    coordinates: [],
};

const INITIAL_STATE = {
    list: [],
    newArea: AREA_INITAL_STATE,
};

const reducer = (state = INITIAL_STATE, action) => {
    let updatedList;
    let formattedPoints = [];
    let formattedAreas = [];
    switch (action.type) {
        case actionTypes.ADD_MARKER:
            return {...state, list: [...state.list, action.newMarker] };
        case actionTypes.UPDATE_MARKER:
            updatedList = state.list;
            updatedList[action.markerIndex] = action.marker;
            return {...state, list: [...updatedList] };
        case actionTypes.UPDATE_NEW_AREA:
            return {...state, newArea: action.newArea };
        case actionTypes.RESET_NEW_AREA:
            return {...state, newArea: AREA_INITAL_STATE };
        case actionTypes.POPULATE_MARKERS:
            formattedPoints = action.points.map((item) => ({
                latitude: item.coordinates[1],
                longitude: item.coordinates[0],
                title: item.title,
                description: item.description,
                id: item.id,
                multimedia: [],
                multimediaInitialized: false,
            }));
            formattedAreas = action.areas.map((item) => ({
                title: item.title,
                description: item.description,
                id: item.id,
                multimedia: [],
                multimediaInitialized: false,
                coordinates: item.coordinates[0].map((coordinate) => ({
                    latitude: coordinate[1],
                    longitude: coordinate[0],
                })),
            }));

            return {...state, list: [...formattedPoints, ...formattedAreas] };
        case actionTypes.LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default reducer;