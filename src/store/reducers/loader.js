import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ENABLE_LOADER:
      return {...state, isLoading: true};
    case actionTypes.DISABLE_LOADER:
      return {...state, isLoading: false};
    default:
      return state;
  }
};

export default reducer;
