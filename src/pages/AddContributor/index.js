import React, {useState} from 'react';
import {Alert, Keyboard, CheckBox, Text} from 'react-native';
import ScrollView from 'components/UI/ScrollView';
import normalize from 'react-native-normalize';
import api from 'services/api';
import {useSelector, useDispatch} from 'react-redux';
import * as Actions from 'store/actions';
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
  styles,
} from './styles';

const AddContributor = ({navigation}) => {
  // CheckBox
  const [isSelected, setSelection] = useState(false);
  const [isModalPickerVisible, setIsModalPickerVisible] = useState(false);
  const [getFromApi, setGetFromApi] = useState(false);
  // eslint-disable-next-line prettier/prettier
  const [communitySelected, setComunitySelected] = useState('Selecione uma comunidade');
  const [userSelected, setUserSelected] = useState('Selecione um usuário');
  const user = useSelector(auth);
  const toggleModalPicker = () =>
    setIsModalPickerVisible(!isModalPickerVisible);
  // Get dos usuários
  const toggleGetFromApi = () => setGetFromApi(!getFromApi);
  const dispatch = useDispatch();
  let works = true;
  // Get das comunidades
  // const toggleGetFromApi = () => setGetFromApi(!getFromApi);

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

  const onError = () => {
    works = false;
  };

  const getSelectedUserInfo = async () => {
    return api
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
        onError();
        if (error.response.status === 401) {
          Alert.alert(
            'Atenção!',
            'Seu token expirou! É necesário realizar novamente o login',
          );
          dispatch(Actions.logout());
        }
      });
  };

  // Get community info
  const getSelectedCommunityInfo = async () => {
    return api
      .get(
        'community/',
        {
          params: {
            id: communitySelected.id ? communitySelected.id : '',
          },
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
      .catch((error) => {
        onError();
        if (error.response.status === 401) {
          Alert.alert(
            'Atenção!',
            'Seu token expirou! É necesário realizar novamente o login',
          );
          dispatch(Actions.logout());
        }
      });
  };

  /*const postCommunity = async () => {
    // A const deve ser reformulada a fim de localizar a comulidade, e não posta-la
    const communityDto = {
      name: communitySelected.value,
    };
    return api
      .post('community', communityDto, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .catch(onError);
  };*/

  const addUserToCommunity = async (userDto) => {
    await api
      .post('community/addUser', userDto, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .catch(onError);
  };

  const addAdminUserToCommunity = async (adminUserDto) => {
    await api
      .post('community/addAdminUser', adminUserDto, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .catch(onError);
  };

  const onOpenModalUser = () => {
    toggleGetFromApi();
    setIsModalPickerVisible(true);
  };

  const onOpenModalComunity = () => {
    toggleGetFromApi();
    setIsModalPickerVisible(true);
  };

  const onSave = async () => {
    // onSave dever ser alterado para receber o id da comunidade

    Keyboard.dismiss();
    const userResponse = await getSelectedUserInfo();
    const communityInfo = await getSelectedCommunityInfo();
    let userId;
    //let communityResponse;
    if (userResponse) {
      userId = userResponse.data.id;
      //communityResponse = await postCommunity(); this was replaced by getSelectedCommunityInfo
    }
    if (communityInfo && userResponse) {
      const communityId = communityInfo.id;
      const userDto = {
        userId,
        communityId,
      };
      await addUserToCommunity(userDto);
      await addAdminUserToCommunity(userDto);
    }

    if (works) {
      Alert.alert('Sucesso', 'Usuário inserido!');
      navigation.navigate('Map');
    } else {
      Alert.alert(
        'Atenção',
        'Erro ao adicionar usuário. Tente novamente mais tarde!',
      );
    }

    setComunitySelected('Selecione uma comunidade');
    setUserSelected('Selecione um usuário');
  };

  return (
    <Main>
      <Picker
        visible={isModalPickerVisible}
        toggle={toggleModalPicker}
        setUser={setUserSelected}
        update={getFromApi}
      />
      <ScrollView>
        <Container>
          <InputText>Nome da comunidade</InputText>
          <PickerContainer onPress={onOpenModalComunity}>
            <PickerText selected>
              {userSelected.email ? userSelected.email : communitySelected}
            </PickerText>
            <Icon size={normalize(20)} name="angle-down" color="#a3a3a3" />
          </PickerContainer>

          <InputText>Selecione o usuário a ser inserido</InputText>
          <PickerContainer onPress={onOpenModalUser}>
            <PickerText selected>
              {userSelected.email ? userSelected.email : userSelected}
            </PickerText>
            <Icon size={normalize(20)} name="angle-down" color="#a3a3a3" />
          </PickerContainer>

          <Container style={styles.container}>
            <Container style={styles.checkboxContainer}>
              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
              />
              <Text style={styles.label}>Adicionar como administrador</Text>
            </Container>
          </Container>

          <Btn
            title="Salvar"
            color="#fff"
            onPress={onSave}
            disabled={!formIsValid([communitySelected])}
          />
        </Container>
      </ScrollView>
    </Main>
  );
};

export default AddContributor; // Exportando pagina
