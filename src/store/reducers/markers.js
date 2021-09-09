import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  list: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_MARKER:
      return {...state, list: [...state.list, action.newMarker]};
    case actionTypes.LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default reducer;
