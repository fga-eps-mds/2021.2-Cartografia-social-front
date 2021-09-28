import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';
import { checkPermission } from './checkPermission';

export default () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  const requestCamera = async () => {
    if (Platform.OS === 'ios') {
      // IOS check here
    } else {
      const resultCamera = await checkPermission(PERMISSIONS.ANDROID.CAMERA);
      setHasCameraPermission(resultCamera);
    }
  };

  useEffect(() => {
    requestCamera();
  }, []);

  return {
    hasCameraPermission,
  };
};
