import React, {useState, useEffect} from 'react';
import {CheckBox} from 'react-native';
import ScrollView from 'components/UI/ScrollView';
import Input from 'components/UI/Input';
import required from 'validators/required';
import Btn from 'components/UI/Btn';
import {Container, Header, HeaderText, InputText, styles} from './styles';
const UserRegistrationRequestPage = ({navigation}) => {

//Campos: name, email, telefone, senha, confirmar senha, justificativa e comunidade
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

  const [justify, setJustify] = useState({
    isValid: false,
    value: '',
  });

  const [isSelected, setSelection] = useState(false);

//aplicação de um efeito
  useEffect(() => {
    if (navigation.getParent()) {
      navigation.getParent().setOptions({headerShown: false});
    }
  }, [navigation]);

//retornando a página
  return (
    <>
      <Header>
        <HeaderText my={3}>Solicitar Cadastro</HeaderText>
      </Header>
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
            <InputText>Justificativa</InputText>
            <Input
              label="Justifique sua solicitação"
              onChange={setJustify}
              value={justify.value}
              autoCapitalize="words"
              rules={[required]}
            />
            <Btn
              //disabled={!formIsValid()}
              style={{marginVertical: 50}}
              title="Enviar solicitação"
              onPress={() => setPassword()}
            />
          </Container>
      </ScrollView>
    </>
  );
};

export default UserRegistrationRequestPage;
