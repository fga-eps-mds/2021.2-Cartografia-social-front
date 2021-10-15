import React, {useState} from 'react';
import ScrollView from 'components/UI/ScrollView';
import Input from 'components/UI/Input';
import required from 'validators/required';
import Btn from 'components/UI/Btn';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {Container, Header, HeaderText, InputText, Text} from './styles';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState({
    isValid: false,
    value: '',
  });

  const [sucess, setSucess] = useState(false);

  const formIsValid = () => {
    return email.isValid;
  };

  const resetPassword = async () => {
    if (email.value)
      auth()
        .sendPasswordResetEmail(email.value)
        .catch(() => {})
        .finally(() => setSucess(true));
    else Alert.alert('Deu ruim meu chapa', 'É sério');
  };

  return (
    <>
      <Header>
        <HeaderText my={3}>Recuperar Senha</HeaderText>
      </Header>
      <ScrollView>
        <Container>
          {sucess ? (
            <Text>Email enviado com sucesso!</Text>
          ) : (
            <Container>
              <InputText>Email</InputText>
              <Input
                label="Digite o email cadastrado"
                onChange={setEmail}
                value={email.value}
                autoCapitalize="words"
                rules={[required]}
              />
              <Btn
                disabled={!formIsValid()}
                style={{marginVertical: 50}}
                title="Enviar email"
                onPress={() => resetPassword()}
              />
            </Container>
          )}
        </Container>
      </ScrollView>
    </>
  );
};

export default ForgotPasswordPage;
