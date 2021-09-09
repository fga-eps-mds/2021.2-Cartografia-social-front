import * as actionTypes from './actionTypes';

export const createMarker = (newMarker) => {
  return {
    type: actionTypes.ADD_MARKER,
    newMarker,
  };
};
