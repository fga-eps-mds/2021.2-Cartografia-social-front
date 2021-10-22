/* eslint-disable react/jsx-props-no-spreading */
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
import CreateArea from 'components/CreateArea';
import {Polygon} from 'react-native-maps';
import {MapView} from './styles';

const Map = () => {
  const {location} = useLocation();
  const [showPointCreation, setShowPointCreation] = useState(false);
  const [region, setRegion] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState({});
  const [isCreatingArea, setIsCreatingArea] = useState(false);
  const detailsRef = useRef(null);
  const onPressCreatingArea = useRef(null);
  const newArea = useRef(null);
  const resetArea = useRef(() => {});

  const markers = useSelector(selectors.markers);

  const actions = [
    {
      icon: 'draw-polygon',
      onPress: () => setIsCreatingArea(true),
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
    if (marker.latitude) {
      setRegion({
        latitude: marker.latitude - 0.008,
        longitude: marker.longitude,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.02,
      });
    }
  };

  const onCloseCreation = () => {
    setShowPointCreation(false);
    setIsCreatingArea(false);
    resetArea.current();
  };

  if (region) {
    const mapOptions = {
      scrollEnabled: true,
    };

    if (isCreatingArea) {
      mapOptions.onPress = (e) => onPressCreatingArea.current(e);
    }

    return (
      <View flex={1}>
        <MapView
          region={region}
          onRegionChangeComplete={(value) => setRegion(value)}
          {...mapOptions}>
          {markers.map((marker, index) =>
            marker.coordinates ? (
              <Polygon
                key={index}
                coordinates={marker.coordinates}
                tappable
                strokeColor="#000"
                fillColor="rgba(255,0,0,0.5)"
                strokeWidth={1}
                onPress={() => onPressMarker(marker)}
              />
            ) : (
              <Marker key={index} marker={marker} onPress={onPressMarker} />
            ),
          )}
          <CreateArea
            reset={(func) => {
              resetArea.current = func;
            }}
            show={isCreatingArea}
            onPressCreatingArea={(func) => {
              onPressCreatingArea.current = func;
            }}
            getArea={(area) => {
              newArea.current = area;
            }}
          />
        </MapView>
        <Fabs actions={actions} alwaysOpenActions={alwaysOpenActions} />
        <CreatePoint
          isCreatingArea={isCreatingArea}
          locationSelected={region}
          show={showPointCreation}
          onClose={onCloseCreation}
          area={newArea.current}
        />
        <MarkerDetails marker={selectedMarker} sheetRef={detailsRef} />
      </View>
    );
  }

  return null;
};

export default Map;
