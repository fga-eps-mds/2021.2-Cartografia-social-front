import * as actionTypes from './actionTypes';

export const enableLoader = () => {
  return {
    type: actionTypes.ENABLE_LOADER,
  };
};

export const disableLoader = () => {
  return {
    type: actionTypes.DISABLE_LOADER,
  };
};
