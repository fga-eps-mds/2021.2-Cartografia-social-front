import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Polygon} from 'react-native-maps';

const DEFAULT_STATE = {
  coordinates: [],
  holes: [],
};

const CreateArea = ({show, onPressCreatingArea, reset, getArea, index}) => {
  const [newArea, setNewArea] = useState(DEFAULT_STATE);
  const newAreaRef = useRef(DEFAULT_STATE);

  const onPress = (e) => {
    const newPoint = {
      ...newAreaRef.current,
      coordinates: [
        ...newAreaRef.current.coordinates,
        e.nativeEvent.coordinate,
      ],
    };

    setNewArea(newPoint);
    newAreaRef.current = newPoint;
  };

  const resetState = () => setNewArea(DEFAULT_STATE);

  const getNewArea = () => newArea;

  useEffect(() => {
    onPressCreatingArea(onPress);
    reset(resetState);
    getArea(getNewArea);
  }, [show, reset]);

  useEffect(() => {
    console.tron.log(newArea);
  }, [newArea]);

  // const onSave = async () => {};

  if (show) {
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
  getArea: PropTypes.bool,
  show: PropTypes.bool,
  index: PropTypes.number,
};

CreateArea.defaultProps = {
  show: false,
  index: 0,
  getArea: () => {},
  reset: () => {},
};

export default CreateArea;
