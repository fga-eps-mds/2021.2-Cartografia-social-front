import {RESULTS, request} from 'react-native-permissions';
import {Alert, Linking} from 'react-native';

export async function checkPermission(permission) {
  let isPermissionGranted = false;
  let permissionRequestText = '';

  await request(permission).then((result) => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        Alert.alert(
          'Permissão indisponível',
          'Aparelho não suporta essa funcionalidade.',
          [
            {
              text: 'Fechar',
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
              'Permissão negada!',
              'Você precisa habilitar a permissão para usar essa funcionalidade.',

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
          'Permissão requisitada',
          permissionRequestText,
          [
            {
              text: 'Habilite em configurações',
              onPress: () => {
                Linking.openSettings();
              },
            },
            {
              text: 'Cancelar',
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
        break;
      default:
    }
  });
  return isPermissionGranted;
}
