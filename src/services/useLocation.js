import {useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export default () => {
  const [location, setLocation] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  const requestLocation = () => {
    let permission;
    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.LOCATION_ALWAYS;
    } else {
      permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    }

    request(permission).then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          Alert.alert(
            'Atenção',
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          Alert.alert(
            'Atenção',
            'The permission has not been requested / is denied but requestable',
          );
          break;
        case RESULTS.LIMITED:
          Alert.alert(
            'Atenção',
            'The permission is limited: some actions are possible',
          );
          break;
        case RESULTS.GRANTED:
          setHasLocationPermission(true);
          break;
        case RESULTS.BLOCKED:
          Alert.alert(
            'Atenção',
            'The permission is denied and not requestable anymore',
          );
          break;
        default:
      }
    });
  };
  const getLocation = () => {
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          setLocation(position.coords);
        },
        (error) => {
          Alert.alert('Atenção', error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, [hasLocationPermission]);

  useEffect(() => {
    requestLocation();
  }, []);

  return {
    location,
    requestLocation,
  };
};
