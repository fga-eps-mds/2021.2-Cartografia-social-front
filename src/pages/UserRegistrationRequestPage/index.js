import React, {useState, useEffect} from 'react';
import ScrollView from 'components/UI/ScrollView';
import Input from 'components/UI/Input';
import required from 'validators/required';
import Btn from 'components/UI/Btn';
import {Container, Header, HeaderText, InputText, Text} from './styles';

const UserRegistrationRequestPage = ({navigation}) => {

  //Campos: name, email, telefone e senha
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
          {sucess ? (
            <Text>Solicitação de cadastro enviada com sucesso!</Text>
          ) : (
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

              <Btn
                disabled={!formIsValid()}
                style={{marginVertical: 50}}
                title="Enviar solicitação"
                onPress={() => setPassword()}
              />

            </Container>
          )}
        </Container>
      </ScrollView>
    </>
  );
};

export default UserRegistrationRequestPage;
