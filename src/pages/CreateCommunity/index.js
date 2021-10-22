import React, {useState, useEffect} from 'react';
import Input from 'components/UI/Input';
import required from 'validators/required';
import ScrollView from 'components/UI/ScrollView';
import normalize from 'react-native-normalize';
import Picker from '../../components/Picker';
import {
  Main,
  Container,
  InputText,
  PickerContainer,
  PickerText,
  Icon,
} from './styles';

const CreateCommunity = () => {
  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');
  const [isModalPickerVisible, setIsModalPickerVisible] = useState(false);
  const [userSelected, setUserSelected] = useState('Selecione um usuário');

  const toggleModalPicker = () =>
    setIsModalPickerVisible(!isModalPickerVisible);

  useEffect(() => {
    console.log(communityName);
    console.log(communityDescription);
  }, [communityName, communityDescription]);

  useEffect(() => {
    // get users from api
  }, []);

  return (
    <Main>
      <Picker
        visible={isModalPickerVisible}
        toggle={toggleModalPicker}
        setName={setUserSelected}
      />
      <ScrollView>
        <Container>
          <InputText>Nome da comunidade</InputText>
          <Input
            label="Insira o nome da comunidade"
            onChange={(value) => setCommunityName(value)}
            autoCapitalize="words"
            rules={[required]}
          />

          <InputText>Descrição da comunidade</InputText>
          <Input
            label="Insira uma breve descrição da comunidade"
            onChange={(value) => setCommunityDescription(value)}
            autoCapitalize="words"
            rules={[required]}
          />
          <InputText>Selecione o administrador da comunidade</InputText>
          <PickerContainer onPress={() => setIsModalPickerVisible(true)}>
            <PickerText selected>{userSelected}</PickerText>
            <Icon size={normalize(20)} name="angle-down" color="#a3a3a3" />
          </PickerContainer>
        </Container>
      </ScrollView>
    </Main>
  );
};

export default CreateCommunity;
