import * as actionTypes from './actionTypes';

export const createMarker = (newMarker) => {
  return {
    type: actionTypes.ADD_MARKER,
    newMarker,
  };
};

export const updateArea = (newArea) => {
  return {
    type: actionTypes.UPDATE_NEW_AREA,
    newArea,
  };
};

export const resetNewArea = () => {
  return {
    type: actionTypes.RESET_NEW_AREA,
  };
};
