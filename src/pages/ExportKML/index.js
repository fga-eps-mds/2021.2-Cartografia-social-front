import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'react-native';
import api from 'services/api';
import NetInfo from '@react-native-community/netinfo';
import {Main, About, ConfirmButton} from './styles';

export default function ExportKML({userEmail}) {
  const netInfo = NetInfo.useNetInfo();

  const triggerExport = () => {
    const {isInternetReachable} = netInfo;
    if (!isInternetReachable) {
      Alert.alert(
        'Erro',
        'A exportação só pode ser requisitada com acesso a internet.',
      );
      return;
    }

    const endpoint = 'community/exportCommunityKML';

    api
      .get(`${endpoint}/${userEmail}`)
      .then(() => {
        Alert.alert(
          'Sucesso',
          'Os arquivos foram enviados para o email da equipe Nortear Cartografias.',
        );
      })
      .catch(() => {});
  };

  return (
    <Main>
      <About>
        Os arquivos com as coordenadas de todas as marcações feitas pela
        comunidade serão enviados para o email do Nortear Cartografias.
      </About>
      <About>
        Os dados estarão no formato KML e podem ser acessados entrando em
        contato com a equipe.
      </About>
      <ConfirmButton title="Confirmar Exportação" onPress={triggerExport} />
    </Main>
  );
}

ExportKML.propTypes = {
  userEmail: PropTypes.string.isRequired,
};
