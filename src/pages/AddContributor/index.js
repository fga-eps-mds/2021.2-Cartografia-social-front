/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Alert, Keyboard, CheckBox, Text} from 'react-native';
import ScrollView from 'components/UI/ScrollView';
import normalize from 'react-native-normalize';
import api from 'services/api';
import {useSelector, useDispatch} from 'react-redux';
import * as Actions from 'store/actions';
import {auth} from 'store/selectors';
import Picker from '../../components/Picker';
import ComunityPicker from '../../components/ComunityPicker';
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
  
  // Geral 
  const dispatch = useDispatch();
  let works = true;

  // CheckBox
  const [isSelected, setSelection] = useState(false);

  // Modal
  const [isModalUserPickerVisible, setIsModalUserPickerVisible] = useState(false);
  const [isModalComunityPickerVisible, setIsModalComunityPickerVisible] = useState(false);
  const toggleModalUserPicker = () => setIsModalUserPickerVisible(!isModalUserPickerVisible);
  const toggleModalComunityPicker = () => setIsModalComunityPickerVisible(!isModalComunityPickerVisible);

  // Get dos usuários
  const user = useSelector(auth);
  const [userSelected, setUserSelected] = useState('Selecione um usuário');
  const [getUserFromApi, setGetUserFromApi] = useState(false);
  const toggleGetFromApiUser = () => setGetUserFromApi(!getUserFromApi);

  // Get das comunidades
  const [communitySelected, setComunitySelected] = useState('Selecione uma comunidade');
  const [getComunityFromApi, setGetComunityFromApi] = useState(false);
  const toggleGetFromApiComunity = () => setGetComunityFromApi(!getComunityFromApi);

  // Valida formulário
  const formIsValid = () => {
    if (!userSelected.email || !communitySelected.name) {
      return false;
    }
    return true;
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
            id: userSelected.id ? userSelected.id : '',
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


  const addUserToCommunity = async (userDto) => {
    await api
      .post('community/addUser', userDto, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .catch(onError);
  };

  const addAdminUserToCommunity = async (userDto) => {
    await addUserToCommunity(userDto)
    await api
      .post('community/addAdminUser', userDto, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .catch(onError);
  };
  
  const onOpenModalUser = () => {
    toggleGetFromApiUser();
    setIsModalUserPickerVisible(true);
  };

  const onOpenModalComunity = () => {
    toggleGetFromApiComunity();
    setIsModalComunityPickerVisible(true);
  };

  const onSave = async () => {

    Keyboard.dismiss();
    const userResponse = await getSelectedUserInfo();
    const communityInfo = communitySelected;
    let userId;
    if (userResponse) {
      userId = userResponse.data.id;
    }
    if (communityInfo && userResponse) {
      const communityId = communitySelected.id;
      const userDto = {
        userId,
        communityId,
      };
      if (isSelected){
        await addAdminUserToCommunity(userDto);
      } else{
        await addUserToCommunity(userDto);
      }
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
        visible={isModalUserPickerVisible}
        toggle={toggleModalUserPicker}
        setUser={setUserSelected}
        update={getUserFromApi}
      />
      <ComunityPicker
        visible={isModalComunityPickerVisible}
        toggle={toggleModalComunityPicker}
        setComunity={setComunitySelected}
        update={getComunityFromApi}
      />
      <ScrollView>
        <Container>
          <InputText>Nome da comunidade</InputText>
          <PickerContainer onPress={onOpenModalComunity}>
            <PickerText selected>
              {communitySelected.name ? communitySelected.name : communitySelected}
            </PickerText>
            <Icon size={normalize(20)} name="angle-down" color="#a3a3a3" />
          </PickerContainer>

          <InputText>Adicione um membro da comunidade</InputText>
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
            disabled={!formIsValid()}
          />
        </Container>
      </ScrollView>
    </Main>
  );
};

export default AddContributor;
