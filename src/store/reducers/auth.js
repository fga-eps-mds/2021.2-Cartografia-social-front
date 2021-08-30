import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  id: '',
  token: '',
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {...state, ...action.loginObject};
    case actionTypes.LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default reducer;
