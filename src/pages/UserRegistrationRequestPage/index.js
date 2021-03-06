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

let works = true;

const UserRegistrationRequestPage = ({navigation}) => {
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

  const [instituicao, setInstituicao] = useState({
    isValid: false,
    value: '',
  });

  const [cargo, setCargo] = useState({
    isValid: false,
    value: '',
  });

  // Get das comunidades
  const [communitySelected, setComunitySelected] = useState(
    'Selecione uma comunidade',
  );
  const [getComunityFromApi, setGetComunityFromApi] = useState();
  const toggleGetFromApiComunity = () =>
    setGetComunityFromApi(!getComunityFromApi);

  // Get cargos
  const [posicao] = useState([
    'Membro de Comunidade',
    'Pesquisador',
    'Membro Pesquisador',
  ]);
  const [posicaoSelected, setposicaoSelected] = useState(
    'Membro de Comunidade',
  );

  // Modal Comunidades
  const [isModalComunityPickerVisible, setIsModalComunityPickerVisible] =
    useState(false);
  const toggleModalComunityPicker = () =>
    setIsModalComunityPickerVisible(!isModalComunityPickerVisible);
  const onOpenModalComunity = () => {
    toggleGetFromApiComunity();
    setIsModalComunityPickerVisible(true);
  };

  // Aplica????o de um efeito
  useEffect(() => {
    if (navigation.getParent()) {
      navigation.getParent().setOptions({headerShown: false});
    }
  }, [navigation]);

  // Vallida????o de campos
  const formIsValid = () => {
    return (
      name.value &&
      email.value &&
      password.value &&
      ispassword.value &&
      cellPhone.value
    );
  };

  const passwordValidation = (senha, confirmacaoSenha) => {
    if (senha !== confirmacaoSenha) {
      Alert.alert('Aten????o!', 'Senhas n??o conferem!');
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
        'Solicita????o enviada!',
        'Voc?? ser?? informado via email ap??s aprova????o do cadastro',
      );
      navigation.navigate('LoginPage');
    } else {
      Alert.alert('Erro', 'Erro ao enviar solicita????o!');
    }
  };

  const onSave = async () => {
    Keyboard.dismiss();
    if (passwordValidation(password.value, ispassword.value)) {
      let type;

      if (posicaoSelected === 'Membro de Comunidade') type = 'COMMUNITY_MEMBER';
      else type = 'RESEARCHER';

      const userRequestDto = {
        name: name.value,
        email: email.value,
        cellPhone: cellPhone.value,
        password: password.value,
        type,
        role: cargo.value,
        affiliation: instituicao.value,
        community: communitySelected.id,
      };
      addUserRequest(userRequestDto);
    }
  };

  // Retornando a p??gina
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
            rules={[required]}
          />
          <InputText>Telefone</InputText>
          <Input
            label="Ex: +5561998877665"
            onChange={setCellPhone}
            value={cellPhone.value}
            rules={[required]}
          />
          <InputText>Senha</InputText>
          <Input
            label="Digite uma senha"
            onChange={setPassword}
            value={password.value}
            rules={[required]}
          />
          <InputText>Confirme sua Senha</InputText>
          <Input
            label="Digite sua senha novamente"
            onChange={setIspassword}
            value={ispassword.value}
            rules={[required]}
          />
          <InputText>Posi????o</InputText>
          <Picker
            selectedValue={posicaoSelected}
            onValueChange={(itemValue) => setposicaoSelected(itemValue)}>
            {posicao.map((ps) => {
              return <Picker.Item label={ps} value={ps} />;
            })}
          </Picker>
          {posicaoSelected === 'Membro de Comunidade' ||
          posicaoSelected === 'Membro Pesquisador' ? (
            <>
              <InputText>Cargo do Membro</InputText>
              <Input
                label="Qual o seu cargo dentro da comunidade?"
                onChange={setCargo}
                value={cargo.value}
                autoCapitalize="words"
                rules={[required]}
              />
            </>
          ) : null}
          {posicaoSelected === 'Pesquisador' ||
          posicaoSelected === 'Membro Pesquisador' ? (
            <>
              <InputText>Institui????o Ligada ao Pesquisador</InputText>
              <Input
                label="A qual institui????o voc?? est?? ligado?"
                onChange={setInstituicao}
                value={instituicao.value}
                autoCapitalize="words"
                rules={[required]}
              />
            </>
          ) : null}
          <InputText>Comunidade (opcional)</InputText>
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
            title="Enviar solicita????o"
            onPress={onSave}
            disabled={!formIsValid()}
          />
        </Container>
      </ScrollView>
    </>
  );
};

export default UserRegistrationRequestPage;
