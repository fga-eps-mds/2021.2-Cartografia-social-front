import React from 'react';
import {View} from 'components/UI';
import useLocation from 'services/useLocation';
import {MapView} from './styles';

const Map = () => {
  const {location} = useLocation();

  if (location) {
    return (
      <View flex={1}>
        <MapView
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    );
  }

  return null;
};

export default Map;
