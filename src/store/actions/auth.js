import * as actionTypes from './actionTypes';

export const login = (loginObject) => {
  return {
    type: actionTypes.LOGIN,
    loginObject,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const useDemonstrationMode = () => {
  return {
    type: actionTypes.DEMONSTRATION_MODE,
  };
};
