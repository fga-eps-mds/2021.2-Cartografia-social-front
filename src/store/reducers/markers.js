import * as actionTypes from '../actions/actionTypes';

const AREA_INITAL_STATE = {
  coordinates: [],
};

const INITIAL_STATE = {
  list: [],
  newArea: AREA_INITAL_STATE,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_MARKER:
      return {...state, list: [...state.list, action.newMarker]};
    case actionTypes.UPDATE_MARKER:
      state.list[action.markerIndex] = action.marker;
      return {...state, list: [...state.list]};
    case actionTypes.UPDATE_NEW_AREA:
      return {...state, newArea: action.newArea};
    case actionTypes.RESET_NEW_AREA:
      return {...state, newArea: AREA_INITAL_STATE};
    case actionTypes.LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default reducer;
