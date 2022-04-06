import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import normalize from 'react-native-normalize';
import {FlatList} from 'components/UI';
import PropTypes from 'prop-types';
import theme from 'theme/theme';
import Btn from '../UI/Btn';

import {
  ModalContainer,
  ItemText,
  ComunityItem,
  Icon,
  MessageText,
  FlatListView,
} from './styles';

const UserRegistrationPicker = ({visible, toggle, setComunity, update}) => {
  const [itens, setItens] = useState([]);
  const [auxItens, setAuxItens] = useState([]);
  const [loading, setLoading] = useState(true);
  // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    [
      {
        name: 'COMUNIDADE',
        description: 'Comunidade de teste',
        imageUrl: 'string',
        id: '622fbdda0fc3fb001f06293f',
      },
      {
        name: 'comunidade_teste',
        description: 'comunidade de teste',
        imageUrl: 'string',
        id: '62335bb2e5adf5002a43671e',
      },
      {
        name: 'Comunidade_teste1',
        description: 'Comunidade de teste',
        imageUrl: 'string',
        id: '623a49021bf367002a637803',
      },
    ];
  }, [update]);

  const renderItem = (item) =>
    loading ? (
      <View style={{flex: 1}}>
        <ActivityIndicator size={30} color="#ccc" />
      </View>
    ) : (
      <ComunityItem
        onPress={() => {
          setComunity(item);
          setAuxItens([...itens]);
          setLoading(true);
          toggle();
        }}>
        <Icon size={normalize(25)} name="user-circle" color="#a3a3a3" />
        <ItemText>{item.name}</ItemText>
      </ComunityItem>
    );

  const onCloseModal = () => {
    setLoading(true);
    toggle();
    setItens([]);
    setAuxItens([]);
  };

  return (
    <Modal
      isVisible={visible}
      style={{justifyContent: 'flex-end', alignItems: 'center', margin: 0}}
      onPress>
      <ModalContainer>
        {!loading && itens.length === 0 ? (
          <MessageText>Não existem comunidades cadastradas!</MessageText>
        ) : (
          <>
            <FlatListView>
              <FlatList
                keyboardShouldPersistTaps="handled"
                mb={3}
                verticalScroll
                keyExtractor={(item) => item.id}
                data={loading ? [1] : auxItens}
                renderItem={({item}) => renderItem(item)}
              />
            </FlatListView>
          </>
        )}
        <Btn
          title="Fechar"
          background={theme.colors.grey}
          onPress={onCloseModal}
        />
      </ModalContainer>
    </Modal>
  );
};

UserRegistrationPicker.propTypes = {
  visible: PropTypes.bool,
  toggle: PropTypes.func,
  setComunity: PropTypes.func,
  update: PropTypes.bool,
};

UserRegistrationPicker.defaultProps = {
  visible: false,
  toggle: () => null,
  setComunity: () => null,
  update: false,
};

export default UserRegistrationPicker;
