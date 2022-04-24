/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
import React, {useState, useEffect, useRef} from 'react';
import {View} from 'components/UI';
import {Alert} from 'react-native';
import useLocation from 'services/useLocation';
import Fabs from 'components/Fabs';
import CreatePoint from 'components/CreatePoint';
import {useSelector, useDispatch} from 'react-redux';
import * as selectors from 'store/selectors';
import * as Actions from 'store/actions';
import Marker from 'components/Marker';
import MarkerDetails from 'components/MarkerDetails';
import CreateArea from 'components/CreateArea';
import {Polygon} from 'react-native-maps';
import api from 'services/api';
import {MapView} from './styles';

const Map = () => {
  const dispatch = useDispatch();
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
  const user = useSelector(selectors.auth);
  const red = 'rgba(255,0,0,0.5)';
  const yellow = 'rgba(255,255,0,0.5)';

  const isLeader = async () => {
    const communities = await api.get(
      `/community/getUserCommunity?userEmail=${user.data.email}`,
    );

    const comId = communities.data.id;

    const leaderResp = await api.get(
      `/community/getAdminUsers?communityId=${comId}`,
    );
    const leaders = leaderResp.data;

    const privillege = leaders.some((users) => users.userId === user.data.id);
    return privillege;
  };

  const [leader, setIsLeader] = useState(false);
  isLeader().then((response) => {
    setIsLeader(response);
  });

  const getPointsAndAreas = async () => {
    try {
      if (user.id) {
        const response = await api.get(
          `/maps/communityDataByUserEmail/${user.email}`,
        );
        const {data} = response;
        if (data && data.points && data.areas) {
          dispatch(Actions.populateMarkers(data.points, data.areas));
        }
      }
    } catch (error) {
      Alert.alert(error.title, error.message);
    }
  };

  useEffect(() => {
    getPointsAndAreas();
  }, [markers.length]);

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
  const moveToCurrentLocation = () => {
    if (location) {
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  useEffect(() => {
    moveToCurrentLocation();
  }, [location]);

  const alwaysOpenActions = [
    {
      icon: 'street-view',
      onPress: () => moveToCurrentLocation(),
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
    /* if (marker.coordinates) {
      let latitude = marker.coordinates[0].latitude;
      let longitude = marker.coordinates[0].longitude;
      
      for (let i = 1; i < marker.coordinates.length; i++) {
        latitude += marker.coordinates[i].latitude;
        longitude += marker.coordinates[i].longitude;
      }

      latitude /= marker.coordinates.length;
      longitude /= marker.coordinates.length;

      setRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.03,
      })
    } */
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
          {markers.map((marker, index) => {
            if (marker.coordinates) {
              const polygonValidated = async (id) => {
                const endpoint = '/maps/area/';
                const userResponse = await api.get(`${endpoint}${id}`);
                marker.validated = userResponse.data.validated;
              };
              polygonValidated(marker.id);

              if ((user.data && leader) || marker.validated) {
                return (
                  <Polygon
                    key={index}
                    coordinates={marker.coordinates}
                    tappable
                    strokeColor="#000"
                    fillColor={marker.validated === true ? red : yellow}
                    strokeWidth={1}
                    onPress={() => onPressMarker(marker)}
                  />
                );
              }

              return null;
            }

            return (
              <Marker key={index} marker={marker} onPress={onPressMarker} />
            );
          })}
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
          addPointToArea={onPressCreatingArea.current}
          setPoint={setRegion}
        />
        <MarkerDetails
          leader={leader}
          marker={selectedMarker}
          setSelectedMarker={setSelectedMarker}
          sheetRef={(ref) => {
            detailsRef.current = ref;
          }}
          close={() => {
            detailsRef.current.close();
            getPointsAndAreas();
          }}
        />
      </View>
    );
  }

  return null;
};

export default Map;
