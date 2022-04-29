import {Alert} from 'react-native';
import api from 'services/api';
import auth from 'store/selectors/auth';
import {useSelector} from 'react-redux';

const DataExport = async () => {
  const user = useSelector(auth);
  const onConfirmation = () => {
    const continuar = true;
    Alert.alert(
      'Atenção',
      'Gostaria de realizar a exportação de pontos e áreas ao time da nova cartografica social?',
      [
        {
          text: 'Cancelar',
          continuar: false,
          onPress: () => Alert.alert('Atenção', 'Exportação cancelada'),
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => Alert.alert('Atenção', 'Exportação concluída'),
          style: 'cancel',
        },
      ],
    );
    return continuar;
  };

  const getInfoCommunity = async () => {
    const communityInfo = await api.get(
      `/community/getUserCommunity?userEmail=${user.data.email}`,
    );
    return communityInfo;
  };

  const exportData = async (id) => {
    const communityArea = await api.get(
      `/community/exportCommunityAreaToKml/${id}`,
    );
    const communityPoint = await api.get(
      `/community/exportCommunityPointToKml/${id}`,
    );

    return communityArea, communityPoint;
  };

  if (onConfirmation()) {
    console.log(user.data.email);
    console.log(getInfoCommunity().id);
    const Data = await exportData(getInfoCommunity().id);
    return Data;
  }

  return null;
};

export default DataExport;
