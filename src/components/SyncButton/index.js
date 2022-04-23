import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    position: 'absolute',
    bottom: 30,
    left: 20,
    height: 50,
    backgroundColor: '#900',
    borderRadius: 100,
  },
});

const SyncButton = ({visible, onSync}) => {
  const [isLoading, setIsLoading] = useState(false);
  const onSyncData = async () => {
    setIsLoading(true);
    try {
      await onSync();
      Alert.alert(
        'Sincronização concluída',
        'Os dados foram sincronizados com sucesso!',
      );
    } catch (error) {
      Alert.alert('Erro ao sincronizar os dados offline', error.message);
    }
    setIsLoading(false);
  };

  const onSyncButtonPress = () => {
    Alert.alert(
      'Sincronizar dados offline',
      'Deseja sincronizar os dados offline? Certifique-se que você está conectado à internet.',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: onSyncData,
        },
      ],
    );
  };

  return visible ? (
    <TouchableOpacity style={styles.button} onPress={onSyncButtonPress}>
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Icon name="cloud-upload-alt" size={23} color="#fff" />
      )}
    </TouchableOpacity>
  ) : null;
};

SyncButton.propTypes = {
  visible: PropTypes.bool,
  onSync: PropTypes.func,
};
SyncButton.defaultProps = {
  visible: false,
  onSync: () => {},
};

export default SyncButton;
