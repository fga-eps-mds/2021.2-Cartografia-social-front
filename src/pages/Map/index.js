import React from 'react';
import {View} from 'components/UI';
import useLocation from 'services/useLocation';
import Fabs from 'components/Fabs';
import {MapView} from './styles';

const Map = () => {
  const {location} = useLocation();
  const actions = [
    {
      icon: 'draw-polygon',
      onPress: () => {},
    },
    {
      icon: 'map-marker-alt',
      onPress: () => {},
    },
  ];

  const alwaysOpenActions = [
    {
      icon: 'street-view',
      onPress: () => {},
    },
  ];

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
        <Fabs actions={actions} alwaysOpenActions={alwaysOpenActions} />
      </View>
    );
  }

  return null;
};

export default Map;
