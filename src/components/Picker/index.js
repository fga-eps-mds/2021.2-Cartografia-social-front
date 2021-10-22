import React, {useState} from 'react';
import Modal from 'react-native-modal';
import normalize from 'react-native-normalize';
import Input from 'components/UI/Input';
import required from 'validators/required';
import {FlatList} from 'components/UI';
import PropTypes from 'prop-types';
import Btn from '../UI/Btn';
import {
  ModalContainer,
  SearchBox,
  ItemText,
  UserItem,
  EmptyArea,
  Icon,
} from './styles';

const Picker = ({visible, toggle, setName}) => {
  const users = [
    {name: 'arthur', role: 'usuario_comum'},
    {name: 'bruno', role: 'usuario_comum'},
    {name: 'lucas', role: 'usuario_comum'},
    {name: 'anderson', role: 'usuario_comum'},
    {name: 'Aline', role: 'usuario_comum'},
    {name: 'amanda', role: 'usuario_comum'},
    {name: 'atila', role: 'usuario_comum'},
  ];
  const [itens, setItens] = useState([...users]);
  const [auxItens, setAuxItens] = useState([...users]);

  const renderItem = (item) => (
    <UserItem
      onPress={() => {
        setName(item.name);
        toggle();
        setItens([...users]);
        setAuxItens([...users]);
      }}>
      <Icon size={normalize(25)} name="user-circle" color="#a3a3a3" />
      <ItemText>{item.name}</ItemText>
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
        <SearchBox>
          <Input
            label="Pesquisar..."
            onChangeText={(text) => findResults(text)}
            autoCapitalize="words"
            rules={[required]}
          />
        </SearchBox>
        <FlatList
          keyboardShouldPersistTaps="handled"
          mb={2}
          verticalScroll
          data={auxItens}
          renderItem={({item}) => renderItem(item)}
        />
        <Btn title="Fechar" color="#FFF" onPress={toggle} />
      </ModalContainer>
    </Modal>
  );
};

Picker.propTypes = {
  visible: PropTypes.bool,
  toggle: PropTypes.func,
  setName: PropTypes.func,
};

Picker.defaultProps = {
  visible: false,
  toggle: () => {},
  setName: () => {},
};

export default Picker;
