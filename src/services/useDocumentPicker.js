import {Platform} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';
import DocumentPicker from 'react-native-document-picker';
import {checkPermission} from './checkPermission';

export default async function useDocumentPicker() {
  let isPermissionGranted = false;

  if (Platform.OS === 'ios') {
    isPermissionGranted = await checkPermission(PERMISSIONS.IOS.MEDIA_LIBRARY);
  } else {
    isPermissionGranted = await checkPermission(
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    );
  }

  if (isPermissionGranted) {
    const results = await DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.pdf],
    });

    return results;
  }

  return [];
}
