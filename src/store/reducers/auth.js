import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  id: '',
  token: '',
  demonstrationMode: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {...state, ...action.loginObject};
    case actionTypes.LOGOUT:
      return INITIAL_STATE;
    case actionTypes.DEMONSTRATION_MODE:
      return {...state, demonstrationMode: true};
    default:
      return state;
  }
};

export default reducer;
