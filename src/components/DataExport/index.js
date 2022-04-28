import {Alert} from 'react-native';
import React from 'react';
import Text from 'components/UI/Text';

const DataExport = () => {
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

  if (onConfirmation()) {
    console.log('Exportação realizada com sucesso');
  }

  return <Text>Exportar</Text>;
};

export default DataExport;
