/* eslint-disable react/prop-types */
import React from 'react';
import {Marker as OriginalMarker} from 'react-native-maps';

const Marker = ({marker, onPress}) => {
  const onPressMarker = () => {
    onPress(marker);
  };

  if (marker) {
    return (
      <OriginalMarker
        coordinate={marker}
        title={marker.title}
        description={marker.description}
        onPress={onPressMarker}
      />
    );
  }

  return null;
};

// Marker.propTypes = {
//   marker: PropTypes.shape({
//     icon: PropTypes.string,
//     onPress: PropTypes.func,
//   }),
// };

// Marker.defaultProps = {
//   marker: {},
// };

export default Marker;
