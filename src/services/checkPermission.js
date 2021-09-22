import {RESULTS, request} from 'react-native-permissions';
import {Alert, Linking} from 'react-native';

export async function checkPermission(permission) {
  let isPermissionGranted = false;
  let permissionRequestText = '';

  await request(permission).then((result) => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        Alert.alert(
          'Permission Unavailable',
          'This feature is not available (on this device / in this context).',
          [
            {
              text: 'Close',
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
        break;
      case RESULTS.DENIED:
        request(permission).then((requestResult) => {
          if (requestResult === 'granted') {
            isPermissionGranted = true;
          } else {
            Alert.alert(
              'Permission Denied',
              'You need to allow permission to use this functionality.',
              [
                {
                  text: 'Close',
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            );
          }
        });
        break;
      case RESULTS.GRANTED:
        isPermissionGranted = true;
        break;
      case RESULTS.BLOCKED:
        if (
          permission.toString() === 'android.permission.WRITE_EXTERNAL_STORAGE'
        ) {
          permissionRequestText =
            'Please allow the storage permission to download the file.';
        }

        Alert.alert(
          'Permission Request',
          permissionRequestText,
          [
            {
              text: 'Go to Settings',
              onPress: () => {
                Linking.openSettings();
              },
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
        break;
      default:
    }
  });
  console.log(isPermissionGranted);
  return isPermissionGranted;
}
