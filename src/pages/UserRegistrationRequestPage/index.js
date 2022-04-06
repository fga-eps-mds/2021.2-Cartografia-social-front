import React, {useState, useEffect} from 'react';
import api from 'services/api';
import ScrollView from 'components/UI/ScrollView';
import Input from 'components/UI/Input';
import required from 'validators/required';
import Btn from 'components/UI/Btn';
import normalize from 'react-native-normalize';
import {Alert, Keyboard, Picker} from 'react-native';
import {
  Container,
  Header,
  HeaderText,
  InputText,
  PickerContainer,
  PickerText,
  Icon,
} from './styles';
import ComunityPicker from '../../components/ComunityPicker';
// import { map } from 'lodash';
// import UserRegistrationPicker from '../../components/UserRegistrationPicker';

let works = true;

const UserRegistrationRequestPage = ({navigation}) => {
  // Campos: name, email, telefone, senha, confirmar senha e justificativa
  const [name, setName] = useState({
    isValid: false,
    value: '',
  });

  const [email, setEmail] = useState({
    isValid: false,
    value: '',
  });

  const [cellPhone, setCellPhone] = useState({
    isValid: false,
    value: '',
  });

  const [password, setPassword] = useState({
    isValid: false,
    value: '',
  });

  const [ispassword, setIspassword] = useState({
    isValid: false,
    value: '',
  });

  const [posicao, setPosicao] = useState({
    isValid: false,
    value: '',
  });

  const [cargo, setCargo] = useState({
    isValid: false,
    value: '',
  });

  const [comunidade, setComunidade] = useState({
    isValid: false,
    value: '',
  });

  // Get das comunidades
  const [communitySelected, setComunitySelected] = useState(
    'Selecione uma comunidade',
  );
  const [getComunityFromApi, setGetComunityFromApi] = useState(false);
  const toggleGetFromApiComunity = () =>
    setGetComunityFromApi(!getComunityFromApi);

  // Get cargos
  /* const [cargoSelected, setCargoSelected] = useState('Selecione uma cargo');
  const [getCargo, setGetCargo] = useState(false);
  const toggleGetFromApiUserRegistration = () =>
    setGetComunityFromApi(!getComunityFromApi); */

  // Modal Comunidades
  const [isModalComunityPickerVisible, setIsModalComunityPickerVisible] =
    useState(false);
  const toggleModalComunityPicker = () =>
    setIsModalComunityPickerVisible(!isModalComunityPickerVisible);
  const onOpenModalComunity = () => {
    toggleGetFromApiComunity();
    setIsModalComunityPickerVisible(true);
  };

  // Modal Paper
  // const [paper] = useState(['Membro', 'Pesquisador', 'Membro Pesquisador']);

  /* const [isModaPaperPickerVisible, setIsModalPaperPickerVisible] =
    useState(false);
  const toggleModalPaperPicker = () =>
    setIsModalPaperPickerVisible(!isModaPaperPickerVisible);
  const onOpenModalPaperUser = () => {
    toggleModalPaperPicker();
    // eslint-disable-next-line no-unused-expressions
    [
      {
        Membro: 'Membro',
      },
      {
        Pesquisador: 'Pesquisador',
      },
      {
        MembroPesquisador: 'Membro Pesquisador',
      },
    ];
    setIsModalPaperPickerVisible(true);
  }; */
  // Aplicação de um efeito
  useEffect(() => {
    if (navigation.getParent()) {
      navigation.getParent().setOptions({headerShown: false});
    }
  }, [navigation]);

  // Vallidação de campos
  const formIsValid = () => {
    return name.value && email.value && password.value && ispassword.value;
  };

  const passwordValidation = () => {
    if (password.value !== ispassword.value) {
      Alert.alert('Atenção!', 'Senhas não conferem!');
      return false;
    }
    return true;
  };

  const onError = () => {
    works = false;
  };

  const addUserRequest = async (userRequestDto) => {
    await api.post('users/createUser', userRequestDto).catch(onError);

    if (works) {
      Alert.alert(
        'Solicitação enviada!',
        'Você será informado via email após aprovação do cadastro',
      );
      navigation.navigate('LoginPage');
    } else {
      Alert.alert('Erro', 'Erro ao enviar solicitação!');
    }
  };

  const onSave = async () => {
    Keyboard.dismiss();
    if (passwordValidation(password.value, ispassword.value)) {
      const userRequestDto = {
        name: name.value,
        email: email.value,
        cellPhone: cellPhone.value,
        password: password.value,
        // justification: justify.value,
        community: communitySelected.id,
      };
      addUserRequest(userRequestDto);
    }
  };

  // Retornando a página
  return (
    <>
      <Header>
        <HeaderText my={3}>Solicitar Cadastro</HeaderText>
      </Header>
      <ComunityPicker
        visible={isModalComunityPickerVisible}
        toggle={toggleModalComunityPicker}
        setComunity={setComunitySelected}
        update={getComunityFromApi}
      />
      <ScrollView>
        <Container>
          <InputText>Nome</InputText>
          <Input
            label="Digite seu nome completo"
            onChange={setName}
            value={name.value}
            autoCapitalize="words"
            rules={[required]}
          />
          <InputText>Email</InputText>
          <Input
            label="Digite seu principal email"
            onChange={setEmail}
            value={email.value}
            autoCapitalize="words"
            rules={[required]}
          />
          <InputText>Telefone</InputText>
          <Input
            label="Ex: +5561998877665"
            onChange={setCellPhone}
            value={cellPhone.value}
            autoCapitalize="words"
            rules={[required]}
          />
          <InputText>Senha</InputText>
          <Input
            label="Digite uma senha"
            onChange={setPassword}
            value={password.value}
            autoCapitalize="words"
            rules={[required]}
          />
          <InputText>Confirme sua Senha</InputText>
          <Input
            label="Digite sua senha novamente"
            onChange={setIspassword}
            value={ispassword.value}
            autoCapitalize="words"
            rules={[required]}
          />
          <InputText>Posição dentro da comunidade</InputText>
          <Picker>
            <Picker.Item label="Membro" value="Membro" />
            <Picker.Item label="Pesquisador" value="Pesquisador" />
            <Picker.Item
              label="Membro Pesquisador"
              value="Membro Pesquisador"
            />
          </Picker>
          <InputText>Cargo (Membros)</InputText>
          <Input
            label="Qual o seu cargo dentro da comunidade?"
            onChange={setCargo}
            value={cargo.value}
            autoCapitalize="words"
            rules={[required]}
          />
          <InputText>Comunidade (Pesquisadores)</InputText>
          <PickerContainer onPress={onOpenModalComunity}>
            <PickerText selected>
              {communitySelected.name
                ? communitySelected.name
                : communitySelected}
            </PickerText>
            <Icon size={normalize(20)} name="angle-down" color="#a3a3a3" />
          </PickerContainer>
          <Btn
            style={{marginVertical: 50}}
            title="Enviar solicitação"
            onPress={onSave}
            disabled={!formIsValid()}
          />
        </Container>
      </ScrollView>
    </>
  );
};

export default UserRegistrationRequestPage;
