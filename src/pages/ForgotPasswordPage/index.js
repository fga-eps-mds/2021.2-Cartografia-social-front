import React, { useState } from 'react';
import ScrollView from 'components/UI/ScrollView';
import Input from 'components/UI/Input';
import required from 'validators/required';
import Btn from 'components/UI/Btn';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Actions from 'store/actions';
import { useDispatch } from 'react-redux';
import { Container, Header, HeaderText, InputText, TextBtn } from './styles';

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  // const dispatch = useDispatch();

  const [email, setEmail] = useState({
    isValid: false,
    value: '',
  });

  const formIsValid = () => {
    return email.isValid;
  };

  const resetPassword = async () => {
    if (email.value)
      await auth()
            .sendPasswordResetEmail(email.value)
            .catch(()=>{});
    else
      Alert.alert('Deu ruim meu chapa', 'É sério');
  }

  const onPress = async () => {
    await resetPassword();
  };

  return (
    <>
      <Header>
        <HeaderText my={3}>Recuperar Senha</HeaderText>
      </Header>
      <ScrollView>
        <Container>
          <InputText>Email</InputText>
          <Input
            label="Digite o email cadastrado"
            onChange={(value) => setEmail(value)}
            value={email.value}
            autoCapitalize="words"
            rules={[required]}
          />
          <Btn
            disabled={!formIsValid()}
            style={{ marginVertical: 50 }}
            title="Enviar email"
            onPress={onPress}
          />
        </Container>
      </ScrollView>
    </>
  );
};

export default ForgotPasswordPage;
