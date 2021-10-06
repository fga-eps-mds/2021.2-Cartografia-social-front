import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Polygon} from 'react-native-maps';
import {useSelector, useDispatch} from 'react-redux';
import * as selectors from 'store/selectors';
import * as Actions from 'store/actions';

const DEFAULT_STATE = {
  coordinates: [],
  holes: [],
};

const CreateArea = ({show, onPressCreatingArea, reset, index}) => {
  const dispatch = useDispatch();
  const newArea = useSelector(selectors.newArea);
  const newAreaRef = useRef(DEFAULT_STATE);

  const onPress = (e) => {
    const newPoint = {
      ...newAreaRef.current,
      coordinates: [
        ...newAreaRef.current.coordinates,
        e.nativeEvent.coordinate,
      ],
    };

    dispatch(Actions.updateArea(newPoint));
  };

  const resetState = () => {
    dispatch(Actions.resetNewArea());
    newAreaRef.current = DEFAULT_STATE;
  };

  useEffect(() => {
    onPressCreatingArea(onPress);
    reset(resetState);
  }, [show, reset]);

  useEffect(() => {
    newAreaRef.current = newArea;
  }, [newArea.coordinates.length]);

  if (show && newArea.coordinates.length) {
    return (
      <Polygon
        key={index}
        coordinates={newArea.coordinates}
        holes={newArea.holes}
        strokeColor="#000"
        fillColor="rgba(255,0,0,0.5)"
        strokeWidth={1}
      />
    );
  }

  return null;
};

CreateArea.propTypes = {
  onPressCreatingArea: PropTypes.func.isRequired,
  reset: PropTypes.func,
  show: PropTypes.bool,
  index: PropTypes.number,
};

CreateArea.defaultProps = {
  show: false,
  index: 0,
  reset: () => {},
};

export default CreateArea;
