import {useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS} from 'react-native-permissions';
import {checkPermission} from './checkPermission';

export default () => {
  const [location, setLocation] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  const requestLocation = () => {
    if (Platform.OS === 'ios') {
      checkPermission(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
        setHasLocationPermission(result);
      });
    } else {
      checkPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
        (result) => {
          setHasLocationPermission(result);
        },
      );
    }
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
