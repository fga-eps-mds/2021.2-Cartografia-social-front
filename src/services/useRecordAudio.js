import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';
import {checkPermission} from './checkPermission';

export default () => {
  const [ableToRecord, setAbleToRecord] = useState(false);
  const [hasWriteStoragePermission, setHasWriteStoragePermission] =
    useState(false);
  const [hasReadStoragePermission, setReadStoragePermission] = useState(false);
  const [hasAudioPermission, setHasAudioPermission] = useState(false);

  const requestAudio = () => {
    if (Platform.OS === 'ios') {
      // IOS check here
    } else {
      checkPermission(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(
        (result) => {
          setHasWriteStoragePermission(result);
        },
      );
      checkPermission(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(
        (result) => {
          setReadStoragePermission(result);
        },
      );
      checkPermission(PERMISSIONS.ANDROID.RECORD_AUDIO).then((result) => {
        setHasAudioPermission(result);
      });
    }
  };

  const isRecordAudio = () => {
    if (
      hasWriteStoragePermission &&
      hasReadStoragePermission &&
      hasAudioPermission
    ) {
      setAbleToRecord(true);
    }
  };

  useEffect(() => {
    isRecordAudio();
  }, [hasWriteStoragePermission, hasReadStoragePermission, hasAudioPermission]);

  useEffect(() => {
    requestAudio();
  }, []);

  return {
    ableToRecord,
  };
};
