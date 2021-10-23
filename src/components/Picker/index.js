import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, Alert} from 'react-native';
import Modal from 'react-native-modal';
import normalize from 'react-native-normalize';
import Input from 'components/UI/Input';
import {FlatList} from 'components/UI';
import api from 'services/api';
import PropTypes from 'prop-types';
import theme from 'theme/theme';
import Btn from '../UI/Btn';

import {
  ModalContainer,
  SearchBox,
  ItemText,
  UserItem,
  Icon,
  MessageText,
  FlatListView,
} from './styles';

const Picker = ({visible, toggle, setUser, update}) => {
  const [itens, setItens] = useState([]);
  const [auxItens, setAuxItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function getUsersWithoutACommunity() {
      await sleep(1000);
      const response = await api
        .get('community/getUsersWithoutACommunity')
        .catch((error) => {
          // eslint-disable-next-line no-console
          if (
            error.response.data.message === 'Não há usuários sem comunidades'
          ) {
            setItens([]);
            setAuxItens([]);
            setLoading(false);
          } else {
            Alert.alert(
              'Atenção!',
              'Erro ao buscar dados. Tente novamente mais tarde!',
            );
            setLoading(true);
            toggle();
          }
        });
      if (response) {
        await sleep(1000);
        const newItens = [...response.data];

        newItens.sort((a, b) => {
          return a.email > b.email ? 1 : -1;
        });
        setItens(newItens);
        setAuxItens(newItens);
        setLoading(false);
      }
    }
    getUsersWithoutACommunity();
  }, [update]);

  const renderItem = (item) =>
    loading ? (
      <View style={{flex: 1}}>
        <ActivityIndicator size={30} color="#ccc" />
      </View>
    ) : (
      <UserItem
        onPress={() => {
          setUser(item);
          setAuxItens([...itens]);
          setLoading(true);
          toggle();
        }}>
        <Icon size={normalize(25)} name="user-circle" color="#a3a3a3" />
        <ItemText>{item.email}</ItemText>
      </UserItem>
    );

  const findResults = (text) => {
    setAuxItens(
      itens.filter(
        (item) => item.email.toUpperCase().indexOf(text.toUpperCase()) >= 0,
      ),
    );
  };

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
          <MessageText>
            Não existem usuários que não estão em comunidades!
          </MessageText>
        ) : (
          <>
            <SearchBox>
              <Input
                label="Pesquisar por usuários sem comunidade"
                onChangeText={(text) => findResults(text)}
                autoCapitalize="words"
              />
            </SearchBox>
            <FlatListView>
              <FlatList
                keyboardShouldPersistTaps="handled"
                mb={3}
                verticalScroll
                keyExtractor={(item) => item.email}
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

Picker.propTypes = {
  visible: PropTypes.bool,
  toggle: PropTypes.func,
  setUser: PropTypes.func,
  update: PropTypes.bool,
};

Picker.defaultProps = {
  visible: false,
  toggle: () => {},
  setUser: () => {},
  update: false,
};

export default Picker;
