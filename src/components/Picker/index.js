import React from 'react';
import Modal from 'react-native-modal';
import normalize from 'react-native-normalize';
import Input from 'components/UI/Input';
import required from 'validators/required';
import {FlatList} from 'components/UI';
import Btn from '../UI/Btn';
import {
  ModalContainer,
  SearchBox,
  ItemText,
  UserItem,
  EmptyArea,
  Icon,
} from './styles';

const Picker = ({visible, toggle}) => {
  const renderItem = (item) => (
    <UserItem>
      <Icon size={normalize(25)} name="user-circle" color="#a3a3a3" />
      <ItemText>{item.name}</ItemText>
    </UserItem>
  );

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
            onChange={() => {}}
            autoCapitalize="words"
            rules={[required]}
          />
        </SearchBox>
        <FlatList
          verticalScroll
          data={[1, 2, 3, 1, 1, 1, 1]}
          keyExtractor={() => 1}
          renderItem={renderItem}
        />
        <Btn title="Fechar" color="#FFF" onPress={toggle} />
      </ModalContainer>
    </Modal>
  );
};

export default Picker;
