import {Alert} from 'react-native';
import api from 'services/api';
import auth from 'store/selectors/auth';
import {useSelector} from 'react-redux';

const DataExport = () => {
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

  const exportData = async () => {
    const communities = await api.get(
      `/community/getUserCommunity?userEmail=${user.data.email}`,
    );

    const comId = communities.data.id;

    console.log(user.data.email);
    console.log(communities.data.id);

    const communityArea = api.get(
      `/community/getUserCommunity?communityId=${comId}`,
    );
    const communityPoint = api.get(
      `/community/exportCommunityPointToKml/${comId}`,
    );

    return communityArea;
  };

  return exportData();
};

export default DataExport;
