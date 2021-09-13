/* eslint-disable react/no-array-index-key */
import React, {useState, useEffect, useRef} from 'react';
import {View} from 'components/UI';
import useLocation from 'services/useLocation';
import Fabs from 'components/Fabs';
import CreatePoint from 'components/CreatePoint';
import {useSelector} from 'react-redux';
import * as selectors from 'store/selectors';
import Marker from 'components/Marker';
import MarkerDetails from 'components/MarkerDetails';

import {MapView} from './styles';

const Map = () => {
  const {location} = useLocation();
  const [showPointCreation, setShowPointCreation] = useState(false);
  const [region, setRegion] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState({});
  const detailsRef = useRef(null);

  const markers = useSelector(selectors.markers);

  const actions = [
    {
      icon: 'draw-polygon',
      onPress: () => {},
    },
    {
      icon: 'map-marker-alt',
      onPress: () => setShowPointCreation(true),
    },
  ];

  useEffect(() => {
    if (location) {
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [location]);

  const alwaysOpenActions = [
    {
      icon: 'street-view',
      onPress: () => {},
    },
  ];

  const onPressMarker = (marker) => {
    setSelectedMarker(marker);
    detailsRef.current.snapToIndex(0);
    setRegion({
      latitude: marker.latitude - 0.008,
      longitude: marker.longitude,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.02,
    });
  };

  if (region) {
    return (
      <View flex={1}>
        <MapView
          region={region}
          onRegionChangeComplete={(value) => setRegion(value)}>
          {markers.map((marker, index) => (
            <Marker key={index} marker={marker} onPress={onPressMarker} />
          ))}
        </MapView>
        <Fabs actions={actions} alwaysOpenActions={alwaysOpenActions} />
        <CreatePoint
          locationSelected={region}
          show={showPointCreation}
          onClose={() => setShowPointCreation(false)}
        />
        <MarkerDetails marker={selectedMarker} sheetRef={detailsRef} />
      </View>
    );
  }

  return null;
};

export default Map;
