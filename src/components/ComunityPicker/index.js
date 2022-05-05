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
  ComunityItem,
  Icon,
  MessageText,
  FlatListView,
} from './styles';

const ComunityPicker = ({visible, toggle, setComunity, update}) => {
  const [itens, setItens] = useState([]);
  const [auxItens, setAuxItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function getListCommunity() {
      await sleep(1000);
      const response = await api
        .get('community/listCommunities')
        .catch((error) => {
          if (
            error.response.data.message === 'Não há Comunidades cadastradas'
          ) {
            setItens([]);
            setAuxItens([]);
            setLoading(false);
          } else {
            if (visible) {
              Alert.alert(
                'Atenção!',
                'Erro ao buscar dados. Tente novamente mais tarde!',
              );
            }
            setLoading(true);
            if (visible) {
              toggle();
            }
          }
        });
      if (response) {
        await sleep(1000);
        const newItens = [...response.data];

        newItens.sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        });
        setItens(newItens);
        setAuxItens(newItens);
        setLoading(false);
      }
    }
    getListCommunity();
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

  const findResults = (text) => {
    setAuxItens(
      itens.filter(
        (item) => item.name.toUpperCase().indexOf(text.toUpperCase()) >= 0,
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
          <MessageText>Não existem comunidades cadastradas!</MessageText>
        ) : (
          <>
            <SearchBox>
              <Input
                label="Pesquisar por comunidades"
                onChangeText={(text) => findResults(text)}
                autoCapitalize="words"
              />
            </SearchBox>
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

ComunityPicker.propTypes = {
  visible: PropTypes.bool,
  toggle: PropTypes.func,
  setComunity: PropTypes.func,
  update: PropTypes.bool,
};

ComunityPicker.defaultProps = {
  visible: false,
  toggle: () => null,
  setComunity: () => null,
  update: false,
};

export default ComunityPicker;
