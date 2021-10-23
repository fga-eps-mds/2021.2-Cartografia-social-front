import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import normalize from 'react-native-normalize';
import Input from 'components/UI/Input';
import required from 'validators/required';
import {FlatList} from 'components/UI';
import api from 'services/api';
import PropTypes from 'prop-types';
import Btn from '../UI/Btn';

import {
  ModalContainer,
  SearchBox,
  ItemText,
  UserItem,
  EmptyArea,
  Icon,
  MessageText,
  FlatListView,
} from './styles';

const Picker = ({visible, toggle, setUser}) => {
  const [itens, setItens] = useState([]);
  const [auxItens, setAuxItens] = useState([]);

  useEffect(() => {
    async function getUsersWithoutACommunity() {
      const response = await api
        .get('community/getUsersWithoutACommunity')
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });

      if (response) {
        setItens([...response.data]);
        setAuxItens([...response.data]);
      }
    }

    getUsersWithoutACommunity();
  }, []);

  const renderItem = (item) => (
    <UserItem
      onPress={() => {
        setUser(item);
        toggle();
        setAuxItens([...itens]);
      }}>
      <Icon size={normalize(25)} name="user-circle" color="#a3a3a3" />
      <ItemText>{item.email}</ItemText>
    </UserItem>
  );

  const findResults = (text) => {
    setAuxItens(
      itens.filter(
        (item) => item.name.toUpperCase().indexOf(text.toUpperCase()) >= 0,
      ),
    );
  };

  return (
    <Modal
      isVisible={visible}
      style={{justifyContent: 'flex-end', alignItems: 'center', margin: 0}}
      onPress>
      <EmptyArea onPress={() => toggle()} />
      <ModalContainer>
        {itens.length > 0 ? (
          <>
            <SearchBox>
              <Input
                label="Pesquisar..."
                onChangeText={(text) => findResults(text)}
                autoCapitalize="words"
                rules={[required]}
              />
            </SearchBox>
            <FlatListView>
              <FlatList
                // style={{backgroundColor: '#00F'}}
                keyboardShouldPersistTaps="handled"
                // mb={4}
                verticalScroll
                data={auxItens}
                renderItem={({item}) => renderItem(item)}
              />
            </FlatListView>
          </>
        ) : (
          <MessageText>Não existem usuários disponíveis!</MessageText>
        )}
        <Btn title="Fechar" background="#ccc" onPress={toggle} />
      </ModalContainer>
    </Modal>
  );
};

Picker.propTypes = {
  visible: PropTypes.bool,
  toggle: PropTypes.func,
  setUser: PropTypes.func,
};

Picker.defaultProps = {
  visible: false,
  toggle: () => {},
  setUser: () => {},
};

export default Picker;
