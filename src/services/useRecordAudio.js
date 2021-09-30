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

  const requestAudio = async () => {
    if (Platform.OS === 'ios') {
      // IOS check here
    } else {
      const resultAudio = await checkPermission(
        PERMISSIONS.ANDROID.RECORD_AUDIO,
      );
      setHasAudioPermission(resultAudio);

      const resultWrite = await checkPermission(
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      );
      setHasWriteStoragePermission(resultWrite);

      const resultRead = await checkPermission(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      setReadStoragePermission(resultRead);
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
