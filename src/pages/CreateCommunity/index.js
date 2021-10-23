import React, {useState} from 'react';
import Input from 'components/UI/Input';
import required from 'validators/required';
import ScrollView from 'components/UI/ScrollView';
import normalize from 'react-native-normalize';
import api from 'services/api';
import {useSelector} from 'react-redux';
import {auth} from 'store/selectors';
import Picker from '../../components/Picker';
import Btn from '../../components/UI/Btn';
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
  const user = useSelector(auth);
  const toggleModalPicker = () =>
    setIsModalPickerVisible(!isModalPickerVisible);

  // Valida formulário
  const formIsValid = (questions) => {
    if (!userSelected.email) {
      return false;
    }
    let isValid = true;
    questions.some((item) => {
      if (!item.isValid) {
        isValid = false;
        return true;
      }
      return false;
    });
    return isValid;
  };

  const getSelectedUserInfo = async () => {
    const response = await api
      .get(
        'users/userByEmail',
        {
          params: {
            email: userSelected.email ? userSelected.email : '',
          },
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
    return response;
  };

  const postCommunity = async () => {
    const communityDto = {
      name: communityName.value,
      description: communityDescription.value,
    };
    const response = await api
      .post('community', communityDto, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });

    return response;
  };

  const addUserToCommunity = async (userDto) => {
    await api
      .post('community/addUser', userDto, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  const addAdminUserToCommunity = async (adminUserDto) => {
    await api
      .post('community/addAdminUser', adminUserDto, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  const onSave = async () => {
    const userResponse = getSelectedUserInfo();
    const communityResponse = postCommunity();
    const userId = userResponse.data.id;
    const communityId = communityResponse.data.id;

    const userDto = {
      userId,
      communityId,
    };

    addUserToCommunity(userDto);
    addAdminUserToCommunity(userDto);
  };

  return (
    <Main>
      <Picker
        visible={isModalPickerVisible}
        toggle={toggleModalPicker}
        setUser={setUserSelected}
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
            <PickerText selected>
              {userSelected.email ? userSelected.email : userSelected}
            </PickerText>
            <Icon size={normalize(20)} name="angle-down" color="#a3a3a3" />
          </PickerContainer>
          <Btn
            title="Salvar"
            color="#FFF"
            onPress={onSave}
            disabled={!formIsValid([communityName, communityDescription])}
          />
        </Container>
      </ScrollView>
    </Main>
  );
};

export default CreateCommunity;
